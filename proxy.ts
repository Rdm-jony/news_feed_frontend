/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const protectedRoutes = ["/"];
const publicRoutes = ["/signIn", "/register"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("accessToken")?.value;

  let decoded: any = null;

  if (token) {
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    } catch (err) {
      console.log("JWT verification failed:", err);

      const response = NextResponse.redirect(new URL("/signIn", req.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  const isProtected = protectedRoutes.includes(pathname);
  const isPublic = publicRoutes.includes(pathname);

  if (isProtected && !decoded) {
    return NextResponse.redirect(new URL("/signIn", req.url));
  }

  if (isPublic && decoded) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signIn", "/register"],
};
