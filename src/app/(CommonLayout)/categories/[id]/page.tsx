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
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <Link href="/categories" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
          <ChevronLeft size={16} /> Back to Categories
        </Link>
        
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-semibold mb-4">
            <Layers className="w-4 h-4" />
            <span>Category Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Learn <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">{categoryName}</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Explore {tutors.length} expert tutors ready to help you master {categoryName.toLowerCase()}. Find the perfect match for your learning style and goals.
          </p>
        </div>

        {tutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor: any, index: number) => (
              <div
                key={tutor.id || index}
                className="group relative p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.04] transition-all duration-300 hover:border-pink-500/30 flex flex-col h-full"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10 group-hover:border-pink-500/50 transition-all">
                    <Image
                      src={tutor.avatar || tutor.user?.avatar || "https://github.com/shadcn.png"}
                      alt={tutor.user?.name || "Tutor"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1 truncate">{tutor.user?.name || "Tutor"}</h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold">{tutor.rating?.toFixed(1) || "5.0"}</span>
                      <span className="text-xs text-zinc-500">•</span>
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {tutor.experience || 0}y exp
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-zinc-400 line-clamp-3 mb-6 flex-1">
                  {tutor.bio || "Experienced tutor ready to guide you."}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500 mb-0.5">Starting at</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-white">${tutor.pricePerHour}</span>
                      <span className="text-xs text-zinc-400">/hr</span>
                    </div>
                  </div>
                  <Link href={`/tutors/${tutor.id}`}>
                    <button className="bg-white/5 hover:bg-pink-500 hover:text-white text-zinc-300 transition-all border border-white/10 hover:border-pink-500 rounded-xl px-4 py-2 text-sm font-medium flex items-center gap-1">
                      View <ArrowRight size={14} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/[0.02] border border-white/5 rounded-3xl">
            <BookOpen className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No tutors found</h3>
            <p className="text-zinc-500 max-w-sm mx-auto">
              We currently don't have any registered tutors for {categoryName}. Please check back later or explore other categories.
            </p>
            <Link href="/categories" className="inline-block mt-6 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition text-sm font-medium">
              Browse all categories
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
