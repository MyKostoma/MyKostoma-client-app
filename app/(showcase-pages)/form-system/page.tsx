import { FormShowcase } from "@/components/form-showcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form System | MyKostoma",
  description: "Standardized input fields and form controls for data entry and configuration.",
};

export default function FormSystemPage() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased py-8 transition-colors duration-200">
      <FormShowcase />
    </main>
  );
}
