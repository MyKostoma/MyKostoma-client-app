import { Skeleton } from "@/components/ui/skeleton";

export function WalletTransactionsPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filters Bar Skeleton */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5">
          <Skeleton className="h-9 lg:col-span-3 rounded-lg" />
          <Skeleton className="h-9 lg:col-span-2 rounded-lg" />
          <Skeleton className="h-9 lg:col-span-2 rounded-lg" />
          <Skeleton className="h-9 lg:col-span-3 rounded-lg" />
          <Skeleton className="h-9 lg:col-span-2 rounded-lg" />
        </div>
      </div>

      {/* Full Table Skeleton */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden p-6 space-y-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-4 py-3 border-b border-border/60 last:border-0"
          >
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

