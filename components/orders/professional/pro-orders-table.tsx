"use client";

import { useCallback, useEffect, useRef } from "react";
import { Clock, Lock, Unlock, Wallet, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import type {
  ProfessionalOrderItem,
  ProfessionalOrderKpiCard,
  ProfessionalOrderStatus,
  ProfessionalOrderTabFilter,
} from "../types";

export interface ProOrderStatusPillProps {
  status: ProfessionalOrderStatus;
  variant?: "table" | "detail";
  className?: string;
}

export function ProOrderStatusPill({
  status,
  variant = "table",
  className,
}: ProOrderStatusPillProps) {
  if (status === "pending") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-warning-bg text-warning shrink-0",
          className
        )}
      >
        Pending
      </span>
    );
  }

  if (status === "in-progress") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0",
          variant === "detail"
            ? "bg-foreground text-background"
            : "bg-info-bg text-info",
          className
        )}
      >
        In Progress
      </span>
    );
  }

  if (status === "completed") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-success-bg text-success shrink-0",
          className
        )}
      >
        Completed
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-error-bg text-error shrink-0",
        className
      )}
    >
      Disputed
    </span>
  );
}

const PRO_ORDER_TABS: { id: ProfessionalOrderTabFilter; label: string }[] = [
  { id: "all", label: "All Orders" },
  { id: "pending", label: "Pending" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
  { id: "disputed", label: "Disputed" },
];

export interface ProOrdersFilterTabsProps {
  activeTab: ProfessionalOrderTabFilter;
  onTabChange: (tab: ProfessionalOrderTabFilter) => void;
  className?: string;
}

export function ProOrdersFilterTabs({
  activeTab,
  onTabChange,
  className,
}: ProOrdersFilterTabsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const scrollToTab = useCallback(
    (tabId: ProfessionalOrderTabFilter, smooth = true) => {
      const container = containerRef.current;
      const tabEl = tabRefs.current[tabId];
      if (!container || !tabEl) return;

      const scrollTarget =
        tabEl.offsetLeft - container.offsetWidth / 2 + tabEl.offsetWidth / 2;

      container.scrollTo({
        left: Math.max(0, scrollTarget),
        behavior: smooth ? "smooth" : "auto",
      });
    },
    []
  );

  useEffect(() => {
    const frameId = requestAnimationFrame(() => scrollToTab(activeTab, true));
    return () => cancelAnimationFrame(frameId);
  }, [activeTab, scrollToTab]);

  return (
    <div
      className={cn(
        "sticky top-0 sm:static z-20 py-1 sm:py-0 max-w-full",
        className
      )}
    >
      <div
        ref={containerRef}
        role="tablist"
        aria-label="Filter professional orders by status"
        className="inline-flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth p-1 rounded-xl bg-card border border-border shadow-2xs max-w-full"
      >
        {PRO_ORDER_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                onTabChange(tab.id);
                scrollToTab(tab.id, true);
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 select-none",
                isActive
                  ? "bg-foreground text-background shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export interface ProOrdersTableProps {
  orders: ProfessionalOrderItem[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onSelectOrder: (order: ProfessionalOrderItem) => void;
  onRowAction: (order: ProfessionalOrderItem) => void;
}

export function ProOrdersTable({
  orders,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  onSelectOrder,
  onRowAction,
}: ProOrdersTableProps) {
  const startItem = orders.length > 0 ? 1 : 0;
  const endItem = orders.length;

  return (
    <div className="rounded-2xl border border-border bg-card shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[820px]">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="py-3.5 px-5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                ORDER ID
              </th>
              <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                CONSUMER
              </th>
              <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                SERVICE
              </th>
              <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                AMOUNT
              </th>
              <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                STATUS
              </th>
              <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                ESCROW
              </th>
              <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                DATE
              </th>
              <th className="py-3.5 px-5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right">
                ACTIONS
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border/70">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-12 px-5 text-center text-xs sm:text-sm text-muted-foreground"
                >
                  No orders match your current filter.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const isReleased = order.escrowStatus === "released";
                const actionLabel =
                  order.status === "pending"
                    ? "Start Order"
                    : order.status === "in-progress"
                      ? "Mark Completed"
                      : order.status === "disputed"
                        ? "Review Case"
                        : "View Details";
                const isPrimaryAction =
                  order.status === "pending" || order.status === "in-progress";

                return (
                  <tr
                    key={order.id}
                    onClick={() => onSelectOrder(order)}
                    className="group hover:bg-secondary/35 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-5 text-xs font-bold text-foreground whitespace-nowrap group-hover:text-primary transition-colors">
                      #{order.code}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <FallbackImage
                          src={order.consumerAvatarUrl}
                          alt={order.consumerName}
                          variant="avatar"
                          className="size-7 text-[10px]"
                        />
                        <span className="text-xs font-semibold text-foreground">
                          {order.consumerName}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs text-muted-foreground font-medium">
                      {order.serviceTitle}
                    </td>

                    <td className="py-4 px-4 text-xs font-bold text-foreground whitespace-nowrap">
                      {order.tableAmount}
                    </td>

                    <td className="py-4 px-4">
                      <ProOrderStatusPill
                        status={order.status}
                        variant="table"
                      />
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 text-xs font-semibold",
                          isReleased ? "text-success" : "text-muted-foreground"
                        )}
                      >
                        {isReleased ? (
                          <Unlock className="size-3.5 text-success shrink-0" />
                        ) : (
                          <Lock className="size-3.5 text-muted-foreground shrink-0" />
                        )}
                        <span>{isReleased ? "Released" : "Held"}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 text-xs text-muted-foreground whitespace-nowrap">
                      {order.dateShort}
                    </td>

                    <td className="py-4 px-5 text-right">
                      <Button
                        type="button"
                        variant={isPrimaryAction ? "default" : "outline"}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowAction(order);
                        }}
                        className="h-8 px-3 rounded-lg text-[11px] font-bold whitespace-nowrap"
                      >
                        {actionLabel}
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3.5 border-t border-border/70 bg-secondary/20 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Showing{" "}
          <strong className="font-bold text-foreground">
            {startItem}-{endItem}
          </strong>{" "}
          of <strong className="font-bold text-foreground">{totalCount}</strong>{" "}
          orders
        </p>

        <Pagination className="w-auto mx-0 justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={currentPage <= 1}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                disabled={currentPage >= totalPages}
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export interface ProOrdersKpiRowProps {
  metrics: ProfessionalOrderKpiCard[];
}

export function ProOrdersKpiRow({ metrics }: ProOrdersKpiRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {metrics.map((card) => (
        <div
          key={card.id}
          className="rounded-2xl border border-border bg-card p-5 shadow-2xs flex items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {card.label}
            </p>
            <p className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              {card.value}
            </p>
          </div>

          <div
            className={cn(
              "size-10 rounded-full flex items-center justify-center shrink-0",
              card.iconType === "wallet" && "bg-secondary text-foreground",
              card.iconType === "clock" && "bg-accent text-primary",
              card.iconType === "zap" && "bg-success-bg text-success"
            )}
          >
            {card.iconType === "wallet" && <Wallet className="size-4" />}
            {card.iconType === "clock" && <Clock className="size-4" />}
            {card.iconType === "zap" && <Zap className="size-4" />}
          </div>
        </div>
      ))}
    </div>
  );
}
