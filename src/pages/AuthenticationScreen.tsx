import React from 'react'
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import { StickyBanner } from '../components/StickyBanner'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import {
  UserIcon,
  ShieldCheckIcon,
  LogInIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from 'lucide-react'

export const AuthenticationScreen = ({ selectedPlan, onSuccess, onBack }) => {
  const { t } = useLanguage()
  const { login, isLoading, error } = useAuth()

  const handleLogin = async () => {
    try {
      await login()
      onSuccess()
    } catch (err) {
      console.error('Login error:', err)
    }
  }

  const handleDevicesClick = () => {
    // Navigate to devices page
    window.location.href = '/devices'
  }

  const handleHomeClick = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen japan-bg-torii">
      <div className="min-h-screen japan-bg-overlay">
        {/* Sticky Banner */}
        <StickyBanner 
          onDevicesClick={handleDevicesClick}
          onHomeClick={handleHomeClick}
        />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 floating-animation">🌸</div>
        <div className="absolute top-40 right-20 text-4xl opacity-30 floating-animation" style={{ animationDelay: '2s' }}>⛩️</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-25 floating-animation" style={{ animationDelay: '4s' }}>🗾</div>

        <main className="container mx-auto p-6 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Auth Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
                <img 
                  src="/ChatGPT_Image_2025年6月28日_14_25_54-removebg-preview.png" 
                  alt="Esimport Mascot" 
                  className="w-12 h-12 mr-3 mascot-bounce object-contain"
                  onError={(e) => {
                    console.log('Primary mascot image failed, trying fallback...')
                    e.target.src = "/ChatGPT_Image_2025年6月28日_14_25_54-removebg-preview copy.png"
                    e.target.onerror = () => {
                      console.log('All mascot images failed, using emoji fallback')
                      e.target.style.display = 'none'
                      const fallback = document.createElement('div')
                      fallback.className = 'text-3xl mr-3 mascot-bounce'
                      fallback.textContent = '🦊'
                      e.target.parentNode.insertBefore(fallback, e.target.nextSibling)
                    }
                  }}
                />
                <span className="font-medium text-gray-700">{t('almostThere')}</span>
              </div>
              
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                {t('auth.authRequired')}
              </h1>
            </div>

            {/* Auth Card */}
            <div className="feature-card">
              {/* Selected Plan Summary */}
              {selectedPlan && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
                  <h3 className="font-semibold text-blue-800 mb-4 flex items-center">
                    <CheckCircleIcon className="mr-2" size={20} />
                    {t('selectedPlan')}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">{t('plan')}:</p>
                      <p className="font-semibold">{selectedPlan.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{t('duration')}:</p>
                      <p className="font-semibold">{selectedPlan.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{t('data')}:</p>
                      <p className="font-semibold">{selectedPlan.data}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{t('price')}:</p>
                      <p className={`font-semibold ${selectedPlan.price === 0 ? 'text-green-600' : 'text-blue-600'}`}>
                        {selectedPlan.price === 0 ? t('freePlan') : `¥${selectedPlan.price.toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Auth Content */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShieldCheckIcon className="h-10 w-10 text-blue-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('auth.authRequired')}
                </h2>
                <p className="text-gray-600 mb-8">
                  {t('auth.pleaseLoginOrRegister')}
                </p>
              </div>

              {/* Auth0 Login Button */}
              <div className="space-y-6 mb-8">
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      {t('authenticating')}
                    </>
                  ) : (
                    <>
                      <LogInIcon size={20} className="mr-2" />
                      {t('auth.login')}
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {t('secureAuthentication')}
                  </p>
                </div>
              </div>

              {/* Error Messages */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              {/* Features */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4 text-center">
                  {t('whyAuthenticate')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <UserIcon size={20} className="text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">{t('accessQrCodes')}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ShieldCheckIcon size={20} className="text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600">{t('securePurchaseHistory')}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <UserIcon size={20} className="text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-600">{t('accountManagement')}</p>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-8 text-center">
                <Button variant="secondary" onClick={onBack} size="medium">
                  <ArrowLeftIcon size={18} className="mr-2" />
                  {t('back')}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}