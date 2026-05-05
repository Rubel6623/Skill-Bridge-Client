"use server";

import { cookies } from "next/headers";

export const getAllBlogCategories = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return { success: false, message: "Server configuration missing (NEXT_PUBLIC_BASE_URL)" };
  }

  try {
    const res = await fetch(`${baseUrl}/blogs/categories`, {
      method: "GET",
      next: { revalidate: 0 },
    });
    
    console.log("Fetch Status:", res.status, res.statusText);
    const text = await res.text();
    console.log("Raw Response Text:", text);
    
    try {
      const data = JSON.parse(text);
      console.log("Parsed JSON Data:", data);
      return data;
    } catch (e) {
      console.error("Failed to parse JSON:", text);
      return { success: false, message: "Invalid JSON response from server" };
    }
  } catch (error: any) {
    console.error("BlogCategory Service Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
};

export const createBlogCategory = async (data: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return { success: false, message: "Server configuration missing (NEXT_PUBLIC_BASE_URL)" };
  }

  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  if (!token) {
    return { success: false, message: "Authentication token missing. Please login again." };
  }

  try {
    const res = await fetch(`${baseUrl}/blogs/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error: any) {
    console.error("BlogCategory Service Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
};

export const updateBlogCategory = async (id: string, data: any) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error: any) {
    console.error("BlogCategory Service Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
};

export const deleteBlogCategory = async (id: string) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error: any) {
    console.error("BlogCategory Service Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
};
