"use client";

import { useRef, useState } from "react";
import {
  AlertTriangle,
  ChevronDown,
  FileText,
  Lock,
  MessageSquare,
  PenTool,
  RefreshCw,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { PRO_DISPUTE_REASON_OPTIONS } from "@/features/orders/data";
import { cn } from "@/lib/utils";
import type {
  ProfessionalOrderDisputeFormValues,
  ProfessionalOrderItem,
} from "../types";

export interface ProOrderDisputeFormProps {
  order: ProfessionalOrderItem;
  values: ProfessionalOrderDisputeFormValues;
  onChange: (values: ProfessionalOrderDisputeFormValues) => void;
  onAddEvidence: (fileName: string) => void;
  onRemoveEvidence: (fileName: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  onMessageConsumer: () => void;
  onContactSupport: () => void;
}

export function ProOrderDisputeForm({
  order,
  values,
  onChange,
  onAddEvidence,
  onRemoveEvidence,
  onCancel,
  onSubmit,
  onMessageConsumer,
  onContactSupport,
}: ProOrderDisputeFormProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const firstName = order.consumerName.split(" ")[0] || order.consumerName;

  return (
    <div className=" mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Open a Dispute
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Submit a formal request to resolve a conflict regarding Order #
          {order.code}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs flex items-start gap-3.5">
            <div className="size-8 rounded-lg bg-secondary flex items-center justify-center text-foreground shrink-0 mt-0.5">
              <Lock className="size-4" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-extrabold text-foreground">
                Before you proceed
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Disputes are a last resort. We recommend contacting the consumer
                first to find a mutual solution. Once a dispute is opened,
                escrow funds will be frozen until a resolution is reached by our
                moderation team.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-2xs space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground">
                Reason for Dispute
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className={cn(
                    "w-full h-11 px-4 rounded-xl border border-border bg-secondary/30 text-left text-xs sm:text-sm flex items-center justify-between gap-2 transition-all cursor-pointer",
                    dropdownOpen && "border-primary ring-2 ring-primary/20"
                  )}
                >
                  <span
                    className={
                      values.reason
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    {values.reason || "Select a reason..."}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition-transform",
                      dropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {dropdownOpen && (
                  <div className="mt-1.5 rounded-xl border border-border bg-card shadow-md divide-y divide-border/60 overflow-hidden z-20">
                    {PRO_DISPUTE_REASON_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          onChange({ ...values, reason: option });
                          setDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-3 text-xs sm:text-sm transition-colors cursor-pointer",
                          values.reason === option
                            ? "bg-accent text-primary font-semibold"
                            : "text-foreground hover:bg-secondary/50"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="pro-dispute-description"
                className="block text-xs font-bold text-foreground"
              >
                Detailed Description
              </label>
              <textarea
                id="pro-dispute-description"
                rows={5}
                maxLength={2000}
                value={values.description}
                onChange={(e) =>
                  onChange({ ...values, description: e.target.value })
                }
                placeholder="Provide a clear explanation of the issue. Include dates, specific missed expectations, and attempts made to resolve the conflict."
                className="w-full p-4 rounded-xl border border-border bg-secondary/25 text-xs sm:text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed"
              />
              <p className="text-[11px] text-muted-foreground">
                Maximum 2,000 characters
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-foreground">
                Upload Evidence
              </label>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onAddEvidence(file.name);
                  }
                }}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-xl border-2 border-dashed border-border bg-secondary/25 hover:bg-secondary/45 transition-colors py-8 px-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer"
              >
                <div className="size-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground">
                  <Upload className="size-4" />
                </div>
                <p className="text-xs font-bold text-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-[11px] text-muted-foreground">
                  PDF, JPG, PNG, or ZIP (Max 25MB total)
                </p>
              </button>

              {values.evidenceFiles.length > 0 && (
                <div className="space-y-2">
                  {values.evidenceFiles.map((fileName) => (
                    <div
                      key={fileName}
                      className="rounded-xl border border-border/80 bg-secondary/35 px-4 py-3 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="size-4 text-muted-foreground shrink-0" />
                        <span className="text-xs font-semibold text-foreground truncate">
                          {fileName}
                        </span>
                      </div>

                      <button
                        type="button"
                        aria-label={`Remove ${fileName}`}
                        onClick={() => onRemoveEvidence(fileName)}
                        className="text-muted-foreground hover:text-error transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-border/70 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="w-full sm:w-auto h-10 px-6 rounded-lg text-xs font-bold"
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="default"
                onClick={onSubmit}
                className="w-full sm:w-auto h-10 px-6 rounded-lg text-xs font-bold shadow-xs"
              >
                Submit Dispute
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-5">
            <h2 className="text-sm font-extrabold text-foreground">
              Order Summary
            </h2>

            <div className="flex items-center gap-3 pb-4 border-b border-border/70">
              <div className="size-10 rounded-xl bg-secondary flex items-center justify-center text-foreground shrink-0">
                <PenTool className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground truncate">
                  {order.serviceTitle}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {order.code}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Consumer</span>
                <div className="flex items-center gap-2">
                  <FallbackImage
                    src={order.consumerAvatarUrl}
                    alt={order.consumerName}
                    variant="avatar"
                    className="size-5 text-[9px]"
                  />
                  <span className="font-bold text-foreground">
                    {order.consumerName}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Escrow Balance</span>
                <span className="font-extrabold text-foreground">
                  {order.totalAmountFormatted}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-foreground text-background p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-background">
              <RefreshCw className="size-4 shrink-0" />
              <span>Dispute Policy</span>
            </div>

            <ul className="space-y-2.5 text-xs text-background/75 list-disc pl-4 leading-relaxed">
              <li>Both parties have 48 hours to submit initial evidence.</li>
              <li>Resolution typically takes 5-7 business days.</li>
              <li>Decision by MyKostoma arbiter is final and binding.</li>
            </ul>

            <button
              type="button"
              onClick={onContactSupport}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-background underline underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span>Learn more about Arbitration</span>
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onMessageConsumer}
              leadingIcon={<MessageSquare className="size-3.5" />}
              className="w-full h-9 rounded-lg text-xs font-bold"
            >
              Message {firstName}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onContactSupport}
              leadingIcon={<AlertTriangle className="size-3.5" />}
              className="w-full h-9 rounded-lg text-xs font-bold"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
