import { Navbar } from '@/components/Navbar';
import { RegisterForm } from '@/components/RegisterForm';
import { Footer } from '@/components/Footer';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                sign in to your existing account
              </a>
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}