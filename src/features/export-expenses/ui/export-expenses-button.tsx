import { IonButton, IonIcon } from "@ionic/react";
import { downloadOutline } from "ionicons/icons";
import { toast } from "sonner";
import { useExportExpenses } from "../model/use-export-expenses";

export function ExportExpensesButton() {
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
      size="small"
      className="gap-2"
    >
      <IonIcon icon={downloadOutline} slot="start" />
      {isExporting ? "Đang xuất..." : "Xuất dữ liệu"}
    </IonButton>
  );
}
