"use client";

import Link from "next/link";
import { MoveLeft, HelpCircle, Compass, Home } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-mono">
      {/* Background Cinematic Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      
      {/* 404 Glitch Text */}
      <div className="relative group mb-12">
        <h1 className="text-[12rem] md:text-[20rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
           <p className="text-3xl md:text-5xl font-black uppercase tracking-[0.5em] text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.5)]">
             Lost in Orbit
           </p>
        </div>
      </div>

      {/* Message & Navigation */}
      <div className="max-w-2xl text-center space-y-8 relative z-10">
        <div className="flex justify-center gap-4 mb-4">
           <Compass className="w-12 h-12 text-zinc-700 animate-[spin_8s_linear_infinite]" />
           <HelpCircle className="w-12 h-12 text-zinc-700 animate-bounce" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-zinc-400">
           The Subject You're Seeking <br /> Does Not Exist in This Hub.
        </h2>
        
        <p className="text-zinc-600 font-medium leading-relaxed max-w-lg mx-auto italic">
          "The most beautiful thing about learning is that nobody can take it away from you... unless the link is broken." 
          - Operational Error Log #404
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-8 rounded-2xl flex items-center gap-3 transition-all hover:scale-105 shadow-[0_20px_50px_rgba(249,115,22,0.3)] uppercase tracking-widest text-xs">
              <Home size={20} /> Return to Core
            </Button>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-zinc-500 hover:text-white font-black uppercase tracking-widest text-[10px] transition-all group"
          >
            <MoveLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Revert to Last Sync
          </button>
        </div>
      </div>

      {/* Operational Decor */}
      <div className="absolute bottom-10 left-10 hidden md:block opacity-20">
         <p className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500">Status: Connection Severed</p>
         <p className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500 mt-1">Coordinate: Unknown Sector</p>
      </div>

      <div className="absolute bottom-10 right-10 hidden md:block opacity-20 text-right">
         <p className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500">SkillBridge Operation Hub</p>
         <p className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500 mt-1">v3.1.5 OPERATOR NOT FOUND</p>
      </div>
    </div>
  );
}
