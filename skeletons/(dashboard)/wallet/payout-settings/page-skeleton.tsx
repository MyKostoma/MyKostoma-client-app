import { Skeleton } from "@/components/ui/skeleton";

export function WalletPayoutSettingsPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-44" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-44 rounded-xl" />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-3.5 w-64" />
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-3.5 w-44" />
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-20 w-full rounded-2xl" />
      </div>

      <Skeleton className="h-44 w-full rounded-2xl" />
    </div>
  );
}
