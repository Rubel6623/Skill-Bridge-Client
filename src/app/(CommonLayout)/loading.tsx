"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center p-6 space-y-12 bg-transparent relative overflow-hidden">
      {/* Background Cinematic Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none animate-pulse [animation-delay:1s]" />

      <div className="relative group">
        {/* Orbital Rings - Elegant CSS animations */}
        <div className="absolute -inset-10 border border-orange-500/10 rounded-full animate-[spin_8s_linear_infinite]" />
        <div className="absolute -inset-8 border border-white/5 rounded-full animate-[spin_12s_linear_infinite_reverse]" />
        
        {/* Main Spinner */}
        <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center">
          <div className="absolute inset-0 border-t-2 border-l-2 border-orange-500/80 rounded-full animate-spin shadow-[0_0_15px_rgba(249,115,22,0.4)]" />
          <div className="absolute inset-4 border-b-2 border-r-2 border-zinc-800 rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
          
          {/* Logo or Brand Element in Center */}
          <div className="text-orange-500 font-black text-2xl tracking-tighter drop-shadow-lg select-none animate-sbPulse">
            SB
          </div>
        </div>
      </div>

      <div className="text-center space-y-3 relative z-10">
        <h2 className="text-sm md:text-base font-black uppercase tracking-[0.5em] text-zinc-400">
           Stabilizing Hub Link
        </h2>
        
        <div className="flex gap-2 justify-center items-center">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
