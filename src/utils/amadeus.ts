// Amadeus本番APIクライアント

const AMADEUS_API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const AMADEUS_API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;
const AMADEUS_API_BASE = import.meta.env.VITE_AMADEUS_API_BASE || 'https://test.api.amadeus.com';

async function getAccessToken() {
  const res = await fetch(`${AMADEUS_API_BASE}/v1/security/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`
  });
  if (!res.ok) throw new Error('Amadeus認証エラー');
  const data = await res.json();
  return data.access_token;
}

export async function searchCity(keyword: string) {
  const token = await getAccessToken();
  const res = await fetch(`${AMADEUS_API_BASE}/v1/reference-data/locations?subType=CITY&keyword=${encodeURIComponent(keyword)}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Amadeus都市検索エラー');
  return res.json();
} 