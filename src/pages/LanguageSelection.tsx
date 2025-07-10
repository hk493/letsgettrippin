import React, { useState } from 'react'
import { Logo } from '../components/Logo'
import { LanguageButton } from '../components/LanguageButton'
import { Button } from '../components/Button'
import { HeroSection } from '../components/HeroSection'
import { FeaturesSection } from '../components/FeaturesSection'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { CTASection } from '../components/CTASection'
import { StickyBanner } from '../components/StickyBanner'
import { DemoAccessButton } from '../components/DemoAccessButton'
import { useLanguage } from '../context/LanguageContext'
import { CheckIcon, RocketIcon, ArrowRightIcon, SparklesIcon } from 'lucide-react'

export const LanguageSelection = ({ onContinue }) => {
  const { currentLanguage, changeLanguage, languages, t } = useLanguage()
  const [showLanguageModal, setShowLanguageModal] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage.code)

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode)
  }

  const handleConfirmLanguage = () => {
    changeLanguage(selectedLanguage)
    // Close the modal after language confirmation
    setTimeout(() => {
      setShowLanguageModal(false)
    }, 300)
  }

  const handleGetStarted = () => {
    onContinue()
  }

  const handleDevicesClick = () => {
    window.location.href = '/devices'
  }

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDemoAccess = () => {
    window.location.href = '/?demo=true'
  }

  const handleTravelPlannerAccess = () => {
    window.location.href = '/?planner=true'
  }

  return (
    <div className="min-h-screen japan-bg-sakura">
      <div className="min-h-screen japan-bg-overlay">
        {/* Sticky Banner - Only show when language modal is closed */}
        {!showLanguageModal && (
          <StickyBanner 
            onDevicesClick={handleDevicesClick}
            onHomeClick={handleHomeClick}
          />
        )}

        {/* Landing Page Content */}
        <HeroSection onGetStarted={handleGetStarted} />
        <FeaturesSection onGetStarted={handleGetStarted} />
        <HowItWorksSection onGetStarted={handleGetStarted} />
        <TestimonialsSection onGetStarted={handleGetStarted} />
        <CTASection onGetStarted={handleGetStarted} />

        {/* Demo Access Button */}
        <DemoAccessButton />

        {/* Travel Planner Access Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleTravelPlannerAccess}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center group shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <SparklesIcon className="w-5 h-5 mr-2" />
            <span>{t('aiTravelPlannerButton')}</span>
            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Language Selection Modal Overlay - Mobile Optimized */}
        {showLanguageModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-lg md:max-w-3xl max-h-[95vh] sm:max-h-[85vh] overflow-y-auto transform transition-all duration-300 scale-100">
              <div className="text-center mb-4 sm:mb-6">
                {/* Much Bigger Logo Section */}
                <div className="mb-6 sm:mb-8 flex flex-col items-center justify-center">
                  {/* Extra Large Logo */}
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 mb-6">
                    {/* Significantly bigger logo */}
                    <div className="flex-shrink-0">
                      <img
                        src="/datapocket-logo-latest.png"
                        alt="Datapocket Logo"
                        className="h-20 sm:h-24 md:h-32 lg:h-40 w-auto object-contain"
                        onError={(e) => {
                          console.log('Primary logo failed, trying fallback...')
                          e.target.src = "/datapocket-logo.png"
                        }}
                      />
                    </div>
                    <div className="text-center lg:text-left">
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                        Datapocket
                      </h1>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mt-2">
                        {t('yourJapanConnection')}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Kitsune below Welcome */}
                <div className="mb-4">
                  <img 
                    src="/datapocket-logo-latest.png" 
                    alt="Datapocket Mascot" 
                    className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 mx-auto mascot-bounce object-contain"
                    onError={(e) => {
                      console.log('Primary mascot image failed, trying fallback...')
                      e.target.src = "/datapocket-logo.png"
                      e.target.onerror = () => {
                        console.log('All mascot images failed, using emoji fallback')
                        e.target.style.display = 'none'
                        const fallback = document.createElement('div')
                        fallback.className = 'text-4xl sm:text-5xl md:text-6xl mascot-bounce'
                        fallback.textContent = '🦊'
                        e.target.parentNode.appendChild(fallback)
                      }
                    }}
                  />
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome to Datapocket
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 px-2">Choose your language to continue</p>
              </div>

              {/* Language Grid - Mobile Optimized */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {languages.map((lang) => (
                  <div key={lang.code} className="w-full">
                    <button
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`
                        flex flex-col items-center p-3 sm:p-4 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105
                        ${selectedLanguage === lang.code
                          ? 'bg-gradient-to-br from-pink-100 to-blue-100 border-2 border-pink-300 scale-105' 
                          : 'bg-white hover:bg-gray-50 border-2 border-transparent hover:border-gray-200'
                        }
                        w-full group
                      `}
                    >
                      <div className={`text-2xl sm:text-3xl md:text-4xl mb-2 transition-transform duration-300 ${selectedLanguage === lang.code ? 'scale-110' : 'group-hover:scale-110'}`}>
                        {lang.flag}
                      </div>
                      <div className={`text-sm sm:text-base font-semibold transition-colors duration-300 text-center ${selectedLanguage === lang.code ? 'text-indigo-600' : 'text-gray-800'}`}>
                        {lang.name}
                      </div>
                      {selectedLanguage === lang.code && (
                        <div className="mt-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Demo Access in Modal */}
              <div className="mb-4 text-center">
                <button
                  onClick={handleDemoAccess}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center mx-auto group shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <RocketIcon className="w-4 h-4 mr-2" />
                  <span>新体験をプレビュー</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-gray-500 mt-2">次世代DataPocketを体験</p>
              </div>

              {/* Travel Planner Access in Modal */}
              <div className="mb-4 text-center">
                <button
                  onClick={handleTravelPlannerAccess}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center mx-auto group shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  <span>{t('aiTravelPlannerButton')}</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-gray-500 mt-2">AIが完璧な旅程を作成</p>
              </div>

              {/* Confirmation Section - Mobile Optimized */}
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="inline-flex items-center bg-gradient-to-r from-pink-100 to-blue-100 rounded-full px-3 sm:px-4 py-2 mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Selected: {languages.find(l => l.code === selectedLanguage)?.flag} {languages.find(l => l.code === selectedLanguage)?.name}
                  </span>
                </div>
                
                <button
                  onClick={handleConfirmLanguage}
                  className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-4 sm:px-6 py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <CheckIcon size={16} className="mr-2" />
                  <span className="text-center leading-tight">
                    Confirm Language<br className="sm:hidden" />
                    <span className="hidden sm:inline"> / </span>
                    <span className="text-xs sm:text-sm opacity-90">
                      言語を確定 / 确认语言 / 언어 확정
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}