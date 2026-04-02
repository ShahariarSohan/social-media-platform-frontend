
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/src/lib/serverFetch";

export const getAllUsers = async () => {
  try {
    const res = await serverFetch.get("/users", {
      next: { tags: ["USERS"] },
    });
    return await res.json();
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: err.message || "Failed to fetch users",
      data: [],
    };
  }
};
