"use client";

import { cn } from "@/lib/utils";
import type { ShopTrustCardsProps, ShopTrustHighlight } from "./types";

const TONE_STYLES: Record<ShopTrustHighlight["tone"], string> = {
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
};

export function ShopTrustCards({ items, className }: ShopTrustCardsProps) {
  return (
    <div
      className={cn("grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4", className)}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="bg-card border border-border rounded-2xl p-4 space-y-2 shadow-2xs"
          >
            <Icon className={cn("size-5", TONE_STYLES[item.tone])} />
            <h3 className="text-xs sm:text-sm font-bold text-foreground">
              {item.title}
            </h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

