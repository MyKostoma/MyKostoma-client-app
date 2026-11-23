import { Skeleton } from "@/components/ui/skeleton";

export function CreatorReelsProfilePageSkeleton() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 pb-6">
        <Skeleton className="size-28 rounded-full shrink-0" />
        <div className="flex-1 space-y-3 w-full">
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-7 w-40 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
          <div className="flex items-center gap-6">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
          <Skeleton className="h-4 w-56 rounded-md" />
          <Skeleton className="h-4 w-full max-w-md rounded-md" />
        </div>
      </div>

      <div className="flex justify-center gap-10 border-t border-border pt-3">
        <Skeleton className="h-4 w-16 rounded-md" />
        <Skeleton className="h-4 w-16 rounded-md" />
        <Skeleton className="h-4 w-20 rounded-md" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton key={idx} className="aspect-9/16 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
