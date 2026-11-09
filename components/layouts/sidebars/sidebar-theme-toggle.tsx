"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTheme, setTheme } from "@/store/slices/uiSlice";
import { SidebarTooltip } from "./sidebar-tooltip";

export interface SidebarThemeToggleProps {
  isOpen?: boolean;
  className?: string;
}

export function SidebarThemeToggle({
  isOpen = true,
  className,
}: SidebarThemeToggleProps) {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectTheme);
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, [currentTheme]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {}
      dispatch(setTheme("dark"));
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch {}
      dispatch(setTheme("light"));
    }
  };

  const label = isDark ? "Light Mode" : "Dark Mode";

  return (
    <SidebarTooltip content={label} enabled={!isOpen}>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${label}`}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer text-muted-foreground hover:text-foreground hover:bg-secondary/60",
          !isOpen && "justify-center px-0 py-2.5",
          className
        )}
      >
        {isDark ? (
          <Sun className="h-5 w-5 shrink-0 text-amber-500" />
        ) : (
          <Moon className="h-5 w-5 shrink-0" />
        )}
        {isOpen && <span className="truncate">{label}</span>}
      </button>
    </SidebarTooltip>
  );
}

export default SidebarThemeToggle;
