"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home, Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for diagnostics
    console.error("CRITICAL ERROR DETECTED:", error);
  }, [error]);

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-8 bg-transparent text-white relative overflow-hidden font-mono">
      {/* Cinematic Pulse Background Layer */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none animate-pulse [animation-delay:1.5s]" />
      </div>

      {/* Hero Visual Unit */}
      <div className="relative mb-14 group">
        <div className="absolute -inset-10 border border-red-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute -inset-8 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        
        <div className="relative bg-zinc-900 border border-red-500/50 p-8 rounded-3xl shadow-2xl shadow-red-500/20">
          <div className="relative">
             <AlertCircle className="w-20 h-20 text-red-500 animate-bounce" />
             <div className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full animate-ping" />
          </div>
        </div>
      </div>

      {/* Message and Context */}
      <div className="max-w-xl text-center space-y-8 relative z-10">
        <div className="space-y-4">
           <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
             System <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all group-hover:scale-105">Compromised</span>
           </h1>
           <div className="flex justify-center gap-2 items-center opacity-30 select-none">
             <Terminal size={14} className="text-zinc-500" />
             <p className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500">Operation Sync: Critical Failure</p>
           </div>
        </div>
        
        <p className="text-zinc-500 font-medium leading-relaxed italic text-sm md:text-base max-w-md mx-auto">
          "The SkillBridge core encountered an unexpected runtime anomaly. Our automated protocols were triggered to prevent further data loss."
        </p>

        {/* Technical Logs Reveal (Styled as a code block) */}
        <div className="bg-zinc-950/80 border border-zinc-800 p-6 rounded-2xl font-mono text-left space-y-2 group/log max-w-lg mx-auto shadow-inner relative overflow-hidden backdrop-blur-md">
           <div className="absolute top-0 left-0 w-1 h-full bg-red-500/30 group-hover/log:bg-red-500/80 transition-all duration-500" />
           <p className="text-xs text-red-400 font-bold uppercase tracking-widest flex items-center gap-2">
             <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" /> Diagnostic Output
           </p>
           <div className="h-px bg-zinc-800 w-full mb-3" />
           <p className="text-[10px] text-zinc-400 leading-relaxed break-all font-bold opacity-60">
             SYNC_ID: <span className="text-zinc-200">{error.digest || `REF_${Math.random().toString(36).substring(7).toUpperCase()}`}</span>
           </p>
           <p className="text-[11px] text-zinc-300 leading-relaxed font-mono">
             {error.message || "An unexpected error occurred. No further stack trace available in secure mode."}
           </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 pb-20">
          <Button
            onClick={() => reset()}
            className="bg-orange-600 hover:bg-orange-700 text-white font-black px-12 py-8 rounded-2xl flex items-center gap-4 transition-all hover:scale-105 shadow-[0_20px_50px_rgba(234,88,12,0.3)] uppercase tracking-[0.2em] text-xs"
          >
            <RefreshCcw size={20} className="transition-transform group-hover:rotate-180 duration-700" /> 
            Initiate Forced Re-Sync
          </Button>
          
          <Link href="/">
            <button className="flex items-center gap-3 text-zinc-500 hover:text-white font-black uppercase tracking-[0.2em] text-[10px] transition-all group">
              <Home size={18} className="group-hover:scale-125 transition-transform" /> 
              Return to Core Terminal
            </button>
          </Link>
        </div>
      </div>

      {/* Decorative Branding */}
      <div className="absolute bottom-10 left-10 hidden lg:block opacity-20">
         <p className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-400">Hub Status: De-Synchronized</p>
         <p className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500 mt-1">SkillBridge v3.1.5</p>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block opacity-20 text-right">
         <p className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-400">Emergency Protocol Active</p>
         <p className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500 mt-1">Manual Intervention Required</p>
      </div>
    </div>
  );
}
