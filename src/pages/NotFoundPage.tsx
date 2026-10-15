import { Mountain, ArrowLeft, Home, Compass } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface NotFoundPageProps {
  navigate: (to: string) => void;
}

export function NotFoundPage({ navigate }: NotFoundPageProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#FBF9F5]">
      <SEOHead
        title="Page Not Found | Maharashtra Trails"
        description="The requested page could not be located on Maharashtra Trails."
      />
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-stone-200 shadow-sm text-center">
        <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-emerald-800 mb-4">
          <Mountain className="w-7 h-7" />
        </div>
        <div className="text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-1">
          404 Error
        </div>
        <h1 className="font-serif text-2xl font-bold text-stone-900">
          Trail Not Found
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
          The ridge you are looking for has been shrouded in Sahyadri fog or moved to another coordinates.
        </p>

        <div className="mt-6 flex flex-col gap-2.5">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#16382B] text-white text-xs font-semibold rounded-lg hover:bg-[#112d22] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </button>
          <button
            onClick={() => navigate('/destinations')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-100 text-stone-800 text-xs font-semibold rounded-lg hover:bg-stone-200 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Browse All 16 Trails</span>
          </button>
        </div>
      </div>
    </div>
  );
}
