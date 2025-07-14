'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Share2, Search } from 'lucide-react';
import { articles, Article } from '@/lib/mock-data';
import Link from 'next/link';
import { toast } from 'sonner';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    const searchTimeout = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const results = articles.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const handleShare = async (article: Article) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: `/article/${article.id}`,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      const url = `${window.location.origin}/article/${article.id}`;
      await navigator.clipboard.writeText(url);
      toast.success('Article link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Search Articles
          </h1>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search articles, authors, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 text-lg h-12"
            />
          </div>
        </div>

        {isSearching && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Searching articles...</p>
          </div>
        )}

        {!isSearching && searchQuery && searchResults.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No articles found
            </h2>
            <p className="text-gray-500 mb-6">
              No articles found for "{searchQuery}". Try different keywords or browse our categories.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/business">
                <Button variant="outline" size="sm">Business</Button>
              </Link>
              <Link href="/technology">
                <Button variant="outline" size="sm">Technology</Button>
              </Link>
              <Link href="/science">
                <Button variant="outline" size="sm">Science</Button>
              </Link>
              <Link href="/world">
                <Button variant="outline" size="sm">World</Button>
              </Link>
            </div>
          </div>
        )}

        {!isSearching && searchResults.length > 0 && (
          <div>
            <div className="mb-6">
              <p className="text-gray-600">
                Found <span className="font-semibold">{searchResults.length}</span> article{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            </div>
            
            <div className="space-y-6">
              {searchResults.map((article) => (
                <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge>{article.category}</Badge>
                        {article.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {article.title}
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.summary}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">By {article.author}</span>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {article.readTime} min read
                          </div>
                          <span className="mx-2">•</span>
                          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShare(article)}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Link href={`/article/${article.id}`}>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Read More
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {!searchQuery && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Search NewsHub
            </h2>
            <p className="text-gray-500 mb-6">
              Enter keywords to search through our collection of articles
            </p>
            <p className="text-sm text-gray-400">
              Search by title, content, author, category, or tags
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}