import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  icon?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  isLoading?: boolean;
  loadingText?: string;
  onConfirm: () => void | Promise<void>;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  icon,
  confirmLabel = "Xác nhận",
  cancelLabel = "Hủy",
  variant = "default",
  isLoading = false,
  loadingText = "Đang xử lý...",
  onConfirm,
}: ConfirmationDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {icon && (
            <div
              className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full ${
                variant === "destructive" ? "bg-destructive/10" : "bg-primary/10"
              }`}
            >
              {icon}
            </div>
          )}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isLoading} variant={variant}>
            {isLoading ? loadingText : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
