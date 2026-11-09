import { Skeleton } from "@/components/ui/skeleton";

export function OrderStatusPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-border bg-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <Skeleton className="h-7 w-60" />
        </div>
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Workspace */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Lifecycle Card */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
            <Skeleton className="h-6 w-36" />
            <div className="grid grid-cols-3 gap-4 pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="text-center space-y-2 flex flex-col items-center">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="p-4 rounded-xl border border-border space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="p-4 rounded-xl border border-border space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-5 w-28" />
              </div>
            </div>
          </div>

          {/* Escrow Protection Card */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div className="space-y-1">
                <Skeleton className="h-6 w-44 bg-slate-800" />
                <Skeleton className="h-3 w-60 bg-slate-800" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full bg-slate-800" />
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
              <div className="pt-4 border-t border-border flex justify-end gap-3">
                <Skeleton className="h-10 w-36 rounded-md" />
                <Skeleton className="h-10 w-44 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
