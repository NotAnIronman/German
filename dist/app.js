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
const assessmentVersion = 5;
const assessmentPassScore = .8;

const defaultState = {
  version: 5,
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
  motivation: { activityDays: [], days: {}, claims: {}, recentWins: [], points: 0 },
  variation: { recentChoices: {}, recentOrders: {}, counters: {} }
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
      deckPositions: parsed.deckPositions || {},
      motivation: {
        activityDays: parsed.motivation?.activityDays || [],
        days: parsed.motivation?.days || {},
        claims: parsed.motivation?.claims || {},
        recentWins: parsed.motivation?.recentWins || [],
        points: Number(parsed.motivation?.points || 0)
      },
      variation: {
        recentChoices: parsed.variation?.recentChoices || {},
        recentOrders: parsed.variation?.recentOrders || {},
        counters: parsed.variation?.counters || {}
      }
    };
    const rewardCategories = ["lesson", "vocabulary", "sentences", "listening", "reading", "graded-reading", "writing", "speaking", "assessment"];
    Object.values(next.motivation.days).forEach(day => {
      if (!day.categories) {
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
    localStorage.setItem(storageKey, JSON.stringify(next));
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
  localStorage.setItem(storageKey, JSON.stringify(state));
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
    { id: "sentences", label: "Sentence lab", complete: completedPromptCount(module) === promptTotal, value: completedPromptCount(module) / Math.max(1, promptTotal) },
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

function setActiveModule(id, announce = true) {
  pauseListeningAudio(true);
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
  if (view !== "practice") pauseListeningAudio(true);
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
    $("#continueText").textContent = record.assessment.attempts.length ? `Best score: ${Math.round((record.assessment.bestScore || 0) * 100)}%. Reach 80% and the section minimums to complete the module.` : "This closed attempt covers every core word, every sentence target, reading, structured writing, and a speaking transcript.";
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
  $("#moduleDetail").innerHTML = `<span class="eyebrow">${module.code} · ${moduleStatus(module).toUpperCase()}</span><h2>${escapeHtml(module.title)}</h2><p>${escapeHtml(module.subtitle)}</p><h3>You will learn to</h3><ul>${module.canDo.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>${listeningFor(module) ? `<div class="module-audio-note"><strong>Optional listening</strong><span>${escapeHtml(listeningFor(module).title)} · separate checkoff</span></div>` : ""}<h3>Completion stages</h3><ul>${stages.map(stage => `<li>${stage.complete ? "✓" : "○"} ${escapeHtml(stage.label)}</li>`).join("")}</ul><h3>Grammar focus</h3><ul>${module.grammar.map(item => `<li>${escapeHtml(item.title)}</li>`).join("")}</ul><div class="module-progress"><div><i style="width:${moduleProgress(module)}%"></i></div><small>${bundleSummary} · ${module.questions.length} typed prompts · ${stages.filter(stage => stage.complete).length} of ${stages.length} stages complete</small></div><div class="module-detail-actions"><button class="primary-button" type="button" data-module-learn="${module.id}">Learn words</button><button class="quiet-button" type="button" data-module-practice="${module.id}">Practice</button></div>`;
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
  return '<article><strong lang="de">' + escapeHtml(example.de) + '</strong><span>' + escapeHtml(example.en) + '</span>' + (example.note ? '<small>' + escapeHtml(example.note) + '</small>' : "") + '</article>';
}

function renderLessonInteraction(step) {
  const target = $("#lessonInteraction");
  target.innerHTML = "";
  target.hidden = step.kind === "teach";
  if (step.kind === "choice") {
    const options = lessonOptionOrder(activeModule(), step, "choices", step.options);
    target.innerHTML = '<p class="lesson-prompt">' + escapeHtml(step.prompt) + '</p><div class="lesson-choices">' + options.map((option, index) => '<button type="button" data-lesson-choice="' + index + '">' + escapeHtml(option) + '</button>').join("") + '</div>';
    $$("[data-lesson-choice]").forEach(button => button.addEventListener("click", () => {
      lessonSelection = options[Number(button.dataset.lessonChoice)];
      $$("[data-lesson-choice]").forEach(item => item.classList.toggle("selected", item === button));
    }));
  }
  if (step.kind === "arrange") {
    const tokens = step.tokens.map((value, sourceIndex) => ({ id: `${sourceIndex}:${value}`, value, sourceIndex }));
    const orderedTokens = lessonOptionOrder(activeModule(), step, "tokens", tokens);
    target.innerHTML = '<p class="lesson-prompt">' + escapeHtml(step.prompt) + '</p><div class="lesson-builder" id="lessonBuilder"><span>Choose the words below.</span></div><div class="lesson-tiles">' + orderedTokens.map(token => '<button type="button" data-lesson-token="' + token.sourceIndex + '">' + escapeHtml(token.value) + '</button>').join("") + '</div><button class="lesson-clear" id="lessonClear" type="button">Clear</button>';
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
  $("#flashFront").textContent = unseen || direction === "german" ? word.de : word.en;
  $("#flashAnswer").textContent = unseen || direction === "german" ? word.en : word.de;
  $("#flashBundle").textContent = word.bundle;
  $("#flashExample").textContent = `${word.example} | ${word.exampleEn}`;
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
  $("#flashResultBundle").textContent = word.bundle;
  $("#flashResultExample").textContent = `${word.example} | ${word.exampleEn}`;
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
  $("#flashResultAnswer").textContent = cardDirectionFor() === "german" ? word.en : word.de;
  $("#flashResultBundle").textContent = word.bundle;
  $("#flashResultExample").textContent = `${word.example} | ${word.exampleEn}`;
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
  const coreCount = moduleCoreWords(module).length;
  const sentenceCount = module.questions.length;
  $("#assessmentIntro").hidden = false;
  $("#assessmentIntroTitle").textContent = `${module.code}: ${module.title}`;
  $("#assessmentIntroText").textContent = `${coreCount + sentenceCount + 3} responses cover ${coreCount} core vocabulary bundles, ${sentenceCount} sentence targets, one reading task, one structured writing task, and one speaking transcript.`;
  $("#assessmentRules").innerHTML = [
    "Answers are saved without correctness feedback during the attempt.",
    "Pass with 80% overall, plus 70% in vocabulary and sentences, 50% in reading, and 60% in structured writing and speaking.",
    "Your latest 10 completed attempts stay in your score history. A lower retake keeps your best score.",
    "Keyboard spellings such as ae, oe, ue, and ss receive full credit."
  ].map(rule => `<li>${escapeHtml(rule)}</li>`).join("");
  const archived = record.assessment.archive?.[record.assessment.archive.length - 1];
  const currentHistory = record.assessment.attempts.length
    ? `${record.assessment.attempts.length} prior attempt${record.assessment.attempts.length === 1 ? "" : "s"}. Best score: ${Math.round((record.assessment.bestScore || 0) * 100)}%.`
    : "";
  const archivedHistory = archived
    ? `This module now includes more material. Your earlier best score of ${Math.round((archived.bestScore || 0) * 100)}% is archived, and this assessment covers the expanded course.`
    : "";
  $("#assessmentPrior").hidden = !(currentHistory || archivedHistory);
  $("#assessmentPrior").textContent = currentHistory || archivedHistory;
}

function beginModuleAssessment() {
  $("#assessmentIntro").hidden = true;
  startQuiz(true);
}

function assessmentItemsFor(module, run) {
  const vocabularyItems = moduleCoreWords(module).map(word => ({
    id: `vocabulary:${word.id}`,
    kind: "vocabulary",
    type: "CORE VOCABULARY",
    context: "Write the taught German form. Include the article when the bundle shows one.",
    prompt: `Write the German for “${word.en}”.`,
    promptVariants: [
      `Recall “${word.en}” in German.`,
      `Give the complete taught German form for “${word.en}”.`
    ],
    answers: germanRecallAnswers(word),
    explanation: word.bundle
  }));
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
    sentenceItems.map(question => materializeQuestion(question, module.id, run, { assessment: true })),
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
    ...reading.map(question => materializeQuestion(question, module.id, run, { assessment: true })),
    ...writing.map(question => materializeQuestion(question, module.id, run, { assessment: true })),
    ...speaking.map(question => materializeQuestion(question, module.id, run, { assessment: true }))
  ];
}

function startQuiz(checkpoint) {
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
      source.map(question => materializeQuestion(question, module.id, run, { preserveSurface: !hasPriorSentencePractice })),
      `sentence-order:${module.id}`,
      run.random,
      { preserveFirst: !hasPriorSentencePractice }
    );
  quiz = { moduleId: module.id, checkpoint, assessment: checkpoint, questions, index: 0, firstCorrect: 0, recovered: 0, missed: [], responses: [], originalTotal: questions.length, retry: false, inlineRetry: false, flow: 0, maxFlow: 0, flowRewarded: false, stageCompletedNow: false };
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
  $("#quizMode").textContent = quiz.retry ? "REPAIR PASS" : quiz.assessment ? "MODULE ASSESSMENT" : "SENTENCE LAB";
  $("#quizProgress").textContent = `${quiz.index + 1} / ${quiz.questions.length}`;
  renderQuizFlow();
  $("#quizProgressBar").style.width = `${((quiz.index + 1) / quiz.questions.length) * 100}%`;
  $("#quizType").textContent = question.type;
  $("#quizContext").textContent = question.context;
  $("#quizPrompt").textContent = question.prompt;
  const support = quiz.assessment ? null : question.support;
  $("#quizSupport").hidden = !support;
  $("#quizSupport").innerHTML = support ? '<span>' + escapeHtml(support.title) + '</span><strong lang="de">' + escapeHtml(support.model) + '</strong><small>' + escapeHtml(support.translation) + '</small><p>' + escapeHtml(support.tip) + '</p>' : "";
  const sourceBank = quiz.assessment ? [] : (question.wordBank || []);
  const bank = sourceBank;
  $("#quizWordBank").hidden = bank.length === 0;
  $("#quizWordBank").innerHTML = bank.map(word => `<span>${escapeHtml(word)}</span>`).join("");
  $("#quizInput").value = "";
  $("#quizInput").disabled = false;
  $("#quizLongInput").value = "";
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

function gradeAssessmentResponse(question, value, module) {
  if (question.kind === "vocabulary") {
    const typed = normalizedRecall(value, "german");
    const answer = question.answers.find(candidate => normalizedRecall(candidate, "german") === typed);
    return { score: answer ? 1 : 0, correct: Boolean(answer), answer: question.answers[0] };
  }
  if (question.kind === "writing") {
    const score = writingAssessmentScore(module, value);
    return { score, correct: score >= 1, answer: module.task.model };
  }
  if (question.kind === "speaking") {
    const score = speakingAssessmentScore(module, value);
    return { score, correct: score >= 1, answer: module.task.speakingModel };
  }
  if (question.kind === "reading") return readingAnswerResult(value, question.answers, module.level, question.prompt, module.input.readRequired || []);
  const result = classifyAnswer(value, question.answers, module.level);
  return { score: result.correct ? 1 : 0, correct: result.correct, answer: result.answer };
}

function submitQuizAnswer(event) {
  event.preventDefault();
  const question = quiz.questions[quiz.index];
  const module = moduleById(quiz.moduleId);
  const value = question.longResponse ? $("#quizLongInput").value : $("#quizInput").value;
  if (!value.trim()) return;
  if (quiz.assessment) {
    const result = gradeAssessmentResponse(question, value, module);
    quiz.responses.push({ id: question.id, kind: question.kind, type: question.type, prompt: question.prompt, value, answer: result.answer, score: result.score, explanation: question.explanation || "" });
    const record = moduleRecord(module.id);
    record.started = true;
    saveState();
    quiz.index += 1;
    if (quiz.index >= quiz.questions.length) finishQuizSet();
    else renderQuestion();
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
  const sectionNames = ["vocabulary", "sentences", "reading", "writing", "speaking"];
  return Object.fromEntries(sectionNames.map(section => {
    const items = responses.filter(response => response.kind === section);
    return [section, items.length ? items.reduce((sum, response) => sum + response.score, 0) / items.length : 0];
  }));
}

function finishAssessment() {
  const module = moduleById(quiz.moduleId);
  const record = moduleRecord(module.id);
  const sections = assessmentSectionScores(quiz.responses);
  const score = sections.vocabulary * .25 + sections.sentences * .30 + sections.reading * .15 + sections.writing * .20 + sections.speaking * .10;
  const passed = score >= assessmentPassScore && sections.vocabulary >= .70 && sections.sentences >= .70 && sections.reading >= .50 && sections.writing >= .60 && sections.speaking >= .60;
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
  const floorsMet = [sections.vocabulary >= .70, sections.sentences >= .70, sections.reading >= .50, sections.writing >= .60, sections.speaking >= .60].filter(Boolean).length;
  const next = modules[modules.findIndex(item => item.id === module.id) + 1];
  $("#summaryText").textContent = courseComplete
    ? "Every module assessment is passed. Your complete pathway remains open for review."
    : levelComplete
      ? `Every ${module.level} module is passed. ${nextLevel ? `${nextLevel.id} is ready.` : "The complete pathway is checked off."}`
      : firstCompletion
        ? `You met the minimum in every section. ${next ? `${next.code} is ready.` : "The full course pathway is checked off."}`
        : personalBest
          ? `Up ${improvement} point${improvement === 1 ? "" : "s"} from your previous best. ${passed ? "You met the minimum in every section." : `${floorsMet} of 5 section minimums were reached.`}`
          : passed
            ? "You met the minimum in every section. This module is checked off."
            : `Passing requires 80% overall and each section minimum. ${floorsMet} of 5 section minimums were reached.`;
  $("#summaryCanDo").hidden = !passed;
  $("#summaryCanDo").innerHTML = passed ? module.canDo.slice(0, 4).map(item => `<li>${escapeHtml(item)}</li>`).join("") : "";
  $("#summaryCorrect").textContent = `${Math.round(score * 100)}%`;
  $("#summaryCorrectLabel").textContent = "latest score";
  $("#summaryRecovered").textContent = `${correct}/${quiz.responses.length}`;
  $("#summaryRecoveredLabel").textContent = "fully correct items";
  $("#summaryMissed").textContent = `${Math.round((record.assessment.bestScore || 0) * 100)}%`;
  $("#summaryMissedLabel").textContent = "best score";
  const sectionLabels = { vocabulary: "Vocabulary", sentences: "Sentence production", reading: "Reading", writing: "Structured writing", speaking: "Speaking transcript" };
  const missed = quiz.responses.filter(response => response.score < 1);
  $("#assessmentReview").hidden = false;
  $("#assessmentReview").innerHTML = '<h3>Section scores</h3><ol>' + Object.entries(sections).map(([key, value]) => `<li><strong>${sectionLabels[key]}: ${Math.round(value * 100)}%</strong></li>`).join("") + '</ol>' + (missed.length ? '<h3>Review after the attempt</h3><ol>' + missed.map(response => `<li><strong>${escapeHtml(response.prompt)}</strong><small>Your answer: ${escapeHtml(response.value)}</small><small>Reference answer: ${escapeHtml(response.answer)}</small></li>`).join("") + '</ol>' : '<p>Every scored item received full credit.</p>');
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
  const support = revealSupport ? `<div class="listening-transcript"><strong>Transcript</strong>${item.turns.map(turn => `<p><span>${escapeHtml(turn.speaker)}</span><q lang="de-DE">${escapeHtml(turn.text)}</q></p>`).join("")}</div>${contextNote}${strategyTip}` : "";
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
  $("#writingTask").hidden = false;
  $("#writingTitle").textContent = `${module.code}: ${module.title}`;
  $("#writingPrompt").textContent = task.writingPrompt;
  $("#writingGuide").innerHTML = task.guide.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  $("#writingInput").value = "";
  $("#writingCount").textContent = `0 words · target ${writingTargetLabel(task)}`;
  $("#writingFeedback").hidden = true;
  $("#writingActions").hidden = true;
  $("#writingInput").disabled = false;
  $("#checkWriting").disabled = false;
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

function renderSpeaking() {
  const module = activeModule();
  const task = module.task;
  $("#speakingTask").hidden = false;
  $("#speakingTitle").textContent = `${module.code}: Rehearse familiar phrases`;
  $("#speakingPrompt").textContent = task.speakingPrompt;
  const minimum = speakingMinimumWords(module);
  $("#speakingGuide").innerHTML = [...task.speakingGuide, `Use at least ${minimum} words in the transcript.`].map(item => `<li>${escapeHtml(item)}</li>`).join("");
  $("#speakingTranscript").value = "";
  $("#speakingFeedback").hidden = true;
  $("#speakingActions").hidden = true;
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
  const requirements = speakingChecks(module, text);
  const ratio = scoredChecklistRatio(requirements);
  recordActivityResult(module.id, "speaking", ratio);
  const feedback = $("#speakingFeedback");
  feedback.hidden = false;
  feedback.className = `task-feedback ${ratio === 1 ? "success" : "repair"}`;
  const model = ratio >= .5 ? `<p class="model"><strong>Model after submission:</strong> ${escapeHtml(task.speakingModel)}</p>` : "<p>The model appears after most required parts are present.</p>";
  feedback.innerHTML = `<h3>${ratio === 1 ? "The target phrases and response length are present." : "Repeat once with the missing parts."}</h3><ul>${requirements.map(item => `<li>${item.met ? "✓" : "○"} ${escapeHtml(item.item)}${item.detail ? `: ${escapeHtml(item.detail)}` : ""}</li>`).join("")}</ul><p>This transcript checks selected words, forms, and response length. Pronunciation quality is outside this check.</p>${model}`;
  $("#speakingActions").hidden = ratio < 1;
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
  const totalMatches = words.length;
  const visibleWords = words.slice(0, vocabVisibleLimit);
  $("#vocabMore").hidden = visibleWords.length >= totalMatches;
  $("#vocabMoreStatus").textContent = `Showing ${visibleWords.length} of ${totalMatches} matching cards`;
  $("#vocabRows").innerHTML = visibleWords.map(word => {
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
  $("#activityBack").addEventListener("click", renderPracticeMenu);
  $("#quizForm").addEventListener("submit", submitQuizAnswer);
  $("#quizTryAgain").addEventListener("click", retryCurrentQuizAnswer);
  $("#quizNext").addEventListener("click", nextQuizQuestion);
  $("#retryMissed").addEventListener("click", retryMissedQuestions);
  $("#retakeAssessment").addEventListener("click", retakeModuleAssessment);
  $("#beginAssessment").addEventListener("click", beginModuleAssessment);
  $("#nextModule").addEventListener("click", continueToNextModule);
  $("#finishQuiz").addEventListener("click", renderPracticeMenu);
  $("#listeningForm").addEventListener("submit", submitListening);
  $("#listeningRetry").addEventListener("click", retryListening);
  $("#listeningContinue").addEventListener("click", renderPracticeMenu);
  $("#listeningSpeed").addEventListener("change", event => {
    $("#listeningAudio").playbackRate = Number(event.target.value || 1);
  });
  $("#readingForm").addEventListener("submit", submitReading);
  $("#readingRetry").addEventListener("click", retryReading);
  $("#readingContinue").addEventListener("click", renderPracticeMenu);
  $("#writingInput").addEventListener("input", event => { $("#writingCount").textContent = `${countWords(event.target.value)} words · target ${writingTargetLabel(activeModule().task)}`; });
  $("#checkWriting").addEventListener("click", checkWriting);
  $("#writingRetry").addEventListener("click", retryWriting);
  $("#writingContinue").addEventListener("click", renderPracticeMenu);
  $("#startRecognition").addEventListener("click", startRecognition);
  $("#checkSpeaking").addEventListener("click", checkSpeaking);
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
