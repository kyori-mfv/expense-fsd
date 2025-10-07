import { IncomeItem, useIncomeListData } from "@/entities/income";
import { DeleteIncomeButton } from "@/features/delete-income";
import { EditIncomeButton } from "@/features/edit-income";
import { IncomeFilterForm, useIncomeFilter } from "@/features/filter-incomes";
import { EmptyState } from "@/shared/components/empty-state";
import { PaginationControls } from "@/shared/components/pagination-controls";
import { PAGINATION } from "@/shared/config/constants";
import { usePagination } from "@/shared/hooks";
import { SearchX } from "lucide-react";

export function IncomeList() {
  // Pagination state
  const { currentPage, setPage, resetPage } = usePagination();

  // Feature: Filter
  const { form, filters, debouncedSearch, handleReset } = useIncomeFilter();

  // Widget: Data fetching with filters and pagination
  const { items: paginatedIncomes, total: totalCount } = useIncomeListData({
    category: filters.category,
    dateFrom: filters.dateRange?.from,
    dateTo: filters.dateRange?.to,
    searchText: debouncedSearch,
    page: currentPage,
    limit: PAGINATION.INCOME_LIST_PAGE_SIZE,
  });

  const totalPages = Math.ceil(totalCount / PAGINATION.INCOME_LIST_PAGE_SIZE);

  const handleFilterChange = () => {
    resetPage();
  };

  return (
    <div className="space-y-4">
      {/* Feature: Filter Form */}
      <IncomeFilterForm form={form} onReset={handleReset} onFilterChange={handleFilterChange} />

      {/* Results */}
      {totalCount === 0 ? (
        <EmptyState icon={SearchX} description="Không tìm thấy thu nhập nào phù hợp" />
      ) : (
        <>
          {/* Entity: Income List */}
          <div className="space-y-3">
            {paginatedIncomes.map((income) => (
              <IncomeItem
                key={income.id}
                income={income}
                actions={
                  <>
                    {/* Feature: Edit */}
                    <EditIncomeButton income={income} />
                    {/* Feature: Delete */}
                    <DeleteIncomeButton
                      incomeId={income.id}
                      incomeDescription={income.description}
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
            itemName="thu nhập"
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
