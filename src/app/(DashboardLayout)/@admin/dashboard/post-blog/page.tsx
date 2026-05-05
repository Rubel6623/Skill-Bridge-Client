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
      if (res.success) {
        setCategories(res.data || []);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await createBlog(data);
      if (res.success) {
        toast.success("Manuscript successfully initialized!");
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
    <div className="max-w-5xl mx-auto p-8 bg-transparent text-white animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="mb-16">
         <div className="flex items-center gap-2 text-orange-500 mb-4 font-black uppercase tracking-[0.4em] text-[10px]">
            <Type className="w-4 h-4" /> Intellectual Property Development
          </div>
        <h1 className="text-7xl font-black tracking-tighter leading-none">
          New <span className="text-orange-500">Publication</span>
        </h1>
        <p className="text-white/40 text-xl mt-4 font-medium italic">Broadcast your insights. All modules undergo core validation.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="bg-white/[0.02] border border-white/10 p-12 rounded-[3.5rem] shadow-2xl backdrop-blur-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:scale-110 transition-transform">
             <Send size={300} />
          </div>

          <div className="space-y-8 relative z-10">
            {/* Title */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Module Identifier</label>
              <div className="relative group/input">
                <Type className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-white/20 group-focus-within/input:text-orange-500 transition-colors" />
                <Input 
                  {...register("title", { required: "Title is required" })}
                  placeholder="Enter high-impact title..."
                  className="bg-[#0d0d1a] border-white/10 rounded-2xl h-16 pl-16 pr-8 text-lg font-black tracking-tight focus:ring-2 focus:ring-orange-500/30 transition-all placeholder:text-white/10"
                />
              </div>
              {errors.title && <p className="text-red-500 text-xs mt-1 ml-2 font-black uppercase">{errors.title.message as string}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Category */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Taxonomy Class</label>
                <div className="relative group/input">
                  <Tag className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-white/20 group-focus-within/input:text-orange-500 transition-colors" />
                  <select 
                    {...register("categoryId", { required: "Category is required" })}
                    className="w-full bg-[#0d0d1a] border border-white/10 rounded-2xl h-16 pl-16 pr-10 text-sm font-black uppercase tracking-widest focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 outline-none appearance-none transition-all cursor-pointer text-white/60 focus:text-white"
                  >
                    <option value="" className="bg-[#0d0d1a]">Select Classification</option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id} className="bg-[#0d0d1a] text-white">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.categoryId && <p className="text-red-500 text-xs mt-1 ml-2 font-black uppercase">{errors.categoryId.message as string}</p>}
              </div>

              {/* Thumbnail */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Visual Descriptor URL</label>
                <div className="relative group/input">
                  <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-white/20 group-focus-within/input:text-orange-500 transition-colors" />
                  <Input 
                    {...register("thumbnail", { required: "Thumbnail URL is required" })}
                    placeholder="https://images.unsplash.com/..."
                    className="bg-[#0d0d1a] border-white/10 rounded-2xl h-16 pl-16 pr-8 text-sm font-black focus:ring-2 focus:ring-orange-500/30 transition-all placeholder:text-white/10"
                  />
                </div>
                {errors.thumbnail && <p className="text-red-500 text-xs mt-1 ml-2 font-black uppercase">{errors.thumbnail.message as string}</p>}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Manuscript Content</label>
              <Textarea 
                {...register("content", { required: "Content is required" })}
                placeholder="Synthesize your insights into the core content stream..."
                className="bg-[#0d0d1a] border-white/10 rounded-[2.5rem] min-h-[350px] p-8 text-lg font-medium leading-relaxed focus:ring-2 focus:ring-orange-500/30 transition-all resize-none placeholder:text-white/10 italic"
              />
              {errors.content && <p className="text-red-500 text-xs mt-1 ml-2 font-black uppercase">{errors.content.message as string}</p>}
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 h-20 rounded-[2rem] font-black text-xl tracking-[0.1em] shadow-2xl shadow-orange-500/20 transition-all flex items-center justify-center gap-4 group/btn"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Send size={24} className="group-hover:translate-x-2 transition-transform" />}
          {loading ? "INITIALIZING..." : "IGNITE PUBLICATION"}
        </Button>
      </form>
    </div>
  );
}
