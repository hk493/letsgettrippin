import React from 'react';
import { ArrowLeftIcon, UsersIcon, GlobeIcon, AwardIcon, HeartIcon } from 'lucide-react';
import { NavigationMenu } from '../components/NavigationMenu';

export const About = () => {
  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  const stats = [
    { number: '50,000+', label: 'お客様', icon: <UsersIcon className="w-8 h-8" /> },
    { number: '100+', label: '国・地域', icon: <GlobeIcon className="w-8 h-8" /> },
    { number: '99.9%', label: '満足度', icon: <HeartIcon className="w-8 h-8" /> },
    { number: '24/7', label: 'サポート', icon: <AwardIcon className="w-8 h-8" /> }
  ];

  const values = [
    {
      title: 'イノベーション',
      description: '最新技術を活用し、常に革新的なソリューションを提供します。',
      color: 'bg-blue-500'
    },
    {
      title: 'お客様第一',
      description: 'お客様のニーズを最優先に考え、最高の体験を提供します。',
      color: 'bg-green-500'
    },
    {
      title: '品質へのこだわり',
      description: '安全性と信頼性を最重視し、高品質なサービスを提供します。',
      color: 'bg-purple-500'
    },
    {
      title: '持続可能性',
      description: '環境に配慮し、持続可能な未来を目指します。',
      color: 'bg-orange-500'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: '会社設立',
      description: 'Trippin株式会社を設立し、日本旅行者のためのeSIMサービスを開始'
    },
    {
      year: '2021',
      title: 'AI旅行プランナー開発',
      description: '人工知能を活用した旅行プランニング機能を追加'
    },
    {
      year: '2022',
      title: 'フライト検索機能追加',
      description: '世界中からの日本へのフライト検索機能をリリース'
    },
    {
      year: '2023',
      title: 'グローバル展開',
      description: 'アジア太平洋地域へのサービス展開を開始'
    },
    {
      year: '2024',
      title: '総合プラットフォーム化',
      description: '日本旅行に必要なすべてのサービスをワンストップで提供'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationMenu onNavigate={handleNavigate} />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <button 
              onClick={() => window.history.back()}
              className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">会社概要</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trippinについて
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            日本旅行をより楽しく、より便利にするための総合プラットフォームを提供しています
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">ミッション</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              世界中の人々が日本を訪れる際に、言語や文化の壁を感じることなく、
              安心して快適な旅行を楽しめるよう、最先端のテクノロジーを活用した
              総合的な旅行支援サービスを提供します。
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">ビジョン</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              日本旅行のデジタル化をリードし、世界中の人々が日本をより深く理解し、
              愛着を持てるような体験を創造することを目指します。
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">企業価値</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <div className={`${value.color} text-white rounded-lg p-4 w-16 h-16 flex items-center justify-center mb-6`}>
                  <AwardIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">沿革</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm mr-6 flex-shrink-0">
                  {item.year}
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Info Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">会社情報</h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">会社名</dt>
                    <dd className="text-gray-900">Trippin株式会社</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">設立</dt>
                    <dd className="text-gray-900">2020年4月1日</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">資本金</dt>
                    <dd className="text-gray-900">1,000万円</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">代表者</dt>
                    <dd className="text-gray-900">代表取締役 田中太郎</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">所在地</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">本社</dt>
                    <dd className="text-gray-900">
                      〒100-0001<br />
                      東京都千代田区千代田1-1-1<br />
                      データパークビル 5階
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">電話番号</dt>
                    <dd className="text-gray-900">03-1234-5678</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">メールアドレス</dt>
                    <dd className="text-gray-900">info@Trippin.jp</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 