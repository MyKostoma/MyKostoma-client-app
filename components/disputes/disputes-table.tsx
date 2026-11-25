"use client";

import Link from "next/link";
import { Archive, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import {
  getCounterpartyDisplay,
  getDisputeStatusMeta,
} from "@/features/disputes/services/disputesHelpers";
import type { DisputesTableProps } from "./types";

export function DisputesTable({
  disputes,
  totalCount,
  currentPage,
  totalPages,
  pageSize,
  isProfessional,
  onPageChange,
  onArchiveDispute,
  onRestoreDispute,
}: DisputesTableProps) {
  const startIdx = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIdx = Math.min(totalCount, currentPage * pageSize);

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/35 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <th className="py-3.5 px-5">Dispute ID</th>
              <th className="py-3.5 px-4">Related Order</th>
              <th className="py-3.5 px-4">Party Involved</th>
              <th className="py-3.5 px-4">Date Raised</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-5 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {disputes.map((item) => {
              const statusMeta = getDisputeStatusMeta(item.status);
              const party = getCounterpartyDisplay(item, isProfessional);
              const isMutedRow =
                item.status === "resolved" || item.status === "archived";

              return (
                <tr
                  key={item.id}
                  className={cn(
                    "transition-colors hover:bg-secondary/30",
                    isMutedRow && "opacity-85"
                  )}
                >
                  <td className="py-4 px-5 align-middle whitespace-nowrap">
                    <Link
                      href={`/disputes/${item.id}`}
                      className={cn(
                        "text-sm font-bold hover:text-primary transition-colors",
                        isMutedRow ? "text-muted-foreground" : "text-foreground"
                      )}
                    >
                      {item.code}
                    </Link>
                  </td>

                  <td className="py-4 px-4 align-middle">
                    <div className="flex flex-col">
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          isMutedRow
                            ? "text-muted-foreground"
                            : "text-foreground"
                        )}
                      >
                        {item.orderCode}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.serviceTitle}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center gap-3">
                      <FallbackImage
                        src={party.avatarUrl}
                        alt={party.name}
                        fallbackType="user"
                        variant="avatar"
                        className="size-8 rounded-full object-cover border border-border bg-secondary shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span
                          className={cn(
                            "text-sm font-semibold truncate",
                            isMutedRow
                              ? "text-muted-foreground"
                              : "text-foreground"
                          )}
                        >
                          {party.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {party.roleLabel}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 align-middle whitespace-nowrap text-xs font-medium text-muted-foreground">
                    {item.dateRaisedLabel}
                  </td>

                  <td className="py-4 px-4 align-middle whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
                        statusMeta.badgeClass
                      )}
                    >
                      {statusMeta.isResolvedCheck ? (
                        <Check className="size-3 stroke-[2.5]" />
                      ) : (
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            statusMeta.dotClass
                          )}
                        />
                      )}
                      <span>{statusMeta.label}</span>
                    </span>
                  </td>

                  <td className="py-4 px-5 align-middle text-right whitespace-nowrap">
                    <div className="inline-flex items-center justify-end gap-3">
                      {item.status === "resolved" && (
                        <button
                          type="button"
                          onClick={() => onArchiveDispute(item.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <Archive className="size-3.5" />
                          <span>Archive</span>
                        </button>
                      )}
                      {item.status === "archived" && (
                        <button
                          type="button"
                          onClick={() => onRestoreDispute(item.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <RotateCcw className="size-3.5" />
                          <span>Restore</span>
                        </button>
                      )}
                      <Link
                        href={`/disputes/${item.id}`}
                        className="text-xs font-bold text-foreground hover:text-primary transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border">
        {disputes.map((item) => {
          const statusMeta = getDisputeStatusMeta(item.status);
          const party = getCounterpartyDisplay(item, isProfessional);

          return (
            <div key={item.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link
                    href={`/disputes/${item.id}`}
                    className="text-sm font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {item.code}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.orderCode} • {item.serviceTitle}
                  </p>
                </div>

                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0",
                    statusMeta.badgeClass
                  )}
                >
                  {statusMeta.isResolvedCheck ? (
                    <Check className="size-3 stroke-[2.5]" />
                  ) : (
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        statusMeta.dotClass
                      )}
                    />
                  )}
                  <span>{statusMeta.label}</span>
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FallbackImage
                    src={party.avatarUrl}
                    alt={party.name}
                    fallbackType="user"
                    variant="avatar"
                    className="size-7 rounded-full object-cover border border-border bg-secondary shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {party.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {party.roleLabel} • {item.dateRaisedLabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {item.status === "resolved" && (
                    <button
                      type="button"
                      onClick={() => onArchiveDispute(item.id)}
                      className="text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      Archive
                    </button>
                  )}
                  <Link
                    href={`/disputes/${item.id}`}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Footer */}
      <div className="px-5 py-3.5 border-t border-border bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {startIdx}-{endIdx}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">{totalCount}</span>{" "}
          disputes
        </p>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="h-8 px-3 rounded-lg text-xs font-semibold"
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="h-8 px-3 rounded-lg text-xs font-semibold"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
