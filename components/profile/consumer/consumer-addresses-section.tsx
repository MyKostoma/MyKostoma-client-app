"use client";

import { Building2, Home, MapPin, Pencil, Phone, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
  ConsumerAddressTag,
  ConsumerAddressesSectionProps,
} from "../types";

const TAG_ICONS: Record<ConsumerAddressTag, typeof Home> = {
  Home,
  Office: Building2,
  Other: MapPin,
};

export function ConsumerAddressesSection({
  addresses,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
  onSetDefaultAddress,
}: ConsumerAddressesSectionProps) {
  return (
    <section aria-label="Saved service addresses" className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <h2 className="text-lg font-bold text-foreground tracking-tight">
            Saved Service Addresses
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Locations shared only when you confirm a booking or request
            on-site quotes.
          </p>
        </div>

        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={onAddAddress}
          leadingIcon={<Plus className="size-3.5" />}
          className="h-10 px-4 rounded-xl text-xs font-semibold shadow-xs shrink-0 self-start sm:self-center"
        >
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center space-y-3 shadow-2xs">
          <div className="size-12 rounded-2xl bg-secondary text-muted-foreground flex items-center justify-center mx-auto">
            <MapPin className="size-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-foreground">
              No saved addresses yet
            </p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Add your home or office location so you don&apos;t have to re-type
              delivery details on future requests.
            </p>
          </div>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onAddAddress}
            leadingIcon={<Plus className="size-3.5" />}
            className="h-9 px-5 rounded-xl text-xs font-semibold"
          >
            Add First Address
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {addresses.map((address) => {
            const Icon = TAG_ICONS[address.tag] ?? MapPin;

            return (
              <article
                key={address.id}
                className={cn(
                  "rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-4",
                  address.isDefault && "border-l-4 border-l-primary"
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="size-9 rounded-xl bg-secondary text-foreground flex items-center justify-center shrink-0">
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-foreground truncate">
                          {address.label}
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          {address.tag}
                        </span>
                      </div>
                    </div>

                    {address.isDefault && (
                      <span className="px-2.5 py-0.5 rounded-full bg-accent text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider shrink-0">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground space-y-1 leading-relaxed">
                    <p className="font-semibold text-foreground">
                      {address.streetAddress}
                    </p>
                    <p>{address.area}</p>
                    {address.landmark && (
                      <p>Landmark: {address.landmark}</p>
                    )}
                    <p className="inline-flex items-center gap-1.5 pt-1 text-foreground">
                      <Phone className="size-3 text-muted-foreground shrink-0" />
                      <span>{address.phone}</span>
                    </p>
                    {address.accessNotes && (
                      <p className="pt-1 text-[11px] italic">
                        &ldquo;{address.accessNotes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/70">
                  {!address.isDefault ? (
                    <button
                      type="button"
                      onClick={() => onSetDefaultAddress(address.id)}
                      className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span className="text-[11px] font-medium text-muted-foreground">
                      Default for new requests
                    </span>
                  )}

                  <div className="flex items-center gap-2 ml-auto">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onEditAddress(address)}
                      leadingIcon={<Pencil className="size-3" />}
                      className="h-8 px-3 rounded-lg text-xs font-semibold"
                    >
                      Edit
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteAddress(address.id)}
                      aria-label={`Remove ${address.label}`}
                      className="h-8 px-2.5 rounded-lg text-xs text-muted-foreground hover:text-destructive hover:bg-error-bg"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
