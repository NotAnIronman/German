const course = window.SATZWERK_CURRICULUM;

if (!course?.modules?.length) {
  document.body.innerHTML = '<main style="padding:40px;font-family:system-ui"><h1>Course data failed to load.</h1><p>Refresh the page. If the problem continues, check that curriculum.js is available.</p></main>';
  throw new Error("Satzwerk curriculum missing");
}

const levels = course.levels;
const modules = course.modules;
const allWords = modules.flatMap(module => module.words.map(word => ({ ...word, moduleId: module.id, level: module.level, globalId: `${module.id}:${word.id}` })));
const allQuestions = modules.flatMap(module => module.questions.map(question => ({ ...question, moduleId: module.id, level: module.level, globalId: `${module.id}:${question.id}` })));
const storageKey = "satzwerk-production-v1";
const levelRank = { A0: 0, A1: 1, A2: 2, B1: 3, B2: 4 };
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const now = () => Date.now();
const today = () => new Date().toISOString().slice(0, 10);
const dayMs = 86400000;

const defaultState = {
  version: 2,
  activeModule: modules[0].id,
  courseLevel: "A0",
  cultureLevel: "A0",
  words: {},
  modules: {},
  quiz: { firstCorrect: 0, attempts: 0, recovered: 0 },
  skills: {
    listening: { attempts: 0, correct: 0 },
    reading: { attempts: 0, correct: 0 },
    writing: { attempts: 0 },
    speaking: { attempts: 0 }
  },
  deckPositions: {},
  cardDirection: "german"
};

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "{}");
    const next = {
      ...defaultState,
      ...parsed,
      words: parsed.words || {},
      modules: parsed.modules || {},
      quiz: { ...defaultState.quiz, ...(parsed.quiz || {}) },
      skills: {
        listening: { ...defaultState.skills.listening, ...(parsed.skills?.listening || {}) },
        reading: { ...defaultState.skills.reading, ...(parsed.skills?.reading || {}) },
        writing: { ...defaultState.skills.writing, ...(parsed.skills?.writing || {}) },
        speaking: { ...defaultState.skills.speaking, ...(parsed.skills?.speaking || {}) }
      },
      deckPositions: parsed.deckPositions || {}
    };
    if (!modules.some(module => module.id === next.activeModule)) next.activeModule = modules[0].id;
    return next;
  } catch {
    return structuredClone(defaultState);
  }
}

let state = loadState();
let currentView = "home";
let courseSelectedModule = state.activeModule;
let cultureLevel = state.cultureLevel || "A0";
let deck = [];
let deckIndex = 0;
let cardRevealed = false;
let targetedWordId = null;
let vocabFilter = "all";
let quiz = null;
let bannerTimer = null;

