import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import {
  ZapIcon,
  ShieldCheckIcon,
  GlobeIcon,
  SmartphoneIcon,
  CreditCardIcon,
  HeadphonesIcon,
  WifiIcon,
  MapPinIcon,
  ArrowRightIcon
} from 'lucide-react'

interface FeaturesSectionProps {
  onGetStarted: () => void;
  t: (key: string) => string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onGetStarted, t }) => (
  <section className="py-12 bg-white text-center">
    <h2 className="text-2xl font-bold mb-6">{t('features.title') || '主な特徴'}</h2>
    <div className="flex flex-wrap justify-center gap-8 mb-8">
      <div className="w-64 p-6 bg-blue-50 rounded-xl shadow">
        <div className="text-3xl mb-2">🤖</div>
        <div className="font-bold mb-1">{t('features.ai')}</div>
        <div className="text-gray-600">{t('features.ai_desc') || 'AIによる最適な旅行プラン'}</div>
      </div>
      <div className="w-64 p-6 bg-blue-50 rounded-xl shadow">
        <div className="text-3xl mb-2">🌐</div>
        <div className="font-bold mb-1">{t('features.esim')}</div>
        <div className="text-gray-600">{t('features.esim_desc') || '世界中で使えるeSIM'}</div>
      </div>
      <div className="w-64 p-6 bg-blue-50 rounded-xl shadow">
        <div className="text-3xl mb-2">⚡</div>
        <div className="font-bold mb-1">{t('features.realtime')}</div>
        <div className="text-gray-600">{t('features.realtime_desc') || 'リアルタイムで最新情報'}</div>
      </div>
    </div>
    <button
      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-lg font-bold shadow-lg hover:from-purple-500 hover:to-pink-500 transition"
      onClick={onGetStarted}
    >
      {t('hero.cta')}
    </button>
  </section>
);

export { FeaturesSection }; 