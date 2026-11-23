import { Skeleton } from "@/components/ui/skeleton";

export function ReviewDetailPageSkeleton() {
  return (
    <div className="space-y-6 pb-10">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Skeleton className="size-12 rounded-full shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-40 rounded-md" />
              <Skeleton className="h-3.5 w-32 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-7 w-28 rounded-md" />
        </div>

        <Skeleton className="h-5 w-72 rounded-md" />
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
        <Skeleton className="h-5 w-32 rounded-md" />
        <Skeleton className="h-28 w-full rounded-xl" />
        <div className="flex justify-end gap-2.5">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-36 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
