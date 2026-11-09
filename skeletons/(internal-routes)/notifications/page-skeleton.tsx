import { Skeleton } from "@/components/ui/skeleton";

export function NotificationsPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-12">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-1.5 h-6 sm:h-7 rounded-full" />
          <Skeleton className="h-7 w-48 rounded-lg" />
        </div>
        <Skeleton className="h-4 w-72 rounded-md ml-4" />
      </div>

      {/* Tabs Skeleton */}
      <div className="flex items-center gap-6 border-b border-border pb-3">
        <Skeleton className="h-5 w-32 rounded-md" />
        <Skeleton className="h-5 w-20 rounded-md" />
        <Skeleton className="h-5 w-20 rounded-md" />
      </div>

      {/* Notifications List Skeleton */}
      <div className="rounded-2xl border border-border bg-card divide-y divide-border/70 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4 sm:p-5 flex items-start gap-4">
            <Skeleton className="size-10 rounded-full shrink-0" />
            <div className="flex-1 space-y-2.5 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-4 w-44 rounded-md" />
                <Skeleton className="h-3.5 w-16 rounded-md" />
              </div>
              <Skeleton className="h-3.5 w-full rounded-md" />
              <Skeleton className="h-3.5 w-3/4 rounded-md" />
              <div className="flex items-center gap-4 pt-1">
                <Skeleton className="h-3 w-20 rounded-md" />
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsPageSkeleton;
