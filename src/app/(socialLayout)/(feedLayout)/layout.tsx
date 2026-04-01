"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Bookmark } from "lucide-react";
import { cn } from "@/src/lib/utils";


const navItems = [
  {
    title: "All Posts",
    href: "/feed",
    icon: Home,
  },
  {
    title: "My Posts",
    href: "/my-posts",
    icon: Bookmark,
  },
  {
    title: "Profiles",
    href: "/profiles",
    icon: Users,
  },
];

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0">
        <div className="sticky top-20 bg-white rounded-lg border border-gray-200 p-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
