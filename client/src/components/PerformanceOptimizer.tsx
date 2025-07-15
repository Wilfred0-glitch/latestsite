
import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));

    // Preload critical resources
    const preloadLinks = [
      '/images/hero-vr-kids-3d.svg',
      '/images/courses/roblox-course.jpg'
    ];

    preloadLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = href;
      document.head.appendChild(link);
    });

    return () => {
      images.forEach(img => imageObserver.unobserve(img));
    };
  }, []);

  return null;
}
