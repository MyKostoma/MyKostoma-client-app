import { Skeleton } from "@/components/ui/skeleton";

export function ResetPasswordPageSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-xs space-y-6">
      <div className="text-center space-y-3">
        <Skeleton className="h-12 w-12 rounded-2xl mx-auto" />
        <Skeleton className="h-7 w-48 mx-auto" />
        <Skeleton className="h-4 w-60 mx-auto" />
      </div>

      <div className="space-y-4 pt-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-11 w-full rounded-md" />
      </div>

      <div className="pt-2 flex justify-center">
        <Skeleton className="h-4 w-36" />
      </div>
    </div>
  );
}
