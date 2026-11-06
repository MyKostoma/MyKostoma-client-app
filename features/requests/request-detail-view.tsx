"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  RequestWorkspaceDetail,
  CloseRequestModal,
  RequestsErrorState,
  type ConsumerRequestItem,
} from "@/components/requests";
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
    <div className="space-y-6">
      {/* Top Navigation & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/requests")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Requests</span>
          </button>

          <span aria-hidden="true" className="h-4 w-px bg-border" />

          <span className="text-xs font-bold text-foreground">
            {resolvedRequest.code}
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {resolvedRequest.status !== "closed" && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCloseModalOpen(true)}
              className="h-9 px-4 rounded-lg text-xs font-semibold"
            >
              Close Request
            </Button>
          )}

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleEditRequest}
            className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
          >
            Edit Request
          </Button>
        </div>
      </div>

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
  );
}
