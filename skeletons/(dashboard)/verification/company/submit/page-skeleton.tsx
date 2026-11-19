import { Skeleton } from "@/components/ui/skeleton";

export function CompanyVerificationSubmitPageSkeleton() {
  return (
    <div className="space-y-6 pb-8">
      <div className="space-y-2.5">
        <Skeleton className="h-4 w-32 rounded-md" />
        <Skeleton className="h-8 w-72 rounded-lg" />
        <Skeleton className="h-4 w-full max-w-lg rounded-md" />
      </div>

      <div className="space-y-4 pt-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-44 rounded-md" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-48 rounded-md" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
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
