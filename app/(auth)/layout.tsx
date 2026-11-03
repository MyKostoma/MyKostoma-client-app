import type { Metadata } from "next";
import Header from "@/components/layouts/headers";
import { Footer } from "@/components/layouts/footers";

export const metadata: Metadata = {
  title: "Authentication | MyKostoma",
  description: "Sign in or create your MyKostoma account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-card text-foreground flex flex-col font-inter transition-colors">
      <Header variant="landing" />
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        {children}
      </main>
      <Footer variant="public" />
    </div>
  );
}
