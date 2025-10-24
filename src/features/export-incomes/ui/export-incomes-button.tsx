import { IonButton, IonIcon } from "@ionic/react";
import { downloadOutline } from "ionicons/icons";
import { toast } from "sonner";
import { useExportIncomes } from "../model/use-export-incomes";

export function ExportIncomesButton() {
  const { exportToJSON, isExporting } = useExportIncomes();

  const handleExport = async () => {
    try {
      const result = await exportToJSON();
      toast.success(`Đã xuất ${result.count} thu nhập thành công`);
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
