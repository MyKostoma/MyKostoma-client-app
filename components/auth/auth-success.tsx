"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthCard } from "./auth-card";

export interface AuthSuccessProps {
  /** Where the user is being sent, e.g. "Consumer Product Entry". */
  destinationLabel: string;
  roleLabel: string;
  href?: string;
  /** Seconds before the automatic redirect. */
  redirectAfter?: number;
  className?: string;
}

export function AuthSuccess({
  destinationLabel,
  roleLabel,
  href = "/",
  redirectAfter = 5,
  className,
}: AuthSuccessProps) {
  const router = useRouter();

  React.useEffect(() => {
    const t = setTimeout(() => router.push(href), redirectAfter * 1000);
    return () => clearTimeout(t);
  }, [router, href, redirectAfter]);

  return (
    <AuthCard
      className={className}
      title="Success!"
      subtitle="Your account has been verified. You are being redirected to your dashboard."
      header={
        <span className="flex size-8 items-center justify-center rounded-full bg-success text-success-foreground">
          <Check className="size-5" aria-hidden />
        </span>
      }
    >
      <dl className="rounded-lg border border-border bg-muted/40 px-4 py-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase text-foreground">
          <dt>Redirecting to</dt>
          <dt>Role detected</dt>
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <dd className="text-sm font-medium text-muted-foreground">{destinationLabel}</dd>
          <dd
            className={cn(
              "rounded-sm border border-border bg-card px-2 py-0.5",
              "text-[10px] font-bold uppercase text-foreground"
            )}
          >
            {roleLabel}
          </dd>
        </div>
      </dl>

      <Button
        className="mt-6 w-full"
        trailingIcon={<ArrowRight />}
        onClick={() => router.push(href)}
      >
        Go to Dashboard
      </Button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        If you are not redirected automatically within {redirectAfter} seconds, click the button
        above.
      </p>
    </AuthCard>
  );
}
