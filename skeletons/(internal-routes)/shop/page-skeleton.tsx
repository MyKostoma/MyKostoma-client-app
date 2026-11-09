import { Skeleton } from "@/components/ui/skeleton";

export function ShopHomePageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Banner Skeleton */}
        <Skeleton className="h-72 w-full rounded-3xl sm:h-80" />

        {/* Service Categories Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-36 rounded-2xl" />
            ))}
          </div>
        </div>

        {/* Featured Shop Services Skeleton */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
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

        {/* Top Rated Spotlight Skeleton */}
        <Skeleton className="h-80 w-full rounded-3xl" />
      </div>
    </div>
  );
}

