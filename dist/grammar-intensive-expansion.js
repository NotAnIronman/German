(function () {
  "use strict";

  const course = window.SATZWERK_CURRICULUM;
  if (!course?.modules) throw new Error("Satzwerk curriculum must load before the grammar intensive expansion");
  if (course.grammarIntensiveExpansion?.version === 1) return;

  const rank = { A0: 0, A1: 1, A2: 2, B1: 3, B2: 4 };
  const unique = values => [...new Set(values.filter(Boolean))];
  const asciiGerman = value => String(value || "")
    .replaceAll("Ä", "Ae").replaceAll("Ö", "Oe").replaceAll("Ü", "Ue")
    .replaceAll("ä", "ae").replaceAll("ö", "oe").replaceAll("ü", "ue")
    .replaceAll("ß", "ss");
  const answersWithKeyboardForms = values => unique(values.flatMap(value => [value, asciiGerman(value)]));
  const moduleNumber = module => Number(String(module.code || "").split(".")[1]) || 0;

  const dictionaryNoun = word => {
    const source = String(word.de || "").trim();
    const bundle = String(word.bundle || "").trim();
    const metadata = `${source} ${bundle}`;
    if (/\b(?:nur\s+Plural|plural only)\b/iu.test(metadata)) return null;
    const match = source.match(/^(der|die|das)\s+([A-ZÄÖÜ][\p{L}-]*)(?=,|$)/u);
    if (!match) return null;
    const form = `${match[1].toLocaleLowerCase("de-DE")} ${match[2]}`;
    if (!source.includes(",") && !bundle.startsWith(form)) return null;
    const pluralMatch = source.match(/,\s*die\s+([A-ZÄÖÜ][\p{L}-]*)/u);
    const obliqueEndingRequired = pluralMatch
      && (pluralMatch[1] === `${match[2]}n` || pluralMatch[1] === `${match[2]}en`);
    return {
      article: match[1].toLocaleLowerCase("de-DE"),
      noun: match[2],
      form,
      meaning: String(word.en || "").trim(),
      wordId: word.id,
      caseSafe: !obliqueEndingRequired
    };
  };

  const articleByCase = {
    nominative: { der: "der", die: "die", das: "das" },
    accusative: { der: "den", die: "die", das: "das" },
    dative: { der: "dem", die: "der", das: "dem" }
  };

  const articleSurface = noun => ({
    prompt: `Which nominative article belongs to “${noun.noun}”? Write only the article.`,
    context: `The noun means “${noun.meaning}”. Retrieve its gender before building a sentence.`,
    answers: [noun.article],
    wordBank: ["der", "die", "das"],
    requires: [noun.wordId],
    explanation: `${noun.form} is stored as one vocabulary bundle.`,
    support: {
      title: "Retrieve the noun's gender",
      model: "der · die · das",
      translation: "",
      tip: "Say the article and noun together when you review the answer."
    }
  });

  const caseSurface = (noun, grammaticalCase, level) => {
    const article = articleByCase[grammaticalCase][noun.article];
    const answer = `${article} ${noun.noun}`;
    const caseLabel = grammaticalCase === "accusative" ? "accusative" : "dative";
    const cue = grammaticalCase === "accusative" ? "für takes the accusative" : "mit takes the dative";
    const prompt = rank[level] <= rank.A1
      ? `Change “${noun.form}” to ${caseLabel} singular. Write the article and noun.`
      : `Complete the noun phrase after the cue “${grammaticalCase === "accusative" ? "für" : "mit"}”: ${grammaticalCase === "accusative" ? "für" : "mit"} ___. Write the article and noun meaning “${noun.meaning}”.`;
    return {
      prompt,
      context: `${cue}. The dictionary bundle is ${noun.form}, meaning “${noun.meaning}”.`,
      answers: answersWithKeyboardForms([answer]),
      wordBank: unique([article, noun.noun, "der", "die", "das", "den", "dem"]),
      requires: [noun.wordId],
      explanation: `${noun.article} changes to ${article} in ${caseLabel} singular.`,
      support: {
        title: `Build the ${caseLabel} noun phrase`,
        model: grammaticalCase === "accusative" ? "der → den · die → die · das → das" : "der → dem · die → der · das → dem",
        translation: "",
        tip: `Choose the case first, then apply it to the stored gender of ${noun.noun}.`
      }
    };
  };

  const sentenceCandidate = (word, level) => {
    const sentence = String(word.example || "").trim();
    const translation = String(word.exampleEn || "").trim();
    const tokens = sentence.replace(/[.!?]+$/u, "").split(/\s+/u).filter(Boolean);
    const upperLimit = rank[level] <= rank.A1 ? 13 : rank[level] === rank.A2 ? 17 : 22;
    if (!translation || tokens.length < 4 || tokens.length > upperLimit || /[“”„";]/u.test(sentence)) return null;
    const pivot = Math.max(1, Math.floor(tokens.length / 2));
    const scrambled = [...tokens.slice(pivot), ...tokens.slice(0, pivot)];
    return {
      wordId: word.id,
      sentence,
      translation,
      wordBank: scrambled
    };
  };

  const structureSurface = (item, level) => ({
    prompt: `Build the complete German sentence for: ${item.translation}`,
    context: "Use every supplied word. Check the finite verb position, the middle field, and the final punctuation.",
    answers: answersWithKeyboardForms([
      item.sentence,
      ...(rank[level] <= rank.A2 ? [item.sentence.replace(/[.!?]+$/u, "")] : [])
    ]),
    wordBank: item.wordBank,
    requires: [item.wordId],
    explanation: "Read the completed sentence aloud and listen for the position of the finite verb.",
    support: {
      title: "Build the sentence frame",
      model: "position 1 · finite verb · subject and details · final verb part",
      translation: "",
      tip: "A statement keeps its finite verb in position two. A dependent clause sends its finite verb to the end."
    }
  });

  const addRotatingQuestion = (module, id, type, surfaces) => {
    if (!surfaces.length || module.questions.some(question => question.id === id)) return false;
    const [base, ...variants] = surfaces;
    module.questions.push({ id, type, ...base, promptVariants: [], contextVariants: [], surfaceVariants: variants });
    return true;
  };

  const stats = { modules: 0, articleQuestions: 0, accusativeQuestions: 0, dativeQuestions: 0, structureQuestions: 0, surfaces: 0 };

  course.modules.forEach(module => {
    const coreWords = (module.words || []).filter(word => !word.supplemental);
    const allNouns = [...new Map(coreWords.map(dictionaryNoun).filter(Boolean).map(noun => [noun.form, noun])).values()];
    const nouns = allNouns.slice(0, 8);
    const caseNouns = allNouns.filter(noun => noun.caseSafe).slice(0, 8);
    const sentences = coreWords.map(word => sentenceCandidate(word, module.level)).filter(Boolean).slice(0, 8);
    let added = 0;

    if (nouns.length) {
      const articleSurfaces = nouns.map(articleSurface);
      if (addRotatingQuestion(module, "grammar-gender-rotation", "ARTICLE AND GENDER", articleSurfaces)) {
        stats.articleQuestions += 1;
        stats.surfaces += articleSurfaces.length;
        added += 1;
      }

      if (rank[module.level] >= rank.A1 && caseNouns.length) {
        const accusativeSurfaces = caseNouns.map(noun => caseSurface(noun, "accusative", module.level));
        if (addRotatingQuestion(module, "grammar-accusative-rotation", "CASE CONTROL", accusativeSurfaces)) {
          stats.accusativeQuestions += 1;
          stats.surfaces += accusativeSurfaces.length;
          added += 1;
        }
      }

      const dativeIsReady = rank[module.level] >= rank.A2 || (module.level === "A1" && moduleNumber(module) >= 4);
      if (dativeIsReady && caseNouns.length) {
        const dativeSurfaces = caseNouns.map(noun => caseSurface(noun, "dative", module.level));
        if (addRotatingQuestion(module, "grammar-dative-rotation", "CASE CONTROL", dativeSurfaces)) {
          stats.dativeQuestions += 1;
          stats.surfaces += dativeSurfaces.length;
          added += 1;
        }
      }
    }

    if (sentences.length) {
      const structureSurfaces = sentences.map(item => structureSurface(item, module.level));
      if (addRotatingQuestion(module, "grammar-sentence-frame-rotation", "WORD ORDER", structureSurfaces)) {
        stats.structureQuestions += 1;
        stats.surfaces += structureSurfaces.length;
        added += 1;
      }
    }

    if (added) stats.modules += 1;
  });

  course.grammarIntensiveExpansion = { version: 1, ...stats };
})();
