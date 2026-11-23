import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import type { RootState } from "../index";
import type {
  ConsumerProfileData,
  ConsumerSavedAddress,
  ProfessionalProfileData,
  ProfilePortfolioItem,
  ProfileReviewItem,
} from "@/components/profile/types";
import type {
  ConsumerAddressFormValues,
  ConsumerEditProfileFormValues,
  EditProfileFormValues,
  RequestContactUpdatePayload,
  SubmitReviewPayload,
} from "@/features/profile/types";
import {
  DEFAULT_COMPANY_PROFILE,
  DEFAULT_CONSUMER_PROFILE,
  MOCK_PROFESSIONAL_PROFILES,
} from "@/features/profile/data";

export interface ProfileResponseOverride {
  text: string;
  date: string;
}

export interface ProfileSliceState {
  ownProfile: ProfessionalProfileData;
  ownCompanyProfile: ProfessionalProfileData;
  consumerProfile: ConsumerProfileData;
  helpfulReviewIds: string[];
  customReviewsByProfileId: Record<string, ProfileReviewItem[]>;
  responsesByReviewId: Record<string, ProfileResponseOverride>;
}

const initialState: ProfileSliceState = {
  ownProfile: MOCK_PROFESSIONAL_PROFILES["elena-rodriguez"],
  ownCompanyProfile: DEFAULT_COMPANY_PROFILE,
  consumerProfile: DEFAULT_CONSUMER_PROFILE,
  helpfulReviewIds: [],
  customReviewsByProfileId: {},
  responsesByReviewId: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateOwnProfileLocal: (
      state,
      action: PayloadAction<EditProfileFormValues>
    ) => {
      const { fullName, category, location, bio, skills, avatarUrl } =
        action.payload;
      const rolePrefix = state.ownProfile.roleTitle.includes(" at ")
        ? `Lead ${category} Specialist at ${state.ownProfile.roleTitle.split(" at ")[1]}`
        : `${category} Specialist • ${state.ownProfile.experienceLabel}`;

      state.ownProfile = {
        ...state.ownProfile,
        name: fullName,
        category,
        roleTitle:
          category === state.ownProfile.category
            ? state.ownProfile.roleTitle
            : rolePrefix,
        location,
        bio,
        skills,
        avatarUrl,
      };
    },
    updateOwnProfilePhotoLocal: (
      state,
      action: PayloadAction<{ avatarUrl: string }>
    ) => {
      state.ownProfile = {
        ...state.ownProfile,
        avatarUrl: action.payload.avatarUrl,
      };
    },
    updateOwnCompanyProfileLocal: (
      state,
      action: PayloadAction<EditProfileFormValues>
    ) => {
      const { fullName, category, location, bio, skills, avatarUrl } =
        action.payload;

      const initials =
        fullName
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((word) => word[0]?.toUpperCase() ?? "")
          .join("") || "CO";

      state.ownCompanyProfile = {
        ...state.ownCompanyProfile,
        name: fullName,
        category,
        roleTitle: category,
        location,
        bio,
        skills,
        avatarUrl,
        companyDetails: state.ownCompanyProfile.companyDetails
          ? {
              ...state.ownCompanyProfile.companyDetails,
              logoMonogram: initials,
            }
          : undefined,
      };
    },
    updateOwnCompanyPhotoLocal: (
      state,
      action: PayloadAction<{ avatarUrl: string }>
    ) => {
      state.ownCompanyProfile = {
        ...state.ownCompanyProfile,
        avatarUrl: action.payload.avatarUrl,
      };
    },
    updateConsumerProfileLocal: (
      state,
      action: PayloadAction<ConsumerEditProfileFormValues>
    ) => {
      const {
        fullName,
        email,
        phone,
        location,
        bio,
        preferredContact,
        serviceInterests,
        avatarUrl,
      } = action.payload;

      state.consumerProfile = {
        ...state.consumerProfile,
        fullName,
        email,
        phone,
        location,
        bio,
        preferredContact,
        serviceInterests,
        avatarUrl,
      };
    },
    updateConsumerPhotoLocal: (
      state,
      action: PayloadAction<{ avatarUrl: string }>
    ) => {
      state.consumerProfile = {
        ...state.consumerProfile,
        avatarUrl: action.payload.avatarUrl,
      };
    },
    saveConsumerAddressLocal: (
      state,
      action: PayloadAction<ConsumerAddressFormValues>
    ) => {
      const incoming = action.payload;
      const addressId = incoming.id || `addr-${Date.now()}`;
      const record: ConsumerSavedAddress = {
        id: addressId,
        label: incoming.label,
        tag: incoming.tag,
        streetAddress: incoming.streetAddress,
        area: incoming.area,
        landmark: incoming.landmark,
        phone: incoming.phone,
        accessNotes: incoming.accessNotes,
        isDefault:
          incoming.isDefault || state.consumerProfile.savedAddresses.length === 0,
      };

      const exists = state.consumerProfile.savedAddresses.some(
        (a) => a.id === addressId
      );

      let nextList = exists
        ? state.consumerProfile.savedAddresses.map((a) =>
            a.id === addressId ? record : a
          )
        : [record, ...state.consumerProfile.savedAddresses];

      if (record.isDefault) {
        nextList = nextList.map((a) => ({
          ...a,
          isDefault: a.id === addressId,
        }));
      }

      state.consumerProfile.savedAddresses = nextList;
    },
    deleteConsumerAddressLocal: (
      state,
      action: PayloadAction<{ addressId: string }>
    ) => {
      const removed = state.consumerProfile.savedAddresses.find(
        (a) => a.id === action.payload.addressId
      );
      const remaining = state.consumerProfile.savedAddresses.filter(
        (a) => a.id !== action.payload.addressId
      );
      if (removed?.isDefault && remaining.length > 0) {
        remaining[0] = { ...remaining[0], isDefault: true };
      }
      state.consumerProfile.savedAddresses = remaining;
    },
    setDefaultConsumerAddressLocal: (
      state,
      action: PayloadAction<{ addressId: string }>
    ) => {
      state.consumerProfile.savedAddresses =
        state.consumerProfile.savedAddresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === action.payload.addressId,
        }));
    },
    toggleConsumerSavedProLocal: (
      state,
      action: PayloadAction<{ proId: string }>
    ) => {
      const { proId } = action.payload;
      if (state.consumerProfile.savedProIds.includes(proId)) {
        state.consumerProfile.savedProIds =
          state.consumerProfile.savedProIds.filter((id) => id !== proId);
      } else {
        state.consumerProfile.savedProIds = [
          proId,
          ...state.consumerProfile.savedProIds,
        ];
      }
    },
    updateConsumerWrittenReviewLocal: (
      state,
      action: PayloadAction<{
        reviewId: string;
        rating: number;
        comment: string;
      }>
    ) => {
      const { reviewId, rating, comment } = action.payload;
      state.consumerProfile.writtenReviews =
        state.consumerProfile.writtenReviews.map((rev) =>
          rev.id === reviewId ? { ...rev, rating, comment } : rev
        );
    },
    deleteConsumerWrittenReviewLocal: (
      state,
      action: PayloadAction<{ reviewId: string }>
    ) => {
      state.consumerProfile.writtenReviews =
        state.consumerProfile.writtenReviews.filter(
          (rev) => rev.id !== action.payload.reviewId
        );
    },
    addPortfolioProjectLocal: (
      state,
      action: PayloadAction<ProfilePortfolioItem>
    ) => {
      state.ownProfile = {
        ...state.ownProfile,
        portfolio: [action.payload, ...state.ownProfile.portfolio],
      };
    },
    deletePortfolioProjectLocal: (
      state,
      action: PayloadAction<{ projectId: string }>
    ) => {
      state.ownProfile = {
        ...state.ownProfile,
        portfolio: state.ownProfile.portfolio.filter(
          (item) => item.id !== action.payload.projectId
        ),
      };
    },
    addCompanyPortfolioProjectLocal: (
      state,
      action: PayloadAction<ProfilePortfolioItem>
    ) => {
      state.ownCompanyProfile = {
        ...state.ownCompanyProfile,
        portfolio: [action.payload, ...state.ownCompanyProfile.portfolio],
      };
    },
    deleteCompanyPortfolioProjectLocal: (
      state,
      action: PayloadAction<{ projectId: string }>
    ) => {
      state.ownCompanyProfile = {
        ...state.ownCompanyProfile,
        portfolio: state.ownCompanyProfile.portfolio.filter(
          (item) => item.id !== action.payload.projectId
        ),
      };
    },
    replyToReviewLocal: (
      state,
      action: PayloadAction<{
        reviewId: string;
        text: string;
        date: string;
      }>
    ) => {
      const { reviewId, text, date } = action.payload;
      state.responsesByReviewId[reviewId] = { text, date };
      state.ownProfile = {
        ...state.ownProfile,
        reviews: state.ownProfile.reviews.map((rev) =>
          rev.id === reviewId
            ? {
                ...rev,
                professionalResponse: text,
                professionalResponseDate: date,
              }
            : rev
        ),
      };
      state.ownCompanyProfile = {
        ...state.ownCompanyProfile,
        reviews: state.ownCompanyProfile.reviews.map((rev) =>
          rev.id === reviewId
            ? {
                ...rev,
                professionalResponse: text,
                professionalResponseDate: date,
              }
            : rev
        ),
      };
    },
    addCustomerReviewLocal: (
      state,
      action: PayloadAction<{
        profileId: string;
        review: ProfileReviewItem;
      }>
    ) => {
      const { profileId, review } = action.payload;
      const existing = state.customReviewsByProfileId[profileId] ?? [];
      state.customReviewsByProfileId[profileId] = [review, ...existing];
    },
    toggleReviewHelpfulLocal: (
      state,
      action: PayloadAction<{ reviewId: string }>
    ) => {
      const { reviewId } = action.payload;
      if (state.helpfulReviewIds.includes(reviewId)) {
        state.helpfulReviewIds = state.helpfulReviewIds.filter(
          (id) => id !== reviewId
        );
      } else {
        state.helpfulReviewIds = [...state.helpfulReviewIds, reviewId];
      }
    },
  },
});

