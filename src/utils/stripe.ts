// Stripe APIクライアント雛形

export async function createCheckoutSession(params: Record<string, string | number>) {
  const res = await fetch('/api/stripe/checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  return res.json();
}

export async function createSubscription(params: Record<string, string | number>) {
  const res = await fetch('/api/stripe/subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  return res.json();
} 