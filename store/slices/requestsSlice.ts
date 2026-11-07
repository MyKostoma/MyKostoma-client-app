import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api/baseApi";
import type { RootState } from "@/store";
import type {
  ConsumerRequestItem,
  RequestFormValues,
  RequestTabFilter,
} from "@/components/requests/types";
import { DEFAULT_CONSUMER_REQUESTS } from "@/features/requests/data";

export interface RequestsState {
  items: ConsumerRequestItem[];
  activeTab: RequestTabFilter;
  searchQuery: string;
  selectedRequestId: string | null;
}

const initialState: RequestsState = {
  items: DEFAULT_CONSUMER_REQUESTS,
  activeTab: "all",
  searchQuery: "",
  selectedRequestId: null,
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
  }),
  overrideExisting: false,
});

export const {
  useGetRequestsQuery,
  useGetRequestByIdQuery,
  useCreateRequestMutation,
  useUpdateRequestMutation,
  useCloseRequestMutation,
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
  },
});

export const {
  setRequestsActiveTab,
  setRequestsSearchQuery,
  setSelectedRequestId,
  addRequestItem,
  updateRequestItem,
  closeRequestItem,
} = requestsSlice.actions;

export const selectAllRequests = (state: RootState) => state.requests.items;
export const selectRequestsActiveTab = (state: RootState) =>
  state.requests.activeTab;
export const selectRequestsSearchQuery = (state: RootState) =>
  state.requests.searchQuery;
export const selectSelectedRequestId = (state: RootState) =>
  state.requests.selectedRequestId;

export default requestsSlice.reducer;
