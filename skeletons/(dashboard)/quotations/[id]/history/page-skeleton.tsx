import { Skeleton } from "@/components/ui/skeleton";

export function QuotationHistoryPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      <div className="space-y-5 pl-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-border bg-card p-6 space-y-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
                <Skeleton className="h-3.5 w-48" />
              </div>
              <Skeleton className="h-8 w-28 rounded-lg" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-border/70">
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-56" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <Skeleton className="size-10 rounded-xl" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3.5 w-72" />
          </div>
        </div>
        <Skeleton className="h-9 w-36 rounded-lg" />
      </div>
    </div>
  );
}
