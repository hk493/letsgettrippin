// OpenAI本番APIクライアント

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_BASE = import.meta.env.VITE_OPENAI_API_BASE || 'https://api.openai.com/v1';

export async function generateTravelPlan(messages: any[]) {
  // APIキーが設定されていない場合の処理
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
    console.warn('OpenAI API key is not configured');
    return {
      choices: [{
        message: {
          content: "I'm sorry, but the AI service is currently not configured. Please check back later or contact support."
        }
      }]
    };
  }

  try {
    const res = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        temperature: 0.7
      })
    });
    
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'OpenAI APIエラー');
    }
    
    return res.json();
  } catch (error) {
    console.error('OpenAI API error:', error);
    return {
      choices: [{
        message: {
          content: "I'm sorry, but there was an error connecting to the AI service. Please try again later."
        }
      }]
    };
  }
} 