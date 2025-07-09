import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Loader2, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { createCheckoutSession } from '../utils/stripe';

const PaymentScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const plan = location.state?.plan;
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      // Stripe決済API呼び出し（ダミー）
      await new Promise(resolve => setTimeout(resolve, 1500));
      // const res = await createCheckoutSession({ planId: plan.id, ... })
      // window.location.href = res.url;
      navigate('/esim/qr', { state: { plan } });
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'purchase', {
          value: plan.price,
          currency: 'JPY',
          plan_name: plan.name,
          plan_id: plan.id
        });
      }
    } catch (e: any) {
      setError(e.message || '決済エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  if (!plan) return <div className="text-red-500 text-center py-10">{t('paymentscreen.no_plan')}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('paymentscreen.title')}</h1>
      <div className="bg-white rounded-xl shadow p-6 max-w-lg mx-auto mb-8">
        <div className="mb-4 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-blue-500" />
          <span className="font-bold text-lg">{plan.name}</span>
          <span className="text-gray-600">{plan.duration}</span>
        </div>
        <div className="mb-4 text-2xl font-bold text-blue-600">¥{plan.price.toLocaleString()}</div>
        <label className="flex items-center mb-4">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mr-2" />
          {t('paymentscreen.agree')}
        </label>
        <button
          className={`w-full px-6 py-3 rounded-full text-white font-bold text-lg flex items-center justify-center ${agreed ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500' : 'bg-gray-300 cursor-not-allowed'}`}
          disabled={!agreed || loading}
          onClick={handlePayment}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <CreditCard className="w-5 h-5 mr-2" />} {t('paymentscreen.pay')}
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        <div className="text-xs text-gray-400 mt-4">{t('paymentscreen.note')}</div>
      </div>
      <div className="text-center">
        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
        <div className="text-gray-600">{t('paymentscreen.secure')}</div>
      </div>
    </div>
  );
};

export default PaymentScreen; 