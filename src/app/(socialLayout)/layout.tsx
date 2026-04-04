

import React from "react";
import Link from "next/link";



import { Home, PenSquare } from "lucide-react";

import { Button } from "@/src/components/ui/button";


import UserDropdown from "@/src/components/UserDropdown";
import getUserInfo from "@/src/services/auth/getUserInfo";
import { User } from "@/src/types/interface";



export default async function Layout({ children }: { children: React.ReactNode }) {
  
 const user:User = await getUserInfo();


  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <PenSquare className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-xl">SocialHub</span>
            </Link>

            <nav className="flex items-center space-x-2 md:space-x-4">
              <Link href="/feed">
                <Button variant="ghost" size="sm" className="px-2 md:px-4">
                  <Home className="w-5 h-5 md:w-4 md:h-4 md:mr-2" />
                  <span className="hidden md:inline">Home</span>
                </Button>
              </Link>
              <UserDropdown user={user} />
             
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
