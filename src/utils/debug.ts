// デバッグ用ユーティリティ
export const debugEnvironmentVariables = () => {
  const envVars = {
    VITE_GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    VITE_GOOGLE_TRANSLATE_API_KEY: import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY,
    VITE_OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
    VITE_STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
    VITE_AMADEUS_API_KEY: import.meta.env.VITE_AMADEUS_API_KEY,
    VITE_TRIPADVISOR_API_KEY: import.meta.env.VITE_TRIPADVISOR_API_KEY,
    VITE_ESIM_BASE: import.meta.env.VITE_ESIM_BASE,
    VITE_AUTH0_CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID,
    VITE_GA_ID: import.meta.env.VITE_GA_ID,
  };

  console.log('Environment Variables Status:', envVars);
  
  const missingVars = Object.entries(envVars)
    .filter(([key, value]) => !value || value === 'your_' + key.toLowerCase() + '_here')
    .map(([key]) => key);

  if (missingVars.length > 0) {
    console.warn('Missing or default environment variables:', missingVars);
  }

  return { envVars, missingVars };
};

// エラーログ用
export const logError = (error: any, context?: string) => {
  console.error(`Error${context ? ` in ${context}` : ''}:`, error);
  
  if (error instanceof Error) {
    console.error('Error stack:', error.stack);
  }
  
  // 開発環境でのみ詳細ログ
  if (import.meta.env.DEV) {
    console.error('Full error object:', error);
  }
}; 