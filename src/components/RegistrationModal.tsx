import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, CheckCircle2, Ticket, AlertCircle, Loader2, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRegistration } from '../context/RegistrationContext';
import { RegistrationRecord } from '../types/event';

export const RegistrationModal: React.FC = () => {
  const { 
    activeModalEvent, 
    closeRegistrationModal, 
    addRegistration,
    getRegistrationForEvent,
    openPassesDrawer
  } = useRegistration();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const [notes, setNotes] = useState('');

  // Validation & UI State
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedRecord, setConfirmedRecord] = useState<RegistrationRecord | null>(null);

  const existingRecord = activeModalEvent ? getRegistrationForEvent(activeModalEvent.id) : undefined;

  useEffect(() => {
    if (activeModalEvent) {
      if (existingRecord) {
        setConfirmedRecord(existingRecord);
      } else {
        setConfirmedRecord(null);
        setErrors({});
      }
    }
  }, [activeModalEvent, existingRecord]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalEvent) {
        closeRegistrationModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalEvent, closeRegistrationModal]);

  if (!activeModalEvent) return null;

  const validateForm = () => {
    const newErrors: { fullName?: string; email?: string; phone?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full legal or preferred name is required.';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required for ticket delivery.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required for door guestlist check.';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Enter a valid 10 to 15 digit telephone number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 400));

      const record = await addRegistration({
        eventId: activeModalEvent.id,
        eventTitle: activeModalEvent.title,
        eventCategory: activeModalEvent.category,
        eventDate: activeModalEvent.displayDate,
        eventTime: activeModalEvent.time,
        eventVenue: activeModalEvent.venue,
        eventCity: activeModalEvent.city,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        ticketCount,
        notes: notes.trim() || undefined,
      });

      setConfirmedRecord(record);

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#3B82F6', '#60A5FA', '#93C5FD']
      });

    } catch (err) {
      console.error('Registration failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadCalendarFile = (record: RegistrationRecord) => {
    const calendarData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//atmosphere//Event Discovery//EN',
      'BEGIN:VEVENT',
      `UID:${record.referenceCode}@atmosphere.local`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:${record.eventTitle}`,
      `DESCRIPTION:atmosphere Pass Reference: ${record.referenceCode}. Attendee: ${record.fullName} (${record.ticketCount} pass)`,
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-atmosphere-cardDark border border-slate-200/80 dark:border-slate-800 shadow-2xl rounded-3xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
            <Ticket className="w-4 h-4" />
            <span className="uppercase tracking-wider font-semibold">
              {confirmedRecord ? 'REGISTRATION CONFIRMED' : 'RESERVE ADMISSION SPOT'}
            </span>
          </div>

          <button
            onClick={closeRegistrationModal}
            className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Event Context Banner */}
        <div className="p-6 sm:p-8 bg-slate-50/70 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <img
              src={activeModalEvent.image}
              alt={activeModalEvent.title}
              className="w-full sm:w-28 h-20 sm:h-20 object-cover rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0 shadow-soft-sm"
            />
            <div className="space-y-1">
              <span className="inline-block px-3 py-0.5 rounded-full bg-blue-100/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-medium">
                {activeModalEvent.category} • {activeModalEvent.city}
              </span>
              <h2 id="modal-headline" className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {activeModalEvent.title}
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  {activeModalEvent.displayDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  {activeModalEvent.venue}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body: Success Ticket or Form */}
        {confirmedRecord ? (
          /* Confirmation Success State */
          <div className="p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-sm">
                <strong className="font-semibold block text-xs uppercase tracking-wide">Pass Reserved Successfully</strong>
                Your entry pass is preserved locally in your browser cache. Present this reference at the gathering.
              </div>
            </div>

            {/* Ticket Pass Specimen Card */}
            <div className="relative border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-atmosphere-cardDark dark:to-slate-900 p-6 rounded-3xl space-y-4 shadow-soft">
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">PASS REFERENCE</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400 tracking-wide font-mono">
                    {confirmedRecord.referenceCode}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">ADMISSION</span>
                  <span className="text-slate-900 dark:text-white font-semibold text-xs">General Entry × {confirmedRecord.ticketCount}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[11px] text-slate-400 block">Attendee</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{confirmedRecord.fullName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Contact Email</span>
                  <span className="text-slate-700 dark:text-slate-300 truncate block">{confirmedRecord.email}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Date & Time</span>
                  <span className="text-slate-900 dark:text-white">{confirmedRecord.eventDate} ({confirmedRecord.eventTime})</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Venue / City</span>
                  <span className="text-slate-900 dark:text-white">{confirmedRecord.eventVenue}, {confirmedRecord.eventCity}</span>
                </div>
              </div>

              {/* Barcode Graphic Pattern */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center space-y-1.5 opacity-70">
                <div className="flex gap-1 h-8 items-stretch">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`bg-slate-800 dark:bg-slate-300 rounded-full ${i % 3 === 0 ? 'w-1' : i % 5 === 0 ? 'w-1.5' : 'w-0.5'}`} 
                    />
                  ))}
                </div>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase">
                  VERIFIED LOCAL PASS • ATMOSPHERE
                </span>
              </div>
            </div>

            {/* Local Storage Notice */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                Local Storage Notice:
              </span>
              <p>
                Your pass is saved locally in your browser (Local Storage) for itinerary tracking. 
                No personal data was transmitted to third-party tracking servers.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => downloadCalendarFile(confirmedRecord)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-slate-400 transition-colors shadow-soft-sm"
              >
                <Download className="w-3.5 h-3.5 text-blue-500" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    closeRegistrationModal();
                    openPassesDrawer();
                  }}
                  className="px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-medium hover:bg-slate-200 transition-colors"
                >
                  View All Passes
                </button>

                <button
                  onClick={closeRegistrationModal}
                  className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-md shadow-blue-600/20"
                >
                  Done
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Interactive Form */
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-5">
            
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label 
                htmlFor="reg-fullname" 
                className="block text-xs uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300"
              >
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="reg-fullname"
                type="text"
                value={fullName}
                onChange={e => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors(prev => ({ ...prev, fullName: undefined }));
                }}
                placeholder="e.g. Maya Shankar"
                className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white rounded-2xl focus:outline-none focus:ring-2 ${
                  errors.fullName 
                    ? 'border-rose-400 focus:ring-rose-400/20' 
                    : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
                aria-required="true"
              />
              {errors.fullName && (
                <p className="flex items-center gap-1 text-xs text-rose-500 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label 
                htmlFor="reg-email" 
                className="block text-xs uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300"
              >
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                }}
                placeholder="maya@example.com"
                className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white rounded-2xl focus:outline-none focus:ring-2 ${
                  errors.email 
                    ? 'border-rose-400 focus:ring-rose-400/20' 
                    : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
                aria-required="true"
              />
              {errors.email && (
                <p className="flex items-center gap-1 text-xs text-rose-500 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone & Ticket Count in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label 
                  htmlFor="reg-phone" 
                  className="block text-xs uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300"
                >
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="reg-phone"
                  type="tel"
                  value={phone}
                  onChange={e => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="+91 98765 43210"
                  className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white rounded-2xl focus:outline-none focus:ring-2 ${
                    errors.phone 
                      ? 'border-rose-400 focus:ring-rose-400/20' 
                    : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                  aria-required="true"
                />
                {errors.phone && (
                  <p className="flex items-center gap-1 text-xs text-rose-500 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label 
                  htmlFor="reg-tickets" 
                  className="block text-xs uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300"
                >
                  Number of Passes
                </label>
                <select
                  id="reg-tickets"
                  value={ticketCount}
                  onChange={e => setTicketCount(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value={1}>1 Pass (Solo Attendee)</option>
                  <option value={2}>2 Passes (Pair)</option>
                  <option value={3}>3 Passes</option>
                  <option value={4}>4 Passes (Small Group)</option>
                </select>
              </div>

            </div>

            {/* Optional Notes */}
            <div className="space-y-1.5">
              <label 
                htmlFor="reg-notes" 
                className="block text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                Special Requirements or Notes <span className="lowercase font-normal text-[11px]">(optional)</span>
              </label>
              <textarea
                id="reg-notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={2}
                placeholder="Accessibility needs, dietary preferences, or sound sensitivity notes..."
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Transparent Local Storage Disclaimer */}
            <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>
                <strong>Client-Side Only:</strong> No external server communication. Passes are 
                stored exclusively in your browser's local storage for your personal itinerary.
              </span>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={closeRegistrationModal}
                disabled={isSubmitting}
                className="px-5 py-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white text-xs font-semibold tracking-wide shadow-md shadow-blue-600/25 transition-all active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Reserving Spot...</span>
                  </>
                ) : (
                  <span>Confirm Reservation</span>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
