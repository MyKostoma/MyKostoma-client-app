"use client";

import { cn } from "@/lib/utils";
import { ShopServiceCard } from "./shop-service-card";
import type { ShopServiceGridProps } from "./types";

export function ShopServiceGrid({
  services,
  savedServiceIds,
  actionIcon,
  columns = 4,
  onOpen,
  onToggleSave,
  className,
}: ShopServiceGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-stretch",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className
      )}
    >
      {services.map((service) => (
        <ShopServiceCard
          key={service.id}
          service={service}
          actionIcon={actionIcon}
          isSaved={savedServiceIds.includes(service.id)}
          onOpen={onOpen}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}

