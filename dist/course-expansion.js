(function () {
  const course = window.SATZWERK_CURRICULUM;
  if (!course?.modules) throw new Error("Satzwerk curriculum must load before the course expansion");

  const additions = [
  {
    "id": "a0-numbers-spelling-forms",
    "level": "A0",
    "code": "A0.4",
    "title": "Numbers, spelling, and forms",
    "subtitle": "Give short personal details one piece at a time.",
    "canDo": [
      "Read and say the numbers from zero to twelve",
      "Give a first name, family name, phone number, and email address",
      "Spell a short name",
      "Ask someone to repeat or speak slowly"
    ],
    "grammar": [
      {
        "title": "Numbers from zero to twelve",
        "rule": "Learn zero through twelve as one spoken set. Phone numbers can be practiced one digit at a time.",
        "example": "0 null · 1 eins · 2 zwei · 3 drei · 4 vier · 5 fünf · 6 sechs · 7 sieben · 8 acht · 9 neun · 10 zehn · 11 elf · 12 zwölf",
        "translation": "zero through twelve"
      },
      {
        "title": "Form lines",
        "rule": "Use Mein before Vorname and Nachname. Use Meine before Telefonnummer and E-Mail-Adresse.",
        "example": "Mein Vorname ist Lina. Meine Telefonnummer ist 503.",
        "translation": "My first name is Lina. My phone number is 503."
      },
      {
        "title": "Spell a name",
        "rule": "Use Man schreibt, followed by the letters. Say each letter clearly.",
        "example": "Man schreibt Lina: L-I-N-A.",
        "translation": "Lina is spelled L-I-N-A."
      },
      {
        "title": "Ask for help",
        "rule": "Noch einmal, bitte asks for a repeat. Langsam, bitte asks for slower speech.",
        "example": "Noch einmal und langsam, bitte.",
        "translation": "Again and slowly, please."
      }
    ],
    "words": [
      {
        "id": "a0nf-digits",
        "de": "null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf",
        "en": "zero, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve",
        "bundle": "0 null · 1 eins · 2 zwei · 3 drei · 4 vier · 5 fünf · 6 sechs · 7 sieben · 8 acht · 9 neun · 10 zehn · 11 elf · 12 zwölf",
        "example": "Meine Nummer ist fünf null drei.",
        "exampleEn": "My number is five-zero-three.",
        "variants": [
          "null, eins, zwei, drei, vier, fuenf, sechs, sieben, acht, neun, zehn, elf, zwoelf"
        ]
      },
      {
        "id": "a0nf-zahl",
        "de": "die Zahl, die Zahlen",
        "en": "number",
        "bundle": "die Zahl · die Zahlen",
        "example": "Die Zahl ist fünf.",
        "exampleEn": "The number is five.",
        "variants": [
          "die Zahl, die Zahlen"
        ]
      },
      {
        "id": "a0nf-telefonnummer",
        "de": "die Telefonnummer, die Telefonnummern",
        "en": "phone number",
        "bundle": "die Telefonnummer · die Telefonnummern",
        "example": "Meine Telefonnummer ist 503.",
        "exampleEn": "My phone number is 503.",
        "variants": []
      },
      {
        "id": "a0nf-email",
        "de": "die E-Mail-Adresse, die E-Mail-Adressen",
        "en": "email address",
        "bundle": "die E-Mail-Adresse · die E-Mail-Adressen",
        "example": "Meine E-Mail-Adresse ist lina@example.de.",
        "exampleEn": "My email address is lina@example.de.",
        "variants": []
      },
      {
        "id": "a0nf-vorname",
        "de": "der Vorname, die Vornamen",
        "en": "first name",
        "bundle": "der Vorname · die Vornamen",
        "example": "Mein Vorname ist Lina.",
        "exampleEn": "My first name is Lina.",
        "variants": []
      },
      {
        "id": "a0nf-nachname",
        "de": "der Nachname, die Nachnamen",
        "en": "family name",
        "bundle": "der Nachname · die Nachnamen",
        "example": "Mein Nachname ist Roth.",
        "exampleEn": "My family name is Roth.",
        "variants": []
      },
      {
        "id": "a0nf-formular",
        "de": "das Formular, die Formulare",
        "en": "form",
        "bundle": "das Formular · die Formulare",
        "example": "Das Formular ist hier.",
        "exampleEn": "The form is here.",
        "variants": []
      },
      {
        "id": "a0nf-ausfuellen",
        "de": "ausfüllen",
        "en": "to fill out",
        "bundle": "ausfüllen · ich fülle aus",
        "example": "Ich fülle das Formular aus.",
        "exampleEn": "I fill out the form.",
        "variants": [
          "ausfuellen",
          "ich fuelle aus"
        ]
      },
      {
        "id": "a0nf-buchstabieren",
        "de": "buchstabieren",
        "en": "to spell",
        "bundle": "buchstabieren · ich buchstabiere",
        "example": "Ich buchstabiere meinen Namen.",
        "exampleEn": "I spell my name.",
        "variants": []
      },
      {
        "id": "a0nf-schreiben",
        "de": "schreiben",
        "en": "to write",
        "bundle": "schreiben · ich schreibe · man schreibt",
        "example": "Wie schreibt man das?",
        "exampleEn": "How do you write that?",
        "variants": []
      },
      {
        "id": "a0nf-langsam",
        "de": "langsam",
        "en": "slowly",
        "bundle": "langsam · langsamer",
        "example": "Langsam, bitte.",
        "exampleEn": "Slowly, please.",
        "variants": []
      },
      {
        "id": "a0nf-noch-einmal",
        "de": "noch einmal",
        "en": "again / one more time",
        "bundle": "noch einmal · Noch einmal, bitte.",
        "example": "Noch einmal, bitte.",
        "exampleEn": "One more time, please.",
        "variants": []
      },
      {
        "id": "a0nf-hausnummer",
        "de": "die Hausnummer, die Hausnummern",
        "en": "house number",
        "bundle": "die Hausnummer · die Hausnummern",
        "example": "Meine Hausnummer ist 8.",
        "exampleEn": "My house number is 8.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a0nf-postleitzahl",
        "de": "die Postleitzahl, die Postleitzahlen",
        "en": "postal code",
        "bundle": "die Postleitzahl · die Postleitzahlen",
        "example": "Meine Postleitzahl ist 53111.",
        "exampleEn": "My postal code is 53111.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a0nf-ort",
        "de": "der Ort, die Orte",
        "en": "place / town",
        "bundle": "der Ort · die Orte",
        "example": "Der Ort ist Bonn.",
        "exampleEn": "The town is Bonn.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a0nf-geburtsdatum",
        "de": "das Geburtsdatum, die Geburtsdaten",
        "en": "date of birth",
        "bundle": "das Geburtsdatum · die Geburtsdaten",
        "example": "Mein Geburtsdatum ist der 4. Mai.",
        "exampleEn": "My date of birth is May 4.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a0nf-at-zeichen",
        "de": "das At-Zeichen, die At-Zeichen",
        "en": "at sign",
        "bundle": "das At-Zeichen · @",
        "example": "In der E-Mail-Adresse steht ein At-Zeichen.",
        "exampleEn": "There is an at sign in the email address.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a0nf-punkt",
        "de": "der Punkt, die Punkte",
        "en": "dot / full stop",
        "bundle": "der Punkt · die Punkte",
        "example": "In der E-Mail-Adresse steht ein Punkt.",
        "exampleEn": "There is a dot in the email address.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a0nf-bindestrich",
        "de": "der Bindestrich, die Bindestriche",
        "en": "hyphen",
        "bundle": "der Bindestrich · die Bindestriche",
        "example": "L-I-N-A hat drei Bindestriche.",
        "exampleEn": "L-I-N-A has three hyphens.",
        "variants": [],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "a0nf-q1",
        "type": "NUMBER",
        "context": "You see the digit 5 on a form.",
        "prompt": "Write: The number is five.",
        "answers": [
          "Die Zahl ist fünf.",
          "Die Zahl ist fuenf."
        ],
        "explanation": "Fünf is the spoken word for the digit 5.",
        "requires": [
          "a0nf-digits",
          "a0nf-zahl"
        ],
        "wordBank": [
          "Die",
          "Zahl",
          "ist",
          "fünf."
        ]
      },
      {
        "id": "a0nf-q2",
        "type": "FORM",
        "context": "Your phone number is 503.",
        "prompt": "Give the number in one complete sentence.",
        "answers": [
          "Meine Telefonnummer ist 503."
        ],
        "explanation": "Meine Telefonnummer ist introduces the digits.",
        "requires": [
          "a0nf-telefonnummer",
          "a0nf-digits"
        ],
        "wordBank": [
          "Meine",
          "Telefonnummer",
          "ist",
          "503."
        ]
      },
      {
        "id": "a0nf-q3",
        "type": "FORM",
        "context": "Your first name is Nina.",
        "prompt": "Write the form line as a sentence.",
        "answers": [
          "Mein Vorname ist Nina."
        ],
        "explanation": "Vorname is masculine, so the phrase begins with Mein.",
        "requires": [
          "a0nf-vorname"
        ],
        "wordBank": [
          "Mein",
          "Vorname",
          "ist",
          "Nina."
        ]
      },
      {
        "id": "a0nf-q4",
        "type": "FORM",
        "context": "Your family name is Roth.",
        "prompt": "Write the form line as a sentence.",
        "answers": [
          "Mein Nachname ist Roth."
        ],
        "explanation": "Nachname uses Mein in this sentence.",
        "requires": [
          "a0nf-nachname"
        ],
        "wordBank": [
          "Mein",
          "Nachname",
          "ist",
          "Roth."
        ]
      },
      {
        "id": "a0nf-q5",
        "type": "SPELLING",
        "context": "Someone asks how to write Lina.",
        "prompt": "Spell Lina with the taught sentence frame.",
        "answers": [
          "Man schreibt Lina: L-I-N-A.",
          "Man schreibt Lina L-I-N-A."
        ],
        "explanation": "Man schreibt introduces the written letters.",
        "requires": [
          "a0nf-schreiben",
          "a0nf-buchstabieren"
        ],
        "wordBank": [
          "Man",
          "schreibt",
          "Lina:",
          "L-I-N-A."
        ]
      },
      {
        "id": "a0nf-q6",
        "type": "HELP PHRASE",
        "context": "You did not catch how a word is written.",
        "prompt": "Ask: How do you write that?",
        "answers": [
          "Wie schreibt man das?"
        ],
        "explanation": "Wie schreibt man das? is a complete reusable question.",
        "requires": [
          "a0nf-schreiben"
        ],
        "wordBank": [
          "Wie",
          "schreibt",
          "man",
          "das?"
        ]
      },
      {
        "id": "a0nf-q7",
        "type": "HELP PHRASE",
        "context": "The details were too fast.",
        "prompt": "Ask for them again and slowly.",
        "answers": [
          "Noch einmal und langsam, bitte.",
          "Bitte noch einmal und langsam."
        ],
        "explanation": "Noch einmal requests a repeat, and langsam requests a slower pace.",
        "requires": [
          "a0nf-langsam",
          "a0nf-noch-einmal"
        ],
        "wordBank": [
          "Noch",
          "einmal",
          "und",
          "langsam,",
          "bitte."
        ]
      }
    ],
    "input": {
      "script": "Mein Vorname ist Lina. Mein Nachname ist Roth. Meine Telefonnummer ist fünf-null-drei. Meine E-Mail-Adresse ist lina@example.de.",
      "listenPrompt": "Wie ist der Nachname?",
      "listenAnswers": [
        "Der Nachname ist Roth.",
        "Roth."
      ],
      "passage": "FORMULAR. Vorname: Lina. Nachname: Roth. Telefonnummer: 503. E-Mail-Adresse: lina@example.de.",
      "readPrompt": "Wie ist die Telefonnummer?",
      "readAnswers": [
        "Die Telefonnummer ist 503.",
        "503."
      ]
    },
    "task": {
      "writingPrompt": "Create a four-line form profile. Include a first name, family name, phone number, and email address. Use one complete sentence for every line.",
      "minWords": 16,
      "guide": [
        "Begin every line with Mein or Meine",
        "Use digits for the phone number",
        "Finish every line with punctuation"
      ],
      "required": [
        "Vorname",
        "Nachname",
        "Telefonnummer",
        "E-Mail-Adresse"
      ],
      "model": "Mein Vorname ist Lina. Mein Nachname ist Roth. Meine Telefonnummer ist 503. Meine E-Mail-Adresse ist lina@example.de.",
      "speakingPrompt": "Give your name, spell your first name, and say a short phone number one digit at a time.",
      "speakingGuide": [
        "Give a first name",
        "Use Man schreibt before the letters",
        "Say each digit clearly",
        "Ask for a repeat once"
      ],
      "speakingRequired": [
        "Vorname",
        "schreibt",
        "Telefonnummer"
      ],
      "speakingModel": "Mein Vorname ist Lina. Man schreibt Lina: L-I-N-A. Meine Telefonnummer ist fünf null drei. Noch einmal, bitte."
    },
    "culture": {
      "title": "Capital letters carry information",
      "body": "German nouns begin with capital letters. Forms make this pattern easy to notice in words such as Vorname, Nachname, Telefonnummer, and Adresse.",
      "sourceTitle": "Council for German Orthography: Official rules",
      "url": "https://www.rechtschreibrat.com/regeln-und-woerterverzeichnis/",
      "tags": [
        "Großschreibung",
        "das Formular",
        "der Name"
      ]
    },
    "prerequisite": "a0-everyday-things"
  },
  {
    "id": "a0-conversation-repair",
    "level": "A0",
    "code": "A0.5",
    "title": "Keep the conversation going",
    "subtitle": "Use short repair phrases when German is unclear.",
    "canDo": [
      "Say that you do not understand",
      "Ask for a repetition or slower speech",
      "Ask what a word means",
      "Ask someone to write a word and confirm an answer"
    ],
    "grammar": [
      {
        "title": "A complete repair phrase",
        "rule": "Learn Ich verstehe das nicht as one complete sentence. It gives the other person a clear signal.",
        "example": "Entschuldigung, ich verstehe das nicht.",
        "translation": "Excuse me, I do not understand that."
      },
      {
        "title": "Polite requests with Sie",
        "rule": "Können Sie begins a polite request. The action goes at the end.",
        "example": "Können Sie das wiederholen?",
        "translation": "Can you repeat that?"
      },
      {
        "title": "Ask about meaning",
        "rule": "Was bedeutet followed by a word asks for its meaning.",
        "example": "Was bedeutet Fahrkarte?",
        "translation": "What does Fahrkarte mean?"
      },
      {
        "title": "Confirm simply",
        "rule": "Use Ist das richtig? to check what you heard or wrote.",
        "example": "Drei-null-fünf. Ist das richtig?",
        "translation": "Three-zero-five. Is that correct?"
      }
    ],
    "words": [
      {
        "id": "a0cr-entschuldigung",
        "de": "Entschuldigung!",
        "en": "Excuse me! / Sorry!",
        "bundle": "Entschuldigung! · Entschuldigung, ...",
        "example": "Entschuldigung, ich habe eine Frage.",
        "exampleEn": "Excuse me, I have a question.",
        "variants": []
      },
      {
        "id": "a0cr-nicht-verstehen",
        "de": "Ich verstehe das nicht.",
        "en": "I do not understand that.",
        "bundle": "verstehen · ich verstehe · Ich verstehe das nicht.",
        "example": "Entschuldigung, ich verstehe das nicht.",
        "exampleEn": "Excuse me, I do not understand that.",
        "variants": []
      },
      {
        "id": "a0cr-bitte-langsam",
        "de": "Bitte langsam.",
        "en": "Slowly, please.",
        "bundle": "bitte langsam · Bitte langsamer.",
        "example": "Bitte langsam. Ich lerne Deutsch.",
        "exampleEn": "Slowly, please. I am learning German.",
        "variants": []
      },
      {
        "id": "a0cr-wiederholen",
        "de": "wiederholen",
        "en": "to repeat",
        "bundle": "wiederholen · Sie wiederholen",
        "example": "Können Sie das wiederholen?",
        "exampleEn": "Can you repeat that?",
        "variants": [
          "Koennen Sie das wiederholen?"
        ]
      },
      {
        "id": "a0cr-aufschreiben",
        "de": "aufschreiben",
        "en": "to write down",
        "bundle": "aufschreiben · Sie schreiben auf",
        "example": "Können Sie das aufschreiben?",
        "exampleEn": "Can you write that down?",
        "variants": [
          "Koennen Sie das aufschreiben?"
        ]
      },
      {
        "id": "a0cr-bedeuten",
        "de": "bedeuten",
        "en": "to mean",
        "bundle": "bedeuten · Was bedeutet ...?",
        "example": "Was bedeutet Termin?",
        "exampleEn": "What does Termin mean?",
        "variants": []
      },
      {
        "id": "a0cr-sagen",
        "de": "sagen",
        "en": "to say",
        "bundle": "sagen · ich sage · Sie sagen",
        "example": "Wie sagt man das auf Deutsch?",
        "exampleEn": "How do you say that in German?",
        "variants": []
      },
      {
        "id": "a0cr-helfen",
        "de": "helfen",
        "en": "to help",
        "bundle": "helfen · Sie helfen",
        "example": "Können Sie mir helfen?",
        "exampleEn": "Can you help me?",
        "variants": [
          "Koennen Sie mir helfen?"
        ]
      },
      {
        "id": "a0cr-frage",
        "de": "die Frage, die Fragen",
        "en": "question",
        "bundle": "die Frage · die Fragen",
        "example": "Ich habe eine Frage.",
        "exampleEn": "I have a question.",
        "variants": []
      },
      {
        "id": "a0cr-antwort",
        "de": "die Antwort, die Antworten",
        "en": "answer",
        "bundle": "die Antwort · die Antworten",
        "example": "Die Antwort ist richtig.",
        "exampleEn": "The answer is correct.",
        "variants": []
      },
      {
        "id": "a0cr-richtig",
        "de": "richtig",
        "en": "correct",
        "bundle": "richtig · Ist das richtig?",
        "example": "Ist das richtig?",
        "exampleEn": "Is that correct?",
        "variants": []
      },
      {
        "id": "a0cr-lernen",
        "de": "lernen",
        "en": "to learn",
        "bundle": "lernen · ich lerne",
        "example": "Ich lerne Deutsch.",
        "exampleEn": "I am learning German.",
        "variants": []
      },
      {
        "id": "a0cr-wie-bitte",
        "de": "Wie bitte?",
        "en": "Pardon?",
        "bundle": "Wie bitte? · Bitte?",
        "example": "Wie bitte? Können Sie das wiederholen?",
        "exampleEn": "Pardon? Can you repeat that?",
        "variants": [
          "Wie bitte? Koennen Sie das wiederholen?"
        ],
        "supplemental": true
      },
      {
        "id": "a0cr-wort",
        "de": "das Wort, die Wörter",
        "en": "word",
        "bundle": "das Wort · die Wörter",
        "example": "Das Wort ist neu.",
        "exampleEn": "The word is new.",
        "variants": [
          "das Wort, die Woerter"
        ],
        "supplemental": true
      },
      {
        "id": "a0cr-beispiel",
        "de": "das Beispiel, die Beispiele",
        "en": "example",
        "bundle": "das Beispiel · die Beispiele",
        "example": "Können Sie ein Beispiel geben?",
        "exampleEn": "Can you give an example?",
        "variants": [
          "Koennen Sie ein Beispiel geben?"
        ],
        "supplemental": true
      },
      {
        "id": "a0cr-sprache",
        "de": "die Sprache, die Sprachen",
        "en": "language",
        "bundle": "die Sprache · die Sprachen",
        "example": "Deutsch ist eine Sprache.",
        "exampleEn": "German is a language.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a0cr-deutlich",
        "de": "deutlich",
        "en": "clearly",
        "bundle": "deutlich · Bitte deutlich sprechen.",
        "example": "Können Sie bitte deutlich sprechen?",
        "exampleEn": "Can you please speak clearly?",
        "variants": [
          "Koennen Sie bitte deutlich sprechen?"
        ],
        "supplemental": true
      },
      {
        "id": "a0cr-auf-deutsch",
        "de": "auf Deutsch",
        "en": "in German",
        "bundle": "auf Deutsch · Deutsch sprechen",
        "example": "Wie sagt man das auf Deutsch?",
        "exampleEn": "How do you say that in German?",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a0cr-auf-englisch",
        "de": "auf Englisch",
        "en": "in English",
        "bundle": "auf Englisch · Englisch sprechen",
        "example": "Was bedeutet das auf Englisch?",
        "exampleEn": "What does that mean in English?",
        "variants": [],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "a0cr-q1",
        "type": "REPAIR",
        "context": "A sentence is unclear.",
        "prompt": "Say: Excuse me, I do not understand that.",
        "answers": [
          "Entschuldigung, ich verstehe das nicht."
        ],
        "explanation": "The apology and repair sentence give a clear, polite signal.",
        "requires": [
          "a0cr-entschuldigung",
          "a0cr-nicht-verstehen"
        ],
        "wordBank": [
          "Entschuldigung,",
          "ich",
          "verstehe",
          "das",
          "nicht."
        ]
      },
      {
        "id": "a0cr-q2",
        "type": "POLITE REQUEST",
        "context": "You need to hear the sentence again.",
        "prompt": "Ask formally: Can you repeat that?",
        "answers": [
          "Können Sie das wiederholen?",
          "Koennen Sie das wiederholen?"
        ],
        "explanation": "Können Sie begins the request, and wiederholen goes at the end.",
        "requires": [
          "a0cr-wiederholen"
        ],
        "wordBank": [
          "Können",
          "Sie",
          "das",
          "wiederholen?"
        ]
      },
      {
        "id": "a0cr-q3",
        "type": "POLITE REQUEST",
        "context": "The speaker is going too fast.",
        "prompt": "Ask for slower speech.",
        "answers": [
          "Bitte langsam.",
          "Bitte langsamer.",
          "Langsam, bitte.",
          "Langsamer, bitte."
        ],
        "explanation": "Bitte can appear before or after the short request.",
        "requires": [
          "a0cr-bitte-langsam"
        ],
        "wordBank": [
          "Bitte",
          "langsam."
        ]
      },
      {
        "id": "a0cr-q4",
        "type": "MEANING",
        "context": "You see the word Formular from the previous module.",
        "prompt": "Ask what Formular means.",
        "answers": [
          "Was bedeutet Formular?",
          "Was bedeutet „Formular“?"
        ],
        "explanation": "Was bedeutet followed by the word asks for its meaning.",
        "requires": [
          "a0cr-bedeuten"
        ],
        "wordBank": [
          "Was",
          "bedeutet",
          "Formular?"
        ]
      },
      {
        "id": "a0cr-q5",
        "type": "POLITE REQUEST",
        "context": "You need the word on paper.",
        "prompt": "Ask formally for the person to write it down.",
        "answers": [
          "Können Sie das aufschreiben?",
          "Koennen Sie das aufschreiben?"
        ],
        "explanation": "Aufschreiben moves to the end after Können Sie.",
        "requires": [
          "a0cr-aufschreiben"
        ],
        "wordBank": [
          "Können",
          "Sie",
          "das",
          "aufschreiben?"
        ]
      },
      {
        "id": "a0cr-q6",
        "type": "HELP PHRASE",
        "context": "You need assistance with a form.",
        "prompt": "Ask formally: Can you help me?",
        "answers": [
          "Können Sie mir helfen?",
          "Koennen Sie mir helfen?"
        ],
        "explanation": "Können Sie mir helfen? is a complete formal request.",
        "requires": [
          "a0cr-helfen"
        ],
        "wordBank": [
          "Können",
          "Sie",
          "mir",
          "helfen?"
        ]
      },
      {
        "id": "a0cr-q7",
        "type": "CONFIRM",
        "context": "You heard the number 305 and want to check it.",
        "prompt": "Write: Three-zero-five. Is that correct?",
        "answers": [
          "Drei null fünf. Ist das richtig?",
          "Drei null fuenf. Ist das richtig?"
        ],
        "explanation": "Ist das richtig? checks the information you repeated.",
        "requires": [
          "a0cr-richtig"
        ],
        "wordBank": [
          "Drei",
          "null",
          "fünf.",
          "Ist",
          "das",
          "richtig?"
        ]
      }
    ],
    "input": {
      "script": "MIRA: Guten Tag. Das Wort heißt Formular. LEON: Entschuldigung, ich verstehe das nicht. Können Sie das wiederholen? MIRA: Formular. LEON: Können Sie das aufschreiben? MIRA: F-O-R-M-U-L-A-R.",
      "listenPrompt": "Was schreibt Mira?",
      "listenAnswers": [
        "Mira schreibt das Wort Formular.",
        "Formular."
      ],
      "passage": "LEON: Entschuldigung, ich habe eine Frage. Was bedeutet Adresse? MIRA: Address. LEON: Danke. Wie schreibt man das? MIRA: A-D-R-E-S-S-E. LEON: Adresse. Ist das richtig? MIRA: Richtig.",
      "readPrompt": "Was schreibt Mira?",
      "readAnswers": [
        "Mira schreibt das Wort Adresse.",
        "Adresse."
      ]
    },
    "task": {
      "writingPrompt": "Write a five-line help exchange. Include an apology, say that you do not understand, ask for a repetition, ask for the word to be written, and confirm it.",
      "minWords": 16,
      "guide": [
        "Use the formal Sie request twice",
        "Put each action at the end of its request",
        "Finish both questions with a question mark"
      ],
      "required": [
        "Entschuldigung",
        "verstehe",
        "wiederholen",
        "aufschreiben",
        "richtig"
      ],
      "model": "Entschuldigung, ich verstehe das nicht. Können Sie das wiederholen? Können Sie das aufschreiben? A-D-R-E-S-S-E. Ist das richtig?",
      "speakingPrompt": "Practice recovering from one unclear sentence in a formal conversation.",
      "speakingGuide": [
        "Begin with Entschuldigung",
        "Say that you do not understand",
        "Ask for slower speech",
        "Ask for a repetition",
        "Confirm what you heard"
      ],
      "speakingRequired": [
        "Entschuldigung",
        "nicht",
        "wiederholen",
        "richtig"
      ],
      "speakingModel": "Entschuldigung, ich verstehe das nicht. Bitte langsam. Können Sie das wiederholen? Drei null fünf. Ist das richtig?"
    },
    "culture": {
      "title": "Bitte does several jobs",
      "body": "Bitte can mean please, you are welcome, or a request to repeat, depending on the situation and intonation. Full phrases make the intended meaning clear.",
      "sourceTitle": "Duden: bitte",
      "url": "https://www.duden.de/rechtschreibung/bitte",
      "tags": [
        "bitte",
        "wiederholen",
        "Höflichkeit"
      ]
    },
    "prerequisite": "a0-numbers-spelling-forms"
  },
  {
    "id": "a0-time-date-schedule",
    "level": "A0",
    "code": "A0.6",
    "title": "Time and a simple schedule",
    "subtitle": "Read a basic timetable and say when something happens.",
    "canDo": [
      "Say a whole-hour time",
      "Name today, tomorrow, Monday, and Tuesday",
      "Say when a course or appointment begins and ends",
      "Read open, closed, and break information"
    ],
    "grammar": [
      {
        "title": "Whole-hour time",
        "rule": "Use um before the time of an event. Use Uhr after a whole-hour number.",
        "example": "Der Kurs ist um neun Uhr.",
        "translation": "The course is at nine o'clock."
      },
      {
        "title": "Days",
        "rule": "Use am before a weekday.",
        "example": "Der Termin ist am Dienstag.",
        "translation": "The appointment is on Tuesday."
      },
      {
        "title": "Separable verbs",
        "rule": "In a statement, fängt comes near the beginning and an moves to the end. The same pattern applies to auf in aufhören.",
        "example": "Der Kurs fängt um neun Uhr an.",
        "translation": "The course starts at nine o'clock."
      },
      {
        "title": "Ask when",
        "rule": "Wann comes first, followed by the changed verb and the subject.",
        "example": "Wann fängt der Kurs an?",
        "translation": "When does the course start?"
      }
    ],
    "words": [
      {
        "id": "a0ts-heute",
        "de": "heute",
        "en": "today",
        "bundle": "heute · heute um neun Uhr",
        "example": "Der Kurs ist heute.",
        "exampleEn": "The course is today.",
        "variants": []
      },
      {
        "id": "a0ts-morgen",
        "de": "morgen",
        "en": "tomorrow",
        "bundle": "morgen · morgen um zehn Uhr",
        "example": "Der Termin ist morgen.",
        "exampleEn": "The appointment is tomorrow.",
        "variants": []
      },
      {
        "id": "a0ts-montag",
        "de": "der Montag · der Dienstag",
        "en": "Monday and Tuesday",
        "bundle": "der Montag · am Montag · der Dienstag · am Dienstag",
        "example": "Der Kurs ist am Montag. Der Termin ist am Dienstag.",
        "exampleEn": "The course is on Monday. The appointment is on Tuesday.",
        "variants": []
      },
      {
        "id": "a0ts-uhr",
        "de": "die Uhr, die Uhren",
        "en": "clock / o'clock",
        "bundle": "die Uhr · um neun Uhr",
        "example": "Es ist neun Uhr.",
        "exampleEn": "It is nine o'clock.",
        "variants": []
      },
      {
        "id": "a0ts-kurs",
        "de": "der Kurs, die Kurse",
        "en": "course",
        "bundle": "der Kurs · die Kurse",
        "example": "Der Kurs ist heute.",
        "exampleEn": "The course is today.",
        "variants": []
      },
      {
        "id": "a0ts-termin",
        "de": "der Termin, die Termine",
        "en": "appointment",
        "bundle": "der Termin · die Termine",
        "example": "Der Termin ist um zehn Uhr.",
        "exampleEn": "The appointment is at ten o'clock.",
        "variants": []
      },
      {
        "id": "a0ts-pause",
        "de": "die Pause, die Pausen",
        "en": "break",
        "bundle": "die Pause · die Pausen",
        "example": "Die Pause ist um zehn Uhr.",
        "exampleEn": "The break is at ten o'clock.",
        "variants": []
      },
      {
        "id": "a0ts-anfangen",
        "de": "anfangen",
        "en": "to begin",
        "bundle": "anfangen · der Kurs fängt an",
        "example": "Der Kurs fängt um neun Uhr an.",
        "exampleEn": "The course begins at nine o'clock.",
        "variants": [
          "der Kurs faengt an"
        ]
      },
      {
        "id": "a0ts-aufhoeren",
        "de": "aufhören",
        "en": "to end / stop",
        "bundle": "aufhören · der Kurs hört auf",
        "example": "Der Kurs hört um elf Uhr auf.",
        "exampleEn": "The course ends at eleven o'clock.",
        "variants": [
          "aufhoeren",
          "der Kurs hoert auf"
        ]
      },
      {
        "id": "a0ts-offen",
        "de": "offen",
        "en": "open",
        "bundle": "offen · heute offen",
        "example": "Das Büro ist heute offen.",
        "exampleEn": "The office is open today.",
        "variants": [
          "Das Buero ist heute offen."
        ]
      },
      {
        "id": "a0ts-geschlossen",
        "de": "geschlossen",
        "en": "closed",
        "bundle": "geschlossen · heute geschlossen",
        "example": "Das Büro ist morgen geschlossen.",
        "exampleEn": "The office is closed tomorrow.",
        "variants": [
          "Das Buero ist morgen geschlossen."
        ]
      },
      {
        "id": "a0ts-buero",
        "de": "das Büro, die Büros",
        "en": "office",
        "bundle": "das Büro · die Büros",
        "example": "Das Büro ist heute offen.",
        "exampleEn": "The office is open today.",
        "variants": [
          "das Buero, die Bueros"
        ]
      },
      {
        "id": "a0ts-nachmittag",
        "de": "der Nachmittag, die Nachmittage",
        "en": "afternoon",
        "bundle": "der Nachmittag · am Nachmittag",
        "example": "Der Termin ist am Nachmittag.",
        "exampleEn": "The appointment is in the afternoon.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a0ts-kalender",
        "de": "der Kalender, die Kalender",
        "en": "calendar",
        "bundle": "der Kalender · die Kalender",
        "example": "Der Termin steht im Kalender.",
        "exampleEn": "The appointment is in the calendar.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a0ts-mittwoch",
        "de": "der Mittwoch, die Mittwoche",
        "en": "Wednesday",
        "bundle": "der Mittwoch · am Mittwoch",
        "example": "Der Kurs ist am Mittwoch.",
        "exampleEn": "The course is on Wednesday.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a0ts-donnerstag",
        "de": "der Donnerstag, die Donnerstage",
        "en": "Thursday",
        "bundle": "der Donnerstag · am Donnerstag",
        "example": "Der Termin ist am Donnerstag.",
        "exampleEn": "The appointment is on Thursday.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a0ts-freitag",
        "de": "der Freitag, die Freitage",
        "en": "Friday",
        "bundle": "der Freitag · am Freitag",
        "example": "Das Büro ist am Freitag offen.",
        "exampleEn": "The office is open on Friday.",
        "variants": [
          "Das Buero ist am Freitag offen."
        ],
        "supplemental": true
      },
      {
        "id": "a0ts-wochenende",
        "de": "das Wochenende, die Wochenenden",
        "en": "weekend",
        "bundle": "das Wochenende · am Wochenende",
        "example": "Am Wochenende ist das Büro geschlossen.",
        "exampleEn": "The office is closed on the weekend.",
        "variants": [
          "Am Wochenende ist das Buero geschlossen."
        ],
        "supplemental": true
      },
      {
        "id": "a0ts-von-bis",
        "de": "von ... bis ...",
        "en": "from ... to ...",
        "bundle": "von neun bis elf Uhr",
        "example": "Der Kurs ist von neun bis elf Uhr.",
        "exampleEn": "The course is from nine to eleven.",
        "variants": [],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "a0ts-q1",
        "type": "TIME",
        "context": "The course starts at 9:00.",
        "prompt": "Say when the course begins.",
        "answers": [
          "Der Kurs fängt um neun Uhr an.",
          "Der Kurs faengt um neun Uhr an.",
          "Der Kurs fängt um 9 Uhr an.",
          "Der Kurs faengt um 9 Uhr an."
        ],
        "explanation": "Um introduces the time, and an closes the sentence.",
        "requires": [
          "a0ts-kurs",
          "a0ts-uhr",
          "a0ts-anfangen"
        ],
        "wordBank": [
          "Der",
          "Kurs",
          "fängt",
          "um",
          "neun",
          "Uhr",
          "an."
        ]
      },
      {
        "id": "a0ts-q2",
        "type": "TIME",
        "context": "The course ends at 11:00.",
        "prompt": "Say when the course ends.",
        "answers": [
          "Der Kurs hört um elf Uhr auf.",
          "Der Kurs hoert um elf Uhr auf.",
          "Der Kurs hört um 11 Uhr auf.",
          "Der Kurs hoert um 11 Uhr auf."
        ],
        "explanation": "The changed verb is hört, and auf goes at the end.",
        "requires": [
          "a0ts-kurs",
          "a0ts-uhr",
          "a0ts-aufhoeren"
        ],
        "wordBank": [
          "Der",
          "Kurs",
          "hört",
          "um",
          "elf",
          "Uhr",
          "auf."
        ]
      },
      {
        "id": "a0ts-q3",
        "type": "DAY",
        "context": "The appointment is on Tuesday.",
        "prompt": "Write the sentence.",
        "answers": [
          "Der Termin ist am Dienstag."
        ],
        "explanation": "Am comes before a weekday.",
        "requires": [
          "a0ts-termin",
          "a0ts-montag"
        ],
        "wordBank": [
          "Der",
          "Termin",
          "ist",
          "am",
          "Dienstag."
        ]
      },
      {
        "id": "a0ts-q4",
        "type": "QUESTION",
        "context": "You need the course start time.",
        "prompt": "Ask: When does the course start?",
        "answers": [
          "Wann fängt der Kurs an?",
          "Wann faengt der Kurs an?"
        ],
        "explanation": "Wann begins the question, and an goes at the end.",
        "requires": [
          "a0ts-kurs",
          "a0ts-anfangen"
        ],
        "wordBank": [
          "Wann",
          "fängt",
          "der",
          "Kurs",
          "an?"
        ]
      },
      {
        "id": "a0ts-q5",
        "type": "SCHEDULE",
        "context": "The office is open today.",
        "prompt": "Write the schedule information.",
        "answers": [
          "Das Büro ist heute offen.",
          "Das Buero ist heute offen."
        ],
        "explanation": "Heute gives the day, and offen gives the status.",
        "requires": [
          "a0ts-heute",
          "a0ts-offen",
          "a0ts-buero"
        ],
        "wordBank": [
          "Das",
          "Büro",
          "ist",
          "heute",
          "offen."
        ]
      },
      {
        "id": "a0ts-q6",
        "type": "SCHEDULE",
        "context": "The office is closed tomorrow.",
        "prompt": "Write the schedule information.",
        "answers": [
          "Das Büro ist morgen geschlossen.",
          "Das Buero ist morgen geschlossen."
        ],
        "explanation": "Morgen gives the day, and geschlossen gives the status.",
        "requires": [
          "a0ts-morgen",
          "a0ts-geschlossen",
          "a0ts-buero"
        ],
        "wordBank": [
          "Das",
          "Büro",
          "ist",
          "morgen",
          "geschlossen."
        ]
      },
      {
        "id": "a0ts-q7",
        "type": "SCHEDULE",
        "context": "The break is at 10:00.",
        "prompt": "Write one complete sentence.",
        "answers": [
          "Die Pause ist um zehn Uhr.",
          "Die Pause ist um 10 Uhr."
        ],
        "explanation": "Use um before the clock time.",
        "requires": [
          "a0ts-pause",
          "a0ts-uhr"
        ],
        "wordBank": [
          "Die",
          "Pause",
          "ist",
          "um",
          "zehn",
          "Uhr."
        ]
      }
    ],
    "input": {
      "script": "Der Kurs ist am Montag. Er fängt um neun Uhr an. Die Pause ist um zehn Uhr. Der Kurs hört um elf Uhr auf.",
      "listenPrompt": "Wann fängt der Kurs an?",
      "listenAnswers": [
        "Der Kurs fängt um neun Uhr an.",
        "Um neun Uhr.",
        "Um 9 Uhr."
      ],
      "passage": "MONTAG: Kurs, 9 Uhr bis 11 Uhr. DIENSTAG: Termin, 10 Uhr. Das Büro ist am Montag offen. Das Büro ist am Dienstag geschlossen.",
      "readPrompt": "Wann ist der Termin?",
      "readAnswers": [
        "Der Termin ist am Dienstag um zehn Uhr.",
        "Am Dienstag um zehn Uhr.",
        "Am Dienstag um 10 Uhr."
      ]
    },
    "task": {
      "writingPrompt": "Write a four-line schedule. Include a weekday, a course start time, a break time, and a course end time.",
      "minWords": 22,
      "guide": [
        "Use am before the weekday",
        "Use um before each time",
        "Put an or auf at the end of the verb sentence"
      ],
      "required": [
        "am",
        "fängt",
        "Pause",
        "hört"
      ],
      "model": "Der Kurs ist am Montag. Er fängt um neun Uhr an. Die Pause ist um zehn Uhr. Der Kurs hört um elf Uhr auf.",
      "speakingPrompt": "Present a simple schedule aloud.",
      "speakingGuide": [
        "Name the weekday",
        "Give the start time",
        "Give the break time",
        "Give the end time",
        "Say whether the office is open"
      ],
      "speakingRequired": [
        "am",
        "Uhr",
        "offen"
      ],
      "speakingModel": "Der Kurs ist am Montag. Er fängt um neun Uhr an. Die Pause ist um zehn Uhr. Der Kurs hört um elf Uhr auf. Das Büro ist offen."
    },
    "culture": {
      "title": "Reading the 24-hour clock",
      "body": "German train and transit schedules commonly show 24-hour times. A time such as 18:05 is read as achtzehn Uhr fünf in schedule contexts.",
      "sourceTitle": "Deutsche Bahn: Timetable information",
      "url": "https://int.bahn.de/en/booking-information/timetable-information",
      "tags": [
        "die Uhrzeit",
        "der Fahrplan",
        "18:05"
      ]
    },
    "prerequisite": "a0-conversation-repair"
  },
  {
    "id": "a1-public-transport-tickets",
    "level": "A1",
    "code": "A1.8",
    "title": "Tickets and train changes",
    "subtitle": "Buy the right ticket and follow a changing journey.",
    "canDo": [
      "Ask for a one-way or return ticket",
      "Find a departure track and platform",
      "Describe boarding, changing, and leaving a train",
      "Understand a short delay or platform announcement"
    ],
    "grammar": [
      {
        "title": "A polite ticket request",
        "rule": "Use Ich hätte gern followed by the ticket and destination.",
        "example": "Ich hätte gern eine Fahrkarte nach Köln.",
        "translation": "I would like a ticket to Cologne."
      },
      {
        "title": "Nach with cities",
        "rule": "Use nach before a city destination. Use von before the starting point.",
        "example": "Eine Fahrkarte von Bonn nach Köln, bitte.",
        "translation": "A ticket from Bonn to Cologne, please."
      },
      {
        "title": "Travel verbs split",
        "rule": "In statements, the prefix moves to the end with einsteigen, aussteigen, umsteigen, and ankommen.",
        "example": "Ich steige in Bonn um. Der Zug kommt um 10 Uhr an.",
        "translation": "I change in Bonn. The train arrives at 10."
      },
      {
        "title": "Ask for the track",
        "rule": "Von welchem Gleis asks for the departure track. Use fährt ... ab around the subject.",
        "example": "Von welchem Gleis fährt der Zug ab?",
        "translation": "Which track does the train depart from?"
      }
    ],
    "words": [
      {
        "id": "a1pt-fahrkarte",
        "de": "die Fahrkarte, die Fahrkarten",
        "en": "ticket",
        "bundle": "die Fahrkarte · die Fahrkarten",
        "example": "Ich brauche eine Fahrkarte nach Köln.",
        "exampleEn": "I need a ticket to Cologne.",
        "variants": [
          "Ich brauche eine Fahrkarte nach Koeln."
        ]
      },
      {
        "id": "a1pt-einfache-fahrt",
        "de": "die einfache Fahrt, die einfachen Fahrten",
        "en": "one-way trip",
        "bundle": "eine einfache Fahrt · einfache Fahrten",
        "example": "Ich möchte eine einfache Fahrt.",
        "exampleEn": "I would like a one-way trip.",
        "variants": [
          "Ich moechte eine einfache Fahrt."
        ]
      },
      {
        "id": "a1pt-rueckfahrt",
        "de": "die Hin- und Rückfahrt, die Hin- und Rückfahrten",
        "en": "round trip",
        "bundle": "die Hin- und Rückfahrt · hin und zurück",
        "example": "Ich hätte gern eine Hin- und Rückfahrt.",
        "exampleEn": "I would like a round trip.",
        "variants": [
          "die Hin- und Rueckfahrt",
          "Ich haette gern eine Hin- und Rueckfahrt."
        ]
      },
      {
        "id": "a1pt-gleis",
        "de": "das Gleis, die Gleise",
        "en": "track",
        "bundle": "das Gleis · die Gleise · von Gleis 4",
        "example": "Der Zug fährt von Gleis 4 ab.",
        "exampleEn": "The train departs from track 4.",
        "variants": [
          "Der Zug faehrt von Gleis 4 ab."
        ]
      },
      {
        "id": "a1pt-bahnsteig",
        "de": "der Bahnsteig, die Bahnsteige",
        "en": "platform",
        "bundle": "der Bahnsteig · die Bahnsteige",
        "example": "Der Bahnsteig ist links.",
        "exampleEn": "The platform is on the left.",
        "variants": []
      },
      {
        "id": "a1pt-fahrplan",
        "de": "der Fahrplan, die Fahrpläne",
        "en": "timetable",
        "bundle": "der Fahrplan · die Fahrpläne",
        "example": "Die Verbindung steht im Fahrplan.",
        "exampleEn": "The connection is in the timetable.",
        "variants": [
          "der Fahrplan, die Fahrplaene"
        ]
      },
      {
        "id": "a1pt-abfahrt",
        "de": "die Abfahrt, die Abfahrten",
        "en": "departure",
        "bundle": "die Abfahrt · die Abfahrten",
        "example": "Die Abfahrt ist um 8:20 Uhr.",
        "exampleEn": "Departure is at 8:20.",
        "variants": []
      },
      {
        "id": "a1pt-einsteigen",
        "de": "einsteigen",
        "en": "to board / get on",
        "bundle": "einsteigen · ich steige ein",
        "example": "Ich steige in Köln ein.",
        "exampleEn": "I board in Cologne.",
        "variants": [
          "Ich steige in Koeln ein."
        ]
      },
      {
        "id": "a1pt-aussteigen",
        "de": "aussteigen",
        "en": "to get off",
        "bundle": "aussteigen · ich steige aus",
        "example": "Ich steige am Hauptbahnhof aus.",
        "exampleEn": "I get off at the main station.",
        "variants": []
      },
      {
        "id": "a1pt-umsteigen",
        "de": "umsteigen",
        "en": "to change trains",
        "bundle": "umsteigen · ich steige um",
        "example": "Ich steige in Bonn um.",
        "exampleEn": "I change trains in Bonn.",
        "variants": []
      },
      {
        "id": "a1pt-verspaetung",
        "de": "die Verspätung, die Verspätungen",
        "en": "delay",
        "bundle": "die Verspätung · zwanzig Minuten Verspätung",
        "example": "Der Zug hat zwanzig Minuten Verspätung.",
        "exampleEn": "The train is twenty minutes late.",
        "variants": [
          "die Verspaetung",
          "Der Zug hat zwanzig Minuten Verspaetung."
        ]
      },
      {
        "id": "a1pt-ankommen",
        "de": "ankommen",
        "en": "to arrive",
        "bundle": "ankommen · der Zug kommt an",
        "example": "Der Zug kommt um zehn Uhr an.",
        "exampleEn": "The train arrives at ten.",
        "variants": []
      },
      {
        "id": "a1pt-automat",
        "de": "der Fahrkartenautomat, die Fahrkartenautomaten",
        "en": "ticket machine",
        "bundle": "der Fahrkartenautomat · die Fahrkartenautomaten",
        "example": "Die Fahrkarte gibt es am Automaten.",
        "exampleEn": "The ticket is available from the machine.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1pt-verbindung",
        "de": "die Verbindung, die Verbindungen",
        "en": "connection",
        "bundle": "die Verbindung · die Verbindungen",
        "example": "Gibt es eine direkte Verbindung?",
        "exampleEn": "Is there a direct connection?",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1pt-schalter",
        "de": "der Schalter, die Schalter",
        "en": "service counter",
        "bundle": "der Schalter · die Schalter",
        "example": "Der Schalter ist in der Bahnhofshalle.",
        "exampleEn": "The counter is in the station hall.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1pt-entwerten",
        "de": "entwerten",
        "en": "to validate a ticket",
        "bundle": "entwerten · die Fahrkarte entwerten",
        "example": "Muss ich die Fahrkarte entwerten?",
        "exampleEn": "Do I have to validate the ticket?",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1pt-richtung",
        "de": "die Richtung, die Richtungen",
        "en": "direction",
        "bundle": "die Richtung · Richtung Zentrum",
        "example": "Die Bahn fährt Richtung Zentrum.",
        "exampleEn": "The tram goes toward the city center.",
        "variants": [
          "Die Bahn faehrt Richtung Zentrum."
        ],
        "supplemental": true
      },
      {
        "id": "a1pt-haltestelle",
        "de": "die Haltestelle, die Haltestellen",
        "en": "stop",
        "bundle": "die Haltestelle · die Haltestellen",
        "example": "Die nächste Haltestelle ist Rathaus.",
        "exampleEn": "The next stop is City Hall.",
        "variants": [
          "Die naechste Haltestelle ist Rathaus."
        ],
        "supplemental": true
      },
      {
        "id": "a1pt-anschluss",
        "de": "der Anschluss, die Anschlüsse",
        "en": "connecting service",
        "bundle": "der Anschluss · die Anschlüsse",
        "example": "Erreiche ich den Anschluss?",
        "exampleEn": "Will I make the connection?",
        "variants": [
          "der Anschluss, die Anschluesse"
        ],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "a1pt-q1",
        "type": "TICKET REQUEST",
        "context": "You need a ticket to Cologne.",
        "prompt": "Ask for the ticket politely.",
        "answers": [
          "Ich hätte gern eine Fahrkarte nach Köln.",
          "Ich haette gern eine Fahrkarte nach Koeln."
        ],
        "explanation": "Ich hätte gern makes the request polite, and nach introduces the city.",
        "requires": [
          "a1pt-fahrkarte"
        ],
        "wordBank": [
          "Ich",
          "hätte",
          "gern",
          "eine",
          "Fahrkarte",
          "nach",
          "Köln."
        ]
      },
      {
        "id": "a1pt-q2",
        "type": "TICKET TYPE",
        "context": "You will travel to Bonn and come back.",
        "prompt": "Ask for a round trip to Bonn.",
        "answers": [
          "Ich hätte gern eine Hin- und Rückfahrt nach Bonn.",
          "Ich haette gern eine Hin- und Rueckfahrt nach Bonn."
        ],
        "explanation": "Hin- und Rückfahrt names both parts of the journey.",
        "requires": [
          "a1pt-rueckfahrt"
        ],
        "wordBank": [
          "Ich",
          "hätte",
          "gern",
          "eine",
          "Hin-",
          "und",
          "Rückfahrt",
          "nach",
          "Bonn."
        ]
      },
      {
        "id": "a1pt-q3",
        "type": "STATION QUESTION",
        "context": "You cannot find the departure track.",
        "prompt": "Ask which track the train leaves from.",
        "answers": [
          "Von welchem Gleis fährt der Zug ab?",
          "Von welchem Gleis faehrt der Zug ab?"
        ],
        "explanation": "Von welchem Gleis asks for the track, and ab closes the question.",
        "requires": [
          "a1pt-gleis",
          "a1pt-abfahrt"
        ],
        "wordBank": [
          "Von",
          "welchem",
          "Gleis",
          "fährt",
          "der",
          "Zug",
          "ab?"
        ]
      },
      {
        "id": "a1pt-q4",
        "type": "TRANSFER",
        "context": "Your connection changes in Bonn.",
        "prompt": "Say where you change trains.",
        "answers": [
          "Ich steige in Bonn um."
        ],
        "explanation": "Umsteigen splits into steige and um in the statement.",
        "requires": [
          "a1pt-umsteigen"
        ],
        "wordBank": [
          "Ich",
          "steige",
          "in",
          "Bonn",
          "um."
        ]
      },
      {
        "id": "a1pt-q5",
        "type": "DELAY",
        "context": "The train is twenty minutes late.",
        "prompt": "Report the delay.",
        "answers": [
          "Der Zug hat zwanzig Minuten Verspätung.",
          "Der Zug hat zwanzig Minuten Verspaetung.",
          "Der Zug hat 20 Minuten Verspätung.",
          "Der Zug hat 20 Minuten Verspaetung."
        ],
        "explanation": "The common pattern is hat plus the number of minutes plus Verspätung.",
        "requires": [
          "a1pt-verspaetung"
        ],
        "wordBank": [
          "Der",
          "Zug",
          "hat",
          "zwanzig",
          "Minuten",
          "Verspätung."
        ]
      },
      {
        "id": "a1pt-q6",
        "type": "ARRIVAL",
        "context": "The train arrives at 10:00.",
        "prompt": "Write the arrival sentence.",
        "answers": [
          "Der Zug kommt um zehn Uhr an.",
          "Der Zug kommt um 10 Uhr an."
        ],
        "explanation": "Ankommen splits into kommt and an.",
        "requires": [
          "a1pt-ankommen"
        ],
        "wordBank": [
          "Der",
          "Zug",
          "kommt",
          "um",
          "zehn",
          "Uhr",
          "an."
        ]
      },
      {
        "id": "a1pt-q7",
        "type": "JOURNEY",
        "context": "You board in Bonn and leave the train at Cologne Central Station.",
        "prompt": "Write both actions in one sentence with und.",
        "answers": [
          "Ich steige in Bonn ein und in Köln am Hauptbahnhof aus.",
          "Ich steige in Bonn ein und in Koeln am Hauptbahnhof aus."
        ],
        "explanation": "Ein and aus close their parts of the sentence.",
        "requires": [
          "a1pt-einsteigen",
          "a1pt-aussteigen"
        ],
        "wordBank": [
          "Ich",
          "steige",
          "in",
          "Bonn",
          "ein",
          "und",
          "in",
          "Köln",
          "am",
          "Hauptbahnhof",
          "aus."
        ]
      }
    ],
    "input": {
      "script": "Achtung an Gleis sieben. Der Zug nach München hat zwanzig Minuten Verspätung. Die Abfahrt ist um 10:40 Uhr. Reisende nach Augsburg steigen bitte in Ulm um.",
      "listenPrompt": "Wo steigen Reisende nach Augsburg um?",
      "listenAnswers": [
        "Sie steigen in Ulm um.",
        "In Ulm.",
        "Reisende nach Augsburg steigen in Ulm um."
      ],
      "passage": "VERBINDUNG BONN NACH KÖLN. Abfahrt: 8:20 Uhr, Gleis 4. Umsteigen: nein. Ankunft: 8:52 Uhr, Gleis 7. Der Zug hat heute fünf Minuten Verspätung.",
      "readPrompt": "Wann und von welchem Gleis fährt der Zug in Bonn ab?",
      "readAnswers": [
        "Der Zug fährt um 8:20 Uhr von Gleis 4 ab.",
        "Um 8:20 Uhr von Gleis 4.",
        "8:20 Uhr, Gleis 4."
      ]
    },
    "task": {
      "writingPrompt": "Write a complete ticket-counter exchange. Ask for a destination and ticket type, ask the price, ask for the track, ask whether you must change, and close politely.",
      "minWords": 38,
      "guide": [
        "Use Ich hätte gern",
        "Use nach with the destination",
        "Use Von welchem Gleis in the track question",
        "Use umsteigen in one question"
      ],
      "required": [
        "Fahrkarte",
        "nach",
        "kostet",
        "Gleis",
        "umsteigen",
        "bitte"
      ],
      "model": "Guten Tag. Ich hätte gern eine Hin- und Rückfahrt von Bonn nach Köln, bitte. Was kostet die Fahrkarte? Wann fährt der nächste Zug ab? Von welchem Gleis fährt der Zug ab? Muss ich umsteigen, oder ist die Verbindung direkt? Vielen Dank für Ihre Hilfe. Auf Wiedersehen.",
      "speakingPrompt": "Handle a changed journey after hearing a delay announcement.",
      "speakingGuide": [
        "Repeat the destination",
        "State the delay",
        "Ask for the track",
        "Ask where to change",
        "Confirm the arrival time"
      ],
      "speakingRequired": [
        "Verspätung",
        "Gleis",
        "umsteigen",
        "kommt"
      ],
      "speakingModel": "Der Zug nach München hat zwanzig Minuten Verspätung. Von welchem Gleis fährt er ab? Wo muss ich umsteigen? Wann kommt der Zug an?"
    },
    "culture": {
      "title": "Check the live departure information",
      "body": "Departure tracks and delay estimates can change. Deutsche Bahn provides live journey information, and station displays show current track details.",
      "sourceTitle": "Deutsche Bahn: Current train information",
      "url": "https://int.bahn.de/en/booking-information/timetable-information/current-information",
      "tags": [
        "das Gleis",
        "die Verspätung",
        "die Abfahrt"
      ]
    },
    "prerequisite": "a1-health-past-checkpoint"
  },
  {
    "id": "a1-restaurant-needs-payment",
    "level": "A1",
    "code": "A1.9",
    "title": "A meal that works for you",
    "subtitle": "Order clearly, ask about ingredients, and pay the bill.",
    "canDo": [
      "Ask for a menu and order a drink and dish",
      "Ask whether food is vegetarian or vegan",
      "State a simple allergy or request an item without one ingredient",
      "Ask for the bill and say how the group will pay"
    ],
    "grammar": [
      {
        "title": "Order with hätte gern",
        "rule": "Use Ich hätte gern followed by the thing you want.",
        "example": "Ich hätte gern das vegetarische Gericht.",
        "translation": "I would like the vegetarian dish."
      },
      {
        "title": "Polite service questions",
        "rule": "Könnte ich begins a polite request. The action goes at the end.",
        "example": "Könnte ich die Speisekarte bekommen?",
        "translation": "Could I have the menu?"
      },
      {
        "title": "Leave one ingredient out",
        "rule": "Use ohne directly before the ingredient.",
        "example": "Das Gericht bitte ohne Käse.",
        "translation": "The dish without cheese, please."
      },
      {
        "title": "Pay together or separately",
        "rule": "Use Wir möchten followed by zusammen bezahlen or getrennt bezahlen.",
        "example": "Wir möchten getrennt bezahlen.",
        "translation": "We would like to pay separately."
      }
    ],
    "words": [
      {
        "id": "a1rn-speisekarte",
        "de": "die Speisekarte, die Speisekarten",
        "en": "menu",
        "bundle": "die Speisekarte · die Speisekarten",
        "example": "Könnte ich die Speisekarte bekommen?",
        "exampleEn": "Could I have the menu?",
        "variants": [
          "Koennte ich die Speisekarte bekommen?"
        ]
      },
      {
        "id": "a1rn-getraenk",
        "de": "das Getränk, die Getränke",
        "en": "drink",
        "bundle": "das Getränk · die Getränke",
        "example": "Welches Getränk möchten Sie?",
        "exampleEn": "Which drink would you like?",
        "variants": [
          "das Getraenk, die Getraenke",
          "Welches Getraenk moechten Sie?"
        ]
      },
      {
        "id": "a1rn-gericht",
        "de": "das Gericht, die Gerichte",
        "en": "dish",
        "bundle": "das Gericht · die Gerichte",
        "example": "Das Gericht ist vegetarisch.",
        "exampleEn": "The dish is vegetarian.",
        "variants": []
      },
      {
        "id": "a1rn-bestellung",
        "de": "die Bestellung, die Bestellungen",
        "en": "order (noun)",
        "bundle": "die Bestellung · die Bestellungen",
        "example": "Die Bestellung ist komplett.",
        "exampleEn": "The order is complete.",
        "variants": [],
        "recall": {
          "enAnswers": ["order", "order (noun)"]
        }
      },
      {
        "id": "a1rn-rechnung",
        "de": "die Rechnung, die Rechnungen",
        "en": "bill",
        "bundle": "die Rechnung · die Rechnungen",
        "example": "Die Rechnung, bitte.",
        "exampleEn": "The bill, please.",
        "variants": []
      },
      {
        "id": "a1rn-vegetarisch",
        "de": "vegetarisch",
        "en": "vegetarian",
        "bundle": "vegetarisch · ein vegetarisches Gericht",
        "example": "Ist das Gericht vegetarisch?",
        "exampleEn": "Is the dish vegetarian?",
        "variants": []
      },
      {
        "id": "a1rn-vegan",
        "de": "vegan",
        "en": "vegan",
        "bundle": "vegan · ein veganes Gericht",
        "example": "Haben Sie ein veganes Gericht?",
        "exampleEn": "Do you have a vegan dish?",
        "variants": []
      },
      {
        "id": "a1rn-allergie",
        "de": "die Allergie, die Allergien",
        "en": "allergy",
        "bundle": "die Allergie · die Allergien · eine Allergie gegen",
        "example": "Ich habe eine Allergie gegen Nüsse.",
        "exampleEn": "I have an allergy to nuts.",
        "variants": [
          "Ich habe eine Allergie gegen Nuesse."
        ]
      },
      {
        "id": "a1rn-empfehlen",
        "de": "empfehlen",
        "en": "to recommend",
        "bundle": "empfehlen · Sie empfehlen",
        "example": "Was können Sie empfehlen?",
        "exampleEn": "What can you recommend?",
        "variants": [
          "Was koennen Sie empfehlen?"
        ]
      },
      {
        "id": "a1rn-bestellen",
        "de": "bestellen",
        "en": "to order",
        "bundle": "bestellen · ich bestelle",
        "example": "Ich bestelle das Tagesgericht.",
        "exampleEn": "I am ordering the daily special.",
        "variants": []
      },
      {
        "id": "a1rn-bezahlen",
        "de": "bezahlen",
        "en": "to pay",
        "bundle": "bezahlen · ich bezahle · wir bezahlen",
        "example": "Wir möchten bezahlen.",
        "exampleEn": "We would like to pay.",
        "variants": [
          "Wir moechten bezahlen."
        ]
      },
      {
        "id": "a1rn-getrennt",
        "de": "getrennt",
        "en": "separately",
        "bundle": "getrennt · getrennt bezahlen",
        "example": "Wir möchten getrennt bezahlen.",
        "exampleEn": "We would like to pay separately.",
        "variants": [
          "Wir moechten getrennt bezahlen."
        ]
      },
      {
        "id": "a1rn-vorspeise",
        "de": "die Vorspeise, die Vorspeisen",
        "en": "starter",
        "bundle": "die Vorspeise · die Vorspeisen",
        "example": "Als Vorspeise nehme ich die Suppe.",
        "exampleEn": "I will have the soup as a starter.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1rn-hauptgericht",
        "de": "das Hauptgericht, die Hauptgerichte",
        "en": "main course",
        "bundle": "das Hauptgericht · die Hauptgerichte",
        "example": "Das Hauptgericht kommt gleich.",
        "exampleEn": "The main course is coming shortly.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1rn-nachtisch",
        "de": "der Nachtisch, die Nachtische",
        "en": "dessert",
        "bundle": "der Nachtisch · die Nachtische",
        "example": "Möchten Sie einen Nachtisch?",
        "exampleEn": "Would you like a dessert?",
        "variants": [
          "Moechten Sie einen Nachtisch?"
        ],
        "supplemental": true
      },
      {
        "id": "a1rn-nuesse",
        "de": "die Nuss, die Nüsse",
        "en": "nut",
        "bundle": "die Nuss · die Nüsse · ohne Nüsse",
        "example": "Das Gericht bitte ohne Nüsse.",
        "exampleEn": "The dish without nuts, please.",
        "variants": [
          "die Nuss, die Nuesse",
          "Das Gericht bitte ohne Nuesse."
        ],
        "supplemental": true
      },
      {
        "id": "a1rn-ohne",
        "de": "ohne",
        "en": "without",
        "bundle": "ohne Käse · ohne Nüsse",
        "example": "Einen Kaffee ohne Milch, bitte.",
        "exampleEn": "A coffee without milk, please.",
        "variants": [
          "ohne Kaese",
          "ohne Nuesse"
        ],
        "supplemental": true
      },
      {
        "id": "a1rn-zusammen",
        "de": "zusammen",
        "en": "together",
        "bundle": "zusammen · zusammen bezahlen",
        "example": "Wir bezahlen zusammen.",
        "exampleEn": "We are paying together.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1rn-trinkgeld",
        "de": "das Trinkgeld, die Trinkgelder",
        "en": "tip",
        "bundle": "das Trinkgeld · Trinkgeld geben",
        "example": "Das Trinkgeld ist freiwillig.",
        "exampleEn": "The tip is voluntary.",
        "variants": [],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "a1rn-q1",
        "type": "POLITE REQUEST",
        "context": "You have just sat down.",
        "prompt": "Ask for the menu politely.",
        "answers": [
          "Könnte ich die Speisekarte bekommen?",
          "Koennte ich die Speisekarte bekommen?"
        ],
        "explanation": "Könnte ich opens the polite request, and bekommen goes at the end.",
        "requires": [
          "a1rn-speisekarte"
        ],
        "wordBank": [
          "Könnte",
          "ich",
          "die",
          "Speisekarte",
          "bekommen?"
        ]
      },
      {
        "id": "a1rn-q2",
        "type": "ORDER",
        "context": "You choose the vegetarian dish.",
        "prompt": "Order it with hätte gern.",
        "answers": [
          "Ich hätte gern das vegetarische Gericht.",
          "Ich haette gern das vegetarische Gericht."
        ],
        "explanation": "Das vegetarische Gericht follows the polite ordering phrase.",
        "requires": [
          "a1rn-gericht",
          "a1rn-vegetarisch"
        ],
        "wordBank": [
          "Ich",
          "hätte",
          "gern",
          "das",
          "vegetarische",
          "Gericht."
        ]
      },
      {
        "id": "a1rn-q3",
        "type": "DIETARY QUESTION",
        "context": "You need a vegan option.",
        "prompt": "Ask whether the restaurant has a vegan dish.",
        "answers": [
          "Haben Sie ein veganes Gericht?"
        ],
        "explanation": "The yes or no question begins with Haben Sie.",
        "requires": [
          "a1rn-vegan",
          "a1rn-gericht"
        ],
        "wordBank": [
          "Haben",
          "Sie",
          "ein",
          "veganes",
          "Gericht?"
        ]
      },
      {
        "id": "a1rn-q4",
        "type": "ALLERGY",
        "context": "You are allergic to nuts.",
        "prompt": "State the allergy clearly.",
        "answers": [
          "Ich habe eine Allergie gegen Nüsse.",
          "Ich habe eine Allergie gegen Nuesse."
        ],
        "explanation": "Eine Allergie gegen introduces the allergen.",
        "requires": [
          "a1rn-allergie"
        ],
        "wordBank": [
          "Ich",
          "habe",
          "eine",
          "Allergie",
          "gegen",
          "Nüsse."
        ]
      },
      {
        "id": "a1rn-q5",
        "type": "INGREDIENT REQUEST",
        "context": "You want the dish without cheese.",
        "prompt": "Make the short request.",
        "answers": [
          "Das Gericht bitte ohne Käse.",
          "Das Gericht bitte ohne Kaese.",
          "Das Gericht ohne Käse, bitte.",
          "Das Gericht ohne Kaese, bitte."
        ],
        "explanation": "Ohne goes directly before the ingredient.",
        "requires": [
          "a1rn-gericht"
        ],
        "wordBank": [
          "Das",
          "Gericht",
          "bitte",
          "ohne",
          "Käse."
        ]
      },
      {
        "id": "a1rn-q6",
        "type": "RECOMMENDATION",
        "context": "You want the server's suggestion.",
        "prompt": "Ask what they can recommend.",
        "answers": [
          "Was können Sie empfehlen?",
          "Was koennen Sie empfehlen?"
        ],
        "explanation": "Was begins the question, and empfehlen goes at the end.",
        "requires": [
          "a1rn-empfehlen"
        ],
        "wordBank": [
          "Was",
          "können",
          "Sie",
          "empfehlen?"
        ]
      },
      {
        "id": "a1rn-q7",
        "type": "PAYMENT",
        "context": "Two diners will pay their own shares.",
        "prompt": "Say that you would like to pay separately.",
        "answers": [
          "Wir möchten getrennt bezahlen.",
          "Wir moechten getrennt bezahlen."
        ],
        "explanation": "Getrennt bezahlen is the useful payment phrase.",
        "requires": [
          "a1rn-bezahlen",
          "a1rn-getrennt"
        ],
        "wordBank": [
          "Wir",
          "möchten",
          "getrennt",
          "bezahlen."
        ]
      }
    ],
    "input": {
      "script": "Guten Abend. Was möchten Sie bestellen? Ich hätte gern das vegetarische Gericht und ein Wasser. Haben Sie eine Allergie? Ja, gegen Nüsse. Danke. Ich frage in der Küche nach.",
      "listenPrompt": "Welche Allergie hat der Gast?",
      "listenAnswers": [
        "Der Gast hat eine Allergie gegen Nüsse.",
        "Gegen Nüsse.",
        "Eine Allergie gegen Nüsse."
      ],
      "passage": "BESTELLUNG: ein veganes Hauptgericht, eine Apfelschorle, ein Kaffee ohne Milch. Das Hauptgericht kostet 14 Euro. Die Getränke kosten zusammen 7 Euro. Rechnung: 21 Euro.",
      "readPrompt": "Wie viel kostet die Bestellung zusammen?",
      "readAnswers": [
        "Die Bestellung kostet zusammen 21 Euro.",
        "Sie kostet 21 Euro.",
        "21 Euro."
      ]
    },
    "task": {
      "writingPrompt": "Write a complete restaurant exchange. Ask for the menu, order one drink and one dish, state one dietary need, ask for a recommendation, ask for the bill, and choose together or separate payment.",
      "minWords": 48,
      "guide": [
        "Use one Könnte ich request",
        "Use Ich hätte gern for the order",
        "State the dietary need directly",
        "End with a payment choice"
      ],
      "required": [
        "Speisekarte",
        "hätte",
        "Gericht",
        "Allergie",
        "empfehlen",
        "Rechnung",
        "bezahlen"
      ],
      "model": "Guten Abend. Könnte ich bitte die Speisekarte bekommen? Ich hätte gern ein Mineralwasser und das vegetarische Gericht. Ich habe eine Allergie gegen Nüsse. Ist das Gericht ohne Nüsse? Was können Sie sonst empfehlen? Danke, dann bestelle ich das vegetarische Gericht. Könnte ich außerdem einen Kaffee ohne Milch bekommen? Die Rechnung, bitte. Wir möchten getrennt bezahlen. Vielen Dank.",
      "speakingPrompt": "Rehearse a complete restaurant order.",
      "speakingGuide": [
        "Ask for the menu",
        "Order a drink",
        "Order a dish",
        "State an allergy or ingredient request",
        "Ask for the bill",
        "Choose the payment method"
      ],
      "speakingRequired": [
        "hätte",
        "Gericht",
        "ohne",
        "Rechnung",
        "bezahlen"
      ],
      "speakingModel": "Könnte ich die Speisekarte bekommen? Ich hätte gern ein Wasser und das vegane Gericht ohne Nüsse. Die Rechnung, bitte. Wir möchten zusammen bezahlen."
    },
    "culture": {
      "title": "Tipping is a choice",
      "body": "In Germany, a restaurant tip is voluntary. Customers often state the final amount they want charged when paying directly to the server.",
      "sourceTitle": "Verbraucherzentrale: Tipping guidance",
      "url": "https://www.verbraucherzentrale.de/wissen/vertraege-reklamation/kundenrechte/trinkgeld-was-ist-ueblich-39152",
      "tags": [
        "das Trinkgeld",
        "bezahlen",
        "die Rechnung"
      ]
    },
    "prerequisite": "a1-public-transport-tickets"
  },
  {
    "id": "a1-clothing-fit-returns",
    "level": "A1",
    "code": "A1.10",
    "title": "Find the right size",
    "subtitle": "Try on clothing, describe the fit, and request an exchange.",
    "canDo": [
      "Ask for a clothing item in a color and size",
      "Find and use a fitting room",
      "Say whether an item fits or is too large or small",
      "Ask to exchange an item and present a receipt"
    ],
    "grammar": [
      {
        "title": "Ask for an item",
        "rule": "Use Ich suche with accusative forms: einen for a masculine item, eine for a feminine item, and ein for a neuter item.",
        "example": "Ich suche einen blauen Pullover.",
        "translation": "I am looking for a blue sweater."
      },
      {
        "title": "Color before a noun",
        "rule": "After einen, a color adjective ends in -en. After eine, it also ends in -e in this pattern.",
        "example": "einen blauen Pullover · eine schwarze Hose",
        "translation": "a blue sweater · black trousers"
      },
      {
        "title": "Passen with mir",
        "rule": "Use passt mir for one item and passen mir for plural items.",
        "example": "Die Hose passt mir. Die Schuhe passen mir.",
        "translation": "The trousers fit me. The shoes fit me."
      },
      {
        "title": "Separable shopping verbs",
        "rule": "Anprobieren and umtauschen split in statements. Their prefixes move to the end.",
        "example": "Ich probiere die Jacke an. Ich tausche die Hose um.",
        "translation": "I try on the jacket. I exchange the trousers."
      }
    ],
    "words": [
      {
        "id": "a1cs-pullover",
        "de": "der Pullover, die Pullover",
        "en": "sweater",
        "bundle": "der Pullover · die Pullover",
        "example": "Ich suche einen blauen Pullover.",
        "exampleEn": "I am looking for a blue sweater.",
        "variants": []
      },
      {
        "id": "a1cs-hose",
        "de": "die Hose, die Hosen",
        "en": "trousers / pants",
        "bundle": "die Hose · die Hosen",
        "example": "Die Hose ist zu groß.",
        "exampleEn": "The trousers are too large.",
        "variants": [
          "Die Hose ist zu gross."
        ]
      },
      {
        "id": "a1cs-schuhe",
        "de": "der Schuh, die Schuhe",
        "en": "shoe",
        "bundle": "der Schuh · die Schuhe",
        "example": "Die Schuhe sind zu klein.",
        "exampleEn": "The shoes are too small.",
        "variants": []
      },
      {
        "id": "a1cs-groesse",
        "de": "die Größe, die Größen",
        "en": "size",
        "bundle": "die Größe · die Größen · in Größe 40",
        "example": "Haben Sie die Hose in Größe 40?",
        "exampleEn": "Do you have the trousers in size 40?",
        "variants": [
          "die Groesse, die Groessen",
          "in Groesse 40"
        ]
      },
      {
        "id": "a1cs-umkleidekabine",
        "de": "die Umkleidekabine, die Umkleidekabinen",
        "en": "fitting room",
        "bundle": "die Umkleidekabine · die Umkleidekabinen",
        "example": "Wo ist die Umkleidekabine?",
        "exampleEn": "Where is the fitting room?",
        "variants": []
      },
      {
        "id": "a1cs-kassenbon",
        "de": "der Kassenbon, die Kassenbons",
        "en": "receipt",
        "bundle": "der Kassenbon · die Kassenbons",
        "example": "Hier ist der Kassenbon.",
        "exampleEn": "Here is the receipt.",
        "variants": []
      },
      {
        "id": "a1cs-rueckgabe",
        "de": "die Rückgabe, die Rückgaben",
        "en": "return",
        "bundle": "die Rückgabe · die Rückgaben",
        "example": "Sie können die Ware am Schalter zurückgeben.",
        "exampleEn": "You can return the item at the counter.",
        "variants": [
          "die Rueckgabe, die Rueckgaben"
        ]
      },
      {
        "id": "a1cs-passen",
        "de": "passen",
        "en": "to fit",
        "bundle": "passen · die Hose passt mir · die Schuhe passen mir",
        "example": "Der Pullover passt mir gut.",
        "exampleEn": "The sweater fits me well.",
        "variants": []
      },
      {
        "id": "a1cs-anprobieren",
        "de": "anprobieren",
        "en": "to try on",
        "bundle": "anprobieren · ich probiere an",
        "example": "Kann ich den Pullover anprobieren?",
        "exampleEn": "Can I try on the sweater?",
        "variants": []
      },
      {
        "id": "a1cs-umtauschen",
        "de": "umtauschen",
        "en": "to exchange",
        "bundle": "umtauschen · ich tausche um",
        "example": "Ich möchte die Hose umtauschen.",
        "exampleEn": "I would like to exchange the trousers.",
        "variants": [
          "Ich moechte die Hose umtauschen."
        ]
      },
      {
        "id": "a1cs-zu-gross",
        "de": "zu groß",
        "en": "too large",
        "bundle": "zu groß · viel zu groß",
        "example": "Der Pullover ist zu groß.",
        "exampleEn": "The sweater is too large.",
        "variants": [
          "zu gross",
          "Der Pullover ist zu gross."
        ]
      },
      {
        "id": "a1cs-zu-klein",
        "de": "zu klein",
        "en": "too small",
        "bundle": "zu klein · etwas zu klein",
        "example": "Die Schuhe sind zu klein.",
        "exampleEn": "The shoes are too small.",
        "variants": []
      },
      {
        "id": "a1cs-jacke",
        "de": "die Jacke, die Jacken",
        "en": "jacket",
        "bundle": "die Jacke · die Jacken",
        "example": "Ich probiere die Jacke an.",
        "exampleEn": "I try on the jacket.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1cs-hemd",
        "de": "das Hemd, die Hemden",
        "en": "shirt",
        "bundle": "das Hemd · die Hemden",
        "example": "Das Hemd passt gut.",
        "exampleEn": "The shirt fits well.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1cs-kleid",
        "de": "das Kleid, die Kleider",
        "en": "dress",
        "bundle": "das Kleid · die Kleider",
        "example": "Das Kleid ist im Angebot.",
        "exampleEn": "The dress is on sale.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1cs-farbe",
        "de": "die Farbe, die Farben",
        "en": "color",
        "bundle": "die Farbe · die Farben",
        "example": "Haben Sie eine andere Farbe?",
        "exampleEn": "Do you have another color?",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1cs-bar",
        "de": "bar",
        "en": "in cash",
        "bundle": "bar · bar bezahlen",
        "example": "Ich bezahle bar.",
        "exampleEn": "I am paying in cash.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1cs-mit-karte",
        "de": "mit Karte",
        "en": "by card",
        "bundle": "mit Karte · mit Karte bezahlen",
        "example": "Kann ich mit Karte bezahlen?",
        "exampleEn": "Can I pay by card?",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1cs-im-angebot",
        "de": "im Angebot",
        "en": "on sale",
        "bundle": "im Angebot · heute im Angebot",
        "example": "Der Pullover ist heute im Angebot.",
        "exampleEn": "The sweater is on sale today.",
        "variants": [],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "a1cs-q1",
        "type": "PRODUCT REQUEST",
        "context": "You want a blue sweater.",
        "prompt": "Say what you are looking for.",
        "answers": [
          "Ich suche einen blauen Pullover."
        ],
        "explanation": "Pullover is masculine, so the phrase uses einen blauen.",
        "requires": [
          "a1cs-pullover"
        ],
        "wordBank": [
          "Ich",
          "suche",
          "einen",
          "blauen",
          "Pullover."
        ]
      },
      {
        "id": "a1cs-q2",
        "type": "SIZE REQUEST",
        "context": "You need the trousers in size 40.",
        "prompt": "Ask whether the store has them.",
        "answers": [
          "Haben Sie die Hose in Größe 40?",
          "Haben Sie die Hose in Groesse 40?"
        ],
        "explanation": "In Größe followed by the number gives the requested size.",
        "requires": [
          "a1cs-hose",
          "a1cs-groesse"
        ],
        "wordBank": [
          "Haben",
          "Sie",
          "die",
          "Hose",
          "in",
          "Größe",
          "40?"
        ]
      },
      {
        "id": "a1cs-q3",
        "type": "STORE QUESTION",
        "context": "You want to try on an item.",
        "prompt": "Ask where the fitting room is.",
        "answers": [
          "Wo ist die Umkleidekabine?"
        ],
        "explanation": "Wo asks for the location.",
        "requires": [
          "a1cs-umkleidekabine"
        ],
        "wordBank": [
          "Wo",
          "ist",
          "die",
          "Umkleidekabine?"
        ]
      },
      {
        "id": "a1cs-q4",
        "type": "TRY ON",
        "context": "You want to try on the sweater.",
        "prompt": "Ask for permission.",
        "answers": [
          "Kann ich den Pullover anprobieren?"
        ],
        "explanation": "After Kann ich, the infinitive anprobieren stays together at the end.",
        "requires": [
          "a1cs-pullover",
          "a1cs-anprobieren"
        ],
        "wordBank": [
          "Kann",
          "ich",
          "den",
          "Pullover",
          "anprobieren?"
        ]
      },
      {
        "id": "a1cs-q5",
        "type": "FIT",
        "context": "The shoes are too small.",
        "prompt": "Describe the problem.",
        "answers": [
          "Die Schuhe sind zu klein."
        ],
        "explanation": "Plural Schuhe uses sind.",
        "requires": [
          "a1cs-schuhe",
          "a1cs-zu-klein"
        ],
        "wordBank": [
          "Die",
          "Schuhe",
          "sind",
          "zu",
          "klein."
        ]
      },
      {
        "id": "a1cs-q6",
        "type": "FIT",
        "context": "The trousers do not fit you.",
        "prompt": "Say this with passen and mir.",
        "answers": [
          "Die Hose passt mir nicht."
        ],
        "explanation": "One item uses passt, and mir identifies the person wearing it.",
        "requires": [
          "a1cs-hose",
          "a1cs-passen"
        ],
        "wordBank": [
          "Die",
          "Hose",
          "passt",
          "mir",
          "nicht."
        ]
      },
      {
        "id": "a1cs-q7",
        "type": "EXCHANGE",
        "context": "You brought the trousers and receipt back.",
        "prompt": "Ask to exchange the trousers and mention the receipt.",
        "answers": [
          "Ich möchte die Hose umtauschen. Hier ist der Kassenbon.",
          "Ich moechte die Hose umtauschen. Hier ist der Kassenbon."
        ],
        "explanation": "Möchte plus the infinitive keeps umtauschen together at the end.",
        "requires": [
          "a1cs-hose",
          "a1cs-umtauschen",
          "a1cs-kassenbon"
        ],
        "wordBank": [
          "Ich",
          "möchte",
          "die",
          "Hose",
          "umtauschen.",
          "Hier",
          "ist",
          "der",
          "Kassenbon."
        ]
      }
    ],
    "input": {
      "script": "Guten Tag. Ich suche einen blauen Pullover in Größe M. Hier ist einer. Kann ich ihn anprobieren? Natürlich. Die Umkleidekabine ist hinten links. Danke. Der Pullover ist leider zu groß.",
      "listenPrompt": "Warum nimmt die Person den Pullover nicht?",
      "listenAnswers": [
        "Der Pullover ist zu groß.",
        "Weil der Pullover zu groß ist.",
        "Er ist zu groß."
      ],
      "passage": "KASSENBON. Pullover, Größe M: 49,90 Euro. Bezahlt mit Karte. Rückgabe mit Kassenbon bis 18. Mai. Der Pullover muss sauber sein.",
      "readPrompt": "Was braucht die Person für die Rückgabe?",
      "readAnswers": [
        "Die Person braucht den Kassenbon.",
        "Sie braucht den Kassenbon.",
        "Den Kassenbon."
      ]
    },
    "task": {
      "writingPrompt": "Write a complete store exchange. Ask for a blue sweater in size M, ask to try it on, say it does not fit because it is too large, and ask for size S.",
      "minWords": 42,
      "guide": [
        "Use Ich suche",
        "Include blau and Größe M",
        "Use anprobieren",
        "Use passt and zu groß",
        "Ask for Größe S"
      ],
      "required": [
        "suche",
        "blauen",
        "Pullover",
        "Größe M",
        "anprobieren",
        "passt",
        "zu groß",
        "Größe S"
      ],
      "model": "Guten Tag. Ich suche einen blauen Pullover in Größe M. Kann ich diesen Pullover anprobieren? Ja, die Umkleidekabine ist hinten links. Danke. Der Pullover passt mir leider nicht. Er ist zu groß. Haben Sie den blauen Pullover auch in Größe S? Ich möchte Größe S anprobieren.",
      "speakingPrompt": "Handle a return at a store counter.",
      "speakingGuide": [
        "Name the item",
        "Describe the fit problem",
        "Say that you want an exchange",
        "Present the receipt",
        "Ask for a different size"
      ],
      "speakingRequired": [
        "zu",
        "umtauschen",
        "Kassenbon",
        "Größe"
      ],
      "speakingModel": "Guten Tag. Die Hose ist zu klein. Ich möchte sie umtauschen. Hier ist der Kassenbon. Haben Sie die Hose in Größe 40?"
    },
    "culture": {
      "title": "Return rights depend on how you bought the item",
      "body": "EU consumers generally have a 14-day withdrawal period for many online purchases. A simple change of mind after an in-store purchase follows the retailer's return policy. Defective goods have separate legal protections.",
      "sourceTitle": "Your Europe: Guarantees and returns",
      "url": "https://europa.eu/youreurope/citizens/consumers/shopping/guarantees-returns/index_en.htm",
      "tags": [
        "die Rückgabe",
        "der Kassenbon",
        "online einkaufen"
      ]
    },
    "prerequisite": "a1-restaurant-needs-payment"
  },
  {
    "id": "a1-pharmacy-doctor-basics",
    "level": "A1",
    "code": "A1.11",
    "title": "At the pharmacy and doctor",
    "subtitle": "Describe symptoms, duration, allergies, and medicine instructions.",
    "canDo": [
      "Name common symptoms and say how long they have lasted",
      "Ask for help at a pharmacy",
      "Understand a simple dosage instruction",
      "State an allergy and ask whether a prescription is needed"
    ],
    "grammar": [
      {
        "title": "Symptoms with haben",
        "rule": "Use Ich habe with symptom words such as Kopfschmerzen, Husten, and Fieber.",
        "example": "Ich habe Kopfschmerzen und Husten.",
        "translation": "I have a headache and a cough."
      },
      {
        "title": "Pain with wehtun",
        "rule": "Use tut weh with one body part. The body part begins the sentence.",
        "example": "Mein Hals tut weh.",
        "translation": "My throat hurts."
      },
      {
        "title": "Duration with seit",
        "rule": "Use seit with the length of time and keep the verb in the present tense.",
        "example": "Ich habe seit zwei Tagen Fieber.",
        "translation": "I have had a fever for two days."
      },
      {
        "title": "Medicine instructions",
        "rule": "After soll, the action goes at the end as an infinitive.",
        "example": "Wie oft soll ich die Tablette einnehmen?",
        "translation": "How often should I take the tablet?"
      }
    ],
    "words": [
      {
        "id": "a1pd-kopfschmerzen",
        "de": "die Kopfschmerzen",
        "en": "headache",
        "bundle": "die Kopfschmerzen · Kopfschmerzen haben",
        "example": "Ich habe Kopfschmerzen.",
        "exampleEn": "I have a headache.",
        "variants": []
      },
      {
        "id": "a1pd-halsschmerzen",
        "de": "die Halsschmerzen",
        "en": "sore throat",
        "bundle": "die Halsschmerzen · Halsschmerzen haben",
        "example": "Ich habe Halsschmerzen.",
        "exampleEn": "I have a sore throat.",
        "variants": []
      },
      {
        "id": "a1pd-husten",
        "de": "der Husten",
        "en": "cough",
        "bundle": "der Husten · Husten haben",
        "example": "Ich habe starken Husten.",
        "exampleEn": "I have a bad cough.",
        "variants": []
      },
      {
        "id": "a1pd-fieber",
        "de": "das Fieber",
        "en": "fever",
        "bundle": "das Fieber · Fieber haben",
        "example": "Ich habe 39 Grad Fieber.",
        "exampleEn": "I have a temperature of 39 degrees.",
        "variants": []
      },
      {
        "id": "a1pd-apotheke",
        "de": "die Apotheke, die Apotheken",
        "en": "pharmacy",
        "bundle": "die Apotheke · die Apotheken",
        "example": "Wo ist die nächste Apotheke?",
        "exampleEn": "Where is the nearest pharmacy?",
        "variants": [
          "Wo ist die naechste Apotheke?"
        ]
      },
      {
        "id": "a1pd-medikament",
        "de": "das Medikament, die Medikamente",
        "en": "medicine",
        "bundle": "das Medikament · die Medikamente",
        "example": "Wie nehme ich das Medikament ein?",
        "exampleEn": "How do I take the medicine?",
        "variants": []
      },
      {
        "id": "a1pd-rezept",
        "de": "das Rezept, die Rezepte",
        "en": "prescription",
        "bundle": "das Rezept · die Rezepte",
        "example": "Brauche ich ein Rezept?",
        "exampleEn": "Do I need a prescription?",
        "variants": []
      },
      {
        "id": "a1pd-tablette",
        "de": "die Tablette, die Tabletten",
        "en": "tablet / pill",
        "bundle": "die Tablette · die Tabletten",
        "example": "Nehmen Sie eine Tablette.",
        "exampleEn": "Take one tablet.",
        "variants": []
      },
      {
        "id": "a1pd-einnehmen",
        "de": "einnehmen",
        "en": "to take medicine",
        "bundle": "einnehmen · ich nehme ein",
        "example": "Ich nehme das Medikament morgens ein.",
        "exampleEn": "I take the medicine in the morning.",
        "variants": []
      },
      {
        "id": "a1pd-wehtun",
        "de": "wehtun",
        "en": "to hurt",
        "bundle": "wehtun · tut weh",
        "example": "Mein Hals tut weh.",
        "exampleEn": "My throat hurts.",
        "variants": []
      },
      {
        "id": "a1pd-seit",
        "de": "seit",
        "en": "for / since",
        "bundle": "seit gestern · seit zwei Tagen",
        "example": "Ich habe seit gestern Husten.",
        "exampleEn": "I have had a cough since yesterday.",
        "variants": []
      },
      {
        "id": "a1pd-allergisch",
        "de": "allergisch gegen",
        "en": "allergic to",
        "bundle": "allergisch gegen · gegen Penicillin allergisch",
        "example": "Ich bin gegen Penicillin allergisch.",
        "exampleEn": "I am allergic to penicillin.",
        "variants": []
      },
      {
        "id": "a1pd-praxis",
        "de": "die Praxis, die Praxen",
        "en": "medical practice / doctor's office",
        "bundle": "die Praxis · die Praxen",
        "example": "Die Praxis öffnet um acht Uhr.",
        "exampleEn": "The doctor's office opens at eight.",
        "variants": [
          "Die Praxis oeffnet um acht Uhr."
        ],
        "supplemental": true
      },
      {
        "id": "a1pd-notdienst",
        "de": "der Notdienst, die Notdienste",
        "en": "on-call medical service",
        "bundle": "der Notdienst · die Notdienste",
        "example": "Der Notdienst ist erreichbar.",
        "exampleEn": "The on-call service is available.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1pd-termin",
        "de": "der Arzttermin, die Arzttermine",
        "en": "doctor's appointment",
        "bundle": "der Arzttermin · die Arzttermine",
        "example": "Ich brauche einen Arzttermin.",
        "exampleEn": "I need a doctor's appointment.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1pd-krank",
        "de": "krank",
        "en": "ill",
        "bundle": "krank · sich krank fühlen",
        "example": "Ich fühle mich krank.",
        "exampleEn": "I feel ill.",
        "variants": [
          "Ich fuehle mich krank."
        ],
        "supplemental": true
      },
      {
        "id": "a1pd-besser",
        "de": "besser",
        "en": "better",
        "bundle": "besser · Es geht mir besser.",
        "example": "Heute geht es mir besser.",
        "exampleEn": "I feel better today.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1pd-dreimal-taeglich",
        "de": "dreimal täglich",
        "en": "three times daily",
        "bundle": "einmal täglich · zweimal täglich · dreimal täglich",
        "example": "Nehmen Sie eine Tablette dreimal täglich.",
        "exampleEn": "Take one tablet three times daily.",
        "variants": [
          "dreimal taeglich"
        ],
        "supplemental": true
      },
      {
        "id": "a1pd-packungsbeilage",
        "de": "die Packungsbeilage, die Packungsbeilagen",
        "en": "patient information leaflet",
        "bundle": "die Packungsbeilage · die Packungsbeilagen",
        "example": "Lesen Sie die Packungsbeilage.",
        "exampleEn": "Read the patient information leaflet.",
        "variants": [],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "a1pd-q1",
        "type": "SYMPTOMS",
        "context": "You have a headache and a cough.",
        "prompt": "State both symptoms.",
        "answers": [
          "Ich habe Kopfschmerzen und Husten."
        ],
        "explanation": "Both symptom nouns follow Ich habe.",
        "requires": [
          "a1pd-kopfschmerzen",
          "a1pd-husten"
        ],
        "wordBank": [
          "Ich",
          "habe",
          "Kopfschmerzen",
          "und",
          "Husten."
        ]
      },
      {
        "id": "a1pd-q2",
        "type": "DURATION",
        "context": "The fever began two days ago and continues now.",
        "prompt": "Say how long you have had the fever.",
        "answers": [
          "Ich habe seit zwei Tagen Fieber."
        ],
        "explanation": "Seit zwei Tagen gives the continuing duration.",
        "requires": [
          "a1pd-fieber",
          "a1pd-seit"
        ],
        "wordBank": [
          "Ich",
          "habe",
          "seit",
          "zwei",
          "Tagen",
          "Fieber."
        ]
      },
      {
        "id": "a1pd-q3",
        "type": "PAIN",
        "context": "Your throat hurts.",
        "prompt": "Describe the pain with wehtun.",
        "answers": [
          "Mein Hals tut weh."
        ],
        "explanation": "A single body part uses tut weh.",
        "requires": [
          "a1pd-wehtun",
          "a1pd-halsschmerzen"
        ],
        "wordBank": [
          "Mein",
          "Hals",
          "tut",
          "weh."
        ]
      },
      {
        "id": "a1pd-q4",
        "type": "DOSAGE",
        "context": "You need the tablet schedule.",
        "prompt": "Ask how often you should take the tablet.",
        "answers": [
          "Wie oft soll ich die Tablette einnehmen?"
        ],
        "explanation": "Einnehmen stays together at the end after soll.",
        "requires": [
          "a1pd-tablette",
          "a1pd-einnehmen"
        ],
        "wordBank": [
          "Wie",
          "oft",
          "soll",
          "ich",
          "die",
          "Tablette",
          "einnehmen?"
        ]
      },
      {
        "id": "a1pd-q5",
        "type": "PRESCRIPTION",
        "context": "You do not know whether the medicine requires a prescription.",
        "prompt": "Ask the pharmacist.",
        "answers": [
          "Brauche ich ein Rezept?"
        ],
        "explanation": "A yes or no question begins with Brauche ich.",
        "requires": [
          "a1pd-rezept"
        ],
        "wordBank": [
          "Brauche",
          "ich",
          "ein",
          "Rezept?"
        ]
      },
      {
        "id": "a1pd-q6",
        "type": "ALLERGY",
        "context": "You are allergic to penicillin.",
        "prompt": "Tell the pharmacist clearly.",
        "answers": [
          "Ich bin gegen Penicillin allergisch."
        ],
        "explanation": "Gegen identifies the substance, and allergisch closes the statement.",
        "requires": [
          "a1pd-allergisch"
        ],
        "wordBank": [
          "Ich",
          "bin",
          "gegen",
          "Penicillin",
          "allergisch."
        ]
      },
      {
        "id": "a1pd-q7",
        "type": "PHARMACY QUESTION",
        "context": "You need to find a nearby pharmacy.",
        "prompt": "Ask where the nearest pharmacy is.",
        "answers": [
          "Wo ist die nächste Apotheke?",
          "Wo ist die naechste Apotheke?"
        ],
        "explanation": "Wo asks for the location, and nächste selects the nearest one.",
        "requires": [
          "a1pd-apotheke"
        ],
        "wordBank": [
          "Wo",
          "ist",
          "die",
          "nächste",
          "Apotheke?"
        ]
      }
    ],
    "input": {
      "script": "Guten Tag. Was fehlt Ihnen? Ich habe seit zwei Tagen Halsschmerzen und Husten. Haben Sie Fieber? Nein. Sind Sie gegen ein Medikament allergisch? Ja, gegen Penicillin.",
      "listenPrompt": "Wie lange hat die Person Halsschmerzen?",
      "listenAnswers": [
        "Seit zwei Tagen.",
        "Die Person hat seit zwei Tagen Halsschmerzen.",
        "Sie hat seit zwei Tagen Halsschmerzen."
      ],
      "passage": "MEDIKAMENT A. Eine Tablette morgens und eine Tablette abends mit Wasser einnehmen. Lesen Sie die Packungsbeilage. Bei einer Allergie gegen einen Inhaltsstoff nehmen Sie das Medikament nicht ein und fragen Sie in der Apotheke oder Praxis nach.",
      "readPrompt": "Wie oft soll man eine Tablette einnehmen?",
      "readAnswers": [
        "Zweimal täglich.",
        "Man soll zweimal täglich eine Tablette einnehmen.",
        "Morgens und abends."
      ]
    },
    "task": {
      "writingPrompt": "Write a short message to a medical practice. Give two symptoms, say how long they have lasted, state whether you have a fever, and request an appointment.",
      "minWords": 40,
      "guide": [
        "Begin with a greeting",
        "Use Ich habe for two symptoms",
        "Use seit for the duration",
        "Give a clear appointment request",
        "Close politely"
      ],
      "required": [
        "habe",
        "seit",
        "Fieber",
        "Termin"
      ],
      "model": "Guten Tag. Ich habe seit zwei Tagen Halsschmerzen und starken Husten. Seit heute habe ich auch Kopfschmerzen. Ich habe kein Fieber, aber mein Hals tut weh. Ich brauche bitte einen Arzttermin. Haben Sie morgen am Vormittag einen Termin frei? Sie können mich unter der Telefonnummer 503 erreichen. Vielen Dank.",
      "speakingPrompt": "Explain your symptoms and ask the pharmacist the questions you need.",
      "speakingGuide": [
        "Name two symptoms",
        "Give the duration",
        "State one allergy",
        "Ask about a prescription",
        "Ask how often to take the medicine"
      ],
      "speakingRequired": [
        "seit",
        "allergisch",
        "Rezept",
        "einnehmen"
      ],
      "speakingModel": "Ich habe seit zwei Tagen Kopfschmerzen und Husten. Ich bin gegen Penicillin allergisch. Brauche ich ein Rezept? Wie oft soll ich das Medikament einnehmen?"
    },
    "culture": {
      "title": "Know the two urgent numbers",
      "body": "In Germany, 116117 connects callers with the medical on-call service for urgent problems that cannot wait for normal practice hours. Call 112 for life-threatening emergencies.",
      "sourceTitle": "116117: Patient service",
      "url": "https://www.116117.de/de/index.php",
      "tags": [
        "116117",
        "112",
        "der Notdienst"
      ]
    },
    "prerequisite": "a1-clothing-fit-returns"
  },
  {
    "id": "a1-hotel-checkin-problems",
    "level": "A1",
    "code": "A1.12",
    "title": "Check in and solve a room problem",
    "subtitle": "Confirm a booking, ask about services, and report what is missing.",
    "canDo": [
      "Check in with a reservation name",
      "Ask about breakfast, the lift, and checkout time",
      "Report a missing item or broken service",
      "Request a quiet room or replacement item politely"
    ],
    "grammar": [
      {
        "title": "A reservation under a name",
        "rule": "Use eine Reservierung auf den Namen followed by the family name.",
        "example": "Ich habe eine Reservierung auf den Namen Lee.",
        "translation": "I have a reservation under the name Lee."
      },
      {
        "title": "In my room",
        "rule": "In with a fixed location uses the dative form meinem before Zimmer.",
        "example": "In meinem Zimmer fehlt ein Handtuch.",
        "translation": "A towel is missing from my room."
      },
      {
        "title": "Polite requests",
        "rule": "Könnte ich begins a polite request. Bekommen stays at the end.",
        "example": "Könnte ich ein ruhiges Zimmer bekommen?",
        "translation": "Could I have a quiet room?"
      },
      {
        "title": "Checkout with müssen",
        "rule": "After muss, auschecken stays together at the end.",
        "example": "Wann muss ich auschecken?",
        "translation": "When do I have to check out?"
      }
    ],
    "words": [
      {
        "id": "a1hc-reservierung",
        "de": "die Reservierung, die Reservierungen",
        "en": "reservation",
        "bundle": "die Reservierung · die Reservierungen",
        "example": "Ich habe eine Reservierung auf den Namen Lee.",
        "exampleEn": "I have a reservation under the name Lee.",
        "variants": []
      },
      {
        "id": "a1hc-rezeption",
        "de": "die Rezeption, die Rezeptionen",
        "en": "reception desk",
        "bundle": "die Rezeption · die Rezeptionen",
        "example": "Die Rezeption ist im Erdgeschoss.",
        "exampleEn": "Reception is on the ground floor.",
        "variants": []
      },
      {
        "id": "a1hc-einzelzimmer",
        "de": "das Einzelzimmer, die Einzelzimmer",
        "en": "single room",
        "bundle": "das Einzelzimmer · die Einzelzimmer",
        "example": "Ich habe ein Einzelzimmer gebucht.",
        "exampleEn": "I booked a single room.",
        "variants": []
      },
      {
        "id": "a1hc-doppelzimmer",
        "de": "das Doppelzimmer, die Doppelzimmer",
        "en": "double room",
        "bundle": "das Doppelzimmer · die Doppelzimmer",
        "example": "Das Doppelzimmer ist im zweiten Stock.",
        "exampleEn": "The double room is on the second floor.",
        "variants": []
      },
      {
        "id": "a1hc-schluesselkarte",
        "de": "die Schlüsselkarte, die Schlüsselkarten",
        "en": "key card",
        "bundle": "die Schlüsselkarte · die Schlüsselkarten",
        "example": "Die Schlüsselkarte funktioniert nicht.",
        "exampleEn": "The key card does not work.",
        "variants": [
          "die Schluesselkarte, die Schluesselkarten"
        ]
      },
      {
        "id": "a1hc-fruehstueck",
        "de": "das Frühstück",
        "en": "breakfast",
        "bundle": "das Frühstück · mit Frühstück",
        "example": "Ist das Frühstück dabei?",
        "exampleEn": "Is breakfast included?",
        "variants": [
          "das Fruehstueck",
          "Ist das Fruehstueck dabei?"
        ]
      },
      {
        "id": "a1hc-aufzug",
        "de": "der Aufzug, die Aufzüge",
        "en": "lift / elevator",
        "bundle": "der Aufzug · die Aufzüge",
        "example": "Wo ist der Aufzug?",
        "exampleEn": "Where is the lift?",
        "variants": [
          "der Aufzug, die Aufzuege"
        ]
      },
      {
        "id": "a1hc-handtuch",
        "de": "das Handtuch, die Handtücher",
        "en": "towel",
        "bundle": "das Handtuch · die Handtücher",
        "example": "In meinem Zimmer fehlt ein Handtuch.",
        "exampleEn": "A towel is missing from my room.",
        "variants": [
          "das Handtuch, die Handtuecher"
        ]
      },
      {
        "id": "a1hc-funktionieren",
        "de": "funktionieren",
        "en": "to work / function",
        "bundle": "funktionieren · es funktioniert",
        "example": "Der Aufzug funktioniert nicht.",
        "exampleEn": "The lift does not work.",
        "variants": []
      },
      {
        "id": "a1hc-fehlen",
        "de": "fehlen",
        "en": "to be missing",
        "bundle": "fehlen · ein Handtuch fehlt",
        "example": "In meinem Zimmer fehlt ein Handtuch.",
        "exampleEn": "A towel is missing from my room.",
        "variants": []
      },
      {
        "id": "a1hc-ruhig",
        "de": "ruhig",
        "en": "quiet",
        "bundle": "ruhig · ein ruhiges Zimmer",
        "example": "Könnte ich ein ruhiges Zimmer bekommen?",
        "exampleEn": "Could I have a quiet room?",
        "variants": [
          "Koennte ich ein ruhiges Zimmer bekommen?"
        ]
      },
      {
        "id": "a1hc-auschecken",
        "de": "auschecken",
        "en": "to check out",
        "bundle": "auschecken · ich checke aus",
        "example": "Wann muss ich auschecken?",
        "exampleEn": "When do I have to check out?",
        "variants": []
      },
      {
        "id": "a1hc-gepaeck",
        "de": "das Gepäck",
        "en": "luggage",
        "bundle": "das Gepäck · das Gepäck abstellen",
        "example": "Kann ich mein Gepäck hier abstellen?",
        "exampleEn": "Can I leave my luggage here?",
        "variants": [
          "das Gepaeck",
          "Kann ich mein Gepaeck hier abstellen?"
        ],
        "supplemental": true
      },
      {
        "id": "a1hc-wlan",
        "de": "das WLAN",
        "en": "Wi-Fi",
        "bundle": "das WLAN · kostenloses WLAN",
        "example": "Das WLAN funktioniert nicht.",
        "exampleEn": "The Wi-Fi does not work.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1hc-passwort",
        "de": "das Passwort, die Passwörter",
        "en": "password",
        "bundle": "das Passwort · die Passwörter",
        "example": "Wie ist das WLAN-Passwort?",
        "exampleEn": "What is the Wi-Fi password?",
        "variants": [
          "das Passwort, die Passwoerter"
        ],
        "supplemental": true
      },
      {
        "id": "a1hc-klimaanlage",
        "de": "die Klimaanlage, die Klimaanlagen",
        "en": "air conditioning",
        "bundle": "die Klimaanlage · die Klimaanlagen",
        "example": "Die Klimaanlage ist sehr laut.",
        "exampleEn": "The air conditioning is very loud.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1hc-quittung",
        "de": "die Quittung, die Quittungen",
        "en": "receipt",
        "bundle": "die Quittung · die Quittungen",
        "example": "Könnte ich eine Quittung bekommen?",
        "exampleEn": "Could I have a receipt?",
        "variants": [
          "Koennte ich eine Quittung bekommen?"
        ],
        "supplemental": true
      },
      {
        "id": "a1hc-buchen",
        "de": "buchen",
        "en": "to book",
        "bundle": "buchen · ich buche · ich habe gebucht",
        "example": "Ich habe ein Einzelzimmer gebucht.",
        "exampleEn": "I booked a single room.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a1hc-stornieren",
        "de": "stornieren",
        "en": "to cancel a booking",
        "bundle": "stornieren · ich storniere",
        "example": "Ich muss die Reservierung stornieren.",
        "exampleEn": "I have to cancel the reservation.",
        "variants": [],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "a1hc-q1",
        "type": "CHECK-IN",
        "context": "Your family name is Lee and you have a booking.",
        "prompt": "Check in with the reservation name.",
        "answers": [
          "Ich habe eine Reservierung auf den Namen Lee."
        ],
        "explanation": "Auf den Namen introduces the name on the booking.",
        "requires": [
          "a1hc-reservierung"
        ],
        "wordBank": [
          "Ich",
          "habe",
          "eine",
          "Reservierung",
          "auf",
          "den",
          "Namen",
          "Lee."
        ]
      },
      {
        "id": "a1hc-q2",
        "type": "SERVICE QUESTION",
        "context": "You want to know whether breakfast is included.",
        "prompt": "Ask the question.",
        "answers": [
          "Ist das Frühstück dabei?",
          "Ist das Fruehstueck dabei?"
        ],
        "explanation": "The yes or no question begins with Ist.",
        "requires": [
          "a1hc-fruehstueck"
        ],
        "wordBank": [
          "Ist",
          "das",
          "Frühstück",
          "dabei?"
        ]
      },
      {
        "id": "a1hc-q3",
        "type": "LOCATION",
        "context": "Your room is on a high floor.",
        "prompt": "Ask where the lift is.",
        "answers": [
          "Wo ist der Aufzug?"
        ],
        "explanation": "Wo asks for the location.",
        "requires": [
          "a1hc-aufzug"
        ],
        "wordBank": [
          "Wo",
          "ist",
          "der",
          "Aufzug?"
        ]
      },
      {
        "id": "a1hc-q4",
        "type": "MISSING ITEM",
        "context": "There is no towel in your room.",
        "prompt": "Report the missing towel.",
        "answers": [
          "In meinem Zimmer fehlt ein Handtuch."
        ],
        "explanation": "In meinem Zimmer gives the location, and fehlt agrees with one item.",
        "requires": [
          "a1hc-handtuch",
          "a1hc-fehlen"
        ],
        "wordBank": [
          "In",
          "meinem",
          "Zimmer",
          "fehlt",
          "ein",
          "Handtuch."
        ]
      },
      {
        "id": "a1hc-q5",
        "type": "BROKEN SERVICE",
        "context": "The lift is out of service.",
        "prompt": "Report the problem.",
        "answers": [
          "Der Aufzug funktioniert nicht."
        ],
        "explanation": "Funktioniert describes whether the service works.",
        "requires": [
          "a1hc-aufzug",
          "a1hc-funktionieren"
        ],
        "wordBank": [
          "Der",
          "Aufzug",
          "funktioniert",
          "nicht."
        ]
      },
      {
        "id": "a1hc-q6",
        "type": "ROOM REQUEST",
        "context": "You need a quiet room.",
        "prompt": "Make a polite request.",
        "answers": [
          "Könnte ich ein ruhiges Zimmer bekommen?",
          "Koennte ich ein ruhiges Zimmer bekommen?"
        ],
        "explanation": "Könnte ich begins the request, and bekommen goes at the end.",
        "requires": [
          "a1hc-ruhig"
        ],
        "wordBank": [
          "Könnte",
          "ich",
          "ein",
          "ruhiges",
          "Zimmer",
          "bekommen?"
        ]
      },
      {
        "id": "a1hc-q7",
        "type": "CHECKOUT",
        "context": "You need the checkout time.",
        "prompt": "Ask when you must check out.",
        "answers": [
          "Wann muss ich auschecken?"
        ],
        "explanation": "The infinitive auschecken stays together at the end after muss.",
        "requires": [
          "a1hc-auschecken"
        ],
        "wordBank": [
          "Wann",
          "muss",
          "ich",
          "auschecken?"
        ]
      }
    ],
    "input": {
      "script": "Guten Abend. Ich habe eine Reservierung auf den Namen Lee. Ja, ein Einzelzimmer für zwei Nächte. Hier ist Ihre Schlüsselkarte. Das Frühstück ist von sieben bis zehn Uhr. Sie müssen bis elf Uhr auschecken.",
      "listenPrompt": "Wann muss die Person auschecken?",
      "listenAnswers": [
        "Bis elf Uhr.",
        "Die Person muss bis elf Uhr auschecken.",
        "Bis 11 Uhr."
      ],
      "passage": "BUCHUNGSBESTÄTIGUNG. Name: Lee. Zimmer: ruhiges Einzelzimmer. Anreise: 12. Juni. Abreise: 14. Juni. Frühstück: dabei. WLAN: kostenlos. Rezeption: Tag und Nacht geöffnet.",
      "readPrompt": "Welche zwei Leistungen sind dabei?",
      "readAnswers": [
        "Frühstück und WLAN sind dabei.",
        "Das Frühstück und das WLAN.",
        "Frühstück und kostenloses WLAN."
      ]
    },
    "task": {
      "writingPrompt": "Write a message to hotel reception. Give the reservation name and room type, report two different room problems, request a solution for each, and close politely.",
      "minWords": 55,
      "guide": [
        "Identify the reservation",
        "Use In meinem Zimmer for one problem",
        "Use funktioniert nicht for another problem",
        "Make two clear requests",
        "Include a greeting and closing"
      ],
      "required": [
        "Reservierung",
        "Zimmer",
        "fehlt",
        "funktioniert",
        "Könnte"
      ],
      "model": "Guten Abend. Ich habe eine Reservierung auf den Namen Lee und habe für zwei Nächte ein ruhiges Einzelzimmer gebucht. Mein Zimmer hat die Nummer 204. In meinem Zimmer fehlt ein Handtuch. Könnte ich bitte heute noch ein Handtuch bekommen? Außerdem funktioniert die Schlüsselkarte nicht, und ich kann die Tür nicht öffnen. Könnte ich bitte eine neue Schlüsselkarte bekommen? Vielen Dank für Ihre Hilfe. Freundliche Grüße, Sam Lee.",
      "speakingPrompt": "Complete a hotel check-in and ask the practical questions you need.",
      "speakingGuide": [
        "Give the reservation name",
        "Confirm the room type",
        "Ask about breakfast",
        "Ask for the lift",
        "Ask for checkout time",
        "Request a quiet room"
      ],
      "speakingRequired": [
        "Reservierung",
        "Frühstück",
        "Aufzug",
        "auschecken",
        "ruhiges"
      ],
      "speakingModel": "Guten Abend. Ich habe eine Reservierung auf den Namen Lee. Ich habe ein Einzelzimmer gebucht. Ist das Frühstück dabei? Wo ist der Aufzug? Wann muss ich auschecken? Könnte ich ein ruhiges Zimmer bekommen?"
    },
    "culture": {
      "title": "Hotel stars follow published criteria",
      "body": "Germany participates in the Hotelstars Union classification system. The criteria cover areas such as reception service, room features, breakfast, and digital services.",
      "sourceTitle": "Hotelstars Union Germany: Classification criteria",
      "url": "https://www.hotelstars.eu/germany/de/system/unser-system",
      "tags": [
        "das Hotel",
        "die Rezeption",
        "die Sterne"
      ]
    },
    "prerequisite": "a1-pharmacy-doctor-basics"
  },
  {
    "id": "a2-housing-search",
    "level": "A2",
    "code": "A2.9",
    "title": "Find a place to live",
    "subtitle": "Read listings, arrange a viewing, and solve first-week housing problems.",
    "canDo": [
      "Extract rent, deposit, size, and availability from a housing listing",
      "Ask focused questions and arrange a viewing",
      "Describe a problem in the apartment and request action",
      "Speak with neighbors about shared spaces and quiet hours"
    ],
    "grammar": [
      {
        "title": "Adjective endings after ein",
        "rule": "After ein words, the adjective carries part of the case and gender signal.",
        "example": "Ich suche eine ruhige Wohnung mit einem kleinen Balkon.",
        "translation": "I am looking for a quiet apartment with a small balcony."
      },
      {
        "title": "Location and destination",
        "rule": "Use dative for a fixed location and accusative for movement toward a destination.",
        "example": "Die Kisten stehen im Flur. Ich stelle sie in den Keller.",
        "translation": "The boxes are in the hall. I am putting them in the cellar."
      },
      {
        "title": "Reasons with weil",
        "rule": "Weil introduces a reason and sends the conjugated verb to the end of its clause.",
        "example": "Ich rufe an, weil die Heizung nicht funktioniert.",
        "translation": "I am calling because the heating does not work."
      },
      {
        "title": "Polite requests",
        "rule": "Könnten Sie and Würden Sie make requests suitable for landlords and property managers.",
        "example": "Könnten Sie bitte einen Termin vorschlagen?",
        "translation": "Could you please suggest an appointment?"
      }
    ],
    "words": [
      {
        "id": "a29-wohnung",
        "de": "die Wohnung, die Wohnungen",
        "en": "apartment",
        "bundle": "die Wohnung · die Wohnungen",
        "example": "Die Wohnung ist ab Mai frei.",
        "exampleEn": "The apartment is available from May.",
        "variants": []
      },
      {
        "id": "a29-warmmiete",
        "de": "die Warmmiete, die Warmmieten",
        "en": "rent including service charges",
        "bundle": "die Warmmiete · die Warmmieten",
        "example": "Die Warmmiete beträgt 920 Euro.",
        "exampleEn": "The rent including service charges is 920 euros.",
        "variants": []
      },
      {
        "id": "a29-kaution",
        "de": "die Kaution, die Kautionen",
        "en": "security deposit",
        "bundle": "die Kaution · die Kautionen",
        "example": "Wie hoch ist die Kaution?",
        "exampleEn": "How much is the deposit?",
        "variants": []
      },
      {
        "id": "a29-mietvertrag",
        "de": "der Mietvertrag, die Mietverträge",
        "en": "rental agreement",
        "bundle": "der Mietvertrag · die Mietverträge",
        "example": "Lesen Sie den Mietvertrag in Ruhe.",
        "exampleEn": "Read the rental agreement carefully.",
        "variants": [
          "der Mietvertrag, die Mietvertraege"
        ]
      },
      {
        "id": "a29-nebenkosten",
        "de": "die Nebenkosten (Plural)",
        "en": "service charges",
        "bundle": "die Nebenkosten · in den Nebenkosten enthalten",
        "example": "Sind die Heizkosten in den Nebenkosten enthalten?",
        "exampleEn": "Are heating costs included in the service charges?",
        "variants": []
      },
      {
        "id": "a29-besichtigung",
        "de": "der Besichtigungstermin, die Besichtigungstermine",
        "en": "viewing appointment",
        "bundle": "der Besichtigungstermin · die Besichtigungstermine",
        "example": "Passt Ihnen ein Besichtigungstermin am Freitag?",
        "exampleEn": "Would a viewing appointment on Friday suit you?",
        "variants": []
      },
      {
        "id": "a29-vermieter",
        "de": "der Vermieter, die Vermieter / die Vermieterin, die Vermieterinnen",
        "en": "landlord",
        "bundle": "der Vermieter · die Vermieterin",
        "example": "Die Vermieterin beantwortet meine Fragen.",
        "exampleEn": "The landlord answers my questions.",
        "variants": []
      },
      {
        "id": "a29-nachbar",
        "de": "der Nachbar, die Nachbarn / die Nachbarin, die Nachbarinnen",
        "en": "neighbor",
        "bundle": "der Nachbar · die Nachbarin · die Nachbarn",
        "example": "Ich stelle mich den Nachbarn vor.",
        "exampleEn": "I introduce myself to the neighbors.",
        "variants": []
      },
      {
        "id": "a29-stockwerk",
        "de": "das Stockwerk, die Stockwerke",
        "en": "floor or story",
        "bundle": "das Stockwerk · im dritten Stockwerk",
        "example": "Die Wohnung liegt im dritten Stockwerk.",
        "exampleEn": "The apartment is on the third floor.",
        "variants": []
      },
      {
        "id": "a29-einziehen",
        "de": "einziehen",
        "en": "to move in",
        "bundle": "einziehen · zieht ein · ist eingezogen",
        "example": "Wir können am ersten Juni einziehen.",
        "exampleEn": "We can move in on June first.",
        "variants": []
      },
      {
        "id": "a29-kuemmern",
        "de": "sich um etwas kümmern",
        "en": "to take care of something",
        "bundle": "sich kümmern um + Akkusativ",
        "example": "Wer kümmert sich um die Reparatur?",
        "exampleEn": "Who is taking care of the repair?",
        "variants": [
          "sich um etwas kuemmern"
        ]
      },
      {
        "id": "a29-verfuegbar",
        "de": "verfügbar sein",
        "en": "to be available",
        "bundle": "verfügbar · ab sofort verfügbar",
        "example": "Ist die Wohnung noch verfügbar?",
        "exampleEn": "Is the apartment still available?",
        "variants": [
          "verfuegbar sein"
        ]
      },
      {
        "id": "a29-kaltmiete",
        "de": "die Kaltmiete, die Kaltmieten",
        "en": "base rent excluding service charges",
        "bundle": "die Kaltmiete · die Kaltmieten",
        "example": "Zur Kaltmiete kommen die Nebenkosten.",
        "exampleEn": "Service charges are added to the base rent.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a29-wohnflaeche",
        "de": "die Wohnfläche, die Wohnflächen",
        "en": "living area",
        "bundle": "die Wohnfläche · 65 Quadratmeter Wohnfläche",
        "example": "Die Wohnfläche beträgt 65 Quadratmeter.",
        "exampleEn": "The living area is 65 square meters.",
        "variants": [
          "die Wohnflaeche, die Wohnflaechen"
        ],
        "supplemental": true
      },
      {
        "id": "a29-keller",
        "de": "der Keller, die Keller",
        "en": "cellar or basement",
        "bundle": "der Keller · im Keller",
        "example": "Zum Haus gehört ein Fahrradkeller.",
        "exampleEn": "The building includes a bicycle cellar.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a29-hausordnung",
        "de": "die Hausordnung, die Hausordnungen",
        "en": "building rules",
        "bundle": "die Hausordnung · die Hausordnung beachten",
        "example": "Die Ruhezeiten stehen in der Hausordnung.",
        "exampleEn": "Quiet hours are stated in the building rules.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a29-melden",
        "de": "einen Mangel melden",
        "en": "to report a defect",
        "bundle": "einen Mangel melden · hat gemeldet",
        "example": "Ich möchte einen Mangel im Bad melden.",
        "exampleEn": "I would like to report a defect in the bathroom.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a29-tropfen",
        "de": "tropfen",
        "en": "to drip",
        "bundle": "tropfen · tropft · hat getropft",
        "example": "Der Wasserhahn tropft seit gestern.",
        "exampleEn": "The faucet has been dripping since yesterday.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a29-ruhig",
        "de": "ruhig",
        "en": "quiet",
        "bundle": "ruhig · eine ruhige Straße",
        "example": "Ich suche ein ruhiges Zimmer zum Innenhof.",
        "exampleEn": "I am looking for a quiet room facing the courtyard.",
        "variants": [],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "a29-q1",
        "type": "INQUIRY",
        "context": "A listing looks suitable, but it may be old.",
        "prompt": "Ask whether the apartment is still available.",
        "answers": [
          "Ist die Wohnung noch verfügbar?",
          "Ist die Wohnung noch verfuegbar?"
        ],
        "explanation": "Noch checks whether the stated situation continues.",
        "requires": [
          "a29-wohnung",
          "a29-verfuegbar"
        ],
        "wordBank": [
          "ist",
          "die Wohnung",
          "noch",
          "verfügbar"
        ]
      },
      {
        "id": "a29-q2",
        "type": "DETAIL",
        "context": "You need the full monthly cost.",
        "prompt": "Ask whether heating costs are included in the service charges.",
        "answers": [
          "Sind die Heizkosten in den Nebenkosten enthalten?"
        ],
        "explanation": "A yes or no question begins with the conjugated verb.",
        "requires": [
          "a29-nebenkosten"
        ],
        "wordBank": [
          "sind",
          "die Heizkosten",
          "in den Nebenkosten",
          "enthalten"
        ]
      },
      {
        "id": "a29-q3",
        "type": "ARRANGE",
        "context": "Friday afternoon works for you.",
        "prompt": "Politely ask whether a viewing at 4 p.m. on Friday is possible.",
        "answers": [
          "Wäre eine Besichtigung am Freitag um 16 Uhr möglich?",
          "Waere eine Besichtigung am Freitag um 16 Uhr moeglich?",
          "Könnte ich die Wohnung am Freitag um 16 Uhr besichtigen?",
          "Koennte ich die Wohnung am Freitag um 16 Uhr besichtigen?"
        ],
        "explanation": "Wäre möglich and könnte ich are useful polite frames.",
        "requires": [
          "a29-besichtigung"
        ],
        "wordBank": [
          "wäre",
          "eine Besichtigung",
          "am Freitag",
          "um 16 Uhr",
          "möglich"
        ]
      },
      {
        "id": "a29-q4",
        "type": "REASON",
        "context": "You are contacting the property manager.",
        "prompt": "Say that you are calling because the heating does not work, then ask who will take care of it.",
        "answers": [
          "Ich rufe an, weil die Heizung nicht funktioniert. Wer kümmert sich darum?",
          "Ich rufe an, weil die Heizung nicht funktioniert. Wer kuemmert sich darum?"
        ],
        "explanation": "The finite verb stands at the end of the weil clause.",
        "requires": [
          "a29-kuemmern"
        ],
        "wordBank": [
          "ich rufe an",
          "weil",
          "die Heizung",
          "nicht funktioniert",
          "wer kümmert sich darum?"
        ]
      },
      {
        "id": "a29-q5",
        "type": "REQUEST",
        "context": "The kitchen faucet has been dripping since yesterday.",
        "prompt": "Report the problem and ask who will handle the repair.",
        "answers": [
          "Der Wasserhahn tropft seit gestern. Wer kümmert sich um die Reparatur?",
          "Der Wasserhahn tropft seit gestern. Wer kuemmert sich um die Reparatur?"
        ],
        "explanation": "Seit marks a situation continuing from the past into the present.",
        "requires": [
          "a29-kuemmern"
        ],
        "wordBank": [
          "der Wasserhahn",
          "tropft",
          "seit gestern",
          "wer",
          "kümmert sich",
          "um die Reparatur"
        ]
      },
      {
        "id": "a29-q6",
        "type": "NEIGHBOR",
        "context": "Boxes are blocking the shared hall.",
        "prompt": "Politely ask your neighbor to move the boxes into the cellar.",
        "answers": [
          "Könnten Sie die Kisten bitte in den Keller stellen?",
          "Koennten Sie die Kisten bitte in den Keller stellen?",
          "Könntest du die Kisten bitte in den Keller stellen?",
          "Koenntest du die Kisten bitte in den Keller stellen?"
        ],
        "explanation": "Movement toward the cellar takes accusative after in.",
        "requires": [
          "a29-nachbar"
        ],
        "wordBank": [
          "könnten Sie",
          "die Kisten",
          "bitte",
          "in den Keller",
          "stellen"
        ]
      },
      {
        "id": "a29-q7",
        "type": "FOLLOW-UP",
        "context": "The landlord promised to send the agreement today.",
        "prompt": "Ask politely when you can expect the rental agreement.",
        "answers": [
          "Könnten Sie mir bitte sagen, wann ich den Mietvertrag bekomme?",
          "Koennten Sie mir bitte sagen, wann ich den Mietvertrag bekomme?",
          "Wann kann ich mit dem Mietvertrag rechnen?"
        ],
        "explanation": "The indirect wann clause places its finite verb at the end.",
        "requires": [
          "a29-mietvertrag"
        ],
        "wordBank": [
          "könnten Sie mir sagen",
          "wann",
          "ich",
          "den Mietvertrag",
          "bekomme"
        ]
      }
    ],
    "input": {
      "script": "Guten Tag, hier ist Neumann. Die Wohnung in der Lindenstraße ist noch verfügbar. Die Warmmiete beträgt 920 Euro, und die Kaution liegt bei zwei Monatskaltmieten. Am Donnerstag um 17 Uhr wäre eine Besichtigung möglich. Rufen Sie mich bitte zurück.",
      "listenPrompt": "When can the caller offer a viewing?",
      "listenAnswers": [
        "Am Donnerstag um 17 Uhr.",
        "Donnerstag um 17 Uhr.",
        "Thursday at 5 p.m."
      ],
      "passage": "Wohnung, 62 Quadratmeter, zweites Stockwerk, Warmmiete 920 Euro. Einzug ab 1. Mai. Die Heizkosten sind in den Nebenkosten enthalten. Haustiere nach Absprache. Schreiben Sie bitte kurz, wer einziehen möchte und ab wann.",
      "readPrompt": "What two details should an interested person include in the message?",
      "readAnswers": [
        "Wer einziehen möchte und ab wann.",
        "Who wants to move in and from when.",
        "Die Person und der Einzugstermin."
      ]
    },
    "task": {
      "writingPrompt": "Write a 65 to 90 word message about the listing. Introduce yourself, state when you want to move in, ask about the deposit and one other detail, and request a viewing.",
      "minWords": 65,
      "guide": [
        "Open with a suitable greeting",
        "Give relevant personal details",
        "Ask two specific questions",
        "Suggest or request a viewing time",
        "Close politely"
      ],
      "required": [
        "ich",
        "einzieh",
        "Kaution",
        "Besichtigung",
        "?"
      ],
      "model": "Guten Tag Frau Neumann,\n\nich interessiere mich für die Wohnung in der Lindenstraße. Ich arbeite in der Nähe und möchte am 1. Mai einziehen. Ich rauche nicht und habe keine Haustiere. Wie hoch ist die Kaution? Außerdem möchte ich wissen, ob ein Keller zur Wohnung gehört. Wäre eine Besichtigung am Donnerstag um 17 Uhr möglich? Ich freue mich auf Ihre Rückmeldung.\n\nFreundliche Grüße\nSam Lee",
      "speakingPrompt": "Call about an apartment. Explain which listing you mean, ask about total cost and availability, arrange a viewing, and check one practical detail.",
      "speakingGuide": [
        "Identify the listing",
        "Ask two focused questions",
        "Propose a time",
        "Confirm the agreement before ending"
      ],
      "speakingRequired": [
        "Wohnung",
        "Warmmiete",
        "besichtig",
        "passt"
      ],
      "speakingModel": "Guten Tag, ich rufe wegen der Wohnung in der Lindenstraße an. Ist sie noch verfügbar? Wie hoch ist die Warmmiete genau? Könnte ich die Wohnung am Donnerstag besichtigen? Passt Ihnen 17 Uhr? Gehört auch ein Keller dazu? Vielen Dank, dann sehen wir uns am Donnerstag."
    },
    "culture": {
      "title": "Reading German rental costs",
      "body": "German listings often distinguish Kaltmiete from additional operating costs. Warmmiete usually combines the base rent with stated service charges, but the listing or contract shows which costs are included. Asking for the full monthly amount prevents surprises.",
      "sourceTitle": "Make it in Germany: Housing and registration",
      "url": "https://www.make-it-in-germany.com/en/living-in-germany/housing-mobility/housing-registration",
      "tags": [
        "Kaltmiete",
        "Warmmiete",
        "Nebenkosten"
      ]
    },
    "prerequisite": "a2-einladen-meinen"
  },
  {
    "id": "a2-work-schedules",
    "level": "A2",
    "code": "A2.10",
    "title": "Coordinate at work",
    "subtitle": "Discuss shifts, deadlines, responsibilities, and short workplace messages.",
    "canDo": [
      "Read a schedule and confirm when you are available",
      "Request a shift change and give a clear reason",
      "Report a delay or problem before it affects colleagues",
      "Write a short work email with a request and a next step"
    ],
    "grammar": [
      {
        "title": "Modal verbs for duties",
        "rule": "Müssen expresses a requirement, sollen reports an instruction, and dürfen expresses permission.",
        "example": "Ich muss bis Freitag fertig sein. Ich soll den Entwurf weiterleiten.",
        "translation": "I have to be finished by Friday. I am supposed to forward the draft."
      },
      {
        "title": "Time first, verb second",
        "rule": "When a time phrase fills position one, the conjugated verb remains in position two and the subject follows.",
        "example": "Am Dienstag übernehme ich die Frühschicht.",
        "translation": "On Tuesday I will take the early shift."
      },
      {
        "title": "Cause and result",
        "rule": "A weil clause gives a reason. Deshalb begins a main clause and is followed by the conjugated verb.",
        "example": "Mein Zug fällt aus. Deshalb komme ich später.",
        "translation": "My train is canceled. Therefore I will arrive later."
      },
      {
        "title": "Separable workplace verbs",
        "rule": "In a main clause, the prefix moves to the end. In an infinitive, the parts stay together.",
        "example": "Ich leite die Nachricht weiter. Kannst du sie weiterleiten?",
        "translation": "I forward the message. Can you forward it?"
      }
    ],
    "words": [
      {
        "id": "a210-dienstplan",
        "de": "der Dienstplan, die Dienstpläne",
        "en": "work schedule",
        "bundle": "der Dienstplan · die Dienstpläne",
        "example": "Der neue Dienstplan ist online.",
        "exampleEn": "The new work schedule is online.",
        "variants": [
          "der Dienstplan, die Dienstplaene"
        ]
      },
      {
        "id": "a210-schicht",
        "de": "die Schicht, die Schichten",
        "en": "shift",
        "bundle": "die Schicht · die Frühschicht · die Spätschicht",
        "example": "Ich habe morgen die Frühschicht.",
        "exampleEn": "I have the early shift tomorrow.",
        "variants": [
          "die Fruehschicht",
          "die Spaetschicht"
        ]
      },
      {
        "id": "a210-besprechung",
        "de": "die Besprechung, die Besprechungen",
        "en": "meeting",
        "bundle": "die Besprechung · eine Besprechung verschieben",
        "example": "Die Besprechung beginnt um halb zehn.",
        "exampleEn": "The meeting starts at nine thirty.",
        "variants": []
      },
      {
        "id": "a210-frist",
        "de": "die Frist, die Fristen",
        "en": "deadline",
        "bundle": "die Frist · eine Frist einhalten",
        "example": "Die Frist endet am Freitag.",
        "exampleEn": "The deadline ends on Friday.",
        "variants": []
      },
      {
        "id": "a210-vertretung",
        "de": "die Vertretung, die Vertretungen",
        "en": "cover or replacement",
        "bundle": "die Vertretung · eine Vertretung finden",
        "example": "Ich suche eine Vertretung für Montag.",
        "exampleEn": "I am looking for cover for Monday.",
        "variants": []
      },
      {
        "id": "a210-aufgabe",
        "de": "die Aufgabe, die Aufgaben",
        "en": "task",
        "bundle": "die Aufgabe · die Aufgaben",
        "example": "Welche Aufgabe soll ich zuerst erledigen?",
        "exampleEn": "Which task should I complete first?",
        "variants": []
      },
      {
        "id": "a210-rueckmeldung",
        "de": "die Rückmeldung, die Rückmeldungen",
        "en": "response or feedback",
        "bundle": "die Rückmeldung · um Rückmeldung bitten",
        "example": "Bitte geben Sie mir bis morgen Rückmeldung.",
        "exampleEn": "Please respond by tomorrow.",
        "variants": [
          "die Rueckmeldung, die Rueckmeldungen"
        ]
      },
      {
        "id": "a210-weiterleiten",
        "de": "etwas weiterleiten",
        "en": "to forward something",
        "bundle": "weiterleiten · leitet weiter · hat weitergeleitet",
        "example": "Ich leite die E-Mail an Frau Özdemir weiter.",
        "exampleEn": "I am forwarding the email to Ms. Özdemir.",
        "variants": [
          "Ich leite die E-Mail an Frau Oezdemir weiter."
        ]
      },
      {
        "id": "a210-tauschen",
        "de": "eine Schicht tauschen",
        "en": "to swap a shift",
        "bundle": "eine Schicht tauschen · hat getauscht",
        "example": "Können wir die Schicht tauschen?",
        "exampleEn": "Can we swap the shift?",
        "variants": [
          "Koennen wir die Schicht tauschen?"
        ]
      },
      {
        "id": "a210-verspaeten",
        "de": "sich verspäten",
        "en": "to be delayed",
        "bundle": "sich verspäten · verspätet sich · hat sich verspätet",
        "example": "Ich verspäte mich um etwa zwanzig Minuten.",
        "exampleEn": "I will be about twenty minutes late.",
        "variants": [
          "sich verspaeten"
        ]
      },
      {
        "id": "a210-zustaendig",
        "de": "für etwas zuständig sein",
        "en": "to be responsible for something",
        "bundle": "zuständig sein für + Akkusativ",
        "example": "Wer ist für die Bestellung zuständig?",
        "exampleEn": "Who is responsible for the order?",
        "variants": [
          "fuer etwas zustaendig sein"
        ]
      },
      {
        "id": "a210-erledigen",
        "de": "etwas erledigen",
        "en": "to complete or take care of something",
        "bundle": "erledigen · erledigt · hat erledigt",
        "example": "Ich erledige die Aufgabe heute Nachmittag.",
        "exampleEn": "I will complete the task this afternoon.",
        "variants": []
      },
      {
        "id": "a210-fruehschicht",
        "de": "die Frühschicht, die Frühschichten",
        "en": "early shift",
        "bundle": "die Frühschicht · die Frühschichten",
        "example": "Die Frühschicht beginnt um sechs Uhr.",
        "exampleEn": "The early shift starts at six.",
        "variants": [
          "die Fruehschicht, die Fruehschichten"
        ],
        "supplemental": true
      },
      {
        "id": "a210-spaetschicht",
        "de": "die Spätschicht, die Spätschichten",
        "en": "late shift",
        "bundle": "die Spätschicht · die Spätschichten",
        "example": "Am Donnerstag kann ich die Spätschicht übernehmen.",
        "exampleEn": "On Thursday I can take the late shift.",
        "variants": [
          "die Spaetschicht, die Spaetschichten"
        ],
        "supplemental": true
      },
      {
        "id": "a210-entwurf",
        "de": "der Entwurf, die Entwürfe",
        "en": "draft",
        "bundle": "der Entwurf · die Entwürfe",
        "example": "Der erste Entwurf ist fast fertig.",
        "exampleEn": "The first draft is almost finished.",
        "variants": [
          "der Entwurf, die Entwuerfe"
        ],
        "supplemental": true
      },
      {
        "id": "a210-verschieben",
        "de": "etwas verschieben",
        "en": "to postpone or reschedule something",
        "bundle": "verschieben · verschiebt · hat verschoben",
        "example": "Können wir die Besprechung auf Mittwoch verschieben?",
        "exampleEn": "Can we move the meeting to Wednesday?",
        "variants": [
          "Koennen wir die Besprechung auf Mittwoch verschieben?"
        ],
        "supplemental": true
      },
      {
        "id": "a210-uebernehmen",
        "de": "etwas übernehmen",
        "en": "to take over something",
        "bundle": "übernehmen · übernimmt · hat übernommen",
        "example": "Mara übernimmt meine Schicht.",
        "exampleEn": "Mara is taking my shift.",
        "variants": [
          "etwas uebernehmen"
        ],
        "supplemental": true
      },
      {
        "id": "a210-prioritaet",
        "de": "die Priorität, die Prioritäten",
        "en": "priority",
        "bundle": "die Priorität · die Prioritäten",
        "example": "Diese Anfrage hat heute Priorität.",
        "exampleEn": "This request has priority today.",
        "variants": [
          "die Prioritaet, die Prioritaeten"
        ],
        "supplemental": true
      },
      {
        "id": "a210-absprechen",
        "de": "etwas mit jemandem absprechen",
        "en": "to coordinate something with someone",
        "bundle": "absprechen mit + Dativ · hat abgesprochen",
        "example": "Ich spreche den Termin mit dem Team ab.",
        "exampleEn": "I am coordinating the appointment with the team.",
        "variants": [],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "a210-q1",
        "type": "SCHEDULE",
        "context": "You can cover Tuesday morning.",
        "prompt": "Say that you will take the early shift on Tuesday.",
        "answers": [
          "Am Dienstag übernehme ich die Frühschicht.",
          "Am Dienstag uebernehme ich die Fruehschicht."
        ],
        "explanation": "The time phrase fills position one and the verb stays second.",
        "requires": [
          "a210-schicht"
        ],
        "wordBank": [
          "am Dienstag",
          "übernehme",
          "ich",
          "die Frühschicht"
        ]
      },
      {
        "id": "a210-q2",
        "type": "REQUEST",
        "context": "You have an appointment during your Monday shift.",
        "prompt": "Ask Nina whether she can swap shifts with you.",
        "answers": [
          "Nina, kannst du am Montag die Schicht mit mir tauschen?",
          "Kannst du am Montag die Schicht mit mir tauschen, Nina?"
        ],
        "explanation": "Mit takes dative, so ich becomes mir.",
        "requires": [
          "a210-tauschen",
          "a210-schicht"
        ],
        "wordBank": [
          "Nina",
          "kannst du",
          "am Montag",
          "die Schicht",
          "mit mir",
          "tauschen"
        ]
      },
      {
        "id": "a210-q3",
        "type": "DELAY",
        "context": "Your train has been canceled and you expect a 20-minute delay.",
        "prompt": "Write a two-sentence update for your team.",
        "answers": [
          "Mein Zug fällt aus. Deshalb verspäte ich mich um etwa zwanzig Minuten.",
          "Mein Zug faellt aus. Deshalb verspaete ich mich um etwa zwanzig Minuten."
        ],
        "explanation": "Deshalb begins a result clause and is followed by the verb.",
        "requires": [
          "a210-verspaeten"
        ],
        "wordBank": [
          "mein Zug",
          "fällt aus",
          "deshalb",
          "verspäte ich mich",
          "um etwa zwanzig Minuten"
        ]
      },
      {
        "id": "a210-q4",
        "type": "CLARIFY",
        "context": "Three tasks are due soon.",
        "prompt": "Ask which task you should complete first.",
        "answers": [
          "Welche Aufgabe soll ich zuerst erledigen?"
        ],
        "explanation": "Soll ich asks for an instruction or priority.",
        "requires": [
          "a210-aufgabe",
          "a210-erledigen"
        ],
        "wordBank": [
          "welche Aufgabe",
          "soll",
          "ich",
          "zuerst",
          "erledigen"
        ]
      },
      {
        "id": "a210-q5",
        "type": "RESPONSIBILITY",
        "context": "A delivery needs to be ordered.",
        "prompt": "Ask who is responsible for the order.",
        "answers": [
          "Wer ist für die Bestellung zuständig?",
          "Wer ist fuer die Bestellung zustaendig?"
        ],
        "explanation": "Zuständig combines with für plus accusative.",
        "requires": [
          "a210-zustaendig"
        ],
        "wordBank": [
          "wer",
          "ist",
          "für die Bestellung",
          "zuständig"
        ]
      },
      {
        "id": "a210-q6",
        "type": "EMAIL",
        "context": "You sent a draft and need an answer tomorrow.",
        "prompt": "Say that you have forwarded the draft and ask for a response by tomorrow.",
        "answers": [
          "Ich habe den Entwurf weitergeleitet. Bitte geben Sie mir bis morgen Rückmeldung.",
          "Ich habe den Entwurf weitergeleitet. Bitte geben Sie mir bis morgen Rueckmeldung."
        ],
        "explanation": "Bis morgen sets a clear response deadline.",
        "requires": [
          "a210-weiterleiten",
          "a210-rueckmeldung"
        ],
        "wordBank": [
          "ich habe",
          "den Entwurf",
          "weitergeleitet",
          "bitte",
          "bis morgen",
          "Rückmeldung"
        ]
      },
      {
        "id": "a210-q7",
        "type": "RESCHEDULE",
        "context": "You cannot attend Tuesday's meeting.",
        "prompt": "Give the reason and ask whether the meeting can move to Wednesday.",
        "answers": [
          "Ich kann am Dienstag nicht teilnehmen, weil ich einen Kundentermin habe. Können wir die Besprechung auf Mittwoch verschieben?",
          "Ich kann am Dienstag nicht teilnehmen, weil ich einen Kundentermin habe. Koennen wir die Besprechung auf Mittwoch verschieben?"
        ],
        "explanation": "The reason clause ends with habe, followed by a clear request.",
        "requires": [
          "a210-besprechung"
        ],
        "wordBank": [
          "ich kann",
          "nicht teilnehmen",
          "weil",
          "ich einen Kundentermin habe",
          "können wir",
          "auf Mittwoch",
          "verschieben"
        ]
      }
    ],
    "input": {
      "script": "Hallo zusammen. Der Dienstplan für nächste Woche hat sich geändert. Nina übernimmt am Montag die Frühschicht. Tom beginnt am Dienstag erst um zehn Uhr. Die Besprechung am Mittwoch bleibt um neun. Bitte prüft eure Zeiten und gebt mir bis heute Abend Rückmeldung.",
      "listenPrompt": "What does the speaker ask everyone to do by this evening?",
      "listenAnswers": [
        "Die Zeiten prüfen und Rückmeldung geben.",
        "Check their times and respond.",
        "Den Dienstplan prüfen und antworten."
      ],
      "passage": "Betreff: Frist für den Entwurf. Hallo Luis, der Kunde braucht den Entwurf schon am Donnerstag. Kannst du deinen Teil bitte bis Mittwochmittag erledigen und direkt an mich weiterleiten? Falls die Frist schwierig ist, melde dich bitte heute, damit wir die Aufgaben anders verteilen können. Viele Grüße, Jana",
      "readPrompt": "Why should Luis reply today if the deadline is difficult?",
      "readAnswers": [
        "Damit sie die Aufgaben anders verteilen können.",
        "So they can distribute the tasks differently.",
        "Weil die Aufgaben dann anders verteilt werden können."
      ]
    },
    "task": {
      "writingPrompt": "Write a 60 to 85 word message to a supervisor. Explain that you cannot work your Friday shift, give a reason, say what solution you have already found, and ask for confirmation.",
      "minWords": 60,
      "guide": [
        "State the schedule issue immediately",
        "Give one short reason",
        "Name the colleague or alternative arrangement",
        "Ask for a clear confirmation",
        "Use an appropriate greeting and closing"
      ],
      "required": [
        "Freitag",
        "weil",
        "Schicht",
        "übernehm",
        "Rückmeldung"
      ],
      "model": "Guten Morgen Frau Keller,\n\nich kann meine Schicht am Freitag leider nicht übernehmen, weil ich einen wichtigen Arzttermin habe. Ich habe schon mit Leon gesprochen. Er kann die Frühschicht übernehmen, und ich übernehme dafür seine Spätschicht am Dienstag. Den Tausch habe ich bereits mit Leon abgesprochen. Ist diese Lösung für Sie in Ordnung? Bitte geben Sie mir kurz Rückmeldung.\n\nViele Grüße\nMia Santos",
      "speakingPrompt": "Tell a colleague about a schedule conflict. Explain the reason, suggest a fair swap, ask whether it works, and confirm the new arrangement.",
      "speakingGuide": [
        "Name the conflicting shift",
        "Give a brief reason",
        "Offer a specific exchange",
        "Ask and then summarize the agreement"
      ],
      "speakingRequired": [
        "Schicht",
        "weil",
        "tauschen",
        "also"
      ],
      "speakingModel": "Kannst du am Montag die Frühschicht mit mir tauschen? Ich habe einen Termin, weil meine Tochter zum Arzt muss. Ich könnte dafür deine Spätschicht am Donnerstag übernehmen. Passt das für dich? Super, also arbeitest du Montag früh und ich Donnerstag spät."
    },
    "culture": {
      "title": "Clear coordination at work",
      "body": "Workplace routines differ across companies, but agreed times and early updates carry practical weight. A useful German work message states the issue, gives the needed context, proposes a next step, and asks for confirmation.",
      "sourceTitle": "Make it in Germany: Working environment",
      "url": "https://www.make-it-in-germany.com/en/working-in-germany/working-environment",
      "tags": [
        "Dienstplan",
        "Rückmeldung",
        "Frist"
      ]
    },
    "prerequisite": "a2-housing-search"
  },
  {
    "id": "a2-public-appointments",
    "level": "A2",
    "code": "A2.11",
    "title": "Handle an official appointment",
    "subtitle": "Book appointments, prepare documents, complete forms, and ask what happens next.",
    "canDo": [
      "Identify the office and service needed for a common request",
      "Book, confirm, or change an appointment",
      "Ask which documents, fees, and forms are required",
      "Explain a missing document and arrange to submit it later"
    ],
    "grammar": [
      {
        "title": "Purpose with um zu",
        "rule": "Use um plus zu and an infinitive when the same person performs both actions.",
        "example": "Ich brauche einen Termin, um meinen Wohnsitz anzumelden.",
        "translation": "I need an appointment to register my residence."
      },
      {
        "title": "Indirect questions",
        "rule": "After phrases such as Können Sie mir sagen, question words introduce a clause with the verb at the end.",
        "example": "Können Sie mir sagen, welche Unterlagen ich mitbringen muss?",
        "translation": "Can you tell me which documents I have to bring?"
      },
      {
        "title": "Requirements with müssen",
        "rule": "Müssen states a requirement. In a main clause the other verb remains in the infinitive at the end.",
        "example": "Sie müssen das Formular unterschreiben.",
        "translation": "You have to sign the form."
      },
      {
        "title": "Passive for procedures",
        "rule": "Werden plus past participle focuses on the procedure when the person doing it is less important.",
        "example": "Die Gebühr wird vor Ort bezahlt.",
        "translation": "The fee is paid on site."
      }
    ],
    "words": [
      {
        "id": "a211-buergeramt",
        "de": "das Bürgeramt, die Bürgerämter",
        "en": "citizens' office",
        "bundle": "das Bürgeramt · die Bürgerämter",
        "example": "Der Termin ist im Bürgeramt Mitte.",
        "exampleEn": "The appointment is at the Mitte citizens' office.",
        "variants": [
          "das Buergeramt, die Buergeraemter"
        ]
      },
      {
        "id": "a211-termin",
        "de": "der Termin, die Termine",
        "en": "appointment",
        "bundle": "der Termin · einen Termin vereinbaren",
        "example": "Ich habe morgen einen Termin.",
        "exampleEn": "I have an appointment tomorrow.",
        "variants": []
      },
      {
        "id": "a211-formular",
        "de": "das Formular, die Formulare",
        "en": "form",
        "bundle": "das Formular · die Formulare",
        "example": "Das Formular finden Sie online.",
        "exampleEn": "You can find the form online.",
        "variants": []
      },
      {
        "id": "a211-unterlage",
        "de": "die Unterlage, die Unterlagen",
        "en": "document or supporting paperwork",
        "bundle": "die Unterlage · die erforderlichen Unterlagen",
        "example": "Bringen Sie bitte alle Unterlagen mit.",
        "exampleEn": "Please bring all documents with you.",
        "variants": []
      },
      {
        "id": "a211-meldebescheinigung",
        "de": "die Meldebescheinigung, die Meldebescheinigungen",
        "en": "registration certificate",
        "bundle": "die Meldebescheinigung · die Meldebescheinigungen",
        "example": "Sie erhalten eine Meldebescheinigung.",
        "exampleEn": "You receive a registration certificate.",
        "variants": []
      },
      {
        "id": "a211-ausweis",
        "de": "der Ausweis, die Ausweise",
        "en": "identity document",
        "bundle": "der Ausweis · einen gültigen Ausweis vorlegen",
        "example": "Ist Ihr Ausweis noch gültig?",
        "exampleEn": "Is your identity document still valid?",
        "variants": [
          "Ist Ihr Ausweis noch gueltig?"
        ]
      },
      {
        "id": "a211-gebuehr",
        "de": "die Gebühr, die Gebühren",
        "en": "fee",
        "bundle": "die Gebühr · die Gebühren",
        "example": "Die Gebühr kann mit Karte bezahlt werden.",
        "exampleEn": "The fee can be paid by card.",
        "variants": [
          "die Gebuehr, die Gebuehren"
        ]
      },
      {
        "id": "a211-unterschrift",
        "de": "die Unterschrift, die Unterschriften",
        "en": "signature",
        "bundle": "die Unterschrift · das Formular unterschreiben",
        "example": "Hier fehlt noch Ihre Unterschrift.",
        "exampleEn": "Your signature is still missing here.",
        "variants": []
      },
      {
        "id": "a211-ausfuellen",
        "de": "ein Formular ausfüllen",
        "en": "to fill out a form",
        "bundle": "ausfüllen · füllt aus · hat ausgefüllt",
        "example": "Bitte füllen Sie Seite zwei aus.",
        "exampleEn": "Please fill out page two.",
        "variants": [
          "ein Formular ausfuellen"
        ]
      },
      {
        "id": "a211-mitbringen",
        "de": "etwas mitbringen",
        "en": "to bring something along",
        "bundle": "mitbringen · bringt mit · hat mitgebracht",
        "example": "Muss ich ein Foto mitbringen?",
        "exampleEn": "Do I have to bring a photo?",
        "variants": []
      },
      {
        "id": "a211-einreichen",
        "de": "Unterlagen einreichen",
        "en": "to submit documents",
        "bundle": "einreichen · reicht ein · hat eingereicht",
        "example": "Sie können die Unterlagen online einreichen.",
        "exampleEn": "You can submit the documents online.",
        "variants": []
      },
      {
        "id": "a211-vereinbaren",
        "de": "einen Termin vereinbaren",
        "en": "to arrange an appointment",
        "bundle": "vereinbaren · vereinbart · hat vereinbart",
        "example": "Ich möchte einen Termin vereinbaren.",
        "exampleEn": "I would like to arrange an appointment.",
        "variants": []
      },
      {
        "id": "a211-wohnsitz",
        "de": "der Wohnsitz, die Wohnsitze",
        "en": "place of residence",
        "bundle": "der Wohnsitz · den Wohnsitz anmelden",
        "example": "Ich möchte meinen neuen Wohnsitz anmelden.",
        "exampleEn": "I would like to register my new residence.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a211-anmeldung",
        "de": "die Anmeldung, die Anmeldungen",
        "en": "registration",
        "bundle": "die Anmeldung · die Anmeldungen",
        "example": "Für die Anmeldung brauche ich einen Termin.",
        "exampleEn": "I need an appointment for the registration.",
        "variants": [
          "Fuer die Anmeldung brauche ich einen Termin."
        ],
        "supplemental": true
      },
      {
        "id": "a211-bestaetigung",
        "de": "die Bestätigung, die Bestätigungen",
        "en": "confirmation",
        "bundle": "die Bestätigung · eine Bestätigung erhalten",
        "example": "Die Bestätigung kommt per E-Mail.",
        "exampleEn": "The confirmation comes by email.",
        "variants": [
          "die Bestaetigung, die Bestaetigungen"
        ],
        "supplemental": true
      },
      {
        "id": "a211-gueltig",
        "de": "gültig",
        "en": "valid",
        "bundle": "gültig · bis Ende des Jahres gültig",
        "example": "Der Pass ist noch sechs Monate gültig.",
        "exampleEn": "The passport is valid for another six months.",
        "variants": [
          "gueltig"
        ],
        "supplemental": true
      },
      {
        "id": "a211-fehlen",
        "de": "fehlen",
        "en": "to be missing",
        "bundle": "fehlen · fehlt · hat gefehlt",
        "example": "Mir fehlt noch die Bestätigung des Vermieters.",
        "exampleEn": "I am still missing the landlord's confirmation.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a211-schalter",
        "de": "der Schalter, die Schalter",
        "en": "service counter",
        "bundle": "der Schalter · am Schalter",
        "example": "Bitte gehen Sie zu Schalter fünf.",
        "exampleEn": "Please go to counter five.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a211-nachreichen",
        "de": "etwas nachreichen",
        "en": "to submit something later",
        "bundle": "nachreichen · reicht nach · hat nachgereicht",
        "example": "Kann ich das Dokument morgen nachreichen?",
        "exampleEn": "Can I submit the document tomorrow?",
        "variants": [],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "a211-q1",
        "type": "PURPOSE",
        "context": "You have moved and need to register your address.",
        "prompt": "Say that you need an appointment to register your residence.",
        "answers": [
          "Ich brauche einen Termin, um meinen Wohnsitz anzumelden."
        ],
        "explanation": "Um zu connects the appointment with its purpose.",
        "requires": [
          "a211-termin"
        ],
        "wordBank": [
          "ich brauche",
          "einen Termin",
          "um",
          "meinen Wohnsitz",
          "anzumelden"
        ]
      },
      {
        "id": "a211-q2",
        "type": "DOCUMENTS",
        "context": "The website is unclear.",
        "prompt": "Politely ask which documents you have to bring.",
        "answers": [
          "Können Sie mir bitte sagen, welche Unterlagen ich mitbringen muss?",
          "Koennen Sie mir bitte sagen, welche Unterlagen ich mitbringen muss?"
        ],
        "explanation": "The verb muss moves to the end of the indirect question.",
        "requires": [
          "a211-unterlage",
          "a211-mitbringen"
        ],
        "wordBank": [
          "können Sie mir sagen",
          "welche Unterlagen",
          "ich",
          "mitbringen muss"
        ]
      },
      {
        "id": "a211-q3",
        "type": "FEE",
        "context": "You need to plan the cost and payment method.",
        "prompt": "Ask how much the fee is and whether you can pay by card.",
        "answers": [
          "Wie hoch ist die Gebühr, und kann ich mit Karte bezahlen?",
          "Wie hoch ist die Gebuehr, und kann ich mit Karte bezahlen?"
        ],
        "explanation": "Two direct questions can be joined with und.",
        "requires": [
          "a211-gebuehr"
        ],
        "wordBank": [
          "wie hoch",
          "ist",
          "die Gebühr",
          "und",
          "kann ich",
          "mit Karte",
          "bezahlen"
        ]
      },
      {
        "id": "a211-q4",
        "type": "MISSING",
        "context": "You do not yet have the landlord's confirmation.",
        "prompt": "Explain what is missing and ask whether you can submit it tomorrow.",
        "answers": [
          "Mir fehlt noch die Bestätigung des Vermieters. Kann ich sie morgen nachreichen?",
          "Mir fehlt noch die Bestaetigung des Vermieters. Kann ich sie morgen nachreichen?"
        ],
        "explanation": "The dative pronoun mir marks the person who lacks something.",
        "requires": [
          "a211-unterlage"
        ],
        "wordBank": [
          "mir fehlt",
          "noch",
          "die Bestätigung",
          "kann ich",
          "sie",
          "morgen",
          "nachreichen"
        ]
      },
      {
        "id": "a211-q5",
        "type": "FORM",
        "context": "You are unsure where to sign.",
        "prompt": "Ask where you should sign the form.",
        "answers": [
          "Wo soll ich das Formular unterschreiben?"
        ],
        "explanation": "Soll ich asks for procedural guidance.",
        "requires": [
          "a211-formular",
          "a211-unterschrift"
        ],
        "wordBank": [
          "wo",
          "soll",
          "ich",
          "das Formular",
          "unterschreiben"
        ]
      },
      {
        "id": "a211-q6",
        "type": "RESCHEDULE",
        "context": "You cannot attend Wednesday morning.",
        "prompt": "Cancel politely and ask for a new appointment on Friday afternoon.",
        "answers": [
          "Ich kann den Termin am Mittwoch leider nicht wahrnehmen. Könnte ich einen neuen Termin am Freitagnachmittag bekommen?",
          "Ich kann den Termin am Mittwoch leider nicht wahrnehmen. Koennte ich einen neuen Termin am Freitagnachmittag bekommen?"
        ],
        "explanation": "Einen Termin wahrnehmen is a common formal way to say attend an appointment.",
        "requires": [
          "a211-termin",
          "a211-vereinbaren"
        ],
        "wordBank": [
          "ich kann",
          "den Termin",
          "leider nicht wahrnehmen",
          "könnte ich",
          "einen neuen Termin",
          "am Freitagnachmittag",
          "bekommen"
        ]
      },
      {
        "id": "a211-q7",
        "type": "NEXT STEP",
        "context": "You have handed in all documents.",
        "prompt": "Ask when and how you will receive confirmation.",
        "answers": [
          "Können Sie mir sagen, wann und wie ich die Bestätigung bekomme?",
          "Koennen Sie mir sagen, wann und wie ich die Bestaetigung bekomme?"
        ],
        "explanation": "The indirect question closes with bekomme.",
        "requires": [
          "a211-unterlage"
        ],
        "wordBank": [
          "können Sie mir sagen",
          "wann und wie",
          "ich",
          "die Bestätigung",
          "bekomme"
        ]
      }
    ],
    "input": {
      "script": "Guten Tag, hier ist das Bürgeramt Nord. Ihr Termin zur Anmeldung ist am 14. Juni um 10:20 Uhr an Schalter sieben. Bitte bringen Sie Ihren Ausweis, das ausgefüllte Formular und die Wohnungsgeberbestätigung mit. Falls Sie den Termin nicht wahrnehmen können, stornieren Sie ihn bitte online.",
      "listenPrompt": "Which three items should the visitor bring?",
      "listenAnswers": [
        "Den Ausweis, das ausgefüllte Formular und die Wohnungsgeberbestätigung.",
        "ID, the completed form, and the landlord confirmation.",
        "Ausweis, Formular und Wohnungsgeberbestätigung."
      ],
      "passage": "Terminbestätigung: Reisepass beantragen. Ort: Rathaus, Zimmer 204. Bitte erscheinen Sie zehn Minuten früher. Benötigt werden ein gültiger Ausweis, ein aktuelles biometrisches Foto und, falls vorhanden, der alte Reisepass. Die Gebühr wird bei der Antragstellung bezahlt. Kartenzahlung ist möglich.",
      "readPrompt": "When is the fee paid, and which payment method is explicitly available?",
      "readAnswers": [
        "Bei der Antragstellung; Kartenzahlung ist möglich.",
        "When the application is submitted, and card payment is available.",
        "Bei der Antragstellung mit Karte."
      ]
    },
    "task": {
      "writingPrompt": "Write a 65 to 90 word email to an office. State which service you need, request an appointment, ask which documents and fees are required, and mention one time when you are unavailable.",
      "minWords": 65,
      "guide": [
        "Name the service in the first two sentences",
        "Use one purpose clause",
        "Ask about documents and cost",
        "Give useful scheduling information",
        "Close with your full name"
      ],
      "required": [
        "Termin",
        "um",
        "Unterlagen",
        "Gebühr",
        "?"
      ],
      "model": "Guten Tag,\n\nich bin vor Kurzem umgezogen und brauche einen Termin, um meinen neuen Wohnsitz anzumelden. Meine aktuelle Anschrift lautet Rosenweg 8 in 50667 Köln. Können Sie mir bitte sagen, welche Unterlagen ich mitbringen muss? Entsteht für die Anmeldung eine Gebühr? Am Dienstagvormittag kann ich leider nicht kommen. Mittwoch oder Donnerstag ab 14 Uhr wären für mich möglich. Vielen Dank für Ihre Rückmeldung.\n\nFreundliche Grüße\nAmir Haddad",
      "speakingPrompt": "Call an office to arrange an appointment. Name the service, ask about availability and documents, explain one scheduling limit, and repeat the final date and time.",
      "speakingGuide": [
        "State your purpose",
        "Ask one document question",
        "Negotiate a suitable time",
        "Repeat the agreed details"
      ],
      "speakingRequired": [
        "Termin",
        "Unterlagen",
        "könnte",
        "also"
      ],
      "speakingModel": "Guten Tag, ich möchte einen neuen Reisepass beantragen. Könnte ich dafür einen Termin vereinbaren? Welche Unterlagen muss ich mitbringen? Am Montag kann ich nur nach 15 Uhr. Donnerstag um 16:20 Uhr passt gut. Also komme ich am Donnerstag um 16:20 Uhr ins Rathaus. Vielen Dank."
    },
    "culture": {
      "title": "Check the official service page",
      "body": "Required documents, fees, booking systems, and processing times depend on the service and local authority. German public-service portals collect official information and direct users to the responsible office. Checking the exact service page before an appointment saves time.",
      "sourceTitle": "Federal Portal: Public services",
      "url": "https://verwaltung.bund.de/portal/EN",
      "tags": [
        "Behörde",
        "Termin",
        "Unterlagen"
      ]
    },
    "prerequisite": "a2-work-schedules"
  },
  {
    "id": "a2-travel-disruptions",
    "level": "A2",
    "code": "A2.12",
    "title": "Keep moving when travel changes",
    "subtitle": "Understand disruption notices, protect a connection, and request practical help.",
    "canDo": [
      "Understand the key information in a delay or cancellation announcement",
      "Ask about platforms, connections, and replacement transport",
      "Explain that a connection was missed and request rebooking",
      "Ask where to find current passenger-rights and refund information"
    ],
    "grammar": [
      {
        "title": "Conditions with wenn",
        "rule": "Wenn introduces a condition and sends its conjugated verb to the end of the clause.",
        "example": "Wenn der Zug später kommt, verpasse ich den Anschluss.",
        "translation": "If the train arrives later, I will miss the connection."
      },
      {
        "title": "Cause with wegen",
        "rule": "Wegen commonly combines with genitive in formal writing. Everyday speech may use dative, but the course model practices genitive.",
        "example": "Wegen einer technischen Störung fällt der Zug aus.",
        "translation": "The train is canceled because of a technical fault."
      },
      {
        "title": "Asking indirectly",
        "rule": "Ob introduces an embedded yes or no question and places the finite verb at the end.",
        "example": "Wissen Sie, ob der Anschluss wartet?",
        "translation": "Do you know whether the connection will wait?"
      },
      {
        "title": "Process passive",
        "rule": "Werden plus past participle describes what is being done with a ticket or service.",
        "example": "Ihre Reservierung wird kostenlos umgebucht.",
        "translation": "Your reservation is being rebooked free of charge."
      }
    ],
    "words": [
      {
        "id": "a212-verspaetung",
        "de": "die Verspätung, die Verspätungen",
        "en": "delay",
        "bundle": "die Verspätung · zwanzig Minuten Verspätung",
        "example": "Der Zug hat etwa dreißig Minuten Verspätung.",
        "exampleEn": "The train is about thirty minutes late.",
        "variants": [
          "die Verspaetung, die Verspaetungen"
        ]
      },
      {
        "id": "a212-ausfall",
        "de": "der Ausfall, die Ausfälle",
        "en": "cancellation or service failure",
        "bundle": "der Ausfall · die Ausfälle",
        "example": "Wegen des Ausfalls nehmen wir den Bus.",
        "exampleEn": "Because of the cancellation, we are taking the bus.",
        "variants": [
          "der Ausfall, die Ausfaelle"
        ]
      },
      {
        "id": "a212-ersatzverkehr",
        "de": "der Ersatzverkehr (Singular)",
        "en": "replacement transport",
        "bundle": "der Ersatzverkehr · Schienenersatzverkehr",
        "example": "Der Ersatzverkehr fährt vor dem Bahnhof ab.",
        "exampleEn": "The replacement transport leaves in front of the station.",
        "variants": []
      },
      {
        "id": "a212-anschluss",
        "de": "der Anschluss, die Anschlüsse",
        "en": "connection",
        "bundle": "der Anschluss · die Anschlüsse · den Anschluss erreichen",
        "example": "Erreiche ich den Anschluss in Mannheim?",
        "exampleEn": "Will I make the connection in Mannheim?",
        "variants": [
          "der Anschluss, die Anschluesse"
        ]
      },
      {
        "id": "a212-gleis",
        "de": "das Gleis, die Gleise",
        "en": "platform or track",
        "bundle": "das Gleis · die Gleise · auf Gleis acht",
        "example": "Der Zug fährt heute von Gleis acht ab.",
        "exampleEn": "The train leaves from platform eight today.",
        "variants": []
      },
      {
        "id": "a212-durchsage",
        "de": "die Durchsage, die Durchsagen",
        "en": "announcement",
        "bundle": "die Durchsage · die Durchsagen",
        "example": "Ich habe die Durchsage nicht verstanden.",
        "exampleEn": "I did not understand the announcement.",
        "variants": []
      },
      {
        "id": "a212-fahrgast",
        "de": "der Fahrgast, die Fahrgäste",
        "en": "passenger",
        "bundle": "der Fahrgast · die Fahrgäste",
        "example": "Die Fahrgäste werden am Bahnsteig informiert.",
        "exampleEn": "Passengers are informed on the platform.",
        "variants": [
          "der Fahrgast, die Fahrgaeste"
        ]
      },
      {
        "id": "a212-erstattung",
        "de": "die Erstattung, die Erstattungen",
        "en": "refund or reimbursement",
        "bundle": "die Erstattung · eine Erstattung beantragen",
        "example": "Wo kann ich eine Erstattung beantragen?",
        "exampleEn": "Where can I request a refund?",
        "variants": []
      },
      {
        "id": "a212-umbuchen",
        "de": "etwas umbuchen",
        "en": "to rebook something",
        "bundle": "umbuchen · bucht um · hat umgebucht",
        "example": "Können Sie mich auf den nächsten Zug umbuchen?",
        "exampleEn": "Can you rebook me onto the next train?",
        "variants": [
          "Koennen Sie mich auf den naechsten Zug umbuchen?"
        ]
      },
      {
        "id": "a212-verpassen",
        "de": "einen Anschluss verpassen",
        "en": "to miss a connection",
        "bundle": "verpassen · verpasst · hat verpasst",
        "example": "Wir haben den letzten Anschluss verpasst.",
        "exampleEn": "We missed the last connection.",
        "variants": []
      },
      {
        "id": "a212-abfahren",
        "de": "abfahren",
        "en": "to depart",
        "bundle": "abfahren · fährt ab · ist abgefahren",
        "example": "Wann fährt der Ersatzbus ab?",
        "exampleEn": "When does the replacement bus depart?",
        "variants": [
          "abfahren · faehrt ab"
        ]
      },
      {
        "id": "a212-ankommen",
        "de": "ankommen",
        "en": "to arrive",
        "bundle": "ankommen · kommt an · ist angekommen",
        "example": "Der Zug kommt voraussichtlich um 18 Uhr an.",
        "exampleEn": "The train is expected to arrive at 6 p.m.",
        "variants": []
      },
      {
        "id": "a212-fahrkarte",
        "de": "die Fahrkarte, die Fahrkarten",
        "en": "ticket",
        "bundle": "die Fahrkarte · die Fahrkarten",
        "example": "Gilt meine Fahrkarte auch im Ersatzbus?",
        "exampleEn": "Is my ticket valid on the replacement bus too?",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a212-reservierung",
        "de": "die Reservierung, die Reservierungen",
        "en": "reservation",
        "bundle": "die Reservierung · eine Reservierung ändern",
        "example": "Meine Reservierung gilt für Wagen sechs.",
        "exampleEn": "My reservation is for coach six.",
        "variants": [
          "Meine Reservierung gilt fuer Wagen sechs."
        ],
        "supplemental": true
      },
      {
        "id": "a212-bahnsteig",
        "de": "der Bahnsteig, die Bahnsteige",
        "en": "platform",
        "bundle": "der Bahnsteig · am Bahnsteig",
        "example": "Der Aufzug zum Bahnsteig ist dort hinten.",
        "exampleEn": "The elevator to the platform is back there.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a212-stoerung",
        "de": "die Störung, die Störungen",
        "en": "disruption or fault",
        "bundle": "die Störung · technische Störung",
        "example": "Die Strecke ist wegen einer Störung gesperrt.",
        "exampleEn": "The route is closed because of a disruption.",
        "variants": [
          "die Stoerung, die Stoerungen"
        ],
        "supplemental": true
      },
      {
        "id": "a212-voraussichtlich",
        "de": "voraussichtlich",
        "en": "expected or estimated",
        "bundle": "voraussichtlich · voraussichtliche Ankunft",
        "example": "Die voraussichtliche Ankunft ist um 19:10 Uhr.",
        "exampleEn": "The expected arrival is at 7:10 p.m.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "a212-gueltig",
        "de": "gültig sein",
        "en": "to be valid",
        "bundle": "gültig · weiterhin gültig",
        "example": "Ist das Ticket im nächsten Zug gültig?",
        "exampleEn": "Is the ticket valid on the next train?",
        "variants": [
          "gueltig sein"
        ],
        "supplemental": true
      },
      {
        "id": "a212-bestaetigen",
        "de": "etwas bestätigen",
        "en": "to confirm something",
        "bundle": "bestätigen · bestätigt · hat bestätigt",
        "example": "Können Sie mir die neue Verbindung schriftlich bestätigen?",
        "exampleEn": "Can you confirm the new connection in writing?",
        "variants": [
          "etwas bestaetigen"
        ],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "a212-q1",
        "type": "ANNOUNCEMENT",
        "context": "You missed the station announcement.",
        "prompt": "Say that you did not understand it and ask which platform the train leaves from.",
        "answers": [
          "Ich habe die Durchsage nicht verstanden. Von welchem Gleis fährt der Zug ab?",
          "Ich habe die Durchsage nicht verstanden. Von welchem Gleis faehrt der Zug ab?"
        ],
        "explanation": "Von takes dative, so welches becomes welchem.",
        "requires": [
          "a212-durchsage",
          "a212-gleis",
          "a212-abfahren"
        ],
        "wordBank": [
          "ich habe",
          "die Durchsage",
          "nicht verstanden",
          "von welchem Gleis",
          "fährt",
          "der Zug",
          "ab"
        ]
      },
      {
        "id": "a212-q2",
        "type": "CONNECTION",
        "context": "Your train is delayed by 25 minutes.",
        "prompt": "Ask whether the connection in Mannheim will wait.",
        "answers": [
          "Wissen Sie, ob der Anschluss in Mannheim wartet?",
          "Wissen Sie, ob der Anschlusszug in Mannheim wartet?"
        ],
        "explanation": "The ob clause ends with wartet.",
        "requires": [
          "a212-anschluss"
        ],
        "wordBank": [
          "wissen Sie",
          "ob",
          "der Anschluss",
          "in Mannheim",
          "wartet"
        ]
      },
      {
        "id": "a212-q3",
        "type": "CONDITION",
        "context": "Another ten minutes would make you miss the connection.",
        "prompt": "Say: If the train arrives later, I will miss my connection.",
        "answers": [
          "Wenn der Zug später ankommt, verpasse ich meinen Anschluss.",
          "Wenn der Zug spaeter ankommt, verpasse ich meinen Anschluss."
        ],
        "explanation": "Ankommt ends the wenn clause; verpasse begins the result clause.",
        "requires": [
          "a212-ankommen",
          "a212-verpassen",
          "a212-anschluss"
        ],
        "wordBank": [
          "wenn",
          "der Zug",
          "später ankommt",
          "verpasse",
          "ich",
          "meinen Anschluss"
        ]
      },
      {
        "id": "a212-q4",
        "type": "REBOOK",
        "context": "The cancellation caused you to miss the last train.",
        "prompt": "Explain what happened and ask to be rebooked on the next connection.",
        "answers": [
          "Wegen des Ausfalls habe ich den Anschluss verpasst. Können Sie mich bitte auf die nächste Verbindung umbuchen?",
          "Wegen des Ausfalls habe ich den Anschluss verpasst. Koennen Sie mich bitte auf die naechste Verbindung umbuchen?"
        ],
        "explanation": "Wegen des Ausfalls gives the cause before the rebooking request.",
        "requires": [
          "a212-ausfall",
          "a212-verpassen",
          "a212-umbuchen"
        ],
        "wordBank": [
          "wegen des Ausfalls",
          "habe ich",
          "den Anschluss",
          "verpasst",
          "können Sie",
          "mich",
          "auf die nächste Verbindung",
          "umbuchen"
        ]
      },
      {
        "id": "a212-q5",
        "type": "REPLACEMENT",
        "context": "Trains are replaced by buses.",
        "prompt": "Ask where the replacement bus departs and whether your ticket is valid on it.",
        "answers": [
          "Wo fährt der Ersatzbus ab, und gilt meine Fahrkarte auch im Ersatzbus?",
          "Wo faehrt der Ersatzbus ab, und gilt meine Fahrkarte auch im Ersatzbus?"
        ],
        "explanation": "The two coordinated questions each place their verb before the subject.",
        "requires": [
          "a212-ersatzverkehr",
          "a212-abfahren"
        ],
        "wordBank": [
          "wo",
          "fährt",
          "der Ersatzbus",
          "ab",
          "und",
          "gilt",
          "meine Fahrkarte",
          "auch im Ersatzbus"
        ]
      },
      {
        "id": "a212-q6",
        "type": "REFUND",
        "context": "Your trip was canceled and you no longer want to travel.",
        "prompt": "Ask where you can request a refund.",
        "answers": [
          "Wo kann ich eine Erstattung beantragen?"
        ],
        "explanation": "Beantragen is the usual verb for a formal refund request.",
        "requires": [
          "a212-erstattung"
        ],
        "wordBank": [
          "wo",
          "kann",
          "ich",
          "eine Erstattung",
          "beantragen"
        ]
      },
      {
        "id": "a212-q7",
        "type": "CONFIRM",
        "context": "An employee has suggested a new route.",
        "prompt": "Ask for the new connection to be confirmed in writing.",
        "answers": [
          "Könnten Sie mir die neue Verbindung bitte schriftlich bestätigen?",
          "Koennten Sie mir die neue Verbindung bitte schriftlich bestaetigen?"
        ],
        "explanation": "Mir marks the recipient of the confirmation.",
        "requires": [
          "a212-anschluss"
        ],
        "wordBank": [
          "könnten Sie",
          "mir",
          "die neue Verbindung",
          "bitte",
          "schriftlich",
          "bestätigen"
        ]
      }
    ],
    "input": {
      "script": "Achtung auf Gleis vier. Der Regionalexpress nach Nürnberg fällt heute wegen einer technischen Störung aus. Reisende nach Nürnberg nutzen bitte den Ersatzbus vor dem Haupteingang. Der Bus fährt um 14:25 Uhr ab. Fahrkarten bleiben gültig.",
      "listenPrompt": "Where and when does the replacement bus depart?",
      "listenAnswers": [
        "Vor dem Haupteingang um 14:25 Uhr.",
        "In front of the main entrance at 2:25 p.m.",
        "Um 14:25 Uhr vor dem Haupteingang."
      ],
      "passage": "Ihre Verbindung: Köln 16:48 nach Basel 20:55. Der Zug erreicht Mannheim voraussichtlich 35 Minuten später. Der Anschluss nach Basel kann nicht warten. Bitte nutzen Sie ab Mannheim den Zug um 19:36 Uhr von Gleis 9. Ihre Fahrkarte bleibt für diese Verbindung gültig. Eine neue Sitzplatzreservierung erhalten Sie im Reisezentrum.",
      "readPrompt": "What must the traveler do in Mannheim, and what happens to the ticket?",
      "readAnswers": [
        "Den Zug um 19:36 Uhr von Gleis 9 nehmen; die Fahrkarte bleibt gültig.",
        "Take the 19:36 train from platform 9, and the ticket remains valid.",
        "In Mannheim umsteigen; das Ticket bleibt gültig."
      ]
    },
    "task": {
      "writingPrompt": "Write a 70 to 95 word message to a rail service desk. Identify the disrupted trip, explain what happened to your connection, state that you still want to travel, request rebooking, and ask for written confirmation.",
      "minWords": 70,
      "guide": [
        "Include the date and route",
        "Describe the disruption and its effect",
        "State the solution you want",
        "Ask one precise follow-up question",
        "Request confirmation"
      ],
      "required": [
        "Zug",
        "Verspät",
        "Anschluss",
        "umbuch",
        "bestät"
      ],
      "model": "Guten Tag,\n\nich reise am 18. August von Köln nach Basel. Mein Zug hatte 50 Minuten Verspätung, deshalb habe ich den Anschluss in Mannheim verpasst. Ich möchte die Reise noch heute fortsetzen. Meine Buchungsnummer lautet AB1234, die Fahrkarte habe ich als PDF beigefügt. Können Sie mich bitte auf die nächste Verbindung umbuchen? Gilt meine Sitzplatzreservierung weiterhin? Bitte bestätigen Sie mir die neue Verbindung schriftlich. Vielen Dank.\n\nFreundliche Grüße\nElena Ruiz",
      "speakingPrompt": "At a service desk, explain a missed connection, ask for the fastest available route, check ticket validity, and repeat the final travel plan.",
      "speakingGuide": [
        "State your original route",
        "Explain the cause and result",
        "Ask for a concrete solution",
        "Check the ticket",
        "Repeat departure time and platform"
      ],
      "speakingRequired": [
        "Anschluss",
        "verpasst",
        "nächste",
        "gültig",
        "also"
      ],
      "speakingModel": "Mein Zug aus Köln hatte Verspätung, und ich habe den Anschluss nach Basel verpasst. Wann fährt die nächste Verbindung? Können Sie mich bitte umbuchen? Ist meine Fahrkarte weiterhin gültig? Gut, also nehme ich um 19:36 Uhr den Zug von Gleis neun."
    },
    "culture": {
      "title": "Use the current passenger-rights guidance",
      "body": "Passenger options depend on the disruption, expected arrival delay, ticket, and route. Deutsche Bahn publishes current instructions for continuing a journey, reimbursements, and compensation. Keep the ticket and any confirmation of the disruption when making a request.",
      "sourceTitle": "Deutsche Bahn: Passenger rights",
      "url": "https://int.bahn.de/en/booking-information/passenger-rights",
      "tags": [
        "Fahrgastrechte",
        "Erstattung",
        "Verspätung"
      ]
    },
    "prerequisite": "a2-public-appointments"
  },
  {
    "id": "b1-job-applications",
    "level": "B1",
    "code": "B1.9",
    "title": "Apply for a job",
    "subtitle": "Read vacancies, present relevant experience, and handle interview follow-up.",
    "canDo": [
      "Identify duties and requirements in a job advertisement",
      "Connect experience and strengths to a specific role",
      "Answer common interview questions with examples",
      "Ask informed questions and follow up after an interview"
    ],
    "grammar": [
      {
        "title": "Relative clauses for evidence",
        "rule": "Relative clauses add specific information about a person, skill, or role. The relative pronoun reflects gender, number, and case.",
        "example": "Ich suche eine Stelle, in der ich Kunden beraten kann.",
        "translation": "I am looking for a position in which I can advise customers."
      },
      {
        "title": "Experience with seit",
        "rule": "Use the present tense with seit when a situation began in the past and continues now.",
        "example": "Seit drei Jahren betreue ich internationale Kunden.",
        "translation": "I have been supporting international customers for three years."
      },
      {
        "title": "Infinitive clauses with zu",
        "rule": "Zu plus infinitive can express a goal, preference, or planned action when the subject is understood from the main clause.",
        "example": "Ich freue mich darauf, mehr Verantwortung zu übernehmen.",
        "translation": "I look forward to taking on more responsibility."
      },
      {
        "title": "Professional hypotheticals",
        "rule": "Würde plus infinitive lets you describe how you would respond in an imagined work situation.",
        "example": "Bei einem Konflikt würde ich zuerst beide Seiten anhören.",
        "translation": "In a conflict, I would first listen to both sides."
      }
    ],
    "words": [
      {
        "id": "b19-bewerbung",
        "de": "die Bewerbung, die Bewerbungen",
        "en": "application",
        "bundle": "die Bewerbung · eine Bewerbung einreichen",
        "example": "Vielen Dank für Ihre Bewerbung.",
        "exampleEn": "Thank you for your application.",
        "variants": [
          "Vielen Dank fuer Ihre Bewerbung."
        ]
      },
      {
        "id": "b19-lebenslauf",
        "de": "der Lebenslauf, die Lebensläufe",
        "en": "résumé or CV",
        "bundle": "der Lebenslauf · die Lebensläufe",
        "example": "Mein Lebenslauf ist auf dem neuesten Stand.",
        "exampleEn": "My CV is up to date.",
        "variants": [
          "der Lebenslauf, die Lebenslaeufe"
        ]
      },
      {
        "id": "b19-anschreiben",
        "de": "das Anschreiben, die Anschreiben",
        "en": "cover letter",
        "bundle": "das Anschreiben · die Anschreiben",
        "example": "Im Anschreiben erkläre ich meine Motivation.",
        "exampleEn": "In the cover letter I explain my motivation.",
        "variants": [
          "Im Anschreiben erklaere ich meine Motivation."
        ]
      },
      {
        "id": "b19-stellenanzeige",
        "de": "die Stellenanzeige, die Stellenanzeigen",
        "en": "job advertisement",
        "bundle": "die Stellenanzeige · die Stellenanzeigen",
        "example": "Die Stellenanzeige nennt vier Hauptaufgaben.",
        "exampleEn": "The job advertisement lists four main duties.",
        "variants": []
      },
      {
        "id": "b19-qualifikation",
        "de": "die Qualifikation, die Qualifikationen",
        "en": "qualification",
        "bundle": "die Qualifikation · die erforderlichen Qualifikationen",
        "example": "Welche Qualifikationen sind besonders wichtig?",
        "exampleEn": "Which qualifications are especially important?",
        "variants": []
      },
      {
        "id": "b19-vorstellungsgespraech",
        "de": "das Vorstellungsgespräch, die Vorstellungsgespräche",
        "en": "job interview",
        "bundle": "das Vorstellungsgespräch · zum Vorstellungsgespräch eingeladen werden",
        "example": "Das Vorstellungsgespräch dauert etwa eine Stunde.",
        "exampleEn": "The interview lasts about an hour.",
        "variants": [
          "das Vorstellungsgespraech, die Vorstellungsgespraeche"
        ]
      },
      {
        "id": "b19-staerke",
        "de": "die Stärke, die Stärken",
        "en": "strength",
        "bundle": "die Stärke · die Stärken",
        "example": "Eine meiner Stärken ist ruhige Kommunikation.",
        "exampleEn": "One of my strengths is calm communication.",
        "variants": [
          "die Staerke, die Staerken"
        ]
      },
      {
        "id": "b19-berufserfahrung",
        "de": "die Berufserfahrung (Singular)",
        "en": "professional experience",
        "bundle": "die Berufserfahrung · Berufserfahrung sammeln",
        "example": "Ich habe fünf Jahre Berufserfahrung im Verkauf.",
        "exampleEn": "I have five years of professional experience in sales.",
        "variants": [
          "Ich habe fuenf Jahre Berufserfahrung im Verkauf."
        ]
      },
      {
        "id": "b19-verantwortung",
        "de": "die Verantwortung, die Verantwortungen",
        "en": "responsibility",
        "bundle": "die Verantwortung · Verantwortung übernehmen",
        "example": "Ich übernehme gern Verantwortung für Projekte.",
        "exampleEn": "I like taking responsibility for projects.",
        "variants": [
          "Verantwortung uebernehmen"
        ]
      },
      {
        "id": "b19-bewerben",
        "de": "sich um eine Stelle bewerben",
        "en": "to apply for a position",
        "bundle": "sich bewerben um + Akkusativ · hat sich beworben",
        "example": "Ich bewerbe mich um die Stelle im Kundenservice.",
        "exampleEn": "I am applying for the customer service position.",
        "variants": []
      },
      {
        "id": "b19-ueberzeugen",
        "de": "jemanden überzeugen",
        "en": "to convince someone",
        "bundle": "überzeugen · überzeugt · hat überzeugt",
        "example": "Das konkrete Beispiel hat die Gesprächspartner überzeugt.",
        "exampleEn": "The concrete example convinced the interviewers.",
        "variants": [
          "jemanden ueberzeugen"
        ]
      },
      {
        "id": "b19-verhandeln",
        "de": "über etwas verhandeln",
        "en": "to negotiate something",
        "bundle": "verhandeln über + Akkusativ · hat verhandelt",
        "example": "Im zweiten Gespräch verhandeln wir über das Gehalt.",
        "exampleEn": "In the second interview we negotiate the salary.",
        "variants": [
          "ueber etwas verhandeln"
        ]
      },
      {
        "id": "b19-arbeitszeugnis",
        "de": "das Arbeitszeugnis, die Arbeitszeugnisse",
        "en": "employment reference",
        "bundle": "das Arbeitszeugnis · die Arbeitszeugnisse",
        "example": "Ich füge zwei Arbeitszeugnisse bei.",
        "exampleEn": "I am attaching two employment references.",
        "variants": [
          "Ich fuege zwei Arbeitszeugnisse bei."
        ],
        "supplemental": true
      },
      {
        "id": "b19-faehigkeit",
        "de": "die Fähigkeit, die Fähigkeiten",
        "en": "ability or skill",
        "bundle": "die Fähigkeit · die Fähigkeiten",
        "example": "Teamfähigkeit wird in der Anzeige ausdrücklich genannt.",
        "exampleEn": "The ability to work in a team is explicitly mentioned in the ad.",
        "variants": [
          "die Faehigkeit, die Faehigkeiten"
        ],
        "supplemental": true
      },
      {
        "id": "b19-voraussetzung",
        "de": "die Voraussetzung, die Voraussetzungen",
        "en": "requirement or prerequisite",
        "bundle": "die Voraussetzung · die Voraussetzungen erfüllen",
        "example": "Ich erfülle die fachlichen Voraussetzungen.",
        "exampleEn": "I meet the professional requirements.",
        "variants": [
          "die Voraussetzungen erfuellen"
        ],
        "supplemental": true
      },
      {
        "id": "b19-rueckfrage",
        "de": "die Rückfrage, die Rückfragen",
        "en": "follow-up question",
        "bundle": "die Rückfrage · Rückfragen stellen",
        "example": "Am Ende stelle ich zwei Rückfragen zur Stelle.",
        "exampleEn": "At the end I ask two follow-up questions about the position.",
        "variants": [
          "die Rueckfrage, die Rueckfragen"
        ],
        "supplemental": true
      },
      {
        "id": "b19-einstellen",
        "de": "jemanden einstellen",
        "en": "to hire someone",
        "bundle": "einstellen · stellt ein · hat eingestellt",
        "example": "Das Unternehmen möchte im Oktober jemanden einstellen.",
        "exampleEn": "The company wants to hire someone in October.",
        "variants": [
          "Das Unternehmen moechte im Oktober jemanden einstellen."
        ],
        "supplemental": true
      },
      {
        "id": "b19-geeignet",
        "de": "für etwas geeignet sein",
        "en": "to be suited for something",
        "bundle": "geeignet sein für + Akkusativ",
        "example": "Meine Erfahrung ist für diese Aufgabe gut geeignet.",
        "exampleEn": "My experience is well suited to this task.",
        "variants": [
          "fuer etwas geeignet sein"
        ],
        "supplemental": true
      },
      {
        "id": "b19-vorbereiten",
        "de": "sich auf etwas vorbereiten",
        "en": "to prepare for something",
        "bundle": "sich vorbereiten auf + Akkusativ",
        "example": "Ich bereite mich auf das Gespräch vor.",
        "exampleEn": "I am preparing for the interview.",
        "variants": [
          "Ich bereite mich auf das Gespraech vor."
        ],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "b19-q1",
        "type": "MOTIVATION",
        "context": "A recruiter asks why this role interests you.",
        "prompt": "Say that you are looking for a position where you can advise customers and take responsibility.",
        "answers": [
          "Ich suche eine Stelle, in der ich Kunden beraten und Verantwortung übernehmen kann.",
          "Ich suche eine Stelle, in der ich Kunden beraten und Verantwortung uebernehmen kann."
        ],
        "explanation": "In der refers back to the feminine noun Stelle and opens the relative clause.",
        "requires": [
          "b19-verantwortung"
        ],
        "wordBank": [
          "ich suche",
          "eine Stelle",
          "in der",
          "ich Kunden beraten",
          "und Verantwortung übernehmen",
          "kann"
        ]
      },
      {
        "id": "b19-q2",
        "type": "EXPERIENCE",
        "context": "The interviewer asks about relevant experience.",
        "prompt": "Say that you have supported international customers for three years.",
        "answers": [
          "Seit drei Jahren betreue ich internationale Kunden."
        ],
        "explanation": "Present tense with seit shows that the work continues today.",
        "requires": [
          "b19-berufserfahrung"
        ],
        "wordBank": [
          "seit drei Jahren",
          "betreue",
          "ich",
          "internationale Kunden"
        ]
      },
      {
        "id": "b19-q3",
        "type": "EVIDENCE",
        "context": "You want to demonstrate calm problem solving.",
        "prompt": "Give this example: When a customer complained, you listened first and then found a solution with the team.",
        "answers": [
          "Als sich ein Kunde beschwert hat, habe ich zuerst zugehört und dann mit dem Team eine Lösung gefunden.",
          "Als sich ein Kunde beschwert hat, habe ich zuerst zugehoert und dann mit dem Team eine Loesung gefunden."
        ],
        "explanation": "Als introduces a single completed event in the past.",
        "requires": [
          "b19-staerke",
          "b19-ueberzeugen"
        ],
        "wordBank": [
          "als",
          "sich ein Kunde beschwert hat",
          "habe ich",
          "zuerst zugehört",
          "und dann",
          "mit dem Team",
          "eine Lösung gefunden"
        ]
      },
      {
        "id": "b19-q4",
        "type": "HYPOTHETICAL",
        "context": "The interviewer asks how you would handle conflict.",
        "prompt": "Say that you would first listen to both sides and then look for a fair solution.",
        "answers": [
          "Bei einem Konflikt würde ich zuerst beide Seiten anhören und dann nach einer fairen Lösung suchen.",
          "Bei einem Konflikt wuerde ich zuerst beide Seiten anhoeren und dann nach einer fairen Loesung suchen."
        ],
        "explanation": "Würde plus infinitives frames a considered hypothetical response.",
        "requires": [
          "b19-staerke"
        ],
        "wordBank": [
          "bei einem Konflikt",
          "würde ich",
          "zuerst",
          "beide Seiten",
          "anhören",
          "und dann",
          "nach einer fairen Lösung",
          "suchen"
        ]
      },
      {
        "id": "b19-q5",
        "type": "FOLLOW-UP",
        "context": "The interviewer invites your questions.",
        "prompt": "Ask which tasks have priority during the first three months.",
        "answers": [
          "Welche Aufgaben haben in den ersten drei Monaten Priorität?",
          "Welche Aufgaben sind in den ersten drei Monaten besonders wichtig?"
        ],
        "explanation": "A focused follow-up shows attention to the actual role.",
        "requires": [
          "b19-vorstellungsgespraech"
        ],
        "wordBank": [
          "welche Aufgaben",
          "haben",
          "in den ersten drei Monaten",
          "Priorität"
        ]
      },
      {
        "id": "b19-q6",
        "type": "GOAL",
        "context": "You are describing what you want to develop.",
        "prompt": "Say that you look forward to taking on more responsibility and leading small projects.",
        "answers": [
          "Ich freue mich darauf, mehr Verantwortung zu übernehmen und kleine Projekte zu leiten.",
          "Ich freue mich darauf, mehr Verantwortung zu uebernehmen und kleine Projekte zu leiten."
        ],
        "explanation": "Darauf points forward to the infinitive clause.",
        "requires": [
          "b19-verantwortung"
        ],
        "wordBank": [
          "ich freue mich darauf",
          "mehr Verantwortung",
          "zu übernehmen",
          "und",
          "kleine Projekte",
          "zu leiten"
        ]
      },
      {
        "id": "b19-q7",
        "type": "EMAIL",
        "context": "A week has passed since the interview.",
        "prompt": "Thank the interviewer, confirm your interest, and ask when you can expect a decision.",
        "answers": [
          "Vielen Dank für das freundliche Gespräch. Mein Interesse an der Stelle besteht weiterhin. Könnten Sie mir sagen, wann ich mit einer Entscheidung rechnen kann?",
          "Vielen Dank fuer das freundliche Gespraech. Mein Interesse an der Stelle besteht weiterhin. Koennten Sie mir sagen, wann ich mit einer Entscheidung rechnen kann?"
        ],
        "explanation": "Mit einer Entscheidung rechnen is a professional way to ask about timing.",
        "requires": [
          "b19-vorstellungsgespraech"
        ],
        "wordBank": [
          "vielen Dank",
          "für das Gespräch",
          "mein Interesse",
          "besteht weiterhin",
          "könnten Sie mir sagen",
          "wann",
          "ich mit einer Entscheidung",
          "rechnen kann"
        ]
      }
    ],
    "input": {
      "script": "Vielen Dank, Frau Mensah. Ihre Erfahrung im Kundenservice passt gut zu unserer Stelle. Mich interessiert noch, wie Sie reagieren würden, wenn zwei wichtige Anfragen gleichzeitig kommen. Danach haben Sie natürlich Zeit für Ihre Fragen zum Team und zum Arbeitsalltag.",
      "listenPrompt": "What situation should the applicant explain, and what opportunity follows?",
      "listenAnswers": [
        "Sie soll erklären, wie sie zwei wichtige Anfragen gleichzeitig behandelt; danach kann sie Fragen stellen.",
        "How she would handle two important requests at once, then she can ask questions.",
        "Zwei gleichzeitige Anfragen und danach eigene Rückfragen."
      ],
      "passage": "Projektassistenz gesucht. Sie koordinieren Termine, bereiten Besprechungen vor und kommunizieren mit Partnern im In- und Ausland. Voraussetzungen sind eine abgeschlossene Ausbildung, sehr gute Deutschkenntnisse und ein sicherer Umgang mit Tabellenkalkulationsprogrammen. Erste Berufserfahrung ist erwünscht. Wir bieten flexible Arbeitszeiten, zwei Tage mobiles Arbeiten pro Woche und eine strukturierte Einarbeitung.",
      "readPrompt": "Which qualification is desired rather than stated as a firm requirement, and what support does the employer offer?",
      "readAnswers": [
        "Erste Berufserfahrung ist erwünscht; angeboten wird eine strukturierte Einarbeitung.",
        "Initial work experience is desired, and structured onboarding is offered.",
        "Berufserfahrung; eine strukturierte Einarbeitung."
      ]
    },
    "task": {
      "writingPrompt": "Write a 110 to 140 word application email for the project assistant role. Name the position, connect two experiences or skills to its duties, explain your motivation, mention the attached CV, and request an interview.",
      "minWords": 110,
      "guide": [
        "Refer to the exact role",
        "Use evidence for two relevant strengths",
        "Connect motivation to the advertised work",
        "Mention your attachment",
        "Close with a clear interview request"
      ],
      "required": [
        "Projektassist",
        "Erfahrung",
        "weil",
        "Lebenslauf",
        "Gespräch"
      ],
      "model": "Sehr geehrte Frau Brandt,\n\nmit großem Interesse bewerbe ich mich um die Stelle als Projektassistenz. Seit drei Jahren koordiniere ich Termine und bereite Besprechungen für ein internationales Team vor. Außerdem kommuniziere ich täglich auf Deutsch und Englisch mit Kunden. Diese Erfahrung passt gut zu Ihren Anforderungen. Besonders reizt mich die Möglichkeit, an internationalen Projekten mitzuwirken und Abläufe zuverlässig zu koordinieren. Die Stelle interessiert mich auch, weil ich künftig mehr Verantwortung in der Projektarbeit übernehmen möchte. Meine strukturierte Arbeitsweise hat mir geholfen, bei mehreren Fristen den Überblick zu behalten. Meinen Lebenslauf und zwei Arbeitszeugnisse finden Sie im Anhang. Über die Einladung zu einem persönlichen Gespräch freue ich mich sehr.\n\nMit freundlichen Grüßen\nAmina Mensah",
      "speakingPrompt": "Give a two-minute interview answer. Introduce your relevant experience, support one strength with an example, explain your interest in the role, and ask one informed question.",
      "speakingGuide": [
        "Lead with the experience most relevant to the role",
        "Use a specific past example",
        "Explain your next professional goal",
        "Finish with a question about duties or onboarding"
      ],
      "speakingRequired": [
        "seit",
        "Stärke",
        "Beispiel",
        "weil",
        "Frage"
      ],
      "speakingModel": "Seit drei Jahren arbeite ich im Kundenservice und koordiniere täglich viele Anfragen. Eine meiner Stärken ist, auch unter Zeitdruck ruhig zu bleiben. Ein Beispiel: Als zwei Kollegen krank waren, habe ich die Aufgaben priorisiert und mit dem Team einen neuen Plan erstellt. Die Stelle interessiert mich, weil ich diese Erfahrung in internationalen Projekten einsetzen möchte. Welche Aufgaben haben während der Einarbeitung Priorität?"
    },
    "culture": {
      "title": "Build each application for the vacancy",
      "body": "The Federal Employment Agency recommends preparing application documents carefully and matching them to the position. The exact documents and process vary by employer. A useful application makes the link between the vacancy, your evidence, and your motivation easy to see.",
      "sourceTitle": "Bundesagentur für Arbeit: Bewerbung schreiben",
      "url": "https://www.arbeitsagentur.de/bildung/bewerbung",
      "tags": [
        "Bewerbung",
        "Lebenslauf",
        "Vorstellungsgespräch"
      ]
    },
    "prerequisite": "b1-argumentieren"
  },
  {
    "id": "b1-housing-repairs",
    "level": "B1",
    "code": "B1.10",
    "title": "Resolve a housing problem",
    "subtitle": "Document defects, request repairs, handle disagreement, and confirm arrangements.",
    "canDo": [
      "Describe a housing defect precisely and explain its impact",
      "Create a clear written record with dates and evidence",
      "Request a repair and a realistic response deadline",
      "Discuss access, responsibility, and a practical compromise"
    ],
    "grammar": [
      {
        "title": "Passive for repair actions",
        "rule": "The process passive with werden focuses on the repair or inspection rather than the person doing it.",
        "example": "Die Heizung wird morgen überprüft.",
        "translation": "The heating will be checked tomorrow."
      },
      {
        "title": "Concession with obwohl",
        "rule": "Obwohl introduces a fact that makes the main result surprising and places its verb at the end.",
        "example": "Obwohl ich den Mangel gemeldet habe, wurde er noch nicht behoben.",
        "translation": "Although I reported the defect, it has not yet been fixed."
      },
      {
        "title": "Relative clauses with prepositions",
        "rule": "When a preposition belongs to the relative clause, it appears before the relative pronoun.",
        "example": "Das ist der Raum, in dem sich Schimmel gebildet hat.",
        "translation": "That is the room in which mold has formed."
      },
      {
        "title": "Formal sequence",
        "rule": "Zunächst, anschließend, and schließlich make the chronology of a complaint easy to follow.",
        "example": "Zunächst habe ich angerufen. Anschließend habe ich Fotos geschickt.",
        "translation": "First I called. Afterwards I sent photos."
      }
    ],
    "words": [
      {
        "id": "b110-mangel",
        "de": "der Mangel, die Mängel",
        "en": "defect",
        "bundle": "der Mangel · die Mängel · einen Mangel melden",
        "example": "Der Mangel besteht seit zwei Wochen.",
        "exampleEn": "The defect has existed for two weeks.",
        "variants": [
          "der Mangel, die Maengel"
        ]
      },
      {
        "id": "b110-schimmel",
        "de": "der Schimmel (Singular)",
        "en": "mold",
        "bundle": "der Schimmel · Schimmel an der Wand",
        "example": "Im Schlafzimmer hat sich Schimmel gebildet.",
        "exampleEn": "Mold has formed in the bedroom.",
        "variants": []
      },
      {
        "id": "b110-heizung",
        "de": "die Heizung, die Heizungen",
        "en": "heating system",
        "bundle": "die Heizung · die Heizungen",
        "example": "Die Heizung bleibt trotz hoher Stufe kalt.",
        "exampleEn": "The heating stays cold despite being set high.",
        "variants": []
      },
      {
        "id": "b110-laerm",
        "de": "der Lärm (Singular)",
        "en": "noise",
        "bundle": "der Lärm · starker Lärm",
        "example": "Der Lärm beginnt häufig nach Mitternacht.",
        "exampleEn": "The noise often begins after midnight.",
        "variants": [
          "der Laerm"
        ]
      },
      {
        "id": "b110-hausverwaltung",
        "de": "die Hausverwaltung, die Hausverwaltungen",
        "en": "property management",
        "bundle": "die Hausverwaltung · die Hausverwaltungen",
        "example": "Ich habe die Hausverwaltung schriftlich informiert.",
        "exampleEn": "I informed property management in writing.",
        "variants": []
      },
      {
        "id": "b110-reparatur",
        "de": "die Reparatur, die Reparaturen",
        "en": "repair",
        "bundle": "die Reparatur · eine Reparatur veranlassen",
        "example": "Wann kann die Reparatur durchgeführt werden?",
        "exampleEn": "When can the repair be carried out?",
        "variants": [
          "Wann kann die Reparatur durchgefuehrt werden?"
        ]
      },
      {
        "id": "b110-frist",
        "de": "die Frist, die Fristen",
        "en": "deadline",
        "bundle": "die Frist · eine angemessene Frist setzen",
        "example": "Bitte antworten Sie innerhalb der genannten Frist.",
        "exampleEn": "Please reply within the stated deadline.",
        "variants": []
      },
      {
        "id": "b110-schaden",
        "de": "der Schaden, die Schäden",
        "en": "damage",
        "bundle": "der Schaden · die Schäden",
        "example": "Durch das Wasser ist ein Schaden am Boden entstanden.",
        "exampleEn": "The water caused damage to the floor.",
        "variants": [
          "der Schaden, die Schaeden"
        ]
      },
      {
        "id": "b110-nachweis",
        "de": "der Nachweis, die Nachweise",
        "en": "evidence or proof",
        "bundle": "der Nachweis · die Nachweise",
        "example": "Die Fotos dienen als Nachweis.",
        "exampleEn": "The photos serve as evidence.",
        "variants": []
      },
      {
        "id": "b110-dokumentieren",
        "de": "etwas dokumentieren",
        "en": "to document something",
        "bundle": "dokumentieren · dokumentiert · hat dokumentiert",
        "example": "Ich dokumentiere Datum, Uhrzeit und Folgen.",
        "exampleEn": "I document the date, time, and consequences.",
        "variants": []
      },
      {
        "id": "b110-beheben",
        "de": "einen Mangel beheben",
        "en": "to remedy a defect",
        "bundle": "beheben · behebt · hat behoben",
        "example": "Der Mangel sollte schnell behoben werden.",
        "exampleEn": "The defect should be remedied quickly.",
        "variants": []
      },
      {
        "id": "b110-einigen",
        "de": "sich auf etwas einigen",
        "en": "to agree on something",
        "bundle": "sich einigen auf + Akkusativ · hat sich geeinigt",
        "example": "Wir haben uns auf einen Termin geeinigt.",
        "exampleEn": "We agreed on an appointment.",
        "variants": []
      },
      {
        "id": "b110-wasserschaden",
        "de": "der Wasserschaden, die Wasserschäden",
        "en": "water damage",
        "bundle": "der Wasserschaden · die Wasserschäden",
        "example": "Der Wasserschaden muss sofort geprüft werden.",
        "exampleEn": "The water damage must be checked immediately.",
        "variants": [
          "der Wasserschaden, die Wasserschaeden"
        ],
        "supplemental": true
      },
      {
        "id": "b110-handwerker",
        "de": "der Handwerker, die Handwerker / die Handwerkerin, die Handwerkerinnen",
        "en": "tradesperson",
        "bundle": "der Handwerker · die Handwerkerin",
        "example": "Die Handwerkerin kommt zwischen acht und zehn Uhr.",
        "exampleEn": "The tradesperson is coming between eight and ten.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "b110-mietminderung",
        "de": "die Mietminderung, die Mietminderungen",
        "en": "rent reduction",
        "bundle": "die Mietminderung · rechtlichen Rat einholen",
        "example": "Vor einer Mietminderung sollte man die Rechtslage prüfen.",
        "exampleEn": "Before reducing rent, one should check the legal situation.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "b110-schriftlich",
        "de": "schriftlich",
        "en": "in writing",
        "bundle": "schriftlich · schriftlich bestätigen",
        "example": "Bitte bestätigen Sie den Termin schriftlich.",
        "exampleEn": "Please confirm the appointment in writing.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "b110-wiederholt",
        "de": "wiederholt",
        "en": "repeatedly",
        "bundle": "wiederholt · wiederholt auftreten",
        "example": "Das Problem ist wiederholt aufgetreten.",
        "exampleEn": "The problem has occurred repeatedly.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "b110-erreichbar",
        "de": "erreichbar sein",
        "en": "to be reachable",
        "bundle": "erreichbar · telefonisch erreichbar",
        "example": "Ich bin werktags ab 16 Uhr erreichbar.",
        "exampleEn": "I can be reached on weekdays after 4 p.m.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "b110-ankuendigen",
        "de": "einen Besuch ankündigen",
        "en": "to announce a visit",
        "bundle": "ankündigen · kündigt an · hat angekündigt",
        "example": "Bitte kündigen Sie den Besuch vorher an.",
        "exampleEn": "Please announce the visit in advance.",
        "variants": [
          "einen Besuch ankuendigen"
        ],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "b110-q1",
        "type": "DESCRIBE",
        "context": "The bedroom wall has developed mold.",
        "prompt": "State where the problem is and how long it has existed.",
        "answers": [
          "An der Außenwand im Schlafzimmer hat sich Schimmel gebildet, der seit zwei Wochen größer wird.",
          "An der Aussenwand im Schlafzimmer hat sich Schimmel gebildet, der seit zwei Wochen groesser wird."
        ],
        "explanation": "The relative clause adds measurable information about the mold.",
        "requires": [
          "b110-schimmel",
          "b110-mangel"
        ],
        "wordBank": [
          "an der Außenwand",
          "im Schlafzimmer",
          "hat sich",
          "Schimmel",
          "gebildet",
          "der",
          "seit zwei Wochen",
          "größer wird"
        ]
      },
      {
        "id": "b110-q2",
        "type": "CHRONOLOGY",
        "context": "You first called and then sent photos.",
        "prompt": "Describe those two steps using formal sequence words.",
        "answers": [
          "Zunächst habe ich bei der Hausverwaltung angerufen. Anschließend habe ich Fotos als Nachweis geschickt.",
          "Zunaechst habe ich bei der Hausverwaltung angerufen. Anschliessend habe ich Fotos als Nachweis geschickt."
        ],
        "explanation": "The connectors create a verifiable sequence of events.",
        "requires": [
          "b110-hausverwaltung",
          "b110-nachweis"
        ],
        "wordBank": [
          "zunächst",
          "habe ich",
          "bei der Hausverwaltung",
          "angerufen",
          "anschließend",
          "habe ich",
          "Fotos",
          "als Nachweis",
          "geschickt"
        ]
      },
      {
        "id": "b110-q3",
        "type": "CONCESSION",
        "context": "You reported the broken heating a week ago, but nothing happened.",
        "prompt": "Express the contrast with obwohl.",
        "answers": [
          "Obwohl ich die kaputte Heizung vor einer Woche gemeldet habe, wurde sie noch nicht repariert.",
          "Obwohl ich die kaputte Heizung vor einer Woche gemeldet habe, ist sie noch nicht repariert worden."
        ],
        "explanation": "The obwohl clause ends with habe, and the main clause uses passive.",
        "requires": [
          "b110-heizung",
          "b110-reparatur"
        ],
        "wordBank": [
          "obwohl",
          "ich",
          "die kaputte Heizung",
          "vor einer Woche",
          "gemeldet habe",
          "wurde sie",
          "noch nicht",
          "repariert"
        ]
      },
      {
        "id": "b110-q4",
        "type": "DEADLINE",
        "context": "Cold weather makes the heating failure urgent.",
        "prompt": "Politely request repair by Friday and ask for written confirmation.",
        "answers": [
          "Bitte veranlassen Sie die Reparatur bis Freitag und bestätigen Sie mir den Termin schriftlich.",
          "Bitte lassen Sie die Heizung bis Freitag reparieren und bestätigen Sie mir den Termin schriftlich.",
          "Bitte lassen Sie die Heizung bis Freitag reparieren und bestaetigen Sie mir den Termin schriftlich."
        ],
        "explanation": "The request names both the action and the confirmation needed.",
        "requires": [
          "b110-reparatur",
          "b110-frist"
        ],
        "wordBank": [
          "bitte",
          "veranlassen Sie",
          "die Reparatur",
          "bis Freitag",
          "und",
          "bestätigen Sie",
          "mir",
          "den Termin",
          "schriftlich"
        ]
      },
      {
        "id": "b110-q5",
        "type": "ACCESS",
        "context": "A tradesperson can come while you are at work.",
        "prompt": "Say when you are reachable and request advance notice of the visit.",
        "answers": [
          "Ich bin werktags ab 16 Uhr erreichbar. Bitte kündigen Sie den Besuch des Handwerkers vorher an.",
          "Ich bin werktags ab 16 Uhr erreichbar. Bitte kuendigen Sie den Besuch des Handwerkers vorher an."
        ],
        "explanation": "The message provides a contact window and a clear access request.",
        "requires": [
          "b110-hausverwaltung",
          "b110-reparatur"
        ],
        "wordBank": [
          "ich bin",
          "werktags",
          "ab 16 Uhr",
          "erreichbar",
          "bitte",
          "kündigen Sie",
          "den Besuch",
          "vorher",
          "an"
        ]
      },
      {
        "id": "b110-q6",
        "type": "IMPACT",
        "context": "A leak has damaged the floor.",
        "prompt": "Explain that the water caused damage and that you documented it with photos.",
        "answers": [
          "Durch das Wasser ist ein Schaden am Boden entstanden, den ich mit Fotos dokumentiert habe."
        ],
        "explanation": "Den refers to the masculine accusative noun Schaden.",
        "requires": [
          "b110-schaden",
          "b110-dokumentieren"
        ],
        "wordBank": [
          "durch das Wasser",
          "ist",
          "ein Schaden",
          "am Boden",
          "entstanden",
          "den",
          "ich",
          "mit Fotos",
          "dokumentiert habe"
        ]
      },
      {
        "id": "b110-q7",
        "type": "COMPROMISE",
        "context": "You cannot offer access in the morning; management cannot come late.",
        "prompt": "Suggest Wednesday at 13:00 and ask whether you can agree on that time.",
        "answers": [
          "Ich könnte am Mittwoch um 13 Uhr zu Hause sein. Können wir uns auf diesen Termin einigen?",
          "Ich koennte am Mittwoch um 13 Uhr zu Hause sein. Koennen wir uns auf diesen Termin einigen?"
        ],
        "explanation": "Sich einigen auf names the proposed agreement.",
        "requires": [
          "b110-einigen"
        ],
        "wordBank": [
          "ich könnte",
          "am Mittwoch",
          "um 13 Uhr",
          "zu Hause sein",
          "können wir",
          "uns",
          "auf diesen Termin",
          "einigen"
        ]
      }
    ],
    "input": {
      "script": "Guten Tag, hier ist die Hausverwaltung. Wir haben Ihre Fotos vom Wasserschaden erhalten. Eine Handwerkerin kann am Donnerstag zwischen acht und zehn Uhr kommen. Dafür braucht sie Zugang zum Badezimmer. Bitte rufen Sie uns heute zurück und teilen Sie mit, ob der Termin möglich ist.",
      "listenPrompt": "What access is needed, and what should the tenant do today?",
      "listenAnswers": [
        "Zugang zum Badezimmer; heute zurückrufen und den Termin bestätigen oder besprechen.",
        "Access to the bathroom, and call back today about the appointment.",
        "Die Handwerkerin braucht Zugang zum Bad; der Mieter soll zurückrufen."
      ],
      "passage": "Mängelmeldung vom 4. Februar: Seit dem 1. Februar bleibt die Heizung im Wohnzimmer kalt. Am 4. Februar wurde der Mangel telefonisch gemeldet. Am 6. Februar wurden Fotos des Thermometers per E-Mail geschickt. Die Hausverwaltung bestätigte den Eingang, nannte aber bisher keinen Reparaturtermin. Für Rückfragen ist die Mieterin werktags ab 16 Uhr erreichbar.",
      "readPrompt": "Which evidence was sent, and which important information is still missing?",
      "readAnswers": [
        "Fotos des Thermometers wurden geschickt; ein Reparaturtermin fehlt.",
        "Photos of the thermometer were sent, and a repair date is still missing.",
        "Thermometerfotos; der Reparaturtermin."
      ]
    },
    "task": {
      "writingPrompt": "Write a 120 to 155 word formal defect notice. Describe the defect, say when it began and when you first reported it, explain its impact, name attached evidence, request inspection or repair by a clear date, give access times, and ask for written confirmation.",
      "minWords": 120,
      "guide": [
        "Use a precise subject line",
        "Present events in date order",
        "Separate observation from assumptions about the cause",
        "Request a concrete action and response date",
        "State when access is possible"
      ],
      "required": [
        "Mangel",
        "seit",
        "gemeldet",
        "Fotos",
        "bis",
        "schriftlich"
      ],
      "model": "Betreff: Mängelmeldung zur Heizung in Wohnung 14\n\nSehr geehrte Damen und Herren,\n\nseit dem 1. Februar bleibt die Heizung im Wohnzimmer vollständig kalt. Den Mangel habe ich am 4. Februar telefonisch gemeldet. Obwohl mir ein Rückruf zugesagt wurde, habe ich bisher keinen Termin erhalten. Die Raumtemperatur lag an drei Abenden unter 17 Grad. Die niedrige Temperatur beeinträchtigt die Nutzung des Wohnzimmers, besonders abends und am Wochenende. Fotos des Thermometers mit Datum finden Sie im Anhang. Bitte lassen Sie die Heizung bis zum 12. Februar überprüfen und teilen Sie mir bis zum 8. Februar einen Termin mit. Zugang ist werktags ab 16 Uhr oder nach Absprache mittwochs ab 13 Uhr möglich. Bitte bestätigen Sie den Eingang dieser Nachricht schriftlich.\n\nMit freundlichen Grüßen\nSara Nguyen",
      "speakingPrompt": "Call property management about an unresolved defect. Give the timeline, explain the current impact, respond to one proposed appointment, and summarize the agreement.",
      "speakingGuide": [
        "Identify the apartment and defect",
        "Give dates in order",
        "Describe the practical impact",
        "Negotiate access",
        "Repeat the agreed next step"
      ],
      "speakingRequired": [
        "seit",
        "gemeldet",
        "kalt",
        "Termin",
        "also"
      ],
      "speakingModel": "Ich rufe wegen der Heizung in Wohnung 14 an. Sie ist seit dem 1. Februar kalt, und ich habe den Mangel am 4. Februar gemeldet. Im Wohnzimmer sind es abends nur 17 Grad. Donnerstagvormittag bin ich bei der Arbeit, aber um 13 Uhr könnte ich zu Hause sein. Gut, also kommt die Handwerkerin Donnerstag um 13 Uhr, und Sie bestätigen mir den Termin per E-Mail."
    },
    "culture": {
      "title": "Keep the record factual",
      "body": "German tenancy questions depend on the contract, the defect, notice, and the individual circumstances. A factual record with dates, photos, messages, and access offers supports communication and any later advice. Seek qualified guidance before taking legal steps such as reducing rent.",
      "sourceTitle": "Federal Ministry of Justice: Mietrecht",
      "url": "https://www.bmj.de/DE/themen/verbraucherschutz/kaufen_reisen_wohnen/mietrecht/mietrecht_node.html",
      "tags": [
        "Mängelmeldung",
        "Nachweis",
        "Mietrecht"
      ]
    },
    "prerequisite": "b1-job-applications"
  },
  {
    "id": "b1-media-comparison",
    "level": "B1",
    "code": "B1.11",
    "title": "Compare reports and sources",
    "subtitle": "Separate claims from evidence, trace information, and summarize differing accounts.",
    "canDo": [
      "Identify the source, date, main claim, and evidence in a report",
      "Distinguish a reported statement from a verified fact",
      "Compare how two sources frame the same event",
      "Give a cautious summary and explain what still needs confirmation"
    ],
    "grammar": [
      {
        "title": "Reported speech with Konjunktiv I",
        "rule": "Journalistic German often uses Konjunktiv I to mark information as someone else's statement.",
        "example": "Die Sprecherin sagt, die Maßnahme sei notwendig.",
        "translation": "The spokesperson says the measure is necessary."
      },
      {
        "title": "Source-focused passive",
        "rule": "Passive forms can describe how information was collected, published, or confirmed.",
        "example": "Die Zahlen wurden gestern veröffentlicht.",
        "translation": "The figures were published yesterday."
      },
      {
        "title": "Structured comparison",
        "rule": "Während contrasts two accounts inside one sentence. Dagegen and hingegen connect contrasting main clauses.",
        "example": "Während Quelle A die Kosten betont, berichtet Quelle B über den Nutzen.",
        "translation": "While source A emphasizes the costs, source B reports on the benefit."
      },
      {
        "title": "Cautious conclusions",
        "rule": "Expressions such as laut, vermutlich, offenbar, and bisher let you show the strength and limits of available evidence.",
        "example": "Laut dem Bericht ist die Ursache bisher unklar.",
        "translation": "According to the report, the cause is still unclear."
      }
    ],
    "words": [
      {
        "id": "b111-quelle",
        "de": "die Quelle, die Quellen",
        "en": "source",
        "bundle": "die Quelle · die Quellen · laut einer Quelle",
        "example": "Der Artikel nennt drei unabhängige Quellen.",
        "exampleEn": "The article names three independent sources.",
        "variants": [
          "Der Artikel nennt drei unabhaengige Quellen."
        ]
      },
      {
        "id": "b111-schlagzeile",
        "de": "die Schlagzeile, die Schlagzeilen",
        "en": "headline",
        "bundle": "die Schlagzeile · die Schlagzeilen",
        "example": "Die Schlagzeile vereinfacht das Ergebnis stark.",
        "exampleEn": "The headline greatly simplifies the result.",
        "variants": []
      },
      {
        "id": "b111-bericht",
        "de": "der Bericht, die Berichte",
        "en": "report",
        "bundle": "der Bericht · die Berichte · einem Bericht zufolge",
        "example": "Der Bericht wurde am Dienstag veröffentlicht.",
        "exampleEn": "The report was published on Tuesday.",
        "variants": [
          "Der Bericht wurde am Dienstag veroeffentlicht."
        ]
      },
      {
        "id": "b111-behauptung",
        "de": "die Behauptung, die Behauptungen",
        "en": "claim",
        "bundle": "die Behauptung · eine Behauptung prüfen",
        "example": "Für diese Behauptung fehlt ein Beleg.",
        "exampleEn": "There is no evidence given for this claim.",
        "variants": [
          "Fuer diese Behauptung fehlt ein Beleg."
        ]
      },
      {
        "id": "b111-beleg",
        "de": "der Beleg, die Belege",
        "en": "evidence",
        "bundle": "der Beleg · die Belege",
        "example": "Die Studie dient als Beleg für die Aussage.",
        "exampleEn": "The study serves as evidence for the statement.",
        "variants": [
          "als Beleg fuer die Aussage"
        ]
      },
      {
        "id": "b111-perspektive",
        "de": "die Perspektive, die Perspektiven",
        "en": "perspective",
        "bundle": "die Perspektive · verschiedene Perspektiven",
        "example": "Im Beitrag fehlen die Perspektiven der Anwohner.",
        "exampleEn": "The perspectives of residents are missing from the piece.",
        "variants": []
      },
      {
        "id": "b111-nachrichtensendung",
        "de": "die Nachrichtensendung, die Nachrichtensendungen",
        "en": "news broadcast",
        "bundle": "die Nachrichtensendung · die Nachrichtensendungen",
        "example": "Die Nachrichtensendung beginnt um 20 Uhr.",
        "exampleEn": "The news broadcast begins at 8 p.m.",
        "variants": []
      },
      {
        "id": "b111-kommentar",
        "de": "der Kommentar, die Kommentare",
        "en": "commentary or opinion piece",
        "bundle": "der Kommentar · die Kommentare",
        "example": "Der Text ist als Kommentar gekennzeichnet.",
        "exampleEn": "The text is labeled as commentary.",
        "variants": []
      },
      {
        "id": "b111-glaubwuerdig",
        "de": "glaubwürdig",
        "en": "credible",
        "bundle": "glaubwürdig · eine glaubwürdige Quelle",
        "example": "Die Angabe wirkt glaubwürdig, weil sie überprüfbar ist.",
        "exampleEn": "The information seems credible because it can be checked.",
        "variants": [
          "glaubwuerdig"
        ]
      },
      {
        "id": "b111-vergleichen",
        "de": "Quellen vergleichen",
        "en": "to compare sources",
        "bundle": "vergleichen · vergleicht · hat verglichen",
        "example": "Ich vergleiche die Meldung mit dem Originalbericht.",
        "exampleEn": "I compare the news item with the original report.",
        "variants": []
      },
      {
        "id": "b111-bestaetigen",
        "de": "eine Information bestätigen",
        "en": "to confirm information",
        "bundle": "bestätigen · bestätigt · hat bestätigt",
        "example": "Zwei Behörden haben die Zahl bestätigt.",
        "exampleEn": "Two authorities confirmed the figure.",
        "variants": [
          "eine Information bestaetigen"
        ]
      },
      {
        "id": "b111-zitieren",
        "de": "jemanden oder etwas zitieren",
        "en": "to quote someone or something",
        "bundle": "zitieren · zitiert · hat zitiert",
        "example": "Der Artikel zitiert die Leiterin der Studie.",
        "exampleEn": "The article quotes the head of the study.",
        "variants": []
      },
      {
        "id": "b111-redaktion",
        "de": "die Redaktion, die Redaktionen",
        "en": "editorial office",
        "bundle": "die Redaktion · die Redaktionen",
        "example": "Die Redaktion hat den Fehler korrigiert.",
        "exampleEn": "The editorial office corrected the error.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "b111-autor",
        "de": "der Autor, die Autoren / die Autorin, die Autorinnen",
        "en": "author",
        "bundle": "der Autor · die Autorin · die Autoren",
        "example": "Die Autorin verlinkt ihre Datengrundlage.",
        "exampleEn": "The author links to the underlying data.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "b111-statistik",
        "de": "die Statistik, die Statistiken",
        "en": "statistic",
        "bundle": "die Statistik · die Statistiken",
        "example": "Die Statistik umfasst den Zeitraum von 2019 bis 2024.",
        "exampleEn": "The statistics cover the period from 2019 to 2024.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "b111-veroeffentlichung",
        "de": "die Veröffentlichung, die Veröffentlichungen",
        "en": "publication",
        "bundle": "die Veröffentlichung · das Veröffentlichungsdatum",
        "example": "Das Datum der Veröffentlichung ist klar angegeben.",
        "exampleEn": "The publication date is clearly stated.",
        "variants": [
          "die Veroeffentlichung, die Veroeffentlichungen"
        ],
        "supplemental": true
      },
      {
        "id": "b111-einordnen",
        "de": "eine Information einordnen",
        "en": "to put information into context",
        "bundle": "einordnen · ordnet ein · hat eingeordnet",
        "example": "Eine Fachperson ordnet die Zahlen ein.",
        "exampleEn": "An expert puts the figures into context.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "b111-ueberpruefen",
        "de": "eine Angabe überprüfen",
        "en": "to verify a statement",
        "bundle": "überprüfen · überprüft · hat überprüft",
        "example": "Die zentrale Angabe lässt sich im Bericht überprüfen.",
        "exampleEn": "The central statement can be checked in the report.",
        "variants": [
          "eine Angabe ueberpruefen"
        ],
        "supplemental": true
      },
      {
        "id": "b111-berichten",
        "de": "über etwas berichten",
        "en": "to report on something",
        "bundle": "berichten über + Akkusativ · hat berichtet",
        "example": "Mehrere Medien berichten über die Entscheidung.",
        "exampleEn": "Several media outlets report on the decision.",
        "variants": [
          "ueber etwas berichten"
        ],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "b111-q1",
        "type": "ATTRIBUTION",
        "context": "A city spokesperson makes a claim that you cannot verify yet.",
        "prompt": "Report that she says the measure is necessary.",
        "answers": [
          "Die Sprecherin sagt, die Maßnahme sei notwendig.",
          "Die Sprecherin sagt, die Massnahme sei notwendig."
        ],
        "explanation": "Sei marks the statement as attributed speech.",
        "requires": [
          "b111-behauptung",
          "b111-quelle"
        ],
        "wordBank": [
          "die Sprecherin",
          "sagt",
          "die Maßnahme",
          "sei",
          "notwendig"
        ]
      },
      {
        "id": "b111-q2",
        "type": "EVIDENCE",
        "context": "A post gives a dramatic number without a link.",
        "prompt": "Say that the claim cannot yet be verified because the source is missing.",
        "answers": [
          "Die Behauptung lässt sich bisher nicht überprüfen, weil die Quelle fehlt.",
          "Die Behauptung laesst sich bisher nicht ueberpruefen, weil die Quelle fehlt."
        ],
        "explanation": "Bisher limits the conclusion to the available evidence.",
        "requires": [
          "b111-behauptung",
          "b111-quelle"
        ],
        "wordBank": [
          "die Behauptung",
          "lässt sich",
          "bisher",
          "nicht überprüfen",
          "weil",
          "die Quelle",
          "fehlt"
        ]
      },
      {
        "id": "b111-q3",
        "type": "COMPARE",
        "context": "Two reports emphasize different aspects of a transit project.",
        "prompt": "Say that source A emphasizes the cost, while source B reports on the expected benefit.",
        "answers": [
          "Während Quelle A die Kosten betont, berichtet Quelle B über den erwarteten Nutzen.",
          "Waehrend Quelle A die Kosten betont, berichtet Quelle B ueber den erwarteten Nutzen."
        ],
        "explanation": "Während builds a balanced contrast within one sentence.",
        "requires": [
          "b111-quelle"
        ],
        "wordBank": [
          "während",
          "Quelle A",
          "die Kosten",
          "betont",
          "berichtet",
          "Quelle B",
          "über den erwarteten Nutzen"
        ]
      },
      {
        "id": "b111-q4",
        "type": "PUBLICATION",
        "context": "The figures appeared yesterday and were checked by two agencies.",
        "prompt": "State both facts in the passive.",
        "answers": [
          "Die Zahlen wurden gestern veröffentlicht und von zwei Behörden bestätigt.",
          "Die Zahlen wurden gestern veroeffentlicht und von zwei Behoerden bestaetigt."
        ],
        "explanation": "One auxiliary wurden governs both passive participles.",
        "requires": [
          "b111-bericht",
          "b111-bestaetigen"
        ],
        "wordBank": [
          "die Zahlen",
          "wurden",
          "gestern",
          "veröffentlicht",
          "und",
          "von zwei Behörden",
          "bestätigt"
        ]
      },
      {
        "id": "b111-q5",
        "type": "MISSING VIEW",
        "context": "A report quotes officials and a company, but no residents.",
        "prompt": "Point out which perspective is missing.",
        "answers": [
          "Der Bericht zitiert Behörden und das Unternehmen, aber die Perspektive der Anwohner fehlt.",
          "Im Bericht werden Behörden und das Unternehmen zitiert; die Perspektive der Anwohner fehlt."
        ],
        "explanation": "The sentence names who appears and who is absent from the account.",
        "requires": [
          "b111-zitieren",
          "b111-perspektive"
        ],
        "wordBank": [
          "der Bericht",
          "zitiert",
          "Behörden",
          "und das Unternehmen",
          "aber",
          "die Perspektive",
          "der Anwohner",
          "fehlt"
        ]
      },
      {
        "id": "b111-q6",
        "type": "CAUTION",
        "context": "Early reporting agrees that a road is closed, but the cause is uncertain.",
        "prompt": "Give a cautious two-part summary.",
        "answers": [
          "Mehrere Quellen bestätigen, dass die Straße gesperrt ist. Die Ursache ist bisher unklar.",
          "Mehrere Quellen bestaetigen, dass die Strasse gesperrt ist. Die Ursache ist bisher unklar."
        ],
        "explanation": "The first sentence states the confirmed point; the second marks the limit.",
        "requires": [
          "b111-quelle",
          "b111-bestaetigen"
        ],
        "wordBank": [
          "mehrere Quellen",
          "bestätigen",
          "dass",
          "die Straße",
          "gesperrt ist",
          "die Ursache",
          "ist",
          "bisher unklar"
        ]
      },
      {
        "id": "b111-q7",
        "type": "CLARIFY",
        "context": "A colleague shares a headline with no date or link.",
        "prompt": "Ask who published it, when it appeared, and whether the original report is available.",
        "answers": [
          "Wer hat den Beitrag veröffentlicht, wann ist er erschienen, und gibt es einen Link zum Originalbericht?",
          "Wer hat den Beitrag veroeffentlicht, wann ist er erschienen, und gibt es einen Link zum Originalbericht?"
        ],
        "explanation": "These questions test origin, recency, and traceability.",
        "requires": [
          "b111-bericht"
        ],
        "wordBank": [
          "wer",
          "hat",
          "den Beitrag",
          "veröffentlicht",
          "wann",
          "ist er",
          "erschienen",
          "und",
          "gibt es",
          "einen Link",
          "zum Originalbericht"
        ]
      }
    ],
    "input": {
      "script": "Die Stadt hat heute erste Zahlen zum neuen Busnetz veröffentlicht. Laut Verkehrsdezernentin seien die Fahrgastzahlen in den ersten drei Monaten um acht Prozent gestiegen. Ein unabhängiges Institut hat die Berechnung bisher nicht geprüft. Die vollständigen Daten sollen nächste Woche veröffentlicht werden.",
      "listenPrompt": "Which point is currently attributed to the official, and what evidence is still pending?",
      "listenAnswers": [
        "Der Anstieg um acht Prozent ist ihre Aussage; eine unabhängige Prüfung und die vollständigen Daten fehlen noch.",
        "The eight percent increase is her statement; independent review and full data are still pending.",
        "Acht Prozent mehr Fahrgäste; unabhängige Prüfung und vollständige Daten fehlen."
      ],
      "passage": "Quelle A: Die Stadtbibliothek verlängert ab Mai ihre Öffnungszeiten am Abend. Laut Stadt sollen Berufstätige dadurch leichter Zugang erhalten. Die Mehrkosten werden mit 120.000 Euro pro Jahr angegeben. Quelle B: Eine Umfrage des Fördervereins unter 640 Nutzern zeigt große Zustimmung zu längeren Öffnungszeiten. Der Beitrag nennt jedoch keine Rücklaufquote und erklärt nicht, wie die Teilnehmenden ausgewählt wurden.",
      "readPrompt": "Which evidence does each source provide, and which limitation is named for source B?",
      "readAnswers": [
        "Quelle A nennt Ziel und Kosten; Quelle B nennt eine Umfrage mit 640 Nutzern, aber Auswahl und Rücklaufquote fehlen.",
        "Source A gives the aim and cost; source B cites a 640-user survey, but sampling and response rate are missing.",
        "A: Ziel und 120.000 Euro Kosten. B: 640 Befragte; Auswahl und Rücklaufquote fehlen."
      ]
    },
    "task": {
      "writingPrompt": "Write a 130 to 165 word comparison of the two library sources. State the shared topic, summarize each source and its evidence, identify one limitation, separate attributed claims from confirmed details, and finish with one question you would investigate next.",
      "minWords": 130,
      "guide": [
        "Name each source clearly",
        "Use at least one comparison connector",
        "Attribute claims to their speaker or publication",
        "Identify the evidence and its limits",
        "End with a concrete verification question"
      ],
      "required": [
        "Quelle A",
        "Quelle B",
        "während",
        "laut",
        "Beleg",
        "?"
      ],
      "model": "Beide Quellen berichten über die längeren Öffnungszeiten der Stadtbibliothek. Quelle A konzentriert sich auf die Entscheidung der Stadt. Laut Stadt sollen vor allem Berufstätige profitieren; außerdem nennt der Text jährliche Mehrkosten von 120.000 Euro. Während Quelle A Ziel und Kosten beschreibt, liefert Quelle B eine Umfrage als Beleg für die Zustimmung. An dieser Umfrage nahmen 640 Bibliotheksnutzer teil. Ihre Aussagekraft lässt sich jedoch schwer einordnen, weil weder die Auswahl der Teilnehmenden noch die Rücklaufquote erklärt wird. Bestätigt ist in beiden Texten, dass die Öffnungszeiten ab Mai verlängert werden. Die erwartete Wirkung bleibt eine Prognose. Für eine belastbare Bewertung bräuchte man außerdem Angaben zur bisherigen Abendnutzung und zu den geplanten Personalkosten der Bibliothek. Als Nächstes würde ich prüfen: Wie wurden die 640 Teilnehmenden ausgewählt, und veröffentlicht die Stadt später tatsächliche Nutzungszahlen?",
      "speakingPrompt": "Give a two-minute source briefing. State what is confirmed, attribute two claims, compare the evidence, identify one missing perspective, and recommend a next check.",
      "speakingGuide": [
        "Open with the shared event",
        "Separate fact, claim, and interpretation",
        "Name the source for every major claim",
        "Explain one evidence gap",
        "Recommend a specific verification step"
      ],
      "speakingRequired": [
        "bestätigt",
        "laut",
        "Quelle",
        "während",
        "überprüfen"
      ],
      "speakingModel": "Bestätigt ist, dass die Bibliothek ihre Öffnungszeiten ab Mai verlängert. Laut Stadt sollen Berufstätige davon profitieren. Quelle A nennt zusätzlich die Kosten. Quelle B berichtet über große Zustimmung in einer Umfrage, während wichtige Angaben zur Auswahl fehlen. Die Perspektive der Beschäftigten kommt in beiden Texten kaum vor. Ich würde deshalb die vollständige Umfrage überprüfen und die Bibliothek nach Personal- und Nutzungszahlen fragen."
    },
    "culture": {
      "title": "Germany has a plural media landscape",
      "body": "People in Germany encounter public-service, private, local, national, print, broadcast, and digital media. Formats also differ: a report, interview, commentary, and press release serve different purposes. Source comparison begins with authorship, date, genre, evidence, and access to the original material.",
      "sourceTitle": "Bundeszentrale für politische Bildung: Medienpolitik",
      "url": "https://www.bpb.de/themen/medien-journalismus/medienpolitik/",
      "tags": [
        "Quelle",
        "Medien",
        "Einordnung"
      ]
    },
    "prerequisite": "b1-housing-repairs"
  },
  {
    "id": "b1-healthcare-decisions",
    "level": "B1",
    "code": "B1.12",
    "title": "Explain symptoms and weigh care options",
    "subtitle": "Give a clear history, understand a treatment plan, and ask informed follow-up questions.",
    "canDo": [
      "Describe symptoms with duration, intensity, triggers, and change over time",
      "Understand the main steps in a diagnosis or treatment plan",
      "Ask about benefits, risks, alternatives, and warning signs",
      "Repeat instructions accurately and choose an appropriate next contact"
    ],
    "grammar": [
      {
        "title": "Ongoing symptoms with seit",
        "rule": "Use present tense with seit for symptoms that began earlier and continue now.",
        "example": "Seit drei Tagen habe ich starke Halsschmerzen.",
        "translation": "I have had a severe sore throat for three days."
      },
      {
        "title": "Change with werden",
        "rule": "Werden plus an adjective describes a change in condition.",
        "example": "Abends werden die Schmerzen stärker.",
        "translation": "In the evening the pain becomes stronger."
      },
      {
        "title": "Questions inside statements",
        "rule": "Indirect questions with ob, wann, wie, and welche end with the finite verb.",
        "example": "Ich möchte wissen, welche Nebenwirkungen auftreten können.",
        "translation": "I would like to know which side effects can occur."
      },
      {
        "title": "Options with Konjunktiv II",
        "rule": "Könnte, sollte, and würde help discuss possibilities, recommendations, and hypothetical reactions.",
        "example": "Was sollte ich tun, wenn das Fieber steigt?",
        "translation": "What should I do if the fever rises?"
      }
    ],
    "words": [
      {
        "id": "b112-symptom",
        "de": "das Symptom, die Symptome",
        "en": "symptom",
        "bundle": "das Symptom · die Symptome",
        "example": "Wann sind die Symptome zum ersten Mal aufgetreten?",
        "exampleEn": "When did the symptoms first occur?",
        "variants": []
      },
      {
        "id": "b112-diagnose",
        "de": "die Diagnose, die Diagnosen",
        "en": "diagnosis",
        "bundle": "die Diagnose · eine Diagnose stellen",
        "example": "Für eine sichere Diagnose ist eine Untersuchung nötig.",
        "exampleEn": "An examination is needed for a reliable diagnosis.",
        "variants": [
          "Fuer eine sichere Diagnose ist eine Untersuchung noetig."
        ]
      },
      {
        "id": "b112-behandlung",
        "de": "die Behandlung, die Behandlungen",
        "en": "treatment",
        "bundle": "die Behandlung · die Behandlungen",
        "example": "Welche Behandlung empfehlen Sie?",
        "exampleEn": "Which treatment do you recommend?",
        "variants": []
      },
      {
        "id": "b112-nebenwirkung",
        "de": "die Nebenwirkung, die Nebenwirkungen",
        "en": "side effect",
        "bundle": "die Nebenwirkung · die Nebenwirkungen",
        "example": "Welche Nebenwirkungen können auftreten?",
        "exampleEn": "Which side effects can occur?",
        "variants": [
          "Welche Nebenwirkungen koennen auftreten?"
        ]
      },
      {
        "id": "b112-ueberweisung",
        "de": "die Überweisung, die Überweisungen",
        "en": "medical referral",
        "bundle": "die Überweisung · eine Überweisung bekommen",
        "example": "Sie erhalten eine Überweisung zum Facharzt.",
        "exampleEn": "You receive a referral to a specialist.",
        "variants": [
          "die Ueberweisung, die Ueberweisungen"
        ]
      },
      {
        "id": "b112-krankschreibung",
        "de": "die Krankschreibung, die Krankschreibungen",
        "en": "medical certificate of incapacity for work",
        "bundle": "die Krankschreibung · krankgeschrieben sein",
        "example": "Die Krankschreibung gilt bis Freitag.",
        "exampleEn": "The sick note is valid through Friday.",
        "variants": []
      },
      {
        "id": "b112-risiko",
        "de": "das Risiko, die Risiken",
        "en": "risk",
        "bundle": "das Risiko · die Risiken · ein Risiko abwägen",
        "example": "Wie hoch ist das Risiko einer Komplikation?",
        "exampleEn": "How high is the risk of a complication?",
        "variants": []
      },
      {
        "id": "b112-moeglichkeit",
        "de": "die Möglichkeit, die Möglichkeiten",
        "en": "option or possibility",
        "bundle": "die Möglichkeit · die Möglichkeiten",
        "example": "Welche anderen Möglichkeiten gibt es?",
        "exampleEn": "What other options are there?",
        "variants": [
          "die Moeglichkeit, die Moeglichkeiten"
        ]
      },
      {
        "id": "b112-verbessern",
        "de": "sich verbessern",
        "en": "to improve",
        "bundle": "sich verbessern · verbessert sich · hat sich verbessert",
        "example": "Die Beweglichkeit hat sich deutlich verbessert.",
        "exampleEn": "Mobility has improved significantly.",
        "variants": []
      },
      {
        "id": "b112-verschlimmern",
        "de": "sich verschlimmern",
        "en": "to worsen",
        "bundle": "sich verschlimmern · verschlimmert sich · hat sich verschlimmert",
        "example": "Die Beschwerden haben sich über Nacht verschlimmert.",
        "exampleEn": "The symptoms worsened overnight.",
        "variants": [
          "Die Beschwerden haben sich ueber Nacht verschlimmert."
        ]
      },
      {
        "id": "b112-schildern",
        "de": "Beschwerden schildern",
        "en": "to describe symptoms",
        "bundle": "schildern · schildert · hat geschildert",
        "example": "Schildern Sie bitte genau, wann der Schmerz beginnt.",
        "exampleEn": "Please describe exactly when the pain begins.",
        "variants": []
      },
      {
        "id": "b112-entscheiden",
        "de": "sich für etwas entscheiden",
        "en": "to decide on something",
        "bundle": "sich entscheiden für + Akkusativ · hat sich entschieden",
        "example": "Nach dem Gespräch entscheide ich mich für eine Behandlung.",
        "exampleEn": "After the discussion I decide on a treatment.",
        "variants": [
          "sich fuer etwas entscheiden"
        ]
      },
      {
        "id": "b112-dosierung",
        "de": "die Dosierung, die Dosierungen",
        "en": "dosage",
        "bundle": "die Dosierung · die Dosierung beachten",
        "example": "Die Dosierung steht auf dem Plan.",
        "exampleEn": "The dosage is stated on the plan.",
        "variants": [],
        "supplemental": true
      },
      {
        "id": "b112-facharzt",
        "de": "der Facharzt, die Fachärzte / die Fachärztin, die Fachärztinnen",
        "en": "specialist physician",
        "bundle": "der Facharzt · die Fachärztin",
        "example": "Der Hausarzt überweist mich zu einer Fachärztin.",
        "exampleEn": "The general practitioner refers me to a specialist.",
        "variants": [
          "der Facharzt, die Fachaerzte"
        ],
        "supplemental": true
      },
      {
        "id": "b112-hausarzt",
        "de": "der Hausarzt, die Hausärzte / die Hausärztin, die Hausärztinnen",
        "en": "general practitioner",
        "bundle": "der Hausarzt · die Hausärztin",
        "example": "Meine Hausärztin kennt meine Vorgeschichte.",
        "exampleEn": "My general practitioner knows my medical history.",
        "variants": [
          "der Hausarzt, die Hausaerzte"
        ],
        "supplemental": true
      },
      {
        "id": "b112-untersuchung",
        "de": "die Untersuchung, die Untersuchungen",
        "en": "examination",
        "bundle": "die Untersuchung · die Untersuchungen",
        "example": "Die Untersuchung dauert ungefähr zwanzig Minuten.",
        "exampleEn": "The examination takes about twenty minutes.",
        "variants": [
          "ungefaehr zwanzig Minuten"
        ],
        "supplemental": true
      },
      {
        "id": "b112-vertragen",
        "de": "ein Medikament vertragen",
        "en": "to tolerate a medication",
        "bundle": "vertragen · verträgt · hat vertragen",
        "example": "Ich habe das Medikament bisher gut vertragen.",
        "exampleEn": "I have tolerated the medication well so far.",
        "variants": [
          "vertragen · vertraegt"
        ],
        "supplemental": true
      },
      {
        "id": "b112-abwaegen",
        "de": "Nutzen und Risiken abwägen",
        "en": "to weigh benefits and risks",
        "bundle": "abwägen · wägt ab · hat abgewogen",
        "example": "Wir wägen Nutzen und Risiken gemeinsam ab.",
        "exampleEn": "We weigh the benefits and risks together.",
        "variants": [
          "Nutzen und Risiken abwaegen"
        ],
        "supplemental": true
      },
      {
        "id": "b112-nachfragen",
        "de": "bei Unklarheit nachfragen",
        "en": "to ask for clarification",
        "bundle": "nachfragen · fragt nach · hat nachgefragt",
        "example": "Wenn etwas unklar ist, frage ich noch einmal nach.",
        "exampleEn": "If something is unclear, I ask again.",
        "variants": [],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "b112-q1",
        "type": "HISTORY",
        "context": "Your throat has hurt for three days and is worse in the evening.",
        "prompt": "Describe the duration and change.",
        "answers": [
          "Seit drei Tagen habe ich Halsschmerzen, die abends stärker werden.",
          "Seit drei Tagen habe ich Halsschmerzen, die abends staerker werden."
        ],
        "explanation": "Present tense after seit shows an ongoing symptom; the relative clause adds its pattern.",
        "requires": [
          "b112-symptom",
          "b112-schildern"
        ],
        "wordBank": [
          "seit drei Tagen",
          "habe ich",
          "Halsschmerzen",
          "die",
          "abends",
          "stärker werden"
        ]
      },
      {
        "id": "b112-q2",
        "type": "CHANGE",
        "context": "The pain was mild yesterday and became much stronger overnight.",
        "prompt": "Explain that change.",
        "answers": [
          "Gestern waren die Schmerzen noch leicht, aber über Nacht haben sie sich deutlich verschlimmert.",
          "Gestern waren die Schmerzen noch leicht, aber ueber Nacht haben sie sich deutlich verschlimmert."
        ],
        "explanation": "Sich verschlimmern names a change toward a worse condition.",
        "requires": [
          "b112-verschlimmern"
        ],
        "wordBank": [
          "gestern",
          "waren",
          "die Schmerzen",
          "noch leicht",
          "aber",
          "über Nacht",
          "haben sie sich",
          "deutlich verschlimmert"
        ]
      },
      {
        "id": "b112-q3",
        "type": "SIDE EFFECTS",
        "context": "A clinician recommends a new medication.",
        "prompt": "Ask which side effects can occur and what you should do if you notice them.",
        "answers": [
          "Welche Nebenwirkungen können auftreten, und was sollte ich tun, wenn ich sie bemerke?",
          "Welche Nebenwirkungen koennen auftreten, und was sollte ich tun, wenn ich sie bemerke?"
        ],
        "explanation": "The wenn clause places bemerke at the end.",
        "requires": [
          "b112-nebenwirkung"
        ],
        "wordBank": [
          "welche Nebenwirkungen",
          "können",
          "auftreten",
          "und",
          "was",
          "sollte ich",
          "tun",
          "wenn",
          "ich sie",
          "bemerke"
        ]
      },
      {
        "id": "b112-q4",
        "type": "ALTERNATIVES",
        "context": "You want to understand the choices before deciding.",
        "prompt": "Ask what other treatment options exist and how their risks differ.",
        "answers": [
          "Welche anderen Behandlungsmöglichkeiten gibt es, und wie unterscheiden sich ihre Risiken?",
          "Welche anderen Behandlungsmoeglichkeiten gibt es, und wie unterscheiden sich ihre Risiken?"
        ],
        "explanation": "The paired questions ask about both alternatives and comparison.",
        "requires": [
          "b112-behandlung",
          "b112-moeglichkeit",
          "b112-risiko"
        ],
        "wordBank": [
          "welche anderen",
          "Behandlungsmöglichkeiten",
          "gibt es",
          "und",
          "wie",
          "unterscheiden sich",
          "ihre Risiken"
        ]
      },
      {
        "id": "b112-q5",
        "type": "UNDERSTANDING",
        "context": "You received several instructions and want to confirm them.",
        "prompt": "Say: If I understood correctly, I should take one tablet in the morning for seven days.",
        "answers": [
          "Wenn ich Sie richtig verstanden habe, soll ich sieben Tage lang morgens eine Tablette nehmen."
        ],
        "explanation": "The opening frame checks understanding without pretending certainty.",
        "requires": [
          "b112-behandlung"
        ],
        "wordBank": [
          "wenn",
          "ich Sie",
          "richtig verstanden habe",
          "soll ich",
          "sieben Tage lang",
          "morgens",
          "eine Tablette",
          "nehmen"
        ]
      },
      {
        "id": "b112-q6",
        "type": "WARNING SIGN",
        "context": "You need to know when to seek further help.",
        "prompt": "Ask at what point you should contact the practice again.",
        "answers": [
          "Ab wann sollte ich die Praxis wieder kontaktieren?",
          "Bei welchen Beschwerden sollte ich die Praxis wieder kontaktieren?",
          "Können Sie mir sagen, wann ich die Praxis wieder kontaktieren sollte?",
          "Koennen Sie mir sagen, wann ich die Praxis wieder kontaktieren sollte?"
        ],
        "explanation": "The question asks for a usable threshold or warning sign.",
        "requires": [
          "b112-symptom"
        ],
        "wordBank": [
          "ab wann",
          "sollte ich",
          "die Praxis",
          "wieder",
          "kontaktieren"
        ]
      },
      {
        "id": "b112-q7",
        "type": "REFERRAL",
        "context": "You want to know the reason and next step for a referral.",
        "prompt": "Ask why the referral is needed and how soon you should see the specialist.",
        "answers": [
          "Warum brauche ich die Überweisung, und wie schnell sollte ich einen Termin beim Facharzt vereinbaren?",
          "Warum brauche ich die Ueberweisung, und wie schnell sollte ich einen Termin beim Facharzt vereinbaren?"
        ],
        "explanation": "The question covers both purpose and urgency.",
        "requires": [
          "b112-ueberweisung"
        ],
        "wordBank": [
          "warum",
          "brauche ich",
          "die Überweisung",
          "und",
          "wie schnell",
          "sollte ich",
          "einen Termin",
          "beim Facharzt",
          "vereinbaren"
        ]
      }
    ],
    "input": {
      "script": "Die Untersuchung zeigt keine akute Verletzung. Versuchen Sie zunächst, das Knie einige Tage zu schonen und zweimal täglich zu kühlen. Wenn die Schwellung zunimmt, das Bein taub wird oder Sie Fieber bekommen, melden Sie sich bitte sofort. Falls sich die Beschwerden nach einer Woche nicht deutlich bessern, erhalten Sie eine Überweisung zur Orthopädie.",
      "listenPrompt": "Which warning signs require immediate contact, and what happens if there is no clear improvement after a week?",
      "listenAnswers": [
        "Zunehmende Schwellung, ein taubes Bein oder Fieber; nach einer Woche gibt es eine Überweisung zur Orthopädie.",
        "Increasing swelling, numbness in the leg, or fever; after a week a referral to orthopedics is given.",
        "Mehr Schwellung, Taubheit oder Fieber; dann Überweisung nach einer Woche ohne Besserung."
      ],
      "passage": "Behandlungsplan: Nehmen Sie das Medikament morgens nach dem Frühstück ein. Nehmen Sie in den ersten drei Tagen eine Tablette. Wenn Sie es gut vertragen, erhöhen Sie die Dosis ab dem vierten Tag auf zwei Tabletten. Häufige Nebenwirkungen sind Müdigkeit und leichter Schwindel. Fahren Sie kein Auto, wenn Sie sich schwindelig fühlen. Bei Atemnot oder einer starken allergischen Reaktion rufen Sie sofort den Notruf.",
      "readPrompt": "When does the dosage change, and which symptoms require emergency help?",
      "readAnswers": [
        "Ab dem vierten Tag bei guter Verträglichkeit; Atemnot oder eine starke allergische Reaktion.",
        "From day four if tolerated; breathing difficulty or a severe allergic reaction.",
        "Am vierten Tag; bei Atemnot oder starker allergischer Reaktion."
      ]
    },
    "task": {
      "writingPrompt": "Write a 125 to 160 word message for a medical appointment request. Describe the main symptom, when it began, intensity and changes, what makes it better or worse, relevant self-care or medication, and two focused questions for the practice.",
      "minWords": 125,
      "guide": [
        "Lead with the main symptom and duration",
        "Use a simple timeline",
        "Give observable details such as intensity or triggers",
        "Mention what you have already tried",
        "Ask about urgency and the next appropriate step"
      ],
      "required": [
        "seit",
        "Schmerz",
        "verschlimm",
        "versucht",
        "Termin",
        "?"
      ],
      "model": "Guten Tag,\n\nseit fünf Tagen habe ich Schmerzen im rechten Knie. Sie begannen nach einer längeren Wanderung und lagen zuerst bei etwa drei von zehn. Seit gestern haben sie sich verschlimmert: Beim Treppensteigen erreichen sie ungefähr sechs von zehn. In Ruhe verbessern sie sich. Das Knie ist leicht geschwollen, aber ich habe kein Fieber und kann das Bein noch belasten. Außerdem hatte ich bisher keine vergleichbaren Kniebeschwerden. Ich habe versucht, das Knie zu kühlen, und einmal Ibuprofen genommen, das ich gut vertragen habe. Sollte ich das Knie bis zum Termin weiter belasten oder schonen? Wäre ein Termin in dieser Woche möglich, oder sollte ich mich an eine andere Stelle wenden? Sie erreichen mich tagsüber unter der angegebenen Nummer. Für eine kurze Rückmeldung wäre ich Ihnen sehr dankbar. Vielen Dank.\n\nFreundliche Grüße\nJonas Weber",
      "speakingPrompt": "Give a structured symptom history at an appointment. Cover onset, location, intensity, pattern, relevant actions, and one concern. Then repeat the clinician's plan and ask about warning signs.",
      "speakingGuide": [
        "Describe one symptom at a time",
        "Give dates and a zero-to-ten intensity",
        "State what changes it",
        "Mention what you have tried",
        "Use a teach-back sentence",
        "Ask when to seek help"
      ],
      "speakingRequired": [
        "seit",
        "stärker",
        "versucht",
        "verstanden",
        "wann"
      ],
      "speakingModel": "Seit fünf Tagen habe ich Schmerzen im rechten Knie. Nach der Wanderung waren sie leicht, aber beim Treppensteigen werden sie stärker, ungefähr sechs von zehn. In Ruhe werden sie besser. Ich habe versucht, das Knie zu kühlen, und gestern Ibuprofen genommen. Wenn ich Sie richtig verstanden habe, soll ich es drei Tage schonen und weiter kühlen. Wann sollte ich früher wiederkommen?"
    },
    "culture": {
      "title": "Know the right urgent-care contact",
      "body": "In Germany, 112 is the emergency number for life-threatening situations. The medical on-call service at 116117 helps with urgent health problems outside regular office hours when the situation is not life-threatening. The official health portal explains these contacts and other crisis numbers.",
      "sourceTitle": "gesund.bund.de: Emergency numbers",
      "url": "https://gesund.bund.de/en/notfallnummern",
      "tags": [
        "112",
        "116117",
        "Notfall"
      ]
    },
    "prerequisite": "b1-media-comparison"
  },
  {
    "id": "b2-verhandlungen",
    "level": "B2",
    "code": "B2.9",
    "title": "Meetings, negotiation, and disagreement",
    "subtitle": "Set an agenda, test proposals, disagree diplomatically, and record a workable decision.",
    "canDo": [
      "Open and guide a structured meeting",
      "Clarify another person's position before responding",
      "Make, qualify, and negotiate a counterproposal",
      "Summarize decisions, conditions, and open points"
    ],
    "grammar": [
      {
        "title": "Partial agreement",
        "rule": "Zwar acknowledges a valid point. Allerdings introduces the limitation that matters for your response.",
        "example": "Der Zeitplan ist zwar ehrgeizig, allerdings fehlen uns noch zwei Freigaben.",
        "translation": "The schedule is ambitious, although we are still missing two approvals."
      },
      {
        "title": "Diplomatic proposals",
        "rule": "Konjunktiv II questions such as Wäre es denkbar and Könnten wir make proposals open for discussion.",
        "example": "Wäre es denkbar, die Pilotphase um zwei Wochen zu verlängern?",
        "translation": "Would it be conceivable to extend the pilot phase by two weeks?"
      },
      {
        "title": "Checking understanding",
        "rule": "Verstehe ich Sie richtig, dass introduces a neutral paraphrase. It gives the other person a chance to confirm or correct it.",
        "example": "Verstehe ich Sie richtig, dass die Kostenobergrenze bestehen bleibt?",
        "translation": "Do I understand you correctly that the cost ceiling remains in place?"
      },
      {
        "title": "Recording an outcome",
        "rule": "Wir halten fest, dass records an agreed result. Unter dem Vorbehalt, dass marks a condition that still has to be met.",
        "example": "Wir halten fest, dass der Test im Juni beginnt, unter dem Vorbehalt, dass der Betriebsrat zustimmt.",
        "translation": "We record that the trial starts in June, subject to the works council's approval."
      }
    ],
    "words": [
      {
        "id": "b29-tagesordnung",
        "de": "die Tagesordnung",
        "en": "agenda",
        "bundle": "die Tagesordnung, die Tagesordnungen · einen Punkt auf die Tagesordnung setzen",
        "example": "Der letzte Punkt auf der Tagesordnung betrifft die Pilotphase.",
        "exampleEn": "The last item on the agenda concerns the pilot phase.",
        "variants": [
          "die Tagesordnung"
        ]
      },
      {
        "id": "b29-verhandlungsspielraum",
        "de": "der Verhandlungsspielraum",
        "en": "room for negotiation",
        "bundle": "der Verhandlungsspielraum, die Verhandlungsspielräume · Verhandlungsspielraum haben",
        "example": "Beim Liefertermin haben wir noch etwas Verhandlungsspielraum.",
        "exampleEn": "We still have some room for negotiation on the delivery date.",
        "variants": [
          "der Verhandlungsspielraum",
          "die Verhandlungsspielraeume"
        ]
      },
      {
        "id": "b29-beschluss",
        "de": "der Beschluss",
        "en": "formal decision",
        "bundle": "der Beschluss, die Beschlüsse · einen Beschluss fassen",
        "example": "Der Ausschuss fasst den Beschluss am Ende der Sitzung.",
        "exampleEn": "The committee makes the formal decision at the end of the meeting.",
        "variants": [
          "der Beschluss",
          "die Beschluesse"
        ]
      },
      {
        "id": "b29-vorbehalt",
        "de": "der Vorbehalt",
        "en": "reservation or condition",
        "bundle": "der Vorbehalt, die Vorbehalte · unter Vorbehalt zustimmen",
        "example": "Die Finanzabteilung stimmt dem Vorschlag unter Vorbehalt zu.",
        "exampleEn": "The finance department agrees to the proposal subject to a condition.",
        "variants": [
          "der Vorbehalt"
        ]
      },
      {
        "id": "b29-gegenangebot",
        "de": "das Gegenangebot",
        "en": "counteroffer",
        "bundle": "das Gegenangebot, die Gegenangebote · ein Gegenangebot vorlegen",
        "example": "Der Anbieter legt ein Gegenangebot mit einer längeren Laufzeit vor.",
        "exampleEn": "The supplier presents a counteroffer with a longer term.",
        "variants": [
          "das Gegenangebot"
        ]
      },
      {
        "id": "b29-entgegenkommen",
        "de": "das Entgegenkommen",
        "en": "concession or accommodation",
        "bundle": "das Entgegenkommen · Entgegenkommen zeigen",
        "example": "Als Entgegenkommen übernimmt die Firma die Schulungskosten.",
        "exampleEn": "As a concession, the company covers the training costs.",
        "variants": [
          "das Entgegenkommen"
        ]
      },
      {
        "id": "b29-prioritaet",
        "de": "die Priorität",
        "en": "priority",
        "bundle": "die Priorität, die Prioritäten · einer Sache Priorität einräumen",
        "example": "Für das Team hat eine verlässliche Übergabe höchste Priorität.",
        "exampleEn": "A reliable handover is the team's highest priority.",
        "variants": [
          "die Prioritaet",
          "die Prioritaeten"
        ]
      },
      {
        "id": "b29-rueckfrage",
        "de": "die Rückfrage",
        "en": "follow-up question",
        "bundle": "die Rückfrage, die Rückfragen · eine Rückfrage stellen",
        "example": "Darf ich dazu eine kurze Rückfrage stellen?",
        "exampleEn": "May I ask a brief follow-up question about that?",
        "variants": [
          "die Rueckfrage",
          "die Rueckfragen"
        ]
      },
      {
        "id": "b29-vertagen",
        "de": "etwas vertagen",
        "en": "postpone a matter",
        "bundle": "etwas vertagen · vertagt · hat vertagt",
        "example": "Wir vertagen die Entscheidung, bis die Kostenschätzung vorliegt.",
        "exampleEn": "We are postponing the decision until the cost estimate is available.",
        "variants": [
          "etwas vertagen"
        ]
      },
      {
        "id": "b29-aufgreifen",
        "de": "einen Punkt aufgreifen",
        "en": "pick up a point",
        "bundle": "einen Punkt aufgreifen · greift auf · hat aufgegriffen",
        "example": "Ich möchte Ihre Frage zur Datensicherheit aufgreifen.",
        "exampleEn": "I would like to pick up your question about data security.",
        "variants": [
          "einen Punkt aufgreifen"
        ]
      },
      {
        "id": "b29-zustimmen",
        "de": "jemandem zustimmen",
        "en": "agree with someone",
        "bundle": "jemandem zustimmen + Dativ · stimmt zu · hat zugestimmt",
        "example": "In diesem Punkt stimme ich Ihnen vollständig zu.",
        "exampleEn": "I fully agree with you on this point.",
        "variants": [
          "jemandem zustimmen"
        ]
      },
      {
        "id": "b29-widersprechen",
        "de": "jemandem widersprechen",
        "en": "disagree with someone",
        "bundle": "jemandem widersprechen + Dativ · widerspricht · hat widersprochen",
        "example": "Bei der Einschätzung des Risikos muss ich Ihnen widersprechen.",
        "exampleEn": "I have to disagree with you about the assessment of the risk.",
        "variants": [
          "jemandem widersprechen"
        ]
      },
      {
        "id": "b29-festhalten",
        "de": "eine Entscheidung festhalten",
        "en": "record a decision",
        "bundle": "eine Entscheidung festhalten · hält fest · hat festgehalten",
        "example": "Wir halten die vereinbarten Schritte im Protokoll fest.",
        "exampleEn": "We record the agreed steps in the minutes.",
        "variants": [
          "eine Entscheidung festhalten"
        ]
      },
      {
        "id": "b29-nachverhandeln",
        "de": "einen Punkt nachverhandeln",
        "en": "renegotiate a point",
        "bundle": "einen Punkt nachverhandeln · verhandelt nach · hat nachverhandelt",
        "example": "Die Zahlungsfrist müssen wir noch einmal nachverhandeln.",
        "exampleEn": "We need to renegotiate the payment deadline.",
        "variants": [
          "einen Punkt nachverhandeln"
        ]
      },
      {
        "id": "b29-wortmeldung",
        "de": "die Wortmeldung",
        "en": "request to speak or contribution",
        "bundle": "die Wortmeldung, die Wortmeldungen · sich zu Wort melden",
        "example": "Nach dem Bericht gibt es drei Wortmeldungen aus dem Team.",
        "exampleEn": "After the report, there are three contributions from the team.",
        "variants": [
          "die Wortmeldung"
        ],
        "supplemental": true
      },
      {
        "id": "b29-konsens",
        "de": "der Konsens",
        "en": "consensus",
        "bundle": "der Konsens · einen Konsens erzielen",
        "example": "Über die Ziele besteht bereits Konsens.",
        "exampleEn": "There is already consensus on the goals.",
        "variants": [
          "der Konsens"
        ],
        "supplemental": true
      },
      {
        "id": "b29-abwaegung",
        "de": "die Abwägung",
        "en": "weighing of factors",
        "bundle": "die Abwägung, die Abwägungen · nach sorgfältiger Abwägung",
        "example": "Nach sorgfältiger Abwägung empfiehlt das Team einen Testlauf.",
        "exampleEn": "After carefully weighing the factors, the team recommends a trial.",
        "variants": [
          "die Abwaegung",
          "die Abwaegungen"
        ],
        "supplemental": true
      },
      {
        "id": "b29-verbindlich",
        "de": "verbindlich vereinbaren",
        "en": "agree in a binding way",
        "bundle": "verbindlich vereinbaren · eine verbindliche Zusage",
        "example": "Den endgültigen Termin vereinbaren wir nächste Woche verbindlich.",
        "exampleEn": "We will agree on the final date in a binding way next week.",
        "variants": [
          "verbindlich vereinbaren"
        ],
        "supplemental": true
      },
      {
        "id": "b29-ergebnisoffen",
        "de": "ergebnisoffen diskutieren",
        "en": "discuss with an open outcome",
        "bundle": "ergebnisoffen diskutieren · ein ergebnisoffener Prozess",
        "example": "Die möglichen Standorte werden ergebnisoffen diskutiert.",
        "exampleEn": "The possible locations are being discussed with an open outcome.",
        "variants": [
          "ergebnisoffen diskutieren"
        ],
        "supplemental": true
      },
      {
        "id": "b29-einigen",
        "de": "sich auf etwas einigen",
        "en": "agree on something",
        "bundle": "sich einigen auf + Akkusativ · einigt sich · hat sich geeinigt",
        "example": "Die Beteiligten einigen sich auf eine dreimonatige Pilotphase.",
        "exampleEn": "The participants agree on a three-month pilot phase.",
        "variants": [
          "sich auf etwas einigen"
        ],
        "supplemental": true
      },
      {
        "id": "b29-zurueckstellen",
        "de": "eine Frage zurückstellen",
        "en": "set a question aside",
        "bundle": "eine Frage zurückstellen · stellt zurück · hat zurückgestellt",
        "example": "Diese Detailfrage stellen wir bis zum nächsten Termin zurück.",
        "exampleEn": "We are setting this detailed question aside until the next meeting.",
        "variants": [
          "eine Frage zurueckstellen"
        ],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "b29-q1",
        "type": "MEETING OPENING",
        "context": "You chair a project meeting with three agenda items.",
        "prompt": "Open the meeting, name the first item, and invite brief questions.",
        "answers": [
          "Guten Morgen. Auf unserer Tagesordnung stehen heute drei Punkte. Beginnen wir mit dem Zeitplan. Gibt es dazu zunächst kurze Rückfragen?",
          "Guten Morgen zusammen. Wir haben heute drei Punkte auf der Tagesordnung. Zuerst besprechen wir den Zeitplan. Gibt es dazu kurze Rückfragen?"
        ],
        "explanation": "A clear opening names the scope, selects the first item, and gives participants a route into the discussion.",
        "requires": [
          "b29-tagesordnung",
          "b29-rueckfrage"
        ],
        "wordBank": [
          "Tagesordnung",
          "zunächst",
          "Zeitplan",
          "Rückfragen"
        ]
      },
      {
        "id": "b29-q2",
        "type": "PARTIAL AGREEMENT",
        "context": "The proposed launch date is useful, and two approvals are still missing.",
        "prompt": "Respond with zwar and allerdings.",
        "answers": [
          "Dem vorgeschlagenen Starttermin können wir zwar grundsätzlich zustimmen, allerdings fehlen uns noch zwei Freigaben.",
          "Dem Termin stimmen wir zwar grundsätzlich zu, allerdings stehen noch zwei Freigaben aus."
        ],
        "explanation": "Zwar acknowledges the positive point. Allerdings introduces the practical limitation.",
        "requires": [
          "b29-zustimmen"
        ],
        "wordBank": [
          "zwar",
          "allerdings",
          "Freigaben",
          "ausstehen"
        ]
      },
      {
        "id": "b29-q3",
        "type": "COUNTERPROPOSAL",
        "context": "A supplier asks for a twelve-month contract. You can offer six months with an extension option.",
        "prompt": "Make a diplomatic counterproposal with Wäre es denkbar.",
        "answers": [
          "Wäre es denkbar, zunächst eine Laufzeit von sechs Monaten mit einer Verlängerungsoption zu vereinbaren?",
          "Waere es denkbar, zunaechst eine Laufzeit von sechs Monaten mit einer Verlaengerungsoption zu vereinbaren?",
          "Wäre es für Sie denkbar, mit sechs Monaten zu beginnen und eine Verlängerungsoption festzuhalten?"
        ],
        "explanation": "The conditional question presents a precise alternative while keeping the negotiation open.",
        "requires": [
          "b29-gegenangebot",
          "b29-verhandlungsspielraum"
        ],
        "wordBank": [
          "wäre",
          "denkbar",
          "zunächst",
          "Laufzeit",
          "Verlängerungsoption"
        ]
      },
      {
        "id": "b29-q4",
        "type": "CLARIFICATION",
        "context": "You think the other side accepts the pilot as long as the budget stays fixed.",
        "prompt": "Check your understanding before you respond.",
        "answers": [
          "Verstehe ich Sie richtig, dass Sie der Pilotphase zustimmen, sofern das Budget unverändert bleibt?",
          "Verstehe ich Sie richtig, dass Sie dem Test zustimmen, wenn die Kostenobergrenze bestehen bleibt?"
        ],
        "explanation": "A neutral paraphrase reduces the risk of arguing against a position the other person never expressed.",
        "requires": [
          "b29-zustimmen"
        ],
        "wordBank": [
          "Verstehe",
          "richtig",
          "zustimmen",
          "sofern",
          "Budget"
        ]
      },
      {
        "id": "b29-q5",
        "type": "DIPLOMATIC DISAGREEMENT",
        "context": "A colleague says the schedule has no risks. You see a dependency on an external permit.",
        "prompt": "Disagree respectfully and give the concrete reason.",
        "answers": [
          "Bei der Risikoeinschätzung muss ich Ihnen widersprechen, weil wir noch von einer externen Genehmigung abhängig sind.",
          "In diesem Punkt muss ich Ihnen widersprechen. Der Zeitplan hängt noch von einer externen Genehmigung ab."
        ],
        "explanation": "The response identifies the exact point of disagreement and grounds it in a verifiable dependency.",
        "requires": [
          "b29-widersprechen"
        ],
        "wordBank": [
          "Risikoeinschätzung",
          "widersprechen",
          "abhängig",
          "Genehmigung"
        ]
      },
      {
        "id": "b29-q6",
        "type": "CONDITIONAL AGREEMENT",
        "context": "You can accept the plan if the support team receives training before launch.",
        "prompt": "Agree under a clear condition with unter dem Vorbehalt, dass.",
        "answers": [
          "Ich kann dem Plan unter dem Vorbehalt zustimmen, dass das Supportteam vor dem Start geschult wird.",
          "Wir stimmen dem Plan unter dem Vorbehalt zu, dass das Supportteam vor der Einführung eine Schulung erhält."
        ],
        "explanation": "The condition sits in the subordinate clause and becomes part of the recorded agreement.",
        "requires": [
          "b29-vorbehalt",
          "b29-zustimmen"
        ],
        "wordBank": [
          "zustimmen",
          "Vorbehalt",
          "Supportteam",
          "geschult"
        ]
      },
      {
        "id": "b29-q7",
        "type": "DECISION SUMMARY",
        "context": "The group chose a 90-day trial starting 1 June. Finance will review costs after six weeks.",
        "prompt": "Record both decisions with Wir halten fest, dass.",
        "answers": [
          "Wir halten fest, dass am 1. Juni eine neunzigtägige Pilotphase beginnt und die Finanzabteilung die Kosten nach sechs Wochen prüft.",
          "Wir halten fest, dass am 1. Juni eine neunzigtaegige Pilotphase beginnt und die Finanzabteilung die Kosten nach sechs Wochen prueft.",
          "Wir halten fest, dass der Test am 1. Juni für neunzig Tage startet. Nach sechs Wochen prüft die Finanzabteilung die Kosten."
        ],
        "explanation": "A meeting summary gives the decision, date, responsible party, and review point.",
        "requires": [
          "b29-festhalten"
        ],
        "wordBank": [
          "halten",
          "fest",
          "Pilotphase",
          "Finanzabteilung",
          "prüft"
        ]
      },
      {
        "id": "b29-q8",
        "type": "POSTPONING A DECISION",
        "context": "The group lacks a reliable cost estimate and needs a decision next Tuesday.",
        "prompt": "Postpone the item while setting a concrete next step.",
        "answers": [
          "Wir vertagen die Entscheidung bis Dienstag. Bis dahin erstellt die Finanzabteilung eine belastbare Kostenschätzung.",
          "Ich schlage vor, den Punkt bis Dienstag zu vertagen. Die Finanzabteilung legt vorher eine belastbare Kostenschätzung vor."
        ],
        "explanation": "A useful postponement names the missing basis, the responsible party, and the new decision time.",
        "requires": [
          "b29-vertagen"
        ],
        "wordBank": [
          "vertagen",
          "Dienstag",
          "Finanzabteilung",
          "Kostenschätzung"
        ]
      }
    ],
    "input": {
      "script": "Leitung: Kommen wir zum zweiten Punkt der Tagesordnung, der Einführung flexibler Servicezeiten. Frau Aydin, wie lautet Ihr Vorschlag? Frau Aydin: Wir könnten im Juli eine dreimonatige Pilotphase starten. Das Team würde an zwei Tagen bis 19 Uhr arbeiten und dafür später beginnen. Herr Vogt: Den Test unterstütze ich grundsätzlich. Allerdings brauchen wir vorab eine verlässliche Regelung für die Übergabe. Leitung: Verstehe ich Sie richtig, dass Sie zustimmen, sofern die Übergabe schriftlich geregelt wird? Herr Vogt: Genau. Außerdem sollte der Betriebsrat die Dienstpläne prüfen. Leitung: Dann halten wir diese beiden Bedingungen im Protokoll fest.",
      "listenPrompt": "Unter welchen zwei Bedingungen unterstützt Herr Vogt die Pilotphase?",
      "listenAnswers": [
        "Die Übergabe muss schriftlich geregelt werden und der Betriebsrat soll die Dienstpläne prüfen.",
        "Unter den Bedingungen einer schriftlichen Übergaberegelung und einer Prüfung der Dienstpläne durch den Betriebsrat.",
        "Eine schriftliche Übergaberegelung und die Prüfung der Dienstpläne durch den Betriebsrat."
      ],
      "passage": "Ergebnisprotokoll, Projektgruppe Kundenservice, 14. Mai: Die Beteiligten befürworten eine dreimonatige Pilotphase für flexible Servicezeiten. Der Start ist für den 1. Juli vorgesehen. Voraussetzung ist eine schriftliche Übergaberegelung, die bis zum 10. Juni von der Teamleitung vorgelegt wird. Der Betriebsrat erhält die geplanten Dienstzeiten anschließend zur Prüfung. Die Finanzabteilung untersucht nach sechs Wochen, ob zusätzliche Personalkosten entstanden sind. Eine endgültige Fortführung wurde noch nicht beschlossen. Über diese Frage entscheidet die Projektgruppe am 20. September auf Grundlage der Nutzungszahlen, der Rückmeldungen aus dem Team und der Kostenauswertung. Offen bleibt, wie kurzfristige Krankheitsausfälle abgedeckt werden. Die Teamleitung erarbeitet dazu ein Verfahren und stellt es beim nächsten Treffen vor.",
      "readPrompt": "Welche Entscheidung ist noch offen, und welche drei Grundlagen sollen dafür ausgewertet werden?",
      "readAnswers": [
        "Offen ist die dauerhafte Fortführung. Grundlage sind die Nutzungszahlen, die Rückmeldungen aus dem Team und die Kostenauswertung.",
        "Die Projektgruppe muss noch über die Fortführung entscheiden. Sie wertet dafür Nutzungszahlen, Teamrückmeldungen und Kosten aus.",
        "Die Fortführung ist offen; ausgewertet werden Nutzungszahlen, Rückmeldungen aus dem Team und die Kostenauswertung."
      ]
    },
    "task": {
      "writingPrompt": "Write a 160 to 200 word German meeting summary. Include the purpose, two positions, one diplomatic disagreement, a counterproposal, the final provisional agreement, two conditions, one responsible person or team, one deadline, and one open point.",
      "minWords": 160,
      "guide": [
        "Use a neutral professional register",
        "Attribute each position to its speaker or group",
        "Use zwar and allerdings once",
        "Record the result with Wir halten fest, dass",
        "Name responsibility and deadlines precisely",
        "Keep the text between 160 and 200 words"
      ],
      "required": [
        "tagesordnung",
        "allerdings",
        "halten fest",
        "vorbehalt",
        "bis zum"
      ],
      "model": "Auf der Tagesordnung stand die geplante Einführung flexibler Servicezeiten. Frau Aydin schlug eine dreimonatige Pilotphase ab dem 1. Juli vor. Das Team solle an zwei Tagen länger erreichbar sein und den Arbeitstag entsprechend später beginnen. Herr Vogt unterstützte den Versuch zwar grundsätzlich, allerdings verlangte er eine verlässliche Übergaberegelung. Außerdem müsse der Betriebsrat die Dienstpläne vor dem Start prüfen. Als Gegenangebot schlug er vor, nur einen Abend pro Woche zu verlängern und den Versuch bereits nach sechs Wochen auszuwerten. Nach kurzer Beratung einigte sich die Gruppe auf zwei verlängerte Tage über drei Monate mit einer ersten Auswertung nach sechs Wochen. Wir halten fest, dass die Pilotphase am 1. Juli beginnt, unter dem Vorbehalt, dass zwei Bedingungen erfüllt sind. Die Teamleitung legt bis zum 10. Juni eine schriftliche Übergaberegelung vor. Danach erhält der Betriebsrat die Dienstpläne zur Prüfung. Die Finanzabteilung ist für die Kostenauswertung verantwortlich und berichtet am 15. August. Offen bleibt die Vertretung bei kurzfristigen Krankheitsausfällen. Diesen Punkt greift die Teamleitung beim nächsten Treffen erneut auf. Über eine dauerhafte Fortführung entscheidet die Projektgruppe im September.",
      "speakingPrompt": "Lead a two to three minute negotiation about a proposed change in working hours. Open the agenda item, state your priority, clarify the other position, disagree on one detail, make a counterproposal, negotiate one condition, and summarize the provisional agreement.",
      "speakingGuide": [
        "Open with the agenda item and desired outcome",
        "Use Verstehe ich Sie richtig, dass",
        "Acknowledge one point with zwar",
        "Make a proposal in Konjunktiv II",
        "Name one condition and one open point",
        "Close with Wir halten fest, dass"
      ],
      "speakingRequired": [
        "verstehe ich sie richtig",
        "wäre es denkbar",
        "halten fest"
      ],
      "speakingModel": "Auf der Tagesordnung stehen heute die geplanten Servicezeiten. Unsere Priorität ist eine verlässliche Erreichbarkeit. Verstehe ich Sie richtig, dass Sie längeren Öffnungszeiten zustimmen, sofern die Übergabe geregelt ist? Der frühe Start ist zwar gut für einige Kundinnen und Kunden, allerdings fehlt am Abend Unterstützung. Wäre es denkbar, zunächst zwei Tage mit verlängerten Servicezeiten zu testen? Wir könnten nach sechs Wochen die Auslastung prüfen. Als Bedingung sollte das Team die Dienstpläne vier Wochen vorher erhalten. Wir halten fest, dass wir einen dreimonatigen Test vorbereiten. Offen bleibt die Vertretung bei Krankheit."
    },
    "culture": {
      "title": "Workplace decisions can involve co-determination",
      "body": "In organizations with a works council, Section 87 of Germany's Works Constitution Act lists matters subject to co-determination where no statutory or collectively agreed rule already governs the issue. These matters include the beginning and end of daily working hours and their distribution across the week. Practical negotiations therefore often need a documented proposal, clear conditions, and consultation with the responsible employee representatives.",
      "sourceTitle": "Federal Ministry of Justice: Works Constitution Act, Section 87",
      "url": "https://www.gesetze-im-internet.de/betrvg/__87.html",
      "tags": [
        "der Betriebsrat",
        "die Mitbestimmung",
        "die Arbeitszeit"
      ]
    }
  },
  {
    "id": "b2-behoerdenpost",
    "level": "B2",
    "code": "B2.10",
    "title": "Official correspondence and appeals",
    "subtitle": "Read decisions, track deadlines, document facts, and write a clear formal response.",
    "canDo": [
      "Extract the decision, reason, deadline, and responsible authority from an official letter",
      "Describe an administrative case in a precise chronological order",
      "Write a formal objection with evidence and a clear request",
      "Request confirmation, missing information, or access to a file"
    ],
    "grammar": [
      {
        "title": "Reference and purpose",
        "rule": "In Bezug auf identifies the document. Hiermit plus a performative verb states the purpose of your letter directly.",
        "example": "In Bezug auf Ihren Bescheid vom 4. März lege ich hiermit Widerspruch ein.",
        "translation": "With reference to your decision of 4 March, I hereby lodge an objection."
      },
      {
        "title": "Grounds and consequence",
        "rule": "Da introduces a known or documented reason. Insofern refers to that reason and states the resulting assessment.",
        "example": "Da der Nachweis fristgerecht eingegangen ist, ist die Begründung insofern unzutreffend.",
        "translation": "Since the evidence arrived on time, the stated reasoning is inaccurate in that respect."
      },
      {
        "title": "Dense official noun phrases",
        "rule": "Find the head noun first, then unpack each dependent genitive or prepositional phrase into a clause.",
        "example": "die Prüfung der fristgerechten Vorlage des Nachweises · Es wird geprüft, ob der Nachweis fristgerecht vorgelegt wurde.",
        "translation": "the review of the timely submission of the evidence · A review is conducted to determine whether the evidence was submitted on time."
      },
      {
        "title": "Formal request and contingency",
        "rule": "Ich bitte um names the requested action. Sollte plus infinitive frames a possible next step in a concise formal style.",
        "example": "Ich bitte um schriftliche Bestätigung. Sollten weitere Unterlagen erforderlich sein, reiche ich diese umgehend nach.",
        "translation": "I request written confirmation. Should further documents be required, I will submit them promptly."
      }
    ],
    "words": [
      {
        "id": "b210-bescheid",
        "de": "der Bescheid",
        "en": "official administrative decision",
        "bundle": "der Bescheid, die Bescheide · einen Bescheid erhalten",
        "example": "Der Bescheid enthält die Entscheidung und ihre Begründung.",
        "exampleEn": "The official notice contains the decision and its reasons.",
        "variants": [
          "der Bescheid"
        ]
      },
      {
        "id": "b210-widerspruch",
        "de": "der Widerspruch",
        "en": "formal objection",
        "bundle": "der Widerspruch, die Widersprüche · Widerspruch einlegen",
        "example": "Im Widerspruch sollte das Aktenzeichen angegeben werden.",
        "exampleEn": "The file reference should be included in the formal objection.",
        "variants": [
          "der Widerspruch",
          "die Widersprueche"
        ]
      },
      {
        "id": "b210-rechtsbehelf",
        "de": "die Rechtsbehelfsbelehrung",
        "en": "notice of legal remedies",
        "bundle": "die Rechtsbehelfsbelehrung, die Rechtsbehelfsbelehrungen · die Belehrung prüfen",
        "example": "Die Rechtsbehelfsbelehrung steht am Ende des Bescheids.",
        "exampleEn": "The notice of legal remedies appears at the end of the decision.",
        "variants": [
          "die Rechtsbehelfsbelehrung"
        ]
      },
      {
        "id": "b210-frist",
        "de": "die Frist",
        "en": "deadline or time limit",
        "bundle": "die Frist, die Fristen · eine Frist einhalten",
        "example": "Prüfen Sie zuerst, wann die Frist endet.",
        "exampleEn": "First check when the deadline ends.",
        "variants": [
          "die Frist"
        ]
      },
      {
        "id": "b210-nachweis",
        "de": "der Nachweis",
        "en": "documentary evidence",
        "bundle": "der Nachweis, die Nachweise · einen Nachweis vorlegen",
        "example": "Als Nachweis füge ich die Eingangsbestätigung bei.",
        "exampleEn": "I am enclosing the receipt confirmation as evidence.",
        "variants": [
          "der Nachweis"
        ]
      },
      {
        "id": "b210-begruendung",
        "de": "die Begründung",
        "en": "reasoning or justification",
        "bundle": "die Begründung, die Begründungen · eine Begründung darlegen",
        "example": "Die Begründung berücksichtigt die eingereichten Unterlagen nicht.",
        "exampleEn": "The reasoning does not take the submitted documents into account.",
        "variants": [
          "die Begruendung"
        ]
      },
      {
        "id": "b210-akteneinsicht",
        "de": "die Akteneinsicht",
        "en": "access to the case file",
        "bundle": "die Akteneinsicht · Akteneinsicht beantragen",
        "example": "Die Antragstellerin bittet um Akteneinsicht.",
        "exampleEn": "The applicant requests access to the case file.",
        "variants": [
          "die Akteneinsicht"
        ]
      },
      {
        "id": "b210-aktenzeichen",
        "de": "das Aktenzeichen",
        "en": "file reference",
        "bundle": "das Aktenzeichen, die Aktenzeichen · unter Angabe des Aktenzeichens",
        "example": "Bitte geben Sie bei jeder Rückfrage das Aktenzeichen an.",
        "exampleEn": "Please include the file reference with every follow-up question.",
        "variants": [
          "das Aktenzeichen"
        ]
      },
      {
        "id": "b210-sachverhalt",
        "de": "der Sachverhalt",
        "en": "facts of the case",
        "bundle": "der Sachverhalt, die Sachverhalte · den Sachverhalt schildern",
        "example": "Im ersten Absatz schildere ich den Sachverhalt in zeitlicher Reihenfolge.",
        "exampleEn": "In the first paragraph, I describe the facts in chronological order.",
        "variants": [
          "der Sachverhalt"
        ]
      },
      {
        "id": "b210-zustaendigkeit",
        "de": "die Zuständigkeit",
        "en": "responsibility or jurisdiction",
        "bundle": "die Zuständigkeit, die Zuständigkeiten · die Zuständigkeit prüfen",
        "example": "Die Behörde prüft ihre Zuständigkeit und leitet das Schreiben gegebenenfalls weiter.",
        "exampleEn": "The authority checks its jurisdiction and forwards the letter if necessary.",
        "variants": [
          "die Zustaendigkeit"
        ]
      },
      {
        "id": "b210-einlegen",
        "de": "Widerspruch einlegen",
        "en": "lodge a formal objection",
        "bundle": "Widerspruch gegen etwas einlegen · legt ein · hat eingelegt",
        "example": "Gegen den Bescheid lege ich fristgerecht Widerspruch ein.",
        "exampleEn": "I lodge an objection to the decision within the time limit.",
        "variants": [
          "Widerspruch einlegen"
        ]
      },
      {
        "id": "b210-nachreichen",
        "de": "Unterlagen nachreichen",
        "en": "submit documents later",
        "bundle": "Unterlagen nachreichen · reicht nach · hat nachgereicht",
        "example": "Den aktuellen Mietvertrag reiche ich als Anlage nach.",
        "exampleEn": "I am submitting the current rental agreement as an additional attachment.",
        "variants": [
          "Unterlagen nachreichen"
        ]
      },
      {
        "id": "b210-aufheben",
        "de": "einen Bescheid aufheben",
        "en": "revoke an official decision",
        "bundle": "einen Bescheid aufheben · hebt auf · hat aufgehoben",
        "example": "Ich bitte Sie, den ablehnenden Bescheid zu prüfen und aufzuheben.",
        "exampleEn": "I ask you to review and revoke the negative decision.",
        "variants": [
          "einen Bescheid aufheben"
        ]
      },
      {
        "id": "b210-bestaetigen",
        "de": "den Eingang bestätigen",
        "en": "confirm receipt",
        "bundle": "den Eingang bestätigen · bestätigt · hat bestätigt",
        "example": "Bitte bestätigen Sie mir den Eingang dieses Schreibens.",
        "exampleEn": "Please confirm receipt of this letter.",
        "variants": [
          "den Eingang bestaetigen"
        ]
      },
      {
        "id": "b210-anhoerung",
        "de": "die Anhörung",
        "en": "formal hearing or opportunity to comment",
        "bundle": "die Anhörung, die Anhörungen · Gelegenheit zur Anhörung geben",
        "example": "Vor der Entscheidung erhielt die Betroffene Gelegenheit zur Anhörung.",
        "exampleEn": "Before the decision, the person concerned was given an opportunity to comment.",
        "variants": [
          "die Anhoerung"
        ],
        "supplemental": true
      },
      {
        "id": "b210-ausfertigung",
        "de": "die Ausfertigung",
        "en": "official copy",
        "bundle": "die Ausfertigung, die Ausfertigungen · eine beglaubigte Ausfertigung",
        "example": "Für den Antrag wird eine beglaubigte Ausfertigung benötigt.",
        "exampleEn": "A certified official copy is required for the application.",
        "variants": [
          "die Ausfertigung"
        ],
        "supplemental": true
      },
      {
        "id": "b210-vollmacht",
        "de": "die Vollmacht",
        "en": "power of attorney or authorization",
        "bundle": "die Vollmacht, die Vollmachten · eine Vollmacht vorlegen",
        "example": "Die Vertreterin legt eine schriftliche Vollmacht vor.",
        "exampleEn": "The representative presents a written authorization.",
        "variants": [
          "die Vollmacht"
        ],
        "supplemental": true
      },
      {
        "id": "b210-zustellnachweis",
        "de": "der Zustellnachweis",
        "en": "proof of delivery",
        "bundle": "der Zustellnachweis, die Zustellnachweise · einen Zustellnachweis aufbewahren",
        "example": "Bewahren Sie den Zustellnachweis zusammen mit einer Kopie des Schreibens auf.",
        "exampleEn": "Keep the proof of delivery together with a copy of the letter.",
        "variants": [
          "der Zustellnachweis"
        ],
        "supplemental": true
      },
      {
        "id": "b210-fristgerecht",
        "de": "etwas fristgerecht einreichen",
        "en": "submit something within the deadline",
        "bundle": "fristgerecht einreichen · eine fristgerechte Einreichung",
        "example": "Die Unterlagen wurden nachweislich fristgerecht eingereicht.",
        "exampleEn": "The documents were demonstrably submitted within the deadline.",
        "variants": [
          "etwas fristgerecht einreichen"
        ],
        "supplemental": true
      },
      {
        "id": "b210-beziehen",
        "de": "sich auf ein Schreiben beziehen",
        "en": "refer to a letter",
        "bundle": "sich beziehen auf + Akkusativ · bezieht sich · hat sich bezogen",
        "example": "Ich beziehe mich auf Ihr Schreiben vom 4. März.",
        "exampleEn": "I refer to your letter of 4 March.",
        "variants": [
          "sich auf ein Schreiben beziehen"
        ],
        "supplemental": true
      },
      {
        "id": "b210-abhelfen",
        "de": "einem Widerspruch abhelfen",
        "en": "grant relief on an objection",
        "bundle": "einem Widerspruch abhelfen + Dativ · hilft ab · hat abgeholfen",
        "example": "Die Behörde prüft, ob sie dem Widerspruch abhelfen kann.",
        "exampleEn": "The authority reviews whether it can grant relief on the objection.",
        "variants": [
          "einem Widerspruch abhelfen"
        ],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "b210-q1",
        "type": "NOTICE EXTRACTION",
        "context": "A notice denies an application because a current income statement is allegedly missing. It arrived on 8 April and states that the objection must arrive by 8 May.",
        "prompt": "State the decision, stated reason, delivery date, and deadline in a concise case note.",
        "answers": [
          "Der Antrag wurde wegen eines angeblich fehlenden Einkommensnachweises abgelehnt. Der Bescheid ging am 8. April ein. Der Widerspruch muss bis zum 8. Mai eingehen.",
          "Ablehnung des Antrags wegen eines angeblich fehlenden Einkommensnachweises; Zugang am 8. April; Ende der genannten Widerspruchsfrist: 8. Mai."
        ],
        "explanation": "A useful case note separates the decision, its stated basis, the delivery event, and the stated time limit.",
        "requires": [
          "b210-bescheid",
          "b210-frist",
          "b210-nachweis"
        ],
        "wordBank": [
          "abgelehnt",
          "Einkommensnachweis",
          "eingegangen",
          "Widerspruchsfrist"
        ]
      },
      {
        "id": "b210-q2",
        "type": "FORMAL OPENING",
        "context": "You respond to a decision dated 4 March under file reference W-317/26.",
        "prompt": "Write a subject line and opening sentence that clearly state the reference and purpose.",
        "answers": [
          "Betreff: Widerspruch gegen den Bescheid vom 4. März, Aktenzeichen W-317/26. In Bezug auf diesen Bescheid lege ich hiermit Widerspruch ein.",
          "Widerspruch gegen den Bescheid vom 4. März, Az. W-317/26. Hiermit lege ich gegen den genannten Bescheid Widerspruch ein."
        ],
        "explanation": "The subject and first sentence let the authority assign the letter and identify the requested procedure immediately.",
        "requires": [
          "b210-aktenzeichen",
          "b210-einlegen",
          "b210-widerspruch"
        ],
        "wordBank": [
          "Betreff",
          "Aktenzeichen",
          "in Bezug auf",
          "hiermit",
          "Widerspruch"
        ]
      },
      {
        "id": "b210-q3",
        "type": "CHRONOLOGY",
        "context": "You uploaded a document on 12 February, received confirmation the same day, and received a denial on 4 March.",
        "prompt": "Describe the sequence in two formal sentences.",
        "answers": [
          "Am 12. Februar reichte ich den Nachweis über das Serviceportal ein und erhielt noch am selben Tag eine Eingangsbestätigung. Dennoch wurde mein Antrag mit Bescheid vom 4. März wegen des angeblich fehlenden Nachweises abgelehnt.",
          "Der Nachweis wurde am 12. Februar über das Serviceportal eingereicht; der Eingang wurde am selben Tag bestätigt. Am 4. März erging dennoch ein ablehnender Bescheid wegen eines angeblich fehlenden Nachweises."
        ],
        "explanation": "Dates, actions, and documents establish the facts without emotional or speculative language.",
        "requires": [
          "b210-nachweis",
          "b210-bestaetigen"
        ],
        "wordBank": [
          "einreichen",
          "Eingangsbestätigung",
          "Bescheid",
          "angeblich",
          "ablehnen"
        ]
      },
      {
        "id": "b210-q4",
        "type": "REASONING",
        "context": "The receipt confirms timely submission, so the stated reason for denial is inaccurate.",
        "prompt": "Connect the evidence and your conclusion with da and insofern.",
        "answers": [
          "Da die Eingangsbestätigung die fristgerechte Einreichung belegt, ist die Begründung des Bescheids insofern unzutreffend.",
          "Da der fristgerechte Eingang nachgewiesen ist, trifft die Begründung der Ablehnung insofern nicht zu."
        ],
        "explanation": "Da gives the documented basis. Insofern limits the conclusion to the part supported by that evidence.",
        "requires": [
          "b210-begruendung",
          "b210-nachweis"
        ],
        "wordBank": [
          "da",
          "Eingangsbestätigung",
          "fristgerecht",
          "insofern",
          "unzutreffend"
        ]
      },
      {
        "id": "b210-q5",
        "type": "PLAIN LANGUAGE",
        "context": "An official sentence reads: Nach erfolgter Prüfung der fristgerechten Vorlage der erforderlichen Nachweise erfolgt die erneute Bescheidung.",
        "prompt": "Rewrite the sentence as two direct, clear sentences.",
        "answers": [
          "Die Behörde prüft zuerst, ob Sie die erforderlichen Nachweise fristgerecht vorgelegt haben. Danach entscheidet sie erneut über Ihren Antrag.",
          "Zuerst wird geprüft, ob die Nachweise rechtzeitig eingereicht wurden. Anschließend erhalten Sie eine neue Entscheidung."
        ],
        "explanation": "The revision restores actors, actions, sequence, and the object of the new decision.",
        "requires": [
          "b210-frist",
          "b210-nachweis"
        ],
        "wordBank": [
          "Behörde",
          "prüft",
          "fristgerecht",
          "danach",
          "entscheidet"
        ]
      },
      {
        "id": "b210-q6",
        "type": "DOCUMENT REQUEST",
        "context": "You need to know which documents are considered missing and want access to the relevant part of the file.",
        "prompt": "Make both requests in a formal way.",
        "answers": [
          "Bitte teilen Sie mir mit, welche Unterlagen nach Ihrer Auffassung fehlen. Außerdem bitte ich um Akteneinsicht in die für diese Entscheidung maßgeblichen Vorgänge.",
          "Ich bitte um Mitteilung, welche Nachweise noch benötigt werden, sowie um Akteneinsicht in die entscheidungsrelevanten Unterlagen."
        ],
        "explanation": "The request identifies both the information sought and the scope of file access.",
        "requires": [
          "b210-akteneinsicht",
          "b210-nachweis"
        ],
        "wordBank": [
          "bitte",
          "mitteilen",
          "Unterlagen",
          "Akteneinsicht",
          "maßgeblich"
        ]
      },
      {
        "id": "b210-q7",
        "type": "ATTACHMENT AND CONTINGENCY",
        "context": "You attach a portal receipt and can provide further evidence quickly.",
        "prompt": "Refer to the attachment and add a sentence beginning with Sollten.",
        "answers": [
          "Als Anlage füge ich die Eingangsbestätigung des Serviceportals bei. Sollten weitere Nachweise erforderlich sein, reiche ich diese umgehend nach.",
          "Die Eingangsbestätigung ist diesem Schreiben beigefügt. Sollten Sie weitere Unterlagen benötigen, werde ich sie umgehend nachreichen."
        ],
        "explanation": "The attachment supports the factual claim. The contingency offers a practical next step.",
        "requires": [
          "b210-nachreichen",
          "b210-nachweis"
        ],
        "wordBank": [
          "Anlage",
          "beifügen",
          "sollten",
          "erforderlich",
          "nachreichen"
        ]
      },
      {
        "id": "b210-q8",
        "type": "FORMAL CLOSING",
        "context": "You request review, revocation of the denial, and confirmation that your letter arrived.",
        "prompt": "Write a concise closing with all three actions.",
        "answers": [
          "Ich bitte um erneute Prüfung des Sachverhalts und um Aufhebung des ablehnenden Bescheids. Bitte bestätigen Sie mir den Eingang dieses Schreibens schriftlich.",
          "Bitte prüfen Sie den Sachverhalt erneut und heben Sie den ablehnenden Bescheid auf. Um eine schriftliche Eingangsbestätigung wird gebeten."
        ],
        "explanation": "The close tells the authority exactly which substantive and administrative actions you request.",
        "requires": [
          "b210-aufheben",
          "b210-bestaetigen",
          "b210-sachverhalt"
        ],
        "wordBank": [
          "Prüfung",
          "Sachverhalt",
          "Aufhebung",
          "Eingang",
          "bestätigen"
        ]
      }
    ],
    "input": {
      "script": "Anruferin: Guten Tag, ich habe einen ablehnenden Bescheid für meinen Bewohnerparkausweis erhalten. In der Begründung steht, mein Mietvertrag fehle. Ich habe ihn jedoch am 12. Februar im Portal hochgeladen. Servicestelle: Haben Sie eine Eingangsbestätigung? Anruferin: Ja, mit Datum und Vorgangsnummer. Servicestelle: Dann prüfen Sie bitte zuerst die Rechtsbehelfsbelehrung und die dort genannte Frist. Reichen Sie Ihren Widerspruch bei der angegebenen Stelle ein, nennen Sie das Aktenzeichen und fügen Sie die Eingangsbestätigung bei. Anruferin: Kann ich außerdem Akteneinsicht beantragen? Servicestelle: Ja, Sie können in demselben Schreiben um Einsicht in die entscheidungsrelevanten Unterlagen bitten.",
      "listenPrompt": "Welche vier praktischen Schritte empfiehlt die Servicestelle?",
      "listenAnswers": [
        "Die Rechtsbehelfsbelehrung und Frist prüfen, den Widerspruch bei der genannten Stelle einreichen, das Aktenzeichen angeben und die Eingangsbestätigung beifügen.",
        "Sie soll die Frist prüfen, bei der zuständigen Stelle Widerspruch einlegen, das Aktenzeichen nennen und den Einreichungsnachweis beifügen.",
        "Frist prüfen, Widerspruch einreichen, Aktenzeichen angeben und Eingangsbestätigung beifügen."
      ],
      "passage": "Übungsbescheid, Bewohnerparkausweis, Aktenzeichen BP-482/26: Ihr Antrag vom 10. Februar wird abgelehnt. Nach den vorliegenden Unterlagen wurde kein aktueller Mietvertrag eingereicht. Der erforderliche Nachweis über den Hauptwohnsitz im Bewohnerparkgebiet liegt daher nicht vollständig vor. Gegen diesen Bescheid kann innerhalb eines Monats nach Bekanntgabe Widerspruch eingelegt werden. Der Widerspruch ist schriftlich, zur Niederschrift oder über den im Serviceportal genannten elektronischen Zugang bei der Verkehrsbehörde einzureichen. Geben Sie bitte das Aktenzeichen an. Eine Begründung und vorhandene Nachweise sollten beigefügt werden, damit der Sachverhalt zügig geprüft werden kann. Falls Sie den Mietvertrag bereits übermittelt haben, nennen Sie das Datum, den Übermittlungsweg und eine vorhandene Vorgangsnummer. Mit der Einlegung liegt noch keine neue Entscheidung vor. Nach Eingang werden die Unterlagen geprüft. Sie erhalten anschließend eine schriftliche Nachricht über das weitere Verfahren.",
      "readPrompt": "Welche drei Angaben soll eine Person machen, wenn der Mietvertrag bereits übermittelt wurde, und was geschieht nach Eingang des Widerspruchs?",
      "readAnswers": [
        "Sie soll Datum, Übermittlungsweg und Vorgangsnummer nennen. Nach Eingang werden die Unterlagen geprüft und sie erhält eine schriftliche Nachricht über das weitere Verfahren.",
        "Erforderlich sind das Datum, der Übermittlungsweg und eine vorhandene Vorgangsnummer. Danach prüft die Behörde die Unterlagen und informiert schriftlich über das weitere Verfahren.",
        "Datum, Übermittlungsweg und Vorgangsnummer; anschließend werden die Unterlagen geprüft und eine schriftliche Nachricht verschickt."
      ]
    },
    "task": {
      "writingPrompt": "Write a 160 to 200 word German objection to the fictional denial of a resident parking permit. Include a subject line, decision date and file reference, chronological facts, the authority's stated reason, your evidence, a focused explanation, a request for review and revocation, an attachment reference, a contingency for further documents, and a request for confirmation of receipt.",
      "minWords": 160,
      "guide": [
        "Use a formal greeting and closing",
        "Separate documented facts from your assessment",
        "Use in Bezug auf and hiermit in the opening",
        "Connect evidence and conclusion with da and insofern",
        "List the attachment clearly",
        "Keep the text between 160 and 200 words"
      ],
      "required": [
        "aktenzeichen",
        "hiermit",
        "da",
        "insofern",
        "anlage",
        "bestätigen"
      ],
      "model": "Betreff: Widerspruch gegen den Bescheid vom 4. März, Aktenzeichen BP-482/26\n\nSehr geehrte Damen und Herren,\n\nin Bezug auf den genannten Bescheid lege ich hiermit fristgerecht Widerspruch ein. Mein Antrag auf einen Bewohnerparkausweis wurde mit der Begründung abgelehnt, ein aktueller Mietvertrag sei nicht eingereicht worden. Den Mietvertrag habe ich jedoch bereits am 12. Februar über das Serviceportal hochgeladen. Noch am selben Tag erhielt ich eine automatische Eingangsbestätigung mit der Vorgangsnummer P-8841.\n\nDa diese Bestätigung die fristgerechte Übermittlung belegt, ist die Begründung des Bescheids insofern unzutreffend. Als Anlage füge ich die Eingangsbestätigung sowie erneut eine Kopie des Mietvertrags bei. Eine Kopie des angefochtenen Bescheids liegt ebenfalls als Anlage bei. Ich bitte Sie, den Sachverhalt unter Berücksichtigung dieser Nachweise erneut zu prüfen und den ablehnenden Bescheid aufzuheben. Bitte teilen Sie mir außerdem mit, falls der Mietvertrag in Ihrer Akte nicht als eingegangen vermerkt ist.\n\nSollten weitere Unterlagen erforderlich sein, reiche ich diese umgehend nach. Bitte bestätigen Sie mir den Eingang dieses Widerspruchs schriftlich.\n\nMit freundlichen Grüßen\nMira Hansen",
      "speakingPrompt": "Call a service center about a negative decision. Identify the notice and file reference, summarize the timeline, explain the discrepancy, ask about the deadline and submission route, confirm the required attachments, and repeat the next steps.",
      "speakingGuide": [
        "State the decision and file reference first",
        "Give dates in chronological order",
        "Describe the discrepancy with neutral language",
        "Ask one deadline question and one document question",
        "Repeat the instructions to confirm them",
        "Close by asking for a contact route"
      ],
      "speakingRequired": [
        "aktenzeichen",
        "frist",
        "verstehe ich sie richtig"
      ],
      "speakingModel": "Guten Tag. Ich rufe wegen des Bescheids vom 4. März an. Das Aktenzeichen lautet BP-482/26. Mein Antrag wurde abgelehnt, weil der Mietvertrag angeblich fehlt. Ich habe ihn am 12. Februar hochgeladen und eine Eingangsbestätigung erhalten. Welche Frist gilt für den Widerspruch? Kann ich ihn über das Serviceportal einreichen? Verstehe ich Sie richtig, dass ich das Aktenzeichen nennen und die Bestätigung beifügen soll? Benötigen Sie außerdem eine neue Kopie des Mietvertrags? Bitte nennen Sie mir noch eine Kontaktadresse für Rückfragen."
    },
    "culture": {
      "title": "The legal-remedy notice gives procedural guidance",
      "body": "Section 70 of Germany's Code of Administrative Court Procedure states a one-month period for lodging an objection after an administrative act is announced in the procedures covered by that rule. The responsible authority, available remedy, form, and timing should be checked in the legal-remedy information supplied with the actual decision. Individual procedures can differ.",
      "sourceTitle": "Federal Ministry of Justice: Code of Administrative Court Procedure, Section 70",
      "url": "https://www.gesetze-im-internet.de/vwgo/__70.html",
      "tags": [
        "die Rechtsbehelfsbelehrung",
        "die Widerspruchsfrist",
        "der Bescheid"
      ]
    }
  },
  {
    "id": "b2-praesentieren",
    "level": "B2",
    "code": "B2.11",
    "title": "Presentations and questions",
    "subtitle": "Guide an audience through evidence, qualify a conclusion, and handle follow-up questions.",
    "canDo": [
      "Structure a clear presentation with signposts and transitions",
      "Describe figures, trends, and limits without overstating them",
      "Highlight a practical conclusion for a specific audience",
      "Clarify and answer challenging follow-up questions"
    ],
    "grammar": [
      {
        "title": "Audience signposting",
        "rule": "Announce the route with zunächst, anschließend, and abschließend. Use damit komme ich zu to make a transition audible.",
        "example": "Zunächst erläutere ich die Ausgangslage. Anschließend stelle ich die Ergebnisse vor. Damit komme ich zu den Empfehlungen.",
        "translation": "First I explain the starting point. Then I present the results. That brings me to the recommendations."
      },
      {
        "title": "Referring to visual evidence",
        "rule": "Wie aus der Abbildung hervorgeht makes the evidence source explicit. The following clause states the observation.",
        "example": "Wie aus der Abbildung hervorgeht, steigt der Anteil ab dem dritten Monat deutlich.",
        "translation": "As the figure shows, the proportion rises clearly from the third month onward."
      },
      {
        "title": "Qualifying quantities",
        "rule": "Knapp, gut, rund, etwa, and im Durchschnitt express useful precision. Tendenziell and im untersuchten Zeitraum limit the scope of a claim.",
        "example": "Im untersuchten Zeitraum sank der Wert tendenziell um rund zwölf Prozent.",
        "translation": "During the period studied, the value tended to fall by around twelve percent."
      },
      {
        "title": "Managing questions",
        "rule": "Wenn ich Ihre Frage richtig verstehe checks the focus. Dazu liegen uns keine Daten vor states a limit, and anhand der vorliegenden Zahlen introduces the answer you can support.",
        "example": "Wenn ich Ihre Frage richtig verstehe, geht es um langfristige Effekte. Dazu liegen uns noch keine Daten vor.",
        "translation": "If I understand your question correctly, it concerns long-term effects. We do not yet have data on that."
      }
    ],
    "words": [
      {
        "id": "b211-gliederung",
        "de": "die Gliederung",
        "en": "structure or outline",
        "bundle": "die Gliederung, die Gliederungen · eine Gliederung vorstellen",
        "example": "Zu Beginn gebe ich Ihnen einen kurzen Überblick über die Gliederung.",
        "exampleEn": "At the beginning, I give you a brief overview of the structure.",
        "variants": [
          "die Gliederung"
        ]
      },
      {
        "id": "b211-schwerpunkt",
        "de": "der Schwerpunkt",
        "en": "main focus",
        "bundle": "der Schwerpunkt, die Schwerpunkte · den Schwerpunkt auf etwas legen",
        "example": "Der Schwerpunkt meines Vortrags liegt auf den Ergebnissen der Testphase.",
        "exampleEn": "The main focus of my presentation is on the results of the trial phase.",
        "variants": [
          "der Schwerpunkt"
        ]
      },
      {
        "id": "b211-folie",
        "de": "die Folie",
        "en": "presentation slide",
        "bundle": "die Folie, die Folien · auf der nächsten Folie",
        "example": "Auf der nächsten Folie sehen Sie die monatliche Entwicklung.",
        "exampleEn": "On the next slide, you can see the monthly development.",
        "variants": [
          "die Folie"
        ]
      },
      {
        "id": "b211-abbildung",
        "de": "die Abbildung",
        "en": "figure or illustration",
        "bundle": "die Abbildung, die Abbildungen · aus einer Abbildung hervorgehen",
        "example": "Aus der Abbildung geht ein deutlicher Rückgang hervor.",
        "exampleEn": "The figure shows a clear decline.",
        "variants": [
          "die Abbildung"
        ]
      },
      {
        "id": "b211-kernaussage",
        "de": "die Kernaussage",
        "en": "key message",
        "bundle": "die Kernaussage, die Kernaussagen · eine Kernaussage formulieren",
        "example": "Die Kernaussage lautet: Kleine Änderungen hatten eine messbare Wirkung.",
        "exampleEn": "The key message is that small changes had a measurable effect.",
        "variants": [
          "die Kernaussage"
        ]
      },
      {
        "id": "b211-verlauf",
        "de": "der Verlauf",
        "en": "course or progression",
        "bundle": "der Verlauf, die Verläufe · einen Verlauf darstellen",
        "example": "Der Verlauf zeigt starke Schwankungen in den ersten beiden Wochen.",
        "exampleEn": "The progression shows strong fluctuations in the first two weeks.",
        "variants": [
          "der Verlauf",
          "die Verlaeufe"
        ]
      },
      {
        "id": "b211-anteil",
        "de": "der Anteil",
        "en": "share or proportion",
        "bundle": "der Anteil, die Anteile · der Anteil an + Dativ",
        "example": "Der Anteil der Bahnreisen stieg auf vierzig Prozent.",
        "exampleEn": "The proportion of rail journeys rose to forty percent.",
        "variants": [
          "der Anteil"
        ]
      },
      {
        "id": "b211-groessenordnung",
        "de": "die Größenordnung",
        "en": "order of magnitude",
        "bundle": "die Größenordnung, die Größenordnungen · in derselben Größenordnung liegen",
        "example": "Die Einsparungen liegen in einer Größenordnung von zehn bis fünfzehn Prozent.",
        "exampleEn": "The savings are in the range of ten to fifteen percent.",
        "variants": [
          "die Groessenordnung"
        ]
      },
      {
        "id": "b211-tendenz",
        "de": "die Tendenz",
        "en": "trend",
        "bundle": "die Tendenz, die Tendenzen · eine steigende Tendenz erkennen",
        "example": "Seit April ist eine leicht steigende Tendenz erkennbar.",
        "exampleEn": "A slightly upward trend has been visible since April.",
        "variants": [
          "die Tendenz"
        ]
      },
      {
        "id": "b211-ueberblick",
        "de": "der Überblick",
        "en": "overview",
        "bundle": "der Überblick, die Überblicke · einen Überblick geben",
        "example": "Zunächst gebe ich einen Überblick über die Datengrundlage.",
        "exampleEn": "First, I give an overview of the data basis.",
        "variants": [
          "der Ueberblick",
          "die Ueberblicke"
        ]
      },
      {
        "id": "b211-eingehen",
        "de": "auf eine Frage eingehen",
        "en": "address a question",
        "bundle": "eingehen auf + Akkusativ · geht ein · ist eingegangen",
        "example": "Auf die Frage zur Finanzierung gehe ich am Ende ein.",
        "exampleEn": "I will address the question about financing at the end.",
        "variants": [
          "auf eine Frage eingehen"
        ]
      },
      {
        "id": "b211-praezisieren",
        "de": "eine Frage präzisieren",
        "en": "clarify or refine a question",
        "bundle": "eine Frage präzisieren · präzisiert · hat präzisiert",
        "example": "Könnten Sie bitte präzisieren, auf welchen Zeitraum Sie sich beziehen?",
        "exampleEn": "Could you please clarify which period you are referring to?",
        "variants": [
          "eine Frage praezisieren"
        ]
      },
      {
        "id": "b211-vorwegnehmen",
        "de": "einen Einwand vorwegnehmen",
        "en": "anticipate an objection",
        "bundle": "einen Einwand vorwegnehmen · nimmt vorweg · hat vorweggenommen",
        "example": "Eine Folie zur Stichprobe nimmt den häufigsten Einwand vorweg.",
        "exampleEn": "A slide about the sample anticipates the most common objection.",
        "variants": [
          "einen Einwand vorwegnehmen"
        ]
      },
      {
        "id": "b211-einordnen",
        "de": "ein Ergebnis einordnen",
        "en": "put a result into context",
        "bundle": "ein Ergebnis einordnen · ordnet ein · hat eingeordnet",
        "example": "Zum Schluss ordne ich das Ergebnis im Vergleich zum Vorjahr ein.",
        "exampleEn": "At the end, I put the result into context compared with the previous year.",
        "variants": [
          "ein Ergebnis einordnen"
        ]
      },
      {
        "id": "b211-ausreisser",
        "de": "der Ausreißer",
        "en": "outlier",
        "bundle": "der Ausreißer, die Ausreißer · einen Ausreißer erklären",
        "example": "Der hohe Wert im Mai ist ein Ausreißer wegen einer Messe.",
        "exampleEn": "The high value in May is an outlier caused by a trade fair.",
        "variants": [
          "der Ausreisser"
        ],
        "supplemental": true
      },
      {
        "id": "b211-datengrundlage",
        "de": "die Datengrundlage",
        "en": "data basis",
        "bundle": "die Datengrundlage, die Datengrundlagen · eine belastbare Datengrundlage",
        "example": "Für eine langfristige Prognose ist die Datengrundlage noch zu klein.",
        "exampleEn": "The data basis is still too small for a long-term forecast.",
        "variants": [
          "die Datengrundlage"
        ],
        "supplemental": true
      },
      {
        "id": "b211-quellenangabe",
        "de": "die Quellenangabe",
        "en": "source citation",
        "bundle": "die Quellenangabe, die Quellenangaben · eine Quellenangabe ergänzen",
        "example": "Jede externe Grafik erhält eine vollständige Quellenangabe.",
        "exampleEn": "Every external graphic receives a complete source citation.",
        "variants": [
          "die Quellenangabe"
        ],
        "supplemental": true
      },
      {
        "id": "b211-ueberleitung",
        "de": "die Überleitung",
        "en": "transition",
        "bundle": "die Überleitung, die Überleitungen · eine klare Überleitung",
        "example": "Eine kurze Zusammenfassung bildet die Überleitung zum nächsten Abschnitt.",
        "exampleEn": "A short summary forms the transition to the next section.",
        "variants": [
          "die Ueberleitung"
        ],
        "supplemental": true
      },
      {
        "id": "b211-veranschaulichen",
        "de": "etwas veranschaulichen",
        "en": "illustrate something",
        "bundle": "etwas veranschaulichen · veranschaulicht · hat veranschaulicht",
        "example": "Ein konkretes Beispiel veranschaulicht die Auswirkung im Alltag.",
        "exampleEn": "A concrete example illustrates the effect in daily life.",
        "variants": [
          "etwas veranschaulichen"
        ],
        "supplemental": true
      },
      {
        "id": "b211-zurueckkommen",
        "de": "auf einen Punkt zurückkommen",
        "en": "return to a point",
        "bundle": "zurückkommen auf + Akkusativ · kommt zurück · ist zurückgekommen",
        "example": "Auf die Kosten komme ich im letzten Teil zurück.",
        "exampleEn": "I will return to the costs in the last section.",
        "variants": [
          "auf einen Punkt zurueckkommen"
        ],
        "supplemental": true
      },
      {
        "id": "b211-kennzeichnen",
        "de": "eine Schätzung kennzeichnen",
        "en": "label an estimate",
        "bundle": "eine Schätzung kennzeichnen · kennzeichnet · hat gekennzeichnet",
        "example": "Vorläufige Werte sind in der Grafik deutlich als Schätzung gekennzeichnet.",
        "exampleEn": "Preliminary values are clearly labeled as estimates in the graphic.",
        "variants": [
          "eine Schaetzung kennzeichnen"
        ],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "b211-q1",
        "type": "PRESENTATION OPENING",
        "context": "You present the results of a six-month mobility trial.",
        "prompt": "State the topic, relevance, and three-part structure.",
        "answers": [
          "Heute stelle ich die Ergebnisse unserer sechsmonatigen Mobilitätstestphase vor. Das Thema ist für unsere Reiseplanung und unsere Klimaziele relevant. Zunächst erläutere ich die Datengrundlage, anschließend die wichtigsten Ergebnisse und abschließend drei Empfehlungen.",
          "Mein Vortrag behandelt die Ergebnisse des sechsmonatigen Mobilitätstests. Das Thema ist für unsere Dienstreiseplanung wichtig. Zuerst gebe ich einen Überblick über die Daten, danach zeige ich die zentralen Entwicklungen und zum Schluss stelle ich Empfehlungen vor."
        ],
        "explanation": "The opening tells the audience what the talk covers, why it matters, and how to follow it.",
        "requires": [
          "b211-gliederung",
          "b211-ueberblick"
        ],
        "wordBank": [
          "heute",
          "relevant",
          "zunächst",
          "anschließend",
          "abschließend"
        ]
      },
      {
        "id": "b211-q2",
        "type": "TRANSITION",
        "context": "You have finished explaining the method and now want to present the results.",
        "prompt": "Make the transition audible and name the next focus.",
        "answers": [
          "Damit komme ich zu den Ergebnissen. Im Mittelpunkt steht zunächst die Entwicklung der Bahnreisen.",
          "Nach diesem Überblick über die Methode wende ich mich nun den Ergebnissen zu. Der erste Schwerpunkt ist der Anteil der Bahnreisen."
        ],
        "explanation": "A transition briefly closes the previous section and identifies the next one.",
        "requires": [
          "b211-schwerpunkt",
          "b211-ueberblick"
        ],
        "wordBank": [
          "damit",
          "komme",
          "Ergebnisse",
          "Mittelpunkt",
          "Schwerpunkt"
        ]
      },
      {
        "id": "b211-q3",
        "type": "VISUAL REFERENCE",
        "context": "A chart shows rail travel rising from 28 percent in January to 43 percent in June.",
        "prompt": "Describe the evidence with Wie aus der Abbildung hervorgeht and exact figures.",
        "answers": [
          "Wie aus der Abbildung hervorgeht, stieg der Anteil der Bahnreisen von achtundzwanzig Prozent im Januar auf dreiundvierzig Prozent im Juni.",
          "Wie aus der Abbildung hervorgeht, erhöhte sich der Bahnanteil zwischen Januar und Juni von 28 auf 43 Prozent."
        ],
        "explanation": "The sentence links the claim to its visual source and states both comparison points.",
        "requires": [
          "b211-abbildung",
          "b211-anteil"
        ],
        "wordBank": [
          "Abbildung",
          "hervorgeht",
          "Anteil",
          "von",
          "auf"
        ]
      },
      {
        "id": "b211-q4",
        "type": "QUALIFIED CLAIM",
        "context": "Emissions fell by 12 percent during six months, and the sample contains only one department.",
        "prompt": "Report the result and limit its scope.",
        "answers": [
          "Im untersuchten Zeitraum sanken die Emissionen um rund zwölf Prozent. Da die Daten nur aus einer Abteilung stammen, lässt sich daraus noch keine allgemeine Entwicklung ableiten.",
          "Die Emissionen gingen innerhalb der sechs Monate um etwa zwölf Prozent zurück. Wegen der kleinen Datengrundlage gilt dieses Ergebnis zunächst nur für die untersuchte Abteilung."
        ],
        "explanation": "The response gives the measured result and keeps the conclusion within the boundaries of the data.",
        "requires": [
          "b211-einordnen"
        ],
        "wordBank": [
          "Zeitraum",
          "rund",
          "zwölf Prozent",
          "Datengrundlage",
          "ableiten"
        ]
      },
      {
        "id": "b211-q5",
        "type": "KEY MESSAGE",
        "context": "The figures suggest that earlier travel planning increased rail use.",
        "prompt": "Formulate one key message and one practical recommendation.",
        "answers": [
          "Die Kernaussage lautet: Eine frühere Reiseplanung ging mit einem höheren Bahnanteil einher. Deshalb sollte die Buchungsfreigabe künftig mindestens drei Wochen vor Dienstreisen erfolgen.",
          "Als Kernaussage lässt sich festhalten, dass frühzeitige Planung mit einem höheren Bahnanteil verbunden war. Ich empfehle daher eine Freigabe drei Wochen vor der Reise."
        ],
        "explanation": "A useful conclusion separates the observed relationship from the action proposed for the audience.",
        "requires": [
          "b211-kernaussage",
          "b211-anteil"
        ],
        "wordBank": [
          "Kernaussage",
          "frühzeitig",
          "Bahnanteil",
          "empfehlen",
          "Freigabe"
        ]
      },
      {
        "id": "b211-q6",
        "type": "QUESTION CLARIFICATION",
        "context": "An audience member asks whether the trial was successful. Success could refer to cost, emissions, or employee satisfaction.",
        "prompt": "Clarify the intended criterion before answering.",
        "answers": [
          "Könnten Sie bitte präzisieren, welchen Erfolgsmaßstab Sie meinen: die Kosten, die Emissionen oder die Zufriedenheit der Beschäftigten?",
          "Wenn ich Ihre Frage richtig verstehe, möchten Sie wissen, ob der Test insgesamt erfolgreich war. Auf welches Kriterium beziehen Sie sich dabei genau?"
        ],
        "explanation": "The clarification identifies the ambiguous term and offers concrete dimensions.",
        "requires": [
          "b211-praezisieren",
          "b211-eingehen"
        ],
        "wordBank": [
          "präzisieren",
          "Erfolgsmaßstab",
          "Kosten",
          "Emissionen",
          "Zufriedenheit"
        ]
      },
      {
        "id": "b211-q7",
        "type": "EVIDENCE LIMIT",
        "context": "Someone asks whether the same effect will last for five years. Your trial lasted six months.",
        "prompt": "State the limit and give the strongest answer supported by the data.",
        "answers": [
          "Eine Wirkung über fünf Jahre lässt sich mit den vorliegenden Daten noch nicht einordnen. Wir können lediglich sagen, dass der Effekt innerhalb der sechsmonatigen Testphase beobachtet wurde.",
          "Für eine langfristige Einordnung reichen unsere Daten noch nicht aus. Im untersuchten Zeitraum von sechs Monaten war jedoch ein Effekt messbar."
        ],
        "explanation": "The answer is transparent about missing evidence and still provides the conclusion the study supports.",
        "requires": [
          "b211-einordnen"
        ],
        "wordBank": [
          "langfristig",
          "Daten",
          "anhand",
          "Zeitraum",
          "stabil"
        ]
      },
      {
        "id": "b211-q8",
        "type": "STRUCTURED ANSWER",
        "context": "An audience member asks what should happen next.",
        "prompt": "Answer in three steps: immediate action, evaluation point, possible expansion.",
        "answers": [
          "Kurzfristig sollten wir die frühere Buchungsfreigabe in zwei weiteren Abteilungen testen. Nach drei Monaten werten wir Kosten, Emissionen und Rückmeldungen aus. Falls sich die Tendenz bestätigt, kann das Verfahren schrittweise ausgeweitet werden.",
          "Als ersten Schritt empfehle ich einen Test in zwei weiteren Teams. Anschließend folgt eine Auswertung nach drei Monaten. Bei vergleichbaren Ergebnissen wäre eine stufenweise Ausweitung sinnvoll."
        ],
        "explanation": "A numbered or clearly sequenced answer helps the audience retain a practical recommendation.",
        "requires": [
          "b211-tendenz",
          "b211-einordnen"
        ],
        "wordBank": [
          "kurzfristig",
          "zwei Abteilungen",
          "auswerten",
          "bestätigen",
          "ausweiten"
        ]
      }
    ],
    "input": {
      "script": "Guten Morgen. Ich stelle Ihnen heute die Ergebnisse unseres sechsmonatigen Mobilitätstests vor. Zunächst ein kurzer Blick auf die Datengrundlage: Ausgewertet wurden 420 Dienstreisen einer Abteilung. Wie aus der ersten Abbildung hervorgeht, stieg der Anteil der Bahnreisen von 28 auf 43 Prozent. Gleichzeitig sanken die geschätzten Reiseemissionen um rund zwölf Prozent. Die Kosten blieben im Durchschnitt nahezu unverändert. Eine Einschränkung ist die kurze Laufzeit. Außerdem nahm nur eine Abteilung teil. Die Kernaussage lautet daher: Frühere Planung kann die Bahnquote erhöhen. Als nächsten Schritt empfehle ich einen Test in zwei weiteren Abteilungen. Auf Fragen zur Berechnung gehe ich gern im Anschluss ein.",
      "listenPrompt": "Welche zwei Grenzen der Untersuchung nennt die Sprecherin, und welchen nächsten Schritt empfiehlt sie?",
      "listenAnswers": [
        "Die Laufzeit war kurz und es nahm nur eine Abteilung teil. Empfohlen wird ein Test in zwei weiteren Abteilungen.",
        "Als Grenzen nennt sie die kurze Laufzeit und die Teilnahme nur einer Abteilung. Danach soll der Test auf zwei weitere Abteilungen ausgeweitet werden.",
        "Kurze Laufzeit, nur eine Abteilung; als nächster Schritt ein Test in zwei weiteren Abteilungen."
      ],
      "passage": "Auswertung Mobilitätstest: Im Januar wurden 28 Prozent der 68 Dienstreisen mit der Bahn durchgeführt. Im Juni lag der Anteil bei 43 Prozent von insgesamt 72 Reisen. Der höchste Monatswert wurde im Mai mit 51 Prozent erreicht; in diesem Monat fand eine große Fachmesse in einer gut angebundenen Stadt statt. Dieser Wert wird deshalb als möglicher Ausreißer gekennzeichnet. Über den gesamten Testzeitraum sank die geschätzte Menge reisebedingter Emissionen gegenüber dem entsprechenden Vorjahreszeitraum um rund zwölf Prozent. Die durchschnittlichen direkten Reisekosten veränderten sich kaum. Die Zufriedenheit wurde durch eine freiwillige Umfrage erhoben, an der 38 von 74 Beschäftigten teilnahmen. 26 Teilnehmende bewerteten die frühere Buchungsfreigabe positiv, sieben neutral und fünf negativ. Wegen der begrenzten Rücklaufquote erlaubt die Befragung nur eine vorsichtige Einschätzung der allgemeinen Zufriedenheit.",
      "readPrompt": "Warum sollten sowohl der Maiwert als auch das Zufriedenheitsergebnis vorsichtig eingeordnet werden?",
      "readAnswers": [
        "Der Maiwert kann wegen der gut angebundenen Fachmesse ein Ausreißer sein. An der Zufriedenheitsumfrage nahm nur gut die Hälfte der Beschäftigten teil.",
        "Im Mai beeinflusste eine Fachmesse das Reiseverhalten, und die freiwillige Umfrage hatte eine begrenzte Rücklaufquote.",
        "Der Maiwert ist möglicherweise durch die Messe verzerrt; die Befragung bildet wegen der geringen Teilnahme nicht sicher die gesamte Abteilung ab."
      ]
    },
    "task": {
      "writingPrompt": "Write a 160 to 200 word German presentation script about the fictional mobility trial. Include a relevant opening, a three-part outline, two exact comparisons, one reference to a figure, one qualified trend, one limitation of the data, a key message, a practical recommendation, and a transition to questions.",
      "minWords": 160,
      "guide": [
        "Address the audience directly at the beginning",
        "Use zunächst, anschließend, and abschließend",
        "Attribute one claim to an Abbildung",
        "Distinguish measured figures from interpretation",
        "State one evidence limit explicitly",
        "Keep the text between 160 and 200 words"
      ],
      "required": [
        "zunächst",
        "anschließend",
        "abbildung",
        "kernaussage",
        "datengrundlage",
        "fragen"
      ],
      "model": "Guten Morgen. Heute stelle ich Ihnen die Ergebnisse unseres sechsmonatigen Mobilitätstests vor. Das Thema ist relevant, weil Dienstreisen einen erheblichen Teil unserer betrieblichen Emissionen verursachen. Zunächst erläutere ich kurz die Datengrundlage, anschließend zeige ich die wichtigsten Entwicklungen und abschließend formuliere ich eine Empfehlung.\n\nAusgewertet wurden 420 Reisen einer Abteilung. Wie aus der ersten Abbildung hervorgeht, stieg der Anteil der Bahnreisen von 28 Prozent im Januar auf 43 Prozent im Juni. Gleichzeitig sanken die geschätzten Emissionen gegenüber dem Vorjahreszeitraum um rund zwölf Prozent. Die direkten Reisekosten blieben im Durchschnitt nahezu unverändert. Der Maiwert von 51 Prozent ist als möglicher Ausreißer gekennzeichnet, da in diesem Monat eine gut angebundene Fachmesse stattfand.\n\nDie Datengrundlage ist auf eine Abteilung und sechs Monate begrenzt. Langfristige Wirkungen lassen sich daraus noch nicht ableiten. Die Kernaussage lautet dennoch: Frühere Buchungsfreigaben können zu einem höheren Bahnanteil beitragen. Ich empfehle deshalb einen dreimonatigen Test in zwei weiteren Abteilungen mit einer gemeinsamen Auswertung. Damit bin ich am Ende meines Vortrags. Auf Ihre Fragen gehe ich jetzt gern ein.",
      "speakingPrompt": "Give a three-minute presentation on the mobility trial and handle two follow-up questions. Introduce the relevance and structure, describe two figures, qualify one result, explain a limitation, give a recommendation, clarify an ambiguous question, and answer within the evidence available.",
      "speakingGuide": [
        "Present the route through the talk before the details",
        "Refer explicitly to one figure",
        "Pause after each main section",
        "Mark estimates and limitations clearly",
        "Use Wenn ich Ihre Frage richtig verstehe",
        "Close each answer with its practical consequence"
      ],
      "speakingRequired": [
        "zunächst",
        "wie aus der abbildung hervorgeht",
        "wenn ich ihre frage richtig verstehe"
      ],
      "speakingModel": "Guten Morgen. Heute geht es um unseren Mobilitätstest. Zunächst beschreibe ich die Daten, anschließend die Ergebnisse und abschließend meine Empfehlung. Wie aus der Abbildung hervorgeht, stieg der Bahnanteil von 28 auf 43 Prozent. Die Emissionen sanken im untersuchten Zeitraum um rund zwölf Prozent. Die Datengrundlage umfasst allerdings nur eine Abteilung und sechs Monate. Deshalb empfehle ich einen weiteren Test. Wenn ich Ihre Frage richtig verstehe, möchten Sie die langfristige Wirkung kennen. Dazu liegen uns noch keine Daten vor. Für die Testphase sehen wir jedoch einen positiven Zusammenhang."
    },
    "culture": {
      "title": "B2 speaking combines presentation and interaction",
      "body": "The Goethe-Zertifikat B2 speaking module asks candidates to give a short presentation, discuss it with a partner, and exchange arguments. Strong preparation therefore includes both a coherent talk and flexible responses to questions, comments, and competing views.",
      "sourceTitle": "Goethe-Institut: Goethe-Zertifikat B2 speaking exam training",
      "url": "https://www.goethe.de/ins/de/en/m/prf/prf/gzb2/wi9.html",
      "tags": [
        "der Kurzvortrag",
        "die Rückfrage",
        "Argumente austauschen"
      ]
    }
  },
  {
    "id": "b2-mediation-konflikt",
    "level": "B2",
    "code": "B2.12",
    "title": "Mediation and conflict resolution",
    "subtitle": "Relay competing views fairly, identify interests, and build a precise workable agreement.",
    "canDo": [
      "Summarize conflicting positions without adopting their emotional language",
      "Separate shared facts, interpretations, interests, and open questions",
      "Reframe fixed demands as needs that can be negotiated",
      "Facilitate and document a conditional agreement"
    ],
    "grammar": [
      {
        "title": "Neutral attribution",
        "rule": "Nach Darstellung von and aus Sicht von identify the source of a position. Konjunktiv I preserves distance where that distinction matters.",
        "example": "Nach Darstellung des Jugendzentrums seien die Probenzeiten frühzeitig angekündigt worden.",
        "translation": "According to the youth center, the rehearsal times had been announced well in advance."
      },
      {
        "title": "Parallel perspectives",
        "rule": "Während frames two perspectives in one sentence. Hinsichtlich names the precise dimension on which they differ.",
        "example": "Während die Gruppe Planungssicherheit braucht, wünschen die Anwohnenden hinsichtlich der Abendtermine mehr Ruhe.",
        "translation": "While the group needs planning certainty, residents want more quiet with regard to evening dates."
      },
      {
        "title": "From demand to interest",
        "rule": "A neutral paraphrase replaces absolute or accusatory wording with the underlying need, observable event, and requested change.",
        "example": "Die Forderung nach einem vollständigen Verbot weist auf das Bedürfnis nach verlässlichen Ruhezeiten hin.",
        "translation": "The demand for a complete ban points to the need for reliable quiet hours."
      },
      {
        "title": "Conditional agreement",
        "rule": "Unter der Voraussetzung, dass and sofern connect a concession to a clear safeguard. Im Gegenzug identifies the reciprocal step.",
        "example": "Die Anwohnenden akzeptieren zwei Abendproben, sofern sie frühzeitig angekündigt werden. Im Gegenzug nutzt die Gruppe nach 21 Uhr nur den Haupteingang.",
        "translation": "Residents accept two evening rehearsals provided they are announced early. In return, the group uses only the main entrance after 9 p.m."
      }
    ],
    "words": [
      {
        "id": "b212-anliegen",
        "de": "das Anliegen",
        "en": "concern or request",
        "bundle": "das Anliegen, die Anliegen · ein Anliegen ernst nehmen",
        "example": "Zu Beginn fasst die Moderatorin das Anliegen jeder Seite zusammen.",
        "exampleEn": "At the beginning, the moderator summarizes each side's concern.",
        "variants": [
          "das Anliegen"
        ]
      },
      {
        "id": "b212-sichtweise",
        "de": "die Sichtweise",
        "en": "point of view",
        "bundle": "die Sichtweise, die Sichtweisen · eine Sichtweise darstellen",
        "example": "Beide Sichtweisen beruhen auf unterschiedlichen Alltagserfahrungen.",
        "exampleEn": "Both points of view are based on different everyday experiences.",
        "variants": [
          "die Sichtweise"
        ]
      },
      {
        "id": "b212-missverstaendnis",
        "de": "das Missverständnis",
        "en": "misunderstanding",
        "bundle": "das Missverständnis, die Missverständnisse · ein Missverständnis klären",
        "example": "Ein falsches Datum in der Nachricht führte zu einem Missverständnis.",
        "exampleEn": "An incorrect date in the message led to a misunderstanding.",
        "variants": [
          "das Missverstaendnis",
          "die Missverstaendnisse"
        ]
      },
      {
        "id": "b212-kernpunkt",
        "de": "der Kernpunkt",
        "en": "central point",
        "bundle": "der Kernpunkt, die Kernpunkte · den Kernpunkt benennen",
        "example": "Der Kernpunkt des Konflikts ist die fehlende Planungssicherheit.",
        "exampleEn": "The central point of the conflict is the lack of planning certainty.",
        "variants": [
          "der Kernpunkt"
        ]
      },
      {
        "id": "b212-interessenausgleich",
        "de": "der Interessenausgleich",
        "en": "balancing of interests",
        "bundle": "der Interessenausgleich, die Interessenausgleiche · einen Interessenausgleich erreichen",
        "example": "Feste Probezeiten ermöglichen einen fairen Interessenausgleich.",
        "exampleEn": "Fixed rehearsal times allow a fair balancing of interests.",
        "variants": [
          "der Interessenausgleich"
        ]
      },
      {
        "id": "b212-gespraechsgrundlage",
        "de": "die Gesprächsgrundlage",
        "en": "basis for discussion",
        "bundle": "die Gesprächsgrundlage, die Gesprächsgrundlagen · eine Gesprächsgrundlage schaffen",
        "example": "Ein gemeinsames Protokoll schafft eine verlässliche Gesprächsgrundlage.",
        "exampleEn": "Shared minutes create a reliable basis for discussion.",
        "variants": [
          "die Gespraechsgrundlage"
        ]
      },
      {
        "id": "b212-eskalation",
        "de": "die Eskalation",
        "en": "escalation",
        "bundle": "die Eskalation, die Eskalationen · eine Eskalation vermeiden",
        "example": "Eine direkte Ansprechperson kann weitere Eskalationen vermeiden.",
        "exampleEn": "A direct contact person can prevent further escalation.",
        "variants": [
          "die Eskalation"
        ]
      },
      {
        "id": "b212-vereinbarung",
        "de": "die Vereinbarung",
        "en": "agreement",
        "bundle": "die Vereinbarung, die Vereinbarungen · eine Vereinbarung treffen",
        "example": "Die Vereinbarung gilt zunächst für acht Wochen.",
        "exampleEn": "The agreement initially applies for eight weeks.",
        "variants": [
          "die Vereinbarung"
        ]
      },
      {
        "id": "b212-vermitteln",
        "de": "zwischen zwei Seiten vermitteln",
        "en": "mediate between two sides",
        "bundle": "vermitteln zwischen + Dativ · vermittelt · hat vermittelt",
        "example": "Eine neutrale Moderatorin vermittelt zwischen dem Verein und den Anwohnenden.",
        "exampleEn": "A neutral moderator mediates between the association and the residents.",
        "variants": [
          "zwischen zwei Seiten vermitteln"
        ]
      },
      {
        "id": "b212-wiedergeben",
        "de": "eine Aussage neutral wiedergeben",
        "en": "relay a statement neutrally",
        "bundle": "eine Aussage wiedergeben · gibt wieder · hat wiedergegeben",
        "example": "Bitte geben Sie die Position der anderen Seite in neutralen Worten wieder.",
        "exampleEn": "Please relay the other side's position in neutral words.",
        "variants": [
          "eine Aussage neutral wiedergeben"
        ]
      },
      {
        "id": "b212-nachvollziehen",
        "de": "ein Anliegen nachvollziehen",
        "en": "understand a concern",
        "bundle": "ein Anliegen nachvollziehen · vollzieht nach · hat nachvollzogen",
        "example": "Ich kann nachvollziehen, dass kurzfristige Änderungen belastend sind.",
        "exampleEn": "I can understand that last-minute changes are stressful.",
        "variants": [
          "ein Anliegen nachvollziehen"
        ]
      },
      {
        "id": "b212-deeskalieren",
        "de": "ein Gespräch deeskalieren",
        "en": "de-escalate a conversation",
        "bundle": "ein Gespräch deeskalieren · deeskaliert · hat deeskaliert",
        "example": "Eine sachliche Zusammenfassung kann das Gespräch deeskalieren.",
        "exampleEn": "A factual summary can de-escalate the conversation.",
        "variants": [
          "ein Gespraech deeskalieren"
        ]
      },
      {
        "id": "b212-entgegenkommen",
        "de": "jemandem entgegenkommen",
        "en": "accommodate someone",
        "bundle": "jemandem entgegenkommen + Dativ · kommt entgegen · ist entgegengekommen",
        "example": "Der Verein kommt den Anwohnenden mit einem früheren Ende entgegen.",
        "exampleEn": "The association accommodates the residents by ending earlier.",
        "variants": [
          "jemandem entgegenkommen"
        ]
      },
      {
        "id": "b212-zusammenfuehren",
        "de": "Positionen zusammenführen",
        "en": "bring positions together",
        "bundle": "Positionen zusammenführen · führt zusammen · hat zusammengeführt",
        "example": "Der Vorschlag führt die wichtigsten Interessen beider Seiten zusammen.",
        "exampleEn": "The proposal brings together the main interests of both sides.",
        "variants": [
          "Positionen zusammenfuehren"
        ]
      },
      {
        "id": "b212-klaerungsbedarf",
        "de": "der Klärungsbedarf",
        "en": "need for clarification",
        "bundle": "der Klärungsbedarf · weiteren Klärungsbedarf sehen",
        "example": "Bei der Nutzung des Hofs besteht noch Klärungsbedarf.",
        "exampleEn": "There is still a need for clarification concerning use of the courtyard.",
        "variants": [
          "der Klaerungsbedarf"
        ],
        "supplemental": true
      },
      {
        "id": "b212-gemeinsamkeit",
        "de": "die Gemeinsamkeit",
        "en": "point in common",
        "bundle": "die Gemeinsamkeit, die Gemeinsamkeiten · Gemeinsamkeiten herausarbeiten",
        "example": "Eine Gemeinsamkeit ist der Wunsch beider Seiten nach verlässlichen, frühzeitig angekündigten Terminen.",
        "exampleEn": "One point in common is that both sides want reliable dates announced well in advance.",
        "variants": [
          "die Gemeinsamkeit"
        ],
        "supplemental": true
      },
      {
        "id": "b212-handlungsvorschlag",
        "de": "der Handlungsvorschlag",
        "en": "proposed course of action",
        "bundle": "der Handlungsvorschlag, die Handlungsvorschläge · einen Handlungsvorschlag prüfen",
        "example": "Der Handlungsvorschlag verbindet feste Zeiten mit einer Testphase.",
        "exampleEn": "The proposed course of action combines fixed times with a trial phase.",
        "variants": [
          "der Handlungsvorschlag"
        ],
        "supplemental": true
      },
      {
        "id": "b212-wortwahl",
        "de": "die Wortwahl",
        "en": "choice of words",
        "bundle": "die Wortwahl · auf eine sachliche Wortwahl achten",
        "example": "Eine neutrale Wortwahl erleichtert die weitere Klärung.",
        "exampleEn": "A neutral choice of words makes further clarification easier.",
        "variants": [
          "die Wortwahl"
        ],
        "supplemental": true
      },
      {
        "id": "b212-verbindlichkeit",
        "de": "die Verbindlichkeit",
        "en": "binding nature or reliability",
        "bundle": "die Verbindlichkeit · für Verbindlichkeit sorgen",
        "example": "Schriftliche Zuständigkeiten sorgen für mehr Verbindlichkeit.",
        "exampleEn": "Written responsibilities create greater reliability.",
        "variants": [
          "die Verbindlichkeit"
        ],
        "supplemental": true
      },
      {
        "id": "b212-grenze",
        "de": "eine Grenze anerkennen",
        "en": "acknowledge a boundary",
        "bundle": "eine Grenze anerkennen · erkennt an · hat anerkannt",
        "example": "Eine tragfähige Lösung muss die Grenzen beider Seiten anerkennen.",
        "exampleEn": "A sustainable solution must acknowledge both sides' boundaries.",
        "variants": [
          "eine Grenze anerkennen"
        ],
        "supplemental": true
      },
      {
        "id": "b212-entschaerfen",
        "de": "einen Konflikt entschärfen",
        "en": "defuse a conflict",
        "bundle": "einen Konflikt entschärfen · entschärft · hat entschärft",
        "example": "Ein fester Ansprechpartner konnte den Konflikt deutlich entschärfen.",
        "exampleEn": "A designated contact person was able to defuse the conflict significantly.",
        "variants": [
          "einen Konflikt entschaerfen"
        ],
        "supplemental": true
      }
    ],
    "questions": [
      {
        "id": "b212-q1",
        "type": "NEUTRAL PARAPHRASE",
        "context": "A resident says: Die Jugendlichen machen jeden Abend absichtlich Krach.",
        "prompt": "Relay the concern in neutral language and preserve uncertainty about intention.",
        "answers": [
          "Die Anwohnerin berichtet von wiederkehrendem Lärm am Abend, den sie den Jugendlichen zuschreibt.",
          "Aus Sicht der Anwohnerin kommt es jeden Abend zu erheblichem Lärm, der von Jugendlichen verursacht werde.",
          "Die Anwohnerin empfindet den abendlichen Lärm, den sie mit den Jugendlichen in Verbindung bringt, als regelmäßige Belastung."
        ],
        "explanation": "The paraphrase retains the reported experience while removing an unsupported claim about intention.",
        "requires": [
          "b212-wiedergeben",
          "b212-sichtweise"
        ],
        "wordBank": [
          "aus Sicht",
          "berichtet",
          "wiederholt",
          "Lärmbelastung",
          "erlebt"
        ]
      },
      {
        "id": "b212-q2",
        "type": "SOURCE DISTANCE",
        "context": "The youth center says it announced every rehearsal two weeks in advance.",
        "prompt": "Report the claim with Nach Darstellung and Konjunktiv I.",
        "answers": [
          "Nach Darstellung des Jugendzentrums seien alle Proben zwei Wochen im Voraus angekündigt worden.",
          "Nach Darstellung des Jugendzentrums habe man sämtliche Proben zwei Wochen vorher angekündigt."
        ],
        "explanation": "The source phrase and reported form keep the organization's claim separate from an established fact.",
        "requires": [
          "b212-sichtweise",
          "b212-wiedergeben"
        ],
        "wordBank": [
          "nach Darstellung",
          "Jugendzentrum",
          "seien",
          "angekündigt"
        ]
      },
      {
        "id": "b212-q3",
        "type": "PARALLEL PERSPECTIVES",
        "context": "The music group needs evening rehearsal time. Residents need predictable quiet from 9 p.m.",
        "prompt": "Present both interests in one sentence with während.",
        "answers": [
          "Während die Musikgruppe auf Proben am Abend angewiesen ist, brauchen die Anwohnenden ab 21 Uhr verlässliche Ruhe.",
          "Während für die Gruppe nutzbare Abendtermine wichtig sind, legen die Anwohnenden Wert auf feste Ruhezeiten ab 21 Uhr."
        ],
        "explanation": "The sentence gives equal grammatical weight to each interest.",
        "requires": [
          "b212-anliegen",
          "b212-sichtweise"
        ],
        "wordBank": [
          "während",
          "angewiesen",
          "Abendtermine",
          "verlässlich",
          "Ruhezeiten"
        ]
      },
      {
        "id": "b212-q4",
        "type": "REFRAMING",
        "context": "A resident demands: Nach 18 Uhr darf überhaupt keine Probe mehr stattfinden.",
        "prompt": "Reframe the fixed demand as an underlying need and an open question.",
        "answers": [
          "Hinter dieser Forderung steht das Bedürfnis nach verlässlichen ruhigen Abendstunden. Zu klären ist, ab welcher Uhrzeit Ruhe gewährleistet werden kann und wie sich einzelne Abendproben damit vereinbaren lassen.",
          "Der Kern des Anliegens ist eine planbare Ruhezeit am Abend. Wir sollten klären, mit welcher Endzeit sich dieses Ziel erreichen lässt."
        ],
        "explanation": "The reframe identifies the need and opens space for several practical options.",
        "requires": [
          "b212-kernpunkt",
          "b212-anliegen"
        ],
        "wordBank": [
          "Bedürfnis",
          "verlässlich",
          "zu klären",
          "Endzeit",
          "ermöglicht"
        ]
      },
      {
        "id": "b212-q5",
        "type": "SHARED INTEREST",
        "context": "Both sides complain about last-minute changes and unclear contact routes.",
        "prompt": "Name the shared interest and turn it into one concrete proposal.",
        "answers": [
          "Beide Seiten brauchen frühzeitig bekannte Termine und eine verlässliche Ansprechperson. Ich schlage deshalb einen achtwöchigen Probenplan und eine gemeinsame Kontaktadresse vor. Das schafft eine verlässliche Gesprächsgrundlage.",
          "Eine Gemeinsamkeit ist der Wunsch nach Planungssicherheit. Ein verbindlicher Kalender mit einer festen Ansprechperson könnte als gemeinsame Gesprächsgrundlage dienen."
        ],
        "explanation": "A shared interest creates a practical starting point for agreement.",
        "requires": [
          "b212-gespraechsgrundlage"
        ],
        "wordBank": [
          "beide Seiten",
          "Planungssicherheit",
          "Probenplan",
          "Ansprechperson"
        ]
      },
      {
        "id": "b212-q6",
        "type": "OPEN CLARIFICATION",
        "context": "Residents mention disturbing noise, and the exact source is unclear.",
        "prompt": "Ask two neutral questions that identify time and type of noise.",
        "answers": [
          "Um ein Missverständnis auszuschließen: Zu welchen Uhrzeiten ist die Belastung besonders stark? Geht es vor allem um Musik, Gespräche vor dem Gebäude oder das Aufräumen nach der Probe?",
          "Damit ich Ihr Anliegen richtig verstehe: Wann tritt der störende Lärm gewöhnlich auf? Welche Geräusche stehen dabei im Vordergrund?"
        ],
        "explanation": "Observable details make the problem measurable and support targeted action.",
        "requires": [
          "b212-anliegen",
          "b212-missverstaendnis"
        ],
        "wordBank": [
          "Uhrzeiten",
          "besonders",
          "geht es um",
          "Geräusche",
          "Vordergrund"
        ]
      },
      {
        "id": "b212-q7",
        "type": "CONDITIONAL COMPROMISE",
        "context": "Residents will accept two evening rehearsals per week. In return, the youth center will end by 9 p.m., announce dates two weeks early, and name a contact person.",
        "prompt": "Formulate the compromise with sofern and im Gegenzug.",
        "answers": [
          "Die Anwohnenden akzeptieren zwei Abendproben pro Woche, sofern das Jugendzentrum die Proben um 21 Uhr beendet und zwei Wochen vorher ankündigt. Im Gegenzug benennt das Zentrum eine feste Ansprechperson für Beschwerden.",
          "Sofern die Proben spätestens um 21 Uhr enden und zwei Wochen im Voraus angekündigt werden, stimmen die Anwohnenden zwei Abendterminen pro Woche zu. Im Gegenzug stellt das Jugendzentrum eine feste Kontaktperson zur Verfügung."
        ],
        "explanation": "The formulation gives the concession, safeguards, and reciprocal step in a form that can be recorded.",
        "requires": [
          "b212-vereinbarung"
        ],
        "wordBank": [
          "sofern",
          "akzeptieren",
          "21 Uhr",
          "im Gegenzug",
          "Ansprechperson"
        ]
      },
      {
        "id": "b212-q8",
        "type": "AGREEMENT RECORD",
        "context": "The trial lasts eight weeks. The center publishes dates, ends by 9 p.m., and names Ms. Kaya as contact. The parties review complaints after four weeks.",
        "prompt": "Record the agreement, responsibilities, and review point in three sentences.",
        "answers": [
          "Die Vereinbarung gilt zunächst für acht Wochen. Das Jugendzentrum veröffentlicht die Termine zwei Wochen im Voraus, beendet die Proben spätestens um 21 Uhr und benennt Frau Kaya als Ansprechperson. Nach vier Wochen prüfen beide Seiten gemeinsam die eingegangenen Beschwerden.",
          "Für acht Wochen wird folgende Regelung erprobt. Das Zentrum kündigt Termine zwei Wochen vorher an, hält die Endzeit von 21 Uhr ein und setzt Frau Kaya als Kontaktperson ein. Eine gemeinsame Zwischenbilanz erfolgt nach vier Wochen."
        ],
        "explanation": "A usable record contains duration, actions, responsibility, and a defined evaluation point.",
        "requires": [
          "b212-vereinbarung"
        ],
        "wordBank": [
          "Vereinbarung",
          "acht Wochen",
          "veröffentlicht",
          "Ansprechperson",
          "Zwischenbilanz"
        ]
      }
    ],
    "input": {
      "script": "Moderatorin: Ich fasse die beiden Anliegen kurz zusammen. Die Musikgruppe braucht zwei Abendtermine pro Woche, weil viele Mitglieder tagsüber arbeiten. Die Anwohnenden erleben besonders das Verlassen des Gebäudes nach 21 Uhr als belastend. Frau Lorenz, verstehe ich Sie richtig, dass eine verlässliche Endzeit wichtiger ist als ein vollständiger Verzicht auf Abendproben? Frau Lorenz: Ja, wenn die Termine früh genug bekannt sind. Gruppenleiter: Wir können jede Probe um 20.45 Uhr beenden und anschließend den Haupteingang benutzen. Die Termine veröffentlichen wir zwei Wochen vorher. Moderatorin: Dann schlage ich eine achtwöchige Testphase vor. Frau Kaya ist direkte Ansprechperson, und nach vier Wochen werten wir Beschwerden gemeinsam aus.",
      "listenPrompt": "Welche Bedürfnisse haben die beiden Seiten, und aus welchen fünf Elementen besteht der Lösungsvorschlag?",
      "listenAnswers": [
        "Die Gruppe braucht zwei Abendtermine, die Anwohnenden brauchen verlässliche Ruhe und frühe Information. Vorgeschlagen werden ein Ende um 20.45 Uhr, die anschließende Nutzung des Haupteingangs, Ankündigung zwei Wochen vorher, eine feste Ansprechperson und eine Auswertung nach vier Wochen.",
        "Die Musikgruppe benötigt Abendproben; die Anwohnenden wünschen planbare Ruhezeiten. Die Lösung umfasst die Endzeit 20.45 Uhr, die Nutzung des Haupteingangs, Termine zwei Wochen im Voraus und Frau Kaya als Kontaktperson sowie eine Auswertung.",
        "Zwei Abendproben stehen dem Wunsch nach planbarer Ruhe gegenüber. Der Vorschlag regelt Endzeit, Ausgangsweg, Vorankündigung, Ansprechperson und Auswertung."
      ],
      "passage": "Sachstand zur Nutzung des Nachbarschaftshauses: Der Probenraum ist dienstags und donnerstags von 18.30 bis 21 Uhr reserviert. Laut Belegungsplan wurden im vergangenen Monat sieben von acht Terminen zwei Wochen im Voraus eingetragen. Eine Terminänderung erfolgte am selben Tag, weil eine andere Gruppe den Raum wegen eines Wasserschadens kurzfristig räumen musste. Drei Anwohnende meldeten insgesamt fünf Störungen. Zwei Meldungen betrafen Musik vor 21 Uhr, drei bezogen sich auf laute Gespräche im Hof zwischen 21 und 21.30 Uhr. Die Musikgruppe erklärt, dass sie den Probenraum pünktlich verlassen habe, jedoch bisher keine Verantwortung für den gemeinsam genutzten Hof übernommen habe. Beide Seiten wünschen einen festen Kalender und eine klar benannte Kontaktperson. Als Test werden ein Probenende um 20.45 Uhr, die anschließende Nutzung des Haupteingangs und eine gemeinsame Auswertung nach vier Wochen vorgeschlagen. Die geänderte Wegeführung muss vorher mit dem Brandschutz abgestimmt werden.",
      "readPrompt": "Welche Fakten sind gemeinsam dokumentiert, worin liegt der wichtigste offene Verantwortungsbereich, und welche Voraussetzung muss vor dem Test geklärt werden?",
      "readAnswers": [
        "Dokumentiert sind die reservierten Zeiten, eine kurzfristige Änderung und fünf Störungsmeldungen. Offen ist die Verantwortung für den Hof nach der Probe. Vor dem Test muss die geänderte Wegeführung mit dem Brandschutz geklärt werden.",
        "Belegungsplan und Meldungen belegen Termine sowie Art und Zeit der Störungen. Die Verantwortung für den gemeinsam genutzten Hof ist ungeklärt; außerdem braucht die Ausgangsregelung eine Abstimmung mit dem Brandschutz.",
        "Die Zeiten und fünf Beschwerden sind dokumentiert. Klärungsbedarf besteht bei der Hofverantwortung und bei einer brandschutzgerechten Wegeführung."
      ]
    },
    "task": {
      "writingPrompt": "Write a 160 to 200 word German mediation note about the neighborhood-house conflict. Include the shared facts, each side's position and underlying need, one uncertain or disputed point, one shared interest, a neutral reframe, a conditional trial agreement, responsibilities, timing, a review method, and one remaining question.",
      "minWords": 160,
      "guide": [
        "Attribute reported claims to their source",
        "Use parallel language for both perspectives",
        "Separate documented facts from disputed interpretations",
        "Use sofern and im Gegenzug in the proposal",
        "Name who does what and by when",
        "Keep the text between 160 and 200 words"
      ],
      "required": [
        "aus sicht",
        "während",
        "sofern",
        "im gegenzug",
        "vereinbarung",
        "offen"
      ],
      "model": "Im Nachbarschaftshaus probt eine Musikgruppe dienstags und donnerstags am Abend. Dokumentiert sind die Raumzeiten sowie fünf Störungsmeldungen im vergangenen Monat. Während die Gruppe wegen der Arbeitszeiten ihrer Mitglieder verlässliche Abendtermine benötigt, wünschen die Anwohnenden planbare Ruhe und frühzeitige Informationen. Aus Sicht der Gruppe endeten die Proben pünktlich. Drei Beschwerden betreffen jedoch Gespräche im Hof nach 21 Uhr. Offen ist daher, wer für den gemeinsam genutzten Außenbereich verantwortlich ist.\n\nDie Forderung nach einem vollständigen Verzicht auf Abendproben weist auf das Bedürfnis nach einer verlässlichen Endzeit hin. Beide Seiten haben außerdem Interesse an einem festen Kalender und einer klaren Ansprechperson. Vorgeschlagen wird eine achtwöchige Vereinbarung. Die Anwohnenden akzeptieren zwei Abendproben pro Woche, sofern die Musik um 20.45 Uhr endet und alle Termine zwei Wochen vorher veröffentlicht werden. Im Gegenzug nutzt die Gruppe nach der Probe den Haupteingang und meidet den Hof. Frau Kaya sammelt Rückmeldungen und informiert beide Seiten innerhalb von zwei Werktagen. Nach vier Wochen werden Zahl, Zeitpunkt und Art der Meldungen gemeinsam ausgewertet. Vor Beginn bleibt zu klären, ob die geänderte Wegeführung die Brandschutzvorgaben erfüllt.",
      "speakingPrompt": "Moderate a three-minute conflict conversation. Invite each concern, summarize both views neutrally, clarify one disputed fact, identify a shared interest, reframe one fixed demand, propose a conditional trial, assign responsibilities, and confirm the review date.",
      "speakingGuide": [
        "Give each side equal speaking space",
        "Use Habe ich Sie richtig verstanden",
        "Name observations without assigning motives",
        "Ask one question about a disputed detail",
        "Build the proposal around a shared interest",
        "Repeat the final conditions and review point"
      ],
      "speakingRequired": [
        "habe ich sie richtig verstanden",
        "gemeinsam",
        "sofern",
        "wir halten fest"
      ],
      "speakingModel": "Vielen Dank. Ich fasse zunächst zusammen. Die Gruppe braucht zwei nutzbare Abendtermine. Die Anwohnenden wünschen eine verlässliche Ruhezeit. Habe ich Sie richtig verstanden, dass vor allem die Gespräche im Hof nach 21 Uhr stören? Gemeinsam ist Ihnen der Wunsch nach festen Terminen und einer direkten Ansprechperson. Ich schlage einen achtwöchigen Test vor. Die Anwohnenden akzeptieren zwei Proben, sofern die Musik um 20.45 Uhr endet. Die Gruppe nutzt danach den Haupteingang, meidet den Hof und veröffentlicht Termine zwei Wochen vorher. Frau Kaya sammelt Rückmeldungen. Wir halten fest, dass nach vier Wochen eine gemeinsame Auswertung stattfindet."
    },
    "culture": {
      "title": "Mediation is a core communicative activity",
      "body": "The CEFR Companion Volume treats mediation as a broad set of activities that includes relaying information, explaining concepts, collaborating to construct meaning, and facilitating communication in delicate situations or disagreements. Fair summaries, accessible reformulation, and productive interaction therefore belong to advanced language ability.",
      "sourceTitle": "Council of Europe: CEFR Companion Volume",
      "url": "https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-companion-volume-and-its-language-versions",
      "tags": [
        "Informationen vermitteln",
        "Zusammenarbeit",
        "Konfliktmoderation"
      ]
    }
  }
];
  const existingIds = new Set(course.modules.map(module => module.id));
  additions.forEach(module => {
    if (existingIds.has(module.id)) throw new Error(`Duplicate expanded module id: ${module.id}`);
    existingIds.add(module.id);
    course.modules.push(module);
  });
})();
