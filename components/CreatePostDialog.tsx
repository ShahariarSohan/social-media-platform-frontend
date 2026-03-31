import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { PlusCircle, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";
import { Post } from "@/types/interface";

interface CreatePostDialogProps {
  editPost?: Post | null;
  onSubmit: (
    data: { title: string; content: string; imageUrl?: string },
    postId?: string,
  ) => Promise<void>;
  onClose?: () => void;
}

export default function CreatePostDialog({
  editPost,
  onSubmit,
  onClose,
}: CreatePostDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setContent(editPost.content);
      setImageUrl(editPost.imageUrl || "");
      setOpen(true);
    }
  }, [editPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setLoading(true);

    try {
      await onSubmit(
        { title, content, imageUrl: imageUrl || undefined },
        editPost?.id,
      );
      toast.success(
        editPost ? "Post updated successfully" : "Post created successfully",
      );
      handleClose();
    } catch (error) {
      toast.error(editPost ? "Failed to update post" : "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setContent("");
    setImageUrl("");
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          handleClose();
        }
      }}
    >
      <DialogTrigger asChild>
        {!editPost && (
          <Button className="gap-2">
            <PlusCircle className="w-5 h-5" />
            Create Post
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editPost ? "Edit Post" : "Create New Post"}
          </DialogTitle>
          <DialogDescription>
            {editPost
              ? "Make changes to your existing post."
              : "Create a new post to share with your community."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              {imageUrl && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setImageUrl("")}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {imageUrl && (
              <div className="mt-2 relative">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md"
                  onError={() => {
                    toast.error("Invalid image URL");
                    setImageUrl("");
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : editPost ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
