"use client";

import { Button } from "@/components/ui/button";
import {
  Plus,
  ArrowRight,
  Upload,
  ChevronRight,
  Filter,
  ChevronDown,
  Trash2,
  AlertTriangle,
  X,
  MoreHorizontal,
  Search,
  Bell,
  User,
  Settings,
  Send,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect } from "react";

export function ButtonShowcase() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(hasDarkClass);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        if (e.matches) {
          document.documentElement.classList.add("dark");
          setIsDark(true);
        } else {
          document.documentElement.classList.remove("dark");
          setIsDark(false);
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {}
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch {}
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
            V1.0.0
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            MyKostoma <span className="text-primary transition-colors">Button System</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Comprehensive UI components for standardized actions and triggers.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          aria-label={mounted && isDark ? "Switch to light mode" : "Switch to dark mode"}
          leadingIcon={
            mounted && isDark ? (
              <Sun className="size-4 text-warning" />
            ) : (
              <Moon className="size-4 text-foreground" />
            )
          }
          className="transition-colors shadow-xs"
        >
          {mounted && isDark ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>

      {/* 01 Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-1.5 h-5 bg-primary rounded-full inline-block transition-colors" />
          {mounted && isDark ? "01 Dark Mode Variants" : "01 Light Mode Variants"}
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border bg-card p-6 shadow-xs transition-colors">
          <div className="min-w-175 space-y-6">
            <div className="grid grid-cols-6 text-xs font-semibold uppercase text-muted-foreground tracking-wider pb-3 border-b border-border">
              <div>Type</div>
              <div>Default</div>
              <div>Hover / Active</div>
              <div>Leading Icon</div>
              <div>Trailing Icon</div>
              <div>Loading</div>
            </div>

            {/* Primary Row */}
            <div className="grid grid-cols-6 items-center gap-4">
              <div>
                <p className="font-semibold text-sm text-foreground">Primary</p>
                <p className="text-xs text-muted-foreground font-mono">
                  var(--primary)
                </p>
              </div>
              <div>
                <Button variant="default">Action</Button>
              </div>
              <div>
                <Button variant="default" className="bg-primary-hover">
                  Action
                </Button>
              </div>
              <div>
                <Button variant="default" leadingIcon={<Plus />}>
                  Create
                </Button>
              </div>
              <div>
                <Button variant="default" trailingIcon={<ArrowRight />}>
                  Next
                </Button>
              </div>
              <div>
                <Button variant="default" loading loadingText="Loading" />
              </div>
            </div>

            {/* Secondary Row */}
            <div className="grid grid-cols-6 items-center gap-4">
              <div>
                <p className="font-semibold text-sm text-foreground">Secondary</p>
                <p className="text-xs text-muted-foreground font-mono">
                  var(--secondary)
                </p>
              </div>
              <div>
                <Button variant="secondary">Action</Button>
              </div>
              <div>
                <Button variant="secondary" className="bg-secondary-hover">
                  Action
                </Button>
              </div>
              <div>
                <Button variant="secondary" leadingIcon={<Upload />}>
                  Export
                </Button>
              </div>
              <div>
                <Button variant="secondary" trailingIcon={<ChevronRight />}>
                  Setup
                </Button>
              </div>
              <div>
                <Button variant="secondary" loading loadingText="Waiting" />
              </div>
            </div>

            {/* Outline Row */}
            <div className="grid grid-cols-6 items-center gap-4">
              <div>
                <p className="font-semibold text-sm text-foreground">Outline</p>
                <p className="text-xs text-muted-foreground font-mono">
                  var(--border)
                </p>
              </div>
              <div>
                <Button variant="outline-subtle">Action</Button>
              </div>
              <div>
                <Button variant="outline-subtle" className="bg-muted">
                  Action
                </Button>
              </div>
              <div>
                <Button variant="outline-subtle" leadingIcon={<Filter />}>
                  Filter
                </Button>
              </div>
              <div>
                <Button variant="outline-subtle" trailingIcon={<ChevronDown />}>
                  Select
                </Button>
              </div>
              <div>
                <Button variant="outline-subtle" loading loadingText="Syncing" />
              </div>
            </div>

            {/* Destructive Row */}
            <div className="grid grid-cols-6 items-center gap-4">
              <div>
                <p className="font-semibold text-sm text-foreground">Destructive</p>
                <p className="text-xs text-muted-foreground font-mono">
                  var(--destructive)
                </p>
              </div>
              <div>
                <Button variant="destructive-solid">Delete</Button>
              </div>
              <div>
                <Button variant="destructive-solid" className="bg-destructive-hover">
                  Delete
                </Button>
              </div>
              <div>
                <Button variant="destructive-solid" leadingIcon={<Trash2 />}>
                  Remove
                </Button>
              </div>
              <div>
                <Button variant="destructive-solid" trailingIcon={<AlertTriangle />}>
                  Confirm
                </Button>
              </div>
              <div>
                <Button variant="destructive-solid" loading loadingText="Erasing" />
              </div>
            </div>

            {/* Ghost Row */}
            <div className="grid grid-cols-6 items-center gap-4">
              <div>
                <p className="font-semibold text-sm text-foreground">Ghost</p>
                <p className="text-xs text-muted-foreground font-mono">
                  transparent
                </p>
              </div>
              <div>
                <Button variant="ghost">Cancel</Button>
              </div>
              <div>
                <Button variant="ghost" className="bg-muted">
                  Cancel
                </Button>
              </div>
              <div>
                <Button variant="ghost" leadingIcon={<X />}>
                  Close
                </Button>
              </div>
              <div>
                <Button variant="ghost" trailingIcon={<MoreHorizontal />}>
                  Options
                </Button>
              </div>
              <div>
                <Button variant="ghost" loading loadingText="Processing" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Sizing System & 03 Interaction States */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 02 Sizing System */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span className="w-1.5 h-5 bg-primary rounded-full inline-block transition-colors" />
            02 Sizing System
          </h2>
          <div className="rounded-lg border border-border bg-card p-6 space-y-6 shadow-xs transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-border text-xs font-semibold uppercase text-muted-foreground tracking-wider">
              <span>Scale</span>
              <span>Preview</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Small (h-8)</span>
              <Button size="sm">Small Button</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Default (h-10)</span>
              <Button size="default">Default Button</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Large (h-12)</span>
              <Button size="lg">Large Button</Button>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-3">
                Icon-Only Variants
              </p>
              <div className="flex items-center gap-3">
                <Button variant="outline-subtle" size="icon" aria-label="Search">
                  <Search />
                </Button>
                <Button variant="outline-subtle" size="icon" aria-label="Notifications">
                  <Bell />
                </Button>
                <Button variant="outline-subtle" size="icon" aria-label="User Account">
                  <User />
                </Button>
                <Button size="icon-full" aria-label="Add New">
                  <Plus />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 03 Interaction States */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span className="w-1.5 h-5 bg-primary rounded-full inline-block transition-colors" />
            03 Interaction States
          </h2>
          <div className="rounded-lg border border-border bg-card p-6 grid grid-cols-2 gap-4 shadow-xs transition-colors">
            {/* Focused State */}
            <div className="rounded-md border border-border/60 p-4 space-y-2">
              <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block">
                Focused
              </span>
              <Button className="w-full ring-4 ring-ring/30">
                Focused Button
              </Button>
            </div>

            {/* Disabled State */}
            <div className="rounded-md border border-border/60 p-4 space-y-2">
              <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block">
                Disabled
              </span>
              <Button disabled variant="disabled" className="w-full">
                Disabled Button
              </Button>
            </div>

            {/* Link Default */}
            <div className="rounded-md border border-border/60 p-4 space-y-2">
              <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block">
                Link (Default)
              </span>
              <Button variant="link">Forgot password?</Button>
            </div>

            {/* Link Destructive */}
            <div className="rounded-md border border-border/60 p-4 space-y-2">
              <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block">
                Link (Destructive)
              </span>
              <Button variant="link-destructive">Unsubscribe me</Button>
            </div>
          </div>
        </section>
      </div>

      {/* 04 Dark Mode Assets */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-1.5 h-5 bg-primary rounded-full inline-block" />
          04 Dark Mode Assets
        </h2>
        <div className="dark rounded-xl bg-card text-card-foreground p-8 border border-border shadow-lg space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <Moon className="size-4 text-primary" />
              <span className="font-semibold text-sm">Night Environment Theme</span>
            </div>
            <span className="text-xs font-mono text-[#E86040]">PRIMARY: #E86040</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-start">
            {/* Dark Primary */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block">
                Primary
              </span>
              <Button variant="default" className="w-full">
                Confirm
              </Button>
              <Button variant="outline-primary" className="w-full">
                Outline
              </Button>
            </div>

            {/* Dark Secondary */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block">
                Secondary
              </span>
              <Button variant="secondary" className="w-full">
                Action
              </Button>
              <Button variant="secondary" className="w-full">
                Action
              </Button>
            </div>

            {/* Dark Ghost */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block">
                Ghost
              </span>
              <Button variant="ghost" className="w-full">
                Dismiss
              </Button>
              <Button
                variant="link"
                className="w-full justify-center gap-1.5"
                trailingIcon={<ArrowRight className="size-4" />}
              >
                Explore
              </Button>
            </div>

            {/* Dark Utilities */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block">
                Utilities
              </span>
              <div className="flex items-center gap-3">
                <Button variant="secondary" size="icon" aria-label="Settings">
                  <Settings className="size-4.5" />
                </Button>
                <Button size="icon-full" aria-label="Send">
                  <Send className="size-4" />
                </Button>
              </div>
              <Button
                variant="destructive"
                className="w-full"
                leadingIcon={<Trash2 className="size-4" />}
              >
                Delete Task
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
