import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { MapPinIcon, VibrateIcon as TranslateIcon, CameraIcon, GiftIcon, FeatherIcon as WeatherIcon, CompassIcon, StarIcon, HeartIcon, ShareIcon, QrCodeIcon, WifiIcon, BatteryIcon, SunIcon, CloudIcon, BrainIcon as RainIcon, SunSnowIcon as SnowIcon, NavigationIcon, TicketIcon, TrendingUpIcon, AwardIcon, ZapIcon } from 'lucide-react'

interface TravelModeProps {
  currentLocation?: {
    country: string
    city: string
    lat: number
    lng: number
  }
  esimStatus?: {
    dataRemaining: string
    daysRemaining: number
    signalStrength: number
  }
}

export const TravelModeApp: React.FC<TravelModeProps> = ({ 
  currentLocation = { country: 'Japan', city: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  esimStatus = { dataRemaining: '2.3GB', daysRemaining: 5, signalStrength: 4 }
}) => {
  const { t, currentLanguage } = useLanguage()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('home')
  const [weather, setWeather] = useState({
    temp: 24,
    condition: 'sunny',
    humidity: 65
  })
  const [nearbySpots, setNearbySpots] = useState([
    { id: 1, name: 'Senso-ji Temple', distance: '0.8km', rating: 4.8, category: 'temple', hasDiscount: true },
    { id: 2, name: 'Tokyo Skytree', distance: '1.2km', rating: 4.9, category: 'landmark', hasDiscount: false },
    { id: 3, name: 'Asakusa Food Street', distance: '0.3km', rating: 4.7, category: 'food', hasDiscount: true }
  ])
  const [travelPoints, setTravelPoints] = useState(1250)
  const [visitedPlaces, setVisitedPlaces] = useState(8)

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny': return <SunIcon className="w-6 h-6 text-yellow-500" />
      case 'cloudy': return <CloudIcon className="w-6 h-6 text-gray-500" />
      case 'rainy': return <RainIcon className="w-6 h-6 text-blue-500" />
      case 'snowy': return <SnowIcon className="w-6 h-6 text-blue-300" />
      default: return <SunIcon className="w-6 h-6 text-yellow-500" />
    }
  }

  const getSignalBars = () => {
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={`w-1 h-3 rounded-full ${
          i < esimStatus.signalStrength ? 'bg-green-500' : 'bg-gray-300'
        }`}
        style={{ height: `${(i + 1) * 3 + 3}px` }}
      />
    ))
  }

  const renderHomeTab = () => (
    <div className="space-y-6">
      {/* Welcome Header with Mascot */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Welcome to {currentLocation.city}!</h2>
              <p className="text-blue-100">Your pocket travel companion</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <img 
                src="/datapocket-logo-latest.png" 
                alt="DataPocket Mascot" 
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>
          
          {/* Travel Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{visitedPlaces}</div>
              <div className="text-xs text-blue-100">Places Visited</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{travelPoints}</div>
              <div className="text-xs text-blue-100">Travel Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{esimStatus.daysRemaining}</div>
              <div className="text-xs text-blue-100">Days Left</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        <button className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
            <TranslateIcon className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-xs font-medium text-gray-700">Translate</span>
        </button>
        
        <button className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
            <MapPinIcon className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-xs font-medium text-gray-700">Navigate</span>
        </button>
        
        <button className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
            <CameraIcon className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-xs font-medium text-gray-700">AR Scan</span>
        </button>
        
        <button className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-2 relative">
            <GiftIcon className="w-6 h-6 text-pink-600" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </div>
          <span className="text-xs font-medium text-gray-700">Coupons</span>
        </button>
      </div>

      {/* Weather & Connection Status */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Weather</span>
            {getWeatherIcon()}
          </div>
          <div className="text-2xl font-bold text-gray-800">{weather.temp}°C</div>
          <div className="text-xs text-gray-500">Humidity {weather.humidity}%</div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Connection</span>
            <div className="flex items-center space-x-1">
              {getSignalBars()}
            </div>
          </div>
          <div className="text-lg font-bold text-green-600">{esimStatus.dataRemaining}</div>
          <div className="text-xs text-gray-500">{esimStatus.daysRemaining} days remaining</div>
        </div>
      </div>

      {/* Nearby Spots */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Nearby Spots</h3>
          <button className="text-blue-600 text-sm font-medium">View All</button>
        </div>
        
        <div className="space-y-3">
          {nearbySpots.map((spot) => (
            <div key={spot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPinIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">{spot.name}</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <span>{spot.distance}</span>
                    <span className="mx-1">•</span>
                    <StarIcon className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="ml-1">{spot.rating}</span>
                  </div>
                </div>
              </div>
              {spot.hasDiscount && (
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  20% OFF
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderCouponsTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Coupons</h2>
        <p className="text-gray-600">Save money while exploring!</p>
      </div>

      {/* Active Coupons */}
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">Senso-ji Temple</h3>
                <p className="text-red-100">Traditional Experience</p>
              </div>
              <div className="text-3xl font-bold">20%</div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Valid until: Dec 31, 2024</span>
              <button className="bg-white text-red-500 px-4 py-2 rounded-full text-sm font-medium">
                Show QR
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">Ramen Yokocho</h3>
                <p className="text-green-100">Food & Dining</p>
              </div>
              <div className="text-3xl font-bold">¥500</div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Valid until: Dec 25, 2024</span>
              <button className="bg-white text-green-500 px-4 py-2 rounded-full text-sm font-medium">
                Show QR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Earn More Points */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Earn More Coupons</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <CameraIcon className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">Take a photo at 3 spots</span>
            </div>
            <div className="text-blue-600 font-bold">+100pts</div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <ShareIcon className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">Share your trip on social</span>
            </div>
            <div className="text-green-600 font-bold">+200pts</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMapTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Explore {currentLocation.city}</h2>
        <p className="text-gray-600">Discover amazing places around you</p>
      </div>

      {/* Map Placeholder */}
      <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl h-64 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20"></div>
        <div className="relative z-10 text-center">
          <MapPinIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-700 font-medium">Interactive Map Coming Soon</p>
          <p className="text-sm text-gray-500">AR navigation & real-time spots</p>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white rounded-2xl p-4 shadow-lg text-left hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl">🏛️</span>
          </div>
          <h3 className="font-bold text-gray-800">Temples</h3>
          <p className="text-sm text-gray-500">12 nearby</p>
        </button>
        
        <button className="bg-white rounded-2xl p-4 shadow-lg text-left hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl">🍜</span>
          </div>
          <h3 className="font-bold text-gray-800">Food</h3>
          <p className="text-sm text-gray-500">28 nearby</p>
        </button>
        
        <button className="bg-white rounded-2xl p-4 shadow-lg text-left hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl">🛍️</span>
          </div>
          <h3 className="font-bold text-gray-800">Shopping</h3>
          <p className="text-sm text-gray-500">15 nearby</p>
        </button>
        
        <button className="bg-white rounded-2xl p-4 shadow-lg text-left hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl">🌸</span>
          </div>
          <h3 className="font-bold text-gray-800">Nature</h3>
          <p className="text-sm text-gray-500">8 nearby</p>
        </button>
      </div>
    </div>
  )

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name || 'Travel Explorer'}</h2>
            <p className="text-purple-100">Level 3 Adventurer</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{visitedPlaces}</div>
            <div className="text-xs text-purple-100">Places</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{travelPoints}</div>
            <div className="text-xs text-purple-100">Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-purple-100">Countries</div>
          </div>
        </div>
      </div>

      {/* Travel Journal */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Travel Journal</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">📸</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">Tokyo Skytree Visit</div>
              <div className="text-sm text-gray-500">Today, 2:30 PM</div>
            </div>
            <HeartIcon className="w-5 h-5 text-red-500 fill-current" />
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">🍜</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">Amazing Ramen Experience</div>
              <div className="text-sm text-gray-500">Yesterday, 7:15 PM</div>
            </div>
            <StarIcon className="w-5 h-5 text-yellow-500 fill-current" />
          </div>
        </div>
        
        <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium">
          Generate Trip Report
        </button>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Settings</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl">
            <span className="font-medium text-gray-700">Language</span>
            <span className="text-gray-500">{currentLanguage.name}</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl">
            <span className="font-medium text-gray-700">Notifications</span>
            <span className="text-gray-500">On</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl">
            <span className="font-medium text-gray-700">Data Usage</span>
            <span className="text-gray-500">{esimStatus.dataRemaining}</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeTab()
      case 'coupons': return renderCouponsTab()
      case 'map': return renderMapTab()
      case 'profile': return renderProfileTab()
      default: return renderHomeTab()
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Status Bar */}
      <div className="bg-white px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {getSignalBars()}
          </div>
          <WifiIcon className="w-4 h-4 text-green-500" />
          <span className="text-gray-600">{currentLocation.city}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">14:30</span>
          <BatteryIcon className="w-4 h-4 text-green-500" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-2 px-4 ${
              activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <CompassIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center py-2 px-4 ${
              activeTab === 'map' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <MapPinIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Explore</span>
          </button>
          
          <button
            onClick={() => setActiveTab('coupons')}
            className={`flex flex-col items-center py-2 px-4 relative ${
              activeTab === 'coupons' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <GiftIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Coupons</span>
            <div className="absolute -top-1 right-3 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center py-2 px-4 ${
              activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <div className="w-6 h-6 mb-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-xs text-white font-bold">Me</span>
            </div>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}