import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Search, Grid, LayoutDashboard, UserCheck } from "lucide-react";
import Header from "@/components/layouts/headers/headers";
import { Footer } from "@/components/layouts/footers/footers";
import { PAGE_METADATA } from "@/config/metadata";
import { NotFoundActions } from "./not-found-actions";

export const metadata: Metadata = PAGE_METADATA.notFound;

export default function NotFoundPage() {
  const quickLinks = [
    {
      title: "Find Professionals",
      description: "Discover verified artisans, technicians, and creatives",
      href: "/search",
      icon: Search,
    },
    {
      title: "Browse Categories",
      description: "Explore all available service industries across Nigeria",
      href: "/category",
      icon: Grid,
    },
    {
      title: "Your Dashboard",
      description: "Manage your ongoing bookings, requests, and activity",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Authentication",
      description: "Sign in or create a free account on MyKostoma",
      href: "/login",
      icon: UserCheck,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-inter selection:bg-primary/20 selection:text-primary">
      {/* Navigation Header */}
      <div className="w-full bg-card/90 backdrop-blur-xs border-b border-border/70 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Header
            variant="landing"
            className="rounded-none border-0 shadow-none px-0 py-3.5"
          />
        </div>
      </div>

      {/* Main 404 Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="w-full max-w-2xl text-center flex flex-col items-center">
          {/* Visual Icon Badge */}
          <div className="relative mb-6">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-xs">
              <Compass className="h-10 w-10 sm:h-12 sm:w-12 animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-primary" />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground border border-primary/20 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>404 Error</span>
          </div>

          {/* Headings */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Page Not Found
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            Sorry, we couldn&apos;t find the page you were looking for. The link may
            be outdated, broken, or the page may have been removed.
          </p>

          {/* Primary Action Buttons */}
          <NotFoundActions />

          {/* Quick Links Grid */}
          <div className="w-full mt-12 pt-8 border-t border-border/70 text-left">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 text-center">
              Popular Destinations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="group flex items-start gap-3.5 p-3.5 rounded-2xl bg-card border border-border/80 hover:border-primary/40 hover:bg-secondary/40 transition-all duration-200 shadow-2xs"
                  >
                    <div className="p-2 rounded-xl bg-secondary group-hover:bg-primary/10 group-hover:text-primary text-muted-foreground transition-colors shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {link.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {link.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer variant="public" />
    </div>
  );
}
