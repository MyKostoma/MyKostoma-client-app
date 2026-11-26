import { Skeleton } from "@/components/ui/skeleton";

export function DisputesPageSkeleton() {
  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-36 rounded-md" />
          <Skeleton className="h-4 w-72 max-w-full rounded-md" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl sm:hidden" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border pb-3">
        <Skeleton className="h-5 w-36 rounded-md" />
        <Skeleton className="h-5 w-36 rounded-md" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Skeleton className="h-10 w-full sm:w-72 rounded-xl" />
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-10 w-24 rounded-xl" />
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between gap-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="h-3.5 w-24 rounded-md" />
          ))}
        </div>

        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="p-5 border-b border-border last:border-b-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <Skeleton className="h-4 w-24 rounded-md" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-3.5 w-32 rounded-md" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="size-8 rounded-full shrink-0" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-4 w-24 rounded-md hidden md:block" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
        ))}

        <div className="px-5 py-3.5 border-t border-border flex items-center justify-between">
          <Skeleton className="h-4 w-36 rounded-md" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-16 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Bottom Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-border bg-card p-5 space-y-3"
          >
            <Skeleton className="h-4 w-36 rounded-md" />
            <Skeleton className="h-7 w-24 rounded-md" />
            <Skeleton className="h-3.5 w-40 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
