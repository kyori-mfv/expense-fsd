import { IncomeCard, useIncomeListData } from "@/entities/income";
import { DeleteIncomeButton } from "@/features/delete-income";
import { EditIncomeButton } from "@/features/edit-income";
import { IncomeFilterForm, useIncomeFilter } from "@/features/filter-incomes";
import { EmptyState } from "@/shared/composite";
import { PaginationControls } from "@/shared/composite";
import { PAGINATION } from "@/shared/config";
import { usePagination } from "@/shared/react";
import { TransparentList } from "@/shared/ui/transparent-list";
import { SearchX } from "lucide-react";

export function IncomeList() {
  // Pagination state
  const { currentPage, setPage, resetPage } = usePagination();

  // Feature: Filter
  const { form, filters, debouncedSearch, handleReset } = useIncomeFilter();

  // Default date range (current month if not set)
  const dateFrom =
    filters.dateRange?.from || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const dateTo = filters.dateRange?.to || new Date();

  // Widget: Data fetching with filters and pagination
  const { items: paginatedIncomes, total: totalCount } = useIncomeListData({
    category: filters.category,
    dateFrom,
    dateTo,
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
          <TransparentList>
            {paginatedIncomes.map((income) => (
              <IncomeCard
                key={income.id}
                income={income}
                actions={
                  <>
                    <EditIncomeButton income={income} />
                    <DeleteIncomeButton
                      incomeId={income.id}
                      incomeDescription={income.description}
                    />
                  </>
                }
              />
            ))}
          </TransparentList>

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
