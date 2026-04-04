"use client";

import React, { useEffect, useState } from 'react';
import ChatSidebar from '@/src/components/ChatSidebar';
import ChatWindow from '@/src/components/ChatWindow';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/src/components/ui/card';
import { MessageSquare } from 'lucide-react';
import getUserInfo from '@/src/services/auth/getUserInfo';

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserInfo();
      if (user && user.id) {
        setCurrentUserId(user.id);
      }
    };
    fetchUser();

    const conversationId = searchParams.get('id');
    if (conversationId) {
      setSelectedConversationId(conversationId);
    }
  }, [searchParams]);

  return (
    <div className="h-[calc(100vh-100px)] flex overflow-hidden rounded-2xl border bg-card/30 backdrop-blur-xl shadow-2xl">
      <div className="w-full md:w-80 border-r border-border/50">
        <ChatSidebar 
          currentUserId={currentUserId}
          selectedId={selectedConversationId || undefined}
          onSelectConversation={(id) => setSelectedConversationId(id)}
        />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        {selectedConversationId ? (
          <ChatWindow 
            conversationId={selectedConversationId}
            currentUserId={currentUserId}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center bg-background/10">
            <div className="p-4 rounded-full bg-blue-50 text-blue-500 mb-4 animate-bounce">
              <MessageSquare className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Your Inbox</h3>
            <p className="max-w-xs mx-auto text-sm">
              Select a conversation from the sidebar or start a new one from a user profile!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
