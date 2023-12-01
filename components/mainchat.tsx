import React from "react";
import { Contact } from "@/app/types"; // Make sure this path is correct
import { UserButton } from "@clerk/nextjs";

interface MainChatProps {
  contact: Contact;
}

const MainChat: React.FC<MainChatProps> = ({ contact }) => {
  return (
    <div className="flex-grow p-4 pb-0">
      <div className="flex flex-col h-screen">
        <div className="flex">
          <div className="flex-none w-1/4 h-14">
            <h2 className="text-xl font-semibold pl-3">Conversation History</h2>
          </div>
          <div className="flex-initial w-3/4 flex justify-end">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        {/* <div className="flex-none">
          <h2 className="text-xl font-semibold pl-3">Conversation History</h2>
          <UserButton afterSignOutUrl="/" />
        </div> */}
        <div className="flex-grow overflow-y-scroll p-4">
          {/* List of messages */}
          {contact.messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 my-2 rounded-lg max-w-xs ${
                message.isUser ? "ml-auto bg-sky-200" : "bg-gray-100"
              }`} // Right align for user messages
            >
              <div className="text-xs font-bold">{message.sender} </div>
              <div className="text-sm font-light pt-1">{message.content}</div>
              <div className="text-xs text-gray-600 font-thin pt-3">
                {new Date(message.timestamp).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
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
