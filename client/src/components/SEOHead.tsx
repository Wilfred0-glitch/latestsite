
import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export default function SEOHead({ 
  title = "Code Garden - Coding Classes for Kids | Learn Programming",
  description = "Premier coding education for kids aged 6-18. Learn Roblox, Python, Web Development, Cybersecurity, AI & more. Expert instructors, hands-on projects, future-ready skills.",
  keywords = "coding classes for kids, programming for children, Roblox development, Python for kids, web development, cybersecurity for teens, AI machine learning kids",
  image = "/images/hero-vr-kids-3d.svg"
}: SEOHeadProps) {
  useEffect(() => {
    // Update meta tags
    document.title = title;
    
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image }
    ];

    metaTags.forEach(tag => {
      let element = document.querySelector(`meta[${tag.name ? 'name' : 'property'}="${tag.name || tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        if (tag.name) element.setAttribute('name', tag.name);
        if (tag.property) element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Code Garden",
      "description": description,
      "url": window.location.origin,
      "image": image,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Port Harcourt",
        "addressRegion": "Rivers State",
        "addressCountry": "Nigeria"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+234 810 502 5758",
        "contactType": "customer service",
        "email": "info.codegarden@gmail.com"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [title, description, keywords, image]);

  return null;
}
