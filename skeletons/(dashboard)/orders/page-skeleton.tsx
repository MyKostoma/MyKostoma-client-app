import { Skeleton } from "@/components/ui/skeleton";

export function OrdersPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <Skeleton className="h-10 w-full sm:w-72 rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border/70">
        <Skeleton className="h-9 w-24 rounded-full" />
        <Skeleton className="h-9 w-24 rounded-full" />
        <Skeleton className="h-9 w-28 rounded-full" />
        <Skeleton className="h-9 w-24 rounded-full" />
      </div>

      {/* Order Cards List */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="p-5 sm:p-6 rounded-2xl border border-border bg-card space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-3.5 w-60" />
                </div>
              </div>
              <div className="text-right space-y-1">
                <Skeleton className="h-7 w-36 ml-auto" />
                <Skeleton className="h-3 w-24 ml-auto" />
              </div>
            </div>

            {/* Progress Bar Placeholder */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-10" />
              </div>
              <Skeleton className="h-2.5 w-full rounded-full" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/70">
              <Skeleton className="h-9 w-32 rounded-md" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-24 rounded-md" />
                <Skeleton className="h-9 w-36 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
