"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useSWR from "swr";
import { serverFetch } from "@/lib/server-fetch";
import { IUser } from "@/types/user.interface";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const fetcher = (url: string) => serverFetch.get(url, { credentials: "include" }).then(res => res.json());

const ShowLikeUser = ({ open, setOpen, postId }: { open: boolean, setOpen: (bool: boolean) => void, postId: string }) => {

    const { data: result } = useSWR(`/post/liked/${postId}`, fetcher);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Like by user</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    result?.data.map((user: IUser) => <DropdownMenuItem key={user._id}>
                        <div className="flex items-center gap-2">
                            <Avatar>
                                {user.avatarUrl && (
                                    <AvatarImage src={user.avatarUrl} alt="Profile" />
                                )}
                                <AvatarFallback>
                                    {user.firstName[0]}{user.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <p className="text-sm">{user.firstName} {user.lastName}</p>

                        </div>
                    </DropdownMenuItem>

                    )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ShowLikeUser;