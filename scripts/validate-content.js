"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const errors = [];
const warnings = [];

const contentScripts = [
  "language-engine.js",
  "curriculum.js",
  "content-expansion.js",
  "pedagogy.js",
  "course-expansion.js",
  "mastery-expansion.js",
  "pathway-expansion-2.js",
  "lexicon-expansion-a0-a1.js",
  "lexicon-expansion-a2-b1.js",
  "lexicon-expansion-b2.js",
  "grammar-pathway-a0-a1.js",
  "grammar-pathway-a2-b1.js",
  "grammar-pathway-b2.js",
  "task-models.js",
  "practical-drills.js",
  "grammar-intensive-expansion.js",
  "task-checks.js",
  "reading-library.js",
  "audio-study.js",
  "listening-content.js"
];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function required(value, label) {
  if (value == null || value === "" || (Array.isArray(value) && value.length === 0)) fail(`${label} is missing`);
}

function duplicates(values) {
  const seen = new Set();
  const repeated = new Set();
  values.forEach(value => seen.has(value) ? repeated.add(value) : seen.add(value));
  return [...repeated];
}

function validateJavaScriptSyntax() {
  for (const entry of fs.readdirSync(dist, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".js")) continue;
    const file = path.join(dist, entry.name);
    try {
      new vm.Script(fs.readFileSync(file, "utf8"), { filename: entry.name });
    } catch (error) {
      fail(`${entry.name} has invalid JavaScript: ${error.message}`);
    }
  }
}

