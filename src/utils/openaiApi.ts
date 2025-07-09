// OpenAI GPT APIクライアント雛形
interface ImportMetaEnv {
  VITE_OPENAI_API_KEY: string;
}

declare interface ImportMeta {
  env: ImportMetaEnv;
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_BASE_URL = 'https://api.openai.com/v1';

export async function generateTravelPlan(prompt: string) {
  const res = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1200
    })
  });
  return res.json();
} 