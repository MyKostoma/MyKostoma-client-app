"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Check,
  FileText,
  Image as ImageIcon,
  Info,
  LifeBuoy,
  MessageSquare,
  Paperclip,
  Scale,
  ShieldCheck,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/form-fields";
import { FallbackImage } from "@/components/ui/fallback-image";
import type { DisputeEvidenceAttachment } from "@/components/disputes/types";
import { cn } from "@/lib/utils";
import type {
  AddDisputeEvidenceModalProps,
  DisputeGuidelinesModalProps,
  EvidencePreviewModalProps,
  MessageDisputeAdminModalProps,
  RaiseDisputeWizardModalProps,
} from "./types";

const MAX_DESCRIPTION_CHARS = 2000;

function fileSizeLabel(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function RaiseDisputeWizardModal({
  isOpen,
  orderOptions,
  reasons,
  defaultOrderId,
  onClose,
  onSubmitDispute,
  onViewDisputeDetail,
  onOpenHelpCenter,
  onContactSupport,
}: RaiseDisputeWizardModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    defaultOrderId || orderOptions[0]?.id || ""
  );
  const [reason, setReason] = useState<string>(reasons[0] || "");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<DisputeEvidenceAttachment[]>([]);
  const [descriptionError, setDescriptionError] = useState<string | undefined>(
    undefined
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdCase, setCreatedCase] = useState<{
    id: string;
    code: string;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setSelectedOrderId(defaultOrderId || orderOptions[0]?.id || "");
    setReason(reasons[0] || "");
    setDescription("");
    setAttachments([]);
    setDescriptionError(undefined);
    setIsSubmitting(false);
    setCreatedCase(null);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [defaultOrderId, isOpen, onClose, orderOptions, reasons]);

  if (!isOpen) return null;

  const activeOrder =
    orderOptions.find(
      (opt) =>
        opt.id.toLowerCase() === selectedOrderId.toLowerCase() ||
        opt.code.toLowerCase() === selectedOrderId.toLowerCase()
    ) || orderOptions[0];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const next: DisputeEvidenceAttachment[] = Array.from(files).map(
      (file, idx) => {
        const isImg = file.type.startsWith("image/");
        return {
          id: `draft-att-${Date.now()}-${idx}`,
          label: file.name.replace(/\.[^/.]+$/, ""),
          fileName: file.name,
          fileType: isImg ? "image" : "document",
          previewUrl: isImg ? URL.createObjectURL(file) : undefined,
          sizeLabel: fileSizeLabel(file.size),
        };
      }
    );
    setAttachments((prev) => [...prev, ...next].slice(0, 5));
    e.target.value = "";
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      if (!reason) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      if (description.trim().length < 15) {
        setDescriptionError(
          "Please describe the issue in at least 15 characters so mediation can review it accurately."
        );
        return;
      }
      setDescriptionError(undefined);
      setIsSubmitting(true);
      const result = await onSubmitDispute({
        orderId: activeOrder?.id || selectedOrderId || "ord-5521",
        reason,
        description: description.trim(),
        attachments,
      });
      setIsSubmitting(false);
      if (result) {
        setCreatedCase(result);
        setStep(3);
      }
    }
  };

  const orderSelectOptions = orderOptions.map((opt) => ({
    value: opt.id,
    label: `#${opt.code} — ${opt.serviceTitle} (${opt.amountFormatted})`,
  }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="raise-dispute-wizard-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-xl rounded-2xl border border-border bg-card shadow-xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <h2
              id="raise-dispute-wizard-title"
              className="text-lg font-extrabold tracking-tight text-foreground"
            >
              Raise a Dispute
            </h2>
            <p className="text-xs text-muted-foreground">
              {activeOrder
                ? `Please provide details regarding your concern with Order #${activeOrder.code}.`
                : "Please provide details regarding your order concern."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dispute dialog"
            className="size-8 rounded-full bg-secondary/70 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* 3-Step Indicator */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-center gap-2 sm:gap-4 shrink-0">
          {[
            { num: 1 as const, label: "SELECT REASON" },
            { num: 2 as const, label: "DESCRIPTION" },
            { num: 3 as const, label: "FINISH" },
          ].map((item, idx) => {
            const isCompleted = step > item.num;
            const isActive = step === item.num;
            return (
              <div key={item.num} className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "size-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors shrink-0",
                      isCompleted || isActive
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-background text-muted-foreground"
                    )}
                  >
                    {isCompleted ? <Check className="size-3.5" /> : item.num}
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-bold tracking-wider whitespace-nowrap",
                      isActive || isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className="hidden sm:block w-8 h-px bg-border" />
                )}
              </div>
            );
          })}
        </div>

        {/* Body */}
        <div className="px-6 py-4 overflow-y-auto flex-1 space-y-4">
          {step === 1 && (
            <>
              {orderSelectOptions.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Related Order
                  </label>
                  <Select
                    value={activeOrder?.id || ""}
                    onChange={setSelectedOrderId}
                    options={orderSelectOptions}
                    placeholder="Select order"
                  />
                </div>
              )}

              <div className="space-y-2.5">
                {reasons.map((option) => {
                  const selected = reason === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setReason(option)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all cursor-pointer",
                        selected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                          : "border-border bg-card hover:bg-secondary/40"
                      )}
                    >
                      <span
                        className={cn(
                          "size-4 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                          selected
                            ? "border-primary"
                            : "border-muted-foreground/50"
                        )}
                      >
                        {selected && (
                          <span className="size-2 rounded-full bg-primary" />
                        )}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="dispute-wizard-description"
                    className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    Detailed Description
                  </label>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {description.length} / {MAX_DESCRIPTION_CHARS} characters
                  </span>
                </div>

                <Textarea
                  id="dispute-wizard-description"
                  value={description}
                  onChange={(e) => {
                    const nextVal = e.target.value.slice(
                      0,
                      MAX_DESCRIPTION_CHARS
                    );
                    setDescription(nextVal);
                    if (descriptionError) setDescriptionError(undefined);
                  }}
                  rows={5}
                  placeholder="Provide as much detail as possible about the issue..."
                  className="resize-none rounded-xl"
                />

                {descriptionError && (
                  <p className="text-xs font-medium text-error">
                    {descriptionError}
                  </p>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                  <Info className="size-3.5 shrink-0" />
                  <span>
                    Clear documentation helps our mediation team resolve disputes
                    faster.
                  </span>
                </div>
              </div>

              {/* Optional evidence attachment picker */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Supporting Evidence (Optional)
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    <Paperclip className="size-3.5" />
                    <span>Attach photos or PDF</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {attachments.length > 0 && (
                  <div className="space-y-2">
                    {attachments.map((att) => (
                      <div
                        key={att.id}
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-border bg-secondary/40 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {att.fileType === "image" ? (
                            <ImageIcon className="size-4 text-primary shrink-0" />
                          ) : (
                            <FileText className="size-4 text-primary shrink-0" />
                          )}
                          <span className="font-medium text-foreground truncate">
                            {att.fileName}
                          </span>
                          {att.sizeLabel && (
                            <span className="text-muted-foreground shrink-0">
                              ({att.sizeLabel})
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(att.id)}
                          aria-label={`Remove ${att.fileName}`}
                          className="p-1 text-muted-foreground hover:text-error transition-colors cursor-pointer"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-4 px-2 flex flex-col items-center text-center space-y-4">
              <div className="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                <Check className="size-6 stroke-[2.5]" />
              </div>

              <div className="space-y-1.5 max-w-sm">
                <h3 className="text-lg font-extrabold tracking-tight text-foreground">
                  Dispute successfully submitted
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Escrow funds are frozen after the dispute is successfully
                  submitted. Our team will review the case and contact both
                  parties within 48 hours.
                </p>
              </div>

              {createdCase && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-xs font-semibold text-foreground">
                  <span>Case Reference:</span>
                  <span className="text-primary font-bold">
                    {createdCase.code}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="h-10 px-5 rounded-xl text-xs font-semibold"
                >
                  Back to Disputes
                </Button>
                {createdCase && (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => {
                      onClose();
                      onViewDisputeDetail(createdCase.id);
                    }}
                    className="h-10 px-5 rounded-xl text-xs font-semibold"
                  >
                    View Dispute Case
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step < 3 ? (
          <div className="px-6 py-4 border-t border-border bg-secondary/20 flex items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <div className="flex items-center gap-2.5">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="h-9 px-4 rounded-xl text-xs font-semibold"
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                loadingText="Submitting..."
                className="h-9 px-5 rounded-xl text-xs font-semibold"
              >
                {step === 1 ? "Next Step" : "Submit Dispute"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="px-6 py-3.5 border-t border-border bg-secondary/20 text-center text-[11px] text-muted-foreground shrink-0">
            Need immediate help? Visit our{" "}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenHelpCenter();
              }}
              className="font-semibold text-foreground underline hover:text-primary cursor-pointer"
            >
              Help Center
            </button>{" "}
            or{" "}
            <button
              type="button"
              onClick={() => {
                onClose();
                onContactSupport();
              }}
              className="font-semibold text-foreground underline hover:text-primary cursor-pointer"
            >
              Contact Support
            </button>
            .
          </div>
        )}
      </form>
    </div>
  );
}

export function AddDisputeEvidenceModal({
  isOpen,
  disputeCode,
  onClose,
  onSubmitEvidence,
}: AddDisputeEvidenceModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<DisputeEvidenceAttachment[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setMessage("");
    setAttachments([]);
    setError(undefined);
    setIsSubmitting(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const mapped: DisputeEvidenceAttachment[] = Array.from(files).map(
      (file, idx) => {
        const isImage = file.type.startsWith("image/");
        return {
          id: `ev-${Date.now()}-${idx}`,
          label: file.name.replace(/\.[^/.]+$/, ""),
          fileName: file.name,
          fileType: isImage ? "image" : "document",
          previewUrl: isImage ? URL.createObjectURL(file) : undefined,
          sizeLabel: fileSizeLabel(file.size),
        };
      }
    );
    setAttachments((prev) => [...prev, ...mapped].slice(0, 6));
    if (error) setError(undefined);
    e.target.value = "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() && attachments.length === 0) {
      setError(
        "Please enter an explanation statement or attach at least one evidence file."
      );
      return;
    }

    setIsSubmitting(true);
    await onSubmitEvidence({
      message:
        message.trim() ||
        `Uploaded ${attachments.length} supporting file(s) for review.`,
      attachments,
    });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-evidence-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl space-y-5 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h2
              id="add-evidence-modal-title"
              className="text-lg font-extrabold tracking-tight text-foreground"
            >
              Add Evidence — {disputeCode}
            </h2>
            <p className="text-xs text-muted-foreground">
              Upload photos, receipts, or written context visible to the mediator
              and counterparty.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close evidence modal"
            className="size-8 rounded-full bg-secondary/70 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
          >
            <X className="size-4" />
          </button>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className="rounded-xl border border-dashed border-border bg-secondary/30 hover:bg-secondary/60 p-5 flex flex-col items-center text-center gap-2 transition-colors cursor-pointer"
        >
          <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Upload className="size-5" />
          </div>
          <p className="text-xs font-semibold text-foreground">
            Click to upload photos, invoices, or PDF documents
          </p>
          <p className="text-[11px] text-muted-foreground">
            PNG, JPG, PDF up to 10 MB each (max 6 files)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {attachments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {attachments.map((att) => (
              <div
                key={att.id}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-border bg-secondary/40 text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {att.fileType === "image" ? (
                    <ImageIcon className="size-4 text-primary shrink-0" />
                  ) : (
                    <FileText className="size-4 text-primary shrink-0" />
                  )}
                  <span className="truncate font-medium text-foreground">
                    {att.fileName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setAttachments((prev) =>
                      prev.filter((item) => item.id !== att.id)
                    )
                  }
                  aria-label={`Remove ${att.fileName}`}
                  className="text-muted-foreground hover:text-error cursor-pointer shrink-0"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-1.5">
          <label
            htmlFor="evidence-statement-input"
            className="text-xs font-semibold text-foreground"
          >
            Response / Explanation Note
          </label>
          <Textarea
            id="evidence-statement-input"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (error) setError(undefined);
            }}
            rows={4}
            placeholder="Summarize what this evidence shows or respond to the other party..."
            className="resize-none rounded-xl"
          />
        </div>

        {error && <p className="text-xs font-medium text-error">{error}</p>}

        <div className="flex items-center justify-end gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 px-4 rounded-xl text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            loadingText="Uploading..."
            className="h-9 px-5 rounded-xl text-xs font-semibold"
          >
            Submit Evidence
          </Button>
        </div>
      </form>
    </div>
  );
}

export function MessageDisputeAdminModal({
  isOpen,
  disputeCode,
  onClose,
  onSendMessage,
  onOpenMessagesHub,
}: MessageDisputeAdminModalProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSubject(`Mediation inquiry for ${disputeCode}`);
    setMessage("");
    setError(undefined);
    setIsSending(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [disputeCode, isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subject.trim() || message.trim().length < 10) {
      setError(
        "Please include a subject and message of at least 10 characters."
      );
      return;
    }
    setIsSending(true);
    await onSendMessage({ subject: subject.trim(), message: message.trim() });
    setIsSending(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="message-admin-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <MessageSquare className="size-5" />
            </div>
            <div>
              <h2
                id="message-admin-modal-title"
                className="text-base font-extrabold tracking-tight text-foreground"
              >
                Message Mediation Admin
              </h2>
              <p className="text-xs text-muted-foreground">
                Direct note to MyKostoma Dispute Resolution ({disputeCode})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close message admin dialog"
            className="size-8 rounded-full bg-secondary/70 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="rounded-xl border border-border bg-secondary/40 px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-primary shrink-0 mt-0.5" />
          <span>
            Mediation specialists respond within 24–48 hours and review private
            context alongside the escrow ledger.
          </span>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="admin-msg-subject"
            className="text-xs font-semibold text-foreground"
          >
            Subject
          </label>
          <Input
            id="admin-msg-subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              if (error) setError(undefined);
            }}
            placeholder="Subject of your note"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="admin-msg-body"
            className="text-xs font-semibold text-foreground"
          >
            Message
          </label>
          <Textarea
            id="admin-msg-body"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (error) setError(undefined);
            }}
            rows={4}
            placeholder="Share additional context or request a mediator call..."
            className="resize-none rounded-xl"
          />
        </div>

        {error && <p className="text-xs font-medium text-error">{error}</p>}

        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenMessagesHub();
            }}
            className="text-xs font-semibold text-primary hover:underline cursor-pointer"
          >
            Open Live Chat
          </button>

          <div className="flex items-center gap-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-9 px-4 rounded-xl text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isSending}
              loadingText="Sending..."
              className="h-9 px-5 rounded-xl text-xs font-semibold"
            >
              Send to Admin
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export function DisputeGuidelinesModal({
  isOpen,
  sections,
  onClose,
  onContactSupport,
}: DisputeGuidelinesModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dispute-guidelines-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card shadow-xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[88vh] flex flex-col">
        <div className="px-6 py-5 border-b border-border flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Scale className="size-5" />
            </div>
            <div>
              <h2
                id="dispute-guidelines-modal-title"
                className="text-base font-extrabold tracking-tight text-foreground"
              >
                MyKostoma Dispute &amp; Mediation Guidelines
              </h2>
              <p className="text-xs text-muted-foreground">
                How escrow protection and conflict resolution work
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close guidelines"
            className="size-8 rounded-full bg-secondary/70 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {sections.map((section) => (
            <div
              key={section.id}
              className="rounded-xl border border-border bg-secondary/30 p-4 space-y-2"
            >
              <h3 className="text-sm font-bold text-foreground">
                {section.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {section.summary}
              </p>
              <ul className="space-y-1.5 pt-1">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-xs text-foreground"
                  >
                    <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-border bg-secondary/20 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              onContactSupport();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
          >
            <LifeBuoy className="size-4" />
            <span>Contact Mediation Support</span>
          </button>

          <Button
            type="button"
            variant="primary"
            onClick={onClose}
            className="h-9 px-5 rounded-xl text-xs font-semibold"
          >
            Got It
          </Button>
        </div>
      </div>
    </div>
  );
}

export function EvidencePreviewModal({
  isOpen,
  attachment,
  onClose,
}: EvidencePreviewModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !attachment) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="evidence-preview-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              id="evidence-preview-title"
              className="text-base font-bold text-foreground"
            >
              {attachment.label}
            </h2>
            <p className="text-xs text-muted-foreground">
              {attachment.fileName}
              {attachment.sizeLabel ? ` • ${attachment.sizeLabel}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close attachment preview"
            className="size-8 rounded-full bg-secondary/70 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="rounded-xl border border-border bg-secondary/40 min-h-56 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          {attachment.previewUrl ? (
            <FallbackImage
              src={attachment.previewUrl}
              alt={attachment.label}
              fallbackType="general"
              variant="card"
              className="max-h-72 w-auto rounded-lg object-contain"
            />
          ) : (
            <div className="space-y-2.5 flex flex-col items-center">
              <div className="size-12 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground">
                {attachment.fileType === "image" ? (
                  <ImageIcon className="size-6" />
                ) : (
                  <FileText className="size-6" />
                )}
              </div>
              <p className="text-xs font-semibold text-foreground">
                {attachment.label}
              </p>
              <p className="text-[11px] text-muted-foreground max-w-xs">
                Verified dispute evidence artifact stored securely in the
                mediation case file.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 px-4 rounded-xl text-xs font-semibold"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
