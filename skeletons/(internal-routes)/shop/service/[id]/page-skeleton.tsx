import { Skeleton } from "@/components/ui/skeleton";

export function ShopServiceDetailPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="mb-6 h-3.5 w-64" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-8">
            <div className="space-y-3">
              <Skeleton className="h-5 w-44 rounded-md" />
              <Skeleton className="h-9 w-4/5" />
            </div>

            {/* Gallery Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-72 w-full rounded-2xl sm:h-96" />
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-20 w-full rounded-xl" />
                ))}
              </div>
            </div>

            {/* Provider Strip Skeleton */}
            <Skeleton className="h-20 w-full rounded-2xl" />

            {/* About Service Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Trust Cards Skeleton */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton key={idx} className="h-28 w-full rounded-2xl" />
              ))}
            </div>
          </div>

          {/* Right Sticky Column */}
          <div className="space-y-6 lg:col-span-4">
            <Skeleton className="h-72 w-full rounded-2xl" />
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

