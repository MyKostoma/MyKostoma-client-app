import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import type { RootState } from "../index";
import type {
  ProfessionalProfileData,
  ProfilePortfolioItem,
  ProfileReviewItem,
} from "@/components/profile/types";
import type {
  EditProfileFormValues,
  RequestContactUpdatePayload,
  SubmitReviewPayload,
} from "@/features/profile/types";
import {
  DEFAULT_COMPANY_PROFILE,
  MOCK_PROFESSIONAL_PROFILES,
} from "@/features/profile/data";

export interface ProfileResponseOverride {
  text: string;
  date: string;
}

export interface ProfileSliceState {
  ownProfile: ProfessionalProfileData;
  ownCompanyProfile: ProfessionalProfileData;
  helpfulReviewIds: string[];
  customReviewsByProfileId: Record<string, ProfileReviewItem[]>;
  responsesByReviewId: Record<string, ProfileResponseOverride>;
}

const initialState: ProfileSliceState = {
  ownProfile: MOCK_PROFESSIONAL_PROFILES["elena-rodriguez"],
  ownCompanyProfile: DEFAULT_COMPANY_PROFILE,
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

      const initials = fullName
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
  useSubmitReviewResponseMutation,
  useSubmitCustomerReviewMutation,
  useRequestContactUpdateMutation,
} = profileApi;

export default profileSlice.reducer;
