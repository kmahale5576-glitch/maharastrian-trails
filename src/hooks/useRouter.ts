import { useState, useEffect, useCallback } from 'react';

export interface RouteState {
  path: string;
  params: Record<string, string>;
  searchQuery: string;
}

export function useRouter() {
  const getCleanPath = (): string => {
    // Check hash first (if using #/destination/kalsubai-peak)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/')) {
      return hash.slice(1); // e.g. /destination/kalsubai-peak
    }
    // Fall back to pathname
    const pathname = window.location.pathname;
    return pathname === '' ? '/' : pathname;
  };

  const [currentPath, setCurrentPath] = useState<string>(getCleanPath());

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(getCleanPath());
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = useCallback((to: string) => {
    if (to.startsWith('#')) {
      // Internal element anchor scroll or hash route
      if (to.startsWith('#/')) {
        window.location.hash = to;
      } else {
        const el = document.querySelector(to);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
    } else {
      // Push state
      window.history.pushState({}, '', to);
    }
    setCurrentPath(getCleanPath());
    window.scrollTo(0, 0);
  }, []);

  return { currentPath, navigate };
}
