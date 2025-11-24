import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getCookie } from "./lib/tokenHandlers";

const protectedRoutes = ["/"];

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const token = await getCookie("accessToken");

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtected) {
        if (!token) {
            return NextResponse.redirect(new URL("/signIn", req.url));
        }

        try {
            jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

        } catch (err) {
            console.log(err);
            return NextResponse.redirect(new URL("/signIn", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/"],
};
