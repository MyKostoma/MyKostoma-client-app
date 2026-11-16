"use client";

import { BadgeCheck, Bookmark, Building2, Check, Plus, Star } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import { formatDelivery, formatNaira } from "@/features/shop/services/shopHelpers";
import type { ShopBadgeVariant, ShopServiceCardProps } from "./types";

const BADGE_ICON_STYLES: Record<ShopBadgeVariant, string> = {
  verified: "text-warning",
  corporate: "text-info",
  "top-rated": "text-info",
};

function ShopServiceBadge({
  text,
  variant,
}: {
  text: string;
  variant: ShopBadgeVariant;
}) {
  const Icon = variant === "corporate" ? Building2 : BadgeCheck;

  return (
    <div
      className={cn(
        "absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-card/95 backdrop-blur-xs",
        "text-[9px] font-bold uppercase tracking-wider shadow-xs select-none",
        variant === "top-rated" ? "text-info" : "text-foreground"
      )}
    >
      {variant !== "top-rated" && (
        <Icon className={cn("size-3.5 shrink-0", BADGE_ICON_STYLES[variant])} />
      )}
      <span>{text}</span>
    </div>
  );
}

export function ShopServiceCard({
  service,
  isSaved,
  actionIcon = "bookmark",
  onOpen,
  onToggleSave,
  className,
}: ShopServiceCardProps) {
  const ActionIcon =
    actionIcon === "plus" ? (isSaved ? Check : Plus) : Bookmark;

  return (
    <article
      className={cn(
        "group h-full bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-2xs hover:shadow-md transition-all duration-200",
        className
      )}
    >
      <div
        onClick={() => onOpen(service.id)}
        className="relative h-44 sm:h-48 w-full overflow-hidden bg-secondary shrink-0 cursor-pointer"
      >
        <FallbackImage
          src={service.imageUrl}
          alt={service.title}
          fallbackType="portfolio"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
        />

        {service.badgeText && service.badgeVariant && (
          <ShopServiceBadge
            text={service.badgeText}
            variant={service.badgeVariant}
          />
        )}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleSave(service.id);
          }}
          aria-label={isSaved ? `Unsave ${service.title}` : `Save ${service.title}`}
          aria-pressed={isSaved}
          className={cn(
            "absolute bottom-3 right-3 size-8 rounded-full shadow-md flex items-center justify-center transition-all active:scale-95 cursor-pointer",
            isSaved || actionIcon === "plus"
              ? "bg-primary hover:bg-primary-hover text-primary-foreground"
              : "bg-card/90 hover:bg-card text-muted-foreground hover:text-primary"
          )}
        >
          <ActionIcon
            className={cn(
              "size-4",
              actionIcon === "plus" && "stroke-[2.5]",
              actionIcon === "bookmark" && isSaved && "fill-current"
            )}
          />
        </button>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {service.tagLabel}
          </p>

          <h3
            onClick={() => onOpen(service.id)}
            className="text-sm sm:text-base font-bold text-foreground tracking-tight leading-snug line-clamp-2 cursor-pointer hover:text-primary transition-colors"
          >
            {service.title}
          </h3>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="size-6 rounded-full overflow-hidden bg-secondary shrink-0">
                <FallbackImage
                  src={service.provider.avatarUrl}
                  alt={service.provider.name}
                  variant="avatar"
                  fallbackType={service.provider.verified ? "user" : "general"}
                  className="size-full object-cover"
                />
              </div>
              <span className="text-xs font-medium text-foreground truncate">
                {service.provider.name}
              </span>
            </div>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-success-bg text-success text-[11px] font-bold shrink-0">
              {service.provider.rating.toFixed(1)}
              <Star className="size-2.5 fill-current text-warning" />
            </span>
          </div>
        </div>

        <div className="pt-3.5 border-t border-border/70 flex items-end justify-between gap-2">
          <div>
            <span className="block text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
              Starting at
            </span>
            <span className="text-sm sm:text-base font-bold text-foreground">
              {formatNaira(service.price)}
            </span>
          </div>

          <div className="text-right">
            <span className="block text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
              Delivery
            </span>
            <span className="text-xs font-bold text-foreground">
              {formatDelivery(service.deliveryDays)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

