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

  // Check if already registered
  const existingRecord = activeModalEvent ? getRegistrationForEvent(activeModalEvent.id) : undefined;

  useEffect(() => {
    // Reset state on event change
    if (activeModalEvent) {
      if (existingRecord) {
        setConfirmedRecord(existingRecord);
      } else {
        setConfirmedRecord(null);
        setErrors({});
      }
    }
  }, [activeModalEvent, existingRecord]);

  // Handle escape key
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

  // Validation function
  const validateForm = () => {
    const newErrors: { fullName?: string; email?: string; phone?: string } = {};

    // Name validation
    if (!fullName.trim()) {
      newErrors.fullName = 'Full legal or preferred name is required.';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter at least 2 characters.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required for ticket delivery.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    // Phone validation
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
      // Simulate 400ms network processing to show disabled submit state and prevent double submission
      await new Promise(resolve => setTimeout(resolve, 450));

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

      // Fire festive confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#E83D1B', '#121316', '#C49746']
      });

    } catch (err) {
      console.error('Registration failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to generate a calendar file download (.ics)
  const downloadCalendarFile = (record: RegistrationRecord) => {
    const calendarData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//K Explore//Event Index//EN',
      'BEGIN:VEVENT',
      `UID:${record.referenceCode}@kexplore.local`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:${record.eventTitle}`,
      `DESCRIPTION:K Explore Dossier Reference: ${record.referenceCode}. Attendee: ${record.fullName} (${record.ticketCount} pass)`,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink-900/80 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div 
        className="relative w-full max-w-2xl bg-paper-100 dark:bg-paper-dark border border-paper-300 dark:border-paper-borderDark shadow-2xl rounded-xs overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-paper-300 dark:border-paper-borderDark bg-paper-200/50 dark:bg-paper-cardDark">
          <div className="flex items-center gap-2 font-mono text-xs text-ink-600 dark:text-neutral-400">
            <Ticket className="w-4 h-4 text-accent" />
            <span className="uppercase tracking-wider font-semibold">
              {confirmedRecord ? 'REGISTRATION CONFIRMED' : 'RESERVE ADMISSION PASS'}
            </span>
          </div>

          <button
            onClick={closeRegistrationModal}
            className="p-1 text-ink-500 hover:text-ink-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Event Context Banner */}
        <div className="p-6 bg-white dark:bg-paper-cardDark border-b border-paper-300 dark:border-paper-borderDark">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <img
              src={activeModalEvent.image}
              alt={activeModalEvent.title}
              className="w-full sm:w-28 h-20 sm:h-20 object-cover rounded-xs border border-paper-300 dark:border-paper-borderDark shrink-0"
            />
            <div className="space-y-1">
              <span className="inline-block px-2 py-0.5 bg-paper-200 dark:bg-paper-dark text-ink-700 dark:text-neutral-300 font-mono text-[10px] uppercase tracking-wider rounded-xs font-semibold">
                {activeModalEvent.category} • {activeModalEvent.city}
              </span>
              <h2 id="modal-headline" className="font-serif text-lg sm:text-xl font-bold text-ink-900 dark:text-white leading-snug">
                {activeModalEvent.title}
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-500 dark:text-neutral-400 pt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  {activeModalEvent.displayDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
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
            
            <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-xs text-emerald-800 dark:text-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-sm">
                <strong className="font-semibold block font-mono uppercase text-xs">Pass Registered Successfully</strong>
                Your entry has been saved to your local browser passes. Present this pass or reference code at the door.
              </div>
            </div>

            {/* Ticket Pass Specimen Card */}
            <div className="relative border-2 border-dashed border-paper-300 dark:border-paper-borderDark bg-white dark:bg-paper-cardDark p-6 rounded-xs font-mono text-xs space-y-4 shadow-sm">
              <div className="flex justify-between items-start border-b border-paper-200 dark:border-paper-borderDark pb-4">
                <div>
                  <span className="text-[10px] text-ink-400 uppercase tracking-widest block">PASS REF NUMBER</span>
                  <span className="text-base sm:text-lg font-bold text-accent tracking-wider">
                    {confirmedRecord.referenceCode}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-ink-400 uppercase tracking-widest block">ADMISSION TIER</span>
                  <span className="text-ink-900 dark:text-white font-semibold">General Entry × {confirmedRecord.ticketCount}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-ink-400 uppercase tracking-wider block">Attendee Name</span>
                  <span className="text-sm font-semibold text-ink-900 dark:text-white font-sans">{confirmedRecord.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-400 uppercase tracking-wider block">Contact Email</span>
                  <span className="text-sm text-ink-800 dark:text-neutral-200 truncate block">{confirmedRecord.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-400 uppercase tracking-wider block">Date & Time</span>
                  <span className="text-xs text-ink-900 dark:text-white">{confirmedRecord.eventDate} ({confirmedRecord.eventTime})</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-400 uppercase tracking-wider block">Location / City</span>
                  <span className="text-xs text-ink-900 dark:text-white">{confirmedRecord.eventCity}</span>
                </div>
              </div>

              {/* Barcode Graphic Pattern Mockup */}
              <div className="pt-3 border-t border-paper-200 dark:border-paper-borderDark flex flex-col items-center justify-center space-y-1.5 opacity-80">
                <div className="flex gap-1 h-8 items-stretch">
                  {Array.from({ length: 42 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`bg-ink-900 dark:bg-neutral-300 ${i % 3 === 0 ? 'w-1' : i % 5 === 0 ? 'w-1.5' : 'w-0.5'}`} 
                    />
                  ))}
                </div>
                <span className="text-[10px] tracking-widest text-ink-400 dark:text-neutral-500 uppercase">
                  VERIFIED LOCAL TICKET SPECIMEN • K EXPLORE
                </span>
              </div>
            </div>

            {/* Local Storage Disclaimer per Prompt instructions */}
            <div className="p-3.5 bg-paper-200/50 dark:bg-paper-dark border border-paper-300 dark:border-paper-borderDark text-[11px] font-mono text-ink-600 dark:text-neutral-400 rounded-xs space-y-1">
              <span className="font-semibold uppercase text-ink-800 dark:text-neutral-200 block">
                Local Storage Notice:
              </span>
              <p>
                This pass is stored purely on your device's browser (Local Storage) for itinerary planning. 
                Because no external server is connected, no data has been transmitted across the internet.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => downloadCalendarFile(confirmedRecord)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-paper-cardDark border border-paper-300 dark:border-paper-borderDark text-xs font-mono uppercase tracking-wider text-ink-900 dark:text-white hover:border-ink-900 dark:hover:border-white transition-colors rounded-xs shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-accent" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    closeRegistrationModal();
                    openPassesDrawer();
                  }}
                  className="px-4 py-2.5 bg-paper-200 dark:bg-paper-borderDark text-ink-900 dark:text-white text-xs font-mono uppercase tracking-wider hover:bg-paper-300 transition-colors rounded-xs"
                >
                  View All Passes
                </button>

                <button
                  onClick={closeRegistrationModal}
                  className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-mono uppercase tracking-widest font-semibold transition-colors rounded-xs shadow-sm"
                >
                  Finished
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
                className="block font-mono text-xs uppercase tracking-wider font-semibold text-ink-800 dark:text-neutral-200"
              >
                Full Name <span className="text-accent">*</span>
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
                className={`w-full px-3.5 py-2.5 bg-white dark:bg-paper-cardDark border text-sm text-ink-900 dark:text-white rounded-xs focus:outline-none focus:ring-1 ${
                  errors.fullName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-paper-300 dark:border-paper-borderDark focus:ring-accent focus:border-accent'
                }`}
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "name-error" : undefined}
              />
              {errors.fullName && (
                <p id="name-error" className="flex items-center gap-1 font-mono text-xs text-red-600 dark:text-red-400 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label 
                htmlFor="reg-email" 
                className="block font-mono text-xs uppercase tracking-wider font-semibold text-ink-800 dark:text-neutral-200"
              >
                Email Address <span className="text-accent">*</span>
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
                className={`w-full px-3.5 py-2.5 bg-white dark:bg-paper-cardDark border text-sm text-ink-900 dark:text-white rounded-xs focus:outline-none focus:ring-1 ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-paper-300 dark:border-paper-borderDark focus:ring-accent focus:border-accent'
                }`}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="flex items-center gap-1 font-mono text-xs text-red-600 dark:text-red-400 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone & Ticket Count in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Phone Field */}
              <div className="space-y-1.5">
                <label 
                  htmlFor="reg-phone" 
                  className="block font-mono text-xs uppercase tracking-wider font-semibold text-ink-800 dark:text-neutral-200"
                >
                  Phone Number <span className="text-accent">*</span>
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
                  className={`w-full px-3.5 py-2.5 bg-white dark:bg-paper-cardDark border text-sm text-ink-900 dark:text-white rounded-xs focus:outline-none focus:ring-1 ${
                    errors.phone 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-paper-300 dark:border-paper-borderDark focus:ring-accent focus:border-accent'
                  }`}
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="flex items-center gap-1 font-mono text-xs text-red-600 dark:text-red-400 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Number of Passes */}
              <div className="space-y-1.5">
                <label 
                  htmlFor="reg-tickets" 
                  className="block font-mono text-xs uppercase tracking-wider font-semibold text-ink-800 dark:text-neutral-200"
                >
                  Number of Passes
                </label>
                <select
                  id="reg-tickets"
                  value={ticketCount}
                  onChange={e => setTicketCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-paper-cardDark border border-paper-300 dark:border-paper-borderDark text-sm text-ink-900 dark:text-white rounded-xs focus:outline-none focus:ring-accent font-mono text-xs"
                >
                  <option value={1}>1 Pass (Single Attendee)</option>
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
                className="block font-mono text-xs uppercase tracking-wider text-ink-600 dark:text-neutral-400"
              >
                Special Requirements or Notes <span className="text-[10px] lowercase font-normal">(optional)</span>
              </label>
              <textarea
                id="reg-notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={2}
                placeholder="Accessibility needs, dietary preferences, or sound sensitivity notes..."
                className="w-full px-3.5 py-2 bg-white dark:bg-paper-cardDark border border-paper-300 dark:border-paper-borderDark text-sm text-ink-900 dark:text-white rounded-xs focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            {/* Transparent Local Storage Disclaimer */}
            <div className="p-3 bg-paper-200/60 dark:bg-paper-cardDark text-[11px] font-mono text-ink-600 dark:text-neutral-400 rounded-xs flex items-start gap-2 border border-paper-300 dark:border-paper-borderDark">
              <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>
                <strong>Client-Side Storage:</strong> No server transmission takes place. Registrations 
                are saved directly to your browser's local storage for your personal discovery record.
              </span>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-paper-200 dark:border-paper-borderDark">
              <button
                type="button"
                onClick={closeRegistrationModal}
                disabled={isSubmitting}
                className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-ink-600 dark:text-neutral-400 hover:text-ink-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent-hover disabled:bg-neutral-400 text-white font-mono text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md transition-all active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Issuing Pass...</span>
                  </>
                ) : (
                  <span>Confirm Registration</span>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
