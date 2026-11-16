import { cn } from "@/lib/utils";
import type { RequestStatus } from "./types";

export interface RequestStatusBadgeProps {
  status: RequestStatus;
  variant?: "default" | "header-pill";
  className?: string;
}

const STATUS_LABELS: Record<RequestStatus, string> = {
  open: "OPEN",
  "in-progress": "IN PROGRESS",
  completed: "COMPLETED",
  closed: "CLOSED",
};

export function RequestStatusBadge({
  status,
  variant = "default",
  className,
}: RequestStatusBadgeProps) {
  if (variant === "header-pill") {
    const isClosed = status === "closed";
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider select-none border",
          isClosed
            ? "bg-secondary text-foreground border-border"
            : "bg-success-bg text-success border-success/20",
          className
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "size-1.5 rounded-full shrink-0",
            isClosed ? "bg-foreground/70" : "bg-success"
          )}
        />
        <span>{isClosed ? "CLOSED REQUEST" : "OPEN REQUEST"}</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider select-none",
        status === "open" &&
          "bg-secondary/70 text-foreground border border-border/80",
        status === "in-progress" && "bg-foreground text-background shadow-2xs",
        status === "completed" &&
          "bg-secondary text-foreground border border-border/80",
        status === "closed" &&
          "bg-secondary/60 text-muted-foreground border border-border/60",
        className
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
