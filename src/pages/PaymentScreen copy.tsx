import React, { useEffect, useState } from 'react'
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { TermsAndConditions } from '../components/TermsAndConditions'
import { StickyBanner } from '../components/StickyBanner'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { sendPurchaseConfirmationEmail, sendActivationInstructions } from '../utils/emailService'
import { formatPrice, supportedCurrencies, getFixedPrice } from '../utils/exchangeRates'
import {
  CreditCardIcon,
  QrCodeIcon,
  AppleIcon,
  SmartphoneIcon,
  AlertCircleIcon,
  ShieldCheckIcon,
  GlobeIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

// Initialize Stripe with publishable key
const stripePromise = loadStripe(
  'pk_test_51RZ6JJ04z3oMa6p2jezeePg39hs0ByNMw3oNOac7MsqPcOhrkNdSsZufMGFcSPE0h9Y300FxWmajcTxqCHmkCKBU00ES1RmeMw',
)

const CheckoutForm = ({ plan, onSuccess, onCancel, currency, exchangeRates }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setIsProcessing(true)
    setError(null)
    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setError(submitError.message)
        setIsProcessing(false)
        return
      }
      // Here you would typically create a payment intent on your backend
      // For demo purposes, we'll simulate a successful payment
      setTimeout(() => {
        setIsProcessing(false)
        onSuccess()
      }, 2000)
    } catch (err) {
      setError('An unexpected error occurred.')
      setIsProcessing(false)
    }
  }

  // Get the fixed price for the current plan and currency
  const getPlanPrice = () => {
    if (plan?.price === 0) return 0
    
    let planType = 'basic'
    if (plan?.price === 1900) planType = 'standard'
    else if (plan?.price === 3900) planType = 'premium'
    
    return getFixedPrice(planType, currency)
  }

  const currentPrice = getPlanPrice()
  const formattedPrice = formatPrice(currentPrice, currency)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && (
        <div className="text-red-500 flex items-center gap-2 p-4 bg-red-50 rounded-lg">
          <AlertCircleIcon size={16} />
          <span>{error}</span>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isProcessing}
          type="button"
          className="btn-secondary"
        >
          {t('back')}
        </Button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="btn-primary flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              {t('processing')}
            </>
          ) : (
            `${t('pay')} ${formattedPrice}`
          )}
        </button>
      </div>
    </form>
  )
}

