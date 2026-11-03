import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { EventItem, EventCategory } from '../types/event';
import { CATEGORIES_LIST } from '../data/events';
import { EventCard } from './EventCard';

interface EventDiscoveryProps {
  events: EventItem[];
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

type SortOption = 'date-asc' | 'date-desc' | 'spots-asc' | 'title-asc';

export const EventDiscovery: React.FC<EventDiscoveryProps> = ({ 
  events,
  searchQuery: externalSearchQuery,
  onSearchChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('date-asc');

  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = (val: string) => {
    if (onSearchChange) onSearchChange(val);
    setInternalSearchQuery(val);
  };

  // Extract unique cities
  const uniqueCities = useMemo(() => {
    const cities = new Set(events.map(e => e.city));
    return ['All', ...Array.from(cities)];
  }, [events]);

  // Filtering & Sorting
  const filteredEvents = useMemo(() => {
    return events
      .filter(event => {
        if (selectedCategory !== 'All' && event.category !== selectedCategory) {
          return false;
        }

        if (selectedCity !== 'All' && event.city !== selectedCity) {
          return false;
        }

        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchesTitle = event.title.toLowerCase().includes(query);
          const matchesDesc = event.description.toLowerCase().includes(query);
          const matchesVenue = event.venue.toLowerCase().includes(query);
          const matchesCity = event.city.toLowerCase().includes(query);
          const matchesTags = event.tags.some(tag => tag.toLowerCase().includes(query));
          return matchesTitle || matchesDesc || matchesVenue || matchesCity || matchesTags;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date-asc') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (sortBy === 'date-desc') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (sortBy === 'spots-asc') {
          return a.spotsRemaining - b.spotsRemaining;
        }
        if (sortBy === 'title-asc') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [events, selectedCategory, selectedCity, searchQuery, sortBy]);

  const hasActiveFilters = selectedCategory !== 'All' || selectedCity !== 'All' || searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedCity('All');
    setSearchQuery('');
    setSortBy('date-asc');
  };

  const centerpieceEvent = useMemo(() => {
    if (hasActiveFilters) return null;
    return filteredEvents.find(e => e.featured) || null;
  }, [filteredEvents, hasActiveFilters]);

  const gridEvents = useMemo(() => {
    if (centerpieceEvent) {
      return filteredEvents.filter(e => e.id !== centerpieceEvent.id);
    }
    return filteredEvents;
  }, [filteredEvents, centerpieceEvent]);

  return (
    <section id="discovery-section" className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-2">
              <span>EXPLORE GATHERINGS</span>
              <span>/</span>
              <span>CURATED INDEX</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Curated Event Directory
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span>
              Showing <strong className="text-slate-900 dark:text-white font-semibold">{filteredEvents.length}</strong> of{' '}
              {events.length} listings
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Soft Filter Controls Bar */}
        <div className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search Pill Input (6 cols) */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by keywords, venue, artist, topic (modular, riso, film)..."
                className="w-full pl-11 pr-10 py-3 bg-white dark:bg-atmosphere-cardDark border border-slate-200/80 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-soft-sm font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* City Selector Pill (3 cols) */}
            <div className="md:col-span-3">
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="w-full py-3 px-4 bg-white dark:bg-atmosphere-cardDark border border-slate-200/80 dark:border-slate-700 text-sm text-slate-800 dark:text-white rounded-full focus:outline-none focus:border-blue-500 shadow-soft-sm font-medium"
                aria-label="Filter by city"
              >
                <option value="All">All Regions & Metros</option>
                {uniqueCities.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown Pill (3 cols) */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="w-full py-3 px-4 bg-white dark:bg-atmosphere-cardDark border border-slate-200/80 dark:border-slate-700 text-sm text-slate-800 dark:text-white rounded-full focus:outline-none focus:border-blue-500 shadow-soft-sm font-medium"
                aria-label="Sort events"
              >
                <option value="date-asc">Date: Earliest First</option>
                <option value="date-desc">Date: Latest First</option>
                <option value="spots-asc">Availability: Fewest Spots</option>
                <option value="title-asc">Alphabetical: A to Z</option>
              </select>
            </div>

          </div>

          {/* Category Filter Pills (Inspo Style) */}
          <div id="categories-filter" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Category:
            </span>
            {CATEGORIES_LIST.map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-medium whitespace-nowrap rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                      : 'bg-white dark:bg-atmosphere-cardDark border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 hover:shadow-soft-sm'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Centerpiece Feature Highlight */}
        {centerpieceEvent && (
          <div id="centerpiece-event" className="space-y-3 pt-2">
            <EventCard event={centerpieceEvent} variant="centerpiece" />
          </div>
        )}

        {/* Responsive Events Grid */}
        {gridEvents.length > 0 ? (
          <div className="space-y-6">
            {centerpieceEvent && (
              <div className="pt-6 flex items-center justify-between">
                <h3 className="font-serif text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Upcoming Gatherings
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {gridEvents.length} entries listed
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {gridEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        ) : (
          /* Soft Empty State */
          <div className="py-16 text-center border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-atmosphere-cardDark rounded-3xl p-8 space-y-4 shadow-soft">
            <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center font-serif text-2xl">
              ☁️
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                No gatherings match your criteria
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                We couldn't find events matching "{searchQuery}" in {selectedCategory}.
                Try broadening your search or resetting filters.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold tracking-wide shadow-md shadow-blue-600/20 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
