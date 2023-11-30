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

  useEffect(() => {
    axios
      .get("https://web.01api.online/api/chats")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const sessions = response.data.reduce((acc, item) => {
            if (!acc[item.session_id]) {
              acc[item.session_id] = {
                id: item.session_id,
                name: "User",
                status: item.session_id,
                avatar: "/images/avatar.svg",
                lastMessageTime: item.timestamp,
                messages: [],
              };
            }

            acc[item.session_id].messages.push(
              {
                id: item.id.toString(),
                sender: "Customer",
                content: item.user_message,
                timestamp: item.timestamp,
                isUser: false,
              },
              {
                id: item.id.toString(),
                sender: "Ai Assistant",
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
    <div className="bg-gray-100 h-screen overflow-y-scroll p-4 pt-12 w-96">
      {/* ... */}
      {contacts.map((contact, index) => (
        <div
          key={index}
          onClick={() => onSelectUser(contact)} // Add the click handler here
          className="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <span className="inline-flex justify-center items-center rounded-full bg-blue-500 mr-3">
            <Image
              src={contact.avatar}
              alt={contact.name}
              width={100}
              height={100}
              className="rounded-full border-2 border-white"
            />
          </span>
          <div className="flex-grow">
            <div className="font-medium text-sm">{contact.name}</div>
            <div className="text-xs text-gray-600">{contact.status}</div>
          </div>
          <div className="text-xs text-gray-500">{contact.lastMessageTime}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
