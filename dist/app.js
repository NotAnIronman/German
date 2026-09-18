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
  version: 3,
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
    const storedVersion = Number(parsed.version || 1);
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
    if (storedVersion < 3) {
      const rebuiltIds = new Set(modules.filter(module => module.level === "A0").map(module => module.id));
      rebuiltIds.forEach(id => { delete next.modules[id]; });
      Object.keys(next.words).forEach(id => {
        if ([...rebuiltIds].some(moduleId => id.startsWith(moduleId + ":"))) delete next.words[id];
      });
      const retainedRecords = Object.values(next.modules);
      next.quiz = {
        firstCorrect: retainedRecords.reduce((sum, record) => sum + Number(record.firstCorrect || 0), 0),
        attempts: retainedRecords.reduce((sum, record) => sum + Number(record.attempts || 0), 0),
        recovered: 0
      };
      next.version = 3;
      localStorage.setItem(storageKey, JSON.stringify(next));
    }
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
let learnMode = "deck";
let lessonStepIndex = 0;
let lessonSelection = "";
let lessonBuilt = [];
let lessonStepPassed = false;

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
    state.modules[id] = { started: false, attempts: 0, firstCorrect: 0, listening: 0, reading: 0, writing: 0, speaking: 0, checkpointScore: null, checkpointAt: null, completedPrompts: {}, attemptedPrompts: {}, lessonSteps: {}, lessonIndex: 0 };
  }
  const record = state.modules[id];
  record.completedPrompts ||= {};
  record.attemptedPrompts ||= {};
  record.lessonSteps ||= {};
  record.lessonIndex ||= 0;
  return record;
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

function lessonIsComplete(module) {
  if (!module.lesson?.steps?.length) return true;
  const completed = moduleRecord(module.id).lessonSteps;
  return module.lesson.steps.every(step => completed[step.id]);
}

function completedPromptCount(module) {
  const completed = moduleRecord(module.id).completedPrompts || {};
  return module.questions.filter(question => completed[question.id]).length;
}

function moduleSequenceComplete(module) {
  return lessonIsComplete(module) && completedPromptCount(module) === module.questions.length;
}

function unmetPrerequisite(module) {
  if (!module.prerequisite) return null;
  const prerequisite = moduleById(module.prerequisite);
  const earlierBlock = unmetPrerequisite(prerequisite);
  if (earlierBlock) return earlierBlock;
  return moduleSequenceComplete(prerequisite) ? null : prerequisite;
}

function introducedCoreCount(module) {
  return moduleCoreWords(module).filter(word => isIntroduced(globalWordId(module.id, word.id))).length;
}

