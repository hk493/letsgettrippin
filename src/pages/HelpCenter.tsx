import React from 'react';
import { ArrowLeftIcon, SearchIcon, BookOpenIcon, MessageCircleIcon, PhoneIcon, MailIcon } from 'lucide-react';
import { NavigationMenu } from '../components/NavigationMenu';

export const HelpCenter = () => {
  const handleNavigate = (path: string) => {
    window.location.href = path;
  };
  const helpCategories = [
    {
      title: 'eSIMについて',
      icon: <BookOpenIcon className="w-6 h-6" />,
      items: [
        'eSIMの設定方法',
        'データ通信について',
        '料金プランについて',
        'トラブルシューティング'
      ]
    },
    {
      title: 'AI旅行プランナー',
      icon: <MessageCircleIcon className="w-6 h-6" />,
      items: [
        'プランの作成方法',
        'カスタマイズについて',
        '保存と共有',
        'よくある質問'
      ]
    },
    {
      title: 'フライト検索',
      icon: <SearchIcon className="w-6 h-6" />,
      items: [
        '検索の使い方',
        'フィルター機能',
        '予約方法',
        'キャンセル・変更'
      ]
    },
    {
      title: 'お問い合わせ',
      icon: <PhoneIcon className="w-6 h-6" />,
      items: [
        'チャットサポート',
        'メールサポート',
        '電話サポート',
        '営業時間'
      ]
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
            <h1 className="text-3xl font-bold text-gray-900">ヘルプセンター</h1>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="何かお困りのことはありますか？"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {helpCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="text-blue-600 mr-3">
                  {category.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
              </div>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-600 transition-colors block py-1"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">まだ解決しませんか？</h2>
          <p className="text-gray-600 mb-8">
            お気軽にお問い合わせください。専門スタッフが24時間体制でサポートいたします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <MessageCircleIcon className="w-5 h-5 mr-2" />
              チャットで相談
            </button>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center">
              <MailIcon className="w-5 h-5 mr-2" />
              メールで問い合わせ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 