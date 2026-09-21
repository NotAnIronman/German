(function () {
  "use strict";

  const course = window.SATZWERK_CURRICULUM;
  if (!course?.modules) throw new Error("Satzwerk curriculum must load before the A0-A1 grammar pathway");

  const sources = {
    A0: {
      title: "Goethe-Institut: A1 course content",
      url: "https://www.goethe.de/resources/files/pdf315/a1-panorama---description-of-course-content-v1.pdf"
    },
    A1: {
      title: "Goethe-Institut: A1 glossary",
      url: "https://lernen.goethe.de/deutschonline/A1/PDF/EN/A1_deutschonline_course_vocabulary_1-18.pdf"
    }
  };

  const taskRanges = {
    A0: [35, 65],
    A1: [65, 105]
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
      id: row[0],
      type: row[1],
      context: row[2],
      prompt: row[3],
      answers: row[4],
      explanation: row[5],
      requires: (row[6] || []).map(id => `${moduleId}-${id}`),
      wordBank: row[7] || [],
      promptVariants: row[8] || []
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
        listenAnswers: spec.input.listenAnswers,
        listenPromptVariants: spec.input.listenPromptVariants || [],
        passage: spec.input.passage,
        readPrompt: spec.input.readPrompt,
        readAnswers: spec.input.readAnswers,
        readPromptVariants: spec.input.readPromptVariants || []
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
      id: "a0-article-foundations",
      level: "A0",
      code: "A0.22",
      title: "Article foundations",
      subtitle: "Learn nouns together with der, die, or das and retrieve the article from memory.",
      canDo: [
        "Recall common nouns with their definite article",
        "Sort familiar nouns into der, die, and das groups",
        "Use ein with masculine and neuter nouns",
        "Use eine with feminine nouns",
        "Use die with plural nouns",
        "Build short nominative sentences with a correct article"
      ],
      grammar: [
        ["One noun, one article bundle", "Store each singular noun as a complete bundle. Say der Tisch, die Lampe, and das Buch aloud as one unit.", "der Tisch · die Lampe · das Buch", "the table · the lamp · the book"],
        ["Masculine with der", "Many nouns use der. The article belongs in every new noun card and every spoken repetition.", "Der Stuhl ist frei.", "The chair is available."],
        ["Feminine with die", "Feminine singular nouns use die in the basic nominative form.", "Die Tasche ist neu.", "The bag is new."],
        ["Neuter with das", "Neuter singular nouns use das in the basic nominative form.", "Das Fenster ist offen.", "The window is open."],
        ["Ein and eine", "Use ein with masculine and neuter nouns. Use eine with feminine nouns.", "ein Hund · eine Katze · ein Kind", "a dog · a cat · a child"],
        ["Plural with die", "Every plural noun uses die in the nominative form. Learn the plural ending with the noun.", "das Buch, die Bücher", "the book, the books"]
      ],
      words: [
        ["tisch", "der Tisch, die Tische", "table", "der Tisch · die Tische", "Der Tisch ist groß.", "The table is large."],
        ["lampe", "die Lampe, die Lampen", "lamp", "die Lampe · die Lampen", "Die Lampe ist hell.", "The lamp is bright."],
        ["buch", "das Buch, die Bücher", "book", "das Buch · die Bücher", "Das Buch ist neu.", "The book is new.", ["das Buch, die Buecher"]],
        ["stuhl", "der Stuhl, die Stühle", "chair", "der Stuhl · die Stühle", "Der Stuhl ist frei.", "The chair is available.", ["der Stuhl, die Stuehle"]],
        ["tasche", "die Tasche, die Taschen", "bag", "die Tasche · die Taschen", "Die Tasche ist schwarz.", "The bag is black."],
        ["fenster", "das Fenster, die Fenster", "window", "das Fenster · die Fenster", "Das Fenster ist offen.", "The window is open."],
        ["schluessel", "der Schlüssel, die Schlüssel", "key", "der Schlüssel · die Schlüssel", "Der Schlüssel ist hier.", "The key is here.", ["der Schluessel, die Schluessel"]],
        ["tuer", "die Tür, die Türen", "door", "die Tür · die Türen", "Die Tür ist zu.", "The door is closed.", ["die Tuer, die Tueren"]],
        ["handy", "das Handy, die Handys", "mobile phone", "das Handy · die Handys", "Das Handy ist in der Tasche.", "The mobile phone is in the bag."],
        ["apfel", "der Apfel, die Äpfel", "apple", "der Apfel · die Äpfel", "Der Apfel ist rot.", "The apple is red.", ["der Apfel, die Aepfel"]],
        ["banane", "die Banane, die Bananen", "banana", "die Banane · die Bananen", "Die Banane ist gelb.", "The banana is yellow."],
        ["brot", "das Brot, die Brote", "bread / loaf", "das Brot · die Brote", "Das Brot ist frisch.", "The bread is fresh."],
        ["kaffee", "der Kaffee", "coffee", "der Kaffee", "Der Kaffee ist heiß.", "The coffee is hot.", ["der Kaffee ist heiss"]],
        ["milch", "die Milch", "milk", "die Milch", "Die Milch ist kalt.", "The milk is cold."],
        ["wasser", "das Wasser", "water", "das Wasser", "Das Wasser ist kalt.", "The water is cold."],
        ["hund", "der Hund, die Hunde", "dog", "der Hund · die Hunde", "Ein Hund ist im Park.", "A dog is in the park."],
        ["katze", "die Katze, die Katzen", "cat", "die Katze · die Katzen", "Eine Katze ist hier.", "A cat is here."],
        ["kind", "das Kind, die Kinder", "child", "das Kind · die Kinder", "Das Kind heißt Leo.", "The child's name is Leo."],
        ["auto", "das Auto, die Autos", "car", "das Auto · die Autos", "Das Auto ist blau.", "The car is blue."],
        ["uhr", "die Uhr, die Uhren", "clock / watch", "die Uhr · die Uhren", "Die Uhr ist alt.", "The clock is old."],
        ["ball", "der Ball, die Bälle", "ball", "der Ball · die Bälle", "Der Ball ist unter dem Tisch.", "The ball is under the table.", ["der Ball, die Baelle"]],
        ["haus", "das Haus, die Häuser", "house", "das Haus · die Häuser", "Das Haus ist weiß.", "The house is white.", ["das Haus, die Haeuser", "Das Haus ist weiss."]],
        ["strasse", "die Straße, die Straßen", "street", "die Straße · die Straßen", "Die Straße ist lang.", "The street is long.", ["die Strasse, die Strassen"]],
        ["bahnhof", "der Bahnhof, die Bahnhöfe", "train station", "der Bahnhof · die Bahnhöfe", "Der Bahnhof ist dort.", "The train station is there.", ["der Bahnhof, die Bahnhoefe"]],
        ["flasche", "die Flasche, die Flaschen", "bottle", "die Flasche · die Flaschen", "Die Flasche ist leer.", "The bottle is empty."],
        ["glas", "das Glas, die Gläser", "glass", "das Glas · die Gläser", "Das Glas ist voll.", "The glass is full.", ["das Glas, die Glaeser"]],
        ["freund", "der Freund, die Freunde", "male friend", "der Freund · die Freunde", "Ein Freund kommt heute.", "A friend is coming today."],
        ["freundin", "die Freundin, die Freundinnen", "female friend", "die Freundin · die Freundinnen", "Eine Freundin kommt heute.", "A friend is coming today."],
        ["problem", "das Problem, die Probleme", "problem", "das Problem · die Probleme", "Das Problem ist klein.", "The problem is small."],
        ["zeit", "die Zeit", "time", "die Zeit", "Die Zeit ist knapp.", "Time is short."],
        ["name", "der Name, die Namen", "name", "der Name · die Namen", "Der Name ist neu für mich.", "The name is new to me."],
        ["foto", "das Foto, die Fotos", "photo", "das Foto · die Fotos", "Das Foto ist schön.", "The photo is beautiful.", ["Das Foto ist schoen."]]
      ],
      questions: [
        ["article-der-tisch", "ARTICLE RETRIEVAL", "You point to one table.", "Write the German noun for 'table' with its definite article.", ["der Tisch"], "Learn the article and noun together: der Tisch.", ["tisch"], ["der", "die", "das", "Tisch"], [
          { prompt: "Write the German noun for 'chair' with its definite article.", answers: ["der Stuhl"], requires: ["a0-article-foundations-stuhl"], wordBank: ["der", "die", "das", "Stuhl"] }
        ]],
        ["article-die-lampe", "ARTICLE RETRIEVAL", "A lamp is on the desk.", "Write the German noun for 'lamp' with its definite article.", ["die Lampe"], "Lampe is feminine: die Lampe.", ["lampe"], ["der", "die", "das", "Lampe"], [
          { prompt: "Write the German noun for 'bag' with its definite article.", answers: ["die Tasche"], requires: ["a0-article-foundations-tasche"], wordBank: ["der", "die", "das", "Tasche"] }
        ]],
        ["article-das-buch", "ARTICLE RETRIEVAL", "One book is on the table.", "Write the German noun for 'book' with its definite article.", ["das Buch"], "Buch is neuter: das Buch.", ["buch"], ["der", "die", "das", "Buch"], [
          { prompt: "Write the German noun for 'window' with its definite article.", answers: ["das Fenster"], requires: ["a0-article-foundations-fenster"], wordBank: ["der", "die", "das", "Fenster"] }
        ]],
        ["three-genders-home", "SORT AND BUILD", "You label three objects in a room.", "Write these complete German noun bundles in order: the chair, the door, the mobile phone.", ["der Stuhl, die Tür, das Handy", "der Stuhl · die Tür · das Handy"], "The three patterns are der Stuhl, die Tür, and das Handy.", ["stuhl", "tuer", "handy"], ["der Stuhl", "die Tür", "das Handy"], [
          { prompt: "Write these complete German noun bundles in order: the key, the bag, the window.", answers: ["der Schlüssel, die Tasche, das Fenster", "der Schlüssel · die Tasche · das Fenster", "der Schluessel, die Tasche, das Fenster"], requires: ["a0-article-foundations-schluessel", "a0-article-foundations-tasche", "a0-article-foundations-fenster"] }
        ]],
        ["three-genders-food", "SORT AND BUILD", "You label breakfast items.", "Write these complete German noun bundles in order: the coffee, the milk, the water.", ["der Kaffee, die Milch, das Wasser", "der Kaffee · die Milch · das Wasser"], "Each food word keeps its own article.", ["kaffee", "milch", "wasser"], ["der Kaffee", "die Milch", "das Wasser"], [
          { prompt: "Write these complete German noun bundles in order: the apple, the banana, the bread.", answers: ["der Apfel, die Banane, das Brot", "der Apfel · die Banane · das Brot"], requires: ["a0-article-foundations-apfel", "a0-article-foundations-banane", "a0-article-foundations-brot"] }
        ]],
        ["indefinite-masculine", "ARTICLE TRANSFER", "You see one unfamiliar dog.", "Write 'a dog' in German. Include the indefinite article.", ["ein Hund"], "Masculine nominative uses ein: ein Hund.", ["hund"], ["ein", "eine", "Hund"], [
          { prompt: "Write 'a ball' in German. Include the indefinite article.", answers: ["ein Ball"], requires: ["a0-article-foundations-ball"] }
        ]],
        ["indefinite-feminine", "ARTICLE TRANSFER", "You see one unfamiliar cat.", "Write 'a cat' in German. Include the indefinite article.", ["eine Katze"], "Feminine nominative uses eine: eine Katze.", ["katze"], ["ein", "eine", "Katze"], [
          { prompt: "Write 'a bottle' in German. Include the indefinite article.", answers: ["eine Flasche"], requires: ["a0-article-foundations-flasche"] }
        ]],
        ["indefinite-neuter", "ARTICLE TRANSFER", "You see one unfamiliar house.", "Write 'a house' in German. Include the indefinite article.", ["ein Haus"], "Neuter nominative uses ein: ein Haus.", ["haus"], ["ein", "eine", "Haus"], [
          { prompt: "Write 'a photo' in German. Include the indefinite article.", answers: ["ein Foto"], requires: ["a0-article-foundations-foto"] }
        ]],
        ["plural-die", "PLURAL RETRIEVAL", "Several books are on a shelf.", "Write 'the books' in German. Include the plural article.", ["die Bücher", "die Buecher"], "Every nominative plural uses die. Buch changes to Bücher.", ["buch"], ["die", "Bücher"], [
          { prompt: "Write 'the houses' in German. Include the plural article.", answers: ["die Häuser", "die Haeuser"], requires: ["a0-article-foundations-haus"] }
        ]],
        ["complete-key-sentence", "SENTENCE BUILDING", "You identify a particular key.", "Write the full sentence: That is the key.", ["Das ist der Schlüssel.", "Das ist der Schluessel."], "Schlüssel is masculine, so the noun bundle is der Schlüssel.", ["schluessel"], ["Das", "ist", "der", "Schlüssel"], [
          { prompt: "Write the full sentence: That is the train station.", answers: ["Das ist der Bahnhof."], requires: ["a0-article-foundations-bahnhof"] }
        ]],
        ["subject-feminine", "SENTENCE BUILDING", "You describe one familiar object.", "Write the full sentence: The bag is black.", ["Die Tasche ist schwarz."], "Tasche is feminine, so the sentence begins with Die Tasche.", ["tasche"], ["Die", "Tasche", "ist", "schwarz"], [
          { prompt: "Write the full sentence: The bottle is empty.", answers: ["Die Flasche ist leer."], requires: ["a0-article-foundations-flasche"] }
        ]],
        ["subject-neuter", "SENTENCE BUILDING", "You describe one familiar object.", "Write the full sentence: The window is open.", ["Das Fenster ist offen."], "Fenster is neuter, so the sentence begins with Das Fenster.", ["fenster"], ["Das", "Fenster", "ist", "offen"], [
          { prompt: "Write the full sentence: The car is blue.", answers: ["Das Auto ist blau."], requires: ["a0-article-foundations-auto"] }
        ]],
        ["new-noun-sort", "GENDER CONTRAST", "You make three new labels.", "Write these complete noun bundles in order: the ball, the clock, the car.", ["der Ball, die Uhr, das Auto", "der Ball · die Uhr · das Auto"], "Retrieve a separate article for every noun.", ["ball", "uhr", "auto"], ["der Ball", "die Uhr", "das Auto"], [
          { prompt: "Write these complete noun bundles in order: the train station, the street, the house.", answers: ["der Bahnhof, die Straße, das Haus", "der Bahnhof · die Straße · das Haus", "der Bahnhof, die Strasse, das Haus"], requires: ["a0-article-foundations-bahnhof", "a0-article-foundations-strasse", "a0-article-foundations-haus"] }
        ]],
        ["singular-to-plural", "NUMBER CONTRAST", "You change one label from singular to plural.", "Write the singular and plural bundles for 'door' in this order. Include both articles.", ["die Tür, die Türen", "die Tür · die Türen", "die Tuer, die Tueren"], "Feminine singular and every plural both use die. The noun ending still changes.", ["tuer"], ["die Tür", "die Türen"], [
          { prompt: "Write the singular and plural bundles for 'glass' in this order. Include both articles.", answers: ["das Glas, die Gläser", "das Glas · die Gläser", "das Glas, die Glaeser"], requires: ["a0-article-foundations-glas"] }
        ]],
        ["person-articles", "ARTICLE TRANSFER", "You introduce three people.", "Write these bundles in order: a male friend, a female friend, a child.", ["ein Freund, eine Freundin, ein Kind", "ein Freund · eine Freundin · ein Kind"], "Use ein with masculine and neuter nouns and eine with feminine nouns.", ["freund", "freundin", "kind"], ["ein Freund", "eine Freundin", "ein Kind"], [
          { prompt: "Write these bundles in order: a dog, a cat, a child.", answers: ["ein Hund, eine Katze, ein Kind", "ein Hund · eine Katze · ein Kind"], requires: ["a0-article-foundations-hund", "a0-article-foundations-katze", "a0-article-foundations-kind"] }
        ]],
        ["article-mini-scene", "GUIDED PRODUCTION", "A friend asks what is in the room.", "Write two short sentences: The table is large. The lamp is bright.", ["Der Tisch ist groß. Die Lampe ist hell.", "Der Tisch ist gross. Die Lampe ist hell."], "Keep the correct article attached to each subject.", ["tisch", "lampe"], ["Der", "Tisch", "ist", "groß", "Die", "Lampe", "hell"], [
          { prompt: "Write two short sentences: The book is new. The chair is available.", answers: ["Das Buch ist neu. Der Stuhl ist frei."], requires: ["a0-article-foundations-buch", "a0-article-foundations-stuhl"] }
        ]]
      ],
      input: {
        script: "Lea: Was ist das? Amir: Das ist der Tisch. Hier ist die Lampe, und dort ist das Fenster. Lea: Ist das ein Buch? Amir: Ja. Das Buch ist neu. Die Bücher dort sind alt.",
        listenPrompt: "Name the three singular objects Amir identifies with a definite article.",
        listenAnswers: ["der Tisch, die Lampe und das Fenster", "Der Tisch, die Lampe und das Fenster."],
        listenPromptVariants: [
          { prompt: "Which item is new? Answer with its definite article.", answers: ["das Buch", "Das Buch."] }
        ],
        passage: "Im Zimmer stehen ein Tisch und eine Lampe. Der Tisch ist groß. Die Lampe ist hell. Auf dem Tisch liegen ein Buch und ein Schlüssel. Das Buch ist neu. Der Schlüssel ist klein. Neben der Tür steht eine Tasche.",
        readPrompt: "List the six objects in the room with the definite article used for each noun.",
        readAnswers: ["der Tisch, die Lampe, das Buch, der Schlüssel, die Tür und die Tasche", "Der Tisch, die Lampe, das Buch, der Schlüssel, die Tür und die Tasche."],
        readPromptVariants: [
          { prompt: "Which two masculine nouns occur in the room description? Answer with both definite articles.", answers: ["der Tisch und der Schlüssel", "Der Tisch und der Schlüssel."] }
        ]
      },
      task: {
        writingPrompt: "Describe a simple room or breakfast table. Use at least four definite articles, two indefinite articles, and one plural noun.",
        writingPromptVariants: ["Describe the objects in a small apartment. Use der, die, das, ein, eine, and one plural form."],
        guide: ["Choose familiar nouns", "Check every noun article", "Use ein or eine for a first mention", "Use der, die, or das when you mention the item again", "Add one plural noun with die"],
        required: ["der", "die", "das", "ein", "eine"],
        model: "Im Zimmer stehen ein Tisch und eine Lampe. Der Tisch ist groß, und die Lampe ist hell. Auf dem Tisch liegt ein Buch. Das Buch ist neu. Neben der Tür steht eine Tasche. Die Bücher im Regal sind alt.",
        speakingPrompt: "Describe six visible or imagined objects. Say every noun with its article.",
        speakingPromptVariants: ["Give a short room tour. Use all three definite articles and both nominative indefinite forms."],
        speakingGuide: ["Begin with Im Zimmer", "Use der, die, and das", "Use ein and eine", "Include one plural", "Pause after each complete noun bundle"],
        speakingRequired: ["der", "die", "das", "ein", "eine"],
        speakingModel: "Im Zimmer ist ein Tisch. Der Tisch ist groß. Hier ist eine Lampe. Die Lampe ist hell. Dort ist das Fenster. Auf dem Tisch liegen die Bücher. Neben der Tür steht eine Tasche."
      },
      culture: ["Articles are part of the noun", "German dictionaries and classrooms usually present a noun with its grammatical gender and plural. Saying the complete bundle aloud builds a dependable memory cue for later case changes.", ["Artikel", "Genus", "Nomen"]]
    },
    {
      id: "a0-main-clause-order",
      level: "A0",
      code: "A0.23",
      title: "Main-clause word order",
      subtitle: "Place the conjugated verb in position two and vary what comes first.",
      canDo: [
        "Build short statements with the verb in position two",
        "Begin a statement with the subject or a time phrase",
        "Move the subject after the verb when time comes first",
        "Form yes or no questions with the verb first",
        "Form W questions with a question word and verb",
        "Join short ideas while keeping each clause complete"
      ],
      grammar: [
        ["The conjugated verb takes position two", "In a German main-clause statement, the conjugated verb occupies the second sentence position. One position can contain several words.", "Ich lerne heute Deutsch.", "I am learning German today."],
        ["Time can take position one", "A time phrase may come first. The verb stays second, so the subject follows the verb.", "Heute lerne ich Deutsch.", "Today I am learning German."],
        ["A sentence position can be a phrase", "Am Morgen counts as one position. The verb follows the complete phrase.", "Am Morgen trinkt Lea Kaffee.", "Lea drinks coffee in the morning."],
        ["Yes or no questions begin with the verb", "Place the conjugated verb first, then the subject.", "Wohnst du in Bonn?", "Do you live in Bonn?"],
        ["W questions place the verb second", "Use the question word first, the conjugated verb second, and the subject next when one is needed.", "Wo wohnst du?", "Where do you live?"],
        ["Basic placement of nicht", "For a simple whole-sentence negation, nicht often appears late in the clause.", "Ich arbeite heute nicht.", "I am not working today."]
      ],
      words: [
        ["ich", "ich", "I", "ich", "Ich wohne in Bonn.", "I live in Bonn."],
        ["du", "du", "you, informal singular", "du", "Du lernst Deutsch.", "You are learning German."],
        ["er", "er", "he", "er", "Er arbeitet heute.", "He is working today."],
        ["sie", "sie", "she / they", "sie", "Sie kommt aus Berlin.", "She comes from Berlin."],
        ["wir", "wir", "we", "wir", "Wir kaufen Brot.", "We are buying bread."],
        ["sie-formal", "Sie", "you, formal", "Sie", "Wie heißen Sie?", "What is your name?"],
        ["wohnen", "wohnen", "to live", "wohnen · ich wohne · du wohnst", "Ich wohne in Köln.", "I live in Cologne."],
        ["heissen", "heißen", "to be called", "heißen · ich heiße · du heißt", "Ich heiße Nina.", "My name is Nina.", ["heissen", "ich heisse", "du heisst"]],
        ["kommen", "kommen", "to come", "kommen · ich komme · du kommst", "Ich komme aus Hamburg.", "I come from Hamburg."],
        ["lernen", "lernen", "to learn", "lernen · ich lerne", "Heute lerne ich Deutsch.", "Today I am learning German."],
        ["arbeiten", "arbeiten", "to work", "arbeiten · ich arbeite", "Morgen arbeite ich zu Hause.", "Tomorrow I am working at home."],
        ["trinken", "trinken", "to drink", "trinken · ich trinke", "Am Morgen trinke ich Kaffee.", "I drink coffee in the morning."],
        ["essen", "essen", "to eat", "essen · ich esse · du isst", "Ich esse heute Brot.", "I am eating bread today."],
        ["kaufen", "kaufen", "to buy", "kaufen · ich kaufe", "Dann kaufe ich Milch.", "Then I buy milk."],
        ["brauchen", "brauchen", "to need", "brauchen · ich brauche", "Ich brauche jetzt Hilfe.", "I need help now."],
        ["gehen", "gehen", "to go", "gehen · ich gehe", "Später gehe ich nach Hause.", "Later I am going home."],
        ["heute", "heute", "today", "heute", "Heute arbeitet Amir.", "Amir is working today."],
        ["morgen", "morgen", "tomorrow", "morgen", "Morgen lernt Lea Deutsch.", "Lea is learning German tomorrow."],
        ["jetzt", "jetzt", "now", "jetzt", "Jetzt trinke ich Wasser.", "Now I am drinking water."],
        ["am-morgen", "am Morgen", "in the morning", "am Morgen", "Am Morgen esse ich Brot.", "I eat bread in the morning."],
        ["um-acht", "um acht Uhr", "at eight o'clock", "um acht Uhr", "Um acht Uhr beginnt der Kurs.", "The course begins at eight o'clock."],
        ["gern", "gern", "gladly / like to", "gern", "Ich lerne gern Deutsch.", "I like learning German."],
        ["oft", "oft", "often", "oft", "Wir kochen oft zusammen.", "We often cook together."],
        ["dann", "dann", "then", "dann", "Dann gehe ich nach Hause.", "Then I go home."],
        ["spaeter", "später", "later", "später", "Später gehe ich nach Hause.", "Later I am going home.", ["spaeter"]],
        ["nicht", "nicht", "not", "nicht", "Ich arbeite heute nicht.", "I am not working today."],
        ["wo", "wo", "where", "Wo ...?", "Wo wohnst du?", "Where do you live?"],
        ["wann", "wann", "when", "Wann ...?", "Wann beginnt der Kurs?", "When does the course begin?"],
        ["was", "was", "what", "Was ...?", "Was trinkst du?", "What are you drinking?"],
        ["wie", "wie", "how / what", "Wie ...?", "Wie heißen Sie?", "What is your name?"],
        ["in-bonn", "in Bonn", "in Bonn", "in Bonn", "Sam wohnt in Bonn.", "Sam lives in Bonn."],
        ["aus-berlin", "aus Berlin", "from Berlin", "aus Berlin", "Mina kommt aus Berlin.", "Mina comes from Berlin."]
      ],
      questions: [
        ["subject-first", "WORD ORDER", "You state where you live.", "Build one German statement from: I / live / in Bonn.", ["Ich wohne in Bonn."], "The subject takes position one and wohne takes position two.", ["ich", "wohnen", "in-bonn"], ["Ich", "wohne", "in Bonn"], [
          { prompt: "Build one German statement from: Sam / lives / in Bonn.", answers: ["Sam wohnt in Bonn."], wordBank: ["Sam", "wohnt", "in Bonn"] }
        ]],
        ["today-first", "POSITION TWO", "You place the time first.", "Write: Today I am learning German. Begin with Heute.", ["Heute lerne ich Deutsch."], "Heute fills position one, lerne stays in position two, and ich follows the verb.", ["heute", "lernen", "ich"], ["Heute", "lerne", "ich", "Deutsch"], [
          { prompt: "Write: Tomorrow I am working at home. Begin with Morgen.", answers: ["Morgen arbeite ich zu Hause."], requires: ["a0-main-clause-order-morgen", "a0-main-clause-order-arbeiten"] }
        ]],
        ["subject-time", "WORD ORDER", "You keep the subject first.", "Write: I am eating bread today. Begin with Ich.", ["Ich esse heute Brot."], "Ich takes position one and esse takes position two.", ["ich", "essen", "heute"], ["Ich", "esse", "heute", "Brot"], [
          { prompt: "Write: We are buying bread today. Begin with Wir.", answers: ["Wir kaufen heute Brot."], requires: ["a0-main-clause-order-wir", "a0-main-clause-order-kaufen", "a0-main-clause-order-heute"] }
        ]],
        ["long-time-first", "POSITION TWO", "A morning routine begins with a time phrase.", "Write: In the morning Lea drinks coffee. Begin with Am Morgen.", ["Am Morgen trinkt Lea Kaffee."], "Am Morgen is one complete first position. Trinkt follows it.", ["am-morgen", "trinken"], ["Am Morgen", "trinkt", "Lea", "Kaffee"], [
          { prompt: "Write: At eight o'clock the course begins. Begin with Um acht Uhr.", answers: ["Um acht Uhr beginnt der Kurs."], requires: ["a0-main-clause-order-um-acht"] }
        ]],
        ["now-first", "POSITION TWO", "You describe the present moment.", "Write: Now I am drinking water. Begin with Jetzt.", ["Jetzt trinke ich Wasser."], "Jetzt comes first, so the subject follows the conjugated verb.", ["jetzt", "trinken", "ich"], ["Jetzt", "trinke", "ich", "Wasser"], [
          { prompt: "Write: Later I am going home. Begin with Später.", answers: ["Später gehe ich nach Hause.", "Spaeter gehe ich nach Hause."], requires: ["a0-main-clause-order-spaeter", "a0-main-clause-order-gehen"] }
        ]],
        ["then-first", "SEQUENCE", "You add the next step in a routine.", "Write: Then I buy milk. Begin with Dann.", ["Dann kaufe ich Milch."], "Dann takes position one and kaufe takes position two.", ["dann", "kaufen"], ["Dann", "kaufe", "ich", "Milch"], [
          { prompt: "Write: Then we buy bread. Begin with Dann.", answers: ["Dann kaufen wir Brot."], requires: ["a0-main-clause-order-dann", "a0-main-clause-order-wir", "a0-main-clause-order-kaufen"] }
        ]],
        ["yes-no-live", "QUESTION ORDER", "You ask an informal question.", "Ask: Do you live in Bonn?", ["Wohnst du in Bonn?"], "A yes or no question begins with the conjugated verb.", ["du", "wohnen", "in-bonn"], ["Wohnst", "du", "in Bonn"], [
          { prompt: "Ask: Are you learning German?", answers: ["Lernst du Deutsch?"], requires: ["a0-main-clause-order-du", "a0-main-clause-order-lernen"] }
        ]],
        ["yes-no-work", "QUESTION ORDER", "You ask about today.", "Ask: Are you working today?", ["Arbeitest du heute?"], "Put Arbeitest first and du next.", ["arbeiten", "du", "heute"], ["Arbeitest", "du", "heute"], [
          { prompt: "Ask: Are you coming from Berlin?", answers: ["Kommst du aus Berlin?"], requires: ["a0-main-clause-order-kommen", "a0-main-clause-order-du", "a0-main-clause-order-aus-berlin"] }
        ]],
        ["where-question", "W QUESTION", "You ask for someone's city.", "Ask informally: Where do you live?", ["Wo wohnst du?"], "Wo is first, wohnst is second, and du follows.", ["wo", "wohnen", "du"], ["Wo", "wohnst", "du"], [
          { prompt: "Ask formally: Where do you live?", answers: ["Wo wohnen Sie?"], requires: ["a0-main-clause-order-wo", "a0-main-clause-order-wohnen", "a0-main-clause-order-sie-formal"] }
        ]],
        ["what-question", "W QUESTION", "You ask about a drink.", "Ask informally: What are you drinking?", ["Was trinkst du?"], "Was takes position one and trinkst takes position two.", ["was", "trinken", "du"], ["Was", "trinkst", "du"], [
          { prompt: "Ask informally: What are you eating?", answers: ["Was isst du?"], requires: ["a0-main-clause-order-was", "a0-main-clause-order-essen", "a0-main-clause-order-du"] }
        ]],
        ["formal-name", "W QUESTION", "You meet an adult in a formal setting.", "Ask formally: What is your name?", ["Wie heißen Sie?", "Wie heissen Sie?"], "Wie is first, heißen is second, and formal Sie is capitalized.", ["wie", "heissen", "sie-formal"], ["Wie", "heißen", "Sie"], [
          { prompt: "Ask informally: What is your name?", answers: ["Wie heißt du?", "Wie heisst du?"], requires: ["a0-main-clause-order-wie", "a0-main-clause-order-heissen", "a0-main-clause-order-du"] }
        ]],
        ["when-question", "W QUESTION", "You ask about the course time.", "Ask: When does the course begin?", ["Wann beginnt der Kurs?"], "Wann takes position one and beginnt takes position two.", ["wann"], ["Wann", "beginnt", "der Kurs"], [
          { prompt: "Ask: When are you working?", answers: ["Wann arbeitest du?"], requires: ["a0-main-clause-order-wann", "a0-main-clause-order-arbeiten", "a0-main-clause-order-du"] }
        ]],
        ["late-nicht", "NEGATION", "You have the day off.", "Write: I am not working today.", ["Ich arbeite heute nicht."], "In this simple sentence, nicht comes late in the clause.", ["ich", "arbeiten", "heute", "nicht"], ["Ich", "arbeite", "heute", "nicht"], [
          { prompt: "Write: We are not working tomorrow.", answers: ["Wir arbeiten morgen nicht."], requires: ["a0-main-clause-order-wir", "a0-main-clause-order-arbeiten", "a0-main-clause-order-morgen", "a0-main-clause-order-nicht"] }
        ]],
        ["preference-order", "WORD ORDER", "You say what you enjoy learning.", "Write: I like learning German.", ["Ich lerne gern Deutsch."], "The conjugated verb stays second. Gern follows the verb here.", ["ich", "lernen", "gern"], ["Ich", "lerne", "gern", "Deutsch"], [
          { prompt: "Write: We often cook together.", answers: ["Wir kochen oft zusammen."], requires: ["a0-main-clause-order-wir", "a0-main-clause-order-oft"] }
        ]],
        ["contrast-starts", "STRUCTURE CONTRAST", "You express the same idea with two openings.", "Write both versions in this order: I am learning German today. Today I am learning German.", ["Ich lerne heute Deutsch. Heute lerne ich Deutsch."], "The verb remains in position two in both statements.", ["ich", "lernen", "heute"], ["Ich", "lerne", "heute", "Deutsch", "Heute", "ich"], [
          { prompt: "Write both versions in this order: I am working tomorrow. Tomorrow I am working.", answers: ["Ich arbeite morgen. Morgen arbeite ich."], requires: ["a0-main-clause-order-ich", "a0-main-clause-order-arbeiten", "a0-main-clause-order-morgen"] }
        ]],
        ["mini-routine", "GUIDED PRODUCTION", "You describe two steps in a morning.", "Write: In the morning I drink coffee. Then I go home.", ["Am Morgen trinke ich Kaffee. Dann gehe ich nach Hause."], "Each statement has its conjugated verb in position two.", ["am-morgen", "trinken", "dann", "gehen"], ["Am Morgen", "trinke", "ich", "Kaffee", "Dann", "gehe", "nach Hause"], [
          { prompt: "Write: Today I learn German. Then I buy bread.", answers: ["Heute lerne ich Deutsch. Dann kaufe ich Brot."], requires: ["a0-main-clause-order-heute", "a0-main-clause-order-lernen", "a0-main-clause-order-dann", "a0-main-clause-order-kaufen"] }
        ]]
      ],
      input: {
        script: "Mina: Wo wohnst du, Sam? Sam: Ich wohne in Bonn. Mina: Lernst du heute Deutsch? Sam: Ja. Heute lerne ich Deutsch. Am Abend arbeite ich. Mina: Und morgen? Sam: Morgen arbeite ich nicht.",
        listenPrompt: "Write Sam's three statements about today and tomorrow in the order you hear them.",
        listenAnswers: ["Ich wohne in Bonn. Heute lerne ich Deutsch. Morgen arbeite ich nicht."],
        listenPromptVariants: [
          { prompt: "Which two questions does Mina ask?", answers: ["Wo wohnst du? Lernst du heute Deutsch?", "Wo wohnst du, Sam? Lernst du heute Deutsch?"] }
        ],
        passage: "Am Morgen trinkt Lea Tee. Um acht Uhr beginnt der Kurs. Lea lernt heute Deutsch. Am Mittag kauft sie Brot. Dann geht sie nach Hause. Am Abend arbeitet Lea nicht.",
        readPrompt: "Copy the four sentences that begin with a time phrase or Dann. Keep the word order exactly as shown.",
        readAnswers: ["Am Morgen trinkt Lea Tee. Um acht Uhr beginnt der Kurs. Am Mittag kauft sie Brot. Dann geht sie nach Hause."],
        readPromptVariants: [
          { prompt: "What occupies position two in these four sentences? List the four verbs in order.", answers: ["trinkt, beginnt, kauft, geht", "trinkt · beginnt · kauft · geht"] }
        ]
      },
      task: {
        writingPrompt: "Write a short daily routine. Include two subject-first statements, three time-first statements, one W question, and one yes or no question.",
        writingPromptVariants: ["Write a short exchange about today's routine. Use verb-second statements, one W question, and one verb-first question."],
        guide: ["Underline the conjugated verb mentally", "Check position two in every statement", "Move the subject after the verb when time is first", "Begin a yes or no question with the verb", "Use a question word before the verb in a W question"],
        required: ["heute", "morgen", "dann", "wo", "Lernst"],
        model: "Ich lerne heute Deutsch. Am Morgen trinke ich Kaffee. Um acht Uhr beginnt mein Kurs. Dann kaufe ich Brot. Ich koche am Abend. Morgen arbeite ich zu Hause. Wo wohnst du? Lernst du heute auch Deutsch?",
        speakingPrompt: "Give a short routine and ask two questions. Vary the first position in your statements.",
        speakingPromptVariants: ["Describe today and tomorrow aloud. Include two time-first statements and two different question patterns."],
        speakingGuide: ["Use one subject-first statement", "Use Heute, Morgen, and Dann first", "Keep the verb second in statements", "Ask one W question", "Ask one yes or no question"],
        speakingRequired: ["heute", "morgen", "dann", "wo", "Lernst"],
        speakingModel: "Ich wohne in Bonn. Heute lerne ich Deutsch. Am Abend arbeite ich. Morgen arbeite ich nicht. Dann gehe ich in den Park. Wo wohnst du? Lernst du heute Deutsch?"
      },
      culture: ["Flexible openings create natural emphasis", "German speakers often begin with time, place, or another topic that connects to the conversation. The position-two verb makes the structure clear even when the opening changes.", ["Satzbau", "Verbzweit", "Fragen"]]
    },
    {
      id: "a1-accusative-daily-life",
      level: "A1",
      code: "A1.40",
      title: "Accusative case in daily life",
      subtitle: "Mark direct objects clearly and retrieve the masculine accusative forms automatically.",
      canDo: [
        "Identify the direct object after common everyday verbs",
        "Change masculine der to den",
        "Change masculine ein to einen",
        "Change masculine kein to keinen",
        "Keep feminine, neuter, and plural article patterns distinct",
        "Replace familiar direct objects with accusative pronouns"
      ],
      grammar: [
        ["The direct object receives the action", "Ask wen or was after the verb to find the accusative object.", "Ich suche den Schlüssel. Was suche ich? Den Schlüssel.", "I am looking for the key. What am I looking for? The key."],
        ["Masculine der changes to den", "A definite masculine direct object uses den. Feminine die, neuter das, and plural die keep their familiar form.", "der Bus → Ich nehme den Bus.", "the bus → I take the bus."],
        ["Masculine ein changes to einen", "An indefinite masculine direct object uses einen. Feminine uses eine and neuter uses ein.", "Ich kaufe einen Apfel, eine Banane und ein Brot.", "I buy an apple, a banana, and a loaf of bread."],
        ["Masculine kein changes to keinen", "The negative masculine accusative form is keinen. Feminine uses keine and neuter uses kein.", "Ich trinke keinen Kaffee.", "I do not drink coffee."],
        ["Possessive articles follow the same pattern", "Mein and dein gain an ending before a masculine accusative noun: meinen and deinen.", "Ich brauche meinen Pass.", "I need my passport."],
        ["Accusative pronouns", "Use mich, dich, ihn, sie, es, and uns when the direct object is already known.", "Kennst du Amir? Ja, ich kenne ihn.", "Do you know Amir? Yes, I know him."]
      ],
      words: [
        ["den-schluessel", "den Schlüssel", "the key, accusative", "der Schlüssel → den Schlüssel", "Ich suche den Schlüssel.", "I am looking for the key.", ["den Schluessel"]],
        ["einen-termin", "einen Termin", "an appointment, accusative", "der Termin → einen Termin", "Ich brauche einen Termin.", "I need an appointment."],
        ["keinen-kaffee", "keinen Kaffee", "no coffee, accusative", "der Kaffee → keinen Kaffee", "Ich trinke keinen Kaffee.", "I do not drink coffee."],
        ["den-bus", "den Bus", "the bus, accusative", "der Bus → den Bus", "Wir nehmen den Bus.", "We take the bus."],
        ["einen-apfel", "einen Apfel", "an apple, accusative", "der Apfel → einen Apfel", "Mina kauft einen Apfel.", "Mina buys an apple."],
        ["den-arzt", "den Arzt", "the doctor, accusative", "der Arzt → den Arzt", "Ich besuche den Arzt.", "I visit the doctor."],
        ["einen-kuchen", "einen Kuchen", "a cake, accusative", "der Kuchen → einen Kuchen", "Sam backt einen Kuchen.", "Sam bakes a cake."],
        ["meinen-pass", "meinen Pass", "my passport, accusative", "mein Pass → meinen Pass", "Ich brauche meinen Pass.", "I need my passport."],
        ["deinen-namen", "deinen Namen", "your name, accusative", "dein Name → deinen Namen", "Ich schreibe deinen Namen.", "I write your name."],
        ["die-tasche", "die Tasche", "the bag, accusative", "die Tasche → die Tasche", "Lea sucht die Tasche.", "Lea is looking for the bag."],
        ["eine-banane", "eine Banane", "a banana, accusative", "die Banane → eine Banane", "Ich esse eine Banane.", "I eat a banana."],
        ["keine-milch", "keine Milch", "no milk, accusative", "die Milch → keine Milch", "Wir kaufen keine Milch.", "We are buying no milk."],
        ["meine-adresse", "meine Adresse", "my address, accusative", "die Adresse → meine Adresse", "Ich schreibe meine Adresse.", "I write my address."],
        ["das-ticket", "das Ticket", "the ticket, accusative", "das Ticket → das Ticket", "Ich zeige das Ticket.", "I show the ticket."],
        ["ein-brot", "ein Brot", "a loaf of bread, accusative", "das Brot → ein Brot", "Wir kaufen ein Brot.", "We buy a loaf of bread."],
        ["kein-geld", "kein Geld", "no money, accusative", "das Geld → kein Geld", "Ich habe kein Geld.", "I have no money."],
        ["mein-handy", "mein Handy", "my mobile phone, accusative", "das Handy → mein Handy", "Ich finde mein Handy.", "I find my mobile phone."],
        ["die-aepfel", "die Äpfel", "the apples, accusative plural", "die Äpfel", "Sie kauft die Äpfel.", "She buys the apples.", ["die Aepfel"]],
        ["keine-tomaten", "keine Tomaten", "no tomatoes, accusative plural", "keine Tomaten", "Er braucht keine Tomaten.", "He needs no tomatoes."],
        ["unsere-tickets", "unsere Tickets", "our tickets, accusative plural", "unsere Tickets", "Wir zeigen unsere Tickets.", "We show our tickets."],
        ["brauchen", "brauchen", "to need", "brauchen + Akkusativ", "Ich brauche einen Termin.", "I need an appointment."],
        ["suchen", "suchen", "to look for", "suchen + Akkusativ", "Wir suchen den Bahnhof.", "We are looking for the train station."],
        ["kaufen", "kaufen", "to buy", "kaufen + Akkusativ", "Sie kauft eine Fahrkarte.", "She buys a ticket."],
        ["bestellen", "bestellen", "to order", "bestellen + Akkusativ", "Er bestellt einen Tee.", "He orders a tea."],
        ["nehmen", "nehmen", "to take", "nehmen + Akkusativ", "Ich nehme den Bus.", "I take the bus."],
        ["besuchen", "besuchen", "to visit", "besuchen + Akkusativ", "Wir besuchen unsere Freunde.", "We visit our friends."],
        ["sehen", "sehen", "to see", "sehen + Akkusativ", "Sie sieht den Arzt.", "She sees the doctor."],
        ["treffen", "treffen", "to meet", "treffen + Akkusativ", "Ich treffe meinen Freund.", "I meet my friend."],
        ["mich", "mich", "me, accusative", "ich → mich", "Hörst du mich?", "Can you hear me?"],
        ["dich", "dich", "you, accusative informal", "du → dich", "Ich sehe dich.", "I see you."],
        ["ihn", "ihn", "him / it, masculine accusative", "er → ihn", "Ich kenne ihn.", "I know him."],
        ["sie-pronoun", "sie", "her / them, accusative", "sie → sie", "Ich treffe sie heute.", "I am meeting her today."],
        ["es-pronoun", "es", "it, neuter accusative", "es → es", "Ich brauche es heute.", "I need it today."],
        ["uns", "uns", "us, accusative", "wir → uns", "Sie besucht uns morgen.", "She is visiting us tomorrow."]
      ],
      questions: [
        ["der-to-den", "CASE TRANSFORMATION", "A specific key is missing.", "Complete the sentence with the correct article and noun: Ich suche ___ Schlüssel.", ["Ich suche den Schlüssel.", "Ich suche den Schluessel."], "Schlüssel is masculine and the direct object, so der changes to den.", ["den-schluessel", "suchen"], ["der", "den", "Schlüssel"], [
          { prompt: "Complete the sentence with the correct article and noun: Wir nehmen ___ Bus.", answers: ["Wir nehmen den Bus."], requires: ["a1-accusative-daily-life-den-bus", "a1-accusative-daily-life-nehmen"] }
        ]],
        ["ein-to-einen", "CASE TRANSFORMATION", "You need an appointment.", "Complete the sentence with the correct indefinite article: Ich brauche ___ Termin.", ["Ich brauche einen Termin."], "A masculine indefinite direct object uses einen.", ["einen-termin", "brauchen"], ["ein", "eine", "einen", "Termin"], [
          { prompt: "Complete the sentence with the correct indefinite article: Mina kauft ___ Apfel.", answers: ["Mina kauft einen Apfel."], requires: ["a1-accusative-daily-life-einen-apfel", "a1-accusative-daily-life-kaufen"] }
        ]],
        ["kein-to-keinen", "CASE TRANSFORMATION", "You decline coffee.", "Write: I drink no coffee. Use the correct accusative form of kein.", ["Ich trinke keinen Kaffee."], "Kaffee is masculine, so kein changes to keinen.", ["keinen-kaffee"], ["Ich", "trinke", "kein", "keinen", "Kaffee"], [
          { prompt: "Write: Sam orders no tea. Use the correct accusative form of kein.", answers: ["Sam bestellt keinen Tee."], requires: ["a1-accusative-daily-life-bestellen"] }
        ]],
        ["possessive-masculine", "CASE TRANSFORMATION", "You need a document at the airport.", "Write: I need my passport.", ["Ich brauche meinen Pass."], "Mein gains the masculine accusative ending: meinen Pass.", ["meinen-pass", "brauchen"], ["Ich", "brauche", "mein", "meinen", "Pass"], [
          { prompt: "Write: I write your name.", answers: ["Ich schreibe deinen Namen."], requires: ["a1-accusative-daily-life-deinen-namen"] }
        ]],
        ["feminine-unchanged", "CASE CONTRAST", "You are looking for a known bag.", "Complete the sentence: Lea sucht ___ Tasche. Use the definite article.", ["Lea sucht die Tasche."], "The feminine definite article remains die in the accusative.", ["die-tasche", "suchen"], ["der", "die", "das", "Tasche"], [
          { prompt: "Complete the sentence: Ich esse ___ Banane. Use the indefinite article.", answers: ["Ich esse eine Banane."], requires: ["a1-accusative-daily-life-eine-banane"] }
        ]],
        ["neuter-unchanged", "CASE CONTRAST", "You show a known ticket.", "Complete the sentence: Ich zeige ___ Ticket. Use the definite article.", ["Ich zeige das Ticket."], "The neuter definite article remains das in the accusative.", ["das-ticket"], ["der", "die", "das", "Ticket"], [
          { prompt: "Complete the sentence: Wir kaufen ___ Brot. Use the indefinite article.", answers: ["Wir kaufen ein Brot."], requires: ["a1-accusative-daily-life-ein-brot", "a1-accusative-daily-life-kaufen"] }
        ]],
        ["plural-unchanged", "CASE CONTRAST", "Several specific apples are on the list.", "Write: She buys the apples.", ["Sie kauft die Äpfel.", "Sie kauft die Aepfel."], "The plural definite article remains die in the accusative.", ["die-aepfel", "kaufen"], ["Sie", "kauft", "die", "Äpfel"], [
          { prompt: "Write: We show our tickets.", answers: ["Wir zeigen unsere Tickets."], requires: ["a1-accusative-daily-life-unsere-tickets"] }
        ]],
        ["three-gender-order", "CASE PATTERN", "You shop for three foods.", "Write: I buy an apple, a banana, and a loaf of bread.", ["Ich kaufe einen Apfel, eine Banane und ein Brot."], "The articles show masculine einen, feminine eine, and neuter ein.", ["einen-apfel", "eine-banane", "ein-brot", "kaufen"], ["einen Apfel", "eine Banane", "ein Brot", "Ich kaufe", "und"], [
          { prompt: "Write: Mina buys a coffee, a banana, and a loaf of bread.", answers: ["Mina kauft einen Kaffee, eine Banane und ein Brot."], requires: ["a1-accusative-daily-life-kaufen"] }
        ]],
        ["find-object", "CASE IDENTIFICATION", "You analyze a sentence before changing it.", "In 'Wir nehmen den Bus', write only the accusative object with its article.", ["den Bus"], "Ask was nehmen wir? The answer is den Bus.", ["den-bus", "nehmen"], [], [
          { prompt: "In 'Ich suche den Schlüssel', write only the accusative object with its article.", answers: ["den Schlüssel", "den Schluessel"], requires: ["a1-accusative-daily-life-den-schluessel", "a1-accusative-daily-life-suchen"] }
        ]],
        ["replace-masculine", "PRONOUN REPLACEMENT", "The listener already knows which man you mean.", "Replace den Arzt with an accusative pronoun: Ich sehe den Arzt. Ich sehe ___.", ["Ich sehe ihn.", "ihn"], "A masculine singular accusative object becomes ihn.", ["den-arzt", "sehen", "ihn"], ["ihn", "sie", "es"], [
          { prompt: "Replace den Bus with an accusative pronoun: Ich nehme den Bus. Ich nehme ___.", answers: ["Ich nehme ihn.", "ihn"], requires: ["a1-accusative-daily-life-den-bus", "a1-accusative-daily-life-nehmen", "a1-accusative-daily-life-ihn"] }
        ]],
        ["replace-feminine", "PRONOUN REPLACEMENT", "The listener already knows which bag you mean.", "Replace die Tasche with an accusative pronoun: Ich suche die Tasche. Ich suche ___.", ["Ich suche sie.", "sie"], "A feminine singular accusative object becomes sie.", ["die-tasche", "suchen", "sie-pronoun"], ["ihn", "sie", "es"], [
          { prompt: "Replace die Banane with an accusative pronoun: Ich esse die Banane. Ich esse ___.", answers: ["Ich esse sie.", "sie"], requires: ["a1-accusative-daily-life-eine-banane", "a1-accusative-daily-life-sie-pronoun"] }
        ]],
        ["replace-neuter", "PRONOUN REPLACEMENT", "The listener already knows which ticket you mean.", "Replace das Ticket with an accusative pronoun: Ich zeige das Ticket. Ich zeige ___.", ["Ich zeige es.", "es"], "A neuter singular accusative object becomes es.", ["das-ticket", "es-pronoun"], ["ihn", "sie", "es"], [
          { prompt: "Replace das Handy with an accusative pronoun: Ich finde das Handy. Ich finde ___.", answers: ["Ich finde es.", "es"], requires: ["a1-accusative-daily-life-mein-handy", "a1-accusative-daily-life-es-pronoun"] }
        ]],
        ["personal-mich", "PRONOUN USE", "You check the audio connection.", "Ask informally: Can you hear me? Use the accusative pronoun mich.", ["Hörst du mich?", "Hoerst du mich?"], "The accusative form of ich is mich.", ["mich"], ["Hörst", "du", "mich"], [
          { prompt: "Write: I see you. Address one person informally and use dich.", answers: ["Ich sehe dich."], requires: ["a1-accusative-daily-life-dich", "a1-accusative-daily-life-sehen"] }
        ]],
        ["negative-genders", "CASE PATTERN", "You state what is absent from the shopping basket.", "Write: We buy no coffee, no milk, and no bread.", ["Wir kaufen keinen Kaffee, keine Milch und kein Brot."], "Kein takes the masculine ending in keinen Kaffee. Feminine uses keine and neuter uses kein.", ["keinen-kaffee", "keine-milch", "ein-brot", "kaufen"], ["keinen Kaffee", "keine Milch", "kein Brot", "Wir kaufen", "und"], [
          { prompt: "Write: I have no appointment, no address, and no money.", answers: ["Ich habe keinen Termin, keine Adresse und kein Geld."], requires: ["a1-accusative-daily-life-einen-termin", "a1-accusative-daily-life-meine-adresse", "a1-accusative-daily-life-kein-geld"] }
        ]],
        ["question-wen-was", "OBJECT QUESTION", "You ask about a purchase.", "Ask: What are you buying? Then answer: I am buying an apple.", ["Was kaufst du? Ich kaufe einen Apfel."], "Was asks about the object. Apfel is masculine, so the answer uses einen.", ["kaufen", "einen-apfel"], ["Was", "kaufst", "du", "Ich", "kaufe", "einen Apfel"], [
          { prompt: "Ask: Whom are you meeting? Then answer: I am meeting my friend.", answers: ["Wen triffst du? Ich treffe meinen Freund."], requires: ["a1-accusative-daily-life-treffen"] }
        ]],
        ["daily-errands", "GUIDED PRODUCTION", "You describe three errands.", "Write: I need an appointment. Then I take the bus and visit the doctor.", ["Ich brauche einen Termin. Dann nehme ich den Bus und besuche den Arzt."], "Each masculine direct object uses the accusative ending.", ["einen-termin", "den-bus", "den-arzt", "brauchen", "nehmen", "besuchen"], ["Ich brauche", "einen Termin", "Dann", "nehme", "den Bus", "und", "besuche", "den Arzt"], [
          { prompt: "Write: I need my passport. Then I look for the key and take the bus.", answers: ["Ich brauche meinen Pass. Dann suche ich den Schlüssel und nehme den Bus.", "Ich brauche meinen Pass. Dann suche ich den Schluessel und nehme den Bus."], requires: ["a1-accusative-daily-life-meinen-pass", "a1-accusative-daily-life-den-schluessel", "a1-accusative-daily-life-den-bus"] }
        ]]
      ],
      input: {
        script: "Lea: Was brauchst du heute? Amir: Ich brauche einen Termin beim Arzt. Zuerst suche ich meinen Pass. Dann nehme ich den Bus. Lea: Kaufst du unterwegs etwas? Amir: Ja, ich kaufe einen Apfel und eine Flasche Wasser. Kaffee brauche ich heute keinen.",
        listenPrompt: "List Amir's four masculine accusative bundles in the order you hear them.",
        listenAnswers: ["einen Termin, meinen Pass, den Bus, einen Apfel", "einen Termin · meinen Pass · den Bus · einen Apfel"],
        listenPromptVariants: [
          { prompt: "Which feminine item does Amir buy? Answer with its article.", answers: ["eine Flasche Wasser", "eine Flasche"] }
        ],
        passage: "Mina plant ein Abendessen. Sie kauft einen Salat, eine Suppe und ein Brot. Im Supermarkt sucht sie den Reis und die Tomaten. Sie findet den Reis schnell. Die Tomaten findet sie später. An der Kasse braucht Mina ihre Karte. Sie hat heute kein Bargeld.",
        readPrompt: "List the six different accusative noun bundles used after kauft, sucht, findet, or braucht. Keep each article or possessive word.",
        readAnswers: ["einen Salat, eine Suppe, ein Brot, den Reis, die Tomaten, ihre Karte", "einen Salat · eine Suppe · ein Brot · den Reis · die Tomaten · ihre Karte"],
        readPromptVariants: [
          { prompt: "Which masculine object does Mina first search for and then find? Answer with its article.", answers: ["den Reis", "Den Reis."] }
        ]
      },
      task: {
        writingPrompt: "Write a daily errands plan. Use at least four masculine accusative objects, two feminine objects, two neuter objects, one plural object, and two accusative pronouns.",
        writingPromptVariants: ["Write a shopping and appointment plan. Show den, einen, keinen, meinen, eine, ein, die, and two object pronouns."],
        guide: ["Mark the direct object after each verb", "Check masculine endings", "Keep feminine and neuter patterns clear", "Use one negative object", "Replace two repeated objects with pronouns"],
        required: ["den", "einen", "keinen", "eine", "ein", "ihn", "sie"],
        model: "Heute brauche ich einen Termin und meinen Pass. Zuerst suche ich den Schlüssel. Ich finde ihn in der Tasche. Dann nehme ich den Bus und besuche den Arzt. Im Büro zeige ich das Ticket und mein Handy. Das Ticket brauche ich am Eingang. Später kaufe ich einen Apfel, eine Banane, ein Brot und die Tomaten. Die Banane esse ich sofort. Ich esse sie im Park. Mein Handy finde ich später auch. Ich brauche es für die Fahrkarte. Ich kaufe keinen Kaffee.",
        speakingPrompt: "Describe what you need, look for, buy, and take today. Replace two repeated nouns with pronouns.",
        speakingPromptVariants: ["Give a short errands report using masculine accusative endings and object pronouns."],
        speakingGuide: ["Use brauchen, suchen, kaufen, and nehmen", "Include den and einen", "Include keinen or meinen", "Use ihn for one masculine object", "Use sie or es for another object"],
        speakingRequired: ["den", "einen", "ihn", "sie"],
        speakingModel: "Heute brauche ich einen Termin. Ich suche meinen Pass und den Schlüssel. Den Schlüssel finde ich schnell. Ich brauche ihn für das Auto. Dann nehme ich den Bus. Im Laden kaufe ich eine Banane und ein Brot. Die Banane esse ich später. Ich esse sie im Park."
      },
      culture: ["Clear objects support efficient everyday exchanges", "Tickets, appointments, documents, orders, and purchases create frequent opportunities to hear accusative forms. Learning the complete verb and object pattern makes these exchanges faster and more reliable.", ["Akkusativ", "Alltag", "Artikel"]]
    },
    {
      id: "a1-dative-two-way",
      level: "A1",
      code: "A1.41",
      title: "Dative case and two-way prepositions",
      subtitle: "Use dative after fixed prepositions and contrast location with direction.",
      canDo: [
        "Use dem, der, and den with dative noun phrases",
        "Use einem and einer with indefinite dative nouns",
        "Add the usual plural n after a dative plural article",
        "Use common fixed dative prepositions in daily situations",
        "Choose dative for location with a two-way preposition",
        "Choose accusative for direction with a two-way preposition",
        "Contrast liegen with legen and stehen with stellen"
      ],
      grammar: [
        ["Dative definite articles", "Masculine and neuter nouns use dem. Feminine nouns use der. Plural nouns use den.", "mit dem Mann · mit der Frau · mit dem Kind · mit den Kindern", "with the man · with the woman · with the child · with the children"],
        ["Dative indefinite articles", "Masculine and neuter nouns use einem. Feminine nouns use einer.", "bei einem Freund · bei einer Freundin · bei einem Kind", "at a male friend's · at a female friend's · with a child"],
        ["Dative plural ending", "After den, many plural nouns add n when the plural does not already end in n or s.", "mit den Kindern · auf den Stühlen", "with the children · on the chairs"],
        ["Fixed dative prepositions", "Aus, bei, mit, nach, seit, von, and zu take the dative.", "mit dem Bus · bei der Arbeit · zum Bahnhof", "by bus · at work · to the train station"],
        ["Location answers wo", "With in, an, auf, unter, über, vor, hinter, neben, and zwischen, use dative for a location.", "Das Buch liegt auf dem Tisch.", "The book is lying on the table."],
        ["Direction answers wohin", "Use accusative when an action places or moves something toward a destination.", "Ich lege das Buch auf den Tisch.", "I put the book onto the table."],
        ["Verb pairs reveal the meaning", "Liegen and stehen usually describe location. Legen and stellen usually describe placement toward a destination.", "Die Flasche steht im Schrank. Ich stelle sie in den Schrank.", "The bottle is standing in the cupboard. I put it into the cupboard."]
      ],
      words: [
        ["dem-mann", "dem Mann", "the man, dative", "der Mann → dem Mann", "Ich spreche mit dem Mann.", "I am speaking with the man."],
        ["der-frau", "der Frau", "the woman, dative", "die Frau → der Frau", "Ich helfe der Frau.", "I help the woman."],
        ["dem-kind", "dem Kind", "the child, dative", "das Kind → dem Kind", "Das Buch gehört dem Kind.", "The book belongs to the child."],
        ["den-kindern", "den Kindern", "the children, dative plural", "die Kinder → den Kindern", "Ich spreche mit den Kindern.", "I speak with the children."],
        ["einem-freund", "einem Freund", "a male friend, dative", "ein Freund → einem Freund", "Ich wohne bei einem Freund.", "I am staying with a friend."],
        ["einer-freundin", "einer Freundin", "a female friend, dative", "eine Freundin → einer Freundin", "Ich wohne bei einer Freundin.", "I am staying with a friend."],
        ["einem-kind", "einem Kind", "a child, dative", "ein Kind → einem Kind", "Ich gebe einem Kind das Buch.", "I give a child the book."],
        ["mit-dem-bus", "mit dem Bus", "by bus", "mit + Dativ: mit dem Bus", "Wir fahren mit dem Bus.", "We travel by bus."],
        ["bei-der-arbeit", "bei der Arbeit", "at work", "bei + Dativ: bei der Arbeit", "Bei der Arbeit spreche ich Deutsch.", "I speak German at work."],
        ["vom-arzt", "vom Arzt", "from the doctor", "von dem Arzt → vom Arzt", "Ich komme vom Arzt.", "I am coming from the doctor."],
        ["zum-bahnhof", "zum Bahnhof", "to the train station", "zu dem Bahnhof → zum Bahnhof", "Wir gehen zum Bahnhof.", "We are going to the train station."],
        ["zur-apotheke", "zur Apotheke", "to the pharmacy", "zu der Apotheke → zur Apotheke", "Sie geht zur Apotheke.", "She is going to the pharmacy."],
        ["aus-der-stadt", "aus der Stadt", "from the city", "aus + Dativ: aus der Stadt", "Er kommt aus der Stadt.", "He comes from the city."],
        ["nach-berlin", "nach Berlin", "to Berlin", "nach + Stadtname: nach Berlin", "Morgen fahre ich nach Berlin.", "Tomorrow I am traveling to Berlin."],
        ["auf-dem-tisch", "auf dem Tisch", "on the table, location", "wo? auf dem Tisch", "Das Buch liegt auf dem Tisch.", "The book is lying on the table."],
        ["auf-den-tisch", "auf den Tisch", "onto the table, direction", "wohin? auf den Tisch", "Ich lege das Buch auf den Tisch.", "I put the book onto the table."],
        ["an-der-wand", "an der Wand", "on the wall, location", "wo? an der Wand", "Das Bild hängt an der Wand.", "The picture is hanging on the wall."],
        ["an-die-wand", "an die Wand", "onto the wall, direction", "wohin? an die Wand", "Ich hänge das Bild an die Wand.", "I hang the picture on the wall."],
        ["in-der-tasche", "in der Tasche", "in the bag, location", "wo? in der Tasche", "Der Schlüssel ist in der Tasche.", "The key is in the bag.", ["Der Schluessel ist in der Tasche."]],
        ["in-die-tasche", "in die Tasche", "into the bag, direction", "wohin? in die Tasche", "Ich lege den Schlüssel in die Tasche.", "I put the key into the bag.", ["Ich lege den Schluessel in die Tasche."]],
        ["unter-dem-bett", "unter dem Bett", "under the bed, location", "wo? unter dem Bett", "Die Schuhe stehen unter dem Bett.", "The shoes are under the bed."],
        ["unter-das-bett", "unter das Bett", "under the bed, direction", "wohin? unter das Bett", "Ich stelle die Schuhe unter das Bett.", "I put the shoes under the bed."],
        ["neben-der-tuer", "neben der Tür", "beside the door, location", "wo? neben der Tür", "Die Tasche steht neben der Tür.", "The bag is beside the door.", ["neben der Tuer"]],
        ["neben-die-tuer", "neben die Tür", "beside the door, direction", "wohin? neben die Tür", "Ich stelle die Tasche neben die Tür.", "I put the bag beside the door.", ["neben die Tuer"]],
        ["vor-dem-haus", "vor dem Haus", "in front of the house, location", "wo? vor dem Haus", "Das Auto steht vor dem Haus.", "The car is in front of the house."],
        ["vor-das-haus", "vor das Haus", "to the front of the house, direction", "wohin? vor das Haus", "Ich fahre das Auto vor das Haus.", "I drive the car to the front of the house."],
        ["zwischen-den-stuehlen", "zwischen den Stühlen", "between the chairs, location", "wo? zwischen den Stühlen", "Die Tasche steht zwischen den Stühlen.", "The bag is between the chairs.", ["zwischen den Stuehlen"]],
        ["zwischen-die-stuehle", "zwischen die Stühle", "between the chairs, direction", "wohin? zwischen die Stühle", "Ich stelle die Tasche zwischen die Stühle.", "I put the bag between the chairs.", ["zwischen die Stuehle"]],
        ["liegen", "liegen", "to lie / be located flat", "liegen · es liegt", "Das Handy liegt auf dem Tisch.", "The mobile phone is lying on the table."],
        ["legen", "legen", "to lay / put flat", "legen · ich lege", "Ich lege das Handy auf den Tisch.", "I put the mobile phone onto the table."],
        ["stehen", "stehen", "to stand / be located upright", "stehen · es steht", "Die Flasche steht im Schrank.", "The bottle is standing in the cupboard."],
        ["stellen", "stellen", "to place upright", "stellen · ich stelle", "Ich stelle die Flasche in den Schrank.", "I put the bottle into the cupboard."],
        ["mir", "mir", "me, dative", "ich → mir", "Kannst du mir helfen?", "Can you help me?"],
        ["dir", "dir", "you, dative informal", "du → dir", "Ich gebe dir das Buch.", "I give you the book."],
        ["ihm", "ihm", "him / it, dative", "er → ihm", "Ich helfe ihm.", "I help him."],
        ["ihr", "ihr", "her, dative", "sie → ihr", "Ich antworte ihr.", "I answer her."]
      ],
      questions: [
        ["dative-articles", "CASE PARADIGM", "You review all four definite dative forms.", "Write these German dative bundles in order: with the man, with the woman, with the child, with the children.", ["mit dem Mann, mit der Frau, mit dem Kind, mit den Kindern", "mit dem Mann · mit der Frau · mit dem Kind · mit den Kindern"], "Dative uses dem, der, dem, and den across these four groups.", ["dem-mann", "der-frau", "dem-kind", "den-kindern"], ["mit dem Mann", "mit der Frau", "mit dem Kind", "mit den Kindern"], [
          { prompt: "Write the four definite dative noun bundles without mit: the man, the woman, the child, the children.", answers: ["dem Mann, der Frau, dem Kind, den Kindern", "dem Mann · der Frau · dem Kind · den Kindern"], requires: ["a1-dative-two-way-dem-mann", "a1-dative-two-way-der-frau", "a1-dative-two-way-dem-kind", "a1-dative-two-way-den-kindern"] }
        ]],
        ["indefinite-dative", "CASE PARADIGM", "You describe where you are staying and whom you help.", "Write these dative bundles in order: with a male friend, with a female friend, with a child.", ["bei einem Freund, bei einer Freundin, bei einem Kind", "bei einem Freund · bei einer Freundin · bei einem Kind"], "Dative indefinite articles are einem, einer, and einem.", ["einem-freund", "einer-freundin", "einem-kind"], ["bei einem Freund", "bei einer Freundin", "bei einem Kind"], [
          { prompt: "Complete: Ich wohne bei ___ Freundin. Ich helfe ___ Kind.", answers: ["Ich wohne bei einer Freundin. Ich helfe einem Kind."], requires: ["a1-dative-two-way-einer-freundin", "a1-dative-two-way-einem-kind"] }
        ]],
        ["plural-n", "DATIVE PLURAL", "You speak with several children.", "Complete the sentence with the correct dative plural: Ich spreche mit ___ ___.", ["Ich spreche mit den Kindern.", "den Kindern"], "The article is den, and Kinder gains n in the dative plural.", ["den-kindern"], ["den", "die", "Kinder", "Kindern"], [
          { prompt: "Complete the location with the correct dative plural: Die Tasche steht zwischen ___ ___.", answers: ["Die Tasche steht zwischen den Stühlen.", "Die Tasche steht zwischen den Stuehlen.", "den Stühlen", "den Stuehlen"], requires: ["a1-dative-two-way-zwischen-den-stuehlen"] }
        ]],
        ["fixed-mit", "FIXED PREPOSITION", "You describe your transport.", "Write: We travel by bus. Use mit plus the correct dative article.", ["Wir fahren mit dem Bus."], "Mit always takes the dative. Bus is masculine, so use dem.", ["mit-dem-bus"], ["Wir", "fahren", "mit", "dem", "Bus"], [
          { prompt: "Write: I speak with the man. Use mit plus the correct dative article.", answers: ["Ich spreche mit dem Mann."], requires: ["a1-dative-two-way-dem-mann"] }
        ]],
        ["fixed-bei", "FIXED PREPOSITION", "You describe your workplace.", "Write: I speak German at work. Use bei plus the correct dative article.", ["Bei der Arbeit spreche ich Deutsch.", "Ich spreche bei der Arbeit Deutsch."], "Bei always takes the dative. Arbeit is feminine, so use der.", ["bei-der-arbeit"], ["Bei", "der", "Arbeit", "spreche", "ich", "Deutsch"], [
          { prompt: "Write: I am staying with a female friend. Use bei plus the correct dative article.", answers: ["Ich wohne bei einer Freundin."], requires: ["a1-dative-two-way-einer-freundin"] }
        ]],
        ["contractions", "DATIVE CONTRACTIONS", "You report one origin and one destination.", "Write: I am coming from the doctor. Then I am going to the train station.", ["Ich komme vom Arzt. Dann gehe ich zum Bahnhof."], "Vom contracts von dem. Zum contracts zu dem.", ["vom-arzt", "zum-bahnhof"], ["vom Arzt", "zum Bahnhof", "Ich komme", "Dann gehe ich"], [
          { prompt: "Write: She is going to the pharmacy. He is coming from the city.", answers: ["Sie geht zur Apotheke. Er kommt aus der Stadt."], requires: ["a1-dative-two-way-zur-apotheke", "a1-dative-two-way-aus-der-stadt"] }
        ]],
        ["where-table", "LOCATION", "A book is already resting on a table.", "Answer Wo liegt das Buch? Write the complete German sentence.", ["Das Buch liegt auf dem Tisch."], "Wo asks for location, so auf takes the dative: auf dem Tisch.", ["auf-dem-tisch", "liegen"], ["Das Buch", "liegt", "auf", "dem", "Tisch"], [
          { prompt: "Answer Wo liegt das Handy? Say that it is in the bag.", answers: ["Das Handy liegt in der Tasche."], requires: ["a1-dative-two-way-in-der-tasche", "a1-dative-two-way-liegen"] }
        ]],
        ["where-to-table", "DIRECTION", "You move a book onto a table.", "Answer Wohin legst du das Buch? Write the complete German sentence.", ["Ich lege das Buch auf den Tisch."], "Wohin asks for a destination, so auf takes the accusative: auf den Tisch.", ["auf-den-tisch", "legen"], ["Ich", "lege", "das Buch", "auf", "den", "Tisch"], [
          { prompt: "Answer Wohin legst du das Handy? Say that you put it into the bag.", answers: ["Ich lege das Handy in die Tasche."], requires: ["a1-dative-two-way-in-die-tasche", "a1-dative-two-way-legen"] }
        ]],
        ["wall-pair", "LOCATION OR DIRECTION", "You compare a finished location with an action.", "Write both sentences in order: The picture is hanging on the wall. I hang the picture on the wall.", ["Das Bild hängt an der Wand. Ich hänge das Bild an die Wand.", "Das Bild haengt an der Wand. Ich haenge das Bild an die Wand."], "The location uses dative an der Wand. The destination uses accusative an die Wand.", ["an-der-wand", "an-die-wand"], ["hängt", "an der Wand", "hänge", "an die Wand"], [
          { prompt: "Write both sentences in order: The key is in the bag. I put the key into the bag.", answers: ["Der Schlüssel ist in der Tasche. Ich lege den Schlüssel in die Tasche.", "Der Schluessel ist in der Tasche. Ich lege den Schluessel in die Tasche."], requires: ["a1-dative-two-way-in-der-tasche", "a1-dative-two-way-in-die-tasche"] }
        ]],
        ["under-bed-pair", "LOCATION OR DIRECTION", "You organize shoes in a bedroom.", "Write both sentences in order: The shoes are under the bed. I put the shoes under the bed.", ["Die Schuhe stehen unter dem Bett. Ich stelle die Schuhe unter das Bett."], "Standing location uses dative. Placement toward a destination uses accusative.", ["unter-dem-bett", "unter-das-bett", "stehen", "stellen"], ["stehen", "unter dem Bett", "stelle", "unter das Bett"], [
          { prompt: "Write both sentences in order: The bag is beside the door. I put the bag beside the door.", answers: ["Die Tasche steht neben der Tür. Ich stelle die Tasche neben die Tür.", "Die Tasche steht neben der Tuer. Ich stelle die Tasche neben die Tuer."], requires: ["a1-dative-two-way-neben-der-tuer", "a1-dative-two-way-neben-die-tuer"] }
        ]],
        ["front-house-pair", "LOCATION OR DIRECTION", "You describe and then move a car.", "Write both sentences in order: The car is in front of the house. I drive the car to the front of the house.", ["Das Auto steht vor dem Haus. Ich fahre das Auto vor das Haus."], "The fixed location uses dative. The destination uses accusative.", ["vor-dem-haus", "vor-das-haus"], ["steht", "vor dem Haus", "fahre", "vor das Haus"], [
          { prompt: "Write both sentences in order: The bag is between the chairs. I put the bag between the chairs.", answers: ["Die Tasche steht zwischen den Stühlen. Ich stelle die Tasche zwischen die Stühle.", "Die Tasche steht zwischen den Stuehlen. Ich stelle die Tasche zwischen die Stuehle."], requires: ["a1-dative-two-way-zwischen-den-stuehlen", "a1-dative-two-way-zwischen-die-stuehle"] }
        ]],
        ["choose-case-cue", "CASE DECISION", "You identify the meaning before selecting the case.", "Complete both phrases with articles: Wo? auf ___ Tisch. Wohin? auf ___ Tisch.", ["Wo? auf dem Tisch. Wohin? auf den Tisch.", "auf dem Tisch, auf den Tisch"], "Wo signals a location with dative. Wohin signals a destination with accusative.", ["auf-dem-tisch", "auf-den-tisch"], ["dem", "den", "Tisch"], [
          { prompt: "Complete both phrases with articles: Wo? in ___ Tasche. Wohin? in ___ Tasche.", answers: ["Wo? in der Tasche. Wohin? in die Tasche.", "in der Tasche, in die Tasche"], requires: ["a1-dative-two-way-in-der-tasche", "a1-dative-two-way-in-die-tasche"] }
        ]],
        ["verb-pair", "VERB CONTRAST", "A phone first has a location and then changes location.", "Use liegen and legen: The mobile phone is on the table. I put it into the bag.", ["Das Handy liegt auf dem Tisch. Ich lege es in die Tasche."], "Liegt describes a location. Lege describes placement toward a destination.", ["liegen", "legen", "auf-dem-tisch", "in-die-tasche"], ["Das Handy", "liegt", "auf dem Tisch", "Ich", "lege", "es", "in die Tasche"], [
          { prompt: "Use stehen and stellen: The bottle is beside the door. I put it under the bed.", answers: ["Die Flasche steht neben der Tür. Ich stelle sie unter das Bett.", "Die Flasche steht neben der Tuer. Ich stelle sie unter das Bett."], requires: ["a1-dative-two-way-stehen", "a1-dative-two-way-stellen", "a1-dative-two-way-neben-der-tuer", "a1-dative-two-way-unter-das-bett"] }
        ]],
        ["dative-pronouns", "PRONOUN TRANSFER", "You offer help and give someone a book.", "Write: Can you help me? I give you the book. Address one person informally.", ["Kannst du mir helfen? Ich gebe dir das Buch."], "The dative forms of ich and du are mir and dir.", ["mir", "dir"], ["Kannst", "du", "mir", "helfen", "Ich", "gebe", "dir", "das Buch"], [
          { prompt: "Write: I help him. Then I answer her.", answers: ["Ich helfe ihm. Dann antworte ich ihr."], requires: ["a1-dative-two-way-ihm", "a1-dative-two-way-ihr"] }
        ]],
        ["room-directions", "GUIDED PRODUCTION", "You help someone arrange a room.", "Write: Put the book onto the table, the bag beside the door, and the shoes under the bed. Use ich sentences.", ["Ich lege das Buch auf den Tisch. Ich stelle die Tasche neben die Tür. Ich stelle die Schuhe unter das Bett.", "Ich lege das Buch auf den Tisch. Ich stelle die Tasche neben die Tuer. Ich stelle die Schuhe unter das Bett."], "Each action has a destination, so the two-way prepositions use accusative.", ["legen", "stellen", "auf-den-tisch", "neben-die-tuer", "unter-das-bett"], ["Ich lege", "das Buch", "auf den Tisch", "Ich stelle", "die Tasche", "neben die Tür", "die Schuhe", "unter das Bett"], [
          { prompt: "Describe the final locations: The book is on the table, the bag is beside the door, and the shoes are under the bed.", answers: ["Das Buch liegt auf dem Tisch. Die Tasche steht neben der Tür. Die Schuhe stehen unter dem Bett.", "Das Buch liegt auf dem Tisch. Die Tasche steht neben der Tuer. Die Schuhe stehen unter dem Bett."], requires: ["a1-dative-two-way-auf-dem-tisch", "a1-dative-two-way-neben-der-tuer", "a1-dative-two-way-unter-dem-bett"] }
        ]],
        ["route-and-room", "MIXED CASES", "You travel somewhere and organize a room there.", "Write: I go to the train station by bus. There I put the bag between the chairs.", ["Ich fahre mit dem Bus zum Bahnhof. Dort stelle ich die Tasche zwischen die Stühle.", "Ich fahre mit dem Bus zum Bahnhof. Dort stelle ich die Tasche zwischen die Stuehle."], "Mit and zu take dative. The destination between the chairs takes accusative.", ["mit-dem-bus", "zum-bahnhof", "zwischen-die-stuehle", "stellen"], ["Ich fahre", "mit dem Bus", "zum Bahnhof", "Dort", "stelle", "die Tasche", "zwischen die Stühle"], [
          { prompt: "Write: I come from the doctor and put the key into the bag.", answers: ["Ich komme vom Arzt und lege den Schlüssel in die Tasche.", "Ich komme vom Arzt und lege den Schluessel in die Tasche."], requires: ["a1-dative-two-way-vom-arzt", "a1-dative-two-way-in-die-tasche", "a1-dative-two-way-legen"] }
        ]]
      ],
      input: {
        script: "Mara: Wo ist der Schlüssel? Ben: Er liegt auf dem Tisch. Mara: Ich lege ihn in die Tasche. Wo stehen die Schuhe? Ben: Sie stehen unter dem Bett. Mara: Gut. Ich stelle die Tasche neben die Tür. Danach fahre ich mit dem Bus zum Bahnhof.",
        listenPrompt: "Write the four location or direction phrases Mara and Ben use for the key, shoes, and bag.",
        listenAnswers: ["auf dem Tisch, in die Tasche, unter dem Bett, neben die Tür", "auf dem Tisch · in die Tasche · unter dem Bett · neben die Tür", "auf dem Tisch, in die Tasche, unter dem Bett, neben die Tuer"],
        listenPromptVariants: [
          { prompt: "Which two fixed dative transport or destination phrases occur at the end?", answers: ["mit dem Bus und zum Bahnhof", "mit dem Bus, zum Bahnhof"] }
        ],
        passage: "Im Arbeitszimmer liegt das Buch auf dem Tisch. Das Bild hängt an der Wand. Eine Lampe steht neben der Tür, und die Kabel liegen unter dem Tisch. Lea räumt auf. Sie legt das Buch in die Tasche. Dann hängt sie das Bild an die andere Wand. Sie stellt die Lampe vor das Fenster und legt die Kabel hinter den Schrank.",
        readPrompt: "List the four original locations and the four new destinations in the order they appear. Keep every article.",
        readAnswers: ["auf dem Tisch, an der Wand, neben der Tür, unter dem Tisch; in die Tasche, an die andere Wand, vor das Fenster, hinter den Schrank", "auf dem Tisch · an der Wand · neben der Tür · unter dem Tisch · in die Tasche · an die andere Wand · vor das Fenster · hinter den Schrank"],
        readPromptVariants: [
          { prompt: "Which four phrases answer wo, and therefore use the dative?", answers: ["auf dem Tisch, an der Wand, neben der Tür und unter dem Tisch", "auf dem Tisch · an der Wand · neben der Tür · unter dem Tisch"] }
        ]
      },
      task: {
        writingPrompt: "Describe a room before and after you organize it. Use four dative locations, four accusative destinations, two fixed dative prepositions, and two dative pronouns.",
        writingPromptVariants: ["Write instructions and a result report for arranging a room. Contrast wo with wohin throughout."],
        guide: ["Describe the starting locations with dative", "Use legen or stellen for each movement", "Mark every destination with accusative", "Use mit, bei, von, or zu with dative", "Include mir, dir, ihm, or ihr"],
        required: ["dem", "der", "den", "auf den", "in die", "mit", "mir", "ihm"],
        model: "Das Buch liegt auf dem Tisch, und die Tasche steht neben der Tür. Die Schuhe stehen unter dem Bett. Das Bild hängt an der Wand. Mein Freund hilft mir beim Aufräumen. Ich lege das Buch in die Tasche und stelle die Tasche auf den Stuhl. Dann stelle ich die Schuhe neben die Tür und hänge das Bild an die andere Wand. Ich gebe meinem Freund die Lampe, und er stellt sie vor das Fenster. Danach fahre ich mit ihm zum Bahnhof.",
        speakingPrompt: "Give a room tour and explain where you will move four objects. Include a short travel or help detail with the dative.",
        speakingPromptVariants: ["Describe four current locations and four planned destinations aloud. Finish with two fixed dative phrases."],
        speakingGuide: ["Answer wo for each starting location", "Answer wohin for each movement", "Use liegen or stehen for locations", "Use legen or stellen for destinations", "Finish with mit, bei, von, or zu"],
        speakingRequired: ["auf dem", "in der", "auf den", "in die", "mit dem", "zum"],
        speakingModel: "Das Buch liegt auf dem Tisch. Das Handy liegt in der Tasche. Die Schuhe stehen unter dem Bett, und das Bild hängt an der Wand. Ich lege das Buch in die Tasche. Dann stelle ich die Tasche auf den Stuhl und die Schuhe neben die Tür. Das Bild hänge ich an die andere Wand. Danach fahre ich mit dem Bus zum Bahnhof."
      },
      culture: ["Location language is built into daily directions", "German directions often combine fixed dative phrases such as mit dem Bus and zum Bahnhof with two-way prepositions that distinguish a current location from a destination.", ["Dativ", "Wechselpräpositionen", "Wegbeschreibung"]]
    }
  ];

  const currentById = new Map(course.modules.map(module => [module.id, module]));
  const currentByCode = new Map(course.modules.map(module => [module.code, module]));
  const additions = [];

  specs.forEach(spec => {
    const sameId = currentById.get(spec.id);
    const sameCode = currentByCode.get(spec.code);
    if (sameId || sameCode) {
      if (sameId?.code === spec.code && sameCode?.id === spec.id) return;
      throw new Error(`Conflicting grammar pathway module: ${spec.id} (${spec.code})`);
    }
    if (spec.words.length < 28) throw new Error(`${spec.id} needs at least 28 vocabulary bundles`);
    if (spec.questions.length < 14) throw new Error(`${spec.id} needs at least 14 curated questions`);
    if (spec.canDo.length < 5) throw new Error(`${spec.id} needs at least five can-do outcomes`);
    if (spec.grammar.length < 5) throw new Error(`${spec.id} needs at least five grammar cards`);
    const wordKeys = new Set(spec.words.map(row => row[0]));
    if (wordKeys.size !== spec.words.length) throw new Error(`${spec.id} contains duplicate word keys`);
    const questionIds = new Set(spec.questions.map(row => row[0]));
    if (questionIds.size !== spec.questions.length) throw new Error(`${spec.id} contains duplicate question ids`);
    spec.questions.forEach(row => (row[6] || []).forEach(key => {
      if (!wordKeys.has(key)) throw new Error(`${spec.id} question ${row[0]} requires missing word ${key}`);
    }));
    additions.push(makeModule(spec));
    currentById.set(spec.id, additions[additions.length - 1]);
    currentByCode.set(spec.code, additions[additions.length - 1]);
  });

  course.modules.push(...additions);
})();
