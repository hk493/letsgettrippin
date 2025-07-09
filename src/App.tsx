import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import PlanningFlow from './pages/PlanningFlow';
import Dashboard from './pages/Dashboard';
import TripDetails from './pages/TripDetails';
// 新規ページのインポート（雛形を後ほど作成）
import PlanPreview from './pages/PlanPreview';
import PlanSelection from './pages/PlanSelection';
import PaymentScreen from './pages/PaymentScreen';
import QRCodeScreen from './pages/QRCodeScreen';
import CompletionScreen from './pages/CompletionScreen';
import ReviewsPage from './pages/ReviewsPage';
import AdminDashboard from './pages/AdminDashboard';
import FAQPage from './pages/FAQPage';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/plan" element={<PlanningFlow />} />
              <Route path="/plan/preview" element={<PlanPreview />} />
              <Route path="/esim" element={<PlanSelection />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/esim/qr" element={<QRCodeScreen />} />
              <Route path="/complete" element={<CompletionScreen />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/trip/:id" element={<TripDetails />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/faq" element={<FAQPage />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;