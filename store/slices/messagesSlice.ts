import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api/baseApi";
import type { RootState } from "@/store";
import type {
  ConversationItem,
  MessagesFetchStatus,
  NewConversationPayload,
} from "@/features/messages/types";
import { DEFAULT_CONVERSATIONS } from "@/features/messages/data";

export interface MessagesState {
  conversations: ConversationItem[];
  selectedConversationId: string | null;
  searchQuery: string;
  status: MessagesFetchStatus;
  error: string | null;
}

const initialState: MessagesState = {
  conversations: DEFAULT_CONVERSATIONS,
  selectedConversationId: null,
  searchQuery: "",
  status: "idle",
  error: null,
};

export const messagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<
      ConversationItem[],
      { search?: string } | void
    >({
      query: (params) => ({
        url: "/messages/conversations",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Message"],
    }),
    sendMessageEndpoint: builder.mutation<
      { id: string; success: boolean },
      { conversationId: string; text: string }
    >({
      query: ({ conversationId, text }) => ({
        url: `/messages/conversations/${conversationId}/messages`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["Message"],
    }),
    createConversationEndpoint: builder.mutation<
      ConversationItem,
      NewConversationPayload
    >({
      query: (body) => ({
        url: "/messages/conversations",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Message"],
    }),
    markConversationReadEndpoint: builder.mutation<
      { id: string; success: boolean },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/messages/conversations/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Message"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetConversationsQuery,
  useSendMessageEndpointMutation,
  useCreateConversationEndpointMutation,
  useMarkConversationReadEndpointMutation,
} = messagesApi;

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    selectConversationLocal: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.selectedConversationId = action.payload;
      if (action.payload) {
        const conv = state.conversations.find((c) => c.id === action.payload);
        if (conv) {
          conv.unreadCount = 0;
        }
      }
    },
    setMessagesSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    sendMessageLocal: (
      state,
      action: PayloadAction<{
        conversationId: string;
        text: string;
        timestamp: string;
      }>
    ) => {
      const { conversationId, text, timestamp } = action.payload;
      const conv = state.conversations.find((c) => c.id === conversationId);
      if (conv) {
        conv.messages.push({
          id: `msg-${Date.now()}`,
          conversationId,
          sender: "me",
          text,
          timestamp,
          dateGroup: "TODAY",
          status: "DELIVERED",
        });
        conv.lastMessage = text;
        conv.lastMessageTime = "Just now";
        conv.unreadCount = 0;
      }
    },
    createConversationLocal: (
      state,
      action: PayloadAction<ConversationItem>
    ) => {
      state.conversations.unshift(action.payload);
      state.selectedConversationId = action.payload.id;
    },
    markConversationReadLocal: (state, action: PayloadAction<string>) => {
      const conv = state.conversations.find((c) => c.id === action.payload);
      if (conv) {
        conv.unreadCount = 0;
      }
    },
    setMessagesStatus: (
      state,
      action: PayloadAction<{
        status: MessagesFetchStatus;
        error?: string | null;
      }>
    ) => {
      state.status = action.payload.status;
      state.error = action.payload.error ?? null;
    },
    restoreMockConversations: (state) => {
      state.conversations = DEFAULT_CONVERSATIONS;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  selectConversationLocal,
  setMessagesSearchQuery,
  sendMessageLocal,
  createConversationLocal,
  markConversationReadLocal,
  setMessagesStatus,
  restoreMockConversations,
} = messagesSlice.actions;

export const selectAllConversations = (state: RootState) =>
  state.messages.conversations;

export const selectSelectedConversationId = (state: RootState) =>
  state.messages.selectedConversationId;

export const selectMessagesSearchQuery = (state: RootState) =>
  state.messages.searchQuery;

export const selectMessagesStatus = (state: RootState) =>
  state.messages.status;

export const selectMessagesError = (state: RootState) =>
  state.messages.error;

export const selectTotalUnreadMessagesCount = (state: RootState) =>
  state.messages.conversations.reduce((sum, c) => sum + c.unreadCount, 0);

export default messagesSlice.reducer;

