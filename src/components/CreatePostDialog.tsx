"use client";

import React, { useState, useEffect, useRef } from "react";
import { useActionState } from "react";



import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";

import { PlusCircle, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { Post } from "../types/interface";
import { createPost } from "../services/userActivities/post";

interface CreatePostDialogProps {
  editPost?: Post | null;
  onClose?: () => void;
}

const initialState = {
  success: false,
  message: "",
};

export default function CreatePostDialog({
  editPost,
  onClose,
}: CreatePostDialogProps) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, formAction, isPending] = useActionState(
    createPost,
    initialState,
  );

  // Open dialog in edit mode
  useEffect(() => {
    if (editPost) {
      setOpen(true);
      setImagePreview(editPost.imageUrl || "");
    }
  }, [editPost]);

  // Handle response
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Success");
      handleClose();
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  // Image preview handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    setOpen(false);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) handleClose();
      }}
    >
      {/* Trigger */}
      {!editPost && (
        <DialogTrigger asChild>
          <Button className="gap-2">
            <PlusCircle className="w-5 h-5" />
            Create Post
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editPost ? "Edit Post" : "Create New Post"}
          </DialogTitle>
          <DialogDescription>
            {editPost
              ? "Update your post"
              : "Share something with your community"}
          </DialogDescription>
        </DialogHeader>

        {/* ✅ IMPORTANT: form uses action instead of onSubmit */}
        <form action={formAction} className="space-y-4">
          {/* Hidden ID for edit */}
          {editPost && (
            <input type="hidden" name="postId" value={editPost.id} />
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              defaultValue={editPost?.title}
              placeholder="Enter post title..."
              required
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea
              name="content"
              defaultValue={editPost?.content}
              placeholder="What's on your mind?"
              rows={5}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Image (optional)</Label>

            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {!imagePreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400"
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Click to upload image</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : editPost ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
