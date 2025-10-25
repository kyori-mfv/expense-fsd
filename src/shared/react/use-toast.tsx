import { useIonToast } from "@ionic/react";
import { checkmarkCircle, closeCircle, informationCircle, warningOutline } from "ionicons/icons";

/**
 * Custom hook for native Ionic toast notifications
 *
 * Provides a simple API for showing success, error, warning, and info toasts
 * with native iOS/Android styling and icons.
 *
 * @example
 * const toast = useToast();
 * toast.success("Chi tiêu đã được thêm");
 * toast.error("Không thể xóa dữ liệu");
 */
export function useToast() {
  const [present] = useIonToast();

  return {
    /**
     * Show success toast (green, checkmark icon)
     */
    success: (message: string, duration = 2000) => {
      present({
        message,
        duration,
        position: "top",
        color: "success",
        icon: checkmarkCircle,
        cssClass: "ion-toast-success",
      });
    },

    /**
     * Show error toast (red, close icon)
     */
    error: (message: string, duration = 3000) => {
      present({
        message,
        duration,
        position: "top",
        color: "danger",
        icon: closeCircle,
        cssClass: "ion-toast-error",
      });
    },

    /**
     * Show warning toast (amber, warning icon)
     */
    warning: (message: string, duration = 2500) => {
      present({
        message,
        duration,
        position: "top",
        color: "warning",
        icon: warningOutline,
        cssClass: "ion-toast-warning",
      });
    },

    /**
     * Show info toast (blue, info icon)
     */
    info: (message: string, duration = 2000) => {
      present({
        message,
        duration,
        position: "top",
        color: "primary",
        icon: informationCircle,
        cssClass: "ion-toast-info",
      });
    },
  };
}
