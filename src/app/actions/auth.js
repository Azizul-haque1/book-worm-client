"use server";

import { cookies } from "next/headers";

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  //   try {
  //     const res = await fetch("${process.env.NEXT_PUBLIC_API_URL}/logout", {
  //       method: "POST",
  //       credentials: "include",
  //     });

  //     const data = await res.json();

  //     // if (!res.ok) {
  //     //   return toast.error(data.message || "Logout failed");
  //     // }

  //     console.log(data.message);

  //     // redirect after logout
  //     window.location.href = "/login";
  //   } catch (error) {
  //     console.error(error.message);
  //     alert("Logout failed");
  //   }
}
