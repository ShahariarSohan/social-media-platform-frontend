/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { TokenResult } from "@/src/types/token.interface";
import jwt, { JwtPayload } from "jsonwebtoken";

const verifiedAccessToken = async (token: string): Promise<TokenResult> => {
  try {
    const verifiedPayload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
    ) as JwtPayload;
    return {
      success: true,
      message: "Token is valid",
      payload: verifiedPayload,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Invalid token",
    };
  }
};

export default verifiedAccessToken;
