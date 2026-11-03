import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Feather, Sparkles, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white pb-24">
      
      {/* Editorial Header */}
      <div className="border-b border-[#30363D] bg-[#161B22] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8B949E] hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Discovery Index</span>
          </Link>
          
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/90 text-xs font-mono">
              ABOUT ATMOSPHERE
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
              A serene antidote to algorithmic homogeny.
            </h1>
            <p className="text-lg sm:text-xl text-[#8B949E] italic">
              Connecting curious minds to deliberate cultural gatherings.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 space-y-10">
        
        {/* Section 1 */}
        <section className="space-y-4 bg-[#161B22] border border-[#30363D] p-6 sm:p-8 rounded-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <Feather className="w-5 h-5 text-amber-400" />
            <span>1. The Atmospheric Imperative</span>
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#C9D1D9] leading-relaxed">
            <p>
              Contemporary event discovery platforms have degenerated into algorithmic marketplaces: 
              dominated by stadium pop spectacles, corporate sponsored mixers, and search-optimized ticket broker schemes. 
              The fragile, thrilling experiments — the midnight gravel bike pelotons, the basement modular synth assemblies, 
              the risograph press workshops, the kernel telemetry unconferences — are rendered invisible because they do not 
              generate advertising margins.
            </p>
            <p className="text-white">
              <strong className="text-white">Atmosphere</strong> was created to restore delight, softness, and deliberate discovery. 
              We curate gatherings where people commune over physical craft, acoustic experimentation, and shared curiosity.
            </p>
          </div>
        </section>

        {/* Section 2: Human-First Aesthetic */}
        <section className="space-y-4 bg-[#161B22] border border-[#30363D] p-6 sm:p-8 rounded-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>2. Dark, Intentional, Human-First Aesthetic</span>
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#C9D1D9] leading-relaxed">
            <p>
              Atmosphere embraces a focused obsidian canvas, pure poster artwork, tactile fanned decks, and understated typography. 
              Every interaction is engineered to feel responsive, tactile, and crafted by human designers who value focus and cultural resonance.
            </p>
          </div>
        </section>

        {/* Section 3: Data Architecture */}
        <section className="space-y-4 bg-[#161B22] border border-[#30363D] p-6 sm:p-8 rounded-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>3. Client-Side Data & Privacy Ethics</span>
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#C9D1D9] leading-relaxed">
            <p>
              In keeping with our lightweight ethos, this platform operates purely client-side:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-[#8B949E]">
              <li>Your reservation details are stored <strong className="text-white">strictly on your device</strong> inside browser Local Storage.</li>
              <li>No personal information is transferred to third-party ad networks or remote tracking brokers.</li>
              <li>You can download standard <code className="text-white bg-white/10 px-2 py-0.5 rounded font-mono">.ics</code> calendar files directly to your device.</li>
              <li>You can view or release your passes at any moment with one click in the "My Passes" drawer.</li>
            </ul>
          </div>
        </section>

        {/* Colophon */}
        <section className="pt-8 border-t border-[#30363D] text-xs text-[#8B949E] space-y-1.5 font-mono">
          <div className="uppercase tracking-wider text-white font-bold text-xs">
            COLOPHON
          </div>
          <p>Atmosphere Platform • Season 2026 • Curated across Mumbai, Bengaluru, Hyderabad, and New Delhi.</p>
        </section>

      </div>
    </div>
  );
};
