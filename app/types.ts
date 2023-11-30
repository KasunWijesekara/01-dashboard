// Add this inside your types or interface definitions
interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
    isUser: boolean;
}

interface Contact {
    id: number;
    name: string;
    status: string;
    avatar: string;
    lastMessageTime: string;
    messages: Message[]; // Add this line
}