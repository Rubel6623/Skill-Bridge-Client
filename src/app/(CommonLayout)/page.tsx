"use client";

import { HeroSection } from "../../components/ui/HeroSection";
import { HomeServices } from "../../components/modules/home/Hero";
import { HomeCategories } from "../../components/modules/home/HomeCategories";
import { HomeTutors } from "../../components/modules/home/HomeTutors";
import { HomeAbout } from "../../components/modules/home/HomeAbout";
import { HomeStats } from "../../components/modules/home/HomeStats";
import { HomeTestimonials } from "../../components/modules/home/HomeTestimonials";
import { HomeFAQ } from "../../components/modules/home/HomeFAQ";


export default function Home() {
  return (
    <main className="w-full mx-auto bg-white dark:bg-gray-900">          
      <HeroSection />
      <HomeCategories />
      <HomeStats />
      <HomeServices />
      <HomeTutors />
      <HomeTestimonials />
      <HomeAbout />
      <HomeFAQ />
    </main>
  );
}
