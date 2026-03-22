import CreateProfileForm from "@/components/modules/tutor/profile/CreateProfileForm";
import ProfileUpdateForm from "@/components/modules/profile/ProfileUpdateForm";

export default function TutorProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <ProfileUpdateForm />
      <hr className="border-zinc-200 dark:border-zinc-800" />
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Tutor Settings</h2>
        <CreateProfileForm />
      </div>
    </div>
  );
}

