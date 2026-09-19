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
        { label: "attaching it to the appeal", patterns: ["(?:Widerspruch.*(?:beileg|anhäng|anhaeng)|(?:beileg|anhäng|anhaeng).*Widerspruch|appeal.*(?:attach|include)|(?:attach|include).*appeal)"] }
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
