import { Skeleton } from "@/components/ui/skeleton";

export function VerifyAccountPageSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-xs space-y-6">
      <div className="text-center space-y-3">
        <Skeleton className="h-12 w-12 rounded-2xl mx-auto" />
        <Skeleton className="h-7 w-48 mx-auto" />
        <Skeleton className="h-4 w-64 mx-auto" />
      </div>

      {/* Code Input Boxes */}
      <div className="flex justify-center gap-3 py-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-12 rounded-xl" />
        ))}
      </div>

      <div className="space-y-3">
        <Skeleton className="h-11 w-full rounded-md" />
        <div className="flex justify-center">
          <Skeleton className="h-4 w-44" />
        </div>
      </div>
    </div>
  );
}
