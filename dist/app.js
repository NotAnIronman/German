const vocabulary = [
  { id: "hallo", unit: 1, de: "Hallo", en: "hello", bundle: "Hallo!", spoken: "Hallo", example: "Hallo, ich bin Mia.", exampleEn: "Hello, I’m Mia.", variants: ["hallo"] },
  { id: "guten-tag", unit: 1, de: "Guten Tag", en: "good afternoon / hello", bundle: "Guten Tag!", spoken: "Guten Tag", example: "Guten Tag, Frau Berger.", exampleEn: "Hello, Ms. Berger.", variants: ["guten tag"] },
  { id: "tschuess", unit: 1, de: "Tschüss", en: "bye", bundle: "Tschüss! · Tschuess accepted", spoken: "Tschüss", example: "Tschüss, bis morgen!", exampleEn: "Bye, see you tomorrow!", variants: ["tschüss", "tschuess"] },
  { id: "danke", unit: 1, de: "danke", en: "thank you / thanks", bundle: "danke · Danke!", spoken: "danke", example: "Danke für die Hilfe.", exampleEn: "Thanks for the help.", variants: ["danke"] },
  { id: "bitte", unit: 1, de: "bitte", en: "please / you’re welcome", bundle: "bitte · Bitte!", spoken: "bitte", example: "Ein Wasser, bitte.", exampleEn: "A water, please.", variants: ["bitte"] },
  { id: "ja", unit: 1, de: "ja", en: "yes", bundle: "ja · Ja.", spoken: "ja", example: "Ja, gern.", exampleEn: "Yes, gladly.", variants: ["ja"] },
  { id: "nein", unit: 1, de: "nein", en: "no", bundle: "nein · Nein.", spoken: "nein", example: "Nein, danke.", exampleEn: "No, thank you.", variants: ["nein"] },
  { id: "heissen", unit: 1, de: "heißen", en: "to be called", bundle: "heißen · ich heiße", spoken: "heißen", example: "Ich heiße Lena.", exampleEn: "My name is Lena.", variants: ["heißen", "heissen"] },
  { id: "kommen", unit: 1, de: "kommen", en: "to come", bundle: "kommen · ich komme", spoken: "kommen", example: "Ich komme aus Kanada.", exampleEn: "I come from Canada.", variants: ["kommen"] },
  { id: "sein", unit: 1, de: "sein", en: "to be", bundle: "sein · ich bin · du bist", spoken: "sein", example: "Ich bin neu hier.", exampleEn: "I’m new here.", variants: ["sein"] },
  { id: "name", unit: 1, de: "der Name", en: "name", bundle: "der Name · die Namen", spoken: "der Name", example: "Mein Name ist Alex.", exampleEn: "My name is Alex.", variants: ["der name"] },
  { id: "stadt", unit: 1, de: "die Stadt", en: "city", bundle: "die Stadt · die Städte", spoken: "die Stadt", example: "Berlin ist eine große Stadt.", exampleEn: "Berlin is a large city.", variants: ["die stadt"] },
  { id: "mann", unit: 2, de: "der Mann", en: "man", bundle: "der Mann · die Männer", spoken: "der Mann", example: "Der Mann heißt Jonas.", exampleEn: "The man is called Jonas.", variants: ["der mann"] },
  { id: "frau", unit: 2, de: "die Frau", en: "woman / Ms.", bundle: "die Frau · die Frauen", spoken: "die Frau", example: "Die Frau kommt aus Wien.", exampleEn: "The woman comes from Vienna.", variants: ["die frau"] },
  { id: "kind", unit: 2, de: "das Kind", en: "child", bundle: "das Kind · die Kinder", spoken: "das Kind", example: "Das Kind heißt Emil.", exampleEn: "The child is called Emil.", variants: ["das kind"] },
  { id: "freund", unit: 2, de: "der Freund", en: "male friend / boyfriend", bundle: "der Freund · die Freunde", spoken: "der Freund", example: "Das ist mein Freund.", exampleEn: "That is my friend/boyfriend.", variants: ["der freund"] },
  { id: "freundin", unit: 2, de: "die Freundin", en: "female friend / girlfriend", bundle: "die Freundin · die Freundinnen", spoken: "die Freundin", example: "Das ist meine Freundin.", exampleEn: "That is my friend/girlfriend.", variants: ["die freundin"] },
  { id: "haus", unit: 2, de: "das Haus", en: "house", bundle: "das Haus · die Häuser", spoken: "das Haus", example: "Das Haus ist alt.", exampleEn: "The house is old.", variants: ["das haus"] },
  { id: "tuer", unit: 2, de: "die Tür", en: "door", bundle: "die Tür · die Türen", spoken: "die Tür", example: "Die Tür ist offen.", exampleEn: "The door is open.", variants: ["die tür", "die tuer"] },
  { id: "tisch", unit: 2, de: "der Tisch", en: "table", bundle: "der Tisch · die Tische", spoken: "der Tisch", example: "Das Buch liegt auf dem Tisch.", exampleEn: "The book is on the table.", variants: ["der tisch"] },
  { id: "buch", unit: 2, de: "das Buch", en: "book", bundle: "das Buch · die Bücher", spoken: "das Buch", example: "Ich habe ein Buch.", exampleEn: "I have a book.", variants: ["das buch"] },
  { id: "wasser", unit: 2, de: "das Wasser", en: "water", bundle: "das Wasser · usually uncounted", spoken: "das Wasser", example: "Ich brauche Wasser.", exampleEn: "I need water.", variants: ["das wasser", "wasser"] },
  { id: "haben", unit: 2, de: "haben", en: "to have", bundle: "haben · ich habe · er hat", spoken: "haben", example: "Ich habe Zeit.", exampleEn: "I have time.", variants: ["haben"] },
  { id: "brauchen", unit: 2, de: "brauchen", en: "to need", bundle: "brauchen · ich brauche", spoken: "brauchen", example: "Wir brauchen Papier.", exampleEn: "We need paper.", variants: ["brauchen"] }
];

