import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api/baseApi";
import type { RootState } from "@/store";
import type {
  DisputeCase,
  DisputeDateRangeFilter,
  DisputeEvidenceAttachment,
  DisputeResolutionPath,
  DisputeStatus,
  DisputeTabKey,
} from "@/components/disputes/types";
import type {
  AddDisputeEvidencePayload,
  MessageAdminPayload,
  RaiseDisputePayload,
  SubmitResolutionProposalPayload,
} from "@/features/disputes/types";
import { DEFAULT_DISPUTE_CASES } from "@/features/disputes/data";

export interface AdminMessageEntry {
  id: string;
  subject: string;
  message: string;
  sentAtLabel: string;
}

export interface DisputesState {
  items: DisputeCase[];
  activeTab: DisputeTabKey;
  searchQuery: string;
  statusFilter: "all" | DisputeStatus;
  dateRangeFilter: DisputeDateRangeFilter;
  includeArchived: boolean;
  currentPage: number;
  adminMessages: Record<string, AdminMessageEntry[]>;
}

const initialState: DisputesState = {
  items: DEFAULT_DISPUTE_CASES,
  activeTab: "active",
  searchQuery: "",
  statusFilter: "all",
  dateRangeFilter: "all",
  includeArchived: false,
  currentPage: 1,
  adminMessages: {},
};

