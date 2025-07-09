import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, Copy, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { issueEsim } from '../utils/esim';

const QRCodeScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const plan = location.state?.plan;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrData, setQrData] = useState<string | null>(null);

  const fetchEsim = async () => {
    setLoading(true);
    setError(null);
    try {
      // 本番API呼び出し
      const res = await issueEsim({ planId: plan.id });
      setQrData(res.qrCodeData);
      if (typeof window !== 'undefined' && 'gtag' in window) {
        const gtag = (window as { gtag: (...args: unknown[]) => void }).gtag;
        gtag('event', 'esim_issued', {
          plan_name: plan.name,
          plan_id: plan.id
        });
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'eSIM発行に失敗しました';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (plan) fetchEsim();
    else setLoading(false);
  }, [plan]);

  const handleCopy = () => {
    if (qrData) {
      navigator.clipboard.writeText(qrData);
      alert(t('qrscreen.copied'));
    }
  };

  const handleDownload = () => {
    if (!qrData) return;
    const link = document.createElement('a');
    link.href = qrData;
    link.download = 'esim-qr.png';
    link.click();
  };

  if (!plan) return <div className="text-red-500 text-center py-10">{t('qrscreen.no_plan')}</div>;
  if (loading) return <div className="text-center text-blue-600 py-10">eSIM発行中...</div>;
  if (error) return <div className="text-center text-red-600 py-10">{error}<button onClick={fetchEsim} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">再試行</button></div>;

  return (
    <div style={{ minHeight: '100vh', backgroundImage: "url('/PHOTO-2025-06-28-13-41-57.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">{t('qrscreen.title')}</h1>
        <div className="bg-white rounded-xl shadow p-6 max-w-lg mx-auto mb-8">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span className="font-bold text-lg">{plan.name}</span>
          </div>
          <div className="mb-4 text-gray-600">{t('qrscreen.desc')}</div>
          {loading ? (
            <div className="flex flex-col items-center py-8">
              <Loader2 className="w-10 h-10 animate-spin mb-2 text-blue-500" />
              <div>{t('qrscreen.loading')}</div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center py-8 text-red-500">
              <AlertCircle className="w-8 h-8 mb-2" />
              <div>{error}</div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img src={qrData!} alt="eSIM QR" className="w-48 h-48 mb-4 border" />
              <div className="flex gap-4 mb-4">
                <button onClick={handleCopy} className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                  <Copy className="w-4 h-4 mr-1" /> {t('qrscreen.copy')}
                </button>
                <button onClick={handleDownload} className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                  <Download className="w-4 h-4 mr-1" /> {t('qrscreen.download')}
                </button>
              </div>
              <div className="text-xs text-gray-400 mb-2">{t('qrscreen.note')}</div>
            </div>
          )}
          <div className="mt-6 text-sm text-gray-500">
            <ul className="list-disc pl-5">
              <li>{t('qrscreen.step1')}</li>
              <li>{t('qrscreen.step2')}</li>
              <li>{t('qrscreen.step3')}</li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold hover:from-purple-500 hover:to-pink-500">
            {t('qrscreen.goto_dashboard')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScreen; 