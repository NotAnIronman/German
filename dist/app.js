const exercises = [
  {
    stage: 0,
    label: "Complete the thought",
    context: "The office printer stops. Your colleague asks what is missing.",
    sentence: 'Wir brauchen noch <span class="blank">_____</span> für den Drucker.',
    placeholder: "Type the missing German…",
    answers: ["Papier"],
    keyTerms: ["papier"],
    hint: "It is the material, not a single countable sheet—so German normally uses no article here.",
    success: "The material is indefinite and uncounted, so Papier stands on its own.",
    trace: ["Papier · neuter", "mass noun", "accusative object"],
    pieces: [["SUBJECT", "wir", "subject"], ["VERB", "brauchen", "verb"], ["TARGET", "Papier", "target"], ["PURPOSE", "für den Drucker", "context"]]
  },
  {
    stage: 0,
    label: "Retrieve from meaning",
    context: "A parcel arrives wrapped in recycled paper.",
    sentence: 'Das Paket ist in <span class="blank">_____</span> eingewickelt.',
    placeholder: "Complete the sentence…",
    answers: ["recyceltes Papier"],
    keyTerms: ["papier"],
    hint: "Papier has no article here. What ending does an adjective carry before a neuter noun when no article helps it?",
    success: "No article carries the gender signal, so the adjective does the work: recyceltes.",
    trace: ["Papier · neuter", "no article", "strong adjective · -es"],
    pieces: [["SUBJECT", "das Paket", "subject"], ["VERB", "ist eingewickelt", "verb"], ["PREPOSITION", "in", "context"], ["TARGET", "recyceltes Papier", "target"]]
  },
  {
    stage: 1,
    label: "Choose the case",
    context: "The address is already written there. Express “on the paper.”",
    sentence: 'Die Adresse steht <span class="blank">_____</span>.',
    placeholder: "on the paper…",
    answers: ["auf dem Papier"],
    keyTerms: ["auf", "papier"],
    hint: "Nothing is moving. Wo? asks for the dative after auf.",
    success: "The address is located there: auf + dative gives auf dem Papier.",
    trace: ["location · wo?", "auf + dative", "das → dem"],
    pieces: [["SUBJECT", "die Adresse", "subject"], ["VERB", "steht", "verb"], ["LOCATION", "auf dem", "context"], ["TARGET", "Papier", "target"]],
    diagnose: value => value.includes("auf das") ? "Your meaning is clear, but auf das signals movement toward a destination. Here the address is already located on the paper, so use auf dem Papier." : null
  },
  {
    stage: 1,
    label: "Reverse the contrast",
    context: "Now the number is not there yet. Tell someone to write it onto the paper.",
    sentence: 'Schreib die Nummer <span class="blank">_____</span>.',
    placeholder: "onto the paper…",
    answers: ["auf das Papier"],
    keyTerms: ["auf", "papier"],
    hint: "The number moves from nowhere to a destination. Wohin? asks for the accusative.",
    success: "This time there is a destination: auf + accusative gives auf das Papier.",
    trace: ["direction · wohin?", "auf + accusative", "das → das"],
    pieces: [["COMMAND", "schreib", "verb"], ["OBJECT", "die Nummer", "subject"], ["DIRECTION", "auf das", "context"], ["TARGET", "Papier", "target"]],
    diagnose: value => value.includes("auf dem") ? "You communicated the place, but the number is moving onto a destination. Use accusative: auf das Papier." : null
  },
  {
    stage: 1,
    label: "Build the noun phrase",
    context: "The paper is too thin, and the ink shows through. Complete the reason.",
    sentence: 'Wegen <span class="blank">_____</span> ist die Tinte sichtbar.',
    placeholder: "the thin paper…",
    answers: ["des dünnen Papiers"],
    keyTerms: ["papier"],
    hint: "Formal wegen takes the genitive: the article becomes des, and many masculine/neuter nouns gain -s or -es.",
    success: "The whole phrase moved together: des + dünnen + Papiers.",
    trace: ["wegen + genitive", "das → des", "Papier → Papiers"],
    pieces: [["CAUSE", "wegen", "context"], ["ARTICLE", "des", "context"], ["ADJECTIVE", "dünnen", "verb"], ["TARGET", "Papiers", "target"]]
  },
  {
    stage: 2,
    label: "Transfer the pattern",
    context: "New noun: der Tisch. Say: “The glass is on the table.”",
    sentence: '<span class="blank">Build the complete German sentence.</span>',
    placeholder: "Write the sentence…",
    answers: ["Das Glas steht auf dem Tisch", "Das Glas ist auf dem Tisch"],
    keyTerms: ["glas", "auf", "tisch"],
    hint: "The glass is already located there: wo? Use dative. Der becomes dem.",
    success: "You transferred the location pattern to a masculine noun: auf dem Tisch.",
    trace: ["location · wo?", "der → dem", "pattern transferred"],
    pieces: [["SUBJECT", "das Glas", "subject"], ["VERB", "steht", "verb"], ["LOCATION", "auf dem", "context"], ["NEW NOUN", "Tisch", "target"]]
  },
  {
    stage: 2,
    label: "Make it move",
    context: "Now tell a friend: “Put the glass onto the table.”",
    sentence: '<span class="blank">Build the complete German sentence.</span>',
    placeholder: "Write the command…",
    answers: ["Stell das Glas auf den Tisch", "Stelle das Glas auf den Tisch"],
    keyTerms: ["glas", "auf", "tisch"],
    hint: "The glass is changing location: wohin? Use accusative. Der becomes den.",
    success: "You changed location into direction and selected den without copying the Papier example.",
    trace: ["direction · wohin?", "der → den", "pattern transferred"],
    pieces: [["COMMAND", "stell", "verb"], ["OBJECT", "das Glas", "subject"], ["DIRECTION", "auf den", "context"], ["NEW NOUN", "Tisch", "target"]]
  },
  {
    stage: 2,
    label: "Use it freely",
    context: "Ask a colleague whether they still need paper for the printer.",
    sentence: '<span class="blank">Say it naturally in German.</span>',
    placeholder: "Write your question…",
    answers: ["Brauchst du noch Papier für den Drucker", "Brauchen Sie noch Papier für den Drucker", "Braucht ihr noch Papier für den Drucker"],
    keyTerms: ["brauch", "papier", "drucker"],
    hint: "Choose du, ihr, or Sie. Put the conjugated form of brauchen first because this is a yes/no question.",
    success: "You selected a natural register and used Papier inside a complete communicative question.",
    trace: ["yes/no question", "verb in position 1", "meaning + form"],
    pieces: [["VERB", "brauchst", "verb"], ["PERSON", "du", "subject"], ["QUANTITY", "noch", "context"], ["TARGET", "Papier", "target"], ["PURPOSE", "für den Drucker", "context"]]
  }
];

