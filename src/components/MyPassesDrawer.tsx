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
      'PRODID:-//K Explore//Event Index//EN',
      'BEGIN:VEVENT',
      `UID:${record.referenceCode}@kexplore.local`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:${record.eventTitle}`,
      `DESCRIPTION:K Explore Dossier Reference: ${record.referenceCode}. Attendee: ${record.fullName}`,
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
        className="fixed inset-0 bg-ink-900/60 backdrop-blur-xs transition-opacity"
        onClick={closePassesDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-paper-100 dark:bg-paper-dark border-l border-paper-300 dark:border-paper-borderDark shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-paper-300 dark:border-paper-borderDark bg-white dark:bg-paper-cardDark flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-accent" />
              <div>
                <h2 className="font-serif text-xl font-bold text-ink-900 dark:text-white">
                  My Active Passes
                </h2>
                <span className="font-mono text-xs text-ink-500 dark:text-neutral-400">
                  {registrations.length} registered {registrations.length === 1 ? 'gathering' : 'gatherings'}
                </span>
              </div>
            </div>

            <button
              onClick={closePassesDrawer}
              className="p-1.5 text-ink-500 hover:text-ink-900 dark:text-neutral-400 dark:hover:text-white"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {registrations.length === 0 ? (
              <div className="py-16 text-center space-y-3 font-mono text-xs text-ink-500 dark:text-neutral-400">
                <div className="w-12 h-12 mx-auto rounded-full bg-paper-200 dark:bg-paper-cardDark flex items-center justify-center text-lg">
                  🎟️
                </div>
                <p className="font-semibold text-ink-800 dark:text-neutral-200">No active passes issued yet</p>
                <p className="text-[11px] leading-relaxed max-w-xs mx-auto">
                  Browse the curated index on the homepage and reserve your admission to any upcoming session.
                </p>
                <div className="pt-2">
                  <button
                    onClick={closePassesDrawer}
                    className="px-4 py-2 bg-accent text-white text-xs font-mono uppercase tracking-wider rounded-xs"
                  >
                    Explore Events
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {registrations.map(reg => (
                  <div
                    key={reg.id}
                    className="border border-paper-300 dark:border-paper-borderDark bg-white dark:bg-paper-cardDark p-4 rounded-xs shadow-xs space-y-3 font-mono text-xs"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-paper-200 dark:border-paper-borderDark pb-2.5">
                      <div>
                        <span className="text-[10px] text-accent font-bold tracking-wider">
                          REF: {reg.referenceCode}
                        </span>
                        <h3 className="font-serif text-base font-bold text-ink-900 dark:text-white font-sans mt-0.5 line-clamp-2">
                          <Link 
                            to={`/event/${reg.eventId}`} 
                            onClick={closePassesDrawer}
                            className="hover:text-accent hover:underline"
                          >
                            {reg.eventTitle}
                          </Link>
                        </h3>
                      </div>
                      <span className="px-2 py-0.5 bg-paper-200 dark:bg-paper-dark text-[10px] uppercase rounded-xs shrink-0">
                        {reg.ticketCount} {reg.ticketCount === 1 ? 'Pass' : 'Passes'}
                      </span>
                    </div>

                    <div className="space-y-1 text-ink-600 dark:text-neutral-400 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        <span>{reg.eventDate} ({reg.eventTime})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        <span>{reg.eventVenue}, {reg.eventCity}</span>
                      </div>
                      <div className="text-ink-800 dark:text-neutral-200 pt-1">
                        Holder: <strong>{reg.fullName}</strong> ({reg.email})
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-paper-200 dark:border-paper-borderDark flex items-center justify-between text-xs">
                      <button
                        onClick={() => downloadCalendarFile(reg)}
                        className="flex items-center gap-1 text-ink-700 dark:text-neutral-300 hover:text-accent font-mono text-[11px]"
                      >
                        <Download className="w-3 h-3 text-accent" />
                        <span>Download .ics</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Release your registration for "${reg.eventTitle}"?`)) {
                            cancelRegistration(reg.id);
                          }
                        }}
                        className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:underline font-mono text-[11px]"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Cancel Pass</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer Notice */}
          <div className="p-4 border-t border-paper-300 dark:border-paper-borderDark bg-paper-200/50 dark:bg-paper-cardDark text-[11px] font-mono text-ink-500 dark:text-neutral-400">
            <div className="flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <span>Persisted locally in your browser cache. Clear your site data to purge all records.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
