/**
 * Performance Monitoring Utility
 * Tracks Web Vitals and custom metrics
 */

import { onCLS, onFID, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

// Report to analytics endpoint
function sendToAnalytics(metric: Metric) {
  // Send to your analytics endpoint
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  });

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics', body);
  } else {
    fetch('/api/analytics', {
      body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      keepalive: true,
    });
  }

  // Also log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }
}

// Initialize Web Vitals tracking
export function initWebVitals() {
  onCLS(sendToAnalytics); // Cumulative Layout Shift
  onFID(sendToAnalytics); // First Input Delay
  onFCP(sendToAnalytics); // First Contentful Paint
  onLCP(sendToAnalytics); // Largest Contentful Paint
  onTTFB(sendToAnalytics); // Time to First Byte
}

// Custom performance markers
export const performance = {
  mark: (name: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name);
    }
  },

  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        const measure = window.performance.measure(name, startMark, endMark);
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Performance] ${name}:`, `${measure.duration.toFixed(2)}ms`);
        }
        
        return measure.duration;
      } catch (error) {
        console.error('Performance measure failed:', error);
      }
    }
    return 0;
  },

  clearMarks: (name?: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.clearMarks(name);
    }
  },

  clearMeasures: (name?: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.clearMeasures(name);
    }
  },
};

// Track API call performance
export function trackApiCall(endpoint: string, duration: number, success: boolean) {
  const metric = {
    type: 'api_call',
    endpoint,
    duration,
    success,
    timestamp: Date.now(),
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('[API Performance]', metric);
  }

  // Send to analytics
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics', JSON.stringify(metric));
  }
}

// Track component render performance
export function trackRender(componentName: string, duration: number) {
  const metric = {
    type: 'component_render',
    component: componentName,
    duration,
    timestamp: Date.now(),
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('[Render Performance]', metric);
  }
}

// Get current performance metrics
export function getPerformanceMetrics() {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  return {
    // Navigation timing
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    download: navigation.responseEnd - navigation.responseStart,
    domInteractive: navigation.domInteractive - navigation.fetchStart,
    domComplete: navigation.domComplete - navigation.fetchStart,
    loadComplete: navigation.loadEventEnd - navigation.fetchStart,

    // Paint timing
    fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
    
    // Memory (if available)
    memory: (performance as any).memory ? {
      usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
      totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
      jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
    } : null,
  };
}

// Export for use in _app.tsx or layout.tsx
export default initWebVitals;
