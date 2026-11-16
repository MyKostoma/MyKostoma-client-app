import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { CreateRequestView } from "@/features/requests/create-request-view";
import { CreateRequestPageSkeleton } from "@/skeletons/(dashboard)/requests/new/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.requestCreate;

export default function CreateRequestPage() {
  return (
    <Suspense fallback={<CreateRequestPageSkeleton />}>
      <CreateRequestView />
    </Suspense>
  );
}
