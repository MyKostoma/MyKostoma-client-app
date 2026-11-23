import { Skeleton } from "@/components/ui/skeleton";

export function UploadReelPageSkeleton() {
  return (
    <div className="max-w-3xl mx-auto pb-10">
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <Skeleton className="h-5 w-32 rounded-md" />
          <Skeleton className="size-6 rounded-md" />
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5">
            <Skeleton className="h-80 w-full rounded-2xl" />
          </div>

          <div className="md:col-span-7 space-y-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <div className="flex items-center gap-2.5">
              <Skeleton className="w-16 aspect-9/16 rounded-xl" />
              <Skeleton className="w-16 aspect-9/16 rounded-xl" />
              <Skeleton className="w-16 aspect-9/16 rounded-xl" />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border flex justify-end gap-2.5">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
