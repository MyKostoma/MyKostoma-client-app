import type { SearchProfessionalItem } from "@/components/consumer-search/types";

export interface ConsumerSearchViewProps {
  initialCategory?: string;
  initialQuery?: string;
  professionals?: SearchProfessionalItem[];
}
