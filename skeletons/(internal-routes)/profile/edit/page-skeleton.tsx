import { Skeleton } from "@/components/ui/skeleton";

export function EditProfilePageSkeleton() {
  return (
    <main className="flex-1 container px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-9 rounded-xl" />
          <Skeleton className="h-7 w-36 rounded-lg" />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 flex items-center gap-5">
          <Skeleton className="size-20 rounded-2xl shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-3.5 w-36" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <Skeleton className="h-3.5 w-36" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>

        <Skeleton className="h-28 w-full rounded-2xl" />
      </div>
    </main>
  );
}
