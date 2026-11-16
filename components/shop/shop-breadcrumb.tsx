"use client";

import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import type { ShopBreadcrumbProps } from "./types";

export function ShopBreadcrumb({
  items,
  onNavigate,
  className,
}: ShopBreadcrumbProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="gap-1.5 sm:gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItem className="min-w-0">
                {isLast || !item.href ? (
                  <BreadcrumbPage
                    className={cn(
                      "text-[10px] sm:text-[11px] font-bold uppercase tracking-wider truncate max-w-[200px] sm:max-w-xs",
                      !isLast && "text-muted-foreground font-medium"
                    )}
                  >
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    onClick={() => onNavigate(item.href as string)}
                    className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider"
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

