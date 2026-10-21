# 🌿 YATHRA — Premium Nature Stay & Resort Booking Platform

> **"Find Your Escape."**  
> *"പ്രണയമാണ് യാത്രയോട് ❤️ | കണ്ടത് മനോഹരം കാണാത്തത് അതിമനോഹരം"*  
> Inspired by the Kerala travel community on Instagram [**@yathra._**](https://www.instagram.com/yathra._/) (58K+ travelers).

---

## 🌟 Overview

**YATHRA** is a full-stack, responsive travel accommodation platform designed to discover and book:
- 🏡 **A-Frame Wooden Cabins & Mountain Cottages** (Kuttikkanam, Kookal, Thekkady)
- 🏊 **Private Luxury Pool Villas** (6–9 BHK estates in Munnar and Kodaikanal)
- 🏕️ **Glamping Safari Tents & Monsoon Camps** (Meeshapulimala, Wayanad)
- ☕ **Heritage Coffee & Tea Plantation Homestays** (Kalpetta, Alleppey)
- 🌲 **Back-to-Nature Treehouses** (Kanthalloor fruit orchards)

The platform is designed with a **cinematic nature aesthetic** (forest green, warm ivory, sand beige, amber gold), **parallax scrolling depth**, and **automatic date-based pricing in Indian Rupees (₹)** with zero hidden fees.

---

## 🚀 Key Features

### 1. Cinematic Parallax Experience
- Layered parallax hero with mountain mist depth and smooth scroll transitions.
- Interactive floating search bar: filter by destination, category, check-in, check-out, and guest count.
- Curated Instagram gallery showcasing reels and stories from **@yathra._**.

### 2. Live Date-Based Booking & Pricing in INR (₹)
- Automatic night calculation:
  $$\text{Nights} = \text{Check-out Date} - \text{Check-in Date}$$
  $$\text{Subtotal} = \text{Nights} \times \text{Nightly Rate}$$
- Prevents past dates and invalid check-out selections.
- Real-time updates as dates or guest counts change.
- Transparent price breakdown with 5% GST itemized.

### 3. Booking Enquiry Workflow & WhatsApp Integration
- Guest enquiry form with 10-digit Indian phone validation, email, and special requests.
- Generates a unique booking reference code (e.g., `YATHRA-30391`).
- Confirmation screen with celebration confetti and clear explanation that availability is verified with the host.
- One-click **WhatsApp Enquiry** button with pre-filled details (property name, dates, nights, guests, estimated INR total).

### 4. Admin Management Dashboard (`/admin`)
- **Protected route** with JWT token authentication.
- **Overview Metrics**: Total properties, active listings, pending enquiries, confirmed stays, and total revenue.
- **Property Management**: Add new stays, toggle active/inactive status, delete stays, manage nightly rates and amenities.
- **Availability & Date Blocking**: Block unavailable or maintenance dates for individual properties with visual calendar.
- **Enquiry Management**: Update enquiry status (`Pending`, `Confirmed`, `Rejected`, `Cancelled`) and message guests on WhatsApp with 1 click.

### 5. Mobile-First Responsive Design
- Optimized for iPhone, Android, tablets, and desktop monitors.
- Mobile bottom booking bar on stay details page for effortless one-thumb booking.
- Slide-over mobile drawer with quick navigation links.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React.js (Vite), React Router v7, Tailwind CSS, Lucide React, Framer Motion, Canvas Confetti |
| **Backend** | Node.js, Express.js, CORS, JSON Web Tokens (JWT), Dotenv |
| **Database** | MongoDB with Mongoose + Automatic persistent JSON fallback store |
| **Styling** | Mobile-first Tailwind CSS with custom Earth & Forest color tokens |

---

## 📦 Project Structure

```
yatra/
├── client/                     # Vite + React Frontend
│   ├── public/
│   │   ├── favicon.svg         # Yathra mountain emblem
│   │   └── images/yathra/      # Authentic brand photos from @yathra._
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Navbar, Footer, InstagramIcon
│   │   │   ├── home/           # ParallaxHero, FeaturedCategories, FeaturedStays, Experiences, WhyChooseUs, InstagramFeed
│   │   │   └── stays/          # PropertyCard, BookingWidget, BookingModal
│   │   ├── context/            # AuthContext, FavoritesContext
│   │   ├── pages/              # HomePage, StaysPage, PropertyDetailPage, ExperiencesPage, AboutPage, ContactPage, AdminLoginPage, AdminDashboardPage
│   │   ├── services/           # Axios API client
│   │   ├── utils/              # INR currency formatting, date calculation
│   │   ├── App.jsx             # Router configuration
│   │   └── index.css           # Design tokens, custom scrollbar, glassmorphism
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                     # Node.js + Express Backend
│   ├── config/                 # db.js (MongoDB + fallback handler)
│   ├── controllers/            # propertyController, bookingController, authController
│   ├── data/                   # defaultProperties.js, persistent properties.json & bookings.json
│   ├── middleware/             # auth.js (JWT Admin protection)
│   ├── models/                 # Property.js, Booking.js (Mongoose schemas)
│   ├── routes/                 # propertyRoutes, bookingRoutes, authRoutes, statsRoutes
│   └── server.js               # Express application entry
├── .env.example
├── package.json                # Root package for concurrently running client & server
└── README.md
```

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js v18+ (tested on v20.18.0)
- npm v9+

### 1. Installation
In the project root, install all dependencies:
```bash
npm run install:all
```
*(Or install inside `client` and `server` folders individually)*:
```bash
cd client && npm install --legacy-peer-deps
cd ../server && npm install
```

### 2. Running Frontend & Backend
You can run both concurrently from the root directory:
```bash
npm run dev
```

Or run them in separate terminals:
- **Backend API**:
  ```bash
  cd server && npm run dev
  # Server runs at http://localhost:12001
  ```
- **Frontend Web App**:
  ```bash
  cd client && npm run dev
  # Client runs at http://localhost:12000
  ```

---

## 🔐 Admin Dashboard Access

- **Login URL**: [http://localhost:12000/admin/login](http://localhost:12000/admin/login)
- **Default Username**: `admin`
- **Default Password**: `yathra2026`

---

## 📡 API Endpoints

### Properties
- `GET /api/properties` — Discover stays (supports `?category=`, `?district=`, `?search=`, `?maxPrice=`)
- `GET /api/properties/:id` — Property details
- `GET /api/properties/:id/availability` — Check blocked and booked date ranges
- `POST /api/properties` *(Protected)* — Create a new stay listing
- `PUT /api/properties/:id` *(Protected)* — Update stay details
- `DELETE /api/properties/:id` *(Protected)* — Remove listing
- `PATCH /api/properties/:id/toggle-status` *(Protected)* — Toggle active / inactive
- `POST /api/properties/:id/block-dates` *(Protected)* — Block specific calendar dates
- `POST /api/properties/:id/unblock-dates` *(Protected)* — Unblock calendar dates

### Booking Enquiries
- `POST /api/bookings` — Submit customer booking enquiry
- `GET /api/bookings` *(Protected)* — View all enquiries (filter by status or search)
- `GET /api/bookings/:id` *(Protected)* — View single enquiry
- `PATCH /api/bookings/:id/status` *(Protected)* — Update status (`Pending`, `Confirmed`, `Rejected`, `Cancelled`)

### Authentication
- `POST /api/auth/login` — Administrator authentication
- `GET /api/auth/me` *(Protected)* — Current admin session

### Statistics
- `GET /api/stats` *(Protected)* — Dashboard overview counts and revenue

---

## 🌿 Brand Credits
- Inspired by the Kerala travel community on Instagram: [**@yathra._**](https://www.instagram.com/yathra._/)
- Tagline: *"Find Your Escape."*
- Curated stays across Munnar, Wayanad, Kuttikkanam, Vagamon, Kanthalloor, Kodaikanal, and Alleppey.
