import { Skeleton } from "@/components/ui/skeleton";

export function OrderCompletionPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-border bg-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-36 rounded-full" />
          </div>
          <Skeleton className="h-7 w-64" />
        </div>
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      {/* Main Confirm Completion Card */}
      <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-2">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-3.5 w-full" />
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <Skeleton className="h-11 w-56 rounded-md" />
          <Skeleton className="h-11 w-36 rounded-md" />
        </div>
      </div>

      {/* State Example Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="space-y-2 pt-2 border-t border-border">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-9 w-32 rounded-md" />
            <Skeleton className="h-9 w-28 rounded-md" />
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="space-y-2 pt-2 border-t border-border">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-9 w-full rounded-md mt-2" />
        </div>
      </div>
    </div>
  );
}
