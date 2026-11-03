import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { EventItem } from '../types/event';
import { useRegistration } from '../context/RegistrationContext';

interface EventCardProps {
  event: EventItem;
  variant?: 'standard' | 'centerpiece';
}

export const EventCard: React.FC<EventCardProps> = ({ event, variant = 'standard' }) => {
  const { openRegistrationModal, isRegistered } = useRegistration();
  const registered = isRegistered(event.id);

  if (variant === 'centerpiece') {
    return (
      <article className="group border border-border dark:border-dark-border bg-surface dark:bg-dark-surface hover:border-primary/30 dark:hover:border-dark-primary/30 transition-colors overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          
          <div className="relative overflow-hidden bg-border-light dark:bg-dark-border aspect-[16/10] lg:aspect-auto lg:min-h-[380px]">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" loading="lazy" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-2.5 py-1 bg-primary text-white text-[11px] font-medium tracking-wide">Featured</span>
              <span className="px-2.5 py-1 bg-white/90 dark:bg-dark-surface/90 text-primary dark:text-dark-primary text-[11px] font-medium backdrop-blur-sm">{event.category}</span>
            </div>
            {registered && (
              <div className="absolute top-4 right-4 px-2.5 py-1 bg-green-700 text-white text-[11px] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Reserved
              </div>
            )}
          </div>

          <div className="p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center gap-4 text-[11px] font-mono text-muted dark:text-dark-muted uppercase tracking-wider">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.displayDate}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.city}</span>
              </div>
              <h3 className="font-display text-heading-2 text-primary dark:text-dark-primary">
                <Link to={`/event/${event.id}`} className="hover:opacity-70 transition-opacity">{event.title}</Link>
              </h3>
              <p className="text-sm text-secondary dark:text-dark-secondary leading-relaxed">{event.description}</p>
              {event.curatorNote && (
                <blockquote className="pl-4 border-l-2 border-border dark:border-dark-border text-[13px] italic text-secondary dark:text-dark-secondary">
                  "{event.curatorNote}"
                </blockquote>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-border dark:border-dark-border space-y-5">
              <div className="flex justify-between text-[12px] font-mono">
                <div><span className="text-muted dark:text-dark-muted block">Admission</span><span className="text-primary dark:text-dark-primary font-medium">{event.price}</span></div>
                <div className="text-right"><span className="text-muted dark:text-dark-muted block">Availability</span><span className="text-primary dark:text-dark-primary font-medium">{event.spotsRemaining} spots</span></div>
              </div>
              <div className="flex gap-3">
                <Link to={`/event/${event.id}`} className="flex-1 h-10 flex items-center justify-center gap-1.5 text-[12px] font-medium border border-border dark:border-dark-border text-primary dark:text-dark-primary hover:bg-border-light dark:hover:bg-dark-border transition-colors">
                  Details <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <button onClick={() => openRegistrationModal(event)} className={`flex-1 h-10 text-[12px] font-medium text-white transition-colors ${registered ? 'bg-green-700 hover:bg-green-800' : 'bg-primary dark:bg-dark-primary dark:text-dark-bg hover:opacity-80'}`}>
                  {registered ? 'View Pass' : 'Reserve'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col bg-surface dark:bg-dark-surface border border-border dark:border-dark-border hover:border-primary/30 dark:hover:border-dark-primary/30 transition-colors">
      <div className="relative aspect-[16/10] overflow-hidden bg-border-light dark:bg-dark-border">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" loading="lazy" />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 bg-white/90 dark:bg-dark-surface/90 text-primary dark:text-dark-primary text-[11px] font-medium backdrop-blur-sm">{event.category}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 bg-black/60 text-white text-[11px] font-medium backdrop-blur-sm">{event.city}</span>
        </div>
        {registered && (
          <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-green-700 text-white text-[10px] font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Reserved
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[11px] font-mono text-muted dark:text-dark-muted">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.displayDate}</span>
            <span>·</span>
            <span className="truncate">{event.time}</span>
          </div>
          <h3 className="font-display text-[1.15rem] leading-snug text-primary dark:text-dark-primary">
            <Link to={`/event/${event.id}`} className="hover:opacity-70 transition-opacity">{event.title}</Link>
          </h3>
          <div className="flex items-center gap-1.5 text-[11px] text-muted dark:text-dark-muted">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          <p className="text-[13px] text-secondary dark:text-dark-secondary line-clamp-2 leading-relaxed">{event.description}</p>
        </div>

        <div className="pt-4 border-t border-border dark:border-dark-border flex items-center justify-between">
          <div className="text-[11px] font-mono">
            <span className="text-muted dark:text-dark-muted">From </span>
            <span className="text-primary dark:text-dark-primary font-medium">{event.price}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/event/${event.id}`} className="w-8 h-8 flex items-center justify-center border border-border dark:border-dark-border text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-dark-primary hover:border-primary dark:hover:border-dark-primary transition-colors" aria-label={`View ${event.title}`}>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button onClick={() => openRegistrationModal(event)} className={`h-8 px-3.5 text-[11px] font-medium text-white transition-colors ${registered ? 'bg-green-700' : 'bg-primary dark:bg-dark-primary dark:text-dark-bg hover:opacity-80'}`}>
              {registered ? 'Pass' : 'RSVP'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
