"use server";

import { deleteCookie } from "@/src/lib/tokenHandler";
import { redirect } from "next/navigation";

const logoutUser = async () => {
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
  redirect("/login");
};

export default logoutUser;
