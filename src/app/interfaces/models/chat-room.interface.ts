export interface Message{
    senderId: string;
    messageText: string;
    timestamp: Date;        // The timestamp when the message was sent
    read: boolean;          // Indicates if the message has been read
    messageType: "text" | "image" | "video"; // The type of the message
    fullName: string
}

export interface ChatRoom{
    chatRoomId?: string                       // The ID of the first user
    users: string[]                     // The ID of the second user
    lastMessage: string;                 // The last message sent in the chat
    lastMessageTimestamp: Date;          // The timestamp of the last message
    messages: Message[];                 // Array of messages in the chat room
}