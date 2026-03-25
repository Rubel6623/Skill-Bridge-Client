import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroCarousel } from "../modules/home/Hero";

export const HeroSection = () => {
  const [searchVal, setSearchVal] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (!searchVal.trim()) return;
    router.push(`/tutors?query=${encodeURIComponent(searchVal.trim())}`);
  };

  const handlePopularSearch = (tag: string) => {
    router.push(`/tutors?query=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-24 bg-gradient-to-br from-[#1e293b] via-[#11181c] to-[#0f172a]">

      {/* Ambient Glow Background */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-orange-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-6xl w-full px-6 animate-fadeUp">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-400 text-xs tracking-wide">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          800+ Expert Tutors Available Now
        </div>

        {/* Heading */}
        <h1 className="font-serif text-white font-bold leading-tight mb-6 text-4xl md:text-6xl lg:text-7xl tracking-tight">
          Learn Anything from{" "}
          <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            World-Class
          </span>{" "}
          Tutors
        </h1>

        {/* Description */}
        <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-serif">
          Connect with verified expert tutors for personalized one-on-one sessions.
          Book instantly and learn at your own pace.
        </p>

        {/* Search Bar */}
        <div
          className={`flex max-w-xl mx-auto mb-10 rounded-xl backdrop-blur-lg transition-all duration-300
          ${focused
              ? "border border-orange-500/60 shadow-[0_0_0_4px_rgba(249,115,22,0.1)]"
              : "border border-white/10"}
          bg-white/5`}
        >
          <span className="flex items-center px-4 text-white/40 text-lg">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search by subject, tutor name..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 py-4 text-sm font-serif"
          />

          <button 
            onClick={handleSearch}
            className="px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm hover:opacity-90 transition"
          >
            Search
          </button>
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <span className="text-white/40 text-xs font-serif self-center">
            Popular:
          </span>

          {["Mathematics", "Physics", "Python", "English", "SAT Prep"].map((t) => (
            <button
              key={t}
              onClick={() => handlePopularSearch(t)}
              className="px-4 py-1 text-xs rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-orange-500/15 hover:border-orange-500/40 hover:text-orange-400 transition"
            >
              {t}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="mt-8">
          <HeroCarousel />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 text-xs tracking-widest animate-bounce">
        <span>SCROLL</span>
        <span className="text-lg">↓</span>
      </div>
    </section>
  );
};