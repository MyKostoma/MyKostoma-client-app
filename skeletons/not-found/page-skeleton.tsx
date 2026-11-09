import { Skeleton } from "@/components/ui/skeleton";

export function NotFoundPageSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-inter">
      {/* Header Placeholder */}
      <div className="w-full border-b border-border/80 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Skeleton className="h-8 w-32 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-2xl text-center flex flex-col items-center space-y-4">
          <Skeleton className="h-20 w-20 rounded-3xl" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-full max-w-md" />

          <div className="flex gap-4 pt-4">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>

          <div className="w-full mt-12 pt-8 border-t border-border space-y-4">
            <Skeleton className="h-4 w-36 mx-auto" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-border bg-card flex items-center gap-3"
                >
                  <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-44" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
