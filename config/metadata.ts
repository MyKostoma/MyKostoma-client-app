import type { Metadata } from "next";

/**
 * Global metadata configuration and defaults for MyKostoma.
 */
export const SITE_METADATA = {
  name: "MyKostoma",
  titleTemplate: "%s | MyKostoma",
  defaultTitle: "MyKostoma",
  defaultDescription:
    "Standardized service requests, verified artisan quotations, and secure escrow order management.",
} as const;

/**
 * Centralized static page metadata dictionary.
 * Each entry strictly conforms to Next.js Metadata.
 */
export const PAGE_METADATA = {
  // Landing & Marketing
  landing: {
    title: "Home | Verified Local Artisans & Standardized Services",
    description:
      "Discover verified professionals, request transparent quotes, and enjoy secure escrow payments for all your home and business service needs.",
  },

  // Internal Consumer Discovery
  consumerHome: {
    title: "Find Top-Rated Artisans & Home Services",
    description:
      "Explore top-rated professionals, request quotes, and hire trusted local experts on MyKostoma.",
  },
  search: {
    title: "Search Professionals",
    description:
      "Search and filter vetted service professionals by location, rating, and expertise on MyKostoma.",
  },
  profileFallback: {
    title: "Professional Profile",
    description:
      "View professional credentials, project history, and customer reviews on MyKostoma.",
  },

  // Authentication
  login: {
    title: "Sign In",
    description:
      "Sign in to your MyKostoma account to manage service requests, quotations, and active orders.",
  },
  register: {
    title: "Create Account",
    description:
      "Join MyKostoma as a consumer or verified professional to connect, request quotes, and manage jobs.",
  },
  forgotPassword: {
    title: "Forgot Password",
    description: "Reset your MyKostoma password securely via email recovery.",
  },
  resetPassword: {
    title: "Reset Password",
    description: "Set a new secure password for your MyKostoma account.",
  },
  verifyAccount: {
    title: "Verify Account",
    description:
      "Enter your verification code to confirm and activate your MyKostoma account.",
  },

  // Dashboard
  dashboard: {
    title: "Dashboard",
    description:
      "Manage your active jobs, service requests, quotes, and account activity on MyKostoma.",
  },

  // Requests Module
  requestsList: {
    title: "My Requests",
    description:
      "View and manage your posted service requests, received quotes, and contractor responses.",
  },
  requestCreate: {
    title: "Post a Service Request",
    description:
      "Submit a new service request with project specifications to receive bids from verified local artisans.",
  },

  // Quotations Module
  quotationsList: {
    title: "Received Quotes",
    description:
      "Review and compare bids and price estimates received from verified service providers on MyKostoma.",
  },
  quotationsCompare: {
    title: "Compare Quotes",
    description:
      "Compare pricing breakdowns, scopes, warranties, and timelines across multiple artisan quotes side-by-side.",
  },

  // Orders Module
  ordersList: {
    title: "My Orders",
    description:
      "Track active service jobs, inspect milestones, release escrow funds, and view receipts on MyKostoma.",
  },

  // Notifications Module
  notifications: {
    title: "Notifications",
    description:
      "Stay updated with your home service requests and activity.",
  },

  // Parameterized Route Fallback Defaults
  categorySearchDefault: {
    title: "Category Search",
    description: "Browse verified service providers by category on MyKostoma.",
  },
  requestDetailDefault: {
    title: "Request Details",
    description: "View detailed service request specifications and received artisan bids on MyKostoma.",
  },
  requestEditDefault: {
    title: "Edit Service Request",
    description: "Update your service request details, budget, and project schedule on MyKostoma.",
  },
  quotationDetailDefault: {
    title: "Quotation Details",
    description: "Inspect detailed quotation breakdown, milestone pricing, and artisan credentials on MyKostoma.",
  },
  quotationRevisionDefault: {
    title: "Request Quotation Revision",
    description: "Submit feedback and request revisions for received artisan quotations on MyKostoma.",
  },
  orderDetailDefault: {
    title: "Order Details",
    description: "Track active service order progress, milestones, and deliverables on MyKostoma.",
  },
  orderCompletionDefault: {
    title: "Complete Order",
    description: "Review and approve completed service orders and release escrow payments on MyKostoma.",
  },
  orderFeedbackDefault: {
    title: "Order Feedback",
    description: "Leave feedback and rating for completed service orders on MyKostoma.",
  },
  orderStatusDefault: {
    title: "Order Status",
    description: "Track active order progress and milestones on MyKostoma.",
  },

  // Consumer Shop Module (/shop*)
  shopHome: {
    title: "Shop Fixed-Price Services",
    description: "Browse and order fixed-price services from top-rated verified professionals on MyKostoma.",
  },

  // Consumer Wallet Module (/wallet*)
  walletOverview: {
    title: "Wallet",
    description: "Manage your available balance, escrow funds, and transaction history on MyKostoma.",
  },
  walletFund: {
    title: "Fund Your Wallet",
    description: "Top up your MyKostoma wallet instantly via Nigerian Bank Transfer or Debit/Credit Card.",
  },
  walletFundingStatus: {
    title: "Funding Status",
    description: "Check the verification and credit status of your MyKostoma wallet deposit.",
  },
  walletTransactions: {
    title: "Transaction History",
    description: "Detailed record of all your deposits, escrow holds, payments, and refunds on MyKostoma.",
  },

  // Not Found
  notFound: {
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist on MyKostoma.",
  },
} as const satisfies Record<string, Metadata>;

