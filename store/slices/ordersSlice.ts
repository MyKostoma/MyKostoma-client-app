import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api/baseApi";
import type { RootState } from "@/store";
import type {
  ConsumerOrderItem,
  OrderDisputeFormValues,
  OrderReviewFormValues,
  OrderTabFilter,
} from "@/components/orders/types";
import { DEFAULT_CONSUMER_ORDERS } from "@/features/orders/data";

export interface OrdersState {
  items: ConsumerOrderItem[];
  activeTab: OrderTabFilter;
  searchQuery: string;
}

const initialState: OrdersState = {
  items: DEFAULT_CONSUMER_ORDERS,
  activeTab: "all",
  searchQuery: "",
};

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<
      ConsumerOrderItem[],
      { tab?: OrderTabFilter; search?: string } | void
    >({
      query: (params) => ({
        url: "/orders",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Orders"],
    }),
    getOrderById: builder.query<ConsumerOrderItem, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Orders", id }],
    }),
    depositOrderFunds: builder.mutation<
      { id: string; status: "in-progress" },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/orders/${id}/deposit`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Orders",
        { type: "Orders", id },
      ],
    }),
    releaseOrderMilestone: builder.mutation<
      { id: string; status: "completed" },
      { id: string; milestoneId?: string }
    >({
      query: ({ id, milestoneId }) => ({
        url: `/orders/${id}/release`,
        method: "POST",
        body: { milestoneId },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Orders",
        { type: "Orders", id },
      ],
    }),
    cancelOrder: builder.mutation<
      { id: string; status: "cancelled" },
      { id: string; reason?: string }
    >({
      query: ({ id, reason }) => ({
        url: `/orders/${id}/cancel`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Orders",
        { type: "Orders", id },
      ],
    }),
    submitOrderReview: builder.mutation<
      { success: boolean },
      { id: string; values: OrderReviewFormValues }
    >({
      query: ({ id, values }) => ({
        url: `/orders/${id}/reviews`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Orders",
        { type: "Orders", id },
      ],
    }),
    raiseOrderDispute: builder.mutation<
      { success: boolean; ticketId: string },
      { id: string; values: OrderDisputeFormValues }
    >({
      query: ({ id, values }) => ({
        url: `/orders/${id}/disputes`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Orders",
        { type: "Orders", id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useDepositOrderFundsMutation,
  useReleaseOrderMilestoneMutation,
  useCancelOrderMutation,
  useSubmitOrderReviewMutation,
  useRaiseOrderDisputeMutation,
} = ordersApi;

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrdersActiveTab: (state, action: PayloadAction<OrderTabFilter>) => {
      state.activeTab = action.payload;
    },
    setOrdersSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addOrderLocal: (state, action: PayloadAction<ConsumerOrderItem>) => {
      state.items = [
        action.payload,
        ...state.items.filter((o) => o.code !== action.payload.code),
      ];
    },
    depositOrderFundsLocal: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (o) =>
          o.id.toLowerCase() === action.payload.toLowerCase() ||
          o.code.toLowerCase() === action.payload.toLowerCase()
      );
      if (item) {
        item.status = "in-progress";
        item.escrowStatusLabel = "Funds in Escrow";
        item.startedAt = "Today";
        item.completionPercentage = 25;
        item.milestones = item.milestones.map((m, idx) =>
          idx === 0 ? { ...m, status: "in-escrow", subtitle: "In Progress" } : m
        );
      }
    },
    confirmOrderCompletionLocal: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (o) =>
          o.id.toLowerCase() === action.payload.toLowerCase() ||
          o.code.toLowerCase() === action.payload.toLowerCase()
      );
      if (item) {
        item.status = "completed";
        item.escrowStatusLabel = "Funds Released";
        item.completedAt = "Oct 24, 2026";
        item.completionPercentage = 100;
        item.milestones = item.milestones.map((m) => ({
          ...m,
          status: "released",
          subtitle: m.subtitle.startsWith("Completed")
            ? m.subtitle
            : "Completed Oct 24, 2026",
        }));
        item.escrowSummary = {
          ...item.escrowSummary,
          fundsReleased: item.totalAmount,
          remainingInEscrow: "₦0.00",
          nextMilestoneName: "All Milestones Completed",
        };
      }
    },
    cancelOrderLocal: (
      state,
      action: PayloadAction<{ id: string; reason?: string }>
    ) => {
      const item = state.items.find(
        (o) =>
          o.id.toLowerCase() === action.payload.id.toLowerCase() ||
          o.code.toLowerCase() === action.payload.id.toLowerCase()
      );
      if (item) {
        item.status = "cancelled";
        item.escrowStatusLabel = "Refunded";
        item.cancelledReason =
          action.payload.reason || "Cancelled by Client";
        item.refundStatusLabel = "Fully Refunded to Original Payment Method";
        item.completionPercentage = 0;
      }
    },
    submitOrderReviewLocal: (
      state,
      action: PayloadAction<{ id: string; rating: number }>
    ) => {
      const item = state.items.find(
        (o) =>
          o.id.toLowerCase() === action.payload.id.toLowerCase() ||
          o.code.toLowerCase() === action.payload.id.toLowerCase()
      );
      if (item) {
        item.clientRating = action.payload.rating;
      }
    },
  },
});

export const {
  setOrdersActiveTab,
  setOrdersSearchQuery,
  addOrderLocal,
  depositOrderFundsLocal,
  confirmOrderCompletionLocal,
  cancelOrderLocal,
  submitOrderReviewLocal,
} = ordersSlice.actions;

export const selectAllOrders = (state: RootState) => state.orders.items;
export const selectOrdersActiveTab = (state: RootState) =>
  state.orders.activeTab;
export const selectOrdersSearchQuery = (state: RootState) =>
  state.orders.searchQuery;

export default ordersSlice.reducer;
