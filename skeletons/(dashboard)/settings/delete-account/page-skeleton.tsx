import { Skeleton } from "@/components/ui/skeleton";

export function DeleteAccountPageSkeleton() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="hidden lg:block w-56 shrink-0 space-y-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="h-9 w-full rounded-lg" />
          ))}
        </div>

        <div className="flex-1 min-w-0 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-36 rounded-md" />
            <Skeleton className="h-7 w-48 rounded-md" />
            <Skeleton className="h-4 w-80 max-w-full rounded-md" />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <Skeleton className="h-5 w-64 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-4/6 rounded-md" />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40 rounded-md" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-44 rounded-md" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
            <Skeleton className="h-6 w-80 max-w-full rounded-md" />
            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
              <Skeleton className="h-10 w-36 rounded-xl" />
              <Skeleton className="h-10 w-44 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
