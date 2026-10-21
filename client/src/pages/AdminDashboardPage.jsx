import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck, LogOut, Home, Calendar, Users, IndianRupee,
  Plus, Trash2, Eye, EyeOff, Search, CheckCircle2, XCircle,
  Clock, AlertCircle, MessageSquare, Filter, RefreshCw, Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getProperties, createProperty, deleteProperty, togglePropertyStatus,
  blockPropertyDates, unblockPropertyDates, getBookings, updateBookingStatus,
  getDashboardStats
} from '../services/api';
import { formatINR, formatDate, getTodayDateString } from '../utils/formatters';

export default function AdminDashboardPage() {
  const { adminUser, isAuthenticated, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // overview, properties, bookings
  const [stats, setStats] = useState(null);
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [bookingFilterStatus, setBookingFilterStatus] = useState('All');
  const [bookingSearch, setBookingSearch] = useState('');

  // Add Property Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newProp, setNewProp] = useState({
    name: '',
    tagline: '',
    category: 'Resorts',
    location: '',
    district: 'Idukki',
    pricePerNight: '',
    guestCapacity: '4',
    bedrooms: '2',
    bathrooms: '2',
    images: '/images/yathra/munnar-villa-pool.jpg',
    description: '',
    amenities: 'High-Speed Wi-Fi, Panoramic Mountain View, Campfire Pit, Free Parking',
    houseRules: 'Check-in: 02:00 PM | Check-out: 11:00 AM, Valid Government Photo ID required'
  });

  // Block Dates Modal State
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [selectedPropertyForBlock, setSelectedPropertyForBlock] = useState(null);
  const [dateToBlock, setDateToBlock] = useState(getTodayDateString());

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, propsRes, bookingsRes] = await Promise.all([
        getDashboardStats().catch(() => ({ data: { success: false } })),
        getProperties().catch(() => ({ data: { success: false } })),
        getBookings().catch(() => ({ data: { success: false } }))
      ]);

      if (statsRes.data.success) setStats(statsRes.data.data);
      if (propsRes.data.success) setProperties(propsRes.data.data);
      if (bookingsRes.data.success) setBookings(bookingsRes.data.data);
    } catch (err) {
      console.error('Error loading admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Handle Add Property
  const handleCreateProperty = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: newProp.name,
        tagline: newProp.tagline,
        category: newProp.category,
        location: newProp.location,
        district: newProp.district,
        pricePerNight: Number(newProp.pricePerNight),
        guestCapacity: Number(newProp.guestCapacity),
        bedrooms: Number(newProp.bedrooms),
        bathrooms: Number(newProp.bathrooms),
        images: newProp.images.split(',').map(s => s.trim()).filter(Boolean),
        description: newProp.description,
        amenities: newProp.amenities.split(',').map(s => s.trim()).filter(Boolean),
        houseRules: newProp.houseRules.split(',').map(s => s.trim()).filter(Boolean)
      };

      const res = await createProperty(payload);
      if (res.data.success) {
        setAddModalOpen(false);
        loadData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create property');
    }
  };

  // Toggle Property Active/Inactive
  const handleToggleActive = async (id) => {
    try {
      await togglePropertyStatus(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Property
  const handleDeleteProperty = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}"?`)) {
      try {
        await deleteProperty(id);
        loadData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Block Date
  const handleBlockDate = async () => {
    if (!selectedPropertyForBlock || !dateToBlock) return;
    try {
      await blockPropertyDates(selectedPropertyForBlock.id, [dateToBlock]);
      setBlockModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // Unblock Date
  const handleUnblockDate = async (propId, date) => {
    try {
      await unblockPropertyDates(propId, [date]);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // Update Booking Status
  const handleUpdateBookingStatus = async (id, newStatus) => {
    try {
      await updateBookingStatus(id, newStatus);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (bookingFilterStatus !== 'All' && b.status !== bookingFilterStatus) return false;
    if (bookingSearch) {
      const q = bookingSearch.toLowerCase();
      return (
        b.bookingReference.toLowerCase().includes(q) ||
        b.fullName.toLowerCase().includes(q) ||
        b.propertyName.toLowerCase().includes(q) ||
        b.phone.includes(q)
      );
    }
    return true;
  });

  if (authLoading || (!isAuthenticated && !adminUser)) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-stone-900 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-[#0a231b] text-white px-6 py-4 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-serif font-black tracking-wider text-white">YATHRA</span>
              <span className="px-2 py-0.5 rounded bg-emerald-800 text-[10px] uppercase font-bold tracking-widest text-emerald-200">
                Host Admin
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-stone-300 hidden sm:inline">
              Logged in as <strong>{adminUser?.username || 'admin'}</strong>
            </span>
            <Link
              to="/"
              className="text-xs text-stone-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
            >
              View Website
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs text-rose-300 hover:text-white px-3 py-1.5 rounded-lg bg-rose-900/40 hover:bg-rose-900 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Navigation Tabs & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 bg-stone-200/80 p-1 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'overview' ? 'bg-white text-[#0a231b] shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Overview Metrics
            </button>
            <button
              onClick={() => setActiveTab('properties')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'properties' ? 'bg-white text-[#0a231b] shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Properties ({properties.length})
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'bookings' ? 'bg-white text-[#0a231b] shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Booking Enquiries ({bookings.length})
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            {activeTab === 'properties' && (
              <button
                onClick={() => setAddModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#143d2f] hover:bg-[#0a231b] text-white text-xs sm:text-sm font-semibold shadow transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Property</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                <span className="text-xs text-stone-500 block uppercase font-bold tracking-wider">Total Stays</span>
                <span className="text-2xl sm:text-3xl font-black text-stone-900 mt-1 block">
                  {stats?.totalProperties || properties.length}
                </span>
                <span className="text-[11px] text-emerald-700 mt-1 block">Listed Accommodations</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                <span className="text-xs text-stone-500 block uppercase font-bold tracking-wider">Active Listings</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-800 mt-1 block">
                  {stats?.activeListings ?? properties.filter(p => p.isActive).length}
                </span>
                <span className="text-[11px] text-stone-500 mt-1 block">Visible to Customers</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                <span className="text-xs text-stone-500 block uppercase font-bold tracking-wider">Pending Enquiries</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-600 mt-1 block">
                  {stats?.pendingEnquiries ?? bookings.filter(b => b.status === 'Pending').length}
                </span>
                <span className="text-[11px] text-amber-700 mt-1 block">Awaiting Verification</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                <span className="text-xs text-stone-500 block uppercase font-bold tracking-wider">Confirmed Stays</span>
                <span className="text-2xl sm:text-3xl font-black text-blue-700 mt-1 block">
                  {stats?.confirmedBookings ?? bookings.filter(b => b.status === 'Confirmed').length}
                </span>
                <span className="text-[11px] text-blue-600 mt-1 block">Locked Reservations</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm col-span-2 lg:col-span-1">
                <span className="text-xs text-stone-500 block uppercase font-bold tracking-wider">Confirmed Revenue</span>
                <span className="text-xl sm:text-2xl font-black text-[#0a231b] mt-1 block truncate">
                  {formatINR(stats?.estimatedRevenue || 0)}
                </span>
                <span className="text-[11px] text-stone-500 mt-1 block">INR Total Value</span>
              </div>
            </div>

            {/* Recent Enquiries Preview */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-serif font-bold text-stone-900">Recent Booking Enquiries</h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-semibold text-emerald-800 hover:underline"
                >
                  View All Enquiries →
                </button>
              </div>

              {bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-stone-600">
                    <thead className="bg-stone-50 text-xs uppercase font-bold text-stone-500 border-b border-stone-200">
                      <tr>
                        <th className="py-3 px-4">Ref Code</th>
                        <th className="py-3 px-4">Guest</th>
                        <th className="py-3 px-4">Stay</th>
                        <th className="py-3 px-4">Dates</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {bookings.slice(0, 5).map((b) => (
                        <tr key={b.id} className="hover:bg-stone-50/80">
                          <td className="py-3 px-4 font-mono font-bold text-stone-900">{b.bookingReference}</td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-stone-800 block">{b.fullName}</span>
                            <span className="text-xs text-stone-400">{b.phone}</span>
                          </td>
                          <td className="py-3 px-4 truncate max-w-xs">{b.propertyName}</td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            {formatDate(b.checkIn)} ({b.numberOfNights}n)
                          </td>
                          <td className="py-3 px-4 font-bold text-[#0a231b]">{formatINR(b.estimatedTotal)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                              b.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                              b.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                              'bg-stone-100 text-stone-600'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-stone-400 text-sm py-8 text-center">No booking enquiries received yet.</p>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PROPERTIES MANAGEMENT */}
        {activeTab === 'properties' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((prop) => (
                <div
                  key={prop.id}
                  className={`bg-white rounded-3xl border ${prop.isActive ? 'border-stone-200' : 'border-stone-300 opacity-60'} overflow-hidden shadow-sm flex flex-col justify-between`}
                >
                  <div className="relative h-48 bg-stone-100">
                    <img
                      src={prop.images?.[0] || '/images/yathra/munnar-villa-pool.jpg'}
                      alt={prop.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold">
                        {prop.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggleActive(prop.id)}
                        className={`p-1.5 rounded-full ${prop.isActive ? 'bg-emerald-600' : 'bg-stone-500'} text-white shadow`}
                        title={prop.isActive ? 'Active (Click to Deactivate)' : 'Inactive (Click to Activate)'}
                      >
                        {prop.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteProperty(prop.id, prop.name)}
                        className="p-1.5 rounded-full bg-rose-600 text-white shadow hover:bg-rose-700"
                        title="Delete Property"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1 rounded-xl text-xs font-bold text-[#0a231b] shadow">
                      {formatINR(prop.pricePerNight)} / night
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 text-lg line-clamp-1">{prop.name}</h4>
                      <p className="text-xs text-emerald-800 font-medium mt-0.5">{prop.location}</p>
                      <p className="text-xs text-stone-500 mt-2 line-clamp-2">{prop.description}</p>

                      {/* Blocked dates tag */}
                      {prop.blockedDates && prop.blockedDates.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-stone-100">
                          <span className="text-[10px] uppercase font-bold text-rose-700 block mb-1">
                            Blocked Dates ({prop.blockedDates.length}):
                          </span>
                          <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
                            {prop.blockedDates.map((date) => (
                              <span
                                key={date}
                                className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-mono border border-rose-200 flex items-center gap-1"
                              >
                                <span>{date}</span>
                                <button
                                  onClick={() => handleUnblockDate(prop.id, date)}
                                  className="text-rose-500 hover:text-rose-900 font-bold"
                                  title="Unblock date"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedPropertyForBlock(prop);
                          setBlockModalOpen(true);
                        }}
                        className="text-xs font-semibold text-[#d97706] hover:underline flex items-center gap-1"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Manage Blocked Dates</span>
                      </button>

                      <Link
                        to={`/stay/${prop.id}`}
                        target="_blank"
                        className="text-xs font-semibold text-emerald-800 hover:underline"
                      >
                        Live Page ↗
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search guest name, phone, or ref code..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {['All', 'Pending', 'Confirmed', 'Rejected', 'Cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setBookingFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                      bookingFilterStatus === status
                        ? 'bg-[#143d2f] text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              {filteredBookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-stone-700">
                    <thead className="bg-stone-50 text-xs uppercase font-bold text-stone-500 border-b border-stone-200">
                      <tr>
                        <th className="py-3.5 px-4">Ref Code</th>
                        <th className="py-3.5 px-4">Guest Information</th>
                        <th className="py-3.5 px-4">Stay & Location</th>
                        <th className="py-3.5 px-4">Dates & Nights</th>
                        <th className="py-3.5 px-4">Estimated Total</th>
                        <th className="py-3.5 px-4">Current Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-stone-50/80">
                          <td className="py-4 px-4 font-mono font-bold text-stone-900">
                            {b.bookingReference}
                          </td>

                          <td className="py-4 px-4">
                            <span className="font-semibold text-stone-900 block">{b.fullName}</span>
                            <a
                              href={`https://wa.me/${b.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(b.fullName)},%20regarding%20your%20YATHRA%20booking%20enquiry%20${b.bookingReference}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#25D366] hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>{b.phone}</span>
                            </a>
                            {b.email && <span className="text-xs text-stone-400 block">{b.email}</span>}
                          </td>

                          <td className="py-4 px-4">
                            <span className="font-medium text-stone-900 block">{b.propertyName}</span>
                            <span className="text-xs text-stone-400">{b.location}</span>
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="block font-medium">
                              {formatDate(b.checkIn)} → {formatDate(b.checkOut)}
                            </span>
                            <span className="text-xs text-stone-500">
                              {b.numberOfNights} Nights • {b.guests} Guests
                            </span>
                          </td>

                          <td className="py-4 px-4 font-bold text-[#0a231b] whitespace-nowrap">
                            {formatINR(b.estimatedTotal)}
                          </td>

                          <td className="py-4 px-4">
                            <select
                              value={b.status}
                              onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-full text-xs font-bold border focus:outline-none cursor-pointer ${
                                b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                                b.status === 'Pending' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                                b.status === 'Rejected' ? 'bg-rose-100 text-rose-800 border-rose-300' :
                                'bg-stone-100 text-stone-600 border-stone-300'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="py-4 px-4 text-right">
                            <a
                              href={`https://wa.me/${b.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(b.fullName)}!%20Your%20YATHRA%20stay%20enquiry%20for%20${encodeURIComponent(b.propertyName)}%20(${b.bookingReference})%20is%20${b.status}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#25D366]/10 text-[#1b7e41] hover:bg-[#25D366]/20 text-xs font-semibold"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                              <span>WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-16 text-center text-stone-400 text-sm">
                  No booking enquiries match your search or filter.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Add New Property Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 my-8 border border-stone-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">Add New Stay Listing</h3>

            <form onSubmit={handleCreateProperty} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Stay Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pine Woods Valley Chalet"
                  value={newProp.name}
                  onChange={(e) => setNewProp({ ...newProp, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Category</label>
                  <select
                    value={newProp.category}
                    onChange={(e) => setNewProp({ ...newProp, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="Resorts">Resorts</option>
                    <option value="Camping & Glamping">Camping & Glamping</option>
                    <option value="Cottages">Cottages & A-Frames</option>
                    <option value="Private Villa">Private Villa</option>
                    <option value="Homestays">Homestays</option>
                    <option value="Treehouse">Treehouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">District / Region</label>
                  <select
                    value={newProp.district}
                    onChange={(e) => setNewProp({ ...newProp, district: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="Idukki">Idukki (Munnar / Kuttikkanam)</option>
                    <option value="Wayanad">Wayanad</option>
                    <option value="Kodaikanal">Kodaikanal / Kookal</option>
                    <option value="Alappuzha">Alleppey</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Nightly Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="3500"
                    value={newProp.pricePerNight}
                    onChange={(e) => setNewProp({ ...newProp, pricePerNight: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Max Guests</label>
                  <input
                    type="number"
                    required
                    placeholder="4"
                    value={newProp.guestCapacity}
                    onChange={(e) => setNewProp({ ...newProp, guestCapacity: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Bedrooms</label>
                  <input
                    type="number"
                    placeholder="2"
                    value={newProp.bedrooms}
                    onChange={(e) => setNewProp({ ...newProp, bedrooms: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Location Details</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meppadi, Wayanad, Kerala"
                  value={newProp.location}
                  onChange={(e) => setNewProp({ ...newProp, location: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Image URLs (comma-separated)</label>
                <input
                  type="text"
                  value={newProp.images}
                  onChange={(e) => setNewProp({ ...newProp, images: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Description</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Describe the stay experience..."
                  value={newProp.description}
                  onChange={(e) => setNewProp({ ...newProp, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#143d2f] hover:bg-[#0a231b] text-white text-xs font-bold shadow"
                >
                  Create Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Block Dates Modal */}
      {blockModalOpen && selectedPropertyForBlock && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-100">
            <h3 className="text-xl font-serif font-bold text-stone-900 mb-1">
              Block Dates for Stay
            </h3>
            <p className="text-xs text-stone-500 mb-4">{selectedPropertyForBlock.name}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Select Date to Block (Unavailable)
                </label>
                <input
                  type="date"
                  min={getTodayDateString()}
                  value={dateToBlock}
                  onChange={(e) => setDateToBlock(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setBlockModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBlockDate}
                  className="px-5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow"
                >
                  Block This Date
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
