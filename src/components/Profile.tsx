"use client";

import React, { useState, useActionState, useEffect } from "react";

import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

import { Edit2, Save, X, Camera } from "lucide-react";
import { toast } from "sonner";
import updateMyProfile from "../services/auth/updateMyProfile";

const initialState = {
  success: false,
  message: "",
};

export default function Profile({ user }: any) {
  const [editing, setEditing] = useState(false);

  const [preview, setPreview] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState(
    updateMyProfile,
    initialState,
  );

  // Handle server response
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Profile updated");
      setEditing(false);
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  // Preview image instantly
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-0">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Profile</h2>

            {!editing ? (
              <Button onClick={() => setEditing(true)} variant="outline">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditing(false);
                    setPreview(null);
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>

                <Button form="profile-form" disabled={isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  {isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            )}
          </div>

          <Separator />

          {/* FORM */}
          <form id="profile-form" action={formAction} className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={preview || user?.avatar}
                    alt={user?.username}
                  />
                  <AvatarFallback>
                    {user?.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {editing && (
                  <label className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      name="avatar"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              {editing && (
                <p className="text-sm text-gray-500">
                  Click camera icon to upload avatar
                </p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label>Username</Label>
              {editing ? (
                <Input
                  name="username"
                  defaultValue={user?.username}
                  placeholder="Enter username"
                />
              ) : (
                <p className="text-lg font-medium">{user?.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <p className="text-gray-500">{user?.email}</p>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label>Bio</Label>
              {editing ? (
                <Textarea
                  name="bio"
                  defaultValue={user?.bio}
                  placeholder="Write something..."
                />
              ) : (
                <p className="text-gray-700">{user?.bio || "No bio yet"}</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
