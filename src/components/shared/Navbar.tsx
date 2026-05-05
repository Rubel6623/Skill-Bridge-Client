"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { getUser, UserLogOut } from "../../services/auth";
import { useRouter } from "next/navigation";
import logo from "../../../public/logo.png";
import { ThemeToggle } from "./ThemeToggle";

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

  const publicRoutes = [
    { name: "Tutors", href: "/tutors" },
    { name: "Categories", href: "/categories" },
    { name: "Pricing", href: "/pricing" },
    { name: "Careers", href: "/careers" },
  ];

  const loggedInRoutes = [
    ...publicRoutes,
    { name: "Guidelines", href: "/tutor-guidelines" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const routes = user ? loggedInRoutes : publicRoutes;

  return (
    <main className="pb-4">
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-8 h-16 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-gray-800/90 dark:bg-gray-800/90 backdrop-blur border-b border-gray-700 dark:border-gray-700 light:bg-white/90 light:border-gray-200"
            : "bg-gray-800 dark:bg-gray-800"
        } dark:bg-gray-800 bg-white/95 border-b border-gray-100 dark:border-transparent`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
        <Image src={logo} alt="S" width={70} height={70} />
          {/* <div
            className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center font-bold text-lg text-white font-serif flex-shrink-0"
          >
            S          
          </div> */}
          <span className="font-serif font-bold text-xl dark:text-white text-gray-900 tracking-tight">
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
            {routes.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="dark:text-gray-300 text-gray-600 no-underline text-sm font-serif tracking-wide transition-colors duration-200 dark:hover:text-white hover:text-orange-500"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side: Auth + Theme Toggle */}
          <div className="flex gap-4 items-center">
            <ThemeToggle />
            {user ? (
              <div className="relative group">
                <button
                  className="flex items-center gap-3 p-1 rounded-full hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10"
                >
                  <div className="flex flex-col items-end text-right">
                    <span className="text-white text-xs font-bold tracking-tight leading-none mb-1 capitalize">
                      {user.name}
                    </span>
                    <span className="text-gray-400 text-[10px] leading-none uppercase tracking-widest font-medium">
                      {user.role}
                    </span>
                  </div>
                  
                  <div className="relative h-9 w-9 rounded-full overflow-hidden ring-2 ring-orange-500/20 group-hover:ring-orange-500/50 transition-all">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </button>

                {/* Advanced Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl bg-[#0d0d1a] border border-white/10 shadow-2xl backdrop-blur-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 z-50">
                  <div className="p-4 border-b border-white/5">
                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  
                  <div className="p-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </div>
                      Dashboard
                    </Link>
                    
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      My Profile
                    </Link>
                    
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      Settings
                    </Link>
                  </div>
                  
                  <div className="p-2 border-t border-white/5">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-xl transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="dark:text-gray-300 text-gray-600 no-underline text-sm font-serif px-4 py-2 rounded-lg border dark:border-gray-600 border-gray-300 transition-all duration-200 dark:hover:bg-gray-700 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-white no-underline text-sm font-serif px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold shadow-md transition-all duration-200 whitespace-nowrap transform hover:translate-y-[-1px]"
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
            className="lg:hidden absolute top-16 left-0 w-full dark:bg-gray-800 bg-white shadow-md flex flex-col items-center gap-4 py-4 z-40 border-t dark:border-gray-700 border-gray-100"
          >
            {/* Theme Toggle Row */}
            <div className="flex items-center justify-between w-full px-8 py-1">
              <span className="text-sm font-bold dark:text-gray-400 text-gray-500 uppercase tracking-widest text-[10px]">Theme</span>
              <ThemeToggle />
            </div>
            {routes.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 no-underline text-sm font-serif tracking-wide transition-colors duration-200 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Auth Links */}
            {user ? (
              <div className="w-full px-6 space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-orange-500/20">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{user.name}</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 bg-white/5 rounded-xl border border-white/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 bg-white/5 rounded-xl border border-white/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 bg-white/5 rounded-xl border border-white/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 bg-red-500/5 rounded-xl border border-red-500/10 font-semibold"
                  >
                    Logout
                  </button>
                </div>
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
