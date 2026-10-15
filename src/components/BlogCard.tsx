import { useState } from 'react';
import { BlogArticle } from '../types';
import { ArrowRight, BookOpen } from 'lucide-react';

interface BlogCardProps {
  article: BlogArticle;
  onSelect: (slug: string) => void;
  featured?: boolean;
}

export function BlogCard({ article, onSelect, featured = false }: BlogCardProps) {
  const [imgError, setImgError] = useState(false);

  if (featured) {
    return (
      <article
        onClick={() => onSelect(article.slug)}
        className="group cursor-pointer bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 grid grid-cols-1 lg:grid-cols-12 items-stretch"
      >
        <div className="relative aspect-16/9 lg:aspect-auto lg:h-full lg:col-span-7 bg-stone-100 overflow-hidden min-h-[260px]">
          {!imgError ? (
            <img
              src={article.image}
              alt={article.imageAlt || article.title}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 p-6 text-center">
              <BookOpen className="w-10 h-10 text-stone-400 mb-2" />
              <span className="text-sm font-medium text-stone-600">{article.title}</span>
            </div>
          )}
          <div className="absolute top-3 left-3 bg-[#16382B] text-white text-[11px] font-medium px-2.5 py-1 rounded-sm uppercase tracking-wider">
            Featured Guide
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Unboxed Metadata Line */}
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
              <span className="font-semibold text-emerald-800 uppercase tracking-wider">
                {article.category}
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{article.readTime}</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{article.publishDate}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 group-hover:text-[#16382B] transition-colors leading-tight">
              {article.title}
            </h3>

            <p className="mt-3 text-stone-600 text-sm leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-500">By {article.author}</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#16382B] group-hover:translate-x-1 transition-transform">
              Read Complete Guide
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onSelect(article.slug)}
      className="group cursor-pointer bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="relative aspect-16/10 w-full bg-stone-100 overflow-hidden">
          {!imgError ? (
            <img
              src={article.image}
              alt={article.imageAlt || article.title}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 p-4 text-center">
              <BookOpen className="w-8 h-8 text-stone-400 mb-2" />
              <span className="text-xs font-medium text-stone-600">{article.title}</span>
            </div>
          )}

          <div className="absolute top-3 left-3 bg-[#16382B]/85 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-sm">
            {article.category}
          </div>
        </div>

        <div className="p-5">
          {/* Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span>{article.readTime}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{article.publishDate}</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#16382B] transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>

          <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
        <span className="text-stone-400">{article.author}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-[#16382B] group-hover:translate-x-1 transition-transform">
          Read Guide
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
}
