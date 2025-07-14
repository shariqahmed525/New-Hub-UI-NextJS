'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SearchModal } from '@/components/SearchModal';
import { Menu, X, Search, User, PenTool, LogOut } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  return (
    <>
      <nav className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="text-xl font-bold text-gray-900">NewsHub</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </Link>
              <Link href="/business" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Business
              </Link>
              <Link href="/technology" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Technology
              </Link>
              <Link href="/science" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Science
              </Link>
              <Link href="/world" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                World
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2"
                onClick={handleSearchClick}
              >
                <Search className="h-4 w-4" />
              </Button>
              
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link href="/create-article">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <PenTool className="h-4 w-4 mr-2" />
                      Write
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout} className="flex items-center text-red-600">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2"
                onClick={handleSearchClick}
              >
                <Search className="h-4 w-4" />
              </Button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Home
                </Link>
                <Link href="/business" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Business
                </Link>
                <Link href="/technology" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Technology
                </Link>
                <Link href="/science" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Science
                </Link>
                <Link href="/world" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  World
                </Link>
                {user ? (
                  <>
                    <Link href="/create-article" className="block px-3 py-2 text-blue-600 font-medium">
                      Write Article
                    </Link>
                    <Link href="/profile" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                      Sign In
                    </Link>
                    <Link href="/register" className="block px-3 py-2 text-blue-600 font-medium">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}