import React from 'react'
import { Button } from './Button'
import {
  WifiIcon,
  GlobeIcon,
  ZapIcon,
  SmartphoneIcon,
  HeadphonesIcon,
  GiftIcon,
  StarIcon,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { getFixedPrice, formatPrice } from '../utils/exchangeRates'

export const PlanCard = ({ plan, onSelect, currency = 'JPY', exchangeRates = {} }) => {
  const { t } = useLanguage()

  // Map features to icons for all languages
  const getFeatureIcon = (feature) => {
    const iconMap = {
      [t('featureHighSpeed')]: <ZapIcon className="text-blue-500 h-4 w-4" />,
      [t('featureJapanCoverage')]: (
        <GlobeIcon className="text-blue-500 h-4 w-4" />
      ),
      [t('featureEasyActivation')]: (
        <SmartphoneIcon className="text-blue-500 h-4 w-4" />
      ),
      [t('featureHotspot')]: <WifiIcon className="text-blue-500 h-4 w-4" />,
      [t('featurePrioritySupport')]: (
        <HeadphonesIcon className="text-blue-500 h-4 w-4" />
      ),
    }
    return (
      iconMap[feature] || <div className="w-2 h-2 rounded-full bg-blue-500" />
    )
  }

  const isTestPlan = plan.price === 0

  // Get translated plan name
  const getPlanName = () => {
    if (plan.id === 0) return t('planTest')
    if (plan.id === 1) return t('planBasic')
    if (plan.id === 2) return t('planStandard')
    if (plan.id === 3) return t('planPremium')
    return plan.name
  }

  // Get translated plan subtitle
  const getPlanSubtitle = () => {
    if (plan.id === 0) return t('planTestDesc')
    if (plan.id === 1) return t('planBasicDesc')
    if (plan.id === 2) return t('planStandardDesc')
    if (plan.id === 3) return t('planPremiumDesc')
    return ''
  }

  // Get fixed price based on plan and currency
  const getConvertedPrice = () => {
    if (plan.price === 0) return { amount: 0, symbol: '', formatted: 'FREE' }
    
    let planType = 'basic'
    if (plan.price === 1900) planType = 'standard'
    else if (plan.price === 3900) planType = 'premium'
    
    const fixedPrice = getFixedPrice(planType, currency)
    const formatted = formatPrice(fixedPrice, currency)
    
    return {
      amount: fixedPrice,
      formatted
    }
  }

  const priceInfo = getConvertedPrice()

  return (
    <div className={`feature-card relative group hover:scale-105 transition-all duration-300 ${
      isTestPlan ? 'border-2 border-green-300 bg-gradient-to-br from-green-50 to-white' : 'bg-white'
    }`}>
      {/* Popular Badge */}
      {plan.id === 2 && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center">
          <StarIcon size={12} className="mr-1" />
          POPULAR
        </div>
      )}

      {/* Free Badge */}
      {isTestPlan && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
          <GiftIcon size={12} className="mr-1" />
          FREE
        </div>
      )}

      {/* Plan Header */}
      <div className={`rounded-2xl p-6 mb-6 ${
        isTestPlan 
          ? 'bg-gradient-to-br from-green-100 to-emerald-100' 
          : plan.id === 2 
            ? 'bg-gradient-to-br from-pink-100 to-purple-100'
            : 'bg-gradient-to-br from-blue-100 to-indigo-100'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-xl font-bold ${
              isTestPlan ? 'text-green-800' : plan.id === 2 ? 'text-purple-800' : 'text-blue-800'
            }`}>
              {getPlanName()}
            </h3>
            <p className={`text-sm mt-1 ${
              isTestPlan ? 'text-green-600' : plan.id === 2 ? 'text-purple-600' : 'text-blue-600'
            }`}>
              {getPlanSubtitle()}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isTestPlan ? 'bg-green-200' : plan.id === 2 ? 'bg-purple-200' : 'bg-blue-200'
          }`}>
            <WifiIcon className={`h-6 w-6 ${
              isTestPlan ? 'text-green-600' : plan.id === 2 ? 'text-purple-600' : 'text-blue-600'
            }`} />
          </div>
        </div>

        {/* Price */}
        <div className="text-center">
          {isTestPlan ? (
            <div>
              <span className="text-3xl font-bold text-green-600">FREE</span>
              <p className="text-sm text-green-600 mt-1">Perfect for testing</p>
            </div>
          ) : (
            <div>
              <span className={`text-3xl font-bold ${
                plan.id === 2 ? 'text-purple-800' : 'text-blue-800'
              }`}>
                {priceInfo.formatted}
              </span>
              {currency !== 'JPY' && (
                <p className="text-sm text-gray-500 mt-1">
                  (¥{plan.price.toLocaleString()})
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Plan Details */}
      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm">{t('duration')}</p>
            <p className="font-bold text-lg">{plan.duration}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">{t('data')}</p>
            <p className="font-bold text-lg">{plan.data}</p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <div className="mr-3 flex-shrink-0">{getFeatureIcon(feature)}</div>
              <span className="text-gray-700 text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-auto">
        <button
          onClick={() => onSelect(plan)}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
            isTestPlan
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
              : plan.id === 2
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white pulse-glow'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
          }`}
        >
          {isTestPlan ? t('planTestButton') : t('continue')}
        </button>
      </div>
    </div>
  )
}