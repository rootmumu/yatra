import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    bookingReference: { type: String, required: true, unique: true },
    propertyId: { type: String, required: true, ref: 'Property' },
    propertyName: { type: String, required: true },
    location: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    numberOfNights: { type: Number, required: true },
    guests: { type: Number, required: true },
    nightlyRate: { type: Number, required: true },
    accommodationSubtotal: { type: Number, required: true },
    taxesAndService: { type: Number, default: 0 },
    estimatedTotal: { type: Number, required: true },
    specialRequests: { type: String },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Confirmed', 'Rejected', 'Cancelled']
    }
  },
  { timestamps: true }
);

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
