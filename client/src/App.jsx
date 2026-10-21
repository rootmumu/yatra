import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { PWAProvider } from './context/PWAContext';

import HomePage from './pages/HomePage';
import StaysPage from './pages/StaysPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ExperiencesPage from './pages/ExperiencesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PWAInstallPrompt from './components/common/PWAInstallPrompt';
import PWAInstallModal from './components/common/PWAInstallModal';

export default function App() {
  return (
    <PWAProvider>
      <AuthProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/stays" element={<StaysPage />} />
              <Route path="/stay/:id" element={<PropertyDetailPage />} />
              <Route path="/experiences" element={<ExperiencesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <PWAInstallPrompt />
            <PWAInstallModal />
          </BrowserRouter>
        </FavoritesProvider>
      </AuthProvider>
    </PWAProvider>
  );
}
