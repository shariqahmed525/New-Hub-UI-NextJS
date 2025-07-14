'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { categories } from '@/lib/mock-data';

export function CreateArticleForm() {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    image: '',
    tags: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user) {
      toast.error('You must be logged in to create an article.');
      router.push('/login');
      return;
    }

    try {
      // Mock article creation - in real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Article created successfully!');
      router.push('/');
    } catch (error) {
      toast.error('Failed to create article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">You must be logged in to create an article.</p>
        <Button onClick={() => router.push('/login')}>
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Article Title *</Label>
        <Input
          id="title"
          name="title"
          type="text"
          required
          value={formData.title}
          onChange={handleChange}
          className="mt-1"
          placeholder="Enter article title"
        />
      </div>

      <div>
        <Label htmlFor="summary">Summary *</Label>
        <Textarea
          id="summary"
          name="summary"
          required
          value={formData.summary}
          onChange={handleChange}
          className="mt-1"
          placeholder="Brief summary of your article"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="category">Category *</Label>
        <Select onValueChange={handleCategoryChange} required>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.filter(cat => cat !== 'All').map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="image">Featured Image URL</Label>
        <Input
          id="image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
          className="mt-1"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          name="tags"
          type="text"
          value={formData.tags}
          onChange={handleChange}
          className="mt-1"
          placeholder="Enter tags separated by commas"
        />
      </div>

      <div>
        <Label htmlFor="content">Article Content *</Label>
        <Textarea
          id="content"
          name="content"
          required
          value={formData.content}
          onChange={handleChange}
          className="mt-1"
          placeholder="Write your article content here..."
          rows={12}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Publishing...' : 'Publish Article'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}