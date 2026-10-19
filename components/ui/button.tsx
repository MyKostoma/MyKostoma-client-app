import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium whitespace-nowrap transition-all outline-none select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:ring-4 focus-visible:ring-ring/25 cursor-pointer",
  {
    variants: {
      variant: {
        // Primary Action
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover active:bg-primary-active",
        primary:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover active:bg-primary-active",

        // Secondary Action
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active",

        // Outline
        outline:
          "border border-border bg-card text-foreground shadow-2xs hover:bg-muted active:bg-secondary",

        // Outline subtle
        "outline-subtle":
          "border border-border bg-card text-foreground shadow-2xs hover:bg-muted active:bg-secondary",

        // Outline primary
        "outline-primary":
          "border border-primary text-primary bg-transparent shadow-2xs hover:bg-primary/10 active:bg-primary/20",

        // Destructive / Utility
        destructive:
          "bg-destructive/15 border border-destructive/35 text-destructive hover:bg-destructive/25",

        "destructive-solid":
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive-hover active:bg-destructive-active",

        // Ghost (Transparent)
        ghost:
          "bg-transparent text-foreground hover:bg-muted active:bg-secondary",

        // Link
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto font-medium active:scale-100",

        // Link Destructive
        "link-destructive":
          "text-destructive underline-offset-4 hover:underline p-0 h-auto font-medium active:scale-100",

        // disabled
        "disabled": "cursor-not-allowed border border-[#E2E8F0] text-[#94A3B8] bg-[#F1F5F9]",
      },

      size: {
        // 02 Sizing System: Small (h-8, 32px)
        sm: "h-8 px-3 text-xs gap-1.5 rounded-md [&_svg]:size-3.5",
        small: "h-8 px-3 text-xs gap-1.5 rounded-md [&_svg]:size-3.5",

        // 02 Sizing System: Default (h-10, 40px)
        default: "h-10 px-4 text-sm gap-2 rounded-md [&_svg]:size-4",

        // 02 Sizing System: Large (h-12, 48px)
        lg: "h-12 px-6 text-base font-semibold gap-2.5 rounded-md [&_svg]:size-4",
        large: "h-12 px-6 text-base font-semibold gap-2.5 rounded-md [&_svg]:size-4",

        // Icon-Only Variants
        icon: "size-10 p-0 rounded-md [&_svg]:size-4",
        "icon-sm": "size-8 p-0 rounded-md [&_svg]:size-3.5",
        "icon-lg": "size-12 p-0 rounded-md [&_svg]:size-5",
        "icon-full": "size-10 p-0 rounded-full [&_svg]:size-4",
        "icon-full-sm": "size-8 p-0 rounded-full [&_svg]:size-3.5",
        "icon-full-lg": "size-12 p-0 rounded-full [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      loading = false,
      loadingText,
      leadingIcon,
      trailingIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            {loadingText ? <span>{loadingText}</span> : children}
          </>
        ) : (
          <>
            {leadingIcon && (
              <span className="inline-flex shrink-0 items-center justify-center">
                {leadingIcon}
              </span>
            )}
            {children && <span>{children}</span>}
            {trailingIcon && (
              <span className="inline-flex shrink-0 items-center justify-center">
                {trailingIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
