"use client";

import {
  LogOutIcon,
  ChevronDownIcon,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useSWR from "swr";
import { serverFetch } from "@/lib/server-fetch";
import { logoutUser } from "@/lib/logOut";
import { IUser } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const fetcher = (url: string) =>
  serverFetch.get(url, { credentials: "include" }).then((res) => res.json());

export default function Profile() {
  const router = useRouter();

  const { data, error } = useSWR<{ data: IUser }>("/user/me", fetcher);

  const user = data?.data;

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  if (error) return null;
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto p-0 gap-2 hover:bg-transparent flex items-center"
        >
          <Avatar>
            {user.avatarUrl && (
              <AvatarImage src={user.avatarUrl} alt="Profile" />
            )}
            <AvatarFallback>
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>

          <p>{user.firstName}</p>

          <ChevronDownIcon size={16} className="opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel>
          <p className="text-sm font-medium">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs opacity-70">{user.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon size={16} className="opacity-60" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
