import React, { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { EventDiscovery } from '../components/EventDiscovery';
import { PosterCarousel } from '../components/PosterCarousel';
import { OffersSection } from '../components/OffersSection';
import { EVENTS_DATA } from '../data/events';

export const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const searchQuery = searchParams.get('q') || '';

  const setSearchQuery = (q: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (q.trim()) {
        next.set('q', q);
      } else {
        next.delete('q');
      }
      return next;
    }, { replace: true });
  };

  const handleExploreClick = () => {
    const el = document.getElementById('discovery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    }
  }, [location.hash]);

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero onExploreClick={handleExploreClick} />

      {/* 2. Upcoming Gatherings Directory & Filters */}
      <EventDiscovery 
        events={EVENTS_DATA}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 3. Past Gatherings & Archive Poster Marquee */}
      <PosterCarousel />

      {/* 4. Coupons & Special Offers */}
      <OffersSection />
    </div>
  );
};
