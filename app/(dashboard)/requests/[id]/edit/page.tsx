import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { EditRequestView } from "@/features/requests/edit-request-view";
import { EditRequestPageSkeleton } from "@/skeletons/(dashboard)/requests/[id]/edit/page-skeleton";
import { DEFAULT_CONSUMER_REQUESTS } from "@/features/requests/data";

export const metadata: Metadata = PAGE_METADATA.requestEditDefault;

export function generateStaticParams() {
  return DEFAULT_CONSUMER_REQUESTS.map((r) => ({
    id: r.id,
  }));
}

export default async function EditRequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<EditRequestPageSkeleton />}>
      <EditRequestView requestId={decodeURIComponent(id)} />
    </Suspense>
  );
}
