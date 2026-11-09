import { Skeleton } from "@/components/ui/skeleton";

export function LandingPageSkeleton() {
  return (
    <div className="min-h-screen bg-card text-foreground font-inter">
      {/* Top Navbar Placeholder */}
      <div className="w-full border-b border-border/80 px-4 sm:px-6 lg:px-8 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Skeleton className="h-8 w-32 rounded-lg" />
          <div className="hidden md:flex items-center gap-6">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-6">
          <div className="space-y-4">
            <Skeleton className="h-5 w-32 rounded-full" />
            <Skeleton className="h-10 sm:h-14 w-full max-w-lg rounded-xl" />
            <Skeleton className="h-10 sm:h-14 w-3/4 rounded-xl" />
            <Skeleton className="h-4 w-full max-w-md pt-2" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-11 w-36 rounded-md" />
              <Skeleton className="h-11 w-36 rounded-md" />
            </div>
          </div>
          <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden">
            <Skeleton className="w-full h-full rounded-2xl" />
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-border bg-card flex flex-col items-center gap-3"
              >
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-border bg-card space-y-3"
            >
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
