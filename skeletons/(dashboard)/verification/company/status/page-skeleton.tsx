import { Skeleton } from "@/components/ui/skeleton";

export function CompanyVerificationStatusPageSkeleton() {
  return (
    <div className="max-w-lg mx-auto py-4 sm:py-8 space-y-6">
      <div className="flex flex-col items-center space-y-3">
        <Skeleton className="size-16 rounded-full" />
        <Skeleton className="h-8 w-52 rounded-lg" />
        <Skeleton className="h-4 w-80 max-w-full rounded-md" />
      </div>

      <div className="rounded-2xl border border-border bg-card divide-y divide-border">
        {[1, 2, 3, 4].map((row) => (
          <div
            key={row}
            className="px-5 py-4 flex items-center justify-between gap-4"
          >
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <Skeleton className="h-11 w-full rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>
    </div>
  );
}
