/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IComment } from "@/types/comment.interface";
import useSWR, { mutate } from "swr";
import { serverFetch } from "@/lib/server-fetch";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Send } from "lucide-react";
import { addComment } from "@/services/feed/feed";
import { toast } from "sonner";
import CommentItem from "./CommentItem";

const fetcher = (url: string) =>
    serverFetch.get(url, { credentials: "include" }).then(res => res.json());

const CommentSection = ({ postId }: { postId: string }) => {
    const { data, error } = useSWR<{ data: IComment[] }>(`/comment/${postId}`, fetcher);
    const [newComment, setNewComment] = useState("");

    const handleAddComment = async () => {
        if (!newComment.trim()) return;


        console.log();
        try {
            const result = await addComment({ postId: postId, text: newComment })
            if (result.success) {
                toast.success(result.message)
                setNewComment("")
            }
        } catch (err: any) {
            console.log(err);
            toast.error(err.message)
        }
    };

    if (error) return <div>Error loading comments</div>;
    if (!data) return <div>Loading comments...</div>;

    return (
        <div className="mt-4 space-y-4">
            {/* Add new comment */}
            <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <input
                    type="text"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button onClick={() => handleAddComment()} className="p-2 rounded-full hover:bg-gray-200">
                    <Send className="w-4 h-4 text-blue-500" />
                </button>
            </div>

            {/* Comment list */}
            <div className="space-y-3">
                {data.data.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={postId} />
                ))}
            </div>
        </div>
    );
};




export default CommentSection;
