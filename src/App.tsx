import React, { useState, useEffect } from 'react'
import { LanguageSelection } from './pages/LanguageSelection'
import { PlanSelection } from './pages/PlanSelection'
import { AuthenticationScreen } from './pages/AuthenticationScreen'
import { PaymentScreen } from './pages/PaymentScreen'
import { QRCodeScreen } from './pages/QRCodeScreen'
import { CompletionScreen } from './pages/CompletionScreen'
import { DevicesPage } from './components/DevicesPage'
import { TravelExperiencePage } from './pages/TravelExperiencePage'
import { TravelPlannerPage } from './pages/TravelPlannerPage'
import { LandingPage } from './pages/LandingPage'
import { HelpCenter } from './pages/HelpCenter'
import { Contact } from './pages/Contact'
import { TermsOfService } from './pages/TermsOfService'
import { About } from './pages/About'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { Careers } from './pages/Careers'
import { Partners } from './pages/Partners'
import { AmadeusTest } from './components/AmadeusTest'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import { Navigation } from './components/Navigation'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Footer } from './components/Footer'
import { ChatBot } from './components/ChatBot'
import { CookieConsent } from './components/CookieConsent'
import { StickyBanner } from './components/StickyBanner'
import { useAuth } from './context/AuthContext'
import FlightSearch from './components/FlightSearch'

