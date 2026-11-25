"use client";

import Link from "next/link";
import { ArrowLeft, Check, MessageSquare, Scale, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { DisputesTopBar } from "@/components/layouts/top-bars/disputes/disputes-top-bar";
import { DisputeRelatedOrderCard } from "@/components/disputes/dispute-related-order-card";
import { DisputeEvidenceThread } from "@/components/disputes/dispute-evidence-thread";
import { DisputeTimelineCard } from "@/components/disputes/dispute-timeline-card";
import { DisputeResolutionCard } from "@/components/disputes/dispute-resolution-card";
import {
  AddDisputeEvidenceModal,
  EvidencePreviewModal,
  MessageDisputeAdminModal,
} from "@/components/modals/dispute-modals";
import { getDisputeStatusMeta } from "@/features/disputes/services/disputesHelpers";
import { useDisputeDetailService } from "@/features/disputes/services/disputesApi";
import type { DisputeDetailViewProps } from "@/features/disputes/types";
import { cn } from "@/lib/utils";

export function DisputeDetailView({ disputeId }: DisputeDetailViewProps) {
  const {
    dispute,
    isProfessional,
    isResolved,
    totalAmountFormatted,
    addEvidenceModalOpen,
    setAddEvidenceModalOpen,
    messageAdminModalOpen,
    setMessageAdminModalOpen,
    previewAttachment,
    setPreviewAttachment,
    selectedPath,
    setSelectedPath,
    splitConsumerPercent,
    setSplitConsumerPercent,
    resolutionNote,
    setResolutionNote,
    isFinalizing,
    handleSubmitEvidence,
    handleSendAdminMessage,
    handleFinalizeDecision,
    handleOpenMessagesHub,
    handleBackToDisputes,
  } = useDisputeDetailService(disputeId);

  if (!dispute) {
    return (
      <>
        <DashboardTopBarSlot>
          <DisputesTopBar
            title="Dispute Not Found"
            backHref="/disputes"
            backLabel="Back to Disputes"
          />
        </DashboardTopBarSlot>

        <div className="rounded-2xl border border-border bg-card p-10 flex flex-col items-center text-center space-y-4">
          <div className="size-14 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground">
            <Scale className="size-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-extrabold text-foreground">
              Dispute Case Not Found
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
              We could not find dispute record &ldquo;{disputeId}&rdquo;. It may
              have been removed or the reference link is incorrect.
            </p>
          </div>
          <Button
            type="button"
            variant="primary"
            onClick={handleBackToDisputes}
            className="h-10 px-5 rounded-xl text-xs font-semibold"
          >
            Back to Disputes
          </Button>
        </div>
      </>
    );
  }

  const statusMeta = getDisputeStatusMeta(dispute.status);

  return (
    <>
      <DashboardTopBarSlot>
        <DisputesTopBar
          title={`Dispute ${dispute.code}`}
          backHref="/disputes"
          backLabel="Back to Disputes"
          onMessageAdmin={() => setMessageAdminModalOpen(true)}
          onAddEvidence={() => setAddEvidenceModalOpen(true)}
          isResolved={isResolved}
        />
      </DashboardTopBarSlot>

      <div className="space-y-6 pb-10">
        {/* Top Navigation + Title + Mobile Actions */}
        <div className="space-y-3">
          <Link
            href="/disputes"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Disputes</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                Dispute {dispute.code}
              </h2>

              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
                  statusMeta.badgeClass
                )}
              >
                {statusMeta.isResolvedCheck ? (
                  <Check className="size-3 stroke-[2.5]" />
                ) : (
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      statusMeta.dotClass
                    )}
                  />
                )}
                <span>{statusMeta.label}</span>
              </span>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex sm:hidden items-center gap-2.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setMessageAdminModalOpen(true)}
                leadingIcon={<MessageSquare className="size-3.5" />}
                className="flex-1 h-9 px-3 rounded-xl text-xs font-semibold"
              >
                Message Admin
              </Button>
              {!isResolved && (
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => setAddEvidenceModalOpen(true)}
                  leadingIcon={<Upload className="size-3.5" />}
                  className="flex-1 h-9 px-3 rounded-xl text-xs font-semibold"
                >
                  Add Evidence
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 2-Column Case Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-6">
            <DisputeRelatedOrderCard
              dispute={dispute}
              totalAmountFormatted={totalAmountFormatted}
            />

            <DisputeEvidenceThread
              responses={dispute.responses}
              isProfessional={isProfessional}
              isResolved={isResolved}
              onPreviewAttachment={setPreviewAttachment}
              onAddEvidence={() => setAddEvidenceModalOpen(true)}
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <DisputeTimelineCard timeline={dispute.timeline} />

            <DisputeResolutionCard
              dispute={dispute}
              selectedPath={selectedPath}
              splitConsumerPercent={splitConsumerPercent}
              resolutionNote={resolutionNote}
              isFinalizing={isFinalizing}
              isProfessional={isProfessional}
              onSelectPath={setSelectedPath}
              onSplitPercentChange={setSplitConsumerPercent}
              onResolutionNoteChange={setResolutionNote}
              onFinalizeDecision={handleFinalizeDecision}
            />
          </div>
        </div>
      </div>

      <AddDisputeEvidenceModal
        isOpen={addEvidenceModalOpen}
        disputeCode={dispute.code}
        onClose={() => setAddEvidenceModalOpen(false)}
        onSubmitEvidence={handleSubmitEvidence}
      />

      <MessageDisputeAdminModal
        isOpen={messageAdminModalOpen}
        disputeCode={dispute.code}
        onClose={() => setMessageAdminModalOpen(false)}
        onSendMessage={handleSendAdminMessage}
        onOpenMessagesHub={handleOpenMessagesHub}
      />

      <EvidencePreviewModal
        isOpen={Boolean(previewAttachment)}
        attachment={previewAttachment}
        onClose={() => setPreviewAttachment(null)}
      />
    </>
  );
}
