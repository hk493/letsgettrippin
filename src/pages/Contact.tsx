import React, { useState } from 'react';
import { ArrowLeftIcon, MailIcon, PhoneIcon, MessageCircleIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { NavigationMenu } from '../components/NavigationMenu';

export const Contact = () => {
  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォーム送信処理
    console.log('Contact form submitted:', formData);
    alert('お問い合わせありがとうございます。24時間以内にご返信いたします。');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: <MailIcon className="w-6 h-6" />,
      title: 'メール',
      description: 'support@datapocket.jp',
      response: '24時間以内に返信'
    },
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: '電話',
      description: '03-1234-5678',
      response: '平日 9:00-18:00'
    },
    {
      icon: <MessageCircleIcon className="w-6 h-6" />,
      title: 'チャット',
      description: 'オンラインサポート',
      response: '24時間対応'
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
            <h1 className="text-3xl font-bold text-gray-900">お問い合わせ</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">お問い合わせフォーム</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  お名前 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  件名 *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">選択してください</option>
                  <option value="esim">eSIMについて</option>
                  <option value="planner">AI旅行プランナーについて</option>
                  <option value="flight">フライト検索について</option>
                  <option value="technical">技術的な問題</option>
                  <option value="billing">お支払いについて</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  メッセージ *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="お問い合わせ内容を詳しくお聞かせください..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                送信する
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">お問い合わせ方法</h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="text-blue-600 mr-3">
                        {method.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{method.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-2">{method.description}</p>
                    <p className="text-sm text-gray-500">{method.response}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ClockIcon className="w-5 h-5 mr-2 text-blue-600" />
                営業時間
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>メール・チャット: 24時間対応</p>
                <p>電話: 平日 9:00-18:00 (JST)</p>
                <p>土日祝日: 10:00-17:00 (JST)</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPinIcon className="w-5 h-5 mr-2 text-blue-600" />
                所在地
              </h3>
              <div className="text-gray-600">
                <p>〒100-0001</p>
                <p>東京都千代田区千代田1-1-1</p>
                <p>DataPocket株式会社</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 