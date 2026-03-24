'use client';

import { useState, useRef, useCallback } from 'react';

const AUDIO_TAGS = {
  'Emotions': [
    '[excited]', '[nervous]', '[frustrated]', '[sorrowful]', '[calm]',
    '[sarcastic]', '[curious]', '[awe]', '[wistful]', '[resigned]',
  ],
  'Delivery': [
    '[whispers]', '[shouting]', '[softly]', '[dramatic tone]',
    '[lighthearted]', '[serious tone]', '[matter-of-fact]', '[reflective]',
  ],
  'Reactions': [
    '[laughs]', '[sighs]', '[gasps]', '[gulps]', '[exhales]', '[crying]',
  ],
  'Pacing': [
    '[pause]', '[hesitates]', '[slows down]', '[rushed]', '[emphasized]',
  ],
} as const;

export default function Home() {
  const [scriptText, setScriptText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
        body: JSON.stringify({ text: trimmed }),
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
  }, [scriptText]);

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
      </header>

      {/* Main card */}
      <main className="w-full max-w-2xl">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
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
          <div className="mt-4 space-y-3">
            <p className="text-xs font-medium text-zinc-400">Voice Inflections <span className="text-zinc-600">— click to insert at cursor</span></p>
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

    </div>
  );
}
