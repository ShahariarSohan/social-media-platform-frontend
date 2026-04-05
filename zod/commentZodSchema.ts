// src/modules/comment/comment.validation.ts
import { z } from "zod";

export const createCommentZodSchema = z.object({
  postId: z.string().min(1, "postId is required"),
  content: z.string().min(1, "Content cannot be empty"),
  parentId: z.string().optional(),
});

export const updateCommentZodSchema = z.object({
  content: z.string().min(1, "Content cannot be empty"),
});
