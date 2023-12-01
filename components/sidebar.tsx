// components/ui/Sidebar.tsx
import React from "react";
import Image from "next/image";
import { Contact } from "@/app/types"; // adjust the path as needed
import axios from "axios";
import { useEffect, useState } from "react";

// Add a prop for onSelectUser
const Sidebar: React.FC<{ onSelectUser: (contact: Contact) => void }> = ({
  onSelectUser,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null); // Add a state variable for the selected user

  useEffect(() => {
    axios
      .get("https://web.01api.online/api/chats")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const sessions = response.data.reduce((acc, item) => {
            const id = item.session_id.split("-")[0];
            if (!acc[id]) {
              acc[id] = {
                id: id,
                name: "User",
                status: id,
                avatar: "/images/avatar.svg",
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
              };
            }

            acc[id].messages.push(
              {
                id: item.id.toString(),
                sender: "User",
                content: item.user_message,
                timestamp: item.timestamp,
                isUser: false,
              },
              {
                id: item.id.toString(),
                sender: "01 Assistant",
                content: item.ai_response,
                timestamp: item.timestamp,
                isUser: true,
              }
            );

            return acc;
          }, {});

          setContacts(Object.values(sessions));
        } else {
          console.error("Data is not an array:", response.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-900 overflow-y-scroll p-4 pt-16 w-96 relative">
      {/* ... */}
      {contacts.map((contact, index) => (
        <div
          key={index}
          onClick={() => {
            onSelectUser(contact); // Keep your existing click handler
            setSelectedUser(contact.id); // Set the selected user when a user is clicked
          }}
          className={`flex items-center p-3 rounded-lg cursor-pointer ${
            selectedUser === contact.id ? "bg-slate-800" : ""
          }`}
        >
          <span className="inline-flex justify-center items-center rounded-full bg-slate-500 mr-3">
            <Image
              src={contact.avatar}
              alt={contact.name}
              width={50}
              height={50}
              className="rounded-full border-2 border-white"
            />
          </span>
          <div className="flex-grow">
            <div className="font-medium text-sm">
              {contact.name}
              <span className="text-xs font-light"> [Website]</span>
            </div>
            <div className="text-xs text-gray-600">{contact.status}</div>
          </div>
          <div className="text-xs text-gray-500">{contact.lastMessageTime}</div>
        </div>
      ))}
      <div className="w-11/12 pt-4 pb-4 bg-transparent text-center absolute bottom-0">
        <p className="text-xs font-normal text-gray-400">
          All Rights Reserved. Powered by{" "}
          <span className="font-semibold">Zero One</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
