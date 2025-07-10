import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { PlaceAutocomplete } from '../components/PlaceAutocomplete';
import { DatePicker } from '../components/DatePicker';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';
import { PlaneIcon, CalendarIcon, MapPinIcon, SearchIcon, FilterIcon } from 'lucide-react';

interface FlightSearchState {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  isLoading: boolean;
  searchResults: any[];
  error: string | null;
}

export const FlightSearch = () => {
  const { t } = useLanguage();
  const [searchState, setSearchState] = useState<FlightSearchState>({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    isLoading: false,
    searchResults: [],
    error: null
  });

  const handleSearch = async () => {
    try {
      setSearchState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Netlify Functionを使用してフライト検索
      const response = await fetch('/.netlify/functions/searchFlights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: searchState.origin,
          destination: searchState.destination,
          departureDate: searchState.departureDate,
          returnDate: searchState.returnDate,
          adults: searchState.passengers
        }),
      });

      if (!response.ok) {
        throw new Error('フライト検索に失敗しました。');
      }

      const data = await response.json();
      setSearchState(prev => ({
        ...prev,
        searchResults: data.data || [],
        isLoading: false
      }));

    } catch (error) {
      setSearchState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '予期せぬエラーが発生しました',
        isLoading: false
      }));
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
              <PlaneIcon className="w-6 h-6 mr-3 text-blue-600" />
              <span className="font-medium text-gray-700">フライト検索</span>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              最安値フライトを検索
            </h1>
            
            <p className="text-gray-600 max-w-2xl mx-auto">
              日本国内・海外への最安値フライトを簡単に検索できます
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Origin */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPinIcon className="w-4 h-4 inline mr-1" />
                    出発地
                  </label>
                  <PlaceAutocomplete
                    value={searchState.origin}
                    onChange={(value: string) => setSearchState(prev => ({ ...prev, origin: value }))}
                    placeholder="出発地を入力"
                  />
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPinIcon className="w-4 h-4 inline mr-1" />
                    目的地
                  </label>
                  <PlaceAutocomplete
                    value={searchState.destination}
                    onChange={(value: string) => setSearchState(prev => ({ ...prev, destination: value }))}
                    placeholder="目的地を入力"
                  />
                </div>

                {/* Departure Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CalendarIcon className="w-4 h-4 inline mr-1" />
                    出発日
                  </label>
                  <DatePicker
                    value={searchState.departureDate}
                    onChange={(value: string) => setSearchState(prev => ({ ...prev, departureDate: value }))}
                    placeholder="出発日を選択"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {/* Return Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CalendarIcon className="w-4 h-4 inline mr-1" />
                    帰着日
                  </label>
                  <DatePicker
                    value={searchState.returnDate}
                    onChange={(value: string) => setSearchState(prev => ({ ...prev, returnDate: value }))}
                    placeholder="帰着日を選択"
                    min={searchState.departureDate}
                  />
                </div>
              </div>

              {/* Passengers */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  乗客数
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSearchState(prev => ({ ...prev, passengers: Math.max(1, prev.passengers - 1) }))}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold min-w-[2rem] text-center">
                    {searchState.passengers}
                  </span>
                  <button
                    onClick={() => setSearchState(prev => ({ ...prev, passengers: prev.passengers + 1 }))}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Search Button */}
              <div className="text-center">
                <Button
                  onClick={handleSearch}
                  disabled={!searchState.origin || !searchState.destination || !searchState.departureDate || !searchState.returnDate}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto"
                >
                  <SearchIcon className="w-5 h-5 mr-2" />
                  フライトを検索
                </Button>
              </div>
            </div>

            {/* Error Message */}
            {searchState.error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {searchState.error}
              </div>
            )}

            {/* Loading State */}
            {searchState.isLoading && (
              <div className="text-center py-12">
                <LoadingSpinner />
                <p className="mt-4 text-gray-600">フライトを検索中...</p>
              </div>
            )}

            {/* Search Results */}
            {searchState.searchResults.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">検索結果</h2>
                {searchState.searchResults.map((flight, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-semibold">
                              {flight.itineraries[0].segments[0].departure.iataCode}
                            </div>
                            <div className="text-sm text-gray-500">
                              {flight.itineraries[0].segments[0].departure.at}
                            </div>
                          </div>
                          <div className="flex-1 text-center">
                            <div className="text-sm text-gray-500">→</div>
                            <div className="text-xs text-gray-400">
                              {flight.itineraries[0].duration}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">
                              {flight.itineraries[0].segments[0].arrival.iataCode}
                            </div>
                            <div className="text-sm text-gray-500">
                              {flight.itineraries[0].segments[0].arrival.at}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          航空会社: {flight.validatingAirlineCodes.join(', ')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          ¥{parseInt(flight.price.total).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {searchState.passengers}名様
                        </div>
                        <Button
                          onClick={() => window.open(`https://www.google.com/search?q=flight+${flight.itineraries[0].segments[0].departure.iataCode}+to+${flight.itineraries[0].segments[0].arrival.iataCode}`, '_blank')}
                          className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                        >
                          予約する
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!searchState.isLoading && searchState.searchResults.length === 0 && searchState.origin && searchState.destination && (
              <div className="text-center py-12">
                <PlaneIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">フライトが見つかりませんでした</h3>
                <p className="text-gray-500">条件を変更して再度検索してください</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}; 