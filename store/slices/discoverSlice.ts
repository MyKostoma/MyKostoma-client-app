import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api/baseApi";
import type { RootState } from "@/store";
import type {
  ConsumerCategoryItem,
  FeaturedProItem,
  SpotlightProviderItem,
} from "@/components/consumer-home/types";
import type {
  SearchFilterState,
  SearchProfessionalItem,
} from "@/components/consumer-search/types";
import type { ProfessionalProfileData } from "@/components/profile/types";
import {
  DEFAULT_CONSUMER_CATEGORIES,
  DEFAULT_FEATURED_PROFESSIONALS,
  DEFAULT_SPOTLIGHT_PROVIDERS,
} from "@/features/consumer/home/data";
import { SEARCH_PROFESSIONALS_DATA } from "@/features/consumer/search/data";
import {
  DEFAULT_PROFESSIONAL_PROFILE,
  getProfessionalProfileById,
} from "@/features/profile/data";

export interface DiscoverState {
  featuredProfessionals: FeaturedProItem[];
  spotlightProviders: SpotlightProviderItem[];
  searchProfessionals: SearchProfessionalItem[];
  activeProfile: ProfessionalProfileData;
  followedProIds: string[];
  searchQuery: string;
  searchSortBy: string;
  searchFilters: SearchFilterState;
}

const initialState: DiscoverState = {
  featuredProfessionals: DEFAULT_FEATURED_PROFESSIONALS,
  spotlightProviders: DEFAULT_SPOTLIGHT_PROVIDERS,
  searchProfessionals: SEARCH_PROFESSIONALS_DATA,
  activeProfile: DEFAULT_PROFESSIONAL_PROFILE,
  followedProIds: [],
  searchQuery: "",
  searchSortBy: "best-match",
  searchFilters: {
    categories: [],
    location: "all",
    verifications: [],
    minRating: null,
  },
};

export const discoverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDiscoverHomeData: builder.query<
      {
        categories: ConsumerCategoryItem[];
        featuredProfessionals: FeaturedProItem[];
        spotlightProviders: SpotlightProviderItem[];
      },
      void
    >({
      query: () => ({
        url: "/discover/home",
        method: "GET",
      }),
      providesTags: ["Discover"],
    }),
    searchProfessionals: builder.query<
      SearchProfessionalItem[],
      { query?: string; filters?: Partial<SearchFilterState>; sortBy?: string }
    >({
      query: (params) => ({
        url: "/discover/professionals",
        method: "GET",
        params,
      }),
      providesTags: ["Discover"],
    }),
    getProfessionalProfile: builder.query<ProfessionalProfileData, string>({
      query: (id) => ({
        url: `/discover/professionals/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Profile", id }],
    }),
    toggleFollowProfessional: builder.mutation<
      { id: string; following: boolean },
      { id: string; following: boolean }
    >({
      query: ({ id, following }) => ({
        url: `/discover/professionals/${id}/follow`,
        method: "POST",
        body: { following },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Profile", id }],
    }),
    sendProfessionalInquiry: builder.mutation<
      { success: boolean },
      { recipientId: string; subject?: string; message: string }
    >({
      query: ({ recipientId, ...body }) => ({
        url: `/discover/professionals/${recipientId}/inquiry`,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDiscoverHomeDataQuery,
  useSearchProfessionalsQuery,
  useGetProfessionalProfileQuery,
  useToggleFollowProfessionalMutation,
  useSendProfessionalInquiryMutation,
} = discoverApi;

const discoverSlice = createSlice({
  name: "discover",
  initialState,
  reducers: {
    setDiscoverSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setDiscoverSearchSortBy: (state, action: PayloadAction<string>) => {
      state.searchSortBy = action.payload;
    },
    setDiscoverSearchFilters: (
      state,
      action: PayloadAction<SearchFilterState>
    ) => {
      state.searchFilters = action.payload;
    },
    resetDiscoverSearchFilters: (state) => {
      state.searchFilters = initialState.searchFilters;
    },
    setActiveProfileById: (state, action: PayloadAction<string>) => {
      state.activeProfile = getProfessionalProfileById(action.payload);
    },
    toggleFollowedProfessional: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.followedProIds.indexOf(id);
      if (index >= 0) {
        state.followedProIds.splice(index, 1);
      } else {
        state.followedProIds.push(id);
      }
    },
  },
});

export const {
  setDiscoverSearchQuery,
  setDiscoverSearchSortBy,
  setDiscoverSearchFilters,
  resetDiscoverSearchFilters,
  setActiveProfileById,
  toggleFollowedProfessional,
} = discoverSlice.actions;

export const selectFeaturedProfessionals = (state: RootState) =>
  state.discover.featuredProfessionals;
export const selectSpotlightProviders = (state: RootState) =>
  state.discover.spotlightProviders;
export const selectSearchProfessionals = (state: RootState) =>
  state.discover.searchProfessionals;
export const selectActiveProfile = (state: RootState) =>
  state.discover.activeProfile;
export const selectFollowedProIds = (state: RootState) =>
  state.discover.followedProIds;
export const selectDiscoverSearchQuery = (state: RootState) =>
  state.discover.searchQuery;
export const selectDiscoverSearchSortBy = (state: RootState) =>
  state.discover.searchSortBy;
export const selectDiscoverSearchFilters = (state: RootState) =>
  state.discover.searchFilters;

export default discoverSlice.reducer;
