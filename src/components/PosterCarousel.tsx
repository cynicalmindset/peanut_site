import React, { useEffect, useState, useRef } from 'react';
import { EVENTS_DATA } from '../data/events';
import { useRegistration } from '../context/RegistrationContext';

export const PosterCarousel: React.FC = () => {
  const { openRegistrationModal } = useRegistration();
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setScrollY(window.innerHeight - rect.top);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 10 unique posters for Row 1
  const row1Posters = [
    { src: '/posters/poster-1.jfif', event: EVENTS_DATA[0] },
    { src: '/posters/poster-2.jfif', event: EVENTS_DATA[1] },
    { src: '/posters/poster-3.jfif', event: EVENTS_DATA[4] },
    { src: '/posters/poster-4.jfif', event: EVENTS_DATA[5] },
    { src: '/posters/poster-5.jfif', event: EVENTS_DATA[7] },
    { src: '/posters/poster-6.jfif', event: EVENTS_DATA[2] },
    { src: '/posters/poster-7.jfif', event: EVENTS_DATA[3] },
    { src: '/posters/poster-8.jfif', event: EVENTS_DATA[6] },
    { src: '/posters/poster-9.jfif', event: EVENTS_DATA[7] },
    { src: '/posters/poster-10.jfif', event: EVENTS_DATA[0] },
  ];

  // 10 unique posters for Row 2
  const row2Posters = [
    { src: '/posters/poster-11.jfif', event: EVENTS_DATA[1] },
    { src: '/posters/poster-12.jfif', event: EVENTS_DATA[2] },
    { src: '/posters/poster-13.jfif', event: EVENTS_DATA[3] },
    { src: '/posters/poster-14.jfif', event: EVENTS_DATA[4] },
    { src: '/posters/poster-15.jfif', event: EVENTS_DATA[5] },
    { src: '/posters/poster-16.jfif', event: EVENTS_DATA[6] },
    { src: '/posters/poster-17.jfif', event: EVENTS_DATA[7] },
    { src: '/posters/poster-18.jfif', event: EVENTS_DATA[0] },
    { src: '/posters/poster-19.jfif', event: EVENTS_DATA[1] },
    { src: '/posters/poster-20.jfif', event: EVENTS_DATA[2] },
  ];

  // Duplicate for seamless 0% -> -50% infinite marquee loop
  const fullRow1 = [...row1Posters, ...row1Posters];
  const fullRow2 = [...row2Posters, ...row2Posters];

  // Subtle scroll parallax shift that accents the continuous animation
  const scrollShift = scrollY * 0.15;

  return (
    <section 
      id="archive"
      ref={sectionRef} 
      className="relative w-full bg-[#0D1117] py-10 sm:py-14 overflow-hidden border-b border-[#30363D]"
    >
      
      {/* Background subtle radial ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-white/[0.02] blur-[120px] pointer-events-none rounded-full" />

      {/* Compact Section Header */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center mb-6 sm:mb-8 space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
          Past Gatherings & Archive
        </h2>
        <p className="text-xs text-[#8B949E] max-w-sm mx-auto">
          Scroll through visual dispatches, collector prints, and memories from our previous gatherings.
        </p>
      </div>

      {/* Carousel Container with Edge Vignettes */}
      <div className="relative w-full space-y-3 sm:space-y-4 overflow-hidden">
        
        {/* Left and Right Edge Vignette Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/90 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-[#0D1117] via-[#0D1117]/90 to-transparent z-20" />

        {/* Row 1: Smooth Infinite Scrolling Animation moving LEFT + Scroll Parallax */}
        <div 
          className="will-change-transform"
          style={{ transform: `translate3d(-${scrollShift}px, 0, 0)` }}
        >
          <div className="animate-marquee-left flex gap-2.5 sm:gap-3.5">
            {fullRow1.map((item, index) => (
              <div
                key={`r1-${index}`}
                onClick={() => openRegistrationModal(item.event)}
                className="group relative shrink-0 w-24 sm:w-32 md:w-36 h-32 sm:h-44 md:h-48 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border border-[#30363D] hover:border-white/60 bg-[#161B22] shadow-md select-none transition-transform duration-200 hover:scale-[1.03]"
                title={`View ${item.event.title}`}
              >
                <img
                  src={item.src}
                  alt={item.event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl sm:rounded-2xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Smooth Infinite Scrolling Animation moving RIGHT + Scroll Parallax */}
        <div 
          className="will-change-transform"
          style={{ transform: `translate3d(${scrollShift}px, 0, 0)` }}
        >
          <div className="animate-marquee-right flex gap-2.5 sm:gap-3.5">
            {fullRow2.map((item, index) => (
              <div
                key={`r2-${index}`}
                onClick={() => openRegistrationModal(item.event)}
                className="group relative shrink-0 w-24 sm:w-32 md:w-36 h-32 sm:h-44 md:h-48 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border border-[#30363D] hover:border-white/60 bg-[#161B22] shadow-md select-none transition-transform duration-200 hover:scale-[1.03]"
                title={`View ${item.event.title}`}
              >
                <img
                  src={item.src}
                  alt={item.event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl sm:rounded-2xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};
