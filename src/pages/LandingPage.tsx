import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { useLanguage } from '../contexts/LanguageContext';
// import { FeaturesSection } from '../components/FeaturesSection'; // 必要に応じて後で追加

const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const handleGetStarted = () => {
    // 例: プラン選択ページへ遷移
    window.location.href = '/plan-selection';
  };

  return (
    <>
      <HeroSection onGetStarted={handleGetStarted} t={t} />
      <FeaturesSection onGetStarted={handleGetStarted} t={t} />
    </>
  );
};

export default LandingPage;