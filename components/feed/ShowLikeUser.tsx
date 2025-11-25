/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";
import { IUser } from "@/types/user.interface";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { serverFetch } from "@/lib/server-fetch";
import { getLikedUsers } from "@/services/feed/feed";

export default function ShowLikeUser({
    open,
    setOpen,
    postId,
}: {
    open: boolean;
    setOpen: (bool: boolean) => void;
    postId: string;
}) {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open) return;

        const fetchLikedUsers = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await getLikedUsers(postId);
                setUsers(res?.data as IUser[] || []);
            } catch (err: any) {
                setError("Failed to load users");
            } finally {
                setLoading(false);
            }
        };

        fetchLikedUsers();
    }, [open, postId]);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger />

            <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuLabel>Liked by</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {loading && <DropdownMenuItem disabled>Loading...</DropdownMenuItem>}

                {error && <DropdownMenuItem disabled>{error}</DropdownMenuItem>}

                {!loading && users.length === 0 && (
                    <DropdownMenuItem disabled>No likes yet</DropdownMenuItem>
                )}

                {users.map((user) => (
                    <DropdownMenuItem key={user._id} className="cursor-default">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                {user.avatarUrl && (
                                    <AvatarImage src={user.avatarUrl} alt="Profile" />
                                )}
                                <AvatarFallback>
                                    {user.firstName[0]}
                                    {user.lastName[0]}
                                </AvatarFallback>
                            </Avatar>

                            <p className="text-sm">
                                {user.firstName} {user.lastName}
                            </p>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
