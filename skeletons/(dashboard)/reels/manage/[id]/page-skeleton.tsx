import { Skeleton } from "@/components/ui/skeleton";

export function ManageReelPageSkeleton() {
  return (
    <div className="space-y-6 pb-10">
      <Skeleton className="h-7 w-72 rounded-md" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 max-w-xs w-full mx-auto lg:mx-0">
          <Skeleton className="aspect-9/16 w-full rounded-2xl" />
        </div>

        <div className="lg:col-span-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card p-5 space-y-2.5"
              >
                <Skeleton className="h-3.5 w-20 rounded-md" />
                <Skeleton className="h-8 w-28 rounded-lg" />
                <Skeleton className="h-3.5 w-24 rounded-md" />
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
