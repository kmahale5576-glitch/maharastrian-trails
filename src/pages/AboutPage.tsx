import { SEOHead } from '../components/SEOHead';
import { Mountain, Castle, Shield, HeartHandshake, ChevronRight, Compass } from 'lucide-react';

interface AboutPageProps {
  navigate: (to: string) => void;
}

export function AboutPage({ navigate }: AboutPageProps) {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: typeof window !== 'undefined' ? window.location.origin : ''
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: typeof window !== 'undefined' ? `${window.location.origin}/about` : '/about'
      }
    ]
  };

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#FBF9F5]">
      <SEOHead
        title="About Maharashtra Trails | Sahyadri Mountain & Fort Heritage"
        description="Learn about Maharashtra Trails, dedicated to celebrating the Western Ghats (Sahyadris), 350+ historic Maratha hill fortresses, and responsible nature exploration."
        canonicalPath="/about"
        ogImage="/og-preview.jpg"
        schemaJson={aboutSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6" aria-label="Breadcrumb">
          <button onClick={() => navigate('/')} className="hover:text-stone-900 transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
          <span className="text-stone-900 font-medium">About Maharashtra Trails</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            Our Purpose & Heritage
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
            Documenting the Sahyadri Wilderness & Living Heritage
          </h1>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            Maharashtra Trails is an editorial project built to document, preserve, and inspire respectful exploration across the ancient Western Ghats of Maharashtra, India.
          </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-10">
          {/* Block 1: The Geology of Deccan Traps */}
          <section className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-900">
              <Mountain className="w-6 h-6 text-emerald-700" />
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                An Ancient Volcanic Wonderland
              </h2>
            </div>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              The Sahyadri mountain range in western India represents one of the world's eight "hottest hotspots" of biological diversity, recognized by UNESCO as a World Heritage site. Geologically, these mountains are composed of thick layers of flood basalt formed approximately 66 million years ago during colossal volcanic eruptions that accompanied the Deccan Traps formation.
            </p>
            <p className="text-stone-700 text-sm leading-relaxed">
              Over millions of years, relentless monsoonal weathering has sculpted sheer vertical cliffs, stepped flat-topped mesas (plateaus), dramatic canyons like Sandhan Valley, and towering pinnacles like Kalavantin Durg and Harihar Fort.
            </p>
          </section>

          {/* Block 2: The Maratha Fortress Network */}
          <section className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-900">
              <Castle className="w-6 h-6 text-emerald-700" />
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                The Living Fortresses of Chhatrapati Shivaji Maharaj
              </h2>
            </div>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Nowhere else on earth is political and military history so thoroughly etched into mountainous terrain. During the 17th century, Chhatrapati Shivaji Maharaj recognized that these natural basalt ramparts were superior to any brick fortifications built on plains.
            </p>
            <p className="text-stone-700 text-sm leading-relaxed">
              By constructing curved Gomukhi gateways that neutralized enemy war elephants, excavating deep Dev Taki rainwater cisterns directly into natural aquifers, and establishing razor-thin bastion ridges (Machis), Shivaji Maharaj turned the Sahyadris into an unbreachable bastion of self-rule (Swarajya).
            </p>
          </section>

          {/* Block 3: Ethical Manifesto */}
          <section className="bg-[#16382B] text-white p-6 sm:p-8 rounded-xl border border-emerald-950/40 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-300">
              <Shield className="w-6 h-6" />
              <h2 className="font-serif text-2xl font-bold text-white">
                Our Mountain Ethos: Leave No Trace
              </h2>
            </div>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              With growing trail traffic, our sacred mountains face unprecedented pressures. Maharashtra Trails is committed to promoting zero-waste trekking ethics:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white/10 p-4 rounded-lg">
                <strong className="block text-white text-sm mb-1">Preserve Potable Water Tanks</strong>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Never wash dirty utensils, swim, or deposit waste in ancient stone water cisterns.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <strong className="block text-white text-sm mb-1">Zero Plastic Footprint</strong>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Every wrapper, snack packet, and bottle must be carried back to municipal recycling bins.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <strong className="block text-white text-sm mb-1">Respect Rural Communities</strong>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Support base village families by eating local meals and respecting village customs.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <strong className="block text-white text-sm mb-1">Sound Judgment Over Heroism</strong>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Never risk your life crossing flooded monsoon streams or climbing wet vertical cliffs.
                </p>
              </div>
            </div>
          </section>

          {/* Action CTAs */}
          <div className="p-6 bg-stone-100 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HeartHandshake className="w-6 h-6 text-emerald-800" />
              <div className="text-xs text-stone-600">
                Explore the trails with knowledge, humility, and passion.
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/destinations')}
                className="px-4 py-2 bg-[#16382B] text-white text-xs font-semibold rounded-lg hover:bg-[#112d22] transition-colors"
              >
                Explore 16 Trails
              </button>
              <button
                onClick={() => navigate('/blogs')}
                className="px-4 py-2 bg-white text-stone-800 border border-stone-300 text-xs font-semibold rounded-lg hover:bg-stone-50 transition-colors"
              >
                Read 10 Guides
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
