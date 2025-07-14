import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { NewsGrid } from '@/components/NewsGrid';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <NewsGrid />
      <Footer />
    </div>
  );
}