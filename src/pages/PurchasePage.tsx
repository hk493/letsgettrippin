import React, { useState, useEffect } from 'react'
import { Logo } from '../components/Logo'
import { PlanCard } from '../components/PlanCard'
import { PaymentScreen } from './PaymentScreen'
import { QRCodeScreen } from './QRCodeScreen'
import { CompletionScreen } from './CompletionScreen'
import { StickyBanner } from '../components/StickyBanner'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { CredibilitySection } from '../components/CredibilitySection'
import { Button } from '../components/Button'
import { fetchExchangeRates, supportedCurrencies, getUpdatedPlanPrices } from '../utils/exchangeRates'
import { GlobeIcon } from 'lucide-react'

export const PurchasePage = () => {
  const { t } = useLanguage()
  const { user, addOrder } = useAuth()
  const [currentStep, setCurrentStep] = useState('plans') // plans, payment, qr, complete
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [orderId, setOrderId] = useState(null)
  const [currency, setCurrency] = useState('JPY')
  const [exchangeRates, setExchangeRates] = useState({})
  const [showCurrencySelector, setShowCurrencySelector] = useState(false)

  // Fetch exchange rates on component mount and every 5 minutes
  useEffect(() => {
    const loadExchangeRates = async () => {
      const rates = await fetchExchangeRates()
      setExchangeRates(rates)
    }

    loadExchangeRates()
    const interval = setInterval(loadExchangeRates, 5 * 60 * 1000) // Update every 5 minutes

    return () => clearInterval(interval)
  }, [])

  // Get updated prices based on current currency
  const updatedPrices = getUpdatedPlanPrices(exchangeRates, currency)

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
      price: updatedPrices.basic,
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
      price: updatedPrices.standard,
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
      price: updatedPrices.premium,
      features: [
        t('featureHighSpeed'),
        t('featureJapanCoverage'),
        t('featureEasyActivation'),
        t('featureHotspot'),
        t('featurePrioritySupport'),
      ],
    },
  ]

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan)
    // Always go to payment screen, even for 0 yen plans
    setCurrentStep('payment')
  }

  const handlePaymentComplete = (orderNumber) => {
    setOrderId(orderNumber)
    
    // Add order to user's history
    if (user) {
      addOrder({
        id: orderNumber,
        planName: selectedPlan.name,
        price: selectedPlan.price,
        duration: selectedPlan.duration,
        data: selectedPlan.data,
        date: new Date().toISOString(),
        status: 'Active'
      })
    }
    
    setCurrentStep('qr')
  }

  const handleRestart = () => {
    setCurrentStep('plans')
    setSelectedPlan(null)
    setOrderId(null)
    // Navigate to home
    window.location.href = '/'
  }

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency)
    setShowCurrencySelector(false)
  }

  const handleDevicesClick = () => {
    window.location.href = '/devices'
  }

  const handleHomeClick = () => {
    window.location.href = '/'
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'plans':
        return (
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
            <StickyBanner 
              onDevicesClick={handleDevicesClick}
              onHomeClick={handleHomeClick}
            />

            <main className="flex-grow container mx-auto p-6">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-center flex-grow">
                  {t('selectEsimPlan')}
                </h1>
                
                {/* Currency Selector */}
                <div className="relative">
                  <Button
                    variant="secondary"
                    size="medium"
                    onClick={() => setShowCurrencySelector(!showCurrencySelector)}
                  >
                    <GlobeIcon size={18} className="mr-2" />
                    {currency}
                  </Button>
                  
                  {showCurrencySelector && (
                    <div className="absolute right-0 top-full mt-2 bg-white border rounded-lg shadow-lg z-10 min-w-[200px]">
                      <div className="p-2">
                        <h3 className="font-semibold text-sm text-gray-700 mb-2 px-2">
                          {t('changeCurrency')}
                        </h3>
                        {supportedCurrencies.map((curr) => (
                          <button
                            key={curr.code}
                            onClick={() => handleCurrencyChange(curr.code)}
                            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm ${
                              currency === curr.code ? 'bg-blue-50 text-blue-600' : ''
                            }`}
                          >
                            <span className="font-medium">{curr.symbol} {curr.code}</span>
                            <span className="text-gray-500 ml-2">{curr.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {plans.map((plan) => (
                  <PlanCard 
                    key={plan.id} 
                    plan={plan} 
                    onSelect={handlePlanSelect}
                    currency={currency}
                    exchangeRates={exchangeRates}
                  />
                ))}
              </div>

              <CredibilitySection />
            </main>
          </div>
        )
      case 'payment':
        return (
          <PaymentScreen
            plan={selectedPlan}
            onPaymentComplete={handlePaymentComplete}
            onCancel={() => setCurrentStep('plans')}
            currency={currency}
            exchangeRates={exchangeRates}
          />
        )
      case 'qr':
        return (
          <QRCodeScreen 
            plan={selectedPlan}
            orderId={orderId}
            onContinue={() => setCurrentStep('complete')} 
          />
        )
      case 'complete':
        return (
          <CompletionScreen 
            plan={selectedPlan}
            orderId={orderId}
            onRestart={handleRestart} 
          />
        )
      default:
        return null
    }
  }

  return renderStep()
}