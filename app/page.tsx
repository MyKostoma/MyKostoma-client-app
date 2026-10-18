"use client";

import { useState } from "react";
import { ButtonShowcase } from "@/components/button-showcase";
import { FormShowcase } from "@/components/form-showcase";
import { NavigationShowcase } from "@/components/navigation-showcase";
import { LayoutGrid, CheckSquare, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"navigation" | "forms" | "buttons">(
    "navigation"
  );

  return (
    <main className="min-h-screen bg-background text-foreground antialiased transition-colors duration-200">
      {/* Design System Global Switcher Header Bar */}
      <div className="border-b border-border bg-card/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:inline-block">
              Design System:
            </span>
            <div className="inline-flex items-center p-1 rounded-lg bg-secondary/80 border border-border/60">
              <button
                type="button"
                onClick={() => setActiveTab("navigation")}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer",
                  activeTab === "navigation"
                    ? "bg-card text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Compass className="size-3.5 text-primary" />
                Navigation
                <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.2 rounded-full">
                  New
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("forms")}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer",
                  activeTab === "forms"
                    ? "bg-card text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <CheckSquare className="size-3.5 text-muted-foreground" />
                Form System
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("buttons")}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer",
                  activeTab === "buttons"
                    ? "bg-card text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid className="size-3.5 text-muted-foreground" />
                Button System
              </button>
            </div>
          </div>

          <div className="text-xs text-muted-foreground font-mono">
            MyKostoma UI v1.0.0
          </div>
        </div>
      </div>

      {/* Main Showcase View */}
      <div className="py-6">
        {activeTab === "navigation" && <NavigationShowcase />}
        {activeTab === "forms" && <FormShowcase />}
        {activeTab === "buttons" && <ButtonShowcase />}
      </div>
    </main>
  );
}
