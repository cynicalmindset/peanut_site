import React from 'react';
import { ArrowDownRight, Sparkles, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { EVENTS_DATA } from '../data/events';
import { Link } from 'react-router-dom';

interface HeroProps {
  onExploreClick: () => void;
  onFeaturedClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onFeaturedClick }) => {
  const featuredEvent = EVENTS_DATA.find(e => e.featured) || EVENTS_DATA[0];

  return (
    <section className="relative border-b border-paper-300 dark:border-paper-borderDark overflow-hidden">
      {/* Editorial Metabar */}
      <div className="border-b border-paper-300 dark:border-paper-borderDark bg-paper-200/60 dark:bg-paper-cardDark/50 text-ink-600 dark:text-neutral-400 font-mono text-xs px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-semibold text-accent">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            ISSUE № 04
          </span>
          <span className="text-paper-400 dark:text-neutral-600">/</span>
          <span>CURATED CALENDAR: Q4 2026</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] uppercase tracking-wider">
          <span>NO ALGORITHMS</span>
          <span className="text-paper-400 dark:text-neutral-600">•</span>
          <span>ZERO SPONSORED SLOP</span>
          <span className="text-paper-400 dark:text-neutral-600">•</span>
          <span>INDIE ENCOUNTERS ONLY</span>
        </div>
      </div>

      {/* Main Asymmetric Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Manifesto statement (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-light dark:bg-accent/10 border border-accent/30 text-accent font-mono text-xs uppercase tracking-wider rounded-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Independent Cultural Discovery</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-ink-900 dark:text-white leading-[1.08]">
                Find your next <br />
                <span className="italic font-normal underline decoration-accent decoration-2 underline-offset-8">
                  unforgettable.
                </span>
              </h1>
              <p className="text-ink-600 dark:text-neutral-300 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl pt-2">
                K Explore documents the fringe gatherings, clandestine modular sound sessions, 
                risograph press workshops, and quiet code assemblies happening across cities — curated 
                for people who seek depth over spectacle.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-ink-900 dark:bg-white text-white dark:text-ink-900 font-mono text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-accent dark:hover:bg-accent dark:hover:text-white transition-all shadow-md active:scale-95"
              >
                <span>Browse Directory</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </button>

              <button
                onClick={onFeaturedClick}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-transparent border border-paper-400 dark:border-paper-borderDark text-ink-900 dark:text-neutral-200 font-mono text-xs uppercase tracking-widest font-semibold rounded-sm hover:border-ink-900 dark:hover:border-white transition-all"
              >
                <span>View Centerpiece</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Context Indicators */}
            <div className="pt-6 border-t border-paper-300 dark:border-paper-borderDark grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs">
              <div>
                <span className="block text-ink-500 dark:text-neutral-400 uppercase text-[10px]">Active Dossiers</span>
                <span className="font-semibold text-ink-900 dark:text-white text-base">08 Gatherings</span>
              </div>
              <div>
                <span className="block text-ink-500 dark:text-neutral-400 uppercase text-[10px]">Cities Indexed</span>
                <span className="font-semibold text-ink-900 dark:text-white text-base">4 Metros</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-ink-500 dark:text-neutral-400 uppercase text-[10px]">Next Door Opens</span>
                <span className="font-semibold text-accent text-base">Nov 14, 2026</span>
              </div>
            </div>
          </div>

          {/* Right Column: Striking Event Photography Collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Visual Frame */}
            <div className="relative group bg-white dark:bg-paper-cardDark p-3 border border-paper-300 dark:border-paper-borderDark shadow-xl rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Photo */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-ink-900">
                <img
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-accent text-white font-mono text-[10px] font-bold uppercase tracking-widest rounded-xs shadow">
                    FEATURED ENTRY
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-300">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span>{featuredEvent.displayDate}</span>
                    <span>•</span>
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>{featuredEvent.city}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug line-clamp-2">
                    {featuredEvent.title}
                  </h3>
                </div>
              </div>

              {/* Photo Caption Note */}
              <div className="mt-3 pt-2.5 border-t border-paper-200 dark:border-paper-borderDark flex items-center justify-between text-[11px] font-mono text-ink-500 dark:text-neutral-400">
                <span className="truncate max-w-[220px]">REF: {featuredEvent.id}</span>
                <Link
                  to={`/event/${featuredEvent.id}`}
                  className="text-accent hover:underline flex items-center gap-1 font-semibold"
                >
                  Inspect Event →
                </Link>
              </div>
            </div>

            {/* Asymmetric Overlap Detail Card */}
            <div className="hidden sm:block absolute -bottom-6 -left-8 bg-paper-100 dark:bg-paper-dark border border-paper-300 dark:border-paper-borderDark p-4 shadow-lg max-w-[240px] rounded-xs font-mono text-xs">
              <div className="text-[10px] uppercase text-ink-500 dark:text-neutral-400">Upcoming Assembly</div>
              <div className="font-semibold text-ink-900 dark:text-white mt-0.5 truncate">
                Modular Synthesis
              </div>
              <div className="text-accent text-[11px] mt-1 font-mono">
                {featuredEvent.spotsRemaining} spots remaining
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