export const {
  updateOwnProfileLocal,
  updateOwnProfilePhotoLocal,
  updateOwnCompanyProfileLocal,
  updateOwnCompanyPhotoLocal,
  updateConsumerProfileLocal,
  updateConsumerPhotoLocal,
  saveConsumerAddressLocal,
  deleteConsumerAddressLocal,
  setDefaultConsumerAddressLocal,
  toggleConsumerSavedProLocal,
  updateConsumerWrittenReviewLocal,
  deleteConsumerWrittenReviewLocal,
  addPortfolioProjectLocal,
  deletePortfolioProjectLocal,
  addCompanyPortfolioProjectLocal,
  deleteCompanyPortfolioProjectLocal,
  replyToReviewLocal,
  addCustomerReviewLocal,
  toggleReviewHelpfulLocal,
} = profileSlice.actions;

export const selectOwnProfessionalProfile = (state: RootState) =>
  state.profile.ownProfile;
export const selectOwnCompanyProfile = (state: RootState) =>
  state.profile.ownCompanyProfile;
export const selectConsumerProfile = (state: RootState) =>
  state.profile.consumerProfile;
export const selectHelpfulReviewIds = (state: RootState) =>
  state.profile.helpfulReviewIds;
export const selectCustomReviewsByProfileId = (state: RootState) =>
  state.profile.customReviewsByProfileId;
