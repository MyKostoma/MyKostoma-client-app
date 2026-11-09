import { Skeleton } from "@/components/ui/skeleton";

export function CompareQuotationsPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <div className="space-y-1">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
        <Skeleton className="h-10 w-44 rounded-md" />
      </div>

      {/* Comparison Matrix Table Skeleton */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-5 border-b border-border bg-secondary/30">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-36" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-4 p-5 border-b border-border/70 items-center"
          >
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
        ))}
        <div className="grid grid-cols-4 gap-4 p-5 items-center">
          <div />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Bottom Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}
