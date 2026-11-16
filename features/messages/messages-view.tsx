"use client";

import { Plus } from "lucide-react";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { MessagesTopBar } from "@/components/layouts/top-bars/messages/messages-top-bar";
import { ConversationsSidebar } from "@/components/messages/conversations-sidebar";
import { MessagesNoSelection } from "@/components/messages/messages-no-selection";
import { ChatThreadPane } from "@/components/messages/chat-thread-pane";
import { MessagesEmptyState } from "@/components/messages/messages-empty-state";
import { MessagesErrorState } from "@/components/messages/messages-error-state";
import { NewConversationModal } from "@/components/modals/new-conversation-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMessagesService } from "./services/messagesApi";
import type { MessagesViewProps } from "./types";

export type { MessagesViewProps } from "./types";

export function MessagesView({
  initialConversations,
  initialSelectedConversationId,
}: MessagesViewProps) {
  const {
    conversations,
    rawConversations,
    selectedConversation,
    selectedConversationId,
    groupedMessages,
    searchQuery,
    error,
    isFailed,
    isNewConversationModalOpen,
    openNewConversationModal,
    closeNewConversationModal,
    selectConversation,
    setSearchQuery,
    sendMessage,
    createConversation,
    requestQuote,
    scheduleVisit,
    retry,
    contactSupport,
    findService,
    browseProfessionals,
  } = useMessagesService(initialConversations, initialSelectedConversationId);

  return (
    <>
      <DashboardTopBarSlot>
        <MessagesTopBar
          onNewConversation={openNewConversationModal}
          disabled={isFailed}
        />
      </DashboardTopBarSlot>

      <div className="space-y-4">
        {/* Mobile Action Bar */}
        <div className="flex sm:hidden items-center justify-end">
          <Button
            type="button"
            variant={isFailed ? "outline" : "default"}
            size="sm"
            disabled={isFailed}
            onClick={openNewConversationModal}
            leadingIcon={<Plus className="size-4" />}
            className="h-9 px-3.5 rounded-lg text-xs font-semibold shadow-xs"
          >
            New Conversation
          </Button>
        </div>

        {/* Conditional UI Rendering Based on State */}
        {isFailed ? (
          <MessagesErrorState
            description={
              error ??
              "We encountered a problem while fetching your conversations. Please check your internet connection and try again."
            }
            onRetry={retry}
            onContactSupport={contactSupport}
          />
        ) : rawConversations.length === 0 ? (
          <MessagesEmptyState
            onFindService={findService}
            onBrowseProfessionals={browseProfessionals}
          />
        ) : (
          <div className="flex h-[calc(100vh-8.5rem)] rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
            {/* Left Conversations List Pane */}
            <ConversationsSidebar
              conversations={conversations}
              selectedConversationId={selectedConversationId}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectConversation={(id) => selectConversation(id)}
              className={cn(
                "w-full md:w-80 lg:w-88 shrink-0",
                selectedConversation ? "hidden md:flex" : "flex"
              )}
            />

            {/* Right Active Thread or No-Selection Pane */}
            <div
              className={cn(
                "flex-1 min-w-0 h-full",
                selectedConversation ? "flex flex-col" : "hidden md:flex flex-col"
              )}
            >
              {selectedConversation ? (
                <ChatThreadPane
                  conversation={selectedConversation}
                  groupedMessages={groupedMessages}
                  onBackToList={() => selectConversation(null)}
                  onSendMessage={sendMessage}
                  onRequestQuote={requestQuote}
                  onScheduleVisit={scheduleVisit}
                />
              ) : (
                <MessagesNoSelection />
              )}
            </div>
          </div>
        )}
      </div>

      <NewConversationModal
        isOpen={isNewConversationModalOpen}
        onClose={closeNewConversationModal}
        onCreateConversation={createConversation}
      />
    </>
  );
}

export default MessagesView;

