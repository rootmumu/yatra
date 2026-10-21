import { store } from '../data/store.js';

export const getProperties = async (req, res) => {
  try {
    const { search, category, district, minPrice, maxPrice } = req.query;
    const properties = store.getProperties({ search, category, district, minPrice, maxPrice });
    res.json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = store.getPropertyById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    res.json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPropertyAvailability = async (req, res) => {
  try {
    const property = store.getPropertyById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    // Collect confirmed booking dates
    const confirmedBookings = store.getBookings({ status: 'Confirmed' })
      .filter(b => b.propertyId === req.params.id);

    const bookedDates = [];
    confirmedBookings.forEach(b => {
      let curr = new Date(b.checkIn);
      const end = new Date(b.checkOut);
      while (curr < end) {
        bookedDates.push(curr.toISOString().split('T')[0]);
        curr.setDate(curr.getDate() + 1);
      }
    });

    const unavailableDates = Array.from(new Set([
      ...(property.blockedDates || []),
      ...bookedDates
    ]));

    res.json({
      success: true,
      propertyId: property.id,
      blockedDates: property.blockedDates || [],
      bookedDates,
      unavailableDates
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProperty = async (req, res) => {
  try {
    const { name, category, location, district, pricePerNight, guestCapacity, description } = req.body;
    if (!name || !category || !location || !pricePerNight) {
      return res.status(400).json({ success: false, message: 'Please provide name, category, location, and nightly price.' });
    }
    const newProp = store.createProperty(req.body);
    res.status(201).json({ success: true, data: newProp });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const updated = store.updateProperty(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const deleted = store.deleteProperty(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    res.json({ success: true, message: 'Property removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const togglePropertyStatus = async (req, res) => {
  try {
    const updated = store.togglePropertyActive(req.params.id);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const blockDates = async (req, res) => {
  try {
    const { dates } = req.body;
    if (!dates || !Array.isArray(dates)) {
      return res.status(400).json({ success: false, message: 'Please provide an array of dates to block' });
    }
    const updated = store.blockPropertyDates(req.params.id, dates);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const unblockDates = async (req, res) => {
  try {
    const { dates } = req.body;
    if (!dates || !Array.isArray(dates)) {
      return res.status(400).json({ success: false, message: 'Please provide an array of dates to unblock' });
    }
    const updated = store.unblockPropertyDates(req.params.id, dates);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
