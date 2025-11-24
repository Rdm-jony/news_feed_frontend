/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidatePosts } from "@/app/action";
import { FileMetadata } from "@/hooks/use-file-upload";
import { serverFetch } from "@/lib/server-fetch";
import { IPost, IPrivacy } from "@/types/feed.interface";
import { IResponse } from "@/types/response.interface";

export async function getFeeds() {
    try {
        const response = await serverFetch.get(`/post/all`, { next: { tags: ["posts"] } });
        const result: IResponse<IPost> = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
    }
}



interface ICreatePostPayload {
    content: string;
    images?: (File | FileMetadata)[];
    privacy?: IPrivacy.PRIVATE | IPrivacy.PUBLIC;
}

export async function createPost(payload: ICreatePostPayload) {
    try {
        const formData = new FormData();
        formData.append("content", payload.content);

        if (payload.privacy) {
            formData.append("privacy", payload.privacy);
        }

        if (payload.images && payload.images.length > 0) {
            payload.images.forEach((file) => {
                formData.append("files", file as File);
            });
        }

        const response = await serverFetch.post(`/post/create`, {
            body: formData,
        });

        const result: IResponse<IPost> = await response.json();
        await revalidatePosts()
        return result;
    } catch (error: any) {
        console.log("Error creating post:", error);
        throw error;
    }
}