const questionBank = [
  { id: "q-hallo-de", requires: ["hallo"], words: ["hallo"], type: "PRODUCE", context: "You meet someone at the beginning of the day.", prompt: "Say “hello” in German.", answers: ["Hallo", "Hallo!"], explanation: "Hallo is a flexible, neutral greeting." },
  { id: "q-hallo-en", requires: ["hallo"], words: ["hallo"], type: "MEANING", context: "You hear: “Hallo!”", prompt: "What does it mean?", answers: ["hello", "hi"], explanation: "Hallo means hello or hi." },
  { id: "q-tag", requires: ["guten-tag"], words: ["guten-tag"], type: "PRODUCE", context: "You enter a shop and greet an employee politely.", prompt: "Write the German greeting.", answers: ["Guten Tag", "Guten Tag!"], explanation: "Guten Tag is a useful polite daytime greeting." },
  { id: "q-tschuess", requires: ["tschuess"], words: ["tschuess"], type: "PRODUCE", context: "You are leaving a casual conversation.", prompt: "Say “bye” in German.", answers: ["Tschüss", "Tschuess", "Tschüss!", "Tschuess!"], explanation: "Tschüss is a common informal goodbye. Tschuess is accepted when an umlaut is unavailable." },
  { id: "q-danke", requires: ["danke"], words: ["danke"], type: "PRODUCE", context: "Someone holds the door for you.", prompt: "Say “thank you.”", answers: ["Danke", "Danke!"], explanation: "Danke works as a complete thank-you." },
  { id: "q-bitte-meaning", requires: ["bitte"], words: ["bitte"], type: "MEANING", context: "At the end of a request you hear “bitte.”", prompt: "What can bitte mean here?", answers: ["please"], explanation: "In a request, bitte means please. In another context it can mean you’re welcome." },
  { id: "q-ja", requires: ["ja"], words: ["ja"], type: "PRODUCE", context: "You agree with a simple question.", prompt: "Write “yes” in German.", answers: ["ja", "Ja", "Ja."], explanation: "ja means yes." },
  { id: "q-nein", requires: ["nein"], words: ["nein"], type: "PRODUCE", context: "You politely decline: “No, thank you.”", prompt: "Complete: ___, danke.", answers: ["Nein"], explanation: "Nein supplies the negative response; danke keeps it polite." },
  { id: "q-heisse", requires: ["heissen"], words: ["heissen"], type: "FORM", context: "You introduce yourself as Mia.", prompt: "Ich ___ Mia.", answers: ["heiße", "heisse"], explanation: "The ich form of heißen is heiße. Heisse is accepted when ß is unavailable." },
  { id: "q-komme", requires: ["kommen"], words: ["kommen"], type: "FORM", context: "You say that you come from Canada.", prompt: "Ich ___ aus Kanada.", answers: ["komme"], explanation: "The ich form of kommen is komme." },
  { id: "q-bin", requires: ["sein"], words: ["sein"], type: "FORM", context: "You say that you are new here.", prompt: "Ich ___ neu hier.", answers: ["bin"], explanation: "sein is irregular: ich bin." },
  { id: "q-name", requires: ["name"], words: ["name"], type: "WORD BUNDLE", context: "Retrieve the noun with its article.", prompt: "Write the full German bundle for “name.”", answers: ["der Name"], explanation: "Name is masculine: der Name. Store the article with the noun." },
  { id: "q-stadt", requires: ["stadt"], words: ["stadt"], type: "WORD BUNDLE", context: "Retrieve the noun with its article.", prompt: "Write the full German bundle for “city.”", answers: ["die Stadt"], explanation: "Stadt is feminine: die Stadt." },
  { id: "q-intro", requires: ["heissen"], words: ["heissen"], type: "TRANSFER", context: "Build the complete introduction using the pattern you met.", prompt: "Say: “My name is Alex.” using ich heiße.", answers: ["Ich heiße Alex.", "Ich heisse Alex."], explanation: "German uses ich heiße + name for a natural introduction." },
  { id: "q-mann", requires: ["mann"], words: ["mann"], type: "WORD BUNDLE", context: "Retrieve article and noun together.", prompt: "Write “the man” in German.", answers: ["der Mann"], explanation: "Mann is masculine: der Mann." },
  { id: "q-frau", requires: ["frau"], words: ["frau"], type: "WORD BUNDLE", context: "Retrieve article and noun together.", prompt: "Write “the woman” in German.", answers: ["die Frau"], explanation: "Frau is feminine: die Frau." },
  { id: "q-kind", requires: ["kind"], words: ["kind"], type: "WORD BUNDLE", context: "Retrieve article and noun together.", prompt: "Write “the child” in German.", answers: ["das Kind"], explanation: "Kind is neuter: das Kind." },
  { id: "q-haus", requires: ["haus", "sein"], words: ["haus", "sein"], type: "FORM", context: "The house is old. Only supply the missing verb.", prompt: "Das Haus ___ alt.", answers: ["ist"], explanation: "The er/sie/es form of sein is ist." },
  { id: "q-tuer", requires: ["tuer"], words: ["tuer"], type: "WORD BUNDLE", context: "Retrieve article and noun together.", prompt: "Write “the door” in German.", answers: ["die Tür", "die Tuer"], explanation: "Tür is feminine: die Tür. Tuer is accepted when you cannot type ü." },
  { id: "q-tisch", requires: ["tisch"], words: ["tisch"], type: "WORD BUNDLE", context: "Retrieve article and noun together.", prompt: "Write “the table” in German.", answers: ["der Tisch"], explanation: "Tisch is masculine: der Tisch." },
  { id: "q-buch", requires: ["buch"], words: ["buch"], type: "WORD BUNDLE", context: "Retrieve article and noun together.", prompt: "Write “the book” in German.", answers: ["das Buch"], explanation: "Buch is neuter: das Buch." },
  { id: "q-wasser", requires: ["wasser", "brauchen"], words: ["wasser", "brauchen"], type: "FORM", context: "You need water. Supply only the missing verb.", prompt: "Ich ___ Wasser.", answers: ["brauche"], explanation: "The ich form of brauchen is brauche." },
  { id: "q-habe", requires: ["haben"], words: ["haben"], type: "FORM", context: "You say that you have time. Supply the verb.", prompt: "Ich ___ Zeit.", answers: ["habe"], explanation: "The ich form of haben is habe." },
  { id: "q-friend", requires: ["freund"], words: ["freund"], type: "MEANING", context: "You hear: “Das ist mein Freund.”", prompt: "What can Freund mean?", answers: ["friend", "male friend", "boyfriend", "friend or boyfriend"], explanation: "Freund can mean a male friend or boyfriend; context usually clarifies the relationship." }
];

