import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRightIcon, GlobeIcon, PlaneIcon, MapIcon, StarIcon, CheckIcon, WifiIcon, SmartphoneIcon, CreditCardIcon, ShieldIcon } from 'lucide-react';
import { NavigationMenu } from '../components/NavigationMenu';

export const LandingPage = () => {
  const { t } = useLanguage();

  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  const features = [
    {
      icon: <WifiIcon className="w-8 h-8" />,
      title: '日本eSIM',
      description: '日本旅行に最適なeSIMプラン。高速データ通信で安心して旅行を楽しめます。',
      color: 'bg-blue-500'
    },
    {
      icon: <MapIcon className="w-8 h-8" />,
      title: 'AI旅行プランナー',
      description: 'AIがあなたの好みに合わせて完璧な旅行プランを作成します。',
      color: 'bg-purple-500'
    },
    {
      icon: <PlaneIcon className="w-8 h-8" />,
      title: 'フライト検索',
      description: '世界中から日本への最安値フライトを検索できます。',
      color: 'bg-green-500'
    }
  ];

  const benefits = [
    '即座にアクティベーション',
    '24時間サポート',
    '安全な決済',
    '無料Wi-Fiスポット情報',
    '多言語対応',
    '30日間返金保証'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <NavigationMenu onNavigate={handleNavigate} />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <img 
                src="/datapocket-logo-latest.png" 
                alt="DataPocket" 
                className="h-20 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.innerText = '🦊 DataPocket';
                  fallback.setAttribute('class', 'text-4xl font-bold text-gray-800');
                  target.parentNode?.appendChild(fallback);
                }}
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                日本旅行を
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                完璧に
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              eSIM、AI旅行プランナー、フライト検索で、あなたの日本旅行をより快適で楽しいものにします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center">
                eSIMプランを選択
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </button>
              <button className="bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center">
                AI旅行プランナー
                <MapIcon className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              すべてが揃った旅行プラットフォーム
            </h2>
            <p className="text-xl text-gray-600">
              日本旅行に必要なすべてのサービスをワンストップで提供
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className={`${feature.color} text-white rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                なぜDataPocketを選ぶのか
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                日本旅行の専門家として、最高の体験を提供します。安心、便利、そして楽しい旅行を実現します。
              </p>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <SmartphoneIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">簡単セットアップ</h3>
                    <p className="text-gray-600">QRコードをスキャンするだけ</p>
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <GlobeIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">日本全国対応</h3>
                    <p className="text-gray-600">どこでも高速インターネット</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-full p-3 mr-4">
                    <ShieldIcon className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">安全な決済</h3>
                    <p className="text-gray-600">SSL暗号化で保護</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            今すぐ始めましょう
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            日本旅行をより楽しく、より便利に。DataPocketで完璧な旅行体験を。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300">
              無料で始める
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              詳細を見る
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">DataPocket</h3>
              <p className="text-gray-400">
                日本旅行をより楽しく、より便利にするための総合プラットフォーム
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">サービス</h4>
              <ul className="space-y-2 text-gray-400">
                <li>日本eSIM</li>
                <li>AI旅行プランナー</li>
                <li>フライト検索</li>
                <li>デバイス管理</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">サポート</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/help" className="hover:text-white transition-colors">ヘルプセンター</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">お問い合わせ</a></li>
                <li><a href="/help" className="hover:text-white transition-colors">よくある質問</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">利用規約</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">会社情報</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">会社概要</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
                <li><a href="/careers" className="hover:text-white transition-colors">採用情報</a></li>
                <li><a href="/partners" className="hover:text-white transition-colors">パートナー</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DataPocket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}; 