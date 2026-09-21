(function () {
  "use strict";

  const CASES = ["nom", "acc", "dat", "gen"];
  const GENDERS = ["m", "f", "n"];
  const DEFINITE = {
    m: { nom: "der", acc: "den", dat: "dem", gen: "des" },
    f: { nom: "die", acc: "die", dat: "der", gen: "der" },
    n: { nom: "das", acc: "das", dat: "dem", gen: "des" },
    pl: { nom: "die", acc: "die", dat: "den", gen: "der" }
  };
  const INDEFINITE = {
    m: { nom: "ein", acc: "einen", dat: "einem", gen: "eines" },
    f: { nom: "eine", acc: "eine", dat: "einer", gen: "einer" },
    n: { nom: "ein", acc: "ein", dat: "einem", gen: "eines" }
  };

  const NOUNS = {
    tisch: noun("Tisch", "Tische", "m", "table", ["furniture", "surface"]),
    stuhl: noun("Stuhl", "Stühle", "m", "chair", ["furniture"]),
    schluessel: noun("Schlüssel", "Schlüssel", "m", "key", ["portable", "household"]),
    stift: noun("Stift", "Stifte", "m", "pen", ["portable", "stationery"]),
    rucksack: noun("Rucksack", "Rucksäcke", "m", "backpack", ["portable", "container"]),
    regenschirm: noun("Regenschirm", "Regenschirme", "m", "umbrella", ["portable"]),
    mantel: noun("Mantel", "Mäntel", "m", "coat", ["portable", "clothing"]),
    termin: noun("Termin", "Termine", "m", "appointment", ["time", "abstract"]),
    vorschlag: noun("Vorschlag", "Vorschläge", "m", "proposal", ["abstract", "work"]),
    bericht: noun("Bericht", "Berichte", "m", "report", ["document", "work"]),
    beschluss: noun("Beschluss", "Beschlüsse", "m", "decision", ["abstract", "formal"]),
    antrag: noun("Antrag", "Anträge", "m", "application", ["document", "formal"]),
    kunde: noun("Kunde", "Kunden", "m", "customer", ["person"], { weak: true }),
    zeuge: noun("Zeuge", "Zeugen", "m", "witness", ["person"], { weak: true }),
    tasche: noun("Tasche", "Taschen", "f", "bag", ["portable", "container"]),
    lampe: noun("Lampe", "Lampen", "f", "lamp", ["household"]),
    tuer: noun("Tür", "Türen", "f", "door", ["household"]),
    uhr: noun("Uhr", "Uhren", "f", "clock", ["household", "time"]),
    flasche: noun("Flasche", "Flaschen", "f", "bottle", ["portable", "container"]),
    jacke: noun("Jacke", "Jacken", "f", "jacket", ["portable", "clothing"]),
    kollegin: noun("Kollegin", "Kolleginnen", "f", "colleague", ["person", "work"]),
    nachbarin: noun("Nachbarin", "Nachbarinnen", "f", "neighbor", ["person"]),
    aenderung: noun("Änderung", "Änderungen", "f", "change", ["abstract", "work"]),
    bestaetigung: noun("Bestätigung", "Bestätigungen", "f", "confirmation", ["document", "formal"]),
    stelle: noun("Stelle", "Stellen", "f", "office", ["organization", "formal"]),
    frist: noun("Frist", "Fristen", "f", "deadline", ["time", "formal"]),
    regelung: noun("Regelung", "Regelungen", "f", "arrangement", ["abstract", "formal"]),
    buch: noun("Buch", "Bücher", "n", "book", ["portable", "document"]),
    handy: noun("Handy", "Handys", "n", "mobile phone", ["portable", "technology"]),
    papier: noun("Papier", "Papiere", "n", "paper", ["portable", "stationery"]),
    fenster: noun("Fenster", "Fenster", "n", "window", ["household"]),
    heft: noun("Heft", "Hefte", "n", "notebook", ["portable", "stationery"]),
    formular: noun("Formular", "Formulare", "n", "form", ["document", "formal"]),
    paket: noun("Paket", "Pakete", "n", "parcel", ["portable"]),
    verfahren: noun("Verfahren", "Verfahren", "n", "procedure", ["abstract", "formal"]),
    kind: noun("Kind", "Kinder", "n", "child", ["person"]),
    bild: noun("Bild", "Bilder", "n", "picture", ["portable", "document"]),
    wasser: noun("Wasser", "", "n", "water", ["substance"])
  };

  const PEOPLE = {
    a0: ["Aylin", "Ben", "Clara", "Daria", "Emre", "Felix", "Greta", "Hassan", "Ida", "Joël", "Klara", "Luis"],
    formalWomen: ["Frau Aydin", "Frau Berger", "Frau Costa", "Frau Demir", "Frau König", "Frau Novak"],
    formalMen: ["Herr Bauer", "Herr Costa", "Herr Demir", "Herr Özkan", "Herr Wagner", "Herr Winter"]
  };

  const VERBS = {
    sein: verb("sein", { ich: "bin", du: "bist", er: "ist", wir: "sind", ihr: "seid", sie: "sind" }, { complement: "predicative" }),
    haben: verb("haben", { ich: "habe", du: "hast", er: "hat", wir: "haben", ihr: "habt", sie: "haben" }, { objectCase: "acc", objectTags: ["portable", "abstract"] }),
    brauchen: verb("brauchen", { ich: "brauche", du: "brauchst", er: "braucht", wir: "brauchen", ihr: "braucht", sie: "brauchen" }, { objectCase: "acc" }),
    suchen: verb("suchen", { ich: "suche", du: "suchst", er: "sucht", wir: "suchen", ihr: "sucht", sie: "suchen" }, { objectCase: "acc", objectTags: ["portable", "person"] }),
    kaufen: verb("kaufen", { ich: "kaufe", du: "kaufst", er: "kauft", wir: "kaufen", ihr: "kauft", sie: "kaufen" }, { objectCase: "acc", objectTags: ["portable", "substance"] }),
    nehmen: verb("nehmen", { ich: "nehme", du: "nimmst", er: "nimmt", wir: "nehmen", ihr: "nehmt", sie: "nehmen" }, { objectCase: "acc", objectTags: ["portable"] }),
    pruefen: verb("prüfen", { ich: "prüfe", du: "prüfst", er: "prüft", wir: "prüfen", ihr: "prüft", sie: "prüfen" }, { objectCase: "acc", objectTags: ["document", "abstract"] }),
    helfen: verb("helfen", { ich: "helfe", du: "hilfst", er: "hilft", wir: "helfen", ihr: "helft", sie: "helfen" }, { objectCase: "dat", objectTags: ["person"] }),
    danken: verb("danken", { ich: "danke", du: "dankst", er: "dankt", wir: "danken", ihr: "dankt", sie: "danken" }, { objectCase: "dat", objectTags: ["person"] }),
    antworten: verb("antworten", { ich: "antworte", du: "antwortest", er: "antwortet", wir: "antworten", ihr: "antwortet", sie: "antworten" }, { objectCase: "dat", objectTags: ["person"] }),
    gehoeren: verb("gehören", { ich: "gehöre", du: "gehörst", er: "gehört", wir: "gehören", ihr: "gehört", sie: "gehören" }, { objectCase: "dat", subjectTags: ["portable"] }),
    geben: verb("geben", { ich: "gebe", du: "gibst", er: "gibt", wir: "geben", ihr: "gebt", sie: "geben" }, { recipientCase: "dat", objectCase: "acc" }),
    zeigen: verb("zeigen", { ich: "zeige", du: "zeigst", er: "zeigt", wir: "zeigen", ihr: "zeigt", sie: "zeigen" }, { recipientCase: "dat", objectCase: "acc" }),
    fahren: verb("fahren", { ich: "fahre", du: "fährst", er: "fährt", wir: "fahren", ihr: "fahrt", sie: "fahren" }, { movement: true, auxiliary: "sein" }),
    kommen: verb("kommen", { ich: "komme", du: "kommst", er: "kommt", wir: "kommen", ihr: "kommt", sie: "kommen" }, { movement: true, auxiliary: "sein" }),
    anrufen: verb("anrufen", { ich: "rufe an", du: "rufst an", er: "ruft an", wir: "rufen an", ihr: "ruft an", sie: "rufen an" }, { separable: true, objectCase: "acc", objectTags: ["person", "organization"] }),
    zustimmen: verb("zustimmen", { ich: "stimme zu", du: "stimmst zu", er: "stimmt zu", wir: "stimmen zu", ihr: "stimmt zu", sie: "stimmen zu" }, { separable: true, objectCase: "dat", objectTags: ["abstract"] }),
    widersprechen: verb("widersprechen", { ich: "widerspreche", du: "widersprichst", er: "widerspricht", wir: "widersprechen", ihr: "widersprecht", sie: "widersprechen" }, { objectCase: "dat", objectTags: ["person", "document", "abstract"] }),
    folgen: verb("folgen", { ich: "folge", du: "folgst", er: "folgt", wir: "folgen", ihr: "folgt", sie: "folgen" }, { objectCase: "dat" }),
    warten: verb("warten", { ich: "warte", du: "wartest", er: "wartet", wir: "warten", ihr: "wartet", sie: "warten" }, { governedPreposition: "auf", governedCase: "acc" })
  };

  const PREPOSITIONS = {
    mit: { de: "mit", cases: ["dat"], relation: "accompaniment-or-means" },
    fuer: { de: "für", cases: ["acc"], relation: "beneficiary-or-purpose" },
    ohne: { de: "ohne", cases: ["acc"], relation: "absence" },
    bei: { de: "bei", cases: ["dat"], relation: "location-or-context" },
    nach: { de: "nach", cases: ["dat"], relation: "destination-or-sequence" },
    zu: { de: "zu", cases: ["dat"], relation: "destination" },
    auf: { de: "auf", cases: ["acc", "dat"], relation: "direction-or-location", twoWay: true },
    an: { de: "an", cases: ["acc", "dat"], relation: "direction-or-location", twoWay: true },
    in: { de: "in", cases: ["acc", "dat"], relation: "direction-or-location", twoWay: true },
    neben: { de: "neben", cases: ["acc", "dat"], relation: "direction-or-location", twoWay: true },
    vor: { de: "vor", cases: ["acc", "dat"], relation: "direction-or-location", twoWay: true },
    trotz: { de: "trotz", cases: ["gen"], relation: "concession", formal: true },
    innerhalb: { de: "innerhalb", cases: ["gen"], relation: "boundary", formal: true },
    gemaess: { de: "gemäß", cases: ["dat"], relation: "conformity", formal: true },
    anhand: { de: "anhand", cases: ["gen"], relation: "basis", formal: true }
  };

  const CONNECTORS = {
    weil: { de: "weil", relation: "cause", clause: "subordinate", finiteVerb: "final" },
    dass: { de: "dass", relation: "content", clause: "subordinate", finiteVerb: "final" },
    wenn: { de: "wenn", relation: "condition-or-time", clause: "subordinate", finiteVerb: "final" },
    obwohl: { de: "obwohl", relation: "concession", clause: "subordinate", finiteVerb: "final" },
    bevor: { de: "bevor", relation: "time", clause: "subordinate", finiteVerb: "final" },
    nachdem: { de: "nachdem", relation: "time", clause: "subordinate", finiteVerb: "final" },
    deshalb: { de: "deshalb", relation: "result", clause: "main", finiteVerb: "second" },
    trotzdem: { de: "trotzdem", relation: "concession", clause: "main", finiteVerb: "second" },
    einerseits: { de: "einerseits", relation: "balanced-argument", clause: "main", pairedWith: "andererseits" },
    andererseits: { de: "andererseits", relation: "balanced-argument", clause: "main", finiteVerb: "second" },
    zwar: { de: "zwar", relation: "concession", clause: "main", pairedWith: "aber" },
    sofern: { de: "sofern", relation: "condition", clause: "subordinate", finiteVerb: "final", register: "formal" }
  };

  const ADVERBS = {
    heute: { de: "heute", en: "today", role: "time", level: "A0" },
    morgen: { de: "morgen", en: "tomorrow", role: "time", level: "A0" },
    jetzt: { de: "jetzt", en: "now", role: "time", level: "A0" },
    spaeter: { de: "später", en: "later", role: "time", level: "A1" },
    dort: { de: "dort", en: "there", role: "place", level: "A0" },
    hier: { de: "hier", en: "here", role: "place", level: "A0" },
    gern: { de: "gern", en: "gladly", role: "manner", level: "A1" },
    gemeinsam: { de: "gemeinsam", en: "together", role: "manner", level: "A1" },
    sorgfaeltig: { de: "sorgfältig", en: "carefully", role: "manner", level: "A2" },
    weiterhin: { de: "weiterhin", en: "still / furthermore", role: "continuity", level: "B1" },
    allerdings: { de: "allerdings", en: "however", role: "stance", level: "B1" },
    folglich: { de: "folglich", en: "consequently", role: "result", level: "B2" }
  };

  const PROFILES = new Map();

  function noun(singular, plural, gender, en, tags, options = {}) {
    return { singular, plural, gender, en, tags, weak: Boolean(options.weak) };
  }

  function verb(lemma, forms, valency = {}) {
    return { lemma, forms, ...valency };
  }

  function verbForm(id, person = "er") {
    const entry = VERBS[id];
    if (!entry) throw new Error(`Unknown verb: ${id}`);
    if (!entry.forms[person]) throw new Error(`Verb ${id} has no form for ${person}`);
    return entry.forms[person];
  }

  function nounForm(id, grammaticalCase = "nom", number = "sg") {
    const entry = NOUNS[id];
    if (!entry) throw new Error(`Unknown noun: ${id}`);
    if (number === "pl") {
      if (!entry.plural) throw new Error(`Noun has no taught plural: ${id}`);
      return grammaticalCase === "dat" && !/[ns]$/u.test(entry.plural) ? `${entry.plural}n` : entry.plural;
    }
    if (entry.weak && grammaticalCase !== "nom") return entry.plural;
    if (grammaticalCase === "gen" && entry.gender === "m" && !entry.weak) {
      return /(?:s|ß|x|z|tz|sch)$/u.test(entry.singular) ? `${entry.singular}es` : `${entry.singular}s`;
    }
    if (grammaticalCase === "gen" && entry.gender === "n") {
      return /(?:s|ß|x|z|tz|sch)$/u.test(entry.singular) ? `${entry.singular}es` : `${entry.singular}s`;
    }
    return entry.singular;
  }

  function nounPhrase(id, grammaticalCase = "nom", determiner = "def", number = "sg") {
    const entry = NOUNS[id];
    const gender = number === "pl" ? "pl" : entry.gender;
    const table = determiner === "indef" ? INDEFINITE : DEFINITE;
    if (!table[gender]) throw new Error(`Unsupported determiner for ${id}`);
    return `${table[gender][grammaticalCase]} ${nounForm(id, grammaticalCase, number)}`;
  }

  function answerList(value) {
    return [...new Set((Array.isArray(value) ? value : [value]).filter(Boolean))];
  }

  function makeCandidate(spec) {
    return {
      prompt: spec.prompt,
      context: spec.context || "Use the grammar target with familiar language.",
      answers: answerList(spec.answers),
      wordBank: spec.wordBank || [],
      requires: spec.requires || [],
      explanation: spec.explanation || "The form follows the grammar target in this sentence.",
      support: spec.support,
      instructionHint: spec.instructionHint || "",
      variantMeta: {
        source: "language-engine",
        template: spec.template,
        lexemes: [...new Set(spec.lexemes || [])],
        assessment: Boolean(spec.assessment)
      }
    };
  }

  function register(moduleId, questionIds, build) {
    questionIds.forEach(questionId => PROFILES.set(`${moduleId}:${questionId}`, build));
  }

  function splitRows(rows, template, defaults = {}) {
    return rows.map(row => makeCandidate({
      ...defaults,
      ...row,
      template,
      assessment: Boolean(row.assessment)
    }));
  }

  const a0ObjectsPractice = ["stuhl", "lampe", "buch", "schluessel", "tasche"];
  const a0ObjectsAssessment = ["tisch", "handy"];
  const articleObjectsPractice = ["stuhl", "lampe", "buch", "schluessel", "tasche", "tuer", "fenster", "stift", "uhr"];
  const articleObjectsAssessment = ["flasche", "heft", "rucksack", "regenschirm", "jacke"];

  function objectIntroductionCandidates() {
    const build = (ids, assessment) => ids.map(id => {
      const entry = NOUNS[id];
      const phrase = nounPhrase(id, "nom", "indef");
      return makeCandidate({
        template: "a0-object-introduction",
        assessment,
        lexemes: [id, "sein"],
        context: "You identify one everyday object.",
        prompt: `Say: This is ${entry.gender === "f" ? "a" : "a"} ${entry.en}.`,
        answers: `Das ist ${phrase}.`,
        explanation: `${phrase} uses the nominative form because the noun follows das ist.`
      });
    });
    return [...build(a0ObjectsPractice, false), ...build(a0ObjectsAssessment, true)];
  }

  register("a0-everyday-things", ["book", "bag", "table", "lamp", "phone", "field-recall-stuhl", "grammar-sentence-frame-rotation"], objectIntroductionCandidates);

  register("a0-everyday-things", ["have-key", "have-book"], () => {
    const build = (ids, assessment) => ids.map(id => {
      const entry = NOUNS[id];
      const phrase = nounPhrase(id, "acc", "indef");
      return makeCandidate({
        template: "a0-have-object",
        assessment,
        lexemes: [id, "haben"],
        context: "You say what you have with you.",
        prompt: `Say: I have a ${entry.en}.`,
        answers: `Ich habe ${phrase}.`,
        explanation: `${phrase} is the accusative object after habe.`
      });
    });
    return [...build(["schluessel", "tasche", "buch", "stift", "handy"], false), ...build(["rucksack", "flasche", "heft", "regenschirm"], true)];
  });

  function articleRecallCandidates(practiceIds = a0ObjectsPractice, assessmentIds = a0ObjectsAssessment) {
    const build = (ids, assessment) => ids.map(id => {
      const entry = NOUNS[id];
      return makeCandidate({
        template: "a0-article-recall",
        assessment,
        lexemes: [id],
        context: "Recall the noun as a complete article bundle.",
        prompt: `Write the German noun for “${entry.en}”. Include its nominative article.`,
        answers: nounPhrase(id),
        explanation: `${entry.singular} has grammatical gender ${entry.gender === "m" ? "masculine" : entry.gender === "f" ? "feminine" : "neuter"}.`
      });
    });
    return [...build(practiceIds, false), ...build(assessmentIds, true)];
  }

  function articleOnlyCandidates(practiceIds = a0ObjectsPractice, assessmentIds = a0ObjectsAssessment) {
    const build = (ids, assessment) => ids.map(id => {
      const entry = NOUNS[id];
      return makeCandidate({
        template: "a0-article-only",
        assessment,
        lexemes: [id],
        context: "Choose the nominative article that belongs to the noun.",
        prompt: `Which nominative article belongs to “${entry.singular}”? Write only the article.`,
        answers: DEFINITE[entry.gender].nom,
        explanation: `The complete noun bundle is ${nounPhrase(id)}.`
      });
    });
    return [...build(practiceIds, false), ...build(assessmentIds, true)];
  }

  register("a0-everyday-things", ["article-bundle-retrieval"], articleRecallCandidates);
  register("a0-everyday-things", ["grammar-gender-rotation"], articleOnlyCandidates);
  register("a0-article-foundations", ["article-bundle-retrieval", "article-der-tisch", "article-die-lampe", "article-das-buch"], () => articleRecallCandidates(articleObjectsPractice, articleObjectsAssessment));
  register("a0-article-foundations", ["grammar-gender-rotation"], () => articleOnlyCandidates(articleObjectsPractice, articleObjectsAssessment));

  register("a0-article-foundations", ["complete-key-sentence"], () => {
    const build = (ids, assessment) => ids.map(id => {
      const entry = NOUNS[id];
      return makeCandidate({
        template: "a0-definite-identification",
        assessment,
        lexemes: [id, "sein"],
        context: "You identify a specific familiar object.",
        prompt: `Write the full sentence: That is the ${entry.en}.`,
        answers: `Das ist ${nounPhrase(id)}.`,
        explanation: `${nounPhrase(id)} uses the nominative definite article.`
      });
    });
    return [...build(["schluessel", "tasche", "buch", "stuhl", "lampe"], false), ...build(["rucksack", "flasche", "heft", "regenschirm"], true)];
  });

  register("a0-article-foundations", ["grammar-sentence-frame-rotation", "subject-feminine", "subject-neuter"], () => splitRows([
    { prompt: "Build the complete German sentence for: The table is large.", answers: ["Der Tisch ist groß.", "Der Tisch ist gross."], lexemes: ["tisch", "gross"] },
    { prompt: "Build the complete German sentence for: The lamp is bright.", answers: "Die Lampe ist hell.", lexemes: ["lampe", "hell"] },
    { prompt: "Build the complete German sentence for: The window is open.", answers: "Das Fenster ist offen.", lexemes: ["fenster", "offen"] },
    { prompt: "Build the complete German sentence for: The bag is black.", answers: "Die Tasche ist schwarz.", lexemes: ["tasche", "schwarz"] },
    { prompt: "Build the complete German sentence for: The book is new.", answers: "Das Buch ist neu.", lexemes: ["buch", "neu"] },
    { prompt: "Build the complete German sentence for: The door is closed.", answers: ["Die Tür ist geschlossen.", "Die Tuer ist geschlossen."], lexemes: ["tuer", "geschlossen"], assessment: true },
    { prompt: "Build the complete German sentence for: The chair is brown.", answers: "Der Stuhl ist braun.", lexemes: ["stuhl", "braun"], assessment: true },
    { prompt: "Build the complete German sentence for: The mobile phone is here.", answers: "Das Handy ist hier.", lexemes: ["handy", "hier"], assessment: true }
  ], "a0-definite-description", { context: "Use the complete noun bundle as the subject.", explanation: "The subject takes its nominative article, and the noun begins with a capital letter." }));

  register("a0-article-foundations", ["indefinite-masculine", "indefinite-feminine", "indefinite-neuter"], () => {
    const build = (ids, assessment) => ids.map(id => {
      const entry = NOUNS[id];
      return makeCandidate({
        template: "a0-indefinite-bundle",
        assessment,
        lexemes: [id],
        context: "Name one person or object with an indefinite article.",
        prompt: `Write “a ${entry.en}” in German. Include the indefinite article.`,
        answers: nounPhrase(id, "nom", "indef"),
        explanation: `${INDEFINITE[entry.gender].nom} is the nominative indefinite article for this noun.`
      });
    });
    return [...build(["stuhl", "tasche", "buch", "schluessel", "lampe", "handy"], false), ...build(["rucksack", "flasche", "heft", "regenschirm", "jacke", "fenster"], true)];
  });

  register("a2-case-control-practical", ["masculine-accusative"], () => splitRows([
    { prompt: "Complete: Ich suche ___ verlorenen Schlüssel.", answers: ["den", "Ich suche den verlorenen Schlüssel."], lexemes: ["suchen", "schluessel"] },
    { prompt: "Complete: Wir prüfen ___ neuen Termin.", answers: ["den", "Wir prüfen den neuen Termin."], lexemes: ["pruefen", "termin"] },
    { prompt: "Complete: Er nimmt ___ schweren Rucksack.", answers: ["den", "Er nimmt den schweren Rucksack."], lexemes: ["nehmen", "rucksack"] },
    { prompt: "Complete: Sie kauft ___ warmen Mantel.", answers: ["den", "Sie kauft den warmen Mantel."], lexemes: ["kaufen", "mantel"], assessment: true },
    { prompt: "Complete: Ich brauche ___ schwarzen Regenschirm.", answers: ["den", "Ich brauche den schwarzen Regenschirm."], lexemes: ["brauchen", "regenschirm"], assessment: true }
  ], "a2-definite-accusative", { context: "The verb takes a direct object. Supply the masculine accusative form.", explanation: "A masculine definite article changes from der to den in the accusative." }));

  register("a2-case-control-practical", ["masculine-dative", "fixed-preposition-mit"], () => splitRows([
    { prompt: "Complete: Ich fahre mit ___ Zug.", answers: ["dem", "Ich fahre mit dem Zug."], lexemes: ["fahren", "zug"] },
    { prompt: "Complete: Wir sprechen mit ___ Nachbarn.", answers: ["dem", "Wir sprechen mit dem Nachbarn."], lexemes: ["sprechen", "nachbar"] },
    { prompt: "Complete: Sie arbeitet mit ___ neuen Kollegen.", answers: ["dem", "Sie arbeitet mit dem neuen Kollegen."], lexemes: ["arbeiten", "kollege"] },
    { prompt: "Complete: Er kommt mit ___ schweren Rucksack.", answers: ["dem", "Er kommt mit dem schweren Rucksack."], lexemes: ["kommen", "rucksack"], assessment: true },
    { prompt: "Complete: Wir beginnen mit ___ ersten Bericht.", answers: ["dem", "Wir beginnen mit dem ersten Bericht."], lexemes: ["beginnen", "bericht"], assessment: true }
  ], "a2-mit-dative", { context: "The preposition mit always takes the dative.", explanation: "The masculine dative definite article is dem." }));

  register("a2-case-control-practical", ["feminine-dative"], () => splitRows([
    { prompt: "Complete: Der Kunde dankt ___ Verkäuferin.", answers: ["der", "Der Kunde dankt der Verkäuferin."], lexemes: ["danken", "verkaeuferin"] },
    { prompt: "Complete: Ich helfe ___ Nachbarin.", answers: ["der", "Ich helfe der Nachbarin."], lexemes: ["helfen", "nachbarin"] },
    { prompt: "Complete: Wir antworten ___ Kollegin heute.", answers: ["der", "Wir antworten der Kollegin heute."], lexemes: ["antworten", "kollegin"] },
    { prompt: "Complete: Das Paket gehört ___ Kundin.", answers: ["der", "Das Paket gehört der Kundin."], lexemes: ["gehoeren", "kundin"], assessment: true },
    { prompt: "Complete: Er spricht mit ___ neuen Leiterin.", answers: ["der", "Er spricht mit der neuen Leiterin."], lexemes: ["sprechen", "leiterin"], assessment: true }
  ], "a2-feminine-dative", { context: "A dative verb or preposition determines the article.", explanation: "The feminine dative definite article is der." }));

  register("a2-case-control-practical", ["fixed-preposition-fuer"], () => splitRows([
    { prompt: "Complete: Das Paket ist für ___ Nachbarn.", answers: ["den", "Das Paket ist für den Nachbarn."], lexemes: ["fuer", "nachbar"] },
    { prompt: "Complete: Der Brief ist für ___ Kunden.", answers: ["den", "Der Brief ist für den Kunden."], lexemes: ["fuer", "kunde"] },
    { prompt: "Complete: Die Nachricht ist für ___ neuen Kollegen.", answers: ["den", "Die Nachricht ist für den neuen Kollegen."], lexemes: ["fuer", "kollege"] },
    { prompt: "Complete: Der Termin ist für ___ zuständigen Berater.", answers: ["den", "Der Termin ist für den zuständigen Berater."], lexemes: ["fuer", "berater"], assessment: true },
    { prompt: "Complete: Das Formular ist für ___ neuen Mitarbeiter.", answers: ["den", "Das Formular ist für den neuen Mitarbeiter."], lexemes: ["fuer", "mitarbeiter"], assessment: true }
  ], "a2-fuer-accusative", { context: "The preposition für always takes the accusative.", explanation: "The masculine accusative definite article is den." }));

  register("a2-case-control-practical", ["verb-government-answer"], () => splitRows([
    { prompt: "Say that you answer her today.", answers: ["Ich antworte ihr heute.", "Heute antworte ich ihr."], lexemes: ["antworten", "ihr"] },
    { prompt: "Say that you help him tomorrow.", answers: ["Ich helfe ihm morgen.", "Morgen helfe ich ihm."], lexemes: ["helfen", "ihm"] },
    { prompt: "Say that you thank her now.", answers: ["Ich danke ihr jetzt.", "Jetzt danke ich ihr."], lexemes: ["danken", "ihr"] },
    { prompt: "Say that you reply to him this evening.", answers: ["Ich antworte ihm heute Abend.", "Heute Abend antworte ich ihm."], lexemes: ["antworten", "ihm"], assessment: true },
    { prompt: "Say that you help her after work.", answers: ["Ich helfe ihr nach der Arbeit.", "Nach der Arbeit helfe ich ihr."], lexemes: ["helfen", "ihr"], assessment: true }
  ], "a2-dative-pronoun", { context: "Use the dative pronoun required by the verb.", explanation: "Antworten, helfen, and danken take a dative person." }));

  register("a2-sentence-brackets-clause-order", ["position-two-time-first"], () => splitRows([
    { prompt: "Arrange: heute Abend / ich / meine Schwester / anrufen.", answers: "Heute Abend rufe ich meine Schwester an.", lexemes: ["anrufen", "schwester", "heute-abend"] },
    { prompt: "Arrange: morgen früh / wir / den Hausmeister / anrufen.", answers: "Morgen früh rufen wir den Hausmeister an.", lexemes: ["anrufen", "hausmeister", "morgen-frueh"] },
    { prompt: "Arrange: nach der Arbeit / Aylin / ihre Mutter / anrufen.", answers: "Nach der Arbeit ruft Aylin ihre Mutter an.", lexemes: ["anrufen", "aylin", "mutter"] },
    { prompt: "Arrange: am Montag / Ben / die Praxis / anrufen.", answers: "Am Montag ruft Ben die Praxis an.", lexemes: ["anrufen", "ben", "praxis"], assessment: true },
    { prompt: "Arrange: später / ich / meinen Kollegen / anrufen.", answers: "Später rufe ich meinen Kollegen an.", lexemes: ["anrufen", "kollege", "spaeter"], assessment: true }
  ], "a2-position-two", { context: "Begin with the time phrase and keep the finite verb in position two.", explanation: "When the time phrase occupies position one, the subject follows the finite verb." }));

  register("a2-sentence-brackets-clause-order", ["weil-verb-final"], () => splitRows([
    { prompt: "Join with weil: Ich kann nicht teilnehmen. Ich muss arbeiten.", answers: "Ich kann nicht teilnehmen, weil ich arbeiten muss.", lexemes: ["weil", "arbeiten", "teilnehmen"] },
    { prompt: "Join with weil: Wir fahren später. Der Bus kommt nicht.", answers: "Wir fahren später, weil der Bus nicht kommt.", lexemes: ["weil", "bus", "kommen"] },
    { prompt: "Join with weil: Aylin ruft die Praxis an. Sie braucht einen Termin.", answers: "Aylin ruft die Praxis an, weil sie einen Termin braucht.", lexemes: ["weil", "aylin", "praxis", "termin"] },
    { prompt: "Join with weil: Ben bleibt zu Hause. Er ist krank.", answers: "Ben bleibt zu Hause, weil er krank ist.", lexemes: ["weil", "ben", "krank"], assessment: true },
    { prompt: "Join with weil: Wir verschieben das Treffen. Clara hat keine Zeit.", answers: "Wir verschieben das Treffen, weil Clara keine Zeit hat.", lexemes: ["weil", "clara", "treffen"], assessment: true }
  ], "a2-weil-clause", { context: "Connect the reason as a subordinate clause.", explanation: "Weil sends the finite verb to the end of its clause." }));

  register("a2-sentence-brackets-clause-order", ["time-manner-place"], () => splitRows([
    { prompt: "Arrange: Ich fahre / morgen / mit dem Bus / nach Köln.", answers: "Ich fahre morgen mit dem Bus nach Köln.", lexemes: ["fahren", "morgen", "bus", "koeln"] },
    { prompt: "Arrange: Wir fahren / am Samstag / mit dem Zug / nach Bonn.", answers: "Wir fahren am Samstag mit dem Zug nach Bonn.", lexemes: ["fahren", "samstag", "zug", "bonn"] },
    { prompt: "Arrange: Daria kommt / heute / mit dem Fahrrad / zur Arbeit.", answers: "Daria kommt heute mit dem Fahrrad zur Arbeit.", lexemes: ["daria", "kommen", "fahrrad", "arbeit"] },
    { prompt: "Arrange: Ich gehe / später / zu Fuß / zur Apotheke.", answers: "Ich gehe später zu Fuß zur Apotheke.", lexemes: ["gehen", "spaeter", "apotheke"], assessment: true },
    { prompt: "Arrange: Wir fliegen / im Juni / mit dem Flugzeug / nach Wien.", answers: "Wir fliegen im Juni mit dem Flugzeug nach Wien.", lexemes: ["fliegen", "juni", "wien"], assessment: true }
  ], "a2-time-manner-place", { context: "Place the ordinary adverbials in the taught order.", explanation: "A common neutral order is time, manner, then place." }));

  register("b1-case-governance-adjective-endings", ["location-direction-pair"], () => splitRows([
    { prompt: "Ergänzen Sie die Artikel: Ich lege das Buch auf ___ Tisch. Danach liegt es auf ___ Tisch.", instructionHint: "Complete the articles: I put the book onto the table. Afterwards it is on the table.", answers: ["den, dem", "Ich lege das Buch auf den Tisch. Danach liegt es auf dem Tisch."], lexemes: ["buch", "tisch", "auf"] },
    { prompt: "Ergänzen Sie die Artikel: Sie hängt das Bild an ___ Wand. Danach hängt es an ___ Wand.", instructionHint: "Complete the articles: She hangs the picture onto the wall. Afterwards it hangs on the wall.", answers: ["die, der", "Sie hängt das Bild an die Wand. Danach hängt es an der Wand."], lexemes: ["bild", "wand", "an"] },
    { prompt: "Ergänzen Sie die Artikel: Wir stellen den Koffer neben ___ Schrank. Danach steht er neben ___ Schrank.", instructionHint: "Complete the articles: We put the suitcase beside the cabinet. Afterwards it stands beside the cabinet.", answers: ["den, dem", "Wir stellen den Koffer neben den Schrank. Danach steht er neben dem Schrank."], lexemes: ["koffer", "schrank", "neben"] },
    { prompt: "Ergänzen Sie die Artikel: Er steckt den Brief in ___ Tasche. Danach ist er in ___ Tasche.", answers: ["die, der", "Er steckt den Brief in die Tasche. Danach ist er in der Tasche."], lexemes: ["brief", "tasche", "in"], assessment: true },
    { prompt: "Ergänzen Sie die Artikel: Sie stellt die Lampe vor ___ Fenster. Danach steht sie vor ___ Fenster.", answers: ["das, dem", "Sie stellt die Lampe vor das Fenster. Danach steht sie vor dem Fenster."], lexemes: ["lampe", "fenster", "vor"], assessment: true }
  ], "b1-direction-location", { context: "Achten Sie auf Richtung und Ort.", explanation: "A destination takes the accusative here. A fixed location takes the dative." }));

  register("b1-case-governance-adjective-endings", ["governed-dative-agree", "governance-contrast"], () => splitRows([
    { prompt: "Ergänzen Sie: Der Ausschuss stimmt ___ neuen Vorschlag zu.", instructionHint: "Complete the governed noun phrase.", answers: ["dem", "dem neuen", "Der Ausschuss stimmt dem neuen Vorschlag zu."], lexemes: ["zustimmen", "vorschlag"] },
    { prompt: "Ergänzen Sie: Die Leitung widerspricht ___ ersten Bericht.", instructionHint: "Complete the governed noun phrase.", answers: ["dem", "dem ersten", "Die Leitung widerspricht dem ersten Bericht."], lexemes: ["widersprechen", "bericht"] },
    { prompt: "Ergänzen Sie: Wir folgen ___ sorgfältig ausgearbeiteten Plan.", instructionHint: "Complete the governed noun phrase.", answers: ["dem", "dem sorgfältig ausgearbeiteten", "Wir folgen dem sorgfältig ausgearbeiteten Plan."], lexemes: ["folgen", "plan"] },
    { prompt: "Ergänzen Sie: Das Team stimmt ___ vorgeschlagenen Änderung zu.", answers: ["der", "der vorgeschlagenen", "Das Team stimmt der vorgeschlagenen Änderung zu."], lexemes: ["zustimmen", "aenderung"], assessment: true },
    { prompt: "Ergänzen Sie: Die Fachleute widersprechen ___ veröffentlichten Bewertung.", answers: ["der", "der veröffentlichten", "Die Fachleute widersprechen der veröffentlichten Bewertung."], lexemes: ["widersprechen", "bewertung"], assessment: true }
  ], "b1-governed-dative", { context: "Das Verb bestimmt den Dativ.", explanation: "Zustimmen, widersprechen, and folgen govern the dative." }));

  register("b1-complex-sentence-architecture", ["fronted-concession"], () => splitRows([
    { prompt: "Verbinden Sie die Aussagen mit obwohl: Die Frist ist kurz. Wir prüfen den Entwurf sorgfältig.", instructionHint: "Join the statements with obwohl.", answers: "Obwohl die Frist kurz ist, prüfen wir den Entwurf sorgfältig.", lexemes: ["obwohl", "frist", "entwurf"] },
    { prompt: "Verbinden Sie die Aussagen mit obwohl: Die Kosten steigen. Das Projekt wird fortgesetzt.", instructionHint: "Join the statements with obwohl.", answers: "Obwohl die Kosten steigen, wird das Projekt fortgesetzt.", lexemes: ["obwohl", "kosten", "projekt"] },
    { prompt: "Verbinden Sie die Aussagen mit obwohl: Der Bericht ist umfangreich. Die Zusammenfassung bleibt klar.", instructionHint: "Join the statements with obwohl.", answers: "Obwohl der Bericht umfangreich ist, bleibt die Zusammenfassung klar.", lexemes: ["obwohl", "bericht", "zusammenfassung"] },
    { prompt: "Verbinden Sie die Aussagen mit obwohl: Die Daten sind unvollständig. Der Ausschuss entscheidet heute.", answers: "Obwohl die Daten unvollständig sind, entscheidet der Ausschuss heute.", lexemes: ["obwohl", "daten", "ausschuss"], assessment: true },
    { prompt: "Verbinden Sie die Aussagen mit obwohl: Mehrere Fragen sind offen. Die Erprobung beginnt morgen.", answers: "Obwohl mehrere Fragen offen sind, beginnt die Erprobung morgen.", lexemes: ["obwohl", "fragen", "erprobung"], assessment: true }
  ], "b1-obwohl", { context: "Formulieren Sie einen konzessiven Nebensatz.", explanation: "Obwohl introduces a subordinate clause with the finite verb at the end." }));

  register("b1-complex-sentence-architecture", ["balanced-argument", "zwar-aber"], () => splitRows([
    { prompt: "Formulieren Sie beide Seiten mit einerseits und andererseits: Der Vorschlag spart Zeit. Er verursacht neue Kosten.", instructionHint: "Express both sides with einerseits and andererseits.", answers: "Einerseits spart der Vorschlag Zeit, andererseits verursacht er neue Kosten.", lexemes: ["einerseits", "andererseits", "vorschlag", "kosten"] },
    { prompt: "Formulieren Sie beide Seiten mit zwar und aber: Die Lösung ist günstig. Sie ist noch nicht stabil.", instructionHint: "Express both sides with zwar and aber.", answers: "Die Lösung ist zwar günstig, aber sie ist noch nicht stabil.", lexemes: ["zwar", "aber", "loesung"] },
    { prompt: "Formulieren Sie beide Seiten mit einerseits und andererseits: Die Schulung ist flexibel. Sie erfordert zuverlässige Technik.", instructionHint: "Express both sides with einerseits and andererseits.", answers: "Einerseits ist die Schulung flexibel, andererseits erfordert sie zuverlässige Technik.", lexemes: ["einerseits", "andererseits", "schulung", "technik"] },
    { prompt: "Formulieren Sie beide Seiten mit zwar und aber: Das Verfahren ist gründlich. Es dauert sehr lange.", answers: "Das Verfahren ist zwar gründlich, aber es dauert sehr lange.", lexemes: ["zwar", "aber", "verfahren"], assessment: true },
    { prompt: "Formulieren Sie beide Seiten mit einerseits und andererseits: Der Standort ist zentral. Die Miete ist hoch.", answers: "Einerseits ist der Standort zentral, andererseits ist die Miete hoch.", lexemes: ["einerseits", "andererseits", "standort", "miete"], assessment: true }
  ], "b1-balanced-argument", { context: "Stellen Sie zwei Gesichtspunkte klar gegenüber.", explanation: "The paired connectors mark the relationship between both sides of the argument." }));

  register("b2-case-reference-register", ["case-01", "case-02", "case-03", "case-15", "case-18"], () => splitRows([
    { prompt: "Ergänzen Sie normgerecht: Trotz ___ (der kurzfristige Beschluss) blieb die Frist bestehen.", instructionHint: "Complete the formal case phrase.", answers: "Trotz des kurzfristigen Beschlusses blieb die Frist bestehen.", lexemes: ["trotz", "beschluss", "frist"] },
    { prompt: "Ergänzen Sie normgerecht: Gemäß ___ (der gültige Beschluss) beginnt die Prüfung morgen.", instructionHint: "Complete the formal case phrase.", answers: ["Gemäß dem gültigen Beschluss beginnt die Prüfung morgen.", "Gemaess dem gueltigen Beschluss beginnt die Pruefung morgen."], lexemes: ["gemaess", "beschluss", "pruefung"] },
    { prompt: "Bilden Sie die Wortgruppe im Dativ: mit (ein neu Verfahren).", instructionHint: "Build the phrase in the dative.", answers: "mit einem neuen Verfahren", lexemes: ["mit", "verfahren"] },
    { prompt: "Drücken Sie die Beziehung mit einem Genitivattribut aus: die Folgen / der umstrittene Beschluss.", instructionHint: "Express the relationship with a genitive attribute.", answers: "die Folgen des umstrittenen Beschlusses", lexemes: ["folge", "beschluss"] },
    { prompt: "Formulieren Sie mit zufolge: Der Bericht sagt, dass alle Fristen eingehalten wurden.", instructionHint: "Write one formal sentence with zufolge.", answers: "Dem Bericht zufolge wurden alle Fristen eingehalten.", lexemes: ["zufolge", "bericht", "frist"] },
    { prompt: "Ergänzen Sie normgerecht: Innerhalb ___ (die vereinbarte Frist) muss eine Antwort vorliegen.", answers: "Innerhalb der vereinbarten Frist muss eine Antwort vorliegen.", lexemes: ["innerhalb", "frist", "antwort"], assessment: true },
    { prompt: "Bilden Sie die Wortgruppe im Genitiv: anhand (konkrete Beispiele).", answers: "anhand konkreter Beispiele", lexemes: ["anhand", "beispiel"], assessment: true },
    { prompt: "Formulieren Sie mit zufolge: Die Untersuchung zeigt, dass keine Frist verletzt wurde.", answers: "Der Untersuchung zufolge wurde keine Frist verletzt.", lexemes: ["zufolge", "untersuchung", "frist"], assessment: true }
  ], "b2-formal-case", { context: "Verwenden Sie die verlangte formelle Struktur.", explanation: "The governing expression determines the case and the adjective ending." }));

  register("b2-case-reference-register", ["case-05", "case-06"], () => splitRows([
    { prompt: "Korrigieren Sie die Form: Die Kommission spricht mit dem Zeuge.", instructionHint: "Correct the weak masculine noun.", answers: "Die Kommission spricht mit dem Zeugen.", lexemes: ["kommission", "zeuge"] },
    { prompt: "Setzen Sie Kunde in die verlangte Form: Wir erläutern ___ das Verfahren.", instructionHint: "Put Kunde into the required form.", answers: "Wir erläutern dem Kunden das Verfahren.", lexemes: ["kunde", "verfahren", "erlaeutern"] },
    { prompt: "Korrigieren Sie die Form: Wir danken dem Experte für die Prüfung.", instructionHint: "Correct the weak masculine noun.", answers: "Wir danken dem Experten für die Prüfung.", lexemes: ["experte", "pruefung", "danken"] },
    { prompt: "Korrigieren Sie die Form: Die Behörde befragt den Zeuge erneut.", answers: "Die Behörde befragt den Zeugen erneut.", lexemes: ["behoerde", "zeuge", "befragen"], assessment: true },
    { prompt: "Setzen Sie Kunde in die verlangte Form: Die Beraterin sendet ___ die Unterlagen.", answers: "Die Beraterin sendet dem Kunden die Unterlagen.", lexemes: ["kunde", "beraterin", "unterlagen"], assessment: true }
  ], "b2-weak-masculine", { context: "Achten Sie auf die n-Deklination.", explanation: "Weak masculine nouns take -n or -en outside the nominative singular." }));

  function candidatesFor({ moduleId, question, assessment = false }) {
    const build = PROFILES.get(`${moduleId}:${question.id}`);
    if (!build) return [];
    return build().filter(candidate => Boolean(candidate.variantMeta.assessment) === Boolean(assessment));
  }

  function validate(course) {
    const errors = [];
    Object.entries(NOUNS).forEach(([id, entry]) => {
      if (!GENDERS.includes(entry.gender)) errors.push(`Language engine noun ${id} has invalid gender`);
      if (!entry.singular || !entry.en) errors.push(`Language engine noun ${id} is incomplete`);
      CASES.forEach(grammaticalCase => {
        try { nounPhrase(id, grammaticalCase); } catch (error) { errors.push(error.message); }
      });
    });
    Object.entries(VERBS).forEach(([id, entry]) => {
      if (!entry.lemma || !entry.forms?.ich || !entry.forms?.er || !entry.forms?.wir) errors.push(`Language engine verb ${id} is incomplete`);
      if (entry.objectCase && !CASES.includes(entry.objectCase)) errors.push(`Language engine verb ${id} has invalid object case`);
      if (entry.governedCase && !CASES.includes(entry.governedCase)) errors.push(`Language engine verb ${id} has invalid governed case`);
    });
    Object.entries(PREPOSITIONS).forEach(([id, entry]) => {
      if (!entry.de || !entry.cases?.length || entry.cases.some(grammaticalCase => !CASES.includes(grammaticalCase))) errors.push(`Language engine preposition ${id} is incomplete`);
      if (entry.twoWay && !(entry.cases.includes("acc") && entry.cases.includes("dat"))) errors.push(`Language engine two-way preposition ${id} needs accusative and dative`);
    });
    Object.entries(CONNECTORS).forEach(([id, entry]) => {
      if (!entry.de || !entry.relation || !entry.clause) errors.push(`Language engine connector ${id} is incomplete`);
    });
    const moduleMap = new Map((course?.modules || []).map(module => [module.id, module]));
    PROFILES.forEach((build, key) => {
      const [moduleId, ...questionParts] = key.split(":");
      const questionId = questionParts.join(":");
      const module = moduleMap.get(moduleId);
      if (!module) return errors.push(`Language engine profile targets missing module ${moduleId}`);
      if (!module.questions.some(question => question.id === questionId)) errors.push(`Language engine profile targets missing question ${key}`);
      let candidates = [];
      try { candidates = build(); } catch (error) { return errors.push(`Language engine profile ${key} failed: ${error.message}`); }
      const practice = candidates.filter(candidate => !candidate.variantMeta.assessment);
      const assessment = candidates.filter(candidate => candidate.variantMeta.assessment);
      if (practice.length < 3) errors.push(`Language engine profile ${key} needs at least three practice candidates`);
      if (assessment.length < 2) errors.push(`Language engine profile ${key} needs at least two held-out assessment candidates`);
      candidates.forEach((candidate, index) => {
        if (!candidate.prompt || !candidate.answers.length || !candidate.variantMeta.template) errors.push(`Language engine profile ${key} candidate ${index + 1} is incomplete`);
        if (/\b(?:undefined|null)\b/iu.test(JSON.stringify(candidate))) errors.push(`Language engine profile ${key} candidate ${index + 1} contains an invalid value`);
      });
      const practiceItems = new Set(practice.map(candidate => JSON.stringify([candidate.prompt, candidate.answers])));
      assessment.forEach(candidate => {
        if (practiceItems.has(JSON.stringify([candidate.prompt, candidate.answers]))) errors.push(`Language engine profile ${key} leaks an assessment item into practice`);
      });
    });
    return errors;
  }

  function stats() {
    let practice = 0;
    let assessment = 0;
    PROFILES.forEach(build => build().forEach(candidate => {
      if (candidate.variantMeta.assessment) assessment += 1;
      else practice += 1;
    }));
    return {
      nouns: Object.keys(NOUNS).length,
      verbs: Object.keys(VERBS).length,
      prepositions: Object.keys(PREPOSITIONS).length,
      connectors: Object.keys(CONNECTORS).length,
      adverbs: Object.keys(ADVERBS).length,
      profiles: PROFILES.size,
      practice,
      assessment
    };
  }

  window.SATZWERK_LANGUAGE_ENGINE = Object.freeze({
    version: 1,
    nouns: NOUNS,
    verbs: VERBS,
    prepositions: PREPOSITIONS,
    connectors: CONNECTORS,
    adverbs: ADVERBS,
    people: PEOPLE,
    nounForm,
    nounPhrase,
    verbForm,
    candidatesFor,
    validate,
    stats
  });
  if (typeof document !== "undefined") document.documentElement.dataset.languageEngineVersion = "1";
})();
