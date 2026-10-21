import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, AlertCircle, Calendar, Users, IndianRupee, Clock, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { createBooking } from '../../services/api';
import { formatINR, formatDate } from '../../utils/formatters';

export default function BookingModal({
  isOpen,
  onClose,
  property,
  bookingDetails
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!isOpen) return null;

  const {
    checkIn,
    checkOut,
    nights,
    guests,
    nightlyRate,
    subtotal,
    taxes,
    total
  } = bookingDetails;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Form validations
    if (!formData.fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    const cleanPhone = formData.phone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile phone number');
      return;
    }

    if (nights <= 0) {
      setError('Please select valid check-in and check-out dates.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        propertyId: property.id,
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        checkIn,
        checkOut,
        guests: Number(guests),
        specialRequests: formData.specialRequests.trim()
      };

      const res = await createBooking(payload);

      if (res.data.success) {
        setConfirmedBooking(res.data.data);
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setError(res.data.message || 'Unable to submit booking enquiry.');
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        'Booking submission failed. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const generateWhatsAppUrl = (refCode) => {
    const text = encodeURIComponent(
      `Hello YATHRA! 🌿\n\nI have submitted a booking enquiry for *${property.name}*.\n\n` +
      `📍 *Location*: ${property.location}\n` +
      `🔖 *Reference ID*: ${refCode || 'NEW ENQUIRY'}\n` +
      `📅 *Dates*: ${formatDate(checkIn)} to ${formatDate(checkOut)} (${nights} Night${nights > 1 ? 's' : ''})\n` +
      `👥 *Guests*: ${guests}\n` +
      `💰 *Estimated Total*: ${formatINR(total)}\n\n` +
      `Please confirm availability and booking procedure.`
    );
    return `https://wa.me/919072442250?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#0a231b] px-6 py-5 text-white flex items-center justify-between">
          <div>
            <h3 className="text-xl font-serif font-bold text-white">
              {confirmedBooking ? 'Enquiry Received!' : 'Confirm Booking Enquiry'}
            </h3>
            <p className="text-xs text-emerald-300/90 mt-0.5">
              {property.name} • {property.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {confirmedBooking ? (
            /* Success Confirmation State */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">
                  Enquiry Reference Code
                </span>
                <div className="mt-1 text-2xl font-mono font-black text-[#0a231b] bg-stone-100 py-2 px-4 rounded-xl inline-block border border-stone-200">
                  {confirmedBooking.bookingReference}
                </div>
              </div>

              <div className="bg-[#faf8f5] p-4 rounded-2xl border border-stone-200 text-left text-sm space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Guest Name:</span>
                  <span className="font-semibold text-stone-900">{confirmedBooking.fullName}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Stay Dates:</span>
                  <span className="font-semibold text-stone-900">
                    {formatDate(confirmedBooking.checkIn)} — {formatDate(confirmedBooking.checkOut)} ({confirmedBooking.numberOfNights} Nights)
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Guests:</span>
                  <span className="font-semibold text-stone-900">{confirmedBooking.guests} Person(s)</span>
                </div>
                <div className="flex justify-between text-stone-600 pt-2 border-t border-stone-200">
                  <span>Estimated Total (in INR):</span>
                  <span className="font-bold text-emerald-900 text-base">
                    {formatINR(confirmedBooking.estimatedTotal)}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-left flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Please note:</strong> This is an enquiry submission. Your booking will be officially confirmed after our team verifies date availability with the property host.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={generateWhatsAppUrl(confirmedBooking.bookingReference)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect on WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="py-3 px-5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Submission Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Stay Summary Box */}
              <div className="bg-[#faf8f5] p-3.5 rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-1.5">
                <div className="flex items-center justify-between font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-800" />
                    <span>{formatDate(checkIn)} to {formatDate(checkOut)}</span>
                  </span>
                  <span className="font-bold text-stone-900">{nights} Night{nights > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-800" />
                    <span>{guests} Guest{guests > 1 ? 's' : ''}</span>
                  </span>
                  <span className="text-[#0a231b] font-bold text-sm">
                    Total: {formatINR(total)}
                  </span>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Varma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-sm"
                />
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Phone Number (WhatsApp) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98470 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Email Address <span className="text-stone-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-sm"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Special Requests / Notes <span className="text-stone-400 font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Need early check-in, campfire arrangement, or barbecue setup..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-sm"
                />
              </div>

              {/* Price Breakdown Preview */}
              <div className="pt-2 border-t border-stone-100 text-xs text-stone-600 space-y-1">
                <div className="flex justify-between">
                  <span>{formatINR(nightlyRate)} × {nights} nights</span>
                  <span className="font-medium">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Service (5% GST)</span>
                  <span className="font-medium">{formatINR(taxes)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="text-emerald-900 text-base">{formatINR(total)}</span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#143d2f] to-[#0a231b] hover:from-[#0a231b] hover:to-[#05140f] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Booking Enquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-xs border border-emerald-200 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>Enquire Directly on WhatsApp Instead</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