function validateProductCopy() {
  const copyFiles = fs.readdirSync(dist, { withFileTypes: true })
    .filter(entry => entry.isFile() && /\.(?:html|css|js)$/u.test(entry.name));
  copyFiles.forEach(entry => {
    const source = fs.readFileSync(path.join(dist, entry.name), "utf8");
    if (/[—–]/u.test(source)) fail(`${entry.name} contains a prohibited dash character`);
    if (/\bnot\b[^.!?\n]{0,90}\bbut\b/iu.test(source) || /\bit(?:'s| is) not\b/iu.test(source)) {
      fail(`${entry.name} contains a prohibited contrast construction`);
    }
  });
}

function validateGermanRegressionChecks() {
  const files = Object.fromEntries([
    "reading-library.js",
    "lexicon-expansion-b2.js",
    "grammar-pathway-b2.js",
    "grammar-pathway-a2-b1.js"
  ].map(name => [name, fs.readFileSync(path.join(dist, name), "utf8")]));
  const forbidden = [
    ["reading-library.js", /Der Anruf würde am Abend mindestens 140 Euro kosten/u, "The locksmith cost is assigned to the phone call"],
    ["reading-library.js", /teilt seine Beschäftigten zwischen Montag und Freitag als freien Tag auf/u, "The four-day-week reading contains an invalid free-day construction"],
    ["lexicon-expansion-b2.js", /formal response \/ correction/u, "Gegendarstellung is mistranslated as a correction"],
    ["grammar-pathway-b2.js", /der Adressat, die Adressatin/u, "Adressatin is incorrectly placed in the plural slot for Adressat"],
    ["grammar-pathway-b2.js", /Mehrere carries no case ending here/u, "The genitive ending on mehrerer is described incorrectly"],
    ["grammar-pathway-a2-b1.js", /List the four case-controlled actions/u, "The A2.40 reading asks for four actions although the text contains five"]
  ];
  forbidden.forEach(([name, pattern, message]) => {
    if (pattern.test(files[name])) fail(message);
  });
}

function validateDocumentShell() {
  const htmlPath = path.join(dist, "index.html");
  const html = fs.readFileSync(htmlPath, "utf8");
  const ids = [...html.matchAll(/\sid="([^"]+)"/gu)].map(match => match[1]);
  duplicates(ids).forEach(id => fail(`index.html repeats id: ${id}`));
  const localAssets = [...html.matchAll(/(?:src|href)="\.\/([^"?#]+)(?:[?#][^"]*)?"/gu)].map(match => match[1]);
  localAssets.forEach(asset => {
    if (!fs.existsSync(path.join(dist, asset))) fail(`index.html references missing local asset: ${asset}`);
  });
  if (!/<html\b[^>]*\blang="en"/iu.test(html)) fail("index.html needs a document language");
  if (!/\bid="quizAudio"/u.test(html)) fail("index.html needs the closed-assessment audio player");
}

function validateAssessmentListeningCoverage(listening) {
  const app = fs.readFileSync(path.join(dist, "app.js"), "utf8");
  if (!/function\s+assessmentListeningItem\s*\(/u.test(app)) fail("Module assessments do not build listening items");
  if (!/question\.kind\s*===\s*"listening"/u.test(app)) fail("Module assessments do not grade listening responses");
  if (!/sectionNames\s*=\s*\[[^\]]*"listening"/su.test(app)) fail("Module assessment section scores omit listening");
  if (!/quizAudioWrap/u.test(app)) fail("Module assessments do not render listening audio");
  if ((listening?.items || []).length && !/The listening transcript stays closed during the assessment\./u.test(app)) {
    fail("Module assessment instructions do not explain the closed listening transcript");
  }
}

function validateSpeechSafeguards() {
  const app = fs.readFileSync(path.join(dist, "app.js"), "utf8");
  const speech = fs.readFileSync(path.join(dist, "speech-transcriber.js"), "utf8");
  if (!/DEFAULT_MAX_DURATION_MS\s*=\s*60000/u.test(speech)) fail("Local speech default duration is below 60 seconds");
  if (!/MAX_RECORDING_DURATION_MS\s*=\s*90000/u.test(speech)) fail("Local speech hard limit is below 90 seconds");
  if (!/\["A0",\s*"A1"\]\.includes\(module\.level\)\)\s*return\s+60000/u.test(app)) fail("A0 and A1 speech time is not 60 seconds");
  if (!/module\.level\s*===\s*"A2"\)\s*return\s+75000/u.test(app)) fail("A2 speech time is not 75 seconds");
  if (!/return\s+90000/u.test(app)) fail("B1 and B2 speech time is not 90 seconds");
  if (!/worker\.terminate\(\)/u.test(speech) || !/this\.worker\s*===\s*worker\)\s*this\.worker\s*=\s*null/u.test(speech)) {
    fail("Fatal local speech worker errors do not create a clean retry path");
  }
}

function loadContent() {
  const context = { window: {} };
  context.window.window = context.window;
  vm.createContext(context);
  for (const name of contentScripts) {
    const file = path.join(dist, name);
    if (!fs.existsSync(file)) {
      fail(`Required content script is missing: ${name}`);
      continue;
    }
    try {
      vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: name });
    } catch (error) {
      fail(`${name} failed while assembling the course: ${error.stack || error.message}`);
      break;
    }
  }
  return context.window;
}

