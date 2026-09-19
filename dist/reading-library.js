(function () {
  const choice = (skill, prompt, options, answer, evidence, explanation) => ({ type: "choice", skill, prompt, options, answer, evidence, explanation });
  const text = (skill, prompt, answers, required, evidence, explanation) => ({ type: "text", skill, prompt, answers, required, evidence, explanation });
  const reading = (item) => ({ ...item, passScore: item.passScore || 0.7 });

  window.SATZWERK_READINGS = [
    reading({
      id: "a0-guten-morgen", level: "A0", mode: "guided", title: "Guten Morgen, Frau Roth", genre: "Mini-dialogue", domain: "First contact", region: "Germany", intro: "Two people meet at the entrance to a course. Read the exchange and find the greeting, name, and room.",
      glossary: [["Guten Morgen", "good morning"], ["Ich heiße", "my name is"], ["Ich bin", "I am"], ["der Deutschkurs", "German course"], ["mein Kurs", "my course"], ["der Raum", "room"], ["auch", "also"], ["Danke", "thank you"]],
      sections: [
        "Frau Roth: Guten Morgen! Ich heiße Anna Roth.",
        "Herr Yilmaz: Guten Morgen, Frau Roth. Ich bin Cem Yilmaz.",
        "Frau Roth: Der Deutschkurs ist in Raum drei.",
        "Herr Yilmaz: Danke. Mein Kurs ist auch in Raum drei."
      ],
      culture: "Herr and Frau plus the family name are common polite forms of address. The conversation uses the formal style even though the word Sie is not needed in these four sentences.",
      questions: [
        choice("detail", "When do the two people meet?", ["In the morning", "At night", "At lunchtime"], "In the morning", "Guten Morgen", "Guten Morgen identifies the morning."),
        choice("detail", "What is Mr. Yilmaz's first name?", ["Cem", "Anna", "Roth"], "Cem", "Ich bin Cem Yilmaz.", "Cem is his first name and Yilmaz is his family name."),
        text("scanning", "Type the room number in German.", ["drei", "Raum drei"], [["drei"]], "Der Deutschkurs ist in Raum drei.", "Both courses are in room three.")
      ]
    }),
    reading({
      id: "a0-first-course-day", level: "A0", mode: "guided", title: "Mein erster Kurstag", genre: "Course card", domain: "Learning", region: "Germany", intro: "A course card gives the essential information for a new learner.",
      glossary: [["der Kurs", "course"], ["beginnt", "begins"], ["der Tag", "day"], ["die Zeit", "time"], ["der Ort", "place"], ["spricht", "speaks"]],
      sections: [
        "DEUTSCHKURS A0",
        "Name: Noor Haddad",
        "Tag: Montag",
        "Zeit: 9:00 Uhr",
        "Ort: Lernzentrum West, Raum 12",
        "Noor spricht Arabisch und Englisch. Heute beginnt ihr erster Deutschkurs."
      ],
      culture: "German schedules normally use the 24-hour clock. 9:00 Uhr is nine in the morning, while 21:00 Uhr is nine in the evening.",
      questions: [
        choice("scanning", "On which day is the course?", ["Monday", "Tuesday", "Friday"], "Monday", "Tag: Montag", "Montag means Monday."),
        choice("scanning", "Where is the course?", ["Room 12", "Room 9", "Platform 12"], "Room 12", "Ort: Lernzentrum West, Raum 12", "The Ort line gives the building and room."),
        text("detail", "Which two languages does Noor already speak? Answer in German.", ["Arabisch und Englisch", "Englisch und Arabisch"], [["arabisch"], ["englisch"]], "Noor spricht Arabisch und Englisch.", "The last line names both languages.")
      ]
    }),
    reading({
      id: "a0-bakery", level: "A0", mode: "transfer", title: "Zwei Brötchen, bitte", genre: "Price board and dialogue", domain: "Food and shopping", region: "Germany", intro: "Mina buys breakfast at a bakery. Scan the price board before reading the exchange.",
      glossary: [["das Brötchen", "bread roll"], ["Was möchten Sie?", "What would you like?"], ["einen Kaffee", "a coffee"], ["sonst noch", "anything else"], ["Das ist alles", "That is all"], ["Das macht", "That comes to"]],
      sections: [
        "PREISE: Brötchen 0,50 Euro | Croissant 1,40 Euro | Kaffee 2,20 Euro | Tee 1,80 Euro",
        "Verkäuferin: Guten Morgen. Was möchten Sie?",
        "Mina: Zwei Brötchen und einen Kaffee, bitte.",
        "Verkäuferin: Sonst noch etwas?",
        "Mina: Nein, danke. Das ist alles.",
        "Verkäuferin: Das macht 3,20 Euro."
      ],
      culture: "Brötchen is a common word in much of Germany. Regional names include Semmel and Schrippe.",
      questions: [
        choice("detail", "What does Mina order?", ["Two rolls and a coffee", "One roll and a tea", "Two croissants and a coffee"], "Two rolls and a coffee", "Zwei Brötchen und einen Kaffee, bitte.", "Her complete order appears in one sentence."),
        choice("scanning", "How much is one coffee?", ["2.20 euros", "1.80 euros", "3.20 euros"], "2.20 euros", "Kaffee 2,20 Euro", "The price board lists the price of each item."),
        text("detail", "Type the total in German number words.", ["drei Euro zwanzig", "drei euro zwanzig"], [["drei"], ["zwanzig"]], "Das macht 3,20 Euro.", "The total is three euros and twenty cents.")
      ]
    }),
    reading({
      id: "a0-bus-four", level: "A0", mode: "checkpoint", title: "Bus 4 zum Bahnhof", genre: "Stop display and message", domain: "Transport", region: "Germany", intro: "Lukas needs the station. Use the display and the short message to choose the correct bus.",
      glossary: [["der Bahnhof", "train station"], ["die Haltestelle", "stop"], ["fährt", "travels"], ["nimm", "take"], ["Ich warte", "I am waiting"], ["vor dem Eingang", "in front of the entrance"], ["der Zug", "train"]],
      sections: [
        "HALTESTELLE MARKTPLATZ",
        "Bus 2: Universität, 10:05",
        "Bus 4: Hauptbahnhof, 10:08",
        "Bus 7: Stadtpark, 10:12",
        "Nachricht von Lea: Hallo Lukas, nimm Bus 4 zum Hauptbahnhof. Ich warte vor dem Eingang. Der Zug fährt um 10:45."
      ],
      culture: "Hauptbahnhof is often abbreviated as Hbf on signs, tickets, and transport apps.",
      questions: [
        choice("scanning", "Which bus goes to the main station?", ["Bus 4", "Bus 2", "Bus 7"], "Bus 4", "Bus 4: Hauptbahnhof", "The destination Hauptbahnhof appears beside bus 4."),
        choice("detail", "Where will Lea wait?", ["In front of the entrance", "At the university", "Inside the train"], "In front of the entrance", "Ich warte vor dem Eingang.", "vor dem Eingang means in front of the entrance."),
        text("scanning", "At what time does the train leave? Type the time.", ["10:45", "10.45", "zehn Uhr fünfundvierzig", "zehn uhr fuenfundvierzig"], [["10:45", "10.45", "zehn"], ["45", "fünfundvierzig", "fuenfundvierzig"]], "Der Zug fährt um 10:45.", "The message gives a bus departure and a later train departure. The question asks for the train.")
      ]
    }),
    reading({
      id: "a1-samira-later", level: "A1", mode: "guided", title: "Samira kommt später", genre: "Group chat", domain: "Invitations and planning", region: "Germany", intro: "Friends plan a birthday evening. Follow the times and decide who can help.",
      glossary: [["später", "later"], ["mitbringen", "bring along"], ["abholen", "pick up"], ["deshalb", "therefore"], ["gegen", "around or approximately"], ["sich ändern", "change"], ["Bescheid sagen", "let someone know"]],
      sections: [
        "Jonas: Hallo zusammen! Am Samstag feiere ich meinen Geburtstag. Wir treffen uns um 18 Uhr bei mir. Könnt ihr kommen?",
        "Elif: Ja, gern. Ich kann schon um 17:30 Uhr kommen und beim Kochen helfen.",
        "Samira: Ich arbeite am Samstag bis 18 Uhr. Deshalb komme ich wahrscheinlich erst um 19 Uhr. Ich bringe einen Salat mit.",
        "Pavel: Mein Zug kommt um 17:45 Uhr am Hauptbahnhof an. Kann mich jemand abholen?",
        "Elif: Ich kann dich abholen. Dann sind wir gegen 18:15 Uhr bei Jonas.",
        "Jonas: Super. Sagt bitte Bescheid, wenn sich etwas ändert."
      ],
      culture: "In informal messages, Germans often use exact times when coordinating plans. gegen signals an approximate time.",
      questions: [
        choice("gist", "What is the chat mainly about?", ["Planning a birthday evening", "Finding a new apartment", "Changing a train ticket"], "Planning a birthday evening", "Am Samstag feiere ich meinen Geburtstag.", "Jonas invites the group and they coordinate arrival times."),
        choice("detail", "Who offers to help with the cooking?", ["Elif", "Samira", "Pavel"], "Elif", "Ich kann schon um 17:30 Uhr kommen und beim Kochen helfen.", "Elif offers to arrive early and help cook."),
        text("detail", "Why will Samira arrive later? Answer briefly in German.", ["Sie arbeitet bis 18 Uhr.", "Weil sie bis 18 Uhr arbeitet.", "Sie muss bis 18 Uhr arbeiten."], [["arbeit"] ,["18"]], "Ich arbeite am Samstag bis 18 Uhr.", "Her work ends at the same time that the party begins.")
      ]
    }),
    reading({
      id: "a1-room-leipzig", level: "A1", mode: "transfer", title: "Ein Zimmer in Leipzig", genre: "Room listing and inquiry", domain: "Housing", region: "Germany", intro: "Read a shared-flat listing and Lara's message. Decide whether the room fits her needs.",
      glossary: [["die WG", "shared apartment"], ["möbliert", "furnished"], ["die Miete", "rent"], ["die Nebenkosten", "additional housing costs"], ["enthalten", "included"], ["entfernt", "away"], ["mindestens", "at least"], ["die Haustiere", "pets"], ["ansehen", "view or look at"], ["ruhig", "quiet"]],
      sections: [
        "ZIMMER FREI IN LEIPZIG-PLAGWITZ",
        "Wir sind Derya (27) und Max (31) und suchen ab 1. Oktober eine dritte Person für unsere WG. Das Zimmer ist 16 Quadratmeter groß, möbliert und ruhig. Die Wohnung liegt fünf Minuten von der Straßenbahnhaltestelle entfernt. Supermarkt, Bäckerei und Park sind in der Nähe. Die Miete beträgt 410 Euro inklusive Nebenkosten. Haustiere sind leider nicht möglich.",
        "Hallo Derya und Max, ich heiße Lara, bin 24 Jahre alt und beginne im Oktober eine Ausbildung in Leipzig. Ich suche ein ruhiges Zimmer für mindestens ein Jahr. Ich habe keine Haustiere und fahre meistens mit der Straßenbahn. Ist das Internet in der Miete enthalten? Kann ich das Zimmer nächste Woche ansehen? Viele Grüße, Lara"
      ],
      culture: "WG is short for Wohngemeinschaft. A room in a WG is private, while the kitchen and bathroom are normally shared.",
      questions: [
        choice("matching", "Which need from Lara clearly matches the listing?", ["She wants a quiet room", "She needs a garden", "She owns a dog"], "She wants a quiet room", "Das Zimmer ist ... ruhig. / Ich suche ein ruhiges Zimmer.", "Both the listing and Lara use ruhig."),
        choice("detail", "What is included in the 410 euros?", ["Additional housing costs", "A transport pass", "Food"], "Additional housing costs", "inklusive Nebenkosten", "Nebenkosten are explicitly included."),
        text("inference", "Which cost does Lara still need to clarify? Answer in German.", ["das Internet", "die Internetkosten", "ob das Internet in der Miete enthalten ist"], [["internet"]], "Ist das Internet in der Miete enthalten?", "Her question shows that the listing does not explain the internet cost.")
      ]
    }),
    reading({
      id: "a1-pfandbon", level: "A1", mode: "extensive", title: "Der Pfandbon fehlt", genre: "Short incident", domain: "Shopping", region: "Germany", intro: "A small shopping problem becomes a useful conversation at the supermarket.",
      glossary: [["der Pfandautomat", "bottle-return machine"], ["der Bon", "receipt or voucher"], ["nacheinander", "one after another"], ["herauskommen", "come out"], ["die Klappe", "flap"], ["abziehen", "deduct"], ["der Kassenbon", "checkout receipt"]],
      sections: [
        "Nach der Arbeit geht Ben zum Supermarkt. In seinem Rucksack sind sechs leere Flaschen. Er steckt sie nacheinander in den Pfandautomaten. Auf dem Bildschirm steht: 1,50 Euro. Ben drückt auf den grünen Knopf. Der Automat macht ein Geräusch, aber es kommt kein Bon heraus.",
        "Ben wartet kurz und drückt noch einmal. Nichts passiert. Eine Mitarbeiterin sieht ihn und fragt: 'Gibt es ein Problem?' Ben erklärt die Situation. Die Mitarbeiterin öffnet eine kleine Klappe am Automaten. Dahinter liegt der Pfandbon.",
        "An der Kasse kauft Ben Brot, Käse und Äpfel. Er gibt der Kassiererin den Bon. Die 1,50 Euro werden vom Preis abgezogen. Ben steckt den Kassenbon in seinen Rucksack. Diesen Bon möchte er nicht verlieren."
      ],
      culture: "Many drink containers carry a deposit called Pfand. A return machine prints a voucher that is redeemed at the checkout.",
      questions: [
        choice("sequence", "What happened immediately after Ben pressed the green button?", ["The machine made a sound, but no voucher appeared", "The employee gave him cash", "He bought six bottles"], "The machine made a sound, but no voucher appeared", "Der Automat macht ein Geräusch, aber es kommt kein Bon heraus.", "This is the problem that begins the incident."),
        choice("reference", "What was behind the small flap?", ["The deposit voucher", "An empty bottle", "Ben's receipt"], "The deposit voucher", "Dahinter liegt der Pfandbon.", "Dahinter refers to behind the flap."),
        text("detail", "How much was deducted from Ben's shopping total?", ["1,50 Euro", "1.50 Euro", "ein Euro fünfzig", "ein euro fuenfzig"], [["1,50", "1.50", "ein"], ["50", "fünfzig", "fuenfzig"]], "Die 1,50 Euro werden vom Preis abgezogen.", "The voucher value is credited at the checkout.")
      ]
    }),
    reading({
      id: "a1-train-change", level: "A1", mode: "checkpoint", title: "Der Zug fährt heute anders", genre: "Service notice and messages", domain: "Travel", region: "Germany", intro: "A construction notice changes a short trip. Combine the notice with the travelers' messages.",
      glossary: [["wegen Bauarbeiten", "because of construction work"], ["entfällt", "is cancelled"], ["der Ersatzbus", "replacement bus"], ["umsteigen", "change vehicles"], ["voraussichtlich", "expected"]],
      sections: [
        "FAHRGASTINFORMATION FÜR SONNTAG",
        "Wegen Bauarbeiten fahren zwischen Bonn und Remagen keine Regionalzüge. Fahrgäste nutzen den Ersatzbus vor dem Bonner Hauptbahnhof. Der Bus fährt alle 30 Minuten und braucht ungefähr 55 Minuten bis Remagen. Fahrräder können im Ersatzbus nicht mitgenommen werden.",
        "Mara: Unser Zug um 9:12 Uhr entfällt. Wir müssen den Ersatzbus nehmen.",
        "Tobias: Dann treffen wir uns um 8:45 Uhr vor dem Hauptbahnhof. Mein Fahrrad lasse ich zu Hause.",
        "Mara: Gut. In Remagen steigen wir in den Zug nach Koblenz um. Wir kommen voraussichtlich um 11:20 Uhr an."
      ],
      culture: "Rail notices often use formal compounds such as Fahrgastinformation and Schienenersatzverkehr. Ersatzbus is the more transparent everyday word.",
      questions: [
        choice("cause", "Why are no regional trains running between Bonn and Remagen?", ["Construction work", "A public holiday", "A bicycle race"], "Construction work", "Wegen Bauarbeiten", "The notice gives the reason in its first sentence."),
        choice("procedure", "Where should passengers find the replacement bus?", ["In front of Bonn central station", "On the train platform", "In Koblenz"], "In front of Bonn central station", "vor dem Bonner Hauptbahnhof", "The meeting message repeats the location from the notice."),
        choice("constraint", "Why does Tobias leave his bicycle at home?", ["Bicycles are not allowed on the replacement bus", "His bicycle is broken", "Mara has another bicycle"], "Bicycles are not allowed on the replacement bus", "Fahrräder können im Ersatzbus nicht mitgenommen werden.", "He adapts his plan to the transport restriction."),
        text("sequence", "Where do Mara and Tobias change to a train?", ["in Remagen", "Remagen"], [["remagen"]], "In Remagen steigen wir in den Zug nach Koblenz um.", "They travel by bus to Remagen and continue by train.")
      ]
    }),
    reading({
      id: "a2-parcel-18", level: "A2", mode: "guided", title: "Das Paket bei Hausnummer 18", genre: "Delivery notices and messages", domain: "Public services", region: "Germany", intro: "A delivery takes an unexpected route through the neighborhood. Reconstruct what happened and decide what Mira should do.",
      glossary: [["zustellen", "deliver"], ["die Benachrichtigung", "notification"], ["hinterlegen", "leave or deposit"], ["der Ausweis", "identity card"], ["die Vollmacht", "written authorization"]],
      sections: [
        "SENDUNGSSTATUS: Dienstag, 11:42 Uhr. Eine Zustellung war nicht möglich. Die Sendung wurde bei einer Nachbarin oder einem Nachbarn hinterlegt. Weitere Angaben finden Sie auf der Benachrichtigungskarte.",
        "Auf der Karte steht mit blauer Handschrift: Paket bei Hausnummer 18, Familie Novak, zweiter Stock. Abholung ab 17 Uhr.",
        "Mira wohnt in Hausnummer 12 und kennt die Familie Novak noch nicht. Um 17:30 Uhr geht sie zu Hausnummer 18. Dort öffnet Herr Novak die Tür. Er erklärt, dass seine Frau das Paket angenommen hat. Sie ist jedoch noch bei der Arbeit, und das Paket liegt in ihrem abgeschlossenen Arbeitszimmer.",
        "Herr Novak schreibt Mira eine kurze Nachricht: 'Das Paket für Mira Klein liegt bei uns. Meine Frau kommt gegen 19 Uhr. Bitte klingeln Sie danach noch einmal.' Mira bedankt sich und geht nach Hause. Um 19:15 Uhr kehrt sie mit ihrem Ausweis zurück und erhält das Paket."
      ],
      culture: "A parcel may be left with a neighbor when the recipient is away. Delivery preferences can often be changed through the carrier's app or website.",
      questions: [
        choice("timeline", "When was the first delivery attempted?", ["Tuesday at 11:42", "Tuesday at 17:30", "Tuesday at 19:15"], "Tuesday at 11:42", "Dienstag, 11:42 Uhr. Eine Zustellung war nicht möglich.", "The tracking line records the original attempt."),
        choice("reference", "Who originally accepted the parcel?", ["Mrs. Novak", "Mr. Novak", "Mira"], "Mrs. Novak", "Er erklärt, dass seine Frau das Paket angenommen hat.", "seine Frau refers to Mr. Novak's wife."),
        choice("cause", "Why could Mr. Novak not give Mira the parcel at 17:30?", ["It was in a locked room", "Mira had no delivery card", "The parcel was still in the truck"], "It was in a locked room", "das Paket liegt in ihrem abgeschlossenen Arbeitszimmer", "His wife had accepted it and the room was locked."),
        text("procedure", "What did Mira bring when she returned? Answer in German.", ["ihren Ausweis", "den Ausweis", "einen Ausweis", "Ausweis"], [["ausweis"]], "Sie kehrt mit ihrem Ausweis zurück.", "The final sentence names the document she brought.")
      ]
    }),
    reading({
      id: "a2-week-car-free", level: "A2", mode: "extensive", title: "Eine Woche ohne Auto", genre: "Blog diary", domain: "Mobility", region: "Austria", intro: "David tests whether his household can manage one week without a car in Graz.",
      glossary: [["erledigen", "take care of a task"], ["die Strecke", "route or distance"], ["umsteigen", "change vehicles"], ["zuverlässig", "reliable"], ["der Einkauf", "shopping"]],
      sections: [
        "Montag: Unser Auto ist in der Werkstatt. Meine Frau Aylin schlägt vor, dass wir eine Woche lang alle Wege ohne Auto zurücklegen. Ich fahre normalerweise zwölf Kilometer zur Arbeit. Heute nehme ich die Straßenbahn. Die Fahrt dauert zehn Minuten länger, aber ich kann unterwegs lesen.",
        "Dienstag: Es regnet stark. Unsere Tochter muss zum Schwimmkurs. Mit dem Bus müssten wir zweimal umsteigen, deshalb leihen wir ein Lastenrad bei einer Station in der Nähe. Das Dach über dem Kindersitz hält sie trocken. Ich komme nass an, doch meine Tochter findet die Fahrt großartig.",
        "Mittwoch und Donnerstag: Für kleine Einkäufe gehen wir zu Fuß. Früher sind wir oft mit dem Auto zu einem großen Supermarkt am Stadtrand gefahren. Jetzt kaufen wir weniger und planen genauer. Obst und Brot sind im Geschäft um die Ecke etwas teurer. Dafür werfen wir am Ende weniger Lebensmittel weg.",
        "Freitag: Am Abend wollen wir Freunde außerhalb der Stadt besuchen. Der letzte Bus zurück fährt schon um 22:15 Uhr. Wir bleiben über Nacht, weil ein Taxi sehr teuer wäre.",
        "Sonntag: Die Werkstatt ruft an. Das Auto ist fertig. Wir werden es weiterhin brauchen, besonders für Besuche bei meinen Eltern auf dem Land. Für meinen Arbeitsweg ist die Straßenbahn jedoch bequemer als erwartet. Das Lastenrad möchten wir ebenfalls wieder ausleihen."
      ],
      culture: "Many Austrian cities combine trams, buses, bicycles, and car-sharing. Public transport is strong in cities, while rural connections can be less frequent.",
      questions: [
        choice("comparison", "What advantage does David find on Monday?", ["He can read during the trip", "The tram is ten minutes faster", "The ride is free"], "He can read during the trip", "aber ich kann unterwegs lesen", "The trip is longer, but it gives him reading time."),
        choice("cause", "Why does the family stay overnight on Friday?", ["The last bus leaves early and a taxi is expensive", "Their friends ask them to babysit", "The car repair takes another week"], "The last bus leaves early and a taxi is expensive", "Der letzte Bus ... fährt schon um 22:15 Uhr. Wir bleiben über Nacht, weil ein Taxi sehr teuer wäre.", "Both transport facts explain the decision."),
        choice("inference", "What changed about their grocery shopping?", ["They plan more carefully and waste less", "They buy more at the large supermarket", "They stop buying fruit"], "They plan more carefully and waste less", "Jetzt kaufen wir weniger und planen genauer ... werfen wir ... weniger Lebensmittel weg.", "The new routine changes both planning and waste."),
        text("evaluation", "Which two forms of transport will they probably keep using? Answer in German.", ["die Straßenbahn und das Lastenrad", "Straßenbahn und Lastenrad"], [["straßenbahn", "strassenbahn"], ["lastenrad"]], "Für meinen Arbeitsweg ist die Straßenbahn ... Das Lastenrad möchten wir ebenfalls wieder ausleihen.", "The final paragraph identifies both choices.")
      ]
    }),
    reading({
      id: "a2-three-courses", level: "A2", mode: "transfer", title: "Drei Kurse, ein freier Abend", genre: "Listings and learner profile", domain: "Learning", region: "Germany", intro: "Choose the most suitable evening course for Kenan. Every condition matters.",
      glossary: [["Vorkenntnisse", "previous knowledge"], ["die Gebühr", "fee"], ["wöchentlich", "weekly"], ["barrierefrei", "accessible without steps"], ["die Anmeldung", "registration"]],
      sections: [
        "KENANS PROFIL: Kenan arbeitet montags bis donnerstags bis 18 Uhr. Freitags hat er ab 16 Uhr Zeit. Er möchte besser fotografieren lernen und besitzt eine einfache Digitalkamera. Ein Kurs darf höchstens 90 Euro kosten. Kenan kann Treppen wegen einer Verletzung zurzeit nur schwer benutzen.",
        "KURS A, FOTOGRAFIE IM PARK: Freitags 17:00 bis 19:00 Uhr, sechs Termine. Treffpunkt ist das Kulturhaus Nord. Bei gutem Wetter arbeitet die Gruppe draußen. Eigene Kamera erforderlich. Gebühr: 78 Euro. Das Kulturhaus und seine Toiletten sind barrierefrei.",
        "KURS B, BILDER AM SMARTPHONE: Mittwochs 18:30 bis 20:00 Uhr, acht Termine. Der Kurs richtet sich an Anfängerinnen und Anfänger. Ein aktuelles Smartphone ist erforderlich. Gebühr: 65 Euro. Der Unterricht findet im dritten Stock statt. Es gibt keinen Aufzug.",
        "KURS C, STUDIOFOTOGRAFIE: Samstags 10:00 bis 14:00 Uhr, vier Termine. Grundkenntnisse und eine Kamera mit manuellen Einstellungen sind erforderlich. Gebühr: 120 Euro. Zwei Kameras können gegen eine zusätzliche Gebühr ausgeliehen werden.",
        "Für alle Kurse ist eine Anmeldung bis zum 12. September nötig. Eine kostenlose Abmeldung ist bis sieben Tage vor Kursbeginn möglich."
      ],
      culture: "Adult education centers, often called Volkshochschulen, offer affordable courses in languages, technology, arts, health, and many other subjects.",
      questions: [
        choice("matching", "Which course meets all of Kenan's conditions?", ["Course A", "Course B", "Course C"], "Course A", "Freitags ... 78 Euro ... barrierefrei ... Eigene Kamera erforderlich.", "Course A fits his time, budget, equipment, and access needs."),
        choice("elimination", "Why is Course B unsuitable despite its lower price?", ["The building has no lift", "It requires professional experience", "It takes place on Saturday"], "The building has no lift", "im dritten Stock ... keinen Aufzug", "Kenan currently has difficulty with stairs, and the course room is on the third floor without a lift."),
        choice("condition", "What must every participant do by 12 September?", ["Register", "Pay an extra equipment fee", "Attend a trial lesson"], "Register", "Für alle Kurse ist eine Anmeldung bis zum 12. September nötig.", "The final rule applies to all three courses."),
        text("justification", "Name two facts that make Course A suitable. Answer briefly in German.", ["Freitag und 78 Euro", "freitags und barrierefrei", "78 Euro und barrierefrei", "eigene Kamera und barrierefrei"], [["freitag", "78", "barrierefrei", "kamera"], ["freitag", "78", "barrierefrei", "kamera"]], "Freitags ... 78 Euro ... barrierefrei ... Eigene Kamera erforderlich.", "Any two relevant matching facts demonstrate the choice.")
      ]
    }),
    reading({
      id: "a2-house-rules", level: "A2", mode: "checkpoint", title: "Die Hausordnung und die Geburtstagsfeier", genre: "Rules and neighbor note", domain: "Housing", region: "Germany", intro: "Leonie plans a birthday gathering. Apply the building rules to her plan.",
      glossary: [["die Ruhezeit", "quiet period"], ["vermeiden", "avoid"], ["gestattet", "permitted"], ["der Innenhof", "courtyard"], ["Rücksicht nehmen", "be considerate"]],
      sections: [
        "AUSZUG AUS DER HAUSORDNUNG",
        "1. Die allgemeine Ruhezeit beginnt täglich um 22 Uhr und endet um 7 Uhr. In dieser Zeit sind laute Musik und laute Gespräche auf Balkonen zu vermeiden.",
        "2. Der Innenhof darf von allen Bewohnerinnen und Bewohnern bis 21 Uhr genutzt werden. Private Feiern mit mehr als zwölf Gästen müssen der Hausverwaltung mindestens drei Tage vorher gemeldet werden.",
        "3. Grillen mit Kohle ist im Innenhof wegen der Brandgefahr nicht gestattet. Elektrische Tischgrills sind erlaubt, wenn andere Personen dadurch nicht gestört werden.",
        "4. Flure und Treppenhäuser müssen frei bleiben. Fahrräder, Kinderwagen und Getränkekisten dürfen dort nicht abgestellt werden.",
        "NACHRICHT VON LEONIE AN DIE NACHBARSCHAFT",
        "Liebe Nachbarinnen und Nachbarn, am Samstag feiere ich ab 18 Uhr meinen Geburtstag im Innenhof. Es kommen wahrscheinlich zehn Gäste. Wir benutzen einen kleinen elektrischen Grill und gehen spätestens um 21 Uhr in meine Wohnung. Ab 22 Uhr machen wir die Musik leise. Falls es trotzdem zu laut ist, klingeln Sie bitte bei mir. Viele Grüße, Leonie aus Wohnung 14"
      ],
      culture: "A Hausordnung records shared expectations for a building. Quiet hours, waste, corridors, pets, and shared spaces are common topics.",
      questions: [
        choice("rule", "Must Leonie report the gathering to the property management?", ["No, because she expects only ten guests", "Yes, because every gathering must be reported", "Yes, because she uses the courtyard"], "No, because she expects only ten guests", "mehr als zwölf Gäste müssen ... gemeldet werden", "The reporting rule begins above twelve guests."),
        choice("rule", "Is her grill allowed?", ["Yes, provided it does not disturb other residents", "No, every grill is forbidden", "Only after 22:00"], "Yes, provided it does not disturb other residents", "Elektrische Tischgrills sind erlaubt, wenn andere Personen dadurch nicht gestört werden.", "The grill type is permitted only while it does not disturb anyone else."),
        choice("exception", "Which part of Leonie's plan still requires care after 22:00?", ["The music must remain quiet", "The courtyard may reopen", "Bicycles may be stored in the hall"], "The music must remain quiet", "Die allgemeine Ruhezeit beginnt täglich um 22 Uhr. In dieser Zeit ist laute Musik zu vermeiden.", "The quiet period begins at 22:00, so loud music is no longer permitted."),
        text("procedure", "At what time must the group leave the courtyard?", ["um 21 Uhr", "21 Uhr", "21:00"], [["21"]], "Der Innenhof darf ... bis 21 Uhr genutzt werden.", "Leonie's message follows the courtyard closing time.")
      ]
    }),
    reading({
      id: "a2-language-cafe", level: "A2", mode: "extensive", title: "Ein Tisch für das Sprachcafé", genre: "Community newsletter story", domain: "Community and volunteering", region: "Germany", intro: "A conversation group grows from one borrowed table into a neighborhood project.",
      glossary: [["ehrenamtlich", "voluntary"], ["die Begegnung", "encounter"], ["sich trauen", "dare or feel confident"], ["inzwischen", "by now"], ["die Unterstützung", "support"]],
      sections: [
        "Vor einem Jahr suchte die Bibliothekarin Julia Weber nach einer einfachen Möglichkeit, neue und langjährige Bewohnerinnen und Bewohner miteinander ins Gespräch zu bringen. In der Bibliothek fanden bereits Deutschkurse statt. Viele Teilnehmende sagten jedoch, dass sie außerhalb des Unterrichts nur selten Deutsch sprachen.",
        "Julia stellte jeden Donnerstag einen großen Tisch neben das Bibliothekscafé. Auf einem Schild stand: 'Sprachcafé, alle Sprachen willkommen.' Beim ersten Treffen kamen vier Personen. Sie tranken Tee, stellten sich vor und sammelten Themen für die nächste Woche. Niemand musste eine Übung machen oder eine Prüfung bestehen.",
        "Inzwischen nehmen regelmäßig mehr als zwanzig Menschen teil. Einige lernen Deutsch, andere möchten Arabisch, Ukrainisch oder Spanisch üben. Ehrenamtliche bringen manchmal Spiele oder kurze Zeitungsartikel mit. Wer noch wenig spricht, kann zuerst zuhören oder mit Bildkarten arbeiten.",
        "Besonders wichtig ist der Gruppe, dass Fehler freundlich verbessert werden. 'Im Kurs wusste ich oft die richtige Antwort, aber im Café habe ich gelernt, spontan zu reagieren', erzählt Mariam. Der Rentner Klaus kommt seit sechs Monaten. Er hilft bei deutschen Formularen und lernt gleichzeitig einige türkische Redewendungen.",
        "Seit diesem Frühjahr unterstützt ein Geschäft aus der Nachbarschaft das Projekt mit Kaffee und Obst. Die Bibliothek hat außerdem einen zweiten Tisch gekauft. Julia sucht nun zwei weitere Personen, die einmal im Monat beim Aufbau helfen."
      ],
      culture: "Sprachcafés are informal conversation meetings organized by libraries, associations, schools, or volunteers. Participation is often free.",
      questions: [
        choice("purpose", "Why did Julia start the language café?", ["Learners had few chances to speak outside class", "The library needed to sell more coffee", "She wanted to replace the German courses"], "Learners had few chances to speak outside class", "außerhalb des Unterrichts nur selten Deutsch sprachen", "The project adds informal conversation to existing classes."),
        choice("development", "What clearly changed after the first meeting?", ["Attendance grew from four people to more than twenty", "Participants began taking weekly exams", "The library stopped using volunteers"], "Attendance grew from four people to more than twenty", "Beim ersten Treffen kamen vier Personen. / Inzwischen nehmen regelmäßig mehr als zwanzig Menschen teil.", "The text gives a direct before-and-after attendance comparison."),
        choice("attitude", "What does Mariam value about the café?", ["It helps her react spontaneously", "It gives her official certificates", "It teaches only written grammar"], "It helps her react spontaneously", "im Café habe ich gelernt, spontan zu reagieren", "Her quotation contrasts known answers with spontaneous use."),
        text("detail", "What kind of help does the project currently need? Answer in German.", ["Hilfe beim Aufbau", "zwei Personen für den Aufbau", "Personen, die beim Aufbau helfen"], [["aufbau"]], "zwei weitere Personen, die einmal im Monat beim Aufbau helfen", "The last sentence describes the open volunteer role.")
      ]
    }),
    reading({
      id: "b1-career-change", level: "B1", mode: "guided", title: "Quereinstieg in den Kundenservice", genre: "Job listing and application", domain: "Work", region: "Germany", intro: "Compare a job advertisement with an applicant's email and evaluate the fit.",
      glossary: [["der Quereinstieg", "career change into a new field"], ["zuverlässig", "reliable"], ["die Einarbeitung", "onboarding"], ["die Voraussetzung", "requirement"], ["Schichtdienst", "shift work"]],
      sections: [
        "STELLENANGEBOT: Die Stadtwerke Neustadt suchen zum 1. November eine Mitarbeiterin oder einen Mitarbeiter im Kundenservice (32 bis 38 Stunden pro Woche). Sie beantworten telefonisch und per E-Mail Fragen zu Rechnungen, Umzügen und Verträgen. Außerdem dokumentieren Sie jedes Gespräch im Kundensystem.",
        "Wir erwarten sehr gute Deutschkenntnisse, einen sicheren Umgang mit dem Computer und die Bereitschaft, zweimal pro Monat bis 20 Uhr zu arbeiten. Erfahrung im Kundenservice ist hilfreich. Bewerbungen aus anderen Berufsfeldern sind ausdrücklich willkommen. Eine vierwöchige Einarbeitung und regelmäßige Schulungen gehören zur Stelle. Die Bezahlung richtet sich nach dem Tarifvertrag des öffentlichen Dienstes.",
        "BEWERBUNGSMAIL VON AMINA SALEH",
        "Sehr geehrte Frau König, seit fünf Jahren arbeite ich als Verkäuferin in einem Baumarkt. Dort berate ich täglich Kundinnen und Kunden, erkläre Produkte und löse Reklamationen. Da unsere Filiale im Dezember schließt, suche ich eine neue berufliche Aufgabe.",
        "Die ausgeschriebene Stelle interessiert mich, weil ich meine Beratungserfahrung gern in einem neuen Bereich einsetzen möchte. Mit E-Mail, Tabellen und unserem Kassensystem arbeite ich sicher. Seit meinem B2-Kurs telefoniere ich auch auf Deutsch deutlich selbstbewusster. An zwei Abenden pro Monat kann ich bis 20 Uhr arbeiten.",
        "Mit Energieverträgen habe ich bisher keine Erfahrung. Ich lerne jedoch schnell und finde die angebotene Einarbeitung besonders interessant. Wegen einer bereits gebuchten Reise könnte ich erst am 15. November beginnen. Über die Einladung zu einem Gespräch würde ich mich sehr freuen. Mit freundlichen Grüßen, Amina Saleh"
      ],
      culture: "Quereinstieg describes moving into a field without the usual occupational background. Employers may value transferable experience and provide additional training.",
      questions: [
        choice("matching", "Which required skill does Amina support with the clearest evidence?", ["Customer communication", "Knowledge of energy contracts", "Public-sector accounting"], "Customer communication", "berate ich täglich ... erkläre Produkte und löse Reklamationen", "Her current work supplies several examples of customer contact."),
        choice("gap", "Which advertised condition creates a concrete problem?", ["The requested start date", "Computer use", "Evening work"], "The requested start date", "zum 1. November / erst am 15. November beginnen", "She can meet the evening schedule but would start two weeks late."),
        choice("inference", "Why does the onboarding appeal to Amina?", ["She lacks experience with energy contracts", "She wants fewer working hours", "She has never used email"], "She lacks experience with energy contracts", "Mit Energieverträgen habe ich bisher keine Erfahrung ... Einarbeitung", "The training would close her industry-knowledge gap."),
        text("synthesis", "Name one customer-facing experience and one technical experience Amina could transfer. Answer in German.", ["Kundenberatung und Computerkenntnisse", "Kundenkontakt und E-Mail", "Reklamationen und Kassensystem", "Beratung und Tabellenkenntnisse"], [["berat", "kunden", "reklamation"], ["computer", "email", "kassensystem", "tabelle"]], "berate ... Kundinnen und Kunden ... löse Reklamationen ... E-Mail, Tabellen und Kassensystem", "The email supplies both customer communication and technical experience.")
      ]
    }),
    reading({
      id: "b1-courtyard", level: "B1", mode: "transfer", title: "Wem gehört der Innenhof?", genre: "Resident forum", domain: "Housing and conflict", region: "Germany", intro: "Residents disagree about a shared courtyard. Identify each concern and the compromise that could work.",
      glossary: [["die Nutzung", "use"], ["der Rückzugsort", "quiet retreat"], ["die Mehrheit", "majority"], ["beeinträchtigen", "negatively affect"], ["der Kompromiss", "compromise"]],
      sections: [
        "HAUSFORUM, THEMA: NEUE REGELN FÜR DEN INNENHOF",
        "Nora, Wohnung 3: Seit im Hof zwei große Tische stehen, treffen sich dort fast jeden Abend Gruppen. Ich freue mich über die freundliche Stimmung. Nach 21 Uhr wird es jedoch oft laut, und mein Schlafzimmer liegt direkt zum Hof. Ich wünsche mir eine klare Schlusszeit, die auch am Wochenende gilt.",
        "Viktor, Wohnung 11: Für Familien ist der Hof der einzige sichere Ort, an dem kleinere Kinder draußen spielen können. Eine allgemeine Ruhezeit ab 19 Uhr wäre im Sommer viel zu früh. Sinnvoller fände ich getrennte Bereiche: eine Spielecke und einen ruhigeren Bereich mit Pflanzen.",
        "Mei, Wohnung 8: Ich arbeite im Schichtdienst und schlafe manchmal am Nachmittag. Kinderlärm gehört zum Wohnen, dauerhafte Musik aus Lautsprechern empfinde ich anders. Vielleicht könnten wir Musik nur bei angekündigten Feiern erlauben und bei spontanen Treffen ganz auf Musik verzichten.",
        "Sascha, Wohnung 15: Der Hof darf kein zweites Wohnzimmer einzelner Gruppen werden. In den letzten Wochen waren die Tische häufig stundenlang belegt. Wir brauchen eine Möglichkeit, einen Tisch für ein gemeinsames Essen zu reservieren. Gleichzeitig sollte mindestens ein Tisch immer frei bleiben.",
        "HAUSVERWALTUNG: Vielen Dank für die Beiträge. Wir schlagen eine Testphase von sechs Wochen vor. Spielen ist bis 20 Uhr möglich. Gespräche dürfen bis 22 Uhr stattfinden, ab 21 Uhr mit besonderer Rücksicht. Musik über Lautsprecher ist nur bei angemeldeten Feiern erlaubt. Einer der beiden Tische kann höchstens zwei Stunden reserviert werden. Danach befragen wir alle Haushalte."
      ],
      culture: "Shared courtyards can serve as play areas, gardens, bicycle storage, and meeting places. Building rules often balance access with quiet hours.",
      questions: [
        choice("viewpoint", "Whose main concern is fair access to the tables?", ["Sascha's", "Nora's", "Mei's"], "Sascha's", "mindestens ein Tisch immer frei bleiben", "Sascha focuses on long occupation and reservations."),
        choice("distinction", "What distinction does Mei make?", ["Children playing and amplified music affect her differently", "Weekdays and weekends should have identical schedules", "Reserved tables are quieter than free tables"], "Children playing and amplified music affect her differently", "Kinderlärm ... dauerhafte Musik aus Lautsprechern empfinde ich anders", "She accepts ordinary living noise more readily than continuous amplified music."),
        choice("compromise", "Which proposal directly answers Viktor's concern?", ["Playing is possible until 20:00", "One table may be reserved for two hours", "Residents will be surveyed later"], "Playing is possible until 20:00", "Spielen ist bis 20 Uhr möglich.", "Viktor rejects a very early universal quiet period because children need the courtyard."),
        text("procedure", "How long will the trial period last? Answer in German.", ["sechs Wochen", "6 Wochen"], [["sechs", "6"], ["woche"]], "eine Testphase von sechs Wochen", "The property management proposes a six-week trial.")
      ]
    }),
    reading({
      id: "b1-push-messages", level: "B1", mode: "informational", title: "48 Stunden ohne Push-Nachrichten", genre: "Magazine feature", domain: "Digital life", region: "Switzerland", intro: "A small workplace experiment examines attention, availability, and habit.",
      glossary: [["die Benachrichtigung", "notification"], ["die Unterbrechung", "interruption"], ["wahrnehmen", "notice or perceive"], ["erreichbar", "reachable"], ["die Auswertung", "evaluation"]],
      sections: [
        "In einem Zürcher Designbüro schalteten zwölf Beschäftigte für zwei Arbeitstage fast alle Push-Nachrichten auf ihren Telefonen und Computern aus. Anrufe blieben möglich, und wichtige Kundinnen und Kunden erhielten eine Notfallnummer. Das Experiment sollte zeigen, wie häufig kleine digitale Unterbrechungen die Arbeit beeinflussen.",
        "Vor dem Start glaubten mehrere Teilnehmende, dass sie ohne sofort sichtbare Nachrichten wichtige Informationen verpassen würden. Tatsächlich kontrollierten viele ihre Programme weiterhin regelmäßig. Sie entschieden jedoch selbst, wann sie E-Mails und Chats öffneten. Nach eigener Einschätzung konnten neun Personen längere Zeit konzentriert an einer Aufgabe arbeiten.",
        "Die Projektleiterin bemerkte zugleich ein neues Problem: Zwei dringende Rückfragen blieben fast eine Stunde unbeantwortet. Im normalen Betrieb wäre die Reaktion vermutlich schneller gewesen. Deshalb führte das Team feste Kontrollzeiten ein. Um 10 Uhr, 13 Uhr und 16 Uhr prüften alle gemeinsam, ob eine Anfrage sofort bearbeitet werden musste.",
        "Eine interne Auswertung nach den zwei Tagen zeigte keine messbare Veränderung der erledigten Aufgaben. Die Beschäftigten berichteten jedoch von weniger Stress. Vier Personen fanden die stillen Arbeitsphasen ungewohnt und öffneten ihre Nachrichten aus Gewohnheit sehr häufig. Das Büro plant nun einen längeren Versuch, bevor es allgemeine Regeln beschließt.",
        "Medienpsychologin Carla Meier warnt vor schnellen Schlussfolgerungen. Ein kleines Experiment ohne Vergleichsgruppe könne keine allgemeine Wirkung beweisen. Es liefere jedoch nützliche Fragen: Welche Nachrichten sind wirklich dringend? Welche Reaktionszeit erwarten Kundinnen, Kollegen und Vorgesetzte? Und wann braucht konzentrierte Arbeit Schutz?"
      ],
      culture: "Workplaces in German-speaking countries differ widely in their expectations about after-hours availability and messaging. Clear team agreements matter more than a single universal rule.",
      questions: [
        choice("claim", "What did the internal evaluation find?", ["No clear change in completed tasks and reported lower stress", "A large increase in completed tasks", "A decline in customer satisfaction"], "No clear change in completed tasks and reported lower stress", "keine messbare Veränderung ... berichteten jedoch von weniger Stress", "The text separates task output from self-reported stress."),
        choice("response", "How did the team address urgent unanswered questions?", ["It introduced three fixed checking times", "It turned every notification back on", "It stopped answering customers by email"], "It introduced three fixed checking times", "Um 10 Uhr, 13 Uhr und 16 Uhr prüften alle gemeinsam", "The schedule became the practical adjustment."),
        choice("source judgment", "Why does Carla Meier remain cautious?", ["The experiment was small and lacked a comparison group", "The participants were all customers", "No one completed the experiment"], "The experiment was small and lacked a comparison group", "Ein kleines Experiment ohne Vergleichsgruppe", "She questions how broadly the result can be applied."),
        text("synthesis", "Name one benefit and one risk mentioned in the text. Answer in German.", ["mehr Konzentration und langsamere Reaktionen", "weniger Stress und dringende Fragen bleiben unbeantwortet", "konzentriertes Arbeiten und verpasste Nachrichten"], [["konzentr", "stress"], ["langsam", "unbeantwort", "verpass", "dring"]], "längere Zeit konzentriert ... weniger Stress / dringende Rückfragen ... unbeantwortet", "A sound summary includes one positive effect and one operational problem.")
      ]
    }),
    reading({
      id: "b1-lost-key", level: "B1", mode: "extensive", title: "Als der Schlüssel verschwunden war", genre: "Contemporary short story", domain: "Daily life", region: "Germany", intro: "A missing key changes an ordinary evening and reveals how well two neighbors know each other.",
      glossary: [["der Ersatzschlüssel", "spare key"], ["durchsuchen", "search thoroughly"], ["sich erinnern", "remember"], ["der Hausmeister", "caretaker"], ["erleichtert", "relieved"]],
      sections: [
        "Als Jana am Dienstagabend vor ihrer Wohnungstür stand, griff sie wie immer in die kleine Seitentasche ihres Rucksacks. Die Tasche war leer. Sie suchte zuerst ruhig, dann immer schneller. Geldbörse, Kopfhörer, Notizbuch, eine Banane und drei Stifte lagen bald auf dem Boden des Flurs. Der Schlüssel blieb verschwunden.",
        "Jana erinnerte sich an den Morgen. Bevor sie das Haus verlassen hatte, hatte sie den Müll hinuntergebracht. Danach war sie mit dem Fahrrad zur Arbeit gefahren. In der Mittagspause hatte sie in einem Café bezahlt, und nach der Arbeit hatte sie im Supermarkt eingekauft. An all diesen Orten konnte der Schlüssel liegen.",
        "Ihr Vermieter wohnte in einer anderen Stadt. Einen Ersatzschlüssel hatte Jana ihrer Nachbarin Frau Becker gegeben, als sie im Sommer verreist war. Doch Frau Becker war seit einer Woche bei ihrer Tochter in Hamburg. Jana setzte sich auf die Treppe und rief zuerst im Café an. Dort hatte niemand einen Schlüssel gefunden. Auch der Supermarkt konnte ihr nicht helfen.",
        "In diesem Moment kam Emre aus dem dritten Stock. Er sah die Gegenstände im Flur und fragte, ob Jana umziehen wolle. Jana musste trotz ihrer Sorge lachen. Gemeinsam gingen sie zum Fahrradständer. Vielleicht war der Schlüssel aus der Jackentasche gefallen, als Jana das Schloss geöffnet hatte. Sie leuchteten mit ihren Telefonen unter Fahrräder und in ein Beet. Nichts.",
        "Emre kannte die Nummer des Hausmeisters. Der Hausmeister war noch im Gebäude nebenan, hatte jedoch keinen Schlüssel zu Janas Wohnung. Er bot an, einen Schlüsseldienst zu empfehlen. Der Anruf würde am Abend mindestens 140 Euro kosten.",
        "Jana wollte gerade zustimmen, als Emre noch einmal fragte: 'Du hast heute Morgen den Müll weggebracht. Hast du danach die Jacke gewechselt?' Jana sah ihn an. Für das Fahrrad hatte sie eine Regenjacke angezogen, weil dunkle Wolken am Himmel standen. Später war das Wetter trocken geblieben, und sie hatte die Jacke im Büro gelassen.",
        "Eine Kollegin war noch bei der Arbeit und fand den Schlüssel in der linken Jackentasche. Jana konnte ihn am Empfang abholen. Emre lieh ihr sein Fahrradlicht, und zwanzig Minuten später war sie wieder zu Hause. Am nächsten Tag gab Jana Emre einen neuen Ersatzschlüssel. Frau Becker behielt ihren ebenfalls."
      ],
      culture: "A Schlüsseldienst can be expensive outside normal hours. People often leave a spare key with a trusted neighbor or friend.",
      questions: [
        choice("chronology", "Where had Jana left the key?", ["In a rain jacket at work", "At the café", "Beside the bicycle rack"], "In a rain jacket at work", "die Jacke im Büro gelassen / Schlüssel in der linken Jackentasche", "The remembered jacket change resolves the mystery."),
        choice("inference", "Why does Jana laugh when Emre arrives?", ["He mistakes the objects in the hall for moving preparations", "He has already found the key", "The caretaker tells a joke"], "He mistakes the objects in the hall for moving preparations", "Er ... fragte, ob Jana umziehen wolle.", "Her emptied backpack makes the corridor look like a move."),
        choice("motive", "Why does Jana give Emre a spare key the next day?", ["She now trusts him and wants another nearby backup", "He bought her a new lock", "Mrs. Becker asks him to move"], "She now trusts him and wants another nearby backup", "Am nächsten Tag gab Jana Emre einen neuen Ersatzschlüssel.", "His practical help strengthens their trust."),
        text("sequence", "What clue led them to the solution? Answer in German.", ["der Wechsel der Jacke", "die Regenjacke im Büro", "Jana hatte die Jacke gewechselt", "sie hatte ihre Regenjacke im Büro gelassen"], [["jacke", "regenjacke"], ["wechsel", "büro", "buero"]], "Hast du danach die Jacke gewechselt?", "Emre's question connects the morning routine with the jacket left at work.")
      ]
    }),
    reading({
      id: "b1-bike-lane", level: "B1", mode: "checkpoint", title: "Der neue Radweg: drei Stimmen", genre: "Local report and comments", domain: "Community decisions", region: "Germany", intro: "A planned bicycle lane receives support and criticism. Separate reported facts from viewpoints.",
      glossary: [["die Fahrspur", "traffic lane"], ["die Sicherheit", "safety"], ["der Einzelhandel", "retail trade"], ["befürchten", "fear or be concerned"], ["die Auslastung", "level of use"]],
      sections: [
        "Die Stadt Falkenau plant einen geschützten Radweg entlang der Lindenstraße. Dafür soll eine der bisher vier Autospuren entfallen. Nach Angaben der Stadt wurden auf der 1,8 Kilometer langen Strecke in den vergangenen drei Jahren 27 Unfälle mit Fahrradbeteiligung registriert. Der Baubeginn ist für April vorgesehen. Nach einem Jahr will die Stadt Verkehr, Unfälle und Umsätze der Geschäfte auswerten.",
        "STIMME 1, ADFC-ORTSGRUPPE: 'Viele Menschen fahren dort nur deshalb nicht mit dem Rad, weil sie sich zwischen Bussen und Autos unsicher fühlen. Eine geschützte Spur kann diese Lücke im Radnetz schließen. Andere Städte zeigen, dass gute Radwege auch Kundschaft zu Geschäften bringen können.'",
        "STIMME 2, INTERESSENGEMEINSCHAFT LINDENSTRASSE: 'Wir unterstützen sichere Wege, aber die vorgesehene Lösung streicht 34 Parkplätze. Einige unserer Kundinnen und Kunden transportieren schwere Waren. Die Stadt hat bisher nicht erklärt, wo kurze Lieferungen stattfinden sollen. Vor dem Bau brauchen wir ein verbindliches Lieferkonzept.'",
        "STIMME 3, BUSFAHRERIN NADINE KROLL: 'Die rechte Fahrspur ist morgens häufig durch Lieferwagen blockiert. Dann müssen Busse ausscheren und verlieren Zeit. Eine klare Ladezone könnte die Situation verbessern. Wenn jedoch nur eine Autospur bleibt und falsch geparkte Fahrzeuge sie blockieren, entsteht sofort ein langer Stau.'",
        "Die Verwaltung schlägt inzwischen drei Ladezonen in Seitenstraßen vor. Außerdem sollen sechs der ursprünglich geplanten Fahrradständer verschoben werden, damit Lieferfahrzeuge leichter abbiegen können. Über diese Änderungen berät der Verkehrsausschuss am kommenden Donnerstag."
      ],
      culture: "Local transport projects commonly involve public consultations, council committees, trade groups, and cycling or pedestrian organizations.",
      questions: [
        choice("fact-opinion", "Which statement is presented as a recorded fact?", ["There were 27 bicycle-related accidents in three years", "The cycle lane will certainly increase retail sales", "Every customer needs a parking space"], "There were 27 bicycle-related accidents in three years", "wurden ... 27 Unfälle ... registriert", "The report attributes this number to city records."),
        choice("viewpoint", "What does the business group request before construction?", ["A binding delivery plan", "Six more bicycle stands", "A ban on buses"], "A binding delivery plan", "Vor dem Bau brauchen wir ein verbindliches Lieferkonzept.", "Its objection centers on deliveries and removed parking."),
        choice("agreement", "Which measure could address both the business group's and the bus driver's concerns?", ["Clearly located loading zones", "Removing every traffic lane", "Delaying the accident review"], "Clearly located loading zones", "klare Ladezone / drei Ladezonen", "Both sources discuss delivery vehicles and blocked lanes."),
        text("evaluation", "Which three areas will the city evaluate after one year? Answer in German.", ["Verkehr, Unfälle und Umsätze", "den Verkehr, die Unfälle und die Umsätze der Geschäfte"], [["verkehr"], ["unfall", "unfälle", "unfaelle"], ["umsatz", "umsätze", "umsaetze"]], "Verkehr, Unfälle und Umsätze der Geschäfte auswerten", "The planned evaluation covers mobility, safety, and business activity.")
      ]
    }),
    reading({
      id: "b2-four-day-week", level: "B2", mode: "guided", title: "Vier Tage Arbeit, gleich viel Leistung?", genre: "Memo, staff forum, and research summary", domain: "Work", region: "Germany", intro: "A company considers a four-day week. Compare the proposed model, employee concerns, and the limits of the evidence.",
      glossary: [["die Arbeitsverdichtung", "work intensification"], ["die Erreichbarkeit", "availability"], ["die Zielvorgabe", "target requirement"], ["aussagekräftig", "meaningful or conclusive"], ["die Fluktuation", "staff turnover"]],
      sections: [
        "INTERNES MEMO DER GESCHÄFTSFÜHRUNG",
        "Die Agentur Nordlicht prüft von Januar bis Juni ein neues Arbeitszeitmodell. Die vertragliche Wochenarbeitszeit sinkt bei gleichem Gehalt von 38 auf 34 Stunden. Vollzeitbeschäftigte verteilen diese Zeit auf vier Tage. Jedes Team teilt seine Beschäftigten zwischen Montag und Freitag als freien Tag auf. Damit Kunden an allen Werktagen erreichbar bleiben, darf höchstens die Hälfte eines Teams gleichzeitig frei haben.",
        "Die Geschäftsführung verbindet den Versuch mit drei Bedingungen. Erstens sollen vereinbarte Projekttermine weiterhin eingehalten werden. Zweitens darf die durchschnittliche Kundenzufriedenheit nicht unter den Wert des Vorjahres fallen. Drittens sollen Beschäftigte während ihres freien Tages nur in vorher definierten Notfällen kontaktiert werden. Nach drei und sechs Monaten werden Arbeitszeit, Krankheitstage, Kündigungen und Projektqualität ausgewertet.",
        "BEITRÄGE AUS DEM INTERNEN FORUM",
        "Mara, Projektmanagement: 'Die Verkürzung klingt attraktiv. Unsere Abläufe enthalten allerdings viele Besprechungen, die kaum vorbereitet sind. Wenn wir lediglich dieselbe Zahl an Terminen in vier Tage drücken, entsteht Arbeitsverdichtung. Vor dem Start sollten wir daher entscheiden, welche Besprechungen entfallen können.'",
        "Jonas, Kundenbetreuung: 'Unsere Kundinnen erwarten auch freitags schnelle Antworten. Ein geteiltes Modell kann funktionieren, wenn Informationen sauber dokumentiert werden. Schwieriger wird es bei persönlichen Zuständigkeiten. Manche Kunden möchten ausschließlich mit einer bestimmten Person sprechen. Dafür brauchen wir eine klare Vertretungsregel.'",
        "Nele, Design: 'Ich würde den freien Tag für Weiterbildung und Familie nutzen. Mich interessiert jedoch, wie Überstunden behandelt werden. Wenn wir am freien Tag regelmäßig Aufgaben nachholen, bleibt nur eine verkürzte Anwesenheit auf dem Papier.'",
        "ZUSAMMENFASSUNG EINER HOCHSCHULSTUDIE",
        "Eine begleitete Untersuchung von 41 kleineren Unternehmen meldete nach sechs Monaten eine geringere selbstberichtete Erschöpfung und eine leicht niedrigere Zahl von Krankheitstagen. Der Umsatz blieb im Durchschnitt stabil. Die beteiligten Unternehmen hatten sich freiwillig beworben und ihre Arbeitsabläufe vor Beginn des Versuchs angepasst. Die Forschenden weisen darauf hin, dass diese Auswahl einen Vergleich mit allen Betrieben erschwert. Außerdem unterschieden sich die getesteten Modelle: Einige Unternehmen reduzierten Stunden, andere verteilten dieselbe Arbeitszeit auf vier längere Tage.",
        "Für Nordlicht liefert die Studie deshalb Anhaltspunkte, aber keine sichere Prognose. Die interne Auswertung muss klären, ob die verkürzte Arbeitszeit zu den Kundenanforderungen und Arbeitsabläufen der Agentur passt."
      ],
      culture: "Four-day-week trials in German-speaking workplaces use different definitions. Some reduce weekly hours, while others compress the existing hours into fewer days.",
      questions: [
        choice("model", "Which model will Nordlicht test?", ["34 hours across four days with unchanged pay", "38 hours across four longer days with lower pay", "A six-day rotating schedule"], "34 hours across four days with unchanged pay", "sinkt bei gleichem Gehalt von 38 auf 34 Stunden ... auf vier Tage", "The memo defines both the reduction and the distribution."),
        choice("argument", "What risk do Mara and Nele both identify from different angles?", ["The reduced schedule may conceal intensified or displaced work", "Customers may stop using email", "Training opportunities may become mandatory"], "The reduced schedule may conceal intensified or displaced work", "Arbeitsverdichtung / Aufgaben nachholen", "Mara worries about compressed meetings, while Nele worries about work spilling into the free day."),
        choice("evidence", "Why can the study not provide a secure forecast for every company?", ["Participants volunteered and tested different models", "It measured only company revenue", "All participating companies were public agencies"], "Participants volunteered and tested different models", "freiwillig beworben ... Modelle unterschieden sich", "Selection and model variation limit generalization."),
        choice("procedure", "What operational issue is Jonas most concerned about?", ["Continuity when a specific employee is absent", "The price of office space", "The length of design training"], "Continuity when a specific employee is absent", "persönlichen Zuständigkeiten ... klare Vertretungsregel", "He focuses on customer relationships tied to one employee."),
        text("synthesis", "Name all four categories in Nordlicht's internal evaluation. Answer in German.", ["Arbeitszeit, Krankheitstage, Kündigungen und Projektqualität", "Arbeitszeit, Krankheitstage, Kuendigungen und Projektqualitaet"], [["arbeitszeit"], ["krankheit"], ["kündigung", "kuendigung"], ["projektqualität", "projektqualitaet"]], "Arbeitszeit, Krankheitstage, Kündigungen und Projektqualität", "The memo names four categories for the checks after three and six months.")
      ]
    }),
    reading({
      id: "b2-application-software", level: "B2", mode: "transfer", title: "Wenn Software Bewerbungen vorsortiert", genre: "Long-form feature", domain: "Technology and work", region: "Germany", intro: "A recruitment tool promises consistency and speed. Examine how its use changes decisions, responsibility, and the applicant experience.",
      glossary: [["vorsortieren", "pre-sort"], ["die Nachvollziehbarkeit", "traceability"], ["verzerren", "distort or bias"], ["die Eignung", "suitability"], ["die Rechenschaft", "accountability"]],
      sections: [
        "Als ein mittelständischer Maschinenbauer im vergangenen Jahr mehr als 8.000 Bewerbungen erhielt, führte die Personalabteilung eine Software zur ersten Sortierung ein. Das System liest Lebensläufe, ordnet Qualifikationen vorgegebenen Kategorien zu und markiert Unterlagen, in denen bestimmte Anforderungen fehlen. Eine endgültige Absage darf es laut Unternehmensrichtlinie nicht verschicken. Diese Entscheidung trifft weiterhin ein Mensch.",
        "Personalchefin Lea Hartmann beschreibt das Werkzeug als Suchhilfe. Früher habe ihr Team viele Stunden damit verbracht, Dateiformate zu öffnen und Angaben manuell in Tabellen zu übertragen. Nun könnten Mitarbeitende mehr Zeit für Gespräche verwenden. Hartmann betont, dass jede automatisch zurückgestellte Bewerbung von einer zweiten Person geprüft werde. Welche Merkmale das System wie stark gewichtet, veröffentlicht das Unternehmen jedoch nicht vollständig, weil der Anbieter diese Angaben als Geschäftsgeheimnis behandelt.",
        "Genau darin sieht Arbeitsrechtler Deniz Aksoy ein Problem. Bewerbende erfahren zwar, dass Software beteiligt ist, können eine überraschende Entscheidung aber kaum nachvollziehen. Ein System könne außerdem frühere Auswahlmuster übernehmen. Wenn in historischen Daten bestimmte Ausbildungswege oder unterbrochene Erwerbsbiografien seltener zum Erfolg geführt hätten, könne daraus eine scheinbar neutrale Regel entstehen. Die technische Gleichbehandlung jedes Datensatzes garantiere daher noch keine faire Wirkung.",
        "Der Anbieter verweist auf regelmäßige Prüfungen. Testgruppen mit vergleichbaren Qualifikationen würden gegenübergestellt, um auffällige Unterschiede zu erkennen. Namen, Fotos, Alter und Geschlecht könnten vor der Analyse ausgeblendet werden. Kritikerinnen halten dem entgegen, dass andere Angaben indirekte Hinweise liefern. Postleitzahlen, Vereinsnamen, Zeiträume oder Formulierungen könnten mit sozialer Herkunft, Alter oder Betreuungspflichten zusammenhängen.",
        "Auch Bewerbende berichten von gemischten Erfahrungen. Einige schätzen eine schnelle Eingangsbestätigung und klare Statusmeldungen. Andere versuchen, ihre Lebensläufe mit möglichst vielen Begriffen aus der Stellenanzeige zu versehen. Dadurch entstehen Texte, die für eine Maschine leicht zuzuordnen sind, für Menschen jedoch unnatürlich wirken. Beratungsstellen empfehlen, zentrale Fachbegriffe präzise zu verwenden und gleichzeitig konkrete Erfahrungen zu beschreiben.",
        "Im Betriebsrat des Maschinenbauers wird inzwischen über weitere Regeln verhandelt. Diskutiert werden ein verständlicher Hinweis auf die Kriterien, ein unkompliziertes Verfahren für eine menschliche Neubewertung und regelmäßige Berichte über auffällige Gruppenunterschiede. Eine Sprecherin fasst das Ziel so zusammen: Die Software könne Routinearbeit unterstützen. Verantwortung für Auswahl und Begründung müsse beim Unternehmen bleiben."
      ],
      culture: "Works councils, called Betriebsräte, can participate in decisions about workplace technology in many German companies. Their exact rights depend on the situation and applicable law.",
      questions: [
        choice("scope", "What is the software currently allowed to do?", ["Flag and sort applications for human review", "Send final rejections without review", "Conduct binding employment interviews"], "Flag and sort applications for human review", "Eine endgültige Absage darf es ... nicht verschicken.", "Its role is limited to preliminary organization and marking."),
        choice("argument", "Why does Aksoy reject the idea that identical technical treatment guarantees fairness?", ["Historical patterns can produce biased rules", "The program cannot open digital files", "Applicants always omit qualifications"], "Historical patterns can produce biased rules", "frühere Auswahlmuster übernehmen ... scheinbar neutrale Regel", "Past decisions can shape criteria that reproduce unequal effects."),
        choice("counterargument", "How does the provider respond to bias concerns?", ["It compares test groups and can hide direct identity fields", "It publishes every weighting rule", "It refuses to use historical data"], "It compares test groups and can hide direct identity fields", "Testgruppen ... gegenübergestellt / Namen, Fotos, Alter und Geschlecht ... ausgeblendet", "The response combines testing with removal of selected fields."),
        choice("effect", "What unintended behavior appears among some applicants?", ["They overload applications with advertisement keywords", "They submit only handwritten letters", "They avoid naming concrete experience"], "They overload applications with advertisement keywords", "mit möglichst vielen Begriffen aus der Stellenanzeige", "They adapt their writing to the expected machine analysis."),
        text("synthesis", "Name two safeguards being discussed by the works council. Answer in German.", ["verständliche Kriterien und menschliche Neubewertung", "menschliche Neubewertung und Berichte über Gruppenunterschiede", "Hinweis auf die Kriterien und regelmäßige Berichte"], [["kriter", "hinweis", "verständlich", "verstaendlich"], ["bericht", "gruppen", "neubewertung"]], "verständlicher Hinweis ... menschliche Neubewertung ... regelmäßige Berichte", "The final paragraph lists three proposed safeguards.")
      ]
    }),
    reading({
      id: "b2-water-damage", level: "B2", mode: "checkpoint", title: "Wasserschaden in der WG", genre: "Contract, inspection record, and email chain", domain: "Housing and formal correspondence", region: "Germany", intro: "A leak damages a shared apartment. Reconcile the lease clause, the documented timeline, and the parties' claims.",
      glossary: [["der Mangel", "defect"], ["unverzüglich", "without undue delay"], ["die Instandsetzung", "repair"], ["die Obliegenheit", "contractual duty"], ["eindringen", "enter or penetrate"]],
      sections: [
        "MIETVERTRAG, PARAGRAF 12, MÄNGEL UND SCHÄDEN",
        "Erkennbare Schäden an Leitungen, Fenstern oder Heizkörpern sind der Vermieterseite unverzüglich zu melden. Bei akuter Gefahr, insbesondere bei austretendem Wasser, sollen Mietparteien zusätzlich die im Hausflur genannte Notfallnummer anrufen und zumutbare Maßnahmen zur Begrenzung des Schadens ergreifen. Eigenständige Reparaturen, die über eine vorläufige Sicherung hinausgehen, bedürfen der Zustimmung. Die Kostenverteilung richtet sich nach Ursache, Verantwortungsbereich und den gesetzlichen Bestimmungen.",
        "PROTOKOLL DES SANITÄRBETRIEBS, MONTAG",
        "08:20 Uhr: Auftrag durch Hausverwaltung erhalten. 09:05 Uhr: Wohnung betreten. In der Küche Wasser unter der Spüle und Feuchtigkeit an der Wand zum Flur festgestellt. Eckventil geschlossen. Ursache: gerissener flexibler Anschlussschlauch. Der Riss war von außen kaum sichtbar. Nach Aussage der Bewohnerin lief am Sonntag gegen 22 Uhr erstmals eine kleine Menge Wasser aus. Am Montag gegen 06:30 Uhr war eine größere Pfütze vorhanden. Schlauch ersetzt, Trocknungsgerät empfohlen.",
        "E-MAIL VON LINA AN DIE HAUSVERWALTUNG, SONNTAG 22:14 UHR",
        "Guten Abend, unter unserer Küchenspüle ist etwas Wasser. Ich habe einen Eimer daruntergestellt und alle sichtbaren Anschlüsse geprüft. Da im Moment kein weiteres Wasser nachläuft, melde ich es zunächst per E-Mail. Bitte teilen Sie mir morgen mit, wann jemand kommen kann. Freundliche Grüße, Lina Hoffmann",
        "E-MAIL VON OMAR AN DIE HAUSVERWALTUNG, MONTAG 06:42 UHR",
        "Guten Morgen, der Küchenboden ist jetzt nass, und Wasser läuft in Richtung Flur. Ich habe die Notfallnummer zweimal angerufen, aber niemanden erreicht. Danach habe ich den Hauptwasserhahn der Wohnung geschlossen. Fotos sind beigefügt. Bitte bestätigen Sie dringend den Eingang. Freundliche Grüße, Omar Aziz",
        "ANTWORT DER HAUSVERWALTUNG, MONTAG 07:18 UHR",
        "Vielen Dank. Der Sanitärbetrieb ist beauftragt. Nach unserer ersten Prüfung hätte bereits am Sonntag die Notfallnummer gewählt werden sollen. Wir behalten uns deshalb vor, einen Teil der Folgekosten geltend zu machen. Bitte lassen Sie das Trocknungsgerät nach Lieferung durchgehend laufen.",
        "STELLUNGNAHME DER WG",
        "Wir haben den sichtbaren Zustand am Sonntag innerhalb weniger Minuten gemeldet. Zu diesem Zeitpunkt lief laut Beobachtung kein Wasser mehr nach, und der später festgestellte Riss war kaum erkennbar. Als sich die Lage am Montag verschärfte, rief Omar die Notfallnummer an, schloss das Wasser und dokumentierte den Schaden. Wir bitten um schriftliche Erläuterung, welche konkrete Maßnahme am Sonntag zumutbar gewesen wäre und welche zusätzlichen Kosten dadurch nachweislich vermieden worden wären."
      ],
      culture: "Contracts, house notices, and emergency contacts should be read together. This fictional dossier is language practice and does not provide legal advice.",
      questions: [
        choice("timeline", "When was the larger puddle first documented?", ["Monday around 06:30", "Sunday at 22:14", "Monday at 09:05"], "Monday around 06:30", "Am Montag gegen 06:30 Uhr war eine größere Pfütze vorhanden.", "The plumber's record places the larger puddle at about 06:30 on Monday."),
        choice("contract", "Which required action did Omar take on Monday?", ["He called the emergency number and limited the damage", "He performed a permanent pipe repair", "He removed the drying device"], "He called the emergency number and limited the damage", "Notfallnummer ... Hauptwasserhahn ... geschlossen", "These actions match the clause on notification and damage limitation."),
        choice("dispute", "What remains disputed between the parties?", ["Whether Sunday required an emergency call and caused avoidable follow-up costs", "Whether the plumber entered the apartment", "Whether a flexible hose existed"], "Whether Sunday required an emergency call and caused avoidable follow-up costs", "hätte bereits am Sonntag ... Folgekosten / welche konkrete Maßnahme ... Kosten ... vermieden", "Both sides focus on what was reasonable and consequential on Sunday."),
        choice("evidence", "Which fact supports the WG's argument that the problem was hard to assess?", ["The crack was barely visible from outside", "The kitchen had no water connection", "The property manager visited on Sunday"], "The crack was barely visible from outside", "Der Riss war von außen kaum sichtbar.", "The professional inspection confirms this point."),
        text("synthesis", "Name one contact step and one documentation step Omar took. Answer in German.", ["Notfallnummer anrufen und Fotos schicken", "Er rief die Notfallnummer an und dokumentierte den Schaden mit Fotos."], [["notfall", "anruf"], ["foto", "dokument"]], "Notfallnummer zweimal angerufen ... Fotos sind beigefügt", "The message records attempted emergency contact and photographic documentation.")
      ]
    }),
    reading({
      id: "b2-warning-rumor", level: "B2", mode: "transfer", title: "Warnung, Gerücht, Entwarnung", genre: "Multi-source information dossier", domain: "Media literacy and public safety", region: "Austria", intro: "A strange smell near a river produces an official warning, speculation in a neighborhood chat, and a later update. Track certainty over time.",
      glossary: [["vorsorglich", "as a precaution"], ["die Messung", "measurement"], ["bestätigen", "confirm"], ["die Einleitung", "discharge into water"], ["aufheben", "lift or cancel"]],
      sections: [
        "QUELLE A, MELDUNG DER STADT, 08:10 UHR",
        "Mehrere Personen haben am Morgen im Bereich des Flusses Mühlbach einen ungewöhnlichen Geruch gemeldet. Feuerwehr und Umweltamt führen Messungen durch. Die Ursache ist derzeit ungeklärt. Die Bevölkerung wird vorsorglich gebeten, den Uferweg zwischen Nordbrücke und Sportplatz zu meiden und Hunde nicht in den Fluss zu lassen. Für das übrige Stadtgebiet besteht nach aktuellem Stand keine Einschränkung. Neue Informationen werden über die städtische Website und den Warnkanal veröffentlicht.",
        "QUELLE B, NACHBARSCHAFTSCHAT, 08:27 BIS 09:03 UHR",
        "Tina: 'Bei der alten Fabrik stehen drei Feuerwehrwagen. Jemand sagt, ein Chemietank sei geplatzt.' Robert: 'Meine Schwester arbeitet im Krankenhaus. Dort bereitet man sich angeblich auf viele Verletzte vor.' Esra: 'Bitte wartet auf eine bestätigte Meldung. Die Stadt spricht bisher nur von Messungen.' Tina: 'Ein Video zeigt Schaum auf dem Wasser. Das kann doch nur Gift sein.' Malik: 'Das Video ist von letztem Frühjahr. Man erkennt das Datum im ursprünglichen Beitrag.'",
        "QUELLE C, LOKALRADIO, 09:20 UHR",
        "Die Feuerwehr hat eine erhöhte Konzentration eines Reinigungsmittels in einem Regenwasserkanal festgestellt. Nach Angaben der Einsatzleitung gelangte eine begrenzte Menge in einen Seitenarm des Mühlbachs. Zwei Mitarbeitende eines Betriebs werden vorsorglich untersucht, weil sie beim Schließen eines Ventils direkten Kontakt mit der Flüssigkeit hatten. Hinweise auf eine größere Freisetzung oder eine Gefahr für die Trinkwasserversorgung liegen nicht vor. Die Ursache der fehlerhaften Einleitung wird geprüft.",
        "QUELLE D, AKTUALISIERUNG DER STADT, 13:45 UHR",
        "Die Messwerte im Hauptlauf des Mühlbachs liegen wieder im normalen Bereich. Die Sperre des Uferwegs wird um 14 Uhr aufgehoben. Im betroffenen Seitenarm bleiben Absperrungen bis morgen bestehen. Das Umweltamt nimmt weitere Wasserproben. Nach bisherigem Ermittlungsstand führte ein falsch angeschlossener Schlauch in einem Gewerbebetrieb zur Einleitung. Der Betrieb hat den Fehler behoben und muss einen Bericht vorlegen. Die beiden untersuchten Personen konnten das Krankenhaus ohne Behandlung verlassen.",
        "QUELLE E, REDAKTIONELLER HINWEIS DES LOKALRADIOS",
        "In sozialen Netzwerken verbreiteten sich vor der ersten Presseauskunft Behauptungen über einen explodierten Tank und zahlreiche Verletzte. Dafür gab es zu keinem Zeitpunkt eine Bestätigung. Das ältere Video mit Schaum wurde aus seinem ursprünglichen Zusammenhang gelöst. Die Redaktion korrigierte einen ersten Online-Titel, der von einem 'Chemieunfall' gesprochen hatte, und ersetzte ihn durch die genauere Formulierung 'begrenzte Einleitung von Reinigungsmittel'."
      ],
      culture: "Official warning channels often update the same event as evidence improves. Time stamps and geographic scope are essential when reading rapidly changing information.",
      questions: [
        choice("certainty", "What was known at 08:10?", ["A smell had been reported and measurements were underway", "A tank explosion had been confirmed", "The drinking water was contaminated"], "A smell had been reported and measurements were underway", "ungewöhnlichen Geruch ... Messungen ... Ursache ... ungeklärt", "The first notice clearly separates reports, action, and uncertainty."),
        choice("verification", "How does Malik challenge the video claim?", ["He finds that the video is from the previous spring", "He says the river never produces foam", "He identifies the person who uploaded it"], "He finds that the video is from the previous spring", "Das Video ist von letztem Frühjahr.", "The original date changes the relevance of the video."),
        choice("development", "Which later fact narrows the scale of the incident?", ["Only a limited amount reached a side channel", "Every riverside path remained closed for a week", "Many hospital patients required treatment"], "Only a limited amount reached a side channel", "eine begrenzte Menge in einen Seitenarm", "The radio report gives location and amount more precisely."),
        choice("editorial judgment", "Why did the radio change its headline?", ["The original wording suggested a broader event than the evidence supported", "The company requested removal of every report", "The city banned the word chemical"], "The original wording suggested a broader event than the evidence supported", "genauere Formulierung", "The revision improves proportionality and precision."),
        text("synthesis", "Which two false or unsupported claims spread in the chat? Answer in German.", ["Ein Tank sei explodiert und es gebe viele Verletzte.", "ein geplatzter Chemietank und zahlreiche Verletzte", "Tankexplosion und viele Verletzte"], [["tank", "explod", "geplatzt"], ["verletz"]], "Behauptungen über einen explodierten Tank und zahlreiche Verletzte", "The editorial note explicitly identifies both unsupported claims.")
      ]
    }),
    reading({
      id: "b2-regional-words", level: "B2", mode: "extensive", title: "Ein Wort, drei Regionen", genre: "Interview feature", domain: "Language and culture", region: "Germany, Austria, Switzerland", intro: "Three speakers describe how regional vocabulary shapes belonging, comprehension, and professional communication.",
      glossary: [["die Standardsprache", "standard language"], ["die Mundart", "dialect"], ["zuordnen", "associate or assign"], ["vertraut", "familiar"], ["sich anpassen", "adapt"]],
      sections: [
        "Für dieselbe Sache existieren im Deutschen häufig mehrere vertraute Wörter. Wer morgens ein kleines Brot kauft, bestellt je nach Region vielleicht ein Brötchen, eine Semmel oder einen Wecken. Solche Unterschiede betreffen mehr als Essen. Sie zeigen, wo Menschen aufgewachsen sind, welche Medien sie hören und in welchen Situationen sie Standardsprache oder Dialekt verwenden.",
        "INTERVIEW 1, MIRA AUS HAMBURG: 'Zu Hause sprechen wir eine norddeutsch gefärbte Umgangssprache, aber kaum Plattdeutsch. Als ich in München studierte, verstand ich schnell, dass Semmel ein Brötchen meint. Schwieriger waren kleine Wörter, die in Gesprächen ständig vorkamen. Wenn jemand heuer sagte, musste ich erst verstehen, dass damit dieses Jahr gemeint war. Nach einigen Monaten benutzte ich manche Wörter selbst, meistens als freundliche Anpassung an die Umgebung.'",
        "INTERVIEW 2, LUKAS AUS GRAZ: 'Österreichisches Standarddeutsch ist für mich keine lockere Variante, die man im Beruf vermeiden müsste. Wörter wie Jänner, Sackerl oder Paradeiser stehen in Wörterbüchern und erscheinen auch in Behördeninformationen. In einem internationalen Team erkläre ich regionale Wörter, wenn sie unklar sein könnten. Ich ersetze sie aber nicht automatisch. Verständlichkeit entsteht durch Rückfragen und Kontext.'",
        "INTERVIEW 3, SELIN AUS BERN: 'Im Alltag spreche ich fast immer Schweizerdeutsch. Geschrieben wird in der Schule, in Zeitungen und in vielen beruflichen Texten überwiegend Standarddeutsch. Der Wechsel ist normal, fühlt sich jedoch je nach Situation unterschiedlich an. In einer formellen Präsentation spreche ich oft näher an der Standardsprache. Im Team kann Mundart Vertrauen schaffen, für neue Kolleginnen aus anderen Regionen kann sie zugleich eine Hürde sein.'",
        "Sprachwissenschaftlerin Eva Rupp weist darauf hin, dass regionale Formen selten sauber an Staatsgrenzen enden. Wecken kommt etwa auch in Teilen Süddeutschlands vor. Menschen wechseln außerdem zwischen mehreren Registern. Eine Person kann mit der Familie Dialekt sprechen, im Kundengespräch regional gefärbte Standardsprache nutzen und einen Bericht in überregionaler Schriftsprache verfassen.",
        "Für Lernende bedeutet das: Sie müssen nicht jede regionale Form aktiv beherrschen. Es hilft jedoch, häufige Varianten zu erkennen und bei Unklarheit nachzufragen. Ein Satz wie 'Bedeutet Sackerl hier eine Tüte?' zeigt Interesse und verhindert Missverständnisse. Wer verschiedene Formen hört, lernt zugleich, die eigene Vorstellung von richtigem Deutsch flexibler zu gestalten."
      ],
      culture: "German is pluricentric. Standard varieties in Germany, Austria, and Switzerland have recognized vocabulary and usage differences alongside regional dialects.",
      questions: [
        choice("attitude", "How does Lukas view Austrian Standard German?", ["As a legitimate standard variety suitable for professional use", "As a dialect that should remain private", "As vocabulary found only in old books"], "As a legitimate standard variety suitable for professional use", "keine lockere Variante, die man im Beruf vermeiden müsste", "He explicitly defends its professional legitimacy."),
        choice("function", "What double effect can dialect have in Selin's workplace?", ["It can create trust and also create a barrier for newcomers", "It improves written reports and removes ambiguity", "It prevents colleagues from using standard language"], "It can create trust and also create a barrier for newcomers", "Mundart Vertrauen schaffen ... für neue Kolleginnen ... eine Hürde", "She describes both belonging and a possible barrier to access."),
        choice("qualification", "What does Eva Rupp add to a simple country-by-country explanation?", ["Regional forms cross borders and speakers change registers", "Every region uses only one fixed vocabulary", "Written language always follows local dialect"], "Regional forms cross borders and speakers change registers", "selten sauber an Staatsgrenzen / wechseln ... zwischen mehreren Registern", "Her explanation emphasizes overlapping geography and flexible use."),
        choice("learner strategy", "What does the article recommend to learners?", ["Recognize common variants and ask when meaning is unclear", "Memorize every dialect before speaking", "Avoid regional speakers"], "Recognize common variants and ask when meaning is unclear", "häufige Varianten zu erkennen und bei Unklarheit nachzufragen", "Recognition and clarification are the practical goals."),
        text("comparison", "Give two regional words for a bread roll from the article. Answer in German.", ["Brötchen und Semmel", "Semmel und Wecken", "Brötchen und Wecken", "Brötchen, Semmel"], [["brötchen", "broetchen", "semmel", "wecken"], ["brötchen", "broetchen", "semmel", "wecken"]], "Brötchen, eine Semmel oder einen Wecken", "The opening paragraph gives three variants.")
      ]
    }),
    reading({
      id: "b2-empty-shop", level: "B2", mode: "capstone", title: "Was wird aus dem leeren Laden?", genre: "Public-policy dossier", domain: "Community and local government", region: "Germany", intro: "A town must choose a use for an empty municipal storefront. Compare costs, access, evidence, and stakeholder priorities before judging the options.",
      glossary: [["die Zwischennutzung", "temporary use"], ["die Folgekosten", "ongoing or consequential costs"], ["die Auslastung", "utilization"], ["die Daseinsvorsorge", "public services that support daily life"], ["tragfähig", "sustainable or viable"]],
      sections: [
        "AUSGANGSLAGE",
        "Seit achtzehn Monaten steht ein 280 Quadratmeter großes Ladenlokal am Marktplatz leer. Das Gebäude gehört der Stadt Rheinfeld. Die frühere Drogerie kündigte, nachdem sie in ein Einkaufszentrum am Stadtrand gezogen war. Für das Erdgeschoss zahlt die Stadt derzeit rund 4.200 Euro monatlich für Betrieb, Sicherheit und grundlegende Instandhaltung. Ein Verkauf ist laut Stadtratsbeschluss für die kommenden drei Jahre ausgeschlossen, damit eine Nutzung mit öffentlichem Mehrwert geprüft werden kann.",
        "VORSCHLAG A, OFFENE WERKSTATT UND REPARATURCAFÉ",
        "Der Verein Machbar möchte Werkbänke, eine kleine Holzwerkstatt und wöchentliche Reparaturtermine einrichten. Ehrenamtliche würden defekte Haushaltsgeräte gemeinsam mit ihren Besitzern prüfen. Drei Berufsschulen haben Interesse an Projekttagen erklärt. Der Verein beantragt einen städtischen Zuschuss von 95.000 Euro für Umbau und erste Ausstattung. Danach sollen Mitgliedsbeiträge, Kursgebühren und Spenden mindestens 70 Prozent der laufenden Kosten decken. Lärmintensive Arbeiten wären nur im hinteren Gebäudeteil und bis 18 Uhr vorgesehen.",
        "VORSCHLAG B, BERATUNGSSTELLE UND BÜRGERBÜRO",
        "Das Sozialdezernat will mehrere bislang verteilte Angebote bündeln: Hilfe bei digitalen Anträgen, Energieberatung, zwei Sprechstunden der Verbraucherzentrale und einen Arbeitsplatz des Bürgerbüros. Erwartet werden 80 bis 120 Besuche pro Woche. Der Umbau wäre mit 160.000 Euro teurer, weil vertrauliche Gespräche getrennte Räume und besseren Schallschutz erfordern. Jährlich entstünden voraussichtlich 210.000 Euro Personal- und Betriebskosten. Das Dezernat argumentiert, dass der zentrale Standort besonders älteren Menschen und Personen ohne Auto zugutekomme.",
        "VORSCHLAG C, BEFRISTETE VERMIETUNG AN LOKALE GRÜNDERINNEN",
        "Die Wirtschaftsförderung schlägt kleine Verkaufsflächen für jeweils sechs Monate vor. Junge Unternehmen könnten Produkte testen, bevor sie langfristige Mietverträge abschließen. Die Stadt würde eine Grundmiete erhalten und nur geringe Betreuungskosten tragen. In einer Befragung äußerten 26 lokale Betriebe grundsätzliches Interesse. Die Rücklaufquote lag allerdings bei 18 Prozent. Unklar ist außerdem, ob regelmäßig genug geeignete Bewerbungen eingehen und wer Leerstände zwischen zwei Vermietungen finanziert.",
        "STELLUNGNAHMEN",
        "Der Seniorenbeirat unterstützt Vorschlag B. Viele Verwaltungsleistungen seien online verfügbar, doch gerade dadurch entstehe Beratungsbedarf. Der Handelsverein bevorzugt Vorschlag C, weil wechselnde Geschäfte neue Kundschaft in die Innenstadt bringen könnten. Zwei Anwohnerinnen warnen beim Reparaturcafé vor Lärm, während eine nahe Gaststätte auf zusätzliche Besucher hofft. Die Berufsschule betont, dass sie eine Zusammenarbeit nur anbieten könne, wenn Haftung und Aufsicht verbindlich geregelt seien.",
        "KOSTENNOTIZ DER KÄMMEREI",
        "Für das kommende Haushaltsjahr stehen einmalig 180.000 Euro für den Umbau leerer Innenstadtimmobilien bereit. Laufende Ausgaben müssen ab dem zweiten Jahr aus dem regulären Haushalt oder aus gesicherten Einnahmen gedeckt werden. Die Kämmerei empfiehlt deshalb, vor einer dauerhaften Entscheidung realistische Besucherzahlen, Personalbedarf und Einnahmerisiken zu prüfen. Eine zwölfmonatige Zwischennutzung könne Daten liefern, dürfe jedoch keine Umbauten auslösen, die eine spätere Alternative unnötig verteuern.",
        "KOMPROMISSVORSCHLAG DES BÜRGERMEISTERS",
        "Der Bürgermeister schlägt eine gestufte Lösung vor. Zunächst soll das Bürgerbüro für ein Jahr an zwei Tagen pro Woche eine offene Beratung anbieten. An drei weiteren Tagen könnte der Verein Machbar geräuscharme Reparaturtermine durchführen. Mobile Trennwände und eine provisorische Theke würden 48.000 Euro kosten. Nach neun Monaten sollen Besucherzahlen, Kosten, Beschwerden und die Nachfrage nach einzelnen Angeboten ausgewertet werden. Die Gründungsflächen würden währenddessen in zwei kleineren leerstehenden Geschäften getestet. Kritiker im Stadtrat halten diese Lösung für zu vorsichtig. Befürworter sehen darin eine Möglichkeit, Annahmen vor einer großen Investition zu überprüfen."
      ],
      culture: "Municipal decisions often combine public-service goals, economic development, budgets, temporary pilots, and formal council debate.",
      questions: [
        choice("constraint", "Which proposal's stated annual operating cost exceeds the entire 180,000-euro fund?", ["Proposal B", "Proposal A", "The temporary founder shops"], "Proposal B", "Jährlich entstünden voraussichtlich 210.000 Euro Personal- und Betriebskosten.", "Proposal B states annual costs of 210,000 euros, which is more than 180,000 euros. The fund itself is reserved for renovation work."),
        choice("evidence quality", "Why should the stated interest in Proposal C be interpreted cautiously?", ["Only 18 percent responded to the survey", "No local business expressed interest", "The city has already sold the building"], "Only 18 percent responded to the survey", "Die Rücklaufquote lag allerdings bei 18 Prozent.", "The low response rate weakens conclusions about wider demand."),
        choice("stakeholder", "Which unresolved condition matters specifically to the vocational school?", ["Liability and supervision", "A central bus stop", "Monthly retail rent"], "Liability and supervision", "wenn Haftung und Aufsicht verbindlich geregelt seien", "The school connects participation to clear responsibility."),
        choice("policy design", "What is the main purpose of the mayor's staged solution?", ["Collect real usage data before a large permanent investment", "Guarantee every proposal a permanent room", "Avoid evaluating complaints"], "Collect real usage data before a large permanent investment", "Annahmen vor einer großen Investition zu überprüfen", "The pilot tests several assumptions with limited reversible changes."),
        choice("trade-off", "Which tension runs through the whole dossier?", ["Public benefit versus financial and operational sustainability", "Regional vocabulary versus standard spelling", "Rail travel versus private cars"], "Public benefit versus financial and operational sustainability", "öffentlicher Mehrwert / Kosten, Einnahmerisiken, Personalbedarf", "Each proposal offers a benefit while carrying different ongoing obligations and uncertainty."),
        text("synthesis", "Name four things the pilot will evaluate after nine months. Answer in German.", ["Besucherzahlen, Kosten, Beschwerden und Nachfrage", "die Besucherzahlen, die Kosten, die Beschwerden und die Nachfrage"], [["besucher"], ["kosten"], ["beschwer"], ["nachfrage"]], "Besucherzahlen, Kosten, Beschwerden und die Nachfrage", "The compromise defines four concrete evaluation categories.")
      ]
    }),
  ];

  window.SATZWERK_READINGS.forEach((item, index) => {
    item.version = 1;
    item.order = index + 1;
    item.wordCount = item.sections.join(" ").match(/[\p{L}\p{N}]+(?:[-'][\p{L}\p{N}]+)*/gu)?.length || 0;
    item.estimatedMinutes = Math.max(1, Math.ceil(item.wordCount / ({ A0: 45, A1: 70, A2: 95, B1: 120, B2: 145 }[item.level] || 100)));
    item.tags = [item.mode, item.genre, item.domain, item.region];
  });
})();
