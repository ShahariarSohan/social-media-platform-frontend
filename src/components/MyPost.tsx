

import { Post } from "@/src/types/interface";
import PostCard from "./PostCard";
// import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { getMyPosts } from "../services/userActivities/post";
import CreatePostDialog from "./CreatePostDialog";

// import PostCard from "./PostCard";
// import CreatePostDialog from "./CreatePostDialog";
// import { Skeleton } from "./ui/skeleton";
// import { Post } from "@/types/interface";

// Mock data for demonstration

export default async function MyPosts() {
   const posts=await getMyPosts();
    const postsData=posts?.data as Post[]

  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [editingPost, setEditingPost] = useState<Post | null>(null);


 

  const handleDeletePost = () => {
    console.log("delete post");
    // setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

 

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
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">My Posts</h1>
        <CreatePostDialog
          // onSubmit={handleCreatePost}
          // editPost={editingPost}
          // onClose={() => setEditingPost(null)}
        />
      </div>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No posts yet. Be the first to share something!
            </p>
          </div>
        ) : (
          postsData.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              // onDelete={() => handleDeletePost()}
              // onEdit={() => handleCreatePost()}
            />
          ))
        )}
      </div>
    </div>
  );
}
