import { Skeleton } from "@/components/ui/skeleton";

export function VerificationSettingsPageSkeleton() {
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
            <Skeleton className="h-3.5 w-40 rounded-md" />
            <Skeleton className="h-7 w-56 rounded-md" />
            <Skeleton className="h-4 w-80 max-w-full rounded-md" />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-60 rounded-md" />
                <Skeleton className="h-4 w-48 rounded-md" />
              </div>
              <Skeleton className="h-7 w-28 rounded-full" />
            </div>
            <Skeleton className="h-2.5 w-full rounded-full" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4 flex-1">
                  <Skeleton className="size-11 rounded-xl shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-48 rounded-md" />
                    <Skeleton className="h-4 w-72 max-w-full rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-10 w-36 rounded-xl shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
