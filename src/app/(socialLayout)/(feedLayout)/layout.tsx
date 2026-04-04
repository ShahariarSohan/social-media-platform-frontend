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
    <div className="flex flex-col md:flex-row gap-6">
      {/* Mobile/Tablet Tabs (Horizontal) */}
      <nav className="md:hidden flex items-center justify-between bg-white border border-gray-200 p-1 rounded-lg sticky top-[72px] z-40 shadow-sm overflow-x-auto scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all",
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md scale-95"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              <Icon className="w-4 h-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-blue-100"
                      : "text-gray-600 hover:bg-gray-50",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-blue-500",
                    )}
                  />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 px-1 sm:px-0">
        {children}
      </div>
    </div>
  );
}
