import type { ProfessionalProfileData, ProfileServiceItem, ProfilePortfolioItem, ProfileReviewItem } from "@/components/profile/types";
import { SEARCH_PROFESSIONALS_DATA } from "@/features/consumer/search/data";
import { DEFAULT_FEATURED_PROFESSIONALS } from "@/features/consumer/home/data";

export const MOCK_PROFESSIONAL_PROFILES: Record<string, ProfessionalProfileData> = {
  "elena-rodriguez": {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    roleTitle: "Lead Interior Designer at UrbanVibe",
    verificationLabel: "INDIVIDUAL VERIFIED",
    verificationType: "individual",
    location: "Victoria Island, Lagos",
    rating: 4.5,
    reviewCount: 95,
    experienceLabel: "8 Years Exp.",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "Passionate interior designer specializing in modern minimalist and industrial aesthetics. I believe in creating spaces that not only look stunning but also enhance the quality of life for the people who inhabit them. With over 8 years of experience in both residential and commercial projects across Lagos.",
    responseTimeText: "2 hours",
    services: [
      {
        id: "residential-consultation",
        title: "Residential Consultation & 3D Planning",
        description:
          "Complete floor planning, material palette selection, lighting diagrams, and 3D visualization for your home.",
        tags: ["2-3 Weeks", "Virtual/On-site"],
        priceLabel: "STARTING FROM",
        priceValue: "₦150,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "pie-chart",
        iconVariant: "info",
      },
      {
        id: "commercial-space-styling",
        title: "Commercial Space Styling",
        description:
          "Professional office and retail store interior branding, ergonomic workstation design, and acoustic planning.",
        tags: ["Custom Timeline", "Project-based"],
        priceLabel: "PRICING",
        priceValue: "Custom Quote",
        ctaLabel: "REQUEST QUOTE",
        ctaVariant: "outline",
        iconName: "store",
        iconVariant: "warning",
      },
    ],
    portfolio: [
      {
        id: "luxury-master-suite",
        title: "Warm Minimalist Master Suite",
        category: "Residential Interior",
        imageUrl:
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "industrial-loft-workspace",
        title: "UrbanVibe Industrial Loft Studio",
        category: "Commercial Space",
        imageUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "contemporary-kitchen-island",
        title: "Monochrome Culinary Island",
        category: "Residential Kitchen",
        imageUrl:
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
      },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 86 },
      { stars: 4, percentage: 11 },
      { stars: 3, percentage: 3 },
    ],
    reviews: [
      {
        id: "review-sarah-j",
        authorName: "Sarah Johnson",
        authorRole: "Homeowner",
        timeAgo: "2 weeks ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        comment:
          "Elena turned our outdated living room into a contemporary masterpiece. Her attention to detail and ability to understand our personal style was remarkable.",
        professionalResponse:
          "Thank you so much Sarah! It was an absolute pleasure working with you.",
      },
      {
        id: "review-daniel-o",
        authorName: "Daniel Okoro",
        authorRole: "Hub-X Founder",
        timeAgo: "1 month ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        comment:
          "Exceptional eye for commercial branding through interior architecture. Elena managed our office renovation with extreme professionalism.",
      },
    ],
    quickActions: [
      "Is this service still available?",
      "Can we do a virtual meeting?",
      "Send project brief",
    ],
  },

  "tunde-balogun": {
    id: "tunde-balogun",
    name: "Tunde Balogun",
    roleTitle: "Certified Senior Electrician • 9 Years Exp.",
    verificationLabel: "INDIVIDUAL VERIFIED",
    verificationType: "individual",
    location: "Lekki Phase 1, Lagos",
    rating: 4.2,
    reviewCount: 62,
    experienceLabel: "9 Years Exp.",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    bio: "Certified high & low voltage electrical engineer specializing in modern residential conduit installations, smart home distribution boards, and backup inverter systems. Committed to fire safety codes, clean conduit cable management, and prompt emergency response.",
    responseTimeText: "Under 1 hour",
    services: [
      {
        id: "electrical-wiring-audit",
        title: "Full House Conduit Wiring & Safety Audit",
        description:
          "Complete conduit piping, circuit breaker load balancing, earthing installation, and electrical hazard safety inspections.",
        tags: ["1-2 Weeks", "On-site Assessment"],
        priceLabel: "STARTING FROM",
        priceValue: "₦120,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "briefcase",
        iconVariant: "info",
      },
      {
        id: "inverter-solar-integration",
        title: "Inverter & Hybrid Solar Setup",
        description:
          "Sizing, wiring, and installation of pure sine wave inverters, lithium battery banks, and changeover switchboards.",
        tags: ["1-3 Days", "Hardware Warranty"],
        priceLabel: "ESTIMATE",
        priceValue: "₦85,000",
        ctaLabel: "REQUEST QUOTE",
        ctaVariant: "outline",
        iconName: "sparkles",
        iconVariant: "warning",
      },
      {
        id: "emergency-fault-diagnostics",
        title: "Emergency Fault Diagnostics & Short Circuit Repair",
        description:
          "Rapid diagnosis and resolution of circuit tripping, burnt breakers, power surges, and phase imbalance.",
        tags: ["Same Day", "24/7 Available"],
        priceLabel: "FLAT RATE",
        priceValue: "₦25,000",
        ctaLabel: "CALL OUT",
        ctaVariant: "default",
        iconName: "pie-chart",
        iconVariant: "primary",
      },
    ],
    portfolio: [
      {
        id: "smart-distribution-panel",
        title: "Lekki Phase 1 Smart Panel Retrofit",
        category: "Electrical Distribution",
        imageUrl:
          "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "inverter-bank-wiring",
        title: "10kVA Commercial Inverter Bank",
        category: "Clean Energy Backup",
        imageUrl:
          "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "recessed-lighting-wiring",
        title: "Architectural Ceiling Conduit Wiring",
        category: "Residential Lighting",
        imageUrl:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
      },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 68 },
      { stars: 4, percentage: 22 },
      { stars: 3, percentage: 10 },
    ],
    reviews: [
      {
        id: "review-babatunde-a",
        authorName: "Babatunde Alabi",
        authorRole: "Duplex Owner, Lekki",
        timeAgo: "3 days ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        comment:
          "Tunde diagnosed an electrical tripping problem that three other electricians couldn't fix. Clean conduit work and very polite.",
        professionalResponse:
          "Glad to have sorted the earthing issue for you Babatunde. Safe power always!",
      },
      {
        id: "review-kemi-o",
        authorName: "Kemi Osuntokun",
        authorRole: "Architect",
        timeAgo: "2 weeks ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        rating: 4,
        comment:
          "Very dependable electrician. Handled the entire sub-panel wiring on our renovation on time.",
      },
    ],
    quickActions: [
      "Are you available for an emergency visit?",
      "Can you inspect my distribution board?",
      "Can I get a quote for wiring my house?",
    ],
  },

  "voltsmart-solutions": {
    id: "voltsmart-solutions",
    name: "VoltSmart Solutions",
    roleTitle: "Commercial Electrical Systems & Smart Automation",
    verificationLabel: "CORPORATE PARTNER",
    verificationType: "company",
    location: "Victoria Island, Lagos",
    rating: 5.0,
    reviewCount: 98,
    experienceLabel: "14 Years in Business",
    avatarUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80",
    bio: "VoltSmart Solutions is a premier corporate engineering firm delivering industrial electrical reticulation, commercial facility energy audits, transformer sub-station maintenance, and integrated building automation systems throughout West Africa.",
    responseTimeText: "Under 30 mins",
    services: [
      {
        id: "commercial-power-reticulation",
        title: "Industrial & Commercial Power Reticulation",
        description:
          "High capacity three-phase wiring, cable trays, busbar trunking, and power distribution boards for corporate headquarters.",
        tags: ["Turnkey Project", "SLA Included"],
        priceLabel: "PRICING",
        priceValue: "Custom Contract",
        ctaLabel: "REQUEST PROPOSAL",
        ctaVariant: "default",
        iconName: "briefcase",
        iconVariant: "info",
      },
      {
        id: "facility-energy-audit",
        title: "Comprehensive Energy & Power Quality Audit",
        description:
          "Harmonic distortion analysis, thermographic thermal imaging scans, and generator-inverter load optimization.",
        tags: ["1-2 Weeks", "Certified Engineers"],
        priceLabel: "STARTING FROM",
        priceValue: "₦350,000",
        ctaLabel: "BOOK AUDIT",
        ctaVariant: "outline",
        iconName: "pie-chart",
        iconVariant: "success",
      },
    ],
    portfolio: [
      {
        id: "vi-tower-automation",
        title: "VI Corporate Tower Intelligent Automation",
        category: "Commercial Electrical",
        imageUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "data-center-power",
        title: "Tier III Data Center Dual-Fed Substation",
        category: "Critical Infrastructure",
        imageUrl:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "factory-switchgear",
        title: "Industrial Switchgear & PLC Panels",
        category: "Heavy Industry",
        imageUrl:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
      },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 98 },
      { stars: 4, percentage: 2 },
    ],
    reviews: [
      {
        id: "review-zenith-fac",
        authorName: "Chinedu Eze",
        authorRole: "Facilities Director, VI",
        timeAgo: "1 week ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        comment:
          "VoltSmart has managed our 8-story commercial facility electrical maintenance for two years with zero unplanned downtime. Elite team.",
      },
    ],
    quickActions: [
      "Request a corporate procurement meeting",
      "Send RFP for commercial facility wiring",
      "Request industrial emergency support",
    ],
  },

  "marcus-thorne": {
    id: "marcus-thorne",
    name: "Marcus Thorne",
    roleTitle: "Master Artisan & Custom Woodcraft",
    verificationLabel: "INDIVIDUAL VERIFIED",
    verificationType: "individual",
    location: "Yaba, Lagos",
    rating: 3.7,
    reviewCount: 230,
    experienceLabel: "12 Years Exp.",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Passionate woodworker and furniture designer creating bespoke cabinetry, hardwood dining tables, acoustic fluted panels, and architectural joinery. Working with seasoned iroko, teak, mahogany, and premium imported oak.",
    responseTimeText: "3 hours",
    services: [
      {
        id: "bespoke-cabinetry",
        title: "Custom Kitchen & Wardrobe Cabinetry",
        description:
          "Precision-crafted soft-close cabinets, moisture-resistant marine board carcasses, and exquisite hardwood veneer facings.",
        tags: ["3-4 Weeks", "Custom Fitting"],
        priceLabel: "STARTING FROM",
        priceValue: "₦280,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "store",
        iconVariant: "info",
      },
      {
        id: "hardwood-dining-tables",
        title: "Handcrafted Solid Hardwood Tables",
        description:
          "Statement live-edge and Scandinavian style dining sets built to last for generations.",
        tags: ["2 Weeks", "Nationwide Delivery"],
        priceLabel: "PRICE RANGE",
        priceValue: "₦180,000 - ₦650,000",
        ctaLabel: "CUSTOM ORDER",
        ctaVariant: "outline",
        iconName: "sparkles",
        iconVariant: "warning",
      },
    ],
    portfolio: [
      {
        id: "fluted-wall-panelling",
        title: "Acoustic Fluted Teak Wall Panelling",
        category: "Architectural Woodwork",
        imageUrl:
          "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "iroko-dining-table",
        title: "Live Edge Iroko 8-Seater Table",
        category: "Furniture Design",
        imageUrl:
          "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "minimalist-oak-closet",
        title: "Walk-in Dressing Room Cabinetry",
        category: "Residential Cabinetry",
        imageUrl:
          "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=900&q=80",
      },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 52 },
      { stars: 4, percentage: 28 },
      { stars: 3, percentage: 14 },
      { stars: 2, percentage: 6 },
    ],
    reviews: [
      {
        id: "review-fola-k",
        authorName: "Fola Kuti",
        authorRole: "Interior Decorator",
        timeAgo: "1 month ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        comment:
          "Marcus built the dining table of my dreams. The wood grain and finishing oil are world-class.",
      },
    ],
    quickActions: [
      "Can you build custom furniture to my dimensions?",
      "Do you provide on-site measurement?",
      "What wood species do you work with?",
    ],
  },

  "chidi-okonkwo": {
    id: "chidi-okonkwo",
    name: "Chidi Okonkwo",
    roleTitle: "Master Plumber & Pipe Diagnostics • 12 Years Exp.",
    verificationLabel: "INDIVIDUAL VERIFIED",
    verificationType: "individual",
    location: "Lekki Phase 1, Lagos",
    rating: 4.8,
    reviewCount: 118,
    experienceLabel: "12 Years Exp.",
    avatarUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80",
    bio: "Master licensed plumber providing complete pipe reticulation, borehole water treatment plant installation, sewage piping, high-pressure booster pump calibration, and non-destructive ultrasonic leak detection.",
    responseTimeText: "Under 1 hour",
    services: [
      {
        id: "leak-detection",
        title: "Ultrasonic Concealed Pipe Leak Detection",
        description:
          "Find hidden wall and floor pipe leaks without tearing down your tiles or concrete walls.",
        tags: ["Same Day", "Non-Destructive"],
        priceLabel: "FLAT RATE",
        priceValue: "₦45,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "briefcase",
        iconVariant: "info",
      },
      {
        id: "water-treatment-system",
        title: "Borehole Filtration & Reverse Osmosis Plant",
        description:
          "Multi-stage sand, carbon, and iron removal filtration systems for crystal clear drinking water.",
        tags: ["3-5 Days", "Water Lab Tested"],
        priceLabel: "ESTIMATE",
        priceValue: "₦220,000",
        ctaLabel: "GET QUOTE",
        ctaVariant: "outline",
        iconName: "sparkles",
        iconVariant: "warning",
      },
    ],
    portfolio: [
      {
        id: "filtration-plant-project",
        title: "Duplex 3-Stage Filtration Plant",
        category: "Water Treatment",
        imageUrl:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "booster-pump-manifold",
        title: "Multi-Pump Inverter Pressure Manifold",
        category: "Hydraulic Systems",
        imageUrl:
          "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80",
      },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 88 },
      { stars: 4, percentage: 10 },
      { stars: 3, percentage: 2 },
    ],
    reviews: [
      {
        id: "review-tony-b",
        authorName: "Tony Briggs",
        authorRole: "Resident, Lekki",
        timeAgo: "1 week ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        comment:
          "Chidi sorted out our borehole water brownish odor within 48 hours. The water is now completely odorless and clear.",
      },
    ],
    quickActions: [
      "Can you fix an emergency water leak today?",
      "Can I get a quotation for water treatment?",
      "Are you available for plumbing inspection?",
    ],
  },

  "titan-metalworks": {
    id: "titan-metalworks",
    name: "Titan Metalworks",
    roleTitle: "Structural Welding & Iron Fabrication",
    verificationLabel: "CORPORATE PARTNER",
    verificationType: "company",
    location: "Ikeja, Lagos",
    rating: 3.4,
    reviewCount: 42,
    experienceLabel: "10 Years in Business",
    avatarUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
    bio: "Titan Metalworks specializes in heavy structural steel construction, automated cantilever sliding gates, stainless steel glass railings, security doors, and industrial warehouse roof trusses across Nigeria.",
    responseTimeText: "4 hours",
    services: [
      {
        id: "automated-gates",
        title: "Automated Laser-Cut Cantilever Gates",
        description:
          "Bespoke laser-cut patterns, heavy-duty anti-rust powder coating, and smart motor automation with remote and smartphone controls.",
        tags: ["2 Weeks", "3 Years Warranty"],
        priceLabel: "STARTING FROM",
        priceValue: "₦350,000",
        ctaLabel: "BOOK NOW",
        ctaVariant: "default",
        iconName: "briefcase",
        iconVariant: "info",
      },
      {
        id: "steel-trusses-fabrication",
        title: "Structural Steel Roof Trusses",
        description:
          "Engineered I-beams, hollow sections, and hot-rolled structural steel erection for warehouses and residences.",
        tags: ["Project-based", "Engineer Certified"],
        priceLabel: "PRICING",
        priceValue: "Custom Estimate",
        ctaLabel: "GET QUOTE",
        ctaVariant: "outline",
        iconName: "store",
        iconVariant: "warning",
      },
    ],
    portfolio: [
      {
        id: "laser-cut-gate",
        title: "Modern Geometric Cantilever Gate",
        category: "Architectural Metalwork",
        imageUrl:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "steel-frame-warehouse",
        title: "Ikeja Industrial Portal Frame",
        category: "Heavy Construction",
        imageUrl:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
      },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 42 },
      { stars: 4, percentage: 30 },
      { stars: 3, percentage: 18 },
      { stars: 2, percentage: 10 },
    ],
    reviews: [
      {
        id: "review-greg-o",
        authorName: "Gregory Okafor",
        authorRole: "Contractor",
        timeAgo: "2 weeks ago",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        rating: 4,
        comment:
          "Solid gate fabrication. Delivery had a 2-day delay, but the build quality and welding beads are exceptional.",
      },
    ],
    quickActions: [
      "Can I get a quote for automated gates?",
      "Do you fabricate industrial steel structures?",
      "Can you inspect my building site?",
    ],
  },
};

