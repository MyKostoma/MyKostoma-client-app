import { Skeleton } from "@/components/ui/skeleton";

export function CustomerHomePageSkeleton() {
  return (
    <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 space-y-12 sm:space-y-16">
      {/* Consumer Hero Banner */}
      <div className="w-full h-56 sm:h-72 rounded-3xl p-6 sm:p-10 border border-border bg-card flex flex-col justify-between">
        <div className="space-y-3 max-w-lg">
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="h-8 sm:h-10 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-11 w-40 rounded-xl" />
      </div>

      {/* Categories Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-border bg-card flex flex-col items-center gap-3"
            >
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Professionals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-52" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-4 space-y-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-3 w-full" />
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
