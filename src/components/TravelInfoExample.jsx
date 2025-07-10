import React, { useState } from 'react';
import TravelInfo from './TravelInfo';
import { SearchIcon, MapPinIcon } from 'lucide-react';

const TravelInfoExample = () => {
  const [origin, setOrigin] = useState('東京');
  const [destination, setDestination] = useState('京都');
  const [showInfo, setShowInfo] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowInfo(true);
  };

  const popularDestinations = [
    { from: '東京', to: '大阪' },
    { from: '東京', to: '京都' },
    { from: '大阪', to: '広島' },
    { from: '東京', to: '札幌' },
    { from: '大阪', to: '福岡' },
    { from: '東京', to: '沖縄' }
  ];

  const handleQuickSearch = (from, to) => {
    setOrigin(from);
    setDestination(to);
    setShowInfo(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">日本国内の移動情報</h1>
        <p className="text-gray-600">出発地と目的地を入力して、距離と所要時間を確認できます</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                出発地
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="例: 東京"
                  required
                />
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                目的地
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="例: 大阪"
                  required
                />
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center"
            >
              <SearchIcon className="w-5 h-5 mr-2" />
              検索
            </button>
          </div>
        </form>
      </div>

      {/* Popular Destinations */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">人気の経路</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {popularDestinations.map((route, index) => (
            <button
              key={index}
              onClick={() => handleQuickSearch(route.from, route.to)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center">
                <span className="font-medium">{route.from}</span>
                <ArrowRightIcon className="w-4 h-4 mx-2 text-gray-400" />
                <span className="font-medium">{route.to}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Travel Info Results */}
      {showInfo && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">検索結果</h2>
          <TravelInfo origin={origin} destination={destination} />
        </div>
      )}

      {/* Additional Information */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-bold text-blue-800 mb-2">ご利用案内</h3>
        <ul className="space-y-2 text-sm text-blue-700">
          <li>• 所要時間は公共交通機関を利用した場合の目安です</li>
          <li>• 実際の所要時間は交通状況や経路により異なる場合があります</li>
          <li>• 距離は直線距離ではなく、実際の移動経路に基づいています</li>
          <li>• 日本国内の主要都市間の移動情報を提供しています</li>
        </ul>
      </div>
    </div>
  );
};

export default TravelInfoExample;