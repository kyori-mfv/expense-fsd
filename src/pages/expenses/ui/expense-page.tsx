import { AIExpenseInput, ExpenseForm } from "@/features/add-expense";
import { ApiKeyInput, useApiKey } from "@/features/manage-api-key";
import { IonicSegment } from "@/shared/composite";
import { Separator } from "@/shared/ui/separator";
import { ExpenseList } from "@/widgets/expense-list";
import { ManageExpenseData } from "@/widgets/manage-expense-data";
import { PageHeader } from "@/widgets/page-header";
import { RecentExpenses } from "@/widgets/recent-expenses";
import { IonContent, IonPage } from "@ionic/react";
import { TrendingDown } from "lucide-react";
import { toast } from "sonner";

export function ExpensePage() {
  const { apiKey } = useApiKey();

  return (
    <IonPage>
      <PageHeader
        icon={TrendingDown}
        title="Chi tiêu"
        description="Quản lý và theo dõi các khoản chi tiêu"
        titleColor="text-expense-foreground"
      />
      <IonContent>
        <div className="container mx-auto p-4 max-w-4xl pb-6">
          <div className="space-y-6">
            {/* API Key Input - only show if not set */}
            {!apiKey && <ApiKeyInput />}

            {/* Expense Input Segment */}
            <IonicSegment
              options={[
                {
                  value: "ai",
                  label: "Nhập AI",
                  content: apiKey ? (
                    <AIExpenseInput apiKey={apiKey} onError={(error) => toast.error(error)} />
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      Vui lòng nhập API key để sử dụng tính năng AI
                    </div>
                  ),
                },
                {
                  value: "manual",
                  label: "Nhập Thủ công",
                  content: <ExpenseForm onError={(error) => toast.error(error)} inset={true} />,
                },
              ]}
              defaultValue="manual"
              showContent
              className="space-y-4"
            />

            <Separator />

            {/* Recent Expenses */}
            <RecentExpenses />

            <Separator />

            {/* All Expenses with Search/Filter */}
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Tất cả chi tiêu</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Danh sách đầy đủ các khoản chi tiêu với lọc và tìm kiếm
                </p>
              </div>
              <ExpenseList />
            </div>

            <Separator />

            {/* Manage Expense Data */}
            <ManageExpenseData />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
