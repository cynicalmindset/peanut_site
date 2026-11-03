import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/30 text-accent font-mono text-xs uppercase tracking-widest font-bold rounded-xs">
          ERROR 404 • UNINDEXED COORDINATE
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-ink-900 dark:text-white">
          Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-ink-600 dark:text-neutral-400 font-sans leading-relaxed">
          The requested URL does not match any documented section, dossier, or gathering 
          in the K Explore register.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white uppercase tracking-wider font-semibold rounded-xs shadow-sm transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Return to Discovery Index</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
