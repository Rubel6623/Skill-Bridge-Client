"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, User, Camera } from "lucide-react";
import { updateProfile, getMe } from "../../../services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  avatar: z.string().url().optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileUpdateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      avatar: "",
    }
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getMe();
      if (res.success) {
        setUser(res.data);
        reset({
          name: res.data.name,
          avatar: res.data.avatar || "",
        });
      }
      setIsFetching(false);
    };
    fetchUser();
  }, [reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      const res = await updateProfile(data);
      if (res.success) {
        toast.success("Profile updated successfully");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Update Profile</h1>
            <p className="text-sm text-zinc-500">Manage your account information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-zinc-100 dark:border-zinc-800 relative bg-zinc-200 dark:bg-zinc-800">
                {user?.avatar ? (
                  <Image fill src={user.avatar} alt="Avatar" className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400">
                    <User size={40} />
                  </div>
                )}
              </div>
              <button type="button" className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full shadow-lg hover:bg-orange-600 transition">
                <Camera size={16} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 font-serif">Full Name</label>
            <input
              {...register("name")}
              type="text"
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition text-zinc-900 dark:text-zinc-100"
            />
            {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 font-serif">Avatar URL</label>
            <input
              {...register("avatar")}
              type="text"
              placeholder="https://example.com/avatar.jpg"
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition text-zinc-900 dark:text-zinc-100 font-mono text-sm"
            />
            {errors.avatar && <p className="text-red-500 text-xs mt-2">{errors.avatar.message}</p>}
          </div>

          <div className="pt-4">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold py-4 rounded-xl transition-all shadow-xl hover:-translate-y-1 disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
