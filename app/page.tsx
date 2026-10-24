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
import Header from "@/components/ui/headers";
import {
  HeroSection,
  CategoriesSection,
  FeaturesSection,
  CtaCardsSection,
  type CategoryItem,
  type FeatureItem,
  type CtaCardItem,
} from "@/components/landing";
import { PublicFooter } from "@/components/ui/footers";


export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };
  const handleRegister = () => {
    router.push("/register");
  };
  const handleGetStarted = () => {
    router.push("/register");
  };
  const handleProfessionalJoin = () => {
    router.push("/register?role=professional");
  };
  const handleCategorySelect = (id: string) => {
    router.push(`/category/${id}`);
  };
  const handleConsumerBrowse = () => {
    router.push("/register?role=consumer");
  };
  const handleProListService = () => {
    router.push("/register?role=professional");
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
      <Header variant="landing" onLogin={handleLogin} onRegister={handleRegister} />

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
