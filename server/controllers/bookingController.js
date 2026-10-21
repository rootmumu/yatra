import { store } from '../data/store.js';

export const createBooking = async (req, res) => {
  try {
    const {
      propertyId,
      fullName,
      phone,
      email,
      checkIn,
      checkOut,
      guests,
      specialRequests
    } = req.body;

    if (!propertyId || !fullName || !phone || !checkIn || !checkOut || !guests) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: property, name, phone, dates, and guest count.'
      });
    }

    const property = store.getPropertyById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Selected property does not exist.' });
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid check-in or check-out date format.' });
    }

    if (startDate < today) {
      return res.status(400).json({ success: false, message: 'Check-in date cannot be in the past.' });
    }

    if (endDate <= startDate) {
      return res.status(400).json({ success: false, message: 'Check-out date must be later than check-in date.' });
    }

    // Number of nights calculation: check-out date is exclusive
    const diffTime = endDate.getTime() - startDate.getTime();
    const numberOfNights = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (numberOfNights < 1) {
      return res.status(400).json({ success: false, message: 'Minimum stay is 1 night.' });
    }

    // Check availability against blocked dates
    const requestedNights = [];
    let curr = new Date(startDate);
    while (curr < endDate) {
      requestedNights.push(curr.toISOString().split('T')[0]);
      curr.setDate(curr.getDate() + 1);
    }

    const blockedSet = new Set(property.blockedDates || []);
    const isConflict = requestedNights.some(date => blockedSet.has(date));
    if (isConflict) {
      return res.status(409).json({
        success: false,
        message: 'The requested dates are currently unavailable or blocked for this stay. Please select different dates.'
      });
    }

    // Exact Pricing formula
    const nightlyRate = property.pricePerNight;
    const accommodationSubtotal = numberOfNights * nightlyRate;
    // 5% standard GST & service administration
    const taxesAndService = Math.round(accommodationSubtotal * 0.05);
    const estimatedTotal = accommodationSubtotal + taxesAndService;

    const newBooking = store.createBooking({
      propertyId: property.id,
      propertyName: property.name,
      location: property.location,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      checkIn,
      checkOut,
      numberOfNights,
      guests: Number(guests),
      nightlyRate,
      accommodationSubtotal,
      taxesAndService,
      estimatedTotal,
      specialRequests: specialRequests ? specialRequests.trim() : ''
    });

    res.status(201).json({
      success: true,
      message: 'Booking enquiry submitted successfully. Our team will verify availability with the property.',
      data: newBooking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const { status, search } = req.query;
    const bookings = store.getBookings({ status, search });
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = store.getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking enquiry not found.' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Confirmed', 'Rejected', 'Cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updated = store.updateBookingStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Booking enquiry not found.' });
    }
    res.json({
      success: true,
      message: `Booking status updated to ${status}`,
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
