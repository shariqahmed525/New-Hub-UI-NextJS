import { Navbar } from '@/components/Navbar';
import { ArticleDetail } from '@/components/ArticleDetail';
import { Footer } from '@/components/Footer';
import { articles } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articles.find(a => a.id === params.id);
  
  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ArticleDetail article={article} />
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }));
}