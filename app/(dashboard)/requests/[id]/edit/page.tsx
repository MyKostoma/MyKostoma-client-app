import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { EditRequestView } from "@/features/requests/edit-request-view";

export const metadata: Metadata = PAGE_METADATA.requestEditDefault;

export default async function EditRequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditRequestView requestId={decodeURIComponent(id)} />;
}
