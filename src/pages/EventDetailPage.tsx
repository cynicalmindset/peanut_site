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
  Compass,
  Ticket
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
      <div className="min-h-screen bg-[#F6F8FA] dark:bg-[#0D1117] text-[#1F2328] dark:text-white flex flex-col items-center justify-center p-6 text-center space-y-5 transition-colors">
        <span className="text-xs font-mono uppercase tracking-wider text-[#656D76] dark:text-[#8B949E]">ERROR 404 / GATHERING ARCHIVED</span>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#1F2328] dark:text-white">
          The requested gathering could not be located
        </h1>
        <p className="text-[#656D76] dark:text-[#8B949E] text-sm max-w-md mx-auto">
          The event reference "{id}" either expired from our active quarterly register or was archived.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1F2328] text-white dark:bg-white dark:text-black text-xs font-semibold hover:bg-[#2D333B] dark:hover:bg-white/90 transition-all shadow-md"
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
    <div className="min-h-screen bg-[#F6F8FA] dark:bg-[#0D1117] text-[#1F2328] dark:text-white pb-28 transition-colors w-full max-w-full overflow-x-hidden">
      
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="border-b border-[#D0D7DE] dark:border-[#30363D] bg-white/90 dark:bg-[#161B22]/90 backdrop-blur-md sticky top-16 z-30 transition-colors w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2 text-xs text-[#656D76] dark:text-[#8B949E] w-full min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-1 overflow-hidden">
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#F6F8FA] dark:bg-[#0D1117] border border-[#D0D7DE] dark:border-[#30363D] text-[#1F2328] dark:text-white hover:border-[#1F2328] dark:hover:border-white/60 transition-colors font-medium shrink-0 font-mono shadow-sm text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xs:inline">All Gatherings</span>
              <span className="xs:hidden">All</span>
            </Link>
            <span className="text-[#D0D7DE] dark:text-[#30363D] shrink-0">/</span>
            <span className="text-[#1F2328] dark:text-white/80 font-medium truncate min-w-0">{event.category}</span>
            <span className="text-[#D0D7DE] dark:text-[#30363D] hidden md:inline shrink-0">/</span>
            <span className="truncate hidden md:inline text-[#656D76] dark:text-[#8B949E]">{event.title}</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] text-[#1F2328] dark:text-[#C9D1D9] hover:border-[#1F2328] dark:hover:border-white/60 transition-colors shrink-0 shadow-sm font-medium text-xs"
            aria-label="Share gathering link"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#656D76] dark:text-white/70" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 w-full max-w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 w-full min-w-0">
          
          {/* Left Column: Big Image & Deep Dossier (8 cols) */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10 min-w-0 w-full max-w-full overflow-hidden">
            
            {/* Header Titles */}
            <div className="space-y-4 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-[#1F2328] dark:text-white text-xs font-semibold tracking-wide">
                  {event.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] text-xs font-medium text-[#656D76] dark:text-[#8B949E] shadow-sm">
                  {event.city}
                </span>
                {registered && (
                  <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Pass Reserved</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F2328] dark:text-white leading-[1.15] break-words">
                {event.title}
              </h1>

              <p className="text-base sm:text-xl text-[#656D76] dark:text-[#8B949E] font-normal leading-relaxed italic border-l-2 border-[#1F2328]/40 dark:border-white/40 pl-4 break-words">
                "{event.tagline}"
              </p>
            </div>

            {/* Immersive Event Hero Artwork with Ambient Backdrop */}
            <div className="relative w-full max-w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D0D7DE] dark:border-[#30363D] bg-black/5 dark:bg-black/60 shadow-xl flex items-center justify-center p-4 sm:p-8 min-h-[300px] sm:min-h-[460px]">
              {/* Blurred Ambient Backdrop Glow */}
              <div 
                className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 dark:opacity-40 scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${event.image})` }}
              />

              {/* Centered Poster Artwork Preserving Original Dimensions */}
              <img
                src={event.image}
                alt={event.title}
                className="relative z-10 max-h-[500px] w-auto max-w-full object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-black/10 dark:border-white/10"
              />

              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/80 text-white text-[10px] sm:text-[11px] font-mono backdrop-blur-md border border-white/10 shadow-md truncate max-w-[85%]">
                ATMOSPHERE ARCHIVE • {event.city}
              </div>
            </div>

            {/* Curator Dispatch Quote */}
            {event.curatorNote && (
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] space-y-2 shadow-sm transition-colors min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curator Dispatch</span>
                </div>
                <p className="text-base sm:text-lg text-[#1F2328] dark:text-[#C9D1D9] leading-relaxed italic break-words">
                  “{event.curatorNote}”
                </p>
                <div className="text-xs text-[#656D76] dark:text-[#8B949E] font-mono">
                  — Documented by {event.organizer}
                </div>
              </div>
            )}

            {/* Full Description */}
            <div className="space-y-4 text-base sm:text-lg text-[#1F2328] dark:text-[#C9D1D9] leading-relaxed font-sans min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F2328] dark:text-white border-b border-[#D0D7DE] dark:border-[#30363D] pb-3">
                Overview & Program Statement
              </h2>
              <div className="space-y-4 whitespace-pre-line text-[#656D76] dark:text-[#8B949E] text-base leading-relaxed break-words">
                {event.fullDescription}
              </div>
            </div>

            {/* Program Itinerary / Schedule */}
            {event.schedule && event.schedule.length > 0 && (
              <div className="space-y-4 pt-4 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1F2328] dark:text-white border-b border-[#D0D7DE] dark:border-[#30363D] pb-3 flex flex-wrap items-center justify-between gap-2">
                  <span>Assembly Timeline</span>
                  <span className="text-xs font-mono text-[#656D76] dark:text-[#8B949E]">
                    Subject to organic rhythm
                  </span>
                </h2>

                <div className="border border-[#D0D7DE] dark:border-[#30363D] bg-white dark:bg-[#161B22] divide-y divide-[#D0D7DE] dark:divide-[#30363D] rounded-2xl overflow-hidden shadow-sm transition-colors min-w-0">
                  {event.schedule.map((item, idx) => (
                    <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-w-0">
                      <div className="flex items-start gap-4 min-w-0 flex-1">
                        <span className="text-xs font-bold text-[#1F2328] dark:text-white/90 font-mono shrink-0 pt-0.5">
                          {item.time}
                        </span>
                        <div className="min-w-0 flex-1 break-words">
                          <div className="font-semibold text-[#1F2328] dark:text-white text-sm sm:text-base break-words">
                            {item.activity}
                          </div>
                          {item.speaker && (
                            <div className="text-xs text-[#656D76] dark:text-[#8B949E] mt-0.5 font-mono break-words">
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
            <div className="pt-4 border-t border-[#D0D7DE] dark:border-[#30363D] space-y-3 min-w-0">
              <span className="text-xs uppercase tracking-wider text-[#656D76] dark:text-[#8B949E] font-mono block">
                Thematic Classifiers
              </span>
              <div className="flex flex-wrap gap-2">
                {event.tags.map(t => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] text-xs font-medium text-[#1F2328] dark:text-[#C9D1D9] shadow-sm"
                  >
                    <Tag className="w-3 h-3 text-[#656D76] dark:text-[#8B949E]" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Admission Sidebar (4 cols) */}
          <div className="lg:col-span-4 min-w-0 w-full max-w-full">
            <div className="sticky top-32 space-y-6 w-full max-w-full">
              
              <div className="border border-[#D0D7DE] dark:border-[#30363D] bg-white dark:bg-[#161B22] p-5 sm:p-7 rounded-2xl shadow-xl space-y-6 transition-colors w-full max-w-full overflow-hidden">
                
                <div className="space-y-1 pb-5 border-b border-[#D0D7DE] dark:border-[#30363D]">
                  <span className="text-[10px] uppercase tracking-wider text-[#656D76] dark:text-[#8B949E] block font-mono font-semibold">
                    ADMISSION PASS
                  </span>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1 min-w-0">
                    <div className="min-w-0 flex-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#1F2328] dark:text-white font-mono break-words block">
                        {event.price.split('(')[0].trim()}
                      </span>
                      {event.price.includes('(') && (
                        <span className="block text-xs text-[#656D76] dark:text-[#8B949E] font-sans font-normal mt-0.5 break-words">
                          ({event.price.split('(')[1]}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-mono font-medium px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 shrink-0">
                      {event.spotsRemaining} spots left
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3 text-[#1F2328] dark:text-[#C9D1D9]">
                    <Calendar className="w-4 h-4 text-[#1F2328]/60 dark:text-white/60 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#1F2328] dark:text-white font-semibold">
                        {event.displayDate}
                      </strong>
                      <span className="text-[#656D76] dark:text-[#8B949E]">{event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-[#1F2328] dark:text-[#C9D1D9]">
                    <MapPin className="w-4 h-4 text-[#1F2328]/60 dark:text-white/60 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#1F2328] dark:text-white font-semibold">
                        {event.venue}
                      </strong>
                      <span className="text-[#656D76] dark:text-[#8B949E]">{event.address}, {event.city}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-[#1F2328] dark:text-[#C9D1D9]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#1F2328] dark:text-white font-semibold">
                        Capacity: {event.capacity} attendees
                      </strong>
                      <span className="text-[#656D76] dark:text-[#8B949E]">Curated by {event.organizer}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => openRegistrationModal(event)}
                    className={`w-full py-3.5 px-5 text-sm font-semibold rounded-full transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                      registered
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                        : 'bg-[#1F2328] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-[#F0F0F0] shadow-md hover:shadow-lg'
                    }`}
                  >
                    <Ticket className="w-4 h-4" />
                    <span>{registered ? 'View Reserved Pass' : 'Book Tickets'}</span>
                  </button>
                  <p className="text-[11px] text-center text-[#656D76] dark:text-[#8B949E] font-mono">
                    Instant local confirmation • No payment gateway required
                  </p>
                </div>

              </div>

              {/* Back to Browse */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] text-xs text-center shadow-sm transition-colors w-full max-w-full">
                <Link
                  to="/"
                  className="text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-white flex items-center justify-center gap-1.5 font-medium transition-colors"
                >
                  <Compass className="w-4 h-4 text-[#656D76] dark:text-white/60" />
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
