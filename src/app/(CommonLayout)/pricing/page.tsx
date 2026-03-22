import Link from "next/link"
import { Check, Shield, Star, Zap, Clock, User, Heart, Gift, ArrowRight } from "lucide-react"

export default function PricingPage() {
  const tiers = [
    {
      name: "Starter",
      price: "15",
      description: "Ideal for one-off support or trying out a new subject.",
      features: ["1 hour of tutoring session", "Access to 50+ subjects", "Secure platform chat", "Satisfaction guarantee"],
      color: "blue",
      popular: false
    },
    {
      name: "Standard",
      price: "45",
      description: "Great for students needing consistent weekly support.",
      features: ["4 hours of tutoring session", "Access to top-rated tutors", "Priority support", "Weekly progress reports", "Session recordings"],
      color: "orange",
      popular: true
    },
    {
      name: "Expert",
      price: "99",
      description: "Full mastery program with our most experienced tutors.",
      features: ["10 hours of tutoring session", "VIP tutor assignments", "24/7 priority support", "Custom learning plan", "Certification of completion"],
      color: "purple",
      popular: false
    }
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-16 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-15%] right-[-5%] w-[45%] h-[45%] bg-blue-600/10 blur-[130px] rounded-full" />
      <div className="absolute bottom-[-15%] left-[-5%] w-[45%] h-[45%] bg-orange-600/10 blur-[130px] rounded-full" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center space-y-6 mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-500 text-xs font-black uppercase tracking-widest shadow-xl">
             <Gift className="w-4 h-4" />
             <span>First Session 10% Off</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            Pricing that Makes <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-white to-orange-500">Sense</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Invest in your future with transparent, affordable pricing. No hidden fees, just high-quality education.
          </p>
          
          <div className="flex items-center justify-center gap-8 pt-4">
             <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-zinc-500" />
                <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Secure Payments</span>
             </div>
             <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-zinc-500" />
                <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Cancel Anytime</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {tiers.map((tier, i) => (
            <div 
              key={i} 
              className={`relative rounded-[3rem] p-8 md:p-10 border-2 transition-all duration-500 group overflow-hidden h-full flex flex-col ${
                tier.popular 
                ? "bg-white/5 border-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.15)] scale-105 z-20" 
                : "bg-white/[0.02] border-white/10 hover:border-zinc-700 z-10"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-6 right-6 px-4 py-1.5 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-2xl font-black mb-2 tracking-tight transition-colors group-hover:text-orange-500 uppercase">{tier.name}</h3>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">{tier.description}</p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white tracking-tighter">${tier.price}</span>
                  <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">/ average session</span>
                </div>

                <div className="space-y-4 pt-6">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 group/feat">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        tier.popular ? "bg-orange-500 text-white border-orange-400" : "bg-white/10 text-zinc-400 border-white/5 group-hover/feat:bg-white group-hover/feat:text-black"
                      }`}>
                         <Check size={12} className="stroke-[4px]" />
                      </div>
                      <span className="text-sm font-bold text-zinc-300 group-hover/feat:text-white transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-10">
                <Link href="/register" className="w-full">
                  <button className={`w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-2 group-hover:gap-4 ${
                    tier.popular 
                    ? "bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/20" 
                    : "bg-white/10 hover:bg-white text-zinc-400 hover:text-black"
                  }`}>
                    Get Started <ArrowRight size={20} className="transition-all" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ - Short */}
        <div className="max-w-4xl mx-auto space-y-12">
           <h2 className="text-4xl font-black tracking-tighter text-center">Frequently Asked <span className="text-blue-500">Questions</span></h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { q: "Can I switch tutors at any time?", a: "Yes! If you feel like your tutor isn't the right fit, you can browse and switch to any other expert on the platform immediately." },
                { q: "Are the sessions recorded?", a: "Only if you want them to be. Recordings are available for Standard and Expert tiers for later review." },
                { q: "Is there a free trial?", a: "Most of our tutors offer a free 15-minute consultation to discuss your learning goals before you book." },
                { q: "How are tutors verified?", a: "Our tutors undergo a rigorous screening process, including identity checks, academic certification, and a demo lesson." }
              ].map((faq, i) => (
                 <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all">
                    <h4 className="font-black text-lg mb-3 tracking-tight text-white">{faq.q}</h4>
                    <p className="text-sm font-medium text-zinc-500 leading-relaxed">{faq.a}</p>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </main>
  )
}
