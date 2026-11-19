import { Skeleton } from "@/components/ui/skeleton";

export function VerificationOverviewPageSkeleton() {
  return (
    <div className="space-y-6 pb-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 rounded-lg" />
        <Skeleton className="h-4 w-full max-w-xl rounded-md" />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4 flex-1">
          <Skeleton className="size-12 rounded-xl shrink-0" />
          <div className="space-y-2.5 flex-1">
            <Skeleton className="h-5 w-60 rounded-md" />
            <Skeleton className="h-4 w-full max-w-lg rounded-md" />
            <Skeleton className="h-3.5 w-64 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-10 w-32 rounded-lg shrink-0" />
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Skeleton className="size-10 rounded-full shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-36 rounded-md" />
            <Skeleton className="h-3.5 w-full max-w-md rounded-md" />
          </div>
        </div>
        <Skeleton className="h-4 w-20 rounded-md shrink-0" />
      </div>
    </div>
  );
}
