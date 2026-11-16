import { Skeleton } from "@/components/ui/skeleton";

export function ShopCategoryPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <Skeleton className="mb-4 h-3.5 w-48" />

        {/* Header Skeleton */}
        <div className="mb-8 max-w-2xl space-y-2.5">
          <Skeleton className="h-8 w-72 sm:h-10" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Sidebar Filters Skeleton */}
          <div className="hidden w-64 shrink-0 space-y-6 lg:block">
            <div className="space-y-3">
              <Skeleton className="h-3.5 w-28" />
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="h-4 w-full" />
              ))}
            </div>
            <div className="space-y-3">
              <Skeleton className="h-3.5 w-24" />
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-9 w-full rounded-lg" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            </div>
            <div className="space-y-3">
              <Skeleton className="h-3.5 w-28" />
              {Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton key={idx} className="h-4 w-3/4" />
              ))}
            </div>
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Grid Skeleton */}
          <div className="min-w-0 flex-1 space-y-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-9 w-44 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <Skeleton className="h-44 w-full rounded-none" />
                  <div className="space-y-3 p-4">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex items-center justify-between pt-3">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

