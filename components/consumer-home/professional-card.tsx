import { BadgeCheck, Building2, MapPin, Plus, Star } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { FeaturedProItem } from "./types";

export interface ProfessionalCardProps {
  professional: FeaturedProItem;
  className?: string;
}


const ProfessionalCard = ({
    professional: pro,
    className,
}: ProfessionalCardProps) => {
    const isCorporate = pro.badgeVariant === "corporate";

    return (
        <article
            className={cn(
                "group bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-2xs hover:shadow-md transition-all duration-200",
                className
            )}
        >
            <div className="relative h-48 w-full overflow-hidden bg-secondary">
                <img
                    src={pro.imageUrl}
                    alt={pro.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
                />

                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-card/95 backdrop-blur-xs text-foreground text-[9px] font-bold uppercase tracking-wider shadow-xs select-none">
                    {isCorporate ? (
                        <Building2 className="size-3 text-info shrink-0" />
                    ) : (
                        <BadgeCheck className="size-3.5 text-warning shrink-0" />
                    )}
                    <span>{pro.badgeText}</span>
                </div>

                {pro.showQuickAction && (
                    <button
                        type="button"
                        onClick={() => pro.onQuickActionClick?.(pro.id)}
                        aria-label={`Quick save ${pro.name}`}
                        className="absolute bottom-3 right-3 size-8 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-md flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
                    >
                        <Plus className="size-4 stroke-[2.5]" />
                    </button>
                )}
            </div>

            <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-5">
                <div>
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-bold text-foreground tracking-tight leading-snug">
                            {pro.name}
                        </h3>

                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-warning-bg text-warning text-[11px] font-bold shrink-0">
                            {pro.rating}
                            <Star className="size-2.5 fill-current" />
                        </span>
                    </div>

                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary mt-1">
                        {pro.specialty}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2.5">
                        <MapPin className="size-3.5 shrink-0 text-muted-foreground/80" />
                        <span className="truncate">{pro.location}</span>
                    </div>
                </div>

                <div className="pt-3.5 border-t border-border/70 flex items-center justify-between gap-2">
                    <div>
                        <span className="block text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {pro.statLabel}
                        </span>
                        <span className="text-xs font-bold text-foreground">
                            {pro.statValue}
                        </span>
                    </div>

                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => pro.onBookClick?.(pro.id)}
                        className="h-8 px-3.5 text-xs font-semibold rounded-md shadow-2xs"
                    >
                        {pro.ctaText ?? "Book Now"}
                    </Button>
                </div>
            </div>
        </article>
    );
  }

export default ProfessionalCard;