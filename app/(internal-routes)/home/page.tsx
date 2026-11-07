import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { ConsumerHomeView } from "@/features/consumer/home/consumer-home-view";

export const metadata: Metadata = PAGE_METADATA.consumerHome;

export default function CustomerHomePage() {
  return <ConsumerHomeView />;
}
