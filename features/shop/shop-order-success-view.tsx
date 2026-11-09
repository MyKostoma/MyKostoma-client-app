"use client";

import { ShopOrderSuccess } from "@/components/shop/shop-order-success";
import { useShopOrderSuccessService } from "./services/shopApi";
import type { ShopOrderSuccessViewProps } from "./types";

export function ShopOrderSuccessView({ orderCode }: ShopOrderSuccessViewProps) {
  const { confirmation, handleViewOrder, handleBackToShop } =
    useShopOrderSuccessService(orderCode);

  return (
    <main className="flex-1 container px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex items-center">
      <ShopOrderSuccess
        confirmation={confirmation}
        onViewOrder={handleViewOrder}
        onBackToShop={handleBackToShop}
      />
    </main>
  );
}

