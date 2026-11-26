import { Skeleton } from "@/components/ui/skeleton";

export function WalletSettingsPageSkeleton() {
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
            <Skeleton className="h-7 w-52 rounded-md" />
            <Skeleton className="h-4 w-80 max-w-full rounded-md" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-8 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-8 w-44 rounded-lg" />
                  <Skeleton className="h-4 w-40 rounded-md" />
                </div>
                <Skeleton className="h-11 w-40 rounded-xl shrink-0" />
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-40 rounded-md" />
                  <Skeleton className="h-9 w-28 rounded-xl" />
                </div>
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                <Skeleton className="h-5 w-44 rounded-md" />
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-12 w-full rounded-xl" />
                ))}
              </div>
            </div>

            <div className="xl:col-span-4 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
                <Skeleton className="h-5 w-36 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <Skeleton className="h-5 w-32 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
