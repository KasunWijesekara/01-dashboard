export interface Message {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    isUser: boolean;
}

export interface Contact {
    id: number;
    name: string;
    avatar: string;
    status: string;
    lastMessageTime: string;
    messages: Message[];
}