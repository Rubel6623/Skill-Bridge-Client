import React from 'react';
import { getBlogById } from '@/services/blog';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const BlogDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: blog } = await getBlogById(id);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
          <Link href="/blogs" className="text-orange-500 hover:underline">Return to Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link 
        href="/blogs"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 mb-8 transition-colors"
      >
        <ArrowLeft size={18} /> Back to Blogs
      </Link>

      <div className="mb-10">
        <Badge className="bg-orange-500 mb-4 px-3 py-1">Educational</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight">
          {blog.title}
        </h1>
        
        <div className="flex items-center gap-6 text-gray-400 border-y border-white/10 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-orange-500/30">
              <Image 
                src={blog.author?.avatar || 'https://github.com/shadcn.png'} 
                alt={blog.author?.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-white font-medium">{blog.author?.name}</p>
              <p className="text-xs">Author</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-orange-500" />
            <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
          </div>
        </div>
      </div>

      <div className="relative h-[400px] md:h-[500px] w-full mb-12 rounded-2xl overflow-hidden shadow-2xl">
        <Image 
          src={blog.thumbnail || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop'}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="prose prose-invert prose-orange max-w-none">
        <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
          {blog.content}
        </div>
      </div>
      
      <div className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
        <h3 className="text-2xl font-bold mb-4">About the Author</h3>
        <div className="flex items-start gap-6">
           <div className="relative h-16 w-16 rounded-xl overflow-hidden shrink-0">
              <Image 
                src={blog.author?.avatar || 'https://github.com/shadcn.png'} 
                alt={blog.author?.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
               <p className="text-xl font-bold text-orange-400 mb-2">{blog.author?.name}</p>
               <p className="text-gray-400">
                  An expert contributor sharing insights and knowledge to help you grow in your professional and personal journey through Skill Bridge.
               </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
