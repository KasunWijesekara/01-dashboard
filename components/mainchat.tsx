import React from "react";
import { Contact } from "@/app/types"; // Make sure this path is correct

interface MainChatProps {
  contact: Contact;
}

const MainChat: React.FC<MainChatProps> = ({ contact }) => {
  return (
    <div className="flex-grow p-4 pb-0">
      <div className="flex flex-col h-screen">
        <div className="flex-none">
          <h2 className="text-xl font-semibold">Chat with {contact.name}</h2>
        </div>
        <div className="flex-grow overflow-y-scroll p-4">
          {/* List of messages */}
          {contact.messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 my-2 rounded-lg max-w-xs ${
                message.isUser ? "bg-blue-100 self-end" : "bg-gray-100"
              }`} // Apply different styles for user's messages
            >
              <div className="text-sm font-medium">{message.sender}</div>
              <div>{message.content}</div>
              <div className="text-xs text-gray-600">{message.timestamp}</div>
            </div>
          ))}
        </div>
        {/* Message input */}
        <div className="p-4 bg-white">{/* Input and send button */}</div>
      </div>
    </div>
  );
};

export default MainChat;
