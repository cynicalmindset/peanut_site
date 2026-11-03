import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Feather, Sparkles, ShieldAlert } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-20">
      
      {/* Editorial Header */}
      <div className="border-b border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-atmosphere-cardDark/50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 hover:text-blue-600 mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Discovery Index</span>
          </Link>
          
          <div className="space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-100/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
              ABOUT ATMOSPHERE
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              A serene antidote to algorithmic homogeny.
            </h1>
            <p className="font-serif text-xl sm:text-2xl text-slate-600 dark:text-slate-300 italic">
              Connecting curious minds to deliberate cultural gatherings.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 space-y-12">
        
        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Feather className="w-6 h-6 text-blue-500" />
            <span>1. The Atmospheric Imperative</span>
          </h2>
          <div className="space-y-4 font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Contemporary event discovery platforms have degenerated into algorithmic marketplaces: 
              dominated by stadium pop spectacles, corporate sponsored mixers, and search-optimized ticket broker schemes. 
              The fragile, thrilling experiments — the midnight gravel bike pelotons, the basement modular synth assemblies, 
              the risograph press workshops, the kernel telemetry unconferences — are rendered invisible because they do not 
              generate advertising margins.
            </p>
            <p>
              <strong>Atmosphere</strong> was created to restore delight, softness, and deliberate discovery. 
              We curate gatherings where people commune over physical craft, acoustic experimentation, and shared curiosity.
            </p>
          </div>
        </section>

        {/* Section 2: Soft Design Inspo */}
        <section className="space-y-4 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-atmosphere-cardDark shadow-soft">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-blue-500" />
            <span>2. Soft, Human-First Aesthetic</span>
          </h2>
          <div className="space-y-4 font-sans text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Atmosphere embraces airy sky palettes, gentle pill controls, generous curves, and soft natural light. 
              Every component is designed to feel calm, approachable, and crafted by a human designer who values breathing room and visual harmony.
            </p>
          </div>
        </section>

        {/* Section 3: Data Architecture */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-blue-500" />
            <span>3. Client-Side Data & Privacy Ethics</span>
          </h2>
          <div className="space-y-4 font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              In keeping with our lightweight ethos, this implementation of Atmosphere operates 
              purely client-side. When you reserve a spot for a gathering:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li>Your registration details are stored <strong>strictly on your device</strong> inside browser Local Storage.</li>
              <li>No personal information is transferred to third-party ad networks or remote servers.</li>
              <li>You can download standard <code className="text-blue-600 bg-blue-50 dark:bg-slate-800 px-2 py-0.5 rounded-full">.ics</code> calendar files directly to your device.</li>
              <li>You can view or release your passes at any moment with one click in the "My Passes" drawer.</li>
            </ul>
          </div>
        </section>

        {/* Colophon */}
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 space-y-2">
          <div className="uppercase tracking-wider text-slate-900 dark:text-white font-bold text-sm">
            COLOPHON
          </div>
          <p>Atmosphere Platform • Edition 04 • Curated across Mumbai, Bengaluru, Hyderabad, and New Delhi.</p>
        </section>

      </div>
    </div>
  );
};
