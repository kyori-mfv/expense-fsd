import { useToast } from "@/shared/react";
import { IonButton, IonIcon } from "@ionic/react";
import { downloadOutline } from "ionicons/icons";
import { useExportExpenses } from "../model/use-export-expenses";

export function ExportExpensesButton() {
  const toast = useToast();
  const { exportToJSON, isExporting } = useExportExpenses();

  const handleExport = async () => {
    try {
      const result = await exportToJSON();
      toast.success(`Đã xuất ${result.count} chi tiêu thành công`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Xuất dữ liệu thất bại");
    }
  };

  return (
    <IonButton
      onClick={handleExport}
      disabled={isExporting}
      fill="outline"
      size="default"
      className="h-[44px]"
    >
      <IonIcon icon={downloadOutline} slot="start" />
      <span className="ml-3">{isExporting ? "Đang xuất..." : "Xuất"}</span>
    </IonButton>
  );
}
