"use client";

import { MessageSquare, Plus, SquarePen, Trash2 } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type { ProShopServiceItem } from "../types";

export interface ProShopServiceCardProps {
  service: ProShopServiceItem;
  onOpen: (service: ProShopServiceItem) => void;
  onEdit: (service: ProShopServiceItem) => void;
  onDelete: (service: ProShopServiceItem) => void;
}

export function ProShopServiceCard({
  service,
  onOpen,
  onEdit,
  onDelete,
}: ProShopServiceCardProps) {
  const isActive = service.status === "active";

  return (
    <article
      onClick={() => onOpen(service)}
      className={cn(
        "group rounded-2xl border border-border bg-card shadow-2xs overflow-hidden flex flex-col transition-all hover:shadow-md cursor-pointer",
        !isActive && "opacity-90"
      )}
    >
      <div className="relative aspect-[16/10] w-full bg-secondary overflow-hidden">
        <FallbackImage
          src={service.coverImageUrl}
          alt={service.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
            !isActive && "grayscale-[35%]"
          )}
        />

        <span
          className={cn(
            "absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs",
            isActive
              ? "bg-card/95 text-success"
              : "bg-card/95 text-muted-foreground"
          )}
        >
          {service.status === "active"
            ? "ACTIVE"
            : service.status === "draft"
              ? "DRAFT"
              : "INACTIVE"}
        </span>

        {isActive && (
          <span
            aria-hidden="true"
            className="absolute top-3 right-3 size-7 rounded-lg bg-card/95 text-foreground flex items-center justify-center shadow-xs"
          >
            <MessageSquare className="size-3.5" />
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-1.5">
          <h3 className="text-sm sm:text-base font-extrabold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {service.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {service.shortDescription}
          </p>
        </div>

        <div className="pt-3 border-t border-border/60 flex items-end justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              PRICE FROM
            </p>
            <p className="text-sm sm:text-base font-extrabold text-foreground">
              {service.priceFormatted}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              aria-label={`Edit ${service.title}`}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(service);
              }}
              className="size-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
            >
              <SquarePen className="size-3.5" />
            </button>

            <button
              type="button"
              aria-label={`Delete ${service.title}`}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(service);
              }}
              className="size-8 rounded-lg border border-border bg-card flex items-center justify-center text-error hover:bg-error-bg/60 transition-colors cursor-pointer"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export interface ProShopAddServiceTileProps {
  onClick: () => void;
}

export function ProShopAddServiceTile({ onClick }: ProShopAddServiceTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-[280px] rounded-2xl border-2 border-dashed border-border bg-secondary/20 hover:bg-secondary/40 hover:border-primary/40 transition-all p-6 flex flex-col items-center justify-center text-center gap-3 cursor-pointer"
    >
      <div className="size-11 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground shadow-2xs">
        <Plus className="size-5" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-bold text-foreground">Add New Service</p>
        <p className="text-xs text-muted-foreground">
          Create a new listing for your shop
        </p>
      </div>
    </button>
  );
}
