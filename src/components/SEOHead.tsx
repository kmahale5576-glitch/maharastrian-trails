import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  schemaJson?: object | object[];
}

export function SEOHead({
  title = 'Maharashtra Trails | Trekking and Nature Travel Guides',
  description = 'Discover trekking places in Maharashtra, historic hill forts, scenic waterfalls and nature trails with practical travel guides and trekking tips.',
  canonicalPath,
  ogImage,
  ogType = 'website',
  schemaJson
}: SEOProps) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Resolve Canonical URL
    const siteOrigin =
      (import.meta.env.VITE_SITE_URL as string | undefined) ||
      (typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')
        ? window.location.origin
        : 'https://maharastrian-trails-zyv4.vercel.app');

    const cleanPath = canonicalPath
      ? canonicalPath.startsWith('/')
        ? canonicalPath
        : `/${canonicalPath}`
      : typeof window !== 'undefined'
      ? window.location.pathname
      : '/';

    const fullCanonicalUrl = `${siteOrigin.replace(/\/$/, '')}${cleanPath === '/' ? '' : cleanPath}`;

    // 3. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 4. Update Robots Meta Tag (ensure indexable)
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 5. Update Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullCanonicalUrl);

    // 6. Update OpenGraph Tags
    const updateOrCreateMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateOrCreateMeta('og:title', title);
    updateOrCreateMeta('og:description', description);
    updateOrCreateMeta('og:type', ogType);
    updateOrCreateMeta('og:url', fullCanonicalUrl);
    updateOrCreateMeta('og:site_name', 'Maharashtra Trails');

    const defaultOgImage = `${siteOrigin.replace(/\/$/, '')}/og-preview.jpg`;
    const fullImg = ogImage
      ? (ogImage.startsWith('http') ? ogImage : `${siteOrigin.replace(/\/$/, '')}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`)
      : defaultOgImage;

    updateOrCreateMeta('og:image', fullImg);

    // 7. Update Twitter Tags
    const updateOrCreateTwitterMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateOrCreateTwitterMeta('twitter:title', title);
    updateOrCreateTwitterMeta('twitter:description', description);
    updateOrCreateTwitterMeta('twitter:card', 'summary_large_image');
    updateOrCreateTwitterMeta('twitter:image', fullImg);

    // 8. Dynamic Schema.org JSON-LD injection
    const existing = document.getElementById('dynamic-page-schema');
    if (existing) existing.remove();

    if (schemaJson) {
      const scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.id = 'dynamic-page-schema';

      // If array of schemas, wrap into @graph
      if (Array.isArray(schemaJson)) {
        scriptTag.text = JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': schemaJson
        });
      } else {
        scriptTag.text = JSON.stringify(schemaJson);
      }

      document.head.appendChild(scriptTag);
    }

    return () => {
      const script = document.getElementById('dynamic-page-schema');
      if (script) script.remove();
    };
  }, [title, description, canonicalPath, ogImage, ogType, schemaJson]);

  return null;
}
