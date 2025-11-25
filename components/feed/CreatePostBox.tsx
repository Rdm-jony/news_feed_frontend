/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import MaultiFileUploader from "../shared/MultiFileUploader";
import { Send } from "lucide-react";
import { FileMetadata } from "@/hooks/use-file-upload";
import { toast } from "sonner";
import { createPost } from "@/services/feed/feed";
import { IPrivacy } from "@/types/feed.interface";
import { mutate } from "swr";

export default function CreatePostBox() {
    const [content, setContent] = useState("");
    const [files, setFiles] = useState<(File | FileMetadata)[]>([]);
    const [loading, setLoading] = useState(false);
    const [privacy, setPrivacy] = useState<IPrivacy.PUBLIC | IPrivacy.PRIVATE>(IPrivacy.PUBLIC);

    const canSubmit = content.trim().length > 0 || files.length > 0;

    const handleSubmit = async () => {
        if (!canSubmit) return;

        setLoading(true);
        try {
            const result = await createPost({ content, images: files, privacy });
            if (result.success) {
                toast.success(result.message)
                setContent("")
                setFiles([])
                setPrivacy(IPrivacy.PUBLIC)
                mutate("/post/all")

            }
        } catch (err: any) {
            console.log(err);
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
            <div className="flex items-start gap-3">
                <Avatar>
                    <AvatarImage src="/" alt="Profile image" />
                    <AvatarFallback>kk</AvatarFallback>
                </Avatar>

                <Textarea
                    placeholder="Type your message here."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-lg shadow-none resize-none"
                />

                <div className="mt-2 text-sm text-gray-600 flex items-center gap-4">
                    <label className="flex items-center gap-1">
                        <input
                            type="radio"
                            name="privacy"
                            value="public"
                            checked={privacy === IPrivacy.PUBLIC}
                            onChange={() => setPrivacy(IPrivacy.PUBLIC)}
                            className="accent-blue-500"
                        />
                        Public
                    </label>
                    <label className="flex items-center gap-1">
                        <input
                            type="radio"
                            name="privacy"
                            value="private"
                            checked={privacy === IPrivacy.PRIVATE}
                            onChange={() => setPrivacy(IPrivacy.PRIVATE)}
                            className="accent-blue-500"
                        />
                        Private
                    </label>


                </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between items-center gap-x-5 text-gray-700 text-sm">
                <MaultiFileUploader onChange={(files) => setFiles(files)} />

                <Button
                    onClick={handleSubmit}
                    
                    disabled={!canSubmit || loading}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <Send />
                    {loading ? "Posting..." : "Post"}
                </Button>
            </div>
        </div>
    );
}
