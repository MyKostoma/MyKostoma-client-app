"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import {
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Smile,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ConversationAvatar } from "./conversation-avatar";
import type {
  ChatComposerProps,
  ChatMessageBubbleProps,
  ChatThreadHeaderProps,
  ChatThreadPaneProps,
} from "./types";

export function ChatThreadHeader({
  conversation,
  onBackToList,
  onAudioCall,
  onVideoCall,
  onMoreOptions,
}: ChatThreadHeaderProps) {
  return (
    <header className="px-4 sm:px-6 py-3.5 border-b border-border bg-card flex items-center justify-between gap-3 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        {onBackToList && (
          <button
            type="button"
            onClick={onBackToList}
            aria-label="Back to conversations"
            className="md:hidden p-1.5 -ml-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="size-4" />
          </button>
        )}

        <ConversationAvatar
          name={conversation.participantName}
          initials={conversation.avatarInitials}
          variant={conversation.avatarVariant}
          avatarUrl={conversation.avatarUrl}
          size="md"
        />

        <div className="min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-foreground truncate leading-tight">
            {conversation.participantName}
          </h2>
          <div className="flex items-center gap-1.5 text-xs mt-0.5">
            <span className="text-muted-foreground truncate">
              {conversation.participantRole}
            </span>
            <span className="text-muted-foreground">•</span>
            {conversation.isOnline ? (
              <span className="inline-flex items-center gap-1 font-semibold text-success">
                <span className="size-1.5 rounded-full bg-success" />
                Online
              </span>
            ) : (
              <span className="text-muted-foreground font-medium">Offline</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={
            onAudioCall ??
            (() =>
              toast.info(
                `Starting audio call with ${conversation.participantName}...`
              ))
          }
          aria-label="Audio call"
          className="size-9 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary/70 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Phone className="size-4" />
        </button>

        <button
          type="button"
          onClick={
            onVideoCall ??
            (() =>
              toast.info(
                `Starting video call with ${conversation.participantName}...`
              ))
          }
          aria-label="Video call"
          className="size-9 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary/70 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Video className="size-4" />
        </button>

        <button
          type="button"
          onClick={
            onMoreOptions ??
            (() => toast.info("Conversation options opened"))
          }
          aria-label="More options"
          className="size-9 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary/70 flex items-center justify-center transition-colors cursor-pointer"
        >
          <MoreVertical className="size-4" />
        </button>
      </div>
    </header>
  );
}

export function ChatMessageBubble({
  message,
  participantName,
  participantInitials,
  participantAvatarVariant,
  participantAvatarUrl,
}: ChatMessageBubbleProps) {
  const isOutgoing = message.sender === "me";

  if (isOutgoing) {
    return (
      <div className="flex flex-col items-end space-y-1.5 ml-auto max-w-[85%] sm:max-w-[70%]">
        <div className="rounded-2xl rounded-tr-xs bg-primary text-primary-foreground px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs whitespace-pre-wrap">
          {message.text}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] px-1">
          <span className="text-muted-foreground font-medium">
            {message.timestamp}
          </span>
          {message.status && (
            <span
              className={cn(
                "font-bold uppercase tracking-wider",
                message.status === "READ"
                  ? "text-success"
                  : "text-foreground italic"
              )}
            >
              {message.status}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 max-w-[85%] sm:max-w-[70%]">
      <ConversationAvatar
        name={participantName}
        initials={participantInitials}
        variant={participantAvatarVariant}
        avatarUrl={participantAvatarUrl}
        size="sm"
        className="mt-0.5"
      />

      <div className="flex flex-col items-start space-y-1.5 min-w-0">
        <div className="rounded-2xl rounded-tl-xs border border-border bg-card text-foreground px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-2xs whitespace-pre-wrap">
          {message.text}
        </div>
        <span className="text-[10px] font-medium text-muted-foreground px-1">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}

export function ChatComposer({
  onSendMessage,
  onRequestQuote,
  onScheduleVisit,
  disabled = false,
}: ChatComposerProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <footer className="px-4 sm:px-6 py-3.5 border-t border-border bg-card shrink-0 space-y-2">
      <div className="rounded-xl border border-border bg-secondary/40 px-3 py-1.5 flex items-center gap-2.5 focus-within:ring-2 focus-within:ring-ring/20 focus-within:border-ring transition-all">
        <button
          type="button"
          onClick={() => toast.info("Attachment selector opened")}
          aria-label="Attach file"
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer shrink-0"
        >
          <Paperclip className="size-4" />
        </button>

        <textarea
          rows={1}
          value={text}
          disabled={disabled}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a message..."
          className="flex-1 bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none py-1.5 max-h-28"
        />

        <button
          type="button"
          onClick={() => toast.info("Emoji picker opened")}
          aria-label="Insert emoji"
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer shrink-0"
        >
          <Smile className="size-4" />
        </button>

        <button
          type="button"
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          aria-label="Send message"
          className="size-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Send className="size-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <span className="text-[11px] text-muted-foreground">
          Shift + Enter for new line
        </span>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onRequestQuote}
            className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            REQUEST QUOTE
          </button>
          <button
            type="button"
            onClick={onScheduleVisit}
            className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            SCHEDULE VISIT
          </button>
        </div>
      </div>
    </footer>
  );
}

export function ChatThreadPane({
  conversation,
  groupedMessages,
  onBackToList,
  onSendMessage,
  onRequestQuote,
  onScheduleVisit,
  className,
}: ChatThreadPaneProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.id, conversation.messages.length]);

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-background/40 overflow-hidden",
        className
      )}
    >
      <ChatThreadHeader
        conversation={conversation}
        onBackToList={onBackToList}
      />

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-6">
        {groupedMessages.map((group) => (
          <div key={group.dateGroup} className="space-y-4">
            <div className="flex justify-center">
              <span className="px-3 py-1 rounded-full bg-secondary text-[10px] font-bold uppercase tracking-wider text-muted-foreground select-none">
                {group.dateGroup}
              </span>
            </div>

            <div className="space-y-4">
              {group.messages.map((message) => (
                <ChatMessageBubble
                  key={message.id}
                  message={message}
                  participantName={conversation.participantName}
                  participantInitials={conversation.avatarInitials}
                  participantAvatarVariant={conversation.avatarVariant}
                  participantAvatarUrl={conversation.avatarUrl}
                />
              ))}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatComposer
        onSendMessage={onSendMessage}
        onRequestQuote={onRequestQuote}
        onScheduleVisit={onScheduleVisit}
      />
    </div>
  );
}

