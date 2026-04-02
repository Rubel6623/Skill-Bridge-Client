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
    console.error("COMMON LAYOUT ERROR:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-transparent text-white relative overflow-hidden font-mono">
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
             <AlertCircle className="w-16 h-16 text-red-500 animate-bounce" />
             <div className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full animate-ping" />
          </div>
        </div>
      </div>

      {/* Message and Context */}
      <div className="max-w-xl text-center space-y-8 relative z-10">
        <div className="space-y-4">
           <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white/90">
             Synchronization <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">Failed</span>
           </h1>
           <div className="flex justify-center gap-2 items-center opacity-30 select-none">
             <Terminal size={14} className="text-zinc-500" />
             <p className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500">Hub Segment: Common Interface</p>
           </div>
        </div>
        
        <p className="text-zinc-500 font-medium leading-relaxed italic text-sm md:text-base max-w-md mx-auto">
          "The SkillBridge common interface encountered a runtime exception. This segment has been temporarily de-synchronized."
        </p>

        {/* Technical Logs Reveal (Styled as a code block) */}
        <div className="bg-zinc-950/80 border border-zinc-800 p-6 rounded-2xl font-mono text-left space-y-2 group/log max-w-lg mx-auto shadow-inner relative overflow-hidden backdrop-blur-md">
           <div className="absolute top-0 left-0 w-1 h-full bg-red-500/30 group-hover/log:bg-red-500/80 transition-all duration-500" />
           <p className="text-xs text-red-400 font-bold uppercase tracking-widest flex items-center gap-2">
             Diagnostic Summary
           </p>
           <div className="h-px bg-zinc-800 w-full mb-3" />
           <p className="text-[11px] text-zinc-300 leading-relaxed font-mono">
             {error.message || "An unexpected error occurred. No further stack trace available in secure mode."}
           </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
          <Button
            onClick={() => reset()}
            className="bg-orange-600 hover:bg-orange-700 text-white font-black px-12 py-8 rounded-2xl flex items-center gap-4 transition-all hover:scale-105 shadow-[0_20px_50px_rgba(234,88,12,0.3)] uppercase tracking-[0.2em] text-xs"
          >
            <RefreshCcw size={18} /> 
            Forced Hub Re-Sync
          </Button>
          
          <Link href="/">
            <button className="flex items-center gap-3 text-zinc-500 hover:text-white font-black uppercase tracking-[0.2em] text-[10px] transition-all group">
              <Home size={16} /> 
              Core Terminal
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
