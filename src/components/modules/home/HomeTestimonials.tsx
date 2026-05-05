import React from 'react';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Medical Student",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
    content: "SkillBridge transformed my preparation for the USMLE. My tutor was not only an expert but also a mentor who guided me through the toughest topics with ease.",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "Aspiring Data Scientist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
    content: "The flexibility and quality of tutors here are unmatched. I went from zero coding knowledge to landing my first internship in just six months.",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "High School Junior",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
    content: "My SAT scores improved by 250 points thanks to the personalized sessions. The interface is so smooth and finding the right tutor was incredibly easy.",
    rating: 5
  }
];

export const HomeTestimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#1e293b] via-[#11181c] to-[#0f172a] relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Loved by <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Thousands</span> of Students
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg font-serif">
            Real stories from our community members who have accelerated their learning journey with SkillBridge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div 
              key={index}
              className="relative p-8 rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl group hover:border-orange-500/20 transition-all duration-500"
            >
              <div className="absolute -top-4 -left-4 p-3 rounded-2xl bg-orange-500 text-white shadow-xl rotate-[-10deg] group-hover:rotate-0 transition-transform duration-500">
                <Quote size={20} fill="currentColor" />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-orange-500 fill-orange-500" />
                ))}
              </div>

              <p className="text-white/70 italic mb-8 leading-relaxed text-lg font-serif">
                "{item.content}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500/30">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold">{item.name}</h4>
                  <p className="text-white/30 text-xs uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
