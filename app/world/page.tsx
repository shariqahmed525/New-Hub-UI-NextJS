import { Navbar } from '@/components/Navbar';
import { NewsGrid } from '@/components/NewsGrid';
import { Footer } from '@/components/Footer';

export default function WorldPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            World News
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Global news coverage, international affairs, and world events
          </p>
        </div>
        <NewsGrid />
      </div>
      <Footer />
    </div>
  );
}