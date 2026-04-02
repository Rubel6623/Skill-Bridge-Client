"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, LayoutDashboard, Terminal } from "lucide-react";
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
    console.error("DASHBOARD CRITICAL ERROR:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 bg-transparent text-white relative overflow-hidden font-mono translate-y-[-5%]">
      {/* Cinematic Pulse Background Layer */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none animate-pulse [animation-delay:1.5s]" />
      </div>

      {/* Hero Visual Unit */}
      <div className="relative mb-14 group scale-90">
        <div className="absolute -inset-10 border border-red-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute -inset-8 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        
        <div className="relative bg-zinc-900 border border-red-500/50 p-6 rounded-3xl shadow-2xl shadow-red-500/20">
          <div className="relative">
             <AlertCircle className="w-14 h-14 text-red-500 animate-bounce" />
             <div className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full animate-ping" />
          </div>
        </div>
      </div>

      {/* Message and Context */}
      <div className="max-w-xl text-center space-y-6 relative z-10">
        <div className="space-y-3">
           <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white/90">
             Dashboard Hub <span className="text-red-500">De-Synchronized</span>
           </h1>
           <div className="flex justify-center gap-2 items-center opacity-30 select-none">
             <Terminal size={12} className="text-zinc-500" />
             <p className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500">HUB Segment: Secure Dashboard</p>
           </div>
        </div>
        
        <p className="text-zinc-500 font-medium leading-relaxed italic text-xs md:text-sm max-w-md mx-auto">
          "The secure hub encountered a data stream interruption. Attempting automated re-sync protocol is recommended."
        </p>

        {/* Technical Logs Reveal (Styled as a code block) - Compact for dashboard */}
        <div className="bg-zinc-950/80 border border-zinc-800 p-5 rounded-2xl font-mono text-left space-y-2 group/log max-w-lg mx-auto shadow-inner relative overflow-hidden backdrop-blur-md">
           <div className="absolute top-0 left-0 w-1 h-full bg-red-500/30 group-hover/log:bg-red-500/80 transition-all duration-500" />
           <p className="text-xs text-red-400 font-bold uppercase tracking-widest flex items-center gap-2">
             Diagnostic Log
           </p>
           <div className="h-px bg-zinc-800 w-full mb-2" />
           <p className="text-[10px] text-zinc-300 leading-relaxed font-mono line-clamp-2">
             {error.message || "An unexpected error occurred during dashboard data retrieval."}
           </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
          <Button
            onClick={() => reset()}
            className="bg-orange-600 hover:bg-orange-700 text-white font-black px-10 py-6 rounded-2xl flex items-center gap-3 transition-all hover:scale-105 shadow-[0_20px_50px_rgba(234,88,12,0.3)] uppercase tracking-[0.2em] text-xs"
          >
            <RefreshCcw size={18} /> 
            Hub Reset
          </Button>
          
          <Link href="/dashboard">
            <button className="flex items-center gap-2 text-zinc-500 hover:text-white font-black uppercase tracking-[0.2em] text-[10px] transition-all group">
              <LayoutDashboard size={16} /> 
              Core Terminal
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
