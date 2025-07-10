import React from 'react'
import { Logo } from '../components/Logo'
import { PlanCard } from '../components/PlanCard'
import { Button } from '../components/Button'
import { useLanguage } from '../context/LanguageContext'
import { CredibilitySection } from '../components/CredibilitySection'
import { StickyBanner } from '../components/StickyBanner'
import { Footer } from '../components/Footer'
import { NavigationMenu } from '../components/NavigationMenu'
import { ArrowLeftIcon, GlobeIcon } from 'lucide-react'

export const PlanSelection = ({ onSelectPlan, navigateTo }) => {
  const { t, currentLanguage, changeLanguage, languages } = useLanguage()

  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  // Handle devices navigation
  const handleDevicesClick = () => {
    navigateTo('devices')
  }

  // Handle home navigation
  const handleHomeClick = () => {
    navigateTo('language')
  }

  // Sample data plans with translations including test plan
  const plans = [
    {
      id: 0,
      name: t('planTest'),
      duration: `1 ${t('daysUnit')}`,
      data: `100 MB`,
      price: 0,
      features: [
        t('featureHighSpeed'),
        t('featureJapanCoverage'),
        t('featureEasyActivation'),
      ],
    },
    {
      id: 1,
      name: t('planBasic'),
      duration: `3 ${t('daysUnit')}`,
      data: `1 ${t('gbUnit')}`,
      price: 900,
      features: [
        t('featureHighSpeed'),
        t('featureJapanCoverage'),
        t('featureEasyActivation'),
      ],
    },
    {
      id: 2,
      name: t('planStandard'),
      duration: `7 ${t('daysUnit')}`,
      data: `3 ${t('gbUnit')}`,
      price: 1900,
      features: [
        t('featureHighSpeed'),
        t('featureJapanCoverage'),
        t('featureEasyActivation'),
        t('featureHotspot'),
      ],
    },
    {
      id: 3,
      name: t('planPremium'),
      duration: `30 ${t('daysUnit')}`,
      data: `10 ${t('gbUnit')}`,
      price: 3900,
      features: [
        t('featureHighSpeed'),
        t('featureJapanCoverage'),
        t('featureEasyActivation'),
        t('featureHotspot'),
        t('featurePrioritySupport'),
      ],
    },
  ]

  return (
    <div className="min-h-screen japan-bg-torii">
      <NavigationMenu onNavigate={handleNavigate} />
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
          {/* Hero Section */}
          <div className="text-center mb-12 pt-8">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
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
            
            <h1 className="hero-title bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              {t('selectEsimPlan')}
            </h1>
            
            <p className="hero-subtitle text-gray-600 max-w-2xl mx-auto">
              {t('stayConnected')}
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onSelect={onSelectPlan} />
            ))}
          </div>

          <CredibilitySection />
        </main>

        <Footer />
      </div>
    </div>
  )
}