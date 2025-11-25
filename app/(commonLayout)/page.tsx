import CreatePostBox from "@/components/feed/CreatePostBox";
import PostCard from "@/components/feed/PostCard";
import { getFeeds } from "@/services/feed/feed";
import { IPost } from "@/types/feed.interface";

const FeedPage = async () => {
    const result = await getFeeds();

    const rawData = result?.data;

    const posts: IPost[] = Array.isArray(rawData) ? rawData : rawData ? [rawData] : [];

    return (
        <div>
            <CreatePostBox />
            <div className="max-w-xl mx-auto py-6">
                {posts.map((post: IPost) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default FeedPage;
