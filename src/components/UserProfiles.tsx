import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { UserPlus } from "lucide-react";
import { getAllUsers } from "../services/admin/getAllUsers";
import { User } from "../types/interface";

export default async function UserProfiles() {
  const res = await getAllUsers();
  const users: User[] = res?.success ? res.data : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Discover People</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.length === 0 ? (
          <p className="text-center text-gray-500 col-span-2 py-10">
            No users found to discover.
          </p>
        ) : (
          users.map((profile) => (
            <Card key={profile.id} className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profile.avatar || ""} alt={profile.username} />
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
                      <strong>{profile.posts?.length || 0}</strong> posts
                    </span>
                    <span>
                      <strong>{profile.comments?.length || 0}</strong> comments
                    </span>
                    <span>
                      <strong>{profile.likes?.length || 0}</strong> likes
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Link href={`/profile/${profile.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
