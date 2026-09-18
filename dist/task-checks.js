(function () {
  const course = window.SATZWERK_CURRICULUM;
  if (!course?.modules) throw new Error("Satzwerk curriculum must load before task checks");

  const re = (label, pattern, flags = "iu") => ({ label, type: "regex", pattern, flags });
  const distinct = (label, pattern, min, flags = "iu") => ({ label, type: "distinctRegexCount", pattern, min, flags });
  const count = (label, pattern, min, flags = "iu") => ({ label, type: "regexCount", pattern, min, flags });
  const sentences = (label, valueOrRange) => ({ label, type: "sentenceCount", ...(typeof valueOrRange === "number" ? { value: valueOrRange } : valueOrRange) });
  const lines = (label, valueOrRange) => ({ label, type: "lineCount", ...(typeof valueOrRange === "number" ? { value: valueOrRange } : valueOrRange) });
  const questions = (label, min) => ({ label, type: "questionCount", min });

  const checks = {
    "a1-people-family-work": [
      sentences("Write five sentence units", 5),
      re("Give the person's name", "(?:hei(?:ß|ss)e|Name\\s+ist|^[A-ZÄÖÜ][\\p{L}-]+\\s+ist)", "imu"),
      re("Name a city or place of residence", "\\b(?:wohn|leb)[\\p{L}]*\\b"),
      re("Include family or household information", "\\b(?:Familie|Eltern|Mutter|Vater|Schwester|Bruder|Partner|Partnerin|Tochter|Sohn|Kind)\\b"),
      re("State a profession", "\\b(?:arbeit[\\p{L}]*\\s+als|ist\\s+(?:ein|eine)?\\s*[A-ZÄÖÜ][\\p{L}-]+(?:in)?)\\b"),
      distinct("Use at least two possessive forms", "\\b(?:mein(?:e|en|er|es|em)?|dein(?:e|en|er|es|em)?|sein(?:e|en|er|es|em)?|ihr(?:e|en|er|es|em)?)\\b", 2)
    ],
    "a1-daily-routine": [
      distinct("Give at least five time markers", "\\b(?:um\\s+(?:\\d{1,2}(?::\\d{2})?|[a-zäöüß]+)|halb\\s+[a-zäöüß]+|morgens|vormittags|mittags|nachmittags|abends|am Abend)\\b", 5),
      re("Use a separable verb", "\\b(?:steh[\\p{L}]*[^.!?]{0,35}auf|kauf[\\p{L}]*[^.!?]{0,35}ein|ruf[\\p{L}]*[^.!?]{0,35}an|fang[\\p{L}]*[^.!?]{0,35}an)\\b"),
      re("Use a modal verb", "\\b(?:muss|kann|möchte|moechte|will|darf)\\b"),
      distinct("Begin at least two clauses with time or sequence", "(?:^|[.!?]\\s+)(?:Zuerst|Dann|Danach|Um\\s+[^,!.?]+|Am Abend|Nachmittags)", 2, "imu")
    ],
    "a1-food-shopping": [
      lines("Use a shopping list plus at least six exchange lines", { min: 7 }),
      re("Include a shopping-list section", "\\b(?:Einkaufsliste|Liste)\\s*:"),
      distinct("Use at least two quantities", "\\b(?:ein(?:e|en)?|zwei|drei|ein Kilo|eine Flasche|ein Glas|eine Tasse)\\b", 2),
      re("Use a quantity container", "\\b(?:Kilo|Flasche|Glas|Tasse|Packung)\\b"),
      re("Ask the price", "\\b(?:Was|Wie viel)\\s+kost[\\p{L}]*\\b"),
      re("Close politely", "\\b(?:Danke|Auf Wiedersehen|Tschüss|Tschuess)\\b")
    ],
    "a1-home-and-town": [
      sentences("Write six sentence units", 6),
      distinct("Name at least two pieces of furniture", "\\b(?:Tisch|Schrank|Sofa|Stuhl|Bett|Lampe|Regal)\\b", 2),
      distinct("Use two fixed dative locations", "\\b(?:auf dem|an der|in der|neben der|vor dem|über dem|ueber dem|unter dem)\\b", 2),
      re("Describe movement toward a destination", "\\b(?:stell|leg|häng|haeng)[\\p{L}]*\\b[^.!?]{0,60}\\b(?:auf den|an die|in den|neben das|vor die|über das|ueber das)\\b"),
      re("Include a color", "\\b(?:rot|blau|grün|gruen|gelb|schwarz|weiß|weiss|bunt)[\\p{L}]*\\b"),
      distinct("Use precise position and movement verbs", "\\b(?:steht|liegt|hängt|haengt|stelle|lege|hänge|haenge)\\b", 2)
    ],
    "a1-plans-and-leisure": [
      re("Open with a greeting", "^(?:Hallo|Liebe[rn]?)\\b", "imu"),
      re("Name a day", "\\b(?:Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag|Wochenende)\\b"),
      re("Give a time", "\\b(?:um\\s+\\d{1,2}(?::\\d{2})?\\s*Uhr|gegen\\s+\\d{1,2}\\s*Uhr)\\b"),
      re("Name the meeting place", "\\b(?:bei mir|in meiner Wohnung|im (?:Park|Kino|Café|Cafe|Restaurant)|am Bahnhof|vor dem [A-ZÄÖÜ][\\p{L}-]+|bei der [A-ZÄÖÜ][\\p{L}-]+)\\b"),
      re("Name an activity", "\\b(?:Film|kochen|spielen|essen|trinken|Konzert|Party|Picknick|treffen)\\b"),
      re("Ask for a reply", "\\b(?:Bescheid|antwort|meld)[\\p{L}]*\\b"),
      re("Close naturally", "\\b(?:Viele Grüße|Liebe Grüße|Bis bald|Tschüss|Tschuess)\\b")
    ],
    "a1-travel-and-services": [
      re("Use a suitable greeting", "^(?:Guten Tag|Hallo|Sehr geehrte)\\b", "imu"),
      re("Give your name", "\\b(?:mein Name ist|ich hei(?:ß|ss)e)\\b"),
      re("Give the arrival day or date", "\\b(?:am\\s+(?:Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)|von\\s+\\w+\\s+bis\\s+\\w+|\\d{1,2}\\.\\s*\\w+)\\b"),
      re("Mention the reservation", "\\bReservier[\\p{L}]*\\b"),
      questions("Ask at least one question", 1),
      re("Close politely", "\\b(?:Vielen Dank|Mit freundlichen Grüßen|Freundliche Grüße)\\b")
    ],
    "a1-health-past-checkpoint": [
      sentences("Write six sentence units", 6),
      re("Name where you were", "\\b(?:war|waren)\\b[^.!?]{0,50}\\b(?:in|bei|am)\\b"),
      distinct("Use at least two completed-action forms", "\\b(?:habe|hat|haben|bin|ist|sind)\\b[^.!?]{0,55}\\b(?:ge[\\p{L}]+|besucht|gesehen|gegessen|gefahren)\\b", 2),
      re("Describe the weather", "\\b(?:Wetter|kalt|warm|windig|regnerisch|Sonne|geregnet|geschneit)\\b"),
      re("Say how you feel now", "\\b(?:fühle|fuehle|müde|muede|krank|gut|schlecht|Energie)\\b"),
      re("Give a plan", "\\b(?:morgen|möchte|moechte|werde|plane)\\b"),
      re("Connect contrasting details with aber", "\\baber\\b")
    ],
    "a1-public-transport-tickets": [
      re("Use Ich hätte gern", "\\bIch\\s+hätte\\s+gern\\b|\\bIch\\s+haette\\s+gern\\b"),
      re("Name the destination", "\\bnach\\s+[A-ZÄÖÜ][\\p{L}-]+\\b"),
      re("Choose a one-way or return ticket", "\\b(?:einfache Fahrt|Hin- und Rückfahrt|Hin- und Rueckfahrt|hin und zurück|hin und zurueck)\\b"),
      questions("Ask the required travel questions", 3),
      re("Ask the price", "\\b(?:kost[\\p{L}]*|Preis)\\b"),
      re("Ask for the platform", "\\bGleis\\b"),
      re("Ask about changing trains", "\\bumsteigen\\b"),
      re("Close politely", "\\b(?:Danke|Vielen Dank|Auf Wiedersehen)\\b")
    ],
    "a1-restaurant-needs-payment": [
      re("Ask for the menu with Könnte ich", "\\bK(?:ö|oe)nnte ich\\b[^?]{0,60}\\bSpeisekarte\\b"),
      re("Order a drink", "\\b(?:Wasser|Kaffee|Tee|Saft|Bier|Wein)\\b"),
      re("Order a dish", "\\b(?:Suppe|Salat|Gericht|Schnitzel|Nudeln|Pizza|Essen)\\b"),
      re("State a dietary need", "\\b(?:vegetarisch|vegan|Allergie|ohne|vertrage)\\b"),
      re("Ask for the bill", "\\b(?:Rechnung|zahlen)\\b"),
      re("Ask for a recommendation", "\\bempfehl[\\p{L}]*\\b"),
      re("Choose together or separate payment", "\\b(?:zusammen|getrennt)\\b"),
      re("Close politely", "\\b(?:Danke|Vielen Dank|Auf Wiedersehen)\\b")
    ],
    "a1-clothing-fit-returns": [
      re("Ask for a blue sweater in size M", "\\bblau[\\p{L}]*\\b[^.!?]{0,80}\\b(?:Pullover|Größe M|Groesse M)\\b"),
      re("Ask to try it on", "\\banprobier[\\p{L}]*\\b"),
      re("Explain that it is too large", "(?:\\bpasst nicht\\b|\\bzu groß|\\bzu gross\\b)"),
      re("Ask for size S", "\\b(?:Größe|Groesse)\\s*S\\b"),
      re("Use a request form", "\\b(?:Haben Sie|Könnte ich|Koennte ich|Ich hätte gern|Ich haette gern)\\b")
    ],
    "a1-pharmacy-doctor-basics": [
      re("Use a suitable greeting", "^(?:Guten Tag|Hallo|Sehr geehrte)\\b", "imu"),
      distinct("Name two different symptoms", "\\b(?:Fieber|Husten|Halsschmerzen|Kopfschmerzen|Bauchschmerzen|Schmerzen|Übelkeit|Uebelkeit|Schnupfen)\\b", 2),
      re("Give the duration with seit", "\\bseit\\b"),
      re("State whether you have a fever", "\\b(?:kein(?:e|en)?\\s+Fieber|Fieber)\\b"),
      re("Request an appointment", "\\b(?:Termin\\s+bekommen|Termin\\s+vereinbaren|einen Termin|Könnte ich.*Termin|Koennte ich.*Termin)\\b"),
      re("Close politely", "\\b(?:Vielen Dank|Freundliche Grüße|Mit freundlichen Grüßen)\\b")
    ],
    "a1-hotel-checkin-problems": [
      re("Give the reservation name", "\\b(?:Reservierung|gebucht)\\b[^.!?]{0,80}\\b(?:Name|Namen)\\b|\\bauf den Namen\\b"),
      re("Name the room type", "\\b(?:Einzelzimmer|Doppelzimmer|Zimmer)\\b"),
      distinct("Report two different room problems", "\\b(?:fehlt|funktioniert nicht|kann die Tür nicht öffnen|kann die Tuer nicht oeffnen|kaputt|kein(?:e|en)?)\\b", 2),
      distinct("Request two solutions", "\\b(?:bekommen|bringen|geben|schicken|neue Schlüsselkarte|neue Schluesselkarte|reparieren)\\b", 2),
      re("Close politely", "\\b(?:Vielen Dank|Freundliche Grüße|Mit freundlichen Grüßen)\\b")
    ],

    "a2-erlebnisse": [
      sentences("Write five to seven sentences", { min: 5, max: 7 }),
      re("Use a movement verb with sein", "\\b(?:bin|ist|sind)\\b[^.!?]{0,55}\\b(?:gefahren|gegangen|gekommen|geflogen)\\b"),
      re("Use a separable completed verb", "\\b(?:aufgestanden|eingekauft|angerufen|aufgeräumt|aufgeraeumt)\\b"),
      distinct("Use at least three sequence markers", "\\b(?:zuerst|dann|danach|später|spaeter|schließlich|schliesslich|am Ende)\\b", 3)
    ],
    "a2-wohnung-raum": [
      sentences("Write four locations and two movements", 6),
      count("Use four fixed dative locations", "(?:\\b(?:vor dem|auf dem|neben der|in der|an der|unter dem)\\b|über dem|ueber dem)", 4),
      count("Use two accusative destinations", "\\b(?:auf den|an die|in den|neben das|vor die|unter den)\\b", 2),
      distinct("Move two different objects", "\\b(?:Lampe|Bild|Buch|Stuhl|Tisch|Pflanze|Kiste)\\b", 2),
      distinct("Use two movement verbs", "\\b(?:stelle|lege|hänge|haenge)\\b", 2)
    ],
    "a2-termine-plaene": [
      re("Cancel the original appointment", "\\b(?:absagen|verschieben|kann.*nicht)\\b"),
      re("Give a reason", "\\b(?:weil|da)\\b"),
      distinct("Propose two precise alternative times", "\\b(?:Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)\\b[^.!?]{0,30}\\b(?:\\d{1,2}(?::\\d{2})?\\s*Uhr)\\b", 2),
      re("Ask for confirmation or a reply", "\\b(?:Passt|Bescheid|bestätig|bestaetig|Rückmeldung|Rueckmeldung)\\b")
    ],
    "a2-gesundheit": [
      distinct("Name two different symptoms", "\\b(?:Fieber|Husten|Halsschmerzen|Kopfschmerzen|Bauchschmerzen|Schmerzen|Übelkeit|Uebelkeit|Schnupfen)\\b", 2),
      re("Give the duration with seit", "\\bseit\\b"),
      re("Request an appointment", "\\b(?:Termin\\s+bekommen|Termin\\s+vereinbaren|einen Termin)\\b"),
      questions("Ask at least one question", 1),
      re("Give your availability", "\\b(?:Vormittag|Nachmittag|erreichbar|jederzeit|ab\\s+\\d{1,2})\\b"),
      re("Close formally", "\\b(?:Freundliche Grüße|Mit freundlichen Grüßen|Vielen Dank)\\b")
    ],
    "a2-arbeit-lernen": [
      re("Ask a colleague for help", "\\b(?:könntest du|koenntest du|kannst du|hilf mir|Hilfe)\\b"),
      re("Name the task or document", "\\b(?:Bericht|Datei|Tabelle|Aufgabe|Dokument|Projekt)\\b"),
      re("Give a deadline", "\\b(?:bis\\s+(?:Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)|bis\\s+\\d{1,2}\\s*Uhr)\\b"),
      re("Thank the colleague", "\\bDanke\\b")
    ],
    "a2-unterwegs": [
      re("Compare duration", "\\b(?:Stunde|Minuten|dauert|schneller|langsamer)\\b"),
      re("Compare transfers", "\\b(?:umsteigen|direkt|Umstieg)\\b"),
      re("Compare price", "\\b(?:Euro|günstiger|guenstiger|teurer|kostet)\\b"),
      re("Compare comfort", "\\b(?:bequem|bequemer|angenehm|angenehmer)\\b"),
      distinct("Use two comparative forms", "\\b(?:schneller|langsamer|günstiger|guenstiger|teurer|bequemer|angenehmer)\\b", 2),
      re("Make a final choice", "\\b(?:wähle|waehle|entscheide mich|nehme)\\b"),
      re("Give two concrete reasons", "\\b(?:direkt|ohne.*umsteigen|günstiger|guenstiger|bequemer|angenehmer|kürzer|kuerzer)\\b[^.!?]*\\b(?:und|außerdem|ausserdem|weil)\\b")
    ],
    "a2-einkaufen-service": [
      re("Identify the item", "\\b(?:Pullover|Jacke|Hose|Schuhe|Artikel)\\b"),
      re("Describe the fit or defect", "\\b(?:zu klein|zu groß|zu gross|kaputt|defekt|passt nicht)\\b"),
      re("Mention the receipt", "\\bKassenbon\\b"),
      re("Use a dieser form", "\\b(?:diesen|diese|dieser|dieses)\\b"),
      distinct("Use at least two adjective forms", "\\b(?:schwarz(?:e|en|er|es)?|weich(?:e|en|er|es)?|groß(?:e|en|er|es)?|gross(?:e|en|er|es)?|blau(?:e|en|er|es)?)\\b", 2),
      re("Request a solution", "\\b(?:umtauschen|schicken|ersetzen|zurückgeben|zurueckgeben|hätte gern|haette gern)\\b")
    ],
    "a2-einladen-meinen": [
      re("Accept or decline clearly", "\\b(?:komme gern|kann leider nicht|nehme.*an|sage.*ab)\\b"),
      re("Give a reason", "\\b(?:weil|da|dass)\\b"),
      questions("Ask one practical question", 1),
      re("Offer to bring something", "\\b(?:mitbringen|bringe|mitnehmen)\\b"),
      re("Close naturally", "\\b(?:Liebe Grüße|Viele Grüße|Bis bald)\\b")
    ],
    "a2-housing-search": [
      re("Introduce yourself", "\\b(?:ich hei(?:ß|ss)e|mein Name ist|ich arbeite|ich bin)\\b"),
      re("State when you want to move in", "(?:\\b(?:einziehen|Einzug)\\b[^.!?]{0,60}\\b(?:\\d{1,2}\\.|Mai|Juni|Juli|August|September|Oktober|November|Dezember)\\b|\\b(?:\\d{1,2}\\.|Mai|Juni|Juli|August|September|Oktober|November|Dezember)\\b[^.!?]{0,60}\\b(?:einziehen|Einzug)\\b)"),
      questions("Ask at least two questions", 2),
      re("Ask about the deposit", "\\bKaution\\b"),
      re("Ask for a viewing at a specific time", "\\bBesichtigung\\b[^.!?]{0,60}\\b(?:\\d{1,2}(?::\\d{2})?\\s*Uhr|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag)\\b"),
      re("Close politely", "\\b(?:Freundliche Grüße|Mit freundlichen Grüßen|Vielen Dank)\\b")
    ],
    "a2-work-schedules": [
      re("Name the Friday shift", "\\bFreitag\\b[^.!?]{0,60}\\bSchicht\\b|\\bSchicht\\b[^.!?]{0,60}\\bFreitag\\b"),
      re("State that you cannot work the shift", "\\b(?:kann.*nicht|leider nicht|nicht übernehmen|nicht uebernehmen)\\b"),
      re("Give a reason", "\\b(?:weil|da)\\b"),
      re("Describe a concrete swap or cover solution", "\\b(?:Tausch|tausch|übernimmt|uebernimmt|übernehme|uebernehme|Kolleg|Leon)\\b"),
      re("Ask for confirmation", "\\b(?:in Ordnung|bestätig|bestaetig|Rückmeldung|Rueckmeldung)\\b"),
      re("Use a greeting and closing", "^(?:Guten|Hallo)[\\s\\S]*\\b(?:Viele Grüße|Freundliche Grüße|Mit freundlichen Grüßen)\\b", "imu")
    ],
    "a2-public-appointments": [
      re("Name the public service", "\\b(?:Wohnsitz|anmelden|Anmeldung|Ausweis|Ummeldung)\\b"),
      re("Use an um zu purpose clause", "\\bum\\b[^.!?]{0,80}(?:\\bzu\\s+[\\p{L}-]+|\\b[\\p{L}-]*zu[\\p{L}-]+\\b)"),
      re("Request an appointment", "\\b(?:brauche|möchte|moechte|Können Sie|Koennen Sie)\\b[^.!?]{0,60}\\bTermin\\b"),
      questions("Ask about documents and fees", 2),
      re("Ask about required documents", "\\b(?:Unterlagen|Dokumente|Nachweise)\\b"),
      re("Ask about fees", "\\b(?:Gebühr[\\p{L}]*|Gebuehr[\\p{L}]*|Kosten)\\b"),
      re("State an unavailable time", "\\b(?:kann.*nicht|leider nicht|nicht möglich|nicht moeglich)\\b"),
      re("Close with a full name", "\\b(?:Freundliche Grüße|Mit freundlichen Grüßen)\\s+[A-ZÄÖÜ][\\p{L}-]+\\s+[A-ZÄÖÜ][\\p{L}-]+", "iu")
    ],
    "a2-travel-disruptions": [
      re("Give the travel date and route", "\\b\\d{1,2}\\.\\s*[A-ZÄÖÜ][\\p{L}]+\\b[^.!?]{0,80}\\bvon\\s+[A-ZÄÖÜ][\\p{L}-]+\\s+nach\\s+[A-ZÄÖÜ][\\p{L}-]+\\b"),
      re("Explain the disruption and missed connection", "\\b(?:Verspätung|Verspaetung|Ausfall)\\b[^.!?]{0,100}\\bAnschluss\\b"),
      re("State that you want to continue", "\\b(?:fortsetzen|weiterreisen|noch heute reisen)\\b"),
      re("Request rebooking", "\\bumbuch[\\p{L}]*\\b"),
      re("Request written confirmation", "\\b(?:schriftlich|bestätigen|bestaetigen)\\b")
    ],

    "b1-erzaehlen": [
      re("Establish the background", "\\b(?:war|wollte|regnete|früher|frueher)\\b"),
      re("Include a surprise", "\\b(?:plötzlich|ploetzlich|unerwartet|auf einmal)\\b"),
      re("Use Plusquamperfekt for an earlier event", "\\b(?:hatte|war)\\b[^.!?]{0,70}\\b(?:ge[\\p{L}]+|stehen lassen|vergessen)\\b"),
      re("Give the story a clear ending", "\\b(?:Am Ende|Schließlich|Schliesslich|Zum Glück|Zum Glueck)\\b")
    ],
    "b1-wohnen-nachbarschaft": [
      re("Describe the building problem", "\\b(?:Treppenhaus|Fluchtweg|Fahrrad|blockier|Problem)\\b"),
      re("Explain the effect", "\\b(?:deshalb|dadurch|lässt sich|laesst sich|kann.*nicht)\\b"),
      re("Mention earlier contact", "\\b(?:bereits|gestern|schon)\\b[^.!?]{0,80}\\b(?:gesprochen|gemeldet|angerufen)\\b"),
      re("Propose a solution", "\\b(?:Könnten Sie|Koennten Sie|sollte|Lösung|Loesung)\\b")
    ],
    "b1-beruf-bildung": [
      re("Name the position", "\\bStelle\\b[^.!?]{0,50}\\b(?:Kundenservice|Projektassistenz|als)\\b"),
      distinct("Give at least two qualifications", "\\b(?:Erfahrung|arbeite|verantwortlich|Umgang|Weiterbildung|Kenntnisse|koordiniere|kommuniziere)\\b", 2),
      re("Explain your motivation", "\\b(?:interessiert|reizt|möchte|moechte)\\b"),
      re("Request an interview", "\\bVorstellungsgespräch\\b|\\bVorstellungsgespraech\\b")
    ],
    "b1-medien-information": [
      re("Identify or attribute the source", "\\b(?:Quelle|laut|Website|Meldung|Gruppenchat)\\b"),
      re("Separate confirmed facts", "\\b(?:bestätigt|bestaetigt|gilt|offiziell)\\b"),
      re("Mark uncertain details", "\\b(?:unklar|weiß nicht|weiss nicht|offen bleibt|möglicherweise|moeglicherweise)\\b"),
      re("Name a verification step", "\\b(?:überprüfen|ueberpruefen|anrufen|Originalmeldung|nachfragen)\\b")
    ],
    "b1-umwelt-mobilitaet": [
      re("Explain the current problem", "\\b(?:fehlen|Problem|gefährlich|gefaehrlich|Lärm|Laerm|Abgase)\\b"),
      re("Describe the proposed change", "\\b(?:wird|werden|sollen|Maßnahme|Massnahme)\\b"),
      re("State the expected result", "\\b(?:dadurch|damit|sodass|Ergebnis)\\b"),
      re("Include a way to evaluate the result", "\\b(?:auswert|Umfrage|Statistik|Daten)\\b")
    ],
    "b1-gesund-leben": [
      distinct("Give three distinct pieces of advice", "\\b(?:würde|wuerde|könntest|koenntest|solltest|wäre|waere)\\b", 3),
      re("Explain why at least one suggestion helps", "\\b(?:weil|damit|dadurch)\\b")
    ],
    "b1-engagement": [
      re("Explain the project's goal", "\\b(?:Ziel|soll|möchte|moechte)\\b"),
      distinct("Describe at least two activities", "\\b(?:kümmern|kuemmern|reparieren|organisieren|vorbereiten|anbauen|pflegen)\\b", 2),
      re("Give a meeting time", "\\b(?:Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)\\b[^.!?]{0,45}\\b\\d{1,2}(?::\\d{2})?\\s*Uhr\\b"),
      re("Explain how to join", "\\b(?:anmelden|teilnehmen|Treffen|E-Mail)\\b")
    ],
    "b1-argumentieren": [
      re("State a clear position", "\\b(?:Meiner Meinung nach|ich halte|ich bin dafür|ich bin dafuer)\\b"),
      distinct("Give two reasons", "\\b(?:Erstens|Zweitens|Ein Grund|Außerdem|Ausserdem)\\b", 2),
      re("Acknowledge a concern", "\\b(?:allerdings|einerseits|Einwand|trotz)\\b"),
      re("Propose a compromise", "\\b(?:Kompromiss|schlage ich|könnte|koennte)\\b")
    ],
    "b1-job-applications": [
      re("Name the project assistant role", "\\bProjektassistenz\\b"),
      distinct("Connect two skills or experiences to the duties", "\\b(?:koordiniere|bereite|kommuniziere|Erfahrung|strukturierte Arbeitsweise|Fristen|Kunden)\\b", 2),
      re("Explain your motivation", "\\b(?:reizt|interessiert|möchte|moechte)\\b"),
      re("Mention the attached CV", "\\b(?:Lebenslauf|Anhang)\\b"),
      re("Request an interview", "\\b(?:Gespräch|Gespraech|Vorstellungsgespräch|Vorstellungsgespraech)\\b")
    ],
    "b1-housing-repairs": [
      re("Use a subject line", "^Betreff\\s*:", "imu"),
      re("Describe the defect", "\\b(?:Heizung|Mangel|defekt|kalt)\\b"),
      distinct("Give the start date and first-report date", "\\b\\d{1,2}\\.\\s*(?:Januar|Februar|März|Maerz|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)\\b", 2),
      re("Explain the impact", "\\b(?:beeinträchtigt|beeintraechtigt|Raumtemperatur|Nutzung)\\b"),
      re("Name attached evidence", "\\b(?:Foto|Anhang|Thermometer)\\b"),
      re("Request inspection or repair by a date", "(?:(?:überprüfen|ueberpruefen|reparieren)\\b[^.!?]{0,70}\\bbis zum\\b|\\bbis zum\\b[^.!?]{0,70}(?:überprüfen|ueberpruefen|reparieren)\\b)"),
      re("Give access times", "\\b(?:Zugang|werktags|nach Absprache)\\b"),
      re("Request written confirmation", "\\b(?:schriftlich|bestätigen|bestaetigen)\\b")
    ],
    "b1-media-comparison": [
      re("State the shared topic", "\\b(?:beide|gemeinsam|überein|ueberein|Thema)\\b"),
      re("Summarize source A and source B", "(?=[\\s\\S]*\\bQuelle A\\b)(?=[\\s\\S]*\\bQuelle B\\b)"),
      distinct("Mention evidence from both sources", "\\b(?:Zahl|Prozent|Bericht|Umfrage|Beleg|Daten|Statistik)\\b", 2),
      re("Identify a limitation or evidence gap", "(?:\\b(?:Einschränkung|Einschraenkung|unklar|fehlt|begrenzt|Aussagekraft)\\b|schwer einordnen|weder[^.!?]{0,100}noch|nicht (?:erklärt|erklaert|veröffentlicht|veroeffentlicht))"),
      re("Attribute claims", "\\b(?:laut|zufolge|berichtet|erklärt|erklaert|behauptet)\\b"),
      questions("Finish with a question to investigate", 1)
    ],
    "b1-healthcare-decisions": [
      re("Name the main symptom and onset", "(?:\\b(?:Schmerz|Beschwerde)[\\p{L}]*\\b[^.!?]{0,100}\\b(?:seit|begann)\\b|\\b(?:seit|begann)\\b[^.!?]{0,100}\\b(?:Schmerz|Beschwerde)[\\p{L}]*\\b)"),
      re("Give an intensity", "\\b(?:\\d{1,2}\\s+von\\s+zehn|stark|leicht|mittel)\\b"),
      re("Describe how it changed", "\\b(?:verschlimmert|verbessert|stärker|staerker|schwächer|schwaecher)\\b"),
      re("Say what makes it better or worse", "\\b(?:in Ruhe|beim|wenn|durch)\\b"),
      re("Mention self-care or medication", "\\b(?:gekühlt|gekuehlt|Ibuprofen|Medikament|geschont|Salbe)\\b"),
      questions("Ask two focused questions", 2),
      re("Request an appointment", "\\b(?:Termin|Sprechstunde)\\b")
    ],

    "b2-positionen": [
      re("State a clear position", "\\b(?:ich halte|meiner Ansicht|aus meiner Sicht)\\b"),
      distinct("Give at least two reasons", "\\b(?:erste|erstens|zweitens|außerdem|ausserdem|Vorteil)\\b", 2),
      re("Address a serious objection", "\\b(?:Einwand|Arbeitsdichte|allerdings|Risiko|riskant)\\b"),
      re("State a condition for success", "\\b(?:sofern|wenn|unter der Bedingung|Bedingung)\\b"),
      re("Finish with an assessment", "\\b(?:Aus meiner Sicht|Daraus folgt|Unter diesen Bedingungen|Insgesamt)\\b")
    ],
    "b2-quellen": [
      re("Identify both sources", "(?=[\\s\\S]*\\bQuelle A\\b)(?=[\\s\\S]*\\bQuelle B\\b)"),
      distinct("Mark attributed claims", "\\b(?:zufolge|nach Angaben|berichtet|erklärt|erklaert|sei|habe|liege|betrage)\\b", 2),
      re("Compare agreement and disagreement", "\\b(?:stimmen.*überein|stimmen.*ueberein|widersprechen|während|waehrend)\\b"),
      re("Preserve uncertainty", "\\b(?:unklar|offen|eingeschränkt|eingeschraenkt|müsste|muesste|könnte|koennte)\\b")
    ],
    "b2-prozesse": [
      distinct("Use a clear chronological sequence", "\\b(?:zunächst|anschließend|anschliessend|danach|nach dem|schließlich|schliesslich)\\b", 3),
      distinct("Name at least three process actions", "\\b(?:eingereicht|hochgeladen|geprüft|geprueft|kontrolliert|verschickt|nachgereicht|freigegeben|entschieden|bereitgestellt)\\b", 3),
      re("Clarify responsibility", "\\b(?:zuständig|zustaendig|verantwortlich)\\b")
    ],
    "b2-register": [
      re("Refer to the earlier conversation", "\\b(?:beziehe mich|Gespräch vom|Gespraech vom)\\b"),
      re("Confirm the agreed detail", "\\b(?:bestätige|bestaetige|bestätigen|bestaetigen)\\b"),
      distinct("Request two pieces of information", "\\b(?:Teilnehmerliste|Ausstattung|Mikrofon|Videokonferenz|Rückmeldung|Rueckmeldung)\\b", 2),
      re("Give a deadline and reason", "\\b(?:bis spätestens|bis spaetestens)\\b[\\s\\S]*\\b(?:damit|Nur dann|weil)\\b"),
      re("Use a professional greeting and closing", "^Betreff[\\s\\S]*Sehr geehrte[\\s\\S]*Mit freundlichen Grüßen", "imu")
    ],
    "b2-relativ-partizip": [
      re("Name the people or organizations involved", "\\b(?:Haushalte|Beratungsstellen|Forschungsinstitut|Forschungsteam|Sozialausschuss)\\b"),
      re("Explain the problem", "\\b(?:Kosten|gestiegen|betroffen|Problem)\\b"),
      distinct("Describe at least two introduced measures", "\\b(?:Sprechstunden|Hausbesuche|Informationsabende|Beratung|Zuschüsse|Zuschuesse|Schulungen)\\b", 2),
      re("State an unresolved question", "\\b(?:unklar|offen bleibt|bisher)\\b")
    ],
    "b2-haltung": [
      re("Mark an inference", "\\b(?:dürfte|duerfte|könnte|koennte|deutet)\\b"),
      re("Mark hearsay", "\\b(?:soll|sollen|berichten)\\b"),
      re("Attribute a source's own claim", "\\b(?:will.*beobachtet|Verband.*erklärt|Verband.*erklaert|nach Angaben)\\b"),
      re("State confirmed information", "\\b(?:bestätigt|bestaetigt|lediglich)\\b"),
      re("Give a cautious conclusion", "\\b(?:vorsichtige Schlussfolgerung|bleibt offen|müssten|muessten)\\b")
    ],
    "b2-kohaesion": [
      re("Explain the Repair Café purpose", "(?:Repair Café|Repair Cafe)[\\s\\S]*\\b(?:reparier|defekt)[\\p{L}]*\\b"),
      re("Explain the volunteer role", "\\b(?:Ehrenamtliche|Werkzeug|helfen)\\b"),
      distinct("Give two benefits", "\\b(?:weniger Abfall|Ressourcen|Wissen|Austausch|Nachbarschaft|selbst)\\b", 2),
      re("Name a practical limitation", "\\b(?:allerdings|hängt davon ab|haengt davon ab|nicht garantieren|Ersatzteile)\\b")
    ],
    "b2-integration": [
      re("Define the local issue", "\\b(?:Stadtplatz|Problem|derzeit)\\b"),
      re("Summarize two perspectives", "(?=[\\s\\S]*\\b(?:Geschäftsleute|Geschaeftsleute)\\b)(?=[\\s\\S]*\\b(?:Anwohnende|Seniorenbeirat)\\b)"),
      re("Identify the goal conflict", "\\b(?:Zielkonflikt|zwischen)\\b"),
      re("Propose a feasible measure", "\\b(?:Testphase|Lieferzone|Poller|mobile Bäume|mobile Baeume)\\b"),
      re("Explain a limitation", "\\b(?:Einschränkung|Einschraenkung|Kosten|verlagern)\\b"),
      re("Finish with a supported conclusion", "\\b(?:Daraus lässt sich schließen|Daraus laesst sich schliessen|deshalb)\\b")
    ],
    "b2-verhandlungen": [
      re("Name the agenda item or purpose", "\\b(?:Tagesordnung|Ziel|Zweck|Servicezeiten|Arbeitszeiten)\\b"),
      distinct("Attribute two positions", "\\b(?:Frau Aydin|Herr Vogt|Teamleitung|Projektgruppe)\\b", 2),
      re("Record disagreement", "\\b(?:allerdings|widersprach|lehnte|nicht zustimmen)\\b"),
      re("Record a counterproposal", "\\b(?:Gegenangebot|Gegenvorschlag|schlug.*vor|stattdessen)\\b"),
      re("State the provisional agreement", "\\b(?:einigte|halten fest|Pilotphase)\\b"),
      distinct("Name two conditions", "\\b(?:Übergaberegelung|Uebergaberegelung|Betriebsrat|Dienstpläne|Dienstplaene)\\b", 2),
      re("Assign responsibility", "\\b(?:verantwortlich|Teamleitung|Finanzabteilung)\\b"),
      re("Give a deadline", "(?:\\bbis\\s+(?:zum\\s+)?\\d{1,2}\\.\\s*[A-ZÄÖÜ][\\p{L}]+|\\bam\\s+\\d{1,2}\\.\\s*[A-ZÄÖÜ][\\p{L}]+|\\b(?:spätestens|spaetestens)\\b)"),
      re("Name the open point", "\\b(?:Offen bleibt|noch offen)\\b")
    ],
    "b2-behoerdenpost": [
      re("Use a subject line", "^Betreff\\s*:", "imu"),
      re("Give the decision date and file reference", "\\b\\d{1,2}\\.\\s*[A-ZÄÖÜ][\\p{L}]+\\b[\\s\\S]*\\b(?:Aktenzeichen|BP-482/26)\\b"),
      re("State the authority's reason", "\\b(?:Begründung|Begruendung|abgelehnt|Mietvertrag)\\b"),
      distinct("Present the chronology with dated facts", "\\b(?:\\d{1,2}\\.\\s*Februar|\\d{1,2}\\.\\s*März|Maerz|am selben Tag)\\b", 2),
      re("Request review and revocation", "\\berneut\\s+(?:zu\\s+)?(?:prüfen|pruefen)\\b[\\s\\S]*\\b(?:aufheben|aufzuheben|widerrufen|zu\\s+widerrufen)\\b"),
      re("Mention attachments", "\\b(?:Anlage|beigefügt|beigefuegt)\\b"),
      re("Offer further documents conditionally", "\\bSollten\\b[^.!?]{0,120}(?:\\bnachreichen\\b|\\breiche\\b[^.!?]{0,40}\\bnach\\b)"),
      re("Request confirmation of receipt", "\\b(?:Eingang.*bestätigen|Eingang.*bestaetigen|bestätigen.*Eingang|bestaetigen.*Eingang)\\b"),
      re("Use a formal greeting and closing", "Sehr geehrte[\\s\\S]*Mit freundlichen Grüßen", "imu")
    ],
    "b2-praesentieren": [
      re("Open for the audience", "\\b(?:Guten Morgen|Guten Tag|ich stelle Ihnen)\\b"),
      re("Use a three-part outline", "\\bZunächst\\b[\\s\\S]*\\bAnschließend\\b[\\s\\S]*\\bAbschließend\\b", "iu"),
      distinct("Use at least three exact figures", "\\b(?:420|28|43|zwölf|zwoelf|12|sechsmonat|zwei)\\b", 3),
      count("Make at least two exact comparisons", "(?:\\bvon\\s+(?:\\d+|zwölf|zwoelf)[\\s\\S]{0,35}\\bauf\\s+(?:\\d+|zwölf|zwoelf)|\\bgegenüber[\\s\\S]{0,55}\\b(?:um|rund)\\s+(?:\\d+|zwölf|zwoelf)|\\b(?:stieg|sank|blieb)[^.!?]{0,60}\\b(?:\\d+|zwölf|zwoelf))", 2),
      re("Refer to a figure", "\\b(?:Abbildung|Grafik|Tabelle)\\b"),
      re("Qualify the trend", "\\b(?:Tendenz|deutet|kann|könn[\\p{L}]*|koenn[\\p{L}]*|dürfte|duerfte|möglich[\\p{L}]*)\\b"),
      re("State a data limitation", "\\b(?:Einschränkung|Einschraenkung|kurze Laufzeit|nur eine Abteilung|begrenzt)\\b"),
      re("State the key message", "\\b(?:Kernaussage|Kernbotschaft|wichtigste[\\p{L}]* Ergebnis|entscheidend)\\b"),
      re("Give a practical recommendation", "\\b(?:empfehle|sollte|nächster Schritt|naechster Schritt)\\b"),
      re("Transition to questions", "\\b(?:Fragen|Rückfragen|Rueckfragen)\\b")
    ],
    "b2-mediation-konflikt": [
      re("State the shared documented facts", "\\b(?:unstrittig|festgehalten|dokumentiert|beide Seiten)\\b"),
      re("State the group's position and need", "(?:\\b(?:Musikgruppe|Gruppe|Jugendzentrum|Zentrum)\\b[^.!?]{0,140}\\b(?:braucht|benötigt|benoetigt|möchte|moechte|Abendtermin|Probezeit)|\\b(?:braucht|benötigt|benoetigt|möchte|moechte|Abendtermin|Probezeit)[^.!?]{0,140}\\b(?:Musikgruppe|Gruppe|Jugendzentrum|Zentrum)\\b)"),
      re("State the residents' position and need", "(?:\\b(?:Anwohnend[\\p{L}]*|Bewohner[\\p{L}]*)\\b[^.!?]{0,140}\\b(?:wünsch[\\p{L}]*|wuensch[\\p{L}]*|braucht|Ruhe|Information|Endzeit)|\\b(?:wünsch[\\p{L}]*|wuensch[\\p{L}]*|braucht|Ruhe|Information|Endzeit)[^.!?]{0,140}\\b(?:Anwohnend[\\p{L}]*|Bewohner[\\p{L}]*)\\b)"),
      re("Mark an uncertain or disputed point", "\\b(?:unklar|strittig|nicht geklärt|nicht geklaert|offen ist|offen bleibt)\\b"),
      re("Name a shared interest", "\\b(?:gemeinsames Interesse|beide Seiten|Planungssicherheit)\\b"),
      re("Use a neutral reframe", "\\b(?:lässt sich.*formulieren|laesst sich.*formulieren|neutral|Anliegen|Forderung[\\s\\S]{0,100}Bedürfnis|Forderung[\\s\\S]{0,100}Beduerfnis)\\b"),
      re("Record a conditional trial", "\\b(?:sofern|unter der Bedingung|Probephase|Testphase)\\b"),
      re("Assign responsibilities and timing", "\\b(?:verantwortlich|übernimmt|uebernimmt|Ansprechperson)\\b[\\s\\S]*\\b(?:Wochen|bis|nach vier Wochen)\\b"),
      re("Name the review method", "\\b(?:auswerten|Zwischenbilanz|prüfen|pruefen|Beschwerden)\\b"),
      re("Leave one remaining question", "(?:\\?|\\bbleibt\\s+zu\\s+klären,?\\s+ob\\b|\\bbleibt\\s+zu\\s+klaeren,?\\s+ob\\b)")
    ]
  };

  Object.entries(checks).forEach(([moduleId, additions]) => {
    const module = course.modules.find(item => item.id === moduleId);
    if (!module) throw new Error(`Missing module for task checks: ${moduleId}`);
    module.task.checks = (module.task.checks || []).filter(check => ["minWords", "maxWords", "punctuatedLines", "capitalization", "keyboardSpellings"].includes(check.type));
    additions.forEach(check => {
      if (!module.task.checks.some(existing => existing.label === check.label)) module.task.checks.push(check);
    });
  });

  const a0StructureChecks = {
    "a0-everyday-things": [
      lines("Write exactly three non-empty lines", 3),
      { label: "Use exactly four words on every line", type: "wordsPerLine", value: 4 }
    ],
    "a0-numbers-spelling-forms": [lines("Write exactly four non-empty lines", 4)],
    "a0-conversation-repair": [lines("Write exactly five non-empty lines", 5)],
    "a0-time-date-schedule": [lines("Write exactly four non-empty lines", 4)]
  };

  Object.entries(a0StructureChecks).forEach(([moduleId, additions]) => {
    const module = course.modules.find(item => item.id === moduleId);
    if (!module) throw new Error(`Missing A0 module for structure checks: ${moduleId}`);
    additions.forEach(check => {
      const sameType = module.task.checks.findIndex(existing => existing.type === check.type);
      if (sameType >= 0) module.task.checks[sameType] = check;
      else module.task.checks.push(check);
    });
  });

  const readingChecks = {
    "a0-time-date-schedule": [
      { label: "Tuesday", patterns: ["\\bDienstag\\b", "\\bTuesday\\b"] },
      { label: "ten o'clock", patterns: ["\\b(?:zehn|10)\\s*(?:Uhr|o'clock)?\\b"] }
    ],
    "a1-public-transport-tickets": [
      { label: "departure time", patterns: ["\\b8[:.]20\\b", "\\bacht Uhr zwanzig\\b"] },
      { label: "platform 4", patterns: ["\\bGleis\\s*4\\b", "\\bplatform\\s*4\\b"] }
    ],
    "a1-hotel-checkin-problems": [
      { label: "breakfast", patterns: ["\\bFrühstück\\b", "\\bFruehstueck\\b", "\\bbreakfast\\b"] },
      { label: "Wi-Fi", patterns: ["\\bWLAN\\b", "\\bWi-?Fi\\b"] }
    ],
    "a2-housing-search": [
      { label: "who wants to move in", patterns: ["\\b(?:ich|wir|wer|Person|Partner|Partnerin|Familie|who)\\b"] },
      { label: "desired move-in date", patterns: ["\\b(?:ab wann|ab dem|Einzug[\\p{L}]*|einziehen|move in|from when)\\b"] }
    ],
    "a2-public-appointments": [
      { label: "payment at application", patterns: ["\\b(?:Antragstellung|Antrag.*stell|application.*submit|submitted)\\b"] },
      { label: "card payment", patterns: ["\\b(?:Kartenzahlung|Karte|card)\\b"] }
    ],
    "a2-travel-disruptions": [
      { label: "travel action", patterns: ["\\b(?:umsteigen|nehmen|take|change trains)\\b"] },
      { label: "connection detail", patterns: ["\\bMannheim\\b", "\\b19[:.]36\\b", "\\bGleis\\s*9\\b", "\\bplatform\\s*9\\b"] },
      { label: "ticket remains valid", patterns: ["\\b(?:Fahrkarte|Ticket)[^.!?]{0,45}gültig\\b", "\\b(?:Fahrkarte|Ticket)[^.!?]{0,45}gueltig\\b", "\\bticket[^.!?]{0,45}valid\\b"] }
    ],
    "b1-beruf-bildung": [
      { label: "German skills", patterns: ["\\bDeutschkenntnisse\\b", "\\bGerman\\b"] },
      { label: "computer skills", patterns: ["\\bComputer[\\p{L}]*\\b", "\\bPC\\b"] },
      { label: "teamwork", patterns: ["\\bTeam(?:arbeit)?\\b", "\\bteamwork\\b"] }
    ],
    "b1-argumentieren": [
      { label: "delivery-service access", patterns: ["\\bLieferdienst", "\\bdelivery"] },
      { label: "limited mobility", patterns: ["\\bMobilität\\b", "\\bMobilitaet\\b", "\\beingeschränkt", "\\beingeschraenkt", "\\bdisabled\\b", "\\bmobility\\b"] }
    ],
    "b1-job-applications": [
      { label: "desired work experience", patterns: ["\\bBerufserfahrung\\b", "\\bwork experience\\b"] },
      { label: "structured onboarding", patterns: ["\\bEinarbeitung\\b", "\\bonboarding\\b"] }
    ],
    "b1-housing-repairs": [
      { label: "thermometer photos", patterns: ["\\b(?:Foto|photo)[\\p{L}]*[^.!?]{0,45}Thermometer[\\p{L}]*\\b", "\\bThermometer[\\p{L}]*[^.!?]{0,45}(?:Foto|photo)"] },
      { label: "missing repair appointment", patterns: ["\\b(?:Reparaturtermin|repair date|repair appointment)\\b"] }
    ],
    "b1-media-comparison": [
      { label: "source A's goal", patterns: ["\\bZiel\\b", "\\baim\\b"] },
      { label: "source A's cost", patterns: ["120[. ]?000", "\\bKosten\\b", "\\bcost"] },
      { label: "source B's survey", patterns: ["\\b640\\b", "\\bUmfrage\\b", "\\bsurvey\\b"] },
      { label: "sampling limitation", patterns: ["\\bAuswahl\\b", "\\bsampl"] },
      { label: "response-rate limitation", patterns: ["\\bRücklaufquote\\b", "\\bRuecklaufquote\\b", "\\bresponse rate\\b"] }
    ],
    "b1-healthcare-decisions": [
      { label: "change from day four if tolerated", patterns: ["\\b(?:vierten|4\\.)\\s+Tag\\b", "\\bday four\\b"] },
      { label: "breathing difficulty", patterns: ["\\bAtemnot\\b", "\\bbreathing difficulty\\b"] },
      { label: "severe allergic reaction", patterns: ["\\ballergisch[\\p{L}]*\\s+Reaktion\\b", "\\ballergic reaction\\b"] }
    ],
    "b2-register": [
      { label: "participant list", patterns: ["\\bTeilnehmerliste\\b", "\\bparticipant list\\b"] },
      { label: "technical equipment details", patterns: ["\\b(?:technisch[\\p{L}]*\\s+Ausstattung|Mikrofon|Videokonferenz)\\b", "\\btechnical equipment\\b"] }
    ],
    "b2-kohaesion": [
      { label: "type of damage", patterns: ["\\bSchaden\\b", "\\bdamage\\b"] },
      { label: "available replacement parts", patterns: ["\\bErsatzteil", "\\breplacement part"] }
    ],
    "b2-verhandlungen": [
      { label: "decision on permanent continuation", patterns: ["\\b(?:Fortführung|Fortfuehrung|dauerhaft)\\b", "\\bpermanent continuation\\b"] },
      { label: "usage figures", patterns: ["\\bNutzungszahl", "\\busage figure"] },
      { label: "team feedback", patterns: ["\\b(?:Teamrückmeldung[\\p{L}]*|Teamrueckmeldung[\\p{L}]*|Rückmeldung[\\p{L}]* aus dem Team)\\b", "\\bteam feedback\\b"] },
      { label: "cost evaluation", patterns: ["\\b(?:Kostenauswertung|Kosten)\\b", "\\bcost evaluation\\b"] }
    ],
    "b2-behoerdenpost": [
      { label: "transmission date", patterns: ["\\bDatum\\b", "\\bdate\\b"] },
      { label: "transmission route", patterns: ["\\bÜbermittlungsweg\\b", "\\bUebermittlungsweg\\b", "\\bsubmission route\\b"] },
      { label: "file or transaction number", patterns: ["\\b(?:Vorgangsnummer|Aktenzeichen)\\b", "\\b(?:file|transaction) (?:reference|number)\\b"] },
      { label: "documents are reviewed", patterns: ["\\bUnterlagen[^.!?]{0,45}(?:geprüft|geprueft)\\b", "\\b(?:prüft|prueft|prüfen|pruefen)[^.!?]{0,45}Unterlagen\\b", "\\bdocuments[^.!?]{0,45}reviewed\\b"] },
      { label: "written notice follows", patterns: ["\\bschriftlich[\\p{L}]*\\s+(?:Nachricht|Mitteilung|informiert)\\b", "\\binformiert[^.!?]{0,35}schriftlich\\b", "\\bwritten (?:notice|message)\\b"] }
    ],
    "b2-praesentieren": [
      { label: "May figure affected by the fair", patterns: ["(?=[\\s\\S]*\\b(?:Maiwert|Mai)\\b)(?=[\\s\\S]*\\b(?:Messe|Ausreißer|Ausreisser|verzerrt)\\b)", "(?=[\\s\\S]*\\bfair\\b)(?=[\\s\\S]*\\b(?:May|figure)\\b)"] },
      { label: "limited survey participation", patterns: ["\\b(?:38[^.!?]{0,30}74|Hälfte|Haelfte|Rücklaufquote|Ruecklaufquote|geringe[\\p{L}]* Teilnahme|begrenzte[\\p{L}]* Teilnahme)\\b", "\\b(?:limited response|low participation|response rate)\\b"] }
    ],
    "b2-mediation-konflikt": [
      { label: "documented times or schedule change", patterns: ["\\b(?:Belegungsplan|Raumzeit|reserviert[\\p{L}]* Zeit|kurzfristig[\\p{L}]* Änderung)\\b", "\\b(?:schedule|reserved times)\\b"] },
      { label: "disturbance reports", patterns: ["\\b(?:Störungsmeldung[\\p{L}]*|Stoerungsmeldung[\\p{L}]*|Beschwerde[\\p{L}]*|reports|complaints)\\b"] },
      { label: "responsibility for the courtyard", patterns: ["\\b(?:Verantwortung|verantwortlich|Hofverantwortung)[^.!?]{0,55}Hof\\b", "\\bHofverantwortung\\b", "\\bcourtyard[^.!?]{0,55}responsib"] },
      { label: "fire-safety route check", patterns: ["\\b(?:Brandschutz[\\p{L}]*|fire safety)\\b"] }
    ]
  };

  Object.entries(readingChecks).forEach(([moduleId, requirements]) => {
    const module = course.modules.find(item => item.id === moduleId);
    if (!module) throw new Error(`Missing module for reading checks: ${moduleId}`);
    module.input.readRequired = requirements;
  });
})();
