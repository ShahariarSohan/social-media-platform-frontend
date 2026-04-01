/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import { serverFetch } from "@/src/lib/serverFetch";
import { revalidateTag } from "next/cache";

/**
 * Toggle Like for a Post
 * @param postId string
 */
export async function toggleLike(postId: string) {
  try {
    const response = await serverFetch.post(`/likes/toggle/${postId}`);

    const result = await response.json();

    // Revalidate posts so UI updates
    revalidateTag("POSTS", "max");

    return result;
  } catch (error: any) {
    console.error("Toggle like error:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to toggle like",
    };
  }
}
