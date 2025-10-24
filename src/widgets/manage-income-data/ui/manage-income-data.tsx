import { DeleteAllIncomesButton } from "@/features/delete-all-incomes";
import { ExportIncomesButton } from "@/features/export-incomes";
import { ImportIncomesButton } from "@/features/import-incomes";
import { Card } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

export function ManageIncomeData() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Quản lý dữ liệu thu nhập</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Xuất, nhập hoặc xóa toàn bộ dữ liệu thu nhập của bạn
          </p>
        </div>

        <Separator />

        <div className="flex flex-wrap gap-3 [&>*]:flex-1 [&>*:first-child]:flex-0">
          <DeleteAllIncomesButton />
          <ExportIncomesButton />
          <ImportIncomesButton />
        </div>

        <div className="text-xs text-muted-foreground space-y-1 f">
          <p>
            • <strong>Xuất dữ liệu:</strong> Tải xuống tất cả thu nhập dưới dạng file JSON
          </p>
          <p>
            • <strong>Nhập dữ liệu:</strong> Khôi phục thu nhập từ file JSON đã xuất
          </p>
          <p>
            • <strong>Xóa tất cả:</strong> Xóa vĩnh viễn tất cả thu nhập (không thể hoàn tác)
          </p>
        </div>
      </div>
    </Card>
  );
}
