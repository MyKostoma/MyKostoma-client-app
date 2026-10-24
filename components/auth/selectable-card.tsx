"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectableCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  selected?: boolean;
  /** "row": icon + text side by side. "stack": centered icon above the label. */
  layout?: "row" | "stack";
  onSelect?: () => void;
}

/** Selectable tile used by the role picker and the category picker. */
export function SelectableCard({
  icon: Icon,
  title,
  description,
  selected = false,
  layout = "row",
  onSelect,
}: SelectableCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "rounded-lg border-2 bg-card text-left transition-all outline-none cursor-pointer",
        "focus-visible:ring-4 focus-visible:ring-ring/25",
        selected
          ? "border-foreground"
          : "border-border hover:border-muted-foreground/40",
        layout === "row"
          ? "flex w-full items-start gap-3 p-4"
          : "flex flex-col items-center justify-center gap-3 px-3 py-6 text-center"
      )}
    >
      <Icon
        className={cn(
          "size-4 shrink-0 mt-1",
          selected ? "text-foreground" : "text-muted-foreground"
        )}
        aria-hidden
      />
      <span className="block">
        <span
          className={cn(
            "block text-sm",
            selected ? "font-bold text-foreground" : "font-semibold text-muted-foreground",
            layout === "row" && "text-base text-foreground"
          )}
        >
          {title}
        </span>
        {description && (
          <span className="mt-1 block text-xs sm:text-sm text-muted-foreground">{description}</span>
        )}
      </span>
    </button>
  );
}
