const targets = {
  papier: { article: "das", word: "Papier", meta: "neuter · material", plural: "die Papiere · documents" },
  tisch: { article: "der", word: "Tisch", meta: "masculine · object", plural: "die Tische · tables" },
  tuer: { article: "die", word: "Tür", meta: "feminine · place/object", plural: "die Türen · doors" }
};

const exercises = [
  {
    group: 0, target: "papier", label: "Complete the thought",
    roundIntro: ["Start with das Papier", "Papier means paper and is neuter. When it means paper as a material, German often uses it without an article."],
    lesson: "You are supplying a material, not counting individual sheets. That is why no article is needed here.",
    context: "The office printer stops. Your colleague asks what is missing.",
    sentence: 'Wir brauchen noch <span class="blank">_____</span> für den Drucker.',
    placeholder: "Type the missing word…", inputHelp: "Write only the missing word.",
    answers: ["Papier"], keyTerms: ["papier"], capitalNouns: ["Papier"],
    hint: "Think of the material itself. German normally leaves out the article in this sentence.",
    success: "Papier is an uncounted material here, so it stands on its own.",
    trace: ["das Papier", "material use", "no article"],
    pieces: [["SUBJECT", "wir", "subject"], ["VERB", "brauchen", "verb"], ["TARGET", "Papier", "target", true], ["PURPOSE", "für den Drucker", "context"]]
  },
  {
    group: 0, target: "papier", label: "Build the noun phrase",
    lesson: "When no article carries the gender signal, the adjective carries it. For neuter Papier here, recycelt gains -es.",
    vocab: [["recycelt", "recycled"]],
    context: "A parcel arrives wrapped in recycled paper. Complete the German phrase.",
    sentence: 'Das Paket ist in <span class="blank">_____</span> eingewickelt.',
    placeholder: "recycled paper…", inputHelp: "The needed vocabulary is in the word bank above.",
    answers: ["recyceltes Papier"], keyTerms: ["papier"], capitalNouns: ["Papier"],
    hint: "There is no article before Papier, so the adjective must show the neuter ending.",
    success: "With no article before it, recyceltes carries the neuter signal.",
    trace: ["das Papier", "no article", "strong ending · -es"],
    pieces: [["PREPOSITION", "in", "context"], ["ADJECTIVE", "recyceltes", "verb", true], ["TARGET", "Papier", "target", true]]
  },
  {
    group: 0, target: "papier", label: "Choose the case",
    lesson: "Two-way prepositions answer two different questions: wo? (location) takes dative; wohin? (destination) takes accusative.",
    context: "The address is already written there. Express “on the paper.”",
    sentence: 'Die Adresse steht <span class="blank">_____</span>.',
    placeholder: "on the paper…", inputHelp: "Write the complete missing phrase.",
    answers: ["auf dem Papier"], keyTerms: ["papier"], capitalNouns: ["Papier"],
    hint: "Nothing is moving. Ask wo? and use the dative form of das.",
    success: "The address is already located there: wo? leads to dative.",
    trace: ["location · wo?", "auf + dative", "das → dem"],
    pieces: [["SUBJECT", "die Adresse", "subject"], ["VERB", "steht", "verb"], ["LOCATION", "auf dem", "context", true], ["TARGET", "Papier", "target", true]],
    diagnose: value => englishWord(value, "on", "auf", "Your dative article dem is useful evidence that you understood the location.") ||
      (value.includes("auf das") ? "You chose the right preposition. The address is already located there, so wo? requires dative: das changes to dem." : null)
  },
  {
    group: 0, target: "papier", label: "Reverse the contrast",
    context: "Now the number is not there yet. Tell someone to write it onto the paper.",
    sentence: 'Schreib die Nummer <span class="blank">_____</span>.',
    placeholder: "onto the paper…", inputHelp: "Write the complete missing phrase.",
    answers: ["auf das Papier"], keyTerms: ["papier"], capitalNouns: ["Papier"],
    hint: "The number is moving toward a destination. Ask wohin? and use accusative.",
    success: "The number has a destination: wohin? leads to accusative.",
    trace: ["destination · wohin?", "auf + accusative", "das stays das"],
    pieces: [["COMMAND", "schreib", "verb"], ["OBJECT", "die Nummer", "subject"], ["DIRECTION", "auf das", "context", true], ["TARGET", "Papier", "target", true]],
    diagnose: value => englishWord(value, "onto", "auf", "The article still needs to show the destination case.") || englishWord(value, "on", "auf", "The article still needs to show the destination case.") ||
      (value.includes("auf dem") ? "You chose the right preposition. Because the number moves onto a destination, wohin? requires accusative: use das, not dem." : null)
  },
  {
    group: 1, target: "tisch", label: "Transfer the location pattern",
    roundIntro: ["Switching to der Tisch", "The target has changed deliberately. Apply the same wo/wohin decision to a masculine noun; its article will expose the case more clearly."],
    lesson: "Tisch is masculine: der Tisch. In the dative, der becomes dem.",
    vocab: [["das Glas", "glass"], ["stehen", "to stand / be positioned"]],
    context: "Say: “The glass is on the table.”",
    sentence: '<span class="blank">Build the complete German sentence.</span>',
    placeholder: "Write the sentence…", inputHelp: "Write one complete sentence.",
    answers: ["Das Glas steht auf dem Tisch."], punctuation: ".", fullSentence: true,
    keyTerms: ["glas", "tisch"], capitalNouns: ["Glas", "Tisch"],
    hint: "The glass is already there. Use the location pattern: wo? + dative.",
    success: "You transferred the location pattern to a masculine noun.",
    trace: ["location · wo?", "der → dem", "pattern transferred"],
    pieces: [["SUBJECT", "das Glas", "subject", true], ["VERB", "steht", "verb", true], ["LOCATION", "auf dem", "context", true], ["TARGET", "Tisch", "target", true]],
    diagnose: value => englishWord(value, "on", "auf", "Your use of dem may still show that you understood the case.") ||
      (value.includes("auf den") ? "The preposition is right, but den signals a destination. The glass is already located there, so use dative." : null)
  },
  {
    group: 1, target: "tisch", label: "Make it move",
    vocab: [["stellen", "to put / place"], ["das Glas", "glass"]],
    context: "Tell a friend: “Put the glass onto the table.”",
    sentence: '<span class="blank">Build the complete German sentence.</span>',
    placeholder: "Write the command…", inputHelp: "Write one complete command.",
    answers: ["Stell das Glas auf den Tisch.", "Stelle das Glas auf den Tisch."], punctuation: ".", fullSentence: true,
    keyTerms: ["glas", "tisch"], capitalNouns: ["Glas", "Tisch"],
    hint: "The glass changes location. Use the destination pattern: wohin? + accusative.",
    success: "The object moves toward a destination, so der Tisch becomes den Tisch.",
    trace: ["destination · wohin?", "der → den", "command"],
    pieces: [["COMMAND", "stell", "verb", true], ["OBJECT", "das Glas", "subject", true], ["DIRECTION", "auf den", "context", true], ["TARGET", "Tisch", "target", true]],
    diagnose: value => englishWord(value, "onto", "auf", "Now let the article show the destination case.") || englishWord(value, "on", "auf", "Now let the article show the destination case.") ||
      (value.includes("auf dem") ? "The preposition is right, but dem describes a location. The glass is moving to a destination, so use accusative." : null)
  },
  {
    group: 1, target: "tisch", label: "Add a new preposition",
    lesson: "unter follows the same two-way pattern as auf. Here the key is already under the table, so use dative.",
    vocab: [["der Schlüssel", "key"], ["liegen", "to lie / be located"], ["unter", "under"]],
    context: "Say: “The key is under the table.”",
    sentence: '<span class="blank">Build the complete German sentence.</span>',
    placeholder: "Write the sentence…", inputHelp: "Use the supplied vocabulary to build the sentence.",
    answers: ["Der Schlüssel liegt unter dem Tisch."], punctuation: ".", fullSentence: true,
    keyTerms: ["schluessel", "tisch"], capitalNouns: ["Schlüssel", "Tisch"],
    hint: "The key is already in that location. Ask wo? and put der Tisch into dative.",
    success: "You carried the location rule from auf to another two-way preposition.",
    trace: ["location · wo?", "unter + dative", "der → dem"],
    pieces: [["SUBJECT", "der Schlüssel", "subject", true], ["VERB", "liegt", "verb", true], ["LOCATION", "unter dem", "context", true], ["TARGET", "Tisch", "target", true]],
    diagnose: value => englishWord(value, "under", "unter", "Keep the rest of your German structure.") ||
      (value.includes("unter den") ? "unter is correct. Because the key is already located there, wo? requires dative: dem, not den." : null)
  },
  {
    group: 1, target: "tisch", label: "Reverse it again",
    vocab: [["schieben", "to push"], ["der Stuhl", "chair"], ["unter", "under"]],
    context: "Say: “I push the chair under the table.”",
    sentence: '<span class="blank">Build the complete German sentence.</span>',
    placeholder: "Write the sentence…", inputHelp: "Use the supplied vocabulary to build the sentence.",
    answers: ["Ich schiebe den Stuhl unter den Tisch."], punctuation: ".", fullSentence: true,
    keyTerms: ["stuhl", "tisch"], capitalNouns: ["Stuhl", "Tisch"],
    hint: "The chair moves toward a new destination. Ask wohin? after unter.",
    success: "The chair moves into a new position, so both masculine objects use accusative den.",
    trace: ["destination · wohin?", "unter + accusative", "der → den"],
    pieces: [["SUBJECT", "ich", "subject", true], ["VERB", "schiebe", "verb", true], ["OBJECT", "den Stuhl", "subject", true], ["DIRECTION", "unter den", "context", true], ["TARGET", "Tisch", "target", true]],
    diagnose: value => englishWord(value, "under", "unter", "The case still needs to show movement toward a destination.") ||
      (value.includes("unter dem") ? "unter is correct, but dem describes a location. The chair is moving somewhere, so wohin? requires accusative." : null)
  },
  {
    group: 2, target: "tuer", label: "Change the gender",
    roundIntro: ["Switching to die Tür", "This is a new feminine target. The rule has not changed: wo? still takes dative and wohin? still takes accusative."],
    lesson: "Tür is feminine: die Tür. For a location after vor, die changes to der.",
    vocab: [["die Schuhe", "shoes"], ["stehen", "to stand / be positioned"], ["vor", "in front of"]],
    context: "Say: “The shoes are in front of the door.”",
    sentence: '<span class="blank">Build the complete German sentence.</span>',
    placeholder: "Write the sentence…", inputHelp: "Write one complete sentence.",
    answers: ["Die Schuhe stehen vor der Tür."], punctuation: ".", fullSentence: true,
    keyTerms: ["schuhe", "tuer"], capitalNouns: ["Schuhe", "Tür"],
    hint: "The shoes are already located there. Ask wo? and use dative.",
    success: "The feminine article makes the dative visible: die Tür becomes der Tür.",
    trace: ["location · wo?", "vor + dative", "die → der"],
    pieces: [["SUBJECT", "die Schuhe", "subject", true], ["VERB", "stehen", "verb", true], ["LOCATION", "vor der", "context", true], ["TARGET", "Tür", "target", true]],
    diagnose: value => englishWord(value, "in front of", "vor", "Keep the German case ending you chose.") ||
      (value.includes("vor die") ? "vor is correct. Because the shoes are already there, wo? requires dative: der Tür." : null)
  },
  {
    group: 2, target: "tuer", label: "Move toward it",
    vocab: [["stellen", "to put / place"], ["die Schuhe", "shoes"], ["vor", "in front of"]],
    context: "Tell someone: “Put the shoes in front of the door.”",
    sentence: '<span class="blank">Build the complete German sentence.</span>',
    placeholder: "Write the command…", inputHelp: "Write one complete command.",
    answers: ["Stell die Schuhe vor die Tür.", "Stelle die Schuhe vor die Tür."], punctuation: ".", fullSentence: true,
    keyTerms: ["schuhe", "tuer"], capitalNouns: ["Schuhe", "Tür"],
    hint: "The shoes move toward a destination. Ask wohin? and use accusative.",
    success: "The shoes move to a destination. For feminine nouns, accusative keeps die.",
    trace: ["destination · wohin?", "vor + accusative", "die stays die"],
    pieces: [["COMMAND", "stell", "verb", true], ["OBJECT", "die Schuhe", "subject", true], ["DIRECTION", "vor die", "context", true], ["TARGET", "Tür", "target", true]],
    diagnose: value => englishWord(value, "in front of", "vor", "The article still needs to show the destination case.") ||
      (value.includes("vor der") ? "vor is correct, but der describes a location. The shoes are moving to a destination, so use accusative die." : null)
  },
  {
    group: 2, target: "tuer", label: "Use a different frame",
    lesson: "With an, the same contrast applies. The note moves onto the door, so an takes accusative.",
    vocab: [["kleben", "to stick / attach"], ["der Zettel", "note"], ["an", "on / against"]],
    context: "Say: “I stick the note onto the door.”",
    sentence: '<span class="blank">Build the complete German sentence.</span>',
    placeholder: "Write the sentence…", inputHelp: "Use the supplied vocabulary to build the sentence.",
    answers: ["Ich klebe den Zettel an die Tür."], punctuation: ".", fullSentence: true,
    keyTerms: ["zettel", "tuer"], capitalNouns: ["Zettel", "Tür"],
    hint: "The note moves onto a destination. Ask wohin? after an.",
    success: "You transferred the destination rule to an without relying on the earlier sentence.",
    trace: ["destination · wohin?", "an + accusative", "die stays die"],
    pieces: [["SUBJECT", "ich", "subject", true], ["VERB", "klebe", "verb", true], ["OBJECT", "den Zettel", "subject", true], ["DIRECTION", "an die", "context", true], ["TARGET", "Tür", "target", true]],
    diagnose: value => englishWord(value, "on", "an", "German uses an for contact with this vertical surface.") ||
      (value.includes("an der") ? "an is correct, but der describes a location. The note moves onto the door, so use accusative die." : null)
  },
  {
    group: 2, target: "tuer", label: "Finish without a model",
    vocab: [["der Schlüssel", "key"], ["hinter", "behind"]],
    context: "Ask: “Is the key behind the door?”",
    sentence: '<span class="blank">Build the complete German question.</span>',
    placeholder: "Write the question…", inputHelp: "Write one complete question.",
    answers: ["Ist der Schlüssel hinter der Tür?"], punctuation: "?", fullSentence: true,
    keyTerms: ["schluessel", "tuer"], capitalNouns: ["Schlüssel", "Tür"],
    hint: "This is a yes/no question, so put the conjugated verb first. The key is already in a location.",
    success: "You combined question word order, a new preposition, and the dative location pattern.",
    trace: ["yes/no question", "verb in position 1", "hinter + dative"],
    pieces: [["VERB", "ist", "verb", true], ["SUBJECT", "der Schlüssel", "subject", true], ["LOCATION", "hinter der", "context", true], ["TARGET", "Tür", "target", true]],
    diagnose: value => englishWord(value, "behind", "hinter", "Keep the German question structure around it.") ||
      (value.includes("hinter die") ? "hinter is correct, but die signals a destination. The key is already located there, so use dative der." : null)
  }
];

