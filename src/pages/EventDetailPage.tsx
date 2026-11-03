import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Share2, 
  Check, 
  CheckCircle2, 
  Sparkles, 
  Tag, 
  ShieldCheck,
  Compass
} from 'lucide-react';
import { EVENTS_DATA } from '../data/events';
import { useRegistration } from '../context/RegistrationContext';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { openRegistrationModal, isRegistered } = useRegistration();
  const [copiedShare, setCopiedShare] = useState(false);

  const event = EVENTS_DATA.find(e => e.id === id);
  const registered = event ? isRegistered(event.id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <span className="font-mono text-sm text-accent">ERROR 404 / DOSSIER MISSING</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white">
          The requested gathering could not be located
        </h1>
        <p className="text-ink-600 dark:text-neutral-400 font-sans max-w-md mx-auto">
          The event reference "{id}" either expired from our active quarterly ledger or was archived.
        </p>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink-900 dark:bg-white text-white dark:text-ink-900 font-mono text-xs uppercase tracking-wider rounded-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Discovery Index</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      
      {/* Top Editorial Breadcrumbs & Back Navigation */}
      <div className="border-b border-paper-300 dark:border-paper-borderDark bg-paper-200/40 dark:bg-paper-cardDark/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between font-mono text-xs text-ink-600 dark:text-neutral-400">
          <div className="flex items-center gap-2 sm:gap-3 truncate">
            <Link 
              to="/" 
              className="flex items-center gap-1.5 text-ink-900 dark:text-white hover:text-accent transition-colors font-medium shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Index</span>
            </Link>
            <span className="text-paper-400 dark:text-neutral-600">/</span>
            <span className="uppercase text-ink-500 dark:text-neutral-400 shrink-0">{event.category}</span>
            <span className="text-paper-400 dark:text-neutral-600 hidden sm:inline">/</span>
            <span className="truncate hidden sm:inline">{event.title}</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-paper-cardDark border border-paper-300 dark:border-paper-borderDark text-ink-800 dark:text-neutral-200 hover:border-ink-900 dark:hover:border-neutral-300 rounded-xs transition-colors shrink-0"
            aria-label="Share dossier link"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-accent" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Big Image & Deep Dossier (8 cols) */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            
            {/* Header Titles */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-accent text-white font-mono text-xs uppercase tracking-widest font-semibold rounded-xs">
                  {event.category}
                </span>
                <span className="px-3 py-1 bg-paper-200 dark:bg-paper-cardDark border border-paper-300 dark:border-paper-borderDark font-mono text-xs text-ink-700 dark:text-neutral-300 uppercase tracking-wider rounded-xs">
                  {event.city}
                </span>
                {registered && (
                  <span className="px-3 py-1 bg-emerald-600 text-white font-mono text-xs flex items-center gap-1 rounded-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>RSVP CONFIRMED</span>
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink-900 dark:text-white leading-[1.12]">
                {event.title}
              </h1>

              <p className="text-lg sm:text-xl text-ink-600 dark:text-neutral-300 font-normal leading-relaxed italic border-l-2 border-accent pl-4">
                "{event.tagline}"
              </p>
            </div>

            {/* Immersive Event Hero Photograph */}
            <div className="relative aspect-[16/9] overflow-hidden bg-ink-900 border border-paper-300 dark:border-paper-borderDark shadow-lg rounded-xs">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/75 text-white font-mono text-[10px] uppercase tracking-wider backdrop-blur-xs">
                ARCHIVE VISUAL • {event.city}
              </div>
            </div>

            {/* Curator Dispatch Quote */}
            {event.curatorNote && (
              <div className="p-6 bg-paper-200/60 dark:bg-paper-cardDark border-l-4 border-accent rounded-xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curator's Note & Context</span>
                </div>
                <p className="font-serif text-base sm:text-lg text-ink-900 dark:text-white leading-relaxed">
                  “{event.curatorNote}”
                </p>
                <div className="text-[11px] font-mono text-ink-500 dark:text-neutral-400">
                  — Documented by {event.organizer}
                </div>
              </div>
            )}

            {/* Full Editorial Description */}
            <div className="space-y-4 text-base sm:text-lg text-ink-800 dark:text-neutral-200 leading-relaxed font-sans">
              <h2 className="font-serif text-2xl font-bold text-ink-900 dark:text-white border-b border-paper-300 dark:border-paper-borderDark pb-2">
                Overview & Program Statement
              </h2>
              <div className="space-y-4 whitespace-pre-line text-ink-700 dark:text-neutral-300 text-base leading-relaxed">
                {event.fullDescription}
              </div>
            </div>

            {/* Program Itinerary / Schedule (if present) */}
            {event.schedule && event.schedule.length > 0 && (
              <div className="space-y-4 pt-4">
                <h2 className="font-serif text-2xl font-bold text-ink-900 dark:text-white border-b border-paper-300 dark:border-paper-borderDark pb-2 flex items-center justify-between">
                  <span>Assembly Timeline</span>
                  <span className="font-mono text-xs font-normal text-ink-500 dark:text-neutral-400">
                    Subject to organic flow
                  </span>
                </h2>

                <div className="border border-paper-300 dark:border-paper-borderDark bg-white dark:bg-paper-cardDark divide-y divide-paper-200 dark:divide-paper-borderDark rounded-xs">
                  {event.schedule.map((item, idx) => (
                    <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-sm font-bold text-accent shrink-0 pt-0.5">
                          {item.time}
                        </span>
                        <div>
                          <div className="font-medium text-ink-900 dark:text-white text-sm sm:text-base">
                            {item.activity}
                          </div>
                          {item.speaker && (
                            <div className="text-xs font-mono text-ink-500 dark:text-neutral-400 mt-0.5">
                              Led by: {item.speaker}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags / Keywords */}
            <div className="pt-4 border-t border-paper-300 dark:border-paper-borderDark space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-ink-500 dark:text-neutral-400 block">
                Thematic Classifiers
              </span>
              <div className="flex flex-wrap gap-2">
                {event.tags.map(t => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-paper-200 dark:bg-paper-cardDark text-xs font-mono text-ink-700 dark:text-neutral-300 border border-paper-300 dark:border-paper-borderDark rounded-xs"
                  >
                    <Tag className="w-3 h-3 text-accent" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Admission & Venue Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* Registration / Admission Card */}
              <div className="border border-paper-300 dark:border-paper-borderDark bg-white dark:bg-paper-cardDark p-6 rounded-xs shadow-md space-y-6">
                
                <div className="space-y-1 pb-4 border-b border-paper-200 dark:border-paper-borderDark">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-ink-400 dark:text-neutral-500 block">
                    ADMISSION TIER
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-3xl font-bold text-ink-900 dark:text-white">
                      {event.price}
                    </span>
                    <span className="font-mono text-xs text-accent font-semibold">
                      {event.spotsRemaining} spots remaining
                    </span>
                  </div>
                </div>

                {/* Event Logistics Checklist */}
                <div className="space-y-3.5 font-mono text-xs">
                  <div className="flex items-start gap-3 text-ink-700 dark:text-neutral-300">
                    <Calendar className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-ink-900 dark:text-white font-semibold">
                        {event.displayDate}
                      </strong>
                      <span className="text-ink-500 dark:text-neutral-400">{event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-ink-700 dark:text-neutral-300">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-ink-900 dark:text-white font-semibold">
                        {event.venue}
                      </strong>
                      <span className="text-ink-500 dark:text-neutral-400">{event.address}, {event.city}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-ink-700 dark:text-neutral-300">
                    <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-ink-900 dark:text-white font-semibold">
                        Capacity: {event.capacity} total attendees
                      </strong>
                      <span className="text-ink-500 dark:text-neutral-400">Host: {event.organizer}</span>
                    </div>
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={() => openRegistrationModal(event)}
                    className={`w-full py-3.5 px-4 font-mono text-xs uppercase tracking-widest font-semibold text-white rounded-xs transition-all shadow-md active:scale-98 ${
                      registered
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-accent hover:bg-accent-hover'
                    }`}
                  >
                    {registered ? 'View Your Confirmed Pass' : 'Reserve Admission Spot'}
                  </button>
                  <p className="text-[11px] font-mono text-center text-ink-400 dark:text-neutral-500 mt-2">
                    Instant local confirmation • No payment gateway required
                  </p>
                </div>

              </div>

              {/* Back to Browse */}
              <div className="p-4 border border-paper-300 dark:border-paper-borderDark bg-paper-100 dark:bg-paper-dark rounded-xs font-mono text-xs text-center">
                <Link
                  to="/"
                  className="text-ink-800 dark:text-neutral-200 hover:text-accent flex items-center justify-center gap-1.5 font-semibold"
                >
                  <Compass className="w-4 h-4 text-accent" />
                  <span>Browse More Gatherings in {event.city}</span>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
