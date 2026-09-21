const TRANSFORMERS_URL = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1";
const MODEL_ID = "onnx-community/whisper-tiny";
const MODEL_REVISION = "ff4177021cc41f7db950912b73ea4fdf7d01d8e7";

let transcriberPromise = null;
let inferenceQueue = Promise.resolve();

function errorMessage(error) {
  return String(error?.message || error || "Local transcription failed.");
}

function progressMessage(data = {}) {
  const progress = Number.isFinite(data.progress) ? Math.max(0, Math.min(100, data.progress)) : null;
  return {
    type: "progress",
    status: data.status || "loading",
    file: data.file || "",
    progress
  };
}

async function loadTranscriber() {
  if (transcriberPromise) return transcriberPromise;
  transcriberPromise = (async () => {
    const { env, pipeline } = await import(TRANSFORMERS_URL);
    env.allowLocalModels = false;
    env.useBrowserCache = true;
    return pipeline("automatic-speech-recognition", MODEL_ID, {
      device: "wasm",
      dtype: "q8",
      revision: MODEL_REVISION,
      progress_callback: data => self.postMessage(progressMessage(data))
    });
  })();
  try {
    return await transcriberPromise;
  } catch (error) {
    transcriberPromise = null;
    throw error;
  }
}

self.addEventListener("message", async event => {
  const message = event.data || {};
  if (message.type === "load") {
    try {
      await loadTranscriber();
      self.postMessage({ type: "ready" });
    } catch (error) {
      self.postMessage({ type: "error", phase: "load", message: errorMessage(error) });
    }
    return;
  }

  if (message.type === "transcribe") {
    const requestId = message.requestId;
    const audio = new Float32Array(message.audio);
    inferenceQueue = inferenceQueue.then(async () => {
      try {
        const transcriber = await loadTranscriber();
        const result = await transcriber(audio, {
          language: message.language || "german",
          task: "transcribe",
          chunk_length_s: 30,
          stride_length_s: 5
        });
        self.postMessage({ type: "result", requestId, text: String(result?.text || "").trim() });
      } catch (error) {
        self.postMessage({ type: "error", phase: "transcribe", requestId, message: errorMessage(error) });
      }
    });
  }
});
