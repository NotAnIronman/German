(function () {
  const course = window.SATZWERK_CURRICULUM;
  if (!course?.modules) throw new Error("Satzwerk curriculum must load before the guided lessons");

  const question = (id, type, context, prompt, answers, explanation, requires, wordBank, support) => ({
    id, type, context, prompt, answers, explanation, requires, wordBank, support
  });

  const a0 = {
    "a0-first-contact": {
      subtitle: "Learn a few complete phrases for a first meeting, then use them with support.",
      canDo: [
        "Recognize and use a greeting for the time of day",
        "Give your name and ask another person's name",
        "Choose a short informal or formal phrase",
        "Ask how someone feels and answer briefly"
      ],
      lesson: {
        title: "Your first German conversation",
        intro: "Every German phrase on this page is explained before you use it. Work from the top in order.",
        steps: [
          {
            id: "greetings",
            kind: "teach",
            label: "LEARN",
            title: "Start with complete greetings",
            body: "Hallo is a common informal greeting. Use Guten Morgen in the morning, Guten Tag during the day, and Guten Abend in the evening. Use Tschüss or Auf Wiedersehen when you leave.",
            examples: [
              { de: "Hallo!", en: "Hello!" },
              { de: "Guten Morgen!", en: "Good morning!" },
              { de: "Guten Tag!", en: "Good day! / Hello!" },
              { de: "Guten Abend!", en: "Good evening!" },
              { de: "Tschüss! · Auf Wiedersehen!", en: "Bye! · Goodbye!" }
            ],
            note: "German sentences begin with a capital letter and finish with punctuation.",
            teaches: ["hallo", "guten-tag", "tschuess"]
          },
          {
            id: "morning-choice",
            kind: "choice",
            label: "RECOGNIZE",
            title: "Choose the phrase that fits",
            body: "It is morning. You are greeting an adult you have just met.",
            prompt: "Which greeting fits?",
            options: ["Guten Morgen!", "Auf Wiedersehen!", "Tschüss!"],
            answer: "Guten Morgen!",
            success: "Guten Morgen is the morning greeting.",
            retry: "Look for the phrase that contains Morgen, which means morning."
          },
          {
            id: "polite-words",
            kind: "teach",
            label: "LEARN",
            title: "Danke and bitte",
            body: "Danke means thank you. Bitte can mean please or you are welcome. Learn each as a complete response first.",
            examples: [
              { de: "Danke!", en: "Thank you!" },
              { de: "Bitte!", en: "Please! / You are welcome!" },
              { de: "Gut, danke.", en: "Well, thank you." }
            ],
            teaches: ["danke", "bitte"]
          },
          {
            id: "say-your-name",
            kind: "teach",
            label: "MODEL",
            title: "Give your name with one pattern",
            body: "Ich means I. Bin means am. Heiße means am called. Both patterns give your name.",
            examples: [
              { de: "Ich bin Mina.", en: "I am Mina." },
              { de: "Ich heiße Mina.", en: "My name is Mina." },
              { de: "Hallo, ich bin Mina.", en: "Hello, I am Mina." }
            ],
            note: "The letter ß in heiße may be typed as ss when your keyboard has no ß key.",
            teaches: ["sein", "heissen"]
          },
          {
            id: "build-introduction",
            kind: "arrange",
            label: "BUILD",
            title: "Build the model with a new name",
            body: "The model is Hallo, ich bin Mina. Keep the same order and replace Mina with Sam.",
            prompt: "Build: Hello, I am Sam.",
            tokens: ["Sam.", "bin", "Hallo,", "ich"],
            answer: "Hallo, ich bin Sam.",
            success: "The greeting comes first. Ich bin gives the name.",
            retry: "Start with Hallo, and place ich directly before bin."
          },
          {
            id: "du-and-sie",
            kind: "teach",
            label: "COMPARE",
            title: "Choose du or Sie",
            body: "Use du with a friend, child, or person who has invited you to use it. Use Sie with an adult in a formal first meeting. Sie always begins with a capital S.",
            examples: [
              { de: "Wie heißt du?", en: "What is your name? Informal" },
              { de: "Wie heißen Sie?", en: "What is your name? Formal" },
              { de: "Guten Tag, Frau Roth.", en: "Hello, Ms. Roth." },
              { de: "Guten Morgen, Herr Yilmaz.", en: "Good morning, Mr. Yilmaz." }
            ],
            note: "Frau and Herr go with the family name in formal address. The complete greeting is Guten Morgen, Herr Yilmaz.",
            teaches: ["guten-tag"]
          },
          {
            id: "formal-name-choice",
            kind: "choice",
            label: "RECOGNIZE",
            title: "Find the formal question",
            body: "You are meeting an adult for the first time.",
            prompt: "Which question uses the formal form?",
            options: ["Wie heißen Sie?", "Wie heißt du?", "Ich heiße Sam."],
            answer: "Wie heißen Sie?",
            success: "Heißen Sie is the formal pattern.",
            retry: "Look for Sie with a capital S."
          },
          {
            id: "how-are-you",
            kind: "teach",
            label: "LEARN",
            title: "Ask how someone is",
            body: "Learn these as whole phrases. Dir belongs in the informal phrase. Ihnen belongs in the formal phrase.",
            examples: [
              { de: "Wie geht es dir?", en: "How are you? Informal" },
              { de: "Wie geht es Ihnen?", en: "How are you? Formal" },
              { de: "Mir geht es gut, danke.", en: "I am well, thank you." }
            ],
            note: "The formal phrase uses Ihnen. This is the form German needs after geht es.",
            teaches: ["wie-gehts"]
          },
          {
            id: "formal-feeling-type",
            kind: "type",
            label: "SUPPORTED TYPE",
            title: "Use the formal pattern",
            body: "Copy the pattern Wie geht es Ihnen? and add Frau Roth after a comma.",
            prompt: "Ask Ms. Roth how she is.",
            placeholder: "Wie geht es ...",
            answers: ["Wie geht es Ihnen, Frau Roth?", "Wie geht's Ihnen, Frau Roth?"],
            success: "You kept Ihnen with the formal title Frau Roth.",
            retry: "Use: Wie geht es Ihnen, Frau Roth?"
          }
        ]
      },
      questions: [
        question("intro", "GUIDED BUILD", "You want to say hello and give your name.", "Introduce yourself as Sam.", ["Hallo, ich bin Sam.", "Hallo! Ich bin Sam.", "Hallo, ich heiße Sam.", "Hallo! Ich heiße Sam."], "Hallo opens the exchange. Ich bin and Ich heiße can both give your name.", ["hallo"], ["Hallo,", "ich", "bin", "Sam."], { title: "Use either name pattern", model: "Hallo, ich bin Mina. · Hallo, ich heiße Mina.", translation: "Hello, I am Mina. · Hello, my name is Mina.", tip: "Replace Mina with Sam." }),
        question("ask-name", "PATTERN", "You meet someone in an informal setting and use du.", "Ask their name.", ["Wie heißt du?"], "The informal question is Wie heißt du?", ["heissen"], ["Wie", "heißt", "du?"], { title: "Use the informal partner", model: "Wie heißen Sie?", translation: "What is your name? Formal", tip: "Change the formal pair heißen Sie to the informal pair from the lesson." }),
        question("ask-name-formal", "REGISTER", "You are meeting an adult for the first time.", "Ask for their name formally.", ["Wie heißen Sie?"], "The formal question uses heißen Sie.", ["heissen"], ["Wie", "heißen", "Sie?"], { title: "Start from the informal form", model: "Wie heißt du?", translation: "What is your name? Informal", tip: "Use the formal pair from the lesson." }),
        question("formal-morning", "REGISTER", "You greet Mr. Yilmaz formally in the morning.", "Write: Good morning, Mr. Yilmaz.", ["Guten Morgen, Herr Yilmaz.", "Guten Morgen, Herr Yilmaz!"], "Herr plus the family name makes the greeting formal.", ["guten-tag"], ["Guten", "Morgen,", "Herr", "Yilmaz."], { title: "Transfer the title", model: "Guten Morgen, Frau Roth.", translation: "Good morning, Ms. Roth.", tip: "Use Herr with Mr. Yilmaz." }),
        question("informal-feeling", "PATTERN", "You are speaking with a friend and use du.", "Ask: How are you?", ["Wie geht es dir?", "Wie geht's dir?"], "Dir belongs in the informal phrase.", ["wie-gehts"], ["Wie", "geht", "es", "dir?"], { title: "Change the register", model: "Wie geht es Ihnen?", translation: "How are you? Formal", tip: "Use the informal partner of Ihnen." }),
        question("formal-feeling", "REGISTER", "You are speaking formally with Ms. Roth.", "Ask how she is and include her title and family name.", ["Wie geht es Ihnen, Frau Roth?", "Wie geht's Ihnen, Frau Roth?"], "Ihnen belongs in the formal phrase.", ["wie-gehts"], ["Wie", "geht", "es", "Ihnen,", "Frau", "Roth?"], { title: "Build from the informal form", model: "Wie geht es dir, Lea?", translation: "How are you, Lea? Informal", tip: "Use Ihnen and Frau Roth for the formal version." }),
        question("response", "CHUNK", "Someone asks how you are.", "Say that you are well and thank them.", ["Mir geht es gut, danke.", "Mir geht's gut, danke.", "Gut, danke."], "Mir geht es gut and Gut, danke are both natural responses.", ["wie-gehts", "danke"], ["Mir", "geht", "es", "gut,", "danke."], { title: "Complete the response", model: "Mir geht es ___, danke.", translation: "I am ___, thank you.", tip: "Use the word for well from the lesson." }),
        question("goodbye", "RECALL", "The first meeting is finished.", "Write one of the two goodbyes from the lesson.", ["Auf Wiedersehen.", "Auf Wiedersehen!", "Tschüss.", "Tschüss!"], "Auf Wiedersehen is formal. Tschüss is common in informal situations.", ["tschuess"], ["Auf", "Wiedersehen."], { title: "Recall one farewell", model: "The lesson taught one formal and one informal goodbye.", translation: "Choose either one.", tip: "Use the two-word formal phrase or the one-word informal phrase." })
      ],
      input: {
        script: "Hallo. Ich heiße Nina.",
        listenPrompt: "What is her name?",
        listenAnswers: ["Nina.", "Nina"],
        passage: "Frau Roth: Guten Morgen.\nSam: Guten Morgen. Ich heiße Sam.\nFrau Roth: Ich heiße Anna Roth.\nSam: Auf Wiedersehen.",
        readPrompt: "What is the woman's full name? You may answer with the name only.",
        readAnswers: ["Anna Roth.", "Anna Roth"]
      },
      task: {
        writingPrompt: "Write exactly four short lines and use at least 8 words. Line 1 is a greeting. Line 2 gives your name. Line 3 asks a taught name question. Line 4 is a goodbye.",
        minWords: 8,
        guide: ["Greeting: Guten Tag.", "Name: Ich heiße Sam.", "Question: Wie heißen Sie?", "Goodbye: Auf Wiedersehen."],
        required: ["ich", "hei"],
        checks: [
          { type: "lineCount", value: 4, label: "Exactly four non-empty lines" },
          { type: "minWords", value: 8, label: "At least 8 words" },
          { type: "regexLine", line: 0, pattern: "^(?:hallo|guten\\s+(?:morgen|tag|abend))[!.,]?$", flags: "iu", label: "Line 1 is a taught greeting" },
          { type: "regexLine", line: 1, pattern: "^ich\\s+(?:bin|hei(?:ß|ss)e)\\s+[\\p{L}][\\p{L}'’-]*[.!]?$", flags: "iu", label: "Line 2 gives your name" },
          { type: "regexLine", line: 2, pattern: "^wie\\s+(?:hei(?:ß|ss)t\\s+du|hei(?:ß|ss)en\\s+sie)\\s*\\??$", flags: "iu", label: "Line 3 is a taught name question" },
          { type: "regexLine", line: 3, pattern: "^(?:tsch(?:ü|ue)ss|auf\\s+wiedersehen)[.!]?$", flags: "iu", label: "Line 4 is a taught goodbye" },
          { type: "capitalization", required: false, words: ["Hallo", "Guten", "Morgen", "Tag", "Abend", "Ich", "Wie", "Sie", "Frau", "Herr", "Auf", "Wiedersehen", "Tschüss"], label: "Use the taught capital letters" },
          { type: "keyboardSpellings", required: false, forms: [{ typed: "heisse", standard: "heiße" }, { typed: "heisst", standard: "heißt" }, { typed: "heissen", standard: "heißen" }, { typed: "Tschuess", standard: "Tschüss" }], label: "Use ä, ö, ü, or ß when your keyboard allows" },
          { type: "punctuatedLines", required: false, label: "Finish every line with punctuation" }
        ],
        model: "Guten Tag.\nIch heiße Sam.\nWie heißen Sie?\nAuf Wiedersehen.",
        speakingPrompt: "Use the four taught lines as a short first meeting.",
        speakingGuide: ["Greeting", "Your name", "One taught question", "Goodbye"],
        speakingRequired: [["hallo", "guten morgen", "guten tag"], "ich", "wie", ["tschüss", "tschuess", "auf wiedersehen"]],
        speakingModel: "Guten Tag. Ich heiße Sam. Wie heißen Sie? Auf Wiedersehen."
      }
    },

    "a0-personal-details": {
      prerequisite: "a0-first-contact",
      subtitle: "Build a short personal profile from reusable sentence frames.",
      canDo: ["Give your name and age", "Say where you come from and where you live", "Name languages you speak", "Give a simple address or phone number"],
      lesson: {
        title: "A short profile about you",
        intro: "Each new fact gets its own sentence frame. Questions come after the matching statement.",
        steps: [
          { id: "name-review", kind: "teach", label: "REVIEW", title: "Begin with your name", body: "Carry one useful pattern forward from the first module.", examples: [{ de: "Ich heiße Ravi.", en: "My name is Ravi." }, { de: "Mein Name ist Ravi.", en: "My name is Ravi." }], teaches: ["name"] },
          { id: "age", kind: "teach", label: "LEARN", title: "Give your age with digits", body: "Use Ich bin, then the age, then Jahre alt. Digits keep the first practice focused on the sentence frame.", examples: [{ de: "Ich bin 28 Jahre alt.", en: "I am 28 years old." }, { de: "Ich bin 40 Jahre alt.", en: "I am 40 years old." }], note: "Jahre means years. Alt means old in this phrase.", teaches: ["a0pd-alt"] },
          { id: "home", kind: "teach", label: "LEARN", title: "Say where you live", body: "Use wohnen in with a city. Wo asks for a place.", examples: [{ de: "Ich wohne in Bonn.", en: "I live in Bonn." }, { de: "Wo wohnst du?", en: "Where do you live?" }], teaches: ["wohnen", "stadt"] },
          { id: "build-home", kind: "arrange", label: "BUILD", title: "Use the city frame", body: "Keep Ich wohne in together and place the city last.", prompt: "Build: I live in Chicago.", tokens: ["Chicago.", "wohne", "Ich", "in"], answer: "Ich wohne in Chicago.", success: "Ich wohne in plus a city gives your home city.", retry: "Start with Ich and place wohne second." },
          { id: "origin", kind: "teach", label: "LEARN", title: "Say where you come from", body: "Use kommen aus with a country. Woher asks about origin.", examples: [{ de: "Ich komme aus Kanada.", en: "I come from Canada." }, { de: "Woher kommst du?", en: "Where do you come from?" }], teaches: ["kommen", "land"] },
          { id: "wo-choice", kind: "choice", label: "RECOGNIZE", title: "Place or origin?", body: "One question asks where you live. The other asks where you come from.", prompt: "Which question asks about origin?", options: ["Woher kommst du?", "Wo wohnst du?", "Ich komme aus Kanada."], answer: "Woher kommst du?", success: "Woher points back to a place of origin.", retry: "Look for Woher." },
          { id: "languages", kind: "teach", label: "LEARN", title: "Name your languages", body: "Use sprechen for languages. Und means and. Language names begin with capital letters.", examples: [{ de: "Ich spreche Englisch.", en: "I speak English." }, { de: "Ich spreche ein bisschen Deutsch.", en: "I speak a little German." }], teaches: ["sprechen", "sprache", "bisschen"] },
          { id: "contact", kind: "teach", label: "LEARN", title: "Give simple contact details", body: "Learn each line as a complete frame. Meine Adresse ist gives an address. Meine Telefonnummer ist gives a phone number. Digits are accepted.", examples: [{ de: "Meine Adresse ist Parkstraße 4.", en: "My address is 4 Park Street." }, { de: "Meine Telefonnummer ist 555 0192.", en: "My phone number is 555 0192." }], teaches: ["adresse", "nummer"] },
          { id: "language-type", kind: "type", label: "SUPPORTED TYPE", title: "Join two language details", body: "Start with Ich spreche Englisch. Add und ein bisschen Deutsch before the period.", prompt: "Say that you speak English and a little German.", placeholder: "Ich spreche ...", answers: ["Ich spreche Englisch und ein bisschen Deutsch."], success: "Ich spreche comes first, followed by the languages.", retry: "Use: Ich spreche Englisch und ein bisschen Deutsch." }
        ]
      },
      questions: [
        question("name", "PATTERN", "You give your name.", "Say: My name is Ravi.", ["Ich heiße Ravi.", "Mein Name ist Ravi."], "Use one of the two taught name patterns.", ["name"], ["Ich", "heiße", "Ravi."], { title: "Name frame", model: "Ich heiße Mina.", translation: "My name is Mina.", tip: "Replace Mina with Ravi." }),
        question("age", "PATTERN", "You give your age with digits.", "Say: I am 28 years old.", ["Ich bin 28 Jahre alt."], "The age goes between Ich bin and Jahre alt.", ["a0pd-alt"], ["Ich", "bin", "28", "Jahre", "alt."], { title: "Age frame", model: "Ich bin 40 Jahre alt.", translation: "I am 40 years old.", tip: "Replace 40 with 28." }),
        question("home", "PATTERN", "You give your current city.", "Say: I live in Chicago.", ["Ich wohne in Chicago."], "Use wohnen in with a city.", ["wohnen", "stadt"], ["Ich", "wohne", "in", "Chicago."], { title: "City frame", model: "Ich wohne in Bonn.", translation: "I live in Bonn.", tip: "Replace Bonn with Chicago." }),
        question("ask-home", "WORD ORDER", "You are using du.", "Ask: Where do you live?", ["Wo wohnst du?"], "Wo comes first, followed by wohnst and du.", ["wohnen"], ["Wo", "wohnst", "du?"], { title: "Build from the statement", model: "Ich wohne in Bonn.", translation: "I live in Bonn.", tip: "Begin the question with Wo, then use wohnst du." }),
        question("origin", "PATTERN", "You give your country of origin.", "Say: I come from Canada.", ["Ich komme aus Kanada."], "Use kommen aus with a country.", ["kommen", "land"], ["Ich", "komme", "aus", "Kanada."], { title: "Origin frame", model: "Ich komme aus Indien.", translation: "I come from India.", tip: "Replace Indien with Kanada." }),
        question("ask-origin", "WORD ORDER", "You are using du.", "Ask: Where do you come from?", ["Woher kommst du?"], "Woher asks about origin.", ["kommen"], ["Woher", "kommst", "du?"], { title: "Build from the statement", model: "Ich komme aus Indien.", translation: "I come from India.", tip: "Begin the question with Woher, then use kommst du." }),
        question("english", "PATTERN", "You name one language.", "Say: I speak English.", ["Ich spreche Englisch."], "Language names begin with capital letters.", ["sprechen", "sprache"], ["Ich", "spreche", "Englisch."], { title: "Language frame", model: "Ich spreche Deutsch.", translation: "I speak German.", tip: "Replace Deutsch with Englisch." }),
        question("little-german", "CHUNK", "You describe your beginner German.", "Say: I speak a little German.", ["Ich spreche ein bisschen Deutsch."], "Ein bisschen means a little.", ["sprechen", "bisschen"], ["Ich", "spreche", "ein", "bisschen", "Deutsch."], { title: "Useful chunk", model: "ein bisschen Deutsch", translation: "a little German", tip: "Place it after Ich spreche." }),
        question("phone", "PATTERN", "You give a simple phone number.", "Say: My phone number is 555.", ["Meine Telefonnummer ist 555."], "Meine Telefonnummer ist introduces the number.", ["nummer"], ["Meine", "Telefonnummer", "ist", "555."], { title: "Contact frame", model: "Meine Telefonnummer ist 123.", translation: "My phone number is 123.", tip: "Digits are accepted." })
      ],
      input: {
        script: "Ich heiße Ravi. Ich wohne in Bonn.",
        listenPrompt: "Where does Ravi live?",
        listenAnswers: ["Bonn.", "Bonn", "In Bonn."],
        passage: "Ich heiße Ravi.\nIch komme aus Indien.\nIch wohne in Bonn.\nIch spreche Englisch und ein bisschen Deutsch.",
        readPrompt: "Where does Ravi live? You may answer with the city only.",
        readAnswers: ["Bonn.", "Bonn", "In Bonn."]
      },
      task: {
        writingPrompt: "Write exactly five lines about an invented person and use at least 18 words. Choose details from the guide. Give a name, age, country, city, and language in that order.",
        minWords: 18,
        guide: ["Line 1: Ravi or Mina", "Line 2: 28 or 40", "Line 3: Kanada or Indien", "Line 4: Bonn or Chicago", "Line 5: Englisch, Deutsch, or Englisch und ein bisschen Deutsch"],
        required: ["ich", "komme", "wohne", "spreche"],
        checks: [
          { type: "lineCount", value: 5, label: "Exactly five non-empty lines" },
          { type: "minWords", value: 18, label: "At least 18 words" },
          { type: "regexLine", line: 0, pattern: "^(?:ich\\s+(?:bin|hei(?:ß|ss)e)|mein\\s+name\\s+ist)\\s+(?:Ravi|Mina)[.!]?$", flags: "iu", label: "Line 1 gives Ravi or Mina as the name" },
          { type: "regexLine", line: 1, pattern: "^ich\\s+bin\\s+(?:28|40)\\s+jahre\\s+alt[.!]?$", flags: "iu", label: "Line 2 gives age 28 or 40" },
          { type: "regexLine", line: 2, pattern: "^ich\\s+komme\\s+aus\\s+(?:Kanada|Indien)[.!]?$", flags: "iu", label: "Line 3 gives Kanada or Indien" },
          { type: "regexLine", line: 3, pattern: "^ich\\s+wohne\\s+in\\s+(?:Bonn|Chicago)[.!]?$", flags: "iu", label: "Line 4 gives Bonn or Chicago" },
          { type: "regexLine", line: 4, pattern: "^ich\\s+spreche\\s+(?:Englisch|Deutsch|Englisch\\s+und\\s+ein\\s+bisschen\\s+Deutsch)[.!]?$", flags: "iu", label: "Line 5 uses a language choice from the guide" },
          { type: "capitalization", required: false, words: ["Ich", "Mein", "Name", "Ravi", "Mina", "Jahre", "Kanada", "Indien", "Bonn", "Chicago", "Englisch", "Deutsch"], label: "Use the taught capital letters" },
          { type: "keyboardSpellings", required: false, forms: [{ typed: "heisse", standard: "heiße" }], label: "Use ß when your keyboard allows" },
          { type: "punctuatedLines", required: false, label: "Finish every line with punctuation" }
        ],
        model: "Ich heiße Ravi.\nIch bin 28 Jahre alt.\nIch komme aus Indien.\nIch wohne in Bonn.\nIch spreche Englisch und ein bisschen Deutsch.",
        speakingPrompt: "Give the same five personal details from the taught frames.",
        speakingGuide: ["Name", "Age", "Country", "City", "Language"],
        speakingRequired: [["heiße", "heisse", "name"], "jahre alt", "komme", "wohne", "spreche"],
        speakingModel: "Ich heiße Ravi. Ich bin 28 Jahre alt. Ich komme aus Indien. Ich wohne in Bonn. Ich spreche Englisch und ein bisschen Deutsch."
      }
    },

    "a0-everyday-things": {
      prerequisite: "a0-personal-details",
      subtitle: "Learn each object with its article, then build short object sentences.",
      canDo: ["Recognize der, die, and das with familiar objects", "Use ein or eine in a short identification", "Say that you have a familiar object", "Ask for the German word"],
      lesson: {
        title: "Learn objects with their articles",
        intro: "German nouns are learned as bundles. The article and capital letter stay attached to the noun.",
        steps: [
          { id: "noun-bundles", kind: "teach", label: "LEARN", title: "Keep the article with the noun", body: "The small word before a noun is its article. Der, die, and das all mean the here. Der words are called masculine, die words feminine, and das words neuter. Learn the article with the noun. Every German noun begins with a capital letter.", examples: [{ de: "der Tisch", en: "the table" }, { de: "die Tasche", en: "the bag" }, { de: "die Lampe", en: "the lamp" }, { de: "das Buch", en: "the book" }], teaches: ["tisch", "tasche", "lampe", "buch"] },
          { id: "book-choice", kind: "choice", label: "RECOGNIZE", title: "Recall the bundle", body: "You just learned das Buch.", prompt: "Which article belongs with Buch?", options: ["das", "der", "die"], answer: "das", success: "Buch is learned as das Buch.", retry: "Look back at the three noun bundles." },
          { id: "ein-eine", kind: "teach", label: "MODEL", title: "Say that an object is here", body: "Use Das ist for This is. Use ein with der and das nouns here. Use eine with die nouns.", examples: [{ de: "Das ist ein Tisch.", en: "This is a table." }, { de: "Das ist eine Tasche.", en: "This is a bag." }, { de: "Das ist ein Buch.", en: "This is a book." }], note: "The first word and every noun begin with capital letters." },
          { id: "build-lamp", kind: "arrange", label: "BUILD", title: "Use eine with a die noun", body: "Lampe is learned as die Lampe, so this sentence uses eine.", prompt: "Build: This is a lamp.", tokens: ["Lampe.", "Das", "eine", "ist"], answer: "Das ist eine Lampe.", success: "Die Lampe pairs with eine in this sentence.", retry: "Start with Das ist and place eine before Lampe." },
          { id: "more-objects", kind: "teach", label: "LEARN", title: "Add four useful objects", body: "Read each complete bundle twice. Keep the capital letter on the noun.", examples: [{ de: "der Stuhl", en: "the chair" }, { de: "der Schlüssel", en: "the key" }, { de: "das Handy", en: "the mobile phone" }, { de: "das Papier", en: "the paper" }], teaches: ["stuhl", "schluessel", "handy", "papier"] },
          { id: "have", kind: "teach", label: "COMPARE", title: "Say what you have", body: "Use Ich habe for I have. A masculine ein word changes to einen after habe. Feminine eine and neuter ein stay the same.", examples: [{ de: "Ich habe einen Schlüssel.", en: "I have a key." }, { de: "Ich habe eine Tasche.", en: "I have a bag." }, { de: "Ich habe ein Buch.", en: "I have a book." }], teaches: ["haben"] },
          { id: "key-choice", kind: "choice", label: "RECOGNIZE", title: "Choose the form after habe", body: "Schlüssel is masculine: der Schlüssel.", prompt: "Complete: Ich habe ___ Schlüssel.", options: ["einen", "eine", "ein"], answer: "einen", success: "Masculine ein changes to einen after habe.", retry: "Use the form shown in Ich habe einen Schlüssel." },
          { id: "ask-word", kind: "teach", label: "SURVIVAL PHRASE", title: "Ask for a missing word", body: "Learn this as one complete question. It lets you keep learning during a real conversation.", examples: [{ de: "Wie heißt das auf Deutsch?", en: "What is that called in German?" }], teaches: ["auf-deutsch"] },
          { id: "have-book-type", kind: "type", label: "SUPPORTED TYPE", title: "Use the neuter pattern", body: "Buch is neuter: das Buch. After Ich habe, the article is still ein.", prompt: "Say: I have a book.", placeholder: "Ich habe ...", answers: ["Ich habe ein Buch."], success: "Das Buch uses ein after habe.", retry: "Use: Ich habe ein Buch." }
        ]
      },
      questions: [
        question("book", "ARTICLE", "Buch is learned as das Buch.", "Say: This is a book.", ["Das ist ein Buch."], "A das noun uses ein in this sentence.", ["buch"], ["Das", "ist", "ein", "Buch."], { title: "Transfer the pattern", model: "Das ist ein Tisch.", translation: "This is a table.", tip: "Replace Tisch with Buch. The article remains ein." }),
        question("bag", "ARTICLE", "Tasche is learned as die Tasche.", "Say: This is a bag.", ["Das ist eine Tasche."], "A die noun uses eine in this sentence.", ["tasche"], ["Das", "ist", "eine", "Tasche."], { title: "Feminine model", model: "Das ist eine Lampe.", translation: "This is a lamp.", tip: "Use eine with Tasche." }),
        question("table", "ARTICLE", "Tisch is learned as der Tisch.", "Say: This is a table.", ["Das ist ein Tisch."], "A der noun uses ein in this sentence.", ["tisch"], ["Das", "ist", "ein", "Tisch."], { title: "Transfer the pattern", model: "Das ist ein Buch.", translation: "This is a book.", tip: "Replace Buch with Tisch. The article remains ein." }),
        question("lamp", "ARTICLE", "Lampe is learned as die Lampe.", "Say: This is a lamp.", ["Das ist eine Lampe."], "A die noun uses eine in this sentence.", ["lampe"], ["Das", "ist", "eine", "Lampe."], { title: "Feminine pattern", model: "Das ist eine Tasche.", translation: "This is a bag.", tip: "Replace Tasche with Lampe." }),
        question("have-key", "FORM", "You say that you have a key.", "Say: I have a key.", ["Ich habe einen Schlüssel."], "The masculine form after habe is einen.", ["haben", "schluessel"], ["Ich", "habe", "einen", "Schlüssel."], { title: "Compare the article", model: "Ich habe eine Tasche.", translation: "I have a bag.", tip: "Schlüssel is masculine, so use the masculine form after habe." }),
        question("have-book", "FORM", "You say that you have a book.", "Say: I have a book.", ["Ich habe ein Buch."], "The neuter form stays ein.", ["haben", "buch"], ["Ich", "habe", "ein", "Buch."], { title: "Compare the article", model: "Ich habe einen Schlüssel.", translation: "I have a key.", tip: "Buch is neuter, so the form after habe stays ein." }),
        question("phone", "ARTICLE", "Handy is learned as das Handy.", "Say: This is a mobile phone.", ["Das ist ein Handy."], "A das noun uses ein in this sentence.", ["handy"], ["Das", "ist", "ein", "Handy."], { title: "Neuter pattern", model: "Das ist ein Buch.", translation: "This is a book.", tip: "Replace Buch with Handy." }),
        question("ask-word", "CHUNK", "You see an object and need the German word.", "Ask: What is that called in German?", ["Wie heißt das auf Deutsch?"], "This question works as one learned phrase.", ["auf-deutsch"], ["Wie", "heißt", "das", "auf", "Deutsch?"], { title: "Complete the learned phrase", model: "Wie heißt ___ auf Deutsch?", translation: "What is ___ called in German?", tip: "The missing word means that." })
      ],
      input: {
        script: "Das ist ein Buch.",
        listenPrompt: "Which object did you hear?",
        listenAnswers: ["Buch.", "Buch", "ein Buch", "a book"],
        passage: "Das ist ein Tisch.\nDas ist eine Tasche.\nIch habe ein Buch.",
        readPrompt: "Which object does the speaker have? You may answer in English or German.",
        readAnswers: ["Ein Buch.", "Ein Buch", "Buch.", "Buch", "A book.", "A book"]
      },
      task: {
        writingPrompt: "Write exactly three four-word lines with Das ist. Line 1 uses Tisch, Stuhl, or Schlüssel. Line 2 uses Tasche or Lampe. Line 3 uses Buch or Handy.",
        minWords: 12,
        guide: ["Masculine: Das ist ein Tisch.", "Feminine: Das ist eine Tasche.", "Neuter: Das ist ein Buch."],
        required: ["ist"],
        checks: [
          { type: "lineCount", value: 3, label: "Exactly three non-empty lines" },
          { type: "minWords", value: 12, label: "At least 12 words" },
          { type: "regexLine", line: 0, pattern: "^das\\s+ist\\s+ein\\s+(?:Tisch|Stuhl|Schl(?:ü|ue)ssel)[.!]?$", flags: "iu", label: "Line 1 uses ein with a masculine object" },
          { type: "regexLine", line: 1, pattern: "^das\\s+ist\\s+eine\\s+(?:Tasche|Lampe)[.!]?$", flags: "iu", label: "Line 2 uses eine with a feminine object" },
          { type: "regexLine", line: 2, pattern: "^das\\s+ist\\s+ein\\s+(?:Buch|Handy)[.!]?$", flags: "iu", label: "Line 3 uses ein with a neuter object" },
          { type: "capitalization", required: false, words: ["Das", "Tisch", "Stuhl", "Schlüssel", "Tasche", "Lampe", "Buch", "Handy"], label: "Capitalize the sentence opening and every noun" },
          { type: "keyboardSpellings", required: false, forms: [{ typed: "Schluessel", standard: "Schlüssel" }], label: "Use ü when your keyboard allows" },
          { type: "punctuatedLines", required: false, label: "Finish every line with punctuation" }
        ],
        model: "Das ist ein Tisch.\nDas ist eine Tasche.\nDas ist ein Buch.",
        speakingPrompt: "Point to three familiar objects and use the pattern Das ist.",
        speakingGuide: ["One der noun", "One die noun", "One das noun"],
        speakingRequired: ["das ist", ["tisch", "stuhl", "schlüssel", "schluessel"], ["tasche", "lampe"], ["buch", "handy"]],
        speakingModel: "Das ist ein Tisch. Das ist eine Tasche. Das ist ein Buch."
      }
    }
  };

  Object.entries(a0).forEach(([id, update]) => {
    const module = course.modules.find(item => item.id === id);
    if (!module) throw new Error(`Missing A0 module: ${id}`);
    Object.assign(module, update);
  });

  const safeWordCards = {
    "a0-first-contact": {
      hallo: { bundle: "Hallo!", example: "Hallo, ich bin Mina.", exampleEn: "Hello, I am Mina.", practiceAnswers: ["Hallo, ich heiße Mina.", "Hallo! Ich heiße Mina."] },
      "guten-tag": { bundle: "Guten Morgen · Guten Tag · Guten Abend", example: "Guten Tag, Frau Roth.", exampleEn: "Hello, Ms. Roth.", practiceAnswers: ["Guten Morgen, Frau Roth.", "Guten Abend, Frau Roth."] },
      tschuess: { bundle: "Tschüss · Auf Wiedersehen", example: "Auf Wiedersehen.", exampleEn: "Goodbye." },
      danke: { bundle: "Danke! · Gut, danke.", example: "Gut, danke.", exampleEn: "Well, thank you." },
      bitte: { bundle: "Bitte!", example: "Bitte!", exampleEn: "Please! / You are welcome!" },
      sein: { bundle: "ich bin", example: "Ich bin Mina.", exampleEn: "I am Mina." },
      heissen: { bundle: "ich heiße · du heißt · Sie heißen", example: "Ich heiße Nora.", exampleEn: "My name is Nora." },
      "wie-gehts": { bundle: "Wie geht es dir? · Wie geht es Ihnen?", example: "Mir geht es gut, danke.", exampleEn: "I am well, thank you.", recall: { enAnswers: ["How are you?", "How are you doing?"] } }
    },
    "a0-personal-details": {
      name: { de: "Mein Name ist ...", en: "my name is ...", bundle: "Mein Name ist Ravi.", example: "Mein Name ist Ravi.", exampleEn: "My name is Ravi." },
      land: { de: "aus Kanada", en: "from Canada", bundle: "Ich komme aus Kanada.", example: "Ich komme aus Kanada.", exampleEn: "I come from Canada." },
      stadt: { de: "in Bonn", en: "in Bonn", bundle: "Ich wohne in Bonn.", example: "Ich wohne in Bonn.", exampleEn: "I live in Bonn." },
      sprache: { de: "Englisch · Deutsch", en: "English · German", bundle: "Ich spreche Englisch.", example: "Ich spreche Englisch.", exampleEn: "I speak English." },
      kommen: { bundle: "ich komme aus · du kommst aus", example: "Ich komme aus Indien.", exampleEn: "I come from India." },
      wohnen: { bundle: "ich wohne in · du wohnst in", example: "Ich wohne in Bonn.", exampleEn: "I live in Bonn." },
      sprechen: { bundle: "ich spreche · du sprichst", example: "Ich spreche Englisch.", exampleEn: "I speak English." },
      bisschen: { bundle: "ein bisschen Deutsch", example: "Ich spreche ein bisschen Deutsch.", exampleEn: "I speak a little German." },
      adresse: { de: "Meine Adresse ist ...", en: "my address is ...", bundle: "Meine Adresse ist Parkstraße 4.", example: "Meine Adresse ist Parkstraße 4.", exampleEn: "My address is 4 Park Street." },
      nummer: { de: "Meine Telefonnummer ist ...", en: "my phone number is ...", bundle: "Meine Telefonnummer ist 555 0192.", example: "Meine Telefonnummer ist 555 0192.", exampleEn: "My phone number is 555 0192." }
    },
    "a0-everyday-things": {
      tisch: { de: "der Tisch", bundle: "der Tisch", example: "Das ist ein Tisch.", exampleEn: "This is a table." },
      stuhl: { de: "der Stuhl", bundle: "der Stuhl", example: "Das ist ein Stuhl.", exampleEn: "This is a chair." },
      schluessel: { de: "der Schlüssel", bundle: "der Schlüssel", example: "Ich habe einen Schlüssel.", exampleEn: "I have a key." },
      tasche: { de: "die Tasche", bundle: "die Tasche", example: "Das ist eine Tasche.", exampleEn: "This is a bag." },
      lampe: { de: "die Lampe", bundle: "die Lampe", example: "Das ist eine Lampe.", exampleEn: "This is a lamp." },
      buch: { de: "das Buch", bundle: "das Buch", example: "Das ist ein Buch.", exampleEn: "This is a book." },
      handy: { de: "das Handy", bundle: "das Handy", example: "Das ist ein Handy.", exampleEn: "This is a mobile phone." },
      papier: { de: "das Papier", bundle: "das Papier", example: "Das ist Papier.", exampleEn: "This is paper." },
      haben: { bundle: "ich habe", example: "Ich habe ein Buch.", exampleEn: "I have a book." },
      "auf-deutsch": { bundle: "Wie heißt das auf Deutsch?", example: "Wie heißt das auf Deutsch?", exampleEn: "What is that called in German?" }
    }
  };

  Object.entries(safeWordCards).forEach(([moduleId, updates]) => {
    const module = course.modules.find(item => item.id === moduleId);
    Object.entries(updates).forEach(([wordId, update]) => Object.assign(module.words.find(word => word.id === wordId), update));
  });

  const safeGrammar = {
    "a0-first-contact": [
      { title: "Complete greetings", rule: "Use a whole greeting for the time and situation. Begin with a capital letter and finish with punctuation.", example: "Guten Morgen! · Guten Tag! · Guten Abend!", translation: "Good morning! · Hello! · Good evening!" },
      { title: "Two name patterns", rule: "Ich bin and Ich heiße can both introduce your name.", example: "Ich bin Mina. · Ich heiße Mina.", translation: "I am Mina. · My name is Mina." },
      { title: "Du and Sie", rule: "Use du in an informal exchange. Use capitalized Sie in a formal first meeting.", example: "Wie heißt du? · Wie heißen Sie?", translation: "What is your name? Informal · Formal" },
      { title: "How are you?", rule: "Learn the informal and formal versions as complete phrases.", example: "Wie geht es dir? · Wie geht es Ihnen?", translation: "How are you? Informal · Formal" }
    ],
    "a0-personal-details": [
      { title: "One fact per frame", rule: "Keep Ich first and place the changed verb directly after it in these statements.", example: "Ich komme ... · Ich wohne ... · Ich spreche ...", translation: "I come ... · I live ... · I speak ..." },
      { title: "Origin and city", rule: "Use aus with the country in this lesson. Use in with the city.", example: "Ich komme aus Kanada. · Ich wohne in Bonn.", translation: "I come from Canada. · I live in Bonn." },
      { title: "Wo and Woher", rule: "Wo asks where someone lives. Woher asks where someone comes from.", example: "Wo wohnst du? · Woher kommst du?", translation: "Where do you live? · Where do you come from?" },
      { title: "Languages and contact details", rule: "Use each complete frame, then replace only the personal detail.", example: "Ich spreche Englisch. · Meine Telefonnummer ist 555.", translation: "I speak English. · My phone number is 555." }
    ],
    "a0-everyday-things": [
      { title: "Article and noun together", rule: "Learn der, die, or das with every noun. German nouns begin with a capital letter.", example: "der Tisch · die Tasche · das Buch", translation: "the table · the bag · the book" },
      { title: "Ein and eine", rule: "Use ein with der and das nouns in these Das ist sentences. Use eine with die nouns.", example: "Das ist ein Tisch. · Das ist eine Tasche.", translation: "This is a table. · This is a bag." },
      { title: "Einen after habe", rule: "A masculine ein word changes to einen after Ich habe. Eine and ein stay the same here.", example: "Ich habe einen Schlüssel. · Ich habe ein Buch.", translation: "I have a key. · I have a book." },
      { title: "A useful question", rule: "Use this complete phrase when you need a German word.", example: "Wie heißt das auf Deutsch?", translation: "What is that called in German?" }
    ]
  };

  Object.entries(safeGrammar).forEach(([moduleId, cards]) => {
    const module = course.modules.find(item => item.id === moduleId);
    module.grammar = cards.concat(module.grammar.filter(card => card.supplemental));
  });

  const extraSources = [
    {
      category: "BEGINNER SEQUENCING",
      title: "Council of Europe: CEFR Companion Volume, Pre-A1",
      body: "Pre-A1 learners rely on familiar words and formulaic expressions. This guides the move from worked examples to supported use before free production.",
      url: "https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4"
    },
    {
      category: "A0 LESSON DESIGN",
      title: "Goethe-Institut: First greetings lesson sequence",
      body: "The opening sequence introduces a small greeting set, repeats it across several sessions, and adds self-introduction only after guided rehearsal.",
      url: "https://www.goethe.de/resources/files/pdf343/ffclub-introductions-lessonplan-session1.pdf"
    },
    {
      category: "A1 COURSE SEQUENCE",
      title: "Deutsche Welle: Nicos Weg A1 grammar overview",
      body: "Used to check the order of first greetings, personal pronouns, present-tense forms, and later article work.",
      url: "https://static.dw.com/downloads/52718691/grammar-overview-nicos-weg-a1.pdf"
    }
  ];

  extraSources.forEach(source => {
    if (!course.sources.some(item => item.url === source.url)) course.sources.push(source);
  });
})();
