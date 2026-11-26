import { Skeleton } from "@/components/ui/skeleton";

export function PasswordSettingsPageSkeleton() {
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
            <Skeleton className="h-3.5 w-32 rounded-md" />
            <Skeleton className="h-7 w-48 rounded-md" />
            <Skeleton className="h-4 w-80 max-w-full rounded-md" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-4 space-y-2">
              <Skeleton className="h-5 w-40 rounded-md" />
              <Skeleton className="h-4 w-56 rounded-md" />
            </div>

            <div className="xl:col-span-8 rounded-2xl border border-border bg-card p-6 space-y-5">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="space-y-2">
                  <Skeleton className="h-4 w-36 rounded-md" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
              ))}
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Skeleton className="h-10 w-24 rounded-xl" />
            <Skeleton className="h-10 w-36 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
