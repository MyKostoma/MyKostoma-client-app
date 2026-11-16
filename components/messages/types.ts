import type {
  ChatMessage,
  ConversationAvatarVariant,
  ConversationItem,
  GroupedChatMessages,
} from "@/features/messages/types";

export type {
  ChatMessage,
  ConversationAvatarVariant,
  ConversationItem,
  GroupedChatMessages,
} from "@/features/messages/types";

export interface ConversationAvatarProps {
  name: string;
  initials: string;
  variant?: ConversationAvatarVariant;
  avatarUrl?: string;
  isOnline?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface ConversationListItemProps {
  conversation: ConversationItem;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export interface ConversationsSidebarProps {
  conversations: ConversationItem[];
  selectedConversationId: string | null;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectConversation: (id: string) => void;
  className?: string;
}

export interface MessagesNoSelectionProps {
  className?: string;
}

export interface ChatThreadHeaderProps {
  conversation: ConversationItem;
  onBackToList?: () => void;
  onAudioCall?: () => void;
  onVideoCall?: () => void;
  onMoreOptions?: () => void;
}

export interface ChatMessageBubbleProps {
  message: ChatMessage;
  participantName: string;
  participantInitials: string;
  participantAvatarVariant: ConversationAvatarVariant;
  participantAvatarUrl?: string;
}

export interface ChatComposerProps {
  onSendMessage: (text: string) => void;
  onRequestQuote: () => void;
  onScheduleVisit: () => void;
  disabled?: boolean;
}

export interface ChatThreadPaneProps {
  conversation: ConversationItem;
  groupedMessages: GroupedChatMessages[];
  onBackToList?: () => void;
  onSendMessage: (text: string) => void;
  onRequestQuote: () => void;
  onScheduleVisit: () => void;
  className?: string;
}

export interface MessagesEmptyStateProps {
  onFindService: () => void;
  onBrowseProfessionals: () => void;
  className?: string;
}

export interface MessagesErrorStateProps {
  title?: string;
  description?: string;
  onRetry: () => void;
  onContactSupport?: () => void;
  className?: string;
}

