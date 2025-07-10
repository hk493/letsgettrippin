import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { 
  PlaneIcon, 
  HotelIcon, 
  CalendarIcon, 
  UsersIcon, 
  CreditCardIcon,
  CheckIcon,
  WifiIcon,
  ArrowRightIcon,
  LoaderIcon,
  MapPinIcon,
  ClockIcon
} from 'lucide-react'

interface BookingFlowProps {
  selectedPlan: any
  onBookingComplete: (bookingData: any) => void
  onCancel: () => void
}

interface DataPlan {
  id: string
  name: string
  data: string
  price: number
  description: string
}

interface FlightOffer {
  id: string
  price: {
    total: string
    currency: string
  }
  itineraries: Array<{
    duration: string
    segments: Array<{
      departure: {
        iataCode: string
        at: string
      }
      arrival: {
        iataCode: string
        at: string
      }
      carrierCode: string
      number: string
    }>
  }>
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ selectedPlan, onBookingComplete, onCancel }) => {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState('existing-bookings')
  const [hasExistingBookings, setHasExistingBookings] = useState<{flight: boolean, hotel: boolean}>({
    flight: false,
    hotel: false
  })
  const [selectedDataPlan, setSelectedDataPlan] = useState<DataPlan | null>(null)
  const [searchParams, setSearchParams] = useState({
    origin: 'NRT',
    destination: 'LAX',
    departureDate: '2025-07-10',
    returnDate: '2025-07-17',
    adults: 1
  })
  const [flightOffers, setFlightOffers] = useState<FlightOffer[]>([])
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(null)
  const [travelerInfo, setTravelerInfo] = useState([{
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: 'JP'
  }])
  const [isLoading, setIsLoading] = useState(false)
  const [isSearchingFlights, setIsSearchingFlights] = useState(false)
  const [bookingResult, setBookingResult] = useState<any>(null)

  // データプラン選択肢（1GBは無料、その他は有料）
  const dataPlans: DataPlan[] = [
    {
      id: '1gb',
      name: t('dataPlan1GB'),
      data: '1GB',
      price: 0,
      description: t('dataPlan1GBDesc')
    },
    {
      id: '3gb',
      name: t('dataPlan3GB'),
      data: '3GB',
      price: 1500,
      description: t('dataPlan3GBDesc')
    },
    {
      id: '5gb',
      name: t('dataPlan5GB'),
      data: '5GB',
      price: 2500,
      description: t('dataPlan5GBDesc')
    },
    {
      id: '10gb',
      name: t('dataPlan10GB'),
      data: '10GB',
      price: 4000,
      description: t('dataPlan10GBDesc')
    }
  ]

  const handleExistingBookingsNext = () => {
    if (!hasExistingBookings.flight && !hasExistingBookings.hotel) {
      // 両方予約が必要な場合 - フライト検索から開始
      searchFlights()
    } else if (!hasExistingBookings.flight) {
      // フライトのみ予約が必要
      searchFlights()
    } else if (!hasExistingBookings.hotel) {
      // ホテルのみ予約が必要
      setCurrentStep('search-hotels')
    } else {
      // 両方既に予約済み、データプラン選択へ
      setCurrentStep('data-plan')
    }
  }

  const searchFlights = async () => {
    setIsSearchingFlights(true)
    setCurrentStep('search-flights')
    
    try {
      console.log('フライト検索を開始...')
      const res = await fetch('/.netlify/functions/searchFlights')
      const data = await res.json()
      console.log('フライト検索結果:', data)
      
      if (data.data && Array.isArray(data.data)) {
        setFlightOffers(data.data)
      } else {
        console.warn('フライトデータが見つかりません:', data)
        // モックデータを使用
        setFlightOffers([
          {
            id: 'mock-1',
            price: { total: '85000', currency: 'JPY' },
            itineraries: [{
              duration: 'PT11H30M',
              segments: [{
                departure: { iataCode: 'NRT', at: '2025-07-10T10:00:00' },
                arrival: { iataCode: 'LAX', at: '2025-07-10T06:30:00' },
                carrierCode: 'JL',
                number: '62'
              }]
            }]
          }
        ])
      }
    } catch (error) {
      console.error('フライト検索エラー:', error)
      // エラー時はモックデータを表示
      setFlightOffers([
        {
          id: 'mock-1',
          price: { total: '85000', currency: 'JPY' },
          itineraries: [{
            duration: 'PT11H30M',
            segments: [{
              departure: { iataCode: 'NRT', at: '2025-07-10T10:00:00' },
              arrival: { iataCode: 'LAX', at: '2025-07-10T06:30:00' },
              carrierCode: 'JL',
              number: '62'
            }]
          }]
        }
      ])
    } finally {
      setIsSearchingFlights(false)
    }
  }

  const handleFlightSelect = (flight: FlightOffer) => {
    setSelectedFlight(flight)
    if (!hasExistingBookings.hotel) {
      setCurrentStep('search-hotels')
    } else {
      setCurrentStep('data-plan')
    }
  }

  const handleDataPlanSelect = (plan: DataPlan) => {
    setSelectedDataPlan(plan)
    setCurrentStep('traveler-info')
  }

  const createBooking = async () => {
    setIsLoading(true)
    try {
      // 総費用計算
      const flightCost = selectedFlight?.price?.total ? parseFloat(selectedFlight.price.total) : 0
      const dataCost = selectedDataPlan?.price || 0
      const totalCost = flightCost + dataCost

      const completeBookingData = {
        selectedPlan,
        selectedDataPlan,
        selectedFlight,
        totalCost,
        travelerInfo,
        confirmationNumbers: [`FL-${Date.now()}`, `DP-${Date.now()}`]
      }

      setBookingResult(completeBookingData)
      setCurrentStep('confirmation')
      onBookingComplete(completeBookingData)
    } catch (error) {
      console.error('予約作成エラー:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDuration = (duration: string) => {
    // PT11H30M -> 11時間30分
    const match = duration.match(/PT(\d+)H(\d+)M/)
    if (match) {
      return `${match[1]}時間${match[2]}分`
    }
    return duration
  }

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const renderExistingBookingsStep = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('existingBookingsTitle')}</h2>
      <p className="text-gray-600 mb-8 text-center">{t('existingBookingsDesc')}</p>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <PlaneIcon className="w-6 h-6 text-blue-500 mr-3" />
            <h3 className="text-lg font-semibold">{t('flightBooking')}</h3>
          </div>
          <p className="text-gray-600 mb-4">{t('flightBookingQuestion')}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => setHasExistingBookings(prev => ({ ...prev, flight: true }))}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                hasExistingBookings.flight 
                  ? 'border-green-500 bg-green-50 text-green-700' 
                  : 'border-gray-300 hover:border-green-300'
              }`}
            >
              {t('yes')}
            </button>
            <button
              onClick={() => setHasExistingBookings(prev => ({ ...prev, flight: false }))}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                !hasExistingBookings.flight 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              {t('no')}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <HotelIcon className="w-6 h-6 text-purple-500 mr-3" />
            <h3 className="text-lg font-semibold">{t('hotelBooking')}</h3>
          </div>
          <p className="text-gray-600 mb-4">{t('hotelBookingQuestion')}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => setHasExistingBookings(prev => ({ ...prev, hotel: true }))}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                hasExistingBookings.hotel 
                  ? 'border-green-500 bg-green-50 text-green-700' 
                  : 'border-gray-300 hover:border-green-300'
              }`}
            >
              {t('yes')}
            </button>
            <button
              onClick={() => setHasExistingBookings(prev => ({ ...prev, hotel: false }))}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                !hasExistingBookings.hotel 
                  ? 'border-purple-500 bg-purple-50 text-purple-700' 
                  : 'border-gray-300 hover:border-purple-300'
              }`}
            >
              {t('no')}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleExistingBookingsNext}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          {t('continue')}
          <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
        </button>
      </div>
    </div>
  )

  const renderFlightSearchStep = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">フライト検索結果</h2>
      
      {isSearchingFlights ? (
        <div className="text-center py-12">
          <LoaderIcon className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600">フライトを検索中...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {flightOffers.map((offer) => (
            <div
              key={offer.id}
              className={`bg-white p-6 rounded-xl shadow-lg border-2 transition-all cursor-pointer hover:shadow-xl ${
                selectedFlight?.id === offer.id 
                  ? 'border-blue-500 ring-4 ring-blue-200' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => handleFlightSelect(offer)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {offer.itineraries[0]?.segments.map((segment, index) => (
                    <div key={index} className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-2">
                        <PlaneIcon className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold">{segment.carrierCode} {segment.number}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="font-bold">{segment.departure.iataCode}</div>
                          <div className="text-sm text-gray-500">
                            {formatDateTime(segment.departure.at)}
                          </div>
                        </div>
                        <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                        <div className="text-center">
                          <div className="font-bold">{segment.arrival.iataCode}</div>
                          <div className="text-sm text-gray-500">
                            {formatDateTime(segment.arrival.at)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span>飛行時間: {formatDuration(offer.itineraries[0]?.duration || '')}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    ¥{parseInt(offer.price.total).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">1名様</div>
                </div>
              </div>
              
              {selectedFlight?.id === offer.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-green-600">
                    <CheckIcon className="w-5 h-5 mr-2" />
                    <span className="font-semibold">選択済み</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {selectedFlight && (
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  if (!hasExistingBookings.hotel) {
                    setCurrentStep('search-hotels')
                  } else {
                    setCurrentStep('data-plan')
                  }
                }}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all"
              >
                選択したフライトで続行
                <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )

  const renderDataPlanStep = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('selectDataPlan')}</h2>
      <p className="text-gray-600 mb-8 text-center">{t('dataPlanDescription')}</p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dataPlans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white p-6 rounded-xl shadow-lg border-2 transition-all cursor-pointer hover:shadow-xl ${
              selectedDataPlan?.id === plan.id 
                ? 'border-blue-500 ring-4 ring-blue-200' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => handleDataPlanSelect(plan)}
          >
            <div className="text-center">
              <WifiIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold mb-2">
                {plan.price === 0 ? (
                  <span className="text-green-600">{t('free')}</span>
                ) : (
                  <span className="text-blue-600">¥{plan.price.toLocaleString()}</span>
                )}
              </div>
              <div className="text-gray-600 mb-4">{plan.data}</div>
              <p className="text-sm text-gray-500">{plan.description}</p>
              
              {plan.price === 0 && (
                <div className="mt-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {t('recommended')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedDataPlan && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentStep('traveler-info')}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all"
          >
            {t('continueWithPlan')} ({selectedDataPlan.name})
            <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
          </button>
        </div>
      )}
    </div>
  )

  const renderTravelerInfoStep = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('travelerInformation')}</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('firstName')}
              </label>
              <input
                type="text"
                value={travelerInfo[0].firstName}
                onChange={(e) => setTravelerInfo([{ ...travelerInfo[0], firstName: e.target.value }])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('lastName')}
              </label>
              <input
                type="text"
                value={travelerInfo[0].lastName}
                onChange={(e) => setTravelerInfo([{ ...travelerInfo[0], lastName: e.target.value }])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('email')}
            </label>
            <input
              type="email"
              value={travelerInfo[0].email}
              onChange={(e) => setTravelerInfo([{ ...travelerInfo[0], email: e.target.value }])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('phone')}
            </label>
            <input
              type="tel"
              value={travelerInfo[0].phone}
              onChange={(e) => setTravelerInfo([{ ...travelerInfo[0], phone: e.target.value }])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('dateOfBirth')}
            </label>
            <input
              type="date"
              value={travelerInfo[0].dateOfBirth}
              onChange={(e) => setTravelerInfo([{ ...travelerInfo[0], dateOfBirth: e.target.value }])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setCurrentStep('data-plan')}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
          >
            {t('back')}
          </button>
          <button
            onClick={createBooking}
            disabled={isLoading || !travelerInfo[0].firstName || !travelerInfo[0].lastName || !travelerInfo[0].email}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <LoaderIcon className="w-5 h-5 mr-2 inline animate-spin" />
                {t('processing')}
              </>
            ) : (
              <>
                {t('completeBooking')}
                <CheckIcon className="w-5 h-5 ml-2 inline" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )

  const renderConfirmationStep = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <CheckIcon className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4 text-green-600">{t('bookingConfirmed')}</h2>
        
        {bookingResult && (
          <div className="space-y-4 text-left">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">{t('bookingSummary')}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{t('travelPlan')}:</span>
                  <span>{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('dataPlan')}:</span>
                  <span>{selectedDataPlan?.name}</span>
                </div>
                {selectedFlight && (
                  <div className="flex justify-between">
                    <span>フライト:</span>
                    <span>¥{parseInt(selectedFlight.price.total).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold">
                  <span>{t('totalCost')}:</span>
                  <span>¥{bookingResult.totalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {bookingResult.confirmationNumbers.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{t('confirmationNumbers')}</h3>
                {bookingResult.confirmationNumbers.map((number: string, index: number) => (
                  <div key={index} className="text-sm font-mono">
                    {number}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          {t('returnToHome')}
        </button>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'existing-bookings':
        return renderExistingBookingsStep()
      case 'search-flights':
        return renderFlightSearchStep()
      case 'data-plan':
        return renderDataPlanStep()
      case 'traveler-info':
        return renderTravelerInfoStep()
      case 'confirmation':
        return renderConfirmationStep()
      default:
        return renderExistingBookingsStep()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-6">
        {renderCurrentStep()}
      </div>
    </div>
  )
}