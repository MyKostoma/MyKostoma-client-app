import type { SelectOption } from "@/components/ui/form-fields";
import type {
  SearchFilterCategoryOption,
  SearchProfessionalItem,
} from "@/components/consumer-search";

export const SEARCH_CATEGORY_OPTIONS: SearchFilterCategoryOption[] = [
  { id: "plumbing", label: "Plumbing Services" },
  { id: "water-treatment", label: "Water Treatment" },
  { id: "solar-heating", label: "Solar Heating" },
  { id: "electricians", label: "Electrical Work" },
  { id: "carpentry", label: "Custom Carpentry" },
  { id: "furniture-design", label: "Furniture Design" },
  { id: "painting", label: "Painting & Finishes" },
  { id: "interior-design", label: "Interior Design" },
  { id: "home-staging", label: "Home Staging" },
  { id: "cleaning", label: "Cleaning Services" },
  { id: "hvac", label: "HVAC & AC Repair" },
  { id: "tailoring", label: "Bespoke Tailoring" },
  { id: "security", label: "Security & Surveillance" },
  { id: "roofing", label: "Roofing & Gutters" },
  { id: "landscaping", label: "Landscaping & Gardening" },
  { id: "auto-mechanics", label: "Auto Mechanics" },
  { id: "appliance-repair", label: "Appliance Repair" },
  { id: "welding", label: "Welding & Metalwork" },
  { id: "pest-control", label: "Pest Control" },
  { id: "moving", label: "Moving Services" },
  { id: "solar-energy", label: "Solar & Inverter" },
  { id: "cctv-smart-home", label: "CCTV & Smart Home" },
  { id: "locksmith", label: "Locksmith Services" },
  { id: "catering", label: "Catering & Events" },
];

export const GENERAL_CATEGORY_OPTIONS = SEARCH_CATEGORY_OPTIONS;

export const SEARCH_SORT_OPTIONS: SelectOption[] = [
  { value: "best-match", label: "Best Match" },
  { value: "rating-desc", label: "Highest Rated (5.0 - 1.0)" },
  { value: "rating-asc", label: "Lowest Rated (1.0 - 5.0)" },
  { value: "reviews-desc", label: "Most Reviewed" },
  { value: "reviews-asc", label: "Least Reviewed" },
  { value: "name-asc", label: "Name (A - Z)" },
  { value: "name-desc", label: "Name (Z - A)" },
];

