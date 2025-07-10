import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';
import { PlaceAutocomplete } from '../components/PlaceAutocomplete';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Layout } from '../components/Layout';
import { TrainIcon, CarIcon, MapPinIcon, CalendarIcon, WalletIcon, HeartIcon } from 'lucide-react';

interface GeneratedPlan {
  overview: string;
  attractions: {
    data: Array<{
      name: string;
      description: string;
      rating: number;
      location: {
        lat: number;
        lng: number;
      };
      travelTime: {
        byCar: string;
        byTrain: string;
      };
    }>;
  };
  route: {
    recommendedTransport: 'train' | 'car' | 'both';
    totalTravelTime: {
      byCar: string;
      byTrain: string;
    };
  };
}

interface PlanningState {
  step: number;
  destination: string;
  duration: number;
  budget: number;
  interests: string[];
  transportPreference: 'train' | 'car' | 'both';
  generatedPlan: GeneratedPlan | null;
  isLoading: boolean;
  error: string | null;
}

const INTEREST_CATEGORIES = [
  { id: 'culture', icon: '🏛️', label: '歴史・文化' },
  { id: 'nature', icon: '🗻', label: '自然' },
  { id: 'food', icon: '🍜', label: 'グルメ' },
  { id: 'shopping', icon: '🛍️', label: 'ショッピング' },
  { id: 'entertainment', icon: '🎡', label: 'エンタメ' },
  { id: 'relaxation', icon: '♨️', label: '温泉・リラックス' },
  { id: 'adventure', icon: '🏃', label: 'アクティビティ' },
  { id: 'nightlife', icon: '🌙', label: 'ナイトライフ' },
];

const BUDGET_OPTIONS = [
  { value: 30000, label: '〜30,000円' },
  { value: 50000, label: '〜50,000円' },
  { value: 100000, label: '〜100,000円' },
  { value: 150000, label: '〜150,000円' },
  { value: 200000, label: '〜200,000円' },
];

