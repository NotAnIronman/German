const course = window.SATZWERK_CURRICULUM;

if (!course?.modules?.length) {
  document.body.innerHTML = '<main style="padding:40px;font-family:system-ui"><h1>Course data failed to load.</h1><p>Refresh the page. If the problem continues, check that curriculum.js is available.</p></main>';
  throw new Error("Satzwerk curriculum missing");
}

const levels = course.levels;
const modules = course.modules;
const listeningCourse = window.SATZWERK_MODULE_AUDIO || { items: [], voices: {} };
const listeningByModule = new Map((listeningCourse.items || []).map(item => [item.moduleId, item]));
const listeningEvidenceVersion = Number(listeningCourse.version || 1);

function listeningFor(module) {
  return listeningByModule.get(module.id) || null;
}

function modelSentenceCue(word) {
  const german = String(word.example || "");
  const notes = [];
  if (/\b(?:Sie|Ihnen|Ihr(?:e|en|er|es|em)?)\b/u.test(german)) notes.push("Use formal Sie.");
  else if (/\b(?:du|dich|dir|dein(?:e|en|er|es|em)?)\b/iu.test(german) || /^(?:Komm|Bring|Nimm|Gib|Mach|Sei|Hab|Fahr|Geh|Lies|Sprich|Ruf|Hör|Schreib|Sag|Hilf|Bleib)\b/u.test(german)) notes.push("Use informal du.");
  const genderPair = String(word.bundle || "").match(/\bder\s+([A-ZÄÖÜ][\p{L}-]+).*?\bdie\s+([A-ZÄÖÜ][\p{L}-]+in)\b/u);
  if (genderPair && new RegExp(`\\b${genderPair[2]}\\b`, "u").test(german)) notes.push("The person is a woman.");
  else if (genderPair && new RegExp(`\\b${genderPair[1]}\\b`, "u").test(german)) notes.push("The person is a man.");
  return `${word.exampleEn}${notes.length ? ` ${notes.join(" ")}` : ""}`;
}

function generatedLessonFor(module) {
  const core = module.words.filter(word => !word.supplemental);
  const midpoint = Math.ceil(core.length / 2);
  const firstTarget = core[0];
  const transferTarget = core[core.length - 1];
  const choicePosition = [...module.id].reduce((total, character) => total + character.codePointAt(0), 0) % 3;
  const meaningOptions = core.slice(1, 3).map(word => word.bundle);
  meaningOptions.splice(choicePosition, 0, firstTarget.bundle);
  const bundleStep = (id, title, group) => ({
    id,
    kind: "teach",
    label: "CORE LANGUAGE",
    title,
    body: "Read each bundle with its meaning and example. The typed deck follows this lesson.",
    examples: group.map(word => ({ de: word.bundle, en: word.en, note: word.example })),
    teaches: group.map(word => word.id)
  });
  return {
    generated: true,
    title: `${module.title}: guided preparation`,
    intro: "Start with the communicative goal, study the grammar in examples, then meet every core bundle before retrieval.",
    steps: [
      {
        id: "module-goals",
        kind: "teach",
        label: "PURPOSE",
        title: "What this module prepares you to do",
        body: module.canDo.map(goal => /[.!?]$/u.test(goal) ? goal : `${goal}.`).join(" "),
        note: "These goals return in Sentence Lab, skill work, and the module assessment."
      },
      ...module.grammar.map((item, index) => ({
        id: `grammar-${index + 1}`,
        kind: "teach",
        label: "GRAMMAR",
        title: item.title,
        body: item.rule,
        examples: [{ de: item.example, en: item.translation }]
      })),
      bundleStep("core-bundles-1", "Meet the first core bundles", core.slice(0, midpoint)),
      {
        id: "meaning-check",
        kind: "choice",
        label: "GUIDED CHECK",
        title: "Recognize a useful bundle",
        body: "Choose the German bundle that matches the meaning. You can review the examples above before answering.",
        prompt: `Which bundle means: ${firstTarget.en}?`,
        options: meaningOptions,
        answer: firstTarget.bundle,
        retry: "Match the meaning to the complete bundle shown in the previous step.",
        success: "You recognized the bundle in context.",
        teaches: [firstTarget.id]
      },
      bundleStep("core-bundles-2", "Connect the remaining core bundles", core.slice(midpoint)),
      {
        id: "first-transfer",
        kind: "type",
        label: "GUIDED PRODUCTION",
        title: "Produce one complete sentence",
        body: "Rebuild the model sentence with the same people, register, and gender shown in the bundle. Keyboard spellings such as ae, oe, ue, and ss are accepted.",
        prompt: `Recall the model sentence for “${transferTarget.bundle}”: ${modelSentenceCue(transferTarget)}`,
        placeholder: "Type the complete German sentence",
        answers: [transferTarget.example, ...(transferTarget.practiceAnswers || [])],
        retry: "Return to the second bundle group and copy the sentence once with care.",
        success: "You produced the first complete sentence from this module.",
        teaches: [transferTarget.id]
      },
      {
        id: "retrieval-ready",
        kind: "teach",
        label: "NEXT STEP",
        title: "Prepare to retrieve the language",
        body: "The word deck asks you to type each answer. Sentence Lab opens after every core bundle has been recalled once.",
        note: "Expansion bundles remain available for extra range and never block module completion."
      }
    ]
  };
}

modules.forEach(module => {
  if (!module.lesson?.steps?.length) module.lesson = generatedLessonFor(module);
});

const allWords = modules.flatMap(module => module.words.map(word => ({ ...word, moduleId: module.id, level: module.level, globalId: `${module.id}:${word.id}` })));
const allQuestions = modules.flatMap(module => module.questions.map(question => ({ ...question, moduleId: module.id, level: module.level, globalId: `${module.id}:${question.id}` })));
const storageKey = "satzwerk-production-v1";
const backupStorageKey = `${storageKey}-backup`;
const progressExportFormat = "satzwerk-progress-v1";
const maxProgressImportBytes = 10 * 1024 * 1024;
const levelRank = { A0: 0, A1: 1, A2: 2, B1: 3, B2: 4 };
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const now = () => Date.now();
const localDayKey = (value = new Date()) => {
  const date = value instanceof Date ? value : new Date(value);
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
};
const today = () => localDayKey();
const dayMs = 86400000;
const assessmentVersion = 7;
const assessmentPassScore = .8;

const defaultState = {
  version: 7,
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
  cardDirection: "german",
  drafts: { writing: {}, speaking: {}, speakingFollowUp: {} },
  assessmentSessions: {},
  motivation: { activityDays: [], days: {}, claims: {}, recentWins: [], points: 0 },
  variation: { recentChoices: {}, recentOrders: {}, counters: {} }
};

let storageNotice = "";
let storageFailureNoticeAt = 0;
let suppressPagehidePersistence = false;

