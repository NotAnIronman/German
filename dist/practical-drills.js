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

  course.modules.forEach(module => {
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
    ].filter(word => !existingAnswers.has(answerKey(word.example)));

    let candidateIndex = 0;
    while (module.questions.length < targetPromptCount && candidateIndex < candidates.length) {
      const word = candidates[candidateIndex++];
      const baseId = `field-recall-${word.id}`;
      let id = baseId;
      let suffix = 2;
      while (module.questions.some(question => question.id === id)) id = `${baseId}-${suffix++}`;
      module.questions.push({
        id,
        type: "ACTIVE RECALL",
        context: contexts[module.level],
        prompt: `Write the German sentence you would use for: ${word.exampleEn}`,
        answers: [word.example],
        explanation: `The useful bundle is ${word.bundle}.`,
        requires: [word.id],
        wordBank: []
      });
      existingAnswers.add(answerKey(word.example));
    }

    if (!module.task.checks?.length) {
      const nounWords = [...new Set(module.words.map(nounHead).filter(Boolean))].slice(0, 12);
      const requiredLabel = item => {
        const match = module.words.find(word => answerKey(`${word.de} ${word.bundle}`).includes(answerKey(item)));
        return match ? `Use ${match.de}` : `Include ${item}`;
      };
      module.task.checks = [
        { label: `Write at least ${module.task.minWords} words`, type: "minWords", value: module.task.minWords },
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
        }] : [])
      ];
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
          .replace(/[.!?]/gu, "")
          .split(/\s+/u)
          .filter(Boolean);
        question.wordBank = [...new Set(words)].sort((a, b) => a.localeCompare(b, "de"));
      }
      if (!question.support) {
        const model = module.grammar
          .map(card => card.example)
          .find(example => example && !(question.answers || []).includes(example)) || "Use the pattern from the guided lesson.";
        question.support = {
          title: "Use the taught pattern",
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
})();
