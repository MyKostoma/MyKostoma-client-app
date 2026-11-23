import { Skeleton } from "@/components/ui/skeleton";

export function WalletWithdrawStatusPageSkeleton() {
  return (
    <div className="py-4">
      <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 flex flex-col items-center">
        <Skeleton className="size-16 rounded-full" />
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