function isPlainRecord(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function recordOrEmpty(value) {
  return isPlainRecord(value) ? value : {};
}

function arrayOrEmpty(value) {
  return Array.isArray(value) ? value : [];
}

function recordMapOrEmpty(value) {
  return Object.fromEntries(Object.entries(recordOrEmpty(value)).filter(([, entry]) => isPlainRecord(entry)));
}

function normalizeLoadedRecords(next) {
  next.words = recordMapOrEmpty(next.words);
  Object.values(next.words).forEach(record => {
    record.days = arrayOrEmpty(record.days);
    record.typedDays = arrayOrEmpty(record.typedDays);
    record.directionCorrect = recordOrEmpty(record.directionCorrect);
  });

  next.modules = recordMapOrEmpty(next.modules);
  Object.values(next.modules).forEach(record => {
    record.completedPrompts = recordOrEmpty(record.completedPrompts);
    record.attemptedPrompts = recordOrEmpty(record.attemptedPrompts);
    record.lessonSteps = recordOrEmpty(record.lessonSteps);
    record.activities = recordMapOrEmpty(record.activities);
    Object.values(record.activities).forEach(activity => {
      activity.attempts = Number(activity.attempts || 0);
      activity.bestScore = Number(activity.bestScore || 0);
    });
    record.assessment = recordOrEmpty(record.assessment);
    record.assessment.attempts = arrayOrEmpty(record.assessment.attempts);
    record.assessment.archive = arrayOrEmpty(record.assessment.archive);
  });

  next.readings = recordMapOrEmpty(next.readings);
  Object.values(next.readings).forEach(record => {
    record.attempts = arrayOrEmpty(record.attempts);
    record.archive = arrayOrEmpty(record.archive);
  });
  next.readingLibrary = recordOrEmpty(next.readingLibrary);
  next.audioStudy = recordOrEmpty(next.audioStudy);
  return next;
}

function writeStateToStorage(value, options = {}) {
  try {
    const serialized = JSON.stringify(value);
    const previous = localStorage.getItem(storageKey);
    localStorage.setItem(storageKey, serialized);
    if (options.preservePrevious === true && previous && previous !== serialized && !localStorage.getItem(backupStorageKey)) {
      try { localStorage.setItem(backupStorageKey, previous); } catch {}
    }
    return true;
  } catch {
    storageNotice = "Progress could not be saved in this browser. Export a progress copy before closing the page.";
    const timestamp = Date.now();
    if (timestamp - storageFailureNoticeAt > 60000 && typeof window !== "undefined") {
      storageFailureNoticeAt = timestamp;
      window.setTimeout(() => announceMessage(storageNotice), 0);
    }
    return false;
  }
}

function loadState(serializedState = null, allowBackup = true) {
  try {
    const parsed = JSON.parse(serializedState ?? localStorage.getItem(storageKey) ?? "{}");
    if (!isPlainRecord(parsed)) throw new Error("Saved progress must be an object.");
    const storedVersion = Number(parsed.version || 1);
    const next = {
      ...defaultState,
      ...parsed,
      words: recordMapOrEmpty(parsed.words),
      modules: recordMapOrEmpty(parsed.modules),
      quiz: { ...defaultState.quiz, ...recordOrEmpty(parsed.quiz) },
      skills: {
        listening: { ...defaultState.skills.listening, ...recordOrEmpty(parsed.skills?.listening) },
        reading: { ...defaultState.skills.reading, ...recordOrEmpty(parsed.skills?.reading) },
        writing: { ...defaultState.skills.writing, ...recordOrEmpty(parsed.skills?.writing) },
        speaking: { ...defaultState.skills.speaking, ...recordOrEmpty(parsed.skills?.speaking) }
      },
      deckPositions: recordOrEmpty(parsed.deckPositions),
      drafts: {
        writing: recordOrEmpty(parsed.drafts?.writing),
        speaking: recordOrEmpty(parsed.drafts?.speaking),
        speakingFollowUp: recordOrEmpty(parsed.drafts?.speakingFollowUp)
      },
      motivation: {
        activityDays: arrayOrEmpty(parsed.motivation?.activityDays),
        days: recordMapOrEmpty(parsed.motivation?.days),
        claims: recordOrEmpty(parsed.motivation?.claims),
        recentWins: arrayOrEmpty(parsed.motivation?.recentWins),
        points: Number(parsed.motivation?.points || 0)
      },
      variation: {
        recentChoices: recordOrEmpty(parsed.variation?.recentChoices),
        recentOrders: recordOrEmpty(parsed.variation?.recentOrders),
        counters: recordOrEmpty(parsed.variation?.counters)
      },
      readings: recordMapOrEmpty(parsed.readings),
      readingLibrary: recordOrEmpty(parsed.readingLibrary),
      audioStudy: recordOrEmpty(parsed.audioStudy)
    };
    next.assessmentSessions = recordOrEmpty(parsed.assessmentSessions);
    if (isPlainRecord(parsed.assessmentSession) && parsed.assessmentSession.moduleId && !next.assessmentSessions[parsed.assessmentSession.moduleId]) {
      next.assessmentSessions[parsed.assessmentSession.moduleId] = parsed.assessmentSession;
    }
    delete next.assessmentSession;
    const rewardCategories = ["lesson", "vocabulary", "sentences", "listening", "reading", "graded-reading", "writing", "speaking", "assessment"];
    Object.values(next.motivation.days).forEach(day => {
      if (!isPlainRecord(day.categories)) {
        day.categories = Object.fromEntries(rewardCategories.filter(category => Number(day[category] || 0) > 0).map(category => [category, Number(day[category])]));
      }
      day.points = Number(day.points || 0);
    });
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
    }
    if (storedVersion < 4) {
      next.version = 4;
      next.deckPositions = {};
    }
    if (storedVersion < 5) next.version = 5;
    if (storedVersion < 6) next.version = 6;
    if (storedVersion < 7) {
      (listeningCourse.items || []).forEach(item => {
        const record = next.modules[item.moduleId];
        if (record?.assessment?.passedAt && !record.activities?.listening?.completedAt) record.listeningGrandfathered = true;
      });
      next.version = 7;
    }
    if (parsed.motivation?.points == null) {
      const activityPoints = { listening: 12, reading: 14, writing: 18, speaking: 16 };
      const modulePoints = Object.values(next.modules).reduce((total, record) => {
        const lessonPoints = Object.keys(record.lessonSteps || {}).length * 6;
        const sentencePoints = Object.keys(record.completedPrompts || {}).length * 10;
        const completedActivityPoints = Object.keys(activityPoints).reduce((sum, key) => {
          const completed = record.activities?.[key]?.completedAt || Number(record[key] || 0) >= 1;
          return sum + (completed ? activityPoints[key] : 0);
        }, 0);
        return total + lessonPoints + sentencePoints + completedActivityPoints + (record.completedAt ? 25 : 0);
      }, 0);
      const vocabularyPoints = Object.values(next.words).filter(record => Number(record.typedCorrect || 0) > 0).length * 8;
      const gradedReadingPoints = Object.values(next.readings || {}).filter(record => record?.passedAt).length * 18;
      next.motivation.points = modulePoints + vocabularyPoints + gradedReadingPoints;
    }
    normalizeLoadedRecords(next);
    Object.entries(next.assessmentSessions).forEach(([moduleId, session]) => {
      if (!isPlainRecord(session)
        || session.version !== assessmentVersion
        || session.moduleId !== moduleId
        || !modules.some(module => module.id === moduleId)
        || !isPlainRecord(session.quiz)
        || !Array.isArray(session.quiz.questions)
        || !Array.isArray(session.quiz.responses)
        || (listeningByModule.has(moduleId) && !session.quiz.questions.some(question => question?.kind === "listening"))) delete next.assessmentSessions[moduleId];
    });
    if (!modules.some(module => module.id === next.activeModule)) next.activeModule = modules[0].id;
    writeStateToStorage(next, { preservePrevious: storedVersion < defaultState.version });
    return next;
  } catch {
    if (allowBackup) {
      try {
        const backup = localStorage.getItem(backupStorageKey);
        if (backup) {
          storageNotice = "The latest progress file could not be read. Satzwerk restored the previous local copy.";
          return loadState(backup, false);
        }
      } catch {}
    }
    storageNotice = "Saved progress could not be read. Import a progress copy if you have one.";
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
let vocabVisibleLimit = 200;
let quiz = null;
let bannerTimer = null;
let rewardTimer = null;
let rewardQueue = [];
let rewardShowing = false;
let learnMode = "deck";
let lessonStepIndex = 0;
let lessonSelection = "";
let lessonBuilt = [];
let lessonStepPassed = false;
let readingAttemptRecorded = false;
let lessonOptionOrders = new Map();

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
  return writeStateToStorage(state);
}

let draftSaveTimer = 0;
const pendingDraftKinds = new Set();

function draftText(kind, moduleId) {
  const entry = state.drafts?.[kind]?.[moduleId];
  return typeof entry === "string" ? entry : String(entry?.text || "");
}

function setDraftStatus(kind, message) {
  const selectors = { writing: "#writingDraftStatus", speaking: "#speakingDraftStatus", speakingFollowUp: "#speakingFollowUpDraftStatus" };
  const target = $(selectors[kind]);
  if (target) target.textContent = message;
}

function updateDraft(kind, moduleId, text) {
  state.drafts ||= { writing: {}, speaking: {}, speakingFollowUp: {} };
  state.drafts[kind] ||= {};
  if (String(text).trim()) state.drafts[kind][moduleId] = { text: String(text), savedAt: new Date().toISOString() };
  else delete state.drafts[kind][moduleId];
  pendingDraftKinds.add(kind);
  setDraftStatus(kind, "Saving draft on this device...");
  window.clearTimeout(draftSaveTimer);
  draftSaveTimer = window.setTimeout(() => {
    const saved = saveState();
    pendingDraftKinds.forEach(pendingKind => setDraftStatus(pendingKind, saved ? "Draft saved on this device." : storageNotice));
    pendingDraftKinds.clear();
  }, 350);
}

function flushDrafts() {
  window.clearTimeout(draftSaveTimer);
  draftSaveTimer = 0;
  const saved = saveState();
  pendingDraftKinds.forEach(kind => setDraftStatus(kind, saved ? "Draft saved on this device." : storageNotice));
  pendingDraftKinds.clear();
}

function progressDataStatus(message, isError = false) {
  const status = $("#progressDataStatus");
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("error", isError);
}

function backupProgressAvailable() {
  try { return Boolean(localStorage.getItem(backupStorageKey)); } catch { return false; }
}

function exportProgress() {
  try {
    flushDrafts();
    const payload = JSON.stringify({
      format: progressExportFormat,
      exportedAt: new Date().toISOString(),
      appState: state
    }, null, 2);
    const url = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `satzwerk-progress-${today()}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    progressDataStatus("Progress copy downloaded.");
  } catch {
    progressDataStatus("The progress copy could not be created in this browser.", true);
  }
}

function containsUnsafeImportKey(value, depth = 0) {
  if (!value || typeof value !== "object") return false;
  if (depth > 20) return true;
  if (Object.keys(value).some(key => ["__proto__", "prototype", "constructor"].includes(key))) return true;
  return Object.values(value).some(item => containsUnsafeImportKey(item, depth + 1));
}

function validateImportedProgress(value) {
  const candidate = value?.format === progressExportFormat ? value.appState : value;
  if (!isPlainRecord(candidate) || containsUnsafeImportKey(candidate)) throw new Error("This file is not a valid Satzwerk progress copy.");
  if (!Number.isFinite(Number(candidate.version)) || Number(candidate.version) < 1 || Number(candidate.version) > defaultState.version) throw new Error("This progress version is unsupported.");
  ["words", "modules", "readings", "quiz", "skills", "deckPositions", "drafts", "motivation", "variation", "readingLibrary", "audioStudy"].forEach(key => {
    if (candidate[key] != null && !isPlainRecord(candidate[key])) throw new Error("This file has an invalid progress structure.");
  });
  if (candidate.assessmentSession != null) {
    if (!isPlainRecord(candidate.assessmentSession) || !isPlainRecord(candidate.assessmentSession.quiz)) throw new Error("This file has an invalid saved assessment.");
    if (!Array.isArray(candidate.assessmentSession.quiz.questions) || !Array.isArray(candidate.assessmentSession.quiz.responses)) throw new Error("This file has an invalid saved assessment.");
  }
  if (candidate.assessmentSessions != null) {
    if (!isPlainRecord(candidate.assessmentSessions)) throw new Error("This file has invalid saved assessments.");
    Object.values(candidate.assessmentSessions).forEach(session => {
      if (!isPlainRecord(session) || !isPlainRecord(session.quiz) || !Array.isArray(session.quiz.questions) || !Array.isArray(session.quiz.responses)) throw new Error("This file has an invalid saved assessment.");
    });
  }
  ["words", "modules", "readings"].forEach(key => {
    Object.values(recordOrEmpty(candidate[key])).forEach(record => {
      if (!isPlainRecord(record)) throw new Error("This file has an invalid progress record.");
    });
  });
  if (candidate.motivation) {
    if (candidate.motivation.activityDays != null && !Array.isArray(candidate.motivation.activityDays)) throw new Error("This file has an invalid activity history.");
    if (candidate.motivation.recentWins != null && !Array.isArray(candidate.motivation.recentWins)) throw new Error("This file has an invalid reward history.");
    if (candidate.motivation.days != null && !isPlainRecord(candidate.motivation.days)) throw new Error("This file has an invalid daily progress record.");
  }
  Object.values(recordOrEmpty(candidate.words)).forEach(record => {
    if (record.days != null && !Array.isArray(record.days)) throw new Error("This file has an invalid vocabulary history.");
    if (record.typedDays != null && !Array.isArray(record.typedDays)) throw new Error("This file has an invalid retrieval history.");
  });
  Object.values(recordOrEmpty(candidate.modules)).forEach(record => {
    ["completedPrompts", "attemptedPrompts", "lessonSteps", "activities", "assessment"].forEach(key => {
      if (record[key] != null && !isPlainRecord(record[key])) throw new Error("This file has an invalid module record.");
    });
    if (record.assessment?.attempts != null && !Array.isArray(record.assessment.attempts)) throw new Error("This file has an invalid assessment history.");
  });
  Object.values(recordOrEmpty(candidate.readings)).forEach(record => {
    if (record.attempts != null && !Array.isArray(record.attempts)) throw new Error("This file has an invalid reading history.");
  });
  if (candidate.activeModule != null && typeof candidate.activeModule !== "string") throw new Error("This file has an invalid module record.");
  return candidate;
}

async function importProgressFile(file) {
  if (!file) return;
  if (file.size > maxProgressImportBytes) {
    progressDataStatus("That file is too large to be a Satzwerk progress copy.", true);
    return;
  }
  try {
    const candidate = validateImportedProgress(JSON.parse(await file.text()));
    const accepted = window.confirm("Import this progress copy? Your current local progress will be kept as a recovery copy.");
    if (!accepted) {
      progressDataStatus("Import cancelled.");
      return;
    }
    const current = localStorage.getItem(storageKey);
    const earlierBackup = localStorage.getItem(backupStorageKey);
    const imported = JSON.stringify(candidate);
    try {
      if (current) localStorage.setItem(backupStorageKey, current);
      localStorage.setItem(storageKey, imported);
    } catch (storageError) {
      try {
        if (earlierBackup) localStorage.setItem(backupStorageKey, earlierBackup);
        else localStorage.removeItem(backupStorageKey);
      } catch {}
      throw storageError;
    }
    progressDataStatus("Progress imported. Reloading the course...");
    suppressPagehidePersistence = true;
    window.location.reload();
  } catch (error) {
    progressDataStatus(error?.message || "The progress copy could not be imported.", true);
  }
}

function restorePreviousProgress() {
  try {
    const previous = localStorage.getItem(backupStorageKey);
    if (!previous) {
      progressDataStatus("No previous local copy is available.", true);
      return;
    }
    const accepted = window.confirm("Restore the previous local progress copy? The current copy will remain available if you need to switch back.");
    if (!accepted) {
      progressDataStatus("Restore cancelled.");
      return;
    }
    const current = localStorage.getItem(storageKey);
    try {
      localStorage.setItem(storageKey, previous);
      if (current) localStorage.setItem(backupStorageKey, current);
      else localStorage.removeItem(backupStorageKey);
    } catch (storageError) {
      try {
        if (current) localStorage.setItem(storageKey, current);
        else localStorage.removeItem(storageKey);
        localStorage.setItem(backupStorageKey, previous);
      } catch {}
      throw storageError;
    }
    suppressPagehidePersistence = true;
    window.location.reload();
  } catch {
    progressDataStatus("The previous local copy could not be restored.", true);
  }
}

function discardPreviousProgress() {
  try {
    if (!backupProgressAvailable()) {
      progressDataStatus("No recovery copy is stored on this device.", true);
      return;
    }
    const accepted = window.confirm("Remove the recovery copy from this device? Your current progress and any downloaded progress files will stay in place.");
    if (!accepted) {
      progressDataStatus("Recovery copy kept.");
      return;
    }
    localStorage.removeItem(backupStorageKey);
    const restoreButton = $("#restoreProgress");
    const discardButton = $("#discardProgressBackup");
    if (restoreButton) restoreButton.hidden = true;
    if (discardButton) discardButton.hidden = true;
    progressDataStatus("Recovery copy removed. Current progress is unchanged.");
  } catch {
    progressDataStatus("The recovery copy could not be removed in this browser.", true);
  }
}

const variationChoiceLimit = 4;
const variationOrderLimit = 3;
const variationRecordLimit = 320;

function variationState() {
  state.variation ||= { recentChoices: {}, recentOrders: {}, counters: {} };
  state.variation.recentChoices ||= {};
  state.variation.recentOrders ||= {};
  state.variation.counters ||= {};
  return state.variation;
}

function trimVariationRecord(record, limit = variationRecordLimit) {
  const keys = Object.keys(record);
  if (keys.length <= limit) return;
  keys.slice(0, keys.length - limit).forEach(key => { delete record[key]; });
}

function touchVariationEntry(record, key, value) {
  delete record[key];
  record[key] = value;
  trimVariationRecord(record);
}

function hashVariationSeed(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash ^= character.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededVariationRandom(seed) {
  let value = hashVariationSeed(seed) || 1;
  return () => {
    value += 0x6D2B79F5;
    let result = value;
    result = Math.imul(result ^ result >>> 15, result | 1);
    result ^= result + Math.imul(result ^ result >>> 7, result | 61);
    return ((result ^ result >>> 14) >>> 0) / 4294967296;
  };
}

function beginVariationRun(scope) {
  const variation = variationState();
  const count = Number(variation.counters[scope] || 0) + 1;
  touchVariationEntry(variation.counters, scope, count);
  const entropy = typeof crypto !== "undefined" && crypto.getRandomValues
    ? crypto.getRandomValues(new Uint32Array(1))[0]
    : Math.floor(Math.random() * 4294967296);
  return {
    scope,
    count,
    random: seededVariationRandom(`${scope}:${count}:${Date.now()}:${entropy}`)
  };
}

function shuffledCopy(items, random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function itemVariationId(item) {
  return String(item?.sourceId || item?.id || item?.globalId || item?.de || item);
}

function orderRepeatScore(order, recentOrders) {
  if (!recentOrders.length) return 0;
  const ids = order.map(itemVariationId);
  return recentOrders.reduce((score, previous, historyIndex) => {
    const weight = historyIndex + 1;
    const samePositions = ids.reduce((total, id, index) => total + (previous[index] === id ? 1 : 0), 0);
    const exact = ids.length === previous.length && ids.every((id, index) => id === previous[index]);
    return score + samePositions * weight + (previous[0] === ids[0] ? 3 * weight : 0) + (exact ? ids.length * 5 * weight : 0);
  }, 0);
}

function variedOrder(items, key, random, options = {}) {
  if (items.length < 2) return [...items];
  const variation = variationState();
  const recent = Array.isArray(variation.recentOrders[key]) ? variation.recentOrders[key] : [];
  let result;
  if (options.preserveFirst && recent.length === 0) {
    result = [...items];
  } else {
    const candidates = Array.from({ length: Math.min(18, Math.max(8, items.length * 2)) }, () => shuffledCopy(items, random));
    result = candidates.reduce((best, candidate) => orderRepeatScore(candidate, recent) < orderRepeatScore(best, recent) ? candidate : best, candidates[0]);
    if (recent[recent.length - 1]?.[0] === itemVariationId(result[0])) {
      const alternativeIndex = result.findIndex((item, index) => index > 0 && itemVariationId(item) !== recent[recent.length - 1][0]);
      if (alternativeIndex > 0) [result[0], result[alternativeIndex]] = [result[alternativeIndex], result[0]];
    }
  }
  const ids = result.map(itemVariationId);
  touchVariationEntry(variation.recentOrders, key, [...recent, ids].slice(-variationOrderLimit));
  return result;
}

function candidateSignature(candidate) {
  return hashVariationSeed(JSON.stringify(candidate)).toString(36);
}

function chooseRecentSafe(candidates, key, random, options = {}) {
  const unique = [...new Map(candidates.map(candidate => [candidateSignature(candidate), candidate])).entries()];
  if (!unique.length) return null;
  const variation = variationState();
  const recent = Array.isArray(variation.recentChoices[key]) ? variation.recentChoices[key] : [];
  const unseen = unique.filter(([signature]) => !recent.includes(signature));
  const pool = unseen.length ? unseen : unique.filter(([signature]) => signature !== recent[recent.length - 1]);
  const choices = pool.length ? pool : unique;
  const [signature, candidate] = options.preserveFirst && recent.length === 0
    ? unique[0]
    : choices[Math.floor(random() * choices.length)];
  touchVariationEntry(variation.recentChoices, key, [...recent, signature].slice(-variationChoiceLimit));
  return candidate;
}

function answerStrings(...sources) {
  return [...new Set(sources.flat(Infinity).filter(value => typeof value === "string" && value.trim()).map(value => value.trim()))];
}

function generatedPromptVariants(prompt) {
  const value = String(prompt || "").trim();
  const patterns = [
    [/^Write:\s*(.+)$/iu, target => [`Put this into German: ${target}`, `Give the German sentence for: ${target}`]],
    [/^Say:\s*(.+)$/iu, target => [`Say this in German: ${target}`, `Give the German for: ${target}`]],
    [/^Ask:\s*(.+)$/iu, target => [`Ask this in German: ${target}`, `How would you ask this in German: ${target}`]],
    [/^Translate:\s*(.+)$/iu, target => [`Put this into German: ${target}`, `Write the German version: ${target}`]],
    [/^Use “(.+?)” to recall the model sentence for:\s*(.+)$/iu, (bundle, target) => [`Rebuild the model sentence with “${bundle}”: ${target}`, `Using “${bundle}”, write the taught sentence for: ${target}`]]
  ];
  for (const [pattern, build] of patterns) {
    const match = value.match(pattern);
    if (match) return build(...match.slice(1));
  }
  return [];
}

function generatedContextVariants(context) {
  const value = String(context || "").trim();
  const replacements = [
    ["Use a short sentence from this lesson in a familiar exchange.", "A familiar exchange calls for a short sentence from this lesson."],
    ["You need a complete sentence during an everyday exchange.", "An everyday exchange calls for one complete sentence."],
    ["A familiar situation changes and you respond with a complete sentence.", "Respond to a change in a familiar situation with one complete sentence."],
    ["You explain a practical detail clearly in conversation.", "A conversation calls for a clear practical detail."],
    ["You choose precise wording for a detailed exchange.", "A detailed exchange calls for precise wording."],
    ["Write the taught German form. Include the article when the bundle shows one.", "Recall the complete taught form, including an article when one belongs to the bundle."]
  ];
  return replacements
    .filter(([source]) => value.startsWith(source))
    .map(([source, replacement]) => replacement + value.slice(source.length));
}

const safeNamePools = [
  ["Nina", "Mina", "Lina", "Mia", "Lea", "Lara", "Anna", "Emma", "Julia"],
  ["Daniel", "Jonas", "Paul", "David", "Leon", "Ben", "Lukas", "Max", "Felix"],
  ["Sam", "Alex", "Kim"]
];
const safeSurnamePool = ["Roth", "Kaya", "Yilmaz", "Weber", "Neumann", "Schneider", "Becker", "Hoffmann"];

function replaceName(value, source, replacement) {
  if (typeof value !== "string") return value;
  return value.replace(new RegExp(`\\b${source}\\b`, "gu"), replacement);
}

function nameSurfaceVariants(question, base) {
  const combined = [base.prompt, base.context, ...base.answers].filter(Boolean).join(" ");
  const promptAndContext = [base.prompt, base.context].filter(Boolean).join(" ");
  const answerText = base.answers.join(" ");
  const replacements = [];
  safeNamePools.forEach(pool => {
    const source = pool.find(name => new RegExp(`\\b${name}\\b`, "u").test(promptAndContext)
      && new RegExp(`\\b${name}\\b`, "u").test(answerText));
    if (source) pool.filter(name => name !== source).slice(0, 4).forEach(target => replacements.push([source, target]));
  });
  const titledSurname = safeSurnamePool.find(name => new RegExp(`\\b(?:Frau|Herr|Ms\\.|Mr\\.)\\s+${name}\\b`, "u").test(combined));
  if (titledSurname && new RegExp(`\\b${titledSurname}\\b`, "u").test(answerText)) {
    safeSurnamePool.filter(name => name !== titledSurname).slice(0, 4).forEach(target => replacements.push([titledSurname, target]));
  }
  return replacements.map(([source, target]) => ({
    ...base,
    prompt: replaceName(base.prompt, source, target),
    context: replaceName(base.context, source, target),
    answers: base.answers.map(answer => replaceName(answer, source, target)),
    wordBank: base.wordBank.map(word => replaceName(word, source, target)),
    explanation: replaceName(base.explanation, source, target),
    support: base.support ? Object.fromEntries(Object.entries(base.support).map(([key, value]) => [key, replaceName(value, source, target)])) : base.support
  }));
}

function questionSurfaceCandidates(question) {
  const baseAnswers = answerStrings(question.answers || [], question.acceptable || [], question.acceptableAnswers || [], question.answerVariants || []);
  const base = {
    prompt: question.prompt,
    context: question.context,
    answers: baseAnswers.length ? baseAnswers : [...(question.answers || [])],
    wordBank: [...(question.wordBank || [])],
    requires: [...(question.requires || [])],
    support: question.support,
    explanation: question.explanation
  };
  const candidates = [base];
  const promptVariants = Array.isArray(question.promptVariants) ? question.promptVariants : [];
  const contextVariants = Array.isArray(question.contextVariants) ? question.contextVariants : [];
  const pairedCount = Math.max(promptVariants.length, contextVariants.length);
  for (let index = 0; index < pairedCount; index += 1) {
    const promptEntry = promptVariants[index];
    const contextEntry = contextVariants[index];
    const promptObject = promptEntry && typeof promptEntry === "object" ? promptEntry : {};
    const contextObject = contextEntry && typeof contextEntry === "object" ? contextEntry : {};
    const variant = { ...promptObject, ...contextObject };
    const variantAnswers = answerStrings(variant.answers || [], variant.acceptable || [], variant.acceptableAnswers || []);
    candidates.push({
      prompt: typeof promptEntry === "string" ? promptEntry : variant.prompt || base.prompt,
      context: typeof contextEntry === "string" ? contextEntry : variant.context || base.context,
      answers: variantAnswers.length ? variantAnswers : base.answers,
      wordBank: Array.isArray(variant.wordBank) ? [...variant.wordBank] : base.wordBank,
      requires: Array.isArray(variant.requires) ? [...variant.requires] : base.requires,
      support: variant.support || base.support,
      explanation: variant.explanation || base.explanation
    });
  }
  const objectVariants = [
    ...(Array.isArray(question.surfaceVariants) ? question.surfaceVariants : []),
    ...(Array.isArray(question.variants) ? question.variants.filter(variant => variant && typeof variant === "object") : [])
  ];
  objectVariants.forEach(variant => {
    const variantAnswers = answerStrings(variant.answers || [], variant.acceptable || [], variant.acceptableAnswers || []);
    candidates.push({
      prompt: variant.prompt || base.prompt,
      context: variant.context || base.context,
      answers: variantAnswers.length ? variantAnswers : base.answers,
      wordBank: Array.isArray(variant.wordBank) ? [...variant.wordBank] : base.wordBank,
      requires: Array.isArray(variant.requires) ? [...variant.requires] : base.requires,
      support: variant.support || base.support,
      explanation: variant.explanation || base.explanation
    });
  });
  generatedPromptVariants(base.prompt).forEach(prompt => candidates.push({ ...base, prompt }));
  generatedContextVariants(base.context).forEach(context => candidates.push({ ...base, context }));
  candidates.push(...nameSurfaceVariants(question, base));
  return candidates;
}

function materializeQuestion(question, moduleId, run, options = {}) {
  const identity = question.sourceId || question.id;
  const selected = chooseRecentSafe(questionSurfaceCandidates(question), `surface:${moduleId}:${identity}`, run.random, { preserveFirst: options.preserveSurface }) || {};
  let wordBank = Array.isArray(selected.wordBank) ? [...selected.wordBank] : [...(question.wordBank || [])];
  if (wordBank.length > 1 && !options.assessment) {
    wordBank = variedOrder(wordBank, `word-bank:${moduleId}:${identity}`, run.random, { preserveFirst: false });
  }
  return {
    ...question,
    prompt: selected.prompt || question.prompt,
    context: selected.context || question.context,
    answers: selected.answers?.length ? selected.answers : answerStrings(question.answers || [], question.acceptable || [], question.acceptableAnswers || []),
    wordBank,
    requires: Array.isArray(selected.requires) ? [...selected.requires] : [...(question.requires || [])],
    support: selected.support || question.support,
    explanation: selected.explanation || question.explanation
  };
}

function lessonOptionOrder(module, step, field, values) {
  const runtimeKey = `${module.id}:${step.id}:${field}`;
  if (lessonOptionOrders.has(runtimeKey)) return lessonOptionOrders.get(runtimeKey);
  const run = beginVariationRun(`lesson:${runtimeKey}`);
  const result = variedOrder(values, `lesson-order:${runtimeKey}`, run.random, { preserveFirst: true });
  lessonOptionOrders.set(runtimeKey, result);
  saveState();
  return result;
}

function motivationState() {
  state.motivation ||= { activityDays: [], days: {}, claims: {}, recentWins: [], points: 0 };
  state.motivation.activityDays ||= [];
  state.motivation.days ||= {};
  state.motivation.claims ||= {};
  state.motivation.recentWins ||= [];
  state.motivation.points = Number(state.motivation.points || 0);
  return state.motivation;
}

function motivationDay(key = today()) {
  const motivation = motivationState();
  motivation.days[key] ||= { wins: 0, actions: 0, lastAt: null, points: 0, categories: {} };
  motivation.days[key].points = Number(motivation.days[key].points || 0);
  motivation.days[key].categories ||= {};
  return motivation.days[key];
}

function markPracticeDay(category = "practice") {
  const motivation = motivationState();
  const key = today();
  if (!motivation.activityDays.includes(key)) motivation.activityDays.push(key);
  motivation.activityDays = motivation.activityDays.slice(-180);
  const day = motivationDay(key);
  day.actions = Number(day.actions || 0) + 1;
  day[category] = Number(day[category] || 0) + 1;
  day.lastAt = new Date().toISOString();
  return day;
}

function recordUsefulPractice(category = "practice") {
  const day = markPracticeDay(category);
  const motivation = motivationState();
  day.categories[category] = Number(day.categories[category] || 0) + 1;
  const creditId = `practice-credit:${today()}:${category}`;
  if (!motivation.claims[creditId]) {
    motivation.claims[creditId] = new Date().toISOString();
    motivation.points += 2;
    day.points += 2;
  }
  awardMomentumMilestones();
  renderRewardHub();
  saveState();
  return day;
}

function addLearningWin(title, detail, category = "practice", includeRecent = true) {
  const day = markPracticeDay(category);
  const motivation = motivationState();
  const points = window.SatzwerkRewards?.pointsFor(category) || 6;
  day.wins = Number(day.wins || 0) + 1;
  day.points += points;
  day.categories[category] = Number(day.categories[category] || 0) + 1;
  motivation.points += points;
  if ($("#topWinCount")) $("#topWinCount").textContent = day.wins;
  if ($("#topMomentum")) $("#topMomentum").setAttribute("aria-label", `${day.wins} learning win${day.wins === 1 ? "" : "s"} today`);
  if (includeRecent) {
    motivation.recentWins.unshift({ title, detail, category, points, date: new Date().toISOString() });
    motivation.recentWins = motivation.recentWins.slice(0, 16);
  }
  awardMomentumMilestones();
  renderRewardHub();
  saveState();
  return day.wins;
}

function showReward(title, detail, kind = "stage", label = "LEARNING WIN") {
  rewardQueue.push({ title, detail, kind, label });
  showNextReward();
}

function showNextReward() {
  if (rewardShowing || !rewardQueue.length) return;
  const toast = $("#rewardToast");
  if (!toast) {
    rewardQueue = [];
    return;
  }
  const { title, detail, kind, label } = rewardQueue.shift();
  rewardShowing = true;
  clearTimeout(rewardTimer);
  toast.hidden = false;
  toast.className = `reward-toast ${kind}`;
  $("#rewardSeal").textContent = kind === "level" ? "★" : kind === "personal" ? "+" : kind === "goal" ? "◆" : "✓";
  $("#rewardLabel").textContent = label;
  $("#rewardTitle").textContent = title;
  $("#rewardText").textContent = detail;
  void toast.offsetWidth;
  toast.classList.add("reveal");
  rewardTimer = setTimeout(() => {
    toast.hidden = true;
    toast.classList.remove("reveal");
    rewardShowing = false;
    showNextReward();
  }, 4200);
}

function claimReward(id, title, detail, options = {}) {
  const motivation = motivationState();
  if (motivation.claims[id]) {
    saveState();
    return false;
  }
  motivation.claims[id] = new Date().toISOString();
  const category = options.category || "stage";
  if (options.track !== false) {
    if (options.count === false) markPracticeDay(category);
    else addLearningWin(title, detail, category, false);
  }
  motivation.recentWins.unshift({ id, title, detail, category, date: new Date().toISOString() });
  motivation.recentWins = motivation.recentWins.slice(0, 16);
  saveState();
  renderRewardHub();
  if (options.announce !== false) showReward(title, detail, options.kind || "stage", options.label || "LEARNING WIN");
  return true;
}

function currentPracticeStreak() {
  const practiced = knownPracticeDays();
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  if (!practiced.has(localDayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (practiced.has(localDayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function awardGoal(id, title, detail, bonus) {
  const motivation = motivationState();
  if (motivation.claims[id]) return false;
  motivation.points += bonus;
  motivationDay().points += bonus;
  return claimReward(id, title, `${detail} +${bonus} evidence points.`, {
    track: false,
    count: false,
    category: "goal",
    kind: "goal",
    label: "MOMENTUM GOAL"
  });
}

function awardMomentumMilestones() {
  const day = motivationDay();
  const dayKey = today();
  const categoryCount = Object.values(day.categories || {}).filter(Boolean).length;
  if (day.wins >= 3) awardGoal(`daily-goal:${dayKey}`, "Daily goal complete.", "Three useful learning wins recorded today.", 12);
  if (categoryCount >= 3) awardGoal(`skill-mix:${dayKey}`, "Three skills in one day.", "You used a broader mix of German today.", 15);

  const week = currentWeek();
  const weekDays = week.filter(item => item.active).length;
  if (weekDays >= 3) awardGoal(`weekly-rhythm:${week[0].key}`, "Weekly rhythm complete.", "German practice is recorded on three days this week.", 20);

  const streak = currentPracticeStreak();
  const thresholds = [30, 14, 7, 3];
  const reached = thresholds.find(value => streak >= value);
  if (reached && !motivationState().claims[`streak:${reached}`]) {
    thresholds.filter(value => value < reached).forEach(value => {
      motivationState().claims[`streak:${value}`] ||= new Date().toISOString();
    });
    awardGoal(`streak:${reached}`, `${reached}-day rhythm.`, `You returned to German for ${reached} consecutive days.`, Math.min(60, reached * 3));
  }
}

function renderRewardHub() {
  if (!window.SatzwerkRewards?.render) return;
  const motivation = motivationState();
  const day = motivationDay();
  window.SatzwerkRewards.render({
    points: motivation.points,
    todayWins: day.wins,
    streak: currentPracticeStreak(),
    todayCategories: Object.values(day.categories || {}).filter(Boolean).length,
    weekDays: currentWeek().filter(item => item.active).length,
    recentWins: motivation.recentWins
  });
}

function knownPracticeDays() {
  const days = new Set(motivationState().activityDays);
  Object.values(state.words || {}).forEach(record => (record.days || []).forEach(day => days.add(day)));
  Object.values(state.modules || {}).forEach(record => {
    if (record.completedAt) days.add(record.completedAt);
    if (record.checkpointAt) days.add(record.checkpointAt);
    Object.values(record.activities || {}).forEach(activity => { if (activity.completedAt) days.add(activity.completedAt); });
  });
  Object.values(state.readings || {}).forEach(record => (record.attempts || []).forEach(attempt => {
    if (!attempt.date) return;
    days.add(/^\d{4}-\d{2}-\d{2}$/.test(attempt.date) ? attempt.date : localDayKey(attempt.date));
  }));
  return days;
}

function currentWeek() {
  const current = new Date();
  const monday = new Date(current);
  const offset = (current.getDay() + 6) % 7;
  monday.setDate(current.getDate() - offset);
  monday.setHours(12, 0, 0, 0);
  const names = ["M", "T", "W", "T", "F", "S", "S"];
  const longNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const practiced = knownPracticeDays();
  return names.map((name, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const key = localDayKey(date);
    return { name, longName: longNames[index], key, active: practiced.has(key), current: key === today() };
  });
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
    state.words[id] = { introduced: false, score: 0, production: 0, delayed: 0, misses: 0, days: [], lastSeen: null, lastTest: null, nextReview: null, retryCredit: 0, typedAttempts: 0, typedCorrect: 0, typedDays: [], directionCorrect: { meaning: 0, german: 0 } };
  }
  const record = state.words[id];
  record.typedAttempts ||= 0;
  record.typedCorrect ||= 0;
  record.typedDays ||= [];
  record.directionCorrect ||= { meaning: 0, german: 0 };
  return record;
}

function moduleRecord(id) {
  if (!state.modules[id]) {
    state.modules[id] = { started: false, attempts: 0, firstCorrect: 0, listening: 0, reading: 0, writing: 0, speaking: 0, checkpointScore: null, checkpointAt: null, completedPrompts: {}, attemptedPrompts: {}, lessonSteps: {}, lessonIndex: 0, activities: {}, assessment: { version: assessmentVersion, firstScore: null, latestScore: null, bestScore: null, attempts: [], passedAt: null, archive: [] }, completedAt: null, celebrationSeen: false };
  }
  const record = state.modules[id];
  record.completedPrompts ||= {};
  record.attemptedPrompts ||= {};
  record.lessonSteps ||= {};
  record.lessonIndex ||= 0;
  record.activities ||= {};
  ["listening", "reading", "writing", "speaking"].forEach(activity => {
    if (!record.activities[activity]) {
      const legacyScore = activity === "listening" ? 0 : Number(record[activity] || 0);
      record.activities[activity] = { bestScore: legacyScore, attempts: legacyScore > 0 ? 1 : 0, completedAt: legacyScore >= 1 ? (record.checkpointAt || today()) : null };
      if (activity === "listening") record.activities[activity].version = listeningEvidenceVersion;
    }
  });
  if (record.activities.listening.version !== listeningEvidenceVersion) {
    record.activities.listening = { version: listeningEvidenceVersion, bestScore: 0, attempts: 0, completedAt: null };
    record.listening = 0;
  }
  record.assessment ||= { version: assessmentVersion, firstScore: null, latestScore: null, bestScore: null, attempts: [], passedAt: null, archive: [] };
  if (record.assessment.version !== assessmentVersion) {
    const previous = record.assessment;
    record.assessment = {
      version: assessmentVersion,
      firstScore: null,
      latestScore: null,
      bestScore: null,
      attempts: [],
      passedAt: null,
      archive: [
        ...(previous.archive || []),
        { version: previous.version || 1, bestScore: previous.bestScore ?? previous.latestScore ?? null, attempts: previous.attempts || [] }
      ]
    };
    record.completedAt = null;
    record.celebrationSeen = false;
  }
  record.assessment.attempts ||= [];
  record.assessment.archive ||= [];
  if (record.assessment.firstScore === undefined) record.assessment.firstScore = null;
  if (record.assessment.latestScore === undefined) record.assessment.latestScore = null;
  if (record.assessment.bestScore === undefined) record.assessment.bestScore = null;
  record.assessment.passedAt ||= null;
  record.completedAt ||= null;
  record.celebrationSeen ||= false;
  return record;
}

function recordActivityResult(moduleId, activity, score) {
  const record = moduleRecord(moduleId);
  const activityRecord = record.activities[activity];
  const wasComplete = Boolean(activityRecord.completedAt);
  if (activity === "listening") activityRecord.version = listeningEvidenceVersion;
  activityRecord.attempts += 1;
  activityRecord.bestScore = Math.max(activityRecord.bestScore || 0, score);
  if (score >= 1 && !activityRecord.completedAt) activityRecord.completedAt = today();
  if (activity === "listening" && score >= 1) delete record.listeningGrandfathered;
  record[activity] = Math.max(Number(record[activity] || 0), score);
  record.started = true;
  state.skills[activity].attempts += 1;
  if (["listening", "reading"].includes(activity) && score >= 1) state.skills[activity].correct += 1;
  const firstCompletion = score >= 1 && !wasComplete;
  if (firstCompletion) {
    const module = moduleById(moduleId);
    const labels = { listening: "Listening", reading: "Reading", writing: "Writing", speaking: "Speaking rehearsal" };
    const completed = moduleStageStates(module).filter(stage => stage.complete).length;
    const total = moduleStageStates(module).length;
    const detail = activity === "listening" ? "The audio detail is checked off." : `${completed} of ${total} module stages are complete.`;
    claimReward(`stage:${moduleId}:${activity}`, `${labels[activity]} complete.`, detail, { category: activity });
  } else {
    if (score >= 1) recordUsefulPractice(activity);
    else markPracticeDay(activity);
    saveState();
  }
  return activityRecord;
}

function activityIsComplete(module, activity) {
  const record = moduleRecord(module.id).activities[activity];
  if (activity === "listening") return Boolean(listeningFor(module) && record?.version === listeningEvidenceVersion && record.completedAt);
  return Boolean(record?.completedAt);
}

function listeningRequirementIsComplete(module) {
  return activityIsComplete(module, "listening") || Boolean(moduleRecord(module.id).listeningGrandfathered);
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
  const german = Number(record.directionCorrect?.german || 0);
  const meaning = Number(record.directionCorrect?.meaning || 0);
  const days = record.typedDays?.length || 0;
  if (german >= 3 && meaning >= 2 && days >= 4) return "durable";
  if (german >= 1 && meaning >= 1 && days >= 2) return "retrievable";
  if (record.typedCorrect > 0) return "practicing";
  return "introduced";
}

function tierLabel(tier) {
  return ({ unseen: "Unseen", introduced: "Introduced", practicing: "Practicing", retrievable: "Retrievable", durable: "Durable" })[tier];
}

function evidencePercent(record) {
  if (!record?.introduced) return 0;
  const typed = Number(record.typedCorrect || 0);
  const directions = Number(record.directionCorrect?.meaning > 0) + Number(record.directionCorrect?.german > 0);
  const days = record.typedDays?.length || 0;
  return Math.min(100, Math.round(8 + typed * 10 + directions * 12 + Math.max(0, days - 1) * 12));
}

function moduleWordCount(module, introducedOnly = false) {
  const words = module.words.map(word => globalWordId(module.id, word.id));
  return introducedOnly ? words.filter(isIntroduced).length : words.length;
}

function moduleCoreWords(module) {
  const core = module.words.filter(word => !word.supplemental);
  return core.length ? core : module.words;
}

function verifiedCoreCount(module) {
  return moduleCoreWords(module).filter(word => wordRecord(globalWordId(module.id, word.id)).typedCorrect > 0).length;
}

function moduleStageStates(module) {
  const record = moduleRecord(module.id);
  const coreTotal = moduleCoreWords(module).length;
  const promptTotal = module.questions.length;
  const stages = [];
  if (module.lesson?.steps?.length) stages.push({ id: "lesson", label: "Guided lesson", complete: lessonIsComplete(module), value: Object.keys(record.lessonSteps).length / module.lesson.steps.length });
  stages.push(
    { id: "vocabulary", label: "Core word recall", complete: verifiedCoreCount(module) === coreTotal, value: verifiedCoreCount(module) / Math.max(1, coreTotal) },
    { id: "sentences", label: "Sentence lab", complete: completedPromptCount(module) === promptTotal, value: completedPromptCount(module) / Math.max(1, promptTotal) }
  );
  if (listeningFor(module)) {
    const grandfathered = Boolean(record.listeningGrandfathered) && !activityIsComplete(module, "listening");
    stages.push({ id: "listening", label: grandfathered ? "Listening available for review" : "Listening", complete: listeningRequirementIsComplete(module), value: grandfathered ? 1 : record.activities.listening.bestScore || 0 });
  }
  stages.push(
    { id: "reading", label: "Reading", complete: activityIsComplete(module, "reading"), value: record.activities.reading.bestScore || 0 },
    { id: "writing", label: "Writing", complete: activityIsComplete(module, "writing"), value: record.activities.writing.bestScore || 0 },
    { id: "speaking", label: "Speaking rehearsal", complete: activityIsComplete(module, "speaking"), value: record.activities.speaking.bestScore || 0 },
    { id: "assessment", label: "Module assessment", complete: Boolean(record.assessment.passedAt), value: record.assessment.bestScore || 0 }
  );
  const firstOpen = stages.find(stage => !stage.complete);
  stages.forEach(stage => { stage.current = stage === firstOpen; });
  return stages;
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

function courseworkIsComplete(module) {
  return lessonIsComplete(module) &&
    verifiedCoreCount(module) === moduleCoreWords(module).length &&
    completedPromptCount(module) === module.questions.length &&
    (!listeningFor(module) || listeningRequirementIsComplete(module)) &&
    activityIsComplete(module, "reading") &&
    activityIsComplete(module, "writing") &&
    activityIsComplete(module, "speaking");
}

function moduleIsComplete(module) {
  return courseworkIsComplete(module) && Boolean(moduleRecord(module.id).assessment.passedAt);
}

function moduleSequenceComplete(module) {
  return moduleIsComplete(module);
}

function unmetPrerequisite(module) {
  const existing = state.modules[module.id];
  if (existing?.started || existing?.assessment?.attempts?.length) return null;
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
  if (!state.modules[module.id] && moduleWordCount(module, true) === 0) return 0;
  const stages = moduleStageStates(module);
  return Math.round(stages.reduce((sum, stage) => sum + Math.min(1, stage.complete ? 1 : stage.value || 0), 0) / stages.length * 100);
}

function moduleStatus(module) {
  const record = state.modules[module.id];
  if (!record) return "Fresh";
  if (moduleIsComplete(module)) return "Module complete";
  if (record.assessment?.attempts?.length) return "Assessment attempted";
  if (courseworkIsComplete(module)) return "Ready for assessment";
  if (record.attempts > 0 || record.listening || record.reading || record.writing || record.speaking) return "In progress";
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

function pauseListeningAudio(reset = false) {
  const audio = $("#listeningAudio");
  if (!audio) return;
  audio.pause?.();
  if (reset) {
    try { audio.currentTime = 0; } catch {}
  }
}

function pauseAssessmentAudio(clear = false) {
  const audio = $("#quizAudio");
  if (!audio) return;
  audio.pause?.();
  if (clear) {
    audio.removeAttribute("src");
    audio.load?.();
  }
}

function setActiveModule(id, announce = true) {
  if (quiz?.assessment && !quiz.completed) persistAssessmentSession();
  pauseListeningAudio(true);
  pauseAssessmentAudio(true);
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
  if (quiz?.assessment && !quiz.completed) persistAssessmentSession();
  if (view !== "practice") {
    pauseListeningAudio(true);
    pauseAssessmentAudio(true);
    cancelActiveSpeechRecognition();
  }
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
  if (view === "reading-library") window.SatzwerkExtensions?.renderReadingLibrary();
  if (view === "audio-lab") window.SatzwerkExtensions?.renderAudioLab();
  if (view === "progress") renderProgress();
  if (view === "sources") renderSources();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderHome() {
  const module = activeModule();
  const progress = moduleProgress(module);
  const due = dueWords().length;
  const stages = moduleStageStates(module);
  const completedStages = stages.filter(stage => stage.complete).length;
  const nextStage = stages.find(stage => !stage.complete);
  const motivation = motivationState();
  const todayWins = Number(motivation.days[today()]?.wins || 0);
  const week = currentWeek();
  const weekDays = week.filter(day => day.active).length;
  const introducedRecords = introducedWords().map(word => state.words[word.globalId]).filter(Boolean);
  const retrievable = introducedRecords.filter(record => ["retrievable", "durable"].includes(tierFor(record))).length;
  const durable = introducedRecords.filter(record => tierFor(record) === "durable").length;
  const completedModules = modules.filter(moduleIsComplete).length;
  $("#homePercent").textContent = `${progress}%`;
  $("#homeDialLabel").textContent = `${completedStages} of ${stages.length} stages`;
  $("#homeDial").style.setProperty("--progress", progress);
  $("#homeDial").setAttribute("aria-label", `${module.code}: ${progress}% complete, ${completedStages} of ${stages.length} stages`);
  $("#dueCount").textContent = due;
  $("#dueMessage").textContent = due ? `${due} bundle${due === 1 ? " is" : "s are"} ready for a spaced return.` : "Your next scheduled reviews will appear here.";
  $("#topWinCount").textContent = todayWins;
  $("#topMomentum").setAttribute("aria-label", `${todayWins} learning win${todayWins === 1 ? "" : "s"} today`);
  $("#todayWinCount").textContent = todayWins;
  $("#moduleStageCount").textContent = `${completedStages} / ${stages.length}`;
  $("#homeModulesPassed").textContent = completedModules;
  $("#homeRetrievable").textContent = retrievable;
  $("#homeDurable").textContent = durable;
  $("#homeWeekDays").textContent = weekDays;
  renderRewardHub();
  $("#weekRhythm").innerHTML = week.map(day => `<span class="rhythm-day ${day.active ? "active" : ""} ${day.current ? "today" : ""}" aria-label="${day.longName}, ${day.active ? "practiced" : "no activity recorded"}" title="${day.longName}: ${day.active ? "practiced" : "no activity recorded"}"><i aria-hidden="true"></i>${day.name}</span>`).join("");
  $("#momentumTitle").textContent = todayWins ? `${todayWins} learning win${todayWins === 1 ? "" : "s"} today` : "One useful win starts the session";
  $("#momentumText").textContent = nextStage ? `${completedStages} of ${stages.length} ${module.code} stages are complete. Next: ${nextStage.label}.` : `${module.code} is complete. Choose the next module when you are ready.`;
  $("#continueUnit").textContent = `${module.code} · ${module.title.toUpperCase()}`;
  const introduced = moduleWordCount(module, true);
  const core = moduleCoreWords(module);
  const coreVerified = verifiedCoreCount(module);
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
  } else if (coreVerified < core.length) {
    $("#continueTitle").textContent = coreVerified ? "Continue typed word recall" : "Learn and retrieve the core words";
    $("#continueText").textContent = `${coreVerified} of ${core.length} core bundles have been recalled by typing. The assessment will test them again.`;
    button.innerHTML = 'Open word deck <span>→</span>';
    button.onclick = () => go("learn");
  } else if (resolved < module.questions.length) {
    $("#continueTitle").textContent = resolved ? "Continue sentence practice" : "Put the lesson into sentences";
    $("#continueText").textContent = resolved + " of " + module.questions.length + " sentence patterns are resolved. Successful repairs count here.";
    button.innerHTML = 'Open practice <span>→</span>';
    button.onclick = () => go("practice");
  } else if (listeningFor(module) && !activityIsComplete(module, "listening")) {
    $("#continueTitle").textContent = "Listen to the module dialogue";
    $("#continueText").textContent = "Hear familiar language, identify the requested details, and complete the listening check.";
    button.innerHTML = 'Open listening <span>→</span>';
    button.onclick = () => go("practice");
  } else if (!activityIsComplete(module, "reading")) {
    $("#continueTitle").textContent = "Read the familiar patterns";
    $("#continueText").textContent = "The short passage uses language from the lesson and sentence practice.";
    button.innerHTML = 'Open reading <span>→</span>';
    button.onclick = () => go("practice");
  } else if (!activityIsComplete(module, "writing")) {
    $("#continueTitle").textContent = "Build the guided writing task";
    $("#continueText").textContent = "Every visible requirement is checked separately.";
    button.innerHTML = 'Open writing <span>→</span>';
    button.onclick = () => go("practice");
  } else if (!activityIsComplete(module, "speaking")) {
    $("#continueTitle").textContent = "Complete the speaking rehearsal";
    $("#continueText").textContent = "Say the taught phrases aloud, then verify that each target appears in the transcript.";
    button.innerHTML = 'Open speaking rehearsal <span>→</span>';
    button.onclick = () => go("practice");
  } else if (!record.assessment.passedAt) {
    $("#continueTitle").textContent = record.assessment.attempts.length ? "Retake the module assessment" : "Take the module assessment";
    $("#continueText").textContent = record.assessment.attempts.length ? `Best score: ${Math.round((record.assessment.bestScore || 0) * 100)}%. Reach 80% and the section minimums to complete the module.` : "This closed attempt covers every core word, every sentence target, reading, structured writing, speaking, and listening where available.";
    button.innerHTML = 'Open assessment <span>→</span>';
    button.onclick = () => go("practice");
  } else {
    const index = modules.findIndex(item => item.id === module.id);
    const allComplete = modules.every(moduleIsComplete);
    const laterIncomplete = modules.slice(index + 1).find(item => !moduleIsComplete(item));
    const next = laterIncomplete || modules.find(item => !moduleIsComplete(item));
    $("#continueTitle").textContent = allComplete
      ? "The full A0 to B2 pathway is complete"
      : laterIncomplete
        ? `${module.code} complete. Continue to ${next.code}.`
        : `${module.code} complete. Continue your course at ${next.code}.`;
    $("#continueText").textContent = allComplete
      ? "Every module assessment has been passed. Keep using delayed review and real conversation to strengthen access."
      : `Your best assessment score is ${Math.round((record.assessment.bestScore || 0) * 100)}%. Spaced vocabulary reviews remain available.`;
    button.innerHTML = allComplete ? 'Review course progress <span>→</span>' : `Open ${next.code} <span>→</span>`;
    button.onclick = () => { if (!allComplete) setActiveModule(next.id); go(allComplete ? "progress" : "learn"); };
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
  $("#moduleGrid").innerHTML = group.map(module => `<button class="module-card ${module.id === courseSelectedModule ? "active" : ""} ${moduleIsComplete(module) ? "completed" : ""}" type="button" data-course-module="${module.id}"><span>${module.code}${listeningFor(module) ? " · AUDIO" : ""}${moduleIsComplete(module) ? " · ✓" : ""}</span><strong>${escapeHtml(module.title)}</strong><p>${escapeHtml(module.subtitle)}</p><small>${moduleStatus(module)} · ${moduleProgress(module)}%</small></button>`).join("");
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
  const stages = moduleStageStates(module);
  const listeningNote = listeningFor(module)
    ? moduleRecord(module.id).listeningGrandfathered && !activityIsComplete(module, "listening")
      ? `${listeningFor(module).title} · available for review; your earlier module pass remains valid`
      : `${listeningFor(module).title} · required for this module`
    : "";
  $("#moduleDetail").innerHTML = `<span class="eyebrow">${module.code} · ${moduleStatus(module).toUpperCase()}</span><h2>${escapeHtml(module.title)}</h2><p>${escapeHtml(module.subtitle)}</p><h3>You will learn to</h3><ul>${module.canDo.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>${listeningNote ? `<div class="module-audio-note"><strong>Listening stage</strong><span>${escapeHtml(listeningNote)}</span></div>` : ""}<h3>Completion stages</h3><ul>${stages.map(stage => `<li>${stage.complete ? "✓" : "○"} ${escapeHtml(stage.label)}</li>`).join("")}</ul><h3>Grammar focus</h3><ul>${module.grammar.map(item => `<li>${escapeHtml(item.title)}</li>`).join("")}</ul><div class="module-progress"><div><i style="width:${moduleProgress(module)}%"></i></div><small>${bundleSummary} · ${module.questions.length} typed prompts · ${stages.filter(stage => stage.complete).length} of ${stages.length} stages complete</small></div><div class="module-detail-actions"><button class="primary-button" type="button" data-module-learn="${module.id}">Learn words</button><button class="quiet-button" type="button" data-module-practice="${module.id}">Practice</button></div>`;
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
  const firstCompletion = !record.lessonSteps[step.id];
  const lessonWasComplete = lessonIsComplete(module);
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
  if (firstCompletion) addLearningWin(step.title, `${module.code} guided lesson`, "lesson");
  const lessonNowComplete = lessonIsComplete(module);
  if (!lessonWasComplete && lessonNowComplete) {
    const stages = moduleStageStates(module);
    $("#wordDeckTab").disabled = false;
    $("#wordDeckTab").textContent = "Word deck";
    claimReward(`stage:${module.id}:lesson`, "Guided lesson complete.", `The word deck is unlocked. ${stages.filter(stage => stage.complete).length} of ${stages.length} module stages are complete.`, { category: "lesson", count: false, track: false });
  } else saveState();
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
  return '<article><strong lang="de-DE">' + escapeHtml(example.de) + '</strong><span lang="en-US">' + escapeHtml(example.en) + '</span>' + (example.note ? '<small>' + escapeHtml(example.note) + '</small>' : "") + '</article>';
}

function renderLessonInteraction(step) {
  const target = $("#lessonInteraction");
  target.innerHTML = "";
  target.hidden = step.kind === "teach";
  if (step.kind === "choice") {
    const options = lessonOptionOrder(activeModule(), step, "choices", step.options);
    target.innerHTML = '<p class="lesson-prompt" id="lessonChoicePrompt">' + escapeHtml(step.prompt) + '</p><div class="lesson-choices" role="group" aria-labelledby="lessonChoicePrompt">' + options.map((option, index) => '<button type="button" lang="de-DE" aria-pressed="false" data-lesson-choice="' + index + '">' + escapeHtml(option) + '</button>').join("") + '</div>';
    $$("[data-lesson-choice]").forEach(button => button.addEventListener("click", () => {
      lessonSelection = options[Number(button.dataset.lessonChoice)];
      $$("[data-lesson-choice]").forEach(item => {
        const selected = item === button;
        item.classList.toggle("selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
    }));
  }
  if (step.kind === "arrange") {
    const tokens = step.tokens.map((value, sourceIndex) => ({ id: `${sourceIndex}:${value}`, value, sourceIndex }));
    const orderedTokens = lessonOptionOrder(activeModule(), step, "tokens", tokens);
    target.innerHTML = '<p class="lesson-prompt" id="lessonArrangePrompt">' + escapeHtml(step.prompt) + '</p><div class="lesson-builder" id="lessonBuilder" role="status" aria-live="polite" aria-atomic="true"><span>Choose the words below.</span></div><div class="lesson-tiles" role="group" aria-labelledby="lessonArrangePrompt">' + orderedTokens.map(token => '<button type="button" lang="de-DE" data-lesson-token="' + token.sourceIndex + '">' + escapeHtml(token.value) + '</button>').join("") + '</div><button class="lesson-clear" id="lessonClear" type="button">Clear</button>';
    const tileButtons = $$("[data-lesson-token]");
    const clearButton = $("#lessonClear");
    const updateBuilder = () => {
      const phrase = lessonBuilt.map(item => step.tokens[item]).join(" ");
      $("#lessonBuilder").innerHTML = phrase
        ? '<span class="sr-only">Assembled phrase: </span><span lang="de-DE">' + escapeHtml(phrase) + '</span>'
        : '<span>Choose the words below.</span>';
    };
    tileButtons.forEach((button, buttonIndex) => button.addEventListener("click", () => {
      const index = Number(button.dataset.lessonToken);
      if (lessonBuilt.includes(index)) return;
      lessonBuilt.push(index);
      button.disabled = true;
      updateBuilder();
      const followingButtons = tileButtons.slice(buttonIndex + 1).concat(tileButtons.slice(0, buttonIndex));
      (followingButtons.find(item => !item.disabled) || clearButton).focus();
    }));
    clearButton.addEventListener("click", () => {
      lessonBuilt = [];
      tileButtons.forEach(button => { button.disabled = false; });
      updateBuilder();
      tileButtons[0]?.focus();
    });
  }
  if (step.kind === "type") {
    target.innerHTML = '<label for="lessonInput">' + escapeHtml(step.prompt) + '</label><input id="lessonInput" type="text" lang="de-DE" spellcheck="false" placeholder="' + escapeHtml(step.placeholder || "") + '" autocomplete="off" />';
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
  $("#lessonAction").innerHTML = lessonStepPassed ? (finalStep ? 'Open word deck <span>→</span>' : 'Continue <span>→</span>') : interactive ? "Check" : (finalStep ? 'Finish lesson <span>→</span>' : 'Continue <span>→</span>');
}

function checkLessonStep() {
  const module = activeModule();
  const steps = module.lesson.steps;
  const step = steps[lessonStepIndex];
  const finalStep = lessonStepIndex === steps.length - 1;
  if (lessonStepPassed) {
    if (finalStep) return setLearnMode("deck");
    lessonStepIndex += 1;
    return renderGuidedLesson();
  }
  if (step.kind === "teach") {
    completeLessonStep(module, step);
    if (finalStep) {
      lessonStepPassed = true;
      $("#lessonFeedback").hidden = false;
      $("#lessonFeedback").className = "lesson-feedback success";
      $("#lessonFeedback").innerHTML = "<strong>Guided lesson complete.</strong><p>The word deck is unlocked.</p>";
      $("#lessonAction").innerHTML = 'Open word deck <span>→</span>';
      return;
    }
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
  feedback.innerHTML = finalStep
    ? "<strong>Guided lesson complete.</strong><p>The word deck is unlocked. " + escapeHtml(successDetail) + "</p>"
    : "<strong>That pattern is in place.</strong><p>" + escapeHtml(successDetail) + "</p>";
  $("#lessonAction").innerHTML = finalStep ? 'Open word deck <span>→</span>' : 'Continue <span>→</span>';
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
  const reviewDeck = !targetedWordId && verifiedCoreCount(module) === moduleCoreWords(module).length;
  if (reviewDeck && deck.length > 1) {
    const run = beginVariationRun(`word-deck:${module.id}`);
    deck = variedOrder(deck, `word-deck-order:${module.id}`, run.random);
    saveState();
  }
  const firstUnrecalledCore = deck.findIndex(word => !word.supplemental && wordRecord(word.globalId).typedCorrect === 0);
  deckIndex = targetedWordId || reviewDeck ? 0 : firstUnrecalledCore >= 0 ? firstUnrecalledCore : Math.min(state.deckPositions[module.id] || 0, Math.max(0, deck.length - 1));
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

function splitRecallParts(value) {
  return String(value || "").split(/\s+(?:\/|·)\s+/u).map(part => part.trim()).filter(Boolean);
}

function germanRecallAnswers(word) {
  const source = word.recall?.deAnswers || [word.de, ...splitRecallParts(word.de)];
  return [...new Set(source.flatMap(value => {
    const trimmed = String(value).trim();
    const short = /^(?:der|die|das)\s/iu.test(trimmed) && trimmed.includes(",")
      ? trimmed.split(",")[0].trim()
      : /,\s*(?:hat|ist)\b/iu.test(trimmed)
        ? trimmed.replace(/,\s*(?:hat|ist)\b.*$/iu, "").trim()
        : trimmed;
    return [trimmed, short];
  }).filter(Boolean))];
}

function englishRecallAnswers(word) {
  const source = word.recall?.enAnswers || [word.en, ...splitRecallParts(word.en)];
  return [...new Set(source.flatMap(value => {
    const trimmed = String(value).trim();
    return [trimmed, trimmed.replace(/^to\s+/iu, ""), trimmed.replace(/^(?:a|an|the)\s+/iu, "")];
  }).filter(Boolean))];
}

function normalizedRecall(value, direction) {
  let normalized = stripPunctuation(String(value || "").replace(/\.{2,}/gu, " ").replace(/\s*([/·])\s*/gu, " $1 "));
  if (direction === "meaning") normalized = normalized.replace(/^to\s+/iu, "").replace(/^(?:a|an|the)\s+/iu, "");
  return foldSpelling(normalized);
}

function adjacentTransposition(value, expected) {
  if (value.length !== expected.length) return false;
  const differences = [...value].map((character, index) => character === expected[index] ? -1 : index).filter(index => index >= 0);
  return differences.length === 2 && differences[1] === differences[0] + 1 && value[differences[0]] === expected[differences[1]] && value[differences[1]] === expected[differences[0]];
}

function minorRecallTypo(value, answer, level, direction) {
  if (level !== "A0") return false;
  const typedTokens = normalizedRecall(value, direction).split(/\s+/u);
  const answerTokens = normalizedRecall(answer, direction).split(/\s+/u);
  if (typedTokens.length !== answerTokens.length || typedTokens.some(token => /[/·\d]/u.test(token))) return false;
  const differences = typedTokens.map((token, index) => ({ token, expected: answerTokens[index] })).filter(pair => pair.token !== pair.expected);
  if (differences.length !== 1) return false;
  const { token, expected } = differences[0];
  if (Math.min(token.length, expected.length) < 5) return false;
  if (adjacentTransposition(token, expected)) return true;
  return editDistance(token, expected) === 1 && token[0] === expected[0] && token[token.length - 1] === expected[expected.length - 1];
}

function classifyVocabularyRecall(value, word, direction) {
  const answers = direction === "meaning" ? englishRecallAnswers(word) : germanRecallAnswers(word);
  const typed = normalizedRecall(value, direction);
  const answer = answers.find(candidate => normalizedRecall(candidate, direction) === typed);
  const near = !answer && answers.find(candidate => minorRecallTypo(value, candidate, word.level, direction));
  return { correct: Boolean(answer), near: Boolean(near), kind: near ? "typo" : "", answer: answers[0], accepted: answer || null };
}

function renderBilingualFlashExample(selector, word) {
  $(selector).innerHTML = '<span lang="de-DE">' + escapeHtml(word.example) + '</span><span aria-hidden="true"> | </span><span lang="en-US">' + escapeHtml(word.exampleEn) + '</span>';
}

function renderCard() {
  const word = deck[deckIndex];
  if (!word) return;
  cardRevealed = false;
  const module = moduleById(word.moduleId);
  const direction = cardDirectionFor();
  const record = wordRecord(word.globalId);
  const unseen = !record.introduced;
  $("#deckPosition").textContent = `${deckIndex + 1} / ${deck.length}`;
  $("#cardUnit").textContent = targetedWordId ? "FOCUSED REVIEW" : word.supplemental ? `${module.code} · EXPANSION` : `${module.code} · ${module.title.toUpperCase()}`;
  $("#flashPrompt").textContent = unseen ? "MEET THE BUNDLE" : direction === "german" ? "GERMAN TO ENGLISH" : "ENGLISH TO GERMAN";
  const frontIsGerman = unseen || direction === "german";
  $("#flashFront").textContent = frontIsGerman ? word.de : word.en;
  $("#flashFront").lang = frontIsGerman ? "de-DE" : "en-US";
  $("#flashAnswer").textContent = frontIsGerman ? word.en : word.de;
  $("#flashAnswer").lang = frontIsGerman ? "en-US" : "de-DE";
  $("#flashBundle").textContent = word.bundle;
  $("#flashBundle").lang = "de-DE";
  renderBilingualFlashExample("#flashExample", word);
  $("#flashStudy").hidden = !unseen;
  $("#flashRecallForm").hidden = unseen;
  $("#flashResult").hidden = true;
  $("#flashResult").className = "flash-result";
  $("#flashResultAnswerLabel").textContent = "";
  $("#flashRecallInput").value = "";
  $("#flashRecallInput").disabled = false;
  $("#flashRecallInput").lang = direction === "german" ? "en-US" : "de-DE";
  $("#flashRecallLabel").textContent = direction === "german" ? "Type an English meaning" : "Type the German form, including its article when shown";
  if (!unseen) setTimeout(() => $("#flashRecallInput").focus(), 40);
}

function startFlashRecall() {
  if (!deck[deckIndex]) return;
  const word = deck[deckIndex];
  const record = wordRecord(word.globalId);
  const mRecord = moduleRecord(word.moduleId);
  record.introduced = true;
  record.lastSeen = now();
  addDay(record);
  mRecord.started = true;
  markPracticeDay("vocabulary");
  saveState();
  renderCard();
  renderDeckStrip();
  renderDeckStatus();
}

function submitVocabularyRecall(event) {
  event.preventDefault();
  if (!deck[deckIndex]) return;
  const word = deck[deckIndex];
  const record = wordRecord(word.globalId);
  const value = $("#flashRecallInput").value;
  if (!value.trim() || cardRevealed) return;
  const direction = cardDirectionFor() === "german" ? "meaning" : "german";
  const result = classifyVocabularyRecall(value, word, direction);
  const module = moduleById(word.moduleId);
  const coreWasComplete = verifiedCoreCount(module) === moduleCoreWords(module).length;
  const previousTier = tierFor(record);
  const firstSuccessfulRecall = result.correct && record.typedCorrect === 0;
  const stamp = now();
  const delayed = record.lastTest && stamp - record.lastTest >= 20 * 3600000;
  record.introduced = true;
  record.typedAttempts += 1;
  record.lastSeen = stamp;
  record.lastTest = stamp;
  if (result.correct) {
    record.typedCorrect += 1;
    record.directionCorrect[direction] = Number(record.directionCorrect[direction] || 0) + 1;
    if (!record.typedDays.includes(today())) record.typedDays.push(today());
    if (delayed) record.delayed = Number(record.delayed || 0) + 1;
    const intervals = [1, 3, 7, 14, 30, 60];
    record.nextReview = stamp + intervals[Math.min(intervals.length - 1, record.typedCorrect - 1)] * dayMs;
  } else if (result.near) {
    record.nextReview = stamp + 3 * 60000;
    if (!deck.slice(deckIndex + 1).some(item => item.globalId === word.globalId)) deck.push({ ...word });
  } else {
    record.misses = Number(record.misses || 0) + 1;
    record.nextReview = stamp + 10 * 60000;
    if (!deck.slice(deckIndex + 1).some(item => item.globalId === word.globalId)) deck.push({ ...word });
  }
  moduleRecord(word.moduleId).started = true;
  addDay(record);
  if (firstSuccessfulRecall) addLearningWin(word.de, "First successful typed recall", "vocabulary");
  else if (result.correct) recordUsefulPractice("vocabulary");
  else markPracticeDay("vocabulary");
  cardRevealed = true;
  saveState();
  const coreNowComplete = verifiedCoreCount(module) === moduleCoreWords(module).length;
  const milestone = result.correct && !coreWasComplete && coreNowComplete;
  const currentTier = tierFor(record);
  if (milestone) {
    const stages = moduleStageStates(module);
    claimReward(`stage:${module.id}:vocabulary`, "Core recall complete.", `All ${moduleCoreWords(module).length} core bundles are ready. ${stages.filter(stage => stage.complete).length} of ${stages.length} module stages are complete.`, { category: "vocabulary", count: false, track: false });
  } else if (result.correct && previousTier !== currentTier && ["retrievable", "durable"].includes(currentTier)) {
    claimReward(`tier:${word.globalId}:${currentTier}`, `${word.de} is now ${tierLabel(currentTier)}.`, currentTier === "durable" ? "This bundle has held across four study days." : "This bundle has held in both directions across separate days.", { category: "vocabulary", count: false, track: false, kind: "personal", label: "VOCABULARY GROWTH" });
  }
  $("#flashRecallForm").hidden = true;
  $("#flashResult").hidden = false;
  $("#flashResult").className = "flash-result " + (result.correct ? "correct" : result.near ? "close" : "repair") + (milestone ? " milestone" : "");
  $("#flashResultTitle").textContent = milestone ? "Core recall complete." : result.correct ? "Correct." : result.near ? "Almost there." : "Review this bundle once more.";
  $("#flashResultText").textContent = milestone
    ? `Accepted: “${value}” All ${moduleCoreWords(module).length} core bundles are ready for Sentence Lab.`
    : result.correct
      ? `Accepted: “${value}” This bundle will return in a later review.`
      : result.near
        ? "The meaning is clear. Check one spelling detail. This bundle will return soon."
        : `Your answer: “${value}”`;
  $("#flashResultAnswerLabel").textContent = result.correct || result.near ? "Course form" : "Answer to study";
  $("#flashResultAnswer").textContent = direction === "meaning" ? word.en : word.de;
  $("#flashResultAnswer").lang = direction === "meaning" ? "en-US" : "de-DE";
  $("#flashResultBundle").textContent = word.bundle;
  $("#flashResultBundle").lang = "de-DE";
  renderBilingualFlashExample("#flashResultExample", word);
  renderDeckStrip();
  renderDeckStatus();
}

function skipVocabularyRecall() {
  if (!deck[deckIndex] || cardRevealed) return;
  const word = deck[deckIndex];
  const record = wordRecord(word.globalId);
  record.typedAttempts += 1;
  record.misses = Number(record.misses || 0) + 1;
  record.lastTest = now();
  record.nextReview = now() + 10 * 60000;
  if (!deck.slice(deckIndex + 1).some(item => item.globalId === word.globalId)) deck.push({ ...word });
  cardRevealed = true;
  markPracticeDay("vocabulary");
  saveState();
  $("#flashRecallForm").hidden = true;
  $("#flashResult").hidden = false;
  $("#flashResult").className = "flash-result repair";
  $("#flashResultTitle").textContent = "Study this bundle once more.";
  $("#flashResultText").textContent = "No retrieval credit was added.";
  $("#flashResultAnswerLabel").textContent = "Answer to study";
  const resultIsGerman = cardDirectionFor() !== "german";
  $("#flashResultAnswer").textContent = resultIsGerman ? word.de : word.en;
  $("#flashResultAnswer").lang = resultIsGerman ? "de-DE" : "en-US";
  $("#flashResultBundle").textContent = word.bundle;
  $("#flashResultBundle").lang = "de-DE";
  renderBilingualFlashExample("#flashResultExample", word);
}

function continueVocabularyCard() {
  if (!deck[deckIndex]) return;
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
  $("#deckStrip").innerHTML = deck.map((word, index) => {
    const record = state.words[word.globalId];
    const status = record?.typedCorrect > 0 ? "recalled" : record?.introduced ? "seen" : "";
    return `<button type="button" class="${status} ${index === deckIndex ? "active" : ""}" data-card-index="${index}" aria-label="Open card ${index + 1}">${index + 1}</button>`;
  }).join("");
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
  const count = verifiedCoreCount(module);
  const coreTotal = moduleCoreWords(module).length;
  const expansionCount = module.words.filter(word => word.supplemental).length;
  const expansionText = expansionCount ? ` · ${expansionCount} expansion bundles` : "";
  $("#learnDeckStatus").textContent = targetedWordId ? "Focused typed review" : `${count} of ${coreTotal} core bundles recalled${expansionText}`;
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
  const coreTotal = moduleCoreWords(module).length;
  const coreVerified = verifiedCoreCount(module);
  const sentenceComplete = resolved === module.questions.length;
  const sentenceReady = lessonReady && coreVerified === coreTotal && available.length > 0;
  const listening = listeningFor(module);
  const listeningReady = Boolean(listening && sentenceReady && resolved >= Math.min(2, module.questions.length));
  const readingReady = sentenceReady && resolved >= Math.min(2, module.questions.length);
  const writingReady = sentenceComplete;
  const speakingReady = writingReady && activityIsComplete(module, "writing");
  const checkpointReady = courseworkIsComplete(module);
  const modeButton = mode => $('[data-practice-mode="' + mode + '"]');
  modeButton("checkpoint").querySelector("p").textContent = listening
    ? "Take one closed, scored attempt across vocabulary, sentences, listening, reading, writing, and a speaking transcript."
    : "Take one closed, scored attempt across vocabulary, sentences, reading, writing, and a speaking transcript.";
  modeButton("sentences").disabled = !sentenceReady;
  modeButton("reading").disabled = !readingReady;
  modeButton("writing").disabled = !writingReady;
  modeButton("speaking").disabled = !speakingReady;
  modeButton("checkpoint").disabled = !checkpointReady;
  modeButton("listening").hidden = !listening;
  modeButton("listening").disabled = !listeningReady;
  modeButton("sentences").classList.toggle("completed", sentenceComplete);
  modeButton("listening").classList.toggle("completed", Boolean(listening && activityIsComplete(module, "listening")));
  modeButton("reading").classList.toggle("completed", activityIsComplete(module, "reading"));
  modeButton("writing").classList.toggle("completed", activityIsComplete(module, "writing"));
  modeButton("speaking").classList.toggle("completed", activityIsComplete(module, "speaking"));
  modeButton("checkpoint").classList.toggle("completed", Boolean(record.assessment.passedAt));
  $("#practiceEyebrow").textContent = module.code + " · PRACTICE";
  $("#practiceTitle").textContent = module.title;
  $("#practiceIntro").textContent = "Each stage has a clear checkoff. The scored assessment opens after every coursework stage is complete.";
  $("#availableQuestionCount").textContent = lessonReady ? available.length : 0;
  $("#sentenceReadiness").textContent = sentenceComplete ? "✓ Sentence Lab complete. Practice again whenever you want." : !lessonReady ? "Complete the guided lesson first." : coreVerified < coreTotal ? `Recall ${coreTotal - coreVerified} more core bundle${coreTotal - coreVerified === 1 ? "" : "s"} first.` : available.length + " varied prompts use taught language.";
  if (listening) $("#listeningReadiness").textContent = activityIsComplete(module, "listening")
    ? "✓ Listening complete. Replay the conversation whenever you want."
    : record.listeningGrandfathered
      ? "Available for review. Your earlier module pass remains valid."
    : !lessonReady
      ? "Complete the guided lesson first."
      : coreVerified < coreTotal
        ? `Recall ${coreTotal - coreVerified} more core bundle${coreTotal - coreVerified === 1 ? "" : "s"} first.`
        : listeningReady
          ? "Two-voice audio using familiar language."
          : "Complete two sentence prompts first.";
  $("#readingReadiness").textContent = activityIsComplete(module, "reading") ? "✓ Reading complete. Open it again whenever you want." : readingReady ? "Short text built from taught language." : "Complete two sentence prompts first.";
  $("#writingReadiness").textContent = activityIsComplete(module, "writing") ? "✓ Writing complete. Revise it whenever you want." : writingReady ? "Every visible requirement will be checked." : "Finish the sentence set first.";
  $("#speakingReadiness").textContent = activityIsComplete(module, "speaking") ? "✓ Speaking rehearsal complete. Pronunciation remains unscored." : speakingReady ? "Transcript phrase check. Pronunciation scoring is unavailable." : "Pass the writing checklist first.";
  $("#checkpointReadiness").textContent = record.assessment.passedAt ? `✓ Assessment passed. Best score: ${Math.round((record.assessment.bestScore || 0) * 100)}%.` : checkpointReady ? record.assessment.attempts.length ? `Retake when ready. Best score: ${Math.round((record.assessment.bestScore || 0) * 100)}%.` : "Ready. Pass with 80% overall and each section minimum." : "Complete every coursework checkoff first.";
  $("#practiceLearnFirst").textContent = !lessonReady ? "Open guided lesson" : coreVerified < coreTotal ? "Open typed word recall" : guided ? "Review lesson and words" : "Review word deck";
  const stages = moduleStageStates(module);
  $("#moduleJourneySummary").textContent = record.assessment.attempts.length ? `${stages.filter(stage => stage.complete).length} of ${stages.length} stages complete. Best assessment: ${Math.round((record.assessment.bestScore || 0) * 100)}%.` : `${stages.filter(stage => stage.complete).length} of ${stages.length} stages complete.`;
  $("#moduleJourneySteps").innerHTML = stages.map(stage => `<li class="${stage.complete ? "complete" : stage.current ? "current" : ""}">${escapeHtml(stage.label)}</li>`).join("");
  $("#practiceAssessmentRecord").hidden = record.assessment.attempts.length === 0;
  $("#practiceAssessmentScores").innerHTML = record.assessment.attempts.map((attempt, index) => `<li>Attempt ${index + 1}: <strong>${Math.round(attempt.score * 100)}%</strong> · ${attempt.passed ? "Passed" : "Retake available"}</li>`).join("");
  $$('[data-practice-mode]').filter(button => !button.hidden).forEach((button, index) => {
    const number = button.querySelector?.(":scope > span");
    if (number) number.textContent = String(index + 1).padStart(2, "0");
  });
  $("#practiceStart").hidden = false;
  $("#activityShell").hidden = true;
  $("#quizSummary").hidden = true;
  hideActivities();
  setTimeout(() => $("#practiceTitle").focus(), 40);
}

function hideActivities() {
  pauseListeningAudio(true);
  pauseAssessmentAudio(true);
  cancelActiveSpeechRecognition();
  ["#assessmentIntro", "#quizShell", "#listeningTask", "#readingTask", "#writingTask", "#speakingTask"].forEach(selector => { $(selector).hidden = true; });
}

function openPracticeMode(mode) {
  const module = activeModule();
  const record = moduleRecord(module.id);
  const guided = Boolean(module.lesson?.steps?.length);
  const lessonReady = lessonIsComplete(module);
  const resolved = completedPromptCount(module);
  const available = availableQuestionsFor(module);
  const coreReady = verifiedCoreCount(module) === moduleCoreWords(module).length;
  const readiness = {
    sentences: lessonReady && coreReady && available.length > 0,
    listening: Boolean(listeningFor(module) && lessonReady && coreReady && resolved >= Math.min(2, module.questions.length)),
    reading: lessonReady && coreReady && resolved >= Math.min(2, module.questions.length),
    writing: lessonReady && coreReady && resolved >= module.questions.length,
    speaking: lessonReady && coreReady && resolved >= module.questions.length && activityIsComplete(module, "writing"),
    checkpoint: courseworkIsComplete(module)
  };
  if (mode === "listening" && !listeningFor(module)) {
    announceModule({ code: module.code, title: "Curated audio is coming to this module" });
    return renderPracticeMenu();
  }
  if (!readiness[mode]) {
    announceModule({ code: module.code, title: !lessonReady ? "Complete the guided lesson first" : "Complete the earlier practice stage first" });
    return renderPracticeMenu();
  }
  $("#practiceStart").hidden = true;
  $("#practiceAssessmentRecord").hidden = true;
  $("#activityShell").hidden = false;
  $("#quizSummary").hidden = true;
  hideActivities();
  const names = { sentences: "SENTENCE LAB", checkpoint: "MODULE ASSESSMENT", listening: "LISTENING", reading: "READING", writing: "WRITING", speaking: "SPEAKING" };
  $("#activityName").textContent = names[mode];
  if (mode === "sentences") startQuiz(false);
  if (mode === "checkpoint") renderAssessmentIntro();
  if (mode === "listening") renderListening();
  if (mode === "reading") renderReading();
  if (mode === "writing") renderWriting();
  if (mode === "speaking") renderSpeaking();
}

function renderAssessmentIntro() {
  const module = activeModule();
  const record = moduleRecord(module.id);
  const savedSession = savedAssessmentSession(module);
  const coreCount = moduleCoreWords(module).length;
  const sentenceCount = module.questions.length;
  const includesListening = Boolean(listeningFor(module));
  const responseCount = coreCount + sentenceCount + 3 + Number(includesListening);
  $("#assessmentIntro").hidden = false;
  $("#assessmentIntroTitle").textContent = `${module.code}: ${module.title}`;
  $("#assessmentIntroText").textContent = `${responseCount} responses cover ${coreCount} core vocabulary bundles, ${sentenceCount} sentence targets, ${includesListening ? "one listening task, " : ""}one reading task, one structured writing task, and one speaking transcript.`;
  const levelScoringRule = {
    A0: "A0 scoring accepts taught equivalent phrases and harmless taught greetings. Minor spelling slips can earn partial credit. An article counts when the prompt asks for one.",
    A1: "A1 scoring accepts taught equivalent phrases. Word choice, articles, and sentence structure carry the score. Minor mechanics still receive coaching.",
    A2: "A2 scoring accepts natural taught equivalents. Articles, cases, verb forms, and word order carry the score. Minor mechanics still receive coaching.",
    B1: "B1 scoring expects the requested register, grammar, noun capitalization, and sentence punctuation.",
    B2: "B2 scoring expects precise register, grammar, capitalization, punctuation, and complete fulfillment of the prompt."
  }[module.level];
  $("#assessmentRules").innerHTML = [
    "Answers are saved without correctness feedback during the attempt.",
    `Pass with 80% overall, plus 70% in vocabulary and sentences, ${includesListening ? "50% in listening and reading" : "50% in reading"}, and 60% in structured writing and speaking.`,
    ...(includesListening ? ["The listening transcript stays closed during the assessment. You may replay the audio."] : []),
    levelScoringRule,
    "Your latest 10 completed attempts stay in your score history. A lower retake keeps your best score.",
    "Keyboard spellings such as ae, oe, ue, and ss receive full credit.",
    levelRank[module.level] >= levelRank.B1
      ? "From B1 onward, standard capitalization and sentence punctuation are part of the score."
      : "At A0 through A2, capitalization and sentence punctuation receive coaching without lowering the score."
  ].map(rule => `<li>${escapeHtml(rule)}</li>`).join("");
  const archived = record.assessment.archive?.[record.assessment.archive.length - 1];
  const currentHistory = record.assessment.attempts.length
    ? `${record.assessment.attempts.length} prior attempt${record.assessment.attempts.length === 1 ? "" : "s"}. Best score: ${Math.round((record.assessment.bestScore || 0) * 100)}%.`
    : "";
  const archivedHistory = archived
    ? `This module now includes more material. Your earlier best score of ${Math.round((archived.bestScore || 0) * 100)}% is archived, and this assessment covers the expanded course.`
    : "";
  const savedHistory = savedSession ? `Saved attempt: response ${savedSession.quiz.index + 1} of ${savedSession.quiz.questions.length}. Completed responses have been kept without feedback.` : "";
  $("#assessmentPrior").hidden = !(savedHistory || currentHistory || archivedHistory);
  $("#assessmentPrior").textContent = [savedHistory, currentHistory || archivedHistory].filter(Boolean).join(" ");
  $("#beginAssessment").innerHTML = savedSession ? 'Resume saved assessment <span>→</span>' : 'Begin assessment <span>→</span>';
  const discard = $("#discardAssessment");
  if (discard) discard.hidden = !savedSession;
  setTimeout(() => $("#assessmentIntroTitle").focus(), 40);
}

function beginModuleAssessment() {
  $("#assessmentIntro").hidden = true;
  const saved = savedAssessmentSession(activeModule());
  if (saved) {
    quiz = structuredClone(saved.quiz);
    $("#quizShell").hidden = false;
    renderQuestion();
    return;
  }
  startQuiz(true);
}

function savedAssessmentSession(module) {
  const saved = state.assessmentSessions?.[module.id];
  if (!saved || saved.version !== assessmentVersion || saved.moduleId !== module.id || !saved.quiz?.assessment) return null;
  if (!Array.isArray(saved.quiz.questions) || !Array.isArray(saved.quiz.responses)) return null;
  if (listeningFor(module) && !saved.quiz.questions.some(question => question?.kind === "listening")) return null;
  if (!Number.isInteger(saved.quiz.index) || saved.quiz.index < 0 || saved.quiz.index >= saved.quiz.questions.length) return null;
  return saved;
}

let assessmentDraftSaveTimer = 0;

function persistAssessmentSession() {
  window.clearTimeout(assessmentDraftSaveTimer);
  assessmentDraftSaveTimer = 0;
  if (!quiz?.assessment || quiz.completed) return;
  state.assessmentSessions ||= {};
  state.assessmentSessions[quiz.moduleId] = { version: assessmentVersion, moduleId: quiz.moduleId, quiz: structuredClone(quiz) };
  saveState();
}

function scheduleAssessmentSessionSave(value) {
  if (!quiz?.assessment || quiz.completed) return;
  quiz.currentValue = String(value || "");
  window.clearTimeout(assessmentDraftSaveTimer);
  assessmentDraftSaveTimer = window.setTimeout(persistAssessmentSession, 350);
}

function discardAssessmentSession() {
  const saved = savedAssessmentSession(activeModule());
  if (!saved) return;
  if (!window.confirm("Discard this saved assessment attempt and its responses?")) return;
  window.clearTimeout(assessmentDraftSaveTimer);
  assessmentDraftSaveTimer = 0;
  if (quiz?.assessment && quiz.moduleId === saved.moduleId) quiz = null;
  delete state.assessmentSessions[saved.moduleId];
  saveState();
  renderAssessmentIntro();
}

/* ASSESSMENT_CONTRACTS_START */
function assessmentCleanText(value) {
  return String(value ?? "").trim().replace(/\s+/gu, " ");
}

function assessmentContentPrompt(prompt) {
  let value = assessmentCleanText(prompt);
  const wrappers = [
    /^Respond in German\.\s*/iu,
    /^Write the complete German response\.\s*/iu,
    /^Use the lesson language to answer\.\s*/iu
  ];
  let changed = true;
  while (changed) {
    changed = false;
    wrappers.forEach(pattern => {
      const next = value.replace(pattern, "");
      if (next !== value) {
        value = next;
        changed = true;
      }
    });
  }
  return value;
}

function assessmentDemandsExactSurface(prompt) {
  const value = assessmentContentPrompt(prompt);
  return /\b(?:restore the missing|put these parts|arrange (?:these|the)|rewrite (?:the )?(?:whole|complete)|correct (?:the|this) (?:whole |complete )?sentence|write (?:the )?(?:whole|complete) german sentence|write both parts|write two useful lines|in this order|spell .+ (?:with|using) the taught sentence frame|recall the model sentence|rebuild the model sentence|taught sentence|taught bundle|complete taught form)\b/iu.test(value);
}

function assessmentPromptRequestsGreeting(prompt) {
  return /\b(?:hello|hi|greet|greeting|good morning|good day|good evening|hallo|guten morgen|guten tag|guten abend|open with a greeting)\b/iu.test(assessmentContentPrompt(prompt));
}

function assessmentUppercaseOpening(value) {
  return assessmentCleanText(value).replace(/^([\p{L}])/u, letter => letter.toLocaleUpperCase("de-DE"));
}

function assessmentWithoutGreeting(answer) {
  const match = assessmentCleanText(answer).match(/^(?:Hallo|Hi|Guten Morgen(?:\s+zusammen)?|Guten Tag|Guten Abend|Grüß Gott|Gruess Gott|Servus|Moin)[!,.?:;]?\s+(.+)$/iu);
  return match ? assessmentUppercaseOpening(match[1]) : "";
}

function assessmentWithoutAttentionWord(answer) {
  const match = assessmentCleanText(answer).match(/^Entschuldigung[!,.?:;]?\s+(.+)$/iu);
  return match ? assessmentUppercaseOpening(match[1]) : "";
}

function assessmentWithoutCourtesyWord(answer) {
  const value = assessmentCleanText(answer);
  const leading = value.match(/^Bitte[!,.?:;]?\s+(.+)$/iu);
  if (leading) return assessmentUppercaseOpening(leading[1]);
  const trailing = value.match(/^(.+?)[,!;:]?\s+bitte([.!?])?$/iu);
  return trailing ? `${assessmentCleanText(trailing[1])}${trailing[2] || "."}` : "";
}

function assessmentWithoutOptionalStance(answer) {
  const match = assessmentCleanText(answer).match(/^Leider[!,.?:;]?\s+([\p{L}]+)\s+(ich|du|er|sie|es|wir|ihr)\s+(.+)$/iu);
  if (!match) return "";
  const subject = assessmentUppercaseOpening(match[2]);
  return `${subject} ${match[1].toLocaleLowerCase("de-DE")} ${match[3]}`;
}

function assessmentNameTarget(prompt) {
  const value = assessmentContentPrompt(prompt);
  const match = value.match(/\b(?:introduce yourself as|my name is)\s+([\p{L}][\p{L}'’\-]*)\b/iu);
  return match?.[1] || "";
}

function uniqueAssessmentAnswers(values) {
  const seen = new Set();
  return values.reduce((answers, value) => {
    const clean = assessmentCleanText(value);
    const key = clean.normalize("NFC");
    if (!clean || seen.has(key)) return answers;
    seen.add(key);
    answers.push(clean);
    return answers;
  }, []);
}

function assessmentRegisterForAnswer(question, prompt, answer) {
  const value = assessmentCleanText(answer);
  const promptCue = assessmentContentPrompt(prompt);
  const contextCue = assessmentCleanText(question.context);
  const informalSingular = /\b(?:du|dich|dir|dein(?:e|en|er|es|em)?)\b/iu.test(value);
  const informalPlural = /\bIhr\s+(?:seid|habt|kommt|geht|macht|könnt|koennt|müsst|muesst|dürft|duerft|wollt|sollt|nehmt|gebt|sagt|sprecht|schreibt|lest|seht|wisst|bleibt|stellt|legt|bringt|holt|zeigt|helft)\b/u.test(value)
    || /\b(?:Seid|Habt|Kommt|Geht|Macht|Könnt|Koennt|Müsst|Muesst|Dürft|Duerft|Wollt|Sollt|Nehmt|Gebt|Sagt|Sprecht|Schreibt|Lest|Seht|Wisst|Bleibt|Stellt|Legt|Bringt|Holt|Zeigt|Helft)\s+ihr\b/u.test(value);
  const addresseeCue = /\b(?:you|your|formal|polite)\b/iu.test(promptCue)
    || /\b(?:formal(?:ly)?|use\s+Sie|using\s+Sie)\b/u.test(contextCue);
  const capitalSie = /\bSie\b/u.test(value);
  const formalSie = capitalSie && (!/^Sie\b/u.test(value) || addresseeCue);
  const formalPossessive = !informalPlural
    && !/\b(?:her|their)\b/iu.test(promptCue)
    && /\bIhr(?:e|en|er|es|em)?\b/u.test(value);
  const formal = /\bIhnen\b/u.test(value) || formalSie || formalPossessive;
  const matches = [
    informalSingular ? "du" : "",
    informalPlural ? "ihr" : "",
    formal ? "Sie" : ""
  ].filter(Boolean);
  return matches.length === 1 ? matches[0] : "";
}

function assessmentRegisterRequirement(question, prompt, answers) {
  const value = assessmentContentPrompt(prompt);
  if (/\b(?:formal(?:ly)?|informal(?:ly)?)\b/iu.test(value)
    || /\b(?:du|dich|dir|dein(?:e|en|er|es|em)?)\b/iu.test(value)
    || /\b(?:Sie|Ihnen|Ihr(?:e|en|er|es|em)?)\b/u.test(value)) return "";
  const registers = answers.map(answer => assessmentRegisterForAnswer(question, prompt, answer));
  if (!registers.length || !registers[0] || registers.some(register => register !== registers[0])) return "";
  return registers[0] === "Sie" ? "Use formal Sie." : `Use informal ${registers[0]}.`;
}

function assessmentNameAnswers(prompt) {
  const name = assessmentNameTarget(prompt);
  if (!name) return [];
  const introductions = [
    `Ich bin ${name}.`,
    `Ich heiße ${name}.`,
    `Mein Name ist ${name}.`
  ];
  const greetings = ["Hallo", "Guten Morgen", "Guten Tag", "Guten Abend"];
  return [
    ...introductions,
    ...greetings.flatMap(greeting => introductions.map(introduction =>
      `${greeting}, ${introduction.charAt(0).toLocaleLowerCase("de-DE")}${introduction.slice(1)}`
    ))
  ];
}

function assessmentNaturalNameQuestions(answers) {
  const joined = answers.join(" ");
  if (/\bWie\s+hei(?:ß|ss)t\s+du\b/iu.test(joined)) return ["Wie ist dein Name?"];
  if (/\bWie\s+hei(?:ß|ss)en\s+Sie\b/u.test(joined)) return ["Wie ist Ihr Name?", "Wie lautet Ihr Name?"];
  return [];
}

function taskSpecificNaturalAnswers(question, prompt) {
  const id = question.sourceId || question.id;
  if (id === "bread-price" && /shop employee/iu.test(prompt)) return ["Wie viel kostet das Brot?"];
  if (id === "station" && /how to get there/iu.test(prompt)) {
    return [
      "Wie komme ich bitte zum Bahnhof?",
      "Könnten Sie mir bitte sagen, wie ich zum Bahnhof komme?"
    ];
  }
  if (id === "a1hc-q2" && /ask the question/iu.test(prompt)) return ["Ist das Frühstück im Preis inbegriffen?"];
  if (id === "b29-q1" && /open the meeting/iu.test(prompt)) {
    return ["Willkommen. Zuerst besprechen wir den Zeitplan. Gibt es dazu kurze Fragen?"];
  }
  return [];
}

function assessmentContractFor(question) {
  const prompt = assessmentContentPrompt(question.prompt);
  const authored = uniqueAssessmentAnswers(question.answers || []);
  const generated = [];
  const notes = [];
  const strict = assessmentDemandsExactSurface(prompt);

  if (!strict) {
    generated.push(...assessmentNameAnswers(prompt));
    generated.push(...taskSpecificNaturalAnswers(question, prompt));
    if (/\bask (?:for )?(?:his|her|their|someone(?:'s)?|the other person's) name\b/iu.test(prompt)) {
      generated.push(...assessmentNaturalNameQuestions(authored));
    }
    if (!assessmentPromptRequestsGreeting(prompt)) {
      const concise = authored.map(assessmentWithoutGreeting).filter(Boolean);
      if (concise.length) {
        generated.push(...concise);
        notes.push("A greeting is optional.");
      }
    }
    if (!/\b(?:apologize|apology|excuse|entschuldigung|polite|politely)\b/iu.test(prompt)) {
      const direct = authored.map(assessmentWithoutAttentionWord).filter(Boolean);
      if (direct.length) {
        generated.push(...direct);
        notes.push("You may begin with Entschuldigung.");
      }
    }
    if (!/\b(?:polite|politely|please|bitte)\b/iu.test(prompt)) {
      const direct = authored.map(assessmentWithoutCourtesyWord).filter(Boolean);
      if (direct.length) {
        generated.push(...direct);
        notes.push("Bitte is optional here.");
      }
    }
    if (!/\b(?:unfortunately|regret|sorry|leider)\b/iu.test(prompt)) {
      const neutral = authored.map(assessmentWithoutOptionalStance).filter(Boolean);
      if (neutral.length) {
        generated.push(...neutral);
        notes.push("Leider is optional here.");
      }
    }
  }

  const answers = uniqueAssessmentAnswers([...authored, ...generated]);
  const register = assessmentRegisterRequirement(question, prompt, answers);
  if (register) notes.push(register);
  const requirementNote = [...new Set(notes)].join(" ");
  return {
    answers,
    authoredCount: authored.length,
    generatedCount: Math.max(0, answers.length - authored.length),
    strict,
    requirementNote
  };
}

function prepareAssessmentSentence(question) {
  const contract = assessmentContractFor(question);
  return {
    ...question,
    answers: contract.answers,
    prompt: contract.requirementNote ? `${question.prompt} ${contract.requirementNote}` : question.prompt,
    assessmentContract: contract
  };
}

function preparePracticeSentence(question) {
  const contract = assessmentContractFor(question);
  return {
    ...question,
    answers: contract.answers,
    assessmentContract: contract
  };
}

if (typeof window !== "undefined") {
  window.SatzwerkAssessmentContracts = Object.freeze({
    forQuestion: assessmentContractFor,
    contentPrompt: assessmentContentPrompt,
    prepare: prepareAssessmentSentence,
    preparePractice: preparePracticeSentence
  });
}
/* ASSESSMENT_CONTRACTS_END */

function assessmentNounBundle(word) {
  const source = String(word.de || "").trim();
  const metadata = `${source} ${word.bundle || ""}`;
  if (!source || /[.!?·]/u.test(source) || /\b(?:nur\s+Plural|plural only)\b/iu.test(metadata)) return null;
  const firstForm = source.split(",")[0].split(/\s+\/\s+/u)[0].trim();
  const match = firstForm.match(/^(der|die|das)\s+((?:(?:[\p{Ll}äöüß][\p{L}-]*\s+)*[A-ZÄÖÜ][\p{L}-]*))$/u);
  if (!match) return null;
  return { article: match[1].toLocaleLowerCase("de-DE"), noun: match[2], form: firstForm };
}

function assessmentVocabularyItem(word) {
  const noun = assessmentNounBundle(word);
  if (noun) {
    return {
      id: `vocabulary:${word.id}`,
      kind: "vocabulary",
      type: "ARTICLE AND NOUN",
      context: "Write the noun with its nominative article. The plural form is outside this question.",
      prompt: `Write the German noun for “${word.en}”. Include der, die, or das.`,
      promptVariants: [
        `Recall the complete German noun for “${word.en}”. Include its nominative article.`,
        `Give “${word.en}” in German with der, die, or das.`
      ],
      answers: germanRecallAnswers(word),
      explanation: word.bundle,
      noun
    };
  }
  const openingArticle = String(word.de || "").trim().match(/^(der|die|das)\s/iu)?.[1]?.toLocaleLowerCase("de-DE") || "";
  return {
    id: `vocabulary:${word.id}`,
    kind: "vocabulary",
    type: openingArticle ? "ARTICLE AND EXPRESSION" : "CORE VOCABULARY",
    context: openingArticle ? "Write the complete taught expression, including its opening article." : "Write the taught German form.",
    prompt: openingArticle
      ? `Write the complete German expression for “${word.en}”. Include its opening article.`
      : `Write the taught German form for “${word.en}”.`,
    promptVariants: openingArticle ? [
      `Recall the complete German expression for “${word.en}”. Include der, die, or das.`,
      `Give the taught German expression for “${word.en}”, including its opening article.`
    ] : [
      `Recall the taught German form for “${word.en}”.`,
      `Give the complete taught German form for “${word.en}”.`
    ],
    answers: germanRecallAnswers(word),
    explanation: word.bundle,
    openingArticle
  };
}

function assessmentListeningItem(module) {
  const item = listeningFor(module);
  if (!item) return null;
  return {
    id: `listening:${item.id}`,
    kind: "listening",
    type: "LISTENING",
    context: `${item.context} ${item.goal} Replay the audio as needed.`,
    prompt: item.prompt,
    audioSrc: item.src,
    answers: item.answers,
    requirements: item.requirements || [],
    explanation: `Audio evidence: ${item.evidence}`
  };
}

function assessmentItemsFor(module, run) {
  const vocabularyItems = moduleCoreWords(module).map(assessmentVocabularyItem);
  const vocabulary = variedOrder(
    vocabularyItems.map(question => materializeQuestion(question, module.id, run, { assessment: true })),
    `assessment-order:${module.id}:vocabulary`,
    run.random
  );
  const sentenceItems = module.questions.map(question => ({
    ...question,
    id: `sentence:${question.id}`,
    sourceId: question.id,
    kind: "sentences"
  }));
  const sentences = variedOrder(
    sentenceItems.map(question => prepareAssessmentSentence(materializeQuestion(question, module.id, run, { assessment: true }))),
    `assessment-order:${module.id}:sentences`,
    run.random
  );
  const reading = [{
    id: "reading:module-text",
    kind: "reading",
    type: "READING",
    context: module.input.passage,
    prompt: module.input.readPrompt,
    promptVariants: module.input.readPromptVariants || [],
    contextVariants: module.input.passageVariants || [],
    answers: module.input.readAnswers,
    acceptableAnswers: module.input.acceptableAnswers || [],
    explanation: "Return to the passage and locate the requested detail."
  }];
  const listeningItem = assessmentListeningItem(module);
  const listening = listeningItem ? [listeningItem] : [];
  const writing = [{
    id: "writing:module-task",
    kind: "writing",
    type: "STRUCTURED WRITING",
    context: module.task.guide.join(" • "),
    prompt: module.task.writingPrompt,
    promptVariants: module.task.writingPromptVariants || [],
    longResponse: true,
    answers: [module.task.model],
    explanation: "The score checks the listed requirements and length target."
  }];
  const speaking = [{
    id: "speaking:module-task",
    kind: "speaking",
    type: "SPEAKING TRANSCRIPT",
    context: [...module.task.speakingGuide, `Use at least ${speakingMinimumWords(module)} words.`].join(" • "),
    prompt: `${module.task.speakingPrompt} Type the words you would say.`,
    promptVariants: (module.task.speakingPromptVariants || []).map(prompt => `${prompt} Type the words you would say.`),
    longResponse: true,
    answers: [module.task.speakingModel],
    explanation: "The score checks the target phrases and a useful minimum length. Pronunciation remains unscored."
  }];
  return [
    ...vocabulary,
    ...sentences,
    ...listening,
    ...reading.map(question => materializeQuestion(question, module.id, run, { assessment: true })),
    ...writing.map(question => materializeQuestion(question, module.id, run, { assessment: true })),
    ...speaking.map(question => materializeQuestion(question, module.id, run, { assessment: true }))
  ];
}

function startQuiz(checkpoint) {
  if (quiz?.assessment && !quiz.completed) persistAssessmentSession();
  const module = activeModule();
  const record = moduleRecord(module.id);
  const available = availableQuestionsFor(module);
  const unfinished = module.lesson && !checkpoint ? available.filter(question => !record.completedPrompts[question.id]) : [];
  const source = checkpoint ? module.questions : unfinished.length ? unfinished : available;
  const run = beginVariationRun(`${checkpoint ? "assessment" : "sentences"}:${module.id}`);
  const hasPriorSentencePractice = Object.keys(record.attemptedPrompts || {}).length > 0;
  const questions = checkpoint
    ? assessmentItemsFor(module, run)
    : variedOrder(
      source.map(question => preparePracticeSentence(materializeQuestion(question, module.id, run, { preserveSurface: !hasPriorSentencePractice }))),
      `sentence-order:${module.id}`,
      run.random,
      { preserveFirst: !hasPriorSentencePractice }
    );
  quiz = { moduleId: module.id, checkpoint, assessment: checkpoint, questions, index: 0, firstCorrect: 0, recovered: 0, missed: [], responses: [], originalTotal: questions.length, retry: false, inlineRetry: false, flow: 0, maxFlow: 0, flowRewarded: false, stageCompletedNow: false };
  if (checkpoint) persistAssessmentSession();
  saveState();
  $("#quizShell").hidden = false;
  renderQuestion();
}

function renderQuizFlow() {
  const chip = $("#quizFlow");
  if (!chip || !quiz || quiz.assessment || quiz.retry || quiz.flow < 3) {
    if (chip) chip.hidden = true;
    return;
  }
  chip.hidden = false;
  chip.textContent = `FLOW · ${quiz.flow}`;
  chip.className = "flow-chip" + (quiz.flow >= 5 ? " hot" : "");
}

function renderQuestion() {
  const question = quiz.questions[quiz.index];
  if (!question) return finishQuizSet();
  const hasAssessmentAudio = Boolean(quiz.assessment && question.kind === "listening" && question.audioSrc);
  const quizAudioWrap = $("#quizAudioWrap");
  const quizAudio = $("#quizAudio");
  pauseAssessmentAudio(!hasAssessmentAudio);
  $("#quizMode").textContent = quiz.retry ? "REPAIR PASS" : quiz.assessment ? "MODULE ASSESSMENT" : "SENTENCE LAB";
  $("#quizProgress").textContent = `${quiz.index + 1} / ${quiz.questions.length}`;
  renderQuizFlow();
  $("#quizProgressBar").style.width = `${((quiz.index + 1) / quiz.questions.length) * 100}%`;
  $("#quizType").textContent = question.type;
  $("#quizContext").textContent = question.context;
  $("#quizPrompt").textContent = question.prompt;
  quizAudioWrap.hidden = !hasAssessmentAudio;
  if (hasAssessmentAudio) {
    if (quizAudio.getAttribute("src") !== question.audioSrc) {
      quizAudio.src = question.audioSrc;
      quizAudio.load?.();
    }
    $("#quizAudioNote").textContent = "Replay is allowed. The transcript stays closed until the attempt ends.";
  }
  const support = quiz.assessment ? null : question.support;
  $("#quizSupport").hidden = !support;
  $("#quizSupport").innerHTML = support ? '<span>' + escapeHtml(support.title) + '</span><strong lang="de">' + escapeHtml(support.model) + '</strong><small>' + escapeHtml(support.translation) + '</small><p>' + escapeHtml(support.tip) + '</p>' : "";
  const sourceBank = quiz.assessment ? [] : (question.wordBank || []);
  const bank = sourceBank;
  $("#quizWordBank").hidden = bank.length === 0;
  $("#quizWordBank").innerHTML = bank.map(word => `<span>${escapeHtml(word)}</span>`).join("");
  $("#quizInput").value = quiz.assessment ? String(quiz.currentValue || "") : "";
  $("#quizInput").disabled = false;
  $("#quizLongInput").value = quiz.assessment ? String(quiz.currentValue || "") : "";
  $("#quizLongInput").disabled = false;
  $("#quizShortAnswer").hidden = Boolean(question.longResponse);
  $("#quizLongInput").hidden = !question.longResponse;
  $("#quizLongSubmitButton").hidden = !question.longResponse;
  $("#quizAnswerLabel").textContent = question.longResponse ? "Your response" : "Your answer";
  $("#quizAnswerLabel").setAttribute("for", question.longResponse ? "quizLongInput" : "quizInput");
  $("#quizSubmitButton").textContent = quiz.assessment ? "Save answer" : "Check";
  $("#quizLongSubmitButton").textContent = quiz.assessment ? "Save response" : "Check response";
  $("#quizFeedback").hidden = true;
  $("#quizFeedback").className = "quiz-feedback";
  $("#quizCorrectAnswer").textContent = "";
  $("#quizComparison").innerHTML = "";
  $("#quizTryAgain").hidden = true;
  quiz.inlineRetry = false;
  $("#quizForm").hidden = false;
  setTimeout(() => $(question.longResponse ? "#quizLongInput" : "#quizInput").focus(), 40);
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

function foldKeyboardCase(value) {
  return String(value).normalize("NFC")
    .replace(/Ä/g, "Ae").replace(/Ö/g, "Oe").replace(/Ü/g, "Ue")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ẞ/g, "SS").replace(/ß/g, "ss");
}

function foldSpelling(value) {
  return foldKeyboardCase(value).toLocaleLowerCase("de-DE");
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
  const rawWords = stripPunctuation(raw);
  const mechanicalMatches = answers.map(answer => {
    const expected = cleanSpacing(answer);
    const expectedWords = stripPunctuation(expected);
    const sameWords = foldSpelling(rawWords) === foldSpelling(expectedWords);
    const cost = sameWords ? alignAnswerTokens(raw, expected).reduce((sum, operation) => sum + ({ equal: 0, capitalization: .12, keyboard: .18, punctuation: .4, substitution: 1, missing: 1, extra: 1 })[operation.kind], 0) : Infinity;
    return { answer, expected, expectedWords, sameWords, cost };
  }).filter(candidate => candidate.sameWords).sort((a, b) => a.cost - b.cost);
  if (mechanicalMatches.length) {
    const canonicalKeyboardMatch = mechanicalMatches.find(candidate =>
      /[äöüß]/iu.test(candidate.expectedWords) &&
      candidate.expectedWords.normalize("NFC").toLocaleLowerCase("de-DE") !== rawWords.normalize("NFC").toLocaleLowerCase("de-DE")
    );
    const { answer, expected, expectedWords } = canonicalKeyboardMatch || mechanicalMatches[0];
    const samePunctuation = foldSpelling(raw) === foldSpelling(expected);
    const punctuationDifference = !samePunctuation;
    const caseDifference = foldKeyboardCase(rawWords) !== foldKeyboardCase(expectedWords) && foldSpelling(rawWords) === foldSpelling(expectedWords);
    const spellingFallback = foldSpelling(rawWords) === foldSpelling(expectedWords) && rawWords.normalize("NFC").toLocaleLowerCase("de-DE") !== expectedWords.normalize("NFC").toLocaleLowerCase("de-DE");
    if (strictMechanics && punctuationDifference) return { correct: false, near: true, kind: "punctuation", answer, note: `Match the standard punctuation: ${expected}` };
    if (strictMechanics && caseDifference) return { correct: false, near: true, kind: "capitalization", answer, note: "Capitalization is the remaining issue. Check the sentence opening and every German noun." };
    const notes = [];
    if (punctuationDifference) notes.push("Use the standard punctuation shown below");
    if (caseDifference) notes.push("Check the standard capitalization shown below");
    if (spellingFallback) notes.push("Keyboard spelling accepted. The standard German spelling appears below");
    return {
      correct: true,
      answer,
      note: notes.join(". ") + (notes.length ? "." : ""),
      acceptedKeyboard: spellingFallback,
      needsRevision: level !== "A0" && (punctuationDifference || caseDifference)
    };
  }
  const foldedRaw = foldSpelling(stripTerminal(raw));
  const closest = answers.reduce((best, answer) => {
    const distance = editDistance(foldedRaw, foldSpelling(stripTerminal(answer)));
    return distance < best.distance ? { distance, answer } : best;
  }, { distance: Infinity, answer: answers[0] });
  return { correct: false, near: closest.distance <= Math.max(1, Math.round(foldedRaw.length * .08)), answer: closest.answer, note: "" };
}

const readingStopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "because", "by", "for", "from", "has", "have", "in", "is", "it", "of", "on", "or", "so", "that", "the", "their", "then", "they", "this", "to", "was", "were", "what", "when", "which", "who", "with",
  "aber", "als", "am", "an", "auf", "aus", "bei", "das", "dass", "dem", "den", "der", "des", "die", "ein", "eine", "einem", "einen", "einer", "er", "es", "für", "fuer", "hat", "haben", "im", "in", "ist", "kann", "mit", "nach", "nur", "oder", "sich", "sie", "sind", "so", "soll", "und", "vom", "von", "vor", "war", "waren", "weil", "wenn", "werden", "wird", "zu", "zum", "zur"
]);

function readingTokens(value) {
  return (foldSpelling(value).match(/[\p{L}\p{N}]+/gu) || [])
    .filter(token => !readingStopWords.has(token) && (token.length > 2 || /^\d+$/u.test(token)));
}

function readingTokenMatch(actual, expected) {
  if (actual === expected) return true;
  if (/^\d+$/u.test(actual) || /^\d+$/u.test(expected)) return false;
  const shortest = Math.min(actual.length, expected.length);
  if (shortest >= 4 && (actual.includes(expected) || expected.includes(actual))) return true;
  return shortest >= 5 && actual.slice(0, 5) === expected.slice(0, 5);
}

function readingPromptCount(prompt) {
  const folded = foldSpelling(prompt);
  if (/\b(?:three|drei)\b/u.test(folded)) return 3;
  if (/\b(?:two|zwei)\b/u.test(folded)) return 2;
  return 0;
}

function readingEvidence(value, answer, prompt) {
  const actual = [...new Set(readingTokens(value))];
  const clauses = String(answer).split(/[.;]+/u).map(readingTokens).filter(tokens => tokens.length);
  if (!actual.length || !clauses.length) return { met: false, progress: 0, matched: 0, required: 1 };
  let matched = 0;
  let required = 0;
  let everyClause = true;
  clauses.forEach(expectedTokens => {
    const unique = [...new Set(expectedTokens)];
    const clauseMatches = unique.filter(expected => actual.some(token => readingTokenMatch(token, expected))).length;
    const clauseRequired = unique.length <= 2 ? unique.length : unique.length <= 6 ? 2 : 3;
    matched += Math.min(clauseMatches, clauseRequired);
    required += clauseRequired;
    if (clauseMatches < clauseRequired) everyClause = false;
  });
  const listedFacts = readingPromptCount(prompt);
  if (listedFacts) required = Math.max(required, listedFacts + Math.max(0, clauses.length - 1));
  const progress = Math.min(1, matched / Math.max(1, required));
  return { met: everyClause && matched >= required, progress, matched, required };
}

function readingRequirementResults(value, requirements) {
  return (requirements || []).map(requirement => ({
    ...requirement,
    met: (requirement.patterns || []).some(pattern => [String(value), foldKeyboardCase(value)].some(candidate => new RegExp(pattern, "iu").test(candidate)))
  }));
}

function readingAnswerResult(value, answers, level, prompt = "", requirements = []) {
  const actual = foldSpelling(stripPunctuation(value));
  const direct = answers.find(answer => foldSpelling(stripPunctuation(answer)) === actual);
  if (direct) return { correct: true, score: 1, answer: direct, note: "" };
  const paddedActual = ` ${actual} `;
  const contained = answers.find(answer => {
    const expected = foldSpelling(stripPunctuation(answer));
    return expected && paddedActual.includes(` ${expected} `);
  });
  if (contained) return { correct: true, score: 1, answer: contained, note: "Your sentence contains the requested detail." };
  if (requirements.length) {
    const checks = readingRequirementResults(value, requirements);
    const met = checks.filter(check => check.met).length;
    const score = met / checks.length;
    const missing = checks.filter(check => !check.met).map(check => check.label);
    return {
      correct: score === 1,
      score: score === 1 ? 1 : score >= .5 ? .5 : 0,
      requirementsMet: met,
      requirementsTotal: checks.length,
      answer: answers[0],
      note: score === 1 ? "Your wording gives every requested detail." : `${met} of ${checks.length} requested details are present. Review: ${missing.join(", ")}.`
    };
  }
  const evidence = answers.map(answer => ({ answer, ...readingEvidence(value, answer, prompt) }))
    .sort((a, b) => b.progress - a.progress)[0];
  if (evidence?.met) return { correct: true, score: 1, answer: evidence.answer, note: "Your wording gives the required evidence." };
  const fallback = classifyAnswer(value, answers, level);
  return {
    ...fallback,
    score: evidence?.progress >= .5 ? .5 : 0,
    answer: evidence?.answer || fallback.answer,
    note: fallback.note || ""
  };
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
      else if (operation.kind === "keyboard") marked = '<mark class="answer-token keyboard" title="Accepted keyboard spelling">' + escapeHtml(token) + '</mark>';
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
  if (operation.kind === "keyboard") return "✓ Keyboard spelling accepted. Standard spelling: " + operation.expected + ".";
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
  const issues = [...new Set(operations.map(issueMessage).filter(Boolean))];
  const keyboardOnly = operations.some(operation => operation.kind === "keyboard") && operations.every(operation => ["equal", "keyboard"].includes(operation.kind));
  const standardLabel = keyboardOnly ? "Standard spelling" : "Corrected form";
  const valueEnding = /[.!?]$/u.test(value.trim()) ? "" : ".";
  const answerEnding = /[.!?]$/u.test(answer) ? "" : ".";
  const screenReader = "Your answer: " + value + valueEnding + " " + standardLabel + ": " + answer + answerEnding + (issues.length ? " " + issues.join(" ") : "");
  return '<div class="comparison-sr">' + escapeHtml(screenReader) + '</div>' +
    '<div class="comparison-row"><span>Your answer</span><p lang="de-DE" aria-hidden="true">' + renderAlignedRow(operations, "actual") + '</p></div>' +
    '<div class="comparison-row"><span>' + standardLabel + '</span><p lang="de-DE" aria-hidden="true">' + renderAlignedRow(operations, "expected") + '</p></div>' +
    (issues.length ? '<ul class="comparison-issues">' + issues.map(issue => '<li>' + escapeHtml(issue) + '</li>').join("") + '</ul>' : "");
}

function answerAttemptHtml(value, hasSupport) {
  return '<div class="comparison-row attempt-only"><span>Your answer</span><p lang="de-DE">' + escapeHtml(value) + '</p></div>' +
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
  const promptWasComplete = Boolean(record.completedPrompts[question.id]);
  const sentenceStageWasComplete = completedPromptCount(module) === module.questions.length;
  const stamp = now();
  if (!retry) {
    record.attempts += 1;
    state.quiz.attempts += 1;
    record.attemptedPrompts[question.id] = true;
  }
  if (result.correct) {
    record.completedPrompts[question.id] = true;
    if (!promptWasComplete) addLearningWin(question.prompt, `${module.code} sentence pattern completed`, "sentences");
    else recordUsefulPractice("sentences");
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
    markPracticeDay("sentences");
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
  const sentenceStageNowComplete = completedPromptCount(module) === module.questions.length;
  if (!sentenceStageWasComplete && sentenceStageNowComplete) {
    const stages = moduleStageStates(module);
    quiz.stageCompletedNow = claimReward(`stage:${module.id}:sentences`, "Sentence Lab complete.", `All ${module.questions.length} sentence patterns are in place. ${stages.filter(stage => stage.complete).length} of ${stages.length} module stages are complete.`, { category: "sentences", count: false, track: false, announce: false });
  }
}

function writingAssessmentScore(module, text) {
  const task = module.task;
  const words = countWords(text);
  if (task.checks?.length) {
    const required = evaluateWritingChecks(task, text).filter(check => check.required !== false);
    return scoredChecklistRatio(required);
  }
  const requirements = (task.required || []).map(item => requirementMet(text, item));
  const lengthMet = words >= task.minWords && (!task.maxWords || words <= task.maxWords);
  const points = requirements.filter(Boolean).length + Number(lengthMet);
  return points / Math.max(1, requirements.length + 1);
}

function assessmentVocabularyGrade(question, value, module) {
  const typed = normalizedRecall(value, "german");
  const semanticMatch = question.answers.find(candidate => normalizedRecall(candidate, "german") === typed);
  if (semanticMatch) {
    if (levelRank[module.level] < levelRank.B1) return { score: 1, correct: true, answer: question.answers[0], note: "The taught form is present." };
    const typedCase = foldKeyboardCase(stripPunctuation(value));
    const expectedCase = foldKeyboardCase(stripPunctuation(semanticMatch));
    if (typedCase === expectedCase) return { score: 1, correct: true, answer: question.answers[0], note: "The taught form is present." };
    const score = module.level === "B1" ? .75 : .65;
    return { score, correct: false, answer: question.answers[0], note: "The vocabulary was recognized. Review the standard capitalization shown in the reference answer." };
  }

  if (module.level === "A0") {
    const typo = question.answers.find(candidate => minorRecallTypo(value, candidate, "A0", "german"));
    if (typo) return { score: .8, correct: false, answer: question.answers[0], note: "The intended A0 word was clear. Review the spelling shown in the reference answer." };
  }

  if (question.noun) {
    const typedWords = stripPunctuation(value);
    const typedNounCandidates = [
      typedWords.replace(/^(?:der|die|das)\s+/iu, ""),
      typedWords.replace(/^\S+\s+/u, "")
    ];
    if (typedNounCandidates.some(candidate => foldSpelling(candidate) === foldSpelling(question.noun.noun))) {
      const articleCredit = { A0: .6, A1: .5, A2: .4, B1: .25, B2: .15 }[module.level] || .25;
      return { score: articleCredit, correct: false, answer: question.answers[0], note: "The noun was recognized. This prompt also required its nominative article." };
    }
  }

  if (question.openingArticle) {
    const withoutOpeningArticle = candidate => normalizedRecall(
      stripPunctuation(candidate).replace(/^(?:der|die|das)\s+/iu, ""),
      "german"
    );
    const typedWithoutArticle = withoutOpeningArticle(value);
    if (question.answers.some(candidate => withoutOpeningArticle(candidate) === typedWithoutArticle)) {
      const articleCredit = { A0: .6, A1: .5, A2: .4, B1: .25, B2: .15 }[module.level] || .25;
      return { score: articleCredit, correct: false, answer: question.answers[0], note: "The expression was recognized. This prompt also required its opening article." };
    }
  }

  return { score: 0, correct: false, answer: question.answers[0], note: "Review the complete taught form in the reference answer." };
}

if (typeof window !== "undefined") {
  window.SatzwerkAssessmentScoring = Object.freeze({
    vocabularyItem: assessmentVocabularyItem,
    vocabularyGrade: assessmentVocabularyGrade,
    listeningItem: assessmentListeningItem,
    gradeResponse: gradeAssessmentResponse,
    sectionScores: assessmentSectionScores,
    outcome: assessmentOutcome
  });
}

function gradeAssessmentResponse(question, value, module) {
  if (question.kind === "vocabulary") {
    return assessmentVocabularyGrade(question, value, module);
  }
  if (question.kind === "writing") {
    const score = writingAssessmentScore(module, value);
    return { score, correct: score >= 1, answer: module.task.model };
  }
  if (question.kind === "speaking") {
    const score = speakingAssessmentScore(module, value);
    return { score, correct: score >= 1, answer: module.task.speakingModel };
  }
  if (question.kind === "listening") return readingAnswerResult(value, question.answers, module.level, question.prompt, question.requirements || []);
  if (question.kind === "reading") return readingAnswerResult(value, question.answers, module.level, question.prompt, module.input.readRequired || []);
  const answers = question.kind === "sentences" ? assessmentContractFor(question).answers : question.answers;
  const result = classifyAnswer(value, answers, module.level);
  const nearCredit = { A0: .6, A1: .35, A2: .2, B1: 0, B2: 0 }[module.level] || 0;
  const score = result.correct ? 1 : result.near ? nearCredit : 0;
  return { score, correct: result.correct, answer: result.answer, note: result.note || (result.near ? "The response was close to a taught form." : "Review the requested pattern and the reference answer.") };
}

function submitQuizAnswer(event) {
  event.preventDefault();
  const question = quiz.questions[quiz.index];
  const module = moduleById(quiz.moduleId);
  const value = question.longResponse ? $("#quizLongInput").value : $("#quizInput").value;
  if (!value.trim()) return;
  if (quiz.assessment) {
    const result = gradeAssessmentResponse(question, value, module);
    quiz.responses.push({ id: question.id, kind: question.kind, type: question.type, prompt: question.prompt, value, answer: result.answer, score: result.score, note: result.note || "", explanation: question.explanation || "" });
    const record = moduleRecord(module.id);
    record.started = true;
    quiz.currentValue = "";
    quiz.index += 1;
    if (quiz.index >= quiz.questions.length) finishQuizSet();
    else {
      persistAssessmentSession();
      renderQuestion();
    }
    return;
  }
  const result = classifyAnswer(value, question.answers, module.level);
  const repairAttempt = quiz.retry || quiz.inlineRetry;
  const coached = result.correct && Boolean(result.needsRevision);
  if (!repairAttempt) {
    if (result.correct && !coached) {
      quiz.flow += 1;
      quiz.maxFlow = Math.max(quiz.maxFlow, quiz.flow);
    } else quiz.flow = 0;
  }
  updateQuestionEvidence(question, result, repairAttempt);
  renderQuizFlow();
  if (quiz.flow >= 3 && !quiz.flowRewarded && !quiz.stageCompletedNow) {
    quiz.flowRewarded = true;
    showReward("Three clean sentences in a row.", "The pattern is starting to hold under pressure.", "personal", "IN FLOW");
  }
  const feedbackPanel = $("#quizFeedback");
  const revealCorrection = result.correct || result.near || answerCoverage(value, result.answer) >= .5;
  feedbackPanel.hidden = false;
  feedbackPanel.className = "quiz-feedback " + (result.correct ? coached ? "close" : "" : result.near ? "close" : "wrong");
  $("#quizFeedbackMark").textContent = result.correct ? coached ? "≈" : "✓" : result.near ? "≈" : "!";
  $("#quizFeedbackTitle").textContent = result.correct
    ? coached ? "Meaning complete. Review the marked form." : "Your sentence is complete."
    : revealCorrection ? result.near ? "One form needs repair." : "Work through the marked spots."
    : "Use the taught pattern once more.";
  $("#quizFeedbackText").textContent = revealCorrection ? (result.note || question.explanation) : "Return to the taught pattern and build it once more.";
  $("#quizComparison").innerHTML = revealCorrection ? answerComparisonHtml(value, result.answer) : answerAttemptHtml(value, true);
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
  if (quiz.assessment) return finishAssessment();
  $("#quizShell").hidden = true;
  $("#activityShell").hidden = true;
  $("#quizSummary").hidden = false;
  const stillMissed = quiz.missed.length;
  const total = quiz.originalTotal;
  const moduleTotal = moduleById(quiz.moduleId).questions.length;
  const cleared = stillMissed === 0;
  $("#quizSummary").className = "quiz-summary" + (cleared ? " stage-complete" : "");
  $("#completionBurst").hidden = true;
  $("#summaryCanDo").hidden = true;
  $("#summaryCanDo").innerHTML = "";
  $("#summaryEyebrow").textContent = cleared ? "SENTENCE LAB COMPLETE" : "SET COMPLETE";
  $("#summaryTitle").textContent = cleared && !quiz.retry ? `All ${moduleTotal} sentence patterns are complete.` : quiz.retry ? `${quiz.recovered} question${quiz.recovered === 1 ? "" : "s"} repaired.` : `${quiz.firstCorrect} of ${total} correct on the first pass.`;
  $("#summaryText").textContent = stillMissed ? `${stillMissed} question${stillMissed === 1 ? " is" : "s are"} ready for a focused repair pass.` : "This set is clear for today. A later return will test how well it holds.";
  $("#summaryCorrect").textContent = quiz.firstCorrect;
  $("#summaryCorrectLabel").textContent = "first-pass correct";
  $("#summaryRecovered").textContent = quiz.recovered;
  $("#summaryRecoveredLabel").textContent = "recovered on retry";
  $("#summaryMissed").textContent = stillMissed;
  $("#summaryMissedLabel").textContent = "ready for repair";
  $("#retryMissed").hidden = stillMissed === 0;
  $("#retakeAssessment").hidden = true;
  $("#nextModule").hidden = true;
  $("#assessmentReview").hidden = true;
  $("#assessmentHistory").hidden = true;
  $("#summaryFootnote").textContent = quiz.maxFlow >= 3 ? `Best clean run: ${quiz.maxFlow} sentence${quiz.maxFlow === 1 ? "" : "s"}. A later return will test how well the pattern holds.` : "Same-session repairs help you understand the form. A later return supplies stronger evidence.";
  if (quiz.stageCompletedNow) {
    const module = moduleById(quiz.moduleId);
    const stages = moduleStageStates(module);
    showReward("Sentence Lab complete.", `All ${module.questions.length} sentence patterns are in place. ${stages.filter(stage => stage.complete).length} of ${stages.length} module stages are complete.`);
  }
  $("#summaryTitle").focus();
}

function assessmentSectionScores(responses) {
  const sectionNames = ["vocabulary", "sentences", "listening", "reading", "writing", "speaking"]
    .filter(section => section !== "listening" || responses.some(response => response.kind === "listening"));
  return Object.fromEntries(sectionNames.map(section => {
    const items = responses.filter(response => response.kind === section);
    return [section, items.length ? items.reduce((sum, response) => sum + response.score, 0) / items.length : 0];
  }));
}

function assessmentOutcome(responses) {
  const sections = assessmentSectionScores(responses);
  const weights = { vocabulary: .25, sentences: .30, listening: .12, reading: .15, writing: .20, speaking: .10 };
  const minimums = { vocabulary: .70, sentences: .70, listening: .50, reading: .50, writing: .60, speaking: .60 };
  const entries = Object.entries(sections);
  const availableWeight = entries.reduce((sum, [section]) => sum + weights[section], 0);
  const score = entries.reduce((sum, [section, value]) => sum + value * weights[section], 0) / Math.max(.01, availableWeight);
  const floorResults = entries.map(([section, value]) => value >= minimums[section]);
  return {
    sections,
    score,
    floorResults,
    floorsMet: floorResults.filter(Boolean).length,
    floorTotal: floorResults.length,
    passed: score >= assessmentPassScore && floorResults.every(Boolean)
  };
}

function finishAssessment() {
  window.clearTimeout(assessmentDraftSaveTimer);
  assessmentDraftSaveTimer = 0;
  pauseAssessmentAudio(true);
  quiz.completed = true;
  delete state.assessmentSessions[quiz.moduleId];
  const module = moduleById(quiz.moduleId);
  const record = moduleRecord(module.id);
  const outcome = assessmentOutcome(quiz.responses);
  const { sections, score, passed } = outcome;
  const firstCompletion = passed && !record.assessment.passedAt;
  const hadPriorAttempt = record.assessment.attempts.length > 0;
  const previousBest = record.assessment.bestScore || 0;
  const scorePoints = Math.round(score * 100);
  const previousBestPoints = Math.round(previousBest * 100);
  const personalBest = hadPriorAttempt && scorePoints > previousBestPoints;
  const improvement = Math.max(0, scorePoints - previousBestPoints);
  const correct = quiz.responses.filter(response => response.score >= 1).length;
  const attempt = {
    date: new Date().toISOString(),
    score,
    passed,
    correct,
    total: quiz.responses.length,
    sections
  };
  if (record.assessment.firstScore == null) record.assessment.firstScore = score;
  record.assessment.latestScore = score;
  record.assessment.bestScore = Math.max(record.assessment.bestScore || 0, score);
  record.assessment.attempts.push(attempt);
  record.assessment.attempts = record.assessment.attempts.slice(-10);
  if (passed && !record.assessment.passedAt) record.assessment.passedAt = today();
  if (passed && !record.completedAt) record.completedAt = today();
  record.checkpointScore = score;
  record.checkpointAt = today();
  if (firstCompletion) record.celebrationSeen = true;
  const levelGroup = modules.filter(item => item.level === module.level);
  const levelComplete = firstCompletion && levelGroup.every(moduleIsComplete);
  const courseComplete = firstCompletion && modules.every(moduleIsComplete);
  const levelIndex = levels.findIndex(level => level.id === module.level);
  const nextLevel = levels[levelIndex + 1] || null;
  if (firstCompletion) {
    claimReward(`module:${module.id}`, `${module.code} complete.`, `Passed with ${scorePoints}%.`, { category: "assessment", announce: false });
    if (levelComplete) claimReward(`level:${module.level}`, `${module.level} complete.`, nextLevel ? `${nextLevel.id} is ready.` : "Every course level is complete.", { category: "assessment", count: false, track: false, announce: false, kind: "level" });
  } else if (personalBest) {
    claimReward(`personal-best:${module.id}:${scorePoints}`, `New personal best: ${scorePoints}%.`, `Up ${improvement} point${improvement === 1 ? "" : "s"} from your previous best.`, { category: "assessment", announce: false, kind: "personal" });
  } else {
    if (passed) recordUsefulPractice("assessment");
    else markPracticeDay("assessment");
    saveState();
  }
  $("#quizShell").hidden = true;
  $("#activityShell").hidden = true;
  $("#quizSummary").hidden = false;
  $("#quizSummary").className = "quiz-summary" + (passed ? " module-complete" : "");
  $("#completionBurst").hidden = !firstCompletion;
  $("#summaryEyebrow").textContent = courseComplete ? "COURSE COMPLETE" : levelComplete ? `${module.level} COMPLETE` : firstCompletion ? "MODULE COMPLETE" : personalBest ? "PERSONAL BEST" : passed ? "ASSESSMENT PASSED" : "ASSESSMENT COMPLETE";
  $("#summaryTitle").textContent = courseComplete ? `A0 to B2 complete. ${scorePoints}%.` : levelComplete ? `${module.level} complete. ${module.code} passed with ${scorePoints}%.` : firstCompletion ? `${module.code} complete. ${scorePoints}%.` : personalBest ? `New best score: ${scorePoints}%.` : passed ? `Passed with ${scorePoints}%.` : `Score: ${scorePoints}%.`;
  const floorsMet = outcome.floorsMet;
  const sectionFloorTotal = outcome.floorTotal;
  const next = modules[modules.findIndex(item => item.id === module.id) + 1];
  $("#summaryText").textContent = courseComplete
    ? "Every module assessment is passed. Your complete pathway remains open for review."
    : levelComplete
      ? `Every ${module.level} module is passed. ${nextLevel ? `${nextLevel.id} is ready.` : "The complete pathway is checked off."}`
      : firstCompletion
        ? `You met the minimum in every section. ${next ? `${next.code} is ready.` : "The full course pathway is checked off."}`
        : personalBest
          ? `Up ${improvement} point${improvement === 1 ? "" : "s"} from your previous best. ${passed ? "You met the minimum in every section." : `${floorsMet} of ${sectionFloorTotal} section minimums were reached.`}`
          : passed
            ? "You met the minimum in every section. This module is checked off."
            : `Passing requires 80% overall and each section minimum. ${floorsMet} of ${sectionFloorTotal} section minimums were reached.`;
  $("#summaryCanDo").hidden = !passed;
  $("#summaryCanDo").innerHTML = passed ? module.canDo.slice(0, 4).map(item => `<li>${escapeHtml(item)}</li>`).join("") : "";
  $("#summaryCorrect").textContent = `${Math.round(score * 100)}%`;
  $("#summaryCorrectLabel").textContent = "latest score";
  $("#summaryRecovered").textContent = `${correct}/${quiz.responses.length}`;
  $("#summaryRecoveredLabel").textContent = "fully correct items";
  $("#summaryMissed").textContent = `${Math.round((record.assessment.bestScore || 0) * 100)}%`;
  $("#summaryMissedLabel").textContent = "best score";
  const sectionLabels = { vocabulary: "Vocabulary", sentences: "Sentence production", listening: "Listening", reading: "Reading", writing: "Structured writing", speaking: "Speaking transcript" };
  const missed = quiz.responses.filter(response => response.score < 1);
  $("#assessmentReview").hidden = false;
  $("#assessmentReview").innerHTML = '<h3>Section scores</h3><ol>' + Object.entries(sections).map(([key, value]) => `<li><strong>${sectionLabels[key]}: ${Math.round(value * 100)}%</strong></li>`).join("") + '</ol>' + (missed.length ? '<h3>Review after the attempt</h3><ol>' + missed.map(response => `<li><strong>${escapeHtml(response.prompt)}</strong><small>Your answer: ${escapeHtml(response.value)}</small><small>Reference answer: ${escapeHtml(response.answer)}</small><small>Credit earned: ${Math.round(response.score * 100)}%</small>${response.note ? `<small>${escapeHtml(response.note)}</small>` : ""}${response.kind === "listening" && response.explanation ? `<small>${escapeHtml(response.explanation)}</small>` : ""}</li>`).join("") + '</ol>' : '<p>Every scored item received full credit.</p>');
  $("#assessmentHistory").hidden = false;
  $("#assessmentHistory").innerHTML = '<h3>Assessment history</h3><ol>' + [...record.assessment.attempts].reverse().map((item, index) => `<li>${index === 0 ? "Latest" : new Date(item.date).toLocaleDateString()}: <strong>${Math.round(item.score * 100)}%</strong> · ${item.passed ? "Passed" : "Review and retake"}</li>`).join("") + '</ol>';
  $("#retryMissed").hidden = true;
  $("#retakeAssessment").hidden = false;
  $("#nextModule").hidden = !passed || !next;
  $("#nextModule").dataset.nextModule = next?.id || "";
  $("#summaryFootnote").textContent = "Each retake is a new closed attempt. Your best score and latest 10 attempts stay visible.";
  if (courseComplete) showReward("A0 to B2 complete.", "Every module assessment has been passed.", "level", "COURSE LANDMARK");
  else if (levelComplete) showReward(`${module.level} complete.`, nextLevel ? `${nextLevel.id} is ready.` : "Every course level is complete.", "level", "LEVEL LANDMARK");
  else if (firstCompletion) showReward(`${module.code} complete.`, `Passed with ${scorePoints}%. ${module.canDo[0]}`, "stage", "MODULE COMPLETE");
  else if (personalBest) showReward(`New personal best: ${scorePoints}%.`, `Up ${improvement} point${improvement === 1 ? "" : "s"} from your previous best.`, "personal", "PERSONAL BEST");
  $("#summaryTitle").focus();
}

function retakeModuleAssessment() {
  $("#quizSummary").hidden = true;
  $("#practiceStart").hidden = true;
  $("#practiceAssessmentRecord").hidden = true;
  $("#activityShell").hidden = false;
  hideActivities();
  $("#activityName").textContent = "MODULE ASSESSMENT";
  renderAssessmentIntro();
}

function continueToNextModule() {
  const id = $("#nextModule").dataset.nextModule;
  if (!id) return renderPracticeMenu();
  setActiveModule(id);
  go("learn");
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

function listeningTranscriptMarkup(item) {
  return `<div class="listening-transcript"><strong>Transcript</strong>${item.turns.map(turn => `<p><span>${escapeHtml(turn.speaker)}</span><q lang="de-DE">${escapeHtml(turn.text)}</q></p>`).join("")}</div>`;
}

function revealListeningTranscript() {
  const item = listeningFor(activeModule());
  if (!item) return;
  const support = $("#listeningTextSupport");
  support.innerHTML = `${listeningTranscriptMarkup(item)}<p class="listening-credit">Text support is open. Answer the same comprehension question above.</p>`;
  support.hidden = false;
  $("#listeningTranscriptHelp").hidden = true;
  $("#listeningNote").textContent = "Use the transcript as an accessibility aid, then answer the same comprehension question.";
  support.focus();
}

function renderListening() {
  const module = activeModule();
  const item = listeningFor(module);
  if (!item) return renderPracticeMenu();
  const audio = $("#listeningAudio");
  pauseListeningAudio(true);
  $("#listeningTask").hidden = false;
  $("#listeningTitle").textContent = `${module.code}: ${item.title}`;
  $("#listeningContext").textContent = `${item.context} ${item.goal}`;
  const speakerNames = [...new Set(item.turns.map(turn => turn.speaker))];
  const speakerCount = speakerNames.length;
  $("#listeningCast").innerHTML = `<strong>${speakerCount} speaker${speakerCount === 1 ? "" : "s"}</strong><span>${speakerNames.map(escapeHtml).join(" · ")}</span>`;
  audio.src = item.src;
  audio.load?.();
  const speed = Number($("#listeningSpeed").value || 1);
  audio.playbackRate = speed;
  $("#listeningPrompt").textContent = item.prompt;
  $("#listeningInput").value = "";
  $("#listeningInput").disabled = false;
  $("#listeningCheck").disabled = false;
  $("#listeningFeedback").hidden = true;
  $("#listeningActions").hidden = true;
  $("#listeningRetry").hidden = true;
  $("#listeningContinue").hidden = true;
  $("#listeningTranscriptHelp").hidden = false;
  $("#listeningTextSupport").hidden = true;
  $("#listeningTextSupport").innerHTML = "";
  $("#listeningNote").textContent = "Replay the exchange whenever you need it. Text support is available below.";
  setTimeout(() => $("#listeningTitle").focus(), 40);
}

function submitListening(event) {
  event.preventDefault();
  const module = activeModule();
  const item = listeningFor(module);
  if (!item) return;
  const value = $("#listeningInput").value;
  if (!value.trim() || $("#listeningInput").disabled) return;
  const result = readingAnswerResult(value, item.answers, module.level, item.prompt, item.requirements || []);
  const score = result.correct ? 1 : result.score >= .5 ? .5 : 0;
  recordActivityResult(module.id, "listening", score);
  $("#listeningInput").disabled = true;
  $("#listeningCheck").disabled = true;
  const feedback = $("#listeningFeedback");
  feedback.hidden = false;
  feedback.className = `task-feedback ${result.correct ? "success" : "repair"}`;
  const message = result.correct
    ? "Your answer gives the requested detail."
    : score >= .5
      ? "You caught part of it. Replay the conversation and add the missing information."
      : "Replay the conversation and listen for the requested detail.";
  const requirementProgress = result.requirementsTotal ? result.requirementsMet / result.requirementsTotal : null;
  const revealSupport = result.correct || (requirementProgress == null ? score >= .5 : requirementProgress >= .67);
  const learnerAnswer = `<div class="listening-answer-review ${revealSupport ? "" : "single"}"><p><strong>Your answer</strong><span>${escapeHtml(value)}</span></p>${revealSupport ? `<p><strong>Accepted answer</strong><span>${escapeHtml(result.answer)}</span></p><p><strong>Evidence</strong><span lang="de-DE">${escapeHtml(item.evidence)}</span></p>` : ""}</div>`;
  const contextNote = item.culture ? `<div class="listening-culture"><strong>In context</strong><p>${escapeHtml(item.culture)}</p>${item.source ? `<a href="${escapeHtml(item.source.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.source.title)} source ↗</a>` : ""}</div>` : "";
  const strategyTip = item.tip ? `<div class="listening-strategy"><strong>Strategy</strong><p>${escapeHtml(item.tip)}</p></div>` : "";
  const support = revealSupport ? `${listeningTranscriptMarkup(item)}${contextNote}${strategyTip}` : "";
  feedback.innerHTML = `<div class="listening-status" role="status" aria-live="polite" aria-atomic="true"><h3>${result.correct ? "Correct." : score >= .5 ? "You caught part of it." : "Listen once more."}</h3><p>${escapeHtml(revealSupport ? (result.note || message) : message)}</p></div>${learnerAnswer}<div aria-live="off">${support}<p class="listening-credit">Female voice: Chatterbox Multilingual. Male voice: Coqui Thorsten VITS.</p></div>`;
  $("#listeningActions").hidden = false;
  $("#listeningRetry").hidden = result.correct;
  $("#listeningContinue").hidden = !result.correct;
}

function retryListening() {
  $("#listeningFeedback").hidden = true;
  $("#listeningActions").hidden = true;
  $("#listeningInput").disabled = false;
  $("#listeningCheck").disabled = false;
  $("#listeningInput").focus();
  const audio = $("#listeningAudio");
  audio.currentTime = 0;
  audio.play?.()?.catch?.(() => {});
}

function renderReading() {
  const module = activeModule();
  readingAttemptRecorded = false;
  $("#readingTask").hidden = false;
  $("#readingTitle").textContent = `${module.code}: Read for a clear purpose`;
  $("#readingPassage").textContent = module.input.passage;
  $("#readingPrompt").textContent = module.input.readPrompt;
  $("#readingInput").value = "";
  $("#readingInput").disabled = false;
  $("#readingCheck").disabled = false;
  $("#readingFeedback").hidden = true;
  $("#readingActions").hidden = true;
  $("#readingRetry").hidden = true;
  $("#readingContinue").hidden = true;
  setTimeout(() => $("#readingTitle").focus(), 40);
}

function submitReading(event) {
  event.preventDefault();
  const module = activeModule();
  const value = $("#readingInput").value;
  if (!value.trim() || $("#readingInput").disabled) return;
  const result = readingAnswerResult(value, module.input.readAnswers, module.level, module.input.readPrompt, module.input.readRequired || []);
  recordActivityResult(module.id, "reading", result.correct ? 1 : Math.max(.4, result.score || 0));
  readingAttemptRecorded = true;
  const feedback = $("#readingFeedback");
  feedback.hidden = false;
  feedback.className = `task-feedback ${result.correct ? "success" : "repair"}`;
  feedback.innerHTML = `<h3>${result.correct ? "Detail located." : "Return to the relevant sentence."}</h3><p>${result.correct ? "Reading credit recorded." : escapeHtml(result.note || diagnoseDifference(value, result.answer))}</p><p><strong>Answer:</strong> ${escapeHtml(result.answer)}</p>`;
  $("#readingInput").disabled = true;
  $("#readingCheck").disabled = true;
  $("#readingActions").hidden = false;
  $("#readingRetry").hidden = result.correct;
  $("#readingContinue").hidden = !result.correct;
}

function retryReading() {
  $("#readingFeedback").hidden = true;
  $("#readingActions").hidden = true;
  $("#readingInput").disabled = false;
  $("#readingCheck").disabled = false;
  $("#readingInput").focus();
  $("#readingInput").select();
}

function countWords(value) {
  return String(value).trim() ? String(value).trim().split(/\s+/).length : 0;
}

function requirementMet(text, requirement) {
  const options = Array.isArray(requirement) ? requirement : [requirement];
  const folded = foldSpelling(text);
  return options.some(option => {
    const target = foldSpelling(option).trim();
    const escaped = target.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
    const hasSpaces = /\s/u.test(target);
    const body = hasSpaces ? escaped.replace(/\s+/gu, "\\s+") : target.length <= 3 ? escaped : escaped + "[\\p{L}\\p{M}-]*";
    return new RegExp(`(?:^|[^\\p{L}\\p{N}])${body}(?=$|[^\\p{L}\\p{N}])`, "u").test(folded);
  });
}

function speakingMinimumWords(module) {
  const floor = { A0: 6, A1: 12, A2: 18, B1: 25, B2: 28 }[module.level] || 12;
  const modelWords = countWords(module.task.speakingModel);
  return Math.min(modelWords, Math.max(floor, Math.ceil(modelWords * .5)));
}

function speakingChecks(module, text) {
  const task = module.task;
  if (task.speakingChecks?.length) {
    const words = countWords(text);
    return task.speakingChecks.map(check => ({
      ...check,
      item: check.label,
      ...evaluateWritingCheck(check, text, words)
    }));
  }
  const words = countWords(text);
  const targets = task.speakingRequired.map(item => ({
    item: Array.isArray(item) ? item.join(" or ") : item,
    met: requirementMet(text, item)
  }));
  const minimum = speakingMinimumWords(module);
  return [...targets, { item: `${minimum}+ words`, met: words >= minimum, detail: `${words} words` }];
}

function speakingAssessmentScore(module, text) {
  const checks = speakingChecks(module, text);
  return scoredChecklistRatio(checks);
}

function scoredChecklistRatio(checks) {
  const required = checks.filter(check => check.required !== false);
  const raw = required.filter(check => check.met).length / Math.max(1, required.length);
  const essentialMiss = required.some(check => check.essential && !check.met);
  return essentialMiss ? Math.min(raw, .49) : raw;
}

function writingLines(text) {
  return String(text).split(/\r?\n/).map(line => line.trim()).filter(Boolean);
}

function writingLineIsStructural(line, index, lines) {
  const folded = foldSpelling(line).toLocaleLowerCase("de-DE").replace(/\s+/gu, " ").trim();
  const isSubject = /^betreff\s*:/u.test(folded);
  const isSalutation = /^(?:sehr geehrte(?:r|n)?\b|guten (?:tag|morgen|abend)\b|hallo\b|liebe(?:r|n)?\b)[^.!?]*,$/u.test(folded);
  const isClosing = value => /^(?:mit freundlichen gruessen|freundliche gruesse|viele gruesse|liebe gruesse|beste gruesse|herzliche gruesse|vielen dank und freundliche gruesse),?$/u.test(value);
  if (isSubject || isSalutation || isClosing(folded)) return true;
  const closingIndex = lines.slice(0, index).findLastIndex(prior => isClosing(foldSpelling(prior).toLocaleLowerCase("de-DE").replace(/\s+/gu, " ").trim()));
  const followsClosing = closingIndex >= 0 && index - closingIndex <= 2;
  const isShortSignatureLine = /^[\p{L}\p{M}'-]+(?:\s+[\p{L}\p{M}'-]+){0,3}$/u.test(line);
  return followsClosing && isShortSignatureLine;
}

function evaluateWritingCheck(check, text, words) {
  const lines = writingLines(text);
  if (check.type === "lineCount") {
    const actual = lines.length;
    const met = check.value != null ? actual === check.value : actual >= (check.min || 0) && actual <= (check.max || Infinity);
    return { met, detail: actual + " line" + (actual === 1 ? "" : "s") };
  }
  if (check.type === "wordsPerLine") {
    const counts = lines.map(countWords);
    const met = counts.length > 0 && counts.every(value => value === check.value);
    return { met, detail: counts.length ? counts.join(", ") + " words by line" : "No lines yet" };
  }
  if (check.type === "sentenceCount") {
    const punctuated = (String(text).match(/[.!?]+(?=\s|$)/gu) || []).length;
    const actual = Math.max(punctuated, lines.length);
    const met = check.value != null ? actual === check.value : actual >= (check.min || 0) && actual <= (check.max || Infinity);
    return { met, detail: actual + " sentence unit" + (actual === 1 ? "" : "s") };
  }
  if (check.type === "questionCount") {
    const actual = (String(text).match(/\?/gu) || []).length;
    const met = actual >= (check.min || check.value || 1);
    return { met, detail: actual + " question" + (actual === 1 ? "" : "s") };
  }
  if (check.type === "distinctRegexCount") {
    const flags = (check.flags || "iu").includes("g") ? check.flags || "giu" : (check.flags || "iu") + "g";
    const actual = Math.max(...[String(text), foldKeyboardCase(text)].map(candidate => {
      const matches = [...candidate.matchAll(new RegExp(check.pattern, flags))].map(match => foldSpelling(match[0]));
      return new Set(matches).size;
    }));
    return { met: actual >= check.min, detail: actual + " distinct marker" + (actual === 1 ? "" : "s") };
  }
  if (check.type === "regexCount") {
    const flags = (check.flags || "iu").includes("g") ? check.flags || "giu" : (check.flags || "iu") + "g";
    const actual = Math.max(...[String(text), foldKeyboardCase(text)].map(candidate => [...candidate.matchAll(new RegExp(check.pattern, flags))].length));
    return { met: actual >= check.min, detail: actual + " matching part" + (actual === 1 ? "" : "s") };
  }
  if (check.type === "lexicalDiversity") {
    const tokens = foldSpelling(text).match(/[\p{L}\p{M}]+/gu) || [];
    const distinct = new Set(tokens).size;
    const ratio = distinct / Math.max(1, tokens.length);
    const met = distinct >= (check.minDistinct || 0) && ratio >= (check.minRatio || 0);
    return { met, detail: `${distinct} different words across ${tokens.length} total` };
  }
  if (check.type === "minWords") return { met: words >= check.value, detail: words + " words" };
  if (check.type === "maxWords") return { met: words <= check.value, detail: words + " words" };
  if (check.type === "regex") {
    const met = [String(text), foldKeyboardCase(text)].some(candidate => new RegExp(check.pattern, check.flags || "u").test(candidate));
    return { met, detail: "" };
  }
  if (check.type === "regexLine") {
    const line = lines[check.line] || "";
    const met = [line, foldKeyboardCase(line)].some(candidate => new RegExp(check.pattern, check.flags || "u").test(candidate));
    return { met, detail: line ? "Line " + (check.line + 1) : "Line " + (check.line + 1) + " is empty" };
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
    return {
      met: true,
      acceptedVariant: found.length > 0,
      detail: found.length ? "Keyboard spelling accepted. Standard spelling: " + found.map(form => form.standard).join(", ") : ""
    };
  }
  if (check.type === "punctuatedLines") {
    const missing = lines.map((line, index) => /[.!?]$/u.test(line) || writingLineIsStructural(line, index, lines) ? -1 : index + 1).filter(index => index > 0);
    return { met: lines.length > 0 && missing.length === 0, detail: missing.length ? "Check line" + (missing.length === 1 ? " " : "s ") + missing.join(", ") : "" };
  }
  return { met: false, detail: "This check needs review." };
}

function evaluateWritingChecks(task, text) {
  const words = countWords(text);
  return (task.checks || []).map(check => ({ ...check, ...evaluateWritingCheck(check, text, words) }));
}

function writingTargetLabel(task) {
  return task.maxWords ? `${task.minWords} to ${task.maxWords}` : `${task.minWords}+`;
}

function renderWriting() {
  const module = activeModule();
  const task = module.task;
  const savedDraft = draftText("writing", module.id);
  $("#writingTask").hidden = false;
  $("#writingTitle").textContent = `${module.code}: ${module.title}`;
  $("#writingPrompt").textContent = task.writingPrompt;
  $("#writingGuide").innerHTML = task.guide.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  $("#writingInput").value = savedDraft;
  $("#writingCount").textContent = `${countWords(savedDraft)} words · target ${writingTargetLabel(task)}`;
  setDraftStatus("writing", savedDraft ? "Draft restored from this device." : "Drafts save on this device while you write.");
  $("#writingFeedback").hidden = true;
  $("#writingActions").hidden = true;
  $("#writingInput").disabled = false;
  $("#checkWriting").disabled = false;
  setTimeout(() => $("#writingTitle").focus(), 40);
}

function checkWriting() {
  const module = activeModule();
  const task = module.task;
  const text = $("#writingInput").value;
  const words = countWords(text);
  if (!words) return;
  updateDraft("writing", module.id, text);
  flushDrafts();
  if (task.checks?.length) {
    const checks = evaluateWritingChecks(task, text);
    const requiredChecks = checks.filter(check => check.required !== false);
    const requiredPassed = requiredChecks.filter(check => check.met).length;
    const optionalMisses = checks.filter(check => check.required === false && !check.met).length;
    const ratioValue = scoredChecklistRatio(requiredChecks);
    recordActivityResult(module.id, "writing", ratioValue);
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
    $("#writingActions").hidden = ratioValue < 1;
    return;
  }
  const requirements = task.required.map(item => ({ item: Array.isArray(item) ? item.join(" or ") : item, met: requirementMet(text, item) }));
  const lengthMet = words >= task.minWords && (!task.maxWords || words <= task.maxWords);
  const metCount = requirements.filter(item => item.met).length;
  const ratio = (metCount + (lengthMet ? 1 : 0)) / (requirements.length + 1);
  recordActivityResult(module.id, "writing", ratio);
  const feedback = $("#writingFeedback");
  feedback.hidden = false;
  feedback.className = `task-feedback ${ratio === 1 ? "success" : "repair"}`;
  const fallbackModel = ratio >= .5 ? `<p class="model"><strong>Model:</strong> ${escapeHtml(task.model)}</p>` : "<p>The model appears after most requested parts are present.</p>";
  feedback.innerHTML = `<h3>${ratio === 1 ? "All requested building blocks are present." : "A revision pass has a clear target."}</h3><p>${lengthMet ? `Length target reached: ${words} words.` : `Current length: ${words} words. Target: ${writingTargetLabel(task)}.`}</p><ul>${requirements.map(item => `<li>${item.met ? "✓" : "○"} ${escapeHtml(item.item)}</li>`).join("")}</ul><p>This check tracks the requested features.</p>${fallbackModel}`;
  $("#writingActions").hidden = ratio < 1;
}

function retryWriting() {
  $("#writingFeedback").hidden = true;
  $("#writingActions").hidden = true;
  $("#writingInput").focus();
}

const speakingStatusDefault = "This activity checks included phrases through a transcript. Pronunciation quality is outside this check.";
let activeSpeechRecognition = null;
let speechRecognitionAttempt = 0;
let microphoneRequestPending = false;
let localSpeechTranscriber = null;
let localSpeechAttempt = 0;
let browserTranscriptionUnavailable = false;
let activeSpeechDraftKind = "speaking";
let localSpeechDraftKind = "speaking";
let localSpeechModuleId = "";

function speechTranscriptForKind(kind) {
  return kind === "speakingFollowUp" ? $("#speakingFollowUpTranscript") : $("#speakingTranscript");
}

function speechTranscriptTarget() {
  return speechTranscriptForKind(activeSpeechDraftKind);
}

function formatRecordingTime(milliseconds) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function setLocalRecordingTimer(milliseconds = 0, visible = false) {
  const timer = $("#localSpeechTimer");
  if (!timer) return;
  timer.hidden = !visible;
  if (visible) timer.textContent = `${formatRecordingTime(milliseconds)} remaining`;
}

function localRecordingDurationMs(module) {
  if (["A0", "A1"].includes(module.level)) return 60000;
  if (module.level === "A2") return 75000;
  return 90000;
}

function setSpeakingMicrophoneStatus(message = speakingStatusDefault) {
  const status = $("#speakingMicStatus");
  if (status) status.textContent = message;
}

function resetSpeakingMicrophoneControls(label = "Record again", message = "Microphone stopped. Record again, or type your transcript below.") {
  const button = $("#startRecognition");
  const localButton = $("#localTranscription");
  const transcript = speechTranscriptTarget() || $("#speakingTranscript");
  if (!button || !transcript) return;
  const browserSupported = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  const localSupported = Boolean(window.SatzwerkLocalSpeech?.supported?.());
  button.hidden = !browserSupported;
  button.disabled = !browserSupported || browserTranscriptionUnavailable;
  button.textContent = browserTranscriptionUnavailable ? "Browser transcription unavailable" : browserSupported ? label : "Start microphone";
  if (localButton) {
    const localState = localSpeechTranscriber?.state?.() || {};
    localButton.hidden = !localSupported;
    localButton.disabled = false;
    localButton.textContent = localState.ready ? "Start local recording" : "Download local transcription (about 50 MB)";
  }
  setLocalRecordingTimer();
  transcript.placeholder = browserSupported || localSupported ? "Speak with the microphone, or type your transcript here." : "Type your transcript here.";
  const fallbackMessage = localSupported
    ? "Browser speech recognition is unavailable. Download local transcription, or type your transcript below."
    : "Speech recognition is unavailable in this browser. Type your transcript below to complete the rehearsal.";
  setSpeakingMicrophoneStatus(browserSupported ? message : fallbackMessage);
}

function cancelActiveSpeechRecognition(options = {}) {
  speechRecognitionAttempt += 1;
  const requestWasPending = microphoneRequestPending;
  microphoneRequestPending = false;
  const recognition = activeSpeechRecognition;
  activeSpeechRecognition = null;
  if (recognition) {
    recognition.onstart = null;
    recognition.onresult = null;
    recognition.onerror = null;
    recognition.onend = null;
    try { recognition.abort(); } catch {}
  }
  const localState = localSpeechTranscriber?.state?.() || {};
  const localWasActive = Boolean(localState.recording || localState.transcribing);
  localSpeechTranscriber?.cancel?.({ clearPlayback: Boolean(options.clearPlayback) });
  if (options.clearPlayback) {
    const playback = $("#speakingPlayback");
    if (playback) {
      playback.pause();
      playback.removeAttribute("src");
      playback.load();
    }
    if ($("#speakingPlaybackWrap")) $("#speakingPlaybackWrap").hidden = true;
  }
  setLocalRecordingTimer();
  if (options.resetControls !== false && (recognition || requestWasPending || localWasActive || options.forceReset)) {
    resetSpeakingMicrophoneControls(options.label || "Record again", options.message);
  }
}

function microphoneErrorMessage(error) {
  const code = String(error?.error || error?.name || "").toLowerCase();
  if (["not-allowed", "service-not-allowed", "notallowederror", "securityerror"].includes(code)) {
    return "Microphone access is blocked. Allow access in your browser, then try again. You can type your transcript at any time.";
  }
  if (["audio-capture", "notfounderror", "notreadableerror"].includes(code)) {
    return "The browser could not open a microphone. Check the selected input device, then try again. You can also type your transcript.";
  }
  if (code === "no-speech") return "No speech was detected. Try again, or type your transcript below.";
  if (code === "network") {
    return window.SatzwerkLocalSpeech?.supported?.()
      ? "Your microphone opened. This browser's transcription service could not connect. Choose local transcription below, or type your transcript."
      : "Your microphone opened. This browser's transcription service could not connect. Type your transcript below.";
  }
  if (code === "aborted" || code === "aborterror") return "The microphone stopped. Try again, or type your transcript below.";
  return "The microphone stopped before a transcript was captured. Try again, or type your transcript below.";
}

function revealLocalTranscription(message = "") {
  const button = $("#localTranscription");
  const note = $("#localSpeechNote");
  if (!button || !window.SatzwerkLocalSpeech?.supported?.()) return;
  const state = localSpeechTranscriber?.state?.() || {};
  button.hidden = false;
  button.disabled = false;
  button.textContent = state.ready ? "Start local recording" : "Download local transcription (about 50 MB)";
  if (note) note.hidden = false;
  if (message) setSpeakingMicrophoneStatus(message);
}

function localSpeechCallbackIsCurrent() {
  return localSpeechAttempt === speechRecognitionAttempt && currentView === "practice" && !$("#speakingTask")?.hidden;
}

function ensureLocalSpeechTranscriber() {
  if (localSpeechTranscriber || !window.SatzwerkLocalSpeech?.supported?.()) return localSpeechTranscriber;
  localSpeechTranscriber = new window.SatzwerkLocalSpeech.LocalGermanTranscriber({
    onProgress(message) {
      if (!localSpeechCallbackIsCurrent()) return;
      const progress = Number.isFinite(message.progress) ? ` ${Math.round(message.progress)}%` : "";
      const file = message.file ? ` ${message.file.split("/").at(-1)}` : "";
      $("#localTranscription").textContent = `Loading local model${progress}`;
      setSpeakingMicrophoneStatus(`Preparing private German transcription${progress}.${file}`.trim());
    },
    onReady() {
      if (!localSpeechCallbackIsCurrent()) return;
      const button = $("#localTranscription");
      button.disabled = false;
      button.textContent = "Start local recording";
      setSpeakingMicrophoneStatus("Local German transcription is ready. Start a recording when you are ready to speak.");
    },
    onRecording(maxDurationMs) {
      if (!localSpeechCallbackIsCurrent()) return;
      const seconds = Math.round(maxDurationMs / 1000);
      $("#localTranscription").disabled = false;
      $("#localTranscription").textContent = "Stop and transcribe";
      $("#startRecognition").disabled = true;
      setLocalRecordingTimer(maxDurationMs, true);
      setSpeakingMicrophoneStatus(`Recording German now. It will stop automatically after ${seconds} seconds.`);
    },
    onRecordingTick(remainingMs) {
      if (!localSpeechCallbackIsCurrent()) return;
      setLocalRecordingTimer(remainingMs, true);
    },
    onPlayback(url) {
      if (!localSpeechCallbackIsCurrent()) return;
      const audio = $("#speakingPlayback");
      audio.src = url;
      $("#speakingPlaybackWrap").hidden = false;
    },
    onTranscribing() {
      if (!localSpeechCallbackIsCurrent()) return;
      const button = $("#localTranscription");
      button.disabled = true;
      button.textContent = "Transcribing locally";
      setLocalRecordingTimer();
      setSpeakingMicrophoneStatus("Recording complete. German transcription is running on this device.");
    },
    onResult(value) {
      if (!localSpeechCallbackIsCurrent()) return;
      const transcript = speechTranscriptForKind(localSpeechDraftKind) || $("#speakingTranscript");
      if (value) {
        transcript.value = value;
        updateDraft(localSpeechDraftKind, localSpeechModuleId || activeModule().id, value);
      }
      const button = $("#localTranscription");
      button.disabled = false;
      button.textContent = "Record again locally";
      $("#startRecognition").disabled = browserTranscriptionUnavailable;
      setSpeakingMicrophoneStatus(value
        ? "Local transcript captured. Read it below and make any needed edits."
        : "The recording was saved, but no words were transcribed. Listen to it, record again, or type your transcript.");
    },
    onError(message) {
      if (!localSpeechCallbackIsCurrent()) return;
      const state = localSpeechTranscriber?.state?.() || {};
      const button = $("#localTranscription");
      button.disabled = false;
      button.textContent = state.ready ? "Record again locally" : "Retry local setup";
      $("#startRecognition").disabled = browserTranscriptionUnavailable;
      setLocalRecordingTimer();
      setSpeakingMicrophoneStatus(`${message} Your saved recording remains available when one was captured. You can also type your transcript.`);
    }
  });
  return localSpeechTranscriber;
}

async function useLocalTranscription() {
  const transcriber = ensureLocalSpeechTranscriber();
  if (!transcriber) {
    setSpeakingMicrophoneStatus("Local recording is unavailable in this browser. Type your transcript below.");
    return;
  }
  if (activeSpeechRecognition || microphoneRequestPending) cancelActiveSpeechRecognition({ resetControls: false });
  localSpeechAttempt = speechRecognitionAttempt;
  revealLocalTranscription();
  const button = $("#localTranscription");
  const state = transcriber.state();
  if (state.recording) {
    button.disabled = true;
    button.textContent = "Finishing recording";
    if (!transcriber.stop()) {
      button.disabled = false;
      button.textContent = "Record again locally";
    }
    return;
  }
  if (state.transcribing || state.loading) return;
  if (!state.ready) {
    button.disabled = true;
    button.textContent = "Loading local model";
    setSpeakingMicrophoneStatus("Downloading the private German transcription model. This happens once on this browser and may take a few minutes.");
    try {
      await transcriber.prepare();
    } catch (error) {
      if (!localSpeechCallbackIsCurrent()) return;
      button.disabled = false;
      button.textContent = "Retry local setup";
      setSpeakingMicrophoneStatus("The local model could not be downloaded. Check the connection, retry the setup, or type your transcript.");
    }
    return;
  }
  try {
    const module = activeModule();
    localSpeechDraftKind = activeSpeechDraftKind;
    localSpeechModuleId = module.id;
    const maxDurationMs = localRecordingDurationMs(module);
    button.disabled = true;
    button.textContent = "Opening microphone";
    setSpeakingMicrophoneStatus("Opening the microphone for a local recording.");
    const started = await transcriber.start(maxDurationMs);
    if (!started) {
      button.disabled = false;
      button.textContent = "Start local recording";
    }
  } catch (error) {
    if (!localSpeechCallbackIsCurrent()) return;
    button.disabled = false;
    button.textContent = "Start local recording";
    setSpeakingMicrophoneStatus(microphoneErrorMessage(error));
  }
}

async function browserCanRecognizeLocally(Recognition) {
  if (Recognition !== window.SpeechRecognition
    || typeof Recognition.available !== "function"
    || !("processLocally" in Recognition.prototype)) return false;
  try {
    const status = await Recognition.available({ langs: ["de-DE"], processLocally: true });
    return status === "available";
  } catch {
    return false;
  }
}

function renderSpeaking() {
  cancelActiveSpeechRecognition({ clearPlayback: true });
  const module = activeModule();
  const task = module.task;
  const savedDraft = draftText("speaking", module.id);
  activeSpeechDraftKind = "speaking";
  $("#speakingTask").hidden = false;
  $("#speakingTitle").textContent = `${module.code}: Rehearse familiar phrases`;
  $("#speakingPrompt").textContent = task.speakingPrompt;
  const minimum = speakingMinimumWords(module);
  $("#speakingGuide").innerHTML = [...task.speakingGuide, `Use at least ${minimum} words in the transcript.`].map(item => `<li>${escapeHtml(item)}</li>`).join("");
  $("#speakingTranscript").value = savedDraft;
  setDraftStatus("speaking", savedDraft ? "Draft restored from this device." : "Transcript drafts save on this device.");
  $("#speakingFeedback").hidden = true;
  $("#speakingActions").hidden = true;
  $("#speakingFollowUp").hidden = true;
  const browserSupported = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  const localSupported = Boolean(window.SatzwerkLocalSpeech?.supported?.());
  browserTranscriptionUnavailable = false;
  $("#startRecognition").hidden = !browserSupported;
  $("#startRecognition").disabled = !browserSupported;
  $("#startRecognition").textContent = "Start microphone";
  $("#localTranscription").hidden = !localSupported;
  $("#localTranscription").disabled = false;
  $("#localTranscription").textContent = localSpeechTranscriber?.state?.().ready ? "Start local recording" : "Download local transcription (about 50 MB)";
  $("#localSpeechNote").hidden = true;
  setLocalRecordingTimer();
  $("#speakingTranscript").placeholder = browserSupported || localSupported ? "Speak with the microphone, or type your transcript here." : "Type your transcript here.";
  setSpeakingMicrophoneStatus(browserSupported || localSupported ? speakingStatusDefault : "Speech recognition is unavailable in this browser. Type your transcript below to complete the rehearsal.");
  if (activityIsComplete(module, "speaking")) showSpeakingFollowUp(module);
  setTimeout(() => $("#speakingTitle").focus(), 40);
}

async function startRecognition() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const button = $("#startRecognition");
  const draftKind = activeSpeechDraftKind;
  const moduleId = activeModule().id;
  const transcript = speechTranscriptForKind(draftKind) || $("#speakingTranscript");
  if (!Recognition) {
    button.disabled = true;
    button.textContent = "Type a transcript here";
    transcript.placeholder = "Type your transcript here.";
    setSpeakingMicrophoneStatus("Speech recognition is unavailable in this browser. Type your transcript below to complete the rehearsal.");
    return;
  }

  if (activeSpeechRecognition || microphoneRequestPending) {
    cancelActiveSpeechRecognition({ forceReset: true });
    return;
  }

  cancelActiveSpeechRecognition({ resetControls: false });
  const attempt = speechRecognitionAttempt;
  localSpeechAttempt = attempt;
  microphoneRequestPending = true;
  button.disabled = false;
  button.textContent = "Stop microphone";
  transcript.placeholder = "You can type your transcript while the microphone opens.";
  setSpeakingMicrophoneStatus("Opening German speech recognition. Your browser may ask for microphone permission.");

  const processLocally = await browserCanRecognizeLocally(Recognition);
  if (attempt !== speechRecognitionAttempt) return;
  let recognition;
  try {
    recognition = new Recognition();
  } catch (error) {
    microphoneRequestPending = false;
    const message = microphoneErrorMessage(error);
    button.disabled = false;
    button.textContent = "Try microphone again";
    transcript.placeholder = message;
    setSpeakingMicrophoneStatus(message);
    return;
  }

  activeSpeechRecognition = recognition;
  recognition.lang = "de-DE";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  if (processLocally) recognition.processLocally = true;
  let transcriptCaptured = false;
  let recognitionError = "";
  recognition.onstart = () => {
    if (attempt !== speechRecognitionAttempt) return;
    microphoneRequestPending = false;
    button.disabled = false;
    button.textContent = "Stop microphone";
    setSpeakingMicrophoneStatus(processLocally
      ? "Listening for German with this browser's local speech pack."
      : "Listening for German. The transcript will appear below.");
  };
  recognition.onresult = event => {
    if (attempt !== speechRecognitionAttempt) return;
    const value = event.results?.[0]?.[0]?.transcript || "";
    if (value) {
      transcriptCaptured = true;
      transcript.value = value;
      updateDraft(draftKind, moduleId, value);
      transcript.placeholder = "Speak with the microphone, or type your transcript here.";
      setSpeakingMicrophoneStatus("Transcript captured. Read it below and make any needed edits.");
    }
    try { recognition.stop(); } catch {}
  };
  recognition.onerror = event => {
    if (attempt !== speechRecognitionAttempt) return;
    recognitionError = event.error || "unknown";
    microphoneRequestPending = false;
    const message = microphoneErrorMessage(event);
    if (activeSpeechRecognition === recognition) activeSpeechRecognition = null;
    recognition.onerror = null;
    try { recognition.abort(); } catch {}
    if (recognitionError === "network") {
      browserTranscriptionUnavailable = true;
      button.disabled = true;
      button.textContent = "Browser transcription unavailable";
      revealLocalTranscription(message);
    } else {
      button.disabled = false;
      button.textContent = "Try microphone again";
    }
    transcript.placeholder = message;
    setSpeakingMicrophoneStatus(message);
  };
  recognition.onend = () => {
    if (attempt !== speechRecognitionAttempt) return;
    if (activeSpeechRecognition === recognition) activeSpeechRecognition = null;
    microphoneRequestPending = false;
    button.disabled = recognitionError === "network";
    if (transcriptCaptured) button.textContent = "Record again";
    else if (recognitionError === "network") button.textContent = "Browser transcription unavailable";
    else if (recognitionError) button.textContent = "Try microphone again";
    else {
      button.textContent = "Record again";
      setSpeakingMicrophoneStatus("The microphone stopped before a transcript was captured. Record again, or type your transcript below.");
    }
  };
  button.disabled = false;
  button.textContent = "Stop microphone";
  setSpeakingMicrophoneStatus("Listening for German. The transcript will appear below.");
  try {
    recognition.start();
  } catch (error) {
    if (activeSpeechRecognition === recognition) activeSpeechRecognition = null;
    recognition.onstart = null;
    recognition.onresult = null;
    recognition.onerror = null;
    recognition.onend = null;
    microphoneRequestPending = false;
    const message = microphoneErrorMessage(error);
    button.disabled = false;
    button.textContent = "Try microphone again";
    transcript.placeholder = message;
    setSpeakingMicrophoneStatus(message);
  }
}

function checkSpeaking() {
  cancelActiveSpeechRecognition();
  const module = activeModule();
  const task = module.task;
  const text = $("#speakingTranscript").value;
  if (!text.trim()) return;
  updateDraft("speaking", module.id, text);
  flushDrafts();
  const requirements = speakingChecks(module, text);
  const ratio = scoredChecklistRatio(requirements);
  recordActivityResult(module.id, "speaking", ratio);
  const feedback = $("#speakingFeedback");
  feedback.hidden = false;
  feedback.className = `task-feedback ${ratio === 1 ? "success" : "repair"}`;
  const model = ratio >= .5 ? `<p class="model"><strong>Model after submission:</strong> ${escapeHtml(task.speakingModel)}</p>` : "<p>The model appears after most required parts are present.</p>";
  feedback.innerHTML = `<h3>${ratio === 1 ? "The target phrases and response length are present." : "Repeat once with the missing parts."}</h3><ul>${requirements.map(item => `<li>${item.met ? "✓" : "○"} ${escapeHtml(item.item)}${item.detail ? `: ${escapeHtml(item.detail)}` : ""}</li>`).join("")}</ul><p>This transcript checks selected words, forms, and response length. Pronunciation quality is outside this check.</p>${model}`;
  $("#speakingActions").hidden = ratio < 1;
  if (ratio === 1) showSpeakingFollowUp(module, true);
}

function speakingFollowUpPrompt(module) {
  const authored = module.task.speakingPromptVariants || [];
  if (authored.length) return authored[hashVariationSeed(module.id) % authored.length];
  const prompts = {
    A0: [
      "Continue the same situation. Add one new sentence and ask one related question.",
      "Give one more personal detail, then ask a simple question about the same topic.",
      "Add a short statement that fits the situation. Follow it with one related question."
    ],
    A1: [
      "Continue the exchange with one useful detail and one related question.",
      "Add a practical detail, then ask the other person one question about the same topic.",
      "Say one more thing that fits the situation and finish with a related question."
    ],
    A2: [
      "Continue with a reason using weil, denn, deshalb, or darum. Add one concrete detail.",
      "Explain one reason with weil, denn, deshalb, or darum, then give a specific detail.",
      "Extend your answer with a reason connector and one concrete fact from the situation."
    ],
    B1: [
      "Give a concrete example, explain the reason, and suggest a practical next step.",
      "Support your point with an example and a reason. Finish with one realistic next action.",
      "Add an example, explain why it matters, and state what should happen next."
    ],
    B2: [
      "Qualify one point, support it with an example, and explain one consequence.",
      "Add a nuanced qualification and a concrete example. Then state a likely consequence.",
      "Refine your position with a qualification, an example, and a clear consequence."
    ]
  }[module.level];
  return prompts[hashVariationSeed(module.id) % prompts.length];
}

function speakingFollowUpMinimum(module) {
  return Math.max(4, Math.ceil(speakingMinimumWords(module) / 2));
}

function speakingFollowUpChecks(module, text) {
  const folded = foldSpelling(stripPunctuation(text)).toLowerCase();
  const raw = String(text || "");
  const prompt = speakingFollowUpPrompt(module).toLowerCase();
  const checks = [{ label: `At least ${speakingFollowUpMinimum(module)} words`, met: countWords(text) >= speakingFollowUpMinimum(module) }];
  const add = (label, pattern) => checks.push({ label, met: pattern.test(folded) || pattern.test(raw) });
  if (/question/.test(prompt)) add("A related question", /\?|\b(?:wer|wie|was|wo|wann|warum|welch|kannst|hast|bist|möchtest|moechtest)\b/iu);
  if (/\bweil\b/.test(prompt)) add("A clause with weil", /\bweil\b/iu);
  if (/zuerst/.test(prompt)) add("The sequence word zuerst", /\bzuerst\b/iu);
  if (/danach/.test(prompt)) add("The sequence word danach", /\bdanach\b/iu);
  if (/definite article/.test(prompt)) add("The forms der, die, and das", /\bder\b.*\bdie\b.*\bdas\b|\bder\b.*\bdas\b.*\bdie\b|\bdie\b.*\bder\b.*\bdas\b|\bdie\b.*\bdas\b.*\bder\b|\bdas\b.*\bder\b.*\bdie\b|\bdas\b.*\bdie\b.*\bder\b/iu);
  if (/indefinite form/.test(prompt)) add("The forms ein and eine", /\bein\b.*\beine\b|\beine\b.*\bein\b/iu);
  if (/accusative/.test(prompt)) add("A masculine accusative form", /\b(?:den|einen|meinen|deinen|keinen|ihn)\b/iu);
  if (/object pronoun/.test(prompt)) add("An object pronoun", /\b(?:ihn|sie|es|mich|dich|uns|euch)\b/iu);
  if (/\bwegen\b/.test(prompt)) add("The preposition wegen", /\bwegen\b/iu);
  if (/fixed dative/.test(prompt)) add("A fixed dative phrase", /\b(?:am|im|beim|zum|zur|mit|nach|aus|von)\b/iu);
  if (/recipient/.test(prompt)) add("A recipient in the dative", /\b(?:mir|dir|ihm|ihr|uns|euch|dem|einem|einer)\b/iu);
  if (/prepositional phrase/.test(prompt)) {
    const prepositions = folded.match(/\b(?:an|auf|aus|bei|für|fuer|in|mit|nach|über|ueber|um|von|vor|zu)\b/giu) || [];
    checks.push({ label: "Two prepositional phrases", met: prepositions.length >= 2 });
  }
  if (/dative-governing verb/.test(prompt)) add("A dative-governing verb", /\b(?:helf|dank|gefall|gehör|gehoer|folg|antwort)\w*/iu);
  if (/logical relation/.test(prompt)) add("Clear logical connectors", /\b(?:weil|denn|deshalb|darum|danach|außerdem|ausserdem|jedoch|obwohl|während|waehrend)\b/iu);
  if (/two time-first statements/.test(prompt)) {
    const timeCue = /^(?:heute|morgen|gestern|jetzt|dann|danach|zuerst|später|spaeter|am\s+\w+|um\s+\d{1,2}(?::\d{2})?)\b/iu;
    const markedStatements = raw
      .replace(/\bund\s+(?=(?:heute|morgen|gestern|jetzt|dann|danach|zuerst|später|spaeter|am\s+\w+|um\s+\d))/giu, ". ")
      .split(/[.!?;\n]+/u)
      .map(statement => foldSpelling(statement).trim())
      .filter(Boolean);
    const markedCount = markedStatements.filter(statement => timeCue.test(statement)).length;
    const foldedWords = folded.trim().split(/\s+/u);
    const cuePositions = foldedWords.map((word, index) => /^(?:heute|morgen|gestern|jetzt|dann|danach|zuerst|später|spaeter)$/iu.test(word) ? index : -1).filter(index => index >= 0);
    const spokenFallback = cuePositions[0] === 0 && cuePositions.some(index => index >= 4);
    checks.push({ label: "Two statements that begin with time information", met: markedCount >= 2 || spokenFallback });
  }
  if (/two different question patterns/.test(prompt)) {
    const questions = raw.split("?").slice(0, -1).map(part => part.split(/[.!]\s*/u).at(-1).trim()).filter(Boolean);
    const markedOpenings = questions.map(question => foldSpelling(stripPunctuation(question)).trim().toLowerCase().split(/\s+/u)[0]).filter(Boolean);
    const markedOpeningSet = new Set(markedOpenings);
    const tokens = folded.match(/[\p{L}\p{M}]+/gu) || [];
    const whWords = /^(?:wer|wie|was|wo|wann|warum|welch\w*)$/iu;
    const finiteOpeners = /^(?:können|koennen|habt|seid|ist|sind|möchtest|moechtest|wollen|[\p{L}\p{M}]+st)$/iu;
    const fallbackOpenings = [];
    let recentWhIndex = -10;
    tokens.forEach((token, index) => {
      if (whWords.test(token)) {
        fallbackOpenings.push(token.toLowerCase());
        recentWhIndex = index;
      } else if (finiteOpeners.test(token)
        && !/^(?:zuerst|sonst)$/iu.test(token)
        && /^(?:du|ihr|sie|er|es|man|der|die|das|ein|eine|wir)$/iu.test(tokens[index + 1] || "")
        && index - recentWhIndex > 2) fallbackOpenings.push(token.toLowerCase());
    });
    const fallbackOpeningSet = new Set(fallbackOpenings);
    const markedPass = questions.length >= 2 && markedOpeningSet.size >= 2;
    const spokenPass = fallbackOpeningSet.size >= 2;
    checks.push({ label: "Two questions with different openings", met: markedPass || spokenPass });
  }
  if (/two fixed dative phrases/.test(prompt)) {
    const fixedDativePhrases = folded.match(/\b(?:am|im|beim|zum|zur|vom|mit\s+(?:dem|der|einem|einer)|nach\s+\w+|aus\s+(?:dem|der|einem|einer)|von\s+(?:dem|der|einem|einer))\b/giu) || [];
    checks.push({ label: "Two fixed dative phrases", met: fixedDativePhrases.length >= 2 });
  }
  if (/varied adjective endings/.test(prompt)) {
    const adjectiveEndings = new Set((folded.match(/\b(?:der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines|mein\w*|dein\w*|kein\w*)\s+[a-zäöüß]+(e|en|em|er|es)\b/giu) || [])
      .map(phrase => phrase.match(/(e|en|em|er|es)$/iu)?.[1]).filter(Boolean));
    checks.push({ label: "At least two adjective ending forms", met: adjectiveEndings.size >= 2 });
  }
  if (/connect every step/.test(prompt)) {
    const logicalConnectors = folded.match(/\b(?:zuerst|dann|danach|anschließend|anschliessend|weil|denn|deshalb|darum|außerdem|ausserdem|jedoch|obwohl|während|waehrend|schließlich|schliesslich)\b/giu) || [];
    checks.push({ label: "At least two process connectors", met: new Set(logicalConnectors).size >= 2 });
  }

  if (!module.task.speakingPromptVariants?.length) {
    if (module.level === "A0" || module.level === "A1") add("A related question", /\?|\b(?:wer|wie|was|wo|wann|warum|welch|kannst|hast|bist|möchtest|moechtest)\b/iu);
    if (module.level === "A2") add("A reason with weil, denn, or deshalb", /\b(?:weil|denn|deshalb|darum)\b/iu);
    if (module.level === "B1") {
      add("A concrete example", /\b(?:zum beispiel|beispielsweise|etwa)\b/iu);
      add("A reason", /\b(?:weil|denn|deshalb|darum|aus diesem grund)\b/iu);
      add("A practical next step", /\b(?:danach|anschließend|anschliessend|als nächstes|als naechstes|werde|könnte|koennte|sollte|möchte|moechte)\b/iu);
    }
    if (module.level === "B2") {
      add("A qualified point", /\b(?:allerdings|jedoch|einerseits|andererseits|obwohl|zwar)\b/iu);
      add("A concrete example", /\b(?:zum beispiel|beispielsweise|etwa)\b/iu);
      add("A consequence", /\b(?:deshalb|daher|dadurch|folglich|somit|führt|fuehrt)\b/iu);
    }
  }
  return checks;
}

function showSpeakingFollowUp(module, focus = false) {
  const panel = $("#speakingFollowUp");
  const savedDraft = draftText("speakingFollowUp", module.id);
  const completedAt = moduleRecord(module.id).activities.speaking.followUpAt;
  panel.hidden = false;
  $("#speakingFollowUpPrompt").textContent = speakingFollowUpPrompt(module);
  $("#speakingFollowUpMinimum").textContent = `Use at least ${speakingFollowUpMinimum(module)} words. Focus this transcript box before using either microphone.`;
  $("#speakingFollowUpTranscript").value = savedDraft;
  setDraftStatus("speakingFollowUp", savedDraft ? "Follow-up draft restored from this device." : "This follow-up draft saves on this device.");
  $("#speakingFollowUpFeedback").hidden = !completedAt;
  if (completedAt) $("#speakingFollowUpFeedback").innerHTML = "<h3>Follow-up rehearsal recorded.</h3><p>You can revise it and rehearse again whenever you want.</p>";
  if (focus) {
    activeSpeechDraftKind = "speakingFollowUp";
    $("#speakingFollowUpTranscript").focus();
  }
}

function checkSpeakingFollowUp() {
  cancelActiveSpeechRecognition();
  const module = activeModule();
  const text = $("#speakingFollowUpTranscript").value;
  const feedback = $("#speakingFollowUpFeedback");
  if (!text.trim()) return;
  updateDraft("speakingFollowUp", module.id, text);
  flushDrafts();
  const checks = speakingFollowUpChecks(module, text);
  const complete = checks.every(check => check.met);
  feedback.hidden = false;
  feedback.className = `task-feedback ${complete ? "success" : "repair"}`;
  if (!complete) {
    feedback.innerHTML = `<h3>One more rehearsal will complete this round.</h3><ul>${checks.map(check => `<li>${check.met ? "✓" : "○"} ${escapeHtml(check.label)}</li>`).join("")}</ul>`;
    return;
  }
  const activity = moduleRecord(module.id).activities.speaking;
  const firstCompletion = !activity.followUpAt;
  activity.followUpAt = new Date().toISOString();
  saveState();
  feedback.innerHTML = `<h3>Follow-up rehearsal recorded.</h3><ul>${checks.map(check => `<li>✓ ${escapeHtml(check.label)}</li>`).join("")}</ul><p>Pronunciation quality remains unscored.</p>`;
  if (firstCompletion) claimReward(`speaking-followup:${module.id}`, "Follow-up completed.", "You extended the speaking response with a second round.", { category: "speaking", kind: "personal", label: "SPEAKING PRACTICE" });
}

function retrySpeaking() {
  $("#speakingFeedback").hidden = true;
  $("#speakingActions").hidden = true;
  $("#speakingTranscript").focus();
}

function renderGrammar() {
  const module = activeModule();
  syncModuleControls();
  const cards = module.level === "A0" ? module.grammar.filter(item => !item.supplemental) : module.grammar;
  $("#grammarCards").innerHTML = cards.map((item, index) => `<article class="grammar-card"><span>${module.code} · ${String(index + 1).padStart(2, "0")}</span><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.rule)}</p><div class="grammar-example"><strong lang="de-DE">${escapeHtml(item.example)}</strong><small lang="en-US">${escapeHtml(item.translation)}</small></div></article>`).join("");
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
  const totalMatches = words.length;
  const visibleWords = words.slice(0, vocabVisibleLimit);
  $("#vocabMore").hidden = visibleWords.length >= totalMatches;
  $("#vocabMoreStatus").textContent = `Showing ${visibleWords.length} of ${totalMatches} matching cards`;
  $("#vocabRows").innerHTML = visibleWords.map(word => {
    const record = state.words[word.globalId];
    const tier = tierFor(record);
    const due = record?.nextReview && record.nextReview <= now();
    const module = moduleById(word.moduleId);
    return `<tr><td><strong lang="de-DE">${escapeHtml(word.de)}</strong><small lang="de-DE">${escapeHtml(word.bundle)}</small></td><td><span lang="en-US">${escapeHtml(word.en)}</span><small lang="de-DE">${escapeHtml(word.example)}</small></td><td>${word.level}<small>${module.code}${word.supplemental ? " · expansion" : ""}</small></td><td><span class="tier-pill"><i class="tier-dot ${tier}"></i>${tierLabel(tier)}</span><div class="evidence-mini"><i style="width:${evidencePercent(record)}%"></i></div></td><td><button class="vocab-action" type="button" data-review-word="${word.globalId}">${due ? "Review due" : isIntroduced(word.globalId) ? "Review bundle" : "Meet word"}</button></td></tr>`;
  }).join("");
  $$('[data-review-word]').forEach(button => button.addEventListener("click", () => {
    targetedWordId = button.dataset.reviewWord;
    const word = wordByGlobalId(targetedWordId);
    setActiveModule(word.moduleId, true);
    targetedWordId = word.globalId;
    go("learn");
  }));
}

function resetVocabularyWindow() {
  vocabVisibleLimit = 200;
  renderVocabulary();
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
  if (skill === "listening") {
    return listeningCourse.items.filter(item => {
      const module = moduleById(item.moduleId);
      return module && activityIsComplete(module, "listening");
    }).length;
  }
  return modules.filter(module => state.modules[module.id] && activityIsComplete(module, skill)).length;
}

function renderProgress() {
  const words = introducedWords();
  const accuracy = state.quiz.attempts ? Math.round((state.quiz.firstCorrect / state.quiz.attempts) * 100) : null;
  const started = modules.filter(module => state.modules[module.id]?.started || moduleWordCount(module, true) > 0).length;
  const completed = modules.filter(module => moduleIsComplete(module)).length;
  const completedModules = modules.filter(module => moduleIsComplete(module));
  const verifiedCore = modules.reduce((sum, module) => sum + verifiedCoreCount(module), 0);
  const coreTotal = modules.reduce((sum, module) => sum + moduleCoreWords(module).length, 0);
  const readingLibrary = window.SATZWERK_READINGS || [];
  const passedLibraryReadings = readingLibrary.filter(item => state.readings?.[item.id]?.version === item.version && state.readings?.[item.id]?.passedAt).length;
  const sentenceCompletions = Object.values(state.modules).reduce((sum, item) => sum + Object.keys(item.completedPrompts || {}).length, 0);
  const retrievable = allWords.filter(word => ["retrievable", "durable"].includes(tierFor(state.words[word.globalId]))).length;
  const durable = allWords.filter(word => tierFor(state.words[word.globalId]) === "durable").length;
  const completedLevels = levels.filter(level => modules.filter(module => module.level === level.id).every(moduleIsComplete));
  const readingPasses = passedLibraryReadings + modules.filter(module => activityIsComplete(module, "reading")).length;
  const motivation = motivationState();
  const practiceStreak = currentPracticeStreak();
  const balancedDay = Object.values(motivation.days).some(day => Object.values(day.categories || {}).filter(Boolean).length >= 3);
  $("#progressWords").textContent = words.length;
  $("#progressWordsDetail").textContent = `of ${allWords.length} course bundles`;
  $("#progressAccuracy").textContent = accuracy == null ? "No data" : `${accuracy}%`;
  $("#progressModules").textContent = completed;
  $("#progressModulesDetail").textContent = `of ${modules.length} modules complete · ${started} started`;
  $("#progressDue").textContent = dueWords().length;
  const restoreButton = $("#restoreProgress");
  if (restoreButton) restoreButton.hidden = !backupProgressAvailable();
  const discardBackupButton = $("#discardProgressBackup");
  if (discardBackupButton) discardBackupButton.hidden = !backupProgressAvailable();
  const skills = [
    { key: "vocabulary", label: "Typed core-word recall", value: Math.round(verifiedCore / coreTotal * 100), detail: `${verifiedCore} of ${coreTotal} core bundles recalled` },
    { key: "sentences", label: "Typed sentence production", value: Math.round(Object.values(state.modules).reduce((sum, item) => sum + Object.keys(item.completedPrompts || {}).length, 0) / allQuestions.length * 100), detail: `${state.quiz.attempts} first-pass attempts` },
    { key: "listening", label: "Voiced listening", value: Math.round(skillModuleCount("listening") / Math.max(1, listeningCourse.items.length) * 100), detail: `${skillModuleCount("listening")} of ${listeningCourse.items.length} dialogues completed` },
    { key: "reading", label: "Reading", value: Math.round(skillModuleCount("reading") / modules.length * 100), detail: `${skillModuleCount("reading")} modules practiced` },
    { key: "reading-library", label: "Graded reading track", value: Math.round(passedLibraryReadings / Math.max(1, readingLibrary.length) * 100), detail: `${passedLibraryReadings} of ${readingLibrary.length} complete texts passed` },
    { key: "writing", label: "Guided writing", value: Math.round(skillModuleCount("writing") / modules.length * 100), detail: `${skillModuleCount("writing")} modules practiced` },
    { key: "speaking", label: "Speaking rehearsal", value: Math.round(skillModuleCount("speaking") / modules.length * 100), detail: `${skillModuleCount("speaking")} modules complete` },
    { key: "assessment", label: "Passed module assessments", value: Math.round(completed / modules.length * 100), detail: `${completed} modules passed` }
  ];
  $("#skillEvidence").innerHTML = skills.map(skill => `<div class="evidence-row"><div><strong>${skill.label}</strong><span>${skill.detail}</span></div><div class="evidence-track"><i style="width:${Math.min(100, skill.value)}%"></i></div></div>`).join("");
  $("#progressLevels").innerHTML = levels.map(level => {
    const group = modules.filter(module => module.level === level.id);
    const startedAtLevel = group.filter(module => state.modules[module.id]?.started || moduleWordCount(module, true) > 0).length;
    const completedAtLevel = group.filter(module => moduleIsComplete(module)).length;
    const progress = levelProgress(level.id);
    return `<div class="progress-level"><b>${level.id}</b><div><span>${escapeHtml(level.title)} · ${completedAtLevel} complete · ${startedAtLevel} started</span><div><i style="width:${progress}%"></i></div></div><small>${progress}% complete</small></div>`;
  }).join("");

  const landmarks = [
    { earned: verifiedCore > 0, stamp: "01", title: "First recall", earnedText: "You typed your first successful core-word recall.", lockedText: "Type one core word correctly from memory." },
    { earned: sentenceCompletions > 0, stamp: "DE", title: "First sentence", earnedText: "You completed your first Sentence Lab pattern.", lockedText: "Complete one Sentence Lab prompt." },
    { earned: readingPasses > 0, stamp: "R", title: "Text reader", earnedText: "You completed a German reading activity.", lockedText: "Complete one reading activity or graded text." },
    { earned: completed > 0, stamp: "✓", title: "Module passed", earnedText: `${completed} module${completed === 1 ? " is" : "s are"} now checked off.`, lockedText: "Pass your first closed module assessment." },
    { earned: retrievable >= 10, stamp: "10", title: "Ten retrievable", earnedText: `${retrievable} word bundles are retrievable or durable.`, lockedText: `${Math.min(retrievable, 10)} of 10 word bundles are retrievable.` },
    { earned: practiceStreak >= 3, stamp: "3D", title: "Study rhythm", earnedText: `${practiceStreak} consecutive practice days are recorded.`, lockedText: "Return to useful German practice for three consecutive days." },
    { earned: balancedDay, stamp: "3×", title: "Balanced day", earnedText: "You used three kinds of language skill in one day.", lockedText: "Use three skill areas in one day." },
    { earned: motivation.points >= 100, stamp: "100", title: "Evidence builder", earnedText: `${motivation.points.toLocaleString()} evidence points come from completed learning work.`, lockedText: `${Math.min(motivation.points, 100)} of 100 evidence points earned.` },
    { earned: completedLevels.length > 0, stamp: completedLevels.at(-1)?.id || "A0", title: "Level complete", earnedText: `${completedLevels.map(level => level.id).join(", ")} ${completedLevels.length === 1 ? "is" : "are"} complete.`, lockedText: "Pass every module in one CEFR level." },
    { earned: durable > 0, stamp: "◆", title: "Built to last", earnedText: `${durable} word bundle${durable === 1 ? " has" : "s have"} durable evidence.`, lockedText: "Recall a word across several study days." },
    { earned: completed === modules.length, stamp: "B2", title: "Full pathway", earnedText: "Every module from A0 through B2 is passed.", lockedText: `${completed} of ${modules.length} modules are passed.` }
  ];
  $("#landmarkGrid").innerHTML = landmarks.map(landmark => `<article class="landmark-card ${landmark.earned ? "earned" : "locked"}"><span class="landmark-stamp" aria-hidden="true">${escapeHtml(landmark.stamp)}</span><div><span>${landmark.earned ? "EARNED" : "IN PROGRESS"}</span><h3>${escapeHtml(landmark.title)}</h3><p>${escapeHtml(landmark.earned ? landmark.earnedText : landmark.lockedText)}</p></div></article>`).join("");

  const earnedAbilities = completedModules.flatMap(module => module.canDo.map(item => ({ module, item }))).slice(-8).reverse();
  $("#earnedCanDo").innerHTML = earnedAbilities.length
    ? earnedAbilities.map(({ module, item }) => `<article class="can-do-item"><span>${escapeHtml(module.code)}</span><p>${escapeHtml(item)}</p></article>`).join("")
    : '<div class="can-do-empty"><strong>Your first ability will appear here.</strong><p>Pass a module assessment to add its real-world skills.</p></div>';
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
    inputSchema: { type: "object", properties: { view: { type: "string", enum: ["home", "course", "learn", "practice", "grammar", "vocabulary", "culture", "reading-library", "audio-lab", "progress", "sources"] } }, required: ["view"], additionalProperties: false },
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
  $("#flashStartRecall").addEventListener("click", startFlashRecall);
  $("#flashRecallForm").addEventListener("submit", submitVocabularyRecall);
  $("#flashSkip").addEventListener("click", skipVocabularyRecall);
  $("#flashNext").addEventListener("click", continueVocabularyCard);
  $("#guidedLessonTab").addEventListener("click", () => setLearnMode("lesson"));
  $("#wordDeckTab").addEventListener("click", () => setLearnMode("deck"));
  $("#lessonPrevious").addEventListener("click", () => {
    lessonStepIndex = Math.max(0, lessonStepIndex - 1);
    renderGuidedLesson();
  });
  $("#lessonAction").addEventListener("click", checkLessonStep);
  $("#cardDirection").addEventListener("change", event => { state.cardDirection = event.target.value; saveState(); renderCard(); });
  $("#shuffleDeck").addEventListener("click", () => {
    const run = beginVariationRun(`manual-deck:${activeModule().id}`);
    deck = variedOrder(deck, `word-deck-order:${activeModule().id}`, run.random);
    deckIndex = 0;
    saveState();
    renderCard();
    renderDeckStrip();
  });
  $("#learnToPractice").addEventListener("click", () => go("practice"));
  $("#practiceLearnFirst").addEventListener("click", () => go("learn"));
  $$('[data-practice-mode]').forEach(button => button.addEventListener("click", () => openPracticeMode(button.dataset.practiceMode)));
  $("#activityBack").addEventListener("click", () => {
    if (quiz?.assessment && !quiz.completed) persistAssessmentSession();
    renderPracticeMenu();
  });
  $("#quizForm").addEventListener("submit", submitQuizAnswer);
  $("#quizInput").addEventListener("input", event => scheduleAssessmentSessionSave(event.target.value));
  $("#quizLongInput").addEventListener("input", event => scheduleAssessmentSessionSave(event.target.value));
  $("#quizTryAgain").addEventListener("click", retryCurrentQuizAnswer);
  $("#quizNext").addEventListener("click", nextQuizQuestion);
  $("#quizAudio").addEventListener("error", () => {
    if ($("#quizAudioWrap").hidden) return;
    $("#quizAudioNote").textContent = "The audio could not load. Your saved assessment can be resumed after you reload the page.";
  });
  $("#retryMissed").addEventListener("click", retryMissedQuestions);
  $("#retakeAssessment").addEventListener("click", retakeModuleAssessment);
  $("#beginAssessment").addEventListener("click", beginModuleAssessment);
  const discardAssessmentButton = document.createElement("button");
  discardAssessmentButton.className = "quiet-button";
  discardAssessmentButton.id = "discardAssessment";
  discardAssessmentButton.type = "button";
  discardAssessmentButton.hidden = true;
  discardAssessmentButton.textContent = "Discard saved assessment";
  $("#beginAssessment").after(discardAssessmentButton);
  discardAssessmentButton.addEventListener("click", discardAssessmentSession);
  $("#nextModule").addEventListener("click", continueToNextModule);
  $("#finishQuiz").addEventListener("click", renderPracticeMenu);
  $("#listeningForm").addEventListener("submit", submitListening);
  const listeningTranscriptButton = document.createElement("button");
  listeningTranscriptButton.className = "quiet-button listening-transcript-help";
  listeningTranscriptButton.id = "listeningTranscriptHelp";
  listeningTranscriptButton.type = "button";
  listeningTranscriptButton.textContent = "Show transcript support";
  const listeningTextSupport = document.createElement("div");
  listeningTextSupport.id = "listeningTextSupport";
  listeningTextSupport.tabIndex = -1;
  listeningTextSupport.setAttribute("role", "region");
  listeningTextSupport.setAttribute("aria-label", "Listening transcript support");
  listeningTextSupport.hidden = true;
  $("#listeningNote").after(listeningTranscriptButton, listeningTextSupport);
  listeningTranscriptButton.addEventListener("click", revealListeningTranscript);
  $("#listeningAudio").addEventListener("error", () => {
    if ($("#listeningTask").hidden) return;
    $("#listeningNote").textContent = "The audio could not be played. Open transcript support to complete this activity.";
    listeningTranscriptButton.hidden = false;
  });
  $("#listeningRetry").addEventListener("click", retryListening);
  $("#listeningContinue").addEventListener("click", renderPracticeMenu);
  $("#listeningSpeed").addEventListener("change", event => {
    $("#listeningAudio").playbackRate = Number(event.target.value || 1);
  });
  $("#readingForm").addEventListener("submit", submitReading);
  $("#readingRetry").addEventListener("click", retryReading);
  $("#readingContinue").addEventListener("click", renderPracticeMenu);
  $("#writingInput").addEventListener("input", event => {
    const module = activeModule();
    $("#writingCount").textContent = `${countWords(event.target.value)} words · target ${writingTargetLabel(module.task)}`;
    updateDraft("writing", module.id, event.target.value);
  });
  $("#checkWriting").addEventListener("click", checkWriting);
  $("#writingRetry").addEventListener("click", retryWriting);
  $("#writingContinue").addEventListener("click", renderPracticeMenu);
  $("#startRecognition").addEventListener("click", startRecognition);
  $("#localTranscription").addEventListener("click", useLocalTranscription);
  $("#speakingTranscript").addEventListener("focus", () => { activeSpeechDraftKind = "speaking"; });
  $("#speakingTranscript").addEventListener("input", event => updateDraft("speaking", activeModule().id, event.target.value));
  $("#speakingFollowUpTranscript").addEventListener("focus", () => { activeSpeechDraftKind = "speakingFollowUp"; });
  $("#speakingFollowUpTranscript").addEventListener("input", event => updateDraft("speakingFollowUp", activeModule().id, event.target.value));
  window.addEventListener("pagehide", () => {
    if (suppressPagehidePersistence) return;
    flushDrafts();
    if (quiz?.assessment) persistAssessmentSession();
    cancelActiveSpeechRecognition({ clearPlayback: true });
  });
  window.addEventListener("pageshow", event => {
    if (event.persisted) cancelActiveSpeechRecognition({ forceReset: true, label: "Start microphone", message: speakingStatusDefault });
  });
  $("#checkSpeaking").addEventListener("click", checkSpeaking);
  $("#checkSpeakingFollowUp").addEventListener("click", checkSpeakingFollowUp);
  $("#speakingRetry").addEventListener("click", retrySpeaking);
  $("#speakingContinue").addEventListener("click", renderPracticeMenu);
  ["#vocabScope", "#vocabLevel"].forEach(selector => $(selector).addEventListener("change", resetVocabularyWindow));
  $("#vocabSearch").addEventListener("input", resetVocabularyWindow);
  $("#vocabMoreButton").addEventListener("click", () => { vocabVisibleLimit += 200; renderVocabulary(); });
  $$('[data-tier]').forEach(button => button.addEventListener("click", () => {
    vocabFilter = button.dataset.tier;
    $$('[data-tier]').forEach(item => item.classList.toggle("active", item === button));
    resetVocabularyWindow();
  }));
  $("#exportProgress").addEventListener("click", exportProgress);
  $("#importProgress").addEventListener("click", () => $("#importProgressFile").click());
  const restoreProgressButton = document.createElement("button");
  restoreProgressButton.className = "quiet-button";
  restoreProgressButton.id = "restoreProgress";
  restoreProgressButton.type = "button";
  restoreProgressButton.hidden = !backupProgressAvailable();
  restoreProgressButton.textContent = "Restore previous copy";
  $("#importProgress").after(restoreProgressButton);
  restoreProgressButton.addEventListener("click", restorePreviousProgress);
  const discardProgressBackupButton = document.createElement("button");
  discardProgressBackupButton.className = "quiet-button";
  discardProgressBackupButton.id = "discardProgressBackup";
  discardProgressBackupButton.type = "button";
  discardProgressBackupButton.hidden = !backupProgressAvailable();
  discardProgressBackupButton.textContent = "Remove recovery copy";
  restoreProgressButton.after(discardProgressBackupButton);
  discardProgressBackupButton.addEventListener("click", discardPreviousProgress);
  $("#importProgressFile").addEventListener("change", async event => {
    const [file] = event.target.files || [];
    await importProgressFile(file);
    event.target.value = "";
  });
  $("#resetProgress").addEventListener("click", () => $("#resetDialog").showModal());
  $("#confirmReset").addEventListener("click", () => {
    suppressPagehidePersistence = true;
    localStorage.removeItem(storageKey);
    localStorage.removeItem(backupStorageKey);
    window.location.reload();
  });
}

migrateLegacyWords();
populateStaticControls();
bindEvents();
syncModuleControls();
renderHome();
registerModelTools();
if (storageNotice) window.setTimeout(() => announceMessage(storageNotice), 100);