export const DEFAULT_PROFESSIONAL_PROFILE: ProfessionalProfileData =
  MOCK_PROFESSIONAL_PROFILES["elena-rodriguez"];

/**
 * Retrieves a professional profile by ID.
 * If not in the pre-curated dictionary, dynamically constructs a realistic profile
 * from search or home mock registries based on the pro's specific profession.
 */
export function getProfessionalProfileById(id: string): ProfessionalProfileData {
  if (MOCK_PROFESSIONAL_PROFILES[id]) {
    return MOCK_PROFESSIONAL_PROFILES[id];
  }

  // Look up in Search registry
  const searchPro = SEARCH_PROFESSIONALS_DATA.find((p) => p.id === id);
  if (searchPro) {
    const isCompany = searchPro.verification === "company";
    const profession = searchPro.subtitle || "Professional Specialist";
    const primaryCat = searchPro.categoryIds[0] || "general";

    return {
      id: searchPro.id,
      name: searchPro.name,
      roleTitle: `${searchPro.subtitle} • ${searchPro.location}`,
      verificationLabel: isCompany ? "CORPORATE PARTNER" : "INDIVIDUAL VERIFIED",
      verificationType: isCompany ? "company" : "individual",
      location: searchPro.location,
      rating: searchPro.rating,
      reviewCount: searchPro.reviewCount ?? 50,
      experienceLabel: isCompany ? "Registered Enterprise" : "8+ Years Exp.",
      avatarUrl: searchPro.imageUrl,
      bio: `${searchPro.name} is a top-rated service provider based in ${searchPro.location}, specializing in ${profession}. Dedicated to top-tier workmanship, customer satisfaction, and reliable delivery.`,
      responseTimeText: "Under 2 hours",
      services: [
        {
          id: `${searchPro.id}-service-1`,
          title: `Full ${profession} Inspection & Consultation`,
          description: `Detailed assessment, diagnostics, and customized service execution for your project in ${searchPro.location}.`,
          tags: ["Flexible Schedule", "Guaranteed Quality"],
          priceLabel: "STARTING FROM",
          priceValue: "₦50,000",
          ctaLabel: "BOOK NOW",
          ctaVariant: "default",
          iconName: "briefcase",
          iconVariant: "info",
        },
        {
          id: `${searchPro.id}-service-2`,
          title: `Custom ${profession} Project Delivery`,
          description: `End-to-end execution with premium materials, safety compliance, and comprehensive post-service warranty.`,
          tags: ["Project-based", "Milestone Billing"],
          priceLabel: "PRICING",
          priceValue: "Custom Quote",
          ctaLabel: "REQUEST QUOTE",
          ctaVariant: "outline",
          iconName: "sparkles",
          iconVariant: "warning",
        },
      ],
      portfolio: [
        {
          id: `${searchPro.id}-port-1`,
          title: `${searchPro.name} Signature Project`,
          category: primaryCat.replace(/-/g, " ").toUpperCase(),
          imageUrl: searchPro.imageUrl,
        },
      ],
      ratingBreakdown: [
        { stars: 5, percentage: Math.min(95, Math.round(searchPro.rating * 18)) },
        { stars: 4, percentage: 15 },
        { stars: 3, percentage: 5 },
      ],
      reviews: [
        {
          id: `${searchPro.id}-rev-1`,
          authorName: "Amina Lawal",
          authorRole: "Verified Client",
          timeAgo: "3 weeks ago",
          avatarUrl:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
          rating: Math.round(searchPro.rating),
          comment: `Great experience with ${searchPro.name}! Arrived on time in ${searchPro.location} and handled the job cleanly.`,
        },
      ],
      quickActions: [
        "Are you available this week?",
        "Can I get a customized quote?",
        "Do you provide emergency service?",
      ],
    };
  }

  // Look up in Featured Home registry
  const featuredPro = DEFAULT_FEATURED_PROFESSIONALS.find((p) => p.id === id);
  if (featuredPro) {
    const isCompany = featuredPro.badgeVariant === "corporate";
    const ratingNum =
      typeof featuredPro.rating === "number"
        ? featuredPro.rating
        : parseFloat(featuredPro.rating) || 4.5;

    return {
      id: featuredPro.id,
      name: featuredPro.name,
      roleTitle: `${featuredPro.specialty} • ${featuredPro.location}`,
      verificationLabel: isCompany ? "CORPORATE PARTNER" : "VERIFIED PRO",
      verificationType: isCompany ? "company" : "individual",
      location: featuredPro.location,
      rating: ratingNum,
      reviewCount: 85,
      experienceLabel: "Featured Partner",
      avatarUrl: featuredPro.imageUrl,
      bio: `${featuredPro.name} is a featured service professional with proven expertise in ${featuredPro.specialty}. Providing reliable service across ${featuredPro.location}.`,
      responseTimeText: "Under 1 hour",
      services: [
        {
          id: `${featuredPro.id}-service-1`,
          title: `${featuredPro.specialty} Service Consultation`,
          description: `Initial on-site or virtual consultation and comprehensive estimate for your ${featuredPro.specialty} needs.`,
          tags: ["1-3 Days", "Satisfaction Guaranteed"],
          priceLabel: "STARTING FROM",
          priceValue: "₦65,000",
          ctaLabel: "BOOK NOW",
          ctaVariant: "default",
          iconName: "briefcase",
          iconVariant: "info",
        },
      ],
      portfolio: [
        {
          id: `${featuredPro.id}-port-1`,
          title: `${featuredPro.name} Featured Showcase`,
          category: featuredPro.specialty,
          imageUrl: featuredPro.imageUrl,
        },
      ],
      ratingBreakdown: [
        { stars: 5, percentage: 80 },
        { stars: 4, percentage: 15 },
        { stars: 3, percentage: 5 },
      ],
      reviews: [
        {
          id: `${featuredPro.id}-rev-1`,
          authorName: "Emeka Obi",
          authorRole: "Client",
          timeAgo: "2 weeks ago",
          avatarUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
          rating: 5,
          comment: `Top quality work by ${featuredPro.name}. Reliable and very communicative.`,
        },
      ],
      quickActions: [
        "Is this service still available?",
        "Can we schedule a consultation?",
        "Send project details",
      ],
    };
  }

  return DEFAULT_PROFESSIONAL_PROFILE;
}
