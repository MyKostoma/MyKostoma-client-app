import { Skeleton } from "@/components/ui/skeleton";

export function ReelsPageSkeleton() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-center gap-8 border-b border-border pb-3">
        <Skeleton className="h-5 w-24 rounded-md" />
        <Skeleton className="h-5 w-24 rounded-md" />
      </div>

      <div className="flex flex-col items-center gap-8">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-end justify-center gap-4 w-full"
          >
            <Skeleton className="w-full max-w-[360px] aspect-9/16 rounded-2xl" />
            <div className="flex flex-col items-center gap-3 pb-3">
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="size-10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
