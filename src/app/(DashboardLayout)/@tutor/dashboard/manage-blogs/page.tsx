"use client";

import React, { useEffect, useState } from 'react';
import { getMyBlogs, createBlog, updateBlog, deleteBlog } from '@/services/blog';
import { getAllBlogCategories } from '@/services/blogCategory';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Eye, Loader2, Save } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem, 
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManageBlogsTutor = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    thumbnail: '',
    categoryId: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [blogsRes, catsRes] = await Promise.all([
        getMyBlogs(),
        getAllBlogCategories()
      ]);
      if (blogsRes.success) setBlogs(blogsRes.data);
      if (catsRes.success) setCategories(catsRes.data);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      thumbnail: blog.thumbnail || '',
      categoryId: blog.categoryId || ''
    });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      content: '',
      thumbnail: '',
      categoryId: ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let res;
      if (editingBlog) {
        res = await updateBlog(editingBlog.id, formData);
      } else {
        res = await createBlog(formData);
      }

      if (res.success) {
        toast.success(editingBlog ? "Blog updated" : "Blog created and pending approval");
        setIsModalOpen(false);
        fetchData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await deleteBlog(id);
      if (res.success) {
        toast.success("Blog deleted");
        fetchData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 text-orange-500 mb-2 font-black uppercase tracking-[0.3em] text-[10px]">
             <Plus className="w-4 h-4" /> Intellectual Property
          </div>
          <h1 className="text-5xl font-black text-foreground tracking-tight">My <span className="text-orange-500">Publications</span></h1>
          <p className="text-muted-foreground text-lg mt-2 font-medium italic">Broadcast your insights. New modules require core validation.</p>
        </div>
        <Button onClick={handleCreate} className="btn-modern h-14 px-8">
          <Plus size={20} className="mr-2" strokeWidth={3} /> Initialize Publication
        </Button>
      </div>

      {loading ? (
        <div className="card-modern py-40 flex flex-col items-center justify-center gap-6">
           <div className="relative">
              <Loader2 className="w-16 h-16 animate-spin text-orange-500" />
              <div className="absolute inset-0 blur-3xl bg-orange-500/20 rounded-full" />
           </div>
           <p className="font-black text-muted-foreground animate-pulse uppercase tracking-[0.3em] text-[10px]">Retrieving Manuscripts...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="group card-modern p-6 transition-all duration-500 relative overflow-hidden flex flex-col">
              <div className="relative h-56 rounded-[2rem] overflow-hidden mb-6 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700">
                 <Image 
                    src={blog.thumbnail || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop'} 
                    alt={blog.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent opacity-80" />
                 
                 <div className="absolute top-6 right-6">
                    <span className={`text-[10px] px-4 py-1.5 rounded-xl font-black uppercase tracking-widest border-2 backdrop-blur-md ${
                      blog.status === "APPROVED" 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                        : blog.status === "PENDING"
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    }`}>
                      {blog.status}
                    </span>
                 </div>

                 <div className="absolute bottom-6 left-6">
                    <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border w-fit">
                       <span className="text-[10px] font-black uppercase tracking-widest text-foreground/70">{blog.category?.name || 'Unclassified'}</span>
                    </div>
                 </div>
              </div>

              <div className="px-2 flex-1">
                <h3 className="text-2xl font-black text-foreground tracking-tight leading-tight group-hover:text-orange-400 transition-colors uppercase line-clamp-2 mb-8">
                    {blog.title}
                </h3>
              </div>
              
              <div className="flex gap-3 px-2 pt-4 border-t border-border/50">
                 <Link href={`/blogs/${blog.id}`} target="_blank" className="flex-1">
                    <Button variant="ghost" className="w-full bg-accent/30 dark:bg-white/5 text-blue-400 border border-border rounded-2xl h-12 font-black uppercase text-[10px] tracking-widest hover:bg-blue-500/10 hover:border-blue-500/20 transition-all">
                       <Eye size={16} className="mr-2" /> View
                    </Button>
                 </Link>
                 <Button 
                    onClick={() => handleEdit(blog)}
                    className="flex-1 bg-accent/30 dark:bg-white/5 text-orange-400 border border-border rounded-2xl h-12 font-black uppercase text-[10px] tracking-widest hover:bg-orange-500/10 hover:border-orange-500/20 transition-all"
                 >
                    <Edit size={16} className="mr-2" /> Edit
                 </Button>
                 <Button 
                    onClick={() => handleDelete(blog.id)}
                    className="w-12 bg-accent/10 dark:bg-white/2 text-muted-foreground border border-border/50 rounded-2xl h-12 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-500 transition-all"
                 >
                    <Trash2 size={16} />
                 </Button>
              </div>

              <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -z-10" />
            </div>
          ))}
          {blogs.length === 0 && (
            <div className="col-span-full card-modern py-32 flex flex-col items-center gap-8 text-center border-4 border-dotted border-border/50">
               <div className="bg-accent/30 dark:bg-white/5 p-8 rounded-full border border-border shadow-2xl">
                  <Plus className="w-16 h-16 text-gray-700" />
               </div>
               <div>
                  <h3 className="text-3xl font-black text-foreground uppercase tracking-tighter">Manuscript Zero</h3>
                  <p className="text-muted-foreground mt-2 font-medium max-w-sm mx-auto italic">Your intellectual inventory is currently vacant. Initialize a publication to share expertise.</p>
               </div>
               <Button onClick={handleCreate} className="btn-modern px-12 py-8 text-lg">
                  Initialize First Publication
               </Button>
            </div>
          )}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[700px] rounded-[2.5rem] border border-border shadow-2xl overflow-hidden p-0 bg-[#0d0d1a]">
          <div className="bg-orange-500 h-1.5 w-full shadow-[0_0_20px_rgba(249,115,22,0.3)]" />
          <div className="p-10 space-y-8">
            <DialogHeader>
              <DialogTitle className="text-4xl font-black tracking-tighter uppercase text-foreground">
                {editingBlog ? "Modify Manuscript" : "New Publication"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Module Title</label>
                  <Input 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter identifying title"
                    className="h-14 bg-accent/30 dark:bg-white/5 border-border rounded-2xl focus:ring-0 focus:border-orange-500/50 font-bold text-foreground transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Taxonomy Class</label>
                  <Select 
                    value={formData.categoryId} 
                    onValueChange={(val) => setFormData({...formData, categoryId: val})}
                  >
                    <SelectTrigger className="h-14 bg-accent/30 dark:bg-white/5 border-border rounded-2xl focus:ring-0 focus:border-orange-500/50 font-bold text-foreground transition-all">
                      <SelectValue placeholder="Select classification" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d0d1a] border-border text-foreground rounded-2xl p-2">
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id} className="rounded-xl font-bold">{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Visual Identifier URL</label>
                <Input 
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                  placeholder="https://images.unsplash.com/..."
                  className="h-14 bg-accent/30 dark:bg-white/5 border-border rounded-2xl focus:ring-0 focus:border-orange-500/50 font-bold text-foreground transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Insight Data</label>
                <Textarea 
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Synthesize your insights here..."
                  rows={8}
                  className="bg-accent/30 dark:bg-white/5 border-border rounded-[2rem] focus:ring-0 focus:border-orange-500/50 font-bold text-foreground transition-all resize-none p-6 italic"
                  required
                />
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="h-14 px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground hover:text-foreground">
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} className="btn-modern h-14 px-12">
                  {submitting ? <Loader2 className="animate-spin" /> : (
                    <><Save size={18} className="mr-2" /> {editingBlog ? "Apply Protocol" : "Ignite Publication"}</>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageBlogsTutor;
