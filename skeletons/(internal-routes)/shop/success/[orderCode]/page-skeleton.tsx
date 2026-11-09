import { Skeleton } from "@/components/ui/skeleton";

export function ShopOrderSuccessPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="flex flex-col items-center space-y-6">
          <Skeleton className="size-16 rounded-full" />
          <Skeleton className="h-9 w-80" />
          <Skeleton className="h-4 w-96 max-w-full" />
          <Skeleton className="h-8 w-52 rounded-full" />
          <Skeleton className="h-60 w-full rounded-3xl" />
          <Skeleton className="h-12 w-60 rounded-xl" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
}