function validateModules(course) {
  const modules = course?.modules || [];
  required(modules, "Course modules");
  const ids = modules.map(module => module.id);
  const codes = modules.map(module => module.code);
  duplicates(ids).forEach(id => fail(`Duplicate module id: ${id}`));
  duplicates(codes).forEach(code => fail(`Duplicate module code: ${code}`));
  const idSet = new Set(ids);
  const validLevels = new Set(["A0", "A1", "A2", "B1", "B2"]);

  modules.forEach((module, moduleIndex) => {
    const label = module.id || `module ${moduleIndex + 1}`;
    required(module.id, `${label} id`);
    required(module.code, `${label} code`);
    required(module.title, `${label} title`);
    if (!validLevels.has(module.level)) fail(`${label} has invalid level: ${module.level}`);
    if (module.prerequisite && !idSet.has(module.prerequisite)) fail(`${label} has missing prerequisite: ${module.prerequisite}`);

    const words = module.words || [];
    const wordIds = words.map(word => word.id);
    required(words, `${label} words`);
    duplicates(wordIds).forEach(id => fail(`${label} has duplicate word id: ${id}`));
    const wordIdSet = new Set(wordIds);
    words.forEach((word, wordIndex) => {
      const wordLabel = `${label} word ${word.id || wordIndex + 1}`;
      required(word.id, `${wordLabel} id`);
      required(word.de, `${wordLabel} German form`);
      required(word.en, `${wordLabel} meaning`);
      required(word.bundle, `${wordLabel} bundle`);
      required(word.example, `${wordLabel} example`);
    });

    const questions = module.questions || [];
    required(questions, `${label} questions`);
    duplicates(questions.map(question => question.id)).forEach(id => fail(`${label} has duplicate question id: ${id}`));
    questions.forEach((question, questionIndex) => {
      const questionLabel = `${label} question ${question.id || questionIndex + 1}`;
      required(question.id, `${questionLabel} id`);
      required(question.prompt, `${questionLabel} prompt`);
      required(question.answers, `${questionLabel} answers`);
      (question.requires || []).forEach(wordId => {
        if (!wordIdSet.has(wordId)) fail(`${questionLabel} requires missing word id: ${wordId}`);
      });
    });

    required(module.input?.passage, `${label} reading passage`);
    required(module.input?.readPrompt, `${label} reading prompt`);
    required(module.input?.readAnswers, `${label} reading answers`);
    required(module.task?.writingPrompt, `${label} writing prompt`);
    required(module.task?.model, `${label} writing model`);
    required(module.task?.speakingPrompt, `${label} speaking prompt`);
    required(module.task?.speakingModel, `${label} speaking model`);
    required(module.task?.checks, `${label} writing checks`);
    required(module.culture?.title, `${label} culture title`);
    required(module.culture?.url, `${label} culture source`);
  });

  const counts = Object.fromEntries([...validLevels].map(level => [level, modules.filter(module => module.level === level).length]));
  [...validLevels].forEach(level => {
    if (!counts[level]) fail(`Course has no ${level} modules`);
  });
  return { modules, counts };
}

function validateReadings(readings) {
  required(readings, "Graded readings");
  duplicates(readings.map(reading => reading.id)).forEach(id => fail(`Duplicate reading id: ${id}`));
  readings.forEach((reading, readingIndex) => {
    const label = reading.id || `reading ${readingIndex + 1}`;
    required(reading.id, `${label} id`);
    required(reading.level, `${label} level`);
    required(reading.title, `${label} title`);
    required(reading.genre, `${label} genre`);
    required(reading.sections, `${label} sections`);
    required(reading.questions, `${label} questions`);
    if (reading.questions?.length < 3) fail(`${label} needs at least three comprehension questions`);
    if (["A0", "A1"].includes(reading.level) && !reading.glossary?.length) fail(`${label} needs beginner glossary support`);
    if (!(reading.passScore > 0 && reading.passScore <= 1)) fail(`${label} has invalid passScore: ${reading.passScore}`);
    reading.questions.forEach((question, questionIndex) => {
      const questionLabel = `${label} question ${questionIndex + 1}`;
      required(question.prompt, `${questionLabel} prompt`);
      required(question.evidence, `${questionLabel} evidence`);
      if (question.type === "choice") {
        required(question.options, `${questionLabel} choices`);
        if (question.options?.length < 3) fail(`${questionLabel} needs at least three choices`);
        duplicates(question.options || []).forEach(option => fail(`${questionLabel} repeats choice: ${option}`));
        if (!question.options?.includes(question.answer)) fail(`${questionLabel} answer is absent from its options`);
      } else {
        required(question.answers, `${questionLabel} answers`);
        required(question.required, `${questionLabel} required evidence groups`);
        question.required?.flat().forEach((pattern, patternIndex) => {
          try { new RegExp(pattern, "iu"); } catch (error) { fail(`${questionLabel} has invalid evidence pattern ${patternIndex + 1}: ${error.message}`); }
        });
      }
    });
  });
  const levelCounts = Object.fromEntries(["A0", "A1", "A2", "B1", "B2"].map(level => [level, readings.filter(reading => reading.level === level).length]));
  Object.entries(levelCounts).forEach(([level, count]) => {
    if (count < 7) fail(`Graded reading coverage is too low for ${level}: ${count}`);
  });
}

