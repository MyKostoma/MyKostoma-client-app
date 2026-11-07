import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { QuotationsListView } from "@/features/quotations/quotations-list-view";

export const metadata: Metadata = PAGE_METADATA.quotationsList;

export default function QuotationsPage() {
  return <QuotationsListView />;
}
