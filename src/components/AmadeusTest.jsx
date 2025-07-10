import React, { useState, useEffect } from 'react'
import { PlaneIcon, LoaderIcon, CheckCircleIcon, XCircleIcon, HotelIcon } from 'lucide-react'
import { getAmadeusToken, searchFlightsFromFrontend, searchHotelsFromFrontend } from '../utils/amadeusApi'

export const AmadeusTest = () => {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [flightResults, setFlightResults] = useState(null)
  const [hotelResults, setHotelResults] = useState(null)
  const [searchLoading, setSearchLoading] = useState(false)

  const testToken = async () => {
    setLoading(true)
    setError('')
    try {
      const accessToken = await getAmadeusToken()
      if (accessToken) {
        setToken(accessToken)
      } else {
        setError('トークンの取得に失敗しました')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const testFlightSearchFromFrontend = async () => {
    setSearchLoading(true)
    setError('')
    try {
      const results = await searchFlightsFromFrontend({
        origin: 'NRT',
        destination: 'LAX',
        departureDate: '2025-07-10',
        adults: 1
      })
      setFlightResults(results)
    } catch (err) {
      setError(err.message)
    } finally {
      setSearchLoading(false)
    }
  }

  const testHotelSearchFromFrontend = async () => {
    setSearchLoading(true)
    setError('')
    try {
      const results = await searchHotelsFromFrontend({
        cityCode: 'TYO',
        checkInDate: '2025-07-10',
        checkOutDate: '2025-07-12',
        adults: 1,
        rooms: 1
      })
      setHotelResults(results)
    } catch (err) {
      setError(err.message)
    } finally {
      setSearchLoading(false)
    }
  }

  const testFlightSearch = async () => {
    setSearchLoading(true)
    setError('')
    try {
      const results = await fetch('/.netlify/functions/searchFlights')
      const data = await results.json()
      setFlightResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setSearchLoading(false)
    }
  }

  useEffect(() => {
    testToken()
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Amadeus API Test</h1>
        <p className="text-gray-600">Testing Amadeus API integration</p>
      </div>

      {/* Token Test */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Authentication Token (Frontend)</h2>
          <button
            onClick={testToken}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50"
          >
            {loading ? (
              <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <CheckCircleIcon className="w-4 h-4 mr-2" />
            )}
            {loading ? 'Getting Token...' : 'Refresh Token'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <XCircleIcon className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {token && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-700 font-semibold">Token obtained successfully!</span>
            </div>
            <div className="bg-gray-100 p-3 rounded font-mono text-sm break-all">
              {token.substring(0, 50)}...
            </div>
          </div>
        )}
      </div>

      {/* Flight Search Test (Netlify Function) */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Flight Search Test (Netlify Function)</h2>
          <button
            onClick={testFlightSearch}
            disabled={searchLoading}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50"
          >
            {searchLoading ? (
              <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <PlaneIcon className="w-4 h-4 mr-2" />
            )}
            {searchLoading ? 'Searching...' : 'Search NRT → LAX (Function)'}
          </button>
        </div>

        {flightResults && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <CheckCircleIcon className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-blue-700 font-semibold">
                Flight search completed
              </span>
            </div>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
              {JSON.stringify(flightResults, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Flight Search Test (Frontend) */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Flight Search Test (Frontend)</h2>
          <button
            onClick={testFlightSearchFromFrontend}
            disabled={searchLoading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50"
          >
            {searchLoading ? (
              <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <PlaneIcon className="w-4 h-4 mr-2" />
            )}
            {searchLoading ? 'Searching...' : 'Search NRT → LAX (Frontend)'}
          </button>
        </div>

        {flightResults && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-700 font-semibold">
                Frontend flight search completed
              </span>
            </div>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
              {JSON.stringify(flightResults, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Hotel Search Test (Frontend) */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Hotel Search Test (Frontend)</h2>
          <button
            onClick={testHotelSearchFromFrontend}
            disabled={searchLoading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50"
          >
            {searchLoading ? (
              <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <HotelIcon className="w-4 h-4 mr-2" />
            )}
            {searchLoading ? 'Searching...' : 'Search Tokyo Hotels (Frontend)'}
          </button>
        </div>

        {hotelResults && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <CheckCircleIcon className="w-5 h-5 text-orange-500 mr-2" />
              <span className="text-orange-700 font-semibold">
                Frontend hotel search completed
              </span>
            </div>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
              {JSON.stringify(hotelResults, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* API Configuration */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Client ID:</span>
            <div className="font-mono bg-white p-2 rounded border">
              {import.meta.env.VITE_AMADEUS_CLIENT_ID || 'Not configured'}
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-600">Environment:</span>
            <div className="font-mono bg-white p-2 rounded border">
              Test API (test.api.amadeus.com)
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-600">Token Endpoint:</span>
            <div className="font-mono bg-white p-2 rounded border">
              /.netlify/functions/amadeusToken
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-600">Search Endpoint:</span>
            <div className="font-mono bg-white p-2 rounded border">
              /.netlify/functions/searchFlights
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}