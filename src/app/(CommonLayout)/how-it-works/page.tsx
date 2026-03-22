import Link from "next/link"
import { Search, Calendar, Video, Star, ArrowRight, CheckCircle2, BookOpen, Users, Trophy } from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      title: "Find Your Perfect Tutor",
      description: "Browse through our expert tutors. Filter by subject, price, and rating to find the perfect match for your goals.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Calendar,
      title: "Book a Session",
      description: "Pick a time that works for you. Our tutors have flexible schedules to accommodate your busy life.",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      icon: Video,
      title: "Start Learning",
      description: "Join your session through our integrated classroom. Get personalized 1-on-1 attention and master any subject.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    }
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-16 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[150px] rounded-full" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-500 text-sm font-black uppercase tracking-widest">
            <Trophy className="w-4 h-4" />
            <span>Learning Journey</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500">Works</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
            Fast, simple, and effective. Here's how SkillBridge helps you reach your learning milestones.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-orange-500/20 to-emerald-500/20 -z-10" />
          
          {steps.map((step, i) => (
            <div key={i} className="group relative">
               <div className="mb-8 relative">
                 <div className={`w-28 h-28 ${step.bg} rounded-[2rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border-2 border-white/5 group-hover:border-inherit`}>
                   <step.icon className={`w-12 h-12 ${step.color}`} />
                 </div>
                 <div className="absolute -top-2 -right-2 w-10 h-10 bg-zinc-900 border-2 border-white/10 rounded-full flex items-center justify-center font-black text-white text-lg group-hover:bg-white group-hover:text-black transition-colors">
                   {i + 1}
                 </div>
               </div>
               <h3 className="text-2xl font-black mb-4 tracking-tight">{step.title}</h3>
               <p className="text-zinc-500 font-medium leading-relaxed">
                 {step.description}
               </p>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black tracking-tighter">Why Choose <span className="text-orange-500">SkillBridge?</span></h2>
              <div className="space-y-6">
                {[
                  "Verified expert tutors across 50+ subjects",
                  "Secure payments and satisfaction guarantee",
                  "Flexible scheduling that fits your timeline",
                  "High-quality 1-on-1 personalized attention"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold text-zinc-300 group-hover:text-white transition-colors">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="pt-8">
                <Link href="/register">
                  <button className="bg-white text-black font-black px-10 py-5 rounded-2xl hover:bg-orange-500 hover:text-white transition-all scale-100 hover:scale-105 shadow-2xl flex items-center gap-2">
                    Get Started Now <ArrowRight size={20} />
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-4 pt-12">
                  <div className="h-40 bg-blue-500/20 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 text-center group hover:bg-blue-500 transition-all">
                     <Users className="w-8 h-8 mb-2 text-blue-400 group-hover:text-white" />
                     <p className="font-black text-2xl">10k+</p>
                     <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest group-hover:text-white/80">Students</p>
                  </div>
                  <div className="h-40 bg-orange-500/20 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 text-center group hover:bg-orange-500 transition-all">
                     <Star className="w-8 h-8 mb-2 text-orange-400 group-hover:text-white" />
                     <p className="font-black text-2xl">4.9/5</p>
                     <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest group-hover:text-white/80">Rating</p>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="h-40 bg-emerald-500/20 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 text-center group hover:bg-emerald-500 transition-all">
                     <BookOpen className="w-8 h-8 mb-2 text-emerald-400 group-hover:text-white" />
                     <p className="font-black text-2xl">500+</p>
                     <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest group-hover:text-white/80">Tutors</p>
                  </div>
                  <div className="h-40 bg-purple-500/20 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 text-center group hover:bg-purple-500 transition-all">
                     <Trophy className="w-8 h-8 mb-2 text-purple-400 group-hover:text-white" />
                     <p className="font-black text-2xl">Global</p>
                     <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest group-hover:text-white/80">Reach</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