export const selectResponsesByReviewId = (state: RootState) =>
  state.profile.responsesByReviewId;

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOwnProfessionalProfile: builder.query<ProfessionalProfileData, void>({
      query: () => "/profile/me",
      providesTags: ["Profile"],
    }),
    updateOwnProfessionalProfile: builder.mutation<
      ProfessionalProfileData,
      EditProfileFormValues
    >({
      query: (body) => ({
        url: "/profile/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile", "User"],
    }),
    updateOwnProfilePhoto: builder.mutation<
      { avatarUrl: string },
      { avatarUrl: string }
    >({
      query: (body) => ({
        url: "/profile/me/photo",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile", "User"],
    }),
    getOwnCompanyProfile: builder.query<ProfessionalProfileData, void>({
      query: () => "/profile/company/me",
      providesTags: ["Profile"],
    }),
    updateOwnCompanyProfile: builder.mutation<
      ProfessionalProfileData,
      EditProfileFormValues
    >({
      query: (body) => ({
        url: "/profile/company/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile", "User"],
    }),
    updateOwnCompanyPhoto: builder.mutation<
      { avatarUrl: string },
      { avatarUrl: string }
    >({
      query: (body) => ({
        url: "/profile/company/me/photo",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile", "User"],
    }),
    getConsumerProfile: builder.query<ConsumerProfileData, void>({
      query: () => "/profile/consumer/me",
      providesTags: ["Profile"],
    }),
    updateConsumerProfile: builder.mutation<
      ConsumerProfileData,
      ConsumerEditProfileFormValues
    >({
      query: (body) => ({
        url: "/profile/consumer/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile", "User"],
    }),
    updateConsumerPhoto: builder.mutation<
      { avatarUrl: string },
      { avatarUrl: string }
    >({
      query: (body) => ({
        url: "/profile/consumer/me/photo",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile", "User"],
    }),
    submitReviewResponse: builder.mutation<
      { reviewId: string; response: string },
      { reviewId: string; response: string }
    >({
      query: ({ reviewId, response }) => ({
        url: `/profile/reviews/${reviewId}/response`,
        method: "POST",
        body: { response },
      }),
      invalidatesTags: ["Profile"],
    }),
    submitCustomerReview: builder.mutation<
      ProfileReviewItem,
      SubmitReviewPayload
    >({
      query: ({ profileId, rating, comment }) => ({
        url: `/profile/${profileId}/reviews`,
        method: "POST",
        body: { rating, comment },
      }),
      invalidatesTags: ["Profile"],
    }),
    requestContactUpdate: builder.mutation<
      { status: string },
      RequestContactUpdatePayload
    >({
      query: (body) => ({
        url: "/profile/contact-update-request",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOwnProfessionalProfileQuery,
  useUpdateOwnProfessionalProfileMutation,
  useUpdateOwnProfilePhotoMutation,
  useGetOwnCompanyProfileQuery,
  useUpdateOwnCompanyProfileMutation,
  useUpdateOwnCompanyPhotoMutation,
  useGetConsumerProfileQuery,
  useUpdateConsumerProfileMutation,
  useUpdateConsumerPhotoMutation,
  useSubmitReviewResponseMutation,
  useSubmitCustomerReviewMutation,
  useRequestContactUpdateMutation,
} = profileApi;

export default profileSlice.reducer;
