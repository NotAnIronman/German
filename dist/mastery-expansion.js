(function () {
  const course = window.SATZWERK_CURRICULUM;
  if (!course?.modules) throw new Error("Satzwerk curriculum must load before the mastery expansion");

  const P = (level, number, id, title, subtitle, outcome, focus, scenario, phrases, fieldNoteTitle, fieldNote) => ({
    level,
    number,
    id,
    code: `${level}.${number}`,
    title,
    subtitle,
    outcome,
    focus,
    scenario,
    phrases: phrases.map(item => item.split("|")),
    fieldNoteTitle,
    fieldNote
  });

  const plans = [
    P("A2", 13, "a2-market-checkout", "At the market and checkout", "Buy exact amounts and handle a change at the counter.", "Buy exact quantities, ask for a substitute, and settle a checkout exchange.", "quantities, adjective endings, and polite requests", "A market stall is out of one item, and two shoppers want to pay separately.", [
      "ein halbes Kilo|half a kilo|Ich hätte gern ein halbes Kilo Tomaten.|I would like half a kilo of tomatoes.",
      "das Stück, die Stücke|piece or item|Drei Stück kosten zusammen vier Euro.|Three items cost four euros together.",
      "lose|loose or unpackaged|Haben Sie die Äpfel auch lose?|Do you also have the apples loose?",
      "abgepackt|prepacked|Der Käse ist nur abgepackt erhältlich.|The cheese is only available prepacked.",
      "reif|ripe|Sind diese Pfirsiche schon reif?|Are these peaches ripe yet?",
      "das Sonderangebot, die Sonderangebote|special offer|Heute sind Gurken im Sonderangebot.|Cucumbers are on special offer today.",
      "ausverkauft sein|to be sold out|Die frischen Erdbeeren sind leider ausverkauft.|The fresh strawberries are unfortunately sold out.",
      "stattdessen|instead|Dann nehme ich stattdessen die Birnen.|Then I will take the pears instead.",
      "etwas wiegen|to weigh something|Könnten Sie das bitte wiegen?|Could you weigh that, please?",
      "getrennt bezahlen|to pay separately|Wir möchten getrennt bezahlen.|We would like to pay separately.",
      "die Quittung, die Quittungen|receipt|Brauchen Sie eine Quittung?|Do you need a receipt?",
      "Das stimmt so.|Keep the change.|Zwölf Euro? Hier sind fünfzehn. Das stimmt so.|Twelve euros? Here are fifteen. Keep the change."
    ]),
    P("A2", 14, "a2-recipe-adaptation", "Cook from a recipe", "Follow clear steps and adapt an ingredient.", "Follow and explain a simple recipe while adapting one ingredient.", "imperatives, sequence words, and substitutions with durch", "You cook dinner with a guest who cannot eat dairy.", [
      "die Zutat, die Zutaten|ingredient|Für die Suppe fehlen noch zwei Zutaten.|Two ingredients are still missing for the soup.",
      "das Rezept, die Rezepte|recipe|Ich lese zuerst das ganze Rezept.|I first read the whole recipe.",
      "das Schneidebrett, die Schneidebretter|cutting board|Leg das Gemüse auf das Schneidebrett.|Put the vegetables on the cutting board.",
      "etwas würfeln|to dice something|Schneide die Kartoffeln in kleine Würfel.|Cut the potatoes into small cubes.",
      "etwas hacken|to chop something|Hack die Petersilie fein.|Chop the parsley finely.",
      "etwas anbraten|to sauté or sear something|Brate die Zwiebeln kurz an.|Sauté the onions briefly.",
      "etwas hinzufügen|to add something|Füge danach die Brühe hinzu.|Then add the broth.",
      "etwas umrühren|to stir something|Rühr die Soße regelmäßig um.|Stir the sauce regularly.",
      "etwas vorheizen|to preheat something|Heize den Ofen auf 180 Grad vor.|Preheat the oven to 180 degrees.",
      "etwas abschmecken|to season to taste|Schmeck die Suppe mit Salz ab.|Season the soup to taste with salt.",
      "etwas durch etwas ersetzen|to replace something with something|Wir ersetzen die Sahne durch Hafercreme.|We are replacing the cream with oat cream.",
      "laktosefrei|lactose-free|Dieses Gericht ist laktosefrei.|This dish is lactose-free."
    ]),
    P("A2", 15, "a2-parcel-service", "Send and collect a parcel", "Choose postage, track a shipment, and handle collection.", "Choose postage, label a parcel, track it, and collect or return it.", "separable verbs and indirect questions", "You send a gift and ask what to do after a failed delivery.", [
      "die Warensendung, die Warensendungen|goods shipment|Ist für dieses Buch eine Warensendung möglich?|Can this book be sent as a goods shipment?",
      "das Päckchen, die Päckchen|small parcel|Für ein Päckchen reicht diese Verpackung.|This packaging is enough for a small parcel.",
      "das Porto|postage|Wie hoch ist das Porto mit Sendungsverfolgung?|How much is postage with tracking?",
      "der Absender, die Absender|sender|Schreiben Sie den Absender oben links.|Write the sender at the top left.",
      "der Empfänger, die Empfänger|recipient|Die Adresse des Empfängers fehlt noch.|The recipient's address is still missing.",
      "die Versandart, die Versandarten|shipping method|Welche Versandart ist am schnellsten?|Which shipping method is fastest?",
      "die Zustellung, die Zustellungen|delivery|Die Zustellung erfolgt wahrscheinlich morgen.|Delivery will probably take place tomorrow.",
      "der Abholschein, die Abholscheine|collection slip|Im Briefkasten lag ein Abholschein.|There was a collection slip in the mailbox.",
      "die Paketstation, die Paketstationen|parcel locker|Das Paket liegt in der Paketstation.|The parcel is in the parcel locker.",
      "der Sendungsstatus|shipment status|Der Sendungsstatus hat sich seit Montag nicht geändert.|The shipment status has not changed since Monday.",
      "etwas verschicken|to send something|Wann haben Sie die Bestellung verschickt?|When did you send the order?",
      "etwas zurücksenden|to send something back|Ich muss die Ware bis Freitag zurücksenden.|I need to send the goods back by Friday."
    ]),
    P("A2", 16, "a2-everyday-banking", "Manage everyday banking", "Check payments and solve a basic account problem.", "Check a balance, make a transfer, understand recurring payments, and report an unfamiliar debit.", "compound nouns and polite indirect questions", "You use an ATM and then ask a bank employee about an unfamiliar debit.", [
      "das Onlinebanking|online banking|Im Onlinebanking sehe ich alle aktuellen Buchungen.|I can see all current transactions in online banking.",
      "der Zahlungseingang, die Zahlungseingänge|incoming payment|Der erwartete Zahlungseingang fehlt noch.|The expected incoming payment is still missing.",
      "der Verwendungszweck, die Verwendungszwecke|payment reference|Bitte geben Sie die Rechnungsnummer als Verwendungszweck an.|Please enter the invoice number as the payment reference.",
      "der Dauerauftrag, die Daueraufträge|standing order|Die Miete zahle ich per Dauerauftrag.|I pay the rent by standing order.",
      "die Lastschrift, die Lastschriften|direct debit|Diese Lastschrift kenne ich nicht.|I do not recognize this direct debit.",
      "die Kartensperre, die Kartensperren|card block|Nach dem Verlust brauche ich sofort eine Kartensperre.|After the loss, I need an immediate card block.",
      "das Tageslimit, die Tageslimits|daily limit|Kann ich mein Tageslimit vorübergehend ändern?|Can I temporarily change my daily limit?",
      "die Fehlermeldung, die Fehlermeldungen|error message|Beim Bestätigen erscheint immer dieselbe Fehlermeldung.|The same error message appears whenever I confirm.",
      "der Betrag, die Beträge|amount|Bitte prüfen Sie den Betrag noch einmal.|Please check the amount again.",
      "fällig sein|to be due|Die Zahlung ist am Montag fällig.|The payment is due on Monday.",
      "eine Lastschrift zurückgeben|to reverse a direct debit|Kann ich diese unbekannte Lastschrift zurückgeben?|Can I reverse this unfamiliar direct debit?",
      "Geld einzahlen|to deposit money|Kann ich hier Bargeld einzahlen?|Can I deposit cash here?"
    ]),
    P("A2", 17, "a2-phone-internet-support", "Fix a phone or internet problem", "Describe the fault and arrange technical help.", "Describe a connection problem, follow troubleshooting steps, and arrange a technician visit.", "seit with the present tense and troubleshooting with wenn", "Your home internet has failed since yesterday, so you contact support.", [
      "der Internetanschluss, die Internetanschlüsse|internet connection|Unser Internetanschluss funktioniert nicht.|Our internet connection is not working.",
      "der Router, die Router|router|Am Router blinkt eine rote Lampe.|A red light is blinking on the router.",
      "der WLAN-Schlüssel, die WLAN-Schlüssel|Wi-Fi key|Wo finde ich den WLAN-Schlüssel?|Where can I find the Wi-Fi key?",
      "das Datenvolumen|data allowance|Mein Datenvolumen ist fast aufgebraucht.|My data allowance is almost used up.",
      "der Empfang|reception or signal|Im Keller habe ich keinen Empfang.|I have no reception in the basement.",
      "der Netzausfall, die Netzausfälle|network outage|In Ihrer Straße gibt es einen Netzausfall.|There is a network outage on your street.",
      "die Kundenhotline, die Kundenhotlines|customer hotline|Ich rufe die Kundenhotline an.|I am calling the customer hotline.",
      "etwas neu starten|to restart something|Starten Sie den Router bitte neu.|Please restart the router.",
      "ein Kabel prüfen|to check a cable|Prüfen Sie zuerst das graue Kabel.|First check the gray cable.",
      "sich mit etwas verbinden|to connect to something|Mein Laptop verbindet sich nicht mit dem WLAN.|My laptop does not connect to Wi-Fi.",
      "seit gestern|since yesterday|Die Verbindung ist seit gestern langsam.|The connection has been slow since yesterday.",
      "der Technikerbesuch, die Technikerbesuche|technician visit|Passt Ihnen der Technikerbesuch am Vormittag?|Does the technician visit in the morning suit you?"
    ]),
    P("A2", 18, "a2-household-utilities", "Read household utilities", "Report readings and explain an unexpected bill.", "Report meter readings, compare use across months, and take simple energy-saving steps.", "comparatives, numbers, and cause with weil and deshalb", "A utility bill is unexpectedly high, and you compare it with the meter.", [
      "der Strom|electricity|Im Januar haben wir mehr Strom verbraucht.|We used more electricity in January.",
      "das Gas|gas|Wird das Wasser mit Gas geheizt?|Is the water heated with gas?",
      "der Heizkörper, die Heizkörper|radiator|Der Heizkörper im Schlafzimmer bleibt kalt.|The radiator in the bedroom stays cold.",
      "der Zähler, die Zähler|meter|Der Zähler befindet sich im Keller.|The meter is located in the basement.",
      "der Zählerstand, die Zählerstände|meter reading|Bitte tragen Sie den Zählerstand ein.|Please enter the meter reading.",
      "der Energieverbrauch|energy consumption|Unser Energieverbrauch ist deutlich gestiegen.|Our energy consumption has risen noticeably.",
      "die Stromrechnung, die Stromrechnungen|electricity bill|Warum ist die Stromrechnung so hoch?|Why is the electricity bill so high?",
      "der Wasserverbrauch|water consumption|Der Wasserverbrauch war im März niedriger.|Water consumption was lower in March.",
      "einen Zähler ablesen|to read a meter|Ich habe den Zähler gestern abgelesen.|I read the meter yesterday.",
      "Energie verbrauchen|to consume energy|Alte Geräte verbrauchen oft mehr Energie.|Old appliances often consume more energy.",
      "ein Gerät ausschalten|to switch off an appliance|Schalten Sie das Gerät ganz aus.|Switch the appliance off completely.",
      "Energie sparen|to save energy|Mit LED-Lampen können wir Energie sparen.|We can save energy with LED bulbs."
    ]),
    P("A2", 19, "a2-school-childcare", "Communicate with school or childcare", "Explain an absence and coordinate permission or pickup.", "Explain an absence, understand a school notice, and coordinate pickup or permission.", "possessives, modal verbs, and dass or ob clauses", "A child is ill before a class trip, and the school needs information.", [
      "der Unterricht|lessons or class|Der Unterricht beginnt um halb neun.|Lessons begin at eight thirty.",
      "die Hausaufgabe, die Hausaufgaben|homework assignment|Welche Hausaufgaben hat die Klasse heute?|What homework does the class have today?",
      "der Vertretungsplan, die Vertretungspläne|substitution timetable|Im Vertretungsplan steht heute ein anderer Raum.|The substitution timetable shows a different room today.",
      "das Elterngespräch, die Elterngespräche|parent-teacher meeting|Für das Elterngespräch brauche ich einen Termin.|I need an appointment for the parent-teacher meeting.",
      "die Klassenfahrt, die Klassenfahrten|class trip|Für die Klassenfahrt brauchen wir eine Erlaubnis.|We need permission for the class trip.",
      "die Abwesenheit, die Abwesenheiten|absence|Bitte entschuldigen Sie die Abwesenheit meines Sohnes.|Please excuse my son's absence.",
      "die Klassenleitung, die Klassenleitungen|class teacher or homeroom lead|Die Klassenleitung schickt eine Nachricht.|The class teacher sends a message.",
      "die Ganztagsbetreuung|all-day care|Ist am Montag Ganztagsbetreuung möglich?|Is all-day care available on Monday?",
      "ein Kind krankmelden|to report a child sick|Ich muss meine Tochter heute krankmelden.|I have to report my daughter sick today.",
      "ein Kind rechtzeitig abholen|to collect a child on time|Kannst du Leo um drei rechtzeitig abholen?|Can you collect Leo on time at three?",
      "eine Erlaubnis geben|to give permission|Die Eltern müssen schriftlich ihre Erlaubnis geben.|The parents must give their permission in writing.",
      "eine Notiz schreiben|to write a note|Ich schreibe der Schule eine kurze Notiz.|I am writing the school a short note."
    ]),
    P("A2", 20, "a2-natural-social-talk", "Make social conversation naturally", "Open, sustain, redirect, and close a friendly exchange.", "Begin, sustain, redirect, and close a friendly conversation in the right register.", "open questions, reflexive forms, and du or Sie", "You meet neighbors at a building gathering and want to make natural conversation.", [
      "der Bekannte, die Bekannten / die Bekannte, die Bekannten|acquaintance|Dort habe ich einen alten Bekannten getroffen.|I met an old acquaintance there.",
      "die Einladung, die Einladungen|invitation|Vielen Dank für die Einladung.|Thank you very much for the invitation.",
      "sich mit jemandem unterhalten|to talk with someone|Ich habe mich lange mit Frau Özdemir unterhalten.|I talked with Ms. Özdemir for a long time.",
      "das Gesprächsthema, die Gesprächsthemen|topic of conversation|Das ist ein gutes Gesprächsthema.|That is a good topic of conversation.",
      "die Gemeinsamkeit, die Gemeinsamkeiten|thing in common|Wir haben schnell eine Gemeinsamkeit gefunden.|We quickly found something in common.",
      "die Herkunft|origin or background|Darf ich fragen, woher Sie kommen?|May I ask where you come from?",
      "das Freizeitinteresse, die Freizeitinteressen|leisure interest|Kochen ist eines meiner Freizeitinteressen.|Cooking is one of my leisure interests.",
      "jemanden duzen|to address someone with du|Wir können uns gern duzen.|We can gladly use du with each other.",
      "jemanden siezen|to address someone with Sie|Im Büro siezen wir neue Kunden.|At the office we address new customers with Sie.",
      "das Thema wechseln|to change the subject|Vielleicht sollten wir das Thema wechseln.|Perhaps we should change the subject.",
      "in Kontakt bleiben|to stay in touch|Wollen wir in Kontakt bleiben?|Shall we stay in touch?",
      "sich verabschieden|to say goodbye|Ich muss mich leider schon verabschieden.|Unfortunately, I already have to say goodbye."
    ]),
    P("A2", 21, "a2-fitness-class", "Join a fitness class", "Compare options and take part safely.", "Compare course options, register, ask about equipment, and participate safely.", "für with accusative, bei with dative, and comparatives", "You attend a trial class at a fitness center.", [
      "das Fitnessstudio, die Fitnessstudios|gym|Das Fitnessstudio öffnet um sechs Uhr.|The gym opens at six.",
      "die Mitgliedschaft, die Mitgliedschaften|membership|Was kostet die Mitgliedschaft pro Monat?|How much does membership cost per month?",
      "das Probetraining, die Probetrainings|trial session|Kann ich ein Probetraining machen?|Can I do a trial session?",
      "die Kursgebühr, die Kursgebühren|course fee|Die Kursgebühr ist im Preis enthalten.|The course fee is included in the price.",
      "die Ausrüstung|equipment|Welche Ausrüstung brauche ich?|What equipment do I need?",
      "die Umkleide, die Umkleiden|changing room|Die Umkleiden sind im ersten Stock.|The changing rooms are on the first floor.",
      "der Trainer, die Trainer / die Trainerin, die Trainerinnen|trainer|Die Trainerin zeigt uns die Übung.|The trainer shows us the exercise.",
      "der Anfänger, die Anfänger / die Anfängerin, die Anfängerinnen|beginner|Der Kurs ist auch für Anfänger geeignet.|The class is also suitable for beginners.",
      "fortgeschritten|advanced|Am Mittwoch trainiert die fortgeschrittene Gruppe.|The advanced group trains on Wednesday.",
      "sich für einen Kurs anmelden|to register for a class|Ich möchte mich für Yoga anmelden.|I would like to register for yoga.",
      "bei etwas mitmachen|to join in something|Darf ich heute beim Training mitmachen?|May I join the training today?",
      "eine Übung vormachen|to demonstrate an exercise|Können Sie die Übung noch einmal vormachen?|Can you demonstrate the exercise again?"
    ]),
    P("A2", 22, "a2-weather-plan", "Change plans for the weather", "Read risk and adapt an outdoor plan.", "Understand a forecast, discuss risk, and adapt an outdoor plan.", "future meaning in the present tense and wenn clauses", "A hike is planned during a weather warning.", [
      "die Wettervorhersage, die Wettervorhersagen|weather forecast|Die Wettervorhersage meldet starken Regen.|The weather forecast reports heavy rain.",
      "das Gewitter, die Gewitter|thunderstorm|Am Nachmittag gibt es ein Gewitter.|There will be a thunderstorm in the afternoon.",
      "der Schauer, die Schauer|shower|Gegen Mittag sind einzelne Schauer möglich.|Isolated showers are possible around noon.",
      "bewölkt|cloudy|Morgen bleibt es meistens bewölkt.|Tomorrow it will remain mostly cloudy.",
      "windig|windy|Auf dem Berg ist es sehr windig.|It is very windy on the mountain.",
      "die Glätte|icy conditions|Wegen Glätte sind die Wege gefährlich.|The paths are dangerous because of icy conditions.",
      "die Hitzewarnung, die Hitzewarnungen|heat warning|Für die Region gilt eine Hitzewarnung.|A heat warning is in effect for the region.",
      "die Regenjacke, die Regenjacken|rain jacket|Nimm sicherheitshalber eine Regenjacke mit.|Take a rain jacket just in case.",
      "der Wanderweg, die Wanderwege|hiking trail|Der Wanderweg ist nach dem Sturm gesperrt.|The hiking trail is closed after the storm.",
      "der Sonnenschutz|sun protection|Bei der Hitze ist Sonnenschutz wichtig.|Sun protection is important in the heat.",
      "einen Plan ändern|to change a plan|Wenn es gewittert, ändern wir den Plan.|If there is a thunderstorm, we will change the plan.",
      "nicht stattfinden|not to take place|Die Tour kann heute nicht stattfinden.|The tour cannot take place today."
    ]),
    P("A2", 23, "a2-repair-shop", "Arrange a bicycle or car repair", "Describe a fault and agree on cost and collection.", "Describe a fault, ask for a diagnosis and estimate, and arrange collection.", "lassen with infinitive and indirect questions", "You take a bicycle or car to a repair shop.", [
      "die Werkstatt, die Werkstätten|repair shop|Die Werkstatt hat erst morgen einen Termin frei.|The repair shop does not have an opening until tomorrow.",
      "der platte Reifen, die platten Reifen|flat tire|Mein Fahrrad hat einen platten Reifen.|My bicycle has a flat tire.",
      "die Bremse, die Bremsen|brake|Die hintere Bremse funktioniert nicht richtig.|The rear brake is not working properly.",
      "die Fahrradkette, die Fahrradketten|bicycle chain|Die Fahrradkette springt ständig ab.|The bicycle chain keeps coming off.",
      "die Motorleuchte, die Motorleuchten|engine warning light|Seit gestern leuchtet die Motorleuchte.|The engine warning light has been on since yesterday.",
      "die Inspektion, die Inspektionen|inspection or service|Wann ist die nächste Inspektion nötig?|When is the next service necessary?",
      "quietschen|to squeak|Beim Bremsen quietscht das Rad.|The bicycle squeaks when braking.",
      "nicht anspringen|not to start|Das Auto springt morgens nicht an.|The car does not start in the morning.",
      "nach etwas sehen|to take a look at something|Könnten Sie heute nach dem Motor sehen?|Could you take a look at the engine today?",
      "etwas reparieren lassen|to have something repaired|Ich lasse die Bremse reparieren.|I am having the brake repaired.",
      "die Kostenschätzung, die Kostenschätzungen|cost estimate|Bekomme ich vorher eine Kostenschätzung?|Will I get a cost estimate first?",
      "abholbereit sein|to be ready for collection|Das Fahrrad ist ab fünf Uhr abholbereit.|The bicycle is ready for collection from five."
    ]),
    P("A2", 24, "a2-lost-property", "Recover lost property", "Describe what is missing and follow the recovery steps.", "Describe a missing object, report where it was last seen, and follow collection instructions.", "perfect-tense narrative and adjective endings", "You report a missing bag to a lost-property office.", [
      "das Fundbüro, die Fundbüros|lost-property office|Ich frage morgen beim Fundbüro nach.|I will ask at the lost-property office tomorrow.",
      "die Geldbörse, die Geldbörsen|wallet|Meine schwarze Geldbörse ist weg.|My black wallet is gone.",
      "der Schlüsselbund, die Schlüsselbunde|key ring or set of keys|Am Schlüsselbund hängt ein rotes Band.|A red ribbon is attached to the key ring.",
      "der Rucksack, die Rucksäcke|backpack|Ich habe meinen Rucksack im Bus liegen lassen.|I left my backpack on the bus.",
      "der Verlust, die Verluste|loss|Den Verlust habe ich sofort gemeldet.|I reported the loss immediately.",
      "der Diebstahl, die Diebstähle|theft|War es ein Verlust oder ein Diebstahl?|Was it a loss or a theft?",
      "etwas vermissen|to be missing something|Seit heute Morgen vermisse ich meine Tasche.|I have been missing my bag since this morning.",
      "zuletzt gesehen|last seen|Wo haben Sie den Gegenstand zuletzt gesehen?|Where did you last see the item?",
      "etwas genau beschreiben|to describe something precisely|Können Sie die Tasche genau beschreiben?|Can you describe the bag precisely?",
      "einen Verlust melden|to report a loss|Ich möchte den Verlust meines Handys melden.|I would like to report the loss of my phone.",
      "darin war / darin waren|it contained|Darin waren mein Ausweis und zwanzig Euro.|My ID and twenty euros were in it.",
      "das auffällige Merkmal, die auffälligen Merkmale|distinguishing feature|Ein Aufkleber ist das auffälligste Merkmal.|A sticker is the most noticeable feature."
    ]),
    P("A2", 25, "a2-emergency-help", "Call for emergency help", "Report the location and danger clearly.", "Call 112, report the location and danger, and follow immediate instructions.", "imperatives, modal verbs, and locations with dative", "A cyclist is injured near a station, and you call for help.", [
      "der Notruf, die Notrufe|emergency call|Der Notruf ist kostenlos.|The emergency call is free.",
      "der Einsatzort, die Einsatzorte|incident location|Nennen Sie zuerst den genauen Einsatzort.|First state the exact incident location.",
      "der Verletzte, die Verletzten / die Verletzte, die Verletzten|injured person|Ein Verletzter liegt auf dem Radweg.|An injured person is lying on the bike path.",
      "die Leitstelle, die Leitstellen|emergency dispatch center|Die Leitstelle stellt zuerst einige Fragen.|The emergency dispatch center asks a few questions first.",
      "die Einsatzkräfte|emergency responders|Die Einsatzkräfte sind bereits unterwegs.|The emergency responders are already on the way.",
      "der Krankenwagen, die Krankenwagen|ambulance|Der Krankenwagen kommt in wenigen Minuten.|The ambulance will arrive in a few minutes.",
      "bewusstlos sein|to be unconscious|Die Person ist bewusstlos, atmet aber.|The person is unconscious but breathing.",
      "die Atmung prüfen|to check breathing|Prüfen Sie vorsichtig die Atmung der Person.|Carefully check the person's breathing.",
      "stark bluten|to bleed heavily|Die Frau blutet stark am Arm.|The woman is bleeding heavily from her arm.",
      "Es brennt.|There is a fire.|Es brennt in einer Wohnung im zweiten Stock.|There is a fire in an apartment on the second floor.",
      "Erste Hilfe leisten|to give first aid|Können Sie Erste Hilfe leisten?|Can you give first aid?",
      "ruhig bleiben|to stay calm|Bleiben Sie ruhig und warten Sie auf Hilfe.|Stay calm and wait for help."
    ]),
    P("A2", 26, "a2-medicine-safety", "Use medicines safely", "Ask for a remedy and follow dosage instructions.", "Ask a pharmacist for a suitable product and follow basic dosage instructions.", "frequency expressions, imperatives, and sollen or dürfen", "You buy an over-the-counter remedy and clarify how to use it.", [
      "das Schmerzmittel, die Schmerzmittel|painkiller|Dieses Schmerzmittel hilft gegen Kopfschmerzen.|This painkiller helps with headaches.",
      "die Tablette, die Tabletten|tablet or pill|Nehmen Sie morgens eine Tablette.|Take one tablet in the morning.",
      "die Tropfen|drops|Geben Sie zehn Tropfen in ein Glas Wasser.|Put ten drops into a glass of water.",
      "die Salbe, die Salben|ointment|Die Salbe ist nur für die Haut.|The ointment is only for the skin.",
      "die Packungsbeilage, die Packungsbeilagen|package leaflet|Lesen Sie bitte die Packungsbeilage.|Please read the package leaflet.",
      "der Wirkstoff, die Wirkstoffe|active ingredient|Welcher Wirkstoff ist in der Salbe?|Which active ingredient is in the ointment?",
      "die Einnahme|taking or administration|Die Einnahme erfolgt nach dem Essen.|It should be taken after eating.",
      "rezeptfrei|available without a prescription|Ist dieses Mittel rezeptfrei?|Is this remedy available without a prescription?",
      "nüchtern|on an empty stomach|Diese Tablette dürfen Sie nicht nüchtern nehmen.|You must not take this tablet on an empty stomach.",
      "dreimal täglich|three times daily|Nehmen Sie die Tropfen dreimal täglich.|Take the drops three times daily.",
      "ein Mittel einnehmen|to take a medicine|Wie lange soll ich das Mittel einnehmen?|How long should I take the medicine?",
      "eine Salbe auftragen|to apply an ointment|Tragen Sie die Salbe dünn auf.|Apply a thin layer of the ointment."
    ]),
    P("A2", 27, "a2-transit-pass", "Buy and show a transit pass", "Choose the right fare and solve a ticket problem.", "Choose a fare zone, activate a ticket, and explain a ticket problem during inspection.", "time prepositions, possessives, and indirect questions", "You buy a monthly pass and then meet a ticket inspector.", [
      "die Monatskarte, die Monatskarten|monthly pass|Eine Monatskarte lohnt sich für mich.|A monthly pass is worthwhile for me.",
      "das Abo, die Abos|subscription|Das Abo verlängert sich automatisch.|The subscription renews automatically.",
      "die Tarifzone, die Tarifzonen|fare zone|Für welche Tarifzonen gilt die Karte?|Which fare zones is the card valid for?",
      "der Entwerter, die Entwerter|ticket validator|Der Entwerter steht neben der Treppe.|The ticket validator is next to the stairs.",
      "die Fahrkartenkontrolle, die Fahrkartenkontrollen|ticket inspection|Im Zug findet eine Fahrkartenkontrolle statt.|A ticket inspection is taking place on the train.",
      "die Ermäßigung, die Ermäßigungen|discount or reduced fare|Gibt es eine Ermäßigung für Auszubildende?|Is there a discount for trainees?",
      "die Chipkarte, die Chipkarten|chip card|Meine Chipkarte wird nicht erkannt.|My chip card is not being recognized.",
      "eine Fahrkarte nachlösen|to buy a ticket after boarding|Kann ich die Fahrkarte im Zug nachlösen?|Can I buy the ticket after boarding?",
      "eine Karte entwerten|to validate a ticket|Diese Karte müssen Sie vor der Fahrt entwerten.|You must validate this ticket before traveling.",
      "etwas vorzeigen|to show or present something|Zeigen Sie bitte Ihren Fahrausweis vor.|Please show your ticket.",
      "bis Ende Juni gültig|valid until the end of June|Mein Abo ist bis Ende Juni gültig.|My subscription is valid until the end of June.",
      "die zusätzliche Gebühr, die zusätzlichen Gebühren|additional fee|Muss ich eine zusätzliche Gebühr bezahlen?|Do I have to pay an additional fee?"
    ]),
    P("A2", 28, "a2-public-library", "Use a public library", "Borrow, renew, reserve, and return media.", "Get a library card, borrow and renew media, and deal with an overdue item.", "separable verbs and time limits with bis or innerhalb", "You register at a library and reserve a checked-out book.", [
      "der Bibliotheksausweis, die Bibliotheksausweise|library card|Für die Ausleihe brauche ich einen Bibliotheksausweis.|I need a library card to borrow items.",
      "die Ausleihe|borrowing or loan service|Die Ausleihe schließt um 18 Uhr.|The loan desk closes at 6 p.m.",
      "die Rückgabe|return|Die Rückgabe ist auch draußen möglich.|Returns are also possible outside.",
      "die Leihfrist, die Leihfristen|loan period|Die Leihfrist beträgt vier Wochen.|The loan period is four weeks.",
      "die Mahngebühr, die Mahngebühren|overdue fee|Leider ist eine Mahngebühr entstanden.|Unfortunately, an overdue fee has been charged.",
      "etwas vormerken|to place a hold on something|Kann ich den Roman vormerken?|Can I place a hold on the novel?",
      "etwas verlängern|to renew something|Ich möchte die Leihfrist online verlängern.|I would like to renew the loan online.",
      "ausgeliehen sein|to be checked out|Das Buch ist bis Dienstag ausgeliehen.|The book is checked out until Tuesday.",
      "etwas zurückgeben|to return something|Wo kann ich die Bücher zurückgeben?|Where can I return the books?",
      "das Sachbuch, die Sachbücher|nonfiction book|Ich suche ein Sachbuch über Ernährung.|I am looking for a nonfiction book about nutrition.",
      "das Hörbuch, die Hörbücher|audiobook|Dieses Hörbuch gibt es auch digital.|This audiobook is also available digitally.",
      "online reservieren|to reserve online|Medien können Sie online reservieren.|You can reserve media online."
    ]),
    P("A2", 29, "a2-accessible-directions", "Give accessible city directions", "Guide someone around a closure and to a step-free entrance.", "Give and follow a route while accounting for closures and step-free access.", "local prepositions and directional imperatives", "You guide a visitor with a stroller around a blocked underpass.", [
      "die Kreuzung, die Kreuzungen|intersection|Gehen Sie bis zur nächsten Kreuzung.|Walk to the next intersection.",
      "die Ampel, die Ampeln|traffic light|Biegen Sie an der Ampel links ab.|Turn left at the traffic light.",
      "die Unterführung, die Unterführungen|underpass|Die Unterführung ist wegen Bauarbeiten gesperrt.|The underpass is closed due to construction.",
      "die Rolltreppe, die Rolltreppen|escalator|Die Rolltreppe fährt gerade nicht.|The escalator is not running right now.",
      "der barrierefreie Zugang, die barrierefreien Zugänge|step-free or accessible entrance|Der barrierefreie Zugang liegt auf der Rückseite.|The accessible entrance is at the back.",
      "die Umleitung, die Umleitungen|detour|Folgen Sie bitte der ausgeschilderten Umleitung.|Please follow the signposted detour.",
      "der Haupteingang, die Haupteingänge|main entrance|Wir treffen uns vor dem Haupteingang.|We are meeting in front of the main entrance.",
      "gegenüber von|across from|Die Apotheke liegt gegenüber vom Rathaus.|The pharmacy is across from city hall.",
      "eine Straße entlanggehen|to walk along a street|Gehen Sie diese Straße etwa 200 Meter entlang.|Walk along this street for about 200 meters.",
      "rechts abbiegen|to turn right|Biegen Sie hinter der Brücke rechts ab.|Turn right after the bridge.",
      "eine Straße überqueren|to cross a street|Überqueren Sie die Straße an der Ampel.|Cross the street at the traffic light.",
      "sich verlaufen|to get lost|Ich glaube, ich habe mich verlaufen.|I think I have gotten lost."
    ]),
    P("A2", 30, "a2-flat-chores", "Share chores in a flat", "Negotiate a rota and address a missed task calmly.", "Negotiate household tasks, make a rota, and address a missed chore without escalation.", "reflexive forms, expectations, and wenn clauses", "Flatmates revise their weekly cleaning plan.", [
      "die WG, die WGs|shared flat|In unserer WG wohnen drei Personen.|Three people live in our shared flat.",
      "der Mitbewohner, die Mitbewohner / die Mitbewohnerin, die Mitbewohnerinnen|flatmate|Meine Mitbewohnerin arbeitet am Wochenende.|My flatmate works on the weekend.",
      "die Aufgabenverteilung, die Aufgabenverteilungen|division of tasks|Wir sollten die Aufgabenverteilung neu besprechen.|We should discuss the division of tasks again.",
      "die Spülmaschine, die Spülmaschinen|dishwasher|Wer räumt heute die Spülmaschine aus?|Who is unloading the dishwasher today?",
      "die Wäsche|laundry|Meine Wäsche hängt noch im Bad.|My laundry is still hanging in the bathroom.",
      "eine Aufgabe tauschen|to swap a task|Können wir diese Woche die Aufgaben tauschen?|Can we swap tasks this week?",
      "abspülen|to wash the dishes|Ich spüle die Töpfe gleich ab.|I will wash the pots right away.",
      "eine Aufgabe nachholen|to make up a task|Ich hole das Putzen morgen nach.|I will make up the cleaning tomorrow.",
      "die Wäsche aufhängen|to hang up laundry|Kannst du später die Wäsche aufhängen?|Can you hang up the laundry later?",
      "Rücksicht nehmen auf|to be considerate of|Wir müssen mehr Rücksicht aufeinander nehmen.|We need to be more considerate of one another.",
      "mit etwas dran sein|for something to be one's turn|Wer ist diese Woche mit dem Bad dran?|Whose turn is it to clean the bathroom this week?",
      "sich abwechseln|to take turns|Wir wechseln uns beim Putzen ab.|We take turns cleaning."
    ]),
    P("A2", 31, "a2-hairdresser", "Explain what you want at a hairdresser", "Describe the result and request a small correction.", "Describe a haircut, use a picture, and request a small correction politely.", "lassen with infinitive and comparatives", "You get a haircut and ask for one side to be adjusted.", [
      "der Friseurtermin, die Friseurtermine|hair appointment|Ich habe um elf einen Friseurtermin.|I have a hair appointment at eleven.",
      "der Haarschnitt, die Haarschnitte|haircut|Ich möchte einen pflegeleichten Haarschnitt.|I would like an easy-care haircut.",
      "die Spitzen|ends or tips of hair|Bitte schneiden Sie nur die Spitzen.|Please cut only the ends.",
      "der Pony, die Ponys|fringe or bangs|Der Pony soll etwas kürzer werden.|The fringe should be a little shorter.",
      "der Bart, die Bärte|beard|Können Sie den Bart auch kürzen?|Can you also trim the beard?",
      "stufig|layered|Ich hätte die Haare gern leicht stufig.|I would like my hair lightly layered.",
      "sich die Haare kürzer schneiden lassen|to have one's hair cut shorter|Ich lasse mir die Haare kürzer schneiden.|I am having my hair cut shorter.",
      "sich die Haare färben lassen|to have one's hair dyed|Meine Schwester lässt sich die Haare dunkelbraun färben.|My sister is having her hair dyed dark brown.",
      "die Haare föhnen|to blow-dry hair|Möchten Sie die Haare geföhnt haben?|Would you like your hair blow-dried?",
      "etwas so lassen|to leave something like that|Oben können Sie es so lassen.|You can leave it like that on top.",
      "ein Foto zeigen|to show a photo|Ich zeige Ihnen ein Foto als Beispiel.|I will show you a photo as an example.",
      "etwas nachbessern|to touch something up|Könnten Sie die linke Seite nachbessern?|Could you adjust the left side?"
    ]),
    P("A2", 32, "a2-phone-voicemail", "Handle a phone call and voicemail", "Reach the right person and leave a complete message.", "Reach the right person, leave a complete message, and understand a callback request.", "formal phone register and separable verbs", "You call an office, reach voicemail, and leave contact details.", [
      "der Anrufbeantworter, die Anrufbeantworter|answering machine or voicemail|Sofort geht der Anrufbeantworter ran.|Voicemail picks up immediately.",
      "eine Nachricht hinterlassen|to leave a message|Möchten Sie eine Nachricht hinterlassen?|Would you like to leave a message?",
      "der Rückruf, die Rückrufe|callback|Ich bitte um einen Rückruf am Nachmittag.|I am asking for a callback in the afternoon.",
      "die Durchwahl, die Durchwahlen|extension or direct number|Kennen Sie die Durchwahl von Frau Arslan?|Do you know Ms. Arslan's extension?",
      "die Leitung, die Leitungen|phone line|Bitte bleiben Sie kurz in der Leitung.|Please stay on the line briefly.",
      "besetzt sein|to be busy or engaged|Die Leitung ist im Moment besetzt.|The line is busy at the moment.",
      "jemanden erreichen|to reach someone|Wann kann ich Herrn Maier am besten erreichen?|When is the best time to reach Mr. Maier?",
      "jemanden verbinden|to put someone through|Ich verbinde Sie mit der Buchhaltung.|I will put you through to accounting.",
      "am Apparat sein|to be on the line|Yilmaz am Apparat, guten Morgen.|Yilmaz speaking, good morning.",
      "falsch verbunden sein|to have the wrong number|Entschuldigung, da sind Sie falsch verbunden.|Sorry, you have the wrong number.",
      "einen Moment dranbleiben|to hold for a moment|Bleiben Sie bitte einen Moment dran.|Please hold for a moment.",
      "es später erneut versuchen|to try again later|Ich versuche es nach der Pause erneut.|I will try again after the break."
    ]),
    P("A2", 33, "a2-online-account", "Manage an online account safely", "Recover access and exchange a file safely.", "Create or recover an account, exchange a file, and recognize a suspicious link.", "command sequences, um zu, and wenn clauses", "You reset access to a portal and upload a requested document.", [
      "das Benutzerkonto, die Benutzerkonten|user account|Mein Benutzerkonto wurde gesperrt.|My user account was locked.",
      "der Benutzername, die Benutzernamen|username|Der Benutzername ist meine E-Mail-Adresse.|The username is my email address.",
      "das Kennwort, die Kennwörter|password|Wählen Sie ein sicheres Kennwort.|Choose a secure password.",
      "der Bestätigungscode, die Bestätigungscodes|verification code|Der Bestätigungscode kommt per SMS.|The verification code arrives by text message.",
      "der Anhang, die Anhänge|attachment|Im Anhang finden Sie das Formular.|You will find the form attached.",
      "die Datei, die Dateien|file|Die Datei darf nicht größer als fünf Megabyte sein.|The file must not be larger than five megabytes.",
      "etwas herunterladen|to download something|Laden Sie die Anleitung herunter.|Download the instructions.",
      "etwas hochladen|to upload something|Ich habe den Ausweis als PDF hochgeladen.|I uploaded the ID as a PDF.",
      "etwas speichern|to save something|Speichern Sie die Änderung vor dem Schließen.|Save the change before closing.",
      "etwas löschen|to delete something|Kann ich dieses alte Dokument löschen?|Can I delete this old document?",
      "etwas zurücksetzen|to reset something|Über diesen Link können Sie das Kennwort zurücksetzen.|You can reset the password through this link.",
      "der verdächtige Link, die verdächtigen Links|suspicious link|Klicken Sie nicht auf einen verdächtigen Link.|Do not click a suspicious link."
    ]),
    P("A2", 34, "a2-airport-transfer", "Move through an airport", "Check in, follow instructions, and protect a connection.", "Check in, follow baggage and security instructions, and protect a connecting flight.", "directional prepositions and disruption language", "You check a bag and find a changed departure gate.", [
      "das Terminal, die Terminals|terminal|Unser Flug startet jetzt an Terminal zwei.|Our flight now departs from terminal two.",
      "die Abflugtafel, die Abflugtafeln|departure board|Auf der Abflugtafel steht eine neue Uhrzeit.|The departure board shows a new time.",
      "die Ankunft, die Ankünfte|arrival|Die Ankunft verzögert sich um dreißig Minuten.|Arrival is delayed by thirty minutes.",
      "die mobile Bordkarte, die mobilen Bordkarten|mobile boarding pass|Meine mobile Bordkarte lässt sich nicht öffnen.|My mobile boarding pass will not open.",
      "das Gepäck|luggage|Wie viel Gepäck darf ich mitnehmen?|How much luggage may I take?",
      "der Flüssigkeitsbeutel, die Flüssigkeitsbeutel|liquids bag|Die kleinen Behälter gehören in den Flüssigkeitsbeutel.|The small containers belong in the liquids bag.",
      "die Sicherheitskontrolle, die Sicherheitskontrollen|security screening|Vor der Sicherheitskontrolle ist eine lange Schlange.|There is a long line before security.",
      "das Abfluggate, die Abfluggates|departure gate|Das Abfluggate wurde auf B18 geändert.|The departure gate was changed to B18.",
      "der Check-in-Schalter, die Check-in-Schalter|check-in counter|Welcher Check-in-Schalter ist für unseren Flug zuständig?|Which check-in counter handles our flight?",
      "der Gepäckanhänger, die Gepäckanhänger|baggage tag|Bitte bewahren Sie den Gepäckanhänger auf.|Please keep the baggage tag.",
      "die Passkontrolle, die Passkontrollen|passport control|Nach der Passkontrolle geht es nach rechts.|After passport control, go to the right.",
      "der Anschlussflug, die Anschlussflüge|connecting flight|Wir müssen unseren Anschlussflug erreichen.|We need to catch our connecting flight."
    ]),
    P("A2", 35, "a2-online-order", "Resolve an online-order problem", "Identify the problem and request a clear remedy.", "Identify an order, describe the exact problem, and request cancellation, replacement, or refund.", "perfect tense and customer-service clauses with weil or dass", "You contact support about an incomplete shipment.", [
      "die Bestellung, die Bestellungen|order|Meine Bestellung ist gestern angekommen.|My order arrived yesterday.",
      "die Bestellnummer, die Bestellnummern|order number|Die Bestellnummer steht in der E-Mail.|The order number is in the email.",
      "der Lieferstatus|delivery status|Der Lieferstatus hat sich seit Montag nicht geändert.|The delivery status has not changed since Monday.",
      "die Lieferadresse, die Lieferadressen|delivery address|Leider ist die Lieferadresse falsch.|Unfortunately, the delivery address is wrong.",
      "die Falschlieferung, die Falschlieferungen|incorrect delivery|Ich möchte eine Falschlieferung melden.|I would like to report an incorrect delivery.",
      "ein Teil fehlt|an item or part is missing|Im Paket fehlt ein Teil.|One item is missing from the parcel.",
      "das Rücksendeetikett, die Rücksendeetiketten|return label|Bitte schicken Sie mir ein Rücksendeetikett.|Please send me a return label.",
      "die Ersatzware|replacement goods|Wann wird die Ersatzware versandt?|When will the replacement goods be sent?",
      "eine Bestellung stornieren|to cancel an order|Kann ich die Bestellung noch stornieren?|Can I still cancel the order?",
      "eine Ware reklamieren|to complain about faulty goods|Ich muss den defekten Wasserkocher reklamieren.|I need to complain about the faulty kettle.",
      "den Kaufpreis erstatten|to refund the purchase price|Der Händler wird den Kaufpreis erstatten.|The seller will refund the purchase price.",
      "der Kundendienst|customer service|Der Kundendienst antwortet innerhalb eines Tages.|Customer service replies within one day."
    ]),
    P("A2", 36, "a2-community-notices", "Read community notices and act", "Extract the key details and required action.", "Extract who, what, when, where, and required action from local notices.", "time and cause prepositions with fronted details", "You use a building noticeboard to plan around services and local events.", [
      "der Aushang, die Aushänge|posted notice|Im Eingang hängt ein neuer Aushang.|A new notice is posted in the entrance.",
      "das schwarze Brett, die schwarzen Bretter|noticeboard|Die Information steht am schwarzen Brett.|The information is on the noticeboard.",
      "die Bürgersprechstunde, die Bürgersprechstunden|public consultation hour|Die Bürgersprechstunde beginnt um 16 Uhr.|The public consultation hour begins at 4 p.m.",
      "die Nachbarschaftshilfe|neighborhood assistance|Die Nachbarschaftshilfe sucht weitere Helfer.|The neighborhood assistance group is looking for more helpers.",
      "der Flohmarkt, die Flohmärkte|flea market|Am Sonntag findet ein Flohmarkt statt.|A flea market takes place on Sunday.",
      "die Sperrmüllabholung, die Sperrmüllabholungen|bulky-waste collection|Für die Sperrmüllabholung ist eine Buchung nötig.|A booking is required for bulky-waste collection.",
      "der Baustellenhinweis, die Baustellenhinweise|construction notice|Beachten Sie bitte den Baustellenhinweis.|Please note the construction notice.",
      "kurzfristig|at short notice|Der Termin wurde kurzfristig geändert.|The appointment was changed at short notice.",
      "wegen Bauarbeiten|due to construction work|Wegen Bauarbeiten bleibt der Hof geschlossen.|The courtyard remains closed due to construction work.",
      "stattfinden|to take place|Wo findet die Beratung statt?|Where does the consultation take place?",
      "etwas anbieten|to offer something|Das Jugendzentrum bietet einen Computerkurs an.|The youth center offers a computer course.",
      "sich unter einer Nummer melden|to contact someone at a number|Interessierte melden sich unter dieser Nummer.|Interested people should call this number."
    ]),
    P("B1", 13, "b1-employment-contract", "Understand an employment contract", "Read the terms before you sign.", "Identify key contract terms, compare gross and net pay, and ask precise questions before signing.", "passive formulations, participial adjectives, and conditional clauses", "You review a first employment contract with an HR representative.", [
      "der Arbeitsvertrag, die Arbeitsverträge|employment contract|Ich möchte den Arbeitsvertrag in Ruhe lesen.|I would like to read the employment contract carefully.",
      "die Probezeit, die Probezeiten|probationary period|Die Probezeit dauert sechs Monate.|The probationary period lasts six months.",
      "das Bruttogehalt, die Bruttogehälter|gross salary|Im Vertrag steht das jährliche Bruttogehalt.|The annual gross salary is stated in the contract.",
      "das Nettogehalt, die Nettogehälter|net salary|Das Nettogehalt hängt von mehreren Abzügen ab.|Net salary depends on several deductions.",
      "die Lohnabrechnung, die Lohnabrechnungen|payslip|Bitte prüfen Sie Ihre Lohnabrechnung.|Please check your payslip.",
      "die Überstunde, die Überstunden|hour of overtime|Wie werden Überstunden erfasst?|How are overtime hours recorded?",
      "der Freizeitausgleich|time off in lieu|Für die Mehrarbeit bekomme ich Freizeitausgleich.|I receive time off in lieu for the extra work.",
      "der Urlaubsanspruch|vacation entitlement|Mein Urlaubsanspruch beträgt dreißig Tage.|My vacation entitlement is thirty days.",
      "die Kündigungsfrist, die Kündigungsfristen|notice period|Welche Kündigungsfrist gilt während der Probezeit?|What notice period applies during probation?",
      "befristet|fixed-term|Die Stelle ist zunächst auf ein Jahr befristet.|The position is initially fixed-term for one year.",
      "entfristet|made permanent|Nach einem Jahr wurde der Vertrag entfristet.|After one year, the contract was made permanent.",
      "Urlaub beantragen|to request vacation|Urlaub muss im System beantragt werden.|Vacation must be requested in the system."
    ]),
    P("B1", 14, "b1-workplace-incident", "Report a workplace safety incident", "Secure the area and document what happened.", "Secure an area, give a chronological account, and complete an incident report.", "pluperfect, process passive, and sequencing with nachdem or bevor", "A colleague slips near a leaking machine.", [
      "der Arbeitsunfall, die Arbeitsunfälle|workplace accident|Der Arbeitsunfall geschah kurz vor Schichtende.|The workplace accident happened shortly before the end of the shift.",
      "die Sicherheitsvorschrift, die Sicherheitsvorschriften|safety regulation|Diese Sicherheitsvorschrift gilt für alle Beschäftigten.|This safety regulation applies to all employees.",
      "die Schutzausrüstung|protective equipment|Im Lager muss Schutzausrüstung getragen werden.|Protective equipment must be worn in the warehouse.",
      "der Gefahrstoff, die Gefahrstoffe|hazardous substance|Der Behälter enthält einen Gefahrstoff.|The container contains a hazardous substance.",
      "der Unfallbericht, die Unfallberichte|accident report|Ich habe den Unfallbericht noch am selben Tag ausgefüllt.|I completed the accident report that same day.",
      "der Zeuge, die Zeugen / die Zeugin, die Zeuginnen|witness|Zwei Zeuginnen haben den Vorfall gesehen.|Two witnesses saw the incident.",
      "der Vorgesetzte, die Vorgesetzten / die Vorgesetzte, die Vorgesetzten|supervisor|Informieren Sie sofort Ihre Vorgesetzte.|Inform your supervisor immediately.",
      "den Arbeitsbereich absichern|to secure the work area|Zuerst wurde der Arbeitsbereich abgesichert.|First the work area was secured.",
      "ausrutschen|to slip|Der Mitarbeiter ist auf dem nassen Boden ausgerutscht.|The employee slipped on the wet floor.",
      "sich verletzen|to injure oneself|Zum Glück hat sich niemand schwer verletzt.|Fortunately, no one was seriously injured.",
      "die Ursache feststellen|to determine the cause|Eine Prüfung soll die Ursache feststellen.|An inspection is intended to determine the cause.",
      "einen Vorfall melden|to report an incident|Jeder Vorfall muss der Leitung gemeldet werden.|Every incident must be reported to management."
    ]),
    P("B1", 15, "b1-structured-meeting", "Participate in a structured meeting", "Follow the agenda and record clear decisions.", "Follow an agenda, make an intervention, handle an objection, and confirm decisions in minutes.", "reported speech, decision passive, and noun-verb collocations", "A team meeting reallocates responsibilities.", [
      "die Tagesordnung, die Tagesordnungen|agenda|Die Tagesordnung wurde gestern verschickt.|The agenda was sent yesterday.",
      "der Tagesordnungspunkt, die Tagesordnungspunkte|agenda item|Beim dritten Tagesordnungspunkt geht es um Personal.|The third agenda item concerns staffing.",
      "das Protokoll, die Protokolle|minutes|Wer schreibt heute das Protokoll?|Who is taking the minutes today?",
      "der Beschluss, die Beschlüsse|resolution or decision|Der Beschluss gilt ab dem nächsten Monat.|The decision applies from next month.",
      "die Wortmeldung, die Wortmeldungen|request to speak or contribution|Ich habe noch eine Wortmeldung.|I still have a point to contribute.",
      "der Einwand, die Einwände|objection|Gegen diesen Zeitplan gibt es einen Einwand.|There is an objection to this schedule.",
      "etwas vertagen|to postpone something|Wir vertagen die Entscheidung bis Dienstag.|We are postponing the decision until Tuesday.",
      "das Wort ergreifen|to take the floor|Danach ergriff die Projektleiterin das Wort.|The project manager then took the floor.",
      "etwas zur Sprache bringen|to raise a topic|Ich möchte ein organisatorisches Problem zur Sprache bringen.|I would like to raise an organizational problem.",
      "eine Entscheidung treffen|to make a decision|Heute müssen wir eine Entscheidung treffen.|We need to make a decision today.",
      "ein Ergebnis festhalten|to record an outcome|Bitte halten Sie das Ergebnis im Protokoll fest.|Please record the outcome in the minutes.",
      "ein Protokoll genehmigen|to approve minutes|Das Protokoll wird in der nächsten Sitzung genehmigt.|The minutes will be approved at the next meeting."
    ]),
    P("B1", 16, "b1-constructive-feedback", "Give and receive constructive feedback", "Name the behavior, hear the response, and agree on a change.", "Describe a concrete behavior, explain its effect, hear the other perspective, and agree on a change.", "polite Konjunktiv II and perspective frames", "You address tension caused by interruptions and unclear handovers.", [
      "das Feedback|feedback|Darf ich Ihnen kurz Feedback geben?|May I give you brief feedback?",
      "das Missverständnis, die Missverständnisse|misunderstanding|Das Missverständnis entstand bei der Übergabe.|The misunderstanding arose during the handover.",
      "die Erwartung, die Erwartungen|expectation|Wir sollten unsere Erwartungen klarer besprechen.|We should discuss our expectations more clearly.",
      "die Arbeitsweise, die Arbeitsweisen|way of working|Unsere Arbeitsweisen unterscheiden sich etwas.|Our ways of working differ somewhat.",
      "der Tonfall, die Tonfälle|tone of voice|Der Tonfall wirkte auf mich sehr scharf.|The tone sounded very harsh to me.",
      "konstruktiv|constructive|Trotz der Kritik blieb das Gespräch konstruktiv.|Despite the criticism, the conversation remained constructive.",
      "nachvollziehbar|understandable|Ihre Reaktion ist für mich nachvollziehbar.|Your reaction is understandable to me.",
      "Kritik äußern|to express criticism|Kritik sollte möglichst konkret geäußert werden.|Criticism should be expressed as concretely as possible.",
      "jemanden unterbrechen|to interrupt someone|Mir ist aufgefallen, dass wir uns oft unterbrechen.|I noticed that we often interrupt each other.",
      "etwas offen klären|to clarify something openly|Können wir das Problem offen klären?|Can we clarify the problem openly?",
      "Verantwortung übernehmen|to take responsibility|Ich übernehme Verantwortung für meinen Fehler.|I take responsibility for my mistake.",
      "künftig|in future|Künftig bestätigen wir Änderungen schriftlich.|In future we will confirm changes in writing."
    ]),
    P("B1", 17, "b1-qualification-recognition", "Have a qualification recognized", "Find the office, assemble evidence, and follow the procedure.", "Identify the responsible body, assemble evidence, and understand possible next steps.", "procedure passive, genitive, and administrative compounds", "You seek recognition of a foreign vocational credential.", [
      "der Berufsabschluss, die Berufsabschlüsse|vocational qualification|Mein Berufsabschluss stammt aus Spanien.|My vocational qualification is from Spain.",
      "das Anerkennungsverfahren, die Anerkennungsverfahren|recognition procedure|Das Anerkennungsverfahren kann mehrere Monate dauern.|The recognition procedure can take several months.",
      "die beglaubigte Kopie, die beglaubigten Kopien|certified copy|Für den Antrag brauche ich eine beglaubigte Kopie.|I need a certified copy for the application.",
      "die Übersetzung, die Übersetzungen|translation|Die Übersetzung muss von einer anerkannten Stelle kommen.|The translation must come from a recognized provider.",
      "die Anerkennungsstelle, die Anerkennungsstellen|recognition authority|Welche Anerkennungsstelle ist für meinen Beruf zuständig?|Which recognition authority is responsible for my profession?",
      "der Antrag, die Anträge|application|Den Antrag können Sie digital stellen.|You can submit the application digitally.",
      "die Bearbeitungszeit, die Bearbeitungszeiten|processing time|Die aktuelle Bearbeitungszeit beträgt zwölf Wochen.|The current processing time is twelve weeks.",
      "der Qualifikationsnachweis, die Qualifikationsnachweise|proof of qualification|Bitte fügen Sie alle Qualifikationsnachweise bei.|Please attach all proof of qualifications.",
      "einen Abschluss anerkennen lassen|to have a qualification recognized|Ich möchte meinen Abschluss anerkennen lassen.|I would like to have my qualification recognized.",
      "fehlende Dokumente ergänzen|to add missing documents|Sie können fehlende Dokumente später ergänzen.|You can add missing documents later.",
      "einen Anpassungskurs absolvieren|to complete a required adaptation course|Möglicherweise muss ich einen Anpassungskurs absolvieren.|I may have to complete an adaptation course.",
      "sich beraten lassen|to seek advisory support|Vor dem Antrag lasse ich mich beraten.|I will seek advice before applying."
    ]),
    P("B1", 18, "b1-consumer-rights", "Use consumer rights", "Choose the remedy and make a supported demand.", "Distinguish warranty options and make a supported written demand after a defective purchase.", "relative clauses and formal conditions with falls or sofern", "A recently purchased appliance fails twice.", [
      "die Gewährleistung|statutory warranty|Für neue Ware gilt eine gesetzliche Gewährleistung.|New goods have a statutory warranty.",
      "die Garantie, die Garantien|commercial guarantee|Die Garantie des Herstellers dauert zwei Jahre.|The manufacturer's guarantee lasts two years.",
      "das Widerrufsrecht|right of withdrawal|Beim Onlinekauf besteht häufig ein Widerrufsrecht.|Online purchases often include a right of withdrawal.",
      "der Kaufvertrag, die Kaufverträge|purchase contract|Mit der Zahlung wurde ein Kaufvertrag geschlossen.|A purchase contract was formed with the payment.",
      "der Defekt, die Defekte|defect|Der gleiche Defekt ist erneut aufgetreten.|The same defect has occurred again.",
      "die Ersatzlieferung, die Ersatzlieferungen|replacement delivery|Ich bitte um eine kostenfreie Ersatzlieferung.|I request a free replacement delivery.",
      "die Nachbesserung, die Nachbesserungen|repair or remedial performance|Die erste Nachbesserung war erfolglos.|The first repair attempt was unsuccessful.",
      "die Verbraucherzentrale, die Verbraucherzentralen|consumer advice center|Die Verbraucherzentrale bietet unabhängige Beratung.|The consumer advice center offers independent advice.",
      "einen Vertrag widerrufen|to withdraw from a contract|Ich möchte den Vertrag fristgerecht widerrufen.|I would like to withdraw from the contract within the deadline.",
      "vom Kauf zurücktreten|to withdraw from a purchase|Falls die Reparatur scheitert, trete ich vom Kauf zurück.|If the repair fails, I will withdraw from the purchase.",
      "einen Anspruch geltend machen|to assert a claim|Der Kunde macht seinen Anspruch schriftlich geltend.|The customer asserts his claim in writing.",
      "sich etwas schriftlich bestätigen lassen|to have something confirmed in writing|Lassen Sie sich die Zusage schriftlich bestätigen.|Have the assurance confirmed in writing."
    ]),
    P("B1", 19, "b1-banking-fraud", "Respond to banking fraud", "Secure access and give the bank a clear timeline.", "Identify suspicious activity, secure access, and give the bank a clear timeline.", "past-tense chronology, passive actions, and reported instructions", "A phishing message is followed by an unfamiliar debit.", [
      "der Betrug, die Betrugsfälle|fraud|Die Bank warnt vor einem neuen Betrugsfall.|The bank warns about a new fraud case.",
      "die Phishing-Nachricht, die Phishing-Nachrichten|phishing message|Die Phishing-Nachricht sah täuschend echt aus.|The phishing message looked deceptively genuine.",
      "die verdächtige Abbuchung, die verdächtigen Abbuchungen|suspicious debit|Auf dem Kontoauszug steht eine verdächtige Abbuchung.|There is a suspicious debit on the bank statement.",
      "der Kontoauszug, die Kontoauszüge|bank statement|Kontrollieren Sie regelmäßig Ihre Kontoauszüge.|Check your bank statements regularly.",
      "die Zugangsdaten|login credentials|Geben Sie niemals Ihre Zugangsdaten weiter.|Never pass on your login credentials.",
      "die TAN, die TANs|transaction authentication number|Die Bank fragt am Telefon nie nach einer TAN.|The bank never asks for a TAN on the phone.",
      "die Bankverbindung, die Bankverbindungen|bank details|Meine Bankverbindung wurde missbraucht.|My bank details were misused.",
      "der Identitätsdiebstahl|identity theft|Bei Identitätsdiebstahl ist schnelles Handeln wichtig.|Quick action is important in cases of identity theft.",
      "eine Karte sperren lassen|to have a card blocked|Ich habe meine Karte sofort sperren lassen.|I had my card blocked immediately.",
      "einer Buchung widersprechen|to dispute a transaction|Dieser Buchung möchte ich widersprechen.|I would like to dispute this transaction.",
      "eine Rückbuchung veranlassen|to arrange a reversal|Die Bank hat eine Rückbuchung veranlasst.|The bank arranged a reversal.",
      "unverzüglich reagieren|to respond immediately|Betroffene sollten unverzüglich reagieren.|Those affected should respond immediately."
    ]),
    P("B1", 20, "b1-insurance-claim", "Make an insurance claim", "Document the event and respond to the decision.", "Determine likely coverage, document an event, and respond to an insurer's decision.", "causal clauses, process passive, and formal chronology", "Water from your washing machine damages a neighbor's ceiling.", [
      "der Versicherungsschutz|insurance coverage|Bitte prüfen Sie Ihren Versicherungsschutz.|Please check your insurance coverage.",
      "die private Haftpflichtversicherung|personal liability insurance|Die private Haftpflichtversicherung prüft den Schaden.|The personal liability insurer is examining the damage.",
      "die Hausratversicherung|household contents insurance|Die Hausratversicherung schützt bewegliche Gegenstände.|Household contents insurance protects movable belongings.",
      "der Versicherungsfall, die Versicherungsfälle|insured event|Der Versicherungsfall trat am Samstag ein.|The insured event occurred on Saturday.",
      "die Schadensmeldung, die Schadensmeldungen|claim notification|Die Schadensmeldung kann online erfolgen.|The claim can be reported online.",
      "die Versicherungsnummer, die Versicherungsnummern|insurance policy number|Geben Sie bitte Ihre Versicherungsnummer an.|Please provide your insurance policy number.",
      "die Selbstbeteiligung|deductible|Die Selbstbeteiligung beträgt 150 Euro.|The deductible is 150 euros.",
      "der Kostenvoranschlag, die Kostenvoranschläge|cost estimate|Die Versicherung verlangt einen Kostenvoranschlag.|The insurer requires a cost estimate.",
      "den Hergang schildern|to describe how something happened|Schildern Sie den Hergang möglichst genau.|Describe what happened as precisely as possible.",
      "Fotos beifügen|to attach photos|Der Meldung habe ich drei Fotos beigefügt.|I attached three photos to the notification.",
      "von der Versicherung abgedeckt sein|to be covered by insurance|Ist dieser Wasserschaden abgedeckt?|Is this water damage covered?",
      "die Kostenübernahme ablehnen|to deny coverage|Der Versicherer hat die Kostenübernahme abgelehnt.|The insurer denied coverage."
    ]),
    P("B1", 21, "b1-tax-return", "Complete a basic tax return", "Recognize the documents and understand the result.", "Recognize core tax documents, report common expenses, and interpret whether money is due or returned.", "nominalizations, passive calculations, and conditional obligations", "You prepare an employee tax return and read the resulting notice.", [
      "die Steuererklärung, die Steuererklärungen|tax return|Ich reiche die Steuererklärung online ein.|I submit the tax return online.",
      "die Steuer-ID, die Steuer-IDs|tax identification number|Die Steuer-ID bleibt dauerhaft gleich.|The tax ID remains the same permanently.",
      "das Finanzamt, die Finanzämter|tax office|Das Finanzamt hat eine Rückfrage gestellt.|The tax office asked a follow-up question.",
      "das steuerpflichtige Einkommen|taxable income|Das steuerpflichtige Einkommen wird automatisch berechnet.|Taxable income is calculated automatically.",
      "die Werbungskosten|work-related tax expenses|Fahrtkosten können zu den Werbungskosten gehören.|Travel costs can count as work-related expenses.",
      "der Steuerbescheid, die Steuerbescheide|tax assessment notice|Der Steuerbescheid kam gestern per Post.|The tax assessment notice arrived by post yesterday.",
      "die Nachzahlung, die Nachzahlungen|additional payment|Laut Bescheid ist eine Nachzahlung fällig.|According to the notice, an additional payment is due.",
      "die Steuerrückzahlung, die Steuerrückzahlungen|tax refund|Die Steuerrückzahlung wurde bereits überwiesen.|The tax refund has already been transferred.",
      "etwas steuerlich absetzen|to deduct something for tax purposes|Kann ich das Arbeitszimmer steuerlich absetzen?|Can I deduct the home office for tax purposes?",
      "eine Ausgabe angeben|to declare an expense|Diese Ausgabe müssen Sie in der Anlage N angeben.|You must declare this expense in Annex N.",
      "etwas elektronisch übermitteln|to transmit something electronically|Die Daten werden elektronisch übermittelt.|The data are transmitted electronically.",
      "zur Abgabe verpflichtet sein|to be required to file|Nicht alle Beschäftigten sind zur Abgabe verpflichtet.|Not all employees are required to file."
    ]),
    P("B1", 22, "b1-energy-provider", "Compare energy providers", "Compare the whole contract and verify the switch.", "Compare total contract conditions, switch providers, and check the first annual statement.", "comparatives, superlatives, and future passive processes", "You decide whether a cheaper-looking electricity plan is actually better.", [
      "der Energieanbieter, die Energieanbieter|energy provider|Unser Energieanbieter erhöht die Preise.|Our energy provider is raising prices.",
      "die Grundversorgung|default or basic supply|Nach dem Umzug waren wir zunächst in der Grundversorgung.|After moving, we were initially on default supply.",
      "der monatliche Abschlag, die monatlichen Abschläge|monthly advance payment|Der monatliche Abschlag wird im April angepasst.|The monthly advance payment will be adjusted in April.",
      "die Jahresabrechnung, die Jahresabrechnungen|annual bill|Prüfen Sie den Zählerstand auf der Jahresabrechnung.|Check the meter reading on the annual bill.",
      "die Preisgarantie, die Preisgarantien|price guarantee|Die Preisgarantie gilt nur für zwölf Monate.|The price guarantee applies for only twelve months.",
      "die Vertragslaufzeit, die Vertragslaufzeiten|contract term|Dieser Tarif hat eine kurze Vertragslaufzeit.|This plan has a short contract term.",
      "die Kündigungsbestätigung, die Kündigungsbestätigungen|cancellation confirmation|Die Kündigungsbestätigung fehlt noch.|The cancellation confirmation is still missing.",
      "der Tarifvergleich, die Tarifvergleiche|plan comparison|Beim Tarifvergleich zählen auch Zusatzkosten.|Additional costs also count in a plan comparison.",
      "den Anbieter wechseln|to switch providers|Wir möchten zum Jahresende den Anbieter wechseln.|We want to switch providers at the end of the year.",
      "den Preis erhöhen|to raise the price|Der Anbieter darf den Preis nicht ohne Mitteilung erhöhen.|The provider may not raise the price without notice.",
      "das Guthaben, die Guthaben|credit balance|Das Guthaben wird im nächsten Monat ausgezahlt.|The credit will be paid out next month.",
      "wirksam werden|to take effect|Der neue Vertrag wird am ersten Juli wirksam.|The new contract takes effect on July 1."
    ]),
    P("B1", 23, "b1-school-progress", "Discuss school progress", "Ask for examples and agree on realistic support.", "Understand teacher feedback, ask for examples, and agree on realistic support.", "reported speech, sollte recommendations, and relative clauses", "A parent-teacher conference addresses concentration and missed material.", [
      "der Lernfortschritt, die Lernfortschritte|learning progress|Die Lehrerin sieht deutliche Lernfortschritte.|The teacher sees clear learning progress.",
      "die schulische Leistung, die schulischen Leistungen|academic performance|Seine schulischen Leistungen haben sich verbessert.|His academic performance has improved.",
      "der Förderbedarf|need for additional support|In Mathematik besteht noch Förderbedarf.|Additional support is still needed in mathematics.",
      "die Klassenleitung, die Klassenleitungen|class teacher|Die Klassenleitung lädt zum Gespräch ein.|The class teacher invites the parents to a meeting.",
      "die Schulpflicht|compulsory schooling|In Deutschland gilt grundsätzlich die Schulpflicht.|Compulsory schooling generally applies in Germany.",
      "die entschuldigte Fehlzeit, die entschuldigten Fehlzeiten|excused absence|Die entschuldigten Fehlzeiten stehen im Bericht.|The excused absences are listed in the report.",
      "die Versetzung, die Versetzungen|promotion to the next grade|Die Versetzung ist derzeit nicht gefährdet.|Promotion to the next grade is not currently at risk.",
      "sich besser konzentrieren|to concentrate better|In einer ruhigen Umgebung kann sich das Kind besser konzentrieren.|The child can concentrate better in a quiet environment.",
      "Lernstoff aufholen|to catch up on material|Das Kind muss den versäumten Lernstoff aufholen.|The child must catch up on the material it missed.",
      "eine Entwicklung beobachten|to observe a development|Wir sollten die Entwicklung sechs Wochen beobachten.|We should observe the development for six weeks.",
      "konkrete Unterstützung vereinbaren|to agree on specific support|Schule und Eltern vereinbaren konkrete Unterstützung.|The school and parents agree on specific support.",
      "eine Empfehlung aussprechen|to make a recommendation|Die Lehrkraft spricht eine klare Empfehlung aus.|The teacher makes a clear recommendation."
    ]),
    P("B1", 24, "b1-relative-care", "Organize support for a relative", "Compare options and divide responsibilities safely.", "Compare home-care options, ask about eligibility, and divide responsibilities safely.", "lassen with infinitive, purpose clauses, and conditions", "Siblings arrange temporary support after a parent's operation.", [
      "der Pflegegrad, die Pflegegrade|care level|Für bestimmte Leistungen ist ein Pflegegrad nötig.|A care level is required for certain benefits.",
      "die Pflegekasse, die Pflegekassen|long-term care insurance fund|Die Pflegekasse bietet eine kostenlose Beratung.|The care insurance fund offers free advice.",
      "die ambulante Pflege|home nursing care|Die ambulante Pflege kommt zweimal pro Woche.|Home nursing care comes twice a week.",
      "die Tagespflege|adult day care|Die Tagespflege entlastet Angehörige tagsüber.|Adult day care relieves relatives during the day.",
      "die Haushaltshilfe, die Haushaltshilfen|household helper|Vorübergehend brauchen wir eine Haushaltshilfe.|We temporarily need a household helper.",
      "die Vorsorgevollmacht, die Vorsorgevollmachten|health and welfare power of attorney|Eine Vorsorgevollmacht sollte schriftlich vorliegen.|A power of attorney should be available in writing.",
      "der Angehörige, die Angehörigen / die Angehörige, die Angehörigen|relative or family caregiver|Pflegende Angehörige brauchen ebenfalls Unterstützung.|Family caregivers also need support.",
      "das Entlastungsangebot, die Entlastungsangebote|respite or support service|Welche Entlastungsangebote gibt es vor Ort?|What respite services are available locally?",
      "jemanden zu Hause versorgen|to care for someone at home|Die Familie versorgt den Vater zunächst zu Hause.|The family initially cares for the father at home.",
      "jemanden bei etwas unterstützen|to support someone with something|Wir unterstützen sie beim Einkaufen.|We support her with grocery shopping.",
      "sich vertreten lassen|to have someone act on one's behalf|Mit einer Vollmacht kann er sich vertreten lassen.|With a power of attorney, he can have someone act for him.",
      "Aufgaben untereinander aufteilen|to divide tasks among one another|Die Geschwister teilen die Aufgaben untereinander auf.|The siblings divide the tasks among themselves."
    ]),
    P("B1", 25, "b1-civic-concern", "Present a local civic concern", "Explain who is affected and propose a feasible change.", "Understand a public proposal, present affected residents' concerns, and recommend a feasible change.", "relative clauses, contrast, and Konjunktiv II proposals", "You speak at a public meeting about a planned road project.", [
      "die Bürgerinitiative, die Bürgerinitiativen|citizens' initiative|Eine Bürgerinitiative setzt sich für sichere Radwege ein.|A citizens' initiative campaigns for safe cycle paths.",
      "der Stadtrat, die Stadträte|city council|Der Stadtrat entscheidet im Juni über das Projekt.|The city council will decide on the project in June.",
      "die Petition, die Petitionen|petition|Die Petition hat bereits tausend Unterschriften.|The petition already has one thousand signatures.",
      "die öffentliche Sitzung, die öffentlichen Sitzungen|public meeting|Die öffentliche Sitzung beginnt um 18 Uhr.|The public meeting begins at 6 p.m.",
      "das Anliegen, die Anliegen|concern or request|Ich möchte unser Anliegen kurz erläutern.|I would like to briefly explain our concern.",
      "der Verkehrslärm|traffic noise|Der Verkehrslärm belastet viele Anwohnende.|Traffic noise burdens many residents.",
      "die Grünfläche, die Grünflächen|green space|Durch das Projekt würde eine Grünfläche verschwinden.|A green space would disappear because of the project.",
      "das Bauvorhaben, die Bauvorhaben|construction project|Das Bauvorhaben umfasst sechzig Wohnungen.|The construction project includes sixty apartments.",
      "die Stellungnahme, die Stellungnahmen|formal statement or comment|Die Stadt veröffentlicht alle Stellungnahmen.|The city publishes all submitted comments.",
      "Unterschriften sammeln|to collect signatures|Die Gruppe sammelt Unterschriften gegen die Schließung.|The group is collecting signatures against the closure.",
      "sich an einem Verfahren beteiligen|to participate in a process|Bürger können sich online am Verfahren beteiligen.|Citizens can participate in the process online.",
      "von etwas betroffen sein|to be affected by something|Besonders Familien sind von der Änderung betroffen.|Families are especially affected by the change."
    ]),
    P("B1", 26, "b1-witness-account", "Give a witness account", "Separate what you observed from what you assume.", "Describe people and events in sequence, distinguish observation from assumption, and check the written record.", "Präteritum, pluperfect, and reported speech", "You give police a statement after witnessing a break-in.", [
      "die Zeugenaussage, die Zeugenaussagen|witness statement|Meine Zeugenaussage wurde schriftlich aufgenommen.|My witness statement was recorded in writing.",
      "der Tatort, die Tatorte|crime scene|Die Polizei sperrte den Tatort ab.|The police cordoned off the crime scene.",
      "der Täter, die Täter / die Täterin, die Täterinnen|perpetrator|Den Täter konnte ich nur von hinten sehen.|I could only see the perpetrator from behind.",
      "das Opfer, die Opfer|victim|Das Opfer war zum Zeitpunkt des Einbruchs nicht zu Hause.|The victim was not home at the time of the break-in.",
      "der Einbruch, die Einbrüche|burglary|Der Einbruch ereignete sich gegen Mitternacht.|The burglary occurred around midnight.",
      "das Kennzeichen, die Kennzeichen|license plate|Vom Kennzeichen erkannte ich nur die ersten Buchstaben.|I recognized only the first letters of the license plate.",
      "jemanden beobachten|to observe someone|Ich beobachtete eine Person am Hintereingang.|I observed a person at the rear entrance.",
      "jemanden wiedererkennen|to recognize someone again|Ich bin nicht sicher, ob ich die Person wiedererkennen würde.|I am not sure whether I would recognize the person again.",
      "fliehen|to flee|Danach floh die Person in Richtung Park.|The person then fled toward the park.",
      "sich am Ort befinden|to be present at the location|Zu diesem Zeitpunkt befand ich mich an der Bushaltestelle.|At that time, I was at the bus stop.",
      "genaue Angaben machen|to provide precise details|Bitte machen Sie nur Angaben, bei denen Sie sicher sind.|Please provide only details you are sure about.",
      "etwas zu Protokoll geben|to state something for the record|Ich möchte ergänzend etwas zu Protokoll geben.|I would like to add something for the record."
    ]),
    P("B1", 27, "b1-severe-weather", "Prepare for severe weather and outages", "Evaluate a warning and relay clear safety instructions.", "Evaluate an official warning, prepare essential supplies, and relay safety instructions.", "passive warnings, conditions, and purpose clauses", "A storm warning may cause flooding and a power outage.", [
      "die Warnmeldung, die Warnmeldungen|official warning|Die Warnmeldung gilt bis morgen früh.|The warning is in effect until tomorrow morning.",
      "das Unwetter, die Unwetter|severe weather|Für die Nacht wird ein schweres Unwetter erwartet.|Severe weather is expected overnight.",
      "das Hochwasser|flooding or high water|Mehrere Straßen sind wegen Hochwassers gesperrt.|Several streets are closed due to flooding.",
      "der Stromausfall, die Stromausfälle|power outage|Der Stromausfall dauerte fast drei Stunden.|The power outage lasted almost three hours.",
      "die Evakuierung, die Evakuierungen|evacuation|Die Evakuierung des Viertels wurde angeordnet.|The evacuation of the neighborhood was ordered.",
      "die Notunterkunft, die Notunterkünfte|emergency shelter|In der Turnhalle wurde eine Notunterkunft eingerichtet.|An emergency shelter was set up in the gym.",
      "der Vorrat, die Vorräte|supply or stock|Legen Sie einen kleinen Vorrat an Trinkwasser an.|Keep a small supply of drinking water.",
      "die Taschenlampe, die Taschenlampen|flashlight|Eine Taschenlampe gehört in den Notfallvorrat.|A flashlight belongs in emergency supplies.",
      "die Warn-App, die Warn-Apps|emergency warning app|Über die Warn-App erhalten wir aktuelle Hinweise.|We receive current information through the warning app.",
      "Schutz suchen|to seek shelter|Bei Hagel sollten Sie in einem Gebäude Schutz suchen.|During hail, you should seek shelter in a building.",
      "ein Gebäude verlassen|to leave a building|Verlassen Sie das Gebäude über die markierten Wege.|Leave the building using the marked routes.",
      "Anweisungen befolgen|to follow instructions|Befolgen Sie die Anweisungen der Einsatzkräfte.|Follow the emergency crews' instructions."
    ]),
    P("B1", 28, "b1-mental-health-support", "Seek mental-health support", "Describe a sustained problem and identify the next step.", "Describe a sustained problem, ask about confidentiality and waiting times, and identify an urgent next step.", "seit with present tense and indirect questions", "You contact a counseling center after sleep and concentration problems persist.", [
      "die psychische Belastung, die psychischen Belastungen|psychological strain|Die psychische Belastung hat in den letzten Wochen zugenommen.|The psychological strain has increased in recent weeks.",
      "das Beratungsgespräch, die Beratungsgespräche|counseling appointment|Das erste Beratungsgespräch ist kostenlos.|The first counseling appointment is free.",
      "der Therapieplatz, die Therapieplätze|therapy place|Einen Therapieplatz zu finden, kann dauern.|Finding a therapy place can take time.",
      "die Wartezeit, die Wartezeiten|waiting time|Wie lang ist die aktuelle Wartezeit?|How long is the current waiting time?",
      "die akute Krise, die akuten Krisen|acute crisis|In einer akuten Krise erhalten Sie sofort Hilfe.|In an acute crisis, you receive immediate help.",
      "die Schlafstörung, die Schlafstörungen|sleep disorder|Seit einem Monat habe ich starke Schlafstörungen.|I have had severe sleep problems for a month.",
      "erschöpft sein|to feel exhausted|Nach der Arbeit bin ich völlig erschöpft.|I am completely exhausted after work.",
      "sich zurückziehen|to withdraw socially|In letzter Zeit ziehe ich mich häufig zurück.|Recently, I have often been withdrawing.",
      "Hilfe annehmen|to accept help|Es fällt mir schwer, Hilfe anzunehmen.|I find it difficult to accept help.",
      "einen Termin vermittelt bekommen|to be referred to an appointment|Über die Hotline wurde mir ein Termin vermittelt.|I was referred to an appointment through the hotline.",
      "vertraulich behandelt werden|to be treated confidentially|Werden meine Angaben vertraulich behandelt?|Will my information be treated confidentially?",
      "sich stabilisieren|to stabilize or recover|Eine feste Tagesstruktur kann helfen, sich zu stabilisieren.|A regular daily routine can help one stabilize."
    ]),
    P("B1", 29, "b1-food-labels", "Read food labels for dietary needs", "Find the relevant information and ask precise questions.", "Locate relevant label information, ask precise allergy questions, and compare suitable options.", "fixed prepositions, passive labeling, and relative clauses", "You choose food safely for a guest with an intolerance.", [
      "die Nährwertangabe, die Nährwertangaben|nutrition information|Die Nährwertangaben beziehen sich auf 100 Gramm.|The nutrition information refers to 100 grams.",
      "die Zutatenliste, die Zutatenlisten|ingredient list|Zucker steht an zweiter Stelle der Zutatenliste.|Sugar is second on the ingredient list.",
      "das Allergen, die Allergene|allergen|Allergene sind im Text hervorgehoben.|Allergens are highlighted in the text.",
      "die Unverträglichkeit, die Unverträglichkeiten|intolerance|Wegen meiner Unverträglichkeit meide ich Milchprodukte.|I avoid dairy products because of my intolerance.",
      "Spuren von|traces of|Das Produkt kann Spuren von Nüssen enthalten.|The product may contain traces of nuts.",
      "vegan|vegan|Ist die Soße wirklich vegan?|Is the sauce really vegan?",
      "ausgewogen|balanced|Eine ausgewogene Mahlzeit enthält mehrere Lebensmittelgruppen.|A balanced meal contains several food groups.",
      "die Portion, die Portionen|serving or portion|Eine Portion entspricht ungefähr 250 Gramm.|One serving is approximately 250 grams.",
      "auf etwas verzichten|to avoid or go without something|Ich muss vollständig auf Erdnüsse verzichten.|I have to avoid peanuts completely.",
      "auf etwas achten|to pay attention to something|Beim Einkauf achte ich auf versteckten Zucker.|When shopping, I pay attention to hidden sugar.",
      "etwas eindeutig kennzeichnen|to label something clearly|Speisen mit Allergenen müssen eindeutig gekennzeichnet sein.|Foods with allergens must be clearly labeled.",
      "etwas nicht vertragen|to be unable to tolerate something|Mein Sohn verträgt keine Laktose.|My son cannot tolerate lactose."
    ]),
    P("B1", 30, "b1-cultural-review", "Discuss and review a cultural event", "Summarize the work and support a balanced recommendation.", "Summarize content, describe its effect, and support a balanced recommendation.", "evaluative adjectives, relative clauses, and contrast", "You write and discuss a review after a local exhibition or performance.", [
      "die Ausstellung, die Ausstellungen|exhibition|Die Ausstellung zeigt Fotografien aus den 1980er-Jahren.|The exhibition shows photographs from the 1980s.",
      "die Aufführung, die Aufführungen|performance|Die Aufführung dauerte knapp zwei Stunden.|The performance lasted just under two hours.",
      "die Lesung, die Lesungen|public reading|Nach der Lesung beantwortete der Autor Fragen.|After the reading, the author answered questions.",
      "der Veranstaltungsort, die Veranstaltungsorte|venue|Der Veranstaltungsort ist gut mit der Bahn erreichbar.|The venue is easy to reach by train.",
      "das Programmheft, die Programmhefte|program booklet|Im Programmheft stehen Hintergrundinformationen.|The program booklet contains background information.",
      "die Handlung, die Handlungen|plot or action|Die Handlung entwickelt sich langsam.|The plot develops slowly.",
      "die Darstellung, die Darstellungen|portrayal or presentation|Besonders überzeugend war die Darstellung der Hauptfigur.|The portrayal of the main character was especially convincing.",
      "beeindruckend|impressive|Die Lichtgestaltung war beeindruckend.|The lighting design was impressive.",
      "enttäuschend|disappointing|Das abrupte Ende fand ich enttäuschend.|I found the abrupt ending disappointing.",
      "empfehlenswert|worthwhile|Für Familien ist die Ausstellung sehr empfehlenswert.|The exhibition is highly recommended for families.",
      "sich mit einem Thema auseinandersetzen|to engage critically with a topic|Das Stück setzt sich mit sozialer Ungleichheit auseinander.|The play engages with social inequality.",
      "einen Eindruck hinterlassen|to leave an impression|Die Musik hat einen starken Eindruck hinterlassen.|The music left a strong impression."
    ]),
    P("B1", 31, "b1-digital-privacy", "Protect digital privacy", "Interpret permissions and evaluate a privacy claim.", "Interpret permissions and consent, adjust settings, and evaluate a privacy claim.", "passive data processes and reported claims", "You review a free app that requests extensive access.", [
      "der Datenschutz|data protection or privacy|Beim Datenschutz gelten klare Regeln.|Clear rules apply to data protection.",
      "die Privatsphäre|privacy|Diese Einstellung schützt Ihre Privatsphäre.|This setting protects your privacy.",
      "die Nutzungsbedingung, die Nutzungsbedingungen|terms of service|Ich habe die wichtigsten Nutzungsbedingungen gelesen.|I read the most important terms of service.",
      "die Einwilligung, die Einwilligungen|consent|Die Einwilligung muss freiwillig erfolgen.|Consent must be given voluntarily.",
      "die App-Berechtigung, die App-Berechtigungen|app permission|Die App verlangt eine Berechtigung für den Standort.|The app requests location permission.",
      "der Algorithmus, die Algorithmen|algorithm|Ein Algorithmus wählt die angezeigten Beiträge aus.|An algorithm selects the displayed posts.",
      "die personalisierte Werbung|personalized advertising|Personalisierte Werbung basiert auf Nutzungsdaten.|Personalized advertising is based on usage data.",
      "die personenbezogenen Daten|personal data|Personenbezogene Daten dürfen nicht beliebig weitergegeben werden.|Personal data may not be shared arbitrarily.",
      "Daten verarbeiten|to process data|Der Dienst verarbeitet Daten auf Servern in Europa.|The service processes data on servers in Europe.",
      "eine Einwilligung widerrufen|to withdraw consent|Sie können Ihre Einwilligung jederzeit widerrufen.|You can withdraw your consent at any time.",
      "Einstellungen anpassen|to adjust settings|Ich habe die Datenschutzeinstellungen angepasst.|I adjusted the privacy settings.",
      "ein Konto schützen|to protect an account|Eine Zwei-Faktor-Authentifizierung schützt das Konto besser.|Two-factor authentication protects the account better."
    ]),
    P("B1", 32, "b1-charts-percentages", "Interpret charts and percentages", "Describe the data without overstating the result.", "Describe a chart accurately, compare groups, and separate visible data from explanation.", "comparatives, nominalized trends, and cautious interpretation", "You present survey results without overstating what they prove.", [
      "das Balkendiagramm, die Balkendiagramme|bar chart|Das Balkendiagramm vergleicht vier Altersgruppen.|The bar chart compares four age groups.",
      "der Anteil, die Anteile|proportion or share|Der Anteil stieg auf 42 Prozent.|The share rose to 42 percent.",
      "die Mehrheit, die Mehrheiten|majority|Eine knappe Mehrheit bevorzugt flexible Zeiten.|A narrow majority prefers flexible hours.",
      "die Minderheit, die Minderheiten|minority|Nur eine kleine Minderheit wählte die dritte Option.|Only a small minority chose the third option.",
      "der Zeitraum, die Zeiträume|period|Die Daten beziehen sich auf einen Zeitraum von fünf Jahren.|The data cover a period of five years.",
      "der Anstieg, die Anstiege|increase or rise|Der stärkste Anstieg erfolgte im Frühjahr.|The strongest increase occurred in spring.",
      "der Rückgang, die Rückgänge|decline or decrease|Seit Juni ist ein leichter Rückgang zu sehen.|A slight decline has been visible since June.",
      "der Durchschnitt, die Durchschnitte|average|Der Durchschnitt liegt bei 3,8 Stunden.|The average is 3.8 hours.",
      "der Prozentpunkt, die Prozentpunkte|percentage point|Der Wert nahm um fünf Prozentpunkte zu.|The value increased by five percentage points.",
      "schwanken|to fluctuate|Die Zahlen schwanken von Monat zu Monat.|The figures fluctuate from month to month.",
      "im Vergleich zu|compared with|Im Vergleich zum Vorjahr ist der Wert niedriger.|Compared with the previous year, the value is lower.",
      "daraus geht hervor, dass|this shows that|Daraus geht hervor, dass die Nutzung zunimmt.|This shows that usage is increasing."
    ]),
    P("B1", 33, "b1-payment-notice", "Respond to a court payment order", "Check the claim and protect the response deadline.", "Identify the claim, file number, and service date, then pay, seek advice, or lodge a timely objection.", "formal legal collocations, passive notices, and deadline conditions", "A court payment order arrives for a claim that you partly dispute.", [
      "der Mahnbescheid, die Mahnbescheide|court payment order|Heute wurde mir ein Mahnbescheid zugestellt.|A court payment order was served on me today.",
      "die Forderung, die Forderungen|claim or amount demanded|Die Forderung besteht aus Hauptbetrag, Zinsen und Kosten.|The claim consists of the principal amount, interest, and costs.",
      "das Aktenzeichen, die Aktenzeichen|reference or file number|Bitte geben Sie in jedem Schreiben das Aktenzeichen an.|Please include the file number in every letter.",
      "das Zustelldatum, die Zustelldaten|date of service|Ich notiere das Zustelldatum auf der Kopie.|I note the date of service on the copy.",
      "der Antragsteller, die Antragsteller / die Antragstellerin, die Antragstellerinnen|claimant|Der Antragsteller ist im Mahnbescheid genannt.|The claimant is named in the court payment order.",
      "die Widerspruchsfrist, die Widerspruchsfristen|objection period|Die Widerspruchsfrist beginnt mit der Zustellung.|The objection period begins when the order is served.",
      "die Teilforderung, die Teilforderungen|part of a claim|Einen Teil der Forderung erkenne ich an.|I accept part of the claim.",
      "einen Mahnbescheid prüfen|to check a court payment order|Prüfen Sie Namen, Betrag und Aktenzeichen sofort.|Check the names, amount, and file number immediately.",
      "Widerspruch einlegen|to lodge an objection|Gegen den strittigen Teil lege ich fristgerecht Widerspruch ein.|I lodge a timely objection to the disputed part.",
      "das Widerspruchsformular ausfüllen|to complete the objection form|Ich fülle das Widerspruchsformular sorgfältig aus.|I complete the objection form carefully.",
      "Rechtsberatung suchen|to seek legal advice|Bei Unsicherheit suche ich rechtzeitig Rechtsberatung.|If I am unsure, I seek legal advice promptly.",
      "fristgerecht reagieren|to respond within the deadline|Auf den Mahnbescheid reagiere ich fristgerecht.|I respond to the court payment order within the deadline."
    ]),
    P("B1", 34, "b1-rental-car", "Rent and return a car", "Inspect the vehicle and document a return dispute.", "Inspect a vehicle, understand core rental conditions, and document a dispute at return.", "participial adjectives, conditions, and passive handover language", "You collect a rental car with existing scratches and return it after a breakdown.", [
      "der Mietwagen, die Mietwagen|rental car|Unser Mietwagen steht auf Parkplatz zwölf.|Our rental car is in parking space twelve.",
      "die Mietstation, die Mietstationen|rental location|Die Mietstation am Bahnhof schließt um 20 Uhr.|The rental location at the station closes at 8 p.m.",
      "die Tankregelung, die Tankregelungen|fuel policy|Laut Tankregelung muss das Auto voll zurückkommen.|According to the fuel policy, the car must be returned full.",
      "der Kilometerstand, die Kilometerstände|odometer reading|Notieren Sie den Kilometerstand bei der Übergabe.|Note the mileage at handover.",
      "der Vollkaskoschutz|comprehensive insurance cover|Der Vollkaskoschutz deckt viele Schäden am Mietwagen ab.|Comprehensive cover includes many kinds of damage to the rental car.",
      "der Kautionsbetrag, die Kautionsbeträge|security deposit amount|Der Kautionsbetrag wird auf der Kreditkarte reserviert.|The deposit amount is reserved on the credit card.",
      "der Vorschaden, die Vorschäden|pre-existing damage|Dieser Kratzer ist als Vorschaden eingetragen.|This scratch is recorded as pre-existing damage.",
      "der Rückgabeort, die Rückgabeorte|return location|Können wir einen anderen Rückgabeort wählen?|Can we choose a different return location?",
      "der Zusatzfahrer, die Zusatzfahrer / die Zusatzfahrerin, die Zusatzfahrerinnen|additional driver|Ein Zusatzfahrer kostet zehn Euro pro Tag.|An additional driver costs ten euros per day.",
      "auftanken|to refuel|Vor der Rückgabe müssen wir noch auftanken.|We still need to refuel before returning the car.",
      "einen Kratzer dokumentieren|to document a scratch|Ich habe den Kratzer mit Fotos dokumentiert.|I documented the scratch with photos.",
      "der Pannendienst, die Pannendienste|roadside assistance|Bei einer Panne rufen Sie den Pannendienst an.|In case of a breakdown, call roadside assistance."
    ]),
    P("B1", 35, "b1-rental-move-out", "Complete a rental move-out", "Document handover and pursue the deposit.", "Terminate a tenancy, prepare the property, document handover, and pursue the deposit.", "temporal clauses, process passive, and participial adjectives", "You leave an apartment and disagree about its documented condition.", [
      "die Wohnungsübergabe, die Wohnungsübergaben|apartment handover|Die Wohnungsübergabe findet am letzten Miettag statt.|The apartment handover takes place on the final rental day.",
      "das Zustandsprotokoll, die Zustandsprotokolle|condition report|Beide Seiten unterschreiben das Zustandsprotokoll.|Both parties sign the condition report.",
      "die Kautionsabrechnung, die Kautionsabrechnungen|deposit statement|Die Kautionsabrechnung muss nachvollziehbar sein.|The deposit statement must be understandable.",
      "die Schönheitsreparatur, die Schönheitsreparaturen|cosmetic repair|Nicht jede Schönheitsreparatur ist automatisch Pflicht.|Not every cosmetic repair is automatically required.",
      "die Schlüsselübergabe, die Schlüsselübergaben|key handover|Bei der Schlüsselübergabe fehlte ein Kellerschlüssel.|One basement key was missing at the key handover.",
      "das Kündigungsschreiben, die Kündigungsschreiben|termination letter|Das Kündigungsschreiben wurde per Einschreiben versandt.|The termination letter was sent by registered mail.",
      "das Auszugsdatum, die Auszugsdaten|move-out date|Bitte bestätigen Sie das Auszugsdatum schriftlich.|Please confirm the move-out date in writing.",
      "besenrein|swept clean|Laut Vertrag ist die Wohnung besenrein zu übergeben.|According to the contract, the apartment must be handed over swept clean.",
      "der Nachmieter, die Nachmieter / die Nachmieterin, die Nachmieterinnen|replacement tenant|Wir haben bereits eine geeignete Nachmieterin vorgeschlagen.|We have already proposed a suitable replacement tenant.",
      "eine Wohnung abnehmen|to inspect and accept an apartment|Die Verwaltung nimmt die Wohnung am Freitag ab.|The management will inspect the apartment on Friday.",
      "die Rückzahlung verlangen|to request repayment|Nach sechs Monaten verlangten wir die Rückzahlung der Kaution.|After six months, we requested repayment of the deposit.",
      "fristgerecht räumen|to vacate on time|Die Räume wurden fristgerecht geräumt.|The premises were vacated on time."
    ]),
    P("B1", 36, "b1-trustworthy-advice", "Find trustworthy local advice", "Choose the right service and relay the next steps.", "Identify the right advisory service, judge basic credibility, and relay the next steps to another person.", "indirect questions, relative clauses, and referral language", "You compare local services for debt, migration, and social-benefit questions.", [
      "die Beratungsstelle, die Beratungsstellen|advisory center|Die Beratungsstelle vergibt Termine telefonisch.|The advisory center schedules appointments by phone.",
      "das Erstgespräch, die Erstgespräche|initial consultation|Zum Erstgespräch bringen Sie alle Briefe mit.|Bring all letters to the initial consultation.",
      "die Sprechzeiten|consultation or opening hours|Die aktuellen Sprechzeiten stehen auf der Webseite.|The current consultation hours are on the website.",
      "die Zuständigkeit, die Zuständigkeiten|responsibility or jurisdiction|Vorab sollte die Zuständigkeit geklärt werden.|Responsibility should be clarified in advance.",
      "die Weitervermittlung, die Weitervermittlungen|referral to another service|Falls nötig, erfolgt eine Weitervermittlung.|If necessary, a referral will be made.",
      "die Sozialberatung, die Sozialberatungen|social-services advice|Die Sozialberatung informiert über mögliche Leistungen.|Social-services advice provides information about possible benefits.",
      "die Schuldnerberatung, die Schuldnerberatungen|debt counseling|Eine anerkannte Schuldnerberatung hilft beim Haushaltsplan.|A recognized debt counseling service helps with a household budget.",
      "die Migrationsberatung, die Migrationsberatungen|migration counseling|Die Migrationsberatung erklärt behördliche Schreiben.|Migration counseling explains official letters.",
      "einen Bedarf schildern|to describe a need|Am Telefon schildere ich kurz meinen Bedarf.|I briefly describe my need on the phone.",
      "an die richtige Stelle verweisen|to refer someone to the right office|Die Mitarbeiterin verwies mich an die richtige Stelle.|The employee referred me to the right office.",
      "das Impressum prüfen|to check a site's legal notice|Bei unbekannten Angeboten prüfe ich zuerst das Impressum.|For unfamiliar services, I check the legal notice first.",
      "ein seriöses Angebot erkennen|to recognize a trustworthy service|Klare Kostenangaben helfen, ein seriöses Angebot zu erkennen.|Clear cost information helps identify a trustworthy service."
    ]),
    P("A0", 18, "a0-sound-spelling", "Ask about spelling", "Spell names and places and ask about unfamiliar writing.", "Spell an unfamiliar name or street, request clarification, and confirm spaces, hyphens, umlauts, and ß.", "letter groups, umlauts, and noun capitalization", "A registration worker checks an unfamiliar surname and street name.", [
      "der Buchstabe, die Buchstaben|letter|Welcher Buchstabe fehlt?|Which letter is missing?",
      "buchstabieren|to spell aloud|Können Sie den Namen bitte buchstabieren?|Can you spell the name, please?",
      "aussprechen, spricht aus|to pronounce|Wie spricht man „München“ aus?|How do you pronounce Munich?",
      "Wie schreibt man das?|How do you write that?|Wie schreibt man Ihren Nachnamen?|How do you write your surname?",
      "Man schreibt das mit ...|You write that with ...|Man schreibt „Straße“ mit ß.|You write Straße with ß.",
      "der Umlaut, die Umlaute|umlaut|Ö ist ein Umlaut.|Ö is an umlaut.",
      "das Eszett|the letter ß|In „groß“ steht ein Eszett.|The word groß contains an Eszett.",
      "der Bindestrich, die Bindestriche|hyphen|Der Straßenname hat einen Bindestrich.|The street name has a hyphen.",
      "das Leerzeichen, die Leerzeichen|space|Zwischen den Namen steht ein Leerzeichen.|There is a space between the names.",
      "doppelt|double|Das Wort hat ein doppeltes n.|The word has a double n.",
      "großgeschrieben|capitalized|Der Nachname wird großgeschrieben.|The surname is capitalized.",
      "ß oder ss|ß or ss|Schreibt man das mit ß oder ss?|Do you write that with ß or ss?"
    ]),
    P("A0", 7, "a0-follow-lesson", "Follow the lesson", "Understand the instructions that guide practice.", "Understand the most common classroom and app instructions and say whether a task is finished.", "formal command chunks and noch for unfinished work", "You work through a German lesson using short classroom and app instructions.", [
      "Hören Sie zu.|Listen.|Hören Sie zu und wählen Sie die Antwort.|Listen and choose the answer.",
      "Sprechen Sie nach.|Repeat aloud.|Sprechen Sie den Satz langsam nach.|Repeat the sentence slowly.",
      "Lesen Sie laut.|Read aloud.|Lesen Sie den Dialog laut.|Read the dialogue aloud.",
      "Schreiben Sie den Satz.|Write the sentence.|Schreiben Sie den Satz in das Feld.|Write the sentence in the field.",
      "Kreuzen Sie an.|Tick the box.|Kreuzen Sie die richtige Antwort an.|Tick the correct answer.",
      "Ordnen Sie zu.|Match the items.|Ordnen Sie die Wörter den Bildern zu.|Match the words to the pictures.",
      "Ergänzen Sie.|Complete the item.|Ergänzen Sie das fehlende Wort.|Complete the missing word.",
      "Wählen Sie aus.|Choose.|Wählen Sie eine Antwort aus.|Choose an answer.",
      "Klicken Sie auf ...|Click on ...|Klicken Sie auf „Weiter“.|Click Continue.",
      "Öffnen Sie ...|Open ...|Öffnen Sie das Buch auf Seite zehn.|Open the book to page ten.",
      "Schließen Sie ...|Close ...|Schließen Sie das Fenster.|Close the window.",
      "fertig / noch nicht fertig|finished or unfinished|Ich bin noch nicht fertig.|I am not finished yet."
    ]),
    P("A0", 8, "a0-question-words", "Ask the right question", "Find the person, place, time, price, or reason.", "Select and use the main question words needed for basic information.", "question words, finite verbs, and question punctuation", "You ask an information-desk worker for a person, place, time, price, and reason.", [
      "wer|who|Wer ist das?|Who is that?",
      "was|what|Was bedeutet dieses Wort?|What does this word mean?",
      "wo|where|Wo ist Raum zwölf?|Where is room twelve?",
      "wohin|where to|Wohin fährt der Bus?|Where is the bus going?",
      "woher|where from|Woher kommen Sie?|Where are you from?",
      "wann|when|Wann beginnt der Kurs?|When does the course begin?",
      "wie|how|Wie funktioniert das?|How does that work?",
      "wie viel|how much|Wie viel kostet die Karte?|How much does the ticket cost?",
      "warum|why|Warum ist das Büro geschlossen?|Why is the office closed?",
      "welcher / welche / welches|which|Welcher Bus fährt ins Zentrum?|Which bus goes to the city center?",
      "Ist das ...?|Is that ...?|Ist das der Eingang?|Is that the entrance?",
      "Gibt es ...?|Is there or are there ...?|Gibt es hier eine Toilette?|Is there a toilet here?"
    ]),
    P("A0", 14, "a0-prices-amounts", "Numbers, prices, and amounts", "Read prices and confirm a simple total.", "Understand numbers through 100, say common prices, and confirm an amount.", "compound numbers, euro and cent, and the decimal comma", "You read a price board and pay for a simple item.", [
      "dreizehn bis neunzehn|thirteen through nineteen|Das Zimmer kostet neunzehn Euro.|The room costs nineteen euros.",
      "zwanzig, dreißig, vierzig, fünfzig|twenty, thirty, forty, fifty|Der Kurs beginnt um zwanzig Uhr.|The course begins at eight p.m.",
      "sechzig, siebzig, achtzig, neunzig|sixty, seventy, eighty, ninety|Die Fahrkarte kostet sechzig Euro.|The ticket costs sixty euros.",
      "hundert|one hundred|Das Formular hat die Nummer hundert.|The form has number one hundred.",
      "einundzwanzig|twenty-one|Ich bin einundzwanzig Jahre alt.|I am twenty-one years old.",
      "der Euro, die Euro|euro|Das kostet acht Euro.|That costs eight euros.",
      "der Cent, die Cent|cent|Das kostet neunzig Cent.|That costs ninety cents.",
      "Wie viel kostet ...?|How much does ... cost?|Wie viel kostet das Heft?|How much does the notebook cost?",
      "Das kostet ...|That costs ...|Das kostet zwölf Euro fünfzig.|That costs twelve euros fifty.",
      "Das macht ...|The total is ...|Das macht zusammen vierzehn Euro.|The total is fourteen euros.",
      "ungefähr|approximately|Es kostet ungefähr dreißig Euro.|It costs approximately thirty euros.",
      "günstig / teuer|inexpensive or expensive|Das Ticket ist günstig.|The ticket is inexpensive."
    ]),
    P("A0", 13, "a0-dates-calendar", "Dates and calendars", "Put a day, month, and date on the calendar.", "Read and say weekdays, months, simple dates, and nearby calendar references.", "ordinal date chunks and am or im", "You add a course appointment and a personal event to a calendar.", [
      "Montag bis Freitag|Monday through Friday|Der Kurs ist von Montag bis Freitag.|The course is from Monday through Friday.",
      "der Samstag / der Sonntag|Saturday or Sunday|Am Sonntag ist das Büro geschlossen.|The office is closed on Sunday.",
      "Januar / Februar / März|January, February, March|Der Kurs läuft von Januar bis März.|The course runs from January through March.",
      "April / Mai / Juni|April, May, June|Der Termin ist im Juni.|The appointment is in June.",
      "Juli / August / September|July, August, September|Im August habe ich Urlaub.|I have vacation in August.",
      "Oktober / November / Dezember|October, November, December|Der Markt beginnt im November.|The market begins in November.",
      "das Datum, die Daten|date|Bitte schreiben Sie das Datum.|Please write the date.",
      "Welches Datum ist heute?|What is today's date?|Welches Datum ist heute, bitte?|What is today's date, please?",
      "Heute ist der ...|Today is the ...|Heute ist der fünfte Mai.|Today is May fifth.",
      "am ersten / zweiten / dritten|on the first, second, or third|Der Termin ist am dritten Juni.|The appointment is on June third.",
      "im Mai|in May|Mein Kurs beginnt im Mai.|My course begins in May.",
      "nächste Woche|next week|Nächste Woche habe ich Zeit.|I have time next week."
    ]),
    P("A0", 11, "a0-basic-needs", "State a basic need", "Ask for food, water, a seat, or a pause.", "Ask for food, drink, a toilet, power, a seat, or a short pause.", "brauchen, möchten, and basic accusative forms", "You manage immediate needs during a long journey or public appointment.", [
      "Ich brauche ...|I need ...|Ich brauche einen Stift.|I need a pen.",
      "Ich möchte ...|I would like ...|Ich möchte einen Tee.|I would like a tea.",
      "Kann ich ... bekommen?|Can I get ...?|Kann ich ein Glas Wasser bekommen?|Can I get a glass of water?",
      "Darf ich ...?|May I ...?|Darf ich hier sitzen?|May I sit here?",
      "etwas zu trinken|something to drink|Ich brauche etwas zu trinken.|I need something to drink.",
      "etwas zu essen|something to eat|Gibt es hier etwas zu essen?|Is there something to eat here?",
      "eine Toilette|a toilet|Wo finde ich eine Toilette?|Where can I find a toilet?",
      "eine Steckdose|a power outlet|Gibt es hier eine Steckdose?|Is there a power outlet here?",
      "einen Sitzplatz|a seat|Ich brauche einen Sitzplatz.|I need a seat.",
      "Können wir eine Pause machen?|Can we take a break?|Können wir kurz eine Pause machen?|Can we take a short break?",
      "einen Moment|a moment|Einen Moment, bitte.|One moment, please.",
      "kein Problem|no problem|Ja, kein Problem.|Yes, no problem."
    ]),
    P("A0", 9, "a0-people-pronouns", "People and pronouns", "Say who is present and replace names with pronouns.", "Identify people in a small group and replace names with the correct basic pronoun.", "third-person pronouns and present-tense endings", "You meet a course group and say who is present.", [
      "er|he|Er kommt aus Bonn.|He comes from Bonn.",
      "sie (eine Person)|she|Sie wohnt in Köln.|She lives in Cologne.",
      "es|it|Es ist neu.|It is new.",
      "wir|we|Wir lernen Deutsch.|We are learning German.",
      "ihr|you, informal plural|Ihr seid heute hier.|You are here today.",
      "sie (mehrere Personen)|they|Sie sprechen Englisch.|They speak English.",
      "jemand|someone|Jemand wartet vor der Tür.|Someone is waiting by the door.",
      "niemand|no one|Niemand ist im Raum.|No one is in the room.",
      "alle|everyone or all|Alle sind jetzt da.|Everyone is here now.",
      "Wer ist das?|Who is that?|Wer ist das neben Mia?|Who is that next to Mia?",
      "Das sind ...|These are ...|Das sind Alex und Noor.|These are Alex and Noor.",
      "zusammen|together|Wir sind zusammen im Kurs.|We are in the course together."
    ]),
    P("A0", 10, "a0-core-actions", "Core actions", "Describe what people are doing now.", "Describe what someone is doing now with a small set of highly productive verbs.", "present-tense endings and verb-second statements", "You describe activity in a station, classroom, or waiting area.", [
      "gehen, ich gehe, du gehst|to go or walk|Ich gehe jetzt nach Hause.|I am going home now.",
      "kommen, ich komme, du kommst|to come|Kommst du morgen?|Are you coming tomorrow?",
      "machen, ich mache, du machst|to do or make|Was machst du gerade?|What are you doing right now?",
      "essen, ich esse, du isst|to eat|Sie isst ein Brötchen.|She is eating a bread roll.",
      "trinken, ich trinke, du trinkst|to drink|Wir trinken Kaffee.|We are drinking coffee.",
      "lesen, ich lese, du liest|to read|Er liest die Nachricht.|He is reading the message.",
      "sehen, ich sehe, du siehst|to see|Ich sehe den Bus.|I see the bus.",
      "warten auf|to wait for|Wir warten auf den Kurs.|We are waiting for the course.",
      "suchen|to look for|Ich suche meine Brille.|I am looking for my glasses.",
      "finden|to find|Sie findet den Schlüssel.|She finds the key.",
      "sitzen|to sit|Die Frau sitzt am Fenster.|The woman is sitting by the window.",
      "bleiben|to stay|Ich bleibe heute hier.|I am staying here today."
    ]),
    P("A0", 12, "a0-negate-correct", "Negate and correct", "Repair simple wrong information and continue the exchange.", "Reject, correct, and clarify simple information without ending the exchange.", "nicht, kein, doch, and sondern", "You correct errors on a form and clarify a mistaken appointment.", [
      "nicht|not|Ich wohne nicht in Berlin.|I do not live in Berlin.",
      "kein / keine|no or not a|Das ist keine Telefonnummer.|That is not a phone number.",
      "keinen|no, masculine accusative|Ich habe keinen Termin.|I do not have an appointment.",
      "noch nicht|not yet|Der Kurs beginnt noch nicht.|The course has not begun yet.",
      "nicht mehr|no longer|Die Nummer funktioniert nicht mehr.|The number no longer works.",
      "nie|never|Ich arbeite nie am Sonntag.|I never work on Sunday.",
      "Nein.|No.|Nein, das ist Raum zwölf.|No, that is room twelve.",
      "Doch.|Yes, actually.|Kommst du heute nicht? Doch.|Are you not coming today? Yes, I am.",
      "Das stimmt.|That is correct.|Ja, das stimmt.|Yes, that is correct.",
      "Das stimmt nicht.|That is incorrect.|Die Adresse stimmt nicht.|The address is incorrect.",
      "sondern|but rather|Der Termin ist nicht am Dienstag, sondern am Mittwoch.|The appointment is not on Tuesday; it is on Wednesday.",
      "aber|but|Die Nummer ist richtig, aber die Adresse ist falsch.|The number is correct, but the address is wrong."
    ]),
    P("A0", 15, "a0-body-comfort", "Body state and comfort", "Say how you feel and ask for a pause.", "Express hunger, thirst, temperature, tiredness, discomfort, and the need for a pause.", "adjectives with sein and fixed mir ist expressions", "You speak up during a lesson, trip, or long wait.", [
      "hungrig sein|to be hungry|Ich bin hungrig.|I am hungry.",
      "durstig sein|to be thirsty|Nach dem Kurs bin ich durstig.|I am thirsty after the course.",
      "müde sein|to be tired|Wir sind heute müde.|We are tired today.",
      "Mir ist kalt.|I am cold.|Kannst du das Fenster schließen? Mir ist kalt.|Can you close the window? I am cold.",
      "Mir ist warm.|I am warm.|Mir ist hier sehr warm.|I am very warm here.",
      "Mir geht es nicht gut.|I do not feel well.|Entschuldigung, mir geht es nicht gut.|Excuse me, I do not feel well.",
      "Alles okay?|Is everything okay?|Du bist sehr still. Alles okay?|You are very quiet. Is everything okay?",
      "Ich brauche eine Pause.|I need a break.|Ich brauche kurz eine Pause.|I need a short break.",
      "Ich muss zur Toilette.|I need to use the toilet.|Entschuldigung, ich muss zur Toilette.|Excuse me, I need to use the toilet.",
      "Ich möchte mich hinsetzen.|I would like to sit down.|Ich bin müde und möchte mich hinsetzen.|I am tired and would like to sit down.",
      "jetzt|now|Ich brauche jetzt Wasser.|I need water now.",
      "später|later|Wir machen später eine Pause.|We will take a break later."
    ]),
    P("A0", 16, "a0-building-signs", "Signs inside a building", "Find the entrance, room, floor, or reception point.", "Find an entrance, exit, room, reception point, floor, or stairway.", "locations with im, floor numbers, and wo questions", "You navigate a course center or municipal building.", [
      "der Eingang, die Eingänge|entrance|Der Eingang ist links.|The entrance is on the left.",
      "der Ausgang, die Ausgänge|exit|Der Ausgang ist dort.|The exit is over there.",
      "das Erdgeschoss|ground floor|Die Information ist im Erdgeschoss.|The information desk is on the ground floor.",
      "der Stock, die Stockwerke|floor or story|Der Kurs ist im zweiten Stock.|The course is on the second floor.",
      "die Treppe, die Treppen|stairs|Die Treppe ist neben dem Eingang.|The stairs are next to the entrance.",
      "der Raum, die Räume|room|Raum fünf ist oben.|Room five is upstairs.",
      "die Anmeldung, die Anmeldungen|registration desk|Bitte gehen Sie zuerst zur Anmeldung.|Please go to the registration desk first.",
      "oben|upstairs or above|Die Toiletten sind oben.|The toilets are upstairs.",
      "unten|downstairs or below|Der Ausgang ist unten.|The exit is downstairs.",
      "links / rechts|left or right|Der Raum ist rechts.|The room is on the right.",
      "Wo ist ...?|Where is ...?|Wo ist die Anmeldung?|Where is the registration desk?",
      "im ersten Stock|on the first floor|Die Praxis ist im ersten Stock.|The medical practice is on the first floor."
    ]),
    P("A0", 17, "a0-first-response-help", "Choose the right help route", "Report a lost item and recognize when police or emergency help is needed.", "Distinguish lost property, suspected theft, and immediate danger, then ask the appropriate service for help.", "possessives, basic perfect chunks, and formal requests", "A wallet or identity document is missing in a public building, so you decide which help point fits the situation.", [
      "Hilfe!|Help!|Hilfe! Ich finde meine Tasche nicht.|Help! I cannot find my bag.",
      "der Notruf, die Notrufe|emergency call|Der Notruf ist kostenlos.|The emergency call is free.",
      "die Polizei|police|Bitte rufen Sie die Polizei.|Please call the police.",
      "der Sicherheitsdienst|security service|Der Sicherheitsdienst ist am Eingang.|Security is at the entrance.",
      "das Fundbüro, die Fundbüros|lost-property office|Wo ist das Fundbüro?|Where is the lost-property office?",
      "das Portemonnaie, die Portemonnaies|wallet|Mein Portemonnaie ist weg.|My wallet is gone.",
      "der Ausweis, die Ausweise|identity card|Mein Ausweis ist im Portemonnaie.|My identity card is in the wallet.",
      "etwas verloren haben|to have lost something|Ich habe meinen Ausweis verloren.|I have lost my identity card.",
      "etwas gefunden haben|to have found something|Jemand hat meine Tasche gefunden.|Someone found my bag.",
      "Ich suche ...|I am looking for ...|Ich suche mein Handy.|I am looking for my phone.",
      "Rufen Sie bitte ...|Please call ...|Rufen Sie bitte den Sicherheitsdienst.|Please call security.",
      "Es ist dringend.|It is urgent.|Bitte helfen Sie mir. Es ist dringend.|Please help me. It is urgent."
    ]),
    P("A1", 13, "a1-natural-small-talk", "Natural small talk", "Open, sustain, and close a short friendly exchange.", "Open, maintain, and close a short conversation with a neighbor or colleague.", "seit with present tense and short reciprocal responses", "You talk in an office kitchen or while waiting for a bus.", [
      "Wie läuft's?|How is it going?|Hallo Mia, wie läuft's?|Hi Mia, how is it going?",
      "Wie war dein / Ihr Tag?|How was your day?|Wie war Ihr Tag heute?|How was your day today?",
      "Sind Sie schon lange hier?|Have you been here long?|Sind Sie schon lange in Köln?|Have you been in Cologne long?",
      "Ich bin erst seit ... hier.|I have only been here since ...|Ich bin erst seit Montag hier.|I have only been here since Monday.",
      "Arbeiten Sie auch hier?|Do you work here too?|Arbeiten Sie auch in diesem Gebäude?|Do you work in this building too?",
      "Heute ist viel los.|It is busy today.|Am Bahnhof ist heute viel los.|The station is busy today.",
      "Ich auch.|Same for me.|Ich bin müde. Ich auch.|I am tired. Same for me.",
      "Ach so.|I see.|Ach so, der Kurs beginnt später.|I see, the course begins later.",
      "Echt?|Really?|Echt? Das wusste ich nicht.|Really? I did not know that.",
      "Das klingt gut.|That sounds good.|Ein freier Freitag? Das klingt gut.|A free Friday? That sounds good.",
      "Und bei dir / Ihnen?|And you?|Mein Wochenende war ruhig. Und bei dir?|My weekend was quiet. And yours?",
      "Ich muss leider weiter.|I need to get going.|Es war nett, aber ich muss leider weiter.|It was nice, but I need to get going."
    ]),
    P("A1", 14, "a1-visiting-hosting", "Visiting and hosting", "Enter, offer refreshments, and close a visit naturally.", "Enter a home politely, offer or accept refreshments, and close a visit naturally.", "formal and informal commands with household verbs", "You visit a neighbor's apartment for the first time.", [
      "die Klingel, die Klingeln|doorbell|Die Klingel ist neben der Tür.|The doorbell is next to the door.",
      "die Gegensprechanlage, die Gegensprechanlagen|intercom|Sprechen Sie bitte in die Gegensprechanlage.|Please speak into the intercom.",
      "klingeln|to ring the bell|Klingeln Sie bei Familie Kaya.|Ring the bell for the Kaya family.",
      "Komm herein! / Kommen Sie herein!|Come in!|Die Tür ist offen. Kommen Sie herein!|The door is open. Come in!",
      "die Schuhe ausziehen|to take off one's shoes|Soll ich die Schuhe ausziehen?|Should I take off my shoes?",
      "die Jacke ablegen|to take off and put down one's jacket|Du kannst deine Jacke hier ablegen.|You can leave your jacket here.",
      "etwas mitbringen|to bring something along|Soll ich etwas mitbringen?|Should I bring something?",
      "das Geschenk, die Geschenke|gift|Das kleine Geschenk ist für euch.|The small gift is for you.",
      "Kann ich dir / Ihnen etwas anbieten?|Can I offer you something?|Kann ich Ihnen Kaffee oder Tee anbieten?|Can I offer you coffee or tea?",
      "Möchtest du ...?|Would you like ...?|Möchtest du noch Kuchen?|Would you like more cake?",
      "Vielen Dank für die Einladung.|Thank you for the invitation.|Vielen Dank für die Einladung zum Abendessen.|Thank you very much for the dinner invitation.",
      "Es war sehr schön.|It was very nice.|Es war sehr schön bei euch.|It was very nice at your place."
    ]),
    P("A1", 15, "a1-german-class", "German course and classroom", "Request an explanation and manage course tasks.", "Follow course organization, request an explanation, discuss homework, and report an absence.", "formal instructions, dative mir, and weil word order", "You participate in an adult German class.", [
      "die Aufgabe, die Aufgaben|task|Aufgabe vier ist schwierig.|Task four is difficult.",
      "die Übung, die Übungen|exercise|Wir machen jetzt eine Hörübung.|We are doing a listening exercise now.",
      "die Seite, die Seiten|page|Öffnen Sie das Buch auf Seite zwölf.|Open the book to page twelve.",
      "die Partnerarbeit|pair work|Die nächste Übung ist Partnerarbeit.|The next exercise is pair work.",
      "die Gruppenarbeit|group work|Für die Gruppenarbeit haben wir zehn Minuten.|We have ten minutes for the group work.",
      "die Hausaufgabe, die Hausaufgaben|homework|Die Hausaufgabe ist für Montag.|The homework is for Monday.",
      "Können Sie mir das erklären?|Can you explain that to me?|Können Sie mir den Satz erklären?|Can you explain the sentence to me?",
      "korrigieren|to correct|Bitte korrigieren Sie meinen Text.|Please correct my text.",
      "abgeben|to hand in|Wir geben die Aufgabe morgen ab.|We are handing in the assignment tomorrow.",
      "die Prüfung, die Prüfungen|exam|Die Prüfung ist am Freitag.|The exam is on Friday.",
      "Bis wann ...?|By when ...?|Bis wann müssen wir die Hausaufgabe abgeben?|By when must we hand in the homework?",
      "Ich kann heute nicht kommen.|I cannot come today.|Ich kann heute nicht kommen, weil ich krank bin.|I cannot come today because I am ill."
    ]),
    P("A1", 16, "a1-phone-calls", "Phone calls and voicemail", "Reach a person and leave a complete callback message.", "Identify yourself, request a person, leave a message, and arrange a callback.", "telephone chunks, zurückrufen, and dative message objects", "You call a workplace, practice, or service desk.", [
      "Hier spricht ...|This is ... speaking.|Guten Morgen, hier spricht Lina Weber.|Good morning, this is Lina Weber speaking.",
      "... am Apparat|... speaking or on the line|Kaya am Apparat.|Kaya speaking.",
      "Kann ich bitte ... sprechen?|May I speak to ...?|Kann ich bitte Frau Roth sprechen?|May I speak to Ms. Roth?",
      "Einen Moment, bitte.|One moment, please.|Einen Moment, bitte. Ich verbinde Sie.|One moment, please. I will connect you.",
      "verbinden|to connect a caller|Ich verbinde Sie mit der Rezeption.|I will connect you to reception.",
      "besetzt|busy or engaged|Die Leitung ist gerade besetzt.|The line is currently busy.",
      "nicht erreichbar|unavailable or unreachable|Herr Braun ist heute nicht erreichbar.|Mr. Braun is unavailable today.",
      "eine Nachricht hinterlassen|to leave a message|Möchten Sie eine Nachricht hinterlassen?|Would you like to leave a message?",
      "jemandem etwas ausrichten|to pass a message to someone|Können Sie ihr bitte etwas ausrichten?|Can you pass her a message?",
      "zurückrufen|to call back|Frau Roth ruft Sie morgen zurück.|Ms. Roth will call you back tomorrow.",
      "falsch verbunden|wrong number|Entschuldigung, da sind Sie falsch verbunden.|Sorry, you have the wrong number.",
      "Auf Wiederhören.|Goodbye on the telephone.|Vielen Dank. Auf Wiederhören.|Thank you. Goodbye."
    ]),
    P("A1", 17, "a1-texts-email", "Texts and email", "Write a clear request with the right opening and closing.", "Write clear informal and formal messages with a subject, request, practical detail, and closing.", "formal or informal address and weil for a brief reason", "You confirm or move an appointment by email.", [
      "der Betreff, die Betreffe|subject line|Betreff: Termin am 12. Mai|Subject: Appointment on May 12.",
      "Sehr geehrte Frau ... / Sehr geehrter Herr ...|Dear Ms. ... or Dear Mr. ...|Sehr geehrte Frau Kaya, ich habe eine Frage.|Dear Ms. Kaya, I have a question.",
      "Hallo / Liebe / Lieber ...|Hello or Dear ...|Lieber Jonas, danke für deine Nachricht.|Dear Jonas, thank you for your message.",
      "der Anhang, die Anhänge|attachment|Die Datei finden Sie im Anhang.|You will find the file in the attachment.",
      "Bescheid geben|to let someone know|Geben Sie mir bitte bis Freitag Bescheid.|Please let me know by Friday.",
      "bestätigen|to confirm|Ich bestätige den Termin am Montag.|I confirm the appointment on Monday.",
      "verschieben|to postpone or reschedule|Können wir den Termin verschieben?|Can we reschedule the appointment?",
      "sich melden|to get in touch|Ich melde mich morgen bei Ihnen.|I will get in touch with you tomorrow.",
      "senden|to send|Ich sende Ihnen die Unterlagen heute.|I will send you the documents today.",
      "antworten|to reply|Bitte antworten Sie bis Donnerstag.|Please reply by Thursday.",
      "Viele Grüße|Best wishes|Viele Grüße, Mia.|Best wishes, Mia.",
      "Mit freundlichen Grüßen|Kind regards|Mit freundlichen Grüßen, Sam Lee.|Kind regards, Sam Lee."
    ]),
    P("A1", 18, "a1-post-parcels", "Post office and parcels", "Send tracked mail and collect a parcel.", "Send a letter or parcel, select tracked delivery, and collect an incoming parcel.", "recipients with an, destinations with nach, and abholen", "You send a parcel and later collect another one.", [
      "die Postfiliale, die Postfilialen|post-office branch|Die Postfiliale schließt um achtzehn Uhr.|The post-office branch closes at six p.m.",
      "der Brief, die Briefe|letter|Der Brief geht nach Hamburg.|The letter is going to Hamburg.",
      "der Umschlag, die Umschläge|envelope|Ich brauche einen großen Umschlag.|I need a large envelope.",
      "das Paket, die Pakete|parcel|Das Paket wiegt drei Kilo.|The parcel weighs three kilograms.",
      "die Briefmarke, die Briefmarken|postage stamp|Welche Briefmarke brauche ich?|Which stamp do I need?",
      "der Absender / der Empfänger|sender or recipient|Der Absender steht oben links.|The sender is written at the top left.",
      "die Sendungsnummer, die Sendungsnummern|tracking number|Hier ist Ihre Sendungsnummer.|Here is your tracking number.",
      "die Abholkarte, die Abholkarten|collection notice|Bitte bringen Sie die Abholkarte mit.|Please bring the collection notice.",
      "verschicken|to send or dispatch|Ich möchte dieses Paket verschicken.|I would like to send this parcel.",
      "abholen|to collect|Sie können das Paket morgen abholen.|You can collect the parcel tomorrow.",
      "wiegen|to weigh|Können Sie das Paket bitte wiegen?|Can you weigh the parcel, please?",
      "per Einschreiben|by registered mail|Ich möchte den Brief per Einschreiben senden.|I would like to send the letter by registered mail."
    ]),
    P("A1", 19, "a1-bank-atm", "Bank and ATM", "Use the machine and explain a blocked or retained card.", "Use an ATM, understand a rejected transaction, and explain a blocked or retained card.", "possessives and separable financial verbs", "An ATM keeps your card, and a bank employee helps.", [
      "das Girokonto, die Girokonten|checking account|Mein Gehalt kommt auf das Girokonto.|My salary goes into the checking account.",
      "die Bankkarte, die Bankkarten|bank card|Meine Bankkarte funktioniert nicht.|My bank card is not working.",
      "die PIN, die PINs|PIN|Geben Sie Ihre PIN ein.|Enter your PIN.",
      "der Geldautomat, die Geldautomaten|ATM|Der Geldautomat ist neben dem Eingang.|The ATM is next to the entrance.",
      "das Bargeld|cash|Ich brauche etwas Bargeld.|I need some cash.",
      "Geld abheben|to withdraw money|Ich möchte hundert Euro abheben.|I would like to withdraw one hundred euros.",
      "die Überweisung, die Überweisungen|bank transfer|Die Überweisung ist noch offen.|The transfer is still pending.",
      "Geld überweisen|to transfer money|Ich überweise die Miete heute.|I am transferring the rent today.",
      "der Kontostand, die Kontostände|account balance|Wo sehe ich meinen Kontostand?|Where can I see my account balance?",
      "gesperrt|blocked|Meine Karte ist gesperrt.|My card is blocked.",
      "einbehalten|to retain|Der Automat hat meine Karte einbehalten.|The ATM retained my card.",
      "Zahlung abgelehnt|payment declined|Auf dem Gerät steht „Zahlung abgelehnt“.|The device says Payment declined."
    ]),
    P("A1", 20, "a1-shared-home-chores", "Shared-home chores", "Divide work and say when a task is complete.", "Divide routine chores, ask a housemate for help, and report that a job is complete.", "separable verbs, modal verbs, and frequency", "You make a weekly cleaning plan in a shared apartment.", [
      "der Haushalt, die Haushalte|household or housework|Wir teilen die Arbeit im Haushalt.|We divide the housework.",
      "der Putzplan, die Putzpläne|cleaning schedule|Der Putzplan hängt in der Küche.|The cleaning schedule hangs in the kitchen.",
      "aufräumen|to tidy up|Ich räume heute das Wohnzimmer auf.|I am tidying the living room today.",
      "putzen|to clean|Wer putzt diese Woche das Bad?|Who is cleaning the bathroom this week?",
      "staubsaugen|to vacuum|Kannst du morgen staubsaugen?|Can you vacuum tomorrow?",
      "wischen|to mop or wipe|Ich wische den Küchenboden.|I am mopping the kitchen floor.",
      "spülen|to wash dishes|Nach dem Essen spüle ich.|I wash the dishes after eating.",
      "den Müll rausbringen|to take out the rubbish|Bitte bring den Müll raus.|Please take out the rubbish.",
      "die Wäsche waschen|to do the laundry|Ich wasche am Samstag die Wäsche.|I do the laundry on Saturday.",
      "die Spülmaschine ausräumen|to empty the dishwasher|Die Spülmaschine ist fertig. Räumst du sie aus?|The dishwasher is finished. Will you empty it?",
      "dran sein|to be one's turn|Heute bist du mit dem Bad dran.|Today it is your turn to clean the bathroom.",
      "erledigt|completed or taken care of|Das ist schon erledigt.|That is already taken care of."
    ]),
    P("A1", 21, "a1-home-repair", "Report a home repair", "Describe the defect and arrange access.", "Describe a household defect, say how long it has existed, and arrange a repair visit.", "present tense with seit and polite scheduling questions", "You contact a landlord or building caretaker about two defects.", [
      "die Heizung, die Heizungen|heating system|Die Heizung wird nicht warm.|The heating is not getting warm.",
      "der Wasserhahn, die Wasserhähne|tap or faucet|Der Wasserhahn tropft seit gestern.|The tap has been dripping since yesterday.",
      "der Abfluss, die Abflüsse|drain|Das Wasser läuft im Abfluss nicht ab.|The water is not draining away.",
      "der Strom|electricity|Seit zehn Uhr gibt es keinen Strom.|There has been no electricity since ten.",
      "undicht|leaking|Das Rohr unter dem Waschbecken ist undicht.|The pipe under the sink is leaking.",
      "verstopft|blocked or clogged|Der Abfluss ist verstopft.|The drain is clogged.",
      "kaputt|broken|Die Klingel ist kaputt.|The doorbell is broken.",
      "ausfallen|to fail or go out|Der Strom ist heute Morgen ausgefallen.|The electricity failed this morning.",
      "tropfen|to drip|Es tropft unter dem Wasserhahn.|It is dripping under the tap.",
      "der Hausmeister / die Hausmeisterin|building caretaker|Die Hausmeisterin kommt am Nachmittag.|The caretaker is coming in the afternoon.",
      "der Reparaturtermin, die Reparaturtermine|repair appointment|Der Reparaturtermin ist am Dienstag.|The repair appointment is on Tuesday.",
      "vorbeikommen|to come by|Können Sie morgen zwischen acht und zehn vorbeikommen?|Can you come by tomorrow between eight and ten?"
    ]),
    P("A1", 22, "a1-simple-recipe", "Cook from a recipe", "Follow and explain the steps of a simple meal.", "Understand a simple recipe and guide another person through the steps.", "informal commands, sequence markers, and quantities", "You prepare a simple meal with a friend.", [
      "das Rezept, die Rezepte|recipe|Das Rezept ist für vier Personen.|The recipe is for four people.",
      "die Zutat, die Zutaten|ingredient|Wir brauchen nur fünf Zutaten.|We only need five ingredients.",
      "der Topf, die Töpfe|pot|Das Wasser kocht im Topf.|The water is boiling in the pot.",
      "die Pfanne, die Pfannen|frying pan|Erhitze das Öl in der Pfanne.|Heat the oil in the pan.",
      "das Messer, die Messer|knife|Schneide das Gemüse mit einem scharfen Messer.|Cut the vegetables with a sharp knife.",
      "schneiden|to cut|Schneide die Tomaten in kleine Stücke.|Cut the tomatoes into small pieces.",
      "schälen|to peel|Schäle zuerst die Kartoffeln.|Peel the potatoes first.",
      "rühren|to stir|Rühre die Suppe langsam.|Stir the soup slowly.",
      "braten|to fry|Brate die Zwiebeln fünf Minuten.|Fry the onions for five minutes.",
      "hinzufügen|to add|Füge danach das Salz hinzu.|Add the salt afterward.",
      "erhitzen|to heat|Erhitze die Soße bei niedriger Temperatur.|Heat the sauce at a low temperature.",
      "zum Schluss|finally or at the end|Gib zum Schluss die Kräuter dazu.|Add the herbs at the end."
    ]),
    P("A1", 23, "a1-food-labels", "Read food labels", "Find ingredients, allergens, storage, and dates.", "Find ingredients, allergens, storage instructions, origin, and use-by information.", "label chunks, enthalten, and dates with bis", "You compare two packaged foods before buying one.", [
      "die Zutatenliste, die Zutatenlisten|ingredient list|Die Zutatenliste steht auf der Rückseite.|The ingredient list is on the back.",
      "das Mindesthaltbarkeitsdatum|best-before date|Das Mindesthaltbarkeitsdatum ist der zwölfte Juni.|The best-before date is June twelfth.",
      "zu verbrauchen bis|use by|Auf der Packung steht „zu verbrauchen bis Freitag“.|The package says use by Friday.",
      "haltbar|keeps or shelf-stable|Nach dem Öffnen ist das Produkt drei Tage haltbar.|The product keeps for three days after opening.",
      "gekühlt lagern|to keep refrigerated|Die Milch muss gekühlt gelagert werden.|The milk must be kept refrigerated.",
      "die Nährwerte|nutritional values|Die Nährwerte gelten pro hundert Gramm.|The nutritional values are per one hundred grams.",
      "enthalten|to contain|Das Produkt enthält Nüsse.|The product contains nuts.",
      "Spuren von ... enthalten|to contain traces of ...|Die Schokolade kann Spuren von Erdnüssen enthalten.|The chocolate may contain traces of peanuts.",
      "glutenfrei|gluten-free|Dieses Brot ist glutenfrei.|This bread is gluten-free.",
      "laktosefrei|lactose-free|Ich brauche laktosefreie Milch.|I need lactose-free milk.",
      "die Herkunft|origin|Auf dem Etikett steht die Herkunft des Fleisches.|The label shows the origin of the meat.",
      "Bio|organic|Das Bio-Siegel ist auf der Packung.|The organic seal is on the package."
    ]),
    P("A1", 24, "a1-public-library", "Use the library", "Borrow, renew, reserve, and return an item.", "Obtain a library card, locate an item, borrow it, renew it, or reserve it.", "separable library verbs and deadlines with bis", "You register at a public library and borrow a book.", [
      "die Bibliothek, die Bibliotheken|library|Die Bibliothek öffnet um zehn Uhr.|The library opens at ten.",
      "der Bibliotheksausweis, die Bibliotheksausweise|library card|Für die Ausleihe brauche ich einen Bibliotheksausweis.|I need a library card to borrow items.",
      "das Regal, die Regale|shelf|Das Buch steht im Regal links.|The book is on the shelf to the left.",
      "die Abteilung, die Abteilungen|section or department|Die Kinderbücher sind in einer anderen Abteilung.|The children's books are in another section.",
      "die Leihfrist, die Leihfristen|loan period|Die Leihfrist beträgt vier Wochen.|The loan period is four weeks.",
      "ausleihen|to borrow|Ich möchte dieses Buch ausleihen.|I would like to borrow this book.",
      "zurückgeben|to return|Sie müssen das Buch bis Montag zurückgeben.|You must return the book by Monday.",
      "verlängern|to renew|Kann ich die Leihfrist online verlängern?|Can I renew the loan online?",
      "vormerken|to reserve|Ich möchte den Roman vormerken.|I would like to reserve the novel.",
      "fällig|due|Das Buch ist morgen fällig.|The book is due tomorrow.",
      "verfügbar|available|Der Film ist gerade verfügbar.|The film is currently available.",
      "ausgeliehen|checked out|Alle Exemplare sind ausgeliehen.|All copies are checked out."
    ]),
    P("A1", 25, "a1-first-workday", "First day at work", "Check in, meet the team, and find the right contact.", "Check in, meet a team, locate a work area, and identify the right contact person.", "reflexive onboarding verbs and workplace dative", "You complete the first hour at a new workplace.", [
      "der Arbeitsplatz, die Arbeitsplätze|workplace or workstation|Ihr Arbeitsplatz ist am Fenster.|Your workstation is by the window.",
      "die Abteilung, die Abteilungen|department|Ich arbeite in der technischen Abteilung.|I work in the technical department.",
      "das Team, die Teams|team|Heute lernen Sie das Team kennen.|Today you will meet the team.",
      "der Vorgesetzte / die Vorgesetzte|supervisor|Meine Vorgesetzte heißt Frau Kaya.|My supervisor is named Ms. Kaya.",
      "die Personalabteilung|human-resources department|Die Personalabteilung braucht Ihre Adresse.|Human resources needs your address.",
      "die Schicht, die Schichten|shift|Meine Schicht beginnt um sieben Uhr.|My shift begins at seven.",
      "die Zeiterfassung|time-recording system|Die Zeiterfassung ist neben dem Eingang.|The time clock is next to the entrance.",
      "der Mitarbeiterausweis, die Mitarbeiterausweise|employee ID card|Bitte tragen Sie Ihren Mitarbeiterausweis.|Please carry your employee ID card.",
      "sich vorstellen|to introduce oneself|Ich möchte mich kurz vorstellen.|I would like to introduce myself briefly.",
      "sich anmelden|to check in or sign in|Melden Sie sich zuerst am Empfang an.|Check in at reception first.",
      "zuständig sein für|to be responsible for|Herr Koch ist für den Zugang zuständig.|Mr. Koch is responsible for access.",
      "sich einarbeiten|to learn the job|Ich arbeite mich diese Woche ein.|I am learning the job this week."
    ]),
    P("A1", 26, "a1-coordinate-task", "Coordinate a work task", "Clarify the task, priority, deadline, and handoff.", "Clarify a task, deadline, priority, progress, and handoff.", "modal obligations, sequencing, and mit after beginnen", "You give a concise update during a team check-in.", [
      "der Arbeitsauftrag, die Arbeitsaufträge|work assignment|Der Arbeitsauftrag steht in der E-Mail.|The assignment is in the email.",
      "die Frist, die Fristen|deadline|Die Frist endet am Freitag.|The deadline ends on Friday.",
      "die Priorität, die Prioritäten|priority|Welche Aufgabe hat heute Priorität?|Which task has priority today?",
      "dringend|urgent|Diese Anfrage ist dringend.|This request is urgent.",
      "noch offen|still outstanding|Zwei Punkte sind noch offen.|Two points are still outstanding.",
      "beginnen mit|to begin with|Ich beginne mit der Kundenliste.|I will begin with the customer list.",
      "weitermachen|to continue|Danach mache ich mit dem Bericht weiter.|After that I will continue with the report.",
      "fertigstellen|to complete or finish|Ich stelle die Tabelle heute fertig.|I will finish the table today.",
      "prüfen|to check or review|Können Sie die Zahlen bitte prüfen?|Can you check the figures, please?",
      "übergeben|to hand over|Ich übergebe die Unterlagen an Mia.|I am handing the documents over to Mia.",
      "die Rückfrage, die Rückfragen|follow-up question|Ich habe noch eine Rückfrage zum Auftrag.|I have one more question about the assignment.",
      "die Unterstützung|support or assistance|Ich brauche Unterstützung bei diesem Schritt.|I need support with this step."
    ]),
    P("A1", 27, "a1-workplace-safety", "Workplace safety", "Follow equipment, access, and emergency rules.", "Understand mandatory equipment, forbidden actions, emergency equipment, and assembly instructions.", "müssen, dürfen, and formal safety instructions", "You complete a basic workplace safety induction.", [
      "die Sicherheit|safety|Sicherheit hat hier höchste Priorität.|Safety has the highest priority here.",
      "die Schutzbrille, die Schutzbrillen|safety glasses|In diesem Bereich müssen Sie eine Schutzbrille tragen.|You must wear safety glasses in this area.",
      "der Helm, die Helme|helmet|Der Helm liegt im Schrank.|The helmet is in the cabinet.",
      "die Warnweste, die Warnwesten|high-visibility vest|Besucher tragen eine Warnweste.|Visitors wear a high-visibility vest.",
      "der Handschuh, die Handschuhe|glove|Für diese Arbeit brauchen Sie Handschuhe.|You need gloves for this work.",
      "der Notausgang, die Notausgänge|emergency exit|Halten Sie den Notausgang frei.|Keep the emergency exit clear.",
      "der Feuerlöscher, die Feuerlöscher|fire extinguisher|Der Feuerlöscher hängt neben der Tür.|The fire extinguisher hangs next to the door.",
      "die Erste Hilfe|first aid|Der Raum für Erste Hilfe ist unten.|The first-aid room is downstairs.",
      "die Gefahr, die Gefahren|danger or hazard|Melden Sie jede Gefahr sofort.|Report every hazard immediately.",
      "betreten|to enter|Sie dürfen den Bereich nicht betreten.|You may not enter the area.",
      "verboten|prohibited|Rauchen ist hier verboten.|Smoking is prohibited here.",
      "der Sammelplatz, die Sammelplätze|assembly point|Gehen Sie im Notfall zum Sammelplatz.|Go to the assembly point in an emergency."
    ]),
    P("A1", 28, "a1-school-childcare", "School and childcare", "Report an absence and clarify pickup or care times.", "Report a child's absence, understand a school notice, and clarify pickup authorization or care times.", "possessives, modal permission, and weil", "You contact a school or daycare before the day begins.", [
      "die Schule, die Schulen|school|Die Schule beginnt um acht Uhr.|School begins at eight.",
      "die Kita, die Kitas|daycare center|Die Kita öffnet um sieben Uhr.|The daycare center opens at seven.",
      "die Lehrkraft, die Lehrkräfte|teacher|Die Lehrkraft schickt eine Nachricht.|The teacher sends a message.",
      "der Erzieher / die Erzieherin|childcare educator|Die Erzieherin ist heute in der Gruppe.|The childcare educator is with the group today.",
      "die Klasse, die Klassen|class|Mein Kind ist in Klasse zwei.|My child is in second grade.",
      "der Stundenplan, die Stundenpläne|timetable|Der neue Stundenplan gilt ab Montag.|The new timetable applies from Monday.",
      "der Elternabend, die Elternabende|parent evening|Der Elternabend ist am Donnerstag.|The parent evening is on Thursday.",
      "die Krankmeldung, die Krankmeldungen|illness absence notification|Ich sende heute eine Krankmeldung.|I am sending an illness notification today.",
      "die Abholberechtigung|pickup authorization|Die Schule braucht eine Abholberechtigung.|The school needs a pickup authorization.",
      "der Ausflug, die Ausflüge|class trip or outing|Für den Ausflug braucht mein Kind eine Jacke.|My child needs a jacket for the outing.",
      "die Betreuung|childcare or supervision|Die Betreuung endet um sechzehn Uhr.|Childcare ends at four p.m.",
      "Wer darf mein Kind abholen?|Who may collect my child?|Wo trage ich ein, wer mein Kind abholen darf?|Where do I enter who may collect my child?"
    ]),
    P("A1", 29, "a1-airport-flight", "Airport and flight", "Move from check-in through baggage reclaim.", "Check in, manage baggage and security, find a gate, and locate baggage reclaim.", "separable travel verbs and time expressions", "You complete a short airport journey from check-in to baggage reclaim.", [
      "der Flughafen, die Flughäfen|airport|Der Bus fährt direkt zum Flughafen.|The bus goes directly to the airport.",
      "der Flug, die Flüge|flight|Mein Flug nach Wien startet um neun.|My flight to Vienna leaves at nine.",
      "die Bordkarte, die Bordkarten|boarding pass|Ihre Bordkarte ist auf dem Handy.|Your boarding pass is on your phone.",
      "der Reisepass, die Reisepässe|passport|Bitte zeigen Sie Ihren Reisepass.|Please show your passport.",
      "das Handgepäck|hand luggage|Dieses Gepäckstück ist Handgepäck.|This item is hand luggage.",
      "der Koffer, die Koffer|suitcase|Mein Koffer wiegt zwanzig Kilo.|My suitcase weighs twenty kilograms.",
      "die Sicherheitskontrolle|security check|Die Sicherheitskontrolle ist im ersten Stock.|Security is on the first floor.",
      "das Gate, die Gates|gate|Der Flug geht jetzt von Gate zwölf.|The flight now departs from gate twelve.",
      "einchecken|to check in|Wo kann ich für den Flug einchecken?|Where can I check in for the flight?",
      "Gepäck aufgeben|to check baggage|Ich möchte einen Koffer aufgeben.|I would like to check one suitcase.",
      "der Abflug, die Abflüge|departure|Der Abflug verspätet sich um dreißig Minuten.|Departure is delayed by thirty minutes.",
      "die Gepäckausgabe|baggage reclaim|Wo ist die Gepäckausgabe?|Where is baggage reclaim?"
    ]),
    P("A1", 30, "a1-taxi-pickup", "Taxi and pickup", "Give the pickup point, destination, and stopping place.", "Give a pickup point and destination, ask about duration, and stop at the correct place.", "destinations with zu, nach, and in", "You arrange and complete a taxi ride.", [
      "das Taxi, die Taxis|taxi|Ich bestelle ein Taxi für acht Uhr.|I am ordering a taxi for eight.",
      "der Taxistand, die Taxistände|taxi rank|Der Taxistand ist vor dem Bahnhof.|The taxi rank is in front of the station.",
      "die Abholadresse, die Abholadressen|pickup address|Die Abholadresse ist Marktstraße acht.|The pickup address is 8 Marktstraße.",
      "das Ziel, die Ziele|destination|Unser Ziel ist das Hotel am Park.|Our destination is the Hotel am Park.",
      "die Fahrt, die Fahrten|ride or journey|Die Fahrt dauert ungefähr zwanzig Minuten.|The ride takes approximately twenty minutes.",
      "der Fahrer / die Fahrerin|driver|Die Fahrerin wartet vor dem Eingang.|The driver is waiting by the entrance.",
      "einsteigen|to get in|Sie können jetzt einsteigen.|You can get in now.",
      "aussteigen|to get out|Ich steige an der nächsten Ecke aus.|I am getting out at the next corner.",
      "anhalten|to stop|Können Sie vor der Apotheke anhalten?|Can you stop in front of the pharmacy?",
      "warten auf|to wait for|Ich warte vor dem Hotel auf das Taxi.|I am waiting for the taxi in front of the hotel.",
      "Wie lange dauert die Fahrt?|How long does the ride take?|Wie lange dauert die Fahrt zum Flughafen?|How long does the ride to the airport take?",
      "Bitte halten Sie hier.|Please stop here.|Bitte halten Sie hier an der Ecke.|Please stop here at the corner."
    ]),
    P("A1", 31, "a1-tourist-information", "Tourist information", "Ask about sights, admission, hours, and tours.", "Ask about sights, admission, opening times, maps, and guided tours.", "man kann, welcher questions, and stattfinden", "You plan one day at a tourist-information office.", [
      "die Touristeninformation|tourist-information office|Die Touristeninformation ist am Marktplatz.|The tourist-information office is at the market square.",
      "die Sehenswürdigkeit, die Sehenswürdigkeiten|sight or attraction|Welche Sehenswürdigkeit ist in der Nähe?|Which attraction is nearby?",
      "das Museum, die Museen|museum|Das Museum öffnet um zehn Uhr.|The museum opens at ten.",
      "die Führung, die Führungen|guided tour|Die Führung dauert neunzig Minuten.|The guided tour lasts ninety minutes.",
      "der Eintritt|admission|Der Eintritt kostet zwölf Euro.|Admission costs twelve euros.",
      "die Öffnungszeit, die Öffnungszeiten|opening time|Die Öffnungszeiten stehen hier.|The opening times are listed here.",
      "der Stadtplan, die Stadtpläne|city map|Haben Sie einen kostenlosen Stadtplan?|Do you have a free city map?",
      "die Altstadt, die Altstädte|old town|Die Altstadt ist zu Fuß erreichbar.|The old town is reachable on foot.",
      "besichtigen|to visit or tour|Wir möchten das Schloss besichtigen.|We would like to tour the palace.",
      "sich etwas ansehen|to look at or visit something|Am Nachmittag sehen wir uns den Dom an.|In the afternoon we will visit the cathedral.",
      "sehenswert|worth seeing|Der Park ist besonders sehenswert.|The park is especially worth seeing.",
      "kostenlos|free of charge|Der Eintritt ist am Sonntag kostenlos.|Admission is free on Sunday."
    ]),
    P("A1", 32, "a1-sports-club", "Join a sports club", "Ask about a trial, equipment, schedule, and fee.", "Ask about a trial session, schedule, equipment, registration, and fees.", "reflexive registration verbs and teilnehmen an", "You register for a trial session at a local club.", [
      "der Verein, die Vereine|club or association|Der Verein bietet viele Sportarten an.|The club offers many sports.",
      "das Training, die Trainings|training session|Das Training beginnt um achtzehn Uhr.|Training begins at six p.m.",
      "der Kursleiter / die Kursleiterin|course instructor|Die Kursleiterin heißt Frau Neumann.|The instructor is named Ms. Neumann.",
      "die Mitgliedschaft, die Mitgliedschaften|membership|Die Mitgliedschaft läuft ein Jahr.|Membership runs for one year.",
      "der Mitgliedsbeitrag, die Mitgliedsbeiträge|membership fee|Der Mitgliedsbeitrag kostet zwanzig Euro im Monat.|The membership fee is twenty euros per month.",
      "die Probestunde, die Probestunden|trial session|Kann ich eine Probestunde machen?|Can I attend a trial session?",
      "die Ausrüstung|equipment|Welche Ausrüstung brauche ich?|What equipment do I need?",
      "teilnehmen an|to participate in|Ich möchte am Training teilnehmen.|I would like to participate in training.",
      "sich anmelden|to register|Sie können sich online anmelden.|You can register online.",
      "sich abmelden|to cancel one's attendance|Bitte melden Sie sich bei Krankheit ab.|Please cancel if you are ill.",
      "stattfinden|to take place|Das Training findet jeden Dienstag statt.|Training takes place every Tuesday.",
      "mitbringen|to bring along|Bringen Sie bitte Sportschuhe mit.|Please bring sports shoes."
    ]),
    P("A1", 33, "a1-dentist", "At the dentist", "Describe pain and follow examination instructions.", "Describe dental pain, give its duration, and understand basic examination instructions.", "wehtun, duration with seit, and medical instructions", "You attend an urgent dental appointment.", [
      "der Zahnarzt / die Zahnärztin|dentist|Die Zahnärztin untersucht den Zahn.|The dentist examines the tooth.",
      "der Zahn, die Zähne|tooth|Dieser Zahn tut weh.|This tooth hurts.",
      "die Zahnschmerzen|toothache|Ich habe seit gestern Zahnschmerzen.|I have had toothache since yesterday.",
      "das Zahnfleisch|gums|Mein Zahnfleisch blutet manchmal.|My gums bleed sometimes.",
      "die Füllung, die Füllungen|filling|Die alte Füllung ist locker.|The old filling is loose.",
      "die Betäubung, die Betäubungen|anesthetic|Möchten Sie eine Betäubung?|Would you like an anesthetic?",
      "die Untersuchung, die Untersuchungen|examination|Die Untersuchung dauert nur zehn Minuten.|The examination takes only ten minutes.",
      "die Behandlung, die Behandlungen|treatment|Was kostet die Behandlung?|How much does the treatment cost?",
      "empfindlich|sensitive|Der Zahn ist bei Kälte empfindlich.|The tooth is sensitive to cold.",
      "bluten|to bleed|Das Zahnfleisch blutet beim Putzen.|The gums bleed during brushing.",
      "den Mund öffnen|to open one's mouth|Öffnen Sie bitte den Mund.|Please open your mouth.",
      "zubeißen|to bite down|Beißen Sie bitte vorsichtig zu.|Please bite down carefully."
    ]),
    P("A1", 34, "a1-citizens-office", "At the Bürgeramt", "Present documents and ask what is still needed.", "Check in for a municipal appointment, present documents, and ask what is missing or when a document will be ready.", "welche with plural documents and official request verbs", "You register or update an address at the Bürgeramt.", [
      "das Bürgeramt, die Bürgerämter|citizens' office|Das Bürgeramt ist im Rathaus.|The citizens' office is in the town hall.",
      "die Ummeldung, die Ummeldungen|change-of-address registration|Ich brauche einen Termin für die Ummeldung.|I need an appointment to change my registered address.",
      "die Terminbestätigung, die Terminbestätigungen|appointment confirmation|Zeigen Sie bitte Ihre Terminbestätigung.|Please show your appointment confirmation.",
      "die Wartemarke, die Wartemarken|queue ticket|Ziehen Sie zuerst eine Wartemarke.|Take a queue ticket first.",
      "der Schalter, die Schalter|service counter|Ihre Nummer erscheint über Schalter vier.|Your number appears above counter four.",
      "die Unterlage, die Unterlagen|supporting document|Welche Unterlagen muss ich mitbringen?|Which documents must I bring?",
      "der Ausweis, die Ausweise|identity card|Mein Ausweis ist noch gültig.|My identity card is still valid.",
      "der Mietvertrag, die Mietverträge|rental contract|Hier ist eine Kopie meines Mietvertrags.|Here is a copy of my rental contract.",
      "die Meldebescheinigung, die Meldebescheinigungen|registration certificate|Wann ist die Meldebescheinigung fertig?|When will the registration certificate be ready?",
      "vorlegen|to present for inspection|Bitte legen Sie Ihren Ausweis vor.|Please present your identity card.",
      "unterschreiben|to sign|Unterschreiben Sie bitte unten.|Please sign at the bottom.",
      "beantragen|to apply for|Wo kann ich das Dokument beantragen?|Where can I apply for the document?"
    ]),
    P("A1", 35, "a1-recycling-rules", "Recycling and building rules", "Sort household waste and follow collection notices.", "Sort common household waste, read collection information, and ask where an item belongs.", "direction with in and simple passive notices", "You use the waste room in an apartment building.", [
      "der Abfall, die Abfälle|waste|Bitte trennen Sie den Abfall.|Please separate the waste.",
      "der Restmüll|residual waste|Die Windel gehört in den Restmüll.|The diaper belongs in residual waste.",
      "der Biomüll|organic waste|Obstreste kommen in den Biomüll.|Fruit scraps go into organic waste.",
      "das Altpapier|waste paper|Der Karton gehört zum Altpapier.|The cardboard belongs with waste paper.",
      "der Verpackungsmüll|packaging waste|Leere Verpackungen kommen in den Verpackungsmüll.|Empty packaging goes into packaging waste.",
      "das Altglas|waste glass|Altglas wird nach Farben getrennt.|Waste glass is separated by color.",
      "die Mülltonne, die Mülltonnen|rubbish bin|Die Mülltonne ist schon voll.|The rubbish bin is already full.",
      "der Wertstoffhof, die Wertstoffhöfe|recycling center|Alte Elektrogeräte kommen zum Wertstoffhof.|Old electrical appliances go to the recycling center.",
      "der Abholtag, die Abholtage|collection day|Der Abholtag für Papier ist Mittwoch.|Paper collection day is Wednesday.",
      "trennen|to separate or sort|Wir trennen Papier, Glas und Biomüll.|We separate paper, glass, and organic waste.",
      "entsorgen|to dispose of|Wo kann ich Batterien entsorgen?|Where can I dispose of batteries?",
      "Wo kommt das hin?|Where does this go?|Entschuldigung, wo kommt dieser Karton hin?|Excuse me, where does this cardboard go?"
    ]),
    P("A1", 36, "a1-emergency-police", "Emergency call and police report", "Give the essential facts and secure stolen cards.", "Give essential emergency facts, follow dispatcher questions, and report theft or block a card.", "Perfekt for incidents and precise wer, was, and wo questions", "You call emergency services after an incident, then report a stolen wallet.", [
      "der Notfall, die Notfälle|emergency|Das ist ein medizinischer Notfall.|This is a medical emergency.",
      "der Unfall, die Unfälle|accident|Vor dem Bahnhof ist ein Unfall passiert.|An accident happened in front of the station.",
      "der Rettungsdienst|emergency medical service|Der Rettungsdienst ist unterwegs.|The emergency medical service is on its way.",
      "die Feuerwehr|fire brigade|Rufen Sie bei Feuer die Feuerwehr.|Call the fire brigade in case of fire.",
      "die verletzte Person|injured person|Eine verletzte Person liegt auf dem Boden.|An injured person is lying on the ground.",
      "bewusstlos|unconscious|Die Person ist bewusstlos.|The person is unconscious.",
      "atmen|to breathe|Die Person atmet noch.|The person is still breathing.",
      "Was ist passiert?|What happened?|Bitte bleiben Sie ruhig. Was ist passiert?|Please stay calm. What happened?",
      "Wo genau sind Sie?|Where exactly are you?|Wo genau sind Sie jetzt?|Where exactly are you now?",
      "gestohlen|stolen|Jemand hat mein Portemonnaie gestohlen.|Someone stole my wallet.",
      "Anzeige erstatten|to file a police report|Ich möchte Anzeige wegen Diebstahls erstatten.|I would like to file a report for theft.",
      "die Karte sperren lassen|to have a card blocked|Ich muss meine Bankkarte sofort sperren lassen.|I need to have my bank card blocked immediately."
    ]),
    P("B2", 13, "b2-shift-handover", "Keep work moving across shifts", "Hand over unfinished work with clear ownership and risk.", "Deliver a precise handover, identify unfinished work, clarify ownership, and prepare the next person for likely problems.", "temporal sequencing, sein zu infinitive, and indirect status questions", "An outgoing shift hands over delayed orders and a faulty machine to the evening team.", [
      "eine Schicht übergeben|to hand over a shift|Ich übergebe Ihnen die Schicht, sobald der Techniker eingetroffen ist.|I will hand over the shift to you as soon as the technician has arrived.",
      "jemanden auf den neuesten Stand bringen|to bring someone up to date|Können Sie mich kurz auf den neuesten Stand bringen?|Could you bring me up to date briefly?",
      "der Bearbeitungsstand|current progress or processing status|Der Bearbeitungsstand ist im digitalen Protokoll vermerkt.|The current progress is recorded in the digital log.",
      "noch ausstehen|to remain pending|Die Freigabe durch die Qualitätsprüfung steht noch aus.|Approval from quality control is still pending.",
      "eine Aufgabe übernehmen|to take over a task|Mara übernimmt die Rückfrage beim Lieferanten.|Mara will handle the follow-up with the supplier.",
      "sich um einen Vorgang kümmern|to deal with a case or process|Die Spätschicht kümmert sich um den offenen Vorgang.|The evening shift will deal with the open case.",
      "der Engpass, die Engpässe|bottleneck or shortage|Wegen eines personellen Engpasses dauert die Prüfung länger.|The review is taking longer because of a staff shortage.",
      "ins Stocken geraten|to stall|Die Auslieferung ist wegen eines Systemfehlers ins Stocken geraten.|Delivery has stalled because of a system error.",
      "eine Abweichung melden|to report a deviation|Bitte melden Sie jede Abweichung vom vereinbarten Ablauf.|Please report every deviation from the agreed procedure.",
      "etwas lückenlos dokumentieren|to document something completely|Alle Änderungen müssen lückenlos dokumentiert werden.|All changes must be documented completely.",
      "eine Übergangslösung einrichten|to put an interim solution in place|Bis das System wieder läuft, richten wir eine Übergangslösung ein.|We will put an interim solution in place until the system works again.",
      "für den Notfall vorsorgen|to prepare for an emergency|Für den Notfall haben wir ein Ersatzgerät bereitgestellt.|We provided a replacement device for an emergency."
    ]),
    P("B2", 14, "b2-project-pressure", "Plan projects under pressure", "Revise scope, dependencies, risks, and deadlines.", "Define scope, explain dependencies, revise a schedule, and communicate risks before a deadline is missed.", "Futur II, conditional planning, and project consequences", "A product launch is threatened by a delayed supplier and limited staff capacity.", [
      "der Projektumfang|project scope|Der Projektumfang wurde nach dem Kundengespräch erweitert.|The project scope was expanded after the customer meeting.",
      "ein Arbeitspaket definieren|to define a work package|Für die Testphase müssen wir ein eigenes Arbeitspaket definieren.|We need to define a separate work package for the testing phase.",
      "der Meilenstein, die Meilensteine|milestone|Bis Freitag werden wir den ersten Meilenstein erreicht haben.|We will have reached the first milestone by Friday.",
      "ein Zwischenziel erreichen|to reach an interim goal|Das Team hat sein erstes Zwischenziel früher als geplant erreicht.|The team reached its first interim goal earlier than planned.",
      "vom Zeitplan abweichen|to deviate from the schedule|Wenn die Lieferung später kommt, weichen wir um drei Tage vom Zeitplan ab.|If the delivery arrives later, we will deviate from the schedule by three days.",
      "einen Puffer einplanen|to build in a buffer|Für technische Probleme sollten wir zwei zusätzliche Tage als Puffer einplanen.|We should build in two additional days as a buffer for technical problems.",
      "eine Abhängigkeit erkennen|to identify a dependency|Erst in der Planung erkannten wir die Abhängigkeit vom externen Dienstleister.|We identified the dependency on the external service provider only during planning.",
      "ein Risiko frühzeitig erfassen|to identify a risk early|Risiken werden erfasst, bevor sie den Ablauf gefährden.|Risks are identified before they threaten the schedule.",
      "Ressourcen zuweisen|to allocate resources|Die Projektleitung weist der Testphase zusätzliches Personal zu.|Project management is allocating additional staff to the testing phase.",
      "eine Frist neu ansetzen|to reschedule a deadline|Wegen der fehlenden Daten müssen wir die Abgabefrist neu ansetzen.|We need to reschedule the submission deadline because the data are missing.",
      "ein Hindernis aus dem Weg räumen|to remove an obstacle|Ein gemeinsamer Workshop könnte das organisatorische Hindernis aus dem Weg räumen.|A joint workshop could remove the organizational obstacle.",
      "unter Zeitdruck geraten|to come under time pressure|Ohne eine schnelle Entscheidung gerät das gesamte Team unter Zeitdruck.|Without a quick decision, the entire team will come under time pressure."
    ]),
    P("B2", 15, "b2-professional-feedback", "Give and receive professional feedback", "Use evidence and agree on a measurable development step.", "Give evidence-based feedback, respond without becoming defensive, and agree on a measurable development step.", "observation-impact-request sequence and polite Konjunktiv II", "A manager and employee discuss missed deadlines alongside strong client communication.", [
      "konstruktives Feedback geben|to give constructive feedback|Die Teamleiterin gibt konstruktives Feedback zu der Präsentation.|The team leader gives constructive feedback on the presentation.",
      "eine Beobachtung konkret beschreiben|to describe an observation specifically|Beschreiben Sie zunächst konkret, was Sie im Gespräch beobachtet haben.|First describe specifically what you observed in the conversation.",
      "die Wirkung auf andere benennen|to state the effect on others|Er benennt ruhig, welche Wirkung die häufigen Unterbrechungen auf andere haben.|He calmly states the effect that the frequent interruptions have on others.",
      "eine Leistung würdigen|to recognize an achievement|Bevor sie Kritik äußert, würdigt sie seine gute Kundenbetreuung.|Before expressing criticism, she recognizes his good client support.",
      "Verbesserungspotenzial aufzeigen|to identify room for improvement|Der Bericht zeigt Verbesserungspotenzial bei der internen Abstimmung auf.|The report identifies room for improvement in internal coordination.",
      "ein Entwicklungsziel vereinbaren|to agree on a development goal|Wir vereinbaren ein Entwicklungsziel für das nächste Quartal.|We are agreeing on a development goal for the next quarter.",
      "um ein konkretes Beispiel bitten|to ask for a specific example|Könnten Sie mir bitte ein konkretes Beispiel dafür nennen?|Could you please give me a specific example of that?",
      "Kritik sachlich annehmen|to accept criticism objectively|Sie nimmt die Kritik sachlich an und stellt zwei Rückfragen.|She accepts the criticism objectively and asks two follow-up questions.",
      "die eigene Perspektive erläutern|to explain one's own perspective|Ich möchte kurz erläutern, wie ich die Situation erlebt habe.|I would like to explain briefly how I experienced the situation.",
      "eine Erwartung verdeutlichen|to clarify an expectation|Der Vorgesetzte verdeutlicht, welche Rückmeldung er künftig erwartet.|The supervisor clarifies what kind of update he expects in the future.",
      "Fortschritte nachvollziehbar machen|to make progress traceable|Ein kurzes Wochenprotokoll macht die Fortschritte nachvollziehbar.|A short weekly log makes the progress traceable.",
      "ein Folgegespräch ansetzen|to schedule a follow-up conversation|Wir setzen für Ende des Monats ein Folgegespräch an.|We are scheduling a follow-up conversation for the end of the month."
    ]),
    P("B2", 16, "b2-advanced-interview", "Navigate advanced job interviews", "Explain your path, motivation, and employment conditions.", "Explain a career path, handle difficult questions, discuss employment conditions, and present motivation credibly.", "relative clauses with prepositions and conditional employment language", "An experienced candidate interviews for a role in a new industry.", [
      "den beruflichen Werdegang erläutern|to explain one's career path|Zu Beginn erläutert die Bewerberin ihren beruflichen Werdegang.|At the beginning, the applicant explains her career path.",
      "einen beruflichen Wechsel begründen|to explain a career change|Er begründet den beruflichen Wechsel mit neuen fachlichen Zielen.|He explains the career change by referring to new professional goals.",
      "eine Beschäftigungslücke erklären|to explain an employment gap|Die Beschäftigungslücke entstand während der Pflege eines Angehörigen.|The employment gap arose while she was caring for a relative.",
      "den Quereinstieg schaffen|to make a career change into another field|Durch eine Weiterbildung hat sie den Quereinstieg in die IT geschafft.|She successfully moved into IT through further training.",
      "den eigenen Verantwortungsbereich abgrenzen|to define one's own area of responsibility|Im letzten Projekt war mein Verantwortungsbereich klar von der Entwicklung abgegrenzt.|In the last project, my area of responsibility was clearly separated from development.",
      "eine Gehaltsvorstellung nennen|to state a salary expectation|Auf Nachfrage nennt er eine realistische Gehaltsvorstellung.|When asked, he states a realistic salary expectation.",
      "die Kündigungsfrist berücksichtigen|to take the notice period into account|Bei meinem möglichen Starttermin muss ich die Kündigungsfrist berücksichtigen.|I need to take my notice period into account when discussing a possible start date.",
      "nach den Rahmenbedingungen fragen|to ask about the general conditions|Darf ich noch nach den Rahmenbedingungen für mobiles Arbeiten fragen?|May I also ask about the general conditions for remote work?",
      "die Probezeit besprechen|to discuss the probationary period|Am Ende des Gesprächs besprechen beide Seiten die Probezeit.|At the end of the interview, both sides discuss the probationary period.",
      "eine Stelle antreten|to start a position|Ich könnte die Stelle zum ersten Oktober antreten.|I could start the position on October first.",
      "für eine Aufgabe qualifiziert sein|to be qualified for a task|Durch meine Projekterfahrung bin ich für diese Aufgabe gut qualifiziert.|My project experience makes me well qualified for this task.",
      "die eigene Motivation glaubhaft vermitteln|to convey one's motivation credibly|Konkrete Beispiele helfen, die eigene Motivation glaubhaft zu vermitteln.|Specific examples help convey one's motivation credibly."
    ]),
    P("B2", 17, "b2-hybrid-teams", "Coordinate hybrid teams", "Protect decisions and information across locations.", "Keep distributed colleagues informed, lead a hybrid meeting, and prevent decisions from disappearing across channels.", "contrast, purpose with damit, and spoken turn management", "Colleagues in three locations must decide how and when to release a shared product update.", [
      "asynchron zusammenarbeiten|to work asynchronously|Das internationale Team arbeitet an mehreren Tagen asynchron zusammen.|The international team works asynchronously on several days.",
      "eine Zuständigkeit transparent machen|to make responsibility transparent|Eine klare Übersicht macht jede Zuständigkeit transparent.|A clear overview makes every responsibility transparent.",
      "Informationsverlust vermeiden|to prevent loss of information|Wir dokumentieren Beschlüsse sofort, damit wir Informationsverlust vermeiden.|We document decisions immediately so that we prevent loss of information.",
      "eine hybride Besprechung leiten|to lead a hybrid meeting|Jana leitet die hybride Besprechung aus dem Berliner Büro.|Jana is leading the hybrid meeting from the Berlin office.",
      "den Gesprächsfaden wieder aufnehmen|to pick up the thread of the conversation|Nach der technischen Störung nimmt der Moderator den Gesprächsfaden wieder auf.|After the technical interruption, the moderator picks up the thread again.",
      "Beiträge thematisch bündeln|to group contributions by topic|Ich bündele die bisherigen Beiträge unter drei Themen.|I will group the contributions so far under three topics.",
      "auf den Punkt kommen|to get to the point|Könnten wir bei der offenen Terminfrage auf den Punkt kommen?|Could we get to the point regarding the unresolved scheduling question?",
      "eine Entscheidung im Protokoll vermerken|to record a decision in the minutes|Bitte vermerken Sie die geänderte Frist im Protokoll.|Please record the revised deadline in the minutes.",
      "eine Kernarbeitszeit festlegen|to establish core working hours|Das Team legt eine gemeinsame Kernarbeitszeit von zehn bis vierzehn Uhr fest.|The team is establishing common core hours from ten until two.",
      "sich zeitversetzt abstimmen|to coordinate at different times|Die beiden Standorte stimmen sich über ein gemeinsames Dokument zeitversetzt ab.|The two locations coordinate at different times through a shared document.",
      "den Informationsfluss sicherstellen|to ensure the flow of information|Eine tägliche Kurzmeldung stellt den Informationsfluss sicher.|A brief daily update ensures the flow of information.",
      "einen Kommunikationskanal festlegen|to establish a communication channel|Für dringende Fragen legen wir einen eigenen Kommunikationskanal fest.|We are establishing a separate communication channel for urgent questions."
    ]),
    P("B2", 18, "b2-academic-seminar", "Take part in academic seminars", "Reconstruct, question, and extend an argument fairly.", "Enter a seminar discussion, reconstruct an argument fairly, challenge an assumption, and connect a new contribution to the discussion.", "academic turn-taking, attributed paraphrase, and cautious challenges", "Students discuss a study about remote work and productivity.", [
      "eine Forschungsfrage formulieren|to formulate a research question|Die Autorin formuliert eine klar eingegrenzte Forschungsfrage.|The author formulates a clearly defined research question.",
      "eine Hypothese aufstellen|to propose a hypothesis|Die Forschenden stellen eine Hypothese zum Einfluss der Arbeitszeit auf.|The researchers propose a hypothesis about the effect of working hours.",
      "einen Begriff eindeutig definieren|to define a term clearly|Zu Beginn sollte der Begriff Produktivität eindeutig definiert werden.|At the beginning, the term productivity should be defined clearly.",
      "eine Textstelle heranziehen|to draw on a passage from the text|Zur Begründung zieht sie eine Textstelle aus dem zweiten Kapitel heran.|To support her point, she draws on a passage from the second chapter.",
      "die Argumentationslinie nachzeichnen|to trace the line of argument|Zunächst zeichnet die Autorin die Argumentationslinie des Artikels nach.|First, the author traces the article's line of argument.",
      "eine Annahme hinterfragen|to question an assumption|Der Beitrag hinterfragt die Annahme, dass längere Arbeitszeit mehr Leistung bedeutet.|The contribution questions the assumption that longer working hours mean greater productivity.",
      "methodische Grenzen benennen|to identify methodological limitations|Im Seminar benennt sie zwei methodische Grenzen der Untersuchung.|In the seminar, she identifies two methodological limitations of the study.",
      "an einen Beitrag anknüpfen|to build on a contribution|Ich möchte an Leons Beitrag zur Vergleichsgruppe anknüpfen.|I would like to build on Leon's contribution about the comparison group.",
      "einen Gedankengang weiterführen|to develop a line of thought further|Diesen Gedankengang könnte man auf kleine Unternehmen weiterführen.|This line of thought could be extended to small companies.",
      "um eine Erläuterung bitten|to ask for clarification|Könnten Sie erläutern, wie Sie zu dieser Einschätzung kommen?|Could you explain how you arrived at this assessment?",
      "einen Widerspruch im Text erkennen|to identify a contradiction in a text|Zwischen der Einleitung und dem Fazit lässt sich ein Widerspruch erkennen.|A contradiction can be identified between the introduction and the conclusion.",
      "eine Seminarthese diskutieren|to discuss a seminar proposition|Die Gruppe diskutiert die Seminarthese aus wirtschaftlicher und sozialer Sicht.|The group discusses the seminar proposition from economic and social perspectives."
    ]),
    P("B2", 19, "b2-academic-argument", "Build an academic argument", "Synthesize sources into a supported conclusion.", "Produce a coherent academic text that defines its question, synthesizes literature, distinguishes borrowed ideas, and reaches a supported conclusion.", "paragraph progression, nominalization, paraphrase, and citation", "A student writes a short paper comparing two approaches to urban mobility.", [
      "den Untersuchungsgegenstand eingrenzen|to narrow the subject of investigation|Die Arbeit grenzt den Untersuchungsgegenstand auf zwei Großstädte ein.|The paper narrows the subject of investigation to two major cities.",
      "eine Fragestellung herleiten|to derive a research question|Aus dem bisherigen Forschungsstand wird die Fragestellung hergeleitet.|The research question is derived from the current state of research.",
      "den Textaufbau planen|to plan the structure of a text|Vor dem Schreiben plant die Autorin den Textaufbau in fünf Abschnitten.|Before writing, the author plans the structure of the text in five sections.",
      "einen roten Faden entwickeln|to develop a coherent thread|Klare Leitfragen helfen, einen roten Faden zu entwickeln.|Clear guiding questions help develop a coherent thread.",
      "Fachliteratur systematisch sichten|to review specialist literature systematically|Für den Theorieteil muss sie die Fachliteratur systematisch sichten.|She needs to review the specialist literature systematically for the theory section.",
      "einen Abschnitt sinnvoll eröffnen|to open a section effectively|Ein kurzer Bezug zur Leitfrage eröffnet den Abschnitt sinnvoll.|A brief reference to the guiding question opens the section effectively.",
      "einen logischen Übergang schaffen|to create a logical transition|Der letzte Satz schafft einen logischen Übergang zum nächsten Argument.|The final sentence creates a logical transition to the next argument.",
      "einen Beleg in die Argumentation einbauen|to integrate evidence into the argument|Die Studie wird als Beleg in die Argumentation eingebaut.|The study is integrated into the argument as evidence.",
      "sinngemäß paraphrasieren|to paraphrase without changing the meaning|Die Aussage wird sinngemäß paraphrasiert und mit einer Quelle versehen.|The statement is paraphrased without changing its meaning and is accompanied by a source.",
      "einen Quellenverweis setzen|to add a source reference|Nach jeder übernommenen Zahl muss ein Quellenverweis gesetzt werden.|A source reference must be added after every borrowed figure.",
      "eine Gegenposition klar abgrenzen|to distinguish an opposing position clearly|Im dritten Abschnitt grenzt die Autorin die Gegenposition klar ab.|In the third section, the author clearly distinguishes the opposing position.",
      "das Fazit aus der Analyse ableiten|to derive the conclusion from the analysis|Das Fazit muss nachvollziehbar aus der Analyse abgeleitet werden.|The conclusion must be derived logically from the analysis."
    ]),
    P("B2", 20, "b2-critical-statistics", "Read statistics critically", "Separate association, cause, uncertainty, and effect.", "Interpret a statistical claim, distinguish correlation from causation, and explain limitations to a non-specialist audience.", "proportional comparison and cautious causal language", "A company claims that a new policy increased productivity based on an employee survey.", [
      "die Grundgesamtheit, die Grundgesamtheiten|statistical population|Die Grundgesamtheit umfasst alle Beschäftigten des Unternehmens.|The statistical population includes all employees of the company.",
      "die Kontrollgruppe, die Kontrollgruppen|control group|Ohne Kontrollgruppe lässt sich der Effekt schwer beurteilen.|Without a control group, the effect is difficult to assess.",
      "die Fehlermarge, die Fehlermargen|margin of error|Bei der kleinen Befragung ist die Fehlermarge relativ groß.|The margin of error is relatively large in the small survey.",
      "der Median, die Mediane|median|Der Median liegt deutlich unter dem arithmetischen Mittel.|The median is considerably below the arithmetic mean.",
      "eine Korrelation feststellen|to identify a correlation|Die Forschenden stellen eine Korrelation zwischen Schlaf und Konzentration fest.|The researchers identify a correlation between sleep and concentration.",
      "einen kausalen Zusammenhang belegen|to demonstrate a causal relationship|Die vorliegenden Zahlen belegen keinen kausalen Zusammenhang.|The available figures do not demonstrate a causal relationship.",
      "eine systematische Verzerrung erkennen|to identify systematic bias|Die freiwillige Teilnahme könnte eine systematische Verzerrung verursachen.|Voluntary participation could cause systematic bias.",
      "einen Störfaktor kontrollieren|to control for a confounding factor|Bei der Auswertung wurde das Alter als Störfaktor kontrolliert.|Age was controlled for as a confounding factor in the analysis.",
      "Werte streuen stark|values vary widely|Die Werte streuen stark zwischen den einzelnen Abteilungen.|The values vary widely between the individual departments.",
      "statistisch signifikant sein|to be statistically significant|Der Unterschied ist klein, aber statistisch signifikant.|The difference is small but statistically significant.",
      "die Effektgröße, die Effektgrößen|effect size|Die Effektgröße zeigt, wie stark der beobachtete Unterschied ist.|The effect size shows how large the observed difference is.",
      "Scheingenauigkeit vermeiden|to avoid false precision|Gerundete Angaben helfen, Scheingenauigkeit zu vermeiden.|Rounded figures help avoid false precision."
    ]),
    P("B2", 21, "b2-live-debate", "Debate in real time", "Challenge reasoning while locating the exact disagreement.", "Enter a fast-moving discussion, challenge reasoning without attacking a person, and locate the exact point of disagreement.", "concession, rebuttal, turn-taking, and reframing", "A moderated debate considers whether city centers should charge vehicles an access fee.", [
      "das Wort ergreifen|to take the floor|Nach der ersten Runde ergreift eine Vertreterin des Handels das Wort.|After the first round, a retail representative takes the floor.",
      "jemanden ausreden lassen|to let someone finish speaking|Bitte lassen Sie mich den Gedanken kurz ausreden.|Please let me finish the thought briefly.",
      "an einer Stelle einhaken|to pick up on a particular point|An dieser Stelle möchte ich kurz einhaken.|I would like to pick up on this point briefly.",
      "eine Prämisse infrage stellen|to question a premise|Ich stelle die Prämisse infrage, dass alle Betriebe gleichermaßen betroffen wären.|I question the premise that all businesses would be affected equally.",
      "den Rahmen der Debatte abstecken|to define the scope of the debate|Die Moderatorin steckt zunächst den Rahmen der Debatte ab.|The moderator first defines the scope of the debate.",
      "zum eigentlichen Punkt zurückführen|to bring the discussion back to the real issue|Lassen Sie uns die Diskussion zum eigentlichen Punkt zurückführen.|Let us bring the discussion back to the real issue.",
      "eine Position zuspitzen|to sharpen a position|Der Redner spitzt seine Position mit einer klaren Forderung zu.|The speaker sharpens his position with a clear demand.",
      "eine Behauptung differenzieren|to qualify a claim|Diese Behauptung muss nach Stadtteilen differenziert werden.|This claim needs to be qualified according to district.",
      "ein Gegenbeispiel anführen|to offer a counterexample|Als Gegenbeispiel führt sie eine vergleichbare Stadt ohne Gebühr an.|She offers a comparable city without a fee as a counterexample.",
      "eine rhetorische Frage einsetzen|to use a rhetorical question|Er setzt eine rhetorische Frage ein, um die Folge des Plans zu verdeutlichen.|He uses a rhetorical question to illustrate the consequence of the plan.",
      "den Dissens genau benennen|to identify the disagreement precisely|Der Dissens betrifft die Kostenverteilung, nicht das gemeinsame Ziel.|The disagreement concerns cost distribution rather than the shared goal.",
      "einen gemeinsamen Nenner finden|to find common ground|Beim Ausbau des Nahverkehrs finden beide Seiten einen gemeinsamen Nenner.|Both sides find common ground on expanding public transportation."
    ]),
    P("B2", 22, "b2-supplier-negotiation", "Negotiate contracts and suppliers", "Trade several conditions as one precise package.", "Negotiate several contract terms as a package, make conditional concessions, and protect essential operational requirements.", "reciprocal conditions and comparative trade-offs", "A small company negotiates price, delivery, support, and liability with a software supplier.", [
      "die Mindestabnahmemenge, die Mindestabnahmemengen|minimum purchase quantity|Der günstigere Preis gilt erst ab einer Mindestabnahmemenge von hundert Stück.|The lower price applies only from a minimum purchase quantity of one hundred units.",
      "Lieferkonditionen aushandeln|to negotiate delivery terms|Beide Unternehmen handeln neue Lieferkonditionen aus.|Both companies are negotiating new delivery terms.",
      "Skonto gewähren|to grant a prompt-payment discount|Bei Zahlung innerhalb von zehn Tagen gewährt der Anbieter zwei Prozent Skonto.|The supplier grants a two-percent prompt-payment discount for payment within ten days.",
      "den Haftungsumfang begrenzen|to limit the scope of liability|Der Dienstleister möchte den Haftungsumfang vertraglich begrenzen.|The service provider wants to limit the scope of liability by contract.",
      "ein Leistungsniveau zusichern|to guarantee a service level|Der Anbieter sichert eine Verfügbarkeit von 99,5 Prozent zu.|The supplier guarantees availability of 99.5 percent.",
      "eine Vertragsstrafe vorsehen|to provide for a contractual penalty|Der Entwurf sieht bei wiederholter Verspätung eine Vertragsstrafe vor.|The draft provides for a contractual penalty in the event of repeated delays.",
      "einen Eskalationsweg festlegen|to establish an escalation path|Für kritische Störungen legen beide Seiten einen Eskalationsweg fest.|Both sides establish an escalation path for critical disruptions.",
      "ein Angebot nachbessern|to improve an offer|Wenn Sie den Support erweitern, könnten wir unser Angebot nachbessern.|If you expand the support, we could improve our offer.",
      "ein Zugeständnis an eine Bedingung knüpfen|to make a concession conditional|Wir knüpfen den Preisnachlass an eine längere Vertragsdauer.|We are making the price reduction conditional on a longer contract term.",
      "mehrere Punkte zu einem Paket verbinden|to combine several points into a package|Die Verhandlungsführerin verbindet Preis, Laufzeit und Schulung zu einem Paket.|The negotiator combines price, duration, and training into a package.",
      "die eigene Schmerzgrenze festlegen|to establish one's walk-away point|Vor dem Gespräch legt das Team seine finanzielle Schmerzgrenze fest.|Before the discussion, the team establishes its financial walk-away point.",
      "eine Alternative in der Hinterhand haben|to have an alternative in reserve|Ohne eine Alternative in der Hinterhand wäre unsere Position deutlich schwächer.|Without an alternative in reserve, our position would be considerably weaker."
    ]),
    P("B2", 23, "b2-multiparty-mediation", "Mediate multi-party conflict", "Surface interests and create a monitorable agreement.", "Manage a conflict involving unequal authority, uncover interests behind demands, and create an agreement that can be monitored.", "neutral reformulation, Konjunktiv II options, and conditional agreement", "Employees, management, and a client disagree about staffing, service hours, and responsibility for delays.", [
      "allparteilich bleiben|to remain equally supportive of all parties|Die Mediatorin bleibt allparteilich und gibt jeder Seite gleich viel Raum.|The mediator remains equally supportive of all parties and gives each side equal space.",
      "Interessen hinter Positionen ermitteln|to identify interests behind positions|Zunächst ermittelt die Gruppe die Interessen hinter den festen Positionen.|First, the group identifies the interests behind the fixed positions.",
      "Gesprächsregeln vereinbaren|to agree on ground rules|Vor der Diskussion vereinbaren alle Beteiligten verbindliche Gesprächsregeln.|Before the discussion, everyone agrees on binding ground rules.",
      "Emotionen spiegeln|to reflect emotions|Die Vermittlerin spiegelt die Enttäuschung, ohne die Sichtweise zu übernehmen.|The mediator reflects the disappointment without adopting that point of view.",
      "einen Vorwurf neutral umformulieren|to rephrase an accusation neutrally|Die Vermittlerin formuliert den Vorwurf neutral um und benennt die konkrete Sorge.|The mediator rephrases the accusation neutrally and names the specific concern.",
      "ein vertrauliches Einzelgespräch anbieten|to offer a confidential private meeting|Bei Bedarf bietet die Mediatorin ein vertrauliches Einzelgespräch an.|If needed, the mediator offers a confidential private meeting.",
      "ungleiche Machtverhältnisse ansprechen|to address unequal power relationships|Die Gesprächsleitung spricht die ungleichen Machtverhältnisse offen an.|The facilitator addresses the unequal power relationships openly.",
      "festgefahrene Positionen lockern|to loosen entrenched positions|Neue Optionen können festgefahrene Positionen lockern.|New options can loosen entrenched positions.",
      "einen Lösungskorridor abstecken|to define a range of possible solutions|Nach den Einzelgesprächen steckt die Gruppe einen realistischen Lösungskorridor ab.|After the private meetings, the group defines a realistic range of possible solutions.",
      "eine Zwischenvereinbarung treffen|to reach an interim agreement|Bis zum nächsten Termin treffen wir eine Zwischenvereinbarung zur Personalplanung.|Until the next meeting, we will reach an interim agreement on staffing.",
      "die Einhaltung einer Abmachung überprüfen|to verify compliance with an agreement|Nach vier Wochen wird die Einhaltung der Abmachung gemeinsam überprüft.|Compliance with the agreement will be reviewed jointly after four weeks.",
      "bei Regelverstößen eingreifen|to intervene when rules are broken|Die Gesprächsleitung greift ein, sobald persönliche Angriffe auftreten.|The facilitator intervenes as soon as personal attacks occur."
    ]),
    P("B2", 24, "b2-public-consultation", "Participate in public consultations", "Question a proposal and track what happens to public input.", "Understand a planning process, submit a precise objection, question officials, and track what happens to public input.", "administrative passive and formal written submissions", "Residents respond to a proposed road redesign at a public consultation.", [
      "das Beteiligungsverfahren, die Beteiligungsverfahren|public participation process|Das Beteiligungsverfahren beginnt mit einer öffentlichen Informationsveranstaltung.|The public participation process begins with a public information event.",
      "die öffentliche Auslegung|public display of planning documents|Die öffentliche Auslegung der Pläne dauert vier Wochen.|The public display of the plans lasts four weeks.",
      "eine Einwendung einreichen|to submit an objection|Betroffene können bis Ende Mai eine schriftliche Einwendung einreichen.|Affected people can submit a written objection until the end of May.",
      "an einer Bürgersprechstunde teilnehmen|to attend a public office hour|Viele Anwohnende nehmen an der Bürgersprechstunde teil.|Many residents attend the public office hour.",
      "einen Wortbeitrag anmelden|to register to speak|Wer sprechen möchte, muss vorher einen Wortbeitrag anmelden.|Anyone who wants to speak must register beforehand.",
      "die eigene Betroffenheit darlegen|to explain how one is affected|In ihrer Eingabe legt die Ladeninhaberin ihre Betroffenheit dar.|In her submission, the shop owner explains how she is affected.",
      "Planungsunterlagen einsehen|to inspect planning documents|Die vollständigen Planungsunterlagen können online eingesehen werden.|The complete planning documents can be inspected online.",
      "eine Sachfrage an die Verwaltung richten|to direct a factual question to the administration|Ein Anwohner richtet eine Sachfrage zur Lärmberechnung an die Verwaltung.|A resident directs a factual question about the noise calculation to the administration.",
      "einen Änderungsvorschlag begründen|to justify a proposed amendment|Die Initiative begründet ihren Änderungsvorschlag mit neuen Verkehrsdaten.|The initiative justifies its proposed amendment with new traffic data.",
      "eine schriftliche Antwort einfordern|to request a written answer|Zu der ungeklärten Kostenfrage fordert die Gruppe eine schriftliche Antwort ein.|The group requests a written answer to the unresolved cost question.",
      "den Beschlussweg nachverfolgen|to track the decision process|Auf der Internetseite lässt sich der weitere Beschlussweg nachverfolgen.|The further decision process can be tracked on the website.",
      "kommunale und landesweite Aufgaben auseinanderhalten|to distinguish municipal and state responsibilities|In der Diskussion müssen wir kommunale und landesweite Aufgaben auseinanderhalten.|In the discussion, we need to distinguish municipal and state responsibilities."
    ]),
    P("B2", 25, "b2-consumer-contract-dispute", "Resolve consumer contract disputes", "Interpret the terms and demand a documented remedy.", "Interpret key contract terms, choose an appropriate remedy, and write a documented consumer complaint with a clear deadline.", "dense conditions, deadline sequences, and formal remedy language", "A subscription renews unexpectedly and a purchased device develops a serious defect.", [
      "eine Vertragsklausel prüfen|to examine a contract clause|Vor der Kündigung prüft sie die betreffende Vertragsklausel.|Before canceling, she examines the relevant contract clause.",
      "die Mindestvertragslaufzeit, die Mindestvertragslaufzeiten|minimum contract term|Die Mindestvertragslaufzeit beträgt zwölf Monate.|The minimum contract term is twelve months.",
      "die automatische Verlängerung|automatic renewal|Die automatische Verlängerung ist im Vertrag deutlich hervorgehoben.|The automatic renewal is clearly highlighted in the contract.",
      "das Widerrufsrecht ausüben|to exercise the right of withdrawal|Der Kunde übt sein Widerrufsrecht innerhalb der angegebenen Frist aus.|The customer exercises his right of withdrawal within the stated period.",
      "von einem Vertrag zurücktreten|to withdraw from a contract|Nach der erfolglosen Nachbesserung möchte sie vom Vertrag zurücktreten.|After the unsuccessful repair attempt, she wants to withdraw from the contract.",
      "eine Kündigung nachweisbar versenden|to send a cancellation with proof|Ich habe die Kündigung per Einschreiben nachweisbar versandt.|I sent the cancellation by registered mail so that delivery can be proven.",
      "die Gewährleistung in Anspruch nehmen|to make use of the statutory warranty|Bei dem Defekt nimmt der Käufer die Gewährleistung in Anspruch.|The buyer makes use of the statutory warranty because of the defect.",
      "einen Sachmangel geltend machen|to assert that goods are defective|In dem Schreiben macht sie einen Sachmangel am Gerät geltend.|In the letter, she asserts that the device is defective.",
      "eine Ersatzlieferung fordern|to request a replacement delivery|Der Kunde fordert eine Ersatzlieferung innerhalb von vierzehn Tagen.|The customer requests a replacement delivery within fourteen days.",
      "eine Nachfrist setzen|to set an additional deadline|Bevor sie weitere Schritte prüft, setzt sie dem Anbieter eine Nachfrist.|Before considering further steps, she gives the supplier an additional deadline.",
      "den Vertragspartner in Verzug setzen|to place the contracting party in default|Mit einer Mahnung und einer Frist setze ich den Vertragspartner in Verzug.|With a reminder and a deadline, I place the contracting party in default.",
      "eine Schlichtungsstelle einschalten|to involve a dispute resolution body|Wenn beide Seiten keine Lösung finden, kann eine Schlichtungsstelle eingeschaltet werden.|If the two sides cannot find a solution, a dispute resolution body can be involved."
    ]),
    P("B2", 26, "b2-insurance-claims", "Handle insurance claims", "Reconstruct the damage and question the decision.", "Report an insured event, reconstruct the damage precisely, provide evidence, and question a partial or rejected payment.", "chronological narration, causal distinctions, and formal review requests", "Water damages a rented apartment, and the insurer requests further documentation.", [
      "einen Versicherungsfall melden|to report an insured event|Der Mieter meldet den Versicherungsfall noch am selben Tag.|The tenant reports the insured event on the same day.",
      "der Versicherungsschutz|insurance coverage|Zunächst muss geklärt werden, ob für diesen Schaden Versicherungsschutz besteht.|First, it must be clarified whether insurance coverage exists for this damage.",
      "die Selbstbeteiligung, die Selbstbeteiligungen|deductible|Laut Vertrag beträgt die Selbstbeteiligung zweihundert Euro.|According to the contract, the deductible is two hundred euros.",
      "den Schadenshergang schildern|to describe how the damage occurred|Im Formular schildert sie den Schadenshergang in zeitlicher Reihenfolge.|In the form, she describes how the damage occurred in chronological order.",
      "einen Kostenvoranschlag einholen|to obtain a cost estimate|Vor der Reparatur holt er einen Kostenvoranschlag ein.|Before the repair, he obtains a cost estimate.",
      "eine Schadennummer erhalten|to receive a claim number|Nach der Online-Meldung erhält die Kundin eine Schadennummer.|After reporting the claim online, the customer receives a claim number.",
      "die Deckung prüfen lassen|to have coverage checked|Wir lassen prüfen, ob auch die Folgeschäden gedeckt sind.|We are having it checked whether the consequential damage is also covered.",
      "eine Erstattung beantragen|to apply for reimbursement|Mit den Originalrechnungen beantragt er die Erstattung der Kosten.|He applies for reimbursement of the costs using the original invoices.",
      "eine Leistungskürzung begründen lassen|to request reasons for a reduction in benefits|Die Versicherte lässt sich die Leistungskürzung schriftlich begründen.|The insured person requests written reasons for the reduction in benefits.",
      "eine Ablehnung überprüfen lassen|to have a rejection reviewed|Nach dem Gutachten möchte sie die Ablehnung erneut überprüfen lassen.|After the expert report, she wants to have the rejection reviewed again.",
      "Belege geordnet beifügen|to attach supporting documents in an organized way|Dem Schreiben füge ich Fotos und Rechnungen geordnet bei.|I am attaching photographs and invoices to the letter in an organized way.",
      "den Zeitwert ermitteln|to determine the current value|Für das beschädigte Fahrrad wird zunächst der Zeitwert ermittelt.|First, the current value of the damaged bicycle is determined."
    ]),
    P("B2", 27, "b2-healthcare-decisions", "Make healthcare decisions", "Weigh benefits, risks, alternatives, and personal priorities.", "Discuss benefits, risks, alternatives, and personal priorities before consenting to a treatment.", "comparative risk language, passive consent forms, and teach-back questions", "A patient considers an operation after conservative treatment brought limited improvement.", [
      "eine informierte Entscheidung treffen|to make an informed decision|Nach dem Aufklärungsgespräch kann die Patientin eine informierte Entscheidung treffen.|After the consultation, the patient can make an informed decision.",
      "Nutzen und Risiken gegeneinander abwägen|to weigh benefits against risks|Vor dem Eingriff sollten Nutzen und Risiken gegeneinander abgewogen werden.|Benefits and risks should be weighed against each other before the procedure.",
      "eine zweite Meinung einholen|to seek a second opinion|Bei der schwierigen Entscheidung möchte er eine zweite Meinung einholen.|He wants to seek a second opinion about the difficult decision.",
      "eine Einwilligung erteilen|to give consent|Die Einwilligung wird erst nach der vollständigen Aufklärung erteilt.|Consent is given only after complete explanation.",
      "eine Behandlung ablehnen|to decline a treatment|Die Patientin darf eine vorgeschlagene Behandlung ablehnen.|The patient may decline a proposed treatment.",
      "über Behandlungsalternativen aufgeklärt werden|to be informed about treatment alternatives|Er wurde auch über weniger invasive Behandlungsalternativen aufgeklärt.|He was also informed about less invasive treatment alternatives.",
      "eine Vorerkrankung angeben|to disclose a pre-existing condition|Im Aufnahmebogen gibt sie ihre Vorerkrankung vollständig an.|She discloses her pre-existing condition fully on the admission form.",
      "mögliche Wechselwirkungen abklären|to clarify possible drug interactions|Vor der neuen Medikation müssen mögliche Wechselwirkungen abgeklärt werden.|Possible drug interactions need to be clarified before the new medication is started.",
      "den Krankheitsverlauf beobachten|to monitor the course of an illness|In den nächsten Wochen soll sie den Krankheitsverlauf genau beobachten.|She should monitor the course of the illness closely over the next few weeks.",
      "eine Prognose verstehen|to understand a prognosis|Der Arzt erklärt die Prognose mit konkreten Zeiträumen.|The doctor explains the prognosis using specific periods.",
      "Behandlungsziele festlegen|to establish treatment goals|Patient und Ärztin legen gemeinsam realistische Behandlungsziele fest.|The patient and doctor establish realistic treatment goals together.",
      "eine Patientenverfügung hinterlegen|to place an advance directive on file|Sie hat eine aktuelle Patientenverfügung bei ihrer Hausärztin hinterlegt.|She has placed an up-to-date advance directive on file with her family doctor."
    ]),
    P("B2", 28, "b2-banking-fraud", "Manage banking and fraud concerns", "Secure the account and compare borrowing costs.", "Report suspicious account activity, understand borrowing costs, and take secure action through a bank.", "percentages, financial compounds, lassen, and conditional sequences", "A customer notices an unfamiliar payment while comparing two loan offers.", [
      "eine verdächtige Kontobewegung melden|to report a suspicious account transaction|Der Kunde meldet der Bank sofort eine verdächtige Kontobewegung.|The customer immediately reports a suspicious account transaction to the bank.",
      "eine Karte sperren lassen|to have a card blocked|Nach dem Verlust lässt sie ihre Karte telefonisch sperren.|After losing it, she has her card blocked by telephone.",
      "eine Lastschrift zurückgeben|to reverse a direct debit|Eine unberechtigte Lastschrift kann im Onlinebanking zurückgegeben werden.|An unauthorized direct debit can be reversed through online banking.",
      "eine Überweisung zurückrufen|to recall a bank transfer|Er versucht, die fehlerhafte Überweisung noch am selben Tag zurückzurufen.|He tries to recall the incorrect bank transfer on the same day.",
      "das Tageslimit ändern|to change the daily transaction limit|Für die größere Zahlung lässt sie vorübergehend das Tageslimit ändern.|She has the daily transaction limit changed temporarily for the larger payment.",
      "der effektive Jahreszins|annual percentage rate|Beim Vergleich ist der effektive Jahreszins wichtiger als der Sollzins allein.|When comparing offers, the annual percentage rate is more important than the borrowing rate alone.",
      "die Kreditrate, die Kreditraten|loan installment|Die monatliche Kreditrate darf das Haushaltsbudget nicht überlasten.|The monthly loan installment must not overburden the household budget.",
      "eine Bonitätsprüfung durchlaufen|to undergo a credit check|Vor der Kreditzusage muss der Antragsteller eine Bonitätsprüfung durchlaufen.|The applicant must undergo a credit check before loan approval.",
      "eine Gebührenübersicht vergleichen|to compare a schedule of fees|Vor dem Kontowechsel vergleicht sie die Gebührenübersichten beider Banken.|Before changing accounts, she compares the fee schedules of both banks.",
      "einen Kredit vorzeitig ablösen|to repay a loan early|Unter bestimmten Bedingungen kann der Kredit vorzeitig abgelöst werden.|Under certain conditions, the loan can be repaid early.",
      "eine Zwei-Faktor-Authentifizierung einrichten|to set up two-factor authentication|Zum Schutz des Kontos richtet er eine Zwei-Faktor-Authentifizierung ein.|He sets up two-factor authentication to protect the account.",
      "einen Betrugsversuch erkennen|to recognize an attempted fraud|An der gefälschten Internetadresse erkennt sie den Betrugsversuch.|She recognizes the attempted fraud from the fake web address."
    ]),
    P("B2", 29, "b2-emergency-communication", "Communicate during emergencies", "Relay verified warnings and correct uncertain reports.", "Give precise information under pressure, relay verified warnings, and correct uncertain or false reports.", "compact emergency answers, strict chronology, and source attribution", "Severe weather causes flooding, power loss, and conflicting neighborhood messages.", [
      "einen Notruf absetzen|to place an emergency call|Eine Nachbarin setzt wegen des starken Rauchs einen Notruf ab.|A neighbor places an emergency call because of the heavy smoke.",
      "die Lage knapp beschreiben|to describe the situation concisely|Am Telefon beschreibt die Nachbarin die Lage knapp und sachlich.|On the telephone, the neighbor describes the situation concisely and objectively.",
      "den eigenen Standort genau durchgeben|to give one's exact location|Bitte geben Sie Ihren Standort mit Straße und Hausnummer genau durch.|Please give your exact location with the street and house number.",
      "eine Gefahrenstelle absichern|to secure a hazardous area|Die Einsatzkräfte sichern die Gefahrenstelle weiträumig ab.|The emergency services secure a wide area around the hazard.",
      "den Anweisungen der Einsatzkräfte folgen|to follow emergency-service instructions|Alle Anwohnenden sollen den Anweisungen der Einsatzkräfte folgen.|All residents should follow the instructions of the emergency services.",
      "den Rettungsweg freihalten|to keep an emergency route clear|Fahrzeuge müssen den Rettungsweg vollständig freihalten.|Vehicles must keep the emergency route completely clear.",
      "eine Person als vermisst melden|to report a person missing|Die Familie meldet den Wanderer am Abend als vermisst.|The family reports the hiker missing in the evening.",
      "Entwarnung geben|to give the all-clear|Die Feuerwehr gibt erst nach der Messung Entwarnung.|The fire department gives the all-clear only after taking measurements.",
      "eine amtliche Warnmeldung weitergeben|to pass on an official warning|Teilen Sie nur die amtliche Warnmeldung in der Nachbarschaftsgruppe.|Share only the official warning in the neighborhood group.",
      "eine unbestätigte Meldung korrigieren|to correct an unconfirmed report|Die Stadt korrigiert die unbestätigte Meldung über eine Evakuierung.|The city corrects the unconfirmed report about an evacuation.",
      "Erste Hilfe leisten|to provide first aid|Bis der Rettungsdienst eintrifft, leistet ein Passant Erste Hilfe.|A passerby provides first aid until the ambulance service arrives.",
      "für Rückfragen erreichbar bleiben|to remain available for follow-up questions|Nach der Meldung bleibt die Zeugin für Rückfragen erreichbar.|After making the report, the witness remains available for follow-up questions."
    ]),
    P("B2", 30, "b2-media-framing", "Verify media and recognize framing", "Trace claims and explain the limits of the evidence.", "Trace a viral claim to its origin, identify framing choices, and explain what can and cannot be concluded.", "source chains, reported speech, framing, and calibrated certainty", "A short viral video and three articles give conflicting accounts of the same demonstration.", [
      "eine Nachricht von einem Kommentar trennen|to distinguish a news report from commentary|Leserinnen sollten eine Nachricht klar von einem Kommentar trennen können.|Readers should be able to distinguish a news report clearly from commentary.",
      "das Framing einer Darstellung erkennen|to recognize the framing of an account|Schon die Wortwahl lässt das Framing der Darstellung erkennen.|The choice of words alone reveals the framing of the account.",
      "eine zugespitzte Schlagzeile einordnen|to assess a sensationalized headline|Der vollständige Artikel hilft, die zugespitzte Schlagzeile einzuordnen.|The full article helps assess the sensationalized headline.",
      "den ursprünglichen Kontext wiederherstellen|to restore the original context|Das längere Video stellt den ursprünglichen Kontext der Szene wieder her.|The longer video restores the original context of the scene.",
      "redaktionelle Inhalte und Werbung unterscheiden|to distinguish editorial content from advertising|Die Kennzeichnung hilft, redaktionelle Inhalte und Werbung zu unterscheiden.|The label helps distinguish editorial content from advertising.",
      "eine Interessenkollision offenlegen|to disclose a conflict of interest|Die Autorin legt ihre finanzielle Interessenkollision am Anfang offen.|The author discloses her financial conflict of interest at the beginning.",
      "eine nachträgliche Korrektur nachvollziehen|to trace a later correction|Im Änderungsprotokoll lässt sich die nachträgliche Korrektur nachvollziehen.|The later correction can be traced in the change log.",
      "eine synthetisch erzeugte Aufnahme erkennen|to identify synthetically generated media|Mehrere Bildfehler deuten auf eine synthetisch erzeugte Aufnahme hin.|Several visual errors indicate synthetically generated media.",
      "eine Behauptung zum Ursprung zurückverfolgen|to trace a claim back to its origin|Die Behauptung lässt sich zu einem anonymen Beitrag zurückverfolgen.|The claim can be traced back to an anonymous post.",
      "mehrere unabhängige Quellen heranziehen|to consult several independent sources|Vor der Veröffentlichung zieht die Redaktion mehrere unabhängige Quellen heran.|Before publication, the editorial team consults several independent sources.",
      "eine Leerstelle in der Berichterstattung erkennen|to identify a gap in coverage|Der Artikel nennt die Kosten, lässt jedoch die Finanzierung offen.|The article names the costs but leaves the financing unexplained.",
      "eine Bildunterschrift gegenprüfen|to verify an image caption independently|Eine Rückwärtssuche hilft, die Bildunterschrift gegenzuprüfen.|A reverse search helps verify the image caption independently."
    ]),
    P("B2", 31, "b2-privacy-platforms", "Protect privacy and handle platform disputes", "Control data use and respond to abusive platform activity.", "Understand a privacy notice, change permissions, request information or deletion, and respond to harmful platform activity.", "policy paraphrase, formal requests, and moderation language", "A social platform changes its data settings while an abusive post targets a user.", [
      "einer Datennutzung zustimmen|to consent to the use of data|Die Nutzerin stimmt nur der technisch notwendigen Datennutzung zu.|The user consents only to the technically necessary use of data.",
      "eine Einwilligung widerrufen|to withdraw consent|Eine bereits erteilte Einwilligung kann später widerrufen werden.|Consent that has already been given can be withdrawn later.",
      "die Datenschutzeinstellungen anpassen|to adjust privacy settings|Nach dem Update passt der Nutzer seine Datenschutzeinstellungen erneut an.|After the update, the user adjusts his privacy settings again.",
      "Zugriffsrechte beschränken|to restrict access permissions|Die Administratorin beschränkt die Zugriffsrechte auf das zuständige Team.|The administrator restricts access permissions to the responsible team.",
      "personenbezogene Daten schützen|to protect personal data|Zusätzliche Sicherheitsmaßnahmen schützen personenbezogene Daten.|Additional security measures protect personal data.",
      "eine Datenpanne melden|to report a data breach|Das Unternehmen meldet die Datenpanne nach ihrer Entdeckung.|The company reports the data breach after discovering it.",
      "die Löschung eines Kontos verlangen|to request deletion of an account|Der ehemalige Kunde verlangt schriftlich die Löschung seines Kontos.|The former customer requests deletion of his account in writing.",
      "Auskunft über gespeicherte Daten verlangen|to request information about stored data|Die Nutzerin verlangt Auskunft darüber, welche Daten über sie gespeichert sind.|The user requests information about which data are stored about her.",
      "einen missbräuchlichen Beitrag melden|to report an abusive post|Mehrere Personen melden den missbräuchlichen Beitrag der Plattform.|Several people report the abusive post to the platform.",
      "eine Kommentarspalte moderieren|to moderate a comments section|Zwei Redakteure moderieren die Kommentarspalte nach klaren Regeln.|Two editors moderate the comments section according to clear rules.",
      "eine Kontosperre anfechten|to appeal an account suspension|Der Nutzer ficht die Kontosperre mit einer sachlichen Begründung an.|The user appeals the account suspension with an objective explanation.",
      "einen Screenshot als Beleg sichern|to preserve a screenshot as evidence|Vor dem Melden sichert die Nutzerin einen Screenshot als Beleg.|Before reporting the post, the user preserves a screenshot as evidence."
    ]),
    P("B2", 32, "b2-depth-interview", "Conduct an in-depth interview", "Follow answers, address contradictions, and protect the guest's agency.", "Ask productive follow-up questions, address contradictions, and guide a long interview without forcing the guest's answer.", "open questions, follow-up chains, and neutral paraphrase", "A podcast host interviews a community organizer about a controversial local project.", [
      "eine offene Frage stellen|to ask an open-ended question|Zu Beginn stellt die Moderatorin eine offene Frage nach den Zielen des Projekts.|At the beginning, the host asks an open-ended question about the project's goals.",
      "präzise nachhaken|to follow up precisely|Bei der unklaren Zeitangabe hakt die Moderatorin präzise nach.|The host follows up precisely on the unclear time reference.",
      "um ein anschauliches Beispiel bitten|to ask for a concrete illustration|Können Sie uns dafür ein anschauliches Beispiel geben?|Can you give us a concrete illustration of that?",
      "einer ausweichenden Antwort begegnen|to respond to an evasive answer|Die Moderatorin begegnet der ausweichenden Antwort mit einer enger gefassten Nachfrage.|The host responds to the evasive answer with a more narrowly framed follow-up question.",
      "eine Antwort neutral paraphrasieren|to paraphrase an answer neutrally|Die Moderatorin paraphrasiert die Antwort, bevor sie zum nächsten Punkt übergeht.|The host paraphrases the answer before moving to the next point.",
      "zu einem anderen Thema kommen|to move to another topic|Ich möchte jetzt zu einem anderen Thema kommen und über die Finanzierung sprechen.|I would now like to move to another topic and discuss financing.",
      "eine sensible Frage behutsam einleiten|to introduce a sensitive question carefully|Die persönliche Frage wird mit einem Hinweis auf ihre Freiwilligkeit behutsam eingeleitet.|The personal question is introduced carefully with a reminder that answering is voluntary.",
      "einen Widerspruch ansprechen|to address a contradiction|Darf ich einen Widerspruch zwischen diesen beiden Aussagen ansprechen?|May I address a contradiction between these two statements?",
      "den zeitlichen Rahmen im Blick behalten|to keep track of the available time|Trotz der ausführlichen Antwort behält die Moderatorin den zeitlichen Rahmen im Blick.|Despite the detailed answer, the host keeps track of the available time.",
      "eine Gesprächspause zulassen|to allow a pause in the conversation|Nach der schwierigen Frage lässt die Moderatorin eine Gesprächspause zu.|After the difficult question, the host allows a pause.",
      "eine Kernaussage herausarbeiten|to draw out a key message|Durch zwei Nachfragen arbeitet die Moderatorin die Kernaussage des Gastes heraus.|Through two follow-up questions, the host draws out the guest's key message.",
      "ein Gespräch abrunden|to bring a conversation to a close|Eine Frage nach dem nächsten Schritt rundet das Gespräch ab.|A question about the next step brings the conversation to a close."
    ]),
    P("B2", 33, "b2-professional-relationships", "Build professional relationships", "Turn a natural conversation into a concrete follow-up.", "Start and leave professional conversations naturally, connect people, and turn a promising exchange into a concrete follow-up.", "formal or informal address and soft conversational transitions", "You attend an industry conference reception and follow up the next day.", [
      "ein Gespräch ungezwungen eröffnen|to open a conversation naturally|Eine Frage zum Vortrag eröffnet das Gespräch ungezwungen.|A question about the presentation opens the conversation naturally.",
      "sich kurz und prägnant vorstellen|to introduce oneself briefly and clearly|Beim Empfang stellt sich die Teilnehmerin kurz und prägnant vor.|At the reception, the participant introduces herself briefly and clearly.",
      "einen fachlichen Anknüpfungspunkt finden|to find a professional point of connection|Über das gemeinsame Forschungsgebiet finden beide schnell einen fachlichen Anknüpfungspunkt.|They quickly find a professional point of connection through their shared field of research.",
      "Kontakte knüpfen|to make professional contacts|Auf der Tagung konnte sie Kontakte zu mehreren Fachleuten knüpfen.|She was able to make contacts with several specialists at the conference.",
      "zwei Personen miteinander bekannt machen|to introduce two people to each other|Darf ich Sie mit unserer Projektleiterin bekannt machen?|May I introduce you to our project manager?",
      "jemandem das Du anbieten|to invite someone to use informal address|Nach dem zweiten Treffen bietet sie ihrem Kollegen das Du an.|After the second meeting, she invites her colleague to use informal address.",
      "um eine Kontaktmöglichkeit bitten|to ask for contact information|Dürfte ich Sie um eine Kontaktmöglichkeit bitten?|May I ask you for a way to contact you?",
      "eine Zusammenarbeit ausloten|to explore a possible collaboration|In einem kurzen Folgetermin möchten beide Seiten eine Zusammenarbeit ausloten.|Both sides want to explore a possible collaboration in a short follow-up meeting.",
      "einen nächsten Schritt verabreden|to agree on a next step|Bevor sie auseinandergehen, verabreden sie einen nächsten Schritt.|Before they part, they agree on a next step.",
      "ein Gespräch höflich beenden|to end a conversation politely|Mit einem Hinweis auf den nächsten Programmpunkt beendet sie das Gespräch höflich.|She ends the conversation politely by referring to the next item on the program.",
      "sich im Anschluss melden|to follow up afterward|Ich melde mich im Anschluss mit den erwähnten Unterlagen.|I will follow up afterward with the documents I mentioned.",
      "eine Kontaktanfrage personalisieren|to personalize a connection request|Sie personalisiert die Kontaktanfrage mit einem Satz zum gemeinsamen Gespräch.|She personalizes the connection request with a sentence about their conversation."
    ]),
    P("B2", 34, "b2-inclusion-repair", "Repair intercultural and inclusion breakdowns", "Address impact and agree on more inclusive practices.", "Discuss communication differences without stereotyping, address harmful impact, and agree on more inclusive working practices.", "metacommunication, intent and impact, and softened correction", "An international team addresses repeated name errors, inaccessible jargon, and different expectations about direct feedback.", [
      "nach Kommunikationspräferenzen fragen|to ask about communication preferences|Zu Projektbeginn fragt die Leitung nach den Kommunikationspräferenzen im Team.|At the start of the project, the manager asks about the team's communication preferences.",
      "die Aussprache eines Namens erfragen|to ask how a name is pronounced|Wenn ich unsicher bin, erfrage ich die Aussprache des Namens direkt.|When I am unsure, I ask directly how the name is pronounced.",
      "eine unausgesprochene Norm sichtbar machen|to make an unspoken norm visible|Das Gespräch macht die unausgesprochene Norm zur Erreichbarkeit sichtbar.|The conversation makes the unspoken norm about availability visible.",
      "eine Wirkung ohne Schuldzuweisung beschreiben|to describe an impact without assigning blame|Die betroffene Kollegin beschreibt die Wirkung des Kommentars ohne Schuldzuweisung.|The affected colleague describes the impact of the comment without assigning blame.",
      "eine diskriminierende Formulierung ansprechen|to address discriminatory wording|Ein Kollege spricht die diskriminierende Formulierung ruhig an.|A colleague calmly addresses the discriminatory wording.",
      "barrierearme Kommunikation ermöglichen|to enable accessible communication|Untertitel und klare Unterlagen ermöglichen barrierearme Kommunikation.|Subtitles and clear materials enable accessible communication.",
      "Fachsprache verständlich erklären|to explain technical language clearly|Abkürzungen werden erklärt, damit alle die Fachsprache verstehen können.|Abbreviations are explained so that everyone can understand the technical language.",
      "eine Person aktiv einbeziehen|to include someone actively|Die Moderatorin bezieht die zugeschaltete Kollegin aktiv in das Gespräch ein.|The moderator actively includes the colleague joining remotely in the conversation.",
      "kulturelle Verallgemeinerungen vermeiden|to avoid cultural generalizations|Konkrete Beobachtungen helfen, kulturelle Verallgemeinerungen zu vermeiden.|Specific observations help avoid cultural generalizations.",
      "um Korrektur bitten|to invite correction|Bitte korrigieren Sie mich, falls ich Ihren Namen falsch ausspreche.|Please correct me if I pronounce your name incorrectly.",
      "eine unbeabsichtigte Kränkung wiedergutmachen|to repair unintended hurt|Eine ernst gemeinte Entschuldigung kann helfen, die unbeabsichtigte Kränkung wiedergutzumachen.|A sincere apology can help repair the unintended hurt.",
      "gemeinsame Arbeitsregeln entwickeln|to develop shared working norms|Das Team entwickelt gemeinsame Arbeitsregeln für Feedback und Erreichbarkeit.|The team develops shared working norms for feedback and availability."
    ]),
    P("B2", 35, "b2-incident-witness", "Report incidents and give witness accounts", "Separate observation from inference and verify the record.", "Report an incident precisely, distinguish observation from inference, and review an official record before confirming it.", "exact time and place references with evidential markers", "You witness a bicycle collision and later give a statement to the police.", [
      "Anzeige erstatten|to file a police report|Die Eigentümerin erstattet wegen des gestohlenen Fahrrads Anzeige.|The owner files a police report because of the stolen bicycle.",
      "eine Zeugenaussage machen|to give a witness statement|Am nächsten Morgen macht der Passant eine Zeugenaussage.|The passerby gives a witness statement the next morning.",
      "eine Beobachtung chronologisch schildern|to describe an observation chronologically|Die Zeugin schildert ihre Beobachtung chronologisch und ohne Ergänzungen.|The witness describes her observation chronologically and without additions.",
      "Wahrnehmung und Vermutung trennen|to distinguish perception from assumption|Im Protokoll müssen Wahrnehmung und Vermutung klar getrennt werden.|Perception and assumption need to be clearly distinguished in the record.",
      "den Tatzeitraum eingrenzen|to narrow down the time of an incident|Zwei Nachrichten helfen, den Tatzeitraum auf zwanzig Minuten einzugrenzen.|Two messages help narrow the time of the incident to twenty minutes.",
      "eine Personenbeschreibung abgeben|to provide a description of a person|Der Zeuge gibt eine sachliche Personenbeschreibung ab.|The witness provides an objective description of the person.",
      "ein Beweismittel sichern|to preserve evidence|Die beschädigte Kamera wurde als mögliches Beweismittel gesichert.|The damaged camera was preserved as possible evidence.",
      "eine Aussage ergänzen|to add information to a statement|Später möchte sie ihre Aussage um ein wichtiges Detail ergänzen.|Later, she wants to add an important detail to her statement.",
      "eine Aussage berichtigen|to correct a statement|Der Zeuge berichtigt die zunächst falsch genannte Uhrzeit.|The witness corrects the time that was initially stated incorrectly.",
      "das Protokoll vor der Unterschrift prüfen|to review the record before signing|Sie prüft das Protokoll sorgfältig vor der Unterschrift.|She reviews the record carefully before signing.",
      "um sprachliche Unterstützung bitten|to request language assistance|Bei Verständnisproblemen bittet er um sprachliche Unterstützung.|When he has difficulty understanding, he requests language assistance.",
      "eine Kopie der Aussage erhalten|to receive a copy of the statement|Nach dem Termin erhält die Zeugin eine Kopie ihrer Aussage.|After the appointment, the witness receives a copy of her statement."
    ]),
    P("B2", 36, "b2-community-project", "Deliver a community project", "Move from local need to a sustainable public service.", "Move from a documented local need to a funded, staffed, publicized, and evaluated community service.", "proposal language, delegation, scheduling, and evaluation", "Residents create a recurring neighborhood language café with childcare and accessible meeting space.", [
      "den Bedarf vor Ort ermitteln|to assess local needs|Eine kurze Befragung ermittelt den Bedarf vor Ort.|A short survey assesses local needs.",
      "eine Zielgruppe gezielt ansprechen|to address a target group directly|Mehrsprachige Aushänge sprechen die Zielgruppe gezielt an.|Multilingual notices address the target group directly.",
      "ein Vorhaben skizzieren|to outline a project|Im ersten Treffen skizziert die Initiative ihr Vorhaben.|At the first meeting, the initiative outlines its project.",
      "Kooperationspartner gewinnen|to recruit partner organizations|Die Gruppe gewinnt die Bibliothek als Kooperationspartner.|The group recruits the library as a partner organization.",
      "Freiwillige koordinieren|to coordinate volunteers|Zwei Personen koordinieren die Freiwilligen und ihre Einsatzzeiten.|Two people coordinate the volunteers and their shifts.",
      "Aufgaben verlässlich verteilen|to distribute tasks reliably|Vor jeder Veranstaltung werden die Aufgaben verlässlich verteilt.|Before each event, the tasks are distributed reliably.",
      "einen Finanzierungsplan erstellen|to create a financing plan|Für den Förderantrag erstellt das Team einen Finanzierungsplan.|The team creates a financing plan for the funding application.",
      "Räumlichkeiten reservieren|to reserve premises|Die Organisatorin reserviert barrierefreie Räumlichkeiten für sechs Termine.|The organizer reserves accessible premises for six sessions.",
      "eine Veranstaltung anmelden|to register an event|Das Straßenfest muss rechtzeitig bei der Stadt angemeldet werden.|The street festival must be registered with the city in good time.",
      "Öffentlichkeitsarbeit betreiben|to conduct public outreach|Lokale Vereine helfen dabei, Öffentlichkeitsarbeit zu betreiben.|Local associations help conduct public outreach.",
      "den Ablauf evaluieren|to evaluate the process|Nach der Pilotphase evaluiert die Gruppe den gesamten Ablauf.|After the pilot phase, the group evaluates the entire process.",
      "ein Angebot dauerhaft verankern|to establish a service permanently|Eine feste Finanzierung könnte das Angebot dauerhaft im Viertel verankern.|Stable funding could establish the service permanently in the neighborhood."
    ])
  ];

  const sourceByLevel = {
    A0: {
      title: "Council of Europe: CEFR Companion Volume, Pre-A1 descriptors",
      url: "https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4"
    },
    A1: {
      title: "Goethe-Institut: A1 course content",
      url: "https://www.goethe.de/resources/files/pdf315/a1-panorama---description-of-course-content-v1.pdf"
    },
    A2: {
      title: "Goethe-Institut: A2 word list",
      url: "https://www.goethe.de/pro/relaunch/prf/id/Goethe-Zertifikat_A2_Wortliste.pdf"
    },
    B1: {
      title: "Goethe-Institut and ÖSD: B1 word list",
      url: "https://www.goethe.de/pro/relaunch/prf/bs/Goethe-Zertifikat_B1_Wortliste.pdf"
    },
    B2: {
      title: "Goethe-Institut: B2 course content",
      url: "https://www.goethe.de/resources/files/pdf315/b2-kontext---description-of-course-content.pdf"
    }
  };

  const practicalSources = [
    {
      ids: ["first-response-help"],
      title: "Bundesportal: Report and ask about lost property",
      url: "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99089017261000",
      body: "Lost property is normally reported to the responsible Fundbüro. The responsible office depends on where the item was lost. Suspected theft and immediate danger require a different route, so first state what happened and whether anyone is currently at risk."
    },
    {
      ids: ["emergency-police"],
      title: "Police crime prevention: Make an emergency call correctly",
      url: "https://www.polizei-beratung.de/aktuelles/detailansicht/notruf-richtig-absetzen/",
      body: "A German emergency call gives the location, caller, event, number of affected people, and answers follow-up questions. The official guidance distinguishes 112 for rescue and fire emergencies, 110 for urgent police danger, and 116 117 for urgent medical care that is not life-threatening."
    },
    {
      ids: ["online-account"],
      title: "BSI: Basic cyber-security guidance for consumers",
      url: "https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/cyber-sicherheitsempfehlungen.html",
      body: "Account security depends on unique strong passwords, available two-factor authentication, current software, and careful handling of links and attachments. Use official recovery channels when access is lost or a message looks suspicious."
    },
    {
      ids: ["payment-notice"],
      title: "Verbraucherzentrale: Responding to a court payment order",
      url: "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/kredit-schulden-insolvenz/gerichtliches-mahnverfahren-was-tun-bei-einem-mahnbescheid-10851",
      body: "A court payment order needs prompt attention. Check the claimant, amount, file number, and service date, and get qualified advice when the claim is unclear or disputed. The module teaches the language used to read and answer the document."
    },
    {
      ids: ["consumer-contract"],
      title: "Verbraucherzentrale: How to document a complaint",
      url: "https://www.verbraucherzentrale.de/wissen/vertraege-reklamation/kundenrechte/so-reklamieren-sie-richtig-die-sechs-wichtigsten-punkte-11390",
      body: "A useful complaint names the purchase, defect, dates, requested remedy, evidence, and a clear response deadline. Contract terms and the facts of the individual case determine which remedy is available."
    },
    {
      ids: [],
      title: "Verbraucherzentrale: Contract renewals and cancellation rules",
      url: "https://www.verbraucherzentrale.de/wissen/vertraege-reklamation/kundenrechte/gesetz-fuer-fairere-vertraege-mehr-schutz-bei-kosten-und-laufzeiten-55274",
      body: "The current rules for contract terms, renewals, and cancellation depend on the type and date of the agreement. This companion reference supports the renewal language in the advanced consumer-contract module."
    },
    {
      ids: ["qualification-recognition"],
      title: "Bundesagentur für Arbeit: Recognition of qualifications",
      url: "https://www.arbeitsagentur.de/arbeiten-in-deutschland/anerkennung",
      body: "The responsible authority and required documents depend on the occupation and where the person plans to work. Use the module for the language of the process, then verify the individual route with the official recognition finder."
    },
    {
      ids: ["consumer-rights"],
      title: "Verbraucherzentrale: Warranty and guarantee",
      url: "https://www.verbraucherzentrale.de/de-x-simple/wissen/vertrage-reklamation/kundenrechte/gewahrleistung-und-garantie-5057",
      body: "Gewährleistung and Garantie name different concepts. The linked consumer guidance explains the current distinction and common complaint route. Keep receipts, dates, and the requested remedy precise in any real case."
    },
    {
      ids: ["banking", "insurance", "fraud"],
      title: "BaFin: Consumer complaints about banks and insurers",
      url: "https://bafin.de/DE/Verbraucher/BeschwerdenStreitschlichtung/BeiBaFinbeschweren/BeiBaFinbeschweren_node.html",
      body: "Banking and insurance problems require exact dates, amounts, reference numbers, and a record of prior contact. BaFin explains its consumer role and points to other complaint paths where individual advice is needed."
    },
    {
      ids: ["energy-provider", "household-utilities"],
      title: "Bundesnetzagentur: Energy supplier changes",
      url: "https://www.bundesnetzagentur.de/DE/Vportal/Energie/KuendigungLieferantenwechsel/Lieferantenwechsel/artikel.html",
      body: "Energy offers can differ in price, term, notice period, and payment conditions. State the meter number, reading, contract reference, and date clearly, and check the current official process before a real change."
    },
    {
      ids: ["phone-internet"],
      title: "Bundesnetzagentur: Telephone and internet provider changes",
      url: "https://www.bundesnetzagentur.de/DE/Vportal/TK/InternetTelefon/Wechsel/start.html",
      body: "Service and account problems are easier to trace when names, customer numbers, dates, promised appointments, and the exact fault are recorded. The official page lists the current provider-change and complaint process."
    },
    {
      ids: ["severe-weather", "emergency-communication", "first-response-help", "emergency-help"],
      title: "BBK: Receive and understand official warnings",
      url: "https://www.bbk.bund.de/DE/Warnung-Vorsorge/Vorsorge/In-der-Krise-informiert-sein/Warnungen-erhalten-verstehen/warnungen-erhalten-und-verstehen_node.html",
      body: "Official warnings use short action language and may change quickly. Identify the place, time, hazard, source, and requested action, then follow the current official warning for the affected area."
    },
    {
      ids: ["mental-health"],
      title: "gesund.bund.de: Mental-health crises",
      url: "https://gesund.bund.de/wege-im-gesundheitswesen/erwachsenenleben/notfaelle/psychische-krisen",
      body: "When seeking support, duration, severity, immediate safety, and the next contact matter. The linked federal health information lists current routes to help, including urgent situations."
    },
    {
      ids: ["medicine", "doctor", "dentist", "healthcare"],
      title: "gesund.bund.de: Federal health information",
      url: "https://gesund.bund.de/",
      body: "Health conversations benefit from concrete descriptions of onset, duration, location, intensity, medicines, and warning signs. Use the module to prepare language and rely on qualified medical guidance for decisions."
    },
    {
      ids: ["tax-return"],
      title: "Federal Ministry of Finance: ELSTER and tax forms",
      url: "https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/Formulare/formulare.html",
      body: "Tax forms and filing obligations depend on the person's situation and the relevant tax year. Learn the document names and result language here, then use current official forms or qualified advice for a filing."
    },
    {
      ids: ["rental-move-out", "rental-contract", "rental-dispute"],
      title: "Federal Ministry of Justice: Tenancy law overview",
      url: "https://www.bmj.de/DE/themen/verbraucherschutz/kaufen_reisen_wohnen/mietrecht/mietrecht_node.html",
      body: "Rental questions depend on the contract, dates, documented condition, and individual circumstances. Keep written records and verify current deadlines and rights through the linked legal overview or qualified advice."
    },
    {
      ids: ["digital-privacy", "privacy-platforms", "online-privacy"],
      title: "BfDI: Data protection and telecommunications",
      url: "https://www.bfdi.bund.de/SharedDocs/Downloads/DE/Broschueren/INFO5.pdf?__blob=publicationFile&v=26",
      body: "Privacy language distinguishes data, purpose, permission, consent, withdrawal, and access. Read the requested permission and stated purpose separately, then verify current rights through the linked federal guidance."
    },
    {
      ids: ["airport", "flight"],
      title: "Your Europe: Air passenger rights",
      url: "https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_de.htm",
      body: "Travel rules vary by route, carrier, disruption, and baggage type. Record the booking, times, notices, and receipts, then check the current EU guidance for the specific journey."
    }
  ];

  practicalSources.forEach(source => {
    if (course.sources.some(item => item.url === source.url)) return;
    course.sources.push({ category: "PRACTICAL REFERENCE", title: source.title, body: source.body, url: source.url });
  });

  const levelOrder = { A0: 0, A1: 1, A2: 2, B1: 3, B2: 4 };
  const levelTaskRanges = {
    A0: [12, 32],
    A1: [30, 60],
    A2: [50, 90],
    B1: [80, 130],
    B2: [110, 180]
  };

  const clean = value => String(value || "").trim();
  const withoutFinalPunctuation = value => clean(value).replace(/[.!?]+$/u, "");
  const countWords = value => clean(value).split(/\s+/u).filter(Boolean).length;
  const slug = value => clean(value)
    .toLocaleLowerCase("de-DE")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .replace(/ß/gu, "ss")
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-|-$/gu, "");

  const clone = value => JSON.parse(JSON.stringify(value));
  const baseModules = course.modules.slice();
  const grammarPools = Object.fromEntries(course.levels.map(level => [
    level.id,
    baseModules
      .filter(module => levelOrder[module.level] <= levelOrder[level.id])
      .flatMap(module => module.grammar)
      .filter(card => !card.supplemental)
  ]));

  const focusRules = [
    { test: /sound|letter|umlaut|spelling/iu, title: "Spelling patterns", rule: "German spelling is highly regular once the common letter groups are familiar. Keep ei, ie, eu, sch, and ch together when you read, and keep umlauts or their keyboard forms ae, oe, and ue visible when you write.", example: "Straße kann auf einer Tastatur auch Strasse geschrieben werden.", translation: "Straße can also be typed as Strasse on a keyboard." },
    { test: /capital/iu, title: "Noun capitalization", rule: "Every German noun begins with a capital letter. Sentence openings and the formal pronoun Sie are also capitalized, so use the article as a clue when you check a word.", example: "Der Name und die Straße beginnen mit einem Großbuchstaben.", translation: "The noun Name and the noun Straße begin with a capital letter." },
    { test: /question word|finite verb|question punctuation/iu, title: "Information questions", rule: "A W-question begins with the question word. The finite verb normally comes next, and a question mark closes the sentence: Wo ist der Eingang?", example: "Wo ist der Eingang?", translation: "Where is the entrance?" },
    { test: /quantit|amount/iu, title: "Quantities as complete noun phrases", rule: "Keep the number or measure together with the noun it describes. The article and adjective ending belong to the full phrase: ein halbes Kilo Tomaten, drei Stück, zwölf Euro fünfzig.", example: "Ich hätte gern ein halbes Kilo Tomaten und drei Stück Käse.", translation: "I would like half a kilo of tomatoes and three pieces of cheese." },
    { test: /polite request/iu, title: "Polite requests", rule: "A service request can use ich möchte, ich hätte gern, or a question with könnten Sie. Bitte can soften the request, but the complete verb and case pattern still need to stay in place.", example: "Könnten Sie den Betrag bitte noch einmal prüfen?", translation: "Could you please check the amount again?" },
    { test: /noch/iu, title: "Noch marks what continues", rule: "Noch means that a situation continues. Noch nicht means that an expected action is unfinished: Ich bin noch nicht fertig.", example: "Ich bin noch nicht fertig.", translation: "I am not finished yet." },
    { test: /command|imperative/iu, title: "Requests and commands", rule: "Use the verb first in a direct instruction. Formal instructions use the verb plus Sie, while an informal instruction usually uses the du verb stem.", example: "Öffnen Sie das Formular. Öffne dann die Datei.", translation: "Open the form. Then open the file." },
    { test: /negat|nicht|kein|sondern/iu, title: "Negating and correcting", rule: "Kein goes with a noun that would otherwise use ein. Nicht negates other information. Use nicht A, sondern B when you replace one detail with another.", example: "Das ist keine Rechnung. Der Termin ist nicht heute, sondern morgen.", translation: "That is no invoice. The appointment is tomorrow rather than today." },
    { test: /pronoun/iu, title: "Pronouns keep their reference", rule: "Er replaces a masculine noun, sie can mean she or they, and es replaces a neuter noun. Formal Sie has a capital S. Check the verb ending to keep the subject clear.", example: "Der Kurs beginnt. Er findet im zweiten Stock statt.", translation: "The course begins. It takes place on the second floor." },
    { test: /possessive/iu, title: "Possessives follow the noun phrase", rule: "Mein, dein, sein, ihr, unser, euer, and Ihr take endings that follow the gender, number, and case of the noun. Keep formal Ihr capitalized.", example: "Ich habe meinen Ausweis verloren. Haben Sie Ihre Tasche gefunden?", translation: "I lost my identity card. Did you find your bag?" },
    { test: /present.tense|verb.second|verb endings/iu, title: "The finite verb in second position", rule: "In a main statement, the conjugated verb takes the second position. Another detail may come first, but the verb still stays second: Heute arbeite ich zu Hause.", example: "Seit gestern funktioniert der Anschluss wieder. Heute arbeite ich zu Hause.", translation: "The connection has been working again since yesterday. Today I work from home." },
    { test: /genitive/iu, title: "Genitive relationships", rule: "The genitive can mark possession or a formal relationship between nouns. Masculine and neuter nouns often add -s or -es, while the article changes to des: wegen des fehlenden Dokuments.", example: "Wegen des fehlenden Dokuments verzögert sich der Antrag.", translation: "The application is delayed because of the missing document." },
    { test: /accusative|dative|case/iu, title: "Case carries the noun's job", rule: "Use nominative for the subject. Accusative often marks the direct target, while dative often marks a recipient or follows a fixed dative preposition. Learn the preposition and noun phrase together.", example: "Ich brauche einen Termin und spreche mit der Ärztin.", translation: "I need an appointment and speak with the doctor." },
    { test: /adjective ending/iu, title: "Adjective endings follow the article", rule: "The article already shows part of the gender and case information. The adjective ending completes the pattern, so study the full group as one unit: ein halbes Kilo, mit frischem Brot.", example: "Ich kaufe einen reifen Pfirsich und frisches Brot.", translation: "I buy a ripe peach and fresh bread." },
    { test: /separable/iu, title: "Separable verbs form a bracket", rule: "In a main clause, the prefix moves to the end: Ich rufe morgen an. With an infinitive or participle, the verb stays together: anrufen, angerufen.", example: "Ich sende das Paket morgen zurück.", translation: "I am sending the parcel back tomorrow." },
    { test: /pluperfect|earlier past/iu, title: "Marking the earlier past", rule: "Use hatte or war plus the past participle for an event that was already complete before another past event. The surrounding sentence normally supplies the later reference point.", example: "Nachdem die Maschine ausgefallen war, wurde der Bereich gesperrt.", translation: "After the machine had failed, the area was closed off." },
    { test: /perfect|past.tense|Präteritum|chronology/iu, title: "Telling past events in order", rule: "Spoken narratives often use haben or sein plus the participle. War, hatte, and common modal verbs frequently appear in the simple past. Time markers make the sequence easy to follow.", example: "Zuerst ist der Zug ausgefallen. Danach musste ich eine andere Verbindung nehmen.", translation: "First the train was cancelled. After that I had to take another connection." },
    { test: /future passive/iu, title: "Future passive", rule: "Use wird plus a past participle plus werden when a future process must be stated explicitly. In ordinary speech, the present passive with a future time word is often enough.", example: "Der Wechsel wird morgen bestätigt werden.", translation: "The change will be confirmed tomorrow." },
    { test: /passive/iu, title: "Focusing on the process", rule: "Use werden plus the past participle when the action or result matters more than the actor. Use von for an actor and durch for a means when that detail is needed.", example: "Die Unterlagen werden von der zuständigen Stelle geprüft.", translation: "The documents are reviewed by the responsible authority." },
    { test: /prepositional relative|relative.*preposition|preposition.*relative/iu, title: "Preposition plus relative pronoun", rule: "Keep the preposition directly before the relative pronoun. The preposition determines the case, while the earlier noun determines gender and number.", example: "Das ist der Vertrag, auf den ich mich beziehe.", translation: "That is the contract to which I am referring." },
    { test: /relative/iu, title: "Adding information with a relative clause", rule: "A relative pronoun points back to a noun. Its gender and number come from that noun, while its case comes from its job inside the relative clause. The finite verb moves to the end.", example: "Die Frist, die im Schreiben steht, endet am Freitag.", translation: "The deadline stated in the letter ends on Friday." },
    { test: /reported|Konjunktiv\s+I\b|attribution/iu, title: "Reporting another source", rule: "Name the source, then mark the report with a reporting verb or Konjunktiv I when distance matters. This helps the listener separate the source's claim from your own conclusion.", example: "Die Leitung erklärte, der Termin werde verschoben.", translation: "Management stated that the appointment would be postponed." },
    { test: /Konjunktiv II|hypothetical|proposal/iu, title: "Polite and hypothetical language", rule: "Forms such as könnte, würde, and wäre make a request, proposal, or imagined result less direct. In a condition, the dependent clause sends its finite verb to the end.", example: "Wir könnten zunächst eine befristete Lösung vereinbaren.", translation: "We could initially agree on a temporary solution." },
    { test: /condition|wenn|falls|sofern/iu, title: "Conditions", rule: "Wenn introduces a general or likely condition. Falls presents a possibility, and sofern can state a formal condition. The verb closes the dependent clause; the main-clause verb follows immediately when the condition comes first.", example: "Falls alle Seiten zustimmen, gilt die Vereinbarung zunächst vier Wochen.", translation: "If all sides agree, the agreement will initially apply for four weeks." },
    { test: /dass or ob|dass.*ob/iu, title: "Dass or ob", rule: "Use dass to report a statement or known content. Use ob when the open point is yes or no. Both conjunctions move the finite verb to the end.", example: "Bitte sagen Sie mir, ob das Kind morgen mitfahren kann.", translation: "Please tell me whether the child can travel with the group tomorrow." },
    { test: /indirect.*question|ob clause/iu, title: "Indirect questions", rule: "Use ob for a yes-or-no question and keep a W-word for an information question. The finite verb moves to the end.", example: "Können Sie mir sagen, wann der Termin beginnt?", translation: "Can you tell me when the appointment begins?" },
    { test: /cause|causal|reason|weil|deshalb|wegen/iu, title: "Cause, content, and result", rule: "Weil introduces a reason and moves the finite verb to the end. Dass introduces reported content. Deshalb begins a result clause and is followed by the finite verb, while wegen normally introduces a noun phrase.", example: "Weil der Anschluss ausgefallen ist, rufe ich an. Deshalb brauche ich einen neuen Termin.", translation: "I am calling because the connection failed. Therefore I need a new appointment." },
    { test: /sequence|temporal|nachdem|bevor/iu, title: "Ordering events", rule: "Zuerst, danach, and anschließend organize main clauses. Nachdem and bevor introduce dependent clauses, so their finite verbs move to the end.", example: "Nachdem ich die Angaben geprüft habe, bestätige ich den Termin.", translation: "After I have checked the details, I confirm the appointment." },
    { test: /comparative|superlative/iu, title: "Comparing options", rule: "Add -er for many comparatives and use als for the point of comparison. The superlative often appears as am plus -sten or before a noun with an adjective ending.", example: "Der neue Tarif ist günstiger als der alte, aber die kurze Laufzeit ist am wichtigsten.", translation: "The new plan is cheaper than the old one, but the short term matters most." },
    { test: /modal/iu, title: "Modal sentence bracket", rule: "The modal verb is conjugated in second position. The action verb stays as an infinitive at the end: Wir müssen den Termin verschieben.", example: "Wir müssen den Termin verschieben und dürfen den Bereich heute nicht betreten.", translation: "We have to move the appointment and may not enter the area today." },
    { test: /reflexive/iu, title: "Reflexive forms", rule: "The reflexive pronoun refers back to the subject. Learn the verb with sich and check whether the sentence needs accusative or dative.", example: "Ich melde mich an und setze mich in den Wartebereich.", translation: "I register and sit down in the waiting area." },
    { test: /sein zu infinitive/iu, title: "Obligation with sein plus zu", rule: "Sein plus zu and an infinitive presents something that must or can be done. The form is common in formal instructions and concise workplace language.", example: "Der offene Vorgang ist bis morgen zu prüfen.", translation: "The open case must be reviewed by tomorrow." },
    { test: /purpose|um zu/iu, title: "Purpose with um zu", rule: "Use um plus zu and an infinitive when the subject stays the same. Use damit when the subjects differ.", example: "Ich rufe an, um den Termin zu ändern.", translation: "I am calling to change the appointment." },
    { test: /compound number/iu, title: "Build numbers from twenty-one onward", rule: "Say the ones digit before the tens digit and join them with und: ein-und-zwanzig, zwei-und-dreißig. Round tens such as zwanzig and dreißig stay as one word.", example: "Die Rechnung beträgt einundzwanzig Euro.", translation: "The bill is twenty-one euros." },
    { test: /ordinal|date|am or im/iu, title: "Dates with am and im", rule: "A calendar date commonly uses am plus an ordinal ending: am dritten Juni. A month without a day commonly follows im: im Mai.", example: "Der Termin ist am dritten Juni.", translation: "The appointment is on June third." },
    { test: /number|euro|cent|decimal/iu, title: "Prices as complete chunks", rule: "German writes decimal prices with a comma. In speech, name the euro amount and then the cent amount: zwölf Euro fünfzig.", example: "Das macht zwölf Euro fünfzig.", translation: "The total is twelve euros fifty." },
    { test: /noun.verb collocation|collocation/iu, title: "Fixed noun-verb combinations", rule: "Formal German often uses a noun with a particular light verb, such as eine Entscheidung treffen or Anzeige erstatten. Learn the complete combination and the case or preposition it requires.", example: "Wir treffen eine Entscheidung und erstatten anschließend Anzeige.", translation: "We make a decision and then file a police report." },
    { test: /compound noun|administrative compound/iu, title: "Read long compounds from the end", rule: "The final noun gives a German compound its basic meaning and gender. Work backward to identify the details before it, then learn the full compound with its article.", example: "Die Kündigungsbestätigung bestätigt die Kündigung.", translation: "The cancellation confirmation confirms the cancellation." },
    { test: /preposition|\blocation\b|\bdestination\b/iu, title: "Prepositions choose the case", rule: "Learn each fixed preposition with its case. With two-way prepositions, a location normally takes dative and a destination normally takes accusative.", example: "Das Paket liegt in der Station. Ich lege es in das Fach.", translation: "The parcel is in the station. I put it into the compartment." },
    { test: /register|formal|informal|du or Sie/iu, title: "Keep the register consistent", rule: "Use du forms in an established informal relationship and Sie forms in a formal exchange. Keep pronouns, possessives, verb forms, greeting, and closing in the same register.", example: "Kannst du mir helfen? Können Sie mir helfen?", translation: "Can you help me? Can you help me?" },
    { test: /delegat|responsibilit|zuständig/iu, title: "Assigning responsibility", rule: "Name the person or team responsible, the action, and the deadline in the same sentence or adjacent sentences. Verbs such as übernehmen, sich kümmern um, and zuständig sein make ownership explicit.", example: "Mara übernimmt die Anmeldung bis Freitag, und Luis ist für den Raum zuständig.", translation: "Mara handles registration by Friday, and Luis is responsible for the room." },
    { test: /referral/iu, title: "Referring someone to the right service", rule: "State the need first, then name the responsible office or next contact. Verweisen an takes an accusative destination: jemanden an die zuständige Stelle verweisen.", example: "Die Mitarbeiterin verweist mich an die zuständige Beratungsstelle.", translation: "The employee refers me to the responsible advisory center." },
    { test: /neutral reformulation/iu, title: "Reformulate the underlying concern", rule: "Replace an accusation with an observable event, its effect, and the need behind it. Neutral wording helps each side confirm the issue before discussing a solution.", example: "Die Mediatorin sagt: „Der aktuelle Dienstplan deckt die vereinbarten Servicezeiten nicht ab.“", translation: "The mediator says that the current rota does not cover the agreed service hours." },
    { test: /substitutions with durch/iu, title: "Replace one ingredient with durch", rule: "Ersetzen takes an accusative object for the original item and durch plus accusative for the substitute.", example: "Wir ersetzen die Sahne durch Hafercreme.", translation: "We replace the cream with oat cream." },
    { test: /^open questions$/iu, title: "Open questions invite detail", rule: "Open questions begin with a W-word and invite more than a yes-or-no answer. Place the finite verb directly after the question word.", example: "Wie stellen Sie sich die nächsten Schritte vor?", translation: "How do you envision the next steps?" },
    { test: /frequency expressions|^frequency$/iu, title: "State how often something happens", rule: "Words such as immer, oft, manchmal, selten, nie, täglich, and zweimal pro Woche usually sit near the activity they qualify.", example: "Ich trainiere zweimal pro Woche und gehe sonntags oft spazieren.", translation: "I train twice a week and often go for a walk on Sundays." },
    { test: /sollen or dürfen|^sollen$|^dürfen$|^müssen$/iu, title: "Distinguish obligation, instruction, and permission", rule: "Müssen marks necessity, sollen relays an instruction or expectation, and dürfen marks permission. The action verb stays at the end.", example: "Wir müssen Helme tragen, sollen den Bereich melden und dürfen ihn erst danach betreten.", translation: "We have to wear helmets, are expected to report the area, and may enter it only afterward." },
    { test: /time limits with bis or innerhalb/iu, title: "Mark a deadline with bis or innerhalb", rule: "Bis names an endpoint. Innerhalb plus genitive or von plus dative names the permitted period in which an action must happen.", example: "Bitte geben Sie das Buch bis Freitag oder innerhalb von vierzehn Tagen zurück.", translation: "Please return the book by Friday or within fourteen days." },
    { test: /^expectations$/iu, title: "State expectations clearly", rule: "Use erwarten plus an accusative object, or a dass-clause whose finite verb stands at the end.", example: "Wir erwarten, dass alle die vereinbarten Aufgaben rechtzeitig erledigen.", translation: "We expect everyone to complete the agreed tasks on time." },
    { test: /disruption language/iu, title: "Describe a disruption and its consequence", rule: "Name the affected service, the disruption, its duration, and the practical consequence in separate clear parts.", example: "Wegen der Verspätung wurde der Anschluss verpasst, deshalb brauche ich eine neue Verbindung.", translation: "The connection was missed because of the delay, so I need a new route." },
    { test: /^time$/iu, title: "Put time information where it guides the action", rule: "A time phrase can open the sentence. The finite verb remains in second position, followed by the subject when another element comes first.", example: "Morgen beginnt die Sprechstunde um neun Uhr.", translation: "Tomorrow the consultation hour begins at nine." },
    { test: /participial adjectives/iu, title: "Use participles as adjectives", rule: "A present or past participle can describe a noun and takes the adjective ending required by the article, gender, number, and case.", example: "Die beschädigte Ware und der fehlende Beleg werden im Formular genannt.", translation: "The damaged goods and the missing receipt are named in the form." },
    { test: /perspective frames/iu, title: "Mark whose perspective is being described", rule: "Phrases such as aus meiner Sicht, aus Sicht des Teams, and für die Kundschaft make the viewpoint explicit before the evaluation.", example: "Aus Sicht des Teams wäre eine schriftliche Rückmeldung hilfreicher.", translation: "From the team's perspective, written feedback would be more helpful." },
    { test: /nominalizations|^nominalization$|nominalized trends/iu, title: "Turn actions into formal noun phrases", rule: "Nominalized verbs and adjectives begin with a capital letter and often condense processes or trends in formal writing.", example: "Der deutliche Anstieg und die anschließende Stabilisierung sind im Diagramm erkennbar.", translation: "The clear increase and the subsequent stabilization are visible in the chart." },
    { test: /sollte recommendations/iu, title: "Give measured recommendations with sollte", rule: "Sollte plus infinitive presents a recommendation. The infinitive closes the sentence bracket.", example: "Die Schule sollte das Gespräch frühzeitig anbieten.", translation: "The school should offer the meeting at an early stage." },
    { test: /evaluative adjectives/iu, title: "Support evaluations with evidence", rule: "An evaluative adjective states a judgment. Follow it with the feature or example that justifies that judgment.", example: "Die Aufführung war überzeugend, weil die Figuren glaubwürdig dargestellt wurden.", translation: "The performance was convincing because the characters were portrayed credibly." },
    { test: /cautious interpretation/iu, title: "Separate visible data from interpretation", rule: "Use zeigt, deutet darauf hin, or lässt vermuten to calibrate a conclusion to the strength of the evidence.", example: "Der Rückgang deutet auf eine Veränderung hin, erklärt aber noch nicht ihre Ursache.", translation: "The decline points to a change, but does not yet explain its cause." },
    { test: /^brauchen$/iu, title: "State a need with brauchen", rule: "Brauchen takes an accusative object. A masculine ein-word changes to einen.", example: "Ich brauche einen Sitzplatz und etwas zu trinken.", translation: "I need a seat and something to drink." },
    { test: /^möchten$/iu, title: "Make a polite request with möchten", rule: "Möchten is conjugated in second position. The requested thing follows in the appropriate case.", example: "Ich möchte ein Glas Wasser, bitte.", translation: "I would like a glass of water, please." },
    { test: /^doch$/iu, title: "Answer a negative question with doch", rule: "Doch contradicts a negative assumption or question and confirms the positive fact.", example: "Kommst du heute nicht? Doch, ich komme um drei.", translation: "Aren't you coming today? Yes, I am coming at three." },
    { test: /adjectives with sein/iu, title: "Describe a state with sein", rule: "The adjective stays unchanged after a form of sein.", example: "Ich bin hungrig, und wir sind müde.", translation: "I am hungry, and we are tired." },
    { test: /fixed mir ist expressions/iu, title: "Use mir ist for temperature and sensation", rule: "German often uses dative mir plus ist and an adjective for a felt condition.", example: "Mir ist kalt, aber meiner Freundin ist warm.", translation: "I am cold, but my friend is warm." },
    { test: /locations with im/iu, title: "Name an indoor location with im", rule: "Im combines in and dem and marks a location with a masculine or neuter noun.", example: "Die Anmeldung ist im Erdgeschoss.", translation: "The registration desk is on the ground floor." },
    { test: /wo questions/iu, title: "Ask for a location with wo", rule: "Wo asks about a location. The finite verb follows directly.", example: "Wo ist die Anmeldung?", translation: "Where is the registration desk?" },
    { test: /short reciprocal responses/iu, title: "Return a short social response", rule: "Short replies such as ich auch, mir auch, and und bei Ihnen keep a conversation moving while matching the grammar of the first statement.", example: "Ich bin heute müde. Ich auch. Und bei Ihnen?", translation: "I am tired today. So am I. And you?" },
    { test: /telephone chunks/iu, title: "Use complete telephone phrases", rule: "Telephone openings and closings are fixed chunks. State your name, the requested person, and the callback detail clearly.", example: "Guten Morgen, hier spricht Lina Weber. Kann ich bitte Frau Roth sprechen?", translation: "Good morning, this is Lina Weber. May I speak to Ms. Roth?" },
    { test: /^zurückrufen$/iu, title: "Separate zurückrufen in a main clause", rule: "Zurückrufen is separable. Its prefix moves to the end of a main clause.", example: "Frau Roth ruft Sie morgen zurück.", translation: "Ms. Roth will call you back tomorrow." },
    { test: /recipients with an/iu, title: "Mark a recipient with an", rule: "With schicken or senden, an plus accusative can identify the person or office receiving the item.", example: "Ich sende den Brief an die Versicherung.", translation: "I send the letter to the insurance company." },
    { test: /destinations with nach|destinations with zu|^nach$|^in$/iu, title: "Choose nach, zu, or in for a destination", rule: "Use nach with most cities and countries without an article, zu for a person or service point, and in plus accusative when entering a place.", example: "Ich fahre nach Köln, gehe zur Post und dann in das Gebäude.", translation: "I travel to Cologne, go to the post office, and then into the building." },
    { test: /^abholen$/iu, title: "Separate abholen in a main clause", rule: "Abholen is separable. The object stays inside the sentence bracket and ab moves to the end.", example: "Ich hole das Paket morgen ab.", translation: "I will collect the parcel tomorrow." },
    { test: /label chunks/iu, title: "Read labels as fixed information chunks", rule: "Food labels often omit a full sentence. Keep headings and fixed phrases such as Zutaten, enthält, and zu verbrauchen bis together.", example: "Zu verbrauchen bis Freitag. Enthält Milch und Nüsse.", translation: "Use by Friday. Contains milk and nuts." },
    { test: /^enthalten$/iu, title: "Use enthalten without a separable prefix", rule: "Enthalten is not separable. The finite form remains together in second position.", example: "Das Produkt enthält Nüsse.", translation: "The product contains nuts." },
    { test: /^sequencing$/iu, title: "Order practical steps", rule: "Use zuerst, danach, dann, and zum Schluss to make the order of actions explicit while keeping the finite verb in second position.", example: "Zuerst prüfen wir die Lieferung, danach melden wir den Schaden.", translation: "First we inspect the delivery, then we report the damage." },
    { test: /mit after beginnen/iu, title: "Use beginnen mit plus dative", rule: "Beginnen mit takes dative. In a main clause, the finite verb remains in second position.", example: "Wir beginnen mit der wichtigsten Aufgabe.", translation: "We begin with the most important task." },
    { test: /time expressions/iu, title: "Place time details clearly", rule: "A time expression can stand first for emphasis. The conjugated verb remains the second sentence element.", example: "Morgen um acht Uhr fährt der Bus ab.", translation: "Tomorrow at eight the bus departs." },
    { test: /man kann/iu, title: "Describe a general option with man kann", rule: "Man takes a third-person singular verb. With a modal verb, the action infinitive stands at the end.", example: "Hier kann man Fahrräder ausleihen.", translation: "You can rent bicycles here." },
    { test: /welcher questions/iu, title: "Choose the agreeing welcher form", rule: "Welcher changes with the gender, number, and case of the noun that follows.", example: "Welche Führung beginnt um elf Uhr?", translation: "Which tour begins at eleven?" },
    { test: /^stattfinden$/iu, title: "Separate stattfinden in a main clause", rule: "Stattfinden is separable. Statt stays with the finite verb and finden moves according to the sentence form.", example: "Die Führung findet am Samstag statt.", translation: "The tour takes place on Saturday." },
    { test: /teilnehmen an/iu, title: "Use teilnehmen an plus dative", rule: "Teilnehmen is separable in a main clause, and an takes dative for the activity.", example: "Ich nehme an einem Yogakurs teil.", translation: "I take part in a yoga class." },
    { test: /^wehtun$/iu, title: "Use wehtun with the painful body part", rule: "The body part is the subject, the affected person is dative, and weh separates in the main clause.", example: "Mir tut seit gestern der Zahn weh.", translation: "My tooth has hurt since yesterday." },
    { test: /duration with seit/iu, title: "Use seit with a continuing present state", rule: "German uses the present tense with seit when a situation began earlier and still continues.", example: "Seit drei Tagen tut mir der Zahn weh.", translation: "My tooth has been hurting for three days." },
    { test: /medical instructions/iu, title: "Follow dosage and care instructions", rule: "Medical instructions commonly use the formal imperative or sollen. Keep the amount, frequency, duration, and warning together.", example: "Nehmen Sie morgens und abends eine Tablette und trinken Sie genug Wasser.", translation: "Take one tablet in the morning and evening and drink enough water." },
    { test: /welche with plural documents/iu, title: "Ask which documents with welche", rule: "Plural nouns use welche in nominative and accusative.", example: "Welche Unterlagen muss ich mitbringen?", translation: "Which documents do I need to bring?" },
    { test: /official request verbs/iu, title: "Use verbs for official requests", rule: "Beantragen, einreichen, vorlegen, and bestätigen name distinct administrative actions. Learn each verb with its typical object.", example: "Ich beantrage den Ausweis, reiche das Formular ein und lege meinen Pass vor.", translation: "I apply for the ID card, submit the form, and present my passport." },
    { test: /direction with in/iu, title: "Use in plus accusative for movement inside", rule: "With a two-way preposition, movement toward an interior destination takes accusative.", example: "Gehen Sie bitte in den Wartebereich.", translation: "Please go into the waiting area." },
    { test: /Perfekt for incidents/iu, title: "Report a completed incident in the perfect tense", rule: "Use haben or sein plus the past participle. Verbs of movement often take sein.", example: "Jemand hat mein Portemonnaie genommen, und die Person ist schnell weggegangen.", translation: "Someone took my wallet, and the person left quickly." },
    { test: /precise wer|^was$/iu, title: "Ask for the missing incident detail", rule: "Wer asks for a person, was for an event or object, and wo for a place. Put the finite verb directly after the W-word.", example: "Wer hat was gesehen, und wo ist es passiert?", translation: "Who saw what, and where did it happen?" },
    { test: /Futur II/iu, title: "Look back from a future point", rule: "Future perfect uses werden plus a past participle, haben or sein, and an infinitive. It presents an action as complete by a future deadline.", example: "Bis Freitag wird das Team den Bericht abgeschlossen haben.", translation: "By Friday the team will have completed the report." },
    { test: /spoken turn management|academic turn-taking|^turn-taking$/iu, title: "Take and yield a speaking turn", rule: "Signal whether you are adding, questioning, or handing over. Short phrases help the group follow the structure of the discussion.", example: "Darf ich kurz ergänzen? Danach würde ich das Wort an Frau Kaya weitergeben.", translation: "May I add something briefly? After that I would hand the floor to Ms. Kaya." },
    { test: /attributed paraphrase/iu, title: "Paraphrase and name the source", rule: "State whose idea you are restating, preserve its central claim, and use your own wording.", example: "Nach Ansicht der Autorin hängt der Erfolg vor allem von verlässlichen Strukturen ab.", translation: "According to the author, success depends above all on dependable structures." },
    { test: /cautious challenges/iu, title: "Challenge a claim without overstating", rule: "Use a question or calibrated phrase to identify the uncertain assumption and request evidence.", example: "Worauf stützt sich die Annahme, dass diese Entwicklung dauerhaft ist?", translation: "What supports the assumption that this development is permanent?" },
    { test: /paragraph progression/iu, title: "Give each paragraph one clear job", rule: "Open with the paragraph's claim, develop it with evidence or reasoning, and close by connecting it to the next point.", example: "Zunächst ist der Ausgangspunkt zu klären. Ein Beispiel zeigt die Folge. Daraus ergibt sich die nächste Frage.", translation: "First the starting point must be clarified. An example shows the consequence. This leads to the next question." },
    { test: /^paraphrase$|policy paraphrase|neutral paraphrase/iu, title: "Restate content accurately in new wording", rule: "Keep the central proposition, source, and degree of certainty while changing the wording and sentence structure.", example: "Die Richtlinie verlangt regelmäßige Prüfungen. Anders formuliert: Die Ergebnisse müssen in festen Abständen kontrolliert werden.", translation: "The policy requires regular checks. Put another way, the results must be reviewed at fixed intervals." },
    { test: /proportional comparison/iu, title: "Compare proportional change precisely", rule: "Distinguish absolute values, percentage points, and relative percentage change before drawing a conclusion.", example: "Der Anteil stieg von 20 auf 30 Prozent, also um zehn Prozentpunkte beziehungsweise um 50 Prozent.", translation: "The share rose from 20 to 30 percent, which is ten percentage points or 50 percent." },
    { test: /^rebuttal$/iu, title: "Answer an argument directly", rule: "A rebuttal identifies the claim, acknowledges relevant evidence, and explains why the conclusion does not follow.", example: "Der Einwand nennt höhere Kosten. Er berücksichtigt jedoch nicht die langfristige Einsparung.", translation: "The objection mentions higher costs. It does not, however, account for the long-term saving." },
    { test: /chronological narration/iu, title: "Anchor an account in a clear timeline", rule: "Give the date and time, then use sequence markers so each action can be placed before or after the next.", example: "Um 8.10 Uhr begann die Störung, fünf Minuten später wurde der Bereich gesperrt, und um 8.25 Uhr traf Hilfe ein.", translation: "The disruption began at 8:10, the area was closed five minutes later, and help arrived at 8:25." },
    { test: /teach-back questions/iu, title: "Check understanding through teach-back", rule: "Ask the other person to explain the plan in their own words, then correct only the missing or inaccurate part.", example: "Können Sie mir bitte in eigenen Worten sagen, wie Sie das Medikament einnehmen werden?", translation: "Can you tell me in your own words how you will take the medicine?" },
    { test: /financial compounds/iu, title: "Decode financial compound nouns", rule: "Read a compound from its final noun, then add the earlier parts that specify the transaction or condition.", example: "Die Kreditkartenabrechnung enthält eine unbekannte Auslandsgebühr.", translation: "The credit card statement contains an unfamiliar foreign transaction fee." },
    { test: /^lassen(?: with infinitive)?$|lassen \+ infinitive/iu, title: "Use lassen plus infinitive", rule: "Lassen takes a second infinitive without zu and can express arranging, permitting, or having something done.", example: "Ich lasse die Bremsen prüfen.", translation: "I am having the brakes checked." },
    { test: /compact emergency answers/iu, title: "Give emergency details in a fixed order", rule: "State location, event, number of people, immediate danger, and callback details in short complete units.", example: "Wir sind in Halle zwei. Es brennt an einer Maschine. Zwei Personen sind verletzt. Gasflaschen stehen in der Nähe.", translation: "We are in hall two. A machine is on fire. Two people are injured. Gas cylinders are nearby." },
    { test: /source chains/iu, title: "Trace a claim through its source chain", rule: "Name the original source, the later report, and any change in wording or certainty between them.", example: "Die Studie nennt einen Zusammenhang; der Artikel übernimmt die Zahl, lässt die Einschränkung jedoch weg.", translation: "The study reports an association; the article repeats the figure but omits the limitation." },
    { test: /^framing$/iu, title: "Recognize how wording frames an event", rule: "Compare labels, selected facts, and omitted context to see which interpretation the wording makes more prominent.", example: "Der Bericht nennt die Maßnahme eine Entlastung, während Betroffene von einer Kürzung sprechen.", translation: "The report calls the measure relief, while affected people describe it as a cut." },
    { test: /moderation language/iu, title: "Moderate contributions and return to the question", rule: "A moderator names the speaking order, summarizes the point, and redirects the group when the discussion drifts.", example: "Danke für den Beitrag. Ich fasse den Punkt kurz zusammen und komme dann zur Ausgangsfrage zurück.", translation: "Thank you for the contribution. I will summarize the point briefly and then return to the original question." },
    { test: /follow-up chains/iu, title: "Build a useful follow-up chain", rule: "Begin with an open question, pick up one detail from the answer, and ask for an example, reason, or consequence.", example: "Was hat sich verändert? Seit wann beobachten Sie das? Können Sie ein Beispiel nennen?", translation: "What changed? Since when have you observed it? Can you give an example?" },
    { test: /soft conversational transitions/iu, title: "Move between topics smoothly", rule: "Acknowledge the previous point, signal the connection, and introduce the next topic with a short transition.", example: "Das erklärt den Zeitplan. In diesem Zusammenhang würde ich gern noch nach der Zuständigkeit fragen.", translation: "That explains the schedule. In this connection, I would also like to ask about responsibility." },
    { test: /^metacommunication$/iu, title: "Talk about how the exchange is going", rule: "Name the conversational difficulty or goal directly so both sides can adjust the interaction.", example: "Ich glaube, wir verwenden den Begriff unterschiedlich. Können wir kurz klären, was wir jeweils damit meinen?", translation: "I think we are using the term differently. Can we briefly clarify what each of us means by it?" },
    { test: /^intent$/iu, title: "State the intended meaning", rule: "Separate what the speaker wanted to achieve from how the words were understood.", example: "Meine Absicht war, den Ablauf zu klären, nicht Ihre Arbeit zu bewerten.", translation: "My intention was to clarify the process, not to evaluate your work." },
    { test: /^impact$/iu, title: "Describe impact with observable effects", rule: "Name the wording or action and then describe its concrete effect on participation, clarity, or trust.", example: "Die Unterbrechung hatte zur Folge, dass zwei Einwände nicht mehr besprochen wurden.", translation: "The interruption meant that two objections were no longer discussed." },
    { test: /exact time/iu, title: "Give an exact time reference", rule: "Use a clock time, date, or bounded interval so the event can be placed precisely.", example: "Der Anruf ging am 14. März um 16.42 Uhr ein.", translation: "The call came in on March 14 at 4:42 p.m." },
    { test: /place references with evidential markers/iu, title: "Link place details to the evidence", rule: "State where the observation was made and mark whether it comes from direct sight, a record, or another person's report.", example: "Laut dem Kameraprotokoll befand sich die Person um 16.43 Uhr am südlichen Eingang.", translation: "According to the camera log, the person was at the south entrance at 4:43 p.m." },
    { test: /schedul|deadline|fristen|termin/iu, title: "Dates, deadlines, and sequence", rule: "State the date or deadline with the action it controls. Use bis for an endpoint, ab for a starting point, and clear sequence markers when one step depends on another.", example: "Bis Freitag sammelt das Team die Rückmeldungen. Ab Montag beginnt die Auswertung.", translation: "The team collects feedback by Friday. Evaluation begins on Monday." },
    { test: /connector|contrast|concession|cohesion|argument/iu, title: "Connect the relationship between ideas", rule: "Choose a connector for the relationship you mean: aber for contrast, deshalb for result, obwohl for concession, and außerdem for an added point. Check whether the connector changes verb position.", example: "Obwohl der Tarif günstiger ist, bleibt die Laufzeit lang. Deshalb prüfen wir eine zweite Option.", translation: "Although the plan is cheaper, the term remains long. Therefore we examine a second option." }
  ];

  function splitFocus(value) {
    return value.split(/,\s*|\s+and\s+/iu).map(part => clean(part).replace(/^and\s+/iu, "")).filter(Boolean).slice(0, 3);
  }

  const contextualGrammarExamples = {
    "a0-follow-lesson": [
      { test: /noch/iu, example: "Ich bin noch nicht fertig.", translation: "I am not finished yet." }
    ],
    "a0-dates-calendar": [
      { test: /ordinal/iu, example: "Heute ist der fünfte Mai.", translation: "Today is May fifth." },
      { test: /am or im/iu, example: "Der Kurs beginnt im Mai. Der Termin ist am dritten Juni.", translation: "The course begins in May. The appointment is on June third." }
    ],
    "a2-parcel-service": [
      { test: /indirect/iu, example: "Können Sie mir sagen, wo ich das Paket abholen kann?", translation: "Can you tell me where I can collect the parcel?" }
    ],
    "a2-everyday-banking": [
      { test: /indirect/iu, example: "Können Sie mir sagen, warum diese Lastschrift gebucht wurde?", translation: "Can you tell me why this direct debit was posted?" }
    ],
    "a1-workplace-safety": [
      { test: /^müssen$/iu, example: "In der Werkstatt müssen alle Beschäftigten Schutzbrillen tragen.", translation: "Everyone in the workshop must wear safety glasses." },
      { test: /^dürfen$/iu, example: "Ohne Einweisung dürfen Besucher den Arbeitsbereich nicht betreten.", translation: "Visitors may not enter the work area without an induction." }
    ],
    "a1-taxi-pickup": [
      { test: /destinations with zu/iu, example: "Fahren Sie mich bitte zum Hauptbahnhof.", translation: "Please take me to the main station." },
      { test: /^nach$/iu, example: "Danach fahre ich nach Köln.", translation: "After that I am traveling to Cologne." },
      { test: /^in$/iu, example: "Bitte fahren Sie in die Tiefgarage.", translation: "Please drive into the underground car park." }
    ],
    "a1-emergency-police": [
      { test: /precise wer/iu, example: "Wer ist verletzt, und wer ruft an?", translation: "Who is injured, and who is calling?" },
      { test: /^was$/iu, example: "Was ist genau passiert?", translation: "What exactly happened?" }
    ],
    "b1-energy-provider": [
      { test: /comparative/iu, example: "Der neue Tarif ist günstiger als die Grundversorgung.", translation: "The new plan is cheaper than the default supply." },
      { test: /superlative/iu, example: "Eine kurze Vertragslaufzeit ist für uns am wichtigsten.", translation: "A short contract term is most important to us." }
    ],
    "b2-advanced-interview": [
      { test: /conditional/iu, example: "Falls die Kündigungsfrist berücksichtigt wird, könnte ich die Stelle am ersten Oktober antreten.", translation: "If the notice period is taken into account, I could start the position on October first." }
    ],
    "b2-multiparty-mediation": [
      { test: /neutral reformulation/iu, example: "Die Vermittlerin sagt: „Die Dienstzeiten sind unklar, und beide Seiten brauchen einen verlässlichen Plan.“", translation: "The mediator says that the service hours are unclear and both sides need a dependable plan." },
      { test: /conditional agreement/iu, example: "Falls alle Seiten zustimmen, gilt die Zwischenvereinbarung zunächst vier Wochen.", translation: "If all sides agree, the interim agreement will initially apply for four weeks." }
    ],
    "b2-community-project": [
      { test: /proposal/iu, example: "Wir könnten das Sprachcafé zunächst sechs Wochen lang erproben.", translation: "We could initially pilot the language café for six weeks." }
    ]
  };

  function focusCard(concept, core, index, plan) {
    const found = focusRules.find(item => item.test.test(concept));
    if (!found) throw new Error(`${plan.code} needs an authored grammar rule for “${concept}”`);
    const contextual = (contextualGrammarExamples[plan.id] || []).find(item => item.test.test(concept));
    const word = core[index % core.length];
    return {
      title: `${found.title}: ${concept}`,
      rule: found.rule,
      example: contextual?.example || found.example || word.example,
      translation: contextual?.translation || found.translation || word.exampleEn
    };
  }

  function grammarFor(plan, core) {
    const cards = splitFocus(plan.focus).map((concept, index) => focusCard(concept, core, index, plan));
    const pool = grammarPools[plan.level];
    const terms = `${plan.focus} ${plan.outcome}`.toLocaleLowerCase("en-US").split(/[^a-zäöüß]+/u).filter(term => term.length >= 4);
    const ranked = pool.map((card, index) => ({
      card,
      score: terms.reduce((total, term) => total + (`${card.title} ${card.rule}`.toLocaleLowerCase("en-US").includes(term) ? 1 : 0), 0),
      distance: (index - plan.number + pool.length) % pool.length
    })).sort((a, b) => b.score - a.score || a.distance - b.distance);
    for (const candidate of ranked) {
      if (cards.length >= 4) break;
      if (cards.some(card => card.title.includes(candidate.card.title))) continue;
      const review = clone(candidate.card);
      review.title = `Earlier pattern to reuse: ${review.title}`;
      delete review.supplemental;
      cards.push(review);
    }
    return cards;
  }

  function sentenceVariants(sentence) {
    const variants = [sentence];
    const swaps = [
      [/^Ich hätte gern\b/u, "Ich möchte"],
      [/^Könnten Sie\b/u, "Können Sie"],
      [/^Können Sie\b/u, "Könnten Sie"],
      [/^Ich möchte gern\b/u, "Ich möchte"],
      [/^Wir möchten gern\b/u, "Wir möchten"]
    ];
    swaps.forEach(([pattern, replacement]) => {
      if (pattern.test(sentence)) variants.push(sentence.replace(pattern, replacement));
    });
    return [...new Set(variants)];
  }

  const a0CoreIndexes = {
    "a0-follow-lesson": [0, 1, 2, 3, 4, 6, 7, 11],
    "a0-question-words": [0, 1, 2, 3, 4, 5, 7, 8],
    "a0-people-pronouns": [0, 1, 2, 3, 4, 5, 9, 10],
    "a0-core-actions": [0, 1, 2, 3, 4, 5, 6, 7],
    "a0-basic-needs": [0, 1, 2, 4, 5, 6, 7, 8, 9],
    "a0-negate-correct": [0, 1, 2, 3, 6, 7, 9, 10],
    "a0-dates-calendar": [0, 1, 2, 3, 4, 5, 7, 8, 9, 11],
    "a0-prices-amounts": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    "a0-body-comfort": [0, 1, 2, 3, 4, 5, 6, 7],
    "a0-building-signs": [0, 1, 2, 3, 4, 5, 6, 9, 10],
    "a0-first-response-help": [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11],
    "a0-sound-spelling": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11]
  };

  function recallAnswers(bundle, meaning, plan, index) {
    const groupedCalendarBundle = plan.id === "a0-dates-calendar" && index >= 1 && index <= 5;
    const german = groupedCalendarBundle ? [bundle] : [bundle, ...bundle.split(/\s+\/\s+/u).map(clean)];
    const firstPart = bundle.split(",")[0].trim();
    if (/^[a-zäöüß][\p{L} -]*(?:en|ern|eln|ieren)$/u.test(firstPart) && /,\s*(?:ich|du|er|sie|es|wir|ihr)\b/iu.test(bundle)) german.push(firstPart);
    const english = groupedCalendarBundle ? [meaning] : [meaning, ...meaning.split(/\s+(?:or|\/)\s+/iu).map(clean)];
    return { deAnswers: [...new Set(german)], enAnswers: [...new Set(english)] };
  }

  function normalizedPhrases(plan) {
    if (!Array.isArray(plan.phrases) || plan.phrases.length !== 12) throw new Error(`${plan.code} needs exactly twelve authored language bundles`);
    return plan.phrases.map((item, index) => {
      if (!Array.isArray(item) || item.length !== 4 || item.some(value => !clean(value))) throw new Error(`${plan.code} phrase ${index + 1} is incomplete`);
      const [bundle, en, rawExample, rawExampleEn] = item.map(clean);
      const example = /[.!?]$/u.test(rawExample) ? rawExample : `${rawExample}.`;
      const exampleEn = /[.!?]$/u.test(rawExampleEn) ? rawExampleEn : `${rawExampleEn}.`;
      const requiredAtA0 = new Set(a0CoreIndexes[plan.id] || [0, 1, 2, 3, 4, 5, 6, 7]);
      return {
        id: `${slug(plan.id)}-p${index + 1}`,
        de: bundle,
        en,
        bundle,
        example,
        exampleEn,
        variants: sentenceVariants(example).slice(1),
        recall: recallAnswers(bundle, en, plan, index),
        supplemental: plan.level === "A0" && !requiredAtA0.has(index)
      };
    });
  }

  function connectedCards(core) {
    return core.slice(0, 8).map((word, index) => {
      const partner = core[(index + 4) % core.length];
      const de = `${word.example} ${partner.example}`;
      const en = `${word.exampleEn} ${partner.exampleEn}`;
      return {
        id: `${word.id}-context`,
        de,
        en,
        bundle: `${word.bundle} · ${partner.bundle}`,
        example: de,
        exampleEn: en,
        variants: [],
        recall: { deAnswers: [de], enAnswers: [en] },
        supplemental: true,
        connectedCard: true,
        sourceWordIds: [word.id, partner.id],
        order: index + 1
      };
    });
  }

  function cueToken(word) {
    const stop = new Set(["der", "die", "das", "ein", "eine", "einen", "einem", "und", "oder", "mit", "für", "von"]);
    const candidates = clean(word.bundle).replace(/[·,;:!?()]/gu, " ").split(/\s+/u).filter(token => token.length >= 2 && !stop.has(token.toLocaleLowerCase("de-DE"))).sort((a, b) => b.length - a.length);
    return candidates.find(token => word.example.toLocaleLowerCase("de-DE").includes(token.toLocaleLowerCase("de-DE"))) || "";
  }

  function patternFor(value) {
    const escaped = String(value || "").replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
    return escaped.replace(/ä/giu, "(?:ä|ae)").replace(/ö/giu, "(?:ö|oe)").replace(/ü/giu, "(?:ü|ue)").replace(/ß/giu, "(?:ß|ss)");
  }

  function questionTokens(sentence) {
    return clean(sentence).split(/\s+/u);
  }

  function rotatedTokens(sentence, offset) {
    const tokens = questionTokens(sentence);
    if (tokens.length < 2) return tokens;
    const shift = Math.max(1, offset % tokens.length);
    return tokens.slice(shift).concat(tokens.slice(0, shift));
  }

  function gapSentence(word) {
    const token = cueToken(word) || questionTokens(word.example).find(item => item.length >= 4) || questionTokens(word.example)[0];
    return { prompt: word.example.replace(token, "_____"), token };
  }

  function errorSentence(sentence) {
    const replacements = [
      [/\beinen\b/u, "ein"], [/\beinem\b/u, "einen"], [/\bder\b/u, "die"], [/\bdie\b/u, "der"], [/\bdas\b/u, "die"],
      [/\bist\b/u, "sind"], [/\bsind\b/u, "ist"], [/\bhat\b/u, "haben"], [/\bhaben\b/u, "hat"], [/\bSie\b/u, "du"]
    ];
    const found = replacements.find(([pattern]) => pattern.test(sentence));
    if (found) return sentence.replace(found[0], found[1]);
    const parts = questionTokens(sentence);
    if (parts.length > 3) [parts[1], parts[2]] = [parts[2], parts[1]];
    return parts.join(" ");
  }

  function supportFor(plan, word) {
    const model = word.bundle === withoutFinalPunctuation(word.example) ? "Return to the matching lesson example." : word.bundle;
    return {
      title: "Use the taught pattern",
      model,
      translation: word.en,
      tip: `Keep the intended meaning and register. Check ${plan.focus.toLocaleLowerCase("en-US")}.`
    };
  }

  function questionsFor(plan, core) {
    const teachable = core.filter(word => !word.supplemental);
    const modes = ["SUPPORTED MEANING", "SUPPORTED MEANING", "PATTERN COMPLETION", "PATTERN COMPLETION", "WORD ORDER", "WORD ORDER", "ACTIVE RECALL", "ERROR REPAIR", "SITUATION RESPONSE", "CONNECTED RESPONSE"];
    return modes.map((type, index) => {
      const word = teachable[index % teachable.length];
      const answers = sentenceVariants(word.example);
      const base = {
        id: `${slug(plan.id)}-q${index + 1}`,
        type,
        context: plan.scenario,
        answers,
        explanation: `The target pattern is ${word.bundle}.`,
        requires: [word.id],
        wordBank: [],
        support: index < 6 || plan.level === "A0" ? supportFor(plan, word) : null
      };
      if (index < 2) {
        base.prompt = `Use the taught bundle “${word.bundle}” to express this complete meaning in German: ${word.exampleEn}`;
        base.wordBank = plan.level === "A0" ? rotatedTokens(word.example, index + 1) : [];
      } else if (index < 4) {
        const gap = gapSentence(word);
        base.prompt = `Restore the missing part and write the complete German sentence: ${gap.prompt}`;
        base.wordBank = [gap.token, cueToken(teachable[(index + 1) % teachable.length])].filter(Boolean);
      } else if (index < 6) {
        base.prompt = `Put these parts into a complete German sentence: ${rotatedTokens(word.example, index + 1).join(" · ")}`;
        base.wordBank = rotatedTokens(word.example, index + 1);
      } else if (index === 6) {
        base.prompt = `Use the taught bundle “${word.bundle}” to write this complete meaning in German: ${word.exampleEn}`;
      } else if (index === 7) {
        base.prompt = `One form or position is wrong. Keep the taught register and rewrite the whole sentence correctly: ${errorSentence(word.example)}`;
      } else if (index === 8) {
        base.prompt = `Respond in German with the taught bundle “${word.bundle}” for this complete intention: ${word.exampleEn}`;
      } else {
        const partner = teachable[(index + 1) % teachable.length];
        base.prompt = `Write two useful lines in this order. First: ${word.exampleEn} Then: ${partner.exampleEn}`;
        base.answers = [`${word.example} ${partner.example}`, `${word.example}\n${partner.example}`];
        base.requires = [word.id, partner.id];
        base.wordBank = plan.level === "A0" ? rotatedTokens(`${word.example} ${partner.example}`, 3) : [];
      }
      return base;
    });
  }

  function registerOf(sentence) {
    if (/\b(?:Sie|Ihnen|Ihr(?:e|en|er|es|em)?)\b/u.test(sentence)) return "formal";
    if (/\b(?:du|dich|dir|dein(?:e|en|er|es|em)?|ihr|euch|euer)\b/iu.test(sentence)) return "informal";
    return "neutral";
  }

  function preferredRegister(core) {
    const counts = core.reduce((all, word) => ({ ...all, [registerOf(word.example)]: (all[registerOf(word.example)] || 0) + 1 }), {});
    return (counts.formal || 0) >= (counts.informal || 0) ? "formal" : "informal";
  }

  const customProduction = {
    "a0-follow-lesson": {
      writing: {
        indexes: [0, 6, 11, 3],
        text: "Hören Sie zu und wählen Sie die Antwort. Schreiben Sie den Satz in das Feld. Ergänzen Sie das fehlende Wort. Ich bin noch nicht fertig."
      },
      speaking: {
        indexes: [0, 6, 11],
        text: "Hören Sie zu. Ergänzen Sie das fehlende Wort. Ich bin noch nicht fertig."
      }
    },
    "a0-dates-calendar": {
      writing: {
        indexes: [7, 8, 9, 11, 1, 10],
        text: "Welches Datum ist heute? Heute ist der fünfte Mai. Am Sonntag ist das Büro geschlossen. Mein Kurs beginnt im Mai. Der Termin ist am dritten Juni. Nächste Woche habe ich Zeit."
      },
      speaking: {
        indexes: [7, 8, 9, 11],
        text: "Welches Datum ist heute? Heute ist der fünfte Mai. Der Termin ist am dritten Juni. Nächste Woche habe ich Zeit."
      }
    },
    "a2-parcel-service": {
      writing: {
        indexes: [1, 6, 7, 8, 9, 11],
        text: "Guten Tag. Ich habe gestern ein Päckchen verschickt. Nach der erfolglosen Zustellung lag ein Abholschein im Briefkasten. Der Sendungsstatus hat sich seit Montag nicht geändert. Können Sie mir sagen, ob das Paket in einer Paketstation liegt? Welche Unterlagen brauche ich für die Abholung? Falls die Sendung beschädigt ist, möchte ich sie zurücksenden. Vielen Dank für Ihre Hilfe."
      },
      speaking: {
        indexes: [1, 7, 8, 9],
        text: "Guten Tag. Nach der erfolglosen Zustellung lag ein Abholschein im Briefkasten. Der Sendungsstatus hat sich nicht geändert. Liegt mein Päckchen in einer Paketstation, und was brauche ich für die Abholung?"
      }
    },
    "b1-workplace-incident": {
      writing: {
        indexes: [0, 8, 9, 7, 11, 4, 5, 6, 10, 2],
        text: "Der Arbeitsunfall geschah am Dienstag gegen 14 Uhr. Ein Mitarbeiter ist neben einer undichten Maschine auf dem nassen Boden ausgerutscht. Er hat sich am Handgelenk verletzt, war aber ansprechbar. Wir haben die Maschine sofort ausgeschaltet und den Arbeitsbereich abgesichert. Zwei Zeuginnen haben den Vorfall gesehen. Die Vorgesetzte wurde umgehend informiert. Im Lager muss die vorgeschriebene Schutzausrüstung getragen werden. Der Unfallbericht wurde noch am selben Tag ausgefüllt. Darin stehen Zeitpunkt, Ort, Verletzung und die ersten Maßnahmen. Eine Prüfung soll nun die Ursache der Leckage feststellen. Jeder weitere Vorfall muss der Leitung gemeldet werden."
      },
      speaking: {
        indexes: [0, 8, 9, 7, 11, 5, 6],
        text: "Der Arbeitsunfall geschah am Dienstag neben einer Maschine. Ein Mitarbeiter ist auf dem nassen Boden ausgerutscht und hat sich verletzt. Wir haben den Arbeitsbereich abgesichert, zwei Zeuginnen befragt und die Vorgesetzte informiert. Der Vorfall wird heute gemeldet und im Unfallbericht dokumentiert."
      }
    },
    "b2-multiparty-mediation": {
      writing: {
        indexes: [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11],
        text: "An der Vermittlung nehmen Beschäftigte, die Leitung und der Kunde teil. Die Beschäftigten brauchen planbare Dienstzeiten, die Leitung muss die verfügbaren Stellen besetzen, und der Kunde erwartet verlässliche Servicezeiten. Zu Beginn ermittelt die Mediatorin die Interessen hinter den Positionen und spricht die ungleichen Machtverhältnisse offen an. Sie bleibt allparteilich und vereinbart verbindliche Gesprächsregeln. Sie spiegelt die Enttäuschung, ohne eine Sichtweise zu übernehmen. Den Vorwurf „Ihr plant absichtlich zu wenig Personal“ formuliert sie neutral um: „Die derzeitige Besetzung reicht für die vereinbarten Servicezeiten nicht aus.“ Ein vertrauliches Einzelgespräch bleibt möglich, falls das Machtgefälle eine offene Aussage erschwert. Falls alle Seiten zustimmen, könnte zunächst ein vierwöchiger Dienstplan gelten. Dafür steckt die Gruppe einen Lösungskorridor ab und trifft eine Zwischenvereinbarung zur Personalplanung. Nach vier Wochen wird die Einhaltung der Abmachung gemeinsam überprüft. Bei persönlichen Angriffen greift die Gesprächsleitung sofort ein."
      },
      speaking: {
        indexes: [0, 1, 2, 4, 8, 9, 10],
        text: "Ich bleibe allparteilich und beginne mit verbindlichen Gesprächsregeln. Danach ermitteln wir die Interessen hinter den Positionen und sprechen die ungleichen Machtverhältnisse offen an. Wir formulieren den Vorwurf neutral um und bieten bei Bedarf ein vertrauliches Einzelgespräch an. Falls alle Seiten zustimmen, stecken wir einen Lösungskorridor ab, treffen eine Zwischenvereinbarung und überprüfen sie nach vier Wochen gemeinsam."
      }
    }
  };

  const customReadings = {
    "a0-people-pronouns": {
      lineByLine: true,
      sections: [{ lines: [
        "Das ist Ben.",
        "Er kommt aus Bonn.",
        "Das ist Lea.",
        "Sie wohnt in Köln.",
        "Das ist ein Buch.",
        "Es ist neu.",
        "Wir lernen Deutsch."
      ] }]
    },
    "a0-core-actions": {
      lineByLine: true,
      sections: [{ lines: [
        "Kommst du morgen?",
        "Ja.",
        "Wir trinken Kaffee.",
        "Das ist Mia.",
        "Sie isst ein Brötchen."
      ] }]
    },
    "a1-texts-email": {
      sections: [{
        heading: "Informelle Nachricht",
        lines: [
          "Lieber Jonas, danke für deine Nachricht.",
          "Können wir den Termin verschieben?",
          "Ich melde mich morgen bei dir."
        ]
      }, {
        heading: "Formelle Nachricht",
        lines: [
          "Sehr geehrte Frau Kaya, ich habe eine Frage.",
          "Die Datei finden Sie im Anhang.",
          "Geben Sie mir bitte bis Freitag Bescheid.",
          "Ich bestätige den Termin am Montag.",
          "Ich melde mich morgen bei Ihnen."
        ]
      }]
    },
    "b1-cultural-review": {
      sections: [{
        heading: "Eine Aufführung im Kulturzentrum",
        lines: [
          "Am Samstag besuchte ich eine Aufführung im Kulturzentrum.",
          "Der Veranstaltungsort ist gut mit der Bahn erreichbar.",
          "Im Programmheft standen Hintergrundinformationen zum Stück.",
          "Die Aufführung dauerte knapp zwei Stunden.",
          "Das Stück setzt sich mit sozialer Ungleichheit auseinander.",
          "Die Handlung entwickelte sich zunächst langsam.",
          "Besonders überzeugend war die Darstellung der Hauptfigur.",
          "Die Lichtgestaltung war beeindruckend, und die Musik hat einen starken Eindruck hinterlassen.",
          "Das abrupte Ende fand ich enttäuschend.",
          "Trotzdem ist die Aufführung für Jugendliche und Erwachsene empfehlenswert."
        ]
      }]
    },
    "b2-professional-feedback": {
      sections: [{
        heading: "Ein vereinbartes Feedbackgespräch",
        lines: [
          "Die Teamleiterin Frau Neumann spricht mit dem Mitarbeiter Herrn Yilmaz über seine letzte Präsentation.",
          "Zunächst würdigt sie seine gute Kundenbetreuung.",
          "Danach beschreibt sie konkret, dass er mehrere Kolleginnen während der Besprechung unterbrochen hat.",
          "Sie benennt ruhig, welche Wirkung die häufigen Unterbrechungen auf andere hatten.",
          "Der Bericht zeigt außerdem Verbesserungspotenzial bei der internen Abstimmung und bei der Einhaltung von Fristen auf.",
          "Herr Yilmaz nimmt die Kritik sachlich an und stellt zwei Rückfragen.",
          "Er bittet um ein konkretes Beispiel aus der Besprechung.",
          "Anschließend erläutert er, wie er die Situation erlebt hat.",
          "Frau Neumann verdeutlicht, welche Rückmeldung sie künftig erwartet.",
          "Beide vereinbaren ein Entwicklungsziel für das nächste Quartal.",
          "Ein kurzes Wochenprotokoll soll die Fortschritte nachvollziehbar machen.",
          "Für Ende des Monats setzen sie ein Folgegespräch an."
        ]
      }]
    },
    "b2-advanced-interview": {
      sections: [{
        heading: "Ein Bewerbungsgespräch",
        lines: [
          "Zu Beginn erläutert die Bewerberin ihren beruflichen Werdegang.",
          "Sie begründet den beruflichen Wechsel mit neuen fachlichen Zielen.",
          "Ihre Beschäftigungslücke entstand während der Pflege eines Angehörigen.",
          "Durch eine Weiterbildung hat sie den Quereinstieg in die IT geschafft.",
          "Im letzten Projekt war ihr Verantwortungsbereich klar von der Entwicklung abgegrenzt.",
          "Konkrete Beispiele vermitteln ihre Motivation glaubhaft.",
          "Auf Nachfrage nennt sie eine realistische Gehaltsvorstellung.",
          "Bei ihrem möglichen Starttermin muss sie die Kündigungsfrist berücksichtigen.",
          "Sie fragt nach den Rahmenbedingungen für mobiles Arbeiten.",
          "Am Ende des Gesprächs besprechen beide Seiten die Probezeit.",
          "Die Bewerberin könnte die Stelle zum ersten Oktober antreten.",
          "Durch ihre Projekterfahrung ist sie für die Aufgabe gut qualifiziert."
        ]
      }]
    },
    "b2-consumer-contract-dispute": {
      sections: [{
        heading: "Fall 1: eine unerwartete Vertragsverlängerung",
        lines: [
          "Die Mindestvertragslaufzeit des Abonnements beträgt zwölf Monate.",
          "Die automatische Verlängerung ist im Vertrag deutlich hervorgehoben.",
          "Die Kundin prüft vor der Kündigung die betreffende Vertragsklausel.",
          "Sie hat die Kündigung per Einschreiben nachweisbar versandt.",
          "Der Anbieter bestreitet den rechtzeitigen Zugang.",
          "Die Kundin setzt ihm schriftlich eine Frist zur Bestätigung der Kündigung."
        ]
      }, {
        heading: "Fall 2: ein mangelhaftes Gerät",
        lines: [
          "Bei einem neu gekauften Gerät ist derselbe Defekt erneut aufgetreten.",
          "Wegen des Defekts nimmt der Käufer die Gewährleistung in Anspruch.",
          "Nach der erfolglosen Nachbesserung möchte er vom Vertrag zurücktreten.",
          "In seinem Schreiben macht er den Sachmangel am Gerät geltend.",
          "Er fordert eine Ersatzlieferung innerhalb von vierzehn Tagen.",
          "Bevor er weitere Schritte prüft, setzt er dem Anbieter eine Nachfrist.",
          "Wenn beide Seiten keine Lösung finden, kann eine Schlichtungsstelle eingeschaltet werden."
        ]
      }]
    },
    "b2-insurance-claims": {
      sections: [{
        heading: "Ein Wasserschaden in einer Mietwohnung",
        lines: [
          "Der Mieter meldet den Versicherungsfall noch am selben Tag.",
          "Zunächst muss geklärt werden, ob für den Wasserschaden Versicherungsschutz besteht.",
          "Laut Vertrag beträgt die Selbstbeteiligung zweihundert Euro.",
          "Im Formular schildert der Mieter den Schadenshergang in zeitlicher Reihenfolge.",
          "Vor der Reparatur holt er einen Kostenvoranschlag ein.",
          "Nach der Online-Meldung erhält er eine Schadennummer.",
          "Er lässt prüfen, ob auch die Folgeschäden gedeckt sind.",
          "Mit den Originalrechnungen beantragt er die Erstattung der Kosten.",
          "Dem Schreiben fügt er Fotos und Rechnungen geordnet bei.",
          "Für das beschädigte Mobiliar wird zunächst der Zeitwert ermittelt.",
          "Nach dem Gutachten möchte er die Ablehnung erneut überprüfen lassen.",
          "Er lässt sich die Leistungskürzung schriftlich begründen."
        ]
      }]
    },
    "b2-healthcare-decisions": {
      sections: [{
        heading: "Eine Entscheidung nach dem Aufklärungsgespräch",
        lines: [
          "Nach dem Aufklärungsgespräch kann die Patientin eine informierte Entscheidung treffen.",
          "Vor dem Eingriff wägt sie Nutzen und Risiken gegeneinander ab.",
          "Bei der schwierigen Entscheidung möchte sie eine zweite Meinung einholen.",
          "Die Einwilligung wird erst nach der vollständigen Aufklärung erteilt.",
          "Die Patientin darf die vorgeschlagene Behandlung ablehnen.",
          "Sie wurde auch über weniger invasive Behandlungsalternativen aufgeklärt.",
          "Im Aufnahmebogen gibt sie ihre Vorerkrankungen vollständig an.",
          "Vor der neuen Medikation müssen mögliche Wechselwirkungen abgeklärt werden.",
          "In den nächsten Wochen soll sie den Krankheitsverlauf genau beobachten.",
          "Die Ärztin erklärt die Prognose mit konkreten Zeiträumen.",
          "Die Patientin und ihre Ärztin legen gemeinsam realistische Behandlungsziele fest.",
          "Die Patientin hat eine aktuelle Patientenverfügung bei ihrer Hausärztin hinterlegt."
        ]
      }]
    },
    "b2-banking-fraud": {
      sections: [{
        heading: "Eine verdächtige Kontobewegung",
        lines: [
          "Die Kundin erkennt an einer gefälschten Internetadresse einen Betrugsversuch.",
          "Kurz danach bemerkt sie eine verdächtige Kontobewegung.",
          "Sie meldet die Bewegung sofort der Bank.",
          "Da auch ihre Karte fehlt, lässt sie diese telefonisch sperren.",
          "Eine unberechtigte Lastschrift kann sie im Onlinebanking zurückgeben.",
          "Sie versucht, eine fehlerhafte Überweisung noch am selben Tag zurückzurufen.",
          "Zum Schutz des Kontos richtet sie eine Zwei-Faktor-Authentifizierung ein."
        ]
      }, {
        heading: "Ein Kreditvergleich",
        lines: [
          "Später vergleicht die Kundin zwei Kreditangebote.",
          "Der effektive Jahreszins ist wichtiger als der Sollzins allein.",
          "Die monatliche Kreditrate darf ihr Haushaltsbudget nicht überlasten.",
          "Vor der Kreditzusage muss sie eine Bonitätsprüfung durchlaufen.",
          "Unter bestimmten Bedingungen kann sie den Kredit vorzeitig ablösen."
        ]
      }]
    }
  };

  const naturalClosings = {
    A0: [],
    A1: [
      "Bitte sagen Sie mir, wie es weitergeht.",
      "Können wir den nächsten Schritt kurz bestätigen?",
      "Vielen Dank für Ihre Hilfe."
    ],
    A2: [
      "Bitte teilen Sie mir den nächsten Schritt und den passenden Termin mit.",
      "Könnten Sie die Angaben prüfen und mir kurz Bescheid geben?",
      "Vielen Dank. Ich warte auf Ihre Rückmeldung."
    ],
    B1: [
      "Bitte bestätigen Sie die vereinbarten Schritte, die zuständige Person und den Termin schriftlich.",
      "Die noch offenen Punkte sollten beim nächsten Termin gemeinsam geklärt werden.",
      "Anschließend kann die zuständige Stelle das weitere Vorgehen schriftlich bestätigen."
    ],
    B2: [
      "Die Beteiligten sollten Zuständigkeiten, Fristen und Kriterien für die spätere Auswertung verbindlich festhalten.",
      "Nach dem vereinbarten Zeitraum lässt sich prüfen, ob die Maßnahme ihr konkretes Ziel erreicht hat.",
      "Für die Umsetzung braucht es einen klaren Zeitplan, benannte Verantwortliche und eine gemeinsame Auswertung."
    ]
  };

  function spreadSelect(items, count) {
    if (items.length <= count) return [...items];
    const indexes = Array.from({ length: count }, (_, index) => Math.round(index * (items.length - 1) / Math.max(1, count - 1)));
    return [...new Set(indexes)].map(index => items[index]);
  }

  function customSelection(core, indexes) {
    return indexes.map(index => core.find(word => word.id.endsWith(`-p${index + 1}`))).filter(Boolean);
  }

  function modelFor(plan, core, speaking = false) {
    const custom = customProduction[plan.id]?.[speaking ? "speaking" : "writing"];
    if (custom) return { text: custom.text, selected: customSelection(core, custom.indexes) };
    const teachable = core.filter(word => !word.supplemental);
    const preferred = preferredRegister(teachable);
    const ordered = teachable.filter(word => registerOf(word.example) === "neutral" || registerOf(word.example) === preferred)
      .concat(teachable.filter(word => !["neutral", preferred].includes(registerOf(word.example))));
    const limits = speaking ? { A0: 3, A1: 4, A2: 5, B1: 6, B2: 7 } : { A0: 4, A1: 6, A2: 8, B1: 10, B2: 12 };
    const selected = spreadSelect(ordered, Math.min(limits[plan.level], ordered.length));
    const lines = selected.map(word => word.example);
    if (!speaking) {
      const [minimum, maximum] = levelTaskRanges[plan.level];
      for (const word of ordered) {
        if (countWords(lines.join(" ")) >= minimum) break;
        if (selected.includes(word)) continue;
        if (countWords(`${lines.join(" ")} ${word.example}`) > maximum) continue;
        selected.push(word);
        lines.push(word.example);
      }
      const closings = naturalClosings[plan.level];
      let closingIndex = 0;
      while (countWords(lines.join(" ")) < minimum && closingIndex < closings.length) {
        const closing = closings[(plan.number + closingIndex) % closings.length];
        if (countWords(`${lines.join(" ")} ${closing}`) <= maximum) lines.push(closing);
        closingIndex += 1;
      }
    }
    return { text: lines.join(" "), selected };
  }

  function inputFor(plan, core) {
    const scriptCounts = { A0: 3, A1: 5, A2: 6, B1: 7, B2: 8 };
    const passageCounts = { A0: 4, A1: 6, A2: 8, B1: 10, B2: 12 };
    const taught = core.filter(word => !word.supplemental);
    const start = plan.number % Math.min(3, taught.length);
    const ordered = taught.slice(start).concat(taught.slice(0, start));
    const scriptWords = ordered.slice(0, scriptCounts[plan.level]);
    const passageWords = ordered.slice(0, passageCounts[plan.level]);
    const listenTarget = scriptWords[Math.min(1, scriptWords.length - 1)];
    const readTarget = passageWords[(plan.number + 1) % passageWords.length];
    const secondTarget = passageWords[(plan.number + 4) % passageWords.length];
    const beginning = levelOrder[plan.level] <= levelOrder.A1;
    const advanced = levelOrder[plan.level] >= levelOrder.B1;
    const twoDetails = plan.number % 3 === 0;
    const readingOverride = customReadings[plan.id];
    const passageLines = readingOverride
      ? readingOverride.sections.flatMap(section => section.lines)
      : passageWords.map(word => word.example);
    const advancedAnswers = [];
    if (advanced) {
      for (let first = 0; first < passageLines.length; first += 1) {
        for (let second = first + 1; second < passageLines.length; second += 1) {
          advancedAnswers.push(`${passageLines[first]} ${passageLines[second]}`);
        }
      }
    }
    const splitAt = Math.ceil(passageLines.length / 2);
    const passage = readingOverride?.lineByLine
      ? passageLines.join("\n")
      : readingOverride
      ? readingOverride.sections.map(section => `${section.heading ? `${section.heading}\n` : ""}${section.lines.join(" ")}`).join("\n\n")
      : plan.level === "A0"
      ? passageLines.join("\n")
      : levelOrder[plan.level] >= levelOrder.B1
      ? `Ausgangslage\n${passageLines.slice(0, splitAt).join(" ")}\n\nWeitere Angaben\n${passageLines.slice(splitAt).join(" ")}`
      : `${passageLines.slice(0, splitAt).join(" ")}\n\n${passageLines.slice(splitAt).join(" ")}`;
    if (readingOverride && !advanced) {
      const requiredLines = twoDetails ? [readTarget.example, secondTarget.example] : [readTarget.example];
      requiredLines.forEach(line => {
        if (!passage.includes(line)) throw new Error(`Custom reading for ${plan.code} is missing its expected answer: ${line}`);
      });
    }
    return {
      script: scriptWords.map(word => word.example).join(" "),
      listenPrompt: beginning
        ? `Which complete line expresses this meaning: ${listenTarget.exampleEn}`
        : `Welche vollständige Aussage drückt diese Bedeutung aus: ${listenTarget.exampleEn}`,
      listenAnswers: sentenceVariants(listenTarget.example),
      passage,
      readPrompt: advanced
        ? "Fasse zwei konkrete Informationen aus dem Text auf Deutsch zusammen. Eigene Formulierungen sind möglich."
        : twoDetails
        ? beginning
          ? `Find two details. Which lines mean “${readTarget.exampleEn}” and “${secondTarget.exampleEn}”? Answer in German.`
          : `Finde zwei zusammengehörige Details. Welche Aussagen bedeuten „${readTarget.exampleEn}“ und „${secondTarget.exampleEn}“? Antworte auf Deutsch.`
        : beginning
          ? `Which complete sentence in the text means: ${readTarget.exampleEn}`
          : `Welche vollständige Aussage im Text bedeutet: ${readTarget.exampleEn}`,
      readAnswers: advanced
        ? advancedAnswers
        : twoDetails
        ? [`${readTarget.example} ${secondTarget.example}`, `${readTarget.example}; ${secondTarget.example}`]
        : sentenceVariants(readTarget.example)
    };
  }

  function lessonFor(plan, core, grammar) {
    const teachable = core.filter(word => !word.supplemental);
    const groupSize = plan.level === "A0" ? 2 : 3;
    const groups = [];
    for (let index = 0; index < teachable.length; index += groupSize) groups.push(teachable.slice(index, index + groupSize));
    const steps = [{
      id: "purpose",
      kind: "teach",
      label: "PURPOSE",
      title: plan.title,
      body: `${plan.subtitle} Situation: ${plan.scenario}`,
      note: plan.outcome
    }, {
      id: "focus-pattern",
      kind: "teach",
      label: "PATTERN",
      title: grammar[0].title,
      body: grammar[0].rule,
      examples: [{ de: grammar[0].example, en: grammar[0].translation }]
    }];
    groups.forEach((group, groupIndex) => {
      steps.push({
        id: `language-${groupIndex + 1}`,
        kind: "teach",
        label: groupIndex ? "BUILD" : "MEET",
        title: groupIndex ? "Add the next useful lines" : "Begin with a small language set",
        body: "Read each bundle, its meaning, and the complete example. Keep the article, preposition, or register attached to the phrase.",
        examples: group.map(word => ({ de: word.bundle, en: word.en, note: `${word.example} (${word.exampleEn})` })),
        teaches: group.map(word => word.id)
      });
      const target = group[groupIndex % group.length];
      if (groupIndex % 3 === 0) {
        const distractors = teachable.filter(word => !group.includes(word)).slice(groupIndex, groupIndex + 2).map(word => word.bundle);
        const options = [target.bundle, ...distractors].slice(0, 3);
        const shift = plan.number % options.length;
        steps.push({
          id: `check-${groupIndex + 1}`,
          kind: "choice",
          label: "CHECK MEANING",
          title: "Choose the complete bundle",
          body: "Use the meaning and situation. The answer stays as one complete unit.",
          prompt: `Which bundle means: ${target.en}?`,
          options: options.slice(shift).concat(options.slice(0, shift)),
          answer: target.bundle,
          retry: "Return to the examples directly above and match the complete meaning.",
          success: "The meaning and its German bundle are connected.",
          teaches: [target.id]
        });
      } else if (groupIndex % 3 === 1) {
        steps.push({
          id: `check-${groupIndex + 1}`,
          kind: "arrange",
          label: "BUILD",
          title: "Put the sentence in German order",
          body: "Begin with the sentence frame from the example, then place the remaining detail where German expects it.",
          prompt: target.exampleEn,
          tokens: rotatedTokens(target.example, plan.number + groupIndex),
          answer: target.example,
          retry: "Find the finite verb and rebuild the model sentence from the language card.",
          success: "The complete sentence is in place.",
          teaches: [target.id]
        });
      } else {
        steps.push({
          id: `check-${groupIndex + 1}`,
          kind: "type",
          label: "SUPPORTED TYPE",
          title: "Retrieve one full line",
          body: `Use the bundle “${target.bundle}”. Keyboard spellings such as ae, oe, ue, and ss receive full credit.`,
          prompt: target.exampleEn,
          placeholder: "Type the complete German sentence",
          answers: sentenceVariants(target.example),
          retry: `Return to the bundle “${target.bundle}” and rebuild its example.`,
          success: "You produced the pattern from meaning.",
          teaches: [target.id]
        });
      }
      const nextPattern = grammar[groupIndex + 1];
      if (nextPattern && !nextPattern.title.startsWith("Earlier pattern")) {
        steps.push({
          id: `focus-pattern-${groupIndex + 2}`,
          kind: "teach",
          label: "PATTERN",
          title: nextPattern.title,
          body: nextPattern.rule,
          examples: [{ de: nextPattern.example, en: nextPattern.translation }]
        });
      }
    });
    const transfer = teachable.at(-1);
    steps.push({
      id: "guided-transfer",
      kind: "type",
      label: "GUIDED TRANSFER",
      title: "Finish with an independent line",
      body: `Use the taught bundle “${transfer.bundle}” in its complete example. The Sentence Lab will vary the task shape after this step.`,
      prompt: transfer.exampleEn,
      placeholder: "Type the German sentence",
      answers: sentenceVariants(transfer.example),
      retry: "Review the final language group and try the full line once more.",
      success: "The core language is ready for typed recall.",
      teaches: [transfer.id]
    });
    return {
      title: `${plan.title}: guided lesson`,
      intro: "Meet a small set, check it immediately, then add the next layer. Every required bundle appears before independent practice.",
      steps
    };
  }

  function nounHeads(core) {
    return [...new Set(core.map(word => word.de.match(/^(?:der|die|das)\s+([A-ZÄÖÜ][\p{L}-]*)/u)?.[1]).filter(Boolean))].slice(0, 14);
  }

  function taskChecks(plan, requiredWords, core, minWords, maxWords) {
    const sentenceMinimum = { A0: 3, A1: 4, A2: 5, B1: 6, B2: 8 }[plan.level];
    const functionMinimum = { A0: 2, A1: 3, A2: 4, B1: 5, B2: 6 }[plan.level];
    const minimumDistinct = { A0: 9, A1: 18, A2: 28, B1: 40, B2: 55 }[plan.level];
    const checks = [
      { label: `Write at least ${minWords} words`, type: "minWords", value: minWords, essential: true },
      { label: `Write no more than ${maxWords} words`, type: "maxWords", value: maxWords, essential: true },
      ...requiredWords.map(word => ({ label: `Complete the task with language for “${word.en}”`, type: "regex", pattern: patternFor(cueToken(word)), flags: "iu", essential: true })),
      { label: `Build at least ${sentenceMinimum} sentence units`, type: "sentenceCount", min: sentenceMinimum, essential: true },
      { label: "Use a varied vocabulary", type: "lexicalDiversity", minRatio: .42, minDistinct: minimumDistinct, essential: true },
      { label: "Use enough German sentence words", type: "distinctRegexCount", pattern: "\\b(?:ich|du|er|sie|es|wir|ihr|Sie|der|die|das|den|dem|ein|eine|einen|einem|und|aber|weil|wenn|dass|ist|sind|hat|haben|wird|werden|kann|können|muss|müssen|soll|sollen|mit|für|auf|in|zu|von|bei|nach)\\b", flags: "giu", min: functionMinimum, essential: true },
      { label: "Finish each sentence or line with punctuation", type: "punctuatedLines", required: levelOrder[plan.level] >= levelOrder.A2, essential: levelOrder[plan.level] >= levelOrder.A2 }
    ];
    const nouns = nounHeads(core);
    if (nouns.length) checks.push({ label: "Capitalize the German nouns used in this module", type: "capitalization", words: nouns, required: levelOrder[plan.level] >= levelOrder.A2 });
    else if (levelOrder[plan.level] < levelOrder.A2) checks.push({ label: "Use the taught capitalization", type: "capitalization", words: [], required: false });
    return checks;
  }

  function cultureFor(plan, core) {
    if (plan.fieldNote) return { title: plan.fieldNoteTitle, body: plan.fieldNote };
    const practical = practicalSources.find(source => source.ids.some(fragment => plan.id.includes(fragment)));
    if (practical) return { title: "Check the current route and exact details", body: practical.body, source: practical };
    const variants = [
      { title: "Keep the fixed partners together", body: `The bundle “${core[0].bundle}” carries more than one word. Learn its article, preposition, or verb partner with it so the whole phrase is available during a real exchange.` },
      { title: "Register stays visible", body: `The examples show who is speaking to whom. When a model uses du or Sie, keep the matching pronouns, verb forms, greeting, and closing consistent through the exchange.` },
      { title: "Read for the decision point", body: `In this situation, dates, amounts, conditions, and next steps can carry the practical meaning. Read once for the purpose, then return for the exact detail that changes what happens next.` },
      { title: "A repair phrase keeps the exchange moving", body: `A useful response can include a request to repeat, clarify, confirm, or rephrase. The language in this module gives you a way to act even when every word is not available immediately.` },
      { title: "Complete phrases sound more natural", body: `Short words can change with case and sentence position. Practise “${core[1].bundle}” as a complete unit, then replace only the person, time, amount, or object you need.` },
      { title: "Purpose shapes the wording", body: `The same fact can become a question, request, explanation, or warning. Notice which communicative job each model sentence performs before adapting its details.` }
    ];
    return variants[plan.number % variants.length];
  }

  const pathwaySupport = {
    A0: [
      "Recognize the short lines introduced inside the lesson.",
      "Build a brief reply from language you have already met."
    ],
    A1: [
      "Find the purpose and one practical detail in a short text.",
      "Use taught phrases in a short message and spoken exchange."
    ],
    A2: [
      "Connect the main action with the details that change the next step.",
      "Handle the situation in a connected written and spoken response."
    ],
    B1: [
      "Select relevant facts and organize them for the reader or listener.",
      "Explain a position, sequence, or problem with a clear next step."
    ],
    B2: [
      "Interpret relationships, conditions, and viewpoints across a detailed text.",
      "Produce a precise response adapted to purpose, audience, and register."
    ]
  };

  function writingPromptFor(plan, minWords, maxWords) {
    if (plan.level === "A0") return `Write ${minWords} to ${maxWords} words in German with short lines from this lesson. Situation: ${plan.scenario} Task: ${plan.subtitle}`;
    if (plan.level === "A1") return `Write a short German message of ${minWords} to ${maxWords} words. Situation: ${plan.scenario} Task: ${plan.outcome}`;
    return `Write ${minWords} to ${maxWords} words in German. Situation: ${plan.scenario} Task: ${plan.outcome}`;
  }

  function writingGuideFor(plan, minWords, maxWords) {
    if (plan.level === "A0") return [
      "Choose at least three short lines taught in this lesson",
      "Keep one clear idea in each line",
      "Keep articles, spelling, and the du or Sie form attached to the phrase",
      "End with the answer, question, or request needed in the situation",
      `Write between ${minWords} and ${maxWords} words`
    ];
    if (plan.level === "A1") return [
      "Open with the reason for the message",
      "Add two concrete details from the situation",
      "Reuse at least three complete module phrases",
      "End with a question, request, or next step",
      `Write between ${minWords} and ${maxWords} words`
    ];
    return [
      "State the purpose and essential situation",
      "Give the details that affect the reader's decision",
      `Use at least three module bundles and check ${plan.focus.toLocaleLowerCase("en-US")}`,
      "End with a clear request, next step, or conclusion",
      `Keep the response between ${minWords} and ${maxWords} words`
    ];
  }

  function speakingPromptFor(plan) {
    if (plan.level === "A0") return `Say three or four short German lines for this situation: ${plan.scenario} Use the phrases from the lesson and finish with the needed answer or question.`;
    if (plan.level === "A1") return `Give a short spoken response in German. Situation: ${plan.scenario} State the purpose, add two details, and finish with a useful question or next step.`;
    return `Respond aloud in German. Situation: ${plan.scenario} Give the main point, useful supporting details, and a clear question, next step, or conclusion.`;
  }

  function speakingGuideFor(plan) {
    if (plan.level === "A0") return [
      "Begin with one complete taught line",
      "Add two short details",
      "Use the article and register shown in the lesson",
      "Finish with the needed answer or question"
    ];
    return [
      "Open with the main point",
      "Add supporting details in a useful order",
      "Use at least three module bundles",
      "Close with a question, next step, or conclusion"
    ];
  }

  function moduleFor(plan) {
    const core = normalizedPhrases(plan);
    const grammar = grammarFor(plan, core);
    const words = [...core, ...connectedCards(core)];
    const writing = modelFor(plan, core, false);
    const speaking = modelFor(plan, core, true);
    const [minimum, maximum] = levelTaskRanges[plan.level];
    const minWords = minimum;
    const maxWords = maximum;
    const requiredWordCount = { A0: 3, A1: 4, A2: 5, B1: 5, B2: 6 }[plan.level];
    const speakingWordCount = { A0: 3, A1: 3, A2: 4, B1: 4, B2: 5 }[plan.level];
    const requiredWords = writing.selected.filter(word => cueToken(word)).slice(0, requiredWordCount);
    const speakingRequiredWords = speaking.selected.filter(word => cueToken(word)).slice(0, speakingWordCount);
    const culture = cultureFor(plan, core);
    const source = culture.source || sourceByLevel[plan.level];
    const checks = taskChecks(plan, requiredWords, core, minWords, maxWords);
    const speakingMinimum = { A0: 8, A1: 15, A2: 22, B1: 32, B2: 42 }[plan.level];
    return {
      id: plan.id,
      level: plan.level,
      code: plan.code,
      title: plan.title,
      subtitle: plan.subtitle,
      canDo: [
        plan.outcome,
        plan.subtitle,
        ...pathwaySupport[plan.level]
      ],
      grammar,
      words,
      questions: questionsFor(plan, core),
      input: inputFor(plan, core),
      lesson: lessonFor(plan, core, grammar),
      task: {
        writingPrompt: writingPromptFor(plan, minWords, maxWords),
        minWords,
        maxWords,
        guide: writingGuideFor(plan, minWords, maxWords),
        required: requiredWords.map(cueToken),
        checks,
        model: writing.text,
        speakingPrompt: speakingPromptFor(plan),
        speakingGuide: speakingGuideFor(plan),
        speakingRequired: speakingRequiredWords.map(cueToken),
        speakingChecks: [
          { label: `Use at least ${speakingMinimum} words`, type: "minWords", value: speakingMinimum, essential: true },
          ...speakingRequiredWords.map(word => ({ label: `Complete the task with language for “${word.en}”`, type: "regex", pattern: patternFor(cueToken(word)), flags: "iu", essential: true })),
          { label: "Use a varied vocabulary", type: "lexicalDiversity", minRatio: .38, minDistinct: Math.max(8, Math.round(speakingMinimum * .55)), essential: true },
          { label: "Use German sentence words", type: "distinctRegexCount", pattern: "\\b(?:ich|du|er|sie|es|wir|ihr|Sie|der|die|das|den|dem|ein|eine|einen|einem|und|aber|weil|wenn|dass|ist|sind|hat|haben|wird|werden|kann|können|muss|müssen|soll|sollen|mit|für|auf|in|zu|von|bei|nach)\\b", flags: "giu", min: plan.level === "A0" ? 1 : plan.level === "A1" ? 3 : plan.level === "A2" ? 4 : 5, essential: true }
        ],
        speakingModel: speaking.text
      },
      culture: {
        title: culture.title,
        body: culture.body,
        sourceTitle: source.title,
        url: source.url,
        tags: [plan.level, plan.focus, "Sprachhandlung"]
      }
    };
  }

  const expectedPlans = { A0: 12, A1: 24, A2: 24, B1: 24, B2: 24 };
  Object.entries(expectedPlans).forEach(([level, expected]) => {
    const actual = plans.filter(plan => plan.level === level).length;
    if (actual !== expected) throw new Error(`${level} mastery expansion needs ${expected} plans, found ${actual}`);
  });

  const existingIds = new Set(course.modules.map(module => module.id));
  plans.forEach(plan => {
    if (existingIds.has(plan.id)) throw new Error(`Duplicate mastery module id: ${plan.id}`);
    existingIds.add(plan.id);
    course.modules.push(moduleFor(plan));
  });

  const referenceKey = value => clean(value).replace(/#.*$/u, "").replace(/\/+$/u, "");
  const creditedReferences = new Set(course.sources.map(source => referenceKey(source.url)));
  course.modules.forEach(module => {
    const culture = module.culture;
    if (!culture?.url) return;
    const key = referenceKey(culture.url);
    if (!key || creditedReferences.has(key)) return;
    creditedReferences.add(key);
    course.sources.push({
      category: "MODULE REFERENCE",
      title: culture.sourceTitle || `${module.code}: ${module.title}`,
      body: culture.body || `Reference used for the context note in ${module.code}, ${module.title}.`,
      url: culture.url
    });
  });
})();
