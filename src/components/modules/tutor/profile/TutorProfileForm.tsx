"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Plus, Trash2, GraduationCap, Briefcase, DollarSign, TextQuote, Save } from "lucide-react";
import { createTutorProfile, updateTutorProfile, getMyProfile } from "@/services/tutor";
import { getCategories } from "@/services/category";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
  bio: z.string().min(10, { message: "Bio must be at least 10 characters long" }),
  pricePerHour: z.number().positive({ message: "Price must be positive" }),
  experience: z.number().int().nonnegative({ message: "Experience must be nonnegative" }),
  subjects: z.array(
    z.object({
      categoryId: z.string().min(1, { message: "Category is required" }),
      title: z.string().min(1, { message: "Title is required" })
    })
  ).min(1, { message: "At least one subject is required" })
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function TutorProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: "",
      pricePerHour: 10,
      experience: 1,
      subjects: [{ categoryId: "", title: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects"
  });

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, profileRes] = await Promise.all([
          getCategories(),
          getMyProfile()
        ]);

        if (catRes?.success) setCategories(catRes.data);
        
        if (profileRes?.success && profileRes.data) {
          setIsUpdate(true);
          const p = profileRes.data;
          reset({
            bio: p.bio,
            pricePerHour: p.pricePerHour,
            experience: p.experience,
            subjects: p.subjects?.map((s: any) => ({
              categoryId: s.categoryId,
              title: s.title
            })) || [{ categoryId: "", title: "" }]
          });
        }
      } catch (error) {
        console.error("Fetch data error:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);

    try {
      const res = isUpdate ? await updateTutorProfile(data) : await createTutorProfile(data);

      if (res.success) {
        toast.success(res.message || (isUpdate ? "Expertise updated!" : "Profile established!"));
        router.refresh();
      } else {
        toast.error(res.message || "Operation failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="animate-spin text-orange-500" size={40} />
        <p className="text-sm font-black text-zinc-400 uppercase tracking-widest">Hydrating Profile Metadata...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-zinc-950 border-2 border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl -mr-20 -mt-20" />
        
        <div className="flex items-center gap-4 mb-10">
           <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
              <GraduationCap size={32} />
           </div>
           <div>
              <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                {isUpdate ? "Elite Expertise" : "Claim Your Desk"}
              </h1>
              <p className="text-zinc-400 font-bold text-sm tracking-tight italic">
                {isUpdate ? "Polish your presentation for prospective students." : "Join the ranks of world-class mentors."}
              </p>
           </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Bio */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
               <TextQuote size={14} className="text-orange-500" /> Professional Narrative
            </label>
            <textarea
              {...register("bio")}
              rows={5}
              placeholder="Craft your teaching statement..."
              className="w-full bg-zinc-50 dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-[1.5rem] px-6 py-5 outline-none focus:border-orange-500 transition text-zinc-900 dark:text-zinc-100 font-medium leading-relaxed"
            />
            {errors.bio && <p className="text-red-500 text-xs mt-2 font-bold px-2">{errors.bio.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Price Per Hour */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                 <DollarSign size={14} className="text-orange-500" /> Hourly Valuation
              </label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 font-black text-xl">$</span>
                <input
                  {...register("pricePerHour", { valueAsNumber: true })}
                  type="number"
                  min="1"
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-[1.5rem] pl-12 pr-6 py-5 outline-none focus:border-orange-500 transition text-zinc-900 dark:text-zinc-100 font-black text-xl"
                />
              </div>
              {errors.pricePerHour && <p className="text-red-500 text-xs mt-2 font-bold px-2">{errors.pricePerHour.message}</p>}
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                 <Briefcase size={14} className="text-orange-500" /> Tenure (Years)
              </label>
              <input
                {...register("experience", { valueAsNumber: true })}
                type="number"
                min="0"
                className="w-full bg-zinc-50 dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-[1.5rem] px-6 py-5 outline-none focus:border-orange-500 transition text-zinc-900 dark:text-zinc-100 font-black text-xl"
              />
              {errors.experience && <p className="text-red-500 text-xs mt-2 font-bold px-2">{errors.experience.message}</p>}
            </div>
          </div>

          {/* Subjects */}
          <div className="space-y-6 bg-zinc-50 dark:bg-zinc-900 px-8 py-8 rounded-[2rem] border-2 border-zinc-100 dark:border-zinc-800">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 font-serif mb-0">Domain Expertise</label>
              <button
                type="button"
                onClick={() => append({ categoryId: "", title: "" })}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-500 hover:text-orange-600 bg-white dark:bg-zinc-950 px-4 py-2 rounded-full border border-orange-200 dark:border-orange-900/50 shadow-sm transition-all hover:scale-105"
              >
                <Plus size={14} /> Add Subject
              </button>
            </div>
            
            <div className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="group flex gap-4 items-start animate-fadeDown">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select
                      {...register(`subjects.${index}.categoryId`)}
                      className="w-full bg-white dark:bg-zinc-950 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100 shadow-sm"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat: any) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                    <input
                      {...register(`subjects.${index}.title`)}
                      type="text"
                      placeholder="Specialization (e.g. Quantum Mechanics)"
                      className="w-full bg-white dark:bg-zinc-950 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100 shadow-sm"
                    />
                  </div>
                  
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-4 text-zinc-300 hover:text-red-500 transition-colors bg-white dark:bg-zinc-950 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 hover:border-red-500/20"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition-all text-white rounded-[1.5rem] py-6 font-black uppercase tracking-[0.3em] text-xs disabled:opacity-60 flex justify-center items-center gap-3 shadow-[0_20px_40px_rgba(249,115,22,0.3)] hover:-translate-y-1 active:translate-y-0.5"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <Save size={18} />
                {isUpdate ? "Confirm Expertise Upgrade" : "Initialize Mentorship Registry"}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
