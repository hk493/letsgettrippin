// eSIM本番APIクライアント

const ESIM_API_BASE = import.meta.env.VITE_ESIM_API_BASE;
const ESIM_API_KEY = import.meta.env.VITE_ESIM_API_KEY;

export async function issueEsim(params: { planId: string; userId?: string }) {
  const res = await fetch(`${ESIM_API_BASE}/esim/issue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ESIM_API_KEY}`
    },
    body: JSON.stringify(params)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'eSIM発行APIエラー');
  }
  return res.json();
} 