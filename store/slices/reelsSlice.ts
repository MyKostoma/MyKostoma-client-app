import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import type { RootState } from "../index";
import type {
  ManagedReelItem,
  ReelCreatorProfile,
  ReelItem,
  ReelVisibility,
} from "@/components/reels/types";
import type {
  ReportReelPayload,
  UpdateReelPayload,
  UploadReelPayload,
} from "@/features/reels/types";
import {
  DEFAULT_FEED_REELS,
  DEFAULT_MY_REELS,
  DEFAULT_REEL_CREATORS,
} from "@/features/reels/data";

export interface ReelsSliceState {
  feedReels: ReelItem[];
  myReels: ManagedReelItem[];
  creators: ReelCreatorProfile[];
  likedReelIds: string[];
  followedCreatorIds: string[];
  reportedReelIds: string[];
}

const initialState: ReelsSliceState = {
  feedReels: DEFAULT_FEED_REELS,
  myReels: DEFAULT_MY_REELS,
  creators: DEFAULT_REEL_CREATORS,
  likedReelIds: ["reel-101"],
  followedCreatorIds: ["marcus-wright", "elena-rossi", "elena-rodriguez"],
  reportedReelIds: [],
};

const toPublicFeedItem = (managed: ManagedReelItem): ReelItem => ({
  id: managed.id,
  creatorId: managed.creatorId,
  creatorName: managed.creatorName,
  creatorRole: managed.creatorRole,
  creatorAvatarUrl: managed.creatorAvatarUrl,
  creatorVerified: managed.creatorVerified,
  title: managed.title,
  caption: managed.caption,
  hashtags: managed.hashtags,
  thumbnailUrl: managed.thumbnailUrl,
  videoUrl: managed.videoUrl,
  durationSeconds: managed.durationSeconds,
  likesCount: managed.likesCount,
  viewsCount: managed.viewsCount,
  commentsCount: managed.commentsCount,
  audioLabel: managed.audioLabel,
  uploadedAtLabel: managed.uploadedAtLabel,
  createdAtISO: managed.createdAtISO,
});

const reelsSlice = createSlice({
  name: "reels",
  initialState,
  reducers: {
    toggleLikeReelLocal: (
      state,
      action: PayloadAction<{ reelId: string }>
    ) => {
      const { reelId } = action.payload;
      const alreadyLiked = state.likedReelIds.includes(reelId);
      const delta = alreadyLiked ? -1 : 1;

      if (alreadyLiked) {
        state.likedReelIds = state.likedReelIds.filter((id) => id !== reelId);
      } else {
        state.likedReelIds.push(reelId);
      }

      const feedItem = state.feedReels.find((item) => item.id === reelId);
      if (feedItem) {
        feedItem.likesCount = Math.max(0, feedItem.likesCount + delta);
      }

      const managedItem = state.myReels.find((item) => item.id === reelId);
      if (managedItem) {
        managedItem.likesCount = Math.max(0, managedItem.likesCount + delta);
      }
    },
    toggleFollowCreatorLocal: (
      state,
      action: PayloadAction<{ creatorId: string }>
    ) => {
      const { creatorId } = action.payload;
      const normalized = creatorId.trim().toLowerCase();
      const currentlyFollowing = state.followedCreatorIds.includes(normalized);
      const delta = currentlyFollowing ? -1 : 1;

      if (currentlyFollowing) {
        state.followedCreatorIds = state.followedCreatorIds.filter(
          (id) => id !== normalized
        );
      } else {
        state.followedCreatorIds.push(normalized);
      }

      const creator = state.creators.find(
        (item) => item.id.toLowerCase() === normalized
      );
      if (creator) {
        creator.followersCount = Math.max(0, creator.followersCount + delta);
      }
    },
    setFollowCreatorLocal: (
      state,
      action: PayloadAction<{ creatorId: string; following: boolean }>
    ) => {
      const { creatorId, following } = action.payload;
      const normalized = creatorId.trim().toLowerCase();
      const currentlyFollowing = state.followedCreatorIds.includes(normalized);
      if (currentlyFollowing === following) return;

      if (following) {
        state.followedCreatorIds.push(normalized);
      } else {
        state.followedCreatorIds = state.followedCreatorIds.filter(
          (id) => id !== normalized
        );
      }

      const creator = state.creators.find(
        (item) => item.id.toLowerCase() === normalized
      );
      if (creator) {
        creator.followersCount = Math.max(
          0,
          creator.followersCount + (following ? 1 : -1)
        );
      }
    },
    addUploadedReelLocal: (
      state,
      action: PayloadAction<{ reel: ManagedReelItem }>
    ) => {
      const { reel } = action.payload;
      state.myReels.unshift(reel);

      if (reel.status === "public") {
        state.feedReels.unshift(toPublicFeedItem(reel));
      }

      const creator = state.creators.find(
        (item) => item.id.toLowerCase() === reel.creatorId.toLowerCase()
      );
      if (creator && reel.status === "public") {
        creator.reelsCount += 1;
      }
    },
    updateManagedReelLocal: (
      state,
      action: PayloadAction<{
        reelId: string;
        title: string;
        caption: string;
        hashtags: string[];
        status: ReelVisibility;
        audioLabel: string;
      }>
    ) => {
      const { reelId, title, caption, hashtags, status, audioLabel } =
        action.payload;
      const managed = state.myReels.find((item) => item.id === reelId);
      if (!managed) return;

      managed.title = title;
      managed.caption = caption;
      managed.hashtags = hashtags;
      managed.status = status;
      managed.audioLabel = audioLabel;

      const feedIdx = state.feedReels.findIndex((item) => item.id === reelId);
      if (status === "public") {
        const synced = toPublicFeedItem(managed);
        if (feedIdx >= 0) {
          state.feedReels[feedIdx] = synced;
        } else {
          state.feedReels.unshift(synced);
        }
      } else if (feedIdx >= 0) {
        state.feedReels.splice(feedIdx, 1);
      }
    },
    deleteManagedReelLocal: (
      state,
      action: PayloadAction<{ reelId: string }>
    ) => {
      const { reelId } = action.payload;
      state.myReels = state.myReels.filter((item) => item.id !== reelId);
      state.feedReels = state.feedReels.filter((item) => item.id !== reelId);
      state.likedReelIds = state.likedReelIds.filter((id) => id !== reelId);
    },
    reportReelLocal: (state, action: PayloadAction<{ reelId: string }>) => {
      if (!state.reportedReelIds.includes(action.payload.reelId)) {
        state.reportedReelIds.push(action.payload.reelId);
      }
    },
  },
});

