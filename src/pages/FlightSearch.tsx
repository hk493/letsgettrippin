import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { PlaceAutocomplete } from '../components/PlaceAutocomplete';
import { DatePicker } from '../components/DatePicker';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { PlaneIcon, CalendarIcon, MapPinIcon, UserIcon, SearchIcon } from 'lucide-react';

const popularDestinations = [
  { name: '東京（羽田）', image: '/tokyo.jpg' },
  { name: '大阪（関西）', image: '/osaka.jpg' },
  { name: '札幌（新千歳）', image: '/sapporo.jpg' },
  { name: '福岡', image: '/fukuoka.jpg' },
  { name: '沖縄（那覇）', image: '/okinawa.jpg' },
  { name: '名古屋（中部）', image: '/nagoya.jpg' },
];

export default function FlightSearch() {
  const [tab, setTab] = useState<'oneway' | 'roundtrip'>('oneway');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('エコノミー');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    // ...API呼び出し処理...
    setTimeout(() => {
      setIsLoading(false);
      setResults([]); // 仮
    }, 1200);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 flex flex-col items-center py-10">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 mx-2">
          {/* タブ */}
          <div className="flex mb-6">
            <button
              className={`px-6 py-2 rounded-t-lg font-semibold transition-all ${tab === 'oneway' ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setTab('oneway')}
            >
              片道
            </button>
            <button
              className={`px-6 py-2 rounded-t-lg font-semibold transition-all ml-2 ${tab === 'roundtrip' ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setTab('roundtrip')}
            >
              往復
            </button>
          </div>

          {/* 入力フォーム */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPinIcon className="w-4 h-4 inline mr-1" /> 出発地
              </label>
              <PlaceAutocomplete value={origin} onChange={setOrigin} placeholder="出発地を入力" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPinIcon className="w-4 h-4 inline mr-1" /> 目的地
              </label>
              <PlaceAutocomplete value={destination} onChange={setDestination} placeholder="目的地を入力" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CalendarIcon className="w-4 h-4 inline mr-1" /> 出発日
              </label>
              <DatePicker value={departureDate} onChange={setDepartureDate} placeholder="出発日を選択" min={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <UserIcon className="w-4 h-4 inline mr-1" /> 乗客数
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={passengers}
                onChange={e => setPassengers(Number(e.target.value))}
              >
                {[...Array(9)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}名</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">客室クラス</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={cabinClass}
                onChange={e => setCabinClass(e.target.value)}
              >
                <option>エコノミー</option>
                <option>プレミアムエコノミー</option>
                <option>ビジネス</option>
                <option>ファースト</option>
              </select>
            </div>
          </div>

          <div className="text-center mb-2">
            <button
              onClick={handleSearch}
              disabled={!origin || !destination || !departureDate}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto disabled:opacity-50"
            >
              <SearchIcon className="w-5 h-5 mr-2" /> フライトを検索
            </button>
          </div>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
          {isLoading && (
            <div className="text-center py-8">
              <LoadingSpinner />
              <p className="mt-4 text-gray-600">フライトを検索中...</p>
            </div>
          )}
          {/* 検索結果表示は省略 */}
        </div>

        {/* 人気の日本国内目的地 */}
        <div className="w-full max-w-5xl mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">人気の日本国内目的地</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularDestinations.map(dest => (
              <div key={dest.name} className="rounded-xl overflow-hidden shadow bg-white">
                <img src={dest.image} alt={dest.name} className="w-full h-24 object-cover" />
                <div className="text-center py-2 text-sm font-medium text-gray-700">{dest.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 