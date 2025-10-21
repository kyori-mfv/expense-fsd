import { ExpenseForm } from "@/features/add-expense";
import { Separator } from "@/shared/ui/separator";
import { ExpenseList } from "@/widgets/expense-list";
import { ManageExpenseData } from "@/widgets/manage-expense-data";
import { PageHeader } from "@/widgets/page-header";
import { RecentExpenses } from "@/widgets/recent-expenses";
import { IonContent, IonPage } from "@ionic/react";
import { TrendingDown } from "lucide-react";
import { toast } from "sonner";

export function ExpensePage() {
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
            {/* Expense Input Form */}
            <ExpenseForm onError={(error) => toast.error(error)} />

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
