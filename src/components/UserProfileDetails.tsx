
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
        <div className="h-40 sm:h-56 md:h-64 lg:h-80 w-full relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10"></div>
        {profileUser.coverImage ? (
           <img 
             src={profileUser.coverImage} 
             alt="Cover" 
             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
           />
        ) : (
           <div className="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
        )}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-500"></div>
      </div>
      
      <div className="absolute -bottom-10 sm:-bottom-12 md:-bottom-16 left-3 sm:left-4 md:left-8 flex items-end gap-2 sm:gap-3 md:gap-6">
        <div className="relative">
          <div className="p-1 rounded-full bg-background ring-4 ring-background shadow-xl">
            <Avatar className="h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 border-2 border-inherit">
              <AvatarImage src={profileUser.avatar || ""} />
              <AvatarFallback className="text-xl sm:text-2xl md:text-3xl font-bold bg-muted">
                {profileUser.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        <div className="mb-1 sm:mb-2 md:mb-4 space-y-0 sm:space-y-0.5 md:space-y-1 hidden sm:block">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground drop-shadow-sm">{profileUser.username}</h1>
          <p className="text-[10px] sm:text-xs md:text-sm text-foreground/80 flex items-center gap-1 font-medium italic">
              <Mail className="w-3 h-3" /> {profileUser.email}
          </p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-14 sm:mt-16 md:mt-20 pt-6 md:pt-10 px-3 sm:px-4">
        {/* LEFT COLUMN: INFO & STATS */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6 space-y-6">
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

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-2 text-center">
                <div className="p-2 md:p-3 rounded-lg bg-secondary/30">
                  <p className="text-lg md:text-xl font-bold text-primary">{profileUser.posts?.length || 0}</p>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">Posts</p>
                </div>
                <div className="p-2 md:p-3 rounded-lg bg-secondary/30">
                  <p className="text-lg md:text-xl font-bold text-primary">{profileUser.comments?.length || 0}</p>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">Comments</p>
                </div>
                <div className="p-2 md:p-3 rounded-lg bg-secondary/30">
                  <p className="text-lg md:text-xl font-bold text-primary">{profileUser.likes?.length || 0}</p>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">Likes</p>
                </div>
                <div className="p-2 md:p-3 rounded-lg bg-secondary/30">
                  <p className="text-lg md:text-xl font-bold text-primary">{profileUser.followers?.length || 0}</p>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">Followers</p>
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
