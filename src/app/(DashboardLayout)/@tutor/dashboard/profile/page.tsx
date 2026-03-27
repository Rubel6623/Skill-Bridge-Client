import TutorProfileForm from "../../../../../components/modules/tutor/profile/TutorProfileForm";
import ProfileUpdateForm from "../../../../../components/modules/profile/ProfileUpdateForm";

export default function TutorProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <ProfileUpdateForm />
      <div className="max-w-4xl mx-auto">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-zinc-100 dark:via-zinc-800 to-transparent" />
      </div>
      <TutorProfileForm />
    </div>
  );
}

