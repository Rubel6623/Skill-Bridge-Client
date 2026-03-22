import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Clock, Star, BookOpen, CheckCircle2, ArrowRight, CreditCard, Globe, Shield } from "lucide-react";
import { getSubjectDetails } from "@/services/tutor";
import { Button } from "@/components/ui/button";

export default async function SubjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log("Fetching subject for ID:", id);
  
  const result = await getSubjectDetails(id);
  console.log("Subject detail result:", result);
  
  const subject = result?.success ? result.data : null;

  if (!subject) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#0a0a0f] space-y-4">
        <h2 className="text-3xl font-black text-center px-4">Subject Not Found</h2>
        <p className="text-zinc-500 font-medium">The ID: <span className="text-primary">{id}</span> was not found or is unavailable.</p>
        <Link href="/services" className="text-primary hover:underline font-bold pt-4">Return to browse subjects</Link>
      </div>
    );
  }

  const tutor = subject.tutorProfile;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-16 relative overflow-hidden">
      {/* Dynamic backgrounds for premium look */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <Link href="/services" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-10 transition-colors group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to All Subjects Hub
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="relative h-[450px] w-full rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl">
              <Image 
                src={subject.category?.thumbnail || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"} 
                alt={subject.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />
              <div className="absolute bottom-10 left-10 space-y-4">
                <span className="px-5 py-2 bg-primary text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl">
                  {subject.category?.name}
                </span>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">{subject.title}</h1>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl shadow-2xl">
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3 tracking-tight">
                <BookOpen className="text-primary" /> Comprehensive Course Overview
              </h2>
              <div className="space-y-6">
                <p className="text-zinc-400 leading-relaxed text-xl font-medium">
                  {subject.description || "Unleash your potential with this elite tutoring session. Designed for mastery, this program focuses on building core competencies and practical problem-solving skills in " + subject.title + "."}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                   {[
                     { l: "Duration", v: "60 Min", i: <Clock className="w-4 h-4 text-primary" /> },
                     { l: "Format", v: "1-on-1", i: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> },
                     { l: "Access", v: "Lifetime", i: <Star className="w-4 h-4 text-yellow-500" /> },
                     { l: "Medium", v: "Online", i: <Globe className="w-4 h-4 text-blue-500" /> }
                   ].map((item, id) => (
                      <div key={id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
                         <div className="flex items-center gap-2">
                           {item.i}
                           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{item.l}</span>
                         </div>
                         <p className="font-black text-white text-sm uppercase">{item.v}</p>
                      </div>
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Booking Action */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-zinc-900 to-[#0a0a0f] border-2 border-white/10 rounded-[3rem] p-10 sticky top-28 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-[0.05] group-hover:scale-110 transition-transform">
                 <CreditCard size={100} />
              </div>
              
              <div className="flex items-center gap-6 mb-10 pb-10 border-b border-white/10 relative z-10">
                <Link href={`/tutors/${tutor?.id}`} className="shrink-0">
                   <div className="relative w-20 h-20 rounded-3xl overflow-hidden border-2 border-primary shadow-xl hover:scale-110 transition-transform">
                     <Image src={tutor?.user?.avatar || "https://github.com/shadcn.png"} alt="Tutor" fill className="object-cover" />
                   </div>
                </Link>
                <div>
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-1">Mentor</p>
                  <p className="font-black text-2xl tracking-tighter hover:text-primary transition-colors cursor-pointer">{tutor?.user?.name}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-black text-white tracking-tighter">{tutor?.rating || "5.0"}</span>
                    <span className="text-zinc-600 font-black text-[10px] uppercase">Verified</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-10 relative z-10">
                <div className="flex justify-between items-end">
                  <span className="text-zinc-500 font-black text-xs uppercase tracking-widest pb-1">Price Per Session</span>
                  <div className="flex items-baseline gap-1">
                     <span className="text-5xl font-black text-white tracking-tighter">${tutor?.pricePerHour}</span>
                     <span className="text-zinc-500 text-sm font-black">/hr</span>
                  </div>
                </div>
              </div>

              <Link href={`/tutors/${tutor?.id}/book?subjectId=${subject.id}`} className="block relative z-10">
                <Button className="w-full py-8 text-lg font-black uppercase tracking-tight rounded-2xl transition-all hover:-translate-y-1 shadow-[0_15px_40px_rgba(var(--primary),0.3)] hover:shadow-[0_20px_60px_rgba(var(--primary),0.5)]">
                  Enroll Now <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              
              <div className="flex flex-col items-center gap-2 mt-8 opacity-60">
                 <p className="text-[10px] font-black text-zinc-400 tracking-[0.2em] flex items-center gap-1 uppercase">
                   <CheckCircle2 size={10} className="text-emerald-500" /> Satisfaction Guaranteed
                 </p>
                 <Shield size={16} className="text-zinc-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
