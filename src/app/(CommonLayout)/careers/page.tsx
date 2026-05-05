"use client";

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Heart, 
  Rocket, 
  Info, 
  CheckCircle2 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAllCategories } from '../../../services/service';
import { getUser } from '../../../services/auth';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

const values = [
  {
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    title: "Global Impact",
    desc: "We're breaking down geographical barriers to education, connecting the best minds across the world."
  },
  {
    icon: <Heart className="w-6 h-6 text-red-400" />,
    title: "Student First",
    desc: "Every decision we make is driven by what's best for our learners' growth and success."
  },
  {
    icon: <Rocket className="w-6 h-6 text-orange-400" />,
    title: "Fast Growth",
    desc: "We're a fast-moving team that values initiative, creativity, and rapid professional development."
  }
];

export default function CareersPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, userRes] = await Promise.all([
          getAllCategories(),
          getUser()
        ]);
        
        if (catRes?.success) {
          setCategories(catRes.data || []);
        }
        setUser(userRes);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApply = (subjectName: string) => {
    if (!user) {
      toast.error("Please login to apply for " + subjectName);
      router.push('/login');
      return;
    }

    if (user.role !== "tutor") {
      toast.error("Only tutors are allowed to apply for these positions. Students cannot apply.");
      return;
    }
    
    toast.success(`Application for ${subjectName} submitted successfully! Our team will contact you soon.`);
  };

  const handleSpeculativeApply = () => {
    if (!user) {
      toast.error("Please login to send your resume");
      router.push('/login');
      return;
    }

    if (user.role !== "tutor") {
      toast.error("Speculative applications are reserved for potential tutors only.");
      return;
    }

    toast.success("Your speculative application has been received. We'll be in touch!");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-[#1e293b] dark:via-[#11181c] dark:to-[#0f172a] pt-24 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[800px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-4">
            <Sparkles size={16} />
            We're Hiring!
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            Build the Future of <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-500 dark:to-purple-500 bg-clip-text text-transparent">Online Learning</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            Join a mission-driven team dedicated to making world-class education accessible to everyone, everywhere.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {values.map((value, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 backdrop-blur-sm hover:border-blue-500/20 transition-all duration-300 shadow-sm dark:shadow-none">
              <div className="mb-6 p-4 rounded-2xl bg-gray-100 dark:bg-white/5 w-fit">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* Job Listings (Categories) */}
        <div className="space-y-12">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Open Tutor Positions</h2>
              <p className="text-gray-500">Expert tutors needed for various subject categories.</p>
            </div>
            <div className="hidden md:block">
              <span className="text-sm text-gray-600 dark:text-gray-500 bg-white dark:bg-white/5 px-4 py-2 rounded-full border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none">
                {loading ? "..." : categories.length} Categories Available
              </span>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-white/5 animate-pulse rounded-2xl border border-white/10" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {categories.map((cat, idx) => (
                <div 
                  key={cat.id || idx}
                  className="group p-6 md:p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm dark:shadow-none"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        {cat.name} Tutor
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                        Education
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-500">
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> Remote</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} /> Flexible</span>
                      <span className="text-gray-500 dark:text-gray-400 font-semibold">{cat._count?.tutorSubjects || 0} active subjects</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-xl transition-colors">
                          <Info size={18} />
                          Details
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md bg-white dark:bg-[#0d0d1a] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                            <Sparkles className="text-blue-500 dark:text-blue-400" />
                            {cat.name} Tutor Role
                          </DialogTitle>
                          <DialogDescription className="text-gray-500 dark:text-white/40">
                            Subject Category Details & Requirements
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6 py-6 text-gray-600 dark:text-white/70">
                          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/5">
                            <h4 className="text-gray-900 dark:text-white font-bold mb-2">Category Description</h4>
                            <p className="text-sm leading-relaxed">
                              Join our team as a {cat.name} expert. We are looking for passionate individuals who can simplify complex concepts in {cat.name} and help students achieve their academic goals.
                            </p>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="text-gray-900 dark:text-white font-bold">What we offer:</h4>
                            {[
                              "Flexible working hours",
                              "Competitive hourly rates",
                              "Access to premium teaching tools",
                              "Professional development resources"
                            ].map((perk, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm">
                                <CheckCircle2 size={14} className="text-blue-400" />
                                {perk}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-white/5">
                          <button 
                            onClick={() => handleApply(cat.name)}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg"
                          >
                            Apply for {cat.name}
                          </button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <button 
                      onClick={() => handleApply(cat.name)}
                      className="inline-flex items-center gap-2 text-gray-900 dark:text-white font-bold px-6 py-3 bg-gray-100 dark:bg-white/5 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] rounded-xl transition-all group-hover:scale-105"
                    >
                      Apply Now <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Perks Section */}
        <div className="mt-32 p-12 rounded-[40px] bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden shadow-2xl text-center md:text-left">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl space-y-6">
              <h2 className="text-4xl font-bold text-white leading-tight">Can't find the right role?</h2>
              <p className="text-white/80 text-lg">
                We're always looking for talented individuals who are passionate about education. 
                Send us your resume and we'll keep you in mind for future openings.
              </p>
              <button 
                onClick={handleSpeculativeApply}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform"
              >
                Send Speculative Application
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Health Insurance', 'Remote Work', 'Learning Budget', 'Equity Options'].map((perk) => (
                <div key={perk} className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-white font-medium text-center">
                  {perk}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
