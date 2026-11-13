"use client";

import { Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDashboardMobileMenu } from "@/providers/dashboard-top-bar-context";

export interface MessagesTopBarProps {
  onNewConversation: () => void;
  disabled?: boolean;
  onMenuClick?: () => void;
  className?: string;
}

export function MessagesTopBar({
  onNewConversation,
  disabled = false,
  onMenuClick,
  className,
}: MessagesTopBarProps) {
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

        <h1 className="text-base sm:text-lg font-bold tracking-tight text-foreground truncate">
          Messages
        </h1>
      </div>

      <div className="hidden sm:flex items-center gap-2.5 shrink-0 ml-auto">
        <Button
          type="button"
          variant={disabled ? "outline" : "default"}
          size="sm"
          disabled={disabled}
          onClick={onNewConversation}
          leadingIcon={<Plus className="size-4" />}
          className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs shrink-0"
        >
          New Conversation
        </Button>
      </div>
    </div>
  );
}

export default MessagesTopBar;

