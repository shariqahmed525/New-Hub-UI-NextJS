import Link from 'next/link';
import { articles } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

export function Hero() {
  const featuredArticle = articles[0];

  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-yellow-500 text-black mb-4">
              Breaking News
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Stay Informed with Real-Time News Coverage
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Get the latest breaking news, in-depth analysis, and expert commentary from around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                Join NewsHub
              </Link>
              <Link 
                href="#latest-news"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
              >
                Read Latest News
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <img 
              src={featuredArticle.image} 
              alt={featuredArticle.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <Badge variant="secondary" className="mb-3">
                {featuredArticle.category}
              </Badge>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {featuredArticle.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {featuredArticle.summary}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>By {featuredArticle.author}</span>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {featuredArticle.readTime} min read
                </div>
              </div>
              <Link 
                href={`/article/${featuredArticle.id}`}
                className="inline-block mt-4 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}