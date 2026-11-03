import { PublicFooter } from "@/components/layouts/footers";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col font-inter">
      <main className="flex items-center justify-center px-4 py-16">{children}</main>
      <PublicFooter />
    </div>
  );
}