let current = Number(localStorage.getItem("satzwerk-current") || 0);
let secured = Number(localStorage.getItem("satzwerk-secured") || 0);
let hintShown = false;

const els = {
  form: document.querySelector("#answerForm"), input: document.querySelector("#answerInput"),
  label: document.querySelector("#promptLabel"), context: document.querySelector("#contextText"),
  sentence: document.querySelector("#sentenceText"), variation: document.querySelector("#variationNumber"),
  feedback: document.querySelector("#feedback"), icon: document.querySelector("#feedbackIcon"),
  kicker: document.querySelector("#feedbackKicker"), title: document.querySelector("#feedbackTitle"),
  feedbackText: document.querySelector("#feedbackText"), trace: document.querySelector("#grammarTrace"),
  next: document.querySelector("#nextButton"), hint: document.querySelector("#hintButton"),
  frame: document.querySelector("#framePieces"), sessionScore: document.querySelector("#sessionScore"),
  skillPercent: document.querySelector("#skillPercent")
};

function normalize(value) {
  return value.trim().toLocaleLowerCase("de-DE").replace(/[.!?,;:]/g, "").replace(/\s+/g, " ");
}

function editDistance(a, b) {
  const matrix = Array.from({length: b.length + 1}, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) for (let j = 1; j <= a.length; j++) {
    matrix[i][j] = b[i - 1] === a[j - 1] ? matrix[i - 1][j - 1] : 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
  }
  return matrix[b.length][a.length];
}

function render() {
  const ex = exercises[current % exercises.length];
  els.label.textContent = ex.label;
  els.context.textContent = ex.context;
  els.sentence.innerHTML = ex.sentence;
  els.variation.textContent = String(current + 1).padStart(2, "0");
  els.input.placeholder = ex.placeholder;
  els.input.value = "";
  els.input.disabled = false;
  els.feedback.hidden = true;
  els.feedback.className = "feedback";
  els.hint.textContent = "Give me a useful hint";
  hintShown = false;
  els.frame.innerHTML = ex.pieces.map((piece, i) => `${i ? '<span class="connector">+</span>' : ''}<span class="piece ${piece[2]}">${piece[0]} <b>${piece[1]}</b></span>`).join("");
  document.querySelectorAll(".step").forEach((step, index) => step.classList.toggle("active", index === ex.stage));
  updateProgress();
  setTimeout(() => els.input.focus(), 50);
}

