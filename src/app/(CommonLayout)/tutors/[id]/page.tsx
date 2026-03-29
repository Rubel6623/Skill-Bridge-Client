import Image from "next/image"
import Link from "next/link"
import { Star, Clock, GraduationCap, CheckCircle2, Calendar, BookOpen, ChevronLeft, ArrowRight, Quote } from "lucide-react"
import { getTutorDetails } from "../../../../services/tutor";
import { getReviewsByTutor } from "../../../../services/review";
import { format } from "date-fns";

export default async function TutorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [tutorResult, reviewsResult] = await Promise.all([
    getTutorDetails(id),
    getReviewsByTutor(id)
  ]);

  const tutor = tutorResult?.success ? tutorResult.data : null;
  const reviews = reviewsResult?.success ? reviewsResult.data : [];

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Tutor Not Found</h2>
          <p className="text-zinc-500">The tutor you're looking for doesn't exist or is unavailable.</p>
          <Link href="/tutors" className="text-orange-500 hover:text-orange-400 font-semibold flex items-center justify-center gap-2">
            <ChevronLeft size={16} /> Back to Tutors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-16 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <Link href="/tutors" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Browse
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Core Info */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header Card */}
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-2xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] -z-10" />
              
              <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
                <div className="w-40 h-40 rounded-3xl overflow-hidden shrink-0 border-4 border-white/10 relative shadow-2xl group">
                  <Image
                    src={tutor.user?.avatar || "https://github.com/shadcn.png"}
                    alt={tutor.user?.name || "Tutor"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter">{tutor.user?.name}</h1>
                    <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 size={12} /> Expert verified
                    </span>
                  </div>
                  
                  <p className="text-2xl text-zinc-400 font-medium leading-tight">
                    {tutor.tagline || tutor.bio?.slice(0, 100)}...
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-8 text-sm pt-4">
                    <div className="flex items-center gap-2 group">
                      <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 border border-yellow-400/20 transition-all group-hover:bg-yellow-400 group-hover:text-black">
                        <Star className="fill-current" size={20} />
                      </div>
                      <div className="flex flex-col">
                         <span className="font-black text-lg leading-none">{tutor.rating?.toFixed(1) || "5.0"}</span>
                         <span className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">({reviews.length} reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 group">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 transition-all group-hover:bg-orange-500 group-hover:text-white">
                        <Clock size={20} />
                      </div>
                      <div className="flex flex-col">
                         <span className="font-black text-lg leading-none">{tutor.experience}</span>
                         <span className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">years experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                <BookOpen className="text-orange-500" /> About the Tutor
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 text-zinc-400 text-lg leading-relaxed font-medium backdrop-blur-3xl shadow-xl">
                {tutor.bio}
              </div>
            </div>

            {/* Subjects/Courses Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                <GraduationCap className="text-orange-500" /> Programs & Courses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {tutor.subjects?.map((sub: any) => (
                  <div key={sub.id} className="group bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between transition-all hover:bg-white/[0.08] hover:border-orange-500/30 hover:-translate-y-1 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                       <BookOpen size={100} />
                    </div>
                    <div className="relative z-10 space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 mb-4 transition-all group-hover:bg-orange-500 group-hover:text-white">
                        <BookOpen size={24} />
                      </div>
                      <h3 className="font-black text-2xl tracking-tight leading-none group-hover:text-orange-500 transition-colors uppercase">{sub.title || sub.category?.name}</h3>
                      <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">{sub.category?.name}</p>
                      
                      <div className="pt-6">
                        <Link href={`/tutors/${tutor.id}/book?subjectId=${sub.id}`} className="block">
                          <button className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-orange-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                            Enroll Now <ArrowRight size={16} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-10 pt-10">
               <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3 uppercase">
                 <Star className="text-yellow-500 fill-yellow-500" /> Student Perspective
               </h2>

               {reviews.length > 0 ? (
                 <div className="grid grid-cols-1 gap-6">
                   {reviews.map((review: any) => (
                     <div key={review.id} className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl relative group hover:bg-white/[0.05] transition-all">
                       <div className="absolute top-10 right-10 text-white/5 group-hover:text-orange-500/10 transition-colors">
                          <Quote size={80} />
                       </div>
                       
                       <div className="flex items-center gap-4 mb-8">
                         <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/10">
                            <img src={review.student?.user?.avatar || "https://github.com/shadcn.png"} alt="Student" className="w-full h-full object-cover" />
                         </div>
                         <div>
                            <p className="font-black text-white uppercase tracking-tight">{review.student?.user?.name || "Student"}</p>
                            <div className="flex gap-1 mt-1">
                               {[1, 2, 3, 4, 5].map((s) => (
                                 <Star key={s} size={14} className={s <= review.rating ? "fill-yellow-500 text-yellow-500" : "text-zinc-800"} />
                               ))}
                            </div>
                         </div>
                         <div className="ml-auto text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{format(new Date(review.createdAt), "MMM dd, yyyy")}</p>
                         </div>
                       </div>

                       <p className="text-lg font-medium text-zinc-300 leading-relaxed italic relative z-10">
                          "{review.comment}"
                       </p>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-[3rem] opacity-30">
                    <p className="font-black uppercase tracking-[0.5em] text-xs">No Perspective Broadcasted Yet</p>
                 </div>
               )}
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-white/10 rounded-[3rem] p-10 sticky top-24 shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="absolute top-4 right-4 animate-pulse">
                 <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              
              <div className="flex items-end gap-2 mb-8 relative">
                <span className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">${tutor.pricePerHour}</span>
                <span className="text-zinc-500 font-black uppercase tracking-widest text-xs pb-3">/ hour</span>
              </div>
              
              <div className="space-y-6 mb-10 text-sm font-bold tracking-tight">
                <div className="flex justify-between items-center py-3 border-b border-white/10 group">
                  <span className="flex items-center gap-3 text-zinc-400 group-hover:text-white transition-colors"><Clock size={18} className="text-orange-500" /> Response Time</span>
                  <span className="text-white">~1 hour</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10 group">
                  <span className="flex items-center gap-3 text-zinc-400 group-hover:text-white transition-colors"><Calendar size={18} className="text-blue-500" /> Active Schedule</span>
                  <span className="text-emerald-400 font-black uppercase text-xs tracking-widest">Available</span>
                </div>
              </div>

              <Link href={`/tutors/${tutor.id}/book`} className="block">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-6 rounded-2xl transition-all shadow-[0_15px_40px_rgba(249,115,22,0.3)] hover:shadow-[0_20px_60px_rgba(249,115,22,0.5)] hover:-translate-y-1 text-lg uppercase tracking-tight">
                  Book Immediate Session
                </button>
              </Link>
              <p className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-6">
                 100% Satisfaction Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
