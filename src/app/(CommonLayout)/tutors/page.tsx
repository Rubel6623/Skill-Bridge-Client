"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Users, Search, GraduationCap, Filter, ArrowRight, Clock } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic"

// export const dynamic = "force-dynamic";

const TutorsPageContent = dynamic(() => import("./TutorsPageContent"), {
  ssr: false,
});

export default function TutorsPage() {
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1e293b] via-[#11181c] to-[#0f172a]">
    <Suspense
        fallback={
          <div className="min-h-screen flex flex-col items-center justify-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            <p className="ml-4 mt-4 font-serif">Loading expert tutors...</p>
          </div>
        }
      >
        <TutorsPageContent />
      </Suspense>
    </main>
  )
}
