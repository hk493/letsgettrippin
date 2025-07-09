// eSIMGO APIクライアント雛形

const ESIM_BASE = import.meta.env.VITE_ESIM_BASE;
const ESIM_TOKEN = import.meta.env.VITE_ESIM_TOKEN;

export async function issueEsim(params: Record<string, string | number>) {
  const res = await fetch(`${ESIM_BASE}/api/v1/esim/issue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ESIM_TOKEN}`
    },
    body: JSON.stringify(params)
  });
  return res.json();
} 