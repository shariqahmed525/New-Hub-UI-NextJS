'use client';

import { useAuth } from '@/lib/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PenTool, BookOpen, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';

export function UserProfile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Mock user stats - in real app, this would come from API
  const userStats = {
    articlesPublished: 5,
    articlesRead: 42,
    articlesLiked: 28,
    articlesShared: 15,
  };

  const userArticles = [
    {
      id: '1',
      title: 'Getting Started with React Development',
      category: 'Technology',
      publishedAt: '2024-01-10',
      status: 'Published',
      views: 1250,
    },
    {
      id: '2',
      title: 'The Future of Web Development',
      category: 'Technology',
      publishedAt: '2024-01-08',
      status: 'Published',
      views: 890,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center space-x-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <div className="flex space-x-4">
              <Button size="sm">Edit Profile</Button>
              <Link href="/create-article">
                <Button size="sm" variant="outline">
                  <PenTool className="h-4 w-4 mr-2" />
                  Write Article
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles Published</CardTitle>
            <PenTool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.articlesPublished}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles Read</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.articlesRead}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles Liked</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.articlesLiked}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles Shared</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.articlesShared}</div>
          </CardContent>
        </Card>
      </div>

      {/* My Articles */}
      <Card>
        <CardHeader>
          <CardTitle>My Articles</CardTitle>
        </CardHeader>
        <CardContent>
          {userArticles.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't published any articles yet.</p>
              <Link href="/create-article">
                <Button>
                  <PenTool className="h-4 w-4 mr-2" />
                  Write Your First Article
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {userArticles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <Badge variant="outline">{article.category}</Badge>
                      <span>Published {new Date(article.publishedAt).toLocaleDateString()}</span>
                      <span>{article.views} views</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={article.status === 'Published' ? 'default' : 'secondary'}>
                      {article.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}