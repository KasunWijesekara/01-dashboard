import React, { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import axios from "axios";

interface Chat {
  timestamp: string;
}

export function Overview() {
  const [data, setData] = useState<{ name: string; total: number }[]>([]);

  useEffect(() => {
    axios
      .get<Chat[]>("https://web.01api.online/api/chats")
      .then((response) => {
        const chatsByDate: { [date: string]: number } = {};

        response.data.forEach((chat) => {
          const date = new Date(chat.timestamp).toISOString().split("T")[0];
          chatsByDate[date] = (chatsByDate[date] || 0) + 1;
        });

        const chartData = Object.entries(chatsByDate).map(([name, total]) => ({
          name,
          total,
        }));
        setData(chartData);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <ResponsiveContainer width="50%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
