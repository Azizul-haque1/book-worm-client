import { NextResponse } from "next/server";

export function proxy(request) {
  // console.log("data");
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/my-library"],
};
