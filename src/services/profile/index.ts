
"use server";

import { cookies } from "next/headers";

export const getMyProfile = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { success: false, message: "No active session found" };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, 
      },
      cache: "no-store", 
    });

    const result = await res.json();

    if (res.status === 401) {
       return { success: false, message: "Session expired" };
    }

    return result; 
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch profile" };
  }
};