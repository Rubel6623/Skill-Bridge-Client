import Image from "next/image";
import { Star, Clock, Video, GraduationCap, MapPin, CheckCircle2 } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";

export const ServiceDetails = ({ service }: { service: any }) => {
  const tutorName = service?.tutorProfile?.user?.name || "Unknown Tutor";
  const tutorAvatar = service?.tutorProfile?.user?.avatar || "https://github.com/shadcn.png";
  const rating = service?.tutorProfile?.rating || 0;
  const bio = service?.tutorProfile?.bio || "No biography provided.";
  const experience = service?.tutorProfile?.experience || 0;
  const categoryName = service?.category?.name || "General Subject";

  return (
    <div className="flex flex-col gap-8 flex-1">
      <div className="space-y-6">
        <div>
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/50 text-sm py-1 px-3 hover:bg-primary/30">{categoryName}</Badge>
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight mb-3">
            {service?.title || `${categoryName} Tutoring Sessions`}
          </h1>
          <p className="text-lg text-gray-400">Master {categoryName} with expert guidance and personalized lesson plans tailored to your goals.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
          <div className="flex items-center gap-1.5 text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-full shadow-sm">
            <Star className="w-4 h-4 fill-current" />
            <span>{rating.toFixed(1)} Rating</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1.5 rounded-full shadow-sm">
            <Clock className="w-4 h-4" />
            <span>60 Min Session</span>
          </div>
          <div className="flex items-center gap-1.5 text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1.5 rounded-full shadow-sm">
            <Video className="w-4 h-4" />
            <span>Online Meeting</span>
          </div>
        </div>

        <Separator className="bg-white/10 block my-8" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-white/5 backdrop-blur-md hover:border-white/10 transition-colors">
          <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
            <Image src={tutorAvatar} alt={tutorName} fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-2">{tutorName}</h3>
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-sm font-medium text-gray-400">
              <span className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-md">
                <GraduationCap className="w-4 h-4 text-primary" /> {experience} Years Experience
              </span>
              <span className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-md">
                <MapPin className="w-4 h-4 text-primary" /> Remote Worldwide
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full block"></span>
            About the Tutor
          </h2>
          <div className="text-gray-300 leading-relaxed bg-white/[0.03] p-6 rounded-2xl border border-white/5 font-medium">
            {bio}
          </div>
        </div>

        <div className="pt-4">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
           <span className="w-1.5 h-6 bg-primary rounded-full block"></span>
           What you'll learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Fundamentals and advanced concepts",
              "Practical problem-solving skills",
              "Exam prep & study techniques",
              "Personalized learning path",
              "Real-world applications",
              "Interactive Q&A sessions"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/[0.02] p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-all hover:bg-white/[0.04]">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 drop-shadow-sm" />
                <span className="text-sm font-medium text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
