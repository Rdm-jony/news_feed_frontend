"use client";

import { IPost } from "@/types/feed.interface";
import PostCard from "./PostCard";
import useSWR from "swr";
import { serverFetch } from "@/lib/server-fetch";
import CreatePostBox from "./CreatePostBox";

const fetcher = (url: string) => serverFetch.get(url, { credentials: "include", next: { tags: ["posts"] } }).then(res => res.json());

interface Props {
    initialPosts: IPost[];
}

const FeedList = ({ initialPosts }: Props) => {
    const { data, error } = useSWR<{ data: IPost[] }>("/post/all", fetcher, { fallbackData: { data: initialPosts } });

    if (error) return <div>Error loading posts</div>;
    if (!data) return <div>Loading posts...</div>;

    const posts: IPost[] = Array.isArray(data.data) ? data.data : data.data ? [data.data] : [];

    return (
        <>
            <CreatePostBox />

            {posts.map(post => (
                <PostCard key={post._id} post={post} />
            ))}
        </>
    );
};

export default FeedList;
