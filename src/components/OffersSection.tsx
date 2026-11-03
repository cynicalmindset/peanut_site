import React, { useState } from 'react';
import { Tag, Copy, Check, Sparkles, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';
import { EVENTS_DATA } from '../data/events';

interface OfferItem {
  id: string;
  code: string;
  discount: string;
  title: string;
  description: string;
  badge: string;
  validity: string;
  minBooking?: string;
  category: string;
}

export const OffersSection: React.FC = () => {
  const { openRegistrationModal } = useRegistration();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const offers: OfferItem[] = [
    {
      id: 'offer-1',
      code: 'ATMOSPHERE25',
      discount: '25% OFF',
      title: 'Season 2026 Privilege',
      description: 'Exclusive seasonal discount applicable on all upcoming concerts, symposiums, and cultural sessions.',
      badge: 'SEASON PASS',
      validity: 'Valid till Dec 31, 2026',
      minBooking: 'No min. booking',
      category: 'All Gatherings',
    },
    {
      id: 'offer-2',
      code: 'PAIRUP500',
      discount: '₹500 OFF',
      title: 'Duet & Pair Gathering',
      description: 'Flat ₹500 deduction when booking two or more passes for workshops, culinary walks, or cinema screenings.',
      badge: 'DUO ENTRY',
      validity: 'First 50 pair bookings',
      minBooking: 'Min. 2 passes',
      category: 'Workshops & Cinema',
    },
    {
      id: 'offer-3',
      code: 'GUILD40',
      discount: '40% OFF',
      title: 'Student & Artisan Grant',
      description: 'Subsidized admission for design students, independent printers, and experimental audio practitioners.',
      badge: 'STUDENT & GUILD',
      validity: 'ID required at entry',
      minBooking: '1 pass per attendee',
      category: 'Design & Code Labs',
    },
    {
      id: 'offer-4',
      code: 'FIRSTNIGHT',
      discount: '15% OFF',
      title: 'First Gathering Welcome',
      description: 'First time joining an atmosphere gathering? Unlock 15% off your maiden reservation.',
      badge: 'WELCOME PERK',
      validity: 'Single use per email',
      minBooking: 'All upcoming sessions',
      category: 'New Members',
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const handleClaimOffer = (offer: OfferItem) => {
    handleCopy(offer.code);
    // Open registration for first event as convenience
    if (EVENTS_DATA.length > 0) {
      openRegistrationModal(EVENTS_DATA[0]);
    }
  };

  return (
    <section id="offers" className="relative w-full max-w-full overflow-hidden bg-[#F6F8FA] dark:bg-[#0D1117] text-[#1F2328] dark:text-white py-16 sm:py-24 border-b border-[#D0D7DE] dark:border-[#30363D] transition-colors">
      
      {/* Ambient subtle light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-black/[0.02] dark:bg-white/[0.02] blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D0D7DE] dark:border-[#30363D] pb-7">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#656D76] dark:text-[#8B949E] uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-[#1F2328] dark:text-white" />
              <span>Privileges & Perks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1F2328] dark:text-white">
              Coupons & Special Offers
            </h2>
            <p className="text-xs sm:text-sm text-[#656D76] dark:text-[#8B949E] max-w-xl leading-relaxed">
              Limited-edition admission codes, guild member subsidies, and early-bird vouchers for upcoming gatherings.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#656D76] dark:text-[#8B949E]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Verified Local Redemptions</span>
          </div>
        </div>

        {/* Coupons Grid (4 Cards with Ticket Vouchers Aesthetics) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {offers.map(offer => {
            const isCopied = copiedCode === offer.code;
            return (
              <div
                key={offer.id}
                className="group relative bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] hover:border-[#1F2328] dark:hover:border-white/40 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative ticket notch cutout left/right */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#F6F8FA] dark:bg-[#0D1117] border border-[#D0D7DE] dark:border-[#30363D]" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#F6F8FA] dark:bg-[#0D1117] border border-[#D0D7DE] dark:border-[#30363D]" />

                <div className="space-y-4">
                  {/* Card Top: Badge & Discount Callout */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-[10px] font-mono tracking-wider font-semibold text-[#1F2328] dark:text-white/90">
                        {offer.badge}
                      </span>
                      <h3 className="text-lg font-bold text-[#1F2328] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pt-1">
                        {offer.title}
                      </h3>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="block text-2xl sm:text-3xl font-extrabold text-[#1F2328] dark:text-white tracking-tight font-mono">
                        {offer.discount}
                      </span>
                      <span className="text-[10px] text-[#656D76] dark:text-[#8B949E] font-mono block">
                        {offer.minBooking}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#656D76] dark:text-[#8B949E] leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Card Bottom: Code Box & Action */}
                <div className="pt-5 mt-5 border-t border-[#D0D7DE] dark:border-[#30363D] flex flex-wrap items-center justify-between gap-3">
                  
                  {/* Monospace Code Pill */}
                  <div 
                    onClick={() => handleCopy(offer.code)}
                    className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#F6F8FA] dark:bg-[#0D1117] border border-[#D0D7DE] dark:border-[#30363D] hover:border-[#1F2328] dark:hover:border-white/40 cursor-pointer transition-colors"
                    title="Click to copy voucher code"
                  >
                    <span className="font-mono text-xs font-bold text-[#1F2328] dark:text-white tracking-wider">
                      {offer.code}
                    </span>
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-white" />
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[11px] text-[#656D76] dark:text-[#8B949E]">
                      <Clock className="w-3 h-3" />
                      <span>{offer.validity}</span>
                    </div>

                    <button
                      onClick={() => handleClaimOffer(offer)}
                      className="px-4 py-1.5 rounded-full bg-[#1F2328] hover:bg-black text-white dark:bg-white dark:hover:bg-white/90 dark:text-black text-xs font-semibold shadow-sm transition-all active:scale-95 flex items-center gap-1"
                    >
                      <span>{isCopied ? 'Copied & Reserve' : 'Claim Perk'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Member Access Secret Banner */}
        <div className="rounded-2xl border border-[#D0D7DE] dark:border-[#30363D] bg-white dark:bg-[#161B22] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm dark:shadow-md">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#1F2328] dark:text-white/90">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span className="font-semibold uppercase tracking-wider">Atmosphere Guild Pass</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-[#1F2328] dark:text-white">
              Need bulk passes for your studio or creative collective?
            </h4>
            <p className="text-xs text-[#656D76] dark:text-[#8B949E] leading-relaxed">
              We offer bespoke group reservations, private acoustic testing slots, and studio subsidies for creative teams of 5 or more.
            </p>
          </div>

          <button
            onClick={() => {
              if (EVENTS_DATA.length > 0) openRegistrationModal(EVENTS_DATA[1]);
            }}
            className="shrink-0 px-5 py-2.5 rounded-full bg-[#F6F8FA] hover:bg-[#1F2328] hover:text-white dark:bg-[#0D1117] dark:hover:bg-white dark:hover:text-black border border-[#D0D7DE] dark:border-[#30363D] text-[#1F2328] dark:text-white text-xs font-semibold transition-all shadow-sm"
          >
            Inquire Collective Pass →
          </button>
        </div>

      </div>
    </section>
  );
};
