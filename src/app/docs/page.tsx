import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Docs — Voice Over Agent',
  description: 'Guide for using the Voice Over Agent: voice settings, pronunciation control, delivery tips, and best practices.',
};

/* ── Tiny helpers ── */
const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'voices', label: 'Voices & Settings' },
  { id: 'stability', label: 'Stability Presets' },
  { id: 'delivery', label: 'Delivery Control' },
  { id: 'break-times', label: 'Break Times & Pauses' },
  { id: 'multi-speaker', label: 'Multi-Speaker Dialogue' },
  { id: 'pronunciation', label: 'Pronunciation (CMU)' },
  { id: 'dictionaries', label: 'Pronunciation Dictionaries' },
  { id: 'normalization', label: 'Text Normalization' },
  { id: 'audio-tags', label: 'Audio Tags' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
];

function Code({ children }: { children: string }) {
  return <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-[13px] text-violet-300">{children}</code>;
}

function Pre({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-[13px] leading-relaxed text-zinc-300">
      <code>{children}</code>
    </pre>
  );
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-200/90">
      <span className="mr-1.5 font-semibold text-amber-400">Note:</span>
      {children}
    </div>
  );
}

/* ── Page ── */
export default function DocsPage() {
  return (
    <div className="flex min-h-full bg-[#0a0a0a]">
      {/* ── Sidebar ── */}
      <aside className="hidden w-56 shrink-0 border-r border-zinc-800/60 px-4 py-10 lg:block">
        <Link href="/" className="mb-8 flex items-center gap-2 text-sm font-semibold text-zinc-200 transition-colors hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-violet-400">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          Back to Agent
        </Link>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Guide</p>
        <nav className="space-y-1">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="block rounded-lg px-3 py-1.5 text-[13px] text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-zinc-200"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* ── Content ── */}
      <main className="flex-1 overflow-y-auto px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          {/* Mobile back link */}
          <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-violet-400 transition-colors hover:text-violet-300 lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Back to Agent
          </Link>

          {/* ═══ Overview ═══ */}
          <section id="overview" className="mb-14">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white">Voice Over Agent Guide</h1>
            <p className="mb-6 text-zinc-400 leading-relaxed">
              Everything you need to produce professional voice-overs with the Voice Over Agent.
              This guide covers voice selection, delivery control, pronunciation fine-tuning, and
              troubleshooting — so your scripts sound exactly how you intend.
            </p>
            <div className="overflow-hidden rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-zinc-800">
                  <tr><td className="px-4 py-2.5 font-medium text-zinc-300">Supported languages</td><td className="px-4 py-2.5 text-zinc-400">70+</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-zinc-300">Available voices</td><td className="px-4 py-2.5 text-zinc-400">8 curated + thousands via Voice Library</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-zinc-300">Output format</td><td className="px-4 py-2.5 text-zinc-400">MP3 (high-quality, 44.1 kHz)</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-zinc-300">Speed range</td><td className="px-4 py-2.5 text-zinc-400">0.75x &ndash; 1.5x</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ═══ Quick Start ═══ */}
          <section id="quick-start" className="mb-14">
            <h2 className="mb-4 text-xl font-semibold text-white">Quick Start</h2>
            <ol className="space-y-3 text-sm text-zinc-300">
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-400">1</span><span>Choose a <strong className="text-white">voice</strong> from the dropdown &mdash; each has a unique tone and style.</span></li>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-400">2</span><span>Select your desired <strong className="text-white">speed</strong> (1.0x is natural; 1.1x is the default).</span></li>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-400">3</span><span>Paste or type your script in the text area, or click <strong className="text-white">Upload .txt</strong> to load a file.</span></li>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-400">4</span><span>Optionally insert <strong className="text-white">Voice Inflections</strong> (audio tags) at the cursor position.</span></li>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-400">5</span><span>Click <strong className="text-white">Generate Voice Over</strong> &mdash; the MP3 downloads automatically.</span></li>
            </ol>
          </section>

          {/* ═══ Voices & Settings ═══ */}
          <section id="voices" className="mb-14">
            <h2 className="mb-4 text-xl font-semibold text-white">Voices &amp; Settings</h2>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Available Voices</h3>
            <div className="mb-6 overflow-hidden rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-zinc-800 bg-zinc-900/50"><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Voice</th><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Style</th></tr></thead>
                <tbody className="divide-y divide-zinc-800/60">
                  <tr><td className="px-4 py-2 text-zinc-200">Liam Callahan</td><td className="px-4 py-2 text-zinc-400">Narrative, American Male</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200">Sarah</td><td className="px-4 py-2 text-zinc-400">Mature &amp; Confident, American Female</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200">Lily</td><td className="px-4 py-2 text-zinc-400">Velvety Actress, British Female</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200">Roger</td><td className="px-4 py-2 text-zinc-400">Laid-Back &amp; Casual, American Male</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200">Brian</td><td className="px-4 py-2 text-zinc-400">Deep &amp; Resonant, American Male</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200">River</td><td className="px-4 py-2 text-zinc-400">Relaxed &amp; Neutral, American</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200">Alice</td><td className="px-4 py-2 text-zinc-400">Clear Educator, British Female</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200">Charlie</td><td className="px-4 py-2 text-zinc-400">Deep &amp; Confident, Australian Male</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Choosing the Right Voice</h3>
            <ul className="mb-6 space-y-1.5 text-sm text-zinc-300">
              <li>&bull; <strong className="text-white">Corporate narration:</strong> Liam Callahan, Brian, or Alice &mdash; authoritative and clear</li>
              <li>&bull; <strong className="text-white">Conversational ads:</strong> Roger or River &mdash; relaxed, approachable</li>
              <li>&bull; <strong className="text-white">Dramatic / storytelling:</strong> Lily or Sarah &mdash; expressive range</li>
              <li>&bull; <strong className="text-white">Explainer / educational:</strong> Alice or Charlie &mdash; steady pacing</li>
            </ul>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Speed Guide</h3>
            <div className="overflow-hidden rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-zinc-800 bg-zinc-900/50"><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Speed</th><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Best For</th></tr></thead>
                <tbody className="divide-y divide-zinc-800/60">
                  <tr><td className="px-4 py-2 text-zinc-200">0.75x</td><td className="px-4 py-2 text-zinc-400">Slow, deliberate delivery &mdash; emphasis-heavy content, dramatic reads</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200">0.9x</td><td className="px-4 py-2 text-zinc-400">Slightly relaxed &mdash; educational, explainer videos</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200">1.0x</td><td className="px-4 py-2 text-zinc-400">Natural speaking pace &mdash; general narration</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200">1.1x (default)</td><td className="px-4 py-2 text-zinc-400">Slightly upbeat &mdash; promos, social media ads</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200">1.25x</td><td className="px-4 py-2 text-zinc-400">Energetic &mdash; fast-paced ads, teasers</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200">1.5x</td><td className="px-4 py-2 text-zinc-400">Rapid &mdash; legal disclaimers, fine-print reads</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ═══ Stability Presets ═══ */}
          <section id="stability" className="mb-14">
            <h2 className="mb-4 text-xl font-semibold text-white">Stability Presets</h2>
            <p className="mb-4 text-sm text-zinc-300">
              The <strong className="text-white">Stability</strong> setting is the most important control in the Voice Over Agent.
              It determines how closely the generated voice follows the original reference audio.
            </p>
            <div className="mb-6 overflow-hidden rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-zinc-800 bg-zinc-900/50"><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Preset</th><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Behavior</th><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Best For</th></tr></thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr>
                    <td className="px-4 py-2.5"><span className="rounded bg-violet-500/20 px-2 py-0.5 text-xs font-semibold text-violet-300">Creative</span></td>
                    <td className="px-4 py-2.5 text-zinc-400">More emotional and expressive, but prone to hallucinations</td>
                    <td className="px-4 py-2.5 text-zinc-400">Dramatic reads, storytelling, character voices</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5"><span className="rounded bg-violet-500/20 px-2 py-0.5 text-xs font-semibold text-violet-300">Natural</span></td>
                    <td className="px-4 py-2.5 text-zinc-400">Closest to the original voice recording &mdash; balanced and neutral</td>
                    <td className="px-4 py-2.5 text-zinc-400">General narration, promos, most use cases (default)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5"><span className="rounded bg-violet-500/20 px-2 py-0.5 text-xs font-semibold text-violet-300">Robust</span></td>
                    <td className="px-4 py-2.5 text-zinc-400">Highly stable but less responsive to directional prompts &mdash; consistent output</td>
                    <td className="px-4 py-2.5 text-zinc-400">Corporate, legal, long-form where consistency matters</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">How Stability Affects Audio Tags</h3>
            <p className="mb-3 text-sm text-zinc-300">
              For maximum expressiveness with audio tags (like <Code>{`[excited]`}</Code> or <Code>{`[whispers]`}</Code>),
              use <strong className="text-white">Creative</strong> or <strong className="text-white">Natural</strong>.
              Robust reduces responsiveness to these directional prompts.
            </p>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Neutral Voices + Stability</h3>
            <p className="mb-3 text-sm text-zinc-300">
              Neutral voices (like <strong className="text-white">River</strong> or <strong className="text-white">Alice</strong>)
              tend to be more stable across languages and styles, providing reliable baseline performance.
              Pairing a neutral voice with <strong className="text-white">Natural</strong> stability gives you a dependable
              foundation without sacrificing moderate expressiveness.
            </p>
            <ul className="space-y-1.5 text-sm text-zinc-300">
              <li>&bull; <strong className="text-white">Neutral voice + Creative</strong> &mdash; good range of expression with fewer hallucinations than emotive voices</li>
              <li>&bull; <strong className="text-white">Neutral voice + Natural</strong> &mdash; safest all-round choice</li>
              <li>&bull; <strong className="text-white">Emotive voice + Robust</strong> &mdash; tames an expressive voice for consistent output</li>
            </ul>
          </section>

          {/* ═══ Delivery Control ═══ */}
          <section id="delivery" className="mb-14">
            <h2 className="mb-4 text-xl font-semibold text-white">Delivery Control</h2>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Pauses</h3>
            <p className="mb-3 text-sm text-zinc-300">The voice engine reads punctuation as natural pauses. Use these in your script to control rhythm:</p>
            <div className="mb-6 overflow-hidden rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-zinc-800 bg-zinc-900/50"><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Technique</th><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Effect</th></tr></thead>
                <tbody className="divide-y divide-zinc-800/60">
                  <tr><td className="px-4 py-2 text-zinc-200"><Code>,</Code> (comma)</td><td className="px-4 py-2 text-zinc-400">Brief pause</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200"><Code>.</Code> (period)</td><td className="px-4 py-2 text-zinc-400">Full stop &mdash; natural sentence break</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200"><Code>...</Code> (ellipsis)</td><td className="px-4 py-2 text-zinc-400">Weighted, dramatic pause</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200"><Code>&mdash;</Code> or <Code>--</Code></td><td className="px-4 py-2 text-zinc-400">Short, abrupt pause (thought break)</td></tr>
                  <tr><td className="px-4 py-2 text-zinc-200">Line break</td><td className="px-4 py-2 text-zinc-400">Separates ideas with a breath</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Emphasis</h3>
            <p className="mb-3 text-sm text-zinc-300">Use CAPITALIZATION to stress individual words:</p>
            <Pre>{`We don't just grow crops. We grow FUTURES.`}</Pre>

            <h3 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Emotion</h3>
            <p className="mb-3 text-sm text-zinc-300">
              Emotion comes from <strong className="text-white">text context</strong>, not settings.
              Add narrative cues to guide the voice&apos;s tone:
            </p>
            <Pre>{`(excitedly) This changes everything for South African farmers!

(with quiet confidence) ProAgri has been at the forefront... for decades.`}</Pre>
            <p className="mt-3 text-sm text-zinc-400">
              Tip: generate with cues, then re-generate without them if you prefer a subtler read.
              The cues &ldquo;prime&rdquo; the voice even when removed from surrounding text.
            </p>
          </section>

          {/* ═══ Break Times & Pauses ═══ */}
          <section id="break-times" className="mb-14">
            <h2 className="mb-4 text-xl font-semibold text-white">Break Times &amp; Pauses</h2>
            <p className="mb-4 text-sm text-zinc-300">
              Use the <strong className="text-white">Insert Pause</strong> buttons below the script area to add timed breaks,
              or type them manually. The voice engine interprets these as natural pauses of varying length.
            </p>
            <div className="mb-6 overflow-hidden rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-zinc-800 bg-zinc-900/50"><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Duration</th><th className="px-4 py-2.5 text-left font-medium text-zinc-400">What to Type</th><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Use Case</th></tr></thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr><td className="px-4 py-2">~0.5s</td><td className="px-4 py-2"><Code>{`[pause]`}</Code></td><td className="px-4 py-2 text-zinc-400">Brief breath between clauses</td></tr>
                  <tr><td className="px-4 py-2">~1.0s</td><td className="px-4 py-2"><Code>{`[long pause]`}</Code></td><td className="px-4 py-2 text-zinc-400">Between sentences or ideas</td></tr>
                  <tr><td className="px-4 py-2">~1.5s</td><td className="px-4 py-2"><Code>...</Code></td><td className="px-4 py-2 text-zinc-400">Dramatic pause, building tension</td></tr>
                  <tr><td className="px-4 py-2">~2.0s</td><td className="px-4 py-2"><Code>... ...</Code></td><td className="px-4 py-2 text-zinc-400">Scene transition, topic change</td></tr>
                  <tr><td className="px-4 py-2">~3.0s</td><td className="px-4 py-2"><Code>... ... ...</Code></td><td className="px-4 py-2 text-zinc-400">Long break between sections</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Other Pause Techniques</h3>
            <ul className="mb-4 space-y-1.5 text-sm text-zinc-300">
              <li>&bull; <strong className="text-white">Comma</strong> <Code>,</Code> &mdash; brief, natural pause</li>
              <li>&bull; <strong className="text-white">Period</strong> <Code>.</Code> &mdash; full sentence stop</li>
              <li>&bull; <strong className="text-white">Dash</strong> <Code>&mdash;</Code> or <Code>--</Code> &mdash; abrupt thought break</li>
              <li>&bull; <strong className="text-white">Line break</strong> &mdash; separates ideas with a breath</li>
            </ul>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Example: Using Pauses for Impact</h3>
            <Pre>{`We don't just grow crops.

[long pause]

We grow FUTURES.

... ...

ProAgri -- where agriculture meets innovation.`}</Pre>
          </section>

          {/* ═══ Multi-Speaker Dialogue ═══ */}
          <section id="multi-speaker" className="mb-14">
            <h2 className="mb-4 text-xl font-semibold text-white">Multi-Speaker Dialogue</h2>
            <p className="mb-4 text-sm text-zinc-300">
              You can write dialogue-style scripts with speaker labels and stage directions.
              The voice engine picks up on these cues to adjust timing, emotion, and delivery.
              Generate each speaker&apos;s lines separately with different voices, then combine in your editor.
            </p>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Dialogue Format</h3>
            <p className="mb-3 text-sm text-zinc-300">
              Use <Code>{`[direction]`}</Code> tags inline to control how lines are delivered:
            </p>
            <Pre>{`Speaker 1: [starting to speak] So I was thinking we could—
Speaker 2: [jumping in] —test our new timing features?
Speaker 1: [surprised] Exactly! How did you—
Speaker 2: [overlapping] —know what you were thinking? Lucky guess!
Speaker 1: [pause] Sorry, go ahead.
Speaker 2: [cautiously] Okay, so if we both try to talk at the same time—
Speaker 1: [overlapping] —we'll probably crash the system!
Speaker 2: [panicking] Wait, are we crashing? I can't tell if this is a feature or a—
Speaker 1: [interrupting, then stopping abruptly] Bug! ...Did I just cut you off again?
Speaker 2: [sighing] Yes, but honestly? This is kind of fun.
Speaker 1: [mischievously] Race you to the next sentence!
Speaker 2: [laughing] We're definitely going to break something!`}</Pre>

            <h3 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">How to Produce Multi-Speaker Audio</h3>
            <ol className="mb-4 space-y-2 text-sm text-zinc-300">
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-400">1</span><span>Write the full dialogue script with speaker labels</span></li>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-400">2</span><span>Extract <strong className="text-white">Speaker 1&apos;s</strong> lines &mdash; paste into the agent, choose a voice (e.g. Liam), generate</span></li>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-400">3</span><span>Extract <strong className="text-white">Speaker 2&apos;s</strong> lines &mdash; choose a different voice (e.g. Sarah), generate</span></li>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-400">4</span><span>Combine the audio files in an editor, overlapping where marked</span></li>
            </ol>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Direction Tags That Work Well</h3>
            <div className="overflow-hidden rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-zinc-800 bg-zinc-900/50"><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Tag</th><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Effect</th></tr></thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr><td className="px-4 py-2"><Code>{`[starting to speak]`}</Code></td><td className="px-4 py-2 text-zinc-400">Gradual onset, natural beginning</td></tr>
                  <tr><td className="px-4 py-2"><Code>{`[jumping in]`}</Code></td><td className="px-4 py-2 text-zinc-400">Quick, eager interruption</td></tr>
                  <tr><td className="px-4 py-2"><Code>{`[surprised]`}</Code></td><td className="px-4 py-2 text-zinc-400">Raised pitch, taken aback</td></tr>
                  <tr><td className="px-4 py-2"><Code>{`[cautiously]`}</Code></td><td className="px-4 py-2 text-zinc-400">Careful, measured delivery</td></tr>
                  <tr><td className="px-4 py-2"><Code>{`[overlapping]`}</Code></td><td className="px-4 py-2 text-zinc-400">Rushed, talking over someone</td></tr>
                  <tr><td className="px-4 py-2"><Code>{`[panicking]`}</Code></td><td className="px-4 py-2 text-zinc-400">Fast, stressed delivery</td></tr>
                  <tr><td className="px-4 py-2"><Code>{`[interrupting, then stopping abruptly]`}</Code></td><td className="px-4 py-2 text-zinc-400">Sharp cut, sudden silence</td></tr>
                  <tr><td className="px-4 py-2"><Code>{`[pause]`}</Code></td><td className="px-4 py-2 text-zinc-400">Brief silence before continuing</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ═══ Pronunciation (CMU) ═══ */}
          <section id="pronunciation" className="mb-14">
            <h2 className="mb-4 text-xl font-semibold text-white">Pronunciation Control (CMU Phonemes)</h2>

            <Warn>
              Phoneme tags only work when the agent uses the <strong>Flash v2</strong> or <strong>English v1</strong> model internally.
              They only apply to <strong>English</strong> words &mdash; for other languages, use alias tags (see Dictionaries below).
            </Warn>

            <h3 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">What Is CMU?</h3>
            <p className="mb-3 text-sm text-zinc-300">
              CMU (Carnegie Mellon Pronouncing Dictionary) maps words to <strong className="text-white">ARPABET phonemes</strong> &mdash;
              a standardized set of sound codes. Stress is marked with numbers: <Code>0</Code> (unstressed),
              <Code>1</Code> (primary), <Code>2</Code> (secondary).
            </p>
            <p className="mb-4 text-sm text-zinc-400">Example: <Code>{`"hello"`}</Code> &rarr; <Code>HH AH0 L OW1</Code></p>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">SSML Phoneme Tag</h3>
            <Pre>{`<phoneme alphabet="cmu-arpabet" ph="HH AH0 L OW1">hello</phoneme>`}</Pre>

            <h3 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Consonant Reference</h3>
            <div className="mb-6 overflow-hidden rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-zinc-800 bg-zinc-900/50"><th className="px-4 py-2 text-left font-medium text-zinc-400">Sound</th><th className="px-4 py-2 text-left font-medium text-zinc-400">CMU</th><th className="px-4 py-2 text-left font-medium text-zinc-400">Example</th></tr></thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr><td className="px-4 py-1.5">b</td><td className="px-4 py-1.5"><Code>B</Code></td><td className="px-4 py-1.5"><strong>b</strong>at</td></tr>
                  <tr><td className="px-4 py-1.5">d</td><td className="px-4 py-1.5"><Code>D</Code></td><td className="px-4 py-1.5"><strong>d</strong>og</td></tr>
                  <tr><td className="px-4 py-1.5">f</td><td className="px-4 py-1.5"><Code>F</Code></td><td className="px-4 py-1.5"><strong>f</strong>an</td></tr>
                  <tr><td className="px-4 py-1.5">g</td><td className="px-4 py-1.5"><Code>G</Code></td><td className="px-4 py-1.5"><strong>g</strong>oat</td></tr>
                  <tr><td className="px-4 py-1.5">h</td><td className="px-4 py-1.5"><Code>HH</Code></td><td className="px-4 py-1.5"><strong>h</strong>at</td></tr>
                  <tr><td className="px-4 py-1.5">j (jar)</td><td className="px-4 py-1.5"><Code>JH</Code></td><td className="px-4 py-1.5"><strong>j</strong>oy</td></tr>
                  <tr><td className="px-4 py-1.5">k</td><td className="px-4 py-1.5"><Code>K</Code></td><td className="px-4 py-1.5"><strong>k</strong>ite</td></tr>
                  <tr><td className="px-4 py-1.5">l</td><td className="px-4 py-1.5"><Code>L</Code></td><td className="px-4 py-1.5"><strong>l</strong>eg</td></tr>
                  <tr><td className="px-4 py-1.5">m</td><td className="px-4 py-1.5"><Code>M</Code></td><td className="px-4 py-1.5"><strong>m</strong>an</td></tr>
                  <tr><td className="px-4 py-1.5">n</td><td className="px-4 py-1.5"><Code>N</Code></td><td className="px-4 py-1.5"><strong>n</strong>et</td></tr>
                  <tr><td className="px-4 py-1.5">ng</td><td className="px-4 py-1.5"><Code>NG</Code></td><td className="px-4 py-1.5">si<strong>ng</strong></td></tr>
                  <tr><td className="px-4 py-1.5">p</td><td className="px-4 py-1.5"><Code>P</Code></td><td className="px-4 py-1.5"><strong>p</strong>en</td></tr>
                  <tr><td className="px-4 py-1.5">r</td><td className="px-4 py-1.5"><Code>R</Code></td><td className="px-4 py-1.5"><strong>r</strong>ed</td></tr>
                  <tr><td className="px-4 py-1.5">s</td><td className="px-4 py-1.5"><Code>S</Code></td><td className="px-4 py-1.5"><strong>s</strong>un</td></tr>
                  <tr><td className="px-4 py-1.5">sh</td><td className="px-4 py-1.5"><Code>SH</Code></td><td className="px-4 py-1.5"><strong>sh</strong>ip</td></tr>
                  <tr><td className="px-4 py-1.5">t</td><td className="px-4 py-1.5"><Code>T</Code></td><td className="px-4 py-1.5"><strong>t</strong>op</td></tr>
                  <tr><td className="px-4 py-1.5">th (thin)</td><td className="px-4 py-1.5"><Code>TH</Code></td><td className="px-4 py-1.5"><strong>th</strong>ink</td></tr>
                  <tr><td className="px-4 py-1.5">th (this)</td><td className="px-4 py-1.5"><Code>DH</Code></td><td className="px-4 py-1.5"><strong>th</strong>is</td></tr>
                  <tr><td className="px-4 py-1.5">v</td><td className="px-4 py-1.5"><Code>V</Code></td><td className="px-4 py-1.5"><strong>v</strong>an</td></tr>
                  <tr><td className="px-4 py-1.5">w</td><td className="px-4 py-1.5"><Code>W</Code></td><td className="px-4 py-1.5"><strong>w</strong>et</td></tr>
                  <tr><td className="px-4 py-1.5">y</td><td className="px-4 py-1.5"><Code>Y</Code></td><td className="px-4 py-1.5"><strong>y</strong>es</td></tr>
                  <tr><td className="px-4 py-1.5">z</td><td className="px-4 py-1.5"><Code>Z</Code></td><td className="px-4 py-1.5"><strong>z</strong>oo</td></tr>
                  <tr><td className="px-4 py-1.5">zh</td><td className="px-4 py-1.5"><Code>ZH</Code></td><td className="px-4 py-1.5">mea<strong>s</strong>ure</td></tr>
                  <tr><td className="px-4 py-1.5">ch</td><td className="px-4 py-1.5"><Code>CH</Code></td><td className="px-4 py-1.5"><strong>ch</strong>in</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Vowel Reference</h3>
            <div className="mb-6 overflow-hidden rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-zinc-800 bg-zinc-900/50"><th className="px-4 py-2 text-left font-medium text-zinc-400">Sound</th><th className="px-4 py-2 text-left font-medium text-zinc-400">CMU</th><th className="px-4 py-2 text-left font-medium text-zinc-400">Example</th></tr></thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr><td className="px-4 py-1.5">ah (sofa)</td><td className="px-4 py-1.5"><Code>AH0</Code> / <Code>AH1</Code></td><td className="px-4 py-1.5"><strong>a</strong>bout</td></tr>
                  <tr><td className="px-4 py-1.5">ae (cat)</td><td className="px-4 py-1.5"><Code>AE1</Code></td><td className="px-4 py-1.5">c<strong>a</strong>t</td></tr>
                  <tr><td className="px-4 py-1.5">ee (see)</td><td className="px-4 py-1.5"><Code>IY1</Code></td><td className="px-4 py-1.5">s<strong>ee</strong></td></tr>
                  <tr><td className="px-4 py-1.5">eh (bed)</td><td className="px-4 py-1.5"><Code>EH1</Code></td><td className="px-4 py-1.5">b<strong>e</strong>d</td></tr>
                  <tr><td className="px-4 py-1.5">ih (sit)</td><td className="px-4 py-1.5"><Code>IH1</Code></td><td className="px-4 py-1.5">s<strong>i</strong>t</td></tr>
                  <tr><td className="px-4 py-1.5">oh (go)</td><td className="px-4 py-1.5"><Code>OW1</Code></td><td className="px-4 py-1.5">g<strong>o</strong></td></tr>
                  <tr><td className="px-4 py-1.5">oo (blue)</td><td className="px-4 py-1.5"><Code>UW1</Code></td><td className="px-4 py-1.5">bl<strong>ue</strong></td></tr>
                  <tr><td className="px-4 py-1.5">uh (put)</td><td className="px-4 py-1.5"><Code>UH1</Code></td><td className="px-4 py-1.5">p<strong>u</strong>t</td></tr>
                  <tr><td className="px-4 py-1.5">aw (saw)</td><td className="px-4 py-1.5"><Code>AO1</Code></td><td className="px-4 py-1.5">s<strong>aw</strong></td></tr>
                  <tr><td className="px-4 py-1.5">er (bird)</td><td className="px-4 py-1.5"><Code>ER1</Code></td><td className="px-4 py-1.5">b<strong>ir</strong>d</td></tr>
                  <tr><td className="px-4 py-1.5">ay (my)</td><td className="px-4 py-1.5"><Code>AY1</Code></td><td className="px-4 py-1.5">m<strong>y</strong></td></tr>
                  <tr><td className="px-4 py-1.5">oy (boy)</td><td className="px-4 py-1.5"><Code>OY1</Code></td><td className="px-4 py-1.5">b<strong>oy</strong></td></tr>
                  <tr><td className="px-4 py-1.5">ow (cow)</td><td className="px-4 py-1.5"><Code>AW1</Code></td><td className="px-4 py-1.5">c<strong>ow</strong></td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Step-by-Step: Fixing a Pronunciation</h3>
            <ol className="mb-4 space-y-2 text-sm text-zinc-300">
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-400">1</span><span>Break the word into syllables: &ldquo;ProAgri&rdquo; &rarr; Pro-Ag-ri</span></li>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-400">2</span><span>Map each sound: &rarr; <Code>P R OW1 AE1 G R IY0</Code></span></li>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-bold text-violet-400">3</span><span>Wrap in SSML:</span></li>
            </ol>
            <Pre>{`<phoneme alphabet="cmu-arpabet" ph="P R OW1 AE1 G R IY0">ProAgri</phoneme>`}</Pre>

            <h3 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Common Examples</h3>
            <div className="mb-6 overflow-hidden rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-zinc-800 bg-zinc-900/50"><th className="px-4 py-2 text-left font-medium text-zinc-400">Word</th><th className="px-4 py-2 text-left font-medium text-zinc-400">Phonemes</th></tr></thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr><td className="px-4 py-2">Daniel</td><td className="px-4 py-2"><Code>D AE1 N Y AH0 L</Code></td></tr>
                  <tr><td className="px-4 py-2">Nike</td><td className="px-4 py-2"><Code>N AY1 K IY0</Code></td></tr>
                  <tr><td className="px-4 py-2">Xander</td><td className="px-4 py-2"><Code>Z AH0 N D ER1</Code></td></tr>
                  <tr><td className="px-4 py-2">Agri</td><td className="px-4 py-2"><Code>AE1 G R IY0</Code></td></tr>
                  <tr><td className="px-4 py-2">ProAgri</td><td className="px-4 py-2"><Code>P R OW1 AE1 G R IY0</Code></td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Tips</h3>
            <ul className="space-y-1.5 text-sm text-zinc-300">
              <li>&bull; Adjust <strong className="text-white">stress first</strong>, then vowels &mdash; stress errors are more noticeable</li>
              <li>&bull; Modify <strong className="text-white">one phoneme at a time</strong> and re-test</li>
              <li>&bull; CMU Arpabet is more consistent than IPA with current voice models</li>
              <li>&bull; Each word needs its <strong className="text-white">own phoneme tag</strong></li>
            </ul>
          </section>

          {/* ═══ Pronunciation Dictionaries ═══ */}
          <section id="dictionaries" className="mb-14">
            <h2 className="mb-4 text-xl font-semibold text-white">Pronunciation Dictionaries</h2>
            <p className="mb-4 text-sm text-zinc-300">
              For words you use repeatedly, create a dictionary file instead of adding inline tags each time.
              Dictionaries use PLS (XML) format:
            </p>
            <Pre>{`<?xml version="1.0" encoding="UTF-8"?>
<lexicon version="1.0"
  xmlns="http://www.w3.org/2005/01/pronunciation-lexicon"
  alphabet="cmu-arpabet" xml:lang="en-US">
  <lexeme>
    <grapheme>ProAgri</grapheme>
    <phoneme>P R OW1 AE1 G R IY0</phoneme>
  </lexeme>
  <lexeme>
    <grapheme>Claughton</grapheme>
    <alias>Cloffton</alias>
  </lexeme>
</lexicon>`}</Pre>
            <h3 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Key Rules</h3>
            <ul className="space-y-1.5 text-sm text-zinc-300">
              <li>&bull; <strong className="text-white">First match wins</strong> &mdash; the system uses only the first matching replacement</li>
              <li>&bull; <strong className="text-white">Case-sensitive</strong> &mdash; create separate entries for &ldquo;ProAgri&rdquo; and &ldquo;proagri&rdquo;</li>
              <li>&bull; <strong className="text-white">Alias tags work across all models</strong> &mdash; use them when phoneme tags aren&apos;t supported</li>
            </ul>
          </section>

          {/* ═══ Text Normalization ═══ */}
          <section id="normalization" className="mb-14">
            <h2 className="mb-4 text-xl font-semibold text-white">Text Normalization</h2>
            <p className="mb-4 text-sm text-zinc-300">
              Voice models work best with <strong className="text-white">written-out text</strong>.
              Digits, symbols, and abbreviations often cause mispronunciations. Normalize them before pasting:
            </p>
            <div className="overflow-hidden rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-zinc-800 bg-zinc-900/50"><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Raw</th><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Write as</th></tr></thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr><td className="px-4 py-2"><Code>$42.50</Code></td><td className="px-4 py-2">forty-two dollars and fifty cents</td></tr>
                  <tr><td className="px-4 py-2"><Code>123-456-7890</Code></td><td className="px-4 py-2">one two three, four five six, seven eight nine zero</td></tr>
                  <tr><td className="px-4 py-2"><Code>9:23 AM</Code></td><td className="px-4 py-2">nine twenty-three A M</td></tr>
                  <tr><td className="px-4 py-2"><Code>Dr. Smith</Code></td><td className="px-4 py-2">Doctor Smith</td></tr>
                  <tr><td className="px-4 py-2"><Code>5kg</Code></td><td className="px-4 py-2">five kilograms</td></tr>
                  <tr><td className="px-4 py-2"><Code>25%</Code></td><td className="px-4 py-2">twenty-five percent</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ═══ Audio Tags ═══ */}
          <section id="audio-tags" className="mb-14">
            <h2 className="mb-4 text-xl font-semibold text-white">Audio Tags (Voice Inflections)</h2>
            <p className="mb-4 text-sm text-zinc-300">
              Insert these tags in your script to control emotion and delivery. You can click them directly
              from the <strong className="text-white">Voice Inflections</strong> panel on the generator page, or type them manually.
            </p>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Emotions</h3>
            <Pre>{`[excited] We just hit our target!
[sarcastic] Oh, what a surprise.
[curious] Have you ever wondered why?
[crying] I can't believe it's over.
[mischievously] I have a little secret...`}</Pre>

            <h3 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Delivery</h3>
            <Pre>{`[whispers] This is just between us.
[sighs] Another Monday morning.
[exhales] Finally, it's done.
[muttering] I knew this would happen...
[clears throat] Right, let's begin.`}</Pre>

            <h3 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Reactions &amp; Sounds</h3>
            <Pre>{`[laughs] That was brilliant!
[chuckles] Classic.
[gulps] This is it...
[applause]`}</Pre>

            <h3 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Tips</h3>
            <ul className="space-y-1.5 text-sm text-zinc-300">
              <li>&bull; Tag effectiveness <strong className="text-white">depends on the voice</strong> &mdash; some respond better than others</li>
              <li>&bull; Match the tag to the voice&apos;s natural range &mdash; a calm voice won&apos;t shout convincingly</li>
              <li>&bull; Place the tag <strong className="text-white">before</strong> the text it should affect</li>
              <li>&bull; You can combine tags with punctuation for more nuance</li>
            </ul>
          </section>

          {/* ═══ Troubleshooting ═══ */}
          <section id="troubleshooting" className="mb-14">
            <h2 className="mb-4 text-xl font-semibold text-white">Troubleshooting</h2>
            <div className="overflow-hidden rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-zinc-800 bg-zinc-900/50"><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Problem</th><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Likely Cause</th><th className="px-4 py-2.5 text-left font-medium text-zinc-400">Solution</th></tr></thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr><td className="px-4 py-2">Words mispronounced</td><td className="px-4 py-2 text-zinc-400">Model guessing</td><td className="px-4 py-2 text-zinc-400">Add CMU phoneme tags or use phonetic spelling</td></tr>
                  <tr><td className="px-4 py-2">Numbers read wrong</td><td className="px-4 py-2 text-zinc-400">Not normalized</td><td className="px-4 py-2 text-zinc-400">Write out numbers as words</td></tr>
                  <tr><td className="px-4 py-2">Emotion sounds flat</td><td className="px-4 py-2 text-zinc-400">Voice doesn&apos;t match</td><td className="px-4 py-2 text-zinc-400">Try a different voice or add narrative cues</td></tr>
                  <tr><td className="px-4 py-2">Audio tag ignored</td><td className="px-4 py-2 text-zinc-400">Voice incompatibility</td><td className="px-4 py-2 text-zinc-400">Try a different voice &mdash; not all respond equally</td></tr>
                  <tr><td className="px-4 py-2">Speed sounds unnatural</td><td className="px-4 py-2 text-zinc-400">Extreme speed value</td><td className="px-4 py-2 text-zinc-400">Stay between 0.9x&ndash;1.25x for best quality</td></tr>
                  <tr><td className="px-4 py-2">Pauses missing</td><td className="px-4 py-2 text-zinc-400">No punctuation</td><td className="px-4 py-2 text-zinc-400">Use commas, periods, ellipses, or dashes</td></tr>
                  <tr><td className="px-4 py-2">Generation fails</td><td className="px-4 py-2 text-zinc-400">Script too long or empty</td><td className="px-4 py-2 text-zinc-400">Check character count; split very long scripts</td></tr>
                  <tr><td className="px-4 py-2">Hallucinated words</td><td className="px-4 py-2 text-zinc-400">Ambiguous text</td><td className="px-4 py-2 text-zinc-400">Simplify complex sentences; remove special chars</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Footer ── */}
          <footer className="border-t border-zinc-800/60 pt-8 text-center text-xs text-zinc-500">
            <Link href="/" className="text-violet-400 transition-colors hover:text-violet-300">
              &larr; Back to Voice Over Agent
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}
