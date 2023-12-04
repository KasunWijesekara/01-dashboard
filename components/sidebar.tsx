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
            const id = item.ip_address.split("-")[0];
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
    // <div className="bg-gray-900 h-screen overflow-y-scroll p-4 w-3/6">
    <div className="bg-gray-900 h-screen overflow-y-scroll w-3/6 p-4 pb-0">
      {/* ... */}
      {contacts.map((contact, index) => (
        <div
          key={index}
          onClick={() => {
            onSelectUser(contact); // Keep your existing click handler
            setSelectedUser(contact.id); // Set the selected user when a user is clicked
          }}
          className={`flex items-center p-3 rounded-lg cursor-pointer ${
            selectedUser === contact.id ? "bg-gray-800" : ""
          }`}
        >
          <span className="inline-flex justify-center items-center rounded-full bg-gray-400 mr-3">
            <Image
              src={contact.avatar}
              alt={contact.name}
              width={50}
              height={50}
              className="rounded-full border-2 border-white"
            />
          </span>
          <div className="flex-grow w-3/6">
            <div className="font-medium text-sm">
              {contact.name}
              <span className="text-xs font-light"> [Website]</span>
            </div>
            <div className="text-xs text-gray-600">{contact.status}</div>
          </div>
          <div className="text-xs text-gray-500">{contact.lastMessageTime}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
