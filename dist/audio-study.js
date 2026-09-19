(function () {
  window.SATZWERK_AUDIO_STUDY = {
    version: 1,
    tests: [
      {
        id: "beginner",
        label: "First conversation",
        focus: "Beginner pace and polite address",
        text: "Guten Morgen, Frau Yilmaz. Ich heiße Nina. Wie geht es Ihnen? Mir geht es gut, danke. Und Ihnen?",
        listenFor: "Are the pauses useful? Do Yilmaz, heiße, Ihnen, and the question melody sound clear?"
      },
      {
        id: "travel",
        label: "Station announcement",
        focus: "Numbers, compounds, and place names",
        text: "Achtung am Gleis zwölf. Der Regionalzug nach München fährt heute um siebzehn Uhr fünfundvierzig von Gleis vier ab. Reisende nach Würzburg steigen bitte in Nürnberg um.",
        listenFor: "Check the platform numbers, time, city names, separable verb, and overall announcement rhythm."
      },
      {
        id: "phonetics",
        label: "German sound check",
        focus: "Vowels, ich and ach sounds, and umlauts",
        text: "Ich möchte frisches Brot, acht weiche Brötchen und ein Stück würzigen Käse. Danach bringe ich Bücher, Tücher und Früchte zu Frau Römer.",
        listenFor: "Listen closely to ich, acht, vowel length, ö and ü, final consonants, and compound stress."
      }
    ],
    candidates: [
      {
        id: "piper-thorsten",
        name: "Piper 1.8 · Thorsten medium",
        detail: "Local ONNX synthesis. Piper engine GPL-3.0-or-later. Thorsten training data CC0.",
        files: {
          beginner: "./audio/voice-study/piper-thorsten-beginner.wav",
          travel: "./audio/voice-study/piper-thorsten-travel.wav",
          phonetics: "./audio/voice-study/piper-thorsten-phonetics.wav"
        }
      },
      {
        id: "chatterbox",
        name: "Chatterbox Multilingual",
        detail: "Open multilingual synthesis from Resemble AI. MIT licensed model and code.",
        files: {
          beginner: "./audio/voice-study/chatterbox-beginner.wav",
          travel: "./audio/voice-study/chatterbox-travel.wav",
          phonetics: "./audio/voice-study/chatterbox-phonetics.wav"
        }
      },
      {
        id: "coqui-thorsten-vits",
        name: "Coqui TTS · Thorsten VITS",
        detail: "Coqui TTS 0.27.5 with the German Thorsten VITS model. Runtime MPL-2.0. Model Apache-2.0.",
        files: {
          beginner: "./audio/voice-study/coqui-thorsten-vits-beginner.wav",
          travel: "./audio/voice-study/coqui-thorsten-vits-travel.wav",
          phonetics: "./audio/voice-study/coqui-thorsten-vits-phonetics.wav"
        }
      }
    ]
  };

  const sources = window.SATZWERK_CURRICULUM?.sources;
  if (sources && !sources.some(source => source.title === "OHF-Voice: Piper")) {
    sources.push(
      { category: "SPEECH SYNTHESIS", title: "OHF-Voice: Piper", body: "Piper 1.8 and the German Thorsten voice produced one set of blind comparison samples. The maintained engine is GPL-3.0-or-later. The Thorsten source dataset is marked CC0 in its model card.", url: "https://github.com/OHF-Voice/piper1-gpl" },
      { category: "SPEECH SYNTHESIS", title: "Resemble AI: Chatterbox Multilingual", body: "Chatterbox Multilingual produced one set of blind German comparison samples using the project's published German reference voice and fixed generation settings.", url: "https://github.com/resemble-ai/chatterbox" },
      { category: "SPEECH SYNTHESIS", title: "Coqui TTS", body: "Coqui TTS 0.27.5 and the German Thorsten VITS model produced one set of blind comparison samples. The maintained runtime uses MPL-2.0 and the model is listed as Apache-2.0.", url: "https://github.com/idiap/coqui-ai-TTS" }
    );
  }
})();
