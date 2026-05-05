"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createBlog } from '@/services/blog';
import { getAllBlogCategories } from '@/services/blogCategory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Send, Image as ImageIcon, Type, Tag } from 'lucide-react';

export default function PostBlogPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllBlogCategories();
      console.log("PostBlogPage - Full Response Object:", JSON.stringify(res, null, 2));
      if (res.success) {
        console.log("PostBlogPage - Categories Data:", res.data);
        setCategories(res.data || []);
      } else {
        console.warn("PostBlogPage - Fetch unsuccessful:", res.message);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await createBlog(data);
      if (res.success) {
        toast.success("Blog posted successfully!");
        router.push('/dashboard/manage-blogs');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-foreground mb-2 flex items-center gap-3">
          Create <span className="text-orange-500">New Blog</span>
        </h1>
        <p className="text-muted-foreground text-lg">Share insights and knowledge with the SkillBridge community.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-card/50 backdrop-blur-xl border border-border/50 p-8 rounded-[2.5rem] shadow-2xl">
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">
              <Type size={16} className="text-orange-500" /> Blog Title
            </label>
            <Input 
              {...register("title", { required: "Title is required" })}
              placeholder="e.g. 10 Tips for Effective Online Learning"
              className="bg-muted/30 border-border/40 rounded-2xl h-14 px-6 text-lg focus:ring-orange-500/20"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1 ml-2">{errors.title.message as string}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">
                <Tag size={16} className="text-orange-500" /> Category
              </label>
              <div className="relative group">
                <select 
                  {...register("categoryId", { required: "Category is required" })}
                  className="w-full bg-muted/30 border border-border/40 rounded-2xl h-14 px-6 text-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 outline-none appearance-none transition-all cursor-pointer hover:bg-muted/50 text-foreground"
                >
                  <option value="" className="bg-[#0d0d1a] text-muted-foreground">Select a category</option>
                  {categories && categories.length > 0 ? (
                    categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id} className="bg-[#0d0d1a] text-white">
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <option disabled className="bg-[#0d0d1a] text-muted-foreground italic">
                      No categories found
                    </option>
                  )}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground group-hover:text-orange-500 transition-colors">
                  <Tag size={18} />
                </div>
              </div>
              {errors.categoryId && <p className="text-red-500 text-xs mt-1 ml-2">{errors.categoryId.message as string}</p>}
            </div>

            {/* Thumbnail */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">
                <ImageIcon size={16} className="text-orange-500" /> Thumbnail URL
              </label>
              <Input 
                {...register("thumbnail", { required: "Thumbnail URL is required" })}
                placeholder="https://images.unsplash.com/..."
                className="bg-muted/30 border-border/40 rounded-2xl h-14 px-6 focus:ring-orange-500/20"
              />
              {errors.thumbnail && <p className="text-red-500 text-xs mt-1 ml-2">{errors.thumbnail.message as string}</p>}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">
               Content
            </label>
            <Textarea 
              {...register("content", { required: "Content is required" })}
              placeholder="Write your blog content here..."
              className="bg-muted/30 border-border/40 rounded-3xl min-h-[300px] p-6 text-lg focus:ring-orange-500/20 resize-none"
            />
            {errors.content && <p className="text-red-500 text-xs mt-1 ml-2">{errors.content.message as string}</p>}
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 h-14 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
          {loading ? "Publishing..." : "Publish Blog Post"}
        </Button>
      </form>
    </div>
  );
}