function validateLanguageEngine(course, engine) {
  required(engine, "Language engine");
  if (!engine) return { nouns: 0, verbs: 0, prepositions: 0, connectors: 0, adverbs: 0, profiles: 0, practice: 0, assessment: 0 };
  if (typeof engine.candidatesFor !== "function") fail("Language engine cannot generate candidates");
  if (typeof engine.validate !== "function") fail("Language engine has no validation routine");
  const engineErrors = typeof engine.validate === "function" ? engine.validate(course) : [];
  engineErrors.forEach(message => fail(message));
  const stats = typeof engine.stats === "function" ? engine.stats() : {};
  if (Number(stats.nouns || 0) < 30) fail(`Language engine noun ontology is too small: ${stats.nouns || 0}`);
  if (Number(stats.verbs || 0) < 15) fail(`Language engine verb ontology is too small: ${stats.verbs || 0}`);
  if (Number(stats.prepositions || 0) < 12) fail(`Language engine preposition ontology is too small: ${stats.prepositions || 0}`);
  if (Number(stats.connectors || 0) < 10) fail(`Language engine connector ontology is too small: ${stats.connectors || 0}`);
  if (Number(stats.adverbs || 0) < 10) fail(`Language engine adverb ontology is too small: ${stats.adverbs || 0}`);
  if (Number(stats.profiles || 0) < 30) fail(`Language engine question coverage is too small: ${stats.profiles || 0}`);
  if (Number(stats.assessment || 0) < 30) fail(`Language engine held-out assessment pool is too small: ${stats.assessment || 0}`);
  return stats;
}

function wavDuration(file) {
  const data = fs.readFileSync(file);
  if (data.length < 44 || data.toString("ascii", 0, 4) !== "RIFF" || data.toString("ascii", 8, 12) !== "WAVE") {
    fail(`${path.relative(root, file)} is not a valid WAV container`);
    return 0;
  }
  const byteRate = data.readUInt32LE(28);
  let offset = 12;
  while (offset + 8 <= data.length) {
    const chunk = data.toString("ascii", offset, offset + 4);
    const size = data.readUInt32LE(offset + 4);
    if (chunk === "data") return byteRate ? size / byteRate : 0;
    offset += 8 + size + (size % 2);
  }
  fail(`${path.relative(root, file)} has no WAV data chunk`);
  return 0;
}

