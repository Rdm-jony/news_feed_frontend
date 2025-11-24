import { IPost } from "@/types/feed.interface";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Time formatter
function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000; // seconds

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 172800) return "Yesterday";
    return `${Math.floor(diff / 86400)} days ago`;
}

export default function PostCard({ post }: { post: IPost }) {
    const author = post.author;
    const name = `${author.firstName} ${author.lastName}`;

    return (
        <div className="bg-white shadow-sm rounded-xl p-4 mb-4 border border-gray-200">
           <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <Avatar>
                        {
                            post.author.avatarUrl && <AvatarImage src={post.author.avatarUrl} alt="Profile image" />

                        }
                        <AvatarFallback>{post.author.firstName[0]}{post.author.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold leading-tight">{name}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{timeAgo(post.createdAt.toString())}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                🌍 Public
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Content */}
            <p className="text-gray-800 mb-3">{post.content}</p>

            {post.images && post.images.length > 0 && (
                <div
                    className={`grid gap-2 ${post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
                        }`}
                >
                    {post.images.map((img, i) => (
                        <div
                            key={i}
                            className="w-full h-64 relative rounded-lg overflow-hidden"
                        >
                            <Image
                                src={img}
                                fill
                                alt="post image"
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Likes + Comments */}
            <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                <span>{post.likes.length} Likes</span>
                <span>
                    <span className="mr-5"><span className="font-medium">{post.comments}</span> Comments</span>
                    <span className="mr-5"><span className="font-medium">122</span> Share</span>
                </span>
            </div>

            <hr className="my-3" />

            {/* Buttons */}
            <div className="flex justify-between text-gray-700">
                {/* Like */}
                <button className="flex items-center justify-center gap-2 w-full hover:bg-gray-100 py-2 rounded-lg">
                    👍 <span>Like</span>
                </button>

                {/* Comment */}
                <button className="flex items-center justify-center gap-2 w-full hover:bg-gray-100 py-2 rounded-lg">
                    💬 <span>Comment</span>
                </button>

                {/* Share */}
                <button className="flex items-center justify-center gap-2 w-full hover:bg-gray-100 py-2 rounded-lg">
                    ↗ <span>Share</span>
                </button>
            </div>

        </div>
    );
}
