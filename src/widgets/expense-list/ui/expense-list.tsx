import { ExpenseCard, useExpenseListData } from "@/entities/expense";
import { DeleteExpenseButton } from "@/features/delete-expense";
import { EditExpenseButton } from "@/features/edit-expense";
import { ExpenseFilterForm, useExpenseFilter } from "@/features/filter-expenses";
import { EmptyState } from "@/shared/composite";
import { PaginationControls } from "@/shared/composite";
import { PAGINATION } from "@/shared/config";
import { usePagination } from "@/shared/react";
import { IonList } from "@ionic/react";
import { SearchX } from "lucide-react";

export function ExpenseList() {
  // Pagination state
  const { currentPage, setPage, resetPage } = usePagination();

  // Feature: Filter
  const { form, filters, debouncedSearch, handleReset } = useExpenseFilter();

  // Default date range (current month if not set)
  const dateFrom =
    filters.dateRange?.from || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const dateTo = filters.dateRange?.to || new Date();

  // Widget: Data fetching with filters and pagination
  const { items: paginatedExpenses, total: totalCount } = useExpenseListData({
    category: filters.category,
    dateFrom,
    dateTo,
    searchText: debouncedSearch,
    page: currentPage,
    limit: PAGINATION.EXPENSE_LIST_PAGE_SIZE,
  });

  const totalPages = Math.ceil(totalCount / PAGINATION.EXPENSE_LIST_PAGE_SIZE);

  const handleFilterChange = () => {
    resetPage();
  };

  return (
    <div className="space-y-4">
      {/* Feature: Filter Form */}
      <ExpenseFilterForm form={form} onReset={handleReset} onFilterChange={handleFilterChange} />

      {/* Results */}
      {totalCount === 0 ? (
        <EmptyState icon={SearchX} description="Không tìm thấy chi tiêu nào phù hợp" />
      ) : (
        <>
          {/* Entity: Expense List */}
          <IonList className="ion-no-padding">
            {paginatedExpenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                actions={
                  <>
                    <EditExpenseButton expense={expense} />
                    <DeleteExpenseButton
                      expenseId={expense.id}
                      expenseDescription={expense.description}
                    />
                  </>
                }
              />
            ))}
          </IonList>

          {/* Pagination */}
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            itemName="chi tiêu"
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
