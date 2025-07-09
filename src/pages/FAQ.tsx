import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { fetchFaqs } from '../utils/faq';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQPage: React.FC = () => {
  const { t } = useLanguage();
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    // 本番API: fetchFaqs().then(setFaqs).catch(setError).finally(() => setLoading(false));
    fetchFaqs()
      .then(data => setFaqs(data))
      .catch(e => setError(e.message || 'FAQ取得に失敗しました'))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...Array.from(new Set(faqs.map(f => f.category)))];
  const filteredFaqs = faqs.filter(f =>
    (category === 'all' || f.category === category) &&
    (f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('faq.title')}</h1>
      <div className="max-w-lg mx-auto mb-6 flex gap-2">
        <div className="relative flex-1">
          <input
            className="border rounded-full pl-10 pr-4 py-2 w-full"
            placeholder={t('faq.search')}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <select
          className="border rounded-full px-4 py-2"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat === 'all' ? t('faq.all') : cat}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="text-center py-10 text-blue-500">{t('faq.loading')}</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : filteredFaqs.length === 0 ? (
        <div className="text-center py-10 text-gray-500">{t('faq.no_results')}</div>
      ) : (
        <div className="max-w-lg mx-auto flex flex-col gap-4">
          {filteredFaqs.map(faq => (
            <div key={faq.id} className="bg-white rounded-xl shadow p-4">
              <button
                className="w-full flex justify-between items-center font-bold text-left text-lg"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              >
                {faq.question}
                {openId === faq.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {openId === faq.id && (
                <div className="mt-2 text-gray-700 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQPage; 