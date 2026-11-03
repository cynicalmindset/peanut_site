import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Sparkles } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/events';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-paper-300 dark:border-paper-borderDark bg-paper-200/60 dark:bg-paper-cardDark text-ink-700 dark:text-neutral-300">
      
      {/* Top Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-ink-900 dark:bg-white text-white dark:text-ink-900 flex items-center justify-center font-serif text-xl font-bold rounded-xs">
                K
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-ink-900 dark:text-white">
                K EXPLORE<span className="text-accent">.</span>
              </span>
            </div>

            <p className="font-sans text-sm text-ink-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              An independent cultural dispatch documenting sound experiments, 
              print studios, systems unconferences, and outdoor night endurance gatherings.
            </p>

            <div className="pt-2 font-mono text-xs text-ink-500 dark:text-neutral-400 space-y-1">
              <div>ISSN 2984-7128 • ISSUE № 04 (Q4 2026)</div>
              <div>BENGALURU • MUMBAI • HYDERABAD • NEW DELHI</div>
            </div>
          </div>

          {/* Categories Col (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-ink-900 dark:text-white font-bold">
              Classified Registers
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {CATEGORIES_LIST.filter(c => c !== 'All').map(cat => (
                <a
                  key={cat}
                  href={`/#categories`}
                  className="text-ink-600 dark:text-neutral-400 hover:text-accent transition-colors py-1"
                >
                  → {cat}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation & Dispatch (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-ink-900 dark:text-white font-bold">
              Publication
            </h4>
            <ul className="space-y-2 text-xs font-mono text-ink-600 dark:text-neutral-400">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  Discovery Directory
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">
                  Manifesto & Editorial Values
                </Link>
              </li>
              <li>
                <a 
                  href="#privacy-notice"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Client-Side Notice: K Explore runs without a remote server or telemetry trackers. All bookings persist exclusively within your browser's Local Storage.");
                  }}
                  className="hover:text-accent transition-colors"
                >
                  Privacy & Local Storage Notice
                </a>
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-3 py-1.5 border border-paper-400 dark:border-paper-borderDark text-xs font-mono uppercase tracking-wider text-ink-900 dark:text-white hover:border-ink-900 dark:hover:border-white transition-colors rounded-xs"
              >
                <span>Return to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Hairline Sub-Footer */}
      <div className="border-t border-paper-300 dark:border-paper-borderDark py-6 bg-paper-100 dark:bg-paper-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-ink-500 dark:text-neutral-500">
          <div>
            © 2026 K EXPLORE. CRAFTED WITH REACT, TAILWIND & PURPOSE.
          </div>
          <div className="flex items-center gap-1 text-ink-600 dark:text-neutral-400">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Curated with editorial discernment — no algorithmic slop</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
