import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

// より詳細なグローバルエラーハンドラーを追加
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  console.error('Error message:', event.message);
  console.error('Error filename:', event.filename);
  console.error('Error lineno:', event.lineno);
  console.error('Error colno:', event.colno);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  console.error('Promise rejection details:', event);
});

// React エラーハンドラー
const originalConsoleError = console.error;
console.error = (...args) => {
  originalConsoleError.apply(console, args);
  // エラーの詳細をログに出力
  if (args[0] && typeof args[0] === 'string' && args[0].includes('Error')) {
    console.error('React Error Details:', args);
  }
};

// 開発環境でのみ詳細ログを有効化
if (import.meta.env.DEV) {
  console.log('Development mode - detailed error logging enabled');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

// Google Analytics (GA4) setup
if (import.meta.env.VITE_GA_ID) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`;
  document.head.appendChild(script);
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {(window as any).dataLayer.push(args);}
  gtag('js', new Date());
  gtag('config', import.meta.env.VITE_GA_ID);
}
