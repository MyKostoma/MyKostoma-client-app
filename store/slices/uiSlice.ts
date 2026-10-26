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
  type: "success" | "error" | "warning" | "info";
  message: string;
  timestamp: number;
  read?: boolean;
}

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

const initialState: UIState = {
  sidebarOpen: true,
  theme: "system",
  activePerspective: "consumer",
  consumerActiveNav: "dashboard",
  professionalActiveNav: "overview",
  consumerMobileTab: "home",
  professionalMobileTab: "requests",
  globalSearchQuery: "",
  unreadMessagesCount: 0,
  unreadNotificationsCount: 0,
  notifications: [],
};

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
      state.notifications.push({
        ...action.payload,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        read: false,
      });
      state.unreadNotificationsCount += 1;
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const target = state.notifications.find((n) => n.id === action.payload);
      if (target && !target.read && state.unreadNotificationsCount > 0) {
        state.unreadNotificationsCount -= 1;
      }
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadNotificationsCount = 0;
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
  removeNotification,
  clearNotifications,
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

