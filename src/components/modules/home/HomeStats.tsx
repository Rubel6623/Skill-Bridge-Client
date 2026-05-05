import React from 'react';
import { Users, GraduationCap, Star, BookOpen } from 'lucide-react';

const stats = [
  {
    label: "Active Students",
    value: "15,000+",
    icon: <Users className="w-6 h-6 text-orange-400" />,
    description: "Growing community of learners"
  },
  {
    label: "Expert Tutors",
    value: "800+",
    icon: <GraduationCap className="w-6 h-6 text-purple-400" />,
    description: "Verified and professional"
  },
  {
    label: "Course Hours",
    value: "120,000+",
    icon: <BookOpen className="w-6 h-6 text-blue-400" />,
    description: "High-quality learning content"
  },
  {
    label: "Success Rate",
    value: "98%",
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    description: "Students achieving their goals"
  }
];

export const HomeStats = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-gradient-to-br dark:from-[#1e293b] dark:via-[#11181c] dark:to-[#0f172a] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-500/10 dark:bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group p-8 rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-white/5 backdrop-blur-xl hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2 shadow-xl dark:shadow-2xl"
            >
              <div className="mb-6 p-4 rounded-2xl bg-slate-100 dark:bg-white/5 w-fit group-hover:scale-110 transition-transform duration-500">
                {stat.icon}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-gray-700 dark:text-white/80 font-semibold text-lg">
                  {stat.label}
                </p>
                <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>

              {/* Decorative line */}
              <div className="mt-6 h-1 w-0 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-700 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
