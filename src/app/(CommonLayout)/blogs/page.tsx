import React from 'react';
import { getAllBlogs } from '@/services/blog';
import { getAllBlogCategories } from '@/services/blogCategory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Filter } from 'lucide-react';

interface Props {
  searchParams: Promise<{
    category?: string;
  }>;
}

const BlogPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const categoryId = params.category;
  
  const [blogsRes, categoriesRes] = await Promise.all([
    getAllBlogs(categoryId ? `categoryId=${categoryId}` : ''),
    getAllBlogCategories()
  ]);

  const blogs = blogsRes?.data || [];
  const categories = categoriesRes?.data || [];

  console.log("BlogPage - blogs count:", blogs.length);
  console.log("BlogPage - categories count:", categories.length);

  return (
    <div className="py-20 min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="py-4 text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">
            Insightful Blogs
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends in education, skill development, and expert advice from our tutors and community.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
           <Link href="/blogs">
            <Badge 
                variant={!categoryId ? "default" : "outline"}
                className={`px-4 py-2 text-sm cursor-pointer transition-all ${!categoryId ? "bg-orange-500 hover:bg-orange-600" : "hover:border-orange-500"}`}
            >
                All Posts
            </Badge>
          </Link>
          {categories?.map((cat: any) => (
            <Link key={cat.id} href={`/blogs?category=${cat.id}`}>
                <Badge 
                    variant={categoryId === cat.id ? "default" : "outline"}
                    className={`px-4 py-2 text-sm cursor-pointer transition-all ${categoryId === cat.id ? "bg-orange-500 hover:bg-orange-600" : "hover:border-orange-500"}`}
                >
                    {cat.name}
                </Badge>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog: any) => (
            <Card key={blog.id} className="group overflow-hidden bg-accent/30 dark:bg-white/5 border-border hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={blog.thumbnail || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop'}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-500/80 backdrop-blur-md border-none">{blog.category?.name || 'Uncategorized'}</Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-orange-500" />
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={14} className="text-purple-500" />
                    {blog.author?.name}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-orange-400 transition-colors text-foreground">
                  {blog.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-6">
                  {blog.content.slice(0, 150)}...
                </p>
                <Link 
                  href={`/blogs/${blog.id}`}
                  className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-400 transition-colors"
                >
                  Read More <ArrowRight size={16} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!blogs || blogs.length === 0) && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-xl">No blog posts found in this category. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
