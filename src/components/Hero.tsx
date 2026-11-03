import React from 'react';
import { EVENTS_DATA } from '../data/events';
import { useRegistration } from '../context/RegistrationContext';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const { openRegistrationModal } = useRegistration();
  const { theme } = useTheme();

  // 5 pure poster cards, broadened while maintaining exact height
  const cards = [
    {
      id: 'card-1',
      title: 'Akira',
      image: '/posters/poster-1.jfif',
      event: EVENTS_DATA[0],
      width: 'w-[145px] sm:w-[186px] md:w-[222px] lg:w-[246px]',
      height: 'h-[231px] sm:h-[288px] md:h-[336px] lg:h-[363px]',
      rotation: '-rotate-[9deg]',
      baseTranslateY: 'translate-y-4 sm:translate-y-5',
      margin: '',
      zIndex: 10,
    },
    {
      id: 'card-2',
      title: 'Studio',
      image: '/posters/poster-2.jfif',
      event: EVENTS_DATA[1],
      width: 'w-[162px] sm:w-[206px] md:w-[242px] lg:w-[268px]',
      height: 'h-[253px] sm:h-[317px] md:h-[363px] lg:h-[396px]',
      rotation: '-rotate-[4deg]',
      baseTranslateY: 'translate-y-1.5 sm:translate-y-2',
      margin: '-ml-10 sm:-ml-14 md:-ml-18 lg:-ml-22',
      zIndex: 20,
    },
    {
      id: 'card-3',
      title: 'Rickshaw Vibes',
      image: '/posters/poster-3.jfif',
      event: EVENTS_DATA[4],
      width: 'w-[182px] sm:w-[228px] md:w-[270px] lg:w-[298px]',
      height: 'h-[280px] sm:h-[348px] md:h-[398px] lg:h-[438px]',
      rotation: 'rotate-0',
      baseTranslateY: '-translate-y-1 sm:-translate-y-1.5',
      margin: '-ml-10 sm:-ml-14 md:-ml-18 lg:-ml-22',
      zIndex: 30, // Front & center, largest
    },
    {
      id: 'card-4',
      title: 'Arjun',
      image: '/posters/poster-4.jfif',
      event: EVENTS_DATA[5],
      width: 'w-[162px] sm:w-[206px] md:w-[242px] lg:w-[268px]',
      height: 'h-[253px] sm:h-[317px] md:h-[363px] lg:h-[396px]',
      rotation: 'rotate-[4deg]',
      baseTranslateY: 'translate-y-1.5 sm:translate-y-2',
      margin: '-ml-10 sm:-ml-14 md:-ml-18 lg:-ml-22',
      zIndex: 20,
    },
    {
      id: 'card-5',
      title: 'Vintage Radio',
      image: '/posters/poster-5.jfif',
      event: EVENTS_DATA[7],
      width: 'w-[145px] sm:w-[186px] md:w-[222px] lg:w-[246px]',
      height: 'h-[231px] sm:h-[288px] md:h-[336px] lg:h-[363px]',
      rotation: 'rotate-[9deg]',
      baseTranslateY: 'translate-y-4 sm:translate-y-5',
      margin: '-ml-10 sm:-ml-14 md:-ml-18 lg:-ml-22',
      zIndex: 10,
    },
  ];

  const isDark = theme === 'dark';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(0, 0, 0, 0.08)';

  return (
    <section className="relative w-full bg-[#F6F8FA] dark:bg-[#0D1117] text-[#1F2328] dark:text-white pt-14 sm:pt-20 md:pt-24 pb-0 overflow-hidden border-b border-[#D0D7DE] dark:border-[#30363D] transition-colors">
      
      {/* Big, Visible, Fading Grid Background (80px tiles with distinct contrast) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 38%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 38%, black 30%, transparent 85%)',
        }}
      />

      {/* Ambient center light */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-blue-500/[0.05] dark:bg-blue-500/[0.07] blur-[140px] pointer-events-none rounded-full" />

      {/* Centered Heading Content with Harmonious Dual-Font Typography */}
      <div className="relative z-20 max-w-3xl mx-auto px-4 text-center space-y-2 sm:space-y-3">
        <h1 className="text-center select-none">
          <span className="block font-sans font-bold tracking-tight text-3xl sm:text-5xl md:text-6xl text-[#1F2328] dark:text-white leading-[1.2] pb-1 sm:pb-2">
            Curated Gatherings
          </span>
          <span className="block font-display italic font-normal text-5xl sm:text-7xl md:text-8xl tracking-tight bg-gradient-to-r from-[#111111] via-[#24292F] to-[#57606A] dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent leading-[1.18] pb-2 sm:pb-3">
            Unforgettable Nights
          </span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-[#656D76] dark:text-[#8B949E] max-w-lg mx-auto leading-relaxed pt-0.5">
          Handpicked cultural gatherings, live music, and creative summits.
        </p>
      </div>

      {/* THE 5 OVERLAPPING FANNED CARDS (broadened width, same height) */}
      <div className="relative z-20 mt-6 sm:mt-8 md:mt-10 max-w-5xl mx-auto px-4 overflow-x-auto sm:overflow-visible pb-0 pt-2 scrollbar-none flex justify-center">
        <div className="flex items-end justify-center min-w-[540px] sm:min-w-0 translate-y-[5%] sm:translate-y-[5%]">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => openRegistrationModal(card.event)}
              className={`relative shrink-0 ${card.width} ${card.height} ${card.margin} ${card.rotation} ${card.baseTranslateY} rounded-t-[20px] sm:rounded-t-[26px] md:rounded-t-[30px] overflow-hidden shadow-[-10px_0_24px_rgba(0,0,0,0.18),0_18px_45px_rgba(0,0,0,0.25)] dark:shadow-[-11px_0_26px_rgba(0,0,0,0.8),0_19px_48px_rgba(0,0,0,0.9)] border-t border-x border-black/10 dark:border-white/20 select-none cursor-pointer bg-white dark:bg-[#161B22]`}
              style={{
                zIndex: card.zIndex,
              }}
              title={`Click to reserve: ${card.event.title}`}
            >
              {/* Pure Poster Image — No text, no header, no badge */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover select-none pointer-events-none"
                loading="eager"
              />

              {/* Subtle top/side edge highlight */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-t-[20px] sm:rounded-t-[26px] md:rounded-t-[30px] pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
