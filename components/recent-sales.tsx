"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  status: string;
  avatar: string;
  lastMessageTime: string;
  timestamp: number; // Add this line
  messages: Array<{
    id: string;
    sender: string;
    content: string;
    timestamp: number;
    isUser: boolean;
  }>;
}

interface ResponseData {
  ip_address: string;
  id: number;
  user_message: string;
  ai_response: string;
  timestamp: number;
}

export function RecentSales() {
  const [recentUsers, setRecentUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<ResponseData[]>("https://web.01api.online/api/chats")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const sessions = response.data.reduce(
            (
              acc: Record<string, User>,
              item: ResponseData
            ): Record<string, User> => {
              // If this IP address already exists and its timestamp is newer, skip this item
              if (
                acc[item.ip_address] &&
                acc[item.ip_address].timestamp > item.timestamp
              ) {
                return acc;
              }

              // Otherwise, add or update the item
              acc[item.ip_address] = {
                id: item.id.toString(),
                name: item.ip_address,
                status: "online",
                avatar: "",
                lastMessageTime: new Date(item.timestamp).toLocaleTimeString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                    timeZone: "Asia/Kolkata",
                  }
                ),
                messages: [],
                timestamp: item.timestamp, // Add the timestamp to the user object
              };

              return acc;
            },
            {}
          );

          setRecentUsers(Object.values(sessions).slice(-5)); // Get the last 5 users
        } else {
          console.error("Data is not an array:", response.data);
        }
      })
      .catch((error: Error) => console.error(error));
  }, []);

  return (
    <div className="space-y-8">
      {recentUsers.map((user: User) => (
        <div className="flex items-center" key={user.id}>
          <Avatar className="h-12 w-12 border">
            <AvatarImage src="/images/avatar.svg" alt="Avatar" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-xs font-medium leading-none">{user.name}</p>
            <p className="text-xs text-muted-foreground">LK</p>
          </div>
          <div className="ml-auto font-medium text-xs">
            {user.lastMessageTime}
          </div>
        </div>
      ))}
    </div>
  ); //fix this error
}
