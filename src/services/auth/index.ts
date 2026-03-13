"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    const storeCookie = await cookies();

    if (result.success) {
      storeCookie.set("token", result?.data?.token);
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

interface CustomJwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  exp?: number;
  iat?: number;
}

export const getUser = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;
  let decodedData = null;
  if (token) {
    decodedData = await jwtDecode<CustomJwtPayload>(token);
    return decodedData;
  } else {
    return null;
  }
};

export const UserLogOut = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};