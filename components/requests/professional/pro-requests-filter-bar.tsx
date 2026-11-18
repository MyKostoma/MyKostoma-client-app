"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PRO_REQUEST_BUDGET_OPTIONS,
  PRO_REQUEST_CATEGORY_OPTIONS,
  PRO_REQUEST_LOCATION_OPTIONS,
} from "@/features/requests/data";
import type { ProfessionalRequestsFilterState } from "../types";

export interface ProRequestsFilterBarProps {
  filters: ProfessionalRequestsFilterState;
  onChange: (filters: ProfessionalRequestsFilterState) => void;
  onApply: () => void;
  onReset: () => void;
  onLearnMoreVerification: () => void;
}

export function ProRequestsFilterBar({
  filters,
  onChange,
  onApply,
  onReset,
  onLearnMoreVerification,
}: ProRequestsFilterBarProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Open Requests
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Review and respond to client requests matching your expertise.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card px-4 sm:px-5 py-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="size-9 rounded-lg border border-border bg-secondary/40 flex items-center justify-center text-muted-foreground shrink-0">
            <HelpCircle className="size-4" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-foreground">
              Verification Active
            </p>
            <p className="text-[11px] sm:text-xs text-muted-foreground">
              Your profile is verified. You have full access to high-budget
              requests.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLearnMoreVerification}
          className="text-xs font-semibold text-primary underline underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer shrink-0 self-end sm:self-center"
        >
          Learn More
        </button>
      </div>

      <div className="space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
          <div className="lg:col-span-3 space-y-1.5">
            <label
              htmlFor="pro-req-category"
              className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
            >
              CATEGORY
            </label>
            <div className="relative">
              <select
                id="pro-req-category"
                value={filters.category}
                onChange={(e) =>
                  onChange({ ...filters, category: e.target.value })
                }
                className="w-full h-10 pl-3.5 pr-9 rounded-lg border border-border bg-card text-xs font-medium text-foreground appearance-none outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                {PRO_REQUEST_CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="size-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-1.5">
            <label
              htmlFor="pro-req-budget"
              className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
            >
              BUDGET RANGE
            </label>
            <div className="relative">
              <select
                id="pro-req-budget"
                value={filters.budgetRange}
                onChange={(e) =>
                  onChange({ ...filters, budgetRange: e.target.value })
                }
                className="w-full h-10 pl-3.5 pr-9 rounded-lg border border-border bg-card text-xs font-medium text-foreground appearance-none outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                {PRO_REQUEST_BUDGET_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="size-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-1.5">
            <label
              htmlFor="pro-req-location"
              className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
            >
              LOCATION
            </label>
            <div className="relative">
              <select
                id="pro-req-location"
                value={filters.location}
                onChange={(e) =>
                  onChange({ ...filters, location: e.target.value })
                }
                className="w-full h-10 pl-3.5 pr-9 rounded-lg border border-border bg-card text-xs font-medium text-foreground appearance-none outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                {PRO_REQUEST_LOCATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="size-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="lg:col-span-3">
            <Button
              type="button"
              variant="default"
              onClick={onApply}
              className="w-full h-10 rounded-lg text-xs font-semibold shadow-xs"
            >
              Apply Filters
            </Button>
          </div>
        </div>

        <div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onReset}
            className="h-8 px-4 rounded-lg text-xs font-medium"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
