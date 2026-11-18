"use client";

import { useRef } from "react";
import { ChevronDown, CloudUpload, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { PRO_SHOP_CATEGORY_OPTIONS } from "@/features/shop/data";
import type { ProShopServiceFormValues } from "../types";

export interface ProShopServiceFormProps {
  values: ProShopServiceFormValues;
  isEditing?: boolean;
  onChange: (values: ProShopServiceFormValues) => void;
  onCancel: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

const DELIVERY_UNITS: ProShopServiceFormValues["deliveryUnit"][] = [
  "Days",
  "Weeks",
  "Hours",
];

const DEMO_UPLOAD_IMAGES = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
];

export function ProShopServiceForm({
  values,
  isEditing = false,
  onChange,
  onCancel,
  onSaveDraft,
  onPublish,
}: ProShopServiceFormProps) {
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const handleCoverPick = (file?: File) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    onChange({ ...values, coverImageUrl: objectUrl });
  };

  const handleGalleryPick = (file?: File) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    onChange({
      ...values,
      galleryImages: [...values.galleryImages, objectUrl],
    });
  };

  const handleSlotUpload = (slotIdx: number) => {
    const existing = values.galleryImages[slotIdx];
    if (existing) {
      onChange({
        ...values,
        galleryImages: values.galleryImages.filter((_, i) => i !== slotIdx),
      });
      return;
    }
    galleryInputRef.current?.click();
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-6">
      <div className="space-y-1.5">
        <label
          htmlFor="pro-service-title"
          className="block text-xs font-bold text-foreground"
        >
          Service Title
        </label>
        <input
          id="pro-service-title"
          type="text"
          placeholder="e.g. Modern Minimalist Living Room Design"
          value={values.title}
          onChange={(e) => onChange({ ...values, title: e.target.value })}
          className="w-full h-11 px-4 rounded-xl border border-border bg-card text-xs sm:text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
        <p className="text-[11px] text-muted-foreground">
          Catchy titles perform better in search results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label
            htmlFor="pro-service-category"
            className="block text-xs font-bold text-foreground"
          >
            Category
          </label>
          <div className="relative">
            <select
              id="pro-service-category"
              value={values.category}
              onChange={(e) =>
                onChange({ ...values, category: e.target.value })
              }
              className="w-full h-11 pl-4 pr-10 rounded-xl border border-border bg-card text-xs sm:text-sm text-foreground appearance-none outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              <option value="">Select a category</option>
              {PRO_SHOP_CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="size-4 text-muted-foreground absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="pro-service-delivery-val"
            className="block text-xs font-bold text-foreground"
          >
            Delivery Time
          </label>
          <div className="grid grid-cols-12 gap-2.5">
            <input
              id="pro-service-delivery-val"
              type="text"
              value={values.deliveryValue}
              onChange={(e) =>
                onChange({ ...values, deliveryValue: e.target.value })
              }
              className="col-span-6 h-11 px-4 rounded-xl border border-border bg-card text-xs sm:text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />

            <div className="col-span-6 relative">
              <select
                aria-label="Delivery time unit"
                value={values.deliveryUnit}
                onChange={(e) =>
                  onChange({
                    ...values,
                    deliveryUnit: e.target
                      .value as ProShopServiceFormValues["deliveryUnit"],
                  })
                }
                className="w-full h-11 pl-4 pr-9 rounded-xl border border-border bg-card text-xs sm:text-sm text-foreground appearance-none outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                {DELIVERY_UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              <ChevronDown className="size-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="pro-service-description"
          className="block text-xs font-bold text-foreground"
        >
          Description
        </label>
        <textarea
          id="pro-service-description"
          rows={5}
          value={values.description}
          onChange={(e) => onChange({ ...values, description: e.target.value })}
          placeholder="Describe what is included in this service, your process, and what the client can expect..."
          className="w-full p-4 rounded-xl border border-border bg-card text-xs sm:text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed"
        />
      </div>

      <div className="space-y-1.5 max-w-sm">
        <label
          htmlFor="pro-service-price"
          className="block text-xs font-bold text-foreground"
        >
          Service Price
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
            ₦
          </span>
          <input
            id="pro-service-price"
            type="text"
            placeholder="0.00"
            value={values.price}
            onChange={(e) => onChange({ ...values, price: e.target.value })}
            className="w-full h-11 pl-8 pr-4 rounded-xl border border-border bg-card text-xs sm:text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-bold text-foreground">
          Service Images
        </label>

        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleCoverPick(e.target.files?.[0])}
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleGalleryPick(e.target.files?.[0])}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-2xl border-2 border-dashed border-border bg-secondary/20 overflow-hidden min-h-[200px] flex items-center justify-center">
            {values.coverImageUrl ? (
              <>
                <FallbackImage
                  src={values.coverImageUrl}
                  alt="Service cover preview"
                  className="w-full h-full object-cover absolute inset-0"
                />
                <button
                  type="button"
                  aria-label="Remove cover image"
                  onClick={() => onChange({ ...values, coverImageUrl: "" })}
                  className="absolute top-3 right-3 size-8 rounded-full bg-card/90 border border-border flex items-center justify-center text-foreground hover:text-error cursor-pointer z-10"
                >
                  <X className="size-4" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="w-full h-full py-10 px-4 flex flex-col items-center justify-center text-center gap-2 hover:bg-secondary/40 transition-colors cursor-pointer"
              >
                <div className="size-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground">
                  <CloudUpload className="size-4" />
                </div>
                <p className="text-xs font-bold text-foreground">
                  Click to upload cover image
                </p>
                <p className="text-[11px] text-muted-foreground">
                  PNG, JPG up to 10MB
                </p>
              </button>
            )}
          </div>

          <div className="grid grid-rows-2 gap-4">
            {[0, 1].map((slotIdx) => {
              const imgUrl = values.galleryImages[slotIdx];
              return (
                <button
                  key={slotIdx}
                  type="button"
                  onClick={() => handleSlotUpload(slotIdx)}
                  className="relative rounded-2xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors min-h-[92px] flex items-center justify-center overflow-hidden cursor-pointer"
                >
                  {imgUrl ? (
                    <>
                      <FallbackImage
                        src={imgUrl || DEMO_UPLOAD_IMAGES[slotIdx]}
                        alt={`Gallery image ${slotIdx + 1}`}
                        className="w-full h-full object-cover absolute inset-0"
                      />
                      <span className="absolute top-2 right-2 size-6 rounded-full bg-card/90 border border-border flex items-center justify-center text-foreground">
                        <X className="size-3" />
                      </span>
                    </>
                  ) : (
                    <span className="size-8 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground">
                      <Plus className="size-4" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-5 border-t border-border/70 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer py-2 px-3"
        >
          Cancel
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            onClick={onSaveDraft}
            className="flex-1 sm:flex-none h-10 px-5 rounded-xl text-xs font-bold"
          >
            Save as Draft
          </Button>

          <Button
            type="button"
            variant="default"
            onClick={onPublish}
            className="flex-1 sm:flex-none h-10 px-6 rounded-xl text-xs font-bold shadow-xs"
          >
            {isEditing ? "Save Changes" : "Publish Service"}
          </Button>
        </div>
      </div>
    </div>
  );
}
