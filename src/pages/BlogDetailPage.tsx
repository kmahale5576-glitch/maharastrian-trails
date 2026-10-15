import { useState, useMemo } from 'react';
import { BLOGS } from '../data/blogs';
import { DESTINATIONS } from '../data/destinations';
import { SEOHead } from '../components/SEOHead';
import {
  ChevronRight,
  Clock,
  Calendar,
  User,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Share2,
  Check,
  Compass,
  BookOpen
} from 'lucide-react';

interface BlogDetailPageProps {
  slug: string;
  navigate: (to: string) => void;
}

export function BlogDetailPage({ slug, navigate }: BlogDetailPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const article = useMemo(() => {
    return BLOGS.find((b) => b.slug === slug);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen py-20 px-4 max-w-xl mx-auto text-center">
        <h1 className="font-serif text-2xl font-bold text-stone-900">Article Not Found</h1>
        <p className="mt-2 text-sm text-stone-600">The guide you requested could not be located in our publication index.</p>
        <button
          onClick={() => navigate('/blogs')}
          className="mt-6 px-4 py-2 bg-[#16382B] text-white text-xs font-semibold rounded-lg"
        >
          Back to All Guides
        </button>
      </div>
    );
  }

  // Related articles
  const relatedArticles = useMemo(() => {
    return BLOGS.filter((b) => article.relatedBlogSlugs.includes(b.slug)).slice(0, 2);
  }, [article]);

  // Related destinations
  const relatedDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => article.relatedDestinationSlugs.includes(d.slug)).slice(0, 3);
  }, [article]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.metaDescription,
    image: article.image,
    datePublished: article.publishDate,
    author: {
      '@type': 'Organization',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Maharashtra Trails'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://maharashtratrails.com/blog/${article.slug}`
    }
  };

  return (
    <article className="min-h-screen py-8 sm:py-12 bg-[#FBF9F5]">
      <SEOHead
        title={`${article.seoTitle} | Maharashtra Trails`}
        description={article.metaDescription}
        canonicalUrl={`https://maharashtratrails.com/blog/${article.slug}`}
        schemaJson={schemaJson}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-between text-xs text-stone-500 mb-6" aria-label="Breadcrumb">
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            <button onClick={() => navigate('/')} className="hover:text-stone-900 transition-colors">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
            <button onClick={() => navigate('/blogs')} className="hover:text-stone-900 transition-colors">
              Trekking Guides
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
            <span className="text-stone-900 font-medium truncate">{article.title}</span>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-md transition-colors shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>
        </nav>

        {/* Header Block */}
        <header className="mb-8 max-w-3xl">
          {/* Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
            <span className="font-semibold text-emerald-800 uppercase tracking-wider">
              {article.category}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {article.readTime}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              {article.publishDate}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
            {article.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-xs text-stone-500">
            <User className="w-3.5 h-3.5 text-stone-400" />
            <span>By <strong className="text-stone-800 font-medium">{article.author}</strong></span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm mb-10">
          {!imgError ? (
            <img
              src={article.image}
              alt={article.imageAlt || article.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-stone-100 text-center">
              <BookOpen className="w-12 h-12 text-stone-400 mb-2" />
              <div className="font-serif text-lg font-bold text-stone-700">{article.title}</div>
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1 rounded">
            {article.imageAlt}
          </div>
        </div>

        {/* Editorial Essay Body */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-stone-200/90 shadow-2xs space-y-8 max-w-none">
          {/* Intro with Drop-Cap */}
          <div className="text-stone-700 text-base sm:text-lg leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900 border-b border-stone-100 pb-6">
            {article.content.intro}
          </div>

          {/* Sections */}
          {article.content.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-stone-900 pt-2">
                {section.heading}
              </h2>

              {section.body.map((p, pIdx) => (
                <p key={pIdx} className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  {p}
                </p>
              ))}

              {section.listItems && (
                <ul className="space-y-2 pl-4 text-sm text-stone-600 list-disc">
                  {section.listItems.map((li, lIdx) => (
                    <li key={lIdx} className="leading-relaxed">
                      {li}
                    </li>
                  ))}
                </ul>
              )}

              {section.tipBox && (
                <div className="p-4 rounded-lg bg-emerald-50/70 border border-emerald-200/70 text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                  {section.tipBox}
                </div>
              )}
            </section>
          ))}

          {/* Conclusion */}
          <div className="pt-6 border-t border-stone-100 space-y-3">
            <h3 className="font-serif text-xl font-bold text-stone-900">Final Thoughts</h3>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic">
              {article.content.conclusion}
            </p>
          </div>
        </div>

        {/* FAQs */}
        <section className="mt-10 bg-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-2xs">
          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-stone-100">
            {article.faqs.map((faq, idx) => (
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

        {/* Related Destinations & Articles */}
        <div className="mt-10 space-y-8 pt-6 border-t border-stone-200">
          {relatedDestinations.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
                <Compass className="w-4 h-4" />
                <span>Featured Trails Mentioned in this Guide</span>
              </div>
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
                      Explore Route Details →
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {relatedArticles.length > 0 && (
            <div>
              <div className="text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
                Related Articles & Field Knowledge
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((ra) => (
                  <button
                    key={ra.id}
                    onClick={() => navigate(`/blog/${ra.slug}`)}
                    className="p-4 bg-white rounded-lg border border-stone-200 text-left hover:border-emerald-800 transition-colors shadow-2xs group"
                  >
                    <div className="text-xs text-stone-500">{ra.category} · {ra.readTime}</div>
                    <div className="font-serif font-bold text-stone-900 text-sm group-hover:text-emerald-900 mt-1 line-clamp-1">
                      {ra.title}
                    </div>
                    <div className="text-xs text-stone-500 mt-1 line-clamp-1">
                      {ra.excerpt}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-300 rounded-lg transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All 10 Guides</span>
          </button>
        </div>
      </div>
    </article>
  );
}
