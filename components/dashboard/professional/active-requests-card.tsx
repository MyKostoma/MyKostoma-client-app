"use client";

import Link from "next/link";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type { ActiveRequestStatus } from "@/features/professional-dashboard/types";
import type { ActiveRequestsCardProps } from "./types";

const REQUEST_STATUS_MAP: Record<
  ActiveRequestStatus,
  { label: string; badgeClass: string }
> = {
  "new-request": {
    label: "NEW REQUEST",
    badgeClass: "bg-info-bg text-info border-info/20",
  },
  "in-discussion": {
    label: "IN DISCUSSION",
    badgeClass: "bg-warning-bg text-warning border-warning/20",
  },
  quoted: {
    label: "QUOTED",
    badgeClass: "bg-success-bg text-success border-success/20",
  },
};

export function ActiveRequestsCard({ requests }: ActiveRequestsCardProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-1 h-5 rounded-full bg-primary" />
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
            Active Requests
          </h3>
        </div>

        <Link
          href="/requests"
          className="text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="space-y-3">
        {requests.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-sm font-semibold text-foreground">
              No active requests
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              New client service requests will appear here.
            </p>
          </div>
        ) : (
          requests.map((request) => {
            const statusCfg = REQUEST_STATUS_MAP[request.status];

            return (
              <Link
                key={request.id}
                href={request.href}
                className="group rounded-2xl border border-border bg-card p-4 sm:p-5 flex items-center justify-between gap-4 shadow-2xs hover:border-primary/40 hover:shadow-xs transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <FallbackImage
                    src={request.clientAvatarUrl}
                    alt={request.clientName}
                    fallbackType="user"
                    variant="avatar"
                    className="size-11 rounded-full object-cover border border-border shrink-0"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                      {request.clientName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {request.projectTitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border",
                      statusCfg.badgeClass
                    )}
                  >
                    {statusCfg.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {request.timeAgo}
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}