let current = Number(localStorage.getItem("satzwerk-v2-current") || 0);
if (!Number.isInteger(current) || current < 0 || current >= exercises.length) current = 0;
let completed = new Set(JSON.parse(localStorage.getItem("satzwerk-v2-completed") || "[]"));
let knownWords = new Set(JSON.parse(localStorage.getItem("satzwerk-v2-words") || "[]"));
let hintShown = false;

const els = {
  form: document.querySelector("#answerForm"), input: document.querySelector("#answerInput"),
  label: document.querySelector("#promptLabel"), context: document.querySelector("#contextText"),
  sentence: document.querySelector("#sentenceText"), variation: document.querySelector("#variationNumber"),
  total: document.querySelector("#variationTotal"), feedback: document.querySelector("#feedback"),
  icon: document.querySelector("#feedbackIcon"), kicker: document.querySelector("#feedbackKicker"),
  title: document.querySelector("#feedbackTitle"), feedbackText: document.querySelector("#feedbackText"),
  trace: document.querySelector("#grammarTrace"), next: document.querySelector("#nextButton"),
  hint: document.querySelector("#hintButton"), frame: document.querySelector("#framePieces"),
  frameHeading: document.querySelector("#frameHeading"), sessionScore: document.querySelector("#sessionScore"),
  skillPercent: document.querySelector("#skillPercent"), inputHelp: document.querySelector("#inputHelp"),
  targetArticle: document.querySelector("#targetArticle"), targetWord: document.querySelector("#targetWord"),
  targetMeta: document.querySelector("#targetMeta"), targetPlural: document.querySelector("#targetPlural"),
  gearShift: document.querySelector("#gearShift"), gearShiftTitle: document.querySelector("#gearShiftTitle"),
  gearShiftText: document.querySelector("#gearShiftText"), coachNote: document.querySelector("#coachNote"),
  vocabBank: document.querySelector("#vocabBank"), wordShelf: document.querySelector("#wordShelf"),
  restart: document.querySelector("#restartButton")
};

