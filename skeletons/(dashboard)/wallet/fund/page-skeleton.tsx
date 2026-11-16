import { Skeleton } from "@/components/ui/skeleton";

export function WalletFundPageSkeleton() {
  return (
    <div className="py-4">
      <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-16 w-full rounded-2xl" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="h-8 w-20 rounded-full" />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton className="h-3.5 w-36" />
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
        </div>

        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}

