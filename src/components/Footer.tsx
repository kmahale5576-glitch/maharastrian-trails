import { DESTINATIONS } from '../data/destinations';
import { BLOGS } from '../data/blogs';
import { ShieldCheck, Compass, HeartHandshake } from 'lucide-react';

interface FooterProps {
  navigate: (to: string) => void;
}

export function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-[#142B21] text-[#E8E6E1] border-t border-emerald-950/40">
      {/* Editorial Preservation Banner */}
      <div className="border-b border-emerald-900/50 bg-[#0E2018]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-emerald-900/40 text-emerald-300 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-base">Sahyadri Heritage & Topography</div>
              <p className="text-stone-300 text-xs mt-1 leading-relaxed">
                Documenting 16 premier trekking destinations and 350+ historic Maratha fortresses across the UNESCO-recognized Western Ghats.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-emerald-900/40 text-emerald-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-base">Verified Practical Guidance</div>
              <p className="text-stone-300 text-xs mt-1 leading-relaxed">
                Objective route notes, elevation profiles, base village logistics, and safety warnings for responsible mountain exploration.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-emerald-900/40 text-emerald-300 shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-base">Leave No Trace & Conservation</div>
              <p className="text-stone-300 text-xs mt-1 leading-relaxed">
                Advocating strict zero-waste practices, historical bastion preservation, and supporting indigenous village communities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-md bg-emerald-800 text-white flex items-center justify-center">
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <polygon points="12 3 2 20 22 20" />
                  <polygon points="12 3 17 20 7 20" />
                </svg>
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Maharashtra Trails
              </span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
              An authoritative, editorial travel resource dedicated to documenting Maharashtra\'s mountain summits, historic hill fortresses, lush valleys, and seasonal waterfalls across the Sahyadri Western Ghats.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <div>Geographical Focus: Western Ghats (Sahyadris), Maharashtra, India</div>
              <div>Districts: Ahmednagar · Pune · Raigad · Nashik · Satara · Thane</div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4">
              Explore
            </div>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-white transition-colors text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/destinations')} className="hover:text-white transition-colors text-left">
                  All 16 Destinations
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/blogs')} className="hover:text-white transition-colors text-left">
                  10 Trekking Guides
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors text-left">
                  About Sahyadri Heritage
                </button>
              </li>
            </ul>
          </div>

          {/* Destinations Directory Links (Col 1) */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4">
              Featured Trails
            </div>
            <ul className="space-y-2 text-xs text-stone-300">
              {DESTINATIONS.slice(0, 8).map((d) => (
                <li key={d.id}>
                  <button
                    onClick={() => navigate(`/destination/${d.slug}`)}
                    className="hover:text-white transition-colors text-left truncate max-w-[180px] block"
                  >
                    {d.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations Directory Links (Col 2) */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4">
              More Expeditions
            </div>
            <ul className="space-y-2 text-xs text-stone-300">
              {DESTINATIONS.slice(8, 16).map((d) => (
                <li key={d.id}>
                  <button
                    onClick={() => navigate(`/destination/${d.slug}`)}
                    className="hover:text-white transition-colors text-left truncate max-w-[180px] block"
                  >
                    {d.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* All 10 Blog Guides Quick Strip */}
        <div className="mt-12 pt-8 border-t border-emerald-900/60">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
            Trekking Guides & Practical Articles
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-stone-300">
            {BLOGS.map((b) => (
              <button
                key={b.id}
                onClick={() => navigate(`/blog/${b.slug}`)}
                className="hover:text-white hover:underline transition-colors text-left"
              >
                {b.title}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-10 pt-6 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© 2026 Maharashtra Trails. Built with deep reverence for the Sahyadri mountains and Maratha heritage.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Always check local weather and forest advisories before trekking.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
