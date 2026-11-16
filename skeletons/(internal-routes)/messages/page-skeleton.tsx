import { Skeleton } from "@/components/ui/skeleton";

export function MessagesPageSkeleton() {
  return (
    <div className="flex h-[calc(100vh-8.5rem)] rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
      {/* Left Conversations List Skeleton */}
      <div className="w-full md:w-80 lg:w-88 shrink-0 border-r border-border flex flex-col">
        {/* Search Input Skeleton */}
        <div className="p-3.5 border-b border-border/70">
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>

        {/* Conversation Items Skeleton */}
        <div className="flex-1 divide-y divide-border/60 overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3.5 px-4 py-3.5"
            >
              <Skeleton className="size-11 rounded-full shrink-0" />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Skeleton className="h-3.5 w-32 rounded-md" />
                  <Skeleton className="h-3 w-8 rounded-full shrink-0" />
                </div>
                <Skeleton className="h-3 w-40 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Chat Thread Skeleton */}
      <div className="hidden md:flex flex-1 flex-col min-w-0 bg-background/30">
        {/* Chat Header Skeleton */}
        <div className="px-6 py-3.5 border-b border-border bg-card flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-28 rounded-md" />
              <Skeleton className="h-3 w-16 rounded-md" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="size-9 rounded-lg" />
            <Skeleton className="size-9 rounded-lg" />
            <Skeleton className="size-9 rounded-lg" />
          </div>
        </div>

        {/* Message Thread Area Skeleton */}
        <div className="flex-1 p-6 space-y-6 overflow-hidden">
          {/* Incoming Message Group 1 */}
          <div className="flex items-start gap-3">
            <Skeleton className="size-8 rounded-full shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-11 w-64 rounded-2xl rounded-tl-xs" />
              <Skeleton className="h-10 w-48 rounded-2xl" />
              <Skeleton className="h-2.5 w-10 rounded-md" />
            </div>
          </div>

          {/* Outgoing Message Group 1 */}
          <div className="flex flex-col items-end space-y-2">
            <Skeleton className="h-11 w-60 rounded-2xl rounded-tr-xs" />
            <Skeleton className="h-2.5 w-12 rounded-md" />
          </div>

          {/* Incoming Message Group 2 */}
          <div className="flex items-start gap-3">
            <Skeleton className="size-8 rounded-full shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-20 w-80 rounded-2xl rounded-tl-xs" />
              <Skeleton className="h-2.5 w-10 rounded-md" />
            </div>
          </div>

          {/* Outgoing Message Group 2 */}
          <div className="flex flex-col items-end space-y-2">
            <Skeleton className="h-11 w-72 rounded-2xl rounded-tr-xs" />
            <Skeleton className="h-11 w-44 rounded-2xl" />
            <Skeleton className="h-2.5 w-12 rounded-md" />
          </div>
        </div>

        {/* Bottom Composer Skeleton */}
        <div className="px-6 py-4 border-t border-border bg-card shrink-0">
          <div className="rounded-xl border border-border bg-secondary/30 px-3 py-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Skeleton className="size-6 rounded-full shrink-0" />
              <Skeleton className="h-3.5 w-44 rounded-md" />
            </div>
            <Skeleton className="size-9 rounded-lg shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesPageSkeleton;

