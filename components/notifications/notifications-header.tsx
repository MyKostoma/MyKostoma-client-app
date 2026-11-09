import { cn } from "@/lib/utils";
import type { NotificationsHeaderProps } from "./types";

export function NotificationsHeader({
  title = "Notifications",
  subtitle = "Stay updated with your home service requests and activity.",
  className,
}: NotificationsHeaderProps) {
  return (
    <div className={cn("space-y-1.5 select-none", className)}>
      <div className="flex items-center gap-2.5">
        <span
          className="w-1.5 h-6 sm:h-7 rounded-full bg-primary shrink-0 inline-block"
          aria-hidden="true"
        />
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          {title}
        </h1>
      </div>
      {subtitle && (
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-4">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default NotificationsHeader;
