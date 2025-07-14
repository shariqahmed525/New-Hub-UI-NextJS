import { Navbar } from '@/components/Navbar';
import { UserProfile } from '@/components/UserProfile';
import { Footer } from '@/components/Footer';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <UserProfile />
      <Footer />
    </div>
  );
}