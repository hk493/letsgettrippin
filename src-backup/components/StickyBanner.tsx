import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { 
  SmartphoneIcon, 
  UserIcon, 
  GlobeIcon,
  HomeIcon,
  LogInIcon,
  MenuIcon,
  XIcon
} from 'lucide-react'
import { UserDashboard } from './UserDashboard'

export const StickyBanner = ({ onDevicesClick, onHomeClick }) => {
  const { t, currentLanguage, changeLanguage, languages } = useLanguage()
  const { isAuthenticated, user, login } = useAuth()
  const [showDashboard, setShowDashboard] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll to add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAuthClick = () => {
    if (isAuthenticated) {
      setShowDashboard(true)
    } else {
      login(currentLanguage.code)
    }
    setShowMobileMenu(false)
  }

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode)
    setShowMobileMenu(false)
  }

  const handleDevicesClickMobile = () => {
    onDevicesClick()
    setShowMobileMenu(false)
  }

  const handleHomeClickMobile = () => {
    onHomeClick()
    setShowMobileMenu(false)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileMenu && !event.target.closest('.mobile-menu-container')) {
        setShowMobileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showMobileMenu])

  return (
    <>
      {/* Sticky Banner */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-pink-200' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Left Side - Logo & Home (Desktop) */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3" onClick={onHomeClick}>
                <img
                  src="/datapocket-logo-latest.png"
                  alt="Datapocket Logo"
                  className="h-14 md:h-16 lg:h-18 w-auto object-contain cursor-pointer hover:scale-105 transition-transform"
                  onError={(e) => {
                    console.log('Primary logo failed, trying fallback...')
                    e.target.src = "/datapocket-logo.png"
                  }}
                />
                <div className="hidden md:block">
                  <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                    Datapocket
                  </h1>
                  <p className="text-sm text-gray-600">{t('japanEsimForTravelers')}</p>
                </div>
              </div>
              
              {/* Desktop Home Button */}
              <button
                onClick={onHomeClick}
                className="hidden md:flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/50"
              >
                <HomeIcon size={18} className="mr-1" />
                <span className="hidden lg:inline">{t('home')}</span>
              </button>
            </div>

            {/* Center - Mascot Message (Desktop only) */}
            <div className="hidden lg:flex items-center bg-gradient-to-r from-pink-100 to-blue-100 rounded-full px-4 py-2">
              <img 
                src="/datapocket-logo-latest.png" 
                alt="Datapocket Mascot" 
                className="w-8 h-8 mr-2 mascot-bounce object-contain"
                onError={(e) => {
                  console.log('Primary mascot image failed, trying fallback...')
                  e.target.src = "/datapocket-logo.png"
                  e.target.onerror = () => {
                    console.log('All mascot images failed, using emoji fallback')
                    e.target.style.display = 'none'
                    const fallback = document.createElement('div')
                    fallback.className = 'text-2xl mr-2 mascot-bounce'
                    fallback.textContent = '🦊'
                    e.target.parentNode.insertBefore(fallback, e.target.nextSibling)
                  }
                }}
              />
              <span className="text-sm font-medium text-gray-700">{t('kitsuneMessage')}</span>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2">
              {/* Desktop Menu Items */}
              <div className="hidden md:flex items-center space-x-4">
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

                {/* eSIM Compatible Devices */}
                <button
                  onClick={onDevicesClick}
                  className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/50"
                >
                  <SmartphoneIcon size={18} className="mr-2" />
                  <span className="hidden lg:inline">{t('esimCompatibleDevices')}</span>
                  <span className="lg:hidden">eSIM {t('devices')}</span>
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
                    <span>{user?.name || user?.email || t('account')}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleAuthClick}
                    className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <LogInIcon size={16} className="mr-1" />
                    {t('auth.login')}
                  </button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white/50 transition-colors"
                aria-label="メニューを開く"
              >
                {showMobileMenu ? (
                  <XIcon size={24} />
                ) : (
                  <MenuIcon size={24} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="md:hidden mobile-menu-container bg-white/95 backdrop-blur-md border-t border-pink-200 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-4">
                {/* Home */}
                <button
                  onClick={handleHomeClickMobile}
                  className="flex items-center w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                >
                  <HomeIcon size={20} className="mr-3" />
                  <span className="font-medium">{t('home')}</span>
                </button>

                {/* Language Selection */}
                <div className="px-4 py-2">
                  <div className="flex items-center mb-3">
                    <GlobeIcon size={20} className="mr-3 text-gray-600" />
                    <span className="font-medium text-gray-700">言語選択 / Language</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 ml-8">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                          currentLanguage.code === lang.code
                            ? 'bg-pink-100 text-pink-600 border border-pink-200'
                            : 'bg-gray-50 text-gray-700 hover:bg-pink-50'
                        }`}
                      >
                        <span className="text-lg mr-2">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* eSIM Compatible Devices */}
                <button
                  onClick={handleDevicesClickMobile}
                  className="flex items-center w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                >
                  <SmartphoneIcon size={20} className="mr-3" />
                  <div>
                    <div className="font-medium">eSIM対応デバイス</div>
                    <div className="text-sm text-gray-500">Compatible Devices</div>
                  </div>
                </button>

                {/* Login/Account */}
                {isAuthenticated ? (
                  <button
                    onClick={handleAuthClick}
                    className="flex items-center w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  >
                    {user?.picture ? (
                      <img 
                        src={user.picture} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full mr-3"
                      />
                    ) : (
                      <UserIcon size={20} className="mr-3" />
                    )}
                    <div>
                      <div className="font-medium">{user?.name || t('account')}</div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={handleAuthClick}
                    className="flex items-center w-full text-left px-4 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
                  >
                    <LogInIcon size={20} className="mr-3" />
                    <div>
                      <div className="font-medium">ログイン / Login</div>
                      <div className="text-sm opacity-90">アカウントにアクセス</div>
                    </div>
                  </button>
                )}

                {/* Mascot Message (Mobile) */}
                <div className="mt-4 pt-4 border-t border-pink-200">
                  <div className="flex items-center justify-center bg-gradient-to-r from-pink-100 to-blue-100 rounded-lg px-4 py-3">
                    <img 
                      src="/datapocket-logo-latest.png" 
                      alt="Datapocket Mascot" 
                      className="w-8 h-8 mr-2 mascot-bounce object-contain"
                      onError={(e) => {
                        console.log('Primary mascot image failed, trying fallback...')
                        e.target.src = "/datapocket-logo.png"
                        e.target.onerror = () => {
                          console.log('All mascot images failed, using emoji fallback')
                          e.target.style.display = 'none'
                          const fallback = document.createElement('div')
                          fallback.className = 'text-2xl mr-2 mascot-bounce'
                          fallback.textContent = '🦊'
                          e.target.parentNode.insertBefore(fallback, e.target.nextSibling)
                        }
                      }}
                    />
                    <span className="text-sm font-medium text-gray-700 text-center">
                      {t('kitsuneMessage')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spacer to prevent content from being hidden behind sticky banner */}
      <div className="h-20"></div>

      {/* User Dashboard Modal */}
      {showDashboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <UserDashboard onClose={() => setShowDashboard(false)} />
        </div>
      )}
    </>
  )
}