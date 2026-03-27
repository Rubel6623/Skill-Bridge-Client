import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, BookOpen, User } from "lucide-react";

export const ServiceCard = ({ service }: { service: any }) => {
  const tutorName = service?.tutorProfile?.user?.name || "Unknown Tutor";
  const tutorAvatar = service?.tutorProfile?.user?.avatar || "https://github.com/shadcn.png";
  const price = service?.tutorProfile?.pricePerHour || 0;
  const rating = service?.tutorProfile?.rating || 0;
  const categoryName = service?.category?.name || "General";

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-white/10 bg-white/5 backdrop-blur-sm group">
      <div className="relative h-48 w-full overflow-hidden bg-gray-800">
        {/* Placeholder for service image/thumbnail based on category or default */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <Image
          src={service?.category?.thumbnail || "/placeholder.jpg"}
          alt={service?.title || categoryName}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop';
          }}
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="px-3 py-1 text-xs font-semibold bg-primary/90 text-primary-foreground rounded-full shadow-sm">
            {categoryName}
          </span>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold line-clamp-1">{service?.title || `${categoryName} Tutoring`}</CardTitle>
          <div className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-md">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
            <Image src={tutorAvatar} alt={tutorName} fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-200">{tutorName}</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <User className="w-3 h-3" /> Experienced Tutor
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pb-2 border-b border-white/10">
          <div className="flex flex-col">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Price</p>
            <p className="text-lg font-bold text-primary">${price}<span className="text-sm text-gray-400 font-normal">/hr</span></p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Duration</p>
            <p className="text-sm font-medium text-gray-200 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 60m
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Link href={`/services/${service?.id || service?._id}`} className="w-full">
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90 transition-colors">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
