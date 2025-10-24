import { DeleteAllExpensesButton } from "@/features/delete-all-expenses";
import { ExportExpensesButton } from "@/features/export-expenses";
import { ImportExpensesButton } from "@/features/import-expenses";
import { Card } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

export function ManageExpenseData() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Quản lý dữ liệu chi tiêu</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Xuất, nhập hoặc xóa toàn bộ dữ liệu chi tiêu của bạn
          </p>
        </div>

        <Separator />

        <div className="flex flex-wrap gap-3 [&>*]:flex-1 [&>*:first-child]:flex-0">
          <DeleteAllExpensesButton />
          <ExportExpensesButton />
          <ImportExpensesButton />
        </div>

        <div className="text-xs text-muted-foreground space-y-1 f">
          <p>
            • <strong>Xuất dữ liệu:</strong> Tải xuống tất cả chi tiêu dưới dạng file JSON
          </p>
          <p>
            • <strong>Nhập dữ liệu:</strong> Khôi phục chi tiêu từ file JSON đã xuất
          </p>
          <p>
            • <strong>Xóa tất cả:</strong> Xóa vĩnh viễn tất cả chi tiêu (không thể hoàn tác)
          </p>
        </div>
      </div>
    </Card>
  );
}
