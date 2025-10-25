import { IncomeForm } from "@/features/add-income";
import { SectionHeader } from "@/shared/composite";
import { Separator } from "@/shared/ui/separator";
import { IncomeList } from "@/widgets/income-list";
import { ManageIncomeData } from "@/widgets/manage-income-data";
import { PageHeader } from "@/widgets/page-header";
import { RecentIncomes } from "@/widgets/recent-incomes";
import { IonContent, IonPage } from "@ionic/react";
import { TrendingUp } from "lucide-react";

export function IncomePage() {
  return (
    <IonPage>
      <PageHeader
        icon={TrendingUp}
        title="Thu nhập"
        description="Quản lý và theo dõi các khoản thu nhập"
        titleColor="text-income-foreground"
      />
      <IonContent scrollY={true} scrollEvents={true}>
        <div className="container mx-auto p-4 max-w-4xl pb-6">
          <div className="space-y-6">
            <IncomeForm />

            <Separator />

            {/* Recent Incomes */}
            <RecentIncomes />

            <Separator />

            {/* All Incomes with Search/Filter */}
            <IncomeList />

            <Separator />

            {/* Manage Income Data */}
            <ManageIncomeData />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
