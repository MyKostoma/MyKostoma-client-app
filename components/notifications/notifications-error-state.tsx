import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NotificationsErrorStateProps } from "./types";

export function NotificationsErrorState({
  onRetry,
  className,
}: NotificationsErrorStateProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-10 sm:p-16 flex flex-col items-center justify-center text-center min-h-[420px] select-none",
        className
      )}
    >
      <div className="size-20 rounded-full bg-secondary/80 flex items-center justify-center mb-5 shrink-0">
        <AlertTriangle className="size-9 stroke-[1.75] text-muted-foreground/80" />
      </div>

      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
        Failed to load notifications
      </h3>

      <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mt-2 leading-relaxed">
        There was a problem retrieving your notifications.
        <br />
        Please try again or check your internet connection.
      </p>

      {onRetry && (
        <Button
          type="button"
          onClick={onRetry}
          className="mt-6 h-10 px-8 rounded-xl font-semibold bg-primary hover:bg-primary-hover text-primary-foreground shadow-xs cursor-pointer"
        >
          Retry
        </Button>
      )}
    </div>
  );
}

export default NotificationsErrorState;
