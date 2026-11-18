import { Skeleton } from "@/components/ui/skeleton";

export function ProShopServiceFormPageSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-11 w-full rounded-xl" />
        <Skeleton className="h-3 w-56" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>

      <div className="space-y-2 max-w-sm">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <div className="grid grid-rows-2 gap-4">
            <Skeleton className="h-22 w-full rounded-2xl" />
            <Skeleton className="h-22 w-full rounded-2xl" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/70">
        <Skeleton className="h-8 w-20 rounded-lg" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
