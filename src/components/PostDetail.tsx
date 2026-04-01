

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Heart, ArrowLeft, Send, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Post } from "@/src/types/interface";

// Mock function to generate post data
const getMockPost = (postId: string, currentUser: any): Post => {
  const posts = [
    {
      id: "1",
      title: "Beautiful Mountain Landscape",
      content:
        "Just hiked to this amazing viewpoint! The fresh air and stunning scenery made it all worth it. Nature truly is the best therapy. 🏔️",
      imageUrl:
        "https://images.unsplash.com/photo-1600257729950-13a634d32697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzQ4ODYwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      authorId: "2",
      author: {
        id: "2",
        email: "sarah@example.com",
        username: "sarahwilson",
        role: "USER" as const,
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        bio: "Adventure seeker and nature lover",
        createdAt: new Date("2024-01-15").toISOString(),
        updatedAt: new Date("2024-01-15").toISOString(),
      },
      comments: [
        {
          id: "c1",
          content: "Wow! Where is this?",
          postId: "1",
          authorId: "3",
          author: {
            id: "3",
            email: "mike@example.com",
            username: "mikejohnson",
            role: "USER" as const,
            avatar:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
            createdAt: new Date("2024-02-01").toISOString(),
            updatedAt: new Date("2024-02-01").toISOString(),
          },
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "c2",
          content: "This is incredible! I need to visit this place.",
          postId: "1",
          authorId: currentUser?.id || "1",
          author: currentUser || {
            id: "1",
            email: "demo@example.com",
            username: "demouser",
            role: "USER" as const,
            avatar:
              "https://images.unsplash.com/photo-1770368787714-4e5a5ea557fd?w=400",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        },
      ],
      likes: [
        {
          id: "l1",
          postId: "1",
          userId: "3",
          createdAt: new Date().toISOString(),
        },
        {
          id: "l2",
          postId: "1",
          userId: currentUser?.id || "1",
          createdAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return posts.find((p) => p.id === postId) || posts[0];
};

export default function PostDetail() {
  // const [post, setPost] = useState<Post | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [commentText, setCommentText] = useState("");
  // const [submitting, setSubmitting] = useState(false);

  // useEffect(() => {
  //   const loadPost = async () => {
  //     setLoading(true);
  //     try {
  //       // In production, fetch from your backend API
  //       // const fetchedPost = await postApi.getPostById(postId!);
  //       // setPost(fetchedPost);

  //       // For demo, use mock data
  //       const mockPost = getMockPost(postId!, user);
  //       setPost(mockPost);
  //     } catch (error) {
  //       console.error("Failed to load post:", error);
  //       toast.error("Failed to load post");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadPost();
  // }, [postId, user]);

  // const handleLike = async () => {
  //   if (!post) return;

  //   const userLiked = post.likes.some((like) => like.userId === user?.id);

  //   setPost({
  //     ...post,
  //     likes: userLiked
  //       ? post.likes.filter((like) => like.userId !== user?.id)
  //       : [
  //           ...post.likes,
  //           {
  //             id: Date.now().toString(),
  //             postId: post.id,
  //             userId: user!.id,
  //             createdAt: new Date().toISOString(),
  //           },
  //         ],
  //   });
  // };

  // const handleAddComment = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!commentText.trim() || !post) return;

  //   setSubmitting(true);
  //   try {
  //     // In production, call your backend API
  //     // const newComment = await commentApi.createComment(post.id, commentText);

  //     // For demo, create mock comment
  //     const newComment: Comment = {
  //       id: Date.now().toString(),
  //       content: commentText,
  //       postId: post.id,
  //       authorId: user!.id,
  //       author: user!,
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString(),
  //     };

  //     setPost({
  //       ...post,
  //       comments: [...post.comments, newComment],
  //     });

  //     setCommentText("");
  //     toast.success("Comment added");
  //   } catch (error) {
  //     toast.error("Failed to add comment");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  // const handleDeleteComment = async (commentId: string) => {
  //   if (!post || !window.confirm("Delete this comment?")) return;

  //   try {
  //     // In production, call your backend API
  //     // await commentApi.deleteComment(commentId);

  //     setPost({
  //       ...post,
  //       comments: post.comments.filter((c) => c.id !== commentId),
  //     });

  //     toast.success("Comment deleted");
  //   } catch (error) {
  //     toast.error("Failed to delete comment");
  //   }
  // };

  // if (loading) {
  //   return <div className="text-center py-12">Loading...</div>;
  // }

  // if (!post) {
  //   return <div className="text-center py-12">Post not found</div>;
  // }

  // const liked = post.likes.some((like) => like.userId === user?.id);

  // return (
  //   <div className="max-w-3xl mx-auto">
  //     <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
  //       <ArrowLeft className="w-4 h-4 mr-2" />
  //       Back
  //     </Button>

  //     <Card className="overflow-hidden">
  //       <CardHeader className="flex flex-row items-center gap-4 p-6">
  //         <Avatar className="w-12 h-12">
  //           <AvatarImage src={post.author.avatar} alt={post.author.username} />
  //           <AvatarFallback>
  //             {post.author.username.charAt(0).toUpperCase()}
  //           </AvatarFallback>
  //         </Avatar>
  //         <div className="flex-1">
  //           <p className="font-semibold text-lg">{post.author.username}</p>
  //           <p className="text-sm text-gray-500">
  //             {formatDistanceToNow(new Date(post.createdAt), {
  //               addSuffix: true,
  //             })}
  //           </p>
  //         </div>
  //       </CardHeader>

  //       <CardContent className="p-0">
  //         <div className="px-6 pb-4">
  //           <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
  //           <p className="text-gray-700 text-lg">{post.content}</p>
  //         </div>
  //         {post.imageUrl && (
  //           <img
  //             src={post.imageUrl}
  //             alt={post.title}
  //             className="w-full max-h-[600px] object-cover"
  //           />
  //         )}
  //       </CardContent>

  //       <CardFooter className="flex items-center gap-4 p-6 border-t">
  //         <Button
  //           variant="ghost"
  //           size="sm"
  //           className="gap-2"
  //           onClick={handleLike}
  //         >
  //           <Heart
  //             className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : ""}`}
  //           />
  //           <span>{post.likes.length}</span>
  //         </Button>
  //       </CardFooter>

  //       <Separator />

  //       {/* Comments Section */}
  //       <div className="p-6">
  //         <h2 className="font-semibold text-lg mb-4">
  //           Comments ({post.comments.length})
  //         </h2>

  //         {/* Add Comment Form */}
  //         <form onSubmit={handleAddComment} className="mb-6">
  //           <div className="flex gap-3">
  //             <Avatar className="w-10 h-10">
  //               <AvatarImage src={user?.avatar} alt={user?.username} />
  //               <AvatarFallback>
  //                 {user?.username?.charAt(0).toUpperCase()}
  //               </AvatarFallback>
  //             </Avatar>
  //             <div className="flex-1 space-y-2">
  //               <Textarea
  //                 placeholder="Write a comment..."
  //                 value={commentText}
  //                 onChange={(e) => setCommentText(e.target.value)}
  //                 rows={3}
  //               />
  //               <div className="flex justify-end">
  //                 <Button
  //                   type="submit"
  //                   size="sm"
  //                   disabled={!commentText.trim() || submitting}
  //                 >
  //                   <Send className="w-4 h-4 mr-2" />
  //                   {submitting ? "Posting..." : "Post Comment"}
  //                 </Button>
  //               </div>
  //             </div>
  //           </div>
  //         </form>

  //         {/* Comments List */}
  //         <div className="space-y-4">
  //           {post.comments.length === 0 ? (
  //             <p className="text-center text-gray-500 py-8">
  //               No comments yet. Be the first to comment!
  //             </p>
  //           ) : (
  //             post.comments.map((comment) => (
  //               <div key={comment.id} className="flex gap-3">
  //                 <Avatar className="w-10 h-10">
  //                   <AvatarImage
  //                     src={comment.author.avatar}
  //                     alt={comment.author.username}
  //                   />
  //                   <AvatarFallback>
  //                     {comment.author.username.charAt(0).toUpperCase()}
  //                   </AvatarFallback>
  //                 </Avatar>
  //                 <div className="flex-1 bg-gray-100 rounded-lg p-3">
  //                   <div className="flex items-start justify-between">
  //                     <div className="flex-1">
  //                       <p className="font-semibold text-sm">
  //                         {comment.author.username}
  //                       </p>
  //                       <p className="text-xs text-gray-500 mb-1">
  //                         {formatDistanceToNow(new Date(comment.createdAt), {
  //                           addSuffix: true,
  //                         })}
  //                       </p>
  //                       <p className="text-gray-800">{comment.content}</p>
  //                     </div>
  //                     {comment.authorId === user?.id && (
  //                       <Button
  //                         variant="ghost"
  //                         size="sm"
  //                         onClick={() => handleDeleteComment(comment.id)}
  //                       >
  //                         <Trash2 className="w-4 h-4 text-red-500" />
  //                       </Button>
  //                     )}
  //                   </div>
  //                 </div>
  //               </div>
  //             ))
  //           )}
  //         </div>
  //       </div>
  //     </Card>
  //   </div>
  // );

  return (
    <div>
      <h1>Post Detail</h1>
    </div>
  );
}
