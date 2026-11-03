import type { Metadata } from "next";
import Header from "@/components/layouts/headers";
import { Footer } from "@/components/layouts/footers";

export const metadata: Metadata = {
  title: "MyKostoma",
  description: "Find and book verified professionals and services across Nigeria.",
};

export default function InternalRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-inter transition-colors">
      <div className="w-full bg-card border-b border-border/70 sticky top-0 z-40">
        <div className="container px-4 sm:px-6 lg:px-8">
          <Header
            variant="app"
            className="rounded-none border-0 shadow-none px-0 py-3.5"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {children}
      </div>

      <Footer variant="app" className="mt-8" />
    </div>
  );
}
