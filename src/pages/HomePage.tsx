import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { EventDiscovery } from '../components/EventDiscovery';
import { EVENTS_DATA } from '../data/events';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleExploreClick = () => {
    const el = document.getElementById('discovery-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFeaturedClick = () => {
    const el = document.getElementById('centerpiece-event') || document.getElementById('discovery-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    const el = document.getElementById('discovery-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Hero 
        onExploreClick={handleExploreClick} 
        onFeaturedClick={handleFeaturedClick}
        onSearchSubmit={handleSearchSubmit}
      />
      <EventDiscovery 
        events={EVENTS_DATA}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </div>
  );
};