function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTimeLabel(date: Date): string {
  const datePart = formatShortDate(date);
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${datePart} • ${timePart}`;
}

export const disputesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDisputes: builder.query<
      DisputeCase[],
      { tab?: DisputeTabKey; search?: string } | void
    >({
      query: (params) => ({
        url: "/disputes",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Dispute"],
    }),
    getDisputeById: builder.query<DisputeCase, string>({
      query: (id) => ({
        url: `/disputes/${encodeURIComponent(id)}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Dispute", id }],
    }),
    raiseDispute: builder.mutation<DisputeCase, RaiseDisputePayload>({
      query: (body) => ({
        url: "/disputes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Dispute"],
    }),
    archiveDispute: builder.mutation<{ id: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/disputes/${encodeURIComponent(id)}/archive`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Dispute",
        { type: "Dispute", id },
      ],
    }),
    addDisputeEvidence: builder.mutation<
      { success: boolean },
      AddDisputeEvidencePayload
    >({
      query: ({ disputeId, message, attachments }) => ({
        url: `/disputes/${encodeURIComponent(disputeId)}/evidence`,
        method: "POST",
        body: { message, attachments },
      }),
      invalidatesTags: (_result, _error, { disputeId }) => [
        "Dispute",
        { type: "Dispute", id: disputeId },
      ],
    }),
    submitDisputeResolution: builder.mutation<
      { success: boolean },
      SubmitResolutionProposalPayload
    >({
      query: ({ disputeId, path, splitConsumerPercent, note }) => ({
        url: `/disputes/${encodeURIComponent(disputeId)}/resolution`,
        method: "POST",
        body: { path, splitConsumerPercent, note },
      }),
      invalidatesTags: (_result, _error, { disputeId }) => [
        "Dispute",
        { type: "Dispute", id: disputeId },
      ],
    }),
    sendDisputeAdminMessage: builder.mutation<
      { success: boolean },
      MessageAdminPayload
    >({
      query: ({ disputeId, subject, message }) => ({
        url: `/disputes/${encodeURIComponent(disputeId)}/admin-message`,
        method: "POST",
        body: { subject, message },
      }),
      invalidatesTags: (_result, _error, { disputeId }) => [
        { type: "Dispute", id: disputeId },
      ],
    }),
  }),
});

export const {
  useGetDisputesQuery,
  useGetDisputeByIdQuery,
  useRaiseDisputeMutation,
  useArchiveDisputeMutation,
  useAddDisputeEvidenceMutation,
  useSubmitDisputeResolutionMutation,
  useSendDisputeAdminMessageMutation,
} = disputesApi;

const disputesSlice = createSlice({
  name: "disputes",
  initialState,
  reducers: {
    setDisputesActiveTab: (state, action: PayloadAction<DisputeTabKey>) => {
      state.activeTab = action.payload;
      state.statusFilter = "all";
      state.currentPage = 1;
    },
    setDisputesSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setDisputesStatusFilter: (
      state,
      action: PayloadAction<"all" | DisputeStatus>
    ) => {
      state.statusFilter = action.payload;
      state.currentPage = 1;
    },
    setDisputesDateRangeFilter: (
      state,
      action: PayloadAction<DisputeDateRangeFilter>
    ) => {
      state.dateRangeFilter = action.payload;
      state.currentPage = 1;
    },
    setDisputesIncludeArchived: (state, action: PayloadAction<boolean>) => {
      state.includeArchived = action.payload;
      state.currentPage = 1;
    },
    setDisputesCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = Math.max(1, action.payload);
    },
    resetDisputesFilters: (state) => {
      state.searchQuery = "";
      state.statusFilter = "all";
      state.dateRangeFilter = "all";
      state.includeArchived = false;
      state.currentPage = 1;
    },
    createDisputeCaseLocal: (
      state,
      action: PayloadAction<{
        id: string;
        code: string;
        orderId: string;
        orderCode: string;
        serviceTitle: string;
        totalAmount: number;
        consumerName: string;
        consumerAvatarUrl?: string;
        professionalName: string;
        professionalAvatarUrl?: string;
        creatorRole: "consumer" | "professional";
        creatorName: string;
        creatorAvatarUrl?: string;
        reason: string;
        description: string;
        attachments?: DisputeEvidenceAttachment[];
      }>
    ) => {
      const p = action.payload;
      const now = new Date();
      const dateRaisedLabel = formatShortDate(now);
      const timestampLabel = formatDateTimeLabel(now);
      const normalizedOrderCode = p.orderCode.startsWith("#")
        ? p.orderCode
        : `#${p.orderCode}`;

      const responses =
        p.attachments && p.attachments.length > 0
          ? [
              {
                id: `resp-${Date.now()}`,
                authorName: p.creatorName,
                authorRole: p.creatorRole,
                authorAvatarUrl: p.creatorAvatarUrl,
                timestampLabel,
                message: p.description,
                attachments: p.attachments,
              },
            ]
          : [];

      const newDispute: DisputeCase = {
        id: p.id,
        code: p.code,
        orderId: p.orderId,
        orderCode: normalizedOrderCode,
        serviceTitle: p.serviceTitle,
        totalAmount: p.totalAmount,
        currency: "NGN",
        escrowStatus: "frozen",
        consumerName: p.consumerName,
        consumerAvatarUrl: p.consumerAvatarUrl,
        professionalName: p.professionalName,
        professionalAvatarUrl: p.professionalAvatarUrl,
        dateRaisedLabel,
        createdAtISO: now.toISOString(),
        status: "open",
        reason: p.reason,
        description: p.description,
        timeline: [
          {
            id: `tl-${Date.now()}-1`,
            title: "Dispute Opened",
            timestampLabel,
            state: "completed",
          },
          {
            id: `tl-${Date.now()}-2`,
            title: "Escrow Frozen & Pending Review",
            timestampLabel: `${dateRaisedLabel} • Current`,
            state: "current",
            note: "Escrow funds are frozen while both parties submit evidence. Our mediation team responds within 48 hours.",
          },
        ],
        responses,
      };

      state.items.unshift(newDispute);
      state.activeTab = "active";
      state.currentPage = 1;
    },
    archiveDisputeCaseLocal: (state, action: PayloadAction<string>) => {
      const found = state.items.find(
        (d) =>
          d.id.toLowerCase() === action.payload.toLowerCase() ||
          d.code.toLowerCase() === action.payload.toLowerCase()
      );
      if (found) {
        found.status = "archived";
      }
    },
    restoreDisputeCaseLocal: (state, action: PayloadAction<string>) => {
      const found = state.items.find(
        (d) =>
          d.id.toLowerCase() === action.payload.toLowerCase() ||
          d.code.toLowerCase() === action.payload.toLowerCase()
      );
      if (found) {
        found.status = "resolved";
      }
    },
    addDisputeEvidenceLocal: (
      state,
      action: PayloadAction<{
        disputeId: string;
        authorName: string;
        authorRole: "consumer" | "professional";
        authorAvatarUrl?: string;
        message: string;
        attachments: DisputeEvidenceAttachment[];
      }>
    ) => {
      const {
        disputeId,
        authorName,
        authorRole,
        authorAvatarUrl,
        message,
        attachments,
      } = action.payload;

      const dispute = state.items.find(
        (d) =>
          d.id.toLowerCase() === disputeId.toLowerCase() ||
          d.code.toLowerCase() === disputeId.toLowerCase()
      );
      if (!dispute) return;

      const timestampLabel = formatDateTimeLabel(new Date());
      dispute.responses.push({
        id: `resp-${Date.now()}`,
        authorName,
        authorRole,
        authorAvatarUrl,
        timestampLabel,
        message,
        attachments: attachments.length > 0 ? attachments : undefined,
      });

      if (dispute.status === "open") {
        dispute.status = "under-review";
      }
    },
    submitResolutionProposalLocal: (
      state,
      action: PayloadAction<{
        disputeId: string;
        path: DisputeResolutionPath;
        splitConsumerPercent?: number;
        note?: string;
        proposedByRole: "consumer" | "professional";
      }>
    ) => {
      const { disputeId, path, splitConsumerPercent, note, proposedByRole } =
        action.payload;
      const dispute = state.items.find(
        (d) =>
          d.id.toLowerCase() === disputeId.toLowerCase() ||
          d.code.toLowerCase() === disputeId.toLowerCase()
      );
      if (!dispute) return;

      const now = new Date();
      const timestampLabel = formatDateTimeLabel(now);

      dispute.resolutionProposal = {
        path,
        splitConsumerPercent:
          path === "split" ? splitConsumerPercent ?? 50 : undefined,
        note: note?.trim() || undefined,
        proposedByRole,
        proposedAtLabel: timestampLabel,
        finalized: true,
      };

      dispute.status = "resolved";
      dispute.escrowStatus =
        path === "release-to-professional"
          ? "released"
          : path === "refund-to-consumer"
          ? "refunded"
          : "split";

      dispute.timeline = dispute.timeline.map((step) => ({
        ...step,
        state: "completed",
      }));

      const pathHeadline =
        path === "release-to-professional"
          ? "Resolved — Released to Professional"
          : path === "refund-to-consumer"
          ? "Resolved — Refunded to Consumer"
          : `Resolved — Partial Settlement (${splitConsumerPercent ?? 50}% / ${100 - (splitConsumerPercent ?? 50)}%)`;

      dispute.timeline.push({
        id: `tl-${Date.now()}`,
        title: pathHeadline,
        timestampLabel,
        state: "completed",
        note:
          note?.trim() ||
          "Settlement instruction recorded and escrow ledger updated.",
      });
    },
    logAdminMessageLocal: (
      state,
      action: PayloadAction<{
        disputeId: string;
        subject: string;
        message: string;
      }>
    ) => {
      const { disputeId, subject, message } = action.payload;
      const key = disputeId.toLowerCase();
      const sentAtLabel = formatDateTimeLabel(new Date());
      if (!state.adminMessages[key]) {
        state.adminMessages[key] = [];
      }
      state.adminMessages[key].push({
        id: `adm-${Date.now()}`,
        subject,
        message,
        sentAtLabel,
      });

      const dispute = state.items.find(
        (d) =>
          d.id.toLowerCase() === key || d.code.toLowerCase() === key
      );
      if (dispute) {
        dispute.timeline.push({
          id: `tl-adm-${Date.now()}`,
          title: `Mediator Note Sent: ${subject}`,
          timestampLabel: sentAtLabel,
          state: dispute.status === "resolved" ? "completed" : "current",
          note: message,
        });
      }
    },
  },
});

