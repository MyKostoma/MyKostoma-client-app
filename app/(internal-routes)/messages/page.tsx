import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { MessagesView } from "@/features/messages/messages-view";
import { MessagesPageSkeleton } from "@/skeletons/(internal-routes)/messages/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.messages;

export default function MessagesPage() {
  return (
    <Suspense fallback={<MessagesPageSkeleton />}>
      <MessagesView />
    </Suspense>
  );
}

