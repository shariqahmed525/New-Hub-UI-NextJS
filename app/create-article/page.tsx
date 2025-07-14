import { Navbar } from '@/components/Navbar';
import { CreateArticleForm } from '@/components/CreateArticleForm';
import { Footer } from '@/components/Footer';

export default function CreateArticlePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Article</h1>
          <CreateArticleForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}