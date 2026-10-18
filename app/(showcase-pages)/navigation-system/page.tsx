import { NavigationShowcase } from "@/components/navigation-showcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Navigation System | MyKostoma",
  description: "Core navigational components and layout patterns for web and mobile.",
};

export default function NavigationSystemPage() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased py-8 transition-colors duration-200">
      <NavigationShowcase />
    </main>
  );
}
