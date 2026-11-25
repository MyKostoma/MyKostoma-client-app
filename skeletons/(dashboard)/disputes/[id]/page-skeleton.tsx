import { Skeleton } from "@/components/ui/skeleton";

export function DisputeDetailPageSkeleton() {
  return (
    <div className="space-y-6 pb-10">
      <div className="space-y-3">
        <Skeleton className="h-4 w-32 rounded-md" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-44 rounded-md" />
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
            <Skeleton className="h-3.5 w-28 rounded-md" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-border">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="space-y-1.5">
                  <Skeleton className="h-3 w-20 rounded-md" />
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-border p-4 space-y-2">
              <Skeleton className="h-3 w-28 rounded-md" />
              <Skeleton className="h-4 w-52 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-44 rounded-md" />
            {Array.from({ length: 2 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card p-5 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-full shrink-0" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-36 rounded-md" />
                    <Skeleton className="h-3 w-28 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-16 w-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <Skeleton className="h-3.5 w-32 rounded-md" />
            <Skeleton className="h-14 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <Skeleton className="h-11 w-full rounded-none" />
            <div className="p-6 space-y-3">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-11 w-full rounded-xl mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
