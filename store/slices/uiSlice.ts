import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserRole } from "@/types/user";

export type ConsumerMobileTab =
  | "home"
  | "search"
  | "requests"
  | "messages"
  | "profile";

export type ProfessionalMobileTab =
  | "requests"
  | "shop"
  | "reels"
  | "messages"
  | "settings";

export interface Notification {
  id: string;
  title?: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  timestamp: number;
  timeLabel?: string;
  read?: boolean;
}

export const DEFAULT_MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    title: "Booking Confirmed",
    type: "success",
    message:
      "Chidi Okonkwo accepted your plumbing inspection request for tomorrow at 10:00 AM.",
    timestamp: Date.now() - 1000 * 60 * 15,
    timeLabel: "15 mins ago",
    read: false,
  },
  {
    id: "notif-2",
    title: "New Quote Received",
    type: "info",
    message:
      "VoltSmart Solutions sent an estimate for your residential electrical wiring inquiry.",
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    timeLabel: "2 hours ago",
    read: false,
  },
  {
    id: "notif-3",
    title: "Escrow Payment Protected",
    type: "info",
    message:
      "Your deposit for LuxeNest Design Studio is safely held in MyKostoma Escrow.",
    timestamp: Date.now() - 1000 * 60 * 60 * 5,
    timeLabel: "5 hours ago",
    read: false,
  },
  {
    id: "notif-4",
    title: "Upcoming Appointment Reminder",
    type: "warning",
    message:
      "Reminder: Apex Climate Systems is scheduled for AC maintenance this Friday.",
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    timeLabel: "1 day ago",
    read: false,
  },
  {
    id: "notif-5",
    title: "Review Submitted",
    type: "success",
    message:
      "Thank you for rating Marcus Thorne! Your feedback helps keep our community trusted.",
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    timeLabel: "2 days ago",
    read: true,
  },
];

export interface UIState {
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";
  activePerspective: UserRole;
  consumerActiveNav: string;
  professionalActiveNav: string;
  consumerMobileTab: ConsumerMobileTab;
  professionalMobileTab: ProfessionalMobileTab;
  globalSearchQuery: string;
  unreadMessagesCount: number;
  unreadNotificationsCount: number;
  notifications: Notification[];
}

const initialUnreadCount = DEFAULT_MOCK_NOTIFICATIONS.filter(
  (n) => !n.read
).length;

const initialState: UIState = {
  sidebarOpen: true,
  theme: "system",
  activePerspective: "consumer",
  consumerActiveNav: "dashboard",
  professionalActiveNav: "overview",
  consumerMobileTab: "home",
  professionalMobileTab: "requests",
  globalSearchQuery: "",
  unreadMessagesCount: 2,
  unreadNotificationsCount: initialUnreadCount,
  notifications: DEFAULT_MOCK_NOTIFICATIONS,
};

function syncUnreadCount(state: UIState) {
  state.unreadNotificationsCount = state.notifications.filter(
    (n) => !n.read
  ).length;
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<UIState["theme"]>) => {
      state.theme = action.payload;
    },
    setActivePerspective: (state, action: PayloadAction<UserRole>) => {
      state.activePerspective = action.payload;
    },
    setConsumerActiveNav: (state, action: PayloadAction<string>) => {
      state.consumerActiveNav = action.payload;
    },
    setProfessionalActiveNav: (state, action: PayloadAction<string>) => {
      state.professionalActiveNav = action.payload;
    },
    setConsumerMobileTab: (state, action: PayloadAction<ConsumerMobileTab>) => {
      state.consumerMobileTab = action.payload;
    },
    setProfessionalMobileTab: (
      state,
      action: PayloadAction<ProfessionalMobileTab>
    ) => {
      state.professionalMobileTab = action.payload;
    },
    setGlobalSearchQuery: (state, action: PayloadAction<string>) => {
      state.globalSearchQuery = action.payload;
    },
    setUnreadMessagesCount: (state, action: PayloadAction<number>) => {
      state.unreadMessagesCount = Math.max(0, action.payload);
    },
    setUnreadNotificationsCount: (state, action: PayloadAction<number>) => {
      state.unreadNotificationsCount = Math.max(0, action.payload);
    },
    addNotification: (
      state,
      action: PayloadAction<Omit<Notification, "id" | "timestamp">>
    ) => {
      state.notifications.unshift({
        ...action.payload,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        read: false,
      });
      syncUnreadCount(state);
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const target = state.notifications.find((n) => n.id === action.payload);
      if (target) {
        target.read = true;
      }
      syncUnreadCount(state);
    },
    markNotificationsAsRead: (state, action: PayloadAction<string[]>) => {
      const ids = new Set(action.payload);
      state.notifications.forEach((n) => {
        if (ids.has(n.id)) {
          n.read = true;
        }
      });
      syncUnreadCount(state);
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true;
      });
      syncUnreadCount(state);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
      syncUnreadCount(state);
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadNotificationsCount = 0;
    },
    resetMockNotifications: (state) => {
      state.notifications = DEFAULT_MOCK_NOTIFICATIONS;
      syncUnreadCount(state);
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  setActivePerspective,
  setConsumerActiveNav,
  setProfessionalActiveNav,
  setConsumerMobileTab,
  setProfessionalMobileTab,
  setGlobalSearchQuery,
  setUnreadMessagesCount,
  setUnreadNotificationsCount,
  addNotification,
  markNotificationAsRead,
  markNotificationsAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearNotifications,
  resetMockNotifications,
} = uiSlice.actions;

// Selectors
export const selectSidebarOpen = (state: { ui: UIState }) =>
  state.ui.sidebarOpen;
export const selectTheme = (state: { ui: UIState }) => state.ui.theme;
export const selectActivePerspective = (state: { ui: UIState }) =>
  state.ui.activePerspective;
export const selectConsumerActiveNav = (state: { ui: UIState }) =>
  state.ui.consumerActiveNav;
export const selectProfessionalActiveNav = (state: { ui: UIState }) =>
  state.ui.professionalActiveNav;
export const selectConsumerMobileTab = (state: { ui: UIState }) =>
  state.ui.consumerMobileTab;
export const selectProfessionalMobileTab = (state: { ui: UIState }) =>
  state.ui.professionalMobileTab;
export const selectGlobalSearchQuery = (state: { ui: UIState }) =>
  state.ui.globalSearchQuery;
export const selectUnreadMessagesCount = (state: { ui: UIState }) =>
  state.ui.unreadMessagesCount;
export const selectUnreadNotificationsCount = (state: { ui: UIState }) =>
  state.ui.unreadNotificationsCount;
export const selectNotifications = (state: { ui: UIState }) =>
  state.ui.notifications;

export default uiSlice.reducer;
