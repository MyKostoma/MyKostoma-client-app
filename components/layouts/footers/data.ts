import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "./icons";
import type {
    FooterColumnItem,
    FooterSocialItem,
    FooterLinkItem,
} from "./types";
import { Globe, MessageCircle, Send, Share2 } from "lucide-react";


export const DEFAULT_APP_FOOTER_COLUMNS: FooterColumnItem[] = [
    {
        title: "SERVICES",
        links: [
            { label: "Plumbing & HVAC", href: "#plumbing-hvac" },
            { label: "Electrical Work", href: "#electrical-work" },
            { label: "Interior Design", href: "#interior-design" },
            { label: "Home Security", href: "#home-security" },
        ],
    },
    {
        title: "COMPANY",
        links: [
            { label: "About Us", href: "#about-us" },
            { label: "Become a Pro", href: "#become-a-pro" },
            { label: "Trust & Safety", href: "#trust-and-safety" },
            { label: "Press Center", href: "#press-center" },
        ],
    },
    {
        title: "RESOURCES",
        links: [
            { label: "Service Standards", href: "#service-standards" },
            { label: "Community Forum", href: "#community-forum" },
            { label: "Support Center", href: "#support-center" },
            { label: "Legal Notices", href: "#legal-notices" },
        ],
    },
];

export const DEFAULT_APP_BOTTOM_LINKS: FooterLinkItem[] = [
    { label: "GUIDELINES", href: "#guidelines" },
    { label: "PRIVACY POLICY", href: "#privacy-policy" },
    { label: "TERMS OF SERVICE", href: "#terms-of-service" },
];


export const DEFAULT_PUBLIC_FOOTER_COLUMNS: FooterColumnItem[] = [
    {
        title: "MARKETPLACE",
        links: [
            { label: "Find Pros", href: "#find-pros" },
            { label: "All Categories", href: "#all-categories" },
            { label: "Enterprise Solutions", href: "#enterprise-solutions" },
            { label: "Referral Program", href: "#referral-program" },
        ],
    },
    {
        title: "COMPANY",
        links: [
            { label: "About Us", href: "#about-us" },
            { label: "How it Works", href: "#how-it-works" },
            { label: "Success Stories", href: "#success-stories" },
            { label: "Contact Support", href: "#contact-support" },
        ],
    },
    {
        title: "LEGAL",
        links: [
            { label: "Privacy Policy", href: "#privacy-policy" },
            { label: "Terms of Service", href: "#terms-of-service" },
            { label: "Safety Center", href: "#safety-center" },
            { label: "Help Guidelines", href: "#help-guidelines" },
        ],
    },
];

export const DEFAULT_PUBLIC_SOCIALS: FooterSocialItem[] = [
    { name: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
    { name: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
    { name: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
    { name: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
];

export const DEFAULT_PUBLIC_FOOTER_2_COLUMNS: FooterColumnItem[] = [
    {
        title: "DISCOVER MYKOSTOMA",
        links: [
            { label: "Find Professionals", href: "/search" },
            { label: "Browse by Service Category", href: "/category" },
            { label: "Browse by Location", href: "/search?by=location" },
            { label: "Shop", href: "/shop" },
            { label: "Discover Reels", href: "/reels" },
        ],
    },
    {
        title: "FOR CONSUMERS",
        links: [
            { label: "How It Works", href: "#how-it-works" },
            // { label: "Create a Service Request", href: "/requests/new" },
            // { label: "Review Quotations", href: "/requests" },
            // { label: "Manage Orders", href: "/bookings" },
            // { label: "Secure Payments & Escrow", href: "#escrow" },
        ],
    },
    {
        title: "FOR PROFESSIONALS",
        links: [
            { label: "Become a Professional", href: "/register?role=professional" },
            // { label: "Create Your Shop", href: "/shop" },
            // { label: "Create Service Cards", href: "/services/new" },
            // { label: "Receive & Manage Requests", href: "/requests" },
            // { label: "Submit Quotations", href: "/quotations" },
            // { label: "Wallet and Payouts", href: "/earnings" },
        ],
    },
    {
        title: "TRUST & SAFETY",
        links: [
            { label: "Professional Verification", href: "#verification" },
            { label: "Reviews and Ratings", href: "#reviews" },
            { label: "Escrow & Payment Protection", href: "#escrow-protection" },
            { label: "Disputes and Resolution", href: "#disputes" },
        ],
    },
    {
        title: "COMPANY & SUPPORT",
        links: [
            { label: "About MyKostoma", href: "#about-us" },
            { label: "Help Centre / FAQs", href: "#faqs" },
            { label: "Contact Support", href: "#contact-support" },
        ],
    },
    {
        title: "LEGAL & POLICIES",
        links: [
            { label: "Terms of Service", href: "#terms-of-service" },
            { label: "Privacy Policy", href: "#privacy-policy" },
            { label: "Community Guidelines", href: "#community-guidelines" },
        ],
    },
];

export const DEFAULT_PUBLIC_FOOTER_2_BOTTOM_LINKS: FooterLinkItem[] = [
    { label: "Terms", href: "#terms" },
    { label: "Privacy", href: "#privacy" },
    { label: "Cookies", href: "#cookies" },
];
