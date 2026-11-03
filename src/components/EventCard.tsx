import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { EventItem } from '../types/event';
import { useRegistration } from '../context/RegistrationContext';

interface EventCardProps {
  event: EventItem;
  variant?: 'standard' | 'compact' | 'centerpiece';
}

export const EventCard: React.FC<EventCardProps> = ({ event, variant = 'standard' }) => {
  const { openRegistrationModal, isRegistered } = useRegistration();
  const registered = isRegistered(event.id);

  // Centerpiece layout is rendered specially for the featured event
  if (variant === 'centerpiece') {
    return (
      <article className="border border-paper-300 dark:border-paper-borderDark bg-white dark:bg-paper-cardDark shadow-sm hover:border-ink-900 dark:hover:border-neutral-400 transition-all group overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Centerpiece Image (7 cols) */}
          <div className="lg:col-span-7 relative overflow-hidden bg-ink-900 aspect-[16/10] lg:aspect-auto min-h-[320px]">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 bg-accent text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-xs">
                Centerpiece Feature
              </span>
              <span className="px-3 py-1 bg-ink-900/90 text-white font-mono text-xs uppercase tracking-wider rounded-xs backdrop-blur-xs">
                {event.category}
              </span>
            </div>

            {registered && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-600 text-white font-mono text-xs flex items-center gap-1.5 shadow">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SPOT SECURED</span>
              </div>
            )}
          </div>

          {/* Centerpiece Editorial Content (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-ink-500 dark:text-neutral-400 pb-3 border-b border-paper-200 dark:border-paper-borderDark">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  {event.displayDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  {event.city}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-white leading-tight group-hover:text-accent transition-colors">
                <Link to={`/event/${event.id}`}>
                  {event.title}
                </Link>
              </h3>

              <p className="text-sm sm:text-base text-ink-600 dark:text-neutral-300 leading-relaxed font-normal">
                {event.description}
              </p>

              {event.curatorNote && (
                <div className="p-3.5 bg-paper-100 dark:bg-paper-dark border-l-2 border-accent text-xs italic text-ink-700 dark:text-neutral-300">
                  <span className="font-mono not-italic uppercase text-[10px] block font-semibold text-accent mb-0.5">
                    Curator's Dispatch
                  </span>
                  “{event.curatorNote}”
                </div>
              )}
            </div>

            {/* Bottom Meta & Actions */}
            <div className="space-y-4 pt-4 border-t border-paper-200 dark:border-paper-borderDark">
              <div className="flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-ink-500 dark:text-neutral-400 block text-[10px] uppercase">Admission</span>
                  <span className="font-semibold text-ink-900 dark:text-white">{event.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-ink-500 dark:text-neutral-400 block text-[10px] uppercase">Capacity</span>
                  <span className="font-semibold text-accent">{event.spotsRemaining} spots left</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  to={`/event/${event.id}`}
                  className="flex items-center justify-center gap-1 px-4 py-2.5 border border-paper-400 dark:border-paper-borderDark text-xs font-mono uppercase tracking-wider text-ink-900 dark:text-white hover:border-ink-900 dark:hover:border-white transition-colors"
                >
                  <span>Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => openRegistrationModal(event)}
                  className={`flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold text-white transition-all ${
                    registered 
                      ? 'bg-emerald-600 hover:bg-emerald-700' 
                      : 'bg-accent hover:bg-accent-hover'
                  }`}
                >
                  <span>{registered ? 'Pass Issued' : 'Reserve Spot'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </article>
    );
  }

  // Standard Editorial Card
  return (
    <article className="flex flex-col h-full bg-white dark:bg-paper-cardDark border border-paper-300 dark:border-paper-borderDark hover:border-ink-900 dark:hover:border-neutral-300 transition-all duration-200 group">
      
      {/* Top Image Crop */}
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-0.5 bg-paper-100/90 dark:bg-paper-dark/90 text-ink-900 dark:text-white font-mono text-[11px] uppercase tracking-wider rounded-xs backdrop-blur-xs font-medium border border-paper-300 dark:border-paper-borderDark">
            {event.category}
          </span>
        </div>

        {/* City Indicator */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 bg-black/70 text-white font-mono text-[10px] uppercase tracking-wider rounded-xs backdrop-blur-xs">
            {event.city}
          </span>
        </div>

        {/* Registered status indicator */}
        {registered && (
          <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-emerald-600 text-white font-mono text-[10px] uppercase font-semibold flex items-center gap-1 shadow">
            <CheckCircle2 className="w-3 h-3" />
            <span>Pass Booked</span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2.5">
          {/* Date & Time Row */}
          <div className="flex items-center gap-2 text-xs font-mono text-ink-500 dark:text-neutral-400">
            <Calendar className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="font-medium text-ink-800 dark:text-neutral-200">{event.displayDate}</span>
            <span>•</span>
            <span className="truncate">{event.time}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-bold tracking-tight text-ink-900 dark:text-white leading-snug group-hover:text-accent transition-colors">
            <Link to={`/event/${event.id}`}>
              {event.title}
            </Link>
          </h3>

          {/* Venue */}
          <div className="flex items-start gap-1.5 text-xs text-ink-600 dark:text-neutral-400 font-mono">
            <MapPin className="w-3.5 h-3.5 text-ink-400 dark:text-neutral-500 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>

          {/* Short Teaser Description */}
          <p className="text-xs sm:text-sm text-ink-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Card Footer: Admission & Details Link */}
        <div className="pt-3 border-t border-paper-200 dark:border-paper-borderDark flex items-center justify-between font-mono text-xs">
          <div>
            <span className="text-[10px] uppercase text-ink-400 dark:text-neutral-500 block">Admission</span>
            <span className="font-semibold text-ink-900 dark:text-white">{event.price}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/event/${event.id}`}
              className="p-1.5 text-ink-700 dark:text-neutral-300 hover:text-accent transition-colors border border-paper-300 dark:border-paper-borderDark rounded-xs hover:border-ink-900"
              title="Inspect Dossier"
              aria-label={`View details for ${event.title}`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => openRegistrationModal(event)}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-colors ${
                registered
                  ? 'bg-emerald-600 text-white'
                  : 'bg-ink-900 dark:bg-white text-white dark:text-ink-900 hover:bg-accent dark:hover:bg-accent dark:hover:text-white'
              }`}
            >
              {registered ? 'View Pass' : 'RSVP'}
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};
