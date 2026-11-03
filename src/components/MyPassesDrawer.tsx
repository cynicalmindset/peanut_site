import React from 'react';
import { X, Ticket, Calendar, MapPin, Trash2, Download, AlertCircle } from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';
import { RegistrationRecord } from '../types/event';
import { Link } from 'react-router-dom';

export const MyPassesDrawer: React.FC = () => {
  const { 
    isPassesDrawerOpen, 
    closePassesDrawer, 
    registrations, 
    cancelRegistration 
  } = useRegistration();

  if (!isPassesDrawerOpen) return null;

  const downloadCalendarFile = (record: RegistrationRecord) => {
    const calendarData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//atmosphere//Event Discovery//EN',
      'BEGIN:VEVENT',
      `UID:${record.referenceCode}@atmosphere.local`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:${record.eventTitle}`,
      `DESCRIPTION:atmosphere Pass Reference: ${record.referenceCode}. Attendee: ${record.fullName}`,
      `LOCATION:${record.eventVenue}, ${record.eventCity}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([calendarData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${record.referenceCode}-invite.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={closePassesDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#0D1117] border-l border-[#D0D7DE] dark:border-[#30363D] shadow-2xl flex flex-col text-[#1F2328] dark:text-white transition-colors">
          
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA] dark:bg-[#161B22] flex items-center justify-between transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-[#1F2328] dark:text-white flex items-center justify-center">
                <Ticket className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1F2328] dark:text-white">
                  My Active Passes
                </h2>
                <span className="text-xs text-[#656D76] dark:text-[#8B949E] font-mono">
                  {registrations.length} registered {registrations.length === 1 ? 'gathering' : 'gatherings'}
                </span>
              </div>
            </div>

            <button
              onClick={closePassesDrawer}
              className="p-1.5 text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-white rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {registrations.length === 0 ? (
              <div className="py-20 text-center space-y-3.5 text-xs text-[#656D76] dark:text-[#8B949E]">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#F6F8FA] dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] flex items-center justify-center text-2xl shadow-inner">
                  🎟️
                </div>
                <p className="font-bold text-[#1F2328] dark:text-white text-base">No active passes yet</p>
                <p className="text-xs text-[#656D76] dark:text-[#8B949E] leading-relaxed max-w-xs mx-auto">
                  Browse the curated index on the homepage and reserve your admission to any upcoming gathering.
                </p>
                <div className="pt-3">
                  <button
                    onClick={closePassesDrawer}
                    className="px-6 py-2.5 rounded-full bg-[#1F2328] hover:bg-[#2D333B] text-white dark:bg-white dark:text-black dark:hover:bg-white/90 text-xs font-semibold shadow-md transition-all active:scale-95"
                  >
                    Explore Gatherings
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {registrations.map(reg => (
                  <div
                    key={reg.id}
                    className="border border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA] dark:bg-[#161B22] p-4 sm:p-5 rounded-2xl shadow-sm space-y-3 text-xs hover:border-[#1F2328]/30 dark:hover:border-white/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-[#D0D7DE] dark:border-[#30363D] pb-3">
                      <div>
                        <span className="text-[10px] text-[#1F2328] dark:text-white/90 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 px-2 py-0.5 rounded font-bold tracking-wider font-mono">
                          REF: {reg.referenceCode}
                        </span>
                        <h3 className="text-sm font-bold text-[#1F2328] dark:text-white mt-1.5 line-clamp-2">
                          <Link 
                            to={`/event/${reg.eventId}`} 
                            onClick={closePassesDrawer}
                            className="hover:underline"
                          >
                            {reg.eventTitle}
                          </Link>
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 text-[11px] font-medium shrink-0">
                        {reg.ticketCount} {reg.ticketCount === 1 ? 'Pass' : 'Passes'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[#656D76] dark:text-[#8B949E] text-xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#1F2328]/60 dark:text-white/60" />
                        <span>{reg.eventDate} ({reg.eventTime})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#1F2328]/60 dark:text-white/60" />
                        <span>{reg.eventVenue}, {reg.eventCity}</span>
                      </div>
                      <div className="text-[#1F2328] dark:text-white/90 pt-1">
                        Holder: <strong className="text-[#1F2328] dark:text-white">{reg.fullName}</strong>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2.5 border-t border-[#D0D7DE] dark:border-[#30363D] flex items-center justify-between text-xs">
                      <button
                        onClick={() => downloadCalendarFile(reg)}
                        className="flex items-center gap-1.5 text-[#1F2328]/80 dark:text-white/80 hover:text-[#1F2328] dark:hover:text-white font-medium"
                      >
                        <Download className="w-3.5 h-3.5 text-[#656D76] dark:text-white/70" />
                        <span>Download .ics</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Release pass for "${reg.eventTitle}"?`)) {
                            cancelRegistration(reg.id);
                          }
                        }}
                        className="flex items-center gap-1 text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel Pass</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer Notice */}
          <div className="p-4 border-t border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA] dark:bg-[#161B22] text-xs text-[#656D76] dark:text-[#8B949E] transition-colors">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-[#656D76] dark:text-white/60 shrink-0 mt-0.5" />
              <span>Persisted locally in your browser cache. Clear browser storage to reset records.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
