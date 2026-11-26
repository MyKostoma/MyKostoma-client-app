"use client";

import Link from "next/link";
import { ArrowLeft, Menu, MessageSquare, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser, selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import { cn } from "@/lib/utils";
import { useDashboardMobileMenu } from "@/providers/dashboard-top-bar-context";
import type { DisputesTopBarProps } from "../types";

export type { DisputesTopBarProps } from "../types";

export function DisputesTopBar({
  title = "Disputes",
  backHref,
  backLabel = "Back to Disputes",
  onRaiseDispute,
  onMessageAdmin,
  onAddEvidence,
  isResolved = false,
  onMenuClick,
  className,
}: DisputesTopBarProps) {
  const contextMenuClick = useDashboardMobileMenu();
  const effectiveMenuClick = onMenuClick ?? contextMenuClick;

  const currentUser = useAppSelector(selectCurrentUser);
  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const effectiveRole = userRole || activePerspective || "consumer";

  const displayName =
    currentUser?.fullName ||
    (currentUser?.firstName
      ? `${currentUser.firstName} ${currentUser.lastName || ""}`.trim()
      : "") ||
    (effectiveRole === "professional" ? "Alex Rivera" : "Sarah Jenkins");

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
            <Menu className="size-5" />
          </button>
        )}

        {backHref && (
          <Link
            href={backHref}
            aria-label={backLabel}
            className="hidden sm:inline-flex items-center justify-center size-8 rounded-lg border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <ArrowLeft className="size-4" />
          </Link>
        )}

        <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-foreground truncate">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 ml-auto">
        {onRaiseDispute && (
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onRaiseDispute}
            leadingIcon={<Plus className="size-4" />}
            className="hidden sm:inline-flex h-9 px-4 rounded-xl text-xs font-semibold"
          >
            Raise Dispute
          </Button>
        )}

        {onMessageAdmin && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onMessageAdmin}
            leadingIcon={<MessageSquare className="size-3.5" />}
            className="hidden sm:inline-flex h-9 px-3.5 rounded-xl text-xs font-semibold"
          >
            Message Admin
          </Button>
        )}

        {onAddEvidence && !isResolved && (
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onAddEvidence}
            leadingIcon={<Upload className="size-3.5" />}
            className="hidden sm:inline-flex h-9 px-4 rounded-xl text-xs font-semibold"
          >
            Add Evidence
          </Button>
        )}

        <Link
          href="/profile"
          aria-label={`${displayName} profile`}
          className="hidden md:inline-flex items-center gap-2 pl-2.5 pr-1.5 py-1 rounded-full border border-border bg-secondary/40 hover:bg-secondary/80 transition-colors"
        >
          <span className="text-xs font-semibold text-foreground truncate max-w-28">
            {displayName}
          </span>
          <FallbackImage
            src={currentUser?.avatarUrl}
            alt={displayName}
            fallbackType="user"
            variant="avatar"
            className="size-7 rounded-full object-cover border border-border bg-card shrink-0"
          />
        </Link>
      </div>
    </div>
  );
}

export default DisputesTopBar;
