"use client";

import { useRef } from "react";
import {
  Check,
  Clock,
  CloudUpload,
  Download,
  FileArchive,
  FileImage,
  FileText,
  MessageSquare,
  PenTool,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProfessionalOrderItem } from "../types";
import { ProOrderStatusPill } from "./pro-orders-table";
import { ProOrderDetailSidebar } from "./pro-order-detail-sidebar";

export interface ProOrderDetailWorkspaceProps {
  order: ProfessionalOrderItem;
  completionNotes: string;
  uploadedDeliverableName: string | null;
  onCompletionNotesChange: (value: string) => void;
  onUploadDeliverable: (fileName: string) => void;
  onStartOrder: () => void;
  onMarkCompleted: () => void;
  onLeaveReview: () => void;
  onMessageConsumer: () => void;
  onViewProfile: () => void;
  onViewEscrowDetails: () => void;
  onRaiseDispute: () => void;
  onOrderGuidelines: () => void;
  onDownloadAttachment: (fileName: string) => void;
}

export function ProOrderDetailWorkspace({
  order,
  completionNotes,
  uploadedDeliverableName,
  onCompletionNotesChange,
  onUploadDeliverable,
  onStartOrder,
  onMarkCompleted,
  onLeaveReview,
  onMessageConsumer,
  onViewProfile,
  onViewEscrowDetails,
  onRaiseDispute,
  onOrderGuidelines,
  onDownloadAttachment,
}: ProOrderDetailWorkspaceProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isPending = order.status === "pending";
  const isInProgress = order.status === "in-progress";
  const isCompleted = order.status === "completed";

  const handleFilePick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mx-auto space-y-6">
      {isCompleted && (
        <div className="rounded-xl bg-foreground text-background px-5 py-4 flex items-start sm:items-center gap-3.5 shadow-xs">
          <div className="size-7 rounded-full bg-background text-foreground flex items-center justify-center shrink-0">
            <Check className="size-4 stroke-[2.5]" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs sm:text-sm font-bold text-background">
              Order submitted for review
            </p>
            <p className="text-xs text-background/75">
              The consumer has been notified to confirm completion and release
              the escrow funds. This usually takes 24-48 hours.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              Order #{order.code}
            </h1>
            <ProOrderStatusPill status={order.status} variant="detail" />
          </div>
          <p className="text-xs text-muted-foreground">
            {isCompleted
              ? order.completedAtLabel || "Completed on Oct 17, 2026 • 02:15 PM"
              : order.placedAtLabel}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {isPending && (
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onStartOrder}
              className="h-10 px-5 rounded-lg text-xs font-bold shadow-xs"
            >
              Start Order
            </Button>
          )}

          {isInProgress && (
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onMarkCompleted}
              className="h-10 px-5 rounded-lg text-xs font-bold shadow-xs"
            >
              Mark Completed
            </Button>
          )}

          {isCompleted && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onLeaveReview}
              className="h-10 px-4 rounded-lg text-xs font-bold"
            >
              Leave a Review
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onMessageConsumer}
            leadingIcon={<MessageSquare className="size-3.5" />}
            className="h-10 px-4 rounded-lg text-xs font-bold"
          >
            Message Consumer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          {isInProgress && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-4">
              <h2 className="text-sm sm:text-base font-extrabold text-foreground">
                Work Evidence &amp; Completion Notes
              </h2>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onUploadDeliverable(file.name);
                  }
                }}
              />

              <button
                type="button"
                onClick={handleFilePick}
                className="w-full rounded-xl border-2 border-dashed border-border bg-secondary/25 hover:bg-secondary/45 transition-colors py-8 px-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer"
              >
                <CloudUpload className="size-7 text-muted-foreground" />
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {uploadedDeliverableName || "Upload final deliverables"}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  PDF, PNG, JPG, or ZIP up to 50MB
                </p>
              </button>

              <textarea
                rows={4}
                value={completionNotes}
                onChange={(e) => onCompletionNotesChange(e.target.value)}
                placeholder="Add any notes about the completed work for the consumer..."
                className="w-full p-3.5 rounded-xl border border-border bg-card text-xs sm:text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed"
              />
            </div>
          )}

          {isCompleted && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm sm:text-base font-extrabold text-foreground">
                  Final Deliverables
                </h2>
                <span className="text-[11px] text-muted-foreground">
                  {order.submittedDateLabel || "Submitted Oct 17, 2026"}
                </span>
              </div>

              {order.finalDeliverable && (
                <div className="rounded-xl border border-border/80 bg-secondary/35 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground shrink-0">
                      <FileArchive className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">
                        {order.finalDeliverable.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {order.finalDeliverable.size} •{" "}
                        {order.finalDeliverable.statusLabel ||
                          "Ready for download"}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={() =>
                      onDownloadAttachment(order.finalDeliverable!.name)
                    }
                    className="h-8 px-4 rounded-lg text-xs font-bold shrink-0 self-end sm:self-center"
                  >
                    Download
                  </Button>
                </div>
              )}

              <div className="rounded-xl bg-secondary/35 border border-border/60 p-4 space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  YOUR COMPLETION NOTE
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {order.completionNote ||
                    "Hi! I've completed the package as requested and uploaded all source files. It was a pleasure working with you!"}
                </p>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-4">
            <h2 className="text-sm sm:text-base font-extrabold text-foreground">
              Service Details
            </h2>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="size-16 rounded-xl bg-secondary/60 border border-border/60 flex items-center justify-center text-muted-foreground shrink-0">
                <PenTool className="size-6" />
              </div>

              <div className="space-y-2.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-extrabold text-foreground">
                    {order.serviceTitle}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-secondary text-[11px] font-semibold text-muted-foreground">
                    {order.serviceCategory}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {order.serviceDescription}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5 shrink-0" />
                    <span>{order.durationLabel}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <RefreshCw className="size-3.5 shrink-0" />
                    <span>{order.revisionsLabel}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {!isInProgress && !isCompleted && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-4">
              <h2 className="text-sm sm:text-base font-extrabold text-foreground">
                Order Requirements
              </h2>

              <div className="rounded-xl bg-secondary/40 border border-border/60 p-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                &ldquo;{order.requirementsNote}&rdquo;
              </div>

              {order.requirementAttachments.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {order.requirementAttachments.map((file) => (
                    <div
                      key={file.id}
                      className="rounded-xl border border-border bg-card p-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="size-9 rounded-lg bg-secondary/60 flex items-center justify-center text-muted-foreground shrink-0">
                          {file.type === "pdf" ? (
                            <FileText className="size-4" />
                          ) : (
                            <FileImage className="size-4" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">
                            {file.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {file.size}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        aria-label={`Download ${file.name}`}
                        onClick={() => onDownloadAttachment(file.name)}
                        className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer shrink-0"
                      >
                        <Download className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-5">
            <h2 className="text-sm sm:text-base font-extrabold text-foreground">
              Order Timeline
            </h2>

            <div className="relative pl-8 space-y-6">
              <div
                aria-hidden="true"
                className={cn(
                  "absolute left-[11px] top-3 bottom-3 w-0.5",
                  isCompleted ? "bg-primary/40" : "bg-border"
                )}
              />

              {order.orderTimeline.map((step) => (
                <div key={step.id} className="relative">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-8 top-0.5 size-6 rounded-full flex items-center justify-center",
                      step.state === "completed" &&
                        (isCompleted
                          ? "bg-primary text-primary-foreground"
                          : "bg-foreground text-background"),
                      step.state === "active" &&
                        "border-2 border-foreground bg-card",
                      step.state === "pending" &&
                        "border border-border bg-secondary"
                    )}
                  >
                    {step.state === "completed" ? (
                      <Check className="size-3.5 stroke-[2.5]" />
                    ) : step.state === "active" ? (
                      <span className="size-2 rounded-full bg-foreground" />
                    ) : (
                      <span className="size-1.5 rounded-full bg-muted-foreground/60" />
                    )}
                  </span>

                  <div className="space-y-0.5">
                    <p
                      className={cn(
                        "text-xs sm:text-sm font-bold",
                        step.state === "pending"
                          ? "text-muted-foreground"
                          : "text-foreground"
                      )}
                    >
                      {step.title}
                    </p>
                    <p
                      className={cn(
                        "text-xs text-muted-foreground",
                        step.state === "pending" && "italic"
                      )}
                    >
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <ProOrderDetailSidebar
            order={order}
            showInitialRequirements={isInProgress || isCompleted}
            onViewProfile={onViewProfile}
            onViewEscrowDetails={onViewEscrowDetails}
            onRaiseDispute={onRaiseDispute}
            onOrderGuidelines={onOrderGuidelines}
            onDownloadAttachment={onDownloadAttachment}
          />
        </div>
      </div>
    </div>
  );
}
