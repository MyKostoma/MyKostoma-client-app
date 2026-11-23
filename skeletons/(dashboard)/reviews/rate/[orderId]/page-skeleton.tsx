import { Skeleton } from "@/components/ui/skeleton";

export function RateConsumerPageSkeleton() {
  return (
    <div className="max-w-2xl mx-auto pb-10">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between gap-4 pb-5 border-b border-border">
          <div className="flex items-center gap-3.5">
            <Skeleton className="size-12 rounded-full shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-36 rounded-md" />
              <Skeleton className="h-3.5 w-24 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-7 w-28 rounded-md" />
        </div>

        <div className="flex flex-col items-center space-y-3 py-2">
          <Skeleton className="h-5 w-64 rounded-md" />
          <div className="flex items-center gap-2.5">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton key={idx} className="size-10 rounded-full" />
            ))}
          </div>
        </div>

        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>
    </div>
  );
}
