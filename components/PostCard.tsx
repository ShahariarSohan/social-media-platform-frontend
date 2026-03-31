import React, { useState } from "react";


import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Heart, MessageCircle, Trash2, Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import Link from "next/link";
import { Post } from "@/types/interface";

interface PostCardProps {
  post: any;
  onDelete?: () => void;
  onEdit?: () => void;
  onLike?: () => void;
}

export default function PostCard({
  post,
  onDelete,
  onEdit,
  onLike,
}: PostCardProps) {
//   const { user } = useAuth();
  // const [liked, setLiked] = useState(
  //   post.likes.some((like) => like.userId === user?.id),
  // );
  // const [likeCount, setLikeCount] = useState(post.likes.length);

  // const isAuthor = user?.id === post.authorId;

  // const handleLike = async () => {
  //   if (!onLike) return;

  //   try {
  //     await onLike(post.id);
  //     setLiked(!liked);
  //     setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  //   } catch (error) {
  //     toast.error("Failed to like post");
  //   }
  // };

  const handleDelete = async () => {
    if (
      !onDelete ||
      !window.confirm("Are you sure you want to delete this post?")
    )
      return;

    try {
      await onDelete(post.id);
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };
  const isAuthor = true;
  const liked = true;
  const likeCount=10
  return (

     <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
           <AvatarImage src={post.author.avatar} alt={post.author.username} />
         <AvatarFallback>
           {post.author.username.charAt(0).toUpperCase()}
         </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{post.author.username}</p>
        <p className="text-xs text-gray-500">
             {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
           </p>
         </div>
           {isAuthor && (
          <div className="flex gap-2">
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={() => onEdit(post)}>
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button variant="ghost" size="sm" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <Link href={`/post/${post.id}`}>
          <div className="px-4 pb-3">
            <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
          </div>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          )}
        </Link>
      </CardContent>

      <CardFooter className="flex items-center gap-4 p-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={()=>{}}
        >
          <Heart
            className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : ""}`}
          />
          <span>{likeCount}</span>
        </Button>
        <Link href={`/post/${post.id}`}>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments.length}</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
 
}

