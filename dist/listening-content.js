(function () {
  const items = [
    {
      id: "lst-a0-001-first-meeting",
      moduleId: "a0-first-contact",
      level: "A0",
      title: "A first formal meeting",
      context: "Two people introduce themselves at the start of a German course.",
      goal: "Recognize a family name in a formal introduction.",
      turns: [
        { speaker: "Frau Roth", voice: "female", text: "Guten Tag. Ich heiße Nina Roth." },
        { speaker: "Herr Yilmaz", voice: "male", text: "Guten Tag, Frau Roth. Ich heiße Cem Yilmaz." },
        { speaker: "Frau Roth", voice: "female", text: "Wie geht es Ihnen?" },
        { speaker: "Herr Yilmaz", voice: "male", text: "Gut, danke. Und Ihnen?" },
        { speaker: "Frau Roth", voice: "female", text: "Auch gut, danke." }
      ],
      prompt: "What is the man's family name?",
      answers: ["Yilmaz", "Herr Yilmaz", "Cem Yilmaz"],
      evidence: "Ich heiße Cem Yilmaz.",
      culture: "The titles Herr and Frau are normally used with the family name in formal address.",
      source: { title: "Goethe-Institut: formal address with a surname", url: "https://lernplattform.goethe.de/pluginfile.php/1499547/mod_folder/content/0/DTonlineB1_GR-RM_Rueckschau_DE.pdf" }
    },
    {
      id: "lst-a0-002-spell-name",
      moduleId: "a0-numbers-spelling-forms",
      level: "A0",
      title: "Spelling the family name",
      context: "A receptionist records a visitor's name.",
      goal: "Understand a family name and a simple spelling question.",
      turns: [
        { speaker: "Frau Becker", voice: "female", text: "Guten Tag. Wie heißen Sie?" },
        { speaker: "Daniel Lee", voice: "male", text: "Ich heiße Daniel Lee." },
        { speaker: "Frau Becker", voice: "female", text: "Wie schreibt man Lee?" },
        { speaker: "Daniel Lee", voice: "male", text: "L, E, E." }
      ],
      prompt: "What is Daniel's family name?",
      answers: ["Lee", "L E E", "L, E, E"],
      evidence: "Ich heiße Daniel Lee."
    },
    {
      id: "lst-a0-003-bakery-price",
      moduleId: "a0-prices-amounts",
      level: "A0",
      title: "Checking the price",
      context: "A customer asks for the price before paying.",
      goal: "Recognize a familiar price question and its answer.",
      turns: [
        { speaker: "Nina", voice: "female", text: "Guten Tag. Wie viel kostet das?" },
        { speaker: "Herr Wagner", voice: "male", text: "Das kostet einen Euro zwanzig." },
        { speaker: "Nina", voice: "female", text: "Danke. Auf Wiedersehen." },
        { speaker: "Herr Wagner", voice: "male", text: "Auf Wiedersehen." }
      ],
      prompt: "How much does it cost?",
      answers: ["einen Euro zwanzig", "1,20 Euro", "1.20 euros", "one euro twenty"],
      evidence: "Das kostet einen Euro zwanzig.",
      culture: "German number and price formatting normally uses a decimal comma, such as 1,20 €.",
      source: { title: "Statistisches Bundesamt: decimal comma", url: "https://www.destatis.de/DE/Service/OpenData/Konjunkturindikatoren/hinweise-csv.html" }
    },
    {
      id: "lst-a0-004-bus-time",
      moduleId: "a0-time-date-schedule",
      level: "A0",
      title: "When the course begins",
      context: "A learner asks about the morning schedule.",
      goal: "Understand a simple schedule question and a clock time.",
      turns: [
        { speaker: "Frau Özdemir", voice: "female", text: "Entschuldigung, wann fängt der Kurs an?" },
        { speaker: "Herr Brandt", voice: "male", text: "Der Kurs fängt um acht Uhr an." },
        { speaker: "Frau Özdemir", voice: "female", text: "Danke." }
      ],
      prompt: "When does the course begin?",
      answers: ["um acht Uhr", "acht Uhr", "8:00", "at 8:00"],
      evidence: "Der Kurs fängt um acht Uhr an.",
      culture: "Written German schedules commonly use 24-hour time.",
      source: { title: "Goethe-Institut: German clock times", url: "https://lernen.goethe.de/deutschonline/A1/PDF/DE/deutschonline_Redemittel_und_Grammatik_4.pdf" }
    },
    {
      id: "lst-a1-001-museum-plan",
      moduleId: "a1-plans-and-leisure",
      level: "A1",
      title: "Saturday at the museum",
      context: "Two friends arrange a weekend activity.",
      goal: "Follow an invitation and identify the meeting place.",
      turns: [
        { speaker: "Lea", voice: "female", text: "Hallo, Jonas. Hast du am Samstag Zeit?" },
        { speaker: "Jonas", voice: "male", text: "Ja. Was möchtest du machen?" },
        { speaker: "Lea", voice: "female", text: "Gehen wir um drei ins Stadtmuseum?" },
        { speaker: "Jonas", voice: "male", text: "Gern. Treffen wir uns am Eingang?" }
      ],
      prompt: "Where will Lea and Jonas meet?",
      answers: ["am Eingang", "at the entrance", "beim Eingang", "museum entrance"],
      evidence: "Treffen wir uns am Eingang?"
    },
    {
      id: "lst-a1-002-vegetarian-order",
      moduleId: "a1-restaurant-needs-payment",
      level: "A1",
      title: "Vegetarian soup",
      context: "A guest checks an ingredient before ordering.",
      goal: "Understand a food question and the final order.",
      turns: [
        { speaker: "Frau Neumann", voice: "female", text: "Guten Abend. Was möchten Sie?" },
        { speaker: "Daniel", voice: "male", text: "Die Gemüsesuppe, bitte. Ist sie ohne Fleisch?" },
        { speaker: "Frau Neumann", voice: "female", text: "Ja, sie ist vegetarisch." },
        { speaker: "Daniel", voice: "male", text: "Gut. Dann nehme ich die Suppe und ein Mineralwasser." }
      ],
      prompt: "What does Daniel order?",
      answers: ["die Gemüsesuppe und ein Mineralwasser", "Gemüsesuppe und Mineralwasser", "vegetable soup and mineral water"],
      requirements: [
        { label: "the soup", patterns: ["Gem(?:ü|ue)sesuppe|Suppe|soup"] },
        { label: "the mineral water", patterns: ["Mineralwasser|mineral water"] }
      ],
      evidence: "Dann nehme ich die Suppe und ein Mineralwasser."
    },
    {
      id: "lst-a1-003-hotel-heating",
      moduleId: "a1-hotel-checkin-problems",
      level: "A1",
      title: "The cold hotel room",
      context: "A hotel guest reports a problem at reception.",
      goal: "Identify the room number and the reported problem.",
      turns: [
        { speaker: "Frau Kaya", voice: "female", text: "Guten Abend. Kann ich Ihnen helfen?" },
        { speaker: "Leon", voice: "male", text: "Ja. Die Heizung in Zimmer zwölf funktioniert nicht." },
        { speaker: "Frau Kaya", voice: "female", text: "Ich schicke sofort jemanden. Möchten Sie so lange ein anderes Zimmer?" },
        { speaker: "Leon", voice: "male", text: "Ja, bitte." }
      ],
      prompt: "What is wrong in room twelve?",
      answers: ["die Heizung funktioniert nicht", "the heating does not work", "the heater is broken"],
      requirements: [
        { label: "the heating does not work", patterns: ["Heizung.*(?:funktioniert nicht|kaputt)|(?:funktioniert nicht|kaputt).*Heizung|heating.*(?:does not work|broken)|heater.*(?:does not work|broken)|broken heater"] }
      ],
      evidence: "Die Heizung in Zimmer zwölf funktioniert nicht."
    },
    {
      id: "lst-a1-004-pharmacy-symptoms",
      moduleId: "a1-pharmacy-doctor-basics",
      level: "A1",
      title: "At the pharmacy",
      context: "A customer describes two common symptoms.",
      goal: "Recognize two symptoms and a negative answer.",
      turns: [
        { speaker: "Herr König", voice: "male", text: "Guten Tag. Was fehlt Ihnen?" },
        { speaker: "Aylin", voice: "female", text: "Ich habe seit gestern Halsschmerzen und Husten." },
        { speaker: "Herr König", voice: "male", text: "Haben Sie auch Fieber?" },
        { speaker: "Aylin", voice: "female", text: "Nein, kein Fieber." }
      ],
      prompt: "Which two symptoms does Aylin have?",
      answers: ["Halsschmerzen und Husten", "Husten und Halsschmerzen", "a sore throat and a cough", "sore throat and cough"],
      requirements: [
        { label: "the sore throat", patterns: ["Halsschmerzen|sore throat"] },
        { label: "the cough", patterns: ["Husten|cough"] }
      ],
      evidence: "Ich habe seit gestern Halsschmerzen und Husten.",
      culture: "Pharmacists can advise whether symptoms call for a doctor visit and which non-prescription medicine may help.",
      source: { title: "gesund.bund.de: pharmacy advice", url: "https://gesund.bund.de/apotheken" }
    },
    {
      id: "lst-a2-001-shift-swap",
      moduleId: "a2-work-schedules",
      level: "A2",
      title: "Trading shifts",
      context: "Two colleagues discuss changing their work schedule.",
      goal: "Understand a request, its condition, and the required approval.",
      turns: [
        { speaker: "Mia", voice: "female", text: "Leon, kannst du am Freitag meine Frühschicht übernehmen?" },
        { speaker: "Leon", voice: "male", text: "Ja, wenn du am Dienstag meine Spätschicht übernimmst." },
        { speaker: "Mia", voice: "female", text: "Das passt. Ich frage noch Frau Keller." },
        { speaker: "Leon", voice: "male", text: "Gut. Dann warten wir auf ihre Bestätigung." }
      ],
      prompt: "What must Mia do in exchange for Leon taking her Friday shift?",
      answers: ["am Dienstag seine Spätschicht übernehmen", "die Spätschicht am Dienstag übernehmen", "take Leon's Tuesday late shift", "work the late shift on Tuesday"],
      requirements: [
        { label: "Tuesday", patterns: ["Dienstag|Tuesday"] },
        { label: "the late shift", patterns: ["Spätschicht|Spaetschicht|late shift"] }
      ],
      evidence: "Ja, wenn du am Dienstag meine Spätschicht übernimmst.",
      culture: "Whether a shift swap needs approval depends on the workplace rules. Employers generally have a say in working-time assignments.",
      source: { title: "German law: employer's right to set working time", url: "https://www.gesetze-im-internet.de/gewo/__106.html" }
    },
    {
      id: "lst-a2-002-apartment-cost",
      moduleId: "a2-housing-search",
      level: "A2",
      title: "What the apartment costs",
      context: "An applicant asks about rent during an apartment viewing.",
      goal: "Combine cold rent and service charges and understand the deposit.",
      turns: [
        { speaker: "Herr Novak", voice: "male", text: "Die Wohnung hat zwei Zimmer. Die Kaltmiete beträgt achthundert Euro." },
        { speaker: "Sara Nguyen", voice: "female", text: "Wie hoch sind die Nebenkosten?" },
        { speaker: "Herr Novak", voice: "male", text: "Die Nebenkosten betragen zweihundert Euro. Die Kaution beträgt zwei Monatskaltmieten." },
        { speaker: "Sara Nguyen", voice: "female", text: "Und ab wann ist die Wohnung frei?" },
        { speaker: "Herr Novak", voice: "male", text: "Ab dem ersten Oktober." }
      ],
      prompt: "How much are the cold rent and service charges together each month?",
      answers: ["tausend Euro", "1000 Euro", "1.000 Euro", "one thousand euros", "€1000"],
      evidence: "Die Kaltmiete beträgt achthundert Euro. Die Nebenkosten betragen zweihundert Euro.",
      culture: "Kaltmiete is the base rent. Nebenkosten cover specified building costs. Electricity and internet may require separate contracts.",
      source: { title: "Make it in Germany: rent and moving-in costs", url: "https://www.make-it-in-germany.com/de/leben-in-deutschland/wohnen-mobilitaet/wohnen-anmelden" }
    },
    {
      id: "lst-a2-003-train-connection",
      moduleId: "a2-travel-disruptions",
      level: "A2",
      title: "A connection through Düsseldorf",
      context: "A passenger asks for a route after a train cancellation.",
      goal: "Follow a replacement route and identify the transfer point.",
      turns: [
        { speaker: "Marek", voice: "male", text: "Entschuldigung, der Zug nach Köln fällt aus. Wie komme ich jetzt dorthin?" },
        { speaker: "Frau Roth", voice: "female", text: "Fahren Sie um elf Uhr zwanzig nach Düsseldorf und steigen Sie dort um." },
        { speaker: "Marek", voice: "male", text: "Erreiche ich den Anschluss?" },
        { speaker: "Frau Roth", voice: "female", text: "Ja. Sie haben in Düsseldorf zwölf Minuten Zeit." }
      ],
      prompt: "Where must Marek change trains?",
      answers: ["in Düsseldorf", "Düsseldorf", "in Dusseldorf", "Dusseldorf"],
      evidence: "Fahren Sie um elf Uhr zwanzig nach Düsseldorf und steigen Sie dort um."
    },
    {
      id: "lst-a2-004-registration-documents",
      moduleId: "a2-public-appointments",
      level: "A2",
      title: "Documents for registration",
      context: "A resident asks which documents to bring to a registration appointment.",
      goal: "Extract two required documents and one unnecessary item.",
      turns: [
        { speaker: "Frau Yilmaz", voice: "female", text: "Ich habe morgen einen Termin für die Anmeldung. Welche Unterlagen brauche ich?" },
        { speaker: "Herr Vogt", voice: "male", text: "Bringen Sie bitte Ihren Pass und die Wohnungsgeberbestätigung mit." },
        { speaker: "Frau Yilmaz", voice: "female", text: "Brauche ich auch ein Foto?" },
        { speaker: "Herr Vogt", voice: "male", text: "Nein. Für die Anmeldung brauchen Sie kein Foto." }
      ],
      prompt: "Which two documents should Frau Yilmaz bring?",
      answers: ["Pass und Wohnungsgeberbestätigung", "den Pass und die Wohnungsgeberbestätigung", "passport and landlord confirmation", "passport and housing provider confirmation"],
      requirements: [
        { label: "the passport", patterns: ["Pass|passport"] },
        { label: "the housing provider confirmation", patterns: ["Wohnungsgeberbestätigung|Wohnungsgeberbestaetigung|landlord confirmation|housing provider confirmation"] }
      ],
      evidence: "Bringen Sie bitte Ihren Pass und die Wohnungsgeberbestätigung mit.",
      culture: "Registration requirements can vary by municipality. Check the official website for your city.",
      source: { title: "Bundesportal: register a residence", url: "https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99115005104000" }
    },
    {
      id: "lst-b1-001-heating-appointment",
      moduleId: "b1-housing-repairs",
      level: "B1",
      title: "A visit from the heating technician",
      context: "A tenant reports a heating problem and arranges access.",
      goal: "Track the affected room, availability, and repair window.",
      turns: [
        { speaker: "Sara Nguyen", voice: "female", text: "Seit Montag bleibt die Heizung im Wohnzimmer kalt." },
        { speaker: "Herr Weber", voice: "male", text: "Ist die Heizung in den anderen Zimmern warm?" },
        { speaker: "Sara Nguyen", voice: "female", text: "Ja. Nur im Wohnzimmer gibt es ein Problem. Ich bin morgen ab sechzehn Uhr zu Hause." },
        { speaker: "Herr Weber", voice: "male", text: "Der Techniker kann morgen zwischen siebzehn und neunzehn Uhr kommen." },
        { speaker: "Sara Nguyen", voice: "female", text: "Das passt. Bitte klingeln Sie bei Nguyen." }
      ],
      prompt: "When will the technician come?",
      answers: ["morgen zwischen siebzehn und neunzehn Uhr", "zwischen 17 und 19 Uhr", "tomorrow between 5 and 7 p.m.", "17:00 to 19:00 tomorrow"],
      requirements: [
        { label: "tomorrow", patterns: ["morgen|tomorrow"] },
        { label: "the full 17:00 to 19:00 window", patterns: ["(?:17|siebzehn|5)(?:[^\\p{L}\\p{N}]+| Uhr | p\\.?m\\.? ).*(?:19|neunzehn|7)|(?:5|17).*(?:7|19)"] }
      ],
      evidence: "Der Techniker kann morgen zwischen siebzehn und neunzehn Uhr kommen."
    },
    {
      id: "lst-b1-002-customer-service-priorities",
      moduleId: "b1-job-applications",
      level: "B1",
      title: "Priorities in customer service",
      context: "An interviewer asks how an applicant handles competing requests.",
      goal: "Understand a workplace strategy expressed as a sequence.",
      turns: [
        { speaker: "Frau König", voice: "female", text: "Sie haben bisher im Einzelhandel gearbeitet. Warum bewerben Sie sich bei uns im Kundenservice?" },
        { speaker: "Amir", voice: "male", text: "Ich berate gern und löse täglich Reklamationen. Jetzt möchte ich diese Erfahrung auch telefonisch und per E-Mail einsetzen." },
        { speaker: "Frau König", voice: "female", text: "Wie reagieren Sie, wenn zwei dringende Anfragen gleichzeitig kommen?" },
        { speaker: "Amir", voice: "male", text: "Ich kläre zuerst die Fristen, informiere beide Kunden und bearbeite dann die dringendere Anfrage." }
      ],
      prompt: "How does Amir decide which request to handle first?",
      answers: ["Er klärt die Fristen und bearbeitet die dringendere Anfrage zuerst.", "Er prüft die Fristen, informiert beide Kunden und nimmt die dringendere Anfrage zuerst.", "He checks the deadlines, informs both customers, and handles the more urgent request first.", "by checking the deadlines and prioritizing the more urgent request"],
      requirements: [
        { label: "checking the deadlines", patterns: ["Fristen|deadlines?"] },
        { label: "handling the more urgent request first", patterns: ["dringender|dringendere|urgent|prioriti[sz]"] }
      ],
      evidence: "Ich kläre zuerst die Fristen, informiere beide Kunden und bearbeite dann die dringendere Anfrage."
    },
    {
      id: "lst-b1-003-transit-rumor",
      moduleId: "b1-media-comparison",
      level: "B1",
      title: "What the transit notice really says",
      context: "Two people compare a group message with an official city notice.",
      goal: "Distinguish a broad rumor from the confirmed change.",
      turns: [
        { speaker: "Nina", voice: "female", text: "In einer Nachrichtengruppe steht, dass die Buslinie sechs nächste Woche ganz eingestellt wird." },
        { speaker: "Daniel", voice: "male", text: "Auf der Website der Stadt steht etwas anderes. Nur der Abschnitt zwischen Markt und Universität ist von Montag bis Mittwoch gesperrt." },
        { speaker: "Nina", voice: "female", text: "Dann fährt der Bus auf der restlichen Strecke weiter?" },
        { speaker: "Daniel", voice: "male", text: "Ja. Zwischen Markt und Universität gibt es Ersatzbusse." }
      ],
      prompt: "What part of the route is closed, and for how long?",
      answers: ["Der Abschnitt zwischen Markt und Universität ist von Montag bis Mittwoch gesperrt.", "zwischen Markt und Universität, Montag bis Mittwoch", "the section between Markt and Universität from Monday through Wednesday", "Markt to Universität, Monday to Wednesday"],
      requirements: [
        { label: "the section between Markt and Universität", patterns: ["Markt.*Universität|Universität.*Markt|Markt.*Universitaet|Universitaet.*Markt"] },
        { label: "Monday through Wednesday", patterns: ["Montag.*Mittwoch|Monday.*Wednesday"] }
      ],
      evidence: "Nur der Abschnitt zwischen Markt und Universität ist von Montag bis Mittwoch gesperrt.",
      tip: "For current service changes, check the website or app of the operator named on your ticket or stop."
    },
    {
      id: "lst-b1-004-knee-pain",
      moduleId: "b1-healthcare-decisions",
      level: "B1",
      title: "When knee pain needs urgent attention",
      context: "A patient describes knee pain during a medical appointment.",
      goal: "Follow symptom details and understand two warning signs.",
      turns: [
        { speaker: "Cem", voice: "male", text: "Die Schmerzen im Knie sind seit drei Tagen stärker, besonders beim Treppensteigen." },
        { speaker: "Dr. Roth", voice: "female", text: "Ist das Knie geschwollen, oder können Sie kaum auftreten?" },
        { speaker: "Cem", voice: "male", text: "Es ist leicht geschwollen, aber ich kann noch gehen." },
        { speaker: "Dr. Roth", voice: "female", text: "Dann untersuche ich es heute. Falls Sie plötzlich starke Schmerzen bekommen oder gar nicht mehr auftreten können, melden Sie sich sofort." }
      ],
      prompt: "In which two situations should Cem seek help immediately?",
      answers: ["bei plötzlich starken Schmerzen oder wenn er gar nicht mehr auftreten kann", "if the pain suddenly becomes severe or he cannot put weight on the leg", "sudden severe pain or being unable to walk", "starke Schmerzen oder nicht mehr auftreten können"],
      requirements: [
        { label: "sudden severe pain", patterns: ["starke Schmerzen|severe pain"] },
        { label: "being unable to put weight on the leg", patterns: ["nicht mehr auftreten|gar nicht.*auftreten|cannot put weight|unable to walk"] }
      ],
      evidence: "Falls Sie plötzlich starke Schmerzen bekommen oder gar nicht mehr auftreten können, melden Sie sich sofort."
    },
    {
      id: "lst-b2-001-service-hours-pilot",
      moduleId: "b2-verhandlungen",
      level: "B2",
      title: "Conditions for the pilot",
      context: "A team discusses a trial of longer customer service hours.",
      goal: "Identify a proposal, two conditions, and an evaluation point.",
      turns: [
        { speaker: "Frau Aydin", voice: "female", text: "Ich schlage eine dreimonatige Pilotphase mit verlängerten Servicezeiten an zwei Abenden pro Woche vor." },
        { speaker: "Herr Vogt", voice: "male", text: "Ich stimme zu, sofern die Übergabe schriftlich geregelt wird und der Betriebsrat die Dienstpläne vorher prüft." },
        { speaker: "Frau Aydin", voice: "female", text: "Dann halten wir beide Bedingungen und eine erste Auswertung nach sechs Wochen fest." },
        { speaker: "Herr Vogt", voice: "male", text: "Damit bin ich einverstanden." }
      ],
      prompt: "Under which two conditions does Herr Vogt support the pilot?",
      answers: ["Die Übergabe muss schriftlich geregelt werden, und der Betriebsrat muss die Dienstpläne vorher prüfen.", "schriftliche Übergaberegelung und vorherige Prüfung der Dienstpläne durch den Betriebsrat", "a written handover procedure and prior review of the schedules by the works council", "written handover rules and works council review"],
      requirements: [
        { label: "a written handover procedure", patterns: ["(?:schriftlich.*(?:Übergabe|Uebergabe)|(?:Übergabe|Uebergabe).*schriftlich|written.*handover|handover.*written)"] },
        { label: "advance schedule review by the works council", patterns: ["(?:Betriebsrat.*(?:Dienstplän|Dienstplaen|prüf|pruef)|(?:Dienstplän|Dienstplaen|prüf|pruef).*Betriebsrat|works council.*(?:schedule|review)|(?:schedule|review).*works council)"] }
      ],
      evidence: "Sofern die Übergabe schriftlich geregelt wird und der Betriebsrat die Dienstpläne vorher prüft.",
      culture: "A works council, or Betriebsrat, represents employees in a workplace. Its precise participation rights depend on the issue.",
      source: { title: "Federal Ministry of Labour and Social Affairs: workplace co-determination", url: "https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Arbeitnehmerrechte/Betriebliche-Mitbestimmung/betriebliche-mitbestimmung.html" }
    },
    {
      id: "lst-b2-002-parking-appeal",
      moduleId: "b2-behoerdenpost",
      level: "B2",
      title: "Evidence for an appeal",
      context: "A resident calls about a rejected parking permit.",
      goal: "Track the stated reason, supporting evidence, and next procedural step.",
      turns: [
        { speaker: "Frau Hansen", voice: "female", text: "Ich rufe wegen meines abgelehnten Antrags auf einen Bewohnerparkausweis an. Im Bescheid steht, mein Mietvertrag fehle." },
        { speaker: "Herr Brandt", voice: "male", text: "Haben Sie einen Nachweis, dass Sie ihn eingereicht haben?" },
        { speaker: "Frau Hansen", voice: "female", text: "Ja. Ich habe die Eingangsbestätigung vom zwölften Februar mit der Vorgangsnummer P, Bindestrich, acht acht vier eins." },
        { speaker: "Herr Brandt", voice: "male", text: "Dann legen Sie die Bestätigung Ihrem Widerspruch bei und senden Sie den Mietvertrag vorsichtshalber noch einmal." },
        { speaker: "Frau Hansen", voice: "female", text: "Gut. Ich bitte außerdem um eine schriftliche Bestätigung des Eingangs." }
      ],
      prompt: "Which document proves the earlier submission, and what should Frau Hansen do with it?",
      answers: ["Die Eingangsbestätigung vom 12. Februar. Sie soll sie dem Widerspruch beilegen.", "Eingangsbestätigung P-8841 beilegen", "attach the February 12 submission confirmation to the appeal", "the receipt confirmation, which she should include with the appeal"],
      requirements: [
        { label: "the submission confirmation", patterns: ["Eingangsbestätigung|Eingangsbestaetigung|submission confirmation|receipt confirmation"] },
        { label: "attaching it to the appeal", patterns: ["(?:Widerspruch.*(?:beileg|anhäng|anhaeng)|(?:beileg|anhäng|anhaeng).*Widerspruch|leg\\w*.*Widerspruch.*bei|(?:häng|haeng)\\w*.*Widerspruch.*an|appeal.*(?:attach|include)|(?:attach|include).*appeal)"] }
      ],
      evidence: "Ich habe die Eingangsbestätigung vom zwölften Februar mit der Vorgangsnummer P-8841. Dann legen Sie die Bestätigung Ihrem Widerspruch bei und senden Sie den Mietvertrag vorsichtshalber noch einmal.",
      culture: "A contestable written or electronic Bescheid includes a Rechtsbehelfsbelehrung naming the remedy, where to file it, and the deadline. Read it carefully.",
      source: { title: "German administrative law: Rechtsbehelfsbelehrung", url: "https://www.gesetze-im-internet.de/vwvfg/__37.html" }
    },
    {
      id: "lst-b2-003-study-limits",
      moduleId: "b2-praesentieren",
      level: "B2",
      title: "Limits of the pilot study",
      context: "An audience member questions how broadly a study result can be applied.",
      goal: "Understand a statistical claim and two limits on its interpretation.",
      turns: [
        { speaker: "Dr. Keller", voice: "female", text: "Unsere Auswertung der Testphase zeigt, dass die neue App die durchschnittliche Bearbeitungszeit um zwölf Prozent verkürzt hat." },
        { speaker: "Herr Stein", voice: "male", text: "Gilt das Ergebnis für alle Abteilungen?" },
        { speaker: "Dr. Keller", voice: "female", text: "Das lässt sich noch nicht sagen. An der Testphase nahmen nur drei von acht Abteilungen teil. Die Testphase dauerte außerdem nur sechs Wochen." },
        { speaker: "Herr Stein", voice: "male", text: "Dann sollten wir die Aussage auf diese Testgruppe begrenzen." },
        { speaker: "Dr. Keller", voice: "female", text: "Ja. Für eine allgemeine Bewertung brauchen wir eine längere Untersuchung mit allen Abteilungen." }
      ],
      prompt: "Which two features of the test limit the general claim?",
      answers: ["Nur drei von acht Abteilungen nahmen teil, und der Test dauerte nur sechs Wochen.", "three of eight departments and a six-week test period", "only three departments participated and the trial lasted six weeks", "begrenzte Abteilungsabdeckung und kurze Testdauer"],
      requirements: [
        { label: "only three of eight departments", patterns: ["drei.*acht|three.*eight|drei Abteilungen|three departments|kleine Testgruppe|small test group"] },
        { label: "a six-week test", patterns: ["sechs Wochen|six weeks|kurze Testdauer|short test"] }
      ],
      evidence: "An der Testphase nahmen nur drei von acht Abteilungen teil. Die Testphase dauerte außerdem nur sechs Wochen.",
      tip: "Separate results from the test group from conclusions about a wider organization."
    },
    {
      id: "lst-b2-004-courtyard-mediation",
      moduleId: "b2-mediation-konflikt",
      level: "B2",
      title: "Quiet evenings in the courtyard",
      context: "A resident and a music group representative agree on a trial arrangement.",
      goal: "Synthesize concerns, concessions, timing, and the review plan.",
      turns: [
        { speaker: "Frau Lorenz", voice: "female", text: "Vor allem die Gespräche im Hof nach einundzwanzig Uhr stören mich. Die Musik selbst endet meistens pünktlich." },
        { speaker: "Herr Braun", voice: "male", text: "Wir können den Haupteingang benutzen und jede Probe um zwanzig Uhr fünfundvierzig beenden." },
        { speaker: "Frau Lorenz", voice: "female", text: "Dann testen wir diese Regelung acht Wochen lang. Die Termine sollten zwei Wochen vorher veröffentlicht werden." },
        { speaker: "Herr Braun", voice: "male", text: "Einverstanden. Nach vier Wochen ziehen wir gemeinsam Bilanz." }
      ],
      prompt: "Summarize the practical terms of the eight-week trial.",
      answers: ["Die Gruppe beendet die Proben um 20.45 Uhr, benutzt den Haupteingang, veröffentlicht Termine zwei Wochen vorher und zieht nach vier Wochen Bilanz.", "Ende um 20.45 Uhr, Haupteingang, Termine zwei Wochen im Voraus, Auswertung nach vier Wochen", "The group finishes at 8:45 p.m., uses the main entrance, publishes dates two weeks ahead, and reviews the trial after four weeks.", "finish at 20:45, use the main entrance, give two weeks' notice, review after four weeks"],
      requirements: [
        { label: "finishing at 20:45", patterns: ["20[.:]45|zwanzig Uhr fünfundvierzig|8:45"] },
        { label: "using the main entrance", patterns: ["Haupteingang|main entrance"] },
        { label: "publishing dates two weeks ahead", patterns: ["zwei Wochen|two weeks"] },
        { label: "reviewing the trial after four weeks", patterns: ["vier Wochen|four weeks"] }
      ],
      evidence: "Wir können den Haupteingang benutzen und jede Probe um zwanzig Uhr fünfundvierzig beenden. Die Termine sollten zwei Wochen vorher veröffentlicht werden. Nach vier Wochen ziehen wir gemeinsam Bilanz.",
      tip: "A time-limited agreement with a scheduled review gives both sides a clear point for changes."
    },
    {
      id: "lst-a0-005-personal-details",
      moduleId: "a0-personal-details",
      level: "A0",
      title: "Name and hometown",
      context: "Two learners exchange a few personal details before class.",
      goal: "Recognize a first name and a hometown.",
      turns: [
        { speaker: "Nina", voice: "female", text: "Hallo. Ich bin Nina. Wie heißt du?" },
        { speaker: "Sam", voice: "male", text: "Ich heiße Sam." },
        { speaker: "Nina", voice: "female", text: "Woher kommst du?" },
        { speaker: "Sam", voice: "male", text: "Ich komme aus Chicago. Und du?" },
        { speaker: "Nina", voice: "female", text: "Ich komme aus Bonn." }
      ],
      prompt: "What is the man's name, and where does he come from?",
      answers: ["Sam, aus Chicago", "Sam kommt aus Chicago", "His name is Sam and he comes from Chicago", "Sam from Chicago"],
      requirements: [
        { label: "the name Sam", patterns: ["Sam"] },
        { label: "Chicago", patterns: ["Chicago"] }
      ],
      evidence: "Ich heiße Sam. Ich komme aus Chicago."
    },
    {
      id: "lst-a0-006-everyday-things",
      moduleId: "a0-everyday-things",
      level: "A0",
      title: "Things for the lesson",
      context: "A teacher checks which classroom objects a learner has.",
      goal: "Recognize which classroom object a learner still needs.",
      turns: [
        { speaker: "Frau Roth", voice: "female", text: "Hast du ein Buch?" },
        { speaker: "Daniel", voice: "male", text: "Ja, hier ist das Buch." },
        { speaker: "Frau Roth", voice: "female", text: "Und hast du einen Stift?" },
        { speaker: "Daniel", voice: "male", text: "Nein. Ich brauche einen Stift." }
      ],
      prompt: "Which object does Daniel need?",
      answers: ["einen Stift", "Stift", "a pen", "pen"],
      evidence: "Ich brauche einen Stift."
    },
    {
      id: "lst-a0-007-conversation-repair",
      moduleId: "a0-conversation-repair",
      level: "A0",
      title: "Please say that again",
      context: "A learner asks the teacher to repeat a room number.",
      goal: "Recognize a request for repetition and the corrected number.",
      turns: [
        { speaker: "Frau Becker", voice: "female", text: "Der Kurs ist in Raum vierzehn." },
        { speaker: "Amir", voice: "male", text: "Entschuldigung. Noch einmal, bitte." },
        { speaker: "Frau Becker", voice: "female", text: "Raum vierzehn." },
        { speaker: "Amir", voice: "male", text: "Vierzehn?" },
        { speaker: "Frau Becker", voice: "female", text: "Ja, richtig." }
      ],
      prompt: "Which room is the course in?",
      answers: ["Raum vierzehn", "vierzehn", "room 14", "14"],
      evidence: "Der Kurs ist in Raum vierzehn."
    },
    {
      id: "lst-a0-008-follow-lesson",
      moduleId: "a0-follow-lesson",
      level: "A0",
      title: "Open the book",
      context: "A teacher gives two short instructions. Before you listen, Seite means page and Aufgabe means exercise.",
      goal: "Follow a page number and a classroom action.",
      turns: [
        { speaker: "Frau Keller", voice: "female", text: "Öffnen Sie bitte das Buch." },
        { speaker: "Leon", voice: "male", text: "Welche Seite?" },
        { speaker: "Frau Keller", voice: "female", text: "Seite acht. Lesen Sie Aufgabe zwei." },
        { speaker: "Leon", voice: "male", text: "Seite acht, Aufgabe zwei. Danke." }
      ],
      prompt: "Which page and exercise should Leon use?",
      answers: ["Seite acht, Aufgabe zwei", "page 8, exercise 2", "8 and 2", "Seite 8 Aufgabe 2"],
      requirements: [
        { label: "page eight", patterns: ["Seite (?:acht|8)|page (?:eight|8)|(?:^|\\D)8(?:\\D|$)"] },
        { label: "exercise two", patterns: ["Aufgabe (?:zwei|2)|exercise (?:two|2)|(?:^|\\D)2(?:\\D|$)"] }
      ],
      evidence: "Seite acht. Lesen Sie Aufgabe zwei.",
      tip: "Listen for the noun before each number. Seite identifies the page, and Aufgabe identifies the exercise."
    },
    {
      id: "lst-a1-005-food-shopping",
      moduleId: "a1-food-shopping",
      level: "A1",
      title: "At the fruit stand",
      context: "A customer buys fruit and checks the total. Before you listen, Birnen means pears.",
      goal: "Understand two quantities and identify the foods in an order.",
      turns: [
        { speaker: "Frau Wagner", voice: "female", text: "Guten Morgen. Was darf es sein?" },
        { speaker: "Jonas", voice: "male", text: "Ein Kilo Äpfel und drei Birnen, bitte." },
        { speaker: "Frau Wagner", voice: "female", text: "Sonst noch etwas?" },
        { speaker: "Jonas", voice: "male", text: "Nein, danke. Was kostet das zusammen?" },
        { speaker: "Frau Wagner", voice: "female", text: "Fünf Euro achtzig, bitte." }
      ],
      prompt: "What does Jonas buy?",
      answers: ["ein Kilo Äpfel und drei Birnen", "Äpfel und Birnen", "one kilo of apples and three pears", "apples and pears"],
      requirements: [
        { label: "one kilo of apples", patterns: ["(?:ein Kilo )?(?:Äpfel|Aepfel)|(?:one kilo of )?apples"] },
        { label: "three pears", patterns: ["(?:drei )?Birnen|(?:three )?pears"] }
      ],
      evidence: "Ein Kilo Äpfel und drei Birnen, bitte.",
      tip: "Quantity words come directly before the food. Listen for ein Kilo and drei."
    },
    {
      id: "lst-a1-006-platform-change",
      moduleId: "a1-public-transport-tickets",
      level: "A1",
      title: "The train leaves from another platform",
      context: "A traveler checks a station announcement with another passenger.",
      goal: "Identify the new platform and departure time.",
      turns: [
        { speaker: "Frau Nguyen", voice: "female", text: "Entschuldigung, fährt der Zug nach Bonn von Gleis drei?" },
        { speaker: "Herr Braun", voice: "male", text: "Nein. Der Zug fährt heute von Gleis sieben." },
        { speaker: "Frau Nguyen", voice: "female", text: "Und wann fährt er ab?" },
        { speaker: "Herr Braun", voice: "male", text: "Um vierzehn Uhr zehn. Sie haben noch zehn Minuten." },
        { speaker: "Frau Nguyen", voice: "female", text: "Danke für die Hilfe." }
      ],
      prompt: "From which platform does the train leave, and at what time?",
      answers: ["Gleis sieben, um vierzehn Uhr zehn", "platform 7 at 14:10", "Gleis 7 um 14.10 Uhr", "7, 14:10"],
      requirements: [
        { label: "platform seven", patterns: ["Gleis (?:sieben|7)|platform (?:seven|7)|(?:^|\\D)7(?:\\D|$)"] },
        { label: "14:10", patterns: ["14[.:]10|vierzehn Uhr zehn|2:10\\s*p\\.?m\\.?"] }
      ],
      evidence: "Der Zug fährt heute von Gleis sieben. Um vierzehn Uhr zehn.",
      tip: "The first platform appears in the question. The correction after Nein gives the departure platform."
    },
    {
      id: "lst-a1-007-phone-message",
      moduleId: "a1-phone-calls",
      level: "A1",
      title: "A message for the doctor",
      context: "A patient leaves a short message with a medical receptionist.",
      goal: "Understand a callback request in a phone message.",
      turns: [
        { speaker: "Frau Stein", voice: "female", text: "Praxis Doktor Weber, guten Tag." },
        { speaker: "Marek", voice: "male", text: "Guten Tag. Hier ist Marek Nowak. Kann Frau Doktor Weber mich bitte zurückrufen?" },
        { speaker: "Frau Stein", voice: "female", text: "Ja. Wie ist Ihre Telefonnummer?" },
        { speaker: "Marek", voice: "male", text: "Null eins sieben sechs, vier zwei acht, neun fünf drei." },
        { speaker: "Frau Stein", voice: "female", text: "Danke. Ich gebe die Nachricht weiter." }
      ],
      prompt: "What does Marek ask the doctor to do?",
      answers: ["ihn zurückrufen", "Marek zurückrufen", "call him back", "return his call"],
      evidence: "Kann Frau Doktor Weber mich bitte zurückrufen?"
    },
    {
      id: "lst-a1-008-visiting-hosting",
      moduleId: "a1-visiting-hosting",
      level: "A1",
      title: "Tea at a friend's home",
      context: "A guest arrives and accepts one drink.",
      goal: "Follow a welcome and identify the chosen drink.",
      turns: [
        { speaker: "Aylin", voice: "female", text: "Hallo, Daniel. Komm rein. Schön, dass du da bist." },
        { speaker: "Daniel", voice: "male", text: "Danke für die Einladung." },
        { speaker: "Aylin", voice: "female", text: "Möchtest du Kaffee oder Tee?" },
        { speaker: "Daniel", voice: "male", text: "Tee, bitte. Kaffee trinke ich am Abend lieber nicht." },
        { speaker: "Aylin", voice: "female", text: "Gern. Der Tee ist gleich fertig." }
      ],
      prompt: "Which drink does Daniel choose?",
      answers: ["Tee", "tea", "einen Tee"],
      evidence: "Tee, bitte."
    },
    {
      id: "lst-a2-005-weekend-experience",
      moduleId: "a2-erlebnisse",
      level: "A2",
      title: "A wet weekend trip",
      context: "Two friends talk about a trip that changed because of the weather.",
      goal: "Follow past events and identify the replacement activity.",
      turns: [
        { speaker: "Lea", voice: "female", text: "Wie war dein Wochenende in Hamburg?" },
        { speaker: "Jonas", voice: "male", text: "Interessant, aber sehr nass. Am Samstag hat es den ganzen Tag geregnet." },
        { speaker: "Lea", voice: "female", text: "Seid ihr trotzdem am Hafen spazieren gegangen?" },
        { speaker: "Jonas", voice: "male", text: "Nein. Wir haben stattdessen das Maritime Museum besucht." },
        { speaker: "Lea", voice: "female", text: "Hat es euch gefallen?" },
        { speaker: "Jonas", voice: "male", text: "Ja. Wir sind fast vier Stunden dort geblieben." }
      ],
      prompt: "What did Jonas and his companions do instead of walking by the harbor?",
      answers: ["das Maritime Museum besucht", "sie besuchten das Maritime Museum", "visited the Maritime Museum", "went to the Maritime Museum"],
      evidence: "Wir haben stattdessen das Maritime Museum besucht."
    },
    {
      id: "lst-a2-006-market-substitution",
      moduleId: "a2-market-checkout",
      level: "A2",
      title: "A different kind of cheese",
      context: "A market seller offers an alternative when one product is sold out.",
      goal: "Understand the missing product and the accepted substitute.",
      turns: [
        { speaker: "Frau Yilmaz", voice: "female", text: "Ich hätte gern zweihundert Gramm jungen Gouda." },
        { speaker: "Herr König", voice: "male", text: "Der junge Gouda ist leider ausverkauft. Wir haben noch mittelalten Gouda." },
        { speaker: "Frau Yilmaz", voice: "female", text: "Ist er viel kräftiger?" },
        { speaker: "Herr König", voice: "male", text: "Ein wenig. Sie können ihn gern probieren." },
        { speaker: "Frau Yilmaz", voice: "female", text: "Der schmeckt gut. Dann nehme ich davon zweihundert Gramm." }
      ],
      prompt: "Which cheese does Frau Yilmaz buy in the end?",
      answers: ["mittelalten Gouda", "mittelalter Gouda", "the medium-aged Gouda", "medium-aged Gouda"],
      evidence: "Wir haben noch mittelalten Gouda. Dann nehme ich davon zweihundert Gramm."
    },
    {
      id: "lst-a2-007-router-support",
      moduleId: "a2-phone-internet-support",
      level: "A2",
      title: "Restarting the router",
      context: "A support agent guides a customer through a short restart sequence.",
      goal: "Follow the sequence and identify the wait time.",
      turns: [
        { speaker: "Frau Sommer", voice: "female", text: "Seit heute Morgen habe ich kein Internet." },
        { speaker: "Herr Vogt", voice: "male", text: "Leuchtet am Router eine rote Lampe?" },
        { speaker: "Frau Sommer", voice: "female", text: "Ja, die Lampe blinkt rot." },
        { speaker: "Herr Vogt", voice: "male", text: "Ziehen Sie bitte den Stecker, warten Sie dreißig Sekunden und stecken Sie ihn wieder ein." },
        { speaker: "Frau Sommer", voice: "female", text: "Jetzt leuchtet die Lampe grün. Das Internet funktioniert wieder." },
        { speaker: "Herr Vogt", voice: "male", text: "Sehr gut. Dann ist kein Technikertermin nötig." }
      ],
      prompt: "What must Frau Sommer do before plugging the router back in?",
      answers: ["dreißig Sekunden warten", "30 Sekunden warten", "wait thirty seconds", "wait 30 seconds"],
      evidence: "Ziehen Sie bitte den Stecker, warten Sie dreißig Sekunden und stecken Sie ihn wieder ein."
    },
    {
      id: "lst-a2-008-weather-plan",
      moduleId: "a2-weather-plan",
      level: "A2",
      title: "Changing the picnic plan",
      context: "Two friends adjust their Sunday plans after checking the forecast.",
      goal: "Understand a weather condition and the new meeting plan.",
      turns: [
        { speaker: "Mia", voice: "female", text: "Für Sonntag ist starker Regen angekündigt. Sollen wir das Picknick verschieben?" },
        { speaker: "Leon", voice: "male", text: "Nächste Woche kann ich leider nicht. Wir könnten uns im Café am Park treffen." },
        { speaker: "Mia", voice: "female", text: "Gute Idee. Bleibt es bei zwölf Uhr?" },
        { speaker: "Leon", voice: "male", text: "Lieber um dreizehn Uhr. Das Café öffnet erst um halb eins." },
        { speaker: "Mia", voice: "female", text: "Einverstanden. Dann treffen wir uns um dreizehn Uhr im Café." }
      ],
      prompt: "Where and when will Mia and Leon meet?",
      answers: ["um dreizehn Uhr im Café am Park", "at the cafe by the park at 1 p.m.", "Café am Park, 13 Uhr", "13:00 im Café"],
      requirements: [
        { label: "the cafe", patterns: ["Caf(?:é|e)|cafe"] },
        { label: "13:00", patterns: ["13(?::00)?|dreizehn Uhr|1 p\.?m\.?|one p\.?m\."] }
      ],
      evidence: "Dann treffen wir uns um dreizehn Uhr im Café."
    },
    {
      id: "lst-b1-005-cultural-review",
      moduleId: "b1-cultural-review",
      level: "B1",
      title: "After the open-air concert",
      context: "Two friends compare their impressions of a concert.",
      goal: "Follow contrasting reactions and identify Daniel's preference for next time.",
      turns: [
        { speaker: "Aylin", voice: "female", text: "Wie hat dir das Konzert gestern gefallen?" },
        { speaker: "Daniel", voice: "male", text: "Die Band war großartig. Besonders die ruhigeren Stücke haben mich überrascht." },
        { speaker: "Aylin", voice: "female", text: "Ich fand die Musik auch gut, aber der Ton war am Anfang viel zu laut." },
        { speaker: "Daniel", voice: "male", text: "Das stimmt. Nach dem dritten Lied wurde es besser." },
        { speaker: "Aylin", voice: "female", text: "Außerdem mussten wir fast eine Stunde am Eingang warten." },
        { speaker: "Daniel", voice: "male", text: "Trotzdem würde ich die Band noch einmal sehen. Beim nächsten Mal lieber in einer kleineren Halle." }
      ],
      prompt: "What does Daniel want to change if he sees the band again?",
      answers: ["Er möchte sie in einer kleineren Halle sehen.", "eine kleinere Halle", "see them in a smaller venue", "a smaller venue"],
      evidence: "Beim nächsten Mal lieber in einer kleineren Halle.",
      tip: "Listen for the final concession after trotzdem."
    },
    {
      id: "lst-b1-006-digital-privacy",
      moduleId: "b1-digital-privacy",
      level: "B1",
      title: "A suspicious account message",
      context: "A colleague asks for help after receiving a message about an account.",
      goal: "Follow security advice and identify the safest next steps.",
      turns: [
        { speaker: "Sara", voice: "female", text: "Ich habe eine Nachricht bekommen, dass mein Konto heute gesperrt wird. Ich soll sofort auf einen Link klicken." },
        { speaker: "Marek", voice: "male", text: "Klick den Link nicht an. Kennst du die Absenderadresse?" },
        { speaker: "Sara", voice: "female", text: "Nein. Die Adresse sieht fast richtig aus, aber ein Buchstabe fehlt." },
        { speaker: "Marek", voice: "male", text: "Dann melde dich direkt über die offizielle Webseite an. Dort kannst du prüfen, ob wirklich eine Warnung vorliegt." },
        { speaker: "Sara", voice: "female", text: "Auf der Webseite steht nichts. Soll ich die Nachricht löschen?" },
        { speaker: "Marek", voice: "male", text: "Melde sie zuerst als Betrugsversuch und lösche sie anschließend." }
      ],
      prompt: "Which two actions should Sara take with the suspicious message?",
      answers: ["als Betrugsversuch melden und anschließend löschen", "report it as fraud and then delete it", "melden und löschen", "report and delete it"],
      requirements: [
        { label: "reporting the message", patterns: ["meld|report"] },
        { label: "deleting the message", patterns: ["lösch|loesch|delet"] }
      ],
      evidence: "Melde sie zuerst als Betrugsversuch und lösche sie anschließend."
    },
    {
      id: "lst-b1-007-constructive-feedback",
      moduleId: "b1-constructive-feedback",
      level: "B1",
      title: "Clearer weekly reports",
      context: "A team lead gives specific feedback and agrees on support.",
      goal: "Separate the problem, its effect, and the agreed solution.",
      turns: [
        { speaker: "Frau Keller", voice: "female", text: "Deine Berichte enthalten alle wichtigen Zahlen. Mir fehlt jedoch oft eine kurze Erklärung der Abweichungen." },
        { speaker: "Jonas", voice: "male", text: "Ich dachte, die Tabelle wäre selbsterklärend. Welche Angaben brauchst du zusätzlich?" },
        { speaker: "Frau Keller", voice: "female", text: "Bitte nenne bei größeren Änderungen jeweils den Grund und die erwartete Folge. Dann kann das Team schneller entscheiden." },
        { speaker: "Jonas", voice: "male", text: "Verstanden. Für den nächsten Bericht ergänze ich unter jeder Abweichung zwei kurze Sätze." },
        { speaker: "Frau Keller", voice: "female", text: "Gut. Ich schicke dir heute ein Beispiel. Am Freitag sehen wir uns den neuen Bericht gemeinsam an." },
        { speaker: "Jonas", voice: "male", text: "Das hilft mir. Danke für die konkrete Rückmeldung." }
      ],
      prompt: "What will Jonas add to the next report, and how will Frau Keller support him?",
      answers: ["Er ergänzt Gründe und erwartete Folgen. Frau Keller schickt ein Beispiel.", "two explanatory sentences for each deviation, and she will send an example", "Gründe und Folgen; ein Beispiel", "reasons and expected effects plus an example from Frau Keller"],
      requirements: [
        { label: "reasons and expected effects", patterns: ["Gr(?:u|ü|ue)nd.*(?:Folge|Auswirkung)|(?:Folge|Auswirkung).*Gr(?:u|ü|ue)nd|reason.*(?:effect|consequence)|(?:effect|consequence).*reason|zwei (?:kurze )?Sätze.*Abweich|two (?:short |explanatory )*(?:sentences|explanations).*deviation"] },
        { label: "an example from Frau Keller", patterns: ["Beispiel|example"] }
      ],
      evidence: "Bitte nenne bei größeren Änderungen jeweils den Grund und die erwartete Folge. Ich schicke dir heute ein Beispiel.",
      tip: "Separate the two speakers' commitments. Jonas adds reasons and effects. Frau Keller sends an example."
    },
    {
      id: "lst-b1-008-mental-health-support",
      moduleId: "b1-mental-health-support",
      level: "B1",
      title: "Asking for support",
      context: "A student describes ongoing stress and arranges a first appointment.",
      goal: "Understand the duration and impact of Amir's difficulties.",
      turns: [
        { speaker: "Frau Sommer", voice: "female", text: "Beratungsstelle der Hochschule, guten Tag. Wie kann ich Ihnen helfen?" },
        { speaker: "Amir", voice: "male", text: "Ich schlafe seit mehreren Wochen schlecht und kann mich im Studium kaum konzentrieren." },
        { speaker: "Frau Sommer", voice: "female", text: "Das klingt belastend. Möchten Sie einen Termin für ein vertrauliches Erstgespräch?" },
        { speaker: "Amir", voice: "male", text: "Ja, gern. Ich habe am Mittwochvormittag Zeit." },
        { speaker: "Frau Sommer", voice: "female", text: "Am Mittwoch ist um zehn Uhr ein Termin frei. Das Gespräch dauert ungefähr fünfzig Minuten." },
        { speaker: "Amir", voice: "male", text: "Der Termin passt. Vielen Dank." }
      ],
      prompt: "What problems has Amir had, and for how long?",
      answers: ["Seit mehreren Wochen schläft er schlecht und kann sich kaum konzentrieren.", "poor sleep and difficulty concentrating for several weeks", "Schlafprobleme und Konzentrationsprobleme seit mehreren Wochen", "several weeks of poor sleep and concentration"],
      requirements: [
        { label: "poor sleep", patterns: ["schl(?:a|ä)f.*(?:schlecht|kaum|wenig)|Schlaf(?:problem|störung|stoerung|mangel)?|poor sleep|sleep(?:ing)? (?:badly|poorly)"] },
        { label: "difficulty concentrating", patterns: ["konzentrier|Konzentration|concentrat"] },
        { label: "several weeks", patterns: ["mehrere(?:n)? Wochen|seit (?:einigen|mehreren) Wochen|wochenlang|several weeks|for weeks"] }
      ],
      evidence: "Ich schlafe seit mehreren Wochen schlecht und kann mich im Studium kaum konzentrieren."
    },
    {
      id: "lst-b2-005-live-debate",
      moduleId: "b2-live-debate",
      level: "B2",
      title: "Should the city center become car-free?",
      context: "Two participants refine their positions during a public debate.",
      goal: "Track claims, concessions, and a proposed compromise.",
      turns: [
        { speaker: "Frau Lorenz", voice: "female", text: "Eine weitgehend autofreie Innenstadt würde die Luftqualität verbessern und mehr Raum für Fußgänger schaffen." },
        { speaker: "Herr Braun", voice: "male", text: "Das Ziel unterstütze ich. Viele Betriebe befürchten allerdings, dass Kunden und Lieferanten sie schlechter erreichen." },
        { speaker: "Frau Lorenz", voice: "female", text: "Lieferverkehr könnte morgens bis zehn Uhr zugelassen bleiben. Zusätzlich brauchen wir günstigere Parkplätze an den Haltestellen außerhalb des Zentrums." },
        { speaker: "Herr Braun", voice: "male", text: "Damit wäre ein Teil des Problems gelöst. Für Menschen mit eingeschränkter Mobilität müssten weiterhin Ausnahmen gelten." },
        { speaker: "Frau Lorenz", voice: "female", text: "Einverstanden. Ich schlage außerdem eine sechsmonatige Testphase vor, während der wir Besucherzahlen und Umsätze auswerten." },
        { speaker: "Herr Braun", voice: "male", text: "Unter diesen Bedingungen kann ich dem Versuch zustimmen. Vor einer dauerhaften Regelung sollten die Ergebnisse öffentlich beraten werden." }
      ],
      prompt: "Which safeguards lead Herr Braun to support a trial?",
      answers: ["Morgendlicher Lieferverkehr, Parkplätze am Stadtrand, Ausnahmen für Menschen mit eingeschränkter Mobilität und eine sechsmonatige Auswertung.", "morning deliveries, outer parking, mobility exemptions, and a six-month evaluation", "Lieferverkehr, Parkplätze, Ausnahmen und Testphase", "delivery access, accessible exemptions, parking, and a measured trial"],
      requirements: [
        { label: "morning delivery access", patterns: ["Liefer|deliver"] },
        { label: "parking outside the center", patterns: ["Parkplatz|Parkplätze|Parkplaetze|parking"] },
        { label: "mobility exemptions", patterns: ["Ausnahme|Mobilität|Mobilitaet|exemption|mobility"] },
        { label: "a six-month trial and evaluation", patterns: ["sechsmonat|sechs Monat|six.month|Testphase|trial|Auswertung|evaluation"] }
      ],
      evidence: "Lieferverkehr könnte morgens bis zehn Uhr zugelassen bleiben. Zusätzlich brauchen wir günstigere Parkplätze an den Haltestellen außerhalb des Zentrums. Für Menschen mit eingeschränkter Mobilität müssten weiterhin Ausnahmen gelten. Ich schlage außerdem eine sechsmonatige Testphase vor, während der wir Besucherzahlen und Umsätze auswerten."
    },
    {
      id: "lst-b2-006-critical-statistics",
      moduleId: "b2-critical-statistics",
      level: "B2",
      title: "Reading a satisfaction survey carefully",
      context: "Two colleagues examine whether a headline matches the underlying survey.",
      goal: "Recognize sampling limits and distinguish percentages from percentage points.",
      turns: [
        { speaker: "Dr. Neumann", voice: "female", text: "Die Überschrift behauptet, die Zufriedenheit sei um zwanzig Prozent gestiegen. In der Grafik steigt der Wert jedoch von fünfzig auf sechzig Prozent." },
        { speaker: "Herr Stein", voice: "male", text: "Das sind zehn Prozentpunkte. Relativ betrachtet entspricht das zwar einem Anstieg um zwanzig Prozent, aber die Formulierung bleibt missverständlich." },
        { speaker: "Dr. Neumann", voice: "female", text: "Außerdem haben nur zweihundert von zweitausend angeschriebenen Personen geantwortet." },
        { speaker: "Herr Stein", voice: "male", text: "Dann könnte eine Selbstselektion vorliegen. Besonders zufriedene oder unzufriedene Personen antworten möglicherweise häufiger." },
        { speaker: "Dr. Neumann", voice: "female", text: "Wir sollten deshalb die Rücklaufquote nennen und erklären, wie die Befragten ausgewählt wurden." },
        { speaker: "Herr Stein", voice: "male", text: "Und wir sollten von den Antworten der Teilnehmenden sprechen, statt das Ergebnis auf alle Kunden zu übertragen." }
      ],
      prompt: "Which two issues make the headline potentially misleading?",
      answers: ["Der Unterschied zwischen Prozent und Prozentpunkten sowie die niedrige, möglicherweise selbstselektierte Rücklaufquote.", "percentage versus percentage points and a low, possibly self-selected response rate", "zehn Prozentpunkte und nur zweihundert Antworten", "ambiguous percentage wording and possible self-selection"],
      requirements: [
        { label: "percentage versus percentage points", patterns: ["Prozentpunkt|percentage point|Prozent.*missverständlich|missverständlich.*Prozent|percent.*mislead|mislead.*percent|ambiguous percentage|missverständliche Prozentangabe"] },
        { label: "the low or self-selected response", patterns: ["Selbstselektion|Rücklauf|Ruecklauf|zweihundert|self.select|response rate|200"] }
      ],
      evidence: "Das sind zehn Prozentpunkte. Relativ betrachtet entspricht das zwar einem Anstieg um zwanzig Prozent, aber die Formulierung bleibt missverständlich. Außerdem haben nur zweihundert von zweitausend angeschriebenen Personen geantwortet.",
      tip: "Compare the two reported values, then check who answered and how many people responded."
    },
    {
      id: "lst-b2-007-professional-repair",
      moduleId: "b2-professional-relationships",
      level: "B2",
      title: "Repairing a strained working relationship",
      context: "Two colleagues discuss a breakdown in communication after a missed deadline.",
      goal: "Understand each perspective and the concrete agreement they reach.",
      turns: [
        { speaker: "Mia", voice: "female", text: "Als du den Termin beim Kunden verschoben hast, ohne mich zu informieren, stand ich im Gespräch völlig unvorbereitet da." },
        { speaker: "Leon", voice: "male", text: "Ich verstehe, warum dich das geärgert hat. Der Kunde hatte mich kurz vorher angerufen, und ich wollte schnell reagieren." },
        { speaker: "Mia", voice: "female", text: "Eine schnelle Reaktion war sinnvoll. Eine kurze Nachricht hätte trotzdem gereicht, damit ich meine Unterlagen anpassen kann." },
        { speaker: "Leon", voice: "male", text: "Da hast du recht. Künftig bestätige ich jede Terminänderung sofort in unserem gemeinsamen Kanal." },
        { speaker: "Mia", voice: "female", text: "Im Gegenzug hinterlege ich dort, welche Unterlagen bereits fertig sind. Dann siehst du, wie viel Vorlauf ich brauche." },
        { speaker: "Leon", voice: "male", text: "Gut. Wenn es besonders dringend ist, rufe ich dich zusätzlich an." },
        { speaker: "Mia", voice: "female", text: "Damit kann ich gut arbeiten. Lass uns nach den nächsten zwei Kundenterminen prüfen, ob die Regel funktioniert." }
      ],
      prompt: "What communication routine do Mia and Leon agree to test?",
      answers: ["Leon bestätigt Änderungen im gemeinsamen Kanal und ruft bei Dringlichkeit an; Mia dokumentiert den Stand der Unterlagen.", "Leon posts schedule changes in the shared channel and calls when urgent, while Mia records document status", "Änderungen im Kanal, Anruf bei Dringlichkeit, Stand der Unterlagen", "shared-channel updates, urgent calls, and document-status updates"],
      requirements: [
        { label: "posting schedule changes", patterns: ["(?:Termin(?:änder|aender)|Änderung|Aenderung|schedule change|change|update).*(?:Kanal|channel)|(?:Kanal|channel).*(?:Termin(?:änder|aender)|Änderung|Aenderung|schedule change|change|update)"] },
        { label: "calling when urgent", patterns: ["(?:dringend|Dringlichkeit|urgent).*(?:ruf|anruf|call)|(?:ruf|anruf|call).*(?:dringend|Dringlichkeit|urgent)"] },
        { label: "recording document status", patterns: ["Unterlagen|Dokument(?:en)?stand|document.*status|status.*document"] }
      ],
      evidence: "Künftig bestätige ich jede Terminänderung sofort in unserem gemeinsamen Kanal. Im Gegenzug hinterlege ich dort, welche Unterlagen bereits fertig sind. Wenn es besonders dringend ist, rufe ich dich zusätzlich an."
    },
    {
      id: "lst-b2-008-public-consultation",
      moduleId: "b2-public-consultation",
      level: "B2",
      title: "A safer route to school",
      context: "A resident questions a traffic proposal during a public consultation.",
      goal: "Follow competing concerns, evidence, and a revised trial proposal.",
      turns: [
        { speaker: "Frau Hansen", voice: "female", text: "Die geplante Einbahnstraße könnte den Schulweg sicherer machen. Ich befürchte jedoch, dass der Verkehr dann durch die Lindenstraße fährt." },
        { speaker: "Herr Vogt", voice: "male", text: "Die Simulation zeigt dort während der morgendlichen Spitzenzeit etwa achtzig zusätzliche Fahrzeuge. Deshalb ist gleichzeitig eine Geschwindigkeitsbegrenzung vorgesehen." },
        { speaker: "Frau Hansen", voice: "female", text: "Eine Begrenzung allein verhindert keinen Umwegverkehr. Könnte die Stadt vor und nach der Änderung tatsächliche Verkehrszahlen erheben?" },
        { speaker: "Herr Vogt", voice: "male", text: "Ja. Wir können vier Wochen vor Beginn zählen und die Messung nach drei Monaten wiederholen." },
        { speaker: "Frau Hansen", voice: "female", text: "Dann sollten auch Lärm und sichere Querungsmöglichkeiten geprüft werden, besonders am Seniorenheim." },
        { speaker: "Herr Vogt", voice: "male", text: "Das nehmen wir in den Prüfauftrag auf. Falls die Belastung deutlich steigt, wird die Verkehrsführung angepasst." },
        { speaker: "Frau Hansen", voice: "female", text: "Mit dieser verbindlichen Überprüfung halte ich einen befristeten Versuch für vertretbar." }
      ],
      prompt: "Why does Frau Hansen finally consider the trial acceptable?",
      answers: ["Weil Verkehr, Lärm und Querungen überprüft werden und die Verkehrsführung bei höherer Belastung angepasst wird.", "because traffic, noise, and crossings will be measured and the plan changed if the burden rises", "verbindliche Messung und Anpassung bei steigender Belastung", "binding monitoring with changes if impacts increase"],
      requirements: [
        { label: "monitoring the effects", patterns: ["(?:Verkehr|Lärm|Laerm|Querung|Belastung).*(?:prüf|pruef|mess|zähl|zaehl)|(?:prüf|pruef|mess|zähl|zaehl|Überprüfung|Ueberpruefung).*(?:Verkehr|Lärm|Laerm|Querung|Belastung)|monitor|measur|count"] },
        { label: "changing the plan if impacts rise", patterns: ["angepasst|anpassen|Anpassung|change|adjust|Belastung.*steig|steig.*Belastung"] }
      ],
      evidence: "Das nehmen wir in den Prüfauftrag auf. Falls die Belastung deutlich steigt, wird die Verkehrsführung angepasst. Mit dieser verbindlichen Überprüfung halte ich einen befristeten Versuch für vertretbar."
    }
  ].map(item => ({
    ...item,
    src: `./audio/listening/${item.id}.wav`,
    transcript: item.turns.map(turn => turn.text).join(" ")
  }));

  window.SATZWERK_MODULE_AUDIO = {
    version: 1,
    voices: {
      female: { name: "Chatterbox Multilingual", role: "female speakers" },
      male: { name: "Coqui TTS · Thorsten VITS", role: "male speakers" }
    },
    items
  };

  const courseSources = window.SATZWERK_CURRICULUM?.sources;
  if (courseSources) {
    items.filter(item => item.source).forEach(item => {
      if (courseSources.some(source => source.url === item.source.url)) return;
      courseSources.push({
        category: "LISTENING CONTEXT",
        title: item.source.title,
        body: item.culture,
        url: item.source.url
      });
    });
  }
})();
