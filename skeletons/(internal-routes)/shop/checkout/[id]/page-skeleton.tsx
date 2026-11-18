import { Skeleton } from "@/components/ui/skeleton";

export function ShopCheckoutPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto  px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="mb-4 h-3.5 w-56" />
        <Skeleton className="mb-8 h-9 w-80" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          <div className="space-y-6 lg:col-span-7">
            <Skeleton className="h-36 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-44 w-full rounded-2xl" />
          </div>

          <div className="lg:col-span-5">
            <Skeleton className="h-96 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

