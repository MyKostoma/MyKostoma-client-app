import { Skeleton } from "@/components/ui/skeleton";

export function ProfilePageSkeleton() {
  return (
    <main className="flex-1 container mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-8">
      <Skeleton className="h-4 w-48" />

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <Skeleton className="h-32 sm:h-40 w-full rounded-none" />
        <div className="px-4 sm:px-8 pb-6 space-y-5">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 -mt-12 sm:-mt-14">
            <Skeleton className="size-24 sm:size-28 rounded-2xl border-4 border-card" />
            <div className="flex gap-2.5 md:pt-16">
              <Skeleton className="h-10 w-28 rounded-xl" />
              <Skeleton className="h-10 w-32 rounded-xl" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-7 w-52" />
              <Skeleton className="h-5 w-28 rounded-full" />
            </div>
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-3/4 max-w-xl" />
          </div>
        </div>
        <div className="flex gap-6 border-t border-border px-4 sm:px-8 py-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-44" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    </main>
  );
}
