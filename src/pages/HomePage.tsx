import { useState, useMemo } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { BLOGS } from '../data/blogs';
import { DestinationCard } from '../components/DestinationCard';
import { BlogCard } from '../components/BlogCard';
import { SEOHead } from '../components/SEOHead';
import { HERO_IMAGE, HERO_FALLBACK } from '../data/images';
import { Compass, ArrowRight, Shield, Mountain, Droplets, Castle, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';

interface HomePageProps {
  navigate: (to: string) => void;
}

export function HomePage({ navigate }: HomePageProps) {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter 16 destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      const matchesType =
        selectedType === 'All' ||
        (selectedType === 'Hill Fort' && d.type === 'Hill Fort') ||
        (selectedType === 'Mountain Summit' && d.type === 'Mountain Summit') ||
        (selectedType === 'Waterfalls & Valleys' && (d.type === 'Waterfall & Nature' || d.type === 'Canyon & Valley'));

      const matchesDifficulty =
        selectedDifficulty === 'All' ||
        (selectedDifficulty === 'Easy' && (d.difficulty === 'Easy' || d.difficulty === 'Easy-Moderate')) ||
        (selectedDifficulty === 'Moderate' && (d.difficulty === 'Moderate' || d.difficulty === 'Moderate-Challenging')) ||
        (selectedDifficulty === 'Challenging' && (d.difficulty === 'Challenging' || d.difficulty === 'Demanding'));

      const matchesSearch =
        searchQuery.trim() === '' ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesDifficulty && matchesSearch;
    });
  }, [selectedType, selectedDifficulty, searchQuery]);

  // Featured 4 destinations
  const featuredDestinations = useMemo(() => {
    return [
      DESTINATIONS.find((d) => d.slug === 'kalsubai-peak')!,
      DESTINATIONS.find((d) => d.slug === 'harishchandragad')!,
      DESTINATIONS.find((d) => d.slug === 'harihar-fort')!,
      DESTINATIONS.find((d) => d.slug === 'devkund-waterfall')!
    ].filter(Boolean);
  }, []);

  const homeFaqs = [
    {
      q: 'What makes trekking in Maharashtra and the Sahyadris unique?',
      a: 'Unlike the Himalayan snow ranges, Maharashtra offers an ancient volcanic terrain of stepped basalt cliffs, sub-tropical rainforests, and over 350 historic hill forts fortified during the Maratha Empire. Treks here seamlessly fuse natural beauty with living history, rock-cut water cisterns, and monumental stone gateways.'
    },
    {
      q: 'Which treks are most suitable for first-time hikers?',
      a: 'Lohagad Fort (near Lonavala), Sinhagad Fort (near Pune), and Karnala Fort (near Panvel) are ideal for beginners. They feature broad stone steps, gradual inclines, clear trail markers, and abundant local food and water facilities.'
    },
    {
      q: 'What is the best season to trek in Maharashtra?',
      a: 'Monsoon (July to September) offers lush greenery, rolling clouds, and roaring waterfalls. Post-monsoon (October to November) features clear blue skies, vibrant wildflowers, and cool breezes. Winter (December to February) is ideal for night camping and high-endurance summit climbs like Kalsubai and AMK.'
    },
    {
      q: 'What should I carry for a day trek in the Western Ghats?',
      a: 'Carry at least 2.5 to 3 liters of water, an electrolyte hydration packet, sturdy shoes with 4-5mm rubber tread, a light windproof jacket or rain poncho, high-energy dry fruits/nuts, a compact first-aid kit, and a trash bag to pack out all waste.'
    },
    {
      q: 'Are these trails safe during monsoon?',
      a: 'Most established fort trails are safe with proper footwear and caution. However, avoid deep canyon and waterfall treks like Devkund or Sandhan Valley during red-alert cloudburst warnings due to sudden flash-floods.'
    }
  ];

  const homeSchema = useMemo(() => {
    return [
      {
        '@type': 'WebSite',
        name: 'Maharashtra Trails',
        alternateName: 'Maharashtra Sahyadri Trails & Forts',
        description: 'Comprehensive field guide to 16 trekking destinations, historic Maratha hill forts, and waterfall trails across the Western Ghats.',
        inLanguage: 'en'
      },
      {
        '@type': 'Organization',
        name: 'Maharashtra Trails',
        description: 'Field guide publication and conservation initiative dedicated to documenting the Sahyadri mountains of Maharashtra, India.',
        logo: '/og-preview.jpg'
      }
    ];
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Maharashtra Trails | Trekking and Nature Travel Guides"
        description="Discover trekking places in Maharashtra, historic hill forts, scenic waterfalls and nature trails with practical travel guides and trekking tips."
        canonicalPath="/"
        ogImage="/og-preview.jpg"
        schemaJson={homeSchema}
      />

      {/* Hero Section */}
      <section className="relative bg-[#0E2018] text-white overflow-hidden">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Misty peaks and deep green volcanic ridges of the Sahyadri mountains in Maharashtra"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== HERO_FALLBACK && !target.src.endsWith(HERO_FALLBACK)) {
                target.src = HERO_FALLBACK;
              }
            }}
          />
          {/* Measured Scrim for WCAG AA Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2018] via-[#0E2018]/65 to-[#0E2018]/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="max-w-3xl">
            {/* Unboxed Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-300 mb-4">
              <span>Western Ghats</span>
              <span aria-hidden="true">·</span>
              <span>UNESCO World Heritage</span>
              <span aria-hidden="true">·</span>
              <span>Maharashtra, India</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Explore the Rugged Peaks & Historic Forts of Maharashtra
            </h1>

            <p className="mt-5 text-base sm:text-lg text-stone-200 leading-relaxed font-normal">
              Your field guide to the ancient Sahyadri mountains. Discover 16 hand-mapped trekking destinations, legendary Maratha hill fortresses, vertical rock staircases, and hidden monsoon waterfalls.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('destinations-directory');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else navigate('/destinations');
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#16382B] hover:bg-[#112d22] border border-emerald-600/40 rounded-lg transition-all shadow-md active:scale-[0.99]"
              >
                <Compass className="w-4 h-4 text-emerald-300" />
                <span>Explore 16 Destinations</span>
              </button>

              <button
                onClick={() => navigate('/blogs')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-100 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-xs border border-white/20 rounded-lg transition-all"
              >
                <span>Read Trekking Guides</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Metric Ribbon below Hero */}
        <div className="relative border-t border-white/15 bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
              <div>
                <div className="font-mono text-2xl font-bold text-white tabular-nums">16</div>
                <div className="text-xs text-stone-300 mt-0.5">Documented Expeditions</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">1,646 m</div>
                <div className="text-xs text-stone-300 mt-0.5">Highest Peak (Kalsubai)</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-white tabular-nums">350+</div>
                <div className="text-xs text-stone-300 mt-0.5">Historic Hill Fortresses</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">66 Million</div>
                <div className="text-xs text-stone-300 mt-0.5">Years of Deccan Volcanism</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction to Sahyadri Trekking */}
      <section className="py-16 sm:py-20 bg-[#FBF9F5] border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                Topography & Heritage
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                Where Basalt Peaks Meet Centuries of Maratha Valor
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                The Sahyadri range in Maharashtra presents an awe-inspiring geological theater. Formed millions of years ago by colossal volcanic lava flows, these stepped cliffs and table-top plateaus provided the natural foundations for legendary military architecture.
              </p>
              <p className="text-stone-600 text-sm leading-relaxed">
                Here, during the 17th century, Chhatrapati Shivaji Maharaj established the sovereign Maratha Empire. Every mountain ridge and rock-cut staircase tells a tale of strategic foresight, rainwater harvesting, and resilience.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                  <Mountain className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">High Summits</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Touch the clouds atop Kalsubai Peak, marvel at the wind-carved Nedhe at Ratangad, or tackle the technical AMK mountaineering traverse.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                  <Castle className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Hill Fortresses</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Scale the 80-degree steps of Harihar, gaze into the 2,000-foot abyss of Konkan Kada, and walk through the royal coronation grounds of Raigad.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                  <Droplets className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Waterfalls & Canyons</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Wade to the turquoise plunge pool of Devkund, ascend through flowing steps at Visapur, and venture into the dark slot canyon of Sandhan Valley.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-16 sm:py-20 bg-stone-50/50 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
                Curated Expeditions
              </div>
              <h2 className="font-serif text-3xl font-bold text-stone-900">
                Featured Sahyadri Destinations
              </h2>
            </div>
            <button
              onClick={() => navigate('/destinations')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#16382B] hover:text-emerald-950 transition-colors"
            >
              <span>View All 16 Trails</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((d) => (
              <DestinationCard
                key={d.id}
                destination={d}
                onSelect={(slug) => navigate(`/destination/${slug}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Full 16 Destinations Directory with Search & Filters */}
      <section id="destinations-directory" className="py-16 sm:py-20 bg-[#FBF9F5] border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
              Complete Directory
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Explore All 16 Maharashtra Trails
            </h2>
            <p className="mt-3 text-sm text-stone-600">
              Search and filter across Maharashtra\'s premier mountain peaks, historic fortresses, canyons, and waterfalls.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-2xs mb-10 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Live Search Input */}
              <div className="relative w-full md:max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, district (e.g. Pune, Ahmednagar, Raigad)..."
                  className="w-full pl-10 pr-4 py-2 text-sm text-stone-800 placeholder-stone-400 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:bg-white transition-all"
                />
              </div>

              {/* Segmented Filter Controls for Destination Type */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg w-full md:w-auto">
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

            {/* Difficulty Sub-Filter */}
            <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-stone-500">
                <Filter className="w-3.5 h-3.5 text-stone-400" />
                <span>Filter by Difficulty:</span>
                {['All', 'Easy', 'Moderate', 'Challenging'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedDifficulty === diff
                        ? 'bg-[#16382B] text-white font-medium'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              <div className="text-stone-500 font-mono">
                Showing <strong className="text-stone-900">{filteredDestinations.length}</strong> of 16 destinations
              </div>
            </div>
          </div>

          {/* Destination Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDestinations.map((d) => (
                <DestinationCard
                  key={d.id}
                  destination={d}
                  onSelect={(slug) => navigate(`/destination/${slug}`)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-stone-200 p-12 text-center max-w-lg mx-auto">
              <Mountain className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-stone-800">No matching trails found</h3>
              <p className="text-xs text-stone-500 mt-1">
                Try resetting your search query or adjusting the difficulty filters.
              </p>
              <button
                onClick={() => {
                  setSelectedType('All');
                  setSelectedDifficulty('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Trekking Guides & Blog Preview */}
      <section className="py-16 sm:py-20 bg-stone-50/50 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
                Field Knowledge
              </div>
              <h2 className="font-serif text-3xl font-bold text-stone-900">
                Trekking Guides & Practical Advice
              </h2>
            </div>
            <button
              onClick={() => navigate('/blogs')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#16382B] hover:text-emerald-950 transition-colors"
            >
              <span>View All 10 Guides</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Featured Lead Blog + Grid */}
          <div className="space-y-6">
            <BlogCard
              article={BLOGS[0]}
              onSelect={(slug) => navigate(`/blog/${slug}`)}
              featured={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {BLOGS.slice(1, 4).map((b) => (
                <BlogCard
                  key={b.id}
                  article={b}
                  onSelect={(slug) => navigate(`/blog/${slug}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nature Conservation & Leave No Trace Editorial Section */}
      <section className="py-16 sm:py-20 bg-[#16382B] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-medium mb-6">
            <Shield className="w-3.5 h-3.5" />
            <span>Preserving the Sahyadris for Future Generations</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
            Tread Softly, Preserve Ancient Heritage
          </h2>

          <p className="mt-4 text-stone-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            The hill forts of Maharashtra are sacred sanctuaries of history, constructed with the blood and sacrifice of our ancestors. Natural rock water cisterns (Dev Taki) are precious lifelines for both trekkers and mountain birds.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 p-5 rounded-lg border border-white/10 backdrop-blur-xs">
              <div className="font-serif font-bold text-base text-white mb-1.5">Pack It In, Pack It Out</div>
              <p className="text-xs text-stone-200 leading-relaxed">
                Carry a designated trash pouch and never leave plastic wrappers, bottle caps, or fruit peels on trails.
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-lg border border-white/10 backdrop-blur-xs">
              <div className="font-serif font-bold text-base text-white mb-1.5">Protect Ancient Walls</div>
              <p className="text-xs text-stone-200 leading-relaxed">
                Never deface stone gateways, bastions, or shrines. Do not wash utensils or use soaps in natural water tanks.
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-lg border border-white/10 backdrop-blur-xs">
              <div className="font-serif font-bold text-base text-white mb-1.5">Support Base Hamlets</div>
              <p className="text-xs text-stone-200 leading-relaxed">
                Eat fresh local village meals, engage certified local guides, and treat rural village families with gratitude.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => navigate('/blog/responsible-trekking-leave-no-trace')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-white underline underline-offset-4 transition-colors"
            >
              <span>Read the Complete Leave No Trace & Heritage Charter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Answer Engine Optimization FAQ Section */}
      <section className="py-16 sm:py-20 bg-[#FBF9F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
              Frequently Asked Questions
            </div>
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Essential Maharashtra Trekking Q&A
            </h2>
          </div>

          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {homeFaqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 py-2 focus:outline-none"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    {faq.q}
                  </span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-emerald-800 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="pt-2 pb-3 text-sm text-stone-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