function normalizeCore(value) {
  return value.trim().toLocaleLowerCase("de-DE").replace(/[.!?,;:]+$/g, "").replace(/\s+/g, " ");
}

function foldUmlauts(value) {
  return value.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
}

function normalizedFold(value) { return foldUmlauts(normalizeCore(value)); }

function englishWord(value, english, german, extra) {
  const escaped = english.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (new RegExp(`(^|\\s)${escaped}(?=\\s|$)`, "i").test(value)) {
    return `You used the English word “${english}”. In this German frame, use “${german}”. ${extra}`;
  }
  return null;
}

function editDistance(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) for (let j = 1; j <= a.length; j++) {
    matrix[i][j] = b[i - 1] === a[j - 1] ? matrix[i - 1][j - 1] : 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
  }
  return matrix[b.length][a.length];
}

function renderFrame(ex, reveal = false) {
  els.frame.innerHTML = ex.pieces.map((piece, index) => {
    const hidden = piece[3] && !reveal;
    const value = hidden ? "••••" : piece[1];
    return `${index ? '<span class="connector">+</span>' : ''}<span class="piece ${piece[2]} ${hidden ? "masked" : ""}">${piece[0]} <b>${value}</b></span>`;
  }).join("");
  els.frameHeading.textContent = reveal ? "Now inspect how the pieces fit." : "Build the frame. The answer stays hidden.";
}

