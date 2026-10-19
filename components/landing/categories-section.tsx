"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CategoryItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

export interface CategoriesSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  categories: CategoryItem[];
}

function CategoryCard({ item }: { item: CategoryItem }) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={item.onClick}
      className={cn(
        "w-full h-32 sm:h-36 rounded-2xl bg-secondary/40 hover:bg-secondary/70 border border-border/50 hover:border-primary/30",
        "flex flex-col items-center justify-center text-center p-4 transition-all duration-150 cursor-pointer",
        "shadow-2xs hover:shadow-xs active:scale-[0.98] group"
      )}
    >
      <div className="text-foreground/80 group-hover:text-primary transition-colors">
        <Icon className="size-6" />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-foreground mt-3 tracking-tight">
        {item.name}
      </span>
    </button>
  );
}

export function CategoriesSection({
  title = "Explore Our Top Categories",
  subtitle = "Whatever the job, big or small, we have the right professionals ready to assist you anywhere in Nigeria.",
  categories,
  className,
  ...props
}: CategoriesSectionProps) {
  return (
    <section
      className={cn(
        "w-full container px-6 sm:px-8 lg:px-12 py-12 sm:py-16",
        className
      )}
      {...props}
    >
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} item={category} />
        ))}
      </div>
    </section>
  );
}
