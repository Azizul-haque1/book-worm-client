// lib/getUser.ts
"use server"; // Important! Only works in server components

import { cookies } from "next/headers";

export default async function getUser() {
  const cookieStore = await cookies(); // returns a Promise
  const tokenCookie = cookieStore.get("token");

  if (!tokenCookie) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      headers: {
        Cookie: `token=${tokenCookie.value}`, // send cookie to backend
      },
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) return null;

    const user = await res.json();
    return user;
  } catch (err) {
    console.error("Failed to fetch user:", err);
    return null;
  }
}
