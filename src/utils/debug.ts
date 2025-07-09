import React from 'react';

// デバッグ用ユーティリティ
export const debugEnvironmentVariables = () => {
  const envVars = {
    VITE_GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    VITE_GOOGLE_TRANSLATE_API_KEY: import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY,
    VITE_OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
    VITE_STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
    VITE_STRIPE_SECRET_KEY: import.meta.env.VITE_STRIPE_SECRET_KEY,
    VITE_AMADEUS_API_KEY: import.meta.env.VITE_AMADEUS_API_KEY,
    VITE_AMADEUS_API_SECRET: import.meta.env.VITE_AMADEUS_API_SECRET,
    VITE_TRIPADVISOR_API_KEY: import.meta.env.VITE_TRIPADVISOR_API_KEY,
    VITE_ESIM_BASE: import.meta.env.VITE_ESIM_BASE,
    VITE_ESIM_TOKEN: import.meta.env.VITE_ESIM_TOKEN,
    VITE_AUTH0_CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID,
    VITE_AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN,
    VITE_GA_ID: import.meta.env.VITE_GA_ID,
  };

  console.log('=== Environment Variables Status ===');
  Object.entries(envVars).forEach(([key, value]) => {
    const status = value ? '✅' : '❌';
    console.log(`${status} ${key}: ${value || 'NOT SET'}`);
  });
  
  const missingVars = Object.entries(envVars)
    .filter(([key, value]) => !value || value === 'your_' + key.toLowerCase() + '_here')
    .map(([key]) => key);

  if (missingVars.length > 0) {
    console.warn('⚠️ Missing or default environment variables:', missingVars);
    console.warn('💡 Add these to Netlify environment variables');
  } else {
    console.log('✅ All environment variables are set');
  }

  return { envVars, missingVars };
};

// エラーログ用
export const logError = (error: any, context?: string) => {
  console.error(`🚨 Error${context ? ` in ${context}` : ''}:`, error);
  
  if (error instanceof Error) {
    console.error('📚 Error stack:', error.stack);
    console.error('📝 Error message:', error.message);
    console.error('🏷️ Error name:', error.name);
  }
  
  // 開発環境でのみ詳細ログ
  if (import.meta.env.DEV) {
    console.error('🔍 Full error object:', error);
  }
};

// アプリケーション初期化チェック
export const checkAppInitialization = () => {
  console.log('🔧 Checking application initialization...');
  
  // DOM要素の確認
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('❌ Root element not found');
    return false;
  }
  
  // React の確認
  if (typeof React === 'undefined') {
    console.error('❌ React not loaded');
    return false;
  }
  
  console.log('✅ Application initialization check passed');
  return true;
}; 