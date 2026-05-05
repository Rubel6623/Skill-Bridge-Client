"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`
        relative w-9 h-9 rounded-xl flex items-center justify-center
        border transition-all duration-300
        ${isDark
          ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-orange-400"
          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100 hover:text-orange-500 shadow-sm"
        }
      `}
    >
      {isDark ? (
        <Sun size={16} className="transition-transform duration-300 rotate-0 hover:rotate-12" />
      ) : (
        <Moon size={16} className="transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}
