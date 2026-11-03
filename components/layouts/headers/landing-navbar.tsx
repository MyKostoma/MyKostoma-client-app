"use client";

import Link from "next/link";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useHeaders } from "@/components/layouts/hooks/useHeaders";
import type { LandingNavbarProps } from "./types";

export function LandingNavbar({
  logoHref = "/",
  onLogin,
  onRegister,
  onLogout,
  isAuthenticated,
  className,
  ...props
}: LandingNavbarProps) {
  const {
    isUserLoggedIn,
    handleLogout,
    handleLogin,
    handleRegister,
    isDark,
    mounted,
    toggleTheme,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useHeaders({
    isAuthenticated,
    onLogin,
    onRegister,
    onLogout,
  });

  return (
    <header
      className={cn(
        "w-full bg-card/90 backdrop-blur-md sticky top-0 z-50 transition-colors",
        className
      )}
      {...props}
    >
      <div className="container px-3 sm:px-4 lg:px-6 xl:px-0 py-4 sm:py-5 flex items-center justify-between">
        <Link
          href={logoHref}
          className="inline-flex items-center transition-opacity hover:opacity-90"
          aria-label="MyKostoma Home"
        >
          <img
            src="/mykostoma_full_logo.png"
            alt="MyKostoma"
            className="h-7 sm:h-8 w-auto object-contain dark:hidden select-none"
          />
          <img
            src="/mykostoma_full_logo_white.png"
            alt="MyKostoma"
            className="h-7 sm:h-8 w-auto object-contain hidden dark:block select-none"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            aria-label={
              mounted && isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            leadingIcon={
              mounted && isDark ? (
                <Sun className="size-4 text-warning" />
              ) : (
                <Moon className="size-4 text-foreground" />
              )
            }
            className="transition-colors border-0 bg-transparent shadow-none"
          />

          <div className="hidden md:flex items-center gap-3">
            {isUserLoggedIn ? (
              <Button
                variant="default"
                size="sm"
                onClick={handleLogout}
                className="h-8 px-4 text-xs font-semibold rounded-md shadow-2xs"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleLogin}
                  className="h-8 px-4 text-xs font-semibold rounded-md shadow-2xs"
                >
                  Login
                </Button>

                <Button
                  variant="default"
                  size="sm"
                  onClick={handleRegister}
                  className="h-8 px-4 text-xs font-semibold rounded-md shadow-2xs"
                >
                  Register
                </Button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden size-9 rounded-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/70 bg-card px-4 py-4 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-150">
          {isUserLoggedIn ? (
            <Button
              variant="default"
              size="sm"
              onClick={handleLogout}
              className="w-full h-10 text-xs font-semibold rounded-lg shadow-2xs justify-center"
            >
              Logout
            </Button>
          ) : (
            <div className="flex flex-col gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogin}
                className="w-full h-10 text-xs font-semibold rounded-lg justify-center"
              >
                Login
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={handleRegister}
                className="w-full h-10 text-xs font-semibold rounded-lg shadow-2xs justify-center"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export const LandingHeader = LandingNavbar;
export default LandingNavbar;

