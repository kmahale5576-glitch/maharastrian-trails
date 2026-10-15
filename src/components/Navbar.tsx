import { useState, useEffect } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { BLOGS } from '../data/blogs';
import { Search, X, Menu, Compass, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (to: string) => void;
}

export function Navbar({ currentPath, navigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Lock body scroll when mobile menu or search is open
  useEffect(() => {
    if (mobileMenuOpen || searchModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, searchModalOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setMobileMenuOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (to: string) => {
    setMobileMenuOpen(false);
    navigate(to);
  };

  const filteredDestinations = searchQuery.trim()
    ? DESTINATIONS.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const filteredBlogs = searchQuery.trim()
    ? BLOGS.filter(
        (b) =>
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const isHome = currentPath === '/' || currentPath === '';
  const isDestinations = currentPath === '/destinations' || currentPath.startsWith('/destination/');
  const isBlogs = currentPath === '/blogs' || currentPath.startsWith('/blog/');
  const isAbout = currentPath === '/about';

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 rounded-sm shrink-0"
          >
            <span className="w-8 h-8 rounded-md bg-[#16382B] text-white flex items-center justify-center shadow-xs">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <polygon points="12 3 2 20 22 20" />
                <polygon points="12 3 17 20 7 20" />
              </svg>
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#16382B] whitespace-nowrap">
              Maharashtra Trails
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
            <button
              onClick={() => handleNavClick('/')}
              className={`whitespace-nowrap transition-colors hover:text-[#16382B] pb-1 relative ${
                isHome ? 'text-[#16382B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#16382B]' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('/destinations')}
              className={`whitespace-nowrap transition-colors hover:text-[#16382B] pb-1 relative ${
                isDestinations ? 'text-[#16382B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#16382B]' : ''
              }`}
            >
              Explore Destinations
            </button>
            <button
              onClick={() => handleNavClick('/blogs')}
              className={`whitespace-nowrap transition-colors hover:text-[#16382B] pb-1 relative ${
                isBlogs ? 'text-[#16382B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#16382B]' : ''
              }`}
            >
              Trekking Guides
            </button>
            <button
              onClick={() => handleNavClick('/about')}
              className={`whitespace-nowrap transition-colors hover:text-[#16382B] pb-1 relative ${
                isAbout ? 'text-[#16382B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#16382B]' : ''
              }`}
            >
              About
            </button>
          </nav>

          {/* Zone 3: Primary Action & Quick Search */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-stone-600 hover:text-[#16382B] hover:bg-stone-100 rounded-lg transition-colors flex items-center gap-2 text-xs font-medium"
              title="Search trails & articles (Ctrl+K)"
              aria-label="Search trails"
            >
              <Search className="w-4 h-4 text-stone-600" />
              <span className="hidden lg:inline text-stone-500">Search</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] bg-stone-200/80 text-stone-600 rounded">⌘K</kbd>
            </button>

            <button
              onClick={() => handleNavClick('/destinations')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#16382B] hover:bg-[#112d22] active:scale-[0.99] rounded-lg transition-all shadow-xs whitespace-nowrap"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Trails</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-stone-700 hover:text-[#16382B] rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#FBF9F5] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                <span className="font-serif text-lg font-bold text-[#16382B]">Maharashtra Trails</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-4 text-base font-medium text-stone-800">
                <button
                  onClick={() => handleNavClick('/')}
                  className={`text-left py-2 px-3 rounded-md transition-colors ${
                    isHome ? 'bg-[#16382B] text-white' : 'hover:bg-stone-100'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('/destinations')}
                  className={`text-left py-2 px-3 rounded-md transition-colors ${
                    isDestinations ? 'bg-[#16382B] text-white' : 'hover:bg-stone-100'
                  }`}
                >
                  Explore 16 Destinations
                </button>
                <button
                  onClick={() => handleNavClick('/blogs')}
                  className={`text-left py-2 px-3 rounded-md transition-colors ${
                    isBlogs ? 'bg-[#16382B] text-white' : 'hover:bg-stone-100'
                  }`}
                >
                  10 Trekking Guides
                </button>
                <button
                  onClick={() => handleNavClick('/about')}
                  className={`text-left py-2 px-3 rounded-md transition-colors ${
                    isAbout ? 'bg-[#16382B] text-white' : 'hover:bg-stone-100'
                  }`}
                >
                  About Sahyadri Heritage
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-100 transition-colors"
                >
                  <Search className="w-4 h-4 text-stone-500" />
                  <span>Search All Trails & Articles</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 text-xs text-stone-500 space-y-2">
              <p>Western Ghats · Sahyadri Range · Maharashtra, India</p>
              <p>© 2026 Maharashtra Trails</p>
            </div>
          </div>
        </div>
      )}

      {/* Live Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSearchModalOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden mt-8">
            <div className="p-4 border-b border-stone-200 flex items-center gap-3">
              <Search className="w-5 h-5 text-stone-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Kalsubai, Harishchandragad, waterfalls, forts, or guides..."
                className="w-full text-base text-stone-800 placeholder-stone-400 focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-stone-400 hover:text-stone-600 rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setSearchModalOpen(false)}
                className="text-xs text-stone-500 hover:text-stone-800 px-2 py-1 bg-stone-100 rounded"
              >
                ESC
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 divide-y divide-stone-100">
              {searchQuery.trim() === '' ? (
                <div className="py-8 text-center text-stone-400 text-sm">
                  Type destination names, fort locations, districts, or trekking topics...
                </div>
              ) : (
                <>
                  {filteredDestinations.length === 0 && filteredBlogs.length === 0 && (
                    <div className="py-8 text-center text-stone-500 text-sm">
                      No trails or articles matching "{searchQuery}".
                    </div>
                  )}

                  {filteredDestinations.length > 0 && (
                    <div className="pb-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                        Trekking Destinations
                      </div>
                      <div className="space-y-1">
                        {filteredDestinations.map((d) => (
                          <button
                            key={d.id}
                            onClick={() => {
                              setSearchModalOpen(false);
                              setSearchQuery('');
                              navigate(`/destination/${d.slug}`);
                            }}
                            className="w-full text-left p-2.5 rounded-lg hover:bg-stone-50 transition-colors flex items-center justify-between group"
                          >
                            <div>
                              <div className="text-sm font-semibold text-stone-900 group-hover:text-[#16382B]">
                                {d.name}
                              </div>
                              <div className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                                <span>{d.district}</span>
                                <span>·</span>
                                <span>{d.type}</span>
                                <span>·</span>
                                <span>{d.elevation}</span>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#16382B] group-hover:translate-x-1 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredBlogs.length > 0 && (
                    <div className="pt-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                        Trekking Guides & Blogs
                      </div>
                      <div className="space-y-1">
                        {filteredBlogs.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => {
                              setSearchModalOpen(false);
                              setSearchQuery('');
                              navigate(`/blog/${b.slug}`);
                            }}
                            className="w-full text-left p-2.5 rounded-lg hover:bg-stone-50 transition-colors flex items-center justify-between group"
                          >
                            <div>
                              <div className="text-sm font-semibold text-stone-900 group-hover:text-[#16382B] line-clamp-1">
                                {b.title}
                              </div>
                              <div className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                                <span>{b.category}</span>
                                <span>·</span>
                                <span>{b.readTime}</span>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#16382B] group-hover:translate-x-1 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
