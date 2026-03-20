/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const getAllCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 3600,
        },
      },
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getAllTutorSubjects = async (searchTerm?: string) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/tutor-subjects`);
    if (searchTerm) {
      url.searchParams.append("searchTerm", searchTerm);
    }

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 }, 
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getSingleSubjectDetails = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tutor-subjects/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store", 
      }
    );
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};