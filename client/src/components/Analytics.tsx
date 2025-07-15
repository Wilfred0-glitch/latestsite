
import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // Simple privacy-friendly analytics
    const trackPageView = () => {
      // Replace with your analytics service (Plausible, Simple Analytics, etc.)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: document.title,
          page_location: window.location.href,
        });
      }
    };

    trackPageView();

    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll >= 25 && maxScroll < 50) {
          // Track 25% scroll
        } else if (maxScroll >= 50 && maxScroll < 75) {
          // Track 50% scroll
        } else if (maxScroll >= 75) {
          // Track 75% scroll
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
