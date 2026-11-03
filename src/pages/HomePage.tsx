import React from 'react';
import { Hero } from '../components/Hero';
import { EventDiscovery } from '../components/EventDiscovery';
import { EVENTS_DATA } from '../data/events';

export const HomePage: React.FC = () => {
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

  return (
    <div>
      <Hero 
        onExploreClick={handleExploreClick} 
        onFeaturedClick={handleFeaturedClick} 
      />
      <EventDiscovery events={EVENTS_DATA} />
    </div>
  );
};
