"use client";

import { Post } from "@/src/types/interface";
import PostCard from "./PostCard";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

// import PostCard from "./PostCard";
// import CreatePostDialog from "./CreatePostDialog";
// import { Skeleton } from "./ui/skeleton";
// import { Post } from "@/types/interface";

// Mock data for demonstration

export default function MyPosts() {
  const user = {
    id: "65f1a2b3c4d5e6f7890abc01",
    username: "Shahariar Sohan",
    email: "sohan@example.com",
    password: "hashed_password_123",
    createdAt: new Date("2026-03-01T10:00:00Z"),
    avatar: "N/A",
  };

  // const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  // const [editingPost, setEditingPost] = useState<Post | null>(null);

  const posts = [
    {
      id: 1,
      title: "Morning Vibes ☀️",
      content: "Nothing beats a peaceful morning.",
      imageUrl: "https://res.cloudinary.com/demo/image/upload/beach.jpg",
      authorId: "65f1a2b3c4d5e6f7890abc01",
      author: user,
      comments: [],
      likes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Coding Time 💻",
      content: "Late night coding session!",
      imageUrl: "https://res.cloudinary.com/demo/image/upload/beach.jpg",
      authorId: "65f1a2b3c4d5e6f7890abc02",
      author: user,
      comments: [],
      likes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Travel Diaries 🌊",
      content: "Enjoying Cox's Bazar beach!",
      imageUrl: "https://res.cloudinary.com/demo/image/upload/beach.jpg",
      authorId: "65f1a2b3c4d5e6f7890abc03",
      author: user,
      comments: [],
      likes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

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

  const handleLike = () => {
    console.log("like post");
    // console.log("like post", postId);
    // setPosts((prev) =>
    //   prev.map((post) => {
    //     if (post.id === postId) {
    //       const userLiked = post.likes.some((like) => like.userId === user?.id);
    //       if (userLiked) {
    //         return {
    //           ...post,
    //           likes: post.likes.filter((like) => like.userId !== user?.id),
    //         };
    //       } else {
    //         return {
    //           ...post,
    //           likes: [
    //             ...post.likes,
    //             {
    //               id: Date.now().toString(),
    //               postId,
    //               userId: user!.id,
    //               createdAt: new Date().toISOString(),
    //             },
    //           ],
    //         };
    //       }
    //     }
    //     return post;
    //   }),
    // );
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-64 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">My Posts</h1>
        {/* <CreatePostDialog
          onSubmit={handleCreatePost}
          editPost={editingPost}
          onClose={() => setEditingPost(null)}
        /> */}
      </div>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No posts yet. Be the first to share something!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={() => handleDeletePost()}
              onEdit={() => handleCreatePost()}
              onLike={() => handleLike()}
            />
          ))
        )}
      </div>
    </div>
  );
}
