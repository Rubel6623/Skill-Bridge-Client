"use server";

import { cookies } from "next/headers";

export const createReview = async (data: {
  studentId: string;
  tutorProfileId: string;
  bookingId: string;
  rating: number;
  comment: string;
}) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to submit review",
    };
  }
};

export const getReviewsByTutor = async (tutorProfileId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/review/tutor/${tutorProfileId}`, {
      method: "GET",
      cache: "no-store",
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch reviews",
    };
  }
};

export const getMyReviews = async () => {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/review/my-reviews`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      cache: "no-store",
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch reviews",
    };
  }
};
