"use client";

import { useState } from "react";
import { signInWithPopup, AuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../../../lib/firebase";
import { socialLogin } from "../../../services/auth";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { Loader2 } from "lucide-react";

export default function SocialLoginButtons() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSocialLogin = async (provider: AuthProvider, providerName: string) => {
    setIsLoading(providerName);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email) {
        const res = await socialLogin({
          email: user.email,
          name: user.displayName || "User",
          avatar: user.photoURL || undefined,
        });

        if (res.success) {
          toast.success(res.message);
          const redirect = searchParams.get("redirect") || "/";
          router.push(redirect);
        } else {
          toast.error(res.message);
        }
      } else {
        toast.error("Could not retrieve email from your social account. Please try another method.");
      }
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Login cancelled. Please complete the sign-in in the popup window.");
      } else if (error.code === "auth/operation-not-allowed") {
        console.error("Social Login Error:", error);
        toast.error("Social login is not enabled. Please contact support.");
      } else if (error.code === "auth/account-exists-with-different-credential") {
        toast.error("An account already exists with this email using a different login method.");
      } else {
        console.error("Social Login Error:", error);
        toast.error(error.message || "Social login failed. Please try again.");
      }
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#12121f]/80 backdrop-blur-md px-4 py-1 rounded-full border border-white/5 text-white/40 shadow-sm">
            Or continue with
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => handleSocialLogin(googleProvider, "google")}
          disabled={!!isLoading}
          type="button"
          className="w-full flex items-center justify-center gap-3 rounded-xl bg-white/5 border border-white/10 py-3 px-4 hover:bg-white/10 transition-all hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] disabled:opacity-50"
        >
          {isLoading === "google" ? (
            <Loader2 size={20} className="animate-spin text-orange-500" />
          ) : (
            <>
              <FaGoogle className="text-red-500 text-lg" />
              <span className="text-sm font-semibold text-white/90">Sign in with Google</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
