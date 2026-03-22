import Image from "next/image"
import Link from "next/link"
import { Star, Clock, GraduationCap, ArrowRight, ChevronLeft, BookOpen, Layers } from "lucide-react"

export default async function CategoryDetailsPage({ params }: { params: { id: string } }) {
  let tutors: any[] = [];
  let categoryName = "Category";

  try {
    // Fetch all tutors
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutors?categoryId=${params.id}`, {
      cache: "no-store",
    })
    const result = await res.json()
    if (result?.success) {
      tutors = result.data.data || []
    }
    
    // Attempt to guess category name from first tutor
    if (tutors.length > 0) {
      const currentSub = tutors[0].subjects.find((s: any) => s.categoryId === params.id)
      if (currentSub) {
        categoryName = currentSub.category?.name || "Category"
      }
    } else {
       // Ideally we should fetch the exact category by ID, but since there's no GET /category/:id
       // We will just do GET /categories and filter
       const catRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`, { cache: "no-store" })
       const catResult = await catRes.json();
       const exactCat = catResult?.data?.find((c:any) => c.id === params.id);
       if(exactCat) categoryName = exactCat.name;
    }

  } catch (error) {
    console.error("Failed to fetch category details", error)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-16 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-pink-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <Link href="/categories" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-10 transition-colors group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Categories Hub
        </Link>
        
        <div className="mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-black uppercase tracking-widest shadow-2xl">
            <Layers className="w-4 h-4" />
            <span>Curated Category</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-none">
            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500">{categoryName}</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl font-medium leading-relaxed">
            Unleash your potential with {tutors.length} world-class experts. From fundamentals to advanced concepts, find the perfect mentor for your {categoryName} journey.
          </p>
        </div>

        {tutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((tutor: any) => (
              <div
                key={tutor.id}
                className="group relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl hover:bg-white/[0.06] transition-all duration-500 hover:border-pink-500/50 flex flex-col h-full shadow-2xl hover:-translate-y-2"
              >
                <div className="flex items-start gap-6 mb-8">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-white/10 group-hover:border-pink-500 transition-all shadow-xl">
                    <Image
                      src={tutor.avatar || tutor.user?.avatar || "https://github.com/shadcn.png"}
                      alt={tutor.user?.name || "Tutor"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <h3 className="text-2xl font-black text-white mb-2 truncate group-hover:text-pink-400 transition-colors">{tutor.user?.name || "Expert Tutor"}</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-black tracking-tighter">{tutor.rating?.toFixed(1) || "5.0"}</span>
                      </div>
                      <div className="h-4 w-[1px] bg-white/10" />
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{tutor.experience || 0}y Exp.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                   <p className="text-zinc-500 font-medium leading-relaxed line-clamp-3 mb-8 text-sm italic">
                    "{tutor.bio || "Bringing excellence and personalized guidance to every student session."}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black text-zinc-600 tracking-widest mb-1">Standard Rate</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white tracking-tighter">${tutor.pricePerHour}</span>
                      <span className="text-xs font-bold text-zinc-500">/hr</span>
                    </div>
                  </div>
                  <Link href={`/tutors/${tutor.id}`}>
                    <button className="bg-white text-black hover:bg-pink-500 hover:text-white transition-all font-black rounded-xl px-6 py-4 text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl">
                      View Profile <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white/[0.02] border border-white/10 rounded-[4rem] backdrop-blur-xl">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
               <BookOpen className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 tracking-tight">No mentors found for this hub</h3>
            <p className="text-zinc-500 max-w-md mx-auto font-medium text-lg px-6">
              Our {categoryName} expert squad is currently in the field. Check back soon or discover other learning paths.
            </p>
            <div className="pt-10">
              <Link href="/categories" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black hover:bg-pink-500 hover:text-white rounded-2xl transition-all font-black text-sm uppercase tracking-widest shadow-2xl">
                Browse All Hubs <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
