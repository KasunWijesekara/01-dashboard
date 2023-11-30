// components/ui/Sidebar.tsx
import React from "react";
import Image from "next/image";
import { Contact } from "@/app/types"; // adjust the path as needed

// Add a prop for onSelectUser
const Sidebar: React.FC<{ onSelectUser: (contact: Contact) => void }> = ({
  onSelectUser,
}) => {
  // Sample contacts data
  const contacts: Contact[] = [
    {
      id: 1,
      name: "John Doe",
      status: "Online",
      avatar: "/images/avatar.svg",
      lastMessageTime: "2023-11-30T00:05:08.594Z",
      messages: [
        {
          id: 1,
          sender: "John Doe",
          content: "Hello, this is a dummy message.",
          timestamp: "2023-11-30T00:05:08.594Z",
          isUser: false,
        },
        {
          id: 2,
          sender: "User",
          content: "Hi John, this is another dummy message.",
          timestamp: "2023-11-30T00:05:08.594Z",
          isUser: true,
        },
      ],
    },
    {
      id: 1,
      name: "Kasun Doe",
      status: "Online",
      avatar: "/images/avatar.svg",
      lastMessageTime: "2023-11-30T00:05:08.594Z",
      messages: [
        {
          id: 1,
          sender: "Kasun Doe",
          content: "Hello, this is a dummy message.",
          timestamp: "2023-11-30T00:05:08.594Z",
          isUser: false,
        },
        {
          id: 2,
          sender: "User",
          content: "Hi Rachel, this is another dummy message.",
          timestamp: "2023-11-30T00:05:08.594Z",
          isUser: true,
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 h-screen overflow-y-scroll p-4 pt-12 w-96">
      {/* ... */}
      {contacts.map((contact) => (
        <div
          key={contact.id}
          onClick={() => onSelectUser(contact)} // Add the click handler here
          className="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <span className="inline-flex justify-center items-center h-10 w-10 rounded-full bg-blue-500 mr-3">
            <Image
              src={contact.avatar}
              alt={contact.name}
              width={40}
              height={40}
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