export const SEARCH_PROFESSIONALS_DATA: SearchProfessionalItem[] = [
  {
    id: "chidi-okonkwo",
    name: "Chidi Okonkwo",
    subtitle: "Master Plumber • 12 years exp.",
    categoryIds: ["plumbing", "water-treatment"],
    location: "Lekki Phase 1, Lagos",
    cityGroup: "lekki",
    rating: 4.9,
    reviewCount: 118,
    verification: "individual",
    isTopRated: true,
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "aquaflow-services",
    name: "AquaFlow Services",
    subtitle: "Commercial Plumbing",
    categoryIds: ["plumbing", "water-treatment", "solar-heating"],
    location: "Victoria Island, Lagos",
    cityGroup: "victoria-island",
    rating: 4.6,
    reviewCount: 94,
    verification: "company",
    imageUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "david-henshaw",
    name: "David Henshaw",
    subtitle: "Emergency Specialist",
    categoryIds: ["plumbing"],
    location: "Yaba, Lagos",
    cityGroup: "lagos-mainland",
    rating: 3.8,
    reviewCount: 67,
    verification: "individual",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lagos-plumb-co",
    name: "Lagos Plumb Co.",
    subtitle: "24/7 Support Team",
    categoryIds: ["plumbing", "solar-heating"],
    location: "Apapa, Lagos",
    cityGroup: "lagos-mainland",
    rating: 3.1,
    reviewCount: 53,
    verification: "company",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
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
  },
  {
    id: "urban-space-architects",
    name: "Urban Space Architects",
    subtitle: "Interior Architecture • Space Planning",
    categoryIds: ["interior-design", "home-staging", "furniture-design"],
    location: "Victoria Island, Lagos",
    cityGroup: "victoria-island",
    rating: 2.4,
    reviewCount: 86,
    verification: "company",
    isTopRated: false,
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
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
  },
  {
    id: "tunde-balogun",
    name: "Tunde Balogun",
    subtitle: "Certified Electrician • 9 years exp.",
    categoryIds: ["electricians"],
    location: "Lekki Phase 1, Lagos",
    cityGroup: "lekki",
    rating: 4.2,
    reviewCount: 62,
    verification: "individual",
    imageUrl:
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "marcus-thorne",
    name: "Marcus Thorne",
    subtitle: "Custom Carpentry & Woodcraft",
    categoryIds: ["carpentry", "furniture-design"],
    location: "Yaba, Lagos",
    cityGroup: "lagos-mainland",
    rating: 3.7,
    reviewCount: 230,
    verification: "individual",
    isTopRated: true,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    subtitle: "Architectural Finishes & Interior Painting",
    categoryIds: ["painting"],
    location: "Victoria Island, Lagos",
    cityGroup: "victoria-island",
    rating: 4.5,
    reviewCount: 95,
    verification: "individual",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "apex-climate-systems",
    name: "Apex Climate Systems",
    subtitle: "HVAC & AC Repair Specialist",
    categoryIds: ["hvac"],
    location: "Ikeja, Lagos",
    cityGroup: "lagos-mainland",
    rating: 4.8,
    reviewCount: 112,
    verification: "company",
    isTopRated: true,
    imageUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sparkleclean-lagos",
    name: "SparkleClean Lagos",
    subtitle: "Deep Cleaning & Janitorial Services",
    categoryIds: ["cleaning"],
    location: "Lekki Phase 1, Lagos",
    cityGroup: "lekki",
    rating: 3.5,
    reviewCount: 88,
    verification: "company",
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "malik-adebayo",
    name: "Malik Adebayo",
    subtitle: "Solar & Inverter Technician",
    categoryIds: ["solar-energy", "solar-heating"],
    location: "Surulere, Lagos",
    cityGroup: "lagos-mainland",
    rating: 2.9,
    reviewCount: 64,
    verification: "individual",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "clara-vance",
    name: "Clara Vance",
    subtitle: "Bespoke Tailoring & Alterations",
    categoryIds: ["tailoring"],
    location: "Ikoyi, Lagos",
    cityGroup: "victoria-island",
    rating: 4.7,
    reviewCount: 184,
    verification: "individual",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "derek-motors",
    name: "Derek Auto Works",
    subtitle: "Engine Overhauls & Brake Services",
    categoryIds: ["auto-mechanics"],
    location: "Surulere, Lagos",
    cityGroup: "lagos-mainland",
    rating: 1.8,
    reviewCount: 19,
    verification: "individual",
    imageUrl:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "quickfix-appliances",
    name: "QuickFix Appliances",
    subtitle: "Fridge, Washer & Dryer Diagnostics",
    categoryIds: ["appliance-repair"],
    location: "Yaba, Lagos",
    cityGroup: "lagos-mainland",
    rating: 1.3,
    reviewCount: 8,
    verification: "individual",
    imageUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fatima-gourmet",
    name: "Fatima Gourmet Catering",
    subtitle: "Corporate Events & Private Chef",
    categoryIds: ["catering"],
    location: "Victoria Island, Lagos",
    cityGroup: "victoria-island",
    rating: 4.8,
    reviewCount: 124,
    verification: "individual",
    imageUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "titan-metalworks",
    name: "Titan Metalworks",
    subtitle: "Structural Welding & Iron Fabrication",
    categoryIds: ["welding"],
    location: "Ikeja, Lagos",
    cityGroup: "lagos-mainland",
    rating: 3.4,
    reviewCount: 42,
    verification: "company",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
  },
];

export const SEARCH_LOCATION_OPTIONS: SelectOption[] = [
  { value: "all", label: "All Locations" },
  ...Array.from(
    new Set(
      SEARCH_PROFESSIONALS_DATA.map((pro) => pro.location.trim()).filter(
        Boolean
      )
    )
  ).map((location) => ({
    value: location,
    label: location,
  })),
];
