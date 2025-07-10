import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// エラーハンドリングを一時的に無効化（無限ループ問題のため）
// const originalConsoleError = console.error;
// console.error = (...args) => {
//   originalConsoleError.apply(console, args);
// };

// グローバルエラーハンドラーも一時的に無効化
// window.addEventListener('error', (event) => {
//   console.error('Global error:', event.error);
// });

// window.addEventListener('unhandledrejection', (event) => {
//   console.error('Unhandled promise rejection:', event.reason);
// });

// 開発環境でのみ詳細ログを有効化
if (import.meta.env.DEV) {
  console.log('Development mode - detailed error logging enabled');
}

function gtag(...args: unknown[]) {
  if (
    typeof window !== 'undefined' &&
    typeof (window as unknown as { dataLayer?: unknown[] }).dataLayer !== 'undefined'
  ) {
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push(args);
  }
}

// Google Analytics (GA4) setup
if (import.meta.env.VITE_GA_ID) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`;
  document.head.appendChild(script);
  if (typeof window !== 'undefined') {
    if (typeof (window as unknown as { dataLayer?: unknown[] }).dataLayer === 'undefined') {
      (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
    }
  }
  gtag('js', new Date());
  gtag('config', import.meta.env.VITE_GA_ID);
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
