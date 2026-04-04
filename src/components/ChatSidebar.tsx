"use client";

import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/src/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { getConversations } from "../services/userActivities/chat";

interface ChatSidebarProps {
  onSelectConversation: (id: string) => void;
  selectedId?: string;
  currentUserId: string;
}

export default function ChatSidebar({ onSelectConversation, selectedId, currentUserId }: ChatSidebarProps) {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversations();
        if (data.success) {
          setConversations(data.data);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-2 p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-card/50 backdrop-blur-md border-r border-border/50">
      <div className="p-4 border-b border-border/50">
        <h2 className="text-xl font-bold">Messages</h2>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1 scrollbar-hide">
        {conversations.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p className="text-sm">No conversations yet.</p>
          </div>
        ) : (
          conversations.map((conv) => {
            const otherUser = conv.users.find((u: any) => u.id !== currentUserId);
            const lastMessage = conv.messages?.[0];

            return (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-secondary/50",
                  selectedId === conv.id ? "bg-secondary text-secondary-foreground shadow-sm" : "text-muted-foreground"
                )}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                    <AvatarImage src={otherUser?.avatar || ""} />
                    <AvatarFallback>{otherUser?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-semibold text-foreground truncate">{otherUser?.username}</span>
                  </div>
                  <p className="text-xs truncate opacity-70">
                    {lastMessage ? (
                      <span className="flex items-center gap-1">
                        {lastMessage.senderId === currentUserId && <span className="opacity-50">You:</span>}
                        {lastMessage.content}
                      </span>
                    ) : (
                      "Started a conversation"
                    )}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
