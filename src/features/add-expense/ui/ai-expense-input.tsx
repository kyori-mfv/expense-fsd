import { useAIProvider } from "@/entities/ai-provider";
import { EXPENSE_CATEGORIES, EXPENSE_CATEGORY_KEYWORDS } from "@/shared/config";
import { Card } from "@/shared/ui/card";
import { IonButton, IonIcon, IonInput } from "@ionic/react";
import { sparklesOutline } from "ionicons/icons";
import { useState } from "react";
import { useAddExpense } from "../model/use-add-expense";

interface AIExpenseInputProps {
  apiKey: string;
  onError?: (error: string) => void;
}

export function AIExpenseInput({ apiKey, onError }: AIExpenseInputProps) {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { addExpense } = useAddExpense();
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
        categories: EXPENSE_CATEGORIES,
        keywords: EXPENSE_CATEGORY_KEYWORDS,
        transactionLabel: "chi tiêu",
      });

      // Directly save to database (no preview step)
      const result = await addExpense({
        amount: parsed.amount,
        category: parsed.category,
        description: parsed.description,
        date: parsed.date,
      });

      if (result) {
        setInput("");
        // No need for onSuccess - useLiveQuery will auto-update!
      } else {
        onError?.("Không thể thêm chi tiêu");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Lỗi khi phân tích chi tiêu";
      onError?.(errorMessage);
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
            Nhập chi tiêu bằng AI
          </label>
          <p className="text-xs text-muted-foreground mb-3">
            Ví dụ: "ăn sáng 50k", "mua sắm quần áo 500k"
          </p>
          <IonInput
            type="text"
            value={input}
            onIonInput={(e) => setInput(e.detail.value as string)}
            placeholder="Nhập mô tả chi tiêu..."
            disabled={isProcessing}
            fill="outline"
            clearInput
          />
        </div>

        <IonButton type="submit" disabled={!input.trim() || isProcessing} expand="block">
          {isProcessing ? "Đang xử lý..." : "Thêm chi tiêu"}
        </IonButton>
      </form>
    </Card>
  );
}
