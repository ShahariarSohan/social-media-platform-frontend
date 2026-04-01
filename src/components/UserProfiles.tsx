

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { UserPlus } from "lucide-react";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  postsCount: number;
  followersCount: number;
}

const mockUsers: UserProfile[] = [
  {
    id: "2",
    username: "sarahwilson",
    email: "sarah@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    bio: "Adventure seeker and nature lover",
    postsCount: 24,
    followersCount: 1250,
  },
  {
    id: "3",
    username: "mikejohnson",
    email: "mike@example.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    bio: "Food enthusiast and amateur chef",
    postsCount: 18,
    followersCount: 890,
  },
  {
    id: "4",
    username: "emilydavis",
    email: "emily@example.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    bio: "Digital artist and creative soul",
    postsCount: 42,
    followersCount: 2100,
  },
  {
    id: "5",
    username: "alexchen",
    email: "alex@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    bio: "Tech enthusiast | Coffee lover ☕",
    postsCount: 31,
    followersCount: 1680,
  },
];

export default function UserProfiles() {
  

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Discover People</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockUsers.map((profile) => (
          <Card key={profile.id} className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile.avatar} alt={profile.username} />
                <AvatarFallback>
                  {profile.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">
                  {profile.username}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {profile.email}
                </p>
                {profile.bio && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {profile.bio}
                  </p>
                )}

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                  <span>
                    <strong>{profile.postsCount}</strong> posts
                  </span>
                  <span>
                    <strong>{profile.followersCount}</strong> followers
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Link href={"/profile"}>
                <Button variant="outline" className="flex-1">
                  View Profile
                </Button>
              </Link>

              <Button className="flex-1">
                <UserPlus className="w-4 h-4 mr-2" />
                Follow
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
