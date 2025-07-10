import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { BookingFlow } from '../components/BookingFlow'
import { NavigationMenu } from '../components/NavigationMenu'
import { 
  CalendarIcon, 
  MapPinIcon, 
  DollarSignIcon, 
  UsersIcon, 
  HeartIcon, 
  HomeIcon, 
  CarIcon, 
  SparklesIcon,
  ArrowRightIcon,
  CheckIcon,
  StarIcon,
  ClockIcon,
  WifiIcon,
  GlobeIcon
} from 'lucide-react'

// Separate component for the generating step to properly handle hooks
const GeneratingStepContent = () => {
  const { t } = useLanguage()
  const [dots, setDots] = useState('')
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="mb-8">
        <img 
          src="/
          Trippin-logo-latest.png" 
          alt="Trippin AI" 
          className="w-32 h-32 mx-auto mb-6 animate-pulse object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none'
            const fallback = document.createElement('div')
            fallback.innerText = '🦊'
            fallback.setAttribute('class', 'text-8xl mb-6 animate-pulse')
            target.parentNode?.appendChild(fallback)
          }}
        />
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('generatingPlans')}</h2>
        <p className="text-xl text-gray-600 mb-8">
          Creating your perfect itinerary{dots}
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mr-3"></div>
            <span className="text-gray-700">Analyzing your preferences...</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500 mr-3"></div>
            <span className="text-gray-700">Finding the best attractions...</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500 mr-3"></div>
            <span className="text-gray-700">Optimizing your itinerary...</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const TravelPlannerPage = () => {
  const { t, currentLanguage, changeLanguage, languages } = useLanguage()

  const handleNavigate = (path: string) => {
    window.location.href = path;
  };
  const [currentStep, setCurrentStep] = useState('greeting')
  const [userPreferences, setUserPreferences] = useState({
    destination: '',
    dates: '',
    budget: '',
    travelStyle: '',
    interests: [],
    accommodation: '',
    transportation: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPlans, setGeneratedPlans] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [showBookingFlow, setShowBookingFlow] = useState(false)

  // Mock data for destinations
  const destinations = [
    { id: 'tokyo', name: t('tokyo'), emoji: '🏙️', description: t('tokyoDesc') },
    { id: 'kyoto', name: t('kyoto'), emoji: '⛩️', description: t('kyotoDesc') },
    { id: 'osaka', name: t('osaka'), emoji: '🍜', description: t('osakaDesc') },
    { id: 'hiroshima', name: t('hiroshima'), emoji: '🕊️', description: t('hiroshimaDesc') },
    { id: 'nara', name: t('nara'), emoji: '🦌', description: t('naraDesc') },
    { id: 'hakone', name: t('hakone'), emoji: '🗻', description: t('hakoneDesc') }
  ]

  // Travel dates options
  const travelDates = [
    { id: 'spring', name: t('spring'), emoji: '🌸', description: t('springDesc') },
    { id: 'summer', name: t('summer'), emoji: '☀️', description: t('summerDesc') },
    { id: 'autumn', name: t('autumn'), emoji: '🍁', description: t('autumnDesc') },
    { id: 'winter', name: t('winter'), emoji: '❄️', description: t('winterDesc') }
  ]

  // Budget options
  const budgetOptions = [
    { id: 'budget', name: '¥50,000-100,000', emoji: '💰', description: 'Budget-friendly adventure' },
    { id: 'mid', name: '¥100,000-200,000', emoji: '💎', description: 'Comfortable exploration' },
    { id: 'luxury', name: '¥200,000+', emoji: '👑', description: 'Luxury experience' }
  ]

  // Travel styles
  const travelStyles = [
    { id: 'cultural', name: 'Cultural Explorer', emoji: '🏛️', description: 'Temples, museums, traditions' },
    { id: 'foodie', name: 'Food Lover', emoji: '🍣', description: 'Culinary adventures' },
    { id: 'nature', name: 'Nature Enthusiast', emoji: '🌲', description: 'Mountains, gardens, hot springs' },
    { id: 'modern', name: 'Modern Traveler', emoji: '🌆', description: 'Cities, shopping, technology' }
  ]

  // Interests
  const interests = [
    { id: 'temples', name: 'Temples & Shrines', emoji: '⛩️' },
    { id: 'food', name: 'Local Cuisine', emoji: '🍜' },
    { id: 'shopping', name: 'Shopping', emoji: '🛍️' },
    { id: 'nature', name: 'Nature & Parks', emoji: '🌳' },
    { id: 'museums', name: 'Museums & Art', emoji: '🎨' },
    { id: 'nightlife', name: 'Nightlife', emoji: '🌃' },
    { id: 'festivals', name: 'Festivals & Events', emoji: '🎭' },
    { id: 'anime', name: 'Anime & Manga', emoji: '🎌' }
  ]

  // Accommodation types
  const accommodationTypes = [
    { id: 'hotel', name: 'Hotels', emoji: '🏨', description: 'Comfort and service' },
    { id: 'ryokan', name: 'Traditional Ryokan', emoji: '🏮', description: 'Authentic Japanese experience' },
    { id: 'hostel', name: 'Hostels', emoji: '🛏️', description: 'Budget-friendly and social' },
    { id: 'airbnb', name: 'Apartments', emoji: '🏠', description: 'Local living experience' }
  ]

  // Transportation options
  const transportationOptions = [
    { id: 'jr_pass', name: 'JR Pass', emoji: '🚅', description: 'Unlimited train travel' },
    { id: 'local_trains', name: 'Local Trains', emoji: '🚃', description: 'City-specific travel' },
    { id: 'rental_car', name: 'Rental Car', emoji: '🚗', description: 'Freedom to explore' },
    { id: 'walking_cycling', name: 'Walking & Cycling', emoji: '🚶', description: 'Eco-friendly exploration' }
  ]

  const handleNext = () => {
    const steps = ['greeting', 'destination', 'dates', 'budget', 'style', 'interests', 'accommodation', 'transportation', 'generating', 'plans']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const handleSelection = (field, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Auto-advance for single selections
    if (field !== 'interests') {
      setTimeout(handleNext, 500)
    }
  }

  const handleInterestToggle = (interestId) => {
    setUserPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }))
  }

  const generatePlans = async () => {
    // 入力バリデーション
    if (!userPreferences.destination || !userPreferences.dates || !userPreferences.origin) {
      alert('出発地・目的地・日付をすべて選択してください');
      return;
    }
    setIsGenerating(true)
    setCurrentStep('generating')
    try {
      const response = await fetch('/api/v1/travel/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPreferences)
      })
      if (!response.ok) {
        const err = await response.json()
        alert(err.error || 'Failed to generate plan')
        setIsGenerating(false)
        setCurrentStep('plans')
        return
      }
      const data = await response.json()
      setGeneratedPlans([data])
      setIsGenerating(false)
      setCurrentStep('plans')
    } catch (e) {
      alert('AIプラン生成中にエラーが発生しました')
      setIsGenerating(false)
      setCurrentStep('plans')
    }
  }

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan)
    setShowBookingFlow(true)
  }

  const handleBookingComplete = (bookingData) => {
    console.log('Booking completed:', bookingData)
    // Navigate to confirmation or success page
    setCurrentStep('booking-complete')
  }

  const handleBookingCancel = () => {
    setShowBookingFlow(false)
    setSelectedPlan(null)
  }

  // Show booking flow if selected
  if (showBookingFlow && selectedPlan) {
    return (
      <BookingFlow
        selectedPlan={selectedPlan}
        onBookingComplete={handleBookingComplete}
        onCancel={handleBookingCancel}
      />
    )
  }

  const renderGreetingStep = () => (
    <div className="text-center max-w-4xl mx-auto">
      <div className="mb-8">
        <img 
          src="/trippin-logo.png" 
          alt="Trippin AI" 
          className="w-24 h-24 mx-auto mb-6 mascot-bounce object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
            const fallback = document.createElement('div')
            fallback.innerText = '🦊'
            fallback.className = 'text-6xl mb-6 mascot-bounce'
            (e.target as HTMLImageElement).parentNode?.appendChild(fallback)
          }}
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Hello! I'm Poketto
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {t('greeting')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
        >
          <SparklesIcon className="w-6 h-6 mx-auto mb-2" />
          {t('startPlanning')}
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                currentLanguage.code === lang.code
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="text-2xl mb-1">{lang.flag}</div>
              <div className="text-sm font-medium">{lang.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderDestinationStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('askDestination')}</h2>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <button
            key={dest.id}
            onClick={() => handleSelection('destination', dest.id)}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
              userPreferences.destination === dest.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
            }`}
          >
            <div className="text-4xl mb-3">{dest.emoji}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{dest.name}</h3>
            <p className="text-gray-600 text-sm">{dest.description}</p>
          </button>
        ))}
      </div>
    </div>
  )

  const renderDatesStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('askDates')}</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {travelDates.map((date) => (
          <button
            key={date.id}
            onClick={() => handleSelection('dates', date.id)}
            className={`p-8 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 bg-white shadow-lg hover:shadow-xl ${
              userPreferences.dates === date.id
                ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-200'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-5xl mb-4">{date.emoji}</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">{date.name}</h3>
            <p className="text-gray-600">{date.description}</p>
          </button>
        ))}
      </div>
    </div>
  )

  const renderBudgetStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('askBudget')}</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {budgetOptions.map((budget) => (
          <button
            key={budget.id}
            onClick={() => handleSelection('budget', budget.id)}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 bg-white shadow-lg hover:shadow-xl ${
              userPreferences.budget === budget.id
                ? 'border-green-500 bg-green-50 ring-4 ring-green-200'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <div className="text-4xl mb-3">{budget.emoji}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{budget.name}</h3>
            <p className="text-gray-600 text-sm">{budget.description}</p>
          </button>
        ))}
      </div>
    </div>
  )

  const renderStyleStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('askTravelStyle')}</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {travelStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => handleSelection('travelStyle', style.id)}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 bg-white shadow-lg hover:shadow-xl ${
              userPreferences.travelStyle === style.id
                ? 'border-purple-500 bg-purple-50 ring-4 ring-purple-200'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="text-4xl mb-3">{style.emoji}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{style.name}</h3>
            <p className="text-gray-600 text-sm">{style.description}</p>
          </button>
        ))}
      </div>
    </div>
  )

  const renderInterestsStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('askInterests')}</h2>
        <p className="text-gray-600">Select all that interest you</p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {interests.map((interest) => (
          <button
            key={interest.id}
            onClick={() => handleInterestToggle(interest.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 bg-white shadow-md hover:shadow-lg ${
              userPreferences.interests.includes(interest.id)
                ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-200'
                : 'border-gray-200 hover:border-pink-300'
            }`}
          >
            <div className="text-3xl mb-2">{interest.emoji}</div>
            <h3 className="text-sm font-bold text-gray-800">{interest.name}</h3>
          </button>
        ))}
      </div>
      
      {userPreferences.interests.length > 0 && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
          >
            Continue with {userPreferences.interests.length} interests
            <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
          </button>
        </div>
      )}
    </div>
  )

  const renderAccommodationStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('askAccommodation')}</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {accommodationTypes.map((acc) => (
          <button
            key={acc.id}
            onClick={() => handleSelection('accommodation', acc.id)}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 bg-white shadow-lg hover:shadow-xl ${
              userPreferences.accommodation === acc.id
                ? 'border-indigo-500 bg-indigo-50 ring-4 ring-indigo-200'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="text-4xl mb-3">{acc.emoji}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{acc.name}</h3>
            <p className="text-gray-600 text-sm">{acc.description}</p>
          </button>
        ))}
      </div>
    </div>
  )

  const renderTransportationStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('askTransportation')}</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {transportationOptions.map((transport) => (
          <button
            key={transport.id}
            onClick={() => {
              handleSelection('transportation', transport.id)
              setTimeout(generatePlans, 500)
            }}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 bg-white shadow-lg hover:shadow-xl ${
              userPreferences.transportation === transport.id
                ?   'border-teal-500 bg-teal-50 ring-4 ring-teal-200'
                : 'border-gray-200 hover:border-teal-300'
            }`}
          >
            <div className="text-4xl mb-3">{transport.emoji}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{transport.name}</h3>
            <p className="text-gray-600 text-sm">{transport.description}</p>
          </button>
        ))}
      </div>
    </div>
  )

  const renderPlansStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('plansReady')}</h2>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {generatedPlans.map((plan, idx) => (
          <div
            key={plan.id || idx}
            className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${selectedPlan?.id === plan.id ? 'ring-4 ring-blue-500' : ''}`}
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
              <h3 className="text-xl font-bold mb-2">{plan.name || plan.plan?.[0]?.date || 'AI Plan'}</h3>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">{plan.duration || ''}</span>
                <span className="text-2xl font-bold">{plan.totalCost || ''}</span>
              </div>
            </div>
            <div className="p-6">
              {/* ハイライト */}
              {plan.highlights && (
                <div className="mb-4">
                  <h4 className="font-bold text-gray-800 mb-2">{t('highlights')}</h4>
                  <ul className="space-y-1">
                    {plan.highlights.slice(0, 3).map((highlight, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <StarIcon className="w-4 h-4 text-yellow-500 mr-2" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* eSIM */}
              {plan.esimRecommendation && (
                <div className="mb-4">
                  <h4 className="font-bold text-gray-800 mb-2">{t('esim')}</h4>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <WifiIcon className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="text-sm font-medium text-blue-700">{plan.esimRecommendation}</span>
                    </div>
                  </div>
                </div>
              )}
              {/* フライト情報 */}
              {plan.flights && plan.flights.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-bold text-gray-800 mb-2">おすすめフライト</h4>
                  <ul className="space-y-2">
                    {plan.flights.slice(0, 2).map((flight, i) => (
                      <li key={flight.id || i} className="text-sm text-gray-700 border rounded p-2">
                        <div>航空会社: {flight.itineraries?.[0]?.segments?.[0]?.carrierCode || ''} {flight.itineraries?.[0]?.segments?.[0]?.number || ''}</div>
                        <div>出発: {flight.itineraries?.[0]?.segments?.[0]?.departure?.iataCode} {flight.itineraries?.[0]?.segments?.[0]?.departure?.at}</div>
                        <div>到着: {flight.itineraries?.[0]?.segments?.[0]?.arrival?.iataCode} {flight.itineraries?.[0]?.segments?.[0]?.arrival?.at}</div>
                        <div>価格: {flight.price?.total} {flight.price?.currency}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* ホテル情報 */}
              {plan.hotels && plan.hotels.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-bold text-gray-800 mb-2">おすすめホテル</h4>
                  <ul className="space-y-2">
                    {plan.hotels.slice(0, 2).map((hotel, i) => (
                      <li key={hotel.id || i} className="text-sm text-gray-700 border rounded p-2">
                        <div>ホテル名: {hotel.name}</div>
                        <div>価格: {hotel.offers?.[0]?.price?.total} {hotel.offers?.[0]?.price?.currency}</div>
                        <div>部屋タイプ: {hotel.offers?.[0]?.room?.type}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Tripadvisorホテル */}
              {plan.tripadvisorHotels && plan.tripadvisorHotels.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-bold text-green-700 mb-2 flex items-center"><img src="/tripadvisor-icon.png" alt="Tripadvisor" className="w-6 h-6 mr-2" />Tripadvisorおすすめホテル</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {plan.tripadvisorHotels.map((hotel, i) => (
                      <div key={hotel.id || i} className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all p-4 flex flex-col items-center border">
                        <img src={hotel.thumbnail} alt={hotel.name} className="w-24 h-24 rounded-xl object-cover mb-2 shadow-lg" />
                        <h3 className="text-lg font-bold mb-1 text-gray-900">{hotel.name}</h3>
                        <div className="flex items-center mb-1">
                          <span className="text-yellow-400 mr-1">{'★'.repeat(Math.round(hotel.rating || 0))}</span>
                          <span className="font-semibold text-gray-700">{hotel.rating}</span>
                          <span className="ml-2 text-gray-500 text-xs">({hotel.reviewCount} reviews)</span>
                        </div>
                        <div className="flex gap-1 mb-1 flex-wrap">
                          {hotel.tags && hotel.tags.map((tag, j) => (
                            <span key={j} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">{tag}</span>
                          ))}
                        </div>
                        <div className="mb-2 text-base font-bold text-green-600">{hotel.priceRange}</div>
                        <a
                          href={hotel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white py-2 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center mt-2"
                        >
                          <img src="/tripadvisor-icon.png" alt="Tripadvisor" className="w-5 h-5 mr-2" />
                          Tripadvisorで詳細を見る
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Tripadvisor体験 */}
              {plan.tripadvisorExperiences && plan.tripadvisorExperiences.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-bold text-green-700 mb-2 flex items-center"><img src="/tripadvisor-icon.png" alt="Tripadvisor" className="w-6 h-6 mr-2" />Tripadvisorおすすめ体験</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {plan.tripadvisorExperiences.map((exp, i) => (
                      <div key={exp.id || i} className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all p-4 flex flex-col items-center border">
                        <img src={exp.thumbnail} alt={exp.name} className="w-24 h-24 rounded-xl object-cover mb-2 shadow-lg" />
                        <h3 className="text-lg font-bold mb-1 text-gray-900">{exp.name}</h3>
                        <div className="flex items-center mb-1">
                          <span className="text-yellow-400 mr-1">{'★'.repeat(Math.round(exp.rating || 0))}</span>
                          <span className="font-semibold text-gray-700">{exp.rating}</span>
                          <span className="ml-2 text-gray-500 text-xs">({exp.reviewCount} reviews)</span>
                        </div>
                        <div className="flex gap-1 mb-1 flex-wrap">
                          {exp.tags && exp.tags.map((tag, j) => (
                            <span key={j} className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-semibold">{tag}</span>
                          ))}
                        </div>
                        <div className="mb-2 text-base font-bold text-green-600">{exp.priceRange}</div>
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white py-2 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center mt-2"
                        >
                          <img src="/tripadvisor-icon.png" alt="Tripadvisor" className="w-5 h-5 mr-2" />
                          Tripadvisorで詳細を見る
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={() => handlePlanSelect(plan)}
                className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${selectedPlan?.id === plan.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {selectedPlan?.id === plan.id ? t('selected') : t('selectEsimPlan')}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {selectedPlan && (
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">{t('planDetails')}</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4 text-gray-800">{t('itinerary')}</h4>
              <div className="space-y-4">
                {selectedPlan.itinerary.map((day) => (
                  <div key={day.day} className="border rounded-lg p-4">
                    <h5 className="font-bold text-blue-600 mb-2">{t('day')} {day.day} - {day.location}</h5>
                    <div className="space-y-2">
                      {day.activities.map((activity, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium text-gray-600">{t(activity.time.toLowerCase())}:</span>
                            <span className="ml-2 text-gray-800">{activity.activity}</span>
                          </div>
                          <span className="text-green-600 font-medium">{activity.cost}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4 text-gray-800">{t('planSummary')}</h4>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-600">{t('totalCost')}:</span>
                    <span className="text-2xl font-bold text-green-600">{selectedPlan.totalCost}</span>
                  </div>
                  <p className="text-sm text-gray-500">{t('perPerson')}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('accommodation')}:</span>
                    <span className="font-medium">{selectedPlan.accommodation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('transportation')}:</span>
                    <span className="font-medium">{selectedPlan.transportation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('duration')}:</span>
                    <span className="font-medium">{selectedPlan.duration}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handlePlanSelect(selectedPlan)}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <WifiIcon className="w-5 h-5 mr-2 inline" />
                  {t('bookEsim')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'greeting':
        return renderGreetingStep()
      case 'destination':
        return renderDestinationStep()
      case 'dates':
        return renderDatesStep()
      case 'budget':
        return renderBudgetStep()
      case 'style':
        return renderStyleStep()
      case 'interests':
        return renderInterestsStep()
      case 'accommodation':
        return renderAccommodationStep()
      case 'transportation':
        return renderTransportationStep()
      case 'generating':
        return <GeneratingStepContent />
      case 'plans':
        return renderPlansStep()
      default:
        return renderGreetingStep()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <NavigationMenu onNavigate={handleNavigate} />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-8xl floating-animation">🌸</div>
        <div className="absolute top-40 right-20 text-6xl floating-animation" style={{ animationDelay: '2s' }}>⛩️</div>
        <div className="absolute bottom-20 left-1/4 text-7xl floating-animation" style={{ animationDelay: '4s' }}>🗾</div>
        <div className="absolute bottom-40 right-10 text-5xl floating-animation" style={{ animationDelay: '1s' }}>🍜</div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {renderCurrentStep()}
      </div>
    </div>
  )
}