function updateWordShelf(ex) {
  knownWords.add(targets[ex.target].word);
  (ex.vocab || []).forEach(([word]) => knownWords.add(word));
  localStorage.setItem("satzwerk-v2-words", JSON.stringify([...knownWords]));
  els.wordShelf.innerHTML = [...knownWords].slice(-9).map(word => `<span>${word}</span>`).join("");
}

function render() {
  const ex = exercises[current];
  const target = targets[ex.target];
  els.label.textContent = ex.label;
  els.context.textContent = ex.context;
  els.sentence.innerHTML = ex.sentence;
  els.variation.textContent = String(current + 1).padStart(2, "0");
  els.total.textContent = String(exercises.length).padStart(2, "0");
  els.input.placeholder = ex.placeholder;
  els.inputHelp.textContent = ex.inputHelp;
  els.input.value = "";
  els.input.disabled = false;
  els.feedback.hidden = true;
  els.feedback.className = "feedback";
  els.hint.textContent = "Give me a useful hint";
  hintShown = false;

  els.targetArticle.textContent = target.article;
  els.targetWord.textContent = target.word;
  els.targetMeta.textContent = target.meta;
  els.targetPlural.textContent = target.plural;

  els.gearShift.hidden = !ex.roundIntro;
  if (ex.roundIntro) {
    els.gearShiftTitle.textContent = ex.roundIntro[0];
    els.gearShiftText.textContent = ex.roundIntro[1];
  }
  els.coachNote.hidden = !ex.lesson;
  els.coachNote.textContent = ex.lesson || "";
  els.vocabBank.hidden = !ex.vocab?.length;
  els.vocabBank.innerHTML = (ex.vocab || []).map(([word, meaning]) => `<span><b>${word}</b> = ${meaning}</span>`).join("");

  renderFrame(ex, false);
  updateWordShelf(ex);
  document.querySelectorAll(".step").forEach((step, index) => step.classList.toggle("active", index === ex.group));
  updateProgress();
  setTimeout(() => els.input.focus(), 50);
}

