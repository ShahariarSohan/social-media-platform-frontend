"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


import { Home, User, LogOut, PenSquare } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";

import logoutUser from "@/src/services/auth/logoutUser";
import UserDropdown from "@/src/components/UserDropdown";

export default function Layout({ children }: { children: React.ReactNode }) {
  
 


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

            <nav className="flex items-center space-x-4">
              <Link href="/feed">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
             <UserDropdown/>
             
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
