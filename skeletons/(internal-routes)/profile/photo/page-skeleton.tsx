import { Skeleton } from "@/components/ui/skeleton";

export function ProfilePhotoPageSkeleton() {
  return (
    <main className="flex-1 container px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-9 rounded-xl" />
          <Skeleton className="h-7 w-36 rounded-lg" />
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 flex flex-col items-center space-y-5">
          <Skeleton className="size-36 rounded-2xl" />
          <Skeleton className="h-11 w-72 rounded-xl" />
          <Skeleton className="h-11 w-72 rounded-xl" />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <Skeleton className="h-4 w-40" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </main>
  );
}
