/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import verifiedAccessToken from "@/src/lib/jwtHandlers";

import { serverFetch } from "@/src/lib/serverFetch";
import { setCookie } from "@/src/lib/tokenHandler";

import zodValidator from "@/src/lib/zodValidator";
import { loginValidationSchema } from "@/zod/authZodSchema";

import { JwtPayload } from "jsonwebtoken";

import { redirect } from "next/navigation";

const loginUser = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  try {
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log("from login user", payload);

    if (zodValidator(payload, loginValidationSchema).success === false) {
      return zodValidator(payload, loginValidationSchema);
    }
    const validatedPayload = zodValidator(payload, loginValidationSchema).data;
    const res = await serverFetch.post(`/auth/login`, {
      body: JSON.stringify(validatedPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    console.log("from login user", result);

    const accessToken = result?.data?.accessToken;
    const refreshToken = result?.data?.refreshToken;

    if (!accessToken) {
      throw new Error(
        `${
          result.message === "Incorrect Password!"
            ? "Incorrect Password!"
            : result.message === "Invalid user or email"
              ? "Invalid user or email"
              : "Something went wrong"
        }`,
      );
    }
    if (!refreshToken) {
      throw new Error(
        `${
          result.message === "Incorrect Password!"
            ? "Incorrect Password!"
            : result.message === "Invalid user or email"
              ? "Invalid user or email"
              : "Something went wrong"
        }`,
      );
    }
    await setCookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
    });
    await setCookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: "none",
    });

    const verifiedToken: JwtPayload | string =
      await verifiedAccessToken(accessToken);

    if (!verifiedToken.success) {
      throw new Error("You are not verified");
    }
    const userRole: any = verifiedToken?.payload.role;

    if (!result.success) {
      throw new Error(result.message || "Login failed");
    }
    redirect("/feed");
  } catch (err: any) {
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development" ? err.message : "Login failed"
      }`,
    };
  }
};

export default loginUser;