export const {
  toggleLikeReelLocal,
  toggleFollowCreatorLocal,
  setFollowCreatorLocal,
  addUploadedReelLocal,
  updateManagedReelLocal,
  deleteManagedReelLocal,
  reportReelLocal,
} = reelsSlice.actions;

export const selectFeedReels = (state: RootState) => state.reels.feedReels;

export const selectMyReels = (state: RootState) => state.reels.myReels;

export const selectReelCreators = (state: RootState) => state.reels.creators;

export const selectLikedReelIds = (state: RootState) =>
  state.reels.likedReelIds;

export const selectFollowedCreatorIds = (state: RootState) =>
  state.reels.followedCreatorIds;

export const selectReportedReelIds = (state: RootState) =>
  state.reels.reportedReelIds;

export const selectManagedReelById =
  (reelId: string) => (state: RootState) => {
    const normalized = reelId.trim().toLowerCase();
    return state.reels.myReels.find(
      (item) => item.id.toLowerCase() === normalized
    );
  };

export const selectReelCreatorById =
  (creatorId: string) => (state: RootState) => {
    const normalized = creatorId.trim().toLowerCase();
    return state.reels.creators.find(
      (item) => item.id.toLowerCase() === normalized
    );
  };

export const reelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDiscoverReels: builder.query<ReelItem[], void>({
      query: () => "/reels/discover",
      providesTags: ["Reels"],
    }),
    getMyReels: builder.query<ManagedReelItem[], void>({
      query: () => "/reels/mine",
      providesTags: ["Reels"],
    }),
    toggleLikeReel: builder.mutation<void, { reelId: string; liked: boolean }>({
      query: ({ reelId, liked }) => ({
        url: `/reels/${encodeURIComponent(reelId)}/like`,
        method: "POST",
        body: { liked },
      }),
      invalidatesTags: (_result, _error, { reelId }) => [
        { type: "Reel", id: reelId },
        "Reels",
      ],
    }),
    uploadReel: builder.mutation<ManagedReelItem, UploadReelPayload>({
      query: (body) => ({
        url: "/reels",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reels", "Profile"],
    }),
    updateReel: builder.mutation<ManagedReelItem, UpdateReelPayload>({
      query: ({ reelId, ...body }) => ({
        url: `/reels/${encodeURIComponent(reelId)}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { reelId }) => [
        { type: "Reel", id: reelId },
        "Reels",
      ],
    }),
    deleteReel: builder.mutation<void, string>({
      query: (reelId) => ({
        url: `/reels/${encodeURIComponent(reelId)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reels", "Profile"],
    }),
    reportReel: builder.mutation<void, ReportReelPayload>({
      query: ({ reelId, reason, details }) => ({
        url: `/reels/${encodeURIComponent(reelId)}/report`,
        method: "POST",
        body: { reason, details },
      }),
      invalidatesTags: (_result, _error, { reelId }) => [
        { type: "Reel", id: reelId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDiscoverReelsQuery,
  useGetMyReelsQuery,
  useToggleLikeReelMutation,
  useUploadReelMutation,
  useUpdateReelMutation,
  useDeleteReelMutation,
  useReportReelMutation,
} = reelsApi;

export default reelsSlice.reducer;
