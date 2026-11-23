import { Skeleton } from "@/components/ui/skeleton";

export function VerificationSubmitPageSkeleton() {
  return (
    <div className="space-y-6 pb-8">
      <div className="space-y-2.5">
        <Skeleton className="h-4 w-32 rounded-md" />
        <Skeleton className="h-8 w-72 rounded-lg" />
        <Skeleton className="h-4 w-full max-w-md rounded-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-border bg-card p-5 flex items-center gap-3.5"
          >
            <Skeleton className="size-11 rounded-xl shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-36 rounded-md" />
              <Skeleton className="h-3.5 w-28 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-56 rounded-md" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Skeleton className="h-36 w-full rounded-xl" />
        <Skeleton className="h-36 w-full rounded-xl" />
      </div>

      <Skeleton className="h-28 w-full rounded-xl" />

      <div className="flex justify-end gap-3">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-44 rounded-lg" />
      </div>
    </div>
  );
}
