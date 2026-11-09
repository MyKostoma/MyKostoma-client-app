import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api/baseApi";
import type { RootState } from "@/store";
import type {
  NotificationFilterTab,
  NotificationItem,
  NotificationFetchStatus,
} from "@/features/notifications/types";
import { DEFAULT_NOTIFICATIONS } from "@/features/notifications/data";

export interface NotificationsState {
  items: NotificationItem[];
  activeTab: NotificationFilterTab;
  status: NotificationFetchStatus;
  error: string | null;
}

const initialState: NotificationsState = {
  items: DEFAULT_NOTIFICATIONS,
  activeTab: "all",
  status: "idle",
  error: null,
};

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      NotificationItem[],
      { tab?: NotificationFilterTab } | void
    >({
      query: (params) => ({
        url: "/notifications",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Notification"],
    }),
    markNotificationAsReadEndpoint: builder.mutation<
      { id: string; success: boolean },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
    markAllNotificationsAsReadEndpoint: builder.mutation<
      { success: boolean },
      void
    >({
      query: () => ({
        url: "/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
    archiveNotificationEndpoint: builder.mutation<
      { id: string; success: boolean },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/notifications/${id}/archive`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationAsReadEndpointMutation,
  useMarkAllNotificationsAsReadEndpointMutation,
  useArchiveNotificationEndpointMutation,
} = notificationsApi;

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotificationsActiveTab: (
      state,
      action: PayloadAction<NotificationFilterTab>
    ) => {
      state.activeTab = action.payload;
    },
    markNotificationAsReadLocal: (state, action: PayloadAction<string>) => {
      const item = state.items.find((n) => n.id === action.payload);
      if (item) {
        item.read = true;
      }
    },
    markAllNotificationsAsReadLocal: (state) => {
      state.items.forEach((n) => {
        n.read = true;
      });
    },
    archiveNotificationLocal: (state, action: PayloadAction<string>) => {
      const item = state.items.find((n) => n.id === action.payload);
      if (item) {
        item.archived = true;
      }
    },
    unarchiveNotificationLocal: (state, action: PayloadAction<string>) => {
      const item = state.items.find((n) => n.id === action.payload);
      if (item) {
        item.archived = false;
      }
    },
    restoreMockNotifications: (state) => {
      state.items = DEFAULT_NOTIFICATIONS;
      state.status = "idle";
      state.error = null;
    },
    setNotificationsStatus: (
      state,
      action: PayloadAction<{ status: NotificationFetchStatus; error?: string | null }>
    ) => {
      state.status = action.payload.status;
      state.error = action.payload.error ?? null;
    },
  },
});

export const {
  setNotificationsActiveTab,
  markNotificationAsReadLocal,
  markAllNotificationsAsReadLocal,
  archiveNotificationLocal,
  unarchiveNotificationLocal,
  restoreMockNotifications,
  setNotificationsStatus,
} = notificationsSlice.actions;

export const selectAllNotifications = (state: RootState) =>
  state.notifications.items;

export const selectNotificationsActiveTab = (state: RootState) =>
  state.notifications.activeTab;

export const selectNotificationsStatus = (state: RootState) =>
  state.notifications.status;

export const selectNotificationsError = (state: RootState) =>
  state.notifications.error;

export const selectNotificationsUnreadCount = (state: RootState) =>
  state.notifications.items.filter((n) => !n.read && !n.archived).length;

export const selectNotificationsCounts = (state: RootState) => {
  const items = state.notifications.items;
  return {
    all: items.filter((n) => !n.archived).length,
    unread: items.filter((n) => !n.read && !n.archived).length,
    archive: items.filter((n) => n.archived).length,
  };
};

export default notificationsSlice.reducer;
