"use client";

import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SearchProfessionalItem } from "./types";

export interface SearchResultHorizontalCardProps {
  professional: SearchProfessionalItem;
  onViewDetails?: (id: string) => void;
  className?: string;
}

export function SearchResultHorizontalCard({
  professional: pro,
  onViewDetails,
  className,
}: SearchResultHorizontalCardProps) {
  const isCompany = pro.verification === "company";

  return (
    <article
      className={cn(
        "group bg-card border border-border rounded-2xl overflow-hidden flex flex-col sm:flex-row shadow-2xs hover:shadow-md transition-all duration-200",
        className
      )}
    >
      <div className="relative w-full sm:w-44 md:w-48 h-48 sm:h-auto shrink-0 overflow-hidden bg-secondary">
        <img
          src={pro.imageUrl}
          alt={pro.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
        />
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-foreground tracking-tight leading-snug">
              {pro.name}
            </h3>

            <span
              title={isCompany ? "Company Verified" : "Individual Verified"}
              className={cn(
                "size-4.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-primary-foreground shadow-2xs",
                isCompany ? "bg-info" : "bg-warning"
              )}
            >
              <Check className="size-2.5 stroke-[3]" />
            </span>
          </div>

          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {pro.subtitle}
          </p>
        </div>

        <div className="pt-2.5 border-t border-border/60 space-y-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center gap-1 font-bold text-foreground">
              <Star className="size-3.5 text-warning fill-warning shrink-0" />
              {pro.rating.toFixed(1)}
            </span>
            <span className="text-border select-none">•</span>
            <span className="text-muted-foreground truncate">
              {pro.location}
            </span>
          </div>

          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onViewDetails?.(pro.id)}
            className="w-full h-9 text-xs font-semibold rounded-lg"
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