export const {
  setDisputesActiveTab,
  setDisputesSearchQuery,
  setDisputesStatusFilter,
  setDisputesDateRangeFilter,
  setDisputesIncludeArchived,
  setDisputesCurrentPage,
  resetDisputesFilters,
  createDisputeCaseLocal,
  archiveDisputeCaseLocal,
  restoreDisputeCaseLocal,
  addDisputeEvidenceLocal,
  submitResolutionProposalLocal,
  logAdminMessageLocal,
} = disputesSlice.actions;

export const selectAllDisputes = (state: RootState) => state.disputes.items;
export const selectDisputeById = (idOrCode: string) => (state: RootState) => {
  const normalized = idOrCode.trim().toLowerCase().replace(/^#/, "");
  return state.disputes.items.find(
    (d) =>
      d.id.toLowerCase() === normalized ||
      d.code.toLowerCase().replace(/^#/, "") === normalized
  );
};
export const selectDisputesActiveTab = (state: RootState) =>
  state.disputes.activeTab;
export const selectDisputesSearchQuery = (state: RootState) =>
  state.disputes.searchQuery;
export const selectDisputesStatusFilter = (state: RootState) =>
  state.disputes.statusFilter;
export const selectDisputesDateRangeFilter = (state: RootState) =>
  state.disputes.dateRangeFilter;
export const selectDisputesIncludeArchived = (state: RootState) =>
  state.disputes.includeArchived;
export const selectDisputesCurrentPage = (state: RootState) =>
  state.disputes.currentPage;
export const selectActiveDisputesCount = (state: RootState) =>
  state.disputes.items.filter(
    (d) => d.status === "open" || d.status === "under-review"
  ).length;
export const selectResolvedDisputesCount = (state: RootState) =>
  state.disputes.items.filter(
    (d) =>
      d.status === "resolved" ||
      (state.disputes.includeArchived && d.status === "archived")
  ).length;

export default disputesSlice.reducer;
