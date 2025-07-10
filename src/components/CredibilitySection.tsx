import React from 'react'
import { ShieldCheckIcon, ZapIcon, GlobeIcon } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export const CredibilitySection = () => {
  const { t } = useLanguage()

  const features = [
    {
      icon: <ShieldCheckIcon className="h-6 w-6 text-blue-500" />,
      label: t('securePayments'),
    },
    {
      icon: <ZapIcon className="h-6 w-6 text-blue-500" />,
      label: t('instantActivation'),
    },
    {
      icon: <GlobeIcon className="h-6 w-6 text-blue-500" />,
      label: t('globalCoverage'),
    },
  ]

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm py-8 rounded-2xl shadow-lg border border-pink-100">
      <div className="container mx-auto px-6">
        {/* Mascot Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-gradient-to-r from-pink-100 to-blue-100 rounded-full px-6 py-3 mb-6 shadow-lg">
            {/* Fixed mascot image path */}
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
            <span className="font-medium text-gray-700">{t('kitsuneMessage')}</span>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">{t('happyTravelers').split('\n')[0]}</div>
            <div className="text-sm text-gray-600">{t('happyTravelers').split('\n')[1]}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600 mb-1">{t('uptime').split('\n')[0]}</div>
            <div className="text-sm text-gray-600">{t('uptime').split('\n')[1]}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{t('rating').split('\n')[0]}</div>
            <div className="text-sm text-gray-600">{t('rating').split('\n')[1]}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{t('support247').split('\n')[0]}</div>
            <div className="text-sm text-gray-600">{t('support247').split('\n')[1]}</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="p-3 bg-blue-50 rounded-full mb-3">
                {feature.icon}
              </div>
              <div className="text-gray-600 font-medium text-sm">{feature.label}</div>
            </div>
          ))}
        </div>

        {/* Pricing Info */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="font-bold text-lg text-indigo-600">{t('startingFrom')}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">{t('setupTime').replace('\n', ' ')}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">{t('costSavings').replace('\n', ' ')}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">{t('fullCoverage').replace('\n', ' ')}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">{t('bankEncryption').replace('\n', ' ')}</div>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            {t('connected')}
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            {t('stayConnected')}
          </p>
          <div className="text-lg font-semibold text-gray-800">
            {t('readyToConnect')}
          </div>
        </div>
      </div>
    </div>
  )
}