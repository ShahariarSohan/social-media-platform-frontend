import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Edit2, Save, X } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  //   const { user, updateUser } = useAuth();
  // const [editing, setEditing] = useState(false);
  // const [username, setUsername] = useState(user?.username || "");
  // const [bio, setBio] = useState(user?.bio || "");
  // const [avatar, setAvatar] = useState(user?.avatar || "");
  // const [loading, setLoading] = useState(false);

  // const handleSave = async () => {
  //   setLoading(true);
  //   try {
  //     // In production, call your backend API
  //     // const updatedUser = await userApi.updateProfile(user!.id, {
  //     //   username,
  //     //   bio,
  //     //   avatar,
  //     // });
  //     // updateUser(updatedUser);

  //     // For demo, update local state
  //     const updatedUser = {
  //       ...user!,
  //       username,
  //       bio,
  //       avatar,
  //       updatedAt: new Date().toISOString(),
  //     };
  //     updateUser(updatedUser);

  //     toast.success("Profile updated successfully");
  //     setEditing(false);
  //   } catch (error) {
  //     toast.error("Failed to update profile");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleCancel = () => {
  //   setUsername(user?.username || "");
  //   setBio(user?.bio || "");
  //   setAvatar(user?.avatar || "");
  //   setEditing(false);
  // };

  // if (!user) {
  //   return null;
  // }

  // return (
  //   <div className="max-w-2xl mx-auto">
  //     <Card>
  //       <CardHeader className="flex flex-row items-center justify-between">
  //         <CardTitle>Profile</CardTitle>
  //         {!editing ? (
  //           <Button
  //             onClick={() => setEditing(true)}
  //             variant="outline"
  //             size="sm"
  //           >
  //             <Edit2 className="w-4 h-4 mr-2" />
  //             Edit Profile
  //           </Button>
  //         ) : (
  //           <div className="flex gap-2">
  //             <Button onClick={handleCancel} variant="outline" size="sm">
  //               <X className="w-4 h-4 mr-2" />
  //               Cancel
  //             </Button>
  //             <Button onClick={handleSave} size="sm" disabled={loading}>
  //               <Save className="w-4 h-4 mr-2" />
  //               {loading ? "Saving..." : "Save"}
  //             </Button>
  //           </div>
  //         )}
  //       </CardHeader>
  //       <Separator />
  //       <CardContent className="pt-6">
  //         <div className="space-y-6">
  //           {/* Avatar Section */}
  //           <div className="flex items-center gap-6">
  //             <Avatar className="w-24 h-24">
  //               <AvatarImage
  //                 src={editing ? avatar : user.avatar}
  //                 alt={user.username}
  //               />
  //               <AvatarFallback className="text-2xl">
  //                 {user.username.charAt(0).toUpperCase()}
  //               </AvatarFallback>
  //             </Avatar>
  //             {editing && (
  //               <div className="flex-1 space-y-2">
  //                 <Label htmlFor="avatar">Avatar URL</Label>
  //                 <Input
  //                   id="avatar"
  //                   type="url"
  //                   placeholder="https://example.com/avatar.jpg"
  //                   value={avatar}
  //                   onChange={(e) => setAvatar(e.target.value)}
  //                 />
  //                 <p className="text-xs text-gray-500">
  //                   Enter a URL to an image or leave empty for default avatar
  //                 </p>
  //               </div>
  //             )}
  //           </div>

  //           {/* Username */}
  //           <div className="space-y-2">
  //             <Label htmlFor="username">Username</Label>
  //             {editing ? (
  //               <Input
  //                 id="username"
  //                 value={username}
  //                 onChange={(e) => setUsername(e.target.value)}
  //                 placeholder="Enter username"
  //               />
  //             ) : (
  //               <p className="text-lg">{user.username}</p>
  //             )}
  //           </div>

  //           {/* Email (read-only) */}
  //           <div className="space-y-2">
  //             <Label htmlFor="email">Email</Label>
  //             <p className="text-lg text-gray-600">{user.email}</p>
  //             <p className="text-xs text-gray-500">Email cannot be changed</p>
  //           </div>

  //           {/* Bio */}
  //           <div className="space-y-2">
  //             <Label htmlFor="bio">Bio</Label>
  //             {editing ? (
  //               <Textarea
  //                 id="bio"
  //                 value={bio}
  //                 onChange={(e) => setBio(e.target.value)}
  //                 placeholder="Tell us about yourself..."
  //                 rows={4}
  //               />
  //             ) : (
  //               <p className="text-gray-700">{user.bio || "No bio yet"}</p>
  //             )}
  //           </div>

  //           {/* Account Info */}
  //           <Separator />
  //           <div className="space-y-2">
  //             <h3 className="font-semibold">Account Information</h3>
  //             <div className="text-sm text-gray-600 space-y-1">
  //               <p>
  //                 Role: <span className="font-medium">{user.role}</span>
  //               </p>
  //               <p>
  //                 Member since:{" "}
  //                 <span className="font-medium">
  //                   {new Date(user.createdAt).toLocaleDateString("en-US", {
  //                     year: "numeric",
  //                     month: "long",
  //                     day: "numeric",
  //                   })}
  //                 </span>
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   </div>
  // );
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}
