import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Star, Edit3, Share2, Trash2, Map, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TripDetails: React.FC = () => {
  const { id } = useParams();
  const { t } = useLanguage();

  // ダミー詳細タイムライン（本来はAPIから取得）
  const days = [
    { day: 1, date: '2025-08-01', title: t('tripdetails.day1'), activities: [
      { time: '10:00', title: t('tripdetails.arrival'), place: 'Tokyo Haneda', type: 'arrival' },
      { time: '12:00', title: t('tripdetails.lunch'), place: 'Sushi Zanmai', type: 'food' },
      { time: '14:00', title: t('tripdetails.sightseeing'), place: 'Asakusa', type: 'sight' }
    ] },
    { day: 2, date: '2025-08-02', title: t('tripdetails.day2'), activities: [
      { time: '09:00', title: t('tripdetails.breakfast'), place: 'Hotel', type: 'food' },
      { time: '11:00', title: t('tripdetails.sightseeing'), place: 'Shibuya', type: 'sight' },
      { time: '18:00', title: t('tripdetails.dinner'), place: 'Izakaya', type: 'food' }
    ] }
  ];

  // ダミーレビュー
  const reviews = [
    { user: 'Sarah', text: t('tripdetails.review1'), rating: 5 },
    { user: 'Marco', text: t('tripdetails.review2'), rating: 4 }
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">{t('tripdetails.title')}</h1>
        <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-2 hover:bg-yellow-200">
          <Edit3 className="w-5 h-5" /> {t('tripdetails.edit')}
        </button>
        <button className="px-4 py-2 bg-red-100 text-red-700 rounded-full flex items-center gap-2 hover:bg-red-200">
          <Trash2 className="w-5 h-5" /> {t('tripdetails.delete')}
        </button>
        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2 hover:bg-blue-200">
          <Plus className="w-5 h-5" /> {t('tripdetails.suggest')}
        </button>
      </div>
      {/* 日別タイムライン */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('tripdetails.timeline')}</h2>
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
      {/* GoogleMap埋め込み（ダミー） */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('tripdetails.map')}</h2>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <Map className="w-8 h-8 text-blue-500 mb-2" />
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl">
            <span className="text-gray-400">GoogleMap（ここに地図を埋め込み）</span>
          </div>
        </div>
      </section>
      {/* レビュー */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('tripdetails.reviews')}</h2>
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
          <Star className="w-5 h-5" /> {t('tripdetails.post_review')}
        </Link>
        <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold flex items-center gap-2 hover:from-purple-500 hover:to-pink-500">
          <Share2 className="w-5 h-5" /> {t('tripdetails.share')}
        </button>
      </section>
      {/* 戻る・eSIM購入導線 */}
      <div className="flex gap-4 mt-8">
        <Link to="/dashboard" className="px-6 py-3 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300">{t('common.back')}</Link>
        <Link to="/esim" className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600">{t('tripdetails.buy_esim')}</Link>
      </div>
    </div>
  );
};

export default TripDetails;