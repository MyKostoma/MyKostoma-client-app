"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import {
  RequestWorkspaceDetail,
  CloseRequestModal,
  RequestsErrorState,
  type ConsumerRequestItem,
} from "@/components/requests";
import {
  DashboardTopBarSlot,
  RequestDetailTopBar,
} from "@/components/layouts/top-bars";
import { DEFAULT_CONSUMER_REQUESTS } from "./data";

export interface RequestDetailViewProps {
  requestId?: string;
  error?: string | null;
  onRetry?: () => void;
}

export function RequestDetailView({
  requestId = "REQ-2026-0842",
  error = null,
  onRetry,
}: RequestDetailViewProps) {
  const router = useRouter();
  const [closeModalOpen, setCloseModalOpen] = useState(false);

  const request = useMemo<ConsumerRequestItem | undefined>(() => {
    return DEFAULT_CONSUMER_REQUESTS.find(
      (r) => r.id.toLowerCase() === requestId.toLowerCase()
    );
  }, [requestId]);

  const resolvedRequest = request ?? DEFAULT_CONSUMER_REQUESTS[0];

  const handleEditRequest = () => {
    router.push(`/requests/${encodeURIComponent(resolvedRequest.id)}/edit`);
  };

  const handleConfirmClose = () => {
    setCloseModalOpen(false);
    toast.success("Request has been closed and archived.");
  };

  if (error) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => router.push("/requests")}
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
      {/* Dynamic TopBar mounted into DashboardLayout */}
      <DashboardTopBarSlot>
        <RequestDetailTopBar
          requestCode={resolvedRequest.code}
          onBackToRequests={() => router.push("/requests")}
          onCloseRequest={() => setCloseModalOpen(true)}
          onEditRequest={handleEditRequest}
          canClose={resolvedRequest.status !== "closed"}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6">
        {/* Main Request Workspace Detail */}
        <RequestWorkspaceDetail
          request={resolvedRequest}
          onViewQuote={(quote) =>
            toast.info(`Viewing quote from ${quote.providerName}`)
          }
          onEditRequest={handleEditRequest}
          onPromoteRequest={() =>
            toast.success("Your request has been promoted!")
          }
        />

        {/* Close Modal */}
        <CloseRequestModal
          isOpen={closeModalOpen}
          onClose={() => setCloseModalOpen(false)}
          onConfirmClose={handleConfirmClose}
        />
      </div>
    </>
  );
}
