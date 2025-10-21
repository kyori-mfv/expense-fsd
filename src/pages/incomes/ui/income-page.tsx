import { IncomeForm } from "@/features/add-income";
import { Separator } from "@/shared/ui/separator";
import { IncomeList } from "@/widgets/income-list";
import { ManageIncomeData } from "@/widgets/manage-income-data";
import { PageHeader } from "@/widgets/page-header";
import { RecentIncomes } from "@/widgets/recent-incomes";
import { IonContent, IonPage } from "@ionic/react";
import { TrendingUp } from "lucide-react";
import { toast } from "sonner";

export function IncomePage() {
  return (
    <IonPage>
      <PageHeader
        icon={TrendingUp}
        title="Thu nhập"
        description="Quản lý và theo dõi các khoản thu nhập"
        titleColor="text-income-foreground"
      />
      <IonContent>
        <div className="container mx-auto p-4 max-w-4xl pb-6">
          <div className="space-y-6">
            {/* Income Input Form */}
            <IncomeForm onError={(error) => toast.error(error)} />

            <Separator />

            {/* Recent Incomes */}
            <RecentIncomes />

            <Separator />

            {/* All Incomes with Search/Filter */}
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Tất cả thu nhập</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Danh sách đầy đủ các khoản thu nhập với lọc và tìm kiếm
                </p>
              </div>
              <IncomeList />
            </div>

            <Separator />

            {/* Manage Income Data */}
            <ManageIncomeData />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
