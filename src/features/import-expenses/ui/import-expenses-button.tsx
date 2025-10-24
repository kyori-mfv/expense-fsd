import { IonButton, IonIcon } from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";
import { useRef } from "react";
import { toast } from "sonner";
import { useImportExpenses } from "../model/use-import-expenses";

export function ImportExpensesButton() {
  const { importFromJSON, isImporting } = useImportExpenses();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await importFromJSON(file);

      if (result.failed > 0) {
        toast.warning(`Đã nhập ${result.success}/${result.total} chi tiêu. ${result.failed} lỗi.`);
      } else {
        toast.success(`Đã nhập ${result.success} chi tiêu thành công`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nhập dữ liệu thất bại");
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
      <IonButton
        onClick={handleClick}
        disabled={isImporting}
        fill="outline"
        size="small"
        className="gap-2"
      >
        <IonIcon icon={cloudUploadOutline} slot="start" />
        {isImporting ? "Đang nhập..." : "Nhập dữ liệu"}
      </IonButton>
    </>
  );
}
