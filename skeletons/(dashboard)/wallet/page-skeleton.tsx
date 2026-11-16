import { Skeleton } from "@/components/ui/skeleton";

export function WalletOverviewPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* 3 Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Skeleton className="h-44 w-full rounded-2xl" />
        <Skeleton className="h-44 w-full rounded-2xl" />
        <Skeleton className="h-44 w-full rounded-2xl" />
      </div>

      {/* Recent Transactions Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between border-b border-border/70">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="divide-y divide-border/60 p-6 space-y-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="pt-4 first:pt-0 flex items-center justify-between gap-4"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

