// TripAdvisor本番APIクライアント

const TRIPADVISOR_API_KEY = import.meta.env.VITE_TRIPADVISOR_API_KEY;
const TRIPADVISOR_API_BASE = import.meta.env.VITE_TRIPADVISOR_API_BASE || 'https://api.tripadvisor.com';

export async function searchAttractions(location: string) {
  const res = await fetch(`${TRIPADVISOR_API_BASE}/attractions/search?location=${encodeURIComponent(location)}`, {
    headers: {
      'x-api-key': TRIPADVISOR_API_KEY
    }
  });
  if (!res.ok) throw new Error('TripAdvisor観光地検索エラー');
  return res.json();
} 