"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { getMessages, sendMessage } from "../services/userActivities/chat";

interface ChatWindowProps {
  conversationId: string;
  currentUserId: string;
}

export default function ChatWindow({ conversationId, currentUserId }: ChatWindowProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { socket } = useSocket();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const data = await getMessages(conversationId);
        if (data.success) {
          setMessages(data.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    if (socket) {
      socket.emit('join_conversation', conversationId);
      
      const handleMessage = (message: any) => {
        if (message.conversationId === conversationId) {
          setMessages((prev) => [...prev, message]);
        }
      };

      socket.on('new_message', handleMessage);

      return () => {
        socket.off('new_message', handleMessage);
      };
    }
  }, [conversationId, socket]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const data = await sendMessage(conversationId, newMessage);
      if (data.success) {
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-background/30 backdrop-blur-sm">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth" ref={scrollRef}>
        {messages.map((msg) => {
          const isOwn = msg.senderId === currentUserId;
          return (
            <div
              key={msg.id}
              className={cn(
                "flex items-end gap-2 max-w-[80%] transition-all",
                isOwn ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src={msg.sender?.avatar || ""} />
                <AvatarFallback>{msg.sender?.username?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "p-3 rounded-2xl text-sm shadow-sm",
                  isOwn 
                    ? "bg-blue-600 text-white rounded-br-none" 
                    : "bg-white border text-foreground rounded-bl-none"
                )}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-background/50 border-t border-border/50 backdrop-blur-md">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="rounded-xl border-none bg-secondary/50 focus-visible:ring-blue-500 h-11"
          />
          <Button 
            type="submit" 
            disabled={!newMessage.trim() || sending}
            className="h-11 w-11 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200"
            size="icon"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
