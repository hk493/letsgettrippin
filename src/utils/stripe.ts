// Stripe APIクライアント雛形
interface ImportMetaEnv {
  VITE_STRIPE_KEY: string;
}

declare interface ImportMeta {
  env: ImportMetaEnv;
}

export async function createCheckoutSession(params: any) {
  // params例: { priceId, successUrl, cancelUrl }
  const res = await fetch('/api/stripe/checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  return res.json();
}

export async function createSubscription(params: any) {
  const res = await fetch('/api/stripe/subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  return res.json();
} 