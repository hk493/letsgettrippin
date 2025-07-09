import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Star, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { issueEsim } from '../utils/esimApi';

interface EsimPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  recommended?: boolean;
  benefit?: string;
}

const PlanSelection: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<EsimPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ダミーAPI呼び出し（本来はesimApi.tsで取得）
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPlans([
        { id: '1', name: t('planselection.plan1'), price: 1000, duration: '7日', recommended: true, benefit: t('planselection.benefit1') },
        { id: '2', name: t('planselection.plan2'), price: 2500, duration: '15日', benefit: t('planselection.benefit2') },
        { id: '3', name: t('planselection.plan3'), price: 3500, duration: '30日' }
      ]);
      setLoading(false);
    }, 800);
  }, [t]);

  const handleSelect = (plan: EsimPlan) => {
    // 決済ページへ遷移（plan情報を渡す）
    navigate('/payment', { state: { plan } });
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Sparkles className="w-8 h-8 animate-spin text-blue-500" /> {t('common.loading')}</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('planselection.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.id} className={`relative bg-white rounded-xl shadow p-6 flex flex-col items-center border-2 transition-transform hover:scale-105 ${plan.recommended ? 'border-pink-400 animate-pulse-glow' : 'border-gray-100'}`}>
            {plan.recommended && (
              <div className="absolute top-2 right-2 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Star className="w-4 h-4" />{t('planselection.recommended')}</div>
            )}
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="mb-2">{plan.duration}</p>
            <p className="mb-4 font-bold text-2xl">¥{plan.price.toLocaleString()}</p>
            {plan.benefit && <div className="mb-2 flex items-center gap-1 text-green-600"><CheckCircle className="w-5 h-5" />{plan.benefit}</div>}
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold hover:from-purple-500 hover:to-pink-500 transition-all mt-2" onClick={() => handleSelect(plan)}>{t('planselection.select')}</button>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-gray-500">{t('planselection.note')}</div>
    </div>
  );
};

export default PlanSelection; 