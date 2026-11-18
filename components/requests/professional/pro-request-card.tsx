"use client";

import { Briefcase, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProfessionalRequestItem } from "../types";

export interface ProRequestCardProps {
  request: ProfessionalRequestItem;
  isSaved: boolean;
  onViewDetails: (request: ProfessionalRequestItem) => void;
  onToggleSave: (request: ProfessionalRequestItem) => void;
}

export function ProRequestCard({
  request,
  isSaved,
  onViewDetails,
  onToggleSave,
}: ProRequestCardProps) {
  return (
    <article className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-2xs hover:border-border/90 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-5">
      <div className="space-y-3 min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-secondary text-[10px] font-bold uppercase tracking-wider text-foreground">
            {request.category}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="size-3 shrink-0" />
            <span>{request.postedAgoLabel}</span>
          </span>
          {request.availabilityState === "quote-submitted" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent text-primary text-[10px] font-bold uppercase tracking-wider">
              <span className="size-1.5 rounded-full bg-primary" />
              Quote Submitted
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-foreground">
            {request.title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 max-w-3xl">
            {request.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs">
          <span className="font-bold text-foreground">
            {request.budgetLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground font-medium">
            <MapPin className="size-3.5 shrink-0" />
            <span>{request.location}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground font-medium">
            <Briefcase className="size-3.5 shrink-0" />
            <span>{request.engagementType}</span>
          </span>
        </div>
      </div>

      <div className="flex sm:flex-row md:flex-col items-stretch gap-2.5 shrink-0 md:w-36">
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={() => onViewDetails(request)}
          className="flex-1 md:flex-none h-9 rounded-lg text-xs font-semibold shadow-xs"
        >
          View Details
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onToggleSave(request)}
          className="flex-1 md:flex-none h-9 rounded-lg text-xs font-semibold"
        >
          {isSaved ? "Saved" : "Save Request"}
        </Button>
      </div>
    </article>
  );
}
