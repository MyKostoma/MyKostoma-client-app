import Link from "next/link";
import { BellOff, Archive, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NotificationsEmptyStateProps } from "./types";

export function NotificationsEmptyState({
  activeTab,
  onActionClick,
  className,
}: NotificationsEmptyStateProps) {
  const getEmptyConfig = () => {
    switch (activeTab) {
      case "unread":
        return {
          icon: <CheckCheck className="size-9 stroke-[1.5] text-muted-foreground/80" />,
          title: "All caught up",
          description:
            "You don't have any unread notifications right now. Check the 'All Notifications' tab to view past activity.",
          buttonLabel: null,
          buttonHref: null,
        };
      case "archive":
        return {
          icon: <Archive className="size-9 stroke-[1.5] text-muted-foreground/80" />,
          title: "No archived notifications",
          description:
            "Notifications you archive will appear here for your records.",
          buttonLabel: null,
          buttonHref: null,
        };
      case "all":
      default:
        return {
          icon: <BellOff className="size-9 stroke-[1.5] text-muted-foreground/80" />,
          title: "No notifications yet",
          description:
            "We'll notify you when something important happens,\nlike a new quote, message, or project update.",
          buttonLabel: "Explore Services",
          buttonHref: "/search",
        };
    }
  };

  const config = getEmptyConfig();

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-10 sm:p-16 flex flex-col items-center justify-center text-center min-h-[420px] select-none",
        className
      )}
    >
      <div className="size-20 rounded-full bg-secondary/80 flex items-center justify-center mb-5 shrink-0">
        {config.icon}
      </div>

      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
        {config.title}
      </h3>

      <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mt-2 leading-relaxed whitespace-pre-line">
        {config.description}
      </p>

      {config.buttonLabel && config.buttonHref && (
        <Button
          asChild
          onClick={onActionClick}
          className="mt-6 h-10 px-6 rounded-xl font-semibold bg-primary hover:bg-primary-hover text-primary-foreground shadow-xs cursor-pointer"
        >
          <Link href={config.buttonHref}>{config.buttonLabel}</Link>
        </Button>
      )}
    </div>
  );
}

export default NotificationsEmptyState;
