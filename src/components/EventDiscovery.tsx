import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, ChevronRight, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { EventItem, EventCategory } from '../types/event';
import { CATEGORIES_LIST } from '../data/events';
import { useRegistration } from '../context/RegistrationContext';

interface EventDiscoveryProps {
  events: EventItem[];
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const EventDiscovery: React.FC<EventDiscoveryProps> = ({
  events,
  searchQuery: externalSearchQuery,
  onSearchChange,
}) => {
  const navigate = useNavigate();
  const { openRegistrationModal, isRegistered } = useRegistration();

  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedMonth, setSelectedMonth] = useState<string>('All Months');

  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = (val: string) => {
    if (onSearchChange) onSearchChange(val);
    setInternalSearchQuery(val);
  };

  const uniqueCities = useMemo(() => {
    const cities = new Set(events.map(e => e.city));
    return ['All', ...Array.from(cities)];
  }, [events]);

  const months = ['All Months', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  // Guarantee poster artwork from /posters/
  const getEventPoster = (event: EventItem, index: number) => {
    if (event.image && event.image.startsWith('/posters/')) return event.image;
    return `/posters/poster-${(index % 20) + 1}.jfif`;
  };

  // Filtered list
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      if (selectedCategory !== 'All' && event.category !== selectedCategory) return false;
      if (selectedCity !== 'All' && event.city !== selectedCity) return false;
      if (selectedMonth !== 'All Months') {
        const d = new Date(event.date);
        const monthShort = d.toLocaleString('en-US', { month: 'short' });
        if (monthShort.toLowerCase() !== selectedMonth.toLowerCase()) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          event.title.toLowerCase().includes(q) ||
          event.description.toLowerCase().includes(q) ||
          event.venue.toLowerCase().includes(q) ||
          event.city.toLowerCase().includes(q) ||
          event.tags.some(t => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [events, selectedCategory, selectedCity, selectedMonth, searchQuery]);

  // Top headliners for the "Your Top Artists" style horizontal cards
  const topHeadliners = useMemo(() => {
    return filteredEvents.slice(0, 5);
  }, [filteredEvents]);

  // Collectives for "Your Top Albums" section
  const collectives = useMemo(() => {
    return [
      {
        id: 'coll-1',
        name: 'Sonic Guild Independent',
        curator: 'Modular Synthesis & Spatial Audio',
        image: '/posters/poster-1.jfif',
        gatheringsCount: 3,
      },
      {
        id: 'coll-2',
        name: 'Atelier Variable',
        curator: 'Risograph Press & Editorial Lab',
        image: '/posters/poster-2.jfif',
        gatheringsCount: 2,
      },
      {
        id: 'coll-3',
        name: 'Subterranean Cinema',
        curator: '16mm Celluloid Projections',
        image: '/posters/poster-3.jfif',
        gatheringsCount: 4,
      },
      {
        id: 'coll-4',
        name: 'Localhost Systems Group',
        curator: 'Low-overhead Systems & Kernels',
        image: '/posters/poster-4.jfif',
        gatheringsCount: 2,
      },
      {
        id: 'coll-5',
        name: 'Velodrome Midnight',
        curator: 'Track Cycling & Fixed Gear League',
        image: '/posters/poster-5.jfif',
        gatheringsCount: 3,
      },
    ];
  }, []);

  return (
    <section id="discovery" className="relative w-full max-w-full overflow-hidden bg-[#F6F8FA] dark:bg-[#0D1117] text-[#1F2328] dark:text-white pt-14 sm:pt-20 pb-28 border-b border-[#D0D7DE] dark:border-[#30363D] transition-colors">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">

        {/* 1. TOP SEGMENTED PILL BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto overflow-x-auto scrollbar-none py-1 -my-1 flex justify-start sm:justify-center">
            <div id="categories-filter" className="inline-flex items-center p-1 rounded-full bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] shadow-sm shrink-0 whitespace-nowrap">
              {CATEGORIES_LIST.slice(0, 5).map(cat => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 sm:px-5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-150 shrink-0 ${
                      active
                        ? 'bg-[#1F2328] text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                        : 'text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-white'
                    }`}
                  >
                    {cat === 'All' ? 'All Gatherings' : cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clean Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#656D76] dark:text-[#8B949E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search artists, sound, cities..."
              className="w-full h-10 pl-9 pr-8 bg-white dark:bg-[#161B22] hover:bg-[#F6F8FA] dark:hover:bg-[#1C2128] focus:bg-white dark:focus:bg-[#1C2128] border border-[#D0D7DE] dark:border-[#30363D] focus:border-[#0969DA] dark:focus:border-white/40 rounded-full text-xs text-[#1F2328] dark:text-white placeholder-[#656D76] dark:placeholder-[#8B949E] focus:outline-none transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 2. REPLAY HEADER & MONTH TIMELINE */}
        <div className="space-y-4 pt-2 border-b border-[#D0D7DE] dark:border-[#30363D] pb-7">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-4">
            <div className="flex items-center justify-between sm:justify-start gap-2.5 sm:gap-3">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1F2328] dark:text-white">
                Upcoming Gatherings
              </h2>
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-medium rounded-full bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] text-[#656D76] dark:text-[#8B949E] shadow-sm shrink-0">
                2026 ▾
              </span>
            </div>

            {/* City Location Filter */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-[#656D76] dark:text-[#8B949E] font-mono">Location:</span>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] text-xs text-[#1F2328] dark:text-[#C9D1D9] rounded-full px-3 py-1.5 focus:outline-none focus:border-[#0969DA] dark:focus:border-white/40 appearance-none cursor-pointer shadow-sm"
              >
                {uniqueCities.map(city => (
                  <option key={city} value={city} className="bg-white dark:bg-[#161B22] text-[#1F2328] dark:text-white">
                    {city === 'All' ? 'All Cities' : city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Month Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1">
            {months.map(m => {
              const active = selectedMonth === m;
              return (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  className={`text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full transition-colors shrink-0 ${
                    active
                      ? 'bg-[#1F2328] text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                      : 'text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>

          {/* Typography Callout Stat */}
          <div className="pt-1">
            <p className="text-base sm:text-2xl md:text-3xl font-medium text-[#656D76] dark:text-[#8B949E]">
              You have <span className="font-bold text-[#1F2328] dark:text-white">{filteredEvents.length} curated gatherings</span> lined up for{' '}
              <span className="font-bold text-[#1F2328] dark:text-white underline decoration-[#D0D7DE] dark:decoration-[#30363D] underline-offset-4">
                Season 2026
              </span>.
            </p>
          </div>
        </div>

        {/* 3. SECTION 1: TOP GATHERINGS */}
        {topHeadliners.length > 0 && (
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xl sm:text-2xl font-bold text-[#1F2328] dark:text-white">
                <span>Top Gatherings</span>
                <ChevronRight className="w-5 h-5 text-[#656D76] dark:text-[#8B949E]" />
              </div>
              <span className="text-xs text-[#656D76] dark:text-[#8B949E] font-mono">Ranked by resonance</span>
            </div>

            {/* Horizontal Scroll Deck */}
            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-none pt-2 px-1 snap-x snap-mandatory w-full max-w-full">
              {topHeadliners.map((event, index) => {
                const registered = isRegistered(event.id);
                const rank = index + 1;
                return (
                  <div
                    key={event.id}
                    onClick={() => navigate(`/event/${event.id}`)}
                    className="group relative shrink-0 snap-start w-[210px] sm:w-[260px] md:w-[280px] h-[310px] sm:h-[370px] md:h-[400px] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] hover:border-[#1F2328] dark:hover:border-white/30 cursor-pointer shadow-lg dark:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Poster Artwork Image */}
                    <img
                      src={getEventPoster(event, index)}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Dark gradient scrim at bottom for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                    {/* Big Bold Clean White Rank Number (1, 2, 3...) at Top Left */}
                    <div className="absolute top-4 left-5 select-none">
                      <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                        {rank}
                      </span>
                    </div>

                    {/* Top Right Badges */}
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
                      <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white">
                        {event.category}
                      </span>
                      {registered && (
                        <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-emerald-600 text-white flex items-center gap-1 shadow-md">
                          <CheckCircle2 className="w-3 h-3" /> Reserved
                        </span>
                      )}
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-xs text-white/70 font-medium flex items-center gap-2">
                        <span>{event.city}</span>
                        <span>•</span>
                        <span>{event.spotsRemaining} spots left</span>
                      </p>
                      <div className="pt-2 flex items-center justify-between text-xs font-mono text-white">
                        <span className="text-white font-semibold">{event.price}</span>
                        <span className="text-white/70 group-hover:text-white transition-colors">Reserve Pass →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. SECTION 2: GATHERINGS DIRECTORY */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xl sm:text-2xl font-bold text-[#1F2328] dark:text-white">
              <span>Gatherings Directory</span>
              <ChevronRight className="w-5 h-5 text-[#656D76] dark:text-[#8B949E]" />
            </div>
            <span className="text-xs text-[#656D76] dark:text-[#8B949E] font-mono">
              Showing {filteredEvents.length} of {events.length}
            </span>
          </div>

          {/* 2-Column Tracklist Rows */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2">
            {filteredEvents.map((event, index) => {
              const registered = isRegistered(event.id);
              const rank = index + 1;
              return (
                <div
                  key={event.id}
                  className="group flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-2xl hover:bg-white dark:hover:bg-[#161B22] transition-colors border border-transparent hover:border-[#D0D7DE] dark:hover:border-[#30363D] shadow-sm hover:shadow"
                >
                  {/* Rank Number */}
                  <span className="w-6 text-center text-sm font-bold text-[#656D76] dark:text-[#8B949E] group-hover:text-[#1F2328] dark:group-hover:text-white select-none shrink-0 font-mono">
                    {rank}
                  </span>

                  {/* Square Cover Poster Artwork */}
                  <div
                    onClick={() => navigate(`/event/${event.id}`)}
                    className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 cursor-pointer shadow-sm bg-[#E1E4E8] dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D]"
                  >
                    <img
                      src={getEventPoster(event, index)}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {registered && (
                      <div className="absolute inset-0 bg-emerald-950/70 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                    )}
                  </div>

                  {/* Title & Subtitle Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/event/${event.id}`}
                      className="block text-sm font-semibold text-[#1F2328] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate"
                    >
                      {event.title}
                    </Link>
                    <div className="flex items-center gap-1.5 text-xs text-[#656D76] dark:text-[#8B949E] truncate pt-0.5">
                      <span>{event.category}</span>
                      <span>•</span>
                      <span>{event.city}</span>
                      <span>•</span>
                      <span>{event.displayDate}</span>
                    </div>
                  </div>

                  {/* Price Tag & Action */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span className="text-xs font-mono text-[#656D76] dark:text-[#8B949E] hidden sm:inline-block">
                      {event.price.split('/')[0]}
                    </span>

                    {/* Quick RSVP Button */}
                    <button
                      onClick={() => openRegistrationModal(event)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${
                        registered
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
                          : 'bg-white dark:bg-[#161B22] hover:bg-[#1F2328] hover:text-white dark:hover:bg-white dark:hover:text-black text-[#1F2328] dark:text-white border border-[#D0D7DE] dark:border-[#30363D] shadow-sm'
                      }`}
                    >
                      {registered ? 'Pass' : 'RSVP'}
                    </button>

                    {/* Link to Details */}
                    <Link
                      to={`/event/${event.id}`}
                      className="p-1.5 text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-white rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      title="View gathering details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-[#161B22] rounded-3xl border border-[#D0D7DE] dark:border-[#30363D] space-y-3 shadow-sm">
              <p className="text-lg font-bold text-[#1F2328] dark:text-white">No gatherings found</p>
              <p className="text-xs text-[#656D76] dark:text-[#8B949E] max-w-sm mx-auto">
                No gatherings match your selected criteria. Try resetting filters to explore all sessions.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedCity('All');
                  setSelectedMonth('All Months');
                  setSearchQuery('');
                }}
                className="mt-2 px-5 py-2 text-xs font-semibold rounded-full bg-[#1F2328] dark:bg-white text-white dark:text-black hover:opacity-90"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>

        {/* 5. SECTION 3: CURATED COLLECTIVES */}
        <div className="space-y-5 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xl sm:text-2xl font-bold text-[#1F2328] dark:text-white">
              <span>Curated Collectives & Series</span>
              <ChevronRight className="w-5 h-5 text-[#656D76] dark:text-[#8B949E]" />
            </div>
            <span className="text-xs text-[#656D76] dark:text-[#8B949E] font-mono">Guilds & residencies</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {collectives.map((coll, idx) => (
              <div
                key={coll.id}
                className="group space-y-2.5 cursor-pointer"
                onClick={() => setSelectedCategory('All')}
              >
                {/* Square Album Cover */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] group-hover:border-[#1F2328] dark:group-hover:border-white/30 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <img
                    src={coll.image}
                    alt={coll.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-white/80">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md">
                      #{idx + 1} Series
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md">
                      {coll.gatheringsCount} sessions
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="space-y-0.5 px-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1F2328] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {coll.name}
                  </h4>
                  <p className="text-[11px] text-[#656D76] dark:text-[#8B949E] truncate">
                    {coll.curator}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
