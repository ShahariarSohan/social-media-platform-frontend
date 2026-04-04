/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/src/lib/serverFetch";
import { revalidateTag } from "next/cache";

/**
 * Follow a user
 */
export async function followUser(userId: string) {
  try {
    const response = await serverFetch.post(`/users/follow/${userId}`, {
      method: "POST",
    });

    const result = await response.json();
    revalidateTag("USERS","max");
    revalidateTag("USERINFO","max");
    return result;
  } catch (err: any) {
    console.error("Follow user error:", err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Failed to follow user",
    };
  }
}

/**
 * Unfollow a user
 */
export async function unfollowUser(userId: string) {
  try {
    const response = await serverFetch.post(`/users/unfollow/${userId}`, {
      method: "POST",
    });

    const result = await response.json();
    revalidateTag("USERS","max");
    revalidateTag("USERINFO","max");
    return result;
  } catch (err: any) {
    console.error("Unfollow user error:", err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Failed to unfollow user",
    };
  }
}
