"use client";

import { Filter, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/form-fields";
import { ShopBreadcrumb } from "@/components/shop/shop-breadcrumb";
import { ShopFiltersSidebar } from "@/components/shop/shop-filters-sidebar";
import { ShopServiceGrid } from "@/components/shop/shop-service-grid";
import type { ShopFiltersSidebarProps } from "@/components/shop/types";
import {
  SHOP_DELIVERY_OPTIONS,
  SHOP_LEVEL_OPTIONS,
  SHOP_SORT_OPTIONS,
} from "./data";
import { useShopCategoryService } from "./services/shopApi";
import type { ShopCategoryViewProps, ShopSortOption } from "./types";

export function ShopCategoryView({ categoryId }: ShopCategoryViewProps) {
  const {
    category,
    draftFilters,
    activeFilterCount,
    sortBy,
    setSortBy,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    visibleServices,
    savedServiceIds,
    shopHomeHref,
    handleToggleSubCategory,
    handlePriceChange,
    handleToggleDelivery,
    handleToggleLevel,
    handleApplyFilters,
    handleResetFilters,
    handleNavigate,
    handleOpenService,
    handleToggleSave,
  } = useShopCategoryService(categoryId);

  const sidebarProps: ShopFiltersSidebarProps = {
    filters: draftFilters,
    subCategories: category.subCategories,
    deliveryOptions: SHOP_DELIVERY_OPTIONS,
    levelOptions: SHOP_LEVEL_OPTIONS,
    onToggleSubCategory: handleToggleSubCategory,
    onPriceChange: handlePriceChange,
    onToggleDelivery: handleToggleDelivery,
    onToggleLevel: handleToggleLevel,
    onApply: handleApplyFilters,
    onReset: handleResetFilters,
  };

  const sortSelect = (
    <div className="flex items-center gap-2.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground shrink-0 hidden xs:inline">
        Sort by:
      </span>
      <div className="w-44">
        <Select
          options={SHOP_SORT_OPTIONS}
          value={sortBy}
          onChange={(value) => setSortBy(value as ShopSortOption)}
          className="h-9 text-xs font-semibold"
        />
      </div>
    </div>
  );

  return (
    <main className="flex-1 container px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
      <ShopBreadcrumb
        onNavigate={handleNavigate}
        items={[
          { label: "Home", href: "/home" },
          { label: "Shop", href: shopHomeHref },
          { label: category.name },
        ]}
      />

      <header className="space-y-3 max-w-3xl">
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
          {category.name} Services
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {category.description}
        </p>
      </header>

      {mobileFiltersOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Service filters drawer"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-xs sm:max-w-sm h-full bg-card text-foreground shadow-2xl animate-in slide-in-from-left duration-200 overflow-y-auto no-scrollbar p-5 sm:p-6">
            <ShopFiltersSidebar
              {...sidebarProps}
              onClose={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
        <div className="hidden lg:block shrink-0">
          <ShopFiltersSidebar {...sidebarProps} />
        </div>

        <div className="flex-1 w-full min-w-0 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                aria-label="Open service filters"
                className="lg:hidden inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-card hover:bg-secondary text-foreground text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              >
                <Filter className="size-4 text-primary shrink-0" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="size-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <p className="text-xs sm:text-sm text-muted-foreground">
                <span className="font-bold text-foreground">
                  {visibleServices.length}
                </span>{" "}
                services available
              </p>
            </div>

            {sortSelect}
          </div>

          {visibleServices.length === 0 ? (
            <div className="w-full rounded-2xl border border-dashed border-border bg-card/60 p-8 sm:p-12 text-center flex flex-col items-center space-y-4">
              <div className="size-16 rounded-2xl bg-secondary/80 flex items-center justify-center shadow-2xs">
                <FilterX className="size-8 text-muted-foreground/70" />
              </div>
              <div className="space-y-1.5 max-w-md">
                <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                  No services found
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No services match your current filters. Try broadening your
                  criteria or clearing the filters.
                </p>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={handleResetFilters}
                className="h-9 px-4 text-xs font-semibold rounded-lg shadow-2xs"
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <ShopServiceGrid
              services={visibleServices}
              savedServiceIds={savedServiceIds}
              actionIcon="bookmark"
              columns={3}
              onOpen={handleOpenService}
              onToggleSave={handleToggleSave}
            />
          )}
        </div>
      </div>
    </main>
  );
}

