import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tagline: { type: String },
    category: {
      type: String,
      required: true,
      enum: ['Resorts', 'Camping & Glamping', 'Homestays', 'Cottages', 'Private Villa', 'Treehouse']
    },
    location: { type: String, required: true },
    district: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    guestCapacity: { type: Number, required: true },
    bedrooms: { type: Number, default: 1 },
    bathrooms: { type: Number, default: 1 },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.9 },
    reviewCount: { type: Number, default: 0 },
    images: [{ type: String }],
    description: { type: String, required: true },
    amenities: [{ type: String }],
    houseRules: [{ type: String }],
    cancellationPolicy: { type: String },
    isActive: { type: Boolean, default: true },
    blockedDates: [{ type: String }]
  },
  { timestamps: true }
);

export const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
