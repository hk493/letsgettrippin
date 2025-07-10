// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

// Track page views
export const trackPageView = (page: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-Q65SK1WHYP', {
      page_path: page,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track eSIM purchase
export const trackESIMPurchase = (planName: string, price: number) => {
  trackEvent('purchase', 'eSIM', planName, price);
};

// Track travel plan creation
export const trackPlanCreation = (destination: string, duration: string) => {
  trackEvent('plan_creation', 'Travel Planning', `${destination}_${duration}`);
};

// Track user registration
export const trackRegistration = (method: string) => {
  trackEvent('sign_up', 'User', method);
};

// Track feature usage
export const trackFeatureUsage = (feature: string) => {
  trackEvent('feature_usage', 'App Features', feature);
};

// Track button clicks
export const trackButtonClick = (buttonName: string, page: string) => {
  trackEvent('button_click', 'UI Interaction', `${page}_${buttonName}`);
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submit', 'Forms', formName);
};

// Track search queries
export const trackSearch = (query: string, category: string) => {
  trackEvent('search', 'Search', `${category}_${query}`);
};

// Track social shares
export const trackSocialShare = (platform: string, content: string) => {
  trackEvent('share', 'Social', `${platform}_${content}`);
};

// Track time on page
export const trackTimeOnPage = (page: string, timeSpent: number) => {
  trackEvent('time_on_page', 'Engagement', page, timeSpent);
};

// Track conversion goals
export const trackConversion = (goal: string, value?: number) => {
  trackEvent('conversion', 'Goals', goal, value);
}; 