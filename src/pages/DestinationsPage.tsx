import { useState, useMemo } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { DestinationCard } from '../components/DestinationCard';
import { SEOHead } from '../components/SEOHead';
import { Search, ChevronRight, Mountain } from 'lucide-react';

interface DestinationsPageProps {
  navigate: (to: string) => void;
}

export function DestinationsPage({ navigate }: DestinationsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  // Unique districts
  const districts = useMemo(() => {
    const list = Array.from(new Set(DESTINATIONS.map((d) => d.district.split('/')[0].trim())));
    return ['All', ...list.sort()];
  }, []);

  const filtered = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      const matchType =
        selectedType === 'All' ||
        (selectedType === 'Hill Fort' && d.type === 'Hill Fort') ||
        (selectedType === 'Mountain Summit' && d.type === 'Mountain Summit') ||
        (selectedType === 'Waterfalls & Valleys' && (d.type === 'Waterfall & Nature' || d.type === 'Canyon & Valley'));

      const matchDiff =
        selectedDifficulty === 'All' ||
        (selectedDifficulty === 'Easy' && (d.difficulty === 'Easy' || d.difficulty === 'Easy-Moderate')) ||
        (selectedDifficulty === 'Moderate' && (d.difficulty === 'Moderate' || d.difficulty === 'Moderate-Challenging')) ||
        (selectedDifficulty === 'Challenging' && (d.difficulty === 'Challenging' || d.difficulty === 'Demanding'));

      const matchDist = selectedDistrict === 'All' || d.district.includes(selectedDistrict);

      const matchSearch =
        searchQuery.trim() === '' ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.baseVillage.toLowerCase().includes(searchQuery.toLowerCase());

      return matchType && matchDiff && matchDist && matchSearch;
    });
  }, [selectedType, selectedDifficulty, selectedDistrict, searchQuery]);

  const catalogSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: '16 Trekking Destinations in Maharashtra',
      description: 'Directory of major mountain peaks, hill fortresses, and waterfall trails across the Sahyadri Western Ghats.',
      numberOfItems: DESTINATIONS.length,
      itemListElement: DESTINATIONS.map((d, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: d.name,
        description: d.tagline,
        url: typeof window !== 'undefined' ? `${window.location.origin}/destination/${d.slug}` : `/destination/${d.slug}`
      }))
    };
  }, []);

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#FBF9F5]">
      <SEOHead
        title="16 Trekking Destinations in Maharashtra | Forts, Summits & Waterfalls"
        description="Comprehensive directory of 16 trekking places across Maharashtra Sahyadris: Kalsubai, Harishchandragad, Harihar, Devkund, Raigad, Rajgad, and more."
        canonicalPath="/destinations"
        ogImage="/og-preview.jpg"
        schemaJson={catalogSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6" aria-label="Breadcrumb">
          <button onClick={() => navigate('/')} className="hover:text-stone-900 transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
          <span className="text-stone-900 font-medium">Destinations Directory</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            Field Expeditions
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
            16 Premier Maharashtra Trails
          </h1>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Detailed trail logs, route directions, safety advisories, and elevation stats for every major mountain summit, Maratha citadel, and waterfall gorge in Maharashtra.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="relative md:col-span-5">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search trails by name, district, or base village..."
                className="w-full pl-10 pr-4 py-2 text-sm text-stone-800 placeholder-stone-400 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:bg-white"
              />
            </div>

            {/* Type Segmented Buttons */}
            <div className="md:col-span-7 flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg justify-start md:justify-end">
              {['All', 'Hill Fort', 'Mountain Summit', 'Waterfalls & Valleys'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    selectedType === type
                      ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Sub Filters: Difficulty & District */}
          <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              {/* Difficulty */}
              <div className="flex items-center gap-2 text-stone-500">
                <span className="font-medium text-stone-700">Difficulty:</span>
                {['All', 'Easy', 'Moderate', 'Challenging'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      selectedDifficulty === diff
                        ? 'bg-[#16382B] text-white font-medium'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              {/* District Dropdown */}
              <div className="flex items-center gap-2 text-stone-500">
                <span className="font-medium text-stone-700">District:</span>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="bg-stone-50 border border-stone-200 text-stone-800 rounded px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700"
                >
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-stone-500 font-mono">
              Showing <strong className="text-stone-900">{filtered.length}</strong> of 16
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((d) => (
              <DestinationCard
                key={d.id}
                destination={d}
                onSelect={(slug) => navigate(`/destination/${slug}`)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center max-w-lg mx-auto my-12">
            <Mountain className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-stone-800">No destinations match your filters</h3>
            <p className="text-xs text-stone-500 mt-1">
              Try selecting a different district or clearing your search term.
            </p>
            <button
              onClick={() => {
                setSelectedType('All');
                setSelectedDifficulty('All');
                setSelectedDistrict('All');
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
