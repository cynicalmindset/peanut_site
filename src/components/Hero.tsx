import React, { useState } from 'react';
import { ArrowRight, Sparkles, Search } from 'lucide-react';
import { EVENTS_DATA } from '../data/events';

interface HeroProps {
  onExploreClick: () => void;
  onFeaturedClick: () => void;
  onSearchSubmit?: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onFeaturedClick, onSearchSubmit }) => {
  const [quickQuery, setQuickQuery] = useState('');
  const featuredEvent = EVENTS_DATA.find(e => e.featured) || EVENTS_DATA[0];

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit && quickQuery.trim()) {
      onSearchSubmit(quickQuery.trim());
    } else {
      onExploreClick();
    }
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pb-16 overflow-hidden">
      
      {/* Outer Soft Framed Canvas (Inspired by Inspo 1 & 2) */}
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden shadow-float border border-sky-100/80 dark:border-slate-800 bg-gradient-to-b from-sky-400 via-sky-500 to-blue-600 text-white min-h-[580px] sm:min-h-[660px] flex flex-col justify-between">
          
          {/* Background Hero Image - hero.png */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero.png" 
              alt="Atmosphere cultural gathering landscape"
              className="w-full h-full object-cover object-bottom sm:object-center select-none"
              loading="eager"
            />
            {/* Soft atmospheric gradient scrims to ensure pristine typography legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-900/25 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-blue-950/40 pointer-events-none" />
          </div>

          {/* Top Pill Ribbon */}
          <div className="relative z-10 pt-8 sm:pt-10 px-6 sm:px-12 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium tracking-wide shadow-soft-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>atmosphere issue 04 • autumn 2026</span>
            </div>

            <div className="hidden md:flex items-center gap-3 text-xs text-white/90 font-medium">
              <span className="px-3 py-1 rounded-full bg-black/20 backdrop-blur-md">8 gatherings documented</span>
              <span className="px-3 py-1 rounded-full bg-black/20 backdrop-blur-md">4 cities indexed</span>
            </div>
          </div>

          {/* Central Editorial Content (Inspo-aligned: Centered, clean, serene typography) */}
          <div className="relative z-10 px-6 sm:px-12 py-10 sm:py-16 text-center max-w-4xl mx-auto space-y-6">
            
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-md">
              Find your next <br className="hidden sm:inline" />
              <span className="font-normal italic font-serif">unforgettable</span> gathering.
            </h1>

            <p className="text-white/95 text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-sans">
              Discover intimate modular sound symposia, tactile risograph print labs, 
              systems unconferences, and night gravel rides across your city.
            </p>

            {/* Inspo-Style Soft Pill Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-7 py-3.5 rounded-full bg-white text-blue-900 hover:bg-slate-50 font-medium text-sm tracking-wide shadow-lg shadow-black/10 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Explore Events
              </button>

              <button
                onClick={onFeaturedClick}
                className="px-6 py-3.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white font-medium text-sm tracking-wide transition-all duration-200 flex items-center gap-2"
              >
                <span>Curated Feature</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Inspo 2 Floating Pill Search Bar Component */}
            <div className="pt-4 max-w-xl mx-auto">
              <form 
                onSubmit={handleQuickSearch}
                className="p-2 sm:p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/60 dark:border-slate-700 shadow-2xl flex items-center gap-2 transition-all hover:bg-white"
              >
                <div className="pl-3 text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={quickQuery}
                  onChange={e => setQuickQuery(e.target.value)}
                  placeholder="Search by topic, artist, sound, or city..."
                  className="w-full bg-transparent text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none font-sans px-2"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold tracking-wide transition-all shrink-0 shadow-sm"
                >
                  Find
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Community / Partner Ribbon (matching inspo 1 footer ticker) */}
          <div className="relative z-10 border-t border-white/20 bg-black/20 backdrop-blur-md py-4 px-6 sm:px-12 flex flex-wrap items-center justify-between gap-4 text-xs text-white/80 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-semibold text-white">Next Event:</span>
              <span>{featuredEvent.title} — {featuredEvent.displayDate}</span>
            </div>

            <div className="flex items-center gap-6 opacity-80 text-[11px] tracking-wider uppercase">
              <span>Modular Sound</span>
              <span>•</span>
              <span>Risograph</span>
              <span>•</span>
              <span>Architecture</span>
              <span>•</span>
              <span>16mm Film</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
