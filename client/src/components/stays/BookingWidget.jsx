import React, { useState, useMemo } from 'react';
import { Calendar, Users, IndianRupee, MessageSquare, AlertCircle, Sparkles, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { formatINR, calculateNights, getTodayDateString, getTomorrowDateString, formatDate } from '../../utils/formatters';
import BookingModal from './BookingModal';

export default function BookingWidget({ property, initialDates }) {
  const [checkIn, setCheckIn] = useState(initialDates?.checkIn || getTodayDateString());
  const [checkOut, setCheckOut] = useState(
    initialDates?.checkOut || getTomorrowDateString(initialDates?.checkIn || getTodayDateString())
  );
  const [guests, setGuests] = useState(initialDates?.guests || '2');
  const [modalOpen, setModalOpen] = useState(false);

  // Automatic night calculation
  const nights = useMemo(() => {
    return calculateNights(checkIn, checkOut);
  }, [checkIn, checkOut]);

  // Check for blocked dates conflict
  const isDateBlocked = useMemo(() => {
    if (!property?.blockedDates || !property.blockedDates.length || nights <= 0) return false;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    let curr = new Date(start);
    const blockedSet = new Set(property.blockedDates);
    while (curr < end) {
      const dateStr = curr.toISOString().split('T')[0];
      if (blockedSet.has(dateStr)) return true;
      curr.setDate(curr.getDate() + 1);
    }
    return false;
  }, [checkIn, checkOut, property?.blockedDates, nights]);

  // Price calculation
  const nightlyRate = property?.pricePerNight || 0;
  const subtotal = nights * nightlyRate;
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + taxes;

  const isValidRange = nights > 0 && !isDateBlocked;

  // WhatsApp enquiry helper
  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hello YATHRA! 🌿\n\nI want to enquire about booking *${property?.name}* in ${property?.location}.\n\n` +
      `📅 *Dates*: ${formatDate(checkIn)} to ${formatDate(checkOut)} (${nights} Night${nights > 1 ? 's' : ''})\n` +
      `👥 *Guests*: ${guests}\n` +
      `💰 *Estimated Total*: ${formatINR(grandTotal)}\n\n` +
      `Please let me know if these dates are available!`
    );
    window.open(`https://wa.me/919072442250?text=${text}`, '_blank');
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-stone-200/90 relative overflow-hidden">
        {/* Top ribbon */}
        <div className="flex items-baseline justify-between mb-6 pb-5 border-b border-stone-100">
          <div>
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wider block">
              Nightly Rate
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl font-serif font-black text-[#0a231b]">
                {formatINR(nightlyRate)}
              </span>
              <span className="text-sm font-medium text-stone-500">/ night</span>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Available to Enquire</span>
            </span>
          </div>
        </div>

        {/* Date Selection Grid */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 p-1 bg-stone-50 rounded-2xl border border-stone-200">
            {/* Check-In */}
            <div className="p-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-900 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#d97706]" />
                <span>Check-In</span>
              </label>
              <input
                type="date"
                min={getTodayDateString()}
                value={checkIn}
                onChange={(e) => {
                  const newCheckIn = e.target.value;
                  setCheckIn(newCheckIn);
                  if (newCheckIn >= checkOut) {
                    setCheckOut(getTomorrowDateString(newCheckIn));
                  }
                }}
                className="w-full bg-transparent text-sm font-semibold text-stone-800 focus:outline-none cursor-pointer"
              />
            </div>

            {/* Check-Out */}
            <div className="p-3 border-l border-stone-200">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-900 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#d97706]" />
                <span>Check-Out</span>
              </label>
              <input
                type="date"
                min={getTomorrowDateString(checkIn)}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-stone-800 focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Guests Selector */}
          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-900 mb-1 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#d97706]" />
              <span>Guests</span>
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-stone-800 focus:outline-none cursor-pointer"
            >
              {Array.from({ length: property?.guestCapacity || 4 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} Guest{n > 1 ? 's' : ''} {n === property?.guestCapacity ? '(Max)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Validation / Alert Message */}
        {nights <= 0 ? (
          <div className="mt-4 p-3 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>Check-out date must be at least 1 day after check-in.</span>
          </div>
        ) : isDateBlocked ? (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>Some dates in this range are reserved or blocked. Please select alternate dates.</span>
          </div>
        ) : null}

        {/* Real-time Pricing Breakdown */}
        {isValidRange && (
          <div className="mt-6 pt-5 border-t border-stone-100 space-y-2.5 text-sm text-stone-600">
            <div className="flex justify-between items-center">
              <span>{formatINR(nightlyRate)} × {nights} night{nights > 1 ? 's' : ''}</span>
              <span className="font-semibold text-stone-900">{formatINR(subtotal)}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1 text-stone-500">
                <span>Taxes & GST (5%)</span>
                <span title="Applicable goods & services tax" className="cursor-help text-stone-400">ℹ️</span>
              </span>
              <span className="font-medium text-stone-800">{formatINR(taxes)}</span>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-stone-200 text-base font-bold text-stone-900">
              <span>Estimated Total (INR)</span>
              <span className="text-2xl font-serif text-[#0a231b] font-black">
                {formatINR(grandTotal)}
              </span>
            </div>
            <p className="text-[11px] text-stone-400 text-right">No extra booking fees or hidden charges</p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <button
            type="button"
            disabled={!isValidRange}
            onClick={() => setModalOpen(true)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d97706] to-[#e59325] hover:from-[#c26500] hover:to-[#d97706] text-white font-bold text-base tracking-wide shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Book This Stay (Send Enquiry)</span>
          </button>

          <button
            type="button"
            disabled={!isValidRange}
            onClick={handleWhatsAppEnquiry}
            className="w-full py-3 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1b7e41] border border-[#25D366]/40 font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>Enquire on WhatsApp</span>
          </button>
        </div>

        {/* Trust highlights */}
        <div className="mt-6 pt-5 border-t border-stone-100 grid grid-cols-2 gap-3 text-[11px] text-stone-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Verified YATHRA Stay</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Direct Host Response</span>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        property={property}
        bookingDetails={{
          checkIn,
          checkOut,
          nights,
          guests,
          nightlyRate,
          subtotal,
          taxes,
          total: grandTotal
        }}
      />
    </>
  );
}
