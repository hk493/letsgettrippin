import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRightIcon, GlobeIcon, PlaneIcon, MapIcon, StarIcon, CheckIcon, WifiIcon, SmartphoneIcon, CreditCardIcon, ShieldIcon, RocketIcon, SparklesIcon, CalendarIcon, UserIcon, HeartIcon, CameraIcon, UtensilsIcon, BuildingIcon, CarIcon, ShoppingBagIcon } from 'lucide-react';
import { NavigationMenu } from '../components/NavigationMenu';

interface Language {
  code: string;
  name: string;
  flag: string;
  font: string;
  pageTitle: string;
  translations: Record<string, any>;
}

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (code: string) => void;
  t: (key: string) => string;
  languages: Language[];
}

export const LandingPage = () => {
  const { t, currentLanguage, changeLanguage, languages } = useLanguage() as LanguageContextType;
  const [showLanguageModal, setShowLanguageModal] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('ja');

  // Show language modal on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowLanguageModal(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleNavigate = (path: string): void => {
    window.location.href = path;
  };

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleConfirmLanguage = () => {
    try {
      if (typeof changeLanguage === 'function') {
        changeLanguage(selectedLanguage);
      }
    } catch (error) {
      console.log('Language change error:', error);
    }
    setTimeout(() => {
      setShowLanguageModal(false);
    }, 300);
  };

  const handleGetStarted = () => {
    window.location.href = '/planner';
  };

  const features = [
    {
      icon: <MapIcon className="w-6 h-6 text-white" />,
      title: "旅行・ホテルを予約",
      description: "Save up to 50%",
    },
    {
      icon: <BuildingIcon className="w-6 h-6 text-white" />,
      title: "荷物預かり所を探す",
      description: "from ¥300/day",
    },
  ];

  const steps = [
    {
      icon: <GlobeIcon className="w-6 h-6" />,
      title: "魔法箱を開ける",
      description: "言語＆初期設定で、あなたの旅の準備を始めましょう",
      features: [
        "アニメーション or チャット形式で出迎え（多言語対応）",
        "「どこに行く？」を皮切りに質問が始まる",
        "自動言語判定＋手動切替対応",
      ]
    },
    {
      icon: <UserIcon className="w-6 h-6" />,
      title: "あなたの旅をヒアリング",
      description: "AIチャットUI or カードUIで旅の希望を教えてください",
      features: [
        "行きたい場所（国・都市・景勝地など）",
        "旅行日数・時期",
        "好きなスタイル（アウトドア・グルメなど）",
        "予算と同行者の構成",
      ]
    },
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      title: "AIが旅程を提案",
      description: "無料プレビューで旅のイメージを確認",
      features: [
        "Day1〜DayXのプランをカード形式で表示",
        "Google Maps 経路・移動時間を自動反映",
        "TripAdvisorから人気スポットを選定",
      ]
    },
    {
      icon: <ShieldIcon className="w-6 h-6" />,
      title: "認証＆アカウント作成",
      description: "旅の保存やeSIM特典にはログインが必要です",
      features: [
        "Google・Apple・LINEなどのSNS認証",
        "旅の履歴を保存",
        "次回の提案に活用",
      ]
    },
    {
      icon: <CreditCardIcon className="w-6 h-6" />,
      title: "プラン購入・eSIM・レンタカー一括決済",
      description: "便利なサービスをまとめて予約",
      features: [
        "月額2,500円のプラン購入",
        "eSIM 1GB無料付与",
        "レンタカー・体験予約も可能",
      ]
    },
    {
      icon: <MapIcon className="w-6 h-6" />,
      title: "旅の最終調整",
      description: "プランを自由にカスタマイズ",
      features: [
        "ドラッグ＆ドロップで日程変更",
        "Google Mapsと15分前アラーム通知",
        "翻訳機能や持ち物リスト自動生成",
      ]
    },
    {
      icon: <HeartIcon className="w-6 h-6" />,
      title: "旅中サポート＆シェア機能",
      description: "AIがリアルタイムでサポート",
      features: [
        "AIチャットで旅先の相談が可能",
        "SNSで旅程シェア（OGP画像付き）",
        "レビュー投稿で次回提案に活用",
      ]
    },
  ];

  const interests = [
    { icon: <BuildingIcon />, label: "歴史／文化" },
    { icon: <BuildingIcon />, label: "宗教／神社仏閣" },
    { icon: <StarIcon />, label: "アニメ・漫画" },
    { icon: <StarIcon />, label: "伝統体験" },
    { icon: <RocketIcon />, label: "最新テクノロジー" },
    { icon: <ShoppingBagIcon />, label: "ファッション・ショッピング" },
    { icon: <UtensilsIcon />, label: "グルメ" },
    { icon: <CameraIcon />, label: "写真・インスタ映え" },
  ];

  return (
    <div className="min-h-screen japan-bg-sakura">
      <div className="min-h-screen japan-bg-overlay">
        <NavigationMenu onNavigate={handleNavigate} />
        
        {/* Language Selection Modal */}
        {showLanguageModal && (
          <div className="language-modal-container bg-black/30 backdrop-blur-sm transition-opacity duration-300">
            <div className="language-modal-content bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-lg md:max-w-3xl transform transition-all duration-300 scale-100">
              <div className="text-center mb-4 sm:mb-6">
                {/* Logo and Welcome Message */}
                <div className="mb-8">
                  <img
                    src="/trippin-logo.png"
                    alt="TRIPPIN Logo"
                    className="h-32 mx-auto mb-4"
                  />
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                    Welcome to TRIPPIN
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 mb-6">
                    日本旅行のすべてを、ポケットの中に
                  </p>
                </div>

                {/* Language Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {languages.map((lang) => (
                    <div key={lang.code} className="w-full">
                      <button
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={`
                          flex flex-col items-center p-3 sm:p-4 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105
                          ${selectedLanguage === lang.code
                            ? 'bg-gradient-to-br from-pink-100 to-blue-100 border-2 border-pink-300 scale-105' 
                            : 'bg-white hover:bg-gray-50 border-2 border-transparent hover:border-gray-200'
                          }
                          w-full group
                        `}
                      >
                        <div className={`text-2xl sm:text-3xl md:text-4xl mb-2 transition-transform duration-300 ${selectedLanguage === lang.code ? 'scale-110' : 'group-hover:scale-110'}`}>
                          {lang.flag}
                        </div>
                        <div className={`text-sm sm:text-base font-semibold transition-colors duration-300 text-center ${selectedLanguage === lang.code ? 'text-indigo-600' : 'text-gray-800'}`}>
                          {lang.name}
                        </div>
                        {selectedLanguage === lang.code && (
                          <div className="mt-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Confirmation Section */}
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center bg-gradient-to-r from-pink-100 to-blue-100 rounded-full px-3 sm:px-4 py-2 mb-3 sm:mb-4">
                    <span className="text-xs sm:text-sm text-gray-600">
                      Selected: {languages.find(l => l.code === selectedLanguage)?.flag} {languages.find(l => l.code === selectedLanguage)?.name}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleConfirmLanguage}
                    className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-4 sm:px-6 py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <CheckIcon size={16} className="mr-2" />
                    <span className="text-center leading-tight">
                      Confirm Language<br className="sm:hidden" />
                      <span className="hidden sm:inline"> / </span>
                      <span className="text-xs sm:text-sm opacity-90">
                        言語を確定 / 确认语言 / 언어 확정
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src="/japan-scenery.jpg"
              alt="Beautiful Japan scenery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-pink-900/70"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 pt-20">
            <div className="text-center">
              {/* Logo and Welcome Message */}
              <div className="mb-8">
                <img
                  src="/trippin-logo.png"
                  alt="TRIPPIN Logo"
                  className="h-32 mx-auto mb-4"
                />
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  Welcome to TRIPPIN
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-6">
                  日本旅行のすべてを、ポケットの中に
                </p>
              </div>

              {/* Main Features */}
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-center mb-4">
                      {feature.icon}
                      <h3 className="text-xl font-semibold text-white ml-2">{feature.title}</h3>
                    </div>
                    <p className="text-white/90">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  旅を始める
                  <ArrowRightIcon className="inline-block ml-2 w-5 h-5" />
                </button>
                <button
                  onClick={() => handleNavigate('/plans')}
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transform hover:scale-105 transition-all duration-300"
                >
                  プランを見る
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              TRIPPINで旅をもっと楽しく
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-pink-500 to-blue-500 p-3 rounded-full text-white">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold ml-4">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              あなたの興味に合わせた旅をご提案
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {interests.map((interest, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="bg-gradient-to-r from-pink-500 to-blue-500 p-3 rounded-full text-white w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    {interest.icon}
                  </div>
                  <p className="font-medium text-gray-800">{interest.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Features Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              💎 プレミアム特典
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">柔軟なカスタマイズ</h3>
                <p>同行者・予算に合わせた最適化が可能です</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">eSIMデータ割引</h3>
                <p>通信料金がお得になります</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">予約サポート</h3>
                <p>ホテル・レンタカーの予約をサポート</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">旅の持ち物リスト</h3>
                <p>自動生成された持ち物リストを共有可能</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">AIリアルタイムサポート</h3>
                <p>現地での質問にAIがお答えします</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">翻訳サポート</h3>
                <p>テキスト・チャットベースの翻訳機能</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-2xl font-bold mb-6">月額 2,500円でこれらすべての特典が使い放題！</p>
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                今すぐ始める
                <ArrowRightIcon className="inline-block ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}; 