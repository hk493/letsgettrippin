import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { usePageTracking } from './hooks/useAnalytics';
import { debugEnvironmentVariables, checkAppInitialization } from './utils/debug';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import PlanningFlow from './pages/PlanningFlow';
import Dashboard from './pages/Dashboard';
import TripDetails from './pages/TripDetails';
import './index.css';

function App() {
  // Enable automatic page view tracking
  usePageTracking();

  // 開発環境でのみデバッグ情報を表示
  React.useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('🚀 App component mounted');
      checkAppInitialization();
      debugEnvironmentVariables();
    }
  }, []);

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/plan" element={<PlanningFlow />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trip/:id" element={<TripDetails />} />
          </Routes>
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;