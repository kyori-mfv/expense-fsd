import { AIExpenseInput, ExpenseForm } from "@/features/add-expense";
import { ApiKeyInput, useApiKey } from "@/features/manage-api-key";
import { Separator } from "@/shared/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { ExpenseList } from "@/widgets/expense-list";
import { ManageExpenseData } from "@/widgets/manage-expense-data";
import { RecentExpenses } from "@/widgets/recent-expenses";
import { toast } from "sonner";

export function ExpensePage() {
  const { apiKey } = useApiKey();

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Quản lý Chi tiêu</h1>

      <div className="space-y-6">
        {/* API Key Input - only show if not set */}
        {!apiKey && <ApiKeyInput />}

        {/* Expense Input Tabs */}
        <Tabs defaultValue="ai" className="w-full">
          <TabsList className="grid grid-cols-2 p-1 max-w-md mx-auto w-full mb-2">
            <TabsTrigger value="ai">
              Nhập AI
            </TabsTrigger>
            <TabsTrigger value="manual">
              Nhập Thủ công
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai">
            {apiKey ? (
              <AIExpenseInput apiKey={apiKey} onError={(error) => toast.error(error)} />
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Vui lòng nhập API key để sử dụng tính năng AI
              </div>
            )}
          </TabsContent>

          <TabsContent value="manual">
            <ExpenseForm onError={(error) => toast.error(error)} />
          </TabsContent>
        </Tabs>

        <Separator />

        {/* Recent Expenses */}
        <RecentExpenses />

        <Separator />

        {/* All Expenses with Search/Filter */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Tất cả Chi tiêu</h2>
          <ExpenseList />
        </div>

        <Separator />

        {/* Manage Expense Data */}
        <ManageExpenseData />
      </div>
    </div>
  );
}
