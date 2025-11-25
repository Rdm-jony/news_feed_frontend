"use server"
import { serverFetch } from "@/lib/server-fetch";
import { setCookie } from "@/lib/tokenHandlers";
import { parse } from "cookie";
import { IResponse } from "@/types/response.interface";
import { IUser } from "@/types/user.interface";

export async function userLogin({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    try {
        const res = await serverFetch.post("/user/login", {
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { success: false, message: errorData.message || "Login failed" };
        }

        const setCookieHeaders = res.headers.getSetCookie();
        if (setCookieHeaders) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsed = parse(cookie);
                if (parsed.accessToken) {
                    setCookie("accessToken", parsed.accessToken, { secure: true, httpOnly: true, path: "/" });
                }
                if (parsed.refreshToken) {
                    setCookie("refreshToken", parsed.refreshToken, { secure: true, httpOnly: true, path: "/" });
                }
            });
        }

        const data: IResponse<IUser> = await res.json();
        return data;
    } catch (err) {
        console.error("Login error:", err);
        return { success: false, message: (err as Error).message || "Login failed" };
    }
}
