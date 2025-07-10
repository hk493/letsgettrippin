import React from 'react';
import { ArrowLeftIcon, HandshakeIcon, GlobeIcon, StarIcon, UsersIcon, AwardIcon } from 'lucide-react';
import { NavigationMenu } from '../components/NavigationMenu';

export const Partners = () => {
  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  const partnerCategories = [
    {
      title: '通信事業者',
      description: '日本国内の主要通信事業者との提携により、高品質なeSIMサービスを提供',
      partners: [
        { name: 'NTTドコモ', logo: '📱', description: '日本最大手通信事業者' },
        { name: 'ソフトバンク', logo: '📶', description: '全国ネットワーク' },
        { name: 'KDDI', logo: '📡', description: '安定した通信品質' }
      ]
    },
    {
      title: '航空会社',
      description: '世界中の航空会社との提携により、最安値フライトを提供',
      partners: [
        { name: 'ANA', logo: '✈️', description: '全日本空輸' },
        { name: 'JAL', logo: '🛩️', description: '日本航空' },
        { name: 'LCC各社', logo: '🛫', description: '格安航空会社' }
      ]
    },
    {
      title: 'ホテル・宿泊施設',
      description: '日本全国のホテル・旅館との提携により、安心・快適な宿泊を提供',
      partners: [
        { name: '大手ホテルチェーン', logo: '🏨', description: '高品質な宿泊施設' },
        { name: '温泉旅館', logo: '♨️', description: '日本の伝統文化体験' },
        { name: 'ゲストハウス', logo: '🏠', description: 'リーズナブルな宿泊' }
      ]
    },
    {
      title: '観光・体験施設',
      description: '日本各地の観光スポット・体験施設との提携により、豊富な体験を提供',
      partners: [
        { name: 'テーマパーク', logo: '🎢', description: 'エンターテイメント' },
        { name: '美術館・博物館', logo: '🏛️', description: '文化・芸術体験' },
        { name: '体験施設', logo: '🎯', description: 'ユニークな体験' }
      ]
    }
  ];

  const benefits = [
    {
      icon: <GlobeIcon className="w-6 h-6" />,
      title: 'グローバル展開',
      description: '世界中のお客様にアクセスできる機会を提供'
    },
    {
      icon: <StarIcon className="w-6 h-6" />,
      title: 'ブランド価値向上',
      description: 'DataPocketとの提携によりブランド認知度を向上'
    },
    {
      icon: <UsersIcon className="w-6 h-6" />,
      title: '新規顧客獲得',
      description: '旅行者向けの新たなマーケティングチャネル'
    },
    {
      icon: <AwardIcon className="w-6 h-6" />,
      title: '技術サポート',
      description: 'API連携や技術的なサポートを提供'
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
            <h1 className="text-3xl font-bold text-gray-900">パートナー</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            一緒に日本旅行の未来を創りませんか？
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            DataPocketは、世界中の旅行者に最高の日本旅行体験を提供するため、
            様々な業界のパートナー企業と協力しています。
          </p>
        </div>
      </div>

      {/* Partner Categories */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">パートナー企業</h2>
          <div className="space-y-12">
            {partnerCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{category.title}</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {category.partners.map((partner, partnerIndex) => (
                    <div key={partnerIndex} className="bg-white rounded-lg p-6 shadow-sm text-center">
                      <div className="text-4xl mb-4">{partner.logo}</div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{partner.name}</h4>
                      <p className="text-gray-600">{partner.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partnership Benefits */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">パートナーシップのメリット</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <div className="text-blue-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partnership Process */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">パートナーシップの流れ</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">お問い合わせ</h3>
              <p className="text-gray-600">パートナーシップについてご相談ください</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">詳細検討</h3>
              <p className="text-gray-600">双方のニーズと可能性を検討</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">契約締結</h3>
              <p className="text-gray-600">パートナーシップ契約を締結</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">サービス開始</h3>
              <p className="text-gray-600">共同サービスを開始</p>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Types */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">パートナーシップの種類</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-center mb-6">
                <HandshakeIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">戦略的パートナーシップ</h3>
              </div>
              <p className="text-gray-600 text-center">
                長期的な関係を構築し、共同で新しいサービスやソリューションを開発します。
                技術協力や共同マーケティングなど、包括的な協力関係を目指します。
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-center mb-6">
                <GlobeIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">販売パートナーシップ</h3>
              </div>
              <p className="text-gray-600 text-center">
                お客様の製品・サービスをDataPocketプラットフォームで販売し、
                新しい販売チャネルを提供します。API連携による自動化も可能です。
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-center mb-6">
                <StarIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">技術パートナーシップ</h3>
              </div>
              <p className="text-gray-600 text-center">
                技術的な協力により、より良いサービスを提供します。
                データ連携、システム統合、技術サポートなどを行います。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">パートナーシップについてお問い合わせ</h2>
          <p className="text-xl text-gray-600 mb-8">
            パートナーシップにご興味をお持ちの企業様は、お気軽にお問い合わせください。
            詳細な資料やデモンストレーションもご提供いたします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors">
              パートナーシップ担当者に連絡
            </button>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors">
              資料をダウンロード
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 