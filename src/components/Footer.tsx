import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Sparkles } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/events';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-atmosphere-cardDark text-slate-600 dark:text-slate-300">
      
      {/* Top Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-serif text-lg font-bold shadow-md shadow-blue-500/20">
                a
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                atmosphere<span className="text-blue-500">.</span>
              </span>
            </div>

            <p className="font-sans text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              A soft-curated event discovery index connecting curious minds to 
              modular sound sessions, print studios, systems unconferences, and outdoor night rides.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div>EDITION 04 • AUTUMN 2026</div>
              <div>BENGALURU • MUMBAI • HYDERABAD • NEW DELHI</div>
            </div>
          </div>

          {/* Categories Col */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold">
              Event Categories
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES_LIST.filter(c => c !== 'All').map(cat => (
                <a
                  key={cat}
                  href={`/#categories`}
                  className="text-slate-500 hover:text-blue-600 transition-colors py-1 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span>
                  {cat}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation & Dispatch */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  Discovery Directory
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">
                  About Atmosphere & Manifesto
                </Link>
              </li>
              <li>
                <a 
                  href="#privacy-notice"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Client-Side Notice: Atmosphere runs without a remote server or telemetry trackers. All bookings persist exclusively within your browser's Local Storage.");
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy Notice
                </a>
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-soft-sm"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5 text-blue-500" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-Footer */}
      <div className="border-t border-slate-200/80 dark:border-slate-800 py-6 bg-slate-50/50 dark:bg-atmosphere-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 ATMOSPHERE. ALL GATHERINGS ARE CELEBRATED WITH CRAFT.
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Soft, human-curated design</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
