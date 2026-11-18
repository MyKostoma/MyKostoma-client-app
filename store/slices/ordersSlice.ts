import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api/baseApi";
import type { RootState } from "@/store";
import type {
  ConsumerOrderItem,
  OrderDisputeFormValues,
  OrderReviewFormValues,
  OrderTabFilter,
  ProfessionalOrderDisputeFormValues,
  ProfessionalOrderItem,
  ProfessionalOrderReviewFormValues,
  ProfessionalOrderTabFilter,
} from "@/components/orders/types";
import {
  DEFAULT_CONSUMER_ORDERS,
  DEFAULT_PROFESSIONAL_ORDERS,
} from "@/features/orders/data";

export interface OrdersState {
  items: ConsumerOrderItem[];
  activeTab: OrderTabFilter;
  searchQuery: string;
  proItems: ProfessionalOrderItem[];
  proActiveTab: ProfessionalOrderTabFilter;
  proSearchQuery: string;
  proCurrentPage: number;
}

const initialState: OrdersState = {
  items: DEFAULT_CONSUMER_ORDERS,
  activeTab: "all",
  searchQuery: "",
  proItems: DEFAULT_PROFESSIONAL_ORDERS,
  proActiveTab: "all",
  proSearchQuery: "",
  proCurrentPage: 1,
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
    getProfessionalOrders: builder.query<
      ProfessionalOrderItem[],
      { tab?: ProfessionalOrderTabFilter; search?: string } | void
    >({
      query: (params) => ({
        url: "/professional/orders",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Orders"],
    }),
    getProfessionalOrderById: builder.query<ProfessionalOrderItem, string>({
      query: (id) => ({
        url: `/professional/orders/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Orders", id }],
    }),
    startProfessionalOrder: builder.mutation<{ success: boolean }, { id: string }>(
      {
        query: ({ id }) => ({
          url: `/professional/orders/${id}/start`,
          method: "POST",
        }),
        invalidatesTags: (_result, _error, { id }) => [
          "Orders",
          { type: "Orders", id },
        ],
      }
    ),
    completeProfessionalOrder: builder.mutation<
      { success: boolean },
      { id: string; completionNote: string; deliverableName?: string }
    >({
      query: ({ id, completionNote, deliverableName }) => ({
        url: `/professional/orders/${id}/complete`,
        method: "POST",
        body: { completionNote, deliverableName },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Orders",
        { type: "Orders", id },
      ],
    }),
    submitProfessionalOrderDispute: builder.mutation<
      { success: boolean },
      { id: string; values: ProfessionalOrderDisputeFormValues }
    >({
      query: ({ id, values }) => ({
        url: `/professional/orders/${id}/disputes`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Orders",
        { type: "Orders", id },
      ],
    }),
    submitProfessionalOrderReview: builder.mutation<
      { success: boolean },
      { id: string; values: ProfessionalOrderReviewFormValues }
    >({
      query: ({ id, values }) => ({
        url: `/professional/orders/${id}/reviews`,
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
  useGetProfessionalOrdersQuery,
  useGetProfessionalOrderByIdQuery,
  useStartProfessionalOrderMutation,
  useCompleteProfessionalOrderMutation,
  useSubmitProfessionalOrderDisputeMutation,
  useSubmitProfessionalOrderReviewMutation,
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
    setProOrdersActiveTab: (
      state,
      action: PayloadAction<ProfessionalOrderTabFilter>
    ) => {
      state.proActiveTab = action.payload;
      state.proCurrentPage = 1;
    },
    setProOrdersSearchQuery: (state, action: PayloadAction<string>) => {
      state.proSearchQuery = action.payload;
      state.proCurrentPage = 1;
    },
    setProOrdersPage: (state, action: PayloadAction<number>) => {
      state.proCurrentPage = action.payload;
    },
    startProOrderLocal: (state, action: PayloadAction<string>) => {
      const order = state.proItems.find(
        (o) =>
          o.id.toLowerCase() === action.payload.toLowerCase() ||
          o.code.toLowerCase() === action.payload.toLowerCase()
      );
      if (!order) return;
      order.status = "in-progress";
      order.orderTimeline = [
        {
          id: "tl-placed",
          title: "Order Placed",
          subtitle: "Oct 12, 2026 • 10:45 AM",
          state: "completed",
        },
        {
          id: "tl-started",
          title: "Order Started",
          subtitle: "Oct 12, 2026 • 11:30 AM",
          state: "completed",
        },
        {
          id: "tl-progress",
          title: "In Progress",
          subtitle: "Work is currently being done...",
          state: "active",
        },
      ];
    },
    completeProOrderLocal: (
      state,
      action: PayloadAction<{
        id: string;
        completionNote?: string;
        deliverableName?: string;
      }>
    ) => {
      const order = state.proItems.find(
        (o) =>
          o.id.toLowerCase() === action.payload.id.toLowerCase() ||
          o.code.toLowerCase() === action.payload.id.toLowerCase()
      );
      if (!order) return;
      order.status = "completed";
      order.escrowStatus = "pending-release";
      order.completedAtLabel = "Completed on Oct 17, 2026 • 02:15 PM";
      order.submittedDateLabel = "Submitted Oct 17, 2026";
      if (action.payload.completionNote?.trim()) {
        order.completionNote = action.payload.completionNote.trim();
      }
      if (action.payload.deliverableName?.trim()) {
        order.finalDeliverable = {
          id: `del-${Date.now()}`,
          name: action.payload.deliverableName.trim(),
          size: "42.5 MB",
          type: "archive",
          statusLabel: "Ready for download",
        };
      }
      order.orderTimeline = [
        {
          id: "tl-placed",
          title: "Order Placed",
          subtitle: "Oct 12, 2026 • 10:45 AM",
          state: "completed",
        },
        {
          id: "tl-started",
          title: "Order Started",
          subtitle: "Oct 12, 2026 • 11:30 AM",
          state: "completed",
        },
        {
          id: "tl-completed",
          title: "Marked Completed",
          subtitle: "Oct 17, 2026 • 02:15 PM",
          state: "completed",
        },
      ];
    },
    disputeProOrderLocal: (state, action: PayloadAction<string>) => {
      const order = state.proItems.find(
        (o) =>
          o.id.toLowerCase() === action.payload.toLowerCase() ||
          o.code.toLowerCase() === action.payload.toLowerCase()
      );
      if (!order) return;
      order.status = "disputed";
      order.escrowStatus = "held";
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
  setProOrdersActiveTab,
  setProOrdersSearchQuery,
  setProOrdersPage,
  startProOrderLocal,
  completeProOrderLocal,
  disputeProOrderLocal,
} = ordersSlice.actions;

export const selectAllOrders = (state: RootState) => state.orders.items;
export const selectOrdersActiveTab = (state: RootState) =>
  state.orders.activeTab;
export const selectOrdersSearchQuery = (state: RootState) =>
  state.orders.searchQuery;
export const selectAllProOrders = (state: RootState) => state.orders.proItems;
export const selectProOrdersActiveTab = (state: RootState) =>
  state.orders.proActiveTab;
export const selectProOrdersSearchQuery = (state: RootState) =>
  state.orders.proSearchQuery;
export const selectProOrdersPage = (state: RootState) =>
  state.orders.proCurrentPage;

export default ordersSlice.reducer;
