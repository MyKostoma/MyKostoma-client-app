"use client";

import type { ReactNode, ReactElement } from "react";
import { Tooltip } from "radix-ui";
import { cn } from "@/lib/utils";

export interface SidebarTooltipProps {
  content: ReactNode;
  children: ReactElement;
  side?: "right" | "top" | "bottom" | "left";
  sideOffset?: number;
  enabled?: boolean;
  className?: string;
}

export function SidebarTooltip({
  content,
  children,
  side = "right",
  sideOffset = 12,
  enabled = true,
  className,
}: SidebarTooltipProps) {
  if (!enabled || !content) {
    return children;
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side={side}
          sideOffset={sideOffset}
          className={cn(
            "z-50 overflow-hidden rounded-md bg-foreground px-2.5 py-1 text-xs font-medium text-background shadow-md pointer-events-none whitespace-nowrap animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className
          )}
        >
          {content}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export const SidebarTooltipProvider = Tooltip.Provider;
export default SidebarTooltip;

