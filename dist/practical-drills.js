(function () {
  const course = window.SATZWERK_CURRICULUM;
  if (!course?.modules) throw new Error("Satzwerk curriculum must load before practical drills");

  const rank = { A0: 0, A1: 1, A2: 2, B1: 3, B2: 4 };
  const targetPromptCount = { A0: 13, A1: 14, A2: 15, B1: 16, B2: 16 };
  const contexts = {
    A0: "Use a short sentence from this lesson in a familiar exchange.",
    A1: "You need a complete sentence during an everyday exchange.",
    A2: "A familiar situation changes and you respond with a complete sentence.",
    B1: "You explain a practical detail clearly in conversation.",
    B2: "You choose precise wording for a detailed exchange."
  };

  const contextAlternatives = {
    A0: [
      "Use the lesson words in this short exchange.",
      "Imagine this everyday moment. Write the full German answer.",
      "Answer with the German pattern from this lesson."
    ],
    A1: [
      "Write one natural German sentence for this everyday exchange.",
      "The situation is familiar. Give the full German response.",
      "Write what you would say here in German."
    ],
    A2: [
      "The situation has changed. Respond with a complete German sentence.",
      "Use the lesson pattern in this practical situation.",
      "Choose a natural German response for this situation."
    ],
    B1: [
      "Explain the key detail clearly in German.",
      "Write what you would say in this practical conversation.",
      "Use one complete response to explain the situation."
    ],
    B2: [
      "Write a precise response in the right register.",
      "Choose clear, natural wording for this exchange.",
      "Formulate a professional response with the lesson pattern."
    ]
  };

  const unique = values => [...new Set(values.filter(Boolean))];

  const recallPromptAlternatives = (word, cue) => [
    `Write the complete German lesson sentence for: ${cue}`,
    `Build the German response from “${word.bundle}”: ${cue}`,
    `Use the lesson pattern in a full sentence: ${cue}`,
    `From memory, give the German sentence for: ${cue}`
  ];

  const generalPromptAlternatives = prompt => {
    const clean = String(prompt || "").trim();
    if (!clean) return [];
    return [
      `Respond in German. ${clean}`,
      `Write the complete German response. ${clean}`,
      `Use the lesson language to answer. ${clean}`
    ];
  };

  const asciiGerman = value => String(value || "")
    .replace(/ä/gu, "ae").replace(/ö/gu, "oe").replace(/ü/gu, "ue").replace(/ß/gu, "ss")
    .replace(/Ä/gu, "Ae").replace(/Ö/gu, "Oe").replace(/Ü/gu, "Ue");

  const list = value => Array.isArray(value) ? value.filter(Boolean) : value ? [value] : [];

  const typedChoice = (german, english, options = {}) => {
    const standardGerman = list(german);
    const asciiForms = unique([...standardGerman.map(asciiGerman), ...list(options.germanAscii)])
      .filter(form => !standardGerman.includes(form));
    const bankGerman = list(options.bankGerman || german);
    return {
      german: {
        standard: unique([...standardGerman, ...list(options.germanAliases)]),
        ascii: asciiForms,
        numeric: list(options.germanNumeric)
      },
      english: {
        standard: unique([...list(english), ...list(options.englishAliases)]),
        numeric: list(options.englishNumeric)
      },
      neutral: { numeric: list(options.neutralNumeric) },
      bank: {
        standard: bankGerman,
        ascii: unique([...bankGerman.map(asciiGerman), ...list(options.bankAscii)]).filter(form => !bankGerman.includes(form)),
        numeric: list(options.bankNumeric)
      }
    };
  };

  const slotFamilies = [
    {
      id: "city",
      choices: ["Berlin", "Hamburg", "Bonn", "Leipzig", "Bremen", "Dresden", "Frankfurt", "Stuttgart"]
        .map(value => typedChoice(value, value))
    },
    {
      id: "weekday",
      choices: [
        ["Montag", "Monday"], ["Dienstag", "Tuesday"], ["Mittwoch", "Wednesday"], ["Donnerstag", "Thursday"],
        ["Freitag", "Friday"], ["Samstag", "Saturday"], ["Sonntag", "Sunday"]
      ].map(([de, en]) => typedChoice(de, en))
    },
    {
      id: "month",
      choices: [
        ["Januar", "January"], ["Februar", "February"], ["März", "March"], ["April", "April"], ["Mai", "May"],
        ["Juni", "June"], ["Juli", "July"], ["August", "August"], ["September", "September"],
        ["Oktober", "October"], ["November", "November"], ["Dezember", "December"]
      ].map(([de, en]) => typedChoice(de, en))
    },
    {
      id: "clock-time",
      choices: [
        ["sieben", "seven", "7"], ["acht", "eight", "8"], ["neun", "nine", "9"], ["zehn", "ten", "10"], ["elf", "eleven", "11"]
      ].map(([de, en, number]) => typedChoice(`um ${de} Uhr`, `at ${en}`, {
        germanNumeric: `um ${number} Uhr`, englishNumeric: [`at ${number}:00`, `at ${number}`],
        bankGerman: de, bankNumeric: number
      }))
    },
    {
      id: "quantity",
      collisionSensitive: true,
      choices: [["zwei", "two", "2"], ["drei", "three", "3"], ["vier", "four", "4"], ["fünf", "five", "5"], ["sechs", "six", "6"]]
        .map(([de, en, number]) => typedChoice(de, en, { neutralNumeric: number }))
    },
    {
      id: "color",
      choices: [["rot", "red"], ["blau", "blue"], ["grün", "green"], ["gelb", "yellow"], ["schwarz", "black"], ["weiß", "white"]]
        .map(([de, en]) => typedChoice(de, en))
    },
    {
      id: "near-future-day",
      maxRank: rank.A1,
      reject: /\b(?:habe|hast|hat|haben|seid|sind|war|waren|wurde|wurden|ging|kam|fuhr|blieb|fand|nahm|gab|ließ|stand|lag|schrieb|sprach|sagte|machte)\b/iu,
      choices: [["heute", "today"], ["morgen", "tomorrow"]].map(([de, en]) => typedChoice(de, en))
    },
    {
      id: "frequency",
      choices: [["oft", "often"], ["manchmal", "sometimes"], ["selten", "rarely"], ["normalerweise", "normally"]]
        .map(([de, en]) => typedChoice(de, en))
    },
    {
      id: "direction",
      choices: [["rechts", "right"], ["links", "left"]].map(([de, en]) => typedChoice(de, en))
    },
    {
      id: "part-of-day",
      choices: [["am Morgen", "in the morning"], ["am Nachmittag", "in the afternoon"], ["am Abend", "in the evening"]]
        .map(([de, en]) => typedChoice(de, en))
    },
    {
      id: "cafe-drink",
      choices: [["einen Kaffee", "a coffee"], ["einen Tee", "a tea"], ["einen Saft", "a juice"]]
        .map(([de, en]) => typedChoice(de, en))
    },
    {
      id: "study-item",
      choices: [["das Buch", "the book"], ["das Handy", "the phone"], ["das Papier", "the paper"], ["das Heft", "the notebook"]]
        .map(([de, en]) => typedChoice(de, en))
    },
    {
      id: "local-place",
      choices: [
        typedChoice("im Park", "in the park"), typedChoice("im Kino", "at the cinema", { englishAliases: "in the cinema" }),
        typedChoice("im Café", "at the café", { englishAliases: "in the café" }),
        typedChoice("im Zentrum", "in the center", { englishAliases: "in the centre" }),
        typedChoice("am Bahnhof", "at the station", { englishAliases: "at the train station" })
      ]
    },
    {
      id: "transport",
      choices: [
        typedChoice("mit dem Bus", "by bus"), typedChoice("mit dem Zug", "by train"),
        typedChoice("mit dem Fahrrad", "by bicycle", { englishAliases: "by bike" }), typedChoice("zu Fuß", "on foot")
      ]
    }
  ];

  const unsafeSurfaceQuestions = new Set([
    "b2-praesentieren:b211-q1",
    "b2-hybrid-teams:b2-hybrid-teams-q6",
    "b2-academic-argument:b2-academic-argument-q1",
    "b2-mediation-konflikt:b212-q7"
  ]);

  const surfaceInvariantFailures = [];

  const escapePattern = value => String(value).replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  const tokenPattern = values => new RegExp(`(^|[^\\p{L}\\p{N}])(${values.map(escapePattern).sort((a, b) => b.length - a.length).join("|")})(?=$|[^\\p{L}\\p{N}])`, "giu");
  const allForms = group => Object.values(group || {}).flat().filter(Boolean);
  const formsFor = (choice, mode) => mode === "german"
    ? [...allForms(choice.german), ...allForms(choice.neutral)]
    : mode === "english"
      ? [...allForms(choice.english), ...allForms(choice.neutral)]
      : [...allForms(choice.german), ...allForms(choice.english), ...allForms(choice.neutral)];
  const hasChoice = (text, choice, mode = "mixed") => formsFor(choice, mode).some(form => tokenPattern([form]).test(String(text || "")));
  const hasNeutral = (text, choice) => allForms(choice.neutral).some(form => tokenPattern([form]).test(String(text || "")));
  const countChoice = (text, choice, mode = "mixed") => formsFor(choice, mode)
    .reduce((count, form) => count + [...String(text || "").matchAll(tokenPattern([form]))].length, 0);
  const hasCompoundChoice = (text, choice) => formsFor(choice, "mixed").some(form => new RegExp(`(?:${escapePattern(form)}\\p{Pd}|\\p{Pd}${escapePattern(form)})`, "iu").test(String(text || "")));

  const replacementMap = (source, target, mode) => {
    const map = new Map();
    const groups = mode === "german" ? ["german", "neutral"]
      : mode === "english" ? ["english", "neutral"]
        : ["german", "english", "neutral"];
    for (const groupName of groups) {
      const sourceGroup = source[groupName] || {};
      const targetGroup = target[groupName] || {};
      for (const [style, sources] of Object.entries(sourceGroup)) {
        const targets = targetGroup[style]?.length ? targetGroup[style] : targetGroup.standard;
        if (!targets?.length) continue;
        for (const form of sources) {
          const key = form.toLocaleLowerCase("de-DE");
          const replacement = targets[0];
          if (map.has(key) && map.get(key) !== replacement) return null;
          map.set(key, replacement);
        }
      }
    }
    return map;
  };

  const replaceWithMap = (text, map) => {
    const value = String(text || "");
    if (!map?.size) return value;
    return value.replace(tokenPattern([...map.keys()]), (match, prefix, token) => {
      const replacement = map.get(token.toLocaleLowerCase("de-DE"));
      const adjusted = /^\p{Lu}/u.test(token) ? `${replacement.charAt(0).toLocaleUpperCase("de-DE")}${replacement.slice(1)}` : replacement;
      return `${prefix}${adjusted}`;
    });
  };

  const replaceField = (text, source, target, mode) => replaceWithMap(text, replacementMap(source, target, mode));
  const replaceCue = (text, source, target) => {
    let germanQuote = false;
    return String(text || "").split(/([“”])/u).map(part => {
      if (part === "“") { germanQuote = true; return part; }
      if (part === "”") { germanQuote = false; return part; }
      if (germanQuote) return replaceField(part, source, target, "german");
      const english = replaceField(part, source, target, "english");
      const germanOnlySource = {
        ...source,
        english: { standard: [], numeric: [] },
        neutral: { numeric: [] }
      };
      const germanOnlyTarget = {
        ...target,
        english: { standard: [], numeric: [] },
        neutral: { numeric: [] }
      };
      return replaceField(english, germanOnlySource, germanOnlyTarget, "german");
    }).join("");
  };

  const replaceWordBank = (bank, source, target) => {
    const bankSource = { ...source, german: source.bank };
    const bankTarget = { ...target, german: target.bank };
    return (bank || []).map(word => replaceField(word, bankSource, bankTarget, "german"));
  };

  const supportMode = key => key === "model" ? "german" : key === "translation" ? "english" : "mixed";

  const replaceSupportValue = (value, source, target, key = "") => {
    if (Array.isArray(value)) return value.map(item => replaceSupportValue(item, source, target, key));
    if (value && typeof value === "object") {
      return Object.fromEntries(Object.entries(value).map(([childKey, child]) => [childKey, replaceSupportValue(child, source, target, childKey)]));
    }
    if (typeof value !== "string") return value;
    const mode = supportMode(key);
    return mode === "mixed" ? replaceCue(value, source, target) : replaceField(value, source, target, mode);
  };

  const replaceSupport = (support, source, target) => replaceSupportValue(support, source, target);

  const supportHasCollision = (value, source, target, key = "") => {
    if (Array.isArray(value)) return value.some(item => supportHasCollision(item, source, target, key));
    if (value && typeof value === "object") return Object.entries(value).some(([childKey, child]) => supportHasCollision(child, source, target, childKey));
    if (typeof value !== "string") return false;
    const mode = supportMode(key);
    return hasChoice(value, source, mode) && hasChoice(value, target, mode);
  };

  const supportStaysSynchronized = (before, after, source, target, key = "") => {
    if (Array.isArray(before)) return Array.isArray(after) && before.every((item, index) => supportStaysSynchronized(item, after[index], source, target, key));
    if (before && typeof before === "object") {
      return after && typeof after === "object"
        && Object.entries(before).every(([childKey, child]) => supportStaysSynchronized(child, after[childKey], source, target, childKey));
    }
    if (typeof before !== "string") return true;
    const mode = supportMode(key);
    return !hasChoice(before, source, mode) || (!hasChoice(after, source, mode) && hasChoice(after, target, mode));
  };

  const choiceKnown = (choice, safeCorpus) => formsFor(choice, "mixed").some(form => tokenPattern([form]).test(safeCorpus));

  const surfaceFieldsStaySynchronized = (module, question, variant, source, target) => {
    const synchronized = (before, after, mode = "mixed") => !hasChoice(before, source, mode)
      || (!hasChoice(after, source, mode) && hasChoice(after, target, mode));
    const bankSource = { ...source, german: source.bank };
    const bankTarget = { ...target, german: target.bank };
    const checks = [
      synchronized(question.prompt, variant.prompt),
      synchronized(question.context, variant.context),
      synchronized(question.explanation, variant.explanation),
      variant.answers.every(answer => !hasChoice(answer, source, "german") && hasChoice(answer, target, "german")),
      (question.wordBank || []).every((word, index) => synchronized(word, variant.wordBank[index], "german")
        || (!hasChoice(word, bankSource, "german") || (!hasChoice(variant.wordBank[index], bankSource, "german") && hasChoice(variant.wordBank[index], bankTarget, "german")))),
      synchronized(question.support?.title, variant.support?.title),
      supportStaysSynchronized(question.support, variant.support, source, target)
    ];
    if (checks.every(Boolean)) return true;
    surfaceInvariantFailures.push(`${module.id}:${question.id}:${variant.slotFamily}`);
    return false;
  };

  const slotSurfaceVariants = (module, question, safeCorpus) => {
    if (unsafeSurfaceQuestions.has(`${module.id}:${question.id}`)) return [];
    const questionCorpus = [question.prompt, question.context, ...(question.answers || [])].join(" ");
    const fullCorpus = [questionCorpus, ...(question.wordBank || []), question.explanation, JSON.stringify(question.support || {})].join(" ");
    const variants = [];
    slotFamilies.forEach(family => {
      if (family.maxRank !== undefined && rank[module.level] > family.maxRank) return;
      if (family.reject?.test((question.answers || []).join(" "))) return;
      const presentChoices = family.choices.filter(choice => hasChoice(questionCorpus, choice));
      if (presentChoices.length !== 1) return;
      const [source] = presentChoices;
      if (family.id === "clock-time" && /\b(?:von|bis|zwischen|from|until|between)\b/iu.test(questionCorpus)) return;
      if (family.id === "quantity" && (countChoice(question.prompt, source) + countChoice(question.context, source) !== 1 || hasCompoundChoice(`${question.prompt} ${question.context}`, source))) return;
      if (family.id === "quantity" && (/\bUhr\b/u.test(questionCorpus) || /\bat\s+(?:two|three|four|five|six)\b/iu.test(questionCorpus))) return;
      if ((question.answers || []).some(answer => !hasChoice(answer, source, "german") || countChoice(answer, source, "german") !== 1)) return;
      if (family.collisionSensitive && hasChoice(question.prompt, source) && hasChoice(question.context, source)
        && !hasNeutral(question.prompt, source) && !hasNeutral(question.context, source)) return;
      family.choices
        .filter(choice => choice !== source && !hasChoice(fullCorpus, choice) && choiceKnown(choice, safeCorpus) && !supportHasCollision(question.support, source, choice))
        .slice(0, 4)
        .forEach(target => {
          const transformedAnswers = (question.answers || []).map(answer => replaceField(answer, source, target, "german"));
          if (transformedAnswers.some((answer, index) => answer === question.answers[index]
            || hasChoice(answer, source, "german") || !hasChoice(answer, target, "german"))) return;
          const variant = {
            prompt: replaceCue(question.prompt, source, target),
            context: replaceCue(question.context, source, target),
            answers: unique(transformedAnswers.flatMap(answer => [answer, asciiGerman(answer)])),
            wordBank: replaceWordBank(question.wordBank, source, target),
            explanation: replaceCue(question.explanation, source, target),
            support: replaceSupport(question.support, source, target),
            slotFamily: family.id
          };
          const cueChanged = variant.prompt !== question.prompt || variant.context !== question.context;
          const staleBank = (question.wordBank || []).some(word => hasChoice(word, { ...source, german: source.bank }, "german"))
            && variant.wordBank.some(word => hasChoice(word, { ...source, german: source.bank }, "german"));
          if (cueChanged && !staleBank && surfaceFieldsStaySynchronized(module, question, variant, source, target)) variants.push(variant);
        });
    });
    return variants;
  };

  const uniqueSurfaces = variants => [...new Map(variants.map(variant => [JSON.stringify({
    prompt: variant.prompt,
    context: variant.context,
    answers: variant.answers,
    wordBank: variant.wordBank
  }), variant])).values()];

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
    const promptTarget = targetPromptCount[module.level] || 12;
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
    const expansionWords = module.words.filter(word => word.supplemental && word.example && word.exampleEn);
    const candidates = [
      ...coreWords.filter(word => !usedWords.has(word.id)),
      ...expansionWords.filter(word => !usedWords.has(word.id)),
      ...coreWords.filter(word => usedWords.has(word.id)),
      ...expansionWords.filter(word => usedWords.has(word.id))
    ].filter(word => !existingAnswers.has(answerKey(word.example))
      && answerKey(word.example) !== answerKey(word.bundle)
      && answerKey(word.example) !== answerKey(word.de));

    let candidateIndex = 0;
    while (module.questions.length < promptTarget && candidateIndex < candidates.length) {
      const word = candidates[candidateIndex++];
      word.supplemental = false;
      const baseId = `field-recall-${word.id}`;
      let id = baseId;
      let suffix = 2;
      while (module.questions.some(question => question.id === id)) id = `${baseId}-${suffix++}`;
      const supportModel = [word.bundle, word.de].find(candidate => candidate && ![word.example, ...(word.variants || [])].some(answer => answerKey(answer) === answerKey(candidate))) || "Review the taught bundle in the guided lesson.";
      const cue = modelSentenceCue(word);
      module.questions.push({
        id,
        type: "ACTIVE RECALL",
        context: `${contexts[module.level]} Keep the people and level of formality shown in the bundle.`,
        prompt: `Use “${word.bundle}” to recall the model sentence for: ${cue}`,
        promptVariants: recallPromptAlternatives(word, cue),
        answers: [word.example, ...(word.practiceAnswers || [])],
        explanation: `The useful bundle is ${word.bundle}.`,
        requires: [word.id],
        wordBank: [],
        support: {
          title: "Use the taught bundle",
          model: supportModel,
          tip: cue
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

    module.questions.forEach(question => {
      const generatedContexts = contextAlternatives[module.level].map(lead => `${lead} ${question.context}`);
      if (generatedContexts.some(context => !context.endsWith(question.context))) {
        throw new Error(`Context variation lost its cue in ${module.id}:${question.id}`);
      }
      question.contextVariants = unique([
        ...(question.contextVariants || []),
        ...generatedContexts
      ]).filter(context => context !== question.context);
      question.promptVariants = unique([
        ...(question.promptVariants || []),
        ...generalPromptAlternatives(question.prompt)
      ]).filter(prompt => prompt !== question.prompt);
    });
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

  const previouslyIntroduced = [];
  course.modules.forEach(module => {
    const currentCore = module.words
      .filter(word => !word.supplemental)
      .flatMap(word => [word.de, word.en, word.bundle, word.example, word.exampleEn, ...(word.variants || []), ...(word.practiceAnswers || [])])
      .filter(Boolean);
    const safeCorpus = [...previouslyIntroduced, ...currentCore].join(" ");
    module.questions.forEach(question => {
      question.surfaceVariants = uniqueSurfaces([
        ...(question.surfaceVariants || []),
        ...slotSurfaceVariants(module, question, safeCorpus)
      ]);
    });
    previouslyIntroduced.push(...currentCore);
  });

  if (surfaceInvariantFailures.length) {
    throw new Error(`Surface variation failed synchronization: ${surfaceInvariantFailures.slice(0, 6).join(", ")}`);
  }
})();
