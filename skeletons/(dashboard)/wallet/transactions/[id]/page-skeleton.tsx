import { Skeleton } from "@/components/ui/skeleton";

export function WalletTransactionDetailPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Top Hero Card */}
      <div className="rounded-2xl border border-border bg-card p-8 flex flex-col items-center space-y-4">
        <Skeleton className="size-14 rounded-full" />
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-6 w-36 rounded-full" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-10 w-36 rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      </div>

      {/* Bottom 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Skeleton className="lg:col-span-7 h-72 w-full rounded-2xl" />
        <div className="lg:col-span-5 space-y-6">
          <Skeleton className="h-36 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