function updateProgress() {
  const percent = Math.min(100, 18 + secured * 10);
  els.sessionScore.textContent = secured;
  els.skillPercent.textContent = `${percent}%`;
  document.querySelector("#meaningBar").style.width = `${Math.min(100, 24 + secured * 12)}%`;
  document.querySelector("#formBar").style.width = `${Math.min(100, 14 + secured * 9)}%`;
  document.querySelector("#transferBar").style.width = `${Math.min(100, 8 + Math.max(0, secured - 4) * 20)}%`;
}

function showFeedback(kind, title, text, ex) {
  els.feedback.hidden = false;
  els.feedback.className = `feedback ${kind}`;
  els.icon.textContent = kind === "retry" ? "!" : kind === "partial" ? "≈" : "✓";
  els.kicker.textContent = kind === "retry" ? "NOT YET" : kind === "partial" ? "MEANING LANDED" : "FORM SECURED";
  els.title.textContent = title;
  els.feedbackText.textContent = text;
  els.trace.innerHTML = ex.trace.map(item => `<span>${item}</span>`).join("");
  els.input.disabled = kind !== "retry";
  if (kind === "retry") {
    els.next.textContent = "Try again";
    els.next.onclick = () => { els.feedback.hidden = true; els.input.disabled = false; els.input.focus(); };
  } else {
    els.next.innerHTML = current === exercises.length - 1 ? "Review another set <span>↻</span>" : "Next variation <span>→</span>";
    els.next.onclick = advance;
  }
}

els.form.addEventListener("submit", event => {
  event.preventDefault();
  const ex = exercises[current];
  const value = normalize(els.input.value);
  if (!value) { els.input.focus(); return; }
  const exact = ex.answers.some(answer => normalize(answer) === value);
  if (exact) {
    secured += 1;
    localStorage.setItem("satzwerk-secured", String(secured));
    showFeedback("success", "Exactly right.", ex.success, ex);
    updateProgress();
    return;
  }

  const diagnosis = ex.diagnose ? ex.diagnose(value) : null;
  const closest = Math.min(...ex.answers.map(answer => editDistance(value, normalize(answer))));
  const termsFound = ex.keyTerms.filter(term => value.includes(term)).length;
  if (diagnosis || closest <= 2 || termsFound === ex.keyTerms.length) {
    secured += 1;
    localStorage.setItem("satzwerk-secured", String(secured));
    const message = diagnosis || (closest <= 2 ? `You have the structure. Compare your spelling with: ${ex.answers[0]}.` : `Your message works. A more complete target form is: ${ex.answers[0]}.`);
    showFeedback("partial", "Understood—with one repair.", message, ex);
    updateProgress();
  } else {
    showFeedback("retry", "Let’s isolate the decision.", hintShown ? `Use this model: ${ex.answers[0]}. Type it once yourself before moving on.` : ex.hint, ex);
  }
});

els.hint.addEventListener("click", () => {
  const ex = exercises[current];
  hintShown = true;
  els.hint.textContent = ex.hint;
});

function advance() {
  current = (current + 1) % exercises.length;
  localStorage.setItem("satzwerk-current", String(current));
  render();
}

render();

function registerModelTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const lifecycle = new AbortController();
  const register = tool => {
    try { void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); }
    catch { /* Browsers without WebMCP keep the visible experience unchanged. */ }
  };

  register({
    name: "read_current_exercise",
    title: "Read current German exercise",
    description: "Read the visible Satzwerk exercise, its target, and the learner's current progress without changing anything.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute() {
      const ex = exercises[current];
      return { target: "das Papier", variation: current + 1, total: exercises.length, instruction: ex.label, context: ex.context, prompt: els.sentence.textContent, securedForms: secured };
    }
  });

  register({
    name: "submit_practice_answer",
    title: "Submit German answer",
    description: "Submit an answer to the currently visible German exercise and return the same formative feedback shown to the learner.",
    inputSchema: {
      type: "object",
      properties: { answer: { type: "string", minLength: 1, description: "The learner's German answer." } },
      required: ["answer"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!input || typeof input.answer !== "string" || !input.answer.trim()) throw new Error("A non-empty German answer is required.");
      els.input.value = input.answer;
      els.form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      return { outcome: els.kicker.textContent, feedback: els.feedbackText.textContent, securedForms: secured };
    }
  });
}

registerModelTools();
