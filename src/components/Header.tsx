import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Globe, User, LogOut, BookOpen, Smartphone, CreditCard, Star, List, HelpCircle, Settings, Users, Map, CheckCircle, Edit3, BarChart2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LoginModal from './LoginModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'ホーム', icon: <Home className="w-5 h-5" /> },
    { to: '/language', label: '言語選択', icon: <Globe className="w-5 h-5" /> },
    { to: '/plan', label: '旅行プラン作成', icon: <BookOpen className="w-5 h-5" /> },
    { to: '/plan/preview', label: 'プランプレビュー', icon: <List className="w-5 h-5" /> },
    { to: '/esim', label: 'eSIMプラン', icon: <Smartphone className="w-5 h-5" /> },
    { to: '/payment', label: 'お支払い', icon: <CreditCard className="w-5 h-5" /> },
    { to: '/esim/qr', label: 'eSIMアクティベーション', icon: <CheckCircle className="w-5 h-5" /> },
    { to: '/dashboard', label: 'ダッシュボード', icon: <User className="w-5 h-5" /> },
    { to: '/reviews', label: '体験レビュー', icon: <Star className="w-5 h-5" /> },
    { to: '/devices', label: 'デバイス一覧', icon: <Smartphone className="w-5 h-5" /> },
    { to: '/faq', label: 'FAQ/サポート', icon: <HelpCircle className="w-5 h-5" /> },
    { to: '/admin', label: '管理者', icon: <BarChart2 className="w-5 h-5" />, adminOnly: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur shadow border-b border-pink-100 h-20 flex items-center px-4 md:px-10">
      <div className="flex-1 flex items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          <img src="/datapocket-logo-latest.png" alt="logo" className="h-10 w-10 mr-2" onError={e => (e.currentTarget.style.display = 'none')} />
          DataPocket
        </Link>
      </div>
      <nav className="hidden md:flex gap-4 items-center">
        {navLinks.map(link => {
          if (link.adminOnly && (!user || user.email !== 'admin@datapocket.com')) return null;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition ${isActive(link.to) ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50 text-gray-700'}`}
            >
              {link.icon} <span>{link.label}</span>
            </Link>
          );
        })}
        {user ? (
          <button onClick={logout} className="flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-blue-50">
            <LogOut className="w-5 h-5" /> ログアウト
          </button>
        ) : (
          <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-blue-50">
            <User className="w-5 h-5" /> ログイン
          </button>
        )}
      </nav>
      {/* モバイル用ハンバーガー */}
      <button className="md:hidden ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span className="sr-only">メニュー</span>
        <List className="w-7 h-7" />
      </button>
      {isMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white shadow-lg border-b z-50 flex flex-col md:hidden">
          {navLinks.map(link => {
            if (link.adminOnly && (!user || user.email !== 'admin@datapocket.com')) return null;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-6 py-4 border-b font-medium ${isActive(link.to) ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50 text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon} <span>{link.label}</span>
              </Link>
            );
          })}
          {user ? (
            <button onClick={logout} className="flex items-center gap-2 px-6 py-4 font-medium text-gray-700 hover:bg-blue-50">
              <LogOut className="w-5 h-5" /> ログアウト
            </button>
          ) : (
            <button onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }} className="flex items-center gap-2 px-6 py-4 font-medium text-gray-700 hover:bg-blue-50">
              <User className="w-5 h-5" /> ログイン
            </button>
          )}
        </div>
      )}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
};

export default Header;