"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectAllConversations,
  selectSelectedConversationId,
  selectMessagesSearchQuery,
  selectMessagesStatus,
  selectMessagesError,
  selectConversationLocal,
  setMessagesSearchQuery,
  sendMessageLocal,
  createConversationLocal,
  markConversationReadLocal,
  setMessagesStatus,
  restoreMockConversations,
  useGetConversationsQuery,
  useSendMessageEndpointMutation,
  useCreateConversationEndpointMutation,
  useMarkConversationReadEndpointMutation,
} from "@/store/slices/messagesSlice";
import {
  filterConversations,
  groupMessagesByDate,
  formatMessageTimestamp,
  getParticipantInitial,
  pickAvatarVariant,
} from "./messagesHelpers";
import { DEFAULT_CONVERSATIONS } from "../data";
import type { ConversationItem, NewConversationPayload } from "../types";

export function useMessagesService(
  initialConversations?: ConversationItem[],
  initialSelectedConversationId?: string | null
) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const storeConversations = useAppSelector(selectAllConversations);
  const selectedConversationId = useAppSelector(selectSelectedConversationId);
  const searchQuery = useAppSelector(selectMessagesSearchQuery);
  const status = useAppSelector(selectMessagesStatus);
  const error = useAppSelector(selectMessagesError);

  const [isNewConversationModalOpen, setIsNewConversationModalOpen] =
    useState(false);

  useEffect(() => {
    if (initialSelectedConversationId !== undefined) {
      dispatch(selectConversationLocal(initialSelectedConversationId));
    }
  }, [initialSelectedConversationId, dispatch]);

  const {
    data: apiConversations,
    isLoading: isQueryLoading,
    isError: isQueryError,
    refetch,
  } = useGetConversationsQuery(
    { search: searchQuery || undefined },
    { skip: false }
  );

  const [sendMessageMutation] = useSendMessageEndpointMutation();
  const [createConversationMutation] = useCreateConversationEndpointMutation();
  const [markReadMutation] = useMarkConversationReadEndpointMutation();

  const rawConversations = useMemo(() => {
    if (initialConversations !== undefined) {
      return initialConversations;
    }
    return (
      apiConversations ??
      (storeConversations && storeConversations.length > 0
        ? storeConversations
        : DEFAULT_CONVERSATIONS)
    );
  }, [initialConversations, apiConversations, storeConversations]);

  const filteredConversations = useMemo(() => {
    return filterConversations(rawConversations, searchQuery);
  }, [rawConversations, searchQuery]);

  const selectedConversation = useMemo(() => {
    if (!selectedConversationId) return null;
    return (
      rawConversations.find((conv) => conv.id === selectedConversationId) ??
      null
    );
  }, [rawConversations, selectedConversationId]);

  const groupedMessages = useMemo(() => {
    if (!selectedConversation) return [];
    return groupMessagesByDate(selectedConversation.messages);
  }, [selectedConversation]);

  const handleSelectConversation = useCallback(
    async (id: string | null) => {
      dispatch(selectConversationLocal(id));
      if (id) {
        dispatch(markConversationReadLocal(id));
        try {
          await markReadMutation({ id }).unwrap();
        } catch {
          // Optimistic state updated locally
        }
      }
    },
    [dispatch, markReadMutation]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      dispatch(setMessagesSearchQuery(value));
    },
    [dispatch]
  );

  const handleSendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || !selectedConversationId) return;

      const timestamp = formatMessageTimestamp();
      dispatch(
        sendMessageLocal({
          conversationId: selectedConversationId,
          text: trimmed,
          timestamp,
        })
      );

      try {
        await sendMessageMutation({
          conversationId: selectedConversationId,
          text: trimmed,
        }).unwrap();
      } catch {
        // Optimistic message appended locally
      }
    },
    [dispatch, selectedConversationId, sendMessageMutation]
  );

  const handleCreateConversation = useCallback(
    async (payload: NewConversationPayload) => {
      const name = payload.participantName.trim();
      const role = payload.participantRole.trim() || "Professional";
      const messageText = payload.initialMessage.trim();
      if (!name || !messageText) return;

      const convId = `conv-${Date.now()}`;
      const timestamp = formatMessageTimestamp();
      const newConversation: ConversationItem = {
        id: convId,
        participantName: name,
        participantRole: role,
        displayTitle: `${name} - ${role}`,
        avatarInitials: getParticipantInitial(name),
        avatarVariant: pickAvatarVariant(name),
        isOnline: true,
        unreadCount: 0,
        lastMessage: messageText,
        lastMessageTime: "Just now",
        messages: [
          {
            id: `msg-${Date.now()}`,
            conversationId: convId,
            sender: "me",
            text: messageText,
            timestamp,
            dateGroup: "TODAY",
            status: "DELIVERED",
          },
        ],
      };

      dispatch(createConversationLocal(newConversation));
      setIsNewConversationModalOpen(false);
      toast.success(`Started conversation with ${name}`);

      try {
        await createConversationMutation(payload).unwrap();
      } catch {
        // Optimistic conversation added locally
      }
    },
    [dispatch, createConversationMutation]
  );

  const handleRequestQuote = useCallback(() => {
    if (!selectedConversation) return;
    handleSendMessage(
      `Hi ${selectedConversation.participantName.split(" ")[0]}, could you please share an itemized quote for this job?`
    );
    toast.success("Quote request sent");
  }, [selectedConversation, handleSendMessage]);

  const handleScheduleVisit = useCallback(() => {
    if (!selectedConversation) return;
    handleSendMessage(
      `Hi ${selectedConversation.participantName.split(" ")[0]}, I'd like to schedule an on-site visit. What times work best for you?`
    );
    toast.success("Visit scheduling message sent");
  }, [selectedConversation, handleSendMessage]);

  const handleRetry = useCallback(() => {
    dispatch(setMessagesStatus({ status: "idle", error: null }));
    dispatch(restoreMockConversations());
    try {
      refetch();
    } catch {}
  }, [dispatch, refetch]);

  const handleContactSupport = useCallback(() => {
    toast.info("Connecting you with MyKostoma 24/7 Support...");
  }, []);

  const handleFindService = useCallback(() => {
    router.push("/shop");
  }, [router]);

  const handleBrowseProfessionals = useCallback(() => {
    router.push("/search");
  }, [router]);

  const openNewConversationModal = useCallback(() => {
    setIsNewConversationModalOpen(true);
  }, []);

  const closeNewConversationModal = useCallback(() => {
    setIsNewConversationModalOpen(false);
  }, []);

  const hasFallbackData = Boolean(
    (initialConversations && initialConversations.length > 0) ||
      (storeConversations && storeConversations.length > 0) ||
      DEFAULT_CONVERSATIONS.length > 0
  );

  const isFailed = status === "failed" || (isQueryError && !hasFallbackData);
  const isLoading = status === "loading" || (isQueryLoading && !hasFallbackData);

  return {
    conversations: filteredConversations,
    rawConversations,
    selectedConversation,
    selectedConversationId,
    groupedMessages,
    searchQuery,
    status,
    error,
    isLoading,
    isFailed,
    isNewConversationModalOpen,
    openNewConversationModal,
    closeNewConversationModal,
    selectConversation: handleSelectConversation,
    setSearchQuery: handleSearchChange,
    sendMessage: handleSendMessage,
    createConversation: handleCreateConversation,
    requestQuote: handleRequestQuote,
    scheduleVisit: handleScheduleVisit,
    retry: handleRetry,
    contactSupport: handleContactSupport,
    findService: handleFindService,
    browseProfessionals: handleBrowseProfessionals,
  };
}

