export const dynamic = 'force-dynamic';
import Profile from "@/src/components/Profile";
import getUserInfo from "@/src/services/auth/getUserInfo";


export default async function ProfilePage() {
  const user = await getUserInfo();
  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
