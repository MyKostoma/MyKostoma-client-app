import { Skeleton } from "@/components/ui/skeleton";

export function LoginPageSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-xs space-y-6">
      <div className="text-center space-y-2">
        <Skeleton className="h-7 w-40 mx-auto" />
        <Skeleton className="h-4 w-60 mx-auto" />
      </div>

      <div className="space-y-4 pt-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-28" />
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-11 w-full rounded-md" />
      </div>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <Skeleton className="h-4 w-28 bg-card" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="pt-2 flex justify-center">
        <Skeleton className="h-4 w-52" />
      </div>
    </div>
  );
}
