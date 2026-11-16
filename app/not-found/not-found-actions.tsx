"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Search } from "lucide-react";

export function NotFoundActions() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-foreground hover:bg-secondary/80 text-sm font-medium transition-colors cursor-pointer shadow-2xs"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Go Back</span>
      </button>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 text-sm font-semibold transition-colors shadow-xs"
      >
        <Home className="h-4 w-4" />
        <span>Return Home</span>
      </Link>

      <Link
        href="/search"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-foreground hover:bg-secondary/80 text-sm font-medium transition-colors shadow-2xs"
      >
        <Search className="h-4 w-4" />
        <span>Find Pros</span>
      </Link>
    </div>
  );
}

