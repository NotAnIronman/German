(function () {
  const LEVELS = [
    { id: "A0", title: "Foundation", summary: "Meet German sounds, first exchanges, personal details, articles, numbers, time, and conversation repair before the A1 route begins.", outcome: "Take part in a first encounter, share essential information, and ask for the help you need." },
    { id: "A1", title: "Everyday basics", summary: "Build a practical base for people, schedules, food, home, transport, shopping, travel, health, and recent events.", outcome: "Handle short everyday exchanges, solve predictable problems, and write simple connected messages." },
    { id: "A2", title: "Daily independence", summary: "Connect events, manage cases, coordinate work and housing, use public services, and handle travel problems.", outcome: "Manage familiar situations independently and explain plans, reasons, preferences, and requests." },
    { id: "B1", title: "Independent use", summary: "Tell connected stories, apply for work, resolve practical conflicts, evaluate information, and explain health concerns.", outcome: "Understand clear standard German and sustain connected, purposeful interaction across daily life." },
    { id: "B2", title: "Flexible command", summary: "Work with complex texts, meetings, official correspondence, presentations, mediation, formal register, and detailed argumentation.", outcome: "Communicate with useful fluency, handle disagreement, and explain complex positions with detail and qualification." }
  ];

  const SOURCES = [
    { category: "LEVEL FRAMEWORK", title: "Council of Europe: CEFR Companion Volume", body: "Guides the communicative goals, skill balance, mediation tasks, and progression from A1 through B2.", url: "https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-companion-volume-and-its-language-versions" },
    { category: "A1 CURRICULUM", title: "Goethe-Institut: Deutsch Online A1 course map", body: "Used to check beginner topic coverage and the sequence of everyday language functions.", url: "https://lernen.goethe.de/deutschonline/A1/PDF/EN/deutschonline_Your_course_at_a_glance.pdf" },
    { category: "VOCABULARY", title: "Goethe-Institut: A1 glossary", body: "Supports beginner vocabulary selection and the practice of storing nouns with article, plural, and example.", url: "https://lernen.goethe.de/deutschonline/A1/PDF/EN/A1_deutschonline_course_vocabulary_1-18.pdf" },
    { category: "VOCABULARY", title: "Goethe-Institut: A2 word list", body: "Used as a reference for the daily-life vocabulary expected around A2.", url: "https://www.goethe.de/pro/relaunch/prf/id/Goethe-Zertifikat_A2_Wortliste.pdf" },
    { category: "VOCABULARY", title: "Goethe-Institut and ÖSD: B1 word list", body: "Supports B1 topic and vocabulary scope. Satzwerk examples and exercises are original.", url: "https://www.goethe.de/pro/relaunch/prf/bs/Goethe-Zertifikat_B1_Wortliste.pdf" },
    { category: "ASSESSMENT SHAPE", title: "Goethe-Institut: Exam training A1 to C2", body: "Confirms that listening, reading, writing, and speaking all belong in a serious level pathway.", url: "https://www.goethe.de/en/spr/prf/ueb.html" },
    { category: "B2 OUTCOMES", title: "Goethe-Institut: Goethe-Zertifikat B2", body: "Anchors B2 work in complex text comprehension, fluent interaction, and clear detailed positions.", url: "https://www.goethe.de/ins/de/en/m/prf/prf/gzb2.html" },
    { category: "GRAMMAR", title: "Duden: German nouns", body: "Used to verify noun categories and article guidance.", url: "https://www.duden.de/sprachwissen/fuer-lernende/wortarten-nomen" },
    { category: "GRAMMAR", title: "IDS Grammis: Two-way prepositions", body: "Used to verify location with dative and destination with accusative.", url: "https://grammis.ids-mannheim.de/systematische-grammatik/1448" },
    { category: "LEARNING DESIGN", title: "Roediger and Karpicke: Retrieval practice", body: "Informs the separation between exposure, same-session repair, and later retrieval evidence.", url: "https://doi.org/10.1111/j.1467-9280.2006.01693.x" },
    { category: "LEARNING DESIGN", title: "Cepeda and colleagues: Distributed practice", body: "Informs delayed review scheduling and the durable vocabulary tier.", url: "https://doi.org/10.1037/0033-2909.132.3.354" },
    { category: "CULTURAL LEARNING", title: "Goethe-Institut: Culture in language teaching", body: "Supports observation, comparison, and regional variation in the culture notes.", url: "https://www.goethe.de/prj/dlp/en/magazin-sprache/23009865.html" },
    { category: "PRACTICAL COVERAGE", title: "Goethe-Institut: A1 course content", body: "Used to check practical beginner coverage including spelling, time, transport, shopping, health, accommodation, and polite service exchanges.", url: "https://www.goethe.de/resources/files/pdf315/a1-panorama---description-of-course-content-v1.pdf" },
    { category: "LIVING AND WORKING", title: "Goethe-Institut: Mein Weg nach Deutschland", body: "Guides practical modules about first steps, work, family, public life, and everyday independence in Germany.", url: "https://www.goethe.de/prj/dlp/en/teachingmaterials/series/mein_weg_nach_deutschland_living_in_germany" },
    { category: "B2 CURRICULUM", title: "Goethe-Institut: B2 course content", body: "Used to check advanced coverage of formal email, source summaries, conflict, meetings, presentations, and professional interaction.", url: "https://www.goethe.de/resources/files/pdf315/b2-kontext---description-of-course-content.pdf" }
  ];

  const M = spec => ({
    ...spec,
    grammar: spec.grammar.map(row => ({ title: row[0], rule: row[1], example: row[2], translation: row[3] || "" })),
    words: spec.words.map(row => ({ id: row[0], de: row[1], en: row[2], bundle: row[3], example: row[4], exampleEn: row[5], variants: row[6] || [] })),
    questions: spec.questions.map(row => ({ id: row[0], type: row[1], context: row[2], prompt: row[3], answers: row[4], explanation: row[5], requires: row[6] || [], wordBank: row[7] || [] })),
    culture: { title: spec.culture[0], body: spec.culture[1], sourceTitle: spec.culture[2], url: spec.culture[3], tags: spec.culture[4] || [] }
  });

  const modules = [
    M({
      id: "a0-first-contact", level: "A0", code: "A0.1", title: "First contact", subtitle: "Greet someone, give your name, and choose du or Sie.",
      canDo: ["Greet someone and say goodbye", "Give your name and ask another person's name", "Ask how someone feels", "Choose a simple informal or formal form of address"],
      grammar: [
        ["Personal pronouns", "Use ich for yourself, du in informal singular conversation, and Sie for formal address.", "Ich bin Sam. Wie heißen Sie?", "I am Sam. What is your name?"],
        ["Verb position", "A statement places the conjugated verb in position two. A yes or no question usually begins with the verb.", "Du bist neu. Bist du neu?", "You are new. Are you new?"],
        ["Useful sound map", "German ei sounds like the vowel in English my. German ie sounds like the vowel in see. The letters z and w usually sound like ts and v.", "heißen · sieben · zwei · Wasser", "be called · seven · two · water"]
      ],
      words: [
        ["hallo", "Hallo!", "hello", "Hallo!", "Hallo, ich bin Mina.", "Hello, I am Mina.", ["hallo"]],
        ["guten-tag", "Guten Tag!", "good day / hello", "Guten Morgen · Guten Tag · Guten Abend", "Guten Tag, Frau Roth.", "Hello, Ms. Roth."],
        ["tschuess", "Tschüss!", "bye", "Tschüss · Auf Wiedersehen", "Tschüss, bis morgen!", "Bye, see you tomorrow!", ["Tschuess"]],
        ["danke", "danke", "thank you", "danke · vielen Dank", "Vielen Dank für die Hilfe.", "Thank you very much for the help."],
        ["bitte", "bitte", "please / you are welcome", "bitte · Bitte!", "Ein Wasser, bitte.", "A water, please."],
        ["sein", "sein", "to be", "sein · ich bin · du bist · Sie sind", "Ich bin neu hier.", "I am new here."],
        ["heissen", "heißen", "to be called", "heißen · ich heiße · du heißt", "Ich heiße Nora.", "My name is Nora.", ["heissen"]],
        ["wie-gehts", "Wie geht es dir?", "How are you?", "Wie geht es dir? · Wie geht es Ihnen?", "Mir geht es gut, danke.", "I am well, thank you."]
      ],
      questions: [
        ["intro", "PRODUCE", "You meet Lea for the first time.", "Say: Hello, I am Sam.", ["Hallo, ich bin Sam.", "Hallo! Ich bin Sam."], "Bin is the ich form of sein.", ["hallo", "sein"]],
        ["ask-name", "WORD ORDER", "You are speaking with Lea and using du.", "Ask for her name.", ["Wie heißt du?", "Wie heisst du?"], "A wie question places the conjugated verb directly after the question word.", ["heissen"]],
        ["formal-morning", "REGISTER", "You meet Mr. Yilmaz in the morning and use Sie.", "Write the greeting.", ["Guten Morgen, Herr Yilmaz."], "Herr is used with the surname in formal address.", ["guten-tag"]],
        ["formal-feeling", "TRANSFER", "You are speaking formally with Ms. Roth.", "Ask how she is.", ["Wie geht es Ihnen, Frau Roth?", "Wie geht's Ihnen, Frau Roth?"], "Ihnen belongs to formal Sie in this expression.", ["wie-gehts"]],
        ["response", "PRODUCE", "Someone asks how you are.", "Say that you are doing well and thank them.", ["Mir geht es gut, danke.", "Mir geht's gut, danke."], "Mir geht es gut is a useful complete response.", ["wie-gehts", "danke"]]
      ],
      input: { script: "Guten Tag. Ich heiße Nina. Wie heißen Sie? Ich heiße Daniel Koch. Wie geht es Ihnen? Gut, danke.", listenPrompt: "Wie heißt die Frau?", listenAnswers: ["Sie heißt Nina.", "Nina."], passage: "Guten Tag. Ich heiße Nina. Das ist Daniel Koch. Nina und Daniel sprechen zum ersten Mal miteinander. Am Ende sagt Daniel: Auf Wiedersehen.", readPrompt: "Wie heißt der Mann?", readAnswers: ["Er heißt Daniel Koch.", "Daniel Koch."] },
      task: { writingPrompt: "Write a four-line first meeting. Include a greeting, your name, one question, and a goodbye.", minWords: 10, guide: ["Choose du or Sie", "Put the conjugated verb in the correct place", "Finish each sentence with punctuation"], required: ["ich", "hei"], model: "Guten Tag. Ich heiße Sam. Wie heißen Sie? Auf Wiedersehen.", speakingPrompt: "Introduce yourself, ask the other person's name, ask how they are, and close the exchange.", speakingGuide: ["Use one greeting", "Say your name", "Ask two short questions", "Use one goodbye"], speakingRequired: ["ich", "wie"], speakingModel: "Guten Tag. Ich heiße Sam. Wie heißen Sie? Wie geht es Ihnen? Auf Wiedersehen." },
      culture: ["Du or Sie?", "German uses informal du and formal Sie. Service encounters and first meetings with adults often begin with Sie. A person may later suggest using du.", "Goethe-Institut", "https://www.goethe.de/de/m/spr/ueb/daa/all/ds0/ds2.html", ["du", "Sie", "Wie heißen Sie?"]]
    }),

    M({
      id: "a0-personal-details", level: "A0", code: "A0.2", title: "Who I am", subtitle: "Share your city, country, languages, age, and contact details.",
      canDo: ["Say where you come from and live", "Name the languages you speak", "Give your age and contact details", "Understand and produce basic numbers"],
      grammar: [
        ["Origin and location", "Use aus for origin and in for the city where you live.", "Ich komme aus Kanada. Ich wohne in Bonn.", "I come from Canada. I live in Bonn."],
        ["Regular present tense", "With ich, many regular verbs end in -e. With du, they usually end in -st.", "ich wohne · du wohnst", "I live · you live"],
        ["Question words", "Wo asks for location. Woher asks for origin. Welche asks you to choose from a category.", "Wo wohnst du? Woher kommst du?", "Where do you live? Where do you come from?"]
      ],
      words: [
        ["name", "der Name, die Namen", "name", "der Name · die Namen", "Mein Name ist Ravi.", "My name is Ravi."],
        ["land", "das Land, die Länder", "country", "das Land · die Länder", "Kanada ist ein großes Land.", "Canada is a large country."],
        ["stadt", "die Stadt, die Städte", "city", "die Stadt · die Städte", "Bonn ist eine Stadt in Deutschland.", "Bonn is a city in Germany."],
        ["sprache", "die Sprache, die Sprachen", "language", "die Sprache · die Sprachen", "Deutsch ist eine Sprache.", "German is a language."],
        ["kommen", "kommen aus", "to come from", "kommen · ich komme · du kommst", "Ich komme aus Indien.", "I come from India."],
        ["wohnen", "wohnen in", "to live in", "wohnen · ich wohne · du wohnst", "Wir wohnen in Köln.", "We live in Cologne."],
        ["sprechen", "sprechen", "to speak", "sprechen · ich spreche · du sprichst", "Ich spreche Englisch und Deutsch.", "I speak English and German."],
        ["bisschen", "ein bisschen", "a little", "ein bisschen Deutsch", "Sie spricht ein bisschen Deutsch.", "She speaks a little German."],
        ["adresse", "die Adresse, die Adressen", "address", "die Adresse · die Adressen", "Wie ist deine Adresse?", "What is your address?"],
        ["nummer", "die Telefonnummer, die Telefonnummern", "phone number", "die Telefonnummer · die Telefonnummern", "Meine Telefonnummer beginnt mit null.", "My phone number begins with zero."]
      ],
      questions: [
        ["origin", "PRODUCE", "You share your country of origin.", "Say: I come from Canada.", ["Ich komme aus Kanada."], "Most country names, including Kanada, appear without an article.", ["kommen", "land"]],
        ["home", "PRODUCE", "You share your current city.", "Say: I live in Chicago.", ["Ich wohne in Chicago."], "Use in for the city where you live.", ["wohnen", "stadt"]],
        ["ask-origin", "WORD ORDER", "You are using du.", "Ask: Where do you come from?", ["Woher kommst du?"], "Woher asks about origin and the verb follows it.", ["kommen"]],
        ["languages", "TRANSFER", "You speak English and have beginner German.", "Say this in one sentence.", ["Ich spreche Englisch und ein bisschen Deutsch."], "Language names begin with a capital letter.", ["sprechen", "sprache", "bisschen"]],
        ["age", "FORM", "You are twenty-eight.", "Say: I am twenty-eight years old.", ["Ich bin achtundzwanzig Jahre alt."], "German builds twenty-eight as eight-and-twenty.", []]
      ],
      input: { script: "Name: Ravi Mehta. Alter: einunddreißig. Wohnort: Bonn. Herkunft: Indien. Sprachen: Hindi, Englisch und ein bisschen Deutsch.", listenPrompt: "Wo wohnt Ravi?", listenAnswers: ["Er wohnt in Bonn.", "In Bonn."], passage: "Ravi Mehta ist einunddreißig Jahre alt. Er kommt aus Indien und wohnt jetzt in Bonn. Er spricht Hindi, Englisch und ein bisschen Deutsch.", readPrompt: "Welche Sprachen spricht Ravi?", readAnswers: ["Er spricht Hindi, Englisch und ein bisschen Deutsch.", "Hindi, Englisch und ein bisschen Deutsch."] },
      task: { writingPrompt: "Write a short profile with your name, age, country, city, and languages.", minWords: 18, guide: ["Use five complete statements", "Use aus with your country", "Use in with your city"], required: ["ich", "komme", "wohne", "spreche"], model: "Ich heiße Ravi. Ich bin einunddreißig Jahre alt. Ich komme aus Indien. Ich wohne in Bonn. Ich spreche Hindi, Englisch und ein bisschen Deutsch.", speakingPrompt: "Give a short personal profile with five details.", speakingGuide: ["Name", "Age", "Country", "City", "Languages"], speakingRequired: ["ich", "wohne"], speakingModel: "Ich heiße Ravi. Ich komme aus Indien und wohne in Bonn. Ich spreche Hindi, Englisch und ein bisschen Deutsch." },
      culture: ["A country of regions", "Germany has 16 federal states. Cities and regions differ in speech, food, schedules, transport, and daily habits.", "Goethe-Institut", "https://www.goethe.de/ins/de/en/kur/srd/run/inf.html", ["Berlin", "Bayern", "Nordrhein-Westfalen"]]
    }),

    M({
      id: "a0-everyday-things", level: "A0", code: "A0.3", title: "Things around me", subtitle: "Learn nouns with articles and describe what you see and have.",
      canDo: ["Name common objects with their articles", "Describe an object with a color", "Ask for a German word", "Say what you have"],
      grammar: [
        ["Noun bundles", "Store each noun with its article and plural. German nouns begin with a capital letter.", "der Tisch, die Tische", "the table, the tables"],
        ["Indefinite articles", "Use ein with masculine and neuter nominative nouns. Use eine with feminine nouns.", "Das ist ein Buch. Das ist eine Tasche.", "That is a book. That is a bag."],
        ["First accusative change", "After haben, a masculine ein word changes to einen. Feminine and neuter forms stay eine and ein.", "Ich habe einen Schlüssel.", "I have a key."]
      ],
      words: [
        ["tisch", "der Tisch, die Tische", "table", "der Tisch · die Tische", "Der Tisch ist braun.", "The table is brown."],
        ["stuhl", "der Stuhl, die Stühle", "chair", "der Stuhl · die Stühle", "Der Stuhl steht am Tisch.", "The chair stands at the table."],
        ["schluessel", "der Schlüssel, die Schlüssel", "key", "der Schlüssel · die Schlüssel", "Ich habe einen Schlüssel.", "I have a key.", ["der Schluessel"]],
        ["tasche", "die Tasche, die Taschen", "bag", "die Tasche · die Taschen", "Die Tasche ist schwarz.", "The bag is black."],
        ["lampe", "die Lampe, die Lampen", "lamp", "die Lampe · die Lampen", "Die Lampe ist blau.", "The lamp is blue."],
        ["buch", "das Buch, die Bücher", "book", "das Buch · die Bücher", "Das ist ein gutes Buch.", "That is a good book."],
        ["handy", "das Handy, die Handys", "mobile phone", "das Handy · die Handys", "Mein Handy ist hier.", "My phone is here."],
        ["papier", "das Papier, die Papiere", "paper", "das Papier · die Papiere", "Wir brauchen Papier.", "We need paper."],
        ["haben", "haben", "to have", "haben · ich habe · er hat", "Ich habe ein Buch.", "I have a book."],
        ["auf-deutsch", "Wie heißt das auf Deutsch?", "What is that called in German?", "Wie heißt das auf Deutsch?", "Entschuldigung, wie heißt das auf Deutsch?", "Excuse me, what is that called in German?", ["Wie heisst das auf Deutsch?"]]
      ],
      questions: [
        ["book", "ARTICLE", "You identify an object.", "Say: That is a book.", ["Das ist ein Buch."], "Buch is neuter, so the indefinite article is ein.", ["buch"]],
        ["brown-table", "TRANSFER", "You describe the color of the table.", "Write the German sentence.", ["Der Tisch ist braun."], "The adjective stays unchanged after ist.", ["tisch"]],
        ["have-key", "CASE", "You say what you have.", "Say: I have a key.", ["Ich habe einen Schlüssel.", "Ich habe einen Schluessel."], "A masculine ein word changes to einen after haben.", ["haben", "schluessel"]],
        ["no-bag", "NEGATION", "You correct an incorrect guess.", "Say: That is no bag.", ["Das ist keine Tasche."], "Feminine eine changes to keine.", ["tasche"]],
        ["ask-word", "PRODUCE", "A useful word is missing.", "Ask for the German word.", ["Wie heißt das auf Deutsch?", "Wie heisst das auf Deutsch?"], "This complete question helps you stay in the conversation.", ["auf-deutsch"]]
      ],
      input: { script: "Im Zimmer steht ein Tisch. Auf dem Tisch liegen ein Buch, ein Handy und zwei Schlüssel. Die Lampe ist blau.", listenPrompt: "Wo ist das Handy?", listenAnswers: ["Das Handy ist auf dem Tisch.", "Auf dem Tisch."], passage: "Lina hat eine schwarze Tasche. In der Tasche sind ein Buch, ein Schlüssel und ein Handy. Das Papier liegt auf dem Tisch.", readPrompt: "Was ist in der Tasche?", readAnswers: ["Ein Buch, ein Schlüssel und ein Handy.", "In der Tasche sind ein Buch, ein Schlüssel und ein Handy."] },
      task: { writingPrompt: "Describe four objects near you. Give each noun an article and add one color or location.", minWords: 20, guide: ["Capitalize every noun", "Use der, die, or das", "Write complete sentences"], required: ["ist"], model: "Das ist ein Tisch. Der Tisch ist braun. Auf dem Tisch liegt ein Buch. Das Buch ist blau.", speakingPrompt: "Point to four objects and describe each one in German.", speakingGuide: ["Use an article with every noun", "Add one color", "Say where one object is"], speakingRequired: ["ist"], speakingModel: "Das ist ein Tisch. Der Tisch ist braun. Hier ist ein Buch. Das Buch ist blau." },
      culture: ["Sorting daily waste", "Waste categories differ by municipality. Paper, packaging, organic waste, residual waste, and glass are common categories.", "Deutschland.de", "https://www.deutschland.de/en/day-to-day-life-in-germany", ["das Papier", "das Glas", "der Restmüll"]]
    }),

    M({
      id: "a1-people-family-work", level: "A1", code: "A1.1", title: "People, family, and work", subtitle: "Introduce people and describe relationships, households, and professions.",
      canDo: ["Introduce family members and friends", "Describe another person", "Say what someone does for work", "Share simple household information"],
      grammar: [
        ["Possessives", "Mein, dein, sein, ihr, and unser change their ending to match the following noun.", "Das ist meine Schwester. Das ist mein Bruder.", "That is my sister. That is my brother."],
        ["Third person", "Use er for a masculine noun, sie for a feminine noun, and es for a neuter noun.", "Der Bruder arbeitet. Er ist Koch.", "The brother works. He is a cook."],
        ["Professions after sein", "A profession usually appears without an article after sein when it describes a person's job.", "Marias Vater ist Lehrer.", "Maria's father is a teacher."]
      ],
      words: [
        ["familie", "die Familie, die Familien", "family", "die Familie · die Familien", "Meine Familie wohnt in Leipzig.", "My family lives in Leipzig."],
        ["mutter", "die Mutter, die Mütter", "mother", "die Mutter · die Mütter", "Ihre Mutter ist Lehrerin.", "Her mother is a teacher."],
        ["vater", "der Vater, die Väter", "father", "der Vater · die Väter", "Sein Vater arbeitet in Bonn.", "His father works in Bonn."],
        ["schwester", "die Schwester, die Schwestern", "sister", "die Schwester · die Schwestern", "Das ist meine Schwester.", "That is my sister."],
        ["bruder", "der Bruder, die Brüder", "brother", "der Bruder · die Brüder", "Ihr Bruder heißt Jonas.", "Her brother is called Jonas."],
        ["eltern", "die Eltern", "parents", "die Eltern · plural", "Meine Eltern wohnen zusammen.", "My parents live together."],
        ["freund", "der Freund, die Freunde", "male friend / boyfriend", "der Freund · die Freunde", "Das ist mein Freund Paul.", "That is my friend Paul."],
        ["beruf", "der Beruf, die Berufe", "profession", "der Beruf · die Berufe", "Was ist dein Beruf?", "What is your profession?"],
        ["lehrer", "der Lehrer, die Lehrerin", "teacher", "der Lehrer · die Lehrerin", "Mara arbeitet als Lehrerin.", "Mara works as a teacher."],
        ["arbeiten-als", "arbeiten als", "to work as", "arbeiten als + Beruf", "Jonas arbeitet als Koch.", "Jonas works as a cook."]
      ],
      questions: [
        ["my-sister", "POSSESSIVE", "You introduce your sister.", "Write the sentence.", ["Das ist meine Schwester."], "Schwester is feminine, so mein takes the ending -e.", ["schwester"]],
        ["her-brother", "TRANSFER", "A woman has already been mentioned.", "Say: Her brother works as a cook.", ["Ihr Bruder arbeitet als Koch."], "Ihr shows possession by the woman already mentioned.", ["bruder", "arbeiten-als"]],
        ["maria-father", "POSSESSION", "You describe Maria's father.", "Say: Maria's father is a teacher.", ["Marias Vater ist Lehrer."], "Add s directly to the name to show possession.", ["vater", "lehrer"]],
        ["together", "PRODUCE", "You describe a shared household.", "Say: We live together.", ["Wir wohnen zusammen."], "The present-tense ending for wir is -en.", ["familie"]],
        ["paul", "TRANSFER", "Paul is single and has one child.", "Write the complete German sentence.", ["Paul ist ledig und hat ein Kind."], "Und joins two main-clause ideas.", ["familie"]]
      ],
      input: { script: "Lea wohnt mit ihrer Familie in Leipzig. Ihr Bruder heißt Jonas und arbeitet als Koch. Ihre Mutter ist Lehrerin. Lea studiert und arbeitet am Samstag in einem Café.", listenPrompt: "Was ist Jonas von Beruf?", listenAnswers: ["Er ist Koch.", "Jonas ist Koch.", "Koch."], passage: "Mara lebt mit ihrem Partner und ihrer Tochter in Bremen. Ihr Partner ist Lehrer. Mara arbeitet als Köchin. Ihre Eltern wohnen in der Nähe.", readPrompt: "Mit wem lebt Mara?", readAnswers: ["Mit ihrem Partner und ihrer Tochter.", "Mara lebt mit ihrem Partner und ihrer Tochter."] },
      task: { writingPrompt: "Write a five-sentence profile of a real or invented person. Include name, city, family, profession, and one extra detail.", minWords: 35, guide: ["Use at least two possessives", "Use one profession after sein or arbeiten als", "Keep the verb in position two"], required: ["ist", "wohn"], model: "Mara wohnt in Bremen. Sie lebt mit ihrem Partner und ihrer Tochter. Ihr Partner ist Lehrer. Mara arbeitet als Köchin. Ihre Eltern wohnen in der Nähe.", speakingPrompt: "Introduce one person and describe their family, city, and work.", speakingGuide: ["Give the person's name", "Use two family words", "Name one profession", "Add one personal detail"], speakingRequired: ["ist", "wohn"], speakingModel: "Das ist Mara. Sie wohnt in Bremen. Ihr Partner ist Lehrer. Mara arbeitet als Köchin und hat eine Tochter." },
      culture: ["Many kinds of household", "People in German-speaking countries live alone, with partners, in shared apartments, with children, or in multigenerational homes. Course examples reflect that variety.", "Goethe-Institut", "https://www.goethe.de/prj/dlp/de/unterrichtsmaterial/menschen_in_deutschland", ["die Familie", "die WG", "allein wohnen"]]
    }),

    M({
      id: "a1-daily-routine", level: "A1", code: "A1.2", title: "My day and my time", subtitle: "Tell the time, describe a routine, and arrange an appointment.",
      canDo: ["Tell the time and give a schedule", "Describe a daily routine", "Talk about obligations and abilities", "Arrange a simple appointment"],
      grammar: [
        ["Separable verbs", "The conjugated stem stays in position two and the prefix moves to the end.", "Um sieben Uhr stehe ich auf.", "I get up at seven."],
        ["Modal sentence bracket", "The modal verb is conjugated and the action stays as an infinitive at the end.", "Am Montag muss ich arbeiten.", "I have to work on Monday."],
        ["Time first", "A time phrase can occupy position one. The conjugated verb still comes next.", "Am Abend kaufe ich ein.", "In the evening I shop."]
      ],
      words: [
        ["aufstehen", "aufstehen", "to get up", "aufstehen · ich stehe auf", "Ich stehe um sieben Uhr auf.", "I get up at seven."],
        ["fruehstuecken", "frühstücken", "to eat breakfast", "frühstücken · ich frühstücke", "Wir frühstücken um halb acht.", "We eat breakfast at half past seven.", ["fruehstuecken"]],
        ["anfangen", "anfangen", "to begin", "anfangen · es fängt an", "Der Kurs fängt um neun Uhr an.", "The course begins at nine."],
        ["arbeiten", "arbeiten", "to work", "arbeiten · ich arbeite", "Am Montag arbeite ich zu Hause.", "On Monday I work from home."],
        ["einkaufen", "einkaufen", "to shop", "einkaufen · ich kaufe ein", "Am Abend kaufe ich ein.", "In the evening I shop."],
        ["termin", "der Termin, die Termine", "appointment", "der Termin · die Termine", "Der Termin ist am Dienstag.", "The appointment is on Tuesday."],
        ["pause", "die Pause, die Pausen", "break", "die Pause · die Pausen", "Um zwölf Uhr machen wir Pause.", "At twelve we take a break."],
        ["puenktlich", "pünktlich", "punctual / on time", "pünktlich sein", "Bitte komm pünktlich.", "Please come on time.", ["puenktlich"]],
        ["muessen", "müssen", "to have to", "müssen · ich muss · wir müssen", "Ich muss heute lernen.", "I have to study today.", ["muessen"]],
        ["oft", "oft", "often", "immer · oft · manchmal · selten · nie", "Ich gehe oft zu Fuß.", "I often walk."]
      ],
      questions: [
        ["get-up", "WORD ORDER", "You give the first time in your routine.", "Say: I get up at seven.", ["Um sieben Uhr stehe ich auf.", "Ich stehe um sieben Uhr auf."], "The conjugated stem is stehe and the prefix auf closes the sentence.", ["aufstehen"]],
        ["monday-work", "MODAL", "Monday includes a work obligation.", "Say: I have to work on Monday.", ["Am Montag muss ich arbeiten.", "Ich muss am Montag arbeiten."], "The modal verb is conjugated and arbeiten appears at the end.", ["muessen", "arbeiten"]],
        ["course-start", "QUESTION", "You need the start time.", "Ask when the course begins.", ["Wann fängt der Kurs an?", "Wann faengt der Kurs an?"], "Anfangen separates into fängt and an.", ["anfangen"]],
        ["walk-often", "TRANSFER", "You describe a regular commute.", "Say: I often walk to work.", ["Ich gehe oft zu Fuß zur Arbeit.", "Ich gehe oft zu Fuss zur Arbeit."], "Zu Fuß is a fixed phrase.", ["oft", "arbeiten"]],
        ["range", "TIME", "The appointment runs from nine to ten.", "Write the sentence.", ["Der Termin ist von neun bis zehn Uhr.", "Der Termin ist von neun Uhr bis zehn Uhr."], "Von and bis frame a time range.", ["termin"]]
      ],
      input: { script: "Anna steht um halb sieben auf. Ihre Arbeit beginnt um acht Uhr. Um zwölf Uhr macht sie Pause. Am Abend kauft sie ein und kocht.", listenPrompt: "Wann beginnt Annas Arbeit?", listenAnswers: ["Sie beginnt um acht Uhr.", "Um acht Uhr."], passage: "Tarek arbeitet von Montag bis Freitag. Am Dienstag beginnt er um neun Uhr. Um halb eins macht er Pause. Am Abend lernt er Deutsch.", readPrompt: "Was macht Tarek am Abend?", readAnswers: ["Er lernt Deutsch.", "Am Abend lernt er Deutsch."] },
      task: { writingPrompt: "Describe one weekday with at least five actions and times. Use zuerst, dann, and am Abend.", minWords: 45, guide: ["Use one separable verb", "Use one modal verb", "Place time first in two sentences"], required: ["zuerst", "dann", "abend"], model: "Zuerst stehe ich um sieben Uhr auf. Dann frühstücke ich. Um acht Uhr muss ich arbeiten. Mittags mache ich Pause. Am Abend kaufe ich ein und koche.", speakingPrompt: "Describe your usual weekday from morning to evening.", speakingGuide: ["Give three times", "Use a separable verb", "Use a frequency word", "End with an evening activity"], speakingRequired: ["uhr", "abend"], speakingModel: "Ich stehe um sieben Uhr auf. Dann frühstücke ich. Um acht Uhr arbeite ich. Ich gehe oft zu Fuß. Am Abend lerne ich Deutsch." },
      culture: ["Sundays and quiet time", "Many shops close on Sundays. Quiet periods depend on local rules, rental agreements, and the building.", "Deutschland.de", "https://www.deutschland.de/en/topic/life/way-of-life-germany-cellar-cleaning-week-no-kitchen", ["Sonntag", "Ruhezeit", "Öffnungszeiten"]]
    }),

    M({
      id: "a1-food-shopping", level: "A1", code: "A1.3", title: "Food and buying things", subtitle: "Order, shop, ask about price, and handle quantities.",
      canDo: ["Order food and drinks", "Ask about price and quantity", "Shop for groceries", "Express a simple request or preference"],
      grammar: [
        ["Accusative articles", "A masculine direct object uses den or einen. Feminine and neuter articles keep their familiar shapes.", "Ich möchte einen Kaffee und ein Brötchen.", "I would like a coffee and a bread roll."],
        ["Polite request", "Möchte and hätte gern are dependable ways to request something.", "Ich hätte gern zwei Brötchen.", "I would like two bread rolls."],
        ["Quantity bundles", "Keep the unit and noun together when you learn a shopping phrase.", "eine Flasche Wasser · ein Kilo Äpfel", "a bottle of water · a kilo of apples"]
      ],
      words: [
        ["brot", "das Brot, die Brote", "bread", "das Brot · die Brote", "Was kostet das Brot?", "How much does the bread cost?"],
        ["broetchen", "das Brötchen, die Brötchen", "bread roll", "das Brötchen · die Brötchen", "Ich nehme zwei Brötchen.", "I will take two bread rolls.", ["das Broetchen"]],
        ["apfel", "der Apfel, die Äpfel", "apple", "der Apfel · die Äpfel", "Ich kaufe einen Apfel.", "I am buying an apple."],
        ["banane", "die Banane, die Bananen", "banana", "die Banane · die Bananen", "Eine Banane, bitte.", "One banana, please."],
        ["wasser", "das Wasser", "water", "das Wasser · often uncounted", "Wir brauchen Wasser.", "We need water."],
        ["kaffee", "der Kaffee, die Kaffees", "coffee", "der Kaffee · die Kaffees", "Ich möchte einen Kaffee.", "I would like a coffee."],
        ["preis", "der Preis, die Preise", "price", "der Preis · die Preise", "Der Preis ist günstig.", "The price is low."],
        ["flasche", "die Flasche, die Flaschen", "bottle", "eine Flasche Wasser", "Sie kauft eine Flasche Wasser.", "She buys a bottle of water."],
        ["kosten", "kosten", "to cost", "kosten · es kostet", "Das kostet drei Euro.", "That costs three euros."],
        ["moechten", "möchten", "would like", "ich möchte · wir möchten", "Wir möchten bestellen.", "We would like to order.", ["moechten"]]
      ],
      questions: [
        ["order", "CASE", "You order at a café.", "Ask for a coffee and a bread roll politely.", ["Ich möchte einen Kaffee und ein Brötchen, bitte.", "Ich moechte einen Kaffee und ein Broetchen, bitte."], "Kaffee is masculine and takes einen. Brötchen is neuter and takes ein.", ["kaffee", "broetchen", "moechten"]],
        ["bread-price", "QUESTION", "You need the price of the bread.", "Ask the shop employee.", ["Was kostet das Brot?"], "This pattern asks for a price directly.", ["brot", "kosten"]],
        ["fruit-water", "TRANSFER", "You describe your basket.", "Say: I am buying an apple, a banana, and water.", ["Ich kaufe einen Apfel, eine Banane und Wasser."], "Each countable noun keeps its own accusative article.", ["apfel", "banane", "wasser"]],
        ["no-milk", "NEGATION", "The group needs no milk.", "Write the German sentence.", ["Wir brauchen keine Milch."], "Feminine Milch takes keine.", ["wasser"]],
        ["two-rolls", "REGISTER", "You are ordering formally at a bakery.", "Ask for two bread rolls.", ["Geben Sie mir bitte zwei Brötchen.", "Ich hätte gern zwei Brötchen, bitte.", "Geben Sie mir bitte zwei Broetchen.", "Ich haette gern zwei Broetchen, bitte."], "Both request forms suit a service encounter.", ["broetchen"]]
      ],
      input: { script: "Guten Morgen. Was möchten Sie? Zwei Brötchen, ein Brot und drei Äpfel, bitte. Sonst noch etwas? Ja, eine Flasche Wasser.", listenPrompt: "Was kauft die Kundin?", listenAnswers: ["Sie kauft zwei Brötchen, ein Brot, drei Äpfel und eine Flasche Wasser.", "Zwei Brötchen, ein Brot, drei Äpfel und eine Flasche Wasser."], passage: "Tagesangebot: ein Kaffee und ein Brötchen kosten zusammen vier Euro. Apfelsaft kostet zwei Euro. Wasser kostet einen Euro fünfzig.", readPrompt: "Was kostet ein Kaffee mit Brötchen?", readAnswers: ["Vier Euro.", "Ein Kaffee mit Brötchen kostet vier Euro."] },
      task: { writingPrompt: "Write a short shopping list and a six-line café exchange. Include two quantities, one price question, and a polite closing.", minWords: 45, guide: ["Use accusative articles", "Include bitte and danke", "Use one quantity container"], required: ["bitte", "kost"], model: "Guten Tag. Ich hätte gern einen Kaffee und ein Brötchen, bitte. Haben Sie auch Wasser? Ja, eine Flasche kostet zwei Euro. Dann nehme ich eine Flasche. Vielen Dank.", speakingPrompt: "Place a café order with one drink, one food item, one quantity, and a price question.", speakingGuide: ["Open politely", "Use möchte or hätte gern", "Ask one question", "Close with danke"], speakingRequired: ["bitte", "danke"], speakingModel: "Guten Tag. Ich möchte einen Kaffee und zwei Brötchen, bitte. Was kostet das zusammen? Vielen Dank." },
      culture: ["Bread culture", "Bakeries provide practical language for quantities, prices, regional foods, and polite requests. Germany has a large regional variety of breads and baked goods.", "Deutschland.de", "https://www.deutschland.de/en/topic/life/german-bread-and-bread-culture", ["das Brot", "das Brötchen", "die Bäckerei"]]
    }),

    M({
      id: "a1-home-and-town", level: "A1", code: "A1.4", title: "Home and places", subtitle: "Describe a room, locate objects, and find useful places nearby.",
      canDo: ["Describe rooms and furniture", "Say where an object or place is", "Distinguish location from destination", "Ask about nearby services"],
      grammar: [
        ["Location with dative", "After a two-way preposition, a fixed location answers wo and uses the dative.", "Das Buch liegt auf dem Tisch.", "The book lies on the table."],
        ["Destination with accusative", "Movement toward a destination answers wohin and uses the accusative.", "Ich lege das Buch auf den Tisch.", "I put the book onto the table."],
        ["Es gibt", "Use es gibt with an accusative noun to say that something exists in a place.", "In der Wohnung gibt es eine Küche.", "There is a kitchen in the apartment."]
      ],
      words: [
        ["wohnung", "die Wohnung, die Wohnungen", "apartment", "die Wohnung · die Wohnungen", "Meine Wohnung hat drei Zimmer.", "My apartment has three rooms."],
        ["zimmer", "das Zimmer, die Zimmer", "room", "das Zimmer · die Zimmer", "Das Zimmer ist hell.", "The room is bright."],
        ["kueche", "die Küche, die Küchen", "kitchen", "die Küche · die Küchen", "In der Küche steht ein Tisch.", "A table stands in the kitchen.", ["die Kueche"]],
        ["bad", "das Bad, die Bäder", "bathroom", "das Bad · die Bäder", "Das Bad ist neben der Küche.", "The bathroom is next to the kitchen."],
        ["schrank", "der Schrank, die Schränke", "cabinet / wardrobe", "der Schrank · die Schränke", "Der Schrank steht an der Wand.", "The cabinet stands by the wall."],
        ["bahnhof", "der Bahnhof, die Bahnhöfe", "train station", "der Bahnhof · die Bahnhöfe", "Der Bahnhof ist im Zentrum.", "The station is in the center."],
        ["apotheke", "die Apotheke, die Apotheken", "pharmacy", "die Apotheke · die Apotheken", "Die Apotheke ist neben der Bank.", "The pharmacy is next to the bank."],
        ["liegen", "liegen", "to lie / be located flat", "liegen · es liegt", "Das Handy liegt auf dem Tisch.", "The phone lies on the table."],
        ["stellen", "stellen", "to place upright", "stellen · ich stelle", "Ich stelle die Lampe auf den Tisch.", "I put the lamp on the table."],
        ["neben", "neben", "next to", "neben + dative or accusative", "Der Stuhl steht neben dem Tisch.", "The chair stands next to the table."]
      ],
      questions: [
        ["kitchen", "EXISTENCE", "You describe your apartment.", "Say: There is a kitchen in my apartment.", ["In meiner Wohnung gibt es eine Küche.", "In meiner Wohnung gibt es eine Kueche."], "Es gibt is followed by an accusative noun.", ["wohnung", "kueche"]],
        ["key-location", "CASE", "The key has a fixed location on the table.", "Write the sentence.", ["Der Schlüssel liegt auf dem Tisch.", "Der Schluessel liegt auf dem Tisch."], "A fixed location after auf uses the dative: dem Tisch.", ["liegen"]],
        ["lamp-move", "CASE", "You move the lamp onto the table.", "Say: I put the lamp on the table.", ["Ich stelle die Lampe auf den Tisch."], "A destination after auf uses the accusative: den Tisch.", ["stellen"]],
        ["pharmacy", "LOCATION", "The pharmacy has a fixed place next to the station.", "Write the German sentence.", ["Die Apotheke ist neben dem Bahnhof."], "A fixed location after neben uses the dative.", ["apotheke", "bahnhof", "neben"]],
        ["ask-market", "QUESTION", "You are looking for the supermarket.", "Ask where it is.", ["Wo ist der Supermarkt?"], "Wo asks about location.", ["bahnhof"]]
      ],
      input: { script: "Die Wohnung liegt im zweiten Stock. Links ist die Küche. Das Wohnzimmer ist neben der Küche. Im Wohnzimmer stehen ein Tisch und ein Sofa. Die Lampe steht auf dem Tisch.", listenPrompt: "Wo steht die Lampe?", listenAnswers: ["Sie steht auf dem Tisch.", "Auf dem Tisch."], passage: "Vom Bahnhof gehst du geradeaus. Die Apotheke ist links neben der Bank. Gegenüber liegt ein Supermarkt. Hinter dem Supermarkt beginnt der Park.", readPrompt: "Was liegt gegenüber der Apotheke?", readAnswers: ["Ein Supermarkt.", "Gegenüber der Apotheke liegt ein Supermarkt."] },
      task: { writingPrompt: "Describe one room in six sentences. Include furniture, two fixed locations, one movement, and one color.", minWords: 45, guide: ["Use wo with dative for two locations", "Use wohin with accusative for one movement", "Check every noun article"], required: ["in", "auf"], model: "Mein Wohnzimmer ist hell. Neben der Tür steht ein Schrank. Auf dem Tisch liegt ein Buch. Die Lampe steht neben dem Sofa. Ich stelle eine Pflanze auf den Schrank. Die Pflanze ist grün.", speakingPrompt: "Describe a room, then tell someone where to put two objects.", speakingGuide: ["Name four objects", "Give two locations", "Give two movement instructions"], speakingRequired: ["dem", "den"], speakingModel: "Der Tisch steht an der Wand. Auf dem Tisch liegt ein Buch. Stell die Lampe neben das Sofa und leg das Handy auf den Tisch." },
      culture: ["Shared apartments and kitchens", "A shared apartment is called a Wohngemeinschaft, often shortened to WG. Some rental apartments are offered without a fitted kitchen.", "Deutschland.de", "https://www.deutschland.de/en/topic/life/way-of-life-germany-cellar-cleaning-week-no-kitchen", ["die WG", "die Kaltmiete", "die Küche"]]
    }),

    M({
      id: "a1-plans-and-leisure", level: "A1", code: "A1.5", title: "Plans, invitations, and free time", subtitle: "Invite someone, arrange a meeting, and respond naturally.",
      canDo: ["Invite someone and respond", "Arrange a meeting", "Talk about hobbies and preferences", "Give a simple reason"],
      grammar: [
        ["Yes or no questions", "Place the conjugated verb first when the answer can be yes or no.", "Kommst du am Samstag mit?", "Are you coming along on Saturday?"],
        ["Accusative pronouns", "Use mich, dich, ihn, sie, uns, and euch when the person is the direct object.", "Ich lade dich ein.", "I invite you."],
        ["Preference", "Gern, lieber, and am liebsten express increasing preference.", "Ich gehe gern ins Kino. Ich koche lieber.", "I like going to the cinema. I prefer cooking."]
      ],
      words: [
        ["einladung", "die Einladung, die Einladungen", "invitation", "die Einladung · die Einladungen", "Danke für die Einladung.", "Thanks for the invitation."],
        ["party", "die Party, die Partys", "party", "die Party · die Partys", "Die Party beginnt um acht.", "The party begins at eight."],
        ["konzert", "das Konzert, die Konzerte", "concert", "das Konzert · die Konzerte", "Wir gehen zum Konzert.", "We are going to the concert."],
        ["wochenende", "das Wochenende, die Wochenenden", "weekend", "am Wochenende", "Hast du am Wochenende Zeit?", "Do you have time on the weekend?"],
        ["treffen", "sich treffen", "to meet", "sich treffen · wir treffen uns", "Wir treffen uns vor dem Kino.", "We meet in front of the cinema."],
        ["einladen", "jemanden einladen", "to invite someone", "einladen · ich lade dich ein", "Ich lade dich zu meiner Party ein.", "I invite you to my party."],
        ["mitkommen", "mitkommen", "to come along", "mitkommen · kommst du mit?", "Kommst du morgen mit?", "Are you coming along tomorrow?"],
        ["leider", "leider", "unfortunately", "leider keine Zeit haben", "Leider habe ich keine Zeit.", "Unfortunately I have no time."],
        ["gern", "gern", "gladly / like to", "gern · lieber · am liebsten", "Ja, gern!", "Yes, gladly!"],
        ["zeit-haben", "Zeit haben", "to have time", "Zeit haben · keine Zeit haben", "Am Freitag habe ich Zeit.", "I have time on Friday."]
      ],
      questions: [
        ["come", "QUESTION", "You invite a friend to join on Saturday.", "Ask: Are you coming along on Saturday?", ["Kommst du am Samstag mit?"], "A yes or no question begins with the conjugated verb.", ["mitkommen", "wochenende"]],
        ["invite", "PRONOUN", "You invite a friend to your party.", "Write the sentence.", ["Ich lade dich zu meiner Party ein."], "Dich receives the invitation and ein closes the sentence.", ["einladen", "party"]],
        ["film", "TRANSFER", "You accept an invitation and ask about the start time.", "Write both parts.", ["Ja, gern. Wann beginnt der Film?"], "Gern is a natural short acceptance.", ["gern"]],
        ["decline", "WORD ORDER", "You decline because you have no time.", "Write the German response.", ["Leider habe ich keine Zeit."], "Starting with leider places the verb before the subject.", ["leider", "zeit-haben"]],
        ["meet", "TIME", "The group meets at half past six.", "Write the sentence.", ["Wir treffen uns um halb sieben.", "Wir treffen uns um achtzehn Uhr dreißig."], "Halb sieben means half an hour before seven.", ["treffen"]]
      ],
      input: { script: "Hast du am Freitag Zeit? Ja. Was möchtest du machen? Im Kino läuft ein neuer Film. Er beginnt um Viertel nach acht. Gut. Treffen wir uns um acht vor dem Kino?", listenPrompt: "Wann treffen sie sich?", listenAnswers: ["Sie treffen sich um acht Uhr.", "Um acht Uhr."], passage: "Einladung: Am Samstag feiern wir ab 18 Uhr im Garten. Bitte gib bis Donnerstag Bescheid. Bring gern Salat oder Brot mit. Bei Regen feiern wir im Haus.", readPrompt: "Wo feiern sie bei Regen?", readAnswers: ["Im Haus.", "Bei Regen feiern sie im Haus."] },
      task: { writingPrompt: "Invite a friend to an event. Include day, time, place, one activity, and a request for a reply.", minWords: 40, guide: ["Open with a greeting", "Give every practical detail", "Use a separable verb", "Close naturally"], required: ["am", "um"], model: "Hallo Mia, ich lade dich am Samstag zu meiner Party ein. Wir feiern ab 18 Uhr in meinem Garten. Kommst du mit? Gib mir bitte bis Donnerstag Bescheid. Viele Grüße, Sam", speakingPrompt: "Invite a friend, respond to one possible refusal, and agree on a meeting time.", speakingGuide: ["Name the event", "Give a day and time", "Ask a yes or no question", "Offer another plan"], speakingRequired: ["du", "um"], speakingModel: "Kommst du am Samstag mit ins Kino? Der Film beginnt um acht. Wenn du keine Zeit hast, können wir uns am Sonntag treffen." },
      culture: ["Punctual plans", "Expectations around punctuality depend on the situation. A short message about a delay is useful and considerate.", "Deutschland.de", "https://www.deutschland.de/en/topic/life/a-guide-to-german-etiquette", ["pünktlich", "sich verspäten", "Bescheid sagen"]]
    }),

    M({
      id: "a1-travel-and-services", level: "A1", code: "A1.6", title: "Travel, directions, and everyday problems", subtitle: "Find your way, use local transport, and ask for help.",
      canDo: ["Ask for and understand simple directions", "Read basic station and hotel information", "Travel by local transport", "Describe a straightforward problem"],
      grammar: [
        ["Dative prepositions", "Aus, bei, mit, nach, von, and zu always take the dative.", "Ich fahre mit dem Bus zum Bahnhof.", "I travel by bus to the station."],
        ["Formal imperative", "Use the verb followed by Sie for a polite instruction.", "Gehen Sie geradeaus.", "Go straight ahead."],
        ["City direction", "Use nach with most city names and zu for a person or local destination.", "Wir fahren nach Berlin. Ich gehe zur Haltestelle.", "We travel to Berlin. I go to the stop."]
      ],
      words: [
        ["gleis", "das Gleis, die Gleise", "platform / track", "das Gleis · die Gleise", "Der Zug fährt von Gleis vier ab.", "The train departs from platform four."],
        ["haltestelle", "die Haltestelle, die Haltestellen", "stop", "die Haltestelle · die Haltestellen", "Die Haltestelle ist dort.", "The stop is there."],
        ["fahrkarte", "die Fahrkarte, die Fahrkarten", "ticket", "die Fahrkarte · die Fahrkarten", "Ich brauche eine Fahrkarte.", "I need a ticket."],
        ["fahrplan", "der Fahrplan, die Fahrpläne", "timetable", "der Fahrplan · die Fahrpläne", "Der Fahrplan hängt an der Wand.", "The timetable hangs on the wall."],
        ["verspaetung", "die Verspätung, die Verspätungen", "delay", "zehn Minuten Verspätung", "Der Zug hat Verspätung.", "The train is delayed."],
        ["reservierung", "die Reservierung, die Reservierungen", "reservation", "eine Reservierung haben", "Ich habe eine Reservierung.", "I have a reservation."],
        ["geradeaus", "geradeaus", "straight ahead", "geradeaus · links · rechts", "Gehen Sie geradeaus und dann links.", "Go straight ahead and then left."],
        ["umsteigen", "umsteigen", "to change trains", "umsteigen · ich steige um", "In Bremen müssen Sie umsteigen.", "You have to change in Bremen."],
        ["abfahren", "abfahren", "to depart", "abfahren · der Zug fährt ab", "Der Zug fährt um zehn Uhr ab.", "The train departs at ten."],
        ["helfen", "jemandem helfen", "to help someone", "helfen + dative", "Können Sie mir helfen?", "Can you help me?"]
      ],
      questions: [
        ["station", "POLITE QUESTION", "You need to reach the station.", "Ask politely how to get there.", ["Entschuldigung, wie komme ich zum Bahnhof?"], "Zu dem contracts to zum.", ["haltestelle", "helfen"]],
        ["direction", "IMPERATIVE", "You give a formal direction.", "Say: Go straight and then left.", ["Gehen Sie geradeaus und dann links."], "The formal imperative uses the verb followed by Sie.", ["geradeaus"]],
        ["berlin", "PREPOSITION", "You share tomorrow's destination.", "Say: I am traveling to Berlin tomorrow.", ["Ich fahre morgen nach Berlin.", "Morgen fahre ich nach Berlin."], "Use nach with most city names.", ["abfahren"]],
        ["machine", "NEGATION", "The ticket machine has a problem.", "Say: The ticket machine is not working.", ["Der Fahrkartenautomat funktioniert nicht."], "Nicht negates the verb funktioniert.", ["fahrkarte"]],
        ["help", "DATIVE", "You ask a stranger for help.", "Write the polite question.", ["Können Sie mir helfen?", "Koennen Sie mir helfen?"], "Mir identifies the person receiving help.", ["helfen"]]
      ],
      input: { script: "Achtung auf Gleis vier. Der Zug nach Bremen fährt heute um zehn Uhr zwölf ab. Der Zug hat zehn Minuten Verspätung. Reisende nach Oldenburg steigen in Bremen um.", listenPrompt: "Wo steigen Reisende nach Oldenburg um?", listenAnswers: ["In Bremen.", "Sie steigen in Bremen um."], passage: "Hotel am Markt. Check-in ab 15 Uhr. Frühstück von 7 bis 10 Uhr. Die Rezeption ist bis 22 Uhr geöffnet. Der Bahnhof ist fünf Minuten zu Fuß entfernt.", readPrompt: "Wann beginnt der Check-in?", readAnswers: ["Um fünfzehn Uhr.", "Der Check-in beginnt um fünfzehn Uhr."] },
      task: { writingPrompt: "Write a short message to a hotel. Include your name, arrival day, reservation, and one question.", minWords: 40, guide: ["Use a formal greeting", "Give your arrival information", "Ask one clear question", "Close formally"], required: ["reserv", "frage"], model: "Guten Tag, mein Name ist Sam Lee. Ich habe eine Reservierung für Freitag und komme gegen 18 Uhr an. Ist die Rezeption dann noch geöffnet? Vielen Dank und freundliche Grüße, Sam Lee", speakingPrompt: "Ask for directions to the station and repeat the route back to confirm it.", speakingGuide: ["Open with Entschuldigung", "Ask the route", "Use three direction words", "Thank the person"], speakingRequired: ["bahnhof", "danke"], speakingModel: "Entschuldigung, wie komme ich zum Bahnhof? Also gehe ich geradeaus, dann rechts und bis zur Haltestelle. Vielen Dank." },
      culture: ["Reading a station board", "German station information commonly uses the 24-hour clock. Platform numbers, departure times, changes, and delay notices are high-value travel language.", "Deutsche Bahn", "https://int.bahn.de/en", ["das Gleis", "die Abfahrt", "die Verspätung"]]
    }),

    M({
      id: "a1-health-past-checkpoint", level: "A1", code: "A1.7", title: "Health, weather, and recent events", subtitle: "Describe symptoms, weather, and completed events in the recent past.",
      canDo: ["Describe simple symptoms", "Understand basic health advice", "Talk about a recent event with Perfekt", "Describe the weather and a simple past condition"],
      grammar: [
        ["Perfekt with haben", "Many completed actions use haben plus a past participle.", "Ich habe gestern gearbeitet.", "I worked yesterday."],
        ["Perfekt with sein", "Movement to another place and several changes of state use sein.", "Wir sind nach Hamburg gefahren.", "We traveled to Hamburg."],
        ["War and hatte", "Use war and hatte for frequent past descriptions and possession.", "Gestern war es kalt. Ich hatte Fieber.", "Yesterday it was cold. I had a fever."]
      ],
      words: [
        ["kopf", "der Kopf, die Köpfe", "head", "der Kopf · die Köpfe", "Mein Kopf tut weh.", "My head hurts."],
        ["hals", "der Hals, die Hälse", "throat / neck", "der Hals · die Hälse", "Ich habe Halsschmerzen.", "I have a sore throat."],
        ["fieber", "das Fieber", "fever", "Fieber haben", "David hat Fieber.", "David has a fever."],
        ["husten", "der Husten", "cough", "Husten haben", "Seit gestern habe ich Husten.", "I have had a cough since yesterday."],
        ["arzt", "der Arzt, die Ärzte", "doctor", "der Arzt · die Ärztin", "Ich gehe zum Arzt.", "I am going to the doctor."],
        ["regen", "der Regen", "rain", "der Regen · es regnet", "Heute gibt es viel Regen.", "There is a lot of rain today."],
        ["sonne", "die Sonne", "sun", "die Sonne · sie scheint", "Heute scheint die Sonne.", "The sun is shining today."],
        ["gearbeitet", "arbeiten, hat gearbeitet", "to work", "arbeiten · hat gearbeitet", "Ich habe lange gearbeitet.", "I worked for a long time."],
        ["gefahren", "fahren, ist gefahren", "to travel / drive", "fahren · ist gefahren", "Wir sind nach Hamburg gefahren.", "We traveled to Hamburg."],
        ["war", "war / hatte", "was / had", "sein: war · haben: hatte", "Gestern war ich müde.", "Yesterday I was tired."]
      ],
      questions: [
        ["back", "SYMPTOM", "You describe pain.", "Say: My back hurts.", ["Mein Rücken tut weh.", "Mein Ruecken tut weh."], "Wehtun separates around the affected body part.", ["kopf"]],
        ["worked", "PERFEKT", "You describe yesterday's completed work.", "Say: I worked for a long time yesterday.", ["Ich habe gestern lange gearbeitet."], "Haben is conjugated and gearbeitet closes the sentence.", ["gearbeitet"]],
        ["hamburg", "PERFEKT", "You describe a weekend trip.", "Say: We traveled to Hamburg on the weekend.", ["Wir sind am Wochenende nach Hamburg gefahren."], "Movement to another place uses sein here.", ["gefahren"]],
        ["weather", "CONNECTOR", "You compare yesterday and today.", "Say: Yesterday it was cold, but today the sun is shining.", ["Gestern war es kalt, aber heute scheint die Sonne."], "Aber joins two main clauses and both keep verb-second order.", ["sonne", "war"]],
        ["advice", "IMPERATIVE", "A doctor speaks formally to a patient.", "Say: Stay home today and drink plenty of water.", ["Bleiben Sie heute zu Hause und trinken Sie viel Wasser."], "Formal advice uses the verb followed by Sie.", ["arzt"]]
      ],
      input: { script: "David ist heute zu Hause. Seit gestern hat er Husten und Fieber. Am Montag ist er noch zur Arbeit gefahren, aber am Abend war er sehr müde. Die Ärztin sagt: Bleiben Sie zwei Tage zu Hause und trinken Sie viel Wasser.", listenPrompt: "Warum bleibt David zu Hause?", listenAnswers: ["Er hat Husten und Fieber.", "David ist krank."], passage: "Wetter am Wochenende: Am Samstag war es kalt und windig. Am Sonntag hat die Sonne geschienen. Viele Menschen sind in den Park gegangen. Am Abend hat es kurz geregnet.", readPrompt: "Wie war das Wetter am Sonntag?", readAnswers: ["Die Sonne hat geschienen.", "Am Sonntag hat die Sonne geschienen."] },
      task: { writingPrompt: "Write six sentences about yesterday and today. Include where you were, what you did, the weather, how you feel, and one plan.", minWords: 55, guide: ["Use two Perfekt forms", "Use war or hatte", "Join one pair with aber", "Finish with a plan"], required: ["habe", "war"], model: "Gestern war ich in Hamburg. Ich bin mit dem Zug gefahren und habe eine Freundin besucht. Das Wetter war kalt, aber die Sonne hat geschienen. Heute bin ich müde. Morgen bleibe ich zu Hause.", speakingPrompt: "Tell a short story about your last weekend and say how you feel today.", speakingGuide: ["Use three past actions", "Use war or hatte", "Use one weather phrase", "Add today's condition"], speakingRequired: ["habe", "bin"], speakingModel: "Am Wochenende bin ich nach Hamburg gefahren. Ich habe eine Freundin besucht. Das Wetter war kalt. Heute bin ich müde, aber zufrieden." },
      culture: ["Emergency numbers", "The general European emergency number is 112. The police number in Germany is 110. Routine medical care follows different local channels.", "Goethe-Institut", "https://www.goethe.de/ins/de/en/kur/srd/run/inf.html", ["112", "110", "der Notfall"]]
    })
  ];

  modules.push(
    M({
      id: "a2-erlebnisse", level: "A2", code: "A2.1", title: "What happened?", subtitle: "Tell a connected story about a completed event.",
      canDo: ["Tell someone what happened over a weekend", "Ask follow-up questions about a past event", "Put completed actions in a clear sequence", "Choose haben or sein in Perfekt"],
      grammar: [
        ["Perfekt helper", "Use haben for many activities. Use sein with common movement verbs and changes of state.", "Ich habe meine Oma besucht. Wir sind in den Park gegangen.", "I visited my grandmother. We went to the park."],
        ["Participle shape", "Separable prefixes take ge inside the word. Inseparable prefixes such as be stay attached and usually take no ge.", "aufstehen: aufgestanden · besuchen: besucht", "got up · visited"],
        ["Sequencing", "Zuerst, dann, später, and schließlich show the listener how the events fit together.", "Zuerst bin ich gefahren. Später habe ich gekocht.", "First I traveled. Later I cooked."]
      ],
      words: [
        ["wochenende", "das Wochenende, die Wochenenden", "weekend", "am Wochenende", "Am Wochenende habe ich viel erlebt.", "I experienced a lot on the weekend."],
        ["besuchen", "besuchen, hat besucht", "to visit", "jemanden besuchen", "Ich habe meine Oma besucht.", "I visited my grandmother."],
        ["treffen", "sich treffen, hat sich getroffen", "to meet", "sich mit jemandem treffen", "Wir haben uns im Café getroffen.", "We met in the café."],
        ["fahren", "fahren, ist gefahren", "to travel / drive", "fahren · ist gefahren", "Sie ist nach Bonn gefahren.", "She traveled to Bonn."],
        ["ankommen", "ankommen, ist angekommen", "to arrive", "ankommen · ist angekommen", "Der Zug ist spät angekommen.", "The train arrived late."],
        ["aufstehen", "aufstehen, ist aufgestanden", "to get up", "aufstehen · ist aufgestanden", "Ich bin früh aufgestanden.", "I got up early."],
        ["bleiben", "bleiben, ist geblieben", "to stay", "bleiben · ist geblieben", "Wir sind zu Hause geblieben.", "We stayed home."],
        ["erleben", "erleben, hat erlebt", "to experience", "etwas erleben", "Was hast du erlebt?", "What did you experience?"],
        ["spass", "Spaß haben", "to have fun", "viel Spaß haben", "Wir haben viel Spaß gehabt.", "We had a lot of fun.", ["Spass haben"]],
        ["schliesslich", "schließlich", "finally", "zuerst · dann · später · schließlich", "Schließlich sind wir nach Hause gefahren.", "Finally we went home.", ["schliesslich"]]
      ],
      questions: [
        ["visited", "PERFEKT", "You tell a friend about yesterday.", "Say: I visited my grandmother yesterday.", ["Ich habe gestern meine Großmutter besucht.", "Ich habe gestern meine Oma besucht.", "Ich habe gestern meine Grossmutter besucht."], "Besuchen takes haben. The prefix be stays attached and the participle has no ge.", ["besuchen"]],
        ["park", "CASE AND TENSE", "The next event was a walk to the park.", "Say: Then we went to the park.", ["Dann sind wir in den Park gegangen."], "Movement toward a destination uses sein. In den Park answers wohin.", ["fahren"]],
        ["saturday", "QUESTION", "You ask about a completed Saturday.", "Ask: What did you do on Saturday?", ["Was hast du am Samstag gemacht?"], "The conjugated helper comes early and the participle closes the question.", ["wochenende"]],
        ["got-up", "SEPARABLE VERB", "Your day began at eight.", "Say: I got up at eight.", ["Ich bin um acht Uhr aufgestanden."], "Aufstehen forms the participle aufgestanden and uses sein here.", ["aufstehen"]]
      ],
      input: { script: "Am Samstag bin ich früh aufgestanden. Zuerst bin ich mit dem Zug nach Bonn gefahren. Dort habe ich meine Freundin Mara getroffen. Wir haben einen Markt besucht und später zusammen gekocht.", listenPrompt: "Wen hat die Erzählerin getroffen?", listenAnswers: ["Sie hat ihre Freundin Mara getroffen.", "Ihre Freundin Mara.", "Mara."], passage: "Am Sonntag ist Amir zu Hause geblieben. Zuerst hat er lange gefrühstückt. Dann hat er seine Schwester angerufen. Später sind beide in den Park gegangen. Am Abend haben sie einen Film gesehen.", readPrompt: "Was haben Amir und seine Schwester am Abend gemacht?", readAnswers: ["Sie haben einen Film gesehen.", "Am Abend haben sie einen Film gesehen."] },
      task: { writingPrompt: "Write five to seven sentences about a real or invented weekend.", minWords: 60, guide: ["Use one movement verb with sein", "Use one separable verb", "Use three sequence words", "Keep the participle at the end"], required: ["zuerst", "dann"], model: "Am Samstag bin ich früh aufgestanden. Zuerst bin ich nach Bonn gefahren. Dort habe ich eine Freundin besucht. Dann haben wir gekocht. Später sind wir in den Park gegangen. Schließlich bin ich nach Hause gefahren.", speakingPrompt: "Tell a one-minute weekend story and answer one follow-up question.", speakingGuide: ["Set the time", "Give four completed actions", "Use sequence words", "End with how you felt"], speakingRequired: ["habe", "bin"], speakingModel: "Am Wochenende bin ich nach Bonn gefahren. Zuerst habe ich Mara getroffen. Dann haben wir einen Markt besucht. Später haben wir gekocht. Am Ende war ich müde und zufrieden." },
      culture: ["Local celebrations", "Weekend plans and seasonal festivals vary widely across German-speaking regions. Local names and customs make useful conversation topics.", "Goethe-Institut", "https://www.goethe.de/prj/dlp/de/unterrichtsmaterial/reihe/feste_feiern_in_deutschland", ["das Fest", "der Markt", "die Region"]]
    }),

    M({
      id: "a2-wohnung-raum", level: "A2", code: "A2.2", title: "Where does it go?", subtitle: "Control two-way prepositions through location and movement.",
      canDo: ["Describe a room clearly", "Say where an object is located", "Tell someone where to put an object", "Explain a simple move"],
      grammar: [
        ["Wo uses dative", "A fixed location after in, an, auf, neben, über, unter, vor, or hinter uses the dative.", "Die Lampe steht neben dem Sofa.", "The lamp stands next to the sofa."],
        ["Wohin uses accusative", "A destination after a two-way preposition uses the accusative.", "Stell die Lampe neben das Sofa.", "Put the lamp next to the sofa."],
        ["Position verb pairs", "Stehen and liegen describe location. Stellen and legen describe moving an object into a position.", "Das Buch liegt dort. Ich lege es ins Regal.", "The book lies there. I put it into the shelf."]
      ],
      words: [
        ["wohnung", "die Wohnung, die Wohnungen", "apartment", "die Wohnung · die Wohnungen", "Lea zieht in eine neue Wohnung.", "Lea is moving into a new apartment."],
        ["regal", "das Regal, die Regale", "shelf", "das Regal · die Regale", "Die Bücher stehen im Regal.", "The books stand on the shelf."],
        ["schrank", "der Schrank, die Schränke", "cabinet", "der Schrank · die Schränke", "Der Schrank steht an der Wand.", "The cabinet stands by the wall."],
        ["wand", "die Wand, die Wände", "wall", "die Wand · die Wände", "Das Bild hängt an der Wand.", "The picture hangs on the wall."],
        ["ecke", "die Ecke, die Ecken", "corner", "in der Ecke", "Der Tisch steht in der Ecke.", "The table stands in the corner."],
        ["stellen", "stellen / stehen", "place upright / stand", "stellen: wohin · stehen: wo", "Sie stellt die Lampe neben das Sofa.", "She puts the lamp next to the sofa."],
        ["legen", "legen / liegen", "lay / lie", "legen: wohin · liegen: wo", "Er legt das Buch auf den Tisch.", "He lays the book on the table."],
        ["haengen", "hängen", "to hang", "an die Wand hängen · an der Wand hängen", "Wir hängen das Bild an die Wand.", "We hang the picture on the wall.", ["haengen"]],
        ["kiste", "die Kiste, die Kisten", "box / crate", "die Kiste · die Kisten", "Die Bücher liegen in einer Kiste.", "The books lie in a box."],
        ["umziehen", "umziehen, ist umgezogen", "to move home", "umziehen · ist umgezogen", "Wir sind im Mai umgezogen.", "We moved in May."]
      ],
      questions: [
        ["lamp-move", "DESTINATION", "You give a direct instruction during a move.", "Put the lamp next to the sofa.", ["Stell die Lampe neben das Sofa.", "Stelle die Lampe neben das Sofa."], "The lamp changes position, so neben takes the accusative.", ["stellen"]],
        ["lamp-place", "LOCATION", "The lamp is already in place.", "Say: The lamp is next to the sofa.", ["Die Lampe steht neben dem Sofa."], "The sentence describes a fixed location, so neben takes the dative.", ["stellen"]],
        ["picture-move", "DESTINATION", "You move a picture to the wall.", "Say: We hang the picture on the wall.", ["Wir hängen das Bild an die Wand.", "Wir haengen das Bild an die Wand."], "An die Wand describes a destination.", ["haengen", "wand"]],
        ["picture-place", "LOCATION", "The picture is already there.", "Say: The picture is hanging on the wall.", ["Das Bild hängt an der Wand.", "Das Bild haengt an der Wand."], "An der Wand describes a fixed location.", ["haengen", "wand"]]
      ],
      input: { script: "Lea zieht am Freitag um. Das Sofa steht schon im Wohnzimmer. Sie stellt die Lampe neben das Sofa und hängt zwei Bilder an die Wand. Morgen stellt sie die Bücher ins Regal.", listenPrompt: "Wohin hängt Lea die Bilder?", listenAnswers: ["An die Wand.", "Sie hängt die Bilder an die Wand."], passage: "Im Arbeitszimmer steht der Schreibtisch am Fenster. Über dem Schreibtisch hängt ein Regal. Der Drucker steht im Regal. Eine Kiste liegt unter dem Tisch.", readPrompt: "Wo liegt die Kiste?", readAnswers: ["Unter dem Tisch.", "Die Kiste liegt unter dem Tisch."] },
      task: { writingPrompt: "Describe one room in four location sentences. Then move two objects and describe both destinations.", minWords: 55, guide: ["Use four dative locations", "Use two accusative destinations", "Choose stehen, liegen, stellen, or legen precisely"], required: ["dem", "den"], model: "Der Tisch steht am Fenster. Auf dem Tisch liegt ein Buch. Die Lampe steht neben dem Sofa. Ein Bild hängt an der Wand. Ich stelle die Lampe auf den Tisch und lege das Buch ins Regal.", speakingPrompt: "Guide a friend while arranging a room.", speakingGuide: ["Describe two current locations", "Give three movement instructions", "Use at least three two-way prepositions"], speakingRequired: ["dem", "die"], speakingModel: "Der Tisch steht an der Wand. Stell die Lampe neben das Sofa. Leg das Buch auf den Tisch und häng das Bild an die Wand." },
      culture: ["Reading rental costs", "German rental listings commonly distinguish Kaltmiete from Warmmiete. Electricity is often arranged separately.", "Make it in Germany", "https://www.make-it-in-germany.com/en/living-in-germany/housing-mobility/housing-registration", ["die Kaltmiete", "die Warmmiete", "die Nebenkosten"]]
    }),

    M({
      id: "a2-termine-plaene", level: "A2", code: "A2.3", title: "Does Friday work?", subtitle: "Arrange, move, and confirm appointments with clear conditions.",
      canDo: ["Arrange and move an appointment", "Explain a delay", "Confirm a future plan politely", "Use a condition to plan ahead"],
      grammar: [
        ["Present for a firm plan", "German often uses the present tense with a clear future time.", "Morgen rufe ich an.", "I will call tomorrow."],
        ["Future with werden", "Werden plus infinitive can make the future explicit or express a prediction.", "Ich werde dir Bescheid sagen.", "I will let you know."],
        ["Wenn clause", "The conjugated verb closes the wenn clause. When the clause comes first, the main-clause verb follows the comma.", "Wenn ich mich verspäte, rufe ich an.", "If I am late, I will call."]
      ],
      words: [
        ["termin", "der Termin, die Termine", "appointment", "einen Termin haben", "Der Termin ist am Freitag.", "The appointment is on Friday."],
        ["vereinbaren", "einen Termin vereinbaren", "arrange an appointment", "vereinbaren · hat vereinbart", "Wir vereinbaren einen Termin.", "We arrange an appointment."],
        ["absagen", "einen Termin absagen", "cancel an appointment", "absagen · hat abgesagt", "Ich muss den Termin absagen.", "I have to cancel the appointment."],
        ["verschieben", "einen Termin verschieben", "move an appointment", "verschieben · hat verschoben", "Können wir den Termin verschieben?", "Can we move the appointment?"],
        ["passen", "jemandem passen", "to suit someone", "passen + dative", "Passt dir Freitag?", "Does Friday suit you?"],
        ["bescheid", "jemandem Bescheid sagen", "let someone know", "Bescheid sagen", "Ich sage dir morgen Bescheid.", "I will let you know tomorrow."],
        ["verspaeten", "sich verspäten", "to be late", "ich verspäte mich", "Ich verspäte mich um zehn Minuten.", "I am ten minutes late."],
        ["puenktlich", "pünktlich", "on time", "pünktlich sein", "Der Zug ist pünktlich.", "The train is on time."],
        ["kalender", "der Kalender, die Kalender", "calendar", "im Kalender stehen", "Der Termin steht im Kalender.", "The appointment is in the calendar."],
        ["koennten", "könnten", "could", "Könnten wir ...?", "Könnten wir uns später treffen?", "Could we meet later?", ["koennten"]]
      ],
      questions: [
        ["move", "POLITE REQUEST", "The current day no longer works.", "Ask: Can we move the appointment to Friday?", ["Können wir den Termin auf Freitag verschieben?", "Könnten wir den Termin auf Freitag verschieben?", "Koennen wir den Termin auf Freitag verschieben?", "Koennten wir den Termin auf Freitag verschieben?"], "Auf Freitag gives the new date. Könnten makes the request softer.", ["verschieben", "koennten"]],
        ["doesnt-fit", "DATIVE", "You politely reject the proposed time.", "Say: Unfortunately, the appointment does not work for me.", ["Der Termin passt mir leider nicht."], "Passen takes the dative, so the pronoun is mir.", ["termin", "passen"]],
        ["late", "CONDITION", "You promise to communicate a delay.", "Say: If I am late, I will let you know.", ["Wenn ich mich verspäte, sage ich dir Bescheid.", "Wenn ich mich verspäte, werde ich dir Bescheid sagen.", "Wenn ich mich verspaete, sage ich dir Bescheid."], "The verb closes the wenn clause. The main-clause verb follows the comma.", ["verspaeten", "bescheid"]],
        ["call", "FUTURE", "You promise a call tomorrow.", "Write one natural German sentence.", ["Ich werde morgen anrufen.", "Morgen rufe ich an.", "Ich rufe morgen an."], "The present tense works with a clear future time. Werden is also possible.", ["bescheid"]]
      ],
      input: { script: "Guten Tag, Frau Kaya. Hier ist Daniel Vogt. Unser Termin am Dienstag um zehn Uhr muss leider verschoben werden. Hätten Sie am Mittwoch um vierzehn Uhr Zeit? Bitte rufen Sie mich kurz zurück.", listenPrompt: "Welcher neue Termin wird vorgeschlagen?", listenAnswers: ["Mittwoch um vierzehn Uhr.", "Am Mittwoch um vierzehn Uhr."], passage: "Kalender: Montag, 9 Uhr Zahnarzt. Dienstag, 15 Uhr Deutschkurs. Mittwoch frei. Donnerstag, 10 Uhr Teamtreffen. Der Zahnarzttermin wurde auf Mittwoch um 11 Uhr verschoben.", readPrompt: "Wann ist der neue Zahnarzttermin?", readAnswers: ["Am Mittwoch um elf Uhr.", "Mittwoch um elf Uhr."] },
      task: { writingPrompt: "Write a message that cancels an appointment, gives a reason, proposes two new times, and asks for confirmation.", minWords: 65, guide: ["Name the original appointment", "Give one brief reason", "Offer two precise alternatives", "Ask for a reply"], required: ["termin", "zeit"], model: "Guten Tag Frau Kaya, leider muss ich unseren Termin am Dienstag absagen, weil ich krank bin. Könnten wir uns am Mittwoch um 14 Uhr oder am Donnerstag um 10 Uhr treffen? Bitte sagen Sie mir kurz Bescheid. Freundliche Grüße, Daniel Vogt", speakingPrompt: "Call to move an appointment and agree on a new time.", speakingGuide: ["Identify yourself", "Name the original time", "Give a reason", "Offer two alternatives", "Confirm the result"], speakingRequired: ["termin", "uhr"], speakingModel: "Guten Tag, hier ist Daniel Vogt. Ich muss den Termin am Dienstag verschieben. Passt Ihnen Mittwoch um vierzehn Uhr? Gut, dann sehen wir uns am Mittwoch." },
      culture: ["A brief delay message", "Punctuality is often treated as respect for another person's time. Expectations still differ by setting and group. A short delay message is useful.", "Goethe-Institut", "https://www.goethe.de/prj/dlp/en/teachingmaterials/series/deutschlandlabor_everyday_life_in_germany/16_deutschlandlabor_everyday_life_in_germany_mentality", ["pünktlich", "zehn Minuten später", "Bescheid sagen"]]
    }),

    M({
      id: "a2-gesundheit", level: "A2", code: "A2.4", title: "How do you feel?", subtitle: "Describe symptoms, arrange care, and give simple advice.",
      canDo: ["Describe common symptoms", "Ask for a medical appointment", "Give simple health advice", "Understand routine and urgent care language"],
      grammar: [
        ["Reflexive verbs", "The reflexive pronoun refers back to the subject. With du, use dich. With ich, use mich.", "Du solltest dich ausruhen.", "You should rest."],
        ["Reason with weil", "Weil introduces a reason and sends the conjugated verb to the end.", "Ich gehe zum Arzt, weil ich Fieber habe.", "I am going to the doctor because I have a fever."],
        ["Advice with sollte", "Sollte gives considerate advice. The main action remains an infinitive at the end.", "Du solltest viel trinken.", "You should drink a lot."]
      ],
      words: [
        ["schmerzen", "die Schmerzen", "pain", "Schmerzen haben", "Ich habe starke Schmerzen.", "I have severe pain."],
        ["wehtun", "wehtun", "to hurt", "etwas tut weh", "Mein Rücken tut weh.", "My back hurts."],
        ["kopfschmerzen", "Kopfschmerzen haben", "have a headache", "die Kopfschmerzen · plural", "Seit gestern habe ich Kopfschmerzen.", "I have had a headache since yesterday."],
        ["ausruhen", "sich ausruhen", "to rest", "sich ausruhen · ich ruhe mich aus", "Du solltest dich ausruhen.", "You should rest."],
        ["fuehlen", "sich fühlen", "to feel", "sich fühlen · ich fühle mich", "Wie fühlen Sie sich?", "How do you feel?", ["sich fuehlen"]],
        ["erkaeltet", "erkältet sein", "to have a cold", "erkältet sein", "Ich bin stark erkältet.", "I have a bad cold.", ["erkaeltet"]],
        ["fieber", "das Fieber", "fever", "Fieber haben", "Das Kind hat Fieber.", "The child has a fever."],
        ["rezept", "das Rezept, die Rezepte", "prescription", "ein Rezept bekommen", "Die Ärztin gibt mir ein Rezept.", "The doctor gives me a prescription."],
        ["apotheke", "die Apotheke, die Apotheken", "pharmacy", "in die Apotheke gehen", "Ich hole das Medikament in der Apotheke.", "I get the medicine at the pharmacy."],
        ["untersuchung", "die Untersuchung, die Untersuchungen", "examination", "eine Untersuchung machen", "Die Untersuchung dauert zehn Minuten.", "The examination takes ten minutes."]
      ],
      questions: [
        ["head", "SYMPTOM", "You describe a headache.", "Say: My head hurts.", ["Mein Kopf tut weh.", "Ich habe Kopfschmerzen."], "Both expressions are common in this situation.", ["kopfschmerzen", "wehtun"]],
        ["rest", "REFLEXIVE", "You give a friend advice for today.", "Say: You should rest today.", ["Du solltest dich heute ausruhen."], "Sich ausruhen needs the reflexive pronoun dich with du.", ["ausruhen"]],
        ["doctor", "SUBORDINATE CLAUSE", "You explain your decision to seek care.", "Say: I am going to the doctor because I have a fever.", ["Ich gehe zum Arzt, weil ich Fieber habe.", "Ich gehe zur Ärztin, weil ich Fieber habe."], "The conjugated verb closes the weil clause.", ["fieber", "untersuchung"]],
        ["duration", "QUESTION", "You ask when ongoing pain began.", "Ask: How long have you had the pain?", ["Seit wann haben Sie die Schmerzen?", "Seit wann hast du die Schmerzen?"], "Seit wann asks for the starting point of an ongoing condition.", ["schmerzen"]]
      ],
      input: { script: "Guten Morgen. Was fehlt Ihnen? Seit gestern habe ich Halsschmerzen und Fieber. Haben Sie auch Husten? Ja, besonders nachts. Ruhen Sie sich aus und trinken Sie viel.", listenPrompt: "Seit wann hat der Patient Beschwerden?", listenAnswers: ["Seit gestern.", "Er hat seit gestern Beschwerden."], passage: "Praxis Dr. Kern: Sprechstunde Montag bis Freitag von 8 bis 12 Uhr. Akute Beschwerden melden Sie bitte telefonisch an. Außerhalb der Sprechzeiten hilft der ärztliche Bereitschaftsdienst unter 116117.", readPrompt: "Wie soll man akute Beschwerden anmelden?", readAnswers: ["Telefonisch.", "Man soll akute Beschwerden telefonisch anmelden."] },
      task: { writingPrompt: "Write a short patient message with symptoms, duration, one question, and your availability.", minWords: 55, guide: ["Name at least two symptoms", "Use seit with a starting point", "Ask for an appointment", "Use a formal closing"], required: ["seit", "termin"], model: "Guten Tag, seit gestern habe ich Fieber und starke Halsschmerzen. Außerdem huste ich nachts. Könnte ich heute oder morgen einen Termin bekommen? Am Nachmittag bin ich jederzeit erreichbar. Freundliche Grüße, Sam Lee", speakingPrompt: "Complete a four-part doctor conversation.", speakingGuide: ["Open politely", "Describe two symptoms", "Answer a duration question", "Repeat one piece of advice"], speakingRequired: ["seit", "habe"], speakingModel: "Guten Morgen. Seit gestern habe ich Fieber und Husten. Nachts sind die Beschwerden stärker. Ja, ich werde mich ausruhen und viel trinken." },
      culture: ["Medical on-call service", "In Germany, 116117 reaches the medical on-call service for urgent problems outside regular practice hours. Life-threatening emergencies use 112. The 116117 telephone service operates in German.", "116117", "https://www.116117.de/de/englisch.php", ["116117", "112", "der Bereitschaftsdienst"]]
    }),

    M({
      id: "a2-arbeit-lernen", level: "A2", code: "A2.5", title: "Can you explain that?", subtitle: "Ask for help and control dative and accusative objects.",
      canDo: ["Ask a colleague or teacher for help", "Give an object or information to another person", "Describe a work or course routine", "Place two object pronouns naturally"],
      grammar: [
        ["Recipient and thing", "The person receiving something usually takes the dative. The thing transferred takes the accusative.", "Kannst du mir die Aufgabe erklären?", "Can you explain the task to me?"],
        ["Dative verbs", "Helfen always takes the dative. Other common dative verbs include danken, gefallen, and gehören.", "Meine Kollegin hilft mir.", "My colleague helps me."],
        ["Two pronouns", "When both objects are pronouns, the accusative pronoun usually comes before the dative pronoun.", "Ich schicke es ihm.", "I send it to him."]
      ],
      words: [
        ["aufgabe", "die Aufgabe, die Aufgaben", "task", "die Aufgabe · die Aufgaben", "Die Aufgabe ist schwierig.", "The task is difficult."],
        ["kollege", "der Kollege, die Kollegen", "male colleague", "der Kollege · die Kollegin", "Meine Kollegin hilft mir.", "My colleague helps me."],
        ["schicht", "die Schicht, die Schichten", "shift", "die Schicht · die Schichten", "Meine Schicht beginnt um neun.", "My shift begins at nine."],
        ["erklaeren", "jemandem etwas erklären", "to explain something to someone", "erklären + dative + accusative", "Sie erklärt mir die Aufgabe.", "She explains the task to me.", ["erklaeren"]],
        ["helfen", "jemandem helfen", "to help someone", "helfen + dative", "Kannst du mir helfen?", "Can you help me?"],
        ["schicken", "jemandem etwas schicken", "to send someone something", "schicken + dative + accusative", "Ich schicke dir den Bericht.", "I send you the report."],
        ["kurs", "der Kurs, die Kurse", "course", "an einem Kurs teilnehmen", "Ich nehme an einem Kurs teil.", "I take part in a course."],
        ["bericht", "der Bericht, die Berichte", "report", "einen Bericht schreiben", "Der Bericht ist fast fertig.", "The report is almost ready."],
        ["teilnehmen", "teilnehmen an", "to participate in", "teilnehmen an + dative", "Wir nehmen an der Schulung teil.", "We take part in the training."],
        ["zeigen", "jemandem etwas zeigen", "to show someone something", "zeigen + dative + accusative", "Frau Becker zeigt ihm das Büro.", "Ms. Becker shows him the office."]
      ],
      questions: [
        ["explain", "TWO OBJECTS", "You ask a colleague for clarification.", "Ask: Can you explain the task to me?", ["Kannst du mir die Aufgabe erklären?", "Können Sie mir die Aufgabe erklären?", "Kannst du mir die Aufgabe erklaeren?"], "The recipient is dative mir. The task is accusative.", ["aufgabe", "erklaeren"]],
        ["send-it", "PRONOUN ORDER", "A man needs the document today.", "Say: I will send it to him today.", ["Ich schicke es ihm heute.", "Ich werde es ihm heute schicken."], "With two pronouns, accusative es usually comes before dative ihm.", ["schicken"]],
        ["help-report", "DATIVE", "Your colleague assists with a report.", "Say: My colleague helps me with the report.", ["Meine Kollegin hilft mir bei dem Bericht.", "Meine Kollegin hilft mir beim Bericht.", "Mein Kollege hilft mir bei dem Bericht.", "Mein Kollege hilft mir beim Bericht."], "Helfen takes the dative. Beim contracts bei dem.", ["kollege", "helfen", "bericht"]],
        ["key", "CASE", "A manager gives a new employee a key.", "Write the German sentence.", ["Der Chef gibt dem neuen Mitarbeiter einen Schlüssel.", "Die Chefin gibt dem neuen Mitarbeiter einen Schlüssel.", "Der Chef gibt dem neuen Mitarbeiter einen Schluessel."], "The recipient is dative and the key is accusative.", ["zeigen"]]
      ],
      input: { script: "Willkommen im Team, Jonas. Deine Schicht beginnt heute um neun Uhr. Frau Becker zeigt dir zuerst das Büro und erklärt dir die wichtigsten Aufgaben. Wenn du eine Frage hast, hilft dir Frau Becker gern.", listenPrompt: "Wer erklärt Jonas die Aufgaben?", listenAnswers: ["Frau Becker.", "Frau Becker erklärt Jonas die Aufgaben."], passage: "Deutschkurs B1: Dienstag und Donnerstag von 18 bis 20 Uhr. Bitte schicken Sie der Kursleitung vor dem ersten Termin das Anmeldeformular. Das Lehrbuch bekommen Sie im Kurs.", readPrompt: "Was soll man der Kursleitung schicken?", readAnswers: ["Das Anmeldeformular.", "Man soll der Kursleitung das Anmeldeformular schicken."] },
      task: { writingPrompt: "Write a message to a colleague. Ask for help, name the task, say when you need it, and thank the person.", minWords: 55, guide: ["Use a dative recipient", "Name the accusative task or document", "Give a deadline", "Close warmly"], required: ["mir", "danke"], model: "Hallo Lara, könntest du mir bitte den neuen Bericht erklären? Ich verstehe die Tabelle auf Seite drei noch nicht. Ich brauche die Informationen bis Donnerstag. Vielen Dank für deine Hilfe. Viele Grüße, Sam", speakingPrompt: "Ask a colleague for two kinds of help and confirm what will be sent to whom.", speakingGuide: ["Use mir twice", "Name two tasks", "Use schicken or zeigen", "Confirm a deadline"], speakingRequired: ["mir", "dir"], speakingModel: "Kannst du mir die Aufgabe erklären und mir die Datei zeigen? Ich schicke dir danach meinen Bericht. Ich brauche alles bis Freitag." },
      culture: ["Du and Sie at work", "Forms of address vary across workplaces. Some teams use du quickly, while others keep Sie. Follow the form already used in the team.", "Goethe-Institut", "https://www.goethe.de/de/m/spr/ueb/daa/all/ds0/ds4.html", ["du", "Sie", "das Team"]]
    }),

    M({
      id: "a2-unterwegs", level: "A2", code: "A2.6", title: "The train is cancelled", subtitle: "Understand announcements, compare routes, and solve a travel problem.",
      canDo: ["Understand a short delay announcement", "Ask where to change trains", "Compare two routes", "Explain a simple travel problem"],
      grammar: [
        ["Comparative", "Add -er to many adjectives and use als for an unequal comparison.", "Diese Verbindung ist schneller als die andere.", "This connection is faster than the other one."],
        ["Result connector", "Deshalb occupies position one and the conjugated verb follows immediately.", "Der Bus fällt aus, deshalb nehmen wir die U-Bahn.", "The bus is cancelled, so we take the subway."],
        ["Travel sentence bracket", "Separable verbs place their prefix at the end. With a modal verb, the full infinitive stays at the end.", "Wo muss ich umsteigen?", "Where do I have to change?" ]
      ],
      words: [
        ["verspaetung", "die Verspätung, die Verspätungen", "delay", "Verspätung haben", "Der Zug hat zwanzig Minuten Verspätung.", "The train is twenty minutes late."],
        ["ausfallen", "ausfallen, ist ausgefallen", "to be cancelled", "ausfallen · fällt aus", "Der Regionalzug fällt aus.", "The regional train is cancelled."],
        ["umsteigen", "umsteigen, ist umgestiegen", "to change trains", "in Bamberg umsteigen", "In Bamberg müssen wir umsteigen.", "We have to change in Bamberg."],
        ["gleis", "das Gleis, die Gleise", "platform / track", "von Gleis neun abfahren", "Der Zug fährt von Gleis neun ab.", "The train leaves from platform nine."],
        ["verbindung", "die Verbindung, die Verbindungen", "connection / route", "eine direkte Verbindung", "Diese Verbindung ist schneller.", "This connection is faster."],
        ["reservieren", "reservieren", "to reserve", "einen Platz reservieren", "Ich habe einen Sitzplatz reserviert.", "I reserved a seat."],
        ["weiterfahren", "weiterfahren, ist weitergefahren", "to continue traveling", "weiterfahren · fährt weiter", "Wir fahren mit der U-Bahn weiter.", "We continue by subway."],
        ["frueher", "früher", "earlier", "früher · später", "Der frühere Zug ist schneller.", "The earlier train is faster.", ["frueher"]],
        ["bequemer", "bequemer", "more comfortable", "bequem · bequemer · am bequemsten", "Die direkte Verbindung ist bequemer.", "The direct connection is more comfortable."],
        ["deshalb", "deshalb", "therefore / so", "Satz. Deshalb + Verb", "Der Bus fällt aus. Deshalb gehen wir zu Fuß.", "The bus is cancelled. So we walk."]
      ],
      questions: [
        ["delay", "TRAVEL REPORT", "You report the current delay.", "Say: The train is twenty minutes late.", ["Der Zug hat zwanzig Minuten Verspätung.", "Der Zug verspätet sich um zwanzig Minuten."], "Both patterns are common in announcements and conversation.", ["verspaetung"]],
        ["faster", "COMPARISON", "You compare two route options.", "Say: This connection is faster than the other one.", ["Diese Verbindung ist schneller als die andere."], "Unequal comparisons use als.", ["verbindung"]],
        ["cancelled", "CONNECTOR", "The bus is cancelled and you choose the subway.", "Write the complete German sentence.", ["Der Bus fällt aus, deshalb nehmen wir die U-Bahn."], "After deshalb, the conjugated verb comes immediately.", ["ausfallen", "deshalb"]],
        ["change", "QUESTION", "You need the transfer station.", "Ask: Where do I have to change trains?", ["Wo muss ich umsteigen?"], "The modal verb comes early and the infinitive closes the question.", ["umsteigen"]]
      ],
      input: { script: "Achtung auf Gleis sieben. Der Regionalexpress nach Nürnberg fällt heute aus. Reisende nach Nürnberg fahren bitte mit dem Zug um sechzehn Uhr zweiundvierzig von Gleis neun. In Bamberg müssen Sie umsteigen.", listenPrompt: "Wo müssen die Reisenden umsteigen?", listenAnswers: ["In Bamberg.", "Sie müssen in Bamberg umsteigen."], passage: "Route A dauert zwei Stunden und hat keinen Umstieg. Route B ist zwanzig Minuten schneller, aber man muss zweimal umsteigen. Route C ist am günstigsten und fährt erst am Abend.", readPrompt: "Welche Route hat keinen Umstieg?", readAnswers: ["Route A.", "Route A hat keinen Umstieg."] },
      task: { writingPrompt: "Compare two routes using duration, transfers, price, and comfort. Choose one and give two reasons.", minWords: 70, guide: ["Use two comparatives", "Use als correctly", "Use deshalb or trotzdem", "State a final choice"], required: ["als", "verbindung"], model: "Route A ist zwanzig Minuten langsamer als Route B, aber sie ist bequemer. Man muss nicht umsteigen. Route B ist günstiger, trotzdem wähle ich Route A. Die direkte Verbindung ist für mich ruhiger.", speakingPrompt: "Explain a cancelled train and choose a new route at an information desk.", speakingGuide: ["Name the cancelled train", "Ask where to change", "Compare two options", "Confirm your choice"], speakingRequired: ["aus", "umsteigen"], speakingModel: "Mein Zug fällt aus. Wo muss ich mit der nächsten Verbindung umsteigen? Ist die Verbindung über Bamberg schneller? Dann nehme ich diesen Zug." },
      culture: ["Compact station language", "Station announcements use compact phrases such as fällt aus, verspätet sich, and Abfahrt von Gleis. Learning these chunks speeds up real listening.", "Deutsche Bahn", "https://int.bahn.de/en", ["fällt aus", "das Gleis", "umsteigen"]]
    }),

    M({
      id: "a2-einkaufen-service", level: "A2", code: "A2.7", title: "I am looking for a warm sweater", subtitle: "Describe products and control adjective endings in service encounters.",
      canDo: ["Describe a product precisely", "Ask for a size or recommendation", "Exchange an item politely", "Understand a short product notice"],
      grammar: [
        ["After an indefinite article", "In the accusative masculine, ein becomes einen and the adjective ends in -en.", "Ich suche einen warmen Pullover.", "I am looking for a warm sweater."],
        ["After a definite article", "After der, die, das, and their case forms, adjectives usually take -e or -en.", "Haben Sie die schwarze Jacke?", "Do you have the black jacket?"],
        ["Dative adjective", "After a dative article, the adjective ends in -en.", "mit der neuen Karte", "with the new card"]
      ],
      words: [
        ["frisch", "frisch", "fresh", "frisches Brot", "Ich kaufe frisches Brot.", "I buy fresh bread."],
        ["gebraucht", "gebraucht", "used", "ein gebrauchtes Fahrrad", "Sie sucht ein gebrauchtes Fahrrad.", "She is looking for a used bicycle."],
        ["guenstig", "günstig", "affordable", "ein günstiger Preis", "Das Angebot ist günstig.", "The offer is affordable.", ["guenstig"]],
        ["groesse", "die Größe, die Größen", "size", "in Größe M", "Haben Sie die Jacke in Größe M?", "Do you have the jacket in size M?", ["die Groesse"]],
        ["umtausch", "der Umtausch", "exchange", "der Umtausch · etwas umtauschen", "Der Umtausch ist möglich.", "An exchange is possible."],
        ["kassenbon", "der Kassenbon, die Kassenbons", "receipt", "den Kassenbon mitbringen", "Bitte bringen Sie den Kassenbon mit.", "Please bring the receipt."],
        ["passen", "passen", "to fit / suit", "jemandem passen", "Die Jacke passt mir gut.", "The jacket fits me well."],
        ["anprobieren", "anprobieren", "to try on", "etwas anprobieren", "Kann ich den Pullover anprobieren?", "Can I try on the sweater?"],
        ["empfehlen", "jemandem etwas empfehlen", "to recommend", "empfehlen + dative", "Welche Jacke empfehlen Sie mir?", "Which jacket do you recommend to me?"],
        ["artikel", "der Artikel, die Artikel", "item / article", "diesen Artikel", "Ich möchte diesen Artikel umtauschen.", "I would like to exchange this item."]
      ],
      questions: [
        ["sweater", "ADJECTIVE ENDING", "You describe the item you need.", "Say: I am looking for a warm sweater.", ["Ich suche einen warmen Pullover."], "After einen, the accusative masculine adjective ends in -en.", ["groesse"]],
        ["jacket", "ADJECTIVE ENDING", "You ask about a specific black jacket.", "Ask: Do you have the black jacket in size M?", ["Haben Sie die schwarze Jacke in Größe M?", "Haben Sie die schwarze Jacke in Groesse M?"], "After definite die, the adjective ends in -e.", ["groesse"]],
        ["card", "DATIVE", "You ask about payment with a new card.", "Ask: Can I pay with the new card?", ["Kann ich mit der neuen Karte bezahlen?"], "Mit always takes the dative. The adjective ends in -en.", ["guenstig"]],
        ["exchange", "DEMONSTRATIVE", "You want a service employee to exchange the item.", "Say: I would like to exchange this item.", ["Ich möchte diesen Artikel umtauschen.", "Ich moechte diesen Artikel umtauschen."], "Artikel is masculine and accusative here, so dieser becomes diesen.", ["artikel", "umtausch"]]
      ],
      input: { script: "Guten Tag. Ich suche eine warme Jacke in Größe M. Möchten Sie die schwarze Jacke anprobieren? Ja, gern. Sie passt gut, aber ist sie auch in Blau da?", listenPrompt: "Welche Größe sucht die Kundin?", listenAnswers: ["Größe M.", "Sie sucht Größe M.", "Groesse M."], passage: "Winterjacke, dunkelblau, Größe M. Die Jacke ist fast neu und sehr warm. Sie kostet 45 Euro. Eine Anprobe ist am Samstag möglich. Bitte schreiben Sie vorher eine Nachricht.", readPrompt: "Wann kann man die Jacke anprobieren?", readAnswers: ["Am Samstag.", "Man kann die Jacke am Samstag anprobieren."] },
      task: { writingPrompt: "Write a customer-service message about an exchange. Identify the item, describe the problem, mention the receipt, and request a solution.", minWords: 70, guide: ["Use two adjective endings", "Use diesen or diese", "State the practical problem", "Ask for a clear action"], required: ["kassenbon", "umtausch"], model: "Guten Tag, ich möchte diesen schwarzen Pullover umtauschen. Er ist in Größe M, aber er ist mir zu klein. Den Kassenbon habe ich noch. Könnte ich einen größeren Pullover bekommen? Vielen Dank für Ihre Hilfe.", speakingPrompt: "Ask for an item, try it on, describe the fit, and request another color or size.", speakingGuide: ["Use one indefinite article with an adjective", "Use one definite article with an adjective", "Say whether it fits", "Request an alternative"], speakingRequired: ["groesse", "passt"], speakingModel: "Ich suche einen warmen Pullover in Größe M. Kann ich den blauen Pullover anprobieren? Er passt gut. Haben Sie den gleichen Pullover auch in Schwarz?" },
      culture: ["Bottle deposits", "Many beverage containers carry a deposit called Pfand. Shops commonly use return machines that print a receipt for the checkout.", "German Environment Agency", "https://www.umweltbundesamt.de/themen/abfall-ressourcen/produktverantwortung-in-der-abfallwirtschaft/verpackungen/fragen-antworten-verpackungen-verpackungsabfaelle", ["das Pfand", "der Pfandbon", "Mehrweg"]]
    }),

    M({
      id: "a2-einladen-meinen", level: "A2", code: "A2.8", title: "Come along", subtitle: "Invite, explain, and connect ideas with subordinate clauses.",
      canDo: ["Invite someone and respond", "Give a simple opinion", "Explain a reason", "Describe what happens under a condition"],
      grammar: [
        ["Dass clause", "Dass introduces reported thought or content and sends the conjugated verb to the end.", "Ich glaube, dass der Film um acht beginnt.", "I think that the film begins at eight."],
        ["Weil clause", "Weil gives a reason and places the conjugated verb at the end.", "Ich komme später, weil ich arbeiten muss.", "I am coming later because I have to work."],
        ["Wenn condition", "Wenn introduces a condition. When it comes first, the main-clause verb follows the comma.", "Wenn es regnet, feiern wir zu Hause.", "If it rains, we celebrate at home."]
      ],
      words: [
        ["einladen", "jemanden einladen", "to invite someone", "einladen · hat eingeladen", "Mila lädt Sami ein.", "Mila invites Sami."],
        ["zusagen", "zusagen", "to accept", "zusagen · hat zugesagt", "Ich habe sofort zugesagt.", "I accepted right away."],
        ["absagen", "absagen", "to decline / cancel", "absagen · hat abgesagt", "Leider muss ich absagen.", "Unfortunately I have to decline."],
        ["freuen", "sich auf etwas freuen", "to look forward to", "sich freuen auf + accusative", "Ich freue mich auf Samstag.", "I am looking forward to Saturday."],
        ["meinung", "die Meinung, die Meinungen", "opinion", "meiner Meinung nach", "Meiner Meinung nach ist der Film gut.", "In my opinion, the film is good."],
        ["glauben", "glauben", "to believe / think", "glauben, dass", "Ich glaube, dass er kommt.", "I think that he is coming."],
        ["hoffen", "hoffen", "to hope", "hoffen, dass", "Wir hoffen, dass das Wetter gut ist.", "We hope that the weather is good."],
        ["gemeinsam", "gemeinsam", "together", "etwas gemeinsam machen", "Wir kochen gemeinsam.", "We cook together."],
        ["vielleicht", "vielleicht", "perhaps", "vielleicht später", "Vielleicht komme ich später.", "Perhaps I will come later."],
        ["bescheid", "Bescheid geben", "let someone know", "jemandem Bescheid geben", "Gib mir bitte Bescheid.", "Please let me know."]
      ],
      questions: [
        ["film", "DASS CLAUSE", "You share your expectation about the film.", "Say: I think that the film starts at eight.", ["Ich glaube, dass der Film um acht Uhr beginnt."], "The conjugated verb ends the dass clause.", ["glauben"]],
        ["later", "WEIL CLAUSE", "Work delays your arrival.", "Say: I am coming later because I still have to work.", ["Ich komme später, weil ich noch arbeiten muss."], "The modal verb closes the weil clause.", ["vielleicht"]],
        ["weather", "CONDITION", "Good weather leads to a park barbecue.", "Say: If the weather is good, we will grill in the park.", ["Wenn das Wetter gut ist, grillen wir im Park.", "Wenn das Wetter gut ist, werden wir im Park grillen."], "The wenn clause fills position one, so the main-clause verb follows the comma.", ["hoffen"]],
        ["look-forward", "INFINITIVE", "You close an invitation reply warmly.", "Say: I am looking forward to seeing you.", ["Ich freue mich darauf, dich zu sehen.", "Ich freue mich, dich zu sehen."], "Darauf can point forward to the infinitive phrase.", ["freuen"]]
      ],
      input: { script: "Ich feiere am Samstag meinen Geburtstag im Park. Kommst du? Sehr gern. Ich muss bis drei Uhr arbeiten, deshalb komme ich etwas später. Wenn es regnet, feiern wir bei mir zu Hause.", listenPrompt: "Was passiert, wenn es regnet?", listenAnswers: ["Sie feiern zu Hause.", "Sie feiern bei Mila zu Hause."], passage: "Hallo Sami, danke für die Einladung. Ich komme gern, weil ich am Samstag frei habe. Ich glaube, dass ich gegen vier Uhr da bin. Soll ich Brot oder Salat mitbringen? Ich freue mich auf die Feier.", readPrompt: "Warum kommt Sami gern?", readAnswers: ["Weil er am Samstag frei hat.", "Er kommt gern, weil er am Samstag frei hat."] },
      task: { writingPrompt: "Reply to an invitation. Accept or decline, explain why, ask one practical question, and offer to bring something.", minWords: 70, guide: ["Use weil or dass", "Use one conditional sentence", "Ask a practical question", "Close warmly"], required: ["weil", "wenn"], model: "Hallo Mila, danke für die Einladung. Ich komme gern, weil ich am Samstag frei habe. Wenn das Wetter gut ist, bin ich gegen vier Uhr im Park. Soll ich Brot oder Salat mitbringen? Ich freue mich auf die Feier. Liebe Grüße, Sami", speakingPrompt: "Invite a friend, explain the plan, and react to a possible weather problem.", speakingGuide: ["Give day, time, and place", "Use a reason", "Use a wenn condition", "Ask for a reply"], speakingRequired: ["weil", "wenn"], speakingModel: "Ich lade dich am Samstag in den Park ein. Wir feiern dort, weil das Wetter gut sein soll. Wenn es regnet, gehen wir zu mir. Gib mir bitte Bescheid." },
      culture: ["What should I bring?", "Celebrations across Germany, Austria, Switzerland, and Liechtenstein share some traditions and also show strong regional variation. Asking the host what to bring is a useful exchange.", "Goethe-Institut", "https://www.goethe.de/prj/dlp/de/unterrichtsmaterial/reihe/feste_feiern_in_deutschland", ["mitbringen", "die Einladung", "die Feier"]]
    })
  );

  modules.push(
    M({
      id: "b1-erzaehlen", level: "B1", code: "B1.1", title: "When everything changed", subtitle: "Tell a connected story with background, sequence, and an earlier past.",
      canDo: ["Tell a connected story", "Separate background from completed events", "Show which past event happened first", "Ask and answer follow-up questions"],
      grammar: [
        ["Narrative past", "Written stories often use Präteritum. Conversation commonly uses Perfekt, while war, hatte, and modal verbs often stay in Präteritum.", "Früher wohnte ich in Köln. Dann bin ich umgezogen.", "I used to live in Cologne. Then I moved."],
        ["Earlier past", "Plusquamperfekt uses hatte or war with a participle to mark an event that happened before another past event.", "Ich hatte den Zug verpasst.", "I had missed the train."],
        ["Time clauses", "Nachdem marks the earlier action. Während marks overlap. Bevor marks an action that follows its clause.", "Nachdem ich angekommen war, rief ich an.", "After I had arrived, I called."]
      ],
      words: [
        ["ereignis", "das Ereignis, die Ereignisse", "event", "das Ereignis · die Ereignisse", "Das Ereignis hat alles verändert.", "The event changed everything."],
        ["ploetzlich", "plötzlich", "suddenly", "plötzlich passieren", "Plötzlich begann es zu regnen.", "Suddenly it began to rain.", ["ploetzlich"]],
        ["erinnern", "sich an etwas erinnern", "to remember something", "sich erinnern an + accusative", "Ich erinnere mich an den Tag.", "I remember the day."],
        ["bemerken", "etwas bemerken", "to notice something", "bemerken · hat bemerkt", "Nora bemerkte die offene Tür.", "Nora noticed the open door."],
        ["verlieren", "etwas verlieren", "to lose something", "verlieren · hat verloren", "Sie hatte ihre Tasche verloren.", "She had lost her bag."],
        ["wiederfinden", "etwas wiederfinden", "to find again", "wiederfinden · hat wiedergefunden", "Am Ende fand sie die Tasche wieder.", "In the end she found the bag again."],
        ["passieren", "passieren", "to happen", "passieren · ist passiert", "Was ist passiert?", "What happened?"],
        ["vorher", "vorher / danach", "beforehand / afterward", "vorher · danach", "Vorher hatte ich noch angerufen.", "Beforehand I had called."],
        ["zum-glueck", "zum Glück", "fortunately", "zum Glück", "Zum Glück war niemand verletzt.", "Fortunately nobody was injured.", ["zum Glueck"]],
        ["am-ende", "am Ende", "in the end", "am Ende", "Am Ende kamen alle sicher an.", "In the end everyone arrived safely."]
      ],
      questions: [
        ["missed", "PLUSQUAMPERFEKT", "The missed train happened before the phone call.", "Say: After I had missed the train, I called my colleague.", ["Nachdem ich den Zug verpasst hatte, rief ich meine Kollegin an.", "Nachdem ich den Zug verpasst hatte, habe ich meine Kollegin angerufen.", "Nachdem ich den Zug verpasst hatte, rief ich meinen Kollegen an."], "Plusquamperfekt marks the earlier event. The later event can use Präteritum or conversational Perfekt.", ["vorher"]],
        ["used-live", "PRÄTERITUM", "You compare an earlier home with today.", "Say: I used to live in Cologne; today I live in Leipzig.", ["Früher wohnte ich in Köln, heute lebe ich in Leipzig.", "Frueher wohnte ich in Koeln, heute lebe ich in Leipzig."], "Wohnte presents the earlier background situation.", ["ereignis"]],
        ["waiting", "TIME CLAUSE", "Two past events overlap.", "Say: While we were waiting, it began to rain.", ["Während wir warteten, begann es zu regnen.", "Während wir gewartet haben, hat es angefangen zu regnen.", "Waehrend wir warteten, begann es zu regnen."], "Während introduces actions that overlap in time.", ["ploetzlich"]],
        ["bag", "EARLIER PAST", "The bag was found before the next part of the story.", "Say: Fortunately, someone had found my bag.", ["Zum Glück hatte jemand meine Tasche gefunden.", "Zum Glueck hatte jemand meine Tasche gefunden."], "Hatte gefunden marks an event earlier than the story's current past moment.", ["zum-glueck", "wiederfinden"]]
      ],
      input: { script: "Als Nora am Bahnhof ankam, bemerkte sie, dass ihre Tasche fehlte. Sie war vorher in einem Café gewesen. Während sie zurücklief, rief ein Mitarbeiter an. Eine Kundin hatte die Tasche unter dem Tisch gefunden.", listenPrompt: "Wer hatte die Tasche gefunden?", listenAnswers: ["Eine Kundin.", "Eine Kundin hatte die Tasche gefunden."], passage: "Bevor Malik zur Arbeit fuhr, hatte er noch schnell eingekauft. Unterwegs bemerkte er, dass sein Portemonnaie fehlte. Er rief im Geschäft an. Zum Glück hatte eine Mitarbeiterin es gefunden. Danach konnte Malik es abholen.", readPrompt: "Wann hatte Malik eingekauft?", readAnswers: ["Bevor er zur Arbeit fuhr.", "Er hatte vor der Fahrt zur Arbeit eingekauft."] },
      task: { writingPrompt: "Write a story of 100 to 130 words. Include background, one surprise, one earlier event in Plusquamperfekt, and a clear ending.", minWords: 100, guide: ["Set the scene", "Use plötzlich", "Use one hatte or war plus participle", "Use two time connectors", "End the story clearly"], required: ["hatte", "plötzlich"], model: "Letzten Freitag fuhr ich nach Köln. Der Zug war voll, und ich war müde. Als ich ausstieg, bemerkte ich plötzlich, dass meine Tasche fehlte. Ich hatte sie im Zug liegen lassen. Nachdem ich am Schalter gefragt hatte, rief mich ein Mitarbeiter an. Eine Reisende hatte die Tasche gefunden. Am Ende bekam ich alles zurück.", speakingPrompt: "Tell a two-minute story with a surprise and an earlier event.", speakingGuide: ["Give time and place", "Describe the background", "Use plötzlich", "Mark one earlier event", "Give the outcome"], speakingRequired: ["plötzlich", "hatte"], speakingModel: "Letzten Freitag war ich am Bahnhof. Plötzlich bemerkte ich, dass meine Tasche weg war. Ich hatte sie im Café liegen lassen. Zum Glück hatte ein Mitarbeiter sie gefunden. Am Ende bekam ich sie zurück." },
      culture: ["Regional speech and Standard German", "Regional accents and vocabulary remain part of everyday German. Many speakers move between regional speech and Standard German depending on the situation.", "Deutschland.de", "https://www.deutschland.de/en/topic/life/dialects-germany-german-language", ["der Dialekt", "Hochdeutsch", "regional"]]
    }),

    M({
      id: "b1-wohnen-nachbarschaft", level: "B1", code: "B1.2", title: "The neighbor who lives upstairs", subtitle: "Use relative clauses in practical housing and neighborhood situations.",
      canDo: ["Describe people and things with relative clauses", "Understand a building notice", "Make a polite complaint", "Suggest a practical solution"],
      grammar: [
        ["Relative pronoun job", "The noun before the comma determines gender and number. The relative pronoun's job inside the new clause determines case.", "Das ist die Nachbarin, die oben wohnt.", "That is the neighbor who lives upstairs."],
        ["Dative relative", "A dative verb or preposition inside the relative clause selects dem, der, or denen.", "Der Hausmeister, dem ich geschrieben habe, kommt morgen.", "The caretaker whom I wrote to is coming tomorrow."],
        ["Preposition plus relative pronoun", "Place the required preposition directly before the relative pronoun.", "Die Tonne, vor der das Rad steht, ist voll.", "The bin in front of which the bike stands is full."]
      ],
      words: [
        ["hausordnung", "die Hausordnung, die Hausordnungen", "building rules", "die Hausordnung · die Hausordnungen", "Die Hausordnung hängt im Flur.", "The building rules hang in the hall."],
        ["nachbarschaft", "die Nachbarschaft, die Nachbarschaften", "neighborhood", "die Nachbarschaft · die Nachbarschaften", "Unsere Nachbarschaft ist ruhig.", "Our neighborhood is quiet."],
        ["vermieter", "der Vermieter, die Vermieterin", "landlord", "der Vermieter · die Vermieterin", "Die Vermieterin antwortet morgen.", "The landlord will answer tomorrow."],
        ["mieter", "der Mieter, die Mieterin", "tenant", "der Mieter · die Mieterin", "Alle Mieter erhalten den Brief.", "All tenants receive the letter."],
        ["laerm", "der Lärm", "noise", "Lärm machen", "Der Lärm stört mich.", "The noise bothers me.", ["der Laerm"]],
        ["muelltonne", "die Mülltonne, die Mülltonnen", "trash bin", "die Mülltonne · die Mülltonnen", "Die Mülltonne ist voll.", "The trash bin is full.", ["die Muelltonne"]],
        ["treppenhaus", "das Treppenhaus, die Treppenhäuser", "stairwell", "im Treppenhaus", "Im Treppenhaus stehen Fahrräder.", "Bicycles stand in the stairwell."],
        ["ruecksicht", "Rücksicht auf jemanden nehmen", "be considerate of someone", "Rücksicht nehmen auf + accusative", "Bitte nehmen Sie Rücksicht auf die Nachbarn.", "Please be considerate of the neighbors."],
        ["beschweren", "sich über etwas beschweren", "to complain about something", "sich beschweren über + accusative", "Ich möchte mich über den Lärm beschweren.", "I would like to complain about the noise."],
        ["zustaendig", "für etwas zuständig sein", "be responsible for something", "zuständig sein für + accusative", "Frau Klein ist für das Haus zuständig.", "Ms. Klein is responsible for the building.", ["zustaendig"]]
      ],
      questions: [
        ["neighbor", "RELATIVE NOMINATIVE", "You identify the neighbor by her apartment.", "Say: That is the neighbor who lives on the third floor.", ["Das ist die Nachbarin, die im dritten Stock wohnt.", "Das ist der Nachbar, der im dritten Stock wohnt."], "The relative pronoun is the subject inside the relative clause.", ["nachbarschaft"]],
        ["caretaker", "RELATIVE DATIVE", "You wrote to the caretaker yesterday.", "Say: The caretaker whom I wrote to yesterday is coming tomorrow.", ["Der Hausmeister, dem ich gestern geschrieben habe, kommt morgen."], "Jemandem schreiben takes the dative, so the relative pronoun is dem.", ["zustaendig"]],
        ["apartment", "RELATIVE ACCUSATIVE", "A balcony is one of your housing criteria.", "Say: I am looking for an apartment that has a balcony.", ["Ich suche eine Wohnung, die einen Balkon hat."], "Wohnung determines feminine die, and die is the subject of hat.", ["mieter"]],
        ["bin", "PREPOSITIONAL RELATIVE", "A bicycle stands in front of the full bin.", "Say: The trash bin in front of which the bicycle stands is full.", ["Die Mülltonne, vor der das Fahrrad steht, ist voll.", "Die Muelltonne, vor der das Fahrrad steht, ist voll."], "The fixed location requires dative after vor, giving vor der.", ["muelltonne"]]
      ],
      input: { script: "Liebe Hausbewohnerinnen und Hausbewohner, die Fahrräder, die im Treppenhaus stehen, müssen bis Freitag entfernt werden. Das Treppenhaus ist ein Fluchtweg, der frei bleiben muss.", listenPrompt: "Bis wann müssen die Fahrräder entfernt werden?", listenAnswers: ["Bis Freitag.", "Die Fahrräder müssen bis Freitag entfernt werden."], passage: "Für Fahrräder gibt es einen Raum, den Sie im Keller finden. Bei Fragen wenden Sie sich bitte an Frau Klein, die für das Gebäude zuständig ist. Die Tür, vor der die Mülltonnen stehen, muss frei bleiben.", readPrompt: "Wer ist für das Gebäude zuständig?", readAnswers: ["Frau Klein.", "Frau Klein ist für das Gebäude zuständig."] },
      task: { writingPrompt: "Write a polite building complaint. Describe the problem, explain its effect, mention earlier contact, and propose one solution.", minWords: 100, guide: ["Use two relative clauses", "Describe the effect on residents", "State one earlier action", "Request a concrete solution"], required: ["der", "die"], model: "Sehr geehrte Frau Klein, seit einer Woche stehen mehrere Fahrräder im Treppenhaus, das als Fluchtweg frei bleiben muss. Der Nachbar, dem ich gestern geschrieben habe, konnte nicht helfen. Die Fahrräder blockieren außerdem die Tür zum Keller. Könnten Sie die Besitzer informieren und einen Abstellraum öffnen? Vielen Dank für Ihre Unterstützung.", speakingPrompt: "Explain a neighborhood problem and discuss one solution.", speakingGuide: ["Identify the people or object with a relative clause", "Describe the effect", "Mention responsibility", "Suggest one practical step"], speakingRequired: ["der", "zuständig"], speakingModel: "Die Fahrräder, die im Treppenhaus stehen, blockieren den Weg. Frau Klein, die für das Gebäude zuständig ist, könnte die Besitzer informieren. Ein Fahrradraum im Keller wäre eine gute Lösung." },
      culture: ["Building rules", "Rental agreements and building rules can cover shared areas, waste, and quiet periods. Exact rules depend on the building and local regulations.", "Make it in Germany", "https://www.make-it-in-germany.com/en/living-in-germany/housing-mobility/housing-registration", ["die Hausordnung", "die Ruhezeit", "der Fluchtweg"]]
    }),

    M({
      id: "b1-beruf-bildung", level: "B1", code: "B1.3", title: "A step toward a new career", subtitle: "Explain goals, qualifications, and purpose in work and education.",
      canDo: ["Explain a professional or educational goal", "Understand a job description", "Write a short application email", "Describe qualifications and experience"],
      grammar: [
        ["Purpose with um zu", "Use um zu when the same subject performs both actions.", "Ich mache einen Kurs, um mein Deutsch zu verbessern.", "I take a course to improve my German."],
        ["Without or instead", "Ohne zu describes an absent action. Statt zu describes an alternative action with the same subject.", "Er ging, ohne sich zu verabschieden.", "He left without saying goodbye."],
        ["Concession", "Obwohl introduces a fact that makes the result surprising. Trotzdem connects a new main clause.", "Obwohl sie wenig Erfahrung hat, bekam sie die Stelle.", "Although she has little experience, she got the position."]
      ],
      words: [
        ["bewerbung", "die Bewerbung, die Bewerbungen", "application", "eine Bewerbung schreiben", "Ich schicke heute meine Bewerbung.", "I am sending my application today."],
        ["lebenslauf", "der Lebenslauf, die Lebensläufe", "CV / résumé", "der Lebenslauf · die Lebensläufe", "Der Lebenslauf ist aktuell.", "The CV is current."],
        ["vorstellungsgespraech", "das Vorstellungsgespräch, die Vorstellungsgespräche", "job interview", "zum Vorstellungsgespräch eingeladen werden", "Sie hat morgen ein Vorstellungsgespräch.", "She has a job interview tomorrow."],
        ["erfahrung", "die Erfahrung, die Erfahrungen", "experience", "Erfahrung haben in", "Ich habe drei Jahre Erfahrung.", "I have three years of experience."],
        ["voraussetzung", "die Voraussetzung, die Voraussetzungen", "requirement", "eine Voraussetzung erfüllen", "Deutschkenntnisse sind eine Voraussetzung.", "German skills are a requirement."],
        ["verantwortlich", "verantwortlich für", "responsible for", "verantwortlich sein für + accusative", "Ich bin für den Kundenservice verantwortlich.", "I am responsible for customer service."],
        ["bewerben", "sich um eine Stelle bewerben", "apply for a position", "sich bewerben um + accusative", "Ich bewerbe mich um die Stelle.", "I am applying for the position."],
        ["weiterbildung", "die Weiterbildung, die Weiterbildungen", "continuing education", "an einer Weiterbildung teilnehmen", "Sie nimmt an einer Weiterbildung teil.", "She takes part in further training."],
        ["faehigkeit", "die Fähigkeit, die Fähigkeiten", "skill / ability", "eine Fähigkeit entwickeln", "Kommunikation ist eine wichtige Fähigkeit.", "Communication is an important skill."],
        ["ziel", "das berufliche Ziel, die Ziele", "career goal", "ein Ziel erreichen", "Mein berufliches Ziel ist klar.", "My career goal is clear."]
      ],
      questions: [
        ["course", "PURPOSE", "You connect the course with its goal.", "Say: I am taking a course to improve my German skills.", ["Ich mache einen Kurs, um meine Deutschkenntnisse zu verbessern.", "Ich besuche einen Kurs, um meine Deutschkenntnisse zu verbessern."], "Um zu states the purpose when both actions have the same subject.", ["weiterbildung", "ziel"]],
        ["experience", "CONCESSION", "Low experience did not prevent success.", "Say: Although she has little experience, she got the position.", ["Obwohl sie wenig Erfahrung hat, hat sie die Stelle bekommen."], "The verb closes the obwohl clause, and the main-clause verb follows the comma.", ["erfahrung"]],
        ["id", "INFINITIVE CLAUSE", "He attended the exam and left his ID behind.", "Say: He went to the exam without taking his ID.", ["Er ging zur Prüfung, ohne seinen Ausweis mitzunehmen.", "Er ist zur Prüfung gegangen, ohne seinen Ausweis mitzunehmen."], "A separable infinitive places zu inside the verb: mitzunehmen.", ["voraussetzung"]],
        ["position", "RELATIVE CLAUSE", "Flexible hours are one feature of the position.", "Say: I am applying for a position that offers flexible working hours.", ["Ich bewerbe mich um eine Stelle, die flexible Arbeitszeiten bietet."], "Sich bewerben um takes the accusative. The relative clause describes die Stelle.", ["bewerben"]]
      ],
      input: { script: "Warum interessieren Sie sich für diese Stelle? Ich arbeite seit drei Jahren im Kundenservice und möchte mehr Verantwortung übernehmen. Außerdem besuche ich eine Weiterbildung, um meine technischen Kenntnisse zu erweitern.", listenPrompt: "Warum besucht der Bewerber eine Weiterbildung?", listenAnswers: ["Um seine technischen Kenntnisse zu erweitern.", "Er möchte seine technischen Kenntnisse erweitern."], passage: "Gesucht wird eine Mitarbeiterin oder ein Mitarbeiter für den Kundenservice. Voraussetzungen sind gute Deutschkenntnisse, sicherer Umgang mit dem Computer und Freude an Teamarbeit. Berufserfahrung ist erwünscht. Flexible Arbeitszeiten sind möglich.", readPrompt: "Welche drei Voraussetzungen nennt die Anzeige?", readAnswers: ["Gute Deutschkenntnisse, Computerkenntnisse und Freude an Teamarbeit.", "Deutschkenntnisse, sicherer Umgang mit dem Computer und Teamarbeit."] },
      task: { writingPrompt: "Write an application email of 100 to 130 words. Name the position, give two qualifications, explain your interest, and request an interview.", minWords: 100, guide: ["Use one um zu phrase", "Give specific experience", "Refer to one requirement", "Close professionally"], required: ["bewerb", "erfahrung"], model: "Sehr geehrte Damen und Herren, ich bewerbe mich um die Stelle im Kundenservice. Seit drei Jahren berate ich Kundinnen und Kunden und bin für schriftliche Anfragen verantwortlich. Außerdem besuche ich eine Weiterbildung, um meine technischen Kenntnisse zu erweitern. Die flexiblen Arbeitszeiten passen gut zu meiner Situation. Über eine Einladung zu einem Vorstellungsgespräch würde ich mich freuen. Mit freundlichen Grüßen, Sam Lee", speakingPrompt: "Answer three interview questions about your experience, goals, and availability.", speakingGuide: ["Describe relevant experience", "Give a purpose with um zu", "Name one strength", "State when you can begin"], speakingRequired: ["erfahrung", "um"], speakingModel: "Ich habe drei Jahre Erfahrung im Kundenservice. Ich besuche eine Weiterbildung, um meine technischen Kenntnisse zu erweitern. Kommunikation gehört zu meinen Stärken. Ab Oktober könnte ich anfangen." },
      culture: ["Dual vocational training", "Dual vocational training combines practical work in a company with theoretical instruction at a vocational school. Many recognized occupations use this route.", "Make it in Germany", "https://www.make-it-in-germany.com/en/study-vocational-training/training-in-germany/vocational", ["die Ausbildung", "der Betrieb", "die Berufsschule"]]
    }),

    M({
      id: "b1-medien-information", level: "B1", code: "B1.4", title: "Is this report accurate?", subtitle: "Handle indirect questions, source language, and a short news summary.",
      canDo: ["Ask indirect questions", "Report what another source said", "Identify a claim, source, and missing evidence", "Summarize a short news item"],
      grammar: [
        ["Indirect yes or no question", "Use ob and place the conjugated verb at the end.", "Kannst du sagen, ob die Meldung stimmt?", "Can you say whether the report is accurate?"],
        ["Indirect W question", "Keep the question word and move the complete verb group to the end.", "Ich weiß nicht, wer den Beitrag veröffentlicht hat.", "I do not know who published the article."],
        ["Source frame", "Laut plus a noun phrase identifies where information came from.", "Laut dem Bericht wird die Strecke geöffnet.", "According to the report, the route will be opened."]
      ],
      words: [
        ["meldung", "die Meldung, die Meldungen", "report / news item", "die Meldung · die Meldungen", "Die Meldung verbreitet sich schnell.", "The report spreads quickly."],
        ["quelle", "die Quelle, die Quellen", "source", "die Quelle · die Quellen", "Der Beitrag nennt keine Quelle.", "The post names no source."],
        ["ueberschrift", "die Überschrift, die Überschriften", "headline", "die Überschrift · die Überschriften", "Die Überschrift ist irreführend.", "The headline is misleading.", ["die Ueberschrift"]],
        ["beitrag", "der Beitrag, die Beiträge", "post / article", "der Beitrag · die Beiträge", "Wer hat den Beitrag veröffentlicht?", "Who published the post?"],
        ["veroeffentlichen", "veröffentlichen", "to publish", "veröffentlichen · hat veröffentlicht", "Die Zeitung veröffentlicht den Bericht.", "The newspaper publishes the report.", ["veroeffentlichen"]],
        ["behaupten", "etwas behaupten", "to claim", "behaupten, dass", "Der Autor behauptet, dass alle Busse kostenlos sind.", "The author claims that all buses are free."],
        ["ueberpruefen", "überprüfen", "to verify", "eine Information überprüfen", "Wir sollten die Quelle überprüfen.", "We should verify the source.", ["ueberpruefen"]],
        ["zuverlaessig", "zuverlässig", "reliable", "eine zuverlässige Quelle", "Die offizielle Website ist zuverlässig.", "The official website is reliable.", ["zuverlaessig"]],
        ["vermutlich", "vermutlich", "probably", "vermutlich richtig", "Die Meldung ist vermutlich falsch.", "The report is probably false."],
        ["laut", "laut dem Bericht", "according to the report", "laut + dative", "Laut dem Bericht fährt der Bus normal.", "According to the report, the bus runs normally."]
      ],
      questions: [
        ["true", "INDIRECT QUESTION", "You ask someone to verify a report.", "Say: Can you tell me whether the report is true?", ["Kannst du mir sagen, ob die Meldung stimmt?", "Können Sie mir sagen, ob die Meldung stimmt?"], "Ob introduces an indirect yes or no question and sends the verb to the end.", ["meldung", "ueberpruefen"]],
        ["road", "REPORTED CONTENT", "A spokesperson described the earlier road condition.", "Say: The spokesperson said that the road was closed.", ["Die Sprecherin sagte, dass die Straße gesperrt war.", "Der Sprecher sagte, dass die Straße gesperrt war.", "Die Sprecherin sagte, dass die Strasse gesperrt war."], "Dass introduces the reported content and sends war to the end.", ["behaupten"]],
        ["route", "SOURCE AND PASSIVE", "You attribute tomorrow's opening to a report.", "Say: According to the report, the route will be opened tomorrow.", ["Laut dem Bericht wird die Strecke morgen geöffnet.", "Laut dem Bericht wird die Strecke morgen geoeffnet."], "Laut dem Bericht identifies the source. The passive focuses on the route.", ["laut"]],
        ["publisher", "INDIRECT QUESTION", "The author is unknown.", "Say: I do not know who published the article.", ["Ich weiß nicht, wer den Beitrag veröffentlicht hat.", "Ich weiss nicht, wer den Beitrag veroeffentlicht hat."], "The indirect wer clause keeps the complete verb group at the end.", ["beitrag", "veroeffentlichen"]]
      ],
      input: { script: "In einem Gruppenchat steht, dass alle Busse am Freitag kostenlos fahren. Der Beitrag nennt keine Quelle. Auf der Website des Verkehrsverbunds steht nur, dass Kinder kostenlos fahren dürfen.", listenPrompt: "Welche Gruppe darf kostenlos fahren?", listenAnswers: ["Kinder.", "Nur Kinder dürfen kostenlos fahren."], passage: "Die Überschrift lautet: Alle Busse am Freitag kostenlos. Im Text steht später, dass das Angebot nur für Kinder bis vierzehn Jahre gilt. Erwachsene brauchen weiterhin eine Fahrkarte. Die Überschrift lässt eine wichtige Einschränkung weg.", readPrompt: "Welche Information fehlt in der Überschrift?", readAnswers: ["Das Angebot gilt nur für Kinder.", "Nur Kinder dürfen kostenlos fahren."] },
      task: { writingPrompt: "Choose a short claim. Record the source, separate confirmed facts from uncertain details, and write a summary of 100 to 130 words.", minWords: 100, guide: ["Name the original source", "Use one indirect question", "Use laut", "Mark any uncertainty", "End with what remains open"], required: ["quelle", "laut"], model: "In einem Gruppenchat wird behauptet, dass alle Busse am Freitag kostenlos fahren. Der Beitrag nennt jedoch keine Quelle. Laut der Website des Verkehrsverbunds gilt das Angebot nur für Kinder. Erwachsene brauchen weiterhin eine Fahrkarte. Ich weiß noch nicht, ob weitere Linien besondere Angebote haben. Diese Information müsste geprüft werden.", speakingPrompt: "Brief someone on a doubtful report and explain how you checked it.", speakingGuide: ["State the claim", "Name the source", "Give the confirmed fact", "Identify the missing detail", "Say what should be checked"], speakingRequired: ["quelle", "laut"], speakingModel: "Im Gruppenchat steht, dass alle Busse kostenlos fahren. Die Meldung nennt keine Quelle. Laut der offiziellen Website gilt das Angebot nur für Kinder. Die Altersgrenze sollte noch geprüft werden." },
      culture: ["Public-service and private broadcasting", "Germany has public-service and private broadcasters. Their funding and legal roles differ, which provides context when comparing sources.", "Federal Agency for Civic Education", "https://www.bpb.de/themen/medien-journalismus/medienpolitik/500713/privat-kommerzieller-rundfunk/", ["der Rundfunk", "die Quelle", "öffentlich-rechtlich"]]
    }),

    M({
      id: "b1-umwelt-mobilitaet", level: "B1", code: "B1.5", title: "What is being changed?", subtitle: "Describe processes, measures, and results with the passive voice.",
      canDo: ["Describe a process with the passive voice", "Report a completed public project", "Explain the purpose of a measure", "Propose a local environmental change"],
      grammar: [
        ["Present passive", "Use werden plus past participle to focus on an action or process.", "Papier wird getrennt gesammelt.", "Paper is collected separately."],
        ["Past passive", "Use wurde or wurden plus past participle for a completed past process.", "Die Fahrradstraße wurde eröffnet.", "The bicycle street was opened."],
        ["Modal passive", "With a modal verb, the participle and werden close the sentence.", "Flaschen können mehrmals verwendet werden.", "Bottles can be used several times."],
        ["Purpose with damit", "Damit connects actions with different subjects and sends the verb to the end.", "Die Stadt baut Wege, damit alle sicher fahren können.", "The city builds paths so everyone can travel safely."]
      ],
      words: [
        ["abfall", "der Abfall", "waste", "Abfall vermeiden", "Wir sollten Abfall vermeiden.", "We should avoid waste."],
        ["verpackung", "die Verpackung, die Verpackungen", "packaging", "die Verpackung · die Verpackungen", "Die Verpackung wird recycelt.", "The packaging is recycled."],
        ["mehrweg", "Mehrweg", "reusable system", "die Mehrwegflasche", "Mehrwegflaschen werden gereinigt.", "Reusable bottles are cleaned."],
        ["trennen", "Müll trennen", "separate waste", "Müll trennen", "Papier wird getrennt gesammelt.", "Paper is collected separately."],
        ["recyceln", "recyceln", "to recycle", "recyceln · wird recycelt", "Glas kann recycelt werden.", "Glass can be recycled."],
        ["verkehrsmittel", "das Verkehrsmittel, die Verkehrsmittel", "means of transport", "öffentliche Verkehrsmittel", "Viele nutzen öffentliche Verkehrsmittel.", "Many people use public transport."],
        ["ausbauen", "etwas ausbauen", "to expand something", "ausbauen · wird ausgebaut", "Das Radwegenetz wird ausgebaut.", "The cycling network is being expanded."],
        ["massnahme", "die Maßnahme, die Maßnahmen", "measure", "eine Maßnahme umsetzen", "Die Maßnahme spart Energie.", "The measure saves energy.", ["die Massnahme"]],
        ["beitrag", "einen Beitrag leisten", "make a contribution", "einen Beitrag leisten zu", "Alle können einen Beitrag leisten.", "Everyone can make a contribution."],
        ["ergebnis", "das Ergebnis, die Ergebnisse", "result", "Ergebnisse prüfen", "Die Ergebnisse werden nach einem Jahr geprüft.", "The results are checked after a year."]
      ],
      questions: [
        ["paper", "PRESENT PASSIVE", "You describe local waste collection.", "Say: In our city, paper is collected separately.", ["In unserer Stadt wird Papier getrennt gesammelt."], "Present passive uses werden plus the past participle.", ["trennen"]],
        ["street", "PAST PASSIVE", "The opening happened last year.", "Say: The new bicycle street was opened last year.", ["Die neue Fahrradstraße wurde letztes Jahr eröffnet.", "Die neue Fahrradstrasse wurde letztes Jahr eroeffnet."], "Past passive uses wurde plus the participle.", ["ausbauen"]],
        ["bottles", "MODAL PASSIVE", "You explain the benefit of reusable bottles.", "Say: Reusable bottles can be used several times.", ["Mehrwegflaschen können mehrmals verwendet werden.", "Mehrwegflaschen koennen mehrmals verwendet werden."], "With a modal verb, verwendet werden closes the sentence.", ["mehrweg"]],
        ["cycle", "PURPOSE", "The city wants safer travel for more people.", "Say: The city is building new cycle paths so that more people can travel safely.", ["Die Stadt baut neue Radwege, damit mehr Menschen sicher fahren können.", "Die Stadt baut neue Radwege, damit mehr Menschen sicher fahren koennen."], "Damit introduces the purpose and places the modal verb at the end.", ["massnahme"]]
      ],
      input: { script: "Die Stadt Linden plant ein neues Mobilitätskonzept. Im nächsten Jahr werden fünf Kilometer neue Radwege gebaut. Zwei Straßen werden für den Durchgangsverkehr gesperrt. Nach einem Jahr werden die Ergebnisse geprüft.", listenPrompt: "Wann werden die Ergebnisse geprüft?", listenAnswers: ["Nach einem Jahr.", "Die Ergebnisse werden nach einem Jahr geprüft."], passage: "In der Kantine werden seit Januar Mehrwegbecher verwendet. Die Becher werden nach jeder Nutzung gereinigt. Einwegbecher wurden aus dem Angebot entfernt. Dadurch ist der Verpackungsabfall deutlich gesunken.", readPrompt: "Was wurde aus dem Angebot entfernt?", readAnswers: ["Einwegbecher.", "Einwegbecher wurden aus dem Angebot entfernt."] },
      task: { writingPrompt: "Propose one environmental measure for a town in 110 to 140 words. Explain the problem, the change, and the expected result.", minWords: 110, guide: ["Use present passive", "Use past or modal passive", "Use damit for purpose", "Name one way to check the result"], required: ["wird", "damit"], model: "In unserer Stadt gibt es zu wenige sichere Radwege. Im nächsten Jahr sollten neue Wege gebaut werden, damit mehr Menschen mit dem Fahrrad fahren können. Gefährliche Kreuzungen müssen außerdem besser markiert werden. An den Bahnhöfen könnten sichere Fahrradplätze eingerichtet werden. Nach einem Jahr werden die Unfallzahlen und die Nutzung geprüft. So kann die Stadt sehen, welche Maßnahmen wirksam sind.", speakingPrompt: "Present one local environmental measure and answer a concern about cost or space.", speakingGuide: ["State the problem", "Describe what will be changed", "Use passive twice", "Explain the purpose", "Respond to one concern"], speakingRequired: ["werden", "damit"], speakingModel: "In der Innenstadt werden neue Radwege gebaut. Zwei Kreuzungen müssen sicherer gestaltet werden, damit mehr Menschen Rad fahren. Die Maßnahme kostet Geld, aber die Ergebnisse werden nach einem Jahr geprüft." },
      culture: ["Reusable and single-use deposits", "Germany uses reusable and single-use deposit systems for beverage containers. Reusable containers circulate after cleaning, while many single-use containers are collected for recycling.", "German Environment Agency", "https://www.umweltbundesamt.de/en/topics/waste-resources/product-stewardship-waste-management/packaging", ["Mehrweg", "Einweg", "das Pfand"]]
    }),

    M({
      id: "b1-gesund-leben", level: "B1", code: "B1.6", title: "What would you change?", subtitle: "Give advice and discuss imagined changes with Konjunktiv II.",
      canDo: ["Give considerate advice", "Describe an unreal present situation", "Explain a desired change in habits", "Discuss work and recovery"],
      grammar: [
        ["Imagined condition", "Use wenn plus Konjunktiv II for an unreal or hypothetical condition.", "Wenn ich mehr Zeit hätte, würde ich öfter kochen.", "If I had more time, I would cook more often."],
        ["Common forms", "Wäre, hätte, and könnte are frequent. Würde plus infinitive works for many other verbs.", "Es wäre besser. Ich hätte Zeit. Wir könnten gehen.", "It would be better. I would have time. We could go."],
        ["Considerate advice", "An deiner Stelle and sollte present a recommendation with useful distance.", "An deiner Stelle würde ich früher schlafen.", "In your place I would sleep earlier."]
      ],
      words: [
        ["belastung", "die Belastung, die Belastungen", "strain / burden", "eine hohe Belastung", "Die Belastung ist zu hoch.", "The strain is too high."],
        ["erholen", "sich erholen", "to recover", "sich erholen · hat sich erholt", "Am Wochenende erhole ich mich.", "I recover on the weekend."],
        ["ausreichend", "ausreichend", "sufficient", "ausreichend schlafen", "Du solltest ausreichend schlafen.", "You should get enough sleep."],
        ["gewohnheit", "die Gewohnheit, die Gewohnheiten", "habit", "eine Gewohnheit verändern", "Diese Gewohnheit möchte ich ändern.", "I want to change this habit."],
        ["schlaf", "der Schlaf", "sleep", "genug Schlaf bekommen", "Guter Schlaf ist wichtig.", "Good sleep is important."],
        ["bewegung", "die Bewegung", "exercise / movement", "regelmäßige Bewegung", "Mehr Bewegung würde mir helfen.", "More exercise would help me."],
        ["gleichgewicht", "das Gleichgewicht", "balance", "ein Gleichgewicht finden", "Ich suche ein besseres Gleichgewicht.", "I am looking for a better balance."],
        ["grenze", "eine Grenze setzen", "set a boundary", "klare Grenzen setzen", "Ich sollte eine klare Grenze setzen.", "I should set a clear boundary."],
        ["stress", "Stress vermeiden", "avoid stress", "Stress vermeiden", "Pausen helfen, Stress zu vermeiden.", "Breaks help avoid stress."],
        ["veraendern", "etwas verändern", "to change something", "verändern · hat verändert", "Was würdest du verändern?", "What would you change?", ["veraendern"]]
      ],
      questions: [
        ["time", "HYPOTHETICAL", "You imagine having more time.", "Say: If I had more time, I would cook more often.", ["Wenn ich mehr Zeit hätte, würde ich öfter kochen.", "Wenn ich mehr Zeit haette, wuerde ich oefter kochen."], "Hätte marks the imagined condition. Würde kochen gives the imagined result.", ["gewohnheit"]],
        ["doctor", "ADVICE", "You give a friend considerate advice.", "Say: In your place, I would speak with the doctor.", ["An deiner Stelle würde ich mit der Ärztin sprechen.", "An deiner Stelle würde ich mit dem Arzt sprechen.", "An deiner Stelle wuerde ich mit der Aerztin sprechen."], "An deiner Stelle introduces personal advice with useful distance.", ["grenze"]],
        ["breaks", "EVALUATION", "You evaluate a possible change.", "Say: It would be better to take regular breaks.", ["Es wäre besser, regelmäßig Pausen zu machen.", "Es waere besser, regelmaessig Pausen zu machen."], "Wäre softens the evaluation and the infinitive group gives the action.", ["stress"]],
        ["home", "QUESTION", "You imagine working from home.", "Ask: What would you change if you could work from home?", ["Was würdest du verändern, wenn du von zu Hause arbeiten könntest?", "Was wuerdest du veraendern, wenn du von zu Hause arbeiten koenntest?"], "The wenn clause closes with könntest.", ["veraendern"]]
      ],
      input: { script: "Ich schlafe seit einigen Wochen schlecht und bin morgens oft müde. Nach der Arbeit beantworte ich noch viele Nachrichten. Meine Freundin meint, ich sollte abends das Handy ausschalten.", listenPrompt: "Welche Veränderung empfiehlt die Freundin?", listenAnswers: ["Sie empfiehlt, abends das Handy auszuschalten.", "Die Person sollte abends das Handy ausschalten."], passage: "Wenn Amir früher Feierabend machen könnte, würde er dreimal pro Woche Sport treiben. Im Moment arbeitet er oft bis spät. Eine feste Pause am Mittag wäre ebenfalls hilfreich. Seine Kollegin rät ihm, klare Grenzen zu setzen.", readPrompt: "Was rät die Kollegin Amir?", readAnswers: ["Klare Grenzen zu setzen.", "Sie rät ihm, klare Grenzen zu setzen."] },
      task: { writingPrompt: "Respond to a person with three pieces of advice in 100 to 130 words.", minWords: 100, guide: ["Use an deiner Stelle", "Use one wenn condition", "Use wäre, hätte, or könnte", "Give a reason for each main suggestion"], required: ["würde", "wenn"], model: "An deiner Stelle würde ich abends keine beruflichen Nachrichten mehr beantworten. Wenn du eine klare Grenze setzen könntest, würdest du dich wahrscheinlich besser erholen. Es wäre außerdem hilfreich, mittags eine feste Pause zu machen. Du könntest dreimal pro Woche spazieren gehen, weil regelmäßige Bewegung den Schlaf verbessern kann.", speakingPrompt: "Give a friend three considerate suggestions and discuss one obstacle.", speakingGuide: ["Use an deiner Stelle", "Use a hypothetical condition", "Acknowledge one difficulty", "Offer a realistic first step"], speakingRequired: ["würde", "könnte"], speakingModel: "An deiner Stelle würde ich abends das Handy ausschalten. Wenn du früher aufhören könntest, wäre mehr Bewegung möglich. Ich weiß, dass die Arbeit stressig ist. Eine feste Pause wäre ein guter erster Schritt." },
      culture: ["Feierabend", "Feierabend refers to the end of the working day and the free time that follows. It appears in greetings and social expressions as well.", "Deutschland.de", "https://www.deutschland.de/en/topic/business/typically-german-sayings-and-rituals-of-everyday-working-life", ["Feierabend", "die Pause", "sich erholen"]]
    }),

    M({
      id: "b1-engagement", level: "B1", code: "B1.7", title: "What do you care about?", subtitle: "Use fixed prepositions and da and wo compounds in community life.",
      canDo: ["Talk about clubs and volunteering", "Use common verbs with fixed prepositions", "Ask about a thing with a wo compound", "Refer back to an idea with a da compound"],
      grammar: [
        ["Question about a thing", "Use wo plus preposition for things and topics. Add r when the preposition begins with a vowel.", "Wofür interessierst du dich? Worüber sprecht ihr?", "What are you interested in? What are you talking about?"],
        ["Reference to a thing", "Use da plus preposition to refer back to a thing, topic, or full situation.", "Der Verein kümmert sich darum.", "The club takes care of that."],
        ["Question about a person", "Use the preposition plus wen or wem for people.", "Für wen engagierst du dich? Mit wem sprichst du?", "Who do you advocate for? Who are you speaking with?"]
      ],
      words: [
        ["interessieren", "sich für etwas interessieren", "be interested in", "sich interessieren für + accusative", "Ich interessiere mich für Musik.", "I am interested in music."],
        ["teilnehmen", "an etwas teilnehmen", "participate in", "teilnehmen an + dative", "Wir nehmen an einem Sprachcafé teil.", "We take part in a language café."],
        ["engagieren", "sich für etwas engagieren", "campaign / volunteer for", "sich engagieren für + accusative", "Sie engagiert sich für den Park.", "She campaigns for the park."],
        ["abstimmen", "über etwas abstimmen", "vote on something", "abstimmen über + accusative", "Die Mitglieder stimmen über das Projekt ab.", "The members vote on the project."],
        ["kuemmern", "sich um etwas kümmern", "take care of something", "sich kümmern um + accusative", "Wer kümmert sich um den Garten?", "Who takes care of the garden?", ["kuemmern"]],
        ["mitglied", "das Mitglied, die Mitglieder", "member", "Mitglied in einem Verein", "Der Verein hat fünfzig Mitglieder.", "The club has fifty members."],
        ["verein", "der Verein, die Vereine", "club / association", "der Verein · die Vereine", "Der Verein organisiert ein Fest.", "The club organizes a festival."],
        ["ehrenamt", "das Ehrenamt, die Ehrenämter", "volunteering", "sich ehrenamtlich engagieren", "Viele Menschen übernehmen ein Ehrenamt.", "Many people volunteer."],
        ["veranstaltung", "die Veranstaltung, die Veranstaltungen", "event", "an einer Veranstaltung teilnehmen", "Die Veranstaltung beginnt um sechs.", "The event begins at six."],
        ["beitrag", "der Beitrag, die Beiträge", "contribution / fee", "einen Beitrag leisten", "Alle leisten einen kleinen Beitrag.", "Everyone makes a small contribution."]
      ],
      questions: [
        ["interest", "WO COMPOUND", "You ask about a topic or activity.", "Ask: What are you interested in?", ["Wofür interessierst du dich?", "Wofür interessieren Sie sich?", "Wofuer interessierst du dich?"], "A question about a thing uses wofür. A person would require für wen.", ["interessieren"]],
        ["cafe", "FIXED PREPOSITION", "You describe your participation.", "Say: I am taking part in a language café.", ["Ich nehme an einem Sprachcafé teil.", "Ich nehme an einem Sprachcafe teil."], "Teilnehmen an takes the dative and separates around the sentence.", ["teilnehmen"]],
        ["club", "DA COMPOUND", "The club has responsibility for the issue already mentioned.", "Say: The club takes care of that.", ["Darum kümmert sich der Verein.", "Der Verein kümmert sich darum.", "Darum kuemmert sich der Verein."], "Darum refers back to a thing or situation after sich kümmern um.", ["kuemmern", "verein"]],
        ["playground", "FIXED PREPOSITION", "Residents support a new playground.", "Say: Many residents are campaigning for the new playground.", ["Viele Bewohner engagieren sich für den neuen Spielplatz.", "Viele Bewohnerinnen und Bewohner engagieren sich für den neuen Spielplatz.", "Viele Bewohner engagieren sich fuer den neuen Spielplatz."], "Sich engagieren für takes the accusative.", ["engagieren"]]
      ],
      input: { script: "Unser Nachbarschaftsverein sucht neue Mitglieder. Jeden Dienstag findet ein Sprachcafé statt. Außerdem kümmert sich eine Gruppe um den Gemeinschaftsgarten. Im nächsten Monat stimmen die Mitglieder über neue Projekte ab.", listenPrompt: "Worum kümmert sich eine Gruppe?", listenAnswers: ["Um den Gemeinschaftsgarten.", "Eine Gruppe kümmert sich um den Gemeinschaftsgarten."], passage: "Der Verein organisiert am Samstag eine Veranstaltung für neue Mitglieder. Interessierte können ohne Anmeldung kommen. Beim Treffen wird darüber gesprochen, welche Projekte im Herbst beginnen sollen. Für den Kinderbereich werden noch Freiwillige gesucht.", readPrompt: "Worüber wird beim Treffen gesprochen?", readAnswers: ["Über die Projekte im Herbst.", "Darüber, welche Projekte im Herbst beginnen sollen."] },
      task: { writingPrompt: "Present a volunteer project in 110 to 140 words. Explain its goal, activities, meeting time, and how someone can join.", minWords: 110, guide: ["Use three fixed-preposition verbs", "Use one wo question", "Use one da compound", "Give a practical invitation"], required: ["dafür", "teil"], model: "Unser Verein kümmert sich um einen Gemeinschaftsgarten. Jeden Samstag nehmen etwa zwanzig Menschen an der Gartenarbeit teil. Wir interessieren uns besonders für nachhaltigen Anbau. Wofür werden noch Helfer gesucht? Der Kinderbereich braucht Unterstützung, und dafür kann man sich per E-Mail anmelden. Neue Mitglieder sind bei der nächsten Veranstaltung herzlich willkommen.", speakingPrompt: "Present one community project and answer questions about participation.", speakingGuide: ["Name the goal", "Use sich engagieren für", "Use teilnehmen an", "Ask or answer one wo compound question"], speakingRequired: ["für", "an"], speakingModel: "Unser Verein engagiert sich für einen Gemeinschaftsgarten. Jeden Samstag nehmen wir an der Gartenarbeit teil. Wofür brauchen wir Hilfe? Für den Kinderbereich. Darum kümmert sich bisher nur eine kleine Gruppe." },
      culture: ["Clubs and volunteer groups", "Clubs and volunteer groups are common ways to meet people and participate in local life. Activities range from sports and culture to social services and environmental projects.", "Deutschland.de", "https://www.deutschland.de/en/topic/life/volunteering-in-germanythe-good-guys-in-society", ["der Verein", "das Ehrenamt", "mitmachen"]]
    }),

    M({
      id: "b1-argumentieren", level: "B1", code: "B1.8", title: "Support a clear position", subtitle: "Compare two sides, use evidence, and propose a compromise.",
      canDo: ["State and support an opinion", "Compare two sides of a familiar issue", "Summarize simple survey results", "Find common ground in a discussion", "Relay the main points to someone else"],
      grammar: [
        ["Paired structure", "Einerseits and andererseits organize two sides of one issue.", "Einerseits spart Homeoffice Zeit, andererseits fehlt Kontakt.", "On one hand remote work saves time; on the other hand contact is missing."],
        ["Position connector", "Meiner Meinung nach occupies position one, so the conjugated verb comes next.", "Meiner Meinung nach sollte die Stadt mehr Bäume pflanzen.", "In my opinion, the city should plant more trees."],
        ["Genitive after trotz", "Formal standard German commonly uses the genitive after trotz.", "Trotz des hohen Preises wurde der Vorschlag angenommen.", "Despite the high price, the proposal was accepted."],
        ["Dative opinion verb", "Zustimmen takes the dative.", "Ich stimme dem Vorschlag zu.", "I agree with the proposal."]
      ],
      words: [
        ["standpunkt", "der Standpunkt, die Standpunkte", "position / viewpoint", "einen Standpunkt vertreten", "Sie vertritt einen klaren Standpunkt.", "She presents a clear position."],
        ["vorteil", "der Vorteil, die Vorteile", "advantage", "ein Vorteil von", "Ein Vorteil ist die kurze Fahrzeit.", "One advantage is the short travel time."],
        ["nachteil", "der Nachteil, die Nachteile", "disadvantage", "ein Nachteil von", "Der hohe Preis ist ein Nachteil.", "The high price is a disadvantage."],
        ["begründen", "etwas begründen", "justify something", "eine Meinung begründen", "Bitte begründen Sie Ihre Meinung.", "Please justify your opinion."],
        ["zustimmen", "jemandem zustimmen", "agree with someone", "zustimmen + dative", "Ich stimme dem Vorschlag zu.", "I agree with the proposal."],
        ["widersprechen", "jemandem widersprechen", "disagree with someone", "widersprechen + dative", "In diesem Punkt widerspreche ich dir.", "I disagree with you on this point."],
        ["beruecksichtigen", "etwas berücksichtigen", "consider something", "berücksichtigen + accusative", "Wir müssen die Kosten berücksichtigen.", "We have to consider the costs.", ["beruecksichtigen"]],
        ["kompromiss", "der Kompromiss, die Kompromisse", "compromise", "einen Kompromiss finden", "Die Gruppe findet einen Kompromiss.", "The group finds a compromise."],
        ["umfrage", "die Umfrage, die Umfragen", "survey", "eine Umfrage durchführen", "Die Umfrage hat 600 Teilnehmende.", "The survey has 600 participants."],
        ["ergebnis", "das Ergebnis, die Ergebnisse", "result", "ein Ergebnis auswerten", "Das Ergebnis ist deutlich.", "The result is clear."]
      ],
      questions: [
        ["trees", "POSITION", "You state a local policy opinion.", "Say: In my opinion, the city should plant more trees.", ["Meiner Meinung nach sollte die Stadt mehr Bäume pflanzen.", "Meiner Meinung nach sollte die Stadt mehr Baeume pflanzen."], "The opening phrase fills position one, so the conjugated verb follows it.", ["standpunkt"]],
        ["homeoffice", "BALANCE", "You compare time savings with reduced contact.", "Write the complete two-sided sentence.", ["Einerseits spart Homeoffice Zeit, andererseits fehlt der direkte Austausch."], "The paired connectors organize two sides of the same issue.", ["vorteil", "nachteil"]],
        ["price", "GENITIVE", "A high price did not prevent acceptance.", "Say: Despite the high price, the proposal was accepted.", ["Trotz des hohen Preises wurde der Vorschlag angenommen."], "Formal standard German commonly uses the genitive after trotz.", ["beruecksichtigen"]],
        ["agree", "DATIVE", "You support a practical proposal.", "Say: I agree with the proposal because it is practical.", ["Ich stimme dem Vorschlag zu, weil er praktisch ist."], "Zustimmen takes the dative and the weil clause ends with ist.", ["zustimmen"]]
      ],
      input: { script: "Eine Umfrage unter sechshundert Einwohnerinnen und Einwohnern untersucht den neuen Stadtplatz. Achtundfünfzig Prozent wünschen sich mehr Bäume und Sitzplätze. Viele unterstützen einen Kompromiss mit Grünflächen und einer kleinen Lieferzone.", listenPrompt: "Welche Lösung unterstützen viele Befragte?", listenAnswers: ["Einen Kompromiss mit Grünflächen und einer kleinen Lieferzone.", "Viele unterstützen Grünflächen und eine kleine Lieferzone."], passage: "Für eine autofreie Innenstadt sprechen sauberere Luft und mehr Platz. Dagegen sprechen mögliche Probleme für Lieferdienste und Menschen mit eingeschränkter Mobilität. Eine Lösung könnte feste Lieferzeiten und gut erreichbare Parkplätze am Rand verbinden.", readPrompt: "Welche zwei Probleme nennt der Text?", readAnswers: ["Probleme für Lieferdienste und Menschen mit eingeschränkter Mobilität.", "Lieferdienste und eingeschränkte Mobilität."] },
      task: { writingPrompt: "Write a forum post of 150 to 180 words. State your position, give two reasons, acknowledge one concern, and propose a compromise.", minWords: 150, guide: ["Open with your position", "Use einerseits and andererseits", "Refer to one piece of evidence", "Use trotz or dennoch", "Offer a feasible compromise"], required: ["einerseits", "andererseits"], model: "Meiner Meinung nach sollte der Stadtplatz mehr Grünflächen bekommen. Einerseits brauchen die Geschäfte eine Lieferzone, andererseits wünschen sich viele Menschen sichere und ruhige Plätze. Die Umfrage zeigt eine klare Mehrheit für Bäume und Sitzplätze. Trotz möglicher Kosten wäre die Veränderung sinnvoll. Ein Kompromiss könnte eine kleine Lieferzone am Morgen und eine autofreie Fläche am Nachmittag verbinden.", speakingPrompt: "Give a two-minute position, respond to one objection, and propose a compromise.", speakingGuide: ["State your position early", "Give two reasons", "Acknowledge one concern", "Respond directly", "Finish with a compromise"], speakingRequired: ["meinung", "andererseits"], speakingModel: "Meiner Meinung nach braucht der Platz mehr Bäume. Einerseits kosten die Maßnahmen Geld, andererseits verbessert sich die Aufenthaltsqualität. Die Lieferdienste brauchen Zugang. Ein Kompromiss wären feste Lieferzeiten am Morgen." },
      culture: ["Petitions and responsibility", "People can submit requests, complaints, and suggestions to the German Bundestag's Petitions Committee. Federalism means that some concerns belong to a state or local authority.", "German Bundestag", "https://www.bundestag.de/en/committees/a02", ["die Petition", "der Bundestag", "die Zuständigkeit"]]
    })
  );

  modules.push(
    M({
      id: "b2-positionen", level: "B2", code: "B2.1", title: "Develop a clear position", subtitle: "Weigh evidence, conditions, consequences, and objections.",
      canDo: ["Present a clear position on a current issue", "Weigh benefits, costs, conditions, and consequences", "Respond to an objection while keeping the main thread", "Write a structured opinion text"],
      grammar: [
        ["Concession and result", "Obwohl introduces a concession. Dennoch begins a main clause and places the conjugated verb directly after it.", "Obwohl die Kosten steigen, bleibt der Plan sinnvoll. Dennoch muss er angepasst werden.", "Although costs are rising, the plan remains sensible. Still, it must be adjusted."],
        ["Paired development", "Einerseits and andererseits frame two relevant sides. Je and desto express a changing relationship.", "Je mehr Menschen teilnehmen, desto verlässlicher werden die Daten.", "The more people participate, the more reliable the data become."],
        ["Condition", "Sofern and vorausgesetzt, dass introduce a condition and place the verb group at the end.", "Das Modell funktioniert, sofern alle beteiligt werden.", "The model works provided everyone is involved."]
      ],
      words: [
        ["standpunkt", "einen Standpunkt vertreten", "express a position", "einen klaren Standpunkt vertreten", "Die Autorin vertritt einen klaren Standpunkt.", "The author presents a clear position."],
        ["abwaegen", "etwas sorgfältig abwägen", "weigh something carefully", "abwägen · hat abgewogen", "Wir müssen Nutzen und Kosten abwägen.", "We have to weigh benefits and costs.", ["abwaegen"]],
        ["einwand", "der Einwand, die Einwände", "objection", "einen Einwand erheben", "Der Einwand ist berechtigt.", "The objection is justified."],
        ["voraussetzung", "die Voraussetzung, die Voraussetzungen", "prerequisite", "eine Voraussetzung erfüllen", "Transparenz ist eine Voraussetzung.", "Transparency is a prerequisite."],
        ["auswirkung", "die Auswirkung auf, die Auswirkungen", "effect on", "Auswirkungen auf + accusative", "Die Maßnahme hat Auswirkungen auf Familien.", "The measure affects families."],
        ["nutzen", "der gesellschaftliche Nutzen", "social benefit", "gesellschaftlichen Nutzen schaffen", "Der gesellschaftliche Nutzen ist hoch.", "The social benefit is high."],
        ["ausschlaggebend", "ausschlaggebend sein", "be decisive", "für etwas ausschlaggebend sein", "Die Beteiligung ist ausschlaggebend.", "Participation is decisive."],
        ["vertretbar", "vertretbar sein", "be justifiable", "ethisch vertretbar", "Die Lösung ist finanziell vertretbar.", "The solution is financially justifiable."],
        ["beruecksichtigen", "etwas berücksichtigen", "take something into account", "berücksichtigen · hat berücksichtigt", "Der Plan berücksichtigt soziale Folgen.", "The plan takes social consequences into account.", ["beruecksichtigen"]],
        ["schluss", "zu dem Schluss kommen", "reach the conclusion", "zu dem Schluss kommen, dass", "Die Studie kommt zu einem anderen Schluss.", "The study reaches a different conclusion."]
      ],
      questions: [
        ["although", "CONCESSION", "City housing remains attractive despite rising rents.", "Join the ideas with obwohl: The rents are rising. Many people continue to move to the city.", ["Obwohl die Mieten steigen, ziehen viele Menschen weiterhin in die Stadt."], "The finite verb closes the obwohl clause. The main-clause verb follows the comma.", ["auswirkung"]],
        ["more", "CORRELATION", "Remote work changes commuting volume.", "Express: More people work from home. Commuter traffic decreases.", ["Je mehr Menschen im Homeoffice arbeiten, desto stärker nimmt der Pendelverkehr ab.", "Je mehr Menschen im Homeoffice arbeiten, desto weniger Pendelverkehr gibt es."], "The je clause ends with its verb. Desto fills the first position of the main clause.", ["auswirkung"]],
        ["condition", "CONDITION", "The model depends on inclusive planning.", "Say: The model can work, provided all employees are involved.", ["Das Modell kann funktionieren, sofern alle Beschäftigten einbezogen werden."], "Sofern introduces a condition and sends the verb group to the end.", ["voraussetzung"]],
        ["still", "CONNECTOR", "The change costs a lot and may pay off later.", "Begin the second sentence with dennoch.", ["Die Umstellung kostet viel Geld. Dennoch könnte sie sich langfristig lohnen.", "Die Umstellung kostet viel Geld, dennoch könnte sie sich langfristig lohnen."], "Dennoch fills position one, so the finite verb follows it.", ["abwaegen"]]
      ],
      input: { script: "Einige Unternehmen erproben eine Vier-Tage-Woche bei gleichbleibendem Gehalt. Befürworter erwarten zufriedenere Beschäftigte. Kritiker weisen darauf hin, dass sich Arbeitsabläufe verdichten könnten. Ausschlaggebend scheint die Beteiligung der Beschäftigten zu sein.", listenPrompt: "Welche Bedingung wird als ausschlaggebend beschrieben?", listenAnswers: ["Die Beteiligung der Beschäftigten.", "Ausschlaggebend ist die Beteiligung der Beschäftigten."], passage: "Eine Vier-Tage-Woche kann die Zufriedenheit erhöhen und Krankheitsausfälle senken. Gleichzeitig könnten Arbeitsabläufe dichter werden. Einzelne Modellversuche liefern unterschiedliche Ergebnisse. Ein allgemeines Urteil braucht daher Daten aus verschiedenen Branchen und längeren Zeiträumen.", readPrompt: "Warum reicht ein einzelner Modellversuch nicht aus?", readAnswers: ["Weil die Ergebnisse unterschiedlich sind und mehrere Branchen sowie längere Zeiträume untersucht werden müssen.", "Ein allgemeines Urteil braucht Daten aus verschiedenen Branchen und längeren Zeiträumen."] },
      task: { writingPrompt: "Write 180 to 220 words about a four-day working week. Include a clear position, two reasons, one serious objection, one condition for success, and a final assessment.", minWords: 180, guide: ["State your position early", "Use obwohl or dennoch", "Use je and desto", "Address an objection directly", "Name a condition with sofern"], required: ["obwohl", "sofern"], model: "Eine Vier-Tage-Woche kann sinnvoll sein, sofern Arbeitsabläufe gemeinsam geplant werden. Einerseits gewinnen Beschäftigte mehr Erholungszeit, andererseits darf die Arbeit nicht auf vier überlange Tage verdichtet werden. Obwohl die Umstellung zunächst Aufwand verursacht, könnten weniger Krankheitsausfälle langfristig Kosten senken. Je stärker die Beschäftigten beteiligt werden, desto eher lassen sich passende Lösungen finden. Ausschlaggebend sind verlässliche Daten aus verschiedenen Branchen. Unter diesen Bedingungen halte ich das Modell für vertretbar.", speakingPrompt: "Present a two-minute position, answer an objection, and state one condition for success.", speakingGuide: ["Open with a clear claim", "Give two reasons", "Use a concession", "Answer one objection", "End with a condition"], speakingRequired: ["obwohl", "sofern"], speakingModel: "Ich halte die Vier-Tage-Woche für sinnvoll, sofern die Beschäftigten an der Planung beteiligt werden. Obwohl die Umstellung Geld kostet, kann sie die Zufriedenheit erhöhen. Der Einwand einer höheren Arbeitsdichte ist berechtigt. Deshalb braucht jedes Team klare Grenzen." },
      culture: ["Reasons and examples in discussion", "Seminar and workplace discussions often benefit from a clearly stated reason and a concrete example. Useful openings include Ein entscheidender Punkt ist and Dabei sollte man berücksichtigen, dass.", "Goethe-Institut", "https://www.goethe.de/prj/dlp/dlapi/v1/index.cfm?endpoint=%2Ftlm%2Fdownload&file_ID=5344&tlm_ID=2068", ["Ein entscheidender Punkt ist", "Dabei sollte man berücksichtigen", "meines Erachtens"]]
    }),

    M({
      id: "b2-quellen", level: "B2", code: "B2.2", title: "Report and examine sources", subtitle: "Preserve distance, certainty, and attribution in reported speech.",
      canDo: ["Report another person's statement with distance", "Distinguish a confirmed fact, claim, and rumor", "Summarize a source without changing certainty", "Compare two accounts of the same event"],
      grammar: [
        ["Konjunktiv I", "Use Konjunktiv I to mark reported speech and keep the source's words separate from your own position.", "Die Sprecherin sagt, die Zahlen seien vorläufig.", "The spokesperson says the figures are preliminary."],
        ["Distinct plural form", "When Konjunktiv I looks the same as the indicative, a clear Konjunktiv II form can preserve distance.", "Die Forschenden sagen, sie hätten alle Daten geprüft.", "The researchers say they had checked all data."],
        ["Source phrases", "Laut, zufolge, and nach Angaben von identify the source without a full reporting clause.", "Der Studie zufolge ist die Nutzung gestiegen.", "According to the study, usage has increased."]
      ],
      words: [
        ["behaupten", "etwas behaupten", "claim something", "behaupten, dass", "Der Autor behauptet, die Zahlen seien korrekt.", "The author claims the figures are correct."],
        ["berichten", "über etwas berichten", "report on something", "berichten über + accusative", "Die Zeitung berichtet über die Studie.", "The newspaper reports on the study."],
        ["hervorheben", "etwas hervorheben", "emphasize something", "hervorheben · hat hervorgehoben", "Die Sprecherin hebt einen Punkt hervor.", "The spokesperson emphasizes one point."],
        ["bezweifeln", "etwas bezweifeln", "doubt something", "bezweifeln · hat bezweifelt", "Fachleute bezweifeln die Aussage.", "Experts doubt the statement."],
        ["zufolge", "einer Quelle zufolge", "according to a source", "dative + zufolge", "Der Studie zufolge sinken die Kosten.", "According to the study, costs are falling."],
        ["angaben", "nach Angaben von", "according to information from", "nach Angaben von + dative", "Nach Angaben der Stadt beginnt der Bau im Mai.", "According to the city, construction begins in May."],
        ["angeblich", "angeblich", "allegedly", "angeblich geschehen", "Die Datei wurde angeblich gelöscht.", "The file was allegedly deleted."],
        ["nachweisen", "etwas nachweisen", "demonstrate with evidence", "nachweisen · hat nachgewiesen", "Die Wirkung ist noch nicht nachgewiesen.", "The effect has yet to be demonstrated."],
        ["glaubwuerdig", "glaubwürdig wirken", "appear credible", "glaubwürdig wirken", "Die Erklärung wirkt glaubwürdig.", "The explanation appears credible.", ["glaubwuerdig"]],
        ["widerspruechlich", "widersprüchliche Angaben", "conflicting information", "widersprüchliche Angaben", "Die Quellen machen widersprüchliche Angaben.", "The sources give conflicting information.", ["widerspruechliche Angaben"]]
      ],
      questions: [
        ["figures", "KONJUNKTIV I", "A spokesperson comments on preliminary data.", "Report: The spokesperson says, 'The figures are preliminary.'", ["Die Sprecherin sagt, die Zahlen seien vorläufig.", "Die Sprecherin sagt, die Zahlen seien vorlaeufig."], "Seien marks the sentence as reported information.", ["berichten"]],
        ["data", "REPORTED PERFECT", "Researchers describe a completed check.", "Report: The researchers say, 'We checked all the data.'", ["Die Forschenden sagen, sie hätten alle Daten geprüft.", "Die Forschenden sagen, sie haetten alle Daten geprueft."], "Hätten keeps the reported form distinct from indicative haben.", ["nachweisen"]],
        ["future", "REPORTED FUTURE", "An author promises publication tomorrow.", "Report: The author says, 'I will publish the report tomorrow.'", ["Der Autor sagt, er werde den Bericht morgen veröffentlichen.", "Der Autor sagt, er werde den Bericht morgen veroeffentlichen."], "Konjunktiv I of werden is werde.", ["behaupten"]],
        ["according", "SOURCE FRAME", "A study reports increased usage.", "Rewrite with zufolge.", ["Der Studie zufolge ist die Nutzung gestiegen.", "Der Studie zufolge stieg die Nutzung."], "Zufolge normally follows the dative source.", ["zufolge"]]
      ],
      input: { script: "Im Morgenmagazin erklärte eine Sprecherin des Verkehrsverbunds, die Zahl der Fahrgäste sei gestiegen. Die endgültige Auswertung liege jedoch noch nicht vor. Ein Fahrgastverband teilte mit, einzelne Linien seien weiterhin stark überfüllt.", listenPrompt: "Welche Auswertung liegt noch nicht vor?", listenAnswers: ["Die endgültige Auswertung.", "Die endgültige Auswertung liegt noch nicht vor."], passage: "Quelle A meldet, die Nutzung sei deutlich gestiegen. Quelle B spricht von einem leichten Anstieg und weist auf eine veränderte Zählmethode hin. Beide Quellen nennen denselben Zeitraum, bewerten die Daten jedoch unterschiedlich.", readPrompt: "Worin unterscheiden sich die Quellen?", readAnswers: ["Sie bewerten die Stärke des Anstiegs unterschiedlich.", "Quelle A nennt einen deutlichen Anstieg, Quelle B einen leichten Anstieg und eine veränderte Zählmethode."] },
      task: { writingPrompt: "Write a 160 to 200 word comparison of two source accounts. Preserve uncertainty and mark every attributed claim.", minWords: 160, guide: ["Identify both sources", "Use Konjunktiv I three times", "Use zufolge or nach Angaben", "Name one agreement and one conflict", "End with an open question"], required: ["zufolge", "sei"], model: "Quelle A berichtet, die Nutzung sei deutlich gestiegen. Quelle B zufolge habe es ebenfalls einen Anstieg gegeben, dieser falle jedoch geringer aus. Beide Quellen beziehen sich auf denselben Zeitraum. Quelle B hebt hervor, die Zählmethode sei verändert worden. Dadurch könnten die Werte nur eingeschränkt vergleichbar sein. Eine abschließende Bewertung ist erst möglich, wenn die genaue Methode veröffentlicht wird.", speakingPrompt: "Give a 90-second source briefing with one unresolved question.", speakingGuide: ["Identify the source", "Report the main statement", "Preserve uncertainty", "Mention conflicting information", "End with one open question"], speakingRequired: ["sei", "quelle"], speakingModel: "Der Verkehrsverbund erklärt, die Fahrgastzahl sei gestiegen. Eine endgültige Auswertung liege noch nicht vor. Ein Fahrgastverband berichtet dagegen, einzelne Linien seien weiterhin überfüllt. Offen bleibt, wie die Daten erhoben wurden." },
      culture: ["Marking unconfirmed reports", "German news writing commonly marks the origin of information and the degree of confirmation. Rumors, assumptions, and unconfirmed reports should remain recognizable as such.", "German Press Council", "https://www.presserat.de/files/presserat/dokumente/download/DEPR-2025-0741_Pressekodex_A5_v9.pdf", ["angeblich", "laut", "zufolge"]]
    }),

    M({
      id: "b2-prozesse", level: "B2", code: "B2.3", title: "Processes and administrative German", subtitle: "Decode official procedures and choose among passive alternatives.",
      canDo: ["Understand an administrative procedure", "Describe a process without naming every actor", "Distinguish an action from its resulting state", "Rewrite dense instructions in clear everyday German"],
      grammar: [
        ["Process passive", "Werden plus participle describes an action in progress or a recurring procedure.", "Die Anträge werden geprüft.", "The applications are checked."],
        ["State passive", "Sein plus participle describes the result or current state.", "Die Räume sind reserviert.", "The rooms are reserved."],
        ["Passive alternatives", "Sich lassen expresses feasibility. Sein plus zu infinitive gives a compact requirement.", "Die Datei lässt sich öffnen. Die Frist ist einzuhalten.", "The file can be opened. The deadline must be met."]
      ],
      words: [
        ["antrag", "einen Antrag stellen", "submit an application", "der Antrag · die Anträge", "Der Antrag wird online gestellt.", "The application is submitted online."],
        ["bearbeiten", "einen Antrag bearbeiten", "process an application", "bearbeiten · wird bearbeitet", "Der Antrag wird innerhalb von zwei Wochen bearbeitet.", "The application is processed within two weeks."],
        ["genehmigen", "einen Antrag genehmigen", "approve an application", "genehmigen · wird genehmigt", "Der Antrag wurde genehmigt.", "The application was approved."],
        ["ablehnen", "einen Antrag ablehnen", "reject an application", "ablehnen · wird abgelehnt", "Der Antrag kann abgelehnt werden.", "The application can be rejected."],
        ["nachweis", "einen Nachweis erbringen", "provide proof", "der Nachweis · die Nachweise", "Fehlende Nachweise sind nachzureichen.", "Missing proof must be supplied."],
        ["frist", "eine Frist einhalten", "meet a deadline", "die Frist · die Fristen", "Die Frist ist einzuhalten.", "The deadline must be met."],
        ["zustaendig", "für etwas zuständig sein", "be responsible for something", "zuständig sein für", "Diese Stelle ist für Anträge zuständig.", "This office is responsible for applications."],
        ["voraussetzung", "eine Voraussetzung erfüllen", "meet a requirement", "Voraussetzungen erfüllen", "Alle Voraussetzungen sind erfüllt.", "All requirements are met."],
        ["nachreichen", "Unterlagen nachreichen", "submit missing documents later", "nachreichen · hat nachgereicht", "Die Unterlagen müssen nachgereicht werden.", "The documents must be submitted later."],
        ["entscheidung", "eine Entscheidung treffen", "make a decision", "eine Entscheidung treffen", "Die Entscheidung wird schriftlich mitgeteilt.", "The decision is communicated in writing."]
      ],
      questions: [
        ["applications", "PROCESS PASSIVE", "The team evaluates applications by Friday.", "Put the sentence in the passive.", ["Die Anträge werden vom Team bis Freitag ausgewertet.", "Bis Freitag werden die Anträge vom Team ausgewertet."], "The object becomes the grammatical subject. Werden and the participle form the verb bracket.", ["antrag", "bearbeiten"]],
        ["rooms", "STATE PASSIVE", "Someone has already reserved the rooms.", "Describe the present state.", ["Die Räume sind bereits reserviert.", "Die Raeume sind bereits reserviert."], "The reservation is presented as a current state.", ["entscheidung"]],
        ["proof", "MODAL PASSIVE", "Missing proof has to be supplied.", "Rewrite in the modal passive.", ["Fehlende Nachweise müssen nachgereicht werden.", "Fehlende Nachweise muessen nachgereicht werden."], "The modal verb is finite. The participle and werden close the sentence.", ["nachweis", "nachreichen"]],
        ["software", "PASSIVE ALTERNATIVE", "The software can be updated easily.", "Rewrite with sich lassen.", ["Die Software lässt sich leicht aktualisieren.", "Die Software laesst sich leicht aktualisieren."], "Sich lassen plus infinitive expresses feasibility.", ["bearbeiten"]]
      ],
      input: { script: "Anträge können online oder persönlich eingereicht werden. Nach dem Eingang werden die Angaben auf Vollständigkeit geprüft. Fehlende Nachweise sind innerhalb von vierzehn Tagen nachzureichen.", listenPrompt: "Wie lange hat man Zeit, fehlende Nachweise einzureichen?", listenAnswers: ["Vierzehn Tage.", "Fehlende Nachweise sind innerhalb von vierzehn Tagen nachzureichen."], passage: "Sobald alle Voraussetzungen erfüllt sind, wird über den Antrag entschieden. Der aktuelle Bearbeitungsstand lässt sich im Serviceportal einsehen. Rückfragen werden unter Angabe des Aktenzeichens beantwortet.", readPrompt: "Wo kann man den Bearbeitungsstand sehen?", readAnswers: ["Im Serviceportal.", "Der Bearbeitungsstand lässt sich im Serviceportal einsehen."] },
      task: { writingPrompt: "Explain a familiar process in 150 to 190 words. Use a chronological sequence and clear actions.", minWords: 150, guide: ["Use three process passive forms", "Use one state passive", "Use sich lassen", "Name a deadline", "State who is responsible"], required: ["werden", "lässt"], model: "Der Antrag wird zunächst online eingereicht. Nach dem Eingang werden die Angaben geprüft. Falls Unterlagen fehlen, müssen sie innerhalb von vierzehn Tagen nachgereicht werden. Der Bearbeitungsstand lässt sich im Portal einsehen. Sobald alle Voraussetzungen erfüllt sind, wird eine Entscheidung getroffen. Ist der Antrag genehmigt, wird der Bescheid schriftlich versandt. Für Rückfragen ist die Servicestelle zuständig.", speakingPrompt: "Explain an official procedure in plain spoken German.", speakingGuide: ["Give five steps in order", "Translate one dense instruction into a direct action", "Name the deadline", "Explain where to check progress"], speakingRequired: ["zuerst", "danach"], speakingModel: "Zuerst reichen Sie den Antrag online ein. Danach prüft die Stelle Ihre Angaben. Fehlen Dokumente, schicken Sie diese innerhalb von vierzehn Tagen. Den Stand sehen Sie im Portal. Am Ende erhalten Sie eine schriftliche Entscheidung." },
      culture: ["Dense official style", "Official German frequently uses passive forms and compressed instructions. Finding the action, actor, deadline, and required document makes these texts easier to use.", "IDS Grammis", "https://grammis.ids-mannheim.de/systematische-grammatik/930", ["wird bearbeitet", "ist einzuhalten", "lässt sich"]]
    }),

    M({
      id: "b2-register", level: "B2", code: "B2.4", title: "Professional and formal register", subtitle: "Shift register, nominalize actions, and write concise professional messages.",
      canDo: ["Write a concise professional email", "Shift between conversational and formal wording", "Use common noun-verb combinations accurately", "Make requests with an appropriate level of formality"],
      grammar: [
        ["Nominalization", "Turn an action into a noun phrase to compress formal writing. Watch article, gender, and genitive endings.", "Nach gründlicher Prüfung Ihres Antrags melden wir uns.", "After careful review of your application, we will contact you."],
        ["Noun-verb combinations", "Formal German often packages a common idea in a stable noun-verb combination.", "eine Entscheidung treffen · etwas in Betracht ziehen", "make a decision · consider something"],
        ["Formal condition", "Prepositional phrases can replace a longer conditional clause in concise professional writing.", "Bei Interesse an einer Teilnahme melden Sie sich bis Montag an.", "If interested in participating, register by Monday."]
      ],
      words: [
        ["entscheidung", "eine Entscheidung treffen", "make a decision", "eine Entscheidung treffen", "Wir treffen die Entscheidung morgen.", "We make the decision tomorrow."],
        ["betracht", "etwas in Betracht ziehen", "consider something", "in Betracht ziehen", "Wir ziehen zwei Termine in Betracht.", "We are considering two dates."],
        ["verfuegung", "zur Verfügung stehen", "be available", "jemandem zur Verfügung stehen", "Für Rückfragen stehe ich gern zur Verfügung.", "I am available for questions.", ["zur Verfuegung stehen"]],
        ["massnahmen", "Maßnahmen ergreifen", "take measures", "Maßnahmen ergreifen", "Das Unternehmen ergreift neue Maßnahmen.", "The company is taking new measures.", ["Massnahmen ergreifen"]],
        ["rueckmeldung", "eine Rückmeldung geben", "provide feedback", "um Rückmeldung bitten", "Vielen Dank für Ihre Rückmeldung.", "Thank you for your reply.", ["Rueckmeldung"]],
        ["anfrage", "eine Anfrage bearbeiten", "process an inquiry", "die Anfrage · die Anfragen", "Ihre Anfrage wird bearbeitet.", "Your inquiry is being processed."],
        ["beziehen", "sich auf etwas beziehen", "refer to something", "sich beziehen auf + accusative", "Ich beziehe mich auf unser Gespräch.", "I refer to our conversation."],
        ["hinblick", "im Hinblick auf", "with regard to", "im Hinblick auf + accusative", "Im Hinblick auf die Kosten brauchen wir Klarheit.", "With regard to the costs, we need clarity."],
        ["zweckmaessig", "zweckmäßig", "practical / appropriate", "eine zweckmäßige Lösung", "Diese Vorgehensweise ist zweckmäßig.", "This approach is practical.", ["zweckmaessig"]],
        ["nachvollziehbar", "nachvollziehbar", "understandable / traceable", "eine nachvollziehbare Begründung", "Die Entscheidung ist nachvollziehbar.", "The decision is understandable."]
      ],
      questions: [
        ["review", "NOMINALIZATION", "A review comes before the reply.", "Begin with a nominal phrase: We will contact you after carefully reviewing your application.", ["Nach gründlicher Prüfung Ihres Antrags melden wir uns.", "Nach gruendlicher Pruefung Ihres Antrags melden wir uns."], "Prüfen becomes Prüfung, and the object appears in the genitive.", ["anfrage"]],
        ["interest", "FORMAL REGISTER", "A registration depends on interest.", "Make this more formal: If you want to participate, register by Monday.", ["Bei Interesse an einer Teilnahme melden Sie sich bitte bis Montag an."], "Bei Interesse an forms a compact formal condition.", ["zweckmaessig"]],
        ["documents", "NOMINALIZATION", "You request that documents be sent.", "Rewrite: We ask you to send us the documents.", ["Wir bitten um Zusendung der Unterlagen."], "Um governs the accusative noun phrase Zusendung der Unterlagen.", ["rueckmeldung"]],
        ["costs", "NOUN-VERB COMBINATION", "Costs also deserve consideration.", "Rewrite with in Betracht ziehen.", ["Wir ziehen auch die Kosten in Betracht."], "In Betracht ziehen is a fixed expression.", ["betracht"]]
      ],
      input: { script: "Sehr geehrte Frau Keller, ich beziehe mich auf unser Gespräch vom zwölften Mai. Nach interner Prüfung können wir den vorgeschlagenen Termin bestätigen. Für die Vorbereitung benötigen wir noch die aktuelle Teilnehmerliste.", listenPrompt: "Worauf bezieht sich die Nachricht?", listenAnswers: ["Auf das Gespräch vom zwölften Mai.", "Die Nachricht bezieht sich auf das Gespräch vom zwölften Mai."], passage: "Wir bitten um Zusendung der Teilnehmerliste sowie um Angaben zur technischen Ausstattung bis zum 20. Mai. Für Rückfragen stehe ich Ihnen gern zur Verfügung. Mit freundlichen Grüßen, Daniel Roth", readPrompt: "Welche zwei Informationen werden benötigt?", readAnswers: ["Die Teilnehmerliste und Angaben zur technischen Ausstattung.", "Benötigt werden die Teilnehmerliste und Angaben zur technischen Ausstattung."] },
      task: { writingPrompt: "Write a professional email of 150 to 190 words. Refer to an earlier conversation, confirm one detail, request two pieces of information, give a deadline and reason, and close professionally.", minWords: 150, guide: ["Use a formal greeting and closing", "Use two nominalizations", "Use one noun-verb combination", "Give a precise deadline", "Offer a contact route"], required: ["beziehe", "rückmeldung"], model: "Sehr geehrte Frau Keller, ich beziehe mich auf unser Gespräch vom 12. Mai. Nach interner Prüfung können wir den vorgeschlagenen Termin bestätigen. Für die Vorbereitung benötigen wir die aktuelle Teilnehmerliste sowie Angaben zur technischen Ausstattung. Wir bitten um Zusendung der Unterlagen bis zum 20. Mai, damit ausreichend Zeit für die Planung bleibt. Im Hinblick auf die Raumgröße ziehen wir außerdem eine zweite Bestuhlung in Betracht. Für Rückfragen stehe ich Ihnen gern zur Verfügung. Mit freundlichen Grüßen, Daniel Roth", speakingPrompt: "Give a concise formal update on a project and request two actions.", speakingGuide: ["Refer to an earlier conversation", "Confirm one decision", "Use two noun-verb combinations", "State a deadline", "Invite questions"], speakingRequired: ["beziehe", "rückmeldung"], speakingModel: "Ich beziehe mich auf unser Gespräch vom Montag. Wir haben eine Entscheidung getroffen und bestätigen den Termin. Bitte senden Sie uns die Teilnehmerliste bis Freitag. Für Rückfragen stehe ich Ihnen gern zur Verfügung." },
      culture: ["Register follows the relationship", "Du and Sie depend on relationship, workplace culture, age, and setting. Follow the form already used by the other person. A change to du is usually explicit.", "Goethe-Institut", "https://www.goethe.de/de/m/spr/ueb/daa/all/ds0/ds2.html", ["du", "Sie", "Mit freundlichen Grüßen"]]
    }),

    M({
      id: "b2-relativ-partizip", level: "B2", code: "B2.5", title: "Decode dense sentences", subtitle: "Control relative pronouns, possession, and participial attributes.",
      canDo: ["Follow long noun phrases in reports", "Use relative pronouns after prepositions", "Express possession with dessen and deren", "Expand and reduce participial attributes"],
      grammar: [
        ["Prepositional relative", "The preposition controls the relative pronoun's case.", "Die Kollegin, mit der ich das Projekt leitete, spricht heute.", "The colleague with whom I led the project speaks today."],
        ["Possessive relative", "Dessen refers to a masculine or neuter possessor. Deren refers to a feminine or plural possessor.", "Der Autor, dessen Buch erschien, hält einen Vortrag.", "The author whose book appeared gives a talk."],
        ["Participial attribute", "A participle before a noun can compress a relative clause. Find the head noun first, then unpack the modifiers.", "die gestern veröffentlichten Daten", "the data published yesterday"]
      ],
      words: [
        ["massnahme", "die Maßnahme, die Maßnahmen", "measure", "eine Maßnahme umsetzen", "Die beschlossene Maßnahme gilt ab Mai.", "The adopted measure applies from May.", ["die Massnahme"]],
        ["beteiligte", "die Beteiligten", "people involved", "alle Beteiligten", "Alle Beteiligten wurden informiert.", "Everyone involved was informed."],
        ["voraussetzung", "die Voraussetzung, die Voraussetzungen", "prerequisite", "unter der Voraussetzung, dass", "Die Finanzierung ist eine Voraussetzung.", "Funding is a prerequisite."],
        ["zusammenhang", "der Zusammenhang, die Zusammenhänge", "connection", "in diesem Zusammenhang", "Der Zusammenhang ist komplex.", "The connection is complex."],
        ["herausforderung", "die Herausforderung, die Herausforderungen", "challenge", "eine Herausforderung bewältigen", "Die Finanzierung bleibt eine Herausforderung.", "Funding remains a challenge."],
        ["erkenntnis", "die Erkenntnis, die Erkenntnisse", "finding / insight", "zu einer Erkenntnis gelangen", "Die gewonnenen Erkenntnisse werden genutzt.", "The findings are used."],
        ["vorgehensweise", "die Vorgehensweise, die Vorgehensweisen", "approach", "eine Vorgehensweise wählen", "Die gewählte Vorgehensweise war erfolgreich.", "The chosen approach was successful."],
        ["zeitraum", "der Zeitraum, die Zeiträume", "period", "in einem Zeitraum von", "Der untersuchte Zeitraum umfasst drei Jahre.", "The period studied covers three years."],
        ["betroffen", "die betroffene Person", "person affected", "betroffen sein von", "Betroffene Personen erhalten Hilfe.", "People affected receive help."],
        ["vorliegend", "die vorliegenden Daten", "available data", "vorliegende Daten", "Die vorliegenden Daten reichen nicht aus.", "The available data are insufficient."]
      ],
      questions: [
        ["colleague", "PREPOSITIONAL RELATIVE", "You identify a colleague through a shared project.", "Join: That is the colleague. I led the project with her.", ["Das ist die Kollegin, mit der ich das Projekt geleitet habe."], "Mit requires dative, so the feminine relative pronoun is der.", ["beteiligte"]],
        ["author", "POSSESSIVE RELATIVE", "The author's book received an award.", "Join: The author gives a talk. His book was awarded a prize.", ["Der Autor, dessen Buch ausgezeichnet wurde, hält einen Vortrag."], "Dessen refers to a masculine possessor.", ["erkenntnis"]],
        ["all", "RELATIVE WAS", "The information follows alles.", "Complete: Alles, ___ wir bisher wissen, stammt aus einer Quelle.", ["Alles, was wir bisher wissen, stammt aus einer Quelle."], "Was commonly follows alles.", ["vorliegend"]],
        ["published", "PARTICIPIAL ATTRIBUTE", "The data were published yesterday.", "Reduce: The data that were published yesterday show a decline.", ["Die gestern veröffentlichten Daten zeigen einen Rückgang.", "Die gestern veroeffentlichten Daten zeigen einen Rueckgang."], "The past participle describes the data before the noun.", ["vorliegend"]]
      ],
      input: { script: "Die im vergangenen Jahr gestartete Initiative unterstützt Haushalte, deren Energiekosten stark gestiegen sind. Besonders gefragt sind Beratungen, bei denen konkrete Verbrauchsdaten ausgewertet werden.", listenPrompt: "Wessen Energiekosten sind stark gestiegen?", listenAnswers: ["Die Energiekosten der unterstützten Haushalte.", "Die Energiekosten der Haushalte."], passage: "Die daraus gewonnenen Erkenntnisse sollen in ein neues Förderprogramm einfließen. Noch ungeklärt ist die Frage, mit welchen Mitteln das auf drei Jahre angelegte Programm finanziert werden kann.", readPrompt: "Wie lange ist das Programm angelegt?", readAnswers: ["Auf drei Jahre.", "Das Programm ist auf drei Jahre angelegt."] },
      task: { writingPrompt: "Write 160 to 200 words about a local project. Include the people involved, the problem, measures already introduced, and one unresolved question.", minWords: 160, guide: ["Use two relative clauses", "Use dessen or deren", "Use two participial attributes", "Unpack one dense noun phrase during revision"], required: ["dessen", "der"], model: "Die im vergangenen Jahr gestartete Initiative unterstützt Haushalte, deren Energiekosten deutlich gestiegen sind. Die beteiligten Beratungsstellen bieten Termine an, bei denen konkrete Verbrauchsdaten ausgewertet werden. Die daraus gewonnenen Erkenntnisse fließen in ein neues Förderprogramm ein. Noch ungeklärt ist die Finanzierung des auf drei Jahre angelegten Programms. Der Ausschuss, dessen Entscheidung im Juni erwartet wird, prüft derzeit mehrere Modelle.", speakingPrompt: "Describe a local project with precise references to people, measures, and findings.", speakingGuide: ["Use two relative clauses", "Use one possessive relative", "Expand one participial phrase while speaking", "End with an unresolved question"], speakingRequired: ["deren", "die"], speakingModel: "Die Initiative, die im letzten Jahr gestartet wurde, hilft betroffenen Haushalten. Die Beratenden, deren Erfahrung besonders wichtig ist, werten Verbrauchsdaten aus. Die gewonnenen Erkenntnisse fließen in ein neues Programm ein. Offen bleibt die Finanzierung." },
      culture: ["Finding the head noun", "Extended attributes appear frequently in reporting, administration, and academic writing. Reading becomes easier when you find the head noun first and then identify each modifier.", "IDS Grammis", "https://grammis.ids-mannheim.de/systematische-grammatik/748", ["das Hauptwort", "das Partizip", "der Relativsatz"]]
    }),

    M({
      id: "b2-haltung", level: "B2", code: "B2.6", title: "Certainty, stance, and conversational tone", subtitle: "Express probability, hearsay, and softened reactions.",
      canDo: ["Express different degrees of certainty", "Report hearsay through modal verbs", "Recognize how particles shape tone", "Soften advice, disagreement, and invitations"],
      grammar: [
        ["Probability", "Dürfte presents a careful inference. Muss expresses a strong inference. Könnte leaves more uncertainty.", "Die Nachfrage dürfte gestiegen sein.", "Demand has probably increased."],
        ["Hearsay and self-claim", "Sollen attributes information to outside reports. Wollen can report what a subject claims about themself.", "Die Firma soll Stellen abbauen. Der Leiter will nichts gewusst haben.", "The company is said to be cutting jobs. The manager claims to have known nothing."],
        ["Modal particles", "Doch, wohl, eben, ja, and denn shape tone through context, stress, and shared expectations.", "Komm doch morgen vorbei.", "Why not come by tomorrow?"],
        ["Need with negative", "Brauchen plus zu infinitive often appears with a negative or limiting expression.", "Du brauchst das heute nicht abzuschicken.", "You do not need to send that today."]
      ],
      words: [
        ["vermutlich", "vermutlich", "presumably", "vermutlich der Fall sein", "Die Nachfrage ist vermutlich gestiegen.", "Demand has presumably increased."],
        ["offenbar", "offenbar", "apparently", "offenbar zutreffen", "Die Erklärung trifft offenbar zu.", "The explanation apparently holds."],
        ["angeblich", "angeblich", "allegedly", "angeblich geschehen", "Die Firma plant angeblich Entlassungen.", "The company allegedly plans layoffs."],
        ["zweifellos", "zweifellos", "undoubtedly", "zweifellos wichtig", "Die Frage ist zweifellos wichtig.", "The question is undoubtedly important."],
        ["tendenziell", "tendenziell", "generally tending to", "tendenziell steigen", "Die Werte steigen tendenziell.", "The values generally tend to rise."],
        ["weitgehend", "weitgehend", "largely", "weitgehend abgeschlossen", "Die Prüfung ist weitgehend abgeschlossen.", "The review is largely complete."],
        ["einraeumen", "etwas einräumen", "concede a point", "einräumen, dass", "Die Autorin räumt ein, dass Daten fehlen.", "The author concedes that data are missing.", ["einraeumen"]],
        ["vermutung", "eine Vermutung äußern", "express an assumption", "eine Vermutung äußern", "Er äußert eine vorsichtige Vermutung.", "He expresses a cautious assumption."],
        ["bedenken", "Bedenken haben", "have concerns", "Bedenken gegen etwas haben", "Wir haben Bedenken gegen den Plan.", "We have concerns about the plan."],
        ["durchaus", "durchaus", "certainly / quite", "durchaus möglich", "Das ist durchaus möglich.", "That is certainly possible."]
      ],
      questions: [
        ["probability", "INFERENCE", "You make a careful inference from available figures.", "Say: Demand has probably increased. Use dürfte.", ["Die Nachfrage dürfte gestiegen sein.", "Die Nachfrage duerfte gestiegen sein."], "Dürfte plus participle and sein presents a careful inference.", ["vermutlich"]],
        ["hearsay", "HEARSAY", "Media reports mention possible layoffs.", "Say: The company is said to be planning layoffs.", ["Die Firma soll Entlassungen planen."], "Sollen attributes the information to outside reports.", ["angeblich"]],
        ["claim", "SELF-CLAIM", "A manager claims that he did not receive the warning.", "Report the claim with wollen.", ["Der Geschäftsführer will die Warnung nicht erhalten haben.", "Der Geschaeftsfuehrer will die Warnung nicht erhalten haben."], "This use of wollen reports what the subject claims about himself.", ["einraeumen"]],
        ["need", "BRAUCHEN ZU", "The form does not need to be sent today.", "Rewrite with brauchen.", ["Du brauchst das Formular heute nicht abzuschicken."], "A separable infinitive places zu between prefix and verb stem.", ["weitgehend"]]
      ],
      input: { script: "Du hast den Bericht wohl schon gelesen. Ja, aber die Zahlen sind eben noch vorläufig. Wir könnten die wichtigsten Ergebnisse doch trotzdem vorstellen. Das geht schon, solange wir die Unsicherheit klar erwähnen.", listenPrompt: "Warum sollen sie die Unsicherheit erwähnen?", listenAnswers: ["Weil die Zahlen noch vorläufig sind.", "Die Zahlen sind noch vorläufig."] , passage: "Die Nachfrage dürfte im letzten Quartal gestiegen sein. Endgültige Daten liegen noch nicht vor. Ein Branchenverband will bereits eine deutliche Erholung beobachtet haben. Fachleute äußern jedoch Bedenken, weil die Stichprobe klein ist.", readPrompt: "Wie sicher ist der beschriebene Anstieg?", readAnswers: ["Er ist noch nicht sicher bestätigt.", "Der Anstieg ist eine vorsichtige Vermutung, weil endgültige Daten fehlen."] },
      task: { writingPrompt: "Write 160 to 200 words that evaluate an uncertain report. Distinguish inference, hearsay, a source's own claim, and confirmed information.", minWords: 160, guide: ["Use dürfte", "Use sollen", "Use wollen for a self-claim", "Use one concession", "State the evidence limit"], required: ["dürfte", "soll"], model: "Die Nachfrage dürfte im letzten Quartal gestiegen sein, endgültige Daten liegen jedoch noch nicht vor. Ein Branchenverband will bereits eine deutliche Erholung beobachtet haben. Mehrere Medien berichten außerdem, die Verkäufe sollen in einzelnen Regionen stark zugenommen haben. Diese Angaben wirken durchaus plausibel. Dennoch ist die Stichprobe klein, was die Aussagekraft begrenzt. Eine sichere Bewertung ist erst nach Veröffentlichung der vollständigen Daten möglich.", speakingPrompt: "Respond to a proposal with a cautious inference, one concern, one concession, and a softened recommendation.", speakingGuide: ["Use dürfte or könnte", "State one concern", "Concede one positive point", "Use doch in a suggestion", "End with a practical next step"], speakingRequired: ["könnte", "doch"], speakingModel: "Der Plan könnte funktionieren. Ich habe allerdings Bedenken wegen der Kosten. Die Vorteile sind durchaus überzeugend. Wir könnten doch zunächst einen kleinen Versuch starten und die Ergebnisse prüfen." },
      culture: ["Modal particles in conversation", "Modal particles are frequent in spoken German. Their effect depends on sentence type, stress, shared expectations, and context. Full exchanges provide the clearest practice.", "IDS Grammis", "https://grammis.ids-mannheim.de/systematische-grammatik/392", ["doch", "wohl", "eben"]]
    }),

    M({
      id: "b2-kohaesion", level: "B2", code: "B2.7", title: "Connections and mediation", subtitle: "Link ideas, explain causal chains, and relay useful content.",
      canDo: ["Link ideas across several sentences", "Use pronominal adverbs with topics and things", "Explain a method, cause, and result", "Relay the useful content of a German text"],
      grammar: [
        ["Da and wo compounds", "Use da compounds to refer back to a thing or topic. Use wo compounds to ask about it.", "Der Text bezieht sich darauf. Worauf bezieht er sich?", "The text refers to that. What does it refer to?"],
        ["Method", "Indem and dadurch, dass explain how a result is achieved.", "Das Team senkte Fehler, indem es doppelt prüfte.", "The team reduced errors by checking twice."],
        ["Result", "Sodass introduces a result and places the verb group at the end.", "Mehr Freiwillige kamen, sodass das Café länger öffnen konnte.", "More volunteers came, so the café could stay open longer."],
        ["Without a second action", "Ohne dass connects two clauses whose subjects may differ.", "Die Kosten sanken, ohne dass Stellen abgebaut wurden.", "Costs fell without jobs being cut."]
      ],
      words: [
        ["beziehen", "sich auf etwas beziehen", "refer to something", "sich beziehen auf + accusative", "Der Text bezieht sich auf die Studie.", "The text refers to the study."],
        ["ausgehen", "von etwas ausgehen", "assume / start from", "ausgehen von + dative", "Wir gehen von stabilen Preisen aus.", "We assume stable prices."],
        ["fuehren", "zu etwas führen", "lead to something", "führen zu + dative", "Die Änderung führt zu weniger Fehlern.", "The change leads to fewer errors.", ["fuehren"]],
        ["abhaengen", "von etwas abhängen", "depend on something", "abhängen von + dative", "Der Erfolg hängt von Ersatzteilen ab.", "Success depends on spare parts.", ["abhaengen"]],
        ["beitragen", "zu etwas beitragen", "contribute to something", "beitragen zu + dative", "Reparaturen tragen zum Umweltschutz bei.", "Repairs contribute to environmental protection."],
        ["auseinandersetzen", "sich mit etwas auseinandersetzen", "engage critically with", "sich auseinandersetzen mit + dative", "Der Artikel setzt sich mit Kosten auseinander.", "The article engages with costs."],
        ["ausschliessen", "etwas ausschließen", "rule something out", "ausschließen · hat ausgeschlossen", "Ein Fehler lässt sich nicht ausschließen.", "An error cannot be ruled out.", ["ausschliessen"]],
        ["zurueckfuehren", "auf etwas zurückzuführen sein", "be attributable to", "zurückzuführen sein auf + accusative", "Der Rückgang ist auf niedrigere Kosten zurückzuführen.", "The decline is attributable to lower costs.", ["zurueckzufuehren"]],
        ["demgegenueber", "demgegenüber", "by comparison", "demgegenüber steht", "Demgegenüber steigen die Personalkosten.", "By comparison, personnel costs are rising.", ["demgegenueber"]],
        ["infolgedessen", "infolgedessen", "consequently", "Satz. Infolgedessen + Verb", "Die Nachfrage sank. Infolgedessen wurde die Produktion reduziert.", "Demand fell. Consequently production was reduced."]
      ],
      questions: [
        ["thereon", "DA COMPOUND", "The text refers to the new study.", "Replace the noun phrase with a pronominal adverb.", ["Der Text bezieht sich darauf."], "A thing introduced by auf becomes darauf.", ["beziehen"]],
        ["topic", "WO COMPOUND", "The group is discussing financing.", "Ask what they are talking about.", ["Worüber sprecht ihr?", "Worueber sprecht ihr?"], "Questions about things use wo plus preposition.", ["auseinandersetzen"]],
        ["method", "INDEM", "A second control reduced errors.", "Join: The team reduced the error rate. It introduced a second check.", ["Das Team senkte die Fehlerquote, indem es eine zweite Kontrolle einführte.", "Das Team senkte die Fehlerquote, indem es eine zweite Kontrolle einfuehrte."], "Indem explains the method.", ["fuehren"]],
        ["result", "SODASS", "More volunteers allowed longer opening hours.", "Join: More volunteers came. The café could stay open longer.", ["Mehr Freiwillige kamen, sodass das Café länger öffnen konnte.", "Mehr Freiwillige kamen, sodass das Cafe laenger oeffnen konnte."], "Sodass introduces the result.", ["beitragen"]]
      ],
      input: { script: "Repair Cafés bringen Menschen zusammen, die defekte Alltagsgegenstände gemeinsam instand setzen. Ehrenamtliche unterstützen mit Werkzeug und Erfahrung. Dadurch können Geräte länger genutzt werden, sodass weniger Abfall entsteht.", listenPrompt: "Wodurch können Geräte länger genutzt werden?", listenAnswers: ["Durch die Unterstützung mit Werkzeug und Erfahrung.", "Ehrenamtliche helfen mit Werkzeug und Erfahrung."], passage: "Der Erfolg einer Reparatur hängt vom Schaden und von verfügbaren Ersatzteilen ab. Für viele Teilnehmende gehört auch der Austausch von Wissen zum Reiz des Angebots. Reparaturen tragen dadurch sowohl zur Abfallvermeidung als auch zur Gemeinschaft bei.", readPrompt: "Wovon hängt der Erfolg einer Reparatur ab?", readAnswers: ["Vom Schaden und von verfügbaren Ersatzteilen.", "Der Erfolg hängt vom Schaden und von verfügbaren Ersatzteilen ab."] },
      task: { writingPrompt: "Relay the Repair Café text in 130 to 170 words for a neighbor who needs the purpose, volunteer role, two benefits, and one practical limitation.", minWords: 130, guide: ["Use original phrasing", "Use two da compounds", "Use indem or dadurch, dass", "Use sodass for a result", "State one limitation"], required: ["dadurch", "sodass"], model: "Ein Repair Café hilft Menschen dabei, defekte Alltagsgegenstände gemeinsam zu reparieren. Ehrenamtliche tragen dazu bei, indem sie Werkzeug und Erfahrung bereitstellen. Dadurch können Geräte länger genutzt werden, sodass weniger Abfall entsteht. Außerdem wird Wissen weitergegeben. Der Erfolg hängt jedoch vom Schaden und von verfügbaren Ersatzteilen ab. Vor einem Besuch sollte man deshalb prüfen, welche Gegenstände angenommen werden und ob eine Anmeldung erforderlich ist.", speakingPrompt: "Explain a causal chain from activity to method, result, wider benefit, and limitation.", speakingGuide: ["Name the activity", "Explain the method with indem", "Give a result with sodass", "Use one da compound", "State a limiting factor"], speakingRequired: ["indem", "sodass"], speakingModel: "Freiwillige helfen, indem sie Werkzeug und Erfahrung teilen. Dadurch werden Geräte länger genutzt, sodass weniger Abfall entsteht. Der Erfolg hängt allerdings von Ersatzteilen und der Art des Schadens ab." },
      culture: ["Repair Cafés", "Repair Cafés are volunteer initiatives where people repair items together with guidance. They combine resource conservation with community knowledge sharing.", "German Environment Agency", "https://www.umweltbundesamt.de/umwelttipps-fuer-den-alltag/durch-reparaturen-umwelt-schuetzen-geld-sparen", ["reparieren", "das Ehrenamt", "Ressourcen schonen"]]
    }),

    M({
      id: "b2-integration", level: "B2", code: "B2.8", title: "Understand, relay, and persuade", subtitle: "Combine complex reading, source handling, argument, and extended production.",
      canDo: ["Extract arguments from a complex text or talk", "Summarize another viewpoint accurately", "Build a response with evidence and qualification", "Deliver a structured presentation", "Produce a coherent extended text"],
      grammar: [
        ["Integrated cohesion", "Choose connectors according to the relationship: cause, result, concession, condition, method, or added circumstance.", "Die Stadt stellte Geld bereit, wobei die Bevölkerung Projekte vorschlagen konnte.", "The city provided funding, with residents able to propose projects."],
        ["Reported passive", "Konjunktiv I and passive can work together when a source reports a planned process.", "Die Bürgermeisterin sagt, das Verfahren werde ausgewertet.", "The mayor says the procedure will be evaluated."],
        ["Compact revision", "Nominalization can shorten a clause when the actor is already clear or less important.", "Nach der Prüfung der Vorschläge begann die Abstimmung.", "After review of the proposals, voting began."],
        ["Supported conclusion", "Daraus lässt sich schließen, dass frames a conclusion grounded in the preceding evidence.", "Daraus lässt sich schließen, dass Transparenz die Akzeptanz erhöht.", "It follows that transparency increases acceptance."]
      ],
      words: [
        ["eroertern", "ein Thema erörtern", "discuss a topic analytically", "erörtern · hat erörtert", "Der Ausschuss erörtert den Vorschlag.", "The committee discusses the proposal analytically.", ["eroertern"]],
        ["zusammenfassen", "etwas präzise zusammenfassen", "summarize precisely", "zusammenfassen · hat zusammengefasst", "Fassen Sie die Position präzise zusammen.", "Summarize the position precisely."],
        ["stellung", "zu etwas Stellung nehmen", "state a position", "Stellung nehmen zu + dative", "Die Stadt nimmt zu der Kritik Stellung.", "The city responds to the criticism."],
        ["hervorheben", "etwas hervorheben", "emphasize something", "hervorheben · hat hervorgehoben", "Der Bericht hebt zwei Risiken hervor.", "The report highlights two risks."],
        ["veranschaulichen", "etwas veranschaulichen", "illustrate something", "durch ein Beispiel veranschaulichen", "Ein Beispiel veranschaulicht den Konflikt.", "An example illustrates the conflict."],
        ["perspektive", "die Perspektive, die Perspektiven", "perspective", "eine Perspektive einbeziehen", "Der Text bezieht mehrere Perspektiven ein.", "The text includes several perspectives."],
        ["schlussfolgerung", "die Schlussfolgerung, die Schlussfolgerungen", "conclusion", "eine Schlussfolgerung ziehen", "Die Schlussfolgerung folgt aus den Daten.", "The conclusion follows from the data."],
        ["handlungsspielraum", "der Handlungsspielraum", "scope for action", "Handlungsspielraum schaffen", "Die Kommune hat begrenzten Handlungsspielraum.", "The municipality has limited scope for action."],
        ["zielkonflikt", "der Zielkonflikt, die Zielkonflikte", "conflict between goals", "einen Zielkonflikt benennen", "Kosten und Qualität bilden einen Zielkonflikt.", "Cost and quality form a conflict between goals."],
        ["einigung", "eine Einigung erzielen", "reach an agreement", "eine Einigung erzielen", "Die Gruppen erzielen eine Einigung.", "The groups reach an agreement."]
      ],
      questions: [
        ["whereby", "WOBEI", "A city funded projects while residents could propose ideas.", "Join the two facts with wobei.", ["Die Stadt stellte 100.000 Euro bereit, wobei die Bevölkerung Projekte vorschlagen konnte."], "Wobei adds a related circumstance.", ["perspektive"]],
        ["reported", "REPORTED PASSIVE", "The mayor reports a future evaluation.", "Report: The mayor says, 'The procedure will be evaluated in autumn.'", ["Die Bürgermeisterin sagt, das Verfahren werde im Herbst ausgewertet."], "Reported speech and passive appear together in werde ausgewertet.", ["zusammenfassen"]],
        ["nominal", "NOMINALIZATION", "The proposals were reviewed before voting began.", "Begin with a nominalization.", ["Nach der Prüfung der Vorschläge begann die Abstimmung.", "Nach der Pruefung der Vorschlaege begann die Abstimmung."], "The temporal clause becomes a compact prepositional phrase.", ["eroertern"]],
        ["whose", "POSSESSIVE RELATIVE", "Several projects stayed within budget.", "Join: Several projects were selected. Their costs remained within the planned budget.", ["Mehrere Projekte, deren Kosten im vorgesehenen Rahmen blieben, wurden ausgewählt.", "Mehrere Projekte, deren Kosten im vorgesehenen Rahmen blieben, wurden ausgewaehlt."], "Deren refers to the plural possessor Projekte.", ["handlungsspielraum"]]
      ],
      input: { script: "Bei einem Bürgerhaushalt können Einwohnerinnen und Einwohner Vorschläge zur Verwendung eines Teils der kommunalen Mittel einreichen. Je nach Verfahren werden die Ideen öffentlich diskutiert, fachlich geprüft und anschließend zur Abstimmung gestellt.", listenPrompt: "Welche drei Schritte folgen auf die Einreichung?", listenAnswers: ["Öffentliche Diskussion, fachliche Prüfung und Abstimmung.", "Die Ideen werden diskutiert, geprüft und zur Abstimmung gestellt."], passage: "Die Beteiligung eröffnet neue Perspektiven, bringt jedoch auch Zielkonflikte mit sich. Beliebte Projekte müssen finanzierbar und rechtlich umsetzbar sein. Entscheidend für die Akzeptanz ist, dass die Kommune transparent erklärt, welche Vorschläge verwirklicht werden.", readPrompt: "Welche Bedingung wird für Akzeptanz genannt?", readAnswers: ["Transparente Erklärungen der Kommune.", "Die Kommune muss transparent erklären, welche Vorschläge verwirklicht werden."] },
      task: { writingPrompt: "Write a 220 to 260 word proposal about one local issue. Define the issue, summarize two perspectives, identify a goal conflict, propose a feasible measure, explain one limitation, and finish with a supported conclusion.", minWords: 220, guide: ["Summarize both perspectives fairly", "Use reported speech", "Use one passive form", "Name the goal conflict", "Give a feasible measure", "Ground the conclusion in evidence"], required: ["zielkonflikt", "daraus"], model: "Viele Einwohnerinnen und Einwohner wünschen sich einen grüneren Stadtplatz. Geschäftsleute erklären, eine Lieferzone sei weiterhin erforderlich. Anwohnende heben dagegen Lärm und fehlende Sitzplätze hervor. Daraus entsteht ein Zielkonflikt zwischen guter Erreichbarkeit und hoher Aufenthaltsqualität. Vorgeschlagen wird eine kleine Lieferzone, die nur am Morgen genutzt werden darf. Danach könnte der Platz für Fußgänger geöffnet werden. Die Maßnahme wäre mit klaren Zeiten und einer einjährigen Testphase umsetzbar. Eine Einschränkung sind die Umbaukosten. Daraus lässt sich schließen, dass ein zeitlich begrenzter Versuch den Interessen beider Seiten am ehesten gerecht wird.", speakingPrompt: "Give a three-minute proposal and answer two unscripted questions.", speakingGuide: ["Define the issue", "Summarize two perspectives", "Name the goal conflict", "Propose a measure", "State one limitation", "Finish with a conclusion"], speakingRequired: ["zielkonflikt", "schluss"], speakingModel: "Auf dem Stadtplatz treffen Erreichbarkeit und Aufenthaltsqualität aufeinander. Geschäftsleute brauchen Lieferzeiten, während Anwohnende weniger Verkehr wünschen. Der Zielkonflikt lässt sich durch feste Lieferzeiten und eine Testphase bearbeiten. Daraus lässt sich schließen, dass ein begrenzter Versuch sinnvoll ist." },
      culture: ["Participatory budgeting", "Participatory budgeting gives residents a role in discussing public spending. Procedures differ by municipality, so each local process should be read carefully.", "Federal Agency for Civic Education", "https://www.bpb.de/themen/stadt-land/buergerhaushalt/508752/fragen-und-antworten-zum-buergerhaushalt/", ["der Bürgerhaushalt", "die Abstimmung", "die Kommune"]]
    })
  );

  window.SATZWERK_CURRICULUM = { levels: LEVELS, modules, sources: SOURCES };
})();
