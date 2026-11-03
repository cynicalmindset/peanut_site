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
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={closePassesDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-atmosphere-cardDark border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Ticket className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  My Active Passes
                </h2>
                <span className="text-xs text-slate-400">
                  {registrations.length} registered {registrations.length === 1 ? 'gathering' : 'gatherings'}
                </span>
              </div>
            </div>

            <button
              onClick={closePassesDrawer}
              className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {registrations.length === 0 ? (
              <div className="py-16 text-center space-y-3 text-xs text-slate-400">
                <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl">
                  🎟️
                </div>
                <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">No active passes yet</p>
                <p className="text-xs leading-relaxed max-w-xs mx-auto">
                  Browse the curated index on the homepage and reserve your admission to any upcoming gathering.
                </p>
                <div className="pt-2">
                  <button
                    onClick={closePassesDrawer}
                    className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-md shadow-blue-600/20"
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
                    className="border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl shadow-soft-sm space-y-3 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-3">
                      <div>
                        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold tracking-wider font-mono">
                          REF: {reg.referenceCode}
                        </span>
                        <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white mt-0.5 line-clamp-2">
                          <Link 
                            to={`/event/${reg.eventId}`} 
                            onClick={closePassesDrawer}
                            className="hover:text-blue-600 hover:underline"
                          >
                            {reg.eventTitle}
                          </Link>
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-blue-100/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px] font-medium shrink-0">
                        {reg.ticketCount} {reg.ticketCount === 1 ? 'Pass' : 'Passes'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-slate-600 dark:text-slate-400 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        <span>{reg.eventDate} ({reg.eventTime})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" />
                        <span>{reg.eventVenue}, {reg.eventCity}</span>
                      </div>
                      <div className="text-slate-800 dark:text-slate-200 pt-1">
                        Holder: <strong>{reg.fullName}</strong>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                      <button
                        onClick={() => downloadCalendarFile(reg)}
                        className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium"
                      >
                        <Download className="w-3.5 h-3.5 text-blue-500" />
                        <span>Download .ics</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Release pass for "${reg.eventTitle}"?`)) {
                            cancelRegistration(reg.id);
                          }
                        }}
                        className="flex items-center gap-1 text-rose-500 hover:underline font-medium"
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
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs text-slate-400">
            <div className="flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
              <span>Persisted locally in your browser. Clear browser storage to reset records.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
