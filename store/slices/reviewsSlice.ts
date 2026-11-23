import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import type { RootState } from "../index";
import type {
  PendingReviewOrder,
  ReviewRecord,
} from "@/components/reviews/types";
import type {
  ReportReviewPayload,
  RequestResponseEditPayload,
  SubmitNewReviewPayload,
  SubmitReviewResponsePayload,
} from "@/features/reviews/types";
import {
  DEFAULT_GIVEN_REVIEWS,
  DEFAULT_PENDING_REVIEW_ORDERS,
  DEFAULT_RECEIVED_REVIEWS,
} from "@/features/reviews/data";

export interface ReviewsSliceState {
  receivedReviews: ReviewRecord[];
  givenReviews: ReviewRecord[];
  pendingOrders: PendingReviewOrder[];
  draftResponsesByReviewId: Record<string, string>;
  reportedReviewIds: string[];
  editRequestedReviewIds: string[];
}

const initialState: ReviewsSliceState = {
  receivedReviews: DEFAULT_RECEIVED_REVIEWS,
  givenReviews: DEFAULT_GIVEN_REVIEWS,
  pendingOrders: DEFAULT_PENDING_REVIEW_ORDERS,
  draftResponsesByReviewId: {},
  reportedReviewIds: [],
  editRequestedReviewIds: [],
};

const findReviewAcrossLists = (
  state: ReviewsSliceState,
  reviewId: string
): ReviewRecord | undefined =>
  state.receivedReviews.find((item) => item.id === reviewId) ??
  state.givenReviews.find((item) => item.id === reviewId);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    submitReviewResponseLocal: (
      state,
      action: PayloadAction<{
        reviewId: string;
        text: string;
        repliedAtLabel: string;
        repliedAtISO: string;
      }>
    ) => {
      const { reviewId, text, repliedAtLabel, repliedAtISO } = action.payload;
      const target = findReviewAcrossLists(state, reviewId);
      if (target) {
        target.response = {
          text,
          repliedAtLabel,
          repliedAtISO,
        };
        target.requiresAttention = false;
      }
      delete state.draftResponsesByReviewId[reviewId];
    },
    updateReviewResponseLocal: (
      state,
      action: PayloadAction<{
        reviewId: string;
        text: string;
        repliedAtLabel: string;
      }>
    ) => {
      const { reviewId, text, repliedAtLabel } = action.payload;
      const target = findReviewAcrossLists(state, reviewId);
      if (target) {
        target.response = {
          text,
          repliedAtLabel,
          repliedAtISO:
            target.response?.repliedAtISO ??
            new Date().toISOString().slice(0, 10),
          editRequested: target.response?.editRequested,
        };
      }
    },
    deleteReviewResponseLocal: (
      state,
      action: PayloadAction<{ reviewId: string }>
    ) => {
      const target = findReviewAcrossLists(state, action.payload.reviewId);
      if (target) {
        delete target.response;
      }
    },
    saveDraftResponseLocal: (
      state,
      action: PayloadAction<{ reviewId: string; text: string }>
    ) => {
      state.draftResponsesByReviewId[action.payload.reviewId] =
        action.payload.text;
    },
    submitNewReviewLocal: (
      state,
      action: PayloadAction<{
        review: ReviewRecord;
        completedOrderId?: string;
      }>
    ) => {
      const { review, completedOrderId } = action.payload;
      state.givenReviews.unshift(review);
      if (completedOrderId) {
        const normalizedOrderId = completedOrderId.trim().toLowerCase();
        state.pendingOrders = state.pendingOrders.filter(
          (item) =>
            item.orderId.toLowerCase() !== normalizedOrderId &&
            item.orderCode.toLowerCase() !== normalizedOrderId &&
            item.id.toLowerCase() !== normalizedOrderId
        );
      }
    },
    deleteGivenReviewLocal: (
      state,
      action: PayloadAction<{ reviewId: string }>
    ) => {
      state.givenReviews = state.givenReviews.filter(
        (item) => item.id !== action.payload.reviewId
      );
    },
    reportReviewLocal: (
      state,
      action: PayloadAction<{ reviewId: string }>
    ) => {
      if (!state.reportedReviewIds.includes(action.payload.reviewId)) {
        state.reportedReviewIds.push(action.payload.reviewId);
      }
    },
    requestResponseEditLocal: (
      state,
      action: PayloadAction<{ reviewId: string }>
    ) => {
      const { reviewId } = action.payload;
      if (!state.editRequestedReviewIds.includes(reviewId)) {
        state.editRequestedReviewIds.push(reviewId);
      }
      const target = findReviewAcrossLists(state, reviewId);
      if (target?.response) {
        target.response.editRequested = true;
      }
    },
  },
});

