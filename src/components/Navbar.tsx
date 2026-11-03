import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Moon, Sun, Ticket, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRegistration } from '../context/RegistrationContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { registrations, openPassesDrawer } = useRegistration();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Keyboard shortcut: Pressing "/" focuses search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (e.key === '/' && activeTag !== 'input' && activeTag !== 'textarea') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const query = navSearch.trim();
    if (location.pathname === '/') {
      navigate(query ? `/?q=${encodeURIComponent(query)}#discovery` : '/#discovery');
      const el = document.getElementById('discovery');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(query ? `/?q=${encodeURIComponent(query)}#discovery` : '/#discovery');
    }
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0D1117] border-b border-[#30363D] text-[#E6EDF3] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Logo & Wordmark */}
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            aria-label="atmosphere home"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#30363D] bg-[#161B22] flex items-center justify-center shrink-0">
              <img src="/logo.gif" alt="atmosphere logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
              atmosphere
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"></span>
            </span>
          </Link>

          {/* Primary Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-[13px] font-semibold text-[#8B949E]">
            <button
              onClick={() => scrollTo('discovery')}
              className="px-3 py-1.5 rounded-md transition-colors hover:text-white hover:bg-[#161B22]"
            >
              Events
            </button>

            <button
              onClick={() => scrollTo('categories-filter')}
              className="px-3 py-1.5 rounded-md transition-colors hover:text-white hover:bg-[#161B22]"
            >
              Categories
            </button>

            <button
              onClick={() => scrollTo('archive')}
              className="px-3 py-1.5 rounded-md transition-colors hover:text-white hover:bg-[#161B22]"
            >
              Past Archive
            </button>

            <button
              onClick={() => scrollTo('offers')}
              className="px-3 py-1.5 rounded-md transition-colors hover:text-white hover:bg-[#161B22]"
            >
              Offers
            </button>

            <Link
              to="/about"
              className={`px-3 py-1.5 rounded-md transition-colors hover:text-white hover:bg-[#161B22] ${
                location.pathname === '/about' ? 'text-white bg-[#161B22]' : ''
              }`}
            >
              About
            </Link>
          </nav>
        </div>

        {/* Center: Search Bar with "/" focus shortcut */}
        <div className="hidden lg:flex flex-1 max-w-sm mx-4">
          <form onSubmit={handleNavSearch} className="w-full relative">
            <Search className="w-3.5 h-3.5 text-[#8B949E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={navSearch}
              onChange={e => setNavSearch(e.target.value)}
              placeholder="Search gatherings or press /"
              className="w-full h-8 pl-8 pr-8 bg-[#161B22] border border-[#30363D] rounded-md text-[13px] text-[#E6EDF3] placeholder:text-[#6E7681] focus:outline-none focus:border-white/40 focus:bg-[#0D1117] transition-all"
            />
            <kbd 
              onClick={() => searchInputRef.current?.focus()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-[#8B949E] bg-[#21262D] border border-[#30363D] rounded cursor-pointer select-none"
              title="Press / to focus search"
            >
              /
            </kbd>
          </form>
        </div>

        {/* Right Actions: Passes Badge + CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 flex items-center justify-center rounded-md border border-[#30363D] text-[#8B949E] hover:text-white hover:border-[#8B949E] bg-[#161B22] transition-colors"
          >
            {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-300" />}
          </button>

          {/* Passes Badge Drawer Trigger */}
          <button
            onClick={openPassesDrawer}
            className="flex items-center gap-2 h-8 px-3 text-[12px] font-semibold text-[#E6EDF3] bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] rounded-md transition-colors shadow-sm"
          >
            <Ticket className="w-3.5 h-3.5 text-[#58A6FF]" />
            <span className="hidden sm:inline">My Passes</span>
            <span className="px-1.5 py-0.2 bg-[#30363D] text-white text-[11px] font-mono font-bold rounded-full">
              {registrations.length}
            </span>
          </button>

          {/* Solid White/Green CTA: Explore Events */}
          <button
            onClick={() => scrollTo('discovery')}
            className="hidden sm:inline-flex items-center justify-center h-8 px-3.5 bg-white hover:bg-white/90 text-black text-[12px] font-semibold rounded-md transition-colors shadow-sm"
          >
            Explore Events
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#8B949E] hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#30363D] bg-[#161B22] px-4 py-4 space-y-3">
          <form onSubmit={handleNavSearch} className="relative">
            <Search className="w-3.5 h-3.5 text-[#8B949E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={navSearch}
              onChange={e => setNavSearch(e.target.value)}
              placeholder="Search gatherings..."
              className="w-full h-9 pl-9 pr-3 bg-[#0D1117] border border-[#30363D] rounded-md text-xs text-white placeholder-[#8B949E]"
            />
          </form>

          <div className="space-y-1 pt-2 font-medium text-sm">
            <button
              onClick={() => scrollTo('discovery')}
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-[#21262D] text-white"
            >
              Events Directory
            </button>
            <button
              onClick={() => scrollTo('categories-filter')}
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-[#21262D] text-white"
            >
              Categories
            </button>
            <button
              onClick={() => scrollTo('archive')}
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-[#21262D] text-white"
            >
              Past Archive
            </button>
            <button
              onClick={() => scrollTo('offers')}
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-[#21262D] text-white"
            >
              Coupons & Offers
            </button>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-[#21262D] text-white"
            >
              About & Manifesto
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
