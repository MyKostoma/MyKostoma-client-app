"use client";

import { useRouter } from "next/navigation";
import {
  Zap,
  Scissors,
  Car,
  PaintRoller,
  MoreHorizontal,
  ShieldCheck,
  Lock,
  MapPin,
  Mop,
  Faucet,
  CodeSquare,
} from "lucide-react";
import { threeWomen } from "@/lib";
import Header from "@/components/layouts/headers/headers";
import { HeroSection } from "@/components/landing/hero-section";
import { CategoriesSection, type CategoryItem } from "@/components/landing/categories-section";
import { FeaturesSection, type FeatureItem } from "@/components/landing/features-section";
import { CtaCardsSection, type CtaCardItem } from "@/components/landing/cta-cards-section";
import { PublicFooter } from "@/components/layouts/footers/footers";
import { useAppDispatch } from "@/store/hooks";
import {
  clearRegistrationRole,
  setRegistrationRole,
  logout,
} from "@/store/slices/authSlice";
import { setActivePerspective } from "@/store/slices/uiSlice";
import { clearAuthCookies } from "@/lib/cookies";
import { baseApi } from "@/store/api/baseApi";

export function LandingView() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    router.push("/login");
  };
  const handleRegister = () => {
    dispatch(clearRegistrationRole());
    router.push("/register");
  };
  const handleLogout = () => {
    dispatch(logout());
    clearAuthCookies();
    dispatch(baseApi.util.resetApiState());
  };
  const handleGetStarted = () => {
    dispatch(clearRegistrationRole());
    router.push("/register");
  };
  const handleProfessionalJoin = () => {
    dispatch(setRegistrationRole("professional"));
    dispatch(setActivePerspective("professional"));
    router.push("/register");
  };
  const handleCategorySelect = (id: string) => {
    router.push(`/search/category/${id}`);
  };
  const handleConsumerBrowse = () => {
    dispatch(setRegistrationRole("consumer"));
    dispatch(setActivePerspective("consumer"));
    router.push("/register");
  };
  const handleProListService = () => {
    dispatch(setRegistrationRole("professional"));
    dispatch(setActivePerspective("professional"));
    router.push("/register");
  };

  const categories: CategoryItem[] = [
    {
      id: "cleaning",
      name: "Cleaning",
      icon: Mop,
      onClick: () => handleCategorySelect("cleaning"),
    },
    {
      id: "plumbing",
      name: "Plumbing",
      icon: Faucet,
      onClick: () => handleCategorySelect("plumbing"),
    },
    {
      id: "electrical",
      name: "Electrical",
      icon: Zap,
      onClick: () => handleCategorySelect("electrical"),
    },
    {
      id: "beauty-spa",
      name: "Beauty & Spa",
      icon: Scissors,
      onClick: () => handleCategorySelect("beauty-spa"),
    },
    {
      id: "mechanic",
      name: "Mechanic",
      icon: Car,
      onClick: () => handleCategorySelect("mechanic"),
    },
    {
      id: "it-support",
      name: "IT Support",
      icon: CodeSquare,
      onClick: () => handleCategorySelect("it-support"),
    },
    {
      id: "painting",
      name: "Painting",
      icon: PaintRoller,
      onClick: () => handleCategorySelect("painting"),
    },
    {
      id: "view-all",
      name: "View All",
      icon: MoreHorizontal,
      onClick: () => handleCategorySelect("view-all"),
    },
  ];

  const features: FeatureItem[] = [
    {
      id: "verified-professionals",
      title: "Verified Professionals",
      description:
        "Every professional undergoes a rigorous background check and verification process for your peace of mind.",
      icon: ShieldCheck,
    },
    {
      id: "secure-payments",
      title: "Secure Payments",
      description:
        "We provide a secure escrow system. Payment is only released to the professional after you are satisfied with the work.",
      icon: Lock,
    },
    {
      id: "local-expertise",
      title: "Local Expertise",
      description:
        "Connect with professionals who understand the Nigerian market and local community requirements.",
      icon: MapPin,
    },
  ];

  const ctaCards: CtaCardItem[] = [
    {
      id: "for-consumers",
      title: "For Consumers",
      description:
        "Find the best help for your home or business. Fast, reliable, and verified.",
      buttonText: "Browse Categories",
      onButtonClick: handleConsumerBrowse,
    },
    {
      id: "for-professionals",
      title: "For Professionals",
      description:
        "Grow your business and reach more customers across Nigeria with ease.",
      buttonText: "List Your Service",
      onButtonClick: handleProListService,
    },
  ];

  return (
    <div className="min-h-screen bg-card text-foreground transition-colors selection:bg-primary/20 selection:text-primary font-inter">
      <Header
        variant="landing"
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
      />

      <main className="">
        <HeroSection
          heroImage={threeWomen}
          onGetStarted={handleGetStarted}
          onProfessionalClick={handleProfessionalJoin}
        />

        <CategoriesSection categories={categories} />

        <div className="w-full bg-secondary/40 transition-colors">
          <FeaturesSection features={features} />
        </div>

        <CtaCardsSection cards={ctaCards} />
      </main>

      <PublicFooter />
    </div>
  );
}

