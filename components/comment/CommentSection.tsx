/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IComment } from "@/types/comment.interface";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Send } from "lucide-react";
import { addComment, getComments } from "@/services/feed/feed";
import { toast } from "sonner";
import CommentItem from "./CommentItem";

export default function CommentSection({ postId }: { postId: string }) {
    const [comments, setComments] = useState<IComment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newComment, setNewComment] = useState("");

    // Fetch comments when component loads
    const fetchComments = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await getComments(postId)

            setComments(res?.data as IComment[] || []);
        } catch (err: any) {
            setError("Failed to load comments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    // Add new comment
    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const result = await addComment({
                postId: postId,
                text: newComment,
            });

            if (result.success) {
                toast.success(result.message);
                setNewComment("");

                // Refresh comments
                fetchComments();
            }
        } catch (err: any) {
            console.log(err);
            toast.error(err.message || "Failed to add comment");
        }
    };

    if (loading) return <div>Loading comments...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

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
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                />

                <button
                    onClick={handleAddComment}
                    className="p-2 rounded-full hover:bg-gray-200"
                >
                    <Send className="w-4 h-4 text-blue-500" />
                </button>
            </div>

            {/* Comment list */}
            <div className="space-y-3">
                {comments.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} postId={postId} />
                ))}
            </div>
        </div>
    );
}
