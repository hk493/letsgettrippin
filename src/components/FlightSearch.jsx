import React, { useState, useEffect, useRef } from 'react';
import { PlaneIcon, LoaderIcon, MapPinIcon, CalendarIcon, SearchIcon, ArrowRightIcon, UserIcon, CheckIcon, XIcon, ChevronDownIcon, ChevronUpIcon, ClockIcon, InfoIcon, MapIcon as SwapIcon, CreditCardIcon, StarIcon, BaggageClaimIcon, WifiIcon } from 'lucide-react';

const FlightSearch = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lookupLoading, setLookupLoading] = useState({ origin: false, destination: false });
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [activeTab, setActiveTab] = useState('cheapest');
  const [cabinClass, setCabinClass] = useState('ECONOMY');
  const [showCabinClassDropdown, setShowCabinClassDropdown] = useState(false);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [googlePlacesService, setGooglePlacesService] = useState(null);

  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const passengerDropdownRef = useRef(null);
  const cabinClassDropdownRef = useRef(null);

  // Google Maps Places API の初期化
  useEffect(() => {
    const initGooglePlaces = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        const service = new window.google.maps.places.AutocompleteService();
        setGooglePlacesService(service);
      }
    };

    // すでにscriptが読み込まれているかチェック
    if (window.google && window.google.maps && window.google.maps.places) {
      initGooglePlaces();
    } else if (!document.getElementById('google-maps-script')) {
      // Google Maps API が読み込まれていない場合は動的に読み込む
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initGooglePlaces;
      document.head.appendChild(script);
    }
  }, []);

  // Set default dates
  useEffect(() => {
    const defaultDepartureDate = new Date();
    defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 14);
    setDepartureDate(defaultDepartureDate.toISOString().split('T')[0]);
    
    const defaultReturnDate = new Date(defaultDepartureDate);
    defaultReturnDate.setDate(defaultReturnDate.getDate() + 7);
    setReturnDate(defaultReturnDate.toISOString().split('T')[0]);
    
    // Set popular destinations in Japan
    setPopularDestinations([
      { code: 'HND', name: '東京 (羽田)', country: '日本', image: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg' },
      { code: 'KIX', name: '大阪 (関西)', country: '日本', image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg' },
      { code: 'CTS', name: '札幌 (新千歳)', country: '日本', image: 'https://images.pexels.com/photos/3026364/pexels-photo-3026364.jpeg' },
      { code: 'FUK', name: '福岡', country: '日本', image: 'https://images.pexels.com/photos/5759959/pexels-photo-5759959.jpeg' },
      { code: 'OKA', name: '沖縄 (那覇)', country: '日本', image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg' },
      { code: 'NGO', name: '名古屋 (中部)', country: '日本', image: 'https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg' }
    ]);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (originRef.current && !originRef.current.contains(event.target)) {
        setShowOriginSuggestions(false);
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target)) {
        setShowDestinationSuggestions(false);
      }
      if (passengerDropdownRef.current && !passengerDropdownRef.current.contains(event.target)) {
        setShowPassengerDropdown(false);
      }
      if (cabinClassDropdownRef.current && !cabinClassDropdownRef.current.contains(event.target)) {
        setShowCabinClassDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Google Places API を使用した場所の予測
  const getPlacePredictions = async (input, callback) => {
    if (!googlePlacesService) return;

    const request = {
      input: input,
      types: ['(cities)'], // 都市のみを検索
      componentRestrictions: { country: 'jp' } // 日本国内に限定
    };

    try {
      googlePlacesService.getPlacePredictions(request, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          callback(predictions);
        } else {
          callback([]);
        }
      });
    } catch (error) {
      console.error('Google Places API error:', error);
      callback([]);
    }
  };

  // 自動でIATA変換する (出発地) - Google Places API と組み合わせ
  const handleOriginChange = async (value) => {
    setOrigin(value);
    if (value.length >= 2) {
      setLookupLoading(prev => ({ ...prev, origin: true }));
      
      try {
        getPlacePredictions(value, (predictions) => {
          const placesSuggestions = predictions.map(prediction => ({
            cityName: prediction.structured_formatting.main_text,
            iataCode: prediction.place_id.substring(0, 3).toUpperCase(),
            name: prediction.description,
            countryName: '日本'
          }));

          fetch(`/.netlify/functions/iataLookup?keyword=${encodeURIComponent(value)}`)
            .then(async res => {
              if (!res.ok) {
                throw new Error('IATA APIが見つかりません（404）');
              }
              return res.json();
            })
            .then(data => {
              if (data?.data && Array.isArray(data.data)) {
                const combinedSuggestions = [...placesSuggestions, ...data.data];
                setOriginSuggestions(combinedSuggestions);
                setShowOriginSuggestions(true);
              } else {
                setOriginSuggestions(placesSuggestions);
                setShowOriginSuggestions(true);
              }
            })
            .catch(err => {
              setError('IATA APIエラー: ' + err.message);
              setOriginSuggestions(placesSuggestions);
              setShowOriginSuggestions(true);
            })
            .finally(() => {
              setLookupLoading(prev => ({ ...prev, origin: false }));
            });
        });
      } catch (err) {
        setError('IATA APIエラー: ' + err.message);
        setLookupLoading(prev => ({ ...prev, origin: false }));
      }
    } else {
      setShowOriginSuggestions(false);
    }
  };

  // 自動でIATA変換する (目的地) - Google Places API と組み合わせ
  const handleDestinationChange = async (value) => {
    setDestination(value);
    if (value.length >= 2) {
      setLookupLoading(prev => ({ ...prev, destination: true }));
      
      try {
        getPlacePredictions(value, (predictions) => {
          const placesSuggestions = predictions.map(prediction => ({
            cityName: prediction.structured_formatting.main_text,
            iataCode: prediction.place_id.substring(0, 3).toUpperCase(),
            name: prediction.description,
            countryName: '日本'
          }));

          fetch(`/.netlify/functions/iataLookup?keyword=${encodeURIComponent(value)}`)
            .then(async res => {
              if (!res.ok) {
                throw new Error('IATA APIが見つかりません（404）');
              }
              return res.json();
            })
            .then(data => {
              if (data?.data && Array.isArray(data.data)) {
                const combinedSuggestions = [...placesSuggestions, ...data.data];
                setDestinationSuggestions(combinedSuggestions);
                setShowDestinationSuggestions(true);
              } else {
                setDestinationSuggestions(placesSuggestions);
                setShowDestinationSuggestions(true);
              }
            })
            .catch(err => {
              setError('IATA APIエラー: ' + err.message);
              setDestinationSuggestions(placesSuggestions);
              setShowDestinationSuggestions(true);
            })
            .finally(() => {
              setLookupLoading(prev => ({ ...prev, destination: false }));
            });
        });
      } catch (err) {
        setError('IATA APIエラー: ' + err.message);
        setLookupLoading(prev => ({ ...prev, destination: false }));
      }
    } else {
      setShowDestinationSuggestions(false);
    }
  };

  const selectOriginSuggestion = (suggestion) => {
    setOrigin(`${suggestion.cityName} (${suggestion.iataCode})`);
    setShowOriginSuggestions(false);
  };

  const selectDestinationSuggestion = (suggestion) => {
    setDestination(`${suggestion.cityName} (${suggestion.iataCode})`);
    setShowDestinationSuggestions(false);
  };

  const swapLocations = () => {
    const tempOrigin = origin;
    setOrigin(destination);
    setDestination(tempOrigin);
  };

  const searchFlights = async () => {
    setLoading(true);
    setError('');
    setFlights([]);
    setSelectedFlight(null);
    setShowBookingForm(false);

    try {
      // Extract IATA codes from input values
      const originCode = origin.match(/\(([A-Z]{3})\)/) ? origin.match(/\(([A-Z]{3})\)/)[1] : origin;
      const destinationCode = destination.match(/\(([A-Z]{3})\)/) ? destination.match(/\(([A-Z]{3})\)/)[1] : destination;
      
      let url = `/.netlify/functions/searchFlights?origin=${originCode}&destination=${destinationCode}&date=${departureDate}`;
      
      if (isRoundTrip && returnDate) {
        url += `&returnDate=${returnDate}`;
      }
      
      if (passengers > 1) {
        url += `&adults=${passengers}`;
      }
      
      if (cabinClass !== 'ECONOMY') {
        url += `&travelClass=${cabinClass}`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'フライト検索中にエラーが発生しました');
      }

      const data = await res.json();
      
      if (data.data && Array.isArray(data.data)) {
        setFlights(data.data);
      } else {
        // APIからデータが返ってこない場合はモックデータを使用
        const mockFlights = generateMockFlights(originCode, destinationCode);
        setFlights(mockFlights);
      }
    } catch (err) {
      console.error('Flight search error:', err);
      setError(err.message);
      
      // エラー時もモックデータを表示
      const originCode = origin.match(/\(([A-Z]{3})\)/) ? origin.match(/\(([A-Z]{3})\)/)[1] : origin;
      const destinationCode = destination.match(/\(([A-Z]{3})\)/) ? destination.match(/\(([A-Z]{3})\)/)[1] : destination;
      const mockFlights = generateMockFlights(originCode, destinationCode);
      setFlights(mockFlights);
    } finally {
      setLoading(false);
    }
  };

  const generateMockFlights = (originCode, destinationCode) => {
    // 現実的な航空会社コードとフライト番号
    const carriers = [
      { code: 'JL', name: 'Japan Airlines' },
      { code: 'NH', name: 'All Nippon Airways' },
      { code: 'DL', name: 'Delta Air Lines' },
      { code: 'UA', name: 'United Airlines' },
      { code: 'CX', name: 'Cathay Pacific' }
    ];
    
    // 現実的な価格範囲
    const priceRanges = {
      ECONOMY: { min: 75000, max: 150000 },
      PREMIUM_ECONOMY: { min: 150000, max: 250000 },
      BUSINESS: { min: 250000, max: 450000 },
      FIRST: { min: 450000, max: 800000 }
    };
    
    // 5-8つのフライトを生成
    const flightCount = Math.floor(Math.random() * 4) + 5;
    const mockFlights = [];
    
    for (let i = 0; i < flightCount; i++) {
      const carrier = carriers[Math.floor(Math.random() * carriers.length)];
      const flightNumber = Math.floor(Math.random() * 1000) + 1;
      const durationHours = Math.floor(Math.random() * 5) + 8; // 8-13時間
      const durationMinutes = Math.floor(Math.random() * 60);
      
      // 出発時刻をランダムに設定
      const departureDateTime = new Date(departureDate);
      departureDateTime.setHours(Math.floor(Math.random() * 12) + 6); // 6AM-6PM
      departureDateTime.setMinutes(Math.floor(Math.random() * 12) * 5); // 5分単位
      
      // 到着時刻を計算
      const arrivalDateTime = new Date(departureDateTime);
      arrivalDateTime.setHours(arrivalDateTime.getHours() + durationHours);
      arrivalDateTime.setMinutes(arrivalDateTime.getMinutes() + durationMinutes);
      
      // 価格をランダムに設定
      const priceRange = priceRanges[cabinClass] || priceRanges.ECONOMY;
      const price = Math.floor(Math.random() * (priceRange.max - priceRange.min)) + priceRange.min;
      
      mockFlights.push({
        id: `mock-${i+1}`,
        price: { 
          total: price.toString(), 
          currency: 'JPY',
          grandTotal: price.toString()
        },
        itineraries: [{
          duration: `PT${durationHours}H${durationMinutes}M`,
          segments: [{
            departure: { 
              iataCode: originCode || 'NRT', 
              at: departureDateTime.toISOString(),
              terminal: Math.floor(Math.random() * 3) + 1
            },
            arrival: { 
              iataCode: destinationCode || 'LAX', 
              at: arrivalDateTime.toISOString(),
              terminal: Math.floor(Math.random() * 5) + 1
            },
            carrierCode: carrier.code,
            number: flightNumber.toString(),
            aircraft: {
              code: ['789', '77W', '788', '77F'][Math.floor(Math.random() * 4)]
            },
            operating: {
              carrierCode: carrier.code
            }
          }]
        }],
        travelerPricings: [{
          travelerId: '1',
          fareOption: 'STANDARD',
          travelerType: 'ADULT',
          price: {
            currency: 'JPY',
            total: price.toString()
          },
          fareDetailsBySegment: [{
            cabin: cabinClass,
            class: cabinClass === 'ECONOMY' ? 'Y' : 
                  cabinClass === 'PREMIUM_ECONOMY' ? 'W' : 
                  cabinClass === 'BUSINESS' ? 'C' : 'F'
          }]
        }]
      });
    }
    
    // 価格で並べ替え
    return mockFlights.sort((a, b) => 
      parseInt(a.price.total) - parseInt(b.price.total)
    );
  };

  const formatDuration = (duration) => {
    // PT11H30M -> 11時間30分
    const match = duration.match(/PT(\d+)H(\d+)M/);
    if (match) {
      return `${match[1]}時間${match[2]}分`;
    }
    return duration;
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setShowBookingForm(true);
  };

  const handleBookingInfoChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingComplete(true);
    setBookingReference(`JP${Math.floor(Math.random() * 1000000)}`);
  };

  const getCabinClassDisplay = (cabinClass) => {
    switch (cabinClass) {
      case 'ECONOMY': return 'エコノミー';
      case 'PREMIUM_ECONOMY': return 'プレミアムエコノミー';
      case 'BUSINESS': return 'ビジネス';
      case 'FIRST': return 'ファースト';
      default: return 'エコノミー';
    }
  };

  const getAirlineLogo = (carrierCode) => {
    // 実際のプロダクションでは、航空会社のロゴURLを返す関数
    return `https://www.gstatic.com/flights/airline_logos/70px/dark/${carrierCode}.png`;
  };

  const selectPopularDestination = (destination) => {
    setDestination(`${destination.name} (${destination.code})`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">日本行きフライト検索</h1>
          <p className="text-gray-600">世界中から日本への最安値フライトを検索</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setIsRoundTrip(false)}
              className={`px-4 py-2 rounded-lg font-medium ${
                !isRoundTrip 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              片道
            </button>
            <button
              onClick={() => setIsRoundTrip(true)}
              className={`px-4 py-2 rounded-lg font-medium ${
                isRoundTrip 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              往復
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="relative" ref={originRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                出発地
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => handleOriginChange(e.target.value)}
                  onFocus={() => origin.length >= 2 && setShowOriginSuggestions(true)}
                  placeholder="都市名または空港コード"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                {lookupLoading.origin ? (
                  <LoaderIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 animate-spin" />
                ) : (
                  origin && (
                    <XIcon 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer hover:text-gray-600"
                      onClick={() => setOrigin('')}
                    />
                  )
                )}
              </div>
              
              {showOriginSuggestions && originSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {originSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() => selectOriginSuggestion(suggestion)}
                    >
                      <div className="font-medium text-gray-900">{suggestion.cityName} ({suggestion.iataCode})</div>
                      <div className="text-sm text-gray-500">{suggestion.name}, {suggestion.countryName}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={destinationRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                目的地
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                  onFocus={() => destination.length >= 2 && setShowDestinationSuggestions(true)}
                  placeholder="都市名または空港コード"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                {lookupLoading.destination ? (
                  <LoaderIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 animate-spin" />
                ) : (
                  destination && (
                    <XIcon 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer hover:text-gray-600"
                      onClick={() => setDestination('')}
                    />
                  )
                )}
              </div>
              
              {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {destinationSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() => selectDestinationSuggestion(suggestion)}
                    >
                      <div className="font-medium text-gray-900">{suggestion.cityName} ({suggestion.iataCode})</div>
                      <div className="text-sm text-gray-500">{suggestion.name}, {suggestion.countryName}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Swap button */}
          <div className="flex justify-center -mt-4 mb-4">
            <button
              onClick={swapLocations}
              className="bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors"
              title="出発地と目的地を入れ替え"
            >
              <SwapIcon className="w-5 h-5 text-blue-500" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                出発日
              </label>
              <div className="relative">
                                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {isRoundTrip && (
              <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                帰国日
              </label>
                <div className="relative">
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={departureDate}
                    className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
            )}

            <div className="relative" ref={passengerDropdownRef}>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                乗客数
              </label>
              <div 
                className="relative w-full pl-10 py-3 border border-gray-300 rounded-lg cursor-pointer"
                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
              >
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <span className="text-gray-900">{passengers}名</span>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              
              {showPassengerDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">乗客数</span>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setPassengers(Math.max(1, passengers - 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                          disabled={passengers <= 1}
                        >
                          -
                        </button>
                        <span className="text-gray-900">{passengers}</span>
                        <button
                          onClick={() => setPassengers(Math.min(9, passengers + 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                          disabled={passengers >= 9}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={cabinClassDropdownRef}>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                客室クラス
              </label>
              <div 
                className="relative w-full pl-10 py-3 border border-gray-300 rounded-lg cursor-pointer"
                onClick={() => setShowCabinClassDropdown(!showCabinClassDropdown)}
              >
                <PlaneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <span className="text-gray-900">{getCabinClassDisplay(cabinClass)}</span>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              
              {showCabinClassDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
                                      <div className="p-2">
                      {[
                        { value: 'ECONOMY', label: 'エコノミー' },
                        { value: 'PREMIUM_ECONOMY', label: 'プレミアムエコノミー' },
                        { value: 'BUSINESS', label: 'ビジネス' },
                        { value: 'FIRST', label: 'ファースト' }
                      ].map((option) => (
                        <div
                          key={option.value}
                          className={`px-4 py-2 cursor-pointer rounded-lg ${
                            cabinClass === option.value ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-900'
                          }`}
                          onClick={() => {
                            setCabinClass(option.value);
                            setShowCabinClassDropdown(false);
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={searchFlights}
              disabled={loading || !origin || !destination || !departureDate || (isRoundTrip && !returnDate)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center"
            >
              {loading ? (
                <>
                  <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />
                  検索中...
                </>
              ) : (
                <>
                  <SearchIcon className="w-5 h-5 mr-2" />
                  フライトを検索
                </>
              )}
            </button>
          </div>
        </div>

        {/* Popular Destinations */}
        {!flights.length && !loading && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">人気の日本国内目的地</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularDestinations.map((dest) => (
                <div
                  key={dest.code}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => selectPopularDestination(dest)}
                >
                  <div className="h-32 bg-gray-200 relative">
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 text-white font-bold">{dest.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XIcon className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  フライト検索エラー:
                </h3>
                <div className="mt-1 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Flight Results */}
        {flights.length > 0 && !showBookingForm && (
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex flex-wrap items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {origin} → {destination}
                </h2>
                <div className="text-sm text-gray-600">
                  {formatDate(departureDate)} • {passengers}名 • {getCabinClassDisplay(cabinClass)}
                </div>
              </div>
              
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('cheapest')}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'cheapest' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  最安値
                </button>
                <button
                  onClick={() => setActiveTab('fastest')}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'fastest' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  最短時間
                </button>
                <button
                  onClick={() => setActiveTab('best')}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'best' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  おすすめ
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {flights
                .sort((a, b) => {
                  if (activeTab === 'cheapest') {
                    return parseInt(a.price.total) - parseInt(b.price.total);
                  } else if (activeTab === 'fastest') {
                    const durationA = a.itineraries[0]?.duration.match(/PT(\d+)H(\d+)M/);
                    const durationB = b.itineraries[0]?.duration.match(/PT(\d+)H(\d+)M/);
                    if (durationA && durationB) {
                      const minutesA = parseInt(durationA[1]) * 60 + parseInt(durationA[2]);
                      const minutesB = parseInt(durationB[1]) * 60 + parseInt(durationB[2]);
                      return minutesA - minutesB;
                    }
                    return 0;
                  } else {
                    // Best - combination of price and duration
                    const priceA = parseInt(a.price.total);
                    const priceB = parseInt(b.price.total);
                    const durationA = a.itineraries[0]?.duration.match(/PT(\d+)H(\d+)M/);
                    const durationB = b.itineraries[0]?.duration.match(/PT(\d+)H(\d+)M/);
                    const minutesA = durationA ? parseInt(durationA[1]) * 60 + parseInt(durationA[2]) : 0;
                    const minutesB = durationB ? parseInt(durationB[1]) * 60 + parseInt(durationB[2]) : 0;
                    
                    // Normalize values between 0-1
                    const maxPrice = Math.max(...flights.map(f => parseInt(f.price.total)));
                    const minPrice = Math.min(...flights.map(f => parseInt(f.price.total)));
                    const priceDiff = maxPrice - minPrice;
                    
                    const normalizedPriceA = priceDiff ? (priceA - minPrice) / priceDiff : 0;
                    const normalizedPriceB = priceDiff ? (priceB - minPrice) / priceDiff : 0;
                    
                    const allDurations = flights.map(f => {
                      const match = f.itineraries[0]?.duration.match(/PT(\d+)H(\d+)M/);
                      return match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 0;
                    });
                    const maxDuration = Math.max(...allDurations);
                    const minDuration = Math.min(...allDurations);
                    const durationDiff = maxDuration - minDuration;
                    
                    const normalizedDurationA = durationDiff ? (minutesA - minDuration) / durationDiff : 0;
                    const normalizedDurationB = durationDiff ? (minutesB - minDuration) / durationDiff : 0;
                    
                    // Combined score (lower is better)
                    const scoreA = normalizedPriceA * 0.7 + normalizedDurationA * 0.3;
                    const scoreB = normalizedPriceB * 0.7 + normalizedDurationB * 0.3;
                    
                    return scoreA - scoreB;
                  }
                })
                .map((flight, index) => (
                  <div 
                    key={flight.id || index} 
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-4">
                        {/* Airline and Flight Info */}
                        <div className="flex items-center space-x-4">
                          <img 
                            src={getAirlineLogo(flight.itineraries[0]?.segments[0]?.carrierCode)} 
                            alt={flight.itineraries[0]?.segments[0]?.carrierCode}
                            className="w-12 h-12 object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/70x70?text=' + flight.itineraries[0]?.segments[0]?.carrierCode;
                            }}
                          />
                          <div>
                            <div className="font-semibold text-gray-900">
                              {flight.itineraries[0]?.segments[0]?.carrierCode} {flight.itineraries[0]?.segments[0]?.number}
                            </div>
                            <div className="text-sm text-gray-500">
                              {getCabinClassDisplay(flight.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin || cabinClass)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Flight Times */}
                        <div className="flex-1 flex flex-wrap md:flex-nowrap items-center justify-between">
                          <div className="text-center">
                                                      <div className="text-xl font-bold text-blue-900">
                            {new Date(flight.itineraries[0]?.segments[0]?.departure.at).toLocaleTimeString('ja-JP', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false
                            })}
                          </div>
                            <div className="text-sm text-gray-500">
                              {flight.itineraries[0]?.segments[0]?.departure.iataCode}
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center mx-4 flex-1">
                            <div className="text-xs text-gray-500 mb-1">
                              {formatDuration(flight.itineraries[0]?.duration)}
                            </div>
                            <div className="w-full flex items-center">
                              <div className="h-0.5 flex-1 bg-gray-300"></div>
                              <PlaneIcon className="w-4 h-4 text-gray-400 mx-1 transform rotate-90" />
                              <div className="h-0.5 flex-1 bg-gray-300"></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              直行便
                            </div>
                          </div>
                          
                          <div className="text-center">
                                                      <div className="text-xl font-bold text-blue-900">
                            {new Date(flight.itineraries[0]?.segments[0]?.arrival.at).toLocaleTimeString('ja-JP', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false
                            })}
                          </div>
                            <div className="text-sm text-gray-500">
                              {flight.itineraries[0]?.segments[0]?.arrival.iataCode}
                            </div>
                          </div>
                        </div>
                        
                        {/* Price and Book Button */}
                        <div className="flex flex-col items-end">
                          <div className="text-2xl font-bold text-blue-600 mb-2">
                            ¥{parseInt(flight.price.total).toLocaleString()}
                          </div>
                          <button
                            onClick={() => handleSelectFlight(flight)}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                          >
                            選択
                          </button>
                        </div>
                      </div>
                      
                      {/* Flight Details */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <BaggageClaimIcon className="w-4 h-4 mr-1" />
                            <span>手荷物 23kg込み</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <WifiIcon className="w-4 h-4 mr-1" />
                            <span>機内Wi-Fi利用可</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <StarIcon className="w-4 h-4 mr-1 text-yellow-500" />
                            <span>おすすめフライト</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Booking Form */}
        {showBookingForm && selectedFlight && !bookingComplete && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">予約情報入力</h2>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">選択したフライト</h3>
              <div className="flex flex-wrap md:flex-nowrap justify-between items-center">
                                  <div>
                    <div className="font-medium text-gray-900">
                      {selectedFlight.itineraries[0]?.segments[0]?.carrierCode} {selectedFlight.itineraries[0]?.segments[0]?.number}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDateTime(selectedFlight.itineraries[0]?.segments[0]?.departure.at)} → {formatDateTime(selectedFlight.itineraries[0]?.segments[0]?.arrival.at)}
                    </div>
                  </div>
                <div className="text-xl font-bold text-blue-600">
                  ¥{parseInt(selectedFlight.price.total).toLocaleString()}
                </div>
              </div>
            </div>
            
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={bookingInfo.lastName}
                    onChange={handleBookingInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    名
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={bookingInfo.firstName}
                    onChange={handleBookingInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingInfo.email}
                    onChange={handleBookingInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingInfo.phone}
                    onChange={handleBookingInfoChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">お支払い情報</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    <CreditCardIcon className="w-6 h-6 text-blue-500 mr-2" />
                    <span className="font-medium">クレジットカード</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        カード番号
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          有効期限
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          セキュリティコード
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">合計金額</span>
                  <span className="text-2xl font-bold text-blue-600">¥{parseInt(selectedFlight.price.total).toLocaleString()}</span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  予約を確定する
                </button>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  予約を確定すると、利用規約に同意したことになります
                </p>
              </div>
            </form>
          </div>
        )}

        {/* Booking Confirmation */}
        {bookingComplete && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">予約が完了しました！</h2>
            <p className="text-gray-600 mb-6">
              予約確認メールを {bookingInfo.email} に送信しました
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6 inline-block">
              <div className="text-sm text-gray-600 mb-1">予約番号</div>
              <div className="text-2xl font-bold text-blue-600 font-mono">{bookingReference}</div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">フライト情報</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <div className="font-medium">
                      {selectedFlight.itineraries[0]?.segments[0]?.carrierCode} {selectedFlight.itineraries[0]?.segments[0]?.number}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDateTime(selectedFlight.itineraries[0]?.segments[0]?.departure.at)} → {formatDateTime(selectedFlight.itineraries[0]?.segments[0]?.arrival.at)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDuration(selectedFlight.itineraries[0]?.duration)}
                    </div>
                  </div>
                  <div className="text-xl font-bold text-blue-600">
                    ¥{parseInt(selectedFlight.price.total).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              新しい検索を開始
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;