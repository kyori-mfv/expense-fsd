import { IonButton, IonIcon } from "@ionic/react";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemName?: string;
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  totalCount,
  itemName = "mục",
  onPageChange,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-shrink-0 text-sm text-[var(--ion-color-medium)]">
        Trang {currentPage} / {totalPages} ({totalCount} {itemName})
      </div>
      <div className="flex gap-2">
        <IonButton
          fill="outline"
          size="default"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={!canGoPrevious}
          className="h-[44px] w-[44px]"
        >
          <IonIcon icon={chevronBackOutline} slot="icon-only" className="text-xl" />
        </IonButton>
        <IonButton
          fill="outline"
          size="default"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={!canGoNext}
          className="h-[44px] w-[44px]"
        >
          <IonIcon icon={chevronForwardOutline} slot="icon-only" className="text-xl" />
        </IonButton>
      </div>
    </div>
  );
}
