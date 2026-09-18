(function () {
  const course = window.SATZWERK_CURRICULUM;
  if (!course?.modules) throw new Error("Satzwerk curriculum must load before task models");

  const updates = {
  "a1-people-family-work": {
    "model": "Mara ist zweiunddreißig Jahre alt und wohnt in Bremen. Sie lebt mit ihrem Partner Jonas und ihrer Tochter Lina. Ihr Partner ist Lehrer an einer Grundschule. Mara arbeitet als Köchin in einem Hotel. Ihre Eltern wohnen in der Nähe und besuchen ihre Familie."
  },
  "a1-daily-routine": {
    "model": "Zuerst stehe ich um sieben Uhr auf. Um halb acht fahre ich mit dem Bus zur Arbeit. Dann beginne ich um acht Uhr mit der Arbeit und muss viele E-Mails lesen. Um zwölf Uhr mache ich Pause. Nachmittags arbeite ich bis fünf Uhr. Am Abend kaufe ich ein, koche und rufe meine Schwester an."
  },
  "a1-food-shopping": {
    "model": "Einkaufsliste: zwei Äpfel, ein Kilo Kartoffeln, eine Flasche Wasser.\nGast: Guten Tag. Ich hätte gern einen Kaffee und ein Käsebrötchen, bitte.\nService: Noch etwas?\nGast: Eine Flasche Wasser, bitte. Was kostet sie?\nService: Die Flasche kostet zwei Euro.\nGast: Gut, dann nehme ich sie. Was kostet alles zusammen?\nService: Acht Euro. Danke und auf Wiedersehen.",
    "speakingModel": "Guten Tag. Ich möchte einen Kaffee und zwei Brötchen, bitte. Was kostet das zusammen? Danke. Auf Wiedersehen."
  },
  "a1-home-and-town": {
    "model": "Mein Wohnzimmer ist groß und sehr hell. Neben der Tür steht ein hoher Schrank mit vielen Büchern. Auf dem kleinen Tisch liegt eine schwarze Zeitung. In der Ecke neben dem Fenster steht eine grüne Lampe. Ich stelle eine neue Pflanze auf den Schrank. Danach hänge ich ein buntes Bild an die Wand."
  },
  "a1-plans-and-leisure": {
    "model": "Hallo Mia,\n\nich lade dich am Samstag zu einem Filmabend bei mir ein. Wir treffen uns um 18 Uhr in meiner Wohnung und sehen eine Komödie. Danach kochen wir zusammen. Bring bitte ein Getränk mit. Hast du Zeit? Gib mir bitte bis Donnerstag Bescheid.\n\nViele Grüße\nSam"
  },
  "a1-travel-and-services": {
    "model": "Guten Tag,\n\nmein Name ist Sam Lee. Ich habe eine Reservierung für ein Einzelzimmer von Freitag bis Sonntag. Am Freitag komme ich gegen 18 Uhr an. Ist die Rezeption dann noch geöffnet? Ich habe eine Frage zum Frühstück: Ist es im Preis enthalten? Vielen Dank.\n\nMit freundlichen Grüßen\nSam Lee",
    "speakingModel": "Entschuldigung, wie komme ich zum Bahnhof? Also gehe ich zuerst geradeaus, dann rechts und bis zur Haltestelle. Ist das richtig? Danke für Ihre Hilfe."
  },
  "a1-health-past-checkpoint": {
    "model": "Gestern war ich mit meiner Schwester in Hamburg und wir haben eine Freundin besucht. Wir sind mit dem Zug gefahren und haben den Hafen gesehen. Danach haben wir in einem kleinen Café gegessen. Das Wetter war kalt und windig, aber am Nachmittag hat die Sonne geschienen. Heute habe ich wenig Energie und fühle mich müde. Morgen möchte ich zu Hause bleiben und meine Fotos sortieren."
  },
  "a2-erlebnisse": {
    "model": "Am Samstag bin ich früh aufgestanden und habe gefrühstückt. Zuerst bin ich mit dem Zug nach Bonn gefahren. Dort habe ich meine Freundin Lara getroffen und wir haben den Markt besucht. Dann haben wir in einem kleinen Restaurant gegessen. Später sind wir am Rhein spazieren gegangen und haben Fotos gemacht. Danach habe ich Lara beim Aufräumen geholfen. Schließlich bin ich am Abend müde, aber zufrieden nach Hause gefahren."
  },
  "a2-wohnung-raum": {
    "model": "Der Schreibtisch steht vor dem großen Fenster im Wohnzimmer. Auf dem Schreibtisch liegen mein Laptop und zwei Bücher. Neben der Tür steht ein schmaler Schrank. Über dem Sofa hängt ein buntes Bild aus Berlin. Ich nehme die Lampe und stelle sie auf den Schreibtisch. Danach nehme ich das Bild und hänge es an die Wand neben dem Fenster.",
    "speakingModel": "Der Tisch steht an der Wand, und auf dem Tisch liegt ein Buch. Stell die Lampe neben das Sofa. Leg das Buch auf den Tisch und häng das Bild an die Wand."
  },
  "a2-termine-plaene": {
    "model": "Guten Tag Frau Kaya,\n\nleider muss ich unseren Termin am Dienstag um 15 Uhr absagen, weil ich an diesem Nachmittag einen wichtigen Arzttermin habe. Als neue Zeit kann ich Ihnen Mittwoch um 14 Uhr anbieten. Alternativ hätte ich am Donnerstag um 10 Uhr Zeit. Passt Ihnen einer dieser beiden Termine? Bitte geben Sie mir bis morgen kurz Bescheid, damit ich den neuen Termin eintragen kann. Vielen Dank für Ihr Verständnis.\n\nFreundliche Grüße\nDaniel Vogt"
  },
  "a2-gesundheit": {
    "model": "Guten Tag,\n\nseit Montag habe ich Fieber, starke Halsschmerzen und nachts auch Husten. Die Beschwerden sind seit gestern stärker geworden, und ich kann kaum schlafen. Könnte ich bitte heute oder morgen einen Termin bekommen? Am Vormittag bin ich bis elf Uhr erreichbar. Am Nachmittag kann ich jederzeit in die Praxis kommen. Brauche ich vorher einen Test? Vielen Dank für Ihre Rückmeldung.\n\nFreundliche Grüße\nSam Lee"
  },
  "a2-arbeit-lernen": {
    "model": "Hallo Lara,\n\nkönntest du mir bitte den neuen Monatsbericht erklären? Ich verstehe besonders die Tabelle auf Seite drei und die Zahlen im letzten Abschnitt noch nicht. Kannst du mir außerdem die aktuelle Datei schicken? Ich muss den fertigen Bericht bis Donnerstag um zwölf Uhr an Frau Klein senden. Danke für deine Hilfe. Wenn du heute Zeit hast, können wir kurz telefonieren.\n\nViele Grüße\nSam"
  },
  "a2-unterwegs": {
    "model": "Route A dauert zwei Stunden und kostet 34 Euro. Sie ist zwanzig Minuten langsamer als Route B, aber sie ist bequemer, weil die Verbindung direkt ist. Bei Route A muss ich also nicht umsteigen. Route B kostet nur 24 Euro und ist damit günstiger als Route A. Allerdings muss ich in Bamberg umsteigen und dort dreißig Minuten warten. Trotzdem wähle ich Route A. Die direkte Verbindung ist für mich angenehmer, und ich komme ohne langen Aufenthalt ans Ziel."
  },
  "a2-einkaufen-service": {
    "model": "Guten Tag,\n\nich möchte diesen schwarzen Pullover in Größe M umtauschen. Der weiche Pullover gefällt mir sehr, aber er ist an den Ärmeln zu klein. Den Kassenbon habe ich noch, und der Pullover ist ungetragen. Könnten Sie mir bitte einen größeren Pullover in Größe L schicken? Falls dieses Modell nicht mehr verfügbar ist, hätte ich gern eine blaue Jacke zum gleichen Preis. Bitte teilen Sie mir mit, wie der Umtausch abläuft. Vielen Dank für Ihre Hilfe.\n\nFreundliche Grüße\nNora Beck"
  },
  "a2-einladen-meinen": {
    "model": "Hallo Mila,\n\nvielen Dank für deine Einladung zum Picknick am Samstag. Ich komme gern, weil ich an diesem Wochenende frei habe. Wenn das Wetter gut bleibt, bin ich gegen vier Uhr im Stadtpark. Wo genau treffen wir uns? Soll ich eine Decke mitbringen? Ich kann einen großen Salat und etwas Brot vorbereiten. Wenn du schon genug Essen hast, bringe ich Getränke mit. Gib mir bitte Bescheid, falls sich die Uhrzeit ändert. Ich freue mich auf die Feier.\n\nLiebe Grüße\nSami"
  },
  "b1-erzaehlen": {
    "model": "Letzten Freitag wollte ich meine Schwester in Köln besuchen. Es war früher Abend, der Bahnhof war voll, und draußen regnete es stark. Nachdem ich im Zug einen Kaffee gekauft hatte, setzte ich mich ans Fenster und hörte Musik. In Köln stieg ich aus und ging zum Ausgang. Plötzlich bemerkte ich, dass meine Tasche fehlte. Ich hatte sie neben meinem Sitz stehen lassen. Zuerst geriet ich in Panik, danach meldete ich den Verlust am Serviceschalter. Ein Mitarbeiter rief den Zugbegleiter an. Zum Glück hatte eine Reisende die Tasche gefunden und abgegeben. Eine Stunde später konnte ich sie am Fundbüro abholen. Am Ende kam ich verspätet bei meiner Schwester an, aber alle wichtigen Sachen waren noch da."
  },
  "b1-wohnen-nachbarschaft": {
    "model": "Sehr geehrte Frau Klein,\n\nseit fast zwei Wochen stehen mehrere Fahrräder im Treppenhaus, das laut Hausordnung als Fluchtweg frei bleiben muss. Besonders problematisch ist das große Lastenrad, das direkt vor der Kellertür steht. Die Tür, durch die viele Mieterinnen und Mieter täglich gehen, lässt sich deshalb nur halb öffnen. Gestern habe ich bereits mit dem Nachbarn gesprochen, dem eines der Fahrräder gehört. Er konnte jedoch nicht sagen, wem die anderen Räder gehören. Der Hausmeister, der für den Fahrradraum zuständig ist, war telefonisch nicht erreichbar. Könnten Sie bitte alle Besitzer informieren und dafür sorgen, dass die Fahrräder bis Freitag in den Kellerraum gebracht werden? Eine zusätzliche Markierung im Treppenhaus könnte ähnliche Probleme künftig verhindern. Vielen Dank für Ihre Unterstützung.\n\nMit freundlichen Grüßen\nSara Nguyen",
    "speakingModel": "Im Treppenhaus stehen mehrere Fahrräder, die den Fluchtweg blockieren. Der Hausmeister, der für das Gebäude zuständig ist, könnte die Besitzer informieren. Außerdem sollte der Fahrradraum im Keller geöffnet werden. So bliebe der Weg frei, und alle hätten einen sicheren Abstellplatz."
  },
  "b1-beruf-bildung": {
    "model": "Sehr geehrte Frau Vogt,\n\nmit großem Interesse bewerbe ich mich um die ausgeschriebene Stelle im Kundenservice. Seit drei Jahren arbeite ich in einem Hotel, wo ich Gäste persönlich, telefonisch und per E-Mail berate. Dadurch habe ich viel Erfahrung im Umgang mit Fragen und Beschwerden gesammelt. Außerdem bin ich für Reservierungen und die Einarbeitung neuer Kolleginnen und Kollegen verantwortlich. Der sichere Umgang mit dem Computer gehört zu meinem Arbeitsalltag. Zurzeit besuche ich eine Weiterbildung, um meine schriftliche Kommunikation auf Deutsch weiter zu verbessern. Die Stelle interessiert mich besonders, weil ich gern in einem internationalen Team arbeiten und mehr Verantwortung übernehmen möchte. Ab dem 1. Oktober bin ich verfügbar. Über eine Einladung zu einem Vorstellungsgespräch freue ich mich sehr. Meinen Lebenslauf finden Sie im Anhang.\n\nMit freundlichen Grüßen\nSam Lee"
  },
  "b1-medien-information": {
    "model": "In einem Gruppenchat wird behauptet, dass am kommenden Freitag alle Busse im Stadtgebiet kostenlos fahren. Als Quelle wird nur ein Bild mit einer auffälligen Überschrift geteilt. Laut der aktuellen Meldung auf der Website des Verkehrsverbunds gilt die Aktion jedoch ausschließlich für Kinder bis vierzehn Jahre. Erwachsene benötigen weiterhin eine gültige Fahrkarte. Bestätigt sind damit der Aktionstag und das kostenlose Angebot für diese Altersgruppe. Unklar bleibt, wer das Bild im Gruppenchat erstellt hat und ob es sich auf eine ältere Aktion bezieht. Ich weiß außerdem nicht, ob einzelne Gemeinden zusätzliche Angebote planen. Diese Frage ließe sich durch einen Anruf beim Verkehrsverbund überprüfen. Bis eine offizielle Auskunft vorliegt, würde ich die Nachricht nur mit dem Link zur Originalmeldung weitergeben.",
    "speakingModel": "Im Gruppenchat steht, dass am Freitag alle Busse kostenlos fahren. Die Meldung nennt keine Quelle. Laut der offiziellen Website gilt das Angebot nur für Kinder bis vierzehn Jahre. Erwachsene brauchen eine Fahrkarte. Noch unklar ist, ob einzelne Gemeinden zusätzliche Angebote planen. Das würde ich direkt beim Verkehrsverbund überprüfen."
  },
  "b1-umwelt-mobilitaet": {
    "model": "In unserer Stadt fehlen sichere Radwege zwischen den Wohngebieten und dem Bahnhof. Viele Menschen fahren deshalb kurze Strecken mit dem Auto. Im kommenden Jahr wird auf zwei Hauptstraßen jeweils eine geschützte Fahrradspur eingerichtet. Gefährliche Kreuzungen werden außerdem neu markiert und besser beleuchtet. An den Bahnhöfen sollen überdachte Abstellplätze gebaut werden, damit Fahrräder auch bei schlechtem Wetter sicher stehen. Ein Teil der Parkfläche müsste dafür umgestaltet werden. Die Maßnahme wird von der Stadt finanziert und durch ein Landesprogramm ergänzt. Während der Bauphase werden Umleitungen ausgeschildert. Dadurch werden mehr Menschen das Fahrrad nutzen, und die Wege zum Bahnhof werden sicherer. Nach zwölf Monaten werden die Zahl der Radfahrenden, die Unfallstatistik und die Nutzung der Abstellplätze ausgewertet. Zusätzlich wird eine kurze Umfrage durchgeführt. Anhand dieser Ergebnisse kann die Stadt prüfen, ob weitere Strecken ausgebaut werden sollten."
  },
  "b1-gesund-leben": {
    "model": "An deiner Stelle würde ich zuerst eine feste Uhrzeit für den Feierabend festlegen. Wenn du nach 19 Uhr keine beruflichen Nachrichten mehr beantworten würdest, könntest du dich am Abend besser erholen, weil deine Arbeit dann einen klaren Abschluss hätte. Zweitens wäre eine richtige Mittagspause hilfreich. Du könntest den Schreibtisch für zwanzig Minuten verlassen und draußen etwas essen, damit dein Kopf eine Pause bekommt. Drittens würde ich regelmäßige Bewegung einplanen. Drei kurze Spaziergänge pro Woche wären ein realistischer Anfang, weil du dafür keine besondere Ausrüstung brauchst. Wenn ein voller Arbeitstag diese Pläne stört, könntest du mit einer einzigen freien Stunde pro Woche beginnen. Kleine feste Gewohnheiten sind oft leichter einzuhalten und können langfristig zu mehr Schlaf und einem besseren Gleichgewicht führen.",
    "speakingModel": "An deiner Stelle würde ich abends das Handy ausschalten. Wenn du früher Feierabend machen könntest, hättest du Zeit für einen Spaziergang. Ich weiß, dass die Arbeit stressig ist. Vielleicht könntest du zunächst an zwei Abenden eine klare Grenze setzen und mittags eine kurze Pause einplanen."
  },
  "b1-engagement": {
    "model": "Unser Verein engagiert sich für einen Gemeinschaftsgarten im Stadtteil Nord. Das Projekt soll Nachbarinnen und Nachbarn zusammenbringen und Kindern zeigen, wie Gemüse angebaut wird. Jeden Samstag nehmen etwa zwanzig Mitglieder von 10 bis 13 Uhr an der Gartenarbeit teil. Wir kümmern uns um die Beete, reparieren kleine Wege und stimmen über neue Pflanzen ab. Im Herbst geht es außerdem darum, gemeinsam eine offene Erntefeier zu organisieren. Wofür werden aktuell noch Freiwillige gesucht? Der Kinderbereich und die Vorbereitung der Feier brauchen zusätzliche Unterstützung. Dafür kann man sich per E-Mail beim Verein anmelden. Neue Helferinnen und Helfer können zunächst an einem unverbindlichen Treffen teilnehmen. Es findet am ersten Samstag jedes Monats um 9:30 Uhr im Gartenhaus statt. Vorkenntnisse sind nicht nötig. Wer Gartenhandschuhe hat, kann sie gern mitbringen."
  },
  "b1-argumentieren": {
    "model": "Meiner Meinung nach sollte der zentrale Stadtplatz schrittweise grüner und weitgehend autofrei gestaltet werden. Erstens fehlt dort im Sommer Schatten. Neue Bäume und bepflanzte Flächen könnten die Temperatur senken und den Aufenthalt angenehmer machen. Zweitens würde mehr Platz für Sitzbänke, Fahrräder und sichere Fußwege entstehen. Eine Umfrage des Stadtteilbüros, an der 860 Menschen teilgenommen haben, zeigt, dass 68 Prozent zusätzliche Bäume und weniger Autoverkehr wünschen. Einerseits brauchen die Geschäfte eine zuverlässige Lieferzone. Andererseits leiden Anwohnende und Besucher unter Lärm, Abgasen und unsicheren Übergängen. Auch Menschen mit eingeschränkter Mobilität müssen den Platz gut erreichen können. Trotz der möglichen Umbaukosten halte ich die Veränderung deshalb für sinnvoll. Als Kompromiss schlage ich eine kleine Lieferzone vor, die werktags bis 10 Uhr genutzt werden darf. Zwei barrierefreie Halteplätze sollten in unmittelbarer Nähe erhalten bleiben. Der restliche Platz könnte zunächst für ein Jahr mit mobilen Pflanzkübeln und Sitzgelegenheiten getestet werden. Danach sollte die Stadt Verkehrsdaten sowie Rückmeldungen der Geschäfte und der Nachbarschaft auswerten. So bleibt die Lösung anpassbar, und die wichtigsten Interessen werden berücksichtigt."
  },
  "b2-positionen": {
    "model": "Ich halte eine Vier-Tage-Woche für ein sinnvolles Arbeitsmodell, sofern Betriebe Arbeitsabläufe und Personalbedarf gemeinsam mit den Beschäftigten neu planen. Der erste Vorteil liegt in der Erholung: Ein zusätzlicher freier Tag kann Stress senken und die Konzentration an den Arbeitstagen verbessern. Zweitens gewinnen Unternehmen bei der Personalgewinnung an Attraktivität. Gerade in Bereichen mit Fachkräftemangel kann das entscheidend sein. Außerdem fallen für viele Beschäftigte weniger Arbeitswege an.\n\nDer wichtigste Einwand betrifft die Arbeitsdichte. Obwohl eine gewisse Verdichtung kaum vermeidbar ist, darf daraus kein regelmäßig überladener Zehn-Stunden-Tag mit ständiger Erreichbarkeit entstehen. In Pflege, Handel oder Kundenservice müssen Öffnungs- und Übergabezeiten weiterhin zuverlässig abgedeckt sein. Deshalb sollte ein Betrieb zunächst eine sechsmonatige Pilotphase durchführen. Teams brauchen klare Prioritäten, realistische Leistungsziele und Vertretungsregeln. Je stärker die Beschäftigten an der Planung beteiligt werden, desto eher werden Belastungsspitzen früh erkannt. Während des Tests sollten Arbeitszeit, Fehlzeiten, Qualität und Zufriedenheit monatlich ausgewertet werden.\n\nEine Einführung ist aus meiner Sicht vertretbar, wenn die Ergebnisse transparent bleiben und bei Überlastung nachgesteuert wird. Unter diesen Bedingungen kann die Vier-Tage-Woche sowohl Beschäftigten als auch Unternehmen nutzen. Ohne ausreichende Personaldecke wäre sie dagegen riskant."
  },
  "b2-quellen": {
    "model": "Quelle A ist eine Mitteilung des städtischen Verkehrsverbunds. Ihr zufolge sei die Zahl der Fahrgäste im ersten Halbjahr um zwölf Prozent gestiegen. Der Verbund erklärt außerdem, das Angebot sei besonders auf den neuen Expresslinien stark genutzt worden. Die endgültige Auswertung liege allerdings noch nicht vor.\n\nQuelle B stammt von einem unabhängigen Fahrgastverband. Nach dessen Angaben habe die Nutzung ebenfalls zugenommen, der Anstieg betrage jedoch nur fünf Prozent. Der Verband weist darauf hin, dass im aktuellen Jahr eine andere Zählmethode verwendet worden sei. Außerdem seien mehrere stark ausgelastete Linien in der Mitteilung des Verkehrsverbunds kaum berücksichtigt.\n\nBeide Quellen stimmen darin überein, dass mehr Menschen den öffentlichen Verkehr nutzen. Sie widersprechen sich bei der Größenordnung des Anstiegs und bei der Bewertung der Auslastung. Quelle A hebt die neuen Verbindungen hervor, während Quelle B vor allem methodische Grenzen und überfüllte Linien nennt. Dadurch lassen sich die Zahlen derzeit nur eingeschränkt vergleichen. Für eine belastbare Einschätzung müssten der genaue Zeitraum, die erfassten Linien und die Berechnungsmethode offengelegt werden. Offen bleibt daher die Frage, ob der gemeldete Zuwachs auf eine tatsächliche Veränderung des Reiseverhaltens oder teilweise auf die neue Erhebung zurückgeht.",
    "speakingModel": "Meine erste Quelle ist der Verkehrsverbund. Er erklärt, die Fahrgastzahl sei im letzten Quartal gestiegen; die endgültige Auswertung liege noch nicht vor. Eine zweite Quelle, der Fahrgastverband, berichtet dagegen, einzelne Linien seien weiterhin stark überfüllt. Beide Quellen beschreiben eine höhere Nutzung, bewerten deren Folgen jedoch unterschiedlich. Offen bleibt, nach welcher Methode die Fahrgastzahlen erhoben wurden."
  },
  "b2-prozesse": {
    "model": "Zunächst wird der Antrag über das Serviceportal eingereicht. Dabei werden das ausgefüllte Formular, ein Identitätsnachweis und die erforderlichen Belege hochgeladen. Nach dem Eingang wird automatisch eine Bestätigung mit Aktenzeichen versandt. Für die Vorprüfung ist die Servicestelle verantwortlich. Sie kontrolliert, ob alle Angaben vorhanden und die Dateien lesbar sind.\n\nFalls Unterlagen fehlen, wird eine schriftliche Aufforderung verschickt. Die fehlenden Nachweise müssen innerhalb von vierzehn Tagen nachgereicht werden. Sind alle Dokumente vollständig erfasst, ist der Antrag zur fachlichen Prüfung freigegeben. Anschließend prüft die zuständige Fachabteilung, ob die Voraussetzungen erfüllt sind. Rückfragen werden über das persönliche Postfach im Portal gestellt. Der aktuelle Bearbeitungsstand lässt sich dort jederzeit einsehen.\n\nNach Abschluss der Prüfung wird eine Entscheidung getroffen. Der Bescheid wird elektronisch bereitgestellt und auf Wunsch zusätzlich per Post versandt. Wird der Antrag genehmigt, enthält das Schreiben auch Hinweise zu den nächsten Schritten. Bei einer Ablehnung werden die Gründe und die verfügbaren Rechtsbehelfe erläutert. Für technische Probleme bleibt die Servicestelle zuständig; inhaltliche Fragen beantwortet die Fachabteilung unter Angabe des Aktenzeichens."
  },
  "b2-register": {
    "model": "Betreff: Vorbereitung des Workshops am 18. Juni\n\nSehr geehrte Frau Keller,\n\nich beziehe mich auf unser Gespräch vom 12. Mai und bestätige Ihnen nach interner Prüfung den vereinbarten Workshoptermin am 18. Juni. Die Reservierung des großen Seminarraums wurde inzwischen vorgenommen.\n\nFür die Vorbereitung der Veranstaltung benötigen wir noch zwei Angaben. Bitte senden Sie uns erstens die aktuelle Teilnehmerliste mit den Namen der externen Gäste. Zweitens bitten wir um eine kurze Rückmeldung zur technischen Ausstattung: Benötigen Sie neben Beamer und Rednerpult ein zweites Mikrofon oder einen Anschluss für Videokonferenzen? Wir bitten um Zusendung dieser Informationen bis spätestens 20. Mai. Nur dann können wir die Raumaufteilung festlegen und dem Technikteam ausreichend Zeit für die Einrichtung geben.\n\nNach Eingang Ihrer Rückmeldung können wir die endgültige Entscheidung über Bestuhlung und Catering treffen. Sollten sich bei der Zusammenstellung der Unterlagen Fragen ergeben, erreichen Sie mich telefonisch unter der bekannten Durchwahl oder per E-Mail. Für weitere Rückfragen stehe ich Ihnen gern zur Verfügung.\n\nMit freundlichen Grüßen\nDaniel Roth\nProjektkoordination",
    "speakingModel": "Ich beziehe mich auf unser Gespräch vom Montag. Nach interner Prüfung bestätigen wir den Workshoptermin am 18. Juni. Bitte senden Sie uns bis Freitag die aktuelle Teilnehmerliste und nehmen Sie zur technischen Ausstattung Stellung. Außerdem bitten wir um Rückmeldung, ob Sie ein zweites Mikrofon benötigen. Damit können wir eine Entscheidung über die Raumaufteilung treffen. Für Rückfragen stehe ich Ihnen gern zur Verfügung."
  },
  "b2-relativ-partizip": {
    "model": "Die im vergangenen Jahr gestartete Energieberatung unterstützt Haushalte, deren Heiz- und Stromkosten besonders stark gestiegen sind. Beteiligt sind drei städtische Beratungsstellen, die kostenlose Gespräche in mehreren Stadtteilen anbieten, sowie ein unabhängiges Forschungsinstitut. Die besonders betroffenen Haushalte können ihre Verbrauchsdaten mitbringen und gemeinsam mit Fachleuten auswerten.\n\nZu den bereits eingeführten Maßnahmen gehören offene Sprechstunden, Hausbesuche und mehrsprachige Informationsabende. Nach jeder Beratung werden Verbrauchsdaten anonymisiert erhoben. Ein Forschungsteam wertet sie anschließend aus und prüft, welche Empfehlungen im Alltag umgesetzt wurden. Die daraus gewonnenen Erkenntnisse sollen in ein auf drei Jahre angelegtes Förderprogramm einfließen. Vorgesehen sind Zuschüsse für kleine technische Verbesserungen und weitere Schulungen für Beratende.\n\nErste Rückmeldungen zeigen, dass viele Teilnehmende ihren Verbrauch besser verstehen. Unklar ist bisher, ob auch Haushalte erreicht werden, die selten öffentliche Beratungsangebote nutzen. Der Sozialausschuss, dessen Entscheidung im Juni erwartet wird, prüft deshalb zusätzliche mobile Standorte. Offen bleibt außerdem die langfristige Finanzierung des Programms. Ohne eine Zusage des Landes könnte die Stadt die aufsuchende Beratung nach der Testphase nur in geringerem Umfang fortführen."
  },
  "b2-haltung": {
    "model": "Die Nachfrage nach regionalen Produkten dürfte im vergangenen Quartal gestiegen sein. Darauf deuten vorläufige Verkaufszahlen aus 42 Geschäften hin. Bestätigt ist bislang lediglich, dass diese Betriebe ihre Umsätze fristgerecht gemeldet haben und der durchschnittliche Warenkorb größer war als im Vorjahresquartal. Vollständige Daten für die gesamte Branche liegen noch nicht vor.\n\nEin Branchenverband will bereits eine deutliche und dauerhafte Erholung beobachtet haben. Mehrere Medien berichten außerdem, kleinere Hersteller sollen ihre Produktion erheblich ausgeweitet haben. Für diese Aussage werden jedoch keine einheitlichen Vergleichszahlen genannt. Obwohl die Entwicklung plausibel erscheint, erlaubt die vorliegende Stichprobe keine verlässliche Aussage über alle Regionen. Die teilnehmenden Geschäfte befinden sich überwiegend in Großstädten; ländliche Gebiete sind kaum vertreten.\n\nEine vorsichtige Schlussfolgerung ist daher angemessen: Die Nachfrage könnte in bestimmten Marktsegmenten zugenommen haben, ihr genauer Umfang bleibt offen. Vor einer langfristigen Prognose müssten Daten aus weiteren Regionen, Angaben zu Preisänderungen und die saisonalen Schwankungen geprüft werden. Erst die angekündigte Gesamtauswertung kann zeigen, ob der beobachtete Anstieg breit getragen ist oder auf einzelne Produktgruppen und Standorte zurückgeht."
  },
  "b2-kohaesion": {
    "model": "Ein Repair Café ist ein offener Treffpunkt, an dem Menschen defekte Alltagsgegenstände gemeinsam untersuchen und möglichst reparieren. Ehrenamtliche helfen dabei, indem sie Werkzeug bereitstellen, Fehler erklären und ihre praktische Erfahrung weitergeben. Sie tragen dazu bei, dass Besucherinnen und Besucher kleinere Reparaturen später selbst versuchen können.\n\nDadurch werden Geräte länger genutzt, sodass weniger Abfall entsteht und Ressourcen geschont werden. Ein zweiter Vorteil liegt im Austausch von Wissen: Menschen aus der Nachbarschaft kommen miteinander ins Gespräch und unterstützen sich gegenseitig. Der Erfolg einer Reparatur hängt allerdings davon ab, wie schwer der Schaden ist und ob passende Ersatzteile verfügbar sind.\n\nVor deinem Besuch solltest du deshalb prüfen, welche Gegenstände angenommen werden, ob du dich anmelden musst und welche Teile du mitbringen kannst. Eine erfolgreiche Reparatur lässt sich nicht garantieren. Auch eine genaue Fehlerbeschreibung und vorhandene Bedienungsunterlagen können den Ehrenamtlichen die gemeinsame Suche nach einer Lösung erleichtern."
  },
  "b2-integration": {
    "model": "Der zentrale Stadtplatz erfüllt derzeit mehrere Aufgaben, bietet jedoch nur wenig Aufenthaltsqualität. Lieferfahrzeuge, Kurzzeitparkende, Fußgängerinnen und Radfahrer teilen sich eine enge Fläche. Im Sommer fehlt Schatten, und es gibt kaum Sitzmöglichkeiten. Viele Anwohnende wünschen sich deshalb mehr Grün, weniger Verkehr und einen ruhigeren Treffpunkt.\n\nDie örtlichen Geschäftsleute erklären, eine gut erreichbare Lieferzone sei für ihre Betriebe unverzichtbar. Ohne feste Zufahrtszeiten könnten Waren weder pünktlich noch sicher angeliefert werden. Anwohnende und ein Seniorenbeirat heben dagegen hervor, der Durchgangsverkehr verursache Lärm und erschwere eine sichere Querung. Daraus entsteht ein Zielkonflikt zwischen wirtschaftlicher Erreichbarkeit, Barrierefreiheit und hoher Aufenthaltsqualität.\n\nVorgeschlagen wird eine zwölfmonatige Testphase. Am östlichen Rand soll eine kleine Lieferzone eingerichtet werden, die werktags von 6 bis 10 Uhr genutzt werden darf. Danach wird die Zufahrt durch versenkbare Poller geschlossen. Eine barrierefreie Route über den Platz bleibt jederzeit frei. Mobile Bäume, Bänke und zusätzliche Fahrradständer können zunächst ohne vollständigen Umbau aufgestellt werden. Die Maßnahme ist technisch umsetzbar und lässt sich bei Bedarf anpassen.\n\nEine Einschränkung sind die Kosten für Poller, Pflege und Kontrolle. Außerdem könnte sich Lieferverkehr in benachbarte Straßen verlagern. Deshalb sollten während der Testphase Lieferzeiten, Fußgängerzahlen, Beschwerden, Unfallmeldungen und Umsätze erfasst werden. Nach sechs Monaten wird ein Zwischenbericht veröffentlicht; nach einem Jahr entscheidet der Stadtrat über eine dauerhafte Gestaltung.\n\nDaraus lässt sich schließen, dass ein klar begrenzter Versuch die unterschiedlichen Interessen am besten zusammenführt. Verlässliche Daten schaffen anschließend eine tragfähige Grundlage für die endgültige Entscheidung.",
    "speakingModel": "Auf dem Stadtplatz treffen wirtschaftliche Erreichbarkeit, Barrierefreiheit und Aufenthaltsqualität aufeinander. Geschäftsleute erklären, sie brauchten verlässliche Lieferzeiten. Anwohnende wünschen weniger Verkehr, mehr Grün und sichere Wege. Daraus entsteht ein Zielkonflikt. Ich schlage eine zwölfmonatige Testphase mit einer Lieferzone von 6 bis 10 Uhr, mobilen Bäumen und einer freien barrierefreien Route vor. Eine Einschränkung sind die Kosten und eine mögliche Verlagerung des Verkehrs. Deshalb sollten Lieferungen, Beschwerden, Fußgängerzahlen und Umsätze ausgewertet werden. Zum Schluss lässt sich festhalten: Ein zeitlich begrenzter Versuch liefert die Daten, die der Stadtrat für eine dauerhafte Entscheidung braucht."
  }
};
  Object.entries(updates).forEach(([moduleId, taskUpdate]) => {
    const module = course.modules.find(item => item.id === moduleId);
    if (!module) throw new Error(`Missing module for task model: ${moduleId}`);
    Object.assign(module.task, taskUpdate);
  });

  const speakingUpdates = {
    "a0-everyday-things": {
      speakingRequired: ["ist", "das", "ein", "eine"]
    },
    "a0-numbers-spelling-forms": {
      model: "Mein Vorname ist Lina.\nMein Nachname ist Roth.\nMeine Telefonnummer ist 503.\nMeine E-Mail-Adresse ist lina@example.de."
    },
    "a0-conversation-repair": {
      model: "Entschuldigung.\nIch verstehe das nicht.\nKönnen Sie das wiederholen?\nKönnen Sie das aufschreiben?\nA-D-R-E-S-S-E. Ist das richtig?"
    },
    "a0-time-date-schedule": {
      model: "Der Kurs ist am Montag.\nEr fängt um neun Uhr an.\nDie Pause ist um zehn Uhr.\nDer Kurs hört um elf Uhr auf."
    },
    "a1-daily-routine": {
      speakingModel: "Ich stehe um sieben Uhr auf. Dann frühstücke ich. Um acht Uhr arbeite ich. Um zwölf Uhr mache ich Pause. Ich gehe oft zu Fuß. Am Abend lerne ich Deutsch."
    },
    "a1-plans-and-leisure": {
      speakingModel: "Kommst du am Samstag mit ins Kino? Der Film beginnt um acht. Wenn du keine Zeit hast, können wir uns am Sonntag treffen. Gut, dann treffen wir uns am Sonntag um fünf."
    },
    "a1-health-past-checkpoint": {
      speakingModel: "Am Wochenende bin ich nach Hamburg gefahren. Ich habe eine Freundin besucht. Danach haben wir in einem Café gegessen. Das Wetter war kalt. Heute bin ich müde, aber zufrieden."
    },
    "a1-public-transport-tickets": {
      speakingGuide: ["Repeat the destination", "State the delay", "Ask for the track", "Ask where to change", "Ask for the arrival time"]
    },
    "a1-restaurant-needs-payment": {
      speakingRequired: [["hätte", "möchte"], "Gericht", ["ohne", "allergisch gegen", "Allergie"], "Rechnung", "bezahlen"]
    },
    "a1-hotel-checkin-problems": {
      speakingRequired: ["Reservierung", "Frühstück", ["Aufzug", "Lift"], "auschecken", "ruhig"]
    },
    "a2-erlebnisse": {
      speakingPrompt: "Tell a short weekend story and answer one follow-up question.",
      speakingModel: "Am Wochenende bin ich nach Bonn gefahren. Zuerst habe ich Mara getroffen. Dann haben wir einen Markt besucht. Später haben wir gekocht. Am Ende war ich müde und zufrieden. Mit wem bist du gefahren? Mit meiner Freundin."
    },
    "a2-termine-plaene": {
      speakingModel: "Guten Tag, hier ist Daniel Vogt. Ich muss den Termin am Dienstag verschieben, weil ich arbeiten muss. Passt Ihnen Mittwoch um vierzehn Uhr? Alternativ kann ich am Donnerstag um zehn Uhr. Gut, dann sehen wir uns am Mittwoch."
    },
    "a2-unterwegs": {
      speakingGuide: ["Name the cancelled train", "Ask where to change", "Ask whether the proposed route is direct or faster", "Confirm your choice"]
    },
    "a2-einkaufen-service": {
      speakingRequired: ["groesse", ["passt", "zu klein", "zu groß", "zu gross"]]
    },
    "a2-einladen-meinen": {
      speakingModel: "Ich lade dich am Samstag um vier Uhr in den Park ein. Wir feiern dort, weil das Wetter gut sein soll. Wenn es regnet, gehen wir zu mir. Gib mir bitte Bescheid."
    },
    "a2-work-schedules": {
      speakingRequired: [["Schicht", "Frühschicht", "Spätschicht"], "weil", "tauschen", "also"]
    },
    "a2-housing-search": {
      speakingRequired: ["Wohnung", ["Warmmiete", "Gesamtmiete", "Miete"], "besichtig", ["passt", "möglich", "moeglich", "geht"]]
    },
    "b1-erzaehlen": {
      speakingPrompt: "Tell a structured story with a surprise and an earlier event."
    },
    "b1-umwelt-mobilitaet": {
      speakingModel: "In der Innenstadt werden neue Radwege gebaut. Zwei Kreuzungen müssen sicherer gestaltet werden, damit mehr Menschen Rad fahren. Die Maßnahme kostet Geld. Darum beginnt die Stadt mit einem kleinen Abschnitt und prüft die Kosten nach sechs Monaten."
    },
    "b1-argumentieren": {
      speakingPrompt: "Give a structured position, respond to one objection, and propose a compromise.",
      speakingModel: "Meiner Meinung nach braucht der Platz mehr Bäume. Einerseits kosten die Maßnahmen Geld, andererseits verbessert sich die Aufenthaltsqualität. Außerdem werden die Wege sicherer. Die Lieferdienste brauchen Zugang. Die Kosten lassen sich durch einen einjährigen Versuch begrenzen. Ein Kompromiss wären feste Lieferzeiten am Morgen."
    },
    "b1-job-applications": {
      speakingPrompt: "Give a structured interview answer. Introduce your relevant experience, support one strength with an example, explain your interest in the role, and ask one informed question.",
      speakingRequired: ["seit", "Stärke", "Beispiel", "weil", "welche"]
    },
    "b1-media-comparison": {
      speakingPrompt: "Give a structured source briefing. State what is confirmed, attribute two claims, compare the evidence, identify one missing perspective, and recommend a next check."
    },
    "b1-healthcare-decisions": {
      speakingRequired: ["seit", "stärker", "versucht", "verstanden", ["wann", "welchen Warnzeichen"]],
      speakingModel: "Seit fünf Tagen habe ich Schmerzen im rechten Knie. Nach der Wanderung waren sie leicht, aber beim Treppensteigen werden sie stärker, ungefähr sechs von zehn. In Ruhe werden sie besser. Ich habe versucht, das Knie zu kühlen, und gestern Ibuprofen genommen. Wenn ich Sie richtig verstanden habe, soll ich es drei Tage schonen und weiter kühlen. Bei welchen Warnzeichen soll ich sofort wiederkommen?"
    },
    "b2-positionen": {
      speakingPrompt: "Present a structured position, answer an objection, and state one condition for success.",
      speakingModel: "Ich halte die Vier-Tage-Woche für sinnvoll, sofern die Beschäftigten an der Planung beteiligt werden. Obwohl die Umstellung Geld kostet, kann sie die Zufriedenheit erhöhen. Außerdem kann das Modell die Personalgewinnung erleichtern. Der Einwand einer höheren Arbeitsdichte ist berechtigt. Deshalb braucht jedes Team klare Grenzen. Erfolgreich ist es nur, wenn Ziele und Arbeitslast realistisch bleiben."
    },
    "b2-quellen": {
      speakingPrompt: "Give a concise source briefing with one unresolved question."
    },
    "b2-relativ-partizip": {
      speakingModel: "Die Initiative, die im letzten Jahr gestartet wurde, hilft betroffenen Haushalten. Die Beratenden, deren Erfahrung besonders wichtig ist, werten Verbrauchsdaten aus. Die gewonnenen Erkenntnisse fließen in ein neues Programm ein. Offen bleibt: Wie wird das Programm langfristig finanziert?"
    },
    "b2-haltung": {
      speakingRequired: [["dürfte", "könnte"], "doch"]
    },
    "b2-kohaesion": {
      speakingRequired: ["indem", ["sodass", "so dass"]]
    },
    "b2-integration": {
      speakingPrompt: "Give an extended proposal and address two likely follow-up questions.",
      speakingModel: "Auf dem Stadtplatz treffen wirtschaftliche Erreichbarkeit, Barrierefreiheit und Aufenthaltsqualität aufeinander. Geschäftsleute erklären, sie brauchten verlässliche Lieferzeiten. Anwohnende wünschen weniger Verkehr, mehr Grün und sichere Wege. Daraus entsteht ein Zielkonflikt. Ich schlage eine zwölfmonatige Testphase mit einer Lieferzone von 6 bis 10 Uhr, mobilen Bäumen und einer freien barrierefreien Route vor. Eine Einschränkung sind die Kosten und eine mögliche Verlagerung des Verkehrs. Deshalb sollten Lieferungen, Beschwerden, Fußgängerzahlen und Umsätze ausgewertet werden. Wie werden die Kosten begrenzt? Mobile Elemente vermeiden zunächst einen vollständigen Umbau. Bleibt die Lieferzufahrt erhalten? Ja, sie bleibt morgens von 6 bis 10 Uhr geöffnet. Zum Schluss lässt sich festhalten: Ein zeitlich begrenzter Versuch liefert die Daten für eine dauerhafte Entscheidung."
    },
    "b2-verhandlungen": {
      speakingPrompt: "Lead an extended negotiation about a proposed change in working hours. Open the agenda item, state your priority, clarify the other position, disagree on one detail, make a counterproposal, negotiate one condition, and summarize the provisional agreement.",
      speakingModel: "Auf der Tagesordnung stehen heute die geplanten Servicezeiten. Unsere Priorität ist eine verlässliche Erreichbarkeit. Verstehe ich Sie richtig, dass Sie längeren Öffnungszeiten zustimmen, sofern die Übergabe geregelt ist? Zwei Tage bis 19 Uhr halte ich wegen der knappen Abendbesetzung für schwierig. Wäre es denkbar, zunächst an drei Tagen bis 18 Uhr zu öffnen? Wir könnten nach sechs Wochen die Auslastung prüfen. Als Bedingung sollte das Team die Dienstpläne vier Wochen vorher erhalten. Wir halten fest, dass wir einen dreimonatigen Test vorbereiten. Offen bleibt die Vertretung bei Krankheit."
    },
    "b2-behoerdenpost": {
      speakingModel: "Guten Tag. Ich rufe wegen des Bescheids vom 4. März an. Das Aktenzeichen lautet BP-482/26. Am 10. Februar habe ich den Antrag gestellt, am 12. Februar den Mietvertrag hochgeladen und am 4. März den ablehnenden Bescheid erhalten. Der Bescheid nennt den Mietvertrag als fehlend, obwohl ich eine Eingangsbestätigung habe. Welche Frist gilt für den Widerspruch? Kann ich ihn beim genannten Amt über das Serviceportal einreichen? Verstehe ich Sie richtig: Ich prüfe heute die Rechtsbehelfsbelehrung und die Frist, reiche den Widerspruch beim genannten Amt ein, nenne das Aktenzeichen und füge die Eingangsbestätigung bei? Bitte nennen Sie mir noch eine Kontaktadresse für Rückfragen."
    },
    "b2-praesentieren": {
      speakingPrompt: "Give an extended presentation on the mobility trial and handle two likely follow-up questions. Introduce the relevance and structure, describe two figures, qualify one result, explain a limitation, give a recommendation, clarify an ambiguous question, and answer within the evidence available.",
      speakingModel: "Guten Morgen. Heute geht es um unseren Mobilitätstest. Das Thema ist relevant, weil Dienstreisen einen großen Teil unserer betrieblichen Emissionen verursachen. Zunächst beschreibe ich die Daten, anschließend die Ergebnisse und abschließend meine Empfehlung. Wie aus der Abbildung hervorgeht, stieg der Bahnanteil von 28 auf 43 Prozent. Die Emissionen sanken um rund zwölf Prozent. Die Datengrundlage umfasst allerdings nur eine Abteilung und sechs Monate. Deshalb empfehle ich einen weiteren Test. Wenn ich Ihre Frage richtig verstehe, möchten Sie die langfristige Wirkung kennen. Dazu liegen uns noch keine Daten vor. Wie haben sich die Kosten entwickelt? Die Kosten blieben im Test nahezu unverändert; für andere Abteilungen ist das noch offen."
    },
    "b2-mediation-konflikt": {
      speakingPrompt: "Moderate an extended conflict conversation. Invite each concern, summarize both views neutrally, clarify one disputed fact, identify a shared interest, reframe one fixed demand, propose a conditional trial, assign responsibilities, and confirm the review date.",
      speakingModel: "Vielen Dank. Welche Sorge möchten die Anwohnenden zuerst nennen? Welche Einschränkung sieht die Gruppe? Ich fasse zusammen: Die Gruppe braucht zwei nutzbare Abendtermine, und die Anwohnenden wünschen eine verlässliche Ruhezeit. Habe ich Sie richtig verstanden, dass vor allem die Gespräche im Hof nach 21 Uhr stören? Endete die Musik selbst bei den gemeldeten Terminen pünktlich? Die Forderung nach keinen Abendproben lässt sich als Bedarf nach einer verlässlichen Ruhezeit formulieren. Gemeinsam ist Ihnen der Wunsch nach festen Terminen und einer direkten Ansprechperson. Ich schlage einen achtwöchigen Test vor. Die Anwohnenden akzeptieren zwei Proben, sofern die Musik um 20.45 Uhr endet. Die Gruppe nutzt danach den Haupteingang, meidet den Hof und veröffentlicht Termine zwei Wochen vorher. Frau Kaya sammelt Rückmeldungen. Wir halten fest, dass nach vier Wochen eine gemeinsame Auswertung stattfindet."
    }
  };

  Object.entries(speakingUpdates).forEach(([moduleId, taskUpdate]) => {
    const module = course.modules.find(item => item.id === moduleId);
    if (!module) throw new Error(`Missing module for speaking update: ${moduleId}`);
    Object.assign(module.task, taskUpdate);
  });
})();
