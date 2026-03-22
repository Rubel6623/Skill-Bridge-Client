"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Mail, Lock, ArrowLeft, User, ShieldCheck } from "lucide-react";
import { registerUser } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  role: z.enum(["student", "tutor", "admin"]),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "student",
    }
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const res = await registerUser(data);

      if (res.success) {
        toast.success(res.message || "Registration successful");
        router.push("/login");
      } else {
        toast.error(res.message);
        setServerError(res.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      setServerError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white flex overflow-hidden">
      <Image
        src="https://img.freepik.com/free-vector/data-protection-background-vector-cyber-security-technology-purple-tone_53876-136341.jpg"
        alt="Background"
        fill
        priority
        className="object-cover"
      />
      {/* LEFT SIDE */}
      <div className="relative hidden lg:flex flex-1 items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
        <div className="relative z-10 max-w-md px-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <p className="text-lg leading-relaxed mb-6">
              "The beautiful thing about learning is that nobody can take it away from you."
            </p>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-xs font-bold">
                BB
              </div>
              <div>
                <p className="font-semibold text-sm">B.B. King</p>
                <p className="text-white/50 text-xs">Legendary Musician</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center px-6 relative py-12 overflow-y-auto">
        <Link
          href="/"
          className="hidden lg:flex fixed top-8 left-8 items-center gap-2 text-white hover:text-orange-400 text-sm transition"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>
        <Link
          href="/"
          className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-white/50 hover:text-orange-400 text-sm"
        >
          <ArrowLeft size={16} /> Back
        </Link>

        <div className="w-full max-w-md animate-fadeUp border-amber-400/20 border rounded-3xl p-8 bg-white/5 backdrop-blur-xl shadow-lg my-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-white/50 text-sm">Join SkillBridge to start your journey</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
             <div>
              <label className="block text-xs mb-2 text-white/50 font-medium">Full Name</label>
              <div className={`relative rounded-xl bg-white/5 border transition-all ${focusedField === "name" ? "border-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.1)]" : "border-white/10"}`}>
                <User size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${focusedField === "name" ? "text-orange-400" : "text-white/40"}`} />
                <input
                  {...register("name")}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-transparent outline-none py-3 pl-12 pr-4 text-sm placeholder:text-white/40"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs mb-2 text-white/50 font-medium">Email Address</label>
              <div className={`relative rounded-xl bg-white/5 border transition-all ${focusedField === "email" ? "border-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.1)]" : "border-white/10"}`}>
                <Mail size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${focusedField === "email" ? "text-orange-400" : "text-white/40"}`} />
                <input
                  {...register("email")}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-transparent outline-none py-3 pl-12 pr-4 text-sm placeholder:text-white/40"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs mb-2 text-white/50 font-medium">Password</label>
              <div className={`relative rounded-xl bg-white/5 border transition-all ${focusedField === "password" ? "border-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.1)]" : "border-white/10"}`}>
                <Lock size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${focusedField === "password" ? "text-orange-400" : "text-white/40"}`} />
                <input
                  {...register("password")}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none py-3 pl-12 pr-4 text-sm placeholder:text-white/40"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
            </div>
            
            {/* Role */}
             <div>
              <label className="block text-xs mb-2 text-white/50 font-medium">I am a</label>
              <div className={`relative rounded-xl bg-white/5 border transition-all ${focusedField === "role" ? "border-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.1)]" : "border-white/10"}`}>
                <ShieldCheck size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${focusedField === "role" ? "text-orange-400" : "text-white/40"}`} />
                <select
                  {...register("role")}
                  onFocus={() => setFocusedField("role")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent outline-none py-3 pl-12 pr-4 text-sm text-white focus:bg-[#1a1a24] appearance-none"
                >
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                </select>
              </div>
              {errors.role && <p className="text-red-500 text-xs mt-2">{errors.role.message}</p>}
            </div>

            {serverError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg p-3 text-center">
                {serverError}
              </div>
            )}

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 transition rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-60"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-white/50">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-400 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
