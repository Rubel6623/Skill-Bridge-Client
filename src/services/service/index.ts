/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const getAllCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/categories`,
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

export const getSubjectDetails = async (id: string) => {
  console.log(`[Service] Fetching subject details for ID: ${id}`);
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/tutor-subjects/${id}`;
    console.log(`[Service] Target URL: ${url}`);
    
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });
    
    const result = await res.json();
    console.log(`[Service] Fetch result for ${id}:`, JSON.stringify(result).slice(0, 100));
    return result;
  } catch (error: any) {
    console.error(`[Service] Fetch error for ${id}:`, error.message);
    return { success: false, message: error.message };
  }
};