"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  getStartedText?: string;
  professionalText?: string;
  onGetStarted?: () => void;
  onProfessionalClick?: () => void;
  heroImage: StaticImageData | string;
  badgeName?: string;
  badgeStatus?: string;
}

export function HeroSection({
  title = "Find Trusted Local Professionals in Nigeria",
  subtitle = "The easiest way to discover and connect with verified service providers for your home and business needs.",
  getStartedText = "Get Started",
  professionalText = "Are you a Professional? Join here",
  onGetStarted,
  onProfessionalClick,
  heroImage,
  badgeName = "ADEBAYO S.",
  badgeStatus = "VERIFIED",
  className,
  ...props
}: HeroSectionProps) {
  const imgSrc =
    typeof heroImage === "string" ? heroImage : heroImage?.src || "/images/three_women.png";

  return (
    <section
      className={cn(
        "w-full px-6 sm:px-8 lg:px-12 py-10 md:py-16 lg:py-20 xl:py-24 bg-secondary/60 border-t border-border font-inter",
        className
      )}
      {...props}
    >
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-6 space-y-6 flex flex-col items-center lg:items-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] text-center lg:text-start">
            {title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-base text-muted-foreground leading-relaxed max-w-lg text-center lg:text-start">
            {subtitle}
          </p>

          <div className="grid grid-cols-1 sm:flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="default"
              size="default"
              onClick={onGetStarted}
              trailingIcon={<ArrowRight className="size-4" />}
              className="h-10 xl:h-14 px-5 xl:px-8 text-sm xl:text-base font-semibold rounded-md shadow-xs"
            >
              {getStartedText}
            </Button>

            <Button
              variant="default"
              size="default"
              onClick={onProfessionalClick}
              className="h-10 xl:h-14 px-5 xl:px-8 text-sm xl:text-base font-semibold rounded-md shadow-xs"
            >
              {professionalText}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-xl">
            <div className="overflow-hidden rounded-2xl shadow-sm border border-border/40 bg-secondary/20">
              <img
                src={imgSrc}
                alt="Local Professionals collaborating"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-4 bg-card border border-border/80 rounded-xl px-4 pr-10 py-3 shadow-lg flex items-center gap-3">
              <div className="size-6 rounded-full bg-success/15 flex items-center justify-center text-success shrink-0">
                <Check className="size-3.5" />
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-wider text-foreground uppercase leading-tight">
                  {badgeName}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-success uppercase leading-tight mt-0.5">
                  {badgeStatus}
                </span>
                <div className="h-0.5 w-full bg-foreground/90 rounded-full mt-1.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
