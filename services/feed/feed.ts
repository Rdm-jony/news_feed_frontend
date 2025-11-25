/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidatePosts } from "@/app/action";
import { FileMetadata } from "@/hooks/use-file-upload";
import { serverFetch } from "@/lib/server-fetch";
import { IComment } from "@/types/comment.interface";
import { IPost, IPrivacy } from "@/types/feed.interface";
import { IResponse } from "@/types/response.interface";
import { IUser } from "@/types/user.interface";

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


export async function toggleLike(postId: string) {
    const res = await serverFetch.patch(`/post/like-toggle/${postId}`)

    if (!res.ok) {
        throw new Error("Like toggle failed");
    }

    const result: IResponse<null> = await res.json();
    return result
}
export async function getLikedUsers(postId: string) {
    const res = await serverFetch.get(`/post/liked/${postId}`)

    if (!res.ok) {
        throw new Error("Like toggle failed");
    }

    const result: IResponse<IUser> = await res.json();
    return result
}



export type CreateCommentInput = {
    postId: string;
    text: string;
    parentId?: string | null;
};

export async function addComment(payload: CreateCommentInput) {
    console.log(payload);
    const res = await serverFetch.post(`/comment/create`, {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })

    if (!res.ok) {
        throw new Error("comment add failed");
    }

    const result: IResponse<IComment> = await res.json();
    return result
}




