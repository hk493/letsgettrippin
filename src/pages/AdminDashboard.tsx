import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchUsers, fetchPlans, fetchFaqs as fetchAdminFaqs, fetchReviews as fetchAdminReviews } from '../utils/admin';

const dummyUsers = [
  { id: 'u1', name: 'Alice', email: 'alice@example.com', role: 'user' },
  { id: 'u2', name: 'Bob', email: 'bob@example.com', role: 'admin' },
];
const dummyPlans = [
  { id: 'p1', name: 'Japan Adventure', price: 3000 },
  { id: 'p2', name: 'Kyoto Autumn', price: 2500 },
];
const dummyFaqs = [
  { id: 'f1', question: 'How do I activate my eSIM?', answer: 'Scan the QR code.', category: 'eSIM' },
];
const dummyReviews = [
  { id: 'r1', user: 'Alice', comment: 'Great!', rating: 5, date: '2024-06-01' },
];

const tabs = ['users', 'plans', 'faqs', 'reviews'];

const kpis = [
  { labelKey: 'admin.kpi_mau', value: '10,000' },
  { labelKey: 'admin.kpi_new_users', value: '1,000' },
  { labelKey: 'admin.kpi_sales', value: '¥5,000,000' },
  { labelKey: 'admin.kpi_esim', value: '300' },
];
const salesData = [400000, 500000, 600000, 700000, 800000, 900000, 1000000];
const esimData = [20, 30, 40, 50, 60, 70, 80];
const months = ['1', '2', '3', '4', '5', '6', '7'];

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState(dummyUsers);
  const [plans, setPlans] = useState(dummyPlans);
  const [faqs, setFaqs] = useState(dummyFaqs);
  const [reviews, setReviews] = useState(dummyReviews);

  useEffect(() => {
    // 本番API: 各管理データ取得
    Promise.all([
      fetchUsers(),
      fetchPlans(),
      fetchAdminFaqs(),
      fetchAdminReviews()
    ])
      .then(([users, plans, faqs, reviews]) => {
        setUsers(users);
        setPlans(plans);
        setFaqs(faqs);
        setReviews(reviews);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundImage: "url('/PHOTO-2025-06-28-13-41-57.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">{t('admin.title')}</h1>
        {/* KPIサマリーカード */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {kpis.map(kpi => (
            <div key={kpi.labelKey} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">{t(kpi.labelKey)}</div>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </div>
          ))}
        </div>
        {/* KPIグラフ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-4">
            <div className="font-bold mb-2">{t('admin.kpi_sales_trend')}</div>
            <svg width="100%" height="120" viewBox="0 0 220 120">
              {salesData.map((v, i) => (
                <rect key={i} x={20 + i * 28} y={120 - v / 12000} width="20" height={v / 12000} fill="#6366f1" />
              ))}
              {salesData.map((v, i) => (
                <text key={i} x={30 + i * 28} y={115} fontSize="10" textAnchor="middle">{months[i]}</text>
              ))}
            </svg>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="font-bold mb-2">{t('admin.kpi_esim_trend')}</div>
            <svg width="100%" height="120" viewBox="0 0 220 120">
              {esimData.map((v, i) => (
                <circle key={i} cx={30 + i * 28} cy={120 - v * 1.2} r="4" fill="#10b981" />
              ))}
              {esimData.slice(1).map((v, i) => (
                <line key={i} x1={30 + i * 28} y1={120 - esimData[i] * 1.2} x2={30 + (i + 1) * 28} y2={120 - v * 1.2} stroke="#10b981" strokeWidth="2" />
              ))}
              {esimData.map((v, i) => (
                <text key={i} x={30 + i * 28} y={115} fontSize="10" textAnchor="middle">{months[i]}</text>
              ))}
            </svg>
          </div>
        </div>
        <div className="flex gap-4 mb-6">
          {tabs.map(tname => (
            <button
              key={tname}
              className={`px-4 py-2 rounded-full font-bold ${tab === tname ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setTab(tname)}
            >
              {t(`admin.tab_${tname}`)}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          {tab === 'users' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('admin.users')}</h2>
              <table className="w-full mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">ID</th>
                    <th className="p-2">{t('admin.name')}</th>
                    <th className="p-2">{t('admin.email')}</th>
                    <th className="p-2">{t('admin.role')}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b">
                      <td className="p-2">{u.id}</td>
                      <td className="p-2">{u.name}</td>
                      <td className="p-2">{u.email}</td>
                      <td className="p-2">{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === 'plans' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('admin.plans')}</h2>
              <table className="w-full mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">ID</th>
                    <th className="p-2">{t('admin.name')}</th>
                    <th className="p-2">{t('admin.price')}</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map(p => (
                    <tr key={p.id} className="border-b">
                      <td className="p-2">{p.id}</td>
                      <td className="p-2">{p.name}</td>
                      <td className="p-2">¥{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === 'faqs' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('admin.faqs')}</h2>
              <table className="w-full mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">ID</th>
                    <th className="p-2">{t('admin.question')}</th>
                    <th className="p-2">{t('admin.answer')}</th>
                    <th className="p-2">{t('admin.category')}</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.map(f => (
                    <tr key={f.id} className="border-b">
                      <td className="p-2">{f.id}</td>
                      <td className="p-2">{f.question}</td>
                      <td className="p-2">{f.answer}</td>
                      <td className="p-2">{f.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === 'reviews' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('admin.reviews')}</h2>
              <table className="w-full mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">ID</th>
                    <th className="p-2">{t('admin.user')}</th>
                    <th className="p-2">{t('admin.comment')}</th>
                    <th className="p-2">{t('admin.rating')}</th>
                    <th className="p-2">{t('admin.date')}</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map(r => (
                    <tr key={r.id} className="border-b">
                      <td className="p-2">{r.id}</td>
                      <td className="p-2">{r.user}</td>
                      <td className="p-2">{r.comment}</td>
                      <td className="p-2">{r.rating}</td>
                      <td className="p-2">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 