function validateListening(course, listening) {
  const items = listening?.items || [];
  required(items, "Listening items");
  duplicates(items.map(item => item.id)).forEach(id => fail(`Duplicate listening id: ${id}`));
  duplicates(items.map(item => item.moduleId)).forEach(id => fail(`More than one listening item targets module: ${id}`));
  duplicates(items.map(item => item.src || `./audio/listening/${item.id}.wav`)).forEach(source => fail(`More than one listening item uses audio: ${source}`));
  const moduleIds = new Set((course?.modules || []).map(module => module.id));
  const speakerVoices = new Map();
  let seconds = 0;
  items.forEach((item, itemIndex) => {
    const label = item.id || `listening item ${itemIndex + 1}`;
    required(item.id, `${label} id`);
    if (!moduleIds.has(item.moduleId)) fail(`${label} targets missing module: ${item.moduleId}`);
    required(item.turns, `${label} turns`);
    required(item.prompt, `${label} prompt`);
    required(item.answers, `${label} answers`);
    if (!item.turns || item.turns.length < 2) fail(`${label} needs at least two spoken turns`);
    item.turns?.forEach((turn, turnIndex) => {
      required(turn.speaker, `${label} turn ${turnIndex + 1} speaker`);
      required(turn.voice, `${label} turn ${turnIndex + 1} voice`);
      required(turn.text, `${label} turn ${turnIndex + 1} text`);
      if (!["female", "male"].includes(turn.voice)) fail(`${label} turn ${turnIndex + 1} has unsupported voice: ${turn.voice}`);
      if (/^Frau\b/u.test(turn.speaker) && turn.voice !== "female") fail(`${label} assigns ${turn.speaker} to a male voice`);
      if (/^Herr\b/u.test(turn.speaker) && turn.voice !== "male") fail(`${label} assigns ${turn.speaker} to a female voice`);
      const establishedVoice = speakerVoices.get(turn.speaker);
      if (establishedVoice && establishedVoice !== turn.voice) fail(`${turn.speaker} changes from ${establishedVoice} to ${turn.voice} across dialogues`);
      speakerVoices.set(turn.speaker, turn.voice);
    });
    item.requirements?.flatMap(requirement => requirement.patterns || []).forEach((pattern, patternIndex) => {
      try { new RegExp(pattern, "iu"); } catch (error) { fail(`${label} has invalid answer pattern ${patternIndex + 1}: ${error.message}`); }
    });
    const source = item.src || `./audio/listening/${item.id}.wav`;
    const file = path.join(dist, source.replace(/^\.\//u, ""));
    if (!fs.existsSync(file)) fail(`${label} audio is missing: ${source}`);
    else {
      const duration = wavDuration(file);
      seconds += duration;
      if (duration < 3) warn(`${label} is only ${duration.toFixed(1)} seconds long`);
    }
  });
  const levelCounts = Object.fromEntries(["A0", "A1", "A2", "B1", "B2"].map(level => [level, items.filter(item => item.level === level).length]));
  Object.entries(levelCounts).forEach(([level, count]) => {
    if (count < 8) fail(`Listening coverage is too low for ${level}: ${count}`);
  });
  return { items, seconds };
}

validateJavaScriptSyntax();
validateProductCopy();
validateGermanRegressionChecks();
validateDocumentShell();
validateSpeechSafeguards();
const assembled = loadContent();
const course = assembled.SATZWERK_CURRICULUM;
const moduleResult = validateModules(course);
const languageEngineResult = validateLanguageEngine(course, assembled.SATZWERK_LANGUAGE_ENGINE);
validateReadings(assembled.SATZWERK_READINGS || []);
const listeningResult = validateListening(course, assembled.SATZWERK_MODULE_AUDIO || {});
validateAssessmentListeningCoverage(assembled.SATZWERK_MODULE_AUDIO || {});

const readings = assembled.SATZWERK_READINGS || [];
const totalWords = moduleResult.modules.reduce((sum, module) => sum + module.words.length, 0);
const totalQuestions = moduleResult.modules.reduce((sum, module) => sum + module.questions.length, 0);
const regressionFloors = [
  [moduleResult.modules.length, 187, "modules"],
  [totalWords, 5124, "vocabulary bundles"],
  [totalQuestions, 3657, "typed questions"],
  [readings.length, 39, "graded readings"],
  [listeningResult.items.length, 40, "listening items"],
  [listeningResult.seconds, 780, "seconds of listening audio"]
];
regressionFloors.forEach(([actual, minimum, label]) => {
  if (actual < minimum) fail(`Coverage regression: found ${actual} ${label}; expected at least ${minimum}`);
});

warnings.forEach(message => console.warn(`WARNING: ${message}`));
const coverageLines = [
  `Modules: ${moduleResult.modules.length} (${Object.entries(moduleResult.counts).map(([level, count]) => `${level} ${count}`).join(", ")})`,
  `Vocabulary bundles: ${totalWords}`,
  `Typed questions: ${totalQuestions}`,
  `Language engine: ${languageEngineResult.nouns} nouns, ${languageEngineResult.verbs} verbs, ${languageEngineResult.prepositions} prepositions, ${languageEngineResult.connectors} connectors, ${languageEngineResult.adverbs} adverbs`,
  `Generated variation: ${languageEngineResult.profiles} profiles, ${languageEngineResult.practice} practice variants, ${languageEngineResult.assessment} held-out assessment variants`,
  `Graded readings: ${readings.length} (${readings.reduce((sum, reading) => sum + Number(reading.wordCount || 0), 0).toLocaleString("en-US")} words, ${readings.reduce((sum, reading) => sum + reading.questions.length, 0)} questions)`,
  `Listening items: ${listeningResult.items.length} (${listeningResult.items.reduce((sum, item) => sum + item.turns.length, 0)} turns, ${(listeningResult.seconds / 60).toFixed(1)} minutes)`
];
if (errors.length) {
  coverageLines.forEach(line => console.log(line));
  errors.forEach(message => console.error(`ERROR: ${message}`));
  console.error(`\nContent validation failed with ${errors.length} error${errors.length === 1 ? "" : "s"}.`);
  process.exitCode = 1;
} else {
  console.log("Satzwerk content validation passed.");
  coverageLines.forEach(line => console.log(line));
}