// Wrapper component for main content
const AppContent = () => {
  const [currentScreen, setCurrentScreen] = useState('landing') // デフォルトをランディングページに変更
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [orderId, setOrderId] = useState(null)
  const { isAuthenticated } = useAuth()

  // Check for demo mode - multiple ways to access
  const isDemoMode = 
    window.location.search.includes('demo=true') || 
    window.location.pathname.includes('/demo') ||
    window.location.pathname === '/travel-experience' ||
    window.location.hash.includes('demo')

  // Check for travel planner mode
  const isTravelPlannerMode = 
    window.location.search.includes('planner=true') || 
    window.location.pathname.includes('/planner') ||
    window.location.pathname === '/travel-planner' ||
    window.location.hash.includes('planner')

  // Check for Amadeus test mode
  const isAmadeusTestMode = 
    window.location.search.includes('amadeus=true') || 
    window.location.pathname.includes('/amadeus') ||
    window.location.pathname === '/amadeus-test' ||
    window.location.hash.includes('amadeus')
    
  // Check for flight search mode
  const isFlightSearchMode = 
    window.location.search.includes('flight=true') || 
    window.location.pathname.includes('/flight') ||
    window.location.pathname === '/flight-search' ||
    window.location.hash.includes('flight')

  // Handle URL-based routing
  useEffect(() => {
    const path = window.location.pathname
    if (path === '/language') {
      setCurrentScreen('language')
    } else if (path === '/plans') {
      setCurrentScreen('plans')
    } else if (path === '/auth') {
      setCurrentScreen('auth')
    } else if (path === '/payment' || path === '/purchase') {
      // Redirect to plans if not authenticated or no plan selected
      if (!isAuthenticated || !selectedPlan) {
        setCurrentScreen('plans')
      } else {
        setCurrentScreen('payment')
      }
    } else if (path === '/devices') {
      setCurrentScreen('devices')
    } else if (path === '/help') {
      setCurrentScreen('help')
    } else if (path === '/contact') {
      setCurrentScreen('contact')
    } else if (path === '/terms') {
      setCurrentScreen('terms')
    } else if (path === '/about') {
      setCurrentScreen('about')
    } else if (path === '/privacy') {
      setCurrentScreen('privacy')
    } else if (path === '/careers') {
      setCurrentScreen('careers')
    } else if (path === '/partners') {
      setCurrentScreen('partners')
    } else {
      setCurrentScreen('landing') // デフォルトはランディングページ
    }
  }, [isAuthenticated, selectedPlan])

  // Function to handle navigation between screens
  const navigateTo = (screen: string) => {
    setCurrentScreen(screen)
    // Update URL based on screen
    const urlMap: { [key: string]: string } = {
      'language': '/language',
      'plans': '/plans',
      'auth': '/auth',
      'payment': '/payment',
      'devices': '/devices',
      'planner': '/planner',
      'landing': '/',
      'help': '/help',
      'contact': '/contact',
      'terms': '/terms',
      'about': '/about',
      'privacy': '/privacy',
      'careers': '/careers',
      'partners': '/partners'
    }
    if (urlMap[screen]) {
      window.history.pushState({}, '', urlMap[screen])
    }
  }

  // Handle plan selection
  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan)
    if (isAuthenticated) {
      // If already authenticated, go directly to payment
      setCurrentScreen('payment')
      // Update URL
      window.history.pushState({}, '', '/payment')
    } else {
      // If not authenticated, go to auth screen
      setCurrentScreen('auth')
      // Update URL
      window.history.pushState({}, '', '/auth')
    }
  }

  // Handle successful authentication
  const handleAuthSuccess = () => {
    // After successful authentication, go to payment screen
    setCurrentScreen('payment')
    // Update URL to payment/purchase page
    window.history.pushState({}, '', '/purchase')
  }

  // Handle payment completion
  const handlePaymentComplete = (orderNumber: any) => {
    setOrderId(orderNumber)
    setCurrentScreen('qr')
  }

  // Handle restart
  const handleRestart = () => {
    setCurrentScreen('landing') // ランディングページに戻る
    setSelectedPlan(null)
    setOrderId(null)
    window.history.replaceState({}, document.title, '/')
  }

  // Handle home navigation
  const handleHomeClick = () => {
    setCurrentScreen('landing') // ランディングページに戻る
    setSelectedPlan(null)
    setOrderId(null)
    window.history.replaceState({}, document.title, '/')
  }

  // Handle devices navigation
  const handleDevicesClick = () => {
    setCurrentScreen('devices')
    window.history.pushState({}, '', '/devices')
  }

  // Determine which component to render - moved after all hooks
  let componentToRender

  // If Amadeus test mode, show the test component
  if (isAmadeusTestMode) {
    componentToRender = <AmadeusTest />
  }
  // If flight search mode, show the flight search component
  else if (isFlightSearchMode) {
    componentToRender = <FlightSearch />
  }
  // If demo mode, show the new experience
  else if (isDemoMode) {
    componentToRender = <TravelExperiencePage />
  }
  // メインは旅行プランナー
  else if (isTravelPlannerMode || currentScreen === 'planner') {
    componentToRender = <TravelPlannerPage />
  }
  // Render the appropriate screen based on current state
  else {
    switch (currentScreen) {
      case 'language':
        componentToRender = (
          <>
            <LanguageSelection onContinue={() => navigateTo('landing')} />
            <Footer />
          </>
        )
        break
      case 'plans':
        componentToRender = (
          <>
            <StickyBanner 
              onDevicesClick={handleDevicesClick}
              onHomeClick={handleHomeClick}
            />
            <PlanSelection 
              onSelectPlan={handlePlanSelect}
              navigateTo={navigateTo}
            />
            <Footer />
          </>
        )
        break
      case 'auth':
        componentToRender = (
          <AuthenticationScreen 
            selectedPlan={selectedPlan}
            onSuccess={handleAuthSuccess}
            onBack={() => navigateTo('plans')}
          />
        )
        break
      case 'payment':
        componentToRender = (
          <PaymentScreen
            plan={selectedPlan}
            onPaymentComplete={handlePaymentComplete}
            onCancel={() => navigateTo('plans')}
          />
        )
        break
      case 'qr':
        componentToRender = (
          <QRCodeScreen 
            plan={selectedPlan}
            orderId={orderId}
            onContinue={() => setCurrentScreen('complete')} 
          />
        )
        break
      case 'complete':
        componentToRender = (
          <CompletionScreen 
            plan={selectedPlan}
            orderId={orderId}
            onRestart={handleRestart} 
          />
        )
        break
      case 'devices':
        componentToRender = (
          <>
            <StickyBanner 
              onDevicesClick={handleDevicesClick}
              onHomeClick={handleHomeClick}
            />
            <DevicesPage onBack={handleHomeClick} />
          </>
        )
        break
      case 'landing':
        componentToRender = <LandingPage />
        break
      case 'help':
        componentToRender = <HelpCenter />
        break
      case 'contact':
        componentToRender = <Contact />
        break
      case 'terms':
        componentToRender = <TermsOfService />
        break
      case 'about':
        componentToRender = <About />
        break
      case 'privacy':
        componentToRender = <PrivacyPolicy />
        break
      case 'careers':
        componentToRender = <Careers />
        break
      case 'partners':
        componentToRender = <Partners />
        break
      default:
        componentToRender = <LandingPage />
        break
    }
  }

  // Return early for demo mode or travel planner mode without additional wrapper
  if (isDemoMode || isTravelPlannerMode || currentScreen === 'planner' || currentScreen === 'landing' || currentScreen === 'help' || currentScreen === 'contact' || currentScreen === 'terms' || currentScreen === 'about' || currentScreen === 'privacy' || currentScreen === 'careers' || currentScreen === 'partners' || isAmadeusTestMode || isFlightSearchMode) {
    return componentToRender
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 font-times">
      {componentToRender}
      
      {!['auth', 'payment', 'qr', 'complete'].includes(currentScreen) && <ChatBot />}
      <CookieConsent />
    </div>
  )
}

export function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  )
}