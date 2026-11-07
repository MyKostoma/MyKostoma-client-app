import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api/baseApi";
import type { RootState } from "@/store";
import type {
  QuotationItem,
  QuotationRevisionFormValues,
  QuotationTabFilter,
} from "@/components/quotations/types";
import { DEFAULT_QUOTATIONS } from "@/features/quotations/data";

export interface QuotationsState {
  items: QuotationItem[];
  activeTab: QuotationTabFilter;
  searchQuery: string;
  comparedIds: string[];
}

const initialState: QuotationsState = {
  items: DEFAULT_QUOTATIONS,
  activeTab: "all",
  searchQuery: "",
  comparedIds: ["QT-8821-B", "QT-8821-D"],
};

export const quotationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuotations: builder.query<
      QuotationItem[],
      { tab?: QuotationTabFilter; search?: string } | void
    >({
      query: (params) => ({
        url: "/quotations",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Quotations"],
    }),
    getQuotationById: builder.query<QuotationItem, string>({
      query: (id) => ({
        url: `/quotations/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Quotations", id }],
    }),
    acceptQuotation: builder.mutation<
      { id: string; status: "accepted"; orderCode: string },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/quotations/${id}/accept`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Quotations",
        { type: "Quotations", id },
      ],
    }),
    rejectQuotation: builder.mutation<
      { id: string; status: "rejected" },
      { id: string; reason?: string }
    >({
      query: ({ id, reason }) => ({
        url: `/quotations/${id}/reject`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Quotations",
        { type: "Quotations", id },
      ],
    }),
    restoreQuotation: builder.mutation<
      { id: string; status: "pending" },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/quotations/${id}/restore`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Quotations",
        { type: "Quotations", id },
      ],
    }),
    requestQuotationRevision: builder.mutation<
      { success: boolean },
      { id: string; values: QuotationRevisionFormValues }
    >({
      query: ({ id, values }) => ({
        url: `/quotations/${id}/revisions`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Quotations",
        { type: "Quotations", id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetQuotationsQuery,
  useGetQuotationByIdQuery,
  useAcceptQuotationMutation,
  useRejectQuotationMutation,
  useRestoreQuotationMutation,
  useRequestQuotationRevisionMutation,
} = quotationsApi;

const quotationsSlice = createSlice({
  name: "quotations",
  initialState,
  reducers: {
    setQuotationsActiveTab: (
      state,
      action: PayloadAction<QuotationTabFilter>
    ) => {
      state.activeTab = action.payload;
    },
    setQuotationsSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleComparedQuotationId: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.comparedIds.indexOf(id);
      if (index >= 0) {
        state.comparedIds.splice(index, 1);
      } else if (state.comparedIds.length < 3) {
        state.comparedIds.push(id);
      }
    },
    clearComparedQuotations: (state) => {
      state.comparedIds = [];
    },
    acceptQuotationItem: (
      state,
      action: PayloadAction<{ id: string; orderCode?: string }>
    ) => {
      const item = state.items.find(
        (q) => q.id === action.payload.id || q.code === action.payload.id
      );
      if (item) {
        item.status = "accepted";
        item.orderCode = action.payload.orderCode ?? "ORD-NG88293";
      }
    },
    rejectQuotationItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (q) => q.id === action.payload || q.code === action.payload
      );
      if (item) {
        item.status = "rejected";
        item.rejectedAt = "Just now";
      }
    },
    restoreQuotationItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (q) => q.id === action.payload || q.code === action.payload
      );
      if (item) {
        item.status = "pending";
        item.rejectedAt = undefined;
      }
    },
  },
});

export const {
  setQuotationsActiveTab,
  setQuotationsSearchQuery,
  toggleComparedQuotationId,
  clearComparedQuotations,
  acceptQuotationItem,
  rejectQuotationItem,
  restoreQuotationItem,
} = quotationsSlice.actions;

export const selectAllQuotations = (state: RootState) => state.quotations.items;
export const selectQuotationsActiveTab = (state: RootState) =>
  state.quotations.activeTab;
export const selectQuotationsSearchQuery = (state: RootState) =>
  state.quotations.searchQuery;
export const selectComparedQuotationIds = (state: RootState) =>
  state.quotations.comparedIds;

export default quotationsSlice.reducer;
