import React, { useState } from 'react';
import { MenuIcon, XIcon, HomeIcon, WifiIcon, MapIcon, PlaneIcon, UsersIcon, HelpCircleIcon, MailIcon, FileTextIcon, BuildingIcon, ShieldIcon, BriefcaseIcon, HandshakeIcon, SmartphoneIcon, RocketIcon, SparklesIcon } from 'lucide-react';

interface NavigationMenuProps {
  onNavigate: (path: string) => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      title: 'ホーム',
      path: '/',
      icon: <HomeIcon className="w-5 h-5" />,
      description: 'Trippinのメインページ'
    },
    {
      title: 'AI旅行プランナー',
      path: '/planner',
      icon: <MapIcon className="w-5 h-5" />,
      description: 'AIが旅行プランを作成'
    },
    {
      title: 'eSIMプラン選択',
      path: '/plans',
      icon: <WifiIcon className="w-5 h-5" />,
      description: '日本eSIMプランを選択'
    },
    {
      title: 'フライト検索',
      path: '/flight-search',
      icon: <PlaneIcon className="w-5 h-5" />,
      description: '最安値フライトを検索'
    },
    {
      title: 'デバイス管理',
      path: '/devices',
      icon: <SmartphoneIcon className="w-5 h-5" />,
      description: '登録デバイスの管理'
    },
    {
      title: 'ヘルプセンター',
      path: '/help',
      icon: <HelpCircleIcon className="w-5 h-5" />,
      description: 'サポートとよくある質問'
    },
    {
      title: 'お問い合わせ',
      path: '/contact',
      icon: <MailIcon className="w-5 h-5" />,
      description: 'お問い合わせフォーム'
    },
    {
      title: '利用規約',
      path: '/terms',
      icon: <FileTextIcon className="w-5 h-5" />,
      description: 'Trippin利用規約'
    },
    {
      title: '会社概要',
      path: '/about',
      icon: <BuildingIcon className="w-5 h-5" />,
      description: '会社情報と沿革'
    },
    {
      title: 'プライバシーポリシー',
      path: '/privacy',
      icon: <ShieldIcon className="w-5 h-5" />,
      description: '個人情報保護方針'
    },
    {
      title: '採用情報',
      path: '/careers',
      icon: <BriefcaseIcon className="w-5 h-5" />,
      description: '募集職種と応募情報'
    },
    {
      title: 'パートナー',
      path: '/partners',
      icon: <HandshakeIcon className="w-5 h-5" />,
      description: 'パートナー企業情報'
    }
  ];

  const handleMenuClick = (path: string) => {
    onNavigate(path);
    setIsOpen(false);
  };

  const handleDemoAccess = () => {
    window.location.href = '/?demo=true';
    setIsOpen(false);
  };

  const handleTravelPlannerAccess = () => {
    window.location.href = '/?planner=true';
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="メニューを開く"
      >
        {isOpen ? (
          <XIcon className="w-6 h-6 text-gray-700" />
        ) : (
          <MenuIcon className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">メニュー</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              {/* Special Action Buttons */}
              <div className="mb-4 space-y-2">
                <button
                  onClick={handleDemoAccess}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-3 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                >
                  <RocketIcon className="w-4 h-4 mr-2" />
                  <span>新体験をプレビュー</span>
                </button>
                <p className="text-xs text-gray-500 text-center">次世代Trippinを体験</p>
                
                <button
                  onClick={handleTravelPlannerAccess}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-3 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                >
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  <span>AI旅行プランナー</span>
                </button>
                <p className="text-xs text-gray-500 text-center">AIが完璧な旅程を作成</p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-4"></div>

              {/* Menu Items */}
              <div className="space-y-0">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleMenuClick(item.path)}
                    className="w-full p-2 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-600 group-hover:text-blue-700">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer - Always at bottom */}
          <div className="p-4 border-t border-gray-200 bg-white mt-auto">
            <div className="text-center">
              <div className="text-xl mb-1">🦊</div>
              <div className="text-sm text-gray-500">
                Trippin
              </div>
              <div className="text-xs text-gray-400">
                日本旅行をより楽しく
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 