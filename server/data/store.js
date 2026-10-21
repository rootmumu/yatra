import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defaultProperties } from './defaultProperties.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = __dirname;
const propertiesFile = path.join(dataDir, 'properties.json');
const bookingsFile = path.join(dataDir, 'bookings.json');

// Ensure data files exist
function loadOrSeed(filePath, defaultData) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}, falling back to defaults:`, err.message);
  }
  fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
  return defaultData;
}

let properties = loadOrSeed(propertiesFile, defaultProperties);
let bookings = loadOrSeed(bookingsFile, [
  {
    id: "BK-1001",
    bookingReference: "YATHRA-89421",
    propertyId: "prop-munnar-villa-pool",
    propertyName: "Misty Pine 6BHK Luxury Villa with Private Pool",
    location: "Munnar, Kerala",
    fullName: "Rahul Varma",
    phone: "+91 98471 23456",
    email: "rahul.varma@example.com",
    checkIn: "2026-11-10",
    checkOut: "2026-11-13",
    numberOfNights: 3,
    guests: 8,
    nightlyRate: 6500,
    accommodationSubtotal: 19500,
    taxesAndService: 1950,
    estimatedTotal: 21450,
    specialRequests: "Arriving by afternoon. Need outdoor bonfire setup on night 1.",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
  },
  {
    id: "BK-1002",
    bookingReference: "YATHRA-76512",
    propertyId: "prop-kuttikkanam-aframe",
    propertyName: "The Starlit A-Frame Cabin",
    location: "Kuttikkanam, Idukki, Kerala",
    fullName: "Anjali Menon",
    phone: "+91 97455 67890",
    email: "anjali.menon@example.com",
    checkIn: "2026-11-15",
    checkOut: "2026-11-17",
    numberOfNights: 2,
    guests: 2,
    nightlyRate: 2800,
    accommodationSubtotal: 5600,
    taxesAndService: 560,
    estimatedTotal: 6160,
    specialRequests: "Anniversary celebration. Please help arrange fairy light cake setup.",
    status: "Pending",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  }
]);

function saveProperties() {
  try {
    fs.writeFileSync(propertiesFile, JSON.stringify(properties, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save properties:', err);
  }
}

function saveBookings() {
  try {
    fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save bookings:', err);
  }
}

export const store = {
  // Properties
  getProperties({ search, category, district, minPrice, maxPrice }) {
    let result = [...properties];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (category && category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (district && district !== 'All') {
      result = result.filter(p => p.district.toLowerCase() === district.toLowerCase());
    }
    if (minPrice) {
      result = result.filter(p => p.pricePerNight >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => p.pricePerNight <= Number(maxPrice));
    }
    return result;
  },

  getPropertyById(id) {
    return properties.find(p => p.id === id);
  },

  createProperty(data) {
    const newProp = {
      ...data,
      id: data.id || `prop-${Date.now()}`,
      rating: data.rating || 4.9,
      reviewCount: data.reviewCount || 0,
      isActive: data.isActive !== undefined ? data.isActive : true,
      blockedDates: data.blockedDates || [],
      createdAt: new Date().toISOString()
    };
    properties.unshift(newProp);
    saveProperties();
    return newProp;
  },

  updateProperty(id, data) {
    const idx = properties.findIndex(p => p.id === id);
    if (idx === -1) return null;
    properties[idx] = { ...properties[idx], ...data, id };
    saveProperties();
    return properties[idx];
  },

  deleteProperty(id) {
    const idx = properties.findIndex(p => p.id === id);
    if (idx === -1) return false;
    properties.splice(idx, 1);
    saveProperties();
    return true;
  },

  togglePropertyActive(id) {
    const prop = properties.find(p => p.id === id);
    if (!prop) return null;
    prop.isActive = !prop.isActive;
    saveProperties();
    return prop;
  },

  blockPropertyDates(id, dates) {
    const prop = properties.find(p => p.id === id);
    if (!prop) return null;
    const current = new Set(prop.blockedDates || []);
    dates.forEach(d => current.add(d));
    prop.blockedDates = Array.from(current);
    saveProperties();
    return prop;
  },

  unblockPropertyDates(id, dates) {
    const prop = properties.find(p => p.id === id);
    if (!prop) return null;
    const current = new Set(prop.blockedDates || []);
    dates.forEach(d => current.delete(d));
    prop.blockedDates = Array.from(current);
    saveProperties();
    return prop;
  },

  // Bookings
  getBookings({ status, search }) {
    let result = [...bookings];
    if (status && status !== 'All') {
      result = result.filter(b => b.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        b.bookingReference.toLowerCase().includes(q) ||
        b.fullName.toLowerCase().includes(q) ||
        b.propertyName.toLowerCase().includes(q) ||
        b.phone.includes(q)
      );
    }
    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getBookingById(id) {
    return bookings.find(b => b.id === id || b.bookingReference === id);
  },

  createBooking(data) {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const bookingReference = `YATHRA-${randomSuffix}`;
    const newBooking = {
      ...data,
      id: `BK-${Date.now()}`,
      bookingReference,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    bookings.unshift(newBooking);
    saveBookings();
    return newBooking;
  },

  updateBookingStatus(id, status) {
    const booking = bookings.find(b => b.id === id || b.bookingReference === id);
    if (!booking) return null;
    booking.status = status;
    booking.updatedAt = new Date().toISOString();
    saveBookings();
    return booking;
  },

  // Statistics
  getStats() {
    const totalProperties = properties.length;
    const activeListings = properties.filter(p => p.isActive).length;
    const pendingEnquiries = bookings.filter(b => b.status === 'Pending').length;
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
    const estimatedRevenue = bookings
      .filter(b => b.status === 'Confirmed')
      .reduce((sum, b) => sum + (b.estimatedTotal || 0), 0);

    return {
      totalProperties,
      activeListings,
      pendingEnquiries,
      confirmedBookings,
      estimatedRevenue,
      recentBookings: bookings.slice(0, 5)
    };
  }
};