const storageKey = "satzwerk-production-v1";
const today = () => new Date().toISOString().slice(0, 10);
const defaultState = { words: {}, quiz: { firstCorrect: 0, attempts: 0, recovered: 0 }, deckIndex: 0, cardDirection: "german" };
let state = loadState();
let currentView = "home";
let deck = [];
let deckIndex = 0;
let cardRevealed = false;
let targetedWordId = null;
let vocabFilter = "all";
let quiz = null;

function loadState() {
  try { return { ...defaultState, ...JSON.parse(localStorage.getItem(storageKey) || "{}") }; }
  catch { return structuredClone(defaultState); }
}

function saveState() { localStorage.setItem(storageKey, JSON.stringify(state)); }

function recordFor(id) {
  if (!state.words[id]) state.words[id] = { introduced: false, score: 0, production: 0, delayed: 0, misses: 0, days: [], lastSeen: null, nextReview: null, retryDate: null, retryCredit: 0 };
  return state.words[id];
}

function wordById(id) { return vocabulary.find(word => word.id === id); }
function isIntroduced(id) { return Boolean(state.words[id]?.introduced); }
function introducedWords() { return vocabulary.filter(word => isIntroduced(word.id)); }
function dueWords() { const now = Date.now(); return introducedWords().filter(word => state.words[word.id].nextReview && state.words[word.id].nextReview <= now); }
function availableQuestions() { return questionBank.filter(question => question.requires.every(isIntroduced)); }

