"use client";

// pages/index.tsx or your main chat component
import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import MainChat from "@/components/mainchat";
import { Contact, Message } from "@/app/types"; // Import or define these interfaces here
import Welcome from "@/components/welcome";

const Page: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleSelectUser = (contact: Contact) => {
    // Reset the state here before setting the new selected contact
    setSelectedContact(null);
    setSelectedContact(contact);
  };

  return (
    <div className="flex h-screen">
      <Sidebar onSelectUser={handleSelectUser} />
      {selectedContact ? (
        <MainChat key={selectedContact.id} contact={selectedContact} />
      ) : (
        <div className="pl-2 mt-20">
          <div className="container">
            <Welcome />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
