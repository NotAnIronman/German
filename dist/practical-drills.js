(function () {
  const course = window.SATZWERK_CURRICULUM;
  if (!course?.modules) throw new Error("Satzwerk curriculum must load before practical drills");

  const rank = { A0: 0, A1: 1, A2: 2, B1: 3, B2: 4 };
  const targetPromptCount = 10;
  const contexts = {
    A0: "Use a short sentence from this lesson in a familiar exchange.",
    A1: "You need a complete sentence during an everyday exchange.",
    A2: "A familiar situation changes and you respond with a complete sentence.",
    B1: "You explain a practical detail clearly in conversation.",
    B2: "You choose precise wording for a detailed exchange."
  };

  const answerKey = value => String(value || "")
    .toLocaleLowerCase("de-DE")
    .replace(/[.!?,;:]/gu, "")
    .replace(/\s+/gu, " ")
    .trim();

  const writingPattern = value => String(value || "")
    .replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")
    .replace(/ä/giu, "(?:ä|ae)")
    .replace(/ö/giu, "(?:ö|oe)")
    .replace(/ü/giu, "(?:ü|ue)")
    .replace(/ß/giu, "(?:ß|ss)");

  const nounHead = word => {
    const match = String(word.de || "").match(/^(?:der|die|das)\s+([A-ZÄÖÜ][\p{L}-]*)/u);
    return match ? match[1] : "";
  };

  const modelSentenceCue = word => {
    const german = String(word.example || "");
    const notes = [];
    if (/\b(?:Sie|Ihnen|Ihr(?:e|en|er|es|em)?)\b/u.test(german)) notes.push("Use formal Sie.");
    else if (/\b(?:du|dich|dir|dein(?:e|en|er|es|em)?)\b/iu.test(german) || /^(?:Komm|Bring|Nimm|Gib|Mach|Sei|Hab|Fahr|Geh|Lies|Sprich|Ruf|Hör|Schreib|Sag|Hilf|Bleib)\b/u.test(german)) notes.push("Use informal du.");
    const genderPair = String(word.bundle || "").match(/\bder\s+([A-ZÄÖÜ][\p{L}-]+).*?\bdie\s+([A-ZÄÖÜ][\p{L}-]+in)\b/u);
    if (genderPair && new RegExp(`\\b${genderPair[2]}\\b`, "u").test(german)) notes.push("The person is a woman.");
    else if (genderPair && new RegExp(`\\b${genderPair[1]}\\b`, "u").test(german)) notes.push("The person is a man.");
    return `${word.exampleEn}${notes.length ? ` ${notes.join(" ")}` : ""}`;
  };

  course.modules.forEach(module => {
    const rangeMatch = module.task.writingPrompt.match(/\b(\d+)\s+to\s+(\d+)\s+words?\b/iu)
      || module.task.writingPrompt.match(/\bbetween\s+(\d+)\s+and\s+(\d+)\s+words?\b/iu);
    if (rangeMatch) {
      module.task.minWords = Number(rangeMatch[1]);
      module.task.maxWords = Number(rangeMatch[2]);
    }
    const requiredWordIds = new Set(module.questions.flatMap(question => question.requires || []));
    module.words.forEach(word => {
      if (requiredWordIds.has(word.id)) word.supplemental = false;
    });
    const existingAnswers = new Set(module.questions.flatMap(question => question.answers || []).map(answerKey));
    const usedWords = new Set(module.questions.flatMap(question => question.requires || []));
    const coreWords = module.words.filter(word => !word.supplemental && word.example && word.exampleEn);
    const candidates = [
      ...coreWords.filter(word => !usedWords.has(word.id)),
      ...coreWords.filter(word => usedWords.has(word.id))
    ].filter(word => !existingAnswers.has(answerKey(word.example))
      && answerKey(word.example) !== answerKey(word.bundle)
      && answerKey(word.example) !== answerKey(word.de));

    let candidateIndex = 0;
    while (module.questions.length < targetPromptCount && candidateIndex < candidates.length) {
      const word = candidates[candidateIndex++];
      const baseId = `field-recall-${word.id}`;
      let id = baseId;
      let suffix = 2;
      while (module.questions.some(question => question.id === id)) id = `${baseId}-${suffix++}`;
      const supportModel = [word.bundle, word.de].find(candidate => candidate && ![word.example, ...(word.variants || [])].some(answer => answerKey(answer) === answerKey(candidate))) || "Review the taught bundle in the guided lesson.";
      module.questions.push({
        id,
        type: "ACTIVE RECALL",
        context: `${contexts[module.level]} Rebuild the model sentence with the same people, register, and gender shown in the bundle.`,
        prompt: `Use “${word.bundle}” to recall the model sentence for: ${modelSentenceCue(word)}`,
        answers: [word.example],
        explanation: `The useful bundle is ${word.bundle}.`,
        requires: [word.id],
        wordBank: [],
        support: {
          title: "Use the taught bundle",
          model: supportModel,
          tip: modelSentenceCue(word)
        }
      });
      existingAnswers.add(answerKey(word.example));
    }

    if (!module.task.checks?.length) {
      const nounWords = [...new Set(module.words.map(nounHead).filter(Boolean))].slice(0, 12);
      const requiredLabel = item => `Include ${Array.isArray(item) ? item.join(" or ") : item}`;
      module.task.checks = [
        { label: `Write at least ${module.task.minWords} words`, type: "minWords", value: module.task.minWords },
        ...(module.task.maxWords ? [{ label: `Write no more than ${module.task.maxWords} words`, type: "maxWords", value: module.task.maxWords }] : []),
        ...(module.task.required || []).map(item => ({
          label: requiredLabel(item),
          type: "regex",
          pattern: writingPattern(item),
          flags: "iu"
        })),
        { label: "Finish each sentence or line with punctuation", type: "punctuatedLines", required: rank[module.level] < rank.A2 ? false : true },
        ...(nounWords.length ? [{
          label: "Capitalize the German nouns used in this module",
          type: "capitalization",
          words: nounWords,
          required: rank[module.level] < rank.A2 ? false : true
        }] : rank[module.level] < rank.A2 ? [{
          label: "Use the taught capitalization",
          type: "capitalization",
          words: [],
          required: false
        }] : [])
      ];
    } else if (module.task.maxWords && !module.task.checks.some(check => check.type === "maxWords")) {
      module.task.checks.push({ label: `Write no more than ${module.task.maxWords} words`, type: "maxWords", value: module.task.maxWords });
    }
  });

  const a0Modules = course.modules
    .filter(module => module.level === "A0")
    .sort((a, b) => Number(a.code.split(".")[1]) - Number(b.code.split(".")[1]));

  a0Modules.forEach((module, index) => {
    if (index > 0) module.prerequisite = a0Modules[index - 1].id;
    module.questions.forEach(question => {
      if (!question.wordBank?.length) {
        const words = question.answers[0]
          .replace(/[.!?]+$/gu, "")
          .split(/\s+/u)
          .filter(Boolean);
        question.wordBank = [...new Set(words)].sort((a, b) => a.localeCompare(b, "de"));
      }
      if (!question.support) {
        const bundleModel = (question.requires || [])
          .map(id => module.words.find(word => word.id === id)?.bundle)
          .filter(Boolean)
          .join(" · ") || "Use the pattern from the guided lesson.";
        const model = (question.answers || []).some(answer => answerKey(answer) === answerKey(bundleModel)) ? "Review the taught bundle in the guided lesson." : bundleModel;
        question.support = {
          title: "Use the taught bundle",
          model,
          tip: question.explanation
        };
      }
    });
  });

  course.modules.sort((a, b) => {
    const levelDifference = rank[a.level] - rank[b.level];
    if (levelDifference) return levelDifference;
    return Number(a.code.split(".")[1]) - Number(b.code.split(".")[1]);
  });

  course.modules.forEach((module, index) => {
    if (index === 0) delete module.prerequisite;
    else module.prerequisite = course.modules[index - 1].id;
  });
})();
