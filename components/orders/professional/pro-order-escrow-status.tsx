"use client";

import {
  AlertTriangle,
  Check,
  Clock,
  Info,
  Lock,
  MessageSquare,
  PenTool,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type { ProfessionalOrderItem } from "../types";

export interface ProOrderEscrowStatusProps {
  order: ProfessionalOrderItem;
  onContactSupport: () => void;
  onReadEscrowPolicy: () => void;
  onMessageConsumer: () => void;
}

export function ProOrderEscrowStatus({
  order,
  onContactSupport,
  onReadEscrowPolicy,
  onMessageConsumer,
}: ProOrderEscrowStatusProps) {
  const firstName = order.consumerName.split(" ")[0] || order.consumerName;
  const statusHeading =
    order.escrowStatus === "released"
      ? "Released"
      : order.escrowStatus === "pending-release"
        ? "Pending Release"
        : "Held in Escrow";

  return (
    <div className=" mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Escrow Details
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Financial records for Order #{order.code}
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-11 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
            <Lock className="size-5" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              CURRENT STATUS
            </p>
            <p className="text-base sm:text-lg font-extrabold text-foreground">
              {statusHeading}
            </p>
          </div>
        </div>

        <div className="sm:text-right space-y-0.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            PROTECTION
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground">
            <ShieldCheck className="size-4 text-foreground shrink-0" />
            <span>Funds Secured by MyKostoma Escrow</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-2xs space-y-6">
            <h2 className="text-sm sm:text-base font-extrabold text-foreground">
              Financial Breakdown
            </h2>

            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    Total Order Amount
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Total paid by {order.consumerName}
                  </p>
                </div>
                <span className="text-sm sm:text-base font-extrabold text-foreground whitespace-nowrap">
                  {order.totalAmountFormatted}
                </span>
              </div>

              <div className="pt-4 border-t border-border/70 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    Platform Service Fee (10%)
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Standard professional service fee
                  </p>
                </div>
                <span className="text-sm sm:text-base font-bold text-muted-foreground whitespace-nowrap">
                  {order.platformFeeFormatted.replace("-", "- ")}
                </span>
              </div>

              <div className="rounded-xl bg-secondary/45 border border-border/70 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-foreground">
                    Your Net Earnings
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    To be credited to your wallet after release
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                    {order.netEarningsFormatted}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-0.5">
                    •{" "}
                    {order.escrowStatus === "released"
                      ? "CREDITED TO WALLET"
                      : "AWAITING RELEASE"}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-secondary/35 border border-border/60 p-4 flex items-start gap-3">
                <Info className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Funds are automatically released to your wallet 3 days after
                  the consumer confirms completion, or 14 days after submission
                  if no dispute is raised.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-2xs space-y-5">
            <h2 className="text-sm sm:text-base font-extrabold text-foreground">
              Escrow Timeline
            </h2>

            <div className="relative pl-9 space-y-6">
              <div
                aria-hidden="true"
                className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-border"
              />

              {order.escrowTimeline.map((step) => (
                <div key={step.id} className="relative">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-9 top-0.5 size-7 rounded-full flex items-center justify-center",
                      step.state === "completed" &&
                      "bg-foreground text-background",
                      step.state === "current" &&
                      "border-2 border-border bg-card",
                      step.state === "upcoming" &&
                      "border border-border bg-secondary text-muted-foreground"
                    )}
                  >
                    {step.state === "completed" ? (
                      <Check className="size-3.5 stroke-[2.5]" />
                    ) : step.state === "current" ? (
                      <span className="size-2 rounded-full bg-muted-foreground" />
                    ) : (
                      <Check className="size-3.5 text-muted-foreground/60" />
                    )}
                  </span>

                  <div className="space-y-0.5">
                    <p
                      className={cn(
                        "text-xs sm:text-sm font-bold",
                        step.state === "completed"
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                    {step.timestampLabel && (
                      <p
                        className={cn(
                          "text-[11px] text-muted-foreground/80 pt-0.5",
                          step.state === "current" && "italic"
                        )}
                      >
                        {step.timestampLabel}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-5">
          <div className="rounded-2xl bg-foreground text-background p-6 shadow-xs space-y-5">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-background/60">
                ESCROW REF
              </p>
              <p className="text-xs sm:text-sm font-mono font-bold text-background">
                {order.escrowRef}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-background/60">
                CONSUMER
              </p>
              <div className="flex items-center gap-2.5">
                <FallbackImage
                  src={order.consumerAvatarUrl}
                  alt={order.consumerName}
                  variant="avatar"
                  className="size-8 text-[10px]"
                />
                <span className="text-xs sm:text-sm font-bold text-background">
                  {order.consumerName}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-background/15 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-background/65">Currency</span>
                <span className="font-bold text-background">
                  {order.currency}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-background/65">Payment Method</span>
                <span className="font-bold text-background">
                  {order.paymentMethod}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-foreground">
                Questions about payment?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our support team is available 24/7 to help with transaction
                inquiries or disputes.
              </p>
            </div>

            <div className="space-y-2.5">
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

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onReadEscrowPolicy}
                leadingIcon={<Info className="size-3.5" />}
                className="w-full h-9 rounded-lg text-xs font-bold"
              >
                Read Escrow Policy
              </Button>

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
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              ORDER DETAILS
            </p>

            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-secondary flex items-center justify-center text-foreground shrink-0">
                <PenTool className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground truncate">
                  {order.serviceTitle}
                </p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {order.serviceSubtitle}
                </p>
              </div>
            </div>

            <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5 shrink-0" />
              <span>Started {order.startedAtLabel || "Oct 12, 2026"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