export type PageMetadataKey = keyof typeof PAGE_METADATA;

/**
 * Standardized dynamic metadata generators for parameterized routes.
 */
export const PAGE_METADATA_GENERATORS = {
  // Category Search: /category/[id]
  categorySearch(categorySlug: string): Metadata {
    const formatted = categorySlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      title: `${formatted} Professionals`,
      description: `Discover and hire top-rated ${formatted.toLowerCase()} artisans and verified professionals on MyKostoma.`,
    };
  },

  // Shop Category: /shop/category/[id]
  shopCategory(title: string, description?: string): Metadata {
    return {
      title: `${title} | Shop`,
      description:
        description ||
        `Browse fixed-price ${title.toLowerCase()} packages from vetted professionals on MyKostoma.`,
    };
  },

  // Shop Service Detail: /shop/service/[id]
  shopServiceDetail(title?: string, providerName?: string, summary?: string): Metadata {
    if (!title) {
      return {
        title: "Service Package | Shop",
        description: "Inspect fixed-price service deliverables, turnaround time, and escrow protection on MyKostoma.",
      };
    }
    return {
      title: providerName ? `${title} by ${providerName}` : title,
      description:
        summary?.slice(0, 160) ||
        `Order ${title} with full MyKostoma escrow protection and verified quality guarantee.`,
    };
  },

  // Shop Direct Order Checkout: /shop/checkout/[id]
  shopCheckout(title?: string): Metadata {
    return {
      title: title ? `Direct Order Checkout - ${title}` : "Direct Order Confirmation",
      description:
        "Review your fixed-price service package, payment summary, and escrow terms before placing your direct order.",
    };
  },

  // Shop Direct Order Success: /shop/success/[orderCode]
  shopOrderSuccess(orderCode?: string): Metadata {
    return {
      title: orderCode ? `Order Created (#${orderCode})` : "Order Created Successfully",
      description:
        "Your direct shop order has been placed and funds are secured in MyKostoma Escrow.",
    };
  },

  // Professional Profile: /profile/[id]
  profileDetail(name?: string, roleTitle?: string, bio?: string): Metadata {
    if (!name) {
      return {
        title: "Profile Not Found",
      };
    }
    return {
      title: roleTitle ? `${name} - ${roleTitle}` : `${name} | Verified Professional`,
      description:
        bio ||
        `View professional profile, reviews, and portfolio of ${name} on MyKostoma.`,
    };
  },

  // Request Details: /requests/[id]
  requestDetail(title?: string, code?: string, description?: string): Metadata {
    return {
      title: title && code ? `${title} (${code})` : `Request ${code ?? ""}`,
      description:
        description?.slice(0, 160) ||
        "View detailed service request specifications and received artisan bids.",
    };
  },

  // Request Edit: /requests/[id]/edit
  requestEdit(code?: string): Metadata {
    return {
      title: `Edit Request ${code ?? ""}`,
      description:
        "Update your service request details, budget, and project schedule.",
    };
  },

  // Quotation Details: /quotations/[id]
  quotationDetail(providerName?: string, code?: string, message?: string): Metadata {
    return {
      title:
        providerName && code
          ? `Quote from ${providerName} (${code})`
          : `Quote ${code ?? ""}`,
      description:
        message?.slice(0, 160) ||
        "Inspect detailed quotation breakdown, milestone pricing, and artisan credentials.",
    };
  },

  // Quotation Revision: /quotations/[id]/revision
  quotationRevision(code?: string): Metadata {
    return {
      title: `Request Revision | Quote ${code ?? ""}`,
      description:
        "Submit requested changes, scope modifications, or counter-proposals to the artisan before accepting.",
    };
  },

  // Order Details: /orders/[id]
  orderDetail(title?: string, code?: string, providerName?: string): Metadata {
    return {
      title: title && code ? `${title} (Order #${code})` : `Order #${code ?? ""}`,
      description:
        title && providerName
          ? `Track progress, milestones, and escrow status for ${title} by ${providerName}.`
          : "View order milestones, project timeline, and escrow funds release status.",
    };
  },

  // Order Status: /orders/[id]/status
  orderStatus(code?: string): Metadata {
    return {
      title: code ? `Order Status & Escrow | ${code}` : "Order Status & Escrow",
      description:
        "Monitor order lifecycle, live updates, and secure escrow fund allocations.",
    };
  },

  // Order Completion: /orders/[id]/completion
  orderCompletion(code?: string): Metadata {
    return {
      title: code ? `Order Completion | ${code}` : "Order Completion",
      description:
        "Review completed project deliverables, authorize final escrow release, or raise a concern.",
    };
  },

  // Order Feedback: /orders/[id]/feedback
  orderFeedback(code?: string): Metadata {
    return {
      title: code ? `Feedback & Dispute | ${code}` : "Feedback & Dispute",
      description:
        "Leave a rating and review for the artisan or open an escrow dispute resolution ticket.",
    };
  },

  // Wallet Transaction Detail: /wallet/transactions/[id]
  walletTransactionDetail(reference?: string, description?: string): Metadata {
    return {
      title: reference ? `Transaction ${reference}` : "Transaction Detail",
      description:
        description ||
        "Inspect full transaction details, payment method, and downloadable receipt on MyKostoma.",
    };
  },
};
