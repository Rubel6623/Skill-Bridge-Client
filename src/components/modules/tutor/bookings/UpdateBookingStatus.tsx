"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { updateBookingStatus } from "@/services/tutor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UpdateBookingStatusProps {
  bookingId: string;
  currentStatus: string;
}

export default function UpdateBookingStatusForm({ bookingId, currentStatus }: UpdateBookingStatusProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === currentStatus) return;
    
    setIsLoading(true);
    try {
      const res = await updateBookingStatus(bookingId, status);
      if (res.success) {
        toast.success("Booking status updated successfully");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700/50">
      <div className="flex-1">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-3 py-2 text-sm outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100"
        >
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="REJECTED">Rejected</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={isLoading || status === currentStatus}
        className="bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 disabled:cursor-not-allowed transition text-white rounded-md px-4 py-2 text-sm font-medium flex items-center justify-center min-w-[100px]"
      >
        {isLoading ? <Loader2 className="animate-spin" size={16} /> : "Update"}
      </button>
    </form>
  );
}
