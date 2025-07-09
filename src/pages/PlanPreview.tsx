import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapPin, Calendar, Star, Share2, Map } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { searchCity } from '../utils/amadeus';
import { searchAttractions } from '../utils/tripadvisor';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import AIChat from '../components/AIChat';

const PlanPreview: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  // 旅行プラン内容はlocation.stateから受け取る（AI生成結果）
  const [plan, setPlan] = useState(location.state?.plan || t('planpreview.no_plan'));
  const tripData = location.state?.tripData || {};

  const [cityInfo, setCityInfo] = useState<any>(null);
  const [attractions, setAttractions] = useState<any[]>([]);

  useEffect(() => {
    const fetchInfo = async () => {
      if (!tripData?.destination) return;
      try {
        const cityRes = await searchCity(tripData.destination);
        setCityInfo(cityRes.data?.[0] || null);
        const attrRes = await searchAttractions(tripData.destination);
        setAttractions(attrRes.data || []);
      } catch (e) {
        // エラーは無視して続行
      }
    };
    fetchInfo();
  }, [tripData?.destination]);

  // ダミー日別タイムライン（本来はplanをパースして生成）
  const days = [
    { day: 1, date: '2025-08-01', title: t('planpreview.day1'), activities: [
      { time: '10:00', title: t('planpreview.arrival'), place: 'Tokyo Haneda', type: 'arrival' },
      { time: '12:00', title: t('planpreview.lunch'), place: 'Sushi Zanmai', type: 'food' },
      { time: '14:00', title: t('planpreview.sightseeing'), place: 'Asakusa', type: 'sight' }
    ] },
    { day: 2, date: '2025-08-02', title: t('planpreview.day2'), activities: [
      { time: '09:00', title: t('planpreview.breakfast'), place: 'Hotel', type: 'food' },
      { time: '11:00', title: t('planpreview.sightseeing'), place: 'Shibuya', type: 'sight' },
      { time: '18:00', title: t('planpreview.dinner'), place: 'Izakaya', type: 'food' }
    ] }
  ];

  // ダミーレビュー
  const reviews = [
    { user: 'Sarah', text: t('planpreview.review1'), rating: 5 },
    { user: 'Marco', text: t('planpreview.review2'), rating: 4 }
  ];

  // Google Maps用：スポットの緯度経度（ダミー or cityInfo/attractionsから取得）
  const defaultCenter = { lat: 35.681236, lng: 139.767125 }; // 東京駅
  const spots = [
    ...(cityInfo?.geoCode ? [{ name: cityInfo.name, lat: cityInfo.geoCode.latitude, lng: cityInfo.geoCode.longitude }] : []),
    ...attractions.filter(a => a.latitude && a.longitude).map(a => ({ name: a.name, lat: a.latitude, lng: a.longitude }))
  ];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    language: 'ja',
    region: 'JP'
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('planpreview.title')}</h1>
      <div className="mb-4">
        {isLoaded && (
          <div className="rounded-xl overflow-hidden shadow mb-4" style={{ height: 360 }}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={spots[0] || defaultCenter}
              zoom={12}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                styles: [
                  { elementType: 'geometry', stylers: [{ color: '#f5f5fa' }] },
                  { elementType: 'labels.text.fill', stylers: [{ color: '#444' }] },
                  { elementType: 'labels.text.stroke', stylers: [{ color: '#fff' }] },
                  { featureType: 'water', stylers: [{ color: '#a5d7ff' }] },
                  { featureType: 'poi', stylers: [{ color: '#e0e0e0' }] }
                ]
              }}
            >
              {spots.map((s, i) => (
                <Marker key={i} position={{ lat: s.lat, lng: s.lng }} label={String(i + 1)} title={s.name} />
              ))}
            </GoogleMap>
          </div>
        )}
        {/* 既存の都市・観光地情報 */}
        {cityInfo && (
          <div className="mb-2 text-sm text-gray-500">{cityInfo.name} ({cityInfo.iataCode}) - {cityInfo.address?.countryName}</div>
        )}
        {attractions.length > 0 && (
          <div className="mb-2">
            <div className="font-bold text-gray-700">観光スポット:</div>
            <ul className="list-disc pl-5">
              {attractions.slice(0, 5).map((a, i) => (
                <li key={i}>{a.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* 日別タイムライン */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('planpreview.timeline')}</h2>
        <div className="space-y-6">
          {days.map(day => (
            <div key={day.day} className="bg-white rounded-xl shadow p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="font-bold">{day.date}</span>
                <span className="ml-2">{day.title}</span>
              </div>
              <ul className="space-y-2">
                {day.activities.map((a, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-gray-500 w-16">{a.time}</span>
                    <span className="font-semibold">{a.title}</span>
                    <span className="text-gray-600 flex items-center gap-1"><MapPin className="w-4 h-4" />{a.place}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      {/* AIチャットUIを右下フローティングで表示 */}
      <div className="fixed bottom-6 right-6 z-50 w-full max-w-xs md:max-w-sm">
        <AIChat onPlanUpdate={setPlan} />
      </div>
      {/* GoogleMap埋め込み（ダミー） */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('planpreview.map')}</h2>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <Map className="w-8 h-8 text-blue-500 mb-2" />
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl">
            <span className="text-gray-400">GoogleMap（ここに地図を埋め込み）</span>
          </div>
        </div>
      </section>
      {/* レビュー */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('planpreview.reviews')}</h2>
        <div className="bg-white rounded-xl shadow p-4">
          <ul className="space-y-2">
            {reviews.map((r, i) => (
              <li key={i} className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="font-bold">{r.user}</span>
                <span className="text-gray-700">{r.text}</span>
                <span className="text-yellow-500">{'★'.repeat(r.rating)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* シェア・体験投稿 */}
      <section className="mb-8 flex gap-4">
        <Link to="/reviews" className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold flex items-center gap-2 hover:bg-blue-600">
          <Star className="w-5 h-5" /> {t('planpreview.post_review')}
        </Link>
        <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold flex items-center gap-2 hover:from-purple-500 hover:to-pink-500">
          <Share2 className="w-5 h-5" /> {t('planpreview.share')}
        </button>
      </section>
      {/* 戻る・eSIM購入導線 */}
      <div className="flex gap-4 mt-8">
        <Link to="/plan" className="px-6 py-3 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300">{t('common.back')}</Link>
        <Link to="/esim" className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600">{t('planpreview.buy_esim')}</Link>
      </div>
    </div>
  );
};

export default PlanPreview; 