"use server";

import { cookies } from "next/headers";

export const createTutorProfile = async (profileData: any) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutors/create-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(profileData),
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong while creating profile",
    };
  }
};

export const updateBookingStatus = async (bookingId: string, status: string) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/booking/status/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update booking status",
    };
  }
};

export const getAllTutorSubjects = async (searchTerm: string = "") => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutor-subjects?searchTerm=${searchTerm}`, {
      method: "GET",
      cache: "no-store",
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch tutor subjects",
    };
  }
};

export const getTutorDetails = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutors/${id}`, {
      method: "GET",
      cache: "no-store",
    });
    
    if (!res.ok) throw new Error("Failed to fetch tutor data");
    
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Tutor fetch failed",
    };
  }
};

export const getSubjectDetails = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutor-subjects/${id}`, {
      method: "GET",
      cache: "no-store",
    });
    
    if (!res.ok) throw new Error("Failed to fetch subject details");
    
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Subject fetch failed",
    };
  }
};

export const getMyProfile = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutors/profile/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      next: { tags: ["tutor-profile"] }
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Tutor profile fetch failed",
    };
  }
};

export const updateTutorProfile = async (profileData: any) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutors/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(profileData),
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update profile",
    };
  }
};