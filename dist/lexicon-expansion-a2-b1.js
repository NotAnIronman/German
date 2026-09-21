(function () {
  const course = window.SATZWERK_CURRICULUM;
  if (!course?.modules) throw new Error("Satzwerk curriculum must load before the A2/B1 lexicon expansion");

  // Five carefully scoped additions for every A2 and B1 module in the final
  // curriculum. IDs are derived from the module ID plus a stable local slug.
  const packs = {
    "a2-erlebnisse": [
      ["reihenfolge", "die Reihenfolge, die Reihenfolgen", "order / sequence", "die Reihenfolge · in der richtigen Reihenfolge", "Erzähl die Ereignisse bitte in der richtigen Reihenfolge.", "Please tell the events in the correct order.", ["der Ablauf, die Abläufe"]],
      ["pech-haben", "Pech haben, hat Pech gehabt", "to be unlucky", "Pech haben · Glück haben", "Wir hatten Pech, weil das Museum schon geschlossen war.", "We were unlucky because the museum was already closed.", ["kein Glück haben"]],
      ["unterwegs-sein", "unterwegs sein, ist unterwegs gewesen", "to be out and about / on the way", "lange unterwegs sein", "Am Samstag waren wir den ganzen Tag unterwegs.", "On Saturday we were out all day.", ["auf dem Weg sein"]],
      ["erst-spaeter", "erst ... später", "not until ... later", "erst am Abend · zwei Stunden später", "Erst am Abend fanden wir den richtigen Weg; zwei Stunden später waren wir zu Hause.", "We did not find the right way until the evening; two hours later we were home.", ["zunächst ... später"]],
      ["erinnerung", "die Erinnerung, die Erinnerungen", "memory", "eine schöne Erinnerung · sich gern daran erinnern", "Die Reise ist für mich eine schöne Erinnerung.", "The trip is a lovely memory for me.", ["das Erlebnis, die Erlebnisse"]]
    ],
    "a2-wohnung-raum": [
      ["steckdose", "die Steckdose, die Steckdosen", "electrical outlet", "die Steckdose · neben der Steckdose", "Neben der Tür ist eine freie Steckdose.", "There is an available electrical outlet next to the door.", ["der Stromanschluss, die Stromanschlüsse"]],
      ["vorhang", "der Vorhang, die Vorhänge", "curtain", "der Vorhang · die Vorhänge", "Wir hängen den Vorhang vor das große Fenster.", "We are hanging the curtain in front of the large window.", ["die Gardine, die Gardinen", "der Vorhang, die Vorhaenge"]],
      ["kommode", "die Kommode, die Kommoden", "chest of drawers", "die Kommode · auf der Kommode", "Die Kommode steht jetzt zwischen dem Bett und der Wand.", "The chest of drawers is now between the bed and the wall.", ["der Schubladenschrank, die Schubladenschränke"]],
      ["aufbauen", "etwas aufbauen, hat aufgebaut", "to assemble / set something up", "ein Regal aufbauen", "Kannst du mir helfen, das Regal aufzubauen?", "Can you help me assemble the shelf?", ["etwas montieren"]],
      ["einrichten", "etwas einrichten, hat eingerichtet", "to furnish / set up", "eine Wohnung gemütlich einrichten", "Wir richten das Arbeitszimmer praktisch ein.", "We are setting up the study in a practical way.", ["möblieren", "etwas gestalten"]]
    ],
    "a2-termine-plaene": [
      ["ersatztermin", "der Ersatztermin, die Ersatztermine", "alternative appointment", "einen Ersatztermin anbieten", "Könnten Sie mir einen Ersatztermin am Montag anbieten?", "Could you offer me an alternative appointment on Monday?", ["ein anderer Termin"]],
      ["noch-frei", "noch frei sein", "to still be available", "am Dienstag noch frei sein", "Ist am Dienstagvormittag noch etwas frei?", "Is anything still available on Tuesday morning?", ["noch verfügbar sein"]],
      ["spaetestens", "spätestens", "no later than", "spätestens bis Freitag", "Bitte bestätigen Sie den Termin spätestens bis Freitag.", "Please confirm the appointment no later than Friday.", ["bis spätestens", "spaetestens"]],
      ["klappen", "klappen, hat geklappt", "to work out", "Das klappt gut. · Das klappt leider nicht.", "Donnerstag um vier klappt bei mir gut.", "Thursday at four works well for me.", ["passen", "funktionieren"]],
      ["kurzfristig", "kurzfristig", "at short notice", "kurzfristig absagen · kurzfristig frei werden", "Heute ist kurzfristig ein Termin frei geworden.", "An appointment became available at short notice today.", ["in letzter Minute"]]
    ],
    "a2-gesundheit": [
      ["husten", "der Husten, kein Plural", "cough", "starken Husten haben", "Seit drei Tagen habe ich starken Husten.", "I have had a bad cough for three days.", ["husten müssen"]],
      ["halsschmerzen", "die Halsschmerzen, nur Plural", "sore throat", "Halsschmerzen haben", "Beim Schlucken habe ich Halsschmerzen.", "My throat hurts when I swallow.", ["Schmerzen im Hals"]],
      ["schwindelig", "jemandem ist schwindelig", "to feel dizzy", "Mir ist schwindelig.", "Wenn ich aufstehe, ist mir manchmal schwindelig.", "When I stand up, I sometimes feel dizzy.", ["Schwindel haben"]],
      ["sich-uebergeben", "sich übergeben, hat sich übergeben", "to vomit", "sich mehrmals übergeben", "Das Kind hat sich in der Nacht zweimal übergeben.", "The child vomited twice during the night.", ["erbrechen", "sich uebergeben"]],
      ["gute-besserung", "Gute Besserung!", "Get well soon!", "jemandem gute Besserung wünschen", "Du klingst sehr erkältet. Gute Besserung!", "You sound very congested. Get well soon!", ["Werd schnell wieder gesund!"]]
    ],
    "a2-arbeit-lernen": [
      ["anleitung", "die Anleitung, die Anleitungen", "instructions / manual", "die Anleitung lesen · einer Anleitung folgen", "In der Anleitung steht jeder Schritt genau.", "Every step is described precisely in the instructions.", ["die Arbeitsanweisung, die Arbeitsanweisungen"]],
      ["datei", "die Datei, die Dateien", "file", "eine Datei öffnen · eine Datei speichern", "Ich habe die Datei im gemeinsamen Ordner gespeichert.", "I saved the file in the shared folder.", ["das Dokument, die Dokumente"]],
      ["ausdrucken", "etwas ausdrucken, hat ausgedruckt", "to print something", "den Bericht ausdrucken", "Soll ich den Bericht für die Besprechung ausdrucken?", "Should I print the report for the meeting?", ["etwas drucken"]],
      ["um-hilfe-bitten", "jemanden um Hilfe bitten, hat gebeten", "to ask someone for help", "eine Kollegin um Hilfe bitten", "Ich bitte meinen Kollegen um Hilfe bei dieser Aufgabe.", "I am asking my colleague for help with this task.", ["Hilfe brauchen"]],
      ["noch-einmal-erklaeren", "Könnten Sie das noch einmal erklären?", "Could you explain that again?", "etwas langsamer und noch einmal erklären", "Entschuldigung, könnten Sie den letzten Schritt noch einmal erklären?", "Excuse me, could you explain the last step again?", ["Können Sie das bitte wiederholen?", "Koennten Sie das noch einmal erklaeren?"]]
    ],
    "a2-unterwegs": [
      ["fahrplan", "der Fahrplan, die Fahrpläne", "timetable", "den Fahrplan prüfen · nach Fahrplan", "Laut Fahrplan fährt der letzte Bus um 23 Uhr.", "According to the timetable, the last bus leaves at 11 p.m.", ["der Zeitplan, die Zeitpläne", "der Fahrplan, die Fahrplaene"]],
      ["fahrkartenautomat", "der Fahrkartenautomat, die Fahrkartenautomaten", "ticket machine", "am Fahrkartenautomaten", "Der Fahrkartenautomat nimmt meine Karte nicht.", "The ticket machine will not accept my card.", ["der Ticketautomat, die Ticketautomaten"]],
      ["richtung", "die Richtung, die Richtungen", "direction", "in Richtung Zentrum", "Fährt dieser Zug in Richtung Flughafen?", "Does this train go toward the airport?", ["Richtung Hauptbahnhof"]],
      ["hin-und-rueckfahrt", "die Hin- und Rückfahrt, die Hin- und Rückfahrten", "round trip", "eine Fahrkarte für die Hin- und Rückfahrt", "Was kostet die Hin- und Rückfahrt nach Bremen?", "How much is a round trip to Bremen?", ["Hin- und Rückreise", "Hin- und Rueckfahrt"]],
      ["andere-strecke", "eine andere Strecke nehmen", "to take another route", "wegen der Störung eine andere Strecke nehmen", "Wegen der Sperrung müssen wir eine andere Strecke nehmen.", "Because of the closure, we have to take another route.", ["anders fahren", "eine Alternativroute nehmen"]]
    ],
    "a2-einkaufen-service": [
      ["material", "das Material, die Materialien", "material", "aus welchem Material · weiches Material", "Aus welchem Material ist diese Jacke?", "What material is this jacket made of?", ["der Stoff, die Stoffe"]],
      ["umkleidekabine", "die Umkleidekabine, die Umkleidekabinen", "changing room", "in der Umkleidekabine", "Die Umkleidekabinen sind hinten rechts.", "The changing rooms are at the back on the right.", ["die Kabine, die Kabinen"]],
      ["mit-karte", "mit Karte bezahlen, hat bezahlt", "to pay by card", "bar oder mit Karte bezahlen", "Kann ich diesen Betrag mit Karte bezahlen?", "Can I pay this amount by card?", ["bargeldlos bezahlen"]],
      ["auf-lager", "auf Lager sein", "to be in stock", "in Größe M auf Lager sein", "Ist das Hemd auch in Blau auf Lager?", "Is the shirt also in stock in blue?", ["vorrätig sein"]],
      ["steht-mir", "Das steht Ihnen gut.", "That suits you.", "jemandem gut stehen", "Die dunkle Farbe steht Ihnen besonders gut.", "The dark color suits you especially well.", ["Das passt gut zu Ihnen."]]
    ],
    "a2-einladen-meinen": [
      ["auf-jeden-fall", "auf jeden Fall", "definitely / in any case", "auf jeden Fall kommen", "Am Samstag kann ich auf jeden Fall kommen.", "I can definitely come on Saturday.", ["ganz bestimmt"]],
      ["leider-nicht-schaffen", "es leider nicht schaffen", "to unfortunately not be able to make it", "Ich schaffe es leider nicht.", "Ich muss länger arbeiten und schaffe es leider nicht zur Feier.", "I have to work longer and unfortunately cannot make it to the party.", ["leider nicht kommen können"]],
      ["was-meinst-du", "Was meinst du dazu?", "What do you think about that?", "jemanden nach seiner Meinung fragen", "Wir könnten draußen essen. Was meinst du dazu?", "We could eat outside. What do you think about that?", ["Wie findest du die Idee?"]],
      ["klingt-gut", "Das klingt gut.", "That sounds good.", "Das klingt nach einer guten Idee.", "Ein Picknick am See? Das klingt gut.", "A picnic by the lake? That sounds good.", ["Gute Idee!"]],
      ["grund", "der Grund, die Gründe", "reason", "einen Grund nennen · aus diesem Grund", "Ich kann aus einem wichtigen Grund erst später kommen.", "For an important reason, I cannot come until later.", ["die Begründung, die Begründungen", "der Grund, die Gruende"]]
    ],
    "a2-housing-search": [
      ["wohnungsanzeige", "die Wohnungsanzeige, die Wohnungsanzeigen", "apartment listing", "eine Wohnungsanzeige lesen · auf eine Anzeige antworten", "In der Wohnungsanzeige steht, dass Haustiere erlaubt sind.", "The apartment listing says that pets are allowed.", ["das Wohnungsinserat, die Wohnungsinserate"]],
      ["moebliert", "möbliert", "furnished", "voll möbliert · teilweise möbliert", "Das Zimmer wird möbliert vermietet.", "The room is rented furnished.", ["mit Möbeln", "moebliert"]],
      ["haustier-erlaubt", "Haustiere sind erlaubt.", "Pets are allowed.", "Haustiere erlaubt · Haustiere nicht erlaubt", "Sind in dieser Wohnung Haustiere erlaubt?", "Are pets allowed in this apartment?", ["Darf ich eine Katze halten?"]],
      ["selbstauskunft", "die Selbstauskunft, die Selbstauskünfte", "tenant information form", "eine Selbstauskunft ausfüllen", "Zur Bewerbung gehört eine ausgefüllte Selbstauskunft.", "A completed tenant information form is part of the application.", ["das Mieterformular, die Mieterformulare", "die Selbstauskunft, die Selbstauskuenfte"]],
      ["ab-wann-frei", "Ab wann ist die Wohnung frei?", "From when is the apartment available?", "ab sofort · ab dem ersten Mai", "Ab wann könnte ich in die Wohnung einziehen?", "When could I move into the apartment?", ["Wann wird die Wohnung frei?"]]
    ],
    "a2-work-schedules": [
      ["feierabend", "der Feierabend, die Feierabende", "end of the workday", "Feierabend machen · nach Feierabend", "Heute mache ich wegen der Besprechung später Feierabend.", "I am finishing work later today because of the meeting.", ["Arbeitsschluss"]],
      ["einspringen", "für jemanden einspringen, ist eingesprungen", "to cover for someone", "kurzfristig für eine Kollegin einspringen", "Kannst du morgen in der Frühschicht für mich einspringen?", "Can you cover my early shift tomorrow?", ["jemanden vertreten"]],
      ["krankheitsbedingt", "krankheitsbedingt", "due to illness", "krankheitsbedingt ausfallen", "Die Spätschicht ist krankheitsbedingt noch nicht besetzt.", "The late shift is still unstaffed due to illness.", ["wegen Krankheit"]],
      ["dringend", "dringend", "urgent / urgently", "dringend erledigen", "Diese Aufgabe muss heute dringend erledigt werden.", "This task urgently needs to be completed today.", ["eilig"]],
      ["zeitlich-schaffen", "etwas zeitlich schaffen", "to have enough time for something", "die Aufgabe heute zeitlich schaffen", "Ich weiß nicht, ob ich beide Berichte heute zeitlich schaffe.", "I do not know whether I have enough time for both reports today.", ["genug Zeit für etwas haben"]]
    ],
    "a2-public-appointments": [
      ["wartemarke", "die Wartemarke, die Wartemarken", "queue ticket", "eine Wartemarke ziehen", "Bitte ziehen Sie zuerst eine Wartemarke.", "Please take a queue ticket first.", ["die Nummer, die Nummern"]],
      ["passfoto", "das Passfoto, die Passfotos", "passport photo", "ein biometrisches Passfoto", "Für den Antrag brauche ich ein aktuelles Passfoto.", "I need a current passport photo for the application.", ["das biometrische Foto, die biometrischen Fotos"]],
      ["oeffnungszeit", "die Öffnungszeit, die Öffnungszeiten", "opening time / hours", "die aktuellen Öffnungszeiten", "Die Öffnungszeiten stehen auf der Webseite des Bürgeramts.", "The opening hours are on the municipal office website.", ["die Sprechzeit, die Sprechzeiten", "die Oeffnungszeiten"]],
      ["online-buchen", "einen Termin online buchen, hat gebucht", "to book an appointment online", "online einen freien Termin auswählen", "Ich habe den Termin über das Onlineportal gebucht.", "I booked the appointment through the online portal.", ["online reservieren"]],
      ["richtige-stelle", "die zuständige Stelle, die zuständigen Stellen", "responsible office", "sich an die zuständige Stelle wenden", "Welche Stelle ist für diesen Antrag zuständig?", "Which office is responsible for this application?", ["die richtige Behörde, die richtigen Behörden"]]
    ],
    "a2-travel-disruptions": [
      ["reisezentrum", "das Reisezentrum, die Reisezentren", "travel center", "im Reisezentrum nachfragen", "Im Reisezentrum bekommen Sie eine neue Verbindung.", "At the travel center, you can get a new connection.", ["der Fahrkartenschalter, die Fahrkartenschalter"]],
      ["sitzplatz", "der Sitzplatz, die Sitzplätze", "seat", "einen Sitzplatz reservieren", "Gilt meine Sitzplatzreservierung auch im Ersatzzug?", "Is my seat reservation also valid on the replacement train?", ["der Platz, die Plätze", "der Sitzplatz, die Sitzplaetze"]],
      ["schienenersatzbus", "der Ersatzbus, die Ersatzbusse", "replacement bus", "mit dem Ersatzbus weiterfahren", "Der Ersatzbus hält vor dem Bahnhofsgebäude.", "The replacement bus stops in front of the station building.", ["der Schienenersatzverkehr"]],
      ["alternative-verbindung", "die alternative Verbindung, die alternativen Verbindungen", "alternative connection", "eine schnellere alternative Verbindung", "Gibt es eine alternative Verbindung ohne Umstieg?", "Is there an alternative connection without a transfer?", ["eine andere Reisemöglichkeit"]],
      ["fahrgastrechte", "die Fahrgastrechte, nur Plural", "passenger rights", "sich über Fahrgastrechte informieren", "Bei einer langen Verspätung gelten bestimmte Fahrgastrechte.", "Certain passenger rights apply in the event of a long delay.", ["die Rechte der Fahrgäste"]]
    ],
    "a2-market-checkout": [
      ["bund", "der Bund, die Bünde", "bunch / bundle", "ein Bund Radieschen", "Ich nehme einen Bund Radieschen und zwei Gurken.", "I will take a bunch of radishes and two cucumbers.", ["das Bündel, die Bündel", "der Bund, die Buende"]],
      ["wechselgeld", "das Wechselgeld, kein Plural", "change", "das Wechselgeld nachzählen", "Entschuldigung, beim Wechselgeld fehlen zwei Euro.", "Excuse me, two euros are missing from the change.", ["das Rückgeld"]],
      ["bar-bezahlen", "bar bezahlen, hat bar bezahlt", "to pay in cash", "bar oder mit Karte bezahlen", "Kann ich hier auch bar bezahlen?", "Can I also pay in cash here?", ["mit Bargeld bezahlen"]],
      ["regional", "regional", "regional / locally produced", "regionale Produkte", "Die regionalen Äpfel kommen von einem Hof in der Nähe.", "The local apples come from a farm nearby.", ["aus der Region"]],
      ["was-darf-es-sein", "Was darf es sein?", "What can I get you?", "Was darf es für Sie sein?", "Guten Morgen! Was darf es für Sie sein?", "Good morning! What can I get you?", ["Was hätten Sie gern?"]]
    ],
    "a2-recipe-adaptation": [
      ["topf", "der Topf, die Töpfe", "pot", "ein großer Topf · im Topf", "Erhitze das Wasser in einem großen Topf.", "Heat the water in a large pot.", ["der Kochtopf, die Kochtöpfe", "der Topf, die Toepfe"]],
      ["pfanne", "die Pfanne, die Pfannen", "frying pan", "in der Pfanne braten", "Brate das Gemüse fünf Minuten in der Pfanne.", "Fry the vegetables in the pan for five minutes.", ["die Bratpfanne, die Bratpfannen"]],
      ["schaelen", "etwas schälen, hat geschält", "to peel something", "Kartoffeln schälen", "Schäle zuerst die Kartoffeln und die Karotten.", "First peel the potatoes and carrots.", ["die Schale entfernen", "schaelen"]],
      ["koecheln", "köcheln lassen, hat köcheln lassen", "to let simmer", "zehn Minuten köcheln lassen", "Lass die Soße bei niedriger Hitze köcheln.", "Let the sauce simmer over low heat.", ["sanft kochen lassen", "koecheln lassen"]],
      ["anschliessend", "anschließend", "afterwards / next", "zuerst ... anschließend ...", "Zuerst schneidest du das Gemüse; anschließend gibst du es in den Topf.", "First you cut the vegetables; afterwards you put them in the pot.", ["danach", "anschliessend"]]
    ],
    "a2-parcel-service": [
      ["verpackung", "die Verpackung, die Verpackungen", "packaging", "eine stabile Verpackung", "Für die Flasche brauchen Sie eine stabile Verpackung.", "You need sturdy packaging for the bottle.", ["der Karton, die Kartons"]],
      ["sendungsnummer", "die Sendungsnummer, die Sendungsnummern", "tracking number", "die Sendungsnummer eingeben", "Mit der Sendungsnummer können Sie das Paket online verfolgen.", "You can track the parcel online with the tracking number.", ["die Trackingnummer, die Trackingnummern"]],
      ["filiale", "die Filiale, die Filialen", "branch", "in einer Filiale abholen", "Ihr Paket liegt sieben Tage in der Filiale bereit.", "Your parcel will be held at the branch for seven days.", ["die Postfiliale, die Postfilialen"]],
      ["gewicht", "das Gewicht, die Gewichte", "weight", "das zulässige Gewicht", "Das Gewicht darf zwei Kilogramm nicht überschreiten.", "The weight may not exceed two kilograms.", ["das Paketgewicht"]],
      ["beschaedigt-ankommen", "beschädigt ankommen, ist beschädigt angekommen", "to arrive damaged", "beim Transport beschädigt werden", "Das Paket ist geöffnet und beschädigt angekommen.", "The parcel arrived open and damaged.", ["kaputt geliefert werden", "beschaedigt ankommen"]]
    ],
    "a2-everyday-banking": [
      ["kontostand", "der Kontostand, die Kontostände", "account balance", "den Kontostand prüfen", "Nach der Überweisung prüfe ich meinen Kontostand.", "After the transfer, I check my account balance.", ["der Saldo, die Salden", "der Kontostand, die Kontostaende"]],
      ["ueberweisung", "die Überweisung, die Überweisungen", "bank transfer", "eine Überweisung ausführen", "Die Überweisung ist noch nicht auf dem anderen Konto angekommen.", "The transfer has not yet reached the other account.", ["Geld überweisen", "die Ueberweisung"]],
      ["pin", "die PIN, die PINs", "PIN", "die PIN eingeben · die PIN ändern", "Nach drei falschen Eingaben wurde meine PIN gesperrt.", "My PIN was blocked after three incorrect entries.", ["die Geheimzahl, die Geheimzahlen"]],
      ["geld-abheben", "Geld abheben, hat abgehoben", "to withdraw money", "am Geldautomaten Geld abheben", "Ich möchte hundert Euro von meinem Konto abheben.", "I would like to withdraw one hundred euros from my account.", ["Bargeld abheben"]],
      ["empfaengername", "der Empfängername, die Empfängernamen", "recipient name", "den Empfängernamen eintragen", "Prüfen Sie vor dem Senden den Empfängernamen und die IBAN.", "Check the recipient name and IBAN before sending.", ["der Name des Empfängers", "der Empfaengername"]]
    ],
    "a2-phone-internet-support": [
      ["stoerung", "die Störung, die Störungen", "fault / outage", "eine technische Störung melden", "Ich möchte eine Störung meines Anschlusses melden.", "I would like to report a fault with my connection.", ["das technische Problem, die technischen Probleme", "die Stoerung"]],
      ["blinken", "blinken, hat geblinkt", "to blink", "rot blinken · dauerhaft leuchten", "Seit dem Neustart blinkt die Internetleuchte rot.", "The internet light has been blinking red since the restart.", ["aufblinken"]],
      ["stecker-ziehen", "den Stecker ziehen, hat gezogen", "to unplug", "den Stecker kurz ziehen", "Ziehen Sie den Stecker für dreißig Sekunden aus der Steckdose.", "Unplug the device from the outlet for thirty seconds.", ["das Gerät vom Strom trennen"]],
      ["terminfenster", "das Terminfenster, die Terminfenster", "appointment window", "ein Terminfenster von acht bis zwölf Uhr", "Das Terminfenster für den Techniker ist zwischen acht und zwölf Uhr.", "The technician's appointment window is between eight and twelve.", ["der Zeitraum für den Termin"]],
      ["mobile-daten", "die mobilen Daten, nur Plural", "mobile data", "mobile Daten einschalten", "Bis zur Reparatur nutze ich meine mobilen Daten.", "I am using my mobile data until the repair.", ["das Mobilfunknetz"]]
    ],
    "a2-household-utilities": [
      ["anbieter", "der Anbieter, die Anbieter", "provider", "den Anbieter kontaktieren", "Unser Anbieter hat den monatlichen Preis erhöht.", "Our provider increased the monthly price.", ["das Versorgungsunternehmen, die Versorgungsunternehmen"]],
      ["abschlag", "der Abschlag, die Abschläge", "monthly advance payment", "einen monatlichen Abschlag zahlen", "Der monatliche Abschlag wird ab Januar niedriger.", "The monthly advance payment will be lower from January.", ["die Vorauszahlung, die Vorauszahlungen", "der Abschlag, die Abschlaege"]],
      ["heizkosten", "die Heizkosten, nur Plural", "heating costs", "hohe Heizkosten · Heizkosten senken", "Unsere Heizkosten waren im letzten Winter sehr hoch.", "Our heating costs were very high last winter.", ["die Kosten fürs Heizen"]],
      ["zaehler-fotografieren", "den Zähler fotografieren, hat fotografiert", "to photograph the meter", "den aktuellen Zählerstand fotografieren", "Beim Einzug habe ich den Wasserzähler fotografiert.", "I photographed the water meter when I moved in.", ["ein Foto vom Zähler machen", "den Zaehler fotografieren"]],
      ["sparsam", "sparsam", "economical / sparing", "sparsam mit Wasser umgehen", "Wir versuchen, im Alltag sparsam mit Strom umzugehen.", "We try to use electricity economically in everyday life.", ["energiesparend"]]
    ],
    "a2-school-childcare": [
      ["erlaubniszettel", "der Erlaubniszettel, die Erlaubniszettel", "permission slip", "einen Erlaubniszettel unterschreiben", "Bitte geben Sie den unterschriebenen Erlaubniszettel morgen ab.", "Please return the signed permission slip tomorrow.", ["die Einverständniserklärung, die Einverständniserklärungen"]],
      ["mittagessen", "das Mittagessen, die Mittagessen", "lunch", "am Mittagessen teilnehmen", "Mein Kind braucht am Dienstag kein Mittagessen.", "My child does not need lunch on Tuesday.", ["das Schulessen"]],
      ["abholberechtigt", "abholberechtigt sein", "to be authorized to pick up", "eine abholberechtigte Person", "Meine Schwester ist ebenfalls abholberechtigt.", "My sister is also authorized to pick up my child.", ["ein Kind abholen dürfen"]],
      ["verspaetung-melden", "eine Verspätung melden, hat gemeldet", "to report a delay", "eine kurze Verspätung telefonisch melden", "Ich möchte melden, dass wir uns etwa zehn Minuten verspäten.", "I would like to report that we will be about ten minutes late.", ["später kommen"]],
      ["sportsachen", "die Sportsachen, nur Plural", "sports kit", "die Sportsachen mitbringen", "Am Donnerstag sollen alle Kinder ihre Sportsachen mitbringen.", "All children should bring their sports kit on Thursday.", ["die Sportkleidung"]]
    ],
    "a2-natural-social-talk": [
      ["uebrigens", "übrigens", "by the way", "Übrigens, ...", "Übrigens, ich wohne auch in diesem Viertel.", "By the way, I also live in this neighborhood.", ["nebenbei gesagt", "uebrigens"]],
      ["echt", "Echt?", "Really?", "Echt? Das ist ja interessant.", "Du hast dort gearbeitet? Echt?", "You worked there? Really?", ["Wirklich?"]],
      ["erzaehl-mal", "Erzähl mal!", "Tell me about it!", "Erzähl mal mehr davon!", "Du warst in Wien? Erzähl mal, wie es war!", "You were in Vienna? Tell me what it was like!", ["Erzähl doch mal!", "Erzaehl mal!"]],
      ["was-machst-du-so", "Was machst du so in deiner Freizeit?", "What do you do in your free time?", "nach Hobbys und Interessen fragen", "Was machst du so, wenn du nicht arbeitest?", "What do you do when you are not working?", ["Was sind deine Hobbys?"]],
      ["war-nett", "Es war nett, mit dir zu reden.", "It was nice talking to you.", "ein Gespräch freundlich beenden", "Ich muss leider los. Es war nett, mit dir zu reden.", "I have to go. It was nice talking to you.", ["Schön, dich kennenzulernen."]]
    ],
    "a2-fitness-class": [
      ["trainingsmatte", "die Trainingsmatte, die Trainingsmatten", "exercise mat", "eine Trainingsmatte ausleihen", "Für den Kurs kannst du eine Trainingsmatte ausleihen.", "You can borrow an exercise mat for the class.", ["die Sportmatte, die Sportmatten"]],
      ["mitgliedschaft-kuendigen", "die Mitgliedschaft kündigen, hat gekündigt", "to cancel a membership", "fristgerecht kündigen", "Wie kann ich meine Mitgliedschaft zum Monatsende kündigen?", "How can I cancel my membership at the end of the month?", ["den Vertrag beenden", "die Mitgliedschaft kuendigen"]],
      ["spind", "der Spind, die Spinde", "locker", "einen Spind benutzen", "Für den Spind brauchst du eine Ein-Euro-Münze.", "You need a one-euro coin for the locker.", ["das Schließfach, die Schließfächer"]],
      ["muskelkater", "der Muskelkater, kein Plural", "sore muscles", "Muskelkater haben", "Nach dem ersten Training hatte ich starken Muskelkater.", "I had very sore muscles after the first workout.", ["schmerzende Muskeln"]],
      ["pause-machen", "eine Pause machen, hat gemacht", "to take a break", "eine kurze Pause brauchen", "Wenn dir schwindelig wird, mach bitte sofort eine Pause.", "If you feel dizzy, please take a break immediately.", ["sich kurz ausruhen"]]
    ],
    "a2-weather-plan": [
      ["grad", "das Grad, die Grad", "degree", "zwanzig Grad · minus fünf Grad", "Morgen werden es nur zwölf Grad.", "Tomorrow it will only reach twelve degrees.", ["°C"]],
      ["nebel", "der Nebel, kein Plural", "fog", "dichter Nebel", "Am Morgen gibt es auf den Straßen dichten Nebel.", "There will be dense fog on the roads in the morning.", ["nebliges Wetter"]],
      ["sonnencreme", "die Sonnencreme, die Sonnencremes", "sunscreen", "Sonnencreme benutzen", "Nimm für die Wanderung genug Sonnencreme mit.", "Take enough sunscreen for the hike.", ["der Sonnenschutz, kein Plural"]],
      ["verschieben-wetter", "etwas wegen des Wetters verschieben, hat verschoben", "to postpone something because of the weather", "den Ausflug auf Sonntag verschieben", "Wegen des Gewitters verschieben wir den Ausflug auf Sonntag.", "Because of the thunderstorm, we are postponing the trip until Sunday.", ["einen neuen Termin suchen"]],
      ["aufklaren", "aufklaren, hat aufgeklart", "to clear up", "am Nachmittag aufklaren", "Laut Vorhersage klart es am Nachmittag auf.", "According to the forecast, it will clear up in the afternoon.", ["heller werden"]]
    ],
    "a2-repair-shop": [
      ["ersatzteil", "das Ersatzteil, die Ersatzteile", "spare part", "ein Ersatzteil bestellen", "Das passende Ersatzteil muss erst bestellt werden.", "The correct spare part has to be ordered first.", ["das Austauschteil, die Austauschteile"]],
      ["rechnung", "die Rechnung, die Rechnungen", "invoice / bill", "eine detaillierte Rechnung", "Bitte schicken Sie mir die Rechnung per E-Mail.", "Please send me the invoice by email.", ["der Rechnungsbeleg, die Rechnungsbelege"]],
      ["bremsbelag", "der Bremsbelag, die Bremsbeläge", "brake pad", "die Bremsbeläge wechseln", "Die Bremsbeläge sind abgenutzt und müssen gewechselt werden.", "The brake pads are worn and need to be replaced.", ["der Bremsbelag, die Bremsbelaege"]],
      ["reparaturdauer", "die Reparaturdauer, die Reparaturdauern", "repair time", "nach der voraussichtlichen Reparaturdauer fragen", "Wie lang ist die voraussichtliche Reparaturdauer?", "How long is the expected repair time?", ["Wie lange dauert die Reparatur?"]],
      ["werkstattgarantie", "die Werkstattgarantie, die Werkstattgarantien", "repair-shop warranty", "Garantie auf die Reparatur", "Gibt die Werkstatt eine Garantie auf die neue Bremse?", "Does the repair shop provide a warranty on the new brake?", ["die Reparaturgarantie, die Reparaturgarantien"]]
    ],
    "a2-lost-property": [
      ["ausweis", "der Ausweis, die Ausweise", "ID card", "einen Ausweis vorzeigen", "Zum Abholen des Rucksacks muss ich meinen Ausweis vorzeigen.", "I have to show my ID to collect the backpack.", ["das Ausweisdokument, die Ausweisdokumente"]],
      ["inhalt", "der Inhalt, die Inhalte", "contents", "den Inhalt genau beschreiben", "Können Sie den Inhalt der Tasche beschreiben?", "Can you describe the contents of the bag?", ["Was war darin?"]],
      ["dunkelblau", "dunkelblau", "dark blue", "eine dunkelblaue Tasche", "Ich suche eine kleine dunkelblaue Geldbörse.", "I am looking for a small dark-blue wallet.", ["marineblau"]],
      ["abgeben", "etwas abgeben, hat abgegeben", "to hand something in", "einen Fund beim Fundbüro abgeben", "Eine Fahrerin hat den Schlüsselbund beim Fundbüro abgegeben.", "A driver handed the key ring in at the lost-property office.", ["etwas einreichen"]],
      ["als-eigentum-erkennen", "etwas als sein Eigentum erkennen", "to identify something as one's property", "einen Gegenstand eindeutig erkennen", "An dem Aufkleber kann ich den Laptop als mein Eigentum erkennen.", "I can identify the laptop as my property by the sticker.", ["beweisen, dass etwas mir gehört"]]
    ],
    "a2-emergency-help": [
      ["genaue-adresse", "die genaue Adresse, die genauen Adressen", "exact address", "die genaue Adresse nennen", "Nennen Sie zuerst die genaue Adresse des Unfallorts.", "First give the exact address of the accident scene.", ["der genaue Standort, die genauen Standorte"]],
      ["gefahr", "die Gefahr, die Gefahren", "danger", "akute Gefahr · außer Gefahr", "Gehen Sie nicht näher, solange noch Gefahr besteht.", "Do not go closer while danger still exists.", ["das Risiko, die Risiken"]],
      ["bei-bewusstsein", "bei Bewusstsein sein", "to be conscious", "nicht bei Bewusstsein sein", "Die verletzte Person ist bei Bewusstsein und spricht mit mir.", "The injured person is conscious and speaking with me.", ["ansprechbar sein"]],
      ["nicht-bewegen", "jemanden nicht bewegen", "not to move someone", "eine verletzte Person nicht bewegen", "Bewegen Sie die Person nur, wenn unmittelbare Gefahr besteht.", "Move the person only if there is immediate danger.", ["liegen lassen"]],
      ["was-ist-passiert", "Was ist genau passiert?", "What exactly happened?", "den Unfall kurz beschreiben", "Ein Radfahrer ist gestürzt und hat sich am Kopf verletzt.", "A cyclist fell and injured his head.", ["Wie ist es passiert?"]]
    ],
    "a2-medicine-safety": [
      ["wechselwirkung", "die Wechselwirkung, die Wechselwirkungen", "drug interaction", "Wechselwirkungen mit anderen Medikamenten", "Gibt es Wechselwirkungen mit meinem Blutdruckmittel?", "Are there interactions with my blood-pressure medication?", ["die gegenseitige Wirkung"]],
      ["vor-dem-essen", "vor dem Essen", "before eating", "vor · während · nach dem Essen", "Nehmen Sie die Tablette eine halbe Stunde vor dem Essen ein.", "Take the tablet half an hour before eating.", ["auf nüchternen Magen"]],
      ["haltbar-bis", "haltbar bis", "usable until / expiry date", "bis Ende Mai haltbar", "Die Tropfen sind nach dem Öffnen noch sechs Wochen haltbar.", "The drops remain usable for six weeks after opening.", ["das Verfallsdatum, die Verfallsdaten"]],
      ["apotheker", "der Apotheker, die Apotheker / die Apothekerin, die Apothekerinnen", "pharmacist", "den Apotheker um Rat fragen", "Fragen Sie Ihre Apothekerin, wenn Sie unsicher sind.", "Ask your pharmacist if you are unsure.", ["das Apothekenpersonal"]],
      ["dosis-auslassen", "eine Dosis auslassen, hat ausgelassen", "to miss / skip a dose", "eine vergessene Dosis", "Was soll ich tun, wenn ich eine Dosis ausgelassen habe?", "What should I do if I missed a dose?", ["eine Einnahme vergessen"]]
    ],
    "a2-transit-pass": [
      ["tarif", "der Tarif, die Tarife", "fare / tariff", "der günstigste Tarif", "Welcher Tarif passt für meine tägliche Strecke?", "Which fare works for my daily route?", ["die Preisstufe, die Preisstufen"]],
      ["gueltigkeitsbereich", "der Gültigkeitsbereich, die Gültigkeitsbereiche", "validity area", "im gesamten Gültigkeitsbereich", "Auf der Karte sehen Sie den Gültigkeitsbereich des Tickets.", "The map shows the ticket's validity area.", ["der Bereich, in dem das Ticket gilt", "der Gueltigkeitsbereich"]],
      ["abo-kuendigen", "ein Abo kündigen, hat gekündigt", "to cancel a subscription", "ein Abo fristgerecht kündigen", "Bis wann muss ich das Abo zum Monatsende kündigen?", "By when do I have to cancel the subscription for the end of the month?", ["das Abonnement beenden", "ein Abo kuendigen"]],
      ["ausbildungsrabatt", "der Ausbildungsrabatt, die Ausbildungsrabatte", "trainee / student discount", "einen Ausbildungsrabatt erhalten", "Für den Rabatt brauchen Sie einen aktuellen Ausbildungsnachweis.", "You need current proof of training for the discount.", ["die Ermäßigung für Auszubildende"]],
      ["automatisch-verlaengern", "sich automatisch verlängern, hat sich verlängert", "to renew automatically", "sich jeden Monat automatisch verlängern", "Die Monatskarte verlängert sich automatisch, wenn Sie nicht kündigen.", "The monthly pass renews automatically unless you cancel.", ["automatisch weiterlaufen", "sich automatisch verlaengern"]]
    ],
    "a2-public-library": [
      ["katalog", "der Katalog, die Kataloge", "catalog", "im Onlinekatalog suchen", "Im Katalog können Sie nach Titel oder Autor suchen.", "In the catalog, you can search by title or author.", ["der Bibliothekskatalog, die Bibliothekskataloge"]],
      ["regalnummer", "die Regalnummer, die Regalnummern", "shelf number", "eine Regalnummer notieren", "Die Regalnummer steht unter dem Suchergebnis.", "The shelf number appears below the search result.", ["der Standort, die Standorte"]],
      ["ausleihen", "etwas ausleihen, hat ausgeliehen", "to borrow something", "bis zu zehn Medien ausleihen", "Mit dem Ausweis darf ich zehn Bücher gleichzeitig ausleihen.", "With the card, I may borrow ten books at once.", ["entleihen"]],
      ["faellig", "fällig sein", "to be due", "am Montag fällig sein", "Das Hörbuch ist morgen zur Rückgabe fällig.", "The audiobook is due back tomorrow.", ["zurückgegeben werden müssen"]],
      ["arbeitsplatz", "der Arbeitsplatz, die Arbeitsplätze", "study space / workstation", "einen ruhigen Arbeitsplatz reservieren", "Im Lesesaal gibt es ruhige Arbeitsplätze mit Steckdosen.", "There are quiet workspaces with outlets in the reading room.", ["der Lernplatz, die Lernplätze"]]
    ],
    "a2-accessible-directions": [
      ["aufzug", "der Aufzug, die Aufzüge", "elevator", "mit dem Aufzug fahren", "Der Aufzug befindet sich hinter der Information.", "The elevator is behind the information desk.", ["der Lift, die Lifte", "der Aufzug, die Aufzuege"]],
      ["stufenlos", "stufenlos", "step-free", "ein stufenloser Weg", "Der Seiteneingang ist stufenlos erreichbar.", "The side entrance is accessible without steps.", ["ohne Stufen", "barrierefrei"]],
      ["ecke", "die Ecke, die Ecken", "corner", "an der nächsten Ecke", "Biegen Sie an der nächsten Ecke links ab.", "Turn left at the next corner.", ["die Straßenecke, die Straßenecken"]],
      ["bus-nehmen", "den Bus nehmen, hat genommen", "to take the bus", "den Bus bis zum Rathaus nehmen", "Nehmen Sie den Bus 14 bis zur Haltestelle Markt.", "Take bus 14 to the Markt stop.", ["mit dem Bus fahren"]],
      ["linke-seite", "auf der linken Seite", "on the left-hand side", "direkt auf der linken Seite", "Nach der Ampel sehen Sie die Apotheke auf der linken Seite.", "After the traffic light, you will see the pharmacy on the left.", ["links von Ihnen"]]
    ],
    "a2-flat-chores": [
      ["putzplan", "der Putzplan, die Putzpläne", "cleaning rota", "einen wöchentlichen Putzplan machen", "Im Putzplan steht, wer diese Woche das Bad reinigt.", "The cleaning rota says who cleans the bathroom this week.", ["der Reinigungsplan, die Reinigungspläne", "der Putzplan, die Putzplaene"]],
      ["muell-rausbringen", "den Müll rausbringen, hat rausgebracht", "to take out the rubbish", "abends den Müll rausbringen", "Kannst du heute bitte den Müll rausbringen?", "Can you please take out the rubbish today?", ["den Abfall hinaustragen"]],
      ["staubsaugen", "staubsaugen, hat staubgesaugt", "to vacuum", "das Wohnzimmer staubsaugen", "Ich staubsauge samstags den Flur und das Wohnzimmer.", "I vacuum the hallway and living room on Saturdays.", ["mit dem Staubsauger reinigen"]],
      ["abwischen", "etwas abwischen, hat abgewischt", "to wipe something down", "den Tisch feucht abwischen", "Wisch bitte nach dem Kochen die Arbeitsfläche ab.", "Please wipe down the worktop after cooking.", ["sauber wischen"]],
      ["abmachung", "die Abmachung, die Abmachungen", "agreement / arrangement", "sich an eine Abmachung halten", "Unsere Abmachung ist, dass jeder sein Geschirr sofort spült.", "Our agreement is that everyone washes their dishes immediately.", ["die Vereinbarung, die Vereinbarungen"]]
    ],
    "a2-hairdresser": [
      ["seitenscheitel", "der Seitenscheitel, die Seitenscheitel", "side part", "einen Seitenscheitel tragen", "Ich hätte gern einen Seitenscheitel wie auf diesem Foto.", "I would like a side part like in this photo.", ["der Scheitel, die Scheitel"]],
      ["haarschneidemaschine", "die Haarschneidemaschine, die Haarschneidemaschinen", "hair clippers", "mit der Haarschneidemaschine schneiden", "An den Seiten können Sie die Haarschneidemaschine benutzen.", "You can use the clippers on the sides.", ["der Haarschneider, die Haarschneider"]],
      ["seiten-kuerzer", "an den Seiten kürzer", "shorter on the sides", "oben länger, an den Seiten kürzer", "Bitte oben etwas länger und an den Seiten deutlich kürzer.", "Please leave it a little longer on top and much shorter on the sides.", ["die Seiten kurz schneiden", "an den Seiten kuerzer"]],
      ["waschen", "die Haare waschen, hat gewaschen", "to wash one's hair", "waschen, schneiden und föhnen", "Ist das Waschen im Preis enthalten?", "Is washing included in the price?", ["eine Haarwäsche machen"]],
      ["wartezeit", "die Wartezeit, die Wartezeiten", "wait time", "mit kurzer Wartezeit", "Ohne Termin beträgt die Wartezeit ungefähr dreißig Minuten.", "Without an appointment, the wait is about thirty minutes.", ["Wie lange muss ich warten?"]]
    ],
    "a2-phone-voicemail": [
      ["warteschleife", "die Warteschleife, die Warteschleifen", "hold queue", "in der Warteschleife bleiben", "Ich war zehn Minuten in der Warteschleife.", "I was on hold for ten minutes.", ["in der Leitung warten"]],
      ["verbindung-abbrechen", "die Verbindung bricht ab, ist abgebrochen", "the connection drops", "plötzlich abbrechen", "Entschuldigung, die Verbindung ist gerade abgebrochen.", "Sorry, the connection just dropped.", ["Das Gespräch wurde unterbrochen."]],
      ["buchstabieren", "etwas buchstabieren, hat buchstabiert", "to spell something", "den Nachnamen buchstabieren", "Könnten Sie Ihre E-Mail-Adresse bitte buchstabieren?", "Could you please spell your email address?", ["Buchstabe für Buchstabe sagen"]],
      ["es-geht-um", "Es geht um ...", "It is about ...", "Es geht um meine Rechnung.", "Guten Tag, mein Name ist Kaya. Es geht um meinen Termin morgen.", "Hello, my name is Kaya. It is about my appointment tomorrow.", ["Ich rufe wegen ... an."]],
      ["nummer-notieren", "eine Nummer notieren, hat notiert", "to note down a number", "eine Rückrufnummer notieren", "Haben Sie etwas zum Schreiben, damit Sie die Nummer notieren können?", "Do you have something to write with so you can note down the number?", ["eine Nummer aufschreiben"]]
    ],
    "a2-online-account": [
      ["abmelden", "sich abmelden, hat sich abgemeldet", "to log out", "sich sicher abmelden", "Melden Sie sich auf einem öffentlichen Computer immer ab.", "Always log out on a public computer.", ["ausloggen"]],
      ["sicherheitsfrage", "die Sicherheitsfrage, die Sicherheitsfragen", "security question", "eine Sicherheitsfrage beantworten", "Ich kenne die Antwort auf meine Sicherheitsfrage nicht mehr.", "I no longer remember the answer to my security question.", ["die Kontrollfrage, die Kontrollfragen"]],
      ["anmeldung", "die Anmeldung, die Anmeldungen", "login / registration", "die Anmeldung bestätigen", "Nach der Anmeldung erhalten Sie eine Bestätigung per E-Mail.", "After logging in, you will receive confirmation by email.", ["der Login, die Logins"]],
      ["sicherungskopie", "die Sicherungskopie, die Sicherungskopien", "backup copy", "eine Sicherungskopie erstellen", "Vor dem Löschen erstelle ich eine Sicherungskopie der Datei.", "Before deleting it, I create a backup copy of the file.", ["das Backup, die Backups"]],
      ["adresse-bestaetigen", "die E-Mail-Adresse bestätigen, hat bestätigt", "to verify the email address", "auf den Bestätigungslink klicken", "Bitte bestätigen Sie Ihre E-Mail-Adresse innerhalb von 24 Stunden.", "Please verify your email address within 24 hours.", ["die Mailadresse verifizieren"]]
    ],
    "a2-airport-transfer": [
      ["gepaeckausgabe", "die Gepäckausgabe, die Gepäckausgaben", "baggage claim", "an der Gepäckausgabe warten", "Auf welchem Band kommt unser Gepäck an?", "Which carousel will our luggage arrive on?", ["das Gepäckband, die Gepäckbänder", "die Gepaeckausgabe"]],
      ["verspaeteter-abflug", "der verspätete Abflug, die verspäteten Abflüge", "delayed departure", "mit Verspätung abfliegen", "Wegen des verspäteten Abflugs wird der Anschluss knapp.", "The connection will be tight because of the delayed departure.", ["der Abflug mit Verspätung"]],
      ["zoll", "der Zoll, kein Plural", "customs", "durch den Zoll gehen", "Nach der Gepäckausgabe gehen wir durch den Zoll.", "After baggage claim, we go through customs.", ["die Zollkontrolle, die Zollkontrollen"]],
      ["handgepaeck", "das Handgepäck, kein Plural", "carry-on luggage", "ein Stück Handgepäck", "Diese kleine Tasche nehme ich als Handgepäck mit.", "I am taking this small bag as carry-on luggage.", ["das Kabinengepäck", "das Handgepaeck"]],
      ["boarding", "das Boarding, die Boardings", "boarding", "Das Boarding beginnt um ...", "Das Boarding für Flug 418 beginnt um 17.20 Uhr.", "Boarding for flight 418 begins at 5:20 p.m.", ["das Einsteigen, kein Plural"]]
    ],
    "a2-online-order": [
      ["rechnung-online", "die Rechnung, die Rechnungen", "invoice", "eine Rechnung herunterladen", "Die Rechnung finden Sie in Ihrem Kundenkonto.", "You can find the invoice in your customer account.", ["der Kaufbeleg, die Kaufbelege"]],
      ["beschaedigtes-paket", "das beschädigte Paket, die beschädigten Pakete", "damaged parcel", "ein beschädigtes Paket fotografieren", "Das Paket war bei der Lieferung bereits beschädigt.", "The parcel was already damaged when it was delivered.", ["eine beschädigte Sendung", "das beschaedigte Paket"]],
      ["rueckgabefrist", "die Rückgabefrist, die Rückgabefristen", "return deadline", "die Rückgabefrist einhalten", "Die Rückgabefrist endet vierzehn Tage nach der Lieferung.", "The return deadline ends fourteen days after delivery.", ["die Frist für die Rückgabe", "die Rueckgabefrist"]],
      ["ersatz-oder-geld", "Ersatz oder Erstattung", "replacement or refund", "eine Ersatzlieferung oder Erstattung wählen", "Möchten Sie Ersatz oder eine Erstattung des Kaufpreises?", "Would you like a replacement or a refund of the purchase price?", ["neue Ware oder Geld zurück"]],
      ["falsche-groesse", "die falsche Größe, die falschen Größen", "wrong size", "in der falschen Größe geliefert", "Die Schuhe wurden in der falschen Größe geliefert.", "The shoes were delivered in the wrong size.", ["nicht die bestellte Größe", "die falsche Groesse"]]
    ],
    "a2-community-notices": [
      ["anmeldefrist", "die Anmeldefrist, die Anmeldefristen", "registration deadline", "die Anmeldefrist beachten", "Die Anmeldefrist für den Kurs endet am Freitag.", "The registration deadline for the class ends on Friday.", ["der letzte Anmeldetag, die letzten Anmeldetage"]],
      ["eintritt", "der Eintritt, meist Singular", "admission", "freier Eintritt · Eintritt bezahlen", "Der Eintritt zum Nachbarschaftsfest ist frei.", "Admission to the neighborhood festival is free.", ["die Eintrittsgebühr, die Eintrittsgebühren"]],
      ["helfer-gesucht", "Helferinnen und Helfer gesucht", "volunteers wanted", "freiwillige Helfer suchen", "Für den Flohmarkt werden noch Helferinnen und Helfer gesucht.", "Volunteers are still needed for the flea market.", ["Freiwillige gesucht"]],
      ["selbst-mitbringen", "etwas selbst mitbringen, hat mitgebracht", "to bring something oneself", "Geschirr selbst mitbringen", "Bitte bringen Sie für das Picknick eine Decke selbst mit.", "Please bring your own blanket for the picnic.", ["eigenes ... mitbringen"]],
      ["entfaellt", "entfällt", "is cancelled", "Der Termin entfällt.", "Die Bürgersprechstunde am Montag entfällt krankheitsbedingt.", "The public consultation on Monday is cancelled due to illness.", ["findet nicht statt", "entfaellt"]]
    ],
    "b1-erzaehlen": [
      ["inzwischen", "inzwischen", "in the meantime / by now", "Inzwischen + Verb", "Inzwischen war es dunkel geworden, und wir suchten weiter.", "In the meantime it had become dark, and we kept searching.", ["mittlerweile"]],
      ["sich-herausstellen", "sich herausstellen, hat sich herausgestellt", "to turn out", "Es stellte sich heraus, dass ...", "Später stellte sich heraus, dass der Schlüssel im Auto lag.", "Later it turned out that the key was in the car.", ["sich zeigen"]],
      ["spur", "die Spur, die Spuren", "trace / clue", "einer Spur folgen · keine Spur von", "Im Schnee entdeckten wir eine Spur, die zum Weg führte.", "We discovered a track in the snow that led to the path.", ["der Hinweis, die Hinweise"]],
      ["soweit-ich-mich-erinnere", "Soweit ich mich erinnere, ...", "As far as I remember, ...", "eine Erinnerung vorsichtig wiedergeben", "Soweit ich mich erinnere, begann der Regen erst nach acht Uhr.", "As far as I remember, the rain did not start until after eight.", ["Wenn ich mich richtig erinnere, ..."]],
      ["eine-weile", "eine Weile", "for a while", "eine ganze Weile warten", "Wir warteten eine Weile, bevor wir die Polizei anriefen.", "We waited for a while before calling the police.", ["einige Zeit"]]
    ],
    "b1-wohnen-nachbarschaft": [
      ["ruhezeit", "die Ruhezeit, die Ruhezeiten", "quiet period", "die vereinbarten Ruhezeiten einhalten", "In der Hausordnung stehen die Ruhezeiten für das Gebäude.", "The building rules state the quiet periods.", ["die Nachtruhe, kein Plural"]],
      ["betriebskostenabrechnung", "die Betriebskostenabrechnung, die Betriebskostenabrechnungen", "service-charge statement", "eine Abrechnung prüfen", "Ich kann eine Position in der Betriebskostenabrechnung nicht nachvollziehen.", "I cannot understand one item on the service-charge statement.", ["die Nebenkostenabrechnung, die Nebenkostenabrechnungen"]],
      ["undichte-stelle", "die undichte Stelle, die undichten Stellen", "leak", "eine undichte Stelle am Fenster", "Durch eine undichte Stelle am Fenster kommt Wasser herein.", "Water is coming in through a leak in the window.", ["das Leck, die Lecks"]],
      ["nachbarschaftskonflikt", "der Nachbarschaftskonflikt, die Nachbarschaftskonflikte", "neighborhood dispute", "einen Nachbarschaftskonflikt ruhig klären", "Ein direktes Gespräch konnte den Nachbarschaftskonflikt lösen.", "A direct conversation was able to resolve the neighborhood dispute.", ["der Streit unter Nachbarn"]],
      ["loesung-vereinbaren", "eine Lösung vereinbaren, hat vereinbart", "to agree on a solution", "gemeinsam eine praktische Lösung vereinbaren", "Wir haben vereinbart, dass die Fahrräder nicht mehr im Flur stehen.", "We agreed that the bicycles will no longer be kept in the hallway.", ["sich auf eine Lösung einigen", "eine Loesung vereinbaren"]]
    ],
    "b1-beruf-bildung": [
      ["stellenausschreibung", "die Stellenausschreibung, die Stellenausschreibungen", "job posting", "eine Stellenausschreibung genau lesen", "Die Aufgaben in der Stellenausschreibung passen gut zu meiner Erfahrung.", "The duties in the job posting match my experience well.", ["das Stellenangebot, die Stellenangebote"]],
      ["gehaltsvorstellung", "die Gehaltsvorstellung, die Gehaltsvorstellungen", "salary expectation", "eine Gehaltsvorstellung nennen", "Im Gespräch wurde ich nach meiner Gehaltsvorstellung gefragt.", "In the interview, I was asked about my salary expectation.", ["das Wunschgehalt, die Wunschgehälter"]],
      ["aufgabenbereich", "der Aufgabenbereich, die Aufgabenbereiche", "area of responsibility", "ein vielseitiger Aufgabenbereich", "Zu meinem Aufgabenbereich gehört die Betreuung neuer Kunden.", "Supporting new customers is part of my area of responsibility.", ["das Tätigkeitsfeld, die Tätigkeitsfelder"]],
      ["fliessend", "fließend", "fluent / fluently", "fließend Deutsch sprechen", "Für die Stelle sollte man fließend Deutsch und Englisch sprechen.", "For the position, one should speak German and English fluently.", ["sehr gut", "fliessend"]],
      ["beruflich-umsteigen", "beruflich umsteigen, ist umgestiegen", "to change careers", "in einen neuen Beruf umsteigen", "Nach zehn Jahren im Verkauf möchte sie beruflich umsteigen.", "After ten years in sales, she wants to change careers.", ["den Beruf wechseln", "sich beruflich neu orientieren"]]
    ],
    "b1-medien-information": [
      ["originalquelle", "die Originalquelle, die Originalquellen", "original source", "die Originalquelle öffnen und prüfen", "Der Beitrag verlinkt nicht auf die Originalquelle der Zahlen.", "The post does not link to the original source of the figures.", ["die Primärquelle, die Primärquellen"]],
      ["veroeffentlichungsdatum", "das Veröffentlichungsdatum, die Veröffentlichungsdaten", "publication date", "das Veröffentlichungsdatum prüfen", "Die Meldung ist alt, obwohl sie gerade wieder geteilt wird.", "The report is old even though it is being shared again now.", ["das Datum der Veröffentlichung", "das Veroeffentlichungsdatum"]],
      ["meinungsbeitrag", "der Meinungsbeitrag, die Meinungsbeiträge", "opinion piece", "Faktenbericht und Meinungsbeitrag unterscheiden", "Der Text ist als Meinungsbeitrag gekennzeichnet.", "The text is labeled as an opinion piece.", ["der Kommentar, die Kommentare"]],
      ["irrefuehrend", "irreführend", "misleading", "eine irreführende Überschrift", "Die Überschrift ist irreführend, weil sie einen wichtigen Teil weglässt.", "The headline is misleading because it leaves out an important part.", ["täuschend", "irrefuehrend"]],
      ["korrektur", "die Korrektur, die Korrekturen", "correction", "eine Korrektur veröffentlichen", "Die Redaktion hat am nächsten Tag eine Korrektur ergänzt.", "The editorial team added a correction the next day.", ["die Berichtigung, die Berichtigungen"]]
    ],
    "b1-umwelt-mobilitaet": [
      ["solaranlage", "die Solaranlage, die Solaranlagen", "solar installation", "eine Solaranlage auf dem Dach installieren", "Die Schule erzeugt mit ihrer Solaranlage einen Teil des Stroms selbst.", "The school generates part of its own electricity with its solar installation.", ["die Photovoltaikanlage, die Photovoltaikanlagen"]],
      ["waermepumpe", "die Wärmepumpe, die Wärmepumpen", "heat pump", "mit einer Wärmepumpe heizen", "Das Gebäude wird künftig mit einer Wärmepumpe beheizt.", "The building will be heated with a heat pump in the future.", ["die Waermepumpe"]],
      ["ladestation", "die Ladestation, die Ladestationen", "charging station", "eine öffentliche Ladestation", "Am Bahnhof sollen sechs neue Ladestationen gebaut werden.", "Six new charging stations are to be built at the station.", ["die Ladesäule, die Ladesäulen"]],
      ["abfall-vermeiden", "Abfall vermeiden, hat vermieden", "to avoid waste", "Verpackungsabfall vermeiden", "Mehrwegbehälter helfen dabei, Abfall zu vermeiden.", "Reusable containers help avoid waste.", ["Müll reduzieren"]],
      ["reparieren-statt-wegwerfen", "reparieren statt wegwerfen", "repair instead of throwing away", "Geräte länger nutzen", "Defekte Geräte sollten möglichst repariert statt weggeworfen werden.", "Defective devices should be repaired instead of thrown away whenever possible.", ["instand setzen und weiterverwenden"]]
    ],
    "b1-gesund-leben": [
      ["regeneration", "die Regeneration, kein Plural", "recovery / regeneration", "Zeit für Regeneration einplanen", "Nach intensiven Arbeitsphasen braucht der Körper Regeneration.", "The body needs recovery after intense periods of work.", ["die Erholung, kein Plural"]],
      ["stresssymptom", "das Stresssymptom, die Stresssymptome", "stress symptom", "körperliche Stresssymptome erkennen", "Kopfschmerzen können ein Stresssymptom sein.", "Headaches can be a symptom of stress.", ["das Anzeichen von Stress, die Anzeichen von Stress"]],
      ["tagesablauf", "der Tagesablauf, die Tagesabläufe", "daily routine", "einen regelmäßigen Tagesablauf haben", "Ein fester Tagesablauf kann den Schlaf verbessern.", "A regular daily routine can improve sleep.", ["die Tagesstruktur, die Tagesstrukturen"]],
      ["bewegung-einbauen", "Bewegung in den Alltag einbauen, hat eingebaut", "to incorporate exercise into daily life", "kurze Wege zu Fuß gehen", "Ich baue mehr Bewegung ein, indem ich zur Arbeit radele.", "I incorporate more exercise by cycling to work.", ["sich im Alltag mehr bewegen"]],
      ["professionelle-hilfe", "professionelle Hilfe suchen, hat gesucht", "to seek professional help", "bei anhaltenden Beschwerden Hilfe suchen", "Wenn die Erschöpfung anhält, sollte man professionelle Hilfe suchen.", "If the exhaustion continues, one should seek professional help.", ["sich fachlich beraten lassen"]]
    ],
    "b1-engagement": [
      ["einsatzplan", "der Einsatzplan, die Einsatzpläne", "volunteer rota", "einen Einsatzplan erstellen", "Im Einsatzplan steht, wer den Infostand betreut.", "The volunteer rota says who staffs the information booth.", ["der Dienstplan, die Dienstpläne", "der Einsatzplan, die Einsatzplaene"]],
      ["freiwillige-gewinnen", "Freiwillige gewinnen, hat gewonnen", "to recruit volunteers", "neue Freiwillige für ein Projekt gewinnen", "Mit einem offenen Treffen möchte der Verein neue Freiwillige gewinnen.", "The association hopes to recruit new volunteers with an open meeting.", ["Ehrenamtliche finden"]],
      ["spendenaktion", "die Spendenaktion, die Spendenaktionen", "fundraising campaign", "eine Spendenaktion organisieren", "Die Spendenaktion finanziert warme Mahlzeiten für Bedürftige.", "The fundraising campaign finances hot meals for people in need.", ["die Sammelaktion, die Sammelaktionen"]],
      ["gemeinsames-ziel", "das gemeinsame Ziel, die gemeinsamen Ziele", "shared goal", "auf ein gemeinsames Ziel hinarbeiten", "Unser gemeinsames Ziel ist ein barrierefreier Treffpunkt.", "Our shared goal is an accessible meeting place.", ["ein Ziel teilen"]],
      ["verbindlich-uebernehmen", "eine Aufgabe verbindlich übernehmen, hat übernommen", "to commit to a task", "Verantwortung für einen Termin übernehmen", "Jede Person übernimmt verbindlich eine Aufgabe für das Fest.", "Each person commits to one task for the festival.", ["sich fest zu etwas verpflichten"]]
    ],
    "b1-argumentieren": [
      ["belegbares-beispiel", "das belegbare Beispiel, die belegbaren Beispiele", "verifiable example", "ein Argument mit einem Beispiel belegen", "Ein belegbares Beispiel macht das Argument überzeugender.", "A verifiable example makes the argument more convincing.", ["ein konkreter Beleg"]],
      ["vertretbar", "vertretbar", "justifiable / reasonable", "eine vertretbare Lösung", "Die höheren Kosten sind nur vertretbar, wenn viele Menschen profitieren.", "The higher costs are justifiable only if many people benefit.", ["angemessen", "zu rechtfertigen"]],
      ["bedingte-zustimmung", "die bedingte Zustimmung, die bedingten Zustimmungen", "conditional agreement", "unter einer Bedingung zustimmen", "Ich könnte dem Vorschlag zustimmen, sofern die Testphase begrenzt wird.", "I could agree to the proposal provided the trial period is limited.", ["Zustimmung unter Vorbehalt"]],
      ["langfristige-folge", "die langfristige Folge, die langfristigen Folgen", "long-term consequence", "langfristige Folgen bedenken", "Wir sollten neben den Kosten auch die langfristigen Folgen berücksichtigen.", "Along with the costs, we should also consider the long-term consequences.", ["die spätere Auswirkung, die späteren Auswirkungen"]],
      ["dagegen-spricht", "Dagegen spricht, dass ...", "What argues against it is that ...", "Ein Gegenargument einleiten", "Dagegen spricht, dass die vorgeschlagene Fläche zu klein ist.", "What argues against it is that the proposed area is too small.", ["Ein Einwand ist, dass ..."]]
    ],
    "b1-job-applications": [
      ["luecke", "die Lücke, die Lücken", "gap", "eine Lücke im Lebenslauf erklären", "Die sechsmonatige Lücke im Lebenslauf entstand durch einen Umzug.", "The six-month gap in the résumé was caused by a move.", ["die Unterbrechung, die Unterbrechungen", "die Luecke"]],
      ["referenz", "die Referenz, die Referenzen", "reference", "eine berufliche Referenz angeben", "Meine frühere Teamleitung darf als Referenz kontaktiert werden.", "My former team lead may be contacted as a reference.", ["die Empfehlung, die Empfehlungen"]],
      ["gehaltsspanne", "die Gehaltsspanne, die Gehaltsspannen", "salary range", "nach der Gehaltsspanne fragen", "Könnten Sie mir die vorgesehene Gehaltsspanne nennen?", "Could you tell me the intended salary range?", ["der Gehaltsrahmen, die Gehaltsrahmen"]],
      ["mobiles-arbeiten", "das mobile Arbeiten, kein Plural", "remote / mobile working", "Möglichkeiten zum mobilen Arbeiten", "Die Stelle erlaubt zwei Tage mobiles Arbeiten pro Woche.", "The position allows two days of remote work per week.", ["das Arbeiten im Homeoffice"]],
      ["eintrittstermin", "der Eintrittstermin, die Eintrittstermine", "start date", "zum nächstmöglichen Eintrittstermin", "Mein frühester Eintrittstermin wäre der erste Oktober.", "My earliest possible start date would be October first.", ["der Arbeitsbeginn, die Arbeitsbeginne"]]
    ],
    "b1-housing-repairs": [
      ["leck", "das Leck, die Lecks", "leak", "ein Leck in der Wasserleitung", "Wegen eines Lecks tropft Wasser durch die Decke.", "Water is dripping through the ceiling because of a leak.", ["die undichte Stelle, die undichten Stellen"]],
      ["terminbestaetigung", "die Terminbestätigung, die Terminbestätigungen", "appointment confirmation", "eine schriftliche Terminbestätigung", "Die Terminbestätigung des Handwerkers kam per E-Mail.", "The repair technician's appointment confirmation came by email.", ["die Bestätigung des Termins"]],
      ["abstellmassnahme", "die Abstellmaßnahme, die Abstellmaßnahmen", "remedial action", "eine geeignete Abstellmaßnahme", "Die Verwaltung muss eine dauerhafte Abstellmaßnahme nennen.", "The property management must specify a lasting remedial action.", ["die Maßnahme zur Behebung", "die Abstellmassnahme"]],
      ["fotobeleg", "der Fotobeleg, die Fotobelege", "photo evidence", "einen datierten Fotobeleg beifügen", "Ich füge der Mängelmeldung mehrere Fotobelege bei.", "I am attaching several pieces of photo evidence to the defect report.", ["die Fotodokumentation, die Fotodokumentationen"]],
      ["mieterverein", "der Mieterverein, die Mietervereine", "tenants' association", "sich beim Mieterverein beraten lassen", "Wegen der langen Verzögerung lasse ich mich beim Mieterverein beraten.", "Because of the long delay, I am seeking advice from the tenants' association.", ["die Mieterberatung, die Mieterberatungen"]]
    ],
    "b1-media-comparison": [
      ["auswahlverzerrung", "die Auswahlverzerrung, die Auswahlverzerrungen", "selection bias", "eine mögliche Auswahlverzerrung erkennen", "Die Umfrage könnte durch die kleine Online-Stichprobe verzerrt sein.", "The survey may be biased by the small online sample.", ["eine verzerrte Auswahl"]],
      ["faktencheck", "der Faktencheck, die Faktenchecks", "fact-check", "einen unabhängigen Faktencheck lesen", "Ein Faktencheck bestätigt die zentrale Zahl, aber nicht die Überschrift.", "A fact-check confirms the central figure but not the headline.", ["die Faktenprüfung, die Faktenprüfungen"]],
      ["gleicher-zeitraum", "denselben Zeitraum vergleichen", "to compare the same period", "Daten aus demselben Zeitraum", "Beide Berichte vergleichen unterschiedliche Zeiträume und kommen deshalb zu anderen Ergebnissen.", "The two reports compare different periods and therefore reach different results.", ["zeitlich vergleichbare Daten verwenden"]],
      ["anonyme-quelle", "die anonyme Quelle, die anonymen Quellen", "anonymous source", "sich auf eine anonyme Quelle berufen", "Der Artikel stützt eine wichtige Behauptung nur auf eine anonyme Quelle.", "The article supports an important claim only with an anonymous source.", ["eine nicht genannte Quelle"]],
      ["kontext-fehlt", "der Kontext fehlt", "the context is missing", "eine Zahl ohne Kontext nennen", "Ohne die Bevölkerungszahl fehlt der Statistik ein wichtiger Kontext.", "Without the population figure, the statistic lacks important context.", ["wichtige Hintergrundinformationen fehlen"]]
    ],
    "b1-healthcare-decisions": [
      ["behandlungsplan", "der Behandlungsplan, die Behandlungspläne", "treatment plan", "einen Behandlungsplan besprechen", "Der Behandlungsplan wird nach sechs Wochen überprüft.", "The treatment plan will be reviewed after six weeks.", ["der Therapieplan, die Therapiepläne", "der Behandlungsplan, die Behandlungsplaene"]],
      ["zweitmeinung", "die Zweitmeinung, die Zweitmeinungen", "second opinion", "eine ärztliche Zweitmeinung einholen", "Vor der Operation möchte ich eine Zweitmeinung einholen.", "I would like to get a second opinion before the operation.", ["eine zweite ärztliche Meinung"]],
      ["terminvermittlung", "die Terminvermittlung, die Terminvermittlungen", "appointment referral / arrangement", "einen Facharzttermin vermittelt bekommen", "Die Praxis hilft mir bei der Terminvermittlung zum Facharzt.", "The practice is helping me arrange an appointment with a specialist.", ["die Vermittlung eines Facharzttermins"]],
      ["gut-vertragen", "etwas gut vertragen, hat vertragen", "to tolerate something well", "ein Medikament nicht gut vertragen", "Das erste Medikament habe ich nicht gut vertragen.", "I did not tolerate the first medication well.", ["keine Probleme mit etwas haben"]],
      ["warnzeichen", "das Warnzeichen, die Warnzeichen", "warning sign", "akute Warnzeichen erkennen", "Bei Atemnot oder starken Schmerzen sollten Sie sofort Hilfe holen.", "You should get help immediately in case of shortness of breath or severe pain.", ["das Alarmsignal, die Alarmsignale"]]
    ],
    "b1-employment-contract": [
      ["wochenarbeitszeit", "die Wochenarbeitszeit, die Wochenarbeitszeiten", "weekly working hours", "eine Wochenarbeitszeit von 38 Stunden", "Die vereinbarte Wochenarbeitszeit beträgt 38 Stunden.", "The agreed weekly working time is 38 hours.", ["die wöchentliche Arbeitszeit"]],
      ["tarifvertrag", "der Tarifvertrag, die Tarifverträge", "collective agreement", "nach Tarifvertrag bezahlt werden", "Für die Stelle gilt der Tarifvertrag der Branche.", "The sector's collective agreement applies to the position.", ["die tarifliche Regelung, die tariflichen Regelungen"]],
      ["sonderzahlung", "die Sonderzahlung, die Sonderzahlungen", "special payment / bonus", "eine jährliche Sonderzahlung", "Der Vertrag nennt eine freiwillige Sonderzahlung im Dezember.", "The contract mentions a voluntary special payment in December.", ["der Bonus, die Boni"]],
      ["lohnfortzahlung", "die Lohnfortzahlung, kein Plural", "continued pay", "Lohnfortzahlung im Krankheitsfall", "Bei Krankheit gelten die gesetzlichen Regeln zur Lohnfortzahlung.", "In case of illness, the legal rules on continued pay apply.", ["die Entgeltfortzahlung, kein Plural"]],
      ["ordentlich-kuendigen", "ordentlich kündigen, hat gekündigt", "to give ordinary notice", "unter Einhaltung der Frist kündigen", "Nach der Probezeit kann das Arbeitsverhältnis mit der genannten Frist gekündigt werden.", "After probation, the employment can be terminated with the stated notice period.", ["fristgerecht kündigen", "ordentlich kuendigen"]]
    ],
    "b1-workplace-incident": [
      ["ersthelfer", "der Ersthelfer, die Ersthelfer / die Ersthelferin, die Ersthelferinnen", "first aider", "einen Ersthelfer rufen", "Eine Ersthelferin versorgte die Wunde bis zum Eintreffen des Rettungsdienstes.", "A first aider treated the wound until emergency services arrived.", ["die betriebliche Ersthilfe"]],
      ["schutzbrille", "die Schutzbrille, die Schutzbrillen", "safety goggles", "eine Schutzbrille tragen", "Beim Bohren muss eine Schutzbrille getragen werden.", "Safety goggles must be worn while drilling.", ["der Augenschutz, kein Plural"]],
      ["gefaehrdungsbeurteilung", "die Gefährdungsbeurteilung, die Gefährdungsbeurteilungen", "risk assessment", "eine Gefährdungsbeurteilung aktualisieren", "Nach dem Vorfall wurde die Gefährdungsbeurteilung überprüft.", "The risk assessment was reviewed after the incident.", ["die Risikobewertung, die Risikobewertungen", "die Gefaehrdungsbeurteilung"]],
      ["meldefrist", "die Meldefrist, die Meldefristen", "reporting deadline", "eine Meldefrist einhalten", "Der Vorfall muss innerhalb der betrieblichen Meldefrist dokumentiert werden.", "The incident must be documented within the company's reporting deadline.", ["die Frist für die Meldung"]],
      ["wiederholung-verhindern", "eine Wiederholung verhindern, hat verhindert", "to prevent a recurrence", "geeignete Schutzmaßnahmen festlegen", "Das Team bespricht, wie sich eine Wiederholung verhindern lässt.", "The team discusses how a recurrence can be prevented.", ["einen ähnlichen Vorfall vermeiden"]]
    ],
    "b1-structured-meeting": [
      ["protokollfuehrer", "der Protokollführer, die Protokollführer / die Protokollführerin, die Protokollführerinnen", "minute taker", "eine Protokollführung bestimmen", "Frau Lang übernimmt heute die Rolle der Protokollführerin.", "Ms. Lang is taking the role of minute taker today.", ["die protokollierende Person", "der Protokollfuehrer"]],
      ["abstimmung", "die Abstimmung, die Abstimmungen", "vote", "eine offene Abstimmung durchführen", "Bei der Abstimmung stimmten sieben Personen für den Antrag.", "Seven people voted for the motion in the vote.", ["die Wahl, die Wahlen"]],
      ["beschlussfaehig", "beschlussfähig", "quorate / able to pass resolutions", "beschlussfähig sein", "Die Versammlung ist beschlussfähig, weil genug Mitglieder anwesend sind.", "The assembly can pass resolutions because enough members are present.", ["entscheidungsfähig", "beschlussfaehig"]],
      ["tagesordnung-ergaenzen", "die Tagesordnung ergänzen, hat ergänzt", "to add to the agenda", "einen weiteren Punkt aufnehmen", "Ich beantrage, die Tagesordnung um einen kurzen Punkt zu ergänzen.", "I move to add one brief item to the agenda.", ["einen Tagesordnungspunkt hinzufügen"]],
      ["zusammenfassen", "etwas zusammenfassen, hat zusammengefasst", "to summarize something", "den Diskussionsstand kurz zusammenfassen", "Bevor wir entscheiden, fasse ich die beiden Vorschläge zusammen.", "Before we decide, I will summarize the two proposals.", ["kurz wiedergeben"]]
    ],
    "b1-constructive-feedback": [
      ["konkret", "konkret", "specific / concretely", "eine konkrete Beobachtung nennen", "Gutes Feedback beschreibt konkret, was beobachtet wurde.", "Good feedback describes specifically what was observed.", ["genau"]],
      ["verbesserungsvorschlag", "der Verbesserungsvorschlag, die Verbesserungsvorschläge", "suggestion for improvement", "einen umsetzbaren Verbesserungsvorschlag machen", "Mein Verbesserungsvorschlag wäre eine kurze Kontrolle vor dem Versand.", "My suggestion for improvement would be a brief check before sending.", ["der Lösungsvorschlag, die Lösungsvorschläge", "der Verbesserungsvorschlag, die Verbesserungsvorschlaege"]],
      ["ich-botschaft", "die Ich-Botschaft, die Ich-Botschaften", "I-statement", "eine Kritik als Ich-Botschaft formulieren", "Mit einer Ich-Botschaft beschreibe ich meine Wirkung, ohne Motive zu unterstellen.", "With an I-statement, I describe the effect on me without assuming motives.", ["aus der eigenen Perspektive sprechen"]],
      ["feedbackgespraech", "das Feedbackgespräch, die Feedbackgespräche", "feedback conversation", "ein vertrauliches Feedbackgespräch führen", "Wir führen das Feedbackgespräch unter vier Augen.", "We are having the feedback conversation in private.", ["das Rückmeldegespräch, die Rückmeldegespräche", "das Feedbackgespraech"]],
      ["umsetzen", "etwas umsetzen, hat umgesetzt", "to implement something", "eine Rückmeldung im Alltag umsetzen", "Beim nächsten Projekt setze ich die vereinbarten Änderungen um.", "I will implement the agreed changes in the next project.", ["in die Praxis bringen"]]
    ],
    "b1-qualification-recognition": [
      ["gleichwertigkeit", "die Gleichwertigkeit, kein Plural", "equivalence", "die Gleichwertigkeit eines Abschlusses prüfen", "Die Behörde prüft, ob die Ausbildung gleichwertig ist.", "The authority checks whether the training is equivalent.", ["die Vergleichbarkeit, kein Plural"]],
      ["verfahrensgebuehr", "die Verfahrensgebühr, die Verfahrensgebühren", "processing fee", "eine Verfahrensgebühr zahlen", "Vor dem Antrag möchte ich die Höhe der Verfahrensgebühr wissen.", "Before applying, I would like to know the amount of the processing fee.", ["die Bearbeitungsgebühr, die Bearbeitungsgebühren", "die Verfahrensgebuehr"]],
      ["vereidigte-uebersetzung", "die vereidigte Übersetzung, die vereidigten Übersetzungen", "certified translation", "eine vereidigte Übersetzung einreichen", "Für das Zeugnis wird eine vereidigte Übersetzung verlangt.", "A certified translation is required for the certificate.", ["die beglaubigte Übersetzung", "die vereidigte Uebersetzung"]],
      ["berufspraxis", "die Berufspraxis, kein Plural", "professional experience", "mehrjährige Berufspraxis nachweisen", "Meine Berufspraxis kann im Verfahren zusätzlich berücksichtigt werden.", "My professional experience can also be taken into account in the process.", ["die praktische Berufserfahrung"]],
      ["teilanerkennung", "die Teilanerkennung, die Teilanerkennungen", "partial recognition", "eine Teilanerkennung erhalten", "Bei einer Teilanerkennung müssen bestimmte Inhalte nachgeholt werden.", "With partial recognition, certain content must be completed later.", ["die teilweise Anerkennung"]]
    ],
    "b1-consumer-rights": [
      ["reklamationsschreiben", "das Reklamationsschreiben, die Reklamationsschreiben", "complaint letter", "ein sachliches Reklamationsschreiben verfassen", "Im Reklamationsschreiben setze ich eine Frist von vierzehn Tagen.", "In the complaint letter, I set a deadline of fourteen days.", ["die schriftliche Reklamation, die schriftlichen Reklamationen"]],
      ["lieferfrist", "die Lieferfrist, die Lieferfristen", "delivery deadline", "eine zugesagte Lieferfrist überschreiten", "Die vereinbarte Lieferfrist wurde deutlich überschritten.", "The agreed delivery deadline was substantially exceeded.", ["der Liefertermin, die Liefertermine"]],
      ["reparaturversuch", "der Reparaturversuch, die Reparaturversuche", "repair attempt", "einen Reparaturversuch dokumentieren", "Auch der zweite Reparaturversuch hat den Fehler nicht behoben.", "The second repair attempt also failed to fix the defect.", ["der Nachbesserungsversuch, die Nachbesserungsversuche"]],
      ["frist-setzen", "eine angemessene Frist setzen, hat gesetzt", "to set a reasonable deadline", "schriftlich eine Frist setzen", "Ich setze dem Händler eine angemessene Frist zur Nachbesserung.", "I am giving the retailer a reasonable deadline for repair.", ["eine Erledigung bis zu einem Datum verlangen"]],
      ["kaufpreis-mindern", "den Kaufpreis mindern, hat gemindert", "to reduce the purchase price", "wegen eines Mangels den Preis mindern", "Wenn der Mangel bleibt, kommt möglicherweise eine Minderung des Kaufpreises infrage.", "If the defect remains, a reduction in the purchase price may be possible.", ["eine Preisminderung verlangen"]]
    ],
    "b1-banking-fraud": [
      ["konto-sperren", "das Konto sperren lassen, hat sperren lassen", "to have an account frozen", "den Onlinezugang sofort sperren lassen", "Nach dem Phishing-Anruf ließ sie ihren Onlinezugang sofort sperren.", "After the phishing call, she had her online access frozen immediately.", ["das Konto blockieren lassen"]],
      ["anzeige-erstatten", "Anzeige erstatten, hat erstattet", "to file a police report", "bei der Polizei Anzeige erstatten", "Die Bank empfahl mir, wegen des Identitätsdiebstahls Anzeige zu erstatten.", "The bank advised me to file a police report because of the identity theft.", ["den Betrug bei der Polizei melden"]],
      ["passwort-aendern", "das Passwort ändern, hat geändert", "to change the password", "alle betroffenen Passwörter ändern", "Ändern Sie sofort das Passwort Ihres E-Mail-Kontos.", "Change the password of your email account immediately.", ["ein neues Kennwort vergeben", "das Passwort aendern"]],
      ["screenshot", "der Screenshot, die Screenshots", "screenshot", "einen Screenshot sichern", "Ich habe einen Screenshot der verdächtigen Nachricht gespeichert.", "I saved a screenshot of the suspicious message.", ["das Bildschirmfoto, die Bildschirmfotos"]],
      ["transaktionsnummer", "die Transaktionsnummer, die Transaktionsnummern", "transaction number", "eine Transaktionsnummer angeben", "Bitte nennen Sie bei der Rückfrage die Transaktionsnummer der Buchung.", "Please give the transaction number of the booking when making the inquiry.", ["die Buchungsnummer, die Buchungsnummern"]]
    ],
    "b1-insurance-claim": [
      ["schadennummer", "die Schadennummer, die Schadennummern", "claim number", "eine Schadennummer erhalten", "Bitte geben Sie bei jedem Schreiben die Schadennummer an.", "Please include the claim number in every letter.", ["das Aktenzeichen des Schadensfalls"]],
      ["beleg", "der Beleg, die Belege", "receipt / supporting document", "einen Kaufbeleg aufbewahren", "Für das beschädigte Gerät liegt noch ein Kaufbeleg vor.", "A purchase receipt is still available for the damaged device.", ["die Quittung, die Quittungen"]],
      ["gutachter", "der Gutachter, die Gutachter / die Gutachterin, die Gutachterinnen", "assessor / expert", "einen Gutachter beauftragen", "Die Versicherung schickt eine Gutachterin zur Besichtigung.", "The insurance company is sending an assessor for an inspection.", ["die sachverständige Person"]],
      ["zeugenkontakt", "die Kontaktdaten, nur Plural", "contact details", "Kontaktdaten eines Zeugen angeben", "Ich habe der Schadensmeldung die Kontaktdaten eines Zeugen beigefügt.", "I attached a witness's contact details to the claim report.", ["die Kontaktangaben, nur Plural"]],
      ["nachreichen", "etwas nachreichen, hat nachgereicht", "to submit something later", "fehlende Unterlagen nachreichen", "Die Reparaturrechnung kann innerhalb von vier Wochen nachgereicht werden.", "The repair invoice can be submitted within four weeks.", ["später einreichen"]]
    ],
    "b1-tax-return": [
      ["lohnsteuerbescheinigung", "die Lohnsteuerbescheinigung, die Lohnsteuerbescheinigungen", "annual wage-tax statement", "die elektronische Lohnsteuerbescheinigung", "Die Lohnsteuerbescheinigung enthält das Jahreseinkommen und die gezahlte Steuer.", "The annual wage-tax statement contains yearly income and tax paid.", ["der Jahreslohnnachweis, die Jahreslohnnachweise"]],
      ["fristverlaengerung", "die Fristverlängerung, die Fristverlängerungen", "deadline extension", "eine Fristverlängerung beantragen", "Wegen fehlender Unterlagen beantrage ich eine Fristverlängerung.", "I am applying for a deadline extension because documents are missing.", ["mehr Zeit beantragen", "die Fristverlaengerung"]],
      ["einspruch", "der Einspruch, die Einsprüche", "formal objection", "Einspruch gegen einen Bescheid einlegen", "Gegen den Steuerbescheid kann innerhalb der genannten Frist Einspruch eingelegt werden.", "A formal objection may be filed against the tax assessment within the stated period.", ["der Widerspruch, die Widersprüche", "der Einspruch, die Einsprueche"]],
      ["belegpflicht", "die Belegpflicht, die Belegpflichten", "document-retention requirement", "Belege aufbewahren", "Auch ohne direkte Belegpflicht sollten wichtige Rechnungen aufbewahrt werden.", "Even without a direct requirement to submit receipts, important invoices should be retained.", ["die Pflicht zum Nachweis"]],
      ["steuerprogramm", "das Steuerprogramm, die Steuerprogramme", "tax software", "Daten mit einem Steuerprogramm übermitteln", "Das Steuerprogramm prüft die Eingaben auf häufige Fehler.", "The tax software checks the entries for common errors.", ["die Steuersoftware, die Steuersoftwareprogramme"]]
    ],
    "b1-energy-provider": [
      ["wechselbonus", "der Wechselbonus, die Wechselboni", "switching bonus", "einen Wechselbonus erhalten", "Der Wechselbonus wird erst nach zwölf Monaten ausgezahlt.", "The switching bonus is not paid until after twelve months.", ["der Neukundenbonus, die Neukundenboni"]],
      ["verbrauchsprognose", "die Verbrauchsprognose, die Verbrauchsprognosen", "consumption forecast", "eine Verbrauchsprognose anpassen", "Der neue Abschlag basiert auf einer zu hohen Verbrauchsprognose.", "The new advance payment is based on a consumption forecast that is too high.", ["der geschätzte Jahresverbrauch"]],
      ["zaehlernummer", "die Zählernummer, die Zählernummern", "meter number", "Zählernummer und Zählerstand melden", "Die Zählernummer finden Sie direkt auf dem Stromzähler.", "You can find the meter number directly on the electricity meter.", ["die Nummer des Zählers", "die Zaehlernummer"]],
      ["kuendigungsdatum", "das Kündigungsdatum, die Kündigungsdaten", "cancellation date", "das Kündigungsdatum bestätigen", "Bitte bestätigen Sie mir das genaue Kündigungsdatum schriftlich.", "Please confirm the exact cancellation date to me in writing.", ["das Vertragsende, die Vertragsenden", "das Kuendigungsdatum"]],
      ["vergleichsportal", "das Vergleichsportal, die Vergleichsportale", "comparison portal", "Tarife in einem Vergleichsportal prüfen", "Im Vergleichsportal sollten auch Grundpreis und Laufzeit verglichen werden.", "The base price and contract term should also be compared on the comparison portal.", ["der Tarifrechner, die Tarifrechner"]]
    ],
    "b1-school-progress": [
      ["zeugnis", "das Zeugnis, die Zeugnisse", "school report", "ein Zeugnis besprechen", "Im Zeugnis werden Leistungen und Arbeitsverhalten bewertet.", "Performance and work habits are assessed in the school report.", ["der Schulbericht, die Schulberichte"]],
      ["nachhilfe", "die Nachhilfe, kein Plural", "tutoring", "Nachhilfe in Mathematik bekommen", "Vor der nächsten Arbeit erhält das Kind zweimal pro Woche Nachhilfe.", "Before the next test, the child receives tutoring twice a week.", ["der Förderunterricht, kein Plural"]],
      ["mitarbeit", "die Mitarbeit, kein Plural", "class participation", "aktive Mitarbeit im Unterricht", "Die mündliche Mitarbeit hat sich deutlich verbessert.", "Oral class participation has improved significantly.", ["die Beteiligung am Unterricht"]],
      ["lernziel", "das Lernziel, die Lernziele", "learning goal", "ein messbares Lernziel vereinbaren", "Als Lernziel vereinbaren wir, jede Woche einen Text zu schreiben.", "As a learning goal, we agree to write one text each week.", ["das Bildungsziel, die Bildungsziele"]],
      ["elternsprechtag", "der Elternsprechtag, die Elternsprechtage", "parent-teacher conference day", "einen Termin am Elternsprechtag buchen", "Am Elternsprechtag besprechen wir die Entwicklung in allen Fächern.", "At the parent-teacher conference, we discuss progress in all subjects.", ["das Eltern-Lehrer-Gespräch, die Eltern-Lehrer-Gespräche"]]
    ],
    "b1-relative-care": [
      ["pflegedienst", "der Pflegedienst, die Pflegedienste", "home-care service", "einen ambulanten Pflegedienst beauftragen", "Der Pflegedienst kommt morgens zur Medikamentengabe.", "The home-care service comes in the morning to administer medication.", ["der ambulante Dienst, die ambulanten Dienste"]],
      ["verhinderungspflege", "die Verhinderungspflege, kein Plural", "respite care", "Verhinderungspflege beantragen", "Während ihres Urlaubs organisiert die Tochter Verhinderungspflege.", "The daughter arranges respite care during her vacation.", ["die Ersatzpflege, kein Plural"]],
      ["barrierearm", "barrierearm", "low-barrier / accessible", "eine barrierearme Wohnung", "Das Bad soll durch einen Umbau barriereärmer werden.", "The bathroom is to be made more accessible through renovation.", ["möglichst barrierefrei"]],
      ["hausnotruf", "der Hausnotruf, die Hausnotrufe", "home emergency-call system", "einen Hausnotruf einrichten", "Mit dem Hausnotruf kann sie im Notfall schnell Hilfe rufen.", "With the home emergency-call system, she can call for help quickly in an emergency.", ["der Notrufknopf, die Notrufknöpfe"]],
      ["termine-koordinieren", "Termine koordinieren, hat koordiniert", "to coordinate appointments", "Arzt- und Pflegetermine koordinieren", "Die Geschwister koordinieren Arzttermine in einem gemeinsamen Kalender.", "The siblings coordinate medical appointments in a shared calendar.", ["Termine aufeinander abstimmen"]]
    ],
    "b1-civic-concern": [
      ["anwohnerschaft", "die Anwohnerschaft, kein Plural", "local residents", "die betroffene Anwohnerschaft", "Die Anwohnerschaft wurde erst spät über das Vorhaben informiert.", "Local residents were not informed about the project until late.", ["die Anwohnenden, nur Plural"]],
      ["buergerbeteiligung", "die Bürgerbeteiligung, die Bürgerbeteiligungen", "public participation", "ein Verfahren zur Bürgerbeteiligung", "Die Stadt plant im Herbst eine Bürgerbeteiligung zum Verkehrskonzept.", "The city is planning a public-participation process on the transport concept in the autumn.", ["die Beteiligung der Öffentlichkeit", "die Buergerbeteiligung"]],
      ["rathaus", "das Rathaus, die Rathäuser", "town hall", "eine Sitzung im Rathaus", "Die öffentliche Anhörung findet im großen Saal des Rathauses statt.", "The public hearing takes place in the town hall's large chamber.", ["die Stadtverwaltung, die Stadtverwaltungen", "das Rathaus, die Rathaeuser"]],
      ["einwendung", "die Einwendung, die Einwendungen", "formal objection / representation", "eine schriftliche Einwendung einreichen", "Einwendungen gegen den Plan können bis Ende Mai eingereicht werden.", "Formal objections to the plan may be submitted until the end of May.", ["der schriftliche Einwand, die schriftlichen Einwände"]],
      ["kompromissvorschlag", "der Kompromissvorschlag, die Kompromissvorschläge", "compromise proposal", "einen realistischen Kompromissvorschlag vorlegen", "Der Kompromissvorschlag erhält die Grünfläche und schafft weniger Parkplätze.", "The compromise proposal preserves the green space and creates fewer parking spaces.", ["der Vermittlungsvorschlag, die Vermittlungsvorschläge"]]
    ],
    "b1-witness-account": [
      ["fluchtrichtung", "die Fluchtrichtung, die Fluchtrichtungen", "direction of escape", "die Fluchtrichtung angeben", "Die Person lief in Richtung des Bahnhofs davon.", "The person ran away toward the train station.", ["die Richtung, in die jemand floh"]],
      ["koerpergroesse", "die Körpergröße, die Körpergrößen", "height", "die Körpergröße schätzen", "Die Person war ungefähr 1,80 Meter groß.", "The person was approximately 1.80 meters tall.", ["die Größe einer Person", "die Koerpergroesse"]],
      ["bekleidung", "die Bekleidung, kein Plural", "clothing", "auffällige Bekleidung beschreiben", "Sie trug eine helle Jacke und eine dunkle Mütze.", "She was wearing a light-colored jacket and a dark hat.", ["die Kleidung, kein Plural"]],
      ["lichtverhaeltnisse", "die Lichtverhältnisse, nur Plural", "lighting conditions", "bei schlechten Lichtverhältnissen", "Wegen der schlechten Lichtverhältnisse konnte ich das Gesicht kaum erkennen.", "Because of the poor lighting conditions, I could barely see the face.", ["die schlechte Beleuchtung", "die Lichtverhaeltnisse"]],
      ["nicht-sicher-sein", "sich bei einem Detail nicht sicher sein", "to be unsure about a detail", "eine Unsicherheit deutlich machen", "Bei der Farbe des Autos bin ich mir nicht ganz sicher.", "I am not completely sure about the color of the car.", ["etwas nicht eindeutig erinnern"]]
    ],
    "b1-severe-weather": [
      ["warnstufe", "die Warnstufe, die Warnstufen", "warning level", "die höchste Warnstufe", "Für mehrere Landkreise gilt jetzt die höchste Warnstufe.", "The highest warning level now applies to several districts.", ["die Gefahrenstufe, die Gefahrenstufen"]],
      ["sandsack", "der Sandsack, die Sandsäcke", "sandbag", "Sandsäcke vor einen Eingang legen", "Freiwillige verteilen Sandsäcke an gefährdete Haushalte.", "Volunteers are distributing sandbags to households at risk.", ["der Sandsack, die Sandsaecke"]],
      ["geraete-laden", "Geräte vollständig laden, hat geladen", "to fully charge devices", "Handy und Powerbank laden", "Laden Sie vor dem Sturm alle wichtigen Geräte vollständig auf.", "Fully charge all important devices before the storm.", ["Akkus aufladen"]],
      ["nachbarn-pruefen", "nach gefährdeten Nachbarn sehen, hat gesehen", "to check on neighbors at risk", "ältere Nachbarn unterstützen", "Wir sehen nach, ob die ältere Nachbarin Hilfe braucht.", "We are checking whether the elderly neighbor needs help.", ["bei den Nachbarn nachfragen"]],
      ["keller-meiden", "den Keller meiden, hat gemieden", "to avoid the basement", "bei Hochwasser nicht in den Keller gehen", "Betreten Sie bei eindringendem Wasser nicht den Keller.", "Do not enter the basement when water is coming in.", ["sich vom Keller fernhalten"]]
    ],
    "b1-mental-health-support": [
      ["hausarzt-ansprechen", "den Hausarzt ansprechen, hat angesprochen", "to talk to one's family doctor", "Beschwerden beim Hausarzt ansprechen", "Als ersten Schritt sprach sie mit ihrem Hausarzt über die Erschöpfung.", "As a first step, she spoke with her family doctor about the exhaustion.", ["mit der Hausärztin sprechen"]],
      ["krisendienst", "der Krisendienst, die Krisendienste", "crisis service", "einen regionalen Krisendienst kontaktieren", "Der Krisendienst ist auch nachts telefonisch erreichbar.", "The crisis service can also be reached by phone at night.", ["die Krisenhilfe, kein Plural"]],
      ["selbstfuersorge", "die Selbstfürsorge, kein Plural", "self-care", "Selbstfürsorge ernst nehmen", "Regelmäßige Pausen sind ein Teil guter Selbstfürsorge.", "Regular breaks are part of good self-care.", ["für sich selbst sorgen", "die Selbstfuersorge"]],
      ["therapieform", "die Therapieform, die Therapieformen", "form of therapy", "eine passende Therapieform finden", "Im Erstgespräch werden verschiedene Therapieformen erklärt.", "Various forms of therapy are explained in the initial consultation.", ["die Behandlungsform, die Behandlungsformen"]],
      ["alltag-beeintraechtigen", "den Alltag beeinträchtigen, hat beeinträchtigt", "to affect daily life", "Arbeit und Alltag stark beeinträchtigen", "Die Schlafprobleme beeinträchtigen inzwischen meinen gesamten Alltag.", "The sleep problems now affect my entire daily life.", ["den Alltag erschweren", "den Alltag beeintraechtigen"]]
    ],
    "b1-food-labels": [
      ["gesaettigte-fettsaeuren", "die gesättigten Fettsäuren, nur Plural", "saturated fats", "wenig gesättigte Fettsäuren", "Die Tabelle zeigt den Anteil gesättigter Fettsäuren pro Portion.", "The table shows the amount of saturated fats per serving.", ["gesättigtes Fett", "gesaettigte Fettsaeuren"]],
      ["zugesetzter-zucker", "der zugesetzte Zucker, kein Plural", "added sugar", "ohne zugesetzten Zucker", "Das Produkt enthält keinen zugesetzten Zucker, aber viel Fruchtsaft.", "The product contains no added sugar but a lot of fruit juice.", ["zusätzlich hinzugefügter Zucker"]],
      ["verbrauchsdatum", "das Verbrauchsdatum, die Verbrauchsdaten", "use-by date", "das Verbrauchsdatum beachten", "Bei frischem Fleisch sollte das Verbrauchsdatum unbedingt beachtet werden.", "The use-by date should always be observed for fresh meat.", ["zu verbrauchen bis"]],
      ["kreuzkontakt", "der Kreuzkontakt, die Kreuzkontakte", "cross-contact", "Kreuzkontakt mit Allergenen vermeiden", "In einer kleinen Küche lässt sich Kreuzkontakt nicht immer ausschließen.", "Cross-contact cannot always be ruled out in a small kitchen.", ["die unbeabsichtigte Verunreinigung"]],
      ["pflanzliche-alternative", "die pflanzliche Alternative, die pflanzlichen Alternativen", "plant-based alternative", "eine pflanzliche Alternative zu Milch", "Haferdrink ist eine mögliche pflanzliche Alternative für das Rezept.", "Oat drink is a possible plant-based alternative for the recipe.", ["der pflanzliche Ersatz"]]
    ],
    "b1-cultural-review": [
      ["buehnenbild", "das Bühnenbild, die Bühnenbilder", "stage design", "ein reduziertes Bühnenbild", "Das einfache Bühnenbild lenkte die Aufmerksamkeit auf die Figuren.", "The simple stage design focused attention on the characters.", ["die Bühnengestaltung, die Bühnengestaltungen", "das Buehnenbild"]],
      ["schauspielerische-leistung", "die schauspielerische Leistung, die schauspielerischen Leistungen", "acting performance", "eine überzeugende schauspielerische Leistung", "Besonders die Hauptdarstellerin zeigte eine überzeugende Leistung.", "The lead actress in particular gave a convincing performance.", ["das Schauspiel, kein Plural"]],
      ["publikum", "das Publikum, kein Plural", "audience", "beim Publikum gut ankommen", "Das Publikum reagierte mit langem Applaus.", "The audience responded with prolonged applause.", ["die Zuschauerinnen und Zuschauer"]],
      ["eintrittspreis", "der Eintrittspreis, die Eintrittspreise", "admission price", "ein angemessener Eintrittspreis", "Für das umfangreiche Programm fand ich den Eintrittspreis angemessen.", "I found the admission price reasonable for the extensive program.", ["der Preis der Eintrittskarte"]],
      ["insgesamt-gelungen", "insgesamt gelungen", "successful overall", "trotz kleiner Schwächen insgesamt gelungen", "Trotz einiger Längen war die Aufführung insgesamt gelungen.", "Despite some slow passages, the performance was successful overall.", ["im Großen und Ganzen überzeugend"]]
    ],
    "b1-digital-privacy": [
      ["datenleck", "das Datenleck, die Datenlecks", "data breach", "von einem Datenleck betroffen sein", "Nach dem Datenleck sollten alle Nutzer ihre Passwörter ändern.", "After the data breach, all users should change their passwords.", ["die Datenpanne, die Datenpannen"]],
      ["passwortmanager", "der Passwortmanager, die Passwortmanager", "password manager", "einen Passwortmanager verwenden", "Ein Passwortmanager kann für jedes Konto ein anderes starkes Passwort speichern.", "A password manager can store a different strong password for each account.", ["die Passwortverwaltung, die Passwortverwaltungen"]],
      ["verschluesselung", "die Verschlüsselung, die Verschlüsselungen", "encryption", "eine Ende-zu-Ende-Verschlüsselung", "Der Messenger schützt Nachrichten mit Ende-zu-Ende-Verschlüsselung.", "The messenger protects messages with end-to-end encryption.", ["die verschlüsselte Übertragung", "die Verschluesselung"]],
      ["tracking", "das Tracking, kein Plural", "tracking", "Webtracking begrenzen", "In den Einstellungen kann man das Tracking durch Dritte einschränken.", "Tracking by third parties can be limited in the settings.", ["die Nachverfolgung, kein Plural"]],
      ["loeschanfrage", "die Löschanfrage, die Löschanfragen", "deletion request", "eine Löschanfrage stellen", "Ich habe den Dienst schriftlich um die Löschung meines Kontos gebeten.", "I asked the service in writing to delete my account.", ["der Antrag auf Löschung", "die Loeschanfrage"]]
    ],
    "b1-charts-percentages": [
      ["liniendiagramm", "das Liniendiagramm, die Liniendiagramme", "line chart", "eine Entwicklung im Liniendiagramm", "Das Liniendiagramm zeigt die monatliche Entwicklung seit Januar.", "The line chart shows the monthly trend since January.", ["die Liniengrafik, die Liniengrafiken"]],
      ["annaehernd", "annähernd", "approximately / nearly", "annähernd gleich hoch", "In beiden Gruppen ist der Anteil annähernd gleich hoch.", "The proportion is nearly the same in both groups.", ["ungefähr", "annaehernd"]],
      ["sich-verdoppeln", "sich verdoppeln, hat sich verdoppelt", "to double", "sich innerhalb eines Jahres verdoppeln", "Die Zahl der Anmeldungen hat sich von 200 auf 400 verdoppelt.", "The number of registrations doubled from 200 to 400.", ["doppelt so hoch werden"]],
      ["stabil-bleiben", "stabil bleiben, ist stabil geblieben", "to remain stable", "über mehrere Monate stabil bleiben", "Nach dem Anstieg blieb der Wert drei Monate lang stabil.", "After the increase, the value remained stable for three months.", ["sich kaum verändern"]],
      ["stichprobengroesse", "die Stichprobengröße, die Stichprobengrößen", "sample size", "eine geringe Stichprobengröße", "Wegen der kleinen Stichprobengröße sind die Ergebnisse nur begrenzt aussagekräftig.", "Because of the small sample size, the results have limited significance.", ["der Umfang der Stichprobe", "die Stichprobengroesse"]]
    ],
    "b1-payment-notice": [
      ["zahlungsnachweis", "der Zahlungsnachweis, die Zahlungsnachweise", "proof of payment", "einen Zahlungsnachweis beifügen", "Ich kann mit dem Kontoauszug nachweisen, dass die Rechnung bezahlt wurde.", "I can prove with the bank statement that the invoice was paid.", ["der Überweisungsbeleg, die Überweisungsbelege"]],
      ["teilwiderspruch", "der Teilwiderspruch, die Teilwidersprüche", "partial objection", "einen Teilwiderspruch einlegen", "Da nur die zusätzlichen Kosten strittig sind, kommt ein Teilwiderspruch infrage.", "Since only the additional costs are disputed, a partial objection may be appropriate.", ["der Widerspruch gegen einen Teil der Forderung"]],
      ["fristbeginn", "der Fristbeginn, die Fristbeginne", "start of a deadline", "den Fristbeginn dokumentieren", "Für den Fristbeginn ist das Zustelldatum entscheidend.", "The date of service determines the start of the deadline.", ["der Beginn der Frist"]],
      ["einschreiben", "das Einschreiben, die Einschreiben", "registered letter", "etwas per Einschreiben versenden", "Eine Kopie des Schreibens wurde per Einschreiben verschickt.", "A copy of the letter was sent by registered mail.", ["der Brief mit Sendungsnachweis"]],
      ["forderung-bestreiten", "eine Forderung bestreiten, hat bestritten", "to dispute a claim", "eine Forderung vollständig oder teilweise bestreiten", "Im Formular bestreite ich die Forderung nur teilweise.", "On the form, I dispute the claim only in part.", ["einer Forderung widersprechen"]]
    ],
    "b1-rental-car": [
      ["kraftstoffart", "die Kraftstoffart, die Kraftstoffarten", "fuel type", "die richtige Kraftstoffart tanken", "Die Kraftstoffart steht auf der Innenseite des Tankdeckels.", "The fuel type is shown inside the fuel cap.", ["der Treibstoff, die Treibstoffe"]],
      ["selbstbehalt", "der Selbstbehalt, die Selbstbehalte", "insurance excess / deductible", "ein Vollkaskoschutz mit Selbstbehalt", "Bei diesem Tarif beträgt der Selbstbehalt fünfhundert Euro.", "With this rate, the insurance excess is five hundred euros.", ["die Selbstbeteiligung, die Selbstbeteiligungen"]],
      ["kindersitz", "der Kindersitz, die Kindersitze", "child seat", "einen Kindersitz dazubuchen", "Wir benötigen für die gesamte Mietdauer einen Kindersitz.", "We need a child seat for the entire rental period.", ["der Autositz für Kinder"]],
      ["rueckgabekontrolle", "die Rückgabekontrolle, die Rückgabekontrollen", "return inspection", "eine gemeinsame Rückgabekontrolle", "Bei der Rückgabekontrolle wurden keine neuen Schäden festgestellt.", "No new damage was found during the return inspection.", ["die Kontrolle bei der Rückgabe", "die Rueckgabekontrolle"]],
      ["ersatzfahrzeug", "das Ersatzfahrzeug, die Ersatzfahrzeuge", "replacement vehicle", "bei einer Panne ein Ersatzfahrzeug erhalten", "Die Mobilitätsgarantie umfasst bei Bedarf ein Ersatzfahrzeug.", "The mobility guarantee includes a replacement vehicle if needed.", ["der Ersatzwagen, die Ersatzwagen"]]
    ],
    "b1-rental-move-out": [
      ["zaehlerprotokoll", "das Zählerprotokoll, die Zählerprotokolle", "meter record", "ein Zählerprotokoll mit Fotos", "Beim Auszug hielten wir alle Zählerstände im Protokoll fest.", "When moving out, we recorded all meter readings in the report.", ["die Aufstellung der Zählerstände", "das Zaehlerprotokoll"]],
      ["nachsendeadresse", "die Nachsendeadresse, die Nachsendeadressen", "forwarding address", "eine Nachsendeadresse mitteilen", "Bitte senden Sie die Kautionsabrechnung an meine neue Nachsendeadresse.", "Please send the deposit statement to my new forwarding address.", ["die neue Postadresse"]],
      ["schlussabrechnung", "die Schlussabrechnung, die Schlussabrechnungen", "final statement", "eine Schlussabrechnung für Strom erhalten", "Die Schlussabrechnung des Energieanbieters steht noch aus.", "The energy provider's final statement is still pending.", ["die Endabrechnung, die Endabrechnungen"]],
      ["strittiger-schaden", "der strittige Schaden, die strittigen Schäden", "disputed damage", "einen strittigen Schaden im Protokoll vermerken", "Der Kratzer am Boden wurde als strittiger Schaden aufgenommen.", "The scratch on the floor was recorded as disputed damage.", ["ein nicht anerkannter Schaden"]],
      ["uebergabezeuge", "der Zeuge, die Zeugen / die Zeugin, die Zeuginnen", "witness", "eine Person als Zeugen zur Übergabe mitnehmen", "Da die Verwaltung kein Protokoll erstellen wollte, nahm ich einen Zeugen zur Übergabe mit.", "Because management did not want to prepare a report, I brought a witness to the handover.", ["die Zeugin bei der Wohnungsübergabe", "der Zeuge bei der Uebergabe"]]
    ],
    "b1-trustworthy-advice": [
      ["kostenfrei", "kostenfrei", "free of charge", "ein kostenfreies Erstgespräch", "Die anerkannte Beratungsstelle bietet ein kostenfreies Erstgespräch an.", "The recognized advice center offers an initial consultation free of charge.", ["kostenlos", "gebührenfrei"]],
      ["fachqualifikation", "die Fachqualifikation, die Fachqualifikationen", "professional qualification", "eine Fachqualifikation nachweisen", "Seriöse Beratende informieren transparent über ihre Fachqualifikation.", "Reputable advisers provide transparent information about their professional qualifications.", ["der Qualifikationsnachweis, die Qualifikationsnachweise"]],
      ["schweigepflicht", "die Schweigepflicht, kein Plural", "duty of confidentiality", "der Schweigepflicht unterliegen", "Die Mitarbeitenden der Beratungsstelle unterliegen der Schweigepflicht.", "The advice center staff are bound by confidentiality.", ["die Vertraulichkeit, kein Plural"]],
      ["unterlagen-sortieren", "Unterlagen sortieren, hat sortiert", "to organize documents", "Briefe vor dem Termin nach Datum sortieren", "Vor dem Gespräch sortiere ich Rechnungen und Schreiben nach Datum.", "Before the consultation, I organize invoices and letters by date.", ["Dokumente ordnen"]],
      ["warnsignal-beratung", "das Warnsignal, die Warnsignale", "warning sign", "Warnsignale eines unseriösen Angebots", "Hoher Zeitdruck und unklare Kosten sind deutliche Warnsignale.", "High time pressure and unclear costs are clear warning signs.", ["das Alarmsignal, die Alarmsignale"]]
    ],
    "a2-job-interview": [
      ["berufsweg", "der Berufsweg, die Berufswege", "career path", "den bisherigen Berufsweg kurz beschreiben", "Zu Beginn des Gesprächs beschreibe ich kurz meinen bisherigen Berufsweg.", "At the beginning of the interview, I briefly describe my career path.", ["der berufliche Weg, die beruflichen Wege"]],
      ["kundenerfahrung", "die Kundenerfahrung, die Kundenerfahrungen", "customer-service experience", "Erfahrung im Kundenkontakt haben", "Durch meine Arbeit im Café habe ich viel Kundenerfahrung gesammelt.", "I gained a lot of customer-service experience through my work in the café.", ["die Erfahrung mit Kundinnen und Kunden"]],
      ["schichtbereit", "bereit für Schichtarbeit", "willing to work shifts", "auch am Wochenende arbeiten können", "Ich bin für Schichtarbeit verfügbar und kann zweimal im Monat samstags arbeiten.", "I am available for shift work and can work two Saturdays a month.", ["im Schichtdienst arbeiten können"]],
      ["einarbeitung-fragen", "Wie läuft die Einarbeitung ab?", "How does the onboarding work?", "nach Dauer und Ablauf der Einarbeitung fragen", "Könnten Sie mir erklären, wie die ersten beiden Wochen der Einarbeitung ablaufen?", "Could you explain how the first two weeks of onboarding work?", ["Wie werde ich eingearbeitet?"]],
      ["naechster-bewerbungsschritt", "der nächste Bewerbungsschritt, die nächsten Bewerbungsschritte", "next application step", "nach dem nächsten Schritt fragen", "Wann erfahre ich, wie es im Bewerbungsverfahren weitergeht?", "When will I find out how the application process continues?", ["der weitere Ablauf, die weiteren Abläufe"]]
    ],
    "a2-moving-registration": [
      ["umzugshelfer", "der Umzugshelfer, die Umzugshelfer / die Umzugshelferin, die Umzugshelferinnen", "moving helper", "Umzugshelfer organisieren", "Drei Umzugshelfer tragen am Samstag die schweren Möbel.", "Three moving helpers are carrying the heavy furniture on Saturday.", ["die Hilfe beim Umzug"]],
      ["briefkastenschild", "das Briefkastenschild, die Briefkastenschilder", "mailbox label", "ein neues Briefkastenschild anbringen", "Nach dem Einzug fehlt noch unser Name am Briefkastenschild.", "After moving in, our name is still missing from the mailbox label.", ["das Namensschild, die Namensschilder"]],
      ["schluessel-uebergabe", "der Schlüssel, die Schlüssel", "key", "die Anzahl der übergebenen Schlüssel notieren", "Im Übergabeprotokoll stehen die Anzahl und Art aller Schlüssel.", "The handover report lists the number and type of all keys.", ["der Wohnungsschlüssel, die Wohnungsschlüssel", "der Schluessel, die Schluessel"]],
      ["sperrmuell", "der Sperrmüll, kein Plural", "bulky waste", "Sperrmüll anmelden · Sperrmüll abholen lassen", "Den alten Schrank lassen wir als Sperrmüll abholen.", "We are having the old wardrobe collected as bulky waste.", ["große Abfälle, nur Plural", "der Sperrmuell"]],
      ["meldefrist-umzug", "die Meldefrist, die Meldefristen", "registration deadline", "die örtliche Meldefrist beachten", "Vor dem Termin prüfen wir die aktuelle Meldefrist der Stadt.", "Before the appointment, we check the city's current registration deadline.", ["die Frist für die Anmeldung"]]
    ],
    "a2-event-booking-refund": [
      ["zahlungsmittel", "das Zahlungsmittel, die Zahlungsmittel", "payment method", "auf das ursprüngliche Zahlungsmittel erstatten", "Der Betrag wird auf das ursprüngliche Zahlungsmittel zurückgezahlt.", "The amount will be refunded to the original payment method.", ["die Zahlungsart, die Zahlungsarten"]],
      ["teilerstattung", "die Teilerstattung, die Teilerstattungen", "partial refund", "eine Teilerstattung anbieten", "Wegen des verkürzten Programms bietet der Veranstalter eine Teilerstattung an.", "The organizer is offering a partial refund because of the shortened program.", ["die teilweise Rückzahlung"]],
      ["vorgangsnummer", "die Vorgangsnummer, die Vorgangsnummern", "case reference number", "eine Vorgangsnummer erhalten", "Bitte nennen Sie bei Rückfragen die Vorgangsnummer aus unserer Bestätigung.", "Please give the case reference number from our confirmation if you have questions.", ["die Bearbeitungsnummer, die Bearbeitungsnummern"]],
      ["technischer-grund", "der technische Grund, die technischen Gründe", "technical reason", "aus technischen Gründen abgesagt", "Die Führung wurde aus technischen Gründen kurzfristig abgesagt.", "The tour was cancelled at short notice for technical reasons.", ["wegen eines technischen Problems"]],
      ["ticket-uebertragen", "ein Ticket übertragen, hat übertragen", "to transfer a ticket", "ein Ticket auf eine andere Person übertragen", "Falls keine Erstattung möglich ist, möchte ich das Ticket auf meine Schwester übertragen.", "If a refund is not possible, I would like to transfer the ticket to my sister.", ["das Ticket weitergeben", "ein Ticket uebertragen"]]
    ],
    "b1-workload-priorities": [
      ["abhaengigkeit", "die Abhängigkeit, die Abhängigkeiten", "dependency", "eine fachliche Abhängigkeit zwischen Aufgaben", "Der Bericht hängt von Daten ab, die erst am Mittwoch geliefert werden.", "The report depends on data that will not be delivered until Wednesday.", ["die Voraussetzung, die Voraussetzungen", "die Abhaengigkeit"]],
      ["zeitschaetzung", "die Zeitschätzung, die Zeitschätzungen", "time estimate", "eine realistische Zeitschätzung abgeben", "Meine aktuelle Zeitschätzung für die Prüfung liegt bei sechs Stunden.", "My current time estimate for the review is six hours.", ["die Aufwandsschätzung, die Aufwandsschätzungen", "die Zeitschaetzung"]],
      ["neu-priorisieren", "etwas neu priorisieren, hat neu priorisiert", "to reprioritize something", "Aufgaben nach Dringlichkeit neu priorisieren", "Wegen des Kundenausfalls müssen wir die Aufgaben neu priorisieren.", "Because of the customer outage, we have to reprioritize the tasks.", ["die Reihenfolge neu festlegen"]],
      ["ueberlastung-anzeigen", "eine Überlastung frühzeitig anzeigen, hat angezeigt", "to flag overload early", "Kapazitätsprobleme sachlich melden", "Ich zeige frühzeitig an, dass die drei Fristen mit der verfügbaren Kapazität nicht erreichbar sind.", "I am flagging early that the three deadlines cannot be met with the available capacity.", ["auf eine Überlastung hinweisen", "eine Ueberlastung anzeigen"]],
      ["verantwortliche-person", "die verantwortliche Person, die verantwortlichen Personen", "owner / person responsible", "für jede Aufgabe eine verantwortliche Person festlegen", "Im Plan steht für jeden nächsten Schritt eine verantwortliche Person.", "The plan names a responsible person for each next step.", ["die zuständige Person, die zuständigen Personen"]]
    ],
    "b1-presentation-followup": [
      ["sprechernotiz", "die Sprechernotiz, die Sprechernotizen", "speaker note", "kurze Sprechernotizen vorbereiten", "Auf den Sprechernotizen stehen nur Zahlen und Übergänge.", "The speaker notes contain only figures and transitions.", ["die Vortragsnotiz, die Vortragsnotizen"]],
      ["schlussfolie", "die Schlussfolie, die Schlussfolien", "closing slide", "eine Schlussfolie mit Empfehlung", "Die Schlussfolie nennt Empfehlung, Verantwortung und Termin.", "The closing slide states the recommendation, owner, and date.", ["die letzte Folie, die letzten Folien"]],
      ["fragerunde", "die Fragerunde, die Fragerunden", "question-and-answer session", "eine Fragerunde moderieren", "Für die Fragerunde sind am Ende fünf Minuten eingeplant.", "Five minutes are planned for questions at the end.", ["die Fragezeit, die Fragezeiten"]],
      ["erhebungsmethode", "die Erhebungsmethode, die Erhebungsmethoden", "data-collection method", "die Erhebungsmethode transparent erklären", "Die Erhebungsmethode wird auf der Quellenfolie kurz erläutert.", "The data-collection method is briefly explained on the source slide.", ["die Methode der Datenerhebung"]],
      ["folgetermin", "der Folgetermin, die Folgetermine", "follow-up date", "einen verbindlichen Folgetermin nennen", "Als Folgetermin für die Auswertung wird der nächste Freitag vereinbart.", "Next Friday is agreed as the follow-up date for the evaluation.", ["der Termin für die Nachbereitung"]]
    ],
    "b1-travel-insurance": [
      ["policennummer", "die Policennummer, die Policennummern", "policy number", "die Policennummer angeben", "Auf dem Schadenformular muss die Policennummer stehen.", "The policy number must be entered on the claim form.", ["die Versicherungsvertragsnummer, die Versicherungsvertragsnummern"]],
      ["gepaeckverspaetungsbericht", "der Gepäckverspätungsbericht, die Gepäckverspätungsberichte", "delayed-baggage report", "am Flughafen einen Gepäckverspätungsbericht erhalten", "Die Fluggesellschaft stellte mir am Schalter einen Gepäckverspätungsbericht aus.", "The airline issued me a delayed-baggage report at the counter.", ["die Verlustmeldung für Gepäck", "der Gepaeckverspaetungsbericht"]],
      ["notwendiger-einkauf", "der notwendige Einkauf, die notwendigen Einkäufe", "essential purchase", "notwendige Kleidung und Hygieneartikel kaufen", "Wegen der Gepäckverspätung musste ich notwendige Hygieneartikel kaufen.", "I had to buy essential toiletries because of the baggage delay.", ["der Ersatzkauf, die Ersatzkäufe"]],
      ["einzelbeleg", "der Einzelbeleg, die Einzelbelege", "itemized receipt", "alle Einzelbelege aufbewahren", "Für jeden notwendigen Einkauf reiche ich einen Einzelbeleg ein.", "I am submitting an itemized receipt for every essential purchase.", ["der Kaufbeleg, die Kaufbelege"]],
      ["schadenvorgang", "der Schadenvorgang, die Schadenvorgänge", "claim case", "einen Schadenvorgang online eröffnen", "Nach der Online-Meldung erhielt ich eine Nummer für den Schadenvorgang.", "After reporting online, I received a number for the claim case.", ["der Versicherungsfall, die Versicherungsfälle", "der Schadenvorgang, die Schadenvorgaenge"]]
    ]
  };

  const targetModules = course.modules.filter(module => module.level === "A2" || module.level === "B1");
  const targetIds = new Set(targetModules.map(module => module.id));
  const packIds = Object.keys(packs);
  const missingPacks = targetModules.filter(module => !packs[module.id]).map(module => module.id);
  if (missingPacks.length) {
    throw new Error(`A2/B1 lexicon coverage mismatch. Missing: ${missingPacks.join(", ")}`);
  }

  const existingIds = new Set(course.modules.flatMap(module => module.words.map(word => word.id)));
  const newIds = new Set();
  for (const module of targetModules) {
    for (const row of packs[module.id]) {
      const [slug, de, en, bundle, example, exampleEn, variants = []] = row;
      const id = `lex-${module.id}-${slug}`;
      if (existingIds.has(id) || newIds.has(id)) throw new Error(`Duplicate A2/B1 lexicon word id: ${id}`);
      if (!de || !en || !bundle || !example || !exampleEn) throw new Error(`Incomplete A2/B1 lexicon row: ${id}`);
      newIds.add(id);
      module.words.push({
        id,
        de,
        en,
        bundle,
        example,
        exampleEn,
        variants,
        practiceAnswers: [],
        supplemental: true,
        expansion: "a2-b1-lexicon"
      });
    }
  }

  const loadedPackIds = packIds.filter(moduleId => targetIds.has(moduleId));
  course.lexiconExpansionA2B1 = {
    moduleCount: targetModules.length,
    wordsPerModule: 5,
    wordCount: newIds.size,
    loadedPacks: loadedPackIds.length,
    deferredPacks: packIds.length - loadedPackIds.length
  };
})();
