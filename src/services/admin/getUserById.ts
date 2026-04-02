
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/src/lib/serverFetch";

export const getUserById = async (id: string) => {
  try {
    const res = await serverFetch.get(`/users/${id}`, {
      next: { tags: ["USER_PROFILE"] },
    });
    return await res.json();
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: err.message || "Failed to fetch user",
      data: null,
    };
  }
};
