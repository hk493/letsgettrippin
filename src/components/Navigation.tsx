import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { UserIcon, HomeIcon, SmartphoneIcon, GlobeIcon } from 'lucide-react'
import { UserDashboard } from './UserDashboard'
import { Logo } from './Logo'

export const Navigation = ({ currentScreen, onAuthClick, showBackToHome = false, onDevicesClick }) => {
  const { t, currentLanguage, changeLanguage, languages } = useLanguage()
  const { isAuthenticated, user, login } = useAuth()
  const [showDashboard, setShowDashboard] = useState(false)

  const handleAuthClick = () => {
    if (isAuthenticated) {
      setShowDashboard(true)
    } else {
      login(currentLanguage.code)
    }
  }

  const handleHomeClick = () => {
    window.location.href = '/'
  }

  const handleDevicesClick = () => {
    if (onDevicesClick) {
      onDevicesClick()
    }
  }

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-pink-100">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Logo size="small" onClick={handleHomeClick} />
              <div className="hidden md:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                  Esimport
                </h1>
                <p className="text-xs text-gray-600">{t('japanEsimForTravelers')}</p>
              </div>
              
              {showBackToHome && (
                <button
                  onClick={handleHomeClick}
                  className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/50"
                >
                  <HomeIcon size={18} className="mr-1" />
                  {t('home')}
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <select
                value={currentLanguage.code}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-white/90 border border-pink-200 rounded-full px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>

              {/* eSIM Compatible Devices Link */}
              <button
                onClick={handleDevicesClick}
                className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/50"
              >
                <SmartphoneIcon size={18} className="mr-2" />
                <span className="hidden md:inline">{t('esimCompatibleDevices')}</span>
                <span className="md:hidden">{t('devices')}</span>
              </button>

              {/* Auth Button */}
              {isAuthenticated ? (
                <button
                  onClick={handleAuthClick}
                  className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/50"
                >
                  {user?.picture ? (
                    <img 
                      src={user.picture} 
                      alt="Profile" 
                      className="w-6 h-6 rounded-full mr-2"
                    />
                  ) : (
                    <UserIcon size={18} className="mr-2" />
                  )}
                  <span className="hidden md:inline">{user?.name || user?.email || t('account')}</span>
                  <span className="md:hidden">{t('account')}</span>
                </button>
              ) : (
                <button
                  onClick={handleAuthClick}
                  className="btn-secondary text-sm"
                >
                  {t('auth.login')}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showDashboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <UserDashboard onClose={() => setShowDashboard(false)} />
        </div>
      )}
    </>
  )
}