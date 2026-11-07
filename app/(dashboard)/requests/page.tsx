import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { RequestsListView } from "@/features/requests/requests-list-view";

export const metadata: Metadata = PAGE_METADATA.requestsList;

export default function RequestsPage() {
  return <RequestsListView />;
}
