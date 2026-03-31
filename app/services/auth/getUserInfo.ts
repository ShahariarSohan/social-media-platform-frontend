/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getCookie } from "@/lib/tokenHandler";
import { User } from "@/types/interface";

import jwt, { JwtPayload } from "jsonwebtoken";

const getUserInfo = async (): Promise<User | any> => {
  let userInfo: User | any;

  try {
    const res = await serverFetch.get("/auth/me", {
      cache: "force-cache",
      next: { tags: ["USERINFO"] },
    });
    const result = await res.json();
    if (result.success) {
      const accessToken = await getCookie("accessToken");
      if (!accessToken) {
        throw new Error("No token found");
      }
      const verifiedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string,
      ) as JwtPayload;
      userInfo = {
        name: verifiedToken.name || "Unknown User",
        email: verifiedToken.email,
        role: verifiedToken.role,
      };
    }

    userInfo = {
      name:
        result.data.admin?.name ||
        result.data.employee?.name ||
        result.data.manager?.name ||
        result.data?.name ||
        "Unknown User",
      ...result.data,
    };

    return userInfo;
  } catch (err) {
    console.log(err);
    return {
      id: "",
      name: "Unknown User",
      email: "",
      role: "EMPLOYEE",
    };
  }
};

export default getUserInfo;
