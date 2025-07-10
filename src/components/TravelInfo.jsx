import React, { useState, useEffect } from 'react';
import { MapPinIcon, ClockIcon, ArrowRightIcon, LoaderIcon, InfoIcon } from 'lucide-react';

const TravelInfo = ({ origin, destination }) => {
  const [travelData, setTravelData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTravelInfo = async () => {
      if (!origin || !destination) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/.netlify/functions/calcDistance?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
        
        if (!response.ok) {
          throw new Error('APIエラーが発生しました');
        }
        
        const data = await response.json();
        setTravelData(data);
      } catch (err) {
        console.error('Travel info error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTravelInfo();
  }, [origin, destination]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
        <LoaderIcon className="w-5 h-5 text-blue-500 animate-spin mr-2" />
        <span className="text-gray-600">移動情報を取得中...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg shadow-md p-4">
        <div className="flex items-center text-red-600 mb-2">
          <InfoIcon className="w-5 h-5 mr-2" />
          <span className="font-medium">エラーが発生しました</span>
        </div>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (!travelData) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-medium text-gray-800 mb-3">移動情報</h3>
      
      <div className="flex items-center mb-4">
        <div className="flex-1">
          <div className="text-sm text-gray-500">出発地</div>
          <div className="font-medium">{travelData.origin_name || origin}</div>
        </div>
        <ArrowRightIcon className="w-5 h-5 text-gray-400 mx-4" />
        <div className="flex-1">
          <div className="text-sm text-gray-500">目的地</div>
          <div className="font-medium">{travelData.destination_name || destination}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center text-blue-700 mb-1">
            <MapPinIcon className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">距離</span>
          </div>
          <div className="text-lg font-bold text-blue-800">
            {travelData.formatted?.distance || travelData.rows?.[0]?.elements?.[0]?.distance?.text || '不明'}
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center text-green-700 mb-1">
            <ClockIcon className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">所要時間</span>
          </div>
          <div className="text-lg font-bold text-green-800">
            {travelData.formatted?.duration || travelData.rows?.[0]?.elements?.[0]?.duration?.text || '不明'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelInfo;