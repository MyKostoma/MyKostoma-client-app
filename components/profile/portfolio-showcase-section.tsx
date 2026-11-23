"use client";

import { ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/consumer-home/section-header";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type { PortfolioShowcaseSectionProps } from "./types";

export type { PortfolioShowcaseSectionProps } from "./types";

export function PortfolioShowcaseSection({
  title = "Portfolio Showcase",
  actionLabel = "VIEW ALL PROJECTS",
  isOwner = false,
  items,
  onViewAllClick,
  onAddProjectClick,
  onItemClick,
  className,
  ...props
}: PortfolioShowcaseSectionProps) {
  return (
    <section
      id="portfolio"
      className={cn("w-full space-y-5 scroll-mt-32 sm:scroll-mt-36", className)}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeader title={title} />

        <div className="flex items-center gap-3">
          {isOwner && onAddProjectClick && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onAddProjectClick}
              leadingIcon={<Plus className="size-3.5" />}
              className="h-8 px-3 rounded-lg text-[11px] font-semibold"
            >
              Add Project
            </Button>
          )}

          {actionLabel && (
            <button
              type="button"
              onClick={onViewAllClick}
              className="group inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors shrink-0 cursor-pointer"
            >
              <span>{actionLabel}</span>
              <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {items.map((item) => (
          <article
            key={item.id}
            onClick={() => onItemClick?.(item)}
            className="group relative rounded-2xl overflow-hidden border border-border bg-secondary aspect-4/3 shadow-2xs hover:shadow-md transition-all cursor-pointer"
          >
            <FallbackImage
              src={item.imageUrl}
              alt={item.title}
              fallbackType="portfolio"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
            />

            <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/75 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground/80">
                {item.category}
              </p>
              <h3 className="text-xs sm:text-sm font-bold text-primary-foreground tracking-tight mt-0.5">
                {item.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
