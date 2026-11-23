import { Skeleton } from "@/components/ui/skeleton";

export function ReviewsPageSkeleton() {
  return (
    <div className="space-y-6 pb-10">
      {/* Tabs Strip */}
      <div className="flex items-center gap-6 border-b border-border pb-3">
        <Skeleton className="h-5 w-32 rounded-md" />
        <Skeleton className="h-5 w-28 rounded-md" />
        <Skeleton className="h-5 w-24 rounded-md" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-border bg-card p-6 space-y-3"
          >
            <Skeleton className="h-3.5 w-28 rounded-md" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Review Feed Cards */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-border bg-card p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-40 rounded-md" />
                <Skeleton className="h-3.5 w-32 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
            <div className="pt-2 flex justify-end">
              <Skeleton className="h-9 w-36 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
