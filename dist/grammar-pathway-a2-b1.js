(function () {
  "use strict";

  const course = window.SATZWERK_CURRICULUM;
  if (!course?.modules) throw new Error("Satzwerk curriculum must load before the grammar pathway");

  const sources = {
    A2: {
      title: "Goethe-Institut: Goethe-Zertifikat A2 vocabulary list",
      url: "https://www.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_A2_Wortliste.pdf"
    },
    B1: {
      title: "Goethe-Institut and ÖSD: Goethe-Zertifikat B1 vocabulary list",
      url: "https://www.goethe.de/pro/relaunch/prf/bs/Goethe-Zertifikat_B1_Wortliste.pdf"
    }
  };

  const taskRanges = {
    A2: [85, 125],
    B1: [120, 165]
  };

  function makeWord(moduleId, row, index) {
    return {
      id: `${moduleId}-${row[0]}`,
      de: row[1],
      en: row[2],
      bundle: row[3],
      example: row[4],
      exampleEn: row[5],
      variants: row[6] || [],
      practiceAnswers: row[7] || [],
      supplemental: index >= 20
    };
  }

  function makeQuestion(moduleId, row) {
    return {
      id: row.id,
      type: row.type,
      context: row.context,
      prompt: row.prompt,
      promptVariants: row.promptVariants || [],
      answers: row.answers,
      acceptableAnswers: row.acceptableAnswers || [],
      explanation: row.explanation,
      requires: (row.requires || []).map(id => `${moduleId}-${id}`),
      wordBank: row.wordBank || [],
      support: row.support
    };
  }

  function makeModule(spec) {
    const [minWords, maxWords] = taskRanges[spec.level];
    const source = sources[spec.level];
    return {
      id: spec.id,
      level: spec.level,
      code: spec.code,
      title: spec.title,
      subtitle: spec.subtitle,
      canDo: spec.canDo,
      grammar: spec.grammar.map(row => ({
        title: row[0],
        rule: row[1],
        example: row[2],
        translation: row[3]
      })),
      words: spec.words.map((row, index) => makeWord(spec.id, row, index)),
      questions: spec.questions.map(row => makeQuestion(spec.id, row)),
      input: {
        script: spec.input.script,
        listenPrompt: spec.input.listenPrompt,
        listenPromptVariants: spec.input.listenPromptVariants || [],
        listenAnswers: spec.input.listenAnswers,
        passage: spec.input.passage,
        readPrompt: spec.input.readPrompt,
        readPromptVariants: spec.input.readPromptVariants || [],
        readAnswers: spec.input.readAnswers
      },
      task: {
        writingPrompt: `${spec.task.writingPrompt} Write ${minWords} to ${maxWords} words.`,
        writingPromptVariants: spec.task.writingPromptVariants || [],
        minWords,
        maxWords,
        guide: spec.task.guide,
        required: spec.task.required,
        model: spec.task.model,
        speakingPrompt: spec.task.speakingPrompt,
        speakingPromptVariants: spec.task.speakingPromptVariants || [],
        speakingGuide: spec.task.speakingGuide,
        speakingRequired: spec.task.speakingRequired,
        speakingModel: spec.task.speakingModel
      },
      culture: {
        title: spec.culture[0],
        body: spec.culture[1],
        sourceTitle: source.title,
        url: source.url,
        tags: spec.culture[2]
      }
    };
  }

  const specs = [
    {
      id: "a2-case-control-practical",
      level: "A2",
      code: "A2.40",
      title: "Case control in practical German",
      subtitle: "Choose articles and pronouns by function, verb, and preposition.",
      canDo: [
        "Identify the subject, direct object, and indirect object in an everyday sentence",
        "Choose definite and indefinite articles in the nominative, accusative, and dative",
        "Use common verbs that govern a dative or accusative object",
        "Select the case required by frequent prepositions",
        "Replace people and things with the correct personal pronouns",
        "Order dative and accusative objects naturally"
      ],
      grammar: [
        ["Function chooses the case", "The subject takes the nominative. A direct object often takes the accusative. A recipient commonly takes the dative.", "Der Kunde gibt der Verkäuferin den Beleg.", "The customer gives the sales assistant the receipt."],
        ["Masculine articles show the clearest change", "Masculine der becomes den in the accusative and dem in the dative. Feminine die becomes der in the dative. Neuter das becomes dem.", "der Nachbar · den Nachbarn · dem Nachbarn", "the neighbor in the nominative, accusative, and dative"],
        ["Verb government", "Some verbs select a case. Helfen, danken, antworten, and gehören take a dative object. Brauchen and besuchen take an accusative object.", "Ich helfe ihm. Ich besuche ihn.", "I help him. I visit him."],
        ["Fixed prepositions", "Mit, bei, nach, seit, von, and zu take the dative. Für, ohne, durch, gegen, and um take the accusative.", "mit dem Bus · für den Kurs", "by bus · for the course"],
        ["Two objects", "With two nouns, the dative recipient usually comes before the accusative thing. A personal pronoun normally comes before a noun object. Two pronouns commonly appear accusative before dative.", "Ich gebe der Kollegin den Schlüssel. Ich gebe ihn ihr.", "I give the colleague the key. I give it to her."],
        ["Plural dative", "The dative plural uses den. The noun usually gains n when its plural does not already end in n or s.", "mit den Kindern · bei den Freunden", "with the children · at the friends' place"]
      ],
      words: [
        ["fall", "der Fall, die Fälle", "grammatical case", "der grammatische Fall · die Fälle", "Der Fall zeigt die Aufgabe eines Satzteils.", "The case shows the function of a sentence element."],
        ["nominativ", "der Nominativ", "nominative", "im Nominativ · wer oder was?", "Der Fahrer steht im Nominativ.", "The driver is in the nominative."],
        ["akkusativ", "der Akkusativ", "accusative", "im Akkusativ · wen oder was?", "Ich sehe den Fahrer im Akkusativ.", "I see the driver in the accusative."],
        ["dativ", "der Dativ", "dative", "im Dativ · wem?", "Ich antworte dem Fahrer im Dativ.", "I answer the driver in the dative."],
        ["artikel", "der Artikel, die Artikel", "article", "der bestimmte Artikel · ein Artikel", "Der Artikel verändert sich mit dem Fall.", "The article changes with the case."],
        ["bestimmt", "bestimmt", "definite", "der bestimmte Artikel", "Der bestimmte Artikel verweist auf etwas Bekanntes.", "The definite article refers to something known."],
        ["unbestimmt", "unbestimmt", "indefinite", "ein unbestimmter Artikel", "Ein unbestimmter Artikel führt etwas Neues ein.", "An indefinite article introduces something new."],
        ["mann-reihe", "der Mann · den Mann · dem Mann", "the man across three cases", "der Mann · den Mann · dem Mann", "Der Mann grüßt den Nachbarn und hilft dem Kind.", "The man greets the neighbor and helps the child."],
        ["frau-reihe", "die Frau · die Frau · der Frau", "the woman across three cases", "die Frau · die Frau · der Frau", "Die Frau kennt den Weg, und ich antworte der Frau.", "The woman knows the way, and I answer the woman."],
        ["kind-reihe", "das Kind · das Kind · dem Kind", "the child across three cases", "das Kind · das Kind · dem Kind", "Das Kind sieht den Hund, und die Mutter hilft dem Kind.", "The child sees the dog, and the mother helps the child."],
        ["plural-reihe", "die Kinder · die Kinder · den Kindern", "the children across three cases", "die Kinder · die Kinder · den Kindern", "Die Kinder besuchen den Park, und ich gebe den Kindern Wasser.", "The children visit the park, and I give the children water."],
        ["geben", "geben", "to give", "jemandem etwas geben", "Ich gebe der Nachbarin den Schlüssel.", "I give the neighbor the key."],
        ["zeigen", "zeigen", "to show", "jemandem etwas zeigen", "Zeigst du mir den Fahrplan?", "Will you show me the timetable?"],
        ["helfen", "helfen", "to help", "jemandem helfen · hilft", "Der Mitarbeiter hilft dem Kunden.", "The employee helps the customer."],
        ["danken", "danken", "to thank", "jemandem danken", "Wir danken Ihnen für die Hilfe.", "We thank you for the help."],
        ["antworten", "antworten", "to answer", "jemandem antworten", "Bitte antworte mir heute.", "Please answer me today."],
        ["gehoeren", "gehören", "to belong to", "jemandem gehören", "Der Rucksack gehört meinem Bruder.", "The backpack belongs to my brother.", ["gehoeren"]],
        ["warten-auf", "warten auf", "to wait for", "auf jemanden oder etwas warten", "Wir warten auf den Bus.", "We are waiting for the bus."],
        ["denken-an", "denken an", "to think of", "an jemanden oder etwas denken", "Denk bitte an den Termin.", "Please remember the appointment."],
        ["sprechen-mit", "sprechen mit", "to speak with", "mit jemandem sprechen", "Ich spreche mit der Vermieterin.", "I speak with the landlady."],
        ["fahren-mit", "fahren mit", "to travel by", "mit dem Bus fahren", "Wir fahren mit dem Bus zur Arbeit.", "We travel to work by bus."],
        ["fuer", "für", "for", "für den Kurs · für meine Schwester", "Das Geschenk ist für meinen Vater.", "The gift is for my father.", ["fuer"]],
        ["ohne", "ohne", "without", "ohne einen Termin · ohne mich", "Ohne einen Termin müssen Sie warten.", "You have to wait without an appointment."],
        ["bei", "bei", "at / with", "bei der Arbeit · bei meinem Arzt", "Ich bin heute bei meiner Ärztin.", "I am at my doctor's office today."],
        ["nach", "nach", "after / to", "nach dem Essen · nach Berlin", "Nach dem Essen rufe ich dich an.", "I will call you after the meal."],
        ["zu", "zu", "to", "zum Bahnhof · zur Apotheke", "Wir gehen zur Apotheke.", "We are going to the pharmacy."],
        ["pronomen-m", "er · ihn · ihm", "he / him across three cases", "er · ihn · ihm", "Er wohnt hier. Ich kenne ihn. Ich helfe ihm.", "He lives here. I know him. I help him."],
        ["pronomen-f", "sie · sie · ihr", "she / her across three cases", "sie · sie · ihr", "Sie arbeitet hier. Ich sehe sie. Ich antworte ihr.", "She works here. I see her. I answer her."],
        ["pronomen-n", "es · es · ihm", "it across three cases", "es · es · ihm", "Es ist neu. Ich brauche es. Ich gebe ihm einen Namen.", "It is new. I need it. I give it a name."],
        ["pronomen-pl", "sie · sie · ihnen", "they / them across three cases", "sie · sie · ihnen", "Sie warten. Ich sehe sie. Ich danke ihnen.", "They are waiting. I see them. I thank them."],
        ["reihenfolge", "die Reihenfolge, die Reihenfolgen", "order / sequence", "die Reihenfolge der Objekte", "Die Reihenfolge klingt mit Pronomen anders.", "The order sounds different with pronouns."],
        ["empfaenger", "der Empfänger, die Empfänger", "recipient", "dem Empfänger etwas geben", "Der Empfänger steht häufig im Dativ.", "The recipient is often in the dative.", ["Empfaenger"]]
      ],
      questions: [
        {
          id: "subject-object-cases", type: "CASE ANALYSIS", context: "Mara kauft den Mantel.",
          prompt: "Write the case of Mara and den Mantel in that order.",
          promptVariants: ["Name both cases in sentence order.", "Which case marks the buyer, and which case marks the purchased item?"],
          answers: ["Nominativ, Akkusativ", "Nominativ und Akkusativ"], acceptableAnswers: ["Mara: Nominativ; den Mantel: Akkusativ"],
          explanation: "Mara performs the action and is nominative. Den Mantel is the direct object and is accusative.",
          requires: ["nominativ", "akkusativ"], wordBank: ["Akkusativ", "Dativ", "Nominativ"]
        },
        {
          id: "masculine-accusative", type: "ARTICLE CONTROL", context: "You need a masculine direct object after kaufen.",
          prompt: "Complete: Ich kaufe ___ warmen Mantel.",
          promptVariants: ["Add the definite article: Ich kaufe ___ warmen Mantel.", "Use the accusative form of der: Ich kaufe ___ warmen Mantel."],
          answers: ["den", "Ich kaufe den warmen Mantel."],
          explanation: "Mantel is masculine and the direct object, so der becomes den.",
          requires: ["mann-reihe", "akkusativ"], wordBank: ["dem", "den", "der"]
        },
        {
          id: "masculine-dative", type: "ARTICLE CONTROL", context: "You are speaking with a male neighbor.",
          prompt: "Complete: Ich spreche mit ___ Nachbarn.",
          promptVariants: ["Choose the article after mit: Ich spreche mit ___ Nachbarn.", "Use the dative form of der in the sentence."],
          answers: ["dem", "Ich spreche mit dem Nachbarn."],
          explanation: "Mit always takes the dative, and masculine der becomes dem.",
          requires: ["sprechen-mit", "mann-reihe"], wordBank: ["dem", "den", "der"]
        },
        {
          id: "feminine-dative", type: "ARTICLE CONTROL", context: "A customer thanks the sales assistant.",
          prompt: "Complete: Der Kunde dankt ___ Verkäuferin.",
          promptVariants: ["Add the dative definite article before Verkäuferin.", "Which article completes: Der Kunde dankt ___ Verkäuferin?"],
          answers: ["der", "Der Kunde dankt der Verkäuferin."],
          explanation: "Danken takes a dative object. Feminine die becomes der in the dative.",
          requires: ["danken", "frau-reihe"], wordBank: ["der", "die", "einer"]
        },
        {
          id: "plural-dative", type: "FORM CONTROL", context: "You give water to several children.",
          prompt: "Complete both changes: Ich gebe ___ Kind___ Wasser.",
          promptVariants: ["Write the dative plural phrase for die Kinder.", "Fill the article and noun ending after geben: ___ Kind___."],
          answers: ["den Kindern", "Ich gebe den Kindern Wasser."],
          explanation: "The dative plural uses den, and Kinder gains n: den Kindern.",
          requires: ["plural-reihe", "geben"], wordBank: ["den", "die", "Kindern", "Kinder"]
        },
        {
          id: "helfen-pronoun", type: "PRONOUN REPLACEMENT", context: "Your male colleague needs help. Replace dem Kollegen.",
          prompt: "Rewrite with a pronoun: Ich helfe dem Kollegen.",
          promptVariants: ["Replace dem Kollegen with the correct personal pronoun.", "Say I help him using helfen."],
          answers: ["Ich helfe ihm.", "Ich helfe ihm"],
          explanation: "Helfen takes the dative. The masculine dative pronoun is ihm.",
          requires: ["helfen", "pronomen-m"], wordBank: ["Ich", "helfe", "ihm", "ihn"]
        },
        {
          id: "visit-pronoun", type: "PRONOUN REPLACEMENT", context: "Your male colleague is the direct object of besuchen.",
          prompt: "Rewrite with a pronoun: Ich besuche den Kollegen.",
          promptVariants: ["Replace den Kollegen with the correct personal pronoun.", "Say I visit him using the accusative pronoun."],
          answers: ["Ich besuche ihn.", "Ich besuche ihn"],
          explanation: "Besuchen takes an accusative object. The masculine accusative pronoun is ihn.",
          requires: ["pronomen-m", "akkusativ"], wordBank: ["Ich", "besuche", "ihm", "ihn"]
        },
        {
          id: "fixed-preposition-mit", type: "PREPOSITION GOVERNMENT", context: "You travel by train.",
          prompt: "Write one sentence with mit and der Zug.",
          promptVariants: ["Use mit plus the correct form of der Zug.", "Say that you travel by train, with the article included."],
          answers: ["Ich fahre mit dem Zug.", "Wir fahren mit dem Zug."], acceptableAnswers: ["Ich fahre mit dem Zug", "Wir fahren mit dem Zug"],
          explanation: "Mit takes the dative, so der Zug becomes dem Zug.",
          requires: ["fahren-mit"], wordBank: ["dem", "den", "fahre", "Ich", "mit", "Zug"]
        },
        {
          id: "fixed-preposition-fuer", type: "PREPOSITION GOVERNMENT", context: "The package is intended for your male neighbor.",
          prompt: "Complete: Das Paket ist für ___ Nachbarn.",
          promptVariants: ["Choose the article after für: Das Paket ist für ___ Nachbarn.", "Use für with the accusative form of der Nachbar."],
          answers: ["den", "Das Paket ist für den Nachbarn."],
          explanation: "Für always takes the accusative. Masculine der becomes den.",
          requires: ["fuer", "mann-reihe"], wordBank: ["dem", "den", "der"]
        },
        {
          id: "verb-government-answer", type: "VERB GOVERNMENT", context: "Your landlady sent you a message.",
          prompt: "Say that you answer her today.",
          promptVariants: ["Use antworten with the correct pronoun for the landlady.", "Translate: I answer her today."],
          answers: ["Ich antworte ihr heute.", "Heute antworte ich ihr."], acceptableAnswers: ["Ich antworte ihr heute", "Heute antworte ich ihr"],
          explanation: "Antworten takes a dative object. The feminine dative pronoun is ihr.",
          requires: ["antworten", "pronomen-f"], wordBank: ["antworte", "heute", "Ich", "ihr", "sie"]
        },
        {
          id: "noun-object-order", type: "WORD ORDER", context: "Both objects are nouns.",
          prompt: "Arrange naturally: ich / gebe / den Schlüssel / der Kollegin.",
          promptVariants: ["Put the dative recipient before the accusative thing.", "Build the sentence that means I give the colleague the key."],
          answers: ["Ich gebe der Kollegin den Schlüssel.", "Ich gebe der Kollegin den Schlüssel"],
          explanation: "With two noun objects, the dative recipient usually precedes the accusative thing.",
          requires: ["geben", "reihenfolge"], wordBank: ["den Schlüssel", "der Kollegin", "gebe", "Ich"]
        },
        {
          id: "one-pronoun-order", type: "WORD ORDER", context: "Replace den Schlüssel with ihn while keeping der Kollegin as a noun.",
          prompt: "Rewrite: Ich gebe der Kollegin den Schlüssel.",
          promptVariants: ["Use ihn for den Schlüssel and keep der Kollegin.", "Place the accusative pronoun naturally in the sentence."],
          answers: ["Ich gebe ihn der Kollegin.", "Ich gebe ihn der Kollegin"],
          explanation: "A personal pronoun normally comes before a noun object.",
          requires: ["geben", "reihenfolge", "pronomen-m"], wordBank: ["der Kollegin", "gebe", "Ich", "ihn"]
        },
        {
          id: "two-pronoun-order", type: "WORD ORDER", context: "Replace den Schlüssel with ihn and der Kollegin with ihr.",
          prompt: "Rewrite the whole sentence with two pronouns.",
          promptVariants: ["Say I give it to her using ihn and ihr.", "Order the two pronouns in: Ich gebe __ __."],
          answers: ["Ich gebe ihn ihr.", "Ich gebe ihn ihr"],
          explanation: "When both objects are personal pronouns, the accusative pronoun commonly comes before the dative pronoun.",
          requires: ["geben", "reihenfolge", "pronomen-f", "pronomen-m"], wordBank: ["gebe", "Ich", "ihn", "ihr"]
        },
        {
          id: "indefinite-article-set", type: "ARTICLE PARADIGM", context: "Use indefinite articles with three direct objects.",
          prompt: "Complete: Ich brauche ___ Stift, ___ Tasche und ___ Ticket.",
          promptVariants: ["Add the three accusative indefinite articles in order.", "Use ein forms for Stift, Tasche, and Ticket after brauchen."],
          answers: ["einen, eine, ein", "Ich brauche einen Stift, eine Tasche und ein Ticket."], acceptableAnswers: ["einen eine ein"],
          explanation: "Masculine uses einen, feminine uses eine, and neuter uses ein in the accusative.",
          requires: ["unbestimmt", "akkusativ"], wordBank: ["ein", "eine", "einen"]
        },
        {
          id: "mixed-case-transfer", type: "TRANSFER", context: "A receptionist gives a guest the room key.",
          prompt: "Translate with both objects: The receptionist gives the guest the key.",
          promptVariants: ["Use geben with der Gast as recipient and der Schlüssel as the thing.", "Build a sentence with die Rezeptionistin, der Gast, and der Schlüssel."],
          answers: ["Die Rezeptionistin gibt dem Gast den Schlüssel."], acceptableAnswers: ["Die Rezeptionistin gibt dem Gast den Schlüssel"],
          explanation: "The recipient is dem Gast in the dative. The thing is den Schlüssel in the accusative.",
          requires: ["geben", "mann-reihe"], wordBank: ["dem Gast", "den Schlüssel", "Die Rezeptionistin", "gibt"]
        },
        {
          id: "case-correction", type: "ERROR CORRECTION", context: "The preposition and verb each govern a case.",
          prompt: "Correct: Ich fahre mit den Bus und helfe meinen Bruder.",
          promptVariants: ["Repair both case errors in the sentence.", "Use mit plus dative and helfen plus dative."],
          answers: ["Ich fahre mit dem Bus und helfe meinem Bruder."], acceptableAnswers: ["Ich fahre mit dem Bus und helfe meinem Bruder"],
          explanation: "Mit requires dem Bus. Helfen requires meinem Bruder.",
          requires: ["fahren-mit", "helfen"], wordBank: []
        },
        {
          id: "formal-pronoun-case", type: "FORMAL REGISTER", context: "You speak politely to one customer.",
          prompt: "Say: I will show you the form.",
          promptVariants: ["Use formal Ihnen as the recipient of zeigen.", "Translate with formal address: I show you the form."],
          answers: ["Ich zeige Ihnen das Formular.", "Ich werde Ihnen das Formular zeigen."], acceptableAnswers: ["Ich zeige Ihnen das Formular", "Ich werde Ihnen das Formular zeigen"],
          explanation: "The formal dative pronoun is Ihnen and is always capitalized.",
          requires: ["zeigen", "dativ"], wordBank: ["das Formular", "Ich", "Ihnen", "zeige"]
        },
        {
          id: "three-case-production", type: "GUIDED PRODUCTION", context: "A neighbor brings a child a package.",
          prompt: "Write one sentence using der Nachbar as subject, das Kind as recipient, and das Paket as direct object.",
          promptVariants: ["Show nominative, dative, and accusative in one sentence with bringen.", "Build: the neighbor brings the child the package."],
          answers: ["Der Nachbar bringt dem Kind das Paket."], acceptableAnswers: ["Der Nachbar bringt dem Kind das Paket"],
          explanation: "Der Nachbar is nominative, dem Kind is dative, and das Paket is accusative.",
          requires: ["nominativ", "dativ", "akkusativ", "kind-reihe"], wordBank: ["das Paket", "dem Kind", "Der Nachbar", "bringt"]
        }
      ],
      input: {
        script: "Kundin: Entschuldigung, gehört dieser Rucksack Ihnen? Mitarbeiter: Nein, er gehört dem Mann dort. Ich gebe ihm den Rucksack gleich. Kundin: Danke. Können Sie mir auch den Weg zur Information zeigen? Mitarbeiter: Natürlich. Gehen Sie mit dem Aufzug in den ersten Stock.",
        listenPrompt: "Who receives the backpack, and what does the customer ask the employee to show her?",
        listenPromptVariants: ["Name the recipient of the backpack and the information the customer needs."],
        listenAnswers: ["Der Mann erhält den Rucksack, und der Mitarbeiter soll der Kundin den Weg zur Information zeigen.", "Dem Mann wird der Rucksack gegeben, und die Kundin fragt nach dem Weg zur Information."],
        passage: "Hinweis für neue Mitarbeitende: Geben Sie den Gästen beim Einchecken die Zimmerkarte und erklären Sie ihnen den Weg zum Aufzug. Gästen mit kleinen Kindern bieten wir ein Familienzimmer an. Für Fragen zur Rechnung schicken Sie die Gäste zur Rezeption. Nach dem Auschecken danken Sie ihnen für den Besuch.",
        readPrompt: "List the four case-controlled actions employees should perform.",
        readPromptVariants: ["Which four actions in the notice require an object or a governed preposition?"],
        readAnswers: ["Sie geben den Gästen die Zimmerkarte, erklären ihnen den Weg, schicken die Gäste zur Rezeption und danken ihnen für den Besuch.", "Zimmerkarte geben, den Weg erklären, Gäste zur Rezeption schicken und ihnen danken."]
      },
      task: {
        writingPrompt: "Write a practical message about returning a borrowed key and helping a neighbor. Include a recipient, a direct object, two governed prepositions, and two pronoun replacements.",
        writingPromptVariants: ["Explain who receives a key, where you will meet, and what help you offer. Use at least three cases."],
        guide: ["Introduce the key and its owner", "Use a dative recipient and an accusative object", "Use mit and für correctly", "Replace one masculine person with ihm or ihn", "Check masculine articles carefully"],
        required: ["dem", "den", "ihm", "mit", "für"],
        model: "Hallo Lea, ich habe noch den Schlüssel von deinem Nachbarn. Der Schlüssel gehört dem Mann aus Wohnung zwölf. Ich treffe ihn morgen vor dem Haus und gebe ihm den Schlüssel zurück. Danach fahre ich mit dem Bus zum Baumarkt. Dort kaufe ich für den Nachbarn eine neue Lampe, weil seine Flurlampe kaputt ist. Kannst du dem Hausmeister bitte antworten? Er wartet auf eine Nachricht. Ich habe ihm den Termin schon genannt, aber er braucht auch deine Bestätigung. Ohne die Bestätigung kommt er nicht. Am Abend helfe ich deinem Nachbarn bei der Montage und danke ihm für seine Geduld.",
        speakingPrompt: "Explain how you will return an item and help its owner. Use clear articles and pronouns.",
        speakingPromptVariants: ["Describe a small favor with a recipient, an object, and two prepositional phrases."],
        speakingGuide: ["Name the item and owner", "Use geben with two objects", "Replace the owner with a pronoun", "Use mit and für", "End with the next step"],
        speakingRequired: ["dem", "ihm", "mit", "für"],
        speakingModel: "Der Schlüssel gehört dem Nachbarn. Morgen treffe ich ihn vor dem Haus und gebe ihm den Schlüssel. Danach fahre ich mit dem Bus zum Baumarkt und kaufe für ihn eine Lampe. Am Abend helfe ich ihm bei der Montage."
      },
      culture: [
        "Case signals support flexible word order",
        "German articles and pronouns show who acts, who receives something, and what is affected. Speakers can move familiar information toward the beginning of a sentence because the case forms continue to mark each role.",
        ["Kasus", "Artikel", "Pronomen", "Alltag"]
      ]
    },
    {
      id: "a2-sentence-brackets-clause-order",
      level: "A2",
      code: "A2.41",
      title: "Sentence brackets and clause order",
      subtitle: "Keep the finite verb in its place while other verb parts move to the end.",
      canDo: [
        "Build main clauses with the finite verb in position two",
        "Use separable verbs, modal verbs, and the perfect tense as sentence brackets",
        "Place the conjugated verb at the end of a subordinate clause",
        "Connect events with weil, dass, wenn, obwohl, deshalb, and trotzdem",
        "Order time, manner, and place information clearly",
        "Combine main and subordinate clauses without losing the verb structure"
      ],
      grammar: [
        ["Finite verb in position two", "A statement has one element before the conjugated verb. That first element may contain several words.", "Nach der Arbeit kaufe ich ein.", "I shop after work."],
        ["Separable verb bracket", "The conjugated prefix verb splits in a main clause. The prefix moves to the end.", "Ich rufe meine Schwester heute Abend an.", "I call my sister this evening."],
        ["Modal and perfect brackets", "A modal verb or auxiliary stands in position two. The infinitive or past participle closes the clause.", "Wir müssen den Termin verschieben. Wir haben den Termin verschoben.", "We have to postpone the appointment. We postponed the appointment."],
        ["Subordinate clause verb", "Weil, dass, wenn, and obwohl send the conjugated verb to the end of their clause.", "Ich bleibe zu Hause, weil ich krank bin.", "I am staying home because I am ill."],
        ["After a fronted subordinate clause", "When the subordinate clause comes first, the following main clause begins with its conjugated verb.", "Wenn der Kurs endet, fahre ich nach Hause.", "When the course ends, I travel home."],
        ["Connectors occupy position one", "Deshalb, trotzdem, danach, and dann take the first position. The conjugated verb follows immediately.", "Es regnet. Trotzdem gehen wir spazieren.", "It is raining. Even so, we go for a walk."]
      ],
      words: [
        ["satzklammer", "die Satzklammer, die Satzklammern", "sentence bracket", "die Satzklammer öffnen und schließen", "Das Modalverb und der Infinitiv bilden eine Satzklammer.", "The modal verb and infinitive form a sentence bracket."],
        ["position-eins", "die Position eins", "first position", "an Position eins", "Heute steht an Position eins.", "Today occupies the first position."],
        ["position-zwei", "die Position zwei", "second position", "das finite Verb an Position zwei", "Im Hauptsatz steht das finite Verb an Position zwei.", "The finite verb occupies the second position in a main clause."],
        ["finit", "finit", "finite / conjugated", "das finite Verb", "Das finite Verb zeigt Person und Zeit.", "The finite verb shows person and tense."],
        ["infinitiv", "der Infinitiv, die Infinitive", "infinitive", "den Infinitiv ans Ende stellen", "Nach einem Modalverb steht der Infinitiv am Ende.", "After a modal verb, the infinitive goes at the end."],
        ["trennbar", "trennbar", "separable", "ein trennbares Verb", "Anrufen ist ein trennbares Verb.", "Anrufen is a separable verb."],
        ["modalverb", "das Modalverb, die Modalverben", "modal verb", "Modalverb plus Infinitiv", "Das Modalverb öffnet die Satzklammer.", "The modal verb opens the sentence bracket."],
        ["perfekt", "das Perfekt", "present perfect", "das Perfekt mit haben oder sein", "Im Perfekt steht das Partizip am Ende.", "In the perfect tense, the participle goes at the end."],
        ["hauptsatz", "der Hauptsatz, die Hauptsätze", "main clause", "im Hauptsatz", "Der Hauptsatz kann allein stehen.", "The main clause can stand alone."],
        ["nebensatz", "der Nebensatz, die Nebensätze", "subordinate clause", "im Nebensatz", "Im Nebensatz steht das finite Verb am Ende.", "The finite verb goes at the end in a subordinate clause."],
        ["weil", "weil", "because", "weil der Zug später kommt", "Wir warten, weil der Zug später kommt.", "We are waiting because the train is arriving later."],
        ["dass", "dass", "that", "ich glaube, dass", "Ich glaube, dass der Kurs heute endet.", "I think that the course ends today."],
        ["wenn", "wenn", "if / when", "wenn ich Zeit habe", "Wenn ich Zeit habe, komme ich mit.", "If I have time, I will come along."],
        ["obwohl", "obwohl", "although", "obwohl es regnet", "Obwohl es regnet, gehen wir raus.", "Although it is raining, we are going outside."],
        ["deshalb", "deshalb", "therefore", "deshalb plus Verb", "Der Bus fällt aus. Deshalb nehme ich die Bahn.", "The bus is canceled. Therefore I take the train."],
        ["trotzdem", "trotzdem", "nevertheless", "trotzdem plus Verb", "Ich bin müde. Trotzdem arbeite ich weiter.", "I am tired. Nevertheless, I keep working."],
        ["zuerst", "zuerst", "first", "zuerst plus Verb", "Zuerst prüfe ich den Termin.", "First I check the appointment."],
        ["danach", "danach", "after that", "danach plus Verb", "Danach rufe ich die Praxis an.", "After that I call the practice."],
        ["bevor", "bevor", "before", "bevor der Kurs beginnt", "Ich lese die E-Mail, bevor der Kurs beginnt.", "I read the email before the course begins."],
        ["nachdem", "nachdem", "after", "nachdem ich angekommen bin", "Nachdem ich angekommen bin, rufe ich dich an.", "After I arrive, I call you."],
        ["waehrend", "während", "while", "während ich warte", "Während ich warte, lese ich die Nachricht.", "While I wait, I read the message.", ["waehrend"]],
        ["um-zu", "um ... zu", "in order to", "um etwas zu erledigen", "Ich gehe zur Bank, um die Rechnung zu bezahlen.", "I go to the bank in order to pay the bill."],
        ["aufstehen", "aufstehen", "to get up", "früh aufstehen · steht auf", "Morgen stehe ich um sechs Uhr auf.", "Tomorrow I get up at six."],
        ["anrufen", "anrufen", "to call", "jemanden anrufen · ruft an", "Ich rufe die Praxis nach der Arbeit an.", "I call the practice after work."],
        ["einkaufen", "einkaufen", "to shop", "Lebensmittel einkaufen · kauft ein", "Am Samstag kaufen wir gemeinsam ein.", "On Saturday we shop together."],
        ["mitbringen", "mitbringen", "to bring along", "etwas mitbringen · bringt mit", "Bitte bring deinen Ausweis mit.", "Please bring your identification."],
        ["vorbereiten", "vorbereiten", "to prepare", "etwas vorbereiten · bereitet vor", "Das Team bereitet die Besprechung vor.", "The team prepares the meeting."],
        ["verschieben", "verschieben", "to postpone", "einen Termin verschieben", "Wir müssen den Termin verschieben.", "We have to postpone the appointment."],
        ["teilnehmen", "teilnehmen", "to participate", "an einem Kurs teilnehmen · nimmt teil", "Sie nimmt morgen am Kurs teil.", "She participates in the course tomorrow."],
        ["erledigen", "erledigen", "to complete / take care of", "eine Aufgabe erledigen", "Ich habe die Aufgabe gestern erledigt.", "I completed the task yesterday."],
        ["planen", "planen", "to plan", "einen Ablauf planen", "Wir planen, wann wir anfangen.", "We plan when we will begin."],
        ["berichten", "berichten", "to report", "über etwas berichten", "Er berichtet, dass das Projekt gut läuft.", "He reports that the project is going well."],
        ["verbinden", "verbinden", "to connect", "Sätze miteinander verbinden", "Konnektoren verbinden Informationen.", "Connectors link information."],
        ["zeitangabe", "die Zeitangabe, die Zeitangaben", "time expression", "eine Zeitangabe voranstellen", "Heute Abend steht die Zeitangabe am Anfang.", "This evening, the time expression is at the beginning."]
      ],
      questions: [
        {
          id: "position-two-time-first", type: "WORD ORDER", context: "Heute Abend occupies the first position.",
          prompt: "Arrange: heute Abend / ich / meine Schwester / anrufen.",
          promptVariants: ["Build a main clause beginning with Heute Abend.", "Use anrufen with the time expression in position one."],
          answers: ["Heute Abend rufe ich meine Schwester an."], acceptableAnswers: ["Heute Abend rufe ich meine Schwester an"],
          explanation: "The finite verb rufe follows the first element. The separable prefix an closes the clause.",
          requires: ["position-zwei", "anrufen"], wordBank: ["an", "Heute Abend", "ich", "meine Schwester", "rufe"]
        },
        {
          id: "separable-bracket", type: "SENTENCE BRACKET", context: "You shop after work.",
          prompt: "Complete both parts of einkaufen: Nach der Arbeit ___ ich im Supermarkt ___.",
          promptVariants: ["Open and close the sentence bracket with einkaufen.", "Put kaufe and ein in their correct positions."],
          answers: ["kaufe, ein", "Nach der Arbeit kaufe ich im Supermarkt ein."], acceptableAnswers: ["kaufe ein"],
          explanation: "The conjugated stem kaufe is in position two and the prefix ein is at the end.",
          requires: ["satzklammer", "einkaufen"], wordBank: ["ein", "kaufe", "kaufen", "einkaufe"]
        },
        {
          id: "modal-bracket", type: "SENTENCE BRACKET", context: "The appointment has to move to Friday.",
          prompt: "Arrange: wir / müssen / den Termin / auf Freitag / verschieben.",
          promptVariants: ["Build the modal sentence with verschieben at the end.", "Say that we have to postpone the appointment until Friday."],
          answers: ["Wir müssen den Termin auf Freitag verschieben."], acceptableAnswers: ["Wir müssen den Termin auf Freitag verschieben"],
          explanation: "Müssen is finite in position two. Verschieben closes the clause as an infinitive.",
          requires: ["modalverb", "verschieben"], wordBank: ["auf Freitag", "den Termin", "müssen", "verschieben", "Wir"]
        },
        {
          id: "perfect-bracket", type: "SENTENCE BRACKET", context: "The task was completed yesterday.",
          prompt: "Build the perfect sentence with erledigen.",
          promptVariants: ["Say: I completed the task yesterday.", "Use habe and erledigt as a sentence bracket."],
          answers: ["Ich habe die Aufgabe gestern erledigt.", "Gestern habe ich die Aufgabe erledigt."], acceptableAnswers: ["Ich habe die Aufgabe gestern erledigt", "Gestern habe ich die Aufgabe erledigt"],
          explanation: "Habe occupies position two and erledigt closes the main clause.",
          requires: ["perfekt", "erledigen"], wordBank: ["die Aufgabe", "erledigt", "gestern", "habe", "Ich"]
        },
        {
          id: "weil-verb-final", type: "SUBORDINATE CLAUSE", context: "You cannot participate because you have to work.",
          prompt: "Join with weil: Ich kann nicht teilnehmen. Ich muss arbeiten.",
          promptVariants: ["Give the reason in a weil clause.", "Combine the ideas and place muss at the end of the subordinate clause."],
          answers: ["Ich kann nicht teilnehmen, weil ich arbeiten muss."], acceptableAnswers: ["Ich kann nicht teilnehmen weil ich arbeiten muss"],
          explanation: "Weil introduces a subordinate clause. The finite modal verb muss moves to the end after the infinitive.",
          requires: ["weil", "teilnehmen", "nebensatz"], wordBank: ["arbeiten", "ich", "Ich kann nicht teilnehmen", "muss", "weil"]
        },
        {
          id: "dass-perfect-final", type: "SUBORDINATE CLAUSE", context: "You report that the team prepared the meeting.",
          prompt: "Complete: Ich berichte, dass das Team die Besprechung ___.",
          promptVariants: ["Use the perfect tense of vorbereiten in the dass clause.", "Finish the report with vorbereitet hat."],
          answers: ["vorbereitet hat", "Ich berichte, dass das Team die Besprechung vorbereitet hat."],
          explanation: "In a subordinate clause, the participle comes before the finite auxiliary at the end.",
          requires: ["dass", "vorbereiten", "berichten"], wordBank: ["hat", "vorbereitet", "vorbereitet hat"]
        },
        {
          id: "fronted-wenn", type: "CLAUSE ORDER", context: "The course ends before you travel home.",
          prompt: "Start with Wenn der Kurs endet and finish the sentence.",
          promptVariants: ["Combine: Der Kurs endet. Dann fahre ich nach Hause. Begin with wenn.", "After the fronted subordinate clause, place fahre before ich."],
          answers: ["Wenn der Kurs endet, fahre ich nach Hause."], acceptableAnswers: ["Wenn der Kurs endet fahre ich nach Hause"],
          explanation: "The subordinate clause fills the first position. The main clause then begins with the finite verb fahre.",
          requires: ["wenn", "hauptsatz", "nebensatz"], wordBank: ["endet", "fahre", "ich", "nach Hause", "Wenn der Kurs"]
        },
        {
          id: "obwohl-contrast", type: "CLAUSE LINKING", context: "It is raining, but you still go for a walk.",
          prompt: "Join with obwohl: Es regnet. Wir gehen spazieren.",
          promptVariants: ["Begin with Obwohl and keep the main clause order correct.", "Express the contrast with a subordinate clause."],
          answers: ["Obwohl es regnet, gehen wir spazieren.", "Wir gehen spazieren, obwohl es regnet."], acceptableAnswers: ["Obwohl es regnet gehen wir spazieren", "Wir gehen spazieren obwohl es regnet"],
          explanation: "Regnet ends the obwohl clause. A main clause after a fronted subordinate clause begins with gehen.",
          requires: ["obwohl", "nebensatz"], wordBank: ["es", "gehen", "Obwohl", "regnet", "wir spazieren"]
        },
        {
          id: "deshalb-inversion", type: "CONNECTOR ORDER", context: "The bus is canceled, so you take the train.",
          prompt: "Complete: Der Bus fällt aus. Deshalb ___ ich die Bahn.",
          promptVariants: ["Place the finite verb directly after deshalb.", "Connect the result with deshalb and nehmen."],
          answers: ["nehme", "Der Bus fällt aus. Deshalb nehme ich die Bahn."],
          explanation: "Deshalb occupies position one, so nehme follows immediately.",
          requires: ["deshalb", "position-zwei"], wordBank: ["ich", "nehme", "nehmen"]
        },
        {
          id: "trotzdem-inversion", type: "CONNECTOR ORDER", context: "You are tired and continue working.",
          prompt: "Join the ideas as two sentences with trotzdem.",
          promptVariants: ["Write the second sentence beginning with Trotzdem.", "Use trotzdem plus verb to show the unexpected result."],
          answers: ["Ich bin müde. Trotzdem arbeite ich weiter."], acceptableAnswers: ["Ich bin müde, trotzdem arbeite ich weiter.", "Ich bin müde; trotzdem arbeite ich weiter."],
          explanation: "Trotzdem fills position one. The finite verb arbeite follows it.",
          requires: ["trotzdem", "position-zwei"], wordBank: ["arbeite", "Ich bin müde", "ich", "Trotzdem", "weiter"]
        },
        {
          id: "sequence-connectors", type: "SEQUENCING", context: "You check the schedule and then call the practice.",
          prompt: "Write two sentences using zuerst and danach.",
          promptVariants: ["Put prüfen first and anrufen second.", "Describe the sequence with both connectors and correct verb position."],
          answers: ["Zuerst prüfe ich den Termin. Danach rufe ich die Praxis an."], acceptableAnswers: ["Zuerst prüfe ich den Termin, danach rufe ich die Praxis an."],
          explanation: "Each connector occupies position one, so prüfe and rufe follow directly.",
          requires: ["zuerst", "danach", "anrufen"], wordBank: ["an", "Danach", "den Termin", "die Praxis", "ich", "prüfe", "rufe", "Zuerst"]
        },
        {
          id: "before-clause", type: "CLAUSE LINKING", context: "You read the email before the meeting begins.",
          prompt: "Translate with bevor: I read the email before the meeting begins.",
          promptVariants: ["Use bevor and put beginnt at the end of its clause.", "Write a main clause followed by a bevor clause."],
          answers: ["Ich lese die E-Mail, bevor die Besprechung beginnt."], acceptableAnswers: ["Ich lese die E-Mail bevor die Besprechung beginnt"],
          explanation: "Bevor introduces a subordinate clause, and beginnt stands at its end.",
          requires: ["bevor", "nebensatz"], wordBank: ["bevor", "beginnt", "die Besprechung", "die E-Mail", "Ich lese"]
        },
        {
          id: "after-clause-perfect", type: "CLAUSE LINKING", context: "You call after arriving.",
          prompt: "Complete: Nachdem ich angekommen bin, ___.",
          promptVariants: ["Finish with I call you, using correct main clause order.", "Add the main clause after the fronted nachdem clause."],
          answers: ["rufe ich dich an", "Nachdem ich angekommen bin, rufe ich dich an."],
          explanation: "The fronted subordinate clause takes position one. The main clause starts with rufe and closes with an.",
          requires: ["nachdem", "anrufen"], wordBank: ["an", "dich", "ich", "rufe"]
        },
        {
          id: "purpose-um-zu", type: "PURPOSE CLAUSE", context: "You go to the bank in order to pay a bill.",
          prompt: "Join with um ... zu: Ich gehe zur Bank. Ich bezahle die Rechnung.",
          promptVariants: ["Express the purpose of going to the bank.", "Use an um zu group ending in bezahlen."],
          answers: ["Ich gehe zur Bank, um die Rechnung zu bezahlen."], acceptableAnswers: ["Ich gehe zur Bank um die Rechnung zu bezahlen"],
          explanation: "Um introduces the purpose group, and zu stands with the infinitive at the end.",
          requires: ["um-zu", "infinitiv"], wordBank: ["die Rechnung", "Ich gehe zur Bank", "um", "zu bezahlen"]
        },
        {
          id: "time-manner-place", type: "FIELD ORDER", context: "Give time, means, and destination in a neutral order.",
          prompt: "Arrange: Ich fahre / morgen / mit dem Bus / nach Köln.",
          promptVariants: ["Build the sentence in time, manner, place order.", "Put morgen before mit dem Bus and nach Köln."],
          answers: ["Ich fahre morgen mit dem Bus nach Köln."], acceptableAnswers: ["Morgen fahre ich mit dem Bus nach Köln."],
          explanation: "A neutral middle field often places time before manner and place.",
          requires: ["zeitangabe"], wordBank: ["Ich fahre", "mit dem Bus", "morgen", "nach Köln"]
        },
        {
          id: "multi-verb-subordinate", type: "VERB CLUSTER", context: "You know that Nina has to get up early.",
          prompt: "Complete: Ich weiß, dass Nina morgen früh ___.",
          promptVariants: ["Use aufstehen and müssen in the dass clause.", "Put the infinitive before the finite modal at the end."],
          answers: ["aufstehen muss", "Ich weiß, dass Nina morgen früh aufstehen muss."],
          explanation: "With a modal in a subordinate clause, the infinitive precedes the finite modal at the end.",
          requires: ["dass", "aufstehen", "modalverb"], wordBank: ["aufstehen", "muss", "muss aufstehen"]
        },
        {
          id: "error-correction-brackets", type: "ERROR CORRECTION", context: "Each clause has a misplaced verb part.",
          prompt: "Correct: Morgen ich rufe an die Praxis, weil brauche ich einen Termin.",
          promptVariants: ["Repair the main clause and the weil clause.", "Put rufe in position two, an at the end, and brauche at the end of the reason clause."],
          answers: ["Morgen rufe ich die Praxis an, weil ich einen Termin brauche."], acceptableAnswers: ["Morgen rufe ich die Praxis an weil ich einen Termin brauche"],
          explanation: "The main clause uses rufe in position two and an at the end. The weil clause ends with brauche.",
          requires: ["anrufen", "weil", "satzklammer"], wordBank: []
        },
        {
          id: "three-clause-transfer", type: "GUIDED PRODUCTION", context: "A course is postponed, and you need to notify a colleague.",
          prompt: "Write one sentence with dass and weil: I tell Lea that the course is postponed because the teacher is ill.",
          promptVariants: ["Use mitteilen, dass and weil in one complete sentence.", "Report the postponement and its reason with two subordinate clauses."],
          answers: ["Ich teile Lea mit, dass der Kurs verschoben wird, weil der Lehrer krank ist."], acceptableAnswers: ["Ich sage Lea, dass der Kurs verschoben wird, weil der Lehrer krank ist."],
          explanation: "Both subordinate clauses place their finite verb at the end. The main clause closes with mit.",
          requires: ["dass", "weil", "verschieben"], wordBank: ["dass", "der Kurs verschoben wird", "Ich teile Lea mit", "weil", "der Lehrer krank ist"]
        }
      ],
      input: {
        script: "Lea: Kommst du morgen zum Kurs? Sam: Ich kann erst später kommen, weil ich morgens einen Arzttermin habe. Lea: Rufst du die Kursleitung an? Sam: Ja. Nachdem ich in der Praxis angekommen bin, rufe ich dort an. Ich sage, dass ich gegen elf Uhr teilnehmen kann.",
        listenPrompt: "Why will Sam arrive later, and when will Sam call the course office?",
        listenPromptVariants: ["Give Sam's reason and the event that comes before the phone call."],
        listenAnswers: ["Sam kommt später, weil er morgens einen Arzttermin hat, und ruft nach seiner Ankunft in der Praxis an.", "Wegen eines Arzttermins; er ruft an, nachdem er in der Praxis angekommen ist."],
        passage: "Ablauf für Montag: Zuerst prüft das Team, ob alle Unterlagen angekommen sind. Danach bereitet Nina den Raum vor, während Omar die Teilnehmenden anruft. Wenn jemand absagt, informiert Omar sofort die Kursleitung. Die Besprechung beginnt erst, nachdem die Technik getestet worden ist. Obwohl wenig Zeit bleibt, soll jede offene Frage dokumentiert werden.",
        readPrompt: "Describe the sequence and identify the two actions that happen at the same time.",
        readPromptVariants: ["What happens first, next, and simultaneously in the Monday plan?"],
        readAnswers: ["Zuerst werden die Unterlagen geprüft. Danach bereitet Nina den Raum vor, während Omar die Teilnehmenden anruft.", "Das Team prüft zuerst die Unterlagen. Danach laufen die Raumvorbereitung und die Anrufe gleichzeitig."]
      },
      task: {
        writingPrompt: "Write a schedule update explaining a delay, the revised sequence, and what colleagues need to do. Use two sentence brackets and three different connectors.",
        writingPromptVariants: ["Explain why a meeting moves, what happens first and next, and when you will call everyone."],
        guide: ["State the change and its reason", "Use weil or dass with verb-final order", "Use zuerst and danach with inversion", "Use one separable verb and one modal bracket", "End with a clear next step"],
        required: ["weil", "dass", "zuerst", "danach", "anrufen"],
        model: "Hallo zusammen, wir müssen die Besprechung auf Donnerstag verschieben, weil Nina am Mittwoch einen wichtigen Kundentermin hat. Ich hoffe, dass der neue Termin für alle passt. Zuerst prüfe ich heute die freien Räume. Danach bereitet Omar die aktualisierte Tagesordnung vor. Lea soll die technischen Geräte testen und die Zugangsdaten mitbringen. Wenn der Raum bestätigt ist, werde ich alle Teilnehmenden anrufen. Obwohl wir einen Tag verlieren, können wir die Unterlagen rechtzeitig fertigstellen. Bitte sagt mir bis morgen, ob ihr am Donnerstag teilnehmen könnt. Nachdem ich eure Antworten erhalten habe, schicke ich die endgültige Einladung heraus.",
        speakingPrompt: "Give a spoken update about a changed appointment and the order of the next actions.",
        speakingPromptVariants: ["Explain a delay using weil, then sequence the response with zuerst and danach."],
        speakingGuide: ["Name the original problem", "Give a reason with weil", "Use zuerst and danach", "Include a separable verb", "Ask for confirmation"],
        speakingRequired: ["weil", "zuerst", "danach", "rufe"],
        speakingModel: "Wir verschieben den Termin, weil der Raum heute nicht frei ist. Zuerst prüfe ich einen neuen Termin. Danach rufe ich die Teilnehmenden an. Wenn alle geantwortet haben, schicke ich die Einladung. Bitte sagt mir heute, ob Donnerstag passt."
      },
      culture: [
        "Verb position carries meaning",
        "Listeners use verb position to recognize whether a speaker is making a statement, asking a question, or adding a dependent idea. Clear sentence brackets make longer everyday explanations easier to follow.",
        ["Satzbau", "Satzklammer", "Konnektoren", "Verbstellung"]
      ]
    },
    {
      id: "b1-case-governance-adjective-endings",
      level: "B1",
      code: "B1.40",
      title: "Case governance and adjective endings",
      subtitle: "Use governed cases and adjective signals in precise descriptions and arguments.",
      canDo: [
        "Recognize case government in verbs and prepositions",
        "Use common two-way prepositions for location and direction",
        "Select adjective endings after definite, indefinite, and zero articles",
        "Control dative plural and weak masculine nouns",
        "Use relative pronouns whose case is set inside the relative clause",
        "Edit case and adjective-ending errors in connected prose"
      ],
      grammar: [
        ["Government belongs to the phrase", "A verb or preposition can require a specific case. Learn it together with its complement.", "jemandem widersprechen · sich an einen Termin erinnern", "to contradict someone · to remember an appointment"],
        ["Two-way prepositions", "An, auf, hinter, in, neben, über, unter, vor, and zwischen use the accusative for a destination and the dative for a location.", "Ich stelle die Kiste auf den Tisch. Sie steht auf dem Tisch.", "I put the box onto the table. It is on the table."],
        ["Adjective endings after der words", "After a definite article shows gender and case clearly, the adjective usually uses e or en.", "der neue Plan · den neuen Plan · mit dem neuen Plan", "the new plan across three case forms"],
        ["Adjective endings after ein words", "After ein, mein, kein, and similar words, the adjective supplies a missing strong signal. In many oblique forms it uses en.", "ein neuer Plan · eine neue Regel · mit einem neuen Plan", "a new plan · a new rule · with a new plan"],
        ["Adjectives without an article", "Without an article, the adjective carries the case and gender signal itself.", "frischer Kaffee · mit frischem Kaffee · wegen starken Regens", "fresh coffee · with fresh coffee · because of heavy rain"],
        ["Case inside a relative clause", "The relative pronoun agrees with its antecedent in gender and number. Its case comes from its role inside the relative clause.", "Das ist die Kollegin, der ich geholfen habe.", "That is the colleague whom I helped."]
      ],
      words: [
        ["rektion", "die Rektion", "government", "die Rektion eines Verbs oder einer Präposition", "Die Rektion bestimmt den folgenden Fall.", "Government determines the following case."],
        ["kasussignal", "das Kasussignal, die Kasussignale", "case signal", "ein sichtbares Kasussignal", "Der Artikel trägt ein klares Kasussignal.", "The article carries a clear case signal."],
        ["adjektivendung", "die Adjektivendung, die Adjektivendungen", "adjective ending", "die passende Adjektivendung", "Die Adjektivendung hängt vom Artikel und Fall ab.", "The adjective ending depends on the article and case."],
        ["wechselpraeposition", "die Wechselpräposition, die Wechselpräpositionen", "two-way preposition", "eine Wechselpräposition mit Dativ oder Akkusativ", "Auf ist eine häufige Wechselpräposition.", "Auf is a common two-way preposition.", ["Wechselpraeposition"]],
        ["standort", "der Standort, die Standorte", "location / site", "am neuen Standort", "Das Team arbeitet am neuen Standort.", "The team works at the new site."],
        ["richtung", "die Richtung, die Richtungen", "direction", "in eine bestimmte Richtung", "Die Bewegung in eine Richtung verlangt oft den Akkusativ.", "Movement toward a direction often requires the accusative."],
        ["gegenueber", "gegenüber", "opposite / toward", "jemandem gegenüber · gegenüber dem Eingang", "Die Apotheke liegt dem Bahnhof gegenüber.", "The pharmacy is opposite the station.", ["gegenueber"]],
        ["wegen", "wegen", "because of", "wegen des Wetters · wegen starken Regens", "Wegen des starken Regens fällt das Fest aus.", "The festival is canceled because of the heavy rain."],
        ["trotz", "trotz", "despite", "trotz des Problems", "Trotz des langen Weges kommt sie pünktlich.", "Despite the long journey, she arrives on time."],
        ["waehrend-gen", "während", "during", "während der Besprechung", "Während der langen Besprechung blieb das Telefon aus.", "The phone stayed off during the long meeting.", ["waehrend"]],
        ["innerhalb", "innerhalb", "within", "innerhalb einer Woche", "Wir antworten innerhalb einer Woche.", "We respond within one week."],
        ["ausserhalb", "außerhalb", "outside", "außerhalb der Öffnungszeiten", "Außerhalb der Öffnungszeiten ist die Tür geschlossen.", "The door is closed outside opening hours.", ["ausserhalb"]],
        ["gemaess", "gemäß", "according to", "gemäß der Vereinbarung", "Gemäß der Vereinbarung beginnt die Arbeit am Montag.", "According to the agreement, work begins on Monday.", ["gemaess"]],
        ["entgegen", "entgegen", "contrary to / toward", "entgegen der Empfehlung", "Entgegen der Empfehlung wurde der Termin vorgezogen.", "Contrary to the recommendation, the appointment was moved forward."],
        ["begegnen", "begegnen", "to encounter / meet", "jemandem begegnen", "Ich bin der neuen Leiterin gestern begegnet.", "I met the new manager yesterday."],
        ["folgen", "folgen", "to follow", "jemandem oder etwas folgen", "Bitte folgen Sie den markierten Schildern.", "Please follow the marked signs."],
        ["widersprechen", "widersprechen", "to contradict", "jemandem widersprechen", "Der Sachverständige widerspricht dem ersten Bericht.", "The expert contradicts the first report."],
        ["zustimmen", "zustimmen", "to agree", "jemandem oder einem Vorschlag zustimmen", "Die Mehrheit stimmt dem neuen Vorschlag zu.", "The majority agrees to the new proposal."],
        ["sich-erinnern", "sich erinnern an", "to remember", "sich an etwas erinnern", "Ich erinnere mich an das erste Gespräch.", "I remember the first conversation."],
        ["sich-interessieren", "sich interessieren für", "to be interested in", "sich für etwas interessieren", "Sie interessiert sich für den neuen Kurs.", "She is interested in the new course."],
        ["verfuegen", "verfügen über", "to have at one's disposal", "über Erfahrung verfügen", "Er verfügt über langjährige praktische Erfahrung.", "He has many years of practical experience.", ["verfuegen"]],
        ["der-neue", "der neue Plan · den neuen Plan · dem neuen Plan", "the new plan across cases", "der neue · den neuen · dem neuen", "Wir prüfen den neuen Plan und arbeiten mit dem neuen Plan.", "We review the new plan and work with the new plan."],
        ["ein-neuer", "ein neuer Plan · einen neuen Plan · einem neuen Plan", "a new plan across cases", "ein neuer · einen neuen · einem neuen", "Ein neuer Plan liegt vor, und wir folgen einem neuen Plan.", "A new plan is available, and we follow a new plan."],
        ["ohne-artikel", "neuer Plan · neuen Plan · neuem Plan", "new plan without an article", "neuer · neuen · neuem", "Neuer Technik stehen manche Beschäftigte kritisch gegenüber.", "Some employees are critical toward new technology."],
        ["schwach-mann", "der Kunde · den Kunden · dem Kunden", "weak masculine noun pattern", "der Kunde · den Kunden · dem Kunden", "Wir beraten den Kunden und antworten dem Kunden.", "We advise the customer and answer the customer."],
        ["dativ-plural", "mit erfahrenen Kolleginnen und Kollegen", "with experienced colleagues", "mit plus Dativ Plural", "Sie arbeitet mit erfahrenen Kolleginnen und Kollegen.", "She works with experienced colleagues."],
        ["relativ-dativ", "der · dem · denen", "dative relative pronouns", "die Kollegin, der · der Kollege, dem · die Leute, denen", "Die Kollegin, der ich helfe, beginnt heute.", "The colleague whom I help starts today."],
        ["dessen", "dessen", "whose for masculine or neuter antecedents", "der Kollege, dessen Büro", "Der Kollege, dessen Büro frei ist, arbeitet zu Hause.", "The colleague whose office is free works from home."],
        ["deren", "deren", "whose for feminine or plural antecedents", "die Kollegin, deren Bericht", "Die Kollegin, deren Bericht vorliegt, ist heute hier.", "The colleague whose report is available is here today."],
        ["betroffen", "betroffen", "affected", "die betroffenen Personen", "Wir informieren alle betroffenen Personen.", "We inform all affected people."],
        ["zustaendig", "zuständig", "responsible", "die zuständige Stelle", "Bitte wenden Sie sich an die zuständige Stelle.", "Please contact the responsible office.", ["zustaendig"]],
        ["verbindlich", "verbindlich", "binding", "eine verbindliche Regelung", "Wir brauchen eine verbindliche schriftliche Regelung.", "We need a binding written arrangement."],
        ["sorgfaeltig", "sorgfältig", "careful / carefully", "eine sorgfältige Prüfung", "Nach sorgfältiger Prüfung stimmen wir dem Antrag zu.", "After careful review, we approve the application.", ["sorgfaeltig"]],
        ["nachvollziehbar", "nachvollziehbar", "comprehensible", "eine nachvollziehbare Begründung", "Die Entscheidung braucht eine nachvollziehbare Begründung.", "The decision needs a comprehensible justification."]
      ],
      questions: [
        {
          id: "governed-dative-agree", type: "VERB GOVERNMENT", context: "The committee supports the proposal.",
          prompt: "Complete: Der Ausschuss stimmt ___ neuen Vorschlag zu.",
          promptVariants: ["Use the dative article and adjective ending after zustimmen.", "Fill the phrase for der neue Vorschlag as the object of zustimmen."],
          answers: ["dem neuen", "Der Ausschuss stimmt dem neuen Vorschlag zu."],
          explanation: "Zustimmen governs the dative. After dem, the adjective uses en.",
          requires: ["zustimmen", "der-neue"], wordBank: ["dem neuen", "den neuen", "der neue"]
        },
        {
          id: "governed-accusative-interest", type: "PREPOSITION GOVERNMENT", context: "Mara is interested in a new course.",
          prompt: "Complete: Mara interessiert sich für ___ neuen Kurs.",
          promptVariants: ["Use the accusative form after für.", "Add an indefinite article and the adjective ending before Kurs."],
          answers: ["einen", "Mara interessiert sich für einen neuen Kurs."], acceptableAnswers: ["einen neuen", "einen neuen Kurs"],
          explanation: "Für requires the accusative. Masculine ein becomes einen, and the adjective uses en.",
          requires: ["sich-interessieren", "ein-neuer"], wordBank: ["einem", "einen", "einer"]
        },
        {
          id: "location-direction-pair", type: "TWO-WAY PREPOSITION", context: "First describe movement, then location.",
          prompt: "Complete: Ich stelle die Kiste auf ___ Tisch. Danach steht sie auf ___ Tisch.",
          promptVariants: ["Use accusative for the destination and dative for the location.", "Fill both forms of der Tisch after auf."],
          answers: ["den, dem", "Ich stelle die Kiste auf den Tisch. Danach steht sie auf dem Tisch."], acceptableAnswers: ["den dem"],
          explanation: "A destination uses auf den Tisch. A location uses auf dem Tisch.",
          requires: ["wechselpraeposition", "richtung", "standort"], wordBank: ["dem", "den", "der"]
        },
        {
          id: "definite-adjective-paradigm", type: "ADJECTIVE ENDING", context: "Use der neue Plan in three cases.",
          prompt: "Complete: ___ neu__ Plan liegt vor. Wir prüfen ___ neu__ Plan. Wir folgen ___ neu__ Plan.",
          promptVariants: ["Write the nominative, accusative, and dative forms of der neue Plan.", "Supply all articles and adjective endings across the three sentences."],
          answers: ["Der neue; den neuen; dem neuen", "Der neue Plan liegt vor. Wir prüfen den neuen Plan. Wir folgen dem neuen Plan."], acceptableAnswers: ["der neue, den neuen, dem neuen"],
          explanation: "After definite articles, the adjective uses e in nominative masculine and en in the other two forms.",
          requires: ["der-neue", "adjektivendung"], wordBank: ["dem neuen", "den neuen", "Der neue"]
        },
        {
          id: "indefinite-adjective-paradigm", type: "ADJECTIVE ENDING", context: "Use ein neuer Plan in three cases.",
          prompt: "Write the nominative, accusative, and dative forms of ein neuer Plan.",
          promptVariants: ["Transform ein neuer Plan into all three requested cases.", "Give the three forms in this order: subject, direct object, dative object."],
          answers: ["ein neuer Plan, einen neuen Plan, einem neuen Plan"], acceptableAnswers: ["ein neuer; einen neuen; einem neuen"],
          explanation: "The adjective supplies er where ein has no ending. The accusative and dative forms use en.",
          requires: ["ein-neuer", "adjektivendung"], wordBank: ["ein neuer Plan", "einem neuen Plan", "einen neuen Plan"]
        },
        {
          id: "zero-article-dative", type: "ADJECTIVE ENDING", context: "No article appears before Kaffee.",
          prompt: "Complete: Wir beginnen mit frisch__ Kaffee.",
          promptVariants: ["Add the strong dative ending to frisch.", "Use mit and no article before frischer Kaffee."],
          answers: ["frischem", "Wir beginnen mit frischem Kaffee."],
          explanation: "Without an article, the adjective carries the dative masculine signal em.",
          requires: ["ohne-artikel", "adjektivendung"], wordBank: ["frische", "frischem", "frischen"]
        },
        {
          id: "genitive-preposition", type: "PREPOSITION GOVERNMENT", context: "Heavy rain causes the event to be canceled.",
          prompt: "Complete with wegen: Wegen ___ stark__ Regens fällt die Veranstaltung aus.",
          promptVariants: ["Use a definite article and the correct adjective ending after wegen.", "Fill the genitive phrase for der starke Regen."],
          answers: ["des starken", "Wegen des starken Regens fällt die Veranstaltung aus."],
          explanation: "Formal standard German commonly uses the genitive after wegen: des starken Regens.",
          requires: ["wegen", "adjektivendung"], wordBank: ["dem starken", "den starken", "des starken"]
        },
        {
          id: "dative-plural", type: "FORM CONTROL", context: "The project involves several experienced colleagues.",
          prompt: "Complete: Wir arbeiten mit erfahren__ Kolleginnen und Kollegen.",
          promptVariants: ["Add the dative plural adjective ending after mit.", "Use erfahren with mit and a plural noun phrase."],
          answers: ["erfahrenen", "Wir arbeiten mit erfahrenen Kolleginnen und Kollegen."],
          explanation: "The dative plural adjective ending is en. Kollegen already carries its plural n form.",
          requires: ["dativ-plural", "adjektivendung"], wordBank: ["erfahrene", "erfahrenem", "erfahrenen"]
        },
        {
          id: "weak-masculine", type: "NOUN DECLENSION", context: "A customer receives advice and an answer.",
          prompt: "Complete both forms: Wir beraten den Kund__. Danach antworten wir dem Kund__.",
          promptVariants: ["Add the weak masculine noun ending twice.", "Use Kunde correctly in the accusative and dative."],
          answers: ["Kunden, Kunden", "Wir beraten den Kunden. Danach antworten wir dem Kunden."], acceptableAnswers: ["en, en"],
          explanation: "Weak masculine nouns such as Kunde take en outside the nominative singular.",
          requires: ["schwach-mann"], wordBank: ["Kunde", "Kunden"]
        },
        {
          id: "relative-dative", type: "RELATIVE PRONOUN", context: "You helped a female colleague.",
          prompt: "Join: Das ist die Kollegin. Ich habe der Kollegin geholfen.",
          promptVariants: ["Replace the repeated noun with a dative relative pronoun.", "Use der inside the relative clause because helfen requires dative."],
          answers: ["Das ist die Kollegin, der ich geholfen habe."], acceptableAnswers: ["Das ist die Kollegin der ich geholfen habe"],
          explanation: "The antecedent is feminine, and helfen makes the relative pronoun dative: der.",
          requires: ["relativ-dativ"], wordBank: ["Das ist die Kollegin", "der", "geholfen habe", "ich"]
        },
        {
          id: "whose-feminine", type: "RELATIVE PRONOUN", context: "The report belongs to a female manager.",
          prompt: "Join: Die Leiterin ist heute hier. Ihr Bericht liegt vor.",
          promptVariants: ["Use deren to express whose report.", "Combine the statements in one relative sentence."],
          answers: ["Die Leiterin, deren Bericht vorliegt, ist heute hier."], acceptableAnswers: ["Die Leiterin, deren Bericht vorliegt, ist heute da."],
          explanation: "Deren refers back to a feminine antecedent and marks possession.",
          requires: ["deren"], wordBank: ["deren Bericht", "Die Leiterin", "ist heute hier", "vorliegt"]
        },
        {
          id: "gegenueber-dative", type: "PREPOSITION GOVERNMENT", context: "The pharmacy is opposite the main entrance.",
          prompt: "Complete: Die Apotheke liegt ___ neu__ Haupteingang gegenüber.",
          promptVariants: ["Use the dative phrase for der neue Haupteingang.", "Add article and adjective ending before Haupteingang."],
          answers: ["dem neuen", "Die Apotheke liegt dem neuen Haupteingang gegenüber."],
          explanation: "Gegenüber governs the dative. After dem, the adjective uses en.",
          requires: ["gegenueber", "der-neue"], wordBank: ["dem neuen", "den neuen", "der neue"]
        },
        {
          id: "follow-governance", type: "VERB GOVERNMENT", context: "Visitors should follow marked signs.",
          prompt: "Complete: Bitte folgen Sie ___ deutlich markiert__ Schildern.",
          promptVariants: ["Use the dative plural after folgen.", "Add the article and adjective ending for die deutlich markierten Schilder."],
          answers: ["den deutlich markierten", "Bitte folgen Sie den deutlich markierten Schildern."],
          explanation: "Folgen governs the dative. The dative plural uses den and the adjective ending en.",
          requires: ["folgen", "dativ-plural"], wordBank: ["den deutlich markierten", "die deutlich markierten", "mit deutlich markierten"]
        },
        {
          id: "mixed-ending-edit", type: "ERROR CORRECTION", context: "Three noun phrases contain ending or case errors.",
          prompt: "Correct: Mit ein neuer Plan helfen wir die betroffene Kunden.",
          promptVariants: ["Repair the phrase after mit, the object of helfen, and the weak masculine plural.", "Edit all article, adjective, and case errors."],
          answers: ["Mit einem neuen Plan helfen wir den betroffenen Kunden."], acceptableAnswers: ["Mit einem neuen Plan helfen wir den betroffenen Kundinnen und Kunden."],
          explanation: "Mit requires einem neuen Plan. Helfen requires the dative, and plural customers appear as den betroffenen Kunden.",
          requires: ["ein-neuer", "betroffen", "schwach-mann"], wordBank: []
        },
        {
          id: "articleless-genitive", type: "ADJECTIVE ENDING", context: "There is no article before starker Regen.",
          prompt: "Complete: Wegen stark__ Regens bleiben die Wege gesperrt.",
          promptVariants: ["Add the strong genitive masculine ending.", "Use wegen with articleless starker Regen."],
          answers: ["starken", "Wegen starken Regens bleiben die Wege gesperrt."],
          explanation: "In this articleless genitive phrase, the adjective uses en because the noun shows the genitive with s.",
          requires: ["wegen", "ohne-artikel"], wordBank: ["starkem", "starken", "starker"]
        },
        {
          id: "governance-contrast", type: "CASE CONTRAST", context: "The expert disagrees with one report and agrees with another proposal.",
          prompt: "Complete both dative phrases: Er widerspricht ___ erst__ Bericht und stimmt ___ neu__ Vorschlag zu.",
          promptVariants: ["Use the dative after widersprechen and zustimmen.", "Fill both definite article plus adjective combinations."],
          answers: ["dem ersten; dem neuen", "Er widerspricht dem ersten Bericht und stimmt dem neuen Vorschlag zu."], acceptableAnswers: ["dem ersten, dem neuen"],
          explanation: "Both verbs govern the dative. After dem, both adjectives take en.",
          requires: ["widersprechen", "zustimmen", "der-neue"], wordBank: ["dem ersten", "dem neuen", "den ersten", "den neuen"]
        },
        {
          id: "relative-mixed-cases", type: "GUIDED PRODUCTION", context: "Describe a consultant whose recommendation you follow.",
          prompt: "Write one sentence with der Berater, dessen Empfehlung, and folgen.",
          promptVariants: ["Use dessen for possession and a dative object after folgen.", "Build: The consultant whose clear recommendation we follow works here."],
          answers: ["Der Berater, dessen klarer Empfehlung wir folgen, arbeitet hier."], acceptableAnswers: ["Der Berater, dessen Empfehlung wir folgen, arbeitet hier."],
          explanation: "Dessen marks possession. Empfehlung is the dative object of folgen, so the articleless adjective uses er.",
          requires: ["dessen", "folgen", "ohne-artikel"], wordBank: ["arbeitet hier", "Der Berater", "dessen klarer Empfehlung", "folgen", "wir"]
        },
        {
          id: "full-case-edit", type: "EDITING", context: "A short workplace note contains four case or ending errors.",
          prompt: "Correct: Wegen dem kurzfristigen Ausfall sprechen wir mit die zuständige Leiterin über ein neue Regelung.",
          promptVariants: ["Edit the formal note using genitive wegen, dative mit, and correct adjective endings.", "Repair every marked noun phrase in the sentence."],
          answers: ["Wegen des kurzfristigen Ausfalls sprechen wir mit der zuständigen Leiterin über eine neue Regelung."],
          explanation: "Formal wegen takes the genitive here. Mit requires the dative. Über in this topic phrase takes the accusative.",
          requires: ["wegen", "zustaendig", "adjektivendung"], wordBank: []
        }
      ],
      input: {
        script: "Leiterin: Haben Sie mit dem neuen Lieferanten gesprochen? Mitarbeiter: Ja. Ich habe ihm die geänderten Bedingungen erklärt. Wegen eines technischen Problems kann er den vereinbarten Termin jedoch nicht halten. Leiterin: Dann schicken Sie bitte allen betroffenen Abteilungen einen aktualisierten Zeitplan. Mitarbeiter: Das erledige ich innerhalb einer Stunde.",
        listenPrompt: "Which case-controlled actions has the employee completed or promised, and what caused the delay?",
        listenPromptVariants: ["Name the communication actions, their recipients, and the reason for the schedule change."],
        listenAnswers: ["Er hat mit dem neuen Lieferanten gesprochen, ihm die Bedingungen erklärt und schickt allen betroffenen Abteilungen einen Zeitplan. Ein technisches Problem verursacht die Verzögerung.", "Gespräch mit dem Lieferanten, Erklärung der Bedingungen und Versand an die Abteilungen; Grund ist ein technisches Problem."],
        passage: "Gemäß der neuen Vereinbarung prüft die zuständige Stelle alle eingereichten Unterlagen innerhalb von zehn Arbeitstagen. Antragstellende, deren Unterlagen unvollständig sind, erhalten eine schriftliche Nachricht. Sie können fehlende Dokumente innerhalb einer weiteren Woche nachreichen. Bei begründeten Verzögerungen stimmt die Stelle einem späteren Termin zu. Wegen unvollständiger Kontaktdaten können manche Personen jedoch nicht rechtzeitig erreicht werden.",
        readPrompt: "Explain the deadlines, the relative-clause group, and the condition for a later deadline.",
        readPromptVariants: ["Who receives a message, how long are the two periods, and when is an extension possible?"],
        readAnswers: ["Die Prüfung dauert zehn Arbeitstage. Personen, deren Unterlagen fehlen, haben eine weitere Woche. Bei begründeten Verzögerungen kann die Stelle einem späteren Termin zustimmen.", "Zehn Arbeitstage für die Prüfung, eine weitere Woche zum Nachreichen und ein späterer Termin bei begründeter Verzögerung."]
      },
      task: {
        writingPrompt: "Write a formal project update about a delayed delivery. Explain the reason, identify affected people, describe the revised arrangement, and mention the person whose approval is needed.",
        writingPromptVariants: ["Report a delay using governed prepositions, adjective endings, a dative-governing verb, and a relative clause with possession."],
        guide: ["Use wegen with a formal genitive phrase", "Use gegenüber or mit with the dative", "Include three adjective endings in different environments", "Use ihm as a governed dative pronoun", "Add a relative clause with deren"],
        required: ["wegen", "gegenüber", "neuen", "ihm", "deren"],
        model: "Wegen des unerwarteten technischen Ausfalls kann der neue Lieferant die bestellten Geräte erst am Freitag liefern. Wir haben mit dem zuständigen Ansprechpartner gesprochen und ihm die dringendsten Anforderungen erklärt. Gegenüber dem ursprünglichen Zeitplan entsteht dadurch eine Verzögerung von drei Arbeitstagen. Alle betroffenen Teams erhalten heute einen aktualisierten Plan mit klaren Übergangsregeln. Die Abteilung, deren wichtige Tests am Mittwoch beginnen sollten, bekommt vorübergehend drei Ersatzgeräte. Der erfahrenen Projektleiterin zufolge reicht diese Lösung für die laufenden Arbeiten aus. Wir folgen ihrem praktischen Vorschlag und verschieben nur die weniger dringenden Prüfungen. Den neuen verbindlichen Liefertermin bestätigt der Lieferant schriftlich. Sollte er dem überarbeiteten Ablauf nicht zustimmen, prüfen wir innerhalb eines Tages ein alternatives Angebot. Bitte informieren Sie auch den Kunden, dessen neuer Standort von der Verzögerung betroffen ist, und senden Sie ihm die nachvollziehbare Begründung.",
        speakingPrompt: "Give a precise update about a delay, affected groups, and the revised arrangement.",
        speakingPromptVariants: ["Present a short project update with wegen, a dative-governing verb, and varied adjective endings."],
        speakingGuide: ["State the reason", "Describe the new schedule", "Name the affected group", "Use one dative verb", "State the next decision"],
        speakingRequired: ["wegen", "neuen", "betroffenen", "ihm"],
        speakingModel: "Wegen eines technischen Ausfalls liefert der neue Lieferant erst am Freitag. Wir haben dem zuständigen Ansprechpartner unsere Anforderungen erklärt und ihm einen aktualisierten Zeitplan geschickt. Alle betroffenen Teams erhalten drei Ersatzgeräte. Wir folgen dem praktischen Vorschlag der Projektleiterin und verschieben die weniger dringenden Tests. Morgen bestätigen wir den neuen verbindlichen Termin."
      },
      culture: [
        "Visible endings support precise formal communication",
        "Case and adjective endings make responsibilities, recipients, and relationships easier to track in contracts, public notices, and workplace updates. Everyday speech may vary regionally, while formal writing usually follows the standard patterns practiced here.",
        ["Kasusrektion", "Adjektivendungen", "Formelles Deutsch", "Präzision"]
      ]
    },
    {
      id: "b1-complex-sentence-architecture",
      level: "B1",
      code: "B1.41",
      title: "Complex sentence architecture",
      subtitle: "Build layered explanations with clear clause boundaries, references, and verb placement.",
      canDo: [
        "Combine main, subordinate, relative, and infinitive clauses",
        "Express cause, contrast, condition, purpose, method, and result",
        "Use paired connectors to organize balanced arguments",
        "Maintain verb placement across clauses containing several verbs",
        "Use relative clauses and pronominal adverbs to connect ideas",
        "Revise overloaded sentences into clear connected prose"
      ],
      grammar: [
        ["Plan the clause spine", "Give each clause one finite verb and mark its connector before adding details. A main-clause verb stands in position two, while a subordinate-clause verb stands at the end.", "Obwohl die Frist kurz ist, prüfen wir den Entwurf sorgfältig.", "Although the deadline is short, we review the draft carefully."],
        ["Cause, method, and result", "Da and weil express cause, indem and dadurch, dass express method, and sodass expresses a result.", "Wir vereinfachen das Formular, sodass weniger Fehler entstehen.", "We simplify the form so that fewer errors occur."],
        ["Conditions with falls and sofern", "Falls presents a possible condition. Sofern often sounds more formal and means provided that.", "Sofern alle zustimmen, beginnt der Test am Montag.", "Provided that everyone agrees, the trial begins Monday."],
        ["Paired connectors", "Einerseits and andererseits balance two sides. Zwar introduces a concession that aber limits or contrasts.", "Einerseits spart die Lösung Zeit, andererseits entstehen neue Kosten.", "On one hand the solution saves time; on the other hand new costs arise."],
        ["Relative-clause reference", "The relative pronoun agrees with the antecedent in gender and number. Its case follows its role inside the relative clause. Dessen and deren mark possession.", "Die Teams, deren Rückmeldungen fehlen, werden erneut kontaktiert.", "The teams whose feedback is missing will be contacted again."],
        ["Pronominal adverbs", "Worüber, womit, and wofür connect a preposition to an idea or thing. They avoid repeating a longer phrase.", "Das ist der Vorschlag, über den wir sprechen. Worüber sprechen wir?", "That is the proposal we are discussing. What are we discussing?"]
      ],
      words: [
        ["architektur", "die Satzarchitektur, die Satzarchitekturen", "sentence architecture", "eine klare Satzarchitektur", "Eine klare Satzarchitektur führt durch das Argument.", "Clear sentence architecture guides the reader through the argument."],
        ["satzgrenze", "die Satzgrenze, die Satzgrenzen", "clause or sentence boundary", "eine Satzgrenze markieren", "Kommas markieren viele Satzgrenzen.", "Commas mark many clause boundaries."],
        ["hauptsatz", "der Hauptsatz, die Hauptsätze", "main clause", "ein selbstständiger Hauptsatz", "Der Hauptsatz trägt die zentrale Aussage.", "The main clause carries the central statement."],
        ["nebensatz", "der Nebensatz, die Nebensätze", "subordinate clause", "ein eingeleiteter Nebensatz", "Der Nebensatz ergänzt einen Grund oder eine Bedingung.", "The subordinate clause adds a reason or condition."],
        ["relativsatz", "der Relativsatz, die Relativsätze", "relative clause", "ein erklärender Relativsatz", "Der Relativsatz beschreibt ein Nomen genauer.", "The relative clause describes a noun more precisely."],
        ["infinitivgruppe", "die Infinitivgruppe, die Infinitivgruppen", "infinitive group", "eine Infinitivgruppe mit zu", "Die Infinitivgruppe nennt häufig ein Ziel.", "The infinitive group often names a goal."],
        ["konnektor", "der Konnektor, die Konnektoren", "connector", "einen passenden Konnektor wählen", "Der Konnektor zeigt die Beziehung zwischen Aussagen.", "The connector shows the relationship between statements."],
        ["bezug", "der Bezug, die Bezüge", "reference / connection", "einen eindeutigen Bezug herstellen", "Das Pronomen braucht einen eindeutigen Bezug.", "The pronoun needs an unambiguous reference."],
        ["obwohl", "obwohl", "although", "obwohl die Frist kurz ist", "Obwohl die Frist kurz ist, prüfen wir alles.", "Although the deadline is short, we review everything."],
        ["waehrend", "während", "whereas / while", "während ein anderes Team wartet", "Ein Team beginnt, während das andere noch wartet.", "One team begins while the other is still waiting.", ["waehrend"]],
        ["indem", "indem", "by doing", "indem wir den Ablauf ändern", "Wir sparen Zeit, indem wir den Ablauf ändern.", "We save time by changing the process."],
        ["sodass", "sodass", "so that / with the result that", "sodass weniger Fehler entstehen", "Wir erklären die Schritte, sodass weniger Fehler entstehen.", "We explain the steps so that fewer errors occur."],
        ["falls", "falls", "in case / if", "falls ein Problem auftritt", "Falls ein Problem auftritt, melden Sie sich sofort.", "If a problem occurs, contact us immediately."],
        ["sofern", "sofern", "provided that", "sofern alle Bedingungen erfüllt sind", "Der Test beginnt, sofern alle Bedingungen erfüllt sind.", "The trial begins provided that all conditions are met."],
        ["da", "da", "since / because", "da die Zahlen vorliegen", "Da die Zahlen vorliegen, können wir entscheiden.", "Since the figures are available, we can decide."],
        ["dadurch-dass", "dadurch, dass", "through the fact that", "dadurch, dass wir früher prüfen", "Wir gewinnen Zeit dadurch, dass wir früher prüfen.", "We gain time by reviewing earlier."],
        ["ohne-dass", "ohne dass", "without", "ohne dass jemand warten muss", "Der Antrag läuft weiter, ohne dass jemand warten muss.", "The application continues without anyone having to wait."],
        ["anstatt-dass", "anstatt dass", "instead of", "anstatt dass wir alles wiederholen", "Wir verbessern den Entwurf, anstatt dass wir alles wiederholen.", "We improve the draft instead of repeating everything."],
        ["einerseits", "einerseits", "on one hand", "einerseits ... andererseits", "Einerseits sinken die Kosten, andererseits steigt der Aufwand.", "On one hand costs fall; on the other hand effort increases."],
        ["andererseits", "andererseits", "on the other hand", "andererseits plus Verb", "Andererseits braucht die Umstellung Zeit.", "On the other hand, the transition takes time."],
        ["zwar", "zwar", "admittedly", "zwar ... aber", "Die Lösung ist zwar günstig, aber noch nicht stabil.", "The solution is affordable, but not yet stable."],
        ["je-desto", "je ... desto", "the more ... the more", "je früher ... desto besser", "Je früher wir beginnen, desto mehr Zeit bleibt.", "The earlier we begin, the more time remains."],
        ["dessen", "dessen", "whose for masculine or neuter antecedents", "der Entwurf, dessen Ziel", "Der Entwurf, dessen Ziel klar ist, wird geprüft.", "The draft whose goal is clear is reviewed."],
        ["deren", "deren", "whose for feminine or plural antecedents", "die Teams, deren Rückmeldungen", "Die Teams, deren Rückmeldungen fehlen, erhalten eine Nachricht.", "The teams whose feedback is missing receive a message."],
        ["worueber", "worüber", "what about", "worüber wir sprechen", "Worüber sprechen wir in der Sitzung?", "What are we discussing in the meeting?", ["worueber"]],
        ["womit", "womit", "with what", "womit wir beginnen", "Womit beginnen wir die Analyse?", "What do we begin the analysis with?"],
        ["wofuer", "wofür", "what for", "wofür die Mittel reichen", "Wir klären, wofür die Mittel reichen.", "We clarify what the funds are sufficient for.", ["wofuer"]],
        ["voraussetzung", "die Voraussetzung, die Voraussetzungen", "condition / prerequisite", "eine Voraussetzung erfüllen", "Der Zeitplan gilt unter einer wichtigen Voraussetzung.", "The schedule applies under one important condition."],
        ["folge", "die Folge, die Folgen", "consequence", "eine unmittelbare Folge", "Die Verzögerung hat mehrere Folgen.", "The delay has several consequences."],
        ["einwand", "der Einwand, die Einwände", "objection", "einen Einwand berücksichtigen", "Der Einwand betrifft die verfügbare Zeit.", "The objection concerns the available time."],
        ["abwaegen", "abwägen", "to weigh up", "Vor- und Nachteile abwägen", "Wir müssen beide Möglichkeiten sorgfältig abwägen.", "We have to weigh both possibilities carefully.", ["abwaegen"]],
        ["praezisieren", "präzisieren", "to clarify / make precise", "eine Aussage präzisieren", "Der Relativsatz kann die Aussage präzisieren.", "The relative clause can make the statement more precise.", ["praezisieren"]],
        ["zusammenfassen", "zusammenfassen", "to summarize", "ein Ergebnis zusammenfassen", "Am Ende fassen wir das Ergebnis zusammen.", "At the end we summarize the result."],
        ["nachvollziehen", "nachvollziehen", "to follow / understand", "eine Begründung nachvollziehen", "Alle Beteiligten sollen die Entscheidung nachvollziehen können.", "Everyone involved should be able to understand the decision."]
      ],
      questions: [
        {
          id: "cause-result-chain", type: "CLAUSE LINKING", context: "Clear instructions reduce errors.",
          prompt: "Join with sodass: Wir erklären jeden Schritt genau. Weniger Fehler entstehen.",
          promptVariants: ["Express the second statement as the result of the first.", "Build one sentence whose result clause ends with entstehen."],
          answers: ["Wir erklären jeden Schritt genau, sodass weniger Fehler entstehen."], acceptableAnswers: ["Wir erklären die Schritte genau, sodass weniger Fehler entstehen."],
          explanation: "Sodass introduces a result clause, and the finite verb entstehen stands at the end.",
          requires: ["sodass", "folge"], wordBank: ["entstehen", "genau", "sodass", "weniger Fehler", "Wir erklären jeden Schritt"]
        },
        {
          id: "method-indem", type: "CLAUSE LINKING", context: "Earlier checks save time.",
          prompt: "Join with indem: Wir prüfen die Unterlagen früher. So gewinnen wir Zeit.",
          promptVariants: ["Express the method with an indem clause.", "Say how the team gains time."],
          answers: ["Wir gewinnen Zeit, indem wir die Unterlagen früher prüfen."], acceptableAnswers: ["Indem wir die Unterlagen früher prüfen, gewinnen wir Zeit."],
          explanation: "Indem introduces the method and sends prüfen to the end of its clause.",
          requires: ["indem"], wordBank: ["die Unterlagen", "früher", "indem", "prüfen", "wir", "Wir gewinnen Zeit"]
        },
        {
          id: "condition-sofern", type: "CONDITION", context: "The trial begins only if every condition is fulfilled.",
          prompt: "Write the condition with sofern.",
          promptVariants: ["Translate: The trial begins on Monday, provided that all conditions are fulfilled.", "Use a sofern clause after the main statement."],
          answers: ["Der Test beginnt am Montag, sofern alle Bedingungen erfüllt sind."], acceptableAnswers: ["Sofern alle Bedingungen erfüllt sind, beginnt der Test am Montag."],
          explanation: "Sofern introduces a formal condition, and sind closes the subordinate clause.",
          requires: ["sofern", "voraussetzung"], wordBank: ["alle Bedingungen", "am Montag", "Der Test beginnt", "erfüllt sind", "sofern"]
        },
        {
          id: "fronted-concession", type: "CLAUSE ORDER", context: "The deadline is short, yet the review remains careful.",
          prompt: "Begin with Obwohl die Frist kurz ist and add the main clause.",
          promptVariants: ["Combine the contrast and place prüfen before wir after the comma.", "Write a fronted obwohl clause followed by we review the draft carefully."],
          answers: ["Obwohl die Frist kurz ist, prüfen wir den Entwurf sorgfältig."], acceptableAnswers: ["Wir prüfen den Entwurf sorgfältig, obwohl die Frist kurz ist."],
          explanation: "The subordinate clause comes first, so the main clause starts with the finite verb prüfen.",
          requires: ["obwohl", "satzgrenze"], wordBank: ["den Entwurf", "Obwohl die Frist kurz ist", "prüfen", "sorgfältig", "wir"]
        },
        {
          id: "balanced-argument", type: "PAIRED CONNECTORS", context: "A proposal saves time and creates new costs.",
          prompt: "Write both sides with einerseits and andererseits.",
          promptVariants: ["Balance the benefit and drawback in one sentence.", "Begin each side with its paired connector and keep verb-second order."],
          answers: ["Einerseits spart der Vorschlag Zeit, andererseits entstehen neue Kosten."], acceptableAnswers: ["Einerseits spart die Lösung Zeit, andererseits entstehen neue Kosten."],
          explanation: "Each connector occupies position one, followed by the finite verb.",
          requires: ["einerseits", "andererseits", "einwand"], wordBank: ["andererseits", "der Vorschlag", "Einerseits", "entstehen", "neue Kosten", "spart", "Zeit"]
        },
        {
          id: "zwar-aber", type: "PAIRED CONNECTORS", context: "The solution is affordable and still unstable.",
          prompt: "Combine with zwar ... aber.",
          promptVariants: ["Acknowledge the low cost before stating the stability problem.", "Use the paired concession in one sentence."],
          answers: ["Die Lösung ist zwar günstig, aber sie ist noch nicht stabil."], acceptableAnswers: ["Die Lösung ist zwar günstig, aber noch nicht stabil."],
          explanation: "Zwar introduces the acknowledged point, and aber adds the limiting contrast.",
          requires: ["zwar"], wordBank: ["aber", "Die Lösung", "günstig", "ist", "noch nicht stabil", "zwar"]
        },
        {
          id: "je-desto", type: "CORRELATIVE STRUCTURE", context: "Starting earlier leaves more time.",
          prompt: "Complete: Je früher wir beginnen, desto ___.",
          promptVariants: ["Finish the paired comparison with more time remains.", "Build the second half with desto and verb-second order."],
          answers: ["mehr Zeit bleibt", "Je früher wir beginnen, desto mehr Zeit bleibt."],
          explanation: "The je clause ends with beginnen. Desto fills position one in the main clause, followed by the comparative phrase and verb.",
          requires: ["je-desto"], wordBank: ["bleibt", "mehr Zeit", "mehr Zeit bleibt"]
        },
        {
          id: "relative-possession", type: "RELATIVE CLAUSE", context: "Several teams have not submitted feedback.",
          prompt: "Join: Die Teams erhalten eine Nachricht. Ihre Rückmeldungen fehlen.",
          promptVariants: ["Use deren to show that the feedback belongs to the teams.", "Insert a possessive relative clause after Die Teams."],
          answers: ["Die Teams, deren Rückmeldungen fehlen, erhalten eine Nachricht."], acceptableAnswers: ["Die Teams, deren Rückmeldung fehlt, erhalten eine Nachricht."],
          explanation: "Deren refers back to the plural antecedent Teams and marks possession.",
          requires: ["deren", "relativsatz"], wordBank: ["deren Rückmeldungen", "Die Teams", "erhalten eine Nachricht", "fehlen"]
        },
        {
          id: "relative-case", type: "RELATIVE CLAUSE", context: "You are discussing a proposal.",
          prompt: "Join: Das ist der Vorschlag. Wir sprechen über den Vorschlag.",
          promptVariants: ["Replace the repeated proposal with the required relative pronoun after über.", "Create a relative clause whose preposition is über."],
          answers: ["Das ist der Vorschlag, über den wir sprechen."], acceptableAnswers: ["Der Vorschlag, über den wir sprechen, ist das."],
          explanation: "The masculine antecedent is der Vorschlag. Über sprechen requires über plus accusative, so the pronoun is den.",
          requires: ["relativsatz", "bezug"], wordBank: ["Das ist der Vorschlag", "sprechen", "über den", "wir"]
        },
        {
          id: "pronominal-adverb", type: "REFERENCE", context: "The discussion concerns implementation costs.",
          prompt: "Ask: What are we talking about? Then answer: We are talking about the costs.",
          promptVariants: ["Use worüber in the question and darüber in the answer.", "Replace über was and über die Kosten with pronominal adverbs."],
          answers: ["Worüber sprechen wir? Wir sprechen darüber, wie hoch die Kosten sind."], acceptableAnswers: ["Worüber sprechen wir? Wir sprechen über die Kosten.", "Worüber sprechen wir? Darüber, wie hoch die Kosten sind."],
          explanation: "Worüber asks about an idea or thing. Darüber refers back to the topic.",
          requires: ["worueber", "bezug"], wordBank: ["darüber", "sprechen", "wir", "Wir sprechen", "Worüber"]
        },
        {
          id: "without-clause", type: "CLAUSE LINKING", context: "The process continues and nobody has to wait.",
          prompt: "Join with ohne dass.",
          promptVariants: ["Express that the process continues without anyone waiting.", "Use a subordinate clause ending with warten muss."],
          answers: ["Der Prozess läuft weiter, ohne dass jemand warten muss."], acceptableAnswers: ["Ohne dass jemand warten muss, läuft der Prozess weiter."],
          explanation: "Ohne dass introduces a subordinate clause. The infinitive comes before the finite modal at the end.",
          requires: ["ohne-dass", "nebensatz"], wordBank: ["Der Prozess läuft weiter", "jemand", "muss", "ohne dass", "warten"]
        },
        {
          id: "instead-clause", type: "CLAUSE LINKING", context: "The team improves an existing draft instead of repeating everything.",
          prompt: "Combine the ideas with anstatt dass.",
          promptVariants: ["State the chosen action and the avoided alternative.", "Use anstatt dass with wiederholen at the end."],
          answers: ["Wir verbessern den Entwurf, anstatt dass wir alles wiederholen."], acceptableAnswers: ["Anstatt dass wir alles wiederholen, verbessern wir den Entwurf."],
          explanation: "Anstatt dass introduces the avoided alternative and places wiederholen at the end.",
          requires: ["anstatt-dass"], wordBank: ["alles", "anstatt dass", "den Entwurf", "verbessern", "wiederholen", "wir", "Wir"]
        },
        {
          id: "nested-perfect-modal", type: "VERB CLUSTER", context: "You report a past obligation.",
          prompt: "Complete: Sie sagt, dass sie den Termin hat verschieben müssen.",
          promptVariants: ["Repeat the correct subordinate clause with the replacement infinitive construction.", "Report that she had to postpone the appointment."],
          answers: ["Sie sagt, dass sie den Termin hat verschieben müssen."], acceptableAnswers: ["Sie berichtet, dass sie den Termin hat verschieben müssen."],
          explanation: "With a modal in the perfect subordinate clause, the finite auxiliary hat precedes the double infinitive verschieben müssen.",
          requires: ["nebensatz", "architektur"], wordBank: ["dass", "den Termin", "hat", "müssen", "Sie sagt", "sie", "verschieben"]
        },
        {
          id: "ambiguous-reference-edit", type: "EDITING", context: "The pronoun has two possible antecedents.",
          prompt: "Make the reference clear: Nina sprach mit Lea, nachdem sie den Bericht gelesen hatte.",
          promptVariants: ["Rewrite so that Nina is clearly the reader.", "Replace the ambiguous pronoun with an explicit name."],
          answers: ["Nachdem Nina den Bericht gelesen hatte, sprach sie mit Lea.", "Nina sprach mit Lea, nachdem Nina den Bericht gelesen hatte."],
          explanation: "Naming Nina inside the subordinate clause removes the competing reference to Lea.",
          requires: ["bezug", "praezisieren"], wordBank: []
        },
        {
          id: "multi-relation-chain", type: "GUIDED PRODUCTION", context: "A pilot can start after approval and will reduce errors through training.",
          prompt: "Write one sentence using sofern, indem, and sodass.",
          promptVariants: ["State the condition, method, and result in one controlled sentence.", "Connect approval, training, and fewer errors with three clause relations."],
          answers: ["Sofern die Leitung zustimmt, starten wir den Pilotversuch, indem wir alle Mitarbeitenden schulen, sodass weniger Fehler entstehen."], acceptableAnswers: ["Wir starten den Pilotversuch, sofern die Leitung zustimmt, und schulen alle Mitarbeitenden, sodass weniger Fehler entstehen."],
          explanation: "Each connector has a clear role: sofern marks the condition, indem the method, and sodass the result.",
          requires: ["sofern", "indem", "sodass"], wordBank: ["alle Mitarbeitenden schulen", "die Leitung zustimmt", "indem wir", "Sofern", "sodass weniger Fehler entstehen", "starten wir den Pilotversuch"]
        },
        {
          id: "overloaded-sentence-edit", type: "EDITING", context: "The message contains several ideas without clear boundaries.",
          prompt: "Revise into two clear sentences: Wir ändern den Ablauf er ist zu langsam die Teams warten deshalb entstehen Fehler.",
          promptVariants: ["Add clause boundaries and connectors for cause and result.", "Turn the run-on into a reason sentence and a result sentence."],
          answers: ["Wir ändern den Ablauf, weil er zu langsam ist. Die Teams warten, sodass Fehler entstehen."], acceptableAnswers: ["Da der Ablauf zu langsam ist, ändern wir ihn. Die Teams warten, sodass Fehler entstehen."],
          explanation: "Weil or da marks the reason, and sodass marks the result. Each clause has one clear finite verb position.",
          requires: ["satzgrenze", "sodass", "da"], wordBank: []
        },
        {
          id: "full-argument-transfer", type: "ARGUMENT BUILDING", context: "Remote training is flexible but requires reliable technology.",
          prompt: "Write three connected sentences using einerseits, obwohl, and sofern.",
          promptVariants: ["Balance a benefit and risk, then state a condition for success.", "Build a short argument with contrast, concession, and condition."],
          answers: ["Einerseits ist die Online-Schulung flexibel, andererseits braucht sie zuverlässige Technik. Obwohl technische Probleme auftreten können, spart sie Reisezeit. Sie ist sinnvoll, sofern alle Teilnehmenden Unterstützung erhalten."], acceptableAnswers: ["Einerseits bietet die Online-Schulung Flexibilität, andererseits setzt sie zuverlässige Technik voraus. Obwohl Probleme auftreten können, spart sie Zeit. Sofern alle Unterstützung erhalten, ist sie sinnvoll."],
          explanation: "The paired connectors balance the first sentence. Obwohl adds a concession, and sofern sets the condition.",
          requires: ["einerseits", "andererseits", "obwohl", "sofern"], wordBank: []
        }
      ],
      input: {
        script: "Moderatorin: Einerseits verkürzt das digitale Formular die Bearbeitungszeit, andererseits melden einige Teams neue Fehler. Projektleiter: Wir können die Fehler reduzieren, indem wir Pflichtfelder klarer erklären. Moderatorin: Beginnt der Test trotzdem nächste Woche? Projektleiter: Sofern die überarbeitete Version bis Freitag bereitsteht, starten wir am Montag. Falls die Fehlerquote hoch bleibt, verlängern wir die Testphase.",
        listenPrompt: "Summarize the benefit, concern, proposed method, and two conditions.",
        listenPromptVariants: ["Which four logical relations structure the discussion? Give the concrete content of each."],
        listenAnswers: ["Das Formular spart Zeit, verursacht aber neue Fehler. Klarere Erklärungen sollen helfen. Der Test startet, sofern die Version fertig ist, und wird verlängert, falls die Fehlerquote hoch bleibt.", "Vorteil: kürzere Bearbeitung. Problem: neue Fehler. Methode: Pflichtfelder erklären. Bedingungen: fertige Version und mögliche Verlängerung bei hoher Fehlerquote."],
        passage: "Die Arbeitsgruppe empfiehlt eine gestufte Einführung, obwohl der ursprüngliche Plan einen sofortigen Start vorsah. Zunächst sollen zwei Teams teilnehmen, deren Arbeitsabläufe besonders gut dokumentiert sind. Sie testen das Verfahren vier Wochen lang, indem sie Fehler und Bearbeitungszeiten täglich erfassen. Die Ergebnisse werden wöchentlich veröffentlicht, sodass andere Teams die Entwicklung nachvollziehen können. Sofern die Fehlerquote unter drei Prozent bleibt, wird der Test erweitert. Falls dieses Ziel verfehlt wird, prüft die Arbeitsgruppe, worüber die meisten Beschwerden eingegangen sind, und überarbeitet die betreffenden Schritte.",
        readPrompt: "Map the concession, participant description, method, result, and two alternative conditions.",
        readPromptVariants: ["Explain how each connector organizes the rollout recommendation."],
        readAnswers: ["Obwohl markiert den Gegensatz zum ursprünglichen Plan. Deren beschreibt die zwei Teams. Indem nennt die tägliche Erfassung als Methode. Sodass nennt Transparenz als Folge. Sofern führt zur Erweiterung; falls das Ziel verfehlt wird, folgt eine Überarbeitung.", "Trotz des Sofortplans wird gestuft getestet. Dokumentierte Teams erfassen täglich Daten, andere können die Entwicklung verfolgen, und das Ergebnis entscheidet über Erweiterung oder Überarbeitung."]
      },
      task: {
        writingPrompt: "Write a structured recommendation about introducing a new workplace process. Present two sides, explain a method and result, state a condition, and identify a group whose feedback is still missing.",
        writingPromptVariants: ["Develop a balanced rollout recommendation using five distinct clause relationships and a possessive relative clause."],
        guide: ["Balance two perspectives with einerseits and andererseits", "Use obwohl or während for contrast", "Explain the method with indem", "State the result with sodass", "Use sofern for a condition and deren for possession"],
        required: ["obwohl", "während", "sodass", "deren", "einerseits"],
        model: "Einerseits könnte der neue digitale Freigabeprozess die Bearbeitungszeit deutlich verkürzen, andererseits befürchten mehrere Teams zusätzliche Kontrollschritte. Obwohl die technische Lösung bereits getestet wurde, fehlen noch Rückmeldungen der Außenstellen. Die Außenstellen, deren Arbeitsabläufe besonders unterschiedlich sind, sollten deshalb zuerst beteiligt werden. Während die IT die Zugänge vorbereitet, erstellt die Projektgruppe kurze Anleitungen für jede Rolle. Wir verringern den Schulungsaufwand, indem wir praktische Beispiele aus dem Arbeitsalltag verwenden. Die Anleitung wird außerdem direkt im Formular angezeigt, sodass Beschäftigte wichtige Hinweise sofort sehen. Sofern alle Standorte bis Freitag zustimmen, beginnt am Montag eine vierwöchige Pilotphase. Falls die Fehlerquote über fünf Prozent steigt, wird der Test unterbrochen und die Ursache gemeinsam ausgewertet. Zwar kostet diese gestufte Einführung mehr Vorbereitungszeit, aber sie liefert verlässlichere Ergebnisse. Je genauer wir Beschwerden dokumentieren, desto gezielter können wir einzelne Schritte verbessern. Am Ende sollte die Leitung zusammenfassen, welche Einwände berücksichtigt wurden und wofür zusätzliche Mittel benötigt werden.",
        speakingPrompt: "Present a balanced recommendation with a contrast, method, result, condition, and relative clause.",
        speakingPromptVariants: ["Explain how a process should be introduced and connect every step with a clear logical relation."],
        speakingGuide: ["Present both sides", "Add a concession", "Explain the method", "State one result and one condition", "Close with a recommendation"],
        speakingRequired: ["einerseits", "obwohl", "indem", "sodass", "sofern"],
        speakingModel: "Einerseits spart der digitale Prozess Zeit, andererseits entstehen neue Schulungsaufgaben. Obwohl die Technik funktioniert, fehlen Rückmeldungen einiger Teams. Wir verbessern die Einführung, indem wir kurze praktische Übungen anbieten, sodass Fragen früh sichtbar werden. Sofern alle Standorte zustimmen, beginnt der Test am Montag. Die Teams, deren Abläufe besonders komplex sind, erhalten zusätzliche Unterstützung. Nach vier Wochen werten wir die Ergebnisse aus und entscheiden über die Erweiterung."
      },
      culture: [
        "Clear clause links strengthen discussion",
        "Long German sentences are manageable when every connector states a clear relationship and every pronoun has an identifiable reference. In meetings and formal writing, shorter linked sentences often communicate complex reasoning more effectively than one heavily nested sentence.",
        ["Satzarchitektur", "Konnektoren", "Argumentation", "Relativsätze"]
      ]
    }
  ];

  const existingById = new Map(course.modules.map(module => [module.id, module]));
  const existingByCode = new Map(course.modules.map(module => [module.code, module]));

  specs.forEach(spec => {
    const idMatch = existingById.get(spec.id);
    const codeMatch = existingByCode.get(spec.code);
    if (idMatch || codeMatch) {
      if (idMatch?.code === spec.code && codeMatch?.id === spec.id) return;
      throw new Error(`Grammar pathway collision for ${spec.code} (${spec.id})`);
    }
    const module = makeModule(spec);
    if (module.words.length < 30) throw new Error(`${module.id} needs at least 30 vocabulary bundles`);
    if (module.canDo.length < 5) throw new Error(`${module.id} needs at least 5 can-do outcomes`);
    if (module.grammar.length < 5) throw new Error(`${module.id} needs at least 5 grammar cards`);
    if (module.questions.length < 16) throw new Error(`${module.id} needs at least 16 curated questions`);
    course.modules.push(module);
    existingById.set(module.id, module);
    existingByCode.set(module.code, module);
  });
})();
