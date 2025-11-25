export const dynamic = "force-dynamic";

import CreatePostBox from "@/components/feed/CreatePostBox";
import PostCard from "@/components/feed/PostCard";
import { getFeeds } from "@/services/feed/feed";
import { IPost } from "@/types/feed.interface";

const FeedPage = async () => {
    const result = await getFeeds();
    const rawData = result?.data;
    const posts: IPost[] = Array.isArray(rawData) ? rawData : rawData ? [rawData] : [];

    return (
        <div className="space-y-4">

            <div className="sticky top-0 z-40  pt-2">
                <CreatePostBox />
            </div>

            <div className="space-y-4">
                {posts.map((post: IPost) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>

        </div>
    );
};

export default FeedPage;
