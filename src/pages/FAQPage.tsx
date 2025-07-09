import React, { useEffect, useState } from 'react';
import { fetchFaqs } from '../utils/faq';

const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFaqs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFaqs();
      setFaqs(data);
    } catch (e: any) {
      setError(e.message || 'FAQの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundImage: "url('/PHOTO-2025-06-28-13-41-57.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">よくあるご質問（FAQ）</h1>
        {loading && <div className="text-center text-blue-600 py-8">読み込み中...</div>}
        {error && (
          <div className="text-center text-red-600 py-8">
            {error}
            <button onClick={loadFaqs} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">再試行</button>
          </div>
        )}
        {!loading && !error && (
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-2">Q. {faq.q}</h2>
                <p>A. {faq.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage; 