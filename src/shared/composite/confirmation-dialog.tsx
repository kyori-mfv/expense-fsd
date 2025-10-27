import { IonAlert } from "@ionic/react";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  icon?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void | Promise<void>;
}

/**
 * ConfirmationDialog - Native mobile confirmation dialog
 *
 * A composite component that provides native iOS/Android alert dialogs for confirmations.
 * Uses IonAlert for platform-specific UI with proper button styling.
 *
 * Note: No loading states - operations are instant in offline-first architecture.
 */
export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Xác nhận",
  cancelLabel = "Hủy",
  variant = "default",
  onConfirm,
}: ConfirmationDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <IonAlert
      isOpen={open}
      onDidDismiss={() => onOpenChange(false)}
      header={title}
      message={description}
      buttons={[
        {
          text: cancelLabel,
          role: "cancel",
          handler: () => {
            onOpenChange(false);
          },
        },
        {
          text: confirmLabel,
          role: variant === "destructive" ? "destructive" : "confirm",
          handler: () => {
            handleConfirm();
          },
        },
      ]}
    />
  );
}
