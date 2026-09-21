(function () {
  const course = window.SATZWERK_CURRICULUM;
  if (!course?.modules) throw new Error("Satzwerk curriculum must load before the A0/A1 lexicon expansion");

  // Six focused, high-frequency bundles for every beginner module. These stay
  // supplemental so the established core progression and completion rules do
  // not change; practice layers may promote individual words deliberately.
  const expansion = {
    "a0-first-contact": [
      ["lex-a0fc-guten-morgen", "Guten Morgen!", "good morning", "Guten Morgen! · morgens", "Guten Morgen, Frau Aydin!", "Good morning, Ms. Aydin!"],
      ["lex-a0fc-guten-abend", "Guten Abend!", "good evening", "Guten Abend! · abends", "Guten Abend, Herr Stein!", "Good evening, Mr. Stein!"],
      ["lex-a0fc-auf-wiedersehen", "Auf Wiedersehen!", "goodbye", "Auf Wiedersehen! · formell", "Vielen Dank. Auf Wiedersehen!", "Thank you very much. Goodbye!"],
      ["lex-a0fc-bis-bald", "Bis bald!", "see you soon", "Bis bald! · informell", "Tschüss, Nora. Bis bald!", "Bye, Nora. See you soon!"],
      ["lex-a0fc-kennenzulernen", "Schön, Sie kennenzulernen.", "nice to meet you", "Schön, dich / Sie kennenzulernen.", "Guten Tag, Frau Wolf. Schön, Sie kennenzulernen.", "Hello, Ms. Wolf. Nice to meet you."],
      ["lex-a0fc-mein-name-ist", "Mein Name ist ...", "my name is ...", "Mein Name ist ... · Ich heiße ...", "Mein Name ist Amir Haddad.", "My name is Amir Haddad."]
    ],
    "a0-personal-details": [
      ["lex-a0pd-wohnort", "der Wohnort, die Wohnorte", "place of residence", "der Wohnort · die Wohnorte", "Mein Wohnort ist Leipzig.", "My place of residence is Leipzig."],
      ["lex-a0pd-geburtsort", "der Geburtsort, die Geburtsorte", "place of birth", "der Geburtsort · die Geburtsorte", "Mein Geburtsort ist Rabat.", "My place of birth is Rabat."],
      ["lex-a0pd-geboren", "geboren sein", "to be born", "geboren sein · ich bin geboren", "Ich bin in Lima geboren.", "I was born in Lima."],
      ["lex-a0pd-ledig", "ledig", "single / unmarried", "ledig · der Familienstand", "Ich bin ledig.", "I am single."],
      ["lex-a0pd-staatsangehoerigkeit", "die Staatsangehörigkeit, die Staatsangehörigkeiten", "nationality", "die Staatsangehörigkeit · die Staatsangehörigkeiten", "Im Formular steht meine Staatsangehörigkeit.", "My nationality is listed on the form."],
      ["lex-a0pd-vorwahl", "die Vorwahl, die Vorwahlen", "area / country code", "die Vorwahl · die Vorwahlen", "Die Vorwahl für Berlin ist 030.", "The area code for Berlin is 030."]
    ],
    "a0-everyday-things": [
      ["lex-a0et-computer", "der Computer, die Computer", "computer", "der Computer · die Computer", "Der Computer steht auf dem Tisch.", "The computer is on the table."],
      ["lex-a0et-laptop", "der Laptop, die Laptops", "laptop", "der Laptop · die Laptops", "Mein Laptop ist in der Tasche.", "My laptop is in the bag."],
      ["lex-a0et-kopfhoerer", "der Kopfhörer, die Kopfhörer", "headphones", "der Kopfhörer · die Kopfhörer", "Wo sind meine Kopfhörer?", "Where are my headphones?"],
      ["lex-a0et-ladekabel", "das Ladekabel, die Ladekabel", "charging cable", "das Ladekabel · die Ladekabel", "Ich brauche ein Ladekabel für mein Handy.", "I need a charging cable for my phone."],
      ["lex-a0et-steckdose", "die Steckdose, die Steckdosen", "electrical outlet", "die Steckdose · die Steckdosen", "Die Steckdose ist neben der Tür.", "The electrical outlet is next to the door."],
      ["lex-a0et-notizbuch", "das Notizbuch, die Notizbücher", "notebook", "das Notizbuch · die Notizbücher", "Ich schreibe das Wort in mein Notizbuch.", "I write the word in my notebook."]
    ],
    "a0-numbers-spelling-forms": [
      ["lex-a0nf-unterschrift", "die Unterschrift, die Unterschriften", "signature", "die Unterschrift · die Unterschriften", "Hier fehlt noch Ihre Unterschrift.", "Your signature is still missing here."],
      ["lex-a0nf-unterschreiben", "unterschreiben", "to sign", "unterschreiben · unterschreibt", "Bitte unterschreiben Sie hier.", "Please sign here."],
      ["lex-a0nf-datum", "das Datum, die Daten", "date", "das Datum · die Daten", "Schreiben Sie bitte das heutige Datum.", "Please write today's date."],
      ["lex-a0nf-anrede", "die Anrede, die Anreden", "form of address", "die Anrede · die Anreden", "Bei der Anrede wähle ich Frau.", "For the form of address, I select Ms."],
      ["lex-a0nf-pflichtfeld", "das Pflichtfeld, die Pflichtfelder", "required field", "das Pflichtfeld · die Pflichtfelder", "Dieses Pflichtfeld darf nicht leer sein.", "This required field may not be blank."],
      ["lex-a0nf-ankreuzen", "ankreuzen", "to tick / check", "ankreuzen · kreuzt an", "Kreuzen Sie bitte eine Antwort an.", "Please tick one answer."]
    ],
    "a0-conversation-repair": [
      ["lex-a0cr-satz", "der Satz, die Sätze", "sentence", "der Satz · die Sätze", "Können Sie den Satz noch einmal sagen?", "Can you say the sentence again?"],
      ["lex-a0cr-buchstabe", "der Buchstabe, die Buchstaben", "letter", "der Buchstabe · die Buchstaben", "Welcher Buchstabe fehlt?", "Which letter is missing?"],
      ["lex-a0cr-aussprache", "die Aussprache, die Aussprachen", "pronunciation", "die Aussprache · die Aussprachen", "Die Aussprache von ü ist neu für mich.", "The pronunciation of ü is new to me."],
      ["lex-a0cr-wie-sagt-man", "Wie sagt man ... auf Deutsch?", "how do you say ... in German?", "Wie sagt man ... auf Deutsch?", "Wie sagt man „receipt“ auf Deutsch?", "How do you say 'receipt' in German?"],
      ["lex-a0cr-weiss-nicht", "Ich weiß es nicht.", "I don't know", "Ich weiß es nicht. · noch nicht wissen", "Entschuldigung, ich weiß es nicht.", "Sorry, I don't know."],
      ["lex-a0cr-stimmt-das", "Stimmt das?", "is that correct?", "Stimmt das? · Das stimmt.", "Der Termin ist am Dienstag. Stimmt das?", "The appointment is on Tuesday. Is that correct?"]
    ],
    "a0-time-date-schedule": [
      ["lex-a0ts-vormittag", "der Vormittag, die Vormittage", "morning / late morning", "am Vormittag · die Vormittage", "Der Kurs ist am Vormittag.", "The course is in the morning."],
      ["lex-a0ts-mittag", "der Mittag, die Mittage", "midday", "am Mittag · mittags", "Am Mittag mache ich eine Pause.", "I take a break at midday."],
      ["lex-a0ts-abend", "der Abend, die Abende", "evening", "am Abend · die Abende", "Am Abend ist das Büro geschlossen.", "The office is closed in the evening."],
      ["lex-a0ts-nacht", "die Nacht, die Nächte", "night", "in der Nacht · die Nächte", "In der Nacht fährt kein Bus.", "No bus runs at night."],
      ["lex-a0ts-frueh", "früh", "early", "früh · früher", "Der Termin ist sehr früh.", "The appointment is very early."],
      ["lex-a0ts-spaet", "spät", "late", "spät · später", "Der Kurs endet heute spät.", "The course ends late today."]
    ],
    "a0-sound-spelling": [
      ["lex-a0ss-vokal", "der Vokal, die Vokale", "vowel", "der Vokal · die Vokale", "A ist ein Vokal.", "A is a vowel."],
      ["lex-a0ss-konsonant", "der Konsonant, die Konsonanten", "consonant", "der Konsonant · die Konsonanten", "Das Wort beginnt mit einem Konsonanten.", "The word begins with a consonant."],
      ["lex-a0ss-silbe", "die Silbe, die Silben", "syllable", "die Silbe · die Silben", "Der Name hat zwei Silben.", "The name has two syllables."],
      ["lex-a0ss-kleingeschrieben", "kleingeschrieben", "written in lowercase", "kleingeschrieben · großgeschrieben", "Das Verb wird kleingeschrieben.", "The verb is written in lowercase."],
      ["lex-a0ss-sonderzeichen", "das Sonderzeichen, die Sonderzeichen", "special character", "das Sonderzeichen · die Sonderzeichen", "Das Passwort braucht ein Sonderzeichen.", "The password needs a special character."],
      ["lex-a0ss-aussprache", "die Aussprache, die Aussprachen", "pronunciation", "die Aussprache · deutlich aussprechen", "Bitte hören Sie auf die Aussprache.", "Please listen to the pronunciation."]
    ],
    "a0-follow-lesson": [
      ["lex-a0fl-unterstreichen", "unterstreichen", "to underline", "unterstreichen · unterstreicht", "Unterstreichen Sie bitte das Verb.", "Please underline the verb."],
      ["lex-a0fl-markieren", "markieren", "to highlight / mark", "markieren · markiert", "Markieren Sie alle neuen Wörter.", "Highlight all the new words."],
      ["lex-a0fl-verbinden", "verbinden", "to connect / match", "verbinden · verbindet", "Verbinden Sie jedes Bild mit einem Wort.", "Connect each picture with a word."],
      ["lex-a0fl-vergleichen", "vergleichen", "to compare", "vergleichen · vergleicht", "Vergleichen Sie Ihre Antworten.", "Compare your answers."],
      ["lex-a0fl-kontrollieren", "kontrollieren", "to check", "kontrollieren · kontrolliert", "Kontrollieren Sie den Satz noch einmal.", "Check the sentence again."],
      ["lex-a0fl-loesung", "die Lösung, die Lösungen", "solution / answer key", "die Lösung · die Lösungen", "Die Lösung steht auf der nächsten Seite.", "The solution is on the next page."]
    ],
    "a0-question-words": [
      ["lex-a0qw-wie-lange", "wie lange", "how long", "Wie lange ...?", "Wie lange dauert der Kurs?", "How long does the course last?"],
      ["lex-a0qw-wie-oft", "wie oft", "how often", "Wie oft ...?", "Wie oft fährt der Bus?", "How often does the bus run?"],
      ["lex-a0qw-wie-spaet", "wie spät", "what time / how late", "Wie spät ist es?", "Entschuldigung, wie spät ist es?", "Excuse me, what time is it?"],
      ["lex-a0qw-wie-alt", "wie alt", "how old", "Wie alt ...?", "Wie alt ist Ihr Kind?", "How old is your child?"],
      ["lex-a0qw-wie-viele", "wie viele", "how many", "Wie viele ...?", "Wie viele Personen kommen?", "How many people are coming?"],
      ["lex-a0qw-mit-wem", "mit wem", "with whom", "Mit wem ...?", "Mit wem sprechen Sie?", "Who are you speaking with?"]
    ],
    "a0-prices-amounts": [
      ["lex-a0pa-bezahlen", "bezahlen", "to pay", "bezahlen · bezahlt", "Wo kann ich bezahlen?", "Where can I pay?"],
      ["lex-a0pa-bar", "bar", "in cash", "bar bezahlen · nur bar", "Ich bezahle bar.", "I am paying in cash."],
      ["lex-a0pa-karte", "die Karte, die Karten", "card", "mit Karte bezahlen · die Karten", "Kann ich mit Karte bezahlen?", "Can I pay by card?"],
      ["lex-a0pa-wechselgeld", "das Wechselgeld", "change", "das Wechselgeld · nur Singular", "Hier ist Ihr Wechselgeld.", "Here is your change."],
      ["lex-a0pa-stueck", "das Stück, die Stücke", "piece / item", "ein Stück · zwei Stück", "Ich nehme drei Stück, bitte.", "I'll take three, please."],
      ["lex-a0pa-liter", "der Liter, die Liter", "liter", "ein Liter · zwei Liter", "Die Flasche enthält einen Liter Wasser.", "The bottle contains one liter of water."]
    ],
    "a0-dates-calendar": [
      ["lex-a0dc-gestern", "gestern", "yesterday", "gestern · heute · morgen", "Gestern war Montag.", "Yesterday was Monday."],
      ["lex-a0dc-uebermorgen", "übermorgen", "the day after tomorrow", "morgen · übermorgen", "Der Termin ist übermorgen.", "The appointment is the day after tomorrow."],
      ["lex-a0dc-diese-woche", "diese Woche", "this week", "diese Woche · nächste Woche", "Diese Woche habe ich drei Termine.", "I have three appointments this week."],
      ["lex-a0dc-woche", "die Woche, die Wochen", "week", "die Woche · die Wochen", "Der Kurs dauert sechs Wochen.", "The course lasts six weeks."],
      ["lex-a0dc-monat", "der Monat, die Monate", "month", "der Monat · die Monate", "Der nächste Monat ist Juni.", "Next month is June."],
      ["lex-a0dc-feiertag", "der Feiertag, die Feiertage", "public holiday", "der Feiertag · die Feiertage", "Am Feiertag bleibt das Büro geschlossen.", "The office remains closed on the public holiday."]
    ],
    "a0-basic-needs": [
      ["lex-a0bn-decke", "die Decke, die Decken", "blanket", "die Decke · die Decken", "Mir ist kalt. Haben Sie eine Decke?", "I am cold. Do you have a blanket?"],
      ["lex-a0bn-pflaster", "das Pflaster, die Pflaster", "adhesive bandage", "das Pflaster · die Pflaster", "Ich brauche ein Pflaster für den Finger.", "I need a bandage for my finger."],
      ["lex-a0bn-ladegeraet", "das Ladegerät, die Ladegeräte", "charger", "das Ladegerät · die Ladegeräte", "Kann ich ein Ladegerät bekommen?", "Can I get a charger?"],
      ["lex-a0bn-wlan", "das WLAN", "Wi-Fi", "das WLAN · nur Singular", "Gibt es hier kostenloses WLAN?", "Is there free Wi-Fi here?"],
      ["lex-a0bn-ruhe", "die Ruhe", "quiet / rest", "die Ruhe · nur Singular", "Ich brauche einen Moment Ruhe.", "I need a moment of quiet."],
      ["lex-a0bn-frische-luft", "die frische Luft", "fresh air", "frische Luft · nur Singular", "Ich brauche kurz frische Luft.", "I need some fresh air for a moment."]
    ],
    "a0-people-pronouns": [
      ["lex-a0pp-ich", "ich", "I", "ich · mir · mich", "Ich bin heute im Kurs.", "I am in class today."],
      ["lex-a0pp-du", "du", "you (informal singular)", "du · dir · dich", "Du wohnst in Berlin.", "You live in Berlin."],
      ["lex-a0pp-sie-formell", "Sie", "you (formal)", "Sie · Ihnen · Sie", "Sprechen Sie Deutsch?", "Do you speak German?"],
      ["lex-a0pp-man", "man", "one / people in general", "man · allgemeine Aussage", "Hier spricht man leise.", "People speak quietly here."],
      ["lex-a0pp-mein-dein", "mein / dein", "my / your (informal)", "mein Name · deine Adresse", "Das ist mein Buch und das ist deine Tasche.", "That is my book, and that is your bag."],
      ["lex-a0pp-dieser", "dieser / diese / dieses", "this", "dieser Mann · diese Frau · dieses Kind", "Diese Frau wartet vor der Tür.", "This woman is waiting outside the door."]
    ],
    "a0-core-actions": [
      ["lex-a0ca-geben", "geben, ich gebe, du gibst", "to give", "geben · gibt · hat gegeben", "Ich gebe Ihnen das Formular.", "I am giving you the form."],
      ["lex-a0ca-nehmen", "nehmen, ich nehme, du nimmst", "to take", "nehmen · nimmt · hat genommen", "Ich nehme den Bus um acht.", "I take the bus at eight."],
      ["lex-a0ca-bringen", "bringen", "to bring", "bringen · bringt · hat gebracht", "Bringst du bitte ein Glas Wasser?", "Could you bring a glass of water?"],
      ["lex-a0ca-kaufen", "kaufen", "to buy", "kaufen · kauft · hat gekauft", "Wir kaufen heute Brot.", "We are buying bread today."],
      ["lex-a0ca-fahren", "fahren, ich fahre, du fährst", "to travel / drive", "fahren · fährt · ist gefahren", "Der Bus fährt ins Zentrum.", "The bus goes to the city center."],
      ["lex-a0ca-schlafen", "schlafen, ich schlafe, du schläfst", "to sleep", "schlafen · schläft · hat geschlafen", "Das Kind schläft jetzt.", "The child is sleeping now."]
    ],
    "a0-negate-correct": [
      ["lex-a0nc-falsch", "falsch", "wrong / incorrect", "richtig · falsch", "Die Hausnummer ist falsch.", "The house number is wrong."],
      ["lex-a0nc-genau", "genau", "exactly / correct", "Ja, genau. · ganz genau", "Ist das Gleis drei? Ja, genau.", "Is that platform three? Yes, exactly."],
      ["lex-a0nc-gar-nicht", "gar nicht", "not at all", "gar nicht · stärkere Verneinung", "Ich spreche gar nicht schnell.", "I do not speak quickly at all."],
      ["lex-a0nc-auch-nicht", "auch nicht", "not either", "auch nicht · ebenfalls nicht", "Ich habe heute keine Zeit und morgen auch nicht.", "I don't have time today or tomorrow either."],
      ["lex-a0nc-noch-kein", "noch kein / noch keine", "not yet any", "noch kein Termin · noch keine Fahrkarte", "Ich habe noch keine Fahrkarte.", "I do not have a ticket yet."],
      ["lex-a0nc-leider-nicht", "leider nicht", "unfortunately not", "leider nicht · höfliche Absage", "Können Sie heute kommen? Leider nicht.", "Can you come today? Unfortunately not."]
    ],
    "a0-body-comfort": [
      ["lex-a0bc-schwindelig", "Mir ist schwindelig.", "I feel dizzy", "schwindelig sein · Mir ist schwindelig.", "Ich muss mich setzen. Mir ist schwindelig.", "I need to sit down. I feel dizzy."],
      ["lex-a0bc-uebel", "Mir ist übel.", "I feel nauseous", "übel sein · Mir ist übel.", "Mir ist übel und ich brauche Wasser.", "I feel nauseous and need water."],
      ["lex-a0bc-kopfschmerzen", "die Kopfschmerzen", "headache", "Kopfschmerzen haben · nur Plural", "Ich habe heute starke Kopfschmerzen.", "I have a bad headache today."],
      ["lex-a0bc-wehtun", "wehtun", "to hurt", "wehtun · tut weh", "Mein Rücken tut weh.", "My back hurts."],
      ["lex-a0bc-atmen", "atmen", "to breathe", "atmen · atmet", "Bitte langsam und ruhig atmen.", "Please breathe slowly and calmly."],
      ["lex-a0bc-hinlegen", "sich hinlegen", "to lie down", "sich hinlegen · legt sich hin", "Ich möchte mich kurz hinlegen.", "I would like to lie down for a moment."]
    ],
    "a0-building-signs": [
      ["lex-a0bs-aufzug", "der Aufzug, die Aufzüge", "elevator", "der Aufzug · die Aufzüge", "Der Aufzug ist rechts neben der Treppe.", "The elevator is to the right of the stairs."],
      ["lex-a0bs-toilette", "die Toilette, die Toiletten", "toilet / restroom", "die Toilette · die Toiletten", "Die Toiletten sind im Erdgeschoss.", "The restrooms are on the ground floor."],
      ["lex-a0bs-information", "die Information, die Informationen", "information desk / information", "die Information · die Informationen", "Fragen Sie bitte an der Information.", "Please ask at the information desk."],
      ["lex-a0bs-empfang", "der Empfang", "reception desk", "der Empfang · nur Singular", "Melden Sie sich zuerst am Empfang.", "Check in at reception first."],
      ["lex-a0bs-geoeffnet", "geöffnet", "open", "geöffnet · offen", "Der Eingang ist bis 20 Uhr geöffnet.", "The entrance is open until 8 p.m."],
      ["lex-a0bs-geschlossen", "geschlossen", "closed", "geöffnet · geschlossen", "Diese Tür ist geschlossen.", "This door is closed."]
    ],
    "a0-first-response-help": [
      ["lex-a0rh-verletzt", "verletzt", "injured", "verletzt sein · eine verletzte Person", "Eine Person ist verletzt.", "A person is injured."],
      ["lex-a0rh-krankenwagen", "der Krankenwagen, die Krankenwagen", "ambulance", "der Krankenwagen · die Krankenwagen", "Rufen Sie bitte einen Krankenwagen.", "Please call an ambulance."],
      ["lex-a0rh-feuerwehr", "die Feuerwehr, die Feuerwehren", "fire department", "die Feuerwehr · die Feuerwehren", "Bei Feuer rufen Sie die Feuerwehr.", "Call the fire department if there is a fire."],
      ["lex-a0rh-notausgang", "der Notausgang, die Notausgänge", "emergency exit", "der Notausgang · die Notausgänge", "Der Notausgang ist hinten links.", "The emergency exit is at the back on the left."],
      ["lex-a0rh-adresse", "die Adresse, die Adressen", "address", "die Adresse · die Adressen", "Wie ist die genaue Adresse?", "What is the exact address?"],
      ["lex-a0rh-warten", "warten", "to wait", "warten · wartet", "Bitte warten Sie hier auf die Polizei.", "Please wait here for the police."]
    ],
    "a1-people-family-work": [
      ["lex-a1pf-grossmutter", "die Großmutter, die Großmütter", "grandmother", "die Großmutter · die Großmütter", "Meine Großmutter wohnt in Dresden.", "My grandmother lives in Dresden."],
      ["lex-a1pf-grossvater", "der Großvater, die Großväter", "grandfather", "der Großvater · die Großväter", "Mein Großvater ist schon in Rente.", "My grandfather is already retired."],
      ["lex-a1pf-tante", "die Tante, die Tanten", "aunt", "die Tante · die Tanten", "Meine Tante arbeitet im Krankenhaus.", "My aunt works at the hospital."],
      ["lex-a1pf-onkel", "der Onkel, die Onkel", "uncle", "der Onkel · die Onkel", "Am Sonntag besucht uns mein Onkel.", "My uncle is visiting us on Sunday."],
      ["lex-a1pf-ehemann", "der Ehemann, die Ehemänner", "husband", "der Ehemann · die Ehemänner", "Ihr Ehemann heißt Daniel.", "Her husband's name is Daniel."],
      ["lex-a1pf-ehefrau", "die Ehefrau, die Ehefrauen", "wife", "die Ehefrau · die Ehefrauen", "Seine Ehefrau ist Ingenieurin.", "His wife is an engineer."]
    ],
    "a1-daily-routine": [
      ["lex-a1dr-zaehne-putzen", "sich die Zähne putzen", "to brush one's teeth", "sich die Zähne putzen · putzt sich", "Nach dem Frühstück putze ich mir die Zähne.", "I brush my teeth after breakfast."],
      ["lex-a1dr-haus-verlassen", "das Haus verlassen", "to leave the house", "das Haus verlassen · verlässt", "Ich verlasse das Haus um halb acht.", "I leave the house at seven thirty."],
      ["lex-a1dr-nach-hause-kommen", "nach Hause kommen", "to come home", "nach Hause kommen · kommt nach Hause", "Am Abend komme ich um sechs nach Hause.", "I come home at six in the evening."],
      ["lex-a1dr-mittagspause", "die Mittagspause, die Mittagspausen", "lunch break", "die Mittagspause · die Mittagspausen", "Meine Mittagspause beginnt um zwölf.", "My lunch break starts at twelve."],
      ["lex-a1dr-abendessen", "das Abendessen, die Abendessen", "dinner", "das Abendessen · die Abendessen", "Wir essen das Abendessen zusammen.", "We eat dinner together."],
      ["lex-a1dr-ins-bett-gehen", "ins Bett gehen", "to go to bed", "ins Bett gehen · geht ins Bett", "Unter der Woche gehe ich früh ins Bett.", "I go to bed early during the week."]
    ],
    "a1-food-shopping": [
      ["lex-a1fs-butter", "die Butter", "butter", "die Butter · nur Singular", "Die Butter steht neben der Milch.", "The butter is next to the milk."],
      ["lex-a1fs-joghurt", "der Joghurt, die Joghurts", "yogurt", "der Joghurt · die Joghurts", "Ich nehme zwei Joghurts.", "I'll take two yogurts."],
      ["lex-a1fs-kartoffel", "die Kartoffel, die Kartoffeln", "potato", "die Kartoffel · die Kartoffeln", "Ein Kilo Kartoffeln kostet zwei Euro.", "One kilo of potatoes costs two euros."],
      ["lex-a1fs-tomate", "die Tomate, die Tomaten", "tomato", "die Tomate · die Tomaten", "Die Tomaten sind heute im Angebot.", "The tomatoes are on sale today."],
      ["lex-a1fs-zwiebel", "die Zwiebel, die Zwiebeln", "onion", "die Zwiebel · die Zwiebeln", "Für die Suppe brauche ich eine Zwiebel.", "I need an onion for the soup."],
      ["lex-a1fs-fleisch", "das Fleisch", "meat", "das Fleisch · nur Singular", "Wir essen wenig Fleisch.", "We eat little meat."]
    ],
    "a1-home-and-town": [
      ["lex-a1ht-schlafzimmer", "das Schlafzimmer, die Schlafzimmer", "bedroom", "das Schlafzimmer · die Schlafzimmer", "Das Schlafzimmer ist neben dem Bad.", "The bedroom is next to the bathroom."],
      ["lex-a1ht-balkon", "der Balkon, die Balkone", "balcony", "der Balkon · die Balkone", "Die Wohnung hat einen kleinen Balkon.", "The apartment has a small balcony."],
      ["lex-a1ht-keller", "der Keller, die Keller", "basement / cellar", "der Keller · die Keller", "Mein Fahrrad steht im Keller.", "My bicycle is in the basement."],
      ["lex-a1ht-garten", "der Garten, die Gärten", "garden", "der Garten · die Gärten", "Hinter dem Haus ist ein Garten.", "There is a garden behind the house."],
      ["lex-a1ht-rathaus", "das Rathaus, die Rathäuser", "town hall", "das Rathaus · die Rathäuser", "Das Bürgeramt ist im Rathaus.", "The citizens' office is in the town hall."],
      ["lex-a1ht-krankenhaus", "das Krankenhaus, die Krankenhäuser", "hospital", "das Krankenhaus · die Krankenhäuser", "Das Krankenhaus liegt am Stadtpark.", "The hospital is by the city park."]
    ],
    "a1-plans-and-leisure": [
      ["lex-a1pl-theater", "das Theater, die Theater", "theater", "das Theater · die Theater", "Am Freitag gehen wir ins Theater.", "We are going to the theater on Friday."],
      ["lex-a1pl-ausstellung", "die Ausstellung, die Ausstellungen", "exhibition", "die Ausstellung · die Ausstellungen", "Die Ausstellung ist bis Sonntag geöffnet.", "The exhibition is open through Sunday."],
      ["lex-a1pl-fussball", "der Fußball", "soccer / football", "Fußball spielen · nur Singular", "Die Kinder spielen im Park Fußball.", "The children are playing soccer in the park."],
      ["lex-a1pl-schwimmen", "schwimmen", "to swim", "schwimmen · schwimmt · ist geschwommen", "Möchtest du morgen schwimmen gehen?", "Would you like to go swimming tomorrow?"],
      ["lex-a1pl-rad-fahren", "Rad fahren", "to ride a bicycle", "Rad fahren · fährt Rad", "Am Wochenende fahren wir gern Rad.", "We like to ride bicycles on the weekend."],
      ["lex-a1pl-verabredet", "verabredet sein", "to have plans / be meeting someone", "mit jemandem verabredet sein", "Ich bin heute Abend mit Lea verabredet.", "I am meeting Lea this evening."]
    ],
    "a1-travel-and-services": [
      ["lex-a1ts-strasse", "die Straße, die Straßen", "street", "die Straße · die Straßen", "Das Hotel ist in der Bahnhofstraße.", "The hotel is on Bahnhofstraße."],
      ["lex-a1ts-ecke", "die Ecke, die Ecken", "corner", "die Ecke · die Ecken", "Die Apotheke ist an der nächsten Ecke.", "The pharmacy is at the next corner."],
      ["lex-a1ts-abbiegen", "abbiegen", "to turn", "links / rechts abbiegen · biegt ab", "Biegen Sie an der Ampel rechts ab.", "Turn right at the traffic light."],
      ["lex-a1ts-zurueckfahren", "zurückfahren", "to travel back", "zurückfahren · fährt zurück", "Der letzte Bus fährt um elf zurück.", "The last bus goes back at eleven."],
      ["lex-a1ts-naehe", "in der Nähe", "nearby", "in der Nähe · ganz in der Nähe", "Gibt es hier in der Nähe eine Bank?", "Is there a bank nearby?"],
      ["lex-a1ts-weit", "weit", "far", "weit · nicht weit", "Ist der Bahnhof weit von hier?", "Is the train station far from here?"]
    ],
    "a1-health-past-checkpoint": [
      ["lex-a1hp-ohr", "das Ohr, die Ohren", "ear", "das Ohr · die Ohren", "Mein linkes Ohr tut weh.", "My left ear hurts."],
      ["lex-a1hp-hand", "die Hand, die Hände", "hand", "die Hand · die Hände", "Ich habe mich an der Hand verletzt.", "I injured my hand."],
      ["lex-a1hp-bein", "das Bein, die Beine", "leg", "das Bein · die Beine", "Nach dem Sport tut mein Bein weh.", "My leg hurts after sports."],
      ["lex-a1hp-heiss", "heiß", "hot", "heiß · sehr heiß", "Gestern war es ungewöhnlich heiß.", "It was unusually hot yesterday."],
      ["lex-a1hp-kuehl", "kühl", "cool", "kühl · kühler", "Am Abend wird es kühl.", "It gets cool in the evening."],
      ["lex-a1hp-gewitter", "das Gewitter, die Gewitter", "thunderstorm", "das Gewitter · die Gewitter", "In der Nacht gab es ein starkes Gewitter.", "There was a strong thunderstorm during the night."]
    ],
    "a1-public-transport-tickets": [
      ["lex-a1pt-monatskarte", "die Monatskarte, die Monatskarten", "monthly pass", "die Monatskarte · die Monatskarten", "Eine Monatskarte ist für mich günstiger.", "A monthly pass is cheaper for me."],
      ["lex-a1pt-zone", "die Zone, die Zonen", "fare zone", "die Zone · die Zonen", "Für diese Fahrt brauchen Sie zwei Zonen.", "You need two fare zones for this trip."],
      ["lex-a1pt-ticketkontrolle", "die Ticketkontrolle, die Ticketkontrollen", "ticket inspection", "die Ticketkontrolle · die Ticketkontrollen", "Bei der Ticketkontrolle zeige ich meine Fahrkarte.", "I show my ticket during the ticket inspection."],
      ["lex-a1pt-ersatzverkehr", "der Schienenersatzverkehr", "rail replacement service", "der Schienenersatzverkehr · nur Singular", "Wegen Bauarbeiten gibt es Schienenersatzverkehr.", "There is a rail replacement service because of construction work."],
      ["lex-a1pt-zugausfall", "der Zugausfall, die Zugausfälle", "train cancellation", "der Zugausfall · die Zugausfälle", "Auf der Anzeige steht ein Zugausfall.", "A train cancellation is shown on the display."],
      ["lex-a1pt-sitzplatz", "der Sitzplatz, die Sitzplätze", "seat", "der Sitzplatz · die Sitzplätze", "Ist dieser Sitzplatz noch frei?", "Is this seat still free?"]
    ],
    "a1-restaurant-needs-payment": [
      ["lex-a1rn-kellner", "der Kellner, die Kellner / die Kellnerin, die Kellnerinnen", "waiter / waitress", "der Kellner · die Kellnerin", "Die Kellnerin bringt die Speisekarte.", "The waitress brings the menu."],
      ["lex-a1rn-tisch", "der Tisch, die Tische", "table", "der Tisch · die Tische", "Wir haben einen Tisch für zwei reserviert.", "We have reserved a table for two."],
      ["lex-a1rn-beilage", "die Beilage, die Beilagen", "side dish", "die Beilage · die Beilagen", "Als Beilage nehme ich Reis.", "I'll have rice as the side dish."],
      ["lex-a1rn-leitungswasser", "das Leitungswasser", "tap water", "das Leitungswasser · nur Singular", "Kann ich bitte ein Glas Leitungswasser bekommen?", "Could I have a glass of tap water, please?"],
      ["lex-a1rn-scharf", "scharf", "spicy", "scharf · nicht scharf", "Ist die Suppe sehr scharf?", "Is the soup very spicy?"],
      ["lex-a1rn-schmecken", "schmecken", "to taste", "schmecken · schmeckt", "Das Gemüse schmeckt sehr gut.", "The vegetables taste very good."]
    ],
    "a1-clothing-fit-returns": [
      ["lex-a1cs-tshirt", "das T-Shirt, die T-Shirts", "T-shirt", "das T-Shirt · die T-Shirts", "Ich suche ein weißes T-Shirt.", "I am looking for a white T-shirt."],
      ["lex-a1cs-rock", "der Rock, die Röcke", "skirt", "der Rock · die Röcke", "Der blaue Rock passt gut.", "The blue skirt fits well."],
      ["lex-a1cs-mantel", "der Mantel, die Mäntel", "coat", "der Mantel · die Mäntel", "Dieser Mantel ist warm, aber teuer.", "This coat is warm but expensive."],
      ["lex-a1cs-socke", "die Socke, die Socken", "sock", "die Socke · die Socken", "Wo finde ich schwarze Socken?", "Where can I find black socks?"],
      ["lex-a1cs-eng", "eng", "tight", "eng · zu eng", "Die Hose ist an der Hüfte zu eng.", "The trousers are too tight at the waist."],
      ["lex-a1cs-weit", "weit", "loose / wide", "weit · zu weit", "Das Hemd ist mir etwas zu weit.", "The shirt is a little too loose for me."]
    ],
    "a1-pharmacy-doctor-basics": [
      ["lex-a1pd-salbe", "die Salbe, die Salben", "ointment", "die Salbe · die Salben", "Tragen Sie die Salbe zweimal täglich auf.", "Apply the ointment twice a day."],
      ["lex-a1pd-tropfen", "der Tropfen, die Tropfen", "drop", "der Tropfen · die Tropfen", "Nehmen Sie morgens zehn Tropfen.", "Take ten drops in the morning."],
      ["lex-a1pd-dosierung", "die Dosierung, die Dosierungen", "dosage", "die Dosierung · die Dosierungen", "Die Dosierung steht auf der Packung.", "The dosage is written on the package."],
      ["lex-a1pd-nebenwirkung", "die Nebenwirkung, die Nebenwirkungen", "side effect", "die Nebenwirkung · die Nebenwirkungen", "Welche Nebenwirkungen hat dieses Medikament?", "What side effects does this medication have?"],
      ["lex-a1pd-gesundheitskarte", "die Gesundheitskarte, die Gesundheitskarten", "health insurance card", "die Gesundheitskarte · die Gesundheitskarten", "Bringen Sie bitte Ihre Gesundheitskarte mit.", "Please bring your health insurance card."],
      ["lex-a1pd-wartezimmer", "das Wartezimmer, die Wartezimmer", "waiting room", "das Wartezimmer · die Wartezimmer", "Nehmen Sie bitte im Wartezimmer Platz.", "Please take a seat in the waiting room."]
    ],
    "a1-hotel-checkin-problems": [
      ["lex-a1hc-zimmernummer", "die Zimmernummer, die Zimmernummern", "room number", "die Zimmernummer · die Zimmernummern", "Ihre Zimmernummer ist 408.", "Your room number is 408."],
      ["lex-a1hc-etage", "die Etage, die Etagen", "floor / story", "die Etage · die Etagen", "Das Zimmer liegt in der vierten Etage.", "The room is on the fourth floor."],
      ["lex-a1hc-dusche", "die Dusche, die Duschen", "shower", "die Dusche · die Duschen", "In meinem Zimmer funktioniert die Dusche nicht.", "The shower in my room is not working."],
      ["lex-a1hc-bettwaesche", "die Bettwäsche", "bed linen", "die Bettwäsche · nur Singular", "Können Sie bitte die Bettwäsche wechseln?", "Could you please change the bed linen?"],
      ["lex-a1hc-weckruf", "der Weckruf, die Weckrufe", "wake-up call", "der Weckruf · die Weckrufe", "Ich möchte einen Weckruf um sechs Uhr.", "I would like a wake-up call at six."],
      ["lex-a1hc-verfuegbar", "verfügbar", "available", "verfügbar · frei", "Ist heute noch ein ruhiges Zimmer verfügbar?", "Is a quiet room still available today?"]
    ],
    "a1-natural-small-talk": [
      ["lex-a1st-ganz-gut", "ganz gut", "quite well / pretty good", "ganz gut · nicht schlecht", "Danke, mein Tag war ganz gut.", "Thanks, my day was pretty good."],
      ["lex-a1st-nicht-schlecht", "nicht schlecht", "not bad", "nicht schlecht · ziemlich gut", "Wie war das Konzert? Nicht schlecht!", "How was the concert? Not bad!"],
      ["lex-a1st-beruflich", "Was machen Sie beruflich?", "what do you do for work?", "beruflich · der Beruf", "Was machen Sie eigentlich beruflich?", "What do you do for work, by the way?"],
      ["lex-a1st-gegend", "die Gegend, die Gegenden", "area / neighborhood", "die Gegend · die Gegenden", "Wohnen Sie schon lange in dieser Gegend?", "Have you lived in this area for long?"],
      ["lex-a1st-schoenes-wetter", "Schönes Wetter heute, oder?", "nice weather today, isn't it?", "Schönes Wetter, oder?", "Schönes Wetter heute, oder?", "Nice weather today, isn't it?"],
      ["lex-a1st-naechstes-mal", "Bis zum nächsten Mal!", "until next time", "Bis zum nächsten Mal!", "Es war nett. Bis zum nächsten Mal!", "It was nice. Until next time!"]
    ],
    "a1-visiting-hosting": [
      ["lex-a1vh-gast", "der Gast, die Gäste", "guest", "der Gast · die Gäste", "Heute Abend kommen vier Gäste.", "Four guests are coming this evening."],
      ["lex-a1vh-gastgeber", "der Gastgeber, die Gastgeber / die Gastgeberin, die Gastgeberinnen", "host", "der Gastgeber · die Gastgeberin", "Die Gastgeberin zeigt uns die Wohnung.", "The host shows us the apartment."],
      ["lex-a1vh-hausschuh", "der Hausschuh, die Hausschuhe", "slipper", "der Hausschuh · die Hausschuhe", "Für Gäste stehen Hausschuhe an der Tür.", "Slippers for guests are by the door."],
      ["lex-a1vh-kuchen", "der Kuchen, die Kuchen", "cake", "der Kuchen · die Kuchen", "Möchtest du noch ein Stück Kuchen?", "Would you like another piece of cake?"],
      ["lex-a1vh-bedienen", "sich bedienen", "to help oneself", "sich bedienen · Bedienen Sie sich!", "Bedienen Sie sich bitte am Buffet.", "Please help yourself at the buffet."],
      ["lex-a1vh-verabschieden", "sich verabschieden", "to say goodbye", "sich verabschieden · verabschiedet sich", "Wir verabschieden uns gegen zehn Uhr.", "We say goodbye around ten o'clock."]
    ],
    "a1-german-class": [
      ["lex-a1gc-woerterbuch", "das Wörterbuch, die Wörterbücher", "dictionary", "das Wörterbuch · die Wörterbücher", "Ich suche das Wort im Wörterbuch.", "I look up the word in the dictionary."],
      ["lex-a1gc-lehrbuch", "das Lehrbuch, die Lehrbücher", "textbook", "das Lehrbuch · die Lehrbücher", "Das Lehrbuch hat zwölf Kapitel.", "The textbook has twelve chapters."],
      ["lex-a1gc-arbeitsblatt", "das Arbeitsblatt, die Arbeitsblätter", "worksheet", "das Arbeitsblatt · die Arbeitsblätter", "Bitte schreiben Sie Ihren Namen auf das Arbeitsblatt.", "Please write your name on the worksheet."],
      ["lex-a1gc-loesung", "die Lösung, die Lösungen", "solution / answer", "die Lösung · die Lösungen", "Wir vergleichen die Lösungen zusammen.", "We compare the answers together."],
      ["lex-a1gc-fehler", "der Fehler, die Fehler", "mistake", "der Fehler · die Fehler", "In diesem Satz ist ein kleiner Fehler.", "There is a small mistake in this sentence."],
      ["lex-a1gc-note", "die Note, die Noten", "grade", "die Note · die Noten", "Wann bekommen wir die Note für die Prüfung?", "When will we get the grade for the exam?"]
    ],
    "a1-phone-calls": [
      ["lex-a1pc-mailbox", "die Mailbox, die Mailboxen", "voicemail", "die Mailbox · die Mailboxen", "Nach dem Signalton spricht sie auf die Mailbox.", "She leaves a voicemail after the tone."],
      ["lex-a1pc-leitung", "die Leitung, die Leitungen", "phone line", "die Leitung · die Leitungen", "Bitte bleiben Sie in der Leitung.", "Please stay on the line."],
      ["lex-a1pc-telefonnummer", "die Telefonnummer, die Telefonnummern", "phone number", "die Telefonnummer · die Telefonnummern", "Können Sie mir die Telefonnummer geben?", "Can you give me the phone number?"],
      ["lex-a1pc-vorwahl", "die Vorwahl, die Vorwahlen", "area / country code", "die Vorwahl · die Vorwahlen", "Vergessen Sie die internationale Vorwahl nicht.", "Do not forget the international dialing code."],
      ["lex-a1pc-empfang", "der Empfang", "reception / signal", "guter Empfang · nur Singular", "Im Keller habe ich keinen Empfang.", "I have no signal in the basement."],
      ["lex-a1pc-auflegen", "auflegen", "to hang up", "auflegen · legt auf", "Bitte legen Sie noch nicht auf.", "Please do not hang up yet."]
    ],
    "a1-texts-email": [
      ["lex-a1te-email", "die E-Mail, die E-Mails", "email", "die E-Mail · die E-Mails", "Ich habe Ihre E-Mail heute Morgen gelesen.", "I read your email this morning."],
      ["lex-a1te-nachricht", "die Nachricht, die Nachrichten", "message", "die Nachricht · die Nachrichten", "Schickst du mir bitte eine kurze Nachricht?", "Could you send me a short message?"],
      ["lex-a1te-datei", "die Datei, die Dateien", "file", "die Datei · die Dateien", "Die Datei ist zu groß für die E-Mail.", "The file is too large for the email."],
      ["lex-a1te-link", "der Link, die Links", "link", "der Link · die Links", "Der Link zum Formular steht unten.", "The link to the form is below."],
      ["lex-a1te-weiterleiten", "weiterleiten", "to forward", "weiterleiten · leitet weiter", "Ich leite Ihnen die Nachricht weiter.", "I will forward the message to you."],
      ["lex-a1te-loeschen", "löschen", "to delete", "löschen · löscht", "Bitte löschen Sie die alte Datei.", "Please delete the old file."]
    ],
    "a1-post-parcels": [
      ["lex-a1pp-adresse", "die Adresse, die Adressen", "address", "die Adresse · die Adressen", "Schreiben Sie die Adresse in die Mitte.", "Write the address in the middle."],
      ["lex-a1pp-postleitzahl", "die Postleitzahl, die Postleitzahlen", "postal code", "die Postleitzahl · die Postleitzahlen", "Die Postleitzahl hat fünf Ziffern.", "The postal code has five digits."],
      ["lex-a1pp-porto", "das Porto", "postage", "das Porto · nur Singular", "Wie viel kostet das Porto nach Kanada?", "How much is the postage to Canada?"],
      ["lex-a1pp-packstation", "die Packstation, die Packstationen", "parcel locker", "die Packstation · die Packstationen", "Das Paket liegt in der Packstation.", "The parcel is in the parcel locker."],
      ["lex-a1pp-zustellung", "die Zustellung, die Zustellungen", "delivery", "die Zustellung · die Zustellungen", "Die Zustellung ist am nächsten Werktag.", "Delivery is on the next business day."],
      ["lex-a1pp-beschaedigt", "beschädigt", "damaged", "beschädigt · ein beschädigtes Paket", "Das Paket ist außen beschädigt.", "The parcel is damaged on the outside."]
    ],
    "a1-bank-atm": [
      ["lex-a1ba-iban", "die IBAN, die IBANs", "IBAN / bank account number", "die IBAN · die IBANs", "Bitte prüfen Sie die IBAN vor der Überweisung.", "Please check the IBAN before the transfer."],
      ["lex-a1ba-lastschrift", "die Lastschrift, die Lastschriften", "direct debit", "die Lastschrift · die Lastschriften", "Für die Stromrechnung nutze ich eine Lastschrift.", "I use direct debit for the electricity bill."],
      ["lex-a1ba-dauerauftrag", "der Dauerauftrag, die Daueraufträge", "standing order", "der Dauerauftrag · die Daueraufträge", "Für die Miete richte ich einen Dauerauftrag ein.", "I set up a standing order for the rent."],
      ["lex-a1ba-gebuehr", "die Gebühr, die Gebühren", "fee", "die Gebühr · die Gebühren", "Für diese Überweisung fällt keine Gebühr an.", "There is no fee for this transfer."],
      ["lex-a1ba-einzahlen", "einzahlen", "to deposit", "Geld einzahlen · zahlt ein", "Ich möchte Bargeld auf mein Konto einzahlen.", "I would like to deposit cash into my account."],
      ["lex-a1ba-aendern", "ändern", "to change", "ändern · ändert", "Wo kann ich meine PIN ändern?", "Where can I change my PIN?"]
    ],
    "a1-shared-home-chores": [
      ["lex-a1sh-besen", "der Besen, die Besen", "broom", "der Besen · die Besen", "Der Besen steht hinter der Tür.", "The broom is behind the door."],
      ["lex-a1sh-staubsauger", "der Staubsauger, die Staubsauger", "vacuum cleaner", "der Staubsauger · die Staubsauger", "Der Staubsauger ist im Schrank.", "The vacuum cleaner is in the cupboard."],
      ["lex-a1sh-waschmaschine", "die Waschmaschine, die Waschmaschinen", "washing machine", "die Waschmaschine · die Waschmaschinen", "Die Waschmaschine läuft noch eine Stunde.", "The washing machine will run for another hour."],
      ["lex-a1sh-waeschestaender", "der Wäscheständer, die Wäscheständer", "drying rack", "der Wäscheständer · die Wäscheständer", "Stell den Wäscheständer bitte auf den Balkon.", "Please put the drying rack on the balcony."],
      ["lex-a1sh-reinigungsmittel", "das Reinigungsmittel, die Reinigungsmittel", "cleaning product", "das Reinigungsmittel · die Reinigungsmittel", "Dieses Reinigungsmittel ist für das Bad.", "This cleaning product is for the bathroom."],
      ["lex-a1sh-sauber-schmutzig", "sauber / schmutzig", "clean / dirty", "sauber · schmutzig", "Die Küche ist sauber, aber der Boden ist noch schmutzig.", "The kitchen is clean, but the floor is still dirty."]
    ],
    "a1-home-repair": [
      ["lex-a1hr-rohr", "das Rohr, die Rohre", "pipe", "das Rohr · die Rohre", "Aus dem Rohr kommt Wasser.", "Water is coming from the pipe."],
      ["lex-a1hr-steckdose", "die Steckdose, die Steckdosen", "electrical outlet", "die Steckdose · die Steckdosen", "Die Steckdose in der Küche funktioniert nicht.", "The electrical outlet in the kitchen does not work."],
      ["lex-a1hr-gluehbirne", "die Glühbirne, die Glühbirnen", "light bulb", "die Glühbirne · die Glühbirnen", "Die Glühbirne im Flur ist kaputt.", "The light bulb in the hall is broken."],
      ["lex-a1hr-sicherung", "die Sicherung, die Sicherungen", "fuse / circuit breaker", "die Sicherung · die Sicherungen", "Nach dem Stromausfall prüft der Hausmeister die Sicherung.", "After the power outage, the caretaker checks the fuse."],
      ["lex-a1hr-laerm", "der Lärm", "noise", "der Lärm · nur Singular", "Seit heute Morgen gibt es lauten Lärm im Keller.", "There has been loud noise in the basement since this morning."],
      ["lex-a1hr-schimmel", "der Schimmel", "mold", "der Schimmel · nur Singular", "An der Wand im Bad ist Schimmel.", "There is mold on the bathroom wall."]
    ],
    "a1-simple-recipe": [
      ["lex-a1sr-schuessel", "die Schüssel, die Schüsseln", "bowl", "die Schüssel · die Schüsseln", "Gib die Eier in eine große Schüssel.", "Put the eggs in a large bowl."],
      ["lex-a1sr-backofen", "der Backofen, die Backöfen", "oven", "der Backofen · die Backöfen", "Heize den Backofen auf 180 Grad vor.", "Preheat the oven to 180 degrees."],
      ["lex-a1sr-teeloeffel", "der Teelöffel, die Teelöffel", "teaspoon", "der Teelöffel · die Teelöffel", "Füge einen Teelöffel Salz hinzu.", "Add one teaspoon of salt."],
      ["lex-a1sr-gramm", "das Gramm, die Gramm", "gram", "das Gramm · die Gramm", "Wir brauchen 200 Gramm Mehl.", "We need 200 grams of flour."],
      ["lex-a1sr-kochen", "kochen", "to boil / cook", "kochen · kocht", "Koche die Kartoffeln zwanzig Minuten.", "Boil the potatoes for twenty minutes."],
      ["lex-a1sr-backen", "backen", "to bake", "backen · bäckt / backt · hat gebacken", "Der Kuchen muss vierzig Minuten backen.", "The cake needs to bake for forty minutes."]
    ],
    "a1-food-labels": [
      ["lex-a1fl-etikett", "das Etikett, die Etiketten", "label", "das Etikett · die Etiketten", "Auf dem Etikett steht das Gewicht.", "The weight is written on the label."],
      ["lex-a1fl-zucker", "der Zucker", "sugar", "der Zucker · nur Singular", "Dieses Getränk enthält viel Zucker.", "This drink contains a lot of sugar."],
      ["lex-a1fl-fett", "das Fett, die Fette", "fat", "das Fett · die Fette", "Die Nährwerte nennen Fett und Kohlenhydrate.", "The nutrition facts list fat and carbohydrates."],
      ["lex-a1fl-salz", "das Salz, die Salze", "salt", "das Salz · die Salze", "Die Suppe enthält wenig Salz.", "The soup contains little salt."],
      ["lex-a1fl-kalorie", "die Kalorie, die Kalorien", "calorie", "die Kalorie · die Kalorien", "Eine Portion hat 250 Kalorien.", "One serving has 250 calories."],
      ["lex-a1fl-gewicht", "das Gewicht, die Gewichte", "weight", "das Gewicht · die Gewichte", "Das Gewicht steht vorne auf der Packung.", "The weight is on the front of the package."]
    ],
    "a1-public-library": [
      ["lex-a1pl-roman", "der Roman, die Romane", "novel", "der Roman · die Romane", "Ich suche einen kurzen Roman auf Deutsch.", "I am looking for a short novel in German."],
      ["lex-a1pl-sachbuch", "das Sachbuch, die Sachbücher", "nonfiction book", "das Sachbuch · die Sachbücher", "Die Sachbücher stehen im zweiten Stock.", "The nonfiction books are on the second floor."],
      ["lex-a1pl-zeitschrift", "die Zeitschrift, die Zeitschriften", "magazine", "die Zeitschrift · die Zeitschriften", "Aktuelle Zeitschriften kann man hier lesen.", "Current magazines can be read here."],
      ["lex-a1pl-ausleihe", "die Ausleihe, die Ausleihen", "loan / checkout", "die Ausleihe · die Ausleihen", "Für die Ausleihe brauche ich meinen Ausweis.", "I need my card for checkout."],
      ["lex-a1pl-rueckgabeautomat", "der Rückgabeautomat, die Rückgabeautomaten", "return machine", "der Rückgabeautomat · die Rückgabeautomaten", "Der Rückgabeautomat steht neben dem Eingang.", "The return machine is next to the entrance."],
      ["lex-a1pl-mahngebuehr", "die Mahngebühr, die Mahngebühren", "late fee", "die Mahngebühr · die Mahngebühren", "Nach einer Woche fällt eine Mahngebühr an.", "A late fee is charged after one week."]
    ],
    "a1-first-workday": [
      ["lex-a1fw-empfang", "der Empfang", "reception", "der Empfang · nur Singular", "Am ersten Tag meldest du dich am Empfang.", "On your first day, you check in at reception."],
      ["lex-a1fw-besprechung", "die Besprechung, die Besprechungen", "meeting", "die Besprechung · die Besprechungen", "Um neun Uhr haben wir eine kurze Besprechung.", "We have a short meeting at nine."],
      ["lex-a1fw-pause", "die Pause, die Pausen", "break", "die Pause · die Pausen", "Die erste Pause beginnt um zehn Uhr.", "The first break starts at ten."],
      ["lex-a1fw-kantine", "die Kantine, die Kantinen", "cafeteria", "die Kantine · die Kantinen", "Mittags essen viele Kollegen in der Kantine.", "Many colleagues eat in the cafeteria at lunchtime."],
      ["lex-a1fw-zugang", "der Zugang, die Zugänge", "access", "der Zugang · die Zugänge", "Mit diesem Ausweis haben Sie Zugang zum Büro.", "This ID gives you access to the office."],
      ["lex-a1fw-arbeitszeit", "die Arbeitszeit, die Arbeitszeiten", "working hours", "die Arbeitszeit · die Arbeitszeiten", "Meine Arbeitszeit endet um sechzehn Uhr.", "My working hours end at four p.m."]
    ],
    "a1-coordinate-task": [
      ["lex-a1ct-liste", "die Liste, die Listen", "list", "die Liste · die Listen", "Ich aktualisiere zuerst die Kundenliste.", "I will update the customer list first."],
      ["lex-a1ct-bericht", "der Bericht, die Berichte", "report", "der Bericht · die Berichte", "Der kurze Bericht ist morgen fällig.", "The short report is due tomorrow."],
      ["lex-a1ct-datei", "die Datei, die Dateien", "file", "die Datei · die Dateien", "Die aktuelle Datei liegt im gemeinsamen Ordner.", "The current file is in the shared folder."],
      ["lex-a1ct-terminplan", "der Terminplan, die Terminpläne", "schedule", "der Terminplan · die Terminpläne", "Bitte prüfen Sie den neuen Terminplan.", "Please check the new schedule."],
      ["lex-a1ct-erledigen", "erledigen", "to complete / take care of", "erledigen · erledigt · hat erledigt", "Diese Aufgabe erledige ich heute Nachmittag.", "I will complete this task this afternoon."],
      ["lex-a1ct-nachfragen", "nachfragen", "to ask for clarification", "nachfragen · fragt nach", "Wenn etwas unklar ist, frage ich bei Mia nach.", "If something is unclear, I ask Mia for clarification."]
    ],
    "a1-workplace-safety": [
      ["lex-a1ws-unfall", "der Unfall, die Unfälle", "accident", "der Unfall · die Unfälle", "Melden Sie jeden Unfall sofort.", "Report every accident immediately."],
      ["lex-a1ws-melden", "melden", "to report", "eine Gefahr melden · meldet", "Bitte melden Sie das kaputte Kabel.", "Please report the broken cable."],
      ["lex-a1ws-vorsichtig", "vorsichtig", "careful / carefully", "vorsichtig sein · vorsichtig arbeiten", "Arbeiten Sie mit dem Messer besonders vorsichtig.", "Work especially carefully with the knife."],
      ["lex-a1ws-rutschig", "rutschig", "slippery", "rutschig · ein rutschiger Boden", "Achtung, der Boden ist nass und rutschig.", "Caution, the floor is wet and slippery."],
      ["lex-a1ws-maschine", "die Maschine, die Maschinen", "machine", "die Maschine · die Maschinen", "Schalten Sie die Maschine vor der Reinigung aus.", "Switch off the machine before cleaning."],
      ["lex-a1ws-schutzkleidung", "die Schutzkleidung", "protective clothing", "die Schutzkleidung · nur Singular", "In diesem Bereich ist Schutzkleidung Pflicht.", "Protective clothing is required in this area."]
    ],
    "a1-school-childcare": [
      ["lex-a1sc-schulranzen", "der Schulranzen, die Schulranzen", "school backpack", "der Schulranzen · die Schulranzen", "Das Heft ist im Schulranzen.", "The notebook is in the school backpack."],
      ["lex-a1sc-pausenbrot", "das Pausenbrot, die Pausenbrote", "packed school snack", "das Pausenbrot · die Pausenbrote", "Mein Kind nimmt ein Pausenbrot und Wasser mit.", "My child takes a packed snack and water."],
      ["lex-a1sc-ferien", "die Ferien", "school holidays", "die Ferien · nur Plural", "Die Sommerferien beginnen im Juli.", "The summer holidays begin in July."],
      ["lex-a1sc-anmeldung", "die Anmeldung, die Anmeldungen", "registration", "die Anmeldung · die Anmeldungen", "Für die Anmeldung brauchen wir die Geburtsurkunde.", "We need the birth certificate for registration."],
      ["lex-a1sc-zeugnis", "das Zeugnis, die Zeugnisse", "school report / certificate", "das Zeugnis · die Zeugnisse", "Am Freitag bekommen die Kinder ihre Zeugnisse.", "The children receive their school reports on Friday."],
      ["lex-a1sc-hausaufgabe", "die Hausaufgabe, die Hausaufgaben", "homework assignment", "die Hausaufgabe · die Hausaufgaben", "Die Hausaufgabe steht im Schulplaner.", "The homework assignment is in the school planner."]
    ],
    "a1-airport-flight": [
      ["lex-a1af-passkontrolle", "die Passkontrolle, die Passkontrollen", "passport control", "die Passkontrolle · die Passkontrollen", "Nach der Sicherheitskontrolle kommt die Passkontrolle.", "Passport control comes after security."],
      ["lex-a1af-sitzplatz", "der Sitzplatz, die Sitzplätze", "seat", "der Sitzplatz · die Sitzplätze", "Mein Sitzplatz ist 18A am Fenster.", "My seat is 18A by the window."],
      ["lex-a1af-verspaetung", "die Verspätung, die Verspätungen", "delay", "die Verspätung · die Verspätungen", "Der Flug hat eine Stunde Verspätung.", "The flight is delayed by one hour."],
      ["lex-a1af-annulliert", "annulliert", "canceled", "annulliert · ein annullierter Flug", "Unser Flug ist wegen des Wetters annulliert.", "Our flight is canceled because of the weather."],
      ["lex-a1af-landen", "landen", "to land", "landen · landet · ist gelandet", "Das Flugzeug landet um 14.30 Uhr.", "The airplane lands at 2:30 p.m."],
      ["lex-a1af-umsteigen", "umsteigen", "to change planes", "umsteigen · steigt um", "In Frankfurt müssen wir einmal umsteigen.", "We have to change planes once in Frankfurt."]
    ],
    "a1-taxi-pickup": [
      ["lex-a1tp-taxameter", "das Taxameter, die Taxameter", "taximeter", "das Taxameter · die Taxameter", "Das Taxameter zeigt zwölf Euro.", "The taximeter shows twelve euros."],
      ["lex-a1tp-verkehr", "der Verkehr", "traffic", "der Verkehr · nur Singular", "Am Morgen ist viel Verkehr.", "There is a lot of traffic in the morning."],
      ["lex-a1tp-stau", "der Stau, die Staus", "traffic jam", "der Stau · die Staus", "Auf der Autobahn stehen wir im Stau.", "We are stuck in traffic on the highway."],
      ["lex-a1tp-fahrpreis", "der Fahrpreis, die Fahrpreise", "fare", "der Fahrpreis · die Fahrpreise", "Wie hoch ist ungefähr der Fahrpreis?", "Approximately how much is the fare?"],
      ["lex-a1tp-bar-bezahlen", "bar bezahlen", "to pay in cash", "bar bezahlen · mit Karte bezahlen", "Kann ich die Fahrt bar bezahlen?", "Can I pay for the ride in cash?"],
      ["lex-a1tp-schnellste-route", "die schnellste Route, die schnellsten Routen", "fastest route", "die Route · die Routen", "Nehmen Sie bitte die schnellste Route zum Bahnhof.", "Please take the fastest route to the station."]
    ],
    "a1-tourist-information": [
      ["lex-a1ti-schloss", "das Schloss, die Schlösser", "palace / castle", "das Schloss · die Schlösser", "Das Schloss kann man täglich besichtigen.", "The palace can be visited daily."],
      ["lex-a1ti-kirche", "die Kirche, die Kirchen", "church", "die Kirche · die Kirchen", "Die alte Kirche steht am Marktplatz.", "The old church is on the market square."],
      ["lex-a1ti-dom", "der Dom, die Dome", "cathedral", "der Dom · die Dome", "Vom Dom sind es fünf Minuten zum Fluss.", "It is five minutes from the cathedral to the river."],
      ["lex-a1ti-wochenmarkt", "der Wochenmarkt, die Wochenmärkte", "weekly market", "der Wochenmarkt · die Wochenmärkte", "Der Wochenmarkt findet samstags statt.", "The weekly market takes place on Saturdays."],
      ["lex-a1ti-aussicht", "die Aussicht, die Aussichten", "view", "die Aussicht · die Aussichten", "Vom Turm hat man eine schöne Aussicht.", "There is a beautiful view from the tower."],
      ["lex-a1ti-broschuere", "die Broschüre, die Broschüren", "brochure", "die Broschüre · die Broschüren", "In der Broschüre stehen alle Öffnungszeiten.", "All opening hours are in the brochure."]
    ],
    "a1-sports-club": [
      ["lex-a1sp-sportart", "die Sportart, die Sportarten", "sport", "die Sportart · die Sportarten", "Welche Sportart möchten Sie ausprobieren?", "Which sport would you like to try?"],
      ["lex-a1sp-umkleide", "die Umkleide, die Umkleiden", "changing room", "die Umkleide · die Umkleiden", "Die Umkleiden sind hinter der Sporthalle.", "The changing rooms are behind the sports hall."],
      ["lex-a1sp-dusche", "die Dusche, die Duschen", "shower", "die Dusche · die Duschen", "Nach dem Training sind die Duschen geöffnet.", "The showers are open after training."],
      ["lex-a1sp-sporthalle", "die Sporthalle, die Sporthallen", "sports hall", "die Sporthalle · die Sporthallen", "Das Training findet in der großen Sporthalle statt.", "Practice takes place in the large sports hall."],
      ["lex-a1sp-mannschaft", "die Mannschaft, die Mannschaften", "team", "die Mannschaft · die Mannschaften", "Unsere Mannschaft trainiert zweimal pro Woche.", "Our team practices twice a week."],
      ["lex-a1sp-trainieren", "trainieren", "to train / practice", "trainieren · trainiert", "Ich trainiere jeden Mittwoch mit der Gruppe.", "I practice with the group every Wednesday."]
    ],
    "a1-dentist": [
      ["lex-a1de-zahnbuerste", "die Zahnbürste, die Zahnbürsten", "toothbrush", "die Zahnbürste · die Zahnbürsten", "Meine Zahnbürste ist zu hart.", "My toothbrush is too hard."],
      ["lex-a1de-zahnpasta", "die Zahnpasta, die Zahnpasten", "toothpaste", "die Zahnpasta · die Zahnpasten", "Diese Zahnpasta ist für empfindliche Zähne.", "This toothpaste is for sensitive teeth."],
      ["lex-a1de-karies", "die Karies", "tooth decay / cavity", "die Karies · meist Singular", "Der Zahnarzt findet Karies an einem Zahn.", "The dentist finds a cavity in one tooth."],
      ["lex-a1de-roentgenbild", "das Röntgenbild, die Röntgenbilder", "X-ray image", "das Röntgenbild · die Röntgenbilder", "Wir machen zuerst ein Röntgenbild.", "We will take an X-ray first."],
      ["lex-a1de-putzen", "die Zähne putzen", "to brush one's teeth", "die Zähne putzen · putzt", "Putzen Sie die Zähne morgens und abends.", "Brush your teeth in the morning and evening."],
      ["lex-a1de-spuelen", "spülen", "to rinse", "den Mund spülen · spült", "Spülen Sie bitte den Mund mit Wasser.", "Please rinse your mouth with water."]
    ],
    "a1-citizens-office": [
      ["lex-a1co-anmeldung", "die Anmeldung, die Anmeldungen", "registration", "die Anmeldung · die Anmeldungen", "Für die Anmeldung brauche ich einen Termin.", "I need an appointment for registration."],
      ["lex-a1co-wohnungsgeberbestaetigung", "die Wohnungsgeberbestätigung, die Wohnungsgeberbestätigungen", "landlord confirmation", "die Wohnungsgeberbestätigung · die Wohnungsgeberbestätigungen", "Bringen Sie die Wohnungsgeberbestätigung im Original mit.", "Bring the original landlord confirmation."],
      ["lex-a1co-gebuehr", "die Gebühr, die Gebühren", "fee", "die Gebühr · die Gebühren", "Die Gebühr können Sie am Schalter bezahlen.", "You can pay the fee at the counter."],
      ["lex-a1co-passfoto", "das Passfoto, die Passfotos", "passport photo", "das Passfoto · die Passfotos", "Für den neuen Ausweis brauche ich ein Passfoto.", "I need a passport photo for the new ID."],
      ["lex-a1co-kopie", "die Kopie, die Kopien", "copy", "die Kopie · die Kopien", "Reicht eine Kopie des Mietvertrags?", "Is a copy of the rental agreement sufficient?"],
      ["lex-a1co-gueltig", "gültig", "valid", "gültig · noch gültig", "Mein Reisepass ist noch zwei Jahre gültig.", "My passport is valid for another two years."]
    ],
    "a1-recycling-rules": [
      ["lex-a1rr-plastik", "das Plastik", "plastic", "das Plastik · nur Singular", "Diese Verpackung besteht aus Plastik.", "This packaging is made of plastic."],
      ["lex-a1rr-karton", "der Karton, die Kartons", "cardboard box", "der Karton · die Kartons", "Bitte machen Sie den Karton vor dem Entsorgen klein.", "Please flatten the cardboard box before disposing of it."],
      ["lex-a1rr-batterie", "die Batterie, die Batterien", "battery", "die Batterie · die Batterien", "Alte Batterien gehören nicht in den Restmüll.", "Old batteries do not belong in general waste."],
      ["lex-a1rr-elektroschrott", "der Elektroschrott", "electronic waste", "der Elektroschrott · nur Singular", "Elektroschrott bringen wir zum Wertstoffhof.", "We take electronic waste to the recycling center."],
      ["lex-a1rr-pfandflasche", "die Pfandflasche, die Pfandflaschen", "deposit bottle", "die Pfandflasche · die Pfandflaschen", "Pfandflaschen können Sie im Supermarkt zurückgeben.", "You can return deposit bottles at the supermarket."],
      ["lex-a1rr-sperrmuell", "der Sperrmüll", "bulky waste", "der Sperrmüll · nur Singular", "Für das alte Sofa müssen wir Sperrmüll anmelden.", "We have to arrange bulky-waste collection for the old sofa."]
    ],
    "a1-emergency-police": [
      ["lex-a1ep-tatort", "der Tatort, die Tatorte", "scene of the incident", "der Tatort · die Tatorte", "Bitte verändern Sie am Tatort nichts.", "Please do not change anything at the scene."],
      ["lex-a1ep-diebstahl", "der Diebstahl, die Diebstähle", "theft", "der Diebstahl · die Diebstähle", "Ich möchte einen Diebstahl melden.", "I would like to report a theft."],
      ["lex-a1ep-taeter", "der Täter, die Täter / die Täterin, die Täterinnen", "perpetrator", "der Täter · die Täterin", "Können Sie den Täter beschreiben?", "Can you describe the perpetrator?"],
      ["lex-a1ep-zeuge", "der Zeuge, die Zeugen / die Zeugin, die Zeuginnen", "witness", "der Zeuge · die Zeugin", "Eine Zeugin hat den Unfall gesehen.", "A witness saw the accident."],
      ["lex-a1ep-beschreibung", "die Beschreibung, die Beschreibungen", "description", "die Beschreibung · die Beschreibungen", "Ihre genaue Beschreibung hilft der Polizei.", "Your precise description helps the police."],
      ["lex-a1ep-verletzt", "verletzt", "injured", "verletzt sein · eine verletzte Person", "Sind Sie oder andere Personen verletzt?", "Are you or any other people injured?"]
    ],
    "a0-weather-clothes": [
      ["lex-a0wc-temperatur", "die Temperatur, die Temperaturen", "temperature", "die Temperatur · die Temperaturen", "Die Temperatur liegt heute bei zehn Grad.", "The temperature is ten degrees today."],
      ["lex-a0wc-grad", "das Grad, die Grad", "degree", "ein Grad · zehn Grad", "Am Morgen sind es nur drei Grad.", "It is only three degrees in the morning."],
      ["lex-a0wc-pullover", "der Pullover, die Pullover", "sweater", "der Pullover · die Pullover", "Bei Kälte trage ich einen warmen Pullover.", "I wear a warm sweater when it is cold."],
      ["lex-a0wc-schal", "der Schal, die Schals", "scarf", "der Schal · die Schals", "Der Schal liegt neben meiner Jacke.", "The scarf is next to my jacket."],
      ["lex-a0wc-handschuh", "der Handschuh, die Handschuhe", "glove", "der Handschuh · die Handschuhe", "Im Winter brauche ich warme Handschuhe.", "I need warm gloves in winter."],
      ["lex-a0wc-nass-trocken", "nass / trocken", "wet / dry", "nass · trocken", "Meine Schuhe sind nass, aber die Jacke ist trocken.", "My shoes are wet, but the jacket is dry."]
    ],
    "a0-family-friends": [
      ["lex-a0ff-geschwister", "die Geschwister", "siblings", "die Geschwister · nur Plural", "Ich habe zwei Geschwister.", "I have two siblings."],
      ["lex-a0ff-grosseltern", "die Großeltern", "grandparents", "die Großeltern · nur Plural", "Meine Großeltern wohnen in Bremen.", "My grandparents live in Bremen."],
      ["lex-a0ff-tante", "die Tante, die Tanten", "aunt", "die Tante · die Tanten", "Das ist meine Tante Sara.", "That is my aunt Sara."],
      ["lex-a0ff-onkel", "der Onkel, die Onkel", "uncle", "der Onkel · die Onkel", "Mein Onkel heißt Luis.", "My uncle's name is Luis."],
      ["lex-a0ff-cousin", "der Cousin, die Cousins / die Cousine, die Cousinen", "male / female cousin", "der Cousin · die Cousine", "Meine Cousine ist siebzehn Jahre alt.", "My cousin is seventeen years old."],
      ["lex-a0ff-verheiratet", "verheiratet", "married", "verheiratet sein · nicht verheiratet", "Meine Schwester ist verheiratet.", "My sister is married."]
    ],
    "a0-food-drinks": [
      ["lex-a0fd-broetchen", "das Brötchen, die Brötchen", "bread roll", "das Brötchen · die Brötchen", "Zum Frühstück esse ich ein Brötchen.", "I eat a bread roll for breakfast."],
      ["lex-a0fd-joghurt", "der Joghurt, die Joghurts", "yogurt", "der Joghurt · die Joghurts", "Ich möchte einen Joghurt, bitte.", "I would like a yogurt, please."],
      ["lex-a0fd-obst", "das Obst", "fruit", "das Obst · nur Singular", "Äpfel und Bananen sind Obst.", "Apples and bananas are fruit."],
      ["lex-a0fd-gemuese", "das Gemüse", "vegetables", "das Gemüse · nur Singular", "Ich esse gern Gemüse.", "I like eating vegetables."],
      ["lex-a0fd-zucker", "der Zucker", "sugar", "der Zucker · nur Singular", "Den Kaffee nehme ich ohne Zucker.", "I take my coffee without sugar."],
      ["lex-a0fd-fruehstuecken", "frühstücken", "to eat breakfast", "frühstücken · frühstückt", "Wir frühstücken um acht Uhr.", "We eat breakfast at eight o'clock."]
    ],
    "a1-neighbor-favors": [
      ["lex-a1nf-briefkasten", "der Briefkasten, die Briefkästen", "mailbox", "der Briefkasten · die Briefkästen", "Könntest du bitte den Briefkasten leeren?", "Could you please empty the mailbox?"],
      ["lex-a1nf-haustuer", "die Haustür, die Haustüren", "front door", "die Haustür · die Haustüren", "Bitte schließ die Haustür am Abend ab.", "Please lock the front door in the evening."],
      ["lex-a1nf-treppenhaus", "das Treppenhaus, die Treppenhäuser", "stairwell", "das Treppenhaus · die Treppenhäuser", "Das Paket steht im Treppenhaus.", "The parcel is in the stairwell."],
      ["lex-a1nf-muelltonne", "die Mülltonne, die Mülltonnen", "trash bin", "die Mülltonne · die Mülltonnen", "Am Dienstag muss die Mülltonne an die Straße.", "The trash bin has to go out by the street on Tuesday."],
      ["lex-a1nf-fuettern", "füttern", "to feed", "ein Tier füttern · füttert", "Kannst du meine Katze morgens füttern?", "Can you feed my cat in the morning?"],
      ["lex-a1nf-kuemmern", "sich kümmern um", "to take care of", "sich um etwas kümmern · kümmert sich", "Meine Nachbarin kümmert sich um die Pflanzen.", "My neighbor takes care of the plants."]
    ],
    "a1-culture-tickets": [
      ["lex-a1cult-theater", "das Theater, die Theater", "theater", "das Theater · die Theater", "Das Theater zeigt am Samstag ein neues Stück.", "The theater is presenting a new play on Saturday."],
      ["lex-a1cult-abendkasse", "die Abendkasse, die Abendkassen", "evening box office", "die Abendkasse · die Abendkassen", "Restkarten gibt es an der Abendkasse.", "Remaining tickets are available at the evening box office."],
      ["lex-a1cult-ermaessigung", "die Ermäßigung, die Ermäßigungen", "discount / reduced admission", "die Ermäßigung · die Ermäßigungen", "Mit dem Studierendenausweis bekomme ich eine Ermäßigung.", "I receive a discount with my student ID."],
      ["lex-a1cult-audioguide", "der Audioguide, die Audioguides", "audio guide", "der Audioguide · die Audioguides", "Der Audioguide ist auch auf Englisch verfügbar.", "The audio guide is also available in English."],
      ["lex-a1cult-pause", "die Pause, die Pausen", "intermission / break", "die Pause · die Pausen", "Nach einer Stunde gibt es eine kurze Pause.", "There is a short intermission after one hour."],
      ["lex-a1cult-leinwand", "die Leinwand, die Leinwände", "cinema screen", "die Leinwand · die Leinwände", "Unsere Plätze sind nah an der Leinwand.", "Our seats are close to the screen."]
    ],
    "a1-pets-vet": [
      ["lex-a1pv-impfpass", "der Impfpass, die Impfpässe", "vaccination record", "der Impfpass · die Impfpässe", "Bringen Sie bitte den Impfpass des Hundes mit.", "Please bring the dog's vaccination record."],
      ["lex-a1pv-transportbox", "die Transportbox, die Transportboxen", "pet carrier", "die Transportbox · die Transportboxen", "Die Katze wartet in ihrer Transportbox.", "The cat is waiting in its carrier."],
      ["lex-a1pv-pfote", "die Pfote, die Pfoten", "paw", "die Pfote · die Pfoten", "Der Hund belastet die linke Pfote nicht.", "The dog is not putting weight on its left paw."],
      ["lex-a1pv-fell", "das Fell, die Felle", "fur / coat", "das Fell · die Felle", "Die Katze verliert ungewöhnlich viel Fell.", "The cat is losing an unusual amount of fur."],
      ["lex-a1pv-erbrechen", "erbrechen", "to vomit", "erbrechen · erbricht · hat erbrochen", "Der Hund hat heute Morgen erbrochen.", "The dog vomited this morning."],
      ["lex-a1pv-durchfall", "der Durchfall", "diarrhea", "der Durchfall · nur Singular", "Meine Katze hat seit gestern Durchfall.", "My cat has had diarrhea since yesterday."]
    ]
  };

  const asciiAlternative = value => value
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("Ä", "Ae")
    .replaceAll("Ö", "Oe")
    .replaceAll("Ü", "Ue")
    .replaceAll("ß", "ss");

  const beginnerModules = course.modules.filter(module => module.level === "A0" || module.level === "A1");
  const modulesById = new Map(course.modules.map(module => [module.id, module]));
  const existingWordIds = new Set(course.modules.flatMap(module => module.words.map(word => word.id)));
  const introducedWordIds = new Set();

  const uncoveredModules = beginnerModules.filter(module => !expansion[module.id]).map(module => module.id);
  if (uncoveredModules.length) {
    throw new Error(`A0/A1 lexicon expansion is missing modules: ${uncoveredModules.join(", ")}`);
  }

  for (const [moduleId, rows] of Object.entries(expansion)) {
    const module = modulesById.get(moduleId);
    if (!module) throw new Error(`A0/A1 lexicon expansion target is missing: ${moduleId}`);
    if (module.level !== "A0" && module.level !== "A1") {
      throw new Error(`A0/A1 lexicon expansion points at a non-beginner module: ${moduleId}`);
    }

    for (const row of rows) {
      if (!Array.isArray(row) || row.length < 6 || row.slice(0, 6).some(value => typeof value !== "string" || !value.trim())) {
        throw new Error(`Invalid A0/A1 lexicon row in ${moduleId}`);
      }

      const [id, de, en, bundle, example, exampleEn, explicitVariants = []] = row;
      if (existingWordIds.has(id) || introducedWordIds.has(id)) {
        throw new Error(`Duplicate A0/A1 lexicon word id: ${id}`);
      }

      const variants = Array.isArray(explicitVariants) ? [...explicitVariants] : [];
      for (const value of [de, example]) {
        const ascii = asciiAlternative(value);
        if (ascii !== value && !variants.includes(ascii)) variants.push(ascii);
      }

      module.words.push({
        id,
        de,
        en,
        bundle,
        example,
        exampleEn,
        variants,
        practiceAnswers: [],
        supplemental: true
      });
      introducedWordIds.add(id);
    }
  }
})();
