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
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#FFFFFF', '#38BDF8', '#818CF8']
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-[#0D1117] border border-[#D0D7DE] dark:border-[#30363D] shadow-2xl rounded-2xl overflow-hidden my-8 ring-1 ring-black/5 dark:ring-white/10 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA] dark:bg-[#161B22] transition-colors">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider">
            <Ticket className="w-4 h-4 text-[#1F2328] dark:text-white" />
            <span className="uppercase font-semibold text-[#1F2328] dark:text-white">
              {confirmedRecord ? 'Booking Confirmed' : 'Book Tickets · Admission Pass'}
            </span>
          </div>

          <button
            onClick={closeRegistrationModal}
            className="p-1.5 text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-white rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Event Context Banner */}
        <div className="p-5 sm:p-6 bg-[#F6F8FA]/60 dark:bg-[#161B22]/60 border-b border-[#D0D7DE] dark:border-[#30363D] transition-colors">
          <div className="flex gap-4 items-center">
            <img
              src={activeModalEvent.image}
              alt={activeModalEvent.title}
              className="w-20 sm:w-24 h-20 sm:h-24 object-cover rounded-xl border border-[#D0D7DE] dark:border-[#30363D] shrink-0 shadow-md bg-white dark:bg-[#0D1117]"
            />
            <div className="space-y-1.5 min-w-0">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-[#1F2328] dark:text-white/80 text-[11px] font-medium">
                {activeModalEvent.category} • {activeModalEvent.city}
              </span>
              <h2 id="modal-headline" className="text-base sm:text-lg font-bold text-[#1F2328] dark:text-white leading-snug line-clamp-2">
                {activeModalEvent.title}
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#656D76] dark:text-[#8B949E]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#1F2328]/60 dark:text-white/60" />
                  {activeModalEvent.displayDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#1F2328]/60 dark:text-white/60" />
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
            
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="text-xs sm:text-sm">
                <strong className="font-semibold block text-emerald-900 dark:text-white text-xs uppercase tracking-wide">Pass Reserved Successfully</strong>
                Your entry pass is preserved locally in your browser. Present this reference code at admission.
              </div>
            </div>

            {/* Ticket Pass Specimen Card */}
            <div className="relative border border-[#D0D7DE] dark:border-[#30363D] bg-[#F6F8FA] dark:bg-[#161B22] p-5 sm:p-6 rounded-2xl space-y-4 shadow-lg transition-colors">
              <div className="flex justify-between items-start border-b border-[#D0D7DE] dark:border-[#30363D] pb-3">
                <div>
                  <span className="text-[10px] text-[#656D76] dark:text-[#8B949E] uppercase tracking-wider block font-mono">PASS REFERENCE</span>
                  <span className="text-lg font-bold text-[#1F2328] dark:text-white tracking-wider font-mono">
                    {confirmedRecord.referenceCode}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#656D76] dark:text-[#8B949E] uppercase tracking-wider block font-mono">ADMISSION</span>
                  <span className="text-[#1F2328] dark:text-white font-medium text-xs">General Entry × {confirmedRecord.ticketCount}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#656D76] dark:text-[#8B949E] block font-mono">ATTENDEE</span>
                  <span className="text-sm font-semibold text-[#1F2328] dark:text-white">{confirmedRecord.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#656D76] dark:text-[#8B949E] block font-mono">CONTACT EMAIL</span>
                  <span className="text-[#1F2328]/80 dark:text-white/80 truncate block">{confirmedRecord.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#656D76] dark:text-[#8B949E] block font-mono">DATE & TIME</span>
                  <span className="text-[#1F2328] dark:text-white/90">{confirmedRecord.eventDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#656D76] dark:text-[#8B949E] block font-mono">VENUE & CITY</span>
                  <span className="text-[#1F2328] dark:text-white/90">{confirmedRecord.eventVenue}, {confirmedRecord.eventCity}</span>
                </div>
              </div>

              {/* Barcode Graphic Pattern */}
              <div className="pt-3 border-t border-[#D0D7DE] dark:border-[#30363D] flex flex-col items-center justify-center space-y-1.5 opacity-80">
                <div className="flex gap-1 h-7 items-stretch">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`bg-[#1F2328] dark:bg-white rounded-full ${i % 3 === 0 ? 'w-1' : i % 5 === 0 ? 'w-1.5' : 'w-0.5'}`} 
                    />
                  ))}
                </div>
                <span className="text-[9px] tracking-widest text-[#656D76] dark:text-[#8B949E] uppercase font-mono">
                  VERIFIED LOCAL PASS • ATMOSPHERE
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => downloadCalendarFile(confirmedRecord)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] text-xs font-medium text-[#1F2328] dark:text-white hover:border-[#1F2328]/40 dark:hover:border-white/40 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-[#656D76] dark:text-white/70" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    closeRegistrationModal();
                    openPassesDrawer();
                  }}
                  className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 text-[#1F2328] dark:text-white text-xs font-medium hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                >
                  View All Passes
                </button>

                <button
                  onClick={closeRegistrationModal}
                  className="px-5 py-2 rounded-full bg-[#1F2328] hover:bg-[#2D333B] text-white dark:bg-white dark:text-black dark:hover:bg-white/90 text-xs font-semibold transition-colors shadow-sm"
                >
                  Done
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Interactive Form */
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-7 space-y-4">
            
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label 
                htmlFor="reg-fullname" 
                className="block text-[11px] uppercase tracking-wider font-semibold text-[#656D76] dark:text-[#8B949E] font-mono"
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
                className={`w-full px-4 py-2.5 bg-[#F6F8FA] dark:bg-[#161B22] border text-sm text-[#1F2328] dark:text-white rounded-xl placeholder-[#8C959F] dark:placeholder-[#8B949E] focus:outline-none focus:bg-white dark:focus:bg-[#161B22] transition-colors shadow-sm ${
                  errors.fullName 
                    ? 'border-rose-500 focus:border-rose-500' 
                    : 'border-[#D0D7DE] dark:border-[#30363D] focus:border-[#1F2328] dark:focus:border-white/50'
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
                className="block text-[11px] uppercase tracking-wider font-semibold text-[#656D76] dark:text-[#8B949E] font-mono"
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
                className={`w-full px-4 py-2.5 bg-[#F6F8FA] dark:bg-[#161B22] border text-sm text-[#1F2328] dark:text-white rounded-xl placeholder-[#8C959F] dark:placeholder-[#8B949E] focus:outline-none focus:bg-white dark:focus:bg-[#161B22] transition-colors shadow-sm ${
                  errors.email 
                    ? 'border-rose-500 focus:border-rose-500' 
                    : 'border-[#D0D7DE] dark:border-[#30363D] focus:border-[#1F2328] dark:focus:border-white/50'
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
                  className="block text-[11px] uppercase tracking-wider font-semibold text-[#656D76] dark:text-[#8B949E] font-mono"
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
                  className={`w-full px-4 py-2.5 bg-[#F6F8FA] dark:bg-[#161B22] border text-sm text-[#1F2328] dark:text-white rounded-xl placeholder-[#8C959F] dark:placeholder-[#8B949E] focus:outline-none focus:bg-white dark:focus:bg-[#161B22] transition-colors shadow-sm ${
                    errors.phone 
                      ? 'border-rose-500 focus:border-rose-500' 
                      : 'border-[#D0D7DE] dark:border-[#30363D] focus:border-[#1F2328] dark:focus:border-white/50'
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
                  className="block text-[11px] uppercase tracking-wider font-semibold text-[#656D76] dark:text-[#8B949E] font-mono"
                >
                  Number of Passes
                </label>
                <select
                  id="reg-tickets"
                  value={ticketCount}
                  onChange={e => setTicketCount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-[#F6F8FA] dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] text-sm text-[#1F2328] dark:text-white rounded-xl focus:outline-none focus:bg-white dark:focus:bg-[#161B22] focus:border-[#1F2328] dark:focus:border-white/50 appearance-none cursor-pointer shadow-sm transition-colors"
                >
                  <option value={1} className="bg-white dark:bg-[#161B22] text-[#1F2328] dark:text-white">1 Pass (Solo Attendee)</option>
                  <option value={2} className="bg-white dark:bg-[#161B22] text-[#1F2328] dark:text-white">2 Passes (Pair)</option>
                  <option value={3} className="bg-white dark:bg-[#161B22] text-[#1F2328] dark:text-white">3 Passes</option>
                  <option value={4} className="bg-white dark:bg-[#161B22] text-[#1F2328] dark:text-white">4 Passes (Small Group)</option>
                </select>
              </div>

            </div>

            {/* Optional Notes */}
            <div className="space-y-1.5">
              <label 
                htmlFor="reg-notes" 
                className="block text-[11px] uppercase tracking-wider text-[#656D76] dark:text-[#8B949E] font-mono"
              >
                Special Requirements or Notes <span className="lowercase font-normal text-[10px]">(optional)</span>
              </label>
              <textarea
                id="reg-notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={2}
                placeholder="Accessibility needs, dietary preferences, or sound sensitivity notes..."
                className="w-full px-4 py-2 bg-[#F6F8FA] dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] text-sm text-[#1F2328] dark:text-white rounded-xl placeholder-[#8C959F] dark:placeholder-[#8B949E] focus:outline-none focus:bg-white dark:focus:bg-[#161B22] focus:border-[#1F2328] dark:focus:border-white/50 transition-colors shadow-sm"
              />
            </div>

            {/* Transparent Local Storage Disclaimer */}
            <div className="p-3 rounded-xl bg-[#F6F8FA] dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] text-xs text-[#656D76] dark:text-[#8B949E] flex items-start gap-2.5 transition-colors">
              <AlertCircle className="w-4 h-4 text-[#656D76] dark:text-white/60 shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#1F2328] dark:text-white font-medium">Client-Side Only:</strong> No external server tracking. Passes are 
                stored exclusively in your local browser cache for your personal itinerary.
              </span>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D0D7DE] dark:border-[#30363D]">
              <button
                type="button"
                onClick={closeRegistrationModal}
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-semibold text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-white transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#1F2328] hover:bg-[#2D333B] text-white dark:bg-white dark:text-black dark:hover:bg-white/90 text-xs font-semibold transition-all active:scale-95 disabled:opacity-50 shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing Booking...</span>
                  </>
                ) : (
                  <span>Confirm Booking</span>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
