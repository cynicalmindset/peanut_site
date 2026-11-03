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
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">ERROR 404 / GATHERING MISSING</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          The requested gathering could not be located
        </h1>
        <p className="text-slate-600 dark:text-slate-400 font-sans max-w-md mx-auto text-sm">
          The event reference "{id}" either expired from our active quarterly register or was archived.
        </p>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-md shadow-blue-600/20"
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
      
      {/* Top Soft Breadcrumbs & Back Navigation */}
      <div className="border-b border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-atmosphere-cardDark/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 sm:gap-3 truncate">
            <Link 
              to="/" 
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:text-blue-600 transition-colors font-medium shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Directory</span>
            </Link>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-slate-600 dark:text-slate-300 font-medium shrink-0">{event.category}</span>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">/</span>
            <span className="truncate hidden sm:inline text-slate-400">{event.title}</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-400 transition-colors shadow-soft-sm shrink-0"
            aria-label="Share dossier link"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-medium">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-blue-500" />
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
                <span className="px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold tracking-wide shadow-sm">
                  {event.category}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
                  {event.city}
                </span>
                {registered && (
                  <span className="px-3.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-medium flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Pass Reserved</span>
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                {event.title}
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed italic border-l-2 border-blue-500 pl-4">
                "{event.tagline}"
              </p>
            </div>

            {/* Immersive Event Hero Photograph */}
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft-lg">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-medium backdrop-blur-md">
                ATMOSPHERE ARCHIVE • {event.city}
              </div>
            </div>

            {/* Curator Dispatch Quote */}
            {event.curatorNote && (
              <div className="p-6 rounded-3xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curator Dispatch</span>
                </div>
                <p className="font-serif text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed">
                  “{event.curatorNote}”
                </p>
                <div className="text-xs text-slate-400 font-medium">
                  — Documented by {event.organizer}
                </div>
              </div>
            )}

            {/* Full Description */}
            <div className="space-y-4 text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
              <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                Overview & Program Statement
              </h2>
              <div className="space-y-4 whitespace-pre-line text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                {event.fullDescription}
              </div>
            </div>

            {/* Program Itinerary / Schedule */}
            {event.schedule && event.schedule.length > 0 && (
              <div className="space-y-4 pt-4">
                <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                  <span>Assembly Timeline</span>
                  <span className="text-xs font-normal text-slate-400">
                    Subject to organic rhythm
                  </span>
                </h2>

                <div className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-atmosphere-cardDark divide-y divide-slate-100 dark:divide-slate-800 rounded-3xl overflow-hidden shadow-soft-sm">
                  {event.schedule.map((item, idx) => (
                    <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-start gap-4">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono shrink-0 pt-0.5">
                          {item.time}
                        </span>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white text-sm sm:text-base">
                            {item.activity}
                          </div>
                          {item.speaker && (
                            <div className="text-xs text-slate-400 mt-0.5">
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
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Thematic Classifiers
              </span>
              <div className="flex flex-wrap gap-2">
                {event.tags.map(t => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    <Tag className="w-3 h-3 text-blue-500" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Admission Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              <div className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-atmosphere-cardDark p-7 rounded-3xl shadow-soft space-y-6">
                
                <div className="space-y-1 pb-5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
                    ADMISSION TIER
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
                      {event.price}
                    </span>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {event.spotsRemaining} spots left
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                    <Calendar className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-semibold">
                        {event.displayDate}
                      </strong>
                      <span className="text-slate-400">{event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                    <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-semibold">
                        {event.venue}
                      </strong>
                      <span className="text-slate-400">{event.address}, {event.city}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-semibold">
                        Capacity: {event.capacity} attendees
                      </strong>
                      <span className="text-slate-400">Host: {event.organizer}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openRegistrationModal(event)}
                    className={`w-full py-3.5 px-4 text-xs uppercase tracking-wider font-semibold text-white rounded-full transition-all shadow-md active:scale-95 ${
                      registered
                        ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                        : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/25'
                    }`}
                  >
                    {registered ? 'View Confirmed Pass' : 'Reserve Admission Spot'}
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    Instant local confirmation • No payment gateway required
                  </p>
                </div>

              </div>

              {/* Back to Browse */}
              <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 text-xs text-center">
                <Link
                  to="/"
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 flex items-center justify-center gap-1.5 font-medium"
                >
                  <Compass className="w-4 h-4 text-blue-500" />
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
