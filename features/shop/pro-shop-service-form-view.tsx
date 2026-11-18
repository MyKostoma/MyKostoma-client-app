"use client";

import { ProShopServiceForm } from "@/components/shop/professional/pro-shop-service-form";
import { ProShopPublishSuccess } from "@/components/shop/professional/pro-shop-publish-success";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { ProfessionalShopTopBar } from "@/components/layouts/top-bars/shop/professional-shop-top-bar";
import { useProShopServiceFormService } from "./services/shopApi";
import type { ProShopServiceFormViewProps } from "./types";

export type { ProShopServiceFormViewProps } from "./types";

export function ProShopServiceFormView({
  serviceId,
}: ProShopServiceFormViewProps) {
  const {
    isEditing,
    values,
    setValues,
    publishedService,
    handleCancel,
    handleSaveDraft,
    handlePublishService,
    handleGoToMyShop,
    handleViewPublishedService,
  } = useProShopServiceFormService(serviceId);

  return (
    <>
      <DashboardTopBarSlot>
        {publishedService ? (
          <ProfessionalShopTopBar
            title="Success"
            subtitleBadge="OPERATION COMPLETE"
          />
        ) : (
          <ProfessionalShopTopBar
            title={
              isEditing ? "Edit Service Card" : "Create New Service Card"
            }
            subtitleBadge="INVENTORY MANAGEMENT"
            onBack={handleCancel}
          />
        )}
      </DashboardTopBarSlot>

      {publishedService ? (
        <ProShopPublishSuccess
          onGoToMyShop={handleGoToMyShop}
          onViewService={handleViewPublishedService}
        />
      ) : (
        <ProShopServiceForm
          values={values}
          isEditing={isEditing}
          onChange={setValues}
          onCancel={handleCancel}
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublishService}
        />
      )}
    </>
  );
}

export default ProShopServiceFormView;
