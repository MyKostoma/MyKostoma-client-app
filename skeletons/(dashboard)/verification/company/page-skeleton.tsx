import { Skeleton } from "@/components/ui/skeleton";

export function CompanyVerificationOverviewPageSkeleton() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-4 border-b border-border pb-2.5">
        <Skeleton className="h-5 w-40 rounded-md" />
        <Skeleton className="h-5 w-40 rounded-md" />
      </div>

      <div className="max-w-lg mx-auto py-4 sm:py-8 space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <Skeleton className="size-14 rounded-full" />
          <Skeleton className="h-8 w-56 rounded-lg" />
          <Skeleton className="h-4 w-72 max-w-full rounded-md" />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 space-y-5">
          <Skeleton className="h-5 w-32 rounded-md" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-4/6 rounded-md" />
          </div>
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