function updateProgress() {
  const secured = completed.size;
  const percent = Math.round((secured / exercises.length) * 100);
  els.sessionScore.textContent = secured;
  els.skillPercent.textContent = `${percent}%`;
  const groupCounts = [0, 1, 2].map(group => [...completed].filter(index => exercises[index]?.group === group).length);
  document.querySelector("#meaningBar").style.width = `${groupCounts[0] * 25}%`;
  document.querySelector("#formBar").style.width = `${Math.round((secured / exercises.length) * 100)}%`;
  document.querySelector("#transferBar").style.width = `${Math.round(((groupCounts[1] + groupCounts[2]) / 8) * 100)}%`;
}

function secureCurrent() {
  completed.add(current);
  localStorage.setItem("satzwerk-v2-completed", JSON.stringify([...completed]));
  updateProgress();
}

function capitalizationNotes(raw, ex) {
  const notes = [];
  const trimmed = raw.trim();
  if (ex.fullSentence && /^[a-zäöüß]/.test(trimmed)) notes.push("Start the sentence with a capital letter.");
  const tokens = trimmed.match(/[A-Za-zÄÖÜäöüß]+/g) || [];
  for (const noun of ex.capitalNouns || []) {
    const nounFold = foldUmlauts(noun.toLocaleLowerCase("de-DE"));
    const token = tokens.find(item => foldUmlauts(item.toLocaleLowerCase("de-DE")) === nounFold);
    if (token && token[0] === token[0].toLocaleLowerCase("de-DE")) notes.push(`Capitalize the noun ${noun}.`);
  }
  return [...new Set(notes)];
}

