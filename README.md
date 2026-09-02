# 🚗 QuickRide

> A modern, real-time ride-booking and driver matching web application built with the MERN stack and Socket.IO.

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://frontend-hazel-alpha-83.vercel.app)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

🔗 **Live Demo:** [frontend-hazel-alpha-83.vercel.app](https://frontend-hazel-alpha-83.vercel.app)

---

## ✨ Features

- 👤 **Dual Authentication**: Role-based access and JWT authentication for Passengers and Captains (Drivers).
- 📍 **Live Location & Maps**: Interactive Leaflet maps with geolocation and address auto-lookup.
- ⚡ **Real-Time Ride Matching**: Instant ride dispatching, captain discovery, and live ride updates powered by Socket.IO.
- 💰 **Automated Fare Calculation**: Dynamic ETA and pricing calculation based on route distance and duration.
- 🛡️ **Secure OTP Verification**: OTP-based ride start mechanism to ensure passenger safety.
- 📱 **Responsive UI**: Sleek, modern interface built with React, Tailwind CSS, and Framer Motion.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, React Leaflet, Lucide Icons, Framer Motion, Socket.io Client
- **Backend**: Node.js, Express 5, MongoDB (Mongoose), Socket.io, JWT, bcryptjs
- **Caching & Spatial**: Redis / In-memory fallback
- **Deployment**: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

---

## 📁 Project Structure

```text
QuickRide/
├── Backend/          # Node.js + Express REST API & Socket.io server
│   ├── config/       # Database & Redis configuration
│   ├── controllers/  # Route controller logic
│   ├── models/       # Mongoose schemas (User, Captain, Ride, etc.)
│   ├── routes/       # Express API routes
│   ├── services/     # Business logic, spatial matching & fare calculators
│   └── sockets/      # Real-time WebSocket handlers
└── frontend/         # React + Vite client application
    ├── src/
    │   ├── api/      # API client definitions
    │   ├── common/   # Reusable UI components (Header, Footer, etc.)
    │   ├── features/ # Feature modules (ride, captain, landing, home)
    │   └── pages/    # Application route views
```

---

## 🚀 Quick Start (Local Setup)

### 1. Clone the Repository
```bash
git clone https://github.com/Akshitakumari156/QuickRide.git
cd QuickRide
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend/` directory:
```ini
MONGOURI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
FRONTEND_URL=http://localhost:5173
LOCATIONIQ_API_KEY=your_locationiq_api_key  # Optional
```
Run the backend:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend/` directory:
```ini
VITE_API_URL=http://localhost:5000
```
Run the frontend:
```bash
npm run dev
```

---

## 📄 License

This project is licensed under the ISC License.
