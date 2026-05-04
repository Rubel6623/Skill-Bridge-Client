"use client"

import { useState, useEffect } from "react"
import { getAllBlogCategories, createBlogCategory, updateBlogCategory, deleteBlogCategory } from "@/services/blogCategory"
import { Tag, Search, Plus, Edit2, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

export default function AdminManageBlogCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    name: ""
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const result = await getAllBlogCategories()
      if (result?.success) {
        setCategories(result.data || [])
      }
    } catch (error) {
      toast.error("Failed to fetch blog categories")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let res;
      if (editingCategory) {
        res = await updateBlogCategory(editingCategory.id, formData)
      } else {
        res = await createBlogCategory(formData)
      }

      if (res.success) {
        toast.success(editingCategory ? "Blog category updated" : "Blog category created")
        setIsDialogOpen(false)
        setEditingCategory(null)
        setFormData({ name: "" })
        fetchCategories()
      } else {
        toast.error(res.message || "Operation failed")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure? This will affect blogs using this category.")) return

    try {
      const res = await deleteBlogCategory(id)
      if (res.success) {
        toast.success("Blog category deleted")
        fetchCategories()
      } else {
        toast.error(res.message || "Delete failed")
      }
    } catch (error) {
      toast.error("Critical system error")
    }
  }

  const openEditDialog = (category: any) => {
    setEditingCategory(category)
    setFormData({
      name: category.name
    })
    setIsDialogOpen(true)
  }

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 text-orange-500 mb-2 font-black uppercase tracking-[0.3em] text-[10px]">
             <Tag className="w-4 h-4" /> Editorial Taxonomy
          </div>
          <h1 className="text-5xl font-black text-foreground tracking-tight">Blog <span className="text-orange-500">Categories</span></h1>
          <p className="text-muted-foreground text-lg mt-2 font-medium italic">Organize the platform's intellectual capital into meaningful clusters.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-orange-500 transition-colors" />
            <input
              type="text"
              placeholder="Search taxonomy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-14 pr-6 py-4 bg-accent/30 dark:bg-white/5 border border-border rounded-2xl focus:ring-0 focus:border-orange-500/50 outline-none w-72 shadow-2xl font-bold text-sm text-foreground placeholder:text-muted-foreground/80 transition-all"
            />
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if(!open) {
                setEditingCategory(null);
                setFormData({ name: "" });
            }
          }}>
            <DialogTrigger asChild>
              <Button className="btn-modern h-14 px-8">
                <Plus size={20} strokeWidth={3} className="mr-2" /> Create Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] border border-border shadow-2xl overflow-hidden p-0 bg-[#0d0d1a]">
               <div className="bg-orange-500 h-1.5 w-full shadow-[0_0_20px_rgba(249,115,22,0.3)]" />
               <div className="p-10 space-y-8">
                 <DialogHeader>
                    <DialogTitle className="text-3xl font-black tracking-tighter uppercase text-foreground">
                        {editingCategory ? "Update Category" : "Initialize Category"}
                    </DialogTitle>
                 </DialogHeader>
                 
                 <form onSubmit={handleCreateOrUpdate} className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Classification Name</label>
                       <input 
                         required
                         type="text" 
                         className="w-full bg-accent/30 dark:bg-white/5 border border-border rounded-2xl px-6 py-4 outline-none focus:border-orange-500/50 font-bold text-foreground transition-all"
                         placeholder="e.g. Theoretical Framework"
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                       />
                    </div>
                    
                    <div className="pt-6">
                       <Button 
                         type="submit" 
                         disabled={isSubmitting}
                         className="btn-modern w-full h-16 text-sm"
                       >
                         {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : (editingCategory ? "Apply Updates" : "Ignite Category")}
                       </Button>
                    </div>
                 </form>
               </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="card-modern overflow-hidden">
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-6">
             <div className="relative">
                <Loader2 className="w-16 h-16 animate-spin text-orange-500" />
                <div className="absolute inset-0 blur-3xl bg-orange-500/20 rounded-full" />
             </div>
             <p className="font-black text-muted-foreground animate-pulse uppercase tracking-[0.3em] text-[10px]">Accessing Database...</p>
          </div>
        ) : filteredCategories.length > 0 ? (
          <Table>
            <TableHeader className="bg-accent/10 dark:bg-white/2">
              <TableRow className="border-border/50">
                <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-[0.4em] px-10 py-6">Classification Domain</TableHead>
                <TableHead className="text-muted-foreground uppercase text-[10px] font-black tracking-[0.4em]">Manuscript Volume</TableHead>
                <TableHead className="text-right text-muted-foreground uppercase text-[10px] font-black tracking-[0.4em] px-10">Operations</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category: any) => (
                <TableRow key={category.id} className="border-border/50 hover:bg-accent/30 dark:bg-white/5 transition-colors group">
                  <TableCell className="px-10 py-8 font-black text-foreground text-lg">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 group-hover:scale-110 transition-transform">
                           <Tag size={18} />
                        </div>
                        <span className="tracking-tight">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-bold italic">
                    {category._count?.blogs || 0} Records
                  </TableCell>
                  <TableCell className="px-10 text-right">
                    <div className="flex justify-end gap-3">
                        <Button 
                            onClick={() => openEditDialog(category)}
                            variant="ghost"
                            className="w-12 h-12 rounded-2xl bg-blue-500/5 hover:bg-blue-500/10 text-blue-400 border border-blue-500/10 transition-all"
                        >
                            <Edit2 size={18} />
                        </Button>
                        <Button 
                            onClick={() => handleDeleteCategory(category.id)}
                            variant="ghost"
                            className="w-12 h-12 rounded-2xl bg-red-500/5 hover:bg-red-500/10 text-red-400 border border-red-500/10 transition-all"
                        >
                            <Trash2 size={18} />
                        </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="py-32 flex flex-col items-center gap-8 text-center border-4 border-dotted border-border/50">
             <div className="bg-accent/30 dark:bg-white/5 p-8 rounded-full border border-border shadow-2xl">
                <Tag className="w-16 h-16 text-gray-700" />
             </div>
             <div>
                <h3 className="text-3xl font-black text-foreground uppercase tracking-tighter">Database Void</h3>
                <p className="text-muted-foreground mt-2 font-medium max-w-sm mx-auto italic">No classification domains match the current parameters. Initialize your first hub.</p>
             </div>
             <Button onClick={() => setIsDialogOpen(true)} className="btn-modern px-12 py-8 text-lg">
                Initialize Hub
             </Button>
          </div>
        )}
      </div>
    </div>
  )
}
