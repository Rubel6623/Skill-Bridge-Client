"use client"

import { useState, useEffect } from "react"
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/services/category"
import { Tag, Search, Plus, MoreVertical, Edit2, Loader2, Image as ImageIcon, CheckCircle2, X, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AdminManageCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    thumbnail: ""
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const result = await getCategories()
      if (result?.success) {
        setCategories(result.data || [])
      }
    } catch (error) {
      toast.error("Failed to fetch categories")
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
        res = await updateCategory(editingCategory.id, formData)
      } else {
        res = await createCategory(formData)
      }

      if (res.success) {
        toast.success(editingCategory ? "Category updated successfully" : "Category created successfully")
        setIsDialogOpen(false)
        setEditingCategory(null)
        setFormData({ name: "", slug: "", thumbnail: "" })
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
    if (!confirm("Are you sure? This will remove this category hub forever.")) return

    try {
      const res = await deleteCategory(id)
      if (res.success) {
        toast.success("Category hub dismantled")
        fetchCategories()
      } else {
        toast.error(res.message || "Destruction sequence failed")
      }
    } catch (error) {
      toast.error("Critical system error")
    }
  }

  const openEditDialog = (category: any) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      thumbnail: category.thumbnail || ""
    })
    setIsDialogOpen(true)
  }

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 space-y-8 bg-[#fdfdfd] dark:bg-black min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter mb-2">Category Ecosystem</h1>
          <p className="text-zinc-500 font-medium">Define and evolve the learning paths of the SkillBridge platform.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-500 transition-colors" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none w-72 shadow-sm transition-all text-sm font-medium"
            />
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if(!open) {
                setEditingCategory(null);
                setFormData({ name: "", slug: "", thumbnail: "" });
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl h-12 px-6 font-black uppercase text-xs tracking-widest shadow-lg shadow-orange-500/20 flex items-center gap-2">
                <Plus size={18} strokeWidth={3} /> Create Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-[2rem] border-none shadow-2xl overflow-hidden p-0 dark:bg-zinc-950">
               <div className="bg-orange-500 h-2 w-full" />
               <div className="p-8 space-y-6">
                 <DialogHeader>
                    <DialogTitle className="text-2xl font-black tracking-tighter uppercase">
                        {editingCategory ? "Update Category" : "Build New Category"}
                    </DialogTitle>
                 </DialogHeader>
                 
                 <form onSubmit={handleCreateOrUpdate} className="space-y-4 pt-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Category Name</label>
                       <input 
                         required
                         type="text" 
                         className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-orange-500 font-bold"
                         placeholder="e.g. Machine Learning"
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Slug (URL identifier)</label>
                       <input 
                         required
                         type="text" 
                         className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-orange-500 font-bold"
                         placeholder="e.g. machine-learning"
                         value={formData.slug}
                         onChange={(e) => setFormData({...formData, slug: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Thumbnail Image URL</label>
                       <input 
                         type="text" 
                         className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-orange-500 font-bold"
                         placeholder="https://images.unsplash.com/..."
                         value={formData.thumbnail}
                         onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                       />
                    </div>
                    
                    <div className="pt-6">
                       <Button 
                         type="submit" 
                         disabled={isSubmitting}
                         className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black h-14 rounded-2xl uppercase tracking-[0.2em] text-xs shadow-xl shadow-orange-500/30"
                       >
                         {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : (editingCategory ? "Deploy Updates" : "Ignite Category")}
                       </Button>
                    </div>
                 </form>
               </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
           <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
           <p className="font-bold text-zinc-500 uppercase text-[10px] tracking-[0.3em]">Synching with database...</p>
        </div>
      ) : filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCategories.map((category: any) => (
            <div 
              key={category.id} 
              className="group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[3rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="relative h-48 rounded-[2rem] overflow-hidden mb-6 group-hover:scale-[0.98] transition-transform duration-500 shadow-xl">
                 <img 
                    src={category.thumbnail || "https://images.unsplash.com/photo-1633356122544-f134324a6cee"} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="px-4 pb-4">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                      <Tag size={14} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Hub ID: {category.slug}</span>
                </div>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter leading-none group-hover:text-orange-500 transition-colors uppercase truncate">
                    {category.name}
                </h3>
              </div>
              
              <div className="flex gap-2 px-4 mt-2">
                 <Button 
                    onClick={() => openEditDialog(category)}
                    className="flex-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl h-10 font-black uppercase text-[10px] tracking-widest hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all"
                 >
                    <Edit2 size={12} className="mr-2" /> Update
                 </Button>
                 <Button 
                    onClick={() => handleDeleteCategory(category.id)}
                    variant="outline"
                    className="flex-1 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl h-10 font-black uppercase text-[10px] tracking-widest hover:border-red-500 hover:text-red-500 transition-all"
                 >
                    <Trash2 size={12} className="mr-2" /> Delete
                 </Button>
              </div>

              <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -z-10 group-hover:bg-orange-500/10 transition-colors" />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-zinc-50 dark:bg-zinc-900/40 rounded-[4rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
           <ImageIcon className="w-20 h-20 text-zinc-300 mx-auto mb-6" />
           <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tighter">No hubs found</h3>
           <p className="text-zinc-500 mt-2 font-medium">Create your first category hub to start populating the platform.</p>
           <Button 
                onClick={() => setIsDialogOpen(true)}
                className="mt-10 bg-black dark:bg-white text-white dark:text-black rounded-2xl h-14 px-10 font-black uppercase text-xs tracking-widest shadow-2xl transition-transform hover:scale-105"
           >
             Initialize Category
           </Button>
        </div>
      )}
    </div>
  )
}
