"use client";

import Link from "next/link";
import {
  Check,
  ChevronRight,
  HelpCircle,
  Plus,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput, Select } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type { DisputesSettingsPanelProps, DisputeStatus } from "./types";

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "under-review", label: "Under Review" },
  { value: "open", label: "Open" },
  { value: "resolved", label: "Resolved" },
];

const DATE_RANGE_OPTIONS = [
  { value: "all", label: "All Time" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

function DisputeStatusBadge({ status }: { status: DisputeStatus }) {
  if (status === "open") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-foreground text-background text-[11px] font-bold">
        <span className="size-1.5 rounded-full bg-background" />
        <span>Open</span>
      </span>
    );
  }
  if (status === "resolved") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-border bg-secondary/45 text-muted-foreground text-[11px] font-semibold">
        <Check className="size-3 shrink-0" />
        <span>Resolved</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary text-foreground text-[11px] font-semibold">
      <span className="size-1.5 rounded-full bg-muted-foreground" />
      <span>Under Review</span>
    </span>
  );
}

export function DisputesSettingsPanel({
  disputes,
  totalDisputesCount,
  searchQuery,
  statusFilter,
  dateRangeFilter,
  currentPage,
  totalPages,
  onSearchChange,
  onStatusFilterChange,
  onDateRangeFilterChange,
  onPageChange,
  onStartDispute,
  onViewDisputeDetail,
  onOpenHelpCenter,
  onReadDisputePolicies,
}: DisputesSettingsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Link href="/settings" className="hover:text-foreground">
              Support
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="font-semibold text-foreground">Disputes</span>
          </nav>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Disputes
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            View and manage your active and past disputes related to
            transactions or service quality.
          </p>
        </div>

        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={onStartDispute}
          leadingIcon={<Plus className="size-4" />}
          className="h-9 px-4 rounded-xl text-xs font-bold shadow-xs shrink-0 self-start sm:self-center"
        >
          Start New Dispute
        </Button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="w-full sm:w-72">
          <SearchInput
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search dispute ID or transaction..."
            className="h-9 text-xs bg-card"
          />
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="w-36">
            <Select
              value={statusFilter}
              onChange={(value) =>
                onStatusFilterChange(value as "all" | DisputeStatus)
              }
              options={STATUS_FILTER_OPTIONS}
            />
          </div>

          <div className="w-36">
            <Select
              value={dateRangeFilter}
              onChange={(value) =>
                onDateRangeFilterChange(value as "all" | "30d" | "90d")
              }
              options={DATE_RANGE_OPTIONS}
            />
          </div>
        </div>
      </div>

      {/* Disputes Table / Empty State */}
      <div className="rounded-2xl border border-border bg-card shadow-2xs overflow-hidden">
        {disputes.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <p className="text-sm font-bold text-foreground">
              No matching disputes found
            </p>
            <p className="text-xs text-muted-foreground">
              Adjust your search filters or initiate a new dispute if you need
              escrow resolution support.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-3.5 px-5">DISPUTE ID</th>
                  <th className="py-3.5 px-4">RELATED TRANSACTION</th>
                  <th className="py-3.5 px-4">DATE INITIATED</th>
                  <th className="py-3.5 px-4">STATUS</th>
                  <th className="py-3.5 px-5 text-right">ACTION</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/80 text-xs">
                {disputes.map((dispute) => (
                  <tr key={dispute.id} className="hover:bg-secondary/20">
                    <td className="py-4 px-5 font-extrabold text-foreground whitespace-nowrap">
                      {dispute.code}
                    </td>

                    <td className="py-4 px-4 min-w-52">
                      <p className="font-bold text-foreground">
                        {dispute.transactionTitle}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {dispute.transactionRef}
                      </p>
                    </td>

                    <td className="py-4 px-4 text-muted-foreground whitespace-nowrap">
                      {dispute.dateInitiatedLabel}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <DisputeStatusBadge status={dispute.status} />
                    </td>

                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onViewDisputeDetail(dispute)}
                        className="text-xs font-bold text-primary hover:underline cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Pagination */}
        <div className="px-5 py-3.5 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs">
          <p className="text-muted-foreground">
            Showing {disputes.length} of {totalDisputesCount} disputes
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className="h-8 px-3 rounded-lg text-xs font-semibold"
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              className="h-8 px-3 rounded-lg text-xs font-semibold"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Dark Help Banner */}
      <div className="rounded-2xl bg-foreground text-background p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="size-10 rounded-xl bg-background/15 flex items-center justify-center shrink-0">
            <Shield className="size-5" />
          </div>
          <div className="min-w-0 space-y-0.5">
            <p className="text-sm font-extrabold">
              Need help with a transaction?
            </p>
            <p className="text-xs text-background/75">
              Visit our Resolution Center to learn about our buyer and seller
              protection policies.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onOpenHelpCenter}
          className="h-9 px-4 rounded-lg text-xs font-bold bg-card text-foreground border-border hover:bg-secondary shrink-0"
        >
          Go to Help Center
        </Button>
      </div>

      {/* Process Info */}
      <div className="flex items-start gap-3 pt-1">
        <HelpCircle className="size-4 text-muted-foreground shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <p className="font-bold text-foreground">
            Dispute Process Information
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Most disputes are resolved within 5–10 business days. Our
            arbitration team may contact you for additional evidence. Keep all
            communication within the MyKostoma messaging system to ensure your
            case is protected.
          </p>
          <button
            type="button"
            onClick={onReadDisputePolicies}
            className="font-bold text-foreground underline underline-offset-4 hover:text-primary cursor-pointer"
          >
            Read more about our dispute policies.
          </button>
        </div>
      </div>
    </div>
  );
}
