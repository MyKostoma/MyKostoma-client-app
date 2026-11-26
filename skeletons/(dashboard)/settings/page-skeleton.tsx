import { Skeleton } from "@/components/ui/skeleton";

export function SettingsOverviewPageSkeleton() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Mobile Pill Tabs / Desktop Sub-Nav */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-hidden pb-1">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="h-9 w-24 rounded-full shrink-0" />
          ))}
        </div>

        <div className="hidden lg:block w-56 shrink-0 space-y-6">
          {Array.from({ length: 3 }).map((_, groupIdx) => (
            <div key={groupIdx} className="space-y-2">
              <Skeleton className="h-3 w-28 rounded-md" />
              <div className="space-y-1.5">
                <Skeleton className="h-9 w-full rounded-lg" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 min-w-0 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-7 w-52 rounded-md" />
            <Skeleton className="h-4 w-80 max-w-full rounded-md" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card p-5 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <Skeleton className="size-10 rounded-xl shrink-0" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-44 rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                </div>
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-40 rounded-md" />
              <Skeleton className="h-4 w-72 max-w-full rounded-md" />
            </div>
            <Skeleton className="h-10 w-36 rounded-xl shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
