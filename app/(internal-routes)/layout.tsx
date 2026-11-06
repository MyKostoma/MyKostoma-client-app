import type { Metadata } from "next";
import { InternalRoutesShell } from "@/components/layouts/internal-routes-shell";

export const metadata: Metadata = {
  title: "MyKostoma",
  description: "Find and book verified professionals and services across Nigeria.",
};

export default function InternalRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <InternalRoutesShell>{children}</InternalRoutesShell>;
}

