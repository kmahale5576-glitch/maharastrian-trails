/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRouter } from './hooks/useRouter';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const { currentPath, navigate } = useRouter();

  // Route matching logic
  const renderCurrentPage = () => {
    // Normalise path (remove trailing slashes, except root)
    const cleanPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');

    if (cleanPath === '/' || cleanPath === '') {
      return <HomePage navigate={navigate} />;
    }

    if (cleanPath === '/destinations' || cleanPath === '/trails') {
      return <DestinationsPage navigate={navigate} />;
    }

    if (cleanPath.startsWith('/destination/') || cleanPath.startsWith('/trail/')) {
      const slug = cleanPath.replace(/^\/(destination|trail)\//, '');
      return <DestinationDetailPage slug={slug} navigate={navigate} />;
    }

    if (cleanPath === '/blogs' || cleanPath === '/guides') {
      return <BlogsPage navigate={navigate} />;
    }

    if (cleanPath.startsWith('/blog/') || cleanPath.startsWith('/guide/')) {
      const slug = cleanPath.replace(/^\/(blog|guide)\//, '');
      return <BlogDetailPage slug={slug} navigate={navigate} />;
    }

    if (cleanPath === '/about') {
      return <AboutPage navigate={navigate} />;
    }

    return <NotFoundPage navigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#16382B] selection:text-white">
      <Navbar currentPath={currentPath} navigate={navigate} />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
