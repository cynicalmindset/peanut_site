import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { EventItem, EventCategory } from '../types/event';
import { CATEGORIES_LIST } from '../data/events';
import { EventCard } from './EventCard';

interface EventDiscoveryProps {
  events: EventItem[];
}

type SortOption = 'date-asc' | 'date-desc' | 'spots-asc' | 'title-asc';

export const EventDiscovery: React.FC<EventDiscoveryProps> = ({ events }) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('date-asc');

  // Extract unique cities from events
  const uniqueCities = useMemo(() => {
    const cities = new Set(events.map(e => e.city));
    return ['All', ...Array.from(cities)];
  }, [events]);

  // Filtering & Sorting logic
  const filteredEvents = useMemo(() => {
    return events
      .filter(event => {
        // Category filter
        if (selectedCategory !== 'All' && event.category !== selectedCategory) {
          return false;
        }

        // City filter
        if (selectedCity !== 'All' && event.city !== selectedCity) {
          return false;
        }

        // Search query
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

  // Find if there's a centerpiece event to highlight when no active search filters are applied
  const centerpieceEvent = useMemo(() => {
    if (hasActiveFilters) return null;
    return filteredEvents.find(e => e.featured) || null;
  }, [filteredEvents, hasActiveFilters]);

  // Grid events: if centerpiece is shown, exclude it from the grid below
  const gridEvents = useMemo(() => {
    if (centerpieceEvent) {
      return filteredEvents.filter(e => e.id !== centerpieceEvent.id);
    }
    return filteredEvents;
  }, [filteredEvents, centerpieceEvent]);

  return (
    <section id="discovery-section" className="py-14 sm:py-20 border-b border-paper-300 dark:border-paper-borderDark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-paper-300 dark:border-paper-borderDark">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mb-1.5 font-semibold">
              <span>EXPLORE GATHERINGS</span>
              <span>/</span>
              <span>CURATED INDEX</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-900 dark:text-white">
              Discover Documented Gatherings
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-ink-600 dark:text-neutral-400">
            <span>
              Showing <strong className="text-ink-900 dark:text-white font-semibold">{filteredEvents.length}</strong> of{' '}
              {events.length} listings
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-accent hover:underline font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4">
          
          {/* Search Input & Selectors Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search Input (6 cols) */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by keywords, venue, artist, topic (e.g. modular, riso, kernel)..."
                className="w-full pl-10 pr-10 py-3 bg-white dark:bg-paper-cardDark border border-paper-300 dark:border-paper-borderDark text-sm text-ink-900 dark:text-white placeholder:text-ink-400 dark:placeholder:text-neutral-500 rounded-sm focus:outline-none focus:border-accent font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-900 dark:hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* City Selector (3 cols) */}
            <div className="md:col-span-3">
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="w-full py-3 px-3.5 bg-white dark:bg-paper-cardDark border border-paper-300 dark:border-paper-borderDark text-sm text-ink-900 dark:text-white rounded-sm focus:outline-none focus:border-accent font-mono text-xs uppercase"
                aria-label="Filter by city"
              >
                <option value="All">All Metros & Regions</option>
                {uniqueCities.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown (3 cols) */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as SortOption)}
                  className="w-full py-3 px-3.5 bg-white dark:bg-paper-cardDark border border-paper-300 dark:border-paper-borderDark text-sm text-ink-900 dark:text-white rounded-sm focus:outline-none focus:border-accent font-mono text-xs uppercase"
                  aria-label="Sort events"
                >
                  <option value="date-asc">Date: Earliest First</option>
                  <option value="date-desc">Date: Latest First</option>
                  <option value="spots-asc">Availability: Fewest Spots</option>
                  <option value="title-asc">Alphabetical: A to Z</option>
                </select>
              </div>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div id="categories-filter" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
            <span className="text-xs font-mono text-ink-400 dark:text-neutral-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Category:
            </span>
            {CATEGORIES_LIST.map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap rounded-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-ink-900 dark:bg-white text-white dark:text-ink-900 font-semibold shadow-xs'
                      : 'bg-white dark:bg-paper-cardDark border border-paper-300 dark:border-paper-borderDark text-ink-700 dark:text-neutral-300 hover:border-ink-900 dark:hover:border-neutral-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Centerpiece Feature Highlight (if visible) */}
        {centerpieceEvent && (
          <div id="centerpiece-event" className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold tracking-widest">
              <span>★ CRITIC'S PICK & CENTERPIECE</span>
            </div>
            <EventCard event={centerpieceEvent} variant="centerpiece" />
          </div>
        )}

        {/* Responsive Events Grid */}
        {gridEvents.length > 0 ? (
          <div className="space-y-4">
            {centerpieceEvent && (
              <div className="pt-8 border-t border-paper-300 dark:border-paper-borderDark flex items-center justify-between">
                <h3 className="font-serif text-2xl font-bold tracking-tight text-ink-900 dark:text-white">
                  Chronological Index & Upcoming Sessions
                </h3>
                <span className="font-mono text-xs text-ink-500 dark:text-neutral-400">
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
          /* Empty State when no events match filters */
          <div className="py-16 text-center border border-dashed border-paper-300 dark:border-paper-borderDark bg-white dark:bg-paper-cardDark p-8 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-paper-200 dark:bg-paper-dark flex items-center justify-center text-ink-400 dark:text-neutral-500 font-mono text-lg">
              ∅
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-ink-900 dark:text-white">
                No gatherings match your current criteria
              </h3>
              <p className="text-sm text-ink-500 dark:text-neutral-400 max-w-md mx-auto">
                We couldn't find events matching "{searchQuery}" in {selectedCategory} ({selectedCity}).
                Try relaxing your search terms or view all indexed gatherings.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-mono uppercase tracking-widest font-semibold rounded-sm transition-colors shadow-sm"
              >
                Clear All Filters & Reset
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
