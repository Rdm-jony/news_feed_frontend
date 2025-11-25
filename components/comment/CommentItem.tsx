/* eslint-disable @typescript-eslint/no-explicit-any */
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IComment } from "@/types/comment.interface";
import { useState } from "react";
import { toast } from "sonner";
import { addComment } from "@/services/feed/feed";
import { mutate } from "swr";




const CommentItem = ({ comment, postId }: { comment: IComment; postId: string }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replyText, setReplyText] = useState("");
    const handleAddComment = async () => {
        if (!replyText.trim()) return;


        console.log();
        try {
            const result = await addComment({ postId: postId, text: replyText, parentId: comment._id })
            if (result.success) {
                toast.success(result.message)
                setReplyText("")
                mutate("/post/all")
                mutate(`/comment/${postId}`)
            }
        } catch (err: any) {
            console.log(err);
            toast.error(err.message)
        }
    };
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
                <Avatar>
                    {comment?.author?.avatarUrl ? (
                        <AvatarImage src={comment.author.avatarUrl} alt="Avatar" />
                    ) : (
                        <AvatarFallback>{comment.author?.firstName[0]}{comment.author?.lastName[0]}</AvatarFallback>
                    )}
                </Avatar>
                <div className="bg-gray-100 rounded-xl px-3 py-2 text-sm flex flex-col gap-1">
                    <p className="font-medium">{comment?.author?.firstName} {comment?.author?.lastName}</p>
                    <p>{comment.text}</p>

                    {/* View replies button only if there are replies */}
                    {comment.replies && comment.replies.some(r => r._id) && (
                        <button
                            className="text-xs text-gray-500 hover:underline self-start"
                            onClick={() => setShowReplies(prev => !prev)}
                        >
                            {showReplies ? "Hide Replies" : `View Replies (${comment.replies.filter(r => r._id).length})`}
                        </button>
                    )}
                </div>
            </div>

            {/* Replies */}
            {showReplies && (
                <div className="ml-10 space-y-2">
                    {(comment.replies || []).filter((r: IComment) => r._id).map(reply => (
                        <div key={reply._id} className="flex items-start gap-2">
                            <Avatar>
                                {reply.author.avatarUrl ? (
                                    <AvatarImage src={reply.author.avatarUrl} alt="Avatar" />
                                ) : (
                                    <AvatarFallback>{reply.author.firstName[0]}{reply.author.lastName[0]}</AvatarFallback>
                                )}
                            </Avatar>
                            <div className="bg-gray-100 rounded-xl px-3 py-2 text-sm">
                                <p className="font-medium">{reply.author.firstName} {reply.author.lastName}</p>
                                <p>{reply.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Always show reply input */}
            <div className="flex items-center gap-2 ml-10 mt-1">
                <Avatar>
                    <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <input
                    type="text"
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button onClick={()=>(handleAddComment)} className="p-2 rounded-full hover:bg-gray-200">
                    <Send className="w-4 h-4 text-blue-500" />
                </button>
            </div>
        </div>
    );
};

export default CommentItem