function mechanicsNotes(raw, ex, umlautEquivalent) {
  const notes = capitalizationNotes(raw, ex);
  if (ex.punctuation && !raw.trim().endsWith(ex.punctuation)) {
    notes.push(ex.punctuation === "?" ? "Finish a written question with a question mark." : "Finish a written sentence with a period.");
  }
  if (umlautEquivalent) notes.push("Your ae/oe/ue spelling is accepted. In standard German spelling, use the umlaut shown below.");
  return notes;
}

function showFeedback(kind, title, text, ex) {
  els.feedback.hidden = false;
  els.feedback.className = `feedback ${kind}`;
  els.icon.textContent = kind === "retry" ? "!" : kind === "partial" ? "≈" : "✓";
  els.kicker.textContent = kind === "retry" ? "TRY ONE DECISION" : kind === "partial" ? "MEANING LANDED" : "FORM SECURED";
  els.title.textContent = title;
  els.feedbackText.textContent = text;
  els.trace.innerHTML = kind === "retry" ? "" : ex.trace.map(item => `<span>${item}</span>`).join("");
  renderFrame(ex, kind !== "retry");

  if (kind === "retry") {
    els.input.disabled = false;
    els.next.textContent = "Try again";
    els.next.onclick = () => { els.feedback.hidden = true; els.input.focus(); };
  } else {
    els.input.disabled = true;
    els.next.innerHTML = current === exercises.length - 1 ? "Return to the first round <span>↻</span>" : "Next variation <span>→</span>";
    els.next.onclick = advance;
  }
}

