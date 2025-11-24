"use server"
import { serverFetch } from "@/lib/server-fetch";
import { userLogin } from "./LoginUser";
import { IResponse } from "@/types/response.interface";
import { IUser } from "@/types/user.interface";

export async function userRegister({
    firstName,
    lastName,
    email,
    password
}: {
    firstName: string,
    lastName: string,
    email: string;
    password: string;
}) {
    try {
        const res = await serverFetch.post("/user/register", {
            body: JSON.stringify({ firstName, lastName, email, password }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Login failed");
        }

        const result: IResponse<IUser> = await res.json();
        if (result.success) {
            await userLogin({ email, password });
        }

        return result;
    } catch (error) {
        console.error("Register error:", error);
        throw error;
    }
}