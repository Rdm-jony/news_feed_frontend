/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { deleteCookie, getCookie } from "./lib/tokenHandlers";

const protectedRoutes = ["/"];
const publicRoutes = ["/signIn", "/register"];

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const token = await getCookie("accessToken");

    let decoded: any = null;

    if (token) {
        try {
            decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
        } catch (err) {
            console.log("JWT verification failed:", err);

            const response = NextResponse.redirect(new URL("/signIn", req.url));
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            return response;
        }
    }

    const isProtected = protectedRoutes.some((route) =>
        pathname === route
    );
    const isPublic = publicRoutes.some((route) =>
        pathname === route
    );

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