function addDay(record) {
  if (!record.days.includes(today())) record.days.push(today());
}

function tierFor(record) {
  if (!record?.introduced) return "unseen";
  if (record.production >= 5 && record.delayed >= 3 && record.days.length >= 4) return "durable";
  if (record.production >= 2 && record.days.length >= 2) return "retrievable";
  if (record.production > 0 || record.score >= .5) return "practicing";
  return "introduced";
}

function tierLabel(tier) { return ({ introduced: "Introduced", practicing: "Practicing", retrievable: "Retrievable", durable: "Durable", unseen: "Unseen" })[tier]; }

function evidencePercent(record) {
  if (!record?.introduced) return 0;
  return Math.min(100, Math.round(10 + record.score * 8 + record.production * 12 + record.delayed * 10 + Math.max(0, record.days.length - 1) * 8));
}

function normalize(value) { return value.trim().toLocaleLowerCase("de-DE").replace(/[.!?,;:]+$/g, "").replace(/\s+/g, " "); }
function fold(value) { return normalize(value).replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss"); }
function editDistance(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) for (let j = 1; j <= a.length; j++) matrix[i][j] = b[i - 1] === a[j - 1] ? matrix[i - 1][j - 1] : 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
  return matrix[b.length][a.length];
}

function classifyAnswer(value, answers) {
  const standard = answers.some(answer => normalize(answer) === normalize(value));
  const folded = answers.some(answer => fold(answer) === fold(value));
  if (standard) return { correct: true, note: "" };
  if (folded) return { correct: true, note: "Your ae/oe/ue or ss spelling is accepted. The standard form is shown in the explanation." };
  const closest = Math.min(...answers.map(answer => editDistance(fold(answer), fold(value))));
  return { correct: false, near: closest <= 1 };
}

function go(view) {
  currentView = view;
  document.querySelectorAll(".view").forEach(section => { section.hidden = section.id !== `view-${view}`; section.classList.toggle("active", section.id === `view-${view}`); });
  document.querySelectorAll(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.view === view));
  if (view === "home") renderHome();
  if (view === "learn") prepareDeck();
  if (view === "practice") renderPracticeStart();
  if (view === "vocabulary") renderVocabulary();
  if (view === "progress") renderProgress();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", () => go(button.dataset.view)));
document.querySelectorAll("[data-go]").forEach(button => button.addEventListener("click", () => go(button.dataset.go)));