function migrateLegacyWords() {
  let changed = false;
  Object.keys(state.words).forEach(id => {
    if (id.includes(":")) return;
    const match = allWords.find(word => word.id === id);
    if (match && !state.words[match.globalId]) {
      state.words[match.globalId] = state.words[id];
      changed = true;
    }
  });
  if (changed) saveState();
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function moduleById(id) {
  return modules.find(module => module.id === id) || modules[0];
}

function activeModule() {
  return moduleById(state.activeModule);
}

function wordByGlobalId(id) {
  return allWords.find(word => word.globalId === id);
}

function globalWordId(moduleId, localId) {
  return `${moduleId}:${localId}`;
}

function wordRecord(id) {
  if (!state.words[id]) {
    state.words[id] = { introduced: false, score: 0, production: 0, delayed: 0, misses: 0, days: [], lastSeen: null, lastTest: null, nextReview: null, retryCredit: 0 };
  }
  return state.words[id];
}

function moduleRecord(id) {
  if (!state.modules[id]) {
    state.modules[id] = { started: false, attempts: 0, firstCorrect: 0, listening: 0, reading: 0, writing: 0, speaking: 0, checkpointScore: null, checkpointAt: null, completedPrompts: {} };
  }
  return state.modules[id];
}

function addDay(record) {
  if (!Array.isArray(record.days)) record.days = [];
  if (!record.days.includes(today())) record.days.push(today());
}

function isIntroduced(globalId) {
  return Boolean(state.words[globalId]?.introduced);
}

function introducedWords() {
  return allWords.filter(word => isIntroduced(word.globalId));
}

function dueWords() {
  const stamp = now();
  return introducedWords().filter(word => state.words[word.globalId].nextReview && state.words[word.globalId].nextReview <= stamp);
}

function tierFor(record) {
  if (!record?.introduced) return "unseen";
  if (record.production >= 5 && record.delayed >= 3 && record.days?.length >= 4) return "durable";
  if (record.production >= 2 && record.days?.length >= 2) return "retrievable";
  if (record.production > 0 || record.score >= .5) return "practicing";
  return "introduced";
}

function tierLabel(tier) {
  return ({ unseen: "Unseen", introduced: "Introduced", practicing: "Practicing", retrievable: "Retrievable", durable: "Durable" })[tier];
}

function evidencePercent(record) {
  if (!record?.introduced) return 0;
  return Math.min(100, Math.round(8 + (record.score || 0) * 7 + (record.production || 0) * 12 + (record.delayed || 0) * 10 + Math.max(0, (record.days?.length || 0) - 1) * 8));
}

function moduleWordCount(module, introducedOnly = false) {
  const words = module.words.map(word => globalWordId(module.id, word.id));
  return introducedOnly ? words.filter(isIntroduced).length : words.length;
}

function moduleCoreWords(module) {
  const core = module.words.filter(word => !word.supplemental);
  return core.length ? core : module.words;
}

function moduleProgress(module) {
  const record = state.modules[module.id];
  if (!record) return 0;
  const core = moduleCoreWords(module);
  const words = core.filter(word => isIntroduced(globalWordId(module.id, word.id))).length / Math.max(1, core.length);
  const prompts = Object.keys(record.completedPrompts || {}).length / Math.max(1, module.questions.length);
  const skills = [record.listening, record.reading, record.writing, record.speaking].filter(value => Number(value) > 0).length / 4;
  const checkpoint = record.checkpointScore == null ? 0 : Math.min(1, record.checkpointScore);
  return Math.round(words * 40 + prompts * 35 + skills * 15 + checkpoint * 10);
}

function moduleStatus(module) {
  const record = state.modules[module.id];
  if (!record) return "Fresh";
  if (record.checkpointScore >= .8) return "Checkpoint passed";
  if (record.attempts > 0 || record.listening || record.reading || record.writing || record.speaking) return "Practiced";
  if (moduleWordCount(module, true) > 0 || record.started) return "Started";
  return "Fresh";
}

function levelProgress(level) {
  const group = modules.filter(module => module.level === level);
  return Math.round(group.reduce((sum, module) => sum + moduleProgress(module), 0) / Math.max(1, group.length));
}

function overallProgress() {
  return Math.round(modules.reduce((sum, module) => sum + moduleProgress(module), 0) / modules.length);
}

function moduleOptions() {
  return levels.map(level => `<optgroup label="${level.id} · ${escapeHtml(level.title)}">${modules.filter(module => module.level === level.id).map(module => `<option value="${module.id}">${module.code} · ${escapeHtml(module.title)}</option>`).join("")}</optgroup>`).join("");
}

function populateStaticControls() {
  ["#learnModuleSelect", "#practiceModuleSelect", "#grammarModuleSelect"].forEach(selector => {
    $(selector).innerHTML = moduleOptions();
    $(selector).value = state.activeModule;
  });
  $("#vocabLevel").innerHTML = '<option value="all">All levels</option>' + levels.map(level => `<option value="${level.id}">${level.id} · ${escapeHtml(level.title)}</option>`).join("");
  $("#cardDirection").value = state.cardDirection || "german";
}

function syncModuleControls() {
  ["#learnModuleSelect", "#practiceModuleSelect", "#grammarModuleSelect"].forEach(selector => {
    if ($(selector)) $(selector).value = state.activeModule;
  });
  const module = activeModule();
  $("#topLevel").textContent = `${module.code} · ${module.title.toUpperCase()}`;
  $("#avatarLevel").textContent = module.level;
}

function announceModule(module) {
  const banner = $("#moduleChange");
  banner.textContent = `Now working on ${module.code}: ${module.title}.`;
  banner.hidden = false;
  clearTimeout(bannerTimer);
  bannerTimer = setTimeout(() => { banner.hidden = true; }, 4200);
}

function setActiveModule(id, announce = true) {
  const module = moduleById(id);
  state.activeModule = module.id;
  state.courseLevel = module.level;
  courseSelectedModule = module.id;
  targetedWordId = null;
  saveState();
  syncModuleControls();
  if (announce) announceModule(module);
}

function go(view) {
  currentView = view;
  $$(".view").forEach(section => {
    const active = section.id === `view-${view}`;
    section.hidden = !active;
    section.classList.toggle("active", active);
  });
  $$(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.view === view));
  if (view === "home") renderHome();
  if (view === "course") renderCourse();
  if (view === "learn") prepareDeck();
  if (view === "practice") renderPracticeMenu();
  if (view === "grammar") renderGrammar();
  if (view === "vocabulary") renderVocabulary();
  if (view === "culture") renderCulture();
  if (view === "progress") renderProgress();
  if (view === "sources") renderSources();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderHome() {
  const module = activeModule();
  const progress = overallProgress();
  const due = dueWords().length;
  $("#homePercent").textContent = `${progress}%`;
  $("#dueCount").textContent = due;
  $("#dueMessage").textContent = due ? `${due} bundle${due === 1 ? " is" : "s are"} ready for a spaced return.` : "Your next scheduled reviews will appear here.";
  $("#homeModuleCount").textContent = modules.length;
  $("#homeWordCount").textContent = allWords.length;
  $("#homePromptCount").textContent = allQuestions.length;
  $("#continueUnit").textContent = `${module.code} · ${module.title.toUpperCase()}`;
  const introduced = moduleWordCount(module, true);
  const core = moduleCoreWords(module);
  const coreIntroduced = core.filter(word => isIntroduced(globalWordId(module.id, word.id))).length;
  const record = state.modules[module.id];
  const button = $("#continueButton");
  if (coreIntroduced < core.length) {
    $("#continueTitle").textContent = coreIntroduced ? "Continue the core word deck" : module.title;
    $("#continueText").textContent = coreIntroduced ? `${coreIntroduced} of ${core.length} core bundles have been met in this module.` : module.subtitle;
    button.innerHTML = 'Open word deck <span>→</span>';
    button.onclick = () => go("learn");
  } else if (!record?.attempts) {
    $("#continueTitle").textContent = "Put the module into sentences";
    $("#continueText").textContent = "The word deck is available. Sentence practice is the next useful step.";
    button.innerHTML = 'Open practice <span>→</span>';
    button.onclick = () => go("practice");
  } else if (introduced < module.words.length) {
    const remaining = module.words.length - introduced;
    $("#continueTitle").textContent = "Widen this module's word bank";
    $("#continueText").textContent = `${remaining} additional bundle${remaining === 1 ? " is" : "s are"} ready with a phrase, word family, or usage pattern.`;
    button.innerHTML = 'Meet more language <span>→</span>';
    button.onclick = () => go("learn");
  } else {
    $("#continueTitle").textContent = "Return from another angle";
    $("#continueText").textContent = "Choose listening, reading, writing, speaking, or the module checkpoint.";
    button.innerHTML = 'Choose practice <span>→</span>';
    button.onclick = () => go("practice");
  }
  $("#homeLevelPath").innerHTML = levels.map((level, index) => `${index ? '<div class="path-line"></div>' : ""}<button class="path-level ${module.level === level.id ? "active" : ""}" type="button" data-level-go="${level.id}"><b>${level.id}</b><span>${escapeHtml(level.title)}</span><small>${modules.filter(item => item.level === level.id).length} modules · ${levelProgress(level.id)}%</small></button>`).join("");
  $$('[data-level-go]').forEach(button => button.addEventListener("click", () => {
    state.courseLevel = button.dataset.levelGo;
    const first = modules.find(item => item.level === state.courseLevel);
    courseSelectedModule = first.id;
    saveState();
    go("course");
  }));
}

function renderCourse() {
  const selectedLevel = state.courseLevel || activeModule().level;
  const level = levels.find(item => item.id === selectedLevel) || levels[0];
  const group = modules.filter(module => module.level === level.id);
  if (!group.some(module => module.id === courseSelectedModule)) courseSelectedModule = group[0].id;
  $("#courseModuleTotal").textContent = modules.length;
  $("#levelTabs").innerHTML = levels.map(item => `<button type="button" class="${item.id === level.id ? "active" : ""}" data-course-level="${item.id}">${item.id}<small> ${modules.filter(module => module.level === item.id).length}</small></button>`).join("");
  $("#levelSummary").innerHTML = `<strong>${level.id} · ${escapeHtml(level.title)}</strong><p>${escapeHtml(level.summary)} ${escapeHtml(level.outcome)}</p>`;
  $("#moduleGrid").innerHTML = group.map(module => `<button class="module-card ${module.id === courseSelectedModule ? "active" : ""}" type="button" data-course-module="${module.id}"><span>${module.code}</span><strong>${escapeHtml(module.title)}</strong><p>${escapeHtml(module.subtitle)}</p><small>${moduleStatus(module)} · ${moduleProgress(module)}%</small></button>`).join("");
  renderModuleDetail(moduleById(courseSelectedModule));
  $$('[data-course-level]').forEach(button => button.addEventListener("click", () => {
    state.courseLevel = button.dataset.courseLevel;
    courseSelectedModule = modules.find(module => module.level === state.courseLevel).id;
    saveState();
    renderCourse();
  }));
  $$('[data-course-module]').forEach(button => button.addEventListener("click", () => {
    courseSelectedModule = button.dataset.courseModule;
    renderCourse();
  }));
}

function renderModuleDetail(module) {
  const expansionCount = module.words.filter(word => word.supplemental).length;
  const bundleSummary = expansionCount ? `${moduleCoreWords(module).length} core + ${expansionCount} expansion bundles` : `${module.words.length} bundles`;
  $("#moduleDetail").innerHTML = `<span class="eyebrow">${module.code} · ${moduleStatus(module).toUpperCase()}</span><h2>${escapeHtml(module.title)}</h2><p>${escapeHtml(module.subtitle)}</p><h3>You will learn to</h3><ul>${module.canDo.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul><h3>Grammar focus</h3><ul>${module.grammar.map(item => `<li>${escapeHtml(item.title)}</li>`).join("")}</ul><div class="module-progress"><div><i style="width:${moduleProgress(module)}%"></i></div><small>${bundleSummary} · ${module.questions.length} typed prompts · ${moduleProgress(module)}% course evidence</small></div><div class="module-detail-actions"><button class="primary-button" type="button" data-module-learn="${module.id}">Learn words</button><button class="quiet-button" type="button" data-module-practice="${module.id}">Practice</button></div>`;
  $('[data-module-learn]').addEventListener("click", event => { setActiveModule(event.currentTarget.dataset.moduleLearn); go("learn"); });
  $('[data-module-practice]').addEventListener("click", event => { setActiveModule(event.currentTarget.dataset.modulePractice); go("practice"); });
}

function prepareDeck() {
  const module = activeModule();
  syncModuleControls();
  deck = targetedWordId ? [wordByGlobalId(targetedWordId)] : module.words.map(word => ({ ...word, moduleId: module.id, level: module.level, globalId: globalWordId(module.id, word.id) }));
  deck = deck.filter(Boolean);
  deckIndex = targetedWordId ? 0 : Math.min(state.deckPositions[module.id] || 0, Math.max(0, deck.length - 1));
  $("#learnEyebrow").textContent = `${module.code} · WORD BUNDLES`;
  $("#learnTitle").textContent = targetedWordId ? `Review ${deck[0].de}` : module.title;
  $("#learnIntro").textContent = targetedWordId ? "A focused return to one bundle from your vocabulary record." : module.subtitle;
  renderCard();
  renderDeckStrip();
  renderDeckStatus();
}

function cardDirectionFor() {
  const selected = $("#cardDirection").value;
  if (selected !== "mixed") return selected;
  return deckIndex % 2 === 0 ? "german" : "english";
}

function renderCard() {
  const word = deck[deckIndex];
  if (!word) return;
  cardRevealed = false;
  const module = moduleById(word.moduleId);
  const direction = cardDirectionFor();
  $("#deckPosition").textContent = `${deckIndex + 1} / ${deck.length}`;
  $("#cardUnit").textContent = targetedWordId ? "FOCUSED REVIEW" : word.supplemental ? `${module.code} · EXPANSION` : `${module.code} · ${module.title.toUpperCase()}`;
  $("#flashPrompt").textContent = direction === "german" ? "GERMAN" : "ENGLISH";
  $("#flashFront").textContent = direction === "german" ? word.de : word.en;
  $("#flashAnswer").textContent = direction === "german" ? word.en : word.de;
  $("#flashBundle").textContent = word.bundle;
  $("#flashExample").textContent = `${word.example} | ${word.exampleEn}`;
  ["#flashAnswer", "#flashBundle", "#flashExample", "#ratingRow"].forEach(selector => { $(selector).hidden = true; });
  $("#flipInstruction").hidden = false;
  $("#flashcard").setAttribute("aria-expanded", "false");
}

function revealCard() {
  if (cardRevealed || !deck[deckIndex]) return;
  cardRevealed = true;
  const word = deck[deckIndex];
  const record = wordRecord(word.globalId);
  const mRecord = moduleRecord(word.moduleId);
  record.introduced = true;
  record.lastSeen = now();
  addDay(record);
  mRecord.started = true;
  saveState();
  ["#flashAnswer", "#flashBundle", "#flashExample", "#ratingRow"].forEach(selector => { $(selector).hidden = false; });
  $("#flipInstruction").hidden = true;
  $("#flashcard").setAttribute("aria-expanded", "true");
  renderDeckStrip();
  renderDeckStatus();
}

function rateCard(rating) {
  if (!deck[deckIndex]) return;
  const word = deck[deckIndex];
  const record = wordRecord(word.globalId);
  const delays = { again: 10 * 60000, hard: 6 * 3600000, got: dayMs };
  const gains = { again: .05, hard: .2, got: .35 };
  record.score = (record.score || 0) + gains[rating];
  record.nextReview = now() + delays[rating];
  saveState();
  if (targetedWordId) {
    targetedWordId = null;
    go("vocabulary");
    return;
  }
  deckIndex = (deckIndex + 1) % deck.length;
  state.deckPositions[activeModule().id] = deckIndex;
  saveState();
  renderCard();
  renderDeckStrip();
  renderDeckStatus();
}

function renderDeckStrip() {
  $("#deckStrip").innerHTML = deck.map((word, index) => `<button type="button" class="${isIntroduced(word.globalId) ? "seen" : ""} ${index === deckIndex ? "active" : ""}" data-card-index="${index}" aria-label="Open card ${index + 1}">${index + 1}</button>`).join("");
  $$('[data-card-index]').forEach(button => button.addEventListener("click", () => {
    deckIndex = Number(button.dataset.cardIndex);
    state.deckPositions[activeModule().id] = deckIndex;
    saveState();
    renderCard();
    renderDeckStrip();
  }));
}

function renderDeckStatus() {
  const module = activeModule();
  const count = moduleWordCount(module, true);
  const expansionCount = module.words.filter(word => word.supplemental).length;
  const expansionText = expansionCount ? ` · ${expansionCount} expansion bundles` : "";
  $("#learnDeckStatus").textContent = targetedWordId ? "Focused review" : `${count} of ${module.words.length} bundles met${expansionText}`;
}

function speakText(text, lang = "de-DE") {
  if (!("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = .88;
  window.speechSynthesis.speak(utterance);
  return true;
}

function availableQuestionsFor(module) {
  return module.questions.filter(question => question.requires.every(localId => isIntroduced(globalWordId(module.id, localId))));
}

function renderPracticeMenu() {
  const module = activeModule();
  syncModuleControls();
  const available = availableQuestionsFor(module);
  $("#practiceEyebrow").textContent = `${module.code} · PRACTICE`;
  $("#practiceTitle").textContent = module.title;
  $("#practiceIntro").textContent = module.subtitle;
  $("#availableQuestionCount").textContent = available.length;
  $("#sentenceReadiness").textContent = available.length ? `${available.length} prompt${available.length === 1 ? "" : "s"} use introduced target bundles.` : "Meet the target bundles in the word deck first.";
  const sentenceButton = $('[data-practice-mode="sentences"]');
  const checkpointButton = $('[data-practice-mode="checkpoint"]');
  sentenceButton.disabled = available.length === 0;
  checkpointButton.disabled = available.length < module.questions.length;
  $("#practiceStart").hidden = false;
  $("#activityShell").hidden = true;
  $("#quizSummary").hidden = true;
  hideActivities();
}

function hideActivities() {
  ["#quizShell", "#listeningTask", "#readingTask", "#writingTask", "#speakingTask"].forEach(selector => { $(selector).hidden = true; });
}

function openPracticeMode(mode) {
  const module = activeModule();
  if (mode === "sentences" && !availableQuestionsFor(module).length) {
    announceModule({ code: module.code, title: "Meet the target word bundles before sentence practice" });
    go("learn");
    return;
  }
  if (mode === "checkpoint" && availableQuestionsFor(module).length < module.questions.length) {
    announceModule({ code: module.code, title: "Meet the remaining target bundles before the checkpoint" });
    go("learn");
    return;
  }
  $("#practiceStart").hidden = true;
  $("#activityShell").hidden = false;
  $("#quizSummary").hidden = true;
  hideActivities();
  const names = { sentences: "SENTENCE LAB", checkpoint: "MODULE CHECKPOINT", listening: "LISTENING", reading: "READING", writing: "WRITING", speaking: "SPEAKING" };
  $("#activityName").textContent = names[mode];
  if (mode === "sentences") startQuiz(false);
  if (mode === "checkpoint") startQuiz(true);
  if (mode === "listening") renderListening();
  if (mode === "reading") renderReading();
  if (mode === "writing") renderWriting();
  if (mode === "speaking") renderSpeaking();
}

function startQuiz(checkpoint) {
  const module = activeModule();
  const source = checkpoint ? module.questions : availableQuestionsFor(module);
  const questions = [...source].sort(() => Math.random() - .5);
  quiz = { moduleId: module.id, checkpoint, questions, index: 0, firstCorrect: 0, recovered: 0, missed: [], originalTotal: questions.length, retry: false };
  $("#quizShell").hidden = false;
  renderQuestion();
}

function renderQuestion() {
  const question = quiz.questions[quiz.index];
  if (!question) return finishQuizSet();
  $("#quizMode").textContent = quiz.retry ? "REPAIR PASS" : quiz.checkpoint ? "MODULE CHECKPOINT" : "SENTENCE LAB";
  $("#quizProgress").textContent = `${quiz.index + 1} / ${quiz.questions.length}`;
  $("#quizProgressBar").style.width = `${((quiz.index + 1) / quiz.questions.length) * 100}%`;
  $("#quizType").textContent = question.type;
  $("#quizContext").textContent = question.context;
  $("#quizPrompt").textContent = question.prompt;
  const bank = question.wordBank || [];
  $("#quizWordBank").hidden = bank.length === 0;
  $("#quizWordBank").innerHTML = bank.map(word => `<span>${escapeHtml(word)}</span>`).join("");
  $("#quizInput").value = "";
  $("#quizInput").disabled = false;
  $("#quizFeedback").hidden = true;
  $("#quizFeedback").className = "quiz-feedback";
  $("#quizCorrectAnswer").textContent = "";
  $("#quizForm").hidden = false;
  setTimeout(() => $("#quizInput").focus(), 40);
}

function cleanSpacing(value) {
  return String(value ?? "").trim().replace(/[“”]/g, '"').replace(/[’]/g, "'").replace(/\s+/g, " ").replace(/\s+([,.!?;:])/g, "$1");
}

function stripTerminal(value) {
  return cleanSpacing(value).replace(/[.!?]+$/g, "").trim();
}

function stripPunctuation(value) {
  return cleanSpacing(value).replace(/[.,!?;:()[\]{}"„“”‚‘’]+/g, "").replace(/\s+/g, " ").trim();
}

function foldSpelling(value) {
  return String(value).toLocaleLowerCase("de-DE").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
}

function editDistance(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j += 1) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i += 1) {
    for (let j = 1; j <= a.length; j += 1) {
      matrix[i][j] = b[i - 1] === a[j - 1] ? matrix[i - 1][j - 1] : 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
    }
  }
  return matrix[b.length][a.length];
}

function classifyAnswer(value, answers, level) {
  const raw = cleanSpacing(value);
  const strictMechanics = levelRank[level] >= levelRank.B1;
  for (const answer of answers) {
    const expected = cleanSpacing(answer);
    if (raw === expected) return { correct: true, answer: answers[0], note: "" };
  }
  for (const answer of answers) {
    const expected = cleanSpacing(answer);
    const rawWords = stripPunctuation(raw);
    const expectedWords = stripPunctuation(expected);
    const sameWords = foldSpelling(rawWords) === foldSpelling(expectedWords);
    if (!sameWords) continue;
    const samePunctuation = foldSpelling(raw) === foldSpelling(expected);
    const punctuationDifference = !samePunctuation;
    const caseDifference = rawWords !== expectedWords && rawWords.toLocaleLowerCase("de-DE") === expectedWords.toLocaleLowerCase("de-DE");
    const spellingFallback = foldSpelling(rawWords) === foldSpelling(expectedWords) && rawWords.toLocaleLowerCase("de-DE") !== expectedWords.toLocaleLowerCase("de-DE") && !caseDifference;
    if (strictMechanics && punctuationDifference) return { correct: false, near: true, kind: "punctuation", answer: answers[0], note: `Match the standard punctuation: ${expected}` };
    if (strictMechanics && caseDifference) return { correct: false, near: true, kind: "capitalization", answer: answers[0], note: "Capitalization is the remaining issue. Check the sentence opening and every German noun." };
    const notes = [];
    if (punctuationDifference) notes.push("Use the standard punctuation shown below");
    if (caseDifference) notes.push("Check the standard capitalization shown below");
    if (spellingFallback) notes.push("The keyboard spelling is accepted. The standard German spelling appears below");
    return { correct: true, answer: answers[0], note: notes.join(". ") + (notes.length ? "." : "") };
  }
  const foldedRaw = foldSpelling(stripTerminal(raw));
  const closest = answers.reduce((best, answer) => {
    const distance = editDistance(foldedRaw, foldSpelling(stripTerminal(answer)));
    return distance < best.distance ? { distance, answer } : best;
  }, { distance: Infinity, answer: answers[0] });
  return { correct: false, near: closest.distance <= Math.max(1, Math.round(foldedRaw.length * .08)), answer: answers[0], note: "" };
}

function tokens(value) {
  return stripTerminal(value).split(/\s+/).filter(Boolean);
}

function diagnoseDifference(value, answer) {
  const actual = tokens(value);
  const expected = tokens(answer);
  const actualFolded = actual.map(foldSpelling);
  const expectedFolded = expected.map(foldSpelling);
  if (actual.length === expected.length) {
    const differences = expectedFolded.map((token, index) => token === actualFolded[index] ? -1 : index).filter(index => index >= 0);
    if (differences.length === 1) {
      const index = differences[0];
      return `At word ${index + 1}, you wrote “${actual[index]}”. This sentence needs “${expected[index]}” in that position.`;
    }
  }
  if (expected.length === actual.length + 1) {
    for (let index = 0; index < expected.length; index += 1) {
      const removed = expectedFolded.filter((_, itemIndex) => itemIndex !== index);
      if (removed.join(" ") === actualFolded.join(" ")) return `Add “${expected[index]}” at word ${index + 1}.`;
    }
  }
  if (actual.length === expected.length + 1) {
    for (let index = 0; index < actual.length; index += 1) {
      const removed = actualFolded.filter((_, itemIndex) => itemIndex !== index);
      if (removed.join(" ") === expectedFolded.join(" ")) return `Remove “${actual[index]}” from this sentence.`;
    }
  }
  return "Compare the word forms and sentence order with the standard answer below.";
}

function updateQuestionEvidence(question, result, retry) {
  const module = moduleById(quiz.moduleId);
  const record = moduleRecord(module.id);
  const stamp = now();
  if (!retry) {
    record.attempts += 1;
    state.quiz.attempts += 1;
  }
  if (result.correct) {
    if (retry) {
      quiz.recovered += 1;
      state.quiz.recovered += 1;
    } else {
      quiz.firstCorrect += 1;
      state.quiz.firstCorrect += 1;
      record.firstCorrect += 1;
      record.completedPrompts[question.id] = true;
    }
    question.requires.forEach(localId => {
      const id = globalWordId(module.id, localId);
      const word = wordRecord(id);
      const delayed = word.lastTest && stamp - word.lastTest >= 20 * 3600000;
      word.production = (word.production || 0) + (retry ? .25 : 1);
      word.score = (word.score || 0) + (retry ? .08 : .5);
      if (delayed) word.delayed = (word.delayed || 0) + 1;
      word.retryCredit = (word.retryCredit || 0) + (retry ? .1 : 0);
      word.lastTest = stamp;
      word.lastSeen = stamp;
      addDay(word);
      const tier = tierFor(word);
      word.nextReview = stamp + ({ introduced: dayMs, practicing: 2 * dayMs, retrievable: 5 * dayMs, durable: 12 * dayMs })[tier];
    });
  } else {
    quiz.missed.push(question);
    question.requires.forEach(localId => {
      const word = wordRecord(globalWordId(module.id, localId));
      word.misses = (word.misses || 0) + 1;
      word.lastTest = stamp;
      word.nextReview = stamp + 6 * 3600000;
    });
  }
  record.started = true;
  saveState();
}

function submitQuizAnswer(event) {
  event.preventDefault();
  const value = $("#quizInput").value;
  if (!value.trim()) return;
  const question = quiz.questions[quiz.index];
  const module = moduleById(quiz.moduleId);
  const result = classifyAnswer(value, question.answers, module.level);
  updateQuestionEvidence(question, result, quiz.retry);
  const feedback = $("#quizFeedback");
  feedback.hidden = false;
  feedback.className = `quiz-feedback ${result.correct ? "" : result.near ? "close" : "wrong"}`.trim();
  $("#quizFeedbackMark").textContent = result.correct ? "✓" : result.near ? "≈" : "!";
  $("#quizFeedbackTitle").textContent = result.correct ? "Sentence accepted." : result.near ? "One form needs repair." : "Check the marked difference.";
  const detail = result.correct ? `${question.explanation}${result.note ? ` ${result.note}` : ""}` : `${result.note || diagnoseDifference(value, result.answer)} ${question.explanation}`;
  $("#quizFeedbackText").textContent = detail;
  $("#quizCorrectAnswer").textContent = `Standard answer: ${result.answer}`;
  $("#quizInput").disabled = true;
  $("#quizForm").hidden = true;
  $("#quizNext").innerHTML = quiz.index === quiz.questions.length - 1 ? 'See results <span>→</span>' : 'Next <span>→</span>';
}

function nextQuizQuestion() {
  quiz.index += 1;
  if (quiz.index >= quiz.questions.length) finishQuizSet();
  else renderQuestion();
}

function finishQuizSet() {
  $("#quizShell").hidden = true;
  $("#activityShell").hidden = true;
  $("#quizSummary").hidden = false;
  const stillMissed = quiz.missed.length;
  const total = quiz.originalTotal;
  if (quiz.checkpoint && !quiz.retry) {
    const record = moduleRecord(quiz.moduleId);
    record.checkpointScore = quiz.firstCorrect / Math.max(1, total);
    record.checkpointAt = today();
    saveState();
  }
  $("#summaryTitle").textContent = quiz.retry ? `${quiz.recovered} question${quiz.recovered === 1 ? "" : "s"} repaired.` : `${quiz.firstCorrect} of ${total} correct on the first pass.`;
  $("#summaryText").textContent = stillMissed ? `${stillMissed} question${stillMissed === 1 ? " is" : "s are"} ready for a focused repair pass.` : "This set is clear for today. A later return will test how well it holds.";
  $("#summaryCorrect").textContent = quiz.firstCorrect;
  $("#summaryRecovered").textContent = quiz.recovered;
  $("#summaryMissed").textContent = stillMissed;
  $("#retryMissed").hidden = stillMissed === 0;
}

function retryMissedQuestions() {
  const unique = [...new Map(quiz.missed.map(question => [question.id, question])).values()];
  quiz.questions = unique;
  quiz.index = 0;
  quiz.missed = [];
  quiz.retry = true;
  $("#quizSummary").hidden = true;
  $("#activityShell").hidden = false;
  $("#quizShell").hidden = false;
  renderQuestion();
}

function renderListening() {
  const module = activeModule();
  $("#listeningTask").hidden = false;
  $("#listeningTitle").textContent = `${module.code}: Listen for the useful detail`;
  $("#listeningContext").textContent = "Play the German message, then answer the question. The transcript appears after you submit.";
  $("#listeningPrompt").textContent = module.input.listenPrompt;
  $("#listeningInput").value = "";
  $("#listeningFeedback").hidden = true;
}

function submitListening(event) {
  event.preventDefault();
  const module = activeModule();
  const value = $("#listeningInput").value;
  if (!value.trim()) return;
  const result = classifyAnswer(value, module.input.listenAnswers, module.level);
  const record = moduleRecord(module.id);
  record.listening = Math.max(record.listening || 0, result.correct ? 1 : .4);
  state.skills.listening.attempts += 1;
  if (result.correct) state.skills.listening.correct += 1;
  saveState();
  const feedback = $("#listeningFeedback");
  feedback.hidden = false;
  feedback.className = `task-feedback ${result.correct ? "success" : "repair"}`;
  feedback.innerHTML = `<h3>${result.correct ? "Meaning secured." : "Review the detail."}</h3><p>${result.correct ? "Your answer matches the message." : diagnoseDifference(value, result.answer)}</p><p><strong>Answer:</strong> ${escapeHtml(result.answer)}</p><p class="model"><strong>Transcript:</strong> ${escapeHtml(module.input.script)}</p>`;
}

function renderReading() {
  const module = activeModule();
  $("#readingTask").hidden = false;
  $("#readingTitle").textContent = `${module.code}: Read for a clear purpose`;
  $("#readingPassage").textContent = module.input.passage;
  $("#readingPrompt").textContent = module.input.readPrompt;
  $("#readingInput").value = "";
  $("#readingFeedback").hidden = true;
}

function submitReading(event) {
  event.preventDefault();
  const module = activeModule();
  const value = $("#readingInput").value;
  if (!value.trim()) return;
  const result = classifyAnswer(value, module.input.readAnswers, module.level);
  const record = moduleRecord(module.id);
  record.reading = Math.max(record.reading || 0, result.correct ? 1 : .4);
  state.skills.reading.attempts += 1;
  if (result.correct) state.skills.reading.correct += 1;
  saveState();
  const feedback = $("#readingFeedback");
  feedback.hidden = false;
  feedback.className = `task-feedback ${result.correct ? "success" : "repair"}`;
  feedback.innerHTML = `<h3>${result.correct ? "Detail located." : "Return to the relevant sentence."}</h3><p>${result.correct ? "Your answer is supported by the text." : diagnoseDifference(value, result.answer)}</p><p><strong>Answer:</strong> ${escapeHtml(result.answer)}</p>`;
}

function countWords(value) {
  return String(value).trim() ? String(value).trim().split(/\s+/).length : 0;
}

function requirementMet(text, requirement) {
  const options = Array.isArray(requirement) ? requirement : [requirement];
  const folded = foldSpelling(text);
  return options.some(option => folded.includes(foldSpelling(option)));
}

function renderWriting() {
  const module = activeModule();
  const task = module.task;
  $("#writingTask").hidden = false;
  $("#writingTitle").textContent = `${module.code}: ${module.title}`;
  $("#writingPrompt").textContent = task.writingPrompt;
  $("#writingGuide").innerHTML = task.guide.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  $("#writingInput").value = "";
  $("#writingCount").textContent = `0 words · target ${task.minWords}+`;
  $("#writingFeedback").hidden = true;
}

function checkWriting() {
  const module = activeModule();
  const task = module.task;
  const text = $("#writingInput").value;
  const words = countWords(text);
  if (!words) return;
  const requirements = task.required.map(item => ({ item: Array.isArray(item) ? item.join(" or ") : item, met: requirementMet(text, item) }));
  const lengthMet = words >= task.minWords;
  const metCount = requirements.filter(item => item.met).length;
  const ratio = (metCount + (lengthMet ? 1 : 0)) / (requirements.length + 1);
  const record = moduleRecord(module.id);
  record.writing = Math.max(record.writing || 0, ratio);
  state.skills.writing.attempts += 1;
  saveState();
  const feedback = $("#writingFeedback");
  feedback.hidden = false;
  feedback.className = `task-feedback ${ratio === 1 ? "success" : "repair"}`;
  feedback.innerHTML = `<h3>${ratio === 1 ? "All requested building blocks are present." : "A revision pass has a clear target."}</h3><p>${lengthMet ? `Length target reached: ${words} words.` : `Current length: ${words} words. Target: ${task.minWords} or more.`}</p><ul>${requirements.map(item => `<li>${item.met ? "✓" : "○"} ${escapeHtml(item.item)}</li>`).join("")}</ul><p>This check tracks the requested features. Read the text aloud and compare its structure with the model.</p><p class="model"><strong>Model:</strong> ${escapeHtml(task.model)}</p>`;
}

function renderSpeaking() {
  const module = activeModule();
  const task = module.task;
  $("#speakingTask").hidden = false;
  $("#speakingTitle").textContent = `${module.code}: Speak from a short plan`;
  $("#speakingPrompt").textContent = task.speakingPrompt;
  $("#speakingGuide").innerHTML = task.speakingGuide.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  $("#speakingTranscript").value = "";
  $("#speakingFeedback").hidden = true;
  const supported = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  $("#startRecognition").disabled = !supported;
  $("#startRecognition").textContent = supported ? "Start microphone" : "Type a transcript here";
}

function startRecognition() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) return;
  const recognition = new Recognition();
  recognition.lang = "de-DE";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  $("#startRecognition").textContent = "Listening...";
  recognition.onresult = event => {
    $("#speakingTranscript").value = event.results[0][0].transcript;
    $("#startRecognition").textContent = "Record again";
  };
  recognition.onerror = () => { $("#startRecognition").textContent = "Try microphone again"; };
  recognition.onend = () => { if ($("#startRecognition").textContent === "Listening...") $("#startRecognition").textContent = "Record again"; };
  recognition.start();
}

function checkSpeaking() {
  const module = activeModule();
  const task = module.task;
  const text = $("#speakingTranscript").value;
  if (!text.trim()) return;
  const requirements = task.speakingRequired.map(item => ({ item: Array.isArray(item) ? item.join(" or ") : item, met: requirementMet(text, item) }));
  const ratio = requirements.filter(item => item.met).length / Math.max(1, requirements.length);
  const record = moduleRecord(module.id);
  record.speaking = Math.max(record.speaking || 0, ratio);
  state.skills.speaking.attempts += 1;
  saveState();
  const feedback = $("#speakingFeedback");
  feedback.hidden = false;
  feedback.className = `task-feedback ${ratio === 1 ? "success" : "repair"}`;
  feedback.innerHTML = `<h3>${ratio === 1 ? "The target phrases appear in the transcript." : "Repeat once with the missing target phrase."}</h3><ul>${requirements.map(item => `<li>${item.met ? "✓" : "○"} ${escapeHtml(item.item)}</li>`).join("")}</ul><p>A transcript can check selected words and forms. Listen to your recording for pace, clarity, and sentence stress.</p><p class="model"><strong>Model:</strong> ${escapeHtml(task.speakingModel)}</p>`;
}

function renderGrammar() {
  const module = activeModule();
  syncModuleControls();
  $("#grammarCards").innerHTML = module.grammar.map((item, index) => `<article class="grammar-card"><span>${module.code} · ${String(index + 1).padStart(2, "0")}</span><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.rule)}</p><div class="grammar-example"><strong>${escapeHtml(item.example)}</strong><small>${escapeHtml(item.translation)}</small></div></article>`).join("");
}

function renderVocabulary() {
  const scope = $("#vocabScope").value;
  const level = $("#vocabLevel").value;
  const query = foldSpelling($("#vocabSearch").value || "");
  const introduced = introducedWords();
  $("#unlockedCount").textContent = introduced.length;
  let words = scope === "introduced" ? introduced : allWords;
  words = words.filter(word => level === "all" || word.level === level);
  words = words.filter(word => !query || foldSpelling(`${word.de} ${word.en} ${word.bundle} ${word.example}`).includes(query));
  words = words.filter(word => vocabFilter === "all" || tierFor(state.words[word.globalId]) === vocabFilter);
  words.sort((a, b) => {
    const moduleCompare = modules.findIndex(module => module.id === a.moduleId) - modules.findIndex(module => module.id === b.moduleId);
    if (moduleCompare) return moduleCompare;
    return a.de.localeCompare(b.de, "de");
  });
  $("#emptyVocab").hidden = words.length > 0;
  $("#vocabRows").innerHTML = words.map(word => {
    const record = state.words[word.globalId];
    const tier = tierFor(record);
    const due = record?.nextReview && record.nextReview <= now();
    const module = moduleById(word.moduleId);
    return `<tr><td><strong>${escapeHtml(word.de)}</strong><small>${escapeHtml(word.bundle)}</small></td><td><span>${escapeHtml(word.en)}</span><small>${escapeHtml(word.example)}</small></td><td>${word.level}<small>${module.code}${word.supplemental ? " · expansion" : ""}</small></td><td><span class="tier-pill"><i class="tier-dot ${tier}"></i>${tierLabel(tier)}</span><div class="evidence-mini"><i style="width:${evidencePercent(record)}%"></i></div></td><td><button class="vocab-action" type="button" data-review-word="${word.globalId}">${due ? "Review due" : isIntroduced(word.globalId) ? "Review bundle" : "Meet word"}</button></td></tr>`;
  }).join("");
  $$('[data-review-word]').forEach(button => button.addEventListener("click", () => {
    targetedWordId = button.dataset.reviewWord;
    const word = wordByGlobalId(targetedWordId);
    setActiveModule(word.moduleId, true);
    targetedWordId = word.globalId;
    go("learn");
  }));
}

function renderCulture() {
  $("#cultureLevelTabs").innerHTML = levels.map(level => `<button type="button" class="${cultureLevel === level.id ? "active" : ""}" data-culture-level="${level.id}">${level.id}</button>`).join("");
  const group = modules.filter(module => module.level === cultureLevel);
  $("#cultureGrid").innerHTML = group.map((module, index) => `<article class="culture-card ${index === 0 ? "featured" : ""}"><span class="culture-index">${module.code} · ${escapeHtml(module.title.toUpperCase())}</span><h2>${escapeHtml(module.culture.title)}</h2><p>${escapeHtml(module.culture.body)}</p><div class="culture-language">${module.culture.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div><a href="${escapeHtml(module.culture.url)}" target="_blank" rel="noreferrer">${escapeHtml(module.culture.sourceTitle)} source ↗</a></article>`).join("");
  $$('[data-culture-level]').forEach(button => button.addEventListener("click", () => {
    cultureLevel = button.dataset.cultureLevel;
    state.cultureLevel = cultureLevel;
    saveState();
    renderCulture();
  }));
}

function skillModuleCount(skill) {
  return modules.filter(module => Number(state.modules[module.id]?.[skill]) > 0).length;
}

function renderProgress() {
  const words = introducedWords();
  const accuracy = state.quiz.attempts ? Math.round((state.quiz.firstCorrect / state.quiz.attempts) * 100) : null;
  const started = modules.filter(module => state.modules[module.id]?.started || moduleWordCount(module, true) > 0).length;
  $("#progressWords").textContent = words.length;
  $("#progressWordsDetail").textContent = `of ${allWords.length} course bundles`;
  $("#progressAccuracy").textContent = accuracy == null ? "No data" : `${accuracy}%`;
  $("#progressModules").textContent = started;
  $("#progressModulesDetail").textContent = `of ${modules.length} available`;
  $("#progressDue").textContent = dueWords().length;
  const skills = [
    { key: "vocabulary", label: "Vocabulary bundles", value: Math.round(words.length / allWords.length * 100), detail: `${words.length} encountered` },
    { key: "sentences", label: "Typed sentence production", value: Math.round(Object.values(state.modules).reduce((sum, item) => sum + Object.keys(item.completedPrompts || {}).length, 0) / allQuestions.length * 100), detail: `${state.quiz.attempts} first-pass attempts` },
    { key: "listening", label: "Listening", value: Math.round(skillModuleCount("listening") / modules.length * 100), detail: `${skillModuleCount("listening")} modules practiced` },
    { key: "reading", label: "Reading", value: Math.round(skillModuleCount("reading") / modules.length * 100), detail: `${skillModuleCount("reading")} modules practiced` },
    { key: "writing", label: "Guided writing", value: Math.round(skillModuleCount("writing") / modules.length * 100), detail: `${skillModuleCount("writing")} modules practiced` },
    { key: "speaking", label: "Guided speaking", value: Math.round(skillModuleCount("speaking") / modules.length * 100), detail: `${skillModuleCount("speaking")} modules practiced` }
  ];
  $("#skillEvidence").innerHTML = skills.map(skill => `<div class="evidence-row"><div><strong>${skill.label}</strong><span>${skill.detail}</span></div><div class="evidence-track"><i style="width:${Math.min(100, skill.value)}%"></i></div></div>`).join("");
  $("#progressLevels").innerHTML = levels.map(level => {
    const group = modules.filter(module => module.level === level.id);
    const startedAtLevel = group.filter(module => state.modules[module.id]?.started || moduleWordCount(module, true) > 0).length;
    const progress = levelProgress(level.id);
    return `<div class="progress-level"><b>${level.id}</b><div><span>${escapeHtml(level.title)} · ${startedAtLevel} of ${group.length} modules started</span><div><i style="width:${progress}%"></i></div></div><small>${progress}% evidence</small></div>`;
  }).join("");
}

function renderSources() {
  $("#sourceList").innerHTML = course.sources.map(source => `<article><span>${escapeHtml(source.category)}</span><h2>${escapeHtml(source.title)}</h2><p>${escapeHtml(source.body)}</p><a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">Open source ↗</a></article>`).join("");
}

function registerModelTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const lifecycle = new AbortController();
  const register = tool => { try { void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); } catch {} };
  register({
    name: "read_learning_state",
    title: "Read Satzwerk learning state",
    description: "Read the active module, encountered vocabulary, scheduled reviews, typed prompt accuracy, and skill activity without changing progress.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute() {
      return { activeModule: state.activeModule, level: activeModule().level, introducedWords: introducedWords().length, totalWords: allWords.length, dueWords: dueWords().length, totalModules: modules.length, overallEvidence: overallProgress(), quizAccuracy: state.quiz.attempts ? state.quiz.firstCorrect / state.quiz.attempts : null };
    }
  });
  register({
    name: "open_learning_view",
    title: "Open Satzwerk view",
    description: "Open one visible Satzwerk area.",
    inputSchema: { type: "object", properties: { view: { type: "string", enum: ["home", "course", "learn", "practice", "grammar", "vocabulary", "culture", "progress", "sources"] } }, required: ["view"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) { go(input.view); return { opened: input.view }; }
  });
}

