// Review本番APIクライアント

const REVIEW_API_BASE = import.meta.env.VITE_REVIEW_API_BASE;
const REVIEW_API_KEY = import.meta.env.VITE_REVIEW_API_KEY;

export async function fetchReviews() {
  const res = await fetch(`${REVIEW_API_BASE}/reviews`, {
    headers: {
      'Authorization': `Bearer ${REVIEW_API_KEY}`
    }
  });
  if (!res.ok) throw new Error('レビュー取得APIエラー');
  return res.json();
}

export async function postReview(data: { comment: string; rating: number; user?: string }) {
  const res = await fetch(`${REVIEW_API_BASE}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${REVIEW_API_KEY}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('レビュー投稿APIエラー');
  return res.json();
} 