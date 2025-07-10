import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackEvent } from '../utils/analytics';

// Hook for automatic page view tracking
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when location changes
    trackPageView(location.pathname);
  }, [location]);
};

// Hook for tracking time spent on page
export const useTimeTracking = (pageName: string) => {
  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // seconds
      if (timeSpent > 5) { // Only track if user spent more than 5 seconds
        trackEvent('time_on_page', 'Engagement', pageName, timeSpent);
      }
    };
  }, [pageName]);
};

// Hook for tracking user interactions
export const useInteractionTracking = () => {
  const trackClick = (elementName: string, page: string) => {
    trackEvent('click', 'User Interaction', `${page}_${elementName}`);
  };

  const trackFormSubmit = (formName: string) => {
    trackEvent('form_submit', 'Forms', formName);
  };

  const trackFeatureUse = (featureName: string) => {
    trackEvent('feature_use', 'App Features', featureName);
  };

  return {
    trackClick,
    trackFormSubmit,
    trackFeatureUse,
  };
};

// Hook for tracking conversion events
export const useConversionTracking = () => {
  const trackSignUp = (method: string) => {
    trackEvent('sign_up', 'Conversion', method);
  };

  const trackPurchase = (product: string, value: number) => {
    trackEvent('purchase', 'Conversion', product, value);
  };

  const trackDownload = (content: string) => {
    trackEvent('download', 'Conversion', content);
  };

  return {
    trackSignUp,
    trackPurchase,
    trackDownload,
  };
}; 