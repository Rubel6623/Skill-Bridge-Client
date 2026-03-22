"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { getUser, UserLogOut } from "@/services/auth";
import { useRouter } from "next/navigation";

export function Navbar() {

  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  console.log(user);

  const handleLogout = async () => {
    await UserLogOut();
    // window.location.replace("/");
    router.push("/login")
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const userData = await getUser();
      setUser(userData);
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide Navbar on the login page
  if (pathname === "/login") {
    return null;
  }

  return (
    <main className="pb-4">
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-8 h-16 flex items-center justify-between transition-all duration-300 ${scrolled ? "bg-gray-800/90 backdrop-blur border-b border-gray-700" : "bg-gray-800 "}`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div
            className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center font-bold text-lg text-white font-serif flex-shrink-0"
          >
            S
          </div>
          <span className="font-serif font-bold text-xl text-white tracking-tight">
            Skill<span className="text-blue-400">Bridge</span>
          </span>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className="lg:hidden text-gray-200 text-2xl"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex gap-8 items-center">
            {["Browse Tutors", "Categories", "How It Works", "Pricing"].map((item) => (
              <Link
                key={item}
                href={item === "Browse Tutors" ? "/tutors" : item === "Categories" ? "/categories" : item === "How It Works" ? "/how-it-works" : "/pricing"}
                className="text-gray-300 no-underline text-sm font-serif tracking-wide transition-colors duration-200 hover:text-white"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Right side: Auth */}
          <div className="flex gap-2 items-center">
            {user ? (
              <>
                <span className="text-gray-200 text-sm font-serif mr-2">
                  Hi, {user.name}
                </span>
                <Link
                  href="/dashboard/profile"
                  className="text-gray-300 no-underline text-sm font-serif px-4 py-2 rounded-lg border border-gray-600 transition-all duration-200 whitespace-nowrap hover:bg-gray-700"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 no-underline text-sm font-serif px-4 py-2 rounded-lg border border-gray-600 transition-all duration-200 whitespace-nowrap hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400"
                >
                  Logout
                </button>

              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 no-underline text-sm font-serif px-4 py-2 rounded-lg border border-gray-600 transition-all duration-200 whitespace-nowrap hover:bg-gray-700"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-white no-underline text-sm font-serif px-4 py-2 rounded-lg bg-blue-500 font-semibold shadow-md transition-all duration-200 whitespace-nowrap transform hover:translate-y-[-1px] hover:brightness-110"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav
            className="lg:hidden absolute top-16 left-0 w-full bg-gray-800 shadow-md flex flex-col items-center gap-4 py-4 z-40"
          >
            {["Browse Tutors", "Categories", "How It Works", "Pricing", "About Us"].map((item) => (
              <Link
                key={item}
                href={item === "Browse Tutors" ? "/tutors" : item === "Categories" ? "/categories" : item === "How It Works" ? "/how-it-works" : item === "Pricing" ? "/pricing" : "/about-us"}
                className="text-gray-300 no-underline text-sm font-serif tracking-wide transition-colors duration-200 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            ))}

            {/* Auth Links */}
            {user ? (
              <div className="flex flex-col items-center gap-4 w-full px-8">
                <div className="text-white font-serif text-sm bg-gray-700/50 w-full text-center py-2 rounded-lg border border-gray-600">
                  User: <span className="font-bold text-blue-400">{user?.name}</span>
                </div>
                <Link
                  href="/dashboard/profile"
                  className="w-full text-center text-gray-300 no-underline text-sm font-serif px-4 py-2 rounded-lg border border-gray-600 transition-all duration-200 hover:bg-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-white no-underline text-sm font-serif px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/50 font-semibold transition-all duration-200 transform hover:bg-red-500/30"
                >
                  Logout
                </button>

              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 w-full px-8">
                <Link
                  href="/login"
                  className="w-full text-center text-gray-300 no-underline text-sm font-serif px-4 py-2 rounded-lg border border-gray-600 transition-all duration-200 hover:bg-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center text-white no-underline text-sm font-serif px-4 py-2 rounded-lg bg-blue-500 font-semibold shadow-md transition-all duration-200 transform hover:translate-y-[-1px] hover:brightness-110"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        )}
      </header>
      
      <div className="h-16 " />
    </main>
  );
}
