(function () {
  "use strict";

  const WORKER_VERSION = "speech-1";
  const TARGET_SAMPLE_RATE = 16000;
  const MIME_TYPES = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus"
  ];

  function supported() {
    return Boolean(
      navigator.mediaDevices?.getUserMedia
      && window.MediaRecorder
      && (window.AudioContext || window.webkitAudioContext)
      && window.Worker
    );
  }

  function preferredMimeType() {
    if (!window.MediaRecorder?.isTypeSupported) return "";
    return MIME_TYPES.find(type => MediaRecorder.isTypeSupported(type)) || "";
  }

  function stopTracks(stream) {
    stream?.getTracks?.().forEach(track => {
      try { track.stop(); } catch {}
    });
  }

  function mixToMono(buffer) {
    const mono = new Float32Array(buffer.length);
    const channels = Math.max(1, buffer.numberOfChannels);
    for (let channel = 0; channel < channels; channel += 1) {
      const data = buffer.getChannelData(channel);
      for (let index = 0; index < data.length; index += 1) mono[index] += data[index] / channels;
    }
    return mono;
  }

  function resampleLinear(input, sourceRate, targetRate = TARGET_SAMPLE_RATE) {
    if (sourceRate === targetRate) return input.slice();
    const targetLength = Math.max(1, Math.round(input.length * targetRate / sourceRate));
    const output = new Float32Array(targetLength);
    const ratio = sourceRate / targetRate;
    for (let index = 0; index < targetLength; index += 1) {
      const sourceIndex = index * ratio;
      const lower = Math.floor(sourceIndex);
      const upper = Math.min(input.length - 1, lower + 1);
      const blend = sourceIndex - lower;
      output[index] = input[lower] * (1 - blend) + input[upper] * blend;
    }
    return output;
  }

  async function decodeRecording(blob) {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContextCtor();
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const decoded = await context.decodeAudioData(arrayBuffer.slice(0));
      return resampleLinear(mixToMono(decoded), decoded.sampleRate);
    } finally {
      try { await context.close(); } catch {}
    }
  }

  class LocalGermanTranscriber {
    constructor(callbacks = {}) {
      this.callbacks = callbacks;
      this.worker = null;
      this.ready = false;
      this.loading = false;
      this.preparePromise = null;
      this.prepareResolve = null;
      this.prepareReject = null;
      this.recorder = null;
      this.stream = null;
      this.chunks = [];
      this.stopTimer = 0;
      this.recordingToken = 0;
      this.playbackUrl = "";
      this.transcribing = false;
      this.opening = false;
      this.nextRequestId = 0;
      this.activeRequestId = 0;
    }

    setCallbacks(callbacks = {}) {
      this.callbacks = callbacks;
    }

    emit(name, ...values) {
      const callback = this.callbacks?.[name];
      if (typeof callback === "function") callback(...values);
    }

    ensureWorker() {
      if (this.worker) return this.worker;
      const workerUrl = new URL(`./speech-transcriber-worker.js?v=${WORKER_VERSION}`, document.baseURI);
      this.worker = new Worker(workerUrl, { type: "module", name: "satzwerk-german-transcriber" });
      this.worker.addEventListener("message", event => this.handleWorkerMessage(event.data || {}));
      this.worker.addEventListener("error", event => {
        const message = event.message || "Local transcription could not start.";
        this.rejectPreparation(new Error(message));
        this.transcribing = false;
        this.emit("onError", message);
      });
      return this.worker;
    }

    handleWorkerMessage(message) {
      if (message.requestId && message.requestId !== this.activeRequestId) return;
      if (message.type === "progress") {
        this.emit("onProgress", message);
        return;
      }
      if (message.type === "ready") {
        this.ready = true;
        this.loading = false;
        this.prepareResolve?.(true);
        this.clearPreparationPromise();
        this.emit("onReady");
        return;
      }
      if (message.type === "result") {
        this.transcribing = false;
        this.activeRequestId = 0;
        this.emit("onResult", String(message.text || "").trim());
        return;
      }
      if (message.type === "error") {
        const error = new Error(message.message || "Local transcription failed.");
        this.rejectPreparation(error);
        this.transcribing = false;
        this.activeRequestId = 0;
        this.emit("onError", error.message);
      }
    }

    clearPreparationPromise() {
      this.preparePromise = null;
      this.prepareResolve = null;
      this.prepareReject = null;
    }

    rejectPreparation(error) {
      this.loading = false;
      this.prepareReject?.(error);
      this.clearPreparationPromise();
    }

    prepare() {
      if (!supported()) return Promise.reject(new Error("Local recording is unavailable in this browser."));
      if (this.ready) return Promise.resolve(true);
      if (this.preparePromise) return this.preparePromise;
      this.loading = true;
      this.preparePromise = new Promise((resolve, reject) => {
        this.prepareResolve = resolve;
        this.prepareReject = reject;
      });
      this.ensureWorker().postMessage({ type: "load" });
      return this.preparePromise;
    }

    async start(maxDurationMs = 15000) {
      if (!this.ready) throw new Error("Finish the local transcription setup before recording.");
      if (this.recorder || this.transcribing || this.opening) return false;
      this.opening = true;
      const token = ++this.recordingToken;
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
      } catch (error) {
        this.opening = false;
        throw error;
      }
      this.opening = false;
      if (token !== this.recordingToken) {
        stopTracks(stream);
        return false;
      }
      const mimeType = preferredMimeType();
      let recorder = null;
      try {
        recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
        this.stream = stream;
        this.recorder = recorder;
        this.chunks = [];
        recorder.addEventListener("dataavailable", event => {
          if (event.data?.size) this.chunks.push(event.data);
        });
        recorder.addEventListener("stop", () => this.finishRecording(token, recorder.mimeType || mimeType));
        recorder.addEventListener("error", event => {
          if (token !== this.recordingToken) return;
          this.cleanupRecorder();
          this.emit("onError", event.error?.message || "The recording stopped unexpectedly.");
        });
        recorder.start(250);
      } catch (error) {
        if (this.stream === stream) this.cleanupRecorder();
        else stopTracks(stream);
        this.chunks = [];
        throw error;
      }
      this.stopTimer = window.setTimeout(() => this.stop(), maxDurationMs);
      this.emit("onRecording", maxDurationMs);
      return true;
    }

    stop() {
      if (!this.recorder || this.recorder.state === "inactive") return false;
      window.clearTimeout(this.stopTimer);
      this.stopTimer = 0;
      try { this.recorder.stop(); } catch {
        this.cleanupRecorder();
        this.emit("onError", "The recording could not be finalized. Record again or type your transcript.");
        return false;
      }
      return true;
    }

    cleanupRecorder() {
      window.clearTimeout(this.stopTimer);
      this.stopTimer = 0;
      stopTracks(this.stream);
      this.stream = null;
      this.recorder = null;
    }

    async finishRecording(token, mimeType) {
      const chunks = this.chunks.slice();
      this.chunks = [];
      this.cleanupRecorder();
      if (token !== this.recordingToken) return;
      if (!chunks.length) {
        this.emit("onError", "No audio was captured. Record again or type your transcript.");
        return;
      }
      const blob = new Blob(chunks, { type: mimeType || chunks[0].type || "audio/webm" });
      if (this.playbackUrl) URL.revokeObjectURL(this.playbackUrl);
      this.playbackUrl = URL.createObjectURL(blob);
      this.emit("onPlayback", this.playbackUrl);
      this.transcribing = true;
      this.emit("onTranscribing");
      try {
        const audio = await decodeRecording(blob);
        if (token !== this.recordingToken) return;
        const requestId = ++this.nextRequestId;
        this.activeRequestId = requestId;
        this.ensureWorker().postMessage({
          type: "transcribe",
          requestId,
          audio: audio.buffer,
          sampleRate: TARGET_SAMPLE_RATE,
          language: "german"
        }, [audio.buffer]);
      } catch (error) {
        if (token !== this.recordingToken) return;
        this.transcribing = false;
        this.emit("onError", error?.message || "The recording could not be prepared for transcription.");
      }
    }

    cancel(options = {}) {
      this.recordingToken += 1;
      this.activeRequestId = 0;
      this.opening = false;
      if (this.recorder && this.recorder.state !== "inactive") {
        try { this.recorder.stop(); } catch {}
      }
      this.cleanupRecorder();
      this.chunks = [];
      this.transcribing = false;
      if (options.clearPlayback && this.playbackUrl) {
        URL.revokeObjectURL(this.playbackUrl);
        this.playbackUrl = "";
      }
    }

    state() {
      return {
        supported: supported(),
        ready: this.ready,
        loading: this.loading,
        opening: this.opening,
        recording: Boolean(this.recorder && this.recorder.state !== "inactive"),
        transcribing: this.transcribing
      };
    }
  }

  window.SatzwerkLocalSpeech = Object.freeze({
    LocalGermanTranscriber,
    supported,
    targetSampleRate: TARGET_SAMPLE_RATE
  });
})();
