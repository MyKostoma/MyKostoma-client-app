import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function AuthLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="MyKostoma Home"
      className={cn("inline-flex items-center transition-opacity hover:opacity-90", className)}
    >
      <img
        src="/mykostoma_full_logo.png"
        alt="MyKostoma"
        className="h-8 w-auto object-contain dark:hidden select-none"
      />
      <img
        src="/mykostoma_full_logo_white.png"
        alt="MyKostoma"
        className="h-8 w-auto object-contain hidden dark:block select-none"
      />
    </Link>
  );
}

export interface AuthCardProps {
  title: string;
  subtitle?: React.ReactNode;
  header?: React.ReactNode;
  size?: "md" | "lg";
  children: React.ReactNode;
  className?: string;
}


export function AuthCard({
  title,
  subtitle,
  header,
  size = "md",
  children,
  className,
}: AuthCardProps) {
  return (
    <section
      className={cn(
        "w-full rounded-lg border border-border bg-card p-6 sm:p-8 shadow-xs",
        size === "md" ? "max-w-md" : "max-w-xl",
        className
      )}
    >
      <div className="flex flex-col items-center text-center">
        {header ?? <AuthLogo />}
        <h1 className="mt-6 text-xl sm:text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm text-muted-foreground max-w-xs sm:max-w-sm">
            {subtitle}
          </p>
        )}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}


export function AuthAltAction({
  text,
  linkText,
  href,
}: {
  text: string;
  linkText: string;
  href: string;
}) {
  return (
    <p className="mt-6 border-t border-border pt-5 text-center text-sm text-muted-foreground">
      {text}{" "}
      <Link
        href={href}
        className="font-semibold text-foreground underline underline-offset-4 hover:text-primary"
      >
        {linkText}
      </Link>
    </p>
  );
}
