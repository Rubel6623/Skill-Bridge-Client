"use client";

import React, { useEffect, useState } from 'react';
import { getAdminBlogs, approveBlog, deleteBlog } from '@/services/blog';
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
import { Check, Trash2, Eye, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ManageBlogsAdmin = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAdminBlogs();
      if (res.success) {
        setBlogs(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const res = await approveBlog(id);
      if (res.success) {
        toast.success("Blog approved successfully");
        fetchBlogs();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await deleteBlog(id);
      if (res.success) {
        toast.success("Blog deleted successfully");
        fetchBlogs();
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
             <Check className="w-4 h-4" /> Editorial Queue
          </div>
          <h1 className="text-5xl font-black text-foreground tracking-tight">Manage <span className="text-orange-500">Blogs</span></h1>
          <p className="text-muted-foreground text-lg mt-2 font-medium italic">Moderate and curate the platform's knowledge base.</p>
        </div>
        <Link href="/dashboard/post-blog">
          <Button className="rounded-2xl bg-orange-500 hover:bg-orange-600 font-black px-8 py-6 shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all">
            Create New Blog
          </Button>
        </Link>
      </div>

      <div className="card-modern overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
             <div className="relative">
                <Loader2 className="w-16 h-16 animate-spin text-orange-500" />
                <div className="absolute inset-0 blur-3xl bg-orange-500/20 rounded-full" />
             </div>
             <p className="font-black text-muted-foreground animate-pulse uppercase tracking-[0.3em] text-[10px]">Accessing Registry...</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-accent/30 dark:bg-white/5">
              <TableRow className="border-border/50">
                <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-widest px-8">Thumbnail</TableHead>
                <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-widest">Title & Category</TableHead>
                <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-widest">Author</TableHead>
                <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-widest">Status</TableHead>
                <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-widest">Timestamp</TableHead>
                <TableHead className="text-right text-muted-foreground uppercase text-[10px] font-black tracking-widest px-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id} className="border-border/50 hover:bg-accent/30 dark:bg-white/5 transition-colors group">
                  <TableCell className="px-8 py-6">
                    <div className="relative h-14 w-24 rounded-2xl overflow-hidden border border-border shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <Image 
                        src={blog.thumbnail || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop'} 
                        alt={blog.title} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="font-black text-foreground truncate text-lg group-hover:text-orange-400 transition-colors">{blog.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Taxonomy:</span>
                       <span className="text-xs font-bold text-muted-foreground">{blog.category?.name || 'Uncategorized'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center font-black text-orange-500 text-xs">
                          {blog.author?.name?.[0]}
                       </div>
                       <span className="text-sm font-bold text-gray-300">{blog.author?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={`rounded-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border-2 ${
                        blog.status === "APPROVED" 
                          ? "bg-green-500/10 text-green-500 border-green-500/20" 
                          : blog.status === "PENDING"
                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          : "bg-red-500/10 text-red-500 border-red-500/20"
                      }`}
                    >
                      {blog.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-medium">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <div className="flex justify-end gap-3">
                      <Link href={`/blogs/${blog.id}`} target="_blank">
                        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-blue-500/10 text-blue-400">
                          <Eye size={18} />
                        </Button>
                      </Link>
                      {blog.status === "PENDING" && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-10 h-10 rounded-xl hover:bg-green-500/10 text-green-400"
                          onClick={() => handleApprove(blog.id)}
                        >
                          <Check size={18} />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-10 h-10 rounded-xl hover:bg-red-500/10 text-red-400"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {blogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-32">
                     <Eye className="w-16 h-16 text-foreground/5 mx-auto mb-4" />
                     <p className="text-xl font-black text-muted-foreground/80 uppercase tracking-tighter">Inventory Empty</p>
                     <p className="text-sm text-muted-foreground mt-2 font-medium italic">No blog submissions are currently awaiting moderation.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ManageBlogsAdmin;
