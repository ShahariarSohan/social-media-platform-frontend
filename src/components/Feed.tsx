import PostCard from "./PostCard";
// import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { getFollowedFeed } from "../services/userActivities/post";
import { Post } from "../types/interface";
import CreatePostDialog from "./CreatePostDialog";
import getUserInfo from "../services/auth/getUserInfo";

// import PostCard from "./PostCard";

export default async function Feed() {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loading, setLoading] = useState(false);
  const user = await getUserInfo();
  const posts = await getFollowedFeed();
  const postsData = posts?.data as Post[];

  // if (loading) {
  //   return (
  //     <div className="max-w-2xl mx-auto space-y-6">
  //       {[1, 2, 3].map((i) => (
  //         <div key={i} className="space-y-3">
  //           <Skeleton className="h-64 w-full" />
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-3xl mx-auto space-y-4 md:space-y-6 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Feed</h1>
        <CreatePostDialog />
      </div>

      <div className="space-y-6">
        {postsData?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No posts yet. Be the first to share something!
            </p>
          </div>
        ) : (
          postsData?.map((post: Post) => (
            <PostCard key={post.id} post={post} user={user} />
          ))
        )}
      </div>
    </div>
  );
}
