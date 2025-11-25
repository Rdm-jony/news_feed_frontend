/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IPost } from "@/types/feed.interface";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { toggleLike } from "@/services/feed/feed";
import { ThumbsUp } from "lucide-react";
import ShowLikeUser from "./ShowLikeUser";
import CommentSection from "../comment/CommentSection";

function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000;

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 172800) return "Yesterday";
    return `${Math.floor(diff / 86400)} days ago`;
}

export default function PostCard({ post }: { post: IPost }) {
    const author = post.author;

    const [isLiked, setIsLiked] = useState(post.likes.includes(author._id as string));
    const [likes, setLikes] = useState(post.likes.length);
    const [openLikedUser, setOpenLikedUser] = useState(false)
    const [showComments, setShowComments] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleLike = async () => {
        if (loading) return;
        setLoading(true);
        const prevLiked = isLiked;
        setIsLiked(!isLiked);
        setLikes(prev => (prevLiked ? prev - 1 : prev + 1));

        try {
            const result = await toggleLike(post._id as string);
            console.log(result);
        } catch (err: any) {
            setIsLiked(prevLiked);
            setLikes(prev => (prevLiked ? prev + 1 : prev - 1));
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-white shadow-sm rounded-xl p-4 mb-4 border border-gray-200">

            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
                <Avatar>
                    {author.avatarUrl && (
                        <AvatarImage src={author.avatarUrl} alt="Profile" />
                    )}
                    <AvatarFallback>
                        {author.firstName[0]}{author.lastName[0]}
                    </AvatarFallback>
                </Avatar>

                <div>
                    <p className="font-semibold">{author.firstName} {author.lastName}</p>
                    <p className="text-xs text-gray-500">{timeAgo(post.createdAt.toString())}</p>
                </div>
            </div>

            <p className="text-gray-800 mb-3">{post.content}</p>

            {post.images && post.images.length > 0 && (
                <div className={`grid gap-2 ${post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                    {post.images.map((img, i) => (
                        <div key={i} className="w-full h-64 relative rounded-lg overflow-hidden">
                            <Image src={img} fill className="object-cover" alt="post image" />
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-between text-sm text-gray-600 mt-3">
                <span onClick={() => setOpenLikedUser(true)} className="text-primary cursor-pointer">{likes} Likes</span>

                <span onClick={() => setShowComments(!showComments)} className="text-primary cursor-pointer">
                    {post.comments} Comments
                </span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between">
                <button
                    onClick={handleLike}
                    className="flex items-center gap-2 w-full justify-center py-2 rounded-lg hover:bg-gray-100"
                >
                    {isLiked ? <ThumbsUp className="text-primary cursor-pointer" /> : <ThumbsUp className="text-gray-400 cursor-pointer" />}
                </button>

                <button className="flex items-center gap-2 w-full justify-center py-2 rounded-lg hover:bg-gray-100">
                    💬 Comment
                </button>

                <button className="flex items-center gap-2 w-full justify-center py-2 rounded-lg hover:bg-gray-100">
                    ↗ Share
                </button>
            </div>
            {
                post.likes?.length > 0 && <ShowLikeUser postId={post._id as string} open={openLikedUser} setOpen={setOpenLikedUser} />
            }
            {showComments && <CommentSection postId={post._id as string} />}

        </div>
    );
}
