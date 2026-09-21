(function () {
  const readings = window.SATZWERK_READINGS || [];
  const audioStudy = window.SATZWERK_AUDIO_STUDY || { tests: [], candidates: [] };
  const readingLevels = ["A0", "A1", "A2", "B1", "B2"];
  const modeLabels = { guided: "Guided", transfer: "Unseen transfer", extensive: "Extensive", checkpoint: "Checkpoint", informational: "Article", capstone: "Capstone" };

  state.readings ||= {};
  state.readingLibrary = { level: "A0", genre: "all", selectedId: readings[0]?.id || null, ...(state.readingLibrary || {}) };
  if (!readingLevels.includes(state.readingLibrary.level)) state.readingLibrary.level = "A0";
  state.readingLibrary.sessions = state.readingLibrary.sessions && typeof state.readingLibrary.sessions === "object" ? state.readingLibrary.sessions : {};
  if (state.readingLibrary.activeSession?.itemId && !state.readingLibrary.sessions[state.readingLibrary.activeSession.itemId]) {
    state.readingLibrary.sessions[state.readingLibrary.activeSession.itemId] = state.readingLibrary.activeSession;
  }
  delete state.readingLibrary.activeSession;

  const audioVersion = audioStudy.version || 1;
  const previousAudioStudy = state.audioStudy;
  if (!previousAudioStudy || previousAudioStudy.version !== audioVersion) {
    state.audioStudy = {
      version: audioVersion,
      selectedTest: audioStudy.tests[0]?.id || null,
      revealed: false,
      ratings: {},
      drafts: {},
      archive: previousAudioStudy ? [...(previousAudioStudy.archive || []), { version: previousAudioStudy.version || 0, ratings: previousAudioStudy.ratings || {} }] : []
    };
  } else {
    state.audioStudy = { selectedTest: audioStudy.tests[0]?.id || null, revealed: false, ratings: {}, drafts: {}, archive: [], ...previousAudioStudy };
  }

  let readingSession = null;
  let readingDraftSaveTimer = 0;
  let readingAnnouncementTimer = 0;

  function announceReading(message) {
    const region = $("#readingAnnouncement");
    if (!region) return;
    clearTimeout(readingAnnouncementTimer);
    region.textContent = "";
    readingAnnouncementTimer = setTimeout(() => {
      region.textContent = message;
      readingAnnouncementTimer = 0;
    }, 20);
  }

  function readingOptionOrders(item, seed = Date.now()) {
    const random = seededVariationRandom(`graded-reading:${item.id}:${seed}`);
    return item.questions.map(question => question.type === "choice" ? shuffledCopy(question.options, random) : null);
  }

  function createReadingSession(item) {
    const startedAt = Date.now();
    return {
      itemId: item.id,
      version: item.version,
      index: 0,
      responses: Array(item.questions.length).fill(""),
      optionOrders: readingOptionOrders(item, `${startedAt}:${Math.random()}`),
      startedAt,
      finished: false
    };
  }

  function savedReadingSession(item) {
    const saved = state.readingLibrary.sessions[item.id];
    if (!saved || saved.itemId !== item.id || saved.version !== item.version) return null;
    if (!Number.isInteger(saved.index) || saved.index < 0 || saved.index >= item.questions.length) return null;
    if (!Array.isArray(saved.responses) || saved.responses.length !== item.questions.length) return null;
    const validOrders = Array.isArray(saved.optionOrders) && saved.optionOrders.length === item.questions.length;
    return {
      itemId: item.id,
      version: item.version,
      index: saved.index,
      responses: saved.responses.map(response => String(response || "")),
      optionOrders: validOrders ? saved.optionOrders.map((order, index) => {
        const source = item.questions[index].options;
        return source && Array.isArray(order) && order.length === source.length && source.every(option => order.includes(option)) ? [...order] : source ? [...source] : null;
      }) : readingOptionOrders(item, saved.startedAt),
      startedAt: Number(saved.startedAt) || Date.now(),
      finished: false
    };
  }

  function persistReadingSession() {
    clearTimeout(readingDraftSaveTimer);
    readingDraftSaveTimer = 0;
    if (!readingSession || readingSession.finished) {
      if (readingSession?.itemId) delete state.readingLibrary.sessions[readingSession.itemId];
    } else {
      state.readingLibrary.sessions[readingSession.itemId] = {
        itemId: readingSession.itemId,
        version: readingSession.version,
        index: readingSession.index,
        responses: [...readingSession.responses],
        optionOrders: readingSession.optionOrders.map(order => order ? [...order] : null),
        startedAt: readingSession.startedAt
      };
    }
    saveState();
  }

  function scheduleReadingSessionSave() {
    clearTimeout(readingDraftSaveTimer);
    readingDraftSaveTimer = setTimeout(() => {
      readingDraftSaveTimer = 0;
      if (readingSession && !readingSession.finished) persistReadingSession();
    }, 350);
  }

  function pauseReadingSession() {
    if (!readingSession) return;
    const item = readings.find(entry => entry.id === readingSession.itemId);
    const question = item?.questions?.[readingSession.index];
    if (question && $("#readingQuestionForm")) captureReadingResponse(question);
    persistReadingSession();
    readingSession = null;
  }

  function readingRecord(item) {
    if (!state.readings[item.id] || state.readings[item.id].version !== item.version) {
      const previous = state.readings[item.id];
      state.readings[item.id] = {
        version: item.version,
        firstAttemptScore: null,
        latestScore: null,
        bestScore: null,
        passedAt: null,
        attempts: [],
        archive: previous ? [previous] : []
      };
    }
    return state.readings[item.id];
  }

  readings.forEach(item => {
    const record = state.readings[item.id];
    if (record && record.version !== item.version) readingRecord(item);
  });
  saveState();

  function selectedReading() {
    return readings.find(item => item.id === state.readingLibrary.selectedId) || readings.find(item => item.level === state.readingLibrary.level) || readings[0];
  }

  function modeLabel(mode) {
    return modeLabels[mode] || mode;
  }

  function readingStatus(item) {
    const record = state.readings[item.id];
    if (record?.version !== item.version) return "Unread";
    if (record?.passedAt) return `Passed · ${Math.round((record.bestScore || 0) * 100)}%`;
    const paused = savedReadingSession(item);
    if (paused) return `Paused · question ${paused.index + 1} of ${item.questions.length}`;
    if (record?.attempts?.length) return `Attempted · ${Math.round((record.bestScore || 0) * 100)}% best`;
    return "Unread";
  }

  function renderReadingLibrary() {
    if (!readings.length) {
      $("#readingWorkspace").innerHTML = "<p>The reading collection could not be loaded.</p>";
      return;
    }
    const passed = readings.filter(item => state.readings[item.id]?.version === item.version && state.readings[item.id]?.passedAt).length;
    $("#readingLibraryProgress").textContent = `${passed} / ${readings.length}`;
    $("#readingLevelTabs").innerHTML = readingLevels.map(level => `<button type="button" class="${state.readingLibrary.level === level ? "active" : ""}" data-reading-level="${level}">${level}<small> ${readings.filter(item => item.level === level).length}</small></button>`).join("");
    const levelReadings = readings.filter(item => item.level === state.readingLibrary.level);
    const genres = [...new Set(levelReadings.map(item => item.genre))].sort((a, b) => a.localeCompare(b));
    if (state.readingLibrary.genre !== "all" && !genres.includes(state.readingLibrary.genre)) state.readingLibrary.genre = "all";
    $("#readingGenreFilter").innerHTML = '<option value="all">All text types</option>' + genres.map(genre => `<option value="${escapeHtml(genre)}">${escapeHtml(genre)}</option>`).join("");
    $("#readingGenreFilter").value = state.readingLibrary.genre || "all";

    const filtered = levelReadings.filter(item => state.readingLibrary.genre === "all" || item.genre === state.readingLibrary.genre);
    if (!filtered.some(item => item.id === state.readingLibrary.selectedId)) state.readingLibrary.selectedId = filtered[0]?.id || null;
    const selected = filtered.find(item => item.id === state.readingLibrary.selectedId) || filtered[0] || null;
    $("#readingCatalog").innerHTML = filtered.map(item => {
      const record = state.readings[item.id];
      return `<button class="reading-catalog-card ${selected?.id === item.id ? "active" : ""} ${record?.version === item.version && record?.passedAt ? "passed" : ""}" type="button" data-reading-id="${item.id}"><span>${item.level} · ${escapeHtml(modeLabel(item.mode))}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.genre)} · ${item.wordCount} words · ${item.estimatedMinutes} min</small><em>${escapeHtml(readingStatus(item))}</em></button>`;
    }).join("");
    if (!filtered.length) {
      $("#readingCatalog").innerHTML = '<p class="reading-empty">No texts match this filter.</p>';
      $("#readingWorkspace").innerHTML = '<div class="reading-cover"><h2>No matching text</h2><p>Choose another level or text type.</p></div>';
    }

    $$('[data-reading-level]').forEach(button => button.addEventListener("click", () => {
      pauseReadingSession();
      state.readingLibrary.level = button.dataset.readingLevel;
      state.readingLibrary.genre = "all";
      state.readingLibrary.selectedId = readings.find(item => item.level === button.dataset.readingLevel)?.id;
      readingSession = null;
      saveState();
      renderReadingLibrary();
    }));
    $$('[data-reading-id]').forEach(button => button.addEventListener("click", () => {
      pauseReadingSession();
      state.readingLibrary.selectedId = button.dataset.readingId;
      readingSession = null;
      saveState();
      renderReadingLibrary();
    }));
    $("#readingGenreFilter").onchange = event => {
      pauseReadingSession();
      state.readingLibrary.genre = event.target.value;
      readingSession = null;
      saveState();
      renderReadingLibrary();
    };
    if (selected) renderReadingWorkspace(selected);
  }

  function readingGlossary(item, open = false) {
    if (!item.glossary?.length) return "";
    return `<details class="reading-glossary" ${open ? "open" : ""}><summary>Language help · ${item.glossary.length} items</summary><div>${item.glossary.map(([de, en]) => `<p><strong lang="de-DE">${escapeHtml(de)}</strong><span>${escapeHtml(en)}</span></p>`).join("")}</div></details>`;
  }

  function renderReadingWorkspace(item) {
    if (!item) return;
    if (readingSession?.itemId === item.id && readingSession.finished) return renderReadingResult(item);
    if (readingSession?.itemId === item.id) return renderReadingAttempt(item);
    const record = readingRecord(item);
    const prior = record.attempts.length ? `<div class="reading-prior"><strong>Previous work</strong><span>${record.attempts.length} attempt${record.attempts.length === 1 ? "" : "s"} · first ${Math.round((record.firstAttemptScore || 0) * 100)}% · latest ${Math.round((record.latestScore || 0) * 100)}% · best ${Math.round((record.bestScore || 0) * 100)}%</span></div>` : "";
    const saved = savedReadingSession(item);
    const savedNote = saved ? `<div class="reading-prior"><strong>Attempt saved</strong><span>Continue at question ${saved.index + 1} of ${item.questions.length}. Your earlier answers are waiting.</span></div>` : "";
    $("#readingWorkspace").innerHTML = `<div class="reading-cover"><span class="eyebrow">${item.level} · ${escapeHtml(modeLabel(item.mode))}</span><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.intro)}</p><div class="reading-meta"><span>${escapeHtml(item.genre)}</span><span>${item.wordCount} words</span><span>about ${item.estimatedMinutes} min</span><span>${item.questions.length} questions</span></div>${item.level === "A0" || item.level === "A1" || item.mode === "guided" ? readingGlossary(item, true) : readingGlossary(item, false)}${savedNote}${prior}<div class="reading-rules"><strong>Attempt rules</strong><ul><li>Answers and evidence appear after the complete attempt.</li><li>Keyboard forms such as ae, oe, ue, and ss are accepted.</li><li>Choice order changes with each new attempt.</li><li>A score of ${Math.round(item.passScore * 100)}% passes this text.</li></ul></div><div class="reading-result-actions"><button class="primary-button" id="startReadingAttempt" type="button">${saved ? "Resume saved attempt" : "Read and begin"} <span>→</span></button>${saved ? '<button class="quiet-button" id="discardReadingAttempt" type="button">Discard saved attempt</button>' : ""}</div></div>`;
    $("#startReadingAttempt").addEventListener("click", () => {
      readingSession = saved || createReadingSession(item);
      persistReadingSession();
      renderReadingAttempt(item);
    });
    $("#discardReadingAttempt")?.addEventListener("click", () => {
      if (!window.confirm("Discard this saved reading attempt and its answers?")) return;
      delete state.readingLibrary.sessions[item.id];
      saveState();
      renderReadingLibrary();
    });
  }

  function renderReadingAttempt(item) {
    const question = item.questions[readingSession.index];
    const response = readingSession.responses[readingSession.index] || "";
    const options = readingSession.optionOrders?.[readingSession.index] || question.options || [];
    const supportOpen = item.level === "A0" || item.level === "A1" || item.mode === "guided";
    const answerControl = question.type === "choice"
      ? `<div class="reading-options" role="radiogroup" aria-labelledby="readingQuestionHeading" aria-describedby="readingAnswerWarning">${options.map((option, index) => `<label><input type="radio" name="reading-answer" value="${escapeHtml(option)}" ${response === option ? "checked" : ""}/><span>${String.fromCharCode(65 + index)}</span>${escapeHtml(option)}</label>`).join("")}</div>`
      : `<label class="reading-text-answer" for="readingLibraryAnswer">Answer in your own words<input id="readingLibraryAnswer" type="text" lang="de-DE" spellcheck="false" aria-describedby="readingAnswerWarning" value="${escapeHtml(response)}" /></label>`;
    $("#readingWorkspace").innerHTML = `<div class="reading-attempt"><div class="reading-attempt-top"><button class="back-button" id="leaveReadingAttempt" type="button">← Reading catalog</button><span>QUESTION ${readingSession.index + 1} OF ${item.questions.length}</span></div><h2>${escapeHtml(item.title)}</h2>${readingGlossary(item, supportOpen)}<div class="library-passage" lang="de-DE">${item.sections.map(section => `<p>${escapeHtml(section)}</p>`).join("")}</div>${item.culture ? `<aside class="reading-culture"><strong>Context</strong><p>${escapeHtml(item.culture)}</p></aside>` : ""}<form class="reading-question" id="readingQuestionForm"><span>${escapeHtml(question.skill.toUpperCase())}</span><h3 id="readingQuestionHeading" tabindex="-1">${escapeHtml(question.prompt)}</h3>${answerControl}<div class="reading-question-actions"><button class="quiet-button" id="previousReadingQuestion" type="button" ${readingSession.index === 0 ? "disabled" : ""}>Previous</button><button class="primary-button" id="nextReadingQuestion" type="submit">${readingSession.index === item.questions.length - 1 ? "Submit attempt" : "Save and continue"} <span>→</span></button></div><p class="reading-answer-warning" id="readingAnswerWarning" hidden>Choose or type an answer before continuing.</p></form></div>`;
    $("#leaveReadingAttempt").addEventListener("click", () => {
      captureReadingResponse(question);
      persistReadingSession();
      readingSession = null;
      renderReadingLibrary();
    });
    $("#previousReadingQuestion").addEventListener("click", () => {
      captureReadingResponse(question);
      readingSession.index -= 1;
      persistReadingSession();
      renderReadingAttempt(item);
    });
    $("#readingQuestionForm").addEventListener("submit", event => {
      event.preventDefault();
      const value = captureReadingResponse(question);
      if (!String(value).trim()) {
        const warning = $("#readingAnswerWarning");
        const message = question.type === "choice" ? "Choose an answer before continuing." : "Type an answer before continuing.";
        warning.textContent = message;
        warning.hidden = false;
        const answerInput = question.type === "choice" ? $('input[name="reading-answer"]') : $("#readingLibraryAnswer");
        (question.type === "choice" ? $(".reading-options") : answerInput)?.setAttribute("aria-invalid", "true");
        answerInput?.focus();
        announceReading(`${message} Question ${readingSession.index + 1} of ${item.questions.length} is still open.`);
        return;
      }
      if (readingSession.index < item.questions.length - 1) {
        readingSession.index += 1;
        persistReadingSession();
        renderReadingAttempt(item);
      } else finishReadingAttempt(item);
    });
    $$('input[name="reading-answer"]').forEach(input => input.addEventListener("change", () => {
      $("#readingAnswerWarning").hidden = true;
      $(".reading-options").removeAttribute("aria-invalid");
      captureReadingResponse(question);
      persistReadingSession();
    }));
    $("#readingLibraryAnswer")?.addEventListener("input", () => {
      $("#readingAnswerWarning").hidden = true;
      $("#readingLibraryAnswer").removeAttribute("aria-invalid");
      captureReadingResponse(question);
      scheduleReadingSessionSave();
    });
    $("#readingQuestionHeading").focus({ preventScroll: true });
    announceReading(`Question ${readingSession.index + 1} of ${item.questions.length}: ${question.prompt}`);
  }

  function captureReadingResponse(question) {
    const value = question.type === "choice" ? ($('input[name="reading-answer"]:checked')?.value || "") : ($("#readingLibraryAnswer")?.value || "");
    readingSession.responses[readingSession.index] = value;
    return value;
  }

  function folded(value) {
    return foldSpelling(String(value || "")).replace(/[^a-z0-9äöüß ]/gu, " ").replace(/\s+/g, " ").trim();
  }

  function gradeReadingQuestion(question, response) {
    const actual = folded(response);
    if (question.type === "choice") return { correct: actual === folded(question.answer), expected: question.answer };
    const accepted = (question.answers || []).some(answer => {
      const target = folded(answer);
      return actual === target || (target.length > 7 && actual.includes(target));
    });
    if (accepted) return { correct: true, expected: question.answers[0] };
    const actualWords = actual.split(" ").filter(Boolean);
    const usedWordIndexes = new Set();
    const groupsMet = (question.required || []).every(group => {
      const stems = group.map(folded).filter(Boolean);
      const wordIndex = actualWords.findIndex((word, index) => !usedWordIndexes.has(index) && stems.some(stem => word.includes(stem)));
      if (wordIndex < 0) return false;
      usedWordIndexes.add(wordIndex);
      return true;
    });
    return { correct: groupsMet && Boolean(question.required?.length), expected: question.answers?.[0] || "" };
  }

  function finishReadingAttempt(item) {
    clearTimeout(readingDraftSaveTimer);
    readingDraftSaveTimer = 0;
    const results = item.questions.map((question, index) => ({ ...gradeReadingQuestion(question, readingSession.responses[index]), question, response: readingSession.responses[index] }));
    const correct = results.filter(result => result.correct).length;
    const score = correct / item.questions.length;
    const record = readingRecord(item);
    const hadPriorAttempt = record.attempts.length > 0;
    const previousBestPoints = Math.round((record.bestScore || 0) * 100);
    const scorePoints = Math.round(score * 100);
    const firstPass = score >= item.passScore && !record.passedAt;
    const personalBest = hadPriorAttempt && scorePoints > previousBestPoints;
    const improvement = Math.max(0, scorePoints - previousBestPoints);
    const attempt = { date: today(), score, durationSeconds: Math.round((Date.now() - readingSession.startedAt) / 1000), responses: [...readingSession.responses] };
    record.attempts.push(attempt);
    if (record.attempts.length > 20) record.attempts = record.attempts.slice(-20);
    if (record.firstAttemptScore == null) record.firstAttemptScore = score;
    record.latestScore = score;
    record.bestScore = Math.max(record.bestScore || 0, score);
    if (score >= item.passScore && !record.passedAt) record.passedAt = today();
    readingSession.results = results;
    readingSession.score = score;
    readingSession.firstPass = firstPass;
    readingSession.personalBest = personalBest;
    readingSession.improvement = improvement;
    readingSession.finished = true;
    delete state.readingLibrary.sessions[item.id];
    if (firstPass) {
      const passedCount = readings.filter(reading => state.readings[reading.id]?.version === reading.version && state.readings[reading.id]?.passedAt).length;
      claimReward(`reading:${item.id}`, `${item.title} passed.`, `${passedCount} of ${readings.length} graded texts are complete.`, { category: "graded-reading", label: "READING LANDMARK" });
    } else if (personalBest) {
      claimReward(`reading-best:${item.id}:${scorePoints}`, `New reading best: ${scorePoints}%.`, `Up ${improvement} point${improvement === 1 ? "" : "s"} on ${item.title}.`, { category: "graded-reading", kind: "personal", label: "PERSONAL BEST" });
    } else {
      if (score >= item.passScore) recordUsefulPractice("graded-reading");
      else markPracticeDay("graded-reading");
    }
    saveState();
    renderReadingLibrary();
  }

  function renderReadingResult(item) {
    const passed = readingSession.score >= item.passScore;
    const correct = readingSession.results.filter(result => result.correct).length;
    const eyebrow = readingSession.firstPass ? "FIRST PASS" : readingSession.personalBest ? "PERSONAL BEST" : passed ? "TEXT PASSED" : "ATTEMPT COMPLETE";
    const resultCopy = readingSession.firstPass
      ? "This text is now part of your completed reading track."
      : readingSession.personalBest
        ? `Your best score rose by ${readingSession.improvement} point${readingSession.improvement === 1 ? "" : "s"}.`
        : passed
          ? "You reached the passing standard again."
          : `Review the evidence below. ${Math.ceil(item.passScore * item.questions.length)} correct answers are required to pass.`;
    const scorePoints = Math.round(readingSession.score * 100);
    $("#readingWorkspace").innerHTML = `<div class="reading-result ${passed ? "passed" : ""}"><span class="eyebrow">${eyebrow}</span><h2 id="readingResultHeading" tabindex="-1">${scorePoints}% · ${correct} of ${item.questions.length}</h2><p>${resultCopy}</p><div class="reading-review">${readingSession.results.map((result, index) => `<article class="${result.correct ? "correct" : "missed"}"><span>${result.correct ? "✓" : "○"} ${escapeHtml(result.question.skill)} · ${index + 1}</span><h3>${escapeHtml(result.question.prompt)}</h3><p><strong>Your answer:</strong> ${escapeHtml(result.response)}</p>${result.correct ? "" : `<p><strong>Accepted answer:</strong> ${escapeHtml(result.expected)}</p>`}<blockquote lang="de-DE">${escapeHtml(result.question.evidence)}</blockquote><p>${escapeHtml(result.question.explanation)}</p></article>`).join("")}</div><div class="reading-result-actions"><button class="quiet-button" id="readingResultCatalog" type="button">Return to catalog</button><button class="primary-button" id="readingResultRetry" type="button">Try a new attempt <span>→</span></button></div></div>`;
    $("#readingResultCatalog").addEventListener("click", () => { readingSession = null; renderReadingLibrary(); });
    $("#readingResultRetry").addEventListener("click", () => {
      readingSession = createReadingSession(item);
      persistReadingSession();
      renderReadingAttempt(item);
    });
    $("#readingResultHeading").focus({ preventScroll: true });
    announceReading(`${passed ? "Reading passed." : "Reading attempt complete."} Score: ${scorePoints} percent, ${correct} of ${item.questions.length} correct. ${resultCopy} ${passed ? "Return to the catalog or try a new attempt." : "Review the feedback, then try a new attempt when you are ready."}`);
  }

  function audioRatingKey(testId, candidateId) {
    return `${testId}:${candidateId}`;
  }

  function renderAudioLab() {
    const tests = audioStudy.tests || [];
    const candidates = audioStudy.candidates || [];
    if (!tests.length || !candidates.length) {
      $("#audioTestCopy").innerHTML = "<p>Voice samples are being prepared. The reading course remains available while this study is assembled.</p>";
      $("#audioCandidateGrid").innerHTML = "";
      return;
    }
    if (!tests.some(test => test.id === state.audioStudy.selectedTest)) state.audioStudy.selectedTest = tests[0].id;
    const test = tests.find(item => item.id === state.audioStudy.selectedTest);
    const testIndex = tests.findIndex(item => item.id === test.id);
    const orderedCandidates = candidates.map((_, index) => candidates[(index + testIndex) % candidates.length]);
    const savedCount = Object.values(state.audioStudy.ratings || {}).filter(item => item.saved).length;
    $("#audioVoteCount").textContent = savedCount;
    $("#audioTestTabs").innerHTML = tests.map((item, index) => `<button type="button" class="${item.id === test.id ? "active" : ""}" data-audio-test="${item.id}">${String(index + 1).padStart(2, "0")}<small> ${escapeHtml(item.label)}</small></button>`).join("");
    $("#audioTestCopy").innerHTML = `<span class="eyebrow">${escapeHtml(test.focus.toUpperCase())}</span><h2>${escapeHtml(test.label)}</h2><p lang="de-DE">${escapeHtml(test.text)}</p><small>${escapeHtml(test.listenFor)}</small>`;
    $("#audioCandidateGrid").innerHTML = orderedCandidates.map((candidate, index) => {
      const key = audioRatingKey(test.id, candidate.id);
      const savedRating = state.audioStudy.ratings[key] || {};
      const draft = state.audioStudy.drafts[key];
      const rating = { ...savedRating, ...(draft || {}) };
      const source = candidate.files?.[test.id];
      const title = state.audioStudy.revealed ? candidate.name : `Voice ${String.fromCharCode(65 + index)}`;
      const detail = state.audioStudy.revealed ? candidate.detail : "Model hidden during the listening test";
      const buttonLabel = draft ? (savedRating.saved ? "Save changes" : "Save rating") : (savedRating.saved ? "Rating saved" : "Save rating");
      return `<article class="audio-candidate"><span>${escapeHtml(title)}</span><small>${escapeHtml(detail)}</small>${source ? `<audio controls preload="metadata" src="${escapeHtml(source)}">Your browser cannot play this sample.</audio>` : '<p class="audio-unavailable">Sample unavailable</p>'}<div class="audio-rating-row"><label>Clarity<select data-audio-rating="clarity" data-audio-key="${key}">${ratingOptions(rating.clarity)}</select></label><label>Naturalness<select data-audio-rating="naturalness" data-audio-key="${key}">${ratingOptions(rating.naturalness)}</select></label><label>Learner pace<select data-audio-rating="pace" data-audio-key="${key}">${ratingOptions(rating.pace)}</select></label></div><label class="audio-notes">What stood out?<textarea rows="3" data-audio-note="${key}" placeholder="Pronunciation, speed, stress, or anything distracting">${escapeHtml(rating.note || "")}</textarea></label><button class="quiet-button audio-save" type="button" data-save-audio="${key}" ${source ? "" : "disabled"}>${buttonLabel}</button></article>`;
    }).join("");
    $$('[data-audio-test]').forEach(button => button.addEventListener("click", () => {
      state.audioStudy.selectedTest = button.dataset.audioTest;
      state.audioStudy.revealed = false;
      saveState();
      renderAudioLab();
    }));
    $$('[data-save-audio]').forEach(button => button.addEventListener("click", () => saveAudioRating(button.dataset.saveAudio)));
    $$('[data-audio-rating], [data-audio-note]').forEach(control => {
      const markChanged = () => {
        const key = control.dataset.audioKey || control.dataset.audioNote;
        const draft = state.audioStudy.drafts[key] || {};
        if (control.dataset.audioRating) draft[control.dataset.audioRating] = Number(control.value || 0);
        else draft.note = control.value;
        state.audioStudy.drafts[key] = draft;
        saveState();
        const button = $(`[data-save-audio="${key}"]`);
        if (button) button.textContent = state.audioStudy.ratings[key]?.saved ? "Save changes" : "Save rating";
      };
      control.addEventListener(control.matches("textarea") ? "input" : "change", markChanged);
    });
    $("#revealAudioModels").textContent = state.audioStudy.revealed ? "Hide model names" : "Reveal model names";
  }

  function ratingOptions(selected) {
    return '<option value="">Rate</option>' + [1, 2, 3, 4, 5].map(value => `<option value="${value}" ${Number(selected) === value ? "selected" : ""}>${value} / 5</option>`).join("");
  }

  function saveAudioRating(key) {
    const selects = $$(`[data-audio-key="${key}"]`);
    const values = Object.fromEntries(selects.map(select => [select.dataset.audioRating, Number(select.value || 0)]));
    const note = $(`[data-audio-note="${key}"]`).value.trim();
    if (!values.clarity || !values.naturalness || !values.pace) {
      announceMessage("Choose all three ratings before saving this voice.");
      return;
    }
    state.audioStudy.ratings[key] = { ...values, note, saved: true, date: today() };
    delete state.audioStudy.drafts[key];
    saveState();
    const savedCount = Object.values(state.audioStudy.ratings || {}).filter(item => item.saved).length;
    $("#audioVoteCount").textContent = savedCount;
    const button = $(`[data-save-audio="${key}"]`);
    if (button) button.textContent = "Rating saved";
    announceMessage("Voice rating saved on this device.");
  }

  function exportAudioFeedback() {
    const rows = Object.entries(state.audioStudy.ratings || {}).filter(([, rating]) => rating.saved).map(([key, rating]) => {
      const [testId, candidateId] = key.split(":");
      const test = audioStudy.tests.find(item => item.id === testId);
      const candidate = audioStudy.candidates.find(item => item.id === candidateId);
      return `${test?.label || testId} | ${candidate?.name || candidateId} | clarity ${rating.clarity}/5 | naturalness ${rating.naturalness}/5 | pace ${rating.pace}/5${rating.note ? ` | ${rating.note}` : ""}`;
    });
    const summary = rows.length ? `Satzwerk German voice study\n\n${rows.join("\n")}` : "No voice ratings have been saved yet.";
    navigator.clipboard?.writeText(summary).then(() => {
      $("#audioCopyFeedback").hidden = false;
      $("#audioCopyFeedback").innerHTML = "<h3>Feedback copied.</h3><p>You can paste the summary into our next conversation.</p>";
    }).catch(() => {
      $("#audioCopyFeedback").hidden = false;
      $("#audioCopyFeedback").innerHTML = `<h3>Copy this summary</h3><p class="preserve-lines">${escapeHtml(summary)}</p>`;
    });
  }

  $("#revealAudioModels")?.addEventListener("click", () => {
    state.audioStudy.revealed = !state.audioStudy.revealed;
    saveState();
    renderAudioLab();
  });
  $("#exportAudioFeedback")?.addEventListener("click", exportAudioFeedback);
  window.addEventListener("pagehide", () => {
    if (typeof suppressPagehidePersistence !== "undefined" && suppressPagehidePersistence) return;
    if (!readingSession || readingSession.finished) return;
    const item = readings.find(entry => entry.id === readingSession.itemId);
    const question = item?.questions?.[readingSession.index];
    if (question && $("#readingQuestionForm")) captureReadingResponse(question);
    persistReadingSession();
  });

  window.SatzwerkExtensions = { renderReadingLibrary, renderAudioLab };
})();
