import React from "react";
import { Contact } from "@/app/types"; // Make sure this path is correct

interface MainChatProps {
  contact: Contact;
}

const MainChat: React.FC<MainChatProps> = ({ contact }) => {
  return (
    <div className="flex flex-grow p-4 pb-0">
      <div className="flex flex-col h-screen w-full sm:w-5/6">
        <div className="flex">
          <div className="flex-none w-full sm:w-3/4 h-14">
            <h2 className="text-xl font-semibold pl-3">Conversation History</h2>
          </div>
        </div>
        {/* <div className="flex-none">
          <h2 className="text-xl font-semibold pl-3">Conversation History</h2>
          <UserButton afterSignOutUrl="/" />
        </div> */}
        <div className="flex flex-col h-screen overflow-y-auto w-full">
          {/* List of messages */}
          {contact.messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 my-2 rounded-lg max-w-full sm:max-w-xs ${
                message.isUser ? "ml-auto bg-sky-900" : "bg-gray-900"
              }`} // Right align for user messages
            >
              <div className="text-xs font-bold">{message.sender} </div>
              <div className="text-sm font-light pt-1">{message.content}</div>
              <div className="text-xs text-gray-400 font-thin pt-3">
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
      </div>
    </div>
  );
};

export default MainChat;
