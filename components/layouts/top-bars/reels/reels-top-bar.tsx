"use client";

import { Clapperboard, Compass, Menu, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import { useDashboardMobileMenu } from "@/providers/dashboard-top-bar-context";
import type { ReelsTopBarProps } from "../types";

export type { ReelsTopBarProps } from "../types";

export function ReelsTopBar({
  title,
  isProfessional,
  viewMode,
  searchQuery,
  onSearchChange,
  mobileSearchOpen = false,
  onToggleMobileSearch,
  onViewModeChange,
  onUploadClick,
  onMenuClick,
  className,
}: ReelsTopBarProps) {
  const contextMenuClick = useDashboardMobileMenu();
  const effectiveMenuClick = onMenuClick ?? contextMenuClick;

  const resolvedTitle =
    title ?? (isProfessional && viewMode === "my-reels" ? "My Reels" : "Reels");

  const isStudioMode = isProfessional && viewMode === "my-reels";

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

        <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-foreground truncate">
          {resolvedTitle}
        </h1>
      </div>

      {/* Mobile Compact Header Actions */}
      <div className="flex md:hidden items-center gap-2 shrink-0 ml-auto">
        {onToggleMobileSearch && (
          <button
            type="button"
            onClick={onToggleMobileSearch}
            aria-label={mobileSearchOpen ? "Close search" : "Search reels"}
            aria-expanded={mobileSearchOpen}
            className={cn(
              "size-9 rounded-xl border border-border flex items-center justify-center transition-colors cursor-pointer",
              mobileSearchOpen || searchQuery.trim()
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            {mobileSearchOpen ? (
              <X className="size-4" />
            ) : (
              <Search className="size-4" />
            )}
          </button>
        )}

        {isProfessional && onUploadClick && (
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onUploadClick}
            leadingIcon={<Plus className="size-3.5" />}
            className="h-9 px-3 rounded-xl text-xs font-bold shadow-xs shrink-0"
          >
            Upload
          </Button>
        )}
      </div>

      {/* Desktop Header Controls */}
      <div className="hidden md:flex items-center gap-2.5 lg:gap-3 shrink-0 ml-auto">
        <div className="w-52 lg:w-64">
          <SearchInput
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              isStudioMode
                ? "Search your reels..."
                : "Search reels, creators, #tags..."
            }
            className="h-9 text-xs bg-secondary/40"
          />
        </div>

        {isProfessional && onViewModeChange && (
          <div className="inline-flex items-center p-1 rounded-xl border border-border bg-secondary/50 shrink-0">
            <button
              type="button"
              onClick={() => onViewModeChange("my-reels")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
                isStudioMode
                  ? "bg-card text-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Clapperboard className="size-3.5" />
              <span>My Reels</span>
            </button>

            <button
              type="button"
              onClick={() => onViewModeChange("discover")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
                !isStudioMode
                  ? "bg-card text-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Compass className="size-3.5" />
              <span>Feed</span>
            </button>
          </div>
        )}

        {isProfessional && onUploadClick && (
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onUploadClick}
            leadingIcon={<Plus className="size-4" />}
            className="h-9 px-4 rounded-xl text-xs font-bold shadow-xs shrink-0"
          >
            Upload Reel
          </Button>
        )}
      </div>
    </div>
  );
}

export default ReelsTopBar;
