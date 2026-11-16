"use client";

import { SearchInput } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import { ConversationAvatar } from "./conversation-avatar";
import type {
  ConversationListItemProps,
  ConversationsSidebarProps,
} from "./types";

export function ConversationListItem({
  conversation,
  isActive,
  onSelect,
}: ConversationListItemProps) {
  const hasUnread = conversation.unreadCount > 0;

  return (
    <button
      type="button"
      onClick={() => onSelect(conversation.id)}
      className={cn(
        "w-full flex items-center gap-3.5 px-4 py-3.5 text-left transition-colors cursor-pointer border-b border-border/60 relative outline-none",
        isActive
          ? "bg-accent/60 border-l-4 border-l-primary pl-3"
          : hasUnread
            ? "bg-card hover:bg-secondary/40 border-l-4 border-l-foreground pl-3"
            : "bg-card hover:bg-secondary/40"
      )}
    >
      <ConversationAvatar
        name={conversation.participantName}
        initials={conversation.avatarInitials}
        variant={conversation.avatarVariant}
        avatarUrl={conversation.avatarUrl}
        isOnline={conversation.isOnline}
        size="lg"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              "text-xs sm:text-sm truncate",
              isActive || hasUnread
                ? "font-bold text-foreground"
                : "font-semibold text-foreground"
            )}
          >
            {conversation.displayTitle}
          </p>
          <span
            className={cn(
              "text-[11px] shrink-0",
              isActive
                ? "text-primary font-semibold"
                : "text-muted-foreground font-medium"
            )}
          >
            {conversation.lastMessageTime}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 mt-1">
          <p
            className={cn(
              "text-xs truncate",
              isActive
                ? "text-primary font-medium"
                : hasUnread
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
            )}
          >
            {conversation.lastMessage}
          </p>

          {hasUnread && !isActive && (
            <span
              aria-label="Unread message"
              className="size-2 rounded-full bg-foreground shrink-0"
            />
          )}
        </div>
      </div>
    </button>
  );
}

export function ConversationsSidebar({
  conversations,
  selectedConversationId,
  searchQuery,
  onSearchChange,
  onSelectConversation,
  className,
}: ConversationsSidebarProps) {
  return (
    <aside
      aria-label="Conversations list"
      className={cn(
        "flex flex-col border-r border-border bg-card h-full overflow-hidden",
        className
      )}
    >
      <div className="p-3.5 border-b border-border/70 shrink-0">
        <SearchInput
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search conversations..."
          className="h-9 text-xs bg-secondary/40 border-border/70"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-xs font-medium text-muted-foreground">
              No conversations match &ldquo;{searchQuery}&rdquo;.
            </p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <ConversationListItem
              key={conversation.id}
              conversation={conversation}
              isActive={selectedConversationId === conversation.id}
              onSelect={onSelectConversation}
            />
          ))
        )}
      </div>
    </aside>
  );
}

