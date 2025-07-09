// OpenAI本番APIクライアント

export async function openai(prompt: string, options?: Record<string, unknown>) {
  const res = await fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, ...options })
  });
  return res.json();
} 