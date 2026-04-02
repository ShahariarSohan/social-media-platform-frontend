/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/src/lib/serverFetch";
import zodValidator from "@/src/lib/zodValidator";
import { createPostZodSchema, updatePostZodSchema } from "@/zod/postZodSchema";
import { revalidateTag } from "next/cache";

/**
 * Create a new Post
 */
export async function createPost(_prevState: any, formData: FormData) {
  // Extract title and content for validation
  const validationPayload = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  const validated = zodValidator(validationPayload, createPostZodSchema);

  if (!validated.success || !validated.data) {
    return {
      success: false,
      message: "Provide required or valid input",
      errors: validated.errors,
      formData: validationPayload,
    };
  }

  try {
    // Append validated fields to FormData
    const sendData = new FormData();
    sendData.append("title", validated.data.title as string);
    sendData.append("content", validated.data.content as string);

    // Append image if a valid file is present
    const imageFile = formData.get("image") as File | null;
    if (imageFile && imageFile.name && imageFile.size > 0) {
      sendData.append("image", imageFile);
    }

    const response = await serverFetch.post("/posts", {
      body: sendData, // Send as FormData
      // NOTE: Do NOT set Content-Type manually for multipart/form-data
    });

    const result = await response.json();
    console.log("result from create post", result);
    revalidateTag("POSTS", "max");
    return result;
  } catch (err: any) {
    console.error("Create post error:", err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Failed to create post",
      formData: validationPayload,
    };
  }
}

/**
 * Get all posts (optionally with query)
 */
export async function getMyPosts(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/posts${queryString ? `?${queryString}` : ""}`,
    );
    return await response.json();
  } catch (err: any) {
    console.error("Get posts error:", err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    };
  }
}
export async function getAllPosts(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/admin/posts${queryString ? `?${queryString}` : ""}`,
    );
    return await response.json();
  } catch (err: any) {
    console.error("Get posts error:", err);
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
 * Get post by ID
 */
export async function getPostById(id: string) {
  try {
    const response = await serverFetch.get(`/posts/${id}`);
    return await response.json();
  } catch (err: any) {
    console.error("Get post by ID error:", err);
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
 * Update a post
 */
export async function updatePost(
  id: string,
  _prevState: any,
  formData: FormData,
) {
  // Build payload from formData
  const validationPayload = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  // Validate using Zod
  const validated = zodValidator(validationPayload, updatePostZodSchema);

  if (!validated.success || !validated.data) {
    return {
      success: false,
      message: "Provide required or valid input",
      errors: validated.errors,
      formData: validationPayload,
    };
  }

  const backendPayload = {
    title: validated.data.title,
    content: validated.data.content,
  };

  try {
    const response = await serverFetch.patch(`/posts/${id}`, {
      body: JSON.stringify(backendPayload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    revalidateTag("POSTS", "max");
    return result;
  } catch (err: any) {
    console.error("Update post error:", err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Failed to update post",
      formData: validationPayload,
    };
  }
}

/**
 * Delete a post
 */
export async function deletePost(id: string) {
  try {
    const response = await serverFetch.delete(`/posts/${id}`);
    const result = await response.json();
    revalidateTag("POSTS", "max");
    return result;
  } catch (err: any) {
    console.error("Delete post error:", err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Failed to delete post",
    };
  }
}
