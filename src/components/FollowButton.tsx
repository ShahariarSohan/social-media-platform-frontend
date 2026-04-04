"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { followUser, unfollowUser } from "../services/userActivities/follow";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FollowButtonProps {
  userId: string;
  isFollowing: boolean;
}

export default function FollowButton({ userId, isFollowing }: FollowButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleFollow = () => {
    startTransition(async () => {
      try {
        const res = isFollowing 
          ? await unfollowUser(userId) 
          : await followUser(userId);

        if (res.success) {
          toast.success(res.message);
          router.refresh();
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Button
      variant={isFollowing ? "outline" : "default"}
      className="w-full"
      onClick={handleFollow}
      disabled={isPending}
    >
      {isPending ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
