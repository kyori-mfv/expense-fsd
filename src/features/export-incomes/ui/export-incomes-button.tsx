import { useToast } from "@/shared/react";
import { IonButton, IonIcon } from "@ionic/react";
import { downloadOutline } from "ionicons/icons";
import { useExportIncomes } from "../model/use-export-incomes";

export function ExportIncomesButton() {
  const toast = useToast();
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
      size="default"
      className="gap-2 h-[44px]"
    >
      <IonIcon icon={downloadOutline} slot="start" />
      <span className="ml-1">{isExporting ? "Đang xuất..." : "Xuất"}</span>
    </IonButton>
  );
}
