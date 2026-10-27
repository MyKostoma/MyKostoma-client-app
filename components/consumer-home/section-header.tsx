"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export function SectionHeader({
  title,
  subtitle,
  actionLabel,
  actionHref,
  onActionClick,
  className,
  ...props
}: SectionHeaderProps) {
  const actionContent = actionLabel ? (
    <>
      <span>{actionLabel}</span>
      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
    </>
  ) : null;

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-end justify-between gap-3",
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="w-1 h-6 bg-primary rounded-full shrink-0"
          />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
        </div>

        {subtitle && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actionLabel &&
        (actionHref ? (
          <Link
            href={actionHref}
            onClick={onActionClick}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-hover transition-colors shrink-0"
          >
            {actionContent}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onActionClick}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-hover transition-colors shrink-0 cursor-pointer"
          >
            {actionContent}
          </button>
        ))}
    </div>
  );
}
