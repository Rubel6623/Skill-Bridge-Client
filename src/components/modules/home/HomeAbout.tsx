import { Shield, Target, Lightbulb, Users, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "../../../components/ui/button";

const stats = [
  { value: "10K+", label: "Active Students" },
  { value: "800+", label: "Expert Tutors" },
  { value: "50+", label: "Subjects" },
  { value: "4.8", label: "Avg Rating" },
]

const values = [
  {
    icon: Shield,
    title: "Verified Experts",
    description: "Every tutor undergoes a rigorous screening process to ensure quality and expertise.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Target,
    title: "Personalized Learning",
    description: "Custom lesson plans tailored to each student's goals, pace, and learning style.",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: Lightbulb,
    title: "Flexible Scheduling",
    description: "Book sessions anytime that works for you. Learn on your schedule, not ours.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a thriving community of learners and educators passionate about knowledge sharing.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
]

export const HomeAbout = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#1e293b] via-[#11181c] to-[#0f172a] relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.06] transition-all">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* About Content */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
              <Lightbulb className="w-4 h-4" />
              <span>About SkillBridge</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Bridging the Gap Between <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Knowledge</span> and <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Opportunity</span>
            </h2>
            <p className="text-gray-400 text-lg font-medium leading-relaxed mb-8">
              SkillBridge connects passionate learners with world-class tutors. Whether you&apos;re preparing for exams, mastering a new skill, or exploring a passion, we provide the platform and tools to make learning effective, enjoyable, and accessible to everyone.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "One-on-one personalized sessions",
                "Flexible booking and scheduling",
                "Secure payments and satisfaction guarantee",
                "Progress tracking and review system",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-gray-300 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/about-us">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold h-12 px-8 rounded-xl text-base">
                Learn More About Us <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Right - Value Cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full lg:max-w-lg">
            {values.map((val, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl border backdrop-blur-sm hover:scale-[1.03] transition-all duration-300 ${val.bg}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 ${val.color}`}>
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
