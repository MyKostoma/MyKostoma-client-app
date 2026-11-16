import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api/baseApi";
import type { RootState } from "@/store";
import type {
  QuotationItem,
  QuotationRevisionFormValues,
  QuotationTabFilter,
  ProfessionalQuotationItem,
  ProfessionalQuotationStatus,
  ProfessionalQuotationTabFilter,
  ProfessionalUpdateQuoteFormValues,
} from "@/components/quotations/types";
import {
  DEFAULT_QUOTATIONS,
  DEFAULT_PROFESSIONAL_QUOTATIONS,
} from "@/features/quotations/data";

export interface QuotationsState {
  items: QuotationItem[];
  activeTab: QuotationTabFilter;
  searchQuery: string;
  comparedIds: string[];
  proItems: ProfessionalQuotationItem[];
  proActiveTab: ProfessionalQuotationTabFilter;
  proSearchQuery: string;
  proCurrentPage: number;
}

const initialState: QuotationsState = {
  items: DEFAULT_QUOTATIONS,
  activeTab: "all",
  searchQuery: "",
  comparedIds: ["QT-8821-B", "QT-8821-D"],
  proItems: DEFAULT_PROFESSIONAL_QUOTATIONS,
  proActiveTab: "all",
  proSearchQuery: "",
  proCurrentPage: 1,
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
    getProfessionalQuotations: builder.query<
      ProfessionalQuotationItem[],
      { tab?: ProfessionalQuotationTabFilter; search?: string } | void
    >({
      query: (params) => ({
        url: "/professional/quotations",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Quotations"],
    }),
    getProfessionalQuotationById: builder.query<
      ProfessionalQuotationItem,
      string
    >({
      query: (id) => ({
        url: `/professional/quotations/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Quotations", id }],
    }),
    updateProfessionalQuotation: builder.mutation<
      { success: boolean },
      { id: string; values: ProfessionalUpdateQuoteFormValues }
    >({
      query: ({ id, values }) => ({
        url: `/professional/quotations/${id}/update`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Quotations",
        { type: "Quotations", id },
      ],
    }),
    cancelProfessionalQuotation: builder.mutation<
      { success: boolean },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/professional/quotations/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Quotations",
        { type: "Quotations", id },
      ],
    }),
    archiveProfessionalQuotation: builder.mutation<
      { success: boolean },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/professional/quotations/${id}/archive`,
        method: "POST",
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
  useGetProfessionalQuotationsQuery,
  useGetProfessionalQuotationByIdQuery,
  useUpdateProfessionalQuotationMutation,
  useCancelProfessionalQuotationMutation,
  useArchiveProfessionalQuotationMutation,
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
    setProQuotationsActiveTab: (
      state,
      action: PayloadAction<ProfessionalQuotationTabFilter>
    ) => {
      state.proActiveTab = action.payload;
      state.proCurrentPage = 1;
    },
    setProQuotationsSearchQuery: (state, action: PayloadAction<string>) => {
      state.proSearchQuery = action.payload;
      state.proCurrentPage = 1;
    },
    setProQuotationsPage: (state, action: PayloadAction<number>) => {
      state.proCurrentPage = action.payload;
    },
    setProQuotationStatusLocal: (
      state,
      action: PayloadAction<{ id: string; status: ProfessionalQuotationStatus }>
    ) => {
      const item = state.proItems.find(
        (q) =>
          q.id.toLowerCase() === action.payload.id.toLowerCase() ||
          q.code.toLowerCase() === action.payload.id.toLowerCase()
      );
      if (item) {
        item.status = action.payload.status;
      }
    },
    updateProQuotationLocal: (
      state,
      action: PayloadAction<{
        id: string;
        values: ProfessionalUpdateQuoteFormValues;
      }>
    ) => {
      const item = state.proItems.find(
        (q) =>
          q.id.toLowerCase() === action.payload.id.toLowerCase() ||
          q.code.toLowerCase() === action.payload.id.toLowerCase()
      );
      if (!item) return;

      const parseNum = (v: string) =>
        Number(String(v).replace(/[^0-9.]/g, "")) || 0;
      const sFee = parseNum(action.payload.values.serviceFee);
      const mCost = parseNum(action.payload.values.materialsCost);
      const lCost = parseNum(action.payload.values.logisticsCost);
      const total = sFee + mCost + lCost;

      item.previousMaterialsCost = item.materialsCost;
      item.serviceFee = sFee;
      item.materialsCost = mCost;
      item.logisticsCost = lCost;
      item.duration = action.payload.values.estimatedDuration;
      item.validityDateInput = action.payload.values.validityPeriod;
      item.professionalNote = action.payload.values.updatedNote;
      item.price = `₦${total.toLocaleString("en-NG")}`;
      item.totalAmountFormatted = `₦${total.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;

      const nextVerIndex = item.versions.length + 1;
      item.versions = item.versions.map((v) => ({
        ...v,
        isCurrent: false,
        versionTitle: v.versionTitle.replace("(Current)", "(Archived)"),
        badgeLabel: v.badgeLabel === "ACTIVE" ? "REVISED" : v.badgeLabel,
      }));
      item.versions.unshift({
        id: `ver-${Date.now()}`,
        versionNumber: `v${nextVerIndex}`,
        versionTitle: `v${nextVerIndex} (Current)`,
        badgeLabel: "ACTIVE",
        timestampLabel: "Updated just now",
        changeSummaryTitle: `Updated pricing breakdown and terms.`,
        totalLabel: `New Total: ${item.totalAmountFormatted}`,
        professionalNote: action.payload.values.updatedNote,
        isCurrent: true,
      });
    },
    archiveProQuotationLocal: (state, action: PayloadAction<string>) => {
      state.proItems = state.proItems.filter(
        (q) =>
          q.id.toLowerCase() !== action.payload.toLowerCase() &&
          q.code.toLowerCase() !== action.payload.toLowerCase()
      );
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
  setProQuotationsActiveTab,
  setProQuotationsSearchQuery,
  setProQuotationsPage,
  setProQuotationStatusLocal,
  updateProQuotationLocal,
  archiveProQuotationLocal,
} = quotationsSlice.actions;

export const selectAllQuotations = (state: RootState) => state.quotations.items;
export const selectQuotationsActiveTab = (state: RootState) =>
  state.quotations.activeTab;
export const selectQuotationsSearchQuery = (state: RootState) =>
  state.quotations.searchQuery;
export const selectComparedQuotationIds = (state: RootState) =>
  state.quotations.comparedIds;
export const selectAllProQuotations = (state: RootState) =>
  state.quotations.proItems;
export const selectProQuotationsActiveTab = (state: RootState) =>
  state.quotations.proActiveTab;
export const selectProQuotationsSearchQuery = (state: RootState) =>
  state.quotations.proSearchQuery;
export const selectProQuotationsPage = (state: RootState) =>
  state.quotations.proCurrentPage;

export default quotationsSlice.reducer;
