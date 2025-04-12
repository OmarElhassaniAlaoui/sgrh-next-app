import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoutes = ["/dashboard", "/employees", "/leaves", "/settings"];
const publicRoutes = ["/login", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  console.log("Middleware:", { path, cookie });

  const session = await decrypt(cookie);

  console.log("Session verified:", { session: !!session?.userId });

  if (isProtectedRoute && !session?.userId) {
    console.log("Redirecting to login: No valid session");
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    console.log("Redirecting to dashboard: Already logged in");
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/employees/:path*",
    "/leaves/:path*",
    "/settings/:path*",
    "/login",
  ],
};
