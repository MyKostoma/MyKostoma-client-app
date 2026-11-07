"use client";

import { ArrowLeft, Menu, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { cn } from "@/lib/utils";
import { useDashboardMobileMenu } from "@/providers/dashboard-top-bar-context";
import type { OrderDetailTopBarProps } from "../types";

export type { OrderDetailTopBarProps } from "../types";

export function OrderDetailTopBar({
  title,
  subtitle,
  status,
  statusCustomLabel,
  onBack,
  messageLabel = "Message Professional",
  onMessagePro,
  primaryActionLabel,
  onPrimaryAction,
  onMenuClick,
  className,
}: OrderDetailTopBarProps) {
  const contextMenuClick = useDashboardMobileMenu();
  const effectiveMenuClick = onMenuClick ?? contextMenuClick;

  return (
    <div
      className={cn(
        "h-16 px-4 md:px-6 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-xs select-none sticky top-0 z-20 shrink-0 gap-3",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        {effectiveMenuClick && (
          <button
            type="button"
            onClick={effectiveMenuClick}
            aria-label="Open mobile menu"
            className="lg:hidden p-2 -ml-1 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer shrink-0"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="size-4" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-foreground tracking-tight truncate">
              {title}
            </h1>
            <OrderStatusBadge
              status={status}
              customLabel={statusCustomLabel}
              className="hidden sm:inline-flex shrink-0"
            />
          </div>
          {subtitle && (
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2.5 shrink-0 ml-auto">
        {onMessagePro && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onMessagePro}
            leadingIcon={<MessageSquare className="size-3.5" />}
            className="h-9 px-3.5 rounded-lg text-xs font-semibold"
          >
            {messageLabel}
          </Button>
        )}

        {primaryActionLabel && onPrimaryAction && (
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onPrimaryAction}
            className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs"
          >
            {primaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

export default OrderDetailTopBar;

