/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/src/lib/serverFetch";
import zodValidator from "@/src/lib/zodValidator";
import { updateMyProfileZodSchema } from "@/zod/authZodSchema";

import { revalidateTag } from "next/cache";

const updateMyProfile = async (formData: FormData) => {
  try {
    const payload = {
      name: formData.get("name"),
      contactNumber: formData.get("contactNumber"),
    };

    if (zodValidator(payload, updateMyProfileZodSchema).success === false) {
      return zodValidator(payload, updateMyProfileZodSchema);
    }
    const validatedPayload = zodValidator(
      payload,
      updateMyProfileZodSchema,
    ).data;

    const res = await serverFetch.patch("/user/update-my-profile", {
      body: JSON.stringify(validatedPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    revalidateTag("USERINFO", { expire: 0 });
    return result;
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong"
      }`,
    };
  }
};

export default updateMyProfile;
