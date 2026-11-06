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
import { Button } from "@/components/ui/button";

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
    router.push("/requests")
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
          onViewQuote={(quote) =>
            router.push(`/quotations/${encodeURIComponent(quote.id)}`)
          }
          onEditRequest={handleEditRequest}
          onPromoteRequest={() =>
            toast.success("Your request has been promoted!")
          }
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
