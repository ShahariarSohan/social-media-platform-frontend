
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { UserPlus, UserMinus, Mail, Calendar, MessageSquare, Heart, FileText } from "lucide-react";
import { format } from "date-fns";
import PostCard from "./PostCard";
import { Separator } from "./ui/separator";
import FollowButton from "./FollowButton";

interface UserProfileDetailsProps {
  profileUser: any;
  currentUser: any;
}

export default function UserProfileDetails({ profileUser, currentUser }: UserProfileDetailsProps) {
  // Check if current user is following this profile
  const isCurrentlyFollowing = currentUser?.following?.some(
    (f: any) => f.followingId === profileUser.id
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* PROFILE HEADER / COVER */}
      <div className="relative group">
        <div className="h-48 md:h-64 rounded-xl bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 shadow-lg overflow-hidden relative">
           <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-500"></div>
        </div>
        
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <div className="relative">
            <div className="p-1 rounded-full bg-background ring-4 ring-background shadow-xl">
              <Avatar className="h-32 w-32 border-2 border-inherit">
                <AvatarImage src={profileUser.avatar || ""} />
                <AvatarFallback className="text-3xl font-bold bg-muted">
                  {profileUser.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          <div className="mb-4 space-y-1 hidden md:block">
            <h1 className="text-3xl font-bold text-foreground drop-shadow-sm">{profileUser.username}</h1>
            <p className="text-sm text-foreground/80 flex items-center gap-1 font-medium italic">
                <Mail className="w-3 h-3" /> {profileUser.email}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20 pt-10 px-4">
        {/* LEFT COLUMN: INFO & STATS */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 space-y-6">
               <div className="md:hidden space-y-1 pb-4 border-b">
                 <h1 className="text-2xl font-bold">{profileUser.username}</h1>
                 <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="w-3 h-3" /> {profileUser.email}
                 </p>
               </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">About</h3>
                <p className="text-sm leading-relaxed">
                  {profileUser.bio || "No bio provided yet. A mysterious soul... 🎭"}
                </p>
              </div>

              <Separator className="opacity-50" />

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {format(new Date(profileUser.createdAt), "MMMM yyyy")}</span>
                </div>
                {profileUser.role === "ADMIN" && (
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 w-fit">
                    Platform Administrator
                  </div>
                )}
              </div>

              <Separator className="opacity-50" />

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-xl font-bold text-primary">{profileUser.posts?.length || 0}</p>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">Posts</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-xl font-bold text-primary">{profileUser.comments?.length || 0}</p>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">Comments</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-xl font-bold text-primary">{profileUser.likes?.length || 0}</p>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">Likes</p>
                </div>
              </div>

              {profileUser.id !== currentUser?.id && (
                <div className="w-full h-11">
                  <FollowButton 
                    userId={profileUser.id} 
                    isFollowing={isCurrentlyFollowing} 
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: POSTS FEED */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 px-2">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold uppercase tracking-tight">Recent Activity</h2>
          </div>

          <div className="space-y-6">
            {profileUser.posts && profileUser.posts.length > 0 ? (
              profileUser.posts.map((post: any) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  user={currentUser} 
                />
              ))
            ) : (
              <Card className="border-dashed border-2 bg-muted/20">
                <CardContent className="h-40 flex flex-col items-center justify-center text-muted-foreground">
                  <p className="font-medium p-6 text-center">This user hasn't shared any post-worthy thoughts yet. ✨</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
