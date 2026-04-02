/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/src/lib/serverFetch";
import zodValidator from "@/src/lib/zodValidator";
import {
  createCommentZodSchema,
  updateCommentZodSchema,
} from "@/zod/commentZodSchema";

/**
 * Create Comment
 */
export async function createComment(_prevState: any, formData: FormData) {
  const validationPayload = {
    content: formData.get("content") as string,
    postId: formData.get("postId") as string,
  };

  const validated = zodValidator(validationPayload, createCommentZodSchema);

  if (!validated.success || !validated.data) {
    return {
      success: false,
      message: "Provide valid input",
      errors: validated.errors,
      formData: validationPayload,
    };
  }

  try {
    const response = await serverFetch.post("/comments", {
      body: JSON.stringify(validated.data),
      headers: { "Content-Type": "application/json" },
    });

    return await response.json();
  } catch (err: any) {
    console.error("Create comment error:", err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Failed to create comment",
      formData: validationPayload,
    };
  }
}

/**
 * Get My Comments
 */
export async function getMyComments() {
  try {
    const response = await serverFetch.get("/comments");
    return await response.json();
  } catch (err: any) {
    console.error("Get comments error:", err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    };
  }
}

/**
 * Get Comment By ID
 */
export async function getMyCommentById(id: string) {
  try {
    const response = await serverFetch.get(`/comments/${id}`);
    return await response.json();
  } catch (err: any) {
    console.error("Get comment error:", err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    };
  }
}

/**
 * Update Comment
 */
export async function updateComment(
  id: string,
  _prevState: any,
  formData: FormData,
) {
  const validationPayload = {
    content: formData.get("content") as string,
  };

  const validated = zodValidator(validationPayload, updateCommentZodSchema);

  if (!validated.success || !validated.data) {
    return {
      success: false,
      message: "Provide valid input",
      errors: validated.errors,
      formData: validationPayload,
    };
  }

  try {
    const response = await serverFetch.patch(`/comments/${id}`, {
      body: JSON.stringify(validated.data),
      headers: { "Content-Type": "application/json" },
    });

    return await response.json();
  } catch (err: any) {
    console.error("Update comment error:", err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Failed to update comment",
      formData: validationPayload,
    };
  }
}

/**
 * Delete Comment
 */
export async function deleteComment(id: string) {
  try {
    const response = await serverFetch.delete(`/comments/${id}`);
    return await response.json();
  } catch (err: any) {
    console.error("Delete comment error:", err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Failed to delete comment",
    };
  }
}
