import React from 'react';

const faqs = [
  { q: 'eSIMの使い方は？', a: '購入後、QRコードをスマホで読み取るだけで利用開始できます。' },
  { q: 'AIプランナーは無料ですか？', a: '初回プラン生成は無料、詳細プレビューはサブスク契約が必要です。' },
  { q: 'どのデバイスで使えますか？', a: 'eSIM対応のiPhone, Pixel, Galaxyなどで利用可能です。' },
  { q: 'サポートはどこから受けられますか？', a: 'ダッシュボードまたはこのページからお問い合わせください。' }
];

const FAQPage: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">よくあるご質問（FAQ）</h1>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Q. {faq.q}</h2>
            <p>A. {faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FAQPage; 