"use client";

import { Clock, Plus, ShieldCheck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatWalletNaira } from "@/features/wallet/services/walletHelpers";
import type { WalletBalanceCardsProps } from "./types";

export function WalletBalanceCards({
  summary,
  onFundWallet,
  className,
}: WalletBalanceCardsProps) {
  const secondaryCards = [
    {
      id: "pending",
      label: "PENDING BALANCE",
      amount: summary.pendingBalance,
      caption: summary.pendingCaption,
      icon: Clock,
    },
    {
      id: "escrow",
      label: "ESCROW BALANCE",
      amount: summary.escrowBalance,
      caption: summary.escrowCaption,
      icon: ShieldCheck,
    },
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-5",
        className
      )}
    >
      {/* Available Balance Dark Card */}
      <div className="relative overflow-hidden rounded-2xl bg-foreground text-background p-6 flex flex-col justify-between shadow-md min-h-44">
        <div className="space-y-1.5 relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">
            AVAILABLE BALANCE
          </p>
          <p className="text-2xl xl:text-3xl font-extrabold tracking-tight">
            {formatWalletNaira(summary.availableBalance)}
          </p>
        </div>

        <div className="pt-5 relative z-10">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onFundWallet}
            leadingIcon={<Plus className="size-3.5" />}
            className="h-9 px-4 rounded-xl bg-background text-foreground hover:bg-background/90 text-xs font-bold shadow-xs"
          >
            Fund Wallet
          </Button>
        </div>

        {/* Subtle decorative wallet silhouette */}
        <Wallet
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -bottom-5 size-28 opacity-10 stroke-[1.5]"
        />
      </div>

      {/* Pending & Escrow Balance Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 md:col-span-2 gap-2.5 sm:gap-5">
      {secondaryCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="rounded-2xl border border-border bg-card p-3 sm:p-6 flex flex-col justify-between shadow-2xs max-h-36"
          >
            <div className="space-y-1.5">
              <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {card.label}
              </p>
              <p className="text-lg sm:text-2xl font-extrabold text-foreground tracking-tight line-clamp">
                {formatWalletNaira(card.amount)}
              </p>
            </div>

            <div className="pt-5 flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
              <Icon className="size-3.5 shrink-0 text-muted-foreground" />
              <span>{card.caption}</span>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}

