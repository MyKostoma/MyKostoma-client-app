"use client";

import Link from "next/link";
import { Bell, Menu } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { useDashboardMobileMenu } from "@/providers/dashboard-top-bar-context";

export interface ProfessionalRequestsBreadcrumbItem {
  label: string;
  href?: string;
}

export interface ProfessionalRequestsTopBarProps {
  breadcrumbs: ProfessionalRequestsBreadcrumbItem[];
  showVerifiedProBadge?: boolean;
  onMenuClick?: () => void;
  className?: string;
}

export function ProfessionalRequestsTopBar({
  breadcrumbs,
  showVerifiedProBadge = true,
  onMenuClick,
  className,
}: ProfessionalRequestsTopBarProps) {
  const contextMenuClick = useDashboardMobileMenu();
  const effectiveMenuClick = onMenuClick ?? contextMenuClick;
  const user = useAppSelector(selectCurrentUser);

  const displayName =
    user?.fullName ||
    (user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "") ||
    "Alex Rivera";

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

        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm min-w-0 overflow-hidden"
        >
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <div
                key={`${crumb.label}-${idx}`}
                className="flex items-center gap-1.5 sm:gap-2 min-w-0"
              >
                {idx > 0 && (
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground/60 shrink-0"
                  >
                    /
                  </span>
                )}
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="text-muted-foreground hover:text-foreground transition-colors truncate"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      "truncate",
                      isLast
                        ? "font-bold text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {crumb.label}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-auto">
        {showVerifiedProBadge && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/70 border border-border/70 text-[10px] font-bold uppercase tracking-wider text-foreground shrink-0">
            <span className="size-1.5 rounded-full bg-success" />
            VERIFIED PRO
          </span>
        )}

        <Link
          href="/notifications"
          aria-label="Notifications"
          className="size-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors shrink-0"
        >
          <Bell className="size-4" />
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-2.5 hover:opacity-90 transition-opacity shrink-0"
        >
          <FallbackImage
            src={user?.avatarUrl}
            alt={displayName}
            variant="avatar"
            className="size-8 text-xs"
          />
          <span className="hidden md:inline text-xs font-bold text-foreground">
            {displayName}
          </span>
        </Link>
      </div>
    </div>
  );
}
