import { Button } from "@/shared/ui/button";
import { Download } from "lucide-react";
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
    <Button onClick={handleExport} disabled={isExporting} variant="outline">
      <Download className="h-4 w-4 mr-2" />
      {isExporting ? "Đang xuất..." : "Xuất dữ liệu"}
    </Button>
  );
}
