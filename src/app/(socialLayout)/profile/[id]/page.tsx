
import UserProfileDetails from "@/src/components/UserProfileDetails";
import { getUserById } from "@/src/services/admin/getUserById";
import getUserInfo from "@/src/services/auth/getUserInfo";
import { notFound } from "next/navigation";

interface IParams {
  params: {
    id: string;
  };
}

export default async function UserProfilePage({ params }: IParams) {
  const { id } = await params;
  
  const [targetUserRes, currentUser] = await Promise.all([
    getUserById(id),
    getUserInfo()
  ]);

  if (!targetUserRes.success || !targetUserRes.data) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <UserProfileDetails 
        profileUser={targetUserRes.data} 
        currentUser={currentUser} 
      />
    </div>
  );
}
