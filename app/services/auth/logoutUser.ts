"use server";


import { deleteCookie } from "@/lib/tokenHandler";
import { redirect } from "next/navigation";

const logoutUser = async () => {
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
  redirect("/login?loggedOut=true");
};

export default logoutUser;
