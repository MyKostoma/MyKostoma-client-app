export type MessagesFetchStatus = "idle" | "loading" | "succeeded" | "failed";

export type ConversationAvatarVariant =
  | "primary"
  | "info"
  | "warning"
  | "success"
  | "secondary";

export type ChatMessageStatus = "SENT" | "DELIVERED" | "READ";

export type ChatMessageSender = "me" | "participant";

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: ChatMessageSender;
  text: string;
  timestamp: string;
  dateGroup: string;
  status?: ChatMessageStatus;
}

export interface ConversationItem {
  id: string;
  participantName: string;
  participantRole: string;
  displayTitle: string;
  avatarUrl?: string;
  avatarInitials: string;
  avatarVariant: ConversationAvatarVariant;
  isOnline: boolean;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: ChatMessage[];
}

export interface GroupedChatMessages {
  dateGroup: string;
  messages: ChatMessage[];
}

export interface NewConversationPayload {
  participantName: string;
  participantRole: string;
  initialMessage: string;
}

export interface MessagesViewProps {
  initialConversations?: ConversationItem[];
  initialSelectedConversationId?: string | null;
}

