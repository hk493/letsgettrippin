import { useLanguage } from '../contexts/LanguageContext';

interface HeroSectionProps {
  onGetStarted: () => void;
  t: (key: string) => string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, t }) => (
  <section className="py-16 text-center bg-gradient-to-br from-blue-100 to-purple-100">
    <h1 className="text-4xl font-bold mb-4">{t('hero.title')}</h1>
    <p className="text-lg mb-8">{t('hero.subtitle')}</p>
    <button
      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-lg font-bold shadow-lg hover:from-purple-500 hover:to-pink-500 transition"
      onClick={onGetStarted}
    >
      {t('hero.cta')}
    </button>
  </section>
);

export { HeroSection }; 