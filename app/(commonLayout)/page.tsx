import FeedList from "@/components/feed/FeedList";
import { getFeeds } from "@/services/feed/feed";
import { IPost } from "@/types/feed.interface";

const FeedPage = async () => {
    const result = await getFeeds();
    const rawData = result?.data;
    const posts: IPost[] = Array.isArray(rawData) ? rawData : rawData ? [rawData] : [];

    return (
        <div>
        
            <div className="max-w-xl mx-auto py-6">
                <FeedList initialPosts={posts} />
            </div>
        </div>
    );
};

export default FeedPage;