export const {
  submitReviewResponseLocal,
  updateReviewResponseLocal,
  deleteReviewResponseLocal,
  saveDraftResponseLocal,
  submitNewReviewLocal,
  deleteGivenReviewLocal,
  reportReviewLocal,
  requestResponseEditLocal,
} = reviewsSlice.actions;

export const selectReceivedReviews = (state: RootState) =>
  state.reviews.receivedReviews;

export const selectGivenReviews = (state: RootState) =>
  state.reviews.givenReviews;

export const selectPendingReviewOrders = (state: RootState) =>
  state.reviews.pendingOrders;

export const selectReviewById = (reviewId: string) => (state: RootState) => {
  const normalized = reviewId.trim().toLowerCase();
  return (
    state.reviews.receivedReviews.find(
      (item) =>
        item.id.toLowerCase() === normalized ||
        item.orderCode.toLowerCase() === normalized
    ) ??
    state.reviews.givenReviews.find(
      (item) =>
        item.id.toLowerCase() === normalized ||
        item.orderCode.toLowerCase() === normalized
    )
  );
};

export const selectDraftResponseByReviewId =
  (reviewId: string) => (state: RootState) =>
    state.reviews.draftResponsesByReviewId[reviewId] ?? "";

export const selectReportedReviewIds = (state: RootState) =>
  state.reviews.reportedReviewIds;

export const selectEditRequestedReviewIds = (state: RootState) =>
  state.reviews.editRequestedReviewIds;

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<ReviewRecord[], void>({
      query: () => "/reviews",
      providesTags: ["Reviews"],
    }),
    getReviewById: builder.query<ReviewRecord, string>({
      query: (id) => `/reviews/${encodeURIComponent(id)}`,
      providesTags: (_result, _error, id) => [{ type: "Review", id }],
    }),
    submitReviewResponse: builder.mutation<
      ReviewRecord,
      SubmitReviewResponsePayload
    >({
      query: ({ reviewId, text }) => ({
        url: `/reviews/${encodeURIComponent(reviewId)}/response`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: (_result, _error, { reviewId }) => [
        "Reviews",
        { type: "Review", id: reviewId },
      ],
    }),
    updateReviewResponse: builder.mutation<
      ReviewRecord,
      SubmitReviewResponsePayload
    >({
      query: ({ reviewId, text }) => ({
        url: `/reviews/${encodeURIComponent(reviewId)}/response`,
        method: "PATCH",
        body: { text },
      }),
      invalidatesTags: (_result, _error, { reviewId }) => [
        "Reviews",
        { type: "Review", id: reviewId },
      ],
    }),
    deleteReviewResponse: builder.mutation<void, string>({
      query: (reviewId) => ({
        url: `/reviews/${encodeURIComponent(reviewId)}/response`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, reviewId) => [
        "Reviews",
        { type: "Review", id: reviewId },
      ],
    }),
    submitNewReview: builder.mutation<ReviewRecord, SubmitNewReviewPayload>({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reviews", "Order", "Orders", "Profile"],
    }),
    reportReview: builder.mutation<void, ReportReviewPayload>({
      query: ({ reviewId, reason, details }) => ({
        url: `/reviews/${encodeURIComponent(reviewId)}/report`,
        method: "POST",
        body: { reason, details },
      }),
      invalidatesTags: (_result, _error, { reviewId }) => [
        { type: "Review", id: reviewId },
      ],
    }),
    requestResponseEdit: builder.mutation<void, RequestResponseEditPayload>({
      query: ({ reviewId, revisedText, reason }) => ({
        url: `/reviews/${encodeURIComponent(reviewId)}/response/edit-request`,
        method: "POST",
        body: { revisedText, reason },
      }),
      invalidatesTags: (_result, _error, { reviewId }) => [
        { type: "Review", id: reviewId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetReviewsQuery,
  useGetReviewByIdQuery,
  useSubmitReviewResponseMutation,
  useUpdateReviewResponseMutation,
  useDeleteReviewResponseMutation,
  useSubmitNewReviewMutation,
  useReportReviewMutation,
  useRequestResponseEditMutation,
} = reviewsApi;

export default reviewsSlice.reducer;
