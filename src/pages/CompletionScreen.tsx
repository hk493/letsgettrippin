import React, { useState } from 'react'
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import { StickyBanner } from '../components/StickyBanner'
import { useLanguage } from '../context/LanguageContext'
import { CheckCircleIcon, UserIcon, ArrowLeftIcon, StarIcon, HeartIcon } from 'lucide-react'
import { UserDashboard } from '../components/UserDashboard'

export const CompletionScreen = ({ plan, orderId, onRestart }) => {
  const { t } = useLanguage()
  const [showDashboard, setShowDashboard] = useState(false)

  const handleDevicesClick = () => {
    window.location.href = '/devices'
  }

  const handleHomeClick = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen japan-bg-mountain">
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
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircleIcon size={48} className="text-green-500" />
              </div>
              
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                {t('downloadComplete')}
              </h1>
              
              <img 
                src="/ChatGPT_Image_2025年6月28日_14_25_54-removebg-preview.png" 
                alt="Esimport Mascot" 
                className="w-24 h-24 mx-auto mb-4 mascot-bounce object-contain"
                onError={(e) => {
                  console.log('Primary mascot image failed, trying fallback...')
                  e.target.src = "/ChatGPT_Image_2025年6月28日_14_25_54-removebg-preview copy.png"
                  e.target.onerror = () => {
                    console.log('All mascot images failed, using emoji fallback')
                    e.target.style.display = 'none'
                    const fallback = document.createElement('div')
                    fallback.className = 'text-6xl mb-4 mascot-bounce'
                    fallback.textContent = '🦊'
                    e.target.parentNode.appendChild(fallback)
                  }
                }}
              />
              
              <p className="text-xl text-gray-600 mb-8">
                {t('complete')}
              </p>
            </div>

            {/* Completion Card */}
            <div className="feature-card">
              {/* Order Summary */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg text-green-800 mb-2">
                    🎉 {t('yourJapanEsim')}
                  </h3>
                  <p className="text-green-700 text-sm">
                    {t('confirmationSent')}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">{t('orderId')}:</p>
                    <p className="font-semibold text-green-600">#{orderId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t('plan')}:</p>
                    <p className="font-semibold">{plan?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t('duration')}:</p>
                    <p className="font-semibold">{plan?.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t('data')}:</p>
                    <p className="font-semibold">{plan?.data}</p>
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  {plan?.price === 0 ? (
                    <span className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                      <HeartIcon size={16} className="mr-1" />
                      {t('freePlan')} - {t('noCharge')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                      <CheckCircleIcon size={16} className="mr-1" />
                      {t('paid')}: ¥{plan?.price?.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                <h4 className="font-bold text-lg mb-4 text-blue-800 text-center">
                  {t('whatsNext')}
                </h4>
                <ol className="space-y-3 text-sm text-blue-700">
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    {t('checkEmail')}
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    {t('scanWhenArrive')}
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    {t('enjoyAdventure')}
                  </li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => setShowDashboard(true)}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <UserIcon size={18} className="mr-2" />
                  {t('auth.accountSettings')}
                </button>

                <button 
                  onClick={onRestart} 
                  className="btn-secondary w-full"
                >
                  {t('restart')}
                </button>
              </div>

              {/* Thank You Message */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <div className="text-2xl mb-2">🙏</div>
                <p className="text-gray-600 text-sm">
                  {t('thankYouChoosing')}
                </p>
                <div className="flex items-center justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {showDashboard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <UserDashboard onClose={() => setShowDashboard(false)} />
          </div>
        )}
      </div>
    </div>
  )
}