import Image from "next/image"
import { Globe, Users, BookOpen, Star, ArrowRight, ShieldCheck, Zap } from "lucide-react"
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Bridging the gap <br className="hidden md:block" />
            between <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">skills</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">dreams</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-10">
            We're building the most accessible, high-quality tutoring platform on the internet. Whether you are aiming to master a new language, prepare for a certification, or excel in mathematics, SkillBridge connects you with the world's finest educators.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register?role=student">
              <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center justify-center gap-2">
                Join as a Student <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/register?role=tutor">
              <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-full transition-all border border-white/10 flex items-center justify-center gap-2">
                Become a Tutor
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-orange-500 mb-2">500+</h3>
              <p className="text-zinc-500 font-medium">Verified Tutors</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2">10k+</h3>
              <p className="text-zinc-500 font-medium">Active Students</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2">50+</h3>
              <p className="text-zinc-500 font-medium">Subjects Available</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2">4.9/5</h3>
              <p className="text-zinc-500 font-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold">
                <Globe className="w-4 h-4" />
                <span>Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Democratizing education <br className="hidden md:block" /> for everyone, everywhere.
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                SkillBridge was founded on a simple belief: high-quality education should not be constrained by geography or socioeconomic status. We provide a state-of-the-art virtual classroom environment combined with rigorously vetted tutors to deliver unparalleled learning experiences.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <ShieldCheck className="text-orange-500" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Vetted Experts</h4>
                    <p className="text-zinc-500">Every tutor undergoes a strict background check and skills assessment.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <Zap className="text-orange-500" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Flexible Scheduling</h4>
                    <p className="text-zinc-500">Book sessions round the clock, directly accommodating your busy lifestyle.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex-1 w-full relative">
              <div className="relative aspect-square md:aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                  alt="Students learning together"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-2xl backdrop-blur-xl hidden sm:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-orange-500" />
                    ))}
                  </div>
                  <div>
                    <p className="font-bold text-sm">Join 10k+ learners</p>
                    <div className="flex text-yellow-500">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-90" />
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />

        <div className="container mx-auto px-4 relative z-10 text-center text-white max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to start your journey?</h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed font-light">
            Join the SkillBridge community today and unlock your true potential with the help of world-class educators.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <Link href="/register">
              <button className="bg-white text-orange-600 font-bold py-4 px-10 rounded-full hover:bg-zinc-100 transition-all shadow-xl hover:-translate-y-1">
                Create an Account
              </button>
            </Link>

            <Link href="/tutors">
              <button className="bg-transparent border border-white text-white font-bold py-4 px-10 rounded-full hover:bg-white/10 transition-all">
                Explore Tutors
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}