import { Skeleton } from "@/components/ui/skeleton";

export function NotificationSettingsPageSkeleton() {
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
            <Skeleton className="h-7 w-60 rounded-md" />
            <Skeleton className="h-4 w-80 max-w-full rounded-md" />
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between gap-4">
              <Skeleton className="h-4 w-32 rounded-md" />
              <div className="flex items-center gap-6">
                <Skeleton className="h-4 w-12 rounded-md" />
                <Skeleton className="h-4 w-12 rounded-md" />
                <Skeleton className="h-4 w-12 rounded-md" />
              </div>
            </div>

            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="p-5 border-b border-border last:border-b-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40 rounded-md" />
                  <Skeleton className="h-3.5 w-64 max-w-full rounded-md" />
                </div>
                <div className="flex items-center gap-6">
                  <Skeleton className="h-6 w-11 rounded-full" />
                  <Skeleton className="h-6 w-11 rounded-full" />
                  <Skeleton className="h-6 w-11 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 rounded-md" />
                <Skeleton className="h-4 w-72 max-w-full rounded-md" />
              </div>
              <Skeleton className="h-6 w-11 rounded-full shrink-0" />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Skeleton className="h-10 w-24 rounded-xl" />
            <Skeleton className="h-10 w-40 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