function bindEvents() {
  $$('[data-view]').forEach(button => button.addEventListener("click", () => go(button.dataset.view)));
  $$('[data-go]').forEach(button => button.addEventListener("click", () => go(button.dataset.go)));
  $("#learnModuleSelect").addEventListener("change", event => { setActiveModule(event.target.value); prepareDeck(); });
  $("#practiceModuleSelect").addEventListener("change", event => { setActiveModule(event.target.value); renderPracticeMenu(); });
  $("#grammarModuleSelect").addEventListener("change", event => { setActiveModule(event.target.value); renderGrammar(); });
  $("#flashcard").addEventListener("click", revealCard);
  $("#cardDirection").addEventListener("change", event => { state.cardDirection = event.target.value; saveState(); renderCard(); });
  $("#shuffleDeck").addEventListener("click", () => { deck = [...deck].sort(() => Math.random() - .5); deckIndex = 0; renderCard(); renderDeckStrip(); });
  $("#speakWord").addEventListener("click", () => { if (deck[deckIndex]) speakText(deck[deckIndex].de); });
  $$('[data-rating]').forEach(button => button.addEventListener("click", () => rateCard(button.dataset.rating)));
  $("#learnToPractice").addEventListener("click", () => go("practice"));
  $("#practiceLearnFirst").addEventListener("click", () => go("learn"));
  $$('[data-practice-mode]').forEach(button => button.addEventListener("click", () => openPracticeMode(button.dataset.practiceMode)));
  $("#activityBack").addEventListener("click", renderPracticeMenu);
  $("#quizForm").addEventListener("submit", submitQuizAnswer);
  $("#quizNext").addEventListener("click", nextQuizQuestion);
  $("#retryMissed").addEventListener("click", retryMissedQuestions);
  $("#finishQuiz").addEventListener("click", renderPracticeMenu);
  $("#playListening").addEventListener("click", () => speakText(activeModule().input.script));
  $("#listeningForm").addEventListener("submit", submitListening);
  $("#readingForm").addEventListener("submit", submitReading);
  $("#writingInput").addEventListener("input", event => { $("#writingCount").textContent = `${countWords(event.target.value)} words · target ${activeModule().task.minWords}+`; });
  $("#checkWriting").addEventListener("click", checkWriting);
  $("#hearSpeakingModel").addEventListener("click", () => speakText(activeModule().input.script));
  $("#startRecognition").addEventListener("click", startRecognition);
  $("#checkSpeaking").addEventListener("click", checkSpeaking);
  ["#vocabScope", "#vocabLevel"].forEach(selector => $(selector).addEventListener("change", renderVocabulary));
  $("#vocabSearch").addEventListener("input", renderVocabulary);
  $$('[data-tier]').forEach(button => button.addEventListener("click", () => {
    vocabFilter = button.dataset.tier;
    $$('[data-tier]').forEach(item => item.classList.toggle("active", item === button));
    renderVocabulary();
  }));
  $("#resetProgress").addEventListener("click", () => $("#resetDialog").showModal());
  $("#confirmReset").addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    window.location.reload();
  });
}

migrateLegacyWords();
populateStaticControls();
bindEvents();
syncModuleControls();
renderHome();
registerModelTools();
