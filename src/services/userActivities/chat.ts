/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/src/lib/serverFetch";
import { revalidateTag } from "next/cache";

/**
 * Create or get an existing conversation
 */
export async function createConversation(participantId: string) {
  try {
    const response = await serverFetch.post("/chat/conversations", {
      body: JSON.stringify({ participantId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    return result;
  } catch (err: any) {
    console.error("Create conversation error:", err);
    return { success: false, message: err.message };
  }
}

/**
 * Get all conversations for the current user
 */
export async function getConversations() {
  try {
    const response = await serverFetch.get("/chat/conversations");
    const result = await response.json();
    return result;
  } catch (err: any) {
    console.error("Get conversations error:", err);
    return { success: false, data: [] };
  }
}

/**
 * Send a message in a conversation
 */
export async function sendMessage(conversationId: string, content: string) {
  try {
    const response = await serverFetch.post("/chat/messages", {
      body: JSON.stringify({ conversationId, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    revalidateTag("MESSAGES", "max");
    return result;
  } catch (err: any) {
    console.error("Send message error:", err);
    return { success: false, message: err.message };
  }
}

/**
 * Get all messages for a conversation
 */
export async function getMessages(conversationId: string) {
  try {
    const response = await serverFetch.get(`/chat/messages/${conversationId}`);
    const result = await response.json();
    return result;
  } catch (err: any) {
    console.error("Get messages error:", err);
    return { success: false, data: [] };
  }
}
