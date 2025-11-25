/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { IResponse } from "@/types/response.interface";
import { IUser } from "@/types/user.interface";

export async function getMe() {
    try {
        const response = await serverFetch.get(`/user/me`);
        const result: IResponse<IUser> = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
    }
}