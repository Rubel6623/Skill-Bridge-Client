"use client";

import { HeroSection } from "@/components/ui/HeroSection";
import { HomeServices } from "@/components/modules/home/Hero";
import { HomeCategories } from "@/components/modules/home/HomeCategories";
import { HomeTutors } from "@/components/modules/home/HomeTutors";
import { HomeAbout } from "@/components/modules/home/HomeAbout";

export default function Home() {
  return (
    <main className="" style={{ background: "#0a0a14" }}>          
      <HeroSection />
      <HomeCategories />
      <HomeServices />
      <HomeTutors />
      <HomeAbout />
    </main>
  );
}
