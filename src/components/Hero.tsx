import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EVENTS_DATA } from '../data/events';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Mobile Swipeable Stack State
  const [activeMobileIndex, setActiveMobileIndex] = useState(2); // Center card (Rickshaw Vibes)
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const isMouseDownRef = useRef(false);

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

  // Touch handlers for mobile swipeable stack
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    isHorizontalSwipeRef.current = null;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartXRef.current;
    const dy = e.touches[0].clientY - touchStartYRef.current;

    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(dx) > Math.abs(dy) + 4) {
        isHorizontalSwipeRef.current = true;
      } else if (Math.abs(dy) > Math.abs(dx) + 4) {
        isHorizontalSwipeRef.current = false;
      }
    }

    if (isHorizontalSwipeRef.current) {
      setDragOffset(dx);
    }
  };

  const handleTouchEnd = () => {
    if (isHorizontalSwipeRef.current) {
      if (dragOffset < -40) {
        setActiveMobileIndex((prev) => (prev + 1) % cards.length);
      } else if (dragOffset > 40) {
        setActiveMobileIndex((prev) => (prev - 1 + cards.length) % cards.length);
      }
    }
    setDragOffset(0);
    setIsDragging(false);
    isHorizontalSwipeRef.current = null;
  };

  // Mouse handlers for desktop emulation
  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDownRef.current = true;
    touchStartXRef.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current) return;
    const dx = e.clientX - touchStartXRef.current;
    setDragOffset(dx);
  };

  const handleMouseUp = () => {
    if (isMouseDownRef.current) {
      if (dragOffset < -40) {
        setActiveMobileIndex((prev) => (prev + 1) % cards.length);
      } else if (dragOffset > 40) {
        setActiveMobileIndex((prev) => (prev - 1 + cards.length) % cards.length);
      }
      setDragOffset(0);
      setIsDragging(false);
      isMouseDownRef.current = false;
    }
  };

  const isDark = theme === 'dark';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(0, 0, 0, 0.08)';

  return (
    <section className="hero-mobile-fullscreen relative w-full bg-[#F6F8FA] dark:bg-[#0D1117] text-[#1F2328] dark:text-white flex flex-col justify-between pt-3 sm:pt-20 md:pt-24 pb-3 sm:pb-0 overflow-hidden border-b border-[#D0D7DE] dark:border-[#30363D] transition-colors">
      
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
      <div className="relative z-20 max-w-3xl mx-auto px-4 text-center space-y-1 sm:space-y-3 pt-1">
        <h1 className="text-center select-none">
          <span className="block font-sans font-bold tracking-tight text-3xl sm:text-5xl md:text-6xl text-[#1F2328] dark:text-white leading-[1.18] pb-0.5 sm:pb-2">
            Curated Gatherings
          </span>
          <span className="block font-display italic font-normal text-5xl sm:text-7xl md:text-8xl tracking-tight bg-gradient-to-r from-[#111111] via-[#24292F] to-[#57606A] dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent leading-[1.14] pb-1 sm:pb-3">
            Unforgettable Nights
          </span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-[#656D76] dark:text-[#8B949E] max-w-lg mx-auto leading-relaxed">
          Handpicked cultural gatherings, live music, and creative summits.
        </p>
      </div>

      {/* 1. MOBILE INTERACTIVE SWIPEABLE LIVE STACK (sm:hidden) — FILLS FULL SCREEN */}
      <div className="sm:hidden relative z-20 flex-1 flex flex-col items-center justify-between py-2 max-w-sm mx-auto px-4 select-none w-full h-full">
        {/* Generously Proportioned Stack Card Box */}
        <div 
          className="relative w-[75vw] max-w-[305px] min-w-[250px] h-[48vh] max-h-[430px] min-h-[340px] cursor-grab active:cursor-grabbing touch-pan-y my-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {cards.map((card, i) => {
            let diff = i - activeMobileIndex;
            if (diff < -2) diff += cards.length;
            if (diff > 2) diff -= cards.length;

            const isVisible = Math.abs(diff) <= 2;
            if (!isVisible) return null;

            const isCurrent = diff === 0;

            let translateX = diff * 24;
            let translateY = Math.abs(diff) * 8;
            let rotate = diff * 4.5;
            let scale = 1 - Math.abs(diff) * 0.08;
            let opacity = 1 - Math.abs(diff) * 0.22;
            let zIndex = 30 - Math.abs(diff) * 10;

            if (isCurrent) {
              translateX += dragOffset;
              rotate += dragOffset * 0.035;
            }

            return (
              <div
                key={card.id}
                onClick={() => {
                  if (isCurrent && Math.abs(dragOffset) < 6) {
                    navigate(`/event/${card.event.id}`);
                  } else if (diff !== 0) {
                    setActiveMobileIndex(i);
                  }
                }}
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/20 bg-white dark:bg-[#161B22]"
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1), opacity 0.35s ease',
                }}
                title={card.event.title}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />

                {/* Event info pill overlay on current top card */}
                {isCurrent && (
                  <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-black/85 backdrop-blur-md text-white text-xs flex items-center justify-between border border-white/15 shadow-lg">
                    <div className="truncate pr-2 text-left">
                      <span className="font-bold block truncate text-xs">{card.event.title}</span>
                      <span className="text-[10px] text-white/70 font-mono">{card.event.city} • {card.event.displayDate}</span>
                    </div>
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-white text-black font-mono">
                      View
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Swipe Controls: Arrows + Dots + Scroll Cue */}
        <div className="w-full flex flex-col items-center gap-2 pt-2 pb-1">
          <div className="flex items-center justify-between w-full max-w-[270px] px-2">
            <button
              onClick={() => setActiveMobileIndex((prev) => (prev - 1 + cards.length) % cards.length)}
              className="p-2 rounded-full border border-[#D0D7DE] dark:border-[#30363D] bg-white dark:bg-[#161B22] text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-white shadow-sm transition-colors active:scale-95"
              aria-label="Previous poster"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {cards.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveMobileIndex(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeMobileIndex === dotIdx
                      ? 'w-6 bg-[#1F2328] dark:bg-white'
                      : 'w-1.5 bg-[#D0D7DE] dark:bg-[#30363D]'
                  }`}
                  aria-label={`Go to poster ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveMobileIndex((prev) => (prev + 1) % cards.length)}
              className="p-2 rounded-full border border-[#D0D7DE] dark:border-[#30363D] bg-white dark:bg-[#161B22] text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-white shadow-sm transition-colors active:scale-95"
              aria-label="Next poster"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div 
            onClick={() => {
              const el = document.getElementById('discovery');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1 text-[11px] font-mono text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-white cursor-pointer transition-colors"
          >
            <span>Scroll down for gatherings</span>
            <span className="animate-bounce inline-block">↓</span>
          </div>
        </div>
      </div>

      {/* 2. DESKTOP 5 FANNED CARDS (hidden on mobile, visible on sm and up) */}
      <div className="hidden sm:flex relative z-20 mt-8 md:mt-10 max-w-5xl mx-auto px-4 overflow-visible pb-0 pt-2 justify-center">
        <div className="flex items-end justify-center translate-y-[5%]">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => navigate(`/event/${card.event.id}`)}
              className={`relative shrink-0 ${card.width} ${card.height} ${card.margin} ${card.rotation} ${card.baseTranslateY} rounded-t-[20px] sm:rounded-t-[26px] md:rounded-t-[30px] overflow-hidden shadow-[-10px_0_24px_rgba(0,0,0,0.18),0_18px_45px_rgba(0,0,0,0.25)] dark:shadow-[-11px_0_26px_rgba(0,0,0,0.8),0_19px_48px_rgba(0,0,0,0.9)] border-t border-x border-black/10 dark:border-white/20 select-none cursor-pointer bg-white dark:bg-[#161B22] transition-transform duration-200 hover:-translate-y-2`}
              style={{
                zIndex: card.zIndex,
              }}
              title={`View gathering: ${card.event.title}`}
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
