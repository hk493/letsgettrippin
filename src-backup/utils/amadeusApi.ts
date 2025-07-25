// Amadeus APIクライアント雛形
const AMADEUS_CLIENT_ID = import.meta.env.VITE_AMADEUS_CLIENT_ID;
const AMADEUS_API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com/v1';

export async function getAccessToken() {
  const res = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=client_credentials&client_id=${AMADEUS_CLIENT_ID}&client_secret=${AMADEUS_API_SECRET}`
  });
  const data = await res.json();
  return data.access_token;
}

export async function searchFlights(params: Record<string, string | number>) {
  const token = await getAccessToken();
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`${AMADEUS_BASE_URL}/shopping/flight-offers?${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function searchHotels(params: Record<string, string | number>) {
  const token = await getAccessToken();
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`${AMADEUS_BASE_URL}/shopping/hotel-offers?${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function searchCarRentals(params: Record<string, string | number>) {
  const token = await getAccessToken();
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`${AMADEUS_BASE_URL}/shopping/car-rental-offers?${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
} 