
"use client"
import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import logoutUser from "@/src/services/auth/logoutUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();
      const handleLogout = () => {
        logoutUser();
        toast.success("Logged out successfully");
        router.push("/login");
      };
  return (
    <div>
      <DropdownMenuItem onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </DropdownMenuItem>
    </div>
  );
}