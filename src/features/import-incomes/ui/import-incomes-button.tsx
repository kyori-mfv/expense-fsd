import { useToast } from "@/shared/react";
import { IonButton, IonIcon } from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";
import { useRef } from "react";
import { useImportIncomes } from "../model/use-import-incomes";

export function ImportIncomesButton() {
  const toast = useToast();
  const { importFromJSON, isImporting } = useImportIncomes();
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
        toast.warning(`Đã nhập ${result.success}/${result.total} thu nhập. ${result.failed} lỗi.`);
      } else {
        toast.success(`Đã nhập ${result.success} thu nhập thành công`);
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
        size="default"
        className="gap-2 h-[44px]"
      >
        <IonIcon icon={cloudUploadOutline} slot="start" />
        <span className="ml-1">{isImporting ? "Đang nhập..." : "Nhập"}</span>
      </IonButton>
    </>
  );
}
