import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, StarIcon, Share2Icon, UsersIcon, ArrowLeftIcon, GlobeIcon, ArrowRightIcon } from 'lucide-react';
import AIChat from '../components/AIChat';

const PlanPreview: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 旅行プラン内容はlocation.stateから受け取る（AI生成結果）
  const tripData = location.state?.tripData || {};

  // ダミー日別タイムライン（本来はplanをパースして生成）
  const days = [
    { 
      day: 1, 
      date: '2024/07/01', 
      title: 'Day 1 - Arrival & Exploration',
      activities: [
        { time: '10:00', title: 'Arrival', place: 'Tokyo Haneda Airport', type: 'arrival', icon: '✈️' },
        { time: '12:00', title: 'Lunch', place: 'Sushi Zanmai', type: 'food', icon: '🍣' },
        { time: '14:00', title: 'Sightseeing', place: 'Asakusa Senso-ji', type: 'sight', icon: '⛩️' },
        { time: '18:00', title: 'Dinner', place: 'Local Izakaya', type: 'food', icon: '🍺' }
      ] 
    },
    { 
      day: 2, 
      date: '2024/07/02', 
      title: 'Day 2 - Modern Tokyo',
      activities: [
        { time: '09:00', title: 'Breakfast', place: 'Hotel', type: 'food', icon: '☕' },
        { time: '11:00', title: 'Sightseeing', place: 'Shibuya Crossing', type: 'sight', icon: '🚶' },
        { time: '14:00', title: 'Shopping', place: 'Harajuku Takeshita St.', type: 'shopping', icon: '🛍️' },
        { time: '18:00', title: 'Dinner', place: 'Ramen Shop', type: 'food', icon: '🍜' }
      ] 
    }
  ];

  // ダミーレビュー
  const reviews = [
    { user: 'Sarah Kim', text: 'Amazing experience! The local spots were incredible.', rating: 5, country: '🇰🇷' },
    { user: 'Marco Silva', text: 'Perfect itinerary, loved every moment in Japan!', rating: 4, country: '🇧🇷' }
  ];

  // スポット情報
  const spots = [
    { name: 'Shibuya Crossing', description: 'World\'s busiest pedestrian crossing', rating: 5, type: 'sight' },
    { name: 'Asakusa Senso-ji', description: 'Historic temple and shopping street', rating: 4, type: 'sight' },
    { name: 'Harajuku Takeshita St.', description: 'Trendy fashion and sweets', rating: 4, type: 'shopping' },
    { name: 'Tokyo Skytree', description: 'Tallest structure in Japan', rating: 5, type: 'sight' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="flex items-center mb-8">
          <button onClick={() => navigate(-1)} className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Japan Adventure Plan
          </h1>
        </div>

        {/* 旅行概要カード */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-6 mb-4">
            <div className="flex items-center gap-2">
              <GlobeIcon className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-gray-700">{tripData.destination || 'Tokyo, Japan'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-purple-500" />
              <span className="font-medium text-gray-700">{tripData.startDate || '2024/07/01'} - {tripData.endDate || '2024/07/07'}</span>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5 text-green-500" />
              <span className="font-medium text-gray-700">{tripData.travelers || 2} travelers</span>
            </div>
          </div>
          
          {/* 進捗バー */}
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Plan Progress</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 日別タイムライン */}
          <div>
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Daily Itinerary
            </h2>
            <div className="space-y-4">
              {days.map(day => (
                <div key={day.day} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarIcon className="w-5 h-5 text-blue-500" />
                    <span className="font-bold text-gray-800">{day.date}</span>
                    <span className="text-sm text-gray-600">{day.title}</span>
                  </div>
                  <ul className="space-y-3">
                    {day.activities.map((activity, i) => (
                      <li key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                        <span className="text-2xl">{activity.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 w-12">{activity.time}</span>
                            <span className="font-semibold text-gray-800">{activity.title}</span>
                          </div>
                          <div className="flex items-center gap-1 ml-12">
                            <MapPinIcon className="w-3 h-3 text-gray-400" />
                            <span className="text-sm text-gray-600">{activity.place}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* スポット情報 */}
          <div>
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Must-Visit Spots
            </h2>
            <div className="space-y-4">
              {spots.map((spot, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="w-6 h-6 text-blue-400 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">{spot.name}</span>
                        <span className="flex items-center">
                          {[...Array(spot.rating)].map((_, i) => (
                            <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{spot.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* レビュー */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Traveler Reviews
              </h3>
              <div className="space-y-3">
                {reviews.map((review, i) => (
                  <div key={i} className="bg-white rounded-xl shadow p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{review.country}</span>
                      <span className="font-semibold text-gray-800">{review.user}</span>
                      <span className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button onClick={() => navigate('/planning')} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center">
            <ArrowRightIcon className="w-5 h-5 mr-2" />
            Start Planning
          </button>
          <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center">
            <Share2Icon className="w-5 h-5 mr-2" />
            Share Plan
          </button>
        </div>

        {/* AIチャットUIを右下フローティングで表示 */}
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-xs md:max-w-sm">
          <AIChat onPlanUpdate={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default PlanPreview; 