"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";
import type { ConsumerCategoryItem } from "./types";

export interface ServiceCategoryCardProps {
  item: ConsumerCategoryItem;
  className?: string;
}

export function ServiceCategoryCard({
  item,
  className,
}: ServiceCategoryCardProps) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={() => item.onClick?.(item.id)}
      className={cn(
        "group w-full rounded-2xl bg-card hover:bg-accent/40 border border-border hover:border-primary/30 p-5 sm:p-6",
        "flex flex-col items-center justify-center text-center transition-all duration-150 cursor-pointer",
        "shadow-2xs hover:shadow-xs active:scale-[0.98]",
        className
      )}
    >
      <div className="size-12 rounded-full bg-secondary group-hover:bg-accent text-muted-foreground group-hover:text-primary flex items-center justify-center mb-3.5 transition-colors">
        <Icon className="size-5" />
      </div>

      <span className="text-xs sm:text-sm font-bold text-foreground tracking-tight">
        {item.name}
      </span>

      <span className="text-[11px] text-muted-foreground mt-1">
        {item.countLabel}
      </span>
    </button>
  );
}

export interface ServiceCategoriesSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
  categories: ConsumerCategoryItem[];
}

export function ServiceCategoriesSection({
  title = "Service Categories",
  subtitle = "Browse top professionals by their specialized service area.",
  actionLabel = "View all 24 categories",
  actionHref,
  onActionClick,
  categories,
  className,
  ...props
}: ServiceCategoriesSectionProps) {
  return (
    <section className={cn("w-full space-y-6", className)} {...props}>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        actionLabel={actionLabel}
        actionHref={actionHref}
        onActionClick={onActionClick}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <ServiceCategoryCard key={category.id} item={category} />
        ))}
      </div>
    </section>
  );
}
