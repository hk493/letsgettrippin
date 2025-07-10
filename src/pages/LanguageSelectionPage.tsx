import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useInteractionTracking } from '../hooks/useAnalytics';
import { CheckIcon, GlobeIcon, ArrowRightIcon } from 'lucide-react';

const LanguageSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const { trackClick } = useInteractionTracking();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' }
  ];

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    trackClick(`language_${langCode}`, 'language_selection');
  };

  const handleContinue = () => {
    setLanguage(selectedLanguage);
    trackClick('continue_language_selection', 'language_selection');
    navigate('/plan');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg mb-8">
              <img 
                src="/trippin-logo.png" 
                alt="Trippin" 
                className="w-12 h-12 mr-3"
                onError={(e) => {
                  e.currentTarget.src = "/trippin-logo.png";
                }}
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trippin
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Language
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select your preferred language to personalize your Japan travel experience
            </p>
          </div>

          {/* Language Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 ${
                  selectedLanguage === lang.code
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="text-center">
                  <div className={`text-6xl mb-4 transition-transform duration-300 ${
                    selectedLanguage === lang.code ? 'scale-110' : 'group-hover:scale-110'
                  }`}>
                    {lang.flag}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                    selectedLanguage === lang.code ? 'text-blue-600' : 'text-gray-800'
                  }`}>
                    {lang.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{lang.nativeName}</p>
                  
                  {selectedLanguage === lang.code && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckIcon className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Selected Language Display */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <GlobeIcon className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-gray-700">
                Selected: {languages.find(l => l.code === selectedLanguage)?.flag} {languages.find(l => l.code === selectedLanguage)?.name}
              </span>
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center mx-auto group shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Continue to Planning
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Language Benefits */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GlobeIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalized Experience</h3>
              <p className="text-gray-600">Get recommendations and content in your preferred language</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Better Support</h3>
              <p className="text-gray-600">Receive customer support in your native language</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRightIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Seamless Journey</h3>
              <p className="text-gray-600">Navigate through your trip planning effortlessly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectionPage;