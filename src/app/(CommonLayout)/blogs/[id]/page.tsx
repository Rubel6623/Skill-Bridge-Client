import React from 'react';
import { getBlogById, getAllBlogs } from '@/services/blog';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Calendar, User, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const BlogDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [{ data: blog }, allBlogsRes] = await Promise.all([
    getBlogById(id),
    getAllBlogs(""),
  ]);

  const relatedBlogs = (allBlogsRes?.data || [])
    .filter((b: any) => b.id !== id && b.categoryId === blog?.categoryId)
    .slice(0, 3);

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
    <div className="py-20 min-h-screen bg-transparent text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-white/40 hover:text-orange-500 mb-12 transition-colors font-black text-[10px] uppercase tracking-[0.3em] group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Knowledge Hub
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="bg-orange-500/10 text-orange-500 border border-orange-500/30 text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
              {blog.category?.name || "General"}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter mb-8">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-6 text-white/30 border-y border-white/5 py-6">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-xl overflow-hidden border border-orange-500/30">
                <Image 
                  src={blog.author?.avatar || 'https://github.com/shadcn.png'} 
                  alt={blog.author?.name || "Author"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-white font-black text-sm">{blog.author?.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30">Author</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
              <Calendar size={14} className="text-orange-500" />
              <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="relative h-[400px] md:h-[500px] w-full mb-12 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
          <Image 
            src={blog.thumbnail || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop'}
            alt={blog.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-10 mb-12 backdrop-blur-xl">
          <div className="text-white/70 text-lg leading-relaxed whitespace-pre-wrap font-medium">
            {blog.content}
          </div>
        </div>
      
        {/* Author Card */}
        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 mb-20">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-6">About the Author</h3>
          <div className="flex items-start gap-6">
            <div className="relative h-16 w-16 rounded-2xl overflow-hidden shrink-0 border border-orange-500/30">
              <Image 
                src={blog.author?.avatar || 'https://github.com/shadcn.png'} 
                alt={blog.author?.name || "Author"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xl font-black text-orange-400 mb-2 tracking-tight">{blog.author?.name}</p>
              <p className="text-white/40 leading-relaxed italic">
                An expert contributor sharing insights and knowledge to help you grow in your professional and personal journey through Skill Bridge.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="text-orange-500" size={20} />
              <h2 className="text-2xl font-black tracking-tighter uppercase">Related Articles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((related: any) => (
                <Link key={related.id} href={`/blogs/${related.id}`} className="group block">
                  <div className="rounded-2xl bg-white/[0.02] border border-white/10 hover:border-orange-500/30 transition-all overflow-hidden hover:-translate-y-1 duration-300">
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={related.thumbnail || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop'}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-sm font-black text-white group-hover:text-orange-400 transition-colors line-clamp-2 tracking-tight mb-2">
                        {related.title}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                        Read More <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetailsPage;
