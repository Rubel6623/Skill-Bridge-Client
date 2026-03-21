
"use server";

import { cookies } from "next/headers";

export const getUserBookings = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return { success: false, message: "Unauthorized" };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/booking`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      cache: "no-store", 
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};