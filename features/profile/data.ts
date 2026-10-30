import type { ProfessionalProfileData } from "@/components/profile";

export const DEFAULT_PROFESSIONAL_PROFILE: ProfessionalProfileData = {
  id: "elena-rodriguez",
  name: "Elena Rodriguez",
  roleTitle: "Lead Interior Designer at UrbanVibe",
  verificationLabel: "INDIVIDUAL VERIFIED",
  verificationType: "individual",
  location: "Lekki Phase 1, Lagos",
  rating: 4.9,
  reviewCount: 142,
  experienceLabel: "8 Years Exp.",
  avatarUrl:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  bio: "Passionate interior designer specializing in modern minimalist and industrial aesthetics. I believe in creating spaces that not only look stunning but also enhance the quality of life for the people who inhabit them. With over 8 years of experience in both residential and commercial projects.",
  responseTimeText: "2 hours",
  services: [
    {
      id: "residential-consultation",
      title: "Residential Consultation",
      description:
        "Complete floor planning, material selection, and 3D visualization for your home.",
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
        "Professional office and retail store interior branding and ergonomic space planning.",
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
    { stars: 5, percentage: 92 },
    { stars: 4, percentage: 6 },
    { stars: 3, percentage: 2 },
  ],
  reviews: [
    {
      id: "review-sarah-johnson",
      authorName: "Sarah Johnson",
      authorRole: "Homeowner",
      timeAgo: "2 weeks ago",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment:
        "Elena turned our outdated living room into a contemporary masterpiece. Her attention to detail and ability to understand our personal style was remarkable. The project was delivered on time and within the budget we discussed. Highly recommended!",
      professionalResponse:
        "Thank you so much Sarah! It was an absolute pleasure working with you to bring your vision to life.",
    },
    {
      id: "review-daniel-okoro",
      authorName: "Daniel Okoro",
      authorRole: "Hub-X Founder",
      timeAgo: "1 month ago",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment:
        "Exceptional eye for commercial branding through interior design. Elena managed our office renovation with extreme professionalism. The new layout has significantly improved our team's workflow.",
    },
  ],
  quickActions: [
    "Is this service still available?",
    "Can we do a virtual meeting?",
    "Send project brief",
  ],
};
