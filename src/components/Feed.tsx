


import PostCard from "./PostCard";
// import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { getAllPosts } from "../services/userActivities/post";
import { Post } from "../types/interface";

// import PostCard from "./PostCard";
// import CreatePostDialog from "./CreatePostDialog";
// import { Skeleton } from "./ui/skeleton";
// import { Post } from "@/types/interface";

// Mock data for demonstration

export default async function Feed() {


  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loading, setLoading] = useState(false);
  const posts=await getAllPosts();
  const postsData=posts?.data as Post[]
  

  const handleCreatePost = () => {
    console.log("create post");
    //   data: { title: string; content: string; imageUrl?: string },
    //   postId?: string,
    // ) => {
    //   if (postId) {
    //     // Update existing post
    //     setPosts((prev) =>
    //       prev.map((post) =>
    //         post.id === postId
    //           ? { ...post, ...data, updatedAt: new Date().toISOString() }
    //           : post,
    //       ),
    //     );
    //     setEditingPost(null);
    //   } else {
    //     // Create new post
    //     const newPost: Post = {
    //       id: Date.now().toString(),
    //       ...data,
    //       authorId: user!.id,
    //       author: user!,
    //       comments: [],
    //       likes: [],
    //       createdAt: new Date().toISOString(),
    //       updatedAt: new Date().toISOString(),
    //     };
    //     setPosts((prev) => [newPost, ...prev]);
    //   }
  };

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
        <h1 className="text-3xl font-semibold">Feed</h1>
        {/* <CreatePostDialog
          onSubmit={handleCreatePost}
          editPost={editingPost}
          onClose={() => setEditingPost(null)}
        /> */}
      </div>

      <div className="space-y-6">
        {postsData?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No posts yet. Be the first to share something!
            </p>
          </div>
        ) : (
          postsData?.map((post:Post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))
        )}
      </div>
    </div>
  );
}
