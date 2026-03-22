import Image from "next/image"
import Link from "next/link"
import { Star, Clock, GraduationCap, MapPin, Globe, CheckCircle2, Calendar, BookOpen, Shield, ChevronLeft } from "lucide-react"

export default async function TutorDetailsPage({ params }: { params: { id: string } }) {
  let tutor = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutors/${params.id}`, {
      cache: "no-store"
    });
    const result = await res.json();
    if(result?.success) {
      tutor = result.data;
    }
  } catch(error) {
    console.log("Failed to fetch tutor details", error);
  }

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
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/tutors" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
          <ChevronLeft size={16} /> Back to Browse
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Core Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
              
              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-white/10 relative">
                  <Image
                    src={tutor.user?.avatar || "https://github.com/shadcn.png"}
                    alt={tutor.user?.name || "Tutor"}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{tutor.user?.name}</h1>
                    <span className="flex items-center gap-1 text-sm bg-green-500/10 text-green-400 px-2 py-1 rounded-full border border-green-500/20">
                      <CheckCircle2 size={14} /> Verified
                    </span>
                  </div>
                  
                  <p className="text-xl text-zinc-400 mb-4">{tutor.tagline || tutor.bio?.slice(0, 60)}...</p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-300">
                    <div className="flex items-center gap-2">
                      <Star className="text-yellow-500 fill-yellow-500" size={18} />
                      <span className="font-semibold">{tutor.rating?.toFixed(1) || "New"}</span>
                      <span className="text-zinc-500">({tutor.reviewCount || 0} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-orange-500" />
                      <span>{tutor.experience} years exp.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe size={16} className="text-blue-500" />
                      <span>Speaks English (Native)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="text-orange-500" /> About Me
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-zinc-300 leading-relaxed font-light">
                {tutor.bio}
              </div>
            </div>

            {/* Subjects Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <GraduationCap className="text-orange-500" /> Subjects I Teach
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tutor.subjects?.map((sub: any, idx: number) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                      <BookOpen size={20} className="text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{sub.title}</h3>
                      <p className="text-sm text-zinc-400">{sub.category?.name}</p>
                      <Link href={`/tutors/${tutor.id}/book?subjectId=${sub.id}`}>
                        <button className="mt-4 text-xs font-bold text-orange-500 hover:text-orange-400 border border-orange-500/20 px-3 py-1 rounded-lg transition hover:bg-orange-500/10">
                          Enroll in Course
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* Right Column: Booking & Sidebar */}
          <div className="space-y-8">
            {/* Booking Card */}
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl p-8 sticky top-24 shadow-2xl">
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-bold">${tutor.pricePerHour}</span>
                <span className="text-zinc-400 pb-1">/ hour</span>
              </div>
              
              <div className="space-y-4 mb-8 text-sm text-zinc-300">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="flex items-center gap-2"><Clock size={16} /> Response Time</span>
                  <span className="font-semibold">~1 hour</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="flex items-center gap-2"><Calendar size={16} /> Availability</span>
                  <span className="text-green-400 font-semibold">Open Now</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="flex items-center gap-2"><Shield size={16} /> Guarantee</span>
                  <span className="font-semibold text-white">100% Satisfaction</span>
                </div>
              </div>

              <Link href={`/tutors/${tutor.id}/book`} className="w-full">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                  Book a Session
                </button>
              </Link>
              <p className="text-center text-xs text-zinc-500 mt-4">Free cancellation within 24 hours</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
