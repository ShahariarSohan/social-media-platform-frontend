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
import { useRouter } from "next/navigation";
import { useState, useRef, useActionState, useEffect } from "react";
import Swal from "sweetalert2";

import { toggleLike } from "../services/userActivities/like";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../services/userActivities/comment";
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
      setLikeCount((prev: any) => (isLiked ? prev + 1 : prev - 1));
    } catch {
      toast.error("Failed to like post");
    }
  };

  // ---------------- POST ACTIONS ----------------
  const router = useRouter();
  const [isEditingPost, setIsEditingPost] = useState(false);

  const [updatePostState, updatePostAction, isUpdatePostPending] = useActionState(
    updatePost.bind(null, post.id),
    null
  );

  useEffect(() => {
    if (updatePostState?.success) {
      toast.success("Post updated successfully");
      setIsEditingPost(false);
      router.refresh();
    } else if (updatePostState?.success === false) {
      toast.error(updatePostState?.message || "Failed to update post");
    }
  }, [updatePostState, router]);

  const handleDeletePostLocal = async () => {
    const confirmResult = await Swal.fire({
      title: "Delete this post?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Delete"
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const res = await deletePost(post.id);
      if (res?.success) {
        toast.success("Post deleted");
        router.refresh();
      } else {
        toast.error(res?.message || "Delete failed");
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);

  // CREATE
  const formRef = useRef<HTMLFormElement>(null);
  const handleCreateComment = async (formData: FormData) => {
    const res = await createComment(null, formData);

    if (res?.success) {
      toast.success(replyingToId ? "Reply added" : "Comment added");
      
      const newComment = { 
        ...res?.data, 
        author: res?.data?.author || user, 
        replies: res?.data?.replies || [] 
      };
      
      // Update local state directly for immediate feedback (optimistic-ish)
      setComments((prev: any) => {
        const exists = prev.some((c: any) => c.id === newComment.id) || 
                       prev.some((c: any) => c.replies?.some((r: any) => r.id === newComment.id));
        if (exists) return prev;

        if (replyingToId) {
          return prev.map((c: any) =>
            String(c.id) === String(replyingToId)
              ? { ...c, replies: [newComment, ...(c.replies || [])] }
              : c
          );
        } else {
          return [newComment, ...prev];
        }
      });
      
      setReplyingToId(null);
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
        prev.map((c: any) => {
          if (String(c.id) === String(id)) return { ...c, content: editingText };
          return {
            ...c,
            replies: c.replies?.map((r: any) => (String(r.id) === String(id) ? { ...r, content: editingText } : r))
          };
        })
      );
      setEditingId(null);
      setEditingText("");
    } else {
      toast.error(res?.message || "Update failed");
    }
  };

  // DELETE
  const handleDeleteComment = async (id: string) => {
    const confirmResult = await Swal.fire({
      title: "Delete comment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Delete"
    });

    if (!confirmResult.isConfirmed) return;

    const res = await deleteComment(id);

    if (res?.success) {
      toast.success("Deleted");
      setComments((prev: any) => 
        prev
          .filter((c: any) => c.id !== id) // Remove if it's a top-level comment
          .map((c: any) => ({
            ...c,
            replies: c.replies?.filter((r: any) => r.id !== id) // Remove if it's a reply
          }))
      );
    } else {
      toast.error(res?.message || "Delete failed");
    }
  };

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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingPost(!isEditingPost)}
              >
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
          <form action={updatePostAction} className="px-4 pb-3 space-y-3 pt-3">
            <Input
              name="title"
              defaultValue={post.title}
              placeholder="Post title"
              className="font-semibold text-lg"
              disabled={isUpdatePostPending}
            />
            <Textarea
              name="content"
              defaultValue={post.content}
              placeholder="Post content"
              className="min-h-[100px]"
              disabled={isUpdatePostPending}
            />
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={isUpdatePostPending}>
                {isUpdatePostPending ? "Saving..." : "Save"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                type="button"
                onClick={() => setIsEditingPost(false)}
                disabled={isUpdatePostPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Link href={`/post/${post.id}`}>
            <div className="px-4 pb-3">
              <h3 className="font-semibold text-base md:text-lg">{post.title}</h3>
              <p className="text-sm md:text-base text-gray-700">{post.content}</p>
            </div>
            {post.imageUrl && (
              <div className="relative w-full overflow-hidden bg-gray-100">
                <img 
                  src={post.imageUrl} 
                  className="w-full h-auto max-h-[500px] object-contain md:object-cover" 
                  alt={post.title}
                />
              </div>
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
            <span>
              {comments.length + comments.reduce((acc: number, c: any) => acc + (c.replies?.length || 0), 0)}
            </span>
          </Button>
        </div>

        {/* COMMENTS */}
        {showComments && (
          <div className="border-t p-4 space-y-4 bg-gray-50 w-full">
            {/* LIST */}
            {comments.map((c: any) => (
              <div key={c.id} className="bg-white p-3 rounded-lg space-y-3">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={c.author?.avatar} />
                    <AvatarFallback>
                      {c.author?.username?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-semibold">
                        {c.author?.username || "Unknown"}
                      </p>

                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          onClick={() => {
                            if (replyingToId === c.id) {
                              setReplyingToId(null);
                            } else {
                              setReplyingToId(c.id);
                              setEditingId(null);
                            }
                          }}
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </Button>

                        {c.authorId === user?.id && (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7"
                              onClick={() => {
                                setEditingId(c.id);
                                setEditingText(c.content);
                                setReplyingToId(null);
                              }}
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </Button>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7"
                              onClick={() => handleDeleteComment(c.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {editingId === c.id ? (
                      <div className="mt-2 space-y-2">
                        <Textarea
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="min-h-[60px]"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleUpdateComment(c.id)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700">{c.content}</p>
                    )}
                  </div>
                </div>

                {/* REPLY INPUT */}
                {replyingToId === c.id && (
                  <div className="ml-11">
                    <form
                      action={handleCreateComment}
                      className="flex gap-2"
                    >
                      <input type="hidden" name="postId" value={post.id} />
                      <input type="hidden" name="parentId" value={c.id} />
                      <Textarea
                        name="content"
                        placeholder={`Reply to ${c.author?.username}...`}
                        className="min-h-[60px] text-sm"
                        autoFocus
                      />
                      <Button type="submit" size="icon" className="h-10 w-10 shrink-0">
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                )}

                {/* NESTED REPLIES */}
                {c.replies && c.replies.length > 0 && (
                  <div className="ml-11 space-y-3 border-l-2 border-gray-100 pl-4">
                    {c.replies.map((reply: any) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={reply.author?.avatar} />
                          <AvatarFallback>
                            {reply.author?.username?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="text-xs font-semibold">
                              {reply.author?.username || "Unknown"}
                            </p>
                            {reply.authorId === user?.id && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-5 w-5"
                                onClick={() => handleDeleteComment(reply.id)}
                              >
                                <Trash2 className="w-3 h-3 text-red-500" />
                              </Button>
                            )}
                          </div>
                          <p className="text-xs text-gray-700">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* CREATE */}
            <form
              action={handleCreateComment}
              ref={formRef}
              className="flex gap-3"
            >
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
