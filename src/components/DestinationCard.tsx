import { useState } from 'react';
import { Destination } from '../types';
import { ArrowUpRight, Mountain, MapPin } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (slug: string) => void;
}

export function DestinationCard({ destination, onSelect }: DestinationCardProps) {
  const [imgError, setImgError] = useState(false);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
      case 'Easy-Moderate':
        return 'text-emerald-700 font-medium';
      case 'Moderate':
      case 'Moderate-Challenging':
        return 'text-amber-800 font-medium';
      case 'Challenging':
      case 'Demanding':
        return 'text-rose-800 font-medium';
      default:
        return 'text-stone-700';
    }
  };

  return (
    <article
      onClick={() => onSelect(destination.slug)}
      className="group cursor-pointer bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* Card Image Container */}
        <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
          {!imgError ? (
            <img
              src={destination.image}
              alt={destination.imageAlt || destination.name}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 p-4 text-center">
              <Mountain className="w-8 h-8 text-stone-400 mb-2" />
              <span className="text-xs font-medium text-stone-600">{destination.name}</span>
            </div>
          )}

          {/* Type tag unboxed overlay or top indicator */}
          <div className="absolute top-3 left-3 bg-[#16382B]/85 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-sm tracking-wide">
            {destination.type}
          </div>

          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded-sm">
            {destination.elevation}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span className="flex items-center gap-1 font-medium text-stone-700">
              <MapPin className="w-3 h-3 text-stone-400" />
              {destination.district}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className={getDifficultyColor(destination.difficulty)}>
              {destination.difficulty}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-stone-500 font-mono text-[11px]">{destination.duration}</span>
          </div>

          {/* Destination Name */}
          <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#16382B] transition-colors leading-snug">
            {destination.name}
          </h3>

          {/* Marathi Name Sub-line */}
          {destination.marathiName && (
            <div className="text-xs text-stone-500 font-serif italic mt-0.5">
              {destination.marathiName}
            </div>
          )}

          {/* Excerpt */}
          <p className="mt-2.5 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {destination.tagline}
          </p>
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
        <span className="text-stone-500">
          Base: <strong className="text-stone-800 font-medium">{destination.baseVillage.split(',')[0]}</strong>
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-[#16382B] group-hover:translate-x-0.5 transition-transform">
          Trail Guide
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
}
