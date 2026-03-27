import ProfileUpdateForm from "../../../../../components/modules/profile/ProfileUpdateForm";

export default function AdminProfilePage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Admin <span className="text-orange-500">Identity</span></h1>
          <p className="text-zinc-500 mt-2 font-medium italic">Manage your administrative credentials and presentation.</p>
        </div>
        <ProfileUpdateForm />
      </div>
    </div>
  );
}
