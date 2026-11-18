import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api/baseApi";
import type { RootState } from "@/store";
import type {
  ConsumerRequestItem,
  ProfessionalRequestItem,
  ProfessionalRequestsFilterState,
  ProfessionalSubmittedQuote,
  ProfessionalSubmitQuoteFormValues,
  RequestFormValues,
  RequestTabFilter,
} from "@/components/requests/types";
import {
  DEFAULT_CONSUMER_REQUESTS,
  DEFAULT_PROFESSIONAL_REQUESTS,
} from "@/features/requests/data";

export interface RequestsState {
  items: ConsumerRequestItem[];
  activeTab: RequestTabFilter;
  searchQuery: string;
  selectedRequestId: string | null;
  proItems: ProfessionalRequestItem[];
  proSavedIds: string[];
  proFilters: ProfessionalRequestsFilterState;
  proCurrentPage: number;
}

const initialState: RequestsState = {
  items: DEFAULT_CONSUMER_REQUESTS,
  activeTab: "all",
  searchQuery: "",
  selectedRequestId: null,
  proItems: DEFAULT_PROFESSIONAL_REQUESTS,
  proSavedIds: [],
  proFilters: {
    category: "all",
    budgetRange: "any",
    location: "all",
  },
  proCurrentPage: 1,
};

