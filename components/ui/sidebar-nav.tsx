"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface NavItemConfig {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeVariant?: "primary" | "secondary";
  isDividerBefore?: boolean;
  disabled?: boolean;
  onClick?: (item: NavItemConfig) => void;
}

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItemConfig[];
  perspective?: "consumer" | "professional";
  activeItemId?: string;
  onItemSelect?: (id: string, item?: NavItemConfig) => void;
  className?: string;
}

export function SidebarNav({
  items = [],
  perspective = "consumer",
  activeItemId,
  onItemSelect,
  className,
  ...props
}: SidebarNavProps) {
  const isProfessional = perspective === "professional";

  const [internalActive, setInternalActive] = useState<string | undefined>(
    activeItemId ?? items[0]?.id
  );

  useEffect(() => {
    if (activeItemId !== undefined) {
      setInternalActive(activeItemId);
    } else if (items.length > 0 && !items.some((i) => i.id === internalActive)) {
      setInternalActive(items[0]?.id);
    }
  }, [activeItemId, items, internalActive]);

  const currentActive = activeItemId !== undefined ? activeItemId : internalActive;

  const handleSelect = (item: NavItemConfig) => {
    if (item.disabled) return;
    setInternalActive(item.id);
    item.onClick?.(item);
    onItemSelect?.(item.id, item);
  };

  return (
    <nav
      aria-label={`${perspective} sidebar navigation`}
      className={cn(
        "w-64 rounded-2xl p-3.5 space-y-1.5 transition-colors select-none bg-card text-foreground border border-border/80 shadow-2xs",
        className
      )}
      {...props}
    >
      {items.length === 0 ? (
        <div className="py-6 text-center text-xs text-muted-foreground">
          No navigation items provided
        </div>
      ) : (
        items.map((item) => {
          const Icon = item.icon;
          const isActive = currentActive === item.id;

          return (
            <React.Fragment key={item.id}>
              {item.isDividerBefore && (
                <div
                  className={cn(
                    "my-2 border-t",
                    isProfessional ? "border-muted/80" : "border-border/60"
                  )}
                />
              )}
              <button
                type="button"
                disabled={item.disabled}
                onClick={() => handleSelect(item)}
                className={cn(
                  "w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-150 outline-none",
                  item.disabled
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : "cursor-pointer",
                  // Consumer Active
                  !isProfessional &&
                    isActive &&
                    "bg-accent text-primary font-semibold shadow-2xs",
                  // Consumer Inactive
                  !isProfessional &&
                    !isActive &&
                    "text-muted-foreground hover:text-foreground hover:bg-secondary/70",
                  // Professional Active
                  isProfessional &&
                    isActive &&
                    "bg-primary text-white font-semibold shadow-sm",
                  // Professional Inactive
                  isProfessional &&
                    !isActive &&
                    "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                )}
              >
                <div className="flex items-center gap-3">
                  {Icon && (
                    <Icon
                      className={cn(
                        "size-4.5 shrink-0 transition-colors",
                        !isProfessional && isActive && "text-primary fill-primary/20",
                        !isProfessional && !isActive && "text-muted-foreground",
                        isProfessional && isActive && "text-white",
                        isProfessional && !isActive && "text-muted-foreground"
                      )}
                    />
                  )}
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={cn(
                      "inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold leading-3.5 shrink-0 transition-colors",
                      item.badgeVariant === "secondary"
                        ? "bg-secondary text-secondary-foreground"
                        : isProfessional && !isActive
                        ? "bg-primary text-white"
                        : isProfessional && isActive
                        ? "bg-white text-primary"
                        : "bg-primary text-white"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            </React.Fragment>
          );
        })
      )}
    </nav>
  );
}

export function ConsumerSidebar({
  items = [],
  className,
  activeItemId,
  onItemSelect,
  ...props
}: SidebarNavProps) {
  return (
      <SidebarNav
        perspective="consumer"
        items={items}
        activeItemId={activeItemId}
        onItemSelect={onItemSelect}
        {...props}
      />
  );
}

export function ProfessionalSidebar({
  items = [],
  className,
  activeItemId,
  onItemSelect,
  ...props
}: SidebarNavProps) {
  return (
      <SidebarNav
        perspective="professional"
        items={items}
        activeItemId={activeItemId}
        onItemSelect={onItemSelect}
        {...props}
      />
  );
}
