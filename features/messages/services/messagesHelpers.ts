import type {
  ChatMessage,
  ConversationAvatarVariant,
  ConversationItem,
  GroupedChatMessages,
} from "../types";

/**
 * Filter conversations by search query matching name, role, or last message.
 */
export function filterConversations(
  conversations: ConversationItem[],
  searchQuery: string
): ConversationItem[] {
  const query = searchQuery.trim().toLowerCase();
  if (!query) {
    return conversations;
  }

  return conversations.filter(
    (conv) =>
      conv.displayTitle.toLowerCase().includes(query) ||
      conv.participantName.toLowerCase().includes(query) ||
      conv.participantRole.toLowerCase().includes(query) ||
      conv.lastMessage.toLowerCase().includes(query)
  );
}

/**
 * Group messages sequentially by their `dateGroup` label (e.g., "YESTERDAY", "TODAY").
 */
export function groupMessagesByDate(
  messages: ChatMessage[]
): GroupedChatMessages[] {
  const groups: GroupedChatMessages[] = [];

  for (const message of messages) {
    const lastGroup = groups[groups.length - 1];
    if (!lastGroup || lastGroup.dateGroup !== message.dateGroup) {
      groups.push({
        dateGroup: message.dateGroup,
        messages: [message],
      });
    } else {
      lastGroup.messages.push(message);
    }
  }

  return groups;
}

/**
 * Format current time as 12-hour "HH:MM AM/PM".
 */
export function formatMessageTimestamp(date: Date = new Date()): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Extract single uppercase initial from a participant name.
 */
export function getParticipantInitial(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "U";
  return trimmed.charAt(0).toUpperCase();
}

/**
 * Pick a deterministic semantic avatar variant from name string.
 */
export function pickAvatarVariant(name: string): ConversationAvatarVariant {
  const variants: ConversationAvatarVariant[] = [
    "primary",
    "info",
    "warning",
    "success",
    "secondary",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return variants[Math.abs(hash) % variants.length];
}