function renderHome() {
  const introduced = introducedWords().length;
  const percent = Math.min(100, Math.round((introduced / 24) * 65 + (state.quiz.firstCorrect / Math.max(1, state.quiz.attempts)) * 35));
  document.querySelector("#homePercent").textContent = `${percent}%`;
  document.querySelector("#dueCount").textContent = dueWords().length;
  const available = availableQuestions().length;
  const button = document.querySelector("#continueButton");
  if (introduced === 0) {
    document.querySelector("#continueTitle").textContent = "Meet your first German words";
    document.querySelector("#continueText").textContent = "Learn each word as a usable bundle before it appears in practice.";
    button.innerHTML = 'Begin with words <span>→</span>';
    button.onclick = () => go("learn");
  } else if (available >= 4 && dueWords().length) {
    document.querySelector("#continueTitle").textContent = "Retrieve what is becoming fragile";
    document.querySelector("#continueText").textContent = "Some introduced words are ready for a useful return—not another immediate repetition.";
    button.innerHTML = 'Start a review set <span>→</span>';
    button.onclick = () => { go("practice"); startQuiz(); };
  } else if (available >= 4) {
    document.querySelector("#continueTitle").textContent = "Use the words you have met";
    document.querySelector("#continueText").textContent = `${available} typed prompts can now be built without testing unseen vocabulary.`;
    button.innerHTML = 'Practice now <span>→</span>';
    button.onclick = () => go("practice");
  } else {
    document.querySelector("#continueTitle").textContent = "Keep building your first word set";
    document.querySelector("#continueText").textContent = "Introduce a few more words before the first adaptive quiz becomes available.";
    button.innerHTML = 'Continue flashcards <span>→</span>';
    button.onclick = () => go("learn");
  }
}

function currentUnit() {
  const unitOneComplete = vocabulary.filter(word => word.unit === 1).every(word => isIntroduced(word.id));
  return unitOneComplete ? 2 : 1;
}

function prepareDeck() {
  deck = targetedWordId ? [wordById(targetedWordId)] : vocabulary.filter(word => word.unit === currentUnit());
  deckIndex = targetedWordId ? 0 : Math.min(state.deckIndex || 0, deck.length - 1);
  document.querySelector("#learnTitle").textContent = targetedWordId ? `Review ${deck[0].de}` : currentUnit() === 1 ? "First contact" : "People and useful things";
  renderCard();
  renderDeckStrip();
}

function cardDirectionFor() {
  const selected = document.querySelector("#cardDirection").value;
  if (selected !== "mixed") return selected;
  return deckIndex % 2 === 0 ? "german" : "english";
}

function renderCard() {
  const word = deck[deckIndex];
  if (!word) return;
  cardRevealed = false;
  const direction = cardDirectionFor();
  document.querySelector("#deckPosition").textContent = `${deckIndex + 1} / ${deck.length}`;
  document.querySelector("#cardUnit").textContent = targetedWordId ? "TARGETED REVIEW" : `A0 · UNIT ${String(word.unit).padStart(2, "0")}`;
  document.querySelector("#flashPrompt").textContent = direction === "german" ? "GERMAN" : "ENGLISH";
  document.querySelector("#flashFront").textContent = direction === "german" ? word.de : word.en;
  document.querySelector("#flashAnswer").textContent = direction === "german" ? word.en : word.de;
  document.querySelector("#flashBundle").textContent = word.bundle;
  document.querySelector("#flashExample").textContent = `${word.example} — ${word.exampleEn}`;
  document.querySelector("#flashAnswer").hidden = true;
  document.querySelector("#flashBundle").hidden = true;
  document.querySelector("#flashExample").hidden = true;
  document.querySelector("#ratingRow").hidden = true;
  document.querySelector("#flipInstruction").hidden = false;
  document.querySelector("#flashcard").setAttribute("aria-expanded", "false");
}

function revealCard() {
  if (cardRevealed) return;
  cardRevealed = true;
  const word = deck[deckIndex];
  const record = recordFor(word.id);
  record.introduced = true;
  record.lastSeen = Date.now();
  addDay(record);
  saveState();
  ["#flashAnswer", "#flashBundle", "#flashExample", "#ratingRow"].forEach(selector => document.querySelector(selector).hidden = false);
  document.querySelector("#flipInstruction").hidden = true;
  document.querySelector("#flashcard").setAttribute("aria-expanded", "true");
  renderDeckStrip();
}

