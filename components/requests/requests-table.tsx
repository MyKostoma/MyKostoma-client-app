"use client";

import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RequestStatusBadge } from "./request-status-badge";
import type { ConsumerRequestItem, RequestTabFilter } from "./types";

export interface RequestTabOption {
  id: RequestTabFilter;
  label: string;
}

export const REQUEST_FILTER_TABS: RequestTabOption[] = [
  { id: "all", label: "All Requests" },
  { id: "open", label: "Open" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
  { id: "closed", label: "Closed" },
];

export interface RequestsFilterTabsProps {
  activeTab: RequestTabFilter;
  onTabChange: (tab: RequestTabFilter) => void;
  className?: string;
}

export function RequestsFilterTabs({
  activeTab,
  onTabChange,
  className,
}: RequestsFilterTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter requests by status"
      className={cn(
        "w-full border-b border-border flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar",
        className
      )}
    >
      {REQUEST_FILTER_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative pb-3.5 px-1 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap",
              isActive
                ? "text-primary font-bold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span>{tab.label}</span>
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export interface RequestsTableCardProps {
  requests: ConsumerRequestItem[];
  onViewDetails: (request: ConsumerRequestItem) => void;
  className?: string;
}

export function RequestsTableCard({
  requests,
  onViewDetails,
  className,
}: RequestsTableCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-border bg-card overflow-hidden shadow-2xs",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary/40 border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground select-none">
              <th className="py-3.5 px-5 sm:px-6">REQUEST TITLE</th>
              <th className="py-3.5 px-4">BUDGET</th>
              <th className="py-3.5 px-4">LOCATION</th>
              <th className="py-3.5 px-4">QUOTES</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-5 sm:px-6 text-right">ACTIONS</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border/70">
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 px-6 text-center text-xs sm:text-sm text-muted-foreground"
                >
                  No requests match your current filter.
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr
                  key={request.id}
                  className="hover:bg-secondary/25 transition-colors"
                >
                  <td className="py-4 px-5 sm:px-6 min-w-60">
                    <p className="text-xs sm:text-sm font-bold text-foreground tracking-tight">
                      {request.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {request.category} • {request.dateLabel}
                    </p>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-xs sm:text-sm font-bold text-foreground">
                      {request.budget}
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-xs text-muted-foreground">
                      {request.location}
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground text-[11px] font-semibold">
                      {request.quotesBadgeLabel}
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <RequestStatusBadge status={request.status} />
                  </td>

                  <td className="py-4 px-5 sm:px-6 text-right whitespace-nowrap">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(request)}
                      className="h-8 px-3.5 rounded-lg text-xs font-semibold"
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export interface RequestSupportHelpCardProps {
  onContactSupport?: () => void;
  className?: string;
}

export function RequestSupportHelpCard({
  onContactSupport,
  className,
}: RequestSupportHelpCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-dashed border-border bg-card/50 p-8 sm:p-12 flex flex-col items-center justify-center text-center",
        className
      )}
    >
      <div className="size-12 rounded-full bg-secondary text-muted-foreground flex items-center justify-center mb-4">
        <FileQuestion className="size-5" />
      </div>

      <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
        Need help with a request?
      </h3>

      <p className="text-xs text-muted-foreground max-w-md mt-1.5 leading-relaxed">
        If you&apos;re having trouble describing your project or finding the
        right professional, our support team is available 24/7.
      </p>

      <Button
        type="button"
        variant="default"
        size="sm"
        onClick={onContactSupport}
        className="h-10 px-6 rounded-lg text-xs font-semibold mt-5 shadow-xs"
      >
        Contact Support
      </Button>
    </div>
  );
}
