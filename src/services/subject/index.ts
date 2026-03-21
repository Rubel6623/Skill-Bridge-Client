
"use server";

import { cookies } from "next/headers";

export const getOwnSubjects = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my-subjects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      cache: "no-store", 
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch subjects" };
  }
};