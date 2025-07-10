// Admin本番APIクライアント

const ADMIN_API_BASE = import.meta.env.VITE_ADMIN_API_BASE;
const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY;

export async function fetchUsers() {
  const res = await fetch(`${ADMIN_API_BASE}/users`, {
    headers: { 'Authorization': `Bearer ${ADMIN_API_KEY}` }
  });
  if (!res.ok) throw new Error('ユーザー取得APIエラー');
  return res.json();
}

export async function fetchPlans() {
  const res = await fetch(`${ADMIN_API_BASE}/plans`, {
    headers: { 'Authorization': `Bearer ${ADMIN_API_KEY}` }
  });
  if (!res.ok) throw new Error('プラン取得APIエラー');
  return res.json();
}

export async function fetchFaqs() {
  const res = await fetch(`${ADMIN_API_BASE}/faqs`, {
    headers: { 'Authorization': `Bearer ${ADMIN_API_KEY}` }
  });
  if (!res.ok) throw new Error('FAQ取得APIエラー');
  return res.json();
}

export async function fetchReviews() {
  const res = await fetch(`${ADMIN_API_BASE}/reviews`, {
    headers: { 'Authorization': `Bearer ${ADMIN_API_KEY}` }
  });
  if (!res.ok) throw new Error('レビュー取得APIエラー');
  return res.json();
} 