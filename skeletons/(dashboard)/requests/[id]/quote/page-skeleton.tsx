import { Skeleton } from "@/components/ui/skeleton";

export function RequestSubmitQuotePageSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-4 w-80" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-7 space-y-5">
            <Skeleton className="h-5 w-36" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-28 w-full rounded-lg" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 space-y-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-8 w-28 rounded-lg" />
            </div>
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
