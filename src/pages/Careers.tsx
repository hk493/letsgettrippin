import React from 'react';
import { ArrowLeftIcon, MapPinIcon, ClockIcon, UsersIcon, HeartIcon, ZapIcon } from 'lucide-react';
import { NavigationMenu } from '../components/NavigationMenu';

export const Careers = () => {
  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  const positions = [
    {
      title: 'フロントエンドエンジニア',
      department: 'エンジニアリング',
      location: '東京（リモート可）',
      type: '正社員',
      description: 'React/TypeScriptを使用したWebアプリケーションの開発を担当します。',
      requirements: [
        'React、TypeScriptの実務経験3年以上',
        'モダンなフロントエンド開発の経験',
        'UI/UXへの理解',
        'チーム開発の経験'
      ]
    },
    {
      title: 'バックエンドエンジニア',
      department: 'エンジニアリング',
      location: '東京（リモート可）',
      type: '正社員',
      description: 'Node.js/Pythonを使用したAPI開発とデータベース設計を担当します。',
      requirements: [
        'Node.jsまたはPythonの実務経験3年以上',
        'データベース設計の経験',
        'API設計の経験',
        'クラウドサービス（AWS/GCP）の経験'
      ]
    },
    {
      title: 'AI/MLエンジニア',
      department: 'エンジニアリング',
      location: '東京（リモート可）',
      type: '正社員',
      description: 'AI旅行プランナーの開発と機械学習モデルの構築を担当します。',
      requirements: [
        'Python、機械学習の実務経験2年以上',
        '自然言語処理の経験',
        '推薦システムの開発経験',
        '研究開発への意欲'
      ]
    },
    {
      title: 'プロダクトマネージャー',
      department: 'プロダクト',
      location: '東京',
      type: '正社員',
      description: 'プロダクト戦略の立案と実行、チームのマネジメントを担当します。',
      requirements: [
        'プロダクトマネジメントの経験3年以上',
        'データドリブンな意思決定の経験',
        'エンジニアチームとの協働経験',
        'ユーザーリサーチの経験'
      ]
    },
    {
      title: 'カスタマーサクセス',
      department: 'カスタマーサクセス',
      location: '東京',
      type: '正社員',
      description: 'お客様の成功をサポートし、満足度向上を担当します。',
      requirements: [
        'カスタマーサクセスまたはカスタマーサポートの経験',
        'コミュニケーション能力',
        '問題解決能力',
        '英語でのコミュニケーション可能'
      ]
    }
  ];

  const benefits = [
    {
      icon: <HeartIcon className="w-6 h-6" />,
      title: 'フレックスタイム制',
      description: 'コアタイム（10:00-16:00）を除き、自由に勤務時間を設定可能'
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: 'リモートワーク',
      description: '週3日までリモートワーク可能。完全リモートのポジションもあり'
    },
    {
      icon: <UsersIcon className="w-6 h-6" />,
      title: 'チームビルディング',
      description: '定期的なチームランチ、社内イベントでチームの絆を深める'
    },
    {
      icon: <ZapIcon className="w-6 h-6" />,
      title: '学習支援',
      description: '書籍購入費、セミナー参加費、資格取得支援を提供'
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
            <h1 className="text-3xl font-bold text-gray-900">採用情報</h1>
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
            世界中の人々が日本をより深く理解し、愛着を持てるような体験を創造する
            私たちのミッションに共感してくれる仲間を募集しています。
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">私たちの価値観</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">イノベーション</h3>
              <p className="text-gray-600">
                最新技術を活用し、常に革新的なソリューションを提供します。
                新しいアイデアを歓迎し、失敗を恐れずに挑戦する文化を大切にしています。
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">お客様第一</h3>
              <p className="text-gray-600">
                お客様のニーズを最優先に考え、最高の体験を提供します。
                お客様の声に耳を傾け、継続的に改善を重ねています。
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">チームワーク</h3>
              <p className="text-gray-600">
                多様な背景を持つメンバーが協力し、お互いを尊重し合う
                オープンなコミュニケーションを大切にしています。
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">成長</h3>
              <p className="text-gray-600">
                個人とチームの成長を支援し、継続的な学習を奨励しています。
                新しいスキルの習得やキャリア開発を積極的にサポートします。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">福利厚生</h2>
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

      {/* Open Positions */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">募集職種</h2>
          <div className="space-y-6">
            {positions.map((position, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{position.title}</h3>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <span className="flex items-center">
                        <UsersIcon className="w-4 h-4 mr-1" />
                        {position.department}
                      </span>
                      <span className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {position.location}
                      </span>
                      <span className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    詳細を見る
                  </button>
                </div>
                <p className="text-gray-700 mb-4">{position.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">求める経験・スキル</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {position.requirements.map((req, reqIndex) => (
                      <li key={reqIndex}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Process */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">応募プロセス</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">エントリー</h3>
              <p className="text-gray-600">履歴書・職務経歴書を送付</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">書類選考</h3>
              <p className="text-gray-600">1週間以内に結果をお知らせ</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">面接</h3>
              <p className="text-gray-600">オンラインまたは対面で実施</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">内定</h3>
              <p className="text-gray-600">最終面接から1週間以内に結果</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">お気軽にお問い合わせください</h2>
          <p className="text-xl text-gray-600 mb-8">
            募集職種に該当しない場合でも、ご興味をお持ちでしたらお気軽にご連絡ください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors">
              採用担当者に連絡
            </button>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors">
              会社見学を申し込む
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 