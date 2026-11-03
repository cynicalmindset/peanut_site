import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Feather, Sparkles, ShieldAlert } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-20">
      
      {/* Editorial Header */}
      <div className="border-b border-paper-300 dark:border-paper-borderDark bg-paper-200/50 dark:bg-paper-cardDark/50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-600 dark:text-neutral-400 hover:text-accent mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Discovery Index</span>
          </Link>
          
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 bg-accent-light dark:bg-accent/15 border border-accent/30 text-accent font-mono text-xs uppercase tracking-widest font-semibold rounded-xs">
              MANIFESTO & COLOPHON
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-ink-900 dark:text-white leading-tight">
              A refusal of algorithmic homogeny.
            </h1>
            <p className="font-serif text-xl sm:text-2xl text-ink-600 dark:text-neutral-300 italic">
              Why K Explore documents the gatherings that the feed forgets.
            </p>
          </div>
        </div>
      </div>

      {/* Main Manifesto Text */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 space-y-12">
        
        {/* Essay Section 1 */}
        <section className="space-y-5">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 dark:text-white flex items-center gap-3">
            <Feather className="w-6 h-6 text-accent" />
            <span>1. The Editorial Imperative</span>
          </h2>
          <div className="space-y-4 font-sans text-base sm:text-lg text-ink-700 dark:text-neutral-300 leading-relaxed">
            <p>
              Contemporary event discovery platforms have degenerated into algorithmic marketplaces: 
              dominated by stadium pop spectacles, corporate sponsored mixers, and search-optimized ticket broker schemes. 
              The fragile, thrilling experiments — the midnight gravel bike pelotons, the basement modular synth assemblies, 
              the risograph press workshops, the kernel telemetry unconferences — are rendered invisible because they do not 
              generate advertising margins.
            </p>
            <p>
              <strong>K Explore</strong> was conceived as a deliberate editorial alternative. 
              We operate not as an automated ticket aggregator, but as a living dossier. 
              Every gathering indexed here is chosen for intentionality, craft, and communal resonance.
            </p>
          </div>
        </section>

        {/* Essay Section 2: Anti-AI Slop */}
        <section className="space-y-5 p-8 border border-paper-300 dark:border-paper-borderDark bg-white dark:bg-paper-cardDark rounded-xs">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 dark:text-white flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-accent" />
            <span>2. Design Without AI Slop</span>
          </h2>
          <div className="space-y-4 font-sans text-base text-ink-700 dark:text-neutral-300 leading-relaxed">
            <p>
              We firmly reject the visual clichés of modern generative templates: the purple-blue gradient overlays, 
              meaningless floating blobs, card carousels with synthetic testimonials, and empty whitespace masquerading 
              as minimalism.
            </p>
            <p>
              Instead, K Explore draws inspiration from independent print periodicals, archival exhibition catalogues, 
              and classic Swiss broadsheet typography. Strong grid alignments, deliberate image crops, honest hairline 
              borders, and high-contrast typography serve one purpose: prioritizing clarity and cultural substance.
            </p>
          </div>
        </section>

        {/* Section 3: Data Architecture & Privacy */}
        <section className="space-y-5">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 dark:text-white flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-accent" />
            <span>3. Client-Side Data & Privacy Ethics</span>
          </h2>
          <div className="space-y-4 font-sans text-base sm:text-lg text-ink-700 dark:text-neutral-300 leading-relaxed">
            <p>
              In keeping with our lightweight ethos, this implementation of K Explore operates 
              purely client-side. When you reserve a spot for a gathering:
            </p>
            <ul className="list-disc pl-6 space-y-2 font-mono text-sm text-ink-800 dark:text-neutral-200">
              <li>Your registration details (name, email, phone) are stored <strong>strictly on your device</strong> inside browser Local Storage.</li>
              <li>No personal information is transferred to third-party ad networks, telemetry trackers, or external servers.</li>
              <li>You can download standard <code className="text-accent bg-paper-200 dark:bg-paper-cardDark px-1.5 py-0.5 rounded-xs">.ics</code> calendar files directly to your operating system.</li>
              <li>You can purge or release your passes at any moment with one click in the "My Passes" panel.</li>
            </ul>
          </div>
        </section>

        {/* Colophon & Contact */}
        <section className="pt-8 border-t border-paper-300 dark:border-paper-borderDark font-mono text-xs text-ink-500 dark:text-neutral-400 space-y-2">
          <div className="uppercase tracking-widest text-ink-900 dark:text-white font-bold text-sm">
            COLOPHON
          </div>
          <p>Typeset in Playfair Display, Plus Jakarta Sans, and JetBrains Mono.</p>
          <p>Curated and developed as an independent cultural experiment. All sample gatherings celebrate authentic creative traditions.</p>
        </section>

      </div>
    </div>
  );
};
