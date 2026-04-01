/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/src/lib/serverFetch";
import zodValidator from "@/src/lib/zodValidator";
import { registerValidationSchema } from "@/zod/authZodSchema";

const registerUser = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  try {
    // ✅ Extract & normalize form data
    const payload = {
      email: formData.get("email")?.toString() || "",
      username: formData.get("username")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      bio: formData.get("bio")?.toString() || "",
    };

    console.log("Register payload:", payload);

    // ✅ Validate
    const validation = zodValidator(payload, registerValidationSchema);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      };
    }

    // ✅ API call
    const res = await serverFetch.post(`/auth/register`, {
      body: JSON.stringify(validation.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    console.log("Register result:", result);

    if (!result.success) {
      throw new Error(result.message || "Registration failed");
    }

    // ✅ Return success (NO redirect here)
    return {
      success: true,
      message: "Account created successfully 🎉",
    };
  } catch (err: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Registration failed",
    };
  }
};

export default registerUser;
