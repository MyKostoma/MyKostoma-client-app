import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { LandingView } from "@/components/landing/landing-view";

export const metadata: Metadata = PAGE_METADATA.landing;

export default function Home() {
  return <LandingView />;
}
