"use client";

import React from 'react';
import { BookOpen, CheckCircle2, ShieldCheck, Zap, MessageSquare, Award, Clock, Star, FileText, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

const guidelines = [
  {
    title: "Mathematics & Science",
    icon: <Zap className="w-6 h-6 text-orange-500" />,
    rules: [
      "Use clear, step-by-step problem-solving methods.",
      "Incorporate visual aids or digital whiteboards when possible.",
      "Focus on conceptual understanding rather than just memorization.",
      "Provide practice problems at the end of each session."
    ],
    bgGlow: "bg-orange-500/10"
  },
  {
    title: "Programming & Tech",
    icon: <CheckCircle2 className="w-6 h-6 text-blue-500" />,
    rules: [
      "Prioritize hands-on coding exercises.",
      "Explain the 'why' behind specific syntax or architectural choices.",
      "Encourage best practices like documentation and clean code.",
      "Review and debug student's code patiently."
    ],
    bgGlow: "bg-blue-500/10"
  },
  {
    title: "Languages & Arts",
    icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
    rules: [
      "Create immersive conversational environments.",
      "Use cultural context to explain linguistic nuances.",
      "Balance grammar corrections with encouraging fluency.",
      "Set weekly reading or listening assignments."
    ],
    bgGlow: "bg-purple-500/10"
  },
  {
    title: "Test Prep (SAT/IELTS)",
    icon: <Award className="w-6 h-6 text-emerald-500" />,
    rules: [
      "Share time-management strategies for exams.",
      "Conduct regular mock tests and detailed post-test analysis.",
      "Focus on identifying and improving weak areas.",
      "Provide updated study materials and resources."
    ],
    bgGlow: "bg-emerald-500/10"
  }
];

const generalPrinciples = [
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Punctuality",
    desc: "Always start sessions on time. If delayed, notify the student at least 15 minutes in advance."
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Professionalism",
    desc: "Maintain a respectful and professional environment. Focus entirely on the student's progress."
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Quality Feedback",
    desc: "Provide constructive, detailed feedback after every session to help students track their growth."
  }
];

const handbookSections = [
  {
    title: "Introduction",
    content: "Welcome to the SkillBridge Tutor community. This handbook is designed to help you excel in your role and provide the best possible experience for your students."
  },
  {
    title: "Teaching Methodologies",
    content: "We encourage the 'Socratic Method' of teaching—asking guided questions to lead students to the answer themselves, fostering deeper understanding."
  },
  {
    title: "Platform Tools",
    content: "Learn how to use our integrated whiteboard, code editor, and file-sharing systems effectively during your live sessions."
  },
  {
    title: "Safety & Privacy",
    content: "Never share personal contact information with students. All communication and payments must happen through the SkillBridge platform."
  }
];

export default function TutorGuidelinesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-[#1e293b] dark:via-[#11181c] dark:to-[#0f172a] pt-24 pb-20 relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-widest">
            <BookOpen size={14} />
            For Our Educators
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
            Tutor <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Guidelines</span>
          </h1>
          <p className="text-gray-500 dark:text-white/40 max-w-2xl mx-auto text-lg">
            Our mission is to provide world-class education. These guidelines ensure consistency, 
            quality, and success for both you and your students.
          </p>
        </div>

        {/* General Principles Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {generalPrinciples.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm hover:border-orange-500/30 transition-all duration-300 shadow-sm dark:shadow-none">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
                {item.icon}
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-white font-bold mb-1">{item.title}</h3>
                <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Subject Specific Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guidelines.map((group, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-3xl border border-gray-200 dark:border-white/5 bg-white dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent backdrop-blur-xl group hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500 shadow-sm dark:shadow-none`}
            >
              {/* Internal Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${group.bgGlow} blur-3xl rounded-full pointer-events-none group-hover:opacity-100 transition-opacity`} />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none">
                  {group.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{group.title}</h2>
              </div>

              <ul className="space-y-4">
                {group.rules.map((rule, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-3 group/item">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 group-hover/item:scale-125 transition-transform" />
                    <p className="text-gray-600 dark:text-white/60 group-hover/item:text-gray-900 dark:group-hover/item:text-white/90 transition-colors leading-relaxed">
                      {rule}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 p-10 rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 relative overflow-hidden text-center text-white shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
            <div className="relative z-10 space-y-6">
                <h2 className="text-3xl font-bold">Ready to make an impact?</h2>
                <p className="text-white/80 max-w-xl mx-auto">
                    By following these guidelines, you're not just teaching; you're building a foundation 
                    for your students' futures. We're here to support you every step of the way.
                </p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="px-8 py-3 bg-white text-orange-600 font-bold rounded-xl hover:scale-105 transition-transform shadow-2xl flex items-center gap-2 mx-auto">
                      <FileText size={18} />
                      View Complete Handbook
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl bg-white dark:bg-[#0d0d1a] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                        <BookOpen className="text-orange-500" />
                        Tutor Handbook v1.0
                      </DialogTitle>
                      <DialogDescription className="text-gray-500 dark:text-white/40">
                        Everything you need to know about tutoring at SkillBridge.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-8 py-6">
                      {handbookSections.map((section, idx) => (
                        <div key={idx} className="space-y-2">
                          <h4 className="text-orange-500 dark:text-orange-400 font-bold uppercase tracking-wider text-xs">Section {idx + 1}: {section.title}</h4>
                          <p className="text-gray-600 dark:text-white/70 leading-relaxed italic">
                            {section.content}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-white/5 gap-3">
                      <button className="px-4 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white text-sm transition-colors flex items-center gap-2">
                        <Download size={16} />
                        Download PDF
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
            </div>
        </div>
      </div>
    </div>
  );
}
