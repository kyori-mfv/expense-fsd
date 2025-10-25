import { ExpenseForm } from "@/features/add-expense";
import { SectionHeader } from "@/shared/composite";
import { Separator } from "@/shared/ui/separator";
import { ExpenseList } from "@/widgets/expense-list";
import { ManageExpenseData } from "@/widgets/manage-expense-data";
import { PageHeader } from "@/widgets/page-header";
import { RecentExpenses } from "@/widgets/recent-expenses";
import { IonContent, IonPage } from "@ionic/react";
import { TrendingDown } from "lucide-react";

export function ExpensePage() {
  return (
    <IonPage>
      <PageHeader
        icon={TrendingDown}
        title="Chi tiêu"
        description="Quản lý và theo dõi các khoản chi tiêu"
        titleColor="text-expense-foreground"
      />
      <IonContent scrollY={true} scrollEvents={true}>
        <div className="container mx-auto p-4 max-w-4xl pb-6">
          <div className="space-y-6">
            <ExpenseForm />

            <Separator />

            {/* Recent Expenses */}
            <RecentExpenses />

            <Separator />

            {/* All Expenses with Search/Filter */}
            <ExpenseList />

            <Separator />

            {/* Manage Expense Data */}
            <ManageExpenseData />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
