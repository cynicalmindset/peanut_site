import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Ticket, Menu, X, Compass, Info, CloudRain } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-atmosphere-cardDark/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Wordmark - atmosphere */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
          aria-label="atmosphere home"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <span className="font-serif text-lg font-bold">a</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              atmosphere
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-pulse"></span>
            </span>
            <span className="text-[10px] tracking-wider text-slate-400 dark:text-slate-400 font-medium -mt-1 hidden sm:block">
              curated event discovery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Pill inspired */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/50 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50 text-sm font-medium">
          <Link
            to="/"
            onClick={() => handleNavClick('discovery-section')}
            className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
              location.pathname === '/' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-soft-sm font-semibold' 
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white'
            }`}
          >
            Discover
          </Link>

          <a
            href="/#categories"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                handleNavClick('categories-filter');
              }
            }}
            className="px-4 py-1.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors"
          >
            Categories
          </a>

          <Link
            to="/about"
            className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
              location.pathname === '/about' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-soft-sm font-semibold' 
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white'
            }`}
          >
            About
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-soft-sm"
            title="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* My Passes Pill Button with Count Badge */}
          <button
            onClick={openPassesDrawer}
            className="relative flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-soft transition-all"
            aria-label={`View registered passes (${registrations.length} active)`}
          >
            <Ticket className="w-3.5 h-3.5 text-blue-500" />
            <span className="hidden sm:inline">My Passes</span>
            {registrations.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-blue-500 text-white text-[11px] font-bold rounded-full">
                {registrations.length}
              </span>
            )}
          </button>

          {/* Primary Action Button (Inspo Pill Style) */}
          <a
            href="/#discovery-section"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                handleNavClick('discovery-section');
              }
            }}
            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
          >
            Explore Events
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-800 dark:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-atmosphere-cardDark px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-150 shadow-xl">
          <div className="flex flex-col space-y-2 text-base font-medium">
            <Link
              to="/"
              onClick={() => handleNavClick('discovery-section')}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white"
            >
              <Compass className="w-5 h-5 text-blue-500" />
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
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white"
            >
              <CloudRain className="w-5 h-5 text-blue-500" />
              Explore Categories
            </a>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white"
            >
              <Info className="w-5 h-5 text-blue-500" />
              About & Manifesto
            </Link>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openPassesDrawer();
              }}
              className="w-full flex items-center justify-between p-3.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white rounded-2xl font-medium"
            >
              <span className="flex items-center gap-2 text-sm">
                <Ticket className="w-4 h-4 text-blue-500" />
                My Active Passes
              </span>
              <span className="px-2.5 py-0.5 bg-blue-500 text-white font-bold rounded-full text-xs">
                {registrations.length}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
