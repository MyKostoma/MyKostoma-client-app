import type { SelectOption } from "@/components/ui/form-fields";
import type {
  SearchFilterCategoryOption,
  SearchProfessionalItem,
} from "@/components/consumer-search";

export const PLUMBING_CATEGORY_OPTIONS: SearchFilterCategoryOption[] = [
  { id: "plumbing", label: "Plumbing Services" },
  { id: "water-treatment", label: "Water Treatment" },
  { id: "solar-heating", label: "Solar Heating" },
];

export const INTERIOR_CATEGORY_OPTIONS: SearchFilterCategoryOption[] = [
  { id: "interior-design", label: "Interior Design" },
  { id: "home-staging", label: "Home Staging" },
  { id: "furniture-design", label: "Furniture Design" },
];

export const GENERAL_CATEGORY_OPTIONS: SearchFilterCategoryOption[] = [
  { id: "plumbing", label: "Plumbing Services" },
  { id: "water-treatment", label: "Water Treatment" },
  { id: "solar-heating", label: "Solar Heating" },
  { id: "interior-design", label: "Interior Design" },
  { id: "home-staging", label: "Home Staging" },
  { id: "furniture-design", label: "Furniture Design" },
  { id: "electricians", label: "Electrical Work" },
  { id: "carpentry", label: "Custom Carpentry" },
  { id: "painting", label: "Painting & Finishes" },
];

export const SEARCH_LOCATION_OPTIONS: SelectOption[] = [
  { value: "all", label: "Lagos, Nigeria" },
  { value: "lagos-mainland", label: "Lagos Mainland" },
  { value: "lekki", label: "Lekki Phase 1" },
  { value: "victoria-island", label: "Victoria Island" },
];

export const SEARCH_SORT_OPTIONS: SelectOption[] = [
  { value: "best-match", label: "Best Match" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "reviews-desc", label: "Most Reviewed" },
];

export const SEARCH_PROFESSIONALS_DATA: SearchProfessionalItem[] = [
  // Screenshot 1: Plumbers in Lagos (Horizontal Cards)
  {
    id: "chidi-okonkwo",
    name: "Chidi Okonkwo",
    subtitle: "Master Plumber • 12 years exp.",
    categoryIds: ["plumbing", "water-treatment"],
    location: "Lekki Phase 1",
    cityGroup: "lekki",
    rating: 4.9,
    reviewCount: 118,
    verification: "individual",
    isTopRated: true,
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    cardVariant: "horizontal",
  },
  {
    id: "aquaflow-services",
    name: "AquaFlow Services",
    subtitle: "Commercial Plumbing",
    categoryIds: ["plumbing", "water-treatment", "solar-heating"],
    location: "Victoria Island",
    cityGroup: "victoria-island",
    rating: 4.7,
    reviewCount: 94,
    verification: "company",
    imageUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
    cardVariant: "horizontal",
  },
  {
    id: "david-henshaw",
    name: "David Henshaw",
    subtitle: "Emergency Specialist",
    categoryIds: ["plumbing"],
    location: "Yaba, Lagos",
    cityGroup: "lagos-mainland",
    rating: 4.5,
    reviewCount: 67,
    verification: "individual",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    cardVariant: "horizontal",
  },
  {
    id: "lagos-plumb-co",
    name: "Lagos Plumb Co.",
    subtitle: "24/7 Support Team",
    categoryIds: ["plumbing", "solar-heating"],
    location: "Apapa, Lagos",
    cityGroup: "lagos-mainland",
    rating: 4.2,
    reviewCount: 53,
    verification: "company",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    cardVariant: "horizontal",
  },

  // Screenshot 2: Interior Designers in Lagos (Studio Cards)
  {
    id: "luxenest-design-studio",
    name: "LuxeNest Design Studio",
    subtitle: "Interior Design • Residential • Commercial",
    categoryIds: ["interior-design", "home-staging", "tailoring"],
    location: "Lekki Phase 1, Lagos",
    cityGroup: "lekki",
    rating: 4.9,
    reviewCount: 142,
    verification: "company",
    isTopRated: true,
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
    cardVariant: "studio",
  },
  {
    id: "urban-space-architects",
    name: "Urban Space Architects",
    subtitle: "Interior Architecture • Space Planning",
    categoryIds: ["interior-design", "home-staging", "furniture-design"],
    location: "Victoria Island, Lagos",
    cityGroup: "victoria-island",
    rating: 4.8,
    reviewCount: 86,
    verification: "company",
    isTopRated: false,
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    cardVariant: "studio",
  },
];