export const PlanningFlow = () => {
  const { t } = useLanguage();
  const [planningState, setPlanningState] = useState<PlanningState>({
    step: 1,
    destination: '',
    duration: 2,
    budget: 50000,
    interests: [],
    transportPreference: 'both',
    generatedPlan: null,
    isLoading: false,
    error: null
  });

  const handlePlanGeneration = async () => {
    try {
      setPlanningState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch('/.netlify/functions/generateTripPlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: planningState.destination,
          duration: planningState.duration,
          budget: planningState.budget,
          interests: planningState.interests,
          transportPreference: planningState.transportPreference
        }),
      });

      if (!response.ok) {
        throw new Error('旅行プランの生成に失敗しました。');
      }

      const data = await response.json();
      setPlanningState(prev => ({
        ...prev,
        generatedPlan: data,
        isLoading: false,
        step: 5 // プラン表示ステップへ
      }));

    } catch (error) {
      setPlanningState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '予期せぬエラーが発生しました',
        isLoading: false
      }));
    }
  };

  const renderStep = () => {
    switch (planningState.step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MapPinIcon className="w-6 h-6" />
              {t('目的地を選択')}
            </h2>
            <PlaceAutocomplete
              value={planningState.destination}
              onChange={(value: string) => setPlanningState(prev => ({ ...prev, destination: value }))}
              placeholder={t('エリアを入力（例：京都、箱根など）')}
            />
            <Button
              onClick={() => setPlanningState(prev => ({ ...prev, step: 2 }))}
              disabled={!planningState.destination}
            >
              {t('次へ')}
            </Button>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CalendarIcon className="w-6 h-6" />
              {t('旅行日数を選択')}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7].map(days => (
                <button
                  key={days}
                  onClick={() => setPlanningState(prev => ({ ...prev, duration: days }))}
                  className={`p-4 rounded-lg border ${
                    planningState.duration === days
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  {days}{t('日間')}
                </button>
              ))}
            </div>
            <Button
              onClick={() => setPlanningState(prev => ({ ...prev, step: 3 }))}
            >
              {t('次へ')}
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <WalletIcon className="w-6 h-6" />
              {t('予算を選択')}
            </h2>
            <div className="space-y-4">
              {BUDGET_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => setPlanningState(prev => ({ ...prev, budget: option.value }))}
                  className={`w-full p-4 rounded-lg border ${
                    planningState.budget === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <Button
              onClick={() => setPlanningState(prev => ({ ...prev, step: 4 }))}
            >
              {t('次へ')}
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                <HeartIcon className="w-6 h-6" />
                {t('興味のあるカテゴリーを選択')}
              </h2>
              <p className="text-gray-600">{t('複数選択可能')}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {INTEREST_CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setPlanningState(prev => ({
                      ...prev,
                      interests: prev.interests.includes(category.id)
                        ? prev.interests.filter(id => id !== category.id)
                        : [...prev.interests, category.id]
                    }));
                  }}
                  className={`p-4 rounded-lg border flex items-center gap-2 ${
                    planningState.interests.includes(category.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">{t('希望する移動手段')}</h3>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setPlanningState(prev => ({ ...prev, transportPreference: 'train' }))}
                  className={`p-4 rounded-lg border flex flex-col items-center gap-2 ${
                    planningState.transportPreference === 'train'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  <TrainIcon className="w-6 h-6" />
                  {t('電車')}
                </button>
                <button
                  onClick={() => setPlanningState(prev => ({ ...prev, transportPreference: 'car' }))}
                  className={`p-4 rounded-lg border flex flex-col items-center gap-2 ${
                    planningState.transportPreference === 'car'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  <CarIcon className="w-6 h-6" />
                  {t('車')}
                </button>
                <button
                  onClick={() => setPlanningState(prev => ({ ...prev, transportPreference: 'both' }))}
                  className={`p-4 rounded-lg border flex flex-col items-center gap-2 ${
                    planningState.transportPreference === 'both'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  <div className="flex">
                    <TrainIcon className="w-6 h-6" />
                    <CarIcon className="w-6 h-6" />
                  </div>
                  {t('どちらでも')}
                </button>
              </div>
            </div>
            <Button
              onClick={handlePlanGeneration}
              disabled={planningState.interests.length === 0}
            >
              {t('プランを生成')}
            </Button>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t('あなたの旅行プラン')}</h2>
            {planningState.generatedPlan && (
              <div className="space-y-8">
                <div className="prose max-w-none">
                  <h3>{t('概要')}</h3>
                  <div className="whitespace-pre-wrap">
                    {planningState.generatedPlan.overview}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">{t('おすすめスポット')}</h3>
                  <div className="grid gap-6">
                    {planningState.generatedPlan.attractions.data.map((spot, index) => (
                      <div key={index} className="border p-6 rounded-lg">
                        <h4 className="text-lg font-bold mb-2">{spot.name}</h4>
                        <p className="text-gray-600 mb-4">{spot.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <TrainIcon className="w-4 h-4" />
                            {spot.travelTime.byTrain}
                          </div>
                          <div className="flex items-center gap-1">
                            <CarIcon className="w-4 h-4" />
                            {spot.travelTime.byCar}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">{t('移動について')}</h3>
                  <p className="mb-4">
                    {planningState.generatedPlan.route.recommendedTransport === 'train'
                      ? t('このプランは電車での移動がおすすめです。')
                      : planningState.generatedPlan.route.recommendedTransport === 'car'
                      ? t('このプランは車での移動がおすすめです。')
                      : t('このプランは電車・車どちらでも快適に移動できます。')}
                  </p>
                  <div className="flex gap-8 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <TrainIcon className="w-4 h-4" />
                      {t('総移動時間')}: {planningState.generatedPlan.route.totalTravelTime.byTrain}
                    </div>
                    <div className="flex items-center gap-2">
                      <CarIcon className="w-4 h-4" />
                      {t('総移動時間')}: {planningState.generatedPlan.route.totalTravelTime.byCar}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {planningState.isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <LoadingSpinner />
            <p className="mt-4">{t('プランを生成中...')}</p>
          </div>
        ) : (
          <>
            {planningState.error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {planningState.error}
              </div>
            )}
            {renderStep()}
          </>
        )}
      </div>
    </Layout>
  );
}; 