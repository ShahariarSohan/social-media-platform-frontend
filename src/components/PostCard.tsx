"use client";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Heart, MessageCircle, Trash2, Edit, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import Link from "next/link";
import { useState, useRef } from "react";

import { toggleLike } from "../services/userActivities/like";
import { createComment, deleteComment, updateComment } from "../services/userActivities/comment";
import { updatePost, deletePost } from "../services/userActivities/post";


interface PostCardProps {
  post: any;
  user: any;
  onDelete?: () => void;
  onEdit?: () => void;
}

export default function PostCard({
  post,
  user,
  onDelete,
  onEdit,
}: PostCardProps) {
  // ---------------- LIKE ----------------
  const initialLike = post.likes.some((like: any) => like.userId === user?.id);

  const [liked, setLiked] = useState(initialLike);
  const [likeCount, setLikeCount] = useState(post.likes.length);

  const handleLike = async (postId: string) => {
    try {
      const res = await toggleLike(postId);

      const isLiked = res?.data?.liked;
      setLiked(isLiked);
      setLikeCount((prev:any) => (isLiked ? prev + 1 : prev - 1));
    } catch {
      toast.error("Failed to like post");
    }
  };

  // ---------------- POST ACTIONS ----------------
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editPostTitle, setEditPostTitle] = useState(post.title);
  const [editPostContent, setEditPostContent] = useState(post.content);

  const handleUpdatePostLocal = async () => {
    const formData = new FormData();
    formData.append("title", editPostTitle);
    formData.append("content", editPostContent);

    const res = await updatePost(post.id, null, formData);

    if (res?.success) {
      toast.success("Post updated successfully");
      post.title = editPostTitle;
      post.content = editPostContent;
      setIsEditingPost(false);
    } else {
      toast.error(res?.message || "Failed to update post");
    }
  };

  const handleDeletePostLocal = async () => {
    if (!confirm("Delete this post?")) return;

    try {
      const res = await deletePost(post.id);
      if (res?.success) {
        toast.success("Post deleted");
        setIsDeleted(true);
      } else {
        toast.error(res?.message || "Delete failed");
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  // ---------------- COMMENTS ----------------
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  // CREATE
  const formRef = useRef<HTMLFormElement>(null);
  const handleCreateComment = async (formData: FormData) => {
    const res = await createComment(null, formData);

    if (res?.success) {
      toast.success("Comment added");
      setComments((prev: any) => [{ ...res?.data, author: res?.data?.author || user }, ...prev]);
      formRef.current?.reset();
    } else {
      toast.error(res?.message || "Failed");
    }
  };

  // UPDATE
  const handleUpdateComment = async (id: string) => {
    const formData = new FormData();
    formData.append("content", editingText);

    const res = await updateComment(id, null, formData);

    if (res?.success) {
      toast.success("Updated");
      setComments((prev: any) =>
        prev.map((c: any) =>
          c.id === id ? { ...c, content: editingText } : c,
        ),
      );
      setEditingId(null);
      setEditingText("");
    } else {
      toast.error(res?.message || "Update failed");
    }
  };

  // DELETE
  const handleDeleteComment = async (id: string) => {
    if (!confirm("Delete comment?")) return;

    const res = await deleteComment(id);

    if (res?.success) {
      toast.success("Deleted");
      setComments((prev: any) => prev.filter((c: any) => c.id !== id));
    } else {
      toast.error(res?.message || "Delete failed");
    }
  };

  if (isDeleted) return null;

  return (
    <Card className="overflow-hidden">
      {/* HEADER */}
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={post.author?.avatar} />
          <AvatarFallback>
            {post.author?.username?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <p className="font-semibold">{post.author?.username || "Unknown"}</p>
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>

        <div className="flex gap-2">
          {post.authorId === user?.id && (
            <>
              <Button variant="ghost" size="sm" onClick={() => setIsEditingPost(!isEditingPost)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDeletePostLocal}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </>
          )}
        </div>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="p-0">
        {isEditingPost ? (
          <div className="px-4 pb-3 space-y-3 pt-3">
             <Input 
                value={editPostTitle} 
                onChange={(e) => setEditPostTitle(e.target.value)} 
                placeholder="Post title" 
                className="font-semibold text-lg"
             />
             <Textarea 
                value={editPostContent} 
                onChange={(e) => setEditPostContent(e.target.value)} 
                placeholder="Post content"
                className="min-h-[100px]"
             />
             <div className="flex gap-2">
                <Button size="sm" onClick={handleUpdatePostLocal}>Save</Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditingPost(false)}>Cancel</Button>
             </div>
          </div>
        ) : (
          <Link href={`/post/${post.id}`}>
            <div className="px-4 pb-3">
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
            </div>
            {post.imageUrl && (
              <img src={post.imageUrl} className="w-full h-96 object-cover" />
            )}
          </Link>
        )}
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="flex flex-col items-stretch p-0">
        {/* ACTION BAR */}
        <div className="flex items-center gap-4 p-4 border-t">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleLike(post.id)}
            className="gap-2"
          >
            <Heart
              className={`w-5 h-5 ${liked ? "text-red-500 fill-red-500" : ""}`}
            />
            <span>{likeCount}</span>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowComments(!showComments)}
            className="gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{comments.length}</span>
          </Button>
        </div>

        {/* COMMENTS */}
        {showComments && (
          <div className="border-t p-4 space-y-4 bg-gray-50 w-full">
            {/* LIST */}
            {comments.map((c: any) => (
              <div key={c.id} className="bg-white p-3 rounded-lg">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={c.author?.avatar} />
                    <AvatarFallback>{c.author?.username?.[0] || "U"}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-semibold">
                        {c.author?.username || "Unknown"}
                      </p>

                      {c.authorId === user?.id && (
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setEditingId(c.id);
                              setEditingText(c.content);
                            }}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteComment(c.id)}
                          >
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {editingId === c.id ? (
                      <>
                        <Textarea
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="mt-2"
                        />
                        <Button
                          size="sm"
                          className="mt-2"
                          onClick={() => handleUpdateComment(c.id)}
                        >
                          Save
                        </Button>
                      </>
                    ) : (
                      <p className="text-sm text-gray-700">{c.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* CREATE */}
            <form action={handleCreateComment} ref={formRef} className="flex gap-3">
              <input type="hidden" name="postId" value={post.id} />
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.username?.[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 flex gap-2">
                <Textarea
                  name="content"
                  placeholder="Write a comment..."
                  className="min-h-[60px]"
                />
                <input type="hidden" name="postId" value={post.id} />

                <Button type="submit" size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
