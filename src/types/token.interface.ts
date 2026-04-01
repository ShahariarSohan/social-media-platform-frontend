import { JwtPayload } from "jsonwebtoken";

export interface TokenResult {
  success: boolean;
  message: string;
  payload?: JwtPayload;
}
