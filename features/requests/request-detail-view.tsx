"use client";

import { ArrowLeft } from "lucide-react";
import { RequestWorkspaceDetail } from "@/components/requests/request-workspace-detail";
import { RequestsErrorState } from "@/components/requests/requests-state-cards";
import { CloseRequestModal } from "@/components/modals/close-request-modal";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { RequestDetailTopBar } from "@/components/layouts/top-bars/requests/request-detail-top-bar";
import { Button } from "@/components/ui/button";
import { useRequestDetailService } from "./services/requestsApi";
import type { RequestDetailViewProps } from "./types";

export type { RequestDetailViewProps } from "./types";

export function RequestDetailView({
  requestId = "REQ-2026-0842",
  error = null,
  onRetry,
}: RequestDetailViewProps) {
  const {
    resolvedRequest,
    closeModalOpen,
    setCloseModalOpen,
    handleBackToRequests,
    handleEditRequest,
    handleViewQuote,
    handlePromoteRequest,
    handleConfirmClose,
  } = useRequestDetailService(requestId);

  if (error) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={handleBackToRequests}
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Requests</span>
        </button>

        <RequestsErrorState
          title="Failed to load request details"
          description={error}
          onRetry={onRetry}
        />
      </div>
    );
  }

  return (
    <>
      <DashboardTopBarSlot>
        <RequestDetailTopBar
          requestCode={resolvedRequest.code}
          onBackToRequests={handleBackToRequests}
          onCloseRequest={() => setCloseModalOpen(true)}
          onEditRequest={handleEditRequest}
          canClose={resolvedRequest.status !== "closed"}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        <div className="flex sm:hidden items-center gap-2.5 sm:gap-3 shrink-0 ml-auto">
          {resolvedRequest.status !== "closed" && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCloseModalOpen(true)}
              className="h-9 px-3.5 sm:px-4 rounded-lg text-xs font-semibold"
            >
              Close Request
            </Button>
          )}

          {resolvedRequest.status !== "closed" && (
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={handleEditRequest}
              className="h-9 px-3.5 sm:px-4 rounded-lg text-xs font-semibold shadow-xs"
            >
              Edit Request
            </Button>
          )}
        </div>

        <RequestWorkspaceDetail
          request={resolvedRequest}
          onViewQuote={handleViewQuote}
          onEditRequest={handleEditRequest}
          onPromoteRequest={handlePromoteRequest}
        />

        <CloseRequestModal
          isOpen={closeModalOpen}
          onClose={() => setCloseModalOpen(false)}
          onConfirmClose={handleConfirmClose}
        />
      </div>
    </>
  );
}
