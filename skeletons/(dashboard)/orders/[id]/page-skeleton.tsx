import { Skeleton } from "@/components/ui/skeleton";

export function OrderDetailPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl border border-border bg-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <Skeleton className="h-7 w-64" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-36 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      {/* Sub-view switcher tabs */}
      <div className="flex gap-2 border-b border-border pb-2 overflow-x-auto">
        <Skeleton className="h-9 w-44 rounded-full" />
        <Skeleton className="h-9 w-44 rounded-full" />
        <Skeleton className="h-9 w-44 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Summary & Timeline Card */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <Skeleton className="h-6 w-56" />
                <Skeleton className="h-3.5 w-40" />
              </div>
              <div className="text-right space-y-1">
                <Skeleton className="h-7 w-36 ml-auto" />
                <Skeleton className="h-3 w-24 ml-auto" />
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="pt-4 border-t border-border/70 space-y-3">
              <Skeleton className="h-4 w-32" />
              <div className="grid grid-cols-4 gap-2 pt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1 text-center flex flex-col items-center">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Milestones & Payments */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="space-y-3 pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-border/80 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-44" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-24" />
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-3">
              <Skeleton className="h-10 w-44 rounded-md" />
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <Skeleton className="h-5 w-32" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-9 w-full rounded-md mt-2" />
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
