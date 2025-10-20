import { AIIncomeInput, IncomeForm } from "@/features/add-income";
import { ApiKeyInput, useApiKey } from "@/features/manage-api-key";
import { Separator } from "@/shared/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { IncomeList } from "@/widgets/income-list";
import { ManageIncomeData } from "@/widgets/manage-income-data";
import { PageHeader } from "@/widgets/page-header";
import { RecentIncomes } from "@/widgets/recent-incomes";
import { IonContent, IonPage } from "@ionic/react";
import { TrendingUp } from "lucide-react";
import { toast } from "sonner";

export function IncomePage() {
  const { apiKey } = useApiKey();

  return (
    <IonPage>
      <IonContent>
        <div className="container mx-auto p-4 max-w-4xl pb-6">
          <PageHeader
            icon={TrendingUp}
            title="Thu nhập"
            description="Quản lý và theo dõi các khoản thu nhập"
            titleColor="text-income-foreground"
          />

          <div className="space-y-6">
            {/* API Key Input - only show if not set */}
            {!apiKey && <ApiKeyInput />}

            {/* Income Input Tabs */}
            <Tabs defaultValue="ai" className="w-full">
              <TabsList className="grid grid-cols-2 p-1 max-w-md mx-auto w-full mb-2">
                <TabsTrigger value="ai">Nhập AI</TabsTrigger>
                <TabsTrigger value="manual">Nhập Thủ công</TabsTrigger>
              </TabsList>

              <TabsContent value="ai">
                {apiKey ? (
                  <AIIncomeInput apiKey={apiKey} onError={(error) => toast.error(error)} />
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    Vui lòng nhập API key để sử dụng tính năng AI
                  </div>
                )}
              </TabsContent>

              <TabsContent value="manual">
                <IncomeForm onError={(error) => toast.error(error)} />
              </TabsContent>
            </Tabs>

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
