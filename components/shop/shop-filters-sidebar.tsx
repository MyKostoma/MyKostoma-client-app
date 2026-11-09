"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox, Input } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type { ShopFiltersSidebarProps } from "./types";

function ShopFilterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function ShopFiltersSidebar({
  filters,
  subCategories,
  deliveryOptions,
  levelOptions,
  onToggleSubCategory,
  onPriceChange,
  onToggleDelivery,
  onToggleLevel,
  onApply,
  onReset,
  onClose,
  className,
}: ShopFiltersSidebarProps) {
  return (
    <aside
      aria-label="Service filters"
      className={cn(
        "w-full lg:w-60 xl:w-64 shrink-0 space-y-7 self-start",
        className
      )}
    >
      {onClose && (
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground tracking-tight">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="size-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      <ShopFilterGroup title="Sub-categories">
        <div className="flex flex-col gap-2.5">
          {subCategories.map((item) => {
            const isChecked = filters.subCategories.includes(item.id);
            return (
              <Checkbox
                key={item.id}
                id={`shop-sub-${item.id}`}
                checked={isChecked}
                onCheckedChange={() => onToggleSubCategory(item.id)}
                label={
                  <span className="flex w-full items-center justify-between gap-4 text-xs">
                    <span
                      className={cn(
                        isChecked
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground/80">
                      {item.count}
                    </span>
                  </span>
                }
              />
            );
          })}
        </div>
      </ShopFilterGroup>

      <ShopFilterGroup title="Price range">
        <div className="flex items-center gap-2">
          <Input
            inputMode="numeric"
            placeholder="₦ Min"
            value={filters.minPrice}
            onChange={(event) => onPriceChange("minPrice", event.target.value)}
            aria-label="Minimum price"
            className="h-9 text-xs bg-card"
          />
          <span className="text-muted-foreground/70 text-xs">—</span>
          <Input
            inputMode="numeric"
            placeholder="₦ Max"
            value={filters.maxPrice}
            onChange={(event) => onPriceChange("maxPrice", event.target.value)}
            aria-label="Maximum price"
            className="h-9 text-xs bg-card"
          />
        </div>
      </ShopFilterGroup>

      <ShopFilterGroup title="Delivery time">
        <div className="flex flex-col gap-2.5">
          {deliveryOptions.map((option) => (
            <Checkbox
              key={option.id}
              id={`shop-delivery-${option.id}`}
              checked={filters.deliveryWindows.includes(option.id)}
              onCheckedChange={() => onToggleDelivery(option.id)}
              label={
                <span className="text-xs text-muted-foreground">
                  {option.label}
                </span>
              }
            />
          ))}
        </div>
      </ShopFilterGroup>

      <ShopFilterGroup title="Professional level">
        <div className="flex flex-col gap-2.5">
          {levelOptions.map((option) => (
            <Checkbox
              key={option.id}
              id={`shop-level-${option.id}`}
              checked={filters.levels.includes(option.id)}
              onCheckedChange={() => onToggleLevel(option.id)}
              label={
                <span className="text-xs text-muted-foreground">
                  {option.label}
                </span>
              }
            />
          ))}
        </div>
      </ShopFilterGroup>

      <div className="space-y-2 pt-1">
        <Button
          variant="default"
          size="default"
          onClick={onApply}
          className="w-full h-10 xl:h-10 text-xs font-bold uppercase tracking-wider rounded-lg shadow-2xs"
        >
          Apply Filters
        </Button>
        <button
          type="button"
          onClick={onReset}
          className="w-full text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors cursor-pointer py-1"
        >
          Reset filters
        </button>
      </div>
    </aside>
  );
}

