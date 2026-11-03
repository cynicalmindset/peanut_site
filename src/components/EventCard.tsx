import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { EventItem } from '../types/event';
import { useRegistration } from '../context/RegistrationContext';

interface EventCardProps {
  event: EventItem;
  variant?: 'standard' | 'compact' | 'centerpiece';
}

export const EventCard: React.FC<EventCardProps> = ({ event, variant = 'standard' }) => {
  const { openRegistrationModal, isRegistered } = useRegistration();
  const registered = isRegistered(event.id);

  // Soft Centerpiece Feature Card
  if (variant === 'centerpiece') {
    return (
      <article className="rounded-3xl bg-white dark:bg-atmosphere-cardDark border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg transition-all duration-300 group overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Centerpiece Image Container */}
          <div className="lg:col-span-7 relative overflow-hidden bg-slate-900 aspect-[16/10] lg:aspect-auto min-h-[340px]">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-blue-600/90 text-white text-xs font-medium tracking-wide shadow-sm backdrop-blur-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Centerpiece
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 text-xs font-medium tracking-wide backdrop-blur-md">
                {event.category}
              </span>
            </div>

            {registered && (
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-emerald-600/90 text-white text-xs font-medium flex items-center gap-1.5 shadow-sm backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Spot Secured</span>
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4 text-white sm:hidden">
              <span className="text-xs font-medium opacity-90">{event.city} • {event.displayDate}</span>
            </div>
          </div>

          {/* Centerpiece Content */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  {event.displayDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  {event.city}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                <Link to={`/event/${event.id}`}>
                  {event.title}
                </Link>
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {event.description}
              </p>

              {event.curatorNote && (
                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300 italic">
                  <span className="not-italic uppercase text-[10px] block font-bold text-blue-600 dark:text-blue-400 mb-1">
                    Atmosphere Curator Note
                  </span>
                  “{event.curatorNote}”
                </div>
              )}
            </div>

            {/* Bottom Meta & Actions */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 dark:text-slate-400 block text-[11px]">Admission</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-sm">{event.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 dark:text-slate-400 block text-[11px]">Availability</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">{event.spotsRemaining} spots left</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  to={`/event/${event.id}`}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-soft-sm"
                >
                  <span>Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => openRegistrationModal(event)}
                  className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-white transition-all shadow-md active:scale-95 ${
                    registered 
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' 
                      : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/25'
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

  // Standard Soft Editorial Card
  return (
    <article className="flex flex-col h-full bg-white dark:bg-atmosphere-cardDark border border-slate-200/70 dark:border-slate-800 rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 group">
      
      {/* Top Image Crop */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Category Pill */}
        <div className="absolute top-3.5 left-3.5">
          <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white text-xs font-medium backdrop-blur-md shadow-soft-sm">
            {event.category}
          </span>
        </div>

        {/* City Pill */}
        <div className="absolute top-3.5 right-3.5">
          <span className="px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-medium backdrop-blur-md">
            {event.city}
          </span>
        </div>

        {registered && (
          <div className="absolute bottom-3.5 left-3.5 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[11px] font-medium flex items-center gap-1 shadow-sm backdrop-blur-md">
            <CheckCircle2 className="w-3 h-3" />
            <span>Pass Booked</span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-3">
          {/* Date & Time Row */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="text-slate-700 dark:text-slate-300">{event.displayDate}</span>
            <span>•</span>
            <span className="truncate">{event.time}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
            <Link to={`/event/${event.id}`}>
              {event.title}
            </Link>
          </h3>

          {/* Venue */}
          <div className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>

          {/* Short Teaser Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Card Footer: Admission & Details Link */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-[11px] text-slate-400 block">Admission</span>
            <span className="font-semibold text-slate-900 dark:text-white text-sm">{event.price}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/event/${event.id}`}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors border border-slate-200 dark:border-slate-700 rounded-full hover:border-slate-400 shadow-soft-sm"
              title="Inspect Dossier"
              aria-label={`View details for ${event.title}`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => openRegistrationModal(event)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all shadow-sm ${
                registered
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20'
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
