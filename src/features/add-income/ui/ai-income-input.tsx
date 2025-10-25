import { useAIProvider } from "@/entities/ai-provider";
import { INCOME_CATEGORIES, INCOME_CATEGORY_KEYWORDS } from "@/shared/config";
import { useToast } from "@/shared/react";
import { Card } from "@/shared/ui/card";
import { IonButton, IonIcon, IonInput } from "@ionic/react";
import { sparklesOutline } from "ionicons/icons";
import { useState } from "react";
import { useAddIncome } from "../model/use-add-income";

interface AIIncomeInputProps {
  apiKey: string;
}

export function AIIncomeInput({ apiKey }: AIIncomeInputProps) {
  const toast = useToast();
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { addIncome } = useAddIncome();
  const provider = useAIProvider(apiKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || !provider) {
      return;
    }

    setIsProcessing(true);

    try {
      // Parse transaction using Gemini AI
      const parsed = await provider.parseTransaction(input, {
        categories: INCOME_CATEGORIES,
        keywords: INCOME_CATEGORY_KEYWORDS,
        transactionLabel: "thu nhập",
      });

      // Directly save to database (no preview step)
      const result = await addIncome({
        amount: parsed.amount,
        category: parsed.category,
        description: parsed.description,
        date: parsed.date,
      });

      if (result) {
        setInput("");
        // Show success feedback
        toast.success("Đã thêm thu nhập bằng AI");
      } else {
        toast.error("Không thể thêm thu nhập");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Lỗi khi phân tích thu nhập";
      toast.error(errorMessage);
      console.error("AI parsing error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ai-input" className="text-sm font-medium mb-2 flex items-center gap-2">
            <IonIcon icon={sparklesOutline} className="text-base text-primary" />
            Nhập thu nhập bằng AI
          </label>
          <p className="text-xs text-muted-foreground mb-3">
            Ví dụ: "lương tháng 10tr", "thưởng dự án 2tr"
          </p>
          <IonInput
            type="text"
            value={input}
            onIonInput={(e) => setInput(e.detail.value as string)}
            placeholder="Nhập mô tả thu nhập..."
            disabled={isProcessing}
            fill="outline"
            clearInput
          />
        </div>

        <IonButton type="submit" disabled={!input.trim() || isProcessing} expand="block">
          {isProcessing ? "Đang xử lý..." : "Thêm thu nhập"}
        </IonButton>
      </form>
    </Card>
  );
}
