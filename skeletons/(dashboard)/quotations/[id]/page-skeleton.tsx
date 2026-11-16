import { Skeleton } from "@/components/ui/skeleton";

export function QuotationDetailPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl border border-border bg-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>
          <Skeleton className="h-7 w-48" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-36 rounded-md" />
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Artisan Card */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-5 w-44" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
            <div className="pt-2 border-t border-border/70 space-y-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>

          {/* Quotation Breakdown Card */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="space-y-3 pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-border/60">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t-2 border-border">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-7 w-32" />
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-9 w-full rounded-md mt-2" />
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-6 w-32" />
          </div>

          <Skeleton className="h-11 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
