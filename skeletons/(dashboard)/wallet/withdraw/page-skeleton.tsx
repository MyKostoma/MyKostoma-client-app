import { Skeleton } from "@/components/ui/skeleton";

export function WalletWithdrawPageSkeleton() {
  return (
    <div className="py-4">
      <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-7 w-44" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-20 w-full rounded-2xl" />
        <div className="space-y-3">
          <Skeleton className="h-14 w-full rounded-2xl" />
          <div className="grid grid-cols-4 gap-2.5">
            <Skeleton className="h-9 w-full rounded-xl" />
            <Skeleton className="h-9 w-full rounded-xl" />
            <Skeleton className="h-9 w-full rounded-xl" />
            <Skeleton className="h-9 w-full rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-11 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}
