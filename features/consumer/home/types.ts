import type {
  ConsumerCategoryItem,
  FeaturedProItem,
  SpotlightProviderItem,
} from "@/components/consumer-home/types";

export interface ConsumerHomeViewProps {
  categories?: ConsumerCategoryItem[];
  featuredProfessionals?: FeaturedProItem[];
  spotlightProviders?: SpotlightProviderItem[];
}
