import { useState, useMemo } from 'react';
import { BLOGS } from '../data/blogs';
import { BlogCard } from '../components/BlogCard';
import { SEOHead } from '../components/SEOHead';
import { Search, ChevronRight, BookOpen } from 'lucide-react';

interface BlogsPageProps {
  navigate: (to: string) => void;
}

export function BlogsPage({ navigate }: BlogsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Guides', 'Safety', 'Heritage', 'Preparation', 'Seasonal'];

  const filtered = useMemo(() => {
    return BLOGS.filter((b) => {
      const matchCat = selectedCategory === 'All' || b.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.content.intro.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#FBF9F5]">
      <SEOHead
        title="Trekking Guides & Blogs | Maharashtra Trails Field Knowledge"
        description="10 in-depth trekking guides covering Kalsubai routes, monsoon safety, Maratha fort history, packing essentials, and weekend escapes near Mumbai and Pune."
        canonicalUrl="https://maharashtratrails.com/blogs"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6" aria-label="Breadcrumb">
          <button onClick={() => navigate('/')} className="hover:text-stone-900 transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
          <span className="text-stone-900 font-medium">Trekking Guides & Blogs</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            Editorial Publications
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
            10 Field Guides & Trekking Articles
          </h1>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Essential long-form reading for mountain lovers. Learn route strategies, monsoon hazard management, historical fortress context, gear checklists, and ethical outdoor practices.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides by title, route, or topic..."
              className="w-full pl-10 pr-4 py-2 text-sm text-stone-800 placeholder-stone-400 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Lead Story if no search filter */}
        {!searchQuery && selectedCategory === 'All' && (
          <div className="mb-10">
            <BlogCard
              article={BLOGS[0]}
              onSelect={(slug) => navigate(`/blog/${slug}`)}
              featured={true}
            />
          </div>
        )}

        {/* All Articles Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedCategory === 'All' && !searchQuery ? filtered.slice(1) : filtered).map((article) => (
              <BlogCard
                key={article.id}
                article={article}
                onSelect={(slug) => navigate(`/blog/${slug}`)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center max-w-lg mx-auto my-12">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-stone-800">No articles match your search</h3>
            <p className="text-xs text-stone-500 mt-1">
              Try adjusting your query or selecting another category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
