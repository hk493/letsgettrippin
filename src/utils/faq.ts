// FAQ本番APIクライアント

const FAQ_API_BASE = import.meta.env.VITE_FAQ_API_BASE;
const FAQ_API_KEY = import.meta.env.VITE_FAQ_API_KEY;

export async function fetchFaqs() {
  const res = await fetch(`${FAQ_API_BASE}/faqs`, {
    headers: {
      'Authorization': `Bearer ${FAQ_API_KEY}`
    }
  });
  if (!res.ok) throw new Error('FAQ取得APIエラー');
  return res.json();
} 