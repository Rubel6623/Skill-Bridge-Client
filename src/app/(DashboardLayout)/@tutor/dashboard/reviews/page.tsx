import { getMyReviews } from "../../../../../services/review";
import { Star, MessageSquare, Quote, User } from "lucide-react";

export default async function TutorReviewsPage() {
  const res = await getMyReviews();
  const reviews = res?.data || [];

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2">My Reviews</h1>
          <p className="text-zinc-500 font-medium">Feedback from your students and session summaries.</p>
        </div>
        <div className="px-6 py-4 bg-orange-500/10 border border-orange-500/20 rounded-3xl flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <Star className="fill-current w-6 h-6" />
           </div>
           <div>
              <p className="text-2xl font-black text-orange-500 leading-none">{averageRating}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-500/60 mt-1">Global Rating</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800">
           <p className="text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-2">{reviews.length}</p>
           <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Total Reviews</p>
        </div>
        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800">
           <p className="text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-2">
             {reviews.filter((r: any) => r.rating === 5).length}
           </p>
           <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">5-Star Feedback</p>
        </div>
        <div className="p-6 rounded-3xl bg-emerald-500/5 border-2 border-emerald-500/10">
           <p className="text-4xl font-black text-emerald-500 mb-2">100%</p>
           <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500/60">Success Rate</p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-orange-500" />
          Student Narratives
        </h2>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {reviews.map((review: any) => (
              <div key={review.id} className="group p-8 rounded-[2rem] bg-white dark:bg-zinc-950 border-2 border-zinc-100 dark:border-zinc-800 hover:border-orange-500/30 transition-all shadow-xl hover:shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                  <Quote className="w-20 h-20" />
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                  <div className="flex items-center gap-4 min-w-[240px]">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden">
                       {review.student?.avatar ? (
                         <img src={review.student.avatar} alt={review.student.name} className="w-full h-full object-cover" />
                       ) : <User className="text-zinc-400 w-6 h-6" />}
                    </div>
                    <div>
                        <p className="text-lg font-black text-zinc-900 dark:text-zinc-100 truncate max-w-[150px]">{review.student?.name}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Verified Student</p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? "fill-orange-500 text-orange-500" : "text-zinc-200 dark:text-zinc-800"}`} 
                        />
                      ))}
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed italic">
                      "{review.comment}"
                    </p>
                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                       <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                         Course: <span className="text-zinc-900 dark:text-zinc-100">{review.tutorSubject?.title || 'Advanced Mentorship'}</span>
                       </p>
                       <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                         {new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <MessageSquare className="w-16 h-16 text-zinc-200 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">Silence is Golden</h3>
            <p className="text-zinc-500 mt-2 max-w-xs mx-auto">You haven't received any reviews yet. Deliver an exceptional session to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
