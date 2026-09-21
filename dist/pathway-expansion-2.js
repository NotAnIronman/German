(function () {
  "use strict";

  const course = window.SATZWERK_CURRICULUM;
  if (!course?.modules) throw new Error("Satzwerk curriculum must load before the pathway expansion");

  const sourceByLevel = {
    A0: { title: "Goethe-Institut: A1 course content", url: "https://www.goethe.de/resources/files/pdf315/a1-panorama---description-of-course-content-v1.pdf" },
    A1: { title: "Goethe-Institut: A1 glossary", url: "https://lernen.goethe.de/deutschonline/A1/PDF/EN/A1_deutschonline_course_vocabulary_1-18.pdf" },
    A2: { title: "Goethe-Institut: A2 word list", url: "https://www.goethe.de/pro/relaunch/prf/id/Goethe-Zertifikat_A2_Wortliste.pdf" },
    B1: { title: "Goethe-Institut and ÖSD: B1 word list", url: "https://www.goethe.de/pro/relaunch/prf/bs/Goethe-Zertifikat_B1_Wortliste.pdf" },
    B2: { title: "Council of Europe: CEFR Companion Volume", url: "https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-companion-volume-and-its-language-versions" }
  };

  const levelTaskRange = {
    A0: [28, 55],
    A1: [55, 90],
    A2: [85, 125],
    B1: [120, 165],
    B2: [165, 220]
  };

  const rowToWord = (moduleId, row, index) => ({
    id: `${moduleId}-${row[0]}`,
    de: row[1],
    en: row[2],
    bundle: row[3],
    example: row[4],
    exampleEn: row[5],
    variants: row[6] || [],
    supplemental: index >= 12
  });

  function makeQuestions(spec, words) {
    return words.slice(0, 8).map((word, index) => ({
      id: `guided-use-${index + 1}`,
      type: index % 3 === 0 ? "ACTIVE RECALL" : index % 3 === 1 ? "CONTEXT" : "TRANSFER",
      context: spec.scenario,
      prompt: `Write the taught sentence for: ${word.exampleEn}`,
      answers: [word.example],
      explanation: `Use the complete bundle ${word.bundle}.`,
      requires: [word.id],
      wordBank: []
    }));
  }

  function makeModule(spec) {
    const words = spec.words.map((row, index) => rowToWord(spec.id, row, index));
    const [minWords, maxWords] = levelTaskRange[spec.level];
    const source = sourceByLevel[spec.level];
    return {
      id: spec.id,
      level: spec.level,
      code: spec.code,
      title: spec.title,
      subtitle: spec.subtitle,
      canDo: spec.canDo,
      grammar: spec.grammar.map(row => ({ title: row[0], rule: row[1], example: row[2], translation: row[3] })),
      words,
      questions: makeQuestions(spec, words),
      input: {
        script: spec.input[0],
        listenPrompt: spec.input[1],
        listenAnswers: spec.input[2],
        passage: spec.input[3],
        readPrompt: spec.input[4],
        readAnswers: spec.input[5]
      },
      task: {
        writingPrompt: `${spec.writingPrompt} Write ${minWords} to ${maxWords} words.`,
        minWords,
        maxWords,
        guide: spec.guide,
        required: spec.required,
        model: spec.model,
        speakingPrompt: spec.speakingPrompt,
        speakingGuide: spec.speakingGuide,
        speakingRequired: spec.speakingRequired,
        speakingModel: spec.speakingModel
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
      id: "a0-weather-clothes", level: "A0", code: "A0.19", title: "Weather and what to wear", subtitle: "Understand a simple forecast and choose basic clothing.",
      scenario: "You check the weather before leaving home.",
      canDo: ["Name basic weather and seasons", "Say whether you feel warm or cold", "Choose simple clothing for the weather", "Ask about today's weather"],
      grammar: [
        ["Weather with es", "Many weather statements use es with a verb or adjective.", "Es regnet. Es ist kalt.", "It is raining. It is cold."],
        ["Wear with tragen", "Use tragen plus an accusative clothing item.", "Ich trage eine Jacke.", "I am wearing a jacket."],
        ["Simple reasons", "Use denn to give a short reason without changing the word order.", "Ich nehme einen Schirm, denn es regnet.", "I am taking an umbrella because it is raining."]
      ],
      words: [
        ["wetter", "das Wetter", "weather", "das Wetter", "Das Wetter ist heute gut.", "The weather is good today."],
        ["sonne", "die Sonne", "sun", "die Sonne", "Die Sonne scheint.", "The sun is shining."],
        ["regen", "der Regen", "rain", "der Regen", "Der Regen ist stark.", "The rain is heavy."],
        ["regnen", "regnen", "to rain", "es regnet", "Heute regnet es.", "It is raining today."],
        ["kalt", "kalt", "cold", "kalt · sehr kalt", "Am Morgen ist es kalt.", "It is cold in the morning."],
        ["warm", "warm", "warm", "warm · sehr warm", "Am Nachmittag ist es warm.", "It is warm in the afternoon."],
        ["jacke", "die Jacke, die Jacken", "jacket", "die Jacke · die Jacken", "Ich trage eine Jacke.", "I am wearing a jacket."],
        ["schirm", "der Regenschirm, die Regenschirme", "umbrella", "der Regenschirm · die Regenschirme", "Ich nehme einen Regenschirm mit.", "I am taking an umbrella with me."],
        ["schuhe", "der Schuh, die Schuhe", "shoe", "der Schuh · die Schuhe", "Die Schuhe sind trocken.", "The shoes are dry."],
        ["tragen", "tragen", "to wear", "tragen · ich trage", "Heute trage ich einen Pullover.", "Today I am wearing a sweater."],
        ["wie-wetter", "Wie ist das Wetter?", "What is the weather like?", "Wie ist das Wetter heute?", "Wie ist das Wetter heute?", "What is the weather like today?"],
        ["wind", "der Wind", "wind", "der Wind", "Der Wind ist kalt.", "The wind is cold."],
        ["wolke", "die Wolke, die Wolken", "cloud", "die Wolke · die Wolken", "Am Himmel sind viele Wolken.", "There are many clouds in the sky."],
        ["wolkig", "wolkig", "cloudy", "wolkig", "Morgen ist es wolkig.", "It will be cloudy tomorrow."],
        ["schnee", "der Schnee", "snow", "der Schnee", "Im Winter liegt Schnee.", "There is snow in winter."],
        ["fruehling", "der Frühling", "spring", "der Frühling", "Im Frühling wird es wärmer.", "It gets warmer in spring."],
        ["sommer", "der Sommer", "summer", "der Sommer", "Der Sommer ist oft warm.", "Summer is often warm."],
        ["herbst", "der Herbst", "autumn", "der Herbst", "Im Herbst ist es oft windig.", "It is often windy in autumn."],
        ["winter", "der Winter", "winter", "der Winter", "Im Winter ist es früh dunkel.", "It gets dark early in winter."],
        ["muetze", "die Mütze, die Mützen", "hat", "die Mütze · die Mützen", "Bei Kälte trage ich eine Mütze.", "I wear a hat when it is cold."]
      ],
      input: [
        "Heute Morgen ist es kalt und windig. Am Nachmittag scheint die Sonne. Nina trägt eine Jacke und nimmt einen Regenschirm mit.",
        "Wie ist das Wetter am Morgen?", ["Es ist kalt und windig.", "Kalt und windig."],
        "Für Bonn sind am Morgen acht Grad und Regen gemeldet. Ab Mittag bleibt es trocken. Am Nachmittag scheint kurz die Sonne. Eine Jacke und ein Regenschirm sind am Morgen sinnvoll.",
        "Was braucht man am Morgen?", ["Eine Jacke und einen Regenschirm.", "Man braucht eine Jacke und einen Regenschirm."]
      ],
      writingPrompt: "Write a short weather note and say what you will wear or take with you.",
      guide: ["Name the time of day", "Describe two weather conditions", "Name two clothing items", "Give one short reason"],
      required: ["Wetter", "ist", "trage", "nehme"],
      model: "Das Wetter ist heute Morgen kalt und windig. Später regnet es. Ich trage eine warme Jacke und feste Schuhe. Ich nehme einen Regenschirm mit, denn am Nachmittag kommt Regen.",
      speakingPrompt: "Give today's weather and say what clothing you choose.",
      speakingGuide: ["Name two weather details", "Say whether it feels warm or cold", "Name what you wear", "Name one item you take"],
      speakingRequired: ["ist", "trage", "nehme"],
      speakingModel: "Heute ist es kalt und wolkig. Am Nachmittag regnet es. Ich trage eine Jacke und feste Schuhe. Ich nehme einen Regenschirm mit.",
      culture: ["Weather shapes everyday plans", "Weather forecasts appear throughout German public transport, local news, and everyday small talk. A short comment about the weather often opens a casual exchange.", ["Wetter", "Kleidung", "Alltag"]]
    },
    {
      id: "b2-organizational-change", level: "B2", code: "B2.37", title: "Organizational change and implementation", subtitle: "Evaluate a change proposal, anticipate resistance, and design a responsible rollout.",
      scenario: "An organization plans to replace several established processes with one shared digital workflow.",
      canDo: ["Distinguish strategic goals from implementation measures", "Analyze stakeholder interests and likely resistance", "Propose a phased rollout with safeguards", "Define governance, feedback, escalation, and evaluation"],
      grammar: [
        ["Nominal style for planning", "Formal plans often compress actions into nouns such as Einführung, Beteiligung, and Auswertung. Use this style selectively so ownership remains clear.", "Vor der Einführung erfolgen eine Risikoprüfung und die Beteiligung der Teams.", "Before implementation, a risk review and team participation take place."],
        ["Conditions with vorausgesetzt, dass", "Use vorausgesetzt, dass to state a condition that must be satisfied. The conjugated verb moves to the end.", "Der Zeitplan ist vertretbar, vorausgesetzt, dass zusätzliche Schulungen finanziert werden.", "The schedule is reasonable provided that additional training is funded."],
        ["Calibrated recommendations", "Use dürfte, könnte, and wäre to distinguish likely effects from established facts.", "Eine Pilotphase dürfte die Akzeptanz erhöhen und könnte unerwartete Abhängigkeiten sichtbar machen.", "A pilot phase is likely to increase acceptance and could reveal unexpected dependencies."]
      ],
      words: [
        ["veraenderungsprozess", "der Veränderungsprozess, die Veränderungsprozesse", "change process", "der Veränderungsprozess · die Veränderungsprozesse", "Der Veränderungsprozess ist auf zwölf Monate angelegt.", "The change process is planned for twelve months."],
        ["zielbild", "das Zielbild, die Zielbilder", "target operating vision", "das Zielbild · die Zielbilder", "Das Zielbild beschreibt den künftigen Arbeitsablauf.", "The target vision describes the future workflow."],
        ["interessengruppe", "die Interessengruppe, die Interessengruppen", "stakeholder group", "die Interessengruppe · die Interessengruppen", "Jede Interessengruppe wird frühzeitig beteiligt.", "Every stakeholder group is involved early."],
        ["akzeptanz", "die Akzeptanz", "acceptance", "Akzeptanz schaffen · Akzeptanz messen", "Transparente Entscheidungen erhöhen die Akzeptanz.", "Transparent decisions increase acceptance."],
        ["widerstand", "der Widerstand, die Widerstände", "resistance", "Widerstand verstehen · Widerstände abbauen", "Der Widerstand weist auf ungeklärte Belastungen hin.", "Resistance points to unresolved burdens."],
        ["einfuehrung", "die Einführung, die Einführungen", "implementation / introduction", "die schrittweise Einführung", "Die Einführung beginnt mit zwei Pilotbereichen.", "Implementation begins with two pilot areas."],
        ["pilotphase", "die Pilotphase, die Pilotphasen", "pilot phase", "die Pilotphase · die Pilotphasen", "Die Pilotphase dauert acht Wochen.", "The pilot phase lasts eight weeks."],
        ["steuerung", "die Steuerung", "governance / steering", "die Steuerung des Programms", "Für die Steuerung ist ein bereichsübergreifendes Team zuständig.", "A cross-departmental team is responsible for governance."],
        ["meilenstein", "der Meilenstein, die Meilensteine", "milestone", "der Meilenstein · die Meilensteine", "Jeder Meilenstein hat messbare Abnahmekriterien.", "Each milestone has measurable acceptance criteria."],
        ["abhaengigkeit", "die Abhängigkeit, die Abhängigkeiten", "dependency", "die Abhängigkeit · die Abhängigkeiten", "Technische Abhängigkeiten gefährden den Terminplan.", "Technical dependencies endanger the schedule."],
        ["ressourcenzuteilung", "die Ressourcenzuteilung, die Ressourcenzuteilungen", "resource allocation", "die Ressourcenzuteilung · die Ressourcenzuteilungen", "Die Ressourcenzuteilung muss vor dem Start geklärt sein.", "Resource allocation must be clarified before the start."],
        ["rueckkopplung", "die Rückkopplung, die Rückkopplungen", "feedback loop", "eine regelmäßige Rückkopplung", "Eine wöchentliche Rückkopplung verbindet Pilotteam und Steuerkreis.", "A weekly feedback loop connects the pilot team and steering group."],
        ["eskalationsweg", "der Eskalationsweg, die Eskalationswege", "escalation path", "der Eskalationsweg · die Eskalationswege", "Der Eskalationsweg ist für kritische Ausfälle dokumentiert.", "The escalation path is documented for critical failures."],
        ["risikoregister", "das Risikoregister, die Risikoregister", "risk register", "das Risikoregister · die Risikoregister", "Das Risikoregister wird bei jedem Meilenstein aktualisiert.", "The risk register is updated at every milestone."],
        ["beteiligung", "die Beteiligung", "participation", "die Beteiligung der Beschäftigten", "Die Beteiligung beginnt bereits bei der Prozessaufnahme.", "Employee participation begins during process mapping."],
        ["transparenz", "die Transparenz", "transparency", "Transparenz herstellen", "Ein öffentliches Entscheidungsprotokoll schafft Transparenz.", "A public decision log creates transparency."],
        ["nachsteuern", "nachsteuern", "to recalibrate / intervene", "bei Bedarf nachsteuern", "Bei Überlastung muss die Leitung frühzeitig nachsteuern.", "Management must recalibrate early if overload occurs."],
        ["verankern", "verankern", "to embed", "eine Praxis dauerhaft verankern", "Neue Rollen werden erst nach der Auswertung dauerhaft verankert.", "New roles are embedded permanently only after evaluation."],
        ["ausrollen", "ausrollen", "to roll out", "eine Lösung schrittweise ausrollen", "Die Lösung wird anschließend standortweise ausgerollt.", "The solution is then rolled out one site at a time."],
        ["wirkungskontrolle", "die Wirkungskontrolle, die Wirkungskontrollen", "impact evaluation", "die Wirkungskontrolle · die Wirkungskontrollen", "Die Wirkungskontrolle betrachtet Qualität, Zeit und Belastung.", "The impact evaluation examines quality, time, and workload."]
      ],
      input: [
        "Programmleitung: Der Vorstand erwartet eine Einführung bis Januar. Teamvertretung: Dieser Termin setzt voraus, dass Schulungen und Vertretungskapazitäten finanziert werden. Programmleitung: Wir könnten im Oktober mit zwei Pilotbereichen beginnen. Teamvertretung: Dann brauchen wir klare Abbruchkriterien, einen Eskalationsweg und eine unabhängige Auswertung der Belastung.",
        "Welche fünf Bedingungen nennt die Teamvertretung?", ["Finanzierte Schulungen und Vertretungskapazitäten, klare Abbruchkriterien, ein Eskalationsweg und eine unabhängige Belastungsauswertung.", "Schulungen, Vertretungskapazitäten, Abbruchkriterien, Eskalation und unabhängige Auswertung."],
        "Entwurf zum Veränderungsprogramm: Das Zielbild sieht einen einheitlichen digitalen Freigabeprozess für fünf Standorte vor. Die Pilotphase umfasst zwei Standorte und acht Wochen. Als Erfolg gelten eine um 20 Prozent kürzere Bearbeitungszeit bei gleichbleibender Fehlerquote sowie eine mehrheitlich tragbare Arbeitsbelastung. Noch ungeklärt sind Schnittstellen zum Altsystem, Vertretungen während der Schulungen und die Entscheidungskompetenz des Steuerkreises. Rückmeldungen sollen wöchentlich erhoben werden; ein formaler Abbruch ist bisher nur bei einem vollständigen Systemausfall vorgesehen.",
        "Welche Lücken müssen vor dem Pilotstart geschlossen werden?", ["Schnittstellen, Vertretungen, Entscheidungskompetenzen und breitere Abbruchkriterien müssen geklärt werden.", "Offen sind technische Schnittstellen, Schulungsvertretung, Steuerungsbefugnisse und ausreichende Abbruchkriterien."]
      ],
      writingPrompt: "Write an implementation recommendation that assesses the proposal, stakeholder concerns, safeguards, governance, metrics, and rollout decision.",
      guide: ["State the target outcome and unresolved assumptions", "Map benefits and burdens across stakeholder groups", "Define pilot scope and success criteria", "Add feedback and escalation routes", "State the conditions for rollout or suspension"],
      required: ["Zielbild", "vorausgesetzt", "Pilotphase", "Eskalationsweg", "Wirkungskontrolle", "sofern"],
      model: "Das Zielbild eines einheitlichen Freigabeprozesses ist grundsätzlich plausibel, weil fünf Standorte derzeit unterschiedliche Abläufe und doppelte Dateneingaben nutzen. Der angekündigte Januar-Termin wäre jedoch nur vertretbar, vorausgesetzt, dass technische Schnittstellen, Schulungsvertretungen und Entscheidungskompetenzen vorab geklärt werden. Besonders belastet wären die Pilotteammitglieder, die parallel zum Tagesgeschäft Daten bereinigen und neue Rollen erproben sollen. Ihr Widerstand sollte daher als Hinweis auf reale Kapazitätsrisiken ausgewertet werden. Empfohlen wird eine achtwöchige Pilotphase an zwei Standorten. Vor dem Start dokumentiert der Steuerkreis Zuständigkeiten, Ressourcen und technische Abhängigkeiten. Erfolgskriterien sind eine um 20 Prozent kürzere Bearbeitungszeit, eine stabile Fehlerquote und eine tragbare Arbeitsbelastung. Das Pilotteam meldet wöchentlich Probleme und Verbesserungsvorschläge zurück. Eine unabhängige Datenschutzbeauftragte prüft zusätzlich den Umgang mit personenbezogenen Daten. Kritische Datenschutzfehler, anhaltende Überlastung oder der Ausfall zentraler Schnittstellen lösen den dokumentierten Eskalationsweg aus. Die Ressourcenzuteilung und jede Abweichung werden im Risikoregister festgehalten. Nach vier Wochen findet eine Zwischenprüfung statt, nach acht Wochen die vollständige Wirkungskontrolle. Die Lösung wird auf einen weiteren Standort ausgerollt, sofern die festgelegten Kriterien erreicht und offene Risiken beherrscht werden. Andernfalls steuert der Steuerkreis nach, verlängert die Pilotphase oder setzt die Einführung vorübergehend aus. Die endgültige Entscheidung wird mit Begründung veröffentlicht, damit alle beteiligten Gruppen den weiteren Ablauf nachvollziehen können.",
      speakingPrompt: "Lead a decision meeting about a proposed rollout and secure agreement on safeguards, ownership, and evaluation.",
      speakingGuide: ["Clarify the target and constraints", "Invite two stakeholder perspectives", "Separate assumptions from evidence", "Propose a pilot with stop criteria", "Confirm governance and the decision date"],
      speakingRequired: ["Zielbild", "vorausgesetzt", "Pilotphase", "wir halten fest", "Wirkungskontrolle"],
      speakingModel: "Unser Zielbild ist ein einheitlicher, schnellerer Freigabeprozess. Der Januar-Termin bleibt eine Annahme, solange Schnittstellen und Vertretungen ungeklärt sind. Welche Belastung erwartet das Pilotteam, und welche Abhängigkeiten sieht die IT? Ich schlage eine achtwöchige Pilotphase an zwei Standorten vor, vorausgesetzt, dass Schulungen finanziert und Stop-Kriterien vereinbart werden. Der Steuerkreis führt das Risikoregister, das Pilotteam gibt wöchentlich Rückmeldung. Wir halten fest: Über den Rollout entscheiden wir nach der Wirkungskontrolle am 15. Dezember.",
      culture: ["Participation improves implementation evidence", "Change programs gain useful evidence when the people doing the work can report workload, dependencies, errors, and unintended effects. Participation also clarifies which decisions belong to operational teams and which require formal governance.", ["Veränderung", "Beteiligung", "Steuerung"]]
    },
    {
      id: "b2-policy-impact", level: "B2", code: "B2.38", title: "Policy impact and proportionality", subtitle: "Assess who benefits, who carries costs, and how a measure should be reviewed.",
      scenario: "A city proposes a fee and permit system to reduce traffic in its center.",
      canDo: ["Distinguish policy objectives, instruments, and indicators", "Analyze intended and unintended distributional effects", "Assess proportionality and implementation capacity", "Recommend monitoring, exemptions, and a review clause"],
      grammar: [
        ["Concessive comparison", "Use zwar with aber or einerseits with andererseits to weigh competing effects without flattening either side.", "Die Gebühr dürfte zwar den Verkehr senken, könnte aber Haushalte am Stadtrand überproportional belasten.", "The fee may reduce traffic, but could disproportionately burden households on the outskirts."],
        ["Causal caution", "Use lässt sich nicht eindeutig auf or dürfte teilweise auf to avoid claiming causation beyond the evidence.", "Der Rückgang lässt sich nicht eindeutig auf die Gebühr zurückführen.", "The decline cannot be attributed clearly to the fee."],
        ["Formal proportionality", "Use geeignet, erforderlich, and angemessen to structure a proportionality assessment.", "Die Maßnahme ist geeignet, sofern sie den Durchgangsverkehr tatsächlich verringert.", "The measure is suitable if it actually reduces through traffic."]
      ],
      words: [
        ["massnahme", "die Maßnahme, die Maßnahmen", "measure", "die Maßnahme · die Maßnahmen", "Die Maßnahme soll den Durchgangsverkehr verringern.", "The measure is intended to reduce through traffic."],
        ["zielsetzung", "die Zielsetzung, die Zielsetzungen", "objective", "die Zielsetzung · die Zielsetzungen", "Die Zielsetzung muss messbar formuliert werden.", "The objective must be formulated measurably."],
        ["lenkungswirkung", "die Lenkungswirkung, die Lenkungswirkungen", "behavioral steering effect", "die Lenkungswirkung · die Lenkungswirkungen", "Die tatsächliche Lenkungswirkung ist bislang unklar.", "The actual steering effect is still unclear."],
        ["verteilungswirkung", "die Verteilungswirkung, die Verteilungswirkungen", "distributional effect", "die Verteilungswirkung · die Verteilungswirkungen", "Die Verteilungswirkung unterscheidet sich nach Wohnort und Einkommen.", "The distributional effect differs by residence and income."],
        ["folgewirkung", "die Folgewirkung, die Folgewirkungen", "secondary effect", "beabsichtigte und unbeabsichtigte Folgewirkungen", "Unbeabsichtigte Folgewirkungen können im Umland auftreten.", "Unintended secondary effects may occur in surrounding areas."],
        ["verhaeltnismaessigkeit", "die Verhältnismäßigkeit", "proportionality", "die Verhältnismäßigkeit prüfen", "Die Verhältnismäßigkeit der Ausnahmen muss geprüft werden.", "The proportionality of the exemptions must be examined."],
        ["umsetzungsluecke", "die Umsetzungslücke, die Umsetzungslücken", "implementation gap", "die Umsetzungslücke · die Umsetzungslücken", "Personalmangel könnte eine Umsetzungslücke verursachen.", "Staff shortages could cause an implementation gap."],
        ["ausgangswert", "der Ausgangswert, die Ausgangswerte", "baseline value", "der Ausgangswert · die Ausgangswerte", "Für jeden Indikator wird ein Ausgangswert dokumentiert.", "A baseline is documented for each indicator."],
        ["indikator", "der Indikator, die Indikatoren", "indicator", "der Indikator · die Indikatoren", "Luftqualität allein ist kein ausreichender Indikator.", "Air quality alone is not a sufficient indicator."],
        ["zielgruppe", "die Zielgruppe, die Zielgruppen", "target group", "die Zielgruppe · die Zielgruppen", "Die Ausnahmeregelung betrifft mehrere Zielgruppen.", "The exemption affects several target groups."],
        ["belastung", "die Belastung, die Belastungen", "burden", "eine finanzielle Belastung", "Die Gebühr erzeugt für manche Pendelnde eine hohe Belastung.", "The fee creates a high burden for some commuters."],
        ["entlastung", "die Entlastung, die Entlastungen", "relief", "eine messbare Entlastung", "Anwohnende erwarten eine Entlastung von Lärm und Abgasen.", "Residents expect relief from noise and exhaust fumes."],
        ["abwägung", "die Abwägung, die Abwägungen", "balancing assessment", "eine nachvollziehbare Abwägung", "Die Abwägung muss Alternativen und Härtefälle berücksichtigen.", "The balancing assessment must consider alternatives and hardship cases."],
        ["haertefall", "der Härtefall, die Härtefälle", "hardship case", "der Härtefall · die Härtefälle", "Für medizinische Härtefälle ist eine Ausnahme vorgesehen.", "An exemption is provided for medical hardship cases."],
        ["monitoring", "das Monitoring", "monitoring", "laufendes Monitoring", "Das Monitoring beginnt drei Monate vor der Einführung.", "Monitoring begins three months before implementation."],
        ["wirkungszuordnung", "die Wirkungszuordnung", "causal attribution", "eine belastbare Wirkungszuordnung", "Ohne Vergleichsgebiet ist die Wirkungszuordnung schwierig.", "Causal attribution is difficult without a comparison area."],
        ["konsultation", "die Konsultation, die Konsultationen", "consultation", "die öffentliche Konsultation", "Die öffentliche Konsultation läuft sechs Wochen.", "The public consultation runs for six weeks."],
        ["befristung", "die Befristung, die Befristungen", "time limit / sunset", "eine zweijährige Befristung", "Eine Befristung zwingt zur erneuten politischen Entscheidung.", "A sunset clause requires a new political decision."],
        ["vollzug", "der Vollzug", "enforcement / administration", "der administrative Vollzug", "Der Vollzug benötigt geschultes Personal und ein Beschwerdeverfahren.", "Enforcement requires trained staff and an appeals process."],
        ["kosten-nutzen", "die Kosten-Nutzen-Abwägung", "cost-benefit assessment", "die Kosten-Nutzen-Abwägung", "Die Kosten-Nutzen-Abwägung bezieht soziale Folgen ein.", "The cost-benefit assessment includes social consequences."]
      ],
      input: [
        "Ausschussvorsitz: Die Gebühr soll den Autoverkehr im Zentrum um 15 Prozent senken. Sozialverband: Ohne einkommensabhängige Regelung werden Haushalte am Stadtrand überproportional belastet. Verwaltung: Wir schlagen einen einjährigen Test, Ausnahmen für Härtefälle und ein Quartalsmonitoring vor. Wissenschaftlerin: Für eine belastbare Wirkungszuordnung brauchen wir Ausgangswerte und ein Vergleichsgebiet.",
        "Welche fünf Ergänzungen werden für eine faire Auswertung genannt?", ["Einkommensabhängige Regelung, Härtefallausnahmen, Quartalsmonitoring sowie Ausgangswerte und ein Vergleichsgebiet.", "Soziale Staffelung, Härtefälle, laufendes Monitoring, Baseline und Vergleichsgebiet."],
        "Folgenabschätzung zum Innenstadtpass: Im Bezugsjahr fahren werktäglich rund 84.000 Fahrzeuge in das Gebiet. 31 Prozent sind Durchgangsverkehr. Die Verwaltung erwartet einen Rückgang von 10 bis 18 Prozent. Gleichzeitig verfügen zwei äußere Stadtteile abends nur über einen Bus pro Stunde. Kleine Handwerksbetriebe rechnen mit zusätzlichen Verwaltungskosten. Vorgesehen sind Ausnahmen für Rettungsdienste, mobilitätseingeschränkte Personen und bestimmte Lieferzeiten. Angaben zu einkommensabhängigen Ermäßigungen, Beschwerdewegen und einem Vergleichsgebiet fehlen. Die Maßnahme soll zunächst unbefristet gelten.",
        "Welche vier Verteilungs- oder Evaluationslücken enthält der Entwurf?", ["Es fehlen einkommensabhängige Ermäßigungen, ein Beschwerdeweg, ein Vergleichsgebiet und eine Befristung beziehungsweise Überprüfung.", "Soziale Ermäßigung, Beschwerdeverfahren, Vergleichsgebiet und Überprüfungsklausel fehlen."]
      ],
      writingPrompt: "Write a balanced policy-impact assessment with objectives, evidence limits, distributional effects, proportionality, implementation risks, and a review design.",
      guide: ["Separate the objective from the chosen instrument", "Use baseline figures and mark uncertainty", "Compare effects across at least three groups", "Assess suitability, necessity, and burden", "Recommend indicators, exemptions, and a sunset review"],
      required: ["Zielsetzung", "einerseits", "andererseits", "Verteilungswirkung", "verhältnismäßig", "Monitoring", "Befristung"],
      model: "Die Zielsetzung, den Durchgangsverkehr und damit Lärm sowie Emissionen zu verringern, ist nachvollziehbar. Ob eine flächendeckende Gebühr das geeignete Instrument darstellt, bleibt auf Grundlage der vorliegenden Prognose jedoch offen. Einerseits könnte sie Fahrten verlagern und den öffentlichen Raum entlasten. Andererseits wären Haushalte in schlecht angebundenen Randgebieten, Schichtarbeitende und kleine Handwerksbetriebe möglicherweise überproportional belastet. Die Verteilungswirkung hängt besonders von Einkommen, Wohnort, Arbeitszeit und verfügbaren Verkehrsverbindungen ab. Der erwartete Rückgang von 10 bis 18 Prozent lässt sich ohne Vergleichsgebiet später kaum eindeutig der Maßnahme zuordnen. Die Gebühr erscheint grundsätzlich geeignet, wenn sie den Durchgangsverkehr tatsächlich senkt. Erforderlich wäre sie erst, wenn mildere Mittel wie bessere Busverbindungen, Lieferfenster und gezielte Parkraumbewirtschaftung das Ziel voraussichtlich nicht erreichen. Angemessen und damit verhältnismäßig wäre ein zunächst einjähriger Test mit einkommensabhängigen Ermäßigungen, medizinischen Härtefallausnahmen und praktikablen Lieferregelungen. Vor Beginn sind Verkehrsaufkommen, Luftqualität, Lärm, Reisezeiten und die Nutzung des öffentlichen Verkehrs als Ausgangswerte zu erfassen. Das Monitoring sollte außerdem Verwaltungskosten, Beschwerden, abgelehnte Anträge und Verkehrsverlagerungen in Nachbarviertel ausweisen. Für den Vollzug braucht die Verwaltung geschultes Personal, verständliche Bescheide und einen zugänglichen Beschwerdeweg. Nach sechs und zwölf Monaten erfolgt eine öffentliche Auswertung. Eine Befristung mit erneuter Beschlussfassung stellt sicher, dass die Gebühr nur fortgeführt wird, wenn die Zielwirkung belegt und soziale Belastungen wirksam begrenzt werden.",
      speakingPrompt: "Present a policy-impact assessment to a committee and respond to objections from residents, businesses, and mobility advocates.",
      speakingGuide: ["State the objective and evidence base", "Explain two likely benefits", "Compare burdens across groups", "Answer one proportionality objection", "Recommend a monitored, time-limited decision"],
      speakingRequired: ["Zielsetzung", "einerseits", "andererseits", "Verhältnismäßigkeit", "Monitoring"],
      speakingModel: "Die Zielsetzung ist eine deutliche Entlastung des Zentrums. Einerseits dürfte eine Gebühr den Durchgangsverkehr reduzieren. Andererseits trifft sie Menschen unterschiedlich, besonders in Stadtteilen mit schwachem Nahverkehr. Die Verhältnismäßigkeit hängt deshalb von Ermäßigungen, Härtefallausnahmen und praktikablen Lieferregeln ab. Ohne Ausgangswerte und Vergleichsgebiet bleibt die Wirkungszuordnung unsicher. Ich empfehle einen einjährigen, befristeten Test. Das Monitoring erfasst vierteljährlich Verkehr, Beschwerden, Verwaltungskosten und soziale Belastungen. Danach entscheidet der Ausschuss anhand festgelegter Indikatoren über Anpassung oder Fortführung.",
      culture: ["Policy evaluation includes distribution", "A measure can achieve its average objective while placing unequal burdens on particular groups. Impact assessment therefore combines outcome indicators with implementation costs, access, hardship rules, complaint data, and a defined review decision.", ["Politikfolgen", "Verhältnismäßigkeit", "Evaluation"]]
    },
    {
      id: "b2-research-peer-review", level: "B2", code: "B2.39", title: "Research, evidence, and peer review", subtitle: "Evaluate a study's claims and respond constructively to methodological criticism.",
      scenario: "A small study reports a strong effect, while reviewers question the sample and causal claim.",
      canDo: ["Explain a research question, method, and result", "Distinguish correlation from causation", "Assess validity, reliability, bias, and limitations", "Write a constructive response to peer-review comments"],
      grammar: [
        ["Reported research claims", "Use reported speech and attribution to keep the author's claim separate from your evaluation.", "Die Autorinnen berichten, die Intervention habe die Teilnahme erhöht.", "The authors report that the intervention increased participation."],
        ["Limitation without dismissal", "Use zwar, allerdings, and insofern to narrow a conclusion while preserving what the data support.", "Die Stichprobe ist zwar klein, zeigt allerdings ein konsistentes Muster.", "The sample is small, but shows a consistent pattern."],
        ["Evidence-based revision", "Use angesichts and auf Grundlage to connect a revision directly to the evidence or critique.", "Angesichts der fehlenden Kontrollgruppe wird die kausale Aussage abgeschwächt.", "Given the missing control group, the causal claim is weakened."]
      ],
      words: [
        ["forschungsfrage", "die Forschungsfrage, die Forschungsfragen", "research question", "die Forschungsfrage · die Forschungsfragen", "Die Forschungsfrage wird zu Beginn klar definiert.", "The research question is defined clearly at the beginning."],
        ["hypothese", "die Hypothese, die Hypothesen", "hypothesis", "die Hypothese · die Hypothesen", "Die Hypothese sagt einen positiven Zusammenhang voraus.", "The hypothesis predicts a positive relationship."],
        ["stichprobe", "die Stichprobe, die Stichproben", "sample", "die Stichprobe · die Stichproben", "Die Stichprobe umfasst 84 Personen aus einer Einrichtung.", "The sample comprises 84 people from one institution."],
        ["methodik", "die Methodik, die Methodiken", "methodology", "die Methodik · die Methodiken", "Die Methodik kombiniert Befragung und Beobachtung.", "The methodology combines survey and observation."],
        ["validitaet", "die Validität", "validity", "interne und externe Validität", "Die fehlende Kontrollgruppe begrenzt die interne Validität.", "The missing control group limits internal validity."],
        ["reliabilitaet", "die Reliabilität", "reliability", "die Reliabilität prüfen", "Ein standardisiertes Verfahren erhöht die Reliabilität.", "A standardized procedure increases reliability."],
        ["verzerrung", "die Verzerrung, die Verzerrungen", "bias / distortion", "die Verzerrung · die Verzerrungen", "Freiwillige Teilnahme kann eine Verzerrung verursachen.", "Voluntary participation can cause bias."],
        ["einschraenkung", "die Einschränkung, die Einschränkungen", "limitation", "die Einschränkung · die Einschränkungen", "Die wichtigste Einschränkung betrifft die kurze Laufzeit.", "The main limitation concerns the short duration."],
        ["reproduzierbarkeit", "die Reproduzierbarkeit", "reproducibility", "die Reproduzierbarkeit sichern", "Offene Auswertungsschritte verbessern die Reproduzierbarkeit.", "Open analysis steps improve reproducibility."],
        ["begutachtung", "die Begutachtung, die Begutachtungen", "peer review / assessment", "die wissenschaftliche Begutachtung", "Die Begutachtung enthält drei zentrale Änderungsvorschläge.", "The peer review contains three central revision suggestions."],
        ["evidenz", "die Evidenz", "evidence", "die verfügbare Evidenz", "Die verfügbare Evidenz stützt nur eine vorsichtige Schlussfolgerung.", "The available evidence supports only a cautious conclusion."],
        ["korrelation", "die Korrelation, die Korrelationen", "correlation", "die Korrelation · die Korrelationen", "Die Daten zeigen eine Korrelation zwischen den Variablen.", "The data show a correlation between the variables."],
        ["kausalitaet", "die Kausalität", "causality", "Kausalität belegen", "Aus der Korrelation folgt keine gesicherte Kausalität.", "The correlation does not establish causality."],
        ["datensatz", "der Datensatz, die Datensätze", "data set", "der Datensatz · die Datensätze", "Der anonymisierte Datensatz wird archiviert.", "The anonymized data set is archived."],
        ["einwilligung", "die Einwilligung, die Einwilligungen", "consent", "informierte Einwilligung", "Alle Teilnehmenden gaben ihre Einwilligung.", "All participants gave their consent."],
        ["anonymisierung", "die Anonymisierung, die Anonymisierungen", "anonymization", "die Anonymisierung · die Anonymisierungen", "Die Anonymisierung schützt personenbezogene Angaben.", "Anonymization protects personal information."],
        ["kontrollgruppe", "die Kontrollgruppe, die Kontrollgruppen", "control group", "die Kontrollgruppe · die Kontrollgruppen", "Die Studie enthält keine vergleichbare Kontrollgruppe.", "The study contains no comparable control group."],
        ["replizieren", "replizieren", "to replicate", "eine Studie replizieren", "Ein zweites Team soll die Studie replizieren.", "A second team is to replicate the study."],
        ["ueberarbeiten", "überarbeiten", "to revise", "einen Abschnitt überarbeiten", "Die Diskussion wird grundlegend überarbeitet.", "The discussion is revised substantially."],
        ["gutachten", "das Gutachten, die Gutachten", "review report", "das Gutachten · die Gutachten", "Das Gutachten trennt Hauptkritik und Detailhinweise.", "The review report separates major criticism and detailed comments."]
      ],
      input: [
        "Reviewer: Sie schreiben, das Training habe die Leistung verbessert. Ohne Kontrollgruppe ist diese Kausalität jedoch nicht belegt. Autorin: Wir stimmen zu und werden die Formulierung auf einen beobachteten Zusammenhang begrenzen. Reviewer: Bitte erläutern Sie außerdem die Auswahl der Stichprobe und stellen Sie den anonymisierten Auswertungscode bereit.",
        "Welche drei Änderungen verlangt oder akzeptiert die Diskussion?", ["Die kausale Aussage wird abgeschwächt, die Stichprobenauswahl wird erklärt und der anonymisierte Auswertungscode wird bereitgestellt.", "Vorsichtigere Kausalität, transparente Stichprobe und offener Auswertungscode."],
        "Studienzusammenfassung: 84 freiwillige Beschäftigte einer Organisation nahmen an einem sechswöchigen Konzentrationstraining teil. Ihre durchschnittliche Testleistung stieg von 68 auf 74 Punkte. Eine Kontrollgruppe wurde nicht erhoben. 19 Personen brachen die Teilnahme vor dem Abschlusstest ab; ihre Gründe wurden nicht systematisch dokumentiert. Die Tests fanden zu unterschiedlichen Tageszeiten statt. Das Auswertungsverfahren ist beschrieben, der Code und der anonymisierte Datensatz sind jedoch nicht verfügbar. Die Autorinnen folgern, das Training verursache eine nachhaltige Leistungssteigerung.",
        "Welche fünf methodischen Gründe begrenzen die Schlussfolgerung?", ["Es fehlen eine Kontrollgruppe, Daten zu den Abbrüchen, standardisierte Testzeiten und offene Daten beziehungsweise Code; außerdem wurde Nachhaltigkeit nach sechs Wochen nicht geprüft.", "Freiwillige kleine Stichprobe, keine Kontrollgruppe, unklare Ausfälle, wechselnde Testzeiten und fehlende Reproduktionsmaterialien begrenzen die Aussage." ]
      ],
      writingPrompt: "Write a peer-review response that summarizes the contribution, identifies major methodological limits, distinguishes supported from unsupported claims, and proposes specific revisions.",
      guide: ["State the research question and contribution fairly", "Separate data, interpretation, and causal claim", "Assess sample, comparison, measurement, and attrition", "Request reproducibility and ethics information", "Prioritize concrete major revisions"],
      required: ["Forschungsfrage", "zwar", "allerdings", "Kontrollgruppe", "Kausalität", "Reproduzierbarkeit", "überarbeiten"],
      model: "Die Studie untersucht die relevante Forschungsfrage, ob ein sechswöchiges Training mit einer Veränderung der Konzentrationsleistung verbunden ist. Positiv sind die klar benannten Testwerte und die grundsätzlich nachvollziehbare Auswertung. Die Stichprobe ist zwar für eine erste Exploration nutzbar, erlaubt allerdings keine belastbare kausale Schlussfolgerung. Es fehlt eine Kontrollgruppe, die Testzeiten waren uneinheitlich, und 19 Abbrüche wurden nicht systematisch analysiert. Auch die freiwillige Teilnahme in nur einer Organisation begrenzt die Übertragbarkeit. Dadurch könnten Auswahl-, Zeit- und Ausfallverzerrungen den beobachteten Anstieg miterklären. Die Aussage, das Training habe eine nachhaltige Verbesserung verursacht, geht daher über die Evidenz hinaus. Sie sollte auf eine beobachtete Korrelation innerhalb der verbleibenden Stichprobe begrenzt werden. Die Autorinnen sollten den Ergebnisteil und die Diskussion entsprechend überarbeiten. Dafür sind vier weitere Punkte zentral: Auswahl und Abbrüche transparent dokumentieren, die Messbedingungen erläutern, Einwilligung und Anonymisierung beschreiben sowie Code und anonymisierten Datensatz bereitstellen. Diese Materialien sind für die Reproduzierbarkeit der Auswertung entscheidend. Eine Replikation mit Kontrollgruppe, standardisierten Testzeiten und späterem Folgetest wäre erforderlich, um Kausalität und Nachhaltigkeit zu prüfen. Zusätzlich sollte das Manuskript klar zwischen vorab formulierter Hypothese und nachträglicher Interpretation unterscheiden. Nach diesen Änderungen könnte der Beitrag als explorative Studie veröffentlicht werden, sofern die Schlussfolgerung eng an die tatsächlich erhobenen Daten gebunden bleibt.",
      speakingPrompt: "Discuss a study in a peer-review meeting and negotiate a precise revision plan with the authors.",
      speakingGuide: ["Begin with the contribution", "Identify the strongest supported result", "Explain why the causal claim is too strong", "Prioritize three revisions", "Confirm what evidence would change the conclusion"],
      speakingRequired: ["Forschungsfrage", "Evidenz", "Kontrollgruppe", "Kausalität", "wir halten fest"],
      speakingModel: "Die Forschungsfrage ist relevant, und die Daten zeigen einen Anstieg der Testwerte. Die Evidenz stützt jedoch nur einen Zusammenhang innerhalb der beobachteten Stichprobe. Ohne Kontrollgruppe, standardisierte Testzeiten und Analyse der Abbrüche ist Kausalität nicht belegt. Ich schlage drei Hauptrevisionen vor: Erstens wird die Schlussfolgerung abgeschwächt. Zweitens werden Stichprobenauswahl, Ausfälle und Einwilligung transparent beschrieben. Drittens werden Code und anonymisierte Daten zur Prüfung bereitgestellt. Wir halten fest, dass eine spätere Replikation mit Kontrollgruppe für eine kausale Aussage nötig wäre.",
      culture: ["Peer review evaluates claims and methods", "Constructive review identifies the contribution, tests whether the method supports the claim, and requests revisions that another researcher could follow. A limitation narrows the conclusion without erasing the value of the observed data.", ["Forschung", "Evidenz", "Begutachtung"]]
    },
    {
      id: "b1-workload-priorities", level: "B1", code: "B1.37", title: "Workload, priorities, and boundaries", subtitle: "Make competing tasks visible and negotiate a realistic plan.",
      scenario: "Three urgent assignments share the same deadline and one colleague is absent.",
      canDo: ["Describe workload with concrete evidence", "Distinguish urgent and important tasks", "Negotiate scope, delegation, or a new deadline", "Confirm responsibilities and follow-up points"],
      grammar: [
        ["Concession with obwohl", "Use obwohl to acknowledge a competing fact. The conjugated verb moves to the end of the subordinate clause.", "Obwohl der Bericht dringend ist, kann ich ihn heute nicht vollständig prüfen.", "Although the report is urgent, I cannot review it completely today."],
        ["Suggestions with Konjunktiv II", "Use könnten or wäre to propose an option without sounding abrupt.", "Wir könnten die Auswertung auf Freitag verschieben.", "We could move the analysis to Friday."],
        ["Consequences with dadurch", "Use dadurch to show the practical result of a decision.", "Mia übernimmt die Tabelle. Dadurch spare ich zwei Stunden.", "Mia takes over the table. This saves me two hours."]
      ],
      words: [
        ["belastung", "die Arbeitsbelastung", "workload", "die Arbeitsbelastung", "Die Arbeitsbelastung ist diese Woche ungewöhnlich hoch.", "The workload is unusually high this week."],
        ["prioritaet", "die Priorität, die Prioritäten", "priority", "die Priorität · die Prioritäten", "Der Kundenfehler hat heute höchste Priorität.", "The customer error has top priority today."],
        ["frist-arbeit", "die Frist, die Fristen", "deadline", "eine Frist einhalten · eine Frist verlängern", "Die Frist endet am Donnerstagmittag.", "The deadline ends Thursday at noon."],
        ["zustaendigkeit", "die Zuständigkeit, die Zuständigkeiten", "responsibility / remit", "die Zuständigkeit · die Zuständigkeiten", "Die Zuständigkeiten müssen klar verteilt werden.", "Responsibilities must be distributed clearly."],
        ["kapazitaet", "die Kapazität, die Kapazitäten", "capacity", "freie Kapazität haben", "Im Team gibt es derzeit keine freie Kapazität.", "The team currently has no free capacity."],
        ["aufwand", "der Aufwand", "effort", "den Aufwand einschätzen", "Der zusätzliche Aufwand beträgt etwa vier Stunden.", "The additional effort is about four hours."],
        ["engpass", "der Engpass, die Engpässe", "bottleneck / shortage", "der Engpass · die Engpässe", "Die Krankheitsvertretung verursacht einen Engpass.", "Covering the illness causes a bottleneck."],
        ["delegieren", "delegieren", "to delegate", "eine Aufgabe delegieren", "Wir sollten die Dateneingabe delegieren.", "We should delegate the data entry."],
        ["uebernehmen", "übernehmen", "to take over", "eine Aufgabe übernehmen", "Mia kann die Kundenanfrage übernehmen.", "Mia can take over the customer inquiry."],
        ["verschieben-arbeit", "verschieben", "to postpone", "eine Frist oder Aufgabe verschieben", "Könnten wir den internen Bericht verschieben?", "Could we postpone the internal report?"],
        ["abstimmen", "abstimmen", "to coordinate / align", "Prioritäten abstimmen", "Lassen Sie uns die Prioritäten kurz abstimmen.", "Let us align the priorities briefly."],
        ["realistisch", "realistisch", "realistic", "realistisch planen", "Der bisherige Zeitplan ist nicht realistisch.", "The current schedule is unrealistic."],
        ["dringend", "dringend", "urgent", "dringend · besonders dringend", "Zwei Anfragen sind dringend, aber nur eine ist kritisch.", "Two requests are urgent, but only one is critical."],
        ["verbindlich", "verbindlich", "binding / definite", "verbindlich zusagen", "Diesen Termin kann ich verbindlich zusagen.", "I can commit to this date."],
        ["ruecksprache", "die Rücksprache, die Rücksprachen", "consultation", "nach Rücksprache mit", "Nach Rücksprache mit dem Kunden ändern wir die Reihenfolge.", "After consulting the customer, we change the order."],
        ["vertretung", "die Vertretung, die Vertretungen", "cover / substitute", "die Vertretung übernehmen", "Wer übernimmt am Freitag die Vertretung?", "Who is covering on Friday?"],
        ["umfang", "der Umfang", "scope", "den Umfang reduzieren", "Wir können den Umfang der ersten Version reduzieren.", "We can reduce the scope of the first version."],
        ["zwischenstand", "der Zwischenstand, die Zwischenstände", "progress update", "einen Zwischenstand geben", "Am Mittwoch gebe ich einen Zwischenstand.", "I will give a progress update on Wednesday."],
        ["nachverfolgen", "nachverfolgen", "to track", "offene Punkte nachverfolgen", "Die offenen Punkte werden in der Liste nachverfolgt.", "The open items are tracked in the list."],
        ["ausgelastet", "ausgelastet", "at capacity", "vollständig ausgelastet", "Bis Donnerstag bin ich vollständig ausgelastet.", "I am fully booked until Thursday."]
      ],
      input: [
        "Leitung: Der Kundenfehler muss heute gelöst werden. Wie sieht es mit dem Monatsbericht aus? Sam: Für beides reicht meine Kapazität nicht. Mia könnte die Datentabelle übernehmen. Dann liefere ich heute die Fehleranalyse und am Freitag den vollständigen Bericht. Leitung: Einverstanden. Geben Sie mir morgen einen Zwischenstand.",
        "Welche Aufgabe übernimmt Mia?", ["Sie übernimmt die Datentabelle.", "Die Datentabelle."],
        "Aufgabenübersicht: Kundenfehler bis Dienstag 16 Uhr, geschätzter Aufwand fünf Stunden. Monatsbericht bis Mittwoch 12 Uhr, Aufwand acht Stunden. Interne Präsentation bis Donnerstag, Aufwand drei Stunden. Eine Kollegin fällt bis Freitag aus. Die Präsentation kann nach Rücksprache um eine Woche verschoben werden; der Kundentermin ist verbindlich.",
        "Welche Aufgabe kann verschoben werden und welche Frist ist verbindlich?", ["Die interne Präsentation kann verschoben werden. Der Kundentermin am Dienstag um 16 Uhr ist verbindlich.", "Die Präsentation kann verschoben werden; der Kundenfehler muss bis Dienstag 16 Uhr bearbeitet sein."]
      ],
      writingPrompt: "Write a workload note that documents the conflict and proposes a realistic plan with owners and dates.",
      guide: ["List the competing tasks and deadlines", "Estimate the workload", "Identify the binding priority", "Propose delegation or reduced scope", "Confirm a progress update"],
      required: ["Priorität", "Aufwand", "obwohl", "könnten", "Zwischenstand"],
      model: "Diese Woche überschneiden sich drei wichtige Aufgaben. Der Kundenfehler muss bis Dienstag um 16 Uhr analysiert werden und hat höchste Priorität. Der Monatsbericht ist am Mittwoch um 12 Uhr fällig, obwohl dafür noch ungefähr acht Stunden Arbeit nötig sind. Zusätzlich soll bis Donnerstag eine interne Präsentation entstehen. Der gesamte Aufwand beträgt etwa sechzehn Stunden. Wegen der Krankheitsvertretung habe ich bis Mittwoch jedoch nur zehn Stunden Kapazität. Wir könnten die Datentabelle an Mia delegieren und die Präsentation nach Rücksprache um eine Woche verschieben. Ich übernehme die fünfstündige Fehleranalyse sowie den Text des Monatsberichts. Mia liefert die fertige Tabelle bis Dienstagabend. Den Umfang der Präsentation stimmen wir am Freitag neu ab. Am Dienstag um 15 Uhr prüfe ich, ob der Kundentermin gehalten werden kann. Am Mittwochmorgen liefere ich der Leitung einen Zwischenstand zum Bericht. Dadurch bleiben der verbindliche Kundentermin und die Qualität des Berichts gesichert. Falls ein weiterer Engpass entsteht, melde ich ihn sofort und schlage eine neue Aufgabenverteilung vor.",
      speakingPrompt: "Discuss an excessive workload with a manager and agree on priorities, scope, and follow-up.",
      speakingGuide: ["State the workload factually", "Name the critical deadline", "Explain the capacity gap", "Offer two options", "Confirm owners and a review time"],
      speakingRequired: ["Priorität", "Kapazität", "könnten", "wir halten fest"],
      speakingModel: "Ich möchte die Prioritäten für diese Woche abstimmen. Der Kundenfehler, der Monatsbericht und die Präsentation brauchen zusammen etwa sechzehn Stunden. Bis Mittwoch habe ich nur zehn Stunden Kapazität. Der Kundenfehler hat höchste Priorität. Wir könnten die Datentabelle delegieren oder die Präsentation verschieben. Ich übernehme die Analyse und den Bericht. Wir halten fest, dass ich morgen einen Zwischenstand gebe.",
      culture: ["Workload becomes negotiable when it is concrete", "Deadlines, estimated effort, dependencies, and available capacity make a workload discussion more precise. A useful agreement records priority, scope, ownership, and the next review point.", ["Arbeitsbelastung", "Prioritäten", "Absprachen"]]
    },
    {
      id: "b1-presentation-followup", level: "B1", code: "B1.38", title: "Present clearly and follow up", subtitle: "Guide an audience through a short presentation and record the next step.",
      scenario: "You present the results of a small workplace or community project.",
      canDo: ["Structure a short presentation with signposting", "Explain a chart or concrete result", "Handle a clarification question", "Summarize decisions and follow-up actions"],
      grammar: [
        ["Signposting with zunächst and anschließend", "Use sequence adverbs to make the structure audible.", "Zunächst erkläre ich das Ziel. Anschließend zeige ich die Ergebnisse.", "First I explain the goal. Then I show the results."],
        ["Referring to visuals", "Use wie Sie sehen or aus der Grafik geht hervor to connect speech and visual evidence.", "Wie Sie auf der Folie sehen, ist die Teilnahme gestiegen.", "As you can see on the slide, participation increased."],
        ["Indirect questions", "Use an embedded clause to restate a question. The verb moves to the end.", "Sie möchten wissen, wie die Daten erhoben wurden.", "You would like to know how the data were collected."]
      ],
      words: [
        ["praesentation", "die Präsentation, die Präsentationen", "presentation", "die Präsentation · die Präsentationen", "Die Präsentation dauert zehn Minuten.", "The presentation lasts ten minutes."],
        ["gliederung", "die Gliederung, die Gliederungen", "outline", "die Gliederung · die Gliederungen", "Die Gliederung besteht aus drei Teilen.", "The outline consists of three parts."],
        ["einleitung", "die Einleitung, die Einleitungen", "introduction", "die Einleitung · die Einleitungen", "In der Einleitung nenne ich das Ziel.", "In the introduction, I state the goal."],
        ["hauptteil", "der Hauptteil, die Hauptteile", "main section", "der Hauptteil · die Hauptteile", "Der Hauptteil zeigt die Ergebnisse.", "The main section shows the results."],
        ["schluss", "der Schluss, die Schlüsse", "conclusion / ending", "zum Schluss · der Schluss", "Zum Schluss fasse ich die Empfehlung zusammen.", "At the end, I summarize the recommendation."],
        ["folie", "die Folie, die Folien", "slide", "die Folie · die Folien", "Auf der zweiten Folie sehen Sie die Zahlen.", "On the second slide you can see the figures."],
        ["schaubild", "das Schaubild, die Schaubilder", "chart / diagram", "das Schaubild · die Schaubilder", "Das Schaubild vergleicht drei Monate.", "The chart compares three months."],
        ["kernaussage", "die Kernaussage, die Kernaussagen", "key message", "die Kernaussage · die Kernaussagen", "Die Kernaussage lautet: Die neue Route spart Zeit.", "The key message is: The new route saves time."],
        ["hervorheben", "hervorheben", "to emphasize", "einen Punkt hervorheben", "Ich möchte einen Vorteil besonders hervorheben.", "I would like to emphasize one advantage."],
        ["erlaeutern", "erläutern", "to explain", "etwas kurz erläutern", "Ich erläutere kurz die Datengrundlage.", "I briefly explain the data basis."],
        ["zusammenfassen", "zusammenfassen", "to summarize", "Ergebnisse zusammenfassen", "Zum Schluss fasse ich die Ergebnisse zusammen.", "At the end I summarize the results."],
        ["rueckfrage", "die Rückfrage, die Rückfragen", "follow-up question", "die Rückfrage · die Rückfragen", "Zu diesem Punkt gibt es eine Rückfrage.", "There is a follow-up question on this point."],
        ["publikum", "das Publikum", "audience", "das Publikum", "Das Publikum stellt mehrere Fragen.", "The audience asks several questions."],
        ["handout", "das Handout, die Handouts", "handout", "das Handout · die Handouts", "Alle Quellen stehen im Handout.", "All sources are in the handout."],
        ["uebergang", "der Übergang, die Übergänge", "transition", "der Übergang · die Übergänge", "Ein klarer Übergang verbindet die beiden Themen.", "A clear transition connects the two topics."],
        ["zeitrahmen", "der Zeitrahmen, die Zeitrahmen", "time frame", "den Zeitrahmen einhalten", "Wir müssen den Zeitrahmen von zehn Minuten einhalten.", "We must keep to the ten-minute time frame."],
        ["quelle-presentation", "die Quelle, die Quellen", "source", "die Quelle · die Quellen", "Die Quelle steht unter der Grafik.", "The source is under the chart."],
        ["technik", "die Technik", "equipment / technology", "die Technik prüfen", "Vor Beginn prüfe ich die Technik.", "Before starting, I check the equipment."],
        ["feedback", "das Feedback", "feedback", "Feedback geben · Feedback aufnehmen", "Nach der Präsentation bitte ich um Feedback.", "After the presentation, I ask for feedback."],
        ["naechster-schritt", "der nächste Schritt, die nächsten Schritte", "next step", "der nächste Schritt · die nächsten Schritte", "Der nächste Schritt ist ein vierwöchiger Test.", "The next step is a four-week trial."]
      ],
      input: [
        "Guten Morgen. Zunächst stelle ich unser Ziel vor. Anschließend zeige ich die Ergebnisse des vierwöchigen Tests. Wie Sie auf Folie drei sehen, sank die durchschnittliche Wartezeit um sechs Minuten. Zum Schluss empfehle ich, den Test auf zwei weitere Standorte auszuweiten.",
        "Welche Empfehlung gibt die sprechende Person?", ["Der Test soll auf zwei weitere Standorte ausgeweitet werden.", "Sie empfiehlt zwei weitere Standorte."],
        "Projektbericht: 84 Personen nahmen an der Befragung teil. 61 bewerteten die neue Terminvergabe positiv, 14 neutral und 9 negativ. Die durchschnittliche Wartezeit sank von 22 auf 16 Minuten. Die Befragung fand nur an einem Standort statt. Als nächster Schritt wird ein Test an zwei weiteren Standorten vorgeschlagen.",
        "Welche Einschränkung hat die Datengrundlage?", ["Die Befragung fand nur an einem Standort statt.", "Es wurden nur Daten von einem Standort erhoben."]
      ],
      writingPrompt: "Prepare a structured presentation script with one result, one limitation, one recommendation, and a follow-up action.",
      guide: ["Announce the structure", "State the purpose", "Explain one chart or result", "Acknowledge a limitation", "Close with a recommendation and next step"],
      required: ["zunächst", "wie Sie", "Ergebnis", "allerdings", "der nächste Schritt"],
      model: "Guten Morgen. In meiner Präsentation geht es um den Test unserer neuen Terminvergabe. Ich erläutere zunächst das Ziel, anschließend zeige ich die wichtigsten Ergebnisse, und zum Schluss gebe ich eine Empfehlung. Wie Sie auf der zweiten Folie sehen, sank die durchschnittliche Wartezeit von 22 auf 16 Minuten. Das wichtigste Ergebnis ist damit eine Verkürzung um sechs Minuten. Außerdem bewerteten 61 von 84 Befragten das System positiv, 14 Personen neutral und 9 negativ. Ich möchte allerdings hervorheben, dass die Daten nur von einem Standort und aus einem Zeitraum von vier Wochen stammen. Deshalb lässt sich noch nicht sicher sagen, ob der Effekt an anderen Standorten bestehen bleibt. Ich empfehle einen weiteren vierwöchigen Test an zwei Standorten mit derselben Erhebungsmethode. Bis Freitag wählt die Projektleitung die Standorte aus und verschickt den Zeitplan. Die Teams dokumentieren Wartezeiten und Rückmeldungen wöchentlich. Wir vereinbaren, dass der nächste Schritt nach der gemeinsamen Auswertung beschlossen wird. Die Ergebnisse und die Quellen erhalten alle Beteiligten anschließend in einem kurzen Handout.",
      speakingPrompt: "Give a short project presentation, answer one clarification question, and confirm the follow-up.",
      speakingGuide: ["Introduce the structure", "Explain the central result", "Refer to a visual", "Restate and answer a question", "Close with the next step"],
      speakingRequired: ["zunächst", "wie Sie", "wenn ich Ihre Frage richtig verstehe", "zum Schluss"],
      speakingModel: "Guten Morgen. Ich nenne zunächst das Ziel, anschließend zeige ich die Ergebnisse. Wie Sie auf der Grafik sehen, sank die Wartezeit um sechs Minuten. Die Daten stammen allerdings nur von einem Standort. Ich antworte gern, wenn ich Ihre Frage richtig verstehe: Sie möchten wissen, wie viele Personen teilgenommen haben. Es waren 84. Ich empfehle zum Schluss einen weiteren Test. Der nächste Schritt ist die Standortauswahl bis Freitag.",
      culture: ["A clear presentation makes its route audible", "Listeners benefit from a stated structure, explicit references to evidence, and a closing next step. Questions are easier to answer when the speaker briefly restates the point being asked about.", ["Präsentation", "Daten", "Rückfragen"]]
    },
    {
      id: "b1-travel-insurance", level: "B1", code: "B1.39", title: "Travel insurance and documented claims", subtitle: "Report a disruption, preserve evidence, and submit a complete claim.",
      scenario: "A delayed journey forces an overnight stay and your checked bag arrives two days later.",
      canDo: ["Describe a travel disruption in chronological order", "Distinguish immediate assistance from a later claim", "Identify required receipts and evidence", "Submit a claim with costs, dates, and requested reimbursement"],
      grammar: [
        ["Chronology with nachdem", "Use nachdem to place a completed action before the main event.", "Nachdem der letzte Zug ausgefallen war, buchte ich ein Hotel.", "After the last train had been canceled, I booked a hotel."],
        ["Purpose with damit", "Use damit to explain the purpose of an action. The conjugated verb moves to the end.", "Ich bewahrte alle Belege auf, damit ich die Kosten nachweisen konnte.", "I kept all receipts so that I could prove the costs."],
        ["Formal reference with laut", "Use laut plus document or source to connect a request to the stated terms.", "Laut Versicherungsbedingungen sind notwendige Übernachtungen versichert.", "According to the insurance terms, necessary overnight stays are covered."]
      ],
      words: [
        ["reiseversicherung", "die Reiseversicherung, die Reiseversicherungen", "travel insurance", "die Reiseversicherung · die Reiseversicherungen", "Die Reiseversicherung gilt für diese Buchung.", "The travel insurance applies to this booking."],
        ["schutz", "der Versicherungsschutz", "insurance coverage", "der Versicherungsschutz", "Der Versicherungsschutz beginnt am Reisetag.", "Insurance coverage begins on the travel day."],
        ["verspaetung", "die Verspätung, die Verspätungen", "delay", "die Verspätung · die Verspätungen", "Die Verspätung betrug mehr als vier Stunden.", "The delay was more than four hours."],
        ["ausfall", "der Ausfall, die Ausfälle", "cancellation / outage", "der Ausfall · die Ausfälle", "Der Ausfall des letzten Anschlusses machte eine Übernachtung nötig.", "The cancellation of the final connection made an overnight stay necessary."],
        ["gepaeck", "das Gepäck", "luggage", "das Gepäck · ein Gepäckstück", "Mein Gepäck kam zwei Tage später an.", "My luggage arrived two days later."],
        ["schaden", "der Schaden, die Schäden", "loss / damage", "der Schaden · die Schäden", "Den Schaden meldete ich noch am Flughafen.", "I reported the loss at the airport."],
        ["beleg", "der Beleg, die Belege", "receipt / supporting document", "der Beleg · die Belege", "Alle Belege sind als PDF beigefügt.", "All receipts are attached as PDFs."],
        ["nachweis", "der Nachweis, die Nachweise", "proof", "der Nachweis · die Nachweise", "Die Bestätigung der Fluggesellschaft dient als Nachweis.", "The airline confirmation serves as proof."],
        ["anspruch-reise", "der Anspruch, die Ansprüche", "claim / entitlement", "Anspruch auf Erstattung", "Ich bitte um Prüfung meines Anspruchs.", "I request a review of my claim."],
        ["einreichen", "einreichen", "to submit", "Unterlagen einreichen", "Ich reiche das Formular und alle Belege ein.", "I submit the form and all receipts."],
        ["erstatten-reise", "erstatten", "to reimburse", "Kosten erstatten", "Bitte erstatten Sie die notwendigen Hotelkosten.", "Please reimburse the necessary hotel costs."],
        ["melden-reise", "melden", "to report", "einen Schaden unverzüglich melden", "Der Schaden muss unverzüglich gemeldet werden.", "The loss must be reported immediately."],
        ["selbstbeteiligung", "die Selbstbeteiligung, die Selbstbeteiligungen", "deductible", "die Selbstbeteiligung · die Selbstbeteiligungen", "Der Vertrag enthält keine Selbstbeteiligung.", "The contract has no deductible."],
        ["ausschluss", "der Ausschluss, die Ausschlüsse", "exclusion", "der Ausschluss · die Ausschlüsse", "Vorsätzlich verursachte Schäden sind ausgeschlossen.", "Intentionally caused damage is excluded."],
        ["ersatzkauf", "der Ersatzkauf, die Ersatzkäufe", "replacement purchase", "notwendige Ersatzkäufe", "Jeder notwendige Ersatzkauf muss belegt werden.", "Every necessary replacement purchase must be documented."],
        ["notfallnummer", "die Notfallnummer, die Notfallnummern", "emergency assistance number", "die Notfallnummer · die Notfallnummern", "Die Notfallnummer ist rund um die Uhr erreichbar.", "The emergency number is available around the clock."],
        ["bearbeitungszeit", "die Bearbeitungszeit, die Bearbeitungszeiten", "processing time", "die Bearbeitungszeit · die Bearbeitungszeiten", "Die Bearbeitungszeit beträgt etwa drei Wochen.", "Processing takes about three weeks."],
        ["reiseveranstalter", "der Reiseveranstalter, die Reiseveranstalter", "tour operator", "der Reiseveranstalter · die Reiseveranstalter", "Der Reiseveranstalter bestätigte die Änderung schriftlich.", "The tour operator confirmed the change in writing."],
        ["polizeibericht", "der Polizeibericht, die Polizeiberichte", "police report", "der Polizeibericht · die Polizeiberichte", "Bei Diebstahl wird ein Polizeibericht benötigt.", "A police report is required for theft."],
        ["schadennummer", "die Schadennummer, die Schadennummern", "claim number", "die Schadennummer · die Schadennummern", "Bitte nennen Sie bei Rückfragen die Schadennummer.", "Please state the claim number in any follow-up questions."]
      ],
      input: [
        "Versicherung: Wann haben Sie die Verspätung gemeldet? Reisender: Noch am Flughafen. Nachdem der letzte Anschluss ausgefallen war, rief ich Ihre Notfallnummer an. Versicherung: Haben Sie die Hotelrechnung und die Bestätigung der Fluggesellschaft? Reisender: Ja, ich reiche beides heute ein.",
        "Welche zwei Nachweise hat der Reisende?", ["Die Hotelrechnung und die Bestätigung der Fluggesellschaft.", "Er hat die Hotelrechnung und die Bestätigung der Fluggesellschaft."],
        "Leistungsübersicht: Bei einer nachgewiesenen Verspätung von mehr als vier Stunden werden notwendige Verpflegungskosten bis 40 Euro erstattet. Fällt der letzte Anschluss aus, können angemessene Hotelkosten übernommen werden. Verspätetes Gepäck muss am Flughafen gemeldet werden. Belege, Buchungsunterlagen und die schriftliche Bestätigung des Verkehrsunternehmens sind innerhalb von 30 Tagen einzureichen.",
        "Welche Unterlagen müssen innerhalb von 30 Tagen eingereicht werden?", ["Belege, Buchungsunterlagen und die schriftliche Bestätigung des Verkehrsunternehmens.", "Man muss Belege, Buchungsunterlagen und die schriftliche Bestätigung einreichen."]
      ],
      writingPrompt: "Write a chronological insurance claim with the disruption, immediate actions, evidence, costs, and requested reimbursement.",
      guide: ["Give booking and travel dates", "Describe the disruption in order", "Explain whom you contacted", "List each cost and receipt", "Request a specific reimbursement"],
      required: ["nachdem", "Verspätung", "Beleg", "damit", "erstatten"],
      model: "Sehr geehrte Damen und Herren, am 14. Juni reiste ich mit der Buchungsnummer HZ418 von Hamburg nach Zürich. Der erste Zug hatte 95 Minuten Verspätung, sodass ich den letzten Anschluss verpasste. Ich rief Ihre Notfallnummer an und buchte ein Hotel, nachdem der Anschluss ausgefallen war. Die Übernachtung kostete 118 Euro. Mein Gepäck kam außerdem erst zwei Tage später an. Die Gepäckverspätung meldete ich noch am Bahnhof und erhielt eine schriftliche Bestätigung. Da ich keine Kleidung und keine Hygieneartikel bei mir hatte, kaufte ich notwendige Ersatzartikel für 54 Euro. Ich bewahrte jeden Beleg auf, damit ich die einzelnen Kosten nachweisen kann. Beigefügt sind die Fahrkarten, die Verspätungsbestätigung, die Hotelrechnung, der Gepäckbericht und sämtliche Kaufbelege. Laut Versicherungsbedingungen sind die notwendige Übernachtung und angemessene Ersatzkäufe versichert. Bitte erstatten Sie daher insgesamt 172 Euro auf das im Formular angegebene Konto. Bitte bestätigen Sie den Eingang meiner Unterlagen, nennen Sie mir die Schadennummer und informieren Sie mich über die voraussichtliche Bearbeitungszeit.",
      speakingPrompt: "Report a travel disruption to an insurer and confirm evidence, coverage, and next steps.",
      speakingGuide: ["Give the travel date and route", "Describe events chronologically", "State immediate actions", "List documents and costs", "Ask for the claim number and processing time"],
      speakingRequired: ["nachdem", "Beleg", "Erstattung", "Schadennummer"],
      speakingModel: "Am 14. Juni fuhr ich von Hamburg nach Zürich. Der erste Zug hatte starke Verspätung. Ich rief die Notfallnummer an und buchte ein Hotel, nachdem der letzte Anschluss ausgefallen war. Die Rechnung beträgt 118 Euro. Mein verspätetes Gepäck meldete ich am Bahnhof. Für die Gepäckverspätung habe ich eine schriftliche Bestätigung, und für jeden Ersatzkauf liegt ein Beleg vor. Ich beantrage die Erstattung der notwendigen Kosten. Welche Schadennummer erhält der Fall, und wie lange dauert die Bearbeitung?",
      culture: ["Evidence starts at the moment of disruption", "Transport confirmations, reports made at the airport or station, receipts, booking records, and policy deadlines can determine whether a claim is complete. The insurer's own instructions identify the required route.", ["Reise", "Versicherung", "Nachweise"]]
    },
    {
      id: "a2-job-interview", level: "A2", code: "A2.37", title: "A first job interview", subtitle: "Present your experience and answer practical interview questions.",
      scenario: "You interview for a customer-facing part-time position.",
      canDo: ["Give a concise professional introduction", "Describe relevant experience and strengths", "Explain availability and motivation", "Ask practical questions about a position"],
      grammar: [
        ["Experience with seit and Perfekt", "Use seit for continuing experience and Perfekt for completed work.", "Seit zwei Jahren arbeite ich im Verkauf. Davor habe ich in einem Café gearbeitet.", "I have worked in retail for two years. Before that, I worked in a café."],
        ["Reasons with weil", "Place the conjugated verb at the end of a weil clause.", "Die Stelle interessiert mich, weil ich gern mit Menschen arbeite.", "The position interests me because I enjoy working with people."],
        ["Polite interview questions", "Use könnten Sie to ask for information about duties or schedules.", "Könnten Sie mir die Arbeitszeiten erklären?", "Could you explain the working hours to me?"]
      ],
      words: [
        ["stelle", "die Stelle, die Stellen", "position / job", "die Stelle · die Stellen", "Die Stelle ist ab Oktober frei.", "The position is available from October."],
        ["bewerbung", "die Bewerbung, die Bewerbungen", "application", "die Bewerbung · die Bewerbungen", "Nach meiner Bewerbung erhielt ich eine Einladung zum Vorstellungsgespräch.", "After applying, I received an invitation to a job interview."],
        ["gespraech", "das Vorstellungsgespräch, die Vorstellungsgespräche", "job interview", "das Vorstellungsgespräch · die Vorstellungsgespräche", "Das Vorstellungsgespräch dauert dreißig Minuten.", "The job interview lasts thirty minutes."],
        ["erfahrung", "die Erfahrung, die Erfahrungen", "experience", "Erfahrung haben · Erfahrungen sammeln", "Ich habe Erfahrung im Kundenservice.", "I have experience in customer service."],
        ["aufgabe", "die Aufgabe, die Aufgaben", "task", "die Aufgabe · die Aufgaben", "Zu meinen Aufgaben gehört die Beratung.", "My tasks include advising customers."],
        ["staerke", "die Stärke, die Stärken", "strength", "die Stärke · die Stärken", "Meine Stärke ist die ruhige Kommunikation.", "My strength is calm communication."],
        ["zuverlaessig", "zuverlässig", "reliable", "zuverlässig arbeiten", "Ich bin zuverlässig und pünktlich.", "I am reliable and punctual."],
        ["verfuegbar", "verfügbar", "available", "ab sofort verfügbar", "Ab dem ersten Oktober bin ich verfügbar.", "I am available from October first."],
        ["teilzeit", "die Teilzeit", "part-time work", "in Teilzeit arbeiten", "Ich suche eine Stelle in Teilzeit.", "I am looking for a part-time position."],
        ["vollzeit", "die Vollzeit", "full-time work", "in Vollzeit arbeiten", "Später möchte ich in Vollzeit arbeiten.", "Later I would like to work full-time."],
        ["arbeitszeit", "die Arbeitszeit, die Arbeitszeiten", "working hours", "die Arbeitszeit · die Arbeitszeiten", "Wie sind die Arbeitszeiten verteilt?", "How are the working hours distributed?"],
        ["vorstellen", "sich vorstellen", "to introduce oneself", "sich kurz vorstellen", "Ich stelle mich kurz vor.", "I will introduce myself briefly."],
        ["anzeige", "die Stellenanzeige, die Stellenanzeigen", "job advertisement", "die Stellenanzeige · die Stellenanzeigen", "Ich habe Ihre Stellenanzeige online gelesen.", "I read your job advertisement online."],
        ["lebenslauf", "der Lebenslauf, die Lebensläufe", "CV / resume", "der Lebenslauf · die Lebensläufe", "Meinen Lebenslauf habe ich mitgebracht.", "I brought my CV."],
        ["zeugnis", "das Zeugnis, die Zeugnisse", "certificate / reference", "das Zeugnis · die Zeugnisse", "Das aktuelle Zeugnis ist im Anhang.", "The current certificate is attached."],
        ["team", "das Team, die Teams", "team", "im Team arbeiten", "Ich arbeite gern im Team.", "I enjoy working in a team."],
        ["kundenkontakt", "der Kundenkontakt, die Kundenkontakte", "customer contact", "Erfahrung im Kundenkontakt", "Der Kundenkontakt macht mir Freude.", "I enjoy customer contact."],
        ["probearbeit", "die Probearbeit", "trial work", "einen Tag Probearbeit", "Ein Tag Probearbeit wäre möglich.", "One day of trial work would be possible."],
        ["schicht", "die Schicht, die Schichten", "shift", "die Frühschicht · die Spätschicht", "Am Freitag kann ich die Spätschicht übernehmen.", "I can take the late shift on Friday."],
        ["einarbeitung", "die Einarbeitung", "onboarding / training", "die Einarbeitung", "Wie lange dauert die Einarbeitung?", "How long does onboarding take?"]
      ],
      input: [
        "Frau Klein: Erzählen Sie bitte kurz etwas über sich. Sam: Seit zwei Jahren arbeite ich in einem Café. Dort berate ich Gäste und organisiere Bestellungen. Frau Klein: Wann könnten Sie anfangen? Sam: Ab dem ersten Oktober bin ich verfügbar.",
        "Welche Erfahrung hat Sam?", ["Sam arbeitet seit zwei Jahren in einem Café.", "Zwei Jahre Erfahrung in einem Café."],
        "Stelle im Kundenservice: 25 Stunden pro Woche, Montag bis Samstag im Schichtdienst. Aufgaben sind Beratung, Bestellungen und Reklamationen. Gesucht wird eine freundliche und zuverlässige Person mit guten Deutschkenntnissen. Die Einarbeitung dauert zwei Wochen.",
        "Welche drei Aufgaben werden genannt?", ["Beratung, Bestellungen und Reklamationen.", "Genannt werden Beratung, Bestellungen und Reklamationen."]
      ],
      writingPrompt: "Prepare a short written profile for a job interview with experience, strengths, availability, and two separate questions about duties and working hours.",
      guide: ["Introduce your current situation", "Describe relevant experience", "Name two strengths with evidence", "Explain why the position interests you", "Ask one question about duties and one about working hours"],
      required: ["Erfahrung", "weil", "zuverlässig", "verfügbar", "Arbeitszeit"],
      model: "Guten Tag, mein Name ist Sam Lee. Zurzeit arbeite ich in einem Café. Seit zwei Jahren sammle ich dort Erfahrung im Kundenkontakt. Zu meinen Aufgaben gehören Beratung, Bestellungen und Reklamationen. Wenn viel los ist, bleibe ich ruhig, erkläre Lösungen freundlich und arbeite zuverlässig. Neue Abläufe lerne ich schnell und sorgfältig. Außerdem organisiere ich die Übergabe zwischen Früh- und Spätschicht. Die Stelle interessiert mich, weil ich gern im Team arbeite und Kundinnen und Kunden unterstütze. Ab dem ersten Oktober bin ich verfügbar, auch samstags. Welche Aufgaben übernehme ich in den ersten Wochen? Wie sind die Arbeitszeiten im Schichtdienst verteilt?",
      speakingPrompt: "Answer four interview questions and ask two practical questions about the position.",
      speakingGuide: ["Introduce yourself", "Describe one past job and your experience", "Name two strengths", "Give your availability", "Ask one question about tasks and one about the schedule"],
      speakingRequired: ["Erfahrung", "weil", "verfügbar", "könnten Sie"],
      speakingModel: "Guten Tag, ich bin Sam Lee. Seit zwei Jahren arbeite ich in einem Café und habe Erfahrung im Kundenkontakt. Dort berate ich Gäste und bearbeite Bestellungen. Ich bin zuverlässig und freundlich. Die Stelle interessiert mich, weil ich gern mit Menschen arbeite. Ab Oktober bin ich verfügbar. Könnten Sie mir bitte sagen, welche Aufgaben ich am Anfang übernehme? Könnten Sie auch erklären, wie die Arbeitszeiten verteilt sind?",
      culture: ["Examples support every strength", "In a German job interview, a short concrete example can make a strength easier to understand. Availability, schedule, required documents, and the next step are also common practical topics.", ["Bewerbung", "Beruf", "Gespräch"]]
    },
    {
      id: "a2-moving-registration", level: "A2", code: "A2.38", title: "Moving and changing an address", subtitle: "Organize the move, handover, and first administrative steps.",
      scenario: "You move to a new apartment at the end of the month.",
      canDo: ["Coordinate helpers and transport for a move", "Record a basic apartment handover", "Report meter readings and keys", "Arrange an address registration and mail forwarding"],
      grammar: [
        ["Sequence with bevor and nachdem", "Use bevor to introduce the action that happens later. Use nachdem to introduce an action that was completed earlier.", "Bevor wir fahren, laden wir die Kisten ein. Nachdem wir angekommen sind, bauen wir das Bett auf.", "Before we leave, we load the boxes. After arriving, we assemble the bed."],
        ["Passive for arrangements", "Use wird plus past participle when the action matters more than the person.", "Der Zählerstand wird bei der Übergabe notiert.", "The meter reading is recorded at the handover."],
        ["Deadlines with bis", "Use bis plus a day, date, or time for a deadline.", "Die Schlüssel müssen bis Montag zurückgegeben werden.", "The keys must be returned by Monday."]
      ],
      words: [
        ["umzug", "der Umzug, die Umzüge", "move / relocation", "der Umzug · die Umzüge", "Der Umzug ist am letzten Samstag im Monat.", "The move is on the last Saturday of the month."],
        ["umziehen", "umziehen", "to move house", "umziehen · ist umgezogen", "Wir ziehen nach Leipzig um.", "We are moving to Leipzig."],
        ["kiste", "die Umzugskiste, die Umzugskisten", "moving box", "die Umzugskiste · die Umzugskisten", "Die Bücher kommen in diese Umzugskiste.", "The books go into this moving box."],
        ["transport", "der Transport, die Transporte", "transport", "den Transport organisieren", "Wir organisieren den Transport selbst.", "We are organizing the transport ourselves."],
        ["transporter", "der Transporter, die Transporter", "moving van", "der Transporter · die Transporter", "Der Transporter steht vor dem Haus.", "The van is in front of the building."],
        ["uebergabe", "die Wohnungsübergabe, die Wohnungsübergaben", "apartment handover", "die Wohnungsübergabe · die Wohnungsübergaben", "Die Wohnungsübergabe findet am Montag statt.", "The apartment handover takes place on Monday."],
        ["protokoll", "das Übergabeprotokoll, die Übergabeprotokolle", "handover report", "das Übergabeprotokoll · die Übergabeprotokolle", "Beide Seiten unterschreiben das Übergabeprotokoll.", "Both parties sign the handover report."],
        ["zaehlerstand", "der Zählerstand, die Zählerstände", "meter reading", "der Zählerstand · die Zählerstände", "Wir fotografieren jeden Zählerstand.", "We photograph every meter reading."],
        ["anmelden", "sich anmelden", "to register", "sich beim Bürgeramt anmelden", "Nach dem Umzug melde ich mich beim Bürgeramt an.", "After the move, I register at the citizens' office."],
        ["bestaetigung", "die Wohnungsgeberbestätigung, die Wohnungsgeberbestätigungen", "landlord confirmation", "die Wohnungsgeberbestätigung · die Wohnungsgeberbestätigungen", "Für den Termin brauche ich die Wohnungsgeberbestätigung.", "I need the landlord confirmation for the appointment."],
        ["nachsendung", "der Nachsendeauftrag, die Nachsendeaufträge", "mail-forwarding order", "der Nachsendeauftrag · die Nachsendeaufträge", "Den Nachsendeauftrag beantrage ich online.", "I request mail forwarding online."],
        ["adresse-aendern", "die Adresse ändern", "to change an address", "die Adresse bei einer Stelle ändern", "Ich ändere meine Adresse bei der Bank.", "I change my address with the bank."],
        ["packen", "packen", "to pack", "Kisten packen", "Am Freitag packen wir die letzten Kisten.", "On Friday we pack the last boxes."],
        ["tragen", "tragen", "to carry", "Möbel und Kisten tragen", "Zwei Freunde tragen das Sofa.", "Two friends carry the sofa."],
        ["abbauen", "abbauen", "to dismantle", "Möbel abbauen", "Wir bauen den Schrank vorher ab.", "We dismantle the wardrobe beforehand."],
        ["aufbauen", "aufbauen", "to assemble", "Möbel aufbauen", "In der neuen Wohnung bauen wir das Bett auf.", "We assemble the bed in the new apartment."],
        ["renovieren", "renovieren", "to renovate", "ein Zimmer renovieren", "Das Schlafzimmer wird vor dem Einzug renoviert.", "The bedroom is renovated before moving in."],
        ["maengel", "der Mangel, die Mängel", "defect", "der Mangel · die Mängel", "Alle Mängel stehen im Protokoll.", "All defects are in the report."],
        ["wohnungsgeber", "der Wohnungsgeber, die Wohnungsgeber", "housing provider / landlord", "der Wohnungsgeber · die Wohnungsgeber", "Der Wohnungsgeber unterschreibt die Bestätigung.", "The housing provider signs the confirmation."],
        ["frist", "die Frist, die Fristen", "deadline", "die Frist · die Fristen", "Die Frist endet am nächsten Freitag.", "The deadline ends next Friday."]
      ],
      input: [
        "Nina: Der Transporter kommt am Samstag um acht Uhr. Sam: Gut. Ich bringe sechs Kisten nach unten. Nina: Nach dem Transport müssen wir noch die Zählerstände fotografieren. Sam: Die Übergabe ist am Montag um zehn.",
        "Wann ist die Wohnungsübergabe?", ["Am Montag um zehn Uhr.", "Die Übergabe ist am Montag um zehn Uhr."],
        "Checkliste nach dem Einzug: Namen am Briefkasten prüfen, Wohnungsgeberbestätigung mitnehmen, Termin beim Bürgeramt buchen, Stromanbieter über den Zählerstand informieren und bei Bedarf einen Nachsendeauftrag einrichten. Banken, Versicherungen und wichtige Verträge benötigen ebenfalls die neue Adresse.",
        "Welche Unterlage braucht man für den Termin beim Bürgeramt?", ["Die Wohnungsgeberbestätigung.", "Man braucht die Wohnungsgeberbestätigung."]
      ],
      writingPrompt: "Create a moving plan with timing, responsibilities, handover details, and three address-change tasks.",
      guide: ["Give a date and starting time", "Assign at least three jobs", "Use bevor and nachdem", "Include keys and meter readings", "List the first administrative steps"],
      required: ["Umzug", "bevor", "nachdem", "Zählerstand", "anmelden"],
      model: "Unser Umzug ist am Samstag, den 28. September. Bevor der Transporter um acht Uhr kommt, bauen Mia und ich den Schrank ab. Jonas trägt die Kisten nach unten, und Lea reinigt die alte Küche. Nachdem wir alles transportiert haben, bauen wir gemeinsam das Bett auf. Am Montag findet die Wohnungsübergabe statt. Bei der Übergabe geben wir alle Schlüssel zurück, fotografieren jeden Zählerstand und tragen die Mängel in das Protokoll ein. Anschließend muss ich mich mit der Wohnungsgeberbestätigung beim Bürgeramt anmelden. Außerdem richte ich einen Nachsendeauftrag ein und ändere meine Adresse bei der Bank, der Versicherung und dem Stromanbieter.",
      speakingPrompt: "Coordinate a move with helpers and confirm the handover and registration steps.",
      speakingGuide: ["State the schedule", "Assign jobs", "Mention transport", "Confirm the handover", "Name two administrative tasks"],
      speakingRequired: ["Umzug", "Transporter", "Übergabe", "anmelden"],
      speakingModel: "Der Umzug beginnt am Samstag um acht Uhr. Mia packt die Küche, Jonas trägt die Kisten, und ich fahre den Transporter. Die Übergabe ist am Montag. Dort notieren wir jeden Zählerstand und geben die Schlüssel ab. Danach muss ich mich beim Bürgeramt anmelden und meine Adresse ändern.",
      culture: ["A move includes several separate notifications", "The apartment handover, local registration, utilities, mail forwarding, and address changes serve different purposes. Deadlines and required documents should be checked with the responsible office or provider.", ["Umzug", "Anmeldung", "Übergabe"]]
    },
    {
      id: "a2-event-booking-refund", level: "A2", code: "A2.39", title: "Bookings, cancellations, and refunds", subtitle: "Change an event booking and request the remedy described in the terms.",
      scenario: "An event is moved to a date when you cannot attend.",
      canDo: ["Understand a booking confirmation and change notice", "Cancel or change a reservation", "Request a refund or voucher", "Refer to a deadline and booking number"],
      grammar: [
        ["Conditional requests", "Use falls or wenn for a possible solution and place the verb at the end of that clause.", "Falls eine Erstattung möglich ist, überweisen Sie den Betrag bitte zurück.", "If a refund is possible, please transfer the amount back."],
        ["Reported change", "Use wurde plus participle for a completed passive change.", "Die Veranstaltung wurde verschoben.", "The event was postponed."],
        ["Alternatives with entweder oder", "Use entweder oder to present two acceptable solutions.", "Ich möchte entweder einen Ersatztermin oder eine Erstattung.", "I would like either a replacement date or a refund."]
      ],
      words: [
        ["buchung", "die Buchung, die Buchungen", "booking", "die Buchung · die Buchungen", "Die Buchung wurde per E-Mail bestätigt.", "The booking was confirmed by email."],
        ["bestaetigung-event", "die Buchungsbestätigung, die Buchungsbestätigungen", "booking confirmation", "die Buchungsbestätigung · die Buchungsbestätigungen", "Die Buchungsbestätigung enthält einen Code.", "The booking confirmation contains a code."],
        ["buchungsnummer", "die Buchungsnummer, die Buchungsnummern", "booking number", "die Buchungsnummer · die Buchungsnummern", "Meine Buchungsnummer lautet 48217.", "My booking number is 48217."],
        ["veranstaltung", "die Veranstaltung, die Veranstaltungen", "event", "die Veranstaltung · die Veranstaltungen", "Die Veranstaltung findet im Kulturhaus statt.", "The event takes place at the cultural center."],
        ["verschieben", "verschieben", "to postpone / reschedule", "etwas verschieben · wurde verschoben", "Das Konzert wurde auf Freitag verschoben.", "The concert was moved to Friday."],
        ["absagen", "absagen", "to cancel", "etwas absagen · wurde abgesagt", "Die Führung wurde kurzfristig abgesagt.", "The tour was canceled at short notice."],
        ["stornieren", "stornieren", "to cancel a booking", "eine Buchung stornieren", "Ich möchte meine Buchung stornieren.", "I would like to cancel my booking."],
        ["erstattung", "die Erstattung, die Erstattungen", "refund", "die Erstattung · die Erstattungen", "Ich bitte um eine vollständige Erstattung.", "I request a full refund."],
        ["gutschein", "der Gutschein, die Gutscheine", "voucher", "der Gutschein · die Gutscheine", "Alternativ akzeptiere ich einen Gutschein.", "Alternatively, I accept a voucher."],
        ["betrag", "der Betrag, die Beträge", "amount", "der Betrag · die Beträge", "Der Betrag wurde per Karte bezahlt.", "The amount was paid by card."],
        ["frist-event", "die Frist, die Fristen", "deadline", "innerhalb der Frist", "Die Frist endet sieben Tage vor dem Termin.", "The deadline ends seven days before the date."],
        ["bedingung", "die Bedingung, die Bedingungen", "condition / term", "die Bedingung · die Bedingungen", "Die Bedingungen stehen in der Bestätigung.", "The conditions are in the confirmation."],
        ["ersatztermin", "der Ersatztermin, die Ersatztermine", "replacement date", "der Ersatztermin · die Ersatztermine", "Der Ersatztermin passt mir leider nicht.", "Unfortunately, the replacement date does not suit me."],
        ["ueberweisen", "überweisen", "to transfer", "einen Betrag überweisen", "Bitte überweisen Sie den Betrag auf mein Konto.", "Please transfer the amount to my account."],
        ["zurueckzahlen", "zurückzahlen", "to repay / refund", "einen Betrag zurückzahlen", "Der Anbieter zahlt den Preis zurück.", "The provider refunds the price."],
        ["gebuehr", "die Gebühr, die Gebühren", "fee", "die Gebühr · die Gebühren", "Für die Änderung fällt keine Gebühr an.", "There is no fee for the change."],
        ["verfuegbarkeit", "die Verfügbarkeit", "availability", "die Verfügbarkeit prüfen", "Bitte prüfen Sie die Verfügbarkeit im Mai.", "Please check availability in May."],
        ["kundenservice", "der Kundenservice", "customer service", "den Kundenservice kontaktieren", "Ich habe den Kundenservice schriftlich kontaktiert.", "I contacted customer service in writing."],
        ["anspruch", "der Anspruch, die Ansprüche", "entitlement / claim", "Anspruch auf Erstattung", "Laut Bestätigung besteht Anspruch auf Erstattung.", "According to the confirmation, there is an entitlement to a refund."],
        ["schriftlich", "schriftlich", "in writing", "schriftlich bestätigen", "Bitte bestätigen Sie die Änderung schriftlich.", "Please confirm the change in writing."]
      ],
      input: [
        "Kundin: Meine Buchungsnummer ist 48217. Das Konzert wurde auf Freitag verschoben, aber dann bin ich nicht in der Stadt. Service: Wir können einen Gutschein oder eine Erstattung anbieten. Kundin: Dann bitte ich um die Erstattung.",
        "Worum bittet die Kundin?", ["Sie bittet um eine Erstattung.", "Um eine Erstattung."],
        "Änderung Ihrer Buchung 48217: Die Veranstaltung am 12. Mai findet aus technischen Gründen erst am 19. Mai statt. Ihre Karten bleiben gültig. Falls Sie den Ersatztermin nicht wahrnehmen können, wählen Sie bis zum 10. Mai online zwischen einem Gutschein und der Rückzahlung auf das ursprüngliche Zahlungsmittel. Für diese Änderung fällt keine Gebühr an.",
        "Bis wann muss man eine Lösung wählen?", ["Bis zum 10. Mai.", "Man muss bis zum 10. Mai wählen."]
      ],
      writingPrompt: "Write to customer service about a changed event and request one clearly justified solution.",
      guide: ["Give the booking number", "Describe the original and changed date", "Explain why the new date fails", "Request a refund or voucher", "Ask for written confirmation"],
      required: ["Buchungsnummer", "wurde", "weil", "Erstattung", "erstatten", "schriftlich"],
      model: "Guten Tag, meine Buchungsnummer lautet 48217. Das Konzert am 12. Mai wurde auf den 19. Mai verschoben. Den Ersatztermin kann ich leider nicht wahrnehmen, weil ich an diesem Wochenende nicht in der Stadt bin. Laut Ihrer Nachricht ist bei dieser Änderung eine vollständige Erstattung möglich. Bitte stornieren Sie meine beiden Karten und erstatten Sie den Betrag von 64 Euro auf das ursprüngliche Zahlungsmittel. Teilen Sie mir bitte auch mit, ob ich die Eintrittskarten zurücksenden muss. Ich bitte um eine schriftliche Bestätigung der Stornierung, der Erstattung und des voraussichtlichen Auszahlungstermins. Meine Kontaktdaten finden Sie in der Buchung. Vielen Dank für Ihre Hilfe.",
      speakingPrompt: "Call customer service, explain the booking change, and agree on a refund or alternative.",
      speakingGuide: ["Give the booking number", "Explain the schedule conflict", "Name the solution you want", "Check fees or deadlines", "Repeat the agreed next step"],
      speakingRequired: ["Buchungsnummer", "verschoben", "Erstattung", "erstatten"],
      speakingModel: "Guten Tag, meine Buchungsnummer ist 48217. Das Konzert wurde auf den 19. Mai verschoben. An diesem Tag kann ich nicht kommen. Ich möchte deshalb eine Erstattung. Können Sie den Betrag auf meine Karte erstatten? Entsteht dafür eine Gebühr, und bis wann erfolgt die Rückzahlung? Gut, bitte stornieren Sie meine Karten und schicken Sie mir eine schriftliche Bestätigung.",
      culture: ["Booking terms define the available remedy", "The organizer's terms and the reason for a change influence whether a booking can be moved, refunded, or exchanged for a voucher. Written confirmations preserve dates, conditions, and reference numbers.", ["Buchung", "Erstattung", "Frist"]]
    },
    {
      id: "a1-neighbor-favors", level: "A1", code: "A1.37", title: "Neighbors and small favors", subtitle: "Ask for practical help and agree on a clear return plan.",
      scenario: "You need a neighbor's help while you are away for two days.",
      canDo: ["Ask a neighbor for a small favor", "Explain when and why help is needed", "Offer help in return", "Agree on keys, parcels, plants, or quiet hours"],
      grammar: [
        ["Polite requests", "Use könntest du with familiar neighbors and könnten Sie in a formal relationship.", "Könntest du bitte die Pflanzen gießen?", "Could you please water the plants?"],
        ["Time clauses with wenn", "Use wenn for a condition or repeated situation. The verb moves to the end of the wenn clause.", "Wenn ein Paket kommt, nimm es bitte an.", "If a parcel arrives, please accept it."],
        ["Two-way exchange", "Use dafür or im Gegenzug to offer something in return.", "Dafür bringe ich dir etwas vom Markt mit.", "In return, I will bring you something from the market."]
      ],
      words: [
        ["nachbar", "der Nachbar, die Nachbarn", "male neighbor", "der Nachbar · die Nachbarn", "Mein Nachbar wohnt im dritten Stock.", "My neighbor lives on the third floor."],
        ["nachbarin", "die Nachbarin, die Nachbarinnen", "female neighbor", "die Nachbarin · die Nachbarinnen", "Meine Nachbarin nimmt das Paket an.", "My neighbor accepts the parcel."],
        ["gefallen", "der Gefallen, die Gefallen", "favor", "jemandem einen Gefallen tun", "Kannst du mir einen Gefallen tun?", "Can you do me a favor?"],
        ["pflanze", "die Pflanze, die Pflanzen", "plant", "die Pflanze · die Pflanzen", "Die Pflanzen brauchen Wasser.", "The plants need water."],
        ["giessen", "gießen", "to water / pour", "die Pflanzen gießen", "Könntest du bitte die Pflanzen gießen?", "Could you please water the plants?"],
        ["paket", "das Paket, die Pakete", "parcel", "das Paket · die Pakete", "Morgen kommt ein Paket für mich.", "A parcel for me is arriving tomorrow."],
        ["annehmen", "annehmen", "to accept", "ein Paket annehmen", "Kannst du das Paket annehmen?", "Can you accept the parcel?"],
        ["schluessel", "der Schlüssel, die Schlüssel", "key", "der Schlüssel · die Schlüssel", "Ich gebe dir den Schlüssel heute Abend.", "I will give you the key this evening."],
        ["leihen", "leihen", "to lend", "jemandem etwas leihen", "Leihst du mir kurz deine Gießkanne?", "Can you lend me your watering can for a moment?"],
        ["zurueckgeben", "zurückgeben", "to return", "etwas zurückgeben", "Ich gebe sie dir morgen zurück.", "I will return it to you tomorrow."],
        ["aufpassen", "aufpassen", "to watch / look after", "auf etwas aufpassen", "Kannst du auf meine Katze aufpassen?", "Can you look after my cat?"],
        ["kein-problem", "Kein Problem.", "No problem.", "Kein Problem. · Das mache ich gern.", "Kein Problem, das mache ich gern.", "No problem, I am happy to do that."],
        ["giesskanne", "die Gießkanne, die Gießkannen", "watering can", "die Gießkanne · die Gießkannen", "Die Gießkanne steht auf dem Balkon.", "The watering can is on the balcony."],
        ["klingeln", "klingeln", "to ring the bell", "bei jemandem klingeln", "Klingel bitte nach sechs Uhr bei mir.", "Please ring my bell after six."],
        ["laerm", "der Lärm", "noise", "der Lärm", "Am Abend stört der Lärm die Nachbarn.", "In the evening, the noise disturbs the neighbors."],
        ["ruhe", "die Ruhe", "quiet", "Ruhe brauchen", "Nach zehn Uhr brauchen alle Ruhe.", "Everyone needs quiet after ten."],
        ["bescheid-sagen", "Bescheid sagen", "to let someone know", "jemandem Bescheid sagen", "Sag mir bitte kurz Bescheid.", "Please let me know briefly."],
        ["dafuer", "dafür", "in return / for that", "dafür · im Gegenzug", "Dafür helfe ich dir am Samstag.", "In return, I will help you on Saturday."],
        ["abwesend", "abwesend", "away / absent", "zwei Tage abwesend sein", "Ich bin am Wochenende abwesend.", "I am away this weekend."],
        ["erreichbar", "erreichbar", "reachable", "telefonisch erreichbar", "Ich bin jederzeit telefonisch erreichbar.", "I am reachable by phone at any time."]
      ],
      input: [
        "Sam: Hallo Mia, könntest du mir am Wochenende einen Gefallen tun? Mia: Gern. Was brauchst du? Sam: Bitte gieße am Samstag die Pflanzen. Der Schlüssel liegt bei Frau Roth. Mia: Kein Problem.",
        "Was soll Mia am Samstag tun?", ["Sie soll die Pflanzen gießen.", "Die Pflanzen gießen."],
        "Hallo Herr Klein, ich bin von Freitag bis Sonntag nicht zu Hause. Am Samstag kommt wahrscheinlich ein Paket. Könnten Sie es bitte annehmen? Falls es nicht passt, sagen Sie mir bitte kurz Bescheid. Ich bin telefonisch erreichbar. Vielen Dank für Ihre Hilfe.",
        "Wie lange ist die Person nicht zu Hause?", ["Von Freitag bis Sonntag.", "Sie ist von Freitag bis Sonntag nicht zu Hause."]
      ],
      writingPrompt: "Write a message asking a neighbor for two small favors while you are away.",
      guide: ["Say when you are away", "Ask politely for two actions", "Explain where the key or needed item is", "Give contact information", "Thank the neighbor"],
      required: ["könnt", "bitte", "Schlüssel", "Bescheid", "Danke"],
      model: "Hallo Frau Roth, ich bin von Freitag bis Sonntag nicht zu Hause. Könnten Sie bitte am Samstag meine Pflanzen gießen und ein Paket für mich annehmen? Der Schlüssel liegt bei Herrn Klein im zweiten Stock. Falls etwas nicht klappt, sagen Sie mir bitte kurz Bescheid. Ich bin telefonisch erreichbar und kann schnell antworten. Am Sonntagabend hole ich den Schlüssel wieder ab. Danke für Ihre Hilfe. Dafür bringe ich Ihnen am Montag frische Brötchen mit.",
      speakingPrompt: "Ask a neighbor for help, explain the details, and offer help in return.",
      speakingGuide: ["Open naturally", "Ask for two favors", "Give a day or time", "Explain one practical detail", "Offer something in return"],
      speakingRequired: ["könnt", "bitte", "dafür"],
      speakingModel: "Hallo Mia, könntest du mir bitte am Samstag einen Gefallen tun? Bitte gieße die Pflanzen und nimm ein Paket an. Der Schlüssel liegt bei Frau Roth. Dafür helfe ich dir nächste Woche beim Einkaufen. Vielen Dank.",
      culture: ["Clear agreements make favors easy", "Small exchanges between neighbors often depend on precise times, keys, names on doorbells, and a quick message if plans change. Clear details prevent inconvenience for both people.", ["Nachbarschaft", "Gefallen", "Absprachen"]]
    },
    {
      id: "a1-culture-tickets", level: "A1", code: "A1.38", title: "Cinema, museum, and tickets", subtitle: "Choose an event, check details, and buy the right ticket.",
      scenario: "You plan a cultural outing with a friend.",
      canDo: ["Understand basic event information", "Ask about opening and starting times", "Reserve or buy tickets", "Describe whether an event was interesting"],
      grammar: [
        ["Time questions", "Use wann for an event time and wie lange for duration.", "Wann beginnt der Film? Wie lange dauert er?", "When does the film begin? How long does it last?"],
        ["Separable event verbs", "Verbs such as anfangen place the prefix at the end in a main clause.", "Die Vorstellung fängt um acht Uhr an.", "The performance starts at eight."],
        ["Simple evaluation", "Use finden plus an adjective for a personal evaluation.", "Ich finde die Ausstellung spannend.", "I find the exhibition exciting."]
      ],
      words: [
        ["kino", "das Kino, die Kinos", "cinema", "das Kino · die Kinos", "Das Kino ist neben dem Bahnhof.", "The cinema is next to the station."],
        ["museum", "das Museum, die Museen", "museum", "das Museum · die Museen", "Das Museum öffnet um zehn Uhr.", "The museum opens at ten."],
        ["ausstellung", "die Ausstellung, die Ausstellungen", "exhibition", "die Ausstellung · die Ausstellungen", "Die Ausstellung zeigt moderne Fotografie.", "The exhibition shows modern photography."],
        ["eintritt", "der Eintritt", "admission", "der Eintritt · freier Eintritt", "Der Eintritt kostet acht Euro.", "Admission costs eight euros."],
        ["karte", "die Eintrittskarte, die Eintrittskarten", "admission ticket", "die Eintrittskarte · die Eintrittskarten", "Ich kaufe zwei Eintrittskarten.", "I am buying two admission tickets."],
        ["vorstellung", "die Vorstellung, die Vorstellungen", "show / screening", "die Vorstellung · die Vorstellungen", "Die Vorstellung beginnt um 19.30 Uhr.", "The show begins at 7:30 p.m."],
        ["oeffnungszeit", "die Öffnungszeit, die Öffnungszeiten", "opening time", "die Öffnungszeit · die Öffnungszeiten", "Die Öffnungszeiten stehen online.", "The opening times are online."],
        ["reservieren", "reservieren", "to reserve", "Karten reservieren", "Ich möchte zwei Plätze reservieren.", "I would like to reserve two seats."],
        ["beginnen", "beginnen", "to begin", "beginnen · beginnt", "Der Film beginnt um acht Uhr.", "The film begins at eight."],
        ["dauern", "dauern", "to last", "eine Stunde dauern", "Die Führung dauert eine Stunde.", "The tour lasts one hour."],
        ["spannend", "spannend", "exciting / interesting", "spannend finden", "Ich finde den Film spannend.", "I find the film exciting."],
        ["programm", "das Programm, die Programme", "program / schedule", "das Programm · die Programme", "Im Programm stehen drei Filme.", "There are three films in the program."],
        ["sitzplatz", "der Sitzplatz, die Sitzplätze", "seat", "der Sitzplatz · die Sitzplätze", "Unsere Sitzplätze sind in Reihe fünf.", "Our seats are in row five."],
        ["reihe", "die Reihe, die Reihen", "row", "die Reihe · die Reihen", "Wir sitzen in der dritten Reihe.", "We are sitting in the third row."],
        ["ermaessigt", "ermäßigt", "reduced-price", "ermäßigter Eintritt", "Studierende zahlen den ermäßigten Preis.", "Students pay the reduced price."],
        ["ausverkauft", "ausverkauft", "sold out", "ausverkauft sein", "Die Abendvorstellung ist ausverkauft.", "The evening show is sold out."],
        ["geschlossen", "geschlossen", "closed", "montags geschlossen", "Das Museum ist montags geschlossen.", "The museum is closed on Mondays."],
        ["fuehrung", "die Führung, die Führungen", "guided tour", "die Führung · die Führungen", "Die Führung beginnt am Eingang.", "The guided tour begins at the entrance."],
        ["langweilig", "langweilig", "boring", "langweilig finden", "Mein Bruder findet den Film langweilig.", "My brother finds the film boring."],
        ["treffpunkt", "der Treffpunkt, die Treffpunkte", "meeting point", "der Treffpunkt · die Treffpunkte", "Der Treffpunkt ist vor dem Museum.", "The meeting point is in front of the museum."]
      ],
      input: [
        "Mia: Wann beginnt der Film? Jonas: Um 20 Uhr. Er dauert zwei Stunden. Mia: Gibt es noch Karten? Jonas: Ja, aber nur noch Plätze in Reihe acht.",
        "Wo sind die freien Plätze?", ["In Reihe acht.", "Die freien Plätze sind in Reihe acht."],
        "Stadtmuseum: Dienstag bis Sonntag von 10 bis 18 Uhr geöffnet. Montags geschlossen. Die Führung durch die Fotoausstellung beginnt samstags um 14 Uhr und dauert 75 Minuten. Eintritt zwölf Euro, ermäßigt acht Euro. Bitte reservieren Sie online.",
        "Wann beginnt die Führung?", ["Samstags um 14 Uhr.", "Die Führung beginnt samstags um 14 Uhr."]
      ],
      writingPrompt: "Plan a cinema or museum visit with a friend and include all practical details.",
      guide: ["Name the place and event", "Give the day and starting time", "Mention duration or opening time", "Explain the ticket plan", "Ask for confirmation"],
      required: ["beginnt", "Uhr", "Karte", "treffen", "Bescheid"],
      model: "Hallo Nina, möchtest du am Samstag mit ins Stadtmuseum kommen? Dort läuft eine Fotoausstellung über das Leben in Berlin. Das Museum ist von 10 bis 18 Uhr geöffnet. Um 14 Uhr beginnt eine Führung, die 75 Minuten dauert. Der Eintritt kostet zwölf Euro. Ich kann für uns jeweils eine Karte online reservieren. Treffen wir uns um 13.45 Uhr vor dem Eingang? Nach der Führung können wir noch einen Kaffee trinken. Gib mir bitte bis Freitag Bescheid, ob der Plan passt.",
      speakingPrompt: "Suggest an event and explain the schedule, price, and meeting point.",
      speakingGuide: ["Name the event", "Give the time", "Mention the price", "Choose a meeting point", "Ask whether the plan works"],
      speakingRequired: ["beginnt", "kostet", "treffen"],
      speakingModel: "Am Samstag möchte ich die Fotoausstellung besuchen. Die Führung beginnt um 14 Uhr, und der Eintritt kostet zwölf Euro. Treffen wir uns um 13.45 Uhr vor dem Museum? Ich kann die Karten reservieren. Passt das für dich?",
      culture: ["Reduced admission is common", "Many museums, cinemas, theaters, and public attractions offer reduced prices for groups such as students, trainees, children, or people with certain passes. The accepted proof is listed with the ticket conditions.", ["Kultur", "Eintritt", "Ermäßigung"]]
    },
    {
      id: "a1-pets-vet", level: "A1", code: "A1.39", title: "Pets and a first vet visit", subtitle: "Describe an animal's routine and report a simple health concern.",
      scenario: "Your pet is behaving differently and you call a veterinary practice.",
      canDo: ["Name common pets and supplies", "Describe a pet's daily routine", "Report a simple symptom", "Arrange a basic veterinary appointment"],
      grammar: [
        ["Animal subjects", "Use er, sie, or es according to the noun and keep the verb in position two.", "Die Katze frisst wenig. Sie schläft viel.", "The cat eats little. She sleeps a lot."],
        ["Duration with seit", "Use seit with a present-tense verb for a situation that continues now.", "Seit gestern frisst er nicht.", "He has not eaten since yesterday."],
        ["Commands for care", "Use short imperatives for familiar care instructions.", "Gib ihm Wasser. Bleib hier.", "Give him water. Stay here."]
      ],
      words: [
        ["haustier", "das Haustier, die Haustiere", "pet", "das Haustier · die Haustiere", "Unser Haustier heißt Milo.", "Our pet's name is Milo."],
        ["hund", "der Hund, die Hunde", "dog", "der Hund · die Hunde", "Der Hund läuft im Park.", "The dog runs in the park."],
        ["katze", "die Katze, die Katzen", "cat", "die Katze · die Katzen", "Die Katze schläft auf dem Sofa.", "The cat sleeps on the sofa."],
        ["tierarzt", "der Tierarzt, die Tierärzte", "male veterinarian", "der Tierarzt · die Tierärzte", "Der Tierarzt untersucht den Hund.", "The veterinarian examines the dog."],
        ["praxis", "die Tierarztpraxis, die Tierarztpraxen", "veterinary practice", "die Tierarztpraxis · die Tierarztpraxen", "Die Tierarztpraxis öffnet um acht Uhr.", "The veterinary practice opens at eight."],
        ["termin-tier", "der Termin, die Termine", "appointment", "einen Termin vereinbaren", "Ich brauche einen Termin für meine Katze.", "I need an appointment for my cat."],
        ["futter", "das Futter", "pet food", "das Futter", "Der Hund bekommt morgens Futter.", "The dog gets food in the morning."],
        ["leine", "die Leine, die Leinen", "leash", "die Leine · die Leinen", "Draußen bleibt der Hund an der Leine.", "Outside, the dog stays on the leash."],
        ["fressen", "fressen", "to eat (animal)", "fressen · frisst", "Die Katze frisst seit gestern wenig.", "The cat has eaten little since yesterday."],
        ["untersuchen", "untersuchen", "to examine", "ein Tier untersuchen", "Können Sie ihn heute untersuchen?", "Can you examine him today?"],
        ["krank", "krank", "ill", "krank sein · krank wirken", "Mein Hund wirkt krank.", "My dog seems ill."],
        ["ruhig", "ruhig", "calm / quiet", "ruhig bleiben", "Die Katze ist heute sehr ruhig.", "The cat is very quiet today."],
        ["kaefig", "der Käfig, die Käfige", "cage", "der Käfig · die Käfige", "Der Käfig muss sauber sein.", "The cage must be clean."],
        ["napf", "der Napf, die Näpfe", "pet bowl", "der Napf · die Näpfe", "Der Wassernapf ist leer.", "The water bowl is empty."],
        ["impfung", "die Impfung, die Impfungen", "vaccination", "die Impfung · die Impfungen", "Die nächste Impfung ist im Mai.", "The next vaccination is in May."],
        ["chip", "der Chip, die Chips", "microchip", "der Chip · die Chips", "Der Hund hat einen Chip.", "The dog has a microchip."],
        ["weglaufen", "weglaufen", "to run away", "weglaufen · ist weggelaufen", "Der Hund ist gestern weggelaufen.", "The dog ran away yesterday."],
        ["vermisst", "vermisst", "missing", "als vermisst melden", "Die Katze wird seit Montag vermisst.", "The cat has been missing since Monday."],
        ["abholen-tier", "abholen", "to pick up", "ein Tier abholen", "Ich hole den Hund um fünf Uhr ab.", "I am picking up the dog at five."],
        ["betreuen", "betreuen", "to look after", "ein Tier betreuen", "Meine Nachbarin betreut die Katze.", "My neighbor looks after the cat."]
      ],
      input: [
        "Praxis: Tierarztpraxis Weber, guten Morgen. Sam: Guten Morgen. Meine Katze frisst seit gestern wenig und ist sehr ruhig. Haben Sie heute einen Termin? Praxis: Ja, um 15 Uhr.",
        "Wann ist der Termin?", ["Um 15 Uhr.", "Der Termin ist um 15 Uhr."],
        "Hinweis für den Termin: Bringen Sie den Impfpass mit. Hunde warten bitte an der Leine. Katzen und kleine Tiere kommen in einem sicheren Korb oder Käfig. Geben Sie bei der Anmeldung an, seit wann die Beschwerden bestehen.",
        "Was soll man zur Praxis mitbringen?", ["Den Impfpass.", "Man soll den Impfpass mitbringen."]
      ],
      writingPrompt: "Write a short message to a veterinary practice describing an animal and requesting an appointment.",
      guide: ["Name the animal", "Describe two changes or symptoms", "Use seit with a time", "Request a day or time", "Give a contact detail"],
      required: ["Katze", "seit", "Termin", "erreichbar"],
      model: "Guten Morgen, meine Katze Maja frisst seit gestern sehr wenig und ist ungewöhnlich ruhig. Sie trinkt Wasser, aber sie möchte nicht spielen und schläft viel länger als sonst. Fieber habe ich noch nicht gemessen. Könnte ich bitte heute oder morgen einen Termin bekommen? Am Nachmittag bin ich ab 14 Uhr verfügbar und telefonisch erreichbar. Meine Telefonnummer ist 0176 2345678. Ich bringe ihren Impfpass und den Transportkorb mit. Vielen Dank für Ihre Hilfe.",
      speakingPrompt: "Call a veterinary practice, describe the problem, and arrange an appointment.",
      speakingGuide: ["Introduce yourself and the pet", "Give two symptoms", "Say how long they have lasted", "Ask for an appointment", "Repeat the agreed time"],
      speakingRequired: ["seit", "Termin", "Uhr"],
      speakingModel: "Guten Morgen. Meine Katze Maja frisst seit gestern wenig und ist sehr ruhig. Sie trinkt noch Wasser. Haben Sie heute einen Termin? Um 15 Uhr passt gut. Ich bringe den Impfpass mit. Vielen Dank.",
      culture: ["Animal care has practical rules", "Registration, identification, leashes, transport containers, and local rules vary by animal and municipality. Veterinary practices usually state what records and transport equipment are needed before a visit.", ["Haustiere", "Tierarzt", "Verantwortung"]]
    },
    {
      id: "a0-family-friends", level: "A0", code: "A0.20", title: "Family and close people", subtitle: "Name important people and describe simple relationships.",
      scenario: "You show someone a few family photos.",
      canDo: ["Name close family members and friends", "Say who someone is", "Give a person's name and age", "Use simple possessive words"],
      grammar: [
        ["Possessive words", "In the nominative, use mein for masculine and neuter nouns and meine for feminine nouns and plurals.", "Das ist mein Bruder. Das ist meine Schwester.", "That is my brother. That is my sister."],
        ["People with sein", "Use ist for one person and sind for more than one.", "Das ist meine Mutter. Das sind meine Eltern.", "That is my mother. Those are my parents."],
        ["Names and friend words", "A first name normally appears without an article. Freund and Freundin can describe a friend or a romantic partner; the context gives the meaning.", "Noah ist ein Freund von mir.", "Noah is a friend of mine."]
      ],
      words: [
        ["familie", "die Familie, die Familien", "family", "die Familie · die Familien", "Das ist meine Familie.", "That is my family."],
        ["mutter", "die Mutter, die Mütter", "mother", "die Mutter · die Mütter", "Meine Mutter heißt Eva.", "My mother's name is Eva."],
        ["vater", "der Vater, die Väter", "father", "der Vater · die Väter", "Mein Vater wohnt in Köln.", "My father lives in Cologne."],
        ["eltern", "die Eltern", "parents", "die Eltern · nur Plural", "Meine Eltern sind in Berlin.", "My parents are in Berlin."],
        ["schwester", "die Schwester, die Schwestern", "sister", "die Schwester · die Schwestern", "Meine Schwester ist zwanzig.", "My sister is twenty."],
        ["bruder", "der Bruder, die Brüder", "brother", "der Bruder · die Brüder", "Mein Bruder heißt Amir.", "My brother's name is Amir."],
        ["freundin", "die Freundin, die Freundinnen", "female friend / girlfriend", "die Freundin · die Freundinnen", "Das ist meine Freundin Aylin.", "That is my friend Aylin."],
        ["freund", "der Freund, die Freunde", "male friend / boyfriend", "der Freund · die Freunde", "Das ist mein Freund Noah.", "That is my friend Noah."],
        ["kind", "das Kind, die Kinder", "child", "das Kind · die Kinder", "Das Kind heißt Leo.", "The child's name is Leo."],
        ["mein", "mein · meine", "my", "mein Bruder · meine Schwester", "Meine Familie wohnt hier.", "My family lives here."],
        ["wer", "Wer ist das?", "Who is that?", "Wer ist das?", "Wer ist das auf dem Foto?", "Who is that in the photo?"],
        ["zusammen", "zusammen", "together", "zusammen sein · zusammen wohnen", "Wir wohnen zusammen.", "We live together."],
        ["grossmutter", "die Großmutter, die Großmütter", "grandmother", "die Großmutter · die Großmütter", "Meine Großmutter lebt in Hamburg.", "My grandmother lives in Hamburg."],
        ["grossvater", "der Großvater, die Großväter", "grandfather", "der Großvater · die Großväter", "Mein Großvater kocht gern.", "My grandfather likes to cook."],
        ["tochter", "die Tochter, die Töchter", "daughter", "die Tochter · die Töchter", "Ihre Tochter ist acht Jahre alt.", "Her daughter is eight years old."],
        ["sohn", "der Sohn, die Söhne", "son", "der Sohn · die Söhne", "Sein Sohn heißt Ben.", "His son's name is Ben."],
        ["partnerin", "die Partnerin, die Partnerinnen", "female partner", "die Partnerin · die Partnerinnen", "Meine Partnerin kommt aus Wien.", "My partner comes from Vienna."],
        ["partner", "der Partner, die Partner", "male partner", "der Partner · die Partner", "Mein Partner spricht Deutsch.", "My partner speaks German."],
        ["allein", "allein", "alone", "allein leben", "Ich lebe allein.", "I live alone."],
        ["besuchen", "besuchen", "to visit", "jemanden besuchen", "Am Sonntag besuche ich meine Eltern.", "I visit my parents on Sunday."]
      ],
      input: [
        "Das ist meine Familie. Meine Mutter heißt Eva, und mein Vater heißt Thomas. Meine Schwester Lina ist zwanzig. Wir wohnen nicht alle zusammen.",
        "Wie heißt die Schwester?", ["Sie heißt Lina.", "Lina."],
        "Auf dem Foto sind Amir und seine Familie. Links steht seine Mutter. Neben ihr steht sein Vater. Amir hat eine Schwester und einen Bruder. Seine Großeltern wohnen in einer anderen Stadt.",
        "Wie viele Geschwister hat Amir?", ["Er hat zwei Geschwister.", "Zwei."]
      ],
      writingPrompt: "Describe four people who matter to an invented person.",
      guide: ["Introduce the person", "Name at least three relationships", "Give two names or ages", "Say where one person lives"],
      required: ["Familie", "mein", "heißt", "wohnt"],
      model: "Das ist meine Familie. Meine Mutter heißt Eva und wohnt in Bonn. Mein Vater heißt Thomas. Meine Schwester Lina ist zwanzig Jahre alt. Mein Freund Noah wohnt in Berlin. Am Sonntag besuchen wir meine Eltern.",
      speakingPrompt: "Describe a family photo with names and relationships.",
      speakingGuide: ["Begin with Das ist", "Name three people", "Use mein or meine", "Give one age or city"],
      speakingRequired: ["das ist", "mein", "heißt"],
      speakingModel: "Das ist meine Familie. Meine Mutter heißt Eva. Mein Vater heißt Thomas. Das ist meine Schwester Lina. Sie ist zwanzig Jahre alt und wohnt in Bonn.",
      culture: ["Many kinds of family", "German family vocabulary is used for biological, adoptive, blended, and chosen families. People often describe the relationship that matters in the current conversation.", ["Familie", "Freunde", "Beziehungen"]]
    },
    {
      id: "a0-food-drinks", level: "A0", code: "A0.21", title: "Food, drinks, and simple choices", subtitle: "Name everyday food and say what you want, like, or need.",
      scenario: "You choose a simple breakfast and drink.",
      canDo: ["Name common food and drinks", "Say what you would like", "Say what you like or dislike", "Ask for one item politely"],
      grammar: [
        ["Polite choice with möchten", "Use ich möchte for a friendly everyday request.", "Ich möchte einen Tee, bitte.", "I would like a tea, please."],
        ["Accusative articles", "Masculine der changes to einen after möchten or nehmen. Feminine die becomes eine and neuter das becomes ein.", "einen Apfel · eine Banane · ein Brot", "an apple · a banana · a loaf of bread"],
        ["Preferences with gern", "Use gern after a verb to say that you like doing or having something.", "Ich trinke gern Kaffee.", "I like drinking coffee."]
      ],
      words: [
        ["essen", "das Essen", "food / meal", "das Essen", "Das Essen ist warm.", "The food is warm."],
        ["wasser", "das Wasser", "water", "das Wasser", "Ich trinke Wasser.", "I drink water."],
        ["kaffee", "der Kaffee", "coffee", "der Kaffee", "Ich möchte einen Kaffee, bitte.", "I would like a coffee, please."],
        ["tee", "der Tee", "tea", "der Tee", "Der Tee ist heiß.", "The tea is hot."],
        ["brot", "das Brot, die Brote", "bread", "das Brot · die Brote", "Ich esse Brot zum Frühstück.", "I eat bread for breakfast."],
        ["apfel", "der Apfel, die Äpfel", "apple", "der Apfel · die Äpfel", "Ich nehme einen Apfel.", "I will take an apple."],
        ["banane", "die Banane, die Bananen", "banana", "die Banane · die Bananen", "Die Banane ist gelb.", "The banana is yellow."],
        ["kaese", "der Käse", "cheese", "der Käse", "Ich esse gern Käse.", "I like eating cheese."],
        ["moechten", "möchten", "would like", "ich möchte · du möchtest", "Ich möchte frühstücken.", "I would like to have breakfast."],
        ["essen-verb", "essen", "to eat", "essen · ich esse · du isst", "Ich esse einen Apfel.", "I am eating an apple."],
        ["trinken", "trinken", "to drink", "trinken · ich trinke", "Was möchtest du trinken?", "What would you like to drink?"],
        ["gern", "gern", "gladly / like to", "gern essen · gern trinken", "Ich trinke gern Tee.", "I like drinking tea."],
        ["milch", "die Milch", "milk", "die Milch", "Der Kaffee ist mit Milch.", "The coffee has milk."],
        ["saft", "der Saft, die Säfte", "juice", "der Saft · die Säfte", "Zum Frühstück trinke ich Saft.", "I drink juice at breakfast."],
        ["ei", "das Ei, die Eier", "egg", "das Ei · die Eier", "Ich esse ein Ei.", "I eat an egg."],
        ["butter", "die Butter", "butter", "die Butter", "Die Butter steht auf dem Tisch.", "The butter is on the table."],
        ["muesli", "das Müsli, die Müslis", "muesli", "das Müsli · die Müslis", "Morgens esse ich Müsli.", "I eat muesli in the morning."],
        ["hungrig", "hungrig", "hungry", "hungrig sein", "Ich bin hungrig.", "I am hungry."],
        ["durstig", "durstig", "thirsty", "durstig sein", "Nach dem Sport bin ich durstig.", "I am thirsty after exercise."],
        ["ohne", "ohne", "without", "ohne Milch · ohne Zucker", "Den Tee nehme ich ohne Zucker.", "I take the tea without sugar."]
      ],
      input: [
        "Mina frühstückt um acht Uhr. Sie isst Brot mit Käse und einen Apfel. Dazu trinkt sie Tee ohne Zucker.",
        "Was trinkt Mina?", ["Sie trinkt Tee.", "Tee."],
        "Frühstücksangebot: Brot mit Käse, ein Ei, Müsli mit Milch, Kaffee, Tee oder Saft. Wasser ist kostenlos. Bitte bestellen Sie an der Theke.",
        "Welche Getränke gibt es?", ["Es gibt Kaffee, Tee, Saft und Wasser.", "Kaffee, Tee, Saft und Wasser."]
      ],
      writingPrompt: "Write a simple breakfast order and add two preferences.",
      guide: ["Use ich möchte", "Name one food and one drink", "Use bitte", "Add one item with mit or ohne"],
      required: ["möchte", "bitte", "esse", "trinke"],
      model: "Guten Morgen. Ich möchte ein Brot mit Käse und einen Apfel, bitte. Dazu trinke ich einen Tee ohne Zucker. Ich esse gern Obst, aber ich trinke keinen Kaffee.",
      speakingPrompt: "Order a simple breakfast and say what you like.",
      speakingGuide: ["Greet the person", "Order one food", "Order one drink", "Use bitte and gern"],
      speakingRequired: ["möchte", "bitte", "gern"],
      speakingModel: "Guten Morgen. Ich möchte ein Brot mit Käse und einen Tee, bitte. Den Tee nehme ich ohne Zucker. Ich esse gern Obst.",
      culture: ["Breakfast varies by household", "Breakfast in German-speaking regions may be small or substantial. Bread, rolls, cheese, jam, muesli, coffee, and tea are common choices, with wide regional and personal variation.", ["Frühstück", "Bestellen", "Vorlieben"]]
    }
  ];

  const existingModuleIds = new Set(course.modules.map(module => module.id));
  const existingCodes = new Set(course.modules.map(module => module.code));
  const added = specs.map(spec => {
    if (existingModuleIds.has(spec.id)) throw new Error(`Duplicate pathway module id: ${spec.id}`);
    if (existingCodes.has(spec.code)) throw new Error(`Duplicate pathway module code: ${spec.code}`);
    if (spec.words.length !== 20) throw new Error(`${spec.id} needs exactly 20 vocabulary bundles, found ${spec.words.length}`);
    existingModuleIds.add(spec.id);
    existingCodes.add(spec.code);
    return makeModule(spec);
  });

  const wordIds = new Set();
  added.forEach(module => {
    module.words.forEach(word => {
      const globalId = `${module.id}:${word.id}`;
      if (wordIds.has(globalId)) throw new Error(`Duplicate pathway word id: ${globalId}`);
      wordIds.add(globalId);
    });
  });

  course.modules.push(...added);
})();
