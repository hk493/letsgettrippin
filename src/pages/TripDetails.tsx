import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, UsersIcon, ArrowLeftIcon, ArrowRightIcon, StarIcon, GlobeIcon } from 'lucide-react';

const mockTrip = {
  title: "Tokyo Adventure",
  duration: "2024/07/01 - 2024/07/07",
  travelers: 2,
  progress: 75,
  spots: [
    { name: "Shibuya Crossing", description: "World's busiest pedestrian crossing.", rating: 5 },
    { name: "Asakusa Senso-ji", description: "Historic temple and shopping street.", rating: 4 },
    { name: "Harajuku Takeshita St.", description: "Trendy fashion and sweets.", rating: 4 },
    { name: "Tokyo Skytree", description: "Tallest structure in Japan.", rating: 5 },
  ],
  notes: "Don't forget to try local street food!",
};

const TripDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* ヘッダー */}
        <div className="flex items-center mb-8">
          <button onClick={() => navigate(-1)} className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {mockTrip.title}
          </h1>
        </div>

        {/* 旅行概要カード */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-6 mb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-gray-700">{mockTrip.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5 text-purple-500" />
              <span className="font-medium text-gray-700">{mockTrip.travelers} travelers</span>
            </div>
            <div className="flex items-center gap-2">
              <GlobeIcon className="w-5 h-5 text-green-500" />
              <span className="font-medium text-gray-700">Japan</span>
            </div>
          </div>
          {/* 進捗バー */}
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Trip Progress</span>
              <span>{mockTrip.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" style={{ width: `${mockTrip.progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* スポットリスト */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Must-Visit Spots</h2>
          <div className="space-y-4">
            {mockTrip.spots.map((spot, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-4 flex items-center gap-4 hover:shadow-lg transition">
                <MapPinIcon className="w-8 h-8 text-blue-400 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800 text-lg">{spot.name}</span>
                    <span className="flex items-center">
                      {[...Array(spot.rating)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{spot.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* メモ・アクション */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="font-bold text-gray-800 mb-2">Notes</h3>
          <p className="text-gray-600 mb-4">{mockTrip.notes}</p>
          <div className="flex gap-4">
            <button onClick={() => navigate('/planning')} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center">
              <ArrowRightIcon className="w-5 h-5 mr-2" />
              Plan Next Trip
            </button>
            <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* 地図連携（ダミー） */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl shadow-inner p-6 flex flex-col items-center">
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-lg">
            [Google Maps Integration Coming Soon]
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;