export const PaymentScreen = ({ plan, onPaymentComplete, onCancel, currency = 'JPY', exchangeRates = {} }) => {
  const { t, currentLanguage } = useLanguage()
  const { user, addOrder } = useAuth()
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState(currency)
  const [showCurrencySelector, setShowCurrencySelector] = useState(false)

  const options = {
    mode: 'payment',
    currency: selectedCurrency.toLowerCase(),
    amount: plan?.price || 0,
    appearance: {
      theme: 'stripe',
    },
  }

  const handleCurrencyChange = (newCurrency) => {
    setSelectedCurrency(newCurrency)
    setShowCurrencySelector(false)
  }

  const handleDevicesClick = () => {
    window.location.href = '/devices'
  }

  const handleHomeClick = () => {
    window.location.href = '/'
  }

  // Get the fixed price for the current plan and selected currency
  const getCurrentPrice = () => {
    if (plan?.price === 0) return 0
    
    let planType = 'basic'
    if (plan?.price === 1900) planType = 'standard'
    else if (plan?.price === 3900) planType = 'premium'
    
    return getFixedPrice(planType, selectedCurrency)
  }

  // Handle free plan flow
  const handleFreeQrCode = async () => {
    const orderId = `ORD-${Date.now()}`
    
    // Add order to user's history
    if (user) {
      addOrder({
        id: orderId,
        planName: plan.name,
        price: plan.price,
        duration: plan.duration,
        data: plan.data,
        date: new Date().toISOString(),
        status: 'Active'
      })
    }
    
    // Send confirmation email for free plan with language
    if (user?.email) {
      await sendPurchaseConfirmationEmail({
        orderId,
        planName: plan.name,
        price: plan.price,
        duration: plan.duration,
        data: plan.data,
        customerEmail: user.email,
        customerName: user.name || 'Customer',
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://esim-activation-${orderId}.com/activate`,
        activationInstructions: 'Follow the steps in the email to activate your eSIM',
        language: currentLanguage.code // 現在の言語を渡す
      })

      await sendActivationInstructions(user.email, plan.name, currentLanguage.code)
    }

    onPaymentComplete(orderId)
  }

  const handlePaymentSuccess = async () => {
    const orderId = `ORD-${Date.now()}`
    
    // Add order to user's history
    if (user) {
      addOrder({
        id: orderId,
        planName: plan.name,
        price: plan.price,
        duration: plan.duration,
        data: plan.data,
        date: new Date().toISOString(),
        status: 'Active'
      })
    }
    
    // Send confirmation email for paid plan with language
    if (user?.email) {
      await sendPurchaseConfirmationEmail({
        orderId,
        planName: plan.name,
        price: plan.price,
        duration: plan.duration,
        data: plan.data,
        customerEmail: user.email,
        customerName: user.name || 'Customer',
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://esim-activation-${orderId}.com/activate`,
        activationInstructions: 'Follow the steps in the email to activate your eSIM',
        language: currentLanguage.code // 現在の言語を渡す
      })

      await sendActivationInstructions(user.email, plan.name, currentLanguage.code)
    }

    onPaymentComplete(orderId)
  }

  const currentPrice = getCurrentPrice()
  const formattedPrice = formatPrice(currentPrice, selectedCurrency)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 wave-pattern">
      {/* Sticky Banner */}
      <StickyBanner 
        onDevicesClick={handleDevicesClick}
        onHomeClick={handleHomeClick}
      />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-20 floating-animation">🌸</div>
      <div className="absolute top-40 right-20 text-4xl opacity-30 floating-animation" style={{ animationDelay: '2s' }}>⛩️</div>
      <div className="absolute bottom-40 left-20 text-5xl opacity-25 floating-animation" style={{ animationDelay: '4s' }}>🍜</div>
      
      <main className="container mx-auto p-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Payment Header */}
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
              <span className="font-medium text-gray-700">{t('almostTherePayment')}</span>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {t('payment')}
            </h1>
          </div>

          {/* Payment Card */}
          <div className="feature-card">
            {/* Plan Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">{plan?.name}</h2>
                <div className="flex items-center space-x-2">
                  {/* Currency Selector */}
                  <div className="relative">
                    <button
                      onClick={() => setShowCurrencySelector(!showCurrencySelector)}
                      className="btn-secondary flex items-center"
                    >
                      <GlobeIcon size={18} className="mr-2" />
                      {selectedCurrency}
                    </button>
                    
                    {showCurrencySelector && (
                      <div className="absolute right-0 top-full mt-2 bg-white border rounded-lg shadow-lg z-10 min-w-[250px]">
                        <div className="p-2">
                          <h3 className="font-semibold text-sm text-gray-700 mb-2 px-2">
                            {t('changeCurrency')}
                          </h3>
                          {supportedCurrencies.map((curr) => (
                            <button
                              key={curr.code}
                              onClick={() => handleCurrencyChange(curr.code)}
                              className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm ${
                                selectedCurrency === curr.code ? 'bg-blue-50 text-blue-600' : ''
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="font-medium">{curr.symbol} {curr.code}</span>
                                  <div className="text-xs text-gray-500">{curr.country}</div>
                                </div>
                                {plan?.price > 0 && (
                                  <div className="text-right">
                                    <div className="font-medium">
                                      {formatPrice(getFixedPrice(
                                        plan?.price === 900 ? 'basic' : 
                                        plan?.price === 1900 ? 'standard' : 'premium', 
                                        curr.code
                                      ), curr.code)}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-600 text-sm">{t('duration')}:</p>
                  <p className="font-semibold">{plan?.duration}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{t('data')}:</p>
                  <p className="font-semibold">{plan?.data}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('price')}:</span>
                  <span className={`font-bold text-2xl ${plan?.price === 0 ? 'text-green-600' : 'text-indigo-600'}`}>
                    {plan?.price === 0 ? t('freePlan') : formattedPrice}
                  </span>
                </div>
                {selectedCurrency !== 'JPY' && plan?.price > 0 && (
                  <p className="text-sm text-gray-500 text-right mt-1">
                    (¥{plan?.price?.toLocaleString()})
                  </p>
                )}
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="mb-8">
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-300"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                  {t('agreeTerms')}
                </span>
              </label>
              <button
                onClick={() => setShowTerms(true)}
                className="text-blue-500 hover:text-blue-600 text-sm underline ml-8 mt-2 transition-colors"
                type="button"
              >
                {t('viewTerms')}
              </button>
            </div>

            {/* Free Plan Button */}
            {termsAccepted && plan?.price === 0 && (
              <div className="text-center py-8">
                <div className="text-green-600 mb-4">
                  <CheckCircleIcon size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-green-600 mb-2">{t('freePlan')}</h3>
                <p className="text-gray-600 mb-6">{t('noPaymentRequired')}</p>
                <button
                  onClick={handleFreeQrCode}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto"
                >
                  <QrCodeIcon size={20} className="mr-2" />
                  {t('getQrCode')}
                </button>
              </div>
            )}

            {/* Stripe Payment Element */}
            {termsAccepted && plan?.price > 0 && (
              <div className="mb-8">
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm
                    plan={plan}
                    onSuccess={handlePaymentSuccess}
                    onCancel={onCancel}
                    currency={selectedCurrency}
                    exchangeRates={exchangeRates}
                  />
                </Elements>
              </div>
            )}

            {!termsAccepted && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {t('acceptTermsMessage')}
                </p>
              </div>
            )}

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <ShieldCheckIcon className="h-5 w-5 text-green-400 mr-3" />
                <p className="text-sm text-green-700">
                  {plan?.price === 0 
                    ? t('noPaymentRequired')
                    : t('securePayments')
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Terms Modal */}
      <Modal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title={t('termsTitle')}
      >
        <TermsAndConditions />
      </Modal>
    </div>
  )
}