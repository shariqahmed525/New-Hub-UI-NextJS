import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-200">404</h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sorry, we couldn't find the page you're looking for. The article may have been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Back to Home
              </Button>
            </Link>
            <Link href="/create-article">
              <Button size="lg" variant="outline">
                Write an Article
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}