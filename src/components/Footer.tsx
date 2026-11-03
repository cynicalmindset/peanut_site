import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/events';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border dark:border-dark-border">
      <div className="max-w-page mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-border dark:bg-dark-border shrink-0">
                <img src="/logo.gif" alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-[15px] font-semibold text-primary dark:text-dark-primary tracking-tight">atmosphere</span>
            </div>
            <p className="text-[13px] text-secondary dark:text-dark-secondary leading-relaxed max-w-xs">
              Curated event discovery for intimate gatherings, independent encounters, and cultural assemblies.
            </p>
            <div className="text-[11px] font-mono text-muted dark:text-dark-muted space-y-0.5">
              <div>Edition 04 · Autumn 2026</div>
              <div>Bengaluru · Mumbai · Hyderabad · New Delhi</div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-muted dark:text-dark-muted">Categories</h4>
            <ul className="space-y-1.5 text-[13px] text-secondary dark:text-dark-secondary">
              {CATEGORIES_LIST.filter(c => c !== 'All').map(cat => (
                <li key={cat}><a href="/#categories-filter" className="hover:text-primary dark:hover:text-dark-primary transition-colors">{cat}</a></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-muted dark:text-dark-muted">Pages</h4>
            <ul className="space-y-1.5 text-[13px] text-secondary dark:text-dark-secondary">
              <li><Link to="/" className="hover:text-primary dark:hover:text-dark-primary transition-colors">Discover</Link></li>
              <li><Link to="/about" className="hover:text-primary dark:hover:text-dark-primary transition-colors">About</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 flex md:justify-end items-start">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 h-9 px-4 border border-border dark:border-dark-border text-[12px] font-medium text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-dark-primary hover:border-primary dark:hover:border-dark-primary transition-colors"
              aria-label="Back to top"
            >
              Top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-border dark:border-dark-border py-5">
        <div className="max-w-page mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted dark:text-dark-muted font-mono">
          <span>© 2026 atmosphere</span>
          <span>All data stored locally in your browser</span>
        </div>
      </div>
    </footer>
  );
};
