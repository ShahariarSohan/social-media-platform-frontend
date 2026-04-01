"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { PenSquare } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useActionState } from "react";
import loginUser from "@/src/services/auth/loginUser";
import { useRouter } from "next/navigation";
// 👈 your server action

export default function Login() {
  // ✅ useActionState
  const [state, formAction, isPending] = useActionState(loginUser, null);
  const router = useRouter();
  // controlled inputs (same as before)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ handle response
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Welcome back!");
      router.push("/feed");
      // redirect handled in server OR you can use router.push()
    } else {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side */}
          <div className="text-center md:text-left px-4">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <PenSquare className="w-9 h-9 text-white" />
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SocialHub
              </h1>
            </div>
            <p className="text-2xl text-gray-600 max-w-md mx-auto md:mx-0">
              Connect with friends and the world around you on SocialHub.
            </p>
          </div>

          {/* Right side */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-xl border-0">
              <CardContent className="pt-6 pb-8 px-8">
                {/* ✅ IMPORTANT CHANGE */}
                <form action={formAction} className="space-y-4">
                  <Input
                    name="email" // 👈 required for server action
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base"
                    required
                    disabled={isPending}
                  />

                  <Input
                    name="password" // 👈 required
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 text-base"
                    required
                    disabled={isPending}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600"
                    disabled={isPending}
                  >
                    {isPending ? "Signing in..." : "Log In"}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or</span>
                  </div>
                </div>

                {/* Keep your register button */}
                <div className="text-center">
                  <Link href="/register">
                    <Button
                      type="button"
                      variant="outline"
                      className="px-8 py-6 h-12 font-semibold text-base border-2"
                    >
                      Create New Account
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
