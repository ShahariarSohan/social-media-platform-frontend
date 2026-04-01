"use client";

import React, { useEffect, useState } from "react";
import { PenSquare } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import registerUser from "@/src/services/auth/register";

export default function Register() {
  const router = useRouter();

  // ✅ server action
  const [state, formAction, isPending] = useActionState(registerUser, null);

  // controlled inputs
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ handle response + redirect
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
      console.log("from register", state);
      // redirect to login
      setTimeout(() => {
        router.push("/login");
      }, 800);
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  // ✅ client-side validation before submit
  const handleFormAction = (formData: FormData) => {
    console.log("from register", formData);
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // if valid → call server action
    formAction(formData);
  };

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
              Join SocialHub today and connect with people who matter most to
              you.
            </p>
          </div>

          {/* Right side */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-xl border-0">
              <CardHeader className="text-center pb-4 pt-6">
                <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
                <CardDescription className="text-base">
                  It's quick and easy.
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-8 px-8">
                {/* ✅ useActionState form */}
                <form action={handleFormAction} className="space-y-3">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base"
                    required
                    disabled={isPending}
                  />

                  <Input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 text-base"
                    required
                    disabled={isPending}
                  />

                  <Input
                    name="password"
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 text-base"
                    required
                    disabled={isPending}
                  />

                  <Input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 text-base"
                    required
                    disabled={isPending}
                  />

                  <div className="pt-2">
                    <p className="text-xs text-gray-500 mb-4">
                      By clicking Sign Up, you agree to our Terms, Privacy
                      Policy and Cookies Policy.
                    </p>

                    <Button
                      type="submit"
                      className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600"
                      disabled={isPending}
                    >
                      {isPending ? "Creating account..." : "Sign Up"}
                    </Button>
                  </div>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                  <Link
                    href="/login"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Already have an account?
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
