'use client';

import { useState, useRef, useCallback, useMemo } from 'react';

const VOICES = [
  { id: 'ZIGffU92feoE7QFrof7N', name: 'Liam Callahan', desc: 'Narrative, American Male' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', desc: 'Mature & Confident, American Female' },
  { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily', desc: 'Velvety Actress, British Female' },
  { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', desc: 'Laid-Back & Casual, American Male' },
  { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian', desc: 'Deep & Resonant, American Male' },
  { id: 'SAz9YHcvj6GT2YYXdXww', name: 'River', desc: 'Relaxed & Neutral, American' },
  { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice', desc: 'Clear Educator, British Female' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', desc: 'Deep & Confident, Australian Male' },
] as const;

const STABILITY_PRESETS = [
  { id: 'creative', label: 'Creative', value: 0.20, desc: 'Expressive & emotional' },
  { id: 'natural', label: 'Natural', value: 0.35, desc: 'Balanced & neutral' },
  { id: 'robust', label: 'Robust', value: 0.75, desc: 'Stable & consistent' },
] as const;

const BREAK_TIMES = [
  { label: '0.5s', tag: '[pause]' },
  { label: '1.0s', tag: '[long pause]' },
  { label: '1.5s', tag: '...' },
  { label: '2.0s', tag: '... ...' },
  { label: '3.0s', tag: '... ... ...' },
] as const;

const AUDIO_TAGS = {
  'Emotions': [
    '[excited]', '[sarcastic]', '[curious]', '[crying]', '[mischievously]',
  ],
  'Delivery': [
    '[whispers]', '[sighs]', '[exhales]', '[muttering]', '[clears throat]',
  ],
  'Reactions': [
    '[laughs]', '[laughs harder]', '[starts laughing]', '[wheezing]',
    '[snorts]', '[chuckles]',
  ],
  'Sounds': [
    '[gulps]', '[swallows]', '[applause]', '[clapping]',
  ],
} as const;

const CMU_CONSONANTS = ['B','CH','D','DH','F','G','HH','JH','K','L','M','N','NG','P','R','S','SH','T','TH','V','W','Y','Z','ZH'];
const CMU_VOWELS = ['AA','AE','AH','AO','AW','AY','EH','ER','EY','IH','IY','OW','OY','UH','UW'];
const CMU_STRESS = ['0','1','2'];

interface Pronunciation {
  word: string;
  phonemes: string;
  fullMatch: string;
}

function parsePronunciations(text: string): Pronunciation[] {
  const regex = /<phoneme\s+alphabet="cmu-arpabet"\s+ph="([^"]*)">(.*?)<\/phoneme>/g;
  const results: Pronunciation[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    results.push({ word: match[2], phonemes: match[1], fullMatch: match[0] });
  }
  return results;
}

export default function Home() {
  const [scriptText, setScriptText] = useState('');
  const [voiceId, setVoiceId] = useState<string>(VOICES[0].id);
  const [speed, setSpeed] = useState<number>(1.1);
  const [stability, setStability] = useState<string>('natural');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTags, setShowTags] = useState(false);
  const [showPronunciationModal, setShowPronunciationModal] = useState(false);
  const [pronSelectedWord, setPronSelectedWord] = useState('');
  const [pronPhonemes, setPronPhonemes] = useState('');
  const [pronSelectionRange, setPronSelectionRange] = useState<[number, number]>([0, 0]);
  const [pronError, setPronError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const pronunciations = useMemo(() => parsePronunciations(scriptText), [scriptText]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.name.endsWith('.txt')) {
        setError('Only .txt files are supported.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        if (typeof content === 'string') {
          setScriptText(content);
          setError(null);
        }
      };
      reader.onerror = () => {
        setError('Failed to read the file. Please try again.');
      };
      reader.readAsText(file);

      // Reset input so the same file can be re-uploaded
      e.target.value = '';
    },
    []
  );

  const handleGenerate = useCallback(async () => {
    const trimmed = scriptText.trim();
    if (!trimmed) {
      setError('Please enter or upload a script before generating.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed, voiceId, speed, stability }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Generation failed (status ${response.status})`
        );
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'voiceover.mp3';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred.'
      );
    } finally {
      setIsGenerating(false);
    }
  }, [scriptText, voiceId, speed, stability]);

  const insertTag = useCallback((tag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setScriptText((prev) => prev + ' ' + tag + ' ');
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = scriptText.slice(0, start);
    const after = scriptText.slice(end);
    const inserted = before + tag + ' ' + after;
    setScriptText(inserted);
    // Restore cursor after the tag
    requestAnimationFrame(() => {
      textarea.focus();
      const pos = start + tag.length + 1;
      textarea.setSelectionRange(pos, pos);
    });
  }, [scriptText]);

  const handleOpenPronunciation = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end) {
      setPronError('Select a word first');
      setTimeout(() => setPronError(null), 2000);
      return;
    }
    const selected = scriptText.slice(start, end).trim();
    setPronSelectedWord(selected);
    setPronPhonemes('');
    setPronSelectionRange([start, end]);
    setShowPronunciationModal(true);
  }, [scriptText]);

  const handleApplyPronunciation = useCallback(() => {
    if (!pronPhonemes.trim()) return;
    const [start, end] = pronSelectionRange;
    const tag = `<phoneme alphabet="cmu-arpabet" ph="${pronPhonemes.trim()}">${pronSelectedWord}</phoneme>`;
    const newText = scriptText.slice(0, start) + tag + scriptText.slice(end);
    setScriptText(newText);
    setShowPronunciationModal(false);
  }, [pronPhonemes, pronSelectedWord, pronSelectionRange, scriptText]);

  const handleRemovePronunciation = useCallback((pron: Pronunciation) => {
    setScriptText((prev) => prev.replace(pron.fullMatch, pron.word));
  }, []);

  const charCount = scriptText.length;

  return (
    <div className="flex flex-col flex-1 items-center bg-[#0a0a0a] px-4 py-12 sm:py-20">
      {/* Header */}
      <header className="mb-10 text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-white"
            >
              <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
              <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Voice Over Agent
          </h1>
        </div>
        <p className="text-sm text-zinc-400">
          Paste your script or upload a text file, then generate a professional
          voice-over.
        </p>
        <a
          href="/docs"
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
          </svg>
          Usage Guide
        </a>
      </header>

      {/* Main card */}
      <main className="w-full max-w-2xl">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
          {/* Voice selector */}
          <label
            htmlFor="voice"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            Voice
          </label>
          <select
            id="voice"
            value={voiceId}
            onChange={(e) => setVoiceId(e.target.value)}
            disabled={isGenerating}
            className="mb-5 w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-sm text-zinc-100 transition-colors focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-50"
          >
            {VOICES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} — {v.desc}
              </option>
            ))}
          </select>

          {/* Speed selector */}
          <label
            htmlFor="speed"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            Speed
          </label>
          <div className="mb-5 flex gap-2">
            {([0.75, 0.9, 1.0, 1.1, 1.25, 1.5] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeed(s)}
                disabled={isGenerating}
                className={`flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
                  speed === s
                    ? 'border-violet-500 bg-violet-500/20 text-violet-300'
                    : 'border-zinc-700 bg-zinc-800/80 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                }`}
              >
                {s === 1.0 ? '1.0×' : `${s}×`}
              </button>
            ))}
          </div>

          {/* Stability preset */}
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Stability
          </label>
          <div className="mb-5 flex gap-2">
            {STABILITY_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setStability(p.id)}
                disabled={isGenerating}
                className={`flex-1 rounded-lg border px-2 py-2 text-center transition-colors disabled:opacity-50 ${
                  stability === p.id
                    ? 'border-violet-500 bg-violet-500/20'
                    : 'border-zinc-700 bg-zinc-800/80 hover:border-zinc-600'
                }`}
              >
                <span className={`block text-xs font-medium ${stability === p.id ? 'text-violet-300' : 'text-zinc-300'}`}>{p.label}</span>
                <span className="block text-[10px] text-zinc-500 mt-0.5">{p.desc}</span>
              </button>
            ))}
          </div>

          {/* Script input area */}
          <label
            htmlFor="script"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            Script
          </label>
          <textarea
            id="script"
            ref={textareaRef}
            rows={10}
            placeholder="Enter your voice-over script here..."
            value={scriptText}
            onChange={(e) => {
              setScriptText(e.target.value);
              if (error) setError(null);
            }}
            disabled={isGenerating}
            className="w-full resize-y rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-sm leading-relaxed text-zinc-100 placeholder-zinc-500 transition-colors focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-50"
          />

          {/* Audio Tags */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowTags((v) => !v)}
              disabled={isGenerating}
              className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-200 disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`h-3.5 w-3.5 transition-transform ${showTags ? 'rotate-90' : ''}`}
              >
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
              Voice Inflections {showTags && <span className="text-zinc-600">— click to insert at cursor</span>}
            </button>
          {showTags && <div className="mt-3 space-y-3">
            {Object.entries(AUDIO_TAGS).map(([category, tags]) => (
              <div key={category}>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => insertTag(tag)}
                      disabled={isGenerating}
                      className="rounded-md border border-zinc-700 bg-zinc-800/60 px-2.5 py-1 text-[11px] font-mono text-zinc-300 transition-all hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300 disabled:opacity-50"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>}
          </div>

          {/* Break Time inserter */}
          <div className="mt-3">
            <p className="mb-2 text-xs font-medium text-zinc-400">Insert Pause</p>
            <div className="flex flex-wrap gap-1.5">
              {BREAK_TIMES.map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => insertTag(b.tag)}
                  disabled={isGenerating}
                  className="rounded-md border border-zinc-700 bg-zinc-800/60 px-3 py-1 text-[11px] font-mono text-zinc-300 transition-all hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300 disabled:opacity-50"
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Set Pronunciation */}
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenPronunciation}
              disabled={isGenerating}
              className="flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/60 px-3 py-1 text-[11px] font-medium text-zinc-300 transition-all hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                <path fillRule="evenodd" d="M2.5 3A1.5 1.5 0 001 4.5v4A1.5 1.5 0 002.5 10h1.06a.5.5 0 01.354.147l2.94 2.94A.5.5 0 007.707 12.5V2.5a.5.5 0 00-.854-.354l-2.94 2.94A.5.5 0 013.56 5.5H2.5zM12.95 4.05a.75.75 0 00-1.06 1.06 3.5 3.5 0 010 4.95.75.75 0 001.06 1.06 5 5 0 000-7.07z" clipRule="evenodd" />
              </svg>
              Set Pronunciation
            </button>
            {pronError && (
              <span className="text-[11px] text-red-400">{pronError}</span>
            )}
          </div>

          {/* Controls row */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* File upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isGenerating}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-700 hover:text-white disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                Upload .txt
              </button>

              {/* Clear button */}
              {scriptText.length > 0 && !isGenerating && (
                <button
                  type="button"
                  onClick={() => {
                    setScriptText('');
                    setError(null);
                  }}
                  className="rounded-lg px-2.5 py-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
                >
                  Clear
                </button>
              )}
            </div>

            <span className="text-xs tabular-nums text-zinc-500">
              {charCount.toLocaleString()} characters
            </span>
          </div>

          {/* Error message */}
          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mt-0.5 h-4 w-4 shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Pronunciation overrides list */}
          {pronunciations.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-zinc-400">Pronunciation Overrides</p>
              <div className="space-y-1.5">
                {pronunciations.map((p, i) => (
                  <div key={i} className="flex items-center justify-between rounded-md border border-zinc-700/50 bg-zinc-800/40 px-3 py-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-zinc-200">{p.word}</span>
                      <span className="font-mono text-[11px] text-violet-400">{p.phonemes}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemovePronunciation(p)}
                      className="text-zinc-500 transition-colors hover:text-red-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generate button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || scriptText.trim().length === 0}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-violet-600"
          >
            {isGenerating ? (
              <>
                {/* Spinner */}
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Generating voice-over...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                  <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
                </svg>
                Generate Voice Over
              </>
            )}
          </button>
        </div>

        {/* Generating progress indicator */}
        {isGenerating && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
              <div className="animate-slide h-full w-2/5 rounded-full bg-violet-500" />
            </div>
            <p className="text-xs text-zinc-500">
              Processing your script. This may take a moment...
            </p>
          </div>
        )}
      </main>

      {/* Pronunciation Modal */}
      {showPronunciationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowPronunciationModal(false)}>
          <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-1 text-sm font-semibold text-zinc-100">Set Pronunciation</h3>
            <p className="mb-4 text-xs text-zinc-500">
              Define CMU Arpabet phonemes for <span className="font-medium text-zinc-300">&ldquo;{pronSelectedWord}&rdquo;</span>
            </p>

            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-zinc-500">Phonemes</label>
            <input
              type="text"
              value={pronPhonemes}
              onChange={(e) => setPronPhonemes(e.target.value)}
              placeholder="e.g. P R OW1 AE1 G R IY0"
              className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 font-mono text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              autoFocus
              onKeyDown={(e) => { if (e.key === 'Enter') handleApplyPronunciation(); }}
            />

            <div className="mb-2">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Consonants</p>
              <div className="flex flex-wrap gap-1">
                {CMU_CONSONANTS.map((c) => (
                  <button key={c} type="button" onClick={() => setPronPhonemes((p) => (p ? p + ' ' + c : c))}
                    className="rounded border border-zinc-700 bg-zinc-800/60 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 transition-colors hover:border-violet-500/50 hover:text-violet-300"
                  >{c}</button>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Vowels</p>
              <div className="flex flex-wrap gap-1">
                {CMU_VOWELS.map((v) => (
                  <button key={v} type="button" onClick={() => setPronPhonemes((p) => (p ? p + ' ' + v : v))}
                    className="rounded border border-zinc-700 bg-zinc-800/60 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 transition-colors hover:border-violet-500/50 hover:text-violet-300"
                  >{v}</button>
                ))}
              </div>
            </div>
            <div className="mb-5">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Stress</p>
              <div className="flex flex-wrap gap-1">
                {CMU_STRESS.map((s) => (
                  <button key={s} type="button" onClick={() => setPronPhonemes((p) => p + s)}
                    className="rounded border border-zinc-700 bg-zinc-800/60 px-2 py-0.5 font-mono text-[10px] text-zinc-400 transition-colors hover:border-violet-500/50 hover:text-violet-300"
                  >{s} {s === '0' ? '(none)' : s === '1' ? '(primary)' : '(secondary)'}</button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowPronunciationModal(false)}
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-200"
              >Cancel</button>
              <button type="button" onClick={handleApplyPronunciation}
                disabled={!pronPhonemes.trim()}
                className="rounded-lg bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-violet-500 disabled:opacity-50"
              >Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
