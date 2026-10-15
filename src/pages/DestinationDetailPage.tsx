import { useState, useMemo } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { BLOGS } from '../data/blogs';
import { SEOHead } from '../components/SEOHead';
import {
  ChevronRight,
  MapPin,
  Clock,
  Compass,
  ArrowLeft,
  ShieldAlert,
  Backpack,
  ChevronDown,
  ChevronUp,
  Mountain,
  Share2,
  Check
} from 'lucide-react';

interface DestinationDetailPageProps {
  slug: string;
  navigate: (to: string) => void;
}

export function DestinationDetailPage({ slug, navigate }: DestinationDetailPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const destination = useMemo(() => {
    return DESTINATIONS.find((d) => d.slug === slug);
  }, [slug]);

  if (!destination) {
    return (
      <div className="min-h-screen py-20 px-4 max-w-xl mx-auto text-center">
        <h1 className="font-serif text-2xl font-bold text-stone-900">Destination Not Found</h1>
        <p className="mt-2 text-sm text-stone-600">The trail you requested could not be located in our directory.</p>
        <button
          onClick={() => navigate('/destinations')}
          className="mt-6 px-4 py-2 bg-[#16382B] text-white text-xs font-semibold rounded-lg"
        >
          Back to All Destinations
        </button>
      </div>
    );
  }

  // Related destinations
  const relatedDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => destination.relatedDestinationSlugs.includes(d.slug)).slice(0, 3);
  }, [destination]);

  // Related blogs
  const relatedBlogs = useMemo(() => {
    return BLOGS.filter((b) => destination.relatedBlogSlugs.includes(b.slug)).slice(0, 2);
  }, [destination]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.overview,
    touristType: destination.type,
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'IN',
      addressRegion: destination.district + ', Maharashtra'
    },
    includesAttraction: {
      '@type': 'TouristAttraction',
      name: destination.name,
      description: destination.tagline
    }
  };

  return (
    <article className="min-h-screen py-8 sm:py-12 bg-[#FBF9F5]">
      <SEOHead
        title={`${destination.name} Trek Guide: Route, Difficulty & Best Time | Maharashtra Trails`}
        description={destination.overview.slice(0, 155)}
        canonicalUrl={`https://maharashtratrails.com/destination/${destination.slug}`}
        schemaJson={schemaJson}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center justify-between text-xs text-stone-500 mb-6" aria-label="Breadcrumb">
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            <button onClick={() => navigate('/')} className="hover:text-stone-900 transition-colors">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
            <button onClick={() => navigate('/destinations')} className="hover:text-stone-900 transition-colors">
              Destinations
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
            <span className="text-stone-900 font-medium truncate">{destination.name}</span>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-md transition-colors shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>
        </nav>

        {/* Hero Title Block */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span className="font-semibold text-emerald-800 uppercase tracking-wider">
              {destination.type}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-stone-400" />
              {destination.district} District
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{destination.region}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            {destination.name}
          </h1>

          {destination.marathiName && (
            <div className="font-serif text-base text-stone-500 italic mt-1">
              {destination.marathiName}
            </div>
          )}

          <p className="mt-3 text-base sm:text-lg text-stone-600 leading-relaxed max-w-3xl">
            {destination.tagline}
          </p>
        </div>

        {/* Main Hero Photograph */}
        <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm mb-8">
          {!imgError ? (
            <img
              src={destination.image}
              alt={destination.imageAlt || destination.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-stone-100 text-center">
              <Mountain className="w-12 h-12 text-stone-400 mb-2" />
              <div className="font-serif text-lg font-bold text-stone-700">{destination.name}</div>
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1 rounded">
            {destination.imageAlt}
          </div>
        </div>

        {/* Key Trail Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 sm:p-5 bg-white rounded-xl border border-stone-200 shadow-2xs mb-10 text-xs">
          <div>
            <span className="text-stone-400 block uppercase tracking-wider text-[10px]">Elevation</span>
            <strong className="text-stone-900 font-mono text-sm block mt-0.5">{destination.elevation}</strong>
          </div>
          <div>
            <span className="text-stone-400 block uppercase tracking-wider text-[10px]">Difficulty</span>
            <strong className="text-stone-900 font-medium text-sm block mt-0.5">{destination.difficulty}</strong>
          </div>
          <div>
            <span className="text-stone-400 block uppercase tracking-wider text-[10px]">Trail Distance</span>
            <strong className="text-stone-900 font-mono text-sm block mt-0.5">{destination.trailDistance}</strong>
          </div>
          <div>
            <span className="text-stone-400 block uppercase tracking-wider text-[10px]">Duration</span>
            <strong className="text-stone-900 font-mono text-sm block mt-0.5">{destination.duration}</strong>
          </div>
          <div>
            <span className="text-stone-400 block uppercase tracking-wider text-[10px]">Base Village</span>
            <strong className="text-stone-900 text-xs block mt-0.5 truncate">{destination.baseVillage.split(',')[0]}</strong>
          </div>
          <div>
            <span className="text-stone-400 block uppercase tracking-wider text-[10px]">Best Season</span>
            <strong className="text-stone-900 text-xs block mt-0.5 truncate">July – Feb</strong>
          </div>
        </div>

        {/* Editorial Body Content */}
        <div className="space-y-10">
          {/* Section 1: Overview */}
          <section className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-2xs space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Geographical & Trail Overview
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {destination.overview}
            </p>
          </section>

          {/* Section 2: Historical Significance */}
          <section className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-2xs space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Historical & Cultural Significance
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {destination.historicalSignificance}
            </p>
          </section>

          {/* Section 3: Trail Route Directions */}
          <section className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-emerald-800">
              <Compass className="w-5 h-5" />
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Trail Route & Navigation from {destination.baseVillage.split(',')[0]}
              </h2>
            </div>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {destination.trailRouteDetails}
            </p>
            <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200/80 text-xs text-stone-600 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
              <div>
                <strong>Visiting Period Caveat:</strong> {destination.bestSeason}
              </div>
            </div>
          </section>

          {/* Section 4: Preparation & Safety (2 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs">
              <div className="flex items-center gap-2 text-emerald-900 mb-4">
                <Backpack className="w-5 h-5 text-emerald-700" />
                <h2 className="font-serif text-xl font-bold text-stone-900">
                  Preparation & Equipment
                </h2>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                {destination.preparationAdvice.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs">
              <div className="flex items-center gap-2 text-rose-900 mb-4">
                <ShieldAlert className="w-5 h-5 text-rose-700" />
                <h2 className="font-serif text-xl font-bold text-stone-900">
                  Safety Guidelines & Hazards
                </h2>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                {destination.safetyGuidelines.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold shrink-0">!</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Section 5: FAQs */}
          <section className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-2xs">
            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">
              Frequently Asked Questions about {destination.name}
            </h2>
            <div className="divide-y divide-stone-100">
              {destination.faqs.map((faq, idx) => (
                <div key={idx} className="py-3.5">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 py-1.5 focus:outline-none"
                  >
                    <span className="font-serif text-base font-bold text-stone-900">
                      {faq.question}
                    </span>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4 text-emerald-800 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === idx && (
                    <div className="pt-2 pb-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Related Trails & Articles */}
          <div className="space-y-6 pt-4 border-t border-stone-200">
            {relatedDestinations.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-3">
                  Nearby & Related Sahyadri Trails
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedDestinations.map((rd) => (
                    <button
                      key={rd.id}
                      onClick={() => navigate(`/destination/${rd.slug}`)}
                      className="p-4 bg-white rounded-lg border border-stone-200 text-left hover:border-emerald-800 transition-colors shadow-2xs group"
                    >
                      <div className="text-xs text-stone-500">{rd.district} · {rd.type}</div>
                      <div className="font-serif font-bold text-stone-900 text-sm group-hover:text-emerald-900 mt-1">
                        {rd.name}
                      </div>
                      <div className="text-xs text-emerald-800 font-medium mt-2">
                        View Trail Guide →
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {relatedBlogs.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-3">
                  Recommended Reading
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedBlogs.map((rb) => (
                    <button
                      key={rb.id}
                      onClick={() => navigate(`/blog/${rb.slug}`)}
                      className="p-4 bg-white rounded-lg border border-stone-200 text-left hover:border-emerald-800 transition-colors shadow-2xs group"
                    >
                      <div className="text-xs text-stone-500">{rb.category} · {rb.readTime}</div>
                      <div className="font-serif font-bold text-stone-900 text-sm group-hover:text-emerald-900 mt-1 line-clamp-1">
                        {rb.title}
                      </div>
                      <div className="text-xs text-stone-500 mt-1 line-clamp-1">
                        {rb.excerpt}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Back link */}
          <div className="pt-6 text-center">
            <button
              onClick={() => navigate('/destinations')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-300 rounded-lg transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All 16 Destinations</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
