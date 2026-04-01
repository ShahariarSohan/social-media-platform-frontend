import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { User } from "lucide-react";

export default function ProfileButton() {
    const router = useRouter();
  return (
    <div>
      <DropdownMenuItem onClick={() => router.push("/profile")}>
        <User className="mr-2 h-4 w-4" />
        Profile
      </DropdownMenuItem>
    </div>
  );
}