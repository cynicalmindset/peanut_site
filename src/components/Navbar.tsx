import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Ticket, Menu, X, Compass, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRegistration } from '../context/RegistrationContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { registrations, openPassesDrawer } = useRegistration();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (sectionId?: string) => {
    setMobileMenuOpen(false);
    if (sectionId && location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-paper-100/90 dark:bg-paper-dark/90 backdrop-blur-md border-b border-paper-300 dark:border-paper-borderDark transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Wordmark */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          aria-label="K Explore Home"
        >
          <div className="w-9 h-9 bg-ink-900 dark:bg-white text-white dark:text-ink-900 flex items-center justify-center font-serif text-2xl font-bold rounded-sm transition-transform group-hover:scale-105">
            K
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-ink-900 dark:text-white flex items-center gap-1.5">
              K EXPLORE
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-ink-500 dark:text-neutral-400 -mt-1 hidden sm:block">
              Independent Event Index
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            to="/"
            onClick={() => handleNavClick('discovery-section')}
            className={`transition-colors hover:text-accent ${
              location.pathname === '/' ? 'text-ink-900 dark:text-white font-semibold' : 'text-ink-600 dark:text-neutral-300'
            }`}
          >
            Discover Events
          </Link>

          <a
            href="/#categories"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                handleNavClick('categories-filter');
              }
            }}
            className="text-ink-600 dark:text-neutral-300 hover:text-accent transition-colors"
          >
            Categories
          </a>

          <Link
            to="/about"
            className={`transition-colors hover:text-accent ${
              location.pathname === '/about' ? 'text-ink-900 dark:text-white font-semibold' : 'text-ink-600 dark:text-neutral-300'
            }`}
          >
            About & Manifesto
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            className="p-2 rounded-full border border-paper-300 dark:border-paper-borderDark text-ink-700 dark:text-neutral-200 hover:bg-paper-200 dark:hover:bg-paper-cardDark transition-colors"
            title="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* My Passes CTA with Count Badge */}
          <button
            onClick={openPassesDrawer}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider rounded-sm border border-paper-300 dark:border-paper-borderDark bg-white dark:bg-paper-cardDark text-ink-900 dark:text-neutral-100 hover:border-ink-900 dark:hover:border-neutral-400 transition-all shadow-sm"
            aria-label={`View registered passes (${registrations.length} active)`}
          >
            <Ticket className="w-3.5 h-3.5 text-accent" />
            <span className="hidden sm:inline">My Passes</span>
            {registrations.length > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-accent text-white text-[10px] font-bold rounded-full">
                {registrations.length}
              </span>
            )}
          </button>

          {/* Primary Explore Action Button */}
          <a
            href="/#discovery-section"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                handleNavClick('discovery-section');
              }
            }}
            className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-xs uppercase font-mono tracking-wider font-semibold bg-accent hover:bg-accent-hover text-white rounded-sm transition-all shadow-sm active:translate-y-px"
          >
            Explore Gatherings
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ink-900 dark:text-white"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-paper-300 dark:border-paper-borderDark bg-paper-100 dark:bg-paper-dark px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3 font-serif text-lg">
            <Link
              to="/"
              onClick={() => handleNavClick('discovery-section')}
              className="flex items-center gap-3 py-2 border-b border-paper-200 dark:border-paper-borderDark text-ink-900 dark:text-white"
            >
              <Compass className="w-5 h-5 text-accent" />
              Discover Events
            </Link>

            <a
              href="/#categories"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  handleNavClick('categories-filter');
                } else {
                  setMobileMenuOpen(false);
                }
              }}
              className="py-2 border-b border-paper-200 dark:border-paper-borderDark text-ink-900 dark:text-white"
            >
              Explore Categories
            </a>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 border-b border-paper-200 dark:border-paper-borderDark text-ink-900 dark:text-white"
            >
              <Info className="w-5 h-5 text-accent" />
              About & Manifesto
            </Link>
          </div>

          <div className="pt-2 flex flex-col gap-3 font-mono text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openPassesDrawer();
              }}
              className="w-full flex items-center justify-between p-3 border border-paper-300 dark:border-paper-borderDark bg-white dark:bg-paper-cardDark text-ink-900 dark:text-white rounded-sm"
            >
              <span className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-accent" />
                MY ACTIVE PASSES
              </span>
              <span className="px-2 py-0.5 bg-accent text-white font-bold rounded-full">
                {registrations.length}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
