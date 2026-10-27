import {
  Camera,
  Hammer,
  Home,
  Paintbrush,
  Settings,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type {
  ConsumerCategoryItem,
  FeaturedProItem,
  SpotlightProviderItem,
} from "@/components/consumer-home";

export const DEFAULT_CONSUMER_CATEGORIES: ConsumerCategoryItem[] = [
  {
    id: "plumbing",
    name: "Plumbing",
    countLabel: "128 Professionals",
    icon: Home,
  },
  {
    id: "electricians",
    name: "Electricians",
    countLabel: "94 Professionals",
    icon: Settings,
  },
  {
    id: "tailoring",
    name: "Tailoring",
    countLabel: "64 Professionals",
    icon: Camera,
  },
  {
    id: "carpentry",
    name: "Carpentry",
    countLabel: "82 Professionals",
    icon: Hammer,
  },
  {
    id: "painting",
    name: "Painting",
    countLabel: "45 Professionals",
    icon: Paintbrush,
  },
  {
    id: "security",
    name: "Security",
    countLabel: "31 Professionals",
    icon: ShieldCheck,
  },
];

export const DEFAULT_FEATURED_PROFESSIONALS: FeaturedProItem[] = [
  {
    id: "david-peterson",
    name: "David Peterson",
    specialty: "MASTER PLUMBER",
    location: "Brooklyn, New York",
    rating: "4.9",
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    badgeText: "VERIFIED PRO",
    badgeVariant: "verified",
    showQuickAction: true,
    statLabel: "PROJECTS",
    statValue: "142 Completed",
  },
  {
    id: "voltsmart-solutions",
    name: "VoltSmart Solutions",
    specialty: "ELECTRICAL SYSTEMS",
    location: "Manhattan, NY",
    rating: "5.0",
    imageUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
    badgeText: "CORPORATE PARTNER",
    badgeVariant: "corporate",
    showQuickAction: true,
    statLabel: "TEAM SIZE",
    statValue: "12 Certified Pros",
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    specialty: "INTERIOR DESIGNER",
    location: "Queens, New York",
    rating: "4.8",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    badgeText: "VERIFIED PRO",
    badgeVariant: "verified",
    showQuickAction: false,
    statLabel: "EXPERIENCE",
    statValue: "8+ Years",
  },
  {
    id: "marcus-thorne",
    name: "Marcus Thorne",
    specialty: "CUSTOM CARPENTRY",
    location: "Jersey City, NJ",
    rating: "4.9",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    badgeText: "VERIFIED PRO",
    badgeVariant: "verified",
    showQuickAction: false,
    statLabel: "RATING",
    statValue: "230 Reviews",
  },
];

export const DEFAULT_SPOTLIGHT_PROVIDERS: SpotlightProviderItem[] = [
  {
    id: "precision-painting-llc",
    name: "Precision Painting LLC",
    category: "Commercial & Residential",
    matchText: "98% Match",
    icon: Paintbrush,
  },
  {
    id: "apex-electrical-group",
    name: "Apex Electrical Group",
    category: "Smart Home & Wiring",
    matchText: "96% Match",
    icon: Zap,
  },
];
