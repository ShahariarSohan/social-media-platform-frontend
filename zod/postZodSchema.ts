// src/modules/post/post.validation.ts
import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(1, "Content cannot be empty"),
  imageUrl: z.string().optional(),
});

export const updatePostSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(1).optional(),
});
