(function () {
  const course = window.SATZWERK_CURRICULUM;
  if (!course?.modules) throw new Error("Satzwerk curriculum must load before the expansion pack");

  const expansion = {
    "a0-first-contact": {
      words: [
        ["a0fc-ja-nein", "ja / nein", "yes / no", "ja · nein", "Ja, ich bin neu hier.", "Yes, I am new here.", []],
        ["a0fc-entschuldigung", "Entschuldigung", "excuse me / sorry", "Entschuldigung · Entschuldigen Sie", "Entschuldigung, wie heißen Sie?", "Excuse me, what is your name?", ["Entschuldigung, wie heissen Sie?"]],
        ["a0fc-freut-mich", "Freut mich.", "Nice to meet you.", "Freut mich. · Freut mich auch.", "Hallo, ich bin Karim. Freut mich.", "Hello, I am Karim. Nice to meet you.", []],
        ["a0fc-willkommen", "Willkommen!", "Welcome!", "Willkommen! · Herzlich willkommen!", "Herzlich willkommen in Berlin!", "A warm welcome to Berlin!", []],
        ["a0fc-bis-morgen", "Bis morgen!", "See you tomorrow!", "Bis bald! · Bis später! · Bis morgen!", "Tschüss, bis morgen!", "Bye, see you tomorrow!", ["Bis spaeter!"]],
        ["a0fc-gut", "gut", "good / well", "gut · sehr gut · ganz gut", "Mir geht es ganz gut.", "I am doing fairly well.", []],
        ["a0fc-muede", "müde", "tired", "müde sein", "Ich bin heute müde.", "I am tired today.", ["muede"]],
        ["a0fc-auch", "auch", "also / too", "ich auch · Sie auch", "Freut mich auch.", "Nice to meet you too.", []]
      ],
      grammar: [
        ["Short spoken forms", "In everyday speech, geht es often contracts to geht's. The apostrophe marks the missing e.", "Wie geht's? Mir geht's gut.", "How are you? I am well."]
      ]
    },
    "a0-personal-details": {
      words: [
        ["a0pd-alt", "Jahre alt sein", "to be years old", "Ich bin ... Jahre alt.", "Ich bin vierundzwanzig Jahre alt.", "I am twenty-four years old.", []],
        ["a0pd-email", "die E-Mail-Adresse, die E-Mail-Adressen", "email address", "die E-Mail-Adresse · die E-Mail-Adressen", "Meine E-Mail-Adresse ist lena@example.de.", "My email address is lena@example.de.", []],
        ["a0pd-strasse", "die Straße, die Straßen", "street", "die Straße · die Straßen", "Ich wohne in der Gartenstraße.", "I live on Gartenstrasse.", ["die Strasse, die Strassen"]],
        ["a0pd-postleitzahl", "die Postleitzahl, die Postleitzahlen", "postal code", "die Postleitzahl · die Postleitzahlen", "Die Postleitzahl ist 53111.", "The postal code is 53111.", []],
        ["a0pd-buchstabieren", "buchstabieren", "to spell", "buchstabieren · ich buchstabiere", "Ich buchstabiere meinen Namen.", "I spell my name.", []],
        ["a0pd-verstehen", "verstehen", "to understand", "verstehen · ich verstehe · du verstehst", "Ich verstehe die Frage.", "I understand the question.", []],
        ["a0pd-wiederholen", "wiederholen", "to repeat", "etwas wiederholen", "Können Sie das bitte wiederholen?", "Could you repeat that, please?", []],
        ["a0pd-langsam", "langsam", "slow / slowly", "langsam sprechen", "Bitte sprechen Sie langsam.", "Please speak slowly.", []]
      ],
      grammar: [
        ["Formal personal questions", "With formal Sie, keep Sie capitalized and use the plural verb form.", "Wo wohnen Sie? Welche Sprachen sprechen Sie?", "Where do you live? Which languages do you speak?"]
      ]
    },
    "a0-everyday-things": {
      words: [
        ["a0et-tuer", "die Tür, die Türen", "door", "die Tür · die Türen", "Die Tür ist offen.", "The door is open.", ["die Tuer, die Tueren"]],
        ["a0et-fenster", "das Fenster, die Fenster", "window", "das Fenster · die Fenster", "Das Fenster ist groß.", "The window is large.", ["Das Fenster ist gross."]],
        ["a0et-stift", "der Stift, die Stifte", "pen", "der Stift · die Stifte", "Der Stift liegt auf dem Tisch.", "The pen is on the table.", []],
        ["a0et-bleistift", "der Bleistift, die Bleistifte", "pencil", "der Bleistift · die Bleistifte", "Ich brauche einen Bleistift.", "I need a pencil.", []],
        ["a0et-uhr", "die Uhr, die Uhren", "clock / watch", "die Uhr · die Uhren", "Die Uhr hängt an der Wand.", "The clock hangs on the wall.", []],
        ["a0et-brille", "die Brille, die Brillen", "glasses", "die Brille · die Brillen", "Meine Brille liegt auf dem Buch.", "My glasses are on the book.", []],
        ["a0et-brauchen", "brauchen", "to need", "brauchen · ich brauche · wir brauchen", "Wir brauchen zwei Stühle.", "We need two chairs.", ["Wir brauchen zwei Stuehle."]],
        ["a0et-farben", "rot / blau / grün / gelb", "red / blue / green / yellow", "rot · blau · grün · gelb", "Das Buch ist grün.", "The book is green.", ["rot / blau / gruen / gelb"]]
      ],
      grammar: [
        ["Plural article", "All plural nouns use die in the nominative. Learn each plural form inside the noun bundle.", "der Stuhl, die Stühle · das Buch, die Bücher", "the chair, the chairs · the book, the books"]
      ]
    },
    "a1-people-family-work": {
      words: [
        ["a1pf-freundin", "die Freundin, die Freundinnen", "female friend / girlfriend", "die Freundin · die Freundinnen", "Das ist meine Freundin Aylin.", "This is my friend Aylin.", []],
        ["a1pf-kind", "das Kind, die Kinder", "child", "das Kind · die Kinder", "Sie haben zwei Kinder.", "They have two children.", []],
        ["a1pf-sohn", "der Sohn, die Söhne", "son", "der Sohn · die Söhne", "Ihr Sohn geht in die Schule.", "Her son goes to school.", ["der Sohn, die Soehne"]],
        ["a1pf-tochter", "die Tochter, die Töchter", "daughter", "die Tochter · die Töchter", "Unsere Tochter heißt Mia.", "Our daughter's name is Mia.", ["die Tochter, die Toechter"]],
        ["a1pf-partner", "der Partner, die Partner / die Partnerin, die Partnerinnen", "partner", "der Partner · die Partnerin", "Meine Partnerin arbeitet in Köln.", "My partner works in Cologne.", ["Meine Partnerin arbeitet in Koeln."]],
        ["a1pf-kollege", "der Kollege, die Kollegen / die Kollegin, die Kolleginnen", "colleague", "der Kollege · die Kollegin", "Meine Kollegin spricht drei Sprachen.", "My colleague speaks three languages.", []],
        ["a1pf-verheiratet", "verheiratet", "married", "verheiratet sein · seit zwei Jahren verheiratet", "Meine Eltern sind verheiratet.", "My parents are married.", []],
        ["a1pf-studieren", "studieren", "to study at university", "studieren · ich studiere", "Lea studiert in Leipzig.", "Lea studies at university in Leipzig.", []]
      ],
      grammar: [
        ["Negating descriptions", "Place nicht before an adjective or description that you want to negate.", "Er ist nicht verheiratet. Sie ist nicht müde.", "He is not married. She is not tired."]
      ]
    },
    "a1-daily-routine": {
      words: [
        ["a1dr-wecker", "der Wecker, die Wecker", "alarm clock", "der Wecker · die Wecker", "Der Wecker klingelt um sechs Uhr.", "The alarm clock rings at six.", []],
        ["a1dr-aufwachen", "aufwachen", "to wake up", "aufwachen · ich wache auf", "Ich wache um halb sieben auf.", "I wake up at half past six.", []],
        ["a1dr-duschen", "sich duschen", "to shower", "sich duschen · ich dusche mich", "Nach dem Frühstück dusche ich mich.", "I shower after breakfast.", ["Nach dem Fruehstueck dusche ich mich."]],
        ["a1dr-lernen", "lernen", "to learn / study", "lernen · ich lerne", "Am Abend lerne ich Deutsch.", "I study German in the evening.", []],
        ["a1dr-kochen", "kochen", "to cook", "kochen · ich koche", "Nach der Arbeit koche ich.", "I cook after work.", []],
        ["a1dr-schlafen", "schlafen", "to sleep", "schlafen · ich schlafe · du schläfst", "Am Wochenende schlafe ich länger.", "I sleep longer on the weekend.", ["schlafen · ich schlafe · du schlaefst"]],
        ["a1dr-koennen", "können", "can / to be able to", "können · ich kann · wir können", "Heute kann ich zu Hause arbeiten.", "I can work from home today.", ["koennen"]],
        ["a1dr-wollen", "wollen", "to want to", "wollen · ich will · wir wollen", "Wir wollen um acht Uhr anfangen.", "We want to begin at eight.", []]
      ],
      grammar: [
        ["Time prepositions", "Use am with days and parts of the day, um with clock times, and von ... bis for a time range.", "Am Montag arbeite ich von neun bis fünf Uhr.", "On Monday I work from nine until five."]
      ]
    },
    "a1-food-shopping": {
      words: [
        ["a1fs-milch", "die Milch, nur Singular", "milk", "die Milch · eine Packung Milch", "Wir brauchen eine Packung Milch.", "We need a carton of milk.", []],
        ["a1fs-ei", "das Ei, die Eier", "egg", "das Ei · die Eier", "Ich kaufe sechs Eier.", "I am buying six eggs.", []],
        ["a1fs-gemuese", "das Gemüse, meist Singular", "vegetables", "das Gemüse · meist ohne Plural", "Das Gemüse ist frisch.", "The vegetables are fresh.", ["das Gemuese"]],
        ["a1fs-obst", "das Obst, nur Singular", "fruit", "das Obst · ohne Plural", "Auf dem Markt kaufe ich Obst.", "I buy fruit at the market.", []],
        ["a1fs-packung", "die Packung, die Packungen", "package / carton", "die Packung · die Packungen", "Eine Packung Reis kostet zwei Euro.", "A package of rice costs two euros.", []],
        ["a1fs-kilo", "das Kilo, die Kilos", "kilogram", "ein Kilo · zwei Kilo", "Ich nehme ein Kilo Äpfel.", "I will take one kilogram of apples.", ["Ich nehme ein Kilo Aepfel."]],
        ["a1fs-nehmen", "nehmen", "to take / choose", "nehmen · ich nehme · du nimmst", "Ich nehme den Salat.", "I will take the salad.", []],
        ["a1fs-sonst-etwas", "Sonst noch etwas?", "Anything else?", "Sonst noch etwas? · Das ist alles.", "Nein, danke. Das ist alles.", "No, thank you. That is everything.", []]
      ],
      grammar: [
        ["Kein in the accusative", "Kein follows the same endings as ein. Masculine uses keinen, feminine uses keine, and neuter uses kein.", "Ich kaufe keinen Käse und keine Milch.", "I am buying no cheese and no milk."]
      ]
    },
    "a1-home-and-town": {
      words: [
        ["a1ht-haus", "das Haus, die Häuser", "house", "das Haus · die Häuser", "Das Haus hat einen kleinen Garten.", "The house has a small garden.", ["das Haus, die Haeuser"]],
        ["a1ht-wohnzimmer", "das Wohnzimmer, die Wohnzimmer", "living room", "das Wohnzimmer · die Wohnzimmer", "Im Wohnzimmer steht ein Sofa.", "A sofa stands in the living room.", []],
        ["a1ht-bett", "das Bett, die Betten", "bed", "das Bett · die Betten", "Das Bett steht am Fenster.", "The bed stands by the window.", []],
        ["a1ht-sofa", "das Sofa, die Sofas", "sofa", "das Sofa · die Sofas", "Neben dem Sofa steht eine Lampe.", "A lamp stands next to the sofa.", []],
        ["a1ht-wand", "die Wand, die Wände", "wall", "die Wand · die Wände", "Das Bild hängt an der Wand.", "The picture hangs on the wall.", ["die Wand, die Waende"]],
        ["a1ht-supermarkt", "der Supermarkt, die Supermärkte", "supermarket", "der Supermarkt · die Supermärkte", "Der Supermarkt ist neben der Apotheke.", "The supermarket is next to the pharmacy.", ["der Supermarkt, die Supermaerkte"]],
        ["a1ht-bank", "die Bank, die Banken", "bank", "die Bank · die Banken", "Die Bank ist gegenüber dem Bahnhof.", "The bank is across from the station.", ["Die Bank ist gegenueber dem Bahnhof."]],
        ["a1ht-stehen", "stehen", "to stand / be upright", "stehen · es steht", "Der Schrank steht im Schlafzimmer.", "The wardrobe stands in the bedroom.", []]
      ],
      grammar: [
        ["Common contractions", "Frequent preposition and article pairs contract in everyday German: in dem becomes im, an dem becomes am, and zu der becomes zur.", "Das Bett steht im Zimmer. Die Lampe steht am Fenster.", "The bed is in the room. The lamp stands by the window."]
      ]
    },
    "a1-plans-and-leisure": {
      words: [
        ["a1pl-film", "der Film, die Filme", "film / movie", "der Film · die Filme", "Der Film beginnt um Viertel nach acht.", "The film begins at quarter past eight.", []],
        ["a1pl-kino", "das Kino, die Kinos", "cinema", "das Kino · die Kinos", "Wir treffen uns vor dem Kino.", "We meet in front of the cinema.", []],
        ["a1pl-geburtstag", "der Geburtstag, die Geburtstage", "birthday", "der Geburtstag · die Geburtstage", "Am Samstag feiere ich meinen Geburtstag.", "I am celebrating my birthday on Saturday.", []],
        ["a1pl-musik", "die Musik, nur Singular", "music", "Musik hören · Musik machen", "Welche Musik hörst du gern?", "Which music do you like listening to?", ["Welche Musik hoerst du gern?"]],
        ["a1pl-lust", "Lust haben auf", "to feel like / want", "Lust haben auf + accusative", "Hast du Lust auf Kino?", "Do you feel like going to the cinema?", []],
        ["a1pl-tanzen", "tanzen", "to dance", "tanzen · ich tanze", "Auf der Party tanzen wir.", "We dance at the party.", []],
        ["a1pl-feiern", "feiern", "to celebrate", "feiern · ich feiere", "Wir feiern am Freitag zusammen.", "We are celebrating together on Friday.", []],
        ["a1pl-zu-absagen", "zusagen / absagen", "to accept / cancel", "einer Einladung zusagen · eine Einladung absagen", "Ich muss die Einladung leider absagen.", "Unfortunately, I have to decline the invitation.", []]
      ],
      grammar: [
        ["Main-clause connectors", "Und, aber, oder, and denn join main clauses. The conjugated verb keeps its usual position in each clause.", "Ich komme später, denn ich arbeite bis sechs.", "I am coming later because I work until six."]
      ]
    },
    "a1-travel-and-services": {
      words: [
        ["a1ts-zug", "der Zug, die Züge", "train", "der Zug · die Züge", "Der Zug nach Köln fährt gleich ab.", "The train to Cologne departs shortly.", ["der Zug, die Zuege", "Der Zug nach Koeln faehrt gleich ab."]],
        ["a1ts-bus", "der Bus, die Busse", "bus", "der Bus · die Busse", "Der Bus hält vor dem Bahnhof.", "The bus stops in front of the station.", ["Der Bus haelt vor dem Bahnhof."]],
        ["a1ts-hotel", "das Hotel, die Hotels", "hotel", "das Hotel · die Hotels", "Unser Hotel liegt im Zentrum.", "Our hotel is in the center.", []],
        ["a1ts-fahrkartenautomat", "der Fahrkartenautomat, die Fahrkartenautomaten", "ticket machine", "der Fahrkartenautomat · die Fahrkartenautomaten", "Der Fahrkartenautomat ist am Eingang.", "The ticket machine is by the entrance.", []],
        ["a1ts-verbindung", "die Verbindung, die Verbindungen", "connection", "die Verbindung · eine direkte Verbindung", "Gibt es eine direkte Verbindung nach Bonn?", "Is there a direct connection to Bonn?", []],
        ["a1ts-ankommen", "ankommen", "to arrive", "ankommen · der Zug kommt an", "Wann kommt der Zug in Berlin an?", "When does the train arrive in Berlin?", []],
        ["a1ts-funktionieren", "funktionieren", "to work / function", "funktionieren · es funktioniert", "Der Automat funktioniert nicht.", "The machine is not working.", []],
        ["a1ts-wo-finde-ich", "Wo finde ich ...?", "Where can I find ...?", "Wo finde ich den Ausgang? · Wo finde ich ein Taxi?", "Entschuldigung, wo finde ich Gleis sechs?", "Excuse me, where can I find platform six?", []]
      ],
      grammar: [
        ["Dative contractions", "Zu dem contracts to zum, zu der contracts to zur, and von dem contracts to vom.", "Ich gehe zum Bahnhof und fahre vom Bahnhof mit dem Bus.", "I go to the station and travel from the station by bus."]
      ]
    },
    "a1-health-past-checkpoint": {
      words: [
        ["a1hp-ruecken", "der Rücken, die Rücken", "back", "der Rücken · die Rücken", "Mein Rücken tut weh.", "My back hurts.", ["der Ruecken, die Ruecken"]],
        ["a1hp-erkaeltung", "die Erkältung, die Erkältungen", "cold / respiratory infection", "die Erkältung · die Erkältungen", "Ich habe eine starke Erkältung.", "I have a bad cold.", ["die Erkaeltung, die Erkaeltungen"]],
        ["a1hp-schmerz", "der Schmerz, die Schmerzen", "pain", "der Schmerz · die Schmerzen · Schmerzen haben", "Seit gestern habe ich Kopfschmerzen.", "I have had a headache since yesterday.", []],
        ["a1hp-medikament", "das Medikament, die Medikamente", "medication", "das Medikament · die Medikamente", "Nehmen Sie das Medikament am Morgen.", "Take the medication in the morning.", []],
        ["a1hp-krank-gesund", "krank / gesund", "ill / healthy", "krank sein · wieder gesund sein", "David ist krank und bleibt zu Hause.", "David is ill and stays home.", []],
        ["a1hp-schnee", "der Schnee, meist Singular", "snow", "der Schnee · es schneit", "Im Winter schneit es manchmal.", "It sometimes snows in winter.", []],
        ["a1hp-kalt-warm", "kalt / warm", "cold / warm", "kalt sein · warm werden", "Gestern war es kalt, heute ist es warm.", "Yesterday it was cold; today it is warm.", []],
        ["a1hp-windig-bewoelkt", "windig / bewölkt", "windy / cloudy", "windig sein · bewölkt sein", "Am Nachmittag wird es windig und bewölkt.", "It will become windy and cloudy in the afternoon.", ["windig / bewoelkt"]]
      ],
      grammar: [
        ["Participle patterns", "Regular verbs often use ge plus stem plus t. Separable verbs place ge between prefix and stem. Verbs ending in -ieren omit ge.", "gemacht · eingekauft · studiert", "done · shopped · studied"]
      ]
    }
  };

  Object.assign(expansion, {
    "a2-erlebnisse": {
      words: [
        ["a2e-ausflug", "der Ausflug, die Ausflüge", "outing / excursion", "einen Ausflug machen", "Wir haben am Sonntag einen Ausflug gemacht.", "We went on an outing on Sunday.", ["der Ausflug, die Ausfluege"]],
        ["a2e-fotografieren", "fotografieren, hat fotografiert", "to photograph", "eine Landschaft fotografieren", "Sie hat den alten Marktplatz fotografiert.", "She photographed the old market square.", []],
        ["a2e-verbringen", "verbringen, hat verbracht", "to spend time", "Zeit mit jemandem verbringen", "Ich habe den Nachmittag mit meiner Familie verbracht.", "I spent the afternoon with my family.", []],
        ["a2e-vergessen", "vergessen, hat vergessen", "to forget", "etwas zu Hause vergessen", "Er hat seinen Regenschirm im Café vergessen.", "He forgot his umbrella in the café.", []],
        ["a2e-unternehmen", "unternehmen, hat unternommen", "to do / undertake", "etwas zusammen unternehmen", "Was habt ihr am Wochenende unternommen?", "What did you do together on the weekend?", []],
        ["a2e-enden", "enden, hat geendet", "to end", "spät enden", "Das Konzert hat kurz vor elf geendet.", "The concert ended shortly before eleven.", []],
        ["a2e-erzaehlen", "erzählen, hat erzählt", "to tell / recount", "jemandem von einem Erlebnis erzählen", "Mara hat uns von ihrer Reise erzählt.", "Mara told us about her trip.", ["erzaehlen, hat erzaehlt"]],
        ["a2e-zurueckkommen", "zurückkommen, ist zurückgekommen", "to come back", "nach Hause zurückkommen", "Wir sind am Sonntagabend zurückgekommen.", "We came back on Sunday evening.", ["zurueckkommen, ist zurueckgekommen"]]
      ],
      grammar: [
        ["Past-time expressions", "Use am with days, im with months, and vor for a point before now.", "Am Samstag haben wir einen Ausflug gemacht. Vor zwei Tagen sind wir zurückgekommen.", "On Saturday we went on an outing. We came back two days ago."]
      ]
    },
    "a2-wohnung-raum": {
      words: [
        ["a2w-balkon", "der Balkon, die Balkone", "balcony", "auf dem Balkon", "Auf dem Balkon stehen zwei Stühle.", "Two chairs stand on the balcony.", []],
        ["a2w-keller", "der Keller, die Keller", "basement / cellar", "im Keller", "Die Fahrräder stehen im Keller.", "The bicycles are in the basement.", []],
        ["a2w-teppich", "der Teppich, die Teppiche", "rug / carpet", "auf dem Teppich", "Der Teppich liegt vor dem Sofa.", "The rug lies in front of the sofa.", []],
        ["a2w-fenster", "das Fenster, die Fenster", "window", "am Fenster", "Der Schreibtisch steht am Fenster.", "The desk stands by the window.", []],
        ["a2w-tuer", "die Tür, die Türen", "door", "hinter der Tür", "Die Jacke hängt hinter der Tür.", "The jacket hangs behind the door.", ["die Tuer, die Tueren"]],
        ["a2w-aufraeumen", "aufräumen, hat aufgeräumt", "to tidy up", "ein Zimmer aufräumen", "Wir haben das Wohnzimmer aufgeräumt.", "We tidied the living room.", ["aufraeumen, hat aufgeraeumt"]],
        ["a2w-einziehen", "einziehen, ist eingezogen", "to move in", "in eine Wohnung einziehen", "Die neuen Mieter sind gestern eingezogen.", "The new tenants moved in yesterday.", []],
        ["a2w-gegenueber", "gegenüber", "opposite", "jemandem oder etwas gegenüber", "Das Haus liegt dem Park gegenüber.", "The house is opposite the park.", ["gegenueber"]]
      ],
      grammar: [
        ["Home expressions", "Use zu Hause for a location and nach Hause for movement toward home.", "Mara ist zu Hause. Ich gehe später nach Hause.", "Mara is at home. I am going home later."]
      ]
    },
    "a2-termine-plaene": {
      words: [
        ["a2t-verfuegbar", "verfügbar", "available", "ab einer Uhrzeit verfügbar sein", "Ich bin am Donnerstag ab fünfzehn Uhr verfügbar.", "I am available on Thursday from 3 p.m.", ["verfuegbar"]],
        ["a2t-uhrzeit", "die Uhrzeit, die Uhrzeiten", "time of day", "eine Uhrzeit nennen", "Welche Uhrzeit passt Ihnen am besten?", "Which time works best for you?", []],
        ["a2t-bestaetigen", "bestätigen, hat bestätigt", "to confirm", "einen Termin bestätigen", "Bitte bestätigen Sie den Termin bis Dienstag.", "Please confirm the appointment by Tuesday.", ["bestaetigen, hat bestaetigt"]],
        ["a2t-sprechstunde", "die Sprechstunde, die Sprechstunden", "consultation hour", "eine Sprechstunde anbieten", "Die Sprechstunde beginnt um neun Uhr.", "The consultation hour begins at nine.", []],
        ["a2t-vormittag", "der Vormittag, die Vormittage", "morning", "am Vormittag", "Am Vormittag habe ich noch Zeit.", "I still have time in the morning.", []],
        ["a2t-nachmittag", "der Nachmittag, die Nachmittage", "afternoon", "am Nachmittag", "Der Freitagnachmittag wäre möglich.", "Friday afternoon would be possible.", []],
        ["a2t-erreichen", "erreichen, hat erreicht", "to reach / contact", "jemanden telefonisch erreichen", "Wann kann ich Sie telefonisch erreichen?", "When can I reach you by phone?", []],
        ["a2t-melden", "sich melden, hat sich gemeldet", "to get in touch", "sich bei jemandem melden", "Ich melde mich morgen bei Ihnen.", "I will get in touch with you tomorrow.", []]
      ],
      grammar: [
        ["Time prepositions", "Use um for a clock time, am for a day or part of the day, and von bis for a time range.", "Der Termin ist am Freitag von zehn bis elf Uhr.", "The appointment is on Friday from ten to eleven."]
      ]
    },
    "a2-gesundheit": {
      words: [
        ["a2g-bauch", "der Bauch, die Bäuche", "stomach / abdomen", "Bauchschmerzen haben", "Mein Bauch tut seit gestern weh.", "My stomach has hurt since yesterday.", ["der Bauch, die Baeuche"]],
        ["a2g-uebelkeit", "die Übelkeit, kein Plural", "nausea", "unter Übelkeit leiden", "Die Übelkeit begann heute Morgen.", "The nausea began this morning.", ["die Uebelkeit"]],
        ["a2g-tablette", "die Tablette, die Tabletten", "tablet / pill", "eine Tablette nehmen", "Nehmen Sie die Tablette nach dem Essen.", "Take the tablet after eating.", []],
        ["a2g-medikament", "das Medikament, die Medikamente", "medication", "ein Medikament gegen etwas", "Dieses Medikament hilft gegen den Husten.", "This medication helps with the cough.", []],
        ["a2g-praxis", "die Praxis, die Praxen", "medical practice", "in einer Praxis anrufen", "Die Praxis öffnet um acht Uhr.", "The medical practice opens at eight.", []],
        ["a2g-notfall", "der Notfall, die Notfälle", "emergency", "im Notfall", "Im Notfall rufen Sie 112 an.", "In an emergency, call 112.", ["der Notfall, die Notfaelle"]],
        ["a2g-verletzen", "sich verletzen, hat sich verletzt", "to injure oneself", "sich am Fuß verletzen", "Sie hat sich beim Sport am Fuß verletzt.", "She injured her foot while exercising.", []],
        ["a2g-verschreiben", "verschreiben, hat verschrieben", "to prescribe", "jemandem ein Medikament verschreiben", "Die Ärztin hat mir ein Medikament verschrieben.", "The doctor prescribed medication for me.", []]
      ],
      grammar: [
        ["Seit with the present tense", "Use seit with the present tense for a condition that began earlier and continues now.", "Seit drei Tagen habe ich Bauchschmerzen.", "I have had stomach pain for three days."]
      ]
    },
    "a2-arbeit-lernen": {
      words: [
        ["a2a-besprechung", "die Besprechung, die Besprechungen", "meeting", "an einer Besprechung teilnehmen", "Die Besprechung beginnt um zehn Uhr.", "The meeting begins at ten.", []],
        ["a2a-abteilung", "die Abteilung, die Abteilungen", "department", "in einer Abteilung arbeiten", "Sie arbeitet in der Personalabteilung.", "She works in the human resources department.", []],
        ["a2a-arbeitsplatz", "der Arbeitsplatz, die Arbeitsplätze", "workplace / workstation", "am Arbeitsplatz", "Mein Arbeitsplatz ist im zweiten Stock.", "My workplace is on the second floor.", ["der Arbeitsplatz, die Arbeitsplaetze"]],
        ["a2a-erledigen", "erledigen, hat erledigt", "to complete / take care of", "eine Aufgabe erledigen", "Ich erledige die Aufgabe heute.", "I will complete the task today.", []],
        ["a2a-vorbereiten", "vorbereiten, hat vorbereitet", "to prepare", "etwas für eine Besprechung vorbereiten", "Wir bereiten die Besprechung gemeinsam vor.", "We are preparing the meeting together.", []],
        ["a2a-danken", "jemandem danken, hat gedankt", "to thank someone", "jemandem für etwas danken", "Ich danke dir für deine Hilfe.", "I thank you for your help.", []],
        ["a2a-gefallen", "jemandem gefallen, hat gefallen", "to appeal to someone", "gefallen plus dative", "Der neue Kurs gefällt mir.", "I like the new course.", []],
        ["a2a-gehoeren", "jemandem gehören, hat gehört", "to belong to someone", "gehören plus dative", "Der Laptop gehört der Firma.", "The laptop belongs to the company.", ["jemandem gehoeren, hat gehoert"]]
      ],
      grammar: [
        ["One pronoun and one noun", "An unstressed personal pronoun usually comes before a noun object.", "Ich schicke ihm den Bericht. Ich schicke ihn der Chefin.", "I send him the report. I send it to the manager."]
      ]
    },
    "a2-unterwegs": {
      words: [
        ["a2u-anschluss", "der Anschluss, die Anschlüsse", "connection", "einen Anschluss erreichen", "Wir haben den Anschluss in Köln erreicht.", "We made the connection in Cologne.", ["der Anschluss, die Anschluesse"]],
        ["a2u-abfahrt", "die Abfahrt, die Abfahrten", "departure", "die Abfahrt um sieben Uhr", "Die Abfahrt ist um 7.40 Uhr.", "Departure is at 7:40.", []],
        ["a2u-ankunft", "die Ankunft, die Ankünfte", "arrival", "die geplante Ankunft", "Die Ankunft verschiebt sich um zehn Minuten.", "The arrival is delayed by ten minutes.", ["die Ankunft, die Ankuenfte"]],
        ["a2u-bahnsteig", "der Bahnsteig, die Bahnsteige", "platform", "am Bahnsteig warten", "Wir warten am Bahnsteig auf den Zug.", "We are waiting for the train on the platform.", []],
        ["a2u-schalter", "der Schalter, die Schalter", "service counter", "am Schalter fragen", "Am Schalter bekommen Sie weitere Informationen.", "You can get more information at the counter.", []],
        ["a2u-verpassen", "verpassen, hat verpasst", "to miss", "einen Zug oder Anschluss verpassen", "Wegen der Verspätung haben wir den Anschluss verpasst.", "We missed the connection because of the delay.", []],
        ["a2u-abholen", "abholen, hat abgeholt", "to pick up", "jemanden am Bahnhof abholen", "Meine Schwester holt mich am Bahnhof ab.", "My sister is picking me up at the station.", []],
        ["a2u-durchsage", "die Durchsage, die Durchsagen", "announcement", "eine Durchsage hören", "Die Durchsage war schwer zu verstehen.", "The announcement was hard to understand.", []]
      ],
      grammar: [
        ["Means of transport", "Use mit plus dative for a vehicle. Use zu Fuß for walking.", "Wir fahren mit dem Zug und gehen danach zu Fuß.", "We travel by train and then continue on foot."]
      ]
    },
    "a2-einkaufen-service": {
      words: [
        ["a2s-teuer", "teuer", "expensive", "zu teuer sein", "Der Mantel ist mir zu teuer.", "The coat is too expensive for me.", []],
        ["a2s-angebot", "das Angebot, die Angebote", "offer / sale", "im Angebot sein", "Das Angebot gilt nur heute.", "The offer is valid only today.", []],
        ["a2s-rabatt", "der Rabatt, die Rabatte", "discount", "Rabatt auf etwas bekommen", "Auf die Jacke gibt es zwanzig Prozent Rabatt.", "The jacket has a twenty percent discount.", []],
        ["a2s-kasse", "die Kasse, die Kassen", "checkout / register", "an der Kasse", "Sie bezahlt an der Kasse.", "She pays at the checkout.", []],
        ["a2s-bezahlen", "bezahlen, hat bezahlt", "to pay", "bar oder mit Karte bezahlen", "Kann ich mit Karte bezahlen?", "Can I pay by card?", []],
        ["a2s-zurueckgeben", "zurückgeben, hat zurückgegeben", "to return", "einen Artikel zurückgeben", "Ich möchte den Artikel zurückgeben.", "I would like to return the item.", ["zurueckgeben, hat zurueckgegeben"]],
        ["a2s-kaputt", "kaputt", "broken", "kaputt sein · kaputtgehen", "Das Gerät ist schon kaputt.", "The device is already broken.", []],
        ["a2s-farbe", "die Farbe, die Farben", "color", "eine Farbe auswählen", "Diese Farbe gefällt mir.", "I like this color.", []]
      ],
      grammar: [
        ["Adjectives without an article", "When no article shows gender or case, the adjective carries that information.", "Ich kaufe frisches Brot und kalte Milch.", "I am buying fresh bread and cold milk."]
      ]
    },
    "a2-einladen-meinen": {
      words: [
        ["a2i-feier", "die Feier, die Feiern", "celebration / party", "eine Feier organisieren", "Die Feier beginnt um sieben Uhr.", "The celebration begins at seven.", []],
        ["a2i-mitbringen", "mitbringen, hat mitgebracht", "to bring along", "etwas zur Feier mitbringen", "Soll ich einen Salat mitbringen?", "Should I bring a salad?", []],
        ["a2i-stattfinden", "stattfinden, hat stattgefunden", "to take place", "am Samstag stattfinden", "Das Treffen findet im Park statt.", "The meeting takes place in the park.", []],
        ["a2i-lust", "die Lust, kein Plural", "desire / interest", "Lust auf etwas haben", "Hast du Lust auf einen Film?", "Would you like to see a film?", []],
        ["a2i-verabreden", "sich verabreden, hat sich verabredet", "to arrange to meet", "sich mit jemandem verabreden", "Wir haben uns für Sonntag verabredet.", "We arranged to meet on Sunday.", []],
        ["a2i-vorschlag", "der Vorschlag, die Vorschläge", "suggestion", "einen Vorschlag machen", "Dein Vorschlag klingt gut.", "Your suggestion sounds good.", ["der Vorschlag, die Vorschlaege"]],
        ["a2i-einverstanden", "mit etwas einverstanden sein", "to agree with something", "einverstanden sein mit plus dative", "Ich bin mit dem Vorschlag einverstanden.", "I agree with the suggestion.", []],
        ["a2i-bedanken", "sich bedanken, hat sich bedankt", "to thank", "sich für etwas bedanken", "Ich bedanke mich für die Einladung.", "Thank you for the invitation.", ["sich fuer etwas bedanken"]]
      ],
      grammar: [
        ["Reason with denn", "Denn connects two main clauses and keeps normal word order in the second clause.", "Ich komme später, denn ich muss noch arbeiten.", "I am coming later because I still have to work."]
      ]
    }
  });

  Object.assign(expansion, {
    "b1-erzaehlen": {
      words: [
        ["b1e-ursache", "die Ursache, die Ursachen", "cause", "die Ursache für etwas", "Die Ursache des Problems blieb lange unklar.", "The cause of the problem remained unclear for a long time.", []],
        ["b1e-folge", "die Folge, die Folgen", "consequence", "Folgen für jemanden haben", "Die Entscheidung hatte unerwartete Folgen.", "The decision had unexpected consequences.", []],
        ["b1e-zufall", "der Zufall, die Zufälle", "coincidence / chance", "durch Zufall", "Durch Zufall fand sie den verlorenen Schlüssel.", "By chance, she found the lost key.", ["der Zufall, die Zufaelle"]],
        ["b1e-entscheiden", "sich entscheiden, hat sich entschieden", "to decide", "sich für etwas entscheiden", "Am Ende entschied er sich für den früheren Zug.", "In the end, he chose the earlier train.", []],
        ["b1e-entdecken", "entdecken, hat entdeckt", "to discover", "etwas Unerwartetes entdecken", "Im Keller entdeckten wir eine alte Kiste.", "We discovered an old box in the basement.", []],
        ["b1e-verschwinden", "verschwinden, ist verschwunden", "to disappear", "plötzlich verschwinden", "Der Hund war plötzlich verschwunden.", "The dog had suddenly disappeared.", []],
        ["b1e-erschrecken", "erschrecken, ist erschrocken", "to be startled", "über etwas erschrecken", "Ich bin über das laute Geräusch erschrocken.", "I was startled by the loud noise.", []],
        ["b1e-wundern", "sich über etwas wundern, hat sich gewundert", "to be surprised by", "sich wundern über plus accusative", "Sie wunderte sich über die leere Straße.", "She was surprised by the empty street.", ["sich ueber etwas wundern"]]
      ],
      grammar: [
        ["Als and wenn in the past", "Use als for one completed past situation. Use wenn for repeated past situations.", "Als ich ankam, regnete es. Wenn es regnete, nahm ich den Bus.", "When I arrived, it was raining. Whenever it rained, I took the bus."]
      ]
    },
    "b1-wohnen-nachbarschaft": {
      words: [
        ["b1w-hausmeister", "der Hausmeister, die Hausmeister", "caretaker / building manager", "den Hausmeister informieren", "Der Hausmeister prüft morgen die Heizung.", "The caretaker will inspect the heating tomorrow.", []],
        ["b1w-reparatur", "die Reparatur, die Reparaturen", "repair", "eine Reparatur veranlassen", "Die Reparatur soll am Montag beginnen.", "The repair is scheduled to begin on Monday.", []],
        ["b1w-schaden", "der Schaden, die Schäden", "damage", "einen Schaden melden", "Bitte melden Sie den Schaden schriftlich.", "Please report the damage in writing.", ["der Schaden, die Schaeden"]],
        ["b1w-mietvertrag", "der Mietvertrag, die Mietverträge", "rental agreement", "einen Mietvertrag unterschreiben", "Wir haben den Mietvertrag gestern unterschrieben.", "We signed the rental agreement yesterday.", ["der Mietvertrag, die Mietvertraege"]],
        ["b1w-nebenkosten", "die Nebenkosten, nur Plural", "service charges", "Nebenkosten bezahlen", "Die Heizkosten gehören zu den Nebenkosten.", "Heating costs are part of the service charges.", []],
        ["b1w-kaution", "die Kaution, die Kautionen", "security deposit", "eine Kaution zahlen", "Die Kaution beträgt zwei Monatsmieten.", "The deposit amounts to two months of rent.", []],
        ["b1w-hausverwaltung", "die Hausverwaltung, die Hausverwaltungen", "property management", "die Hausverwaltung kontaktieren", "Die Hausverwaltung hat den Schaden aufgenommen.", "The property management recorded the damage.", []],
        ["b1w-beheben", "beheben, hat behoben", "to fix / resolve", "einen Mangel beheben", "Der Defekt wurde innerhalb einer Woche behoben.", "The defect was fixed within a week.", []]
      ],
      grammar: [
        ["Relative was", "After alles, etwas, nichts, or a complete statement, use was as the relative word.", "Alles, was im Vertrag steht, ist wichtig.", "Everything written in the contract is important."]
      ]
    },
    "b1-beruf-bildung": {
      words: [
        ["b1b-arbeitgeber", "der Arbeitgeber, die Arbeitgeber", "employer", "bei einem Arbeitgeber beschäftigt sein", "Der Arbeitgeber bietet flexible Arbeitszeiten.", "The employer offers flexible working hours.", []],
        ["b1b-ausbildung", "die Ausbildung, die Ausbildungen", "vocational training", "eine Ausbildung abschließen", "Sie hat eine Ausbildung im Pflegebereich abgeschlossen.", "She completed vocational training in healthcare.", []],
        ["b1b-abschluss", "der Abschluss, die Abschlüsse", "qualification / degree", "einen Abschluss erwerben", "Für die Tätigkeit braucht man einen anerkannten Abschluss.", "The job requires a recognized qualification.", ["der Abschluss, die Abschluesse"]],
        ["b1b-kenntnis", "die Kenntnis, die Kenntnisse", "knowledge / skills", "gute Kenntnisse in einem Bereich", "Sie hat gute Kenntnisse in Buchhaltung.", "She has good knowledge of accounting.", []],
        ["b1b-staerke", "die Stärke, die Stärken", "strength", "eine berufliche Stärke nennen", "Meine größte Stärke ist klare Kommunikation.", "My greatest strength is clear communication.", ["die Staerke, die Staerken"]],
        ["b1b-schwaeche", "die Schwäche, die Schwächen", "weakness", "eine Schwäche ehrlich beschreiben", "Im Gespräch nennt er eine echte Schwäche.", "In the interview, he names a genuine weakness.", ["die Schwaeche, die Schwaechen"]],
        ["b1b-einstellen", "einstellen, hat eingestellt", "to hire", "jemanden einstellen", "Die Firma stellt nächstes Jahr zehn Personen ein.", "The company will hire ten people next year.", []],
        ["b1b-gehalt", "das Gehalt, die Gehälter", "salary", "über das Gehalt sprechen", "Das Gehalt wird im zweiten Gespräch besprochen.", "The salary will be discussed in the second interview.", ["das Gehalt, die Gehaelter"]]
      ],
      grammar: [
        ["Purpose with damit", "Use damit when the purpose clause has its own subject.", "Die Firma bietet Kurse an, damit neue Mitarbeitende schneller einsteigen können.", "The company offers courses so new employees can get started faster."]
      ]
    },
    "b1-medien-information": {
      words: [
        ["b1m-nachricht", "die Nachricht, die Nachrichten", "news item / message", "eine Nachricht weiterleiten", "Die Nachricht wurde am Morgen veröffentlicht.", "The news item was published in the morning.", []],
        ["b1m-geruecht", "das Gerücht, die Gerüchte", "rumor", "ein Gerücht verbreiten", "Das Gerücht verbreitete sich schnell online.", "The rumor spread quickly online.", ["das Geruecht, die Geruechte"]],
        ["b1m-tatsache", "die Tatsache, die Tatsachen", "fact", "eine Tatsache feststellen", "Diese Tatsache wird von mehreren Quellen bestätigt.", "This fact is confirmed by several sources.", []],
        ["b1m-beleg", "der Beleg, die Belege", "evidence / supporting proof", "einen Beleg für etwas liefern", "Der Artikel enthält keinen Beleg für die Zahl.", "The article contains no evidence for the figure.", []],
        ["b1m-recherchieren", "recherchieren, hat recherchiert", "to research", "gründlich zu einem Thema recherchieren", "Die Journalistin recherchiert seit mehreren Tagen.", "The journalist has been researching for several days.", ["gruendlich recherchieren"]],
        ["b1m-zitieren", "zitieren, hat zitiert", "to quote / cite", "eine Fachperson zitieren", "Der Bericht zitiert zwei Fachleute.", "The report quotes two experts.", []],
        ["b1m-verbreiten", "verbreiten, hat verbreitet", "to spread / circulate", "eine Meldung verbreiten", "Die falsche Meldung wurde schnell verbreitet.", "The false report was spread quickly.", []],
        ["b1m-einordnen", "einordnen, hat eingeordnet", "to put into context", "Zahlen sachlich einordnen", "Der Kommentar ordnet die neuen Zahlen ein.", "The commentary puts the new figures into context.", []]
      ],
      grammar: [
        ["Indirect question with a modal", "In an indirect question, the full verb group closes the clause and the modal verb comes last.", "Ich weiß nicht, wann der Zug abfahren soll.", "I do not know when the train is supposed to leave."]
      ]
    },
    "b1-umwelt-mobilitaet": {
      words: [
        ["b1u-energie", "die Energie, die Energien", "energy", "Energie erzeugen und sparen", "Die Gebäude benötigen weniger Energie.", "The buildings require less energy.", []],
        ["b1u-strom", "der Strom, meist Singular", "electricity", "Strom verbrauchen", "Ein Teil des Stroms kommt aus Windenergie.", "Some of the electricity comes from wind power.", []],
        ["b1u-umwelt", "die Umwelt, kein Plural", "environment", "die Umwelt schützen", "Die Maßnahme schützt die Umwelt.", "The measure protects the environment.", []],
        ["b1u-emission", "die Emission, die Emissionen", "emission", "Emissionen senken", "Der Verkehr verursacht einen großen Teil der Emissionen.", "Transport causes a large share of the emissions.", []],
        ["b1u-verbrauch", "der Verbrauch, die Verbräuche", "consumption", "den Verbrauch messen", "Der Energieverbrauch ist im Winter höher.", "Energy consumption is higher in winter.", ["der Verbrauch, die Verbraeuche"]],
        ["b1u-einsparen", "einsparen, hat eingespart", "to save / reduce", "Energie oder Kosten einsparen", "Durch neue Geräte wird Strom eingespart.", "Electricity is saved through new devices.", []],
        ["b1u-erneuerbar", "erneuerbar", "renewable", "erneuerbare Energie", "Wind und Sonne liefern erneuerbare Energie.", "Wind and sunlight provide renewable energy.", []],
        ["b1u-foerdern", "fördern, hat gefördert", "to promote / fund", "ein Projekt finanziell fördern", "Die Stadt fördert den Ausbau von Radwegen.", "The city funds the expansion of cycle paths.", ["foerdern, hat gefoerdert"]]
      ],
      grammar: [
        ["Agent and means", "Use von for the person or institution acting. Use durch for a method, cause, or process.", "Die Kampagne wird von der Stadt finanziert und durch Spenden ergänzt.", "The campaign is funded by the city and supplemented through donations."]
      ]
    },
    "b1-gesund-leben": {
      words: [
        ["b1g-ernaehrung", "die Ernährung, kein Plural", "nutrition / diet", "eine ausgewogene Ernährung", "Eine ausgewogene Ernährung gibt dem Körper Energie.", "A balanced diet gives the body energy.", ["die Ernaehrung"]],
        ["b1g-ernaehren", "sich ernähren, hat sich ernährt", "to eat / nourish oneself", "sich ausgewogen ernähren", "Ich versuche, mich ausgewogen zu ernähren.", "I try to eat a balanced diet.", ["sich ernaehren, hat sich ernaehrt"]],
        ["b1g-entspannung", "die Entspannung, kein Plural", "relaxation", "Zeit für Entspannung", "Nach der Arbeit brauche ich etwas Entspannung.", "I need some relaxation after work.", ["Zeit fuer Entspannung"]],
        ["b1g-abschalten", "abschalten, hat abgeschaltet", "to switch off / unwind", "nach der Arbeit abschalten", "Beim Spaziergang kann ich gut abschalten.", "I can unwind well during a walk.", []],
        ["b1g-konzentrieren", "sich auf etwas konzentrieren, hat sich konzentriert", "to concentrate on something", "sich konzentrieren auf plus accusative", "Ich konzentriere mich morgens auf schwierige Aufgaben.", "I concentrate on difficult tasks in the morning.", []],
        ["b1g-verzichten", "auf etwas verzichten, hat verzichtet", "to give something up", "verzichten auf plus accusative", "Sie verzichtet abends auf Kaffee.", "She avoids coffee in the evening.", []],
        ["b1g-muedigkeit", "die Müdigkeit, kein Plural", "tiredness", "unter Müdigkeit leiden", "Die Müdigkeit nimmt am Nachmittag zu.", "The tiredness increases in the afternoon.", ["die Muedigkeit"]],
        ["b1g-bewaeltigen", "bewältigen, hat bewältigt", "to cope with / manage", "eine Belastung bewältigen", "Er lernt, die Belastung besser zu bewältigen.", "He is learning to cope with the strain better.", ["bewaeltigen, hat bewaeltigt"]]
      ],
      grammar: [
        ["Konjunktiv II with modal verbs", "Modal verbs have compact forms such as müsste, dürfte, sollte, and wollte. The second verb remains an infinitive.", "Ich müsste früher ins Bett gehen.", "I would need to go to bed earlier."]
      ]
    },
    "b1-engagement": {
      words: [
        ["b1n-initiative", "die Initiative, die Initiativen", "initiative / community group", "eine Initiative starten", "Die Initiative organisiert einen Kleidertausch.", "The initiative organizes a clothing swap.", []],
        ["b1n-sitzung", "die Sitzung, die Sitzungen", "meeting / session", "an einer Sitzung teilnehmen", "Die nächste Sitzung beginnt um achtzehn Uhr.", "The next meeting begins at 6 p.m.", []],
        ["b1n-spende", "die Spende, die Spenden", "donation", "Spenden für ein Projekt sammeln", "Der Verein sammelt Spenden für den Spielplatz.", "The club collects donations for the playground.", []],
        ["b1n-vorstand", "der Vorstand, die Vorstände", "executive board", "im Vorstand mitarbeiten", "Der Vorstand entscheidet nächste Woche.", "The executive board will decide next week.", ["der Vorstand, die Vorstaende"]],
        ["b1n-anmelden", "sich anmelden, hat sich angemeldet", "to register", "sich für etwas anmelden", "Ich melde mich für den Workshop an.", "I am registering for the workshop.", ["sich fuer etwas anmelden"]],
        ["b1n-unterstuetzen", "unterstützen, hat unterstützt", "to support", "jemanden oder ein Projekt unterstützen", "Viele Firmen unterstützen das Projekt.", "Many companies support the project.", ["unterstuetzen, hat unterstuetzt"]],
        ["b1n-gruenden", "gründen, hat gegründet", "to found / establish", "eine Initiative gründen", "Die Nachbarn haben eine Initiative gegründet.", "The neighbors founded an initiative.", ["gruenden, hat gegruendet"]],
        ["b1n-austauschen", "sich austauschen, hat sich ausgetauscht", "to exchange ideas", "sich mit jemandem über etwas austauschen", "Wir tauschen uns über neue Ideen aus.", "We exchange ideas about new projects.", ["sich mit jemandem ueber etwas austauschen"]]
      ],
      grammar: [
        ["Da compound before a clause", "A da compound can point forward to a clause or infinitive group.", "Im Projekt geht es darum, ältere Menschen zu unterstützen.", "The project is about supporting older people."]
      ]
    },
    "b1-argumentieren": {
      words: [
        ["b1a-argument", "das Argument, die Argumente", "argument", "ein Argument für oder gegen etwas", "Das stärkste Argument betrifft die Sicherheit.", "The strongest argument concerns safety.", ["ein Argument fuer etwas"]],
        ["b1a-behauptung", "die Behauptung, die Behauptungen", "claim", "eine Behauptung mit Daten prüfen", "Für diese Behauptung fehlt ein Beleg.", "This claim lacks supporting evidence.", ["eine Behauptung pruefen"]],
        ["b1a-gegenargument", "das Gegenargument, die Gegenargumente", "counterargument", "ein Gegenargument anführen", "Das Gegenargument sollte berücksichtigt werden.", "The counterargument should be considered.", ["ein Gegenargument anfuehren"]],
        ["b1a-begruendung", "die Begründung, die Begründungen", "reasoning / justification", "eine klare Begründung geben", "Die Begründung ist klar und nachvollziehbar.", "The reasoning is clear and understandable.", ["die Begruendung, die Begruendungen"]],
        ["b1a-mehrheit", "die Mehrheit, die Mehrheiten", "majority", "eine deutliche Mehrheit", "Eine deutliche Mehrheit unterstützt den Plan.", "A clear majority supports the plan.", ["Eine deutliche Mehrheit unterstuetzt den Plan."]],
        ["b1a-minderheit", "die Minderheit, die Minderheiten", "minority", "eine kleine Minderheit", "Die Minderheit äußert weiterhin Bedenken.", "The minority continues to express concerns.", ["Die Minderheit aeussert weiterhin Bedenken."]],
        ["b1a-ueberzeugend", "überzeugend", "convincing", "überzeugend argumentieren", "Das konkrete Beispiel ist überzeugend.", "The concrete example is convincing.", ["ueberzeugend"]],
        ["b1a-dennoch", "dennoch", "nevertheless", "Satz. Dennoch plus Verb", "Die Kosten sind hoch. Dennoch unterstütze ich den Vorschlag.", "The costs are high. Nevertheless, I support the proposal.", ["Dennoch unterstuetze ich den Vorschlag."]]
      ],
      grammar: [
        ["Result with dadurch", "Dadurch can refer to the previous action and introduce its consequence.", "Die Stadt sperrt die Straße. Dadurch entsteht mehr Platz für Fahrräder.", "The city closes the street. This creates more space for bicycles."]
      ]
    }
  });

  Object.assign(expansion, {
    "b2-positionen": {
      words: [
        ["b2pos-gewichten", "Argumente unterschiedlich gewichten", "give arguments different weight", "etwas stärker oder schwächer gewichten", "Bei der Entscheidung sollten soziale Folgen stärker gewichtet werden.", "Social consequences should carry more weight in the decision.", []],
        ["b2pos-tragweite", "die Tragweite", "scope and implications", "die Tragweite einer Entscheidung erkennen", "Viele Beteiligte unterschätzten die Tragweite der Reform.", "Many participants underestimated the implications of the reform.", []],
        ["b2pos-folgenabschaetzung", "eine Folgenabschätzung vornehmen", "assess likely consequences", "die Folgenabschätzung, die Folgenabschätzungen", "Vor der Abstimmung sollte der Ausschuss eine Folgenabschätzung vornehmen.", "Before the vote, the committee should assess the likely consequences.", ["eine Folgenabschaetzung vornehmen"]],
        ["b2pos-spannungsfeld", "im Spannungsfeld zwischen", "caught between competing aims", "im Spannungsfeld zwischen zwei Zielen stehen", "Der Vorschlag bewegt sich im Spannungsfeld zwischen Klimaschutz und Bezahlbarkeit.", "The proposal sits between the competing aims of climate protection and affordability.", []],
        ["b2pos-anliegen", "ein berechtigtes Anliegen", "a legitimate concern", "ein Anliegen anerkennen", "Der Wunsch nach planbaren Arbeitszeiten ist ein berechtigtes Anliegen.", "The desire for predictable working hours is a legitimate concern.", []],
        ["b2pos-entkraeften", "einen Einwand entkräften", "counter an objection", "einen Einwand durch Belege entkräften", "Neue Daten konnten den wichtigsten Einwand entkräften.", "New data were able to counter the main objection.", ["einen Einwand entkraeften"]],
        ["b2pos-vorbehalt", "einen Vorbehalt äußern", "state a reservation", "Vorbehalte gegen etwas äußern", "Mehrere Mitglieder äußerten einen Vorbehalt gegen die kurze Testphase.", "Several members expressed a reservation about the short trial period.", ["einen Vorbehalt aeussern"]],
        ["b2pos-konsensfaehig", "konsensfähig", "capable of winning consensus", "eine konsensfähige Lösung", "Die überarbeitete Regelung ist für beide Seiten konsensfähig.", "The revised rule can win support from both sides.", ["konsensfaehig"]],
        ["b2pos-verhaeltnismaessig", "verhältnismäßig", "proportionate", "eine verhältnismäßige Einschränkung", "Die Einschränkung muss verhältnismäßig bleiben.", "The restriction must remain proportionate.", ["verhaeltnismaessig"]],
        ["b2pos-ausschlag", "den Ausschlag geben", "be the deciding factor", "für eine Entscheidung den Ausschlag geben", "Am Ende gab die langfristige Kostenersparnis den Ausschlag.", "In the end, the long-term savings were the deciding factor.", []]
      ],
      grammar: [
        ["Exception with es sei denn", "Es sei denn introduces an exception. A following clause usually keeps verb-second order.", "Die Testphase beginnt im Mai, es sei denn, die Finanzierung verzögert sich.", "The trial period begins in May unless the funding is delayed."],
        ["Limiting a claim", "Insofern and a following als clause define the exact range in which a statement applies.", "Der Vorschlag ist insofern sinnvoll, als er vorhandene Räume nutzt.", "The proposal makes sense insofar as it uses existing rooms."]
      ]
    },
    "b2-quellen": {
      words: [
        ["b2src-primaerquelle", "die Primärquelle, die Primärquellen", "primary source", "eine Primärquelle auswerten", "Der Originalbericht dient als Primärquelle.", "The original report serves as a primary source.", ["die Primaerquelle, die Primaerquellen"]],
        ["b2src-sekundaerquelle", "die Sekundärquelle, die Sekundärquellen", "secondary source", "eine Sekundärquelle heranziehen", "Der Artikel fasst mehrere Sekundärquellen zusammen.", "The article summarizes several secondary sources.", ["die Sekundaerquelle, die Sekundaerquellen"]],
        ["b2src-belegen", "eine Aussage belegen", "support a statement with evidence", "eine Aussage durch Daten belegen", "Die Autorin belegt ihre Aussage mit aktuellen Zahlen.", "The author supports her statement with current figures.", []],
        ["b2src-stuetzen", "sich auf Daten stützen", "rely on data", "sich auf belastbare Daten stützen", "Die Einschätzung stützt sich auf eine langfristige Untersuchung.", "The assessment relies on a long-term study.", ["sich auf Daten stuetzen"]],
        ["b2src-datengrundlage", "die Datengrundlage, die Datengrundlagen", "data basis", "eine breite Datengrundlage", "Die Datengrundlage umfasst zwölf Regionen.", "The data basis covers twelve regions.", []],
        ["b2src-aussagekraft", "die Aussagekraft", "strength of evidence", "die Aussagekraft einer Studie bewerten", "Die kleine Stichprobe begrenzt die Aussagekraft.", "The small sample limits the strength of the evidence.", []],
        ["b2src-stichprobe", "die Stichprobe, die Stichproben", "sample", "eine Stichprobe untersuchen", "An der Stichprobe nahmen achthundert Personen teil.", "Eight hundred people took part in the sample.", []],
        ["b2src-repraesentativ", "repräsentativ sein", "be representative", "für eine Gruppe repräsentativ sein", "Die Befragung ist für die Gesamtbevölkerung kaum repräsentativ.", "The survey is unlikely to represent the population as a whole.", ["repraesentativ sein"]],
        ["b2src-ueberpruefen", "eine Angabe überprüfen", "verify a statement or detail", "eine Angabe anhand der Quelle überprüfen", "Die Redaktion überprüfte die Angabe vor der Veröffentlichung.", "The editorial team verified the detail before publication.", ["eine Angabe ueberpruefen"]],
        ["b2src-rueckschluss", "einen Rückschluss ziehen", "draw an inference", "aus Daten einen Rückschluss ziehen", "Aus einem einzelnen Fall lässt sich kein sicherer Rückschluss ziehen.", "A reliable inference cannot be drawn from one case.", ["einen Rueckschluss ziehen"]]
      ],
      grammar: [
        ["Reported questions", "Ob and question words introduce reported questions. The finite verb closes the clause.", "Die Redaktion fragt, ob die Stichprobe repräsentativ sei.", "The editorial team asks whether the sample is representative."],
        ["Factual framing", "Feststellen, nachweisen, and zeigen commonly use the indicative when the writer presents the content as established.", "Die Auswertung zeigt, dass die Nachfrage gestiegen ist.", "The analysis shows that demand has increased."]
      ]
    },
    "b2-prozesse": {
      words: [
        ["b2proc-bescheid", "der Bescheid, die Bescheide", "official decision notice", "einen Bescheid erhalten", "Der schriftliche Bescheid wird innerhalb einer Woche versandt.", "The written decision notice is sent within one week.", []],
        ["b2proc-aktenzeichen", "das Aktenzeichen, die Aktenzeichen", "reference number", "das Aktenzeichen angeben", "Bitte geben Sie bei Rückfragen das Aktenzeichen an.", "Please provide the reference number with any questions.", []],
        ["b2proc-bearbeitungsfrist", "die Bearbeitungsfrist, die Bearbeitungsfristen", "processing deadline", "eine Bearbeitungsfrist einhalten", "Die Bearbeitungsfrist beträgt derzeit sechs Wochen.", "The current processing period is six weeks.", []],
        ["b2proc-zustaendigkeit", "die Zuständigkeit, die Zuständigkeiten", "area of responsibility", "die Zuständigkeit klären", "Vor der Antragstellung sollte die Zuständigkeit geklärt werden.", "The responsible authority should be identified before applying.", ["die Zustaendigkeit, die Zustaendigkeiten"]],
        ["b2proc-fristgerecht", "etwas fristgerecht einreichen", "submit something by the deadline", "Unterlagen fristgerecht einreichen", "Alle Nachweise wurden fristgerecht eingereicht.", "All supporting documents were submitted by the deadline.", []],
        ["b2proc-vorgang", "einen Vorgang dokumentieren", "document a procedure", "der Vorgang, die Vorgänge", "Jeder Bearbeitungsschritt wird im System dokumentiert.", "Every processing step is documented in the system.", ["der Vorgang, die Vorgaenge"]],
        ["b2proc-genehmigung", "eine Genehmigung erteilen", "grant approval", "die Genehmigung, die Genehmigungen", "Die Behörde erteilte die Genehmigung unter zwei Auflagen.", "The authority granted approval subject to two conditions.", []],
        ["b2proc-widerspruch", "Widerspruch einlegen", "file an objection", "gegen einen Bescheid Widerspruch einlegen", "Gegen den Bescheid kann innerhalb eines Monats Widerspruch eingelegt werden.", "An objection may be filed against the notice within one month.", []],
        ["b2proc-gebuehr", "die Gebühr, die Gebühren", "fee", "eine Gebühr erheben", "Für die Bearbeitung wird eine Gebühr erhoben.", "A fee is charged for processing.", ["die Gebuehr, die Gebuehren"]],
        ["b2proc-vervollstaendigen", "Unterlagen vervollständigen", "complete a set of documents", "fehlende Unterlagen vervollständigen", "Die Antragstellerin wurde gebeten, ihre Unterlagen zu vervollständigen.", "The applicant was asked to complete her documents.", ["Unterlagen vervollstaendigen"]]
      ],
      grammar: [
        ["Completed process passive", "The perfect process passive uses sein, a past participle, and worden.", "Der Antrag ist gestern geprüft worden.", "The application was reviewed yesterday."],
        ["Impersonal passive", "An impersonal passive presents an activity without a grammatical subject. Es can fill the first position.", "Es wird um Geduld gebeten. Im Wartebereich wird nicht telefoniert.", "Visitors are asked for patience. Phone use is prohibited in the waiting area."]
      ]
    },
    "b2-register": {
      words: [
        ["b2reg-ruecksprache", "Rücksprache halten", "consult with someone", "mit jemandem Rücksprache halten", "Vor der Bestätigung halte ich Rücksprache mit der Projektleitung.", "I will consult the project lead before confirming.", ["Ruecksprache halten"]],
        ["b2reg-abstimmen", "etwas mit jemandem abstimmen", "coordinate something with someone", "einen Termin miteinander abstimmen", "Wir stimmen den Ablauf mit allen Beteiligten ab.", "We are coordinating the process with everyone involved.", []],
        ["b2reg-kenntnis", "etwas zur Kenntnis nehmen", "formally acknowledge something", "eine Mitteilung zur Kenntnis nehmen", "Wir haben Ihre Mitteilung zur Kenntnis genommen.", "We have formally acknowledged your message.", []],
        ["b2reg-nachkommen", "einer Bitte nachkommen", "comply with a request", "einer Bitte um Unterlagen nachkommen", "Wir kommen Ihrer Bitte um eine schriftliche Bestätigung gern nach.", "We are happy to comply with your request for written confirmation.", []],
        ["b2reg-verlaengern", "eine Frist verlängern", "extend a deadline", "eine Frist um eine Woche verlängern", "Auf Anfrage wurde die Frist um eine Woche verlängert.", "The deadline was extended by one week upon request.", ["eine Frist verlaengern"]],
        ["b2reg-vereinbarung", "eine Vereinbarung treffen", "make an arrangement", "eine verbindliche Vereinbarung treffen", "Beide Abteilungen haben eine verbindliche Vereinbarung getroffen.", "Both departments made a binding arrangement.", []],
        ["b2reg-klaerungsbedarf", "es besteht Klärungsbedarf", "clarification is required", "weiterer Klärungsbedarf", "Bei der Aufgabenverteilung besteht noch Klärungsbedarf.", "The allocation of responsibilities still requires clarification.", ["es besteht Klaerungsbedarf"]],
        ["b2reg-verbindlich", "etwas verbindlich bestätigen", "confirm something definitively", "einen Termin verbindlich bestätigen", "Bitte bestätigen Sie den Liefertermin verbindlich.", "Please confirm the delivery date definitively.", ["etwas verbindlich bestaetigen"]],
        ["b2reg-stellungnahme", "eine Stellungnahme abgeben", "issue a formal statement", "eine schriftliche Stellungnahme abgeben", "Der Verband gibt morgen eine schriftliche Stellungnahme ab.", "The association will issue a written statement tomorrow.", []],
        ["b2reg-umgehend", "umgehend", "promptly", "etwas umgehend bearbeiten", "Dringende Anfragen werden umgehend bearbeitet.", "Urgent inquiries are processed promptly.", []]
      ],
      grammar: [
        ["Polite requests", "Könnten Sie and Würden Sie bitte make a request suitable for many professional situations.", "Könnten Sie uns die aktualisierte Liste bis Donnerstag zusenden?", "Could you send us the updated list by Thursday?"],
        ["Formal reference", "Bezüglich and hinsichtlich introduce the matter a message addresses. Both usually govern the genitive.", "Bezüglich Ihrer Anfrage erhalten Sie morgen eine Rückmeldung.", "Regarding your inquiry, you will receive a reply tomorrow."]
      ]
    },
    "b2-relativ-partizip": {
      words: [
        ["b2dense-sachverhalt", "der Sachverhalt, die Sachverhalte", "set of facts or circumstances", "einen Sachverhalt prüfen", "Der Bericht stellt den Sachverhalt ausführlich dar.", "The report presents the facts in detail.", []],
        ["b2dense-rahmenbedingung", "die Rahmenbedingung, die Rahmenbedingungen", "operating condition", "rechtliche Rahmenbedingungen", "Die rechtlichen Rahmenbedingungen haben sich geändert.", "The legal operating conditions have changed.", []],
        ["b2dense-zielsetzung", "die Zielsetzung, die Zielsetzungen", "objective", "eine klare Zielsetzung formulieren", "Die im Antrag formulierte Zielsetzung bleibt unverändert.", "The objective stated in the application remains unchanged.", []],
        ["b2dense-betreffend", "der betreffende Abschnitt", "the relevant section", "die betreffende Person oder Stelle", "Der betreffende Abschnitt wurde vollständig überarbeitet.", "The relevant section was completely revised.", []],
        ["b2dense-zugrunde", "einer Sache zugrunde liegen", "underlie something", "die zugrunde liegende Annahme", "Der Berechnung liegt eine vorsichtige Annahme zugrunde.", "A cautious assumption underlies the calculation.", []],
        ["b2dense-resultierend", "die daraus resultierenden Folgen", "the resulting consequences", "aus etwas resultieren", "Die daraus resultierenden Kosten trägt die Kommune.", "The municipality bears the resulting costs.", []],
        ["b2dense-pruefend", "der zu prüfende Vorschlag", "the proposal requiring review", "noch zu prüfende Unterlagen", "Der zu prüfende Vorschlag enthält drei Maßnahmen.", "The proposal requiring review contains three measures.", ["der zu pruefende Vorschlag"]],
        ["b2dense-erhoben", "die bislang erhobenen Daten", "the data collected so far", "Daten erheben und auswerten", "Die bislang erhobenen Daten bestätigen den Trend.", "The data collected so far confirm the trend.", []],
        ["b2dense-vorfeld", "die im Vorfeld getroffene Vereinbarung", "the prior agreement", "im Vorfeld etwas vereinbaren", "Die im Vorfeld getroffene Vereinbarung gilt weiterhin.", "The prior agreement remains in force.", []],
        ["b2dense-beauftragt", "mit der Umsetzung beauftragt sein", "be assigned to implementation", "jemanden mit der Umsetzung beauftragen", "Die mit der Umsetzung beauftragte Arbeitsgruppe tagt morgen.", "The working group assigned to implementation meets tomorrow.", []]
      ],
      grammar: [
        ["Requirement inside a noun phrase", "Zu plus present participle expresses an action that remains required or possible.", "die noch zu klärende Frage", "the question that still needs to be clarified"],
        ["Case across a long noun phrase", "The article and adjective endings follow the case of the head noun, even when several modifiers come before it.", "mit den im Mai eingeführten Maßnahmen", "with the measures introduced in May"]
      ]
    },
    "b2-haltung": {
      words: [
        ["b2stance-kenntnisstand", "nach bisherigem Kenntnisstand", "according to current knowledge", "nach aktuellem Kenntnisstand", "Nach bisherigem Kenntnisstand besteht kein Sicherheitsrisiko.", "According to current knowledge, there is no safety risk.", []],
        ["b2stance-wahrscheinlichkeit", "aller Wahrscheinlichkeit nach", "in all likelihood", "aller Wahrscheinlichkeit nach eintreten", "Aller Wahrscheinlichkeit nach wird die Frist verlängert.", "In all likelihood, the deadline will be extended.", []],
        ["b2stance-hindeuten", "vieles deutet darauf hin, dass", "much suggests that", "auf eine Entwicklung hindeuten", "Vieles deutet darauf hin, dass die Nachfrage sinkt.", "Much suggests that demand is falling.", []],
        ["b2stance-naheliegen", "es liegt nahe, dass", "it is reasonable to assume that", "eine Schlussfolgerung liegt nahe", "Es liegt nahe, dass die Umstellung eine Rolle spielt.", "It is reasonable to assume that the change plays a role.", []],
        ["b2stance-relativieren", "etwas relativieren", "qualify or put something in perspective", "eine Aussage durch neue Daten relativieren", "Die neuen Zahlen relativieren die erste Prognose.", "The new figures put the initial forecast in perspective.", []],
        ["b2stance-zurueckhaltend", "sich zurückhaltend äußern", "comment cautiously", "sich zurückhaltend zu etwas äußern", "Die Sprecherin äußerte sich zurückhaltend zu den Ergebnissen.", "The spokesperson commented cautiously on the results.", ["sich zurueckhaltend aeussern"]],
        ["b2stance-einschaetzung", "eine Einschätzung abgeben", "provide an assessment", "eine vorläufige Einschätzung", "Der Ausschuss gibt nächste Woche eine Einschätzung ab.", "The committee will provide an assessment next week.", ["eine Einschaetzung abgeben"]],
        ["b2stance-ausschliessen", "etwas kategorisch ausschließen", "rule something out categorically", "eine Ursache kategorisch ausschließen", "Ein technischer Fehler lässt sich derzeit nicht kategorisch ausschließen.", "A technical error cannot currently be ruled out categorically.", ["etwas kategorisch ausschliessen"]],
        ["b2stance-kaum", "es ist kaum anzunehmen, dass", "it is unlikely that", "kaum anzunehmen sein", "Es ist kaum anzunehmen, dass die Kosten unverändert bleiben.", "It is unlikely that the costs will remain unchanged.", []],
        ["b2stance-plausibel", "plausibel erscheinen", "appear plausible", "angesichts der Daten plausibel erscheinen", "Die Erklärung erscheint angesichts der Daten plausibel.", "The explanation appears plausible in light of the data.", []]
      ],
      grammar: [
        ["Strength of inference", "Müssen presents a strong evidence-based inference. Könnte leaves the conclusion tentative.", "Die Sitzung muss länger gedauert haben; das Protokoll umfasst zwanzig Seiten.", "The meeting must have lasted longer; the minutes run to twenty pages."],
        ["Particles in questions", "Denn can connect a question naturally to the conversation. Etwa often signals surprise or concern.", "Was wurde denn beschlossen? Hast du etwa schon zugesagt?", "So what was decided? Have you already agreed?"]
      ]
    },
    "b2-kohaesion": {
      words: [
        ["b2coh-hervorgehen", "aus etwas hervorgehen", "emerge from something", "aus einem Bericht hervorgehen", "Aus dem Bericht geht hervor, dass die Kosten gesunken sind.", "The report indicates that costs have fallen.", []],
        ["b2coh-ergeben", "sich aus etwas ergeben", "follow from something", "sich aus einer Auswertung ergeben", "Aus der Auswertung ergeben sich drei Empfehlungen.", "Three recommendations follow from the analysis.", []],
        ["b2coh-nachsichziehen", "eine Folge nach sich ziehen", "lead to a consequence", "zusätzliche Kosten nach sich ziehen", "Die Verzögerung zog zusätzliche Kosten nach sich.", "The delay led to additional costs.", []],
        ["b2coh-zusammenhang", "im Zusammenhang stehen mit", "be connected with", "in engem Zusammenhang mit etwas stehen", "Die beiden Entwicklungen stehen eng miteinander in Zusammenhang.", "The two developments are closely connected.", []],
        ["b2coh-wechselwirkung", "in Wechselwirkung stehen mit", "interact with", "in gegenseitiger Wechselwirkung stehen", "Preise und Nachfrage stehen miteinander in Wechselwirkung.", "Prices and demand interact with each other.", []],
        ["b2coh-weise", "auf diese Weise", "in this way", "auf diese Weise ein Ziel erreichen", "Auf diese Weise lässt sich der Ablauf vereinfachen.", "The process can be simplified in this way.", []],
        ["b2coh-unteranderem", "unter anderem", "among other things", "unter anderem erwähnen", "Das Projekt unterstützt unter anderem kleine Betriebe.", "The project supports small businesses, among others.", []],
        ["b2coh-ersterlinie", "in erster Linie", "primarily", "sich in erster Linie an jemanden richten", "Die Maßnahme richtet sich in erster Linie an Familien.", "The measure is aimed primarily at families.", []],
        ["b2coh-bezug", "in Bezug auf", "in relation to", "in Bezug auf plus accusative", "In Bezug auf die Kosten bleiben mehrere Fragen offen.", "Several questions remain open regarding the costs.", []],
        ["b2coh-verknuepfen", "Gedanken nachvollziehbar verknüpfen", "connect ideas coherently", "Argumente logisch miteinander verknüpfen", "Der Bericht verknüpft die Ergebnisse nachvollziehbar.", "The report connects the findings coherently.", ["Gedanken nachvollziehbar verknuepfen"]]
      ],
      grammar: [
        ["Added circumstance with wobei", "Wobei introduces a related circumstance, qualification, or accompanying detail and sends the verb to the end.", "Die Beratung ist kostenlos, wobei eine Anmeldung erforderlich ist.", "The consultation is free, with registration required."],
        ["Causal follow-up with weshalb", "Weshalb links a result to the entire preceding clause and sends its verb to the end.", "Ein Ersatzteil fehlt, weshalb die Reparatur länger dauert.", "A spare part is missing, which is why the repair takes longer."]
      ]
    },
    "b2-integration": {
      words: [
        ["b2int-these", "eine These aufstellen", "put forward a thesis", "eine begründete These aufstellen", "Die Autorin stellt zu Beginn eine klare These auf.", "The author puts forward a clear thesis at the beginning.", []],
        ["b2int-untermauern", "eine These untermauern", "support a thesis", "eine These mit Beispielen untermauern", "Der Bericht untermauert die These mit drei Fallstudien.", "The report supports the thesis with three case studies.", []],
        ["b2int-gegenargument", "ein Gegenargument aufgreifen", "address a counterargument", "ein Gegenargument prüfen und aufgreifen", "Die Rednerin greift das stärkste Gegenargument direkt auf.", "The speaker addresses the strongest counterargument directly.", []],
        ["b2int-prioritaeten", "Prioritäten setzen", "set priorities", "klare Prioritäten setzen", "Die Kommune muss bei begrenzten Mitteln klare Prioritäten setzen.", "The municipality must set clear priorities when funds are limited.", ["Prioritaeten setzen"]],
        ["b2int-loesungsansatz", "einen Lösungsansatz entwickeln", "develop an approach to a solution", "ein realistischer Lösungsansatz", "Die Arbeitsgruppe entwickelt einen neuen Lösungsansatz.", "The working group is developing a new approach to the solution.", ["einen Loesungsansatz entwickeln"]],
        ["b2int-umsetzbarkeit", "die Umsetzbarkeit prüfen", "assess feasibility", "die praktische Umsetzbarkeit", "Vor der Abstimmung wird die Umsetzbarkeit geprüft.", "Feasibility is assessed before the vote.", ["die Umsetzbarkeit pruefen"]],
        ["b2int-interessenausgleich", "einen Interessenausgleich schaffen", "balance competing interests", "einen fairen Interessenausgleich schaffen", "Der Kompromiss soll einen fairen Interessenausgleich schaffen.", "The compromise is intended to balance the competing interests fairly.", []],
        ["b2int-empfehlung", "eine Empfehlung aussprechen", "make a recommendation", "eine begründete Empfehlung aussprechen", "Der Ausschuss spricht eine klare Empfehlung aus.", "The committee makes a clear recommendation.", []],
        ["b2int-ergebnis", "zu einem Ergebnis gelangen", "reach a result", "nach einer Prüfung zu einem Ergebnis gelangen", "Nach langer Beratung gelangte die Gruppe zu einem Ergebnis.", "After lengthy discussion, the group reached a result.", []],
        ["b2int-darlegen", "eine Position überzeugend darlegen", "present a position persuasively", "eine Position strukturiert darlegen", "Sie legt ihre Position anhand konkreter Beispiele überzeugend dar.", "She presents her position persuasively through concrete examples.", ["eine Position ueberzeugend darlegen"]]
      ],
      grammar: [
        ["Presentation signposting", "Sequencing phrases make the structure audible and help listeners follow longer contributions.", "Zunächst gehe ich auf die Ausgangslage ein. Anschließend erläutere ich den Lösungsansatz.", "First I will address the initial situation. Then I will explain the proposed solution."],
        ["Qualified comparison", "Während opens a verb-final clause. The following main clause keeps verb-second order.", "Während Quelle A höhere Kosten erwartet, rechnet Quelle B mit langfristigen Einsparungen.", "While source A expects higher costs, source B anticipates long-term savings."]
      ]
    }
  });

  const practicalExpansion = {
    "a0-first-contact": {
      words: [
        ["a0fc-bis-spaeter", "Bis später!", "See you later!", "Bis später! · Bis bald!", "Tschüss, bis später!", "Bye, see you later!", ["Bis spaeter!"]],
        ["a0fc-schoenen-tag", "Schönen Tag noch!", "Have a nice day!", "Schönen Tag noch! · Danke, ebenfalls!", "Danke. Schönen Tag noch!", "Thank you. Have a nice day!", ["Schoenen Tag noch!"]],
        ["a0fc-ebenfalls", "ebenfalls", "likewise / you too", "Danke, ebenfalls!", "Schönen Abend! Danke, ebenfalls!", "Have a nice evening! Thank you, you too!", ["Schoenen Abend! Danke, ebenfalls!"]]
      ]
    },
    "a0-personal-details": {
      words: [
        ["a0pd-handynummer", "die Handynummer, die Handynummern", "mobile number", "Meine Handynummer ist ...", "Meine Handynummer ist 0176 482913.", "My mobile number is 0176 482913.", []],
        ["a0pd-geburtsdatum", "das Geburtsdatum, die Geburtsdaten", "date of birth", "Mein Geburtsdatum ist ...", "Mein Geburtsdatum ist der dritte Mai.", "My date of birth is May third.", []],
        ["a0pd-muttersprache", "die Muttersprache, die Muttersprachen", "native language", "Meine Muttersprache ist ...", "Meine Muttersprache ist Englisch.", "My native language is English.", []]
      ]
    },
    "a0-everyday-things": {
      words: [
        ["a0et-heft", "das Heft, die Hefte", "notebook", "das Heft · die Hefte", "Das Heft liegt auf dem Tisch.", "The notebook is on the table.", []],
        ["a0et-rucksack", "der Rucksack, die Rucksäcke", "backpack", "der Rucksack · die Rucksäcke", "Der Rucksack ist neben dem Stuhl.", "The backpack is next to the chair.", ["der Rucksack, die Rucksaecke"]],
        ["a0et-flasche", "die Flasche, die Flaschen", "bottle", "die Flasche · die Flaschen", "Ich habe eine Flasche Wasser.", "I have a bottle of water.", []]
      ]
    },
    "a1-people-family-work": {
      words: [
        ["a1pf-nachbar", "der Nachbar, die Nachbarn / die Nachbarin, die Nachbarinnen", "neighbor", "der Nachbar · die Nachbarin", "Unsere Nachbarin heißt Derya.", "Our neighbor's name is Derya.", []],
        ["a1pf-chef", "der Chef, die Chefs / die Chefin, die Chefinnen", "manager / boss", "der Chef · die Chefin", "Mein Chef arbeitet heute zu Hause.", "My manager is working from home today.", []],
        ["a1pf-mitarbeiter", "der Mitarbeiter, die Mitarbeiter / die Mitarbeiterin, die Mitarbeiterinnen", "employee", "der Mitarbeiter · die Mitarbeiterin", "Die neue Mitarbeiterin kommt aus Bremen.", "The new employee comes from Bremen.", []]
      ]
    },
    "a1-daily-routine": {
      words: [
        ["a1dr-zur-arbeit", "zur Arbeit fahren", "to travel to work", "mit dem Bus zur Arbeit fahren", "Ich fahre um sieben Uhr zur Arbeit.", "I travel to work at seven.", []],
        ["a1dr-feierabend", "der Feierabend", "end of the working day", "Feierabend haben", "Um halb sechs habe ich Feierabend.", "I finish work at half past five.", []],
        ["a1dr-normalerweise", "normalerweise", "normally", "Normalerweise plus Verb", "Normalerweise frühstücke ich zu Hause.", "I normally eat breakfast at home.", ["Normalerweise fruehstuecke ich zu Hause."]]
      ]
    },
    "a1-food-shopping": {
      words: [
        ["a1fs-kaese", "der Käse, meist Singular", "cheese", "der Käse · eine Scheibe Käse", "Ich hätte gern zweihundert Gramm Käse.", "I would like two hundred grams of cheese.", ["der Kaese", "Ich haette gern zweihundert Gramm Kaese."]],
        ["a1fs-reis", "der Reis, meist Singular", "rice", "der Reis · eine Packung Reis", "Wir brauchen noch eine Packung Reis.", "We still need one package of rice.", []],
        ["a1fs-haette-gern", "Ich hätte gern ...", "I would like ...", "Ich hätte gern plus accusative", "Ich hätte gern zwei Brötchen, bitte.", "I would like two bread rolls, please.", ["Ich haette gern zwei Broetchen, bitte."]]
      ]
    },
    "a1-home-and-town": {
      words: [
        ["a1ht-post", "die Post, die Postfilialen", "post office", "bei der Post · zur Post", "Die Post ist hinter dem Supermarkt.", "The post office is behind the supermarket.", []],
        ["a1ht-baeckerei", "die Bäckerei, die Bäckereien", "bakery", "die Bäckerei · die Bäckereien", "Neben der Bank ist eine Bäckerei.", "There is a bakery next to the bank.", ["die Baeckerei, die Baeckereien"]],
        ["a1ht-platz", "der Platz, die Plätze", "square / plaza", "auf dem Platz", "Der Markt ist auf dem großen Platz.", "The market is on the large square.", ["der Platz, die Plaetze", "Der Markt ist auf dem grossen Platz."]]
      ]
    },
    "a1-plans-and-leisure": {
      words: [
        ["a1pl-spazieren", "spazieren gehen", "to go for a walk", "im Park spazieren gehen", "Am Sonntag gehen wir im Park spazieren.", "On Sunday we are going for a walk in the park.", []],
        ["a1pl-wandern", "wandern", "to hike", "in den Bergen wandern", "Morgen wandern wir zusammen.", "Tomorrow we are hiking together.", []],
        ["a1pl-wie-waere", "Wie wäre es mit ...?", "How about ...?", "Wie wäre es mit plus dative?", "Wie wäre es mit einem Film am Freitag?", "How about a movie on Friday?", ["Wie waere es mit einem Film am Freitag?"]]
      ]
    },
    "a1-travel-and-services": {
      words: [
        ["a1ts-ausgang", "der Ausgang, die Ausgänge", "exit", "der Ausgang · die Ausgänge", "Der Ausgang ist rechts neben dem Schalter.", "The exit is to the right of the counter.", ["der Ausgang, die Ausgaenge"]],
        ["a1ts-rezeption", "die Rezeption, die Rezeptionen", "reception desk", "an der Rezeption", "Bitte fragen Sie an der Rezeption.", "Please ask at reception.", []],
        ["a1ts-einfache-fahrt", "die einfache Fahrt", "single journey / one-way ticket", "eine einfache Fahrt · hin und zurück", "Ich brauche eine Fahrkarte für eine einfache Fahrt.", "I need a one-way ticket.", ["Ich brauche eine Fahrkarte fuer eine einfache Fahrt."]]
      ]
    },
    "a1-health-past-checkpoint": {
      words: [
        ["a1hp-bauch", "der Bauch, die Bäuche", "stomach / abdomen", "Der Bauch tut weh.", "Mein Bauch tut seit heute Morgen weh.", "My stomach has hurt since this morning.", ["der Bauch, die Baeuche"]],
        ["a1hp-termin-machen", "einen Termin machen", "to make an appointment", "einen Termin beim Arzt machen", "Ich möchte einen Termin beim Arzt machen.", "I would like to make a doctor's appointment.", ["Ich moechte einen Termin beim Arzt machen."]],
        ["a1hp-besser", "besser", "better", "sich besser fühlen", "Heute fühle ich mich schon besser.", "I already feel better today.", ["Heute fuehle ich mich schon besser."]]
      ]
    },
    "a2-erlebnisse": {
      words: [
        ["a2e-uebernachten", "übernachten, hat übernachtet", "to stay overnight", "bei Freunden übernachten", "Wir haben bei Freunden in Hamburg übernachtet.", "We stayed overnight with friends in Hamburg.", ["uebernachten, hat uebernachtet"]],
        ["a2e-besichtigen", "besichtigen, hat besichtigt", "to visit / tour", "eine Sehenswürdigkeit besichtigen", "Am Nachmittag haben wir das Schloss besichtigt.", "In the afternoon we toured the castle.", ["eine Sehenswuerdigkeit besichtigen"]],
        ["a2e-sich-verlaufen", "sich verlaufen, hat sich verlaufen", "to get lost on foot", "sich in der Altstadt verlaufen", "Wir haben uns kurz in der Altstadt verlaufen.", "We briefly got lost in the old town.", []]
      ]
    },
    "a2-wohnung-raum": {
      words: [
        ["a2w-miete", "die Miete, die Mieten", "rent", "Miete zahlen · die monatliche Miete", "Die Miete zahlen wir am Monatsanfang.", "We pay the rent at the beginning of the month.", []],
        ["a2w-moebel", "die Möbel, nur Plural", "furniture", "neue Möbel kaufen", "Die Möbel passen gut in das kleine Zimmer.", "The furniture fits well in the small room.", ["die Moebel"]],
        ["a2w-hell", "hell", "bright / light", "ein helles Zimmer", "Das Wohnzimmer ist hell und ruhig.", "The living room is bright and quiet.", []]
      ]
    },
    "a2-termine-plaene": {
      words: [
        ["a2t-rechtzeitig", "rechtzeitig", "in time", "rechtzeitig ankommen", "Ich komme rechtzeitig zum Termin.", "I will arrive in time for the appointment.", []],
        ["a2t-ausweichen", "auf einen Termin ausweichen", "to switch to another appointment", "auf Freitag ausweichen", "Könnten wir auf Freitag ausweichen?", "Could we switch to Friday?", ["Koennten wir auf Freitag ausweichen?"]],
        ["a2t-freihalten", "sich einen Termin freihalten", "to keep a time free", "sich den Nachmittag freihalten", "Ich halte mir den Nachmittag frei.", "I am keeping the afternoon free.", []]
      ]
    },
    "a2-gesundheit": {
      words: [
        ["a2g-allergie", "die Allergie, die Allergien", "allergy", "eine Allergie gegen etwas haben", "Ich habe eine Allergie gegen Nüsse.", "I have a nut allergy.", ["Ich habe eine Allergie gegen Nuesse."]],
        ["a2g-nebenwirkung", "die Nebenwirkung, die Nebenwirkungen", "side effect", "mögliche Nebenwirkungen", "Hat das Medikament Nebenwirkungen?", "Does the medication have side effects?", ["moegliche Nebenwirkungen"]],
        ["a2g-krankschreibung", "die Krankschreibung, die Krankschreibungen", "sick note", "eine Krankschreibung brauchen", "Ich brauche eine Krankschreibung für meinen Arbeitgeber.", "I need a sick note for my employer.", ["Ich brauche eine Krankschreibung fuer meinen Arbeitgeber."]]
      ]
    },
    "a2-arbeit-lernen": {
      words: [
        ["a2a-frist", "die Frist, die Fristen", "deadline", "eine Frist einhalten", "Die Frist endet am kommenden Montag.", "The deadline ends next Monday.", []],
        ["a2a-rueckmeldung", "die Rückmeldung, die Rückmeldungen", "feedback / reply", "eine Rückmeldung geben", "Meine Kollegin gibt mir morgen eine Rückmeldung.", "My colleague will give me feedback tomorrow.", ["die Rueckmeldung, die Rueckmeldungen"]],
        ["a2a-uebernehmen", "übernehmen, hat übernommen", "to take over", "eine Aufgabe übernehmen", "Ich kann diese Aufgabe übernehmen.", "I can take over this task.", ["uebernehmen, hat uebernommen"]]
      ]
    },
    "a2-unterwegs": {
      words: [
        ["a2u-ersatzverkehr", "der Ersatzverkehr", "replacement transport", "ein Bus als Ersatzverkehr", "Wegen der Baustelle gibt es Ersatzverkehr mit Bussen.", "There are replacement buses because of the construction work.", []],
        ["a2u-gueltig", "gültig", "valid", "bis morgen gültig sein", "Ist diese Fahrkarte auch morgen gültig?", "Is this ticket also valid tomorrow?", ["gueltig"]],
        ["a2u-verspaetungsgrund", "der Verspätungsgrund, die Verspätungsgründe", "reason for a delay", "den Verspätungsgrund nennen", "In der Durchsage wurde kein Verspätungsgrund genannt.", "No reason for the delay was given in the announcement.", ["der Verspaetungsgrund, die Verspaetungsgruende"]]
      ]
    },
    "a2-einkaufen-service": {
      words: [
        ["a2s-garantie", "die Garantie, die Garantien", "warranty", "Garantie auf ein Gerät", "Auf das Gerät gibt es zwei Jahre Garantie.", "The device has a two-year warranty.", ["Garantie auf ein Geraet", "Auf das Geraet gibt es zwei Jahre Garantie."]],
        ["a2s-erstatten", "erstatten, hat erstattet", "to refund", "den Kaufpreis erstatten", "Der Kaufpreis wurde vollständig erstattet.", "The purchase price was refunded in full.", ["Der Kaufpreis wurde vollstaendig erstattet."]],
        ["a2s-mangel", "der Mangel, die Mängel", "defect / fault", "einen Mangel feststellen", "Ich habe nach dem Kauf einen Mangel festgestellt.", "I found a defect after the purchase.", ["der Mangel, die Maengel"]]
      ]
    },
    "a2-einladen-meinen": {
      words: [
        ["a2m-meiner-meinung", "Meiner Meinung nach ...", "In my opinion ...", "Meiner Meinung nach plus Verb", "Meiner Meinung nach passt Samstag besser.", "In my opinion, Saturday works better.", []],
        ["a2m-wie-waere", "Wie wäre es mit ...?", "How about ...?", "Wie wäre es mit plus dative?", "Wie wäre es mit einem Picknick im Park?", "How about a picnic in the park?", ["Wie waere es mit einem Picknick im Park?"]],
        ["a2m-kompromiss", "der Kompromiss, die Kompromisse", "compromise", "einen Kompromiss finden", "Vielleicht finden wir einen Kompromiss.", "Perhaps we can find a compromise.", []]
      ]
    },
    "b1-erzaehlen": {
      words: [
        ["b1e-augenzeuge", "der Augenzeuge, die Augenzeugen / die Augenzeugin, die Augenzeuginnen", "eyewitness", "mit einem Augenzeugen sprechen", "Die Augenzeugin beschrieb den Vorfall sehr genau.", "The eyewitness described the incident very precisely.", []],
        ["b1e-ablauf", "der Ablauf, die Abläufe", "sequence / course of events", "den Ablauf schildern", "Er schilderte den Ablauf in der richtigen Reihenfolge.", "He described the sequence of events in the correct order.", ["der Ablauf, die Ablaeufe"]],
        ["b1e-unerwartet", "unerwartet", "unexpectedly", "etwas geschieht unerwartet", "Unerwartet hielt der Bus mitten auf der Straße.", "Unexpectedly, the bus stopped in the middle of the road.", ["Unerwartet hielt der Bus mitten auf der Strasse."]]
      ]
    },
    "b1-wohnen-nachbarschaft": {
      words: [
        ["b1w-schimmel", "der Schimmel", "mold", "Schimmel an der Wand", "Im Schlafzimmer hat sich Schimmel gebildet.", "Mold has formed in the bedroom.", []],
        ["b1w-heizung", "die Heizung, die Heizungen", "heating system", "die Heizung fällt aus", "Seit gestern funktioniert die Heizung nicht mehr.", "The heating has stopped working since yesterday.", []],
        ["b1w-frist-setzen", "eine Frist setzen", "set a deadline", "eine angemessene Frist setzen", "Wir haben der Hausverwaltung eine Frist bis Freitag gesetzt.", "We gave the property management a deadline of Friday.", []]
      ]
    },
    "b1-beruf-bildung": {
      words: [
        ["b1b-stellenanzeige", "die Stellenanzeige, die Stellenanzeigen", "job advertisement", "eine Stellenanzeige lesen", "Die Stellenanzeige nennt flexible Arbeitszeiten.", "The job advertisement mentions flexible working hours.", []],
        ["b1b-anschreiben", "das Anschreiben, die Anschreiben", "cover letter", "ein Anschreiben verfassen", "Im Anschreiben begründet sie ihr Interesse an der Stelle.", "In the cover letter she explains her interest in the position.", []],
        ["b1b-arbeitszeugnis", "das Arbeitszeugnis, die Arbeitszeugnisse", "employment reference", "ein Arbeitszeugnis beilegen", "Bitte legen Sie der Bewerbung ein Arbeitszeugnis bei.", "Please include an employment reference with the application.", []]
      ]
    },
    "b1-medien-information": {
      words: [
        ["b1m-redaktion", "die Redaktion, die Redaktionen", "editorial team", "bei einer Redaktion nachfragen", "Die Redaktion hat den Artikel am Abend aktualisiert.", "The editorial team updated the article in the evening.", []],
        ["b1m-einseitig", "einseitig", "one-sided / biased", "ein Thema einseitig darstellen", "Der Beitrag stellt den Konflikt sehr einseitig dar.", "The report presents the conflict in a very one-sided way.", []],
        ["b1m-aktualisieren", "aktualisieren, hat aktualisiert", "to update", "Informationen regelmäßig aktualisieren", "Die Behörde aktualisiert die Informationen täglich.", "The authority updates the information daily.", ["Informationen regelmaessig aktualisieren"]]
      ]
    },
    "b1-umwelt-mobilitaet": {
      words: [
        ["b1u-nahverkehr", "der öffentliche Nahverkehr", "public transport", "den öffentlichen Nahverkehr ausbauen", "Die Stadt möchte den öffentlichen Nahverkehr ausbauen.", "The city wants to expand public transport.", ["der oeffentliche Nahverkehr"]],
        ["b1u-fussabdruck", "der CO₂-Fußabdruck, die CO₂-Fußabdrücke", "carbon footprint", "den CO₂-Fußabdruck verkleinern", "Weniger Flugreisen können den CO₂-Fußabdruck verkleinern.", "Fewer flights can reduce the carbon footprint.", ["der CO2-Fussabdruck, die CO2-Fussabdruecke"]],
        ["b1u-wiederverwenden", "wiederverwenden, hat wiederverwendet", "to reuse", "eine Verpackung wiederverwenden", "Viele Behälter lassen sich mehrmals wiederverwenden.", "Many containers can be reused several times.", ["Viele Behaelter lassen sich mehrmals wiederverwenden."]]
      ]
    },
    "b1-gesund-leben": {
      words: [
        ["b1g-vorsorge", "die Vorsorge", "preventive care", "regelmäßig zur Vorsorge gehen", "Viele Krankheiten lassen sich durch Vorsorge früher erkennen.", "Preventive care can identify many illnesses earlier.", ["regelmaessig zur Vorsorge gehen", "Viele Krankheiten lassen sich durch Vorsorge frueher erkennen."]],
        ["b1g-erholung", "die Erholung", "recovery / rest", "Zeit zur Erholung einplanen", "Nach anstrengenden Tagen ist genügend Erholung wichtig.", "Enough recovery is important after demanding days.", ["Nach anstrengenden Tagen ist genuegend Erholung wichtig."]],
        ["b1g-warnsignal", "das Warnsignal, die Warnsignale", "warning sign", "ein Warnsignal ernst nehmen", "Anhaltende Schlafprobleme können ein Warnsignal sein.", "Persistent sleep problems can be a warning sign.", ["Anhaltende Schlafprobleme koennen ein Warnsignal sein."]]
      ]
    },
    "b1-engagement": {
      words: [
        ["b1n-freiwillig", "freiwillig", "voluntarily", "sich freiwillig engagieren", "Viele Menschen helfen bei der Veranstaltung freiwillig.", "Many people volunteer to help at the event.", []],
        ["b1n-verantwortung", "die Verantwortung, die Verantwortungen", "responsibility", "Verantwortung für etwas übernehmen", "Im Verein übernimmt jedes Mitglied eine kleine Verantwortung.", "Each club member takes on a small responsibility.", ["Verantwortung fuer etwas uebernehmen", "Im Verein uebernimmt jedes Mitglied eine kleine Verantwortung."]],
        ["b1n-koordinieren", "koordinieren, hat koordiniert", "to coordinate", "freiwillige Helfer koordinieren", "Zwei Mitglieder koordinieren die freiwilligen Helfer.", "Two members coordinate the volunteers.", []]
      ]
    },
    "b1-argumentieren": {
      words: [
        ["b1a-einerseits", "einerseits ... andererseits", "on the one hand ... on the other hand", "einerseits plus clause · andererseits plus clause", "Einerseits spart der Plan Geld, andererseits kostet die Umsetzung Zeit.", "On the one hand the plan saves money; on the other hand implementation takes time.", []],
        ["b1a-im-gegensatz", "im Gegensatz dazu", "in contrast", "Im Gegensatz dazu plus Verb", "Im Gegensatz dazu wäre die zweite Lösung sofort verfügbar.", "In contrast, the second solution would be available immediately.", ["Im Gegensatz dazu waere die zweite Loesung sofort verfuegbar."]],
        ["b1a-auswirkung", "die Auswirkung, die Auswirkungen", "effect / impact", "Auswirkungen auf etwas haben", "Die Entscheidung hat direkte Auswirkungen auf Familien.", "The decision has a direct impact on families.", []]
      ]
    },
    "b2-positionen": {
      words: [
        ["b2pos-zielkonflikt", "der Zielkonflikt, die Zielkonflikte", "conflict between objectives", "einen Zielkonflikt offenlegen", "Zwischen schneller Umsetzung und gründlicher Prüfung besteht ein Zielkonflikt.", "There is a conflict between rapid implementation and thorough review.", ["Zwischen schneller Umsetzung und gruendlicher Pruefung besteht ein Zielkonflikt."]],
        ["b2pos-tragfaehig", "tragfähig", "viable / sustainable", "eine langfristig tragfähige Lösung", "Der Kompromiss muss finanziell tragfähig bleiben.", "The compromise must remain financially viable.", ["tragfaehig"]],
        ["b2pos-unter-bedingung", "unter der Bedingung, dass", "on the condition that", "zustimmen unter der Bedingung, dass", "Ich könnte dem Vorschlag unter der Bedingung zustimmen, dass die Wirkung geprüft wird.", "I could agree to the proposal on the condition that its impact is assessed.", ["Ich koennte dem Vorschlag unter der Bedingung zustimmen, dass die Wirkung geprueft wird."]]
      ]
    },
    "b2-quellen": {
      words: [
        ["b2src-methodik", "die Methodik, die Methodiken", "methodology", "die Methodik transparent darlegen", "Die Methodik der Untersuchung wird nur knapp erläutert.", "The study's methodology is explained only briefly.", ["Die Methodik der Untersuchung wird nur knapp erlaeutert."]],
        ["b2src-begutachtet", "wissenschaftlich begutachtet", "peer-reviewed", "eine wissenschaftlich begutachtete Studie", "Die Ergebnisse stammen aus einer wissenschaftlich begutachteten Studie.", "The findings come from a peer-reviewed study.", []],
        ["b2src-verzerrung", "die Verzerrung, die Verzerrungen", "bias / distortion", "eine mögliche Verzerrung berücksichtigen", "Die Auswahl der Befragten könnte zu einer Verzerrung führen.", "The selection of respondents could introduce bias.", ["eine moegliche Verzerrung beruecksichtigen", "Die Auswahl der Befragten koennte zu einer Verzerrung fuehren."]]
      ]
    },
    "b2-prozesse": {
      words: [
        ["b2proc-fristverlaengerung", "die Fristverlängerung, die Fristverlängerungen", "deadline extension", "eine Fristverlängerung beantragen", "Die Fristverlängerung muss schriftlich beantragt werden.", "The deadline extension must be requested in writing.", ["die Fristverlaengerung, die Fristverlaengerungen"]],
        ["b2proc-rechtsbehelf", "der Rechtsbehelf, die Rechtsbehelfe", "legal remedy", "einen Rechtsbehelf einlegen", "Der Bescheid enthält einen Hinweis auf mögliche Rechtsbehelfe.", "The notice includes information about possible legal remedies.", ["Der Bescheid enthaelt einen Hinweis auf moegliche Rechtsbehelfe."]],
        ["b2proc-ablehnungsgrund", "der Ablehnungsgrund, die Ablehnungsgründe", "reason for rejection", "einen Ablehnungsgrund erläutern", "Die Behörde muss den Ablehnungsgrund nachvollziehbar erläutern.", "The authority must explain the reason for rejection clearly.", ["der Ablehnungsgrund, die Ablehnungsgruende", "Die Behoerde muss den Ablehnungsgrund nachvollziehbar erlaeutern."]]
      ]
    },
    "b2-register": {
      words: [
        ["b2reg-dementsprechend", "dementsprechend", "accordingly", "Dementsprechend plus Verb", "Die Unterlagen sind vollständig. Dementsprechend kann die Prüfung beginnen.", "The documents are complete. Accordingly, the review can begin.", ["Die Unterlagen sind vollstaendig. Dementsprechend kann die Pruefung beginnen."]],
        ["b2reg-weiterleiten", "etwas an jemanden weiterleiten", "forward something to someone", "eine Anfrage an die Fachabteilung weiterleiten", "Wir haben Ihre Anfrage an die zuständige Fachabteilung weitergeleitet.", "We forwarded your inquiry to the responsible department.", ["Wir haben Ihre Anfrage an die zustaendige Fachabteilung weitergeleitet."]],
        ["b2reg-schriftlich-bestaetigen", "etwas schriftlich bestätigen", "confirm something in writing", "eine Vereinbarung schriftlich bestätigen", "Bitte bestätigen Sie die getroffene Vereinbarung schriftlich.", "Please confirm the agreement in writing.", ["etwas schriftlich bestaetigen", "Bitte bestaetigen Sie die getroffene Vereinbarung schriftlich."]]
      ]
    },
    "b2-relativ-partizip": {
      words: [
        ["b2dense-einschlaegig", "die einschlägigen Vorschriften", "the relevant regulations", "einschlägige Vorschriften beachten", "Die einschlägigen Vorschriften sind vollständig zu beachten.", "The relevant regulations must be observed in full.", ["die einschlaegigen Vorschriften", "Die einschlaegigen Vorschriften sind vollstaendig zu beachten."]],
        ["b2dense-eingereicht", "die fristgerecht eingereichten Unterlagen", "the documents submitted on time", "Unterlagen fristgerecht einreichen", "Die fristgerecht eingereichten Unterlagen werden zuerst geprüft.", "The documents submitted on time are reviewed first.", ["Die fristgerecht eingereichten Unterlagen werden zuerst geprueft."]],
        ["b2dense-geltend", "die derzeit geltende Regelung", "the regulation currently in force", "eine derzeit geltende Regelung", "Die derzeit geltende Regelung wird im Herbst überprüft.", "The regulation currently in force will be reviewed in the autumn.", ["Die derzeit geltende Regelung wird im Herbst ueberprueft."]]
      ]
    },
    "b2-haltung": {
      words: [
        ["b2stance-vorlaeufig", "vorläufig", "preliminary / provisional", "eine vorläufige Bewertung", "Die Ergebnisse lassen vorläufig keine eindeutige Bewertung zu.", "For now, the findings do not permit a clear assessment.", ["vorlaeufig", "eine vorlaeufige Bewertung"]],
        ["b2stance-denkbar", "denkbar", "conceivable", "eine denkbare Erklärung", "Als Ursache wäre auch ein technischer Fehler denkbar.", "A technical fault would also be conceivable as the cause.", ["Als Ursache waere auch ein technischer Fehler denkbar."]],
        ["b2stance-befund", "der Befund, die Befunde", "finding", "einen Befund vorsichtig interpretieren", "Dieser Befund sollte angesichts der kleinen Stichprobe vorsichtig interpretiert werden.", "This finding should be interpreted cautiously given the small sample.", []]
      ]
    },
    "b2-kohaesion": {
      words: [
        ["b2coh-darueber-hinaus", "darüber hinaus", "furthermore", "Darüber hinaus plus Verb", "Darüber hinaus entstehen zusätzliche Schulungskosten.", "Furthermore, additional training costs arise.", ["darueber hinaus", "Darueber hinaus entstehen zusaetzliche Schulungskosten."]],
        ["b2coh-hingegen", "hingegen", "by contrast", "subject plus hingegen plus verb", "Die Nachfrage stieg im Zentrum. In den Außenbezirken sank sie hingegen.", "Demand rose in the center. By contrast, it fell in the outer districts.", ["Die Nachfrage stieg im Zentrum. In den Aussenbezirken sank sie hingegen."]],
        ["b2coh-zusammengenommen", "zusammengenommen", "taken together", "Zusammengenommen plus Verb", "Zusammengenommen sprechen die Ergebnisse für eine schrittweise Einführung.", "Taken together, the findings support gradual implementation.", ["Zusammengenommen sprechen die Ergebnisse fuer eine schrittweise Einfuehrung."]]
      ]
    },
    "b2-integration": {
      words: [
        ["b2int-umsetzungsplan", "der Umsetzungsplan, die Umsetzungspläne", "implementation plan", "einen realistischen Umsetzungsplan entwickeln", "Der Umsetzungsplan legt Zuständigkeiten und Fristen fest.", "The implementation plan defines responsibilities and deadlines.", ["der Umsetzungsplan, die Umsetzungsplaene", "Der Umsetzungsplan legt Zustaendigkeiten und Fristen fest."]],
        ["b2int-interessengruppe", "die Interessengruppe, die Interessengruppen", "stakeholder group", "betroffene Interessengruppen einbeziehen", "Alle betroffenen Interessengruppen sollten frühzeitig einbezogen werden.", "All affected stakeholder groups should be involved at an early stage.", ["Alle betroffenen Interessengruppen sollten fruehzeitig einbezogen werden."]],
        ["b2int-evaluieren", "evaluieren, hat evaluiert", "to evaluate", "eine Maßnahme systematisch evaluieren", "Nach einem Jahr wird die Maßnahme anhand klarer Kriterien evaluiert.", "After one year, the measure will be evaluated using clear criteria.", ["eine Massnahme systematisch evaluieren", "Nach einem Jahr wird die Massnahme anhand klarer Kriterien evaluiert."]]
      ]
    }
  };

  for (const [moduleId, addition] of Object.entries(practicalExpansion)) {
    const target = expansion[moduleId] || (expansion[moduleId] = { words: [], grammar: [] });
    target.words = [...(target.words || []), ...(addition.words || [])];
    target.grammar = [...(target.grammar || []), ...(addition.grammar || [])];
  }

  const wordFromRow = row => ({
    id: row[0],
    de: row[1],
    en: row[2],
    bundle: row[3],
    example: row[4],
    exampleEn: row[5],
    variants: row[6] || [],
    practiceAnswers: row[7] || [],
    supplemental: true
  });

  const grammarFromRow = row => ({ title: row[0], rule: row[1], example: row[2], translation: row[3] || "", supplemental: true });

  for (const module of course.modules) {
    const addition = expansion[module.id];
    if (!addition) continue;
    const knownWordIds = new Set(module.words.map(word => word.id));
    const knownGrammarTitles = new Set(module.grammar.map(card => card.title));
    for (const row of addition.words || []) {
      if (!knownWordIds.has(row[0])) module.words.push(wordFromRow(row));
    }
    for (const row of addition.grammar || []) {
      if (!knownGrammarTitles.has(row[0])) module.grammar.push(grammarFromRow(row));
    }
  }
})();
