import React, { useState } from 'react'
import { TravelModeApp } from '../components/TravelModeApp'
import { NewLandingPage } from '../components/NewLandingPage'
import { BrandIdentity } from '../components/BrandIdentity'
import { Button } from '../components/Button'
import { 
  ArrowLeftIcon,
  SmartphoneIcon,
  PaletteIcon,
  GlobeIcon,
  EyeIcon
} from 'lucide-react'

export const TravelExperiencePage = () => {
  const [currentView, setCurrentView] = useState('landing')

  const handleGetStarted = () => {
    // Navigate to plan selection or existing flow
    window.location.href = '/plans'
  }

  const renderNavigation = () => (
    <div className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-2">
      <div className="flex space-x-2">
        <button
          onClick={() => setCurrentView('landing')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            currentView === 'landing' 
              ? 'bg-blue-500 text-white shadow-lg' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <GlobeIcon className="w-4 h-4 mr-2 inline" />
          Landing
        </button>
        
        <button
          onClick={() => setCurrentView('app')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            currentView === 'app' 
              ? 'bg-purple-500 text-white shadow-lg' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <SmartphoneIcon className="w-4 h-4 mr-2 inline" />
          Travel App
        </button>
        
        <button
          onClick={() => setCurrentView('brand')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            currentView === 'brand' 
              ? 'bg-pink-500 text-white shadow-lg' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <PaletteIcon className="w-4 h-4 mr-2 inline" />
          Brand
        </button>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (currentView) {
      case 'landing':
        return <NewLandingPage onGetStarted={handleGetStarted} />
      case 'app':
        return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <TravelModeApp />
          </div>
        )
      case 'brand':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <BrandIdentity />
          </div>
        )
      default:
        return <NewLandingPage onGetStarted={handleGetStarted} />
    }
  }

  return (
    <div className="relative">
      {renderNavigation()}
      {renderContent()}
      
      {/* Back to Original */}
      <button
        onClick={() => window.location.href = '/'}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all z-50"
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </button>
    </div>
  )
}