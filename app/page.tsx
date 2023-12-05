"use client";
import { Metadata } from "next";
import Image from "next/image";

import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";

interface ResponseData {
  ip_address: string;
  id: number;
  user_message: string;
  ai_response: string;
  timestamp: number;
}

export default function DashboardPage() {
  const [totalChats, setTotalChats] = useState(0);
  const [averageChats, setAverageChats] = useState<number>(0);
  const [uniqueUsers, setUniqueUsers] = useState(0);

  useEffect(() => {
    axios
      .get<ResponseData[]>("https://web.01api.online/api/chats")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const totalChatsCount = response.data.length;
          setTotalChats(totalChatsCount);

          // Group chats by ip_address
          const chatsByUser = response.data.reduce(
            (acc: Record<string, ResponseData[]>, item: ResponseData) => {
              if (!acc[item.ip_address]) {
                acc[item.ip_address] = [];
              }
              acc[item.ip_address].push(item);
              return acc;
            },
            {}
          );

          // Calculate the average chats per user
          const totalChats = Object.values(chatsByUser).reduce(
            (total: number, chats: ResponseData[]) => total + chats.length,
            0
          );
          const averageChats = totalChats / Object.keys(chatsByUser).length;
          setAverageChats(averageChats);

          // Calculate the number of unique users
          const uniqueUserIds = new Set(
            response.data.map((item) => item.ip_address)
          );
          setUniqueUsers(uniqueUserIds.size);
        } else {
          console.error("Data is not an array:", response.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueUsers}</div>
            <p className="text-xs text-muted-foreground">
              Have initiated a chat
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Conversations
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalChats}</div>
            <p className="text-xs text-muted-foreground">
              Customer interaction with your AI chatbot
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Customer Interaction
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(averageChats)}</div>
            <p className="text-xs text-muted-foreground">
              Average customer chats per customer
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Messages Logged
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalChats * 2}</div>
            <p className="text-xs text-muted-foreground">
              Total messages logged in the system
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6 mb-20">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Total Conversation Per Day</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>
              24/7 Customer interaction is important. Here are the last 5 users
              who has interacted with your AI chatbot.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