function moduleProgress(module) {
  const record = state.modules[module.id];
  if (!record) return 0;
  const core = moduleCoreWords(module);
  const words = core.filter(word => isIntroduced(globalWordId(module.id, word.id))).length / Math.max(1, core.length);
  const prompts = completedPromptCount(module) / Math.max(1, module.questions.length);
  const skills = [record.reading, record.writing, record.speaking].filter(value => Number(value) > 0).length / 3;
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

function announceMessage(message) {
  const banner = $("#moduleChange");
  banner.textContent = message;
  banner.hidden = false;
  clearTimeout(bannerTimer);
  bannerTimer = setTimeout(() => { banner.hidden = true; }, 4200);
}

function announceModule(module) {
  announceMessage(`Now working on ${module.code}: ${module.title}.`);
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
  const record = moduleRecord(module.id);
  const resolved = completedPromptCount(module);
  const guided = Boolean(module.lesson?.steps?.length);
  const button = $("#continueButton");
  if (!lessonIsComplete(module)) {
    const completed = Object.keys(moduleRecord(module.id).lessonSteps).length;
    $("#continueTitle").textContent = completed ? "Continue the guided lesson" : "Start with a guided lesson";
    $("#continueText").textContent = completed + " of " + module.lesson.steps.length + " teaching steps are complete. Each new phrase is explained before practice.";
    button.innerHTML = 'Open guided lesson <span>→</span>';
    button.onclick = () => go("learn");
  } else if (coreIntroduced < core.length) {
    $("#continueTitle").textContent = coreIntroduced ? "Continue the core word deck" : module.title;
    $("#continueText").textContent = coreIntroduced ? `${coreIntroduced} of ${core.length} core bundles have been met in this module.` : module.subtitle;
    button.innerHTML = 'Open word deck <span>→</span>';
    button.onclick = () => go("learn");
  } else if (resolved < module.questions.length) {
    $("#continueTitle").textContent = resolved ? "Continue sentence practice" : "Put the lesson into sentences";
    $("#continueText").textContent = resolved + " of " + module.questions.length + " sentence patterns are resolved. Successful repairs count here.";
    button.innerHTML = 'Open practice <span>→</span>';
    button.onclick = () => go("practice");
  } else if (guided && record.reading < 1) {
    $("#continueTitle").textContent = "Read the familiar patterns";
    $("#continueText").textContent = "The short passage uses language from the lesson and sentence practice.";
    button.innerHTML = 'Open reading <span>→</span>';
    button.onclick = () => go("practice");
  } else if (guided && record.writing < 1) {
    $("#continueTitle").textContent = "Build the guided writing task";
    $("#continueText").textContent = "Every visible requirement is checked separately.";
    button.innerHTML = 'Open writing <span>→</span>';
    button.onclick = () => go("practice");
  } else if (guided && record.checkpointScore < .8) {
    $("#continueTitle").textContent = "Return without the lesson supports";
    $("#continueText").textContent = "The checkpoint is ready after the guided work.";
    button.innerHTML = 'Open checkpoint <span>→</span>';
    button.onclick = () => go("practice");
  } else if (introduced < module.words.length) {
    const remaining = module.words.length - introduced;
    $("#continueTitle").textContent = "Widen this module's word bank";
    $("#continueText").textContent = `${remaining} additional bundle${remaining === 1 ? " is" : "s are"} ready with a phrase, word family, or usage pattern.`;
    button.innerHTML = 'Meet more language <span>→</span>';
    button.onclick = () => go("learn");
  } else {
    $("#continueTitle").textContent = "Return from another angle";
    $("#continueText").textContent = "Choose reading, writing, speaking, or the module checkpoint.";
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

function markLessonWords(module, step) {
  (step.teaches || []).forEach(localId => {
    const word = module.words.find(item => item.id === localId);
    if (!word) return;
    const record = wordRecord(globalWordId(module.id, localId));
    record.introduced = true;
    record.score = Math.max(record.score || 0, .15);
    record.lastSeen = now();
    record.nextReview ||= now() + dayMs;
    addDay(record);
  });
}

function completeLessonStep(module, step) {
  const record = moduleRecord(module.id);
  record.lessonSteps[step.id] = true;
  record.started = true;
  markLessonWords(module, step);
  if (module.lesson.steps.every(item => record.lessonSteps[item.id])) {
    moduleCoreWords(module).forEach(word => {
      const item = wordRecord(globalWordId(module.id, word.id));
      item.introduced = true;
      item.score = Math.max(item.score || 0, .15);
      item.lastSeen ||= now();
      item.nextReview ||= now() + dayMs;
      addDay(item);
    });
  }
  saveState();
}

function setLearnMode(mode) {
  const module = activeModule();
  const hasLesson = Boolean(module.lesson?.steps?.length) && !targetedWordId;
  const lessonComplete = lessonIsComplete(module);
  learnMode = hasLesson && (mode === "lesson" || !lessonComplete) ? "lesson" : "deck";
  $("#guidedLesson").hidden = learnMode !== "lesson";
  $("#wordDeckPanel").hidden = learnMode !== "deck";
  $("#guidedLessonTab").classList.toggle("active", learnMode === "lesson");
  $("#wordDeckTab").classList.toggle("active", learnMode === "deck");
  $("#wordDeckTab").disabled = hasLesson && !lessonComplete;
  $("#wordDeckTab").textContent = hasLesson && !lessonComplete ? "Word deck after lesson" : "Word deck";
  if (learnMode === "lesson") {
    $("#learnEyebrow").textContent = module.code + " · GUIDED LESSON";
    $("#learnTitle").textContent = module.lesson.title;
    $("#learnIntro").textContent = module.lesson.intro;
    $("#learnProgressLabel").textContent = "guided steps";
    renderGuidedLesson();
    return;
  }
  $("#learnEyebrow").textContent = module.code + " · WORD BUNDLES";
  $("#learnTitle").textContent = targetedWordId ? "Review " + deck[0].de : module.title;
  $("#learnIntro").textContent = targetedWordId ? "A focused return to one bundle from your vocabulary record." : "Review the phrases and word bundles after the guided lesson.";
  $("#learnProgressLabel").textContent = "current deck";
  renderCard();
  renderDeckStrip();
  renderDeckStatus();
}

function lessonExampleHtml(example) {
  return '<article><strong lang="de">' + escapeHtml(example.de) + '</strong><span>' + escapeHtml(example.en) + '</span>' + (example.note ? '<small>' + escapeHtml(example.note) + '</small>' : "") + '</article>';
}

function renderLessonInteraction(step) {
  const target = $("#lessonInteraction");
  target.innerHTML = "";
  target.hidden = step.kind === "teach";
  if (step.kind === "choice") {
    target.innerHTML = '<p class="lesson-prompt">' + escapeHtml(step.prompt) + '</p><div class="lesson-choices">' + step.options.map((option, index) => '<button type="button" data-lesson-choice="' + index + '">' + escapeHtml(option) + '</button>').join("") + '</div>';
    $$("[data-lesson-choice]").forEach(button => button.addEventListener("click", () => {
      lessonSelection = step.options[Number(button.dataset.lessonChoice)];
      $$("[data-lesson-choice]").forEach(item => item.classList.toggle("selected", item === button));
    }));
  }
  if (step.kind === "arrange") {
    target.innerHTML = '<p class="lesson-prompt">' + escapeHtml(step.prompt) + '</p><div class="lesson-builder" id="lessonBuilder"><span>Choose the words below.</span></div><div class="lesson-tiles">' + step.tokens.map((token, index) => '<button type="button" data-lesson-token="' + index + '">' + escapeHtml(token) + '</button>').join("") + '</div><button class="lesson-clear" id="lessonClear" type="button">Clear</button>';
    $$("[data-lesson-token]").forEach(button => button.addEventListener("click", () => {
      const index = Number(button.dataset.lessonToken);
      if (lessonBuilt.includes(index)) return;
      lessonBuilt.push(index);
      button.disabled = true;
      $("#lessonBuilder").textContent = lessonBuilt.map(item => step.tokens[item]).join(" ");
    }));
    $("#lessonClear").addEventListener("click", () => {
      lessonBuilt = [];
      renderLessonInteraction(step);
    });
  }
  if (step.kind === "type") {
    target.innerHTML = '<label for="lessonInput">' + escapeHtml(step.prompt) + '</label><input id="lessonInput" type="text" lang="de" placeholder="' + escapeHtml(step.placeholder || "") + '" autocomplete="off" />';
  }
}

function renderGuidedLesson() {
  const module = activeModule();
  const steps = module.lesson?.steps || [];
  if (!steps.length) return setLearnMode("deck");
  lessonStepIndex = Math.max(0, Math.min(lessonStepIndex, steps.length - 1));
  const record = moduleRecord(module.id);
  record.lessonIndex = lessonStepIndex;
  const step = steps[lessonStepIndex];
  lessonSelection = "";
  lessonBuilt = [];
  lessonStepPassed = Boolean(record.lessonSteps[step.id]);
  saveState();
  $("#deckPosition").textContent = (lessonStepIndex + 1) + " / " + steps.length;
  $("#lessonStepCount").textContent = "STEP " + (lessonStepIndex + 1) + " OF " + steps.length;
  $("#lessonProgressBar").style.width = ((lessonStepIndex + 1) / steps.length * 100) + "%";
  $("#lessonStepLabel").textContent = step.label || step.kind.toUpperCase();
  $("#lessonStepTitle").textContent = step.title;
  $("#lessonStepBody").textContent = step.body || "";
  $("#lessonExamples").innerHTML = (step.examples || []).map(lessonExampleHtml).join("");
  $("#lessonExamples").hidden = !(step.examples || []).length;
  $("#lessonNote").textContent = step.note || "";
  $("#lessonNote").hidden = !step.note;
  renderLessonInteraction(step);
  $("#lessonFeedback").hidden = !lessonStepPassed;
  $("#lessonFeedback").className = "lesson-feedback success";
  $("#lessonFeedback").innerHTML = lessonStepPassed ? "<strong>Step complete.</strong><p>You can review it or continue.</p>" : "";
  $("#lessonPrevious").disabled = lessonStepIndex === 0;
  const finalStep = lessonStepIndex === steps.length - 1;
  const interactive = ["choice", "arrange", "type"].includes(step.kind);
  $("#lessonAction").innerHTML = lessonStepPassed ? (finalStep ? 'Open sentence practice <span>→</span>' : 'Continue <span>→</span>') : interactive ? "Check" : (finalStep ? 'Finish lesson <span>→</span>' : 'Continue <span>→</span>');
}

function checkLessonStep() {
  const module = activeModule();
  const steps = module.lesson.steps;
  const step = steps[lessonStepIndex];
  const finalStep = lessonStepIndex === steps.length - 1;
  if (lessonStepPassed) {
    if (finalStep) return go("practice");
    lessonStepIndex += 1;
    return renderGuidedLesson();
  }
  if (step.kind === "teach") {
    completeLessonStep(module, step);
    if (finalStep) return go("practice");
    lessonStepIndex += 1;
    return renderGuidedLesson();
  }
  let correct = false;
  let typedResult = null;
  if (step.kind === "choice") correct = lessonSelection === step.answer;
  if (step.kind === "arrange") correct = cleanSpacing(lessonBuilt.map(index => step.tokens[index]).join(" ")) === cleanSpacing(step.answer);
  if (step.kind === "type") {
    const value = $("#lessonInput")?.value || "";
    typedResult = value.trim() ? classifyAnswer(value, step.answers, "A0") : null;
    correct = Boolean(typedResult?.correct);
  }
  const feedback = $("#lessonFeedback");
  feedback.hidden = false;
  feedback.className = "lesson-feedback " + (correct ? "success" : "repair");
  if (!correct) {
    feedback.innerHTML = "<strong>Use the model once more.</strong><p>" + escapeHtml(step.retry || "Review the example and try again.") + "</p>";
    return;
  }
  completeLessonStep(module, step);
  lessonStepPassed = true;
  const successDetail = typedResult?.note
    ? typedResult.note + " Standard form: " + typedResult.answer
    : step.success || "Continue when you are ready.";
  feedback.innerHTML = "<strong>That pattern is in place.</strong><p>" + escapeHtml(successDetail) + "</p>";
  $("#lessonAction").innerHTML = finalStep ? 'Open sentence practice <span>→</span>' : 'Continue <span>→</span>';
}

function prepareDeck() {
  let module = activeModule();
  const blockedBy = unmetPrerequisite(module);
  if (blockedBy) {
    const requested = module;
    setActiveModule(blockedBy.id, false);
    module = blockedBy;
    announceMessage(requested.code + " opens after " + blockedBy.code + ". " + (lessonIsComplete(blockedBy) ? "Finish the remaining sentence patterns first." : "Complete the guided lesson first."));
    if (lessonIsComplete(blockedBy) && !moduleSequenceComplete(blockedBy)) return go("practice");
  }
  syncModuleControls();
  deck = targetedWordId ? [wordByGlobalId(targetedWordId)] : module.words.map(word => ({ ...word, moduleId: module.id, level: module.level, globalId: globalWordId(module.id, word.id) }));
  deck = deck.filter(Boolean);
  deckIndex = targetedWordId ? 0 : Math.min(state.deckPositions[module.id] || 0, Math.max(0, deck.length - 1));
  const hasLesson = Boolean(module.lesson?.steps?.length) && !targetedWordId;
  $("#learnModeSwitch").hidden = !hasLesson;
  lessonStepIndex = hasLesson ? Math.min(moduleRecord(module.id).lessonIndex || 0, module.lesson.steps.length - 1) : 0;
  const startMode = hasLesson && !lessonIsComplete(module) ? "lesson" : "deck";
  return setLearnMode(startMode);
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

function availableQuestionsFor(module) {
  return module.questions.filter(question => question.requires.every(localId => isIntroduced(globalWordId(module.id, localId))));
}

function renderPracticeMenu() {
  const module = activeModule();
  const blockedBy = unmetPrerequisite(module);
  if (blockedBy) {
    const requested = module;
    setActiveModule(blockedBy.id, false);
    announceMessage(requested.code + " opens after " + blockedBy.code + ". " + (lessonIsComplete(blockedBy) ? "Finish the remaining sentence patterns first." : "Complete the guided lesson first."));
    return go(lessonIsComplete(blockedBy) ? "practice" : "learn");
  }
  syncModuleControls();
  const available = availableQuestionsFor(module);
  const record = moduleRecord(module.id);
  const guided = Boolean(module.lesson?.steps?.length);
  const lessonReady = lessonIsComplete(module);
  const resolved = completedPromptCount(module);
  const sentenceReady = lessonReady && available.length > 0;
  const readingReady = !guided || (lessonReady && resolved >= Math.min(2, module.questions.length));
  const writingReady = !guided || (lessonReady && resolved >= module.questions.length);
  const speakingReady = !guided || (writingReady && record.writing >= 1);
  const checkpointReady = available.length === module.questions.length && (!guided || (resolved >= module.questions.length && record.reading >= 1 && record.writing >= 1));
  const modeButton = mode => $('[data-practice-mode="' + mode + '"]');
  modeButton("sentences").disabled = !sentenceReady;
  modeButton("reading").disabled = !readingReady;
  modeButton("writing").disabled = !writingReady;
  modeButton("speaking").disabled = !speakingReady;
  modeButton("checkpoint").disabled = !checkpointReady;
  modeButton("listening").hidden = true;
  modeButton("listening").disabled = true;
  $("#practiceEyebrow").textContent = module.code + " · PRACTICE";
  $("#practiceTitle").textContent = module.title;
  $("#practiceIntro").textContent = guided ? "The guided lesson teaches each phrase first. Practice opens in stages as you use those patterns." : module.subtitle;
  $("#availableQuestionCount").textContent = lessonReady ? available.length : 0;
  $("#sentenceReadiness").textContent = !lessonReady ? "Complete the guided lesson first." : sentenceReady ? available.length + " ordered prompts use taught language." : "Meet the target bundles first.";
  $("#readingReadiness").textContent = readingReady ? "Short text built from taught language." : "Complete two sentence prompts first.";
  $("#writingReadiness").textContent = writingReady ? "Every visible requirement will be checked." : "Finish the sentence set first.";
  $("#speakingReadiness").textContent = speakingReady ? "Transcript phrase check. Pronunciation scoring is unavailable." : "Pass the writing checklist first.";
  $("#checkpointReadiness").textContent = checkpointReady ? "The full review is ready." : guided ? "Complete reading and writing first." : "Meet the remaining target bundles first.";
  $("#practiceLearnFirst").textContent = !lessonReady ? "Open guided lesson" : guided ? "Review lesson and words" : "Review word deck";
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
  const record = moduleRecord(module.id);
  const guided = Boolean(module.lesson?.steps?.length);
  const lessonReady = lessonIsComplete(module);
  const resolved = completedPromptCount(module);
  const available = availableQuestionsFor(module);
  const readiness = {
    sentences: lessonReady && available.length > 0,
    reading: !guided || (lessonReady && resolved >= Math.min(2, module.questions.length)),
    writing: !guided || (lessonReady && resolved >= module.questions.length),
    speaking: !guided || (lessonReady && resolved >= module.questions.length && record.writing >= 1),
    checkpoint: available.length === module.questions.length && (!guided || (resolved >= module.questions.length && record.reading >= 1 && record.writing >= 1))
  };
  if (mode === "listening") {
    announceModule({ code: module.code, title: "Listening is being rebuilt with reviewed German audio" });
    return renderPracticeMenu();
  }
  if (!readiness[mode]) {
    announceModule({ code: module.code, title: !lessonReady ? "Complete the guided lesson first" : "Complete the earlier practice stage first" });
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
  const available = availableQuestionsFor(module);
  const unfinished = module.lesson && !checkpoint ? available.filter(question => !moduleRecord(module.id).completedPrompts[question.id]) : [];
  const source = checkpoint ? module.questions : unfinished.length ? unfinished : available;
  const questions = module.lesson && !checkpoint ? [...source] : [...source].sort(() => Math.random() - .5);
  quiz = { moduleId: module.id, checkpoint, questions, index: 0, firstCorrect: 0, recovered: 0, missed: [], originalTotal: questions.length, retry: false, inlineRetry: false };
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
  const support = quiz.checkpoint ? null : question.support;
  $("#quizSupport").hidden = !support;
  $("#quizSupport").innerHTML = support ? '<span>' + escapeHtml(support.title) + '</span><strong lang="de">' + escapeHtml(support.model) + '</strong><small>' + escapeHtml(support.translation) + '</small><p>' + escapeHtml(support.tip) + '</p>' : "";
  const sourceBank = quiz.checkpoint ? [] : (question.wordBank || []);
  const bank = sourceBank.filter((_, index) => index % 2 === 1).concat(sourceBank.filter((_, index) => index % 2 === 0));
  $("#quizWordBank").hidden = bank.length === 0;
  $("#quizWordBank").innerHTML = bank.map(word => `<span>${escapeHtml(word)}</span>`).join("");
  $("#quizInput").value = "";
  $("#quizInput").disabled = false;
  $("#quizFeedback").hidden = true;
  $("#quizFeedback").className = "quiz-feedback";
  $("#quizCorrectAnswer").textContent = "";
  $("#quizComparison").innerHTML = "";
  $("#quizTryAgain").hidden = true;
  quiz.inlineRetry = false;
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
    if (raw === expected) return { correct: true, answer, note: "" };
  }
  const rawWords = stripPunctuation(raw);
  const mechanicalMatches = answers.map(answer => {
    const expected = cleanSpacing(answer);
    const expectedWords = stripPunctuation(expected);
    const sameWords = foldSpelling(rawWords) === foldSpelling(expectedWords);
    const cost = sameWords ? alignAnswerTokens(raw, expected).reduce((sum, operation) => sum + ({ equal: 0, capitalization: .12, keyboard: .18, punctuation: .4, substitution: 1, missing: 1, extra: 1 })[operation.kind], 0) : Infinity;
    return { answer, expected, expectedWords, sameWords, cost };
  }).filter(candidate => candidate.sameWords).sort((a, b) => a.cost - b.cost);
  if (mechanicalMatches.length) {
    const { answer, expected, expectedWords } = mechanicalMatches[0];
    const samePunctuation = foldSpelling(raw) === foldSpelling(expected);
    const punctuationDifference = !samePunctuation;
    const caseDifference = rawWords !== expectedWords && rawWords.toLocaleLowerCase("de-DE") === expectedWords.toLocaleLowerCase("de-DE");
    const spellingFallback = foldSpelling(rawWords) === foldSpelling(expectedWords) && rawWords.toLocaleLowerCase("de-DE") !== expectedWords.toLocaleLowerCase("de-DE") && !caseDifference;
    if (strictMechanics && punctuationDifference) return { correct: false, near: true, kind: "punctuation", answer, note: `Match the standard punctuation: ${expected}` };
    if (strictMechanics && caseDifference) return { correct: false, near: true, kind: "capitalization", answer, note: "Capitalization is the remaining issue. Check the sentence opening and every German noun." };
    const notes = [];
    if (punctuationDifference) notes.push("Use the standard punctuation shown below");
    if (caseDifference) notes.push("Check the standard capitalization shown below");
    if (spellingFallback) notes.push("The keyboard spelling is accepted. The standard German spelling appears below");
    return { correct: true, answer, note: notes.join(". ") + (notes.length ? "." : "") };
  }
  const foldedRaw = foldSpelling(stripTerminal(raw));
  const closest = answers.reduce((best, answer) => {
    const distance = editDistance(foldedRaw, foldSpelling(stripTerminal(answer)));
    return distance < best.distance ? { distance, answer } : best;
  }, { distance: Infinity, answer: answers[0] });
  return { correct: false, near: closest.distance <= Math.max(1, Math.round(foldedRaw.length * .08)), answer: closest.answer, note: "" };
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

function feedbackTokens(value) {
  return cleanSpacing(value).normalize("NFC").match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)?|[.,!?;:()[\]{}"„“]/gu) || [];
}

function tokenKind(actual, expected) {
  if (actual === expected) return "equal";
  if (actual.toLocaleLowerCase("de-DE") === expected.toLocaleLowerCase("de-DE")) return "capitalization";
  if (foldSpelling(actual) === foldSpelling(expected)) return "keyboard";
  const punctuation = /^[.,!?;:()[\]{}"„“]$/u;
  if (punctuation.test(actual) || punctuation.test(expected)) return "punctuation";
  return "substitution";
}

function tokenCost(actual, expected) {
  return ({ equal: 0, capitalization: .12, keyboard: .18, punctuation: .4, substitution: 1 })[tokenKind(actual, expected)];
}

function alignAnswerTokens(actualText, expectedText) {
  const actual = feedbackTokens(actualText);
  const expected = feedbackTokens(expectedText);
  const rows = actual.length + 1;
  const cols = expected.length + 1;
  const cost = Array.from({ length: rows }, () => Array(cols).fill(0));
  const move = Array.from({ length: rows }, () => Array(cols).fill(""));
  for (let i = 1; i < rows; i += 1) { cost[i][0] = i; move[i][0] = "extra"; }
  for (let j = 1; j < cols; j += 1) { cost[0][j] = j; move[0][j] = "missing"; }
  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const paired = cost[i - 1][j - 1] + tokenCost(actual[i - 1], expected[j - 1]);
      const extra = cost[i - 1][j] + 1;
      const missing = cost[i][j - 1] + 1;
      const best = Math.min(paired, extra, missing);
      cost[i][j] = best;
      move[i][j] = best === paired ? "pair" : best === extra ? "extra" : "missing";
    }
  }
  const operations = [];
  let i = actual.length;
  let j = expected.length;
  while (i > 0 || j > 0) {
    const step = move[i][j];
    if (step === "pair") {
      operations.push({ kind: tokenKind(actual[i - 1], expected[j - 1]), actual: actual[i - 1], expected: expected[j - 1] });
      i -= 1;
      j -= 1;
    } else if (step === "extra") {
      operations.push({ kind: "extra", actual: actual[i - 1], expected: "" });
      i -= 1;
    } else {
      operations.push({ kind: "missing", actual: "", expected: expected[j - 1] });
      j -= 1;
    }
  }
  return operations.reverse();
}

function markedCapitalization(actual, expected) {
  const actualChars = [...actual];
  const expectedChars = [...expected];
  if (actualChars.length !== expectedChars.length) return '<mark class="answer-token capitalization">' + escapeHtml(actual) + '</mark>';
  return actualChars.map((character, index) => character === expectedChars[index]
    ? '<span class="correct-fragment">' + escapeHtml(character) + '</span>'
    : '<mark class="case-character" title="Capitalization">' + escapeHtml(character) + '</mark>').join("");
}

function needsSpaceBefore(token) {
  return !/^[.,!?;:)\]}]$/u.test(token);
}

function renderAlignedRow(operations, side) {
  let html = "";
  let previous = "";
  operations.forEach(operation => {
    const token = side === "actual" ? operation.actual : operation.expected;
    if (!token) {
      if (side === "actual" && operation.kind === "missing") {
        const addition = '<mark class="answer-token missing" title="Missing text">^ ' + escapeHtml(operation.expected) + '</mark>';
        html += html ? " " + addition : addition;
      }
      return;
    }
    let marked = "";
    if (side === "actual") {
      if (operation.kind === "equal") marked = '<span class="answer-token correct">' + escapeHtml(token) + '</span>';
      else if (operation.kind === "capitalization") marked = markedCapitalization(operation.actual, operation.expected);
      else if (operation.kind === "keyboard") marked = '<mark class="answer-token keyboard" title="Keyboard spelling">' + escapeHtml(token) + '</mark>';
      else if (operation.kind === "extra") marked = '<mark class="answer-token extra" title="Remove this text">⌫ ' + escapeHtml(token) + '</mark>';
      else marked = '<mark class="answer-token issue" title="Change this text">' + escapeHtml(token) + '</mark>';
    } else {
      marked = operation.kind === "equal"
        ? '<span class="answer-token correct">' + escapeHtml(token) + '</span>'
        : '<mark class="answer-token correction">' + escapeHtml(token) + '</mark>';
    }
    const addSpace = html && needsSpaceBefore(token) && !/^[([{]$/u.test(previous);
    html += (addSpace ? " " : "") + marked;
    previous = token;
  });
  return html;
}

function issueMessage(operation) {
  if (operation.kind === "capitalization") {
    const firstOnly = operation.actual.slice(1) === operation.expected.slice(1);
    if (firstOnly && operation.expected[0] === operation.expected[0].toLocaleUpperCase("de-DE")) return "≡ Capitalize " + operation.expected + ".";
    if (firstOnly) return "≡ Use lowercase " + operation.expected[0] + " in " + operation.expected + ".";
    return "≡ Match the capitalization in " + operation.expected + ".";
  }
  if (operation.kind === "keyboard") return "KEY Standard spelling: " + operation.expected + ".";
  if (operation.kind === "punctuation") return "PUNC Use " + operation.expected + " here.";
  if (operation.kind === "missing" && /^[.,!?;:]$/u.test(operation.expected)) return "PUNC Add “" + operation.expected + "”";
  if (operation.kind === "extra" && /^[.,!?;:]$/u.test(operation.actual)) return "PUNC Remove “" + operation.actual + "”";
  if (operation.kind === "missing") return "^ Add " + operation.expected + ".";
  if (operation.kind === "extra") return "⌫ Remove " + operation.actual + ".";
  if (operation.kind === "substitution") return "↔ Replace " + operation.actual + " with " + operation.expected + ".";
  return "";
}

function answerComparisonHtml(value, answer) {
  const operations = alignAnswerTokens(value, answer);
  const issues = operations.map(issueMessage).filter(Boolean);
  const valueEnding = /[.!?]$/u.test(value.trim()) ? "" : ".";
  const answerEnding = /[.!?]$/u.test(answer) ? "" : ".";
  const screenReader = "Your answer: " + value + valueEnding + " Corrected form: " + answer + answerEnding + (issues.length ? " " + issues.join(" ") : "");
  return '<div class="comparison-sr">' + escapeHtml(screenReader) + '</div>' +
    '<div class="comparison-row"><span>Your answer</span><p lang="de" aria-hidden="true">' + renderAlignedRow(operations, "actual") + '</p></div>' +
    '<div class="comparison-row"><span>Corrected form</span><p lang="de" aria-hidden="true">' + renderAlignedRow(operations, "expected") + '</p></div>' +
    (issues.length ? '<ul class="comparison-issues">' + issues.map(issue => '<li>' + escapeHtml(issue) + '</li>').join("") + '</ul>' : "");
}

function answerAttemptHtml(value, hasSupport) {
  return '<div class="comparison-row attempt-only"><span>Your answer</span><p lang="de">' + escapeHtml(value) + '</p></div>' +
    '<p class="comparison-prompt">' + (hasSupport ? "Use the support card and word bank, then edit your answer." : "Try the pattern once more, or return to the guided lesson.") + ' The corrected form appears once most of the pattern is in place.</p>';
}

function answerCoverage(value, answer) {
  const operations = alignAnswerTokens(value, answer);
  const expected = operations.filter(operation => operation.expected && !/^[.,!?;:()[\]{}"„“]$/u.test(operation.expected));
  const matched = expected.filter(operation => ["equal", "capitalization", "keyboard"].includes(operation.kind));
  return matched.length / Math.max(1, expected.length);
}

function updateQuestionEvidence(question, result, retry) {
  const module = moduleById(quiz.moduleId);
  const record = moduleRecord(module.id);
  const stamp = now();
  if (!retry) {
    record.attempts += 1;
    state.quiz.attempts += 1;
    record.attemptedPrompts[question.id] = true;
  }
  if (result.correct) {
    record.completedPrompts[question.id] = true;
    if (retry) {
      if (quiz.missed.some(item => item.id === question.id)) {
        quiz.recovered += 1;
        state.quiz.recovered += 1;
        quiz.missed = quiz.missed.filter(item => item.id !== question.id);
      }
    } else {
      quiz.firstCorrect += 1;
      state.quiz.firstCorrect += 1;
      record.firstCorrect += 1;
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
    if (!quiz.missed.some(item => item.id === question.id)) quiz.missed.push(question);
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
  const repairAttempt = quiz.retry || quiz.inlineRetry;
  updateQuestionEvidence(question, result, repairAttempt);
  const feedbackPanel = $("#quizFeedback");
  const coached = result.correct && Boolean(result.note);
  const revealCorrection = result.correct || result.near || answerCoverage(value, result.answer) >= .5;
  feedbackPanel.hidden = false;
  feedbackPanel.className = "quiz-feedback " + (result.correct ? coached ? "close" : "" : result.near ? "close" : "wrong");
  $("#quizFeedbackMark").textContent = result.correct ? coached ? "≈" : "✓" : result.near ? "≈" : "!";
  $("#quizFeedbackTitle").textContent = result.correct
    ? coached ? "Meaning complete. Review the marked form." : "Your sentence is complete."
    : revealCorrection ? result.near ? "One form needs repair." : "Work through the marked spots."
    : "Use the taught pattern once more.";
  $("#quizFeedbackText").textContent = revealCorrection ? (result.note || question.explanation) : "Return to the taught pattern and build it once more.";
  $("#quizComparison").innerHTML = revealCorrection ? answerComparisonHtml(value, result.answer) : answerAttemptHtml(value, !quiz.checkpoint);
  $("#quizCorrectAnswer").textContent = revealCorrection && result.note ? question.explanation : "";
  $("#quizInput").disabled = true;
  $("#quizForm").hidden = true;
  $("#quizTryAgain").hidden = result.correct && !coached;
  $("#quizNext").innerHTML = quiz.index === quiz.questions.length - 1 ? 'See results <span>→</span>' : 'Next <span>→</span>';
  $("#quizFeedbackTitle").focus();
}

function retryCurrentQuizAnswer() {
  quiz.inlineRetry = true;
  $("#quizFeedback").hidden = true;
  $("#quizForm").hidden = false;
  $("#quizInput").disabled = false;
  $("#quizInput").focus();
  $("#quizInput").select();
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

function writingLines(text) {
  return String(text).split(/\r?\n/).map(line => line.trim()).filter(Boolean);
}

function evaluateWritingCheck(check, text, words) {
  const lines = writingLines(text);
  if (check.type === "lineCount") {
    const actual = lines.length;
    return { met: actual === check.value, detail: actual + " line" + (actual === 1 ? "" : "s") };
  }
  if (check.type === "minWords") return { met: words >= check.value, detail: words + " words" };
  if (check.type === "maxWords") return { met: words <= check.value, detail: words + " words" };
  if (check.type === "regex") {
    const expression = new RegExp(check.pattern, check.flags || "u");
    return { met: expression.test(text), detail: "" };
  }
  if (check.type === "regexLine") {
    const expression = new RegExp(check.pattern, check.flags || "u");
    const line = lines[check.line] || "";
    return { met: expression.test(line), detail: line ? "Line " + (check.line + 1) : "Line " + (check.line + 1) + " is empty" };
  }
  if (check.type === "capitalization") {
    const expected = new Map((check.words || []).map(word => [word.toLocaleLowerCase("de-DE"), word]));
    const incorrect = feedbackTokens(text).filter(token => {
      const standard = expected.get(token.toLocaleLowerCase("de-DE"));
      return standard && token !== standard;
    });
    return { met: incorrect.length === 0, detail: incorrect.length ? "Check: " + [...new Set(incorrect)].join(", ") : "" };
  }
  if (check.type === "keyboardSpellings") {
    const found = (check.forms || []).filter(form => new RegExp("\\b" + form.typed + "\\b", "iu").test(text));
    return { met: found.length === 0, detail: found.length ? "Standard spelling: " + found.map(form => form.standard).join(", ") : "" };
  }
  if (check.type === "punctuatedLines") {
    const missing = lines.map((line, index) => /[.!?]$/u.test(line) ? -1 : index + 1).filter(index => index > 0);
    return { met: lines.length > 0 && missing.length === 0, detail: missing.length ? "Check line" + (missing.length === 1 ? " " : "s ") + missing.join(", ") : "" };
  }
  return { met: false, detail: "This check needs review." };
}

function evaluateWritingChecks(task, text) {
  const words = countWords(text);
  return (task.checks || []).map(check => ({ ...check, ...evaluateWritingCheck(check, text, words) }));
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
  if (task.checks?.length) {
    const checks = evaluateWritingChecks(task, text);
    const requiredChecks = checks.filter(check => check.required !== false);
    const requiredPassed = requiredChecks.filter(check => check.met).length;
    const optionalMisses = checks.filter(check => check.required === false && !check.met).length;
    const ratioValue = requiredChecks.length ? requiredPassed / requiredChecks.length : 1;
    const writingRecord = moduleRecord(module.id);
    writingRecord.writing = Math.max(writingRecord.writing || 0, ratioValue);
    state.skills.writing.attempts += 1;
    saveState();
    const writingFeedback = $("#writingFeedback");
    writingFeedback.hidden = false;
    writingFeedback.className = "task-feedback " + (ratioValue === 1 ? "success" : "repair");
    const heading = ratioValue === 1
      ? optionalMisses ? "Every required building block is present. " + optionalMisses + " writing detail" + (optionalMisses === 1 ? " is" : "s are") + " marked below." : "Every listed check passed."
      : requiredPassed + " of " + requiredChecks.length + " required checks passed.";
    const model = ratioValue >= .5
      ? '<p class="model"><strong>Model after submission:</strong><span class="preserve-lines">' + escapeHtml(task.model) + '</span></p>'
      : '<p>Use the marked requirements for your next attempt. The model appears after most required parts are present.</p>';
    writingFeedback.innerHTML = '<h3>' + heading + '</h3><ul class="checked-requirements">' +
      checks.map(check => {
        const optional = check.required === false;
        const status = check.met ? "met" : optional ? "coaching" : "missing";
        const symbol = check.met ? "✓" : optional ? "△" : "○";
        const detail = check.detail || (optional && !check.met ? "Writing detail for your next pass" : "");
        return '<li class="' + status + '"><span>' + symbol + '</span><div><strong>' + escapeHtml(check.label) + '</strong>' + (detail ? '<small>' + escapeHtml(detail) + '</small>' : "") + '</div></li>';
      }).join("") + '</ul>' + model;
    return;
  }
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
  const fallbackModel = ratio >= .5 ? `<p class="model"><strong>Model:</strong> ${escapeHtml(task.model)}</p>` : "<p>The model appears after most requested parts are present.</p>";
  feedback.innerHTML = `<h3>${ratio === 1 ? "All requested building blocks are present." : "A revision pass has a clear target."}</h3><p>${lengthMet ? `Length target reached: ${words} words.` : `Current length: ${words} words. Target: ${task.minWords} or more.`}</p><ul>${requirements.map(item => `<li>${item.met ? "✓" : "○"} ${escapeHtml(item.item)}</li>`).join("")}</ul><p>This check tracks the requested features.</p>${fallbackModel}`;
}

function renderSpeaking() {
  const module = activeModule();
  const task = module.task;
  $("#speakingTask").hidden = false;
  $("#speakingTitle").textContent = `${module.code}: Rehearse familiar phrases`;
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
  feedback.innerHTML = `<h3>${ratio === 1 ? "The target phrases appear in the transcript." : "Repeat once with the missing target phrase."}</h3><ul>${requirements.map(item => `<li>${item.met ? "✓" : "○"} ${escapeHtml(item.item)}</li>`).join("")}</ul><p>This transcript checks selected words and forms. Pronunciation quality is outside this check.</p><p class="model"><strong>Model:</strong> ${escapeHtml(task.speakingModel)}</p>`;
}

function renderGrammar() {
  const module = activeModule();
  syncModuleControls();
  const cards = module.level === "A0" ? module.grammar.filter(item => !item.supplemental) : module.grammar;
  $("#grammarCards").innerHTML = cards.map((item, index) => `<article class="grammar-card"><span>${module.code} · ${String(index + 1).padStart(2, "0")}</span><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.rule)}</p><div class="grammar-example"><strong>${escapeHtml(item.example)}</strong><small>${escapeHtml(item.translation)}</small></div></article>`).join("");
  $("#caseDesk").hidden = module.level === "A0";
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
  $("#guidedLessonTab").addEventListener("click", () => setLearnMode("lesson"));
  $("#wordDeckTab").addEventListener("click", () => setLearnMode("deck"));
  $("#lessonPrevious").addEventListener("click", () => {
    lessonStepIndex = Math.max(0, lessonStepIndex - 1);
    renderGuidedLesson();
  });
  $("#lessonAction").addEventListener("click", checkLessonStep);
  $("#cardDirection").addEventListener("change", event => { state.cardDirection = event.target.value; saveState(); renderCard(); });
  $("#shuffleDeck").addEventListener("click", () => { deck = [...deck].sort(() => Math.random() - .5); deckIndex = 0; renderCard(); renderDeckStrip(); });
  $$('[data-rating]').forEach(button => button.addEventListener("click", () => rateCard(button.dataset.rating)));
  $("#learnToPractice").addEventListener("click", () => go("practice"));
  $("#practiceLearnFirst").addEventListener("click", () => go("learn"));
  $$('[data-practice-mode]').forEach(button => button.addEventListener("click", () => openPracticeMode(button.dataset.practiceMode)));
  $("#activityBack").addEventListener("click", renderPracticeMenu);
  $("#quizForm").addEventListener("submit", submitQuizAnswer);
  $("#quizTryAgain").addEventListener("click", retryCurrentQuizAnswer);
  $("#quizNext").addEventListener("click", nextQuizQuestion);
  $("#retryMissed").addEventListener("click", retryMissedQuestions);
  $("#finishQuiz").addEventListener("click", renderPracticeMenu);
  $("#listeningForm").addEventListener("submit", submitListening);
  $("#readingForm").addEventListener("submit", submitReading);
  $("#writingInput").addEventListener("input", event => { $("#writingCount").textContent = `${countWords(event.target.value)} words · target ${activeModule().task.minWords}+`; });
  $("#checkWriting").addEventListener("click", checkWriting);
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