function gradeAnswer(raw) {
  const ex = exercises[current];
  const core = normalizeCore(raw);
  const folded = foldUmlauts(core);
  const exactOrthography = ex.answers.some(answer => normalizeCore(answer) === core);
  const coreMatch = exactOrthography || ex.answers.some(answer => normalizedFold(answer) === folded);
  const umlautEquivalent = coreMatch && !exactOrthography;

  if (coreMatch) {
    const notes = mechanicsNotes(raw, ex, umlautEquivalent);
    secureCurrent();
    if (notes.length) showFeedback("partial", "The German works. Polish the writing.", notes.join(" "), ex);
    else showFeedback("success", "Exactly right.", ex.success, ex);
    return;
  }

  const diagnosis = ex.diagnose ? ex.diagnose(core) : null;
  const closest = Math.min(...ex.answers.map(answer => editDistance(folded, normalizedFold(answer))));
  const termsFound = ex.keyTerms.filter(term => folded.includes(term)).length;
  const mostlyCorrect = diagnosis || closest <= Math.max(2, Math.floor(folded.length * .12)) || termsFound === ex.keyTerms.length;

  if (mostlyCorrect) {
    secureCurrent();
    const text = diagnosis || (closest <= Math.max(2, Math.floor(folded.length * .12))
      ? `The structure is there. Compare the repaired form below with what you wrote.`
      : `Your message is understandable. The frame below shows the form to tighten.`);
    showFeedback("partial", "Understood—with one repair.", text, ex);
  } else {
    const retryText = hintShown ? `${ex.hint} Focus on that single decision and try the sentence again.` : ex.hint;
    showFeedback("retry", "Let’s isolate the problem.", retryText, ex);
  }
}

els.form.addEventListener("submit", event => {
  event.preventDefault();
  const raw = els.input.value;
  if (!raw.trim()) { els.input.focus(); return; }
  gradeAnswer(raw);
});

els.hint.addEventListener("click", () => {
  hintShown = true;
  els.hint.textContent = exercises[current].hint;
});

function advance() {
  current = (current + 1) % exercises.length;
  localStorage.setItem("satzwerk-v2-current", String(current));
  render();
}

els.restart.addEventListener("click", () => {
  current = 0;
  completed = new Set();
  knownWords = new Set();
  localStorage.removeItem("satzwerk-v2-current");
  localStorage.removeItem("satzwerk-v2-completed");
  localStorage.removeItem("satzwerk-v2-words");
  render();
});

render();

function registerModelTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const lifecycle = new AbortController();
  const register = tool => {
    try { void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); }
    catch { /* Browsers without WebMCP keep the visible experience unchanged. */ }
  };

  register({
    name: "read_current_exercise",
    title: "Read current German exercise",
    description: "Read the visible Satzwerk exercise, introduced vocabulary, target noun, and current progress without changing state.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute() {
      const ex = exercises[current];
      return { target: `${targets[ex.target].article} ${targets[ex.target].word}`, variation: current + 1, total: exercises.length, instruction: ex.label, context: ex.context, prompt: els.sentence.textContent, wordBank: ex.vocab || [], securedForms: completed.size };
    }
  });

  register({
    name: "submit_practice_answer",
    title: "Submit German answer",
    description: "Submit an answer to the visible exercise and return the same diagnostic feedback shown to the learner.",
    inputSchema: { type: "object", properties: { answer: { type: "string", minLength: 1 } }, required: ["answer"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!input || typeof input.answer !== "string" || !input.answer.trim()) throw new Error("A non-empty German answer is required.");
      els.input.value = input.answer;
      gradeAnswer(input.answer);
      return { outcome: els.kicker.textContent, feedback: els.feedbackText.textContent, securedForms: completed.size };
    }
  });
}

registerModelTools();
