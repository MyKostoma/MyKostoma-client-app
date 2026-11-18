"use client";

import {
  AlertTriangle,
  FileImage,
  FileText,
  Info,
  Lock,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type { ProfessionalOrderItem } from "../types";

export interface ProOrderDetailSidebarProps {
  order: ProfessionalOrderItem;
  showInitialRequirements?: boolean;
  onViewProfile: () => void;
  onViewEscrowDetails: () => void;
  onRaiseDispute: () => void;
  onOrderGuidelines: () => void;
  onDownloadAttachment: (fileName: string) => void;
}

export function ProOrderDetailSidebar({
  order,
  showInitialRequirements = false,
  onViewProfile,
  onViewEscrowDetails,
  onRaiseDispute,
  onOrderGuidelines,
  onDownloadAttachment,
}: ProOrderDetailSidebarProps) {
  const isPendingRelease = order.escrowStatus === "pending-release";
  const isReleased = order.escrowStatus === "released";

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          CONSUMER
        </p>

        <div className="flex items-center gap-3">
          <FallbackImage
            src={order.consumerAvatarUrl}
            alt={order.consumerName}
            variant="avatar"
            className="size-11 text-xs"
          />
          <div className="min-w-0">
            <p className="text-sm font-bold text-foreground truncate">
              {order.consumerName}
            </p>
            <p className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin className="size-3 shrink-0" />
              <span className="truncate">{order.consumerLocation}</span>
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onViewProfile}
          className="w-full h-9 rounded-lg text-xs font-bold"
        >
          View Full Profile
        </Button>

        <div className="pt-3 border-t border-border/70 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Joined</span>
            <span className="font-bold text-foreground">
              {order.consumerJoined}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Orders with you</span>
            <span className="font-bold text-foreground">
              {order.consumerOrdersCount}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          FINANCIAL SUMMARY
        </p>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Order Amount</span>
            <span className="font-bold text-foreground">
              {order.totalAmountFormatted}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Platform Fee (10%)</span>
            <span className="font-semibold text-error">
              {order.platformFeeFormatted}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-border/70 flex items-center justify-between">
          <span className="text-xs font-extrabold text-foreground">
            Net Earnings
          </span>
          <span className="text-sm sm:text-base font-extrabold text-foreground">
            {order.netEarningsFormatted}
          </span>
        </div>

        <button
          type="button"
          onClick={onViewEscrowDetails}
          className="w-full text-left rounded-xl border border-border/80 bg-secondary/40 hover:bg-secondary/65 transition-colors p-3.5 flex items-center gap-3 cursor-pointer"
        >
          <div
            className={cn(
              "size-8 rounded-lg flex items-center justify-center shrink-0",
              isPendingRelease
                ? "bg-primary text-primary-foreground"
                : isReleased
                  ? "bg-success text-white"
                  : "bg-foreground text-background"
            )}
          >
            <Lock className="size-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-foreground truncate">
              {isPendingRelease
                ? "Escrow Status: Pending Release"
                : isReleased
                  ? "Escrow Status: Released"
                  : "Escrow Status: Held"}
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              {isPendingRelease
                ? "Awaiting consumer confirmation"
                : isReleased
                  ? "Credited to your wallet"
                  : "Funds secured by MyKostoma"}
            </p>
          </div>
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          HELP &amp; SUPPORT
        </p>

        <div className="space-y-1.5">
          <button
            type="button"
            onClick={onRaiseDispute}
            className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-xs font-bold text-error hover:bg-error-bg/50 transition-colors cursor-pointer"
          >
            <span className="size-6 rounded-md bg-error-bg flex items-center justify-center text-error shrink-0">
              <AlertTriangle className="size-3.5" />
            </span>
            <span>Raise Dispute</span>
          </button>

          <button
            type="button"
            onClick={onOrderGuidelines}
            className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
          >
            <span className="size-6 rounded-md bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
              <Info className="size-3.5" />
            </span>
            <span>Order Guidelines</span>
          </button>
        </div>
      </div>

      {showInitialRequirements && order.requirementAttachments.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            INITIAL REQUIREMENTS
          </p>

          <div className="space-y-2">
            {order.requirementAttachments.map((file) => (
              <button
                key={file.id}
                type="button"
                onClick={() => onDownloadAttachment(file.name)}
                className="w-full flex items-center gap-2.5 text-left text-xs font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                {file.type === "pdf" ? (
                  <FileText className="size-3.5 text-muted-foreground shrink-0" />
                ) : (
                  <FileImage className="size-3.5 text-muted-foreground shrink-0" />
                )}
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
