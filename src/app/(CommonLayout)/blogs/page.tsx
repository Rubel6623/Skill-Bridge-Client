"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getAllBlogs } from "@/services/blog";
import { getAllBlogCategories } from "@/services/blogCategory";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight, Search, SlidersHorizontal, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const BLOGS_PER_PAGE = 8;

const BlogCard = ({ blog }: { blog: any }) => (
  <div className="group flex flex-col overflow-hidden rounded-[2rem] bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 hover:border-orange-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/5 hover:-translate-y-1 h-full shadow-sm dark:shadow-none">
    <div className="relative h-52 w-full overflow-hidden flex-shrink-0">
      <Image
        src={blog.thumbnail || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"}
        alt={blog.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute top-4 left-4">
        <Badge className="bg-orange-500/80 backdrop-blur-md border-none text-[10px] font-black uppercase tracking-widest">
          {blog.category?.name || "General"}
        </Badge>
      </div>
    </div>
    <div className="flex flex-col flex-1 p-6">
      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-white/30 mb-3 font-bold uppercase tracking-widest">
        <span className="flex items-center gap-1.5">
          <Calendar size={12} className="text-orange-500" />
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1.5">
          <User size={12} className="text-purple-500" />
          {blog.author?.name || "SkillBridge"}
        </span>
      </div>
      <h2 className="text-lg font-black text-gray-900 dark:text-white line-clamp-2 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors mb-3 tracking-tight leading-tight flex-1">
        {blog.title}
      </h2>
      <p className="text-gray-600 dark:text-white/40 text-sm line-clamp-2 mb-5 leading-relaxed">
        {blog.content?.slice(0, 120)}...
      </p>
      <Link
        href={`/blogs/${blog.id}`}
        className="inline-flex items-center gap-2 text-orange-500 font-black text-xs uppercase tracking-widest hover:text-orange-400 transition-colors group/link mt-auto"
      >
        Read Article <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
      </Link>
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="rounded-[2rem] bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 overflow-hidden animate-pulse shadow-sm dark:shadow-none">
    <div className="h-52 bg-slate-100 dark:bg-white/5" />
    <div className="p-6 space-y-3">
      <div className="h-3 bg-slate-100 dark:bg-white/5 rounded w-1/2" />
      <div className="h-5 bg-slate-100 dark:bg-white/5 rounded w-full" />
      <div className="h-5 bg-slate-100 dark:bg-white/5 rounded w-3/4" />
      <div className="h-3 bg-slate-100 dark:bg-white/5 rounded w-full" />
      <div className="h-3 bg-slate-100 dark:bg-white/5 rounded w-2/3" />
    </div>
  </div>
);

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [blogsRes, categoriesRes] = await Promise.all([
        getAllBlogs(""),
        getAllBlogCategories(),
      ]);
      setBlogs(blogsRes?.data || []);
      setCategories(categoriesRes?.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Filter + Sort
  const processedBlogs = blogs
    .filter((b) => {
      const matchesSearch =
        !searchTerm ||
        b.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || b.categoryId === selectedCategory || b.category?.id === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(processedBlogs.length / BLOGS_PER_PAGE));
  const paginatedBlogs = processedBlogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="py-20 min-h-screen bg-slate-50 dark:bg-[#0a0a0f] text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[10px] font-black tracking-[0.3em] uppercase mb-6">
            <BookOpen size={12} /> Knowledge Hub
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 text-gray-900 dark:text-white">
            Insightful <span className="bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">Articles</span>
          </h1>
          <p className="text-gray-600 dark:text-white/40 text-lg max-w-2xl mx-auto font-medium italic">
            Expert insights, tutorials, and thought leadership from top educators in the SkillBridge ecosystem.
          </p>
        </div>

        {/* Search + Sort Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-gray-400 dark:text-white/30 group-focus-within:text-orange-500 transition-colors" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles, topics, or authors..."
              className="w-full pl-14 pr-6 py-5 bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all tracking-wide shadow-sm dark:shadow-none"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-5 bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl text-sm font-black text-gray-700 dark:text-white/70 focus:outline-none focus:border-orange-500/50 transition-all cursor-pointer appearance-none tracking-widest uppercase md:w-56 shadow-sm dark:shadow-none"
          >
            <option value="newest" className="bg-white dark:bg-[#0d0d1a]">Newest First</option>
            <option value="oldest" className="bg-white dark:bg-[#0d0d1a]">Oldest First</option>
            <option value="title-asc" className="bg-white dark:bg-[#0d0d1a]">Title: A → Z</option>
            <option value="title-desc" className="bg-white dark:bg-[#0d0d1a]">Title: Z → A</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
              selectedCategory === "all"
                ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/50 hover:border-gray-300 dark:hover:border-white/30 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            All Posts {!loading && `(${blogs.length})`}
          </button>
          {categories.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                selectedCategory === cat.id
                  ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/50 hover:border-gray-300 dark:hover:border-white/30 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results info */}
        {!loading && (
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-500 dark:text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
              {processedBlogs.length} article{processedBlogs.length !== 1 ? "s" : ""} found
            </p>
            {totalPages > 1 && (
              <p className="text-gray-500 dark:text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>
        )}

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : paginatedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedBlogs.map((blog: any) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 gap-8 bg-white dark:bg-white/[0.02] border border-dashed border-gray-200 dark:border-white/10 rounded-[3rem] shadow-sm dark:shadow-none">
            <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-gray-200 dark:border-white/5">
              <BookOpen size={32} className="text-gray-400 dark:text-white/10" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">No Articles Found</h3>
              <p className="text-gray-500 dark:text-white/40 mt-2 italic">Try a different search term or category.</p>
            </div>
            <Button
              onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
              className="bg-orange-500 hover:bg-orange-600 rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-500/20"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-16">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-white/50 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm dark:shadow-none"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 rounded-xl text-sm font-black transition-all ${
                  currentPage === i + 1
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/50 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white shadow-sm dark:shadow-none"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-white/50 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm dark:shadow-none"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
