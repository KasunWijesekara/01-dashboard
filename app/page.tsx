"use client";

// pages/index.tsx or your main chat component
import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import MainChat from "@/components/mainchat";
import { Contact, Message } from "@/app/types"; // Import or define these interfaces here

const Page: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleSelectUser = (contact: Contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="flex h-screen">
      <Sidebar onSelectUser={handleSelectUser} />
      {selectedContact ? (
        <MainChat contact={selectedContact} />
      ) : (
        <div>Select a user to start a chat</div>
      )}
    </div>
  );
};

export default Page;
