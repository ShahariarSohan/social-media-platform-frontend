/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/src/lib/serverFetch";
import zodValidator from "@/src/lib/zodValidator";
import { updateMyProfileZodSchema } from "@/zod/authZodSchema";
import { revalidateTag } from "next/cache";

const updateMyProfile = async (_: any, formData: FormData) => {
  try {
    const username = formData.get("username");
    const bio = formData.get("bio");
    const avatar = formData.get("avatar") as File;

    // Build payload dynamically (ONLY send changed fields)
    const payload: Record<string, any> = {};

    if (username) payload.username = username;
    if (bio) payload.bio = bio;

    // Validate ONLY text fields
    const validation = zodValidator(payload, updateMyProfileZodSchema);
    if (!validation.success) return validation;

    // Build FormData to send to backend
    const sendData = new FormData();

    if (validation.data?.username)
      sendData.append("username", validation.data.username);

    if (validation.data?.bio) sendData.append("bio", validation.data.bio);

    // Append avatar ONLY if file exists
    if (avatar && avatar.size > 0) {
      sendData.append("avatar", avatar);
    }

    const res = await serverFetch.patch("/auth/updateMe", {
      body: sendData, // ✅ IMPORTANT: no JSON
    });

    const result = await res.json();

    revalidateTag("USERINFO", {expire:0});

    return result;
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    };
  }
};

export default updateMyProfile;
