// src/modules/comment/comment.validation.ts
import { z } from "zod";

export const createCommentSchema = z.object({
  postId: z.string().min(1, "postId is required"),
  content: z.string().min(1, "Content cannot be empty"),
});

export const updateCommentSchema = z.object({
  content: z.string().min(1, "Content cannot be empty"),
});
