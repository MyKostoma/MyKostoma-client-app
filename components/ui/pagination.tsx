import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center sm:justify-start", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1.5 sm:gap-2", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<"button">;

const PaginationLink = ({
  className,
  isActive,
  children,
  ...props
}: PaginationLinkProps) => (
  <button
    type="button"
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "size-9 rounded-md flex items-center justify-center text-sm font-medium transition-all select-none cursor-pointer outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      isActive
        ? "bg-primary text-primary-foreground font-bold shadow-xs hover:bg-primary-hover active:bg-primary-active"
        : "text-muted-foreground hover:text-foreground hover:bg-secondary active:bg-secondary-active",
      className
    )}
    {...props}
  >
    {children}
  </button>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<"button">) => (
  <button
    type="button"
    aria-label="Go to previous page"
    className={cn(
      "size-9 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground transition-all select-none cursor-pointer outline-none shadow-2xs",
      "hover:bg-muted hover:text-foreground active:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  >
    <ChevronLeft className="size-4" />
    <span className="sr-only">Previous</span>
  </button>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<"button">) => (
  <button
    type="button"
    aria-label="Go to next page"
    className={cn(
      "size-9 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground transition-all select-none cursor-pointer outline-none shadow-2xs",
      "hover:bg-muted hover:text-foreground active:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  >
    <ChevronRight className="size-4" />
    <span className="sr-only">Next</span>
  </button>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex size-9 items-center justify-center text-muted-foreground font-medium text-sm select-none",
      className
    )}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
