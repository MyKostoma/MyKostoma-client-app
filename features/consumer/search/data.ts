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
  { id: "cleaning", label: "Cleaning Services" },
  { id: "hvac", label: "HVAC & AC Repair" },
  { id: "solar-energy", label: "Solar & Inverter" },
  { id: "tailoring", label: "Bespoke Tailoring" },
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

  {
    id: "voltsmart-solutions",
    name: "VoltSmart Solutions",
    subtitle: "Electrical Systems • Commercial & Residential",
    categoryIds: ["electricians"],
    location: "Victoria Island, Lagos",
    cityGroup: "victoria-island",
    rating: 5.0,
    reviewCount: 98,
    verification: "company",
    isTopRated: true,
    imageUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
    cardVariant: "horizontal",
  },
  {
    id: "tunde-balogun",
    name: "Tunde Balogun",
    subtitle: "Certified Electrician • 9 years exp.",
    categoryIds: ["electricians"],
    location: "Lekki Phase 1, Lagos",
    cityGroup: "lekki",
    rating: 4.8,
    reviewCount: 62,
    verification: "individual",
    imageUrl:
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    cardVariant: "horizontal",
  },
  {
    id: "marcus-thorne",
    name: "Marcus Thorne",
    subtitle: "Custom Carpentry & Woodcraft",
    categoryIds: ["carpentry", "furniture-design"],
    location: "Yaba, Lagos",
    cityGroup: "lagos-mainland",
    rating: 4.9,
    reviewCount: 230,
    verification: "individual",
    isTopRated: true,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    cardVariant: "horizontal",
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    subtitle: "Architectural Finishes & Interior Painting",
    categoryIds: ["painting"],
    location: "Victoria Island, Lagos",
    cityGroup: "victoria-island",
    rating: 4.9,
    reviewCount: 95,
    verification: "individual",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    cardVariant: "horizontal",
  },
  {
    id: "apex-climate-systems",
    name: "Apex Climate Systems",
    subtitle: "HVAC & AC Repair Specialist",
    categoryIds: ["hvac"],
    location: "Ikeja, Lagos",
    cityGroup: "lagos-mainland",
    rating: 5.0,
    reviewCount: 112,
    verification: "company",
    isTopRated: true,
    imageUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
    cardVariant: "horizontal",
  },
  {
    id: "sparkleclean-lagos",
    name: "SparkleClean Lagos",
    subtitle: "Deep Cleaning & Janitorial Services",
    categoryIds: ["cleaning"],
    location: "Lekki Phase 1, Lagos",
    cityGroup: "lekki",
    rating: 4.8,
    reviewCount: 88,
    verification: "company",
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    cardVariant: "horizontal",
  },
  {
    id: "malik-adebayo",
    name: "Malik Adebayo",
    subtitle: "Solar & Inverter Technician",
    categoryIds: ["solar-energy", "solar-heating"],
    location: "Surulere, Lagos",
    cityGroup: "lagos-mainland",
    rating: 4.9,
    reviewCount: 64,
    verification: "individual",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    cardVariant: "horizontal",
  },
  {
    id: "clara-vance",
    name: "Clara Vance",
    subtitle: "Bespoke Tailoring & Alterations",
    categoryIds: ["tailoring"],
    location: "Ikoyi, Lagos",
    cityGroup: "victoria-island",
    rating: 4.8,
    reviewCount: 184,
    verification: "individual",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    cardVariant: "horizontal",
  },
];
