// TripAdvisor APIクライアント雛形
const TRIPADVISOR_API_KEY = import.meta.env.VITE_TRIPADVISOR_API_KEY;
const TRIPADVISOR_BASE_URL = 'https://api.tripadvisor.com/api/partner/2.0';

export async function getAttractions(params: Record<string, string | number>) {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`${TRIPADVISOR_BASE_URL}/location_mapper/attractions?${query}`, {
    headers: {
      'X-TripAdvisor-API-Key': TRIPADVISOR_API_KEY
    }
  });
  return res.json();
}

export async function getReviews(params: Record<string, string | number>) {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`${TRIPADVISOR_BASE_URL}/location_mapper/reviews?${query}`, {
    headers: {
      'X-TripAdvisor-API-Key': TRIPADVISOR_API_KEY
    }
  });
  return res.json();
} 