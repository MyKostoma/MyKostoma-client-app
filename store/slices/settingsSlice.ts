import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import type { RootState } from "../index";
import type {
  DisputeRecord,
  NotificationPreferencesState,
  SettingsBusinessInfo,
  SettingsCredentialsInfo,
} from "@/components/settings/types";
import type {
  BusinessInfoFormValues,
  ChangePasswordPayload,
  CreateDisputePayload,
  CredentialsUploadValues,
  DeleteAccountPayload,
  ProfileSettingsFormValues,
} from "@/features/settings/types";
import {
  DEFAULT_NOTIFICATION_PREFERENCES,
  DEFAULT_SETTINGS_BUSINESS_INFO,
  DEFAULT_SETTINGS_CREDENTIALS_INFO,
  DEFAULT_SETTINGS_DISPUTES,
} from "@/features/settings/data";

export interface SettingsSliceState {
  notificationPreferences: NotificationPreferencesState;
  businessInfo: SettingsBusinessInfo;
  credentialsInfo: SettingsCredentialsInfo;
  disputes: DisputeRecord[];
  emailChangePending: boolean;
  twoFactorEnabled: boolean;
}

const initialState: SettingsSliceState = {
  notificationPreferences: DEFAULT_NOTIFICATION_PREFERENCES,
  businessInfo: DEFAULT_SETTINGS_BUSINESS_INFO,
  credentialsInfo: DEFAULT_SETTINGS_CREDENTIALS_INFO,
  disputes: DEFAULT_SETTINGS_DISPUTES,
  emailChangePending: false,
  twoFactorEnabled: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    saveNotificationPreferencesLocal: (
      state,
      action: PayloadAction<NotificationPreferencesState>
    ) => {
      state.notificationPreferences = action.payload;
    },
    updateBusinessInfoLocal: (
      state,
      action: PayloadAction<BusinessInfoFormValues>
    ) => {
      state.businessInfo = {
        ...action.payload,
        status: "pending",
      };
    },
    submitCredentialsLocal: (
      state,
      action: PayloadAction<CredentialsUploadValues>
    ) => {
      state.credentialsInfo = {
        ...action.payload,
        status: "pending",
      };
    },
    createDisputeLocal: (
      state,
      action: PayloadAction<CreateDisputePayload>
    ) => {
      const randomNum = Math.floor(10000 + Math.random() * 89999);
      const now = new Date();
      const dateInitiatedLabel = now.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

      const created: DisputeRecord = {
        id: `dis-${randomNum}`,
        code: `#DIS-${randomNum}`,
        transactionTitle: action.payload.transactionTitle,
        transactionRef: action.payload.transactionRef,
        dateInitiatedLabel,
        createdAtISO: now.toISOString().slice(0, 10),
        status: "open",
        reason: action.payload.reason,
        description: action.payload.description,
        amountFormatted: "₦125,000.00",
      };

      state.disputes.unshift(created);
    },
    requestEmailChangeLocal: (state) => {
      state.emailChangePending = true;
    },
    toggleTwoFactorLocal: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.twoFactorEnabled =
        action.payload !== undefined ? action.payload : !state.twoFactorEnabled;
    },
  },
});

export const {
  saveNotificationPreferencesLocal,
  updateBusinessInfoLocal,
  submitCredentialsLocal,
  createDisputeLocal,
  requestEmailChangeLocal,
  toggleTwoFactorLocal,
} = settingsSlice.actions;

export const selectNotificationPreferences = (state: RootState) =>
  state.settings.notificationPreferences;

export const selectSettingsBusinessInfo = (state: RootState) =>
  state.settings.businessInfo;

export const selectSettingsCredentialsInfo = (state: RootState) =>
  state.settings.credentialsInfo;

export const selectSettingsDisputes = (state: RootState) =>
  state.settings.disputes;

export const selectEmailChangePending = (state: RootState) =>
  state.settings.emailChangePending;

export const selectTwoFactorEnabled = (state: RootState) =>
  state.settings.twoFactorEnabled;

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettingsPreferences: builder.query<NotificationPreferencesState, void>({
      query: () => "/settings/preferences",
      providesTags: ["Settings"],
    }),
    saveProfileSettings: builder.mutation<void, ProfileSettingsFormValues>({
      query: (body) => ({
        url: "/settings/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Settings", "Profile", "User"],
    }),
    updatePassword: builder.mutation<void, ChangePasswordPayload>({
      query: (body) => ({
        url: "/settings/password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),
    saveNotificationPreferences: builder.mutation<
      NotificationPreferencesState,
      NotificationPreferencesState
    >({
      query: (body) => ({
        url: "/settings/notifications",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),
    submitBusinessInfo: builder.mutation<void, BusinessInfoFormValues>({
      query: (body) => ({
        url: "/settings/verification/business",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Settings", "Verification"],
    }),
    uploadCredentials: builder.mutation<void, CredentialsUploadValues>({
      query: (body) => ({
        url: "/settings/verification/credentials",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Settings", "Verification"],
    }),
    submitDispute: builder.mutation<DisputeRecord, CreateDisputePayload>({
      query: (body) => ({
        url: "/settings/disputes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Dispute", "Settings"],
    }),
    deleteUserAccount: builder.mutation<void, DeleteAccountPayload>({
      query: (body) => ({
        url: "/settings/account",
        method: "DELETE",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSettingsPreferencesQuery,
  useSaveProfileSettingsMutation,
  useUpdatePasswordMutation,
  useSaveNotificationPreferencesMutation,
  useSubmitBusinessInfoMutation,
  useUploadCredentialsMutation,
  useSubmitDisputeMutation,
  useDeleteUserAccountMutation,
} = settingsApi;

export default settingsSlice.reducer;
