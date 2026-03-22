"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { createTutorProfile } from "@/services/tutor";
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

export default function CreateProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const {
    register,
    control,
    handleSubmit,
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
    const fetchCategories = async () => {
      const res = await getCategories();
      if(res?.success){
        setCategories(res.data);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);

    try {
      const res = await createTutorProfile(data);

      if (res.success) {
        toast.success(res.message || "Profile created successfully");
        router.push("/dashboard");
      } else {
        toast.error(res.message || "Failed to create profile");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Create Tutor Profile</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Bio</label>
            <textarea
              {...register("bio")}
              rows={4}
              placeholder="Tell students about yourself, your teaching style, and why they should choose you..."
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            />
            {errors.bio && <p className="text-red-500 text-xs mt-2">{errors.bio.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Per Hour */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Hourly Rate ($)</label>
              <input
                {...register("pricePerHour", { valueAsNumber: true })}
                type="number"
                min="1"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition text-zinc-900 dark:text-zinc-100"
              />
              {errors.pricePerHour && <p className="text-red-500 text-xs mt-2">{errors.pricePerHour.message}</p>}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Years of Experience</label>
              <input
                {...register("experience", { valueAsNumber: true })}
                type="number"
                min="0"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition text-zinc-900 dark:text-zinc-100"
              />
              {errors.experience && <p className="text-red-500 text-xs mt-2">{errors.experience.message}</p>}
            </div>
          </div>

          {/* Subjects */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Subjects You Teach</label>
              <button
                type="button"
                onClick={() => append({ categoryId: "", title: "" })}
                className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400"
              >
                <Plus size={16} /> Add Subject
              </button>
            </div>
            
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
                  <div className="flex-1 space-y-4">
                    <div>
                      <select
                        {...register(`subjects.${index}.categoryId`)}
                        className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat: any) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                      {errors.subjects?.[index]?.categoryId && <p className="text-red-500 text-xs mt-1">{errors.subjects[index].categoryId.message}</p>}
                    </div>
                    <div>
                      <input
                        {...register(`subjects.${index}.title`)}
                        type="text"
                        placeholder="Specific topic (e.g. Advanced Calculus)"
                        className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100"
                      />
                      {errors.subjects?.[index]?.title && <p className="text-red-500 text-xs mt-1">{errors.subjects[index].title.message}</p>}
                    </div>
                  </div>
                  
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-zinc-400 hover:text-red-500 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.subjects?.root && <p className="text-red-500 text-xs mt-2">{errors.subjects.root.message}</p>}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition text-white rounded-xl py-3 font-semibold disabled:opacity-60 flex justify-center items-center"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
