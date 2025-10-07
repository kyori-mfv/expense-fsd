import { ExpenseItem } from "@/entities/expense";
import { DeleteExpenseButton } from "@/features/delete-expense";
import { EditExpenseButton } from "@/features/edit-expense";
import { ExpenseFilterForm, useExpenseFilter } from "@/features/filter-expenses";
import { EmptyState } from "@/shared/components/empty-state";
import { PaginationControls } from "@/shared/components/pagination-controls";
import { PAGINATION } from "@/shared/config/constants";
import { usePagination } from "@/shared/hooks";
import { SearchX } from "lucide-react";
import { useExpenseListData } from "../model/use-expense-list-data";

export function ExpenseList() {
  // Pagination state
  const { currentPage, setPage, resetPage } = usePagination();

  // Feature: Filter
  const { form, filters, debouncedSearch, handleReset } = useExpenseFilter();

  // Widget: Data fetching with filters and pagination
  const { items: paginatedExpenses, total: totalCount } = useExpenseListData({
    category: filters.category,
    dateFrom: filters.dateRange?.from,
    dateTo: filters.dateRange?.to,
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
          <div className="space-y-3">
            {paginatedExpenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                actions={
                  <>
                    {/* Feature: Edit */}
                    <EditExpenseButton expense={expense} />
                    {/* Feature: Delete */}
                    <DeleteExpenseButton
                      expenseId={expense.id}
                      expenseDescription={expense.description}
                    />
                  </>
                }
              />
            ))}
          </div>

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
