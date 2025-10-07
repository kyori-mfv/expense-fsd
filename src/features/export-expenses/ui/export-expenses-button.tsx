import { Button } from "@/shared/ui/button";
import { Download } from "lucide-react";
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
    <Button onClick={handleExport} disabled={isExporting} variant="outline">
      <Download className="h-4 w-4 mr-2" />
      {isExporting ? "Đang xuất..." : "Xuất dữ liệu"}
    </Button>
  );
}