export const requestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRequests: builder.query<
      ConsumerRequestItem[],
      { status?: RequestTabFilter; search?: string } | void
    >({
      query: (params) => ({
        url: "/requests",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Requests"],
    }),
    getRequestById: builder.query<ConsumerRequestItem, string>({
      query: (id) => ({
        url: `/requests/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Requests", id }],
    }),
    createRequest: builder.mutation<ConsumerRequestItem, RequestFormValues>({
      query: (body) => ({
        url: "/requests",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Requests"],
    }),
    updateRequest: builder.mutation<
      ConsumerRequestItem,
      { id: string; values: RequestFormValues }
    >({
      query: ({ id, values }) => ({
        url: `/requests/${id}`,
        method: "PATCH",
        body: values,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Requests",
        { type: "Requests", id },
      ],
    }),
    closeRequest: builder.mutation<
      { id: string; status: "closed" },
      { id: string; reason?: string }
    >({
      query: ({ id, reason }) => ({
        url: `/requests/${id}/close`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Requests",
        { type: "Requests", id },
      ],
    }),
    getProfessionalRequests: builder.query<
      ProfessionalRequestItem[],
      Partial<ProfessionalRequestsFilterState> | void
    >({
      query: (params) => ({
        url: "/professional/requests",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Requests"],
    }),
    getProfessionalRequestById: builder.query<ProfessionalRequestItem, string>({
      query: (id) => ({
        url: `/professional/requests/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Requests", id }],
    }),
    submitProfessionalQuote: builder.mutation<
      { success: boolean },
      { requestId: string; values: ProfessionalSubmitQuoteFormValues }
    >({
      query: ({ requestId, values }) => ({
        url: `/professional/requests/${requestId}/quotes`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: (_result, _error, { requestId }) => [
        "Requests",
        { type: "Requests", id: requestId },
        "Quotations",
      ],
    }),
    withdrawProfessionalQuote: builder.mutation<
      { success: boolean },
      { requestId: string }
    >({
      query: ({ requestId }) => ({
        url: `/professional/requests/${requestId}/quotes/withdraw`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { requestId }) => [
        "Requests",
        { type: "Requests", id: requestId },
        "Quotations",
      ],
    }),
    toggleSaveProfessionalRequest: builder.mutation<
      { saved: boolean },
      { requestId: string }
    >({
      query: ({ requestId }) => ({
        url: `/professional/requests/${requestId}/save`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { requestId }) => [
        { type: "Requests", id: requestId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRequestsQuery,
  useGetRequestByIdQuery,
  useCreateRequestMutation,
  useUpdateRequestMutation,
  useCloseRequestMutation,
  useGetProfessionalRequestsQuery,
  useGetProfessionalRequestByIdQuery,
  useSubmitProfessionalQuoteMutation,
  useWithdrawProfessionalQuoteMutation,
  useToggleSaveProfessionalRequestMutation,
} = requestsApi;

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setRequestsActiveTab: (state, action: PayloadAction<RequestTabFilter>) => {
      state.activeTab = action.payload;
    },
    setRequestsSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedRequestId: (state, action: PayloadAction<string | null>) => {
      state.selectedRequestId = action.payload;
    },
    addRequestItem: (state, action: PayloadAction<ConsumerRequestItem>) => {
      state.items.unshift(action.payload);
    },
    updateRequestItem: (state, action: PayloadAction<ConsumerRequestItem>) => {
      const idx = state.items.findIndex((r) => r.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = action.payload;
      }
    },
    closeRequestItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (r) => r.id === action.payload || r.code === action.payload
      );
      if (item) {
        item.status = "closed";
      }
    },
    setProRequestsFilters: (
      state,
      action: PayloadAction<ProfessionalRequestsFilterState>
    ) => {
      state.proFilters = action.payload;
      state.proCurrentPage = 1;
    },
    resetProRequestsFilters: (state) => {
      state.proFilters = {
        category: "all",
        budgetRange: "any",
        location: "all",
      };
      state.proCurrentPage = 1;
    },
    setProRequestsPage: (state, action: PayloadAction<number>) => {
      state.proCurrentPage = action.payload;
    },
    toggleProSavedRequest: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const idx = state.proSavedIds.indexOf(id);
      if (idx >= 0) {
        state.proSavedIds.splice(idx, 1);
      } else {
        state.proSavedIds.push(id);
      }
    },
    saveProSubmittedQuoteLocal: (
      state,
      action: PayloadAction<{
        requestId: string;
        quote: ProfessionalSubmittedQuote;
      }>
    ) => {
      const req = state.proItems.find(
        (r) =>
          r.id.toLowerCase() === action.payload.requestId.toLowerCase() ||
          r.code.toLowerCase() === action.payload.requestId.toLowerCase()
      );
      if (req) {
        req.submittedQuote = action.payload.quote;
        req.availabilityState = "quote-submitted";
      }
    },
    withdrawProSubmittedQuoteLocal: (state, action: PayloadAction<string>) => {
      const req = state.proItems.find(
        (r) =>
          r.id.toLowerCase() === action.payload.toLowerCase() ||
          r.code.toLowerCase() === action.payload.toLowerCase()
      );
      if (req) {
        req.submittedQuote = undefined;
        req.availabilityState = "open";
      }
    },
  },
});

export const {
  setRequestsActiveTab,
  setRequestsSearchQuery,
  setSelectedRequestId,
  addRequestItem,
  updateRequestItem,
  closeRequestItem,
  setProRequestsFilters,
  resetProRequestsFilters,
  setProRequestsPage,
  toggleProSavedRequest,
  saveProSubmittedQuoteLocal,
  withdrawProSubmittedQuoteLocal,
} = requestsSlice.actions;

export const selectAllRequests = (state: RootState) => state.requests.items;
export const selectRequestsActiveTab = (state: RootState) =>
  state.requests.activeTab;
export const selectRequestsSearchQuery = (state: RootState) =>
  state.requests.searchQuery;
export const selectSelectedRequestId = (state: RootState) =>
  state.requests.selectedRequestId;
export const selectAllProRequests = (state: RootState) =>
  state.requests.proItems;
export const selectProSavedRequestIds = (state: RootState) =>
  state.requests.proSavedIds;
export const selectProRequestsFilters = (state: RootState) =>
  state.requests.proFilters;
export const selectProRequestsPage = (state: RootState) =>
  state.requests.proCurrentPage;

export default requestsSlice.reducer;