document.querySelector("#flashcard").addEventListener("click", revealCard);
document.querySelector("#cardDirection").value = state.cardDirection || "german";
document.querySelector("#cardDirection").addEventListener("change", event => { state.cardDirection = event.target.value; saveState(); renderCard(); });
document.querySelector("#shuffleDeck").addEventListener("click", () => { deck = [...deck].sort(() => Math.random() - .5); deckIndex = 0; renderCard(); renderDeckStrip(); });
document.querySelector("#speakWord").addEventListener("click", () => {
  const word = deck[deckIndex];
  if (!word || !("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word.spoken);
  utterance.lang = "de-DE";
  speechSynthesis.speak(utterance);
});

document.querySelectorAll("[data-rating]").forEach(button => button.addEventListener("click", () => rateCard(button.dataset.rating)));

function rateCard(rating) {
  const word = deck[deckIndex];
  const record = recordFor(word.id);
  const date = today();
  if (record.flashDate !== date) { record.flashDate = date; record.flashCredit = 0; }
  const proposed = rating === "got" ? .15 : rating === "hard" ? .05 : 0;
  const award = Math.max(0, Math.min(proposed, .45 - (record.flashCredit || 0)));
  record.flashCredit = (record.flashCredit || 0) + award;
  record.score += award;
  record.nextReview = Date.now() + (rating === "again" ? 5 * 60e3 : rating === "hard" ? 12 * 60 * 60e3 : 24 * 60 * 60e3);
  record.lastSeen = Date.now();
  saveState();
  if (targetedWordId) { targetedWordId = null; go("vocabulary"); return; }
  deckIndex = (deckIndex + 1) % deck.length;
  state.deckIndex = deckIndex;
  saveState();
  renderCard();
  renderDeckStrip();
}

function renderDeckStrip() {
  document.querySelector("#deckStrip").innerHTML = deck.map((word, index) => `<button type="button" class="${isIntroduced(word.id) ? "seen" : ""} ${index === deckIndex ? "active" : ""}" data-card-index="${index}" aria-label="Open card ${index + 1}">${index + 1}</button>`).join("");
  document.querySelectorAll("[data-card-index]").forEach(button => button.addEventListener("click", () => { deckIndex = Number(button.dataset.cardIndex); renderCard(); renderDeckStrip(); }));
}

function renderPracticeStart() {
  const count = availableQuestions().length;
  document.querySelector("#availableQuestionCount").textContent = count;
  document.querySelector("#practiceReadiness").textContent = count >= 4 ? `${count} prompts can be built entirely from words already introduced in your profile.` : `Introduce ${Math.max(0, 4 - count)} more usable prompt${4 - count === 1 ? "" : "s"} before beginning. No unseen vocabulary will be graded.`;
  document.querySelector("#startQuiz").disabled = count < 4;
  document.querySelector("#practiceStart").hidden = false;
  document.querySelector("#quizShell").hidden = true;
  document.querySelector("#quizSummary").hidden = true;
}

document.querySelector("#startQuiz").addEventListener("click", startQuiz);

function shuffled(items) { return [...items].sort(() => Math.random() - .5); }

function startQuiz() {
  const pool = availableQuestions().sort((a, b) => {
    const aMisses = a.words.reduce((sum, id) => sum + (state.words[id]?.misses || 0), 0);
    const bMisses = b.words.reduce((sum, id) => sum + (state.words[id]?.misses || 0), 0);
    return bMisses - aMisses || Math.random() - .5;
  });
  if (pool.length < 4) return;
  quiz = { questions: pool.slice(0, Math.min(8, pool.length)), index: 0, wrong: [], originalWrong: [], firstCorrect: 0, recovered: 0, retry: false };
  document.querySelector("#practiceStart").hidden = true;
  document.querySelector("#quizSummary").hidden = true;
  document.querySelector("#quizShell").hidden = false;
  renderQuestion();
}

function renderQuestion() {
  const question = quiz.questions[quiz.index];
  document.querySelector("#quizMode").textContent = quiz.retry ? "RETRY MISSED · RECOVERY" : "ADAPTIVE QUIZ";
  document.querySelector("#quizProgress").textContent = `${quiz.index + 1} / ${quiz.questions.length}`;
  document.querySelector("#quizProgressBar").style.width = `${((quiz.index + 1) / quiz.questions.length) * 100}%`;
  document.querySelector("#quizType").textContent = question.type;
  document.querySelector("#quizContext").textContent = question.context;
  document.querySelector("#quizPrompt").textContent = question.prompt;
  document.querySelector("#quizInput").value = "";
  document.querySelector("#quizInput").disabled = false;
  document.querySelector("#quizFeedback").hidden = true;
  document.querySelector("#quizFeedback").className = "quiz-feedback";
  document.querySelector("#quizForm").hidden = false;
  setTimeout(() => document.querySelector("#quizInput").focus(), 30);
}

document.querySelector("#quizForm").addEventListener("submit", event => {
  event.preventDefault();
  const value = document.querySelector("#quizInput").value;
  if (!value.trim()) return;
  submitQuizAnswer(value);
});

function submitQuizAnswer(value) {
  const question = quiz.questions[quiz.index];
  const result = classifyAnswer(value, question.answers);
  const feedback = document.querySelector("#quizFeedback");
  feedback.hidden = false;
  feedback.className = `quiz-feedback ${result.correct ? "" : "wrong"}`;
  document.querySelector("#quizFeedbackMark").textContent = result.correct ? "✓" : result.near ? "≈" : "!";
  document.querySelector("#quizFeedbackTitle").textContent = result.correct ? "That works." : result.near ? "Very close—repair the form." : "Meaning not secured yet.";
  document.querySelector("#quizFeedbackText").textContent = result.correct ? `${question.explanation}${result.note ? ` ${result.note}` : ""}` : `${result.near ? "A small spelling difference changed the answer. " : ""}${question.explanation} Correct form: ${question.answers[0]}`;
  document.querySelector("#quizInput").disabled = true;
  document.querySelector("#quizForm").hidden = true;

  if (!quiz.retry) {
    state.quiz.attempts += 1;
    if (result.correct) {
      quiz.firstCorrect += 1;
      state.quiz.firstCorrect += 1;
      question.words.forEach(id => recordProduction(id));
    } else {
      quiz.wrong.push(question);
      quiz.originalWrong.push(question);
      question.words.forEach(id => { const record = recordFor(id); record.misses += 1; record.nextReview = Date.now() + 10 * 60e3; });
    }
  } else if (result.correct) {
    quiz.recovered += 1;
    state.quiz.recovered += 1;
    question.words.forEach(id => recordRecovery(id));
  } else {
    quiz.wrong.push(question);
  }
  saveState();
  document.querySelector("#quizNext").innerHTML = quiz.index === quiz.questions.length - 1 ? 'See results <span>→</span>' : 'Next <span>→</span>';
}

function recordProduction(id) {
  const record = recordFor(id);
  const wasEarlierDay = record.lastSeen && new Date(record.lastSeen).toISOString().slice(0, 10) !== today();
  record.production += 1;
  record.score += 1;
  if (wasEarlierDay) record.delayed += 1;
  record.lastSeen = Date.now();
  record.nextReview = Date.now() + 24 * 60 * 60e3;
  addDay(record);
}

function recordRecovery(id) {
  const record = recordFor(id);
  const date = today();
  if (record.retryDate !== date) { record.retryDate = date; record.retryCredit = 0; }
  const award = Math.max(0, Math.min(.15, .3 - record.retryCredit));
  record.retryCredit += award;
  record.score += award;
  record.lastSeen = Date.now();
  record.nextReview = Date.now() + 12 * 60 * 60e3;
}

document.querySelector("#quizNext").addEventListener("click", () => {
  quiz.index += 1;
  if (quiz.index >= quiz.questions.length) showSummary();
  else renderQuestion();
});

function showSummary() {
  document.querySelector("#quizShell").hidden = true;
  document.querySelector("#quizSummary").hidden = false;
  const stillMissed = quiz.retry ? quiz.wrong.length : quiz.originalWrong.length;
  const total = quiz.retry ? quiz.originalWrong.length : quiz.questions.length;
  document.querySelector("#summaryTitle").textContent = quiz.retry ? `${quiz.recovered} of ${total} recovered.` : `${quiz.firstCorrect} of ${total} on the first pass.`;
  document.querySelector("#summaryText").textContent = stillMissed ? "The missed set is ready for an immediate repair pass. That confirms understanding, but durable evidence must come later." : "No immediate repair set remains. The next meaningful evidence will come after time has passed.";
  document.querySelector("#summaryCorrect").textContent = quiz.firstCorrect;
  document.querySelector("#summaryRecovered").textContent = quiz.recovered;
  document.querySelector("#summaryMissed").textContent = stillMissed;
  document.querySelector("#retryMissed").hidden = stillMissed === 0;
}

document.querySelector("#retryMissed").addEventListener("click", () => {
  const missed = quiz.retry ? quiz.wrong : quiz.originalWrong;
  quiz.questions = [...new Map(missed.map(question => [question.id, question])).values()];
  quiz.index = 0;
  quiz.wrong = [];
  quiz.retry = true;
  document.querySelector("#quizSummary").hidden = true;
  document.querySelector("#quizShell").hidden = false;
  renderQuestion();
});

document.querySelector("#finishQuiz").addEventListener("click", renderPracticeStart);

function renderVocabulary() {
  const words = introducedWords();
  document.querySelector("#unlockedCount").textContent = words.length;
  const filtered = words.filter(word => vocabFilter === "all" || tierFor(state.words[word.id]) === vocabFilter).sort((a, b) => evidencePercent(state.words[a.id]) - evidencePercent(state.words[b.id]));
  document.querySelector("#emptyVocab").hidden = filtered.length > 0;
  document.querySelector("#vocabRows").innerHTML = filtered.map(word => {
    const record = state.words[word.id];
    const tier = tierFor(record);
    const due = record.nextReview && record.nextReview <= Date.now();
    return `<tr><td><strong>${word.de}</strong><small>${word.bundle}</small></td><td>${word.en}</td><td><span class="tier-pill"><i class="tier-dot ${tier}"></i>${tierLabel(tier)}</span></td><td><div class="evidence-mini"><i style="width:${evidencePercent(record)}%"></i></div></td><td><button class="vocab-action" type="button" data-review-word="${word.id}">${due ? "Review due" : "Practice lightly"}</button></td></tr>`;
  }).join("");
  document.querySelectorAll("[data-review-word]").forEach(button => button.addEventListener("click", () => { targetedWordId = button.dataset.reviewWord; go("learn"); }));
}

document.querySelectorAll("[data-tier]").forEach(button => button.addEventListener("click", () => {
  vocabFilter = button.dataset.tier;
  document.querySelectorAll("[data-tier]").forEach(item => item.classList.toggle("active", item === button));
  renderVocabulary();
}));

function renderProgress() {
  const words = introducedWords();
  const accuracy = state.quiz.attempts ? Math.round((state.quiz.firstCorrect / state.quiz.attempts) * 100) : null;
  document.querySelector("#progressWords").textContent = words.length;
  document.querySelector("#progressAccuracy").textContent = accuracy == null ? "—" : `${accuracy}%`;
  document.querySelector("#progressDue").textContent = dueWords().length;
  const vocabEvidence = Math.round((words.length / vocabulary.length) * 100);
  const writingEvidence = Math.min(100, Math.round((state.quiz.attempts / 20) * 100));
  document.querySelector("#vocabEvidenceLabel").textContent = words.length ? `${vocabEvidence}% of current bank introduced` : "Not measured";
  document.querySelector("#vocabEvidenceBar").style.width = `${vocabEvidence}%`;
  document.querySelector("#writingEvidenceLabel").textContent = state.quiz.attempts ? `${state.quiz.attempts} first-pass attempts` : "Not measured";
  document.querySelector("#writingEvidenceBar").style.width = `${writingEvidence}%`;
}

function registerModelTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const lifecycle = new AbortController();
  const register = tool => { try { void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); } catch {} };
  register({
    name: "read_learning_state", title: "Read Satzwerk learning state",
    description: "Read the learner's current A0 vocabulary, due reviews, evidence tiers, and available quiz count without changing progress.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute() { return { level: "A0", introducedWords: introducedWords().length, dueWords: dueWords().length, availableQuestions: availableQuestions().length, quizAccuracy: state.quiz.attempts ? state.quiz.firstCorrect / state.quiz.attempts : null }; }
  });
  register({
    name: "open_learning_view", title: "Open Satzwerk view",
    description: "Open one visible Satzwerk area: home, learn, practice, vocabulary, culture, progress, or sources.",
    inputSchema: { type: "object", properties: { view: { type: "string", enum: ["home", "learn", "practice", "vocabulary", "culture", "progress", "sources"] } }, required: ["view"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) { go(input.view); return { opened: input.view }; }
  });
}

renderHome();
registerModelTools();
