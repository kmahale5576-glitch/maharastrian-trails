import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  schemaJson?: object;
}

export function SEOHead({
  title = 'Maharashtra Trails | Trekking and Nature Travel Guides',
  description = 'Discover trekking places in Maharashtra, historic hill forts, scenic waterfalls and nature trails with practical travel guides and trekking tips.',
  canonicalUrl,
  schemaJson
}: SEOProps) {
  useEffect(() => {
    // Update Document Title
    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update Canonical
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }

    // Dynamic Schema.org JSON-LD
    let scriptTag: HTMLScriptElement | null = null;
    if (schemaJson) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.text = JSON.stringify(schemaJson);
      scriptTag.id = 'dynamic-page-schema';
      // Remove any previous dynamic schema
      const existing = document.getElementById('dynamic-page-schema');
      if (existing) existing.remove();
      document.head.appendChild(scriptTag);
    }

    return () => {
      const existing = document.getElementById('dynamic-page-schema');
      if (existing) existing.remove();
    };
  }, [title, description, canonicalUrl, schemaJson]);

  return null;
}
