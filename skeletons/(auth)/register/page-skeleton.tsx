import { Skeleton } from "@/components/ui/skeleton";

export function RegisterPageSkeleton() {
  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-xs space-y-6">
      <div className="text-center space-y-2">
        <Skeleton className="h-7 w-48 mx-auto" />
        <Skeleton className="h-4 w-72 mx-auto" />
      </div>

      {/* Role Selector Cards */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl border border-border space-y-2 text-center flex flex-col items-center">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-28" />
        </div>
        <div className="p-4 rounded-xl border border-border space-y-2 text-center flex flex-col items-center">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-11 w-full rounded-md" />
      </div>

      <div className="pt-2 flex justify-center">
        <Skeleton className="h-4 w-56" />
      </div>
    </div>
  );
}
